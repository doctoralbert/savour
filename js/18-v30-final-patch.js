(function(){
  const $=id=>document.getElementById(id);
  const escV30=window.esc||((v)=>String(v??''));
  const attrV30=window.escAttr||escV30;
  const getMap=id=>(sharedMaps||[]).find(m=>String(m.id)===String(id));
  const isOwner=m=>!!currentUser&&m&&String(m.ownerId)===String(currentUser.id);
  const labels={about:'Over Savour',faq:'Veelgestelde vragen',terms:'Algemene voorwaarden',privacy:'Privacybeleid',contact:'Contact',bug:'Bug doorgeven',support:'Steun Savour'};

  // Authenticated users keep the authenticated app shell on footer/information pages.
  window.openPublicInfo=function(id){
    const allowed=Object.keys(labels); id=allowed.includes(id)?id:'about'; window.currentPublicInfo=id;
    if(currentUser){
      showApp(id);
      const c=(typeof siteCopy!=='undefined'&&siteCopy.nl)?siteCopy.nl:{};
      const titleEl=$(id+'Title'),leadEl=$(id+'Lead'),noteEl=$(id+'Note'),bodyEl=$(id+'Body');
      if(titleEl)titleEl.textContent=c[id+'Title']||labels[id];
      if(leadEl)leadEl.textContent=c[id+'Lead']||'';
      if(noteEl)noteEl.textContent=c[id+'Note']||'';
      if(bodyEl)bodyEl.innerHTML=c[id]||'<p>Deze pagina wordt voorbereid.</p>';
      window.scrollTo(0,0); return;
    }
    const shell=$('publicInfoShell'); if(!shell)return;
    $('landingView').style.display='none'; $('appShell').style.display='none'; $('publicRecipeShell').style.display='none'; if($('publicInviteShell'))$('publicInviteShell').style.display='none'; shell.style.display='flex';
    const c=(typeof siteCopy!=='undefined'&&siteCopy.nl)?siteCopy.nl:{};
    $('publicInfoTitle').textContent=c[id+'Title']||labels[id]; $('publicInfoLead').textContent=c[id+'Lead']||''; $('publicInfoNote').textContent=c[id+'Note']||''; $('publicInfoBody').innerHTML=c[id]||'<p>Deze pagina wordt voorbereid.</p>'; window.scrollTo(0,0);
  };

  // Simplified scaling: target numeric yield / base numeric yield = factor, unit text does not affect the factor.
  window.calculateScale=function(){
    const r=(recipes||[]).find(x=>String(x.id)===String(currentId));
    const parse=window.parseYield||function(v){const m=String(v??'').trim().match(/^([0-9]+(?:[.,][0-9]+)?|[0-9]+\s*\/\s*[0-9]+)\s*(.*)$/);if(!m)return null;const value=m[1].includes('/')?(()=>{const [a,b]=m[1].split('/').map(Number);return b?a/b:NaN})():Number(m[1].replace(',','.'));return Number.isFinite(value)&&value>0?{value,unit:m[2].trim().toLowerCase()}:null};
    const base=parse(r&&r.yield),raw=String($('scaleTarget')?.value||'').trim(),target=parse(raw);
    if(!r||!base||!target){toast?.('Vul een geldige nieuwe opbrengst in, bijvoorbeeld 15 platen of 30 liter.');return}
    const factor=target.value/base.value,fmt=window.formatNumber||((n)=>String(Math.round(n*10000)/10000)),esc=window.esc||((x)=>String(x??''));
    function scaleLine(line){const s=String(line||'');if(/naar smaak|naar behoefte|scheut|snuf|mespunt|eventueel|evt\.?/i.test(s))return esc(s)+' <span class="scale-note">(niet automatisch omgerekend)</span>';const m=s.match(/^\s*([0-9]+(?:[.,][0-9]+)?)/);if(!m)return esc(s);const n=Number(m[1].replace(',','.'));return esc(s.replace(m[1],fmt(n*factor)))}
    const result=$('scaleResult');if(!result)return;result.innerHTML='<b>'+esc(r.title||'')+'</b><p class="muted">'+esc(String(r.yield||''))+' → '+esc(raw)+' · factor '+fmt(factor)+'</p>'+((r.ingredients||[]).map(x=>'<div class="ingredient">'+scaleLine(x)+'</div>').join('')||'<div class="muted">Geen ingrediënten beschikbaar.</div>');
    let btn=$('scalePrintButton');if(!btn){btn=document.createElement('button');btn.id='scalePrintButton';btn.className='btn';btn.textContent='Print omgerekend recept';btn.onclick=window.printScaledRecipe;$('scaleModal')?.querySelector('.actions')?.appendChild(btn)}
    window._savourScaled={recipe:r,rawTarget:raw,factor,format:fmt,scaleLine};
  };
  window.printScaledRecipe=function(){const s=window._savourScaled;if(!s){toast?.('Reken eerst het recept om.');return}const esc=window.esc||((x)=>String(x??''));const ingredients=(s.recipe.ingredients||[]).map(x=>'<li>'+s.scaleLine(x)+'</li>').join('');const steps=(s.recipe.steps||[]).map(x=>'<li>'+esc(x)+'</li>').join('');const doc='<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>'+esc(s.recipe.title)+'</title><style>body{font-family:Arial,sans-serif;padding:28px;color:#111}li{margin:7px 0}</style></head><body><h1>'+esc(s.recipe.title)+'</h1><p>'+esc(String(s.recipe.yield||''))+' → '+esc(s.rawTarget)+' · factor '+s.format(s.factor)+'</p><h2>Ingrediënten</h2><ul>'+ingredients+'</ul><h2>Bereiding</h2><ol>'+steps+'</ol></body></html>';const w=window.open('','_blank');if(!w){toast?.('Pop-up blokkering voorkomt printen.');return}w.document.write(doc);w.document.close();w.focus();w.print()};

  function addQuickButton(hostId,text,handler){const host=$(hostId);if(!host)return;const old=host.parentElement?.querySelector('[data-savour-v30-quick="'+hostId+'"]');if(old)return;const b=document.createElement('button');b.type='button';b.className='savour-v30-quick-add';b.dataset.savourV30Quick=hostId;b.innerHTML='<span class="ico">＋</span>'+text;b.onclick=handler;host.insertAdjacentElement('afterend',b)}
  const oldCatNav=window.renderCategoryNav; window.renderCategoryNav=function(){if(typeof oldCatNav==='function')oldCatNav();addQuickButton('categoryNav','Recepten map toevoegen',()=>newFolder())};
  const oldSharedNav=window.renderSharedNav; window.renderSharedNav=function(){if(typeof oldSharedNav==='function')oldSharedNav();addQuickButton('sharedNav','Gedeelde map toevoegen',()=>newSharedMap())};

  window.renderSharedMapManage=function(id){
    id=id||currentShared; currentShared=id; const m=getMap(id),host=$('sharedMapManageWrap'); if(!host)return;
    if(!m){host.innerHTML='<div class="empty">Gedeelde map niet gevonden.</div>';return}
    const own=isOwner(m),members=m.members||[],cover=m.photo?'<img class="savour-v30-cover" src="'+attrV30(m.photo)+'" alt="Foto van '+escV30(m.name)+'">':'<div class="savour-v30-cover-empty">Nog geen foto voor deze gedeelde map.</div>',shareUrl='https://savour.page/join/'+encodeURIComponent(m.publicKey||m.id);
    host.innerHTML='<div class="section-head"><div><div class="eyebrow">Gedeelde map beheren</div><h1 style="font-family:Playfair Display;margin:6px 0 4px">'+escV30(m.name)+'</h1><p class="muted" style="margin:0">'+members.length+' leden · '+(m.recipeIds||[]).length+' recepten</p></div><button class="btn" onclick="go(\'shared\')">← Terug</button></div><div class="savour-v30-manage-grid"><div class="savour-v30-manage-card"><h3>Algemeen</h3>'+cover+'<div class="savour-v30-manage-actions">'+(own?'<button class="btn" onclick="renameSharedMap(\''+attrV30(m.id)+'\')">Naam wijzigen</button><label class="btn">Afbeelding wijzigen<input type="file" accept="image/*" onchange="saveSharedPhoto(\''+attrV30(m.id)+'\',this)" style="display:none"></label><button class="btn" style="border-color:#704a43;color:#d5aaa0" onclick="deleteSharedMap(\''+attrV30(m.id)+'\')">Gedeelde map verwijderen</button>':'<span class="muted">Alleen de eigenaar kan de mapinstellingen wijzigen.</span>')+'</div><div style="margin-top:18px"><h3>Delen</h3><div class="sharelink">'+escV30(shareUrl)+'</div><div class="savour-v30-manage-actions" style="margin-top:10px"><button class="btn gold" onclick="inviteShared(\''+attrV30(m.id)+'\')">Delen / uitnodigen</button><button class="btn" onclick="navigator.clipboard?.writeText(\''+attrV30(shareUrl)+'\').then(()=>toast(\'Link gekopieerd\'))">Link kopiëren</button></div></div></div><div class="savour-v30-manage-card"><h3>Leden & rechten</h3><p class="muted" style="font-size:12px;line-height:1.5">Owner beheert de map. Editor kan recepten toevoegen en bewerken. Viewer kan recepten bekijken.</p><div>'+members.map((x,i)=>'<div class="savour-v30-member"><div><b>'+escV30(x.name||'Teamlid')+'</b><small class="muted" style="display:block">'+escV30(x.email||'')+(x.account?' · account actief':'')+'</small></div><select '+(!own?'disabled':'')+' onchange="changeMemberRole(\''+attrV30(m.id)+'\','+i+',this.value)"><option value="owner" '+(x.role==='owner'?'selected':'')+'>Owner</option><option value="editor" '+(x.role==='editor'?'selected':'')+'>Editor</option><option value="viewer" '+(x.role==='viewer'?'selected':'')+'>Viewer</option></select></div>').join('')+'</div>'+(own?'<button class="btn" style="margin-top:12px;width:100%" onclick="openMember(\''+attrV30(m.id)+'\')">＋ Lid toevoegen</button>':'')+'</div></div>';
  };
  const oldRenderShared=window.renderShared; window.renderShared=function(id){if(typeof oldRenderShared==='function')oldRenderShared(id);const m=getMap(id),host=$('sharedWrap');if(!m||!host)return;const actions=host.querySelector('.shared-map-actions');if(actions&&isOwner(m)&&!actions.querySelector('[data-savour-v30-manage]')){const b=document.createElement('button');b.className='btn compact-action';b.dataset.savourV30Manage='1';b.title='Beheer gedeelde map';b.innerHTML='⚙<span>Beheer</span>';b.onclick=()=>{currentShared=m.id;go('sharedMapManage');renderSharedMapManage(m.id)};actions.appendChild(b)}};
  const oldGo=window.go; window.go=function(id){if(id==='sharedMapManage'){oldGo('sharedMapManage');renderSharedMapManage(currentShared);return}return oldGo.apply(this,arguments)};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{try{renderCategoryNav();renderSharedNav()}catch(e){console.error(e)}},50));
})();
