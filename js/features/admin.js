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

async function adminIsAllowed() {
  const { data, error } = await supabaseClient.rpc('is_savour_admin');
  return !error && data === true;
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

async function adminShowDashboard(user) {
  adminSetVisible('adminLoginView', false);
  adminSetVisible('adminDashboardView', true);
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

async function loadAdminDashboard() {
  const refresh = $('adminRefreshBtn');
  if (refresh) {
    refresh.disabled = true;
    refresh.textContent = '↻ Verversen…';
  }
  try {
    const { data, error } = await supabaseClient.rpc('get_savour_admin_dashboard');
    if (error) throw error;
    const d = data || {};
    const s = $('adminStats');
    if (s)
      s.innerHTML = [
        ['Unieke bezoekers all time', d.visitors_all_time || 0, 'unieke bezoekers'],
        ['Bezoekers vandaag', d.visits_today || 0, 'unieke bezoekers'],
        ['Bezoekers deze maand', d.visits_month || 0, 'unieke bezoekers'],
        ['Accounts', d.accounts || 0, 'geregistreerde gebruikers'],
        ['App gebruikers', d.app_users || 0, 'unieke native app-gebruikers'],
        ['Recepten', d.recipes || 0, 'persoonlijke recepten'],
        ['Receptenmappen', d.folders || 0, 'persoonlijke mappen'],
        ['Gedeelde mappen', d.shared_maps || 0, 'gedeelde mappen'],
        ['Bezoekers geregistreerd', d.visit_events || 0, 'bezoekevents']
      ]
        .map(
          x =>
            `<div class="admin-stat"><div class="label">${adminEscape(x[0])}</div><div class="value">${adminEscape(x[1])}</div><div class="sub">${adminEscape(x[2])}</div></div>`
        )
        .join('');
    const t = $('adminTraffic');
    if (t)
      t.innerHTML = [
        ['Vandaag', d.visits_today || 0],
        ['Deze week', d.visits_week || 0],
        ['Deze maand', d.visits_month || 0],
        ['All time', d.visitors_all_time || 0]
      ]
        .map(x => `<div class="traffic-box"><b>${adminEscape(x[1])}</b><span>${adminEscape(x[0])}</span></div>`)
        .join('');
    const pf = $('adminPlatformUsage');
    if (pf)
      pf.innerHTML = [
        ['Desktop', d.platform_desktop || 0],
        ['Mobiel web', d.platform_mobile || 0],
        ['Native app', d.platform_app || 0]
      ]
        .map(x => `<div class="traffic-box"><b>${adminEscape(x[1])}</b><span>${adminEscape(x[0])}</span></div>`)
        .join('');
    renderAdminVisitorChart(d.visitor_growth || []);
    const body = $('adminAccountsBody');
    const accounts = d.accounts_list || [];
    if ($('adminAccountCount')) $('adminAccountCount').textContent = `${accounts.length} zichtbaar`;
    if (body)
      body.innerHTML =
        accounts
          .map(
            a =>
              `<tr><td>${adminEscape(a.name || '—')}</td><td>${adminEscape(a.email || '—')}</td><td>${adminFormatDate(a.created_at)}</td><td>${adminFormatDate(a.last_sign_in_at)}</td></tr>`
          )
          .join('') || '<tr><td colspan="4">Nog geen accounts.</td></tr>';
    const vb = $('adminVisitsBody');
    const visits = d.recent_visits || [];
    if (vb)
      vb.innerHTML =
        visits
          .map(
            v =>
              `<tr><td>${adminFormatDate(v.visited_at)}</td><td>${adminEscape(v.path || '/')}</td><td>${adminEscape(v.platform === 'native_app' ? 'Native app' : v.platform === 'mobile_web' ? 'Mobiel web' : 'Desktop web')}</td><td>${adminEscape(adminDevice(v.user_agent))}</td><td>${adminEscape(v.referrer || 'Direct')}</td></tr>`
          )
          .join('') || '<tr><td colspan="5">Nog geen bezoekers geregistreerd.</td></tr>';
  } catch (error) {
    console.error('Admin dashboard laden mislukt', error);
    const s = $('adminStats');
    if (s)
      s.innerHTML =
        '<div class="admin-stat"><div class="label">Status</div><div class="value">Fout</div><div class="sub">Controleer de v52.2 Supabase SQL.</div></div>';
    if ($('adminVisitorChart')) $('adminVisitorChart').innerHTML = '';
  } finally {
    if (refresh) {
      refresh.disabled = false;
      refresh.textContent = '↻ Vernieuwen';
    }
  }
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

async function logSavourVisit() {
  if (IS_ADMIN_PATH) return;
  try {
    const key = 'savour_visit_id';
    let vid = localStorage.getItem(key);
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem(key, vid);
    }
    await supabaseClient.from('site_visits').insert({
      visitor_id: vid,
      path: window.location.pathname || '/',
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      platform: savourAnalyticsPlatform()
    });
  } catch (e) {
    console.debug('Savour analytics unavailable', e);
  }
}
