import { getUserFromRequest } from './_lib/auth.js';
import { rpc, hasServiceRole, insertReturning, select, update, remove } from './_lib/supabase-admin.js';

// Elk AI-resultaat meteen bewaren (tabel ai_import_results), nog vóór de browser het krijgt. Sluit de kok het
// venster of valt de verbinding weg, dan biedt Savour de recepten de volgende keer weer aan: wat ons geld
// kost, gaat nooit meer verloren (supabase/2026-11-11-import-nooit-kwijt.sql). Lukt bewaren niet, dan krijgt
// de kok het resultaat gewoon; we loggen het wel.
async function keepAiResult({ userId, uploadId, filename, kind, model, recipes }) {
  try {
    const validUpload = /^[0-9a-f-]{36}$/i.test(String(uploadId || '')) ? uploadId : null;
    const [row] = await insertReturning('ai_import_results', [
      {
        user_id: userId,
        upload_id: validUpload,
        filename: String(filename || '').slice(0, 400),
        kind,
        model: String(model || ''),
        recipes: Array.isArray(recipes) ? recipes : [],
        recipe_count: Array.isArray(recipes) ? recipes.length : 0
      }
    ]);
    return row?.id || null;
  } catch (error) {
    console.error('AI-resultaat bewaren mislukt', error);
    return null;
  }
}

// ---- Doorlopen als het scherm wegvalt ----
// De browser geeft elke aanvraag een vaste sleutel (request_key). Legt de kok zijn telefoon weg of gaat hij naar
// een andere app, dan breekt de verbinding soms af terwijl de server nog leest. Probeert de browser het daarna
// opnieuw met dezelfde sleutel, dan wacht de server op (of geeft hij) het resultaat van de eerste aanvraag:
// niet nog een keer betalen, niet nog een keer tellen.
const REQUEST_KEY = /^[A-Za-z0-9-]{8,80}$/;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function findResult(userId, key) {
  const rows = await select(
    'ai_import_results',
    `select=id,status,recipes,model,created_at&user_id=eq.${userId}&request_key=eq.${encodeURIComponent(key)}`
  );
  return rows?.[0] || null;
}

// Het resultaat van een eerdere aanvraag met dezelfde sleutel. null = er is (nog) niets; 'bezig' = die aanvraag
// loopt na lang wachten nog steeds; 'later' = te lang gewacht om nu nog zelf te lezen (tijdslimiet).
async function earlierResult(userId, key, maxMs = 200000) {
  const start = Date.now();
  let seenBusy = false;
  for (;;) {
    let row = null;
    try {
      row = await findResult(userId, key);
    } catch (error) {
      console.error('Eerdere AI-aanvraag zoeken', error);
      return null;
    }
    if (row?.status === 'klaar') return row;
    if (!row) return seenBusy && Date.now() - start > 60000 ? 'later' : null;
    seenBusy = true;
    if (Date.now() - start > maxMs) return 'bezig';
    await sleep(2000);
  }
}

// Een plek in ai_import_results vastleggen vóór het lezen. id = gelukt; null = een andere aanvraag met dezelfde
// sleutel was net eerder; undefined = bewaren lukt niet (dan lezen we gewoon en bewaren achteraf).
async function claimResult({ userId, key, uploadId, filename, kind }) {
  try {
    const [row] = await insertReturning('ai_import_results', [
      {
        user_id: userId,
        request_key: key,
        status: 'bezig',
        upload_id: /^[0-9a-f-]{36}$/i.test(String(uploadId || '')) ? uploadId : null,
        filename: String(filename || '').slice(0, 400),
        kind
      }
    ]);
    return row?.id || undefined;
  } catch (error) {
    if (/duplicate|unique|23505/i.test(error?.message || '')) return null;
    console.error('AI-aanvraag vastleggen mislukt', error);
    return undefined;
  }
}

async function finishResult(id, { model, recipes }) {
  try {
    const list = Array.isArray(recipes) ? recipes : [];
    await update('ai_import_results', `id=eq.${id}`, {
      status: 'klaar',
      model: String(model || ''),
      recipes: list,
      recipe_count: list.length
    });
    return true;
  } catch (error) {
    console.error('AI-resultaat afronden mislukt', error);
    return false;
  }
}

async function dropResult(id) {
  if (!id) return;
  try {
    await remove('ai_import_results', `id=eq.${id}&status=eq.bezig`);
  } catch (error) {
    console.error('AI-aanvraag opruimen mislukt', error);
  }
}

// AI-imports per maand voor Savour Pro. Eén import = één bestand, foto of stuk van een lang document.
const AI_MONTHLY_LIMIT = 150;

// De Responses API levert output_text alleen via de SDK; via REST lezen we de tekst uit output[].content[].
function extractOutputText(data) {
  if (typeof data?.output_text === 'string' && data.output_text) return data.output_text;
  const parts = [];
  for (const item of data?.output || []) {
    for (const part of item?.content || []) {
      if (part?.type === 'output_text' && typeof part.text === 'string') parts.push(part.text);
    }
  }
  return parts.join('');
}

// Vergelijkt twee losse lezingen van dezelfde foto. Een regel met dezelfde woorden maar andere getallen
// ("95 eigeel" tegenover "90 eigeel") komt bij unclear, met beide lezingen, zodat de chef kiest.
const numbersOf = line => (String(line).match(/\d+(?:[.,]\d+)?/g) || []).join(' ');
const wordsOf = line =>
  String(line)
    .toLowerCase()
    .replace(/\d+(?:[.,]\d+)?/g, '')
    .replace(/[^a-zà-ÿ]+/g, ' ')
    .trim();

export function crossCheckNumbers(a, b) {
  (a?.recipes || []).forEach((ra, i) => {
    const rb = (b?.recipes || [])[i];
    if (!rb) return;
    // Regels met dezelfde woorden (bijv. twee keer "suiker") koppelen we op volgorde.
    const otherByWords = new Map();
    for (const o of [...(rb.ingredients || []), ...(rb.steps || [])])
      otherByWords.set(wordsOf(o), [...(otherByWords.get(wordsOf(o)) || []), o]);
    const seen = new Map();
    const doubts = [];
    for (const line of [...(ra.ingredients || []), ...(ra.steps || [])]) {
      const key = wordsOf(line);
      const nth = seen.get(key) || 0;
      seen.set(key, nth + 1);
      const numbers = numbersOf(line);
      if (!numbers) continue;
      const match = (otherByWords.get(key) || [])[nth];
      if (match && numbersOf(match) !== numbers) doubts.push(`${line} (of: ${match})`);
    }
    if (doubts.length) {
      ra.unclear = [...new Set([...doubts, ...(ra.unclear || [])])];
      ra.needs_review = true;
    }
  });
}

// Controle of er bij het indelen niets is weggevallen. De AI schrijft eerst elke regel letterlijk over
// (transcription) en deelt die daarna in. Staat een echte regel (ingrediënt, stap, houdbaarheid, portie) daarna
// nergens meer in titel, opbrengst, ingrediënten, bereiding of notities, dan zet Savour het recept op
// "Controleren": de kok ziet het en kan in "Zo las de AI het" nakijken wat er stond. Kopjes, opmaak,
// paginanummers en bronvermeldingen mogen wegvallen. De inhoud zelf verandert nooit.
// Geeft per recept de weggevallen regels terug (voor de logs en de test: tests/ai-controle.test.mjs).
const lettersOf = line =>
  String(line ?? '')
    .toLowerCase()
    .replace(/[^\p{L}]+/gu, '');
const digitsOf = line => String(line ?? '').match(/\d+(?:[.,]\d+)?/g) || [];
const LOST_LINE_SKIP = [
  /^\s*#/, // markdown-kop ("# Afbeelding 2 — …")
  /:\s*$/, // kopje met dubbele punt ("Ingrediënten:")
  /^\s*\[.*\]\s*$/, // "[Notities]"
  /^\s*\(.*\)\s*\.?\s*$/, // hele regel tussen haakjes ("(No method provided.)", "(Bron: …)")
  /^\s*\(?\s*(?:source|bron|quelle|fuente|origine)\s*:/i,
  /^\s*(?:pagina|page|seite|página)\s*\d+(?:\s*(?:van|of|von|de|sur)\s*\d+)?\s*$/i,
  /^\s*[*_]*\s*(?:ingrediënten|ingredienten|ingredients?|ingrédients|ingredientes|zutaten|bereiding|bereidingswijze|werkwijze|method|methode|méthode|instructions|directions|preparation|préparation|preparación|zubereitung|notes?|notities)\s*[*_]*\s*$/i
];
const isSkippableLine = line => {
  const x = String(line ?? '').trim();
  if (lettersOf(x).length < 3) return true;
  if (LOST_LINE_SKIP.some(re => re.test(x))) return true;
  // Een kopje in hoofdletters zonder getal ("HOOFDGERECHT", "STARTERS").
  return !/\d/.test(x) && x === x.toUpperCase();
};

export function checkLostLines(parsed) {
  return (parsed?.recipes || []).map(r => {
    const fields = [
      r.title,
      r.yield,
      ...(r.ingredients || []),
      ...(r.steps || []),
      ...(r.notes || []),
      ...(r.unclear || [])
    ];
    const joined = fields.map(lettersOf).join('');
    const yieldDigits = digitsOf(r.yield);
    const lost = (r.transcription || []).filter(line => {
      if (isSkippableLine(line)) return false;
      if (joined.includes(lettersOf(line))) return false;
      // Opbrengst in eigen woorden ("Voor 12 personen" → yield "12 personen"): de getallen staan in yield.
      const digits = digitsOf(line);
      if (digits.length && yieldDigits.length && digits.every(d => yieldDigits.includes(d))) return false;
      return true;
    });
    if (lost.length) r.needs_review = true;
    return lost;
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log opnieuw in om recepten te importeren.' });
  // AI is onderdeel van Savour Pro: eerst controleren of deze gebruiker Pro is en nog AI-imports over heeft.
  if (!hasServiceRole())
    return res.status(503).json({ error: 'Savour Pro is op deze server nog niet ingesteld.', code: 'not_configured' });
  // Eigen maandgrens voor dit account, als de beheerder die gaf (supabase/2026-11-10-ai-grens-per-account.sql).
  // Bestaat de functie nog niet, dan de standaard.
  let monthlyLimit = AI_MONTHLY_LIMIT;
  try {
    const own = await rpc('savour_ai_monthly_limit', { _user: user.id, _default: AI_MONTHLY_LIMIT });
    if (Number.isInteger(own) && own >= 0) monthlyLimit = own;
  } catch (error) {
    // Nog geen eigen grenzen in de database: standaard gebruiken.
  }
  let allowance;
  try {
    allowance = await rpc('savour_ai_allowance', { _user: user.id, _limit: monthlyLimit });
  } catch (error) {
    console.error('Savour Pro-controle', error);
    return res.status(503).json({ error: 'Savour Pro is op deze server nog niet ingesteld.', code: 'not_configured' });
  }
  if (!allowance?.pro)
    return res.status(402).json({ error: 'AI-import is onderdeel van Savour Pro.', code: 'pro_required' });
  const requestKey =
    req.body?.mode !== 'orient' && REQUEST_KEY.test(String(req.body?.request_key || '')) ? req.body.request_key : null;
  const reusedResponse = row =>
    res.status(200).json({
      recipes: Array.isArray(row.recipes) ? row.recipes : [],
      model: row.model || '',
      result_id: row.id,
      reused: true,
      usage: { used: allowance.used, limit: allowance.limit, trial: !!allowance.trial }
    });
  // Opnieuw geprobeerd na een weggevallen verbinding? Dan het resultaat van de eerste keer (gratis, telt niet).
  if (requestKey) {
    const earlier = await earlierResult(user.id, requestKey);
    if (earlier === 'bezig' || earlier === 'later')
      return res.status(503).json({ error: 'Dit deel wordt nog gelezen. Savour probeert het zo opnieuw.' });
    if (earlier) return reusedResponse(earlier);
  }
  // In de proefweek geeft de database een grens van 15 in totaal (supabase/2026-11-09-ai-proef-15.sql).
  if (allowance.used >= allowance.limit)
    return res.status(403).json({
      error: allowance.trial
        ? `In de proefweek kun je ${allowance.limit} AI-imports doen. Met Savour Pro heb je er ${AI_MONTHLY_LIMIT} per maand; de Savour-lezer blijft gratis werken.`
        : `Je hebt deze maand alle ${allowance.limit} AI-imports gebruikt.`,
      code: 'limit_reached',
      usage: { used: allowance.used, limit: allowance.limit }
    });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY ontbreekt in Vercel Environment Variables.' });
  // Gereserveerde plek op de AI-teller (een getal), of null als er (nog) niet gereserveerd is.
  let reservation = null;
  // Heeft een lezing iets gekost (OpenAI gaf antwoord)? Dan geven we de plek op de teller nooit terug.
  let paid = false;
  // Rij in ai_import_results die deze aanvraag vastlegde (met request_key), of null.
  let resultId = null;
  const releaseReservation = async () => {
    if (reservation === null) return;
    reservation = null;
    try {
      await rpc('savour_release_ai_use', { _user: user.id });
    } catch (error) {
      console.error('AI-reservering teruggeven', error);
    }
  };
  try {
    const { image, text, filename, categories, language, upload_id: uploadId } = req.body || {};
    // Taal van de chef in de app; geldt alleen als de AI twijfelt over de taal van de bron.
    const sourceLanguage = { en: 'Engels', de: 'Duits', es: 'Spaans' }[language] || 'Nederlands';
    const hasImage = typeof image === 'string' && image.startsWith('data:image/');
    const hasText = typeof text === 'string' && text.trim().length > 0;
    if (!hasImage && !hasText) return res.status(400).json({ error: 'Geen receptbron ontvangen.' });
    if (hasImage && image.length > 12_000_000)
      return res.status(413).json({ error: 'De foto is te groot. Gebruik een kleinere foto.' });
    if (hasText && text.length > 120_000)
      return res.status(413).json({ error: 'Het document bevat te veel tekst om in één keer te verwerken.' });

    // Snelle eerste stap voor foto's: aan welke rand zit de bovenkant van de tekst? Savour zet de foto
    // daarmee rechtop vóór het echte lezen. Licht model, lage resolutie, telt niet als AI-import.
    if (req.body?.mode === 'orient') {
      if (!hasImage) return res.status(400).json({ error: 'Geen foto ontvangen.' });
      const orientResponse = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-5.6-luna',
          input: [
            {
              role: 'user',
              content: [
                {
                  type: 'input_text',
                  text: 'Op deze foto staat geschreven of gedrukte tekst. Kijk naar de letters: aan welke rand van de afbeelding zit de BOVENKANT van de letters? "top" als de tekst gewoon rechtop staat, "bottom" als hij ondersteboven staat, "left" als de bovenkant van de letters naar de linkerrand wijst (tekst loopt van onder naar boven), "right" als de bovenkant naar de rechterrand wijst (tekst loopt van boven naar onder).'
                },
                { type: 'input_image', image_url: image, detail: 'low' }
              ]
            }
          ],
          text: {
            format: {
              type: 'json_schema',
              name: 'orientation',
              strict: true,
              schema: {
                type: 'object',
                additionalProperties: false,
                properties: { top_edge: { type: 'string', enum: ['top', 'right', 'bottom', 'left'] } },
                required: ['top_edge']
              }
            }
          }
        })
      });
      const orientData = await orientResponse.json();
      if (!orientResponse.ok) return res.status(200).json({ top_edge: 'top' });
      try {
        return res.status(200).json({ top_edge: JSON.parse(extractOutputText(orientData)).top_edge || 'top' });
      } catch {
        return res.status(200).json({ top_edge: 'top' });
      }
    }

    // Eerst een plek reserveren, dan pas lezen: zo glippen imports die tegelijk binnenkomen (een stapel
    // bestanden) nooit langs de grens. Mislukt de lezing, dan geven we de plek terug (releaseReservation).
    // Bestaat de functie nog niet (SQL nog niet gedraaid), dan tellen we zoals vroeger pas achteraf.
    try {
      const reservedCount = await rpc('savour_reserve_ai_use', {
        _user: user.id,
        _limit: monthlyLimit
      });
      if (reservedCount === null)
        return res.status(403).json({
          error: allowance.trial
            ? `In de proefweek kun je ${allowance.limit} AI-imports doen. Met Savour Pro heb je er ${AI_MONTHLY_LIMIT} per maand; de Savour-lezer blijft gratis werken.`
            : `Je hebt deze maand alle ${allowance.limit} AI-imports gebruikt.`,
          code: 'limit_reached',
          usage: { used: allowance.limit, limit: allowance.limit }
        });
      reservation = reservedCount;
    } catch (error) {
      console.error('AI-reservering', error);
    }
    // Plek vastleggen in ai_import_results: zo vindt een herhaalde aanvraag dit resultaat terug.
    if (requestKey) {
      const claimed = await claimResult({
        userId: user.id,
        key: requestKey,
        uploadId,
        filename,
        kind: hasImage ? 'foto' : 'tekst'
      });
      if (claimed === null) {
        // Een andere aanvraag met dezelfde sleutel was net eerder: die leest al. Plek teruggeven en wachten.
        await releaseReservation();
        const earlier = await earlierResult(user.id, requestKey, 150000);
        if (earlier && typeof earlier === 'object') return reusedResponse(earlier);
        return res.status(503).json({ error: 'Dit deel wordt nog gelezen. Savour probeert het zo opnieuw.' });
      }
      resultId = claimed || null;
    }

    const categoryList = Array.isArray(categories)
      ? categories
          .map(String)
          .map(x => x.trim())
          .filter(Boolean)
      : [];
    const categoryInstruction = categoryList.length
      ? `\nBESCHIKBARE CATEGORIEËN VAN DE GEBRUIKER:\n${categoryList.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n- Kies per recept uitsluitend één categorie uit deze lijst wanneer de bron voldoende aanwijzingen geeft.\n- Gebruik de categorie Patisserie voor duidelijk patisserie-/dessert-/gebak-/chocolade-/ijs-/zoetwarenrecepten wanneer die categorie beschikbaar is. Let daarbij op titel, productnamen, ingrediënten én bereidingswijze.\n- Verzin nooit een nieuwe categorie.\n- Als geen categorie met voldoende zekerheid past, geef category als lege string.`
      : '\nEr zijn geen gebruikerscategorieën beschikbaar. Geef category als lege string.';

    const instruction = `Je bent de recept-structureringslaag van Savour, een professioneel receptplatform voor chefs.
Analyseer de bron zeer nauwkeurig en maak er één of meerdere controleerbare recepten van.

WERKWIJZE PER RECEPT (in deze volgorde):
1. transcription: schrijf eerst elke regel van dit recept letterlijk over zoals hij in de bron staat, regel voor regel, inclusief cijfers, afkortingen, pijlen (→) en accolades als tekst. Verbeter, vertaal of vul niets aan.
2. Maak daarna ingredients en steps uitsluitend uit die transcriptie. Elke ingrediëntregel komt uit precies één regel van de transcriptie: splits een regel nooit in meerdere ingrediënten en voeg nooit een product toe dat niet in de transcriptie staat. Enige uitzondering: staan er meerdere ingrediënten aan één stuk op één regel, elk met een eigen hoeveelheid (bijvoorbeeld "400ml coconut cream 200g curry paste 2.5kg chicken"), zet ze dan elk op een eigen regel, met precies dezelfde woorden.
3. notes: wat wel bij het recept hoort maar geen titel, opbrengst, ingrediënt of stap is (bijvoorbeeld houdbaarheid, bewaren, benodigd materiaal of gereedschap, portiegrootte per gerecht, een losse opmerking of aanvulling van de kok) neem je letterlijk op in notes, elk als eigen regel. Laat zulke regels nooit weg.
4. Controleer tot slot: elke regel van de transcriptie staat terug in title, yield, ingredients, steps of notes. Alleen kopjes, opmaak, paginanummers en bronvermeldingen mogen wegvallen.

ABSOLUTE REGELS:
- CIJFERS: neem elk getal precies over zoals het er staat. Twijfel je ook maar over één cijfer (bijvoorbeeld 5 of 6, 1 of 7, 3 of 8), zet dan de hele regel in unclear.
- WOORDEN: neem woorden letterlijk over; vervang ze niet door synoniemen ("geslagen room" blijft "geslagen room", "kloppen" blijft "kloppen"). Laat afkortingen staan zoals ze staan; "bl" bij gelatine betekent blaadjes.
- Lees alleen wat daadwerkelijk in de bron staat. Verzin nooit ontbrekende hoeveelheden, ingrediënten, technieken, temperaturen, tijden, opbrengsten of stappen.
- TAAL: schrijf titel, ingrediënten, stappen en opbrengst in de taal van de bron en vertaal NOOIT, ook niet naar het Engels. Bepaal de taal aan de hand van de gewone woorden in de bron (bijvoorbeeld "eigeel", "suiker", "kloppen", "room" = Nederlands); losse Franse of Engelse vaktermen (zoals "pâte à bombe", "sponge") maken de bron niet Frans of Engels. Twijfel je over de taal, gebruik dan ${sourceLanguage}. Behoud de oorspronkelijke vaktermen, productnamen, merknamen en eenheden.
- Maak strikt onderscheid tussen titel, opbrengst, ingrediënten en bereidingsstappen.
- Een opsommingsteken vooraan een regel (een streepje, punt of sterretje: "-130 olie", "• 2 eieren") hoort niet bij het ingrediënt of de stap: neem alleen "130 olie" over. Staan er meerdere ingrediënten met streepjes ertussen op één regel ("-500 g tomaat - 500 g venkel"), dan is elk een eigen ingrediënt.
- Opmaak en kopjes zijn geen inhoud: regels als "# Ingredients", "**Method**", "Bereiding" of "---" komen niet in ingredients of steps. Een bronvermelding ("(Source: …)", "Bron: …") of een opmerking als "(No method provided.)" is geen ingrediënt en geen stap: laat die weg.
- Een ingrediënt blijft een ingrediënt, ook als het bijvoorbeeld een vanillestokje, ei, boter of suiker is. Zet een ingrediënt nooit in steps.
- Een regel met een hoeveelheid hoort bij ingrediënten als het product zelf wordt genoemd. Bijvoorbeeld "1 vanillestokje" is een ingrediënt.
- Een bereidingshandeling hoort alleen bij steps als de bron daadwerkelijk een handeling beschrijft, zoals mengen, verwarmen, garen, koken, bakken, zeven of marineren.
- Als de bron géén bereidingswijze bevat, geef steps als een lege array. Maak nooit zelf een bereiding uit de laatste ingrediëntenregel(s).
- Een ingrediënt dat op een nieuwe regel staat blijft een ingrediënt; gebruik de volgorde van de bron.
- Behoud kwalitatieve hoeveelheden letterlijk, zoals 'naar smaak', 'scheutje', 'snuf', 'mespunt', 'naar behoefte' en 'eventueel'.
- Corrigeer alleen duidelijke OCR-/uitleesfouten wanneer de bedoelde tekst met hoge zekerheid uit de context blijkt. Bij twijfel: behoud de bron en zet needs_review op true.
- Lees onduidelijk handschrift met professionele keukenkennis: denk aan kruiden (zoals lavas, kervel, dragon), technieken en producten die in een recept voor de hand liggen. Verzin nooit een woord dat er niet staat.
- Zet in unclear elk stuk tekst dat je niet met zekerheid kunt lezen, precies zoals je het nu leest (bijvoorbeeld "zeven in liddes"), zodat de chef het kan controleren. Zet er géén gewone, goed leesbare woorden of vaktermen in (zoals "kloppen" of "pâte à bombe"): alleen echte twijfel. Neem die tekst ook gewoon op in de ingrediënten of stappen. Laat unclear leeg als alles goed leesbaar is.
- Is de bron getypte tekst (BRONTEKST, geen foto), dan is alles leesbaar: laat unclear leeg. Tikfouten, een vergeten spatie, een o in plaats van een 0, merknamen en vakjargon (zoals "proespuma", "rapsodie", "kidde") zijn geen twijfel; neem ze letterlijk over, Savour verbetert kleine tikfouten zelf en laat die aan de chef zien.
- Staan er bij de ingrediënten meerdere kolommen met hoeveelheden voor verschillende batchgroottes (bijvoorbeeld een basiskolom en een kolom onder "6x"), controleer dan of elke waarde in de extra kolom precies de basiswaarde maal dezelfde factor is. Zo ja: gebruik alleen de basiskolom en laat de extra kolom helemaal weg (Savour rekent zelf om); zet de factor niet in yield. Zo nee: behoud beide hoeveelheden letterlijk in de ingrediëntregel en zet needs_review op true.
- Een foto kan gedraaid zijn (op zijn kant of ondersteboven); lees de tekst in de juiste richting. Werkwijze kan ook in de kantlijn, naast accolades of met pijlen bij de ingrediënten staan: neem die op als stappen.
- Zet incomplete: true alleen als de tekst van dát recept zelf zichtbaar doorloopt buiten de bron: een regel die is afgesneden aan de rand van de foto of pagina, of een ingrediëntenlijst die halverwege ophoudt. Neem op wat leesbaar is. Twijfel je, zet dan incomplete: false en needs_review: true.
- Een recept is níet incomplete omdat er geen bereiding is, omdat het kort is, of omdat er daarna een nieuw kopje volgt. Een kopje zonder ingrediënten of stappen eronder is geen recept: neem het niet op.
- Verwijder geen inhoud omdat die ongebruikelijk lijkt.
- Splits meerdere recepten alleen als de bron daar duidelijke aanwijzingen voor geeft.
- Houd de volgorde van ingrediënten en stappen zoveel mogelijk aan.
- Voeg geen tips, eigen interpretaties, voedingsinformatie of extra uitleg toe.
- Als een onderdeel ontbreekt, geef een lege array terug.
- Zet needs_review op true als er twijfel, onleesbare tekst, vreemde OCR, een onvolledige passage of een mogelijk samengevoegde sectie is.
- Geef per ingrediënt bij voorkeur één regel met hoeveelheid + eenheid + ingrediënt, maar verander de inhoud niet.
- Gebruik bestandsnaam en recepttitel als context voor categorieherkenning, maar laat de daadwerkelijke receptinhoud zwaarder wegen.
${categoryInstruction}

De output wordt direct door Savour gebruikt voor controle vóór opslaan. Bronbestand: ${filename || 'receptbron'}.`;

    const content = [{ type: 'input_text', text: instruction }];
    if (hasText) content.push({ type: 'input_text', text: `\nBRONTEKST:\n${text}` });
    // Hoge resolutie: handschrift op een foto leest de AI dan veel beter.
    if (hasImage) content.push({ type: 'input_image', image_url: image, detail: 'high' });

    const payload = {
      input: [{ role: 'user', content }],
      text: {
        format: {
          type: 'json_schema',
          name: 'recipe_import',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              recipes: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    // Eerst letterlijk overschrijven, dan pas indelen: de AI leest dan veel trouwer.
                    transcription: { type: 'array', items: { type: 'string' } },
                    title: { type: 'string' },
                    yield: { type: 'string' },
                    ingredients: { type: 'array', items: { type: 'string' } },
                    steps: { type: 'array', items: { type: 'string' } },
                    notes: { type: 'array', items: { type: 'string' } },
                    category: { type: 'string' },
                    needs_review: { type: 'boolean' },
                    unclear: { type: 'array', items: { type: 'string' } },
                    incomplete: { type: 'boolean' }
                  },
                  required: [
                    'transcription',
                    'title',
                    'yield',
                    'ingredients',
                    'steps',
                    'notes',
                    'category',
                    'needs_review',
                    'unclear',
                    'incomplete'
                  ]
                }
              }
            },
            required: ['recipes']
          }
        }
      }
    };

    // Foto's en scans (handschrift, gedraaid, werkwijze in de kantlijn) naar het zwaardere model met meer
    // denktijd; tekst naar het lichte model. Is een model niet beschikbaar, dan het volgende proberen.
    const attempts = hasImage
      ? [{ model: 'gpt-5.6-terra', reasoning: { effort: 'medium' } }, { model: 'gpt-5.6-luna' }]
      : [{ model: 'gpt-5.6-luna' }];
    // De controlelezing (alleen om getallen te vergelijken) gaat naar het lichte model zonder extra denktijd:
    // dat kost een fractie, en de hoofdlezing blijft het zware model. Leest het lichte model een getal anders,
    // dan komt die regel bij "niet goed leesbaar" en kiest de chef; er wordt nooit iets stil overgenomen.
    const checkAttempts = [{ model: 'gpt-5.6-luna' }];
    const readOnce = async (list = attempts, role = 'lezing') => {
      let response;
      let data;
      for (const attempt of list) {
        response = await fetch('https://api.openai.com/v1/responses', {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...attempt, ...payload })
        });
        data = await response.json();
        const modelProblem =
          !response.ok && /model|reasoning/i.test(data?.error?.message || '') && response.status === 400;
        const unavailable = !response.ok && (response.status === 404 || modelProblem);
        if (!unavailable) break;
        console.warn('AI-model niet beschikbaar, volgende proberen:', attempt.model, data?.error?.message);
      }
      if (!response.ok) return { status: response.status, error: data?.error?.message || 'AI-import mislukt.' };
      // Vanaf hier heeft OpenAI gerekend: deze lezing kost geld en telt dus altijd als AI-import.
      paid = true;
      // Verbruik per aanroep in de Vercel-logs, om de echte kosten per import te kunnen volgen.
      const u = data?.usage || {};
      console.log(
        `AI-verbruik ${role}: ${data?.model || ''} in=${u.input_tokens ?? '?'} uit=${u.output_tokens ?? '?'} denk=${u.output_tokens_details?.reasoning_tokens ?? 0}`
      );
      try {
        return { parsed: JSON.parse(extractOutputText(data)), model: data?.model || '' };
      } catch {
        return { status: 502, error: 'De AI gaf geen geldig receptresultaat terug.' };
      }
    };

    // Foto's worden twee keer los van elkaar gelezen (tegelijk). Lezen ze een getal verschillend, dan komt
    // die regel bij "niet goed leesbaar": zo vangen we leesfouten die de AI zelf niet opmerkt.
    const [first, second] = await Promise.all(
      hasImage ? [readOnce(attempts, 'hoofd'), readOnce(checkAttempts, 'controle')] : [readOnce(attempts, 'tekst')]
    );
    // De kwaliteit gaat voor: mislukt de hoofdlezing, dan leest het zware model nog een keer (de lichte
    // controlelezing neemt nooit de plaats van het recept in).
    let main = first;
    if (!first.parsed && hasImage) main = await readOnce(attempts, 'hoofd opnieuw');
    if (!main.parsed) {
      // Alleen teruggeven als OpenAI niets heeft gerekend (bijv. storing of te druk). Gaf de AI wel antwoord
      // maar was het onbruikbaar, dan heeft het geld gekost en blijft het geteld.
      if (!paid) await releaseReservation();
      else reservation = null;
      await dropResult(resultId);
      return res.status(main.status || 500).json({ error: main.error });
    }
    const parsed = main.parsed;
    // Tekst wordt één keer gelezen; bij een foto vergelijkt de controlelezing de getallen.
    const check = hasImage ? second : null;
    if (check?.parsed) crossCheckNumbers(parsed, check.parsed);
    // Niets mag stil wegvallen tussen overschrijven en indelen: anders "Controleren" (zie checkLostLines).
    const lostLines = checkLostLines(parsed);
    const lostCount = lostLines.reduce((n, l) => n + l.length, 0);
    if (lostCount) console.log(`AI-controle: ${lostCount} regel(s) niet ingedeeld, recept(en) op controleren`);
    // Pas tellen als de AI echt iets heeft opgeleverd.
    // Al gereserveerd? Dan staat hij al op de teller; anders (oude manier) nu pas tellen.
    let used = reservation ?? allowance.used + 1;
    if (reservation === null) {
      try {
        used =
          (await rpc('savour_record_ai_use', { _user: user.id, _limit: allowance.limit || AI_MONTHLY_LIMIT })) ?? used;
      } catch (error) {
        console.error('AI-teller', error);
      }
    }
    reservation = null;
    // Bewaren vóór de browser het krijgt: valt de verbinding nu weg, dan is het resultaat er toch.
    if (!resultId || !(await finishResult(resultId, { model: main.model, recipes: parsed?.recipes })))
      resultId =
        (await keepAiResult({
          userId: user.id,
          uploadId,
          filename,
          kind: hasImage ? 'foto' : 'tekst',
          model: main.model,
          recipes: parsed?.recipes
        })) || resultId;
    // Het gebruikte model gaat mee, zodat de chef (en wij) zien waarmee de foto is gelezen.
    return res.status(200).json({
      ...parsed,
      model: main.model,
      result_id: resultId,
      usage: { used, limit: allowance.limit, trial: !!allowance.trial }
    });
  } catch (error) {
    console.error(error);
    // Een fout nadat OpenAI al rekende: telt mee (het kostte geld). Anders de plek teruggeven.
    if (paid) reservation = null;
    await releaseReservation();
    await dropResult(resultId);
    return res.status(500).json({ error: error?.message || 'AI-import mislukt.' });
  }
}
