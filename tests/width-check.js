// Draait de regressietest op de huidige schermbreedte.
// window.__mode = 'save'    -> bewaart de uitkomst als referentie voor deze breedte (localStorage)
// window.__mode = 'compare' -> vergelijkt met de bewaarde referentie en toont waar het verschilt
(async () => {
  const out = await eval(await (await fetch('/tests/regression.js', { cache: 'no-store' })).text());
  const key = 'widthBase_' + innerWidth;
  const now = { html: window.__regression, css: window.__regressionStyle };
  if (window.__mode === 'save') {
    localStorage.setItem(key, JSON.stringify(now));
    return { width: innerWidth, saved: true, errors: out.errors };
  }
  const base = JSON.parse(localStorage.getItem(key) || 'null');
  if (!base) return { width: innerWidth, error: 'geen referentie voor deze breedte' };
  const diffs = {};
  for (const kind of ['html', 'css']) {
    for (const k of Object.keys(base[kind])) {
      const a = base[kind][k].split('\n'),
        b = (now[kind][k] || '').split('\n');
      if (a.join('\n') === b.join('\n')) continue;
      const lines = [];
      for (let i = 0; i < Math.max(a.length, b.length) && lines.length < 4; i++)
        if (a[i] !== b[i]) lines.push({ i, before: (a[i] || '').slice(0, 300), after: (b[i] || '').slice(0, 300) });
      diffs[k + ' ' + kind] = lines;
    }
  }
  return { width: innerWidth, errors: out.errors, changed: Object.keys(diffs).length, diffs };
})();
