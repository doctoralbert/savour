// Savour 3.0 v8 stability layer: preserve the v6 library UX while making rendering resilient.
(function () {
  function v8SafeText(v) {
    return String(v ?? '').trim();
  }
  function v8RecipeMatches(r) {
    const title = v8SafeText(r?.title).toLowerCase();
    const ingredients = Array.isArray(r?.ingredients) ? r.ingredients.join(' ') : '';
    const steps = Array.isArray(r?.steps) ? r.steps.join(' ') : '';
    const q = v8SafeText($('mobileRecipeSearch')?.value || $('globalSearch')?.value)
      .toLowerCase()
      .trim();
    return !q || title.includes(q) || ingredients.toLowerCase().includes(q) || steps.toLowerCase().includes(q);
  }
  window.visibleRecipeList = function () {
    let list = (Array.isArray(recipes) ? recipes : []).filter(r => {
      if (window.activeRecipeLetter && v8SafeText(r.title).charAt(0).toUpperCase() !== window.activeRecipeLetter)
        return false;
      if (
        activeFolderCategory &&
        !folders.some(
          f =>
            String(f.id) === String(activeFolderCategory) &&
            Array.isArray(f.recipeIds) &&
            f.recipeIds.some(id => String(id) === String(r.id))
        )
      )
        return false;
      if (activeCat && v8SafeText(r.category) !== v8SafeText(activeCat)) return false;
      return v8RecipeMatches(r);
    });
    return list.sort((a, b) => v8SafeText(a.title).localeCompare(v8SafeText(b.title), 'nl', { sensitivity: 'base' }));
  };
  window.renderRecipes = function () {
    if (!currentUser) return;
    if (typeof renderRecipeAlphabet === 'function') renderRecipeAlphabet();
    if (typeof renderCategoryBar === 'function') renderCategoryBar();
    const list = visibleRecipeList();
    if ($('recipeCount'))
      $('recipeCount').textContent =
        `${list.length} recepten${window.activeRecipeLetter ? ' · ' + window.activeRecipeLetter : ''}`;
    if ($('recipeGrid'))
      $('recipeGrid').innerHTML = list.length
        ? `<div class="recipe-grid-v6">${list.map(r => compactCard(r)).join('')}</div>`
        : `<div class="empty">Geen recepten gevonden.</div>`;
  };
  // Always keep the management pages populated from the current in-memory database state.
  window.renderFolderManage = function () {
    if (!currentUser) return;
    const host = $('managePersonalFolders');
    if (!host) return;
    const list = (
      typeof getOrderedPersonalFolders30 === 'function' ? getOrderedPersonalFolders30() : folders || []
    ).filter(f => !f.system && f.name !== 'A t/m Z');
    host.innerHTML = list.length
      ? list
          .map(f => v6ManagerItem('personal', f, (getCategorySettings()?.selected || []).includes(String(f.id))))
          .join('')
      : '<div class="empty">Nog geen recepten mappen. Maak je eerste map aan.</div>';
  };
  window.renderSharedManage = function () {
    if (!currentUser) return;
    const host = $('manageSharedMaps');
    if (!host) return;
    const list = typeof getOrderedSharedMaps30 === 'function' ? getOrderedSharedMaps30() : sharedMaps || [];
    host.innerHTML = list.length
      ? list
          .map(m => v6ManagerItem('shared', m, (getSharedMenuSettings30()?.selected || []).includes(String(m.id))))
          .join('')
      : '<div class="empty">Nog geen gedeelde mappen. Maak je eerste map aan.</div>';
  };
  // Re-open the A–Z view cleanly when the user chooses All recipes.
  const originalGoV8 = window.go;
  window.go = function (id) {
    if (id === 'recipes') {
      activeFolderCategory = '';
    }
    return originalGoV8.apply(this, arguments);
  };
})();
