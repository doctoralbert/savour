// Startlijst producten (2026-11-03): veelgebruikte keukenproducten met hun allergenen, zodat een kok niet bij nul
// begint. Samengesteld uit de ingrediënten die in professionele recepten het vaakst voorkomen.
//
// Betrouwbaar: alles komt binnen als "nog te controleren". Enkelvoudige producten (zout, ei, slagroom) kan de kok
// na het bekijken in één keer bevestigen; merkafhankelijke producten (label: true) kijkt hij per stuk na op het
// etiket. Fonds, gelatine en chocolade hangen af van de keuken; daar stelt Savour eerst een vraag over.

const STARTER_PRODUCTS = (() => {
  const b = (name, allergens = [], aliases = []) => ({ name, allergens, aliases, label: false });
  const e = (name, allergens = [], aliases = []) => ({ name, allergens, aliases, label: true });
  const ml = ['melk', 'lactose'];
  return [
    // Zuivel en ei
    b('Slagroom', ml, ['geslagen room', 'lobbige room']),
    b('Room', ml),
    b('Melk', ml, ['volle melk']),
    b('Koksroom', ml, ['kookroom']),
    b('Roomboter', ml, ['boter', 'ongezouten boter']),
    b('Gezouten boter', ml),
    b('Yoghurt', ml, ['volle yoghurt']),
    b('Griekse yoghurt', ml),
    b('Karnemelk', ml),
    b('Kwark', ml),
    b('Mascarpone', ml),
    b('Crème fraîche', ml, ['creme fraiche', 'crème fraiche', 'creme fraîche', 'creme friash']),
    b('Roomkaas', ml),
    b('Geitenkaas', ml),
    b('Parmezaanse kaas', ['melk'], ['parmezaan', 'parmigiano', 'parmigiano reggiano']),
    b('Eidooier', ['ei'], ['dooier', 'dooiers', 'eigeel', 'eidooiers']),
    b('Eiwit', ['ei'], ['eiwitten']),
    b('Ei', ['ei'], ['eieren', 'heel ei', 'ei heel', 'hele eieren']),
    e('Flora', ['peulvruchten'], ['flora plantaardig']),
    // Textuur (Sosa en vergelijkbaar)
    b('Albumina', ['ei']),
    b('Cortina'),
    b('Vegetal'),
    b('Xantana', [], ['xanthaan']),
    b('Procrema', [], ['pro crema']),
    b('Pro Espuma Cold', ml),
    b('Pro Espuma Hot', [], ['pro espuma warm', 'proespuma warm']),
    b('Pro Sorbet', [], ['prosorbet']),
    b('Malto', [], ['maltodextrine']),
    b('Sucro'),
    // Suiker en zoet
    b('Suiker', [], ['kristalsuiker', 'witte suiker', 'fijne suiker']),
    b('Poedersuiker', [], ['poeder suiker']),
    b('Glucose', [], ['glucosestroop', 'glucose stroop', 'glucosesiroop']),
    b('Witte basterdsuiker', [], ['witte basterd suiker', 'witte basterd']),
    b('Bruine basterdsuiker', [], ['bruine basterd suiker', 'bruine basterd']),
    b('Rietsuiker'),
    b('Honing'),
    b('Palmsuiker', [], ['gula djawa', 'gula jawa']),
    b('Geleisuiker', [], ['gelei suiker']),
    b('Stroop'),
    b('Ahornsiroop', [], ['ahorn siroop']),
    e('Gembersiroop', [], ['gember siroop']),
    e('Vlierbloesemsiroop'),
    // Bloem en bindmiddelen
    b('Bloem', ['gluten'], ['tarwebloem', 'patentbloem']),
    b('Maïzena', ['mais'], ['maizena']),
    b('Agar-agar', [], ['agar', 'agar agar', 'agaragar']),
    b('Pectine'),
    b('Tapioca', [], ['tapioca korrels', 'tapiocameel', 'tapioca meel']),
    b('Gist', [], ['verse gist', 'droge gist']),
    b('Citroenzuur'),
    e('Bakpoeder'),
    e('Panko', ['gluten']),
    e('Kleurzout', [], ['nitrietzout']),
    // Olie en vet
    b('Olijfolie', [], ['olijf olie']),
    b('Zonnebloemolie', [], ['zonnebloem olie']),
    b('Raapzaadolie', [], ['rapsodie', 'koolzaadolie']),
    b('Sesamolie', ['sesam'], ['sesam olie']),
    b('Cacaoboter'),
    b('Ganzenvet'),
    // Zuur en sap
    b('Citroensap', [], ['citroen sap', 'sap van citroen']),
    b('Limoensap', [], ['limoen sap', 'sap van limoen']),
    b('Sinaasappelsap', [], ['sinaasappel sap']),
    b('Appelsap'),
    b('Bietensap', [], ['rode bietensap']),
    b('Wortelsap'),
    b('Perensap'),
    b('Tomatensap', ['nachtschade']),
    b('Natuurazijn', [], ['natuur azijn']),
    e('Witte wijnazijn', ['sulfiet'], ['witte wijn azijn', 'wittewijnazijn']),
    e('Rode wijnazijn', ['sulfiet'], ['rode wijn azijn']),
    e('Aceto balsamico', ['sulfiet'], ['balsamico azijn', 'balsamico']),
    e('Rijstazijn', [], ['rijst azijn']),
    e('Sushi-azijn', [], ['sushi azijn', 'sushiazijn']),
    e('Yuzusap', [], ['yuzu sap']),
    // Alcohol
    b('Witte wijn', ['sulfiet', 'alcohol'], ['droge witte wijn']),
    b('Rode wijn', ['sulfiet', 'alcohol']),
    b('Champagne', ['sulfiet', 'alcohol']),
    e('Witte port', ['sulfiet', 'alcohol']),
    e('Rode port', ['sulfiet', 'alcohol']),
    e('Sake', ['alcohol']),
    e('Mirin', ['alcohol']),
    e('Malibu', ['alcohol']),
    e('Gin', ['alcohol']),
    e('Pernod', ['alcohol']),
    e('Cognac', ['alcohol']),
    e('Rum', ['alcohol']),
    e('Crème de cassis', ['alcohol'], ['creme de cassis']),
    e('Tia Maria', ['alcohol']),
    e('Kahlúa', ['alcohol'], ['kahlua']),
    e('Amaretto', ['alcohol']),
    // Sauzen en smaakmakers
    e('Dashi', ['vis'], ['dashi bouillon']),
    e('Sojasaus', ['gluten', 'soja'], ['soja saus']),
    e('Ketjap manis', ['gluten', 'soja'], ['ketjap']),
    e('Miso', ['soja']),
    e('Ponzu', ['vis', 'soja']),
    e('Vissaus', ['vis']),
    e('Mosterd', ['mosterd'], ['fijne mosterd', 'dijonmosterd', 'dijon mosterd']),
    e('Mayonaise', ['ei', 'mosterd'], ['mayonnaise']),
    e('Tahin', ['sesam'], ['tahini']),
    e('Tomatenpuree', ['nachtschade'], ['tomaten puree']),
    e('Sambal oelek', ['nachtschade'], ['sambal']),
    e('Ketchup', ['nachtschade']),
    e('Tabasco', ['nachtschade']),
    e('Umeboshi-pasta', [], ['umeboshi pasta']),
    e('Augurk', [], ['augurken']),
    e('Zuurkool'),
    b('Kappertjes'),
    b('Taggiasche olijven'),
    // Cacao, noten en koffie
    b('Cacaopoeder', [], ['cacao poeder', 'cacao', 'cacoa poeder']),
    b('Koffiebonen'),
    b('Espresso'),
    b('Amandelpoeder', ['noten'], ['amandel poeder', 'amandelmeel']),
    b('Amandelschaafsel', ['noten'], ['amandel schaafsel']),
    b('Pecannoten', ['noten'], ['pecan noten']),
    b('Pistachenoten', ['noten'], ['pistache', 'pistache noten']),
    b('Hazelnoten', ['noten'], ['hazelnoot']),
    b('Hazelnootpoeder', ['noten'], ['hazelnoot poeder']),
    e('Amandelmelk', ['noten'], ['amandel melk']),
    b('Kokosmelk', [], ['kokos melk']),
    b('Kokosroom', [], ['kokos room']),
    b('Kokos', [], ['klapper', 'kokos klapper', 'klapper kokos']),
    b('Kastanje', [], ['kastanjes']),
    b('Pijnboompitten', [], ['pijnboompit', 'pinoli']),
    // Kruiden en specerijen
    b('Zout', [], ['fijn zout', 'keukenzout']),
    b('Zeezout'),
    b('Zwarte peper'),
    b('Witte peper'),
    b('Peperkorrels', [], ['peperkorrel', 'zwarte peperkorrels', 'zwarte peper korrels']),
    b('Laurier', [], ['laurierblad', 'laurier blad', 'blad laurier', 'laurierblaadjes']),
    b('Steranijs', [], ['ster anijs']),
    b('Kruidnagel', [], ['kruidnagels', 'kruidnagel heel']),
    b('Tijm', [], ['verse tijm']),
    b('Basilicum'),
    b('Kurkuma'),
    b('IJzerkruid'),
    b('Citroengras', [], ['sereh', 'sereh stengels']),
    b('Rozemarijn'),
    b('Peterselie', [], ['platte peterselie', 'krulpeterselie']),
    b('Dragon'),
    b('Limoenblad', [], ['limoenblaadjes', 'djeroek poeroet']),
    b('Kardemom', [], ['kardemon']),
    b('Venkelzaad'),
    b('Jeneverbessen', [], ['jeneverbes']),
    b('Kaneel', [], ['kaneelstok', 'kaneel stok', 'kaneelstokken', 'kaneelpoeder', 'kaneel poeder']),
    b(
      'Vanille',
      [],
      [
        'vanillestokje',
        'vanille stokje',
        'vanillestokjes',
        'vanille stokjes',
        'vanille stok',
        'stokjes vanille',
        'vanille poeder',
        'vanillestokpoeder',
        'vanille stok poeder'
      ]
    ),
    b('Gember', [], ['verse gember']),
    b('Gemberpoeder', [], ['gember poeder']),
    b('Laos'),
    b('Bieslook', ['ui']),
    b('Munt', [], ['verse munt']),
    b('Watermunt'),
    b('Anijszaad'),
    b('Komijn', [], ['komijnzaad', 'komijn zaad', 'komijnpoeder', 'komijn poeder']),
    b('Saffraan'),
    b('Nootmuskaat'),
    b('Foelie'),
    b('Sumak', [], ['sumac']),
    b('Salie'),
    b('Piment'),
    b('Szechuanpeper', [], ['szechuan peper', 'sichuan peper']),
    b('Andalimanpeper', [], ['andaliman peper', 'andaliman']),
    b('Karwijzaad'),
    b('Hibiscus'),
    b('Lavas', [], ['maggiplant']),
    b('Koriander', ['koriander'], ['verse koriander']),
    b('Korianderzaad', ['koriander'], ['koriander zaad', 'koriander zaad heel']),
    b('Korianderpoeder', ['koriander'], ['koriander poeder']),
    b('Cayennepeper', ['nachtschade'], ['cayenne peper', 'cayenne']),
    b('Spaanse peper', ['nachtschade'], ['rode peper']),
    b('Paprikapoeder', ['nachtschade'], ['paprika poeder']),
    b('Gerookt paprikapoeder', ['nachtschade'], ['gerookte paprika poeder', 'gerookte paprikapoeder']),
    b('Mosterdzaad', ['mosterd'], ['mosterd zaad']),
    b('Sesamzaad', ['sesam'], ['sesam', 'zwarte sesam', 'witte sesam']),
    b('Maanzaad', [], ['blauwmaanzaad']),
    e('Kerriepoeder', [], ['kerrie', 'kerrie poeder']),
    e('Ras el hanout', [], ['ras hanout']),
    e('Garam masala'),
    e('Vijfkruidenpoeder', [], ['five spices', 'five spice']),
    e('Koekkruiden', [], ['speculaaskruiden']),
    e('Pastramikruiden', [], ['pastrami kruiden']),
    // Groente en fruit
    b(
      'Knoflook',
      ['knoflook'],
      ['knoflookteen', 'knoflooktenen', 'knoflook teen', 'bol knoflook', 'bollen knoflook', 'knoflook bol']
    ),
    b('Zwarte knoflook', ['knoflook']),
    b('Sjalot', ['ui'], ['sjalotten']),
    b('Ui', ['ui'], ['uien', 'gele ui']),
    b('Rode ui', ['ui'], ['rode uien']),
    b('Prei', ['ui'], ['wit van prei']),
    b('Knolselderij', ['selderij']),
    b('Bleekselderij', ['selderij']),
    b('Bladselderij', ['selderij']),
    b('Aardappel', ['nachtschade'], ['aardappels', 'aardappelen']),
    b('Tomaat', ['nachtschade'], ['tomaten']),
    b('Rode paprika', ['nachtschade'], ['paprika']),
    b('Aubergine', ['nachtschade']),
    b('Doperwten', ['peulvruchten'], ['erwten']),
    b('Wortel', [], ['wortels', 'winterwortel', 'winterpeen']),
    b('Venkel', [], ['venkelknol']),
    b('Spinazie'),
    b('Komkommer'),
    b('Pompoen'),
    b('Pastinaak'),
    b('Bloemkool'),
    b('Champignons', [], ['champignon']),
    b('Avocado'),
    b('Rettich', [], ['daikon']),
    b('Rode biet', [], ['rode bieten']),
    b('Koolrabi'),
    b('Asperge', [], ['asperges']),
    b('Rabarber'),
    b('Citroen', [], ['citroenen', 'citroenrasp', 'citroen rasp', 'rasp van citroen', 'citroenschil', 'citroen schil']),
    b('Limoen', [], ['limoenen', 'limoenrasp', 'limoen rasp', 'limoen zestes', 'limoenschil']),
    b('Sinaasappel', [], ['sinaasappels', 'sinaasappel rasp', 'sinaasappelschil', 'sinaasappel schil']),
    b('Appel', [], ['appels', 'granny smith appel', 'granny smith']),
    b('Mango'),
    b('Banaan', [], ['bananen']),
    b('Bosaardbei', [], ['fraise des bois', 'bosaardbeien']),
    e('Rozijnen', ['sulfiet']),
    // Vlees, vis en overig
    b('Ganzenlever'),
    b('Kippenlever'),
    b('Katenspek', ['varkensvlees']),
    b('Ansjovis', ['vis'], ['ansjovisfilets', 'ansjovis filets']),
    b('Risottorijst', [], ['risotto rijst']),
    b('Water')
  ];
})();

// Producten die afhangen van een antwoord op de startvragen.
const STARTER_GELATINE_ALIASES = ['blad gelatine', 'bl gelatine', 'gelatineblaadjes', 'gelatine blaadjes'];
const STARTER_FONDS = [
  ['Kippenfond', ['kippen fond', 'kip fond', 'bouillon de volaille']],
  ['Groentefond', ['groente fond', 'groentebouillon']],
  ['Jus de veau', ['jus d veau'], ['rundvlees']],
  ['Bouillon', []]
];
const STARTER_CHOCOLATE = [
  ['Pure chocolade', [], ['pure choco', 'chocolade', 'donkere chocolade']],
  ['Witte chocolade', ['melk', 'lactose'], ['witte choco']],
  ['Melkchocolade', ['melk', 'lactose'], ['melk chocolade']]
];

const STARTER_HINT_CODES = new Set([
  'lam',
  'wild',
  'gevogelte',
  'paddenstoelen',
  'pijnboompitten',
  'kokos',
  'maanzaad',
  'histamine',
  'fructose',
  'fodmap'
]);

let starterLabelKeys = null;

// Moet dit product van de startlijst per stuk op het etiket worden nagekeken? Voor producten die niet van de
// startlijst komen: ja, want daar weet Savour niets van.
function starterNeedsLabel(p) {
  if (!starterLabelKeys) {
    starterLabelKeys = new Map(STARTER_PRODUCTS.map(x => [productKey(x.name), x.label]));
    for (const [name] of [...STARTER_FONDS, ...STARTER_CHOCOLATE]) starterLabelKeys.set(productKey(name), true);
  }
  const key = productKey(p.name);
  if (key === 'gelatine') return !p.allergens.length;
  return starterLabelKeys.has(key) ? starterLabelKeys.get(key) : true;
}

function isStarterProduct(p) {
  starterNeedsLabel(p);
  return starterLabelKeys.has(productKey(p.name)) || productKey(p.name) === 'gelatine';
}

function starterListFor({ gelatine, fonds, chocolate }) {
  const list = [...STARTER_PRODUCTS];
  const gel = { varken: ['varkensvlees'], rund: ['rundvlees'], vis: ['vis'] }[gelatine] || [];
  list.push({ name: 'Gelatine', allergens: gel, aliases: STARTER_GELATINE_ALIASES, label: !gel.length });
  if (fonds !== 'zelf')
    for (const [name, aliases, allergens = []] of STARTER_FONDS) list.push({ name, allergens, aliases, label: true });
  for (const [name, allergens, aliases] of STARTER_CHOCOLATE)
    list.push({
      name,
      allergens: chocolate === 'callebaut' ? [...allergens, 'soja'] : allergens,
      aliases,
      label: true
    });
  // Kenmerken die de trefwoorden goed herkennen (wild, gevogelte, histamine, FODMAP ...) vult Savour aan; wat volgt
  // uit een ander kenmerk (melk geeft lactose, ui geeft FODMAP) ook.
  return list.map(x => ({
    ...x,
    allergens: withDerived(productKey(x.name), [
      ...x.allergens,
      ...allergenKeywords(x.name).filter(c => STARTER_HINT_CODES.has(c))
    ])
  }));
}

// Hoeveel producten van de startlijst ontbreken nog in deze lijst?
function starterMissing(scope) {
  const taken = new Set(productsIn(scope).flatMap(p => [p.name, ...p.aliases].map(productKey)));
  return STARTER_PRODUCTS.filter(x => !taken.has(productKey(x.name))).length;
}

function starterPanelHtml(scope) {
  const open = productsIn(scope).filter(p => !p.known && isStarterProduct(p));
  const simple = open.filter(p => !starterNeedsLabel(p));
  const label = open.filter(p => starterNeedsLabel(p));
  if (starterMissing(scope) >= 10)
    return `<div class="panel products-starter"><h3>Startlijst</h3><p class="muted">Savour zet ruim 200 veelgebruikte keukenproducten voor je klaar, zoals bloem, slagroom, eidooier en zout, met hun allergenen en de schrijfwijzen uit recepten. Je beantwoordt eerst drie korte vragen. Daarna bevestig je de producten zelf.</p><button type="button" class="btn gold" onclick="startStarterList()">Startlijst maken</button></div>`;
  if (!open.length) return '';
  return `<div class="panel products-starter"><h3>Startlijst controleren</h3>${simple.length ? `<p class="products-starter-row"><span><b>${simple.length}</b> <span>basisproducten met vaste allergenen</span></span><button type="button" class="btn small gold" onclick="openStarterCheck()">Bekijken en bevestigen</button></p>` : ''}${label.length ? `<p class="products-starter-row"><span><b>${label.length}</b> <span>producten: kijk het etiket na</span></span><button type="button" class="btn small" onclick="productSearch='';productLabelOnly=true;renderProductList();$('productList')?.scrollIntoView({behavior:'smooth',block:'start'})">Tonen</button></p>` : ''}<button type="button" class="btn-quiet" onclick="undoStarterList()">Startlijst ongedaan maken</button></div>`;
}

async function startStarterList() {
  const scope = productScope;
  if (!canEditProducts(scope)) return;
  const gelatine = await askChoice('Welke gelatine gebruik je?', [
    { value: 'varken', label: 'Varkensgelatine' },
    { value: 'rund', label: 'Rundergelatine' },
    { value: 'vis', label: 'Visgelatine' },
    { value: 'weet', label: 'Weet ik niet', hint: 'Dan kijk je het etiket na' }
  ]);
  if (!gelatine) return;
  const fonds = await askChoice('Maak je fonds en bouillon zelf, of koop je ze in?', [
    { value: 'zelf', label: 'Zelf, als recept in Savour', hint: 'Koppel ze aan je eigen recept' },
    { value: 'inkoop', label: 'Ingekocht', hint: 'Dan kijk je het etiket na' }
  ]);
  if (!fonds) return;
  const chocolate = await askChoice('Welk merk chocolade gebruik je meestal?', [
    { value: 'callebaut', label: 'Callebaut' },
    { value: 'valrhona', label: 'Valrhona' },
    { value: 'anders', label: 'Ander merk' },
    { value: 'weet', label: 'Weet ik niet' }
  ]);
  if (!chocolate) return;

  // Wat er al is, blijft zoals het is: geen dubbele producten en geen namen die al bij een ander product horen.
  const taken = new Set(productsIn(scope).flatMap(p => [p.name, ...p.aliases].map(productKey)));
  const rows = [];
  for (const x of starterListFor({ gelatine, fonds, chocolate })) {
    const key = productKey(x.name);
    if (taken.has(key)) continue;
    const aliases = x.aliases.filter(a => !taken.has(productKey(a)) && productKey(a) !== key);
    [key, ...aliases.map(productKey)].forEach(k => taken.add(k));
    rows.push({
      scope,
      name: x.name,
      aliases,
      allergens: x.allergens.filter(c => allergenShown(c, scope)),
      known: false,
      note: ''
    });
  }
  if (!rows.length) {
    toast('Alle producten van de startlijst staan er al');
    return;
  }
  const saved = await insertProducts(rows);
  if (!saved) return;
  toast(`${saved} producten toegevoegd`);
  renderProducts();
}

// Veel producten tegelijk toevoegen, in één keer naar de database.
async function insertProducts(rows) {
  if (demoMode) {
    rows.forEach((p, i) => products.push({ ...p, id: 'demo-p-start-' + Date.now() + '-' + i }));
    return rows.length;
  }
  const { data, error } = await supabaseClient
    .from('products')
    .insert(
      rows.map(p => ({
        name: p.name,
        aliases: p.aliases,
        allergens: p.allergens,
        allergens_known: false,
        allergen_note: '',
        user_id: p.scope === 'own' ? currentUser.id : null,
        team_id: p.scope === 'own' ? null : p.scope
      }))
    )
    .select('id,user_id,team_id,name,aliases,allergens,allergens_known,allergen_note');
  if (error || !data) {
    const msg = error?.message || '';
    toast(
      /products_allergens_check/i.test(msg)
        ? 'Dit kan zodra de database is bijgewerkt.'
        : error?.code === '42501' || /row-level security|permission denied/i.test(msg)
          ? 'Opslaan is geweigerd. Controleer of je Savour Pro hebt of sous-chef bent in dit keukenteam.'
          : 'Opslaan lukte niet; probeer het opnieuw'
    );
    if (error) console.warn('Startlijst opslaan:', error);
    return 0;
  }
  products = [...products, ...data.map(productFromRow)];
  saveOfflineSnapshot();
  return data.length;
}

// Basisproducten bekijken en in één keer bevestigen. De kok ziet elk product met zijn allergenen voordat hij
// bevestigt; merkafhankelijke producten staan hier niet tussen.
function openStarterCheck() {
  const scope = productScope;
  const list = productsIn(scope)
    .filter(p => !p.known && isStarterProduct(p) && !starterNeedsLabel(p))
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  if (!list.length) return;
  document.getElementById('starterCheck')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="starterCheck" role="dialog" aria-modal="true" aria-labelledby="starterCheckTitle"><div class="sv-dialog-box allergen-check-box"><h2 id="starterCheckTitle" class="sv-dialog-title">Basisproducten bevestigen</h2><p class="sv-dialog-text">Loop de lijst na. Klopt een product niet, open het dan via de lijst en pas het aan. Na bevestigen tellen deze producten als gecontroleerd.</p><ul class="allergen-lines">${list.map(p => `<li class="allergen-line"><div class="allergen-line-main"><b translate="no">${esc(p.name)}</b><div class="allergen-line-state">${shownAllergens(p.allergens, scope).length ? allergenChips(shownAllergens(p.allergens, scope)) : '<span class="allergen-none">Geen allergenen</span>'}</div></div></li>`).join('')}</ul><div class="sv-dialog-actions"><button type="button" class="btn" data-close>Annuleren</button><button type="button" class="btn gold" data-ok>Klopt, alles bevestigen</button></div></div></div>`
  );
  const el = $('starterCheck');
  const close = () => el.remove();
  el.querySelector('[data-close]').addEventListener('click', close);
  el.addEventListener('mousedown', ev => {
    if (ev.target === el) close();
  });
  el.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') close();
  });
  el.querySelector('[data-ok]').addEventListener('click', async () => {
    const ids = list.map(p => p.id);
    if (!demoMode) {
      const { error } = await supabaseClient.from('products').update({ allergens_known: true }).in('id', ids);
      if (error) {
        toast('Opslaan lukte niet; probeer het opnieuw');
        return;
      }
    }
    products = products.map(p => (ids.includes(p.id) ? { ...p, known: true } : p));
    saveOfflineSnapshot();
    close();
    toast(`${ids.length} producten bevestigd`);
    renderProducts();
  });
}

// Alleen wat nog niet is gecontroleerd gaat weg; bevestigde producten blijven altijd staan.
async function undoStarterList() {
  const scope = productScope;
  const list = productsIn(scope).filter(p => !p.known && isStarterProduct(p));
  if (!list.length) return;
  const ok = await askConfirm(
    `Startlijst ongedaan maken?\n\n${list.length} producten van de startlijst die je nog niet hebt gecontroleerd worden verwijderd. Bevestigde producten blijven staan.`,
    { confirmLabel: 'Verwijderen' }
  );
  if (!ok) return;
  const ids = list.map(p => p.id);
  if (!demoMode) {
    const { error } = await supabaseClient.from('products').delete().in('id', ids);
    if (error) {
      toast('Verwijderen lukte niet; probeer het opnieuw');
      return;
    }
  }
  products = products.filter(p => !ids.includes(p.id));
  saveOfflineSnapshot();
  renderProducts();
}
