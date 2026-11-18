// MEP-lijst importeren (2026-11-17): Excel (.xlsx of .csv), Word, tekst, geplakte tekst of een foto.
// De MEP-lezer (js/features/mep-reader.js) deelt in: kaart, kopje of onderdeel. Een foto schrijft de AI eerst
// letterlijk over (Savour Pro; telt als AI-import), daarna deelt dezelfde lezer in. Niets wordt opgeslagen voordat
// de kok het controlescherm heeft nagekeken. Het bestand zelf wordt bewaard zoals bij recepten importeren
// (registerImportUpload), zodat er nooit iets kwijt raakt.

let mepImport = null; // { name, rows, teamId, uploadId, resultIds, file }

const MEP_IMPORT_ACCEPT = '.xlsx,.csv,.docx,.txt,.md,image/jpeg,image/png,image/webp';

function openMepImport() {
  if (!currentUser && !demoMode) return;
  // Een MEP-lijst maken (ook door importeren) is Savour Pro.
  if (!mepCanCreate()) return mepAskForPro();
  mepImport = { name: '', rows: [], teamId: null, uploadId: null, resultIds: [], file: null, step: 'kies' };
  mepOpenId = null;
  mepSetBand(false);
  const headActions = $('mepHeadActions');
  if (headActions) headActions.innerHTML = '';
  renderMepImport();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

async function closeMepImport(skipAsk = false) {
  if (!mepImport) return;
  if (!skipAsk && mepImport.rows.length) {
    if (
      !(await askConfirm(t('Stoppen met importeren? Wat je hier nakeek, wordt niet opgeslagen.'), {
        confirmLabel: t('Stoppen')
      }))
    )
      return;
  }
  // Een foto die de AI las maar die niet wordt opgeslagen: afmelden, anders biedt Savour hem later als recept aan.
  if (mepImport.resultIds.length) markAiResults(mepImport.resultIds, 'weggegooid');
  mepImport = null;
  renderMep();
}

function renderMepImport() {
  const host = $('mepBody');
  if (!host || !mepImport) return;
  const heading = $('mepTitle');
  if (heading) heading.textContent = t('MEP-lijst importeren');
  const back = `<div class="mep-head"><button type="button" class="btn small mep-back" onclick="closeMepImport()">${icon('back')}${esc(t('Alle MEP-lijsten'))}</button></div>`;
  if (mepImport.step === 'bezig') {
    host.innerHTML = `${back}<div class="mep-empty"><p><b>${esc(t('Bezig met lezen…'))}</b></p><p>${esc(mepImport.busyText || '')}</p></div>`;
    return;
  }
  if (mepImport.step === 'kies') {
    host.innerHTML = `${back}<div class="mep-import"><p class="mep-intro">${esc(t('Heb je je MEP-lijst al in Excel, Word of op papier? Savour leest hem in en deelt hem in: kaarten, kopjes en onderdelen. Daarna kijk je alles na voordat het wordt opgeslagen.'))}</p><div class="mep-import-choices"><label class="mep-import-file btn gold">${icon('download')}${esc(t('Bestand kiezen'))}<input type="file" accept="${MEP_IMPORT_ACCEPT}" onchange="readMepImportFile(this.files[0]);this.value=''"></label><span class="muted">${esc(t('Excel (.xlsx, .csv), Word (.docx), tekst of een foto. Een foto leest de AI: alleen met Savour Pro.'))}</span></div><label class="mep-import-paste"><span>${esc(t('Of plak je lijst hier'))}</span><textarea id="mepImportText" rows="10" placeholder="${esc([t('Bijvoorbeeld:'), 'MEP Garde', '', `${t('Voor')} · Gravlax`, 'gravlax 60 g', 'mayonaise 15 g'].join('\n'))}"></textarea></label><div class="mep-actions"><button type="button" class="btn" onclick="readMepImportText()">${esc(t('Lezen'))}</button></div></div>`;
    return;
  }
  renderMepImportReview();
}

// ---- Inlezen ----

async function readMepImportFile(file) {
  if (!file || !mepImport) return;
  const name = (file.name || '').toLowerCase();
  if (/\.xls$/.test(name))
    return toast(t('Oude Excel-bestanden (.xls) kan Savour niet lezen. Sla het bestand in Excel op als .xlsx.'));
  if (/\.doc$/.test(name)) return toast(t('Sla het bestand in Word op als .docx en probeer het opnieuw.'));
  const isImage = /^image\//.test(file.type) || /\.(jpe?g|png|webp)$/.test(name);
  if (isImage && demoMode)
    return toast(t('Een foto laten lezen kan niet in de demo. Probeer een Excel-bestand of plak je lijst.'));
  if (isImage && !isPro()) return askForPro(t('Een foto van je MEP-lijst'));
  mepImport.file = file;
  mepImport.step = 'bezig';
  mepImport.busyText = isImage ? t('De AI schrijft je lijst over. Dit duurt even.') : file.name;
  renderMepImport();
  mepImport.uploadId = await registerImportUpload(file);
  try {
    let result;
    if (/\.xlsx$/.test(name)) result = await mepReadXlsx(file);
    else if (/\.csv$/.test(name)) result = mepReadGrid(mepCsvCells(await file.text()));
    else if (isImage) result = mepReadLines(await mepPhotoText(file));
    else result = mepReadLines(await extractImportText(file));
    if (!mepImport) return;
    mepUseImportResult(result, file.name);
  } catch (e) {
    console.error(e);
    if (!mepImport) return;
    setImportUploadStatus(mepImport.uploadId, {
      status: 'mislukt',
      note: String(e?.message || 'Import mislukt').slice(0, 2000)
    });
    mepImport.step = 'kies';
    renderMepImport();
    toast(mepFileError(e, name));
  }
}

// Een kapot of verkeerd bestand: een gewone zin in plaats van de technische fout (bijv. van JSZip).
function mepFileError(e, name) {
  const msg = String(e?.message || '');
  if (
    /\.(xlsx|docx)$/.test(name) &&
    /zip|central directory|corrupt|end of data|invalid|unexpected|signature/i.test(msg)
  )
    return t(
      'Dit bestand kon niet worden geopend. Misschien is het beschadigd of geen echt Excel- of Word-bestand. Open het in Excel of Word, sla het opnieuw op en probeer het nog eens. Plakken van de tekst kan ook.'
    );
  return msg && msg.length < 200 && !/[{}<>]|\bat\b.*:\d+/.test(msg) ? msg : t('Dit bestand kon niet worden gelezen.');
}

function readMepImportText() {
  const text = $('mepImportText')?.value || '';
  if (!text.trim()) return $('mepImportText')?.focus();
  mepUseImportResult(mepReadLines(text), '');
}

function mepUseImportResult(result, fileName) {
  const rows = (result.rows || []).map(r => ({ ...r, doubts: r.doubts || [] }));
  if (!rows.some(r => r.type === 'item' || r.type === 'section')) {
    mepImport.step = 'kies';
    renderMepImport();
    return toast(t('Er stond niets in dat op een MEP-lijst lijkt.'));
  }
  const base = String(fileName || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .trim();
  mepImport.name = (result.name || base || mepTr('Nieuwe MEP-lijst')).slice(0, 120);
  mepImport.rows = rows;
  // Zoals de MEP-lezer het las: na opslaan vergeleken met wat de kok ervan maakte (mepLearn).
  mepImport.readRows = mepCompactRows(rows);
  mepImport.kind = /\.xlsx$/i.test(fileName)
    ? 'excel'
    : /\.csv$/i.test(fileName)
      ? 'csv'
      : fileName
        ? 'bestand'
        : 'tekst';
  mepImport.step = 'controle';
  if (mepImport.uploadId) setImportUploadStatus(mepImport.uploadId, { status: 'gelezen' });
  renderMepImport();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Excel: het (gekozen) blad als cellen, met vet (gerechten staan vaak vet in de keukenlijst).
async function mepReadXlsx(file) {
  await ensureJSZip();
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xml = async path => {
    const f = zip.file(path);
    return f ? new DOMParser().parseFromString(await f.async('string'), 'application/xml') : null;
  };
  const byTag = (doc, tag) => [...(doc?.getElementsByTagName(tag) || [])];
  const shared = byTag(await xml('xl/sharedStrings.xml'), 'si').map(si =>
    byTag(si, 't')
      .map(x => x.textContent)
      .join('')
  );
  const styles = await xml('xl/styles.xml');
  const fontsEl = byTag(styles, 'fonts')[0];
  const fonts = fontsEl ? [...fontsEl.children].map(f => f.getElementsByTagName('b').length > 0) : [];
  const xfsEl = byTag(styles, 'cellXfs')[0];
  const xfBold = xfsEl ? [...xfsEl.children].map(x => !!fonts[Number(x.getAttribute('fontId') || 0)]) : [];
  // Bladen in volgorde van het werkboek.
  const wb = await xml('xl/workbook.xml');
  const rels = await xml('xl/_rels/workbook.xml.rels');
  const target = new Map(byTag(rels, 'Relationship').map(r => [r.getAttribute('Id'), r.getAttribute('Target')]));
  const sheets = [];
  for (const sh of byTag(wb, 'sheet')) {
    const rid =
      sh.getAttribute('r:id') ||
      sh.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
    let path = String(target.get(rid) || '').replace(/^\//, '');
    if (!path.startsWith('xl/')) path = 'xl/' + path;
    const doc = await xml(path);
    const cells = [];
    for (const c of byTag(doc, 'c')) {
      const m = String(c.getAttribute('r') || '').match(/^([A-Z]+)(\d+)$/);
      if (!m) continue;
      const v = c.getElementsByTagName('v')[0];
      const type = c.getAttribute('t');
      let text = '';
      if (type === 's' && v) text = shared[Number(v.textContent)] || '';
      else if (type === 'inlineStr')
        text = byTag(c, 't')
          .map(x => x.textContent)
          .join('');
      else if (v) text = v.textContent;
      if (!String(text).trim()) continue;
      cells.push({
        row: Number(m[2]),
        col: mepColNumber(m[1]),
        text,
        bold: !!xfBold[Number(c.getAttribute('s') || 0)]
      });
    }
    if (cells.length) sheets.push({ name: sh.getAttribute('name') || '', cells });
  }
  if (!sheets.length) throw new Error(t('Dit Excel-bestand is leeg.'));
  let sheet = sheets[0];
  if (sheets.length > 1) {
    const pick = await askChoice(
      t('Welk blad is de MEP-lijst?'),
      sheets.map((s, i) => ({ value: String(i), label: s.name, primary: i === 0 }))
    );
    if (pick == null) throw new Error(t('Importeren gestopt.'));
    sheet = sheets[Number(pick)];
  }
  const result = mepReadGrid(sheet.cells);
  if (!result.name && sheets.length > 1) result.name = sheet.name;
  return result;
}

// Foto: rechtop zetten en de AI letterlijk laten overschrijven (zelfde weg als recepten van een foto). Alleen de
// overschrijving wordt gebruikt; de indeling maakt de MEP-lezer, en de kok kijkt alles na.
async function mepPhotoText(file) {
  const dataUrl = await compressPhoto(file);
  const edge = await callAiOrient(dataUrl).catch(() => 'top');
  const upright = await rotateDataUrl(dataUrl, { left: 90, right: 270, bottom: 180 }[edge] || 0);
  const forReading = await enhanceForReading(upright);
  const found = await callAiImportWithRetry({ image: forReading, filename: file.name, upload_id: mepImport?.uploadId });
  if (mepImport) mepImport.resultIds = found.map(r => r._resultId).filter(Boolean);
  const text = found
    .map(r =>
      Array.isArray(r.transcription) && r.transcription.length
        ? r.transcription.join('\n')
        : [r.title, ...(r.ingredients || []), ...(r.steps || [])].filter(Boolean).join('\n')
    )
    .join('\n\n');
  if (!text.trim()) throw new Error(t('Op deze foto kon geen lijst worden gelezen.'));
  return text;
}

// ---- Controlescherm ----

const MEP_ROW_TYPES = [
  ['card', 'Kaart'],
  ['section', 'Kopje'],
  ['item', 'Onderdeel'],
  ['skip', 'Weglaten']
];

function mepImportCounts() {
  const rows = mepImport.rows;
  return {
    cards: rows.filter(r => r.type === 'card').length || 1,
    sections: rows.filter(r => r.type === 'section').length,
    items: rows.filter(r => r.type === 'item').length,
    doubts: rows.filter(r => r.type === 'item' && r.doubts?.length).length
  };
}

function renderMepImportReview() {
  const host = $('mepBody');
  const n = mepImportCounts();
  const teams = mepTeamsForNew();
  const where = teams.length
    ? `<label class="mep-import-field"><span>${esc(t('Voor wie'))}</span><select onchange="mepImport.teamId=this.value||null"><option value="">${esc(t('Alleen voor mij'))}</option>${teams.map(m => `<option value="${esc(m.id)}"${mepImport.teamId === m.id ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}</select></label>`
    : '';
  const summary = `<p class="mep-import-sum"><b>${n.cards === 1 ? t('1 kaart') : `${n.cards} ${t('kaarten')}`}</b> · <span>${n.sections === 1 ? t('1 kopje') : `${n.sections} ${t('kopjes')}`}</span> · <span>${n.items === 1 ? t('1 onderdeel') : `${n.items} ${t('onderdelen')}`}</span>${n.doubts ? ` · <span class="mep-doubt-count">${n.doubts} ${esc(t('om na te kijken'))}</span>` : ''}</p>`;
  const rows = mepImport.rows.map((r, i) => mepImportRow(r, i)).join('');
  host.innerHTML = `<div class="mep-head"><button type="button" class="btn small mep-back" onclick="closeMepImport()">${icon('back')}${esc(t('Alle MEP-lijsten'))}</button></div><div class="mep-import-review"><p class="mep-intro">${esc(t('Kijk na wat Savour las. Per regel kies je of het een kaart, kopje of onderdeel is. De oorspronkelijke tekst staat er klein onder; gele regels zijn om na te kijken. Er wordt pas iets opgeslagen als je op Opslaan drukt.'))}</p><div class="mep-import-top"><label class="mep-import-field"><span>${esc(t('Naam van de lijst'))}</span><input value="${esc(mepImport.name)}" maxlength="120" oninput="mepImport.name=this.value"></label>${where}</div>${summary}<div class="mep-import-rows">${rows}</div><div class="mep-actions mep-import-save"><button type="button" class="btn gold" onclick="saveMepImport()">${esc(t('Opslaan als MEP-lijst'))}</button><button type="button" class="btn" onclick="closeMepImport()">${esc(t('Annuleren'))}</button></div></div>`;
}

function mepImportRow(r, i) {
  const type = `<select class="mep-imp-type" aria-label="${esc(t('Soort regel'))}" onchange="setMepImportRow(${i},'type',this.value)">${MEP_ROW_TYPES.map(([v, l]) => `<option value="${v}"${r.type === v ? ' selected' : ''}>${esc(t(l))}</option>`).join('')}</select>`;
  const shown =
    r.type === 'item'
      ? [[r.text, r.qty != null ? `${formatNumber(r.qty)} ${r.unit || ''}` : ''].filter(Boolean).join(' '), r.note]
          .filter(Boolean)
          .join(' · ')
      : r.text;
  const differs = r.original && mepCleanText(r.original) !== mepCleanText(shown);
  const orig = differs
    ? `<small class="mep-imp-orig"><span>${esc(t('Stond er'))}</span>: <span translate="no">${esc(r.original)}</span></small>`
    : '';
  const doubt =
    r.type === 'item' && r.doubts?.length
      ? `<small class="mep-imp-doubt">${r.doubts.map(d => `<span>${esc(t(d))}</span>`).join(' · ')}</small>`
      : '';
  const added = r.added
    ? `<small class="mep-imp-orig">${esc(t('Toegevoegd door Savour: de regels hiervoor hadden nog geen kaart.'))}</small>`
    : '';
  const fields =
    r.type === 'item'
      ? `<input class="mep-imp-name" value="${esc(r.text)}" maxlength="200" aria-label="${esc(t('Onderdeel'))}" onchange="setMepImportRow(${i},'text',this.value)"><input class="mep-imp-qty" value="${r.qty == null ? '' : esc(formatNumber(r.qty))}" inputmode="decimal" placeholder="${esc(t('Portie'))}" aria-label="${esc(t('Portie'))}" onchange="setMepImportRow(${i},'qty',this.value,this)"><input class="mep-imp-unit" value="${esc(r.unit || '')}" maxlength="20" placeholder="${esc(t('Eenheid'))}" aria-label="${esc(t('Eenheid'))}" onchange="setMepImportRow(${i},'unit',this.value)"><input class="mep-imp-note" value="${esc(r.note || '')}" maxlength="300" placeholder="${esc(t('Opmerking'))}" aria-label="${esc(t('Opmerking'))}" onchange="setMepImportRow(${i},'note',this.value)">`
      : `<input class="mep-imp-name" value="${esc(r.text)}" maxlength="${r.type === 'card' ? 80 : 160}" aria-label="${esc(t('Naam'))}" onchange="setMepImportRow(${i},'text',this.value)">`;
  return `<div class="mep-imp-row is-${r.type}${doubt ? ' has-doubt' : ''}">${type}<div class="mep-imp-fields">${fields}${orig}${added}${doubt}</div></div>`;
}

function setMepImportRow(i, field, value, input) {
  const r = mepImport?.rows[i];
  if (!r) return;
  if (field === 'qty') {
    const q = mepParseQty(value);
    if (Number.isNaN(q) || q === 0) {
      if (input) input.value = r.qty == null ? '' : formatNumber(r.qty);
      return toast(t('Vul bij portie een getal in, bijvoorbeeld 40 of 0,5. Of laat het leeg.'));
    }
    r.qty = q;
    r.doubts = [];
  } else if (field === 'type') {
    r.type = value;
    // Een kopje of kaart heeft geen hoeveelheid; de tekst zoals hij er stond blijft de naam.
    if (value !== 'item' && r.qty != null) r.text = r.original ? mepCleanHeading(r.original) : r.text;
  } else {
    r[field] = String(value).trim() || (field === 'text' ? r.text : null);
    if (field === 'unit') r.doubts = [];
  }
  // Wat de kok aanpast, is nagekeken.
  if (field !== 'type') r.doubts = [];
  renderMepImportReview();
}

async function saveMepImport() {
  if (!mepImport) return;
  const name = (mepImport.name || '').trim();
  if (!name) return toast(t('Geef de lijst een naam.'));
  const teamId = mepImport.teamId || null;
  if (!mepCanCreate()) return mepAskForPro();
  const rows = mepImport.rows.filter(r => r.type !== 'skip' && String(r.text || '').trim());
  if (!rows.some(r => r.type === 'item')) return toast(t('Er staat geen enkel onderdeel in.'));
  const n = mepImportCounts();
  if (
    n.doubts &&
    !(await askConfirm(
      `${n.doubts} ${t('regels zijn nog niet nagekeken')}\n\n${t('Ze worden opgeslagen zoals ze er nu staan. Je kunt ze later nog aanpassen bij Bewerken.')}`,
      { confirmLabel: t('Toch opslaan') }
    ))
  )
    return;
  // Indelen: kaarten > kopjes > onderdelen. Onderdelen zonder kopje krijgen het kopje "Overig".
  const list = {
    id: mepNewId(),
    owner_id: currentUser?.id || 'demo',
    team_id: teamId,
    name: name.slice(0, 120),
    archived: false,
    position: mepLists.length,
    created_by: currentUser?.id || null
  };
  const cards = [];
  const sections = [];
  const items = [];
  let card = null;
  let section = null;
  const newCard = text => {
    card = { id: mepNewId(), list_id: list.id, name: String(text).slice(0, 80), position: cards.length };
    cards.push(card);
    section = null;
  };
  const newSection = text => {
    if (!card) newCard(mepTr('À la carte'));
    section = {
      id: mepNewId(),
      list_id: list.id,
      card_id: card.id,
      name: String(text).slice(0, 160),
      position: sections.filter(s => s.card_id === card.id).length
    };
    sections.push(section);
  };
  for (const r of rows) {
    if (r.type === 'card') newCard(r.text);
    else if (r.type === 'section') newSection(r.text);
    else {
      if (!section) newSection(mepTr('Overig'));
      items.push({
        id: mepNewId(),
        list_id: list.id,
        section_id: section.id,
        name: String(r.text).slice(0, 200),
        portion_qty: r.qty != null && r.qty > 0 ? r.qty : null,
        portion_unit: r.qty != null && r.unit ? String(r.unit).slice(0, 20) : null,
        note: r.note ? String(r.note).slice(0, 300) : null,
        recipe_id: null,
        position: items.filter(x => x.section_id === section.id).length
      });
    }
  }
  if (!(await mepInsert('mep_lists', list))) return;
  const ok =
    (await mepInsert('mep_cards', cards)) &&
    (await mepInsert('mep_sections', sections)) &&
    (await mepInsert('mep_items', items));
  if (!ok) toast(t('De lijst is niet helemaal opgeslagen. Kijk hem na bij Bewerken.'));
  if (mepImport.resultIds.length) markAiResults(mepImport.resultIds, 'opgeslagen');
  mepLearn(mepImport);
  if (mepImport.uploadId) setImportUploadStatus(mepImport.uploadId, { status: 'opgeslagen' });
  mepImport = null;
  toast(`${t('MEP-lijst opgeslagen')}: ${items.length} ${t('onderdelen')}`);
  mepMode = 'overzicht';
  mepCardId = null;
  openMepList(list.id);
}

// ---- Savour leert (supabase/2026-11-18-savour-leert.sql) ----
// Wat de kok in het controlescherm veranderde, is een les voor de MEP-lezer: soort regel, tekst, hoeveelheid,
// eenheid en opmerking, zoals gelezen en zoals opgeslagen. Alleen als er iets anders is, en alleen met
// "Help de Savour-lezer verbeteren". Elke avond kijkt Claude ernaar (dagelijkse controle) en stelt regels voor de
// lezer voor; de lezer zelf verandert nooit vanzelf.
function mepCompactRows(rows) {
  return (rows || [])
    .slice(0, 400)
    .map(r => [
      r.type,
      String(r.text || '').slice(0, 120),
      r.qty ?? null,
      r.unit || null,
      r.note ? String(r.note).slice(0, 120) : null
    ]);
}

function mepLearn(imp) {
  if (demoMode || !currentUser || account?.helpReader === false || !imp?.readRows) return;
  const saved = mepCompactRows(imp.rows);
  if (JSON.stringify(saved) === JSON.stringify(imp.readRows)) return;
  supabaseClient
    .from('learning_events')
    .insert({
      source: 'mep',
      lang: currentLanguage || 'nl',
      data: { kind: imp.kind || '', as_read: imp.readRows, as_saved: saved }
    })
    .then(({ error }) => error && console.warn('MEP-lezer leren:', error.message));
}
