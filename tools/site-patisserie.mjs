// Voor-wiepagina "Patissiers en banketbakkers" (2026-11-20), in vijf talen. tools/build-seo.mjs zet hem na Koks.
// Alles klopt met de app: omrekenen op stuks, op opbrengst en op "Ik heb … van een ingrediënt" (js/features/scale.js),
// basisrecepten koppelen zodat allergenen meetellen en "kan per merk verschillen" bij chocolade
// (js/features/products.js), printen per recept of map met logo (js/features/print.js, Pro), MEP-lijsten
// (js/features/mep.js) en importeren. Geen bakkerspercentages en geen kostprijs: die bestaan (nog) niet.
// Schermen: financiers uit de demo (patisserie-batch, patisserie-recept). Foto's: assets/keuken/patisserie-*.jpg.

const shot = (name, alt, title, text) => ({ shot: `/assets/app/${name}-{lang}.jpg`, alt, title, text });

export const PATISSERIE_AUDIENCE = {
  nl: {
    slug: 'voor-patissiers-en-banketbakkers',
    menu: 'Patissiers en banketbakkers',
    short: 'Je recepten tot op de gram, omrekenen op stuks en de allergenen erbij.',
    title: 'Receptenapp voor patissiers en banketbakkers | Savour',
    desc: 'Savour voor patissiers en banketbakkers: recepten tot op de gram zoals je ze schreef, omrekenen op stuks of op wat je nog hebt, basisrecepten met de allergenen erbij, en printen voor de bakkerij.',
    h1: 'Voor patissiers en banketbakkers',
    lead: 'In de patisserie is een recept een formule. Savour bewaart elke formule precies zoals je hem schreef, en rekent hem om voor de serie die je vandaag maakt.',
    sections: [
      [
        'Tot op de gram, zoals je het schreef',
        'Savour verandert nooit iets aan je hoeveelheden en verzint niets. Leest Savour een oud schrift of een Word-bestand in en twijfelt het ergens, dan zie je dat voordat er iets wordt opgeslagen. Wat je opslaat, is wat je bedoelde.'
      ],
      [
        'Omrekenen op stuks en op wat je hebt',
        'Van 24 financiers naar 480, of van 2 broden naar 30: vul de opbrengst in en alle hoeveelheden rekenen mee. Ligt er nog 3 kg chocolade? Kies ⋯ Meer omrekenen, vul bij "Ik heb" 3 kg chocolade in en Savour rekent het hele recept terug op die hoeveelheid. Het originele recept blijft altijd staan.'
      ],
      [
        'Onderdelen en basisrecepten',
        'Deel een recept op in onderdelen, zoals deeg, vulling en glaçage; zo blijft het leesbaar op de werkbank. Een crème pâtissière, een zanddeeg of een glaçage die je vaker gebruikt, koppel je als basisrecept. Dan tellen de allergenen ervan mee in elk gebak dat ermee gemaakt wordt.'
      ],
      [
        'Allergenen bij elk gebak',
        'Ei, melk, gluten en noten zitten in bijna elke patisserie. Savour zoekt bij elk ingrediënt de allergenen op en telt ze op, ook via je basisrecepten. Bij chocolade, couverture en dergelijke staat "kan per merk verschillen": controleer het etiket van jouw merk. Allergenen horen bij Savour Pro.'
      ],
      [
        'Printen voor de bakkerij',
        'Print een los recept of een hele map in één keer, omgerekend als je wilt, met of zonder allergenen. Met Savour Pro staat het logo van je zaak erop. Zo hangt in de bakkerij altijd de laatste versie.'
      ],
      [
        'Je patisseriepost op orde',
        'Zet in een MEP-lijst wat er vandaag klaar moet staan: deeg, crèmes, garnituren, glaçages. Je team vinkt live af, ook op de telefoon, en je print de lijst op één A4.'
      ]
    ]
  },
  en: {
    slug: 'en/for-pastry-chefs-and-bakers',
    menu: 'Pastry chefs and bakers',
    short: 'Your recipes to the gram, scaling by pieces and the allergens included.',
    title: 'Recipe app for pastry chefs and bakers | Savour',
    desc: 'Savour for pastry chefs and bakers: recipes to the gram exactly as you wrote them, scaling by pieces or by what you have left, base recipes with their allergens, and printing for the bakery.',
    h1: 'For pastry chefs and bakers',
    lead: 'In pastry a recipe is a formula. Savour keeps every formula exactly as you wrote it, and scales it for the batch you are making today.',
    sections: [
      [
        'To the gram, as you wrote it',
        'Savour never changes your quantities and invents nothing. When Savour reads an old notebook or a Word file and is unsure about something, you see it before anything is saved. What you save is what you meant.'
      ],
      [
        'Scale by pieces and by what you have',
        'From 24 financiers to 480, or from 2 loaves to 30: enter the yield and every quantity follows. Still 3 kg of chocolate on the shelf? Choose ⋯ More scaling options, enter 3 kg of chocolate under "I have" and Savour scales the whole recipe to that amount. The original recipe always stays as it is.'
      ],
      [
        'Parts and base recipes',
        'Split a recipe into parts, such as dough, filling and glaze, so it stays readable on the bench. A crème pâtissière, a sweet pastry or a glaze you use often, you link as a base recipe. Its allergens then count in every pastry made with it.'
      ],
      [
        'Allergens on every pastry',
        'Egg, milk, gluten and nuts are in almost every pastry. Savour looks up the allergens of every ingredient and adds them up, also through your base recipes. Chocolate, couverture and the like are marked "may differ by brand": check the label of your brand. Allergens are part of Savour Pro.'
      ],
      [
        'Printing for the bakery',
        'Print a single recipe or a whole folder at once, scaled if you like, with or without allergens. With Savour Pro your business logo is on it. So the bakery always has the latest version on the wall.'
      ],
      [
        'Your pastry station in order',
        'Put what has to be ready today in a prep list: doughs, creams, garnishes, glazes. Your team ticks off live, on the phone too, and you print the list on one A4.'
      ]
    ]
  },
  de: {
    slug: 'de/fuer-patissiers-und-konditoren',
    menu: 'Patissiers und Konditoren',
    short: 'Deine Rezepte aufs Gramm, Umrechnen nach Stück und die Allergene dabei.',
    title: 'Rezept-App für Patissiers und Konditoren | Savour',
    desc: 'Savour für Patissiers und Konditoren: Rezepte aufs Gramm, genau wie du sie geschrieben hast, Umrechnen nach Stück oder nach dem, was noch da ist, Grundrezepte mit ihren Allergenen und Drucken für die Backstube.',
    h1: 'Für Patissiers und Konditoren',
    lead: 'In der Patisserie ist ein Rezept eine Formel. Savour bewahrt jede Formel genau so, wie du sie geschrieben hast, und rechnet sie für die Menge um, die du heute machst.',
    sections: [
      [
        'Aufs Gramm, wie du es geschrieben hast',
        'Savour ändert nie etwas an deinen Mengen und erfindet nichts. Liest Savour ein altes Heft oder eine Word-Datei ein und ist sich irgendwo unsicher, siehst du das, bevor etwas gespeichert wird. Was du speicherst, ist, was du gemeint hast.'
      ],
      [
        'Umrechnen nach Stück und nach dem, was da ist',
        'Von 24 Financiers auf 480 oder von 2 Broten auf 30: Trag die Menge ein und alle Zutaten rechnen mit. Liegen noch 3 kg Schokolade da? Wähle ⋯ Mehr umrechnen, trag bei „Ich habe“ 3 kg Schokolade ein, und Savour rechnet das ganze Rezept auf diese Menge um. Das Originalrezept bleibt immer, wie es ist.'
      ],
      [
        'Komponenten und Grundrezepte',
        'Teile ein Rezept in Komponenten auf, etwa Teig, Füllung und Glasur; so bleibt es auf der Arbeitsfläche lesbar. Eine Crème pâtissière, einen Mürbeteig oder eine Glasur, die du oft brauchst, verknüpfst du als Grundrezept. Dann zählen ihre Allergene in jedem Gebäck mit, das damit gemacht wird.'
      ],
      [
        'Allergene bei jedem Gebäck',
        'Ei, Milch, Gluten und Nüsse stecken in fast jeder Patisserie. Savour sucht die Allergene jeder Zutat heraus und zählt sie zusammen, auch über deine Grundrezepte. Bei Schokolade, Kuvertüre und Ähnlichem steht „kann je nach Marke abweichen“: prüf das Etikett deiner Marke. Allergene gehören zu Savour Pro.'
      ],
      [
        'Drucken für die Backstube',
        'Druck ein einzelnes Rezept oder einen ganzen Ordner auf einmal, auf Wunsch umgerechnet, mit oder ohne Allergene. Mit Savour Pro steht das Logo deines Betriebs darauf. So hängt in der Backstube immer die neueste Version.'
      ],
      [
        'Dein Patisserie-Posten in Ordnung',
        'Setz auf eine MEP-Liste, was heute bereitstehen muss: Teige, Cremes, Garnituren, Glasuren. Dein Team hakt live ab, auch auf dem Handy, und du druckst die Liste auf eine A4-Seite.'
      ]
    ]
  },
  es: {
    slug: 'es/para-pasteleros-y-reposteros',
    menu: 'Pasteleros y reposteros',
    short: 'Tus recetas al gramo, escalar por unidades y los alérgenos incluidos.',
    title: 'App de recetas para pasteleros y reposteros | Savour',
    desc: 'Savour para pasteleros y reposteros: recetas al gramo tal como las escribiste, escalar por unidades o por lo que te queda, recetas base con sus alérgenos e impresión para el obrador.',
    h1: 'Para pasteleros y reposteros',
    lead: 'En pastelería una receta es una fórmula. Savour guarda cada fórmula tal como la escribiste, y la calcula para la tanda que haces hoy.',
    sections: [
      [
        'Al gramo, como lo escribiste',
        'Savour nunca cambia tus cantidades ni inventa nada. Si Savour lee un cuaderno antiguo o un Word y duda en algo, lo ves antes de guardar. Lo que guardas es lo que querías decir.'
      ],
      [
        'Escalar por unidades y por lo que tienes',
        'De 24 financiers a 480, o de 2 panes a 30: indica el rendimiento y todas las cantidades se recalculan. ¿Quedan 3 kg de chocolate? Elige ⋯ Más opciones de escala, escribe 3 kg de chocolate en «Tengo» y Savour calcula toda la receta a esa cantidad. La receta original siempre se queda como está.'
      ],
      [
        'Elaboraciones y recetas base',
        'Divide una receta en elaboraciones, como masa, relleno y glaseado, para que se lea bien en la mesa. Una crema pastelera, una masa sablée o un glaseado que usas a menudo los vinculas como receta base. Sus alérgenos cuentan entonces en cada pastel que la lleva.'
      ],
      [
        'Alérgenos en cada pastel',
        'Huevo, leche, gluten y frutos de cáscara están en casi toda la pastelería. Savour busca los alérgenos de cada ingrediente y los suma, también a través de tus recetas base. Con el chocolate, la cobertura y similares aparece «puede variar según la marca»: revisa la etiqueta de tu marca. Los alérgenos forman parte de Savour Pro.'
      ],
      [
        'Imprimir para el obrador',
        'Imprime una receta o una carpeta entera de una vez, escalada si quieres, con o sin alérgenos. Con Savour Pro lleva el logo de tu negocio. Así en el obrador siempre está colgada la última versión.'
      ],
      [
        'Tu partida de pastelería en orden',
        'Pon en una lista MEP lo que debe estar listo hoy: masas, cremas, decoraciones, glaseados. Tu equipo marca en directo, también en el móvil, y tú imprimes la lista en un A4.'
      ]
    ]
  },
  fr: {
    slug: 'fr/pour-patissiers-et-boulangers',
    menu: 'Pâtissiers et boulangers',
    short: 'Tes recettes au gramme près, la conversion à la pièce et les allergènes inclus.',
    title: 'Appli de recettes pour pâtissiers et boulangers | Savour',
    desc: 'Savour pour pâtissiers et boulangers : des recettes au gramme près telles que tu les as écrites, la conversion à la pièce ou selon ce qui reste, des recettes de base avec leurs allergènes et l’impression pour le fournil.',
    h1: 'Pour les pâtissiers et boulangers',
    lead: 'En pâtisserie, une recette est une formule. Savour garde chaque formule exactement comme tu l’as écrite, et la convertit pour la fournée du jour.',
    sections: [
      [
        'Au gramme près, comme tu l’as écrit',
        'Savour ne change jamais tes quantités et n’invente rien. Quand Savour lit un vieux cahier ou un fichier Word et doute de quelque chose, tu le vois avant tout enregistrement. Ce que tu enregistres, c’est ce que tu voulais dire.'
      ],
      [
        'Convertir à la pièce et selon ce que tu as',
        'De 24 financiers à 480, ou de 2 pains à 30 : indique le rendement et toutes les quantités suivent. Il reste 3 kg de chocolat ? Choisis ⋯ Plus d’options de conversion, indique 3 kg de chocolat à « J’ai » et Savour recalcule toute la recette sur cette quantité. La recette d’origine reste toujours telle quelle.'
      ],
      [
        'Préparations et recettes de base',
        'Divise une recette en préparations, comme pâte, garniture et glaçage, pour qu’elle reste lisible sur le plan de travail. Une crème pâtissière, une pâte sucrée ou un glaçage que tu utilises souvent, tu les relies comme recette de base. Leurs allergènes comptent alors dans chaque pâtisserie qui les utilise.'
      ],
      [
        'Les allergènes de chaque pâtisserie',
        'Œuf, lait, gluten et fruits à coque se trouvent dans presque toute la pâtisserie. Savour cherche les allergènes de chaque ingrédient et les additionne, y compris via tes recettes de base. Le chocolat, la couverture et autres sont marqués « peut varier selon la marque » : vérifie l’étiquette de ta marque. Les allergènes font partie de Savour Pro.'
      ],
      [
        'Imprimer pour le fournil',
        'Imprime une recette ou tout un dossier en une fois, converti si tu veux, avec ou sans allergènes. Avec Savour Pro, le logo de ta maison y figure. Ainsi, la dernière version est toujours affichée au fournil.'
      ],
      [
        'Ton poste pâtisserie en ordre',
        'Mets dans une liste MEP ce qui doit être prêt aujourd’hui : pâtes, crèmes, décors, glaçages. Ton équipe coche en direct, aussi sur le téléphone, et tu imprimes la liste sur un A4.'
      ]
    ]
  }
};

export const PATISSERIE_RICH = {
  nl: {
    benefits: [
      ['Tot op de gram', 'Je formule blijft precies zoals je hem schreef.'],
      ['Op stuks', 'Van 24 financiers naar 480, zonder rekenmachine.'],
      ['Allergenen erbij', 'Ook via je crème pâtissière en je deeg.']
    ],
    showcase: [
      shot('patisserie-batch', 'Financiers in Savour op de telefoon, omgerekend naar 480 stuks', 'Van 24 naar 480 stuks', 'Vul de opbrengst in en alles rekent mee: 3 kg roomboter, 3,6 kg eiwit. Het originele recept blijft staan. [Probeer het in de demo](@demo).'),
      shot('patisserie-recept', 'Financiers in Savour op de laptop, met de allergenen gluten, ei, melk en noten', 'De allergenen bij elk gebak', 'Gluten uit de bloem, ei uit het eiwit, melk uit de boter en noten uit het amandelmeel: Savour vindt ze zelf.')
    ],
    faq: [
      ['Kan ik rekenen met bakkerspercentages?', 'Nee, dat kan Savour niet. Je rekent om op opbrengst, op stuks, met een factor of op een ingrediënt dat je hebt.'],
      ['Kan ik mijn oude schriften overzetten?', 'Ja. Word, PDF en tekst leest de Savour-lezer gratis; foto’s van handgeschreven recepten leest de AI met Savour Pro. Je kijkt alles na voordat het wordt opgeslagen.'],
      ['Wat kost het?', 'Gratis tot 100 recepten. Savour Pro kost €2,99 per maand of €29 per jaar, met onbeperkt recepten, allergenen, AI-import en printen met je logo. Nieuwe accounts krijgen 7 dagen Pro gratis.']
    ]
  },
  en: {
    benefits: [
      ['To the gram', 'Your formula stays exactly as you wrote it.'],
      ['By pieces', 'From 24 financiers to 480, without a calculator.'],
      ['Allergens included', 'Also through your crème pâtissière and your dough.']
    ],
    showcase: [
      shot('patisserie-batch', 'Financiers in Savour on a phone, scaled to 480 pieces', 'From 24 to 480 pieces', 'Enter the yield and everything follows: 3 kg of butter, 3.6 kg of egg white. The original recipe stays as it is. [Try it in the demo](@demo).'),
      shot('patisserie-recept', 'Financiers in Savour on a laptop, with the allergens gluten, egg, milk and nuts', 'Allergens on every pastry', 'Gluten from the flour, egg from the egg white, milk from the butter and nuts from the almond flour: Savour finds them itself.')
    ],
    faq: [
      ['Can I work with baker’s percentages?', 'No, Savour cannot do that. You scale by yield, by pieces, by a factor or by an ingredient you have.'],
      ['Can I bring over my old notebooks?', 'Yes. The Savour reader reads Word, PDF and text for free; photos of handwritten recipes are read by the AI with Savour Pro. You check everything before it is saved.'],
      ['What does it cost?', 'Free up to 100 recipes. Savour Pro costs €2.99 per month or €29 per year, with unlimited recipes, allergens, AI import and printing with your logo. New accounts get 7 days of Pro for free.']
    ]
  },
  de: {
    benefits: [
      ['Aufs Gramm', 'Deine Formel bleibt genau, wie du sie geschrieben hast.'],
      ['Nach Stück', 'Von 24 Financiers auf 480, ohne Taschenrechner.'],
      ['Mit Allergenen', 'Auch über deine Crème pâtissière und deinen Teig.']
    ],
    showcase: [
      shot('patisserie-batch', 'Financiers in Savour auf dem Handy, umgerechnet auf 480 Stück', 'Von 24 auf 480 Stück', 'Trag die Menge ein und alles rechnet mit: 3 kg Butter, 3,6 kg Eiweiß. Das Originalrezept bleibt, wie es ist. [Probier es in der Demo](@demo).'),
      shot('patisserie-recept', 'Financiers in Savour auf dem Laptop, mit den Allergenen Gluten, Ei, Milch und Nüsse', 'Die Allergene bei jedem Gebäck', 'Gluten aus dem Mehl, Ei aus dem Eiweiß, Milch aus der Butter und Nüsse aus dem Mandelmehl: Savour findet sie selbst.')
    ],
    faq: [
      ['Kann ich mit Bäckerprozenten rechnen?', 'Nein, das kann Savour nicht. Du rechnest nach Menge, nach Stück, mit einem Faktor oder nach einer Zutat um, die du hast.'],
      ['Kann ich meine alten Hefte übernehmen?', 'Ja. Word, PDF und Text liest der Savour-Leser kostenlos; Fotos handschriftlicher Rezepte liest die KI mit Savour Pro. Du prüfst alles, bevor es gespeichert wird.'],
      ['Was kostet es?', 'Kostenlos bis 100 Rezepte. Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr, mit unbegrenzt Rezepten, Allergenen, KI-Import und Drucken mit deinem Logo. Neue Konten bekommen 7 Tage Pro gratis.']
    ]
  },
  es: {
    benefits: [
      ['Al gramo', 'Tu fórmula queda tal como la escribiste.'],
      ['Por unidades', 'De 24 financiers a 480, sin calculadora.'],
      ['Con alérgenos', 'También a través de tu crema pastelera y tu masa.']
    ],
    showcase: [
      shot('patisserie-batch', 'Financiers en Savour en el móvil, escalados a 480 unidades', 'De 24 a 480 unidades', 'Indica el rendimiento y todo se recalcula: 3 kg de mantequilla, 3,6 kg de clara. La receta original se queda como está. [Pruébalo en la demo](@demo).'),
      shot('patisserie-recept', 'Financiers en Savour en el portátil, con los alérgenos gluten, huevo, leche y frutos de cáscara', 'Los alérgenos de cada pastel', 'Gluten de la harina, huevo de la clara, leche de la mantequilla y frutos de cáscara de la harina de almendra: Savour los encuentra solo.')
    ],
    faq: [
      ['¿Puedo trabajar con porcentajes de panadero?', 'No, Savour no puede hacerlo. Escalas por rendimiento, por unidades, con un factor o según un ingrediente que tienes.'],
      ['¿Puedo pasar mis cuadernos antiguos?', 'Sí. El lector de Savour lee Word, PDF y texto gratis; las fotos de recetas a mano las lee la IA con Savour Pro. Revisas todo antes de guardarlo.'],
      ['¿Cuánto cuesta?', 'Gratis hasta 100 recetas. Savour Pro cuesta 2,99 € al mes o 29 € al año, con recetas ilimitadas, alérgenos, importación con IA e impresión con tu logo. Las cuentas nuevas tienen 7 días de Pro gratis.']
    ]
  },
  fr: {
    benefits: [
      ['Au gramme près', 'Ta formule reste exactement comme tu l’as écrite.'],
      ['À la pièce', 'De 24 financiers à 480, sans calculatrice.'],
      ['Allergènes inclus', 'Y compris via ta crème pâtissière et ta pâte.']
    ],
    showcase: [
      shot('patisserie-batch', 'Des financiers dans Savour sur un téléphone, convertis à 480 pièces', 'De 24 à 480 pièces', 'Indique le rendement et tout suit : 3 kg de beurre, 3,6 kg de blanc d’œuf. La recette d’origine reste telle quelle. [Essaie-le dans la démo](@demo).'),
      shot('patisserie-recept', 'Des financiers dans Savour sur un ordinateur, avec les allergènes gluten, œuf, lait et fruits à coque', 'Les allergènes de chaque pâtisserie', 'Le gluten de la farine, l’œuf du blanc, le lait du beurre et les fruits à coque de la poudre d’amande : Savour les trouve tout seul.')
    ],
    faq: [
      ['Puis-je travailler en pourcentages du boulanger ?', 'Non, Savour ne le permet pas. Tu convertis selon le rendement, à la pièce, avec un facteur ou selon un ingrédient que tu as.'],
      ['Puis-je reprendre mes vieux cahiers ?', 'Oui. Le lecteur Savour lit Word, PDF et texte gratuitement ; les photos de recettes manuscrites sont lues par l’IA avec Savour Pro. Tu vérifies tout avant l’enregistrement.'],
      ['Combien ça coûte ?', 'Gratuit jusqu’à 100 recettes. Savour Pro coûte 2,99 € par mois ou 29 € par an, avec recettes illimitées, allergènes, import IA et impression avec ton logo. Les nouveaux comptes ont 7 jours de Pro offerts.']
    ]
  }
};
