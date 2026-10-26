// Test van het omrekenen (js/features/scale.js), zonder browser. Draaien: node tests/schaal.test.mjs
// Elk geval: ingrediëntregel, factor, verwachte uitkomst (zoals op het scherm en bij printen).
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/features/scale.js', import.meta.url), 'utf8');
const ctx = vm.createContext({ esc: s => String(s), t: s => s, currentLanguage: 'nl' });
vm.runInContext(source, ctx);

const cases = [
  // Eenheden binnen een familie
  ['1 tl zout', 20, '6 ⅔ el zout'],
  ['1 theelepel zout', 20, '6 ⅔ eetlepels zout'],
  ['2 tl kerrie', 1.5, '1 el kerrie'],
  ['1 tsp salt', 20, '6 ⅔ tbsp salt'],
  ['1 tsp salt', 24, '½ cup salt'],
  ['2 tbsp sugar', 6, '¾ cup sugar'],
  ['1 cup flour', 0.25, '¼ cup flour'],
  ['1 cup flour', 0.125, '2 tbsp flour'],
  ['3 el olie', 20, '900 ml olie'],
  ['250 g boter', 0.5, '125 g boter'],
  ['1000 gram slagroom', 4 / 3, '1333 gram slagroom'],
  ['0,5 kg aardappel', 0.5, '250 g aardappel'],
  ['2 kg bloem', 3, '6 kg bloem'],
  ['1 l melk', 0.05, '50 ml melk'],
  ['8 oz butter', 3, '1 ½ lb butter'],
  // Breuken en schrijfwijzen
  ['½ citroen', 2, '1 citroen'],
  ['1 1/2 tl gember', 2, '1 el gember'],
  ['1½ cup milk', 2, '3 cups milk'],
  ['1/2 bosje dille', 3, '1 ½ bosje dille'],
  ['3 eieren', 1.5, '4 ½ eieren'],
  ['10.000 gram langoustine koppen', 0.5, '5000 gram langoustine koppen'],
  ['2-3 el water', 2, '4-6 el water'],
  ['250g boter', 2, '500 g boter'],
  // Blijft staan
  ['zout naar smaak', 2, 'zout naar smaak'],
  ['1 snuf zout naar smaak', 3, '1 snuf zout naar smaak (niet omgerekend)'],
  ['250 g boter', 1, '250 g boter'],
  ['sap van 2 citroenen', 2, 'sap van 2 citroenen']
];

let failed = 0;
for (const [line, factor, want] of cases) {
  const got = ctx.scaleIngredientText(line, factor);
  if (got === want) console.log(`✓ ${line} × ${+factor.toFixed(3)} → ${got}`);
  else {
    failed++;
    console.log(`✗ ${line} × ${+factor.toFixed(3)}\n   verwacht: ${want}\n   kreeg:    ${got}`);
  }
}
// Opbrengst lezen
for (const [text, want] of [
  ['4 personen', 4],
  ['½ liter', 0.5],
  ['1 1/2 bak', 1.5],
  ['10 portions', 10]
]) {
  const got = ctx.parseYield(text)?.value;
  if (Math.abs(got - want) < 1e-9) console.log(`✓ opbrengst "${text}" → ${got}`);
  else {
    failed++;
    console.log(`✗ opbrengst "${text}": verwacht ${want}, kreeg ${got}`);
  }
}
console.log(`\n${cases.length + 4 - failed} van ${cases.length + 4} geslaagd`);
process.exitCode = failed ? 1 : 0;
