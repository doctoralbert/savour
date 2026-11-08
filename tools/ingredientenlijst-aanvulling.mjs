// Aanvulling op de Savour-lijst (2026-11-08): veelgebruikte keukeningrediënten die in het Engels, Duits, Spaans of
// Frans (en soms Nederlands) nog ontbraken, gevonden met de echte demorecepten (js/data/demo-recipes.js).
// De allergenen zijn overgenomen van het basisingrediënt dat al in de lijst stond (wijn, tomaat, boter, amandel,
// pure chocolade, ...). Uitzondering: dijonmosterd krijgt naast mosterd ook sulfiet, omdat dijonmosterd meestal
// kaliummetabisulfiet (E224) bevat; per merk nakijken blijft nodig.
// Maakt supabase/2026-11-08-ingredientenlijst-aanvulling.sql. Bestaat een naam al in die taal (ook afgewezen), dan
// blijft die staan (on conflict do nothing).
// Gebruik: node tools/ingredientenlijst-aanvulling.mjs

import fs from 'node:fs';

const WINE = ['sulfiet', 'alcohol', 'histamine'];
const BUTTER = ['melk', 'lactose', 'fodmap'];
// [allergenen, { taal: [naam, ...andere schrijfwijzen] }]
const ITEMS = [
  [WINE, { nl: ['Rode wijn'], en: ['Red wine'], de: ['Rotwein'], es: ['Vino tinto'], fr: ['Vin rouge'] }],
  [
    WINE,
    {
      nl: ['Witte wijn', 'droge witte wijn'],
      en: ['White wine', 'dry white wine'],
      de: ['Weißwein', 'trockener weißwein'],
      es: ['Vino blanco', 'vino blanco seco'],
      fr: ['Vin blanc', 'vin blanc sec']
    }
  ],
  [
    WINE,
    {
      nl: ['Rode port'],
      en: ['Port', 'ruby port', 'tawny port'],
      de: ['Portwein', 'roter portwein'],
      es: ['Oporto', 'oporto tinto'],
      fr: ['Porto', 'porto rouge']
    }
  ],
  [
    ['nachtschade', 'histamine'],
    {
      nl: ['Tomatenpuree'],
      en: ['Tomato paste', 'tomato purée', 'tomato puree'],
      de: ['Tomatenmark'],
      es: ['Concentrado de tomate', 'tomate concentrado'],
      fr: ['Concentré de tomate', 'concentré de tomates']
    }
  ],
  [
    ['nachtschade', 'histamine'],
    {
      en: ['Vine tomatoes', 'vine tomato'],
      de: ['Strauchtomaten', 'strauchtomate'],
      es: ['Tomates maduros'],
      fr: ['Tomates grappe', 'tomate grappe', 'tomates grappe bien mûres']
    }
  ],
  [
    ['rundvlees'],
    { nl: ['Kalfsbotten'], en: ['Veal bones'], de: ['Kalbsknochen'], es: ['Huesos de ternera'], fr: ['Os de veau'] }
  ],
  [
    ['gevogelte'],
    {
      nl: ['Eendenkarkassen', 'eendenkarkas'],
      en: ['Duck carcasses', 'duck carcass'],
      de: ['Entenkarkassen', 'entenkarkasse'],
      es: ['Carcasas de pato', 'carcasa de pato'],
      fr: ['Carcasses de canard', 'carcasse de canard']
    }
  ],
  [
    ['schaaldieren'],
    {
      nl: ['Garnalenkoppen', 'garnalenkoppen en -schalen', 'garnalenschalen'],
      en: ['Prawn heads', 'prawn heads and shells', 'prawn shells', 'shrimp shells'],
      de: ['Garnelenköpfe', 'garnelenköpfe und -schalen', 'garnelenschalen'],
      es: ['Cabezas de gamba', 'cabezas y cáscaras de gamba', 'cáscaras de gamba'],
      fr: ['Têtes de crevettes', 'têtes et carapaces de crevettes', 'carapaces de crevettes']
    }
  ],
  [
    ['vis'],
    {
      nl: ['Visfond', 'visbouillon'],
      en: ['Fish stock', 'fish fumet'],
      de: ['Fischfond'],
      es: ['Fumet de pescado', 'caldo de pescado'],
      fr: ['Fumet de poisson', 'fond de poisson']
    }
  ],
  [
    [],
    {
      en: ['Peppercorns', 'black peppercorns'],
      de: ['Pfefferkörner'],
      es: ['Granos de pimienta', 'pimienta en grano'],
      fr: ['Grains de poivre', 'poivre en grains']
    }
  ],
  [
    [],
    {
      nl: ['Venkelknol'],
      en: ['Fennel bulb', 'fennel'],
      de: ['Fenchelknolle', 'fenchel'],
      es: ['Bulbo de hinojo', 'hinojo'],
      fr: ['Bulbe de fenouil', 'fenouil']
    }
  ],
  [
    ['selderij'],
    {
      nl: ['Stengel bleekselderij', 'stengels bleekselderij'],
      en: ['Celery stick', 'celery sticks', 'celery stalk'],
      de: ['Staudensellerie', 'stange staudensellerie', 'stangen staudensellerie'],
      es: ['Rama de apio', 'ramas de apio', 'apio'],
      fr: ['Branche de céleri', 'branches de céleri', 'céleri branche']
    }
  ],
  [
    ['mosterd', 'sulfiet'],
    {
      nl: ['Dijonmosterd', 'dijon mosterd'],
      en: ['Dijon mustard'],
      de: ['Dijon-Senf', 'dijonsenf'],
      es: ['Mostaza de Dijon'],
      fr: ['Moutarde de Dijon']
    }
  ],
  [[], { de: ['Muskatnuss'], es: ['Nuez moscada'], fr: ['Noix de muscade', 'muscade'] }],
  [[], { de: ['Gurke', 'salatgurke'] }],
  [
    ['ui', 'knoflook', 'fodmap'],
    {
      // Nederlands niet nodig: "teen knoflook" leest Savour al als knoflook.
      en: ['Garlic clove', 'garlic cloves', 'clove garlic', 'cloves garlic'],
      de: ['Knoblauchzehe', 'knoblauchzehen'],
      es: ['Diente de ajo', 'dientes de ajo'],
      fr: ["Gousse d'ail", "gousses d'ail"]
    }
  ],
  [
    ['gluten', 'fodmap'],
    {
      nl: ['Wit brood', 'oud wit brood', 'oud brood'],
      en: ['White bread', 'stale white bread', 'stale bread'],
      de: ['Weißbrot', 'altbackenes weißbrot'],
      es: ['Pan blanco', 'pan blanco del día anterior', 'pan duro'],
      fr: ['Pain blanc', 'pain blanc rassis', 'pain rassis']
    }
  ],
  [
    [],
    {
      en: ['Vanilla pod', 'vanilla bean'],
      de: ['Vanilleschote'],
      es: ['Vaina de vainilla'],
      fr: ['Gousse de vanille']
    }
  ],
  [
    [],
    {
      nl: ['Glucosestroop'],
      en: ['Glucose syrup'],
      de: ['Glukosesirup', 'glucosesirup'],
      es: ['Jarabe de glucosa'],
      fr: ['Sirop de glucose', 'glucose']
    }
  ],
  [
    ['soja', 'fodmap'],
    {
      en: ['Dark chocolate'],
      de: ['Zartbitterschokolade', 'bitterschokolade'],
      es: ['Chocolate negro'],
      fr: ['Chocolat noir']
    }
  ],
  [[], { es: ['Azúcar glas', 'azúcar glass'] }],
  [
    ['noten', 'histamine'],
    {
      nl: ['Amandelmeel', 'gemalen amandelen'],
      en: ['Ground almonds', 'almond flour'],
      de: ['Gemahlene Mandeln', 'mandelmehl'],
      es: ['Almendra molida', 'harina de almendra'],
      fr: ["Poudre d'amande", "poudre d'amandes"]
    }
  ],
  [
    ['gluten', 'fodmap'],
    {
      en: ['Plain flour', 'strong flour', 'bread flour', 'all-purpose flour'],
      de: ['Weizenmehl'],
      es: ['Harina de fuerza', 'harina de trigo'],
      fr: ['Farine de blé']
    }
  ],
  [
    [],
    {
      nl: ['Verse gist'],
      en: ['Fresh yeast'],
      de: ['Frische Hefe'],
      es: ['Levadura fresca', 'levadura'],
      fr: ['Levure fraîche', 'levure de boulanger']
    }
  ],
  [BUTTER.slice(), { es: ['Suero de mantequilla'], fr: ['Lait ribot', 'babeurre'] }],
  [
    ['fructose', 'fodmap'],
    {
      nl: ['Stoofpeer', 'stoofperen'],
      en: ['Cooking pear', 'cooking pears'],
      de: ['Kochbirne', 'kochbirnen'],
      es: ['Pera de cocción', 'peras de cocción'],
      fr: ['Poire à cuire', 'poires à cuire']
    }
  ],
  [
    [],
    {
      nl: ['Kaneelstokje', 'kaneelstokjes'],
      en: ['Cinnamon stick', 'cinnamon sticks'],
      de: ['Zimtstange', 'zimtstangen'],
      es: ['Rama de canela', 'ramas de canela'],
      fr: ['Bâton de cannelle', 'bâtons de cannelle']
    }
  ],
  [[], { es: ['Anís estrellado', 'anises estrellados'], fr: ['Badiane', 'anis étoilé', 'étoiles de badiane'] }],
  [
    [],
    {
      en: ['Thyme sprig', 'thyme sprigs', 'sprigs thyme'],
      de: ['Thymianzweig', 'zweige thymian'],
      es: ['Ramita de tomillo', 'ramitas de tomillo'],
      fr: ['Branche de thym', 'branches de thym']
    }
  ],
  [[], { en: ['Demerara sugar', 'demerara'], de: ['Brauner Zucker', 'rohrzucker'], fr: ['Sucre roux'] }],
  [[], { es: ['Agua fría'], fr: ['Eau froide'] }],
  [
    ['vis'],
    {
      en: ['Salmon fillet', 'salmon fillet with skin'],
      de: ['Lachsfilet', 'lachsfilet mit haut'],
      es: ['Lomo de salmón', 'lomo de salmón con piel', 'filete de salmón'],
      fr: ['Filet de saumon', 'pavé de saumon']
    }
  ],
  [BUTTER.slice(), { de: ['Weiche Butter'], es: ['Mantequilla pomada'], fr: ['Beurre pommade', 'beurre mou'] }],
  [
    ['nachtschade'],
    {
      en: ['Cayenne pepper', 'cayenne'],
      de: ['Cayennepfeffer'],
      es: ['Cayena', 'pimienta de cayena'],
      fr: ['Piment de Cayenne']
    }
  ],
  [[], { es: ['Jengibre'] }],
  [[], { fr: ['Persil plat'], es: ['Perejil liso'] }],
  [[], { es: ['Perejil'], fr: ['Persil'] }]
];

// Zelfde sleutel als productKey in de app voor deze eenvoudige namen: kleine letters, één soort apostrof, één spatie.
const key = s =>
  String(s)
    .toLocaleLowerCase('nl-NL')
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const q = s => `'${String(s).replace(/'/g, "''")}'`;
const arr = list => (list.length ? `array[${list.map(q).join(', ')}]::text[]` : `'{}'::text[]`);

const rows = [];
for (const [allergens, langs] of ITEMS)
  for (const [lang, [name, ...aliases]] of Object.entries(langs))
    rows.push(
      `  (${q(lang)}, ${q(key(name))}, ${q(name)}, null, ${arr([...new Set(aliases.map(key))])}, ${arr(allergens)}, 'approved', 0, now())`
    );

const sql = `-- Savour-lijst aanvullen (2026-11-08): veelgebruikte ingrediënten die in het Engels, Duits, Spaans of Frans (en soms
-- Nederlands) ontbraken, zoals rode wijn, tomatenpuree, kalfsbotten, peperkorrels, venkel en dijonmosterd.
-- Allergenen overgenomen van het basisingrediënt dat al in de lijst stond. Gemaakt door
-- tools/ingredientenlijst-aanvulling.mjs. Staat een naam al in die taal (ook afgewezen), dan blijft die staan.
-- ${rows.length} regels.

insert into public.ingredient_list (lang, key, name, head, aliases, allergens, status, user_count, reviewed_at)
values
${rows.join(',\n')}
on conflict (lang, key) do nothing;
`;
fs.writeFileSync(new URL('../supabase/2026-11-08-ingredientenlijst-aanvulling.sql', import.meta.url), sql);
console.log(`${rows.length} regels`);

// Tweede stap: bestond een naam al (dan sloeg de insert hem over), dan krijgt die alsnog de schrijfwijzen van
// hierboven, zoals "roter portwein" bij Portwein. Alleen erbij, nooit iets weg; allergenen blijven zoals ze waren.
const updates = [];
for (const [, langs] of ITEMS)
  for (const [lang, [name, ...aliases]] of Object.entries(langs)) {
    const list = [...new Set(aliases.map(key))];
    if (list.length) updates.push(`  (${q(lang)}, ${q(key(name))}, ${arr(list)})`);
  }
const sql2 = `-- Savour-lijst aanvullen, stap 2 (2026-11-08): schrijfwijzen toevoegen aan namen die al bestonden, zoals
-- "roter portwein" bij Portwein en "altbackenes weißbrot" bij Weißbrot. Alleen erbij, nooit iets weg; de allergenen
-- blijven zoals ze waren. Gemaakt door tools/ingredientenlijst-aanvulling.mjs. ${updates.length} namen.

update public.ingredient_list t
set aliases = array(select distinct a from unnest(t.aliases || v.aliases) as a order by a)
from (values
${updates.join(',\n')}
) as v(lang, key, aliases)
where t.lang = v.lang
  and t.key = v.key
  and not (v.aliases <@ t.aliases)
  and cardinality(t.aliases) + cardinality(v.aliases) <= 50;
`;
fs.writeFileSync(new URL('../supabase/2026-11-08-ingredientenlijst-aanvulling-2.sql', import.meta.url), sql2);
console.log(`stap 2: ${updates.length} namen`);
