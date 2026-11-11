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
// Ook in het Engels, Duits, Spaans en Frans: "serves 4", "for 10 covers", "für 6 Personen", "para 4 personas",
// "pour 8 couverts". Een getal is altijd nodig: "For the sauce" is geen opbrengst.
const READER_YIELD_LABEL =
  /^(?:opbrengst|yield|porties?|personen|couverts|aantal(?: personen| porties| stuks)?|serves|makes|recept (?:is )?voor|hoeveelheid|voor|for|ergibt|für|rendimiento|para|raciones|rendement|pour)\s*[:=-]?\s*(.+)$/i;
const READER_YIELD_PLAIN =
  /^\(?\s*(?:voor|for|serves|makes|für|para|pour)?\s*\d+(?:[.,-]\d+)?\s*(?:personen|persoon|pers\.?|porties?|couverts|covers|cover|people|persons|portions?|servings?|stuks|st\.?|pieces|personas|raciones|porciones|comensales|personnes|parts|liter|l|kg|gram|g)\s*\)?\.?$/i;
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
  /^\d+(?:[.,]\d+)?\s*(?:minuten|minuut|min\.?|uur|uren|seconden|sec\.?|dagen|dag|nachten|nacht|weken|graden)\b/i;
// Genummerde receptnaam zonder spatie, zoals koks die in een receptenboek zetten: "211.Aardappel crème",
// of zelfs zonder punt: "465Gado gado saus" (minstens twee cijfers en een hoofdletter erna).
const READER_NUMBERED_TITLE = /^(?:\d{1,4}\.(?=\p{L})|\d{2,4}(?=\p{Lu}\p{Ll}))/u;
// "Zachte" kop uit Word (vetgedrukt of kop 2/3): een receptnaam óf een onderdeel ("Deel 1", "Deeg").
// splitRecipeText beslist welke van de twee; daarna verdwijnt het teken.
const READER_SOFT_HEADING = /^#b\s+/;

// ---- Kleine hulpfuncties ----

function readerClean(line) {
  let x = String(line || '')
    .replace(/ /g, ' ')
    .replace(/\t+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  // Opmaak uit ChatGPT en andere markdown-tekst (2026-11-11): "**Ingredients**", "**Yield:** 40", "*(Source: …)*"
  // en een scheidingslijn "---". De tekst zelf blijft precies staan; alleen de opmaaktekens gaan weg.
  if (/^([-*_])(?:\s*\1){2,}$/.test(x)) return '';
  x = x.replace(/\*\*(?=\S)(.+?)(?<=\S)\*\*/g, '$1').replace(/__(?=\S)(.+?)(?<=\S)__/g, '$1');
  const italic = x.match(/^([*_])(?=\S)(.+?)(?<=\S)\1$/);
  if (italic) x = italic[2];
  return x.trim();
}

// Een notitie over de bron, geen ingrediënt of stap: "(Source: Omas Kochbuch)", "Bron: oma",
// "(No method provided.)", "(Summarised & standardised)". Gaat naar de beschrijving van het recept.
const READER_NOTE_LINE =
  /^\(?\s*(?:(?:source|bron|quelle|fuente|origine|from|uit)\s*:\s*\S.*|no (?:method|ingredients?|quantities)\b.*|summari[sz]ed\b.*|standardi[sz]ed\b.*|(?:already|these (?:come|recipes))\b.*)\)?\.?$/i;

function readerIsNote(line) {
  const x = readerClean(line);
  // Alleen een hele regel tussen haakjes, of een regel die met "Bron:" e.d. begint.
  return READER_NOTE_LINE.test(x) && (/^\(.*\)\.?$/.test(x) || /^(?:source|bron|quelle|fuente|origine)\s*:/i.test(x));
}

function readerNoteText(line) {
  return readerClean(line)
    .replace(/^\(\s*|\s*\)\.?$/g, '')
    .trim();
}

// Alle ingrediënten aan één stuk op één regel (uit een PDF of samenvatting):
// "400ml coconut cream 200g green curry paste 2.5kg chicken breast" of
// "Coconut cream – 400 ml Green curry paste – 200 g Chicken breast – 2.5 kg".
// Alleen splitsen als het overduidelijk is (minstens drie ingrediënten met elk een hoeveelheid); de woorden
// blijven precies zoals ze er staan, er komt niets bij en er gaat niets af.
function readerSplitRunOn(line) {
  const x = readerClean(line);
  // Streepjes tussen ingrediënten op één regel, zoals op een kladje: "-500gr tomaat - 500gr venkel - 2 uien".
  // Alleen als elk stuk met een hoeveelheid begint en een woord heeft; "1,2 - 1,5g agar" (een bereik) blijft heel.
  const byDash = x
    .replace(READER_BULLET, '')
    .split(/\s+[-–—•·]\s*(?=[\d½¼¾])/)
    .map(p => p.trim());
  if (byDash.length >= 2 && byDash.every(p => READER_STARTS_WITH_QTY.test(p) && /\p{L}{2}/u.test(p) && p.length <= 70))
    return byDash;
  if (x.length < 25 || /\p{L}[.!?]\s+\p{L}/u.test(x) || /[.!?]$/.test(x)) return [x];
  const qty = `${READER_QTY}\\s*(?:${READER_UNIT}\\b\\.?)?`;
  // Nooit splitsen binnen haakjes: "750 gram avocado (vruchtvlees van 20 stuks, 15 minuten gegaard)".
  let depth = 0;
  const masked = [...x]
    .map(ch => (ch === '(' ? (depth++, ch) : ch === ')' ? (depth--, ch) : depth > 0 ? '_' : ch))
    .join('');
  const cuts = [...masked.matchAll(new RegExp(`\\s+(?=${qty}\\s*[\\p{L}(])`, 'giu'))].map(m => m.index);
  const qtyFirst = [0, ...cuts]
    .map((from, i) => x.slice(from, i < cuts.length ? cuts[i] : x.length).trim())
    .filter(Boolean)
    // "Zest of" + "10 oranges": eindigt een stuk op een voorzetsel, dan hoort het volgende erbij.
    .reduce((out, p) => {
      if (out.length && /\b(?:of|van|von|de|du|des|der|met|with|mit|from|uit)$/i.test(out[out.length - 1]))
        out[out.length - 1] += ` ${p}`;
      else out.push(p);
      return out;
    }, []);
  if (
    READER_STARTS_WITH_QTY.test(x) &&
    qtyFirst.length >= 3 &&
    qtyFirst.every(
      p => READER_STARTS_WITH_QTY.test(p) && !READER_STARTS_WITH_TIME.test(p) && p.length <= 70 && /\p{L}{2}/u.test(p)
    )
  )
    return qtyFirst;
  // Knippen na "– 300 g" (eventueel met een opmerking tussen haakjes erachter) als er een hoofdletter volgt.
  // Nooit een eenheid aan het eind afknippen ("Oats – 300" + "g"): daarom geen eenheid direct na de knip, en
  // de hoofdletter wordt apart gecontroleerd (met de vlag i telt \p{Lu} ook kleine letters mee).
  const nameFirst = x
    .replace(
      new RegExp(`([–—]\\s*${qty}(?:\\s*\\([^()]*\\))?)\\s+(?!${READER_UNIT}\\b)(?=(\\p{L}))`, 'giu'),
      (m, head, next) => (/\p{Lu}/u.test(next) ? `${head}\n` : m)
    )
    .split('\n');
  // Elk stuk precies één streepje: anders hoort er iets bij dat de lezer niet zeker weet, en blijft de regel heel.
  if (
    nameFirst.length >= 3 &&
    nameFirst.every(
      p => /^\p{L}/u.test(p) && (p.match(/[–—]/g) || []).length === 1 && /[–—]\s*\S/.test(p) && p.length <= 70
    )
  )
    return nameFirst;
  return [x];
}

// Regels opschonen en een kopje met tekst erachter ("Bereiding: Meng alles.") in twee regels splitsen.
function readerLines(text) {
  return (Array.isArray(text) ? text : String(text || '').split(/\r?\n/)).map(readerClean).flatMap(l => {
    // Markdown-kop: "# Ingredients", "#### Method" of "## Yield: 4" is een gewoon kopje; een andere kop
    // ("#### Sauce") wordt een kop van hoogstens niveau 3 (receptnaam of onderdeel, zie splitRecipeText).
    const md = l.match(/^#{1,6}\s+(\S.*)$/);
    if (md) {
      const rest = readerClean(md[1]);
      if (readerIsHeading(rest) || READER_INLINE_HEADING.test(rest) || readerYieldFrom(rest)) l = rest;
      else if (/^#{4,6}\s/.test(l)) l = `### ${rest}`;
    }
    const m = l.match(READER_INLINE_HEADING);
    if (m) return [m[1], ...readerSplitRunOn(m[2].trim())];
    return readerSplitRunOn(l);
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
  /\b(?:(?:op|af|in|door|aan|bij|uit|terug|los|fijn|kort|koud)?(?:koken|draaien|mengen|zeven|bakken|braden|garen|roeren|kloppen|spatelen|snijden|schillen|smelten|verwarmen|oplossen|toevoegen|trekken|koelen|vriezen|ontdooien|vacumeren|vacümeren|frituren|cutteren|blenden|mixen|pureren|pocheren|stomen|roosteren|karamelliseren|monteren|binden|afbinden|afblussen|blussen|marineren|wellen|weken|zetten|spuiten|maken|strooien|bestrooien|smeren|insmeren|uitsmeren|steken|uitsteken|vullen|rollen|drogen|laten|brengen|halen|doen|gieten|storten|dresseren|serveren|bekleden|leggen|schrapen|spoelen|deppen|vouwen|wassen|schoonmaken|fruiten|raspen|hakken|snipperen|persen|wegen|verdelen|portioneren|bestrijken|oprollen|inpakken|uitrekken|opwarmen|afdekken)\b)/i;

// Sterk signaal voor een ingrediënt: opsommingsteken, begint met een hoeveelheid of is kwalitatief
// ("zout naar smaak"), en is geen zin.
function readerIsIngredientLine(line) {
  const x = line.replace(READER_BULLET, '');
  if (!x || READER_STEP_NUMBER.test(line) || READER_NUMBERED_TITLE.test(x)) return false;
  // "2 minuten doorkoken", "1 nacht marineren": een tijd is geen hoeveelheid.
  if (READER_STARTS_WITH_TIME.test(x)) return false;
  // "mosterdzaad, peperkorrel, koriander, laurier, kruidnagel, knoflook": een opsomming is één ingrediëntregel.
  if ((x.match(/,/g) || []).length >= 4 && !/[.!?]$/.test(x) && !READER_KITCHEN_VERB.test(x)) return true;
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
    READER_KITCHEN_VERB.test(line) ||
    READER_STARTS_WITH_TIME.test(line) ||
    /\d\s*(?:°|’|')?\s*c\b/i.test(line) ||
    /\b\d+\s*(?:minuten|min|uur|seconden|sec)\b/i.test(line)
  );
}

// Waarschijnlijk een stap zonder punt: een werkwoord vooraan en minstens drie woorden ("Mengen en koud zetten"),
// of een langere regel die op een werkwoord eindigt ("Werkbank bekleden met folie hierop zijde zalm leggen").
function readerLooksLikeStepLine(line) {
  const words = line.split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase().replace(/[^\p{L}]+$/u, '');
  return (
    readerIsSureStep(line) ||
    (readerLooksLikeStepStart(line) && words.length >= 3) ||
    (!READER_STARTS_WITH_QTY.test(line) &&
      !line.includes(',') &&
      words.length >= 5 &&
      last.length >= 5 &&
      /en$/.test(last))
  );
}

// In Word afgebroken zinnen weer aan elkaar: een stap die niet eindigt op een leesteken en eindigt op een
// komma of een verbindingswoord ("…garen op 54c voor" + "een half uur."), of waarvan de volgende regel met
// "en", "tot", … begint ("…met marinade" + "en 1 nacht marineren"). Een onderdeelkopje ("Deeg:") blijft los.
const READER_JOIN_END =
  /(?:,|\b(?:met|en|op|in|van|de|het|een|tot|voor|uit|om|te|aan|naar|bij|door|als|of|zodat|totdat|onder|over|zonder|tegen|tijdens))$/i;
const READER_JOIN_START = /^(?:en|of|tot|totdat|zodat|maar)\b/;
function readerJoinBrokenSteps(steps) {
  const out = [];
  for (const s of steps) {
    const prev = out[out.length - 1];
    const canJoin =
      prev &&
      !/[.!?;:]$/.test(prev) &&
      /^[\p{Ll}\d]/u.test(s) &&
      (READER_JOIN_END.test(prev) || READER_JOIN_START.test(s));
    if (canJoin) out[out.length - 1] = `${prev} ${s}`;
    else out.push(s);
  }
  return out;
}

// Onderdeel van een samengesteld recept ("147.Aardappelstrudel" met daaronder "Deeg" en "Vulling"); zie splitRecipeText.
const READER_PART_MARK = /^#part\s+/;

function readerYieldFrom(line) {
  if (READER_YIELD_PLAIN.test(line)) return line.replace(/^\(|\)\.?$/g, '').trim();
  const m = line.match(READER_YIELD_LABEL);
  if (m && /\d/.test(m[1]) && line.length <= 60) {
    // "Voor de saus" is geen opbrengst; "Voor 4 personen" wel. Zo ook "for", "für", "para" en "pour".
    if (/^(?:voor|for|für|para|pour)\b/i.test(line) && !/^(?:voor|for|für|para|pour)\s+\d/i.test(line)) return '';
    return /^(?:voor|for|für|para|pour)\s/i.test(line) ? line : m[1].trim();
  }
  return '';
}

// Nummer uit een receptenboek vóór de naam: "10.Asperges koken", "131. Witlof", "7) Saus", "12 - Jus",
// "465Gado gado saus". Niet: "12-uurs varkensbuik", "1.5 kg …", "3 kruiden" of "7Up".
const READER_TITLE_NUMBER = /^\d{1,4}\s*[.)]\s*(?=\D)|^\d{1,4}\s+[-–]\s+|^\d{2,4}(?=\p{Lu}\p{Ll})/u;

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
  // "# Ingredients" of "## Method" is een kopje binnen een recept, geen nieuw recept: daar nooit knippen.
  const md = x.match(/^#{1,6}\s+(\S.*)$/);
  if (md) {
    const rest = readerClean(md[1]);
    return !(readerIsHeading(rest) || READER_INLINE_HEADING.test(rest) || readerYieldFrom(rest));
  }
  if (/^(?:recept|recipe)\s*[:#-]/i.test(x)) return true;
  const next = readerClean(nextLine);
  return readerLooksLikeTitle(x) && (READER_INGREDIENTS_HEADING.test(next) || readerIsIngredientLine(next));
}

// ---- Eén recept uit een blok regels ----

// Opbrengst tussen haakjes achter de naam: "(voor 4 personen)", "(5 potten)", "(per zijde zalm 4/5)",
// "(1 recept = 50 kleine ringen)". Niet: "(vega versie)" of "(Boiron)" (geen getal).
function readerTitleYield(inside) {
  const x = readerClean(inside);
  if (readerYieldFrom(x)) return readerYieldFrom(x);
  if (x.length <= 40 && /\d/.test(x) && (/^\d/.test(x) || /^per\s/i.test(x) || /=/.test(x))) return x;
  return '';
}

// Samengesteld recept (onderdelen met "#part "): elk onderdeel apart lezen en samenvoegen, met de naam van het
// onderdeel als kopje boven de ingrediënten en boven de bereiding ("Deeg:", zoals bij "Deel 1:").
function parseCompositeBlock(lines) {
  const parts = [];
  let current = null;
  for (const l of lines.slice(1)) {
    if (READER_PART_MARK.test(l)) {
      current = { name: l.replace(READER_PART_MARK, '').replace(/:$/, '').trim(), lines: [] };
      parts.push(current);
    } else {
      if (!current) {
        current = { name: '', lines: [] };
        parts.push(current);
      }
      current.lines.push(l);
    }
  }
  const head = parseRecipeBlock([lines[0]]) || { title: cleanBatchTitle(lines[0]), yield: '' };
  const read = parts.map(p => ({ name: p.name, r: parseRecipeBlock([p.name || head.title, ...p.lines]) }));
  const ingredients = [];
  const steps = [];
  let yieldText = head.yield || '';
  const rank = { high: 2, medium: 1, low: 0 };
  let confidence = 'high';
  for (const { name, r } of read) {
    if (!r) continue;
    if (!yieldText && r.yield) yieldText = r.yield;
    if (r.ingredients.length) ingredients.push(...(name ? [`${name}:`] : []), ...r.ingredients);
    if (r.steps.length) steps.push(...(name ? [`${name}:`] : []), ...r.steps);
    // Een onderdeel zonder ingrediënten (alleen bereiding) maakt het geheel niet onzeker.
    const c = !r.ingredients.length && r.steps.length ? 'high' : r.readerConfidence;
    if (rank[c] < rank[confidence]) confidence = c;
  }
  return {
    title: head.title,
    ingredients,
    steps,
    yield: yieldText,
    readerConfidence: ingredients.length || steps.length ? confidence : 'low',
    source: lines.map(l => l.replace(READER_PART_MARK, '')).join('\n')
  };
}

function parseRecipeBlock(block) {
  const all = readerLines(block).filter(Boolean);
  if (!all.length) return null;
  if (all.some(l => READER_PART_MARK.test(l))) return parseCompositeBlock(all);
  // Notities over de bron ("(Source: …)", "(No method provided.)") zijn geen ingrediënt of stap.
  const notes = all.slice(1).filter(readerIsNote).map(readerNoteText);
  const lines = [all[0], ...all.slice(1).filter(l => !readerIsNote(l))];
  let title = cleanBatchTitle(lines[0]);
  let yieldText = '';
  // "Beurre blanc (voor 4 personen)", "Cacaosorbetijs (5 potten)": opbrengst tussen haakjes in de titel.
  const inTitle = title.match(/\s*\(([^)]*\d[^)]*)\)\s*$/);
  if (inTitle && readerTitleYield(inTitle[1])) {
    yieldText = readerTitleYield(inTitle[1]);
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
    // Staat er onder "Bereiding" uitsluitend ingrediënten ("Albufeira saus": kopje op de verkeerde plek), dan
    // horen ze bij de ingrediënten en heeft het recept geen bereiding. Dat is duidelijk, dus geen twijfel.
    if (headingsLookWrong && ingredientLikeSteps === steps.length) {
      ingredients.push(...steps.map(s => s.replace(READER_BULLET, '')));
      steps.length = 0;
      headingsLookWrong = false;
    }
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
      // "Wanneer ingekookt afmaken met" (of "Toevoegen:") gevolgd door nog meer ingrediënten: duidelijk.
      if (k === 'stepish') return readerIsSureStep(l) || (/(?:\bmet|:)$/i.test(l) && kinds[i + 1] === 'ingredient');
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
        // "papje maken met" + nieuwe ingrediënten: blijft een eigen regel, niet vastgeplakt aan de volgende stap.
        else intro.push(/\bmet$/i.test(l) && kinds[i + 1] === 'ingredient' ? `${l}:` : l);
      } else steps.push(readerCleanStep(l));
    });
  }

  // Inleiding en notities (bijv. "Oven: 180 °C") gaan voorop in de bereiding, zodat niets verloren gaat.
  // In Word afgebroken zinnen worden weer één stap.
  const allSteps = readerJoinBrokenSteps([...intro, ...steps].filter(Boolean));
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
    ...(notes.length ? { description: notes.join(' · ') } : {}),
    readerConfidence: confidence,
    source: all.join('\n')
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

// Keukenwoorden die in echte receptbestanden vaak verkeerd geschreven staan. Alleen hele woorden; de
// hoofdletter blijft zoals de kok hem schreef. Elke verbetering is zichtbaar in de controle (fixes).
const READER_KNOWN_MISSPELLINGS = {
  vinaigraitte: 'vinaigrette',
  vinaigrete: 'vinaigrette',
  vinaigraite: 'vinaigrette',
  mousee: 'mousse',
  mouse: 'mousse',
  patiserrie: 'patisserie',
  patisserrie: 'patisserie',
  patiserie: 'patisserie',
  bavorois: 'bavarois',
  baveroise: 'bavaroise',
  cremeaux: 'crémeux',
  tuille: 'tuile',
  tuilles: 'tuiles',
  duxcelle: 'duxelles',
  duxelle: 'duxelles',
  putanesca: 'puttanesca',
  rozeval: 'roseval',
  alceto: 'aceto',
  gastronorn: 'gastronorm',
  rawitt: 'rawit'
};
// Geen lookbehind (oudere Safari op iPhone kent die niet): het teken vóór het woord vangen we mee en zetten we terug.
const READER_MISSPELLING_WORD = new RegExp(
  `(^|[^\\p{L}])(${Object.keys(READER_KNOWN_MISSPELLINGS).join('|')})(?![\\p{L}])`,
  'giu'
);

function readerFixKnownMisspellings(text, fixes) {
  return text.replace(READER_MISSPELLING_WORD, (match, before, word) => {
    let to = READER_KNOWN_MISSPELLINGS[word.toLowerCase()];
    if (word === word.toUpperCase()) to = to.toUpperCase();
    else if (word[0] === word[0].toUpperCase()) to = to[0].toUpperCase() + to.slice(1);
    fixes.push({ from: word, to });
    return before + to;
  });
}

// words: false voor de bereiding. Daar staan veel werkwoorden die één letter van elkaar verschillen en
// allebei kloppen ("uitrekken" / "uitlekken", "opvangen" / "ophangen"); daar verbeteren we alleen getallen.
function readerFixText(text, vocab, fixes, words = true) {
  let out = readerFixKnownMisspellings(String(text || ''), fixes);
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

// ---- Rommelige ingrediëntregels (2026-11-03) ----
// Savour neemt een recept letterlijk over, maar ziet wel als een regel rommelig is: een hoeveelheid die nog niet
// is ingevuld ("…. gram wasabi poeder"), een getal tegen de naam ("5limoenblad"), een omrekening uit een Engels
// recept ("Of 100 grams of butter ="), of een stukje bereiding tussen de ingrediënten. De chef krijgt per regel een
// voorstel en kiest zelf; er verandert niets vanzelf. Geeft [{ line, to, why, action }], met action 'replace' (to
// is de nieuwe regel), 'step' (naar de bereiding) of 'remove'.
const READER_STEP_IN_LINE =
  /(^|\s)(mengen|meng|laten trekken|laat trekken|leggen|snijden|verwijderen|besmeren|verwarmen|inkoken|koken tot|doordraaien|pureren|afkoelen|opkloppen|bakken tot|roosteren tot|maak hiervan|maak van|aanmaken|spatelen|verwerken)($|\s|\.)/;

function readerLineChecks(ingredients) {
  const out = [];
  const seen = new Set();
  const add = check => {
    if (seen.has(check.line)) return;
    seen.add(check.line);
    out.push(check);
  };
  for (const raw of ingredients || []) {
    const line = String(raw || '').trim();
    // Kopjes ("Voor de saus:") en lege regels laten we met rust.
    if (!line || /:$/.test(line)) continue;
    const lower = line.toLowerCase();
    if (/^[a-zà-ÿ]{1,2}\.?$/i.test(line) && !/^(ei|ui)$/i.test(line)) {
      add({ line, to: '', why: 'Geen ingrediënt, waarschijnlijk een tikfout', action: 'remove' });
      continue;
    }
    if (/=\s*$/.test(line) || /^(of|or)\s/i.test(line)) {
      add({ line, to: '', why: 'Lijkt een omrekening of alternatief voor een andere regel', action: 'remove' });
      continue;
    }
    // Een opmerking tussen haakjes ("5 rawit peper (mee laten trekken)") maakt er geen bereidingsstap van.
    const plain = lower.replace(/\([^)]*\)?/g, ' ').trim();
    if (READER_STEP_IN_LINE.test(plain) && plain.split(/\s+/).length >= 4) {
      add({ line, to: line, why: 'Lijkt een stap van de bereiding', action: 'step' });
      continue;
    }
    let to = line;
    let why = '';
    if (/^[….·_]+/.test(to)) {
      // "…. gram wasabi poeder": de hoeveelheid is nooit ingevuld.
      to = to.replace(/^[….·_]+\s*(?:(?:gram|gr|g|ml|cl|dl|kg|stuks?)\s+)?/i, '');
      why = 'De hoeveelheid ontbreekt; vul die zelf in';
    } else if (/^\+-?\s*\S/.test(to)) {
      to = to.replace(/^\+-?\s*/, '');
      why = 'Teken vooraan weggehaald';
    } else if (/^x\s+[a-zà-ÿ]/i.test(to)) {
      to = to.replace(/^x\s+/i, '');
      why = 'Het aantal ontbreekt (x); vul dat zelf in';
    } else if (
      /^\d+(?:[.,]\d+)?[a-zà-ÿ]{3,}/i.test(to) &&
      !/^\d+(?:[.,]\d+)?(gram|gr|kg|ml|cl|dl|liter|st)\b/i.test(to)
    ) {
      // "5limoenblad" → "5 limoenblad"; "100gr suiker" is gewoon een hoeveelheid.
      to = to.replace(/^(\d+(?:[.,]\d+)?)/, '$1 ');
      why = 'Spatie tussen getal en naam';
    } else if (/^(\d+(?:[.,]\d+)?\s?)?(gram|kilo)(?=[a-zà-ÿ]{4,})/i.test(to)) {
      // "gramslagroom" → "gram slagroom".
      to = to.replace(/^(\d+(?:[.,]\d+)?\s?)?(gram|kilo)/i, '$1$2 ');
      why = 'Spatie tussen maat en naam';
    }
    if (why && to && to !== line) add({ line, to, why, action: 'replace' });
  }
  return out;
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
      // Genummerd recept met daaronder ongenummerde vette kopjes ("147.Aardappelstrudel", "Deeg", "Vulling"):
      // de kopjes zijn onderdelen van dat recept, geen losse recepten.
      if (
        current.length &&
        state.numberedTitle &&
        !READER_NUMBERED_TITLE.test(l) &&
        (current.length === 1 || state.composite)
      ) {
        current.push(`#part ${l}`);
        state.composite = true;
        blankBefore = false;
        continue;
      }
      const isPart = current.length && (state.openIngredients || (state.headings && !nextIsIngredients));
      if (isPart) {
        current.push(/:$/.test(l) ? l : `${l}:`);
        blankBefore = false;
        continue;
      }
      // Ook na een recept van alleen zinnen ("Aardpeer wassen en in stukken snijden…").
      if (current.length > 1 || (current.length && nextIsIngredients)) start();
      current.push(l);
      if (current.length === 1) state.numberedTitle = READER_NUMBERED_TITLE.test(l);
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
    // Koksnotities zonder kopjes: een naam met direct een hoeveelheid eronder start een nieuw recept, na een lege
    // regel of na een volle zin ("…stomen op 100 graden." + "Polenta ( per plaat)"). Een aanloop als "papje maken
    // met" of een regel die een stap is, hoort nog bij het huidige recept.
    const previous = current[current.length - 1] || '';
    const afterBreak = blankBefore || /[.!?]$/.test(previous) || previous.length > 70;
    const namesIngredients =
      readerIsIngredientLine(next) ||
      (blankBefore &&
        readerLooksLikeTitle(next) &&
        readerIsIngredientLine(nextFilled(nextFilled(i + 1).index + 1).line));
    const titleInNotes =
      current.length > 1 &&
      !state.headings &&
      state.ingredients > 0 &&
      afterBreak &&
      namesIngredients &&
      readerLooksLikeTitle(l) &&
      !readerLooksLikeStepLine(l) &&
      !/\b(?:met|en|of|van|in|op|aan|voor|tot|de|het|een)$/i.test(l);
    const repeatedIngredientsHeading = READER_INGREDIENTS_HEADING.test(l) && state.inSteps && state.steps > 0;
    // Vanaf nummer 10 ook als er direct bereiding volgt ("598.Roseval gepoft" + "Was de Roseval…"):
    // stappen zonder spatie na het nummer ("1.Snijd de ui") komen zelden zo ver.
    const numberedTitle =
      READER_NUMBERED_TITLE.test(l) &&
      readerLooksLikeTitle(l) &&
      (readerIsIngredientLine(next) || READER_INGREDIENTS_HEADING.test(next) || (hasContent && parseInt(l, 10) >= 10));
    // Zonder inhoud (bijv. receptnaam + ondertitel vóór "Ingrediënten") splitsen we niet: de eerste regel blijft de naam.
    if (
      current.length &&
      (isDocHeading || numberedTitle || titleAfterMethod || titleInNotes || (titleBeforeIngredients && hasContent))
    )
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

// ---- Een al gelezen recept opschonen (2026-11-11) ----
//
// Voor AI-resultaten en voor recepten die al in Savour staan: opmaakresten uit een import weghalen, zonder
// één woord of hoeveelheid te veranderen.
// 1. kopjes als "# Ingredients", "**Method**" of "Bereiding" tussen de regels: weg (Savour heeft eigen kopjes);
// 2. een andere markdown-kop ("# Saus") wordt een onderdeel ("Saus:"), zoals Savour dat zelf schrijft;
// 3. "(Source: …)", "(No method provided.)": naar de beschrijving;
// 4. alle ingrediënten aan één stuk op één regel: elk op een eigen regel (readerSplitRunOn);
// 5. opmaaktekens ("**", "*…*", "---") weg.
// Geeft { ingredients, steps, description, changed } terug; changed = aantal aangepaste regels.
function tidyRecipeLines(recipe) {
  const notes = [];
  let changed = 0;
  // Uit ChatGPT-opmaak (2026-11-11): bij ingrediënten staat alleen "# Ingredients", en de ingrediënten zelf
  // (aan één stuk) staan bij de bereiding vóór het kopje "# Method". Dan horen de regels vóór dat kopje bij
  // de ingrediënten. Alleen als er verder geen ingrediënt is en die regels geen zinnen zijn; geen woord anders.
  let ingredientsIn = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
  let stepsIn = Array.isArray(recipe?.steps) ? recipe.steps : [];
  const headingText = raw => {
    const x = readerClean(raw);
    const md = x.match(/^#{1,6}\s+(\S.*)$/);
    return readerClean(md ? md[1] : x).replace(/:$/, '');
  };
  const onlyLabels = ingredientsIn.every(l => {
    const x = readerClean(l);
    return !x || readerIsHeading(headingText(l)) || readerIsNote(x);
  });
  const methodAt = stepsIn.findIndex(l => READER_STEPS_HEADING.test(headingText(l)));
  if (
    onlyLabels &&
    methodAt > 0 &&
    stepsIn.slice(0, methodAt).every(l => {
      const x = readerClean(l);
      return x && !/[.!?]$/.test(x) && !/\p{L}[.!?]\s+\p{L}/u.test(x) && !readerIsHeading(headingText(l));
    })
  ) {
    ingredientsIn = [...ingredientsIn, ...stepsIn.slice(0, methodAt)];
    stepsIn = stepsIn.slice(methodAt);
    changed += methodAt;
  }
  const tidy = (list, isIngredients) => {
    const out = [];
    for (const raw of Array.isArray(list) ? list : []) {
      const line = String(raw ?? '');
      // Een opsommingsteken vooraan ("-130 olie", "• 2 eieren") hoort niet bij het ingrediënt of de stap.
      const x = readerClean(line).replace(READER_BULLET, '').trim();
      if (!x) {
        if (line.trim()) changed++;
        continue;
      }
      const md = x.match(/^#{1,6}\s+(\S.*)$/);
      const head = readerClean(md ? md[1] : x).replace(/:$/, '');
      if (readerIsHeading(head) && !/\d/.test(head)) {
        changed++;
        continue;
      }
      if (readerIsNote(x)) {
        notes.push(readerNoteText(x));
        changed++;
        continue;
      }
      if (md) {
        out.push(`${head}:`);
        changed++;
        continue;
      }
      const pieces = isIngredients ? readerSplitRunOn(x) : [x];
      // Alleen spaties anders ("400g          Sahne")? Dan de regel laten zoals hij is: dat is geen opschonen.
      if (pieces.length === 1 && pieces[0] === line.replace(/\s+/g, ' ').trim()) {
        out.push(line);
        continue;
      }
      changed++;
      out.push(...pieces);
    }
    return out;
  };
  const ingredients = tidy(ingredientsIn, true);
  const steps = tidy(stepsIn, false);
  const before = String(recipe?.description || '').trim();
  const extra = notes.filter(n => !before.includes(n));
  const description = [before, ...extra].filter(Boolean).join(' · ');
  return { ingredients, steps, description, changed };
}
