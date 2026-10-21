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
  /^(?:opbrengst|yield|porties?|personen|couverts|aantal(?: personen| porties| stuks)?|serves|makes|recept voor|hoeveelheid|voor)\s*[:=-]?\s*(.+)$/i;
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

// Een zin (stap) eindigt op een punt of is lang; een ingrediënt is kort en zonder punt.
function readerLooksLikeSentence(line) {
  return /[.!?]$/.test(line) || line.length > 70;
}

// Sterk signaal voor een ingrediënt: opsommingsteken, begint met een hoeveelheid of is kwalitatief
// ("zout naar smaak"), en is geen zin.
function readerIsIngredientLine(line) {
  const x = line.replace(READER_BULLET, '');
  if (!x || READER_STEP_NUMBER.test(line)) return false;
  // Een zin is bereiding ("Boter smelten in een pan."), behalve iets korts als "250 g boter.".
  if (/[.!?]$/.test(x) && !(READER_STARTS_WITH_QTY.test(x) && x.length <= 30)) return false;
  return READER_BULLET.test(line) || READER_STARTS_WITH_QTY.test(x) || READER_QUALITATIVE.test(x);
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

// Receptnaam opschonen: "1. Beurre blanc", "# Beurre blanc", "Recept: Beurre blanc".
function cleanBatchTitle(t) {
  return readerClean(t)
    .replace(/^#{1,3}\s*/, '')
    .replace(/^(?:recept|recipe)\s*[:#-]\s*/i, '')
    .replace(/^\d+\s*[.)-]\s*/, '')
    .replace(/^[-–•*]\s*/, '')
    .trim();
}

// Lijkt deze regel op een receptnaam? Kort, geen hoeveelheid, geen zin, geen kopje.
function readerLooksLikeTitle(line) {
  const x = readerClean(line);
  if (!x || x.length > 80 || x.length < 2) return false;
  if (readerIsHeading(x) || READER_META_LINE.test(x) || readerYieldFrom(x)) return false;
  if (/^#{1,3}\s+\S/.test(x)) return true;
  if (/[.!?;,:]$/.test(x)) return false;
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
        else ingredients.push(l.replace(READER_BULLET, ''));
      } else steps.push(readerCleanStep(l));
    }
  } else {
    // Zonder kopjes: alles tot en met het laatste duidelijke ingrediënt hoort bij de ingrediënten
    // (zinnen daartussen zijn een inleiding), alles daarna is bereiding.
    const kinds = rest.map(l => {
      if (!yieldText && readerYieldFrom(l)) return 'yield';
      if (READER_META_LINE.test(l)) return 'meta';
      if (readerIsIngredientLine(l)) return 'ingredient';
      if (READER_STEP_NUMBER.test(l) || readerLooksLikeSentence(l)) return 'step';
      return 'short';
    });
    let lastIngredient = -1;
    kinds.forEach((k, i) => {
      if (k === 'ingredient') lastIngredient = i;
    });
    // Korte regels direct na het laatste ingrediënt ("olijfolie", "zout") horen er nog bij.
    while (kinds[lastIngredient + 1] === 'short') lastIngredient++;
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
  const structured = hasIngredientsHeading || hasStepsHeading;
  const confidence = !ingredients.length ? 'low' : structured ? 'high' : allSteps.length ? 'medium' : 'low';
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
  let state = { ingredients: 0, steps: 0, inSteps: false };
  let blankBefore = false;
  const start = () => {
    if (current.length) blocks.push(current);
    current = [];
    state = { ingredients: 0, steps: 0, inSteps: false };
  };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l) {
      blankBefore = true;
      continue;
    }
    const next = nextFilled(i + 1).line;
    const hasContent = state.ingredients > 0 || state.steps > 0;
    const isDocHeading = /^#{1,3}\s+\S/.test(l) && !readerIsHeading(l.replace(/^#{1,3}\s+/, ''));
    const titleBeforeIngredients = readerLooksLikeTitle(l) && READER_INGREDIENTS_HEADING.test(next);
    const titleAfterMethod =
      blankBefore &&
      state.inSteps &&
      state.steps > 0 &&
      readerLooksLikeTitle(l) &&
      (readerIsIngredientLine(next) || readerYieldFrom(next) || READER_INGREDIENTS_HEADING.test(next));
    const repeatedIngredientsHeading = READER_INGREDIENTS_HEADING.test(l) && state.inSteps && state.steps > 0;
    // Zonder inhoud (bijv. receptnaam + ondertitel vóór "Ingrediënten") splitsen we niet: de eerste regel blijft de naam.
    if (current.length && (isDocHeading || titleAfterMethod || (titleBeforeIngredients && hasContent))) start();
    else if (repeatedIngredientsHeading) {
      start();
      current.push('Onbenoemd recept');
    }
    current.push(l);
    blankBefore = false;
    if (READER_INGREDIENTS_HEADING.test(l)) state.inSteps = false;
    else if (READER_STEPS_HEADING.test(l)) state.inSteps = true;
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
