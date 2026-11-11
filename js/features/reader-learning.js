// De Savour-lezer slimmer maken (supabase/2026-11-10-lezer-leren.sql).
// Bij elke import onthoudt Savour wat de lezer of de AI las (_learn). Slaat de kok de recepten op, dan:
// - gaat er van iedereen een ANONIEME telling naar Savour: soort bron, zekerheid van de lezer, of de AI nodig
//   was en hoeveel regels de kok veranderde. Geen receptinhoud, geen account.
// - deelt een account met "Help de Savour-lezer verbeteren" aan (standaard aan, Instellingen) bij twijfel of
//   na een verbetering ook het voorbeeld zelf: de brontekst, wat de lezer en de AI lazen en wat de kok opsloeg.
//   Alleen tekstbronnen, nooit foto's. De beheerder maakt er lezer-tests van; de lezer verandert nooit vanzelf.

// Wat er gelezen is, los van latere wijzigingen door de kok.
function learnSnapshot(r) {
  return {
    title: String(r?.title || ''),
    yield: String(r?.yield || ''),
    ingredients: (r?.ingredients || []).map(String),
    steps: (r?.steps || []).map(String)
  };
}

function learnFileExt(name) {
  return (String(name || '').match(/\.([a-z0-9]{1,10})$/i)?.[1] || '').toLowerCase();
}

// Soort bron: foto, scan (gescande PDF), pdf, word, tekst, webpagina, app (export uit een andere app).
function learnSourceKind(name, r, kind) {
  if (kind) return kind;
  if (r._fromPhoto) return 'foto';
  const ext = learnFileExt(name);
  if (ext === 'pdf') return r._byAi && !r._learnPair ? 'scan' : 'pdf';
  if (['doc', 'docx', 'odt', 'rtf', 'pages'].includes(ext)) return 'word';
  if (['txt', 'md'].includes(ext)) return 'tekst';
  if (['html', 'htm'].includes(ext)) return 'webpagina';
  if (ext === 'csv') return 'csv';
  if (ext) return 'app';
  return 'tekst';
}

// Onthoudt bij elk concept wat er gelezen is. kind: 'webpagina' of 'tekst' als dat al vaststaat.
function stampForLearning(drafts, sourceName, kind) {
  return (drafts || []).map(r =>
    r._learn
      ? r
      : {
          ...r,
          _learn: {
            kind: learnSourceKind(sourceName, r, kind),
            ext: learnFileExt(sourceName),
            read: learnSnapshot(r),
            confidence: r._byAi ? '' : String(r.readerConfidence || ''),
            byAi: Boolean(r._byAi),
            model: String(r._model || ''),
            unclear: (r._unclear || []).length,
            // Tekst die de lezer niet zeker wist en de AI nalas: de brontekst en wat de lezer ervan maakte.
            pair: r._learnPair || null,
            // Wat de lezer zelf las: de oorspronkelijke regels.
            source: r._byAi ? '' : String(r.source || '')
          }
        }
  );
}

const learnNorm = s =>
  String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
const learnWords = s =>
  learnNorm(s)
    .replace(/\d+(?:[.,]\d+)?/g, '')
    .replace(/[^a-zà-ÿ]+/g, ' ')
    .trim();

// Verschil tussen twee lijsten regels: gelijk, alleen een getal anders, tekst anders, erbij en weg.
function learnListDiff(before, after) {
  const removed = [];
  const added = (after || []).map(learnNorm);
  let same = 0;
  for (const line of (before || []).map(learnNorm)) {
    const i = added.indexOf(line);
    if (i >= 0) {
      added.splice(i, 1);
      same++;
    } else removed.push(line);
  }
  let numbers = 0;
  for (const line of [...removed]) {
    const i = added.findIndex(a => learnWords(a) && learnWords(a) === learnWords(line));
    if (i < 0) continue;
    added.splice(i, 1);
    removed.splice(removed.indexOf(line), 1);
    numbers++;
  }
  const changed = Math.min(removed.length, added.length);
  return { same, numbers, changed, added: added.length - changed, removed: removed.length - changed };
}

// Wat de kok veranderde aan wat er gelezen was (alleen aantallen).
function learnEdits(read, final) {
  const finalIng = new Set(final.ingredients.map(learnNorm));
  const finalSteps = new Set(final.steps.map(learnNorm));
  // Verplaatst (van ingrediënten naar bereiding of andersom) telt apart, niet ook nog als veranderd.
  const toSteps = new Set(
    read.ingredients.filter(l => !finalIng.has(learnNorm(l)) && finalSteps.has(learnNorm(l))).map(learnNorm)
  );
  const toIngredients = new Set(
    read.steps.filter(l => !finalSteps.has(learnNorm(l)) && finalIng.has(learnNorm(l))).map(learnNorm)
  );
  const edits = {
    title: learnNorm(read.title) !== learnNorm(final.title),
    yield: learnNorm(read.yield) !== learnNorm(final.yield),
    ingredients: learnListDiff(
      read.ingredients.filter(l => !toSteps.has(learnNorm(l))),
      final.ingredients.filter(l => !toIngredients.has(learnNorm(l)))
    ),
    steps: learnListDiff(
      read.steps.filter(l => !toIngredients.has(learnNorm(l))),
      final.steps.filter(l => !toSteps.has(learnNorm(l)))
    ),
    to_steps: toSteps.size,
    to_ingredients: toIngredients.size
  };
  const list = d => d.numbers + d.changed + d.added + d.removed;
  edits.any =
    edits.title ||
    edits.yield ||
    list(edits.ingredients) > 0 ||
    list(edits.steps) > 0 ||
    edits.to_steps > 0 ||
    edits.to_ingredients > 0;
  return edits;
}

// Lazen de lezer en de AI hetzelfde stuk tekst hetzelfde? Aantal recepten en hoeveel ingrediëntregels gelijk.
function learnAgreement(readerRecipes, aiReads) {
  const lines = list => list.flatMap(r => r.ingredients).map(learnNorm);
  const reader = lines(readerRecipes);
  const ai = lines(aiReads);
  const left = [...ai];
  let same = 0;
  for (const l of reader) {
    const i = left.indexOf(l);
    if (i >= 0) {
      left.splice(i, 1);
      same++;
    }
  }
  return {
    reader_recipes: readerRecipes.length,
    ai_recipes: aiReads.length,
    reader_lines: reader.length,
    ai_lines: ai.length,
    same_lines: same
  };
}

// Na het opslaan: tellingen (iedereen) en voorbeelden (alleen met "Help de Savour-lezer verbeteren").
// Mislukt dit, dan merkt de kok er niets van: het opslaan zelf is dan al gelukt.
async function reportReaderLearning(savedDrafts) {
  if (!currentUser || demoMode || typeof supabaseClient === 'undefined') return;
  const drafts = (savedDrafts || []).filter(d => d?._learn);
  if (!drafts.length) return;
  try {
    const signals = [];
    const examples = [];
    const pairs = new Map();
    for (const d of drafts) {
      const l = d._learn;
      const final = learnSnapshot(d);
      const edits = learnEdits(l.read, final);
      let agree = null;
      if (l.pair) {
        if (!pairs.has(l.pair)) pairs.set(l.pair, []);
        pairs.get(l.pair).push(d);
        agree = learnAgreement(l.pair.reader || [], [l.read]);
      }
      signals.push({
        source_kind: l.kind,
        file_ext: l.ext,
        reader_confidence: l.confidence,
        by_ai: l.byAi,
        ai_model: l.model,
        n_ingredients: l.read.ingredients.length,
        n_steps: l.read.steps.length,
        unclear: l.unclear,
        edits,
        agree,
        language: typeof currentLanguage === 'string' ? currentLanguage : 'nl'
      });
      // Voorbeeld van wat de lezer zelf las: bij twijfel of als de kok iets veranderde.
      const textSource = !['foto', 'scan'].includes(l.kind);
      if (textSource && !l.byAi && l.source && (l.confidence !== 'high' || edits.any))
        examples.push({
          source_kind: l.kind,
          file_ext: l.ext || null,
          reason: edits.any ? 'kok verbeterde de lezer' : 'lezer twijfelde',
          source_text: l.source.slice(0, 20000),
          reader_result: [l.read],
          ai_result: null,
          final_result: [final]
        });
    }
    // Tekst die de AI moest nalezen: één voorbeeld per stuk tekst, met wat de lezer én de AI ervan maakten.
    for (const [pair, list] of pairs)
      examples.push({
        source_kind: list[0]._learn.kind,
        file_ext: list[0]._learn.ext || null,
        reason: list.some(d => learnEdits(d._learn.read, learnSnapshot(d)).any)
          ? 'AI nodig, kok verbeterde'
          : 'AI nodig',
        source_text: String(pair.source || '').slice(0, 20000),
        reader_result: pair.reader || [],
        ai_result: list.map(d => d._learn.read),
        final_result: list.map(learnSnapshot)
      });
    for (let i = 0; i < signals.length; i += 200)
      await supabaseClient.rpc('savour_reader_signals', { _rows: signals.slice(i, i + 200) });
    if (examples.length && account.helpReader !== false) {
      const { error } = await supabaseClient.from('reader_examples').insert(examples.slice(0, 100));
      if (error) console.warn('Lezer-voorbeelden niet gedeeld', error.message);
    }
  } catch (e) {
    console.warn('Lezer leren', e?.message || e);
  }
}

// Instellingen → "Help de Savour-lezer verbeteren". Uitzetten: ook eerder gedeelde voorbeelden weghalen?
async function setHelpReader(on) {
  if (!currentUser || demoMode) return;
  account.helpReader = Boolean(on);
  const { error } = await supabaseClient
    .from('profiles')
    .update({ help_reader: account.helpReader })
    .eq('id', currentUser.id);
  if (error) {
    toast(t('Instelling kon niet worden bewaard'));
    return;
  }
  toast(account.helpReader ? t('Bedankt: je helpt de Savour-lezer verbeteren') : t('Je deelt geen voorbeelden meer'));
  if (account.helpReader) return;
  const wipe = await askConfirm(
    `${t('Eerder gedeelde voorbeelden ook weghalen?')}\n\n${t('Savour haalt dan de recepten weg die je eerder hebt gedeeld om de lezer te verbeteren. Je eigen recepten blijven gewoon staan.')}`,
    { confirmLabel: t('Weghalen') }
  );
  if (!wipe) return;
  const { error: delError } = await supabaseClient.from('reader_examples').delete().eq('user_id', currentUser.id);
  // Ook de bewaarde importversies (recipe_import_origins); de recepten zelf blijven staan.
  const { error: originError } = await supabaseClient
    .from('recipe_import_origins')
    .delete()
    .eq('user_id', currentUser.id);
  toast(
    delError || (originError && !['42P01', 'PGRST205'].includes(originError.code))
      ? t('Weghalen lukte niet')
      : t('Gedeelde voorbeelden weggehaald')
  );
}

// Per geïmporteerd recept bewaren wat de lezer of de AI las en wat de kok opsloeg (recipe_import_origins).
// Wat de kok verbetert (meteen in de controle, of later in het recept) is de beste les voor de lezer; de
// dagelijkse controle vergelijkt dit met het recept zoals het nu is. Alleen met "Help de Savour-lezer
// verbeteren" aan. Op de achtergrond: de kok wacht hier niet op, en een fout merkt hij niet.
async function saveImportOrigins(drafts, rows) {
  if (!currentUser || demoMode || account.helpReader === false) return;
  const list = (drafts || [])
    .map((d, i) => [d, rows?.[i]?.id])
    .filter(([d, id]) => id && d?._learn?.read)
    .map(([d, id]) => ({
      recipe_id: id,
      user_id: currentUser.id,
      upload_id: d._uploadId || null,
      result_id: d._resultId || null,
      source_kind: d._learn.kind || null,
      file_ext: d._learn.ext || null,
      by_ai: Boolean(d._learn.byAi),
      reader_confidence: d._learn.confidence || null,
      as_read: d._learn.read,
      as_saved: learnSnapshot(d)
    }));
  if (!list.length) return;
  try {
    const { error } = await supabaseClient.from('recipe_import_origins').insert(list);
    if (error) console.warn('Importversie niet bewaard', error.message);
  } catch (e) {
    console.warn('Importversie niet bewaard', e?.message || e);
  }
}
