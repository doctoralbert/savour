// Recept omrekenen naar een andere opbrengst.
// De rekenkern begrijpt hoeveelheden ("1", "1,5", "1/2", "1 1/2", "½", "1½", "2-3", "1.000") en eenheden in het
// Nederlands en Engels (tl/el, tsp/tbsp/cup, g/kg, ml/l, oz/lb). Na het omrekenen kiest hij een handige eenheid
// binnen dezelfde familie (20 tl → 6 ⅔ el, 24 tbsp → 1 ½ cup, 0,25 kg → 250 g) en rondt hij netjes af:
// lepels en cups als breuk, grammen en milliliters als heel getal. Het originele recept verandert nooit.

const FRACTION_CHARS = {
  '½': 1 / 2,
  '⅓': 1 / 3,
  '⅔': 2 / 3,
  '¼': 1 / 4,
  '¾': 3 / 4,
  '⅛': 1 / 8,
  '⅜': 3 / 8,
  '⅝': 5 / 8,
  '⅞': 7 / 8
};
const FRACTION_RE = '[½⅓⅔¼¾⅛⅜⅝⅞]';
// Eén getal: "1 1/2", "1/2", "1½", "1.000" (duizendtal), "1,5", "1.5", "½".
const NUMBER_SRC = `(?:\\d+\\s+\\d+\\s*\\/\\s*\\d+|\\d+\\s*\\/\\s*\\d+|\\d+\\s*${FRACTION_RE}|\\d{1,3}(?:\\.\\d{3})+(?![\\d,])|\\d+(?:[.,]\\d+)?|${FRACTION_RE})`;
const LEADING_AMOUNT = new RegExp(`^(\\s*)(${NUMBER_SRC})(?:\\s*(?:-|–|tot|to)\\s*(${NUMBER_SRC}))?`);

// Eenheden: familie, omrekening naar de basis (ml of g) en stijl (voor de weergave na omrekenen).
const UNIT_DEFS = [
  ['tl theelepel theelepels', 'spoon', 5, 'nl'],
  ['el eetlepel eetlepels', 'spoon', 15, 'nl'],
  ['tsp tsp. teaspoon teaspoons', 'spoon', 5, 'en'],
  ['tbsp tbsp. tbs tbs. tablespoon tablespoons', 'spoon', 15, 'en'],
  ['cup cups', 'spoon', 240, 'en'],
  ['ml milliliter milliliters millilitre millilitres', 'volume', 1, ''],
  ['cl centiliter centiliters', 'volume', 10, ''],
  ['dl deciliter deciliters', 'volume', 100, ''],
  ['l liter liters litre litres ltr', 'volume', 1000, ''],
  ['mg milligram', 'mass', 0.001, ''],
  ['g gr gr. gram grams gramm', 'mass', 1, ''],
  ['kg kilo kilogram kilograms', 'mass', 1000, ''],
  ['oz ounce ounces', 'imperial', 28.35, ''],
  ['lb lbs pound pounds', 'imperial', 453.6, ''],
  ['fl.oz floz', 'flimperial', 30, '']
];
const UNIT_INFO = new Map();
for (const [words, family, base, style] of UNIT_DEFS)
  for (const w of words.split(' ')) UNIT_INFO.set(w, { family, base, style, word: w });
// Eenheden zonder omrekening (wel herkend, zodat de hoeveelheid vet staat): stuks, takjes, snufjes enzovoort.
const COUNT_UNITS = new Set(
  'st st. stuk stuks takje takjes teen teentjes tenen blad blaadjes bos bosje bosjes plak plakken vel vellen blik blikken pak pakken zakje zakjes snuf mespunt scheut piece pieces clove cloves sprig sprigs bunch bunches pinch pinches slice slices sheet sheets can cans tin tins pack packs leaf leaves stick sticks'.split(
    ' '
  )
);
// Woorden die we als eenheid achter een hoeveelheid herkennen (voor vetgedrukte weergave).
const QUANTITY_UNITS = new Set([...UNIT_INFO.keys(), ...COUNT_UNITS]);

// Kwalitatieve hoeveelheden ("naar smaak", "snuf") worden bewust niet omgerekend.
const QUALITATIVE_AMOUNT =
  /naar smaak|naar behoefte|scheut|snuf|mespunt|eventueel|evt\.?|to taste|as needed|pinch|dash/i;

function parseAmount(text) {
  const t = String(text ?? '').trim();
  if (!t) return NaN;
  let m = t.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (m) return +m[3] ? +m[1] + +m[2] / +m[3] : NaN;
  m = t.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (m) return +m[2] ? +m[1] / +m[2] : NaN;
  m = t.match(new RegExp(`^(\\d*)\\s*(${FRACTION_RE})$`));
  if (m) return (+m[1] || 0) + FRACTION_CHARS[m[2]];
  if (/^\d{1,3}(\.\d{3})+$/.test(t)) return Number(t.replace(/\./g, ''));
  return Number(t.replace(',', '.'));
}

// Leest een opbrengst als "15 platen", "2,5 liter", "1/2 bak" of "½ liter" uit tot { value, unit }.
function parseYield(text) {
  const raw = String(text ?? '')
    .trim()
    .replace(/\s+/g, ' ');
  const m = raw.match(new RegExp(`^(${NUMBER_SRC})\\s*(.*)$`));
  if (!m) return null;
  const value = parseAmount(m[1]);
  if (!Number.isFinite(value) || value <= 0) return null;
  return { value, unit: (m[2] || '').trim().toLocaleLowerCase('nl-NL') };
}

// Leest de hoeveelheid vooraan een ingrediëntregel: { lead, amount, value, value2, unitText, unit, rest }.
// unit is de eenheid uit UNIT_INFO (of null bij stuks of zonder eenheid). null als er geen hoeveelheid staat.
function parseIngredientAmount(line) {
  const s = String(line || '');
  const m = s.match(LEADING_AMOUNT);
  if (!m) return null;
  const value = parseAmount(m[2]);
  if (!Number.isFinite(value)) return null;
  const value2 = m[3] ? parseAmount(m[3]) : null;
  let used = m[0].length;
  const after = s.slice(used);
  const w = after.match(/^(\s*)(fl\.?\s*oz\.?|[a-zA-Zà-ÿ]+\.?)/);
  let unitText = '';
  let unit = null;
  if (w) {
    const key = w[2].toLowerCase().replace(/\s+/g, '').replace(/\.$/, '');
    const keyDot = w[2].toLowerCase();
    if (key === 'floz' || key === 'fl.oz') unit = UNIT_INFO.get('fl.oz');
    else unit = UNIT_INFO.get(keyDot) || UNIT_INFO.get(key) || null;
    if (unit || COUNT_UNITS.has(keyDot) || COUNT_UNITS.has(key)) {
      unitText = w[2];
      used += w[0].length;
    }
  }
  return {
    lead: m[1],
    amount: s.slice(m[1].length, m[0].length).trim(),
    value,
    value2,
    unitText,
    unit,
    rest: s.slice(used)
  };
}

// Splitst "100 gram boter" in { amount: '100', unit: 'gram', rest: 'boter', value: 100 }; null zonder hoeveelheid.
function splitQuantity(line) {
  const p = parseIngredientAmount(line);
  if (!p) return null;
  return { amount: p.amount, unit: p.unitText, rest: p.rest.trim(), value: p.value };
}

// Splitst een ingrediëntregel in [hoeveelheid met eenheid, rest], precies zoals de tekst er staat (ook de spaties),
// zodat de hoeveelheid vet kan. Zonder hoeveelheid: ['', hele regel].
function quantityParts(line) {
  const s = String(line || '');
  const p = parseIngredientAmount(s);
  if (!p) return ['', s];
  const cut = s.length - p.rest.length;
  return [s.slice(0, cut), s.slice(cut)];
}

// ---- Getallen netjes tonen ----

function scaleDecimalComma() {
  return typeof currentLanguage === 'undefined' || currentLanguage !== 'en';
}

// Als breuk (lepels, cups, stuks, ounces): 6.667 → "6 ⅔", 0.5 → "½". Op ⅛, ⅓ of ⅔ afgerond.
function formatFraction(n) {
  const whole = Math.floor(n + 1e-9);
  const rest = n - whole;
  const options = [
    [0, ''],
    [1 / 8, '⅛'],
    [1 / 4, '¼'],
    [1 / 3, '⅓'],
    [3 / 8, '⅜'],
    [1 / 2, '½'],
    [5 / 8, '⅝'],
    [2 / 3, '⅔'],
    [3 / 4, '¾'],
    [7 / 8, '⅞'],
    [1, '']
  ];
  let best = options[0];
  for (const o of options) if (Math.abs(rest - o[0]) < Math.abs(rest - best[0])) best = o;
  const w = best[0] === 1 ? whole + 1 : whole;
  if (!best[1]) return String(w);
  return w ? `${w} ${best[1]}` : best[1];
}

// Als decimaal getal (grammen, liters): niet meer cijfers dan je op een weegschaal ziet.
function formatDecimal(n) {
  let v;
  if (n >= 100) v = Math.round(n);
  else if (n >= 10) v = Math.round(n * 2) / 2;
  else if (n >= 1) v = Math.round(n * 10) / 10;
  else v = Math.round(n * 100) / 100;
  const s = String(v);
  return scaleDecimalComma() ? s.replace('.', ',') : s;
}

// ---- Omrekenen met eenheden ----

const SPOON_WORDS = {
  nl: {
    short: { 5: ['tl', 'tl'], 15: ['el', 'el'] },
    long: { 5: ['theelepel', 'theelepels'], 15: ['eetlepel', 'eetlepels'] }
  },
  en: {
    short: { 5: ['tsp', 'tsp'], 15: ['tbsp', 'tbsp'], 240: ['cup', 'cups'] },
    long: { 5: ['teaspoon', 'teaspoons'], 15: ['tablespoon', 'tablespoons'], 240: ['cup', 'cups'] }
  }
};

// Kiest na het omrekenen de handigste eenheid binnen dezelfde familie. Geeft { value, word, fraction } terug.
function pickUnit(valueInBase, unit, unitText) {
  const plural = v => v > 1 + 1e-9;
  if (unit.family === 'spoon') {
    const lang = unit.style;
    const long = /lepel|spoon/i.test(unitText);
    const words = SPOON_WORDS[lang][long ? 'long' : 'short'];
    let size = 5;
    if (valueInBase >= 15 - 1e-9) size = 15;
    // Engelse keuken: cups vanaf ¼ cup, maar alleen als dat een nette breuk geeft (anders blijven het tablespoons);
    // vanaf 2 cups altijd cups.
    if (lang === 'en' && valueInBase >= 60 - 1e-9) {
      const cups = valueInBase / 240;
      const clean = [0, 1 / 4, 1 / 3, 1 / 2, 2 / 3, 3 / 4, 1].some(f => Math.abs(cups - Math.floor(cups) - f) < 0.02);
      if (clean || cups >= 2) size = 240;
    }
    if (lang === 'nl' && valueInBase > 150 + 1e-9) {
      // Meer dan 10 eetlepels: dan liever milliliters.
      return { value: valueInBase, word: 'ml', fraction: false };
    }
    const v = valueInBase / size;
    const [one, many] = words[size];
    return { value: v, word: plural(v) ? many : one, fraction: true };
  }
  if (unit.family === 'mass') {
    if (unit.base === 1000 && valueInBase < 1000 - 1e-9) return { value: valueInBase, word: 'g', fraction: false };
    if (unit.base <= 1 && valueInBase >= 10000) return { value: valueInBase / 1000, word: 'kg', fraction: false };
    return { value: valueInBase / unit.base, word: unitText, fraction: false };
  }
  if (unit.family === 'volume') {
    if (unit.base === 1000 && valueInBase < 100 - 1e-9) return { value: valueInBase, word: 'ml', fraction: false };
    if (unit.base < 1000 && valueInBase >= 10000) return { value: valueInBase / 1000, word: 'l', fraction: false };
    return { value: valueInBase / unit.base, word: unitText, fraction: false };
  }
  if (unit.family === 'imperial') {
    if (valueInBase >= 453.6 - 1e-6) {
      const v = valueInBase / 453.6;
      return { value: v, word: v > 1 ? 'lb' : 'lb', fraction: true };
    }
    return { value: valueInBase / 28.35, word: 'oz', fraction: true };
  }
  return { value: valueInBase / unit.base, word: unitText, fraction: true };
}

// Rekent één ingrediëntregel om. Geeft { qty, rest, note } terug: qty is de hoeveelheid met eenheid (voor vet),
// rest de rest van de regel. Zonder hoeveelheid: qty ''. Kwalitatief ("naar smaak"): ongewijzigd met note.
function scaleIngredient(line, factor = 1) {
  const s = String(line || '');
  const p = parseIngredientAmount(s);
  if (!p) return { qty: '', rest: s, note: '' };
  const original = s.slice(0, s.length - p.rest.length).trim();
  if (factor === 1) return { qty: original, rest: p.rest.trim(), note: '' };
  if (QUALITATIVE_AMOUNT.test(s)) return { qty: original, rest: p.rest.trim(), note: 'qualitative' };
  const unitText = p.unitText;
  // Bereik ("2-3 el"): beide getallen omrekenen, eenheid laten staan.
  if (p.value2 != null && Number.isFinite(p.value2)) {
    const fmt = v => (p.unit && !p.unit.family.match(/spoon|imperial/) ? formatDecimal(v) : formatFraction(v));
    return {
      qty: `${fmt(p.value * factor)}-${fmt(p.value2 * factor)}${unitText ? ' ' + unitText : ''}`,
      rest: p.rest.trim(),
      note: ''
    };
  }
  const scaled = p.value * factor;
  if (!p.unit) {
    // Stuks of zonder eenheid ("3 eieren", "2 takjes tijm"): als breuk.
    return { qty: `${formatFraction(scaled)}${unitText ? ' ' + unitText : ''}`, rest: p.rest.trim(), note: '' };
  }
  const pick = pickUnit(scaled * p.unit.base, p.unit, unitText);
  const num = pick.fraction ? formatFraction(pick.value) : formatDecimal(pick.value);
  return { qty: `${num} ${pick.word}`, rest: p.rest.trim(), note: '' };
}

// Ingrediëntregel omgerekend met een factor, als veilige tekst (voor het omrekenvenster en print).
function scaleIngredientLine(line, factor) {
  return esc(scaleIngredientText(line, factor));
}

// Zelfde omrekening als gewone tekst (voor printen).
function scaleIngredientText(line, factor) {
  const r = scaleIngredient(line, factor);
  const text = r.qty ? `${r.qty} ${r.rest}`.trim() : r.rest;
  return r.note === 'qualitative' ? `${text} (${t('niet omgerekend')})` : text;
}

// Ingrediëntregel voor de receptpagina: hoeveelheid + eenheid vet, omgerekend als factor ≠ 1.
function ingredientHtml(line, factor = 1) {
  const r = scaleIngredient(line, factor);
  const note = r.note === 'qualitative' ? ` <span class="scale-note">(${esc(t('niet omgerekend'))})</span>` : '';
  if (!r.qty) return `<span class="rp-ing-text">${esc(r.rest)}</span>${note}`;
  return `<strong class="rp-qty">${esc(r.qty)}</strong> <span class="rp-ing-text">${esc(r.rest)}</span>${note}`;
}

// ---- Omrekenen direct op de receptpagina ----

function recipePageYield() {
  const r = findRecipe(currentId);
  return { r, base: parseYield(r?.yield) };
}

function setRecipeYield(value) {
  const { r, base } = recipePageYield();
  if (!r || !base) return;
  const target = parseAmount(value);
  if (!Number.isFinite(target) || target <= 0) return;
  applyRecipeFactor(r, target / base.value, `${formatNumber(target)}${base.unit ? ' ' + base.unit : ''}`);
}

// Snelknoppen ½×, 2×, 3×, 4×: werken ook als het recept geen opbrengst heeft.
function setRecipeFactor(factor) {
  const { r, base } = recipePageYield();
  if (!r) return;
  const input = $('rpYieldInput');
  if (base && input) {
    input.value = formatNumber(base.value * factor);
    return setRecipeYield(input.value);
  }
  applyRecipeFactor(r, factor, `× ${formatNumber(factor)}`);
}

function applyRecipeFactor(r, factor, rawTarget) {
  document
    .querySelectorAll('.rp-multipliers button')
    .forEach(b => b.classList.toggle('is-on', Math.abs(+b.dataset.factor - factor) < 1e-9));
  const list = $('rpIngredients');
  if (list)
    list.querySelectorAll('[data-ing]').forEach(li => {
      const line = r.ingredients[Number(li.dataset.ing)];
      li.querySelector('.rp-ing-line').innerHTML = ingredientHtml(line, factor);
    });
  const label = $('rpFactor');
  if (label) label.textContent = factor === 1 ? '' : `× ${formatNumber(factor)}`;
  $('rpYieldReset')?.toggleAttribute('hidden', factor === 1);
  window._savourScaled =
    factor === 1
      ? null
      : {
          recipe: r,
          rawTarget: rawTarget,
          factor,
          format: formatNumber,
          scaleLine: l => scaleIngredientLine(l, factor)
        };
}

function stepRecipeYield(direction) {
  const { base } = recipePageYield();
  const input = $('rpYieldInput');
  if (!base || !input) return;
  const step = base.value >= 2 ? 1 : 0.5;
  const current = parseAmount(input.value) || base.value;
  const next = Math.max(step, Math.round((current + direction * step) / step) * step);
  input.value = formatNumber(next);
  setRecipeYield(input.value);
}

function resetRecipeYield() {
  setRecipeFactor(1);
}

// Knoppen ½× 2× 3× 4× onder (of in plaats van) de opbrengst.
function recipeMultipliersHtml(handler = 'setRecipeFactor') {
  return `<div class="rp-multipliers" role="group" aria-label="${esc(t('Omrekenen'))}">${[
    [0.5, '½×'],
    [2, '2×'],
    [3, '3×'],
    [4, '4×']
  ]
    .map(([f, label]) => `<button type="button" data-factor="${f}" onclick="${handler}(${f})">${label}</button>`)
    .join('')}</div>`;
}

// Print het recept zoals het op het scherm staat: omgerekend als er een andere opbrengst is gekozen.
function printCurrentRecipe() {
  if (window._savourScaled && String(window._savourScaled.recipe.id) === String(currentId)) printScaledRecipe();
  else printRecipe(currentId);
}

function printScaledRecipe() {
  const s = window._savourScaled;
  if (!s) {
    toast?.('Reken eerst het recept om.');
    return;
  }
  const r = s.recipe;
  const scaled = {
    ...r,
    yield: s.rawTarget.startsWith('×')
      ? `${r.yield ? r.yield + ' ' : ''}${s.rawTarget}`
      : `${r.yield || ''} → ${s.rawTarget} (factor ${s.format(s.factor)})`,
    ingredients: (r.ingredients || []).map(x => scaleIngredientText(x, s.factor))
  };
  const map = recipes.some(x => x.id === r.id) ? null : sharedMaps.find(m => m.recipeIds.includes(r.id));
  openPrintBundle([scaled], { mapId: map?.id || null });
}
