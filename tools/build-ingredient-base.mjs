// Maakt js/data/ingredient-base.json: de basislijst met ingrediënten voor Producten & allergenen.
//
// Bron: de ingrediëntentaxonomie van Open Food Facts (© Open Food Facts contributors, Open Database License,
// https://world.openfoodfacts.org/terms-of-use). Savour neemt de namen in vijf talen, de allergenen (geërfd via de
// bovenliggende ingrediënten, zoals Open Food Facts dat zelf doet) en de dichtheid over, zonder iets te veranderen.
//
// Gebruik (eenmalig downloaden in een lege map, daarna dit script):
//   curl -o <map>/ingredients.txt https://raw.githubusercontent.com/openfoodfacts/openfoodfacts-server/main/taxonomies/food/ingredients.txt
//   node tools/build-ingredient-base.mjs <map>/ingredients.txt
//
// Uitvoer: { source, license, version, items: [[allergenen, nl, en, de, es, fr, dichtheid], ...] }
// Allergenen als codes van Savour gescheiden door komma's; namen per taal gescheiden door "|"; dichtheid in g/ml of 0.

import fs from 'fs';

const file = process.argv[2];
if (!file) {
  console.error('Gebruik: node tools/build-ingredient-base.mjs <pad naar ingredients.txt>');
  process.exit(1);
}
const LANGS = ['nl', 'en', 'de', 'es', 'fr'];
const ALLERGEN_CODES = {
  'en:gluten': 'gluten',
  'en:crustaceans': 'schaaldieren',
  'en:eggs': 'ei',
  'en:fish': 'vis',
  'en:peanuts': 'pinda',
  'en:soybeans': 'soja',
  'en:milk': 'melk',
  'en:nuts': 'noten',
  'en:celery': 'selderij',
  'en:mustard': 'mosterd',
  'en:sesame-seeds': 'sesam',
  'en:sulphur-dioxide-and-sulphites': 'sulfiet',
  'en:lupin': 'lupine',
  'en:molluscs': 'weekdieren'
};
const ORDER = Object.values(ALLERGEN_CODES);

const idOf = (lang, name) => `${lang}:${name.trim().toLowerCase().replace(/\s+/g, '-')}`;

const blocks = fs
  .readFileSync(file, 'utf8')
  .replace(/\r/g, '')
  .split(/\n\s*\n/)
  .map(b => b.split('\n').filter(l => l.trim() && !l.startsWith('#')))
  .filter(b => b.length)
  .map(lines => {
    const out = { id: '', parents: [], names: {}, props: {} };
    for (const l of lines) {
      if (l.startsWith('<')) {
        const m = l.slice(1).trim().match(/^([a-z]{2}):\s*(.+)$/);
        if (m) out.parents.push(idOf(m[1], m[2]));
        continue;
      }
      const prop = l.match(/^([a-z_0-9]+):([a-z]{2}):\s*(.*)$/);
      if (prop) {
        out.props[prop[1]] = prop[3];
        continue;
      }
      const m = l.match(/^([a-z]{2}):\s*(.*)$/);
      if (!m) continue;
      const names = m[2]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      if (!out.id && names.length) out.id = idOf(m[1], names[0]);
      if (LANGS.includes(m[1])) out.names[m[1]] = names;
    }
    return out;
  })
  .filter(b => b.id && !/^(stopwords|synonyms)/.test(b.id));

const byId = new Map(blocks.map(b => [b.id, b]));
const memo = new Map();
// Eigenschap van het ingrediënt zelf, of anders van het eerste bovenliggende ingrediënt dat hem heeft.
function inherited(id, prop, depth = 0) {
  const key = id + '|' + prop;
  if (memo.has(key)) return memo.get(key);
  const b = byId.get(id);
  let value = '';
  if (b && depth < 25) {
    value = b.props[prop] || '';
    if (!value)
      for (const p of b.parents) if ((value = inherited(p, prop, depth + 1))) break;
  }
  memo.set(key, value);
  return value;
}

const clean = s => s.replace(/\s+/g, ' ').replace(/\|/g, '/').trim();
const items = [];
for (const b of blocks) {
  if (!LANGS.some(l => b.names[l]?.length)) continue;
  const codes = new Set(
    inherited(b.id, 'allergens')
      .split(',')
      .map(s => ALLERGEN_CODES[s.trim()])
      .filter(Boolean)
  );
  const density = parseFloat(inherited(b.id, 'density_g_per_ml')) || 0;
  items.push([
    ORDER.filter(c => codes.has(c)).join(','),
    ...LANGS.map(l => [...new Set((b.names[l] || []).map(clean))].join('|')),
    density ? Math.round(density * 1000) / 1000 : 0
  ]);
}

const out = {
  source: 'Open Food Facts, ingrediëntentaxonomie (https://github.com/openfoodfacts/openfoodfacts-server)',
  license: '© Open Food Facts contributors, Open Database License (ODbL) 1.0',
  version: new Date().toISOString().slice(0, 10),
  items
};
fs.writeFileSync(new URL('../js/data/ingredient-base.json', import.meta.url), JSON.stringify(out));
const withA = items.filter(i => i[0]).length;
console.log(
  `${items.length} ingrediënten, ${withA} met allergeen, ${(JSON.stringify(out).length / 1024).toFixed(0)} kB`
);
