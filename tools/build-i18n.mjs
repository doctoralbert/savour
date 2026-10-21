// Maakt js/i18n/en.js, de.js en es.js uit tools/vertalingen.mjs. Draai: node tools/build-i18n.mjs
import fs from 'node:fs';
import { strings, patterns } from './vertalingen.mjs';
const outDir = new URL('../js/i18n/', import.meta.url);
fs.mkdirSync(outDir, { recursive: true });
const names = { en: 'Engels', de: 'Duits', es: 'Spaans' };
['en', 'de', 'es'].forEach((lang, i) => {
  const col = i + 1;
  const map = {};
  for (const row of strings) map[row[0].replace(/\s+/g, ' ').trim()] = row[col];
  const pats = patterns.map(row => { new RegExp(row[0]); return [row[0], row[col]]; });
  const body =
    `// ${names[lang]} — gegenereerd uit de vertaaltabel. Nederlands staat links, de vertaling rechts.\n` +
    `window.SAVOUR_I18N = window.SAVOUR_I18N || {};\n` +
    `window.SAVOUR_I18N.${lang} = {\n  strings: ${JSON.stringify(map, null, 4).replace(/\n}/, '\n  }')},\n` +
    `  patterns: ${JSON.stringify(pats)}\n};\n`;
  fs.writeFileSync(new URL(`${lang}.js`, outDir), body, 'utf8');
  console.log(lang, Object.keys(map).length, 'teksten', pats.length, 'patronen', (body.length / 1024).toFixed(1) + ' kB');
});
