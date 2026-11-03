// Startlijst producten (2026-11-03): veelgebruikte keukenproducten met hun allergenen, zodat een kok niet bij nul
// begint. Samengesteld uit de ingrediënten die in professionele recepten het vaakst voorkomen.
//
// De voorstellen gaan meteen mee (zo wil de eigenaar het: soja en gluten in sojasaus hoeft niemand na te lezen);
// wie een ander merk gebruikt, past het product aan. Fonds, gelatine en chocolade hangen af van de keuken; daar
// stelt Savour eerst een vraag over.

const STARTER_PRODUCTS = (() => {
  const b = (name, allergens = [], aliases = []) => ({ name, allergens, aliases });
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
    b('Flora', ['peulvruchten'], ['flora plantaardig']),
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
    b('Gembersiroop', [], ['gember siroop']),
    b('Vlierbloesemsiroop'),
    // Bloem en bindmiddelen
    b('Bloem', ['gluten'], ['tarwebloem', 'patentbloem']),
    b('Maïzena', ['mais'], ['maizena']),
    b('Agar-agar', [], ['agar', 'agar agar', 'agaragar']),
    b('Pectine'),
    b('Tapioca', [], ['tapioca korrels', 'tapiocameel', 'tapioca meel']),
    b('Gist', [], ['verse gist', 'droge gist']),
    b('Citroenzuur'),
    b('Bakpoeder'),
    b('Panko', ['gluten']),
    b('Kleurzout', [], ['nitrietzout']),
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
    b('Witte wijnazijn', ['sulfiet'], ['witte wijn azijn', 'wittewijnazijn']),
    b('Rode wijnazijn', ['sulfiet'], ['rode wijn azijn']),
    b('Aceto balsamico', ['sulfiet'], ['balsamico azijn', 'balsamico']),
    b('Rijstazijn', [], ['rijst azijn']),
    b('Sushi-azijn', [], ['sushi azijn', 'sushiazijn']),
    b('Yuzusap', [], ['yuzu sap']),
    // Alcohol
    b('Witte wijn', ['sulfiet', 'alcohol'], ['droge witte wijn']),
    b('Rode wijn', ['sulfiet', 'alcohol']),
    b('Champagne', ['sulfiet', 'alcohol']),
    b('Witte port', ['sulfiet', 'alcohol']),
    b('Rode port', ['sulfiet', 'alcohol']),
    b('Sake', ['alcohol']),
    b('Mirin', ['alcohol']),
    b('Malibu', ['alcohol']),
    b('Gin', ['alcohol']),
    b('Pernod', ['alcohol']),
    b('Cognac', ['alcohol']),
    b('Rum', ['alcohol']),
    b('Crème de cassis', ['alcohol'], ['creme de cassis']),
    b('Tia Maria', ['alcohol']),
    b('Kahlúa', ['alcohol'], ['kahlua']),
    b('Amaretto', ['alcohol']),
    // Sauzen en smaakmakers
    b('Dashi', ['vis'], ['dashi bouillon']),
    b('Sojasaus', ['gluten', 'soja'], ['soja saus']),
    b('Ketjap manis', ['gluten', 'soja'], ['ketjap']),
    b('Miso', ['soja']),
    b('Ponzu', ['vis', 'soja']),
    b('Vissaus', ['vis']),
    b('Mosterd', ['mosterd'], ['fijne mosterd', 'dijonmosterd', 'dijon mosterd']),
    b('Mayonaise', ['ei', 'mosterd'], ['mayonnaise']),
    b('Tahin', ['sesam'], ['tahini']),
    b('Tomatenpuree', ['nachtschade'], ['tomaten puree']),
    b('Sambal oelek', ['nachtschade'], ['sambal']),
    b('Ketchup', ['nachtschade']),
    b('Tabasco', ['nachtschade']),
    b('Umeboshi-pasta', [], ['umeboshi pasta']),
    b('Augurk', [], ['augurken']),
    b('Zuurkool'),
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
    b('Amandelmelk', ['noten'], ['amandel melk']),
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
    b('Peper', [], ['gemalen peper', 'versgemalen peper', 'peper uit de molen']),
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
    b('Kerriepoeder', [], ['kerrie', 'kerrie poeder']),
    b('Ras el hanout', [], ['ras hanout']),
    b('Garam masala'),
    b('Vijfkruidenpoeder', [], ['five spices', 'five spice']),
    b('Koekkruiden', [], ['speculaaskruiden']),
    b('Pastramikruiden', [], ['pastrami kruiden']),
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
    b('Rozijnen', ['sulfiet']),
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

function starterListFor({ gelatine, fonds, chocolate }) {
  const list = [...STARTER_PRODUCTS];
  const gel = { varken: ['varkensvlees'], rund: ['rundvlees'], vis: ['vis'] }[gelatine] || [];
  list.push({ name: 'Gelatine', allergens: gel, aliases: STARTER_GELATINE_ALIASES });
  if (fonds !== 'zelf')
    for (const [name, aliases, allergens = []] of STARTER_FONDS) list.push({ name, allergens, aliases });
  for (const [name, allergens, aliases] of STARTER_CHOCOLATE)
    list.push({ name, allergens: chocolate === 'callebaut' ? [...allergens, 'soja'] : allergens, aliases });
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
  if (starterMissing(scope) < 10) return '';
  return `<div class="panel products-starter"><h3>Startlijst</h3><p class="muted">Savour zet ruim 200 veelgebruikte keukenproducten voor je klaar, zoals bloem, slagroom, eidooier en zout, met hun allergenen en de schrijfwijzen uit recepten. Je beantwoordt eerst drie korte vragen. Elk product kun je later aanpassen.</p><button type="button" class="btn gold" onclick="startStarterList()">Startlijst maken</button></div>`;
}

async function startStarterList() {
  const scope = productScope;
  if (!canEditProducts(scope)) return;
  const gelatine = await askChoice('Welke gelatine gebruik je?', [
    { value: 'varken', label: 'Varkensgelatine' },
    { value: 'rund', label: 'Rundergelatine' },
    { value: 'vis', label: 'Visgelatine' },
    { value: 'weet', label: 'Weet ik niet' }
  ]);
  if (!gelatine) return;
  const fonds = await askChoice('Maak je fonds en bouillon zelf, of koop je ze in?', [
    { value: 'zelf', label: 'Zelf, als recept in Savour', hint: 'Koppel ze aan je eigen recept' },
    { value: 'inkoop', label: 'Ingekocht' }
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
      known: true,
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
    rows.forEach((p, i) => products.push({ ...p, id: 'demo-p-' + Date.now() + '-' + i }));
    return rows.length;
  }
  const { data, error } = await supabaseClient
    .from('products')
    .insert(
      rows.map(p => ({
        name: p.name,
        aliases: p.aliases,
        allergens: p.allergens,
        allergens_known: !!p.known,
        allergen_note: p.note || '',
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
    if (error) console.warn('Producten opslaan:', error);
    return 0;
  }
  products = [...products, ...data.map(productFromRow)];
  saveOfflineSnapshot();
  return data.length;
}

// Producten die nog niet zijn overgenomen: bekijken en in één keer overnemen.
function openUncheckedReview() {
  const scope = productScope;
  const list = productsIn(scope)
    .filter(p => !p.known)
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  if (!list.length) return;
  document.getElementById('uncheckedReview')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="uncheckedReview" role="dialog" aria-modal="true" aria-labelledby="uncheckedReviewTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="uncheckedReviewTitle" class="sv-dialog-title">Voorstellen overnemen</h2><p class="sv-dialog-text">Dit zijn de allergenen die Savour bij deze producten voorstelt. Klopt iets niet bij jouw merk, open het product dan in de lijst en pas het aan.</p><ul class="allergen-lines">${list.map(p => `<li class="allergen-line"><div class="allergen-line-main"><b translate="no">${esc(p.name)}</b><div class="allergen-line-state">${shownAllergens(p.allergens, scope).length ? allergenChips(shownAllergens(p.allergens, scope)) : '<span class="allergen-none">Geen allergenen</span>'}</div></div></li>`).join('')}</ul><div class="sv-dialog-actions"><button type="button" class="btn" data-close>Annuleren</button><button type="button" class="btn gold" data-ok>Alles overnemen</button></div></div></div>`
  );
  const el = $('uncheckedReview');
  const close = () => el.remove();
  closableModal(el, close);
  el.querySelector('[data-close]').addEventListener('click', close);
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
    toast(`${ids.length} producten overgenomen`);
    renderProducts();
  });
}
