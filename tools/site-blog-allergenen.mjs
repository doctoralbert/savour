// Blog over de allergenenfunctie (live sinds 2026-11-08) en de openbare ingrediëntenlijst die Savour leest
// (/ingredientenlijst-allergenen, gegevens uit tools/build-ingredientenlijst.mjs). Alles wat hier staat, klopt met
// js/features/products.js, product-review.js en product-autolink.js: pas de tekst aan als de functie verandert.
// Aantallen in de Savour-lijst: tabel ingredient_list in Supabase (goedgekeurd per taal, 2026-11-08).

export const LIST_SLUGS = {
  nl: 'ingredientenlijst-allergenen',
  en: 'en/ingredient-list-allergens',
  de: 'de/zutatenliste-allergene',
  es: 'es/lista-ingredientes-alergenos',
  fr: 'fr/liste-ingredients-allergenes'
};

export const ALLERGEN_POST = {
  id: 'allergenen',
  date: '2026-11-08',
  // Uitgebreide opmaak (tools/build-seo.mjs): in het kort, kaders, kernzin, scherm uit de app, leestijd en verder lezen.
  rich: true,
  nl: {
    slug: 'blog/allergenen-in-savour',
    title: 'Allergenen in Savour: zo werkt het',
    desc: 'Allergenen per recept, ook via basisrecepten. Savour herkent de ingrediënten in je recepten zelf; jij bevestigt alleen wat Savour niet zeker weet. Zo werkt het, en waarom Savour nooit zegt dat iets allergeenvrij is.',
    h1: 'Allergenen in Savour: zo werkt het',
    lead: 'Een gast vraagt aan tafel of er noten in de saus zitten. In Savour staat het antwoord nu bij het recept, ook als de noten in een basisrecept zitten. Zo werkt het, en zo werkt het bewust niet.',
    sections: [
      [
        'Savour leest je ingrediënten zelf',
        'Bij elke receptregel zoekt Savour het ingrediënt: in "250 g koude roomboter, in blokjes" is dat roomboter, met melk als allergeen. Daarvoor gebruikt Savour één gedeelde lijst met ingrediënten en hun allergenen: de Savour-lijst. Die bestaat in vijf talen. In het Nederlands staan er ruim 3.100 ingrediënten in, in het Engels, Duits, Spaans en Frans elk tussen de 2.600 en 2.900.\n\nJe hoeft dus niet zelf honderden ingrediënten in te voeren. Wat in de Savour-lijst staat, telt meteen mee. Gebruik je een basisrecept, zoals een fond, een deeg of een saus, dan tellen de allergenen van dat basisrecept mee. Zit de mosterd in je vinaigrette, dan zie je mosterd ook bij de salade die de vinaigrette gebruikt.'
      ],
      [
        'Jij beantwoordt alleen de vragen',
        'Wat Savour niet zeker weet, staat onder Allergenen → Nakijken. Daar krijg je één vraag tegelijk:',
        [
          'Klopt dit voorstel? Bijvoorbeeld: crème fraîche, met melk.',
          'Klopt dit voor jouw merk? Bij ingrediënten die per merk verschillen.',
          'Is dit je eigen recept? "Groente fond" in een regel wordt dan je recept Groentefond.',
          'Is dit wel een ingrediënt? Woorden als "massa", "vulling" of "voor in het bakblik" haal je weg; Savour onthoudt dat voor nieuwe recepten.',
          'Wat is dit? Bij een naam die Savour niet kent, zoals "sap": welk sap, dat weet alleen jij.'
        ]
      ],
      [
        'Per merk verschillend',
        'Sommige ingrediënten bevatten bij het ene merk iets anders dan bij het andere. Denk aan gelatine (varken, rund of vis), sojasaus (met of zonder gluten), chocolade (melk, soja, noten), bouillon en fond (selderij, gluten), worst en vleeswaren, pesto (noten), mayonaise (ei, mosterd) en paneermeel. Bij die ingrediënten vraagt Savour het één keer per keuken. Is het bij jouw merk anders, dan maak je je eigen versie; die gaat voor de Savour-lijst.'
      ],
      [
        'De 14 allergenen, en wat je zelf aanzet',
        'Standaard toont Savour de 14 allergenen uit de Europese regels: gluten, schaaldieren, eieren, vis, pinda’s, soja, melk, noten, selderij, mosterd, sesamzaad, sulfiet, lupine en weekdieren. Onder Allergenen → Allergenen zet je zelf aan waar gasten verder naar vragen, zoals lactose, varkensvlees, alcohol, knoflook of uiachtigen. Die staan standaard uit. Wat je weer uitzet, blijft bewaard; je ziet het alleen niet meer.\n\nLactose staat bewust los van melk: lactosevrije room bevat nog steeds melkeiwit.'
      ],
      [
        'Waarom Savour nooit zegt dat iets allergeenvrij is',
        'Een allergeen te veel is vervelend, een allergeen te weinig is gevaarlijk. Daarom is Savour streng. Zolang een recept een ingrediënt heeft dat nog niet is nagekeken, staat erbij dat het recept nog niet compleet is, met een vraagteken op de plek waar Savour het nog niet weet. Pas als alles is nagekeken en er geen van de 14 allergenen in zit, staat er dat het recept geen van de 14 allergenen bevat. Bij de kenmerken die je zelf aanzet, meldt Savour alleen wat erin zit, nooit dat het er niet in zit.\n\nEen voorstel blijft een voorstel. Het etiket van je leverancier gaat altijd voor.'
      ],
      [
        'Bij het recept, op de kaart en op papier',
        'Bij elk recept staat een blok Allergenen dat je openklapt. Daaronder vind je de allergenenkaart: per ingrediëntregel welke allergenen erin zitten, zodat je in één oogopslag ziet waar de selderij vandaan komt. Print je een recept, dan kies je zelf of de allergenen erop komen. Is het recept nog niet compleet nagekeken, dan staat dat er ook op.'
      ],
      [
        'In het keukenteam',
        'Een keukenteam heeft één eigen ingrediëntenlijst voor het hele team. De eigenaar en wie mag bewerken, beantwoorden de vragen en passen ingrediënten aan. Een kok ziet de allergenen bij elk recept en kan per regel zien waar ze vandaan komen.'
      ],
      [
        'Waar de Savour-lijst vandaan komt',
        'De Savour-lijst is samengesteld uit de ingrediëntenlijst van Open Food Facts, de lijsten met groenten, kruiden, paddenstoelen, sauzen en kazen op Wikipedia, de Nederlandse productnamen uit NEVO (het voedingsstoffenbestand van het RIVM) en Savours eigen woordenlijst met keukentermen zoals spitskool, sukade en couverture. NEVO zelf bevat geen allergenen; die zijn een aanvulling van Savour.\n\nKomt een ingrediënt in recepten voor dat nog niet in de lijst staat, dan bekijken wij het eerst voordat het erbij komt. Daarbij zien we alleen de naam van het ingrediënt, nooit je recepten. De hele lijst staat openbaar: [bekijk de ingrediëntenlijst van Savour](/ingredientenlijst-allergenen). Zie je een fout, laat het ons weten.'
      ],
      [
        'Wat kost het?',
        'Allergenen horen bij [Savour Pro](/savour-pro), en werken ook in een keukenteam van een eigenaar met Pro. Nieuwe accounts krijgen 7 dagen Pro gratis. Wil je eerst kijken? [Open de demo](/?demo=1): daar zie je de allergenen bij de voorbeeldrecepten. Meer over de functie staat op [Allergenen per recept](/allergenen-per-recept).'
      ]
    ],
    outro: 'Deze uitleg beschrijft de functie zoals hij nu live staat. Verandert er iets, dan passen we het hier aan.'
  },
  en: {
    slug: 'en/blog/allergens-in-savour',
    title: 'Allergens in Savour: how it works',
    desc: 'Allergens per recipe, including through base recipes. Savour recognises the ingredients in your recipes by itself; you only confirm what Savour is not sure about. How it works, and why Savour never says something is allergen-free.',
    h1: 'Allergens in Savour: how it works',
    lead: 'A guest asks at the table whether there are nuts in the sauce. In Savour the answer is now on the recipe, even when the nuts are in a base recipe. This is how it works, and how it deliberately does not.',
    sections: [
      [
        'Savour reads your ingredients',
        'For every recipe line Savour looks up the ingredient: in "250 g cold butter, diced" that is butter, with milk as the allergen. For this Savour uses one shared list of ingredients and their allergens: the Savour list. It exists in five languages. The Dutch list has over 3,100 ingredients; English, German, Spanish and French each have between 2,600 and 2,900.\n\nSo you do not have to enter hundreds of ingredients yourself. Whatever is on the Savour list counts straight away. If you use a base recipe, such as a stock, a dough or a sauce, its allergens count too. If the mustard is in your vinaigrette, you also see mustard on the salad that uses the vinaigrette.'
      ],
      [
        'You only answer the questions',
        'Whatever Savour is not sure about is under Allergens → To check. There you get one question at a time:',
        [
          'Is this suggestion right? For example: crème fraîche, with milk.',
          'Is this right for your brand? For ingredients that differ by brand.',
          'Is this your own recipe? "Veg stock" in a line then becomes your recipe Vegetable stock.',
          'Is this an ingredient at all? Words like "mix", "filling" or "for the tin" you remove; Savour remembers that for new recipes.',
          'What is this? For a name Savour does not know, such as "juice": which juice, only you know.'
        ]
      ],
      [
        'Different by brand',
        'Some ingredients contain something different from one brand to the next. Think of gelatine (pork, beef or fish), soy sauce (with or without gluten), chocolate (milk, soy, nuts), stock and fond (celery, gluten), sausage and cold cuts, pesto (nuts), mayonnaise (egg, mustard) and breadcrumbs. For these ingredients Savour asks once per kitchen. If your brand is different, make your own version; it takes priority over the Savour list.'
      ],
      [
        'The 14 allergens, and what you switch on',
        'By default Savour shows the 14 allergens from the European rules: gluten, crustaceans, eggs, fish, peanuts, soy, milk, nuts, celery, mustard, sesame, sulphites, lupin and molluscs. Under Allergens → Allergens you switch on what else guests ask about, such as lactose, pork, alcohol, garlic or the onion family. Those are off by default. Whatever you switch off again is kept; you just no longer see it.\n\nLactose is deliberately separate from milk: lactose-free cream still contains milk protein.'
      ],
      [
        'Why Savour never says something is allergen-free',
        'One allergen too many is annoying; one too few is dangerous. That is why Savour is strict. As long as a recipe has an ingredient that has not been reviewed, it says the recipe is not complete yet, with a question mark where Savour does not know. Only when everything is reviewed and none of the 14 allergens is in it does Savour say the recipe contains none of the 14 allergens. For the characteristics you switch on yourself, Savour only reports what is in it, never that it is not.\n\nA suggestion stays a suggestion. Your supplier’s label always comes first.'
      ],
      [
        'On the recipe, on the chart and on paper',
        'Every recipe has an Allergens block that you fold open. Below it is the allergen chart: for each ingredient line which allergens it contains, so you see at a glance where the celery comes from. When you print a recipe, you choose whether the allergens go on it. If the recipe is not fully reviewed yet, that is on it too.'
      ],
      [
        'In the kitchen team',
        'A kitchen team has one ingredient list for the whole team. The owner and those who can edit answer the questions and adjust ingredients. A cook sees the allergens on every recipe and can see per line where they come from.'
      ],
      [
        'Where the Savour list comes from',
        'The Savour list is built from the ingredient list of Open Food Facts, the Wikipedia lists of vegetables, herbs, mushrooms, sauces and cheeses, the Dutch product names from NEVO (the Dutch food composition database of RIVM) and Savour’s own list of kitchen terms. NEVO itself contains no allergens; those are added by Savour.\n\nIf an ingredient shows up in recipes that is not on the list yet, we review it before it is added. We only see the name of the ingredient, never your recipes. The whole list is public: [see Savour’s ingredient list](/en/ingredient-list-allergens). If you spot a mistake, let us know.'
      ],
      [
        'What does it cost?',
        'Allergens are part of [Savour Pro](/en/pro), and also work in a kitchen team whose owner has Pro. New accounts get 7 days of Pro for free. Want to look first? [Open the demo](/en?demo=1): the sample recipes show their allergens. More about the feature is on [Allergens per recipe](/en/allergens-per-recipe).'
      ]
    ],
    outro: 'This explains the feature as it is live today. If anything changes, we will update it here.'
  }
};

// Vertalingen van de blog, op de Engelse slug (zoals de andere blogs in tools/site-pages-*.mjs).
export const ALLERGEN_POST_DE = {
  'en/blog/allergens-in-savour': {
    slug: 'de/blog/allergene-in-savour',
    title: 'Allergene in Savour: so funktioniert es',
    desc: 'Allergene pro Rezept, auch über Grundrezepte. Savour erkennt die Zutaten in deinen Rezepten selbst; du bestätigst nur, was Savour nicht sicher weiß. So funktioniert es, und warum Savour nie sagt, dass etwas allergenfrei ist.',
    h1: 'Allergene in Savour: so funktioniert es',
    lead: 'Ein Gast fragt am Tisch, ob Nüsse in der Sauce sind. In Savour steht die Antwort jetzt beim Rezept, auch wenn die Nüsse in einem Grundrezept stecken. So funktioniert es, und so bewusst nicht.',
    sections: [
      [
        'Savour liest deine Zutaten selbst',
        'Bei jeder Rezeptzeile sucht Savour die Zutat: in „250 g kalte Butter, gewürfelt“ ist das Butter, mit Milch als Allergen. Dafür nutzt Savour eine gemeinsame Liste mit Zutaten und ihren Allergenen: die Savour-Liste. Es gibt sie in fünf Sprachen. Die niederländische Liste hat gut 3.100 Zutaten, Englisch, Deutsch, Spanisch und Französisch jeweils zwischen 2.600 und 2.900.\n\nDu musst also nicht Hunderte Zutaten selbst eingeben. Was auf der Savour-Liste steht, zählt sofort mit. Nutzt du ein Grundrezept, etwa einen Fond, einen Teig oder eine Sauce, zählen dessen Allergene mit. Steckt der Senf in deiner Vinaigrette, siehst du Senf auch beim Salat, der die Vinaigrette verwendet.'
      ],
      [
        'Du beantwortest nur die Fragen',
        'Was Savour nicht sicher weiß, steht unter Allergene → Prüfen. Dort bekommst du eine Frage nach der anderen:',
        [
          'Stimmt dieser Vorschlag? Zum Beispiel: Crème fraîche, mit Milch.',
          'Stimmt das für deine Marke? Bei Zutaten, die je Marke verschieden sind.',
          'Ist das dein eigenes Rezept? „Gemüse Fond“ in einer Zeile wird dann dein Rezept Gemüsefond.',
          'Ist das überhaupt eine Zutat? Wörter wie „Masse“, „Füllung“ oder „für die Form“ entfernst du; Savour merkt sich das für neue Rezepte.',
          'Was ist das? Bei einem Namen, den Savour nicht kennt, etwa „Saft“: welcher Saft, weißt nur du.'
        ]
      ],
      [
        'Je Marke verschieden',
        'Manche Zutaten enthalten je nach Marke etwas anderes. Denk an Gelatine (Schwein, Rind oder Fisch), Sojasauce (mit oder ohne Gluten), Schokolade (Milch, Soja, Nüsse), Brühe und Fond (Sellerie, Gluten), Wurst und Aufschnitt, Pesto (Nüsse), Mayonnaise (Ei, Senf) und Paniermehl. Bei diesen Zutaten fragt Savour einmal pro Küche. Ist es bei deiner Marke anders, legst du deine eigene Version an; die geht der Savour-Liste vor.'
      ],
      [
        'Die 14 Allergene, und was du selbst einschaltest',
        'Standardmäßig zeigt Savour die 14 Allergene aus den europäischen Regeln: Gluten, Krebstiere, Eier, Fisch, Erdnüsse, Soja, Milch, Schalenfrüchte, Sellerie, Senf, Sesam, Sulfite, Lupinen und Weichtiere. Unter Allergene → Allergene schaltest du ein, wonach Gäste sonst fragen, etwa Laktose, Schweinefleisch, Alkohol, Knoblauch oder Zwiebelgewächse. Diese sind standardmäßig aus. Was du wieder ausschaltest, bleibt gespeichert; du siehst es nur nicht mehr.\n\nLaktose steht bewusst getrennt von Milch: laktosefreie Sahne enthält trotzdem Milcheiweiß.'
      ],
      [
        'Warum Savour nie sagt, dass etwas allergenfrei ist',
        'Ein Allergen zu viel ist lästig, eins zu wenig ist gefährlich. Deshalb ist Savour streng. Solange ein Rezept eine Zutat hat, die noch nicht geprüft ist, steht dabei, dass das Rezept noch nicht vollständig ist, mit einem Fragezeichen dort, wo Savour es noch nicht weiß. Erst wenn alles geprüft ist und keines der 14 Allergene enthalten ist, steht da, dass das Rezept keines der 14 Allergene enthält. Bei den Merkmalen, die du selbst einschaltest, meldet Savour nur, was enthalten ist, nie, dass etwas fehlt.\n\nEin Vorschlag bleibt ein Vorschlag. Das Etikett deines Lieferanten geht immer vor.'
      ],
      [
        'Beim Rezept, auf der Karte und auf Papier',
        'Bei jedem Rezept gibt es einen Block Allergene zum Aufklappen. Darunter findest du die Allergenkarte: für jede Zutatenzeile, welche Allergene darin sind, sodass du auf einen Blick siehst, woher der Sellerie kommt. Druckst du ein Rezept, wählst du selbst, ob die Allergene darauf kommen. Ist das Rezept noch nicht vollständig geprüft, steht das auch darauf.'
      ],
      [
        'Im Küchenteam',
        'Ein Küchenteam hat eine eigene Zutatenliste für das ganze Team. Der Eigentümer und alle, die bearbeiten dürfen, beantworten die Fragen und passen Zutaten an. Ein Koch sieht die Allergene bei jedem Rezept und kann pro Zeile sehen, woher sie kommen.'
      ],
      [
        'Woher die Savour-Liste kommt',
        'Die Savour-Liste ist zusammengestellt aus der Zutatenliste von Open Food Facts, den Wikipedia-Listen mit Gemüse, Kräutern, Pilzen, Saucen und Käse, den niederländischen Produktnamen aus NEVO (der Nährstoffdatenbank des RIVM) und Savours eigener Liste mit Küchenbegriffen. NEVO selbst enthält keine Allergene; die ergänzt Savour.\n\nTaucht in Rezepten eine Zutat auf, die noch nicht auf der Liste steht, prüfen wir sie, bevor sie dazukommt. Dabei sehen wir nur den Namen der Zutat, nie deine Rezepte. Die ganze Liste ist öffentlich: [Savours Zutatenliste ansehen](/de/zutatenliste-allergene). Siehst du einen Fehler, sag uns Bescheid.'
      ],
      [
        'Was kostet es?',
        'Allergene gehören zu [Savour Pro](/de/preise) und funktionieren auch in einem Küchenteam, dessen Eigentümer Pro hat. Neue Konten bekommen 7 Tage Pro gratis. Erst schauen? [Öffne die Demo](/de?demo=1): Dort siehst du die Allergene bei den Beispielrezepten. Mehr zur Funktion steht auf [Allergene pro Rezept](/de/allergene-pro-rezept).'
      ]
    ],
    outro: 'Dieser Text beschreibt die Funktion, wie sie jetzt live ist. Ändert sich etwas, passen wir ihn hier an.'
  }
};

export const ALLERGEN_POST_ES = {
  'en/blog/allergens-in-savour': {
    slug: 'es/blog/alergenos-en-savour',
    title: 'Alérgenos en Savour: así funciona',
    desc: 'Alérgenos por receta, también a través de recetas base. Savour reconoce solo los ingredientes de tus recetas; tú solo confirmas lo que Savour no sabe con seguridad. Así funciona, y por qué Savour nunca dice que algo está libre de alérgenos.',
    h1: 'Alérgenos en Savour: así funciona',
    lead: 'Un cliente pregunta en la mesa si la salsa lleva frutos secos. En Savour la respuesta está ahora en la receta, aunque los frutos secos estén en una receta base. Así funciona, y así no funciona a propósito.',
    sections: [
      [
        'Savour lee tus ingredientes',
        'En cada línea de la receta, Savour busca el ingrediente: en «250 g de mantequilla fría, en dados» es mantequilla, con leche como alérgeno. Para ello Savour usa una lista compartida de ingredientes y sus alérgenos: la lista de Savour. Existe en cinco idiomas. La lista en neerlandés tiene más de 3.100 ingredientes; inglés, alemán, español y francés tienen cada uno entre 2.600 y 2.900.\n\nAsí no tienes que introducir cientos de ingredientes tú mismo. Lo que está en la lista de Savour cuenta enseguida. Si usas una receta base, como un fondo, una masa o una salsa, sus alérgenos también cuentan. Si la mostaza está en tu vinagreta, también ves mostaza en la ensalada que usa esa vinagreta.'
      ],
      [
        'Tú solo respondes las preguntas',
        'Lo que Savour no sabe con seguridad está en Alérgenos → Revisar. Allí recibes una pregunta cada vez:',
        [
          '¿Es correcta esta sugerencia? Por ejemplo: crème fraîche, con leche.',
          '¿Es correcto para tu marca? En ingredientes que cambian según la marca.',
          '¿Es tu propia receta? «Fondo verduras» en una línea pasa a ser tu receta Fondo de verduras.',
          '¿Es siquiera un ingrediente? Palabras como «masa», «relleno» o «para el molde» las quitas; Savour lo recuerda para recetas nuevas.',
          '¿Qué es esto? Con un nombre que Savour no conoce, como «zumo»: qué zumo, solo tú lo sabes.'
        ]
      ],
      [
        'Distinto según la marca',
        'Algunos ingredientes contienen algo distinto de una marca a otra. Piensa en la gelatina (cerdo, vacuno o pescado), la salsa de soja (con o sin gluten), el chocolate (leche, soja, frutos secos), el caldo y el fondo (apio, gluten), embutidos, pesto (frutos secos), mayonesa (huevo, mostaza) y pan rallado. En estos ingredientes Savour pregunta una vez por cocina. Si tu marca es distinta, creas tu propia versión; esa va antes que la lista de Savour.'
      ],
      [
        'Los 14 alérgenos, y lo que activas tú',
        'Por defecto Savour muestra los 14 alérgenos de las normas europeas: gluten, crustáceos, huevos, pescado, cacahuetes, soja, leche, frutos de cáscara, apio, mostaza, sésamo, sulfitos, altramuces y moluscos. En Alérgenos → Alérgenos activas lo que además preguntan los clientes, como lactosa, cerdo, alcohol, ajo o la familia de la cebolla. Están desactivados por defecto. Lo que vuelves a desactivar se guarda; solo deja de verse.\n\nLa lactosa va aparte de la leche a propósito: la nata sin lactosa sigue teniendo proteína de leche.'
      ],
      [
        'Por qué Savour nunca dice que algo está libre de alérgenos',
        'Un alérgeno de más es molesto; uno de menos es peligroso. Por eso Savour es estricto. Mientras una receta tenga un ingrediente sin revisar, indica que la receta aún no está completa, con un signo de interrogación donde Savour aún no lo sabe. Solo cuando todo está revisado y no hay ninguno de los 14 alérgenos, dice que la receta no contiene ninguno de los 14 alérgenos. En las características que activas tú, Savour solo indica lo que contiene, nunca lo que no.\n\nUna sugerencia sigue siendo una sugerencia. La etiqueta de tu proveedor siempre manda.'
      ],
      [
        'En la receta, en la tabla y en papel',
        'Cada receta tiene un bloque Alérgenos que despliegas. Debajo está la tabla de alérgenos: para cada línea de ingredientes, qué alérgenos contiene, para ver de un vistazo de dónde viene el apio. Al imprimir una receta eliges si los alérgenos aparecen. Si la receta aún no está revisada del todo, eso también aparece.'
      ],
      [
        'En el equipo de cocina',
        'Un equipo de cocina tiene una lista de ingredientes para todo el equipo. El propietario y quienes pueden editar responden las preguntas y ajustan ingredientes. Un cocinero ve los alérgenos en cada receta y puede ver por línea de dónde vienen.'
      ],
      [
        'De dónde viene la lista de Savour',
        'La lista de Savour se ha compuesto con la lista de ingredientes de Open Food Facts, las listas de Wikipedia de verduras, hierbas, setas, salsas y quesos, los nombres de productos neerlandeses de NEVO (la base de datos de composición de alimentos del RIVM) y la lista propia de Savour con términos de cocina. NEVO no contiene alérgenos; los añade Savour.\n\nSi en las recetas aparece un ingrediente que aún no está en la lista, lo revisamos antes de añadirlo. Solo vemos el nombre del ingrediente, nunca tus recetas. Toda la lista es pública: [ver la lista de ingredientes de Savour](/es/lista-ingredientes-alergenos). Si ves un error, avísanos.'
      ],
      [
        '¿Cuánto cuesta?',
        'Los alérgenos forman parte de [Savour Pro](/es/precios) y también funcionan en un equipo de cocina cuyo propietario tiene Pro. Las cuentas nuevas reciben 7 días de Pro gratis. ¿Quieres verlo antes? [Abre la demo](/es?demo=1): allí ves los alérgenos en las recetas de ejemplo. Más sobre la función en [Alérgenos por receta](/es/alergenos-por-receta).'
      ]
    ],
    outro: 'Este texto describe la función tal como está disponible ahora. Si algo cambia, lo actualizaremos aquí.'
  }
};

export const ALLERGEN_POST_FR = {
  'en/blog/allergens-in-savour': {
    slug: 'fr/blog/allergenes-dans-savour',
    title: 'Les allergènes dans Savour : comment ça marche',
    desc: 'Les allergènes par recette, y compris via les recettes de base. Savour reconnaît lui-même les ingrédients de tes recettes ; tu confirmes seulement ce dont Savour n’est pas sûr. Comment ça marche, et pourquoi Savour ne dit jamais qu’un plat est sans allergènes.',
    h1: 'Les allergènes dans Savour : comment ça marche',
    lead: 'Un client demande à table s’il y a des fruits à coque dans la sauce. Dans Savour, la réponse figure maintenant sur la recette, même quand les fruits à coque sont dans une recette de base. Voici comment ça marche, et ce que Savour ne fait volontairement pas.',
    sections: [
      [
        'Savour lit tes ingrédients',
        'Pour chaque ligne de recette, Savour cherche l’ingrédient : dans « 250 g de beurre froid, en dés », c’est le beurre, avec le lait comme allergène. Savour utilise pour cela une liste commune d’ingrédients et de leurs allergènes : la liste Savour. Elle existe en cinq langues. La liste néerlandaise compte plus de 3 100 ingrédients ; l’anglais, l’allemand, l’espagnol et le français en comptent chacun entre 2 600 et 2 900.\n\nTu n’as donc pas à saisir des centaines d’ingrédients toi-même. Ce qui figure dans la liste Savour compte tout de suite. Si tu utilises une recette de base, comme un fond, une pâte ou une sauce, ses allergènes comptent aussi. Si la moutarde est dans ta vinaigrette, tu vois aussi la moutarde sur la salade qui utilise cette vinaigrette.'
      ],
      [
        'Tu réponds seulement aux questions',
        'Ce dont Savour n’est pas sûr se trouve sous Allergènes → À vérifier. Tu y reçois une question à la fois :',
        [
          'Cette suggestion est-elle juste ? Par exemple : crème fraîche, avec lait.',
          'Est-ce juste pour ta marque ? Pour les ingrédients qui varient selon la marque.',
          'Est-ce ta propre recette ? « Fond légumes » dans une ligne devient alors ta recette Fond de légumes.',
          'Est-ce vraiment un ingrédient ? Des mots comme « appareil », « garniture » ou « pour le moule », tu les retires ; Savour s’en souvient pour les nouvelles recettes.',
          'Qu’est-ce que c’est ? Pour un nom que Savour ne connaît pas, comme « jus » : quel jus, toi seul le sais.'
        ]
      ],
      [
        'Différent selon la marque',
        'Certains ingrédients contiennent autre chose d’une marque à l’autre. Pense à la gélatine (porc, bœuf ou poisson), la sauce soja (avec ou sans gluten), le chocolat (lait, soja, fruits à coque), le bouillon et le fond (céleri, gluten), la charcuterie, le pesto (fruits à coque), la mayonnaise (œuf, moutarde) et la chapelure. Pour ces ingrédients, Savour pose la question une fois par cuisine. Si ta marque est différente, tu crées ta propre version ; elle passe avant la liste Savour.'
      ],
      [
        'Les 14 allergènes, et ce que tu actives',
        'Par défaut, Savour affiche les 14 allergènes des règles européennes : gluten, crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde, sésame, sulfites, lupin et mollusques. Sous Allergènes → Allergènes, tu actives ce que les clients demandent en plus, comme le lactose, le porc, l’alcool, l’ail ou la famille de l’oignon. Ils sont désactivés par défaut. Ce que tu désactives reste enregistré ; tu ne le vois simplement plus.\n\nLe lactose est volontairement séparé du lait : la crème sans lactose contient toujours des protéines de lait.'
      ],
      [
        'Pourquoi Savour ne dit jamais qu’un plat est sans allergènes',
        'Un allergène de trop est gênant ; un de moins est dangereux. C’est pourquoi Savour est strict. Tant qu’une recette contient un ingrédient non vérifié, elle indique que la recette n’est pas encore complète, avec un point d’interrogation là où Savour ne sait pas encore. Ce n’est que lorsque tout est vérifié et qu’aucun des 14 allergènes n’y figure que Savour indique que la recette n’en contient aucun. Pour les caractéristiques que tu actives toi-même, Savour indique seulement ce qu’il y a, jamais ce qu’il n’y a pas.\n\nUne suggestion reste une suggestion. L’étiquette de ton fournisseur prime toujours.'
      ],
      [
        'Sur la recette, sur le tableau et sur papier',
        'Chaque recette a un bloc Allergènes que tu déplies. En dessous se trouve le tableau des allergènes : pour chaque ligne d’ingrédient, les allergènes qu’elle contient, pour voir d’un coup d’œil d’où vient le céleri. Quand tu imprimes une recette, tu choisis si les allergènes y figurent. Si la recette n’est pas encore entièrement vérifiée, c’est indiqué aussi.'
      ],
      [
        'Dans l’équipe de cuisine',
        'Une équipe de cuisine a une liste d’ingrédients pour toute l’équipe. Le propriétaire et ceux qui peuvent modifier répondent aux questions et ajustent les ingrédients. Un cuisinier voit les allergènes sur chaque recette et peut voir, ligne par ligne, d’où ils viennent.'
      ],
      [
        'D’où vient la liste Savour',
        'La liste Savour est composée à partir de la liste d’ingrédients d’Open Food Facts, des listes Wikipédia de légumes, herbes, champignons, sauces et fromages, des noms de produits néerlandais de NEVO (la base de composition des aliments du RIVM) et de la propre liste de termes de cuisine de Savour. NEVO ne contient pas d’allergènes ; Savour les ajoute.\n\nSi un ingrédient qui n’est pas encore dans la liste apparaît dans des recettes, nous le vérifions avant de l’ajouter. Nous ne voyons que le nom de l’ingrédient, jamais tes recettes. Toute la liste est publique : [voir la liste d’ingrédients de Savour](/fr/liste-ingredients-allergenes). Si tu vois une erreur, dis-le-nous.'
      ],
      [
        'Combien ça coûte ?',
        'Les allergènes font partie de [Savour Pro](/fr/tarifs) et fonctionnent aussi dans une équipe de cuisine dont le propriétaire a Pro. Les nouveaux comptes reçoivent 7 jours de Pro gratuits. Envie de voir d’abord ? [Ouvre la démo](/fr?demo=1) : les recettes d’exemple y montrent leurs allergènes. Plus d’infos sur la fonction : [Allergènes par recette](/fr/allergenes-par-recette).'
      ]
    ],
    outro: 'Ce texte décrit la fonction telle qu’elle est disponible aujourd’hui. Si quelque chose change, nous le mettrons à jour ici.'
  }
};

// De openbare lijstpagina, per taal.
export const LIST_PAGE = {
  nl: {
    title: 'Ingrediëntenlijst met allergenen | Savour',
    desc: 'De ingrediëntenlijst die Savour leest om allergenen voor te stellen: ruim 3.700 ingrediënten uit Open Food Facts, NEVO, Wikipedia en Savours eigen woordenlijst, met de 14 allergenen en extra kenmerken.',
    h1: 'De ingrediëntenlijst van Savour',
    lead: 'Dit is de lijst die Savour leest om bij een nieuw product allergenen voor te stellen. Zoek een ingrediënt en zie welke allergenen Savour erbij voorstelt.',
    search: 'Zoek een ingrediënt',
    filter: 'Alle allergenen',
    name: 'Ingrediënt',
    allergens: 'Allergenen (voorstel)',
    also: 'Ook bekend als',
    source: 'Bron',
    none: 'Geen allergeen bekend',
    count: n => `${n} ingrediënten`,
    shown: (n, total) => `${n} van ${total} ingrediënten`,
    more: 'Meer tonen',
    empty: 'Niets gevonden. Savour kent dit ingrediënt (nog) niet onder deze naam.',
    loading: 'Lijst laden…',
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia / Wikidata' },
    sections: [
      [
        'Een voorstel, geen etiket',
        'De allergenen in deze lijst zijn een voorstel van Savour, op basis van de bronnen en de naam. Een merk kan iets anders bevatten dan je verwacht: het etiket van je leverancier gaat altijd voor. "Geen allergeen bekend" betekent niet dat een ingrediënt allergeenvrij is. In de app bevestig je zelf elk product, en zegt Savour nooit dat een recept vrij is van allergenen zolang er ingrediënten zonder gecontroleerd product zijn. Hoe dat werkt, lees je in [Allergenen in Savour](/blog/allergenen-in-savour).'
      ],
      [
        'Waar de lijst vandaan komt',
        'Drie bronnen samen: de ingrediëntentaxonomie van [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), de Nederlandse productnamen uit NEVO online versie 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), de lijsten van [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) met groenten, keukenkruiden, paddenstoelen, sauzen, dranken en kazen (namen onder CC BY-SA 4.0), [Wikidata](https://www.wikidata.org) (CC0), en Savours eigen woordenlijst met keukentermen. NEVO bevat geen allergenen: die zijn een aanvulling van Savour, geen gegevens van het RIVM. Zie je een fout? [Laat het ons weten](/contact).'
      ]
    ]
  },
  en: {
    title: 'Ingredient list with allergens | Savour',
    desc: 'The ingredient list Savour reads to suggest allergens: over 3,700 ingredients from Open Food Facts, NEVO, Wikipedia and Savour’s own list, with the 14 allergens and extra characteristics.',
    h1: 'Savour’s ingredient list',
    lead: 'This is the list Savour reads to suggest allergens for a new product. Search an ingredient and see which allergens Savour suggests. The names are in Dutch, with English names where the source has them.',
    search: 'Search an ingredient',
    filter: 'All allergens',
    name: 'Ingredient',
    allergens: 'Allergens (suggested)',
    also: 'Also known as',
    source: 'Source',
    none: 'No allergen known',
    count: n => `${n} ingredients`,
    shown: (n, total) => `${n} of ${total} ingredients`,
    more: 'Show more',
    empty: 'Nothing found. Savour does not know this ingredient under this name (yet).',
    loading: 'Loading list…',
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia / Wikidata' },
    sections: [
      [
        'A suggestion, not a label',
        'The allergens in this list are suggested by Savour, based on the sources and the name. A brand can contain something you do not expect: your supplier’s label always comes first. "No allergen known" does not mean an ingredient is allergen-free. In the app you confirm every product yourself, and Savour never says a recipe is free of allergens while there are ingredients without a checked product. Read how it works in [Allergens in Savour](/en/blog/allergens-in-savour).'
      ],
      [
        'Where the list comes from',
        'Three sources together: the ingredient taxonomy of [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), the Dutch product names from NEVO online version 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), the [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) lists of vegetables, herbs, mushrooms, sauces, drinks and cheeses (names under CC BY-SA 4.0), [Wikidata](https://www.wikidata.org) (CC0), and Savour’s own list of kitchen terms. NEVO contains no allergens: those are added by Savour, not data from RIVM. Spot a mistake? [Let us know](/en/contact).'
      ]
    ]
  },
  de: {
    title: 'Zutatenliste mit Allergenen | Savour',
    desc: 'Die Zutatenliste, die Savour liest, um Allergene vorzuschlagen: gut 3.700 Zutaten aus Open Food Facts, NEVO, Wikipedia und Savours eigener Liste, mit den 14 Allergenen und zusätzlichen Merkmalen.',
    h1: 'Die Zutatenliste von Savour',
    lead: 'Diese Liste liest Savour, um bei einem neuen Produkt Allergene vorzuschlagen. Suche eine Zutat und sieh, welche Allergene Savour vorschlägt. Die Namen sind niederländisch, mit englischen Namen, wo die Quelle sie hat.',
    search: 'Zutat suchen',
    filter: 'Alle Allergene',
    name: 'Zutat',
    allergens: 'Allergene (Vorschlag)',
    also: 'Auch bekannt als',
    source: 'Quelle',
    none: 'Kein Allergen bekannt',
    count: n => `${n} Zutaten`,
    shown: (n, total) => `${n} von ${total} Zutaten`,
    more: 'Mehr zeigen',
    empty: 'Nichts gefunden. Savour kennt diese Zutat unter diesem Namen (noch) nicht.',
    loading: 'Liste wird geladen…',
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia / Wikidata' },
    sections: [
      [
        'Ein Vorschlag, kein Etikett',
        'Die Allergene in dieser Liste sind ein Vorschlag von Savour, auf Basis der Quellen und des Namens. Eine Marke kann etwas anderes enthalten, als du erwartest: das Etikett deines Lieferanten geht immer vor. „Kein Allergen bekannt“ heißt nicht, dass eine Zutat allergenfrei ist. Wie es in der App funktioniert, liest du in [Allergene in Savour](/de/blog/allergene-in-savour).'
      ],
      [
        'Woher die Liste kommt',
        'Vier Quellen zusammen: die Zutatentaxonomie von [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), die niederländischen Produktnamen aus NEVO online Version 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), die Listen der [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) mit Gemüse, Kräutern, Pilzen, Saucen, Getränken und Käse (Namen unter CC BY-SA 4.0), [Wikidata](https://www.wikidata.org) (CC0) und Savours eigene Liste mit Küchenbegriffen. NEVO enthält keine Allergene: die ergänzt Savour, es sind keine Daten des RIVM.'
      ]
    ]
  },
  es: {
    title: 'Lista de ingredientes con alérgenos | Savour',
    desc: 'La lista de ingredientes que lee Savour para sugerir alérgenos: más de 3.700 ingredientes de Open Food Facts, NEVO, Wikipedia y la lista propia de Savour, con los 14 alérgenos y características extra.',
    h1: 'La lista de ingredientes de Savour',
    lead: 'Esta es la lista que lee Savour para sugerir alérgenos en un producto nuevo. Busca un ingrediente y mira qué alérgenos sugiere Savour. Los nombres están en neerlandés, con nombres en inglés cuando la fuente los tiene.',
    search: 'Buscar un ingrediente',
    filter: 'Todos los alérgenos',
    name: 'Ingrediente',
    allergens: 'Alérgenos (sugerencia)',
    also: 'También conocido como',
    source: 'Fuente',
    none: 'Ningún alérgeno conocido',
    count: n => `${n} ingredientes`,
    shown: (n, total) => `${n} de ${total} ingredientes`,
    more: 'Mostrar más',
    empty: 'No se ha encontrado nada. Savour (aún) no conoce este ingrediente con este nombre.',
    loading: 'Cargando lista…',
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia / Wikidata' },
    sections: [
      [
        'Una sugerencia, no una etiqueta',
        'Los alérgenos de esta lista son una sugerencia de Savour, según las fuentes y el nombre. Una marca puede contener algo que no esperas: la etiqueta de tu proveedor siempre manda. «Ningún alérgeno conocido» no significa que un ingrediente no tenga alérgenos. Cómo funciona en la app lo explicamos en [Alérgenos en Savour](/es/blog/alergenos-en-savour).'
      ],
      [
        'De dónde viene la lista',
        'Cuatro fuentes juntas: la taxonomía de ingredientes de [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), los nombres de productos neerlandeses de NEVO online versión 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), las listas de [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) de verduras, hierbas, setas, salsas, bebidas y quesos (nombres bajo CC BY-SA 4.0), [Wikidata](https://www.wikidata.org) (CC0) y la lista propia de Savour con términos de cocina. NEVO no contiene alérgenos: los añade Savour, no son datos del RIVM.'
      ]
    ]
  },
  fr: {
    title: 'Liste d’ingrédients avec allergènes | Savour',
    desc: 'La liste d’ingrédients que lit Savour pour proposer des allergènes : plus de 3 700 ingrédients d’Open Food Facts, de NEVO, de Wikipédia et de la liste propre de Savour, avec les 14 allergènes et des caractéristiques en plus.',
    h1: 'La liste d’ingrédients de Savour',
    lead: 'Voici la liste que lit Savour pour proposer des allergènes pour un nouveau produit. Cherche un ingrédient et vois quels allergènes Savour propose. Les noms sont en néerlandais, avec les noms anglais quand la source les donne.',
    search: 'Chercher un ingrédient',
    filter: 'Tous les allergènes',
    name: 'Ingrédient',
    allergens: 'Allergènes (suggestion)',
    also: 'Aussi appelé',
    source: 'Source',
    none: 'Aucun allergène connu',
    count: n => `${n} ingrédients`,
    shown: (n, total) => `${n} sur ${total} ingrédients`,
    more: 'Afficher plus',
    empty: 'Rien trouvé. Savour ne connaît pas (encore) cet ingrédient sous ce nom.',
    loading: 'Chargement de la liste…',
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia / Wikidata' },
    sections: [
      [
        'Une suggestion, pas une étiquette',
        'Les allergènes de cette liste sont proposés par Savour, d’après les sources et le nom. Une marque peut contenir autre chose que prévu : l’étiquette de ton fournisseur passe toujours en premier. « Aucun allergène connu » ne veut pas dire qu’un ingrédient est sans allergènes. Comment ça marche dans l’app : [Les allergènes dans Savour](/fr/blog/allergenes-dans-savour).'
      ],
      [
        'D’où vient la liste',
        'Quatre sources réunies : la taxonomie des ingrédients d’[Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), les noms de produits néerlandais de NEVO online version 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), les listes de [Wikipédia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) de légumes, herbes, champignons, sauces, boissons et fromages (noms sous CC BY-SA 4.0), [Wikidata](https://www.wikidata.org) (CC0), et la liste propre de Savour avec des termes de cuisine. NEVO ne contient pas d’allergènes : ils sont ajoutés par Savour, ce ne sont pas des données du RIVM.'
      ]
    ]
  }
};

// Uitgebreide opmaak van de allergenenblog, per taal: "In het kort" bovenaan en per sectie (nummer) extra blokken.
// Alleen blokken die iets toevoegen: een echt scherm uit de demo (assets/app/allergenen-<taal>.jpg, recept Beurre
// blanc), een tip en een aandachtspunt uit de praktijk, en de kernzin van het artikel.
const RICH = {
  nl: {
    brief: [
      'Savour telt per recept de allergenen op, ook die uit je basisrecepten.',
      'Honderden ingrediëntnamen koppel je in één keer; je ziet eerst wat Savour gaat doen.',
      'Zolang er iets niet gecontroleerd is, zegt Savour dat er ook bij. Nooit "allergeenvrij" op goed geluk.'
    ],
    extra: {
      0: [
        {
          shot: '/assets/app/allergenen-nl.jpg',
          alt: 'Recept Beurre blanc in Savour met het blok Allergenen: melk en sulfiet, nog niet compleet',
          caption:
            'Beurre blanc in de demo: melk uit de roomboter, sulfiet uit de wijn, en één regel die nog gecontroleerd moet worden.'
        }
      ],
      3: [
        {
          tip: [
            'Begin bij je basisrecepten',
            'Kloppen de allergenen van je fonds, deeg en sauzen, dan kloppen ze vanzelf ook in elk gerecht dat ze gebruikt. Daar win je de meeste tijd.'
          ]
        }
      ],
      5: [
        { quote: 'Een allergeen te veel is vervelend, een allergeen te weinig is gevaarlijk.' },
        {
          warn: [
            'Ander merk, opnieuw kijken',
            'Stap je over op een andere leverancier of een ander merk, controleer dan het product in Savour opnieuw. Eén bouillonblokje kan net iets anders bevatten.'
          ]
        }
      ]
    }
  },
  en: {
    brief: [
      'Savour adds up the allergens of every recipe, including those from your base recipes.',
      'You link hundreds of ingredient names in one go, and you always see first what Savour will do.',
      'As long as something is unchecked, Savour says so. Never "allergen-free" by guesswork.'
    ],
    extra: {
      0: [
        {
          shot: '/assets/app/allergenen-en.jpg',
          alt: 'Recipe Beurre blanc in Savour with the Allergens block: milk and sulphites, not complete yet',
          caption:
            'Beurre blanc in the demo: milk from the butter, sulphites from the wine, and one line still to be checked.'
        }
      ],
      3: [
        {
          tip: [
            'Start with your base recipes',
            'Once the allergens of your stocks, doughs and sauces are right, they are right in every dish that uses them. That is where you save the most time.'
          ]
        }
      ],
      5: [
        { quote: 'One allergen too many is annoying; one too few is dangerous.' },
        {
          warn: [
            'New brand, check again',
            'When you switch supplier or brand, check the product in Savour again. A different stock cube can contain something slightly different.'
          ]
        }
      ]
    }
  },
  de: {
    brief: [
      'Savour zählt pro Rezept die Allergene zusammen, auch die aus deinen Grundrezepten.',
      'Hunderte Zutatennamen verknüpfst du in einem Schritt, und du siehst immer zuerst, was Savour tun wird.',
      'Solange etwas nicht geprüft ist, sagt Savour das dazu. Nie „allergenfrei“ auf gut Glück.'
    ],
    extra: {
      0: [
        {
          shot: '/assets/app/allergenen-de.jpg',
          alt: 'Rezept Beurre blanc in Savour mit dem Block Allergene: Milch und Sulfite, noch nicht vollständig',
          caption:
            'Beurre blanc in der Demo: Milch aus der Butter, Sulfite aus dem Wein und eine Zeile, die noch geprüft werden muss.'
        }
      ],
      3: [
        {
          tip: [
            'Fang bei deinen Grundrezepten an',
            'Stimmen die Allergene deiner Fonds, Teige und Saucen, dann stimmen sie automatisch in jedem Gericht, das sie verwendet. Dort sparst du die meiste Zeit.'
          ]
        }
      ],
      5: [
        { quote: 'Ein Allergen zu viel ist lästig, eins zu wenig ist gefährlich.' },
        {
          warn: [
            'Andere Marke, noch einmal prüfen',
            'Wechselst du Lieferant oder Marke, prüfe das Produkt in Savour noch einmal. Ein anderer Brühwürfel kann etwas anderes enthalten.'
          ]
        }
      ]
    }
  },
  es: {
    brief: [
      'Savour suma los alérgenos de cada receta, también los de tus recetas base.',
      'Enlazas cientos de nombres de ingredientes de una vez, y siempre ves primero lo que va a hacer Savour.',
      'Mientras algo no esté comprobado, Savour lo indica. Nunca «sin alérgenos» a ojo.'
    ],
    extra: {
      0: [
        {
          shot: '/assets/app/allergenen-es.jpg',
          alt: 'Receta Beurre blanc en Savour con el bloque Alérgenos: leche y sulfitos, aún no completo',
          caption:
            'Beurre blanc en la demo: leche de la mantequilla, sulfitos del vino y una línea que aún hay que comprobar.'
        }
      ],
      3: [
        {
          tip: [
            'Empieza por tus recetas base',
            'Si los alérgenos de tus fondos, masas y salsas son correctos, lo son también en cada plato que los usa. Ahí es donde más tiempo ahorras.'
          ]
        }
      ],
      5: [
        { quote: 'Un alérgeno de más es molesto; uno de menos es peligroso.' },
        {
          warn: [
            'Otra marca, vuelve a comprobar',
            'Si cambias de proveedor o de marca, vuelve a comprobar el producto en Savour. Otra pastilla de caldo puede llevar algo distinto.'
          ]
        }
      ]
    }
  },
  fr: {
    brief: [
      'Savour additionne les allergènes de chaque recette, y compris ceux de tes recettes de base.',
      'Tu relies des centaines de noms d’ingrédients en une fois, et tu vois toujours d’abord ce que Savour va faire.',
      'Tant que quelque chose n’est pas vérifié, Savour le dit. Jamais « sans allergènes » au hasard.'
    ],
    extra: {
      0: [
        {
          shot: '/assets/app/allergenen-fr.jpg',
          alt: 'Recette Beurre blanc dans Savour avec le bloc Allergènes : lait et sulfites, pas encore complet',
          caption: 'Beurre blanc dans la démo : le lait du beurre, les sulfites du vin et une ligne encore à vérifier.'
        }
      ],
      3: [
        {
          tip: [
            'Commence par tes recettes de base',
            'Si les allergènes de tes fonds, pâtes et sauces sont justes, ils le sont aussi dans chaque plat qui les utilise. C’est là que tu gagnes le plus de temps.'
          ]
        }
      ],
      5: [
        { quote: 'Un allergène de trop est gênant ; un de moins est dangereux.' },
        {
          warn: [
            'Autre marque, vérifie à nouveau',
            'Si tu changes de fournisseur ou de marque, vérifie à nouveau le produit dans Savour. Un autre cube de bouillon peut contenir autre chose.'
          ]
        }
      ]
    }
  }
};
const KEY = 'en/blog/allergens-in-savour';
for (const [lang, post] of [
  ['nl', ALLERGEN_POST.nl],
  ['en', ALLERGEN_POST.en],
  ['de', ALLERGEN_POST_DE[KEY]],
  ['es', ALLERGEN_POST_ES[KEY]],
  ['fr', ALLERGEN_POST_FR[KEY]]
]) {
  post.brief = RICH[lang].brief;
  for (const [i, blocks] of Object.entries(RICH[lang].extra)) post.sections[i].push(...blocks);
}
