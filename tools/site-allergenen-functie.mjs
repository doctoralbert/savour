// Functiepagina "Allergenen per recept" (live sinds 2026-11-08), in vijf talen. tools/build-seo.mjs zet hem tussen
// de functies, vóór "Binnenkort", net als de import service. Alles wat hier staat, klopt met js/features/products.js
// en product-review.js; de uitgebreide uitleg staat in de blog (tools/site-blog-allergenen.mjs).
// ALLERGEN_FEATURE[lang]: de pagina; ALLERGEN_FEATURE_RICH[lang]: voordelen, scherm uit de app en vragen.

const shot = (name, alt, title, text) => ({ shot: `/assets/app/${name}-{lang}.jpg`, alt, title, text });

export const ALLERGEN_FEATURE = {
  nl: {
    slug: 'allergenen-per-recept',
    menu: 'Allergenen per recept',
    short: 'De 14 allergenen bij elk recept, ook via basisrecepten.',
    title: 'Allergenen per recept bijhouden, ook via basisrecepten | Savour',
    desc: 'Savour herkent de ingrediënten in je recepten en toont per recept de 14 allergenen, ook via basisrecepten. Jij bevestigt alleen wat Savour niet zeker weet. Met allergenenkaart en print.',
    h1: 'Allergenen per recept',
    lead: 'Welke allergenen zitten in de saus, ook via de fond en de beurre blanc? Savour zoekt het voor je uit. Jij beantwoordt alleen de vragen.',
    sections: [
      [
        'Savour leest je ingrediënten zelf',
        'Bij elke receptregel zoekt Savour het ingrediënt in de Savour-lijst: een gedeelde lijst met ingrediënten en hun allergenen, in het Nederlands, Engels, Duits, Spaans en Frans. Wat daarin staat, telt meteen mee. Je hoeft dus niet honderden ingrediënten zelf in te voeren.'
      ],
      [
        'Ook via basisrecepten',
        'Gebruik je een fond, een deeg of een saus uit je eigen recepten, dan tellen de allergenen van dat basisrecept mee. Zit er selderij in de fond, dan zie je selderij ook bij het gerecht dat de fond gebruikt.'
      ],
      [
        'Eén vraag tegelijk',
        'Wat Savour niet zeker weet, staat onder Nakijken: klopt dit voorstel, klopt het voor jouw merk, is dit je eigen recept, is dit wel een ingrediënt? Je antwoordt met één klik. Er verandert nooit iets in een recept zonder dat jij ja zegt.'
      ],
      [
        'De 14 allergenen, en wat je zelf aanzet',
        'Standaard zie je de 14 allergenen uit de Europese regels. Vragen gasten ook naar lactose, varkensvlees, alcohol of knoflook, dan zet je die er zelf bij. Ze staan standaard uit.'
      ],
      [
        'Nooit stilletjes "allergeenvrij"',
        'Zolang een ingrediënt niet is nagekeken, staat er dat het recept nog niet compleet is. Pas als alles is nagekeken, zegt Savour dat er geen van de 14 allergenen in zit. Allergenen verschillen per merk, bijvoorbeeld bij gelatine, sojasaus, chocolade en bouillon: controleer altijd het etiket van jouw merk.'
      ],
      [
        'Allergenenkaart en print',
        'Bij elk recept klap je de allergenen open. De allergenenkaart laat per ingrediëntregel zien welke allergenen erin zitten. Bij printen kies je of de allergenen op het papier komen. Lees meer in [Allergenen in Savour: zo werkt het](/blog/allergenen-in-savour).'
      ]
    ]
  },
  en: {
    slug: 'en/allergens-per-recipe',
    menu: 'Allergens per recipe',
    short: 'The 14 allergens on every recipe, including through base recipes.',
    title: 'Track allergens per recipe, including base recipes | Savour',
    desc: 'Savour recognises the ingredients in your recipes and shows the 14 allergens per recipe, including through base recipes. You only confirm what Savour is not sure about. With allergen chart and print.',
    h1: 'Allergens per recipe',
    lead: 'Which allergens are in the sauce, including through the stock and the beurre blanc? Savour works it out for you. You only answer the questions.',
    sections: [
      [
        'Savour reads your ingredients',
        'For every recipe line Savour looks up the ingredient in the Savour list: a shared list of ingredients and their allergens, in Dutch, English, German, Spanish and French. Whatever is on it counts straight away. So you do not have to enter hundreds of ingredients yourself.'
      ],
      [
        'Through base recipes too',
        'If you use a stock, a dough or a sauce from your own recipes, the allergens of that base recipe count too. If there is celery in the stock, you also see celery on the dish that uses it.'
      ],
      [
        'One question at a time',
        'Whatever Savour is not sure about is under To check: is this suggestion right, is it right for your brand, is this your own recipe, is this an ingredient at all? You answer with one click. Nothing in a recipe changes unless you say yes.'
      ],
      [
        'The 14 allergens, and what you switch on',
        'By default you see the 14 allergens from the European rules. If guests also ask about lactose, pork, alcohol or garlic, you switch those on yourself. They are off by default.'
      ],
      [
        'Never quietly "allergen-free"',
        'As long as an ingredient has not been checked, the recipe says it is not complete yet. Only when everything is checked does Savour say it contains none of the 14 allergens. Allergens differ by brand, for example for gelatine, soy sauce, chocolate and stock: always check the label of your brand.'
      ],
      [
        'Allergen chart and print',
        'On every recipe you fold the allergens open. The allergen chart shows for each ingredient line which allergens it contains. When printing, you choose whether the allergens go on the paper. Read more in [Allergens in Savour: how it works](/en/blog/allergens-in-savour).'
      ]
    ]
  },
  de: {
    slug: 'de/allergene-pro-rezept',
    menu: 'Allergene pro Rezept',
    short: 'Die 14 Allergene bei jedem Rezept, auch über Grundrezepte.',
    title: 'Allergene pro Rezept erfassen, auch über Grundrezepte | Savour',
    desc: 'Savour erkennt die Zutaten in deinen Rezepten und zeigt pro Rezept die 14 Allergene, auch über Grundrezepte. Du bestätigst nur, was Savour nicht sicher weiß. Mit Allergenkarte und Druck.',
    h1: 'Allergene pro Rezept',
    lead: 'Welche Allergene stecken in der Sauce, auch über den Fond und die Beurre blanc? Savour findet es für dich heraus. Du beantwortest nur die Fragen.',
    sections: [
      [
        'Savour liest deine Zutaten selbst',
        'Bei jeder Rezeptzeile sucht Savour die Zutat in der Savour-Liste: einer gemeinsamen Liste mit Zutaten und ihren Allergenen, auf Niederländisch, Englisch, Deutsch, Spanisch und Französisch. Was darauf steht, zählt sofort mit. Du musst also nicht Hunderte Zutaten selbst eingeben.'
      ],
      [
        'Auch über Grundrezepte',
        'Nutzt du einen Fond, einen Teig oder eine Sauce aus deinen eigenen Rezepten, zählen die Allergene dieses Grundrezepts mit. Ist Sellerie im Fond, siehst du Sellerie auch beim Gericht, das den Fond verwendet.'
      ],
      [
        'Eine Frage nach der anderen',
        'Was Savour nicht sicher weiß, steht unter Prüfen: Stimmt dieser Vorschlag, stimmt er für deine Marke, ist das dein eigenes Rezept, ist das überhaupt eine Zutat? Du antwortest mit einem Klick. In einem Rezept ändert sich nie etwas, ohne dass du Ja sagst.'
      ],
      [
        'Die 14 Allergene, und was du selbst einschaltest',
        'Standardmäßig siehst du die 14 Allergene aus den europäischen Regeln. Fragen Gäste auch nach Laktose, Schweinefleisch, Alkohol oder Knoblauch, schaltest du diese selbst ein. Sie sind standardmäßig aus.'
      ],
      [
        'Nie heimlich „allergenfrei“',
        'Solange eine Zutat nicht geprüft ist, steht beim Rezept, dass es noch nicht vollständig ist. Erst wenn alles geprüft ist, sagt Savour, dass keines der 14 Allergene enthalten ist. Allergene unterscheiden sich je Marke, etwa bei Gelatine, Sojasauce, Schokolade und Brühe: Prüfe immer das Etikett deiner Marke.'
      ],
      [
        'Allergenkarte und Druck',
        'Bei jedem Rezept klappst du die Allergene auf. Die Allergenkarte zeigt für jede Zutatenzeile, welche Allergene darin sind. Beim Drucken wählst du, ob die Allergene aufs Papier kommen. Mehr dazu in [Allergene in Savour: so funktioniert es](/de/blog/allergene-in-savour).'
      ]
    ]
  },
  es: {
    slug: 'es/alergenos-por-receta',
    menu: 'Alérgenos por receta',
    short: 'Los 14 alérgenos en cada receta, también a través de recetas base.',
    title: 'Controla los alérgenos por receta, también en recetas base | Savour',
    desc: 'Savour reconoce los ingredientes de tus recetas y muestra los 14 alérgenos por receta, también a través de recetas base. Tú solo confirmas lo que Savour no sabe con seguridad. Con tabla de alérgenos e impresión.',
    h1: 'Alérgenos por receta',
    lead: '¿Qué alérgenos lleva la salsa, también a través del fondo y la beurre blanc? Savour lo averigua por ti. Tú solo respondes las preguntas.',
    sections: [
      [
        'Savour lee tus ingredientes',
        'En cada línea de la receta, Savour busca el ingrediente en la lista de Savour: una lista compartida de ingredientes y sus alérgenos, en neerlandés, inglés, alemán, español y francés. Lo que está en ella cuenta enseguida. Así no tienes que introducir cientos de ingredientes tú mismo.'
      ],
      [
        'También a través de recetas base',
        'Si usas un fondo, una masa o una salsa de tus propias recetas, también cuentan los alérgenos de esa receta base. Si el fondo lleva apio, también ves apio en el plato que usa el fondo.'
      ],
      [
        'Una pregunta cada vez',
        'Lo que Savour no sabe con seguridad está en Revisar: ¿es correcta esta sugerencia, es correcta para tu marca, es tu propia receta, es siquiera un ingrediente? Respondes con un clic. Nada cambia en una receta sin que tú digas que sí.'
      ],
      [
        'Los 14 alérgenos, y lo que activas tú',
        'Por defecto ves los 14 alérgenos de las normas europeas. Si los clientes también preguntan por lactosa, cerdo, alcohol o ajo, los activas tú. Están desactivados por defecto.'
      ],
      [
        'Nunca «sin alérgenos» a escondidas',
        'Mientras un ingrediente no esté revisado, la receta indica que aún no está completa. Solo cuando todo está revisado, Savour dice que no contiene ninguno de los 14 alérgenos. Los alérgenos cambian según la marca, por ejemplo en la gelatina, la salsa de soja, el chocolate y el caldo: revisa siempre la etiqueta de tu marca.'
      ],
      [
        'Tabla de alérgenos e impresión',
        'En cada receta despliegas los alérgenos. La tabla de alérgenos muestra para cada línea de ingredientes qué alérgenos contiene. Al imprimir eliges si los alérgenos aparecen en el papel. Más en [Alérgenos en Savour: así funciona](/es/blog/alergenos-en-savour).'
      ]
    ]
  },
  fr: {
    slug: 'fr/allergenes-par-recette',
    menu: 'Allergènes par recette',
    short: 'Les 14 allergènes sur chaque recette, y compris via les recettes de base.',
    title: 'Suivre les allergènes par recette, y compris les recettes de base | Savour',
    desc: 'Savour reconnaît les ingrédients de tes recettes et affiche les 14 allergènes par recette, y compris via les recettes de base. Tu confirmes seulement ce dont Savour n’est pas sûr. Avec tableau des allergènes et impression.',
    h1: 'Allergènes par recette',
    lead: 'Quels allergènes contient la sauce, y compris via le fond et le beurre blanc ? Savour le trouve pour toi. Tu réponds seulement aux questions.',
    sections: [
      [
        'Savour lit tes ingrédients',
        'Pour chaque ligne de recette, Savour cherche l’ingrédient dans la liste Savour : une liste commune d’ingrédients et de leurs allergènes, en néerlandais, anglais, allemand, espagnol et français. Ce qui y figure compte tout de suite. Tu n’as donc pas à saisir des centaines d’ingrédients toi-même.'
      ],
      [
        'Y compris via les recettes de base',
        'Si tu utilises un fond, une pâte ou une sauce de tes propres recettes, les allergènes de cette recette de base comptent aussi. S’il y a du céleri dans le fond, tu vois aussi le céleri sur le plat qui utilise ce fond.'
      ],
      [
        'Une question à la fois',
        'Ce dont Savour n’est pas sûr se trouve sous À vérifier : cette suggestion est-elle juste, l’est-elle pour ta marque, est-ce ta propre recette, est-ce vraiment un ingrédient ? Tu réponds en un clic. Rien ne change dans une recette sans ton accord.'
      ],
      [
        'Les 14 allergènes, et ce que tu actives',
        'Par défaut, tu vois les 14 allergènes des règles européennes. Si les clients demandent aussi le lactose, le porc, l’alcool ou l’ail, tu les actives toi-même. Ils sont désactivés par défaut.'
      ],
      [
        'Jamais « sans allergènes » en douce',
        'Tant qu’un ingrédient n’est pas vérifié, la recette indique qu’elle n’est pas encore complète. Ce n’est que lorsque tout est vérifié que Savour dit qu’elle ne contient aucun des 14 allergènes. Les allergènes varient selon la marque, par exemple pour la gélatine, la sauce soja, le chocolat et le bouillon : vérifie toujours l’étiquette de ta marque.'
      ],
      [
        'Tableau des allergènes et impression',
        'Sur chaque recette, tu déplies les allergènes. Le tableau des allergènes montre pour chaque ligne d’ingrédient les allergènes qu’elle contient. À l’impression, tu choisis si les allergènes figurent sur le papier. Plus d’infos dans [Les allergènes dans Savour : comment ça marche](/fr/blog/allergenes-dans-savour).'
      ]
    ]
  }
};

export const ALLERGEN_FEATURE_RICH = {
  nl: {
    benefits: [
      ['Vanzelf herkend', 'Savour zoekt de allergenen van je ingrediënten op.'],
      ['Ook via basisrecepten', 'De fond, het deeg en de saus tellen mee.'],
      ['Jij beslist', 'Eén vraag tegelijk; niets verandert zonder jouw ja.']
    ],
    showcase: [
      shot(
        'allergenen',
        'Het allergenenblok bij een recept in Savour',
        'Bij elk recept',
        'Melk uit de roomboter, sulfiet uit de wijn, en een duidelijke melding als nog niet alles is nagekeken. [Probeer het in de demo](@demo).'
      ),
      shot(
        'allergenenkaart',
        "De allergenenkaart van een recept in Savour",
        "De allergenenkaart",
        "Per ingrediëntregel zie je welke allergenen erin zitten, zodat je in één oogopslag weet waar de melk vandaan komt."
      )
    ],
    faq: [
      ['Kost het extra?', 'Allergenen horen bij Savour Pro, en werken ook in een keukenteam van een eigenaar met Pro. Nieuwe accounts krijgen 7 dagen Pro gratis.'],
      ['Moet ik alle ingrediënten zelf invoeren?', 'Nee. Wat in de Savour-lijst staat, telt meteen mee. Je bevestigt alleen wat per merk verschilt of wat Savour niet kent. [Bekijk de lijst](@list).'],
      ['Kan ik erop vertrouwen?', 'Savour zegt nooit dat iets allergeenvrij is zolang niet alles is nagekeken. Het etiket van je leverancier gaat altijd voor.']
    ]
  },
  en: {
    benefits: [
      ['Recognised for you', 'Savour looks up the allergens of your ingredients.'],
      ['Through base recipes', 'The stock, the dough and the sauce count too.'],
      ['You decide', 'One question at a time; nothing changes without your yes.']
    ],
    showcase: [
      shot(
        'allergenen',
        'The allergen block on a recipe in Savour',
        'On every recipe',
        'Milk from the butter, sulphites from the wine, and a clear note when not everything is checked yet. [Try it in the demo](@demo).'
      ),
      shot(
        'allergenenkaart',
        "The allergen chart of a recipe in Savour",
        "The allergen chart",
        "For each ingredient line you see which allergens it contains, so you know at a glance where the milk comes from."
      )
    ],
    faq: [
      ['Does it cost extra?', 'Allergens are part of Savour Pro, and also work in a kitchen team whose owner has Pro. New accounts get 7 days of Pro for free.'],
      ['Do I have to enter every ingredient?', 'No. Whatever is on the Savour list counts straight away. You only confirm what differs by brand or what Savour does not know. [See the list](@list).'],
      ['Can I rely on it?', 'Savour never says something is allergen-free while not everything is checked. Your supplier’s label always comes first.']
    ]
  },
  de: {
    benefits: [
      ['Von selbst erkannt', 'Savour sucht die Allergene deiner Zutaten heraus.'],
      ['Auch über Grundrezepte', 'Fond, Teig und Sauce zählen mit.'],
      ['Du entscheidest', 'Eine Frage nach der anderen; nichts ändert sich ohne dein Ja.']
    ],
    showcase: [
      shot(
        'allergenen',
        'Der Allergenblock bei einem Rezept in Savour',
        'Bei jedem Rezept',
        'Milch aus der Butter, Sulfite aus dem Wein und ein klarer Hinweis, wenn noch nicht alles geprüft ist. [Probier es in der Demo](@demo).'
      ),
      shot(
        'allergenenkaart',
        "Die Allergenkarte eines Rezepts in Savour",
        "Die Allergenkarte",
        "Für jede Zutatenzeile siehst du, welche Allergene darin sind, und weißt auf einen Blick, woher die Milch kommt."
      )
    ],
    faq: [
      ['Kostet es extra?', 'Allergene gehören zu Savour Pro und funktionieren auch in einem Küchenteam, dessen Eigentümer Pro hat. Neue Konten bekommen 7 Tage Pro gratis.'],
      ['Muss ich alle Zutaten selbst eingeben?', 'Nein. Was auf der Savour-Liste steht, zählt sofort mit. Du bestätigst nur, was je Marke verschieden ist oder was Savour nicht kennt. [Zur Liste](@list).'],
      ['Kann ich mich darauf verlassen?', 'Savour sagt nie, dass etwas allergenfrei ist, solange nicht alles geprüft ist. Das Etikett deines Lieferanten geht immer vor.']
    ]
  },
  es: {
    benefits: [
      ['Reconocido por ti', 'Savour busca los alérgenos de tus ingredientes.'],
      ['También en recetas base', 'El fondo, la masa y la salsa cuentan.'],
      ['Tú decides', 'Una pregunta cada vez; nada cambia sin tu sí.']
    ],
    showcase: [
      shot(
        'allergenen',
        'El bloque de alérgenos en una receta de Savour',
        'En cada receta',
        'Leche de la mantequilla, sulfitos del vino y un aviso claro cuando aún no está todo revisado. [Pruébalo en la demo](@demo).'
      ),
      shot(
        'allergenenkaart',
        "La tabla de alérgenos de una receta en Savour",
        "La tabla de alérgenos",
        "Para cada línea de ingredientes ves qué alérgenos contiene, y sabes de un vistazo de dónde viene la leche."
      )
    ],
    faq: [
      ['¿Cuesta más?', 'Los alérgenos forman parte de Savour Pro y también funcionan en un equipo de cocina cuyo propietario tiene Pro. Las cuentas nuevas reciben 7 días de Pro gratis.'],
      ['¿Tengo que introducir todos los ingredientes?', 'No. Lo que está en la lista de Savour cuenta enseguida. Solo confirmas lo que cambia según la marca o lo que Savour no conoce. [Ver la lista](@list).'],
      ['¿Puedo fiarme?', 'Savour nunca dice que algo está libre de alérgenos mientras no esté todo revisado. La etiqueta de tu proveedor siempre manda.']
    ]
  },
  fr: {
    benefits: [
      ['Reconnu pour toi', 'Savour cherche les allergènes de tes ingrédients.'],
      ['Via les recettes de base', 'Le fond, la pâte et la sauce comptent aussi.'],
      ['Tu décides', 'Une question à la fois ; rien ne change sans ton accord.']
    ],
    showcase: [
      shot(
        'allergenen',
        'Le bloc allergènes d’une recette dans Savour',
        'Sur chaque recette',
        'Le lait du beurre, les sulfites du vin, et un avertissement clair quand tout n’est pas encore vérifié. [Essaie dans la démo](@demo).'
      ),
      shot(
        'allergenenkaart',
        "Le tableau des allergènes d’une recette dans Savour",
        "Le tableau des allergènes",
        "Pour chaque ligne d’ingrédient, tu vois les allergènes qu’elle contient et tu sais d’un coup d’œil d’où vient le lait."
      )
    ],
    faq: [
      ['Est-ce payant ?', 'Les allergènes font partie de Savour Pro et fonctionnent aussi dans une équipe de cuisine dont le propriétaire a Pro. Les nouveaux comptes reçoivent 7 jours de Pro gratuits.'],
      ['Dois-je saisir tous les ingrédients ?', 'Non. Ce qui figure dans la liste Savour compte tout de suite. Tu confirmes seulement ce qui varie selon la marque ou ce que Savour ne connaît pas. [Voir la liste](@list).'],
      ['Puis-je m’y fier ?', 'Savour ne dit jamais qu’un plat est sans allergènes tant que tout n’est pas vérifié. L’étiquette de ton fournisseur prime toujours.']
    ]
  }
};
