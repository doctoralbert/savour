export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY ontbreekt in Vercel Environment Variables.' });
  try {
    const { image, filename } = req.body || {};
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Geen geldige receptfoto ontvangen.' });
    }
    if (image.length > 12_000_000) return res.status(413).json({ error: 'De foto is te groot. Gebruik een kleinere foto.' });

    const payload = {
      model: 'gpt-5.6-luna',
      input: [{
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: `Je bent de recept-structureringslaag van Savour, een platform voor professionele chefs. Analyseer deze foto zeer nauwkeurig en maak er één of meerdere controleerbare recepten van.

REGELS:
- Lees alleen wat daadwerkelijk op de foto staat; verzin nooit ontbrekende hoeveelheden, ingrediënten, technieken of stappen.
- Behoud de oorspronkelijke Nederlandse vaktermen en eenheden.
- Herken titel, opbrengst, ingrediënten en bereidingsstappen afzonderlijk.
- Behoud kwalitatieve hoeveelheden letterlijk, zoals 'naar smaak', 'scheutje', 'snuf', 'mespunt', 'naar behoefte' en 'eventueel'; schaal deze later niet automatisch.
- Als tekst niet betrouwbaar leesbaar is, gebruik [onleesbaar] en zet de gebruiker aan tot controle.
- Zet elk ingrediënt op één duidelijke regel met hoeveelheid + eenheid + ingrediënt wanneer die informatie beschikbaar is.
- Houd de volgorde van ingrediënten en stappen uit de bron aan, tenzij de bron duidelijk een andere structuur aangeeft.
- Splits meerdere recepten alleen wanneer de foto dat duidelijk ondersteunt.
- Voeg geen tips, eigen interpretaties of extra informatie toe.

De output wordt direct in de Savour-editor gezet en moet daarom strak, controleerbaar en professioneel zijn. Foto-bestand: ${filename || 'receptfoto'}.`
          },
          { type: 'input_image', image_url: image }
        ]
      }],
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
                    steps: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['title', 'yield', 'ingredients', 'steps']
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

    const text = data.output_text || '';
    let parsed;
    try { parsed = JSON.parse(text); } catch { return res.status(502).json({ error: 'De AI gaf geen geldig receptresultaat terug.' }); }
    return res.status(200).json(parsed);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || 'AI-import mislukt.' });
  }
}
