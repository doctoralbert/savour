// Draait de regressietest en vergelijkt elke stap met tests/expected.json (de vastgelegde nulmeting).
// Verschilt een stap, dan staat de volledige schermtekst in window.__regression[stapnaam] om te onderzoeken.
// De opmaakmetingen (#stijl) hangen af van de venstergrootte; die staat in expected.json onder "_venster".
(async () => {
  const out = await eval(await (await fetch('/tests/regression.js', { cache: 'no-store' })).text());
  const expected = await (await fetch('/tests/expected.json', { cache: 'no-store' })).json();
  const venster = `${innerWidth}x${innerHeight}`;
  const keys = Object.keys(expected).filter(k => !k.startsWith('_'));
  const changed = keys.filter(k => expected[k] !== out.results[k]);
  return {
    errors: out.errors,
    venster:
      venster === expected._venster
        ? venster
        : `${venster} (nulmeting is gemaakt op ${expected._venster}: opmaakverschillen zeggen dan niets)`,
    same: keys.length - changed.length,
    total: keys.length,
    changed: Object.fromEntries(changed.map(k => [k, { expected: expected[k], now: out.results[k] }]))
  };
})();
