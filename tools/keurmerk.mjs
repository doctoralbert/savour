// Keurmerk op de eigen foto's van de website: een klein, half doorzichtig Savour-woordmerk rechtsonder, zodat de
// beelden niet zomaar elders te gebruiken zijn. Het merk zit ín het bestand (niet alleen in de opmaak).
//
// De originelen staan in beelden-origineel/<map>/ (niet online: .vercelignore). Dit script maakt daaruit de bestanden
// in assets/<map>/. Het werkt altijd vanaf het origineel, dus opnieuw draaien geeft nooit een dubbel merk.
// Nieuwe foto? Zet hem in assets/<map>/ en draai: node tools/keurmerk.mjs  (het origineel wordt dan eerst bewaard).
// Op een lichte hoek (bijv. papier van een kladje) wordt het merk donker, op een donkere hoek licht.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const p = rel => path.join(ROOT, rel);
const MAPS = ['keuken', 'kladjes'];
const LOGO = p('assets/savour-wordmark.png');

// Het woordmerk als masker: lichte letters op donker → doorzichtigheid.
const logoMask = await sharp(LOGO).trim({ threshold: 25 }).greyscale().raw().toBuffer({ resolveWithObject: true });

// Het keurmerkje: een donker, half doorzichtig plaatje met afgeronde hoeken en daarop het lichte woordmerk. Zo is het
// op een donkere foto én op papier (kladjes) goed te zien.
async function mark(src, dest) {
  const { width, height } = await sharp(src).metadata();
  const w = Math.round(Math.max(130, Math.min(240, width * 0.12))); // breedte van het woordmerk
  const h = Math.round((logoMask.info.height / logoMask.info.width) * w);
  const padX = Math.round(w * 0.12);
  const padY = Math.round(h * 0.55);
  const bw = w + padX * 2;
  const bh = h + padY * 2;
  const margin = Math.round(Math.max(18, width * 0.022));
  const left = width - bw - margin;
  const top = height - bh - margin;
  const plate = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${bw}" height="${bh}"><rect width="${bw}" height="${bh}" rx="${Math.round(bh * 0.18)}" fill="rgb(6,10,11)" fill-opacity="0.5"/></svg>`
  );
  const alpha = await sharp(logoMask.data, {
    raw: { width: logoMask.info.width, height: logoMask.info.height, channels: logoMask.info.channels }
  })
    .resize(w, h)
    .linear(0.85, 0)
    .toColourspace('b-w')
    .raw()
    .toBuffer();
  const word = await sharp({ create: { width: w, height: h, channels: 3, background: { r: 246, g: 242, b: 234 } } })
    .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();
  const out = await sharp(src)
    .composite([
      { input: plate, left, top },
      { input: word, left: left + padX, top: top + padY }
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(dest, out);
  return 'keurmerk';
}

let n = 0;
for (const map of MAPS) {
  const live = p(`assets/${map}/`);
  const orig = p(`beelden-origineel/${map}/`);
  fs.mkdirSync(orig, { recursive: true });
  for (const f of fs.readdirSync(live).filter(f => /\.jpe?g$/i.test(f))) {
    const o = path.join(orig, f);
    const l = path.join(live, f);
    // Nog geen origineel bewaard: dan is het live-bestand het origineel (zonder merk).
    if (!fs.existsSync(o)) fs.copyFileSync(l, o);
    const tone = await mark(o, l);
    n++;
    console.log(`${map}/${f}: merk ${tone}`);
  }
}
console.log(`\n${n} foto's met keurmerk`);
