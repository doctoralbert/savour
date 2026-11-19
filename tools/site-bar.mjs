// Voor-wiepagina "Voor bartenders" (2026-11-19), in vijf talen. tools/build-seo.mjs zet hem na "Keukenbrigades".
// Alles wat hier staat, klopt met de app: omrekenen in cl, ml, oz, dashes en barspoons (js/features/scale.js, oz bij
// een drank wordt nooit pond), de Savour-lezer leest cocktailspecs (test in tests/lezer.test.mjs), cocktails vallen
// onder Dranken (js/data/default-categories.js) en de barproducten staan in de Savour-lijst
// (supabase/2026-11-19-ingredienten-bar.sql). In de app heet een team nog "keukenteam"; dat zeggen we eerlijk.
// Geen keukenfoto's en geen schermen: de demo heeft (nog) geen cocktails.

export const BAR_AUDIENCE = {
  nl: {
    slug: 'voor-bartenders',
    menu: 'Bartenders',
    short: 'Voor bartenders en barteams: je specs, siropen en batches op één plek.',
    title: 'App voor cocktailrecepten en specs, voor bartenders | Savour',
    desc: 'Savour voor de bar: al je cocktailspecs, siropen en cordials op één plek, batchen in cl, oz en dashes zonder rekenfouten, je hele barteam met dezelfde specs en allergenen per drank.',
    h1: 'Voor bartenders',
    lead: 'Een spec moet kloppen, elke avond en bij elke bartender. Savour bewaart je cocktails, siropen en cordials precies zoals je ze schreef, en rekent ze om voor de batch.',
    sections: [
      [
        'Je specs op één plek',
        'Cocktails, siropen, cordials, shrubs en infusies: alles in één receptenboek, ingedeeld zoals jouw bar werkt. Een map voor de vaste kaart, één voor het seizoen en één voor je basisbereidingen. Bekende cocktails als een Negroni, Mojito of Whiskey Sour komen bij een nieuw account vanzelf onder Dranken.'
      ],
      [
        'Batchen zonder rekenfouten',
        'Van één glas naar een batch van 40: Savour rekent cl, ml, oz, dashes en barspoons om. 2 dashes Angostura worden 20 dashes, en ounces bij een drank blijven ounces in plaats van ponden. "Top up met soda" blijft staan zoals het staat: dat schenk je per glas.'
      ],
      [
        'Je kaart overzetten',
        'Staan je specs in Word, een PDF of een notitie? De Savour-lezer leest ze gratis in, ook met cl, oz en dashes, en ook als er meerdere cocktails in één bestand staan. Een foto van je specboek leest de AI, met Savour Pro. Savour verzint niets: twijfel zie je voordat er iets wordt opgeslagen.'
      ],
      [
        'Hetzelfde recept voor de hele bar',
        'Maak een team voor je bar (in Savour heet dat een keukenteam) en nodig je collega’s uit. Iedereen werkt met dezelfde specs; wat jij aanpast, ziet het hele team meteen. Meekijken en omrekenen kan met een gratis account.'
      ],
      [
        'Allergenen per drank',
        'Eiwit in een sour, room in een likeur, amandel in orgeat, sulfiet in vermout en prosecco: Savour zoekt bij elk ingrediënt de allergenen op en telt ze per drank op, ook via je eigen siropen. Merkproducten die per merk verschillen, zie je gemarkeerd. Allergenen horen bij Savour Pro.'
      ],
      [
        'Mise-en-place voor de bar',
        'Citrus persen, siropen maken, garnituren snijden, ijs klaarzetten: zet het in een MEP-lijst en vink af wat klaarstaat, samen met je team. Ook op de telefoon achter de bar, met grote letters in de kookmodus.'
      ]
    ]
  },
  en: {
    slug: 'en/for-bartenders',
    menu: 'Bartenders',
    short: 'For bartenders and bar teams: your specs, syrups and batches in one place.',
    title: 'Cocktail recipe and spec app for bartenders | Savour',
    desc: 'Savour for the bar: all your cocktail specs, syrups and cordials in one place, batching in cl, oz and dashes without mistakes, your whole bar team on the same specs and allergens per drink.',
    h1: 'For bartenders',
    lead: 'A spec has to be right, every night and with every bartender. Savour keeps your cocktails, syrups and cordials exactly as you wrote them, and scales them for the batch.',
    sections: [
      [
        'Your specs in one place',
        'Cocktails, syrups, cordials, shrubs and infusions: all in one recipe book, organised the way your bar works. A folder for the house menu, one for the season and one for your preps. Well-known cocktails such as a Negroni, Mojito or Whiskey Sour land under Drinks by themselves in a new account.'
      ],
      [
        'Batching without mistakes',
        'From one glass to a batch of 40: Savour converts cl, ml, oz, dashes and barspoons. 2 dashes of Angostura become 20 dashes, and ounces in a drink stay ounces instead of turning into pounds. "Top up with soda" stays as it is: you pour that per glass.'
      ],
      [
        'Bring your menu over',
        'Are your specs in Word, a PDF or a note? The Savour reader reads them for free, with cl, oz and dashes, even with several cocktails in one file. A photo of your spec book is read by the AI, with Savour Pro. Savour invents nothing: you see any doubt before anything is saved.'
      ],
      [
        'The same recipe for the whole bar',
        'Create a team for your bar (in Savour it is called a kitchen team) and invite your colleagues. Everyone works from the same specs; what you change, the whole team sees straight away. Viewing and scaling work with a free account.'
      ],
      [
        'Allergens per drink',
        'Egg white in a sour, cream in a liqueur, almond in orgeat, sulphites in vermouth and prosecco: Savour looks up the allergens of every ingredient and adds them up per drink, also through your own syrups. Products that differ by brand are marked. Allergens are part of Savour Pro.'
      ],
      [
        'Mise en place for the bar',
        'Squeezing citrus, making syrups, cutting garnishes, setting up ice: put it in a prep list and tick off what is ready, together with your team. On the phone behind the bar too, in large text in cook mode.'
      ]
    ]
  },
  de: {
    slug: 'de/fuer-bartender',
    menu: 'Bartender',
    short: 'Für Bartender und Barteams: deine Specs, Sirupe und Batches an einem Ort.',
    title: 'App für Cocktailrezepte und Specs, für Bartender | Savour',
    desc: 'Savour für die Bar: alle Cocktail-Specs, Sirupe und Cordials an einem Ort, Batches in cl, oz und Dashes ohne Rechenfehler, dein ganzes Barteam mit denselben Specs und Allergene pro Drink.',
    h1: 'Für Bartender',
    lead: 'Eine Spec muss stimmen, jeden Abend und bei jedem Bartender. Savour bewahrt deine Cocktails, Sirupe und Cordials genau so, wie du sie geschrieben hast, und rechnet sie für den Batch um.',
    sections: [
      [
        'Deine Specs an einem Ort',
        'Cocktails, Sirupe, Cordials, Shrubs und Infusionen: alles in einem Rezeptbuch, geordnet wie deine Bar arbeitet. Ein Ordner für die feste Karte, einer für die Saison und einer für deine Grundzubereitungen. Bekannte Cocktails wie Negroni, Mojito oder Whiskey Sour landen in einem neuen Konto von selbst unter Getränke.'
      ],
      [
        'Batchen ohne Rechenfehler',
        'Von einem Glas auf einen Batch von 40: Savour rechnet cl, ml, oz, Dashes und Barspoons um. 2 Dashes Angostura werden 20 Dashes, und Unzen bei einem Drink bleiben Unzen statt Pfund. „Top up mit Soda“ bleibt, wie es ist: das gießt du pro Glas auf.'
      ],
      [
        'Deine Karte übernehmen',
        'Stehen deine Specs in Word, einem PDF oder einer Notiz? Der Savour-Leser liest sie kostenlos ein, mit cl, oz und Dashes, auch mehrere Cocktails in einer Datei. Ein Foto deines Spec-Buchs liest die KI, mit Savour Pro. Savour erfindet nichts: Zweifel siehst du, bevor etwas gespeichert wird.'
      ],
      [
        'Dasselbe Rezept für die ganze Bar',
        'Leg ein Team für deine Bar an (in Savour heißt das Küchenteam) und lade deine Kollegen ein. Alle arbeiten mit denselben Specs; was du änderst, sieht das ganze Team sofort. Ansehen und Umrechnen geht mit einem kostenlosen Konto.'
      ],
      [
        'Allergene pro Drink',
        'Eiweiß im Sour, Sahne im Likör, Mandel im Orgeat, Sulfite in Wermut und Prosecco: Savour sucht die Allergene jeder Zutat heraus und zählt sie pro Drink zusammen, auch über deine eigenen Sirupe. Produkte, die je Marke verschieden sind, werden markiert. Allergene gehören zu Savour Pro.'
      ],
      [
        'Mise en place für die Bar',
        'Zitrus pressen, Sirupe kochen, Garnituren schneiden, Eis bereitstellen: setz es auf eine MEP-Liste und hake ab, was bereitsteht, zusammen mit deinem Team. Auch auf dem Handy hinter der Bar, in großer Schrift im Kochmodus.'
      ]
    ]
  },
  es: {
    slug: 'es/para-bartenders',
    menu: 'Bartenders',
    short: 'Para bartenders y equipos de barra: tus specs, siropes y batches en un solo lugar.',
    title: 'App de recetas de cócteles y specs para bartenders | Savour',
    desc: 'Savour para la barra: todas tus specs de cócteles, siropes y cordiales en un solo lugar, batches en cl, oz y dashes sin errores, todo tu equipo con las mismas specs y alérgenos por bebida.',
    h1: 'Para bartenders',
    lead: 'Una spec tiene que ser exacta, cada noche y con cada bartender. Savour guarda tus cócteles, siropes y cordiales tal como los escribiste, y los calcula para el batch.',
    sections: [
      [
        'Tus specs en un solo lugar',
        'Cócteles, siropes, cordiales, shrubs e infusiones: todo en un recetario, ordenado como trabaja tu barra. Una carpeta para la carta fija, otra para la temporada y otra para tus preparaciones base. Cócteles conocidos como el Negroni, el Mojito o el Whiskey Sour van solos a Bebidas en una cuenta nueva.'
      ],
      [
        'Batch sin errores',
        'De una copa a un batch de 40: Savour convierte cl, ml, oz, dashes y barspoons. 2 dashes de Angostura pasan a 20 dashes, y las onzas en una bebida siguen siendo onzas en lugar de libras. «Top up con soda» se queda como está: eso se sirve por copa.'
      ],
      [
        'Pasa tu carta',
        '¿Tus specs están en Word, un PDF o una nota? El lector de Savour las lee gratis, con cl, oz y dashes, también varios cócteles en un archivo. Una foto de tu libro de specs la lee la IA, con Savour Pro. Savour no inventa nada: ves las dudas antes de guardar.'
      ],
      [
        'La misma receta para toda la barra',
        'Crea un equipo para tu barra (en Savour se llama equipo de cocina) e invita a tus compañeros. Todos trabajan con las mismas specs; lo que cambias, todo el equipo lo ve al instante. Ver y convertir funciona con una cuenta gratuita.'
      ],
      [
        'Alérgenos por bebida',
        'Clara de huevo en un sour, nata en un licor, almendra en el orgeat, sulfitos en el vermut y el prosecco: Savour busca los alérgenos de cada ingrediente y los suma por bebida, también a través de tus propios siropes. Los productos que cambian según la marca aparecen marcados. Los alérgenos forman parte de Savour Pro.'
      ],
      [
        'Mise en place para la barra',
        'Exprimir cítricos, hacer siropes, cortar garnituras, preparar el hielo: ponlo en una lista MEP y marca lo que está listo, junto con tu equipo. También en el móvil detrás de la barra, con letra grande en el modo cocina.'
      ]
    ]
  },
  fr: {
    slug: 'fr/pour-bartenders',
    menu: 'Bartenders',
    short: 'Pour les bartenders et les équipes de bar : tes specs, sirops et batches au même endroit.',
    title: 'Appli de recettes de cocktails et de specs pour bartenders | Savour',
    desc: 'Savour pour le bar : toutes tes specs de cocktails, sirops et cordials au même endroit, des batches en cl, oz et dashes sans erreur, toute ton équipe avec les mêmes specs et les allergènes par boisson.',
    h1: 'Pour les bartenders',
    lead: 'Une spec doit être juste, chaque soir et avec chaque bartender. Savour garde tes cocktails, sirops et cordials exactement comme tu les as écrits, et les calcule pour le batch.',
    sections: [
      [
        'Tes specs au même endroit',
        'Cocktails, sirops, cordials, shrubs et infusions : tout dans un livre de recettes, rangé comme ton bar travaille. Un dossier pour la carte, un pour la saison et un pour tes préparations de base. Les cocktails connus comme le Negroni, le Mojito ou le Whiskey Sour se rangent seuls sous Boissons dans un nouveau compte.'
      ],
      [
        'Batcher sans erreur',
        'D’un verre à un batch de 40 : Savour convertit cl, ml, oz, dashes et barspoons. 2 dashes d’Angostura deviennent 20 dashes, et les onces dans une boisson restent des onces au lieu de devenir des livres. « Top up au soda » reste tel quel : cela se verse au verre.'
      ],
      [
        'Reprendre ta carte',
        'Tes specs sont dans Word, un PDF ou une note ? Le lecteur Savour les lit gratuitement, avec cl, oz et dashes, même plusieurs cocktails dans un fichier. Une photo de ton carnet de specs est lue par l’IA, avec Savour Pro. Savour n’invente rien : tu vois les doutes avant tout enregistrement.'
      ],
      [
        'La même recette pour tout le bar',
        'Crée une équipe pour ton bar (dans Savour, cela s’appelle une équipe de cuisine) et invite tes collègues. Tout le monde travaille avec les mêmes specs ; ce que tu modifies, toute l’équipe le voit aussitôt. Consulter et convertir fonctionne avec un compte gratuit.'
      ],
      [
        'Allergènes par boisson',
        'Blanc d’œuf dans un sour, crème dans une liqueur, amande dans l’orgeat, sulfites dans le vermouth et le prosecco : Savour cherche les allergènes de chaque ingrédient et les additionne par boisson, y compris via tes propres sirops. Les produits qui varient selon la marque sont signalés. Les allergènes font partie de Savour Pro.'
      ],
      [
        'Mise en place pour le bar',
        'Presser les agrumes, faire les sirops, couper les garnitures, préparer la glace : mets-le dans une liste MEP et coche ce qui est prêt, avec ton équipe. Aussi sur le téléphone derrière le bar, en grands caractères en mode cuisine.'
      ]
    ]
  }
};

export const BAR_RICH = {
  nl: {
    benefits: [
      ['Batchen', 'Van één glas naar 40, in cl, oz en dashes.'],
      ['Eén bron', 'Specs, siropen en cordials voor de hele bar.'],
      ['Niets verzonnen', 'Je specs blijven precies zoals je ze schreef.']
    ],
    faq: [
      ['Werkt Savour met ounces?', 'Ja. Savour rekent oz, cl, ml, dashes en barspoons om. Ounces bij een drank blijven ounces.'],
      ['Is Savour niet alleen voor koks?', 'Savour is gemaakt in de keuken, maar een spec is ook een recept. In de app heet een team wel een keukenteam; voor je bar werkt het precies hetzelfde.'],
      ['Wat kost het?', 'Gratis tot 100 recepten. Savour Pro kost €2,99 per maand of €29 per jaar, met onbeperkt recepten, teams, AI-import en allergenen. Nieuwe accounts krijgen 7 dagen Pro gratis.']
    ]
  },
  en: {
    benefits: [
      ['Batching', 'From one glass to 40, in cl, oz and dashes.'],
      ['One source', 'Specs, syrups and cordials for the whole bar.'],
      ['Nothing invented', 'Your specs stay exactly as you wrote them.']
    ],
    faq: [
      ['Does Savour work with ounces?', 'Yes. Savour converts oz, cl, ml, dashes and barspoons. Ounces in a drink stay ounces.'],
      ['Isn’t Savour just for cooks?', 'Savour was made in the kitchen, but a spec is a recipe too. In the app a team is called a kitchen team; for your bar it works exactly the same.'],
      ['What does it cost?', 'Free up to 100 recipes. Savour Pro costs €2.99 per month or €29 per year, with unlimited recipes, teams, AI import and allergens. New accounts get 7 days of Pro for free.']
    ]
  },
  de: {
    benefits: [
      ['Batchen', 'Von einem Glas auf 40, in cl, oz und Dashes.'],
      ['Eine Quelle', 'Specs, Sirupe und Cordials für die ganze Bar.'],
      ['Nichts erfunden', 'Deine Specs bleiben genau, wie du sie geschrieben hast.']
    ],
    faq: [
      ['Funktioniert Savour mit Unzen?', 'Ja. Savour rechnet oz, cl, ml, Dashes und Barspoons um. Unzen bei einem Drink bleiben Unzen.'],
      ['Ist Savour nicht nur für Köche?', 'Savour ist in der Küche entstanden, aber eine Spec ist auch ein Rezept. In der App heißt ein Team Küchenteam; für deine Bar funktioniert es genauso.'],
      ['Was kostet es?', 'Kostenlos bis 100 Rezepte. Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr, mit unbegrenzt Rezepten, Teams, KI-Import und Allergenen. Neue Konten bekommen 7 Tage Pro gratis.']
    ]
  },
  es: {
    benefits: [
      ['Batches', 'De una copa a 40, en cl, oz y dashes.'],
      ['Una sola fuente', 'Specs, siropes y cordiales para toda la barra.'],
      ['Nada inventado', 'Tus specs quedan tal como las escribiste.']
    ],
    faq: [
      ['¿Savour funciona con onzas?', 'Sí. Savour convierte oz, cl, ml, dashes y barspoons. Las onzas en una bebida siguen siendo onzas.'],
      ['¿Savour no es solo para cocineros?', 'Savour nació en la cocina, pero una spec también es una receta. En la app un equipo se llama equipo de cocina; para tu barra funciona igual.'],
      ['¿Cuánto cuesta?', 'Gratis hasta 100 recetas. Savour Pro cuesta 2,99 € al mes o 29 € al año, con recetas ilimitadas, equipos, importación con IA y alérgenos. Las cuentas nuevas tienen 7 días de Pro gratis.']
    ]
  },
  fr: {
    benefits: [
      ['Batches', 'D’un verre à 40, en cl, oz et dashes.'],
      ['Une seule source', 'Specs, sirops et cordials pour tout le bar.'],
      ['Rien d’inventé', 'Tes specs restent exactement comme tu les as écrites.']
    ],
    faq: [
      ['Savour fonctionne-t-il en onces ?', 'Oui. Savour convertit oz, cl, ml, dashes et barspoons. Les onces dans une boisson restent des onces.'],
      ['Savour n’est-il pas réservé aux cuisiniers ?', 'Savour est né en cuisine, mais une spec est aussi une recette. Dans l’appli, une équipe s’appelle une équipe de cuisine ; pour ton bar, cela marche pareil.'],
      ['Combien ça coûte ?', 'Gratuit jusqu’à 100 recettes. Savour Pro coûte 2,99 € par mois ou 29 € par an, avec recettes illimitées, équipes, import IA et allergènes. Les nouveaux comptes ont 7 jours de Pro offerts.']
    ]
  }
};
