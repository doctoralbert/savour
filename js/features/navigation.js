// Navigatie tussen de schermen van de app, zoeken en de zijbalk.

// Pagina's die ook zonder account bereikbaar zijn.
const PUBLIC_PAGE_IDS = ['about', 'faq', 'guide', 'terms', 'privacy', 'contact', 'bug'];

// Adres en tabtitel volgen wat je ziet: een recept als /?recept=<id> met de receptnaam in de tab, de rest als /
// met "Savour". Zo landen vernieuwen en een gekopieerde link op het juiste recept, ook na een gedeelde link
// (/r/...). Alleen voor de app zelf; openbare pagina's hebben hun eigen adres.
// Elk scherm krijgt ook een stap in de geschiedenis van de browser, zodat de terugknop (en vegen op de telefoon)
// naar het vorige scherm of recept gaat in plaats van Savour te verlaten. Bewerken en importeren vervangen hun stap:
// na opslaan gaat terug dus naar de lijst, niet naar het bewerkscherm.
const APP_TITLE = document.title;
const HISTORY_REPLACE_VIEWS = ['editor', 'import'];
let restoringHistory = false;
function syncAppAddress(id) {
  if (!currentUser || location.pathname.startsWith('/admin')) return;
  const r = id === 'detail' && currentId ? findRecipe(currentId) : null;
  const path =
    !r || r.example
      ? '/'
      : r.linkSlug
        ? `/r/${encodeURIComponent(r.linkSlug)}`
        : `/?recept=${encodeURIComponent(currentId)}`;
  const state = {
    sv: id,
    r: r ? currentId : null,
    c: r ? recipeOpenContext : null,
    s: currentShared ?? null,
    f: currentFolder ?? null
  };
  let now = history.state;
  // Nog geen eigen stap (net geladen of na een inloglink) en je opent een recept: eerst de lijst als stap ervoor.
  if (!now?.sv && id === 'detail' && !restoringHistory) {
    now = {
      sv: typeof recipeReturnView === 'string' ? recipeReturnView : 'recipes',
      r: null,
      c: null,
      s: state.s,
      f: state.f
    };
    try {
      history.replaceState(now, '', '/');
    } catch (_) {}
  }
  const same =
    now?.sv === state.sv &&
    String(now?.r ?? '') === String(state.r ?? '') &&
    String(now?.f ?? '') === String(state.f ?? '') &&
    String(now?.s ?? '') === String(state.s ?? '');
  const replace =
    restoringHistory ||
    !now?.sv ||
    same ||
    HISTORY_REPLACE_VIEWS.includes(id) ||
    HISTORY_REPLACE_VIEWS.includes(now.sv);
  try {
    if (replace) history.replaceState(state, '', path);
    else history.pushState(state, '', path);
  } catch (_) {}
  document.title = r ? `${r.title} · Savour` : APP_TITLE;
}

// Terug of vooruit in de browser: het scherm uit die stap weer openen.
function restoreHistoryView(state) {
  restoringHistory = true;
  try {
    currentShared = state.s ?? null;
    currentFolder = state.f ?? null;
    if (state.sv === 'detail' && state.r && findRecipe(state.r)) openRecipe(state.r, state.c || 'library');
    else go(state.sv === 'detail' ? 'recipes' : state.sv);
  } finally {
    restoringHistory = false;
  }
}

// Centrale navigatie: activeert een weergave in de app en tekent de inhoud ervan.
function go(id) {
  // Uitgelogd opent een informatiepagina in de publieke omgeving.
  if (PUBLIC_PAGE_IDS.includes(id) && !currentUser) {
    openPublicInfo(id);
    return;
  }
  if (document.body.classList.contains('mobile-menu-open')) toggleMobileMenu(false);
  closeAppNav();
  // "Alle recepten" toont altijd de volledige bibliotheek, zonder mapfilter.
  if (id === 'recipes') activeFolderCategory = '';
  if (id !== 'detail' && document.body.classList.contains('cook-mode')) toggleCookMode(false);
  if (id !== 'import' && id !== 'editor') restoreEditorView();
  if ($('appShell')) $('appShell').classList.remove('public-info-mode');
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
  const view = $(id);
  if (!view) return;
  view.classList.add('active');
  syncAppAddress(id);
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderAppNav();
  if (id === 'recipes') renderRecipes();
  if (id === 'favorites') renderFavorites();
  if (id === 'folders' || id === 'folderManage') renderFolderManage();
  if (id === 'folders') renderFolders();
  if (id === 'categories') renderCategories();
  if (id === 'products') renderProducts();
  if (id === 'folderDetail') renderFolderDetail();
  if (id === 'shared') renderShared(currentShared);
  if (id === 'sharedManage') renderSharedManage();
  if (id === 'sharedFolderDetail') renderSharedFolderDetail();
  if (id === 'sharedMapManage') renderSharedMapManage(currentShared);
  if (id === 'settings') renderSettings();
  if (id === 'community') renderCommunity();
  if (id === 'pro') renderProPage($('proBody'));
  if (id === 'import') renderImportPlanNotice();
}

// Voegt eenmalig een snelknop ("+ ... toevoegen") toe onder een menulijst in de zijbalk.
// Keukenfoto's voor de fotoband boven mappen (css: .photo-band). Elke map krijgt op basis van zijn id altijd
// dezelfde foto uit de reeks; een keukenteam met een eigen foto gebruikt die.
const VIEW_PHOTOS = [
  'ingredienten-hout',
  'bord-pass',
  'ingredienten-keuken',
  'wortels',
  'uien',
  'eend-vuur',
  'brigade',
  'bloemen',
  'bloemenveld',
  'vuur-grill'
];

function setViewPhoto(el, key, ownPhoto) {
  if (!el) return;
  let h = 0;
  for (const ch of String(key)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const url = ownPhoto || `/assets/keuken/${VIEW_PHOTOS[h % VIEW_PHOTOS.length]}.jpg`;
  el.classList.add('photo-band');
  el.style.setProperty('--view-photo', `url("${String(url).replace(/["\\]/g, '')}")`);
}

function addQuickButton(hostId, text, handler) {
  const host = $(hostId);
  if (!host) return;
  const old = host.parentElement?.querySelector('[data-quick-add="' + hostId + '"]');
  if (old) return;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'savour-v30-quick-add';
  b.dataset.quickAdd = hostId;
  b.innerHTML = '<span class="ico">＋</span>' + text;
  b.onclick = handler;
  host.insertAdjacentElement('afterend', b);
}

function activateView(id) {
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
  const view = $(id) || $('recipes');
  if (view) view.classList.add('active');
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === view?.id));
}

function renderActiveView(id) {
  if (id === 'recipes') renderRecipes();
  else if (id === 'favorites') renderFavorites();
  else if (id === 'folders') renderFolders();
  else if (id === 'categories') renderCategories();
  else if (id === 'folderDetail') renderFolderDetail();
  else if (id === 'shared') renderShared(currentShared);
  else if (id === 'sharedFolderDetail') renderSharedFolderDetail();
  else if (id === 'settings') renderSettings();
  else if (id === 'community') renderCommunity();
  else if (['about', 'faq', 'terms', 'privacy', 'contact'].includes(id));
}

// Savour opent na inloggen direct de receptenbibliotheek ("Alle recepten").
function showApp(viewId = 'recipes') {
  $('landingView').style.display = 'none';
  $('publicInfoShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  if ($('publicInviteShell')) $('publicInviteShell').style.display = 'none';
  $('appShell').style.display = 'grid';
  $('appShell').classList.remove('public-info-mode');
  activateView(viewId);
  renderActiveView(viewId);
  syncAppAddress(viewId);
  renderSharedNav();
  updateProfileHeader();
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

function searchAll(v) {
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
    m = $('mobileRecipeSearch');
  if (g) g.value = v;
  if (m && m.value !== v) m.value = v;
  activeCat = '';
  activeFolderCategory = '';
  renderRecipes();
}

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
  // Terug naar dezelfde plek in de lijst (go() springt eerst naar boven).
  const y = recipeReturnScroll;
  requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }));
}

function openSharedChooser() {
  if (!sharedMaps.length) {
    if (showsExampleTeam()) openExample('team');
    else newSharedMap();
    return;
  }
  const list = $('sharedChooserList');
  list.innerHTML = sharedMaps
    .map(
      m =>
        `<button class="shared-chooser-item" onclick="closeSharedChooser();openShared('${escJs(m.id)}')"><span class="chooser-ico">${icon('users')}</span><span><b>${esc(m.name)}</b><small>${m.recipeIds.length} recepten · ${m.folders.length} mappen</small></span><strong>${icon('chevron')}</strong></button>`
    )
    .join('');
  $('sharedChooserModal').classList.add('open');
}

function closeSharedChooser() {
  $('sharedChooserModal').classList.remove('open');
}

// Kiezer voor de eigen receptenmappen (onderste menu op de telefoon).
function openFolderChooser() {
  const own = getOrderedPersonalFolders().filter(f => !f.system);
  if (!own.length) {
    if (showsExampleFolder()) openExample('folder');
    else newFolder();
    return;
  }
  $('folderChooserList').innerHTML = own
    .map(
      f =>
        `<button class="shared-chooser-item" onclick="closeFolderChooser();openFolder('${escJs(f.id)}')"><span class="chooser-ico">${icon('folder')}</span><span><b>${esc(f.name)}</b><small>${folderCount(f)} recepten</small></span><strong>${icon('chevron')}</strong></button>`
    )
    .join('');
  $('folderChooserModal').classList.add('open');
}

function closeFolderChooser() {
  $('folderChooserModal').classList.remove('open');
}
