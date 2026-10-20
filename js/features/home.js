// Startscherm.

function card(r, context = 'library') {
  let isFav = favorites.includes(r.id);
  let action =
    context === 'library'
      ? `<button class="btn small delete-recipe" onclick="event.stopPropagation();deleteRecipe('${r.id}')">Verwijderen uit bibliotheek</button>`
      : context === 'favorite'
        ? `<button class="btn small" onclick="event.stopPropagation();toggleFavorite('${r.id}')">Verwijderen uit favorieten</button>`
        : context === 'folder'
          ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromFolder('${r.id}')">Uit map verwijderen</button>`
          : context === 'shared'
            ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromShared('${r.id}')">Uit gedeelde map verwijderen</button>`
            : context === 'sharedFolder'
              ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromSharedFolder('${r.id}')">Uit map verwijderen</button>`
              : '';
  return `<article class="card" onclick="openRecipe('${r.id}','${context}')"><div class="card-body"><div class="cat">${esc(r.category || 'Eigen recepten')}</div><div class="row"><h3>${esc(r.title)}</h3><button class="fav" title="${isFav ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}" onclick="event.stopPropagation();toggleFavorite('${r.id}')">${isFav ? '★' : '☆'}</button></div>${r.yield ? `<div class="yield">${esc(r.yield)}</div>` : ''}<div class="mini" style="margin-top:9px">${r.ingredients.length} ingrediënten · ${r.steps.length} bereidingsstappen</div><div style="display:flex;justify-content:flex-end;margin-top:12px">${action}</div></div></article>`;
}

function renderHome() {
  if (!currentUser) return;
  const pf = getOrderedPersonalFolders30(),
    sm = getOrderedSharedMaps30();
  $('countStat').textContent = recipes.length;
  $('folderStat').textContent = pf.length;
  $('favoriteStat').textContent = favorites.filter(id => recipes.some(r => r.id === id)).length;
  $('sharedStat').textContent = sm.length;
  $('homeCards').innerHTML = recipes.slice(0, 8).map(card).join('');
  $('folderGrid').innerHTML = pf.map(f => folderCard(f)).join('');
  $('sideFolders').innerHTML =
    pf
      .slice(0, 6)
      .map(
        f =>
          `<div onclick="openFolder('${escAttr(f.id)}')" style="cursor:pointer"><b>${esc(f.name)}</b><small>${folderCount(f)} recepten</small></div>`
      )
      .join('') || `<div class="muted">Nog geen mappen.</div>`;
  $('sideFavorites').innerHTML =
    favorites
      .slice(0, 5)
      .map(id => recipes.find(r => r.id === id))
      .filter(Boolean)
      .map(
        r =>
          `<div onclick="openRecipe('${escAttr(r.id)}')" style="cursor:pointer"><b>${esc(r.title)}</b><small>${esc(r.category || 'Eigen recepten')}</small></div>`
      )
      .join('') || `<div class="muted">Nog geen favorieten.</div>`;
  $('sideShared').innerHTML =
    sm
      .slice(0, 5)
      .map(
        m =>
          `<div onclick="openShared('${escAttr(m.id)}')" style="cursor:pointer"><b>${esc(m.name)}</b><small>${m.recipeIds.length} recepten · ${m.members.length} leden</small></div>`
      )
      .join('') || `<div class="muted">Nog geen gedeelde mappen.</div>`;
  renderSharedNav();
  renderCategoryNav();
}
