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

async function mark(src, dest) {
  const img = sharp(src);
  const { width, height } = await img.metadata();
  const w = Math.round(Math.max(110, Math.min(220, width * 0.09)));
  const h = Math.round((logoMask.info.height / logoMask.info.width) * w);
  const margin = Math.round(Math.max(16, width * 0.018));
  const left = width - w - margin;
  const top = height - h - margin;
  // Helderheid van de hoek waar het merk komt.
  const { data } = await sharp(src)
    .extract({ left, top, width: w, height: h })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const light = data.reduce((a, b) => a + b, 0) / data.length > 140;
  const alpha = await sharp(logoMask.data, {
    raw: { width: logoMask.info.width, height: logoMask.info.height, channels: logoMask.info.channels }
  })
    .resize(w, h)
    .linear(light ? 0.6 : 0.55, 0) // zichtbaar maar rustig
    .toColourspace('b-w')
    .raw()
    .toBuffer();
  const tone = light ? 20 : 245;
  const overlay = await sharp({ create: { width: w, height: h, channels: 3, background: { r: tone, g: tone, b: tone } } })
    .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();
  const out = await sharp(src)
    .composite([{ input: overlay, left, top }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(dest, out);
  return light ? 'donker' : 'licht';
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
