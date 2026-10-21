// Persoonlijke receptenmappen.

function folderCount(f) {
  return f.recipeIds.filter(id => recipes.some(r => r.id === id)).length;
}

function folderCard(f) {
  return `<div class="folder" onclick="openFolder('${f.id}')"><span class="ico">▱</span><b>${esc(f.name)}</b><small>${folderCount(f)} recepten${f.system ? ' · alfabetisch' : ''}</small>${f.system ? '' : `<div class="folder-actions"><button class="btn small rename-folder" onclick="event.stopPropagation();renameFolder('${f.id}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="event.stopPropagation();deleteFolder('${f.id}')">Map verwijderen</button></div>`}</div>`;
}

// Savour 3.0 v4 final behaviour overrides
function renderFolders() {
  if (!currentUser) return;
  const pf = getOrderedPersonalFolders().filter(f => !f.system);
  $('folderOverview').innerHTML =
    `<div class="panel" style="margin-bottom:14px"><p class="muted" style="margin:0;line-height:1.6">Organiseer je eigen recepten in mappen zoals jij werkt. De alfabetische A–Z-weergave vind je rechtstreeks in Alle recepten.</p></div><div class="folders">${pf.map(folderCard).join('')}</div>`;
}

function openFolder(id) {
  currentFolder = id;
  window.folderAlphabet = '';
  go('folderDetail');
}

function newFolder() {
  $('newFolderName').value = '';
  $('newFolderModal').classList.add('open');
  setTimeout(() => $('newFolderName')?.focus(), 30);
}

function closeNewFolder() {
  $('newFolderModal').classList.remove('open');
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

async function renameFolder(id) {
  if (!currentUser) return;
  const f = folders.find(x => String(x.id) === String(id));
  if (!f || f.system) return;
  const nextRaw = await askText('Nieuwe naam voor deze receptenmap', f.name);
  if (nextRaw === null) return;
  const next = nextRaw.trim();
  if (!next || next === f.name) return;
  if (folders.some(x => String(x.id) !== String(id) && !x.system && x.name.toLowerCase() === next.toLowerCase())) {
    toast('Deze receptenmap bestaat al');
    return;
  }
  if (demoMode) {
    f.name = next;
    renderFolders();
    renderFolderManage();
    renderHome();
    renderCategoryNav();
    if (String(currentFolder) === String(id)) renderFolderDetail();
    toast('Receptenmap hernoemd');
    return;
  }
  const { error } = await supabaseClient
    .from('folders')
    .update({ name: next })
    .eq('id', f.id)
    .eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Receptenmap kon niet worden hernoemd: ' + error.message);
    return;
  }
  await loadDatabaseState();
  renderFolders();
  renderFolderManage();
  renderHome();
  renderCategoryNav();
  renderCategories();
  if (String(currentFolder) === String(f.id)) renderFolderDetail();
  toast('Receptenmap hernoemd');
}

function renderFolderDetail() {
  if (!currentUser) return;
  const f = folders.find(x => String(x.id) === String(currentFolder).replace(/^folderpick:/, ''));
  if (!f) {
    go('folders');
    return;
  }
  let list = (f.recipeIds || []).map(id => recipes.find(r => String(r.id) === String(id))).filter(Boolean);
  const q = String(document.getElementById('globalSearch')?.value ?? '')
    .trim()
    .toLocaleLowerCase('nl')
    .trim();
  if (q) list = list.filter(r => recipeTitleOf(r).toLocaleLowerCase('nl').includes(q));
  const filtered = filterRecipesByLetter(list, window.folderAlphabet);
  const body = filtered.length
    ? '<div class="savour-v13-list">' + contextRecipeRowsHtml(filtered, 'folder') + '</div>'
    : '<div class="empty">Deze map bevat geen recepten voor deze selectie.</div>';
  document.getElementById('folderDetailWrap').innerHTML =
    '<div class="folder-detail-head"><div><div class="eyebrow">Receptenmap</div><h1 style="font-family:\'Playfair Display\';font-size:40px;margin:7px 0">' +
    esc(f.name) +
    '</h1><span class="pill">' +
    list.length +
    ' recepten</span></div><div class="folder-map-actions">' +
    (list.length
      ? '<button class="btn compact-action" onclick="printFolder(\'' +
        escJs(f.id) +
        '\')">⎙<span>Print map</span></button>'
      : '') +
    '<button class="btn compact-action" onclick="renameFolder(\'' +
    escJs(f.id) +
    '\')">✎<span>Naam wijzigen</span></button><button class="btn compact-action" onclick="deleteFolder(\'' +
    escJs(f.id) +
    '\')">×<span>Verwijderen</span></button><button class="btn compact-action" onclick="openRecipePickerForFolder(\'' +
    escJs(f.id) +
    '\')">＋<span>Recept toevoegen</span></button></div></div><div style="margin-top:18px">' +
    contextAlphabetHtml(window.folderAlphabet, 'filterFolderAlphabet') +
    '</div><div class="savour-v13-context-tools"><span class="mini">' +
    filtered.length +
    ' recepten' +
    (window.folderAlphabet ? ' · ' + window.folderAlphabet : '') +
    '</span></div>' +
    body;
}

async function deleteFolder(id) {
  if (!currentUser) return;
  const f = folders.find(x => String(x.id) === String(id));
  if (!f || f.system) return;
  if (
    !(await askConfirm(
      'Weet je zeker dat je de map “' + f.name + '” wilt verwijderen?\n\nDe recepten blijven in Alle recepten staan.'
    ))
  )
    return;
  if (demoMode) {
    folders = folders.filter(x => String(x.id) !== String(id));
    if (String(currentFolder) === String(id)) currentFolder = null;
    renderFolders();
    renderHome();
    renderCategoryNav();
    go('folders');
    toast('Receptenmap verwijderd');
    return;
  }
  // Eerst alleen de koppelingen verwijderen; daarna de map zelf. De recepten blijven behouden.
  const rel = await supabaseClient.from('folder_recipes').delete().eq('folder_id', id);
  if (rel.error) {
    console.error(rel.error);
    toast('Mapkoppelingen konden niet worden verwijderd: ' + rel.error.message);
    return;
  }
  const result = await supabaseClient.from('folders').delete().eq('id', id).eq('user_id', currentUser.id);
  if (result.error) {
    console.error(result.error);
    toast('Receptenmap kon niet worden verwijderd: ' + result.error.message);
    return;
  }
  if (String(currentFolder) === String(id)) currentFolder = null;
  await loadDatabaseState();
  renderFolders();
  renderHome();
  renderCategoryNav();
  renderCategories();
  go('folders');
  toast('Receptenmap verwijderd');
}

// Persoonlijke mappen in de zijbalk (alleen de mappen die de gebruiker heeft gekozen), plus snelknop.
function renderCategoryNav() {
  const el = $('categoryNav');
  if (!el) return;
  const settings = getCategorySettings();
  const ordered = getOrderedPersonalFolders();
  const byId = new Map(ordered.map(f => [String(f.id), f]));
  const chosen = settings.order
    .map(id => byId.get(String(id)))
    .filter(Boolean)
    .filter(f => settings.selected.includes(String(f.id)));
  el.innerHTML = chosen.length
    ? chosen
        .map(
          f =>
            `<button onclick="filterFolderCategory('${escJs(f.id)}')"><span class="ico">•</span>${esc(f.name)}</button>`
        )
        .join('')
    : `<div class="category-empty">Geen recepten mappen gekozen</div>`;
  addQuickButton('categoryNav', 'Recepten map toevoegen', () => newFolder());
}

function renderFolderManage() {
  if (!currentUser) return;
  const host = $('managePersonalFolders');
  if (!host) return;
  const list = getOrderedPersonalFolders().filter(f => !f.system && f.name !== 'A t/m Z');
  host.innerHTML = list.length
    ? list
        .map(f => managerItemHtml('personal', f, (getCategorySettings()?.selected || []).includes(String(f.id))))
        .join('')
    : '<div class="empty">Nog geen recepten mappen. Maak je eerste map aan.</div>';
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
  if ($('pickerHint')) $('pickerHint').hidden = true;
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
  if (
    !(await askConfirm('Recept uit deze map halen?\n\nHet blijft beschikbaar in Alle recepten.', {
      confirmLabel: 'Uit map halen',
      danger: false
    }))
  )
    return;
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
  pickerLastIndex = null;
  if ($('pickerHint')) $('pickerHint').hidden = items.length < 2;
  $('folderChecklist').innerHTML =
    items
      .map(
        (r, i) =>
          `<label class="check picker-row"><input type="checkbox" ${attr}="${r.id}" onclick="pickerCheckClick(event,${i})"> <span>${esc(r.title)}</span><span class="muted" style="margin-left:auto">${esc(r.category || 'Eigen recepten')}</span></label>`
      )
      .join('') || `<div class="empty">Geen recepten gevonden.</div>`;
}

// Shift ingedrukt houden selecteert (of deselecteert) alles tussen het vorige en dit vinkje.
let pickerLastIndex = null;
function pickerCheckClick(event, index) {
  const boxes = [...document.querySelectorAll('#folderChecklist input[type="checkbox"]')];
  if (event.shiftKey && pickerLastIndex !== null) {
    const from = Math.min(pickerLastIndex, index),
      to = Math.max(pickerLastIndex, index);
    for (let i = from; i <= to; i++) boxes[i].checked = event.target.checked;
  }
  pickerLastIndex = index;
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

function getOrderedPersonalFolders() {
  return orderedByStoredIds(folders, `savour_personal_folder_order_${currentUser?.id || 'local'}`);
}

function filterFolderCategory(id) {
  openFolder(String(id));
}
