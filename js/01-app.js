const SUPABASE_URL = 'https://qmzfqfmpylkgcnxsedse.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
});

const IS_ADMIN_PATH = window.location.pathname.replace(/\/+$/, '') === '/admin';
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
function adminFormatShort(v) {
  if (!v) return '';
  try {
    return new Intl.DateTimeFormat('nl-NL', { day: '2-digit', month: '2-digit' }).format(new Date(v));
  } catch {
    return '';
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
if (IS_ADMIN_PATH) {
  setTimeout(async () => {
    adminRenderLogin();
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();
    if (session && sessionStorage.getItem('savour_admin_session') === '1' && (await adminIsAllowed()))
      adminShowDashboard(session.user);
  }, 0);
} else {
  /* Analytics disabled until the site_visits schema is verified. */
}

let currentUser = null;
let sessionStartPromise = null;
let authMode = 'login';
const DATA = {
  recipes: [],
  folders: ['A t/m Z', 'Garde', 'Patisserie', 'Rotisserie', 'Entremetier', 'Sauzen', 'Eigen mappen']
};
let recipes = DATA.recipes.map(r => ({ ...r }));
let folders = [];
let favorites = [];
let sharedMaps = [];
let activeCat = '';
let categories = ['Sauzen & componenten', 'Groenten & garnituren', 'Vis & zeevruchten', 'Vlees', 'Patisserie'];
let account = { name: 'Chef-kok', role: 'Chef-kok', email: '', password: '', photo: '' };
let cropTarget = null,
  cropImageSrc = '',
  cropZoom = 1,
  cropX = 0,
  cropY = 0,
  cropStartX = 0,
  cropStartY = 0,
  cropBaseX = 0,
  cropBaseY = 0,
  dragging = false;
let currentId = null;
let currentFolder = null;
let currentShared = null;
let recipeReturnView = 'recipes';
let recipeReturnShared = null;
let recipeReturnFolder = null;
let folderTargetRecipe = null;
let activeFolderCategory = '';
let importSource = '';
let importFileData = null;
function $(id) {
  return document.getElementById(id);
}
async function ensureProfile(user) {
  if (!user) return;
  currentUser = user;
  const meta = user.user_metadata || {};
  const { data: profile } = await supabaseClient.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (!profile) {
    const name = (meta.name || '').trim() || '';
    const { error } = await supabaseClient
      .from('profiles')
      .insert({ id: user.id, email: user.email || '', name, function_title: meta.function_title || 'Chef-kok' });
    if (error) console.error('Profiel kon niet worden aangemaakt:', error);
  }
  // Nieuwe accounts starten leeg. A–Z is een filterfunctie, geen fysieke map.
  // Bestaande oude A t/m Z-mappen blijven in de database staan maar worden in de UI verborgen.
}

// Recepten worden nooit automatisch naar een nieuw account gekopieerd.
// De centrale bibliotheek blijft volledig persoonlijk per Supabase user_id.
async function bootstrapRecipes() {
  return false;
}

async function migrateLegacySharedMaps() {
  if (!currentUser) return;
  let legacy = [];
  try {
    legacy = JSON.parse(localStorage.getItem('receptenapp_sharedmaps') || '[]');
  } catch (e) {
    legacy = [];
  }
  if (!Array.isArray(legacy) || !legacy.length) return;
  const { data: existing } = await supabaseClient.from('shared_maps').select('id,name').eq('owner_id', currentUser.id);
  const existingNames = new Set((existing || []).map(x => x.name));
  const { data: dbRecipes } = await supabaseClient.from('recipes').select('id,title').eq('user_id', currentUser.id);
  const byTitle = new Map((dbRecipes || []).map(r => [r.title.toLowerCase(), r.id]));
  for (const lm of legacy) {
    if (!lm?.name || existingNames.has(lm.name)) continue;
    const { data: m, error } = await supabaseClient
      .from('shared_maps')
      .insert({ owner_id: currentUser.id, name: lm.name, photo_url: lm.photo || null })
      .select('id')
      .single();
    if (error || !m) continue;
    await supabaseClient
      .from('shared_map_members')
      .insert({ shared_map_id: m.id, user_id: currentUser.id, role: 'owner' });
    const oldIds = Array.isArray(lm.recipeIds) ? lm.recipeIds : [];
    const mapped = [];
    for (const oldId of oldIds) {
      const oldRecipe = ((typeof DATA !== 'undefined' && DATA.recipes) || []).find(r => r.id === oldId);
      const rid = oldRecipe
        ? byTitle.get(String(oldRecipe.title || '').toLowerCase())
        : byTitle.get(String(oldId).toLowerCase());
      if (rid) mapped.push(rid);
    }
    if (mapped.length)
      await supabaseClient.from('shared_map_recipes').upsert(
        mapped.map(recipe_id => ({ shared_map_id: m.id, recipe_id })),
        { onConflict: 'shared_map_id,recipe_id' }
      );
    for (const lf of lm.folders || []) {
      if (!lf?.name || (lf.system && lf.name === 'A t/m Z')) continue;
      const { data: sf } = await supabaseClient
        .from('shared_folders')
        .insert({ shared_map_id: m.id, name: lf.name })
        .select('id')
        .single();
      if (!sf) continue;
      const ids = (lf.recipeIds || [])
        .map(oldId => {
          const oldRecipe = ((typeof DATA !== 'undefined' && DATA.recipes) || []).find(r => r.id === oldId);
          return oldRecipe ? byTitle.get(String(oldRecipe.title || '').toLowerCase()) : null;
        })
        .filter(Boolean);
      if (ids.length)
        await supabaseClient.from('shared_folder_recipes').upsert(
          ids.map(recipe_id => ({ shared_folder_id: sf.id, recipe_id })),
          { onConflict: 'shared_folder_id,recipe_id' }
        );
    }
    existingNames.add(lm.name);
  }
  localStorage.removeItem('receptenapp_sharedmaps');
}

async function selectAllRows(table, select = '*', build = q => q, pageSize = 1000) {
  let all = [];
  for (let offset = 0; ; offset += pageSize) {
    let q = supabaseClient.from(table).select(select);
    q = build(q);
    const { data, error } = await q.range(offset, offset + pageSize - 1);
    if (error) return { data: all, error };
    const rows = data || [];
    all.push(...rows);
    if (rows.length < pageSize) break;
  }
  return { data: all, error: null };
}
async function loadDatabaseState() {
  if (!currentUser) throw new Error('Geen ingelogde gebruiker');
  const [recipesRes, categoriesRes, foldersRes, folderRecipesRes, favoritesRes, profileRes] = await Promise.all([
    selectAllRows('recipes', 'id,title,description,yield_text,ingredients,steps,photo_url,category_id,created_at', q =>
      q.eq('user_id', currentUser.id).order('title', { ascending: true })
    ),
    selectAllRows('categories', 'id,name', q => q.eq('user_id', currentUser.id).order('name')),
    selectAllRows('folders', 'id,name', q => q.eq('user_id', currentUser.id).order('name')),
    selectAllRows('folder_recipes', 'folder_id,recipe_id'),
    selectAllRows('favorites', 'recipe_id', q => q.eq('user_id', currentUser.id)),
    supabaseClient.from('profiles').select('*').eq('id', currentUser.id).maybeSingle()
  ]);
  const coreErr =
    recipesRes.error ||
    categoriesRes.error ||
    foldersRes.error ||
    folderRecipesRes.error ||
    favoritesRes.error ||
    profileRes.error;
  if (coreErr) {
    console.error('Savour core database load error:', coreErr);
    throw coreErr;
  }
  const rs = recipesRes.data || [],
    cs = categoriesRes.data || [],
    fs = foldersRes.data || [],
    fr = folderRecipesRes.data || [],
    favs = favoritesRes.data || [],
    prof = profileRes.data;
  categories = cs.map(c => c.name);
  const catMap = Object.fromEntries(cs.map(c => [c.id, c.name]));
  recipes = rs.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description || '',
    yield: r.yield_text || '',
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    steps: Array.isArray(r.steps) ? r.steps : [],
    category: catMap[r.category_id] || 'Eigen recepten',
    categoryId: r.category_id || null,
    photo: r.photo_url || '',
    dbId: r.id
  }));
  const seenFolderNames = new Set();
  folders = fs
    .filter(f => f.name !== 'A t/m Z')
    .filter(f => {
      if (seenFolderNames.has(f.name)) return false;
      seenFolderNames.add(f.name);
      return true;
    })
    .map(f => ({
      id: f.id,
      name: f.name,
      recipeIds: fr.filter(x => x.folder_id === f.id && recipes.some(r => r.id === x.recipe_id)).map(x => x.recipe_id),
      system: false
    }));
  favorites = favs.map(x => x.recipe_id);
  if (prof) {
    account = {
      ...account,
      name: prof.name || '',
      role: prof.function_title || 'Chef-kok',
      email: prof.email || currentUser.email || '',
      photo: prof.avatar_url || ''
    };
    if (prof.theme) localStorage.setItem('savour_theme', prof.theme);
    applyTheme('dark');
  }
  try {
    const [smsRes, smrRes, smfRes, smfrRes, smmRes] = await Promise.all([
      selectAllRows('shared_maps', 'id,owner_id,name,photo_url,public_key,created_at', q => q.order('name')),
      selectAllRows('shared_map_recipes', 'shared_map_id,recipe_id'),
      selectAllRows('shared_folders', 'id,shared_map_id,name'),
      selectAllRows('shared_folder_recipes', 'shared_folder_id,recipe_id'),
      selectAllRows('shared_map_members', 'shared_map_id,user_id,role')
    ]);
    const optionalErr = smsRes.error || smrRes.error || smfRes.error || smfrRes.error || smmRes.error;
    if (optionalErr) {
      console.error('Savour shared-map load warning:', optionalErr);
      const ownedFallback = (smsRes.data || []).filter(m => m.owner_id === currentUser.id);
      sharedMaps = ownedFallback.map(m => ({
        id: m.id,
        name: m.name,
        recipeIds: [],
        folders: [],
        photo: m.photo_url || '',
        members: [
          { name: 'Jij', email: currentUser.email || '', role: 'owner', account: true, userId: currentUser.id }
        ],
        publicKey: m.public_key,
        ownerId: m.owner_id
      }));
      toast(t('Gedeelde mappen konden gedeeltelijk niet worden geladen.'));
    } else {
      const sms = smsRes.data || [],
        smr = smrRes.data || [],
        smf = smfRes.data || [],
        smfr = smfrRes.data || [],
        memberRows = smmRes.data || [];
      const ownedMaps = sms.filter(m => m.owner_id === currentUser.id);
      let memberRowsFresh = memberRows;
      const missingOwnerMemberships = ownedMaps.filter(
        map => !memberRows.some(x => x.shared_map_id === map.id && x.user_id === currentUser.id)
      );
      if (missingOwnerMemberships.length) {
        for (const map of missingOwnerMemberships) {
          const { error } = await supabaseClient
            .from('shared_map_members')
            .upsert(
              { shared_map_id: map.id, user_id: currentUser.id, role: 'owner' },
              { onConflict: 'shared_map_id,user_id' }
            );
          if (error) console.warn('Owner membership kon niet automatisch worden hersteld:', error);
        }
        const fresh = await selectAllRows('shared_map_members', 'shared_map_id,user_id,role');
        if (fresh.data) memberRowsFresh = fresh.data;
      }
      sharedMaps = sms
        .filter(
          m =>
            m.owner_id === currentUser.id ||
            memberRowsFresh.some(x => x.shared_map_id === m.id && x.user_id === currentUser.id)
        )
        .map(m => {
          const memberList = memberRowsFresh
            .filter(x => x.shared_map_id === m.id)
            .map(x => ({
              name: x.user_id === currentUser.id ? 'Jij' : 'Teamlid',
              email: '',
              role: x.role,
              account: true,
              userId: x.user_id
            }));
          if (!memberList.some(x => x.userId === currentUser.id))
            memberList.unshift({
              name: 'Jij',
              email: currentUser.email || '',
              role: 'owner',
              account: true,
              userId: currentUser.id
            });
          const mapRecipeIds = smr.filter(x => x.shared_map_id === m.id).map(x => x.recipe_id);
          const sf = smf
            .filter(x => x.shared_map_id === m.id && x.name !== 'A t/m Z')
            .map(f => ({
              id: f.id,
              name: f.name,
              recipeIds: smfr.filter(x => x.shared_folder_id === f.id).map(x => x.recipe_id),
              system: false
            }));
          return {
            id: m.id,
            name: m.name,
            recipeIds: mapRecipeIds,
            folders: sf,
            photo: m.photo_url || '',
            members: memberList,
            publicKey: m.public_key,
            ownerId: m.owner_id
          };
        });
    }
  } catch (e) {
    console.error('Savour shared-map load warning:', e);
    sharedMaps = [];
  }
  renderCategoryNav();
  renderSharedNav();
  return true;
}

window.showDatabaseError = function showDatabaseError(error) {
  console.error('Savour database error:', error);
  try {
    if ($('landingView')) $('landingView').style.display = 'none';
    if ($('publicInfoShell')) $('publicInfoShell').style.display = 'none';
    if ($('publicRecipeShell')) $('publicRecipeShell').style.display = 'none';
    if ($('publicInviteShell')) $('publicInviteShell').style.display = 'none';
    if ($('appShell')) $('appShell').style.display = 'grid';
    if ($('appShell')) $('appShell').classList.remove('public-info-mode');
    activateView('home');
    if ($('homeCards')) {
      $('homeCards').innerHTML =
        `<div class=\"empty\" style=\"grid-column:1/-1\"><strong>Je bent ingelogd, maar je recepten konden niet worden geladen.</strong><br><span class=\"muted\">Controleer de verbinding met je receptenbibliotheek en probeer het opnieuw.</span><br><button class=\"btn\" style=\"margin-top:14px\" onclick=\"retryDatabaseSession()\">Opnieuw proberen</button></div>`;
    }
  } catch (uiError) {
    console.error('Savour database error UI failed:', uiError);
  }
};

function loadState() {
  try {
    folders =
      JSON.parse(localStorage.getItem('receptenapp_folders') || 'null') ||
      DATA.folders.map((name, i) => ({ id: 'f' + i, name, recipeIds: [], system: name === 'A t/m Z' }));
  } catch (e) {
    folders = [];
  }
  try {
    favorites = JSON.parse(localStorage.getItem('receptenapp_favorites') || '[]');
  } catch (e) {
    favorites = [];
  }
  try {
    sharedMaps = JSON.parse(localStorage.getItem('receptenapp_sharedmaps') || '[]');
  } catch (e) {
    sharedMaps = [];
  }
  try {
    let c = JSON.parse(localStorage.getItem('receptenapp_categories') || 'null');
    if (Array.isArray(c) && c.length) categories = [...new Set([...categories, ...c])];
  } catch (e) {}
  try {
    let a = JSON.parse(localStorage.getItem('receptenapp_account') || 'null');
    if (a && typeof a === 'object') account = { ...account, ...a };
  } catch (e) {}
  try {
    let saved = JSON.parse(localStorage.getItem('receptenapp_custom_recipes') || '[]');
    if (Array.isArray(saved)) {
      for (const r of saved) {
        if (!recipes.some(x => x.id === r.id)) recipes.unshift(r);
      }
    }
  } catch (e) {}
  sharedMaps.forEach(m => {
    if (!Array.isArray(m.members)) m.members = [];
    if (!Array.isArray(m.recipeIds)) m.recipeIds = [];
    if (!Array.isArray(m.folders)) {
      m.folders = [{ id: 'sf-' + m.id + '-az', name: 'A t/m Z', recipeIds: [], system: true }];
    }
  });
}
function persist() {
  localStorage.setItem('receptenapp_categories', JSON.stringify(categories));
  localStorage.setItem('receptenapp_account', JSON.stringify(account));
  localStorage.setItem('receptenapp_folders', JSON.stringify(folders));
  localStorage.setItem('receptenapp_favorites', JSON.stringify(favorites));
  localStorage.setItem('receptenapp_sharedmaps', JSON.stringify(sharedMaps));
  localStorage.setItem('receptenapp_custom_recipes', JSON.stringify(recipes.filter(r => r.id.startsWith('custom-'))));
}
/* removed duplicate earlier implementation: go */
function card(r, context = 'library') {
  let isFav = favorites.includes(r.id);
  let action =
    context === 'library'
      ? `<button class="btn small delete-recipe" onclick="event.stopPropagation();deleteRecipe('${r.id}')">Verwijderen uit bibliotheek</button>`
      : context === 'favorite'
        ? `<button class="btn small" onclick="event.stopPropagation();toggleFavorite('${r.id}')">Verwijderen uit favorieten</button>`
        : context === 'folder'
          ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromFolder('${r.id}')">Uit map verwijderen</button>`
          : context === 'shared'
            ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromShared('${r.id}')">Uit gedeelde map verwijderen</button>`
            : context === 'sharedFolder'
              ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromSharedFolder('${r.id}')">Uit map verwijderen</button>`
              : '';
  return `<article class="card" onclick="openRecipe('${r.id}','${context}')"><div class="card-body"><div class="cat">${esc(r.category || 'Eigen recepten')}</div><div class="row"><h3>${esc(r.title)}</h3><button class="fav" title="${isFav ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}" onclick="event.stopPropagation();toggleFavorite('${r.id}')">${isFav ? '★' : '☆'}</button></div>${r.yield ? `<div class="yield">${esc(r.yield)}</div>` : ''}<div class="mini" style="margin-top:9px">${r.ingredients.length} ingrediënten · ${r.steps.length} bereidingsstappen</div><div style="display:flex;justify-content:flex-end;margin-top:12px">${action}</div></div></article>`;
}
function openMobileSearch() {
  const g = $('globalSearch'),
    input = $('mobileRecipeSearch');
  if (g && input) input.value = g.value;
  go('recipes');
  setTimeout(() => {
    const el = $('mobileRecipeSearch');
    if (el) {
      el.focus();
      el.select();
    }
  }, 80);
}
function syncMobileSearch(v) {
  const g = $('globalSearch'),
    m = $('mobileRecipeSearch');
  if (g) g.value = v;
  if (m) m.value = v;
  activeCat = '';
  activeFolderCategory = '';
  if (v.trim()) {
    go('recipes');
    renderRecipes();
  } else if ($('recipes').classList.contains('active')) renderRecipes();
}
/* removed duplicate earlier implementation: syncRecipeSearch */
function openFirstSharedOrNew() {
  openSharedChooser();
}
function openSharedChooser() {
  if (!sharedMaps.length) {
    newSharedMap();
    return;
  }
  const list = $('sharedChooserList');
  list.innerHTML = sharedMaps
    .map(
      m =>
        `<button class="shared-chooser-item" onclick="closeSharedChooser();openShared('${m.id}')"><span class="chooser-ico">▱</span><span><b>${esc(m.name)}</b><small>${m.recipeIds.length} recepten · ${m.folders.length} mappen</small></span><strong>›</strong></button>`
    )
    .join('');
  $('sharedChooserModal').classList.add('open');
}
function closeSharedChooser() {
  $('sharedChooserModal').classList.remove('open');
}
/* removed duplicate earlier implementation: renderHome */
function folderCount(f) {
  return f.recipeIds.filter(id => recipes.some(r => r.id === id)).length;
}
function folderCard(f) {
  return `<div class="folder" onclick="openFolder('${f.id}')"><span class="ico">▱</span><b>${esc(f.name)}</b><small>${folderCount(f)} recepten${f.system ? ' · alfabetisch' : ''}</small>${f.system ? '' : `<div class="folder-actions"><button class="btn small rename-folder" onclick="event.stopPropagation();renameFolder('${f.id}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="event.stopPropagation();deleteFolder('${f.id}')">Map verwijderen</button></div>`}</div>`;
}
function categorySelectionKey() {
  return `receptenapp_category_folders_${currentUser?.id || 'local'}`;
}
function getCategorySettings() {
  const ids = folders.map(f => String(f.id));
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(categorySelectionKey()) || 'null');
  } catch (e) {}
  if (!saved) return { selected: ids.slice(), order: ids.slice() };
  // Older v33/v34 data was stored as a plain array. Convert it once so
  // deselection and custom ordering can be remembered independently.
  if (Array.isArray(saved)) {
    const selected = saved.map(String).filter(id => ids.includes(id));
    const known = new Set(selected);
    return { selected: selected.slice(), order: [...selected, ...ids.filter(id => !known.has(id))] };
  }
  const valid = new Set(ids);
  const order = Array.isArray(saved.order) ? saved.order.map(String).filter(id => valid.has(id)) : [];
  const orderSet = new Set(order);
  ids.forEach(id => {
    if (!orderSet.has(id)) order.push(id);
  });
  const selected = Array.isArray(saved.selected) ? saved.selected.map(String).filter(id => valid.has(id)) : ids.slice();
  const known = new Set(Array.isArray(saved.known) ? saved.known.map(String) : []);
  // Newly created folders are selected by default.
  ids.forEach(id => {
    if (!known.has(id) && !selected.includes(id)) selected.push(id);
  });
  return { selected: [...new Set(selected)], order };
}
function getSelectedCategoryFolders() {
  return getCategorySettings().selected;
}
function saveCategorySettings(selected, order) {
  const ids = folders.map(f => String(f.id));
  const valid = new Set(ids);
  const cleanOrder = [...new Set((order || ids).map(String).filter(id => valid.has(id)))];
  ids.forEach(id => {
    if (!cleanOrder.includes(id)) cleanOrder.push(id);
  });
  const cleanSelected = [...new Set((selected || []).map(String).filter(id => valid.has(id)))];
  localStorage.setItem(
    categorySelectionKey(),
    JSON.stringify({ selected: cleanSelected, order: cleanOrder, known: ids })
  );
}
function saveSelectedCategoryFolders(ids) {
  const settings = getCategorySettings();
  saveCategorySettings(ids, settings.order);
}
/* removed duplicate earlier implementation: renderCategoryNav */
/* removed duplicate earlier implementation: renderCategories */
function categorySelectionChanged() {
  // Selection is saved only when the user presses Opslaan; this keeps the page predictable.
}
function selectAllCategoryFolders() {
  document.querySelectorAll('[data-category-folder-check]').forEach(x => (x.checked = true));
}
function clearCategoryFolders() {
  document.querySelectorAll('[data-category-folder-check]').forEach(x => (x.checked = false));
}
let categoryDragId = '';
function categoryDragStart(e, id) {
  categoryDragId = String(id);
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', categoryDragId);
  e.currentTarget.classList.add('dragging');
}
function categoryDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function categoryDrop(e, targetId) {
  e.preventDefault();
  const sourceId = categoryDragId || e.dataTransfer.getData('text/plain');
  if (!sourceId || String(sourceId) === String(targetId)) return;
  const settings = getCategorySettings();
  const order = settings.order.slice();
  const from = order.indexOf(String(sourceId)),
    to = order.indexOf(String(targetId));
  if (from < 0 || to < 0) return;
  order.splice(from, 1);
  order.splice(to, 0, String(sourceId));
  saveCategorySettings(settings.selected, order);
  renderCategories();
  renderCategoryNav();
  toast('Volgorde aangepast');
  categoryDragId = '';
}
function saveCategoryFolders() {
  const ids = [...document.querySelectorAll('[data-category-folder-check]:checked')].map(
    x => x.dataset.categoryFolderCheck
  );
  const settings = getCategorySettings();
  saveCategorySettings(ids, settings.order);
  renderCategoryNav();
  toast('Recepten mappen opgeslagen');
  go('home');
}
function filterFolderCategory(id) {
  openFolder(String(id));
}
/* removed duplicate earlier implementation: renderRecipes */
/* removed duplicate earlier implementation: filterCat */
/* removed duplicate earlier implementation: renderCategoryBar */
/* removed duplicate earlier implementation: renderSettings */
function applyTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.savourTheme = value;
  document.body.classList.toggle('savour-light', !!currentUser && value === 'light');
  localStorage.setItem('savour_theme', value);
}
async function setTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  applyTheme(value);
  if (currentUser) {
    const { error } = await supabaseClient.from('profiles').update({ theme: value }).eq('id', currentUser.id);
    if (error) console.error('Thema opslaan mislukt:', error);
  }
}
async function saveAccount() {
  if (!currentUser) return;
  const name = $('accountName').value.trim() || 'Chef-kok';
  const role = $('accountRole').value.trim() || 'Chef-kok';
  const email = $('accountEmail').value.trim();
  if (!email) {
    toast(t('Vul een geldig e-mailadres in'));
    return;
  }
  if (email !== currentUser.email) {
    const { data: authData, error: ae } = await supabaseClient.auth.updateUser({ email });
    if (ae) {
      console.error(ae);
      toast(ae.message || t('E-mailadres kon niet worden gewijzigd'));
      return;
    }
    const activeAuthEmail = authData?.user?.email || currentUser.email;
    if (activeAuthEmail !== email) {
      toast(t('Controleer je nieuwe e-mailadres om de wijziging te bevestigen'));
      return;
    }
    currentUser = authData.user;
  }
  const theme = localStorage.getItem('savour_theme') || 'dark';
  const { error } = await supabaseClient
    .from('profiles')
    .update({ name, function_title: role, email: currentUser.email, theme })
    .eq('id', currentUser.id);
  if (error) {
    console.error(error);
    toast(t('Account kon niet worden opgeslagen'));
    return;
  }
  account = { ...account, name, role, email: currentUser.email };
  updateProfileHeader();
  renderSettings();
  toast(t('Account opgeslagen'));
}
async function changePassword() {
  if (!currentUser) return;
  const value = $('accountPassword').value.trim();
  if (!value) {
    toast(t('Vul eerst een nieuw wachtwoord in'));
    return;
  }
  if (value.length < 6) {
    toast(t('Een wachtwoord moet minimaal 6 tekens bevatten'));
    return;
  }
  const { error } = await supabaseClient.auth.updateUser({ password: value });
  if (error) {
    console.error(error);
    toast(error.message || t('Wachtwoord kon niet worden gewijzigd'));
    return;
  }
  $('accountPassword').value = '';
  toast(t('Wachtwoord gewijzigd'));
}

function updateProfileHeader() {
  let a = document.querySelector('.profile .avatar');
  a.innerHTML = account.photo
    ? `<img src="${account.photo}" alt="Profielfoto">`
    : (account.name || 'M').charAt(0).toUpperCase();
  document.querySelector('.profile b').textContent = account.name || 'Mijn account';
  document.querySelector('.profile small').textContent = account.role || 'Mijn account';
}
function startProfilePhoto(input) {
  let f = input.files[0];
  if (!f) return;
  let reader = new FileReader();
  reader.onload = e => openCrop(e.target.result, 'profile');
  reader.readAsDataURL(f);
}

function openCrop(src, target = 'profile') {
  cropTarget = target;
  cropImageSrc = src;
  cropZoom = 1;
  cropX = 0;
  cropY = 0;
  const img = $('cropImage');
  if (!img) return;
  img.src = src;
  img.onload = () => {
    positionCropImage();
  };
  $('cropZoom').value = '1';
  $('cropModal').classList.add('open');
  positionCropImage();
}
function positionCropImage() {
  const img = $('cropImage'),
    stage = $('cropStage');
  if (!img || !stage) return;
  const sw = stage.clientWidth || 360,
    sh = stage.clientHeight || 360,
    iw = img.naturalWidth || sw,
    ih = img.naturalHeight || sh;
  const scale = Math.max(sw / iw, sh / ih) * cropZoom;
  img.style.width = `${iw * scale}px`;
  img.style.height = `${ih * scale}px`;
  img.style.left = `${(sw - iw * scale) / 2 + cropX}px`;
  img.style.top = `${(sh - ih * scale) / 2 + cropY}px`;
}
function closeCrop() {
  cropTarget = null;
  cropImageSrc = '';
  $('cropModal')?.classList.remove('open');
}
$('cropZoom')?.addEventListener('input', e => {
  cropZoom = Number(e.target.value) || 1;
  positionCropImage();
});
$('cropStage')?.addEventListener('pointerdown', e => {
  const stage = $('cropStage');
  if (!stage || !cropImageSrc) return;
  dragging = true;
  cropStartX = e.clientX;
  cropStartY = e.clientY;
  cropBaseX = cropX;
  cropBaseY = cropY;
  stage.setPointerCapture?.(e.pointerId);
  $('cropImage')?.classList.add('dragging');
});
$('cropStage')?.addEventListener('pointermove', e => {
  if (!dragging) return;
  cropX = cropBaseX + (e.clientX - cropStartX);
  cropY = cropBaseY + (e.clientY - cropStartY);
  positionCropImage();
});
$('cropStage')?.addEventListener('pointerup', () => {
  dragging = false;
  $('cropImage')?.classList.remove('dragging');
});
$('cropStage')?.addEventListener('pointercancel', () => {
  dragging = false;
  $('cropImage')?.classList.remove('dragging');
});
async function saveCrop() {
  if (!cropTarget || !cropImageSrc) return;
  const img = $('cropImage'),
    stage = $('cropStage');
  if (!img || !stage) return;
  const canvas = document.createElement('canvas');
  const size = 320;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const sw = stage.clientWidth,
    sh = stage.clientHeight,
    iw = img.naturalWidth,
    ih = img.naturalHeight,
    scale = Math.max(sw / iw, sh / ih) * cropZoom;
  const left = (sw - iw * scale) / 2 + cropX,
    top = (sh - ih * scale) / 2 + cropY;
  const sx = Math.max(0, -left) / scale,
    sy = Math.max(0, -top) / scale,
    sSize = Math.min(iw - sx, ih - sy, sw / scale, sh / scale);
  ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, size, size);
  const data = canvas.toDataURL('image/jpeg', 0.88);
  if (cropTarget === 'profile' && currentUser) {
    const { error } = await supabaseClient.from('profiles').update({ avatar_url: data }).eq('id', currentUser.id);
    if (error) {
      console.error(error);
      toast(error.message || t('Profielfoto kon niet worden opgeslagen'));
      return;
    }
    account.photo = data;
    updateProfileHeader();
    renderSettings();
    toast(t('Profielfoto opgeslagen'));
  }
  closeCrop();
}

/* removed duplicate earlier implementation: searchAll */
function renderFavorites() {
  if (!currentUser) return;
  let list = favorites.map(id => recipes.find(r => r.id === id)).filter(Boolean);
  $('favoriteCount').textContent = `${list.length} favorieten`;
  $('favoriteGrid').innerHTML = list.length
    ? list.map(r => card(r, 'favorite')).join('')
    : `<div class="empty">Je hebt nog geen favorieten. Klik op ☆ bij een recept om het toe te voegen.</div>`;
}
/* removed duplicate earlier implementation: renderFolders */
function openFolder(id) {
  currentFolder = id;
  window.personalAlphabetLetter = '';
  go('folderDetail');
}
/* removed duplicate earlier implementation: renderFolderDetail */
function filterPersonalAlphabet(letter) {
  window.personalAlphabetLetter = letter || '';
  renderFolderDetail();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function newFolder() {
  $('newFolderName').value = '';
  $('newFolderModal').classList.add('open');
  setTimeout(() => $('newFolderName')?.focus(), 30);
}
function closeNewFolder() {
  $('newFolderModal').classList.remove('open');
}
function addRecipeToFolderFromFolder(id) {
  openRecipePickerForFolder(id);
}
function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''));
}
async function resolvePersonalFolder(id) {
  if (!currentUser) return null;
  let local = folders.find(x => String(x.id) === String(id));
  if (!local || local.system) return null;
  // Legacy/local folder IDs may not be UUIDs. Never send such an ID to a UUID column.
  if (isUuid(local.id)) {
    const { data, error } = await supabaseClient
      .from('folders')
      .select('id,name')
      .eq('id', local.id)
      .eq('user_id', currentUser.id)
      .maybeSingle();
    if (error) {
      console.error(error);
      return null;
    }
    if (data) return data;
  }
  // Recover the real database folder by its name when the local ID is stale/invalid.
  const { data, error } = await supabaseClient
    .from('folders')
    .select('id,name')
    .eq('user_id', currentUser.id)
    .eq('name', local.name)
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return data || null;
}
async function openRecipePickerForFolder(id) {
  let f = folders.find(x => String(x.id) === String(id));
  if (!f || f.system) return;
  if (currentUser) {
    const dbFolder = await resolvePersonalFolder(id);
    if (!dbFolder) {
      toast('Deze receptenmap bestaat niet meer');
      await loadDatabaseState();
      renderFolders();
      return;
    }
    f = { ...f, id: dbFolder.id, name: dbFolder.name };
  }
  currentFolder = 'folderpick:' + String(f.id);
  folderTargetRecipe = null;
  $('folderModalTitle').textContent = 'Recepten aan ' + f.name + ' toevoegen';
  $('pickerSearch').value = '';
  filterPicker('');
  $('folderModal').classList.add('open');
}
function openFolderModal(recipeId) {
  if (!currentUser) return;
  folderTargetRecipe = recipeId || null;
  $('folderChecklist').innerHTML =
    folders
      .filter(f => !f.system)
      .map(
        f =>
          `<label class="check"><input type="checkbox" data-folder-check="${f.id}" ${folderTargetRecipe && f.recipeIds.includes(folderTargetRecipe) ? 'checked' : ''}> <span>${esc(f.name)}</span><span class="muted" style="margin-left:auto">${folderCount(f)} recepten</span></label>`
      )
      .join('') || `<div class="empty">Maak eerst een eigen map aan.</div>`;
  $('folderModal').classList.add('open');
}
async function saveFolderSelection() {
  if (folderTargetRecipe) {
    const ids = [...document.querySelectorAll('[data-folder-check]:checked')]
      .map(x => x.dataset.folderCheck)
      .filter(Boolean);
    for (const f of folders.filter(x => !x.system)) {
      const { error } = await supabaseClient
        .from('folder_recipes')
        .delete()
        .eq('folder_id', f.id)
        .eq('recipe_id', folderTargetRecipe);
      if (error) {
        console.error(error);
        toast(error.message || 'Mapindeling kon niet worden opgeslagen');
        return;
      }
    }
    for (const folderId of ids) {
      const { error } = await supabaseClient
        .from('folder_recipes')
        .upsert({ folder_id: folderId, recipe_id: folderTargetRecipe }, { onConflict: 'folder_id,recipe_id' });
      if (error) {
        console.error(error);
        toast(error.message || 'Recept kon niet aan de map worden toegevoegd');
        return;
      }
    }
    folderTargetRecipe = null;
    closeFolderModal();
    await loadDatabaseState();
    toast('Mapindeling opgeslagen');
    renderHome();
    return;
  }
  if (currentFolder && String(currentFolder).startsWith('folderpick:')) {
    const folderId = String(currentFolder).slice('folderpick:'.length);
    const ids = [
      ...new Set(
        [...document.querySelectorAll('[data-folder-recipe-check]:checked')]
          .map(x => x.dataset.folderRecipeCheck)
          .filter(Boolean)
      )
    ];
    if (!folderId) {
      toast('Deze receptenmap bestaat niet meer');
      return;
    }
    if (!ids.length) {
      toast('Selecteer minimaal één recept');
      return;
    }
    // The picker was opened from the current user's database folder list, so the
    // ID stored in currentFolder is already the real folder UUID. Do not perform
    // a second SELECT here: that check caused valid folders to be reported as
    // missing when RLS/session state was briefly out of sync.
    const folder = folders.find(x => String(x.id) === folderId && !x.system);
    if (!folder) {
      await loadDatabaseState();
      const refreshed = folders.find(x => String(x.id) === folderId && !x.system);
      if (!refreshed) {
        toast('Deze receptenmap bestaat niet meer');
        return;
      }
    }
    const realFolderId = folder?.id || folders.find(x => String(x.id) === folderId && !x.system)?.id;
    if (!realFolderId) {
      toast('Deze receptenmap bestaat niet meer');
      return;
    }
    for (const recipeId of ids) {
      const { error } = await supabaseClient
        .from('folder_recipes')
        .upsert({ folder_id: realFolderId, recipe_id: recipeId }, { onConflict: 'folder_id,recipe_id' });
      if (error) {
        console.error(error);
        toast(error.message || 'Recept kon niet aan de map worden toegevoegd');
        return;
      }
    }
    closeFolderModal();
    await loadDatabaseState();
    currentFolder = realFolderId;
    toast('Recepten toegevoegd aan map');
    renderFolderDetail();
    renderHome();
    return;
  }
  if (currentFolder && String(currentFolder).startsWith('sharedfolderpick:')) {
    await saveSharedFolderSelection();
    return;
  }
  if (currentFolder && String(currentFolder).startsWith('shared:')) {
    await saveSharedMapSelection();
    return;
  }
}
function closeFolderModal() {
  $('folderModal').classList.remove('open');
  if ($('pickerSearch')) $('pickerSearch').value = '';
}
async function removeRecipeFromFolder(id) {
  const f = folders.find(x => x.id === currentFolder);
  if (!f || f.system) return;
  if (!confirm('Recept uit deze map verwijderen? Het blijft beschikbaar in Alle recepten.')) return;
  const { error } = await supabaseClient.from('folder_recipes').delete().eq('folder_id', f.id).eq('recipe_id', id);
  if (error) {
    console.error(error);
    toast('Recept kon niet uit de map worden verwijderd');
    return;
  }
  await loadDatabaseState();
  renderFolderDetail();
  renderHome();
  toast('Recept uit map verwijderd');
}
async function removeRecipeFromShared(id) {
  const m = sharedMaps.find(x => x.id === currentShared);
  if (!m || !currentUser) return;
  if (!confirm('Recept uit deze gedeelde map verwijderen? Het blijft beschikbaar in Alle recepten.')) return;

  // Alleen de koppeling met deze gedeelde map verwijderen. Het recept zelf
  // wordt hier NOOIT uit public.recipes verwijderd.
  const { error } = await supabaseClient
    .from('shared_map_recipes')
    .delete()
    .eq('shared_map_id', m.id)
    .eq('recipe_id', id);
  if (error) {
    console.error(error);
    toast(error.message || 'Recept kon niet uit de gedeelde map worden verwijderd');
    return;
  }

  // Verwijder eventuele koppelingen met submappen binnen alleen deze map.
  const { data: mapFolders } = await supabaseClient.from('shared_folders').select('id').eq('shared_map_id', m.id);
  for (const f of mapFolders || []) {
    const { error: fe } = await supabaseClient
      .from('shared_folder_recipes')
      .delete()
      .eq('shared_folder_id', f.id)
      .eq('recipe_id', id);
    if (fe) {
      console.error(fe);
      toast(fe.message || 'Recept kon niet uit een gedeelde map worden verwijderd');
      return;
    }
  }

  // Extra veiligheidscontrole: het persoonlijke recept moet nog bestaan.
  const { data: stillThere, error: checkError } = await supabaseClient
    .from('recipes')
    .select('id')
    .eq('id', id)
    .eq('user_id', currentUser.id)
    .maybeSingle();
  if (checkError) {
    console.error(checkError);
    toast('Controle van het persoonlijke recept is mislukt');
    return;
  }
  if (!stillThere) {
    toast('WAARSCHUWING: het persoonlijke recept kon niet worden gevonden');
    await loadDatabaseState();
    renderRecipes();
    return;
  }

  await loadDatabaseState();
  renderShared(m.id);
  toast('Recept uit gedeelde map verwijderd; persoonlijke recept behouden');
}
async function removeRecipeFromSharedFolder(id) {
  const m = sharedMaps.find(x => x.id === currentShared);
  const f = m?.folders?.find(x => x.id === String(currentFolder).replace(/^sharedfolder:/, ''));
  if (!m || !f || f.system) return;
  if (!confirm('Recept uit deze map verwijderen? Het blijft in de gedeelde map en in Alle recepten.')) return;
  const { error } = await supabaseClient
    .from('shared_folder_recipes')
    .delete()
    .eq('shared_folder_id', f.id)
    .eq('recipe_id', id);
  if (error) {
    console.error(error);
    toast('Recept kon niet uit de gedeelde map worden verwijderd');
    return;
  }
  await loadDatabaseState();
  renderSharedFolderDetail();
  toast('Recept uit gedeelde map verwijderd');
}
/* removed duplicate earlier implementation: openRecipe */
function backFromRecipe() {
  const view = recipeReturnView || 'recipes';
  if (view === 'sharedFolderDetail') {
    currentShared = recipeReturnShared;
    currentFolder = recipeReturnFolder;
    go('sharedFolderDetail');
  } else if (view === 'shared') {
    currentShared = recipeReturnShared;
    go('shared');
  } else if (view === 'folderDetail') {
    currentFolder = recipeReturnFolder;
    go('folderDetail');
  } else go(view);
}
function parseYield(text) {
  let m = String(text || '')
    .trim()
    .match(/^([0-9]+(?:[.,][0-9]+)?)\s*(.*)$/);
  if (!m) return null;
  let n = parseFloat(m[1].replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? { value: n, unit: m[2].trim() } : null;
}
function formatNumber(n) {
  return Math.abs(n - Math.round(n)) < 1e-9
    ? String(Math.round(n))
    : String(Math.round(n * 1000) / 1000).replace('.', ',');
}
function scaleIngredient(line, factor) {
  const s = String(line || '');
  const qualitative =
    /\b(naar smaak|op smaak|scheut(?:je)?|snuf(?:je)?|mespunt|naar behoefte|evt\.?|eventueel)\b/i.test(s) ||
    /^\s*(zout|peper)\s*$/i.test(s);
  if (qualitative)
    return `${esc(s)} <span class="scale-note">${esc(t('Naar smaak — niet automatisch omgerekend.'))}</span>`;
  const m = s.match(/^\s*([0-9]+(?:[.,][0-9]+)?|[0-9]+\s*\/\s*[0-9]+)\b/);
  if (!m) return esc(s);
  let raw = m[1],
    num = raw.includes('/')
      ? (() => {
          let [a, b] = raw.split('/').map(x => parseFloat(x.trim()));
          return a / b;
        })()
      : parseFloat(raw.replace(',', '.'));
  if (!Number.isFinite(num)) return esc(s);
  let scaled = formatNumber(num * factor);
  return esc(s.replace(raw, scaled));
}
function openScale(id) {
  let r = recipes.find(x => x.id === id);
  if (!r) return;
  let y = parseYield(r.yield);
  if (!y) {
    toast(t('Recept omrekenen is beschikbaar zodra een opbrengst is ingevuld.'));
    return;
  }
  currentId = id;
  $('scaleBaseText').textContent = `${t('Basis')}: ${r.yield}`;
  $('scaleTarget').value = '';
  $('scaleResult').innerHTML =
    `<div class="muted">${esc(t('Vul een nieuwe opbrengst in en klik op Omrekenen.'))}</div>`;
  $('scaleModal').classList.add('open');
}
function closeScale() {
  $('scaleModal').classList.remove('open');
}
function calculateScale() {
  let r = recipes.find(x => x.id === currentId);
  let base = parseYield(r?.yield),
    target = parseYield($('scaleTarget').value);
  if (!base || !target) {
    toast(t('Vul een geldige opbrengst in, bijvoorbeeld 5 liter.'));
    return;
  }
  if (base.unit && target.unit && base.unit.toLowerCase() !== target.unit.toLowerCase()) {
    toast(t('Gebruik dezelfde eenheid als de oorspronkelijke opbrengst.'));
    return;
  }
  let factor = target.value / base.value;
  let items = (r.ingredients || []).map(x => `<div class="ingredient">${scaleIngredient(x, factor)}</div>`).join('');
  $('scaleResult').innerHTML =
    `<b>${esc(r.title)}</b><p class="muted">${esc(r.yield)} → ${esc($('scaleTarget').value)} · factor ${formatNumber(factor)}</p>${items || `<div class="muted">${esc(t('Geen ingrediënten beschikbaar.'))}</div>`}`;
}
function uniqueRecipes(list) {
  const seen = new Set();
  return list.filter(r => {
    if (!r || seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}
function openPrintBundle(list) {
  list = uniqueRecipes(list);
  if (!list.length) {
    toast('Geen recepten om te printen');
    return;
  }
  let old = document.getElementById('printBundle');
  if (old) old.remove();
  let el = document.createElement('div');
  el.id = 'printBundle';
  el.className = 'print-bundle';
  el.innerHTML = printBundleHtml(list);
  document.body.appendChild(el);
  let cleanup = () => {
    el.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  setTimeout(() => window.print(), 80);
}
function printRecipe(id) {
  let r = recipes.find(x => x.id === id);
  if (!r) return;
  openPrintBundle([r]);
}
/* removed duplicate earlier implementation: printBundleHtml */
function printFolder(id) {
  if (!currentUser) return;
  let f = folders.find(x => x.id === id);
  if (!f) return;
  let list = f.system && f.name === 'A t/m Z' ? [...recipes] : recipes.filter(r => f.recipeIds.includes(r.id));
  if (!list.length) {
    toast('Deze map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list);
}
function printSharedMap(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  let list = m.recipeIds.map(rid => recipes.find(r => r.id === rid)).filter(Boolean);
  if (!list.length) {
    toast('Deze gedeelde map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list);
}
function printSharedFolder(mapId, folderId) {
  let m = sharedMaps.find(x => x.id === mapId);
  let f = m?.folders?.find(x => x.id === folderId);
  if (!m || !f) return;
  let list = (f.system && f.name === 'A t/m Z' ? m.recipeIds : f.recipeIds)
    .map(rid => recipes.find(r => r.id === rid))
    .filter(Boolean);
  if (!list.length) {
    toast('Deze gedeelde map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list);
}
function restoreEditorView() {
  const ed = document.querySelector('#inlineEditorHost .editor');
  if (ed) {
    $('editor').appendChild(ed);
    ed.classList.remove('inline-editor');
  }
  if ($('inlineEditorHost')) {
    $('inlineEditorHost').querySelector('.editor-switchbar')?.remove();
    $('inlineEditorHost').style.display = 'none';
  }
  const choices = document.querySelector('#import .add-choice-grid');
  if (choices) choices.style.display = 'grid';
}
function mountEditorInline() {
  const ed = document.querySelector('#editor .editor');
  if (!ed) return;
  const host = $('inlineEditorHost');
  if (ed.parentElement !== host) host.appendChild(ed);
  ed.classList.add('inline-editor');
  host.querySelector('.editor-switchbar')?.remove();
  host.style.display = 'block';
  const choices = document.querySelector('#import .add-choice-grid');
  if (choices) choices.style.display = 'grid';
  $('importPanel').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
/* removed duplicate earlier implementation: editRecipe */
/* removed duplicate earlier implementation: newRecipe */
function renderEditorCategories(selected) {
  let vals = [...new Set(['Eigen recepten', ...categories])];
  $('fCategory').innerHTML = vals
    .map(c => `<option value="${escAttr(c)}" ${c === selected ? 'selected' : ''}>${esc(c)}</option>`)
    .join('');
}
function previewPhoto(input) {
  let f = input.files[0];
  if (!f) return;
  let reader = new FileReader();
  reader.onload = e => {
    $('photoPreview').src = e.target.result;
    $('photoPreview').style.display = 'block';
  };
  reader.readAsDataURL(f);
}
function showImportPanel() {
  if ($('inlineEditorHost')) $('inlineEditorHost').style.display = 'none';
  $('importPanel').style.display = 'block';
  $('importStatus').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function hideImportPanel() {
  resetImportSource();
  $('importPanel').style.display = 'none';
}
function selectImportSource(type) {
  importSource = type;
  importFileData = null;
  document.querySelectorAll('.import-option').forEach(x => x.classList.remove('selected'));
  const map = {
    photo: 'importOptionPhoto',
    text: 'importOptionText',
    word: 'importOptionWord',
    pdf: 'importOptionPdf',
    other: 'importOptionOther'
  };
  if (map[type]) $(map[type]).classList.add('selected');
  $('importStatus').textContent = '';
  $('importSourceNote').style.display = 'none';
  if (type === 'text') {
    $('importText').style.display = 'block';
    $('importDrop').style.display = 'none';
    $('importTextInput').focus();
    $('importSourceLabel').textContent = 'Bron: tekst invoeren';
    $('importSourceNote').style.display = 'flex';
  } else {
    $('importText').style.display = 'none';
    $('importDrop').style.display = 'block';
    const labels = {
      photo: 'Bron: foto uit je fotoalbum',
      word: 'Bron: Word-bestand',
      pdf: 'Bron: PDF-bestand',
      other: 'Bron: ander bestand'
    };
    $('importSourceLabel').textContent = labels[type] || '';
    $('importFile').value = '';
  }
}
function t(text) {
  return String(text ?? '');
}

function triggerImportFile() {
  if (!importSource || importSource === 'text') selectImportSource('other');
  $('importFile').click();
}
function triggerImportFolder() {
  importSource = 'other';
  $('importFile').value = '';
  $('importFolder').click();
}
function normalizeImportFiles(list) {
  return Array.from(list || []).filter(f => f && f.size > 0);
}
function setImportFiles(files) {
  const list = normalizeImportFiles(files);
  importFileData = list;
  if (!list.length) {
    $('importSourceNote').style.display = 'none';
    $('importStatus').textContent = '';
    return;
  }
  importSource = 'other';
  $('importSourceLabel').textContent =
    list.length === 1 ? `Bestand: ${list[0].name}` : `${list.length} bestanden geselecteerd`;
  $('importSourceNote').style.display = 'flex';
  $('importStatus').textContent = `${list.length} bestand${list.length === 1 ? '' : 'en'} klaar om te verwerken.`;
}
function handleImportFile(input) {
  setImportFiles(input.files);
}
function handleImportFolder(input) {
  setImportFiles(input.files);
}
function updateImportTextState() {
  importFileData = null;
  importSource = 'text';
  $('importSourceLabel').textContent = 'Bron: tekst invoeren';
  $('importSourceNote').style.display = 'flex';
}
function resetImportSource() {
  window.__aiImportedPhoto = '';
  importSource = '';
  importFileData = null;
  $('importFile').value = '';
  $('importFolder').value = '';
  $('importTextInput').value = '';
  $('importText').style.display = 'none';
  $('importDrop').style.display = 'block';
  $('importSourceNote').style.display = 'none';
  $('importStatus').textContent = '';
  document.querySelectorAll('.import-option').forEach(x => x.classList.remove('selected'));
}
let batchDrafts = [];

async function extractImportText(file) {
  if (!file) return '';
  const name = (file.name || '').toLowerCase();
  if (name.endsWith('.docx')) {
    if (!window.mammoth) throw new Error('Word-importmodule kon niet worden geladen.');
    const ab = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: ab });
    return result.value || '';
  }
  if (
    name.endsWith('.txt') ||
    name.endsWith('.rtf') ||
    name.endsWith('.odt') ||
    name.endsWith('.pages') ||
    name.endsWith('.csv')
  )
    return await file.text();
  if (name.endsWith('.pdf')) {
    try {
      const pdfjs = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs');
      const ab = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: ab }).promise;
      let out = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const tc = await page.getTextContent();
        out.push(tc.items.map(x => x.str).join(' '));
      }
      return out.join('\n');
    } catch (e) {
      throw new Error('PDF kon niet als tekst worden uitgelezen.');
    }
  }
  return '';
}
function cleanBatchTitle(t) {
  return String(t || '')
    .replace(/^\s*\d+[.)-]\s*/, '')
    .replace(/^\s*[#*-]\s*/, '')
    .trim();
}
function looksLikeRecipeHeading(line, nextLine = '') {
  const x = String(line || '').trim();
  if (!x || x.length > 110) return false;
  if (/^\d+[.)-]\s*\S+/.test(x)) return true;
  if (/^#{1,3}\s+\S+/.test(x)) return true;
  if (/^(recept|recipe)\s*[:#-]/i.test(x)) return true;
  const next = String(nextLine || '');
  const ingredientLike =
    /^[-•*]?\s*\d+(?:[.,]\d+)?\s*(?:g|gr|gram|kg|mg|ml|milliliter|cl|dl|liter|deciliter|milliliter|l|stuks?|st\.?|takjes?|teentjes?|blaadjes?|eieren?|el\.?|tl\.?)\b/i;
  const hasUnit = ingredientLike.test(x);
  return !hasUnit && x.length >= 3 && x.length <= 70 && !/[.:;]$/.test(x) && ingredientLike.test(next);
}
function parseRecipeBlock(block) {
  const lines = block
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(Boolean);
  if (!lines.length) return null;
  const title = cleanBatchTitle(lines[0]);
  let yieldText = '';
  const ingredients = [];
  const steps = [];
  let mode = 'ingredients';
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^(opbrengst|yield)\s*[:=-]/i.test(l)) {
      yieldText = l.replace(/^(opbrengst|yield)\s*[:=-]\s*/i, '').trim();
      continue;
    }
    if (/^(bereiding|bereidingswijze|methode|method|werkwijze)\s*[:=-]?$/i.test(l)) {
      mode = 'steps';
      continue;
    }
    if (/^(stap(pen)?|steps?)\s*[:=-]/i.test(l)) {
      mode = 'steps';
      continue;
    }
    if (mode === 'ingredients' && /^[-•*]\s*/.test(l)) ingredients.push(l.replace(/^[-•*]\s*/, ''));
    else if (
      mode === 'ingredients' &&
      /^[-•*]?\s*\d+(?:[.,]\d+)?\s*(?:g|gr|gram|kg|mg|ml|milliliter|cl|dl|liter|deciliter|milliliter|l|stuks?|st\.?|takjes?|teentjes?|blaadjes?|eieren?|el\.?|tl\.?)\b/i.test(
        l
      )
    )
      ingredients.push(l);
    else if (mode === 'ingredients' && ingredients.length === 0 && i < Math.min(lines.length, 8)) ingredients.push(l);
    else steps.push(l);
  }
  // No bereiding in de bron? Laat steps leeg. Nooit ingrediënten verzinnen als bereiding.
  return { title: title || 'Onbenoemd recept', ingredients, steps, yield: yieldText, category: 'Eigen recepten' };
}
function splitRecipeText(text) {
  const raw = String(text || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\r/g, '')
    .trim();
  if (!raw) return [];
  const lines = raw.split('\n');
  const starts = [];
  for (let i = 0; i < lines.length; i++) if (looksLikeRecipeHeading(lines[i], lines[i + 1])) starts.push(i);
  if (starts.length >= 2) {
    const blocks = [];
    for (let i = 0; i < starts.length; i++) {
      const a = starts[i],
        b = starts[i + 1] ?? lines.length;
      const block = lines.slice(a, b).join('\n').trim();
      if (block) blocks.push(block);
    }
    return blocks.map(parseRecipeBlock).filter(Boolean);
  }
  const blocks = raw
    .split(/\n\s*\n\s*\n+/)
    .map(x => x.trim())
    .filter(Boolean);
  if (blocks.length >= 2) return blocks.map(parseRecipeBlock).filter(Boolean);
  return [parseRecipeBlock(raw)].filter(Boolean);
}
/* removed duplicate earlier implementation: renderBatchDrafts */
function removeBatchDraft(index) {
  syncBatchDrafts();
  if (index < 0 || index >= batchDrafts.length) return;
  batchDrafts.splice(index, 1);
  renderBatchDrafts();
  $('batchStatus').textContent = batchDrafts.length
    ? `${batchDrafts.length} recepten over om te controleren.`
    : 'Geen recepten meer in deze batch.';
}
/* removed duplicate earlier implementation: syncBatchDrafts */
async function readImageAsDataUrl(file) {
  const reader = new FileReader();
  return await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
// Verkleint een foto tot max. 2000px en JPEG, zodat hij onder de uploadlimiet van Vercel (4,5 MB) blijft.
async function compressImageForImport(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('Deze foto kan niet worden gelezen. Gebruik JPG, PNG of WEBP.'));
      i.src = url;
    });
    const scale = Math.min(1, 2000 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}
// Roept de AI-import aan met het sessietoken van de ingelogde gebruiker.
async function callAiImport(body) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error('Log in om recepten met AI te importeren.');
  const response = await fetch('/api/ai-import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...body, categories: categories.slice() })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(result?.error || (response.status === 413 ? 'Het bestand is te groot.' : 'AI-import mislukt.'));
  return Array.isArray(result?.recipes) ? result.recipes : [];
}
function normalizeAiRecipe(r, extra) {
  return {
    title: String(r.title || 'Onbenoemd recept').trim(),
    ingredients: Array.isArray(r.ingredients) ? r.ingredients.map(String).filter(Boolean) : [],
    steps: Array.isArray(r.steps) ? r.steps.map(String).filter(Boolean) : [],
    yield: String(r.yield || '').trim(),
    category: String(r.category || 'Eigen recepten').trim(),
    _needsReview: Boolean(r.needs_review),
    ...extra
  };
}
// Knipt lange teksten in stukken van max. ~20.000 tekens, bij voorkeur op een receptkop, anders op een witregel.
const AI_IMPORT_CHUNK_CHARS = 20000;
function chunkImportText(text) {
  const lines = String(text || '')
    .replace(/\r/g, '')
    .split('\n');
  const chunks = [];
  let current = [];
  let size = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isBoundary = looksLikeRecipeHeading(line, lines[i + 1]) || !line.trim();
    if (size >= AI_IMPORT_CHUNK_CHARS * 0.75 && isBoundary && current.length) {
      chunks.push(current.join('\n'));
      current = [];
      size = 0;
    }
    if (size + line.length > AI_IMPORT_CHUNK_CHARS && current.length) {
      chunks.push(current.join('\n'));
      current = [];
      size = 0;
    }
    current.push(line);
    size += line.length + 1;
  }
  if (current.join('').trim()) chunks.push(current.join('\n'));
  return chunks.filter(c => c.trim());
}
async function importImageFile(file) {
  const dataUrl = await compressImageForImport(file);
  const aiRecipes = await callAiImport({ image: dataUrl, filename: file.name });
  if (!aiRecipes.length) throw new Error('Geen recept uit de foto herkend.');
  return aiRecipes.map(r => normalizeAiRecipe(r, { photo: dataUrl, sourceFile: file.name }));
}
async function importTextFile(file) {
  const sourceText = await extractImportText(file);
  if (!sourceText.trim()) {
    const base = (file?.name || 'Geïmporteerd recept')
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .trim();
    return [
      {
        title: base || 'Geïmporteerd recept',
        ingredients: ['Bron bevat geen uitleesbare tekst.'],
        steps: ['Controleer de bron handmatig.'],
        yield: '',
        category: 'Eigen recepten',
        sourceFile: file.name,
        _needsReview: true
      }
    ];
  }
  const chunks = chunkImportText(sourceText);
  const drafts = [];
  for (let i = 0; i < chunks.length; i++) {
    if (chunks.length > 1)
      $('importStatus').textContent = `${file.name}: deel ${i + 1} van ${chunks.length} wordt verwerkt…`;
    const aiRecipes = await callAiImport({ text: chunks[i], filename: file.name });
    // Herkent de AI niets in dit deel, dan valt het terug op de eenvoudige tekstsplitser (te controleren).
    if (aiRecipes.length) drafts.push(...aiRecipes.map(r => normalizeAiRecipe(r, { sourceFile: file.name })));
    else drafts.push(...splitRecipeText(chunks[i]).map(r => ({ ...r, sourceFile: file.name, _needsReview: true })));
  }
  return drafts;
}
function updateImportProgress(done, total, label = '') {
  const wrap = $('importProgressWrap'),
    bar = $('importProgressBar'),
    txt = $('importProgressText');
  if (!wrap || !bar) return;
  wrap.style.display = 'block';
  const pct = total ? Math.round((done / total) * 100) : 0;
  bar.style.width = pct + '%';
  if (txt) txt.textContent = label || `${done} / ${total} bestanden verwerkt · ${pct}%`;
}
async function processImportFiles(files) {
  const list = normalizeImportFiles(files);
  if (!list.length) {
    $('importStatus').textContent = 'Kies eerst één of meerdere bestanden.';
    return;
  }
  const allowed = /\.(doc|docx|pdf|txt|rtf|odt|pages|csv|jpe?g|png|webp)$/i;
  const valid = list.filter(f => allowed.test(f.name));
  if (valid.length !== list.length)
    toast(
      `${list.length - valid.length} bestand${list.length - valid.length === 1 ? '' : 'en'} overgeslagen: type wordt niet ondersteund.`
    );
  if (!valid.length) {
    $('importStatus').textContent = 'Geen ondersteunde bestanden gevonden.';
    return;
  }
  $('importStatus').textContent = `0 / ${valid.length} bestanden verwerkt…`;
  updateImportProgress(0, valid.length);
  batchDrafts = [];
  const failures = [];
  let done = 0;
  const queue = [...valid];
  const worker = async () => {
    while (queue.length) {
      const file = queue.shift();
      try {
        const name = (file.name || '').toLowerCase();
        let drafts;
        if (/\.(jpe?g|png|webp)$/i.test(name)) drafts = await importImageFile(file);
        else if (/\.doc$/i.test(name))
          throw new Error(
            'Oud .doc-formaat wordt nog niet rechtstreeks uitgelezen. Sla het document op als .docx en probeer opnieuw.'
          );
        else drafts = await importTextFile(file);
        batchDrafts.push(...drafts);
      } catch (e) {
        console.error('Bulk import', file.name, e);
        failures.push({ name: file.name, error: e?.message || 'Import mislukt.' });
      } finally {
        done++;
        $('importStatus').textContent =
          `${done} / ${valid.length} bestanden verwerkt${failures.length ? ` · ${failures.length} mislukt` : ''}…`;
        updateImportProgress(
          done,
          valid.length,
          `${done} / ${valid.length} bestanden verwerkt${failures.length ? ` · ${failures.length} mislukt` : ''} · ${Math.round((done / valid.length) * 100)}%`
        );
      }
    }
  };
  const workers = Array.from({ length: Math.min(3, valid.length) }, () => worker());
  await Promise.all(workers);
  if (!batchDrafts.length) {
    $('importStatus').textContent = `Geen recepten verwerkt.${failures.length ? ' Controleer de foutmeldingen.' : ''}`;
    return;
  }
  batchDrafts = batchDrafts.map((r, i) => ({ ...r, _importIndex: i }));
  const successText = `${batchDrafts.length} recept${batchDrafts.length === 1 ? '' : 'en'} uit ${valid.length - failures.length} bestand${valid.length - failures.length === 1 ? '' : 'en'} verwerkt.`;
  $('batchStatus').textContent =
    successText +
    (failures.length
      ? ` ${failures.length} bestand${failures.length === 1 ? '' : 'en'} kon${failures.length === 1 ? '' : 'den'} niet worden verwerkt.`
      : '');
  if (failures.length) {
    $('batchStatus').innerHTML =
      esc(successText) + `<br><span class="muted">Niet verwerkt: ${failures.map(f => esc(f.name)).join(', ')}</span>`;
  }
  renderBatchDrafts();
  $('importStatus').textContent =
    `Klaar · ${batchDrafts.length} recept${batchDrafts.length === 1 ? '' : 'en'} controleerbaar.`;
  updateImportProgress(valid.length, valid.length, `Klaar · ${batchDrafts.length} recepten controleerbaar`);
  go('batchImport');
}
async function processImport() {
  const text = $('importTextInput').value.trim();
  const files = Array.isArray(importFileData) ? importFileData : normalizeImportFiles($('importFile').files);
  if (importSource === 'text' && !text) {
    $('importStatus').textContent = 'Voer eerst tekst in.';
    return;
  }
  if (importSource !== 'text' && !files.length) {
    $('importStatus').textContent = 'Kies eerst één of meerdere bronbestanden.';
    return;
  }
  try {
    if (importSource === 'text') {
      const sourceText = text;
      batchDrafts = splitRecipeText(sourceText);
      if (batchDrafts.length > 1) {
        $('batchStatus').textContent = `${batchDrafts.length} losse recepten herkend uit de ingevoerde tekst.`;
        renderBatchDrafts();
        go('batchImport');
      } else {
        currentId = null;
        $('editorTitle').textContent = 'Import controleren';
        const r = batchDrafts[0] || { title: 'Geïmporteerd recept', ingredients: [], steps: [], yield: '' };
        $('fTitle').value = r.title;
        $('fYield').value = r.yield || '';
        renderEditorCategories('Eigen recepten');
        $('fIngredients').value = r.ingredients.join('\n');
        $('fSteps').value = r.steps.join('\n');
        $('fPhoto').value = '';
        $('photoPreview').style.display = 'none';
        go('editor');
      }
      $('importStatus').textContent = '';
      return;
    }
    await processImportFiles(files);
  } catch (e) {
    console.error(e);
    $('importStatus').textContent = e.message || 'Importeren is mislukt.';
  }
}

const importDropEl = $('importDrop');
if (importDropEl) {
  ['dragenter', 'dragover'].forEach(ev =>
    importDropEl.addEventListener(ev, e => {
      e.preventDefault();
      importDropEl.style.borderColor = 'var(--gold)';
    })
  );
  ['dragleave', 'drop'].forEach(ev =>
    importDropEl.addEventListener(ev, e => {
      e.preventDefault();
      importDropEl.style.borderColor = '';
    })
  );
  importDropEl.addEventListener('drop', e => {
    const files = normalizeImportFiles(e.dataTransfer.files);
    if (!files.length) return;
    setImportFiles(files);
  });
}
let activeShareUrl = '';
let activeShareTitle = '';
async function shareRecipe(id) {
  let r = recipes.find(x => x.id === id);
  if (!r) return;
  activeShareTitle = r.title;
  let slug = '';
  try {
    const { data, error } = await supabaseClient.rpc('create_public_recipe_share', { _recipe_id: r.id });
    if (error) throw error;
    slug = data?.slug || '';
  } catch (e) {
    console.error('Public share aanmaken mislukt', e);
    toast('Openbare link kon niet worden aangemaakt');
    return;
  }
  activeShareUrl = location.origin + '/r/' + encodeURIComponent(slug);
  $('shareLink').textContent = activeShareUrl;
  $('shareModal').classList.add('open');
}
function shareWhatsApp() {
  if (!activeShareUrl) return;
  window.open(
    'https://wa.me/?text=' + encodeURIComponent(activeShareTitle + ' — ' + activeShareUrl),
    '_blank',
    'noopener'
  );
}
function shareTelegram() {
  if (!activeShareUrl) return;
  window.open(
    'https://t.me/share/url?url=' +
      encodeURIComponent(activeShareUrl) +
      '&text=' +
      encodeURIComponent(activeShareTitle),
    '_blank',
    'noopener'
  );
}
function shareEmail() {
  if (!activeShareUrl) return;
  window.location.href =
    'mailto:?subject=' +
    encodeURIComponent('Savour · ' + activeShareTitle) +
    '&body=' +
    encodeURIComponent('Bekijk dit recept in Savour:\n\n' + activeShareUrl);
}
function closeShare() {
  $('shareModal').classList.remove('open');
}
function copyShare() {
  navigator.clipboard?.writeText($('shareLink').textContent);
  toast('Deellink gekopieerd');
  closeShare();
}
function newSharedMap() {
  $('newSharedName').value = '';
  $('newSharedModal').classList.add('open');
}
function closeNewShared() {
  $('newSharedModal').classList.remove('open');
}
/* removed duplicate earlier implementation: renderSharedNav */
async function openShared(id) {
  currentShared = String(id);
  const m = sharedMaps.find(x => String(x.id) === currentShared);
  if (!m) {
    const { data: map, error } = await supabaseClient
      .from('shared_maps')
      .select('id,owner_id,name,photo_url,public_key,created_at')
      .eq('id', currentShared)
      .maybeSingle();
    if (error) {
      console.error(error);
      toast(error.message || 'Gedeelde map kon niet worden geladen');
      return;
    }
    if (!map) {
      toast('Deze gedeelde map bestaat niet meer of je hebt geen toegang.');
      return;
    }
    const [{ data: smr }, { data: smf }, { data: smfr }, { data: smm }] = await Promise.all([
      supabaseClient.from('shared_map_recipes').select('shared_map_id,recipe_id').eq('shared_map_id', currentShared),
      supabaseClient.from('shared_folders').select('id,shared_map_id,name').eq('shared_map_id', currentShared),
      supabaseClient.from('shared_folder_recipes').select('shared_folder_id,recipe_id'),
      supabaseClient.from('shared_map_members').select('shared_map_id,user_id,role').eq('shared_map_id', currentShared)
    ]);
    const recipeIds = (smr || []).map(x => x.recipe_id);
    const foldersForMap = (smf || [])
      .filter(f => f.name !== 'A t/m Z')
      .map(f => ({
        id: f.id,
        name: f.name,
        recipeIds: (smfr || []).filter(x => x.shared_folder_id === f.id).map(x => x.recipe_id),
        system: false
      }));
    sharedMaps = [
      {
        id: map.id,
        name: map.name,
        recipeIds,
        folders: foldersForMap,
        photo: map.photo_url || '',
        members: (smm || []).map(x => ({
          name: x.user_id === currentUser.id ? 'Jij' : 'Teamlid',
          email: '',
          role: x.role,
          account: true,
          userId: x.user_id
        })),
        publicKey: map.public_key,
        ownerId: map.owner_id
      },
      ...sharedMaps.filter(x => String(x.id) !== currentShared)
    ];
  }
  renderSharedNav();
  go('shared');
}
function sharedFolderCount(m, f) {
  return f.recipeIds.length;
}
function sharedFolderCard(m, f) {
  return `<div class="shared-folder" onclick="openSharedFolder('${m.id}','${f.id}')"><span class="ico">▱</span><b>${esc(f.name)}</b><small>${sharedFolderCount(m, f)} recepten</small></div>`;
}

function newSharedFolder(mapId) {
  currentShared = String(mapId);
  $('newSharedFolderName').value = '';
  $('newSharedFolderModal').classList.add('open');
  setTimeout(() => $('newSharedFolderName')?.focus(), 30);
}
function closeSharedFolderModal() {
  $('newSharedFolderModal').classList.remove('open');
}
async function createSharedFolder() {
  if (!currentUser) return;
  const m = sharedMaps.find(x => String(x.id) === String(currentShared));
  if (!m || String(m.ownerId) !== String(currentUser.id)) {
    toast(t('Je hebt geen rechten om een map toe te voegen'));
    return;
  }
  const name = $('newSharedFolderName').value.trim();
  if (!name) return;
  if (m.folders.some(f => String(f.name).trim().toLowerCase() === name.toLowerCase())) {
    toast(t('Deze map bestaat al'));
    return;
  }
  const { error } = await supabaseClient.from('shared_folders').insert({ shared_map_id: m.id, name });
  if (error) {
    console.error('createSharedFolder', error);
    toast(error.message || t('Map kon niet worden aangemaakt'));
    return;
  }
  closeSharedFolderModal();
  await loadDatabaseState();
  currentShared = m.id;
  renderShared(m.id);
  toast(t('Map aangemaakt'));
}
async function saveSharedPhoto(mapId, input) {
  if (!currentUser || !input?.files?.[0]) return;
  const m = sharedMaps.find(x => String(x.id) === String(mapId));
  if (!m || String(m.ownerId) !== String(currentUser.id)) {
    toast(t('Je hebt geen rechten om de foto te wijzigen'));
    return;
  }
  const file = input.files[0];
  if (file.size > 3 * 1024 * 1024) {
    toast(t('De foto is te groot. Maximum 3 MB.'));
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = async () => {
    const photo = String(reader.result || '');
    const { error } = await supabaseClient
      .from('shared_maps')
      .update({ photo_url: photo })
      .eq('id', mapId)
      .eq('owner_id', currentUser.id);
    if (error) {
      console.error('saveSharedPhoto', error);
      toast(error.message || t('Foto kon niet worden opgeslagen'));
      return;
    }
    await loadDatabaseState();
    currentShared = String(mapId);
    renderShared(mapId);
    toast(t('Foto opgeslagen'));
  };
  reader.onerror = () => toast(t('Foto kon niet worden gelezen'));
  reader.readAsDataURL(file);
}

function renderShared(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) {
    $('sharedTitle').textContent = 'Gedeelde mappen';
    $('sharedWrap').innerHTML = `<div class="empty">Nog geen gedeelde mappen. Klik op “Gedeelde map toevoegen”.</div>`;
    return;
  }
  let list = m.recipeIds.map(rid => recipes.find(r => r.id === rid)).filter(Boolean);
  $('sharedTitle').textContent = m.name;
  let photo = m.photo
    ? `<div class="shared-cover compact-shared-cover"><img src="${m.photo}" alt="Foto van ${esc(m.name)}"><div class="shared-cover-body"><label class="btn compact-action">✎<span>Foto wijzigen</span><input type="file" accept="image/*" onchange="saveSharedPhoto('${m.id}',this)" style="display:none"></label></div></div>`
    : `<div class="shared-cover compact-shared-cover"><div class="shared-cover-empty"><label class="btn compact-action">＋<span>Foto toevoegen</span><input type="file" accept="image/*" onchange="saveSharedPhoto('${m.id}',this)" style="display:none"></label></div></div>`;
  let foldersHtml = m.folders.map(f => sharedFolderCard(m, f)).join('');
  $('sharedWrap').innerHTML =
    `${photo}<div class="layout"><div><div class="panel"><div class="folder-detail-head shared-main-head"><div><div class="eyebrow">Gedeelde map</div><h1>${esc(m.name)}</h1><p class="muted">${list.length} recepten · ${m.members.length} leden</p></div><div class="shared-map-actions"><button class="btn gold compact-action" title="Recept toevoegen" onclick="openSharedRecipePicker('${m.id}')">＋<span>Recept toevoegen</span></button>${list.length ? `<button class="btn compact-action" title="Print map" onclick="printSharedMap('${m.id}')">⎙<span>Print map</span></button>` : ''}<button class="btn compact-action" title="Team uitnodigen" onclick="inviteShared('${m.id}')">♧<span>Team uitnodigen</span></button>${m.ownerId === currentUser.id ? `<button class="btn compact-action" title="Naam wijzigen" onclick="renameSharedMap('${m.id}')">✎<span>Naam wijzigen</span></button><button class="btn compact-action danger-action" title="Gedeelde map verwijderen" onclick="deleteSharedMap('${m.id}')">⌫<span>Verwijderen</span></button>` : ''}</div></div></div><div class="section-head"><h2>Mappen</h2><button class="btn compact-action" onclick="newSharedFolder('${m.id}')">＋<span>Nieuwe map</span></button></div><div class="shared-folder-grid">${foldersHtml}</div><div class="section-head" style="margin-top:30px"><h2>Alle gedeelde recepten</h2><span class="mini">${list.length} recepten</span></div>${list.length ? `<div class="cards">${list.map(r => card(r, 'shared')).join('')}</div>` : `<div class="empty">Nog geen recepten in deze gedeelde map. Voeg eerst recepten toe en organiseer ze daarna in je eigen gedeelde mappen.</div>`}</div><aside class="rightcol"><div class="partner-slot"><small>Partnerpositie</small><b>Adverteer hier richting professionele keukens.</b><span>Een rustige positie naast de dagelijkse workflow, zonder de recepten te onderbreken.</span></div><div class="panel"><h3>Openbare uitnodigingslink</h3><div class="sharelink">https://savour.page/join/${m.publicKey}</div><button class="btn" style="width:100%;margin-top:10px" onclick="inviteShared('${m.id}')">Link delen</button></div><div class="panel"><h3>Keukenteam</h3>${m.members.map((x, i) => `<div class="member"><div><b>${esc(x.name)}</b><small class="muted">${x.account ? 'Account actief' : 'Uitgenodigd'}</small></div><select onchange="changeMemberRole('${m.id}',${i},this.value)"><option ${x.role === 'owner' ? 'selected' : ''}>owner</option><option ${x.role === 'editor' ? 'selected' : ''}>editor</option><option ${x.role === 'viewer' ? 'selected' : ''}>viewer</option></select></div>`).join('')}<button class="btn" style="width:100%;margin-top:12px" onclick="openMember('${m.id}')">＋ Persoon toevoegen</button></div><div class="panel"><h3>Rechten</h3><p class="muted" style="line-height:1.5;margin:0">Owner beheert de map. Editor kan recepten toevoegen en bewerken. Viewer kan recepten bekijken.</p></div></aside></div>`;
}

function openSharedFolder(mapId, folderId) {
  currentShared = mapId;
  currentFolder = 'sharedfolder:' + folderId;
  window.sharedAlphabetLetter = '';
  go('sharedFolderDetail');
}
function renderSharedFolderDetail() {
  if (!currentUser) return;
  let m = sharedMaps.find(x => x.id === currentShared);
  let f = m?.folders?.find(x => x.id === String(currentFolder).replace(/^sharedfolder:/, ''));
  if (!m || !f) {
    go('shared');
    return;
  }
  let list =
    f.system && f.name === 'A t/m Z'
      ? m.recipeIds.map(rid => recipes.find(r => r.id === rid)).filter(Boolean)
      : f.recipeIds.map(rid => recipes.find(r => r.id === rid)).filter(Boolean);
  let body = '';
  if (f.system && f.name === 'A t/m Z') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const letter = window.sharedAlphabetLetter || '';
    const filtered = letter ? list.filter(r => (r.title || '').trim().charAt(0).toUpperCase() === letter) : list;
    body = filtered.length
      ? `<div class="cards">${filtered
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title, 'nl'))
          .map(r => card(r, 'sharedFolder'))
          .join('')}</div>`
      : `<div class="empty">Geen recepten die met ${esc(letter || 'de gekozen letter')} beginnen.</div>`;
    const letterbar =
      letters
        .map(
          l => `<button class="${letter === l ? 'active' : ''}" onclick="filterSharedAlphabet('${l}')">${l}</button>`
        )
        .join('') + `<button class="${!letter ? 'active' : ''}" onclick="filterSharedAlphabet('')">Alles</button>`;
    body = `<div class="letterbar sticky-letterbar">${letterbar}</div><div class="alphabet-filter-note">${letter ? `Recepten met <b>${letter}</b>` : 'Alle recepten'}</div>${body}`;
  } else
    body = list.length
      ? `<div class="cards">${list.map(r => card(r, 'sharedFolder')).join('')}</div>`
      : `<div class="empty">Deze gedeelde map is nog leeg. Voeg recepten toe via “Recept toevoegen”.</div>`;
  $('sharedFolderDetailWrap').innerHTML =
    `<div class="shared-folder-head"><div><div class="eyebrow">Gedeelde map · ${esc(m.name)}</div><h1>${esc(f.name)}</h1><span class="pill">${list.length} recepten</span></div><div class="folder-map-actions">${list.length ? `<button class="btn compact-action" title="Print map" onclick="printSharedFolder('${m.id}','${f.id}')">⎙<span>Print map</span></button>` : ''}${f.system ? '' : `<button class="btn gold compact-action" title="Recept toevoegen" onclick="openSharedFolderRecipePicker('${m.id}','${f.id}')">＋<span>Recept toevoegen</span></button>`}</div></div>${body}`;
}
function filterSharedAlphabet(letter) {
  window.sharedAlphabetLetter = letter || '';
  renderSharedFolderDetail();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function openSharedFolderRecipePicker(mapId, folderId) {
  let m = sharedMaps.find(x => x.id === mapId),
    f = m?.folders?.find(x => x.id === folderId);
  if (!m || !f) return;
  folderTargetRecipe = null;
  currentShared = mapId;
  currentFolder = 'sharedfolderpick:' + folderId;
  $('folderModalTitle').textContent = 'Recepten aan gedeelde map toevoegen';
  $('pickerSearch').value = '';
  filterPicker('');
  $('folderModal').classList.add('open');
}
function inviteShared(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  currentShared = id;
  activeInviteTitle = m.name;
  const base = 'https://savour.page/join/' + encodeURIComponent(m.publicKey || m.id);
  $('inviteLink').textContent = base;
  $('inviteModal').classList.add('open');
}
let activeInviteTitle = '';
function closeInvite() {
  $('inviteModal').classList.remove('open');
}
function inviteActionMembers() {
  const id = currentShared;
  closeInvite();
  renderShared(id);
  setTimeout(
    () => document.querySelector('#shared .rightcol')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    30
  );
}
function inviteActionAddMember() {
  const id = currentShared;
  closeInvite();
  openMember(id);
}
function inviteActionRename() {
  const id = currentShared;
  closeInvite();
  renameSharedMap(id);
}
function inviteActionPhoto() {
  const id = currentShared;
  closeInvite();
  renderShared(id);
  setTimeout(() => document.querySelector('#shared input[type="file"]')?.click(), 30);
}
function inviteActionAddRecipes() {
  const id = currentShared;
  closeInvite();
  openSharedRecipePicker(id);
}
function inviteActionNewFolder() {
  const id = currentShared;
  closeInvite();
  newSharedFolder(id);
}
function inviteActionDelete() {
  const id = currentShared;
  closeInvite();
  deleteSharedMap(id);
}
function copyInvite() {
  navigator.clipboard?.writeText($('inviteLink').textContent);
  toast('Uitnodigingslink gekopieerd');
}
function shareInviteWhatsApp() {
  const u = $('inviteLink').textContent;
  window.open(
    'https://wa.me/?text=' + encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour: ' + u),
    '_blank',
    'noopener'
  );
}
function shareInviteTelegram() {
  const u = $('inviteLink').textContent;
  window.open(
    'https://t.me/share/url?url=' +
      encodeURIComponent(u) +
      '&text=' +
      encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour'),
    '_blank',
    'noopener'
  );
}
function shareInviteEmail() {
  const u = $('inviteLink').textContent;
  window.location.href =
    'mailto:?subject=' +
    encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour') +
    '&body=' +
    encodeURIComponent('Je bent uitgenodigd voor de gedeelde map ' + activeInviteTitle + ' in Savour.\n\n' + u);
}
function openMember(id) {
  currentShared = id;
  $('memberName').value = '';
  $('memberEmail').value = '';
  $('memberRole').value = 'viewer';
  $('memberModal').classList.add('open');
}
function closeMember() {
  $('memberModal').classList.remove('open');
}
async function createMember() {
  const m = sharedMaps.find(x => x.id === currentShared);
  let name = $('memberName').value.trim();
  let email = $('memberEmail').value.trim();
  let role = $('memberRole').value;
  if (!m || !name || !email) return;
  toast('Het koppelen van teamleden aan echte accounts doen we in de volgende stap.');
  closeMember();
}
async function changeMemberRole(id, index, role) {
  const m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  const member = m.members[index];
  if (!member?.userId) {
    toast('Dit teamlid heeft nog geen gekoppeld account');
    return;
  }
  const { error } = await supabaseClient
    .from('shared_map_members')
    .update({ role })
    .eq('shared_map_id', id)
    .eq('user_id', member.userId);
  if (error) {
    console.error(error);
    toast('Rechten konden niet worden aangepast');
    return;
  }
  await loadDatabaseState();
  renderShared(id);
  toast('Rechten aangepast');
}
function renderPickerList(items, type) {
  const attr =
    type === 'folder-recipe'
      ? 'data-folder-recipe-check'
      : type === 'shared-folder'
        ? 'data-shared-folder-check'
        : type === 'shared'
          ? 'data-shared-check'
          : 'data-picker-check';
  const key =
    type === 'folder-recipe'
      ? 'folderRecipeCheck'
      : type === 'shared-folder'
        ? 'sharedFolderCheck'
        : type === 'shared'
          ? 'sharedCheck'
          : 'pickerCheck';
  $('folderChecklist').innerHTML =
    items
      .map(
        r =>
          `<label class="check"><input type="checkbox" ${attr}="${r.id}"> <span>${esc(r.title)}</span><span class="muted" style="margin-left:auto">${esc(r.category || 'Eigen recepten')}</span></label>`
      )
      .join('') || `<div class="empty">Geen recepten gevonden.</div>`;
}
function filterPicker(q) {
  let mode = String(currentFolder || '');
  let type = mode.startsWith('shared:')
    ? 'shared'
    : mode.startsWith('sharedfolderpick:')
      ? 'shared-folder'
      : mode.startsWith('folderpick:')
        ? 'folder'
        : 'folder-add';
  let term = (q || '').toLowerCase().trim();
  if (type === 'shared') {
    let id = mode.slice(7),
      m = sharedMaps.find(x => x.id === id);
    let available = recipes.filter(r => !m?.recipeIds.includes(r.id));
    renderPickerList(
      available.filter(
        r =>
          !term ||
          r.title.toLowerCase().includes(term) ||
          r.ingredients.join(' ').toLowerCase().includes(term) ||
          r.steps.join(' ').toLowerCase().includes(term)
      ),
      'shared'
    );
  } else if (type === 'shared-folder') {
    let fid = mode.slice(17),
      m = sharedMaps.find(x => x.id === currentShared),
      f = m?.folders?.find(x => x.id === fid);
    let available = (m?.recipeIds || [])
      .map(rid => recipes.find(r => r.id === rid))
      .filter(Boolean)
      .filter(r => !f?.recipeIds.includes(r.id));
    renderPickerList(
      available.filter(
        r =>
          !term ||
          r.title.toLowerCase().includes(term) ||
          r.ingredients.join(' ').toLowerCase().includes(term) ||
          r.steps.join(' ').toLowerCase().includes(term)
      ),
      'shared-folder'
    );
  } else {
    let f = folders.find(x => x.id === mode.replace(/^folderpick:/, ''));
    let available = f ? recipes.filter(r => !f.recipeIds.includes(r.id)) : recipes;
    renderPickerList(
      available.filter(
        r =>
          !term ||
          r.title.toLowerCase().includes(term) ||
          r.ingredients.join(' ').toLowerCase().includes(term) ||
          r.steps.join(' ').toLowerCase().includes(term)
      ),
      'folder-recipe'
    );
  }
}
function openSharedRecipePicker(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  currentFolder = 'shared:' + id;
  $('folderModalTitle').textContent = 'Recepten aan gedeelde map toevoegen';
  $('pickerSearch').value = '';
  filterPicker('');
  $('folderModal').classList.add('open');
  folderTargetRecipe = null;
}
async function saveSharedMapSelection() {
  const id = String(currentFolder).slice(7);
  const ids = [...document.querySelectorAll('[data-shared-check]:checked')].map(x => x.dataset.sharedCheck);
  for (const recipeId of ids) {
    const { error } = await supabaseClient
      .from('shared_map_recipes')
      .upsert({ shared_map_id: id, recipe_id: recipeId }, { onConflict: 'shared_map_id,recipe_id' });
    if (error) {
      console.error(error);
      toast(error.message || 'Recept kon niet aan de gedeelde map worden toegevoegd');
      return;
    }
  }
  closeFolderModal();
  await loadDatabaseState();
  renderShared(id);
  toast('Recepten toegevoegd aan gedeelde map');
}
async function saveSharedFolderSelection() {
  const fid = String(currentFolder).slice(17);
  const ids = [...document.querySelectorAll('[data-shared-folder-check]:checked')].map(
    x => x.dataset.sharedFolderCheck
  );
  for (const recipeId of ids)
    await supabaseClient
      .from('shared_folder_recipes')
      .upsert({ shared_folder_id: fid, recipe_id: recipeId }, { onConflict: 'shared_folder_id,recipe_id' });
  closeFolderModal();
  await loadDatabaseState();
  renderSharedFolderDetail();
  toast('Recepten toegevoegd aan gedeelde map');
}
function saveSharedPicker() {}
function toast(t) {
  $('toast').textContent = t;
  $('toast').style.display = 'block';
  setTimeout(() => ($('toast').style.display = 'none'), 1800);
}
function esc(s) {
  return String(s ?? '').replace(
    /[&<>"']/g,
    m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]
  );
}
function escAttr(s) {
  return String(s ?? '').replace(/'/g, "'");
}
// Extend folder modal save for shared maps without changing the regular folder flow.
async function deleteAccount() {
  if (!currentUser) return;
  const ok = confirm(
    'Weet je zeker dat je je account definitief wilt verwijderen?\n\nJe persoonlijke recepten, mappen, favorieten en profielgegevens worden verwijderd. Deze actie kan niet ongedaan worden gemaakt.'
  );
  if (!ok) return;
  try {
    const { error } = await supabaseClient.rpc('delete_my_account');
    if (error) throw error;
    await supabaseClient.auth.signOut();
    currentUser = null;
    recipes = [];
    folders = [];
    favorites = [];
    sharedMaps = [];
    account = { name: '', role: 'Chef-kok', email: '', password: '', photo: '' };
    showLanding();
    toast('Account verwijderd');
  } catch (e) {
    console.error(e);
    toast(e.message || 'Account kon niet worden verwijderd');
  }
}
/* removed duplicate earlier implementation: openAuth */

function closeAuth() {
  $('authModal').classList.remove('open');
}
async function forgotPassword() {
  const email = $('authEmail').value.trim();
  if (!email) {
    toast(t('Vul eerst je e-mailadres in'));
    return;
  }
  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: location.origin + '/' });
    if (error) throw error;
    toast(t('Controleer je e-mail voor een link om je wachtwoord opnieuw in te stellen'));
  } catch (e) {
    console.error(e);
    toast(e.message || t('Wachtwoord herstellen is mislukt'));
  }
}

function authWelcome(name) {
  const n = name || 'bij Savour';
  return 'nl' === 'en' ? `Welcome ${n}` : `Welkom ${n}`;
}
function authGoodbye(name) {
  return 'nl' === 'en' ? `Goodbye ${name}` : `Tot ziens ${name}`;
}

async function submitAuth() {
  const email = $('authEmail').value.trim();
  const password = $('authPassword').value;
  const first = $('authFirstName')?.value.trim() || '';
  const last = $('authLastName')?.value.trim() || '';
  const name = [first, last].filter(Boolean).join(' ');
  if (!email || !password) {
    toast(t('Vul e-mailadres en wachtwoord in'));
    return;
  }
  if (authMode === 'signup' && (!first || !last)) {
    toast(t('Vul voornaam en achternaam in'));
    return;
  }
  $('authSubmit').disabled = true;
  $('authSubmit').textContent = 'Bezig...';
  try {
    if (authMode === 'signup') {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        data: { name, function_title: 'Chef-kok' }
      });
      if (error) throw error;
      closeAuth();
      if (data.session) {
        const ok = await startDatabaseSession(data.user);
        if (ok) toast(authWelcome(account.name || name || data.user.email));
      } else toast(t('Account aangemaakt — controleer je e-mail om te bevestigen'));
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      closeAuth();
      const ok = await startDatabaseSession(data.user);
      if (ok) toast(authWelcome(account.name || data.user.user_metadata?.name || email));
    }
  } catch (e) {
    console.error(e);
    let msg = e.message || t('Inloggen is mislukt');
    if (/rate limit|email rate limit/i.test(msg))
      msg = t('Er zijn tijdelijk te veel registratie-e-mails aangevraagd. Probeer het later opnieuw.');
    toast(msg);
  } finally {
    $('authSubmit').disabled = false;
    $('authSubmit').textContent = authMode === 'signup' ? 'Account aanmaken' : 'Inloggen';
  }
}

const siteCopy = {
  nl: {
    aboutTitle: 'Over Savour',
    aboutLead: 'Savour is een professionele omgeving voor het beheren, organiseren en delen van recepten.',
    faqTitle: 'Veelgestelde vragen',
    termsTitle: 'Algemene voorwaarden',
    privacyTitle: 'Privacybeleid',
    termsNote:
      'Concepttekst voor de huidige prototypefase. Laat deze voorwaarden juridisch controleren voordat Savour commercieel wordt gelanceerd.',
    privacyNote:
      'Concepttekst voor de huidige prototypefase. Laat dit privacybeleid controleren en aanvullen met de definitieve bedrijfs- en verwerkingsgegevens vóór livegang.',
    about: `<h2>Wat is Savour?</h2><p>Savour is ontwikkeld voor professionele keukens en keukenteams. Het doel is eenvoudig: recepten helder opslaan, terugvinden, organiseren en delen zonder onnodige informatie.</p><h2>Recepten beheren</h2><p>Je kunt recepten zelf invoeren of bestaande recepten importeren. Je eigen receptenbibliotheek blijft centraal staan en recepten kunnen worden georganiseerd in persoonlijke mappen en gedeelde mappen.</p><h2>Voor professionals</h2><p>Savour is ontworpen vanuit de dagelijkse praktijk van chefs en professionele keukens. De interface legt de nadruk op receptuur, organisatie en samenwerking.</p>`,
    faq: `<h2>Hoe voeg ik een recept toe?</h2><p>Ga naar <strong>Recept toevoegen</strong>. Je kunt een recept zelf invoeren of een bron importeren. Na import controleer je de herkende gegevens voordat je ze opslaat.</p><h2>Waar worden mijn recepten opgeslagen?</h2><p>Je persoonlijke recepten horen bij je eigen account. Een recept dat je uit een map verwijdert, wordt daarmee niet automatisch uit je persoonlijke bibliotheek verwijderd.</p><h2>Kan ik recepten delen?</h2><p>Ja. Met een gedeelde map kun je recepten met andere gebruikers delen en, afhankelijk van de ingestelde rechten, samenwerken.</p><h2>Kan ik mijn mappen aanpassen?</h2><p>Ja. Je kunt persoonlijke recepten mappen aanmaken, hernoemen en verwijderen. In <strong>Recepten mappen bijwerken</strong> bepaal je welke mappen in het menu verschijnen en in welke volgorde.</p><h2>Hoe werkt importeren?</h2><p>Je kunt verschillende bronbestanden en tekst gebruiken. Geïmporteerde recepten moeten altijd vóór het opslaan worden gecontroleerd.</p>`,
    terms: `<h2>1. Gebruik van Savour</h2><p>Savour is een dienst voor het beheren, organiseren en delen van recepten. Je gebruikt de dienst op eigen verantwoordelijkheid en bent verantwoordelijk voor de inhoud die je toevoegt.</p><h2>2. Account</h2><p>Voor bepaalde functies is een account nodig. Je bent verantwoordelijk voor het vertrouwelijk houden van je inloggegevens en voor de activiteiten die via je account plaatsvinden.</p><h2>3. Receptinhoud</h2><p>Je behoudt de rechten op de recepten en andere inhoud die je zelf aan Savour toevoegt, voor zover die rechten bij jou liggen. Je geeft Savour alleen de toestemming die nodig is om de dienst te leveren.</p><h2>4. Import en AI</h2><p>Automatische verwerking kan fouten bevatten. Controleer geïmporteerde of automatisch gestructureerde recepten voordat je ze professioneel gebruikt. Savour garandeert niet dat automatisch herkende inhoud volledig of foutloos is.</p><h2>5. Beschikbaarheid</h2><p>Savour kan worden gewijzigd, onderhouden of tijdelijk niet beschikbaar zijn. We streven naar een betrouwbare dienst, maar kunnen geen ononderbroken beschikbaarheid garanderen.</p><h2>6. Beëindiging</h2><p>Je kunt je account beëindigen via de beschikbare accountfunctie. Gegevens die volgens de wet moeten worden bewaard, vallen onder de toepasselijke bewaarplichten.</p><h2>7. Wijzigingen</h2><p>Deze voorwaarden kunnen worden aangepast wanneer Savour of de toepasselijke regelgeving verandert.</p>`,
    contactTitle: 'Contact',
    contactLead: 'Neem contact op met Savour.',
    supportTitle: 'Steun Savour',
    supportLead: 'Help mee om Savour verder te bouwen.',
    support: `<h2>Een platform vanuit de keuken</h2><p>Savour wordt ontwikkeld vanuit de praktijk van professionele keukens. Als je vindt dat dit platform waarde heeft, kun je vrijwillig bijdragen aan de verdere ontwikkeling.</p><div class="v51-support"><div class="v51-support-card"><div class="v51-qr-placeholder">PayPal<br>QR-code<br>wordt toegevoegd</div><div><h3>Steun Savour</h3><p>Een kleine bijdrage helpt bij hosting, AI-verwerking en verdere ontwikkeling van het platform.</p></div></div></div>`,
    contactTitle: 'Contact',
    contactLead: 'Neem contact op met Savour.',
    contactNote: '',
    contact: `<h2>Contact</h2><p>Voor vragen, feedback of zakelijke aanvragen kun je contact opnemen via <a href="mailto:contact@savour.page">contact@savour.page</a>.</p><p>We helpen je graag verder met vragen over Savour, accounts en professioneel receptbeheer.</p>`,
    privacy: `<h2>1. Welke gegevens</h2><p>Voor het gebruik van Savour kunnen onder meer accountgegevens, profielgegevens, recepten, mappen, favorieten en gegevens over gedeelde samenwerking worden verwerkt.</p><h2>2. Waarvoor gegevens worden gebruikt</h2><p>Gegevens worden gebruikt om je account te laten werken, recepten op te slaan en te tonen, functies voor mappen en delen te leveren en de veiligheid en werking van Savour te ondersteunen.</p><h2>3. Recepten en gedeelde mappen</h2><p>Je persoonlijke recepten zijn bedoeld voor jouw account. Wanneer je een recept of map deelt, kunnen andere deelnemers de inhoud zien volgens de rechten en instellingen van die gedeelde functie.</p><h2>4. Automatische verwerking</h2><p>Wanneer je gebruikmaakt van import- of AI-functies, kan de aangeleverde inhoud worden verwerkt om er gestructureerde receptgegevens van te maken. Controleer de resultaten vóór gebruik.</p><h2>5. Bewaren en verwijderen</h2><p>Je kunt je account en beschikbare persoonlijke gegevens verwijderen via de accountfuncties. Bewaartermijnen kunnen afhangen van wettelijke verplichtingen en technische noodzaak.</p><h2>6. Jouw rechten</h2><p>Afhankelijk van de toepasselijke privacywetgeving kun je rechten hebben zoals inzage, correctie, verwijdering, beperking van verwerking en dataportabiliteit.</p><h2>7. Definitieve bedrijfsgegevens</h2><p>Voor de livegang van Savour moeten de verantwoordelijke rechtspersoon, contactgegevens, hosting- en verwerkingspartijen en eventuele internationale gegevensdoorgiften definitief worden ingevuld.</p>`
  }
};
const bugFormCopy = {
  nl: {
    bugTitle: 'Bug doorgeven',
    bugLead: 'Zie je iets dat niet werkt zoals het hoort?',
    bugNote: 'Beschrijf het probleem zo duidelijk mogelijk. Je kunt ook een screenshot meesturen.',
    bug: `<h2>Help Savour beter te maken</h2><p>Gebruik dit formulier om een fout, vreemd gedrag of ander technisch probleem door te geven. Je melding wordt doorgestuurd naar <strong>contact@savour.page</strong>.</p><form id="bugReportForm" class="bug-form" onsubmit="submitBugReport(event)"><div class="formgrid"><div class="field"><label>Naam</label><input id="bugName" name="name" autocomplete="name" required></div><div class="field"><label>E-mail</label><input id="bugEmail" name="email" type="email" autocomplete="email" required></div><div class="field full"><label>Onderwerp</label><input id="bugSubject" name="subject" required></div><div class="field full"><label>Wat gaat er mis?</label><textarea id="bugMessage" name="message" required placeholder="Beschrijf wat je deed, wat je verwachtte en wat er gebeurde..."></textarea></div><div class="field full"><label>Screenshot</label><input id="bugScreenshot" name="screenshot" type="file" accept="image/png,image/jpeg,image/webp"><small class="muted">Optioneel · maximaal 3 MB.</small></div></div><div class="actions"><button class="btn gold" type="submit" id="bugSubmit">Bug versturen</button><span id="bugStatus" class="bug-status" aria-live="polite"></span></div></form>`
  }
};
Object.entries(bugFormCopy).forEach(([lang, c]) => Object.assign(siteCopy[lang], c));

function openPublicInfo(id) {
  window.currentPublicInfo = id;
  if (currentUser) {
    $('landingView').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    if ($('publicInviteShell')) $('publicInviteShell').style.display = 'none';
    $('appShell').style.display = 'grid';
    $('appShell').classList.remove('public-info-mode');
    go(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  $('landingView').style.display = 'none';
  $('appShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  $('publicInfoShell').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderActiveView(id) {
  if (id === 'home') renderHome();
  else if (id === 'recipes') renderRecipes();
  else if (id === 'favorites') renderFavorites();
  else if (id === 'folders') renderFolders();
  else if (id === 'categories') renderCategories();
  else if (id === 'folderDetail') renderFolderDetail();
  else if (id === 'shared') renderShared(currentShared);
  else if (id === 'sharedFolderDetail') renderSharedFolderDetail();
  else if (id === 'settings') renderSettings();
  else if (['about', 'faq', 'terms', 'privacy', 'contact'].includes(id));
}
function activateView(id) {
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
  const view = $(id) || $('home');
  if (view) view.classList.add('active');
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === view?.id));
}
function showApp(viewId = 'home') {
  $('landingView').style.display = 'none';
  $('publicInfoShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  if ($('publicInviteShell')) $('publicInviteShell').style.display = 'none';
  $('appShell').style.display = 'grid';
  $('appShell').classList.remove('public-info-mode');
  activateView(viewId);
  renderActiveView(viewId);
  renderSharedNav();
  updateProfileHeader();
}
async function retryDatabaseSession() {
  if (!currentUser) return;
  const ok = await startDatabaseSession(currentUser);
  if (ok) toast(t('Bibliotheek geladen'));
}
async function openPublicRecipeBySlug(slug) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_recipe_by_slug', { _slug: slug });
    if (error) throw error;
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'flex';
    if (!data) {
      $('publicRecipeContent').innerHTML =
        '<div class="empty"><h2>Recept niet gevonden</h2><p>Deze openbare receptlink bestaat niet meer.</p></div>';
      return;
    }
    const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];
    const steps = Array.isArray(data.steps) ? data.steps : [];
    $('publicRecipeContent').innerHTML =
      `<article class="public-recipe-card">${data.photo_url ? `<img class="public-recipe-photo" src="${data.photo_url}" alt="">` : ''}<div class="public-recipe-main"><div class="eyebrow">Savour · Recept</div><h1>${esc(data.title || 'Recept')}</h1>${data.description ? `<p class="lead">${esc(data.description)}</p>` : ''}${data.yield_text ? `<p class="yield">Opbrengst: ${esc(data.yield_text)}</p>` : ''}<div class="public-recipe-columns"><section><h2>Ingrediënten</h2><ul>${ingredients.map(x => `<li>${esc(String(x))}</li>`).join('')}</ul></section><section><h2>Bereiding</h2><ol>${steps.map(x => `<li>${esc(String(x))}</li>`).join('')}</ol></section></div><div class="public-recipe-site">Gedeeld via <a href="${location.origin}">Savour</a></div></div></article>`;
  } catch (e) {
    console.error('Publiek recept laden mislukt', e);
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'flex';
    $('publicRecipeContent').innerHTML =
      '<div class="empty"><h2>Recept niet beschikbaar</h2><p>De openbare receptpagina kon niet worden geladen.</p></div>';
  }
}
async function openPublicInvite(key) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_shared_map_invite', { _public_key: key });
    if (error) throw error;
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('publicInviteShell').style.display = 'flex';
    if (!data) {
      $('publicInviteContent').innerHTML =
        '<div class="empty"><h2>Uitnodiging niet gevonden</h2><p>Deze gedeelde-mapuitnodiging bestaat niet meer.</p></div>';
      return;
    }
    $('publicInviteContent').innerHTML =
      `<div class="eyebrow">Savour · Gedeelde map</div><h1>Uitnodiging voor ${esc(data.name || 'Gedeelde map')}</h1><p class="info-lead">Je bent uitgenodigd om mee te werken in een gedeelde receptenmap van Savour.</p><div class="panel" style="margin-top:24px"><h2 style="font-family:'Playfair Display';margin-top:0">${esc(data.name || 'Gedeelde map')}</h2><p class="muted">Maak een Savour-account of log in om verder te gaan. Na het inloggen kan de eigenaar je rechten instellen.</p><div class="actions"><button class="btn gold" onclick="openAuth('signup')">Account aanmaken</button><button class="btn" onclick="openAuth('login')">Inloggen</button></div></div>`;
  } catch (e) {
    console.error('Uitnodiging laden mislukt', e);
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('publicInviteShell').style.display = 'flex';
    $('publicInviteContent').innerHTML =
      '<div class="empty"><h2>Uitnodiging niet beschikbaar</h2><p>De uitnodiging kon niet worden geladen.</p></div>';
  }
}
/* removed duplicate earlier implementation: showLanding */
function languageFromPath() {
  return null;
}
function languagePath(lang) {
  return '/';
}
function v54PathLanguage() {
  return null;
}

/* Savour language registry — Dutch and  only. */

function ui(text) {
  return t(text);
}

const textOriginals = new WeakMap();

// Savour: Dutch is the immutable default.  is the only optional language. No DOM observer.
document.documentElement.lang = 'nl';
applyTheme('dark');

async function submitBugReport(event) {
  event.preventDefault();
  const form = event.currentTarget,
    btn = $('bugSubmit'),
    status = $('bugStatus');
  if (!form || !btn) return;
  const file = $('bugScreenshot')?.files?.[0];
  if (file && file.size > 3 * 1024 * 1024) {
    status.textContent = t('Screenshot is too large. Maximum 4 MB.');
    return;
  }
  btn.disabled = true;
  status.textContent = t('Bezig...');
  try {
    let attachment = null;
    if (file) {
      const reader = new FileReader();
      attachment = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
    const payload = {
      name: $('bugName').value.trim(),
      email: $('bugEmail').value.trim(),
      subject: $('bugSubject').value.trim(),
      message: $('bugMessage').value.trim(),
      screenshot: attachment || null,
      screenshotName: file?.name || null,
      page: location.href,
      language: document.documentElement.lang || ''
    };
    const r = await fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(payload)
    });
    const data = await r.json().catch(() => ({}));
    if (r.status === 413) throw new Error(t('De screenshot is te groot. Kies een kleinere afbeelding.'));
    if (!r.ok) {
      console.error('Savour bug-report API error', { status: r.status, data });
      throw new Error(data.error || `${t('De bugmelding kon niet worden verzonden.')} (${r.status})`);
    }
    form.reset();
    status.textContent = t('Bedankt. Je bugmelding is verstuurd.');
  } catch (e) {
    console.error(e);
    status.textContent = e.message || t('Versturen is mislukt.');
  } finally {
    btn.disabled = false;
  }
}

const SAVOUR30_SHARED_ORDER_KEY = () => `savour_shared_map_order_${currentUser?.id || 'local'}`;
function orderedByStoredIds(items, key) {
  let ids = [];
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(raw)) ids = raw.map(String);
  } catch (e) {}
  const map = new Map(items.map(x => [String(x.id), x]));
  const out = ids.map(id => map.get(id)).filter(Boolean);
  items.forEach(x => {
    if (!out.some(y => String(y.id) === String(x.id))) out.push(x);
  });
  return out;
}
function saveStoredOrder(items, key) {
  localStorage.setItem(key, JSON.stringify(items.map(x => String(x.id))));
}
function getOrderedPersonalFolders30() {
  return orderedByStoredIds(folders, `savour_personal_folder_order_${currentUser?.id || 'local'}`);
}
function getOrderedSharedMaps30() {
  return orderedByStoredIds(sharedMaps, SAVOUR30_SHARED_ORDER_KEY());
}
function getSharedMenuSettings30() {
  const ids = sharedMaps.map(x => String(x.id));
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(`savour_shared_menu_${currentUser?.id || 'local'}`) || 'null');
  } catch (e) {}
  if (!saved) return { selected: ids, order: ids };
  const valid = new Set(ids);
  let order = Array.isArray(saved.order) ? saved.order.map(String).filter(id => valid.has(id)) : [];
  ids.forEach(id => {
    if (!order.includes(id)) order.push(id);
  });
  let selected = Array.isArray(saved.selected) ? saved.selected.map(String).filter(id => valid.has(id)) : [];
  const known = new Set(Array.isArray(saved.known) ? saved.known.map(String) : []);
  ids.forEach(id => {
    if (!known.has(id) && !selected.includes(id)) selected.push(id);
  });
  return { selected: [...new Set(selected)], order };
}
function saveSharedMenuSettings30(selected, order) {
  const ids = sharedMaps.map(x => String(x.id));
  const valid = new Set(ids);
  const cleanOrder = [...new Set((order || ids).map(String).filter(id => valid.has(id)))];
  ids.forEach(id => {
    if (!cleanOrder.includes(id)) cleanOrder.push(id);
  });
  const cleanSelected = [...new Set((selected || []).map(String).filter(id => valid.has(id)))];
  localStorage.setItem(
    `savour_shared_menu_${currentUser?.id || 'local'}`,
    JSON.stringify({ selected: cleanSelected, order: cleanOrder, known: ids })
  );
}
async function addCategory() {
  if (!currentUser) return;
  let name = prompt('Naam van de nieuwe categorie');
  if (!name) return;
  name = name.trim();
  if (!name) return;
  if (categories.includes(name)) {
    toast('Deze categorie bestaat al');
    return;
  }
  const { error } = await supabaseClient.from('categories').insert({ user_id: currentUser.id, name });
  if (error) {
    console.error(error);
    toast('Categorie kon niet worden toegevoegd');
    return;
  }
  await loadDatabaseState();
  renderCategoryBar();
  renderSettings();
  renderCategories();
  toast('Categorie toegevoegd');
}
async function renameCategory(oldName) {
  if (!currentUser) return;
  let next = prompt('Nieuwe naam voor deze categorie', oldName);
  if (next === null) return;
  next = next.trim();
  if (!next || next === oldName) return;
  if (categories.includes(next)) {
    toast('Deze categorie bestaat al');
    return;
  }
  const { data: cat } = await supabaseClient
    .from('categories')
    .select('id')
    .eq('user_id', currentUser.id)
    .eq('name', oldName)
    .maybeSingle();
  if (!cat) {
    toast('Categorie niet gevonden');
    return;
  }
  const { error } = await supabaseClient
    .from('categories')
    .update({ name: next })
    .eq('id', cat.id)
    .eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Categorie kon niet worden hernoemd');
    return;
  }
  await loadDatabaseState();
  renderCategoryBar();
  renderSettings();
  renderCategories();
  renderRecipes();
  toast('Categorie hernoemd');
}
async function removeCategory(name) {
  if (!currentUser) return;
  if (!confirm(`Weet je zeker dat je de categorie “${name}” wilt verwijderen?`)) return;
  const { data: cat } = await supabaseClient
    .from('categories')
    .select('id')
    .eq('user_id', currentUser.id)
    .eq('name', name)
    .maybeSingle();
  if (!cat) {
    toast('Categorie niet gevonden');
    return;
  }
  const { error } = await supabaseClient.from('categories').delete().eq('id', cat.id).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Categorie kon niet worden verwijderd');
    return;
  }
  await loadDatabaseState();
  renderCategoryBar();
  renderSettings();
  renderCategories();
  renderRecipes();
  toast('Categorie verwijderd');
}

function renderSharedNav() {
  const el = $('sharedNav');
  if (!el) return;
  const s = getSharedMenuSettings30();
  const map = new Map(sharedMaps.map(m => [String(m.id), m]));
  const chosen = s.order
    .map(id => map.get(id))
    .filter(Boolean)
    .filter(m => s.selected.includes(String(m.id)));
  el.innerHTML = chosen
    .map(
      m =>
        `<button class="sub" onclick="openShared('${escAttr(m.id)}')"><span class="ico">▱</span>${esc(m.name)}</button>`
    )
    .join('');
}
function renderCategoryNav() {
  const el = $('categoryNav');
  if (!el) return;
  const settings = getCategorySettings();
  const ordered = getOrderedPersonalFolders30();
  const byId = new Map(ordered.map(f => [String(f.id), f]));
  const chosen = settings.order
    .map(id => byId.get(String(id)))
    .filter(Boolean)
    .filter(f => settings.selected.includes(String(f.id)));
  el.innerHTML = chosen.length
    ? chosen
        .map(
          f =>
            `<button onclick="filterFolderCategory('${escAttr(f.id)}')"><span class="ico">•</span>${esc(f.name)}</button>`
        )
        .join('')
    : `<div class="category-empty">Geen recepten mappen gekozen</div>`;
}
function renderHome() {
  if (!currentUser) return;
  const pf = getOrderedPersonalFolders30(),
    sm = getOrderedSharedMaps30();
  $('countStat').textContent = recipes.length;
  $('folderStat').textContent = pf.length;
  $('favoriteStat').textContent = favorites.filter(id => recipes.some(r => r.id === id)).length;
  $('sharedStat').textContent = sm.length;
  $('homeCards').innerHTML = recipes.slice(0, 8).map(card).join('');
  $('folderGrid').innerHTML = pf.map(f => folderCard(f)).join('');
  $('sideFolders').innerHTML =
    pf
      .slice(0, 6)
      .map(
        f =>
          `<div onclick="openFolder('${escAttr(f.id)}')" style="cursor:pointer"><b>${esc(f.name)}</b><small>${folderCount(f)} recepten</small></div>`
      )
      .join('') || `<div class="muted">Nog geen mappen.</div>`;
  $('sideFavorites').innerHTML =
    favorites
      .slice(0, 5)
      .map(id => recipes.find(r => r.id === id))
      .filter(Boolean)
      .map(
        r =>
          `<div onclick="openRecipe('${escAttr(r.id)}')" style="cursor:pointer"><b>${esc(r.title)}</b><small>${esc(r.category || 'Eigen recepten')}</small></div>`
      )
      .join('') || `<div class="muted">Nog geen favorieten.</div>`;
  $('sideShared').innerHTML =
    sm
      .slice(0, 5)
      .map(
        m =>
          `<div onclick="openShared('${escAttr(m.id)}')" style="cursor:pointer"><b>${esc(m.name)}</b><small>${m.recipeIds.length} recepten · ${m.members.length} leden</small></div>`
      )
      .join('') || `<div class="muted">Nog geen gedeelde mappen.</div>`;
  renderSharedNav();
  renderCategoryNav();
}
/* removed duplicate earlier implementation: renderFolders */
function renderCategories() {
  if (!currentUser) return;
  const el = $('categoryPageList');
  if (!el) return;
  el.innerHTML = categories.length
    ? categories
        .map(
          c =>
            `<div class="category-page-item"><div><b>${esc(c)}</b><small>${recipes.filter(r => r.category === c).length} recepten</small></div><div style="display:flex;gap:7px"><button class="btn small" onclick="renameCategory('${escAttr(c)}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="removeCategory('${escAttr(c)}')">Verwijderen</button></div></div>`
        )
        .join('')
    : `<div class="empty">Nog geen categorieën. Voeg je eerste categorie toe.</div>`;
}
function renderSettings() {
  if (!currentUser) return;
  applyTheme('dark');
  document
    .querySelectorAll('input[name="savourTheme"]')
    .forEach(x => (x.checked = x.value === (localStorage.getItem('savour_theme') || 'dark')));
  $('accountName').value = account.name || '';
  $('accountRole').value = account.role || '';
  $('accountEmail').value = account.email || '';
  $('accountPassword').value = account.password || '';
  $('accountAvatar').innerHTML = account.photo
    ? `<img src="${account.photo}" alt="Profielfoto">`
    : (account.name || 'M').charAt(0).toUpperCase();
  $('settingsCategories').innerHTML = categories
    .map(
      c =>
        `<div class="member"><div><b>${esc(c)}</b><small class="muted">Eigen categorie</small></div><div style="display:flex;gap:7px;justify-content:flex-end"><button class="btn small" onclick="renameCategory('${escAttr(c)}')">Naam wijzigen</button><button class="btn small" onclick="removeCategory('${escAttr(c)}')">Verwijderen</button></div></div>`
    )
    .join('');
}
function renderManagerItem(type, item, checked) {
  const isSystem = item.system;
  const count = type === 'personal' ? folderCount(item) : item.recipeIds.length;
  return `<div class="manage-item" draggable="true" data-manage-kind="${type}" data-manage-id="${escAttr(item.id)}" ondragstart="managerDragStart(event)" ondragover="managerDragOver(event)" ondrop="managerDrop(event)"><input type="checkbox" data-manager-check="${type}" value="${escAttr(item.id)}" ${checked ? 'checked' : ''} ${isSystem ? 'disabled' : ''}><span class="drag-handle">⋮⋮</span><div class="manage-name"><b>${esc(item.name)}</b><small>${count} recepten${isSystem ? ' · automatisch' : ''}</small></div><div class="manage-actions">${type === 'personal' ? (isSystem ? '' : `<button class="btn small" onclick="renameFolder('${escAttr(item.id)}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="deleteFolder('${escAttr(item.id)}')">Verwijderen</button>`) : item.ownerId === currentUser.id ? `<button class="btn small" onclick="renameSharedMap('${escAttr(item.id)}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="deleteSharedMap('${escAttr(item.id)}')">Verwijderen</button>` : ''}</div></div>`;
}
function renderOrganize() {
  if (!currentUser) return;
  const ps = getCategorySettings();
  const personal = getOrderedPersonalFolders30().filter(f => !f.system);
  const ss = getSharedMenuSettings30();
  const shared = getOrderedSharedMaps30();
  $('managePersonalFolders').innerHTML = personal.length
    ? personal.map(f => renderManagerItem('personal', f, ps.selected.includes(String(f.id)))).join('')
    : `<div class="empty">Nog geen recepten mappen.</div>`;
  $('manageSharedMaps').innerHTML = shared.length
    ? shared.map(m => renderManagerItem('shared', m, ss.selected.includes(String(m.id)))).join('')
    : `<div class="empty">Nog geen gedeelde mappen.</div>`;
}
function managerDragStart(e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.manageId);
  e.currentTarget.classList.add('dragging');
}
function managerDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function managerDrop(e) {
  e.preventDefault();
  const target = e.currentTarget;
  const sourceId = e.dataTransfer.getData('text/plain');
  if (!sourceId || sourceId === target.dataset.manageId) return;
  const container = target.parentElement;
  const source = container.querySelector(`[data-manage-id="${CSS.escape(sourceId)}"]`);
  if (!source) return;
  const rect = target.getBoundingClientRect();
  if (e.clientY < rect.top + rect.height / 2) container.insertBefore(source, target);
  else container.insertBefore(source, target.nextSibling);
  source.classList.remove('dragging');
}
function managerIds(kind) {
  return [...document.querySelectorAll(`[data-manage-kind="${kind}"]`)].map(x => x.dataset.manageId);
}
function managerSelected(kind) {
  return [...document.querySelectorAll(`[data-manager-check="${kind}"]:checked`)].map(x => x.value);
}
function managerSelectAll(kind) {
  document.querySelectorAll(`[data-manager-check="${kind}"]`).forEach(x => {
    if (!x.disabled) x.checked = true;
  });
}
function managerClearAll(kind) {
  document.querySelectorAll(`[data-manager-check="${kind}"]`).forEach(x => {
    if (!x.disabled) x.checked = false;
  });
}
function saveManagerChanges() {
  const pOrder = managerIds('personal'),
    pSelected = managerSelected('personal');
  saveCategorySettings(pSelected, pOrder);
  saveStoredOrder(
    getOrderedPersonalFolders30().sort((a, b) => pOrder.indexOf(String(a.id)) - pOrder.indexOf(String(b.id))),
    `savour_personal_folder_order_${currentUser?.id || 'local'}`
  );
  const sOrder = managerIds('shared'),
    sSelected = managerSelected('shared');
  saveSharedMenuSettings30(sSelected, sOrder);
  saveStoredOrder(
    getOrderedSharedMaps30().sort((a, b) => sOrder.indexOf(String(a.id)) - sOrder.indexOf(String(b.id))),
    SAVOUR30_SHARED_ORDER_KEY()
  );
  renderCategoryNav();
  renderSharedNav();
  renderHome();
  renderOrganize();
  toast('Mappen bijgewerkt');
}

/* removed duplicate earlier implementation: renderFolderManage */
/* removed duplicate earlier implementation: renderSharedManage */
/* removed duplicate earlier implementation: savePersonalManagerChanges */
/* removed duplicate earlier implementation: saveSharedManagerChanges */
/* removed duplicate earlier implementation: go */
function openAuth(mode) {
  authMode = mode;
  $('authModal').classList.add('open');
  $('authFirstName').value = '';
  $('authLastName').value = '';
  $('authEmail').value = '';
  $('authPassword').value = '';
  $('authNameField').style.display = mode === 'signup' ? 'grid' : 'none';
  $('authTitle').textContent = mode === 'signup' ? t('Account aanmaken') : t('Inloggen');
  $('authIntro').textContent =
    mode === 'signup'
      ? t('Maak een account aan om je persoonlijke receptenbibliotheek te openen.')
      : t('Log in om je persoonlijke receptenbibliotheek te openen.');
  $('authSubmit').textContent = mode === 'signup' ? t('Account aanmaken') : t('Inloggen');
  $('authEmailField').style.marginTop = mode === 'signup' ? '10px' : '0';
}

/* ================= SAVOUR 3.0 v2 overrides ================= */

/* v2 reliability and demo refinements */

function demoOnlyToastAction(fn) {
  return demoMode ? fn() : null;
}
async function toggleFavorite(id) {
  if (demoMode) {
    const exists = favorites.includes(id);
    favorites = exists ? favorites.filter(x => String(x) !== String(id)) : [...favorites, id];
    renderHome();
    renderRecipes();
    if ($('favorites').classList.contains('active')) renderFavorites();
    toast(exists ? 'Verwijderd uit favorieten' : 'Toegevoegd aan favorieten');
    return;
  }
  if (!currentUser) return;
  const exists = favorites.includes(id);
  const result = exists
    ? await supabaseClient.from('favorites').delete().eq('user_id', currentUser.id).eq('recipe_id', id)
    : await supabaseClient.from('favorites').insert({ user_id: currentUser.id, recipe_id: id });
  if (result.error) {
    console.error(result.error);
    toast('Favoriet kon niet worden opgeslagen: ' + result.error.message);
    return;
  }
  await loadDatabaseState();
  toast(exists ? 'Verwijderd uit favorieten' : 'Toegevoegd aan favorieten');
  renderHome();
  if ($('favorites').classList.contains('active')) renderFavorites();
  if ($('recipes').classList.contains('active')) renderRecipes();
  if ($('detail').classList.contains('active')) openRecipe(id);
}
async function deleteRecipe(id) {
  if (demoMode) {
    const r = recipes.find(x => String(x.id) === String(id));
    if (!r) return;
    if (!confirm(`Weet je zeker dat je “${r.title}” uit de demo wilt verwijderen?`)) return;
    recipes = recipes.filter(x => String(x.id) !== String(id));
    favorites = favorites.filter(x => String(x) !== String(id));
    folders.forEach(f => (f.recipeIds = (f.recipeIds || []).filter(x => String(x) !== String(id))));
    toast('Demo-recept verwijderd');
    renderHome();
    renderRecipes();
    renderFolders();
    go('recipes');
    return;
  }
  if (!currentUser) return;
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  if (!confirm(`Weet je zeker dat je ‘${r.title}’ uit je receptenbibliotheek wilt verwijderen?`)) return;
  const { error } = await supabaseClient.from('recipes').delete().eq('id', id).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Recept kon niet worden verwijderd: ' + error.message);
    return;
  }
  await loadDatabaseState();
  if (currentId === id) currentId = null;
  renderHome();
  renderRecipes();
  renderFavorites();
  renderFolders();
  if (currentShared) renderShared(currentShared);
  toast('Recept uit bibliotheek verwijderd');
  go('recipes');
}
async function createFolder() {
  const name = $('newFolderName').value.trim();
  if (!name) return;
  if (demoMode) {
    if (folders.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      toast('Deze map bestaat al');
      return;
    }
    folders.push({ id: 'demo-f-' + Date.now(), name, recipeIds: [], system: false });
    closeNewFolder();
    renderFolders();
    renderHome();
    renderCategoryNav();
    toast('Receptenmap aangemaakt');
    return;
  }
  if (!currentUser) return;
  const { error } = await supabaseClient.from('folders').insert({ user_id: currentUser.id, name });
  if (error) {
    console.error(error);
    toast('Map kon niet worden aangemaakt: ' + error.message);
    return;
  }
  await loadDatabaseState();
  closeNewFolder();
  renderFolders();
  renderHome();
  renderCategoryNav();
  renderCategories();
  toast('Receptenmap aangemaakt');
}
function renderBatchDrafts() {
  $('batchCount').textContent = batchDrafts.length ? `${batchDrafts.length} recepten herkend` : '';
  const catOptions = ['Eigen recepten', ...categories];
  $('batchRecipeGrid').innerHTML =
    batchDrafts
      .map(
        (r, i) =>
          `<article class="batch-recipe" data-batch-card="${i}"><div class="batch-recipe-head"><div><span class="batch-chip">Recept ${i + 1}</span><h3>${esc(r.title)}</h3></div><button type="button" class="batch-remove-btn" title="Recept verwijderen" aria-label="Recept ${i + 1} verwijderen" onclick="removeBatchDraft(${i})">×</button></div>${r.photo ? `<img src="${r.photo}" alt="" style="width:100%;max-height:150px;object-fit:cover;border-radius:7px;margin:10px 0">` : ''}<small>${r.ingredients.length} ingrediënten · ${r.steps.length} stappen${r.sourceFile ? ` · ${esc(r.sourceFile)}` : ''}</small><div class="field" style="margin-top:12px"><label>Titel</label><input data-batch-title="${i}" value="${escAttr(r.title)}"></div><div class="field" style="margin-top:10px"><label>Ingrediënten</label><textarea data-batch-ingredients="${i}">${esc(r.ingredients.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Bereiding</label><textarea data-batch-steps="${i}">${esc(r.steps.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Opbrengst</label><input data-batch-yield="${i}" value="${escAttr(r.yield || '')}"></div><div class="field" style="margin-top:10px"><label>Categorie</label><select data-batch-category="${i}">${catOptions.map(c => `<option value="${escAttr(c)}" ${String(r.category || 'Eigen recepten') === String(c) ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div></article>`
      )
      .join('') || `<div class="empty" style="grid-column:1/-1">Geen afzonderlijke recepten herkend.</div>`;
}
function syncBatchDrafts() {
  batchDrafts = batchDrafts.map((r, i) => ({
    ...r,
    title: document.querySelector(`[data-batch-title="${i}"]`)?.value.trim() || r.title,
    ingredients: (document.querySelector(`[data-batch-ingredients="${i}"]`)?.value || '')
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean),
    steps: (document.querySelector(`[data-batch-steps="${i}"]`)?.value || '')
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean),
    yield: document.querySelector(`[data-batch-yield="${i}"]`)?.value.trim() || '',
    category: document.querySelector(`[data-batch-category="${i}"]`)?.value || 'Eigen recepten'
  }));
}
async function saveBatchRecipes() {
  if (!currentUser) {
    toast('Log eerst in om recepten op te slaan');
    return;
  }
  syncBatchDrafts();
  if (!batchDrafts.length) {
    toast('Geen recepten om op te slaan');
    return;
  }
  const btn = $('batchSaveBtn');
  btn.disabled = true;
  btn.textContent = 'Opslaan…';
  let saved = 0;
  const failures = [];
  try {
    for (const r of batchDrafts) {
      let categoryId = null;
      if (r.category && r.category !== 'Eigen recepten') {
        const { data: cat, error } = await supabaseClient
          .from('categories')
          .select('id')
          .eq('user_id', currentUser.id)
          .eq('name', r.category)
          .maybeSingle();
        if (error) {
          failures.push({ title: r.title, error: error.message });
          continue;
        }
        categoryId = cat?.id || null;
      }
      const { error } = await supabaseClient.from('recipes').insert({
        user_id: currentUser.id,
        title: r.title || 'Nieuw recept',
        description: null,
        yield_text: r.yield || null,
        ingredients: r.ingredients || [],
        steps: r.steps || [],
        category_id: categoryId,
        photo_url: r.photo || null
      });
      if (error) {
        console.error('Batch opslaan', r.title, error);
        failures.push({ title: r.title, error: error.message || 'Opslaan mislukt' });
        continue;
      }
      saved++;
    }
    await loadDatabaseState();
    batchDrafts = [];
    if (failures.length) {
      toast(`${saved} recepten opgeslagen · ${failures.length} niet opgeslagen`);
      $('batchStatus').innerHTML =
        `${esc(String(saved))} recepten opgeslagen.<br><span class="muted">Niet opgeslagen: ${failures.map(f => esc(f.title)).join(', ')}</span>`;
      renderBatchDrafts();
    } else {
      toast(`${saved} recepten opgeslagen`);
      go('recipes');
    }
  } catch (e) {
    console.error(e);
    toast(e.message || 'De batch kon niet worden afgerond');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Alle recepten opslaan';
  }
}

async function startDatabaseSession(user) {
  if (sessionStartPromise) return sessionStartPromise;
  sessionStartPromise = (async () => {
    currentUser = user;
    demoMode = false;
    recipes = [];
    folders = [];
    favorites = [];
    sharedMaps = [];
    categories = [];
    account = {
      name: user?.user_metadata?.name || '',
      role: user?.user_metadata?.function_title || 'Chef-kok',
      email: user?.email || '',
      password: '',
      photo: ''
    };
    try {
      await ensureProfile(user);
      await migrateLegacySharedMaps();
      await loadDatabaseState();
      showApp('recipes');
      renderRecipes();
      renderFolders();
      renderHome();
      updateProfileHeader();
      return true;
    } catch (error) {
      console.error('Savour sessie kon niet worden opgebouwd:', error);
      window.showDatabaseError(error);
      return false;
    }
  })().finally(() => {
    sessionStartPromise = null;
  });
  return sessionStartPromise;
}

let activeRecipeLetter = '';
function recipeLetters() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
}
function renderRecipeAlphabet() {
  const el = $('recipeAlphabet');
  if (!el) return;
  const letters = recipeLetters();
  el.innerHTML =
    `<button class="${!activeRecipeLetter ? 'active' : ''}" onclick="filterRecipeAlphabet('')">Alle</button>` +
    letters
      .map(
        l =>
          `<button class="${activeRecipeLetter === l ? 'active' : ''}" onclick="filterRecipeAlphabet('${l}')">${l}</button>`
      )
      .join('');
}
function filterRecipeAlphabet(letter) {
  activeRecipeLetter = letter || '';
  renderRecipes();
}
/* removed duplicate earlier implementation: compactCard */

let bulkDeleteMode = false;
let bulkSelectedIds = new Set();
/* removed duplicate earlier implementation: toggleBulkDeleteMode */
function visibleRecipeList() {
  let q = ($('mobileRecipeSearch')?.value || $('globalSearch')?.value || '').toLowerCase().trim();
  let list = recipes.filter(
    r =>
      (!activeRecipeLetter || (r.title || '').trim().charAt(0).toUpperCase() === activeRecipeLetter) &&
      (!activeFolderCategory ||
        folders.some(f => String(f.id) === String(activeFolderCategory) && f.recipeIds.includes(r.id))) &&
      (!activeCat || r.category === activeCat) &&
      (!q ||
        r.title.toLowerCase().includes(q) ||
        r.ingredients.join(' ').toLowerCase().includes(q) ||
        r.steps.join(' ').toLowerCase().includes(q))
  );
  return list.slice().sort((a, b) => a.title.localeCompare(b.title, 'nl'));
}
function toggleBulkRecipe(id) {
  const key = String(id);
  if (bulkSelectedIds.has(key)) bulkSelectedIds.delete(key);
  else bulkSelectedIds.add(key);
  renderRecipes();
}
function selectVisibleBulk() {
  visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
  renderRecipes();
}
function clearBulkSelection() {
  bulkSelectedIds.clear();
  renderRecipes();
}
async function deleteBulkSelected() {
  if (!currentUser || !bulkSelectedIds.size) return;
  const list = visibleRecipeList().filter(r => bulkSelectedIds.has(String(r.id)));
  if (!list.length) return;
  const ok = confirm(
    `${list.length} recepten verwijderen?\n\nDeze recepten worden definitief uit je persoonlijke bibliotheek verwijderd. Recepten in mappen worden daarmee ook uit die persoonlijke bibliotheek verwijderd.`
  );
  if (!ok) return;
  if (demoMode) {
    recipes = recipes.filter(r => !bulkSelectedIds.has(String(r.id)));
    favorites = favorites.filter(id => !bulkSelectedIds.has(String(id)));
    folders.forEach(f => (f.recipeIds = f.recipeIds.filter(id => !bulkSelectedIds.has(String(id)))));
    bulkSelectedIds.clear();
    renderRecipes();
    renderHome();
    toast(`${list.length} recepten verwijderd`);
    return;
  }
  const ids = list.map(r => r.id);
  const { error } = await supabaseClient.from('recipes').delete().in('id', ids).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Recepten konden niet worden verwijderd: ' + error.message);
    return;
  }
  bulkSelectedIds.clear();
  await loadDatabaseState();
  renderRecipes();
  renderHome();
  toast(`${list.length} recepten verwijderd`);
}
/* removed duplicate earlier implementation: renderRecipes */
function filterCat(c) {
  activeCat = c;
  activeFolderCategory = '';
  activeRecipeLetter = '';
  go('recipes');
}
function searchAll(v) {
  activeRecipeLetter = '';
  if ($('recipes').classList.contains('active')) renderRecipes();
  else if (v.length > 1) {
    activeCat = '';
    activeFolderCategory = '';
    go('recipes');
    renderRecipes();
  }
}
function syncRecipeSearch(v) {
  const g = $('globalSearch'),
    h = $('mobileHomeSearch'),
    m = $('mobileRecipeSearch');
  if (g) g.value = v;
  if (h && h.value !== v) h.value = v;
  if (m && m.value !== v) m.value = v;
  activeCat = '';
  activeFolderCategory = '';
  renderRecipes();
}
function renderEditorRows(ingredients = [], steps = []) {
  const ing = Array.isArray(ingredients) && ingredients.length ? ingredients : [''];
  const st = Array.isArray(steps) && steps.length ? steps : [''];
  $('ingredientEditor').innerHTML = ing
    .map(
      (x, i) =>
        `<div class="structured-row"><input data-ingredient-row="${i}" value="${escAttr(x)}" placeholder="Ingrediënt ${i + 1}" onkeydown="editorRowKey(event,'ingredient',${i})" oninput="syncStructuredEditor()"><button type="button" class="structured-remove" title="Ingrediënt verwijderen" onclick="removeIngredientRow(${i})">×</button></div>`
    )
    .join('');
  $('stepEditor').innerHTML = st
    .map(
      (x, i) =>
        `<div class="structured-row"><textarea data-step-row="${i}" placeholder="Bereidingsstap ${i + 1}" onkeydown="editorRowKey(event,'step',${i})" oninput="syncStructuredEditor()">${esc(x)}</textarea><button type="button" class="structured-remove" title="Bereidingsstap verwijderen" onclick="removeStepRow(${i})">×</button></div>`
    )
    .join('');
  syncStructuredEditor();
}
function syncStructuredEditor() {
  const ins = [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value.trim()).filter(Boolean);
  const sts = [...document.querySelectorAll('[data-step-row]')].map(x => x.value.trim()).filter(Boolean);
  if ($('fIngredients')) $('fIngredients').value = ins.join('\n');
  if ($('fSteps')) $('fSteps').value = sts.join('\n');
}
function editorRowKey(e, type, index) {
  if (e.key !== 'Enter') return;
  if (type === 'ingredient') {
    e.preventDefault();
    addIngredientRow();
    setTimeout(() => document.querySelector('[data-ingredient-row]:last-of-type')?.focus(), 0);
  } else {
    e.preventDefault();
    addStepRow();
    setTimeout(() => document.querySelector('[data-step-row]:last-of-type')?.focus(), 0);
  }
}
function addIngredientRow() {
  const vals = [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value);
  vals.push('');
  renderEditorRows(
    vals,
    [...document.querySelectorAll('[data-step-row]')].map(x => x.value)
  );
  setTimeout(() => {
    const a = document.querySelectorAll('[data-ingredient-row]');
    a[a.length - 1]?.focus();
  }, 0);
}
function removeIngredientRow(i) {
  const vals = [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value);
  if (vals.length <= 1) {
    vals[0] = '';
  } else vals.splice(i, 1);
  renderEditorRows(
    vals,
    [...document.querySelectorAll('[data-step-row]')].map(x => x.value)
  );
}
function addStepRow() {
  const vals = [...document.querySelectorAll('[data-step-row]')].map(x => x.value);
  vals.push('');
  renderEditorRows(
    [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value),
    vals
  );
  setTimeout(() => {
    const a = document.querySelectorAll('[data-step-row]');
    a[a.length - 1]?.focus();
  }, 0);
}
function removeStepRow(i) {
  const vals = [...document.querySelectorAll('[data-step-row]')].map(x => x.value);
  if (vals.length <= 1) {
    vals[0] = '';
  } else vals.splice(i, 1);
  renderEditorRows(
    [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value),
    vals
  );
}
function fillEditor(r, title = 'Nieuw recept') {
  currentId = r?.id || null;
  $('editorTitle').textContent = title;
  $('fTitle').value = r?.title || '';
  $('fYield').value = r?.yield || '';
  renderEditorCategories(r?.category || 'Eigen recepten');
  $('fPhoto').value = '';
  $('photoPreview').style.display = r?.photo ? 'block' : 'none';
  $('photoPreview').src = r?.photo || '';
  renderEditorRows(r?.ingredients || [], r?.steps || []);
}
function editRecipe(id) {
  window.__aiImportedPhoto = '';
  const r = recipes.find(x => String(x.id) === String(id));
  if (!r) return;
  fillEditor(r, 'Recept bewerken');
  recipeReturnView = 'recipes';
  go('editor');
}
function newRecipe() {
  window.__aiImportedPhoto = '';
  fillEditor(null, 'Nieuw recept');
  if (document.querySelector('#import.view.active')) {
    mountEditorInline();
    return;
  }
  restoreEditorView();
  go('editor');
}
/* removed duplicate earlier implementation: renderFolders */
function renderFolderDetail() {
  if (!currentUser) return;
  const f = folders.find(x => String(x.id) === String(currentFolder).replace(/^folderpick:/, ''));
  if (!f) {
    go('folders');
    return;
  }
  let list = recipes.filter(r => f.recipeIds.includes(r.id));
  const q = ($('globalSearch')?.value || '').toLowerCase().trim();
  if (q) list = list.filter(r => r.title.toLowerCase().includes(q));
  list.sort((a, b) => a.title.localeCompare(b.title, 'nl'));
  const body = list.length
    ? `<div class="cards">${list.map(r => compactCard(r)).join('')}</div>`
    : `<div class="empty">Deze map is nog leeg.</div>`;
  $('folderDetailWrap').innerHTML =
    `<div class="folder-detail-head"><div><div class="eyebrow">Recepten map</div><h1 style="font-family:'Playfair Display';font-size:40px;margin:7px 0">${esc(f.name)}</h1><span class="pill">${list.length} recepten</span></div><div class="folder-map-actions">${list.length ? `<button class="btn compact-action" title="Print map" onclick="printFolder('${f.id}')">⎙<span>Print map</span></button>` : ''}${`<button class="btn compact-action" title="Naam wijzigen" onclick="renameFolder('${f.id}')">✎<span>Naam wijzigen</span></button><button class="btn compact-action" title="Verwijderen" onclick="deleteFolder('${f.id}')">×<span>Verwijderen</span></button><button class="btn compact-action" title="Recept toevoegen" onclick="openRecipePickerForFolder('${f.id}')">＋<span>Recept toevoegen</span></button>`}</div></div>${body}`;
}
function logout() {
  if (demoMode) {
    demoMode = false;
    document.getElementById('demoBadge')?.remove();
    currentUser = null;
    recipes = [];
    folders = [];
    favorites = [];
    categories = [];
    sharedMaps = [];
    showLanding();
    return;
  }
  supabaseClient.auth.signOut();
}
function showLanding() {
  if (demoMode) {
    demoMode = false;
    document.getElementById('demoBadge')?.remove();
  }
  $('appShell').style.display = 'none';
  $('landingView').style.display = 'block';
  $('publicInfoShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  $('publicInviteShell').style.display = 'none';
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
}

// Savour startup: run only after all auth, database and language declarations exist.
const publicRecipeMatch = location.pathname.match(/^\/r\/([^/]+)\/?$/);
const publicInviteMatch = location.pathname.match(/^\/join\/([^/]+)\/?$/);
if (publicRecipeMatch) {
  window.__publicRecipeRoute = decodeURIComponent(publicRecipeMatch[1]);
}
if (publicInviteMatch) {
  window.__publicInviteRoute = decodeURIComponent(publicInviteMatch[1]);
}
(async () => {
  try {
    if (window.__publicRecipeRoute) {
      document.body.classList.remove('auth-booting');
      await openPublicRecipeBySlug(window.__publicRecipeRoute);
      return;
    }
    if (window.__publicInviteRoute) {
      document.body.classList.remove('auth-booting');
      await openPublicInvite(window.__publicInviteRoute);
      return;
    }
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    if (data.session?.user) {
      document.body.classList.add('auth-restoring');
      $('landingView').style.display = 'none';
      $('appShell').style.display = 'grid';
      activateView('recipes');
      const ok = await startDatabaseSession(data.session.user);
      if (!ok) sessionStorage.setItem('savour_session_active', '1');
    } else {
      sessionStorage.removeItem('savour_session_active');
      currentUser = null;
      showLanding();
    }
  } catch (e) {
    console.error('Sessie kon niet worden hersteld:', e);
    sessionStorage.removeItem('savour_session_active');
    currentUser = null;
    showLanding();
  } finally {
    document.body.classList.remove('auth-restoring');
    document.body.classList.remove('auth-booting');
  }
})();
supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (
    event === 'SIGNED_IN' &&
    session?.user &&
    sessionStorage.getItem('savour_session_active') === '1' &&
    !currentUser
  ) {
    try {
      await startDatabaseSession(session.user);
    } catch (e) {
      console.error('Database na login kon niet worden geladen:', e);
    }
  }
  if (event === 'SIGNED_OUT') {
    sessionStorage.removeItem('savour_session_active');
    currentUser = null;
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('landingView').style.display = 'block';
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  }
});
