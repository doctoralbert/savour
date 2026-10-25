// Recepten importeren: tekst, documenten en foto's, met AI-structurering en controle vóór opslaan.

function showImportPanel() {
  if ($('inlineEditorHost')) $('inlineEditorHost').style.display = 'none';
  $('importPanel').style.display = 'block';
  $('importStatus').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Per importbron: welke bestanden de kiezer toont (accept) en welke de lezer aanneemt (test).
// "Andere bestanden" is alles wat geen Word, PDF of foto is; "Alle bestanden" neemt alles aan.
const IMPORT_SOURCES = {
  word: {
    option: 'importOptionWord',
    label: 'Word-bestand',
    types: 'Word (.doc, .docx)',
    accept: '.doc,.docx',
    test: /\.docx?$/i
  },
  pdf: {
    option: 'importOptionPdf',
    label: 'PDF-bestand',
    types: 'PDF (.pdf)',
    accept: '.pdf,application/pdf',
    test: /\.pdf$/i
  },
  photo: {
    option: 'importOptionPhoto',
    label: "Foto's",
    types: "Foto's (.jpg, .png, .webp)",
    accept: 'image/jpeg,image/png,image/webp',
    test: /\.(jpe?g|png|webp)$/i
  },
  other: {
    option: 'importOptionOther',
    label: 'Ander bestand',
    types: '.txt, .md, .rtf, .odt, .html, .csv en Savour-importbestanden (.json)',
    accept: '.txt,.md,.rtf,.odt,.html,.htm,.csv,.json,.pages',
    test: /\.(txt|md|rtf|odt|html?|csv|json|pages)$/i
  },
  all: {
    option: 'importOptionAll',
    label: 'Alle bestanden door elkaar',
    types: 'Word, PDF, foto’s en andere tekstbestanden, ook een hele map.',
    accept: '.doc,.docx,.pdf,.txt,.md,.rtf,.odt,.html,.htm,.csv,.json,.pages,image/jpeg,image/png,image/webp',
    test: /\.(docx?|pdf|txt|md|rtf|odt|html?|csv|json|pages|jpe?g|png|webp)$/i
  }
};
const IMPORT_ALLOWED = IMPORT_SOURCES.all.test;

// Klik op een bron: tekst opent het tekstvak, een bestandsbron meteen de bestandskiezer met alleen die bestanden.
function chooseImportSource(type) {
  if (type === 'photo' && !isPro()) return askForPro("Foto's");
  selectImportSource(type);
  // Foto's: eerst kiezen tussen een foto maken (camera) of foto's uit je album, dus niet meteen de bestandskiezer.
  if (type !== 'text' && type !== 'photo') $('importFile').click();
}

function selectImportSource(type) {
  // Foto's lezen gaat met AI: zonder Pro meteen uitleggen in plaats van na het uploaden.
  if (type === 'photo' && !isPro()) return askForPro("Foto's");
  importSource = type;
  importFileData = null;
  document.querySelectorAll('.import-option').forEach(x => x.classList.remove('selected'));
  const source = IMPORT_SOURCES[type];
  $(type === 'text' ? 'importOptionText' : source?.option)?.classList.add('selected');
  $('importStatus').textContent = '';
  $('importSourceNote').style.display = 'none';
  if (type === 'text') {
    $('importText').style.display = 'block';
    $('importDrop').style.display = 'none';
    $('importTextInput').focus();
    $('importSourceLabel').textContent = 'Bron: tekst invoeren';
    $('importSourceNote').style.display = 'flex';
  } else {
    $('importText').style.display = 'none';
    $('importDrop').style.display = 'block';
    $('importSourceLabel').textContent = source ? `Bron: ${source.label}` : '';
    $('importFile').value = '';
    $('importFile').accept = (source || IMPORT_SOURCES.all).accept;
    $('importDropTitle').textContent = source ? `${source.label} kiezen` : 'Bestanden selecteren';
    $('importDropTypes').textContent = (source || IMPORT_SOURCES.all).types;
    // Camera alleen bij foto's (en alles door elkaar); de knop staat in het bestandenvak, niet als eigen kopje.
    $('importCameraBtn').style.display = type === 'photo' || type === 'all' ? '' : 'none';
  }
}

// ---- Eerste keer inloggen: kort welkom met wat er kan, en meteen een begin maken ----
// Eén keer per account (per apparaat), alleen als de bibliotheek nog leeg is.
async function welcomeNewUser() {
  if (demoMode || !currentUser || recipes.length) return;
  const key = `savour_welcome_${currentUser.id}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
  } catch {
    return;
  }
  const choice = await askChoice(
    'Welkom bij Savour\n\nJe receptenboek is nog leeg. Zo vul je het: importeer je Word-bestanden of PDF’s in één keer, maak een foto van een handgeschreven kladje, of voer een recept zelf in. Daarna orden je alles in mappen en deel je het met je keukenteam.',
    [
      { label: 'Word of PDF importeren', hint: 'Ook honderden recepten tegelijk', value: 'file', primary: true },
      { label: 'Foto van een kladje', hint: 'De AI leest het voor je uit (Savour Pro)', value: 'camera' },
      { label: 'Zelf een recept invoeren', value: 'new' },
      { label: 'Eerst rondkijken', value: 'look' }
    ]
  );
  if (choice === 'file') {
    go('import');
    showImportPanel();
  } else if (choice === 'camera') {
    go('import');
    openCameraImport();
  } else if (choice === 'new') newRecipe();
}

// ---- Camera: foto van een kladje maken (Savour Pro; gaat via de AI, net als een foto uit je album) ----
// Telefoon en tablet: de eigen camera-app (scherper, met scherpstellen). Computer: webcam in een venster.
let cameraStream = null;

async function openCameraImport() {
  if (!isPro()) return askForPro("Foto's");
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (touch || !navigator.mediaDevices?.getUserMedia) return $('importCamera').click();
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1440 } },
      audio: false
    });
  } catch (e) {
    // Geen camera of geen toestemming: dan gewoon een foto kiezen.
    toast('Camera niet beschikbaar. Kies een foto van je kladje.');
    return $('importCamera').click();
  }
  $('cameraVideo').srcObject = cameraStream;
  $('cameraModal').classList.add('open');
}

function closeCameraModal() {
  cameraStream?.getTracks().forEach(t => t.stop());
  cameraStream = null;
  $('cameraVideo').srcObject = null;
  $('cameraModal').classList.remove('open');
}

async function takeCameraPhoto() {
  const video = $('cameraVideo');
  if (!video.videoWidth) return;
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92));
  closeCameraModal();
  if (blob) importCameraFile(new File([blob], `kladje-${Date.now()}.jpg`, { type: 'image/jpeg' }));
}

function handleCameraFile(input) {
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  // Sommige telefoons geven de foto geen extensie; de importroute herkent foto's aan .jpg/.png/.webp.
  importCameraFile(
    /\.(jpe?g|png|webp)$/i.test(file.name || '')
      ? file
      : new File([file], `kladje-${Date.now()}.jpg`, { type: file.type || 'image/jpeg' })
  );
}

// Na de foto meteen verwerken: in de keuken zo min mogelijk klikken. Daarna controleer je het recept zoals altijd.
function importCameraFile(file) {
  showImportPanel();
  selectImportSource('photo');
  setImportFiles([file]);
  importSource = 'photo';
  $('importSourceLabel').textContent = 'Bron: foto met je camera';
  processImport();
}

function triggerImportFile() {
  if (!IMPORT_SOURCES[importSource]) selectImportSource('all');
  $('importFile').click();
}

function triggerImportFolder() {
  if (!IMPORT_SOURCES[importSource]) selectImportSource('all');
  $('importFile').value = '';
  $('importFolder').click();
}

function normalizeImportFiles(list) {
  return Array.from(list || []).filter(f => f && f.size > 0);
}

function setImportFiles(files) {
  const all = normalizeImportFiles(files);
  // Alleen de bestanden die bij de gekozen bron horen (bij een hele map zitten er vaak andere tussen).
  if (!IMPORT_SOURCES[importSource]) importSource = 'all';
  const list = all.filter(f => IMPORT_SOURCES[importSource].test.test(f.name || ''));
  const skipped = all.length - list.length;
  if (skipped)
    toast(
      `${skipped} bestand${skipped === 1 ? '' : 'en'} overgeslagen: hoort niet bij "${IMPORT_SOURCES[importSource].label}". Kies "Alle bestanden door elkaar" om alles mee te nemen.`
    );
  importFileData = list;
  if (!list.length) {
    $('importSourceNote').style.display = 'none';
    $('importStatus').textContent = skipped ? 'Geen bestanden van dit soort gekozen.' : '';
    return;
  }
  $('importSourceLabel').textContent =
    list.length === 1 ? `Bestand: ${list[0].name}` : `${list.length} bestanden geselecteerd`;
  $('importSourceNote').style.display = 'flex';
  $('importStatus').textContent = `${list.length} bestand${list.length === 1 ? '' : 'en'} klaar om te verwerken.`;
}

function handleImportFile(input) {
  setImportFiles(input.files);
}

function handleImportFolder(input) {
  setImportFiles(input.files);
}

function updateImportTextState() {
  importFileData = null;
  importSource = 'text';
  $('importSourceLabel').textContent = 'Bron: tekst invoeren';
  $('importSourceNote').style.display = 'flex';
}

function resetImportSource() {
  window.__aiImportedPhoto = '';
  importSource = '';
  importFileData = null;
  $('importFile').value = '';
  $('importFolder').value = '';
  $('importTextInput').value = '';
  $('importText').style.display = 'none';
  $('importDrop').style.display = 'block';
  $('importSourceNote').style.display = 'none';
  $('importStatus').textContent = '';
  $('importCameraBtn').style.display = 'none';
  document.querySelectorAll('.import-option').forEach(x => x.classList.remove('selected'));
}

// De Word-lezer (mammoth, ruim 600 KB) pas laden als er echt een Word-bestand wordt geïmporteerd,
// zodat Savour op de telefoon snel opstart.
let mammothLoading = null;
function loadMammoth() {
  if (window.mammoth) return Promise.resolve();
  mammothLoading ||= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/mammoth@1.6.0/mammoth.browser.min.js';
    s.onload = () => resolve();
    s.onerror = () => {
      mammothLoading = null;
      reject(new Error('Word-importmodule kon niet worden geladen.'));
    };
    document.head.appendChild(s);
  });
  return mammothLoading;
}

async function extractImportText(file) {
  if (!file) return '';
  const name = (file.name || '').toLowerCase();
  if (name.endsWith('.docx')) {
    await loadMammoth();
    const ab = await file.arrayBuffer();
    // Via HTML i.p.v. kale tekst: dan blijven koppen, tabellen en opsommingen herkenbaar.
    const result = await mammoth.convertToHtml({ arrayBuffer: ab });
    return htmlToRecipeText(result.value || '');
  }
  if (name.endsWith('.doc')) return docToText(await file.arrayBuffer());
  if (name.endsWith('.txt') || name.endsWith('.csv') || name.endsWith('.md')) return await file.text();
  // Een opgeslagen webpagina: alleen de inhoud, zonder menu's en scripts.
  if (name.endsWith('.html') || name.endsWith('.htm')) {
    const page = new DOMParser().parseFromString(await file.text(), 'text/html');
    page.querySelectorAll('script, style, nav, header, footer, noscript').forEach(el => el.remove());
    return htmlToRecipeText(page.body?.innerHTML || '');
  }
  if (name.endsWith('.rtf')) return rtfToText(await file.text());
  if (name.endsWith('.odt')) return await odtToText(file);
  if (name.endsWith('.pages'))
    throw new Error('Pages-bestanden kunnen niet worden gelezen. Exporteer het in Pages als Word (.docx) of PDF.');
  if (name.endsWith('.pdf')) {
    try {
      const pdfjs = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs');
      // Zonder worker weigert pdf.js elk bestand.
      pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs';
      const ab = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: ab }).promise;
      const out = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        out.push(pdfItemsToLines((await page.getTextContent()).items));
      }
      return out.join('\n\n');
    } catch (e) {
      throw new Error('PDF kon niet als tekst worden uitgelezen.');
    }
  }
  return '';
}

// ---- Bestanden omzetten naar regels voor de lezer ----

// Oud Word (.doc, Word 97-2003): een "compound file" met daarin de stroom WordDocument. De tekst staat in
// stukken (piece table in de stroom 0Table/1Table), elk stuk als Windows-1252 of als UTF-16.
function docToText(ab) {
  const fail = () => {
    throw new Error('Dit .doc-bestand kon niet worden gelezen. Sla het in Word op als .docx en probeer opnieuw.');
  };
  const v = new DataView(ab);
  if (ab.byteLength < 512 || v.getUint32(0, true) !== 0xe011cfd0) fail();
  const sectorSize = 1 << v.getUint16(0x1e, true);
  const miniSize = 1 << v.getUint16(0x20, true);
  const cutoff = v.getUint32(0x38, true);
  const sectorAt = n => (n + 1) * sectorSize;
  // Sectortabel (FAT): de eerste 109 verwijzingen staan in de kop, de rest in een keten van DIFAT-sectoren.
  const fatSectors = [];
  for (let i = 0; i < 109; i++) fatSectors.push(v.getUint32(0x4c + i * 4, true));
  for (let s = v.getInt32(0x44, true), k = 0; s >= 0 && k < v.getUint32(0x48, true); k++) {
    for (let i = 0; i < sectorSize / 4 - 1; i++) fatSectors.push(v.getUint32(sectorAt(s) + i * 4, true));
    s = v.getInt32(sectorAt(s) + sectorSize - 4, true);
  }
  const fat = [];
  for (const s of fatSectors.slice(0, v.getUint32(0x2c, true)))
    for (let i = 0; i < sectorSize / 4; i++) fat.push(v.getInt32(sectorAt(s) + i * 4, true));
  const chain = (start, table) => {
    const out = [];
    for (let s = start; s >= 0 && out.length < table.length; s = table[s]) out.push(s);
    return out;
  };
  const readChain = (start, size, table, at, unit, source) => {
    const out = new Uint8Array(size);
    let pos = 0;
    for (const s of chain(start, table)) {
      const part = new Uint8Array(source, at(s), Math.min(unit, size - pos));
      out.set(part, pos);
      if ((pos += part.length) >= size) break;
    }
    return out;
  };
  const dirBytes = readChain(
    v.getInt32(0x30, true),
    chain(v.getInt32(0x30, true), fat).length * sectorSize,
    fat,
    sectorAt,
    sectorSize,
    ab
  );
  const dv = new DataView(dirBytes.buffer);
  const entries = [];
  for (let o = 0; o + 128 <= dirBytes.length; o += 128) {
    const len = dv.getUint16(o + 0x40, true);
    let entryName = '';
    for (let i = 0; i + 2 < len; i += 2) entryName += String.fromCharCode(dv.getUint16(o + i, true));
    entries.push({ name: entryName, start: dv.getInt32(o + 0x74, true), size: dv.getUint32(o + 0x78, true) });
  }
  const root = entries[0];
  const miniFat = [];
  const miniFatBytes = readChain(
    v.getInt32(0x3c, true),
    v.getUint32(0x40, true) * sectorSize,
    fat,
    sectorAt,
    sectorSize,
    ab
  );
  for (let i = 0; i + 4 <= miniFatBytes.length; i += 4)
    miniFat.push(new DataView(miniFatBytes.buffer).getInt32(i, true));
  const miniStream = root ? readChain(root.start, root.size, fat, sectorAt, sectorSize, ab).buffer : null;
  const stream = streamName => {
    const e = entries.find(x => x.name === streamName);
    if (!e) return null;
    if (e.size < cutoff) return readChain(e.start, e.size, miniFat, s => s * miniSize, miniSize, miniStream);
    return readChain(e.start, e.size, fat, sectorAt, sectorSize, ab);
  };
  const word = stream('WordDocument');
  if (!word || word.length < 0x1aa) fail();
  const wv = new DataView(word.buffer);
  if (wv.getUint16(0, true) !== 0xa5ec) fail();
  const table = stream(wv.getUint16(0x0a, true) & 0x0200 ? '1Table' : '0Table');
  if (!table) fail();
  const tv = new DataView(table.buffer);
  const textLength = wv.getUint32(0x4c, true);
  // Opmaakblokken overslaan tot de stukkentabel (0x02).
  let p = wv.getUint32(0x1a2, true);
  const clxEnd = p + wv.getUint32(0x1a6, true);
  while (p < clxEnd && table[p] === 0x01) p += 3 + tv.getInt16(p + 1, true);
  if (table[p] !== 0x02) fail();
  const lcb = tv.getUint32(p + 1, true);
  const plc = p + 5;
  const pieces = (lcb - 4) / 12;
  const cp1252 = new TextDecoder('windows-1252');
  const utf16 = new TextDecoder('utf-16le');
  let text = '';
  for (let i = 0; i < pieces && text.length < textLength; i++) {
    const from = tv.getUint32(plc + i * 4, true);
    const to = tv.getUint32(plc + (i + 1) * 4, true);
    const fc = tv.getUint32(plc + (pieces + 1) * 4 + i * 8 + 2, true);
    const compressed = (fc & 0x40000000) !== 0;
    const at = compressed ? (fc & 0x3fffffff) / 2 : fc;
    const bytes = word.subarray(at, at + (to - from) * (compressed ? 1 : 2));
    text += (compressed ? cp1252 : utf16).decode(bytes);
  }
  return (
    text
      .slice(0, textLength)
      // Velden: de code (tussen 0x13 en 0x14) weg, het zichtbare resultaat blijft.
      .replace(/\x13[^\x13\x14\x15]*\x14?/g, '')
      .replace(/\x15/g, '')
      .replace(/\x07\x07/g, '\n')
      .replace(/\x07/g, '\t')
      .replace(/[\r\x0b\x0c]/g, '\n')
      .replace(/[\x00-\x08\x0e-\x1f]/g, '')
      .replace(/\t+\n/g, '\n')
  );
}

// Word-HTML naar regels: koppen worden "# naam" (receptgrens), tabelrijen één regel, opsommingen "- ".
// Een volledig vetgedrukte korte regel is een receptnaam of een onderdeelkopje, maar nooit een kopje
// als "Ingrediënten", "Voor de saus" of "Bereiding:".
function htmlToRecipeText(html) {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const lines = [];
  const text = el => el.textContent.replace(/\s+/g, ' ').trim();
  const isBoldTitle = el => {
    const t = text(el);
    // Word knipt vette tekst vaak in stukjes: vergelijk zonder spaties.
    const bold = [...el.querySelectorAll('strong, b')].map(b => b.textContent).join('');
    return (
      t &&
      bold.replace(/\s+/g, '') === t.replace(/\s+/g, '') &&
      t.length <= 80 &&
      (!/[.!?:;,]$/.test(t) || (READER_NUMBERED_TITLE.test(t) && /[^.]\.$/.test(t))) &&
      !/^voor\s/i.test(t) &&
      !readerIsHeading(t) &&
      !readerIsIngredientLine(t)
    );
  };
  const walk = node => {
    for (const el of node.children) {
      const tag = el.tagName.toLowerCase();
      // Kop 1 is altijd een receptgrens. Kop 2/3 en vette regels zijn "zacht" (#b): een receptnaam
      // óf een onderdeel als "Deel 1" of "Deeg"; dat beslist de lezer (splitRecipeText).
      if (tag === 'h1') lines.push('', `# ${text(el)}`);
      else if (/^h[23]$/.test(tag)) lines.push('', `#b ${text(el)}`);
      else if (/^h[4-6]$/.test(tag)) lines.push(text(el));
      else if (tag === 'p' && isBoldTitle(el)) lines.push('', `#b ${text(el)}`);
      else if (tag === 'p' && el.querySelector('br')) {
        // Zachte regeleinden (Shift+Enter) zijn echte regels: anders plakken twee recepten aan elkaar.
        el.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
        lines.push(...el.textContent.split('\n').map(l => l.replace(/\s+/g, ' ').trim()));
      } else if (tag === 'p') lines.push(text(el));
      else if (tag === 'li') lines.push(`- ${text(el)}`);
      else if (tag === 'tr') lines.push([...el.children].map(text).filter(Boolean).join(' '));
      else if (/^(ul|ol|table|thead|tbody|div|blockquote)$/.test(tag)) walk(el);
      else lines.push(text(el));
    }
  };
  walk(doc.body.firstElementChild);
  return lines.join('\n');
}

// PDF-tekststukken naar regels op volgorde van de pagina; een grote verticale witruimte wordt een lege regel.
function pdfItemsToLines(items) {
  const rows = [];
  for (const it of items) {
    if (!it.str) continue;
    const y = Math.round(it.transform[5]);
    const x = it.transform[4];
    let row = rows.find(r => Math.abs(r.y - y) <= 3);
    if (!row) rows.push((row = { y, parts: [], height: it.height || 10 }));
    row.parts.push({ x, str: it.str });
  }
  rows.sort((a, b) => b.y - a.y);
  const out = [];
  rows.forEach((r, i) => {
    if (i && rows[i - 1].y - r.y > Math.max(r.height, 10) * 1.9) out.push('');
    out.push(
      r.parts
        .sort((a, b) => a.x - b.x)
        .map(p => p.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    );
  });
  return out.join('\n');
}

// RTF naar tekst. Groepen met opmaakgegevens (lettertypes, kleuren, stijlen, afbeeldingen) worden
// overgeslagen; \par wordt een nieuwe regel, \'e9 wordt é en \u233? wordt é.
function rtfToText(rtf) {
  const src = String(rtf || '');
  const skipDestinations =
    /^(fonttbl|colortbl|stylesheet|info|pict|object|themedata|colorschememapping|latentstyles|datastore|xmlnstbl|listtable|listoverridetable|rsidtbl|generator|header|footer)$/;
  const cp1252 = new TextDecoder('windows-1252');
  const stack = [];
  let skip = false;
  let out = '';
  let ucSkip = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') {
      stack.push(skip);
      continue;
    }
    if (ch === '}') {
      skip = stack.pop() || false;
      continue;
    }
    if (ch === '\\') {
      const next = src[i + 1];
      if (next === '\\' || next === '{' || next === '}') {
        if (!skip) out += next;
        i++;
        continue;
      }
      if (next === "'") {
        if (!skip && !ucSkip) out += cp1252.decode(new Uint8Array([parseInt(src.substr(i + 2, 2), 16)]));
        if (ucSkip) ucSkip--;
        i += 3;
        continue;
      }
      if (next === '*') {
        skip = true;
        i++;
        continue;
      }
      const m = src.slice(i + 1).match(/^([a-z]+)(-?\d+)? ?/i);
      if (!m) {
        i++;
        continue;
      }
      i += m[0].length;
      const word = m[1];
      if (skipDestinations.test(word)) skip = true;
      else if (!skip) {
        if (word === 'par' || word === 'line') out += '\n';
        else if (word === 'tab' || word === 'cell') out += ' ';
        else if (word === 'row') out += '\n';
        else if (word === 'u' && m[2] !== undefined) {
          const n = Number(m[2]);
          out += String.fromCharCode(n < 0 ? n + 65536 : n);
          ucSkip = 1;
        }
      }
      continue;
    }
    if (ch === '\r' || ch === '\n') continue;
    if (!skip) {
      if (ucSkip) ucSkip--;
      else out += ch;
    }
  }
  return out
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ODT (LibreOffice/OpenOffice) is een zip; de tekst staat in content.xml.
async function odtToText(file) {
  if (!window.JSZip)
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      s.onload = resolve;
      s.onerror = () => reject(new Error('ODT-importmodule kon niet worden geladen.'));
      document.head.appendChild(s);
    });
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xml = await zip.file('content.xml')?.async('string');
  if (!xml) throw new Error('Dit ODT-bestand bevat geen leesbare tekst.');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const lines = [];
  doc.querySelectorAll('h, p').forEach(el => {
    const t = el.textContent.replace(/\s+/g, ' ').trim();
    lines.push(el.localName === 'h' && t ? `# ${t}` : t);
  });
  return lines.join('\n');
}

// Recepten uit tekst halen met de eigen lezer (js/features/recipe-reader.js). Categorie via de trefwoorden
// van de chef; alles wat de lezer niet zeker weet, is gemarkeerd om te controleren.
function readRecipesLocally(text, extra = {}) {
  return splitRecipeText(text).map(r => ({
    ...r,
    category: importCategory(r.title, ''),
    _needsReview: r.readerConfidence !== 'high',
    ...extra
  }));
}
function removeBatchDraft(index) {
  syncBatchDrafts();
  if (index < 0 || index >= batchDrafts.length) return;
  batchDrafts.splice(index, 1);
  renderBatchDrafts();
  $('batchStatus').textContent = batchDrafts.length
    ? `${batchDrafts.length} recepten over om te controleren.`
    : 'Geen recepten meer in deze batch.';
}

// Roept de AI-import aan met het sessietoken van de ingelogde gebruiker.
async function callAiImport(body) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error('Log in om recepten met AI te importeren.');
  const response = await fetch('/api/ai-import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...body, categories: categories.slice(), language: currentLanguage })
  });
  const result = await response.json().catch(() => ({}));
  // De server geeft na elke AI-import de stand van de teller terug.
  if (result?.usage) Object.assign(savourPlan, { used: result.usage.used, limit: result.usage.limit });
  if (!response.ok) {
    const raw = result?.error || '';
    // Tegoed op geeft ook 429, maar opnieuw proberen heeft dan geen zin; net als bij geen Pro of limiet bereikt.
    const noCredit = /quota|billing|credit/i.test(raw);
    const final = noCredit || ['pro_required', 'limit_reached', 'not_configured'].includes(result?.code);
    if (result?.code === 'pro_required') savourPlan.pro = false;
    const message = /OPENAI_API_KEY/.test(raw)
      ? 'De AI is op deze server niet ingesteld.'
      : noCredit
        ? 'Het OpenAI-tegoed is op.'
        : raw || (response.status === 413 ? 'Het bestand is te groot.' : 'AI-import mislukt.');
    throw Object.assign(new Error(message), { status: response.status, final, code: result?.code });
  }
  return Array.isArray(result?.recipes) ? result.recipes.map(r => ({ ...r, model: result.model || '' })) : [];
}

// Bij veel bestanden tegelijk kan de AI tijdelijk "te druk" zijn (429) of even storen (502–504):
// dan nog een paar keer proberen, met steeds iets langer wachten.
async function callAiImportWithRetry(body) {
  const waits = [2000, 5000, 10000];
  for (let attempt = 0; ; attempt++) {
    try {
      return await callAiImport(body);
    } catch (e) {
      const temporary =
        !e.final && (e.status === 429 || (e.status >= 502 && e.status <= 504) || e instanceof TypeError);
      if (!temporary || attempt >= waits.length) throw e;
      await new Promise(r => setTimeout(r, waits[attempt]));
    }
  }
}

// Categorie van een geïmporteerd recept: eerst de trefwoorden van de chef, anders de keuze van de AI
// (alleen als die in de eigen lijst staat). De chef ziet het resultaat altijd vóór opslaan.
function importCategory(title, aiCategory) {
  const byKeyword = suggestCategory(title);
  if (byKeyword) return byKeyword.category;
  const ai = String(aiCategory || '').trim();
  return categories.includes(ai) ? ai : 'Eigen recepten';
}

function normalizeAiRecipe(r, extra) {
  // "385.Hoender Tom Yam terrine": het nummer uit het receptenboek hoort niet in de naam.
  const title = cleanBatchTitle(String(r.title || '')) || 'Onbenoemd recept';
  return {
    title,
    ingredients: Array.isArray(r.ingredients) ? r.ingredients.map(String).filter(Boolean) : [],
    steps: Array.isArray(r.steps) ? r.steps.map(String).filter(Boolean) : [],
    yield: String(r.yield || '').trim(),
    category: importCategory(title, r.category),
    _needsReview: Boolean(r.needs_review),
    // Wat de AI niet zeker kon lezen: de chef controleert dit vóór opslaan.
    _unclear: Array.isArray(r.unclear) ? r.unclear.map(String).filter(Boolean) : [],
    // Niet volledig in de bron (bijv. afgesneden op de foto): wordt overgeslagen, met melding.
    _incomplete: Boolean(r.incomplete),
    // Wat de AI letterlijk las en met welk model: om getallen snel naast de foto te leggen.
    _transcription: Array.isArray(r.transcription) ? r.transcription.map(String) : [],
    _model: String(r.model || ''),
    _byAi: true,
    ...extra
  };
}

// Knipt lange teksten in stukken van max. ~8.000 tekens (ruim binnen de tijdslimiet van één AI-verzoek), bij voorkeur op een receptkop, anders op een witregel.
const AI_IMPORT_CHUNK_CHARS = 8000;

function chunkImportText(text) {
  const lines = String(text || '')
    .replace(/\r/g, '')
    .split('\n');
  const chunks = [];
  let current = [];
  let size = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isBoundary = looksLikeRecipeHeading(line, lines[i + 1]) || !line.trim();
    if (size >= AI_IMPORT_CHUNK_CHARS * 0.75 && isBoundary && current.length) {
      chunks.push(current.join('\n'));
      current = [];
      size = 0;
    }
    if (size + line.length > AI_IMPORT_CHUNK_CHARS && current.length) {
      chunks.push(current.join('\n'));
      current = [];
      size = 0;
    }
    current.push(line);
    size += line.length + 1;
  }
  if (current.join('').trim()) chunks.push(current.join('\n'));
  return chunks.filter(c => c.trim());
}

// Melding als iets alleen met AI kan en de gebruiker geen Pro heeft (of de limiet bereikt is).
function proRequiredError(what) {
  return Object.assign(new Error(`${what} lezen gaat met AI: alleen in Savour Pro.`), { code: 'pro_required' });
}

async function importImageFile(file) {
  if (!isPro()) throw proRequiredError("Foto's");
  const dataUrl = await compressPhoto(file);
  // 1. Rechtop zetten: de AI leest handschrift veel beter als het rechtop staat (en de chef vergelijkt makkelijker).
  const edge = await callAiOrient(dataUrl).catch(() => 'top');
  const upright = await rotateDataUrl(dataUrl, { left: 90, right: 270, bottom: 180 }[edge] || 0);
  // 2. Lezen van een kopie in grijstinten met meer contrast; het recept bewaart de gewone foto.
  const forReading = await enhanceForReading(upright);
  const aiRecipes = await callAiImportWithRetry({ image: forReading, filename: file.name });
  if (!aiRecipes.length) throw new Error('Geen recept uit de foto herkend.');
  return aiRecipes.map(r => normalizeAiRecipe(r, { photo: upright, _fromPhoto: true, sourceFile: file.name }));
}

// Vraagt de AI aan welke rand de bovenkant van de tekst zit (top/right/bottom/left). Telt niet als AI-import.
async function callAiOrient(image) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) return 'top';
  const response = await fetch('/api/ai-import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ image, mode: 'orient' })
  });
  const result = await response.json().catch(() => ({}));
  return response.ok && ['top', 'right', 'bottom', 'left'].includes(result.top_edge) ? result.top_edge : 'top';
}

// Kopie in grijstinten met wat meer contrast en licht: donkere keukenfoto's worden zo beter leesbaar.
async function enhanceForReading(dataUrl) {
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.filter = 'grayscale(1) contrast(1.35) brightness(1.1)';
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.9);
}

// Knop "Draai foto" bij een recept: een kwartslag met de klok mee.
async function rotateBatchPhoto(index) {
  syncBatchDrafts();
  const r = batchDrafts[index];
  if (!r?.photo) return;
  r.photo = await rotateDataUrl(r.photo, 90);
  renderBatchDrafts();
}

// Draait een afbeelding (data-URL) een kwart, half of driekwart slag met de klok mee.
async function rotateDataUrl(dataUrl, degrees) {
  const deg = [90, 180, 270].includes(Number(degrees)) ? Number(degrees) : 0;
  if (!deg) return dataUrl;
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const sideways = deg !== 180;
  const canvas = document.createElement('canvas');
  canvas.width = sideways ? img.height : img.width;
  canvas.height = sideways ? img.width : img.height;
  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  return canvas.toDataURL('image/jpeg', 0.88);
}

// Een gescande PDF bevat geen tekst maar afbeeldingen: elke pagina (max. 10) gaat als afbeelding naar de AI.
async function importScannedPdf(file) {
  const pdfjs = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs';
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const drafts = [];
  for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
    $('importStatus').textContent = `${file.name}: pagina ${i} van ${Math.min(pdf.numPages, 10)} wordt gelezen…`;
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1600 / page.getViewport({ scale: 1 }).width });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const image = canvas.toDataURL('image/jpeg', 0.82);
    const aiRecipes = await callAiImportWithRetry({ image, filename: `${file.name} (pagina ${i})` });
    drafts.push(...aiRecipes.map(r => normalizeAiRecipe(r, { sourceFile: file.name })));
  }
  return drafts;
}

// Word, PDF en tekst: eerst de Savour-lezer. Is die bij alle recepten zeker, dan is er geen AI nodig
// (gratis, telt niet mee). Alleen bij twijfel én met Pro leest de AI het bestand. Lukt de AI niet (storing,
// limiet bereikt), dan gaat er niets verloren: de Savour-lezer neemt het over, gemarkeerd om te controleren.
async function importTextFile(file) {
  const sourceText = await extractImportText(file);
  if (!sourceText.trim()) {
    if (!/\.pdf$/i.test(file.name)) throw new Error('Dit bestand bevat geen leesbare tekst.');
    if (!isPro()) throw proRequiredError("Gescande PDF's");
    return importScannedPdf(file);
  }
  return applyImportFixes(await readTextRecipes(file, sourceText), sourceText);
}

// Savour-importbestand (.json): recepten die al zijn uitgelezen, bijvoorbeeld een archief dat Savour voor je
// heeft voorbereid. Ze komen in het controlescherm; er wordt pas iets opgeslagen als jij op Opslaan klikt.
// Vorm: { "savour": "recepten", "recipes": [{ title, ingredients[], steps[], yield, sourceFile, photo, unclear[],
// needsReview }] }. "photo" is het originele kladje (data:image/...), bewaard als origineel bij het recept.
async function importSavourFile(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error('Dit .json-bestand is geen Savour-importbestand.');
  }
  const list = Array.isArray(data) ? data : data?.recipes;
  if (!Array.isArray(list) || !list.length) throw new Error('Dit .json-bestand bevat geen recepten voor Savour.');
  const text = v => String(v ?? '').trim();
  const lines = v => (Array.isArray(v) ? v : text(v).split('\n')).map(text).filter(Boolean);
  return list
    .filter(r => r && typeof r === 'object' && text(r.title))
    .map(r => {
      const photo = /^data:image\/(jpeg|png|webp);base64,/.test(r.photo || '') ? r.photo : '';
      const unclear = lines(r.unclear);
      return {
        title: text(r.title).slice(0, 200),
        ingredients: lines(r.ingredients),
        steps: lines(r.steps),
        yield: text(r.yield),
        category: importCategory(text(r.title), text(r.category)),
        sourceFile: text(r.sourceFile) || file.name,
        photo,
        _fromPhoto: Boolean(photo),
        _fixes: (Array.isArray(r.fixes) ? r.fixes : [])
          .filter(f => f && text(f.from) && text(f.to))
          .map(f => ({ from: text(f.from), to: text(f.to) })),
        _unclear: unclear,
        _needsReview: Boolean(r.needsReview) || unclear.length > 0
      };
    });
}

// Kleine tikfouten zeker verbeteren ("14oc" → "140c", "buikspel" → "buikspek"); de chef ziet per recept
// wat er is verbeterd. Getypte tekst is altijd leesbaar: wat de AI daaruit als "niet goed leesbaar"
// noemde terwijl het letterlijk in de bron staat (merknamen als proespuma), of wat nu verbeterd is, vervalt.
function applyImportFixes(drafts, sourceText) {
  // Alleen woorden uit namen en ingrediënten tellen mee: uit de bereiding zou "10 gram elastic"
  // (geleermiddel) "plastic" worden en "3 kroppen kropsla" "3 kloppen".
  const vocab = readerVocabulary(
    drafts.map(d => [d.title, ...(d.ingredients || [])].join('\n')).join('\n'),
    DEFAULT_CATEGORIES.flatMap(c => c.keywords)
  );
  return drafts.map(d => {
    const { fixes, ...fixed } = readerAutoFix(d, vocab);
    const unclear = (d._unclear || []).filter(u => !fixes.some(f => u.includes(f.from)) && !sourceText.includes(u));
    return { ...fixed, _fixes: fixes, _unclear: unclear };
  });
}

async function readTextRecipes(file, sourceText) {
  const local = readRecipesLocally(sourceText, { sourceFile: file.name });
  if (!isPro()) return local;
  // Alleen wat de lezer niet zeker weet gaat naar de AI; zekere recepten blijven direct en gratis.
  // Vond de lezer niets, dan leest de AI de hele tekst.
  const sure = local.filter(r => r.readerConfidence === 'high');
  const unsureText = local.length
    ? local
        .filter(r => r.readerConfidence !== 'high')
        .map(r => r.source)
        .join('\n\n\n')
    : sourceText;
  if (!unsureText.trim()) return local;

  // Drie delen tegelijk; de voortgangsbalk telt de delen binnen dit bestand.
  const chunks = chunkImportText(unsureText);
  const unsureCount = local.length - sure.length;
  const route = `Savour-lezer: ${sure.length} zeker, ${unsureCount} twijfel.`;
  const results = new Array(chunks.length);
  let next = 0;
  let finished = 0;
  let aiError = null;
  const readChunks = async () => {
    while (next < chunks.length) {
      const i = next++;
      let aiRecipes = [];
      if (!aiError) {
        try {
          aiRecipes = await callAiImportWithRetry({ text: chunks[i], filename: file.name });
        } catch (e) {
          aiError = e;
        }
      }
      results[i] = aiRecipes.length
        ? aiRecipes.map(r => normalizeAiRecipe(r, { sourceFile: file.name }))
        : readRecipesLocally(chunks[i], { sourceFile: file.name, _withoutAi: aiError ? aiError.message : '' });
      finished++;
      setImportFileProgress(file, finished / chunks.length);
      $('importStatus').textContent = local.length
        ? `${route} AI leest de twijfelgevallen na: ${finished} van ${chunks.length} delen…`
        : `${file.name}: ${finished} van ${chunks.length} delen met AI gelezen…`;
    }
  };
  if (local.length)
    $('importStatus').textContent = `${route} AI leest de twijfelgevallen na: 0 van ${chunks.length} delen…`;
  await Promise.all(Array.from({ length: Math.min(3, chunks.length) }, readChunks));
  return [...sure, ...results.flat()];
}
// done mag een kommagetal zijn: een foto die half gelezen is, telt als 0,5.
function updateImportProgress(done, total, label = '') {
  const wrap = $('importProgressWrap'),
    bar = $('importProgressBar'),
    txt = $('importProgressText');
  if (!wrap || !bar) return;
  wrap.style.display = 'block';
  const pct = total ? Math.round((done / total) * 100) : 0;
  bar.style.width = pct + '%';
  if (txt) txt.textContent = label || `${Math.floor(done)} / ${total} bestanden verwerkt · ${pct}%`;
}

// Bestanden die nu worden gelezen, met hoe lang dat ongeveer duurt. Zo loopt de voortgangsbalk ook
// tijdens het lezen van één foto (± 20 seconden) rustig vol in plaats van stil te staan.
const importInFlight = new Map();
const IMPORT_EXPECTED_MS = { photo: 27000, file: 8000 };

function importInFlightFraction() {
  let sum = 0;
  for (const f of importInFlight.values())
    sum +=
      f.fraction !== undefined
        ? Math.min(0.99, f.fraction)
        : Math.min(0.95, 1 - Math.exp(-(Date.now() - f.start) / (f.expected / 2)));
  return sum;
}

// Een groot bestand dat in delen wordt gelezen, meldt zelf hoe ver het is (0–1).
function setImportFileProgress(file, fraction) {
  const f = importInFlight.get(file);
  if (f) f.fraction = fraction;
}

// Recepten die de AI als onvolledig zag; de chef kan ze met "Toch importeren" alsnog controleren.
let skippedIncomplete = [];

function importSkippedIncomplete() {
  if (!skippedIncomplete.length) return;
  if (batchDrafts.length) syncBatchDrafts();
  batchDrafts = [
    ...batchDrafts,
    ...skippedIncomplete.map(r => ({ ...r, _incomplete: false, _needsReview: true, _maybeIncomplete: true }))
  ];
  skippedIncomplete = [];
  document.querySelectorAll('[onclick="importSkippedIncomplete()"]').forEach(b => b.remove());
  $('batchStatus').innerHTML +=
    '<br><span class="batch-warning">Toegevoegd als "Mogelijk onvolledig": controleer of er niets ontbreekt.</span>';
  renderBatchDrafts();
  go('batchImport');
}

// Mislukte bestanden, gegroepeerd per reden: "Het bestand is te groot. (2): a.docx, b.docx".
function importFailureSummary(failures) {
  const byReason = new Map();
  failures.forEach(f => byReason.set(f.error, [...(byReason.get(f.error) || []), f.name]));
  return [...byReason]
    .map(
      ([reason, names]) =>
        `<span class="muted">Niet verwerkt (${names.length}): <span translate="no">${esc(names.slice(0, 5).join(', '))}${names.length > 5 ? ' …' : ''}</span> · <span>${esc(reason)}</span></span>`
    )
    .join('<br>')
    .concat(
      failures.some(f => f.pro)
        ? `<br><button type="button" class="btn small gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button>`
        : ''
    );
}

async function processImportFiles(files) {
  const list = normalizeImportFiles(files);
  if (!list.length) {
    $('importStatus').textContent = 'Kies eerst één of meerdere bestanden.';
    return;
  }
  const valid = list.filter(f => IMPORT_ALLOWED.test(f.name));
  if (valid.length !== list.length)
    toast(
      `${list.length - valid.length} bestand${list.length - valid.length === 1 ? '' : 'en'} overgeslagen: type wordt niet ondersteund.`
    );
  if (!valid.length) {
    $('importStatus').textContent = 'Geen ondersteunde bestanden gevonden.';
    return;
  }
  $('importStatus').textContent = `0 / ${valid.length} bestanden verwerkt…`;
  updateImportProgress(0, valid.length);
  batchDrafts = [];
  const failures = [];
  let done = 0;
  const queue = [...valid];
  const progressLabel = () =>
    `${done} / ${valid.length} bestanden verwerkt${failures.length ? ` · ${failures.length} mislukt` : ''} · ${Math.round(((done + importInFlightFraction()) / valid.length) * 100)}%`;
  importInFlight.clear();
  const ticker = setInterval(
    () => updateImportProgress(done + importInFlightFraction(), valid.length, progressLabel()),
    250
  );
  const worker = async () => {
    while (queue.length) {
      const file = queue.shift();
      const isPhoto = /\.(jpe?g|png|webp)$/i.test(file.name || '');
      importInFlight.set(file, {
        start: Date.now(),
        expected: isPhoto ? IMPORT_EXPECTED_MS.photo : IMPORT_EXPECTED_MS.file
      });
      if (isPhoto) $('importStatus').textContent = `${file.name} wordt rechtgezet en twee keer gelezen…`;
      try {
        const name = (file.name || '').toLowerCase();
        let drafts;
        if (isPhoto) drafts = await importImageFile(file);
        else if (/\.json$/i.test(name)) drafts = await importSavourFile(file);
        else drafts = await importTextFile(file);
        batchDrafts.push(...drafts);
      } catch (e) {
        console.error('Bulk import', file.name, e);
        failures.push({ name: file.name, error: e?.message || 'Import mislukt.', pro: e?.code === 'pro_required' });
      } finally {
        importInFlight.delete(file);
        done++;
        $('importStatus').textContent =
          `${done} / ${valid.length} bestanden verwerkt${failures.length ? ` · ${failures.length} mislukt` : ''}…`;
        updateImportProgress(done + importInFlightFraction(), valid.length, progressLabel());
      }
    }
  };
  const workers = Array.from({ length: Math.min(3, valid.length) }, () => worker());
  await Promise.all(workers);
  clearInterval(ticker);
  // Onvolledige recepten (bijv. afgesneden op de foto) niet importeren, maar wel melden. Vergist de AI
  // zich, dan kan de chef ze met "Toch importeren" alsnog controleren: er gaat nooit iets verloren.
  skippedIncomplete = batchDrafts.filter(r => r._incomplete);
  batchDrafts = batchDrafts.filter(r => !r._incomplete);
  const incompleteNote = skippedIncomplete.length
    ? `<span class="batch-warning">Niet volledig in de bron en daarom overgeslagen: <span translate="no">${esc(skippedIncomplete.map(r => r.title).join(', '))}</span>. Maak een foto of bestand van het hele recept om het te importeren.</span> <button type="button" class="btn small" onclick="importSkippedIncomplete()">Toch importeren</button>`
    : '';
  if (!batchDrafts.length) {
    $('importStatus').innerHTML =
      'Geen recepten verwerkt.' +
      (incompleteNote ? `<br>${incompleteNote}` : '') +
      (failures.length ? `<br>${importFailureSummary(failures)}` : '');
    updateImportProgress(valid.length, valid.length, 'Geen recepten verwerkt');
    return;
  }
  batchDrafts = batchDrafts.map((r, i) => ({ ...r, _importIndex: i }));
  const successText = `${batchDrafts.length} recept${batchDrafts.length === 1 ? '' : 'en'} uit ${valid.length - failures.length} bestand${valid.length - failures.length === 1 ? '' : 'en'} verwerkt.`;
  const withoutAi = batchDrafts.filter(r => r._withoutAi);
  const notes = [];
  // De route in één regel: wat de Savour-lezer zelf las en wat de AI (Pro) heeft nagelezen.
  const byAi = batchDrafts.filter(r => r._byAi).length;
  if (byAi)
    notes.push(
      `<span>Gelezen door de Savour-lezer: ${batchDrafts.length - byAi} · nagelezen door de AI: ${byAi}</span>`
    );
  if (withoutAi.length)
    notes.push(
      `<span class="batch-warning">${withoutAi.length} recept${withoutAi.length === 1 ? ' is' : 'en zijn'} zonder AI uitgelezen (<span>${esc(withoutAi[0]._withoutAi)}</span>). Controleer titel, ingrediënten en bereiding extra goed.</span>`
    );
  // Gratis: twijfelgevallen van de Savour-lezer melden, met de mogelijkheid ze in Pro door de AI te laten nalezen.
  const doubtful = isPro() ? 0 : batchDrafts.filter(r => r._needsReview && !r._withoutAi).length;
  if (doubtful)
    notes.push(
      `<span class="batch-warning">${
        doubtful === 1
          ? '1 recept kon de Savour-lezer niet met zekerheid indelen. Het staat gemarkeerd met ‘Controleren’. In Savour Pro leest de AI zulke recepten automatisch na.'
          : `${doubtful} recepten kon de Savour-lezer niet met zekerheid indelen. Ze staan gemarkeerd met ‘Controleren’. In Savour Pro leest de AI zulke recepten automatisch na.`
      }</span> <button type="button" class="btn small gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button>`
    );
  if (incompleteNote) notes.push(incompleteNote);
  const unclearCount = batchDrafts.filter(r => r._unclear?.length).length;
  if (unclearCount)
    notes.push(
      `<span class="batch-warning">${unclearCount} recept${unclearCount === 1 ? ' bevat' : 'en bevatten'} stukken die niet goed leesbaar waren. Ze staan geel gemarkeerd: controleer en verbeter ze.</span>`
    );
  if (failures.length) notes.push(importFailureSummary(failures));
  $('batchStatus').innerHTML = esc(successText) + notes.map(n => `<br>${n}`).join('');
  renderBatchDrafts();
  $('importStatus').textContent =
    `Klaar · ${batchDrafts.length} recept${batchDrafts.length === 1 ? '' : 'en'} controleerbaar.`;
  updateImportProgress(valid.length, valid.length, `Klaar · ${batchDrafts.length} recepten controleerbaar`);
  go('batchImport');
}

async function processImport() {
  const text = $('importTextInput').value.trim();
  const files = Array.isArray(importFileData) ? importFileData : normalizeImportFiles($('importFile').files);
  if (importSource === 'text' && !text) {
    $('importStatus').textContent = 'Voer eerst tekst in.';
    return;
  }
  if (importSource !== 'text' && !files.length) {
    $('importStatus').textContent = 'Kies eerst één of meerdere bronbestanden.';
    return;
  }
  try {
    if (importSource === 'text') {
      batchDrafts = readRecipesLocally(text);
      if (batchDrafts.length > 1) {
        $('batchStatus').textContent = `${batchDrafts.length} losse recepten herkend uit de ingevoerde tekst.`;
        renderBatchDrafts();
        go('batchImport');
      } else {
        // Eén recept: rechtstreeks in de editor (met de zichtbare ingrediënt- en stapregels ingevuld).
        window.__aiImportedPhoto = '';
        const r = batchDrafts[0] || { title: 'Geïmporteerd recept', ingredients: [], steps: [], yield: '' };
        fillEditor({ ...r, id: null }, 'Import controleren');
        go('editor');
      }
      $('importStatus').textContent = '';
      return;
    }
    await processImportFiles(files);
  } catch (e) {
    console.error(e);
    $('importStatus').textContent = e.message || 'Importeren is mislukt.';
  }
}

// Invulvak zo hoog als de inhoud (minimaal 8 regels), zodat je een recept zonder scrollen controleert.
function batchRows(lines) {
  return Math.max(8, lines.length + 1);
}

function renderBatchDrafts() {
  $('batchCount').textContent = batchDrafts.length ? `${batchDrafts.length} recepten herkend` : '';
  const catOptions = ['Eigen recepten', ...categories];
  $('batchRecipeGrid').innerHTML =
    batchDrafts
      .map(
        (r, i) =>
          `<article class="batch-recipe" data-batch-card="${i}"><div class="batch-recipe-head"><div><span class="batch-chip">Recept ${i + 1}</span>${r._maybeIncomplete ? ' <span class="batch-chip batch-chip-warn">Mogelijk onvolledig</span>' : r._withoutAi ? ' <span class="batch-chip batch-chip-warn">Zonder AI · controleren</span>' : r._needsReview || r._unclear?.length ? ' <span class="batch-chip batch-chip-warn">Controleren</span>' : ''}${r._byAi ? ' <span class="batch-chip">AI</span>' : ''}<h3>${esc(r.title)}</h3></div><button type="button" class="batch-remove-btn" title="Recept verwijderen" aria-label="Recept ${i + 1} verwijderen" onclick="removeBatchDraft(${i})">×</button></div>${r.photo ? `<img class="batch-photo" src="${esc(r.photo)}" alt=""><button type="button" class="btn small batch-rotate" onclick="rotateBatchPhoto(${i})">↻ Draai foto</button>` : ''}${r._unclear?.length ? `<div class="batch-unclear"><b>Niet goed leesbaar, controleer:</b><ul translate="no">${r._unclear.map(u => `<li>${esc(u)}</li>`).join('')}</ul></div>` : ''}<small>${r.ingredients.length} ingrediënten · ${r.steps.length} stappen${r.sourceFile ? ` · ${esc(r.sourceFile)}` : ''}</small>${r._fixes?.length ? `<small class="batch-fixes">Automatisch verbeterd: <span translate="no">${r._fixes.map(f => `${esc(f.from)} → ${esc(f.to)}`).join(' · ')}</span></small>` : ''}${r._transcription?.length ? `<details class="batch-transcript"><summary>Zo las de AI het</summary><pre translate="no">${esc(r._transcription.join('\n'))}</pre>${r._model ? `<small>Gelezen met <span translate="no">${esc(r._model)}</span></small>` : ''}</details>` : ''}<div class="field" style="margin-top:12px"><label>Titel</label><input data-batch-title="${i}" value="${esc(r.title)}"></div><div class="field" style="margin-top:10px"><label>Ingrediënten</label><textarea class="batch-text" rows="${batchRows(r.ingredients)}" data-batch-ingredients="${i}">${esc(r.ingredients.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Bereiding</label><textarea class="batch-text" rows="${batchRows(r.steps)}" data-batch-steps="${i}">${esc(r.steps.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Opbrengst</label><input data-batch-yield="${i}" value="${esc(r.yield || '')}"></div><div class="field" style="margin-top:10px"><label>Categorie</label><select data-batch-category="${i}" onchange="batchDrafts[${i}]._categoryChosen=true">${catOptions.map(c => `<option value="${esc(c)}" ${String(r.category || 'Eigen recepten') === String(c) ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div></article>`
      )
      .join('') || `<div class="empty" style="grid-column:1/-1">Geen afzonderlijke recepten herkend.</div>`;
}

function syncBatchDrafts() {
  batchDrafts = batchDrafts.map((r, i) => ({
    ...r,
    title: document.querySelector(`[data-batch-title="${i}"]`)?.value.trim() || r.title,
    ingredients: (document.querySelector(`[data-batch-ingredients="${i}"]`)?.value || '')
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean),
    steps: (document.querySelector(`[data-batch-steps="${i}"]`)?.value || '')
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean),
    yield: document.querySelector(`[data-batch-yield="${i}"]`)?.value.trim() || '',
    category: document.querySelector(`[data-batch-category="${i}"]`)?.value || 'Eigen recepten'
  }));
}

// Slaat gecontroleerde importrecepten op en slaat exacte dubbelen (met de bibliotheek of binnen de batch) over.
async function saveBatchRecipes() {
  syncBatchDrafts();
  if (!currentUser || !batchDrafts.length) return persistBatchRecipes();
  const existing = new Map(recipes.map(r => [recipeFingerprint(r), r]));
  const seen = new Set();
  const filtered = [];
  for (const r of batchDrafts) {
    const fp = recipeFingerprint(r);
    if (existing.has(fp) || seen.has(fp)) continue;
    seen.add(fp);
    filtered.push(r);
  }
  if (filtered.length !== batchDrafts.length) {
    const skipped = batchDrafts.length - filtered.length;
    batchDrafts = filtered;
    renderBatchDrafts();
    toast(`${skipped} dubbel recept${skipped === 1 ? '' : 'en'} overgeslagen`);
    if (!batchDrafts.length) return;
  }
  // Stonden er onleesbare stukken in? Eerst vragen of de chef ze heeft nagekeken.
  const unclear = batchDrafts.filter(r => r._unclear?.length);
  if (unclear.length) {
    const ok = await askConfirm(
      `Onleesbare stukken nagekeken?\n\nIn ${unclear.length === 1 ? '1 recept' : `${unclear.length} recepten`} stond tekst die de AI niet zeker kon lezen (geel gemarkeerd). Heb je die gecontroleerd en waar nodig verbeterd?`,
      { confirmLabel: 'Ja, opslaan' }
    );
    if (!ok) {
      document.querySelector('.batch-unclear')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }
  // Twijfelgevallen over de categorie: bij een paar recepten kiest de chef per recept in een venster.
  // Bij veel recepten (grote import) geen tientallen vensters: één melding, nalopen kan later.
  const doubtful = batchDrafts.filter(
    r => !r._categoryChosen && (suggestCategory(r.title)?.alternatives?.length || 0) > 0
  );
  if (doubtful.length > 5) {
    const ok = await askConfirm(
      `${doubtful.length} recepten passen bij meerdere categorieën\n\nSavour kiest per recept de meest waarschijnlijke. Je kunt ze daarna nalopen met "Categorieën voorstellen" op de pagina Categorieën.`,
      { confirmLabel: 'Opslaan' }
    );
    if (!ok) return;
  } else {
    for (const r of doubtful) {
      const chosen = await chooseDoubtfulCategory(r.title, r.category);
      if (!chosen) return;
      r.category = chosen;
      r._categoryChosen = true;
    }
  }
  renderBatchDrafts();
  return persistBatchRecipes();
}

async function persistBatchRecipes() {
  if (!currentUser) {
    toast('Log eerst in om recepten op te slaan');
    return;
  }
  syncBatchDrafts();
  if (!batchDrafts.length) {
    toast('Geen recepten om op te slaan');
    return;
  }
  // Gratis account: alleen opslaan wat binnen de 100 recepten past; de rest blijft hier staan.
  const room = recipeRoomLeft();
  if (room === 0) return checkRecipeRoom(1);
  if (room < batchDrafts.length) {
    const ok = await askConfirm(
      `Je gratis account heeft nog ruimte voor ${room} recepten\n\nSavour slaat de eerste ${room} op. De andere ${batchDrafts.length - room} blijven hier staan; met Savour Pro bewaar je onbeperkt recepten.`,
      { confirmLabel: `${room} opslaan` }
    );
    if (!ok) return;
  }
  const later = batchDrafts.slice(room);
  const queue = batchDrafts.slice(0, room);
  const btn = $('batchSaveBtn');
  btn.disabled = true;
  btn.textContent = 'Opslaan…';
  let saved = 0;
  const failures = [];
  const failedDrafts = [];
  try {
    // Categorieën één keer ophalen in plaats van per recept.
    const { data: cats, error: catError } = await supabaseClient
      .from('categories')
      .select('id,name')
      .eq('user_id', currentUser.id);
    if (catError) throw catError;
    const categoryIdByName = new Map((cats || []).map(c => [c.name, c.id]));
    const rowFor = r => ({
      user_id: currentUser.id,
      title: r.title || 'Nieuw recept',
      description: null,
      yield_text: r.yield || null,
      ingredients: r.ingredients || [],
      steps: r.steps || [],
      category_id: categoryIdByName.get(r.category) || null,
      // Een gefotografeerd kladje wordt geen receptfoto, maar het origineel (zie saveRecipeSources).
      photo_url: (r._fromPhoto ? null : r.photo) || null
    });
    // In blokken van 50; mislukt een blok, dan per recept, zodat we weten welke het niet haalden.
    const BLOCK = 50;
    for (let start = 0; start < queue.length; start += BLOCK) {
      const block = queue.slice(start, start + BLOCK);
      btn.textContent = `Opslaan… ${start} / ${queue.length}`;
      const { data: inserted, error } = await supabaseClient.from('recipes').insert(block.map(rowFor)).select('id');
      if (!error) {
        saved += block.length;
        await saveRecipeSources(block, inserted);
        continue;
      }
      for (const r of block) {
        const { data: one, error: rowError } = await supabaseClient.from('recipes').insert(rowFor(r)).select('id');
        if (rowError) {
          console.error('Batch opslaan', r.title, rowError);
          failures.push({ title: r.title, error: rowError.message || 'Opslaan mislukt' });
          failedDrafts.push(r);
        } else {
          saved++;
          await saveRecipeSources([r], one);
        }
      }
    }
    await loadDatabaseState();
    // Wat niet is opgeslagen blijft staan, zodat de chef het opnieuw kan proberen.
    batchDrafts = [...failedDrafts, ...later];
    if (failures.length || later.length) {
      toast(`${saved} recepten opgeslagen · ${failures.length + later.length} niet opgeslagen`);
      const limitNote = later.length
        ? `<br><span class="batch-warning">${later.length} recepten passen niet meer in je gratis account. Met Savour Pro sla je ze alsnog op.</span> <button type="button" class="btn small gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button>`
        : '';
      $('batchStatus').innerHTML =
        `${esc(String(saved))} recepten opgeslagen.${failures.length ? `<br><span class="muted">Niet opgeslagen: ${failures.map(f => esc(f.title)).join(', ')}</span>` : ''}${limitNote}`;
      renderBatchDrafts();
    } else {
      toast(`${saved} recepten opgeslagen`);
      go('recipes');
    }
  } catch (e) {
    console.error(e);
    toast(e.message || 'De batch kon niet worden afgerond');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Alle recepten opslaan';
  }
}

// Het originele kladje apart bewaren (tabel recipe_sources), zodat je het terugziet via "Origineel bekijken".
// Bestaat die tabel nog niet (SQL niet uitgevoerd), dan wordt het kladje zoals vroeger de receptfoto.
async function saveRecipeSources(drafts, rows) {
  const pairs = drafts.map((d, i) => [d, rows?.[i]?.id]).filter(([d, id]) => d._fromPhoto && d.photo && id);
  if (!pairs.length) return;
  const { error } = await supabaseClient
    .from('recipe_sources')
    .insert(pairs.map(([d, id]) => ({ recipe_id: id, user_id: currentUser.id, image: d.photo })));
  if (!error) {
    pairs.forEach(([, id]) => recipeSourceIds.add(String(id)));
    return;
  }
  console.warn('Origineel apart bewaren lukte niet; het kladje wordt de receptfoto.', error);
  for (const [d, id] of pairs)
    await supabaseClient.from('recipes').update({ photo_url: d.photo }).eq('id', id).eq('user_id', currentUser.id);
}

// Slepen en neerzetten van bestanden op het importvak.
function setupImportDropZone() {
  const importDropEl = $('importDrop');
  if (importDropEl) {
    ['dragenter', 'dragover'].forEach(ev =>
      importDropEl.addEventListener(ev, e => {
        e.preventDefault();
        importDropEl.style.borderColor = 'var(--gold)';
      })
    );
    ['dragleave', 'drop'].forEach(ev =>
      importDropEl.addEventListener(ev, e => {
        e.preventDefault();
        importDropEl.style.borderColor = '';
      })
    );
    importDropEl.addEventListener('drop', e => {
      const files = normalizeImportFiles(e.dataTransfer.files);
      if (!files.length) return;
      setImportFiles(files);
    });
  }
}
