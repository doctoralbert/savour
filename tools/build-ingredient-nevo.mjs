// Maakt js/data/ingredient-nevo.json: de Nederlandse productnamen uit NEVO als aanvulling op de basislijst.
//
// Bron: NEVO online versie 2025/9.0, RIVM, Bilthoven (https://www.rivm.nl/nederlands-voedingsstoffenbestand).
// NEVO bevat geen allergenen. Savour neemt alleen de namen over: de NEVO-naam staat ongewijzigd als schrijfwijze,
// met daarnaast een leesbare naam ("Sla krop- gekookt" → "kropsla"). De allergenen zijn een aanvulling van Savour
// (trefwoorden, basislijst en de NEVO-groep), geen gegevens van RIVM.
//
// Gebruik: node tools/build-ingredient-nevo.mjs <pad naar NEVO2025_v9.0.csv>
// Uitvoer: { source, license, version, items: [[allergenen, naam, schrijfwijzen gescheiden door "|", NEVO-groep], ...] }

import fs from 'fs';
import vm from 'vm';

const file = process.argv[2];
if (!file) {
  console.error('Gebruik: node tools/build-ingredient-nevo.mjs <pad naar NEVO2025_v9.0.csv>');
  process.exit(1);
}
const root = new URL('..', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');

// De regels van de app zelf: productKey, allergenSuggestion en de eigen woordenlijst.
const ctx = vm.createContext({ console, window: {}, t: s => s, localStorage: { getItem() {} } });
for (const f of ['js/features/products.js', 'js/features/product-families.js', 'js/features/product-starter.js'])
  vm.runInContext(read(f), ctx, { filename: f });
ctx.__base = JSON.parse(read('js/data/ingredient-base.json'));
vm.runInContext(
  `(() => {
  const index = new Map();
  for (const item of __base.items)
    for (let l = 1; l <= 5; l++)
      for (const n of String(item[l] || '').split('|')) { const k = productKey(n); if (k && !index.has(k)) index.set(k, item); }
  for (const [n, head, allergens] of savourVocabulary()) { const k = productKey(n); if (k && !index.has(k)) index.set(k, [allergens.join(','), head, '', '', '', '', 0, 'savour']); }
  ingredientBase = { index, main: new Map() };
})()`,
  ctx
);
const call = (fn, ...args) => vm.runInContext(`${fn}(...${JSON.stringify(args)})`, ctx);
const ORDER = vm.runInContext('ALLERGENS', ctx).map(a => a[0]);

// NEVO zet het hoofdwoord voorop: "Sla krop-" is kropsla, "Kool witte" is witte kool, "m" is met.
const ABBR = { m: 'met', z: 'zonder', gem: 'gemiddeld', v: 'van', obv: 'op basis van', alc: 'alcohol' };
const ADJ =
  /^(witte|rode|gele|groene|zwarte|bruine|blauwe|paarse|gevulde|halfvolle|magere|volle|nieuwe|zoete|zure|zoetzure|verse|jonge|oude|belegen|harde|zachte|gemengde|gedroogde|gerookte|gekonfijte|gezouten|gepelde|ongepelde|grote|kleine|franse|griekse|turkse|thaise|duitse|engelse|zeeuwse|chinese|japanse|[a-z]+(aanse|ische|landse))$/i;
const STATE =
  /(^|\s)(rauw|gekookt|gestoomd|gebakken|gegrild|gefrituurd|gestoofd|gesmoord|gepocheerd|gemiddeld|bereid|onbereid|diepvries|blik\/glas|blik|glas|in blik|uit blik|vers|onbewerkt|zonder vel|met vel|zonder zout|met zout|ongezouten|gezouten|zonder suiker|met suiker|gezoet|ongezoet|uitgelekt|gem|p|per|g|ml)(?=\s|$)/g;
function readable(raw) {
  let w = raw.replace(/\s+/g, ' ').trim().split(' ');
  if (w.length > 1 && /-$/.test(w[1]) && !/-$/.test(w[0])) w = [w[1].slice(0, -1) + w[0].toLowerCase(), ...w.slice(2)];
  let n = 1;
  while (n < w.length && ADJ.test(w[n])) n++;
  if (n > 1) w = [...w.slice(1, n).map(x => x.toLowerCase()), w[0].toLowerCase(), ...w.slice(n)];
  return w
    .map(x => ABBR[x] || x)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
// De kern zonder bereiding en toevoegingen: "pastinaak gekookt" → "pastinaak".
function core(name) {
  let s = name.split(/\s(met|zonder|op basis van|in|van|voor|à|a la|naturel)\s/)[0];
  s = s.replace(/\d+([.,]\d+)?\s?(%|\+|g|ml|mnd)(?=\s|$)/g, ' ').replace(/[()]/g, ' ');
  let prev;
  do {
    prev = s;
    s = s.replace(STATE, ' ').replace(/\s+/g, ' ').trim();
  } while (s !== prev);
  return s;
}

const lines = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
const head = lines[0].split('|').map(s => s.replace(/"/g, ''));
const col = n => head.findIndex(h => h.startsWith(n));
const [cGroup, cNl, cSyn] = ['Voedingsmiddelgroep', 'Voedingsmiddelnaam', 'Synoniem'].map(col);
// "NEVO-Online 2025 9.0" wordt "2025/9.0", zoals de bronvermelding van RIVM het vraagt.
const version = String(lines[1]?.split('|')[0] || '')
  .replace(/"/g, '')
  .replace(/^.*?(\d{4})\D+(\d+\.\d+).*$/, '$1/$2');

const rows = new Map();
function add(main, names, group) {
  const k = call('productKey', main);
  if (!k) return;
  const row = rows.get(k) || { name: main, names: new Set(), groups: new Set() };
  names.filter(Boolean).forEach(n => row.names.add(n));
  row.groups.add(group);
  rows.set(k, row);
}
for (const line of lines.slice(1)) {
  const f = line.split('|').map(s => s.replace(/^"|"$/g, '').trim());
  // Baby- en flesvoeding hoort niet in een keuken.
  if (!f[cNl] || f[cGroup] === 'Flesvoeding en preparaten') continue;
  const full = readable(f[cNl]);
  const syn = f[cSyn] ? f[cSyn].split('/').map(readable) : [];
  // De naam met zijn bereidingen onder de kern; elk synoniem is een eigen ingrediënt, want NEVO zet spaghetti,
  // macaroni en mie samen onder "pasta witte".
  add(core(full) || full, [f[cNl].toLowerCase(), full], f[cGroup]);
  for (const s of syn) add(core(s) || s, [s], f[cGroup]);
}

const items = [];
for (const r of rows.values()) {
  const fam = call('productFamily', r.name);
  if (fam?.kind === 'junk') continue;
  const codes = new Set(call('allergenSuggestion', r.name).codes);
  const groups = [...r.groups];
  if (groups.includes('Kaas')) ['melk', 'lactose'].forEach(c => codes.add(c));
  if (groups.some(g => /^Vis/.test(g)) && !codes.has('schaaldieren') && !codes.has('weekdieren')) codes.add('vis');
  if (groups.some(g => g === 'Brood' || g === 'Gebak en koek') && !/glutenvrij/.test(r.name)) codes.add('gluten');
  const names = [...r.names].filter(n => n !== r.name).map(n => n.replace(/\|/g, '/'));
  items.push([ORDER.filter(c => codes.has(c)).join(','), r.name, names.join('|'), groups[0]]);
}

const out = {
  source: `NEVO online versie ${version}, RIVM, Bilthoven (https://www.rivm.nl/nederlands-voedingsstoffenbestand)`,
  license: 'Namen ongewijzigd uit NEVO; leesbare namen en allergenen zijn een aanvulling van Savour',
  version,
  items
};
fs.writeFileSync(new URL('js/data/ingredient-nevo.json', root), JSON.stringify(out));
console.log(
  `${items.length} NEVO-ingrediënten, ${items.reduce((n, i) => n + 1 + (i[2] ? i[2].split('|').length : 0), 0)} namen, ${(JSON.stringify(out).length / 1024).toFixed(0)} kB`
);
