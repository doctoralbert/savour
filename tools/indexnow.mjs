// Meldt nieuwe pagina's uit sitemap.xml aan bij IndexNow (Bing en andere zoekmachines). Draai na het livezetten:
// npm run indexnow. Met --all gaan alle pagina's mee. De sleutel in de hoofdmap is openbaar en hoort geen geheim te zijn.
import fs from 'node:fs';

const HOST = 'savour.page';
const STATE = new URL('indexnow-verzonden.json', import.meta.url);
const key = fs
  .readdirSync('.')
  .find(f => /^[0-9a-f]{32}\.txt$/.test(f))
  ?.replace('.txt', '');
if (!key) throw new Error('IndexNow-sleutel niet gevonden in de hoofdmap');
const all = [...fs.readFileSync('sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sent = process.argv.includes('--all') || !fs.existsSync(STATE) ? [] : JSON.parse(fs.readFileSync(STATE, 'utf8'));
const urlList = all.filter(u => !sent.includes(u));
if (!urlList.length) {
  console.log("Geen nieuwe pagina's om aan te melden.");
  process.exit(0);
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList })
});
console.log(`${urlList.length} pagina's aangemeld: HTTP ${res.status}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
fs.writeFileSync(STATE, JSON.stringify([...new Set([...sent, ...urlList])], null, 1) + '\n');
