// Slimmer herkennen (2026-11-03): welk product hoort bij een naam, ook als de naam een vorm, snijwijze, kleur of
// tikfout bevat. "Boerenkool zonder stronk" is boerenkool, "kabeljauwfilet zonder vel" is kabeljauw, "limoenrasp"
// valt onder Citrus en "citroenthijm" onder Kruiden. Gebruikt door Alles automatisch koppelen en Producten opruimen.
// Allergenen van samengevoegde producten tellen altijd op: liever een allergeen te veel dan te weinig.

// Vormen, bewerkingen en kleuren: hetzelfde product met dezelfde allergenen. "Gedroogd" en "gerookt" staan hier
// bewust niet: gedroogd fruit bevat vaak sulfiet, gerookt vlees histamine.
const FAMILY_FORM_WORDS = new Set(
  (
    'coulis couli coullis puree purée pulp vruchtvlees sap juice rasp schil zeste zest blad bladeren blaadjes ' +
    'blaadje takjes takje toppen top roosjes filet filets moot moten loin loins rugfilet staart wang wangen kop ' +
    'koppen vlees kookvocht vocht afval flakes vlokken schoon schone verse vers rauwe rauw diepvries bevroren ' +
    'ontdooide geel gele groen groene rood rode wit witte zwart zwarte bruin bruine blauw blauwe pitten gepelde ' +
    'gepeld gedopte heel hele gezouten ongezouten geroosterd geroosterde gepofte gegaarde gegaard gekookt gekookte ' +
    'gebakken bolletjes partjes parten segmenten kook gesnipperd fijn grof dun dunne half ring stengels stengel ' +
    'cooked fresh raw'
  ).split(' ')
);
// Woorden die samen met het volgende woord wegvallen: "zonder vel", "uit blik", "met schil".
const FAMILY_SKIP_NEXT = new Set(['zonder', 'met', 'uit', 'op', 'in']);
// Bij chocolade zegt de kleur wel iets: witte chocolade bevat melk, pure niet altijd.
const FAMILY_KEEP_COLOR = /chocolade|chocolate|choco/;
const FAMILY_COLORS = new Set(
  'geel gele groen groene rood rode wit witte zwart zwarte bruin bruine blauw blauwe'.split(' ')
);
// Achter een woord geplakt: "citroensap", "bloemkoolroosjes", "kabeljauwfilet".
const FAMILY_SUFFIXES = ['roosjes', 'coulis', 'puree', 'filet', 'rasp', 'schil', 'zeste', 'blad', 'sap'];

const FAMILY_GROUPS = [
  {
    name: 'Citrus',
    members:
      'citrus, citroen, limoen, lime, lemon, sinaasappel, orange, bloedsinaasappel, mandarijn, tangerine, ' +
      'clementine, grapefruit, pompelmoes, pomelo, yuzu, bergamot, kalamansi, calamansi, kumquat, sudachi, ' +
      'combava, duindoornbes'
  },
  {
    // Zonder kruiden met een eigen allergeen: bieslook en daslook (uiachtig), koriander, selderijblad.
    name: 'Kruiden',
    members:
      'kruiden, tuinkruiden, fijne kruiden, gemengde kruiden, bos kruiden, kruiden na keuze, provençaalse kruiden, ' +
      'italiaanse kruiden, peterselie, bladpeterselie, krulpeterselie, platte peterselie, kervel, dragon, estragon, ' +
      'basilicum, thaise basilicum, citroenbasilicum, munt, pepermunt, watermunt, marokkaanse munt, muntblad, ' +
      'citroenmelisse, melisse, tijm, thijm, citroentijm, citroenthijm, bergsteentijm, bergsteenthijm, rozemarijn, ' +
      'salie, oregano, marjolein, majoraan, laurier, laurierblad, lavas, maggiplant, dille, venkelgroen, bonenkruid, ' +
      'hysop, shiso, zuring, veldzuring, bloedzuring, citroengras, citroenverbena, verveine, ijzerkruid, ' +
      'argentijnse munt verbena, munt verbena, kaffir limoenblad, limoenblad, citroenblad, curryblad, lavendel'
  }
];

// Vis, schaal- en weekdieren: één product per soort. [naam, allergeen, namen]
const FAMILY_FISH = [
  ['Kabeljauw', 'vis', 'kabeljauw, skrei, bakkeljauw'],
  ['Heilbot', 'vis', 'heilbot'],
  ['Tarbot', 'vis', 'tarbot'],
  ['Griet', 'vis', 'griet'],
  ['Zalm', 'vis', 'zalm, salmon'],
  ['Zalmforel', 'vis', 'zalmforel'],
  ['Forel', 'vis', 'forel, regenboogforel, beekforel'],
  ['Zeebaars', 'vis', 'zeebaars, loup de mer'],
  ['Zeebrasem', 'vis', 'zeebrasem, dorade'],
  ['Tonijn', 'vis', 'tonijn, tuna'],
  ['Makreel', 'vis', 'makreel'],
  ['Haring', 'vis', 'haring'],
  ['Sardine', 'vis', 'sardine, sardientje'],
  ['Ansjovis', 'vis', 'ansjovis'],
  ['Schol', 'vis', 'schol'],
  ['Tong', 'vis', 'tong, zeetong, sliptong'],
  ['Rog', 'vis', 'rog, rogvleugel'],
  ['Poon', 'vis', 'poon'],
  ['Mul', 'vis', 'mul, rode mul'],
  ['Koolvis', 'vis', 'koolvis, pollak'],
  ['Wijting', 'vis', 'wijting'],
  ['Schelvis', 'vis', 'schelvis'],
  ['Heek', 'vis', 'heek'],
  ['Zeeduivel', 'vis', 'zeeduivel, lotte'],
  ['Snoekbaars', 'vis', 'snoekbaars'],
  ['Paling', 'vis', 'paling'],
  ['Zwaardvis', 'vis', 'zwaardvis'],
  ['Steur', 'vis', 'steur'],
  ['Kaviaar', 'vis', 'kaviaar'],
  ['Katsuobushi', 'vis', 'katsuobushi, bonito'],
  ['Garnalen', 'schaaldieren', 'garnaal, garnalen'],
  ['Gamba', 'schaaldieren', 'gamba'],
  ['Langoustine', 'schaaldieren', 'langoustine'],
  ['Kreeft', 'schaaldieren', 'kreeft'],
  ['Krab', 'schaaldieren', 'krab, snow crab, king crab, noordzeekrab'],
  ['Mosselen', 'weekdieren', 'mossel'],
  ['Oesters', 'weekdieren', 'oester'],
  ['Coquilles', 'weekdieren', 'coquille, sint jakobsschelp, jakobsschelp'],
  ['Octopus', 'weekdieren', 'octopus'],
  ['Inktvis', 'weekdieren', 'inktvis, pijlinktvis, calamaris, sepia']
];
// Mag bij een vissoort staan zonder dat het een ander product wordt.
const FAMILY_FISH_WORDS = new Set(
  'gerookte gerookt gemarineerde noorse schotse wilde hollandse zeeuwse atlantische gepekelde zijde huid vel been graat graten'.split(
    ' '
  )
);

// Vakkennis: wat de naam niet zegt, maar een kok wel weet. [naam, allergenen, namen]
const FAMILY_KNOWN = [
  [
    'Aardappel',
    ['nachtschade'],
    'aardappel, bonk, bintje, agria, opperdoezer, opperdoezer ronde, nicola, ratte, la ratte, roseval, vitelotte, ' +
      'eigenheimer, frieslander, annabelle, krieltjes, kriel, potato'
  ],
  [
    'Bouquet (wortel, ui, prei, knolselderij)',
    ['selderij', 'ui'],
    'bouquet, bouquet groenten, bouquet garni, mirepoix'
  ],
  ['Iota (Texturas)', [], 'iota, iota carrageen'],
  ['Kappa (Texturas)', [], 'kappa, kappa carrageen'],
  ['Gellan (Texturas)', [], 'gellan'],
  ['Xanthaan', [], 'xanthaan, xantana, xanthan, xantaan'],
  ['Algin (Texturas)', [], 'algin'],
  ['Calcic (Texturas)', [], 'calcic'],
  ['Gluco (Texturas)', [], 'gluco'],
  ['Lecite (Texturas)', ['soja'], 'lecite'],
  ['Pro Espuma Cold', ['melk', 'lactose'], 'pro espuma, pro espuma cold, pro espuma koud'],
  ['Pro Espuma Hot', [], 'pro espuma hot, pro espuma warm, pro espuma caliente'],
  ['Beurre noisette', ['melk', 'lactose'], 'beurre noisette, bruine boter']
];

// Te algemeen om te weten wat erin zit: welk sap, welke olie? Savour maakt hier geen product van.
const FAMILY_GENERIC = new Set(
  (
    'sap, coulis, couli, puree, saus, jus, fond, bouillon, olie, siroop, gel, creme, crème, deeg, vulling, ' +
    'glazuur, basis, massa, mix, poeder, schuim, crumble, dressing, marinade, vinaigrette, garnituur, garnering, ' +
    'decoratie, fruit, vruchten, groente, groenten, specerijen, vocht, kookvocht, smaakstoffen, ijs, fruit coulis, ' +
    'vruchten coulis, vruchten puree, rood fruit, rood fruit coulis, gedroogde fruit, fruit couli boiron, droge puree'
  ).split(', ')
);

// Geen ingrediënt maar een stukje uitleg of rekenwerk dat in de naam terecht is gekomen.
const FAMILY_JUNK =
  /=|:$|^(of|x|b|per|al|aan|en)\s|^[….\d]|(^|\s)(mengen|maken|zie|bruineren|in de oven|magimix|cut small|van de zelfde)($|\s)/;

// Enkelvoud en meervoud gelijk maken: peren/peer → per, abrikozen/abrikoos → abrikos, olijven/olijf → olijf.
function familyStem(word) {
  let s = word.replace(/['’]s$/, '');
  if (s.length > 4) s = s.replace(/(en|s)$/, '');
  s = s.replace(/z$/, 's').replace(/v$/, 'f');
  s = s.replace(/([^aeiou])\1$/, '$1');
  return s.replace(/([aeou])\1/g, '$1');
}
const familyStemKey = key => key.split(' ').filter(Boolean).map(familyStem).join(' ');

let familyIndex = null;
// Opzoeklijsten, één keer opgebouwd: woordstam (zonder spaties) → groep, vissoort of vakkennis.
function familyLookup() {
  if (familyIndex) return familyIndex;
  const list = text => text.split(', ').map(n => familyStemKey(n).replace(/ /g, ''));
  const members = new Map();
  for (const g of FAMILY_GROUPS) for (const n of list(g.members)) members.set(n, g);
  const fish = new Map();
  for (const [name, code, names] of FAMILY_FISH) for (const n of list(names)) fish.set(n, { name, allergens: [code] });
  const known = new Map();
  for (const [name, allergens, names] of FAMILY_KNOWN) for (const n of list(names)) known.set(n, { name, allergens });
  familyIndex = { members, fish, known };
  return familyIndex;
}

// Haalt vormen, kleuren en "zonder vel" weg en splitst "citroensap" in "citroen sap". Geeft de woorden die
// overblijven; leeg als er alleen vormen stonden.
function familyCoreWords(key) {
  const keepColor = FAMILY_KEEP_COLOR.test(key);
  const words = key
    .replace(/['’`]/g, ' ')
    .replace(/[-/]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .flatMap(w => {
      const suffix = FAMILY_SUFFIXES.find(s => w.length > s.length + 2 && w.endsWith(s));
      return suffix ? [w.slice(0, -suffix.length), suffix] : [w];
    });
  const core = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (FAMILY_SKIP_NEXT.has(w) && i > 0) {
      i++;
      continue;
    }
    if (FAMILY_COLORS.has(w) && keepColor) core.push(w);
    else if (!FAMILY_FORM_WORDS.has(w)) core.push(w);
  }
  return core;
}

// Het product waar een naam bij hoort volgens deze regels: { key, name, allergens, kind } of null. De key is de
// naam zonder spaties, in enkelvoud. kind: 'junk', 'generic', 'group', 'fish', 'known' of 'base' (de naam zonder
// vormen: "Boerenkool").
function productFamily(name) {
  const key = productKey(name);
  if (!key) return null;
  const nothing = kind => ({ key: '', name: '', allergens: [], kind });
  if (FAMILY_JUNK.test(String(name).toLowerCase().trim()) || FAMILY_JUNK.test(key)) return nothing('junk');
  if (FAMILY_GENERIC.has(key)) return nothing('generic');
  const { members, fish, known } = familyLookup();
  const compact = words => words.map(familyStem).join('');
  const own = (hit, kind) => ({
    key: compact(productKey(hit.name).split(' ')),
    name: hit.name,
    allergens: hit.allergens || [],
    kind
  });
  const whole = compact(key.replace(/[-/]/g, ' ').split(' ').filter(Boolean));
  if (known.has(whole)) return own(known.get(whole), 'known');
  if (members.has(whole)) return own(members.get(whole), 'group');
  if (fish.has(whole)) return own(fish.get(whole), 'fish');
  // "Jus d'orange", "sap van witte grapefruit" en "van mozzarella".
  const plain = key.replace(/^(jus d e |jus de |jus d |sap van (de )?|van )/, '');
  const core = familyCoreWords(plain);
  if (!core.length || FAMILY_GENERIC.has(core.join(' '))) return nothing('generic');
  const coreKey = compact(core);
  if (known.has(coreKey)) return own(known.get(coreKey), 'known');
  if (members.has(coreKey)) return own(members.get(coreKey), 'group');
  if (fish.has(coreKey)) return own(fish.get(coreKey), 'fish');
  const stems = core.map(familyStem);
  if (stems.every(s => members.has(s))) return own(members.get(stems[0]), 'group');
  const fishHit = stems.map(s => fish.get(s)).find(Boolean);
  if (fishHit && core.every((w, i) => fish.has(stems[i]) || FAMILY_FISH_WORDS.has(w))) return own(fishHit, 'fish');
  return { key: coreKey, name: capitalizeFirst(core.join(' ')), allergens: [], kind: 'base' };
}

const capitalizeFirst = s => s.charAt(0).toLocaleUpperCase('nl-NL') + s.slice(1);
