// Al je recepten printen of downloaden (Instellingen → Account). Alleen je eigen bibliotheek; recepten van
// collega's in keukenteams niet.
// - Alle recepten printen: iedereen, in de printopmaak van Savour (js/features/print.js).
// - Downloaden (Savour Pro): per recept een Word-bestand in de printopmaak (samen in een .zip), alle recepten
//   in één eenvoudig Word-bestand, of een back-up (JSON) met recepten en mappen.
// Word-bestanden (.docx) maken we zelf (zip met XML), zonder extra bibliotheek. Ze openen in Word, WordPad,
// Google Docs, Pages en LibreOffice. Lettertypes: Playfair Display (titels) en DM Sans (tekst); heeft een
// computer die niet, dan kiest het programma zelf een vergelijkbare letter.

function exportFileName(ext) {
  const day = new Date().toISOString().slice(0, 10);
  return `savour-recepten-${day}.${ext}`;
}

function downloadFile(name, content, type) {
  const url = URL.createObjectURL(content instanceof Blob ? content : new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function ownRecipesSorted() {
  return [...recipes].sort((a, b) => String(a.title).localeCompare(String(b.title), 'nl'));
}

// Mappen waar een recept in staat (namen), voor de back-up.
function recipeFolderNames(id) {
  return folders.filter(f => !f.system && (f.recipeIds || []).includes(id)).map(f => f.name);
}

function printAllRecipes() {
  const list = ownRecipesSorted();
  if (!list.length) {
    toast('Je hebt nog geen recepten om te printen');
    return;
  }
  openPrintBundle(list, { title: 'Alle recepten' });
}

async function exportRecipes(kind) {
  if (!isPro() && !demoMode) {
    if (
      await askConfirm(
        `Recepten downloaden is onderdeel van Savour Pro\n\nJe recepten blijven altijd in Savour staan, ook zonder Pro: je kunt ze bekijken en printen. Met Savour Pro download je ze ook in één keer.`,
        { confirmLabel: 'Bekijk Savour Pro' }
      )
    )
      openPublicInfo('pro');
    return;
  }
  const list = ownRecipesSorted();
  if (!list.length) {
    toast('Je hebt nog geen recepten om te downloaden');
    return;
  }
  if (kind === 'json') {
    const data = {
      app: 'Savour',
      version: 1,
      exported_at: new Date().toISOString(),
      recipes: list.map(r => ({
        title: r.title,
        category: r.category || '',
        yield: r.yield || '',
        description: r.description || '',
        ingredients: r.ingredients || [],
        steps: r.steps || [],
        folders: recipeFolderNames(r.id)
      })),
      folders: folders
        .filter(f => !f.system)
        .map(f => ({ name: f.name, recipes: (f.recipeIds || []).map(id => findRecipe(id)?.title).filter(Boolean) }))
    };
    downloadFile(exportFileName('json'), JSON.stringify(data, null, 2), 'application/json');
  } else if (kind === 'zip') {
    // Eén Word-bestand per recept, in de printopmaak, samen in een zip. Dubbele namen krijgen (2), (3)...
    // De lettertypes zitten in elk bestand (tot 300 recepten, anders wordt de zip te groot) én los in de map
    // Lettertypes, om één keer te installeren.
    const fonts = await loadDocxFonts();
    const embed = list.length <= 300 ? fonts : [];
    const used = new Map();
    const files = {};
    for (const f of fonts) files[`Lettertypes/${f.file}`] = f.bytes;
    for (const r of list) {
      const base =
        String(r.title || 'Recept')
          .replace(/[\\/:*?"<>|]+/g, '-')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 80) || 'Recept';
      const n = (used.get(base.toLowerCase()) || 0) + 1;
      used.set(base.toLowerCase(), n);
      files[`${n > 1 ? `${base} (${n})` : base}.docx`] = zipBytes(docxFiles(styledRecipeBody(r), docxStyles(), embed));
    }
    downloadFile(exportFileName('zip'), new Blob([zipBytes(files)], { type: 'application/zip' }));
  } else {
    downloadFile(
      exportFileName('docx'),
      new Blob([zipBytes(docxFiles(simpleRecipesBody(list), docxStyles(), await loadDocxFonts()))], {
        type: DOCX_TYPE
      })
    );
  }
  toast(`${list.length} recepten gedownload`);
}

// ---- Word-document (.docx) ----

const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const xmlEsc = t =>
  String(t ?? '').replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);

// Een tekststuk; bold = vet. Spaties blijven precies zoals ze in het recept staan.
const docxRun = (text, bold) =>
  `<w:r>${bold ? '<w:rPr><w:b/></w:rPr>' : ''}<w:t xml:space="preserve">${xmlEsc(text)}</w:t></w:r>`;
const docxPara = (style, runs) => `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ''}${runs}</w:p>`;

// Ingrediënt met de hoeveelheid vet ("**650   gram** suiker"), zonder de tekst te veranderen.
function docxIngredientRuns(line) {
  const [amount, rest] = quantityParts(line);
  return (amount ? docxRun(amount, true) : '') + docxRun(rest);
}

function docxYield(r, label = 'Opbrengst · ') {
  return r.yield ? docxPara('Meta', docxRun(label) + docxRun(r.yield, true)) : '';
}

// Alle recepten in één bestand, eenvoudig: titel, opbrengst, ingrediënten en bereiding, witruimte ertussen.
function simpleRecipesBody(list) {
  const day = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const out = [docxPara('Meta', docxRun(`${list.length} recepten uit Savour · ${day}`))];
  for (const r of list) {
    out.push(docxPara('RecipeTitle', docxRun(r.title)));
    if (r.yield) out.push(docxPara('Meta', docxRun('Opbrengst: ') + docxRun(r.yield)));
    out.push(docxPara('Label', docxRun('Ingrediënten')));
    for (const x of r.ingredients?.length ? r.ingredients : ['—'])
      out.push(docxPara('Item', docxRun('•  ') + docxIngredientRuns(x)));
    if (r.steps?.length) {
      out.push(docxPara('Label', docxRun('Bereiding')));
      r.steps.forEach((x, i) => out.push(docxPara('Item', docxRun(`${i + 1}.  `) + docxRun(x))));
    }
  }
  return out.join('');
}

// Eén recept in de printopmaak: grote titel, opbrengst, en ingrediënten en bereiding naast elkaar.
function styledRecipeBody(r) {
  const cell = content => `<w:tc><w:tcPr><w:tcW w:w="4680" w:type="dxa"/></w:tcPr>${content || '<w:p/>'}</w:tc>`;
  const ingredients =
    docxPara('ColHead', docxRun('Ingrediënten')) +
    (r.ingredients?.length ? r.ingredients : ['—']).map(x => docxPara('Ingredient', docxIngredientRuns(x))).join('');
  const steps = r.steps?.length
    ? docxPara('ColHead', docxRun('Bereiding')) +
      r.steps.map((x, i) => docxPara('Step', docxRun(`${i + 1}.  `, true) + docxRun(x))).join('')
    : '';
  const table = `<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="0" w:type="dxa"/><w:right w:w="280" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="4819"/><w:gridCol w:w="4819"/></w:tblGrid><w:tr>${cell(ingredients)}${cell(steps)}</w:tr></w:tbl>`;
  return docxPara('PrintTitle', docxRun(r.title)) + docxYield(r) + table + '<w:p/>';
}

function docxStyles() {
  const font = (f, size, opts = {}) =>
    `<w:rPr><w:rFonts w:ascii="${f}" w:hAnsi="${f}" w:cs="${f}"/>${opts.bold ? '<w:b/>' : ''}${opts.color ? `<w:color w:val="${opts.color}"/>` : ''}<w:sz w:val="${size}"/></w:rPr>`;
  const style = (id, name, pPr, rPr) =>
    `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:pPr>${pPr}</w:pPr>${rPr}</w:style>`;
  const line = 'w:pBdr><w:bottom w:val="single" w:sz="4" w:space="3" w:color="DDDDDD"/></w:pBdr';
  return `<w:docDefaults><w:rPrDefault>${font('DM Sans', 22)}</w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="60"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>${[
    // Eenvoudig (alles in één bestand)
    style(
      'RecipeTitle',
      'Receptnaam',
      '<w:keepNext/><w:spacing w:before="560" w:after="40"/><w:outlineLvl w:val="0"/>',
      font('Playfair Display', 32, { bold: true })
    ),
    style(
      'Label',
      'Kopje',
      '<w:keepNext/><w:spacing w:before="160" w:after="40"/>',
      font('DM Sans', 22, { bold: true })
    ),
    style('Item', 'Regel', '<w:spacing w:after="20"/>', ''),
    style('Meta', 'Opbrengst', '<w:spacing w:after="80"/>', font('DM Sans', 18, { color: '666666' })),
    // Printopmaak (per recept)
    style(
      'PrintTitle',
      'Recepttitel',
      '<w:spacing w:after="80"/><w:outlineLvl w:val="0"/>',
      font('Playfair Display', 52, { bold: true })
    ),
    style(
      'ColHead',
      'Kolomkop',
      `<w:keepNext/><w:spacing w:before="240" w:after="80"/><${line.replace('DDDDDD', '222222').replace('w:sz="4"', 'w:sz="10"')}>`,
      font('Playfair Display', 27, { bold: true })
    ),
    style('Ingredient', 'Ingrediënt', `<w:spacing w:before="60" w:after="60"/><${line}>`, font('DM Sans', 23)),
    style(
      'Step',
      'Stap',
      '<w:spacing w:before="60" w:after="60"/><w:ind w:left="340" w:hanging="340"/>',
      font('DM Sans', 23)
    )
  ].join('')}`;
}

// Lettertypes die in het Word-bestand meegaan (assets/fonts, vrije OFL-licentie). Zo ziet het document er in Word
// en LibreOffice uit zoals bedoeld, ook op een computer zonder DM Sans en Playfair Display.
// (WordPad kan dit niet: dat toont alleen lettertypes die op de computer zelf zijn geïnstalleerd.)
const DOCX_FONTS = [
  { name: 'DM Sans', embed: 'embedRegular', file: 'DMSans-Regular.ttf', src: '/assets/fonts/dmsans-400.ttf' },
  { name: 'DM Sans', embed: 'embedBold', file: 'DMSans-Bold.ttf', src: '/assets/fonts/dmsans-700.ttf' },
  {
    name: 'Playfair Display',
    embed: 'embedBold',
    file: 'PlayfairDisplay-Bold.ttf',
    src: '/assets/fonts/playfair-700.ttf'
  }
];
let docxFontCache = null;

async function loadDocxFonts() {
  if (docxFontCache) return docxFontCache;
  try {
    docxFontCache = await Promise.all(
      DOCX_FONTS.map(async f => {
        const res = await fetch(f.src);
        if (!res.ok) throw new Error(f.src);
        return { ...f, bytes: new Uint8Array(await res.arrayBuffer()) };
      })
    );
  } catch (e) {
    // Zonder lettertypes (bijv. offline) gewoon een document dat om DM Sans vraagt.
    console.warn('Lettertypes voor Word niet geladen', e);
    return [];
  }
  return docxFontCache;
}

// Word bewaart ingesloten lettertypes afgeschermd (.odttf): de eerste 32 bytes XOR met de sleutel uit de GUID.
function obfuscatedFont(bytes, fontKey) {
  const key = [35, 33, 31, 29, 27, 25, 22, 20, 17, 15, 12, 10, 7, 5, 3, 1].map(i =>
    parseInt(fontKey.slice(i, i + 2), 16)
  );
  const out = bytes.slice();
  for (let i = 0; i < 16; i++) {
    out[i] ^= key[i];
    out[i + 16] ^= key[i];
  }
  return out;
}

// De onderdelen van het lettertype-pakket in een .docx (alleen als er lettertypes mee moeten).
function docxFontParts(fonts, W, rel) {
  if (!fonts.length) return { files: {}, types: '', rels: '' };
  const R = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  const files = {};
  const fontRels = [];
  const byName = new Map();
  fonts.forEach((f, i) => {
    const key = `{${crypto.randomUUID().toUpperCase()}}`;
    files[`word/fonts/font${i + 1}.odttf`] = obfuscatedFont(f.bytes, key);
    fontRels.push(`<Relationship Id="rIdF${i + 1}" Type="${rel}/font" Target="fonts/font${i + 1}.odttf"/>`);
    byName.set(f.name, (byName.get(f.name) || '') + `<w:${f.embed} r:id="rIdF${i + 1}" w:fontKey="${key}"/>`);
  });
  const fontXml = [...byName]
    .map(
      ([name, embeds]) =>
        `<w:font w:name="${name}"><w:charset w:val="00"/><w:family w:val="auto"/><w:pitch w:val="variable"/>${embeds}</w:font>`
    )
    .join('');
  files['word/fontTable.xml'] =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:fonts ${W} ${R}>${fontXml}</w:fonts>`;
  files['word/_rels/fontTable.xml.rels'] =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${fontRels.join('')}</Relationships>`;
  files['word/settings.xml'] =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings ${W}><w:embedTrueTypeFonts/></w:settings>`;
  return {
    files,
    types:
      '<Default Extension="odttf" ContentType="application/vnd.openxmlformats-officedocument.obfuscatedFont"/><Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>',
    rels: `<Relationship Id="rId2" Type="${rel}/fontTable" Target="fontTable.xml"/><Relationship Id="rId3" Type="${rel}/settings" Target="settings.xml"/>`
  };
}

function docxFiles(bodyXml, stylesXml, fonts = []) {
  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
  const rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const embedded = docxFontParts(fonts, W, rel);
  return {
    ...embedded.files,
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${embedded.types}<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rel}/officeDocument" Target="word/document.xml"/></Relationships>`,
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rel}/styles" Target="styles.xml"/>${embedded.rels}</Relationships>`,
    'word/document.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${W}><w:body>${bodyXml}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`,
    'word/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${W}>${stylesXml}</w:styles>`
  };
}

// ---- Zip zonder compressie (voor .docx en de zip met losse recepten) ----
let zipCrcTable = null;
function zipBytes(files) {
  const enc = new TextEncoder();
  zipCrcTable ||= Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc32 = data => {
    let c = 0xffffffff;
    for (let i = 0; i < data.length; i++) c = zipCrcTable[(c ^ data[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const parts = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of Object.entries(files)) {
    const nameBytes = enc.encode(name);
    const data = typeof content === 'string' ? enc.encode(content) : content;
    const crc = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // bestandsnamen in UTF-8
    local.setUint32(14, crc, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, nameBytes.length, true);
    parts.push(new Uint8Array(local.buffer), nameBytes, data);
    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true);
    cd.setUint16(4, 20, true);
    cd.setUint16(6, 20, true);
    cd.setUint16(8, 0x0800, true);
    cd.setUint32(16, crc, true);
    cd.setUint32(20, data.length, true);
    cd.setUint32(24, data.length, true);
    cd.setUint16(28, nameBytes.length, true);
    cd.setUint32(42, offset, true);
    central.push(new Uint8Array(cd.buffer), nameBytes);
    offset += 30 + nameBytes.length + data.length;
  }
  const cdSize = central.reduce((n, a) => n + a.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, Object.keys(files).length, true);
  end.setUint16(10, Object.keys(files).length, true);
  end.setUint32(12, cdSize, true);
  end.setUint32(16, offset, true);
  const all = [...parts, ...central, new Uint8Array(end.buffer)];
  const out = new Uint8Array(all.reduce((n, a) => n + a.length, 0));
  let p = 0;
  for (const a of all) {
    out.set(a, p);
    p += a.length;
  }
  return out;
}
