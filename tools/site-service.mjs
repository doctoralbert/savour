// Inlaadservice: de oprichter (zelf kok) zet de receptenmap van een keuken persoonlijk over in Savour.
// Eén plek voor alle teksten en prijzen in vier talen. tools/build-seo.mjs maakt er een eigen pagina van
// (met prijzen, stappen en aanvraagformulier), een blok op de startpagina, een blok op de prijzenpagina en een vraag.
//
// Prijs: eenmalig, bij een jaarabonnement Team 5, 10 of 25 naar keuze. Gerekend op ongeveer 12 uur werk voor
// 250 recepten (intake 1 u, inladen en mappen 2 u, elk recept nakijken ±2 min = 8 u, team instellen 1 u).
// De eerste FREE_KITCHENS keukens gratis; zet FREE_KITCHENS op 0 als die plekken vol zijn.
export const FREE_KITCHENS = 5;
export const SERVICE_TIERS = [
  [100, '€249'],
  [250, '€495'],
  [500, '€895']
];

export const SERVICE = {
  nl: {
    feature: {
      slug: 'recepten-laten-inladen',
      menu: 'Recepten laten inladen',
      short: 'Wij zetten je hele receptenmap voor je over, recept voor recept nagekeken.',
      title: 'Recepten laten inladen: wij digitaliseren je receptenmap | Savour',
      desc: 'Geen tijd om je recepten over te zetten? De oprichter van Savour, zelf kok, laadt je hele receptenmap persoonlijk in: geordend in mappen, elk recept nagekeken en je team klaar om te koken. Vanaf €249.',
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
    freeNote: 'Je betaalt alleen je teamabonnement. In ruil vragen we om eerlijke feedback.',
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
      ['Aanvragen', 'Vul het formulier in. We nemen contact op om af te stemmen hoeveel recepten het zijn en hoe je wilt indelen.'],
      ['Recepten aanleveren', 'Stuur je bestanden, foto’s of exports. Hoe rommelig ook: daar is Savour voor gemaakt.'],
      ['Inladen en nakijken', 'Wij laden alles in, ordenen het in mappen en kijken elk recept na.'],
      ['Jij keurt goed', 'Je loopt alles na, je team krijgt een uitnodiging en jullie kunnen koken.']
    ],
    priceTitle: 'Prijs',
    priceIntro: 'Eenmalig, bij een jaarabonnement Team 5, 10 of 25 naar keuze. Prijzen excl. btw.',
    tier: n => `Tot ${n} recepten`,
    tierMore: 'Meer dan 500 recepten',
    custom: 'Op maat',
    example: 'Voorbeeld: 250 recepten in een gedeelde map voor 5 koks = €495 eenmalig + Team 5 voor €89 per jaar.',
    form: {
      title: 'Inladen aanvragen',
      subject: 'Inlaadservice aanvragen',
      restaurant: 'Restaurant of bedrijf',
      recipes: 'Hoeveel recepten ongeveer?',
      recipeOptions: ['Tot 100', '100 tot 250', '250 tot 500', 'Meer dan 500', 'Weet ik nog niet'],
      team: 'Welk teamabonnement?',
      teamOptions: ['Team 5', 'Team 10', 'Team 25', 'Weet ik nog niet'],
      message: 'In welke vorm zijn je recepten?',
      placeholder: 'Bijvoorbeeld: Word-bestanden, een geprinte map, schriften, recepten in een andere app…',
      send: 'Inladen aanvragen'
    },
    proTitle: 'Liever dat wij je recepten inladen?',
    proText: 'Met de inlaadservice zet de oprichter van Savour, zelf kok, je hele receptenmap persoonlijk over. Vanaf €249 eenmalig, bij een teamabonnement naar keuze.',
    faq: ['Kunnen jullie mijn recepten voor me inladen?', 'Ja. Met de inlaadservice zet de oprichter van Savour, zelf kok, je hele receptenmap persoonlijk over: ingeladen, geordend in mappen en elk recept nagekeken. Vanaf €249 eenmalig, bij een jaarabonnement Team 5, 10 of 25. De eerste 5 keukens laden we gratis in.']
  },
  en: {
    feature: {
      slug: 'en/recipe-import-service',
      menu: 'We import your recipes',
      short: 'We move your whole recipe folder over for you, checked recipe by recipe.',
      title: 'Recipe import service: we digitise your recipe folder | Savour',
      desc: 'No time to move your recipes over? The founder of Savour, a chef, personally imports your whole recipe folder: organised in folders, every recipe checked and your team ready to cook. From €249.',
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
    freeNote: 'You only pay for your team plan. In return we ask for honest feedback.',
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
      ['Request', 'Fill in the form. We get in touch to agree how many recipes there are and how you want them organised.'],
      ['Send your recipes', 'Send your files, photos or exports. However messy: that is what Savour was made for.'],
      ['Import and check', 'We import everything, organise it in folders and check every recipe.'],
      ['You approve', 'You go through it all, your team gets an invitation and you can start cooking.']
    ],
    priceTitle: 'Price',
    priceIntro: 'One-off, with a yearly Team 5, 10 or 25 plan of your choice. Prices excl. VAT.',
    tier: n => `Up to ${n} recipes`,
    tierMore: 'More than 500 recipes',
    custom: 'Custom quote',
    example: 'Example: 250 recipes in a shared folder for 5 cooks = €495 one-off + Team 5 for €89 a year.',
    form: {
      title: 'Request an import',
      subject: 'Import service request',
      restaurant: 'Restaurant or company',
      recipes: 'About how many recipes?',
      recipeOptions: ['Up to 100', '100 to 250', '250 to 500', 'More than 500', 'Not sure yet'],
      team: 'Which team plan?',
      teamOptions: ['Team 5', 'Team 10', 'Team 25', 'Not sure yet'],
      message: 'What form are your recipes in?',
      placeholder: 'For example: Word files, a printed binder, notebooks, recipes in another app…',
      send: 'Request an import'
    },
    proTitle: 'Rather have us import your recipes?',
    proText: 'With the import service, the founder of Savour, a chef, personally moves your whole recipe folder over. From €249 one-off, with a team plan of your choice.',
    faq: ['Can you import my recipes for me?', 'Yes. With the import service, the founder of Savour, a chef, personally moves your whole recipe folder over: imported, organised in folders and every recipe checked. From €249 one-off, with a yearly Team 5, 10 or 25 plan. The first 5 kitchens are imported for free.']
  },
  de: {
    feature: {
      slug: 'de/rezepte-einpflegen-lassen',
      menu: 'Rezepte einpflegen lassen',
      short: 'Wir übertragen deinen ganzen Rezeptordner für dich, Rezept für Rezept geprüft.',
      title: 'Rezepte einpflegen lassen: wir digitalisieren deinen Rezeptordner | Savour',
      desc: 'Keine Zeit, deine Rezepte zu übertragen? Der Gründer von Savour, selbst Koch, pflegt deinen ganzen Rezeptordner persönlich ein: in Ordnern sortiert, jedes Rezept geprüft und dein Team startklar. Ab 249 €.',
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
    freeNote: 'Du zahlst nur dein Team-Abo. Im Gegenzug bitten wir um ehrliches Feedback.',
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
      ['Anfragen', 'Füll das Formular aus. Wir melden uns, um abzustimmen, wie viele Rezepte es sind und wie du sie ordnen willst.'],
      ['Rezepte schicken', 'Schick deine Dateien, Fotos oder Exporte. Egal wie chaotisch: Dafür ist Savour gemacht.'],
      ['Einpflegen und prüfen', 'Wir pflegen alles ein, sortieren es in Ordner und prüfen jedes Rezept.'],
      ['Du gibst frei', 'Du gehst alles durch, dein Team bekommt eine Einladung und ihr könnt kochen.']
    ],
    priceTitle: 'Preis',
    priceIntro: 'Einmalig, zusammen mit einem Jahres-Abo Team 5, 10 oder 25 nach Wahl. Preise zzgl. MwSt.',
    tier: n => `Bis ${n} Rezepte`,
    tierMore: 'Mehr als 500 Rezepte',
    custom: 'Auf Anfrage',
    example: 'Beispiel: 250 Rezepte in einem geteilten Ordner für 5 Köche = 495 € einmalig + Team 5 für 89 € pro Jahr.',
    form: {
      title: 'Einpflegen anfragen',
      subject: 'Anfrage Einpflege-Service',
      restaurant: 'Restaurant oder Unternehmen',
      recipes: 'Wie viele Rezepte ungefähr?',
      recipeOptions: ['Bis 100', '100 bis 250', '250 bis 500', 'Mehr als 500', 'Weiß ich noch nicht'],
      team: 'Welches Team-Abo?',
      teamOptions: ['Team 5', 'Team 10', 'Team 25', 'Weiß ich noch nicht'],
      message: 'In welcher Form liegen deine Rezepte vor?',
      placeholder: 'Zum Beispiel: Word-Dateien, ein gedruckter Ordner, Hefte, Rezepte in einer anderen App…',
      send: 'Einpflegen anfragen'
    },
    proTitle: 'Sollen wir deine Rezepte einpflegen?',
    proText: 'Mit dem Einpflege-Service überträgt der Gründer von Savour, selbst Koch, deinen ganzen Rezeptordner persönlich. Ab 249 € einmalig, mit einem Team-Abo nach Wahl.',
    faq: ['Könnt ihr meine Rezepte für mich einpflegen?', 'Ja. Mit dem Einpflege-Service überträgt der Gründer von Savour, selbst Koch, deinen ganzen Rezeptordner persönlich: eingepflegt, in Ordnern sortiert und jedes Rezept geprüft. Ab 249 € einmalig, mit einem Jahres-Abo Team 5, 10 oder 25. Die ersten 5 Küchen pflegen wir kostenlos ein.']
  },
  es: {
    feature: {
      slug: 'es/servicio-de-carga-de-recetas',
      menu: 'Cargamos tus recetas',
      short: 'Pasamos todo tu recetario por ti, revisado receta por receta.',
      title: 'Servicio de carga de recetas: digitalizamos tu recetario | Savour',
      desc: '¿Sin tiempo para pasar tus recetas? El fundador de Savour, cocinero, carga personalmente todo tu recetario: ordenado en carpetas, cada receta revisada y tu equipo listo para cocinar. Desde 249 €.',
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
    freeNote: 'Solo pagas tu plan de equipo. A cambio te pedimos una opinión sincera.',
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
      ['Solicítalo', 'Rellena el formulario. Nos ponemos en contacto para ver cuántas recetas son y cómo quieres organizarlas.'],
      ['Envía tus recetas', 'Envía tus archivos, fotos o exportaciones. Por desordenado que esté: para eso se hizo Savour.'],
      ['Cargamos y revisamos', 'Lo cargamos todo, lo ordenamos en carpetas y revisamos cada receta.'],
      ['Tú lo apruebas', 'Lo revisas todo, tu equipo recibe una invitación y podéis cocinar.']
    ],
    priceTitle: 'Precio',
    priceIntro: 'Pago único, con un plan anual Team 5, 10 o 25 a elegir. Precios sin IVA.',
    tier: n => `Hasta ${n} recetas`,
    tierMore: 'Más de 500 recetas',
    custom: 'A medida',
    example: 'Ejemplo: 250 recetas en una carpeta compartida para 5 cocineros = 495 € pago único + Team 5 por 89 € al año.',
    form: {
      title: 'Solicitar la carga',
      subject: 'Solicitud del servicio de carga',
      restaurant: 'Restaurante o empresa',
      recipes: '¿Cuántas recetas, más o menos?',
      recipeOptions: ['Hasta 100', 'De 100 a 250', 'De 250 a 500', 'Más de 500', 'Aún no lo sé'],
      team: '¿Qué plan de equipo?',
      teamOptions: ['Team 5', 'Team 10', 'Team 25', 'Aún no lo sé'],
      message: '¿En qué formato están tus recetas?',
      placeholder: 'Por ejemplo: archivos Word, una carpeta impresa, libretas, recetas en otra app…',
      send: 'Solicitar la carga'
    },
    proTitle: '¿Prefieres que carguemos tus recetas?',
    proText: 'Con el servicio de carga, el fundador de Savour, cocinero, pasa personalmente todo tu recetario. Desde 249 € pago único, con un plan de equipo a elegir.',
    faq: ['¿Podéis cargar mis recetas por mí?', 'Sí. Con el servicio de carga, el fundador de Savour, cocinero, pasa personalmente todo tu recetario: cargado, ordenado en carpetas y cada receta revisada. Desde 249 € pago único, con un plan anual Team 5, 10 o 25. Las primeras 5 cocinas las cargamos gratis.']
  }
};
