// Draait de regressietest en vergelijkt elke stap met de opgeslagen nulmeting (localStorage '__regBase').
// Bij een verschil toont hij het eerste stukje waar de schermen uit elkaar lopen.
(async () => {
  const out = await eval(await (await fetch('/tests/regression.js', { cache: 'no-store' })).text());
  const base = JSON.parse(localStorage.getItem('__regBase') || '{}');
  const now = window.__regression || {};
  const diffs = {};
  for (const k of Object.keys(base)) {
    const a = base[k] || '', b = now[k] || '';
    if (a === b) continue;
    let i = 0; while (i < a.length && a[i] === b[i]) i++;
    diffs[k] = { at: i, before: a.slice(Math.max(0, i - 120), i + 200), after: b.slice(Math.max(0, i - 120), i + 200) };
  }
  return { errors: out.errors, same: Object.keys(base).length - Object.keys(diffs).length, total: Object.keys(base).length, diffs };
})();
