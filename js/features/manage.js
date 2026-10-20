// Beheerpagina's voor mappen: volgorde slepen, kiezen wat in de zijbalk staat, hernoemen en verwijderen.

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
