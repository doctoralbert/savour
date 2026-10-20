(function(){
  const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const text=v=>String(v??'');
  function draw(hostId,kind){
    const host=document.getElementById(hostId); if(!host)return;
    const active=(window.savourAlphabet&&window.savourAlphabet[kind])||'';
    host.innerHTML=`<button type="button" class="${!active?'active':''}" onclick="window.setSavourAlphabet('${kind}','')">Alle</button>`+
      letters.map(l=>`<button type="button" class="${active===l?'active':''}" onclick="window.setSavourAlphabet('${kind}','${l}')">${l}</button>`).join('');
  }
  function filter(list,kind){
    const active=(window.savourAlphabet&&window.savourAlphabet[kind])||'';
    return active?list.filter(r=>text(r.title).trim().toLocaleUpperCase('nl-NL').startsWith(active)):list;
  }
  window.setSavourAlphabet=function(kind,letter){
    window.savourAlphabet=window.savourAlphabet||{library:'',favorite:''};
    window.savourAlphabet[kind]=String(letter||'').toUpperCase();
    if(kind==='library')window.renderRecipes(); else window.renderFavorites();
  };
  const renderRecipes=window.renderRecipes;
  window.renderRecipes=function(){
    draw('recipeAlphabet','library');
    if(!currentUser)return;
    const q=(document.getElementById('mobileRecipeSearch')?.value||document.getElementById('globalSearch')?.value||'').toLowerCase().trim();
    let list=(recipes||[]).filter(r=>!q||text(r.title).toLowerCase().includes(q)||text(r.ingredients?.join(' ')).toLowerCase().includes(q)||text(r.steps?.join(' ')).toLowerCase().includes(q));
    if(activeFolderCategory){list=list.filter(r=>folders?.some(f=>String(f.id)===String(activeFolderCategory)&&((f.system&&f.name==='A t/m Z')||(f.recipeIds||[]).some(id=>String(id)===String(r.id)))))}
    if(activeCat)list=list.filter(r=>r.category===activeCat);
    list=filter(list,'library');
    if(typeof window.v27Render==='function')window.v27Render(list,'recipeGrid','recipeCount','library');
    else if(typeof renderRecipes==='function')renderRecipes();
  };
  const renderFavorites=window.renderFavorites;
  window.renderFavorites=function(){
    draw('favoriteAlphabet','favorite');
    const list=filter((favorites||[]).map(id=>(recipes||[]).find(r=>String(r.id)===String(id))).filter(Boolean),'favorite');
    if(typeof window.v27Render==='function')window.v27Render(list,'favoriteGrid','favoriteCount','favorite');
    else if(typeof renderFavorites==='function')renderFavorites();
  };
  document.addEventListener('DOMContentLoaded',()=>{draw('recipeAlphabet','library');draw('favoriteAlphabet','favorite');});
})();
