(function(){
  const $=id=>document.getElementById(id);
  const safe=v=>String(v??'');
  const isOwner=m=>!!currentUser&&m&&String(m.ownerId)===String(currentUser.id);
  const canEditShared=m=>isOwner(m)||!!m?.members?.some(x=>String(x.userId)===String(currentUser?.id)&&['owner','editor'].includes(String(x.role)));
  const canManageShared=m=>isOwner(m);
  function repairRow(r,i,context){
    const fav=Array.isArray(favorites)&&favorites.includes(r.id);
    return `<div class="savour-repair-row" role="button" tabindex="0" onclick="openRecipe('${escAttr(r.id)}','${context}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('${escAttr(r.id)}','${context}')}" aria-label="Open ${esc(r.title)}"><span class="savour-repair-number">${String(i+1).padStart(2,'0')}</span><span class="savour-repair-name">${esc(r.title)}</span><button class="savour-repair-action" title="${fav?'Verwijder uit favorieten':'Toevoegen aan favorieten'}" aria-label="${fav?'Verwijder uit favorieten':'Toevoegen aan favorieten'}" onclick="event.stopPropagation();toggleFavorite('${escAttr(r.id)}')">${fav?'★':'☆'}</button><span class="savour-repair-arrow">›</span></div>`;
  }
  function renderCompact(list,host,countId,context){
    if(countId&&$(countId))$(countId).textContent=`${list.length} ${context==='favorite'?'favorieten':'recepten'}`;
    $(host).className='savour-repair-list';
    $(host).innerHTML=list.length?list.slice().sort((a,b)=>safe(a.title).localeCompare(safe(b.title),'nl')).map((r,i)=>repairRow(r,i,context)).join(''):`<div class="empty">${context==='favorite'?'Je hebt nog geen favorieten. Klik op ☆ bij een recept om het toe te voegen.':'Geen recepten gevonden.'}</div>`;
  }
  window.renderRecipes=function(){if(!currentUser)return;renderCategoryBar();let q=(($('mobileRecipeSearch')?.value||$('globalSearch')?.value||'')).toLowerCase().trim();let list=recipes.filter(r=>(!activeFolderCategory||folders.some(f=>String(f.id)===String(activeFolderCategory)&&((f.system&&f.name==='A t/m Z')||f.recipeIds.includes(r.id))))&&(!activeCat||r.category===activeCat)&&(!q||safe(r.title).toLowerCase().includes(q)||safe(r.ingredients?.join(' ')).toLowerCase().includes(q)||safe(r.steps?.join(' ')).toLowerCase().includes(q)));renderCompact(list,'recipeGrid','recipeCount','library');};
  window.renderFavorites=function(){if(!currentUser)return;let list=favorites.map(id=>recipes.find(r=>String(r.id)===String(id))).filter(Boolean);renderCompact(list,'favoriteGrid','favoriteCount','favorite');};
  function publicLinks(){return `<nav class="savour-public-links" aria-label="Publieke pagina's">${[['about','Over Savour'],['faq','Veelgestelde vragen'],['contact','Contact'],['bug','Bug doorgeven'],['terms','Algemene voorwaarden'],['privacy','Privacybeleid'],['support','Steun Savour']].map(([id,label])=>`<button type="button" onclick="openPublicInfo('${id}')">${label}</button>`).join('')}</nav>`}
  window.openPublicInfo=function(id){
    const allowed=['about','faq','terms','privacy','contact','bug','support']; if(!allowed.includes(id))id='about';window.currentPublicInfo=id;
    if(currentUser){$('landingView').style.display='none';$('publicInfoShell').style.display='none';$('publicRecipeShell').style.display='none';if($('publicInviteShell'))$('publicInviteShell').style.display='none';$('appShell').style.display='grid';go(id);return;}
    $('landingView').style.display='none';$('appShell').style.display='none';$('publicRecipeShell').style.display='none';$('publicInfoShell').style.display='flex';
    const c=siteCopy?.nl||{};const title=c[id+'Title']||({about:'Over Savour',faq:'Veelgestelde vragen',terms:'Algemene voorwaarden',privacy:'Privacybeleid',contact:'Contact',bug:'Bug doorgeven',support:'Steun Savour'}[id]||'Savour');
    const lead=c[id+'Lead']||'';const note=c[id+'Note']||'';const body=c[id]||'<p>Deze pagina wordt voorbereid.</p>';
    $('publicInfoTitle').textContent=title;$('publicInfoLead').textContent=lead;$('publicInfoNote').textContent=note;$('publicInfoBody').innerHTML=body+publicLinks();
    $('publicFooterSupport')?.classList.remove('support-hidden');window.scrollTo({top:0,behavior:'smooth'});
  };
  // Ensure public pages render when routed from a footer link while logged in as well.
  const oldGo=window.go;window.go=function(id){if(['about','faq','terms','privacy','contact','bug','support'].includes(id)&&!currentUser){openPublicInfo(id);return;}return oldGo.apply(this,arguments)};
  // Permission-aware shared map actions: viewers can read, editors can add, owner manages.
  window.openSharedRecipePicker=function(id){const m=sharedMaps.find(x=>String(x.id)===String(id));if(!m)return;if(!canEditShared(m)){toast('Je hebt geen rechten om recepten toe te voegen aan deze gedeelde map');return;}currentFolder='shared:'+id;$('folderModalTitle').textContent='Recepten aan gedeelde map toevoegen';$('pickerSearch').value='';filterPicker('');$('folderModal').classList.add('open');folderTargetRecipe=null;};
  window.openSharedFolderRecipePicker=function(mapId,folderId){const m=sharedMaps.find(x=>String(x.id)===String(mapId)),f=m?.folders?.find(x=>String(x.id)===String(folderId));if(!m||!f)return;if(!canEditShared(m)){toast('Je hebt geen rechten om recepten toe te voegen aan deze gedeelde map');return;}folderTargetRecipe=null;currentShared=mapId;currentFolder='sharedfolderpick:'+folderId;$('folderModalTitle').textContent='Recepten aan gedeelde map toevoegen';$('pickerSearch').value='';filterPicker('');$('folderModal').classList.add('open');};
  const oldRenderShared=window.renderShared;window.renderShared=function(id){oldRenderShared(id);const m=sharedMaps.find(x=>String(x.id)===String(id));if(!m)return;const host=$('sharedWrap');if(!host)return;const buttons=host.querySelectorAll('.shared-map-actions .compact-action');buttons.forEach(b=>{if(b.textContent.includes('Recept toevoegen'))b.style.display=canEditShared(m)?'':'none';if(b.textContent.includes('Nieuwe map'))b.style.display=canEditShared(m)?'':'none';});host.querySelectorAll('.member select').forEach(sel=>{sel.disabled=!canManageShared(m);});const add=host.querySelector('button[onclick*="openMember"]');if(add)add.style.display=canManageShared(m)?'':'none';};
  const oldCreateSharedFolder=window.createSharedFolder;window.createSharedFolder=async function(){const m=sharedMaps.find(x=>String(x.id)===String(currentShared));if(!canEditShared(m)){toast('Alleen een beheerder of editor kan een gedeelde map aanmaken');return;}return oldCreateSharedFolder.apply(this,arguments)};
  const oldSaveShared=window.saveSharedMapSelection;window.saveSharedMapSelection=async function(){const m=sharedMaps.find(x=>String(x.id)===String(String(currentFolder).slice(7)));if(!canEditShared(m)){toast('Je hebt geen rechten om recepten toe te voegen');return;}return oldSaveShared.apply(this,arguments)};
  const oldSaveSharedFolder=window.saveSharedFolderSelection;window.saveSharedFolderSelection=async function(){const m=sharedMaps.find(x=>String(x.id)===String(currentShared));if(!canEditShared(m)){toast('Je hebt geen rechten om recepten toe te voegen');return;}return oldSaveSharedFolder.apply(this,arguments)};
  // Render a full public footer also on the initial public shell, regardless of prior CSS layers.
  function ensurePublicFooter(){const shell=$('publicInfoShell');if(!shell)return;const body=$('publicInfoBody');if(body&&!body.querySelector('.savour-public-links'))body.insertAdjacentHTML('beforeend',publicLinks());}
  document.addEventListener('DOMContentLoaded',ensurePublicFooter);setTimeout(ensurePublicFooter,300);
})();
