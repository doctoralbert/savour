// Inlaadservice: de oprichter (zelf kok) zet de receptenmap van een keuken persoonlijk over in Savour.
// Eén plek voor alle teksten en prijzen in vier talen. tools/build-seo.mjs maakt er een eigen pagina van
// (met prijzen, stappen en aanvraagformulier), een blok op de startpagina, een blok op de prijzenpagina en een vraag.
//
// Prijs: eenmalig, bij een jaarabonnement Organisatie 5, 10 of 25 naar keuze. Prijzen gekozen door de eigenaar.
// Aanleveren gaat via een persoonlijke link (/aanleveren?t=...) die de beheerder in /admin → Inladen maakt.
// De eerste FREE_KITCHENS keukens gratis; zet FREE_KITCHENS op 0 als die plekken vol zijn.
export const FREE_KITCHENS = 5;
export const SERVICE_TIERS = [
  [100, '€85'],
  [500, '€100'],
  [1000, '€164,99']
];

export const SERVICE = {
  nl: {
    feature: {
      slug: 'recepten-laten-inladen',
      menu: 'Recepten laten inladen',
      short: 'Wij zetten je hele receptenmap voor je over, recept voor recept nagekeken.',
      title: 'Recepten laten inladen: wij digitaliseren je receptenmap | Savour',
      desc: 'Geen tijd om je recepten over te zetten? De oprichter van Savour, zelf kok, laadt je hele receptenmap persoonlijk in: geordend in mappen, elk recept nagekeken en je team klaar om te koken. Vanaf €85.',
      h1: 'Wij laden je hele receptenmap voor je in',
      lead: 'Geen tijd om honderden recepten over te zetten? De oprichter van Savour, zelf kok, doet het persoonlijk voor je. Jij levert je map aan, je team krijgt een receptenboek dat klopt.',
      sections: [
        ['Waarom we dit doen', 'De grootste drempel voor een keuken is niet de app, maar het overzetten. Driehonderd recepten in Word, een map met vlekken, schriften van de vorige chef: daar heeft niemand tijd voor naast de service. Dus doen wij het.'],
        ['Door een kok, niet door een callcenter', 'Je recepten worden ingeladen door iemand die zelf in de keuken heeft gestaan. Iemand die weet wat een fond is, dat 1 el geen 1 liter is en dat je mise-en-place per partie wilt kunnen vinden. Elk recept wordt naast het origineel gelegd en nagekeken.'],
        ['Je recepten blijven van jou', 'Recepten zijn het kapitaal van je keuken. We gebruiken ze alleen om ze voor jou in te laden, delen ze met niemand en verwijderen je bronbestanden zodra alles klaarstaat.']
      ]
    },
    kicker: 'Inlaadservice',
    bandTitle: 'Geen tijd om alles over te zetten? Wij doen het voor je.',
    bandText: 'De oprichter van Savour, zelf kok, laadt je hele receptenmap persoonlijk in. Geordend zoals jullie werken, elk recept nagekeken en je team klaar om te koken.',
    bandButton: 'Laat je recepten inladen',
    free: n => `Introductie: de eerste ${n} keukens laden we gratis in`,
    freeNote: 'Je betaalt alleen je organisatie-abonnement. In ruil vragen we om eerlijke feedback.',
    includedTitle: 'Wat je krijgt',
    included: [
      'Al je recepten ingeladen: Word, PDF, foto’s van schriften en kladjes, en exports uit andere apps',
      'Een mappenstructuur zoals jullie werken: per partie, menu, seizoen of vestiging',
      'Elk recept nagekeken tegen het origineel: hoeveelheden, eenheden, opbrengst en bereiding',
      'Een gedeelde map voor je team, iedereen uitgenodigd, met een korte uitleg',
      'Vertrouwelijk: je bronbestanden worden na afloop verwijderd'
    ],
    stepsTitle: 'Hoe het werkt',
    steps: [
      [
        "Kies je pakket",
        "Klik op een pakket en vul de aanvraag in. Je krijgt een factuur per mail en betaalt met iDEAL of creditcard."
      ],
      [
        "Lever aan",
        "Je krijgt een persoonlijke aanleverlink. Upload je recepten en geef je mappenstructuur door."
      ],
      [
        "Inladen en nakijken",
        "Wij laden alles in, zetten het in jouw mappen en kijken elk recept na."
      ],
      [
        "Jij keurt goed",
        "Je loopt alles na, je organisatie krijgt een uitnodiging en jullie kunnen koken."
      ]
    ],
    structureTitle: "Jij bepaalt de indeling",
    structureText: "Bij het aanleveren geef je zelf je mappenstructuur door. Werk je per partie, per soort of per menu? Wij zetten elk recept in de juiste map.",
    structures: [
      [
        "Per partie",
        [
          "Garde-manger",
          "Pâtisserie",
          "Rôtisseur",
          "Entremetier",
          "Saucier"
        ]
      ],
      [
        "Per soort",
        [
          "Amuses",
          "Mousses",
          "Gels",
          "Sauzen",
          "IJs",
          "Krokantjes"
        ]
      ],
      [
        "Per menu",
        [
          "Restaurant menu november",
          "Banqueting menu november",
          "Kerstmenu 2026"
        ]
      ],
      [
        "Eigen indeling",
        [
          "Precies zoals jij het wilt"
        ]
      ]
    ],
    choose: "Kies dit pakket",
    close: "Sluiten",
    payNote: "Na je aanvraag krijg je een factuur per mail (iDEAL of creditcard) en een persoonlijke aanleverlink.",
    priceTitle: 'Prijs',
    priceIntro: 'Eenmalig, bij een jaarabonnement Organisatie 5, 10 of 25 naar keuze. Prijzen excl. btw.',
    tier: n => `Tot ${n} recepten`,
    tierMore: 'Meer dan 1000 recepten',
    custom: 'In overleg',
    example: 'Voorbeeld: 250 recepten in een gedeelde map voor 5 koks = €100 eenmalig + Organisatie 5 voor €89 per jaar.',
    form: {
      "title": "Inladen aanvragen",
      "subject": "Inlaadservice aanvragen",
      "restaurant": "Restaurant of bedrijf",
      "package": "Pakket",
      "packageMore": "Meer dan 1000 recepten (in overleg)",
      "team": "Welk organisatie-abonnement?",
      "teamOptions": [
        "Organisatie 5",
        "Organisatie 10",
        "Organisatie 25",
        "Weet ik nog niet"
      ],
      "message": "Opmerkingen",
      "placeholder": "Bijvoorbeeld: in welke vorm je recepten zijn, of wanneer je het klaar wilt hebben…",
      "send": "Aanvraag versturen"
    },
    proTitle: 'Liever dat wij je recepten inladen?',
    proText: 'Met de inlaadservice zet de oprichter van Savour, zelf kok, je hele receptenmap persoonlijk over. Vanaf €85 eenmalig, bij een organisatie-abonnement naar keuze.',
    faq: ['Kunnen jullie mijn recepten voor me inladen?', 'Ja. Met de inlaadservice zet de oprichter van Savour, zelf kok, je hele receptenmap persoonlijk over: ingeladen, geordend in mappen en elk recept nagekeken. Vanaf €85 eenmalig, bij een jaarabonnement Organisatie 5, 10 of 25. De eerste 5 keukens laden we gratis in.']
  },
  en: {
    feature: {
      slug: 'en/recipe-import-service',
      menu: 'We import your recipes',
      short: 'We move your whole recipe folder over for you, checked recipe by recipe.',
      title: 'Recipe import service: we digitise your recipe folder | Savour',
      desc: 'No time to move your recipes over? The founder of Savour, a chef, personally imports your whole recipe folder: organised in folders, every recipe checked and your team ready to cook. From €85.',
      h1: 'We import your whole recipe folder for you',
      lead: 'No time to move hundreds of recipes over? The founder of Savour, a chef, does it for you personally. You hand over your folder, your team gets a recipe book that is right.',
      sections: [
        ['Why we do this', 'The biggest hurdle for a kitchen is not the app, it is moving everything over. Three hundred recipes in Word, a stained binder, notebooks from the previous chef: nobody has time for that next to service. So we do it.'],
        ['By a chef, not a call centre', 'Your recipes are imported by someone who has worked in a kitchen. Someone who knows what a stock is, that 1 tbsp is not 1 litre and that you want to find your mise en place by section. Every recipe is laid next to the original and checked.'],
        ['Your recipes stay yours', 'Recipes are the capital of your kitchen. We only use them to import them for you, share them with no one and delete your source files as soon as everything is ready.']
      ]
    },
    kicker: 'Import service',
    bandTitle: 'No time to move everything over? We do it for you.',
    bandText: 'The founder of Savour, a chef, personally imports your whole recipe folder. Organised the way you work, every recipe checked and your team ready to cook.',
    bandButton: 'Have your recipes imported',
    free: n => `Launch offer: the first ${n} kitchens are imported for free`,
    freeNote: 'You only pay for your organisation plan. In return we ask for honest feedback.',
    includedTitle: 'What you get',
    included: [
      'All your recipes imported: Word, PDF, photos of notebooks and notes, and exports from other apps',
      'A folder structure that matches how you work: by section, menu, season or location',
      'Every recipe checked against the original: quantities, units, yield and method',
      'A shared folder for your team, everyone invited, with a short walkthrough',
      'Confidential: your source files are deleted afterwards'
    ],
    stepsTitle: 'How it works',
    steps: [
      [
        "Choose your package",
        "Click a package and fill in the request. You receive an invoice by email and pay with iDEAL or card."
      ],
      [
        "Send your recipes",
        "You get a personal upload link. Upload your recipes and tell us your folder structure."
      ],
      [
        "Import and check",
        "We import everything, put it in your folders and check every recipe."
      ],
      [
        "You approve",
        "You go through it all, your organisation gets an invitation and you can start cooking."
      ]
    ],
    structureTitle: "You decide the structure",
    structureText: "When you send your recipes, you tell us your own folder structure. By section, by type or by menu? We put every recipe in the right folder.",
    structures: [
      [
        "By section",
        [
          "Garde manger",
          "Pastry",
          "Rôtisseur",
          "Entremetier",
          "Saucier"
        ]
      ],
      [
        "By type",
        [
          "Amuse-bouches",
          "Mousses",
          "Gels",
          "Sauces",
          "Ice cream",
          "Crisps"
        ]
      ],
      [
        "By menu",
        [
          "Restaurant menu November",
          "Banqueting menu November",
          "Christmas menu 2026"
        ]
      ],
      [
        "Your own",
        [
          "Exactly the way you want it"
        ]
      ]
    ],
    choose: "Choose this package",
    close: "Close",
    payNote: "After your request you receive an invoice by email (iDEAL or card) and a personal upload link.",
    priceTitle: 'Price',
    priceIntro: 'One-off, with a yearly Organisation 5, 10 or 25 plan of your choice. Prices excl. VAT.',
    tier: n => `Up to ${n} recipes`,
    tierMore: 'More than 1,000 recipes',
    custom: 'Let’s talk',
    example: 'Example: 250 recipes in a shared folder for 5 cooks = €100 one-off + Organisation 5 for €89 a year.',
    form: {
      "title": "Request an import",
      "subject": "Import service request",
      "restaurant": "Restaurant or company",
      "package": "Package",
      "packageMore": "More than 1,000 recipes (let’s talk)",
      "team": "Which organisation plan?",
      "teamOptions": [
        "Organisation 5",
        "Organisation 10",
        "Organisation 25",
        "Not sure yet"
      ],
      "message": "Notes",
      "placeholder": "For example: what form your recipes are in, or when you would like it ready…",
      "send": "Send request"
    },
    proTitle: 'Rather have us import your recipes?',
    proText: 'With the import service, the founder of Savour, a chef, personally moves your whole recipe folder over. From €85 one-off, with an organisation plan of your choice.',
    faq: ['Can you import my recipes for me?', 'Yes. With the import service, the founder of Savour, a chef, personally moves your whole recipe folder over: imported, organised in folders and every recipe checked. From €85 one-off, with a yearly Organisation 5, 10 or 25 plan. The first 5 kitchens are imported for free.']
  },
  de: {
    feature: {
      slug: 'de/rezepte-einpflegen-lassen',
      menu: 'Rezepte einpflegen lassen',
      short: 'Wir übertragen deinen ganzen Rezeptordner für dich, Rezept für Rezept geprüft.',
      title: 'Rezepte einpflegen lassen: wir digitalisieren deinen Rezeptordner | Savour',
      desc: 'Keine Zeit, deine Rezepte zu übertragen? Der Gründer von Savour, selbst Koch, pflegt deinen ganzen Rezeptordner persönlich ein: in Ordnern sortiert, jedes Rezept geprüft und dein Team startklar. Ab 85 €.',
      h1: 'Wir pflegen deinen ganzen Rezeptordner für dich ein',
      lead: 'Keine Zeit, Hunderte Rezepte zu übertragen? Der Gründer von Savour, selbst Koch, macht das persönlich für dich. Du lieferst deinen Ordner, dein Team bekommt ein Rezeptbuch, das stimmt.',
      sections: [
        ['Warum wir das machen', 'Die größte Hürde für eine Küche ist nicht die App, sondern das Übertragen. Dreihundert Rezepte in Word, ein fleckiger Ordner, Hefte vom vorigen Küchenchef: dafür hat neben dem Service niemand Zeit. Also machen wir das.'],
        ['Von einem Koch, nicht von einem Callcenter', 'Deine Rezepte pflegt jemand ein, der selbst in der Küche gestanden hat. Jemand, der weiß, was ein Fond ist, dass 1 EL nicht 1 Liter ist und dass du deine Mise en place nach Posten finden willst. Jedes Rezept wird neben das Original gelegt und geprüft.'],
        ['Deine Rezepte bleiben deine', 'Rezepte sind das Kapital deiner Küche. Wir nutzen sie nur, um sie für dich einzupflegen, geben sie an niemanden weiter und löschen deine Quelldateien, sobald alles bereitsteht.']
      ]
    },
    kicker: 'Einpflege-Service',
    bandTitle: 'Keine Zeit, alles zu übertragen? Wir machen das für dich.',
    bandText: 'Der Gründer von Savour, selbst Koch, pflegt deinen ganzen Rezeptordner persönlich ein. Sortiert, wie ihr arbeitet, jedes Rezept geprüft und dein Team startklar.',
    bandButton: 'Rezepte einpflegen lassen',
    free: n => `Zum Start: Die ersten ${n} Küchen pflegen wir kostenlos ein`,
    freeNote: 'Du zahlst nur dein Organisations-Abo. Im Gegenzug bitten wir um ehrliches Feedback.',
    includedTitle: 'Was du bekommst',
    included: [
      'Alle Rezepte eingepflegt: Word, PDF, Fotos von Heften und Notizen sowie Exporte aus anderen Apps',
      'Eine Ordnerstruktur, wie ihr arbeitet: nach Posten, Menü, Saison oder Standort',
      'Jedes Rezept mit dem Original abgeglichen: Mengen, Einheiten, Ausbeute und Zubereitung',
      'Ein geteilter Ordner für dein Team, alle eingeladen, mit einer kurzen Einführung',
      'Vertraulich: Deine Quelldateien werden danach gelöscht'
    ],
    stepsTitle: 'So funktioniert es',
    steps: [
      [
        "Paket wählen",
        "Klick auf ein Paket und füll die Anfrage aus. Du bekommst eine Rechnung per E-Mail und zahlst per iDEAL oder Karte."
      ],
      [
        "Rezepte liefern",
        "Du bekommst einen persönlichen Upload-Link. Lade deine Rezepte hoch und nenne uns deine Ordnerstruktur."
      ],
      [
        "Einpflegen und prüfen",
        "Wir pflegen alles ein, sortieren es in deine Ordner und prüfen jedes Rezept."
      ],
      [
        "Du gibst frei",
        "Du gehst alles durch, deine Organisation bekommt eine Einladung und ihr könnt kochen."
      ]
    ],
    structureTitle: "Du bestimmst die Ordnung",
    structureText: "Beim Liefern nennst du uns deine eigene Ordnerstruktur. Nach Posten, nach Art oder nach Menü? Wir legen jedes Rezept in den richtigen Ordner.",
    structures: [
      [
        "Nach Posten",
        [
          "Garde-manger",
          "Pâtisserie",
          "Rôtisseur",
          "Entremetier",
          "Saucier"
        ]
      ],
      [
        "Nach Art",
        [
          "Amuse-Bouches",
          "Mousses",
          "Gele",
          "Saucen",
          "Eis",
          "Crunch"
        ]
      ],
      [
        "Nach Menü",
        [
          "Restaurant-Menü November",
          "Bankett-Menü November",
          "Weihnachtsmenü 2026"
        ]
      ],
      [
        "Eigene Ordnung",
        [
          "Genau so, wie du es willst"
        ]
      ]
    ],
    choose: "Dieses Paket wählen",
    close: "Schließen",
    payNote: "Nach deiner Anfrage bekommst du eine Rechnung per E-Mail (iDEAL oder Karte) und einen persönlichen Upload-Link.",
    priceTitle: 'Preis',
    priceIntro: 'Einmalig, zusammen mit einem Jahres-Abo Organisation 5, 10 oder 25 nach Wahl. Preise zzgl. MwSt.',
    tier: n => `Bis ${n} Rezepte`,
    tierMore: 'Mehr als 1.000 Rezepte',
    custom: 'Nach Absprache',
    example: 'Beispiel: 250 Rezepte in einem geteilten Ordner für 5 Köche = 100 € einmalig + Organisation 5 für 89 € pro Jahr.',
    form: {
      "title": "Einpflegen anfragen",
      "subject": "Anfrage Einpflege-Service",
      "restaurant": "Restaurant oder Unternehmen",
      "package": "Paket",
      "packageMore": "Mehr als 1.000 Rezepte (nach Absprache)",
      "team": "Welches Organisations-Abo?",
      "teamOptions": [
        "Organisation 5",
        "Organisation 10",
        "Organisation 25",
        "Weiß ich noch nicht"
      ],
      "message": "Anmerkungen",
      "placeholder": "Zum Beispiel: in welcher Form deine Rezepte vorliegen oder bis wann es fertig sein soll…",
      "send": "Anfrage senden"
    },
    proTitle: 'Sollen wir deine Rezepte einpflegen?',
    proText: 'Mit dem Einpflege-Service überträgt der Gründer von Savour, selbst Koch, deinen ganzen Rezeptordner persönlich. Ab 85 € einmalig, mit einem Organisations-Abo nach Wahl.',
    faq: ['Könnt ihr meine Rezepte für mich einpflegen?', 'Ja. Mit dem Einpflege-Service überträgt der Gründer von Savour, selbst Koch, deinen ganzen Rezeptordner persönlich: eingepflegt, in Ordnern sortiert und jedes Rezept geprüft. Ab 85 € einmalig, mit einem Jahres-Abo Organisation 5, 10 oder 25. Die ersten 5 Küchen pflegen wir kostenlos ein.']
  },
  es: {
    feature: {
      slug: 'es/servicio-de-carga-de-recetas',
      menu: 'Cargamos tus recetas',
      short: 'Pasamos todo tu recetario por ti, revisado receta por receta.',
      title: 'Servicio de carga de recetas: digitalizamos tu recetario | Savour',
      desc: '¿Sin tiempo para pasar tus recetas? El fundador de Savour, cocinero, carga personalmente todo tu recetario: ordenado en carpetas, cada receta revisada y tu equipo listo para cocinar. Desde 85 €.',
      h1: 'Cargamos todo tu recetario por ti',
      lead: '¿Sin tiempo para pasar cientos de recetas? El fundador de Savour, cocinero, lo hace personalmente por ti. Tú entregas tu carpeta y tu equipo recibe un recetario que funciona.',
      sections: [
        ['Por qué lo hacemos', 'La mayor barrera para una cocina no es la app, sino pasarlo todo. Trescientas recetas en Word, una carpeta con manchas, libretas del chef anterior: nadie tiene tiempo para eso además del servicio. Así que lo hacemos nosotros.'],
        ['Por un cocinero, no por un call center', 'Tus recetas las carga alguien que ha trabajado en una cocina. Alguien que sabe qué es un fondo, que 1 cucharada no es 1 litro y que quieres encontrar tu mise en place por partida. Cada receta se compara con el original y se revisa.'],
        ['Tus recetas siguen siendo tuyas', 'Las recetas son el capital de tu cocina. Solo las usamos para cargarlas por ti, no las compartimos con nadie y borramos tus archivos originales en cuanto todo está listo.']
      ]
    },
    kicker: 'Servicio de carga',
    bandTitle: '¿Sin tiempo para pasarlo todo? Lo hacemos por ti.',
    bandText: 'El fundador de Savour, cocinero, carga personalmente todo tu recetario. Ordenado como trabajáis, cada receta revisada y tu equipo listo para cocinar.',
    bandButton: 'Que carguemos tus recetas',
    free: n => `Lanzamiento: las primeras ${n} cocinas las cargamos gratis`,
    freeNote: 'Solo pagas tu plan de organización. A cambio te pedimos una opinión sincera.',
    includedTitle: 'Qué incluye',
    included: [
      'Todas tus recetas cargadas: Word, PDF, fotos de libretas y notas, y exportaciones de otras apps',
      'Una estructura de carpetas como trabajáis: por partida, menú, temporada o local',
      'Cada receta revisada con el original: cantidades, unidades, rendimiento y elaboración',
      'Una carpeta compartida para tu equipo, todos invitados, con una breve explicación',
      'Confidencial: tus archivos originales se borran al terminar'
    ],
    stepsTitle: 'Cómo funciona',
    steps: [
      [
        "Elige tu paquete",
        "Haz clic en un paquete y rellena la solicitud. Recibes una factura por correo y pagas con iDEAL o tarjeta."
      ],
      [
        "Envía tus recetas",
        "Recibes un enlace personal. Sube tus recetas e indícanos tu estructura de carpetas."
      ],
      [
        "Cargamos y revisamos",
        "Lo cargamos todo, lo ponemos en tus carpetas y revisamos cada receta."
      ],
      [
        "Tú lo apruebas",
        "Lo revisas todo, tu organización recibe una invitación y podéis cocinar."
      ]
    ],
    structureTitle: "Tú decides la estructura",
    structureText: "Al enviar tus recetas nos indicas tu propia estructura de carpetas. ¿Por partida, por tipo o por menú? Ponemos cada receta en la carpeta correcta.",
    structures: [
      [
        "Por partida",
        [
          "Garde manger",
          "Pastelería",
          "Rôtisseur",
          "Entremetier",
          "Saucier"
        ]
      ],
      [
        "Por tipo",
        [
          "Aperitivos",
          "Mousses",
          "Geles",
          "Salsas",
          "Helados",
          "Crujientes"
        ]
      ],
      [
        "Por menú",
        [
          "Menú restaurante noviembre",
          "Menú banquetes noviembre",
          "Menú de Navidad 2026"
        ]
      ],
      [
        "A tu manera",
        [
          "Exactamente como tú quieras"
        ]
      ]
    ],
    choose: "Elegir este paquete",
    close: "Cerrar",
    payNote: "Tras tu solicitud recibes una factura por correo (iDEAL o tarjeta) y un enlace personal para enviar tus recetas.",
    priceTitle: 'Precio',
    priceIntro: 'Pago único, con un plan anual Organización 5, 10 o 25 a elegir. Precios sin IVA.',
    tier: n => `Hasta ${n} recetas`,
    tierMore: 'Más de 1.000 recetas',
    custom: 'A convenir',
    example: 'Ejemplo: 250 recetas en una carpeta compartida para 5 cocineros = 100 € pago único + Organización 5 por 89 € al año.',
    form: {
      "title": "Solicitar la carga",
      "subject": "Solicitud del servicio de carga",
      "restaurant": "Restaurante o empresa",
      "package": "Paquete",
      "packageMore": "Más de 1.000 recetas (a convenir)",
      "team": "¿Qué plan de organización?",
      "teamOptions": [
        "Organización 5",
        "Organización 10",
        "Organización 25",
        "Aún no lo sé"
      ],
      "message": "Comentarios",
      "placeholder": "Por ejemplo: en qué formato están tus recetas o para cuándo lo quieres…",
      "send": "Enviar solicitud"
    },
    proTitle: '¿Prefieres que carguemos tus recetas?',
    proText: 'Con el servicio de carga, el fundador de Savour, cocinero, pasa personalmente todo tu recetario. Desde 85 € pago único, con un plan de organización a elegir.',
    faq: ['¿Podéis cargar mis recetas por mí?', 'Sí. Con el servicio de carga, el fundador de Savour, cocinero, pasa personalmente todo tu recetario: cargado, ordenado en carpetas y cada receta revisada. Desde 85 € pago único, con un plan anual Organización 5, 10 o 25. Las primeras 5 cocinas las cargamos gratis.']
  }
};
