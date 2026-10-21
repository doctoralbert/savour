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

function recipeRowHtml(r, i, context) {
  const id = escJs(r.id),
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

function renderRecipeList(list, hostId, countId, context) {
  const host = $(hostId);
  if (!host) return;
  const title = r => String(r?.title || '');
  const sorted = (list || []).slice().sort((a, b) => title(a).localeCompare(title(b), 'nl', { sensitivity: 'base' }));
  if ($(countId)) $(countId).textContent = sorted.length + ' ' + (context === 'favorite' ? 'favorieten' : 'recepten');
  host.className = 'savour-v13-list savour-v27-list';
  host.innerHTML = sorted.length
    ? sorted.map((r, i) => recipeRowHtml(r, i, context)).join('')
    : '<div class="empty">' +
      (context === 'favorite'
        ? 'Je hebt nog geen favorieten. Klik op ☆ bij een recept om het toe te voegen.'
        : 'Geen recepten gevonden.') +
      '</div>';
}

function renderRecipes() {
  drawAlphabet('recipeAlphabet', 'library');
  if (!currentUser) return;
  renderRecipeProHint();
  renderCategoryBar();
  renderRecipeList(filteredLibraryRecipes(), 'recipeGrid', 'recipeCount', 'library');
}

// Bibliotheek gefilterd op zoekterm (titel, ingrediënten, bereiding), gekozen map, categorie en beginletter.
function filteredLibraryRecipes() {
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
  return filterByAlphabet(list, 'library');
}

function renderFavorites() {
  drawAlphabet('favoriteAlphabet', 'favorite');
  const list = filterByAlphabet(
    (favorites || []).map(id => (recipes || []).find(r => String(r.id) === String(id))).filter(Boolean),
    'favorite'
  );
  renderRecipeList(list, 'favoriteGrid', 'favoriteCount', 'favorite');
}

// De recepten die nu in "Alle recepten" zichtbaar zijn, alfabetisch gesorteerd.
function visibleRecipeList() {
  const title = r => String(r?.title || '');
  return filteredLibraryRecipes()
    .slice()
    .sort((a, b) => title(a).localeCompare(title(b), 'nl', { sensitivity: 'base' }));
}

// ---- Meerdere recepten tegelijk verwijderen ----

// Opent het verwijdervenster met de recepten die nu in de lijst zichtbaar zijn.
function openBulkDeleteModal() {
  bulkSelectedIds.clear();
  window.bulkLastIndex = null;
  bulkDeleteModal().classList.add('open');
  renderBulkDeleteList();
}

// Verwijdervenster met selectievakjes (Shift-klik selecteert een reeks).
function bulkDeleteRowsHtml(list) {
  return list
    .map((r, i) => {
      const id = escJs(r.id);
      return `<label class="savour-v12-bulk-row"><input type="checkbox" data-bulk-id="${id}" ${bulkSelectedIds.has(String(r.id)) ? 'checked' : ''} onclick="event.stopPropagation();bulkShiftSelect(event,${i},'${id}')"><span><b>${esc(r.title || 'Zonder titel')}</b></span></label>`;
    })
    .join('');
}

function bulkShiftSelect(event, index, id) {
  const list = visibleRecipeList();
  const key = String(id);
  const checked = event.currentTarget.checked;
  if (event.shiftKey && Number.isInteger(window.bulkLastIndex)) {
    const start = Math.min(window.bulkLastIndex, index);
    const end = Math.max(window.bulkLastIndex, index);
    for (let i = start; i <= end; i++) {
      if (checked) bulkSelectedIds.add(String(list[i].id));
      else bulkSelectedIds.delete(String(list[i].id));
    }
  } else {
    if (checked) bulkSelectedIds.add(key);
    else bulkSelectedIds.delete(key);
  }
  window.bulkLastIndex = index;
  renderBulkDeleteList();
}

function renderBulkDeleteList() {
  const list = visibleRecipeList();
  const host = document.getElementById('bulkDeleteList');
  if (!host) return;
  host.innerHTML = list.length
    ? `<div class="savour-v12-bulk-list">${bulkDeleteRowsHtml(list)}</div>`
    : '<div class="empty">Geen recepten gevonden.</div>';
}

function bulkModalSelectAll() {
  visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
  window.bulkLastIndex = null;
  renderBulkDeleteList();
}

function bulkModalClear() {
  bulkSelectedIds.clear();
  window.bulkLastIndex = null;
  renderBulkDeleteList();
}

// Maakt het verwijdervenster één keer aan en geeft het terug.
function bulkDeleteModal() {
  let m = document.getElementById('bulkDeleteDialog');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'bulkDeleteDialog';
  m.className = 'modal savour-bulk-modal';
  m.innerHTML =
    '<div class="modalbox"><div class="section-head"><div><h2>Verwijder recepten</h2><p class="muted" style="margin:4px 0 0">Selecteer recepten die je definitief uit je persoonlijke bibliotheek wilt verwijderen.</p></div><button class="btn" onclick="closeBulkDeleteModal()">Sluiten</button></div><div class="bulk-modal-list" id="bulkDeleteList"></div><div class="bulk-modal-actions"><div><button class="btn small" onclick="bulkModalSelectAll()">Alles selecteren</button><button class="btn small" onclick="bulkModalClear()">Selectie wissen</button></div><button class="btn small delete-recipe" onclick="deleteBulkModalSelection()">Selectie verwijderen</button></div></div>';
  document.body.appendChild(m);
  return m;
}

function closeBulkDeleteModal() {
  document.getElementById('bulkDeleteDialog')?.classList.remove('open');
}

async function deleteBulkModalSelection() {
  if (!currentUser || !bulkSelectedIds.size) return;
  const ids = [...bulkSelectedIds];
  const list = recipes.filter(r => ids.includes(String(r.id)));
  if (!list.length) return;
  if (
    !(await askConfirm(
      `${list.length} recepten verwijderen?\n\nDeze recepten worden definitief uit je persoonlijke bibliotheek verwijderd.`
    ))
  )
    return;
  if (demoMode) {
    recipes = recipes.filter(r => !ids.includes(String(r.id)));
    favorites = favorites.filter(id => !ids.includes(String(id)));
    folders.forEach(f => (f.recipeIds = f.recipeIds.filter(id => !ids.includes(String(id)))));
    bulkSelectedIds.clear();
    closeBulkDeleteModal();
    renderRecipes();
    refreshSidebar();
    return;
  }
  const recipeIds = list.map(r => r.id);
  // Eerst de koppelingen (mappen, favorieten, gedeelde mappen), zodat er geen losse verwijzingen achterblijven.
  for (const table of ['folder_recipes', 'favorites', 'shared_map_recipes', 'shared_folder_recipes']) {
    const { error } = await supabaseClient.from(table).delete().in('recipe_id', recipeIds);
    if (error) console.warn(`Koppelingen in ${table} konden niet worden verwijderd`, error);
  }
  const { error } = await supabaseClient.from('recipes').delete().in('id', recipeIds).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Recepten konden niet worden verwijderd: ' + error.message);
    return;
  }
  bulkSelectedIds.clear();
  closeBulkDeleteModal();
  await loadDatabaseState();
  renderRecipes();
  refreshSidebar();
  toast(`${list.length} recepten verwijderd`);
}

function renderCategoryBar() {
  let all = ['Alles', ...categories];
  $('categoryBar').innerHTML = all
    .map(
      c =>
        `<button class="btn ${(c === 'Alles' && activeCat === '') || c === activeCat ? 'gold' : ''}" onclick="filterCat('${escJs(c === 'Alles' ? '' : c)}')">${esc(c)}</button>`
    )
    .join('');
}

function filterCat(c) {
  activeCat = c;
  activeFolderCategory = '';
  go('recipes');
}

async function toggleFavorite(id) {
  if (demoMode) {
    const exists = favorites.includes(id);
    favorites = exists ? favorites.filter(x => String(x) !== String(id)) : [...favorites, id];
    refreshSidebar();
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
  refreshSidebar();
  if ($('favorites').classList.contains('active')) renderFavorites();
  if ($('recipes').classList.contains('active')) renderRecipes();
  if ($('detail').classList.contains('active')) openRecipe(id);
}
