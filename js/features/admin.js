// Beheeromgeving op /admin: inloggen als beheerder en het dashboard met cijfers.

function adminSetVisible(id, show) {
  const el = $(id);
  if (el) el.style.display = show ? '' : 'none';
}

function adminEscape(v) {
  return String(v ?? '').replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}

function adminDevice(ua) {
  ua = String(ua || '');
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iPhone / iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Macintosh/i.test(ua)) return 'Mac';
  if (/Windows/i.test(ua)) return 'Windows';
  return 'Overig';
}

// Vlaggetje bij een landcode (js/country.js schat het land uit de tijdzone). Afbeelding, want Windows toont
// geen vlag-emoji. Onbekend: een streepje.
const adminCountryNames = (() => {
  try {
    return new Intl.DisplayNames(['nl'], { type: 'region' });
  } catch (_) {
    return null;
  }
})();
function adminFlag(code) {
  const cc = String(code || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return '<span class="admin-flag-none" title="Land onbekend">–</span>';
  const name = adminCountryNames?.of(cc) || cc;
  return `<img class="admin-flag" src="https://flagcdn.com/w20/${cc.toLowerCase()}.png" width="20" height="15" alt="${adminEscape(cc)}" title="${adminEscape(name)}" loading="lazy">`;
}

function adminFormatDate(v) {
  if (!v) return '—';
  try {
    return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(v));
  } catch {
    return '—';
  }
}

function adminSessionExpired() {
  adminRenderLogin();
  const err = $('adminLoginError');
  if (err) err.textContent = 'Je sessie is verlopen. Log opnieuw in.';
}

function adminRenderLogin() {
  document.body.classList.remove('auth-booting');
  adminSetVisible('landingView', false);
  adminSetVisible('appShell', false);
  adminSetVisible('publicInfoShell', false);
  adminSetVisible('publicRecipeShell', false);
  adminSetVisible('publicInviteShell', false);
  adminSetVisible('adminShell', true);
  adminSetVisible('adminLoginView', true);
  adminSetVisible('adminDashboardView', false);
}

// Beheerder volgens de database (is_savour_admin) of volgens de server (ADMIN_EMAILS in Vercel).
async function adminIsAllowed() {
  const { data, error } = await supabaseClient.rpc('is_savour_admin');
  if (!error && data === true) return true;
  try {
    return !!(await adminApi('whoami')).admin;
  } catch {
    return false;
  }
}

// Na een tijd niets doen (laptop in slaap) is de inlog-sleutel verlopen: dan één keer verversen en opnieuw proberen.
async function adminApi(action, body = {}, retried = false) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  const response = await fetch('/api/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` },
    body: JSON.stringify({ action, ...body })
  });
  const result = await response.json().catch(() => ({}));
  if (response.status === 401 && !retried) {
    const { error } = await supabaseClient.auth.refreshSession();
    if (!error) return adminApi(action, body, true);
  }
  // Sessie echt verlopen (verversen lukte niet): terug naar het inlogscherm in plaats van een kapot overzicht.
  if (response.status === 401) {
    adminSessionExpired();
    throw Object.assign(new Error('Sessie verlopen. Log opnieuw in.'), { expired: true });
  }
  if (!response.ok) throw new Error(result.error || 'Er ging iets mis.');
  return result;
}

async function adminLogin() {
  const email = ($('adminEmail')?.value || '').trim().toLowerCase();
  const password = $('adminPassword')?.value || '';
  const err = $('adminLoginError');
  if (err) err.textContent = '';
  if (!email || !password) {
    if (err) err.textContent = 'Vul je e-mailadres en wachtwoord in.';
    return;
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    if (err) err.textContent = 'Inloggen mislukt. Controleer je gegevens.';
    return;
  }
  const allowed = await adminIsAllowed();
  if (!allowed) {
    await supabaseClient.auth.signOut();
    if (err) err.textContent = 'Dit account heeft geen beheerdersrechten.';
    return;
  }
  sessionStorage.setItem('savour_admin_session', '1');
  adminShowDashboard(data.user);
}

// Tabbladen: Overzicht, Bezoekers, Accounts, Referral, Inladen, Berichten, Fouten, Advertenties. De keuze blijft bewaard tijdens het bezoek.
function showAdminTab(tab) {
  const tabs = [...document.querySelectorAll('.admin-tab')].map(t => t.dataset.adminTab);
  if (!tabs.includes(tab)) tab = 'overzicht';
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('is-on', t.dataset.adminTab === tab));
  document.querySelectorAll('.admin-tabs button').forEach(b => b.classList.toggle('is-on', b.dataset.adminTab === tab));
  try {
    sessionStorage.setItem('savour_admin_tab', tab);
  } catch (_) {}
}

// ---- AdSense: inkomsten in het beheer (api/admin.js). Sleutels blijven op de server. ----

async function startAdsenseConnect() {
  const state = crypto.randomUUID();
  try {
    sessionStorage.setItem('savour_adsense_state', state);
    const { url } = await adminApi('adsense_auth_url', { state });
    location.href = url;
  } catch (error) {
    renderAdminAdsense({ state: 'error', message: error.message });
  }
}

// Terug van Google op /admin?code=...: alleen met dezelfde controlecode als waarmee we vertrokken.
async function finishAdsenseConnect() {
  const q = new URLSearchParams(location.search);
  const state = q.get('state');
  if (!state) return;
  let expected = '';
  try {
    expected = sessionStorage.getItem('savour_adsense_state') || '';
    sessionStorage.removeItem('savour_adsense_state');
  } catch (_) {}
  history.replaceState(null, '', '/admin');
  showAdminTab('advertenties');
  if (!q.get('code') || state !== expected) return;
  try {
    await adminApi('adsense_connect', { code: q.get('code') });
  } catch (error) {
    console.error('AdSense koppelen mislukt', error);
  }
}

async function disconnectAdsense() {
  if (
    !(await askConfirm(
      'AdSense loskoppelen?\n\nDe advertenties blijven gewoon draaien; alleen de cijfers verdwijnen uit het beheer.',
      { confirmLabel: 'Loskoppelen', danger: true }
    ))
  )
    return;
  await adminApi('adsense_disconnect');
  loadAdminAdsense();
}

async function loadAdminAdsense() {
  if (!$('adminAdsenseBody')) return;
  try {
    renderAdminAdsense(await adminApi('adsense'));
  } catch (error) {
    if (!error.expired) renderAdminAdsense({ state: 'error', message: error.message });
  }
}

function renderAdminAdsense(r) {
  const host = $('adminAdsenseBody');
  const status = $('adminAdsenseStatus');
  if (!host) return;
  const money = v =>
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: r.currency || 'EUR' }).format(Number(v) || 0);
  const count = v => (Number(v) || 0).toLocaleString('nl-NL');
  if (r.state !== 'ok') {
    const texts = {
      setup: 'Zet eerst GOOGLE_ADSENSE_CLIENT_ID en GOOGLE_ADSENSE_CLIENT_SECRET in Vercel.',
      sql: 'Draai eerst supabase/2026-11-01-admin-settings.sql.',
      connect: r.expired
        ? 'De toegang is verlopen. Koppel AdSense opnieuw.'
        : 'Klaar om te koppelen met je Google-account.',
      error: r.message || 'AdSense kon niet worden geladen.'
    };
    if (status) status.textContent = 'Nog niet gekoppeld';
    host.innerHTML = `<p class="admin-note">${adminEscape(texts[r.state] || texts.error)}</p>${r.state === 'connect' ? '<button type="button" class="btn gold" onclick="startAdsenseConnect()">Koppel AdSense</button>' : ''}`;
    return;
  }
  if (status) status.textContent = 'Gekoppeld';
  const period = (label, p) =>
    `<div><span class="adsense-label">${label}</span><strong class="adsense-money">${adminEscape(money(p.ESTIMATED_EARNINGS))}</strong><small>${count(p.PAGE_VIEWS)} paginaweergaven · ${count(p.IMPRESSIONS)} vertoningen · ${count(p.CLICKS)} klikken</small></div>`;
  const table = (title, key, rows, show = x => x) =>
    rows?.length
      ? `<h3 class="adsense-title">${title}</h3><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>${title}</th><th>Deze maand</th><th>Weergaven</th><th>Vertoningen</th><th>Klikken</th></tr></thead><tbody>${rows
          .map(
            u =>
              `<tr><td>${adminEscape(show(u[key]))}</td><td>${adminEscape(money(u.ESTIMATED_EARNINGS))}</td><td>${count(u.PAGE_VIEWS)}</td><td>${count(u.IMPRESSIONS)}</td><td>${count(u.CLICKS)}</td></tr>`
          )
          .join('')}</tbody></table></div>`
      : '';
  const pagePath = url => String(url || '').replace(/^https?:\/\/(www\.)?savour\.page/, '') || '/';
  const earned = x => Number(x?.ESTIMATED_EARNINGS) || 0;
  const views = x => Number(x?.PAGE_VIEWS) || 0;
  const pages = (r.pages || []).slice().sort((a, b) => earned(b) - earned(a));
  const days = r.daily || [];
  const dayName = d => new Date(`${d}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });

  // Leuke inzichten: alles berekend uit de cijfers van Google.
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const forecast = earned(r.month) + (earned(r.week) / 7) * (daysInMonth - now.getDate());
  const rpm = views(r.month) ? (earned(r.month) / views(r.month)) * 1000 : 0;
  const ctr = Number(r.month?.IMPRESSIONS) ? (Number(r.month.CLICKS) / Number(r.month.IMPRESSIONS)) * 100 : 0;
  const bestPage = pages[0] && earned(pages[0]) > 0 ? pages[0] : null;
  const bestRate = pages
    .filter(p => views(p) >= 20 && earned(p) > 0)
    .sort((a, b) => earned(b) / views(b) - earned(a) / views(a))[0];
  const bestDay = days.reduce((best, d) => (earned(d) > earned(best) ? d : best), null);
  const proEqual = earned(r.month) / 2.99;
  const insight = (label, value, note) =>
    `<div><span class="adsense-label">${label}</span><strong class="adsense-insight">${adminEscape(value)}</strong><small>${adminEscape(note)}</small></div>`;
  const insights = [
    insight(
      'Topverdiener',
      bestPage ? pagePath(bestPage.PAGE_URL) : 'Nog geen',
      bestPage ? `${money(earned(bestPage))} deze maand` : 'Zodra er inkomsten zijn'
    ),
    insight(
      'Beste tarief',
      bestRate ? pagePath(bestRate.PAGE_URL) : 'Nog geen',
      bestRate
        ? `${money((earned(bestRate) / views(bestRate)) * 1000)} per 1.000 weergaven`
        : 'Vanaf 20 weergaven per pagina'
    ),
    insight(
      'Beste dag',
      bestDay && earned(bestDay) > 0 ? dayName(bestDay.DATE) : 'Nog geen',
      bestDay && earned(bestDay) > 0 ? `${money(earned(bestDay))} in de laatste 30 dagen` : 'In de laatste 30 dagen'
    ),
    insight('Verwacht deze maand', money(forecast), 'Bij het tempo van de laatste 7 dagen'),
    insight(
      'Per 1.000 weergaven',
      money(rpm),
      `${ctr.toLocaleString('nl-NL', { maximumFractionDigits: 2 })}% klikt op een advertentie`
    ),
    insight(
      'Gelijk aan',
      `${proEqual.toLocaleString('nl-NL', { maximumFractionDigits: 1 })} Pro-abonnementen`,
      'Inkomsten deze maand gedeeld door €2,99'
    )
  ].join('');

  // Naar de uitbetaling: Google betaalt vanaf €70.
  const unpaid = Number(r.unpaid);
  const payout =
    r.unpaid !== null && r.unpaid !== undefined && Number.isFinite(unpaid)
      ? `<div class="adsense-payout"><div><b>${adminEscape(money(unpaid))}</b> van €70 tot je eerste uitbetaling</div><i><b style="width:${Math.min(100, (unpaid / 70) * 100)}%"></b></i></div>`
      : '';

  // Grafiek van de laatste 30 dagen.
  const top = Math.max(...days.map(earned), 0);
  const chart = days.length
    ? `<h3 class="adsense-title">Laatste 30 dagen</h3><div class="adsense-chart" role="img" aria-label="Inkomsten per dag">${days
        .map(
          d =>
            `<i title="${adminEscape(`${dayName(d.DATE)}: ${money(earned(d))}`)}" style="height:${top ? Math.max(2, (earned(d) / top) * 100) : 2}%"></i>`
        )
        .join('')}</div>`
    : '';

  // Waar het geld vandaan komt: blog per taal, website en app.
  const groupOf = url => {
    const path = pagePath(url);
    const lang = path.match(/^\/(en|de|es|fr)(\/|$)/)?.[1]?.toUpperCase() || 'NL';
    if (path === '/') return 'App en startpagina';
    return `${/\/blog(\/|$)/.test(path) ? 'Blog' : 'Website'} ${lang}`;
  };
  const groups = new Map();
  for (const p of r.pages || []) {
    const name = groupOf(p.PAGE_URL);
    const g = groups.get(name) || { GROUP: name, ESTIMATED_EARNINGS: 0, PAGE_VIEWS: 0, IMPRESSIONS: 0, CLICKS: 0 };
    for (const k of ['ESTIMATED_EARNINGS', 'PAGE_VIEWS', 'IMPRESSIONS', 'CLICKS']) g[k] += Number(p[k]) || 0;
    groups.set(name, g);
  }
  const grouped = [...groups.values()].sort((a, b) => earned(b) - earned(a));

  host.innerHTML = `<div class="admin-adsense-grid">${period('Vandaag', r.today)}${period('Laatste 7 dagen', r.week)}${period('Deze maand', r.month)}</div>${payout}<div class="admin-adsense-grid adsense-insights">${insights}</div>${chart}${table('Waar het geld vandaan komt', 'GROUP', grouped)}${table('Pagina', 'PAGE_URL', pages.slice(0, 25), pagePath)}${table('Advertentieblok', 'AD_UNIT_NAME', r.units)}${table('Land', 'COUNTRY_NAME', r.countries)}${table('Apparaat', 'PLATFORM_TYPE_NAME', r.devices)}<p class="admin-footnote">Geschatte inkomsten volgens Google. Alle schermen in de app staan samen onder <b>/</b>. <button type="button" class="btn-quiet" onclick="disconnectAdsense()">Loskoppelen</button></p>`;
}

async function adminShowDashboard(user) {
  adminSetVisible('adminLoginView', false);
  adminSetVisible('adminDashboardView', true);
  let tab = 'overzicht';
  try {
    tab = sessionStorage.getItem('savour_admin_tab') || tab;
  } catch (_) {}
  showAdminTab(tab);
  if ($('adminSignedInAs')) $('adminSignedInAs').textContent = user?.email || '';
  await finishAdsenseConnect();
  await loadAdminDashboard();
}

async function adminForgotPassword() {
  const email = ($('adminEmail')?.value || '').trim().toLowerCase();
  const err = $('adminLoginError');
  if (err) err.textContent = '';
  if (!email) {
    if (err) err.textContent = 'Vul eerst je admin-e-mailadres in.';
    return;
  }
  try {
    const res = await fetch('/api/admin-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Wachtwoord herstellen is mislukt.');
    if (err) err.textContent = 'Er is een herstel-link naar contact@savour.page gestuurd.';
  } catch (e) {
    console.error(e);
    if (err) err.textContent = e.message || 'Wachtwoord herstellen is mislukt.';
  }
}

async function adminLogout() {
  sessionStorage.removeItem('savour_admin_session');
  await supabaseClient.auth.signOut();
  adminRenderLogin();
}

// Cijfers bovenaan. Bezoekers komen van de server (api/admin.js, uit site_visits); accounts, recepten en mappen
// uit de databasefunctie get_savour_admin_dashboard. Beide vullen adminDashData aan.
let adminDashData = {};

function renderAdminStats() {
  const d = adminDashData;
  const box = rows =>
    rows
      .map(x => `<div class="traffic-box"><b>${adminEscape(x[1] ?? '—')}</b><span>${adminEscape(x[0])}</span></div>`)
      .join('');
  const s = $('adminStats');
  if (s)
    s.innerHTML = [
      ['Unieke bezoekers vandaag', d.visits_today, 'elk apparaat telt één keer'],
      ['Unieke bezoekers deze week', d.visits_week, 'laatste 7 dagen'],
      ['Unieke bezoekers deze maand', d.visits_month, 'deze kalendermaand'],
      [
        'Unieke bezoekers all time',
        d.visitors_all_time,
        [
          d.own_devices ? `zonder jouw ${d.own_devices} apparaat/apparaten` : 'sinds de start',
          d.not_counted ? `${d.not_counted} bots en tools niet meegeteld` : ''
        ]
          .filter(Boolean)
          .join(' · ')
      ],
      ['Accounts', d.accounts, 'geregistreerde gebruikers'],
      ['App gebruikers', d.app_users, 'unieke native app-gebruikers'],
      ['Recepten', d.recipes, 'persoonlijke recepten'],
      ['Receptenmappen', d.folders, 'persoonlijke mappen'],
      ['Keukenteams', d.shared_maps, 'keukenteams']
    ]
      .map(
        x =>
          `<div class="admin-stat"><div class="label">${adminEscape(x[0])}</div><div class="value">${adminEscape(x[1] ?? '—')}</div><div class="sub">${adminEscape(x[2])}</div></div>`
      )
      .join('');
  if ($('adminTraffic'))
    $('adminTraffic').innerHTML = box([
      ['Vandaag', d.visits_today],
      ['Deze week', d.visits_week],
      ['Deze maand', d.visits_month],
      ['All time', d.visitors_all_time]
    ]);
  // Demo: hoeveel bezoekers (unieke apparaten) de demo openden, en hoe vaak in totaal.
  if ($('adminDemo'))
    $('adminDemo').innerHTML = box([
      ['Vandaag', d.demo_today],
      ['Deze week', d.demo_week],
      ['Deze maand', d.demo_month],
      ['All time', d.demo_all]
    ]);
  if ($('adminPlatformUsage'))
    $('adminPlatformUsage').innerHTML = box([
      ['Desktop', d.platform_desktop],
      ['Mobiel web', d.platform_mobile],
      ['Native app', d.platform_app]
    ]);
  // Herkomst: per groep (direct, gedeelde links, social media, ...) de bronnen, met een balkje ten opzichte van de
  // grootste bron. De groep met de meeste bezoekers bovenaan.
  const sb = $('adminSourcesBody');
  if (sb) {
    const sources = d.sources || [];
    const max = Math.max(1, ...sources.map(x => x.all));
    const groups = new Map();
    for (const x of sources) {
      const g = groups.get(x.group || 'Overig') || { name: x.group || 'Overig', all: 0, month: 0, week: 0, rows: [] };
      g.all += x.all;
      g.month += x.month;
      g.week += x.week;
      g.rows.push(x);
      groups.set(g.name, g);
    }
    sb.innerHTML =
      [...groups.values()]
        .sort((a, b) => b.all - a.all)
        .map(
          g =>
            `<tr class="admin-source-group"><td colspan="2">${adminEscape(g.name)}</td><td>${adminEscape(g.week)}</td><td>${adminEscape(g.month)}</td><td><b>${adminEscape(g.all)}</b></td></tr>` +
            g.rows
              .sort((a, b) => b.all - a.all)
              .map(
                x =>
                  `<tr><td class="admin-source-name">${adminEscape(x.name)}</td><td class="admin-source-bar"><i style="width:${Math.round((x.all / max) * 100)}%"></i></td><td>${adminEscape(x.week)}</td><td>${adminEscape(x.month)}</td><td>${adminEscape(x.all)}</td></tr>`
              )
              .join('')
        )
        .join('') || '<tr><td colspan="5">Nog geen bezoekers.</td></tr>';
  }
  // Laatste unieke bezoekers: één regel per apparaat, met hoe vaak en welke pagina's.
  const vb = $('adminVisitsBody');
  if (vb)
    vb.innerHTML =
      (d.recent_people || [])
        .map(
          v =>
            `<tr><td>${adminFlag(v.country)}</td><td>${adminFormatDate(v.last)}</td><td>${adminEscape(v.visits)}</td><td>${v.pages.map(adminEscape).join('<br>')}</td><td>${adminEscape(v.platform === 'native_app' ? 'Native app' : v.platform === 'mobile_web' ? 'Mobiel web' : 'Desktop web')}</td><td title="${adminEscape(v.user_agent || '')}">${adminEscape(adminDevice(v.user_agent))}</td><td title="${adminEscape(v.referrer || '')}">${adminEscape(v.source || v.referrer || 'Direct')}</td></tr>`
        )
        .join('') || '<tr><td colspan="7">Nog geen bezoekers.</td></tr>';
}

async function loadAdminDashboard() {
  const refresh = $('adminRefreshBtn');
  if (refresh) {
    refresh.disabled = true;
    refresh.textContent = '↻ Verversen…';
  }
  adminDashData = {};
  try {
    let { data, error } = await supabaseClient.rpc('get_savour_admin_dashboard');
    // "not authorized" na een verlopen sessie (bijv. de telefoon die een tijd dicht was): eerst verversen.
    if (error && /not authorized|jwt/i.test(error.message || '')) {
      const refreshed = await supabaseClient.auth.refreshSession();
      if (refreshed.error) {
        console.warn('Admin-tellingen: sessie verlopen', error.message);
        return adminSessionExpired();
      }
      ({ data, error } = await supabaseClient.rpc('get_savour_admin_dashboard'));
    }
    if (error) throw error;
    // Alleen de tellingen van accounts, recepten en mappen; bezoekers komen van de server.
    const d = data || {};
    for (const k of ['accounts', 'app_users', 'recipes', 'folders', 'shared_maps']) adminDashData[k] = d[k] || 0;
  } catch (error) {
    console.error('Admin-tellingen laden mislukt', error);
  }
  renderAdminStats();
  loadAdminErrors();
  loadAdminMessages();
  loadAdminReferrals();
  loadAdminIntakes();
  loadAdminAdsense();
  loadAdminFinance();
  try {
    await loadAdminOverview();
  } finally {
    if (refresh) {
      refresh.disabled = false;
      refresh.textContent = '↻ Vernieuwen';
    }
  }
}

// Bezoekers-id van dit apparaat (zelfde sleutel als logSavourVisit). De server onthoudt hem als "eigen apparaat",
// zodat je eigen bezoeken niet meetellen. Open /admin één keer op elk apparaat dat je gebruikt.
function adminOwnVisitorId() {
  try {
    let vid = localStorage.getItem('savour_visit_id');
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem('savour_visit_id', vid);
    }
    return vid;
  } catch (_) {
    return '';
  }
}

// ---- Berichten: contactformulier en bugmeldingen (api/admin.js, tabel contact_messages) ----

let adminMessages = [];

function renderAdminMessageBadge(unread) {
  const badge = $('adminMessageBadge');
  if (badge) {
    badge.hidden = !unread;
    badge.textContent = unread;
    badge.title = `${unread} ongelezen berichten`;
  }
  if ($('adminMessageCount'))
    $('adminMessageCount').textContent = `${adminMessages.length} berichten${unread ? ` · ${unread} ongelezen` : ''}`;
}

// Referral: per aanbrenger hoeveel collega's zijn geteld (bevestigd en ingelogd) en hoeveel nog wachten,
// en daaronder elk aangebracht account met zijn status.
async function loadAdminReferrals() {
  const top = $('adminReferrersBody');
  const list = $('adminReferralsBody');
  if (!top || !list) return;
  try {
    const d = await adminApi('referrals');
    const inviters = d.inviters || [];
    const referrals = d.referrals || [];
    const counted = referrals.filter(r => r.status === 'geteld').length;
    if ($('adminReferralCount'))
      $('adminReferralCount').textContent = `${counted} geteld · ${referrals.length - counted} niet (nog) geteld`;
    const who = (email, name) =>
      `${adminEscape(name || email)}${name ? `<small class="admin-referral-mail">${adminEscape(email)}</small>` : ''}`;
    top.innerHTML =
      inviters
        .map(
          i =>
            `<tr><td>${who(i.email, i.name)}</td><td><b>${adminEscape(i.counted)}</b></td><td>${adminEscape(i.waiting)}</td><td>${adminEscape(i.rewards)}</td></tr>`
        )
        .join('') || '<tr><td colspan="4">Nog niemand heeft een collega aangebracht.</td></tr>';
    const label = {
      geteld: 'Geteld',
      'wacht op inloggen': 'Bevestigd, nog niet ingelogd',
      'wacht op bevestiging': 'E-mail nog niet bevestigd',
      verlopen: 'Te laat (account ouder dan 30 dagen)',
      onbekend: 'Aanbrenger bestaat niet meer'
    };
    list.innerHTML =
      referrals
        .map(
          r =>
            `<tr><td>${who(r.email, r.name)}</td><td>${who(r.inviter_email, r.inviter_name)}</td><td>${adminFormatDate(r.created_at)}</td><td><span class="admin-referral-status is-${r.status === 'geteld' ? 'on' : r.status.startsWith('wacht') ? 'wait' : 'off'}">${adminEscape(label[r.status] || r.status)}</span>${r.counted_at ? `<small class="admin-referral-mail">${adminFormatDate(r.counted_at)}</small>` : ''}</td></tr>`
        )
        .join('') || '<tr><td colspan="4">Nog geen aangebrachte accounts.</td></tr>';
  } catch (e) {
    top.innerHTML = `<tr><td colspan="4">Referral kon niet worden geladen: ${adminEscape(e.message)}</td></tr>`;
    list.innerHTML = '';
  }
}

async function loadAdminMessages() {
  const host = $('adminMessages');
  if (!host) return;
  try {
    const d = await adminApi('messages');
    adminMessages = d.messages || [];
    renderAdminMessages();
  } catch (e) {
    host.innerHTML = `<p class="admin-panel-note">Berichten konden niet worden geladen: ${adminEscape(e.message)}. Is supabase/2026-10-25-berichten.sql uitgevoerd?</p>`;
  }
}

function renderAdminMessages() {
  const host = $('adminMessages');
  if (!host) return;
  renderAdminMessageBadge(adminMessages.filter(m => !m.read_at).length);
  host.innerHTML =
    adminMessages
      .map(
        m => `<details class="admin-message${m.read_at ? '' : ' is-unread'}" ontoggle="if(this.open)adminMarkMessage(${Number(m.id)}, true)">
  <summary><span class="admin-message-dot" aria-hidden="true"></span><span class="admin-message-kind ${m.kind === 'bug' ? 'is-bug' : ''}">${m.kind === 'bug' ? 'Bug' : 'Contact'}</span><b>${adminEscape(m.subject || '(geen onderwerp)')}</b><span class="admin-message-from">${adminEscape(m.name || '')}</span><time>${adminFormatDate(m.created_at)}</time></summary>
  <div class="admin-message-body"><p class="admin-message-meta"><a href="mailto:${adminEscape(m.email)}?subject=${encodeURIComponent('Re: ' + (m.subject || ''))}">${adminEscape(m.email)}</a>${m.page ? ` · ${adminEscape(m.page)}` : ''}${m.has_screenshot ? ' · screenshot in de mail' : ''}</p><div class="admin-message-text">${adminEscape(m.message)}</div><div class="admin-message-actions"><a class="admin-ghost" href="mailto:${adminEscape(m.email)}?subject=${encodeURIComponent('Re: ' + (m.subject || ''))}">Beantwoorden</a>${m.read_at ? `<button class="admin-ghost" onclick="adminMarkMessage(${Number(m.id)}, false)">Markeer als ongelezen</button>` : ''}<button class="admin-ghost admin-danger" onclick="adminDeleteMessage(${Number(m.id)})">Verwijderen</button></div></div>
</details>`
      )
      .join('') || '<p class="admin-panel-note">Nog geen berichten.</p>';
}

// Bericht definitief verwijderen (alleen uit /admin; de mail in contact@savour.page blijft staan).
async function adminDeleteMessage(id) {
  const m = adminMessages.find(x => x.id === id);
  if (!m) return;
  if (
    !(await askConfirm(
      `Bericht verwijderen?\n\n“${m.subject || '(geen onderwerp)'}” van ${m.name || m.email} wordt uit admin verwijderd. De mail in contact@savour.page blijft staan.`,
      { confirmLabel: 'Verwijderen', danger: true }
    ))
  )
    return;
  try {
    await adminApi('delete_message', { id });
    adminMessages = adminMessages.filter(x => x.id !== id);
    renderAdminMessages();
  } catch (e) {
    toast(e.message || 'Het bericht kon niet worden verwijderd');
  }
}

async function adminMarkMessage(id, read) {
  const before = adminMessages.map(m => ({ ...m }));
  const now = new Date().toISOString();
  adminMessages = adminMessages.map(m =>
    id === 'all' || m.id === id ? { ...m, read_at: read ? m.read_at || now : null } : m
  );
  if (id === 'all' || !read) renderAdminMessages();
  else {
    const el = [...document.querySelectorAll('.admin-message')].find(d =>
      d.getAttribute('ontoggle').includes(`(${id},`)
    );
    el?.classList.remove('is-unread');
    renderAdminMessageBadge(adminMessages.filter(m => !m.read_at).length);
  }
  try {
    await adminApi('mark_message', { id, read });
  } catch (e) {
    adminMessages = before;
    renderAdminMessages();
  }
}

// ---- Import service (api/admin.js, tabel recipe_intakes; klantkant is api/aanleveren.js) ----
// Per aanvraag: goedkeuren/afwijzen → (klant betaalt en levert aan) → inlezen met de Savour-lezer, nakijken
// en in het keukenteam laden → vrijgeven. Ingelezen concepten staan alleen in deze browser tot je ze inlaadt.
let adminIntakes = [];
let adminIntakeFreeLeft = 0;
const adminIntakeDrafts = {};
const INTAKE_STATUS = {
  aanvraag: 'Nieuwe aanvraag',
  goedgekeurd: 'Wacht op betaling',
  afgewezen: 'Afgewezen',
  betaald: 'Betaald, wacht op aanlevering',
  ingediend: 'Aangeleverd',
  bezig: 'Bezig met inladen',
  klaar: 'Klaar en vrijgegeven'
};

async function loadAdminIntakes() {
  const host = $('adminIntakes');
  if (!host) return;
  try {
    const d = await adminApi('intakes');
    adminIntakes = d.intakes || [];
    adminIntakeFreeLeft = d.free_left ?? 0;
    renderAdminIntakes();
  } catch (e) {
    host.innerHTML = `<p class="admin-panel-note">Aanvragen konden niet worden geladen: ${adminEscape(e.message)}. Is supabase/2026-10-27-aanleveringen.sql uitgevoerd?</p>`;
  }
}

function adminFileSize(bytes) {
  return bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} kB`;
}

const adminEuro = cents =>
  cents == null ? 'in overleg' : cents === 0 ? 'gratis' : `€${(cents / 100).toFixed(2).replace('.', ',')}`;

// De mappen die de klant opgaf (één per regel).
const adminIntakeFolders = i =>
  String(i.folders || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);

function renderAdminIntakes() {
  const host = $('adminIntakes');
  if (!host) return;
  const todo = adminIntakes.filter(i => ['aanvraag', 'ingediend'].includes(i.status)).length;
  const badge = $('adminIntakeBadge');
  if (badge) {
    badge.hidden = !todo;
    badge.textContent = todo;
  }
  if ($('adminIntakeCount'))
    $('adminIntakeCount').textContent = `${adminIntakes.length} in totaal · ${todo} wacht op jou`;
  const open = new Set([...host.querySelectorAll('details[open]')].map(d => d.dataset.id));
  // Afgeronde (vrijgegeven) en afgewezen aanvragen staan in het archief onderaan, dichtgeklapt.
  const done = i => ['klaar', 'afgewezen'].includes(i.status);
  const active = adminIntakes.filter(i => !done(i));
  const archive = adminIntakes.filter(done);
  host.innerHTML =
    (active.map(i => renderAdminIntake(i, open.has(String(i.id)))).join('') ||
      '<p class="admin-panel-note">Geen lopende aanvragen.</p>') +
    (archive.length
      ? `<details class="admin-intake-archive" data-id="archief"${open.has('archief') ? ' open' : ''}><summary>Archief · ${archive.length} afgerond of afgewezen</summary>${archive.map(i => renderAdminIntake(i, open.has(String(i.id)))).join('')}</details>`
      : '');
}

function renderAdminIntake(i, isOpen) {
  const id = Number(i.id);
  const who = i.restaurant || i.name || i.email || `Aanvraag ${id}`;
  const files = i.files || [];
  const block = (label, text) =>
    text ? `<h4 class="admin-intake-h">${label}</h4><div class="admin-message-text">${adminEscape(text)}</div>` : '';
  const price = i.price_cents ?? i.package_cents;
  let step = '';
  if (['aanvraag', 'afgewezen'].includes(i.status)) {
    // De prijs volgt uit het pakket; alleen bij "meer dan 1000 recepten" (of onbekend) vul je hem zelf in.
    const price =
      i.package_cents == null
        ? `<label>Prijs import service (€)<input id="intakePrice${id}" type="number" min="0" step="0.01" placeholder="bijv. 250"></label>`
        : `<p class="admin-panel-note">Prijs volgens pakket: <b>${adminEuro(i.package_cents)}</b> + teamabonnement.</p>`;
    const free = `<label class="admin-check"><input type="checkbox" id="intakeFree${id}"${adminIntakeFreeLeft ? '' : ' disabled'}> Gratis inladen (introductie, nog ${adminIntakeFreeLeft} van 5 plekken)</label>`;
    step = `<div class="admin-intake-step">${price}${free}<div class="admin-message-actions"><button class="admin-refresh" onclick="adminApproveIntake(${id})">Goedkeuren en betaallink mailen</button>${i.status === 'aanvraag' ? `<button class="admin-ghost admin-danger" onclick="adminRejectIntake(${id})">Afwijzen</button>` : ''}</div></div>`;
  } else if (i.status === 'goedgekeurd')
    step = `<p class="admin-panel-note">Goedgekeurd op ${adminFormatDate(i.approved_at)} voor ${adminEuro(i.price_cents)} + teamabonnement. De klant heeft de betaallink per mail.</p><div class="admin-intake-link"><input readonly value="${adminEscape(i.link)}" onclick="this.select()"><button class="admin-ghost" onclick="adminCopyIntakeLink(${id})">Kopieer link</button><button class="admin-ghost" onclick="adminApproveIntake(${id}, true)">Mail opnieuw sturen</button></div>`;
  else if (i.status === 'betaald')
    step = `<p class="admin-panel-note">Betaald op ${adminFormatDate(i.paid_at)}. De klant kan nu aanleveren via zijn link.</p>`;
  else if (['ingediend', 'bezig'].includes(i.status)) step = renderAdminIntakeImport(i);
  else if (i.status === 'klaar')
    step = `<p class="admin-panel-note">Vrijgegeven op ${adminFormatDate(i.released_at)} met ${Number(i.imported_count) || 0} recepten. Aangeleverde bestanden en gegevens gewist op ${adminFormatDate(i.wiped_at)}.</p>`;
  const members = (i.members || []).length
    ? `<h4 class="admin-intake-h">Leden</h4><ul class="admin-intake-files">${i.members.map(m => `<li>${adminEscape(m.email)}<small>${m.role === 'editor' ? 'mag bewerken' : 'mag bekijken'}</small></li>`).join('')}</ul>`
    : '';
  const fileList =
    files.length && !i.wiped_at
      ? `<h4 class="admin-intake-h">Bestanden (${files.length})</h4><ul class="admin-intake-files">${files.map(f => `<li><button class="admin-link" onclick="adminDownloadIntakeFile(${id}, '${escJs(f.name)}')">${adminEscape(f.name.replace(/^[a-z0-9]+-/, ''))}</button><small>${adminFileSize(f.size)}</small></li>`).join('')}</ul>`
      : '';
  return `<details class="admin-message${['aanvraag', 'ingediend'].includes(i.status) ? ' is-unread' : ''}" data-id="${id}"${isOpen ? ' open' : ''}>
  <summary><span class="admin-message-dot" aria-hidden="true"></span><span class="admin-message-kind">${adminEscape(INTAKE_STATUS[i.status] || i.status)}</span><b>${adminEscape(who)}</b><span class="admin-message-from">${adminEscape(i.package_label || 'pakket onbekend')} · ${i.seats ? `${Number(i.seats)} plekken` : 'grootte onbekend'}</span><time>${adminFormatDate(i.submitted_at || i.created_at)}</time></summary>
  <div class="admin-message-body">
    <p class="admin-message-meta">${adminEscape(i.name || '')} · <a href="mailto:${adminEscape(i.email)}">${adminEscape(i.email)}</a> · ${adminEscape((i.language || 'nl').toUpperCase())} · aangevraagd ${adminFormatDate(i.created_at)}</p>
    ${block('Bij de aanvraag', i.request_notes)}${step}
    ${block('Indeling', i.structure)}${block('Mappen', i.folders)}${block('Welk recept in welke map', i.match)}${block('Opmerkingen', i.notes)}${members}${fileList}
    <div class="admin-message-actions"><button class="admin-ghost admin-danger" onclick="adminDeleteIntake(${id})">Aanvraag verwijderen</button></div>
  </div>
</details>`;
}

// Inlezen en inladen: concepten uit de lezer, per recept een map, aan/uit en na te kijken.
function renderAdminIntakeImport(i) {
  const id = Number(i.id);
  const drafts = adminIntakeDrafts[id];
  const done = Number(i.imported_count) || 0;
  const head = `<p class="admin-panel-note">${done ? `${done} recepten staan al in het keukenteam. ` : ''}Lees de bestanden in met de Savour-lezer, kijk elk recept na en laad ze in het keukenteam “${adminEscape(i.restaurant || i.name || '')}” van de eigenaar.</p>`;
  const actions = `<div class="admin-message-actions"><button class="admin-refresh" onclick="adminReadIntake(${id})">${drafts ? 'Opnieuw inlezen' : 'Recepten inlezen'}</button>${done ? `<button class="admin-refresh" onclick="adminReleaseIntake(${id})">Keukenteam vrijgeven</button>` : ''}</div>`;
  if (!drafts) return head + actions;
  if (drafts.busy) return head + `<p class="admin-panel-note">${adminEscape(drafts.busy)}</p>`;
  const folders = adminIntakeFolders(i);
  const options = sel =>
    ['', ...folders]
      .map(
        f =>
          `<option value="${adminEscape(f)}"${f === sel ? ' selected' : ''}>${f ? adminEscape(f) : '(geen submap)'}</option>`
      )
      .join('');
  const chosen = drafts.list.filter(d => d.use).length;
  const rows = drafts.list
    .map(
      (d, n) =>
        `<li class="admin-draft${d.needsReview ? ' is-review' : ''}"><label class="admin-draft-use"><input type="checkbox"${d.use ? ' checked' : ''} onchange="adminIntakeDraft(${id}, ${n}, 'use', this.checked)"></label><div class="admin-draft-main"><input class="admin-draft-title" value="${adminEscape(d.title)}" onchange="adminIntakeDraft(${id}, ${n}, 'title', this.value)"><small>${adminEscape(d.sourceFile || '')} · ${d.ingredients.length} ingrediënten · ${d.steps.length} stappen${d.needsReview ? ' · nakijken' : ''}</small><details><summary>Nakijken</summary><label>Opbrengst<input value="${adminEscape(d.yield || '')}" onchange="adminIntakeDraft(${id}, ${n}, 'yield', this.value)"></label><label>Ingrediënten (één per regel)<textarea rows="6" onchange="adminIntakeDraft(${id}, ${n}, 'ingredients', this.value)">${adminEscape(d.ingredients.join('\n'))}</textarea></label><label>Bereiding (één stap per regel)<textarea rows="6" onchange="adminIntakeDraft(${id}, ${n}, 'steps', this.value)">${adminEscape(d.steps.join('\n'))}</textarea></label></details></div><select onchange="adminIntakeDraft(${id}, ${n}, 'folder', this.value)" aria-label="Map">${options(d.folder)}</select></li>`
    )
    .join('');
  const failed = drafts.failed.length
    ? `<p class="admin-panel-note">Niet gelukt: ${drafts.failed.map(f => adminEscape(`${f.name} (${f.error})`)).join(', ')}</p>`
    : '';
  return `${head}${failed}<p class="admin-panel-note"><b>${drafts.list.length}</b> recepten gelezen, ${chosen} geselecteerd. Oranje = de lezer twijfelde: kijk die extra goed na.</p><ul class="admin-drafts">${rows}</ul><div class="admin-message-actions"><button class="admin-refresh" onclick="adminImportIntake(${id})">${chosen} recepten in het keukenteam laden</button><button class="admin-ghost" onclick="adminReadIntake(${id})">Opnieuw inlezen</button>${done ? `<button class="admin-refresh" onclick="adminReleaseIntake(${id})">Keukenteam vrijgeven</button>` : ''}</div>`;
}

function adminIntakeDraft(id, n, field, value) {
  const d = adminIntakeDrafts[id]?.list?.[n];
  if (!d) return;
  d[field] =
    field === 'ingredients' || field === 'steps'
      ? String(value)
          .split('\n')
          .map(x => x.trim())
          .filter(Boolean)
      : value;
  if (field === 'use') renderAdminIntakes();
}

// Bestanden van de klant ophalen (tijdelijke downloadlinks) en met dezelfde lezer als in de app inlezen.
async function adminReadIntake(id) {
  const i = adminIntakes.find(x => x.id === id);
  if (!i) return;
  const folders = adminIntakeFolders(i);
  const guess = d => {
    const hay = `${d.sourceFile || ''} ${d.title || ''}`.toLowerCase();
    return folders.find(f => hay.includes(f.toLowerCase())) || '';
  };
  adminIntakeDrafts[id] = { busy: 'Bestanden ophalen…', list: [], failed: [] };
  renderAdminIntakes();
  const list = [];
  const failed = [];
  let n = 0;
  for (const f of i.files || []) {
    n++;
    adminIntakeDrafts[id].busy = `Lezen: ${n} van ${i.files.length} bestanden…`;
    renderAdminIntakes();
    const name = f.name.replace(/^[a-z0-9]+-/, '').replace(/_/g, ' ');
    try {
      const { url } = await adminApi('intake_file', { id, file: f.name });
      const blob = await (await fetch(url)).blob();
      const drafts = await readImportFile(new File([blob], name, { type: blob.type }));
      for (const d of drafts || [])
        list.push({
          title: d.title || 'Recept',
          yield: d.yield || '',
          ingredients: (d.ingredients || []).map(String),
          steps: (d.steps || []).map(String),
          sourceFile: d.sourceFile || name,
          needsReview: !!(d.needsReview || d._incomplete || d.readerConfidence === 'low'),
          use: !d._incomplete
        });
    } catch (e) {
      failed.push({ name, error: e?.message || 'mislukt' });
    }
  }
  list.forEach(d => (d.folder = guess(d)));
  adminIntakeDrafts[id] = { list, failed };
  renderAdminIntakes();
}

async function adminImportIntake(id) {
  const drafts = adminIntakeDrafts[id];
  const chosen = (drafts?.list || []).filter(d => d.use);
  if (!chosen.length) return toast('Kies eerst recepten');
  if (
    !(await askConfirm(
      `${chosen.length} recepten in het keukenteam laden?\n\nZe komen in het keukenteam van de eigenaar, in de gekozen submappen. De klant ziet ze pas na het vrijgeven.`,
      { confirmLabel: 'Inladen' }
    ))
  )
    return;
  try {
    for (let s = 0; s < chosen.length; s += 100) {
      drafts.busy = `Inladen: ${s} van ${chosen.length}…`;
      renderAdminIntakes();
      await adminApi('import_intake', {
        id,
        recipes: chosen
          .slice(s, s + 100)
          .map(d => ({ title: d.title, yield: d.yield, ingredients: d.ingredients, steps: d.steps, folder: d.folder }))
      });
    }
    delete adminIntakeDrafts[id];
    toast(`${chosen.length} recepten ingeladen`);
  } catch (e) {
    delete drafts.busy;
    toast(e.message || 'Inladen lukte niet');
  }
  await loadAdminIntakes();
}

async function adminApproveIntake(id, again) {
  const i = adminIntakes.find(x => x.id === id);
  if (!i) return;
  const free = !again && !!$(`intakeFree${id}`)?.checked;
  let cents = again ? i.price_cents : free ? 0 : i.package_cents;
  if (cents == null) {
    const raw = String($(`intakePrice${id}`)?.value || '')
      .replace(',', '.')
      .trim();
    if (!raw || !(Number(raw) >= 0)) return toast('Vul een prijs in voor dit pakket');
    cents = Math.round(Number(raw) * 100);
  }
  if (
    !again &&
    !(await askConfirm(
      `Aanvraag van ${i.restaurant || i.name} goedkeuren?

Import service: ${adminEuro(cents)}, plus het teamabonnement. ${i.email} krijgt een mail met de link om te betalen en aan te leveren.`,
      { confirmLabel: 'Goedkeuren' }
    ))
  )
    return;
  try {
    await adminApi('approve_intake', { id, free, price_cents: cents });
    toast(again ? 'Mail opnieuw verstuurd' : 'Goedgekeurd; de klant heeft een mail');
    await loadAdminIntakes();
  } catch (e) {
    toast(e.message || 'Goedkeuren lukte niet');
  }
}

async function adminRejectIntake(id) {
  const i = adminIntakes.find(x => x.id === id);
  if (!i) return;
  const reason = await askText(
    `Aanvraag van ${i.restaurant || i.name} afwijzen\n\nDe klant krijgt een vriendelijke mail. Wil je er een reden bij zetten? (mag leeg)`,
    '',
    {
      confirmLabel: 'Afwijzen en mailen'
    }
  );
  if (reason === null || reason === undefined) return;
  try {
    await adminApi('reject_intake', { id, reason });
    toast('Afgewezen; de klant heeft een mail');
    await loadAdminIntakes();
  } catch (e) {
    toast(e.message || 'Afwijzen lukte niet');
  }
}

async function adminReleaseIntake(id) {
  const i = adminIntakes.find(x => x.id === id);
  if (!i) return;
  const n = (i.members || []).length + 1;
  if (
    !(await askConfirm(
      `Keukenteam van ${i.restaurant || i.name} vrijgeven?\n\n${n} ${n === 1 ? 'persoon krijgt' : 'personen krijgen'} een mail met een link om een wachtwoord te kiezen; de leden krijgen Pro en toegang tot het keukenteam. Daarna worden alle aangeleverde bestanden en gegevens gewist. Dit kan niet ongedaan worden gemaakt.`,
      { confirmLabel: 'Vrijgeven', danger: true }
    ))
  )
    return;
  try {
    const d = await adminApi('release_intake', { id });
    toast(`Vrijgegeven: ${d.sent} mail(s) verstuurd${d.failed?.length ? `, mislukt: ${d.failed.join(', ')}` : ''}`);
    await loadAdminIntakes();
  } catch (e) {
    toast(e.message || 'Vrijgeven lukte niet');
  }
}

function adminCopyIntakeLink(id) {
  const i = adminIntakes.find(x => x.id === id);
  if (!i) return;
  navigator.clipboard
    ?.writeText(i.link)
    .then(() => toast('Link gekopieerd'))
    .catch(() => toast('Kopiëren lukte niet; selecteer de link en kopieer hem zelf'));
}

// Downloadlinks zijn een uur geldig en worden per klik opgevraagd.
async function adminDownloadIntakeFile(id, file) {
  try {
    const { url } = await adminApi('intake_file', { id, file });
    const a = document.createElement('a');
    a.href = url;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) {
    toast(e.message || 'Downloaden lukte niet');
  }
}

async function adminDeleteIntake(id) {
  const i = adminIntakes.find(x => x.id === id);
  if (!i) return;
  if (
    !(await askConfirm(
      `Aanvraag verwijderen?\n\nDe aanvraag van ${i.restaurant || i.name || 'deze keuken'} en alle aangeleverde bestanden worden verwijderd; de link werkt daarna niet meer. Recepten die al in het keukenteam staan blijven staan.`,
      { confirmLabel: 'Verwijderen', danger: true }
    ))
  )
    return;
  try {
    await adminApi('delete_intake', { id });
    adminIntakes = adminIntakes.filter(x => x.id !== id);
    renderAdminIntakes();
  } catch (e) {
    toast(e.message || 'Verwijderen lukte niet');
  }
}

// ---- Foutenlogboek (api/admin.js, tabel app_errors) ----

async function loadAdminErrors() {
  const body = $('adminErrorsBody');
  if (!body) return;
  try {
    const d = await adminApi('errors');
    const badge = $('adminErrorBadge');
    if (badge) {
      badge.hidden = !d.last24h;
      badge.textContent = d.last24h;
      badge.title = `${d.last24h} fouten in de laatste 24 uur`;
    }
    if ($('adminErrorCount')) $('adminErrorCount').textContent = `${d.total} meldingen · laatste 30 dagen`;
    body.innerHTML =
      d.groups
        .map(
          g =>
            `<tr><td><div class="admin-error-msg">${adminEscape(g.message)}<small>${adminEscape(g.source || '')}${g.line ? `:${adminEscape(g.line)}` : ''}${g.version ? ` · versie ${adminEscape(g.version)}` : ''}</small></div></td><td>${adminEscape(g.count)}</td><td>${adminFormatDate(g.last)}</td><td>${g.pages.map(adminEscape).join('<br>') || '—'}</td><td>${g.devices.map(adminEscape).join('<br>')}${(g.agents || []).length ? `<small class="admin-error-agent">${g.agents.map(adminEscape).join('<br>')}</small>` : ''}</td></tr>`
        )
        .join('') || '<tr><td colspan="5">Geen fouten in de laatste 30 dagen.</td></tr>';
  } catch (e) {
    body.innerHTML = `<tr><td colspan="5">Fouten konden niet worden geladen: ${adminEscape(e.message)}. Is supabase/2026-10-25-foutenlogboek.sql uitgevoerd?</td></tr>`;
  }
}

async function adminClearErrors() {
  if (
    !(await askConfirm(
      'Alle foutmeldingen wissen?\n\nDoe dit als je de fouten hebt bekeken of opgelost. Nieuwe fouten verschijnen daarna weer vanzelf.',
      { confirmLabel: 'Alles wissen', danger: true }
    ))
  )
    return;
  try {
    await adminApi('clear_errors');
    toast('Foutmeldingen gewist');
    await loadAdminErrors();
  } catch (e) {
    alertAdmin(e.message);
  }
}

// ---- Accounts, abonnementen, omzet en kosten (api/admin.js) ----

let adminAccounts = [];

const adminMoney = v =>
  v == null ? '—' : `€ ${Number(v).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

async function loadAdminOverview() {
  const money = $('adminMoney');
  try {
    const {
      accounts,
      totals: t,
      visitor_days: visitorDays,
      visitor_stats: visitorNumbers
    } = await adminApi('overview', { own_visitor: adminOwnVisitorId() });
    // Bezoekers (cijfers, per dag, platform en laatste bezoeken) komen van de server, uit site_visits.
    if (Array.isArray(visitorDays)) renderAdminVisitorChart(visitorDays);
    if (visitorNumbers) {
      Object.assign(adminDashData, visitorNumbers);
      adminDashData.accounts ??= (accounts || []).length;
      renderAdminStats();
    }
    adminAccounts = accounts || [];
    adminTotals = t;
    renderAdminFinance();
    const openai = t.openai_this_month ? `$ ${t.openai_this_month.usd.toFixed(2)}` : '—';
    if (money)
      money.innerHTML = [
        ['Accounts', t.accounts, `${t.new_7_days} nieuw deze week`],
        ['Niet bevestigd', t.unconfirmed, 'e-mail nog niet geverifieerd'],
        ['Gratis', t.free, 'accounts zonder Pro'],
        ['Proefperiode', t.trial, '7 dagen Pro'],
        ['Pro betaald', t.pro, 'eigen abonnement'],
        ['Teams', t.teams, `${t.team_members} teamleden met Pro`],
        ['Pro cadeau', t.gift, 'door jou gegeven'],
        ['Omzet per maand', adminMoney(t.mrr_eur), 'lopende abonnementen (MRR)'],
        ['Betaald via Stripe', adminMoney(t.stripe_30_days?.eur), 'afgelopen 30 dagen'],
        ['OpenAI-kosten', openai, t.openai_this_month ? 'deze maand' : 'koppel OPENAI_ADMIN_KEY'],
        ['AI-imports', t.ai_this_month, 'deze maand, alle accounts'],
        ['Recepten', t.recipes, 'in alle bibliotheken']
      ]
        .map(
          x =>
            `<div class="admin-stat"><div class="label">${adminEscape(x[0])}</div><div class="value">${adminEscape(x[1])}</div><div class="sub">${adminEscape(x[2])}</div></div>`
        )
        .join('');
    if ($('adminMoneyNote')) $('adminMoneyNote').textContent = `bijgewerkt ${adminFormatDate(new Date())}`;
    renderAdminAccounts();
    renderAdminGrowth(adminAccounts);
  } catch (error) {
    if (!error.expired) console.error('Admin overzicht laden mislukt', error);
    if (money)
      money.innerHTML = `<div class="admin-stat"><div class="label">Status</div><div class="value">Fout</div><div class="sub">${adminEscape(error.message)}</div></div>`;
  }
}

// Nieuwe accounts per week, de laatste 8 weken (week begint op maandag).
function renderAdminGrowth(accounts) {
  const host = $('adminGrowth');
  if (!host) return;
  const monday = d => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  };
  const thisWeek = monday(new Date());
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const start = new Date(thisWeek);
    start.setDate(start.getDate() - (7 - i) * 7);
    return { start, count: 0 };
  });
  for (const a of accounts) {
    const w = monday(a.created_at).getTime();
    const hit = weeks.find(x => x.start.getTime() === w);
    if (hit) hit.count++;
  }
  const max = Math.max(1, ...weeks.map(w => w.count));
  const total = weeks.reduce((n, w) => n + w.count, 0);
  const label = d => d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
  host.innerHTML = `<div class="admin-growth-total"><b>${total}</b><span>nieuwe accounts in 8 weken · ${accounts.length} in totaal</span></div><div class="admin-growth-bars">${weeks
    .map(
      w =>
        `<div class="admin-growth-bar" title="Week van ${adminEscape(label(w.start))}: ${w.count} nieuwe accounts"><span class="count">${w.count}</span><span class="bar" style="height:${Math.round((w.count / max) * 100)}%"></span><span class="week">${adminEscape(label(w.start))}</span></div>`
    )
    .join('')}</div>`;
}

function renderAdminAccounts() {
  const body = $('adminAccountsBody');
  if (!body) return;
  const q = ($('adminAccountSearch')?.value || '').trim().toLowerCase();
  const type = $('adminAccountType')?.value || '';
  const rows = adminAccounts.filter(
    a =>
      (!type || a.type === type) &&
      (!q ||
        [a.name, a.email, a.organization].some(v =>
          String(v || '')
            .toLowerCase()
            .includes(q)
        ))
  );
  if ($('adminAccountCount')) $('adminAccountCount').textContent = `${rows.length} van ${adminAccounts.length}`;
  body.innerHTML =
    rows
      .map(a => {
        const until =
          a.until && ['gift', 'trial', 'pro'].includes(a.type)
            ? `<small>tot ${adminFormatDate(a.until).split(' om')[0]}</small>`
            : '';
        const action =
          a.type === 'gift'
            ? `<button class="admin-ghost" onclick="adminRevokeGift('${a.id}')">Cadeau intrekken</button>`
            : a.paid_stripe
              ? ''
              : `<button class="admin-ghost" onclick="adminGiftPro('${a.id}')">Pro geven</button>`;
        const confirm = a.confirmed
          ? ''
          : `<button class="admin-ghost" onclick="adminConfirmAccount('${a.id}')">Bevestigen</button>`;
        const remove = `<button class="admin-ghost admin-danger" onclick="adminDeleteAccount('${a.id}')">Verwijderen</button>`;
        return `<tr><td>${adminFlag(a.country)} ${adminEscape(a.name || '—')}</td><td>${adminEscape(a.email || '—')}${a.confirmed ? '' : ' <span class="admin-badge warn">niet bevestigd</span>'}</td><td>${adminEscape(a.organization || '—')}</td><td><span class="admin-badge ${adminEscape(a.type)}">${adminEscape(a.label)}</span>${until}</td><td>${adminEscape(a.recipes)}</td><td>${adminEscape(a.ai_this_month)}</td><td>${adminFormatDate(a.created_at)}</td><td>${adminFormatDate(a.last_sign_in_at)}</td><td><div class="admin-actions">${confirm}${action}${remove}</div></td></tr>`;
      })
      .join('') || '<tr><td colspan="9">Geen accounts gevonden.</td></tr>';
}

// Nieuw account: uitnodiging per mail, de gebruiker kiest zelf een wachtwoord (api/admin.js).
async function adminCreateAccount() {
  const email = (
    await askText('Nieuw account aanmaken\n\nE-mailadres van de nieuwe gebruiker:', '', { confirmLabel: 'Verder' })
  )?.trim();
  if (!email) return;
  const name = (await askText('Naam (mag leeg blijven):', '', { confirmLabel: 'Verder' })) ?? null;
  if (name === null) return;
  const organization = (await askText('Organisatie (mag leeg blijven):', '', { confirmLabel: 'Verder' })) ?? null;
  if (organization === null) return;
  if (
    !(await askConfirm(
      `Account aanmaken voor ${email}?\n\nSavour stuurt een uitnodiging per mail. Met de link daarin kiest de gebruiker zelf een wachtwoord.`,
      { confirmLabel: 'Account aanmaken' }
    ))
  )
    return;
  try {
    await adminApi('create_account', { email, name: name.trim(), organization: organization.trim() });
    toast(`Uitnodiging verstuurd naar ${email}`);
    await loadAdminOverview();
  } catch (e) {
    alertAdmin(e.message);
  }
}

// Account bevestigen zonder dat de gebruiker op de link in de mail klikt (bijv. als die mail niet aankwam).
async function adminConfirmAccount(userId) {
  const a = adminAccounts.find(x => x.id === userId);
  if (!a) return;
  if (
    !(await askConfirm(
      `Account bevestigen?

${a.email}${a.name ? ` (${a.name})` : ''}

Het e-mailadres telt dan als geverifieerd en de gebruiker kan meteen inloggen met het eigen wachtwoord.`,
      { confirmLabel: 'Bevestigen' }
    ))
  )
    return;
  try {
    await adminApi('confirm_account', { user_id: userId });
    toast(`${a.email} is bevestigd`);
    await loadAdminOverview();
  } catch (e) {
    alertAdmin(e.message);
  }
}

// Account verwijderen: eerst een duidelijke waarschuwing, daarna het e-mailadres overtypen ter bevestiging.
async function adminDeleteAccount(userId) {
  const a = adminAccounts.find(x => x.id === userId);
  if (!a) return;
  if (
    !(await askConfirm(
      `Account definitief verwijderen?\n\n${a.email}${a.name ? ` (${a.name})` : ''}\n\nAlle ${a.recipes} recepten, mappen, favorieten en keukenteams van dit account worden verwijderd. Dit kan niet ongedaan worden gemaakt.`,
      { confirmLabel: 'Ja, verwijderen', danger: true }
    ))
  )
    return;
  const typed = await askText(`Typ ter bevestiging het e-mailadres:\n${a.email}`, '', {
    confirmLabel: 'Definitief verwijderen'
  });
  if (typed === null) return;
  if (typed.trim().toLowerCase() !== String(a.email).toLowerCase())
    return alertAdmin('Het e-mailadres klopt niet. Er is niets verwijderd.');
  try {
    const r = await adminApi('delete_account', { user_id: userId });
    toast(`${r.email} is verwijderd`);
    await loadAdminOverview();
  } catch (e) {
    alertAdmin(e.message);
  }
}

async function adminGiftPro(userId) {
  const a = adminAccounts.find(x => x.id === userId);
  const days = await askChoice(`Savour Pro geven aan ${a?.email || 'dit account'}\n\nHoe lang?`, [
    { label: '30 dagen', value: '30' },
    { label: '3 maanden', value: '90' },
    { label: '1 jaar', value: '365' },
    { label: 'Onbeperkt', value: '3650' }
  ]);
  if (!days) return;
  try {
    await adminApi('gift', { user_id: userId, days: Number(days) });
    await loadAdminOverview();
  } catch (e) {
    alertAdmin(e.message);
  }
}

async function adminRevokeGift(userId) {
  const a = adminAccounts.find(x => x.id === userId);
  if (
    !(await askConfirm(`Cadeau-Pro intrekken bij ${a?.email || 'dit account'}?\n\nDe recepten blijven staan.`, {
      confirmLabel: 'Intrekken'
    }))
  )
    return;
  try {
    await adminApi('revoke_gift', { user_id: userId });
    await loadAdminOverview();
  } catch (e) {
    alertAdmin(e.message);
  }
}

function alertAdmin(message) {
  askConfirm(`Dat lukte niet\n\n${message}`, { confirmLabel: 'OK' });
}

function renderAdminVisitorChart(rows) {
  const svg = $('adminVisitorChart');
  if (!svg) return;
  const data = (rows || []).map(r => ({
    label: String(r.label || ''),
    count: Number(r.count) || 0,
    cumulative: Number(r.cumulative) || 0
  }));
  if (!data.length) {
    svg.innerHTML =
      '<text x="450" y="130" text-anchor="middle" class="admin-chart-label">Nog geen bezoekersdata.</text>';
    return;
  }
  const W = 900,
    H = 260,
    L = 46,
    R = 18,
    T = 18,
    B = 38,
    iw = W - L - R,
    ih = H - T - B,
    max = Math.max(1, ...data.map(x => x.count));
  const pts = data.map((x, i) => {
    const px = L + (data.length === 1 ? iw / 2 : i * (iw / (data.length - 1)));
    const py = T + ih - (x.count / max) * ih;
    return { ...x, px, py };
  });
  const path = pts.map((p, i) => `${i ? 'L' : 'M'} ${p.px.toFixed(1)} ${p.py.toFixed(1)}`).join(' ');
  const area = `M ${pts[0].px.toFixed(1)} ${T + ih} L ${pts.map(p => `${p.px.toFixed(1)} ${p.py.toFixed(1)}`).join(' L ')} L ${pts[pts.length - 1].px.toFixed(1)} ${T + ih} Z`;
  const grids = [0, 0.25, 0.5, 0.75, 1]
    .map(v => {
      const y = T + ih - v * ih;
      return `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" class="admin-chart-grid"/><text x="${L - 8}" y="${y + 4}" text-anchor="end" class="admin-chart-label">${Math.round(max * v)}</text>`;
    })
    .join('');
  const labels = pts
    .filter((_, i) => i === 0 || i === pts.length - 1 || i % Math.max(1, Math.ceil(pts.length / 6)) === 0)
    .map(
      p =>
        `<text x="${p.px}" y="${H - 10}" text-anchor="middle" class="admin-chart-label">${adminEscape(p.label)}</text>`
    )
    .join('');
  const dots = pts
    .map(
      p =>
        `<circle cx="${p.px}" cy="${p.py}" r="3.5" class="admin-chart-dot"><title>${adminEscape(p.label)}: ${p.count} unieke bezoekers</title></circle>`
    )
    .join('');
  svg.innerHTML = `<defs><linearGradient id="adminChartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#d0ad60" stop-opacity=".65"/><stop offset="100%" stop-color="#d0ad60" stop-opacity="0"/></linearGradient></defs>${grids}<path d="${area}" class="admin-chart-area"/><path d="${path}" class="admin-chart-line"/>${dots}${labels}`;
}

function savourAnalyticsPlatform() {
  const ua = navigator.userAgent || '';
  if (
    window.SAVOUR_NATIVE_APP === true ||
    document.documentElement.dataset.savourApp === 'true' ||
    /SavourApp\//i.test(ua)
  )
    return 'native_app';
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return 'mobile_web';
  return 'desktop_web';
}

// Herkomst uit de link (bijv. savour.page/?bron=reddit, utm_source, een collega-uitnodiging of een advertentieklik).
// Alleen deze vaste namen en nooit een id of iets persoonlijks; de server leest er de bron uit (api/admin.js).
// Een link met een kenmerk van waar hij gedeeld is (bijv. ?bron=whatsapp), voor de deelknoppen in Savour zelf.
function linkWithSource(url, source) {
  return `${url}${String(url).includes('?') ? '&' : '?'}bron=${encodeURIComponent(source)}`;
}

function savourVisitSourceQuery() {
  const q = new URLSearchParams(location.search);
  const out = [];
  for (const k of ['bron', 'ref', 'utm_source', 'utm_medium', 'utm_campaign']) {
    const v = (q.get(k) || '').trim().slice(0, 40);
    if (v) out.push(`${k}=${encodeURIComponent(v)}`);
  }
  for (const k of ['collega', 'gclid', 'fbclid']) if (q.has(k)) out.push(k);
  return out.length ? `?${out.join('&')}` : '';
}

// path: zelf opgeven, bijv. '/demo' als iemand de demo start (zie startDemo); anders de huidige pagina.
async function logSavourVisit(path) {
  // Alleen echte bezoeken aan savour.page; de testversie en lokaal testen tellen niet mee.
  if (IS_ADMIN_PATH || !/(^|\.)savour\.page$/.test(location.hostname)) return;
  // Testbrowsers en bots tellen niet mee.
  if (navigator.webdriver || /bot|crawl|spider|headless|lighthouse|electron|preview/i.test(navigator.userAgent || ''))
    return;
  // Alleen echte browsers (zelfde regel als api/admin.js): tools zonder browsernaam blazen de teller op.
  if (!/Chrome\/|CriOS|Safari\/|Firefox\/|FxiOS|Edg\//.test(navigator.userAgent || '')) return;
  try {
    // Eigen test, bijvoorbeeld in incognito: open savour.page/?intern en dit venster telt niet meer mee.
    if (/[?&]intern\b/.test(location.search)) localStorage.setItem('savour_intern', '1');
    if (localStorage.getItem('savour_intern')) return;
    const key = 'savour_visit_id';
    let vid = localStorage.getItem(key);
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem(key, vid);
    }
    const visit = {
      visitor_id: vid,
      path: path || (window.location.pathname || '/') + savourVisitSourceQuery(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      platform: savourAnalyticsPlatform(),
      country: window.savourCountry ? window.savourCountry() : null
    };
    const { error } = await supabaseClient.from('site_visits').insert(visit);
    // Ontbreekt een kolom (platform of country: SQL nog niet uitgevoerd), dan weigert de database het hele
    // bezoek; dan zonder die kolom opslaan zodat de teller toch loopt.
    if (error && /platform|country/.test(error.message || '')) {
      delete visit.country;
      if (/platform/.test(error.message || '')) delete visit.platform;
      await supabaseClient.from('site_visits').insert(visit);
    }
  } catch (e) {
    console.debug('Savour analytics unavailable', e);
  }
}

// ---- Financiën: omzet, kosten, winst en uren (api/admin.js). Cijfers zijn een hulpmiddel, geen boekhouding. ----

const FIN_REVENUE = '#b28515';
const FIN_COST = '#4a8fd9';
const FIN_PROFIT = '#38a97c';
const FIN_LOSS = '#d9694a';
const KOR_LIMIT = 20000;
const PRO_MONTH_PRICE = 2.99;
let adminFinance = null;
let adminFinancePeriod = 'year';
let adminTotals = null;

async function loadAdminFinance() {
  if (!$('adminFinanceBody')) return;
  try {
    adminFinance = await adminApi('finance');
    renderAdminFinance();
  } catch (error) {
    if (!error.expired) $('adminFinanceBody').innerHTML = `<p class="admin-note">${adminEscape(error.message)}</p>`;
  }
}

function setFinancePeriod(period) {
  adminFinancePeriod = period;
  renderAdminFinance();
}

// Eigen kosten per maand. Een terugkerende post loopt door tot de stopmaand.
function financeCostInMonth(cost, month) {
  const start = cost.date.slice(0, 7);
  if (month < start || (cost.until && month > cost.until)) return 0;
  if (cost.repeat === 'month') return cost.amount;
  if (cost.repeat === 'year') return month.slice(5) === start.slice(5) ? cost.amount : 0;
  return month === start ? cost.amount : 0;
}

// Eén rij per maand: omzet, kosten per soort en winst.
function financeRows(d) {
  return d.months.map(month => {
    const stripeRow = d.stripe?.[month] || { revenue: 0, fees: 0 };
    const ads = d.ads?.[month] || 0;
    const ai = d.openai?.[month] || 0;
    const categories = { Betaalkosten: stripeRow.fees, 'AI (OpenAI)': ai };
    for (const c of d.costs || []) {
      const amount = financeCostInMonth(c, month);
      if (amount) categories[c.category] = (categories[c.category] || 0) + amount;
    }
    const revenue = stripeRow.revenue + ads;
    const costs = Object.values(categories).reduce((a, b) => a + b, 0);
    return { month, subs: stripeRow.revenue, ads, revenue, categories, costs, profit: revenue - costs };
  });
}

const finMonthLabel = (month, long) =>
  new Date(`${month}-15T12:00:00`).toLocaleDateString(
    'nl-NL',
    long ? { month: 'long', year: 'numeric' } : { month: 'short' }
  );

function finBars(rows, series, label) {
  const W = 720,
    H = 230,
    L = 72,
    B = 26,
    T = 10;
  const values = rows.flatMap(r => series.map(s => r[s.key]));
  const top = Math.max(...values, 0) || 1;
  const low = Math.min(...values, 0);
  const span = top - low;
  const y = v => T + ((top - v) / span) * (H - T - B);
  const band = (W - L) / rows.length;
  const width = Math.min(18, (band - 8) / series.length - 2);
  const grid = [top, top / 2, 0, ...(low < 0 ? [low] : [])]
    .filter((v, i, list) => list.slice(0, i).every(o => Math.abs(y(o) - y(v)) > 16))
    .map(
      v =>
        `<line x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}" class="fin-grid"></line><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" class="fin-axis">${adminEscape(adminMoney(v).replace(',00', ''))}</text>`
    )
    .join('');
  const bars = rows
    .map((r, i) => {
      const x0 = L + i * band + (band - series.length * (width + 2)) / 2;
      const marks = series
        .map((s, n) => {
          const v = r[s.key];
          const color = s.color || (v < 0 ? FIN_LOSS : FIN_PROFIT);
          const h = Math.max(v ? 2 : 0, Math.abs(y(v) - y(0)));
          return `<rect x="${x0 + n * (width + 2)}" y="${v < 0 ? y(0) : y(0) - h}" width="${width}" height="${h}" rx="3" fill="${color}"></rect>`;
        })
        .join('');
      const tip = `${finMonthLabel(r.month, true)}: ${series.map(s => `${s.name} ${adminMoney(r[s.key])}`).join(' · ')}`;
      return `<g class="fin-hit" data-tip="${adminEscape(tip)}"><rect x="${L + i * band}" y="0" width="${band}" height="${H}" fill="transparent"></rect>${marks}<text x="${L + i * band + band / 2}" y="${H - 8}" text-anchor="middle" class="fin-axis">${adminEscape(finMonthLabel(r.month))}</text></g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${adminEscape(label)}">${grid}${bars}</svg>`;
}

function finLine(rows) {
  const W = 720,
    H = 190,
    L = 72,
    B = 26,
    T = 10;
  let sum = 0;
  const points = rows.map(r => ({ ...r, total: (sum += r.profit) }));
  const top = Math.max(...points.map(p => p.total), 0) || 1;
  const low = Math.min(...points.map(p => p.total), 0);
  const span = top - low || 1;
  const y = v => T + ((top - v) / span) * (H - T - B);
  const x = i => L + ((W - L - 12) / Math.max(1, points.length - 1)) * i;
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.total)}`).join(' ');
  const zero = `<line x1="${L}" x2="${W}" y1="${y(0)}" y2="${y(0)}" class="fin-grid"></line><text x="${L - 6}" y="${y(0) + 4}" text-anchor="end" class="fin-axis">€ 0</text>`;
  const dots = points
    .map(
      (p, i) =>
        `<g class="fin-hit" data-tip="${adminEscape(`${finMonthLabel(p.month, true)}: totaal ${adminMoney(p.total)}`)}"><rect x="${x(i) - 24}" y="0" width="48" height="${H}" fill="transparent"></rect><circle cx="${x(i)}" cy="${y(p.total)}" r="4" fill="${FIN_REVENUE}"></circle></g>`
    )
    .join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Totale winst over twaalf maanden">${zero}<path d="${line}" fill="none" stroke="${FIN_REVENUE}" stroke-width="2"></path>${dots}</svg>`;
}

function finLegend(series) {
  return `<div class="fin-legend">${series.map(s => `<span><i style="background:${s.color}"></i>${adminEscape(s.name)}</span>`).join('')}</div>`;
}

function finTile(label, value, note, cls = '') {
  return `<div class="admin-stat ${cls}"><div class="label">${adminEscape(label)}</div><div class="value">${adminEscape(value)}</div><div class="sub">${adminEscape(note)}</div></div>`;
}

function financeHoursSummary(d) {
  const m = d.measured || {};
  const rows = [
    { source: 'Claude Code', hours: m.claudeCodeHours || 0, note: `Gemeten sinds ${m.firstClaude || '—'}`, auto: true },
    {
      source: 'Claude Code',
      hours: m.gitEstimateHours || 0,
      note: `Geschat uit Git, ${m.firstCommit || '—'} tot ${m.firstClaude || '—'}`,
      auto: true
    },
    ...(d.hours || [])
  ].filter(r => r.hours > 0);
  return { rows, total: rows.reduce((sum, r) => sum + Number(r.hours), 0) };
}

function renderAdminFinance() {
  const host = $('adminFinanceBody');
  const d = adminFinance;
  if (!host || !d) return;
  const all = financeRows(d);
  const now = new Date();
  const thisMonth = d.months[d.months.length - 1];
  const thisYear = String(now.getFullYear());
  const picked = {
    month: all.filter(r => r.month === thisMonth),
    year: all.filter(r => r.month.startsWith(thisYear)),
    all
  }[adminFinancePeriod];
  const sum = key => picked.reduce((total, r) => total + r[key], 0);
  const revenue = sum('revenue');
  const costs = sum('costs');
  const profit = revenue - costs;
  const yearRevenue = all.filter(r => r.month.startsWith(thisYear)).reduce((t, r) => t + r.revenue, 0);
  const fixed = (d.costs || []).reduce((t, c) => {
    if (c.until && c.until < thisMonth) return t;
    return t + (c.repeat === 'month' ? c.amount : c.repeat === 'year' ? c.amount / 12 : 0);
  }, 0);
  const t = adminTotals || {};
  const mrr = Number(t.mrr_eur) || 0;
  const customers = (Number(t.pro) || 0) + (Number(t.teams) || 0);
  const breakEven = Math.max(0, Math.ceil((fixed - mrr) / PRO_MONTH_PRICE));
  const hours = financeHoursSummary(d);
  const allProfit = all.reduce((total, r) => total + r.profit, 0);

  const categories = new Map();
  for (const r of picked)
    for (const [name, amount] of Object.entries(r.categories))
      categories.set(name, (categories.get(name) || 0) + amount);
  const costRows = [...categories].filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const maxCost = costRows[0]?.[1] || 1;

  const missing = [
    !d.stripe && 'Stripe',
    !d.ads && 'AdSense (nog niet gekoppeld)',
    !d.openai && 'OpenAI (geen admin-sleutel)'
  ].filter(Boolean);
  const period = (id, label) =>
    `<button type="button" class="${adminFinancePeriod === id ? 'is-on' : ''}" onclick="setFinancePeriod('${id}')">${label}</button>`;
  const options = list => list.map(x => `<option>${adminEscape(x)}</option>`).join('');
  const today = now.toISOString().slice(0, 10);
  const repeatName = { none: 'Eenmalig', month: 'Per maand', year: 'Per jaar' };

  host.innerHTML = `
    <div class="fin-periods" role="group" aria-label="Periode">${period('month', 'Deze maand')}${period('year', 'Dit jaar')}${period('all', '12 maanden')}</div>
    ${missing.length ? `<p class="admin-note">Nog niet meegeteld: ${adminEscape(missing.join(', '))}.</p>` : ''}
    <div class="admin-stats-grid fin-hero">
      ${finTile('Omzet', adminMoney(revenue), 'abonnementen, import service en advertenties')}
      ${finTile('Kosten', adminMoney(costs), 'eigen kosten, betaalkosten en AI')}
      ${finTile('Winst', `${profit < 0 ? '▼ ' : '▲ '}${adminMoney(Math.abs(profit))}`, profit < 0 ? 'verlies in deze periode' : 'in deze periode')}
      ${finTile('Marge', revenue ? `${Math.round((profit / revenue) * 100)}%` : '—', 'winst als deel van de omzet')}
    </div>
    <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">ONTWIKKELING</div><h2>Omzet en kosten per maand</h2></div></div>${finLegend(
      [
        { name: 'Omzet', color: FIN_REVENUE },
        { name: 'Kosten', color: FIN_COST }
      ]
    )}<div class="fin-chart">${finBars(
      all,
      [
        { key: 'revenue', name: 'Omzet', color: FIN_REVENUE },
        { key: 'costs', name: 'Kosten', color: FIN_COST }
      ],
      'Omzet en kosten per maand'
    )}</div></section>
    <div class="fin-two">
      <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">RESULTAAT</div><h2>Winst per maand</h2></div></div><div class="fin-chart">${finBars(all, [{ key: 'profit', name: 'Winst' }], 'Winst per maand')}</div></section>
      <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">TOTAAL</div><h2>Opgeteld over 12 maanden</h2></div><span class="admin-count">${adminEscape(adminMoney(allProfit))}</span></div><div class="fin-chart">${finLine(all)}</div></section>
    </div>
    <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">GEZONDHEID</div><h2>Belangrijkste cijfers</h2></div></div>
      <div class="admin-stats-grid">
        ${finTile('Terugkerend per maand', adminMoney(mrr), 'MRR, lopende abonnementen')}
        ${finTile('Op jaarbasis', adminMoney(mrr * 12), 'ARR, als alles zo doorloopt')}
        ${finTile('Betalende klanten', count0(customers), `${count0(t.pro)} Pro · ${count0(t.teams)} teams`)}
        ${finTile('Gemiddeld per klant', customers ? adminMoney(mrr / customers) : '—', 'per maand')}
        ${finTile('Vaste kosten', adminMoney(fixed), 'per maand, zelf ingevoerd')}
        ${finTile('Tot break-even', breakEven ? `${breakEven} Pro erbij` : 'Bereikt', breakEven ? 'om de vaste kosten te dekken' : 'abonnementen dekken de vaste kosten')}
      </div>
      <div class="adsense-payout"><div><b>${adminEscape(adminMoney(yearRevenue))}</b> van ${adminEscape(adminMoney(KOR_LIMIT))} omzet dit jaar (KOR-grens)</div><i><b style="width:${Math.min(100, (yearRevenue / KOR_LIMIT) * 100)}%"></b></i></div>
      <p class="admin-footnote">Savour rekent nu geen btw (KOR). Vraag je boekhouder wat er nodig is als je bij de grens komt.</p>
    </section>
    <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">KOSTEN</div><h2>Waar het geld heen gaat</h2></div></div>
      ${costRows.length ? `<div class="fin-cats">${costRows.map(([name, value]) => `<div><span>${adminEscape(name)}</span><i><b style="width:${(value / maxCost) * 100}%"></b></i><strong>${adminEscape(adminMoney(value))}</strong></div>`).join('')}</div>` : '<p class="admin-note">Nog geen kosten in deze periode.</p>'}
      <h3 class="adsense-title">Kosten toevoegen</h3>
      <form class="fin-form" onsubmit="event.preventDefault();saveFinanceCostForm(this)">
        <input name="name" placeholder="Bijv. Claude-abonnement" aria-label="Naam" required>
        <select name="category" aria-label="Categorie">${options(d.categories || [])}</select>
        <input name="amount" inputmode="decimal" placeholder="Bedrag in €" aria-label="Bedrag" required>
        <input name="date" type="date" value="${today}" aria-label="Datum" required>
        <select name="repeat" aria-label="Herhaling"><option value="none">Eenmalig</option><option value="month">Per maand</option><option value="year">Per jaar</option></select>
        <button class="btn gold">Toevoegen</button>
      </form>
      ${(d.costs || []).length ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Kosten</th><th>Categorie</th><th>Bedrag</th><th>Herhaling</th><th>Vanaf</th><th></th></tr></thead><tbody>${d.costs.map(c => `<tr><td>${adminEscape(c.name)}</td><td>${adminEscape(c.category)}</td><td>${adminEscape(adminMoney(c.amount))}</td><td>${repeatName[c.repeat] || ''}</td><td>${adminEscape(c.date)}</td><td><button type="button" class="btn-quiet" onclick="deleteFinanceRow('finance_delete_cost','${adminEscape(c.id)}')">Verwijderen</button></td></tr>`).join('')}</tbody></table></div>` : ''}
    </section>
    <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">UREN</div><h2>Tijd in Savour</h2></div><span class="admin-count">${hours.total.toLocaleString('nl-NL', { maximumFractionDigits: 1 })} uur</span></div>
      <div class="admin-stats-grid">
        ${finTile('Totaal gewerkt', `${hours.total.toLocaleString('nl-NL', { maximumFractionDigits: 0 })} uur`, 'gemeten, geschat en zelf ingevoerd')}
        ${finTile('Werkweken', (hours.total / 40).toLocaleString('nl-NL', { maximumFractionDigits: 1 }), 'van 40 uur')}
        ${finTile('Winst per uur', hours.total ? adminMoney(allProfit / hours.total) : '—', 'over de laatste 12 maanden')}
        ${finTile('Commits', count0(d.measured?.commits), `sinds ${d.measured?.firstCommit || '—'}`)}
      </div>
      <h3 class="adsense-title">Uren toevoegen</h3>
      <form class="fin-form" onsubmit="event.preventDefault();saveFinanceHoursForm(this)">
        <select name="source" aria-label="Bron">${options(d.sources || [])}</select>
        <input name="hours" inputmode="decimal" placeholder="Aantal uren" aria-label="Uren" required>
        <input name="note" placeholder="Toelichting" aria-label="Toelichting">
        <button class="btn gold">Toevoegen</button>
      </form>
      <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Bron</th><th>Uren</th><th>Toelichting</th><th></th></tr></thead><tbody>${hours.rows.map(h => `<tr><td>${adminEscape(h.source)}</td><td>${Number(h.hours).toLocaleString('nl-NL')}</td><td>${adminEscape(h.note || '')}</td><td>${h.auto ? '' : `<button type="button" class="btn-quiet" onclick="deleteFinanceRow('finance_delete_hours','${adminEscape(h.id)}')">Verwijderen</button>`}</td></tr>`).join('')}</tbody></table></div>
    </section>
    <section class="admin-panel"><div class="admin-panel-head"><div><div class="admin-kicker">OVERZICHT</div><h2>Per maand</h2></div><button type="button" class="btn" onclick="downloadFinanceCsv()">Download voor boekhouder</button></div>
      <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Maand</th><th>Stripe</th><th>Advertenties</th><th>Omzet</th><th>Kosten</th><th>Winst</th></tr></thead><tbody>${all
        .slice()
        .reverse()
        .map(
          r =>
            `<tr><td>${adminEscape(finMonthLabel(r.month, true))}</td><td>${adminEscape(adminMoney(r.subs))}</td><td>${adminEscape(adminMoney(r.ads))}</td><td>${adminEscape(adminMoney(r.revenue))}</td><td>${adminEscape(adminMoney(r.costs))}</td><td>${adminEscape(adminMoney(r.profit))}</td></tr>`
        )
        .join('')}</tbody></table></div>
      <p class="admin-footnote">Hulpmiddel, geen boekhouding. Advertenties zijn schattingen van Google en dollars zijn afgerond omgerekend.</p>
    </section>
    <div id="finTip" class="fin-tip" hidden></div>`;

  // Hover: waarde bij elke maand. De tabel hierboven toont dezelfde cijfers zonder muis.
  const tip = $('finTip');
  host.querySelectorAll('.fin-hit').forEach(g => {
    g.addEventListener('mousemove', e => {
      tip.textContent = g.dataset.tip;
      tip.hidden = false;
      tip.style.left = `${Math.min(innerWidth - 300, e.clientX + 14)}px`;
      tip.style.top = `${e.clientY + 14}px`;
    });
    g.addEventListener('mouseleave', () => (tip.hidden = true));
  });
}

const count0 = v => (Number(v) || 0).toLocaleString('nl-NL');

async function saveFinanceCostForm(form) {
  try {
    await adminApi('finance_save_cost', { cost: Object.fromEntries(new FormData(form)) });
    await loadAdminFinance();
  } catch (error) {
    toast(error.message);
  }
}

async function saveFinanceHoursForm(form) {
  try {
    await adminApi('finance_save_hours', { entry: Object.fromEntries(new FormData(form)) });
    await loadAdminFinance();
  } catch (error) {
    toast(error.message);
  }
}

async function deleteFinanceRow(action, id) {
  if (!(await askConfirm('Deze regel verwijderen?'))) return;
  try {
    await adminApi(action, { id });
    await loadAdminFinance();
  } catch (error) {
    toast(error.message);
  }
}

function downloadFinanceCsv() {
  if (!adminFinance) return;
  const cell = v => `"${String(v).replace(/"/g, '""')}"`;
  const number = v => v.toFixed(2).replace('.', ',');
  const lines = [['Maand', 'Stripe', 'Advertenties', 'Omzet', 'Kosten', 'Winst'].map(cell).join(';')];
  for (const r of financeRows(adminFinance))
    lines.push([r.month, ...[r.subs, r.ads, r.revenue, r.costs, r.profit].map(number)].map(cell).join(';'));
  lines.push('', ['Kosten', 'Categorie', 'Bedrag', 'Herhaling', 'Datum'].map(cell).join(';'));
  for (const c of adminFinance.costs || [])
    lines.push([c.name, c.category, number(c.amount), c.repeat, c.date].map(cell).join(';'));
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([`﻿${lines.join('\n')}`], { type: 'text/csv;charset=utf-8' }));
  link.download = `savour-financien-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
