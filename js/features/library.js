// Receptenbibliotheek: lijst, zoeken, alfabetfilter, categoriefilter, favorieten en bulk verwijderen.

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function recipeLetters() {
  return ALPHABET_LETTERS.slice();
}

// ---- Alfabetfilter boven "Alle recepten" en "Favorieten" ----

function drawAlphabet(hostId, kind) {
  const host = document.getElementById(hostId);
  if (!host) return;
  const active = (window.savourAlphabet && window.savourAlphabet[kind]) || '';
  host.innerHTML =
    `<button type="button" class="${!active ? 'active' : ''}" onclick="window.setSavourAlphabet('${kind}','')">Alle</button>` +
    ALPHABET_LETTERS.map(
      l =>
        `<button type="button" class="${active === l ? 'active' : ''}" onclick="window.setSavourAlphabet('${kind}','${l}')">${l}</button>`
    ).join('');
}

function filterByAlphabet(list, kind) {
  const active = (window.savourAlphabet && window.savourAlphabet[kind]) || '';
  return active
    ? list.filter(r =>
        String(r.title ?? '')
          .trim()
          .toLocaleUpperCase('nl-NL')
          .startsWith(active)
      )
    : list;
}

function setSavourAlphabet(kind, letter) {
  window.savourAlphabet = window.savourAlphabet || { library: '', favorite: '' };
  window.savourAlphabet[kind] = String(letter || '').toUpperCase();
  if (kind === 'library') renderRecipes();
  else renderFavorites();
}

// ---- Receptenlijst (genummerde rijen met favorietster) ----

function v27Row(r, i, context) {
  const id = escAttr(r.id),
    title = String(r?.title || ''),
    fav = Array.isArray(favorites) && favorites.includes(r.id);
  return (
    '<div class="savour-v13-row savour-v27-row" role="button" tabindex="0" onclick="openRecipe(\'' +
    id +
    "','" +
    context +
    "')\" onkeydown=\"if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('" +
    id +
    "','" +
    context +
    '\')}" aria-label="Open ' +
    esc(title) +
    '"><span class="savour-v13-number">' +
    String(i + 1).padStart(3, '0') +
    '</span><span class="savour-v13-name">' +
    esc(title) +
    '</span><button class="savour-v27-favorite" title="' +
    (fav ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten') +
    '" aria-label="' +
    (fav ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten') +
    '" onclick="event.stopPropagation();toggleFavorite(\'' +
    id +
    '\')">' +
    (fav ? '★' : '☆') +
    '</button><span class="savour-v13-arrow">›</span></div>'
  );
}

function v27Render(list, hostId, countId, context) {
  const host = $(hostId);
  if (!host) return;
  const title = r => String(r?.title || '');
  const sorted = (list || []).slice().sort((a, b) => title(a).localeCompare(title(b), 'nl', { sensitivity: 'base' }));
  if ($(countId)) $(countId).textContent = sorted.length + ' ' + (context === 'favorite' ? 'favorieten' : 'recepten');
  host.className = 'savour-v13-list savour-v27-list';
  host.innerHTML = sorted.length
    ? sorted.map((r, i) => v27Row(r, i, context)).join('')
    : '<div class="empty">' +
      (context === 'favorite'
        ? 'Je hebt nog geen favorieten. Klik op ☆ bij een recept om het toe te voegen.'
        : 'Geen recepten gevonden.') +
      '</div>';
}

function renderRecipes() {
  drawAlphabet('recipeAlphabet', 'library');
  if (!currentUser) return;
  const text = v => String(v ?? '');
  const q = (
    document.getElementById('mobileRecipeSearch')?.value ||
    document.getElementById('globalSearch')?.value ||
    ''
  )
    .toLowerCase()
    .trim();
  let list = (recipes || []).filter(
    r =>
      !q ||
      text(r.title).toLowerCase().includes(q) ||
      text(r.ingredients?.join(' ')).toLowerCase().includes(q) ||
      text(r.steps?.join(' ')).toLowerCase().includes(q)
  );
  if (activeFolderCategory) {
    list = list.filter(r =>
      folders?.some(
        f =>
          String(f.id) === String(activeFolderCategory) &&
          ((f.system && f.name === 'A t/m Z') || (f.recipeIds || []).some(id => String(id) === String(r.id)))
      )
    );
  }
  if (activeCat) list = list.filter(r => r.category === activeCat);
  list = filterByAlphabet(list, 'library');
  v27Render(list, 'recipeGrid', 'recipeCount', 'library');
}

function renderFavorites() {
  drawAlphabet('favoriteAlphabet', 'favorite');
  const list = filterByAlphabet(
    (favorites || []).map(id => (recipes || []).find(r => String(r.id) === String(id))).filter(Boolean),
    'favorite'
  );
  v27Render(list, 'favoriteGrid', 'favoriteCount', 'favorite');
}

// Recepten die passen bij zoekterm, categorie, map en beginletter; gebruikt voor selecteren in bulk.
function visibleRecipeList() {
  const titleOf = r => String(r?.title || 'Ongetiteld');
  const q = String(
    (document.getElementById('mobileRecipeSearch')?.value || document.getElementById('globalSearch')?.value) ?? ''
  )
    .toLocaleLowerCase('nl')
    .trim();
  const list = (recipes || []).filter(r => {
    const title = titleOf(r),
      first = title.trim().charAt(0).toUpperCase();
    const catOk = !activeCat || r.category === activeCat;
    const letterOk = !activeRecipeLetter || first === activeRecipeLetter;
    const folderOk =
      !activeFolderCategory ||
      folders.some(
        f =>
          String(f.id) === String(activeFolderCategory) && (f.recipeIds || []).some(id => String(id) === String(r.id))
      );
    const qOk = !q || title.toLocaleLowerCase('nl').includes(q);
    return catOk && letterOk && folderOk && qOk;
  });
  return list.slice().sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'nl', { sensitivity: 'base' }));
}

// ---- Meerdere recepten tegelijk verwijderen ----

function toggleBulkDeleteMode() {
  bulkDeleteMode = !bulkDeleteMode;
  bulkSelectedIds.clear();
  window.bulkManageQuery = '';
  renderRecipes();
}

function selectVisibleBulk() {
  visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
  renderRecipes();
}

function toggleBulkRecipe(id) {
  const k = String(id);
  if (bulkSelectedIds.has(k)) bulkSelectedIds.delete(k);
  else bulkSelectedIds.add(k);
  renderRecipes();
}

function clearBulkSelection() {
  bulkSelectedIds.clear();
  renderRecipes();
}

// Verwijdervenster met selectievakjes (Shift-klik selecteert een reeks).
function savourV12ListRows(list) {
  return list
    .map((r, i) => {
      const id = escAttr(r.id);
      return `<label class="savour-v12-bulk-row"><input type="checkbox" data-v12-bulk="${id}" ${bulkSelectedIds.has(String(r.id)) ? 'checked' : ''} onclick="event.stopPropagation();savourV12ShiftSelect(event,${i},'${id}')"><span><b>${esc(r.title || 'Zonder titel')}</b></span></label>`;
    })
    .join('');
}

function savourV12ShiftSelect(event, index, id) {
  const list = visibleRecipeList();
  const key = String(id);
  const checked = event.currentTarget.checked;
  if (event.shiftKey && Number.isInteger(window.savourV12LastBulkIndex)) {
    const start = Math.min(window.savourV12LastBulkIndex, index);
    const end = Math.max(window.savourV12LastBulkIndex, index);
    for (let i = start; i <= end; i++) {
      if (checked) bulkSelectedIds.add(String(list[i].id));
      else bulkSelectedIds.delete(String(list[i].id));
    }
  } else {
    if (checked) bulkSelectedIds.add(key);
    else bulkSelectedIds.delete(key);
  }
  window.savourV12LastBulkIndex = index;
  renderV6BulkList();
}

function renderV6BulkList() {
  const list = visibleRecipeList();
  const host = document.getElementById('v6BulkList');
  if (!host) return;
  host.innerHTML = list.length
    ? `<div class="savour-v12-bulk-list">${savourV12ListRows(list)}</div>`
    : '<div class="empty">Geen recepten gevonden.</div>';
}

function v6BulkSelectAll() {
  visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
  window.savourV12LastBulkIndex = null;
  renderV6BulkList();
}

function v6BulkClear() {
  bulkSelectedIds.clear();
  window.savourV12LastBulkIndex = null;
  renderV6BulkList();
}

// 2) Bulk management lives in a modal, so the recipe overview stays clean.
function v6BulkModal() {
  let m = document.getElementById('savourV6BulkModal');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'savourV6BulkModal';
  m.className = 'modal savour-bulk-modal';
  m.innerHTML =
    '<div class="modalbox"><div class="section-head"><div><h2>Verwijder recepten</h2><p class="muted" style="margin:4px 0 0">Selecteer recepten die je definitief uit je persoonlijke bibliotheek wilt verwijderen.</p></div><button class="btn" onclick="closeV6BulkModal()">Sluiten</button></div><div class="bulk-modal-list" id="v6BulkList"></div><div class="bulk-modal-actions"><div><button class="btn small" onclick="v6BulkSelectAll()">Alles selecteren</button><button class="btn small" onclick="v6BulkClear()">Selectie wissen</button></div><button class="btn small delete-recipe" onclick="v6BulkDelete()">Selectie verwijderen</button></div></div>';
  document.body.appendChild(m);
  return m;
}

function closeV6BulkModal() {
  document.getElementById('savourV6BulkModal')?.classList.remove('open');
}

function v6SyncBulkCheckbox(id, checked) {
  if (checked) bulkSelectedIds.add(String(id));
  else bulkSelectedIds.delete(String(id));
}

async function v6BulkDelete() {
  if (!currentUser || !bulkSelectedIds.size) return;
  const ids = [...bulkSelectedIds];
  const list = recipes.filter(r => ids.includes(String(r.id)));
  if (!list.length) return;
  if (
    !confirm(
      `${list.length} recepten verwijderen?\n\nDeze recepten worden definitief uit je persoonlijke bibliotheek verwijderd.`
    )
  )
    return;
  if (demoMode) {
    recipes = recipes.filter(r => !ids.includes(String(r.id)));
    favorites = favorites.filter(id => !ids.includes(String(id)));
    folders.forEach(f => (f.recipeIds = f.recipeIds.filter(id => !ids.includes(String(id)))));
    bulkSelectedIds.clear();
    closeV6BulkModal();
    renderRecipes();
    renderHome();
    return;
  }
  // Remove relations first so deletion is consistent even when FK cascades are not configured.
  for (const table of ['folder_recipes', 'favorites', 'shared_map_recipes', 'shared_folder_recipes']) {
    const key = 'recipe_id';
    await supabaseClient
      .from(table)
      .delete()
      .in(
        key,
        list.map(r => r.id)
      );
  }
  const { error } = await supabaseClient
    .from('recipes')
    .delete()
    .in(
      'id',
      list.map(r => r.id)
    )
    .eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Recepten konden niet worden verwijderd: ' + error.message);
    return;
  }
  bulkSelectedIds.clear();
  closeV6BulkModal();
  await loadDatabaseState();
  renderRecipes();
  renderHome();
  toast(`${list.length} recepten verwijderd`);
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

function renderCategoryBar() {
  let all = ['Alles', ...categories];
  $('categoryBar').innerHTML = all
    .map(
      c =>
        `<button class="btn ${(c === 'Alles' && activeCat === '') || c === activeCat ? 'gold' : ''}" onclick="filterCat('${escAttr(c === 'Alles' ? '' : c)}')">${esc(c)}</button>`
    )
    .join('');
}

function filterCat(c) {
  activeCat = c;
  activeFolderCategory = '';
  activeRecipeLetter = '';
  go('recipes');
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
