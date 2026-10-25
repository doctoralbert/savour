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

function adminFormatDate(v) {
  if (!v) return '—';
  try {
    return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(v));
  } catch {
    return '—';
  }
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

async function adminApi(action, body = {}) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  const response = await fetch('/api/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` },
    body: JSON.stringify({ action, ...body })
  });
  const result = await response.json().catch(() => ({}));
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

// Tabbladen: Overzicht, Bezoekers, Accounts, Fouten, Advertenties. De keuze blijft bewaard tijdens het bezoek.
function showAdminTab(tab) {
  const tabs = [...document.querySelectorAll('.admin-tab')].map(t => t.dataset.adminTab);
  if (!tabs.includes(tab)) tab = 'overzicht';
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('is-on', t.dataset.adminTab === tab));
  document.querySelectorAll('.admin-tabs button').forEach(b => b.classList.toggle('is-on', b.dataset.adminTab === tab));
  try {
    sessionStorage.setItem('savour_admin_tab', tab);
  } catch (_) {}
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
        d.own_devices ? `zonder jouw ${d.own_devices} apparaat/apparaten` : 'sinds de start'
      ],
      ['Accounts', d.accounts, 'geregistreerde gebruikers'],
      ['App gebruikers', d.app_users, 'unieke native app-gebruikers'],
      ['Recepten', d.recipes, 'persoonlijke recepten'],
      ['Receptenmappen', d.folders, 'persoonlijke mappen'],
      ['Gedeelde mappen', d.shared_maps, 'gedeelde mappen']
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
  if ($('adminPlatformUsage'))
    $('adminPlatformUsage').innerHTML = box([
      ['Desktop', d.platform_desktop],
      ['Mobiel web', d.platform_mobile],
      ['Native app', d.platform_app]
    ]);
  // Herkomst: per bron het aantal unieke bezoekers, met een balkje ten opzichte van de grootste bron.
  const sb = $('adminSourcesBody');
  if (sb) {
    const sources = d.sources || [];
    const max = Math.max(1, ...sources.map(x => x.all));
    sb.innerHTML =
      sources
        .map(
          x =>
            `<tr><td>${adminEscape(x.name)}</td><td class="admin-source-bar"><i style="width:${Math.round((x.all / max) * 100)}%"></i></td><td>${adminEscape(x.week)}</td><td>${adminEscape(x.month)}</td><td><b>${adminEscape(x.all)}</b></td></tr>`
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
            `<tr><td>${adminFormatDate(v.last)}</td><td>${adminEscape(v.visits)}</td><td>${v.pages.map(adminEscape).join('<br>')}</td><td>${adminEscape(v.platform === 'native_app' ? 'Native app' : v.platform === 'mobile_web' ? 'Mobiel web' : 'Desktop web')}</td><td>${adminEscape(adminDevice(v.user_agent))}</td><td title="${adminEscape(v.referrer || '')}">${adminEscape(v.source || v.referrer || 'Direct')}</td></tr>`
        )
        .join('') || '<tr><td colspan="6">Nog geen bezoekers.</td></tr>';
}

async function loadAdminDashboard() {
  const refresh = $('adminRefreshBtn');
  if (refresh) {
    refresh.disabled = true;
    refresh.textContent = '↻ Verversen…';
  }
  adminDashData = {};
  try {
    const { data, error } = await supabaseClient.rpc('get_savour_admin_dashboard');
    if (error) throw error;
    // Alleen de tellingen van accounts, recepten en mappen; bezoekers komen van de server.
    const d = data || {};
    for (const k of ['accounts', 'app_users', 'recipes', 'folders', 'shared_maps']) adminDashData[k] = d[k] || 0;
  } catch (error) {
    console.error('Admin-tellingen laden mislukt', error);
  }
  renderAdminStats();
  loadAdminErrors();
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
            `<tr><td><div class="admin-error-msg">${adminEscape(g.message)}<small>${adminEscape(g.source || '')}${g.line ? `:${adminEscape(g.line)}` : ''}${g.version ? ` · versie ${adminEscape(g.version)}` : ''}</small></div></td><td>${adminEscape(g.count)}</td><td>${adminFormatDate(g.last)}</td><td>${g.pages.map(adminEscape).join('<br>') || '—'}</td><td>${g.devices.map(adminEscape).join('<br>')}</td></tr>`
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
    console.error('Admin overzicht laden mislukt', error);
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
        return `<tr><td>${adminEscape(a.name || '—')}</td><td>${adminEscape(a.email || '—')}${a.confirmed ? '' : ' <span class="admin-badge warn">niet bevestigd</span>'}</td><td>${adminEscape(a.organization || '—')}</td><td><span class="admin-badge ${adminEscape(a.type)}">${adminEscape(a.label)}</span>${until}</td><td>${adminEscape(a.recipes)}</td><td>${adminEscape(a.ai_this_month)}</td><td>${adminFormatDate(a.created_at)}</td><td>${adminFormatDate(a.last_sign_in_at)}</td><td><div class="admin-actions">${confirm}${action}${remove}</div></td></tr>`;
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
      `Account definitief verwijderen?\n\n${a.email}${a.name ? ` (${a.name})` : ''}\n\nAlle ${a.recipes} recepten, mappen, favorieten en gedeelde mappen van dit account worden verwijderd. Dit kan niet ongedaan worden gemaakt.`,
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
function savourVisitSourceQuery() {
  const q = new URLSearchParams(location.search);
  const out = [];
  for (const k of ['bron', 'utm_source', 'utm_medium', 'utm_campaign']) {
    const v = (q.get(k) || '').trim().slice(0, 40);
    if (v) out.push(`${k}=${encodeURIComponent(v)}`);
  }
  for (const k of ['collega', 'gclid', 'fbclid']) if (q.has(k)) out.push(k);
  return out.length ? `?${out.join('&')}` : '';
}

async function logSavourVisit() {
  // Alleen echte bezoeken aan savour.page; de testversie en lokaal testen tellen niet mee.
  if (IS_ADMIN_PATH || !/(^|\.)savour\.page$/.test(location.hostname)) return;
  try {
    const key = 'savour_visit_id';
    let vid = localStorage.getItem(key);
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem(key, vid);
    }
    const visit = {
      visitor_id: vid,
      path: (window.location.pathname || '/') + savourVisitSourceQuery(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      platform: savourAnalyticsPlatform()
    };
    const { error } = await supabaseClient.from('site_visits').insert(visit);
    // Zonder de kolom platform (supabase/2026-10-23-bezoekers-platform.sql nog niet uitgevoerd) weigert de
    // database het hele bezoek; dan zonder platform opslaan zodat de teller toch loopt.
    if (error && /platform/.test(error.message || '')) {
      delete visit.platform;
      await supabaseClient.from('site_visits').insert(visit);
    }
  } catch (e) {
    console.debug('Savour analytics unavailable', e);
  }
}
