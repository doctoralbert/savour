// Foodcost: de rekenkern (2026-11-24). Alleen rekenen: dit bestand tekent niets en slaat niets op, zodat het in
// Node te testen is (tests/foodcost.test.mjs, npm run test:foodcost). Schermen: foodcost-screens.js; laden en
// opslaan: foodcost-data.js. Onderzoek en plan: docs/onderzoek-foodcost.md.
//
// Betrouwbaar: Savour verzint nooit een prijs, opbrengst, gewicht per stuk of omrekening. Ontbreekt er iets, dan
// krijgt die regel een status (geen-prijs, eenheid, ...) en is het totaal een ondergrens ("minstens"), nooit een
// stil totaal met € 0. Elke regel krijgt de herleiding mee (steps), zodat de kok ziet waar een bedrag vandaan komt.
//
// Eenheden: elke hoeveelheid gaat naar gram (g), milliliter (ml), stuks (stuk) of een eigen woord (teen, blik, bos).
// Gram ↔ milliliter alleen met "1 l = … kg" van de kok; stuks en eigen woorden alleen met het gewicht dat de kok
// invulde. Prijzen zijn altijd zonder btw.

// Woorden voor "per stuk". Een regel zonder eenheid ("3 eieren") telt ook in stuks.
const FC_PIECE_WORDS = new Set(
  'st st. stuk stuks stk piece pieces pc pcs stück stücke pieza piezas unidad unidades ud uds pièce pièces'.split(' ')
);
// Woorden in een opbrengst die porties betekenen: "10 porties", "12 stuks", "8 personen".
const FC_PORTION_WORDS = new Set(
  'portie porties portion portions personen persoon pers pers. couvert couverts cover covers serving servings serves bord borden stuk stuks st pieces piece portionen person personen stück porción porciones ración raciones persona personas part parts personne personnes assiette assiettes'.split(
    ' '
  )
);

function fcWord(w) {
  return String(w || '')
    .toLocaleLowerCase('nl-NL')
    .replace(/\.$/, '')
    .trim();
}

// Hoeveelheid uit een eenheidswoord en getal: { value, kind: 'g'|'ml'|'stuk'|'woord', word }.
function fcAmountOf(value, unit, unitText) {
  if (unit) {
    if (unit.family === 'mass' || unit.family === 'imperial') return { value: value * unit.base, kind: 'g', word: '' };
    // Lepels, cups, liters en fl.oz zijn een volume.
    return { value: value * unit.base, kind: 'ml', word: '' };
  }
  const w = fcWord(unitText);
  if (!w || FC_PIECE_WORDS.has(w)) return { value, kind: 'stuk', word: '' };
  return { value, kind: 'woord', word: w };
}

// Hoeveelheid vooraan een ingrediëntregel. "2-3 uien": Savour rekent met de hoogste (en zegt dat).
// null als er geen hoeveelheid staat ("zout naar smaak").
function fcLineAmount(line) {
  const p = parseIngredientAmount(line);
  if (!p || !(p.value > 0)) return null;
  const top = p.value2 && p.value2 > p.value ? p.value2 : p.value;
  return {
    ...fcAmountOf(top, p.unit, p.unitText),
    range: top !== p.value,
    text: p.amount + (p.unitText ? ' ' + p.unitText : '')
  };
}

// Opbrengst van een recept als hoeveelheid: "2 liter" → 2000 ml, "10 porties" → 10 'woord' porties.
function fcYieldAmount(text) {
  const y = parseYield(text);
  if (!y) return null;
  const word = y.unit.split(' ')[0];
  const unit = UNIT_INFO.get(word) || UNIT_INFO.get(word.replace(/\.$/, '')) || null;
  const a = fcAmountOf(y.value, unit, unit ? '' : word);
  return { ...a, portion: !unit && (!word || FC_PORTION_WORDS.has(fcWord(word))) };
}

// Aantal porties van een recept: wat de kok bij de kostprijs invulde, anders uit de opbrengst als die porties,
// personen of stuks noemt. null: onbekend (dan geen prijs per portie, wel het totaal).
function fcPortions(r, rc) {
  if (rc?.portions > 0) return { value: Number(rc.portions), source: 'kok' };
  const y = fcYieldAmount(r?.yield);
  if (y && (y.kind === 'stuk' || (y.kind === 'woord' && y.portion))) return { value: y.value, source: 'opbrengst' };
  return null;
}

// Gram per eenheid van een hoeveelheid, met de gegevens van de kok. null = niet bekend.
function fcGramsPer(kind, word, cp) {
  if (kind === 'g') return 1;
  if (kind === 'ml') return cp?.density > 0 ? Number(cp.density) : null; // kg per liter = g per ml
  if (kind === 'stuk') return cp?.units?.stuk > 0 ? Number(cp.units.stuk) : null;
  const g = cp?.units?.[word];
  return g > 0 ? Number(g) : null;
}

// Zet een hoeveelheid om naar de eenheid van de prijs ('g', 'ml' of 'stuk').
// Geeft { value } of { need } met wat er ontbreekt: 'density', 'stuk' of het woord ('teen').
function fcConvert(amount, to, cp) {
  if (amount.kind === to && (to !== 'woord' || amount.word === cp?.priceWord)) return { value: amount.value };
  const from = fcGramsPer(amount.kind, amount.word, cp);
  if (from === null) return { need: amount.kind === 'ml' ? 'density' : amount.kind === 'stuk' ? 'stuk' : amount.word };
  const grams = amount.value * from;
  const per = fcGramsPer(to, '', cp);
  if (per === null) return { need: to === 'ml' ? 'density' : 'stuk' };
  return { value: grams / per };
}

// Prijs per gram, milliliter of stuk, na korting. price: { price, pack_qty, pack_unit }; supplier: { discount_pct }.
function fcUnitPrice(price, supplier) {
  const qty = Number(price?.pack_qty);
  const amount = Number(price?.price);
  if (!(qty > 0) || !(amount >= 0)) return null;
  const discount = supplier?.discount_pct > 0 ? Math.min(Number(supplier.discount_pct), 100) : 0;
  return { perUnit: (amount * (1 - discount / 100)) / qty, unit: price.pack_unit, discount };
}

// Kosten van één ingrediëntregel. world levert de opzoekingen (zie fcRecipeCost). Geeft
// { line, key, status, cost, steps } of null voor een kopregel of lege regel.
//   status: ok | vast | overgeslagen | geen-hoeveelheid | geen-product | geen-prijs | eenheid |
//           basisrecept (ok via een basisrecept) | basisrecept-open | geen-opbrengst | kring
//   cost: wat al vaststaat (bij een open basisrecept het deel dat wel bekend is; anders 0 als het niet compleet is).
function fcLineCost(r, line, world, seen) {
  if (recipePartName(line)) return null;
  const key = world.keyOf(line);
  if (!key) return null;
  const base = { line, key, cost: 0, steps: {} };
  const choice = world.choices?.[key];
  if (choice?.skip) return { ...base, status: 'overgeslagen' };
  if (choice && Number.isFinite(Number(choice.fixed)) && choice.fixed !== null && choice.fixed !== '')
    return { ...base, status: 'vast', cost: Number(choice.fixed) };
  const amount = fcLineAmount(line);
  const target = world.recipeFor(r, line);
  if (target) {
    if (seen.has(String(target.id))) return { ...base, status: 'kring', steps: { recipe: target } };
    const sub = fcRecipeCost(target, world, new Set(seen));
    const y = fcYieldAmount(target.yield);
    const steps = { recipe: target, sub, amount, yieldAmount: y };
    if (!amount) return { ...base, status: 'geen-hoeveelheid', steps };
    if (!y) return { ...base, status: 'geen-opbrengst', steps };
    let share = null;
    if (amount.kind === y.kind && (amount.kind !== 'woord' || fcSameWord(amount.word, y.word)))
      share = amount.value / y.value;
    else if (amount.kind === 'stuk' && y.kind === 'woord' && y.portion) share = amount.value / y.value;
    else if (amount.kind === 'woord' && y.kind === 'stuk') share = amount.value / y.value;
    else {
      // Gram tegenover liter: alleen met "1 l = … kg" die de kok bij het basisrecept invulde.
      const d = Number(world.recipeSettings?.(target)?.density);
      if (d > 0 && amount.kind === 'g' && y.kind === 'ml') share = amount.value / d / y.value;
      if (d > 0 && amount.kind === 'ml' && y.kind === 'g') share = (amount.value * d) / y.value;
    }
    if (share === null) return { ...base, status: 'eenheid', steps: { ...steps, need: 'opbrengst' } };
    steps.share = share;
    const cost = sub.total * share;
    return { ...base, status: sub.complete ? 'basisrecept' : 'basisrecept-open', cost, steps };
  }
  if (!amount) return { ...base, status: 'geen-hoeveelheid' };
  const cp = world.costProductFor(key, line);
  if (!cp) return { ...base, status: 'geen-product', steps: { amount } };
  const chosen = world.priceFor(cp);
  if (!chosen) return { ...base, status: 'geen-prijs', steps: { amount, product: cp } };
  const unitPrice = fcUnitPrice(chosen.price, chosen.supplier);
  if (!unitPrice) return { ...base, status: 'geen-prijs', steps: { amount, product: cp } };
  const conv = fcConvert(amount, unitPrice.unit, cp);
  const steps = { amount, product: cp, price: chosen.price, supplier: chosen.supplier || null, unitPrice };
  if (conv.need) return { ...base, status: 'eenheid', steps: { ...steps, need: conv.need } };
  const yieldPct = cp.yield_pct > 0 && cp.yield_pct <= 100 ? Number(cp.yield_pct) : null;
  const bought = yieldPct ? conv.value / (yieldPct / 100) : conv.value;
  return {
    ...base,
    status: 'ok',
    cost: bought * unitPrice.perUnit,
    steps: { ...steps, used: conv.value, bought, yieldPct }
  };
}

// "portie" en "porties", "liter" en "liters": hetzelfde woord.
function fcSameWord(a, b) {
  const x = fcWord(a);
  const y = fcWord(b);
  if (x === y) return true;
  const short = x.length < y.length ? x : y;
  const long = x.length < y.length ? y : x;
  return short.length >= 3 && long.startsWith(short) && long.length - short.length <= 3;
}

const FC_DONE = new Set(['ok', 'vast', 'overgeslagen', 'basisrecept']);

// Kostprijs van een recept.
// world: {
//   keyOf(line)                  → zoeksleutel van het ingrediënt (ingredientKey)
//   recipeFor(r, line)           → gekoppeld basisrecept of null
//   costProductFor(key, line)    → { id, name, yield_pct, density, units } of null
//   priceFor(costProduct)        → { price: { price, pack_qty, pack_unit, ... }, supplier } of null
//   settingsFor(r)               → { portions, density, choices, sell_price, target_pct } van dit recept (of null)
// }
// Geeft { total, complete, open, lines, portions, perPortion }. total is bij een onvolledig recept een ondergrens.
function fcRecipeCost(r, world, seen = new Set()) {
  seen.add(String(r.id));
  const rc = world.settingsFor?.(r) || null;
  const lineWorld = { ...world, choices: rc?.choices || {}, recipeSettings: world.settingsFor };
  const lines = (r.ingredients || []).map(line => fcLineCost(r, line, lineWorld, seen)).filter(Boolean);
  const total = lines.reduce((s, x) => s + (Number.isFinite(x.cost) ? x.cost : 0), 0);
  const open = lines.filter(x => !FC_DONE.has(x.status));
  const portions = fcPortions(r, rc);
  return {
    total,
    complete: open.length === 0 && lines.length > 0,
    open: open.length,
    lines,
    portions,
    perPortion: portions ? total / portions.value : null
  };
}

// Verkoopprijs, foodcost en marge per portie (alles zonder btw).
function fcFoodcostPct(cost, sell) {
  return cost >= 0 && sell > 0 ? (cost / sell) * 100 : null;
}
function fcSuggestedPrice(cost, targetPct) {
  return cost >= 0 && targetPct > 0 && targetPct < 100 ? cost / (targetPct / 100) : null;
}
function fcWithVat(amount, vatPct) {
  return amount * (1 + (Number(vatPct) || 0) / 100);
}
function fcWithoutVat(amount, vatPct) {
  return amount / (1 + (Number(vatPct) || 0) / 100);
}

// Een inkoopverpakking als hoeveelheid in gram, milliliter of stuks: "doos 6 × 1 kg" → 6000 g, "fles 0,75 l" →
// 750 ml, "per stuk" → 1 stuk, "10 × 250 g" → 2500 g. null als Savour het niet zeker kan lezen.
function fcParsePack(text) {
  let s = String(text || '')
    .toLocaleLowerCase('nl-NL')
    .replace(/[×*]/g, ' x ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!s) return null;
  if (/^(per\s+)?(stuk|st\.?|stuks|piece|each|stück|unidad|pièce)$/.test(s)) return { qty: 1, unit: 'stuk' };
  let count = 1;
  const multi = s.match(/(\d+(?:[.,]\d+)?)\s*x\s*(.+)$/);
  if (multi) {
    count = parseAmount(multi[1]);
    s = multi[2];
  }
  const m = s.match(/(\d+(?:[.,]\d+)?)\s*([a-zà-ÿ.]+)/);
  if (!m) return null;
  const value = parseAmount(m[1]);
  const word = m[2].replace(/\.$/, '');
  const unit = UNIT_INFO.get(word);
  if (!(value > 0) || !(count > 0)) return null;
  if (unit && ['mass', 'imperial'].includes(unit.family)) return { qty: count * value * unit.base, unit: 'g' };
  if (unit && ['volume', 'flimperial'].includes(unit.family)) return { qty: count * value * unit.base, unit: 'ml' };
  if (FC_PIECE_WORDS.has(word)) return { qty: count * value, unit: 'stuk' };
  return null;
}

// Menu engineering volgens Kasavana en Smith (1982). items: [{ id, sold, margin }] met margin = verkoopprijs min
// kostprijs per bord (zonder btw). Populair: aandeel ≥ 70% van een gelijk aandeel (1/n). Winstgevend: marge ≥ het
// gewogen gemiddelde. Geeft per id 'star' | 'plowhorse' | 'puzzle' | 'dog', en de twee drempels.
function fcMenuEngineering(items) {
  const list = items.filter(x => x.sold >= 0 && Number.isFinite(x.margin));
  const sold = list.reduce((s, x) => s + x.sold, 0);
  if (!list.length || !(sold > 0)) return { classes: {}, popularShare: null, avgMargin: null };
  const popularShare = (1 / list.length) * 0.7;
  const avgMargin = list.reduce((s, x) => s + x.margin * x.sold, 0) / sold;
  const classes = {};
  list.forEach(x => {
    const popular = x.sold / sold >= popularShare;
    const profitable = x.margin >= avgMargin;
    classes[x.id] = popular ? (profitable ? 'star' : 'plowhorse') : profitable ? 'puzzle' : 'dog';
  });
  return { classes, popularShare, avgMargin };
}

// Gangbare opbrengsten na schoonmaken, alleen als hint bij het invullen: de kok vult zelf het getal in.
// Bron: de tabel bij de foodcost calculator van Apicbase (gelezen 23-11-2026). Een bandbreedte, nooit een vaste
// waarde; aanvullen alleen met een bron erbij.
const FC_YIELD_HINTS = [
  [/ossenhaas|beef tenderloin|rinderfilet|solomillo|filet de b/, '70–75%'],
  [/hele kip|whole chicken|ganzes h(ä|a)hnchen|pollo entero|poulet entier/, '55–65%'],
  [/zalmfilet|salmon fillet|lachsfilet|filete de salm|filet de saumon/, '80–90%'],
  [/pasta|rijst|rice|reis|arroz|riz/, '100%']
];
function fcYieldHint(name) {
  const k = String(name || '').toLocaleLowerCase('nl-NL');
  return FC_YIELD_HINTS.find(([re]) => re.test(k))?.[1] || '';
}
