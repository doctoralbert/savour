(function(){
  function v9RecipeRow(r){
    const id=escAttr(r.id);
    const check=bulkDeleteMode?`<label class="bulk-check" onclick="event.stopPropagation()"><input type="checkbox" data-bulk-recipe value="${id}" ${bulkSelectedIds.has(String(r.id))?'checked':''} onclick="event.stopPropagation();toggleBulkRecipe('${id}')"><span>Selecteren</span></label>`:'';
    return `<div class="recipe-library-row ${bulkDeleteMode?'bulk-active':''}" role="button" tabindex="0" onclick="openRecipe('${id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('${id}')}" aria-label="${escAttr(r.title)}">${check}<span class="recipe-library-name">${esc(r.title||'Naamloos recept')}</span><span class="recipe-library-arrow" aria-hidden="true">›</span></div>`;
  }
  window.renderRecipes=function(){
    if(!currentUser)return;
    renderRecipeAlphabet();
    renderCategoryBar();
    const list=visibleRecipeList();
    $('recipeCount').textContent=`${list.length} recepten${window.activeRecipeLetter?' · '+window.activeRecipeLetter:''}`;
    const bulkBar=bulkDeleteMode?`<div class="bulk-toolbar"><div><strong>${bulkSelectedIds.size}</strong> geselecteerd</div><div class="bulk-actions"><button class="btn small" onclick="selectVisibleBulk()">Alles selecteren</button><button class="btn small" onclick="clearBulkSelection()">Selectie wissen</button>${bulkSelectedIds.size?`<button class="btn small delete-recipe" onclick="deleteBulkSelected()">Verwijderen (${bulkSelectedIds.size})</button>`:''}<button class="btn small" onclick="toggleBulkDeleteMode()">Klaar</button></div></div>`:`<div class="recipe-library-tools"><span class="mini">${list.length} recepten · één overzicht</span><button class="btn small" onclick="toggleBulkDeleteMode()">Verwijder recepten</button></div>`;
    $('recipeGrid').innerHTML=bulkBar+(list.length?`<div class="recipe-library-list">${list.map(v9RecipeRow).join('')}</div>`:`<div class="empty">Geen recepten gevonden.</div>`);
  };
})();
