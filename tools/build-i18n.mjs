// Maakt js/i18n/en.js, de.js, es.js en fr.js uit tools/vertalingen.mjs en tools/vertalingen-fr.mjs. Draai: node tools/build-i18n.mjs
import fs from 'node:fs';
import { strings, patterns } from './vertalingen.mjs';
import { stringsFr, patternsFr } from './vertalingen-fr.mjs';
const outDir = new URL('../js/i18n/', import.meta.url);
fs.mkdirSync(outDir, { recursive: true });
const names = { en: 'Engels', de: 'Duits', es: 'Spaans', fr: 'Frans' };
const key = text => text.replace(/\s+/g, ' ').trim();
const missing = [...strings.map(r => r[0]).filter(t => !stringsFr[key(t)]), ...patterns.map(r => r[0]).filter(t => !patternsFr[t])];
if (missing.length) throw new Error('Franse vertaling ontbreekt in tools/vertalingen-fr.mjs:\n' + missing.join('\n'));
['en', 'de', 'es', 'fr'].forEach((lang, i) => {
  const col = i + 1;
  const map = {};
  for (const row of strings) map[key(row[0])] = lang === 'fr' ? stringsFr[key(row[0])] : row[col];
  const pats = patterns.map(row => { new RegExp(row[0]); return [row[0], lang === 'fr' ? patternsFr[row[0]] : row[col]]; });
  const body =
    `// ${names[lang]} — gegenereerd uit de vertaaltabel. Nederlands staat links, de vertaling rechts.\n` +
    `window.SAVOUR_I18N = window.SAVOUR_I18N || {};\n` +
    `window.SAVOUR_I18N.${lang} = {\n  strings: ${JSON.stringify(map, null, 4).replace(/\n}/, '\n  }')},\n` +
    `  patterns: ${JSON.stringify(pats)}\n};\n`;
  fs.writeFileSync(new URL(`${lang}.js`, outDir), body, 'utf8');
  console.log(lang, Object.keys(map).length, 'teksten', pats.length, 'patronen', (body.length / 1024).toFixed(1) + ' kB');
});
