// Receptkaart en het verversen van de zijbalk. Er is geen apart startscherm meer: na inloggen opent
// Savour direct "Alle recepten".

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
            ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromShared('${r.id}')">Uit keukenteam verwijderen</button>`
            : context === 'sharedFolder'
              ? `<button class="btn small" onclick="event.stopPropagation();removeRecipeFromSharedFolder('${r.id}')">Uit map verwijderen</button>`
              : '';
  return `<article class="card" onclick="openRecipe('${r.id}','${context}')"><div class="card-body"><div class="cat">${esc(r.category || 'Eigen recepten')}</div><div class="row"><h3>${esc(r.title)}</h3><button class="fav" title="${isFav ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}" onclick="event.stopPropagation();toggleFavorite('${r.id}')">${isFav ? '★' : '☆'}</button></div>${r.yield ? `<div class="yield">${esc(r.yield)}</div>` : ''}<div class="mini" style="margin-top:9px">${r.ingredients.length} ingrediënten · ${r.steps.length} bereidingsstappen</div><div style="display:flex;justify-content:flex-end;margin-top:12px">${action}</div></div></article>`;
}

// Na een wijziging (recept, map, keukenteam) de mappenlijsten in de zijbalk bijwerken.
function refreshSidebar() {
  if (!currentUser) return;
  renderSharedNav();
  renderCategoryNav();
}
