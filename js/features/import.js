// Recepten importeren: tekst, documenten en foto's, met AI-structurering en controle vóór opslaan.

function showImportPanel() {
  if ($('inlineEditorHost')) $('inlineEditorHost').style.display = 'none';
  $('importPanel').style.display = 'block';
  $('importStatus').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectImportSource(type) {
  // Foto's lezen gaat met AI: zonder Pro meteen uitleggen in plaats van na het uploaden.
  if (type === 'photo' && !isPro()) return askForPro("Foto's");
  importSource = type;
  importFileData = null;
  document.querySelectorAll('.import-option').forEach(x => x.classList.remove('selected'));
  const map = {
    photo: 'importOptionPhoto',
    text: 'importOptionText',
    word: 'importOptionWord',
    pdf: 'importOptionPdf',
    other: 'importOptionOther'
  };
  if (map[type]) $(map[type]).classList.add('selected');
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
    const labels = {
      photo: 'Bron: foto uit je fotoalbum',
      word: 'Bron: Word-bestand',
      pdf: 'Bron: PDF-bestand',
      other: 'Bron: ander bestand'
    };
    $('importSourceLabel').textContent = labels[type] || '';
    $('importFile').value = '';
  }
}

function triggerImportFile() {
  if (!importSource || importSource === 'text') selectImportSource('other');
  $('importFile').click();
}

function triggerImportFolder() {
  importSource = 'other';
  $('importFile').value = '';
  $('importFolder').click();
}

function normalizeImportFiles(list) {
  return Array.from(list || []).filter(f => f && f.size > 0);
}

function setImportFiles(files) {
  const list = normalizeImportFiles(files);
  importFileData = list;
  if (!list.length) {
    $('importSourceNote').style.display = 'none';
    $('importStatus').textContent = '';
    return;
  }
  importSource = 'other';
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
  document.querySelectorAll('.import-option').forEach(x => x.classList.remove('selected'));
}

async function extractImportText(file) {
  if (!file) return '';
  const name = (file.name || '').toLowerCase();
  if (name.endsWith('.docx')) {
    if (!window.mammoth) throw new Error('Word-importmodule kon niet worden geladen.');
    const ab = await file.arrayBuffer();
    // Via HTML i.p.v. kale tekst: dan blijven koppen, tabellen en opsommingen herkenbaar.
    const result = await mammoth.convertToHtml({ arrayBuffer: ab });
    return htmlToRecipeText(result.value || '');
  }
  if (name.endsWith('.txt') || name.endsWith('.csv')) return await file.text();
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

// Word-HTML naar regels: koppen worden "# naam" (receptgrens), tabelrijen één regel, opsommingen "- ".
function htmlToRecipeText(html) {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const lines = [];
  const text = el => el.textContent.replace(/\s+/g, ' ').trim();
  const walk = node => {
    for (const el of node.children) {
      const tag = el.tagName.toLowerCase();
      if (/^h[1-3]$/.test(tag)) lines.push('', `# ${text(el)}`);
      else if (/^h[4-6]$/.test(tag)) lines.push(text(el));
      else if (tag === 'p') lines.push(text(el));
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
  return Array.isArray(result?.recipes) ? result.recipes : [];
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
  const title = String(r.title || 'Onbenoemd recept').trim();
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
  const aiRecipes = await callAiImportWithRetry({ image: dataUrl, filename: file.name });
  if (!aiRecipes.length) throw new Error('Geen recept uit de foto herkend.');
  return aiRecipes.map(r => normalizeAiRecipe(r, { photo: dataUrl, sourceFile: file.name }));
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
  const local = readRecipesLocally(sourceText, { sourceFile: file.name });
  const readerIsSure = local.length && local.every(r => r.readerConfidence === 'high');
  if (readerIsSure || !isPro()) return local;

  const chunks = chunkImportText(sourceText);
  const drafts = [];
  let aiError = null;
  for (let i = 0; i < chunks.length; i++) {
    if (chunks.length > 1)
      $('importStatus').textContent = `${file.name}: deel ${i + 1} van ${chunks.length} wordt verwerkt…`;
    let aiRecipes = [];
    if (!aiError) {
      try {
        aiRecipes = await callAiImportWithRetry({ text: chunks[i], filename: file.name });
      } catch (e) {
        aiError = e;
      }
    }
    if (aiRecipes.length) drafts.push(...aiRecipes.map(r => normalizeAiRecipe(r, { sourceFile: file.name })));
    else
      drafts.push(
        ...readRecipesLocally(chunks[i], {
          sourceFile: file.name,
          _withoutAi: aiError ? aiError.message : ''
        })
      );
  }
  return drafts;
}
function updateImportProgress(done, total, label = '') {
  const wrap = $('importProgressWrap'),
    bar = $('importProgressBar'),
    txt = $('importProgressText');
  if (!wrap || !bar) return;
  wrap.style.display = 'block';
  const pct = total ? Math.round((done / total) * 100) : 0;
  bar.style.width = pct + '%';
  if (txt) txt.textContent = label || `${done} / ${total} bestanden verwerkt · ${pct}%`;
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
  const allowed = /\.(doc|docx|pdf|txt|rtf|odt|pages|csv|jpe?g|png|webp)$/i;
  const valid = list.filter(f => allowed.test(f.name));
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
  const worker = async () => {
    while (queue.length) {
      const file = queue.shift();
      try {
        const name = (file.name || '').toLowerCase();
        let drafts;
        if (/\.(jpe?g|png|webp)$/i.test(name)) drafts = await importImageFile(file);
        else if (/\.doc$/i.test(name))
          throw new Error(
            'Oud .doc-formaat wordt nog niet rechtstreeks uitgelezen. Sla het document op als .docx en probeer opnieuw.'
          );
        else drafts = await importTextFile(file);
        batchDrafts.push(...drafts);
      } catch (e) {
        console.error('Bulk import', file.name, e);
        failures.push({ name: file.name, error: e?.message || 'Import mislukt.', pro: e?.code === 'pro_required' });
      } finally {
        done++;
        $('importStatus').textContent =
          `${done} / ${valid.length} bestanden verwerkt${failures.length ? ` · ${failures.length} mislukt` : ''}…`;
        updateImportProgress(
          done,
          valid.length,
          `${done} / ${valid.length} bestanden verwerkt${failures.length ? ` · ${failures.length} mislukt` : ''} · ${Math.round((done / valid.length) * 100)}%`
        );
      }
    }
  };
  const workers = Array.from({ length: Math.min(3, valid.length) }, () => worker());
  await Promise.all(workers);
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
  if (withoutAi.length)
    notes.push(
      `<span class="batch-warning">${withoutAi.length} recept${withoutAi.length === 1 ? ' is' : 'en zijn'} zonder AI uitgelezen (<span>${esc(withoutAi[0]._withoutAi)}</span>). Controleer titel, ingrediënten en bereiding extra goed.</span>`
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
          `<article class="batch-recipe" data-batch-card="${i}"><div class="batch-recipe-head"><div><span class="batch-chip">Recept ${i + 1}</span>${r._maybeIncomplete ? ' <span class="batch-chip batch-chip-warn">Mogelijk onvolledig</span>' : r._withoutAi ? ' <span class="batch-chip batch-chip-warn">Zonder AI · controleren</span>' : r._needsReview || r._unclear?.length ? ' <span class="batch-chip batch-chip-warn">Controleren</span>' : ''}<h3>${esc(r.title)}</h3></div><button type="button" class="batch-remove-btn" title="Recept verwijderen" aria-label="Recept ${i + 1} verwijderen" onclick="removeBatchDraft(${i})">×</button></div>${r.photo ? `<img class="batch-photo" src="${esc(r.photo)}" alt="">` : ''}${r._unclear?.length ? `<div class="batch-unclear"><b>Niet goed leesbaar, controleer:</b><ul translate="no">${r._unclear.map(u => `<li>${esc(u)}</li>`).join('')}</ul></div>` : ''}<small>${r.ingredients.length} ingrediënten · ${r.steps.length} stappen${r.sourceFile ? ` · ${esc(r.sourceFile)}` : ''}</small><div class="field" style="margin-top:12px"><label>Titel</label><input data-batch-title="${i}" value="${esc(r.title)}"></div><div class="field" style="margin-top:10px"><label>Ingrediënten</label><textarea class="batch-text" rows="${batchRows(r.ingredients)}" data-batch-ingredients="${i}">${esc(r.ingredients.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Bereiding</label><textarea class="batch-text" rows="${batchRows(r.steps)}" data-batch-steps="${i}">${esc(r.steps.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Opbrengst</label><input data-batch-yield="${i}" value="${esc(r.yield || '')}"></div><div class="field" style="margin-top:10px"><label>Categorie</label><select data-batch-category="${i}" onchange="batchDrafts[${i}]._categoryChosen=true">${catOptions.map(c => `<option value="${esc(c)}" ${String(r.category || 'Eigen recepten') === String(c) ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div></article>`
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
  // Twijfelgevallen: de chef kiest per recept zelf, tenzij hij de categorie al aanpaste.
  for (const r of batchDrafts) {
    if (r._categoryChosen) continue;
    const chosen = await chooseDoubtfulCategory(r.title, r.category);
    if (!chosen) return;
    r.category = chosen;
    r._categoryChosen = true;
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
  const btn = $('batchSaveBtn');
  btn.disabled = true;
  btn.textContent = 'Opslaan…';
  let saved = 0;
  const failures = [];
  try {
    for (const r of batchDrafts) {
      let categoryId = null;
      if (r.category && r.category !== 'Eigen recepten') {
        const { data: cat, error } = await supabaseClient
          .from('categories')
          .select('id')
          .eq('user_id', currentUser.id)
          .eq('name', r.category)
          .maybeSingle();
        if (error) {
          failures.push({ title: r.title, error: error.message });
          continue;
        }
        categoryId = cat?.id || null;
      }
      const { error } = await supabaseClient.from('recipes').insert({
        user_id: currentUser.id,
        title: r.title || 'Nieuw recept',
        description: null,
        yield_text: r.yield || null,
        ingredients: r.ingredients || [],
        steps: r.steps || [],
        category_id: categoryId,
        photo_url: r.photo || null
      });
      if (error) {
        console.error('Batch opslaan', r.title, error);
        failures.push({ title: r.title, error: error.message || 'Opslaan mislukt' });
        continue;
      }
      saved++;
    }
    await loadDatabaseState();
    batchDrafts = [];
    if (failures.length) {
      toast(`${saved} recepten opgeslagen · ${failures.length} niet opgeslagen`);
      $('batchStatus').innerHTML =
        `${esc(String(saved))} recepten opgeslagen.<br><span class="muted">Niet opgeslagen: ${failures.map(f => esc(f.title)).join(', ')}</span>`;
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
