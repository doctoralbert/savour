// Al je recepten downloaden (Savour Pro): als Word-document (.docx) om te lezen of te printen, of als back-up
// (JSON) met recepten en mappen. Alleen je eigen bibliotheek; recepten van collega's in gedeelde mappen niet.

function exportFileName(ext) {
  const day = new Date().toISOString().slice(0, 10);
  return `savour-recepten-${day}.${ext}`;
}

function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Mappen waar een recept in staat (namen), voor de back-up.
function recipeFolderNames(id) {
  return folders.filter(f => !f.system && (f.recipeIds || []).includes(id)).map(f => f.name);
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
  const list = [...recipes].sort((a, b) => String(a.title).localeCompare(String(b.title), 'nl'));
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
  } else {
    downloadFile(
      exportFileName('docx'),
      recipesDocx(list),
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  }
  toast(`${list.length} recepten gedownload`);
}

// ---- Word-document (.docx) zonder extra bibliotheek ----
// Een .docx is een zip-bestand met een paar XML-bestanden. Opent in Word, WordPad, Google Docs, Pages en LibreOffice.

const xmlEsc = t =>
  String(t ?? '').replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);

function docxParagraph(text, style) {
  const run = `<w:r><w:t xml:space="preserve">${xmlEsc(text)}</w:t></w:r>`;
  return `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ''}${run}</w:p>`;
}

function recipesDocx(list) {
  const day = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const body = [
    docxParagraph('Mijn recepten', 'Title'),
    docxParagraph(`${list.length} recepten · gedownload uit Savour op ${day}`, 'Meta')
  ];
  for (const r of list) {
    body.push(docxParagraph(r.title, 'Heading1'));
    const meta = [r.category, r.yield && `Opbrengst: ${r.yield}`].filter(Boolean).join(' · ');
    if (meta) body.push(docxParagraph(meta, 'Meta'));
    if (r.description) body.push(docxParagraph(r.description));
    body.push(docxParagraph('Ingrediënten', 'Heading2'));
    for (const x of r.ingredients?.length ? r.ingredients : ['—']) body.push(docxParagraph(`•  ${x}`, 'Item'));
    if (r.steps?.length) {
      body.push(docxParagraph('Bereiding', 'Heading2'));
      r.steps.forEach((x, i) => body.push(docxParagraph(`${i + 1}.  ${x}`, 'Item')));
    }
  }
  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${W}><w:body>${body.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const font = (f, size, color) =>
    `<w:rPr><w:rFonts w:ascii="${f}" w:hAnsi="${f}" w:cs="${f}"/>${color ? `<w:color w:val="${color}"/>` : ''}<w:sz w:val="${size}"/></w:rPr>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${W}><w:docDefaults><w:rPrDefault>${font('Calibri', 22)}</w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:spacing w:before="2400" w:after="120"/></w:pPr>${font('Georgia', 56)}</w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:pageBreakBefore/><w:spacing w:after="60"/><w:outlineLvl w:val="0"/></w:pPr>${font('Georgia', 40)}</w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:pPr><w:keepNext/><w:spacing w:before="280" w:after="80"/><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="2" w:color="BBBBBB"/></w:pBdr><w:outlineLvl w:val="1"/></w:pPr>${font('Georgia', 26)}</w:style><w:style w:type="paragraph" w:styleId="Meta"><w:name w:val="Meta"/><w:pPr><w:spacing w:after="160"/></w:pPr>${font('Calibri', 20, '777777')}</w:style><w:style w:type="paragraph" w:styleId="Item"><w:name w:val="Item"/><w:pPr><w:spacing w:after="40"/><w:ind w:left="284" w:hanging="284"/></w:pPr></w:style></w:styles>`;
  const rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const files = {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rel}/officeDocument" Target="word/document.xml"/></Relationships>`,
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rel}/styles" Target="styles.xml"/></Relationships>`,
    'word/document.xml': document,
    'word/styles.xml': styles
  };
  return zipStore(files);
}

// Eenvoudig zip-bestand zonder compressie (genoeg voor een paar XML-bestanden).
let zipCrcTable = null;
function zipStore(files) {
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
  for (const [name, text] of Object.entries(files)) {
    const nameBytes = enc.encode(name);
    const data = enc.encode(text);
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
  return new Blob([...parts, ...central, new Uint8Array(end.buffer)]);
}
