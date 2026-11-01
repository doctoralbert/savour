// De eerste keer in Savour: welkomstscherm, startlijst en voorbeelden.
// De voorbeelden staan bewust los van recipes, folders en sharedMaps: ze komen nooit in exports, tellingen of de
// database, en zijn alleen-lezen. Ze verdwijnen vanzelf zodra je zelf een map of keukenteam hebt, of met Verbergen.

const EXAMPLE_RECIPES = [
  {
    id: 'voorbeeld-kalfsfond',
    title: 'Kalfsfond',
    yield: '5 liter',
    ingredients: [
      '5 kg kalfsbotten',
      '500 gram ui',
      '300 gram wortel',
      '200 gram bleekselderij',
      '2 el tomatenpuree',
      '8 liter water'
    ],
    steps: [
      'Rooster de botten in de oven goudbruin op 200 °C.',
      'Bak de groenten aan en voeg de tomatenpuree toe.',
      'Zet alles op met koud water en laat 6 uur zachtjes trekken.',
      'Passeer door een fijne zeef en koel snel terug.'
    ],
    notes: 'Nooit laten koken, dan wordt de fond troebel.'
  },
  {
    id: 'voorbeeld-kalfsjus',
    title: 'Kalfsjus',
    yield: '1 liter',
    ingredients: ['5 liter kalfsfond', '200 gram sjalot', '3 dl rode wijn', '2 takjes tijm'],
    steps: [
      'Fruit de sjalot en blus af met de rode wijn.',
      'Laat de wijn inkoken tot een stroop.',
      'Voeg de fond en tijm toe en kook in tot 1 liter.',
      'Passeer en proef af.'
    ]
  },
  {
    id: 'voorbeeld-beurre-blanc',
    title: 'Beurre blanc',
    yield: '0,5 liter',
    ingredients: [
      '2 sjalotten, fijngesneden',
      '1 dl witte wijn',
      '1 dl witte wijnazijn',
      '250 gram koude boter, in blokjes',
      'zout naar smaak'
    ],
    steps: [
      'Kook sjalot, wijn en azijn in tot een kwart.',
      'Haal van het vuur en monteer met de koude boter.',
      'Breng op smaak met zout en passeer.'
    ]
  },
  {
    id: 'voorbeeld-hollandaise',
    title: 'Hollandaise',
    yield: '10 porties',
    ingredients: ['6 eidooiers', '400 gram geklaarde boter', '2 el water', 'citroensap naar smaak', 'zout naar smaak'],
    steps: [
      'Klop dooiers en water au bain-marie tot een luchtige sabayon.',
      'Voeg de warme boter in een dunne straal toe.',
      'Breng op smaak met citroen en zout.'
    ]
  },
  {
    id: 'voorbeeld-citroentaart',
    title: 'Citroentaart',
    yield: '1 taart',
    ingredients: [
      'Bodem:',
      '250 gram bloem',
      '125 gram boter',
      '60 gram poedersuiker',
      '1 ei',
      'Vulling:',
      '5 eieren',
      '200 gram suiker',
      '150 ml citroensap',
      '150 ml room'
    ],
    steps: [
      'Bodem:',
      'Kneed alles tot een deeg en laat 1 uur koelen.',
      'Rol uit, bekleed de vorm en bak blind op 170 °C.',
      'Vulling:',
      'Meng eieren, suiker, citroensap en room.',
      'Vul de bodem en bak 25 minuten op 140 °C.'
    ],
    notes: 'Haal uit de oven als het midden nog net trilt.'
  },
  {
    id: 'voorbeeld-gerecht',
    title: 'Kalfssukade met jus',
    yield: '8 personen',
    ingredients: ['2 kg kalfssukade', '1 liter kalfsjus', '300 gram wortel', '2 takjes tijm'],
    steps: [
      'Bak het vlees rondom bruin.',
      'Stoof 3 uur op 150 °C in de jus met wortel en tijm.',
      'Laat rusten en snijd in plakken.'
    ]
  }
].map(r => ({ description: '', category: 'Voorbeeld', photo: '', shared: true, example: true, ...r }));

const EXAMPLE_TEAM = {
  name: 'Restaurant De Haven',
  members: [
    ['Sanne', 'Eigenaar'],
    ['Tom', 'Sous-chef'],
    ['Lisa', 'Kok'],
    ['Daan', 'Stagiair']
  ],
  folders: [
    ['Sauzen', ['voorbeeld-kalfsjus', 'voorbeeld-beurre-blanc', 'voorbeeld-hollandaise']],
    ['Basis', ['voorbeeld-kalfsfond']],
    ['Patisserie', ['voorbeeld-citroentaart']],
    ['Kaart', ['voorbeeld-gerecht']]
  ]
};

// Voorbeeldrecepten in de andere talen. De sleutels zijn de recept-id's zonder "voorbeeld-".
const EXAMPLE_TRANSLATIONS = {
  en: {
    kalfsfond: {
      title: 'Veal stock',
      yield: '5 litres',
      ingredients: [
        '5 kg veal bones',
        '500 g onion',
        '300 g carrot',
        '200 g celery',
        '2 tbsp tomato purée',
        '8 l water'
      ],
      steps: [
        'Roast the bones in the oven at 200 °C until golden brown.',
        'Fry the vegetables and add the tomato purée.',
        'Cover everything with cold water and simmer gently for 6 hours.',
        'Strain through a fine sieve and cool quickly.'
      ],
      notes: 'Never let it boil, or the stock turns cloudy.'
    },
    kalfsjus: {
      title: 'Veal jus',
      yield: '1 litre',
      ingredients: ['5 l veal stock', '200 g shallot', '3 dl red wine', '2 sprigs thyme'],
      steps: [
        'Sweat the shallot and deglaze with the red wine.',
        'Reduce the wine to a syrup.',
        'Add the stock and thyme and reduce to 1 litre.',
        'Strain and season to taste.'
      ]
    },
    'beurre-blanc': {
      title: 'Beurre blanc',
      yield: '0.5 litre',
      ingredients: [
        '2 shallots, finely chopped',
        '1 dl white wine',
        '1 dl white wine vinegar',
        '250 g cold butter, diced',
        'salt to taste'
      ],
      steps: [
        'Reduce the shallot, wine and vinegar to a quarter.',
        'Remove from the heat and mount with the cold butter.',
        'Season with salt and strain.'
      ]
    },
    hollandaise: {
      title: 'Hollandaise',
      yield: '10 portions',
      ingredients: ['6 egg yolks', '400 g clarified butter', '2 tbsp water', 'lemon juice to taste', 'salt to taste'],
      steps: [
        'Whisk the yolks and water over a bain-marie into a light sabayon.',
        'Add the warm butter in a thin stream.',
        'Season with lemon and salt.'
      ]
    },
    citroentaart: {
      title: 'Lemon tart',
      yield: '1 tart',
      ingredients: [
        'Base:',
        '250 g flour',
        '125 g butter',
        '60 g icing sugar',
        '1 egg',
        'Filling:',
        '5 eggs',
        '200 g sugar',
        '150 ml lemon juice',
        '150 ml cream'
      ],
      steps: [
        'Base:',
        'Knead everything into a dough and chill for 1 hour.',
        'Roll out, line the tin and blind bake at 170 °C.',
        'Filling:',
        'Mix the eggs, sugar, lemon juice and cream.',
        'Fill the base and bake for 25 minutes at 140 °C.'
      ],
      notes: 'Take it out of the oven when the centre still just wobbles.'
    },
    gerecht: {
      title: 'Braised veal with jus',
      yield: '8 people',
      ingredients: ['2 kg veal shoulder', '1 l veal jus', '300 g carrot', '2 sprigs thyme'],
      steps: [
        'Brown the meat on all sides.',
        'Braise for 3 hours at 150 °C in the jus with the carrot and thyme.',
        'Rest and cut into slices.'
      ]
    }
  },
  de: {
    kalfsfond: {
      title: 'Kalbsfond',
      yield: '5 Liter',
      ingredients: [
        '5 kg Kalbsknochen',
        '500 g Zwiebeln',
        '300 g Karotten',
        '200 g Staudensellerie',
        '2 EL Tomatenmark',
        '8 l Wasser'
      ],
      steps: [
        'Die Knochen im Ofen bei 200 °C goldbraun rösten.',
        'Das Gemüse anbraten und das Tomatenmark zugeben.',
        'Alles mit kaltem Wasser aufsetzen und 6 Stunden sanft ziehen lassen.',
        'Durch ein feines Sieb passieren und schnell abkühlen.'
      ],
      notes: 'Nie kochen lassen, sonst wird der Fond trüb.'
    },
    kalfsjus: {
      title: 'Kalbsjus',
      yield: '1 Liter',
      ingredients: ['5 l Kalbsfond', '200 g Schalotten', '3 dl Rotwein', '2 Zweige Thymian'],
      steps: [
        'Die Schalotten anschwitzen und mit Rotwein ablöschen.',
        'Den Wein sirupartig einkochen.',
        'Fond und Thymian zugeben und auf 1 Liter reduzieren.',
        'Passieren und abschmecken.'
      ]
    },
    'beurre-blanc': {
      title: 'Beurre blanc',
      yield: '0,5 Liter',
      ingredients: [
        '2 Schalotten, fein geschnitten',
        '1 dl Weißwein',
        '1 dl Weißweinessig',
        '250 g kalte Butter, gewürfelt',
        'Salz nach Geschmack'
      ],
      steps: [
        'Schalotten, Wein und Essig auf ein Viertel einkochen.',
        'Vom Herd nehmen und mit der kalten Butter montieren.',
        'Mit Salz abschmecken und passieren.'
      ]
    },
    hollandaise: {
      title: 'Hollandaise',
      yield: '10 Portionen',
      ingredients: [
        '6 Eigelb',
        '400 g geklärte Butter',
        '2 EL Wasser',
        'Zitronensaft nach Geschmack',
        'Salz nach Geschmack'
      ],
      steps: [
        'Eigelb und Wasser über dem Wasserbad zu einer luftigen Sabayon aufschlagen.',
        'Die warme Butter in dünnem Strahl einlaufen lassen.',
        'Mit Zitrone und Salz abschmecken.'
      ]
    },
    citroentaart: {
      title: 'Zitronentarte',
      yield: '1 Tarte',
      ingredients: [
        'Boden:',
        '250 g Mehl',
        '125 g Butter',
        '60 g Puderzucker',
        '1 Ei',
        'Füllung:',
        '5 Eier',
        '200 g Zucker',
        '150 ml Zitronensaft',
        '150 ml Sahne'
      ],
      steps: [
        'Boden:',
        'Alles zu einem Teig kneten und 1 Stunde kühlen.',
        'Ausrollen, die Form auslegen und bei 170 °C blind backen.',
        'Füllung:',
        'Eier, Zucker, Zitronensaft und Sahne mischen.',
        'Den Boden füllen und 25 Minuten bei 140 °C backen.'
      ],
      notes: 'Aus dem Ofen nehmen, wenn die Mitte noch leicht wackelt.'
    },
    gerecht: {
      title: 'Geschmorte Kalbsschulter mit Jus',
      yield: '8 Personen',
      ingredients: ['2 kg Kalbsschulter', '1 l Kalbsjus', '300 g Karotten', '2 Zweige Thymian'],
      steps: [
        'Das Fleisch rundum anbraten.',
        '3 Stunden bei 150 °C in der Jus mit Karotten und Thymian schmoren.',
        'Ruhen lassen und in Scheiben schneiden.'
      ]
    }
  },
  es: {
    kalfsfond: {
      title: 'Fondo de ternera',
      yield: '5 litros',
      ingredients: [
        '5 kg huesos de ternera',
        '500 g cebolla',
        '300 g zanahoria',
        '200 g apio',
        '2 cdas concentrado de tomate',
        '8 l agua'
      ],
      steps: [
        'Tuesta los huesos en el horno a 200 °C hasta que estén dorados.',
        'Sofríe las verduras y añade el concentrado de tomate.',
        'Cubre todo con agua fría y cuece 6 horas a fuego muy suave.',
        'Cuela por un colador fino y enfría rápido.'
      ],
      notes: 'Que nunca hierva, o el fondo se enturbia.'
    },
    kalfsjus: {
      title: 'Jugo de ternera',
      yield: '1 litro',
      ingredients: ['5 l fondo de ternera', '200 g chalota', '3 dl vino tinto', '2 ramitas tomillo'],
      steps: [
        'Pocha la chalota y desglasa con el vino tinto.',
        'Reduce el vino hasta que quede como un jarabe.',
        'Añade el fondo y el tomillo y reduce a 1 litro.',
        'Cuela y rectifica de sal.'
      ]
    },
    'beurre-blanc': {
      title: 'Beurre blanc',
      yield: '0,5 litros',
      ingredients: [
        '2 chalotas, picadas finas',
        '1 dl vino blanco',
        '1 dl vinagre de vino blanco',
        '250 g mantequilla fría, en dados',
        'sal al gusto'
      ],
      steps: [
        'Reduce la chalota, el vino y el vinagre a una cuarta parte.',
        'Retira del fuego y monta con la mantequilla fría.',
        'Sazona con sal y cuela.'
      ]
    },
    hollandaise: {
      title: 'Salsa holandesa',
      yield: '10 raciones',
      ingredients: [
        '6 yemas',
        '400 g mantequilla clarificada',
        '2 cdas agua',
        'zumo de limón al gusto',
        'sal al gusto'
      ],
      steps: [
        'Bate las yemas y el agua al baño maría hasta obtener una sabayón ligera.',
        'Añade la mantequilla caliente en un hilo fino.',
        'Sazona con limón y sal.'
      ]
    },
    citroentaart: {
      title: 'Tarta de limón',
      yield: '1 tarta',
      ingredients: [
        'Base:',
        '250 g harina',
        '125 g mantequilla',
        '60 g azúcar glas',
        '1 huevo',
        'Relleno:',
        '5 huevos',
        '200 g azúcar',
        '150 ml zumo de limón',
        '150 ml nata'
      ],
      steps: [
        'Base:',
        'Amasa todo y enfría la masa 1 hora.',
        'Estira, forra el molde y hornea en blanco a 170 °C.',
        'Relleno:',
        'Mezcla los huevos, el azúcar, el zumo de limón y la nata.',
        'Rellena la base y hornea 25 minutos a 140 °C.'
      ],
      notes: 'Sácala del horno cuando el centro aún tiemble un poco.'
    },
    gerecht: {
      title: 'Ternera estofada con jugo',
      yield: '8 personas',
      ingredients: ['2 kg espaldilla de ternera', '1 l jugo de ternera', '300 g zanahoria', '2 ramitas tomillo'],
      steps: [
        'Dora la carne por todos los lados.',
        'Estofa 3 horas a 150 °C en el jugo con la zanahoria y el tomillo.',
        'Deja reposar y corta en lonchas.'
      ]
    }
  },
  fr: {
    kalfsfond: {
      title: 'Fond de veau',
      yield: '5 litres',
      ingredients: [
        '5 kg os de veau',
        '500 g oignon',
        '300 g carotte',
        '200 g céleri',
        '2 c. à s. concentré de tomate',
        '8 l eau'
      ],
      steps: [
        'Faire rôtir les os au four à 200 °C jusqu’à ce qu’ils soient dorés.',
        'Faire revenir les légumes et ajouter le concentré de tomate.',
        'Mouiller à l’eau froide et laisser frémir 6 heures.',
        'Passer au chinois et refroidir rapidement.'
      ],
      notes: 'Ne jamais faire bouillir, sinon le fond se trouble.'
    },
    kalfsjus: {
      title: 'Jus de veau',
      yield: '1 litre',
      ingredients: ['5 l fond de veau', '200 g échalote', '3 dl vin rouge', '2 brins thym'],
      steps: [
        'Faire suer l’échalote et déglacer au vin rouge.',
        'Réduire le vin jusqu’à obtenir un sirop.',
        'Ajouter le fond et le thym, puis réduire à 1 litre.',
        'Passer et rectifier l’assaisonnement.'
      ]
    },
    'beurre-blanc': {
      title: 'Beurre blanc',
      yield: '0,5 litre',
      ingredients: [
        '2 échalotes, finement ciselées',
        '1 dl vin blanc',
        '1 dl vinaigre de vin blanc',
        '250 g beurre froid, en dés',
        'sel selon le goût'
      ],
      steps: [
        'Réduire l’échalote, le vin et le vinaigre au quart.',
        'Retirer du feu et monter avec le beurre froid.',
        'Saler et passer.'
      ]
    },
    hollandaise: {
      title: 'Sauce hollandaise',
      yield: '10 portions',
      ingredients: [
        '6 jaunes d’œufs',
        '400 g beurre clarifié',
        '2 c. à s. eau',
        'jus de citron selon le goût',
        'sel selon le goût'
      ],
      steps: [
        'Fouetter les jaunes et l’eau au bain-marie jusqu’à obtenir un sabayon léger.',
        'Ajouter le beurre chaud en filet fin.',
        'Assaisonner de citron et de sel.'
      ]
    },
    citroentaart: {
      title: 'Tarte au citron',
      yield: '1 tarte',
      ingredients: [
        'Fond de tarte:',
        '250 g farine',
        '125 g beurre',
        '60 g sucre glace',
        '1 œuf',
        'Garniture:',
        '5 œufs',
        '200 g sucre',
        '150 ml jus de citron',
        '150 ml crème'
      ],
      steps: [
        'Fond de tarte:',
        'Pétrir le tout et laisser reposer 1 heure au frais.',
        'Abaisser, foncer le moule et cuire à blanc à 170 °C.',
        'Garniture:',
        'Mélanger les œufs, le sucre, le jus de citron et la crème.',
        'Garnir le fond et cuire 25 minutes à 140 °C.'
      ],
      notes: 'Sortir du four quand le centre tremble encore légèrement.'
    },
    gerecht: {
      title: 'Épaule de veau braisée au jus',
      yield: '8 personnes',
      ingredients: ['2 kg épaule de veau', '1 l jus de veau', '300 g carotte', '2 brins thym'],
      steps: [
        'Colorer la viande sur toutes les faces.',
        'Braiser 3 heures à 150 °C dans le jus avec la carotte et le thym.',
        'Laisser reposer et trancher.'
      ]
    }
  }
};

// De voorbeeldrecepten in de gekozen taal.
const exampleCache = {};
function exampleRecipes() {
  const lang = typeof currentLanguage === 'string' ? currentLanguage : 'nl';
  return (exampleCache[lang] ||= EXAMPLE_RECIPES.map(r => ({
    ...r,
    ...EXAMPLE_TRANSLATIONS[lang]?.[r.id.replace('voorbeeld-', '')]
  })));
}

// Na een taalwissel staat het voorbeeld meteen in de nieuwe taal.
function refreshExampleLanguage() {
  if ($('exampleView')?.classList.contains('active')) renderExample();
  if ($('detail')?.classList.contains('active') && findRecipe(currentId)?.example) openRecipe(currentId, 'example');
}

let exampleKind = 'team';

function onboardingKey(name) {
  return `savour_${name}_${currentUser?.id || ''}`;
}

function onboardingFlag(name) {
  try {
    return !!localStorage.getItem(onboardingKey(name));
  } catch {
    return false;
  }
}

function setOnboardingFlag(name) {
  try {
    localStorage.setItem(onboardingKey(name), '1');
  } catch {}
}

function showsExampleFolder() {
  return !!currentUser && !demoMode && !folders.length && !onboardingFlag('examples_hidden');
}

function showsExampleTeam() {
  return !!currentUser && !demoMode && !sharedMaps.length && !onboardingFlag('examples_hidden');
}

function exampleNavButton(kind, name) {
  return `<button class="nav-example" onclick="openExample('${kind}')"><span class="ico">•</span><span>${esc(name)}</span><small>Voorbeeld</small></button>`;
}

function hideExamples() {
  setOnboardingFlag('examples_hidden');
  refreshSidebar();
  renderFolders();
  go('recipes');
}

function openExample(kind) {
  exampleKind = kind;
  renderExample();
  go('exampleView');
}

function exampleRows(ids) {
  return ids
    .map(id => exampleRecipes().find(r => r.id === id))
    .map(
      (r, i) =>
        `<div class="savour-v13-row" role="button" tabindex="0" onclick="openRecipe('${r.id}','example')" onkeydown="if(event.key==='Enter'){openRecipe('${r.id}','example')}"><span class="savour-v13-number">${String(i + 1).padStart(3, '0')}</span><span class="savour-v13-name" translate="no">${esc(r.title)}</span><span class="savour-v13-arrow">›</span></div>`
    )
    .join('');
}

function renderExample() {
  const host = $('exampleWrap');
  if (!host) return;
  const banner = (text, button) =>
    `<div class="example-banner"><div><b>Dit is een voorbeeld</b><span>${text}</span></div><div class="example-banner-actions">${button}<button type="button" class="btn-quiet" onclick="hideExamples()">Verbergen</button></div></div>`;
  if (exampleKind === 'folder') {
    host.innerHTML =
      banner(
        'Zo ziet een receptenmap eruit. Hij verdwijnt zodra je je eigen map maakt.',
        '<button type="button" class="btn gold" onclick="newFolder()">Maak je eigen map</button>'
      ) +
      `<div class="eyebrow">Receptenmap</div><h1 class="example-title">Sauzen</h1><p class="muted">Orden recepten zoals jouw keuken werkt: per partie, menu of seizoen.</p><div class="savour-v13-list">${exampleRows(['voorbeeld-kalfsfond', 'voorbeeld-kalfsjus', 'voorbeeld-beurre-blanc', 'voorbeeld-hollandaise'])}</div>`;
    return;
  }
  const team = EXAMPLE_TEAM;
  host.innerHTML =
    banner(
      'Zo werkt een keukenteam. Het verdwijnt zodra je je eigen team maakt of ergens lid van wordt.',
      '<button type="button" class="btn gold" onclick="newSharedMap()">Maak je eigen keukenteam</button>'
    ) +
    `<div class="eyebrow">Keukenteam</div><h1 class="example-title" translate="no">${esc(team.name)}</h1><p class="muted">Eén receptenboek voor de hele brigade. Iedereen ziet elke wijziging meteen.</p>` +
    `<div class="example-members">${team.members.map(([name, role]) => `<div><i translate="no">${esc(name[0])}</i><b translate="no">${esc(name)}</b><small>${esc(role)}</small></div>`).join('')}</div>` +
    team.folders
      .map(
        ([name, ids]) =>
          `<h2 class="example-folder">${esc(name)}</h2><div class="savour-v13-list">${exampleRows(ids)}</div>`
      )
      .join('');
}

// Welkomstscherm: één keer per account op dit apparaat, zolang de bibliotheek nog leeg is.
function showWelcomeFlow() {
  document.getElementById('welcomeFlow')?.remove();
  const first = String(account?.name || '')
    .trim()
    .split(/\s+/)[0];
  const steps = [
    ['1', 'Zet je recepten erin', 'Word, PDF of een foto van een kladje. Ook honderden tegelijk.'],
    ['2', 'Orden ze in mappen', 'Per partie, menu of seizoen, zoals jouw keuken werkt.'],
    ['3', 'Deel met je brigade', 'Iedereen kookt van dezelfde versie, op de eigen telefoon.']
  ];
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="welcome-flow" id="welcomeFlow" role="dialog" aria-modal="true" aria-labelledby="welcomeFlowTitle"><div class="welcome-box"><button type="button" class="welcome-close" onclick="closeWelcomeFlow()" aria-label="Sluiten">×</button><div class="eyebrow">Welkom bij Savour</div><h1 id="welcomeFlowTitle">${first ? `<span>Hoi </span><span translate="no">${esc(first)}</span><span>, je keuken staat klaar.</span>` : 'Je keuken staat klaar.'}</h1><p>In drie stappen heb je al je recepten op één plek.</p><ol class="welcome-steps">${steps.map(([n, title, text]) => `<li><span>${n}</span><div><b>${title}</b><small>${text}</small></div></li>`).join('')}</ol><button type="button" class="btn gold welcome-main" onclick="welcomeChoice('file')">Importeer je eerste recepten</button><div class="welcome-more"><button type="button" onclick="welcomeChoice('example')">Bekijk eerst het voorbeeld</button><button type="button" onclick="welcomeChoice('camera')">Foto van een kladje</button><button type="button" onclick="welcomeChoice('new')">Zelf een recept invoeren</button></div></div></div>`
  );
  document.querySelector('#welcomeFlow .welcome-main')?.focus();
}

function closeWelcomeFlow() {
  document.getElementById('welcomeFlow')?.remove();
}

function welcomeChoice(choice) {
  closeWelcomeFlow();
  if (choice === 'file') {
    go('import');
    showImportPanel();
  } else if (choice === 'camera') {
    go('import');
    openCameraImport();
  } else if (choice === 'new') newRecipe();
  else openExample('team');
}

// Startlijst boven de bibliotheek, tot alles gedaan is of je hem wegklikt.
function renderStartChecklist() {
  document.getElementById('startChecklist')?.remove();
  if (!currentUser || demoMode || onboardingFlag('checklist_hidden')) return;
  const steps = [
    ['Recepten toevoegen', recipes.length > 0, "go('import');showImportPanel()"],
    ['Een receptenmap maken', folders.length > 0, 'newFolder()'],
    ['Je team uitnodigen', sharedMaps.length > 0, 'newSharedMap()']
  ];
  const done = steps.filter(s => s[1]).length;
  if (done === steps.length) return;
  $('recipes')
    ?.querySelector('.section-head')
    ?.insertAdjacentHTML(
      'afterend',
      `<div id="startChecklist" class="start-checklist"><div class="start-checklist-head"><b>Aan de slag</b><span>${done} van ${steps.length} gedaan</span><button type="button" onclick="hideStartChecklist()" aria-label="Verbergen">×</button></div><div class="start-checklist-steps">${steps.map(([label, ok, action]) => `<button type="button" class="${ok ? 'is-done' : ''}" ${ok ? 'disabled' : `onclick="${action}"`}><i>${ok ? '✓' : ''}</i><span>${label}</span></button>`).join('')}</div></div>`
    );
}

function hideStartChecklist() {
  setOnboardingFlag('checklist_hidden');
  renderStartChecklist();
}
