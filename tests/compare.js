// Draait de regressietest en vergelijkt elke stap met tests/expected.json (de vastgelegde nulmeting).
// Verschilt een stap, dan staat de volledige schermtekst in window.__regression[stapnaam] om te onderzoeken.
(async () => {
  const out = await eval(await (await fetch('/tests/regression.js', { cache: 'no-store' })).text());
  const expected = await (await fetch('/tests/expected.json', { cache: 'no-store' })).json();
  const changed = Object.keys(expected).filter(k => expected[k] !== out.results[k]);
  return {
    errors: out.errors,
    same: Object.keys(expected).length - changed.length,
    total: Object.keys(expected).length,
    changed: Object.fromEntries(changed.map(k => [k, { expected: expected[k], now: out.results[k] }]))
  };
})();
