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
  // Kwalitatieve hoeveelheden ("naar smaak", "snuf") worden bewust niet omgerekend.
  function scaleLine(line) {
    const s = String(line || '');
    if (/naar smaak|naar behoefte|scheut|snuf|mespunt|eventueel|evt\.?/i.test(s))
      return esc(s) + ' <span class="scale-note">(niet automatisch omgerekend)</span>';
    const m = s.match(/^\s*([0-9]+(?:[.,][0-9]+)?)/);
    if (!m) return esc(s);
    const n = Number(m[1].replace(',', '.'));
    return esc(s.replace(m[1], fmt(n * factor)));
  }
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
