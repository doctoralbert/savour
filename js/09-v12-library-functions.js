(function () {
  window.savourV12LastBulkIndex = null;
  window.savourV12ListRows = function (list, bulk) {
    return list
      .map((r, i) => {
        const id = escAttr(r.id);
        if (bulk) {
          return `<label class="savour-v12-bulk-row"><input type="checkbox" data-v12-bulk="${id}" ${bulkSelectedIds.has(String(r.id)) ? 'checked' : ''} onclick="event.stopPropagation();savourV12ShiftSelect(event,${i},'${id}')"><span><b>${esc(r.title || 'Zonder titel')}</b></span></label>`;
        }
        const isFav = favorites.includes(r.id);
        return `<article class="savour-v12-row" role="button" tabindex="0" onclick="openRecipe('${id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('${id}')}"><span></span><span class="savour-v12-name">${esc(r.title || 'Zonder titel')}</span><span class="savour-v12-arrow">›</span></article>`;
      })
      .join('');
  };
  window.savourV12ShiftSelect = function (event, index, id) {
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
  };
  window.compactCard = function (r) {
    const id = escAttr(r.id);
    return `<article class="savour-v12-row" role="button" tabindex="0" onclick="openRecipe('${id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('${id}')}"><span></span><span class="savour-v12-name">${esc(r.title || 'Zonder titel')}</span><span class="savour-v12-arrow">›</span></article>`;
  };
  window.renderRecipes = function () {
    if (!currentUser) return;
    renderRecipeAlphabet();
    renderCategoryBar();
    const list = visibleRecipeList();
    $('recipeCount').textContent =
      `${list.length} recepten${window.activeRecipeLetter ? ' · ' + window.activeRecipeLetter : ''}`;
    $('recipeGrid').innerHTML = list.length
      ? `<div class="savour-v12-list">${savourV12ListRows(list, false)}</div>`
      : `<div class="empty">Geen recepten gevonden.</div>`;
  };
  window.renderV6BulkList = function () {
    const list = visibleRecipeList();
    const host = document.getElementById('v6BulkList');
    if (!host) return;
    host.innerHTML = list.length
      ? `<div class="savour-v12-bulk-list">${savourV12ListRows(list, true)}</div>`
      : '<div class="empty">Geen recepten gevonden.</div>';
  };
  window.v6BulkSelectAll = function () {
    visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
    window.savourV12LastBulkIndex = null;
    renderV6BulkList();
  };
  window.v6BulkClear = function () {
    bulkSelectedIds.clear();
    window.savourV12LastBulkIndex = null;
    renderV6BulkList();
  };
})();
