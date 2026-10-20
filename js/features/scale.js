// Recept omrekenen naar een andere opbrengst.

function openScale(id) {
  let r = findRecipe(id);
  if (!r) return;
  let y = parseYield(r.yield);
  if (!y) {
    toast(t('Recept omrekenen is beschikbaar zodra een opbrengst is ingevuld.'));
    return;
  }
  currentId = id;
  $('scaleBaseText').textContent = `${t('Basis')}: ${r.yield}`;
  $('scaleTarget').value = '';
  $('scaleResult').innerHTML =
    `<div class="muted">${esc(t('Vul een nieuwe opbrengst in en klik op Omrekenen.'))}</div>`;
  $('scaleModal').classList.add('open');
}

function closeScale() {
  $('scaleModal').classList.remove('open');
}

// Leest een opbrengst als "15 platen", "2,5 liter" of "1/2 bak" uit tot { value, unit }.
function parseYield(text) {
  const raw = String(text ?? '')
    .trim()
    .replace(/\s+/g, ' ');
  const m = raw.match(/^([0-9]+(?:[.,][0-9]+)?|[0-9]+\s*\/\s*[0-9]+)\s*(.*)$/);
  if (!m) return null;
  const value = m[1].includes('/')
    ? (() => {
        const [a, b] = m[1].split('/').map(v => Number(v.trim()));
        return b ? a / b : NaN;
      })()
    : Number(m[1].replace(',', '.'));
  if (!Number.isFinite(value) || value <= 0) return null;
  return { value, unit: (m[2] || '').trim().toLocaleLowerCase('nl-NL') };
}

// Kwalitatieve hoeveelheden ("naar smaak", "snuf") worden bewust niet omgerekend.
const QUALITATIVE_AMOUNT = /naar smaak|naar behoefte|scheut|snuf|mespunt|eventueel|evt\.?/i;

// Woorden die we als eenheid achter een hoeveelheid herkennen (voor vetgedrukte weergave).
const QUANTITY_UNITS = new Set(
  'g gr gram gram. kg kilo mg l liter dl deciliter cl centiliter ml milliliter el eetlepel eetlepels tl theelepel theelepels st stuk stuks takje takjes teen teentjes blad blaadjes bos bosje bosjes plak plakken vel vellen blik pak zakje snuf mespunt scheut'.split(
    ' '
  )
);

function parseAmount(text) {
  const t = String(text).replace(/\s+/g, '');
  if (t.includes('/')) {
    const [a, b] = t.split('/').map(Number);
    return b ? a / b : NaN;
  }
  return Number(t.replace(',', '.'));
}

// Splitst "100 gram boter" in { amount: '100', unit: 'gram', rest: 'boter', value: 100 }; null zonder hoeveelheid.
function splitQuantity(line) {
  const s = String(line || '');
  const m = s.match(/^(\s*)(\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?)(\s*)([^\s\d][^\s]*)?/);
  if (!m) return null;
  const unitWord = m[4] || '';
  const isUnit = QUANTITY_UNITS.has(unitWord.toLowerCase().replace(/[.,]$/, ''));
  const used = m[1].length + m[2].length + (isUnit ? m[3].length + unitWord.length : 0);
  return { amount: m[2], unit: isUnit ? unitWord : '', rest: s.slice(used).trim(), value: parseAmount(m[2]) };
}

// Ingrediëntregel omgerekend met een factor, als veilige tekst (voor het omrekenvenster en print).
function scaleIngredientLine(line, factor) {
  const s = String(line || '');
  if (QUALITATIVE_AMOUNT.test(s)) return esc(s) + ' <span class="scale-note">(niet automatisch omgerekend)</span>';
  const m = s.match(/^\s*([0-9]+(?:[.,][0-9]+)?)/);
  if (!m) return esc(s);
  const n = Number(m[1].replace(',', '.'));
  return esc(s.replace(m[1], formatNumber(n * factor)));
}

// Ingrediëntregel voor de receptpagina: hoeveelheid + eenheid vet, omgerekend als factor ≠ 1.
function ingredientHtml(line, factor = 1) {
  const s = String(line || '');
  const q = splitQuantity(s);
  if (!q || !Number.isFinite(q.value)) return `<span class="rp-ing-text">${esc(s)}</span>`;
  const qualitative = QUALITATIVE_AMOUNT.test(s);
  const amount = factor === 1 || qualitative ? q.amount : formatNumber(q.value * factor);
  const note = factor !== 1 && qualitative ? ' <span class="scale-note">(niet omgerekend)</span>' : '';
  return `<strong class="rp-qty">${esc(amount)}${q.unit ? ' ' + esc(q.unit) : ''}</strong> <span class="rp-ing-text">${esc(q.rest)}</span>${note}`;
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
  const factor = target / base.value;
  const list = $('rpIngredients');
  if (list)
    list.querySelectorAll('[data-ing]').forEach(li => {
      const line = r.ingredients[Number(li.dataset.ing)];
      li.querySelector('.rp-ing-line').innerHTML = ingredientHtml(line, factor);
    });
  const label = $('rpFactor');
  if (label) label.textContent = factor === 1 ? '' : `× ${formatNumber(factor)}`;
  $('rpYieldReset')?.toggleAttribute('hidden', factor === 1);
  const raw = `${formatNumber(target)}${base.unit ? ' ' + base.unit : ''}`;
  window._savourScaled =
    factor === 1
      ? null
      : { recipe: r, rawTarget: raw, factor, format: formatNumber, scaleLine: l => scaleIngredientLine(l, factor) };
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
  const { base } = recipePageYield();
  const input = $('rpYieldInput');
  if (!base || !input) return;
  input.value = formatNumber(base.value);
  setRecipeYield(input.value);
}

// Print het recept zoals het op het scherm staat: omgerekend als er een andere opbrengst is gekozen.
function printCurrentRecipe() {
  if (window._savourScaled && String(window._savourScaled.recipe.id) === String(currentId)) printScaledRecipe();
  else printRecipe(currentId);
}

// Rekent het open recept om: factor = nieuwe opbrengst / oorspronkelijke opbrengst. De eenheid telt niet mee.
function calculateScale() {
  const r = findRecipe(currentId);
  const base = parseYield(r && r.yield),
    raw = String($('scaleTarget')?.value || '').trim(),
    target = parseYield(raw);
  if (!r || !base || !target) {
    toast?.('Vul een geldige nieuwe opbrengst in, bijvoorbeeld 15 platen of 30 liter.');
    return;
  }
  const factor = target.value / base.value,
    fmt = formatNumber;
  const scaleLine = line => scaleIngredientLine(line, factor);
  const result = $('scaleResult');
  if (!result) return;
  result.innerHTML =
    '<b>' +
    esc(r.title || '') +
    '</b><p class="muted">' +
    esc(String(r.yield || '')) +
    ' → ' +
    esc(raw) +
    ' · factor ' +
    fmt(factor) +
    '</p>' +
    ((r.ingredients || []).map(x => '<div class="ingredient">' + scaleLine(x) + '</div>').join('') ||
      '<div class="muted">Geen ingrediënten beschikbaar.</div>');
  let btn = $('scalePrintButton');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scalePrintButton';
    btn.className = 'btn';
    btn.textContent = 'Print omgerekend recept';
    btn.onclick = printScaledRecipe;
    $('scaleModal')?.querySelector('.actions')?.appendChild(btn);
  }
  window._savourScaled = { recipe: r, rawTarget: raw, factor, format: fmt, scaleLine };
}

function printScaledRecipe() {
  const s = window._savourScaled;
  if (!s) {
    toast?.('Reken eerst het recept om.');
    return;
  }
  const ingredients = (s.recipe.ingredients || []).map(x => '<li>' + s.scaleLine(x) + '</li>').join('');
  const steps = (s.recipe.steps || []).map(x => '<li>' + esc(x) + '</li>').join('');
  const doc =
    '<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>' +
    esc(s.recipe.title) +
    '</title><style>body{font-family:Arial,sans-serif;padding:28px;color:#111}li{margin:7px 0}</style></head><body><h1>' +
    esc(s.recipe.title) +
    '</h1><p>' +
    esc(String(s.recipe.yield || '')) +
    ' → ' +
    esc(s.rawTarget) +
    ' · factor ' +
    s.format(s.factor) +
    '</p><h2>Ingrediënten</h2><ul>' +
    ingredients +
    '</ul><h2>Bereiding</h2><ol>' +
    steps +
    '</ol></body></html>';
  const w = window.open('', '_blank');
  if (!w) {
    toast?.('Pop-up blokkering voorkomt printen.');
    return;
  }
  w.document.write(doc);
  w.document.close();
  w.focus();
  w.print();
}
