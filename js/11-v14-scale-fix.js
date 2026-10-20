(function () {
  window.parseYield = function (text) {
    const raw = String(text ?? '')
      .trim()
      .replace(/\s+/g, ' ');
    const m = raw.match(/^([0-9]+(?:[.,][0-9]+)?)\s*(.*)$/);
    if (!m) return null;
    const value = Number(m[1].replace(',', '.'));
    if (!Number.isFinite(value) || value <= 0) return null;
    return { value, unit: (m[2] || '').trim() };
  };
  window.calculateScale = function () {
    const r = (recipes || []).find(x => String(x.id) === String(currentId));
    const base = parseYield(r?.yield);
    const rawTarget = document.getElementById('scaleTarget')?.value || '';
    const target = parseYield(rawTarget);
    if (!r || !base || !target) {
      toast(t('Vul een geldige opbrengst in, bijvoorbeeld 5 liter.'));
      return;
    }
    const baseUnit = base.unit.toLocaleLowerCase('nl-NL').trim();
    const targetUnit = (target.unit || base.unit).toLocaleLowerCase('nl-NL').trim();
    if (baseUnit && targetUnit && baseUnit !== targetUnit) {
      toast(t('Gebruik dezelfde eenheid als de oorspronkelijke opbrengst.'));
      return;
    }
    const factor = target.value / base.value;
    const result = document.getElementById('scaleResult');
    if (!result) return;
    const shownTarget = target.unit ? rawTarget : (rawTarget + ' ' + base.unit).trim();
    const items = (r.ingredients || [])
      .map(x => '<div class="ingredient">' + scaleIngredient(x, factor) + '</div>')
      .join('');
    result.innerHTML =
      '<b>' +
      esc(r.title || '') +
      '</b><p class="muted">' +
      esc(String(r.yield || '')) +
      ' → ' +
      esc(shownTarget) +
      ' · factor ' +
      formatNumber(factor) +
      '</p>' +
      (items || '<div class="muted">' + esc(t('Geen ingrediënten beschikbaar.')) + '</div>');
  };
})();
