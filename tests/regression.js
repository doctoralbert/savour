// Regressietest voor herstructureringen.
// Gebruik: open de app lokaal (uitgelogd), plak dit in de browserconsole en vergelijk de uitkomst
// met de uitkomst van de vorige versie. Elke stap levert een vingerafdruk (hash) van wat er op het scherm staat.
(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(16); };
  const clean = html => String(html || '')
    .replace(/\s+/g, ' ')
    .replace(/demo-(?:f-)?\d{10,}/g, 'demo-ID'); // tijdstempel-id's
  const capture = () => {
    const parts = [];
    for (const sel of ['.view.active', '#categoryNav', '#sharedNav', '#publicInfoShell', '#landingView', '[id$="Modal"]', '[id$="modal"]', '.modal']) {
      document.querySelectorAll(sel).forEach(el => { if (sel === '.view.active' || getComputedStyle(el).display !== 'none' && el.getClientRects().length) parts.push(sel + '=' + el.outerHTML); });
    }
    return clean(parts.join('\n'));
  };
  const results = {};
  const errors = [];
  window.onerror = (m) => errors.push(String(m));
  const step = async (name, fn) => {
    try { await fn(); } catch (e) { errors.push(name + ': ' + e.message); }
    await wait(120);
    const html = capture();
    window.__regression = window.__regression || {};
    window.__regression[name] = html;
    results[name] = hash(html) + ':' + html.length;
  };
  // Een open inlogvenster bij het starten hangt af van timing; begin altijd met alle vensters dicht.
  document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  await step('01-landing', () => {});
  await step('02-public-faq', () => openPublicInfo('faq'));
  await step('03-demo-start', () => startDemo());
  await step('04-recipes', () => go('recipes'));
  await step('05-letter-D', () => setSavourAlphabet('library', 'D'));
  await step('06-letter-clear', () => setSavourAlphabet('library', ''));
  await step('07-search-gel', () => { const s = document.getElementById('globalSearch'); if (s) s.value = 'gel'; renderRecipes(); });
  await step('08-search-clear', () => { const s = document.getElementById('globalSearch'); if (s) s.value = ''; renderRecipes(); });
  await step('09-detail', () => openRecipe('demo-r3'));
  await step('10-scale-open', () => { openRecipe('demo-r0'); openScale('demo-r0'); });
  await step('11-scale-calc', () => { document.getElementById('scaleTarget').value = '3 liter'; calculateScale(); });
  await step('12-favorites', () => { document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open')); go('favorites'); });
  await step('13-fav-letter', () => setSavourAlphabet('favorite', 'D'));
  await step('14-folders', () => { setSavourAlphabet('favorite', ''); go('folders'); });
  await step('15-folder-detail', () => openFolder('demo-garde'));
  await step('16-shared', () => openShared('demo-shared'));
  await step('17-shared-manage', () => go('sharedMapManage'));
  await step('18-folder-manage', () => go('folderManage'));
  await step('19-shared-list-manage', () => go('sharedManage'));
  await step('20-categories', () => go('categories'));
  await step('21-home', () => go('home'));
  await step('22-settings', () => go('settings'));
  await step('23-import', () => go('import'));
  await step('24-bulk-on', () => { go('recipes'); toggleBulkDeleteMode(); });
  await step('25-bulk-select', () => selectVisibleBulk());
  await step('26-bulk-off', () => { clearBulkSelection(); toggleBulkDeleteMode(); });
  await step('27-about-loggedin', () => openPublicInfo('about'));
  await step('28-back-recipes', () => go('recipes'));
  return { results, errors };
})();
