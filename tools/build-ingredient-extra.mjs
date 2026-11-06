// Maakt js/data/ingredient-extra.json: aanvulling op de basislijst (2026-11-06) met namen die Open Food Facts, NEVO
// en Savours eigen woordenlijst nog niet kennen.
//
// Bronnen:
//  - Wikipedia (nl), de lijsten in Categorie:Lijsten van voedsel die over ingrediënten gaan: groenten, keukenkruiden,
//    eetbare paddenstoelen, perenrassen, sauzen, alcoholische dranken en de kazen per land. Tekst onder
//    CC BY-SA 4.0; Savour neemt alleen de namen over, met de bronvermelding.
//  - Menuella (food-wiki) en njam.tv (ingrediënten A-Z) alleen als controlelijst: welke gewone keukeningrediënten
//    ontbreken nog? Die namen komen in Savours eigen lijst, zonder iets anders van die sites over te nemen.
// Allergenen: dezelfde voorstellen als de app (allergenSuggestion), plus wat de lijst zelf zegt: een kaas bevat
// melk, een paddenstoel is een paddenstoel, een likeur bevat alcohol. Liever een allergeen te veel dan te weinig.
//
// Gebruik: node tools/build-ingredient-extra.mjs <namen.json>
//   namen.json: { wiki: [[naam, [synoniemen], lijst]], menuella: [[naam, engels]], njam: [naam] }
//   (de namen uit de gedownloade pagina's; zie de uitleg hierboven)
// Uitvoer: { source, license, items: [[allergenen, naam, schrijfwijzen gescheiden door "|", bron, hoofdnaam]] }
// bron: "wiki" of "savour"; hoofdnaam: leeg, of de naam van een ingrediënt dat Savour al kent ("Doyenné du Comice" → peer).

import fs from 'fs';
import vm from 'vm';
import { kitchenIngredient } from './ingredient-clean.mjs';

const file = process.argv[2];
if (!file) {
  console.error('Gebruik: node tools/build-ingredient-extra.mjs <pad naar namen.json>');
  process.exit(1);
}
const root = new URL('..', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');
const ctx = vm.createContext({
  console,
  window: {},
  t: s => s,
  localStorage: { getItem() {} },
  // Alleen de bestaande lijsten: deze aanvulling zelf telt niet mee.
  fetch: url =>
    Promise.resolve(
      /extra/.test(url) ? { ok: false } : { ok: true, json: () => JSON.parse(read(url.replace(/^\//, ''))) }
    )
});
for (const f of ['js/features/products.js', 'js/features/product-families.js', 'js/features/product-starter.js'])
  vm.runInContext(read(f), ctx, { filename: f });
const base = await vm.runInContext('loadIngredientBase()', ctx);
const call = (fn, ...args) => vm.runInContext(`${fn}(...${JSON.stringify(args)})`, ctx);
const key = n => call('productKey', n);
const stem = k => call('familyStemKey', k).replace(/\s+/g, '');
const ORDER = vm.runInContext('ALLERGENS', ctx).map(a => a[0]);

// Wat Savour al kent, ook in enkelvoud of meervoud ("morieljes" is morielje, "lange vinger" zijn lange vingers).
const knownStem = new Map();
for (const k of base.index.keys()) if (!knownStem.has(stem(k))) knownStem.set(stem(k), base.main.get(k) || k);
const knownAs = name => {
  const k = key(name);
  if (!k) return '';
  if (base.index.has(k)) return base.main.get(k) || k;
  return knownStem.get(stem(k)) || '';
};

// Uit de lijsten: geen merken, geen kopjes en geen woorden die in een recept iets anders betekenen ("torta", "pavé").
const SKIP =
  /^(groentetuin|zwarte|almdudler|spekkoek|geneeskrachtige kruiden|valeriaan|sint-janskruid|dipsaus|witte saus|groene saus|jillz|dropshot|goldstrike|bruidstranen|els la vera|tote tante|captain morgan|pisa|kraamanijs|schrobbelèr|heet bier|radler|añu|marang|mexicaanse palmvaren|orval|trappist|nolly prat|zaad van de aleppoden|mopaneworm|gemengde rotsvissen|mandarijnpannenkoek|russische dressing|oud brood|dun brooddeeg|torta|montagna|italico|jura|dauphin|waterloo|providence|excelsior|rubens|damme|loo|nazareth|pavé|toma|tuma|motta|butte|dolomiti|carnia|crava|cuc|nis|brus|bross|strica|tabor|silter|salva|morello|pierino|bernardo|belmonte|boves|gioda|latteria|le creux|nantais|savoyard|castellano|burgos|lanzarote|la gomera|la serena|oropesa|serrat|le maréchal|sancerre|rochefort|tirolese|montanello|pastorino|pratolina|scacciata|primolino|perlanera|fiordivalle|del colle|degli albanesi|ormea|cesio|contrin|comelico|nevegal|ortler|toblach|sappada|piave|asco|aunis|autun|gien|mussy|niolo|noyan|oléron|ovalie|urt|tamié|thollon|moulis|morvan|arthon|amou|belloc|beaumont|chécy|dent du chat|la vache qui rit|caprice des dieux|saint-albray|saint-agur|saint-môret|chavroux|boursault|uniekaas|frico kaas|old amsterdam|maaslander|leerdammer|parrano|reypenaer|zaanlander|boer'n trots|de fryske|ruygentaler|bergens blonde|kernhem|ambiorix|bioferme|casse-croûte|kazemat|rodoric|sezoen|swalm|watou|passendale|patachouffe|huntsman|lymeswold|innkeepers choice|village green|blue monday|cotswold|derby|gloucester|cheshire|caithness|dunlop|tintern|whitehaven|harlech|ilchester|jean de brie|pic du vieux chaillol|tulipe noire extra vieille|grand condé|les fabuleux|isle)$/i;
const PLURAL_HEADING = /^(bleus|bries|carrés|tommes|fourmes|camemberts|briques|olivets|rigottes)$/i;
const CHEESE = /kazen$/;
const LIST_CODES = {
  'Lijst van eetbare paddenstoelen': ['paddenstoelen'],
  'Lijst van alcoholische dranken': ['alcohol']
};
const MAIN_OF = { 'Lijst van perenrassen': 'peer' };
// Wat de naam niet zegt, maar een kok wel weet: vissoorten, schelpdieren en vleessnitten uit de controlelijsten.
const NAME_CODES = {
  goudbrasem: ['vis'],
  pladijs: ['vis'],
  zeebarbeel: ['vis'],
  zonnevis: ['vis'],
  hondshaai: ['vis'],
  witvis: ['vis'],
  conch: ['weekdieren'],
  venusschelp: ['weekdieren'],
  eeuwei: ['ei'],
  'filet mignon': ['rundvlees'],
  'filet pur': ['rundvlees'],
  onglet: ['rundvlees'],
  entrecôte: ['rundvlees']
};
// Andere schrijfwijzen van wat Savour al kent, die enkelvoud en meervoud niet vinden.
const SAME_AS = {
  spruit: 'spruitjes',
  blauwbes: 'blauwe bes',
  knolselder: 'knolselderij',
  kidneyboon: 'kidneybonen',
  boontjes: 'sperziebonen'
};

const names = JSON.parse(fs.readFileSync(file, 'utf8'));
const rows = new Map();
function add(raw, syn, source, list = '') {
  let extraSyn = [...syn];
  const name = raw
    .replace(/\s*\(([^)]*)\)\s*/g, (_, x) => {
      if (!/synoniem/.test(x)) extraSyn.push(x);
      else extraSyn.push(x.replace(/synoniem:\s*/, ''));
      return ' ';
    })
    .replace(/\bWhisk y\b/, 'Whisky')
    .replace(/\s(AOP|AOC|DOP)$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!name || name.length < 3 || SKIP.test(name) || PLURAL_HEADING.test(name) || /^lijst van/i.test(name)) return;
  const lower = name.toLowerCase();
  if (!kitchenIngredient(lower) || (CHEESE.test(list) && lower.split(' ').length > 3)) return;
  extraSyn = extraSyn
    .map(s => s.toLowerCase().replace(/[()*]/g, '').trim())
    .filter(s => s.length > 2 && s !== lower && kitchenIngredient(s));
  // Kent Savour de naam of een synoniem al, dan wordt het alleen een extra schrijfwijze van dat ingrediënt.
  const main =
    MAIN_OF[list] ||
    (SAME_AS[lower] && knownAs(SAME_AS[lower])) ||
    [lower, ...extraSyn].map(knownAs).find(Boolean) ||
    '';
  if (main && knownAs(lower)) return; // de naam zelf is al bekend
  const k = key(lower);
  const row = rows.get(k) || { name, syn: new Set(), source, list, main };
  extraSyn.filter(s => !knownAs(s)).forEach(s => row.syn.add(s));
  if (source === 'wiki') row.source = 'wiki';
  rows.set(k, row);
}
for (const [n, syn, list] of names.wiki) {
  const parts = n
    .split(/,| of /)
    .map(s => s.trim())
    .filter(Boolean);
  add(parts[0], [...parts.slice(1), ...syn], 'wiki', list);
}
for (const [n] of names.menuella) add(n, [], 'savour');
for (const n of names.njam) add(n, [], 'savour');

const items = [];
for (const r of rows.values()) {
  const codes = new Set(call('allergenSuggestion', r.name).codes);
  if (CHEESE.test(r.list)) ['melk', 'lactose'].forEach(c => codes.add(c));
  (LIST_CODES[r.list] || []).forEach(c => codes.add(c));
  (NAME_CODES[r.name.toLowerCase()] || []).forEach(c => codes.add(c));
  // Hoort de naam bij een bekend ingrediënt, dan gelden de allergenen van dat ingrediënt (in de app).
  items.push([
    r.main ? '' : ORDER.filter(c => codes.has(c)).join(','),
    r.name,
    [...r.syn].map(s => s.replace(/\|/g, '/')).join('|'),
    r.source,
    r.main
  ]);
}
items.sort((a, b) => a[1].localeCompare(b[1], 'nl'));
const out = {
  source:
    'Wikipedia (nl), Categorie:Lijsten van voedsel (https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel); Savour',
  license: 'Namen uit Wikipedia onder CC BY-SA 4.0; allergenen zijn een aanvulling van Savour',
  items
};
fs.writeFileSync(new URL('js/data/ingredient-extra.json', root), JSON.stringify(out));
const by = {};
items.forEach(i => (by[i[3] + (i[4] ? '→bekend' : '')] = (by[i[3] + (i[4] ? '→bekend' : '')] || 0) + 1));
console.log(`${items.length} aanvullingen`, by, `${(JSON.stringify(out).length / 1024).toFixed(0)} kB`);
