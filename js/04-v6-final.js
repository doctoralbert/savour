// ================= SAVOUR 3.0 v6 =================
// 1) Exact duplicate protection + cleanup
function v6Norm(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}
function v6Fingerprint(r) {
  return [
    v6Norm(r.title),
    v6Norm(r.yield),
    ...(Array.isArray(r.ingredients) ? r.ingredients : []).map(v6Norm),
    '§',
    ...(Array.isArray(r.steps) ? r.steps : []).map(v6Norm)
  ].join('|');
}
function v6FindDuplicate(title, ingredients, steps, yieldText, excludeId = null) {
  const fp = v6Fingerprint({ title, ingredients, steps, yield: yieldText });
  return recipes.find(r => String(r.id) !== String(excludeId ?? '') && v6Fingerprint(r) === fp) || null;
}
async function v6CleanupExactDuplicates() {
  if (!currentUser || demoMode || !Array.isArray(recipes) || recipes.length < 2) return false;
  const seen = new Map(),
    duplicates = [];
  for (const r of recipes) {
    const fp = v6Fingerprint(r);
    if (!fp) continue;
    if (seen.has(fp)) duplicates.push({ dup: r, keep: seen.get(fp) });
    else seen.set(fp, r);
  }
  if (!duplicates.length) return false;
  const ids = duplicates.map(x => x.dup.id);
  // Move relationship references to the retained recipe before deleting duplicates.
  for (const { dup, keep } of duplicates) {
    try {
      const tables = [
        ['folder_recipes', 'folder_id'],
        ['favorites', 'user_id'],
        ['shared_map_recipes', 'shared_map_id'],
        ['shared_folder_recipes', 'shared_folder_id']
      ];
      // Favorites has no recipe-only unique key that needs moving; delete duplicate favorite rows.
      const { data: folderLinks } = await supabaseClient
        .from('folder_recipes')
        .select('folder_id')
        .eq('recipe_id', dup.id);
      if (folderLinks?.length) {
        for (const x of folderLinks) {
          await supabaseClient
            .from('folder_recipes')
            .upsert({ folder_id: x.folder_id, recipe_id: keep.id }, { onConflict: 'folder_id,recipe_id' });
        }
        await supabaseClient.from('folder_recipes').delete().eq('recipe_id', dup.id);
      }
      await supabaseClient.from('favorites').delete().eq('recipe_id', dup.id).eq('user_id', currentUser.id);
      // Shared links are moved where possible, then duplicate links removed if a unique conflict exists.
      const { data: smLinks } = await supabaseClient
        .from('shared_map_recipes')
        .select('shared_map_id')
        .eq('recipe_id', dup.id);
      if (smLinks?.length) {
        for (const x of smLinks) {
          await supabaseClient
            .from('shared_map_recipes')
            .upsert({ shared_map_id: x.shared_map_id, recipe_id: keep.id }, { onConflict: 'shared_map_id,recipe_id' });
        }
        await supabaseClient.from('shared_map_recipes').delete().eq('recipe_id', dup.id);
      }
      const { data: sfLinks } = await supabaseClient
        .from('shared_folder_recipes')
        .select('shared_folder_id')
        .eq('recipe_id', dup.id);
      if (sfLinks?.length) {
        for (const x of sfLinks) {
          await supabaseClient
            .from('shared_folder_recipes')
            .upsert(
              { shared_folder_id: x.shared_folder_id, recipe_id: keep.id },
              { onConflict: 'shared_folder_id,recipe_id' }
            );
        }
        await supabaseClient.from('shared_folder_recipes').delete().eq('recipe_id', dup.id);
      }
      const { error } = await supabaseClient.from('recipes').delete().eq('id', dup.id).eq('user_id', currentUser.id);
      if (error) console.warn('Savour v6 duplicate cleanup skipped', dup.title, error);
    } catch (e) {
      console.warn('Savour v6 duplicate cleanup error', e);
    }
  }
  return true;
}
const SAVOUR_V6_BASE_LOAD = loadDatabaseState;
loadDatabaseState = async function () {
  const result = await SAVOUR_V6_BASE_LOAD();
  const cleaned = await v6CleanupExactDuplicates();
  if (cleaned) await SAVOUR_V6_BASE_LOAD();
  return result;
};

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
function renderV6BulkList() {
  const list = visibleRecipeList();
  const host = document.getElementById('v6BulkList');
  if (!host) return;
  host.innerHTML = list.length
    ? list
        .map(
          r =>
            `<label class="bulk-modal-row"><input type="checkbox" data-v6-bulk="${escAttr(r.id)}" ${bulkSelectedIds.has(String(r.id)) ? 'checked' : ''} onchange="v6SyncBulkCheckbox('${escAttr(r.id)}',this.checked)"><span><b>${esc(r.title)}</b><small>${esc(r.category || 'Eigen recepten')}</small></span><small>${r.ingredients.length} ingrediënten · ${r.steps.length} stappen</small></label>`
        )
        .join('')
    : '<div class="empty">Geen recepten gevonden.</div>';
}
function toggleBulkDeleteMode() {
  v6BulkModal().classList.add('open');
  renderV6BulkList();
}
function closeV6BulkModal() {
  document.getElementById('savourV6BulkModal')?.classList.remove('open');
}
function v6SyncBulkCheckbox(id, checked) {
  if (checked) bulkSelectedIds.add(String(id));
  else bulkSelectedIds.delete(String(id));
}
function v6BulkSelectAll() {
  visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
  renderV6BulkList();
}
function v6BulkClear() {
  bulkSelectedIds.clear();
  renderV6BulkList();
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
// Keep recipe cards completely normal outside the modal.
function renderRecipes() {
  if (!currentUser) return;
  renderRecipeAlphabet();
  renderCategoryBar();
  const list = visibleRecipeList();
  $('recipeCount').textContent =
    `${list.length} recepten${window.activeRecipeLetter ? ' · ' + window.activeRecipeLetter : ''}`;
  $('recipeGrid').innerHTML = list.length
    ? `<div class="recipe-grid-v6">${list.map(r => compactCard(r)).join('')}</div>`
    : `<div class="empty">Geen recepten gevonden.</div>`;
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

// 3) Recipe save + batch save duplicate protection.
const SAVOUR_V6_BASE_SAVE_RECIPE = saveRecipe;
saveRecipe = async function () {
  syncStructuredEditor();
  if (!currentUser) {
    toast('Log eerst in om een recept op te slaan');
    return;
  }
  const title = $('fTitle').value.trim();
  if (!title) {
    toast('Vul eerst een receptnaam in');
    $('fTitle').focus();
    return;
  }
  const ingredients = ($('fIngredients').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const steps = ($('fSteps').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const yieldText = $('fYield').value.trim();
  const duplicate = v6FindDuplicate(title, ingredients, steps, yieldText, currentId);
  if (duplicate) {
    toast(`Dit recept bestaat al: “${duplicate.title}”`);
    return;
  }
  return SAVOUR_V6_BASE_SAVE_RECIPE();
};
const SAVOUR_V6_BASE_BATCH_SAVE = saveBatchRecipes;
saveBatchRecipes = async function () {
  syncBatchDrafts();
  if (!currentUser || !batchDrafts.length) return SAVOUR_V6_BASE_BATCH_SAVE();
  const existing = new Map(recipes.map(r => [v6Fingerprint(r), r]));
  const seen = new Set();
  const filtered = [];
  for (const r of batchDrafts) {
    const fp = v6Fingerprint(r);
    if (existing.has(fp) || seen.has(fp)) {
      continue;
    }
    seen.add(fp);
    filtered.push(r);
  }
  if (filtered.length !== batchDrafts.length) {
    const skipped = batchDrafts.length - filtered.length;
    batchDrafts = filtered;
    renderBatchDrafts();
    toast(`${skipped} dubbel recept${skipped === 1 ? '' : 'en'} overgeslagen`);
    if (!batchDrafts.length) return;
  }
  return SAVOUR_V6_BASE_BATCH_SAVE();
};

// 4) Canonical management pages + consistent drag/drop and delete behaviour.
function v6ManagerItem(type, item, checked) {
  const count = type === 'personal' ? folderCount(item) : item.recipeIds.length;
  const id = escAttr(item.id);
  const open = type === 'personal' ? `openFolder('${id}')` : `openShared('${id}')`;
  const actions =
    type === 'personal'
      ? `<button class="btn small" onclick="event.stopPropagation();renameFolder('${id}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="event.stopPropagation();deleteFolder('${id}')">Verwijderen</button>`
      : String(item.ownerId) === String(currentUser.id)
        ? `<button class="btn small" onclick="event.stopPropagation();renameSharedMap('${id}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="event.stopPropagation();deleteSharedMap('${id}')">Verwijderen</button>`
        : '';
  return `<div class="manage-item" draggable="true" data-manage-kind="${type}" data-manage-id="${id}" ondragstart="managerDragStart(event)" ondragover="managerDragOver(event)" ondrop="managerDrop(event)" ondragend="this.classList.remove('dragging')"><input type="checkbox" data-manager-check="${type}" value="${id}" ${checked ? 'checked' : ''} onclick="event.stopPropagation()"><span class="drag-handle" title="Sleep om te verplaatsen">⋮⋮</span><div class="manage-name" onclick="${open}"><b>${esc(item.name)}</b><small>${count} recepten</small></div><div class="manage-actions">${actions}</div></div>`;
}
function renderFolderManage() {
  if (!currentUser) return;
  const ps = getCategorySettings();
  const personal = getOrderedPersonalFolders30().filter(f => !f.system);
  $('managePersonalFolders').innerHTML = personal.length
    ? personal.map(f => v6ManagerItem('personal', f, ps.selected.includes(String(f.id)))).join('')
    : '<div class="empty">Nog geen recepten mappen.</div>';
}
function renderSharedManage() {
  if (!currentUser) return;
  const ss = getSharedMenuSettings30();
  const shared = getOrderedSharedMaps30();
  $('manageSharedMaps').innerHTML = shared.length
    ? shared.map(m => v6ManagerItem('shared', m, ss.selected.includes(String(m.id)))).join('')
    : '<div class="empty">Nog geen gedeelde mappen.</div>';
}
function savePersonalManagerChanges() {
  if (!currentUser) return;
  const order = managerIds('personal'),
    selected = managerSelected('personal');
  saveCategorySettings(selected, order);
  saveStoredOrder(
    order.map(id => folders.find(f => String(f.id) === String(id))).filter(Boolean),
    `savour_personal_folder_order_${currentUser.id}`
  );
  renderCategoryNav();
  renderFolderManage();
  toast('Recepten mappen bijgewerkt');
}
function saveSharedManagerChanges() {
  if (!currentUser) return;
  const order = managerIds('shared'),
    selected = managerSelected('shared');
  saveSharedMenuSettings30(selected, order);
  saveStoredOrder(
    order.map(id => sharedMaps.find(m => String(m.id) === String(id))).filter(Boolean),
    SAVOUR30_SHARED_ORDER_KEY()
  );
  renderSharedNav();
  renderSharedManage();
  toast('Gedeelde mappen bijgewerkt');
}
async function deleteFolder(id) {
  if (!currentUser) return;
  const f = folders.find(x => String(x.id) === String(id));
  if (!f || f.system) return;
  if (
    !confirm(
      `Weet je zeker dat je de map “${f.name}” wilt verwijderen?\n\nDe map wordt verwijderd. De recepten blijven in Alle recepten staan.`
    )
  )
    return;
  if (demoMode) {
    folders = folders.filter(x => String(x.id) !== String(id));
    if (String(currentFolder) === String(id)) currentFolder = null;
    renderFolderManage();
    renderHome();
    renderCategoryNav();
    go('folderManage');
    toast('Receptenmap verwijderd');
    return;
  }
  // Explicitly remove links first for consistent behaviour regardless of FK cascade settings.
  const { error: linkError } = await supabaseClient.from('folder_recipes').delete().eq('folder_id', id);
  if (linkError) {
    console.error(linkError);
    toast('De recepten uit deze map konden niet worden losgekoppeld: ' + linkError.message);
    return;
  }
  const { error } = await supabaseClient.from('folders').delete().eq('id', id).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Receptenmap kon niet worden verwijderd: ' + error.message);
    return;
  }
  if (String(currentFolder) === String(id)) currentFolder = null;
  await loadDatabaseState();
  renderFolderManage();
  renderHome();
  renderCategoryNav();
  renderCategories();
  go('folderManage');
  toast('Receptenmap verwijderd');
}
async function deleteSharedMap(id) {
  if (!currentUser) return;
  const m = sharedMaps.find(x => String(x.id) === String(id));
  if (!m || String(m.ownerId) !== String(currentUser.id)) return;
  if (
    !confirm(
      `Weet je zeker dat je de gedeelde map “${m.name}” wilt verwijderen?\n\nDe gedeelde map en de indeling worden verwijderd. Je persoonlijke recepten blijven behouden.`
    )
  )
    return;
  if (demoMode) {
    sharedMaps = sharedMaps.filter(x => String(x.id) !== String(id));
    if (String(currentShared) === String(id)) currentShared = null;
    renderSharedManage();
    renderHome();
    go('sharedManage');
    return;
  }
  const { error } = await supabaseClient.from('shared_maps').delete().eq('id', id).eq('owner_id', currentUser.id);
  if (error) {
    console.error(error);
    toast(error.message || 'Gedeelde map kon niet worden verwijderd');
    return;
  }
  if (String(currentShared) === String(id)) currentShared = null;
  await loadDatabaseState();
  renderSharedManage();
  renderSharedNav();
  renderHome();
  go('sharedManage');
  toast('Gedeelde map verwijderd');
}
function go(id) {
  if (id !== 'import' && id !== 'editor') restoreEditorView();
  if ($('appShell')) $('appShell').classList.remove('public-info-mode');
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
  const view = $(id);
  if (!view) return;
  view.classList.add('active');
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'home') renderHome();
  if (id === 'recipes') renderRecipes();
  if (id === 'favorites') renderFavorites();
  if (id === 'folders' || id === 'folderManage') renderFolderManage();
  if (id === 'categories') renderCategories();
  if (id === 'folderDetail') renderFolderDetail();
  if (id === 'shared') renderShared(currentShared);
  if (id === 'sharedManage') renderSharedManage();
  if (id === 'sharedFolderDetail') renderSharedFolderDetail();
  if (id === 'settings') renderSettings();
  if (['about', 'faq', 'terms', 'privacy', 'contact', 'bug'].includes(id));
  if (id === 'import') {
    if ($('addChoiceGrid')?.style.display !== 'none' && $('addModeSwitch')?.style.display === 'none')
      resetImportSource();
    else if ($('addModeSwitch')?.style.display === 'none') {
      if ($('addChoiceGrid')) $('addChoiceGrid').style.display = 'grid';
      if ($('importPanel')) $('importPanel').style.display = 'none';
      if ($('inlineEditorHost')) $('inlineEditorHost').style.display = 'none';
    }
  }
  setTimeout(() => {}, 0);
}

// 5) Refresh/login now paints Home only after the database has finished loading.
const SAVOUR_V6_BASE_SESSION = startDatabaseSession;
startDatabaseSession = async function (user) {
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
      showApp('home');
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
};

// Apply the refresh-safe language and header button after DOM is ready.
window.addEventListener('popstate', () => {
  document.documentElement.lang = 'nl';
  const active = document.querySelector('#appShell .view.active')?.id;
  if (currentUser && active) renderActiveView(active);
});
setTimeout(() => {}, 0);
