// Test van de rekenkern van de foodcost calculator (js/features/foodcost.js), zonder browser.
// Draaien: npm run test:foodcost
import fs from 'node:fs';
import vm from 'node:vm';

const read = f => fs.readFileSync(new URL('../js/features/' + f, import.meta.url), 'utf8');
const ctx = vm.createContext({ esc: s => String(s), t: s => s, currentLanguage: 'nl' });
vm.runInContext(read('scale.js') + '\n' + read('foodcost.js'), ctx);
const run = code => vm.runInContext(code, ctx);

let fails = 0;
const near = (a, b) => Math.abs(a - b) < 1e-6;
function check(name, ok, got) {
  if (!ok) {
    fails++;
    console.log('FOUT  ' + name + (got !== undefined ? '  → ' + JSON.stringify(got) : ''));
  }
}

// ---- Een kleine wereld: producten, prijzen, recepten ----
ctx.W = {
  products: {
    boter: { id: 'p1', name: 'Roomboter', yield_pct: null, density: null, units: {} },
    sjalot: { id: 'p2', name: 'Sjalot', yield_pct: 90, density: null, units: { stuk: 30 } },
    room: { id: 'p3', name: 'Slagroom', yield_pct: null, density: 1.0, units: {} },
    ossenhaas: { id: 'p4', name: 'Ossenhaas', yield_pct: 75, density: null, units: {} },
    knoflook: { id: 'p5', name: 'Knoflook', yield_pct: null, density: null, units: {} },
    ei: { id: 'p6', name: 'Ei', yield_pct: null, density: null, units: {} },
    suiker: { id: 'p7', name: 'Suiker', yield_pct: null, density: null, units: {} },
    truffel: { id: 'p8', name: 'Truffel', yield_pct: null, density: null, units: {} }
  },
  prices: {
    p1: { price: { price: 18.9, pack_qty: 2500, pack_unit: 'g' }, supplier: { discount_pct: 4 } },
    p2: { price: { price: 2.4, pack_qty: 1000, pack_unit: 'g' }, supplier: null },
    p3: { price: { price: 4.2, pack_qty: 1, pack_unit: 'g' }, supplier: null }, // per gram (vreemd, maar kan)
    p4: { price: { price: 42, pack_qty: 1000, pack_unit: 'g' }, supplier: null },
    p5: { price: { price: 6, pack_qty: 1000, pack_unit: 'g' }, supplier: null },
    p6: { price: { price: 0.35, pack_qty: 1, pack_unit: 'stuk' }, supplier: null },
    p7: { price: { price: 1.5, pack_qty: 1000, pack_unit: 'g' }, supplier: null }
    // truffel: geen prijs
  },
  settings: {},
  recipes: {}
};
run(`
  W.world = {
    keyOf: line => ingredientNameOf(line).toLowerCase().replace(/,.*$/, '').trim(),
    recipeFor: (r, line) => W.recipes[ingredientNameOf(line).toLowerCase()] || null,
    costProductFor: key => W.products[key] || null,
    priceFor: cp => W.prices[cp.id] || null,
    settingsFor: r => W.settings[r.id] || null
  };
  W.cost = r => fcRecipeCost(r, W.world);
`);

// ---- Eenheden ----
const amt = l => run(`fcLineAmount(${JSON.stringify(l)})`);
check('250 g', near(amt('250 g boter').value, 250) && amt('250 g boter').kind === 'g');
check('0,5 kg', near(amt('0,5 kg boter').value, 500));
check('1 dl', near(amt('1 dl room').value, 100) && amt('1 dl room').kind === 'ml');
check('2 el', near(amt('2 el suiker').value, 30) && amt('2 el suiker').kind === 'ml');
check('1 tl', near(amt('1 tl zout').value, 5));
check('8 oz', near(amt('8 oz butter').value, 226.8) && amt('8 oz butter').kind === 'g');
check('1 lb', near(amt('1 lb butter').value, 453.6));
check('3 eieren = stuks', amt('3 eieren').kind === 'stuk' && amt('3 eieren').value === 3);
check('2 stuks', amt('2 stuks sjalot').kind === 'stuk');
check('2 tenen = woord', amt('2 tenen knoflook').kind === 'woord' && amt('2 tenen knoflook').word === 'tenen');
check('2-3 uien = hoogste', amt('2-3 uien').value === 3 && amt('2-3 uien').range === true);
check('naar smaak = geen', amt('zout naar smaak') === null);

// ---- Verpakkingen ----
const pack = s => run(`fcParsePack(${JSON.stringify(s)})`);
check(
  'doos 6 × 1 kg',
  pack('doos 6 × 1 kg')?.qty === 6000 && pack('doos 6 × 1 kg')?.unit === 'g',
  pack('doos 6 × 1 kg')
);
check('fles 0,75 l', pack('fles 0,75 l')?.qty === 750 && pack('fles 0,75 l')?.unit === 'ml');
check('10 x 250 g', pack('10 x 250 g')?.qty === 2500);
check('per stuk', pack('per stuk')?.unit === 'stuk' && pack('per stuk')?.qty === 1);
check('30 stuks', pack('tray 30 stuks')?.qty === 30 && pack('tray 30 stuks')?.unit === 'stuk');
check('onleesbaar = null', pack('doos') === null);

// ---- Regels ----
ctx.R = { id: 'r1', yield: '4 porties', ingredients: [] };
const line = l => run(`fcLineCost(R, ${JSON.stringify(l)}, W.world, new Set())`);

// Korting: € 18,90 per 2,5 kg −4% = € 0,0072576 per g × 250 g = € 1,8144
let x = line('250 g boter');
check('boter met korting', x.status === 'ok' && near(x.cost, 1.8144), x);
// Opbrengst: 200 g ossenhaas, 75% → 266,67 g × € 0,042 = € 11,20 (voorbeeld van Apicbase)
x = line('200 g ossenhaas');
check('ossenhaas opbrengst 75%', x.status === 'ok' && near(x.cost, 11.2), x.cost);
// Stuks met gewicht per stuk en opbrengst: 2 sjalotten × 30 g = 60 g ÷ 0,9 × € 0,0024 = € 0,16
x = line('2 sjalot');
check('sjalot per stuk', x.status === 'ok' && near(x.cost, 0.16), x.cost);
// Stuks zonder gewicht: niet compleet, Savour vraagt het gewicht per stuk
x = line('2 knoflook');
check('knoflook stuk zonder gewicht', x.status === 'eenheid' && x.steps.need === 'stuk', x.status);
x = line('2 tenen knoflook');
check('teen zonder gewicht', x.status === 'eenheid' && x.steps.need === 'tenen');
// Volume met dichtheid: 1 dl room × 1,0 = 100 g × € 4,20 = € 420 (prijs per gram)
x = line('1 dl room');
check('room via dichtheid', x.status === 'ok' && near(x.cost, 420), x.cost);
// Volume zonder dichtheid: niet compleet
x = line('2 el suiker');
check('suiker el zonder dichtheid', x.status === 'eenheid' && x.steps.need === 'density');
// Eieren per stuk
x = line('3 ei');
check('ei per stuk', x.status === 'ok' && near(x.cost, 1.05));
// Geen prijs: nooit € 0 als compleet
x = line('20 g truffel');
check('truffel zonder prijs', x.status === 'geen-prijs' && x.cost === 0);
x = line('20 g kaviaar');
check('onbekend product', x.status === 'geen-product');
x = line('boter naar smaak');
check('geen hoeveelheid', x.status === 'geen-hoeveelheid');
check('kopregel telt niet', line('Saus:') === null);

// ---- Recepten en basisrecepten ----
ctx.W.recipes.fond = {
  id: 'fond',
  title: 'Fond',
  yield: '2 liter',
  ingredients: ['500 g ossenhaas', '1 kg sjalot']
};
// fond: 500 ÷ 0,75 × 0,042 = 28 + 1000 ÷ 0,9 × 0,0024 = 2,6667 → 30,6667 per 2 liter
const fond = run('W.cost(W.recipes.fond)');
check('fond compleet', fond.complete && near(fond.total, 30.666666666666668), fond.total);
check('fond geen porties', fond.portions === null);

ctx.R2 = { id: 'r2', title: 'Saus', yield: '4 porties', ingredients: ['Saus:', '150 ml fond', '250 g boter'] };
let c = run('W.cost(R2)');
check('saus met fond', c.complete && near(c.total, 30.666666666666668 * 0.075 + 1.8144), c.total);
check('per portie', near(c.perPortion, c.total / 4) && c.portions.source === 'opbrengst');

// Basisrecept in gram tegenover liter: niet compleet, tot de kok "1 l = … kg" invult
ctx.R3 = { id: 'r3', yield: '10 porties', ingredients: ['300 g fond'] };
c = run('W.cost(R3)');
check('gram tegen liter open', !c.complete && c.lines[0].status === 'eenheid');
ctx.W.settings.fond = { density: 1.5 };
c = run('W.cost(R3)');
check('gram tegen liter met dichtheid', c.complete && near(c.total, 30.666666666666668 * (300 / 1.5 / 2000)), c.total);
delete ctx.W.settings.fond;

// Een basisrecept zonder prijs maakt het gerecht ook niet compleet; het bekende deel telt als ondergrens
ctx.W.recipes.jus = { id: 'jus', yield: '1 liter', ingredients: ['500 g ossenhaas', '10 g truffel'] };
ctx.R4 = { id: 'r4', yield: '2 porties', ingredients: ['100 ml jus', '2 ei'] };
c = run('W.cost(R4)');
check('open basisrecept', !c.complete && c.open === 1 && c.lines[0].status === 'basisrecept-open', c.lines[0].status);
check('ondergrens', near(c.total, 28 * 0.1 + 0.7), c.total);

// Kring: A gebruikt B, B gebruikt A
ctx.W.recipes.a = { id: 'a', yield: '1 liter', ingredients: ['100 ml b'] };
ctx.W.recipes.b = { id: 'b', yield: '1 liter', ingredients: ['100 ml a'] };
c = run('W.cost(W.recipes.a)');
check('kring', !c.complete && c.lines[0].steps.sub.lines[0].status === 'kring');

// Keuzes van de kok: overslaan en vast bedrag
ctx.W.settings.r5 = { choices: { truffel: { skip: true }, kaviaar: { fixed: 2.5 } }, portions: 5 };
ctx.R5 = { id: 'r5', yield: '1 liter', ingredients: ['20 g truffel', '1 kaviaar', '3 ei'] };
c = run('W.cost(R5)');
check('overslaan en vast', c.complete && near(c.total, 3.55), c.total);
check('porties van de kok', c.portions.value === 5 && c.portions.source === 'kok');

// ---- Gerecht: een bord uit recepten en ingrediënten (1 portie van een recept voor 4 personen = een kwart) ----
ctx.W.recipes['portie saus'] = { id: 'saus', yield: '4 personen', ingredients: ['250 g boter'] };
ctx.W.recipes['koekje'] = { id: 'koek', yield: '24 stuks', ingredients: ['3 ei'] };
ctx.DISH = { id: 'bord', yield: '1 portie', ingredients: ['1 portie saus', '1 stuk koekje', '200 g ossenhaas'] };
c = run('W.cost(DISH)');
check('gerecht: portie, stuk en ingrediënt', c.complete && near(c.total, 1.8144 / 4 + 1.05 / 24 + 11.2), c.total);
check('gerecht: 1 bord', c.portions?.value === 1);

// ---- Savour-indicatie: alleen zonder eigen prijs, en altijd als indicatie herkenbaar ----
ctx.W.indications = {
  kaviaar: [{ unit: 'g', per_unit: 0.9, kitchens: 6 }],
  truffel: [{ unit: 'g', per_unit: 2, kitchens: 7 }],
  ei: [{ unit: 'stuk', per_unit: 99, kitchens: 9 }]
};
run('W.world.indicationsFor = key => W.indications[key] || []');
x = line('20 g kaviaar');
check('indicatie zonder product', x.status === 'indicatie' && near(x.cost, 18), x);
x = line('20 g truffel');
check('indicatie bij product zonder prijs', x.status === 'indicatie' && near(x.cost, 40), x.status);
x = line('3 ei');
check('eigen prijs gaat voor indicatie', x.status === 'ok' && near(x.cost, 1.05), x.cost);
x = line('2 el kaviaar');
check('indicatie in gram, recept in lepels: niet omrekenen', x.status === 'geen-product', x.status);
ctx.R6 = { id: 'r6', yield: '2 porties', ingredients: ['20 g kaviaar', '3 ei'] };
c = run('W.cost(R6)');
check('recept met indicatie: compleet maar gemarkeerd', c.complete && c.indicated === 1 && near(c.total, 19.05), c);
run('delete W.world.indicationsFor');

// ---- Prijs en marge ----
check('voorgestelde prijs', near(run('fcSuggestedPrice(6.06, 28)'), 21.642857142857142));
check('foodcost %', near(run('fcFoodcostPct(6, 24)'), 25));
check('btw erbij', near(run('fcWithVat(10, 9)'), 10.9));
check('btw eraf', near(run('fcWithoutVat(10.9, 9)'), 10));
check('geen verkoopprijs', run('fcFoodcostPct(6, 0)') === null);

// ---- Menu engineering (Kasavana en Smith) ----
const me = run(`fcMenuEngineering([
  { id: 'a', sold: 100, margin: 15 },
  { id: 'b', sold: 100, margin: 8 },
  { id: 'c', sold: 10, margin: 20 },
  { id: 'd', sold: 10, margin: 5 }
])`);
check(
  'menu engineering',
  me.classes.a === 'star' && me.classes.b === 'plowhorse' && me.classes.c === 'puzzle' && me.classes.d === 'dog',
  me.classes
);

console.log(fails ? `${fails} fout(en)` : 'Foodcost: alles goed');
process.exit(fails ? 1 : 0);
