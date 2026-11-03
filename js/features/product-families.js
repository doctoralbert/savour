// Slimmer herkennen (2026-11-03): welk product hoort bij een naam, ook als de naam een vorm, snijwijze, kleur of
// tikfout bevat. "Boerenkool zonder stronk" is boerenkool, "kabeljauwfilet zonder vel" is kabeljauw, "limoenrasp"
// is Limoen en "citroenthijm" is Tijm. Gebruikt door Alles automatisch koppelen en Producten opruimen.
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
    'cooked fresh raw rug schijf schijfjes schijven blokjes plakjes reepjes stukjes'
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
const FAMILY_SUFFIXES = [
  'schijfjes',
  'schijven',
  'schijf',
  'blokjes',
  'plakjes',
  'reepjes',
  'stukjes',
  'partjes',
  'roosjes',
  'rug',
  'coulis',
  'puree',
  'filet',
  'rasp',
  'schil',
  'zeste',
  'blad',
  'sap'
];

// Citrusvruchten en kruiden: één product per soort, met alles wat erbij hoort ("citroensap", "rasp van citroen",
// "gepekelde citroen" → Citroen; "citroentijm" en "bergsteentijm" → Tijm). [naam, namen]. Geen van deze heeft een
// wettelijk allergeen; kruiden met een eigen allergeen (bieslook en daslook: uiachtig, koriander, selderijblad)
// staan er bewust niet in.
const FAMILY_FRUIT = [
  [
    'Appel',
    'appel, elstar, bildstar, granny smith, granny smit, grany smit, jonagold, goudreinet, braeburn, pink lady, golden delicious, boskoop, cox, apple'
  ],
  ['Peer', 'peer, conference, conference peer, doyenne du comice, gieser wildeman, stoofpeer, kweekpeer, pear'],
  ['Citroen', 'citroen, lemon, citron'],
  ['Limoen', 'limoen, lime, limes'],
  ['Sinaasappel', 'sinaasappel, sinasappel, sinaas, sinas, orange, appelsien'],
  ['Bloedsinaasappel', 'bloedsinaasappel, bloedsinasappel, blood orange'],
  ['Mandarijn', 'mandarijn, tangerine, clementine, satsuma'],
  ['Grapefruit', 'grapefruit, pompelmoes'],
  ['Pomelo', 'pomelo'],
  ['Yuzu', 'yuzu'],
  ['Kalamansi', 'kalamansi, kalamansie, calamansi'],
  ['Kumquat', 'kumquat'],
  ['Bergamot', 'bergamot'],
  ['Sudachi', 'sudachi'],
  ['Combava', 'combava, kaffir limoen'],
  ['Duindoornbes', 'duindoornbes, duindoorn, sea buckthorn, argousier']
];
const FAMILY_HERBS = [
  ['Tijm', 'tijm, thijm, citroentijm, citroenthijm, bergsteentijm, bergsteenthijm, wilde tijm, thyme'],
  ['Rozemarijn', 'rozemarijn, rosmarijn, rosemary'],
  ['Salie', 'salie, sage, ananassalie'],
  ['Basilicum', 'basilicum, thaise basilicum, citroenbasilicum, paarse basilicum, griekse basilicum, basil'],
  ['Munt', 'munt, pepermunt, watermunt, marokkaanse munt, nana munt, appelmunt, muntblad, mint'],
  ['Munt verbena', 'munt verbena, argentijnse munt verbena'],
  ['Peterselie', 'peterselie, bladpeterselie, krulpeterselie, platte peterselie, peterseliestelen, parsley'],
  ['Kervel', 'kervel, cerfeuil, chervil'],
  ['Dragon', 'dragon, estragon, tarragon'],
  ['Dille', 'dille, dill'],
  ['Venkelgroen', 'venkelgroen, venkelloof'],
  ['Laurier', 'laurier, laurierblad, laurierblaadje, bay leaf'],
  ['Lavas', 'lavas, maggiplant, lovage'],
  ['Marjolein', 'marjolein, majoraan, marjoraan'],
  ['Oregano', 'oregano, wilde marjolein'],
  ['Citroenmelisse', 'citroenmelisse, melisse'],
  ['Citroengras', 'citroengras, sereh, serreh, lemongrass'],
  ['Citroenverbena', 'citroenverbena, verveine'],
  ['IJzerkruid', 'ijzerkruid'],
  [
    'Limoenblad',
    'limoenblad, limoenblaadje, kaffir limoenblad, kaffirlimoenblad, djeroek poeroet, djeroek purut, makrut, ' +
      'kaffir, kaffier, keffir, kaffir blad, kaffierblad, kaffier blad, keffir blad, kaffirblad'
  ],
  ['Galangal', 'galangal, galanga, galangel, laos, lengkuas, kencur'],
  ['Gember', 'gember, gemberwortel, verse gember, ginger'],
  ['Pandan', 'pandan, pandanblad, pandan blad'],
  ['Citroenkruid', 'citroenkruid'],
  ['Bergmunt', 'bergmunt'],
  ['Citroenblad', 'citroenblad, citroenblaadje'],
  ['Curryblad', 'curryblad, kerrieblad'],
  ['Shiso', 'shiso, perilla'],
  ['Zuring', 'zuring, veldzuring, bloedzuring, sorrel'],
  ['Bonenkruid', 'bonenkruid, bonnenkruid'],
  ['Hysop', 'hysop'],
  ['Lavendel', 'lavendel'],
  ['Kamille', 'kamille'],
  ['Bernagie', 'bernagie, komkommerkruid'],
  ['Pimpernel', 'pimpernel'],
  ['Oost-Indische kers', 'oost indische kers, oost indisch kers, capucine, nasturtium'],
  ['Tuinkers', 'tuinkers, cress'],
  ['Waterkers', 'waterkers, watercress'],
  // Zeekruiden en wilde kruiden.
  ['Zeekraal', 'zeekraal, salicornia'],
  ['Lamsoor', 'lamsoor'],
  ['Zeevenkel', 'zeevenkel'],
  ['Oesterblad', 'oesterblad, oysterleaf'],
  ['IJskruid', 'ijskruid, ijsplant'],
  ['Postelein', 'postelein, winterpostelein, claytonia'],
  ['Duizendblad', 'duizendblad'],
  ['Brandnetel', 'brandnetel'],
  ['Vogelmuur', 'vogelmuur'],
  ['Zevenblad', 'zevenblad'],
  ['Hondsdraf', 'hondsdraf'],
  ['Vlierbloesem', 'vlierbloesem, vlierbloem'],
  ['Viooltjes', 'viooltje, viola'],
  ['Goudsbloem', 'goudsbloem, calendula'],
  ['Anijsplant', 'anijsplant, anijsblad'],
  ['Agastache', 'agastache, anijsnetel']
];
// Mag bij een citrusvrucht of kruid staan zonder dat het een ander product wordt.
const FAMILY_PRODUCE_WORDS = new Set(
  (
    'gepekelde gepekeld geperste geperst geblancheerde geblancheerd gekneusd gekneusde chiffonade stelen steel ' +
    'steeltjes bosje bosjes bos takken tak kwart halve een van de het tuin droog gedroogd gedroogde plat platte ' +
    'krul stuks stukken plakken plak zestes roze citrus bl bloemen bloem bloesem blaadjes partje schijfje gesneden ' +
    'gehakt gehakte fijngehakt gerasp bladeren en of tops zaad zaadjes vriezer heel mild zoet zure zuur'
  ).split(' ')
);

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
      'eigenheimer, frieslander, annabelle, krieltjes, kriel, potato, violet aardappel, violetaardappel, ' +
      'la ratte aardappel, roseval aardappel'
  ],
  [
    'Bouquet (wortel, ui, prei, knolselderij)',
    ['selderij', 'ui'],
    'bouquet, bouquet groenten, bouquet garni, mirepoix'
  ],
  ['Iota (Texturas)', [], 'iota, ilota, iota carrageen'],
  ['Kappa (Texturas)', [], 'kappa, kappa carrageen'],
  ['Gellan (Texturas)', [], 'gellan'],
  ['Xanthaan', [], 'xanthaan, xantana, xanthan, xantaan, xanthaangom, xanthan gum'],
  ['Algin (Texturas)', [], 'algin'],
  ['Calcic (Texturas)', [], 'calcic'],
  ['Gluco (Texturas)', [], 'gluco'],
  ['Lecite (Texturas)', ['soja'], 'lecite'],
  [
    'Pro Espuma Cold',
    ['melk', 'lactose'],
    'pro espuma, pro espuma cold, pro espuma koud, por espuma, proespuma, proesuma, proespuma per'
  ],
  [
    'Pro Espuma Hot',
    [],
    'pro espuma hot, pro espuma warm, pro espuma caliente, proespuma calent, proespuma caliente, proespuma hot'
  ],
  ['Beurre noisette', ['melk', 'lactose'], 'beurre noisette, bruine boter'],
  [
    'Sla',
    [],
    'sla, kropsla, botersla, ijsbergsla, eikenbladsla, rode eikenbladsla, bindsla, romaine, romeinse sla, ' +
      'little gem, lollo rosso, lollo bionda, frisée, friseesla, krulsla, veldsla, mesclun, pluksla, slamix'
  ],
  ['IJsblokjes', [], 'ijsblokje, ijsklontje, ijsklont, crushed ice, gemalen ijs, ice cubes'],
  ['Tonic', [], 'tonic, tonic water, tonicwater, indian tonic'],
  ['Bruiswater', [], 'bruiswater, spuitwater, sodawater, soda water, spa rood, mineraalwater bruis'],
  // Couverture is chocolade: dezelfde producten als in de startlijst.
  ['Melkchocolade', ['melk', 'lactose', 'soja'], 'melkchocolade, melkcouverture, melk couverture, couverture melk'],
  [
    'Pure chocolade',
    ['soja'],
    'pure chocolade, puur chocolade, chocolade puur, pure couverture, puur couverture, couverture puur, donkere couverture'
  ],
  [
    'Witte chocolade',
    ['melk', 'lactose', 'soja'],
    'witte chocolade, chocolade witte, witte couverture, couverture wit'
  ],
  [
    'Zelfrijzend bakmeel',
    ['gluten'],
    'zelfrijzend bakmeel, zelfrijzendbakmeel, zelfrijzende bloem, self raising flour'
  ],
  ['Eiwit', ['ei'], 'eiwit, egg white, gepasteuriseerd eiwit'],
  ['Eidooier', ['ei'], 'eidooier, dooier, eigeel, eigele, eigelen, egg yolk, yolk'],
  ['Ei', ['ei'], 'ei, eieren, egg, eggs, scharrelei, kippenei'],
  [
    'Tomaat',
    ['nachtschade', 'histamine'],
    'tomaat, trostomaat, cherrytomaat, pelati, pelatti, pomodori pelati, tomato'
  ],
  ['Wortel', [], 'wortel, peen, bospeen, winterwortel, waspeen, bundelwortel, carrot'],
  ['Cornichons', [], 'cornichon, chornison, cornichon zuur'],
  ['Sojasaus', ['gluten', 'soja'], 'sojasaus, soja saus, soya saus, soy sauce, kikkoman, kikoman, kikkoman soja'],
  ['Oestersaus', ['weekdieren', 'gluten', 'soja'], 'oestersaus, oyster sauce, oystersauce'],
  ['Trasi', ['schaaldieren'], 'trasi, terasi, belacan, garnalenpasta'],
  ['Kimchi', ['vis', 'schaaldieren'], 'kimchi'],
  ['Tom yam pasta', ['schaaldieren', 'vis'], 'tom yam, tom yum, tom yam pasta'],
  ['Shichimi togarashi', ['sesam'], 'togarashi, shichimi, shichimi togarashi'],
  ['Pedro Ximénez', ['sulfiet', 'alcohol'], 'px, pedro ximenez, pedro ximenes, pedro ximénez, px sherry'],
  ['Noilly Prat', ['sulfiet', 'alcohol'], 'noilly prat, nouilly prat, nouily prat, nollyprat, noilly'],
  ['Baileys', ['melk', 'lactose', 'alcohol'], 'baileys, bailey, bailey s'],
  ['Advocaat', ['ei', 'alcohol'], 'advocaat'],
  ['Gastrique', ['sulfiet'], 'gastric, gastrique'],
  ['Zoetzuur', ['sulfiet'], 'zoetzuur, zoet zuur, zoetzuur basis, zoet zuur basis, zoet zuur mild'],
  ['Jus de veau', ['rundvlees'], 'jdv, jus de veau, jus d veau, jus de veaux'],
  ['Merg', ['rundvlees'], 'merg, beenmerg, mergpijp'],
  ['Palmsuiker', [], 'palmsuiker, palm sugar, gula djawa, gula jawa, gula kelapa, gula merah'],
  ['Raapzaadolie', [], 'raapzaadolie, rapsodie, rapsoli, koolzaadolie'],
  ['Nootmuskaat', [], 'nootmuskaat, mootmuskaat, muskaatnoot, nutmeg'],
  ['Tonkaboon', [], 'tonka, tonkaboon, tonka poeder'],
  ['Szechuanpeper', [], 'szechuan, szechuanpeper, sichuan peper, sichuanpeper'],
  ['Aonori', [], 'aonori'],
  ['Custard', ['melk', 'lactose', 'ei'], 'custard'],
  ['Hangop', ['melk', 'lactose'], 'hangop'],
  ['Hummus', ['peulvruchten', 'sesam'], 'hummus, humus'],
  ['Sushi azijn', ['sulfiet'], 'sushi azijn, sushi su, mizkan, mitsukan'],
  ['Verjus', ['sulfiet'], 'verjus'],
  // Texturas en andere hulpmiddelen uit de moderne keuken.
  ['Citras (Texturas)', [], 'citras'],
  ['Elastic (Sosa)', [], 'elastic, elastique'],
  ['Instant gel', [], 'instangel, instant gel'],
  ['Dextrose', [], 'dextrose, dextrosepoeder, druivensuiker'],
  ['Maltodextrine', [], 'malto, maltopoeder, maltodextrine'],
  ['Isomalt', [], 'isomalt, isomaltose'],
  ['Transglutaminase', [], 'transglutaminase, transglutaminaat, activa'],
  ['Tapioca', [], 'tapioca, tapiocapoeder, tapiocazetmeel'],
  ['Roux', ['gluten'], 'roux, roux korrels'],
  // Gemengde kruiden, of twee kruiden samen ("tijm rozemarijn laurier"): zie productFamily.
  [
    'Kruiden',
    [],
    'kruiden, verse kruiden, tuinkruiden, fijne kruiden, fines herbes, gemengde kruiden, bos kruiden, kruiden na keuze, ' +
      'provençaalse kruiden, italiaanse kruiden, herbes de provence'
  ]
];

// Te algemeen om te weten wat erin zit: welk sap, welke olie? Savour maakt hier geen product van.
const FAMILY_GENERIC = new Set(
  (
    'citrus, sap, coulis, couli, puree, saus, jus, fond, bouillon, olie, siroop, gel, creme, crème, deeg, vulling, ' +
    'glazuur, basis, massa, mix, poeder, schuim, crumble, dressing, marinade, vinaigrette, garnituur, garnering, ' +
    'decoratie, fruit, vruchten, groente, groenten, specerijen, vocht, kookvocht, smaakstoffen, ijs, fruit coulis, ' +
    'vruchten coulis, vruchten puree, rood fruit, rood fruit coulis, gedroogde fruit, fruit couli boiron, droge puree, ' +
    'circa, bodem, appareil, aanmaak, drank, terrine, boiron couli, karamel, caramel, basis karamel, tipo, ' +
    'diverse paddenstoelen, gedroogde paddenstoelen, kookvocht, blancheer vocht, liquor'
  ).split(', ')
);

// Geen ingrediënt maar een stukje uitleg of rekenwerk dat in de naam terecht is gekomen. Een lege hoeveelheid
// ervoor ("…. gram wasabi poeder") haalt productKey al weg; dan blijft het gewoon een product.
const FAMILY_JUNK =
  /^(per|al|aan|en|op|recept is|op basis)(\s|$)|(^|\s)(mengen|maken|zie|bruineren|in de oven|magimix|cut small|van de zelfde|laten trekken|leggen|verwerken|spatelen|snijden|verwijderen|besmeren|aanmaken|inkoken|verwarmen|patronen|houtskool|houtsnippers|aluminiumfolie|bakpapier|plastic|siliconen|gastronorm|kooltjes|slussi|\d+c)($|\s)/;

// Enkelvoud en meervoud gelijk maken: peren/peer → per, abrikozen/abrikoos → abrikos, olijven/olijf → olijf.
function familyStem(word) {
  let s = word.replace(/['’]s$/, '');
  // "citroenen" → "citroen" → "citro", net als "citroen"; "duindoornbessen" en "duindoornbes" komen ook samen.
  while (s.length > 4 && s.endsWith('en')) s = s.slice(0, -2);
  s = s.replace(/z$/, 's').replace(/v$/, 'f');
  s = s.replace(/([^aeiou])\1$/, '$1');
  if (s.length > 4) s = s.replace(/s$/, '');
  return s.replace(/([aeou])\1/g, '$1');
}
const familyStemKey = key => key.split(' ').filter(Boolean).map(familyStem).join(' ');

let familyIndex = null;
// Opzoeklijsten, één keer opgebouwd: woordstam (zonder spaties) → groep, vissoort of vakkennis.
function familyLookup() {
  if (familyIndex) return familyIndex;
  const list = text => text.split(', ').map(n => familyStemKey(n).replace(/ /g, ''));
  const produce = new Map();
  for (const [name, names] of FAMILY_FRUIT) for (const n of list(names)) produce.set(n, { name, allergens: [] });
  for (const [name, names] of FAMILY_HERBS)
    for (const n of list(names)) produce.set(n, { name, allergens: [], herb: true });
  const fish = new Map();
  for (const [name, code, names] of FAMILY_FISH) for (const n of list(names)) fish.set(n, { name, allergens: [code] });
  const known = new Map();
  for (const [name, allergens, names] of FAMILY_KNOWN) for (const n of list(names)) known.set(n, { name, allergens });
  familyIndex = { produce, fish, known };
  return familyIndex;
}

// Haalt vormen, kleuren en "zonder vel" weg en splitst "citroensap" in "citroen sap". Geeft de woorden die
// overblijven; leeg als er alleen vormen stonden.
function familyCoreWords(key) {
  const keepColor = FAMILY_KEEP_COLOR.test(key);
  const { produce, fish, known } = familyLookup();
  const whole = w => produce.has(familyStem(w)) || fish.has(familyStem(w)) || known.has(familyStem(w));
  const words = key
    .replace(/['’`.→!?]/g, ' ')
    .replace(/[-/]/g, ' ')
    .split(' ')
    .filter(w => /[a-zà-ÿ0-9]/.test(w))
    .flatMap(w => {
      // "Limoenblad" is een eigen kruid; "limoensap" is limoen plus sap.
      if (whole(w)) return [w];
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
// naam zonder spaties, in enkelvoud. kind: 'junk', 'generic', 'produce', 'fish', 'known' of 'base' (de naam zonder
// vormen: "Boerenkool").
function productFamily(name) {
  const key = productKey(name);
  if (!key) return null;
  const nothing = kind => ({ key: '', name: '', allergens: [], kind });
  if (FAMILY_JUNK.test(key)) return nothing('junk');
  if (FAMILY_GENERIC.has(key)) return nothing('generic');
  const { produce, fish, known } = familyLookup();
  const compact = words => words.map(familyStem).join('');
  const own = (hit, kind) => ({
    key: compact(productKey(hit.name).split(' ')),
    name: hit.name,
    allergens: hit.allergens || [],
    kind
  });
  const whole = compact(key.replace(/[-/]/g, ' ').split(' ').filter(Boolean));
  if (known.has(whole)) return own(known.get(whole), 'known');
  if (produce.has(whole)) return own(produce.get(whole), 'produce');
  if (fish.has(whole)) return own(fish.get(whole), 'fish');
  // "Jus d'orange", "sap van witte grapefruit" en "van mozzarella".
  const plain = key.replace(
    /^(jus d e |jus de |jus d |sap en rasp van |rasp en sap van |sap van (de )?|rasp van |schil van |wit van |van )/,
    ''
  );
  const core = familyCoreWords(plain);
  if (!core.length || FAMILY_GENERIC.has(core.join(' '))) return nothing('generic');
  const coreKey = compact(core);
  if (known.has(coreKey)) return own(known.get(coreKey), 'known');
  if (produce.has(coreKey)) return own(produce.get(coreKey), 'produce');
  if (fish.has(coreKey)) return own(fish.get(coreKey), 'fish');
  // Citrus en kruiden per woord, eerst twee woorden samen ("citroen tijm" is tijm). Staat er verder alleen iets als
  // "gepekelde" of "bosje", dan is het die vrucht of dat kruid. Meerdere kruiden samen zijn Kruiden.
  const hits = [];
  let other = false;
  for (let i = 0; i < core.length; i++) {
    const pair = i + 1 < core.length && produce.get(familyStem(core[i] + core[i + 1]));
    if (pair) {
      hits.push(pair);
      i++;
      continue;
    }
    const hit = produce.get(familyStem(core[i]));
    if (hit) hits.push(hit);
    else if (!FAMILY_PRODUCE_WORDS.has(core[i])) other = true;
  }
  if (hits.length && !other) {
    if (new Set(hits.map(h => h.name)).size === 1) return own(hits[0], 'produce');
    if (hits.every(h => h.herb)) return own(known.get(familyStem('kruiden')), 'known');
  }
  const stems = core.map(familyStem);
  const fishHit = stems.map(s => fish.get(s)).find(Boolean);
  if (fishHit && core.every((w, i) => fish.has(stems[i]) || FAMILY_FISH_WORDS.has(w))) return own(fishHit, 'fish');
  return { key: coreKey, name: capitalizeFirst(core.join(' ')), allergens: [], kind: 'base' };
}

const capitalizeFirst = s => s.charAt(0).toLocaleUpperCase('nl-NL') + s.slice(1);
