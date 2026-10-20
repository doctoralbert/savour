(function(){
  function safe(v){return String(v??'').trim()}
  function titleMatches(r,q){return !q||safe(r.title).toLocaleLowerCase('nl-NL').includes(q.toLocaleLowerCase('nl-NL'))}
  function managementList(){
    const q=safe(window.bulkManageQuery||'');
    return visibleRecipeList().filter(r=>titleMatches(r,q));
  }
  function v10Row(r,manage){
    const id=escAttr(r.id);
    const check=manage?`<label class="bulk-check" onclick="event.stopPropagation()"><input type="checkbox" value="${id}" ${bulkSelectedIds.has(String(r.id))?'checked':''} onclick="event.stopPropagation();toggleBulkRecipe('${id}')" aria-label="Selecteer ${escAttr(r.title)}"><span>Selecteer</span></label>`:'';
    return `<div class="recipe-library-row ${manage?'bulk-active':''}" role="button" tabindex="0" onclick="openRecipe('${id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('${id}')}" aria-label="${escAttr(r.title||'Naamloos recept')}">${check}<span class="recipe-library-name">${esc(r.title||'Naamloos recept')}</span><span class="recipe-library-arrow" aria-hidden="true">›</span></div>`;
  }
  window.renderRecipes=function(){
    if(!currentUser)return;
    renderRecipeAlphabet();
    renderCategoryBar();
    const all=visibleRecipeList();
    const list=bulkDeleteMode?managementList():all;
    const countEl=$('recipeCount');
    if(countEl)countEl.textContent=`${all.length} recepten${window.activeRecipeLetter?' · '+window.activeRecipeLetter:''}`;
    const host=$('recipeGrid');if(!host)return;
    let html='';
    if(bulkDeleteMode){
      html+=`<div class="bulk-toolbar"><div><strong>${bulkSelectedIds.size}</strong> geselecteerd</div><div class="bulk-actions"><button class="btn small" onclick="v10SelectMatches()">Selecteer overeenkomsten</button><button class="btn small" onclick="selectVisibleBulk()">Selecteer zichtbare</button><button class="btn small" onclick="clearBulkSelection()">Selectie wissen</button>${bulkSelectedIds.size?`<button class="btn small delete-recipe" onclick="deleteBulkSelected()">Verwijderen (${bulkSelectedIds.size})</button>`:''}<button class="btn small" onclick="toggleBulkDeleteMode()">Klaar</button></div></div>`;
      html+=`<div class="bulk-filter"><input id="bulkManageQuery" value="${escAttr(window.bulkManageQuery||'')}" placeholder="Selecteer op naam, bijvoorbeeld: 1" oninput="v10SetBulkQuery(this.value)"><span class="mini">${list.length} overeenkomsten</span></div><div class="bulk-hint">Typ bijvoorbeeld <b>1</b> en kies ‘Selecteer overeenkomsten’ om alle recepten met dat teken in de naam te selecteren. Ingrediënten en stappen worden hier niet getoond.</div>`;
    }else{
      html+=`<div class="recipe-library-tools"><span class="mini">${all.length} recepten · één overzicht</span><button class="btn small" onclick="toggleBulkDeleteMode()">Verwijder recepten</button></div>`;
    }
    html+=list.length?`<div class="recipe-library-list">${list.map(r=>v10Row(r,bulkDeleteMode)).join('')}</div>`:`<div class="empty">Geen recepten gevonden.</div>`;
    host.innerHTML=html;
  };
  window.v10SetBulkQuery=function(v){window.bulkManageQuery=v||'';renderRecipes()};
  window.v10SelectMatches=function(){const q=safe(window.bulkManageQuery||'');if(!q){toast('Vul eerst een zoekterm in');return;}managementList().forEach(r=>bulkSelectedIds.add(String(r.id)));renderRecipes()};
  window.toggleBulkDeleteMode=function(){bulkDeleteMode=!bulkDeleteMode;if(!bulkDeleteMode)window.bulkManageQuery='';renderRecipes()};
  window.selectVisibleBulk=function(){managementList().forEach(r=>bulkSelectedIds.add(String(r.id)));renderRecipes()};
  window.clearBulkSelection=function(){bulkSelectedIds.clear();renderRecipes()};
  window.toggleBulkRecipe=function(id){const k=String(id);if(bulkSelectedIds.has(k))bulkSelectedIds.delete(k);else bulkSelectedIds.add(k);renderRecipes()};
})();
