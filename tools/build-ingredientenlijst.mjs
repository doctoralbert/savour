// Maakt assets/data/ingredientenlijst.json: de ingrediëntenlijst die Savour leest om allergenen voor te stellen,
// voor de openbare pagina /ingredientenlijst-allergenen (tools/build-seo.mjs).
//
// Precies wat de app doet: dezelfde basislijst (Open Food Facts), Savours eigen woordenlijst en de Nederlandse
// namen uit NEVO, opgebouwd door loadIngredientBase, en per ingrediënt het voorstel van allergenSuggestion.
// Draai dit opnieuw als een van die lijsten of de regels in js/features/products.js veranderen:
//   node tools/build-ingredientenlijst.mjs
//
// Uitvoer: { version, count, items: [[naam, allergenen, andere schrijfwijzen, Engels, bronnen], ...] }
// Allergenen als codes van Savour gescheiden door komma's; schrijfwijzen en Engels gescheiden door "|";
// bronnen als letters: o = Open Food Facts, s = Savour, n = NEVO, w = Wikipedia.

import fs from 'fs';
import vm from 'vm';

const root = new URL('..', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');

const ctx = vm.createContext({
  console,
  window: {},
  t: s => s,
  localStorage: { getItem() {} },
  // loadIngredientBase haalt de lijsten op; hier komen ze uit de map js/data.
  fetch: url => Promise.resolve({ ok: true, json: () => JSON.parse(read(url.replace(/^\//, ''))) })
});
for (const f of ['js/features/products.js', 'js/features/product-families.js', 'js/features/product-starter.js'])
  vm.runInContext(read(f), ctx, { filename: f });
const base = await vm.runInContext('loadIngredientBase()', ctx);
const suggest = name => vm.runInContext(`allergenSuggestion(${JSON.stringify(name)}).codes`, ctx);
const key = name => vm.runInContext(`productKey(${JSON.stringify(name)})`, ctx);

// Alle namen per regel uit de lijst: de app bewaart per naam een verwijzing naar dezelfde regel.
const keysOf = new Map();
for (const [k, item] of base.index) {
  if (!keysOf.has(item)) keysOf.set(item, []);
  keysOf.get(item).push(k);
}
const nevoNames = new Set(base.main.keys());
const rows = [];
const byName = new Map();
for (const [item, keys] of keysOf) {
  const nl = String(item[1] || '')
    .split('|')
    .filter(Boolean);
  // Alleen ingrediënten met een Nederlandse naam: Open Food Facts kent ook duizenden namen in andere talen.
  if (!nl.length) continue;
  const name = nl[0].charAt(0).toLocaleUpperCase('nl-NL') + nl[0].slice(1);
  const own = key(name);
  const sources = { savour: 's', nevo: 'n', wiki: 'w' }[item[7]] || 'o';
  const viaNevo = item[7] !== 'nevo' && keys.some(k => nevoNames.has(k));
  // Savours eigen woordenlijst bewaart elke schrijfwijze als eigen regel met dezelfde naam: die worden één regel.
  const row = byName.get(own) || { name, aliases: new Set(), en: new Set(), src: new Set() };
  keys.filter(k => k !== own).forEach(k => row.aliases.add(k));
  String(item[2] || '')
    .split('|')
    .filter(Boolean)
    .forEach(e => row.en.add(e));
  [...(sources + (viaNevo ? 'n' : ''))].forEach(s => row.src.add(s));
  byName.set(own, row);
}
for (const r of byName.values())
  rows.push([
    r.name,
    suggest(r.name).join(','),
    [...r.aliases].join('|'),
    [...r.en].slice(0, 3).join('|'),
    'osnw'
      .split('')
      .filter(s => r.src.has(s))
      .join('')
  ]);
rows.sort((a, b) => a[0].localeCompare(b[0], 'nl'));
const out = { version: base.nevo, count: rows.length, items: rows };
fs.mkdirSync(new URL('assets/data/', root), { recursive: true });
fs.writeFileSync(new URL('assets/data/ingredientenlijst.json', root), JSON.stringify(out));
console.log(`${rows.length} ingrediënten, ${rows.filter(r => r[1]).length} met een allergeen of kenmerk`);
