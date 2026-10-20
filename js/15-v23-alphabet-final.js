(function () {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const escA = window.escAttr || (v => String(v ?? '').replace(/[^a-zA-Z0-9_-]/g, ''));
  const safeA = v => String(v ?? '');
  window.savourAlphabet = { library: '', favorite: '' };
  function drawAlphabet(hostId, kind) {
    const host = document.getElementById(hostId);
    if (!host) return;
    const active = window.savourAlphabet[kind] || '';
    host.innerHTML =
      letters
        .map(
          l =>
            `<button type="button" class="${active === l ? 'active' : ''}" onclick="window.setSavourAlphabet('${kind}','${l}')">${l}</button>`
        )
        .join('') +
      `<button type="button" class="${!active ? 'active' : ''}" onclick="window.setSavourAlphabet('${kind}','')">Alles</button>`;
  }
  window.setSavourAlphabet = function (kind, letter) {
    window.savourAlphabet[kind] = letter;
    if (kind === 'library') window.renderRecipes();
    else window.renderFavorites();
  };
  function byLetter(list, kind) {
    const l = window.savourAlphabet[kind] || '';
    return l ? list.filter(r => safeA(r.title).trim().toLocaleUpperCase('nl-NL').startsWith(l)) : list;
  }
  const oldRenderRecipes = window.renderRecipes;
  window.renderRecipes = function () {
    drawAlphabet('recipeAlphabet', 'library');
    if (!currentUser) return;
    const q = (
      document.getElementById('mobileRecipeSearch')?.value ||
      document.getElementById('globalSearch')?.value ||
      ''
    )
      .toLowerCase()
      .trim();
    let list = (recipes || []).filter(
      r =>
        (!activeFolderCategory ||
          folders.some(
            f =>
              String(f.id) === String(activeFolderCategory) &&
              ((f.system && f.name === 'A t/m Z') || f.recipeIds.includes(r.id))
          )) &&
        (!activeCat || r.category === activeCat) &&
        (!q ||
          safeA(r.title).toLowerCase().includes(q) ||
          safeA(r.ingredients?.join(' ')).toLowerCase().includes(q) ||
          safeA(r.steps?.join(' ')).toLowerCase().includes(q))
    );
    list = byLetter(list, 'library');
    if (typeof window.renderCompact === 'function') window.renderCompact(list, 'recipeGrid', 'recipeCount', 'library');
    else oldRenderRecipes.apply(this, arguments);
  };
  const oldRenderFavorites = window.renderFavorites;
  window.renderFavorites = function () {
    drawAlphabet('favoriteAlphabet', 'favorite');
    if (!currentUser) return;
    let list = (favorites || []).map(id => (recipes || []).find(r => String(r.id) === String(id))).filter(Boolean);
    list = byLetter(list, 'favorite');
    if (typeof window.renderCompact === 'function')
      window.renderCompact(list, 'favoriteGrid', 'favoriteCount', 'favorite');
    else oldRenderFavorites.apply(this, arguments);
  };
  document.addEventListener('DOMContentLoaded', () => {
    drawAlphabet('recipeAlphabet', 'library');
    drawAlphabet('favoriteAlphabet', 'favorite');
  });
})();
