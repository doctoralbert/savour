// Producten en allergenen (testversie).
//
// Een product is een ingrediënt zoals de keuken het inkoopt (roomboter, slagroom, bloem), met de allergenen uit de
// EU-lijst en de namen waaronder het in recepten staat. Receptregels worden op naam gekoppeld: "250 g koude
// roomboter, in blokjes" hoort bij het product met de naam of het alias "koude roomboter". Zo telt Savour de
// allergenen van een recept op, ook via gekoppelde basisrecepten.
//
// Betrouwbaar: Savour zegt nooit dat een recept vrij is van allergenen zolang er regels zonder (gecontroleerd)
// product zijn. Voorstellen op basis van de naam bevestigt de kok altijd zelf.
//
// Eigen producten horen bij je eigen recepten (Pro); een keukenteam heeft een eigen lijst die het hele team ziet
// en die eigenaar en sous-chefs beheren (supabase/2026-11-03-producten-allergenen.sql).

const ALLERGENS = [
  ['gluten', 'Gluten'],
  ['schaaldieren', 'Schaaldieren'],
  ['ei', 'Eieren'],
  ['vis', 'Vis'],
  ['pinda', "Pinda's"],
  ['soja', 'Soja'],
  ['melk', 'Melk'],
  ['noten', 'Noten'],
  ['selderij', 'Selderij'],
  ['mosterd', 'Mosterd'],
  ['sesam', 'Sesamzaad'],
  ['sulfiet', 'Sulfiet'],
  ['lupine', 'Lupine'],
  ['weekdieren', 'Weekdieren'],
  // Extra, niet wettelijk verplicht: gasten vragen ernaar (geloof, dieet, intolerantie). Savour meldt alleen wat
  // erin zit en zegt nooit dat een recept er vrij van is. Lactose staat los van melk: lactosevrije room bevat nog
  // wel melkeiwit.
  ['lactose', 'Lactose', true],
  ['varkensvlees', 'Varkensvlees', true],
  ['rundvlees', 'Rundvlees', true],
  ['lam', 'Lam en schaap', true],
  ['wild', 'Wild', true],
  ['gevogelte', 'Gevogelte', true],
  ['alcohol', 'Alcohol', true],
  ['ui', 'Uiachtigen', true], // ui, sjalot, prei, bieslook, daslook, knoflook ...
  ['knoflook', 'Knoflook', true],
  ['peulvruchten', 'Peulvruchten', true],
  ['mais', 'Maïs', true],
  ['nachtschade', 'Nachtschade', true],
  ['paddenstoelen', 'Paddenstoelen', true],
  ['pijnboompitten', 'Pijnboompitten', true],
  ['kokos', 'Kokos', true],
  ['maanzaad', 'Maanzaad', true],
  ['kiwi', 'Kiwi', true],
  ['steenfruit', 'Steenfruit', true],
  ['koriander', 'Koriander', true],
  ['glutamaat', 'Glutamaat (E621)', true],
  ['histamine', 'Histamine', true],
  ['fructose', 'Fructose', true],
  ['fodmap', 'FODMAP', true]
];
const ALLERGEN_LABEL = new Map(ALLERGENS);
const ALLERGEN_EXTRA = new Set(ALLERGENS.filter(a => a[2]).map(a => a[0]));
const allergensEu = codes => codes.filter(c => !ALLERGEN_EXTRA.has(c));
const allergensExtra = codes => codes.filter(c => ALLERGEN_EXTRA.has(c));
// De extra kenmerken in groepen, voor het keuzevenster.
const ALLERGEN_EXTRA_GROUPS = [
  ['Melk', ['lactose']],
  ['Vlees', ['varkensvlees', 'rundvlees', 'lam', 'wild', 'gevogelte']],
  [
    'Groente, fruit en zaden',
    [
      'ui',
      'knoflook',
      'peulvruchten',
      'mais',
      'nachtschade',
      'paddenstoelen',
      'pijnboompitten',
      'kokos',
      'maanzaad',
      'kiwi',
      'steenfruit',
      'koriander'
    ]
  ],
  ['Intoleranties en overig', ['alcohol', 'glutamaat', 'histamine', 'fructose', 'fodmap']]
];

// Voorstellen op basis van de productnaam. Alleen een begin: de kok controleert altijd het etiket.
// Uitzonderingen eerst (nootmuskaat is geen noot).
const ALLERGEN_HINT_SKIP = /nootmuskaat|notenmuskaat|muskaatnoot|boekweit|cacaoboter|pindakaas-?vrij/;
const ALLERGEN_HINTS = [
  [/amandelmelk|amandeldrink/, ['noten']],
  [/havermelk|haverdrink/, ['gluten']],
  [/sojamelk|sojadrink|sojaroom/, ['soja']],
  [
    /melk|room|boter|beurre|kaas|yoghurt|kwark|crème fraîche|creme fraiche|mascarpone|ricotta|mozzarella|parmezaan|parmigiano|zuivel|ghee|milk|cream|butter|cheese|yogurt|yoghurt|burrata|brie|gruyère|gruyere|comté|comte|feta|chocolade|chocolate/,
    ['melk']
  ],
  [
    /(^|[^a-zà-ÿ])eieren|(^|[^a-zà-ÿ])ei($|[^a-zà-ÿ])|eidooier|dooier|eiwit|egg|yolk|mayonaise|mayonnaise|meringue/,
    ['ei']
  ],
  [
    /(^|[^a-zà-ÿ])(patent|tarwe|spelt|rogge|zelfrijzende?\s?)?bloem($|[^a-zà-ÿ])|tarwe|meel|brood|paneermeel|pasta|spelt|rogge|gerst|haver|couscous|bulgur|seitan|flour|wheat|bread|panko|bier|beer|croissant|bladerdeeg|brioche|noedel|noodle|vermicelli|soja ?saus|soya ?saus|soy ?sauce|shoyu|ketjap/,
    ['gluten']
  ],
  [
    /(^|[^a-zà-ÿ])vis|zalm|kabeljauw|tonijn|ansjovis|makreel|forel|tarbot|zeebaars|heilbot|schol|zeetong|snoekbaars|bonito|fish|salmon|cod|tuna|anchov|vissaus|wor[cs]{1,2}h?este?r/,
    ['vis']
  ],
  [/garnaal|garnalen|kreeft|krab|schaaldier|langoustine|scampi|shrimp|prawn|lobster|crab/, ['schaaldieren']],
  [
    /mossel|oester|inktvis|octopus|jakobsschelp|coquille|kokkel|alikruik|slak|squid|mussel|oyster|scallop|clam/,
    ['weekdieren']
  ],
  [/pinda|peanut|saté/, ['pinda']],
  [
    /amandel|hazelno|walno|cashew|pistache|pecan|macadamia|parano|almond|hazelnut|walnut|praliné|praline|frangipane|marsepein|gianduja|(^|[^a-zà-ÿ])noten/,
    ['noten']
  ],
  [/soja|tofu|miso|edamame|tamari|ketjap|kecap|shoyu|(^|[^a-zà-ÿ])soy/, ['soja']],
  [/selderij|celery|celeriac/, ['selderij']],
  [/mosterd|mustard/, ['mosterd']],
  [/sesam|tahin|sesame/, ['sesam']],
  [
    /wijn|azijn|port($|[^a-zà-ÿ])|sherry|cognac|madeira|wine|vinegar|gedroogde abrikoos|gedroogde abrikozen/,
    ['sulfiet']
  ],
  [/lupine|lupin/, ['lupine']],
  [
    /varken|spek|(^|[^a-zà-ÿ])ham($|[^a-zà-ÿ])|chorizo|pancetta|lardo|guanciale|prosciutto|serrano|pata negra|salami|bacon|reuzel|pork|worst|saucijs/,
    ['varkensvlees']
  ],
  [
    /rund|biefstuk|ossenhaas|entrec[oô]te|rib-?eye|kalf|ossenstaart|ossenwang|picanha|bavette|beef|veal|(^|[^a-zà-ÿ])veau|boeuf|bœuf/,
    ['rundvlees']
  ],
  [
    /wijn|bier|(^|[^a-zà-ÿ])port($|[^a-zà-ÿ])|sherry|cognac|armagnac|(^|[^a-zà-ÿ])rum|likeur|amaretto|vodka|(^|[^a-zà-ÿ])gin($|[^a-zà-ÿ])|whisky|calvados|madeira|(^|[^a-zà-ÿ])sake|mirin|marnier|cointreau|kirsch|advocaat|marsala|noilly|pernod|pastis|champagne|prosecco|(^|[^a-zà-ÿ])cava($|[^a-zà-ÿ])|wine|beer|brandy/,
    ['alcohol']
  ],
  [
    /(^|[^a-zà-ÿ])(ui|uien|uitjes|zilveruitjes)($|[^a-zà-ÿ])|sjalot|bosui|lente-?ui|prei|bieslook|daslook|knoflook|rocambole|onion|shallot|(^|[^a-zà-ÿ])leek|chive|ramson|garlic|aioli/,
    ['ui']
  ],
  [/knoflook|garlic|aioli/, ['knoflook']],
  [
    /bonen|(^|[^a-zà-ÿ])boon($|[^a-zà-ÿ])|linzen|kikkererwt|erwt|peulvrucht|edamame|peultjes|kapucijner|hummus|falafel|bean|lentil|chickpea/,
    ['peulvruchten']
  ],
  [/ma[iï]s|maizena|maïzena|polenta|popcorn|cornflakes|(^|[^a-zà-ÿ])corn/, ['mais']],
  [/glutamaat|e ?621|(^|[^a-zà-ÿ])msg($|[^a-zà-ÿ])|ve-?tsin|ajinomoto|maggi/, ['glutamaat']],
  [
    /tomaat|tomaten|paprika|aardappel|aubergine|chili|rawit|jalape|cayenne|espelette|spaanse peper|goji|sambal|harissa|tabasco|sriracha|potato|tomato/,
    ['nachtschade']
  ],
  [/kiwi/, ['kiwi']],
  [
    /perzik|abrikoos|abrikozen|(^|[^a-zà-ÿ])kers(en)?($|[^a-zà-ÿ])|kriek|pruim|nectarine|mirabel|amarena/,
    ['steenfruit']
  ],
  [/koriander|cilantro|coriander/, ['koriander']],
  [/(^|[^a-zà-ÿ])(lam|lams|schaap|schapen|mutton|lamb)/, ['lam']],
  [
    /(^|[^a-zà-ÿ])(hert|ree($|[^a-zà-ÿ])|reerug|reebout|reefilet|reebok|everzwijn|wild zwijn|haas($|[^a-zà-ÿ])|hazen|konijn|fazant|patrijs|wildbouillon|wildfond|venison)|(^|[^a-zà-ÿ])wild($|[^a-zà-ÿ])/,
    ['wild']
  ],
  [
    /(^|[^a-zà-ÿ])(kip|kippen|kuiken|kalkoen|eend|eenden|gans|ganzen|parelhoen|kwartel|duif|duiven|fazant|patrijs|poularde|poulet|poussin|hoen|volaille|chicken|turkey|duck|foie|gevogelte)/,
    ['gevogelte']
  ],
  [
    /champignon|paddenstoel|shiitake|oesterzwam|beukenzwam|cantharel|girolle|eekhoorntjesbrood|porcini|cèpe|morielje|truffel|enoki|shimeji|portobello|mushroom/,
    ['paddenstoelen']
  ],
  [/pijnboompit|pine ?nut|pinoli|(^|[^a-zà-ÿ])pignon|pesto/, ['pijnboompitten']],
  [/kokos|klapper|coconut/, ['kokos']],
  [/maanzaad|papaver|poppy/, ['maanzaad']],
  [
    /parmezaan|parmigiano|grana padano|pecorino|gruyère|gruyere|comté|comte|emmentaler|oude kaas|wijn|(^|[^a-zà-ÿ])port($|[^a-zà-ÿ])|champagne|bier|azijn|aceto|balsamico|tomaat|tomaten|spinazie|aubergine|avocado|zuurkool|kimchi|ansjovis|tonijn|makreel|haring|sardine|gerookt|salami|chorizo|rauwe ham|parmaham|serrano|sojasaus|soja saus|ketjap|miso|vissaus|tempeh|wine|vinegar/,
    ['histamine']
  ],
  [
    /honing|agave|fructose|(^|[^a-zà-ÿ])(appel|appels|peer|peren|mango|watermeloen|rozijn|dadel|vijg)|honey|apple|pear/,
    ['fructose']
  ],
  [
    /bloemkool|champignon|paddenstoel|asperge|artisjok|cashew|pistache|sorbitol|maltitol|xylitol|isomalt|inuline|(^|[^a-zà-ÿ])(tarwe|rogge|spelt|brood|pasta|couscous)|(^|[^a-zà-ÿ])bloem($|[^a-zà-ÿ])/,
    ['fodmap']
  ]
];
// "Pistache pasta", "curry pasta": een smeersel. "Verse pasta" en losse "pasta" zijn wel deegwaar.
const PASTE_NOT_NOODLE =
  /^(?!(verse|droge|gedroogde|gekookte|volkoren|glutenvrije|zelfgemaakte|italiaanse)\s?pasta$)[a-zà-ÿ].*[a-zà-ÿ][\s-]?pasta$/;
const PLANT_NOT_DAIRY =
  /pindakaas|roomse|(pure|puur)\s?choc|choc\w*\s(puur|pure)|(amandel|haver|soja|rijst|kokos|cashew|cashewnoot|noten|hazelnoot|erwten|oat|almond)\s?(melk|drink|room|milk)/;
// Waar een trefwoord misleidt: azijn bevat geen alcohol meer, koffie- en vanillebonen zijn geen peulvruchten,
// en in harde, gerijpte kaas is de lactose afgebroken (het melkeiwit blijft, dus melk wel).
const ALLERGEN_HINT_NOT = [
  [/azijn|vinegar/, 'alcohol'],
  [/koffie|espresso|vanille|cacao|tonka/, 'peulvruchten'],
  [/lactosevrij|lactose-vrij/, 'lactose'],
  [/kokos|klapper|coconut/, 'melk'],
  [/kokos|klapper|coconut/, 'lactose'],
  [/schapen(kaas|melk|yoghurt)|lamsoor/, 'lam'],
  [/(varkens|ossen|kalfs|runder)\s?haas/, 'wild'],
  // Pindakaas, roomse kervel, pure chocolade en plantaardige melk zijn geen zuivel; beurre noisette is boter, geen
  // hazelnoot.
  [PLANT_NOT_DAIRY, 'melk'],
  [PLANT_NOT_DAIRY, 'lactose'],
  [/beurre noisette/, 'noten'],
  // Een pasta van noten, curry of boemboe is een smeersel, geen deegwaar. Maïs-, rijst- en amandelmeel bevatten
  // geen gluten, eekhoorntjesbrood is een paddenstoel.
  [PASTE_NOT_NOODLE, 'gluten'],
  [
    /(mais|maïs|rijst|amandel|kikkererwten|boekweit|kokos|polenta|teff|quinoa|aardappel|hazelnoot|noten)\s?meel/,
    'gluten'
  ],
  [/eekhoorntjesbrood|sint-?jansbrood/, 'gluten'],
  [/cornichon/, 'mais'],
  [/(oost[- ]?indische?|water|tuin)\s?kers/, 'steenfruit'],
  [/fodmap-?arm|low.?fodmap|umeboshi|(curry|kerrie|tomaten|miso|sesam|tamarinde)\s?pasta/, 'fodmap'],
  [
    /parmezaan|parmigiano|grana padano|pecorino|gruyère|gruyere|comté|comte|emmentaler|gouda|goudse|edammer|maasdammer|oude kaas|belegen kaas/,
    'lactose'
  ]
];

let products = [];
// false als de tabel nog niet bestaat (SQL nog niet uitgevoerd).
let productsReady = true;
// Welke lijst het scherm Producten toont: 'own' of het id van een keukenteam.
let productScope = 'own';
let productSearch = '';
let productTodoAll = false;
// Welke extra kenmerken een productlijst bijhoudt, per lijst ('own' of een keukenteam): [] is alleen de 14 wettelijke
// allergenen. Nog niet gekozen: dan toont Savour alles wat er is. Wat verborgen is, blijft bewaard.
let productExtras = new Map();
let productSettingsReady = true; // false als de tabel product_settings nog niet bestaat.

function allergenShown(code, scope) {
  if (!ALLERGEN_EXTRA.has(code) || !productExtras.has(scope)) return true;
  return productExtras.get(scope).includes(code);
}
const shownAllergens = (codes, scope) => codes.filter(c => allergenShown(c, scope));

function allergenHints(name) {
  return withDerived(productKey(name), allergenKeywords(name));
}

// Alleen wat de trefwoorden zelf vinden, zonder wat daaruit volgt (melk → lactose → FODMAP).
function allergenKeywords(name) {
  const key = productKey(name);
  if (!key || ALLERGEN_HINT_SKIP.test(key)) return [];
  const found = new Set();
  for (const [re, codes] of ALLERGEN_HINTS) if (re.test(key)) codes.forEach(c => found.add(c));
  return [...found];
}

// Wat uit een ander kenmerk volgt: melk doet lactose vermoeden (behalve bij lactosevrije producten en harde kaas),
// en lactose, fructose, ui, knoflook en peulvruchten zijn FODMAP's. Ook gebruikt voor de basislijst, die alleen de
// 14 wettelijke allergenen kent. Geeft de codes in de vaste volgorde.
function withDerived(key, codes) {
  const found = new Set(codes);
  if (found.has('melk')) found.add('lactose');
  for (const [re, code] of ALLERGEN_HINT_NOT) if (re.test(key)) found.delete(code);
  if (found.has('knoflook')) found.add('ui'); // knoflook is een uiachtige
  if (['lactose', 'fructose', 'ui', 'knoflook', 'peulvruchten'].some(c => found.has(c))) found.add('fodmap');
  for (const [re, code] of ALLERGEN_HINT_NOT) if (code === 'fodmap' && re.test(key)) found.delete(code);
  return ALLERGENS.map(a => a[0]).filter(c => found.has(c));
}

// Basislijst met ingrediënten uit Open Food Facts (tools/build-ingredient-base.mjs): namen in vijf talen en de
// allergenen. Pas geladen als iemand een product toevoegt; zonder internet werkt Savour met de trefwoorden hierboven.
let ingredientBase = null;
let ingredientBaseLoading = null;

function loadIngredientBase() {
  if (ingredientBase) return Promise.resolve(ingredientBase);
  if (!ingredientBaseLoading)
    ingredientBaseLoading = fetch('/js/data/ingredient-base.json')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data?.items) throw new Error('geen basislijst');
        const index = new Map();
        for (const item of data.items)
          for (let l = 1; l <= 5; l++)
            for (const n of String(item[l] || '').split('|')) {
              const k = productKey(n);
              if (k && !index.has(k)) index.set(k, item);
            }
        ingredientBase = { index };
        return ingredientBase;
      })
      .catch(() => {
        ingredientBaseLoading = null;
        return null;
      });
  return ingredientBaseLoading;
}

// Zoekt een naam in de basislijst: eerst de hele naam, dan een deel ervan, van achteren ("koude roomboter" →
// "roomboter", "witte peper" → "peper"). Geeft { name, allergens } of null.
function ingredientBaseMatch(name) {
  const index = ingredientBase?.index;
  const words = productKey(name).split(' ').filter(Boolean);
  if (!index || !words.length) return null;
  for (let len = words.length; len > 0; len--)
    for (let start = words.length - len; start >= 0; start--) {
      const k = words.slice(start, start + len).join(' ');
      if (len < words.length && k.length < 4) continue;
      const item = index.get(k);
      if (item) return { name: k, allergens: item[0] ? item[0].split(',') : [] };
    }
  return null;
}

// Uitleg boven de allergenen bij een nieuw product, met de bronvermelding die de licentie van Open Food Facts vraagt.
function productHintHtml({ base, codes }) {
  if (!base && !codes.length) return '';
  const source = base
    ? '<p class="product-source">Basislijst: © <a href="https://world.openfoodfacts.org/terms-of-use" target="_blank" rel="noopener">Open Food Facts contributors</a>, ODbL</p>'
    : '';
  const found = base
    ? `<p class="product-hint"><span>Gevonden in de basislijst</span>: <b translate="no">${esc(base.name)}</b></p>`
    : '';
  const advice = codes.length
    ? '<p class="product-hint">Voorstel van Savour op basis van de naam. Pas het aan als het bij jouw merk anders is.</p>'
    : '<p class="product-hint">Savour kent hier geen allergenen bij. Weet je dat er wel iets in zit, vink het dan aan.</p>';
  return found + advice + source;
}

// Voorstel voor een nieuw product: de basislijst plus de eigen trefwoorden (die ook sulfiet in wijn en ei in
// mayonaise kennen). Altijd een voorstel; de kok controleert het etiket.
function allergenSuggestion(name) {
  const base = ingredientBaseMatch(name);
  return { base, codes: withDerived(productKey(name), [...(base?.allergens || []), ...allergenHints(name)]) };
}

// Bewerkingen en snijwijzen veranderen het product niet: gezeefde bloem is bloem, venkel brunoise is venkel.
const PRODUCT_PREP_WORDS =
  /(^|\s)(gezeefde?|gesmolten|(fijn|grof)?\s?gehakte?|(fijn|grof)?\s?gesneden|geraspte?|geschilde?|gewassen|koude?|zachte?|lauwe?|ontdooide?|ingekookte?|gesnipperde?|op kamertemperatuur|in (blokjes|blokken|reepjes|plakjes|stukjes|ringen|partjes)|brunoise|julienne|julliene|blokjes|blokken|reepjes|plakjes|schijfjes|schijf|schijven|ringen|partjes|stukjes)(?=\s|$)/g;
// Woordjes die overblijven als de rest van de regel is weggehaald: "gelatine per (100 gram massa)".
const PRODUCT_TRAILING_WORDS = /(\s(in|van|a|à|per|tot|met|of|en|op|circa|ca\.?|\+\/-|±|x))+$/;
// Hoeveelheden zonder getal, als heel woord: "snufje zout" wordt "zout", niet "je zout".
const PRODUCT_AMOUNT_WORDS =
  /(^|\s)(naar smaak|naar behoefte|scheutjes?|scheut|snufjes?|snuf|mespuntjes?|mespunt|eventueel|evt\.?|to taste|as needed|pinch|dash)(?=\s|$)/gi;

// Naam van een product of ingrediënt om op te zoeken, zodat "Bloem 500 gm", "bloem gezeefd 300gm" en "250 gram
// bloem" allemaal "bloem" worden: kleine letters, zonder tekst tussen haakjes of na een komma, zonder "naar
// smaak", zonder maten ("3 mm"), zonder alles vanaf een getal ("peren 12 stuks", "gelatine per 100 gram") en zonder
// bewerkingen. "Type 405" en "tipo 00" blijven staan: dat is een soort bloem.
// Een scherm vraagt dit duizenden keren voor dezelfde namen; daarom onthoudt Savour de uitkomst.
const productKeyMemo = new Map();
function productKey(text) {
  const raw = String(text || '');
  let k = productKeyMemo.get(raw);
  if (k === undefined) {
    if (productKeyMemo.size > 50000) productKeyMemo.clear();
    k = computeProductKey(raw);
    productKeyMemo.set(raw, k);
  }
  return k;
}

function computeProductKey(text) {
  let s = text
    .toLocaleLowerCase('nl-NL')
    .replace(/\([^)]*\)?/g, ' ')
    .split(/[,;|]/)[0]
    .replace(PRODUCT_AMOUNT_WORDS, ' ')
    .replace(/[*•·]/g, ' ')
    .replace(/(^|\s)\d+(?:[.,]\d+)?\s?(mm|cm)(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = s.split(' ');
  const cut = words.findIndex(
    (w, i) => i > 0 && /^[\d½⅓⅔¼¾⅛⅜⅝⅞]/.test(w) && !/^(type|tipo|nr\.?|no\.?|nummer)$/.test(words[i - 1])
  );
  if (cut > 0) s = words.slice(0, cut).join(' ');
  for (let i = 0; i < 3; i++) {
    const next = s.replace(PRODUCT_PREP_WORDS, ' ').replace(/\s+/g, ' ').trim().replace(PRODUCT_TRAILING_WORDS, '');
    if (!next || next === s) break;
    s = next;
  }
  return s.trim();
}

function ingredientKey(line) {
  return productKey(ingredientNameOf(String(line || '').replace(/^\s*(circa|ca\.?|ongeveer|±|\+\/-)\s+/i, '')));
}

// Voorstel voor een ingrediënt zonder product: een product waarvan de naam vooraan of achteraan staat ("patent
// bloem" en "bloem type 405" → Bloem). Nooit als de naam een allergeen doet vermoeden dat het product niet heeft:
// "pinda olie" is geen gewone olie. De kok bevestigt het voorstel altijd zelf.
function productSuggestionFor(scope, key) {
  const hints = allergensEu(allergenHints(key));
  let best = null;
  let bestLength = 0;
  for (const p of productsIn(scope))
    for (const n of [p.name, ...p.aliases]) {
      const k = productKey(n);
      if (!k || k.length <= bestLength || k === key) continue;
      if (!key.endsWith(' ' + k) && !key.startsWith(k + ' ')) continue;
      if (hints.some(c => !p.allergens.includes(c))) continue;
      best = p;
      bestLength = k.length;
    }
  return best;
}

async function loadProducts() {
  productsReady = true;
  productExtras = new Map();
  if (demoMode) {
    products = demoProducts();
    return;
  }
  products = [];
  if (!currentUser) return;
  const [{ data, error }, settings] = await Promise.all([
    supabaseClient
      .from('products')
      .select('id,user_id,team_id,name,aliases,allergens,allergens_known,allergen_note,updated_at')
      .order('name'),
    supabaseClient.from('product_settings').select('user_id,team_id,allergen_extras')
  ]);
  productSettingsReady = !settings.error;
  (settings.data || []).forEach(row =>
    productExtras.set(
      row.team_id ? String(row.team_id) : 'own',
      Array.isArray(row.allergen_extras) ? row.allergen_extras : []
    )
  );
  if (error) {
    productsReady = false;
    return;
  }
  products = (data || []).map(productFromRow);
}

function productFromRow(row) {
  return {
    id: String(row.id),
    scope: row.team_id ? String(row.team_id) : 'own',
    name: row.name || '',
    aliases: Array.isArray(row.aliases) ? row.aliases : [],
    allergens: Array.isArray(row.allergens) ? row.allergens : [],
    known: !!row.allergens_known,
    note: row.allergen_note || ''
  };
}

// Voorbeeldproducten in de demo: de beurre blanc is bijna compleet, zodat je ziet wat er nog mist.
function demoProducts() {
  const p = (name, allergens, aliases = []) => ({
    id: 'demo-p-' + productKey(name).replace(/\W+/g, '-'),
    scope: 'own',
    name,
    aliases,
    allergens,
    known: true,
    note: ''
  });
  return [
    p('Sjalot', [], ['sjalotten']),
    p('Droge witte wijn', ['sulfiet']),
    p('Witte wijnazijn', ['sulfiet']),
    p('Roomboter', ['melk'], ['koude roomboter']),
    p('Zout', [])
  ];
}

// Bij welke productlijst hoort dit recept? Een recept van een keukenteam, of geopend vanuit een keukenteam:
// de lijst van dat team. Anders je eigen lijst.
function productScopeOf(r) {
  if (r?.teamId) return String(r.teamId);
  if (r && currentShared && ['shared', 'sharedFolder'].includes(recipeOpenContext)) return String(currentShared);
  return 'own';
}

function productsIn(scope) {
  return products.filter(p => p.scope === scope);
}

function canEditProducts(scope) {
  if (demoMode) return true;
  if (!productsReady) return false;
  if (scope === 'own') return isPro();
  const m = findSharedMap(scope);
  return !!m && !m.locked && canEditShared(m);
}

// Toont Savour allergenen bij recepten in deze lijst? Met Pro, in een keukenteam, of als er al producten zijn
// (wie stopt met Pro houdt alles).
function productsVisible(scope) {
  return productsReady && (canEditProducts(scope) || productsIn(scope).length > 0);
}

// Opzoeklijst naam → product. In een keukenteam eerst de lijst van het team, daarna je eigen lijst.
function productIndex(scope) {
  const map = new Map();
  const add = list =>
    list.forEach(p => {
      [p.name, ...p.aliases].forEach(n => {
        const k = productKey(n);
        if (k && !map.has(k)) map.set(k, p);
      });
    });
  add(productsIn(scope));
  if (scope !== 'own' && (demoMode || isPro())) add(productsIn('own'));
  return map;
}

// Twee producten op één regel ("zout en peper", "limoen rasp en sap"): telt mee als elk deel een bevestigd product
// is. Een los deel als "sap" hoort bij het product ervoor ("limoen rasp en sap" → limoen rasp, limoen sap).
function combinedProduct(index, key) {
  const parts = key.split(/\s+(?:en|\+|&)\s+|\s*[/+&]\s*/).filter(Boolean);
  if (parts.length < 2) return null;
  const found = [];
  for (let i = 0; i < parts.length; i++) {
    let p = index.get(parts[i]);
    if (!p && i > 0 && !parts[i].includes(' ')) p = index.get(parts[0].split(' ')[0] + ' ' + parts[i]);
    if (!p?.known) return null;
    found.push(p);
  }
  const unique = [...new Set(found)];
  return {
    id: '',
    name: unique.map(p => p.name).join(' + '),
    aliases: [],
    allergens: [...new Set(unique.flatMap(p => p.allergens))],
    known: true
  };
}

// Verwijst een regel naar een onderdeel van hetzelfde recept? "coulis" in een recept met het onderdeel "Bosbes
// coulis:": de regels van dat onderdeel tellen al mee. Alleen bij de hele naam van het onderdeel of een algemeen
// woord als "coulis" of "saus", zodat een echt ingrediënt nooit wegvalt.
function partOfRecipe(r, key) {
  const generic = FAMILY_GENERIC.has(key);
  return (r.ingredients || []).some(line => {
    const part = recipePartName(line);
    if (!part) return false;
    const k = productKey(part);
    return k === key || (generic && k.split(' ').includes(key));
  });
}

// Allergenen van een recept: per regel het product, het gekoppelde basisrecept of "onbekend".
function recipeAllergenInfo(
  r,
  scope = productScopeOf(r),
  seen = new Set(),
  byTitle = recipesByTitle(r),
  indexes = new Map()
) {
  // Eén productindex per lijst voor het hele recept en zijn basisrecepten (en voor alle recepten in productOverview).
  if (!indexes.has(scope)) indexes.set(scope, productIndex(scope));
  const index = indexes.get(scope);
  const found = new Set();
  const unknown = [];
  const lines = [];
  seen.add(String(r.id));
  (r.ingredients || []).forEach((line, i) => {
    if (recipePartName(line)) return;
    const key = ingredientKey(line);
    if (!key) return;
    const target = ingredientLinkTarget(r, line, byTitle);
    if (target) {
      if (seen.has(String(target.id))) {
        lines.push({ i, line, key, status: 'recipe', target, sub: null });
        return;
      }
      // Alleen het pad tot hier telt als "al gezien": zo herkent Savour een kring, maar telt een basisrecept dat
      // twee keer voorkomt wel twee keer mee in de weergave.
      const sub = recipeAllergenInfo(
        target,
        target.teamId ? String(target.teamId) : scope,
        new Set(seen),
        byTitle,
        indexes
      );
      sub.allergens.forEach(a => found.add(a));
      sub.unknown.forEach(u => unknown.push({ ...u, via: u.via || target.title }));
      lines.push({ i, line, key, status: 'recipe', target, sub });
      return;
    }
    const product = index.get(key) || combinedProduct(index, key);
    if (product?.known) {
      product.allergens.forEach(a => found.add(a));
      lines.push({ i, line, key, status: 'product', product });
    } else if (!product && partOfRecipe(r, key)) {
      lines.push({ i, line, key, status: 'part', product: null });
    } else {
      unknown.push({ key, line, product: product || null });
      lines.push({ i, line, key, status: product ? 'unchecked' : 'unknown', product: product || null });
    }
  });
  if (found.has('knoflook')) found.add('ui'); // knoflook is een uiachtige, ook als alleen knoflook is aangevinkt
  return { allergens: ALLERGENS.map(a => a[0]).filter(a => found.has(a) && allergenShown(a, scope)), unknown, lines };
}

// Kruisje rechtsboven in een venster.
function modalCloseHtml() {
  return `<button type="button" class="sv-dialog-x" data-x aria-label="${esc(t('Sluiten'))}">×</button>`;
}

// Sluiten met Escape (ook als de focus niet in het venster staat), het kruisje of een klik naast het venster. Bij
// vensters boven elkaar sluit Escape alleen het bovenste.
function closableModal(el, close) {
  const onKey = e => {
    if (e.key !== 'Escape' || !document.body.contains(el)) return;
    const open = [...document.querySelectorAll('.modal.sv-dialog.open')];
    if (open[open.length - 1] !== el) return;
    e.preventDefault();
    close();
  };
  document.addEventListener('keydown', onKey);
  const gone = new MutationObserver(() => {
    if (document.body.contains(el)) return;
    document.removeEventListener('keydown', onKey);
    gone.disconnect();
  });
  gone.observe(document.body, { childList: true });
  el.addEventListener('mousedown', e => {
    if (e.target === el) close();
  });
  el.querySelector('[data-x]')?.addEventListener('click', close);
}

function allergenChips(codes, cls = '') {
  return codes
    .map(
      c =>
        `<span class="allergen-chip ${ALLERGEN_EXTRA.has(c) ? 'is-extra ' : ''}${cls}">${esc(ALLERGEN_LABEL.get(c) || c)}</span>`
    )
    .join('');
}

// De wettelijke allergenen, en daaronder wat er verder in zit (ui, alcohol ...). "Bevat geen van de 14" alleen als
// alles gecontroleerd is; over de extra's zegt Savour nooit dat ze ontbreken.
function allergenSummaryHtml(info) {
  const eu = allergensEu(info.allergens);
  const extra = allergensExtra(info.allergens);
  return (
    (eu.length
      ? `<div class="allergen-chips">${allergenChips(eu)}</div>`
      : info.unknown.length
        ? ''
        : '<p>Bevat geen van de 14 allergenen.</p>') +
    (extra.length
      ? `<div class="allergen-extra"><span>Bevat ook</span><div class="allergen-chips">${allergenChips(extra)}</div></div>`
      : '')
  );
}

// Blok "Allergenen" op de receptpagina, onder de ingrediënten.
function renderRecipeAllergens(r) {
  const host = $('rpAllergens');
  if (!host) return;
  host.innerHTML = '';
  if (!r || r.example || !(r.ingredients || []).some(x => !recipePartName(x))) return;
  const scope = productScopeOf(r);
  if (!productsVisible(scope)) return;
  const info = recipeAllergenInfo(r, scope);
  const edit = canEditProducts(scope);
  const checked = info.lines.length - info.unknown.length;
  if (!checked && !info.allergens.length) {
    host.innerHTML = edit
      ? '<button type="button" class="rp-note-add" onclick="openRecipeAllergenCheck()">＋ Allergenen bepalen</button>'
      : '';
    return;
  }
  const body = allergenSummaryHtml(info);
  const open = info.unknown.length
    ? `<p class="rp-allergens-open">${icon('alert', { size: 14 })}<span>Nog niet compleet: ${info.unknown.length} ${info.unknown.length === 1 ? 'ingrediënt' : 'ingrediënten'} zonder gecontroleerde allergenen.</span></p>`
    : '';
  host.innerHTML = `<aside class="rp-allergens"><div class="rp-side-note-head"><span>Allergenen</span><button type="button" onclick="openRecipeAllergenCheck()">${edit ? 'Controleren' : 'Details'}</button></div>${body}${open}</aside>`;
}

// Venster per recept: elke ingrediëntregel met het product (of basisrecept) en de allergenen.
function openRecipeAllergenCheck() {
  const r = findRecipe(currentId);
  if (!r) return;
  const scope = productScopeOf(r);
  const edit = canEditProducts(scope);
  const info = recipeAllergenInfo(r, scope);
  const rows = info.lines
    .map(x => {
      const name = `<b translate="no">${esc(ingredientNameOf(x.line))}</b>`;
      let state = '';
      let action = '';
      if (x.status === 'recipe') {
        const sub = x.sub;
        state = `<span class="allergen-line-via">${icon('book', { size: 14 })}<span translate="no">${esc(x.target.title)}</span></span>${sub ? (sub.allergens.length ? allergenChips(sub.allergens) : sub.unknown.length ? '' : '<span class="allergen-none">Geen allergenen</span>') + (sub.unknown.length ? `<span class="allergen-open">${sub.unknown.length} open</span>` : '') : ''}`;
      } else if (x.status === 'product') {
        state = `<span class="allergen-line-product" translate="no">${esc(x.product.name)}</span>${shownAllergens(x.product.allergens, scope).length ? allergenChips(shownAllergens(x.product.allergens, scope)) : '<span class="allergen-none">Geen allergenen</span>'}`;
        if (edit)
          action = `<button type="button" class="btn-quiet allergen-relink" data-relink="${esc(x.key)}">Wijzigen</button>`;
      } else if (x.status === 'unchecked') {
        state = `<span class="allergen-line-product" translate="no">${esc(x.product.name)}</span><span class="allergen-open">Allergenen nog niet gecontroleerd</span>`;
        if (edit)
          action = `<button type="button" class="btn small gold" data-product="${esc(x.product.id)}">Invullen</button>`;
      } else if (x.status === 'part') {
        state = '<span class="allergen-none">Onderdeel van dit recept</span>';
      } else {
        state = '<span class="allergen-open">Nog geen product</span>';
        if (edit)
          action = `<span class="allergen-line-actions"><button type="button" class="btn small gold" data-link="${esc(x.key)}">Product kiezen</button><button type="button" class="btn small" data-recipe-line="${x.i}">Recept</button></span>`;
      }
      return `<li class="allergen-line"><div class="allergen-line-main">${name}<div class="allergen-line-state">${state}</div></div>${action}</li>`;
    })
    .join('');
  document.getElementById('allergenCheck')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="allergenCheck" role="dialog" aria-modal="true" aria-labelledby="allergenCheckTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="allergenCheckTitle" class="sv-dialog-title">Allergenen</h2><p class="sv-dialog-text"><span translate="no">${esc(r.title)}</span></p><div class="allergen-check-sum">${allergenSummaryHtml(info)}${info.unknown.length ? `<p class="rp-allergens-open">${icon('alert', { size: 14 })}<span>Nog niet compleet: ${info.unknown.length} ${info.unknown.length === 1 ? 'ingrediënt' : 'ingrediënten'} zonder gecontroleerde allergenen.</span></p>` : ''}</div><ul class="allergen-lines">${rows}</ul>${edit ? '<p class="muted allergen-check-tip">Een product geldt voor alle recepten met dezelfde ingrediëntnaam. Gebruikt een regel een eigen recept, zoals een fond? Koppel het via ⋯ Koppelen aan recept; dan tellen de allergenen van dat recept mee.</p>' : ''}<div class="sv-dialog-actions"><button type="button" class="btn" data-close>Sluiten</button></div></div></div>`
  );
  const el = $('allergenCheck');
  const close = () => el.remove();
  const after = async action => {
    const changed = await action();
    if (!changed) return;
    renderRecipeAllergens(findRecipe(currentId));
    openRecipeAllergenCheck();
  };
  closableModal(el, close);
  el.querySelector('[data-close]').addEventListener('click', close);
  el.querySelectorAll('[data-link],[data-relink]').forEach(b =>
    b.addEventListener('click', () => {
      const key = b.dataset.link || b.dataset.relink;
      const line = info.lines.find(x => x.key === key);
      after(() => linkIngredientToProduct(scope, key, ingredientNameOf(line?.line || key), line?.product || null));
    })
  );
  el.querySelectorAll('[data-product]').forEach(b =>
    b.addEventListener('click', () => {
      const p = products.find(x => x.id === b.dataset.product);
      after(() => openProductEditor({ product: p, scope }));
    })
  );
  // Een eigen recept kiezen voor deze ene regel, zoals bij ⋯ Koppelen aan recept.
  el.querySelectorAll('[data-recipe-line]').forEach(b =>
    b.addEventListener('click', () =>
      after(async () => {
        const line = r.ingredients[Number(b.dataset.recipeLine)];
        const id = await pickLinkedRecipe(r, ingredientNameOf(line), null);
        if (!id) return false;
        const links = { ...(r.links || {}), [ingredientNameOf(line).toLowerCase()]: String(id) };
        if (!(await saveRecipeFields(r, { ingredient_links: links }))) return false;
        r.links = links;
        renderIngredientLinks(r);
        return true;
      })
    )
  );
}

// Een ingrediëntnaam aan een product koppelen: bestaand product kiezen of een nieuw maken. Geeft true bij een wijziging.
async function linkIngredientToProduct(scope, key, name, current = null) {
  const choice = await pickProduct(scope, name, current);
  if (!choice) return false;
  if (choice.create) return !!(await openProductEditor({ scope, name: choice.create, alias: key }));
  const p = products.find(x => x.id === choice.id);
  if (!p) return false;
  if (productKey(p.name) === key || p.aliases.some(a => productKey(a) === key)) return false;
  return !!(await saveProduct({ ...p, aliases: [...p.aliases, key] }, { moveAliasesFrom: true }));
}

// Zoekvenster met de producten van deze lijst. Geeft { id }, { create: naam } of null bij annuleren.
async function pickProduct(scope, name, current) {
  await loadIngredientBase();
  const key = productKey(name);
  // Staat een deel van de naam in de basislijst ("roomboter" in "koude roomboter"), dan is dat het voor de hand
  // liggende nieuwe product; de volledige naam wordt dan een alias.
  const base = ingredientBaseMatch(key);
  const baseName = base && base.name !== key ? base.name.charAt(0).toLocaleUpperCase('nl-NL') + base.name.slice(1) : '';
  const words = key.split(' ').filter(w => w.length > 2);
  const list = productsIn(scope).sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  // Voorstel: een product waarvan de naam in de ingrediëntnaam staat ("roomboter" in "koude roomboter") of andersom.
  const score = p => {
    const n = productKey(p.name);
    if ([n, ...p.aliases.map(productKey)].some(x => x && (key.includes(x) || x.includes(key)))) return 2;
    return words.some(w => n.includes(w)) ? 1 : 0;
  };
  document.getElementById('productPicker')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="productPicker" role="dialog" aria-modal="true" aria-labelledby="productPickerTitle"><form class="sv-dialog-box product-picker-box" novalidate>${modalCloseHtml()}<h2 id="productPickerTitle" class="sv-dialog-title" translate="no">${esc(name)}</h2><p class="sv-dialog-text">Kies het product dat bij dit ingrediënt hoort, of maak een nieuw product.</p><input class="sv-dialog-input" type="text" autocomplete="off" placeholder="${esc(t('Zoek een product'))}" aria-label="${esc(t('Zoek een product'))}"><div class="sv-dialog-choices product-results"></div><div class="sv-dialog-actions"><button type="button" class="btn" data-cancel>Annuleren</button></div></form></div>`
  );
  const el = $('productPicker');
  const input = el.querySelector('input');
  const results = el.querySelector('.product-results');
  const show = () => {
    const q = productKey(input.value);
    const found = q
      ? list.filter(p => [p.name, ...p.aliases].some(n => productKey(n).includes(q)))
      : list
          .map(p => [p, score(p)])
          .sort((a, b) => b[1] - a[1])
          .map(x => x[0]);
    const newName = input.value.trim() || key || name;
    const strong = !q && list.some(p => score(p) === 2);
    results.innerHTML =
      (!q && baseName && !list.some(p => productKey(p.name) === productKey(baseName))
        ? `<button type="button" class="sv-dialog-choice${strong ? '' : ' is-primary'}" data-create="${esc(baseName)}">＋ Nieuw product <span translate="no">${esc(baseName)}</span></button>`
        : '') +
      `<button type="button" class="sv-dialog-choice" data-create="${esc(newName)}">＋ Nieuw product <span translate="no">${esc(newName)}</span></button>` +
      found
        .slice(0, q ? 60 : 40)
        .map(
          p =>
            `<button type="button" class="sv-dialog-choice${(current && current.id === p.id) || (!q && score(p) === 2) ? ' is-primary' : ''}" data-id="${esc(p.id)}"><span translate="no">${esc(p.name)}</span><small>${
              shownAllergens(p.allergens, scope).length
                ? esc(
                    shownAllergens(p.allergens, scope)
                      .map(a => t(ALLERGEN_LABEL.get(a)))
                      .join(', ')
                  )
                : esc(t('Geen allergenen'))
            }</small></button>`
        )
        .join('');
  };
  show();
  input.addEventListener('input', show);
  return new Promise(resolve => {
    const done = value => {
      el.remove();
      resolve(value);
    };
    results.addEventListener('click', e => {
      const b = e.target.closest('[data-id],[data-create]');
      if (!b) return;
      done(b.dataset.id ? { id: b.dataset.id } : { create: b.dataset.create });
    });
    el.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      (
        results.querySelector('.is-primary') ||
        results.querySelector('[data-id]') ||
        results.querySelector('[data-create]')
      )?.click();
    });
    el.querySelector('[data-cancel]').addEventListener('click', () => done(null));
    closableModal(el, () => done(null));
    setTimeout(() => input.focus(), 0);
  });
}

// Product toevoegen of wijzigen. Geeft het opgeslagen product, of null bij annuleren.
async function openProductEditor({ product = null, scope = productScope, name = '', alias = '' } = {}) {
  if (!product) await loadIngredientBase();
  const edit = canEditProducts(product?.scope || scope);
  const p = product || {
    id: '',
    scope,
    name: name ? name.charAt(0).toLocaleUpperCase('nl-NL') + name.slice(1) : '',
    aliases: [],
    allergens: [],
    known: false,
    note: ''
  };
  const aliases = [...p.aliases];
  if (alias && productKey(alias) !== productKey(p.name) && !aliases.some(a => productKey(a) === productKey(alias)))
    aliases.push(alias);
  // Nieuw product: voorstel op basis van de naam, nooit al als gecontroleerd aangevinkt.
  const suggestion = product ? { base: null, codes: [] } : allergenSuggestion(p.name);
  const hints = suggestion.codes;
  const listScope = product?.scope || scope;
  const chosen = new Set(product ? p.allergens : hints.filter(c => allergenShown(c, listScope)));
  // Extra kenmerken die deze lijst niet bijhoudt, zie je niet; staat er al een aangevinkt, dan wel.
  const pickable = ALLERGENS.filter(([code]) => allergenShown(code, listScope) || chosen.has(code));
  const hidden = p.allergens.filter(c => !pickable.some(a => a[0] === c));
  document.getElementById('productEditor')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="productEditor" role="dialog" aria-modal="true" aria-labelledby="productEditorTitle"><form class="sv-dialog-box product-editor-box" novalidate>${modalCloseHtml()}<h2 id="productEditorTitle" class="sv-dialog-title">${product ? 'Product' : 'Nieuw product'}</h2><label class="product-field"><span>Naam</span><input class="sv-dialog-input" name="name" value="${esc(p.name)}" autocomplete="off" required ${edit ? '' : 'readonly'} translate="no"></label><label class="product-field"><span>Ook in recepten als</span><input class="sv-dialog-input" name="aliases" value="${esc(aliases.join(', '))}" autocomplete="off" placeholder="${esc(t('Bijv. koude roomboter, boter'))}" ${edit ? '' : 'readonly'} translate="no"><small class="muted">Gescheiden door komma’s. Elke naam koppelt de ingrediëntregels met die naam aan dit product.</small></label><fieldset class="product-allergens"><legend>Allergenen</legend><div class="product-hints">${product ? '' : productHintHtml(suggestion)}</div>${[
      false,
      true
    ]
      .filter(extra => !extra || pickable.some(a => a[2]))
      .map(
        extra =>
          `${extra ? '<p class="allergen-pick-head">Extra, niet wettelijk verplicht</p>' : ''}<div class="allergen-pick">${pickable
            .filter(a => !!a[2] === extra)
            .map(
              ([code, label]) =>
                `<label class="allergen-pick-item"><input type="checkbox" name="allergen" value="${code}" ${chosen.has(code) ? 'checked' : ''} ${edit ? '' : 'disabled'}><span>${esc(label)}</span></label>`
            )
            .join('')}</div>`
      )
      .join(
        ''
      )}</fieldset><label class="product-field"><span>Opmerking</span><input class="sv-dialog-input" name="note" value="${esc(p.note)}" autocomplete="off" maxlength="300" placeholder="${esc(t('Bijv. kan sporen van noten bevatten'))}" ${edit ? '' : 'readonly'}></label><label class="product-known"><input type="checkbox" name="known" ${p.known || !product ? 'checked' : ''} ${edit ? '' : 'disabled'}><span>Allergenen kloppen</span></label><p class="muted product-known-tip">Zet dit uit als je het nog wilt nakijken; dan telt het product nog niet mee.</p><div class="sv-dialog-actions">${product && edit ? '<button type="button" class="btn product-delete" data-delete>Verwijderen</button>' : ''}<button type="button" class="btn" data-cancel>${edit ? 'Annuleren' : 'Sluiten'}</button>${edit ? '<button type="submit" class="btn gold">Opslaan</button>' : ''}</div></form></div>`
  );
  const el = $('productEditor');
  const form = el.querySelector('form');
  // Nieuw product: past de kok de naam aan en heeft hij nog niets zelf aangevinkt, dan volgt het voorstel de naam.
  if (!product && edit) {
    let touched = false;
    form.querySelectorAll('[name=allergen]').forEach(x => x.addEventListener('change', () => (touched = true)));
    form.name.addEventListener('change', () => {
      if (touched) return;
      const next = allergenSuggestion(form.name.value);
      form.querySelectorAll('[name=allergen]').forEach(x => (x.checked = next.codes.includes(x.value)));
      form.querySelector('.product-hints').innerHTML = productHintHtml(next);
    });
  }
  return new Promise(resolve => {
    const done = value => {
      el.remove();
      resolve(value);
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!edit) return done(null);
      const newName = form.name.value.trim().replace(/\s+/g, ' ');
      if (!newName) {
        form.name.focus();
        return toast('Vul een naam in');
      }
      const row = {
        ...p,
        name: newName.slice(0, 120),
        aliases: [
          ...new Set(
            form.aliases.value
              .split(',')
              .map(productKey)
              .filter(a => a && a !== productKey(newName))
          )
        ].slice(0, 500),
        allergens: [...form.querySelectorAll('[name=allergen]:checked')].map(x => x.value).concat(hidden),
        known: form.known.checked,
        note: form.note.value.trim().slice(0, 300)
      };
      if (!row.known && row.allergens.length && !p.known) {
        const ok = await askConfirm(
          'Product nog niet laten meetellen?\n\nDe aangevinkte allergenen worden bewaard. Het product telt pas mee als je "Allergenen kloppen" aanzet.',
          { confirmLabel: 'Zo bewaren' }
        );
        if (!ok) return;
      }
      const saved = await saveProduct(row, { moveAliasesFrom: true });
      if (saved) done(saved);
    });
    el.querySelector('[data-cancel]').addEventListener('click', () => done(null));
    el.querySelector('[data-delete]')?.addEventListener('click', async () => {
      if (
        !(await askConfirm(
          `${p.name} verwijderen?\n\nDe recepten blijven zoals ze zijn; de ingrediënten met deze naam hebben dan geen product meer.`,
          { confirmLabel: 'Verwijderen', danger: true }
        ))
      )
        return;
      if (await deleteProduct(p)) done(p);
    });
    closableModal(el, () => done(null));
    setTimeout(() => (product ? null : form.name.focus()), 0);
  });
}

// Opslaan. Een naam hoort bij één product per lijst: staat hij al bij een ander product, dan vraagt Savour of hij
// mag verhuizen. Geeft het opgeslagen product of null.
async function saveProduct(p, { moveAliasesFrom = false } = {}) {
  const keys = new Set([productKey(p.name), ...p.aliases.map(productKey)]);
  const others = productsIn(p.scope).filter(x => x.id !== p.id);
  const sameName = others.find(x => productKey(x.name) === productKey(p.name));
  if (sameName) {
    toast(`Er is al een product ${sameName.name}`);
    return null;
  }
  const clashes = others.filter(x => x.aliases.some(a => keys.has(productKey(a))));
  if (clashes.length) {
    if (!moveAliasesFrom) return null;
    const names = clashes.map(x => x.name).join(', ');
    const ok = await askConfirm(
      `Naam verplaatsen?\n\nEen van deze namen hoort nu bij ${names}. Na opslaan hoort hij bij ${p.name}.`,
      { confirmLabel: 'Verplaatsen' }
    );
    if (!ok) return null;
    for (const x of clashes) {
      const next = { ...x, aliases: x.aliases.filter(a => !keys.has(productKey(a))) };
      if (!(await writeProduct(next))) return null;
    }
  }
  // Een alias gelijk aan de naam van een ander product kan niet: dan is het eigenlijk dat product.
  const nameClash = others.find(x => p.aliases.some(a => productKey(a) === productKey(x.name)));
  if (nameClash) {
    toast(`${nameClash.name} is al een eigen product`);
    return null;
  }
  return writeProduct(p);
}

async function writeProduct(p) {
  if (demoMode) {
    const saved = { ...p, id: p.id || 'demo-p-' + Date.now() + Math.random().toString(36).slice(2, 6) };
    products = [...products.filter(x => x.id !== saved.id), saved];
    return saved;
  }
  const row = {
    name: p.name,
    aliases: p.aliases,
    allergens: p.allergens,
    allergens_known: p.known,
    allergen_note: p.note
  };
  const query = p.id
    ? supabaseClient.from('products').update(row).eq('id', p.id)
    : supabaseClient.from('products').insert({
        ...row,
        user_id: p.scope === 'own' ? currentUser.id : null,
        team_id: p.scope === 'own' ? null : p.scope
      });
  const { data, error } = await query
    .select('id,user_id,team_id,name,aliases,allergens,allergens_known,allergen_note')
    .single();
  if (error || !data) {
    // Tabel ontbreekt: SQL nog niet uitgevoerd. Geweigerd (geen rechten of geen Pro): dat zeggen we ook zo.
    const msg = error?.message || '';
    toast(
      /does not exist|schema cache|could not find the table/i.test(msg)
        ? 'Dit kan zodra de database is bijgewerkt.'
        : error?.code === '42501' || /row-level security|permission denied/i.test(msg)
          ? 'Opslaan is geweigerd. Controleer of je Savour Pro hebt of sous-chef bent in dit keukenteam.'
          : 'Opslaan lukte niet; probeer het opnieuw'
    );
    if (error) console.warn('Product opslaan:', error);
    return null;
  }
  const saved = productFromRow(data);
  products = [...products.filter(x => x.id !== saved.id), saved];
  saveOfflineSnapshot();
  return saved;
}

async function deleteProduct(p) {
  if (!demoMode) {
    const { error } = await supabaseClient.from('products').delete().eq('id', p.id);
    if (error) {
      toast('Verwijderen lukte niet; probeer het opnieuw');
      return false;
    }
  }
  products = products.filter(x => x.id !== p.id);
  saveOfflineSnapshot();
  return true;
}

// ---- Scherm Producten & allergenen ----

function productScopes() {
  const teams = (sharedMaps || []).filter(
    m => !m.locked && (demoMode || productsIn(String(m.id)).length || canEditShared(m))
  );
  return [{ id: 'own', name: 'Mijn producten' }, ...teams.map(m => ({ id: String(m.id), name: m.name, team: true }))];
}

// Recepten die bij een lijst horen: je eigen recepten, of de recepten van dat keukenteam.
function recipesForProductScope(scope) {
  if (scope === 'own') return (recipes || []).filter(r => !r.teamId);
  const m = findSharedMap(scope);
  const ids = new Set([...(m?.recipeIds || []), ...(m?.folders || []).flatMap(f => f.recipeIds || [])].map(String));
  return [...(recipes || []), ...(sharedRecipes || [])].filter(
    r => String(r.teamId || '') === scope || ids.has(String(r.id))
  );
}

// Ingrediëntnamen zonder product, met het aantal recepten waarin ze staan.
function productTodo(scope) {
  return productOverview(scope).todo;
}

// In één keer door alle recepten: wat nog te koppelen is, en hoeveel recepten al complete allergenen hebben.
function productOverview(scope) {
  const counts = new Map();
  const byTitle = recipesByTitle({ id: null });
  let complete = 0;
  const indexes = new Map();
  let total = 0;
  for (const r of recipesForProductScope(scope)) {
    const info = recipeAllergenInfo(r, scope, new Set(), byTitle, indexes);
    if (info.lines.length) {
      total++;
      if (!info.unknown.length) complete++;
    }
    const seen = new Set();
    for (const x of info.lines) {
      if (x.status !== 'unknown' || seen.has(x.key)) continue;
      seen.add(x.key);
      const c = counts.get(x.key) || { key: x.key, name: ingredientNameOf(x.line), count: 0 };
      c.count++;
      counts.set(x.key, c);
    }
  }
  const todo = [...counts.values()].sort((a, b) => b.count - a.count || a.key.localeCompare(b.key, 'nl'));
  return { todo, complete, total };
}

function renderProducts() {
  const host = $('productsWrap');
  if (!host) return;
  const scopes = productScopes();
  if (!scopes.some(s => s.id === productScope)) productScope = 'own';
  const scope = productScope;
  const edit = canEditProducts(scope);
  if ($('productsAdd')) $('productsAdd').hidden = !edit;
  if (!productsReady) {
    host.innerHTML =
      '<div class="panel"><p class="muted">Producten en allergenen werken zodra de database is bijgewerkt.</p></div>';
    return;
  }
  if (scope === 'own' && !edit && !productsIn('own').length) {
    host.innerHTML = `${scopes.length > 1 ? productScopeTabs(scopes, scope) : ''}<div class="panel products-pro"><h3>Allergenen per recept <span class="pro-tag">Pro</span></h3><p class="muted">Leg per product de allergenen vast. Savour telt ze op per recept, ook via basisrecepten, en zet ze op je prints. Je ziet altijd welke ingrediënten nog niet gecontroleerd zijn.</p><button class="btn gold" onclick="openProNav()">Savour Pro bekijken</button></div>`;
    return;
  }
  const list = productsIn(scope).sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  const overview = productOverview(scope);
  const { complete, total } = overview;
  // Te algemene namen ("sap", "coulis") apart: Savour weet niet wat erin zit, dus die staan niet tussen de rest.
  const isGeneric = x => ['generic', 'junk'].includes(productFamily(x.key)?.kind);
  const todo = overview.todo.filter(x => !isGeneric(x));
  const vague = overview.todo.filter(isGeneric);
  const unchecked = list.filter(p => !p.known);
  const todoShown = productTodoAll ? todo : todo.slice(0, 12);
  const pct = total ? Math.round((complete / total) * 100) : 0;
  const choosing = edit && productSettingsReady && !productExtras.has(scope);
  const status = `<div class="panel products-status"><p class="products-status-line"><b>${complete}</b> <span>van</span> <b>${total}</b> <span>recepten hebben complete allergenen</span></p><div class="products-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div><p class="products-sum"><span><b>${list.length}</b> producten</span><span><b>${overview.todo.length}</b> namen nog te koppelen</span>${edit && productSettingsReady && productExtras.has(scope) ? `<button type="button" class="btn-quiet products-extras-btn" onclick="chooseAllergenExtras()">Welke allergenen?</button>` : ''}</p>${
    edit && todo.length
      ? `<div class="products-status-action"><button type="button" class="btn gold" onclick="openAutoLink()">Alles automatisch koppelen</button><p class="muted">Savour koppelt elke naam aan het product of eigen recept dat erbij hoort en maakt nieuwe producten met hun allergenen. Je ziet eerst wat er gebeurt.</p></div>`
      : ''
  }${
    edit && list.length > 1
      ? `<p class="products-starter-row"><span>Dubbele of foute producten samenvoegen en verbeteren</span><button type="button" class="btn small" onclick="openProductCleanup()">Producten opruimen</button></p>`
      : ''
  }${
    edit && unchecked.length
      ? `<p class="products-starter-row"><span><b>${unchecked.length}</b> <span>producten nog niet overgenomen</span></span><button type="button" class="btn small" onclick="openUncheckedReview()">Bekijken en overnemen</button></p>`
      : ''
  }</div>`;
  host.innerHTML = `${scopes.length > 1 ? productScopeTabs(scopes, scope) : ''}
    ${choosing ? allergenChoicePanelHtml() : edit ? starterPanelHtml(scope) : ''}
    ${choosing ? '' : status}
    ${
      todo.length && edit
        ? `<div class="panel products-todo"><h3>Nog te koppelen</h3><p class="muted">Namen uit je recepten zonder product, de meest gebruikte bovenaan. Eén keer koppelen geldt voor al je recepten.</p><ul class="products-todo-list">${todoShown.map(x => `<li><span><b translate="no">${esc(x.key)}</b><small>${x.count === 1 ? 'in 1 recept' : `in ${x.count} recepten`}</small></span>${todoButtons(scope, x.key)}</li>`).join('')}</ul>${todo.length > 12 ? `<button type="button" class="btn-quiet" onclick="productTodoAll=!productTodoAll;renderProducts()">${productTodoAll ? 'Minder tonen' : `Alle ${todo.length} tonen`}</button>` : ''}</div>`
        : ''
    }${
      vague.length && edit
        ? `<details class="panel products-todo products-vague"><summary><b>${vague.length}</b> <span>namen zijn te algemeen</span></summary><p class="muted">Bij "sap" of "coulis" weet Savour niet wat erin zit. Staat het in je recept als onderdeel, dan telt het al mee. Anders: koppel het aan een eigen recept of een product. Tot die tijd is dat recept nog niet compleet.</p><ul class="products-todo-list">${vague.map(x => `<li><span><b translate="no">${esc(x.key)}</b><small>${x.count === 1 ? 'in 1 recept' : `in ${x.count} recepten`}</small></span>${todoButtons(scope, x.key)}</li>`).join('')}</ul></details>`
        : ''
    }
    <div class="panel products-list-panel"><div class="products-search"><span>⌕</span><input id="productSearchInput" value="${esc(productSearch)}" placeholder="${esc(t('Zoek een product'))}" autocomplete="off" oninput="productSearch=this.value;renderProductList()"></div><div id="productList"></div></div>`;
  renderProductList();
}

function productScopeTabs(scopes, scope) {
  return `<nav class="settings-tabs products-scopes" aria-label="Productlijst">${scopes.map(s => `<button type="button" class="${s.id === scope ? 'on' : ''}" onclick="productScope='${escJs(s.id)}';productSearch='';productTodoAll=false;renderProducts()"${s.team ? ' translate="no"' : ''}>${esc(s.name)}</button>`).join('')}</nav>`;
}

function renderProductList() {
  const host = $('productList');
  if (!host) return;
  const list = productsIn(productScope).sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  const q = productKey(productSearch);
  const shown = q ? list.filter(p => [p.name, ...p.aliases].some(n => productKey(n).includes(q))) : list;
  host.innerHTML = shown.length
    ? `<ul class="products-list">${shown
        .map(
          p =>
            `<li><button type="button" onclick="openProductFromList('${escJs(p.id)}')"><span class="products-name"><b translate="no">${esc(p.name)}</b>${p.aliases.length ? `<small translate="no">${esc(p.aliases.join(', '))}</small>` : ''}</span><span class="allergen-chips">${p.known ? (shownAllergens(p.allergens, p.scope).length ? allergenChips(shownAllergens(p.allergens, p.scope)) : '<span class="allergen-none">Geen allergenen</span>') : `${shownAllergens(p.allergens, p.scope).length ? allergenChips(shownAllergens(p.allergens, p.scope), 'is-suggested') : ''}<span class="allergen-open">Nog niet overgenomen</span>`}</span></button></li>`
        )
        .join('')}</ul>`
    : `<p class="muted">${list.length ? 'Geen producten gevonden.' : 'Nog geen producten. Koppel hierboven ingrediënten, of voeg een product toe.'}</p>`;
}

async function openProductFromList(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (await openProductEditor({ product: p, scope: p.scope })) renderProducts();
}

async function addProduct() {
  if (await openProductEditor({ scope: productScope })) renderProducts();
}

function todoButtons(scope, key) {
  const p = productSuggestionFor(scope, key);
  const recipe =
    scope === 'own'
      ? `<button type="button" class="btn small" onclick="linkTodoRecipe('${escJs(key)}')">Recept</button>`
      : '';
  if (!p)
    return `<span class="products-todo-actions"><button type="button" class="btn small" onclick="linkTodoIngredient('${escJs(key)}')">Product</button>${recipe}</span>`;
  return `<span class="products-todo-actions"><button type="button" class="btn small gold" onclick="linkTodoTo('${escJs(key)}','${escJs(p.id)}')">Koppelen aan ${esc(p.name)}</button><button type="button" class="btn small" onclick="linkTodoIngredient('${escJs(key)}')">Ander product</button>${recipe}</span>`;
}

// Een naam uit de lijst aan een eigen recept koppelen, in al je recepten tegelijk ("beurre noisette" → je recept).
async function linkTodoRecipe(key) {
  const id = await pickLinkedRecipe({ id: null }, key, null);
  const target = id && findRecipe(id);
  if (!target) return;
  if (await linkNamesToRecipes(productScope, new Map([[key, target]]))) {
    toast(`${key} gekoppeld aan ${target.title}`);
    renderProducts();
  }
}

// Koppelt namen (productKey → recept) in alle eigen recepten van deze lijst. Een regel die al gekoppeld is, of het
// recept zelf, blijft zoals hij is. Geeft het aantal gekoppelde namen.
async function linkNamesToRecipes(scope, targets) {
  if (!targets.size) return 0;
  const linked = new Set();
  for (const r of recipesForProductScope(scope)) {
    if (r.teamId || !Array.isArray(r.ingredients)) continue;
    const links = { ...(r.links || {}) };
    let changed = false;
    for (const line of r.ingredients) {
      const key = ingredientKey(line);
      const target = targets.get(key);
      const name = ingredientNameOf(line).toLowerCase();
      if (!target || String(target.id) === String(r.id) || name in links) continue;
      links[name] = String(target.id);
      linked.add(key);
      changed = true;
    }
    if (changed && (await saveRecipeFields(r, { ingredient_links: links }))) r.links = links;
  }
  return linked.size;
}

async function linkTodoTo(key, id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (await saveProduct({ ...p, aliases: [...p.aliases, key] }, { moveAliasesFrom: true })) renderProducts();
}

async function linkTodoIngredient(key) {
  if (await linkIngredientToProduct(productScope, key, key)) renderProducts();
}

// ---- Welke allergenen houdt deze lijst bij? ----

// Eerste keer: de kok kiest tussen alleen de wettelijke allergenen of aanvullen. Pas daarna de startlijst.
function allergenChoicePanelHtml() {
  return `<div class="panel products-starter"><h3>Welke allergenen wil je bijhouden?</h3><p class="muted">Wettelijk verplicht zijn de 14 allergenen van de EU. Je kunt aanvullen met kenmerken waar gasten vaak naar vragen, zoals lactose, ui, gevogelte of histamine. Je kunt dit later altijd aanpassen.</p><div class="products-choice-actions"><button type="button" class="btn" onclick="setAllergenExtras(productScope, [])">Alleen de 14 wettelijke</button><button type="button" class="btn gold" onclick="chooseAllergenExtras()">Aanvullen</button></div></div>`;
}

function chooseAllergenExtras() {
  const scope = productScope;
  const current = new Set(productExtras.get(scope) || []);
  document.getElementById('extrasChoice')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="extrasChoice" role="dialog" aria-modal="true" aria-labelledby="extrasChoiceTitle"><form class="sv-dialog-box product-editor-box" novalidate>${modalCloseHtml()}<h2 id="extrasChoiceTitle" class="sv-dialog-title">Welke allergenen?</h2><p class="sv-dialog-text">De 14 wettelijke allergenen houdt Savour altijd bij. Vink aan wat je daarnaast wilt zien. Wat je uitzet, blijft bewaard maar zie je niet meer.</p>${ALLERGEN_EXTRA_GROUPS.map(([title, codes]) => `<p class="allergen-pick-head">${esc(title)}</p><div class="allergen-pick">${codes.map(code => `<label class="allergen-pick-item"><input type="checkbox" name="extra" value="${code}" ${current.has(code) ? 'checked' : ''}><span>${esc(ALLERGEN_LABEL.get(code))}</span></label>`).join('')}</div>`).join('')}<button type="button" class="btn-quiet extras-all" data-all>Alles aanvinken</button><div class="sv-dialog-actions"><button type="button" class="btn" data-cancel>Annuleren</button><button type="submit" class="btn gold">Opslaan</button></div></form></div>`
  );
  const el = $('extrasChoice');
  const form = el.querySelector('form');
  const boxes = [...form.querySelectorAll('[name=extra]')];
  const allBtn = form.querySelector('[data-all]');
  const syncAll = () => (allBtn.textContent = t(boxes.every(b => b.checked) ? 'Alles uitvinken' : 'Alles aanvinken'));
  syncAll();
  boxes.forEach(b => b.addEventListener('change', syncAll));
  allBtn.addEventListener('click', () => {
    const on = !boxes.every(b => b.checked);
    boxes.forEach(b => (b.checked = on));
    syncAll();
  });
  const close = () => el.remove();
  form.querySelector('[data-cancel]').addEventListener('click', close);
  closableModal(el, close);
  form.addEventListener('submit', async ev => {
    ev.preventDefault();
    const picked = ALLERGENS.map(a => a[0]).filter(c => boxes.some(b => b.checked && b.value === c));
    if (await setAllergenExtras(scope, picked)) close();
  });
}

async function setAllergenExtras(scope, extras) {
  if (!canEditProducts(scope)) return false;
  if (!demoMode) {
    const forScope = q => (scope === 'own' ? q.eq('user_id', currentUser.id) : q.eq('team_id', scope));
    const { data, error } = await forScope(
      supabaseClient.from('product_settings').update({ allergen_extras: extras })
    ).select('user_id');
    let failed = error;
    if (!failed && !data?.length)
      ({ error: failed } = await supabaseClient.from('product_settings').insert({
        allergen_extras: extras,
        user_id: scope === 'own' ? currentUser.id : null,
        team_id: scope === 'own' ? null : scope
      }));
    if (failed) {
      console.warn('Allergenenkeuze opslaan:', failed);
      toast(
        /does not exist|schema cache|could not find the table|product_settings_extras_check/i.test(failed.message || '')
          ? 'Dit kan zodra de database is bijgewerkt.'
          : 'Opslaan lukte niet; probeer het opnieuw'
      );
      return false;
    }
  }
  productExtras.set(scope, extras);
  saveOfflineSnapshot();
  renderProducts();
  return true;
}

function openProducts() {
  go('products');
}

// Regel op de print: alleen als het recept al producten heeft, zodat wie dit niet gebruikt geen lege regel ziet.
function printAllergensHtml(r) {
  const scope = r.teamId ? String(r.teamId) : 'own';
  if (!productsVisible(scope)) return '';
  const info = recipeAllergenInfo(r, scope);
  if (info.lines.length === info.unknown.length) return '';
  const names = codes => codes.map(a => esc(t(ALLERGEN_LABEL.get(a)))).join(', ');
  const list = names(allergensEu(info.allergens));
  const extra = names(allergensExtra(info.allergens));
  const text = info.unknown.length
    ? `${list ? list + '. ' : ''}<i>${esc(t('Nog niet volledig gecontroleerd.'))}</i>`
    : list || esc(t('Bevat geen van de 14 allergenen.'));
  return `<div class="print-allergens"><b>Allergenen</b> ${text}${extra ? ` <b>${esc(t('Bevat ook'))}</b> ${extra}` : ''}</div>`;
}
