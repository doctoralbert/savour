// De eigen receptlezer van Savour: maakt van platte tekst (uit Word, PDF, tekst) één of meer recepten,
// zonder AI. Deze lezer verzint nooit iets: hij verdeelt alleen wat er staat over titel, opbrengst,
// ingrediënten en bereiding. Per recept geeft hij aan hoe zeker hij is (readerConfidence), zodat Savour
// bij twijfel de AI kan inschakelen (Pro) of de chef extra laat controleren.
//
// Dit bestand gebruikt geen pagina-elementen, zodat tests/lezer.test.mjs het ook buiten de browser kan testen.

// Ook "Ingrediënten (4 personen)" en "Ingrediënten voor 4 personen": de opbrengst staat dan in groep 1 of 2.
const READER_INGREDIENTS_HEADING =
  /^(?:ingredi[eë]nten|ingredients?|benodigdheden|benodigd|nodig|wat heb je nodig\??|boodschappen(?:lijst)?)\s*(?:\(([^)]*)\)|\s(voor\s+\d[^:]*))?\s*[:=-]?\s*$/i;
// "Bereiding: Meng alles." of "Ingrediënten: 200 g boter" op één regel.
const READER_INLINE_HEADING =
  /^(ingredi[eë]nten|ingredients?|benodigdheden|bereiding(?:swijze)?|werkwijze|methode|method|instructies)\s*:\s*(\S.*)$/i;
const READER_STEPS_HEADING =
  /^(?:bereiding(?:swijze)?|werkwijze|methode|method|instructies|instructions|directions|preparation|zo maak je het|aan de slag|stappen(?:plan)?|steps?)\s*[:=-]?\s*$/i;
const READER_YIELD_LABEL =
  /^(?:opbrengst|yield|porties?|personen|couverts|aantal(?: personen| porties| stuks)?|serves|makes|recept (?:is )?voor|hoeveelheid|voor)\s*[:=-]?\s*(.+)$/i;
const READER_YIELD_PLAIN =
  /^\(?\s*(?:voor\s+)?\d+(?:[.,-]\d+)?\s*(?:personen|persoon|pers\.?|porties?|couverts|stuks|st\.?|liter|l|kg|gram|g)\s*\)?\.?$/i;
const READER_META_LINE =
  /^(?:bereidingstijd|voorbereidingstijd|kooktijd|baktijd|oventijd|wachttijd|rusttijd|tijd|oven(?:temperatuur)?|temperatuur|moeilijkheid(?:sgraad)?|allergenen|houdbaarheid|bewaren|tip|tips|opmerking(?:en)?|let op|notitie|note)s?\s*[:=-]/i;

const READER_UNIT =
  '(?:g|gr|gram|grams|kg|kilo|mg|ml|cl|dl|l|ltr|liter|liters|deciliter|centiliter|milliliter|el|eetlepels?|tl|theelepels?|kl|koffielepels?|st|stuks?|stk|bosjes?|bos|takjes?|teentjes?|tenen|blaadjes?|blad|plakjes?|plakken|snufjes?|snuf|mespuntjes?|mespunt|scheutjes?|scheut|handjes?|handvol|blikjes?|blik|pakjes?|pak|zakjes?|kopjes?|kop|cups?|tbsp|tsp|oz|lb|stengels?|vellen|vel)';
const READER_QTY = '(?:\\d+(?:[.,]\\d+)?(?:\\s*[-–/]\\s*\\d+(?:[.,]\\d+)?)?\\s*[½¼¾⅓⅔]?|[½¼¾⅓⅔])';
const READER_STARTS_WITH_QTY = new RegExp(`^${READER_QTY}\\s*(?:${READER_UNIT}\\b\\.?)?\\s*\\S`, 'i');
const READER_QUALITATIVE =
  /^(?:snufje|snuf|scheutje|scheut|mespunt(?:je)?|handje|handvol|beetje|wat|een paar|enkele|naar smaak|zout|peper|zout en peper|peper en zout|olie|olijfolie|boter|suiker|water|bloem)\b|\b(?:naar smaak|naar behoefte|eventueel|optioneel)\)?\.?$/i;
const READER_BULLET = /^[-–•*·▪◦●]\s*/;
const READER_STEP_NUMBER = /^(?:stap\s*\d+\s*[:.)-]?|\d+\s*[.)]\s+(?=\D))\s*/i;
const READER_STARTS_WITH_TIME =
  /^\d+(?:[.,]\d+)?\s*(?:minuten|minuut|min\.?|uur|uren|seconden|sec\.?|dagen|dag|nachten|nacht|weken)\b/i;
// Genummerde receptnaam zonder spatie, zoals koks die in een receptenboek zetten: "211.Aardappel crème".
const READER_NUMBERED_TITLE = /^\d{1,4}\.(?=\p{L})/u;
// "Zachte" kop uit Word (vetgedrukt of kop 2/3): een receptnaam óf een onderdeel ("Deel 1", "Deeg").
// splitRecipeText beslist welke van de twee; daarna verdwijnt het teken.
const READER_SOFT_HEADING = /^#b\s+/;

// ---- Kleine hulpfuncties ----

function readerClean(line) {
  return String(line || '')
    .replace(/ /g, ' ')
    .replace(/\t+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Regels opschonen en een kopje met tekst erachter ("Bereiding: Meng alles.") in twee regels splitsen.
function readerLines(text) {
  return (Array.isArray(text) ? text : String(text || '').split(/\r?\n/)).map(readerClean).flatMap(l => {
    const m = l.match(READER_INLINE_HEADING);
    return m ? [m[1], m[2].trim()] : [l];
  });
}

// Opbrengst uit een ingrediëntenkopje ("Ingrediënten (4 personen)", "Ingrediënten voor 4 personen").
function readerHeadingYield(match) {
  const inside = match && (match[1] || match[2]);
  if (!inside) return '';
  return match[2] ? inside.trim() : readerYieldFrom(inside);
}

function readerIsHeading(line) {
  return READER_INGREDIENTS_HEADING.test(line) || READER_STEPS_HEADING.test(line);
}

// Stapnummer of opsommingsteken weg: Savour nummert de stappen zelf.
function readerCleanStep(line) {
  return line.replace(READER_BULLET, '').replace(READER_STEP_NUMBER, '');
}

// Een zin (stap) eindigt op een punt, bevat twee zinnen ("Opkoken, rest erin oplossen. 50 gram per glas")
// of is lang; een ingrediënt is kort en zonder punt.
function readerLooksLikeSentence(line) {
  return /[.!?]$/.test(line) || line.length > 70 || (line.length > 30 && /\p{L}[.!?]\s+\S/u.test(line));
}

// Keukenwerkwoorden. In koksnotities staat het werkwoord vaak achteraan ("Fijn draaien in de cutter",
// "Room en kardemom laten trekken"); zo herkent de lezer een stap ook zonder punt.
const READER_KITCHEN_VERB =
  /\b(?:(?:op|af|in|door|aan|bij|uit|terug|los|fijn|kort|koud)?(?:koken|draaien|mengen|zeven|bakken|braden|garen|roeren|kloppen|spatelen|snijden|schillen|smelten|verwarmen|oplossen|toevoegen|trekken|koelen|vriezen|ontdooien|vacumeren|vacümeren|frituren|cutteren|blenden|mixen|pureren|pocheren|stomen|roosteren|karamelliseren|monteren|binden|afbinden|afblussen|blussen|marineren|wellen|weken|zetten|spuiten|strooien|bestrooien|smeren|insmeren|uitsmeren|steken|uitsteken|vullen|rollen|drogen|laten|brengen|halen|doen|gieten|storten|dresseren|serveren)\b)/i;

// Sterk signaal voor een ingrediënt: opsommingsteken, begint met een hoeveelheid of is kwalitatief
// ("zout naar smaak"), en is geen zin.
function readerIsIngredientLine(line) {
  const x = line.replace(READER_BULLET, '');
  if (!x || READER_STEP_NUMBER.test(line) || READER_NUMBERED_TITLE.test(x)) return false;
  // "2 minuten doorkoken", "1 nacht marineren": een tijd is geen hoeveelheid.
  if (READER_STARTS_WITH_TIME.test(x)) return false;
  // "100 verse gember in de blender met de suiker doordraaien. Vervolgens alles …": meerdere zinnen of heel
  // lang is bereiding, ook als de regel met een hoeveelheid begint.
  if (x.length > 90 || /\p{L}[.!?]\s+\p{L}/u.test(x)) return false;
  // Een zin is bereiding ("Boter smelten in een pan."), behalve iets korts als "250 g boter.".
  if (/[.!?]$/.test(x) && !(READER_STARTS_WITH_QTY.test(x) && x.length <= 30)) return false;
  if (READER_BULLET.test(line) || READER_STARTS_WITH_QTY.test(x)) return true;
  // "Olie kruiden en pepers in robokook draaien. Alles mengen…" en "Suiker koken tot 121c en erbij gieten"
  // beginnen met een ingrediënt, maar zijn een stap.
  if (READER_KITCHEN_VERB.test(x) && (/\d/.test(x) || x.split(/\s+/).length >= 5)) return false;
  return READER_QUALITATIVE.test(x) && x.length <= 50 && !/[.!?]\s/.test(x);
}

// Regel zonder hoeveelheid die op een werkwoord lijkt: "Alles koud mengen", "Mixen met staafmixer",
// "Opkoken tot 116C". Zonder kopjes kan de lezer dan niet zeker zijn dat het een ingrediënt is.
function readerLooksLikeStepStart(line) {
  const first = line
    .replace(READER_BULLET, '')
    .split(/\s+/)[0]
    .toLowerCase()
    .replace(/[^\p{L}]+$/u, '');
  // Ook "Daarna onderstaande toevoegen", "Wanneer ingekookt afmaken met": stappen die met een tijdwoord beginnen.
  const stepWords = ['alles', 'daarna', 'dan', 'wanneer', 'als', 'eerst', 'vervolgens', 'tot', 'nu', 'zodra'];
  return !READER_STARTS_WITH_QTY.test(line) && (stepWords.includes(first) || (first.length >= 5 && /en$/.test(first)));
}

// Zeker een stap, ook zonder punt: begint met "Alles", of noemt een temperatuur of tijd zonder met een
// hoeveelheid te beginnen ("Bakken op 240C", "Siroop inkoken tot 107C", "Alles in blender").
function readerIsSureStep(line) {
  if (READER_STARTS_WITH_QTY.test(line) && !READER_STARTS_WITH_TIME.test(line)) return false;
  return (
    /^alles\b/i.test(line) ||
    (READER_KITCHEN_VERB.test(line) && line.split(/\s+/).length >= 2) ||
    READER_STARTS_WITH_TIME.test(line) ||
    /\d\s*(?:°|’|')?\s*c\b/i.test(line) ||
    /\b\d+\s*(?:minuten|min|uur|seconden|sec)\b/i.test(line)
  );
}

// Waarschijnlijk een stap zonder punt: een werkwoord vooraan en minstens drie woorden ("Mengen en koud zetten").
function readerLooksLikeStepLine(line) {
  return readerIsSureStep(line) || (readerLooksLikeStepStart(line) && line.split(/\s+/).length >= 3);
}

function readerYieldFrom(line) {
  if (READER_YIELD_PLAIN.test(line)) return line.replace(/^\(|\)\.?$/g, '').trim();
  const m = line.match(READER_YIELD_LABEL);
  if (m && /\d/.test(m[1]) && line.length <= 60) {
    // "Voor de saus" is geen opbrengst; "Voor 4 personen" wel.
    if (/^voor\b/i.test(line) && !/^voor\s+\d/i.test(line)) return '';
    return /^voor\s/i.test(line) ? line : m[1].trim();
  }
  return '';
}

// Nummer uit een receptenboek vóór de naam: "10.Asperges koken", "131. Witlof", "7) Saus", "12 - Jus".
// Niet: "12-uurs varkensbuik", "1.5 kg …" of "3 kruiden".
const READER_TITLE_NUMBER = /^\d{1,4}\s*[.)]\s*(?=\D)|^\d{1,4}\s+[-–]\s+/;

function stripTitleNumber(t) {
  const x = String(t || '').trim();
  const stripped = x.replace(READER_TITLE_NUMBER, '').trim();
  return stripped || x;
}

// Receptnaam opschonen: "1. Beurre blanc", "# Beurre blanc", "Recept: Beurre blanc".
function cleanBatchTitle(t) {
  return readerClean(t)
    .replace(/^#{1,3}\s*/, '')
    .replace(/^(?:recept|recipe)\s*[:#-]\s*/i, '')
    .replace(READER_TITLE_NUMBER, '')
    .replace(/^[-–•*]\s*/, '')
    .replace(/([^.])\.$/, '$1')
    .trim();
}

// Lijkt deze regel op een receptnaam? Kort, geen hoeveelheid, geen zin, geen kopje.
function readerLooksLikeTitle(line) {
  const x = readerClean(line);
  if (!x || x.length > 80 || x.length < 2) return false;
  if (readerIsHeading(x) || READER_META_LINE.test(x) || readerYieldFrom(x)) return false;
  if (/^#{1,3}\s+\S/.test(x)) return true;
  // "488.Algenpoeder crumble." : een genummerde naam met een punt erachter is nog steeds een naam.
  if (/[.!?;,:]$/.test(x) && !(READER_NUMBERED_TITLE.test(x) && x.length <= 60 && /[^.]\.$/.test(x))) return false;
  return !readerIsIngredientLine(x);
}

// Ook gebruikt om lange teksten op een receptgrens in stukken te knippen (zie import.js).
function looksLikeRecipeHeading(line, nextLine = '') {
  const x = readerClean(line);
  if (/^#{1,3}\s+\S/.test(x)) return true;
  if (/^(?:recept|recipe)\s*[:#-]/i.test(x)) return true;
  const next = readerClean(nextLine);
  return readerLooksLikeTitle(x) && (READER_INGREDIENTS_HEADING.test(next) || readerIsIngredientLine(next));
}

// ---- Eén recept uit een blok regels ----

function parseRecipeBlock(block) {
  const lines = readerLines(block).filter(Boolean);
  if (!lines.length) return null;
  let title = cleanBatchTitle(lines[0]);
  let yieldText = '';
  // "Beurre blanc (voor 4 personen)": opbrengst tussen haakjes in de titel.
  const inTitle = title.match(/\s*\(([^)]*\d[^)]*)\)\s*$/);
  if (inTitle && readerYieldFrom(inTitle[1])) {
    yieldText = readerYieldFrom(inTitle[1]);
    title = title.slice(0, inTitle.index).trim();
  }
  const rest = lines.slice(1);
  const ingredients = [];
  const steps = [];
  const intro = [];
  const hasIngredientsHeading = rest.some(l => READER_INGREDIENTS_HEADING.test(l));
  const hasStepsHeading = rest.some(l => READER_STEPS_HEADING.test(l));
  let cleanWithoutHeadings = false;
  let onlyClearSteps = false;
  let headingsLookWrong = false;

  if (hasIngredientsHeading || hasStepsHeading) {
    // Met kopjes: de kopjes bepalen waar alles hoort.
    let mode = hasIngredientsHeading ? 'before' : 'ingredients';
    for (const l of rest) {
      const ingHead = l.match(READER_INGREDIENTS_HEADING);
      if (ingHead) {
        if (!yieldText) yieldText = readerHeadingYield(ingHead);
        mode = 'ingredients';
        continue;
      }
      if (READER_STEPS_HEADING.test(l)) {
        mode = 'steps';
        continue;
      }
      if (mode !== 'steps' && !yieldText && readerYieldFrom(l)) {
        yieldText = readerYieldFrom(l);
        continue;
      }
      if (mode === 'before') intro.push(l);
      else if (mode === 'ingredients') {
        // Zonder kopje "Bereiding": de eerste echte zin na de ingrediënten begint de bereiding.
        if (!hasStepsHeading && ingredients.length && readerLooksLikeSentence(l) && !readerIsIngredientLine(l)) {
          mode = 'steps';
          steps.push(readerCleanStep(l));
        } else if (READER_META_LINE.test(l)) intro.push(l);
        // Alleen een kopje "Werkwijze": een duidelijke stap ervóór ("Au bain-marie verwarmen tot 40c") is geen ingrediënt.
        else if (!hasIngredientsHeading && readerIsSureStep(l) && !readerIsIngredientLine(l)) intro.push(l);
        else ingredients.push(l.replace(READER_BULLET, ''));
      } else steps.push(readerCleanStep(l));
    }
    // Staan onder "Bereiding" vooral ingrediëntregels ("- 2 L JDV", "- 4 kg ui"), dan klopt het kopje in de
    // bron waarschijnlijk niet: twijfel, ook al zijn er kopjes.
    const ingredientLikeSteps = steps.filter(readerIsIngredientLine).length;
    headingsLookWrong = ingredientLikeSteps >= 2 && ingredientLikeSteps * 2 > steps.length;
  } else {
    // Zonder kopjes: alles tot en met het laatste duidelijke ingrediënt hoort bij de ingrediënten
    // (zinnen daartussen zijn een inleiding), alles daarna is bereiding.
    const kinds = rest.map(l => {
      if (!yieldText && readerYieldFrom(l)) return 'yield';
      if (READER_META_LINE.test(l)) return 'meta';
      if (readerIsIngredientLine(l)) return 'ingredient';
      if (READER_STEP_NUMBER.test(l) || readerLooksLikeSentence(l)) return 'step';
      if (readerLooksLikeStepLine(l)) return 'stepish';
      return 'short';
    });
    let lastIngredient = -1;
    kinds.forEach((k, i) => {
      if (k === 'ingredient') lastIngredient = i;
    });
    // Korte regels direct na het laatste ingrediënt ("olijfolie", "zout") horen er nog bij.
    while (kinds[lastIngredient + 1] === 'short') lastIngredient++;
    // Zeker zonder kopjes: elke regel tussen de ingrediënten is duidelijk een ingrediënt ("bieslook",
    // "zout en peper") of duidelijk een stap: een zin met punt ("Dit opkoken.") of een zekere stap
    // ("Bakken op 240C"). Twijfel bij een stap zonder punt ("Mengen en koud zetten", "aardappels koken, afgieten").
    cleanWithoutHeadings = rest.every((l, i) => {
      const k = kinds[i];
      if (i > lastIngredient || k === 'yield') return true;
      if (k === 'step') return /[.!?:]$/.test(l) || l.length > 70;
      if (k === 'stepish') return readerIsSureStep(l);
      if (readerLooksLikeStepStart(l)) return false;
      return k === 'ingredient' || (k === 'short' && !l.includes(',') && l.split(/\s+/).length <= 4);
    });
    // Recept van alleen bereiding ("Ananas konfijt": de bron heeft geen ingrediëntenlijst): zeker als
    // elke regel duidelijk een stap is. De lezer laat dan niets weg en verzint niets.
    onlyClearSteps =
      lastIngredient === -1 &&
      rest.length > 0 &&
      rest.every(
        (l, i) => ['step', 'meta', 'yield'].includes(kinds[i]) || (kinds[i] === 'stepish' && readerIsSureStep(l))
      );
    rest.forEach((l, i) => {
      const k = kinds[i];
      if (k === 'yield' && !yieldText) yieldText = readerYieldFrom(l);
      else if (i <= lastIngredient) {
        if (k === 'ingredient' || k === 'short') ingredients.push(l.replace(READER_BULLET, ''));
        else intro.push(l);
      } else steps.push(readerCleanStep(l));
    });
  }

  // Inleiding en notities (bijv. "Oven: 180 °C") gaan voorop in de bereiding, zodat niets verloren gaat.
  const allSteps = [...intro, ...steps].filter(Boolean);
  const name = title || 'Onbenoemd recept';
  const structured = ((hasIngredientsHeading || hasStepsHeading) && !headingsLookWrong) || cleanWithoutHeadings;
  const confidence = onlyClearSteps
    ? 'high'
    : !ingredients.length
      ? 'low'
      : structured
        ? 'high'
        : allSteps.length
          ? 'medium'
          : 'low';
  // source: de oorspronkelijke regels, zodat Savour alleen twijfelgevallen opnieuw (met AI) kan laten lezen.
  return {
    title: name,
    ingredients,
    steps: allSteps,
    yield: yieldText,
    readerConfidence: confidence,
    source: lines.join('\n')
  };
}

// ---- Kleine tikfouten zelf verbeteren ----
//
// Alleen fouten die zeker zijn, en altijd zichtbaar voor de chef (r.fixes: [{ from, to }]):
// 1. letter o in een getal: "14oc" → "140c", "1oo gram" → "100 gram";
// 2. vergeten spatie na een eenheid: "600 gramkippenfond" → "600 gram kippenfond";
// 3. alleen in titel en ingrediënten: een woord (7+ letters) dat één letter afwijkt van een woord dat in hetzelfde document vaak voorkomt (of een
//    bekend keukenwoord is), terwijl het zelf maar één keer voorkomt: "buikspel" → "buikspek".

const READER_O_IN_NUMBER =
  /\b(\d+[oO][\doO]*)(?=\s*(?:°|c\b|graden|gram|gr\b|g\b|ml\b|cl\b|dl\b|kg\b|kilo|liter|min\b|minuten|sec|%))/gi;
const READER_GLUED_UNIT =
  /(\d(?:[.,]\d+)?\s*)(gram|kilo|liter|deciliter|centiliter|milliliter|stuks|eetlepels?|theelepels?|blaadjes|takjes|teentjes)(\p{L}{4,})/giu;
const READER_UNIT_WORD = new RegExp(`^${READER_UNIT}$`, 'i');

function readerWordsOf(text) {
  return String(text || '').match(/\p{L}+/gu) || [];
}

// Eén letter anders (vervangen) of twee buren omgewisseld; hoofdletters tellen niet.
// Niet: een accent weghalen ("fraîche" → "fraiche") of een klinker aan het eind wisselen
// ("albumine" / "albumina", "amarene" / "amarena"): dat zijn allebei bestaande spellingen.
function readerOneLetterOff(a, b) {
  if (a.length !== b.length || a === b) return false;
  const diff = [];
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff.push(i);
  if (diff.length === 1) {
    const [i] = diff;
    if (a[i].normalize('NFD')[0] === b[i] && a[i] !== b[i]) return false;
    if (i === a.length - 1 && /[aeiou]/.test(a[i]) && /[aeiou]/.test(b[i])) return false;
    return true;
  }
  return diff.length === 2 && diff[1] === diff[0] + 1 && a[diff[0]] === b[diff[1]] && a[diff[1]] === b[diff[0]];
}

// Maakt de woordenlijst voor regel 3: woorden uit de hele bron met hoe vaak ze voorkomen, plus bekende keukenwoorden.
function readerVocabulary(sourceText, knownWords = []) {
  const counts = new Map();
  for (const w of readerWordsOf(sourceText)) {
    const k = w.toLowerCase();
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const known = new Set(knownWords.flatMap(readerWordsOf).map(w => w.toLowerCase()));
  return { counts, known };
}

// words: false voor de bereiding. Daar staan veel werkwoorden die één letter van elkaar verschillen en
// allebei kloppen ("uitrekken" / "uitlekken", "opvangen" / "ophangen"); daar verbeteren we alleen getallen.
function readerFixText(text, vocab, fixes, words = true) {
  let out = String(text || '');
  out = out.replace(READER_O_IN_NUMBER, m => {
    const to = m.replace(/[oO]/g, '0');
    fixes.push({ from: m, to });
    return to;
  });
  out = out.replace(READER_GLUED_UNIT, (m, qty, unit, rest) => {
    // "kilogram" is geen vergeten spatie, en een woord dat zo in de bron vaker voorkomt ook niet.
    if (READER_UNIT_WORD.test(rest) || (vocab.counts.get((unit + rest).toLowerCase()) || 0) > 1) return m;
    fixes.push({ from: unit + rest, to: `${unit} ${rest}` });
    return `${qty}${unit} ${rest}`;
  });
  if (!words || !vocab.counts.size) return out;
  // Pas vanaf 7 letters: kortere woorden lijken te vaak op elkaar ("vallen" / "vullen").
  return out.replace(/\p{L}{7,}/gu, word => {
    const k = word.toLowerCase();
    // Woorden op -en zijn meestal werkwoorden of meervouden ("plukken" / "plakken"): die laten we staan.
    if (k.endsWith('en') || vocab.known.has(k) || (vocab.counts.get(k) || 0) > 1) return word;
    const candidates = new Set();
    for (const [w, n] of vocab.counts) if (n >= 3 && readerOneLetterOff(k, w)) candidates.add(w);
    for (const w of vocab.known) if (readerOneLetterOff(k, w)) candidates.add(w);
    if (candidates.size !== 1) return word;
    let to = [...candidates][0];
    if (word[0] === word[0].toUpperCase()) to = to[0].toUpperCase() + to.slice(1);
    fixes.push({ from: word, to });
    return to;
  });
}

// Verbetert titel, opbrengst, ingrediënten en bereiding van één recept; geeft een nieuw object terug.
function readerAutoFix(recipe, vocab) {
  const fixes = [];
  const fix = t => readerFixText(t, vocab, fixes);
  const fixed = {
    ...recipe,
    title: fix(recipe.title),
    yield: fix(recipe.yield),
    ingredients: (recipe.ingredients || []).map(fix),
    steps: (recipe.steps || []).map(t => readerFixText(t, vocab, fixes, false))
  };
  const seen = new Set();
  fixed.fixes = fixes.filter(f => {
    const key = `${f.from}→${f.to}`;
    return !seen.has(key) && seen.add(key);
  });
  return fixed;
}

// ---- Tekst met mogelijk meerdere recepten ----

// Splitst tekst in recepten. Een nieuw recept begint bij een Word-kop (# ), bij een receptnaam die
// gevolgd wordt door een nieuw ingrediëntenkopje, of bij een receptnaam na een witregel als het vorige
// recept al een bereiding had. Tussenkopjes binnen de ingrediënten ("Voor de saus") splitsen niet.
function splitRecipeText(text) {
  const raw = String(text || '')
    .replace(/\r/g, '')
    .replace(/ /g, ' ');
  const lines = readerLines(raw.split('\n'));
  const nextFilled = from => {
    for (let j = from; j < lines.length; j++) if (lines[j]) return { line: lines[j], index: j };
    return { line: '', index: -1 };
  };
  const blocks = [];
  let current = [];
  // headings: dit recept heeft een kopje Ingrediënten of Bereiding; openIngredients: na "Ingrediënten",
  // nog vóór "Bereiding" (een vet kopje daar is een onderdeel, geen nieuw recept).
  const fresh = () => ({ ingredients: 0, steps: 0, inSteps: false, headings: false, openIngredients: false });
  let state = fresh();
  let blankBefore = false;
  const start = () => {
    if (current.length) blocks.push(current);
    current = [];
    state = fresh();
  };
  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    if (!l) {
      blankBefore = true;
      continue;
    }
    const next = nextFilled(i + 1).line.replace(READER_SOFT_HEADING, '');
    const hasContent = state.ingredients > 0 || state.steps > 0;
    // Zachte kop ("#b ": vet of Word-kop 2/3): een nieuw recept, of een onderdeel van het huidige
    // ("Deel 1", "Deeg", "Boemboe"). Een onderdeel staat tussen "Ingrediënten" en "Bereiding", of na
    // "Bereiding" zonder ingrediënten erachter.
    if (READER_SOFT_HEADING.test(l)) {
      l = l.replace(READER_SOFT_HEADING, '');
      const nextIsIngredients =
        readerIsIngredientLine(next) || READER_INGREDIENTS_HEADING.test(next) || Boolean(readerYieldFrom(next));
      const isPart = current.length && (state.openIngredients || (state.headings && !nextIsIngredients));
      if (isPart) {
        current.push(/:$/.test(l) ? l : `${l}:`);
        blankBefore = false;
        continue;
      }
      // Ook na een recept van alleen zinnen ("Aardpeer wassen en in stukken snijden…").
      if (current.length > 1 || (current.length && nextIsIngredients)) start();
      current.push(l);
      blankBefore = false;
      continue;
    }
    // Een Word-kop die eigenlijk een ingrediënt is ("380 gram pecannoten" per ongeluk als Kop 1) is gewoon een regel.
    if (/^#{1,3}\s+\S/.test(l) && current.length && readerIsIngredientLine(l.replace(/^#{1,3}\s+/, '')))
      l = l.replace(/^#{1,3}\s+/, '');
    const isDocHeading = /^#{1,3}\s+\S/.test(l) && !readerIsHeading(l.replace(/^#{1,3}\s+/, ''));
    const titleBeforeIngredients = readerLooksLikeTitle(l) && READER_INGREDIENTS_HEADING.test(next);
    const titleAfterMethod =
      blankBefore &&
      state.inSteps &&
      state.steps > 0 &&
      readerLooksLikeTitle(l) &&
      (readerIsIngredientLine(next) || readerYieldFrom(next) || READER_INGREDIENTS_HEADING.test(next));
    const repeatedIngredientsHeading = READER_INGREDIENTS_HEADING.test(l) && state.inSteps && state.steps > 0;
    // Vanaf nummer 10 ook als er direct bereiding volgt ("598.Roseval gepoft" + "Was de Roseval…"):
    // stappen zonder spatie na het nummer ("1.Snijd de ui") komen zelden zo ver.
    const numberedTitle =
      READER_NUMBERED_TITLE.test(l) &&
      readerLooksLikeTitle(l) &&
      (readerIsIngredientLine(next) || READER_INGREDIENTS_HEADING.test(next) || (hasContent && parseInt(l, 10) >= 10));
    // Zonder inhoud (bijv. receptnaam + ondertitel vóór "Ingrediënten") splitsen we niet: de eerste regel blijft de naam.
    if (current.length && (isDocHeading || numberedTitle || titleAfterMethod || (titleBeforeIngredients && hasContent)))
      start();
    else if (repeatedIngredientsHeading) {
      start();
      current.push('Onbenoemd recept');
    }
    current.push(l);
    blankBefore = false;
    if (READER_INGREDIENTS_HEADING.test(l))
      Object.assign(state, { inSteps: false, headings: true, openIngredients: true });
    else if (READER_STEPS_HEADING.test(l))
      Object.assign(state, { inSteps: true, headings: true, openIngredients: false });
    else if (current.length > 1) {
      if (state.inSteps) state.steps++;
      else if (readerIsIngredientLine(l)) state.ingredients++;
      else if (state.ingredients && readerLooksLikeSentence(l)) {
        state.inSteps = true;
        state.steps++;
      }
    }
  }
  start();
  // Blokken zonder ingrediënten en zonder bereiding (zoals een losse documenttitel) zijn geen recept.
  return blocks.map(parseRecipeBlock).filter(r => r && (r.ingredients.length || r.steps.length));
}
