// Beheerscherm (/admin): accounts met hun abonnement, Pro cadeau geven, omzet en AI-kosten.
// Alleen voor beheerders: het e-mailadres van de ingelogde gebruiker moet in ADMIN_EMAILS staan
// (Vercel, komma-gescheiden). Wachtwoorden staan nooit in de code; inloggen gaat via Supabase.
import { getUserFromRequest } from './_lib/auth.js';
import {
  select,
  update,
  remove,
  rpc,
  listUsers,
  getSubscription,
  upsertSubscription,
  hasServiceRole,
  inviteUser,
  deleteAuthUser,
  confirmAuthUser,
  updateAppMetadata,
  insert,
  insertReturning,
  insertIgnore,
  ensureUser,
  storageList,
  storageDownloadUrl,
  storageRemove,
  countRows,
  upsert
} from './_lib/supabase-admin.js';
import { newsletterMail, sendMail, sendMailBatch } from './_lib/mail.js';
import { intakeMail } from './_lib/intake-mail.js';
import { INTAKE_BUCKET, PACKAGES, FREE_INTRO, deliverLink, packageLabel } from './_lib/intake.js';
import { createHash, createHmac, randomBytes } from 'node:crypto';
import { siteOrigin } from './_lib/origin.js';
import { stripe, hasStripe, PLAN_MONTHLY_EUR } from './_lib/stripe.js';
import { MEASURED_HOURS } from './_lib/uren.js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'schreurs.jop@gmail.com')
  .split(',')
  .map(x => x.trim().toLowerCase())
  .filter(Boolean);

// "canceled" betekent bij Stripe echt gestopt (bij opzeggen blijft de status "active" tot de einddatum).
const running = row =>
  !!row &&
  ['active', 'trialing', 'past_due'].includes(row.status) &&
  (!row.current_period_end || new Date(row.current_period_end) > new Date());

// Omschrijving van het account zoals in de tabel: Gratis, Proef, Pro maand/jaar, Cadeau, Team.
function accountType(user, sub, ownOrg, memberOrg) {
  if (running(sub) && sub.plan === 'gift')
    return { type: 'gift', label: 'Pro · cadeau', until: sub.current_period_end };
  if (running(sub))
    return {
      type: 'pro',
      label: `Pro · ${sub.plan === 'year' ? 'jaar' : 'maand'}${sub.cancel_at_period_end ? ' (opgezegd)' : ''}`,
      until: sub.current_period_end
    };
  if (running(ownOrg))
    return { type: 'team', label: `Team ${ownOrg.seats} · eigenaar`, until: ownOrg.current_period_end };
  if (running(memberOrg)) return { type: 'team', label: `Team · ${memberOrg.name}` };
  const trialEnd = new Date(new Date(user.created_at).getTime() + 7 * 86400000);
  if (trialEnd > new Date()) return { type: 'trial', label: 'Proef', until: trialEnd.toISOString() };
  return { type: 'free', label: 'Gratis' };
}

// Echte OpenAI-kosten deze maand, als er een admin-sleutel is (OpenAI → Settings → Admin keys).
async function openAiCostsThisMonth() {
  const key = process.env.OPENAI_ADMIN_KEY;
  if (!key) return null;
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  try {
    const response = await fetch(
      `https://api.openai.com/v1/organization/costs?start_time=${Math.floor(start / 1000)}&limit=31`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    const usd = (data.data || [])
      .flatMap(bucket => bucket.results || [])
      .reduce((sum, r) => sum + Number(r.amount?.value || 0), 0);
    return { usd: Math.round(usd * 100) / 100 };
  } catch {
    return null;
  }
}

// Wat er de afgelopen 30 dagen via Stripe is betaald (min terugbetalingen).
// E-mailadres bij een Stripe-betaling: van het formulier, de bon of de klant.
const chargeEmail = c =>
  String(c.billing_details?.email || c.receipt_email || (typeof c.customer === 'object' ? c.customer?.email : '') || '')
    .trim()
    .toLowerCase();
// Betaalde een beheerder zelf (een test of een eigen keukenteam)? Dat is geen omzet.
const ownCharge = c => ADMIN_EMAILS.includes(chargeEmail(c));

async function stripeRevenue30Days() {
  if (!hasStripe()) return null;
  try {
    const since = Math.floor(Date.now() / 1000) - 30 * 86400;
    let total = 0;
    let after = '';
    for (let page = 0; page < 10; page++) {
      const data = await stripe(`charges?limit=100&created[gte]=${since}&expand[]=data.customer${after}`, null, 'GET');
      for (const c of data.data || [])
        if (c.paid && !ownCharge(c)) total += (c.amount - (c.amount_refunded || 0)) / 100;
      if (!data.has_more) break;
      after = `&starting_after=${data.data[data.data.length - 1].id}`;
    }
    return { eur: Math.round(total * 100) / 100 };
  } catch {
    return null;
  }
}

// ---- Bezoekers (tabel site_visits) ----
// De database geeft per aanvraag hooguit 1000 regels; daarom in pagina's ophalen.
// Land (vlaggetje) staat er pas na supabase/2026-10-27-land.sql; tot die tijd zonder.
let visitColumns = 'visited_at,visitor_id,path,referrer,platform,user_agent,country';
async function allVisits() {
  const rows = [];
  for (let page = 0; page < 500; page++) {
    const query = () =>
      select('site_visits', `select=${visitColumns}&order=visited_at.asc&offset=${page * 1000}&limit=1000`);
    const batch = await query().catch(e => {
      if (!/country/.test(e.message || '')) throw e;
      visitColumns = visitColumns.replace(',country', '');
      return query();
    });
    rows.push(...(batch || []));
    if (!batch || batch.length < 1000) break;
  }
  return rows;
}

const amsterdamDay = d => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Amsterdam' }).format(new Date(d));

// Platform van een bezoek: uit de kolom platform, anders afgeleid uit de browser (oude bezoeken).
const platformOf = v =>
  v.platform || (/Mobi|Android|iPhone|iPad|iPod/i.test(v.user_agent || '') ? 'mobile_web' : 'desktop_web');

// Waar een bezoeker vandaan kwam, als [groep, bron]. Volgorde: een kenmerk in de link (?bron=, utm_source,
// collega-uitnodiging, advertentieklik), dan de app waarin de link openging (herkenbaar aan de browserregel of,
// op Android, aan een referrer als android-app://com.whatsapp), dan de website ervoor (referrer).
// Geen enkele herkomst: op de startpagina is dat "direct" (getypt of bladwijzer); op een dieper adres (een
// gedeeld recept, map-uitnodiging of blog) is het vrijwel altijd een gedeelde link uit een app die niets doorgeeft.
const SEARCH = 'Zoekmachines';
const SOCIAL = 'Social media';
const SHARED = 'Gedeelde links';
const MAIL = 'E-mail';
const AI = 'AI-assistenten';
const SITES = 'Andere websites';
const DIRECT_GROUP = 'Direct';
const SOURCES = [
  // Berichten-apps en mail eerst: hun adressen lijken soms op die van social media (bijv. Messenger).
  [/whatsapp|wa\.me/, SHARED, 'WhatsApp'],
  [/telegram|(^|\.)t\.me$|challegram/, SHARED, 'Telegram'],
  [/messenger|facebook\.orca/, SHARED, 'Messenger'],
  [/signal|securesms/, SHARED, 'Signal'],
  [/apps\.messaging|(^|\W)sms(\W|$)|imessage/, SHARED, 'Sms / Berichten'],
  [/discord/, SHARED, 'Discord'],
  [/slack/, SHARED, 'Slack'],
  [/teams\.microsoft|microsoft\.teams/, SHARED, 'Microsoft Teams'],
  [/snapchat/, SHARED, 'Snapchat'],
  [/wechat|micromessenger/, SHARED, 'WeChat'],
  [/(^|\W)line(\W|$)|naver\.line/, SHARED, 'LINE'],
  [/gedeeld/, SHARED, 'Gedeeld via de telefoon (app onbekend)'],
  [/android\.gm|mail\.google|gmail/, MAIL, 'Gmail'],
  [/outlook|office\.outlook|hotmail|live\.com/, MAIL, 'Outlook'],
  [/(^|\W)e-?mail|mail\./, MAIL, 'E-mail'],
  [/chatgpt|openai/, AI, 'ChatGPT'],
  [/perplexity/, AI, 'Perplexity'],
  [/claude\.ai|anthropic/, AI, 'Claude'],
  [/gemini\.google|bard\.google/, AI, 'Gemini'],
  [/copilot/, AI, 'Copilot'],
  [/googleadservices|gclid|google-ads/, SEARCH, 'Google (advertentie)'],
  [/google|googlequicksearchbox/, SEARCH, 'Google'],
  [/bing\.com|msn\.com/, SEARCH, 'Bing'],
  [/duckduckgo/, SEARCH, 'DuckDuckGo'],
  [/ecosia/, SEARCH, 'Ecosia'],
  [/yahoo\./, SEARCH, 'Yahoo'],
  [/reddit/, SOCIAL, 'Reddit'],
  [/instagram/, SOCIAL, 'Instagram'],
  [/threads\.net/, SOCIAL, 'Threads'],
  [/facebook|fb\.com|fb\.me|katana/, SOCIAL, 'Facebook'],
  [/(^|\.)t\.co$|twitter|(^|\.)x\.com$/, SOCIAL, 'X / Twitter'],
  [/linkedin|lnkd\.in/, SOCIAL, 'LinkedIn'],
  [/tiktok|musically|musical_ly|bytedance/, SOCIAL, 'TikTok'],
  [/youtube|youtu\.be/, SOCIAL, 'YouTube'],
  [/pinterest/, SOCIAL, 'Pinterest'],
  [/capterra|g2\.com|getapp|alternativeto|producthunt/, SITES, 'Softwaresites']
];
// Apps die links in hun eigen ingebouwde browser openen, herkenbaar aan de browserregel.
const IN_APP = [
  [/Instagram/i, SOCIAL, 'Instagram'],
  [/MessengerForiOS|Orca-Android|FB_IAB\/MESSENGER/i, SHARED, 'Messenger'],
  [/FBAN|FBAV|FB_IAB|FBIOS/i, SOCIAL, 'Facebook'],
  [/LinkedInApp/i, SOCIAL, 'LinkedIn'],
  [/Snapchat/i, SHARED, 'Snapchat'],
  [/musical_ly|BytedanceWebview|TikTok/i, SOCIAL, 'TikTok'],
  [/Pinterest/i, SOCIAL, 'Pinterest'],
  [/Twitter/i, SOCIAL, 'X / Twitter'],
  [/MicroMessenger/i, SHARED, 'WeChat'],
  [/\bLine\//, SHARED, 'LINE'],
  [/Telegram/i, SHARED, 'Telegram']
];
function lookup(text) {
  const t = String(text || '').toLowerCase();
  for (const [re, group, name] of SOURCES) if (re.test(t)) return [group, name];
  return null;
}
function sourceOf(v) {
  const [path, search = ''] = String(v.path || '/').split('?');
  const query = new URLSearchParams(search);
  const tag = query.get('bron') || query.get('ref') || query.get('utm_source');
  if (query.has('collega'))
    return ['Collega-uitnodiging', tag ? `Collega-uitnodiging via ${lookup(tag)?.[1] || tag}` : 'Collega-uitnodiging'];
  if (tag) return lookup(tag) || ['Eigen links (?bron=)', tag.slice(0, 30).toLowerCase()];
  if (query.has('gclid')) return [SEARCH, 'Google (advertentie)'];
  const ua = v.user_agent || '';
  for (const [re, group, name] of IN_APP) if (re.test(ua)) return [group, name];
  if (query.has('fbclid')) return [SOCIAL, 'Facebook / Instagram'];
  let host = '';
  try {
    host = new URL(v.referrer).hostname.replace(/^www\./, '');
  } catch {
    host = '';
  }
  // Van savour.page zelf (of de testversie) is doorklikken, geen nieuwe bron.
  if (host && !/(^|\.)savour\.page$|vercel\.app$|localhost|127\.0\.0/.test(host)) return lookup(host) || [SITES, host];
  if (/^\/(r|join)\//.test(path)) return [SHARED, 'Gedeeld recept of map (app onbekend)'];
  if (path && path !== '/' && path !== '/index.html') return [SHARED, 'Gedeelde link (app onbekend)'];
  return [DIRECT_GROUP, 'Direct (getypt of bladwijzer)'];
}
const isDirect = s => s[0] === DIRECT_GROUP;

// Apparaten van de beheerder zelf: bij elk bezoek aan /admin stuurt de browser zijn bezoekers-id mee. Die ids
// staan in app_metadata van het beheerdersaccount en tellen niet mee in de cijfers (max. 20 apparaten).
async function ownVisitorIds(user, current) {
  const ids = Array.isArray(user?.app_metadata?.own_visitor_ids) ? user.app_metadata.own_visitor_ids : [];
  if (current && /^[\w-]{8,64}$/.test(current) && !ids.includes(current)) {
    const next = [current, ...ids].slice(0, 20);
    await updateAppMetadata(user.id, { ...(user.app_metadata || {}), own_visitor_ids: next }).catch(() => null);
    return next;
  }
  return ids;
}

// Geen mensen: zoekmachines, linkvoorbeelden (WhatsApp, Facebook, ...) en testbrowsers. Tellen niet mee als bezoeker.
const NOT_A_VISITOR =
  /bot\b|bot\/|googleother|crawl|spider|slurp|headless|lighthouse|pagespeed|facebookexternalhit|meta-externalagent|preview|python|curl|wget|node-fetch|axios|vercel|uptime|monitor|electron|claude|chatgpt|gptbot|perplexity|prerender|inspectiontool|google-read-aloud/i;
// Alleen echte browsers tellen: Chrome, Safari, Firefox, Edge (ook op iPhone). Tools die pagina's laden zonder
// zo'n naam (bijv. SEO-scanners) krijgen bij elk bezoek een nieuw id en blazen de teller op.
const REAL_BROWSER = /Chrome\/|CriOS|Safari\/|Firefox\/|FxiOS|Edg\//;
const isVisitor = ua => REAL_BROWSER.test(ua || '') && !NOT_A_VISITOR.test(ua || '');

// Robots die de site aflopen zonder iets te bewaren krijgen bij elke pagina een nieuw bezoekers-id en zouden zo
// als tientallen bezoekers tellen. Herkenning: exact dezelfde browser (user agent), geen herkomst, één bezoek per
// id, minstens 6 van zulke ids binnen 30 minuten die samen minstens 4 verschillende pagina's openden.
function crawlerIds(visits) {
  const count = new Map();
  for (const v of visits) count.set(v.visitor_id, (count.get(v.visitor_id) || 0) + 1);
  const byUa = new Map();
  for (const v of visits) {
    if (!v.visitor_id || count.get(v.visitor_id) !== 1 || v.referrer) continue;
    const k = v.user_agent || '';
    if (!byUa.has(k)) byUa.set(k, []);
    byUa.get(k).push(v);
  }
  const bots = new Set();
  for (const list of byUa.values()) {
    list.sort((a, b) => new Date(a.visited_at) - new Date(b.visited_at));
    let start = 0;
    for (let end = 0; end < list.length; end++) {
      while (new Date(list[end].visited_at) - new Date(list[start].visited_at) > 30 * 60000) start++;
      const win = list.slice(start, end + 1);
      if (win.length >= 6 && new Set(win.map(v => (v.path || '/').split('?')[0])).size >= 4)
        win.forEach(v => bots.add(v.visitor_id));
    }
  }
  return bots;
}

// Alles in unieke bezoekers (elk apparaat telt één keer): vandaag, deze week (7 dagen), deze maand, all time,
// per platform en per dag (30 dagen). Plus de laatste unieke bezoekers met hun bezoeken en pagina's.
async function visitorStats(ownIds = []) {
  const own = new Set(ownIds);
  const all = await allVisits();
  const bots = crawlerIds(all);
  const isReal = v => !own.has(v.visitor_id) && isVisitor(v.user_agent) && !bots.has(v.visitor_id);
  const rows = all.filter(isReal);
  const notCounted = new Set(all.filter(v => !own.has(v.visitor_id) && !isReal(v)).map(v => v.visitor_id)).size;
  const who = v => v.visitor_id || `${v.user_agent}|${v.visited_at}`;
  const isDemo = v => (v.path || '').split('?')[0] === '/demo';
  const unique = list => new Set(list.map(who)).size;
  const today = amsterdamDay(Date.now());
  const month = today.slice(0, 7);
  const weekAgo = Date.now() - 7 * 86400000;
  const perDay = new Map();
  const people = new Map();
  for (const v of rows) {
    const k = amsterdamDay(v.visited_at);
    if (!perDay.has(k)) perDay.set(k, new Set());
    perDay.get(k).add(who(v));
    const id = who(v);
    let p = people.get(id);
    if (!p) {
      p = {
        first: v.visited_at,
        last: v.visited_at,
        visits: 0,
        pages: [],
        referrer: v.referrer || '',
        source: sourceOf(v),
        user_agent: v.user_agent,
        platform: platformOf(v),
        country: v.country || ''
      };
      people.set(id, p);
    }
    p.visits++;
    p.last = v.visited_at;
    p.user_agent = v.user_agent || p.user_agent;
    p.platform = platformOf(v);
    if (v.country) p.country = v.country;
    if (!p.referrer && v.referrer) p.referrer = v.referrer;
    // De eerste echte bron telt; een later direct bezoek verandert die niet.
    if (isDirect(p.source)) p.source = sourceOf(v);
    const path = v.path || '/';
    p.pages = [path, ...p.pages.filter(x => x !== path)].slice(0, 4);
  }
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    days.push({
      label: new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short' }).format(
        d
      ),
      count: perDay.get(amsterdamDay(d))?.size || 0
    });
  }
  // Bronnen: unieke bezoekers per bron, all time, deze maand en deze week (op hun laatste bezoek).
  const bySource = new Map();
  for (const p of people.values()) {
    const [group, name] = p.source;
    const row = bySource.get(name) || { group, name, all: 0, month: 0, week: 0 };
    row.all++;
    if (amsterdamDay(p.last).startsWith(month)) row.month++;
    if (new Date(p.last) > weekAgo) row.week++;
    bySource.set(name, row);
  }
  return {
    days,
    stats: {
      sources: [...bySource.values()].sort((a, b) => b.all - a.all || b.month - a.month),
      visitors_all_time: unique(rows),
      visits_today: perDay.get(today)?.size || 0,
      visits_week: unique(rows.filter(v => new Date(v.visited_at) > weekAgo)),
      visits_month: unique(rows.filter(v => amsterdamDay(v.visited_at).startsWith(month))),
      platform_desktop: unique(rows.filter(v => platformOf(v) === 'desktop_web')),
      platform_mobile: unique(rows.filter(v => platformOf(v) === 'mobile_web')),
      platform_app: unique(rows.filter(v => platformOf(v) === 'native_app')),
      own_devices: own.size,
      // Demo gestart (startDemo logt een bezoek aan /demo): unieke apparaten.
      demo_today: unique(rows.filter(v => isDemo(v) && amsterdamDay(v.visited_at) === today)),
      demo_week: unique(rows.filter(v => isDemo(v) && new Date(v.visited_at) > weekAgo)),
      demo_month: unique(rows.filter(v => isDemo(v) && amsterdamDay(v.visited_at).startsWith(month))),
      demo_all: unique(rows.filter(isDemo)),
      not_counted: notCounted,
      recent_people: [...people.values()]
        .sort((a, b) => (a.last < b.last ? 1 : -1))
        .slice(0, 100)
        .map(p => ({ ...p, source: p.source[1], source_group: p.source[0] }))
    }
  };
}

// ---- Foutenlogboek (tabel app_errors, zie js/core/errors.js) ----
// Laatste 30 dagen, gegroepeerd per fout: hoe vaak, wanneer het laatst, op welke pagina's en apparaten.
async function errorGroups() {
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  const rows = [];
  for (let page = 0; page < 10; page++) {
    const batch = await select(
      'app_errors',
      `created_at=gte.${since}&select=created_at,message,source,line,stack,page,platform,user_agent,app_version&order=created_at.desc&offset=${page * 1000}&limit=1000`
    );
    // Fouten van robots horen niet in het logboek, ook niet als ze er ooit in terecht zijn gekomen.
    rows.push(...(batch || []).filter(r => !NOT_A_VISITOR.test(r.user_agent || '')));
    if (!batch || batch.length < 1000) break;
  }
  const browser = ua =>
    /Edg\//.test(ua)
      ? 'Edge'
      : /CriOS|Chrome\//.test(ua)
        ? 'Chrome'
        : /Firefox|FxiOS/.test(ua)
          ? 'Firefox'
          : /Safari/.test(ua)
            ? 'Safari'
            : 'Anders';
  const groups = new Map();
  for (const r of rows) {
    const key = `${r.message}|${r.source || ''}|${r.line || ''}`;
    let g = groups.get(key);
    if (!g) {
      g = {
        message: r.message,
        source: r.source,
        line: r.line,
        stack: r.stack,
        count: 0,
        last: r.created_at,
        first: r.created_at,
        pages: {},
        devices: {},
        agents: {},
        version: r.app_version
      };
      groups.set(key, g);
    }
    g.count++;
    if (r.created_at < g.first) g.first = r.created_at;
    if (r.page) g.pages[r.page] = (g.pages[r.page] || 0) + 1;
    const d = `${r.platform || '?'} · ${browser(r.user_agent || '')}`;
    g.devices[d] = (g.devices[d] || 0) + 1;
    // Het volledige apparaat (user-agent), om bijvoorbeeld een bot te herkennen achter "Anders".
    if (r.user_agent) g.agents[r.user_agent] = (g.agents[r.user_agent] || 0) + 1;
  }
  const top = obj =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, n]) => `${k} (${n})`);
  const dayAgo = Date.now() - 86400000;
  return {
    total: rows.length,
    last24h: rows.filter(r => new Date(r.created_at) > dayAgo).length,
    groups: [...groups.values()]
      .sort((a, b) => (a.last < b.last ? 1 : -1))
      .map(g => ({ ...g, pages: top(g.pages), devices: top(g.devices), agents: top(g.agents) }))
  };
}

// Referral (Nodig een collega uit, api/referral.js): wie heeft wie aangebracht. Een aangebrachte collega telt pas
// als die het e-mailadres heeft bevestigd én heeft ingelogd; dan claimt de app de beloning (referral_claimed).
async function referralOverview() {
  const users = await listUsers();
  const byId = new Map(users.map(u => [u.id, u]));
  const nameOf = u => u?.user_metadata?.name || '';
  const statusOf = u => {
    const claimed = u.app_metadata?.referral_claimed;
    if (claimed === 'te-oud') return 'verlopen';
    if (claimed === 'onbekend') return 'onbekend';
    if (claimed) return 'geteld';
    return u.email_confirmed_at ? 'wacht op inloggen' : 'wacht op bevestiging';
  };
  const referrals = users
    .filter(
      u => /^[0-9a-f-]{36}$/i.test(String(u.user_metadata?.invited_by || '')) && u.user_metadata.invited_by !== u.id
    )
    .map(u => {
      const inviter = byId.get(u.user_metadata.invited_by);
      const status = statusOf(u);
      return {
        email: u.email,
        name: nameOf(u),
        created_at: u.created_at,
        counted_at: status === 'geteld' ? u.app_metadata.referral_claimed : null,
        status,
        inviter_id: u.user_metadata.invited_by,
        inviter_email: inviter?.email || '(account verwijderd)',
        inviter_name: nameOf(inviter)
      };
    })
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const inviters = new Map();
  for (const r of referrals) {
    const row = inviters.get(r.inviter_id) || {
      email: r.inviter_email,
      name: r.inviter_name,
      counted: 0,
      waiting: 0,
      rewards: Number(byId.get(r.inviter_id)?.app_metadata?.referral_rewards) || 0
    };
    if (r.status === 'geteld') row.counted++;
    else if (r.status.startsWith('wacht')) row.waiting++;
    inviters.set(r.inviter_id, row);
  }
  return {
    inviters: [...inviters.values()].sort((a, b) => b.counted - a.counted || b.waiting - a.waiting),
    referrals: referrals.map(({ inviter_id, ...r }) => r)
  };
}

// Berichten (contactformulier en bugmeldingen), nieuwste eerst, met het aantal ongelezen.
async function contactMessages() {
  const rows = await select(
    'contact_messages',
    'select=id,created_at,kind,name,email,subject,message,page,language,has_screenshot,read_at&order=created_at.desc&limit=300'
  );
  return { messages: rows || [], unread: (rows || []).filter(r => !r.read_at).length };
}

async function unreadMessages() {
  try {
    const rows = await select('contact_messages', 'select=id&read_at=is.null&limit=1000');
    return (rows || []).length;
  } catch {
    return 0;
  }
}

async function markMessage(id, read) {
  const query = id === 'all' ? 'read_at=is.null' : `id=eq.${Number(id)}`;
  await update('contact_messages', query, { read_at: read ? new Date().toISOString() : null });
  return { ok: true };
}

async function deleteMessage(id) {
  if (!Number.isInteger(Number(id))) throw Object.assign(new Error('Onbekend bericht.'), { status: 400 });
  await remove('contact_messages', `id=eq.${Number(id)}`);
  return { ok: true };
}

// ---- Import service (tabel recipe_intakes, bucket 'aanleveringen'; api/aanleveren.js is de klantkant) ----
// aanvraag → goedkeuren (account eigenaar + mail met betaallink) → betaald (webhook) → aangeleverd →
// recepten inladen in de gedeelde map van de organisatie → vrijgeven (accounts, mails) → gegevens gewist.
const intakeId = id => {
  if (!Number.isInteger(Number(id))) throw Object.assign(new Error('Onbekende aanlevering.'), { status: 400 });
  return Number(id);
};
const fail = (message, status = 400) => Object.assign(new Error(message), { status });
async function getIntake(id) {
  const [row] = await select('recipe_intakes', `id=eq.${intakeId(id)}&select=*`);
  if (!row) throw fail('Aanlevering niet gevonden.', 404);
  return row;
}

async function intakes(origin) {
  const rows = await select('recipe_intakes', 'select=*&order=created_at.desc&limit=200');
  const out = await Promise.all(
    (rows || []).map(async r => {
      const files = r.wiped_at ? [] : await storageList(INTAKE_BUCKET, `${r.id}/`).catch(() => []);
      return {
        ...r,
        token: undefined,
        link: deliverLink(origin, r),
        package_label: packageLabel(r.package),
        package_cents: PACKAGES[r.package]?.cents ?? null,
        files: files.map(f => ({ name: f.name, size: f.metadata?.size || 0 }))
      };
    })
  );
  // Gratis introductieplekken: goedgekeurd met prijs 0.
  const freeUsed = (rows || []).filter(r => r.approved_at && r.price_cents === 0).length;
  return { intakes: out, free_left: Math.max(0, FREE_INTRO - freeUsed) };
}

// Goedkeuren: account van de aanvrager klaarzetten (zonder mail, zonder wachtwoord) en de betaallink mailen.
// De prijs volgt uit het pakket; alleen "meer dan 1000 recepten" vraagt een eigen bedrag. "free" = een van de
// gratis introductieplekken. Opnieuw mailen (al goedgekeurd) houdt de eerder bepaalde prijs.
async function approveIntake(id, { free, price_cents: custom } = {}, origin) {
  const row = await getIntake(id);
  if (!['aanvraag', 'afgewezen', 'goedgekeurd'].includes(row.status)) throw fail('Deze aanvraag is al betaald.');
  let cents =
    row.status === 'goedgekeurd' ? row.price_cents : free ? 0 : (PACKAGES[row.package]?.cents ?? Number(custom));
  if (!Number.isInteger(cents) || cents < 0) throw fail('Vul een prijs in voor dit pakket.');
  const owner = await ensureUser(row.email, row.name);
  await update('recipe_intakes', `id=eq.${row.id}`, {
    status: 'goedgekeurd',
    approved_at: new Date().toISOString(),
    rejected_at: null,
    price_cents: cents,
    owner_id: owner.id
  });
  const link = deliverLink(origin, row);
  await sendMail({ to: row.email, ...intakeMail('approved', { ...row, link }) });
  return { ok: true, link };
}

async function rejectIntake(id, reason) {
  const row = await getIntake(id);
  if (row.paid_at) throw fail('Deze aanvraag is al betaald; afwijzen kan niet meer.');
  await update('recipe_intakes', `id=eq.${row.id}`, { status: 'afgewezen', rejected_at: new Date().toISOString() });
  await sendMail({
    to: row.email,
    ...intakeMail('rejected', {
      ...row,
      reason: String(reason || '')
        .trim()
        .slice(0, 1000)
    })
  });
  return { ok: true };
}

async function intakeFileUrl(id, name) {
  const file = String(name || '');
  if (!file || file.includes('/')) throw fail('Onbekend bestand.');
  return { url: await storageDownloadUrl(INTAKE_BUCKET, `${intakeId(id)}/${file}`) };
}

// Recepten (uit de lezer in /admin) in de organisatie zetten: eigendom van de eigenaar, in één gedeelde map
// met de naam van het restaurant, met submappen volgens de mappenstructuur van de klant.
async function importIntakeRecipes(id, recipes) {
  const row = await getIntake(id);
  if (!row.owner_id) throw fail('Keur de aanvraag eerst goed.');
  if (!['betaald', 'ingediend', 'bezig'].includes(row.status)) throw fail('Inladen kan pas na betaling.');
  const list = (Array.isArray(recipes) ? recipes : []).slice(0, 100);
  if (!list.length) throw fail('Geen recepten om in te laden.');

  let mapId = row.shared_map_id;
  if (!mapId) {
    const [map] = await insertReturning('shared_maps', [
      { owner_id: row.owner_id, name: row.restaurant || row.name || 'Recepten' }
    ]);
    mapId = map.id;
    await insert('shared_map_members', { shared_map_id: mapId, user_id: row.owner_id, role: 'owner' });
    await update('recipe_intakes', `id=eq.${row.id}`, { shared_map_id: mapId });
  }
  // Het teamabonnement van de klant hoort bij deze gedeelde map.
  if (row.organization_id)
    await update('organizations', `id=eq.${row.organization_id}`, { shared_map_id: mapId }).catch(() => null);
  // Submappen: bestaande op naam hergebruiken, ontbrekende aanmaken.
  const folders = (await select('shared_folders', `shared_map_id=eq.${mapId}&select=id,name,position`)) || [];
  const byName = new Map(folders.map(f => [f.name.toLowerCase(), f.id]));
  const wanted = [
    ...new Set(
      list
        .map(r =>
          String(r.folder || '')
            .trim()
            .slice(0, 120)
        )
        .filter(Boolean)
    )
  ];
  let position = folders.length;
  for (const name of wanted.filter(n => !byName.has(n.toLowerCase()))) {
    const [f] = await insertReturning('shared_folders', [{ shared_map_id: mapId, name, position: position++ }]);
    byName.set(name.toLowerCase(), f.id);
  }

  const text = (v, max) => String(v ?? '').slice(0, max);
  const lines = v =>
    (Array.isArray(v) ? v : [])
      .map(x => text(x, 2000))
      .filter(x => x.trim())
      .slice(0, 300);
  const inserted = await insertReturning(
    'recipes',
    list.map(r => ({
      user_id: row.owner_id,
      // Recept van de gedeelde map: blijft van het team (supabase/2026-10-28-gedeelde mappen.sql).
      team_id: mapId,
      title: text(r.title, 300).trim() || 'Recept',
      description: null,
      yield_text: text(r.yield, 200).trim() || null,
      ingredients: lines(r.ingredients),
      steps: lines(r.steps)
    }))
  );
  await insertIgnore(
    'shared_map_recipes',
    inserted.map(r => ({ shared_map_id: mapId, recipe_id: r.id })),
    'shared_map_id,recipe_id'
  );
  const folderLinks = inserted
    .map((r, i) => ({
      recipe_id: r.id,
      shared_folder_id: byName.get(
        String(list[i].folder || '')
          .trim()
          .toLowerCase()
      )
    }))
    .filter(l => l.shared_folder_id);
  if (folderLinks.length) await insertIgnore('shared_folder_recipes', folderLinks, 'shared_folder_id,recipe_id');
  const count = (row.imported_count || 0) + inserted.length;
  await update('recipe_intakes', `id=eq.${row.id}`, { imported_count: count, status: 'bezig' });
  return { ok: true, added: inserted.length, total: count };
}

// Aangeleverde bestanden en gegevens wissen (belofte op de site). Wat blijft: naam, restaurant, pakket, data.
async function wipeIntake(row) {
  const files = await storageList(INTAKE_BUCKET, `${row.id}/`).catch(() => []);
  await storageRemove(
    INTAKE_BUCKET,
    files.map(f => `${row.id}/${f.name}`)
  );
  await update('recipe_intakes', `id=eq.${row.id}`, {
    structure: null,
    folders: null,
    match: null,
    notes: null,
    request_notes: null,
    members: [],
    wiped_at: new Date().toISOString()
  });
  return files.length;
}

// Vrijgeven: leden krijgen een account (bestond het al, dan dat), Pro via de organisatie en toegang tot de
// gedeelde map; iedereen (ook de eigenaar) krijgt een mail met een eigen welkomstlink. Daarna wissen.
async function releaseIntake(id, origin) {
  const row = await getIntake(id);
  if (!row.shared_map_id || !row.imported_count) throw fail('Laad eerst de recepten in.');
  if (!row.organization_id) throw fail('Er is nog geen organisatie: is er betaald?');
  const [org] = await select('organizations', `id=eq.${row.organization_id}&select=*`);
  if (!org || !['active', 'trialing'].includes(org.status))
    throw fail('De organisatie is (nog) niet actief: is de betaling verwerkt?');
  const members = (row.members || []).slice(0, Math.max(0, (org.seats || 5) - 1));

  for (const m of members) {
    const user = await ensureUser(m.email);
    await insertIgnore('organization_members', [{ organization_id: org.id, email: m.email }], 'organization_id,email');
    await insertIgnore(
      'shared_map_members',
      [{ shared_map_id: row.shared_map_id, user_id: user.id, role: m.role === 'editor' ? 'editor' : 'viewer' }],
      'shared_map_id,user_id'
    );
  }
  await remove('welcome_links', `expires_at=lt.${new Date().toISOString()}`).catch(() => null);
  const people = [{ email: row.email, name: row.name }, ...members.map(m => ({ email: m.email }))];
  const failed = [];
  for (const p of people) {
    try {
      const token = randomBytes(24).toString('hex');
      await insert('welcome_links', { token, email: p.email });
      const link = `${origin}/api/aanleveren?welkom=${token}`;
      await sendMail({
        to: p.email,
        ...intakeMail('welcome', { ...row, name: p.name || '', link, organization: org.name })
      });
    } catch (e) {
      console.error('Welkomstmail', p.email, e);
      failed.push(p.email);
    }
  }
  await update('recipe_intakes', `id=eq.${row.id}`, { status: 'klaar', released_at: new Date().toISOString() });
  const removed = await wipeIntake(row);
  return { ok: true, sent: people.length - failed.length, failed, removed };
}

async function deleteIntake(id) {
  const row = await getIntake(id);
  await wipeIntake(row);
  await remove('recipe_intakes', `id=eq.${row.id}`);
  return { ok: true };
}

async function clearErrors() {
  await remove('app_errors', 'id=gt.0');
  return { ok: true };
}

async function overview(user, ownVisitor) {
  const [users, profiles, subs, orgs, members, stats, aiCost, revenue, teams, ownFolders, logins] = await Promise.all([
    listUsers(),
    select('profiles', 'select=id,name,organization,country').catch(() =>
      select('profiles', 'select=id,name,organization')
    ),
    select('subscriptions', 'select=*'),
    select('organizations', 'select=*'),
    select('organization_members', 'select=*'),
    rpc('savour_admin_user_stats', {}),
    openAiCostsThisMonth(),
    stripeRevenue30Days(),
    select('shared_maps', 'select=owner_id').catch(() => []),
    select('folders', 'select=user_id').catch(() => []),
    rpc('savour_admin_login_counts', {}).catch(() => null)
  ]);
  const visitors = await visitorStats(await ownVisitorIds(user, ownVisitor)).catch(e => {
    console.error('Bezoekers laden mislukt', e);
    return null;
  });
  const byId = (rows, key = 'id') => new Map((rows || []).map(r => [r[key], r]));
  const profileOf = byId(profiles);
  const subOf = byId(subs, 'user_id');
  const ownOrgOf = byId(orgs, 'owner_id');
  const orgById = byId(orgs);
  const statsOf = byId(stats, 'user_id');
  const loginsOf = byId(logins, 'user_id');
  const memberOrgOfEmail = new Map(
    (members || []).map(m => [String(m.email).toLowerCase(), orgById.get(m.organization_id)])
  );
  const accounts = users
    .map(u => {
      const p = profileOf.get(u.id) || {};
      const s = statsOf.get(u.id) || {};
      const sub = subOf.get(u.id);
      return {
        id: u.id,
        email: u.email,
        name: p.name || u.user_metadata?.name || '',
        organization: p.organization || u.user_metadata?.organization || '',
        country: p.country || '',
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        confirmed: !!(u.email_confirmed_at || u.confirmed_at),
        recipes: Number(s.recipes || 0),
        logins: logins ? Number(loginsOf.get(u.id)?.logins || 0) : null,
        logins_30_days: logins ? Number(loginsOf.get(u.id)?.logins_30_days || 0) : null,
        ai_this_month: Number(s.ai_this_month || 0),
        paid_stripe: !!sub?.stripe_subscription_id && running(sub),
        ...accountType(u, sub, ownOrgOf.get(u.id), memberOrgOfEmail.get(String(u.email).toLowerCase()))
      };
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Waar nieuwe gebruikers afhaken. Beheerders tellen niet mee.
  const real = accounts.filter(a => !ADMIN_EMAILS.includes(String(a.email || '').toLowerCase()));
  const hasMap = new Set((ownFolders || []).map(f => f.user_id));
  const hasTeam = new Set((teams || []).map(t => t.owner_id));
  const funnel = [
    ['Account gemaakt', real.length],
    ['E-mail bevestigd', real.filter(a => a.confirmed).length],
    ['Eerste recept', real.filter(a => a.recipes > 0).length],
    ['10 of meer recepten', real.filter(a => a.recipes >= 10).length],
    ['Receptenmap gemaakt', real.filter(a => hasMap.has(a.id)).length],
    ['Keukenteam gestart', real.filter(a => hasTeam.has(a.id)).length],
    ['Betaalt', real.filter(a => a.paid_stripe || a.type === 'team').length]
  ];

  // Terugkerende omzet per maand: lopende, niet-opgezegde betaalde abonnementen en teams.
  const mrr = [...(subs || []), ...(orgs || [])]
    .filter(r => running(r) && r.stripe_subscription_id && !r.cancel_at_period_end)
    .reduce((sum, r) => sum + (PLAN_MONTHLY_EUR[r.plan] || 0), 0);
  const weekAgo = Date.now() - 7 * 86400000;
  return {
    accounts,
    funnel,
    visitor_days: visitors?.days || null,
    visitor_stats: visitors?.stats || null,
    totals: {
      accounts: accounts.length,
      new_7_days: accounts.filter(a => new Date(a.created_at) > weekAgo).length,
      unconfirmed: accounts.filter(a => !a.confirmed).length,
      free: accounts.filter(a => a.type === 'free').length,
      trial: accounts.filter(a => a.type === 'trial').length,
      pro: accounts.filter(a => a.type === 'pro').length,
      gift: accounts.filter(a => a.type === 'gift').length,
      teams: (orgs || []).filter(o => running(o) && o.stripe_subscription_id).length,
      team_members: accounts.filter(a => a.type === 'team').length,
      recipes: accounts.reduce((sum, a) => sum + a.recipes, 0),
      ai_this_month: accounts.reduce((sum, a) => sum + a.ai_this_month, 0),
      mrr_eur: Math.round(mrr * 100) / 100,
      stripe_30_days: revenue,
      openai_this_month: aiCost
    }
  };
}

// Pro cadeau geven (bijv. 30 dagen om te testen). Nooit over een betaald abonnement heen.
async function giftPro(userId, days) {
  const sub = await getSubscription(userId);
  if (sub?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(sub.status))
    throw Object.assign(new Error('Dit account heeft al een betaald abonnement.'), { status: 409 });
  const until = new Date(Date.now() + Math.min(Math.max(Number(days) || 30, 1), 3650) * 86400000);
  await upsertSubscription({
    user_id: userId,
    status: 'active',
    plan: 'gift',
    current_period_end: until.toISOString()
  });
  return { until: until.toISOString() };
}

// Keukenteams (shared_maps) met hun eigenaar, aantal leden en aantal recepten. Of het team werkt, hangt af van
// de Pro van de eigenaar; dat koppelt het beheerscherm aan de accountlijst uit het overzicht.
async function kitchenTeams() {
  const [maps, members, recipes] = await Promise.all([
    select('shared_maps', 'select=id,owner_id,name,created_at&order=created_at.desc'),
    select('shared_map_members', 'select=shared_map_id,user_id'),
    select('recipes', 'select=team_id&team_id=not.is.null')
  ]);
  const tally = (rows, key) => (rows || []).reduce((m, r) => m.set(r[key], (m.get(r[key]) || 0) + 1), new Map());
  const recipeCount = tally(recipes, 'team_id');
  const memberIds = new Map();
  for (const r of members || []) memberIds.set(r.shared_map_id, [...(memberIds.get(r.shared_map_id) || []), r.user_id]);
  return {
    teams: (maps || []).map(m => ({
      id: m.id,
      name: m.name,
      owner_id: m.owner_id,
      created_at: m.created_at,
      members: (memberIds.get(m.id) || []).length,
      // Eigenaar en leden samen, zonder dubbelen: voor Pro voor het hele team.
      people: [...new Set([m.owner_id, ...(memberIds.get(m.id) || [])].filter(Boolean))],
      recipes: recipeCount.get(m.id) || 0
    }))
  };
}

// Pro voor een heel keukenteam: cadeau-Pro voor de eigenaar en elk lid. Wie al een betaald abonnement heeft, of
// Pro via een organisatie, wordt overgeslagen (giftPro weigert dat).
async function teamPeople(mapId) {
  const [map] = await select('shared_maps', `select=owner_id&id=eq.${encodeURIComponent(mapId)}`);
  if (!map) throw Object.assign(new Error('Keukenteam niet gevonden.'), { status: 404 });
  const members = await select('shared_map_members', `select=user_id&shared_map_id=eq.${encodeURIComponent(mapId)}`);
  return [...new Set([map.owner_id, ...(members || []).map(m => m.user_id)].filter(Boolean))];
}
async function giftTeam(mapId, days) {
  let given = 0;
  let skipped = 0;
  for (const id of await teamPeople(mapId))
    try {
      await giftPro(id, days);
      given++;
    } catch (e) {
      if (e.status !== 409) throw e;
      skipped++;
    }
  return { given, skipped };
}
async function revokeTeamGift(mapId) {
  let revoked = 0;
  for (const id of await teamPeople(mapId)) {
    const sub = await getSubscription(id);
    if (sub?.plan !== 'gift') continue;
    await revokeGift(id);
    revoked++;
  }
  return { revoked };
}

// ---- Ingrediëntenlijst aanvullen (2026-11-06, supabase/2026-11-06-ingredientenlijst-goedkeuren.sql) ----
// De beheerder keurt nieuwe ingrediëntnamen goed. De server geeft alleen de regels uit de recepten met per regel
// willekeurige volgnummers van accounts: genoeg om te tellen in hoeveel accounts een naam staat, nooit wie, welk
// recept of welke titel. De browser maakt er namen van (dezelfde regels als de app, js/features/products.js).
const LANG_OF_COUNTRY = {
  NL: 'nl',
  BE: 'nl',
  SR: 'nl',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  FR: 'fr',
  LU: 'fr'
};
const INGREDIENT_LANGS = ['nl', 'en', 'de', 'es', 'fr'];

// Alle rijen, in stukken van 1000 (de database geeft er per keer niet meer).
async function selectAll(table, query) {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const rows = (await select(table, `${query}&limit=1000&offset=${from}`)) || [];
    out.push(...rows);
    if (rows.length < 1000) return out;
  }
}

async function ingredientCandidates() {
  const [recipes, profiles, decided] = await Promise.all([
    selectAll('recipes', 'select=user_id,title,ingredients&order=id'),
    selectAll('profiles', 'select=id,country&order=id'),
    selectAll('ingredient_list', 'select=id,lang,key,name,head,allergens,status,user_count,reviewed_at&order=id')
  ]);
  const ids = [...new Set(recipes.map(r => r.user_id).filter(Boolean))];
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  const index = new Map(ids.map((id, i) => [id, i]));
  const country = new Map(profiles.map(p => [p.id, String(p.country || '').toUpperCase()]));
  const lines = new Map();
  for (const r of recipes) {
    if (!index.has(r.user_id) || !Array.isArray(r.ingredients)) continue;
    for (const raw of r.ingredients) {
      const line = String(raw || '')
        .trim()
        .toLowerCase()
        .slice(0, 160);
      if (!line) continue;
      if (!lines.has(line)) lines.set(line, new Set());
      lines.get(line).add(index.get(r.user_id));
    }
  }
  // Receptnamen alleen als vingerafdruk (SHA-256, zonder spaties): zo kan de browser "groente fond" herkennen als
  // basisrecept zonder dat de beheerder de titels van anderen ziet.
  const titleHash = t =>
    createHash('sha256')
      .update(
        String(t || '')
          .toLowerCase()
          .replace(/[\s-]+/g, '')
      )
      .digest('hex')
      .slice(0, 16);
  const titles = [
    ...new Set(
      recipes
        .map(r => r.title)
        .filter(Boolean)
        .map(titleHash)
    )
  ];
  return {
    titles,
    // Taal per account volgens het land, als eerste gok; de browser kijkt ook naar de namen zelf.
    accounts: ids.map(id => LANG_OF_COUNTRY[country.get(id)] || ''),
    lines: [...lines].map(([line, set]) => [line, [...set]]),
    decided
  };
}

// Dezelfde codes als ALLERGENS in js/features/products.js.
const ALLERGEN_CODES = new Set([
  'gluten',
  'schaaldieren',
  'ei',
  'vis',
  'pinda',
  'soja',
  'melk',
  'noten',
  'selderij',
  'mosterd',
  'sesam',
  'sulfiet',
  'lupine',
  'weekdieren',
  'lactose',
  'varkensvlees',
  'rundvlees',
  'lam',
  'wild',
  'gevogelte',
  'alcohol',
  'ui',
  'knoflook',
  'peulvruchten',
  'mais',
  'nachtschade',
  'paddenstoelen',
  'pijnboompitten',
  'kokos',
  'maanzaad',
  'kiwi',
  'steenfruit',
  'koriander',
  'glutamaat',
  'histamine',
  'fructose',
  'fodmap'
]);
const cleanText = (s, max = 120) =>
  String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

// Goedkeuren of afwijzen, één of meer namen tegelijk. Bestaat de naam al in die taal, dan telt de nieuwe keuze.
async function decideIngredients(items) {
  const rows = (Array.isArray(items) ? items : []).slice(0, 500).map(x => {
    const lang = INGREDIENT_LANGS.includes(x?.lang) ? x.lang : null;
    const key = cleanText(x?.key).toLowerCase();
    const name = cleanText(x?.name) || key;
    if (!lang || !key || !['approved', 'rejected'].includes(x?.status)) throw fail('Onvolledige keuze.');
    return {
      lang,
      key,
      name,
      head: cleanText(x.head) || null,
      aliases: [...new Set((x.aliases || []).map(a => cleanText(a).toLowerCase()).filter(Boolean))].slice(0, 50),
      allergens: [...new Set((x.allergens || []).filter(a => ALLERGEN_CODES.has(a)))],
      status: x.status,
      user_count: Math.max(0, Math.min(100000, Number(x.user_count) || 0)),
      reviewed_at: new Date().toISOString()
    };
  });
  if (!rows.length) return { saved: [] };
  return { saved: (await upsert('ingredient_list', rows, 'lang,key')) || [] };
}

// Een keuze terugdraaien: de naam staat daarna weer bij de nieuwe namen.
async function undoIngredient(id) {
  if (!/^\d+$/.test(String(id || ''))) throw fail('Onbekende regel.');
  await remove('ingredient_list', `id=eq.${id}`);
  return { ok: true };
}

// ---- Activiteit: wat gebruikers doen (Overzicht). Alleen aantallen, zonder beheerders. ----
// Recepten per week (nieuw), accounts die iets deden (recept toegevoegd of aangepast), gedeelde links en
// keukenteamrecepten. Leest geen recepten: alleen wie (als telling) en wanneer.
const weekStart = iso => {
  const d = new Date(iso);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
};
async function activity() {
  const [users, recipes, shares, favorites] = await Promise.all([
    listUsers(),
    selectAll('recipes', 'select=user_id,team_id,created_at,updated_at&order=id'),
    selectAll('public_recipe_shares', 'select=owner_id,enabled,created_at&order=id'),
    selectAll('favorites', 'select=user_id&order=user_id')
  ]);
  const admins = new Set(
    (users || []).filter(u => ADMIN_EMAILS.includes(String(u.email || '').toLowerCase())).map(u => u.id)
  );
  const real = recipes.filter(r => r.user_id && !admins.has(r.user_id));
  const now = Date.now();
  const since = days => now - days * 86400000;
  const touched = (r, days) => Math.max(Date.parse(r.created_at) || 0, Date.parse(r.updated_at) || 0) > since(days);
  const activeIn = days => new Set(real.filter(r => touched(r, days)).map(r => r.user_id)).size;
  // Laatste 8 weken, oudste eerst.
  const weeks = [];
  for (let i = 7; i >= 0; i--) weeks.push(weekStart(new Date(now - i * 7 * 86400000).toISOString()));
  const perWeek = weeks.map(week => {
    const inWeek = real.filter(r => weekStart(r.created_at) === week);
    return { week, recipes: inWeek.length, accounts: new Set(inWeek.map(r => r.user_id)).size };
  });
  const recipeCounts = new Map();
  for (const r of real) recipeCounts.set(r.user_id, (recipeCounts.get(r.user_id) || 0) + 1);
  const realShares = shares.filter(x => x.enabled && !admins.has(x.owner_id));
  return {
    active_7: activeIn(7),
    active_30: activeIn(30),
    recipes_7: real.filter(r => Date.parse(r.created_at) > since(7)).length,
    recipes_30: real.filter(r => Date.parse(r.created_at) > since(30)).length,
    team_recipes: real.filter(r => r.team_id).length,
    shares: realShares.length,
    shares_30: realShares.filter(x => Date.parse(x.created_at) > since(30)).length,
    favorites: favorites.filter(x => !admins.has(x.user_id)).length,
    median_recipes: (() => {
      const list = [...recipeCounts.values()].sort((a, b) => a - b);
      return list.length ? list[Math.floor(list.length / 2)] : 0;
    })(),
    weeks: perWeek
  };
}

async function revokeGift(userId) {
  const sub = await getSubscription(userId);
  if (sub?.plan !== 'gift') throw Object.assign(new Error('Dit account heeft geen cadeau-Pro.'), { status: 409 });
  await upsertSubscription({ user_id: userId, status: 'inactive', current_period_end: new Date().toISOString() });
  return { ok: true };
}

// Nieuw account aanmaken: uitnodiging per mail, de gebruiker kiest zelf een wachtwoord.
async function createAccount({ email, name, organization }, origin) {
  const clean = String(email || '')
    .trim()
    .toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean))
    throw Object.assign(new Error('Vul een geldig e-mailadres in.'), { status: 400 });
  const users = await listUsers();
  if (users.some(u => String(u.email || '').toLowerCase() === clean))
    throw Object.assign(new Error('Er bestaat al een account met dit e-mailadres.'), { status: 409 });
  const user = await inviteUser(
    clean,
    { name: String(name || '').trim(), organization: String(organization || '').trim() },
    `${origin}/`
  );
  return { id: user?.id, email: clean };
}

// Account verwijderen met alle gegevens. Nooit je eigen account, en nooit een account met een betaald
// abonnement of team dat nog doorloopt (dan blijft Stripe afschrijven): eerst opzeggen.
// Account handmatig bevestigen, bijvoorbeeld als de bevestigingsmail niet aankwam.
async function confirmAccount(userId) {
  const user = await confirmAuthUser(userId);
  return { ok: true, email: user?.email || '' };
}

async function deleteAccount(userId, adminUser) {
  if (userId === adminUser.id)
    throw Object.assign(new Error('Je kunt je eigen account niet verwijderen.'), { status: 400 });
  const users = await listUsers();
  const target = users.find(u => u.id === userId);
  if (!target) throw Object.assign(new Error('Account niet gevonden.'), { status: 404 });
  if (ADMIN_EMAILS.includes(String(target.email || '').toLowerCase()))
    throw Object.assign(new Error('Een beheerdersaccount kan hier niet worden verwijderd.'), { status: 400 });
  const sub = await getSubscription(userId);
  const [org] = await select('organizations', `owner_id=eq.${encodeURIComponent(userId)}&select=*`);
  // Alleen tegenhouden als Stripe nog gaat afschrijven. Opgezegd (loopt af aan het eind van de periode)
  // of al beëindigd mag gewoon weg.
  const stillBilling = row =>
    row?.stripe_subscription_id && running(row) && row.status !== 'canceled' && !row.cancel_at_period_end;
  if (stillBilling(sub) || stillBilling(org))
    throw Object.assign(
      new Error(
        'Dit account heeft een betaald abonnement of team dat nog doorloopt. Zeg het eerst op (Stripe of via Abonnement beheren); daarna kun je het account verwijderen.'
      ),
      {
        status: 409
      }
    );

  const id = encodeURIComponent(userId);
  const ids = async (table, filter) =>
    ((await select(table, `${filter}&select=id`).catch(() => [])) || []).map(r => r.id);
  const recipeIds = await ids('recipes', `user_id=eq.${id}`);
  const mapIds = await ids('shared_maps', `owner_id=eq.${id}`);
  const folderIds = await ids('folders', `user_id=eq.${id}`);
  const skipped = [];
  // Verwijderen in stukjes van 100, zodat het adres niet te lang wordt. Een tabel die niet bestaat of geen
  // passende kolom heeft, wordt overgeslagen en gemeld.
  const drop = async (table, column, values) => {
    for (let i = 0; i < values.length; i += 100) {
      const list = values
        .slice(i, i + 100)
        .map(v => `"${v}"`)
        .join(',');
      await remove(table, `${column}=in.(${list})`).catch(e => skipped.push(`${table}.${column}: ${e.message}`));
    }
  };
  const dropOne = (table, filter) => remove(table, filter).catch(e => skipped.push(`${table}: ${e.message}`));

  await drop('shared_folder_recipes', 'shared_map_id', mapIds);
  await drop('shared_folder_recipes', 'recipe_id', recipeIds);
  await drop('shared_map_recipes', 'shared_map_id', mapIds);
  await drop('shared_map_recipes', 'recipe_id', recipeIds);
  await drop('shared_folders', 'shared_map_id', mapIds);
  await drop('shared_map_members', 'shared_map_id', mapIds);
  await dropOne('shared_map_members', `user_id=eq.${id}`);
  await dropOne('shared_maps', `owner_id=eq.${id}`);
  await drop('folder_recipes', 'folder_id', folderIds);
  await drop('folder_recipes', 'recipe_id', recipeIds);
  await drop('favorites', 'recipe_id', recipeIds);
  await dropOne('favorites', `user_id=eq.${id}`);
  await dropOne('folders', `user_id=eq.${id}`);
  await dropOne('categories', `user_id=eq.${id}`);
  await dropOne('recipe_sources', `user_id=eq.${id}`);
  await dropOne('recipes', `user_id=eq.${id}`);
  await dropOne('ai_usage', `user_id=eq.${id}`);
  await dropOne('subscriptions', `user_id=eq.${id}`);
  await dropOne('organization_members', `email=eq.${encodeURIComponent(String(target.email || '').toLowerCase())}`);
  await dropOne('organizations', `owner_id=eq.${id}`);
  await dropOne('profiles', `id=eq.${id}`);
  await deleteAuthUser(userId);
  if (skipped.length) console.warn('Account verwijderd; overgeslagen:', skipped);
  return { ok: true, email: target.email, recipes: recipeIds.length };
}

// ---- AdSense: inkomsten via de AdSense Management API ----
// Client-id en -geheim staan in Vercel (GOOGLE_ADSENSE_CLIENT_ID, GOOGLE_ADSENSE_CLIENT_SECRET). De refresh-token komt
// uit de knop "Koppel AdSense" en staat in admin_settings, die alleen de server kan lezen (supabase/2026-11-01-admin-settings.sql).
const ADSENSE_ACCOUNT = 'accounts/pub-8120664667405598';
const ADSENSE_TOKEN_KEY = 'adsense_refresh_token';
const adsenseClientId = () => process.env.GOOGLE_ADSENSE_CLIENT_ID;
const adsenseSecret = () => process.env.GOOGLE_ADSENSE_CLIENT_SECRET;

function adsenseAuthUrl(origin, state) {
  if (!adsenseClientId() || !adsenseSecret()) throw new Error('De AdSense-gegevens ontbreken nog in Vercel.');
  const q = new URLSearchParams({
    client_id: adsenseClientId(),
    redirect_uri: `${origin}/admin`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/adsense.readonly',
    access_type: 'offline',
    prompt: 'consent',
    state: String(state || '')
  });
  return { url: `https://accounts.google.com/o/oauth2/v2/auth?${q}` };
}

async function googleToken(params) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: adsenseClientId(), client_secret: adsenseSecret(), ...params })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'google_token');
  return data;
}

async function adsenseConnect(code, origin) {
  if (!code) throw new Error('Geen code van Google ontvangen.');
  const token = await googleToken({ code, grant_type: 'authorization_code', redirect_uri: `${origin}/admin` });
  if (!token.refresh_token) throw new Error('Google gaf geen blijvende toegang. Probeer het opnieuw.');
  await remove('admin_settings', `key=eq.${ADSENSE_TOKEN_KEY}`);
  await insert('admin_settings', { key: ADSENSE_TOKEN_KEY, value: token.refresh_token });
  return { ok: true };
}

async function adsenseDisconnect() {
  await remove('admin_settings', `key=eq.${ADSENSE_TOKEN_KEY}`);
  return { ok: true };
}

async function adsenseRange(accessToken, dateRange, dimension, limit, extra = {}) {
  const q = new URLSearchParams({ dateRange });
  for (const metric of ['ESTIMATED_EARNINGS', 'PAGE_VIEWS', 'IMPRESSIONS', 'CLICKS']) q.append('metrics', metric);
  if (dimension) q.append('dimensions', dimension);
  for (const [key, value] of Object.entries(extra)) q.append(key, String(value));
  if (limit) {
    q.append('orderBy', '-ESTIMATED_EARNINGS');
    q.append('limit', String(limit));
  }
  const response = await fetch(`https://adsense.googleapis.com/v2/${ADSENSE_ACCOUNT}/reports:generate?${q}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `AdSense-fout (${response.status})`);
  const names = (data.headers || []).map(h => h.name);
  const row = cells => Object.fromEntries(names.map((name, i) => [name, cells?.[i]?.value ?? '']));
  return {
    currency: (data.headers || []).find(h => h.currencyCode)?.currencyCode || 'EUR',
    totals: row(data.totals?.cells),
    rows: (data.rows || []).map(r => row(r.cells))
  };
}

// Saldo dat nog niet is uitbetaald, als getal. null als Google het niet geeft.
async function adsenseUnpaid(accessToken) {
  try {
    const response = await fetch(`https://adsense.googleapis.com/v2/${ADSENSE_ACCOUNT}/payments`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) return null;
    const data = await response.json();
    const amount = (data.payments || []).find(p => /\/unpaid$/.test(p.name || ''))?.amount;
    const digits = String(amount || '').match(/\d[\d.,]*/)?.[0];
    if (!digits) return null;
    const value = Number(digits.replace(/[.,](?=\d{3}(\D|$))/g, '').replace(',', '.'));
    return Number.isFinite(value) ? value : null;
  } catch (e) {
    return null;
  }
}

async function adsenseReport() {
  if (!adsenseClientId() || !adsenseSecret()) return { state: 'setup' };
  let rows;
  try {
    rows = await select('admin_settings', `key=eq.${ADSENSE_TOKEN_KEY}&select=value`);
  } catch (e) {
    return { state: 'sql' };
  }
  const refresh = rows?.[0]?.value;
  if (!refresh) return { state: 'connect' };
  let accessToken;
  try {
    accessToken = (await googleToken({ refresh_token: refresh, grant_type: 'refresh_token' })).access_token;
  } catch (e) {
    return { state: 'connect', expired: true };
  }
  // Een losse uitsplitsing mag mislukken; de totalen blijven dan gewoon zichtbaar.
  const part = (dimension, limit) =>
    adsenseRange(accessToken, 'MONTH_TO_DATE', dimension, limit).then(
      r => r.rows,
      () => []
    );
  const [today, week, month, units, pages, countries, devices, daily, unpaid] = await Promise.all([
    adsenseRange(accessToken, 'TODAY'),
    adsenseRange(accessToken, 'LAST_7_DAYS'),
    adsenseRange(accessToken, 'MONTH_TO_DATE'),
    part('AD_UNIT_NAME', 50),
    part('PAGE_URL', 200),
    part('COUNTRY_NAME', 10),
    part('PLATFORM_TYPE_NAME', 5),
    adsenseRange(accessToken, 'LAST_30_DAYS', 'DATE').then(
      r => r.rows,
      () => []
    ),
    adsenseUnpaid(accessToken)
  ]);
  return {
    state: 'ok',
    currency: month.currency,
    today: today.totals,
    week: week.totals,
    month: month.totals,
    daily,
    unpaid,
    units,
    pages,
    countries,
    devices
  };
}

// ---- Financiën (/admin → Financiën): omzet, kosten, winst en gewerkte uren ----
// Automatisch: Stripe (omzet en betaalkosten), AdSense en OpenAI. Eigen kosten en uren staan als JSON in admin_settings.
const FINANCE_COSTS = 'finance_costs';
const FINANCE_HOURS = 'finance_hours';
const COST_CATEGORIES = ['Software', 'Hosting', 'AI', 'Marketing', 'Administratie', 'Overig'];
const HOUR_SOURCES = ['Claude-chat', 'ChatGPT', 'Zelf gewerkt', 'Overig'];
const EUR_PER_USD = 0.92; // Vaste afronding: OpenAI rekent in dollars.

async function settingList(key) {
  const rows = await select('admin_settings', `key=eq.${key}&select=value`);
  try {
    const list = JSON.parse(rows?.[0]?.value || '[]');
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

async function saveSettingList(key, list) {
  await remove('admin_settings', `key=eq.${key}`);
  await insert('admin_settings', { key, value: JSON.stringify(list) });
}

// Alle maanden sinds de start van Savour, of eerder als er oudere kosten zijn ingevoerd.
const FINANCE_START = '2026-09';
const financeMonths = costs => {
  const first = [FINANCE_START, ...costs.map(c => String(c.date || '').slice(0, 7)).filter(Boolean)].sort()[0];
  const end = new Date().toISOString().slice(0, 7);
  const months = [];
  for (let [year, month] = first.split('-').map(Number); ; month++) {
    if (month > 12) [year, month] = [year + 1, 1];
    const key = `${year}-${String(month).padStart(2, '0')}`;
    months.push(key);
    if (key >= end) return months;
  }
};

// Omzet en betaalkosten per maand uit Stripe, na terugbetalingen.
async function stripeMonths(months) {
  if (!hasStripe()) return null;
  const since = Math.floor(Date.parse(`${months[0]}-01T00:00:00Z`) / 1000);
  const result = {};
  // Elke betaling los, voor de tabel in Financiën: wat er betaald is, wat terug is gegaan en of Stripe het geld al
  // heeft vrijgegeven. Betalingen van een beheerder zelf staan erin, maar tellen niet als omzet.
  const charges = [];
  let after = '';
  for (let page = 0; page < 50; page++) {
    const data = await stripe(
      `charges?limit=100&created[gte]=${since}&expand[]=data.balance_transaction&expand[]=data.customer${after}`,
      null,
      'GET'
    );
    for (const c of data.data || []) {
      const own = ownCharge(c);
      const bt = c.balance_transaction || {};
      charges.push({
        date: new Date(c.created * 1000).toISOString(),
        amount: c.amount / 100,
        refunded: (c.amount_refunded || 0) / 100,
        fee: (bt.fee || 0) / 100,
        paid: !!c.paid,
        status: c.refunded ? 'refunded' : c.paid ? bt.status || 'pending' : c.status,
        available_on: bt.available_on ? new Date(bt.available_on * 1000).toISOString() : null,
        description: String(c.description || c.calculated_statement_descriptor || '').slice(0, 120),
        own
      });
      if (!c.paid) continue;
      const month = new Date(c.created * 1000).toISOString().slice(0, 7);
      const row = (result[month] ||= { revenue: 0, fees: 0, own: 0 });
      const net = (c.amount - (c.amount_refunded || 0)) / 100;
      if (own) row.own += net;
      else row.revenue += net;
      // Betaalkosten zijn ook bij een eigen betaling echte kosten.
      row.fees += (bt.fee || 0) / 100;
    }
    if (!data.has_more) break;
    after = `&starting_after=${data.data[data.data.length - 1].id}`;
  }
  result.charges = charges.sort((a, b) => b.date.localeCompare(a.date));
  return result;
}

async function adsenseMonths(months) {
  if (!adsenseClientId() || !adsenseSecret()) return null;
  const rows = await select('admin_settings', `key=eq.${ADSENSE_TOKEN_KEY}&select=value`);
  if (!rows?.[0]?.value) return null;
  const { access_token: accessToken } = await googleToken({
    refresh_token: rows[0].value,
    grant_type: 'refresh_token'
  });
  const [year, month] = months[0].split('-').map(Number);
  const now = new Date();
  const report = await adsenseRange(accessToken, 'CUSTOM', 'MONTH', 0, {
    'startDate.year': year,
    'startDate.month': month,
    'startDate.day': 1,
    'endDate.year': now.getFullYear(),
    'endDate.month': now.getMonth() + 1,
    'endDate.day': now.getDate()
  });
  return Object.fromEntries(report.rows.map(r => [r.MONTH, Number(r.ESTIMATED_EARNINGS) || 0]));
}

// AI-kosten per maand uit OpenAI (admin-sleutel), omgerekend naar euro.
async function openAiMonths(months) {
  const key = process.env.OPENAI_ADMIN_KEY;
  if (!key) return null;
  const start = Math.floor(Date.parse(`${months[0]}-01T00:00:00Z`) / 1000);
  const result = {};
  let pageToken = '';
  for (let page = 0; page < 3; page++) {
    const response = await fetch(
      `https://api.openai.com/v1/organization/costs?start_time=${start}&bucket_width=1d&limit=180${pageToken}`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    for (const bucket of data.data || []) {
      const month = new Date(bucket.start_time * 1000).toISOString().slice(0, 7);
      for (const r of bucket.results || [])
        result[month] = (result[month] || 0) + (Number(r.amount?.value) || 0) * EUR_PER_USD;
    }
    if (!data.has_more || !data.next_page) break;
    pageToken = `&page=${encodeURIComponent(data.next_page)}`;
  }
  return result;
}

async function financeOverview() {
  const [costs, hours] = await Promise.all([settingList(FINANCE_COSTS), settingList(FINANCE_HOURS)]);
  const months = financeMonths(costs);
  const safe = promise => promise.catch(error => (console.error('Financiën', error), null));
  const [stripeData, ads, openai] = await Promise.all([
    safe(stripeMonths(months)),
    safe(adsenseMonths(months)),
    safe(openAiMonths(months))
  ]);
  return {
    months,
    stripe: stripeData,
    ads,
    openai,
    costs,
    hours,
    measured: MEASURED_HOURS,
    categories: COST_CATEGORIES,
    sources: HOUR_SOURCES
  };
}

async function saveFinanceCost(cost) {
  const amount = Number(String(cost?.amount ?? '').replace(',', '.'));
  const name = String(cost?.name || '')
    .trim()
    .slice(0, 120);
  if (!name) throw Object.assign(new Error('Vul een naam in.'), { status: 400 });
  if (!(amount >= 0 && amount <= 10000000))
    throw Object.assign(new Error('Vul een geldig bedrag in.'), { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cost?.date || ''))
    throw Object.assign(new Error('Vul een datum in.'), { status: 400 });
  const until = /^\d{4}-\d{2}$/.test(cost?.until || '') ? cost.until : '';
  const list = await settingList(FINANCE_COSTS);
  list.push({
    id: randomBytes(8).toString('hex'),
    name,
    amount: Math.round(amount * 100) / 100,
    date: cost.date,
    category: COST_CATEGORIES.includes(cost?.category) ? cost.category : 'Overig',
    repeat: ['none', 'month', 'year'].includes(cost?.repeat) ? cost.repeat : 'none',
    until
  });
  await saveSettingList(FINANCE_COSTS, list);
  return { ok: true };
}

async function saveFinanceHours(entry) {
  const hours = Number(String(entry?.hours ?? '').replace(',', '.'));
  if (!(hours > 0 && hours <= 100000))
    throw Object.assign(new Error('Vul een geldig aantal uren in.'), { status: 400 });
  const list = await settingList(FINANCE_HOURS);
  list.push({
    id: randomBytes(8).toString('hex'),
    source: HOUR_SOURCES.includes(entry?.source) ? entry.source : 'Overig',
    hours: Math.round(hours * 10) / 10,
    note: String(entry?.note || '')
      .trim()
      .slice(0, 160)
  });
  await saveSettingList(FINANCE_HOURS, list);
  return { ok: true };
}

async function deleteFinanceItem(key, id) {
  const list = await settingList(key);
  await saveSettingList(
    key,
    list.filter(x => x.id !== String(id))
  );
  return { ok: true };
}

// ---- Nieuwsbrief: mail aan accounts, in huisstijl. Afmeldingen en verzendlijst staan in admin_settings. ----
const NEWS_OPTOUT = 'newsletter_optout';
const NEWS_SENT = 'newsletter_sent';

const newsToken = id =>
  createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY || '')
    .update(`afmelden:${id}`)
    .digest('hex')
    .slice(0, 32);
const newsUnsubscribeUrl = (id, lang) =>
  `https://savour.page/api/admin?afmelden=${id}&t=${newsToken(id)}${lang === 'en' ? '&lang=en' : ''}`;

function newsFields(mail = {}) {
  const clean = (v, max) =>
    String(v || '')
      .trim()
      .slice(0, max);
  const out = {
    lang: mail.lang === 'en' ? 'en' : 'nl',
    subject: clean(mail.subject, 150),
    heading: clean(mail.heading, 150),
    body: clean(mail.body, 10000),
    buttonLabel: clean(mail.button_label, 60),
    buttonUrl: clean(mail.button_url, 500)
  };
  if (out.buttonUrl && !/^https:\/\//.test(out.buttonUrl)) throw new Error('De knoplink moet met https:// beginnen.');
  return out;
}

async function newsPeople() {
  const [users, profiles, stats, optout] = await Promise.all([
    listUsers(),
    select('profiles', 'select=id,name'),
    rpc('savour_admin_user_stats', {}),
    settingList(NEWS_OPTOUT)
  ]);
  const names = new Map((profiles || []).map(p => [p.id, p.name]));
  const recipes = new Map((stats || []).map(s => [s.user_id, Number(s.recipes || 0)]));
  const off = new Set(optout);
  return users
    .map(u => ({
      id: u.id,
      email: u.email,
      name: names.get(u.id) || u.user_metadata?.name || '',
      created_at: u.created_at,
      recipes: recipes.get(u.id) || 0,
      confirmed: !!(u.email_confirmed_at || u.confirmed_at),
      unsubscribed: off.has(u.id)
    }))
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}

async function newsSend(mail, ids, adminEmail, test) {
  const fields = newsFields(mail);
  if (!fields.subject || !fields.body) throw new Error('Vul een onderwerp en tekst in.');
  const people = await newsPeople();
  if (test) {
    const me = people.find(p => p.email === adminEmail) || { id: 'test', email: adminEmail, name: '' };
    const m = newsletterMail({ ...fields, name: me.name, unsubscribeUrl: newsUnsubscribeUrl(me.id, fields.lang) });
    await sendMailBatch([{ to: adminEmail, ...m, subject: `[Test] ${m.subject}` }]);
    return { ok: true, sent: 1 };
  }
  const wanted = new Set(ids || []);
  const list = people.filter(p => wanted.has(p.id) && p.confirmed && !p.unsubscribed);
  if (!list.length) throw new Error('Kies minstens één ontvanger.');
  const sent = await sendMailBatch(
    list.map(p => {
      const unsubscribeUrl = newsUnsubscribeUrl(p.id, fields.lang);
      return {
        to: p.email,
        ...newsletterMail({ ...fields, name: p.name, unsubscribeUrl }),
        headers: { 'List-Unsubscribe': `<${unsubscribeUrl}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' }
      };
    })
  );
  const history = await settingList(NEWS_SENT);
  await saveSettingList(
    NEWS_SENT,
    [{ date: new Date().toISOString(), subject: fields.subject, count: sent }, ...history].slice(0, 100)
  );
  return { ok: true, sent };
}

// Link onderaan elke mail. Openen vraagt eerst om een klik, zodat een mailscanner niemand per ongeluk afmeldt.
async function newsUnsubscribe(req, res) {
  const id = String(req.query.afmelden);
  const en = req.query.lang === 'en';
  const page = (title, content) =>
    res
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        `<!doctype html><html lang="${en ? 'en' : 'nl'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Savour</title></head><body style="margin:0;background:#0d1314;color:#eee8dc;font-family:Helvetica,Arial,sans-serif;text-align:center;padding:64px 20px"><div style="font-family:Georgia,serif;letter-spacing:.34em;color:#e8ca8d;font-size:20px">SAVOUR</div><h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px">${title}</h1>${content}</body></html>`
      );
  if (!/^[0-9a-f-]{36}$/.test(id) || req.query.t !== newsToken(id))
    return page(
      en ? 'This link is not valid' : 'Deze link klopt niet',
      en ? '<p>Feel free to email us: contact@savour.page</p>' : '<p>Stuur ons gerust een mail: contact@savour.page</p>'
    );
  if (req.method === 'POST') {
    const list = await settingList(NEWS_OPTOUT);
    if (!list.includes(id)) await saveSettingList(NEWS_OPTOUT, [...list, id]);
    return page(
      en ? 'You are unsubscribed' : 'Je bent afgemeld',
      en
        ? '<p>You will no longer receive news from us. Emails about your account will still arrive.</p>'
        : '<p>Je krijgt geen nieuws meer van ons. Mails over je account blijven wel komen.</p>'
    );
  }
  return page(
    en ? 'Unsubscribe from Savour news?' : 'Afmelden voor nieuws van Savour?',
    '<form method="post"><button style="background:#e8ca8d;color:#111;border:0;border-radius:999px;padding:13px 24px;font-size:15px;font-weight:bold;cursor:pointer">' +
      (en ? 'Unsubscribe' : 'Afmelden') +
      '</button></form>'
  );
}

// Openbare cijfers voor de startpagina (GET /api/admin?cijfers=1): alleen drie totalen, niets per gebruiker.
// Vercel bewaart het antwoord een uur, zodat niet elke bezoeker de database laat tellen.
async function siteFigures(res) {
  if (!hasServiceRole()) return res.status(503).json({ error: 'Niet beschikbaar.' });
  try {
    const [recipes, teams, users] = await Promise.all([countRows('recipes'), countRows('shared_maps'), listUsers()]);
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ recipes, teams, accounts: users.length });
  } catch (e) {
    console.error('Cijfers startpagina', e);
    return res.status(500).json({ error: 'Niet beschikbaar.' });
  }
}

export default async function handler(req, res) {
  if (req.query?.afmelden) return newsUnsubscribe(req, res);
  if (req.query?.cijfers && req.method === 'GET') return siteFigures(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  // Geen (geldige) inlog-sleutel is iets anders dan geen beheerder: de pagina ververst dan zelf de sessie.
  if (!user) return res.status(401).json({ error: 'Sessie verlopen. Log opnieuw in.' });
  if (!ADMIN_EMAILS.includes(String(user.email || '').toLowerCase()))
    return res.status(403).json({ error: 'Geen beheerdersrechten.' });
  const { action, user_id: userId, days, email, name, organization, own_visitor: ownVisitor } = req.body || {};
  // Elk apparaat waarop de beheerder is ingelogd telt als eigen apparaat en niet mee in de bezoekers.
  if (action === 'whoami') {
    if (ownVisitor && hasServiceRole()) await ownVisitorIds(user, ownVisitor).catch(() => null);
    // Aantal ongelezen berichten, voor het signaal bij "Admin" in de app.
    const unread = hasServiceRole() ? await unreadMessages() : 0;
    return res.status(200).json({ admin: true, email: user.email, unread_messages: unread });
  }
  if (!hasServiceRole()) return res.status(503).json({ error: 'SUPABASE_SERVICE_ROLE_KEY ontbreekt in Vercel.' });
  try {
    if (action === 'overview') return res.status(200).json(await overview(user, ownVisitor));
    if (action === 'gift' && userId) return res.status(200).json(await giftPro(userId, days));
    if (action === 'revoke_gift' && userId) return res.status(200).json(await revokeGift(userId));
    if (action === 'create_account')
      return res.status(200).json(await createAccount({ email, name, organization }, siteOrigin(req)));
    if (action === 'errors') return res.status(200).json(await errorGroups());
    if (action === 'ingredient_candidates') return res.status(200).json(await ingredientCandidates());
    if (action === 'ingredient_decide') return res.status(200).json(await decideIngredients(req.body?.items));
    if (action === 'ingredient_undo') return res.status(200).json(await undoIngredient(req.body?.id));
    if (action === 'activity') return res.status(200).json(await activity());
    if (action === 'kitchen_teams') return res.status(200).json(await kitchenTeams());
    if (action === 'gift_team' && req.body?.map_id) return res.status(200).json(await giftTeam(req.body.map_id, days));
    if (action === 'revoke_team_gift' && req.body?.map_id)
      return res.status(200).json(await revokeTeamGift(req.body.map_id));
    if (action === 'adsense') return res.status(200).json(await adsenseReport());
    if (action === 'finance') return res.status(200).json(await financeOverview());
    if (action === 'newsletter')
      return res.status(200).json({ people: await newsPeople(), sent: await settingList(NEWS_SENT) });
    if (action === 'newsletter_preview')
      return res.status(200).json({
        html: newsletterMail({ ...newsFields(req.body?.mail), name: name || '', unsubscribeUrl: 'https://savour.page' })
          .html
      });
    if (action === 'newsletter_send')
      return res.status(200).json(await newsSend(req.body?.mail, req.body?.ids, user.email, !!req.body?.test));
    if (action === 'finance_save_cost') return res.status(200).json(await saveFinanceCost(req.body?.cost));
    if (action === 'finance_save_hours') return res.status(200).json(await saveFinanceHours(req.body?.entry));
    if (action === 'finance_delete_cost')
      return res.status(200).json(await deleteFinanceItem(FINANCE_COSTS, req.body?.id));
    if (action === 'finance_delete_hours')
      return res.status(200).json(await deleteFinanceItem(FINANCE_HOURS, req.body?.id));
    if (action === 'adsense_auth_url') return res.status(200).json(adsenseAuthUrl(siteOrigin(req), req.body?.state));
    if (action === 'adsense_connect')
      return res.status(200).json(await adsenseConnect(req.body?.code, siteOrigin(req)));
    if (action === 'adsense_disconnect') return res.status(200).json(await adsenseDisconnect());
    if (action === 'messages') return res.status(200).json(await contactMessages());
    if (action === 'referrals') return res.status(200).json(await referralOverview());
    if (action === 'delete_message') return res.status(200).json(await deleteMessage(req.body?.id));
    if (action === 'mark_message')
      return res.status(200).json(await markMessage(req.body?.id, req.body?.read !== false));
    if (action === 'clear_errors') return res.status(200).json(await clearErrors());
    if (action === 'intakes') return res.status(200).json(await intakes(siteOrigin(req)));
    if (action === 'approve_intake')
      return res.status(200).json(await approveIntake(req.body?.id, req.body || {}, siteOrigin(req)));
    if (action === 'reject_intake') return res.status(200).json(await rejectIntake(req.body?.id, req.body?.reason));
    if (action === 'intake_file') return res.status(200).json(await intakeFileUrl(req.body?.id, req.body?.file));
    if (action === 'import_intake')
      return res.status(200).json(await importIntakeRecipes(req.body?.id, req.body?.recipes));
    if (action === 'release_intake') return res.status(200).json(await releaseIntake(req.body?.id, siteOrigin(req)));
    if (action === 'delete_intake') return res.status(200).json(await deleteIntake(req.body?.id));
    if (action === 'confirm_account' && userId) return res.status(200).json(await confirmAccount(userId));
    if (action === 'delete_account' && userId) return res.status(200).json(await deleteAccount(userId, user));
    return res.status(400).json({ error: 'Onbekende actie.' });
  } catch (error) {
    console.error('Admin', action, error);
    return res.status(error.status || 500).json({ error: error.message || 'Er ging iets mis.' });
  }
}
