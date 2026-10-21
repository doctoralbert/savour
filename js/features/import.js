// Recepten importeren: tekst, documenten en foto's, met AI-structurering en controle vóór opslaan.

function showImportPanel() {
  if ($('inlineEditorHost')) $('inlineEditorHost').style.display = 'none';
  $('importPanel').style.display = 'block';
  $('importStatus').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectImportSource(type) {
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
    const result = await mammoth.extractRawText({ arrayBuffer: ab });
    return result.value || '';
  }
  if (
    name.endsWith('.txt') ||
    name.endsWith('.rtf') ||
    name.endsWith('.odt') ||
    name.endsWith('.pages') ||
    name.endsWith('.csv')
  )
    return await file.text();
  if (name.endsWith('.pdf')) {
    try {
      const pdfjs = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs');
      const ab = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: ab }).promise;
      let out = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const tc = await page.getTextContent();
        out.push(tc.items.map(x => x.str).join(' '));
      }
      return out.join('\n');
    } catch (e) {
      throw new Error('PDF kon niet als tekst worden uitgelezen.');
    }
  }
  return '';
}

function cleanBatchTitle(t) {
  return String(t || '')
    .replace(/^\s*\d+[.)-]\s*/, '')
    .replace(/^\s*[#*-]\s*/, '')
    .trim();
}

function looksLikeRecipeHeading(line, nextLine = '') {
  const x = String(line || '').trim();
  if (!x || x.length > 110) return false;
  if (/^\d+[.)-]\s*\S+/.test(x)) return true;
  if (/^#{1,3}\s+\S+/.test(x)) return true;
  if (/^(recept|recipe)\s*[:#-]/i.test(x)) return true;
  const next = String(nextLine || '');
  const ingredientLike =
    /^[-•*]?\s*\d+(?:[.,]\d+)?\s*(?:g|gr|gram|kg|mg|ml|milliliter|cl|dl|liter|deciliter|milliliter|l|stuks?|st\.?|takjes?|teentjes?|blaadjes?|eieren?|el\.?|tl\.?)\b/i;
  const hasUnit = ingredientLike.test(x);
  return !hasUnit && x.length >= 3 && x.length <= 70 && !/[.:;]$/.test(x) && ingredientLike.test(next);
}

// Eenvoudige lezer zonder AI. Staan er kopjes in de bron ("Ingrediënten", "Bereiding"), dan volgen we die
// precies. Zonder kopjes: korte regels (vaak met een hoeveelheid) zijn ingrediënten, zinnen zijn stappen.
// Er wordt nooit iets verzonnen; de chef controleert het resultaat altijd vóór opslaan.
const INGREDIENTS_HEADING = /^(ingredi[eë]nten|ingredients|benodigdheden|nodig|boodschappen)\s*[:=-]?$/i;
const STEPS_HEADING = /^(bereiding|bereidingswijze|methode|method|werkwijze|instructies|stap(pen)?|steps?)\s*[:=-]?$/i;
const YIELD_LINE =
  /^(opbrengst|yield|porties?|aantal personen)\s*[:=-]\s*|^voor\s+\d+([.,]\d+)?\s*(personen|pers\.?|porties?|stuks?|liter|l|kg|gram|g)\b|^\d+\s*(personen|porties)$/i;

function looksLikeStep(line) {
  return /[.!]$/.test(line) || line.length > 60;
}

function parseRecipeBlock(block) {
  const lines = block
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(Boolean);
  if (!lines.length) return null;
  const title = cleanBatchTitle(lines[0]);
  let yieldText = '';
  const ingredients = [];
  const steps = [];
  const hasHeadings = lines.some(l => STEPS_HEADING.test(l));
  let mode = 'ingredients';
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    if (!yieldText && mode === 'ingredients' && YIELD_LINE.test(l)) {
      yieldText = l.replace(/^(opbrengst|yield|porties?|aantal personen)\s*[:=-]\s*/i, '').trim();
      continue;
    }
    if (INGREDIENTS_HEADING.test(l)) {
      mode = 'ingredients';
      continue;
    }
    if (STEPS_HEADING.test(l)) {
      mode = 'steps';
      continue;
    }
    const clean = l.replace(/^[-•*]\s*/, '');
    if (mode === 'steps') steps.push(clean.replace(/^\d+[.)]\s+/, ''));
    // Met kopjes: alles vóór "Bereiding" is ingrediënt. Zonder kopjes: een zin is een stap.
    else if (hasHeadings || !looksLikeStep(clean)) ingredients.push(clean);
    else {
      mode = 'steps';
      steps.push(clean);
    }
  }
  // Geen bereiding in de bron? Dan blijft steps leeg. Nooit ingrediënten als bereiding verzinnen.
  const name = title || 'Onbenoemd recept';
  return { title: name, ingredients, steps, yield: yieldText, category: importCategory(name, '') };
}

function splitRecipeText(text) {
  const raw = String(text || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\r/g, '')
    .trim();
  if (!raw) return [];
  const lines = raw.split('\n');
  const starts = [];
  for (let i = 0; i < lines.length; i++) if (looksLikeRecipeHeading(lines[i], lines[i + 1])) starts.push(i);
  if (starts.length >= 2) {
    const blocks = [];
    for (let i = 0; i < starts.length; i++) {
      const a = starts[i],
        b = starts[i + 1] ?? lines.length;
      const block = lines.slice(a, b).join('\n').trim();
      if (block) blocks.push(block);
    }
    return blocks.map(parseRecipeBlock).filter(Boolean);
  }
  const blocks = raw
    .split(/\n\s*\n\s*\n+/)
    .map(x => x.trim())
    .filter(Boolean);
  if (blocks.length >= 2) return blocks.map(parseRecipeBlock).filter(Boolean);
  return [parseRecipeBlock(raw)].filter(Boolean);
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
    body: JSON.stringify({ ...body, categories: categories.slice() })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const raw = result?.error || '';
    // Tegoed op geeft ook 429, maar opnieuw proberen heeft dan geen zin.
    const noCredit = /quota|billing|credit/i.test(raw);
    const message = /OPENAI_API_KEY/.test(raw)
      ? 'De AI is op deze server niet ingesteld.'
      : noCredit
        ? 'Het OpenAI-tegoed is op.'
        : raw || (response.status === 413 ? 'Het bestand is te groot.' : 'AI-import mislukt.');
    throw Object.assign(new Error(message), { status: response.status, final: noCredit });
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
    ...extra
  };
}

// Knipt lange teksten in stukken van max. ~20.000 tekens, bij voorkeur op een receptkop, anders op een witregel.
const AI_IMPORT_CHUNK_CHARS = 20000;

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

async function importImageFile(file) {
  const dataUrl = await compressPhoto(file);
  const aiRecipes = await callAiImportWithRetry({ image: dataUrl, filename: file.name });
  if (!aiRecipes.length) throw new Error('Geen recept uit de foto herkend.');
  return aiRecipes.map(r => normalizeAiRecipe(r, { photo: dataUrl, sourceFile: file.name }));
}

async function importTextFile(file) {
  const sourceText = await extractImportText(file);
  if (!sourceText.trim()) {
    const base = (file?.name || 'Geïmporteerd recept')
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .trim();
    return [
      {
        title: base || 'Geïmporteerd recept',
        ingredients: ['Bron bevat geen uitleesbare tekst.'],
        steps: ['Controleer de bron handmatig.'],
        yield: '',
        category: 'Eigen recepten',
        sourceFile: file.name,
        _needsReview: true
      }
    ];
  }
  const chunks = chunkImportText(sourceText);
  const drafts = [];
  for (let i = 0; i < chunks.length; i++) {
    if (chunks.length > 1)
      $('importStatus').textContent = `${file.name}: deel ${i + 1} van ${chunks.length} wordt verwerkt…`;
    // Is de AI niet bereikbaar, dan gaat het bestand niet verloren: de tekst is al uitgelezen en gaat
    // naar de eenvoudige tekstsplitser. Zulke recepten zijn gemarkeerd om extra goed te controleren.
    let aiRecipes = [];
    let aiError = null;
    try {
      aiRecipes = await callAiImportWithRetry({ text: chunks[i], filename: file.name });
    } catch (e) {
      aiError = e;
    }
    if (aiRecipes.length) drafts.push(...aiRecipes.map(r => normalizeAiRecipe(r, { sourceFile: file.name })));
    else
      drafts.push(
        ...splitRecipeText(chunks[i]).map(r => ({
          ...r,
          sourceFile: file.name,
          _needsReview: true,
          _withoutAi: aiError ? aiError.message : ''
        }))
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

// Mislukte bestanden, gegroepeerd per reden: "Het bestand is te groot. (2): a.docx, b.docx".
function importFailureSummary(failures) {
  const byReason = new Map();
  failures.forEach(f => byReason.set(f.error, [...(byReason.get(f.error) || []), f.name]));
  return [...byReason]
    .map(
      ([reason, names]) =>
        `<span class="muted">Niet verwerkt (${names.length}): <span translate="no">${esc(names.slice(0, 5).join(', '))}${names.length > 5 ? ' …' : ''}</span> · <span>${esc(reason)}</span></span>`
    )
    .join('<br>');
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
        failures.push({ name: file.name, error: e?.message || 'Import mislukt.' });
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
  if (!batchDrafts.length) {
    $('importStatus').innerHTML =
      'Geen recepten verwerkt.' + (failures.length ? `<br>${importFailureSummary(failures)}` : '');
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
      const sourceText = text;
      batchDrafts = splitRecipeText(sourceText);
      if (batchDrafts.length > 1) {
        $('batchStatus').textContent = `${batchDrafts.length} losse recepten herkend uit de ingevoerde tekst.`;
        renderBatchDrafts();
        go('batchImport');
      } else {
        currentId = null;
        $('editorTitle').textContent = 'Import controleren';
        const r = batchDrafts[0] || { title: 'Geïmporteerd recept', ingredients: [], steps: [], yield: '' };
        $('fTitle').value = r.title;
        $('fYield').value = r.yield || '';
        renderEditorCategories('Eigen recepten');
        $('fIngredients').value = r.ingredients.join('\n');
        $('fSteps').value = r.steps.join('\n');
        $('fPhoto').value = '';
        $('photoPreview').style.display = 'none';
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

function renderBatchDrafts() {
  $('batchCount').textContent = batchDrafts.length ? `${batchDrafts.length} recepten herkend` : '';
  const catOptions = ['Eigen recepten', ...categories];
  $('batchRecipeGrid').innerHTML =
    batchDrafts
      .map(
        (r, i) =>
          `<article class="batch-recipe" data-batch-card="${i}"><div class="batch-recipe-head"><div><span class="batch-chip">Recept ${i + 1}</span>${r._withoutAi ? ' <span class="batch-chip batch-chip-warn">Zonder AI · controleren</span>' : ''}<h3>${esc(r.title)}</h3></div><button type="button" class="batch-remove-btn" title="Recept verwijderen" aria-label="Recept ${i + 1} verwijderen" onclick="removeBatchDraft(${i})">×</button></div>${r.photo ? `<img src="${esc(r.photo)}" alt="" style="width:100%;max-height:150px;object-fit:cover;border-radius:7px;margin:10px 0">` : ''}<small>${r.ingredients.length} ingrediënten · ${r.steps.length} stappen${r.sourceFile ? ` · ${esc(r.sourceFile)}` : ''}</small><div class="field" style="margin-top:12px"><label>Titel</label><input data-batch-title="${i}" value="${esc(r.title)}"></div><div class="field" style="margin-top:10px"><label>Ingrediënten</label><textarea data-batch-ingredients="${i}">${esc(r.ingredients.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Bereiding</label><textarea data-batch-steps="${i}">${esc(r.steps.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Opbrengst</label><input data-batch-yield="${i}" value="${esc(r.yield || '')}"></div><div class="field" style="margin-top:10px"><label>Categorie</label><select data-batch-category="${i}" onchange="batchDrafts[${i}]._categoryChosen=true">${catOptions.map(c => `<option value="${esc(c)}" ${String(r.category || 'Eigen recepten') === String(c) ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div></article>`
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
