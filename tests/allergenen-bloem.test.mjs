// Test van de allergenen-voorstellen voor bloem en meel in andere talen (js/features/products.js, allergenHints).
// Een Nederlandse kok die een Duits, Frans, Spaans of Italiaans recept importeert, moet bij bloem gluten zien; bloem
// van rijst, maïs, amandel en dergelijke niet. Draaien: node tests/allergenen-bloem.test.mjs (ook in npm run test:schaal).
import fs from 'node:fs';
import vm from 'node:vm';

const read = p => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const ctx = vm.createContext({ console, window: {}, t: s => s, localStorage: { getItem() {} } });
for (const f of ['js/features/products.js', 'js/features/product-families.js'])
  vm.runInContext(read(f), ctx, { filename: f });
const hints = name => vm.runInContext(`allergenHints(${JSON.stringify(name)})`, ctx);

const metGluten = [
  '250 g Mehl',
  'Weizenmehl Type 405',
  'Dinkelmehl',
  'Roggenmehl',
  '200 g farine T55',
  'farine de blé',
  '100 g harina de trigo',
  'farina 00'
];
const zonderGluten = [
  'Reismehl',
  'Maismehl',
  'Mandelmehl',
  'Kastanienmehl',
  'farine de riz',
  "farine d'amande",
  'farine de pois chiches',
  'harina de maíz',
  'harina de arroz',
  'farina di mandorle',
  'farina di riso',
  'Mehlspeise'
];
// Nederlandse en Engelse namen: deze uitkomsten mogen niet veranderen.
const vast = [
  ['meel', true],
  ['tarwemeel', true],
  ['bloem', true],
  ['flour', true],
  ['rijstmeel', false],
  ['maïsmeel', false],
  ['amandelmeel', false],
  ['boekweitmeel', false]
];

let failed = 0;
const check = (name, want) => {
  const got = hints(name).includes('gluten');
  if (got !== want) {
    failed++;
    console.log(`✗ ${name}: verwacht ${want ? 'gluten' : 'geen gluten'}, kreeg ${JSON.stringify(hints(name))}`);
  } else console.log(`✓ ${name}: ${want ? 'gluten' : 'geen gluten'}`);
};
metGluten.forEach(n => check(n, true));
zonderGluten.forEach(n => check(n, false));
vast.forEach(([n, want]) => check(n, want));
const total = metGluten.length + zonderGluten.length + vast.length;
console.log(`\n${total - failed} van ${total} geslaagd`);
process.exit(failed ? 1 : 0);
