// Al je recepten printen of downloaden (Instellingen → Account). Alleen je eigen bibliotheek; recepten van
// collega's in gedeelde mappen niet.
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
    const used = new Map();
    const files = {};
    for (const r of list) {
      const base =
        String(r.title || 'Recept')
          .replace(/[\\/:*?"<>|]+/g, '-')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 80) || 'Recept';
      const n = (used.get(base.toLowerCase()) || 0) + 1;
      used.set(base.toLowerCase(), n);
      files[`${n > 1 ? `${base} (${n})` : base}.docx`] = zipBytes(docxFiles(styledRecipeBody(r), docxStyles()));
    }
    downloadFile(exportFileName('zip'), new Blob([zipBytes(files)], { type: 'application/zip' }));
  } else {
    downloadFile(
      exportFileName('docx'),
      new Blob([zipBytes(docxFiles(simpleRecipesBody(list), docxStyles()))], { type: DOCX_TYPE })
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

function docxFiles(bodyXml, stylesXml) {
  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
  const rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  return {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rel}/officeDocument" Target="word/document.xml"/></Relationships>`,
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rel}/styles" Target="styles.xml"/></Relationships>`,
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
