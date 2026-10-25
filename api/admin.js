// Beheerscherm (/admin): accounts met hun abonnement, Pro cadeau geven, omzet en AI-kosten.
// Alleen voor beheerders: het e-mailadres van de ingelogde gebruiker moet in ADMIN_EMAILS staan
// (Vercel, komma-gescheiden). Wachtwoorden staan nooit in de code; inloggen gaat via Supabase.
import { getUserFromRequest } from './_lib/auth.js';
import {
  select,
  remove,
  rpc,
  listUsers,
  getSubscription,
  upsertSubscription,
  hasServiceRole,
  inviteUser,
  deleteAuthUser,
  confirmAuthUser,
  updateAppMetadata
} from './_lib/supabase-admin.js';
import { siteOrigin } from './_lib/origin.js';
import { stripe, hasStripe, PLAN_MONTHLY_EUR } from './_lib/stripe.js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'schreurs.jop@gmail.com')
  .split(',')
  .map(x => x.trim().toLowerCase())
  .filter(Boolean);

const running = row =>
  !!row &&
  ['active', 'trialing', 'past_due', 'canceled'].includes(row.status) &&
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
async function stripeRevenue30Days() {
  if (!hasStripe()) return null;
  try {
    const since = Math.floor(Date.now() / 1000) - 30 * 86400;
    let total = 0;
    let after = '';
    for (let page = 0; page < 10; page++) {
      const data = await stripe(`charges?limit=100&created[gte]=${since}${after}`, null, 'GET');
      for (const c of data.data || []) if (c.paid) total += (c.amount - (c.amount_refunded || 0)) / 100;
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
async function allVisits() {
  const rows = [];
  for (let page = 0; page < 500; page++) {
    const batch = await select(
      'site_visits',
      `select=visited_at,visitor_id,path,referrer,platform,user_agent&order=visited_at.asc&offset=${page * 1000}&limit=1000`
    );
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
  const tag = query.get('bron') || query.get('utm_source');
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

// Alles in unieke bezoekers (elk apparaat telt één keer): vandaag, deze week (7 dagen), deze maand, all time,
// per platform en per dag (30 dagen). Plus de laatste unieke bezoekers met hun bezoeken en pagina's.
async function visitorStats(ownIds = []) {
  const own = new Set(ownIds);
  const all = await allVisits();
  const rows = all.filter(v => !own.has(v.visitor_id));
  const who = v => v.visitor_id || `${v.user_agent}|${v.visited_at}`;
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
        platform: platformOf(v)
      };
      people.set(id, p);
    }
    p.visits++;
    p.last = v.visited_at;
    p.user_agent = v.user_agent || p.user_agent;
    p.platform = platformOf(v);
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
    rows.push(...(batch || []));
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
        version: r.app_version
      };
      groups.set(key, g);
    }
    g.count++;
    if (r.created_at < g.first) g.first = r.created_at;
    if (r.page) g.pages[r.page] = (g.pages[r.page] || 0) + 1;
    const d = `${r.platform || '?'} · ${browser(r.user_agent || '')}`;
    g.devices[d] = (g.devices[d] || 0) + 1;
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
      .map(g => ({ ...g, pages: top(g.pages), devices: top(g.devices) }))
  };
}

async function clearErrors() {
  await remove('app_errors', 'id=gt.0');
  return { ok: true };
}

async function overview(user, ownVisitor) {
  const [users, profiles, subs, orgs, members, stats, aiCost, revenue] = await Promise.all([
    listUsers(),
    select('profiles', 'select=id,name,organization'),
    select('subscriptions', 'select=*'),
    select('organizations', 'select=*'),
    select('organization_members', 'select=*'),
    rpc('savour_admin_user_stats', {}),
    openAiCostsThisMonth(),
    stripeRevenue30Days()
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
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        confirmed: !!(u.email_confirmed_at || u.confirmed_at),
        recipes: Number(s.recipes || 0),
        ai_this_month: Number(s.ai_this_month || 0),
        paid_stripe: !!sub?.stripe_subscription_id && running(sub),
        ...accountType(u, sub, ownOrgOf.get(u.id), memberOrgOfEmail.get(String(u.email).toLowerCase()))
      };
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Terugkerende omzet per maand: lopende, niet-opgezegde betaalde abonnementen en teams.
  const mrr = [...(subs || []), ...(orgs || [])]
    .filter(r => running(r) && r.stripe_subscription_id && !r.cancel_at_period_end)
    .reduce((sum, r) => sum + (PLAN_MONTHLY_EUR[r.plan] || 0), 0);
  const weekAgo = Date.now() - 7 * 86400000;
  return {
    accounts,
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  if (!user || !ADMIN_EMAILS.includes(String(user.email || '').toLowerCase()))
    return res.status(403).json({ error: 'Geen beheerdersrechten.' });
  const { action, user_id: userId, days, email, name, organization, own_visitor: ownVisitor } = req.body || {};
  if (action === 'whoami') return res.status(200).json({ admin: true, email: user.email });
  if (!hasServiceRole()) return res.status(503).json({ error: 'SUPABASE_SERVICE_ROLE_KEY ontbreekt in Vercel.' });
  try {
    if (action === 'overview') return res.status(200).json(await overview(user, ownVisitor));
    if (action === 'gift' && userId) return res.status(200).json(await giftPro(userId, days));
    if (action === 'revoke_gift' && userId) return res.status(200).json(await revokeGift(userId));
    if (action === 'create_account')
      return res.status(200).json(await createAccount({ email, name, organization }, siteOrigin(req)));
    if (action === 'errors') return res.status(200).json(await errorGroups());
    if (action === 'clear_errors') return res.status(200).json(await clearErrors());
    if (action === 'confirm_account' && userId) return res.status(200).json(await confirmAccount(userId));
    if (action === 'delete_account' && userId) return res.status(200).json(await deleteAccount(userId, user));
    return res.status(400).json({ error: 'Onbekende actie.' });
  } catch (error) {
    console.error('Admin', action, error);
    return res.status(error.status || 500).json({ error: error.message || 'Er ging iets mis.' });
  }
}
