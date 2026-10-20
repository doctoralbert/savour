(function(){
  const escV21=window.esc||((x)=>String(x??''));
  const escAttrV21=window.escAttr||escV21;
  window.compactCard=function(r){
    const id=escAttrV21(r.id),fav=(favorites||[]).includes(r.id);
    return `<article class="card compact-recipe-card" onclick="openRecipe('${id}')"><div class="card-body"><div class="row"><h3>${escV21(r.title||'')}</h3><button class="fav" title="${fav?'Verwijder uit favorieten':'Voeg toe aan favorieten'}" aria-label="${fav?'Verwijder uit favorieten':'Voeg toe aan favorieten'}" onclick="event.stopPropagation();toggleFavorite('${id}')">${fav?'★':'☆'}</button></div><div class="compact-card-actions"><button class="btn small delete-recipe" title="Recept verwijderen" aria-label="Recept verwijderen" onclick="event.stopPropagation();deleteRecipe('${id}')">×</button></div></div></article>`;
  };
  window.parseYield=function(text){
    const raw=String(text??'').trim().replace(/\s+/g,' ');
    const m=raw.match(/^([0-9]+(?:[.,][0-9]+)?|[0-9]+\s*\/\s*[0-9]+)\s*(.*)$/);
    if(!m)return null;
    const value=m[1].includes('/')?(()=>{const [a,b]=m[1].split('/').map(v=>Number(v.trim()));return b?a/b:NaN})():Number(m[1].replace(',','.'));
    if(!Number.isFinite(value)||value<=0)return null;
    return {value,unit:(m[2]||'').trim().toLocaleLowerCase('nl-NL')};
  };
  window.calculateScale=function(){
    const r=(recipes||[]).find(x=>String(x.id)===String(window.currentId));
    const base=window.parseYield(r&&r.yield),raw=String(document.getElementById('scaleTarget')?.value||'').trim(),target=window.parseYield(raw);
    if(!r||!base||!target){window.toast&&toast('Vul een geldige opbrengst in, bijvoorbeeld 5 liter.');return;}
    if(base.unit&&target.unit&&base.unit!==target.unit){window.toast&&toast('Gebruik dezelfde eenheid als de oorspronkelijke opbrengst.');return;}
    const factor=target.value/base.value;
    const fmt=window.formatNumber||((n)=>String(Math.round(n*10000)/10000));
    const esc=window.esc||((x)=>String(x??''));
    const scaleLine=(line)=>{
      const s=String(line||'');
      if(/naar smaak|naar behoefte|scheut|snuf|mespunt|eventueel|evt\.?/i.test(s))return esc(s)+' <span class="scale-note">(niet automatisch omgerekend)</span>';
      return esc(s.replace(/^\s*([0-9]+(?:[.,][0-9]+)?|[0-9]+\s*\/\s*[0-9]+)\b/,(_,raw)=>{const n=raw.includes('/')?(()=>{const [a,b]=raw.split('/').map(v=>Number(v.trim()));return a/b})():Number(raw.replace(',','.'));return fmt(n*factor);}));
    };
    const result=document.getElementById('scaleResult');if(!result)return;
    result.innerHTML='<b>'+esc(r.title||'')+'</b><p class="muted">'+esc(String(r.yield||''))+' → '+esc(raw)+' · factor '+fmt(factor)+'</p>'+((r.ingredients||[]).map(x=>'<div class="ingredient">'+scaleLine(x)+'</div>').join('')||'<div class="muted">Geen ingrediënten beschikbaar.</div>');
  };
})();
