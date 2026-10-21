// Navigatie tussen de schermen van de app, zoeken en de zijbalk.

// Pagina's die ook zonder account bereikbaar zijn.
const PUBLIC_PAGE_IDS = ['about', 'faq', 'terms', 'privacy', 'contact', 'bug', 'support'];

// Centrale navigatie: activeert een weergave in de app en tekent de inhoud ervan.
function go(id) {
  // Uitgelogd opent een informatiepagina in de publieke omgeving.
  if (PUBLIC_PAGE_IDS.includes(id) && !currentUser) {
    openPublicInfo(id);
    return;
  }
  // "Alle recepten" toont altijd de volledige bibliotheek, zonder mapfilter.
  if (id === 'recipes') activeFolderCategory = '';
  if (id !== 'detail' && document.body.classList.contains('cook-mode')) toggleCookMode(false);
  if (id !== 'import' && id !== 'editor') restoreEditorView();
  if ($('appShell')) $('appShell').classList.remove('public-info-mode');
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
  const view = $(id);
  if (!view) return;
  view.classList.add('active');
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'recipes') renderRecipes();
  if (id === 'favorites') renderFavorites();
  if (id === 'folders' || id === 'folderManage') renderFolderManage();
  if (id === 'categories') renderCategories();
  if (id === 'folderDetail') renderFolderDetail();
  if (id === 'shared') renderShared(currentShared);
  if (id === 'sharedManage') renderSharedManage();
  if (id === 'sharedFolderDetail') renderSharedFolderDetail();
  if (id === 'sharedMapManage') renderSharedMapManage(currentShared);
  if (id === 'settings') renderSettings();
  if (id === 'pro') renderProPage($('proBody'));
  if (id === 'import') {
    renderImportPlanNotice();
    if ($('addChoiceGrid')?.style.display !== 'none' && $('addModeSwitch')?.style.display === 'none')
      resetImportSource();
    else if ($('addModeSwitch')?.style.display === 'none') {
      if ($('addChoiceGrid')) $('addChoiceGrid').style.display = 'grid';
      if ($('importPanel')) $('importPanel').style.display = 'none';
      if ($('inlineEditorHost')) $('inlineEditorHost').style.display = 'none';
    }
  }
}

// Voegt eenmalig een snelknop ("+ ... toevoegen") toe onder een menulijst in de zijbalk.
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
    newFolder();
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
