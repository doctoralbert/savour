// Regressietest voor herstructureringen.
// Gebruik: open de app lokaal (uitgelogd), plak dit in de browserconsole en vergelijk de uitkomst
// met de uitkomst van de vorige versie. Elke stap levert een vingerafdruk (hash) van wat er op het scherm staat.
(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const hash = s => {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(16);
  };
  const clean = html =>
    String(html || '')
      .replace(/\s+/g, ' ')
      .replace(/demo-(?:f-)?\d{10,}/g, 'demo-ID'); // tijdstempel-id's
  const capture = () => {
    const parts = [];
    for (const sel of [
      '.view.active',
      '#categoryNav',
      '#sharedNav',
      '#publicInfoShell',
      '#landingView',
      '[id$="Modal"]',
      '[id$="modal"]',
      '.modal'
    ]) {
      document.querySelectorAll(sel).forEach(el => {
        if (sel === '.view.active' || (getComputedStyle(el).display !== 'none' && el.getClientRects().length))
          parts.push(sel + '=' + el.outerHTML);
      });
    }
    return clean(parts.join('\n'));
  };
  // Vingerafdruk van de opmaak: berekende stijl van de zichtbare elementen in beeld.
  const STYLE_PROPS = [
    'display',
    'position',
    'color',
    'background-color',
    'background-image',
    'font-family',
    'font-size',
    'font-weight',
    'letter-spacing',
    'padding',
    'margin',
    'border',
    'border-radius',
    'width',
    'height',
    'gap',
    'grid-template-columns',
    'flex-direction',
    'text-transform',
    'opacity',
    'box-shadow'
  ];
  const styleCapture = () => {
    const els = [...document.querySelectorAll('body *')].filter(
      el => el.getClientRects().length && !/^(SCRIPT|STYLE|LINK|BR)$/.test(el.tagName)
    );
    return els
      .slice(0, 600)
      .map(el => {
        const cs = getComputedStyle(el);
        return el.tagName + '.' + el.className + '{' + STYLE_PROPS.map(p => cs.getPropertyValue(p)).join(';') + '}';
      })
      .join('\n')
      .replaceAll(location.origin, '');
  };
  const results = {};
  const errors = [];
  window.onerror = m => errors.push(String(m));
  const step = async (name, fn) => {
    try {
      await fn();
    } catch (e) {
      errors.push(name + ': ' + e.message);
    }
    await wait(120);
    const html = capture();
    window.__regression = window.__regression || {};
    window.__regression[name] = html;
    results[name] = hash(html) + ':' + html.length;
    const css = styleCapture();
    window.__regressionStyle = window.__regressionStyle || {};
    window.__regressionStyle[name] = css;
    results[name + ' #stijl'] = hash(css) + ':' + css.length;
  };
  // Wacht tot de lettertypen geladen zijn: anders verschillen breedtes en daarmee de opmaakmeting.
  await document.fonts.ready;
  // Een open inlogvenster bij het starten hangt af van timing; begin altijd met alle vensters dicht.
  document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  await step('01-landing', () => {});
  await step('02-public-faq', () => openPublicInfo('faq'));
  await step('03-demo-start', () => startDemo());
  await step('04-recipes', () => go('recipes'));
  await step('05-letter-D', () => setSavourAlphabet('library', 'D'));
  await step('06-letter-clear', () => setSavourAlphabet('library', ''));
  await step('07-search-gel', () => {
    const s = document.getElementById('globalSearch');
    if (s) s.value = 'gel';
    renderRecipes();
  });
  await step('08-search-clear', () => {
    const s = document.getElementById('globalSearch');
    if (s) s.value = '';
    renderRecipes();
  });
  await step('09-detail', () => openRecipe('demo-r3'));
  await step('10-scale-open', () => {
    openRecipe('demo-r0');
    openScale('demo-r0');
  });
  await step('11-scale-calc', () => {
    document.getElementById('scaleTarget').value = '3 liter';
    calculateScale();
  });
  await step('12-favorites', () => {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
    go('favorites');
  });
  await step('13-fav-letter', () => setSavourAlphabet('favorite', 'D'));
  await step('14-folders', () => {
    setSavourAlphabet('favorite', '');
    go('folders');
  });
  await step('15-folder-detail', () => openFolder('demo-garde'));
  await step('16-shared', () => openShared('demo-shared'));
  await step('16b-shared-recipe-of-colleague', () => openRecipe('demo-anna-0', 'shared'));
  await step('16c-back-to-shared', () => openShared('demo-shared'));
  await step('17-shared-manage', () => go('sharedMapManage'));
  await step('18-folder-manage', () => go('folderManage'));
  await step('19-shared-list-manage', () => go('sharedManage'));
  await step('20-categories', () => go('categories'));
  await step('21-home', () => go('home'));
  await step('22-settings', () => go('settings'));
  await step('23-import', () => go('import'));
  await step('24-bulk-open', () => {
    go('recipes');
    openBulkDeleteModal();
  });
  await step('25-bulk-select', () => bulkModalSelectAll());
  await step('26-bulk-delete-two', async () => {
    bulkModalClear();
    bulkSelectedIds.add('demo-r0');
    bulkSelectedIds.add('demo-r1');
    const realConfirm = window.confirm;
    window.confirm = () => true;
    try {
      await deleteBulkModalSelection();
    } finally {
      window.confirm = realConfirm;
    }
  });
  await step('27-about-loggedin', () => openPublicInfo('about'));
  await step('28-back-recipes', () => go('recipes'));
  await step('29-category-filter', () => filterCat('Patisserie'));
  await step('30-category-all', () => filterCat(''));
  return { results, errors };
})();
