// Test van de controle op het AI-resultaat (api/ai-import.js, checkLostLines), zonder OpenAI.
// Draaien: node tests/ai-controle.test.mjs
// De AI schrijft eerst elke regel letterlijk over (transcription) en deelt die daarna in. Valt er bij het
// indelen een echte regel weg (een ingrediënt, een stap, de houdbaarheid), dan moet de kok dat zien:
// het recept krijgt "Controleren". Kopjes, opmaak, paginanummers en bronvermeldingen mogen wegvallen.
// Alle tekst hieronder is verzonnen.
import { checkLostLines } from '../api/ai-import.js';

const recipe = r => ({
  transcription: [],
  title: '',
  yield: '',
  ingredients: [],
  steps: [],
  notes: [],
  needs_review: false,
  unclear: [],
  incomplete: false,
  ...r
});

const cases = [
  {
    name: 'Ingrediënt en stappen weggevallen: controleren',
    recipe: recipe({
      transcription: [
        'Pompoensoep',
        'HOOFDGERECHT',
        '500 g pompoen',
        '1 l bouillon',
        'Koken',
        'Pureren',
        'Wassen en snijden'
      ],
      title: 'Pompoensoep',
      ingredients: ['500 g pompoen'],
      steps: ['Koken', 'Pureren']
    }),
    review: true,
    lost: ['1 l bouillon', 'Wassen en snijden']
  },
  {
    name: 'Portienotitie weggevallen: controleren',
    recipe: recipe({
      transcription: ['Kalfszwezerik', 'Pekelen', 'Voorgerecht 60 - 70g', 'Garen op 64 C'],
      title: 'Kalfszwezerik',
      steps: ['Pekelen', 'Garen op 64 C']
    }),
    review: true,
    lost: ['Voorgerecht 60 - 70g']
  },
  {
    name: 'Houdbaarheid in notes: niets kwijt',
    recipe: recipe({
      transcription: [
        'Bonbon met hazelnoot',
        '200 g pure chocolade',
        '100 g room',
        'Houdbaarheid: 3–4 weken bij 14–16 °C'
      ],
      title: 'Bonbon met hazelnoot',
      ingredients: ['200 g pure chocolade', '100 g room'],
      notes: ['Houdbaarheid: 3–4 weken bij 14–16 °C']
    }),
    review: false,
    lost: []
  },
  {
    name: 'Kopjes, opmaak, bron en paginanummer mogen weg',
    recipe: recipe({
      transcription: [
        '# Afbeelding 2 — Appeltaart',
        'Appeltaart',
        'Ingrediënten:',
        '**Ingredients**',
        'NAGERECHTEN',
        '[Notities]',
        '- 1 kg appels',
        '200 g suiker',
        'Bereiding',
        'Method',
        '1) Alles mengen en 50 minuten bakken',
        'op 180 °C',
        '(Bron: Oma’s schrift)',
        '(No method provided.)',
        'Pagina 3 van 12',
        '---'
      ],
      title: 'Appeltaart',
      ingredients: ['1 kg appels', '200 g suiker'],
      steps: ['1) Alles mengen en 50 minuten bakken op 180 °C']
    }),
    review: false,
    lost: []
  },
  {
    name: 'Ingrediënten aan één stuk op één regel, door de AI gesplitst: niets kwijt',
    recipe: recipe({
      transcription: ['Paddenstoelenbouillon', '1kg oesterzwam500g kombu1.5L water', '10g tijm5g sinaasappelschil'],
      title: 'Paddenstoelenbouillon',
      ingredients: ['1kg oesterzwam', '500g kombu', '1.5L water', '10g tijm', '5g sinaasappelschil']
    }),
    review: false,
    lost: []
  },
  {
    name: 'Opbrengst met eigen woorden in yield: niets kwijt',
    recipe: recipe({
      transcription: ['Kruidenolie', 'Voor 12 personen', 'Makes: 40', '100 g peterselie'],
      title: 'Kruidenolie',
      yield: '12 personen · 40',
      ingredients: ['100 g peterselie']
    }),
    review: false,
    lost: []
  },
  {
    name: 'Al controleren: blijft controleren',
    recipe: recipe({
      transcription: ['Saus', '2 sjalotten', 'Fijnsnijden'],
      title: 'Saus',
      ingredients: ['2 sjalotten'],
      needs_review: true
    }),
    review: true,
    lost: ['Fijnsnijden']
  }
];

let failed = 0;
for (const c of cases) {
  const parsed = { recipes: [JSON.parse(JSON.stringify(c.recipe))] };
  const lost = checkLostLines(parsed)[0] || [];
  const got = parsed.recipes[0];
  // De controle verandert nooit iets aan de inhoud: alleen needs_review.
  const sameContent =
    JSON.stringify({ ...got, needs_review: null }) === JSON.stringify({ ...c.recipe, needs_review: null });
  const ok = got.needs_review === c.review && JSON.stringify(lost) === JSON.stringify(c.lost) && sameContent;
  if (!ok) {
    failed++;
    console.log(
      `✗ ${c.name}\n   needs_review=${got.needs_review}, kwijt=${JSON.stringify(lost)}, inhoud gelijk=${sameContent}`
    );
  } else console.log(`✓ ${c.name}`);
}
console.log(`\n${cases.length - failed} van ${cases.length} geslaagd`);
process.exit(failed ? 1 : 0);
