import { getUserFromRequest } from './_lib/auth.js';
import { rpc, hasServiceRole } from './_lib/supabase-admin.js';

// AI-imports per maand voor Savour Pro. Eén import = één bestand, foto of stuk van een lang document.
const AI_MONTHLY_LIMIT = 500;

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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log opnieuw in om recepten te importeren.' });
  // AI is onderdeel van Savour Pro: eerst controleren of deze gebruiker Pro is en nog AI-imports over heeft.
  if (!hasServiceRole())
    return res.status(503).json({ error: 'Savour Pro is op deze server nog niet ingesteld.', code: 'not_configured' });
  let allowance;
  try {
    allowance = await rpc('savour_ai_allowance', { _user: user.id, _limit: AI_MONTHLY_LIMIT });
  } catch (error) {
    console.error('Savour Pro-controle', error);
    return res.status(503).json({ error: 'Savour Pro is op deze server nog niet ingesteld.', code: 'not_configured' });
  }
  if (!allowance?.pro)
    return res.status(402).json({ error: 'AI-import is onderdeel van Savour Pro.', code: 'pro_required' });
  if (allowance.used >= allowance.limit)
    return res.status(403).json({
      error: `Je hebt deze maand alle ${allowance.limit} AI-imports gebruikt.`,
      code: 'limit_reached',
      usage: { used: allowance.used, limit: allowance.limit }
    });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY ontbreekt in Vercel Environment Variables.' });
  try {
    const { image, text, filename, categories, language } = req.body || {};
    // Taal van de chef in de app; geldt alleen als de AI twijfelt over de taal van de bron.
    const sourceLanguage = { en: 'Engels', de: 'Duits', es: 'Spaans' }[language] || 'Nederlands';
    const hasImage = typeof image === 'string' && image.startsWith('data:image/');
    const hasText = typeof text === 'string' && text.trim().length > 0;
    if (!hasImage && !hasText) return res.status(400).json({ error: 'Geen receptbron ontvangen.' });
    if (hasImage && image.length > 12_000_000)
      return res.status(413).json({ error: 'De foto is te groot. Gebruik een kleinere foto.' });
    if (hasText && text.length > 120_000)
      return res.status(413).json({ error: 'Het document bevat te veel tekst om in één keer te verwerken.' });

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

ABSOLUTE REGELS:
- Lees alleen wat daadwerkelijk in de bron staat. Verzin nooit ontbrekende hoeveelheden, ingrediënten, technieken, temperaturen, tijden, opbrengsten of stappen.
- TAAL: schrijf titel, ingrediënten, stappen en opbrengst in de taal van de bron en vertaal NOOIT, ook niet naar het Engels. Bepaal de taal aan de hand van de gewone woorden in de bron (bijvoorbeeld "eigeel", "suiker", "kloppen", "room" = Nederlands); losse Franse of Engelse vaktermen (zoals "pâte à bombe", "sponge") maken de bron niet Frans of Engels. Twijfel je over de taal, gebruik dan ${sourceLanguage}. Behoud de oorspronkelijke vaktermen, productnamen, merknamen en eenheden.
- Maak strikt onderscheid tussen titel, opbrengst, ingrediënten en bereidingsstappen.
- Een ingrediënt blijft een ingrediënt, ook als het bijvoorbeeld een vanillestokje, ei, boter of suiker is. Zet een ingrediënt nooit in steps.
- Een regel met een hoeveelheid hoort bij ingrediënten als het product zelf wordt genoemd. Bijvoorbeeld "1 vanillestokje" is een ingrediënt.
- Een bereidingshandeling hoort alleen bij steps als de bron daadwerkelijk een handeling beschrijft, zoals mengen, verwarmen, garen, koken, bakken, zeven of marineren.
- Als de bron géén bereidingswijze bevat, geef steps als een lege array. Maak nooit zelf een bereiding uit de laatste ingrediëntenregel(s).
- Een ingrediënt dat op een nieuwe regel staat blijft een ingrediënt; gebruik de volgorde van de bron.
- Behoud kwalitatieve hoeveelheden letterlijk, zoals 'naar smaak', 'scheutje', 'snuf', 'mespunt', 'naar behoefte' en 'eventueel'.
- Corrigeer alleen duidelijke OCR-/uitleesfouten wanneer de bedoelde tekst met hoge zekerheid uit de context blijkt. Bij twijfel: behoud de bron en zet needs_review op true.
- Lees onduidelijk handschrift met professionele keukenkennis: denk aan kruiden (zoals lavas, kervel, dragon), technieken en producten die in een recept voor de hand liggen. Verzin nooit een woord dat er niet staat.
- Zet in unclear elk stuk tekst dat je niet met zekerheid kunt lezen, precies zoals je het nu leest (bijvoorbeeld "zeven in liddes"), zodat de chef het kan controleren. Neem die tekst ook gewoon op in de ingrediënten of stappen. Laat unclear leeg als alles goed leesbaar is.
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
    if (hasImage) content.push({ type: 'input_image', image_url: image });

    const payload = {
      model: 'gpt-5.6-luna',
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
                    title: { type: 'string' },
                    yield: { type: 'string' },
                    ingredients: { type: 'array', items: { type: 'string' } },
                    steps: { type: 'array', items: { type: 'string' } },
                    category: { type: 'string' },
                    needs_review: { type: 'boolean' },
                    unclear: { type: 'array', items: { type: 'string' } },
                    incomplete: { type: 'boolean' }
                  },
                  required: [
                    'title',
                    'yield',
                    'ingredients',
                    'steps',
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

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'AI-import mislukt.' });
    const output = extractOutputText(data);
    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch {
      return res.status(502).json({ error: 'De AI gaf geen geldig receptresultaat terug.' });
    }
    // Pas tellen als de AI echt iets heeft opgeleverd.
    let used = allowance.used + 1;
    try {
      used = (await rpc('savour_record_ai_use', { _user: user.id, _limit: AI_MONTHLY_LIMIT })) ?? used;
    } catch (error) {
      console.error('AI-teller', error);
    }
    return res.status(200).json({ ...parsed, usage: { used, limit: allowance.limit } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || 'AI-import mislukt.' });
  }
}
