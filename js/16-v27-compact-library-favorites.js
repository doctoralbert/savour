(function(){
  function v27Title(r){return String(r?.title||'');}
  function v27Row(r,i,context){
    const id=escAttr(r.id), fav=Array.isArray(favorites)&&favorites.includes(r.id);
    return '<div class="savour-v13-row savour-v27-row" role="button" tabindex="0" onclick="openRecipe(\''+id+'\',\''+context+'\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openRecipe(\''+id+'\',\''+context+'\')}" aria-label="Open '+esc(v27Title(r))+'"><span class="savour-v13-number">'+String(i+1).padStart(3,'0')+'</span><span class="savour-v13-name">'+esc(v27Title(r))+'</span><button class="savour-v27-favorite" title="'+(fav?'Verwijder uit favorieten':'Toevoegen aan favorieten')+'" aria-label="'+(fav?'Verwijder uit favorieten':'Toevoegen aan favorieten')+'" onclick="event.stopPropagation();toggleFavorite(\''+id+'\')">'+(fav?'★':'☆')+'</button><span class="savour-v13-arrow">›</span></div>';
  }
  window.v27Render=function(list,hostId,countId,context){
    const host=$(hostId); if(!host)return;
    const sorted=(list||[]).slice().sort((a,b)=>v27Title(a).localeCompare(v27Title(b),'nl',{sensitivity:'base'}));
    if($(countId))$(countId).textContent=sorted.length+' '+(context==='favorite'?'favorieten':'recepten');
    host.className='savour-v13-list savour-v27-list';
    host.innerHTML=sorted.length?sorted.map((r,i)=>v27Row(r,i,context)).join(''):'<div class="empty">'+(context==='favorite'?'Je hebt nog geen favorieten. Klik op ☆ bij een recept om het toe te voegen.':'Geen recepten gevonden.')+'</div>';
  }
  window.renderRecipes=function(){
    if(!currentUser)return;
    renderCategoryBar();
    let q=(($('mobileRecipeSearch')?.value||$('globalSearch')?.value||'')).toLowerCase().trim();
    let list=recipes.filter(r=>(!activeFolderCategory||folders.some(f=>String(f.id)===String(activeFolderCategory)&&((f.system&&f.name==='A t/m Z')||f.recipeIds.includes(r.id))))&&(!activeCat||r.category===activeCat)&&(!q||v27Title(r).toLowerCase().includes(q)||String(r.ingredients?.join(' ')||'').toLowerCase().includes(q)||String(r.steps?.join(' ')||'').toLowerCase().includes(q)));
    v27Render(list,'recipeGrid','recipeCount','library');
  };
  window.renderFavorites=function(){
    if(!currentUser)return;
    v27Render(favorites.map(id=>recipes.find(r=>String(r.id)===String(id))).filter(Boolean),'favoriteGrid','favoriteCount','favorite');
  };
})();
