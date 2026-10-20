// Printen van recepten en mappen.

function uniqueRecipes(list) {
  const seen = new Set();
  return list.filter(r => {
    if (!r || seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}

function openPrintBundle(list) {
  list = uniqueRecipes(list);
  if (!list.length) {
    toast('Geen recepten om te printen');
    return;
  }
  let old = document.getElementById('printBundle');
  if (old) old.remove();
  let el = document.createElement('div');
  el.id = 'printBundle';
  el.className = 'print-bundle';
  el.innerHTML = printBundleHtml(list);
  document.body.appendChild(el);
  let cleanup = () => {
    el.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  setTimeout(() => window.print(), 80);
}

function printRecipe(id) {
  let r = recipes.find(x => x.id === id);
  if (!r) return;
  openPrintBundle([r]);
}

function printBundleHtml(list) {
  return uniqueRecipes(list)
    .map(r => {
      const ingredients = r.ingredients?.length ? r.ingredients : [];
      const steps = r.steps?.length ? r.steps : [];
      return `<article class="print-bundle-recipe">${r.photo ? `<img class="print-photo" src="${esc(r.photo)}" alt="">` : ''}<h1>${esc(r.title)}</h1>${r.yield ? `<div class="print-yield">Opbrengst · ${esc(r.yield)}</div>` : ''}<div class="print-bundle-columns"><div><h3>Ingrediënten</h3>${ingredients.length ? ingredients.map(x => `<div class="ingredient">${esc(x)}</div>`).join('') : `<div class="muted">Geen ingrediënten vastgelegd.</div>`}</div>${steps.length ? `<div><h3>Bereiding</h3>${steps.map((x, i) => `<div class="step"><b>${i + 1}.</b> ${esc(x)}</div>`).join('')}</div>` : ''}</div><div class="print-bundle-footer">Savour</div></article>`;
    })
    .join('');
}

function printFolder(id) {
  if (!currentUser) return;
  let f = folders.find(x => x.id === id);
  if (!f) return;
  let list = f.system && f.name === 'A t/m Z' ? [...recipes] : recipes.filter(r => f.recipeIds.includes(r.id));
  if (!list.length) {
    toast('Deze map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list);
}

function printSharedMap(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  let list = m.recipeIds.map(rid => recipes.find(r => r.id === rid)).filter(Boolean);
  if (!list.length) {
    toast('Deze gedeelde map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list);
}

function printSharedFolder(mapId, folderId) {
  let m = sharedMaps.find(x => x.id === mapId);
  let f = m?.folders?.find(x => x.id === folderId);
  if (!m || !f) return;
  let list = (f.system && f.name === 'A t/m Z' ? m.recipeIds : f.recipeIds)
    .map(rid => recipes.find(r => r.id === rid))
    .filter(Boolean);
  if (!list.length) {
    toast('Deze gedeelde map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list);
}
