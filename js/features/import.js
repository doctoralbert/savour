// Recepten importeren: tekst, documenten en foto's, met AI-structurering en controle vÃ³Ã³r opslaan.

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
  let mode = 'ingredients';
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^(opbrengst|yield)\s*[:=-]/i.test(l)) {
      yieldText = l.replace(/^(opbrengst|yield)\s*[:=-]\s*/i, '').trim();
      continue;
    }
    if (/^(bereiding|bereidingswijze|methode|method|werkwijze)\s*[:=-]?$/i.test(l)) {
      mode = 'steps';
      continue;
    }
    if (/^(stap(pen)?|steps?)\s*[:=-]/i.test(l)) {
      mode = 'steps';
      continue;
    }
    if (mode === 'ingredients' && /^[-•*]\s*/.test(l)) ingredients.push(l.replace(/^[-•*]\s*/, ''));
    else if (
      mode === 'ingredients' &&
      /^[-•*]?\s*\d+(?:[.,]\d+)?\s*(?:g|gr|gram|kg|mg|ml|milliliter|cl|dl|liter|deciliter|milliliter|l|stuks?|st\.?|takjes?|teentjes?|blaadjes?|eieren?|el\.?|tl\.?)\b/i.test(
        l
      )
    )
      ingredients.push(l);
    else if (mode === 'ingredients' && ingredients.length === 0 && i < Math.min(lines.length, 8)) ingredients.push(l);
    else steps.push(l);
  }
  // No bereiding in de bron? Laat steps leeg. Nooit ingrediënten verzinnen als bereiding.
  return { title: title || 'Onbenoemd recept', ingredients, steps, yield: yieldText, category: 'Eigen recepten' };
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

async function readImageAsDataUrl(file) {
  const reader = new FileReader();
  return await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Verkleint een foto tot max. 2000px en JPEG, zodat hij onder de uploadlimiet van Vercel (4,5 MB) blijft.
async function compressImageForImport(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('Deze foto kan niet worden gelezen. Gebruik JPG, PNG of WEBP.'));
      i.src = url;
    });
    const scale = Math.min(1, 2000 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
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
  if (!response.ok)
    throw new Error(result?.error || (response.status === 413 ? 'Het bestand is te groot.' : 'AI-import mislukt.'));
  return Array.isArray(result?.recipes) ? result.recipes : [];
}

function normalizeAiRecipe(r, extra) {
  return {
    title: String(r.title || 'Onbenoemd recept').trim(),
    ingredients: Array.isArray(r.ingredients) ? r.ingredients.map(String).filter(Boolean) : [],
    steps: Array.isArray(r.steps) ? r.steps.map(String).filter(Boolean) : [],
    yield: String(r.yield || '').trim(),
    category: String(r.category || 'Eigen recepten').trim(),
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
  const dataUrl = await compressImageForImport(file);
  const aiRecipes = await callAiImport({ image: dataUrl, filename: file.name });
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
    const aiRecipes = await callAiImport({ text: chunks[i], filename: file.name });
    // Herkent de AI niets in dit deel, dan valt het terug op de eenvoudige tekstsplitser (te controleren).
    if (aiRecipes.length) drafts.push(...aiRecipes.map(r => normalizeAiRecipe(r, { sourceFile: file.name })));
    else drafts.push(...splitRecipeText(chunks[i]).map(r => ({ ...r, sourceFile: file.name, _needsReview: true })));
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
    $('importStatus').textContent = `Geen recepten verwerkt.${failures.length ? ' Controleer de foutmeldingen.' : ''}`;
    return;
  }
  batchDrafts = batchDrafts.map((r, i) => ({ ...r, _importIndex: i }));
  const successText = `${batchDrafts.length} recept${batchDrafts.length === 1 ? '' : 'en'} uit ${valid.length - failures.length} bestand${valid.length - failures.length === 1 ? '' : 'en'} verwerkt.`;
  $('batchStatus').textContent =
    successText +
    (failures.length
      ? ` ${failures.length} bestand${failures.length === 1 ? '' : 'en'} kon${failures.length === 1 ? '' : 'den'} niet worden verwerkt.`
      : '');
  if (failures.length) {
    $('batchStatus').innerHTML =
      esc(successText) + `<br><span class="muted">Niet verwerkt: ${failures.map(f => esc(f.name)).join(', ')}</span>`;
  }
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
          `<article class="batch-recipe" data-batch-card="${i}"><div class="batch-recipe-head"><div><span class="batch-chip">Recept ${i + 1}</span><h3>${esc(r.title)}</h3></div><button type="button" class="batch-remove-btn" title="Recept verwijderen" aria-label="Recept ${i + 1} verwijderen" onclick="removeBatchDraft(${i})">×</button></div>${r.photo ? `<img src="${r.photo}" alt="" style="width:100%;max-height:150px;object-fit:cover;border-radius:7px;margin:10px 0">` : ''}<small>${r.ingredients.length} ingrediënten · ${r.steps.length} stappen${r.sourceFile ? ` · ${esc(r.sourceFile)}` : ''}</small><div class="field" style="margin-top:12px"><label>Titel</label><input data-batch-title="${i}" value="${escAttr(r.title)}"></div><div class="field" style="margin-top:10px"><label>Ingrediënten</label><textarea data-batch-ingredients="${i}">${esc(r.ingredients.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Bereiding</label><textarea data-batch-steps="${i}">${esc(r.steps.join('\n'))}</textarea></div><div class="field" style="margin-top:10px"><label>Opbrengst</label><input data-batch-yield="${i}" value="${escAttr(r.yield || '')}"></div><div class="field" style="margin-top:10px"><label>Categorie</label><select data-batch-category="${i}">${catOptions.map(c => `<option value="${escAttr(c)}" ${String(r.category || 'Eigen recepten') === String(c) ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div></article>`
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
  const existing = new Map(recipes.map(r => [v6Fingerprint(r), r]));
  const seen = new Set();
  const filtered = [];
  for (const r of batchDrafts) {
    const fp = v6Fingerprint(r);
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
