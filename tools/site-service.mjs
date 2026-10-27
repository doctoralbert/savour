// Import service: de koks achter Savour zetten de receptenmap van een keuken persoonlijk over in Savour.
// Eén plek voor alle teksten en prijzen in vier talen. tools/build-seo.mjs maakt er een eigen pagina van
// (met prijzen, stappen en aanvraagformulier), een blok op de startpagina, een blok op de prijzenpagina en een vraag.
//
// Prijs: eenmalig, bij een jaarabonnement Team 5, 10 of 25 naar keuze. Prijzen gekozen door de eigenaar.
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
      menu: 'Import service',
      short: 'Wij zetten je hele receptenmap voor je over, recept voor recept nagekeken.',
      title: 'Recepten laten inladen: wij digitaliseren je receptenmap | Savour',
      desc: 'Geen tijd om je recepten over te zetten? De koks achter Savour laden je hele receptenmap persoonlijk in: geordend in mappen, elk recept nagekeken en de omgeving klaar voor je brigade. Vanaf €85.',
      h1: 'Wij laden je hele receptenmap voor je in',
      lead: 'Geen tijd om honderden recepten over te zetten? De koks achter Savour laden persoonlijk al je aangeleverde recepten in en zetten de hele omgeving klaar, zodat je brigade meteen kan starten.',
      sections: [
        ['Waarom we dit doen', 'De grootste drempel voor een keuken is niet de app, maar het overzetten. Driehonderd recepten in Word, een map met vlekken, schriften van de vorige chef: daar heeft niemand tijd voor naast de service. Dus doen wij het.'],
        ['Door koks, niet door een callcenter', 'Je recepten worden ingeladen door mensen die zelf in de keuken hebben gestaan. Mensen die weten wat een fond is, dat 1 el geen 1 liter is en dat je mise-en-place per partie wilt kunnen vinden. Elk recept wordt naast het origineel gelegd en nagekeken.'],
        ['Je recepten blijven van jou', 'Recepten zijn het kapitaal van je keuken. We gebruiken ze alleen om ze voor jou in te laden, delen ze met niemand en verwijderen je bronbestanden zodra alles klaarstaat.']
      ]
    },
    kicker: 'Import service',
    bandTitle: 'Geen tijd om alles over te zetten? Wij doen het voor je.',
    bandText: 'De koks achter Savour laden al je recepten persoonlijk in en zetten de hele omgeving klaar, zodat je brigade meteen kan starten. Geordend zoals jullie werken, elk recept nagekeken.',
    bandButton: 'Laat je recepten inladen',
    free: n => `Introductie: de eerste ${n} keukens laden we gratis in`,
    freeNote: 'Je betaalt alleen je teamabonnement. In ruil vragen we om eerlijke feedback.',
    includedTitle: 'Wat je krijgt',
    included: [
      "Al je recepten ingeladen: Word, PDF, foto’s van schriften en kladjes, en exports uit andere apps",
      "Een mappenstructuur zoals jullie werken: per partie, menu, seizoen of vestiging",
      "Elk recept nagekeken tegen het origineel: hoeveelheden, eenheden, opbrengst en bereiding",
      "Accounts voor iedereen in je team, met Savour Pro en toegang tot de recepten",
      "Iedereen krijgt een mail om zelf een wachtwoord te kiezen zodra alles klaarstaat",
      "Vertrouwelijk: je aangeleverde bestanden en gegevens worden gewist zodra je gedeelde map klaarstaat"
    ],
    stepsTitle: 'Hoe het werkt',
    steps: [
      [
        "Vraag aan",
        "Kies een pakket en vul de aanvraag in. Wij bekijken hem en mailen je zo snel mogelijk."
      ],
      [
        "Betaal",
        "Na goedkeuring krijg je een persoonlijke link. Kies de grootte van je team en betaal het abonnement en het pakket in één keer."
      ],
      [
        "Lever aan",
        "Upload je recepten, geef je mappenstructuur door en vul de e-mailadressen van je collega’s in."
      ],
      [
        "Wij laden in",
        "We zetten alles in de juiste mappen en kijken elk recept na."
      ],
      [
        "Je team staat klaar",
        "Iedereen krijgt een mail om een wachtwoord te kiezen en kan meteen koken. Je aangeleverde gegevens worden gewist."
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
    payNote: "We bekijken je aanvraag en mailen je zo snel mogelijk. Na goedkeuring krijg je een persoonlijke link om te betalen en aan te leveren.",
    priceTitle: 'Prijs',
    priceIntro: "Eenmalig, samen met een jaarabonnement Team 5 (€89), 10 (€149) of 25 (€299) naar keuze. Je betaalt pas na goedkeuring.",
    tier: n => `Tot ${n} recepten`,
    tierMore: 'Meer dan 1000 recepten',
    custom: 'In overleg',
    example: 'Voorbeeld: 250 recepten in een gedeelde map voor 5 koks = €100 eenmalig + Team 5 voor €89 per jaar.',
    form: {
      "title": "Inladen aanvragen",
      "subject": "Import service aanvragen",
      "restaurant": "Restaurant of bedrijf",
      "package": "Pakket",
      "packageMore": "Meer dan 1000 recepten (in overleg)",
      "team": "Welk teamabonnement?",
      "teamOptions": [
        "Team 5",
        "Team 10",
        "Team 25",
        "Weet ik nog niet"
      ],
      "message": "Opmerkingen",
      "placeholder": "Bijvoorbeeld: in welke vorm je recepten zijn, of wanneer je het klaar wilt hebben…",
      "send": "Aanvraag versturen"
    },
    proTitle: 'Liever dat wij je recepten inladen?',
    proText: 'Met de import service zetten de koks achter Savour je hele receptenmap persoonlijk over en staat je omgeving klaar voor het team. Vanaf €85 eenmalig, bij een teamabonnement naar keuze.',
    requestOk: "Bedankt! Je aanvraag is verstuurd. Je krijgt een bevestiging per mail en hoort zo snel mogelijk van ons.",
    faqs: [
      [
        "Kunnen jullie mijn recepten voor me inladen?",
        "Ja. Met de import service zetten de koks achter Savour je hele receptenmap persoonlijk over: ingeladen, geordend in jouw mappen en elk recept nagekeken. Vanaf €85 eenmalig, samen met een jaarabonnement Team 5, 10 of 25. De eerste 5 keukens laden we gratis in."
      ],
      [
        "Hoe werkt de import service?",
        "Je vraagt hem aan op de site. Na goedkeuring krijg je een persoonlijke link: je betaalt het teamabonnement en het pakket, en levert daarna je recepten, je mappenstructuur en de e-mailadressen van je collega’s aan. Wij laden alles in en kijken het na. Zodra je gedeelde map klaarstaat, krijgt iedereen een mail om een wachtwoord te kiezen."
      ],
      [
        "Wat gebeurt er met de bestanden die ik aanlever?",
        "Ze staan in een afgeschermde opslag die alleen Savour kan zien, en worden samen met je overige aangeleverde gegevens gewist zodra je gedeelde map klaarstaat. Je recepten staan daarna alleen nog in jouw gedeelde map in Savour."
      ],
      [
        "Moeten mijn collega’s zelf een account maken?",
        "Nee. Bij de import service maken wij de accounts aan voor de e-mailadressen die je doorgeeft. Iedereen krijgt Savour Pro via je team en een mail om zelf een wachtwoord te kiezen."
      ]
    ],
  },
  en: {
    feature: {
      slug: 'en/recipe-import-service',
      menu: 'Import service',
      short: 'We move your whole recipe folder over for you, checked recipe by recipe.',
      title: 'Recipe import service: we digitise your recipe folder | Savour',
      desc: 'No time to move your recipes over? The chefs behind Savour personally import your whole recipe folder: organised in folders, every recipe checked and everything ready for your brigade. From €85.',
      h1: 'We import your whole recipe folder for you',
      lead: 'No time to move hundreds of recipes over? The chefs behind Savour personally import every recipe you send and set up the whole environment, so your brigade can start straight away.',
      sections: [
        ['Why we do this', 'The biggest hurdle for a kitchen is not the app, it is moving everything over. Three hundred recipes in Word, a stained binder, notebooks from the previous chef: nobody has time for that next to service. So we do it.'],
        ['By chefs, not a call centre', 'Your recipes are imported by people who have worked in a kitchen. People who know what a stock is, that 1 tbsp is not 1 litre and that you want to find your mise en place by section. Every recipe is laid next to the original and checked.'],
        ['Your recipes stay yours', 'Recipes are the capital of your kitchen. We only use them to import them for you, share them with no one and delete your source files as soon as everything is ready.']
      ]
    },
    kicker: 'Import service',
    bandTitle: 'No time to move everything over? We do it for you.',
    bandText: 'The chefs behind Savour personally import all your recipes and set up the whole environment, so your brigade can start straight away. Organised the way you work, every recipe checked.',
    bandButton: 'Have your recipes imported',
    free: n => `Launch offer: the first ${n} kitchens are imported for free`,
    freeNote: 'You only pay for your team plan. In return we ask for honest feedback.',
    includedTitle: 'What you get',
    included: [
      "All your recipes imported: Word, PDF, photos of notebooks and notes, and exports from other apps",
      "A folder structure that matches how you work: by section, menu, season or location",
      "Every recipe checked against the original: quantities, units, yield and method",
      "Accounts for everyone in your team, with Savour Pro and access to the recipes",
      "Everyone gets an email to choose their own password as soon as everything is ready",
      "Confidential: your files and details are deleted as soon as your team is ready"
    ],
    stepsTitle: 'How it works',
    steps: [
      [
        "Request",
        "Choose a package and fill in the request. We review it and email you as soon as possible."
      ],
      [
        "Pay",
        "Once approved you get a personal link. Choose the size of your team and pay the plan and the package in one go."
      ],
      [
        "Send your recipes",
        "Upload your recipes, tell us your folder structure and enter the email addresses of your colleagues."
      ],
      [
        "We import",
        "We put everything in the right folders and check every recipe."
      ],
      [
        "Your team is ready",
        "Everyone gets an email to choose a password and can start cooking. Your files and details are deleted."
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
    payNote: "We review your request and email you as soon as possible. Once approved you get a personal link to pay and send your recipes.",
    priceTitle: 'Price',
    priceIntro: "One-off, together with a yearly Team 5 (€89), 10 (€149) or 25 (€299) plan of your choice. You only pay after approval.",
    tier: n => `Up to ${n} recipes`,
    tierMore: 'More than 1,000 recipes',
    custom: 'Let’s talk',
    example: 'Example: 250 recipes in a shared folder for 5 cooks = €100 one-off + Team 5 for €89 a year.',
    form: {
      "title": "Request an import",
      "subject": "Import service request",
      "restaurant": "Restaurant or company",
      "package": "Package",
      "packageMore": "More than 1,000 recipes (let’s talk)",
      "team": "Which team plan?",
      "teamOptions": [
        "Team 5",
        "Team 10",
        "Team 25",
        "Not sure yet"
      ],
      "message": "Notes",
      "placeholder": "For example: what form your recipes are in, or when you would like it ready…",
      "send": "Send request"
    },
    proTitle: 'Rather have us import your recipes?',
    proText: 'With the import service, the chefs behind Savour personally move your whole recipe folder over and set everything up for your team. From €85 one-off, with an team plan of your choice.',
    requestOk: "Thank you! Your request has been sent. You will get a confirmation by email and hear from us as soon as possible.",
    faqs: [
      [
        "Can you import my recipes for me?",
        "Yes. With the import service, the chefs behind Savour personally move your whole recipe folder over: imported, organised in your folders and every recipe checked. From €85 one-off, together with a yearly Team 5, 10 or 25 plan. The first 5 kitchens are imported for free."
      ],
      [
        "How does the import service work?",
        "You request it on the website. Once approved you get a personal link: you pay the team plan and the package, then send us your recipes, your folder structure and the email addresses of your colleagues. We import and check everything. As soon as your team is ready, everyone gets an email to choose a password."
      ],
      [
        "What happens to the files I send?",
        "They are kept in private storage that only Savour can see, and are deleted together with your other details as soon as your team is ready. After that your recipes only live in your team in Savour."
      ],
      [
        "Do my colleagues have to create an account?",
        "No. With the import service we create the accounts for the email addresses you give us. Everyone gets Savour Pro through your team and an email to choose their own password."
      ]
    ],
  },
  de: {
    feature: {
      slug: 'de/rezepte-einpflegen-lassen',
      menu: 'Import-Service',
      short: 'Wir übertragen deinen ganzen Rezeptordner für dich, Rezept für Rezept geprüft.',
      title: 'Rezepte einpflegen lassen: wir digitalisieren deinen Rezeptordner | Savour',
      desc: 'Keine Zeit, deine Rezepte zu übertragen? Die Köche hinter Savour pflegen deinen ganzen Rezeptordner persönlich ein: in Ordnern sortiert, jedes Rezept geprüft und alles bereit für deine Brigade. Ab 85 €.',
      h1: 'Wir pflegen deinen ganzen Rezeptordner für dich ein',
      lead: 'Keine Zeit, Hunderte Rezepte zu übertragen? Die Köche hinter Savour pflegen alle gelieferten Rezepte persönlich ein und richten alles ein, damit deine Brigade sofort loslegen kann.',
      sections: [
        ['Warum wir das machen', 'Die größte Hürde für eine Küche ist nicht die App, sondern das Übertragen. Dreihundert Rezepte in Word, ein fleckiger Ordner, Hefte vom vorigen Küchenchef: dafür hat neben dem Service niemand Zeit. Also machen wir das.'],
        ['Von Köchen, nicht von einem Callcenter', 'Deine Rezepte pflegen Leute ein, die selbst in der Küche gestanden haben. Leute, die wissen, was ein Fond ist, dass 1 EL nicht 1 Liter ist und dass du deine Mise en place nach Posten finden willst. Jedes Rezept wird neben das Original gelegt und geprüft.'],
        ['Deine Rezepte bleiben deine', 'Rezepte sind das Kapital deiner Küche. Wir nutzen sie nur, um sie für dich einzupflegen, geben sie an niemanden weiter und löschen deine Quelldateien, sobald alles bereitsteht.']
      ]
    },
    kicker: 'Import-Service',
    bandTitle: 'Keine Zeit, alles zu übertragen? Wir machen das für dich.',
    bandText: 'Die Köche hinter Savour pflegen alle Rezepte persönlich ein und richten alles ein, damit deine Brigade sofort loslegen kann. Sortiert, wie ihr arbeitet, jedes Rezept geprüft.',
    bandButton: 'Rezepte einpflegen lassen',
    free: n => `Zum Start: Die ersten ${n} Küchen pflegen wir kostenlos ein`,
    freeNote: 'Du zahlst nur dein Team-Abo. Im Gegenzug bitten wir um ehrliches Feedback.',
    includedTitle: 'Was du bekommst',
    included: [
      "Alle Rezepte eingepflegt: Word, PDF, Fotos von Heften und Notizen sowie Exporte aus anderen Apps",
      "Eine Ordnerstruktur, wie ihr arbeitet: nach Posten, Menü, Saison oder Standort",
      "Jedes Rezept mit dem Original abgeglichen: Mengen, Einheiten, Ausbeute und Zubereitung",
      "Konten für alle in deinem Team, mit Savour Pro und Zugriff auf die Rezepte",
      "Alle bekommen eine E-Mail, um selbst ein Passwort zu wählen, sobald alles bereitsteht",
      "Vertraulich: Deine gelieferten Dateien und Angaben werden gelöscht, sobald dein Team bereitsteht"
    ],
    stepsTitle: 'So funktioniert es',
    steps: [
      [
        "Anfragen",
        "Wähle ein Paket und füll die Anfrage aus. Wir prüfen sie und melden uns so schnell wie möglich."
      ],
      [
        "Bezahlen",
        "Nach der Freigabe bekommst du einen persönlichen Link. Wähle die Größe deinem Team und bezahle Abo und Paket in einem Schritt."
      ],
      [
        "Liefern",
        "Lade deine Rezepte hoch, nenne deine Ordnerstruktur und trag die E-Mail-Adressen deiner Kollegen ein."
      ],
      [
        "Wir pflegen ein",
        "Wir legen alles in die richtigen Ordner und prüfen jedes Rezept."
      ],
      [
        "Dein Team steht bereit",
        "Alle bekommen eine E-Mail zum Wählen eines Passworts und können loslegen. Deine gelieferten Angaben werden gelöscht."
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
    payNote: "Wir prüfen deine Anfrage und melden uns so schnell wie möglich. Nach der Freigabe bekommst du einen persönlichen Link zum Bezahlen und Liefern.",
    priceTitle: 'Preis',
    priceIntro: "Einmalig, zusammen mit einem Jahres-Abo Team 5 (89 €), 10 (149 €) oder 25 (299 €) nach Wahl. Du zahlst erst nach der Freigabe.",
    tier: n => `Bis ${n} Rezepte`,
    tierMore: 'Mehr als 1.000 Rezepte',
    custom: 'Nach Absprache',
    example: 'Beispiel: 250 Rezepte in einem geteilten Ordner für 5 Köche = 100 € einmalig + Team 5 für 89 € pro Jahr.',
    form: {
      "title": "Einpflegen anfragen",
      "subject": "Anfrage Import-Service",
      "restaurant": "Restaurant oder Unternehmen",
      "package": "Paket",
      "packageMore": "Mehr als 1.000 Rezepte (nach Absprache)",
      "team": "Welches Team-Abo?",
      "teamOptions": [
        "Team 5",
        "Team 10",
        "Team 25",
        "Weiß ich noch nicht"
      ],
      "message": "Anmerkungen",
      "placeholder": "Zum Beispiel: in welcher Form deine Rezepte vorliegen oder bis wann es fertig sein soll…",
      "send": "Anfrage senden"
    },
    proTitle: 'Sollen wir deine Rezepte einpflegen?',
    proText: 'Mit dem Import-Service übertragen die Köche hinter Savour deinen ganzen Rezeptordner persönlich und richten alles für dein Team ein. Ab 85 € einmalig, mit einem Team-Abo nach Wahl.',
    requestOk: "Danke! Deine Anfrage wurde gesendet. Du bekommst eine Bestätigung per E-Mail und hörst so schnell wie möglich von uns.",
    faqs: [
      [
        "Könnt ihr meine Rezepte für mich einpflegen?",
        "Ja. Mit dem Import-Service übertragen die Köche hinter Savour deinen ganzen Rezeptordner persönlich: eingepflegt, in deine Ordner sortiert und jedes Rezept geprüft. Ab 85 € einmalig, zusammen mit einem Jahres-Abo Team 5, 10 oder 25. Die ersten 5 Küchen pflegen wir kostenlos ein."
      ],
      [
        "Wie funktioniert der Import-Service?",
        "Du fragst ihn auf der Website an. Nach der Freigabe bekommst du einen persönlichen Link: Du bezahlst das Team-Abo und das Paket und lieferst danach deine Rezepte, deine Ordnerstruktur und die E-Mail-Adressen deiner Kollegen. Wir pflegen alles ein und prüfen es. Sobald dein Team bereitsteht, bekommen alle eine E-Mail zum Wählen eines Passworts."
      ],
      [
        "Was passiert mit den Dateien, die ich liefere?",
        "Sie liegen in einem geschützten Speicher, den nur Savour sehen kann, und werden zusammen mit deinen übrigen Angaben gelöscht, sobald dein Team bereitsteht. Danach sind deine Rezepte nur noch in deinem Team in Savour."
      ],
      [
        "Müssen meine Kollegen selbst ein Konto anlegen?",
        "Nein. Beim Import-Service legen wir die Konten für die E-Mail-Adressen an, die du uns nennst. Alle bekommen Savour Pro über dein Team und eine E-Mail, um selbst ein Passwort zu wählen."
      ]
    ],
  },
  es: {
    feature: {
      slug: 'es/servicio-de-carga-de-recetas',
      menu: 'Servicio de importación',
      short: 'Pasamos todo tu recetario por ti, revisado receta por receta.',
      title: 'Servicio de importación de recetas: digitalizamos tu recetario | Savour',
      desc: '¿Sin tiempo para pasar tus recetas? Los cocineros detrás de Savour cargan personalmente todo tu recetario: ordenado en carpetas, cada receta revisada y todo listo para tu brigada. Desde 85 €.',
      h1: 'Cargamos todo tu recetario por ti',
      lead: '¿Sin tiempo para pasar cientos de recetas? Los cocineros detrás de Savour cargan personalmente todas las recetas que envías y lo dejan todo preparado para que tu brigada empiece enseguida.',
      sections: [
        ['Por qué lo hacemos', 'La mayor barrera para una cocina no es la app, sino pasarlo todo. Trescientas recetas en Word, una carpeta con manchas, libretas del chef anterior: nadie tiene tiempo para eso además del servicio. Así que lo hacemos nosotros.'],
        ['Por cocineros, no por un call center', 'Tus recetas las cargan personas que han trabajado en una cocina. Personas que saben qué es un fondo, que 1 cucharada no es 1 litro y que quieres encontrar tu mise en place por partida. Cada receta se compara con el original y se revisa.'],
        ['Tus recetas siguen siendo tuyas', 'Las recetas son el capital de tu cocina. Solo las usamos para cargarlas por ti, no las compartimos con nadie y borramos tus archivos originales en cuanto todo está listo.']
      ]
    },
    kicker: 'Servicio de importación',
    bandTitle: '¿Sin tiempo para pasarlo todo? Lo hacemos por ti.',
    bandText: 'Los cocineros detrás de Savour cargan personalmente todas tus recetas y lo dejan todo preparado para que tu brigada empiece enseguida. Ordenado como trabajáis, cada receta revisada.',
    bandButton: 'Que carguemos tus recetas',
    free: n => `Lanzamiento: las primeras ${n} cocinas las cargamos gratis`,
    freeNote: 'Solo pagas tu plan de equipo. A cambio te pedimos una opinión sincera.',
    includedTitle: 'Qué incluye',
    included: [
      "Todas tus recetas cargadas: Word, PDF, fotos de libretas y notas, y exportaciones de otras apps",
      "Una estructura de carpetas como trabajáis: por partida, menú, temporada o local",
      "Cada receta revisada con el original: cantidades, unidades, rendimiento y elaboración",
      "Cuentas para todos en tu equipo, con Savour Pro y acceso a las recetas",
      "Todos reciben un correo para elegir su contraseña en cuanto todo está listo",
      "Confidencial: tus archivos y datos se borran en cuanto tu equipo está lista"
    ],
    stepsTitle: 'Cómo funciona',
    steps: [
      [
        "Solicítalo",
        "Elige un paquete y rellena la solicitud. La revisamos y te escribimos lo antes posible."
      ],
      [
        "Paga",
        "Tras la aprobación recibes un enlace personal. Elige el tamaño de tu equipo y paga el plan y el paquete de una vez."
      ],
      [
        "Envía tus recetas",
        "Sube tus recetas, indícanos tu estructura de carpetas y escribe los correos de tus compañeros."
      ],
      [
        "Las cargamos",
        "Lo ponemos todo en las carpetas correctas y revisamos cada receta."
      ],
      [
        "Tu equipo está lista",
        "Todos reciben un correo para elegir contraseña y pueden empezar a cocinar. Tus datos enviados se borran."
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
    payNote: "Revisamos tu solicitud y te escribimos lo antes posible. Tras la aprobación recibes un enlace personal para pagar y enviar tus recetas.",
    priceTitle: 'Precio',
    priceIntro: "Pago único, junto con un plan anual Equipo 5 (89 €), 10 (149 €) o 25 (299 €) a elegir. Solo pagas tras la aprobación.",
    tier: n => `Hasta ${n} recetas`,
    tierMore: 'Más de 1.000 recetas',
    custom: 'A convenir',
    example: 'Ejemplo: 250 recetas en una carpeta compartida para 5 cocineros = 100 € pago único + Equipo 5 por 89 € al año.',
    form: {
      "title": "Solicitar la carga",
      "subject": "Solicitud del servicio de importación",
      "restaurant": "Restaurante o empresa",
      "package": "Paquete",
      "packageMore": "Más de 1.000 recetas (a convenir)",
      "team": "¿Qué plan de equipo?",
      "teamOptions": [
        "Equipo 5",
        "Equipo 10",
        "Equipo 25",
        "Aún no lo sé"
      ],
      "message": "Comentarios",
      "placeholder": "Por ejemplo: en qué formato están tus recetas o para cuándo lo quieres…",
      "send": "Enviar solicitud"
    },
    proTitle: '¿Prefieres que carguemos tus recetas?',
    proText: 'Con el servicio de importación, los cocineros detrás de Savour pasan personalmente todo tu recetario y lo preparan todo para tu equipo. Desde 85 € pago único, con un plan de equipo a elegir.',
    requestOk: "¡Gracias! Tu solicitud se ha enviado. Recibirás una confirmación por correo y te escribiremos lo antes posible.",
    faqs: [
      [
        "¿Podéis cargar mis recetas por mí?",
        "Sí. Con el servicio de importación, los cocineros detrás de Savour pasan personalmente todo tu recetario: cargado, ordenado en tus carpetas y cada receta revisada. Desde 85 € pago único, junto con un plan anual Equipo 5, 10 o 25. Las primeras 5 cocinas las cargamos gratis."
      ],
      [
        "¿Cómo funciona el servicio de importación?",
        "Lo solicitas en la web. Tras la aprobación recibes un enlace personal: pagas el plan de equipo y el paquete, y después nos envías tus recetas, tu estructura de carpetas y los correos de tus compañeros. Lo cargamos y revisamos todo. En cuanto tu equipo está lista, todos reciben un correo para elegir contraseña."
      ],
      [
        "¿Qué pasa con los archivos que envío?",
        "Se guardan en un almacenamiento privado que solo Savour puede ver y se borran junto con tus demás datos en cuanto tu equipo está lista. Después tus recetas solo están en tu equipo en Savour."
      ],
      [
        "¿Mis compañeros tienen que crear una cuenta?",
        "No. Con el servicio de importación creamos las cuentas para los correos que nos das. Todos reciben Savour Pro a través de tu equipo y un correo para elegir su contraseña."
      ]
    ],
  }
};
