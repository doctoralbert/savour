// Blog over de allergenenfunctie (testversie, 2026-11) en de openbare ingrediëntenlijst die Savour leest
// (/ingredientenlijst-allergenen, gegevens uit tools/build-ingredientenlijst.mjs). Alles wat hier staat, klopt met
// js/features/products.js en product-autolink.js: pas de tekst aan als de functie verandert.

export const LIST_SLUGS = {
  nl: 'ingredientenlijst-allergenen',
  en: 'en/ingredient-list-allergens',
  de: 'de/zutatenliste-allergene',
  es: 'es/lista-ingredientes-alergenos',
  fr: 'fr/liste-ingredients-allergenes'
};

export const ALLERGEN_POST = {
  id: 'allergenen',
  date: '2026-11-06',
  nl: {
    slug: 'blog/allergenen-in-savour',
    title: 'Allergenen in Savour: zo gaat de nieuwe functie werken',
    desc: 'Allergenen per recept, ook via basisrecepten: hoe Savour ingrediënten koppelt aan producten, waar de voorstellen vandaan komen en waarom Savour nooit zegt dat een recept vrij is van allergenen.',
    h1: 'Allergenen in Savour: zo gaat de nieuwe functie werken',
    lead: 'Een gast vraagt aan tafel of er noten in de saus zitten. Met de nieuwe allergenenfunctie zie je het antwoord in het recept, ook als de noten in een basisrecept zitten. Zo werkt het, en zo werkt het bewust niet.',
    sections: [
      [
        'Van ingrediënt naar product',
        'De basis is een lijst met producten: de ingrediënten zoals je keuken ze inkoopt, zoals roomboter, bloem of sojasaus. Elk product heeft zijn allergenen. Receptregels koppelt Savour op naam aan een product: in "250 g koude roomboter, in blokjes" herkent Savour het product Roomboter. Zo telt Savour per recept op welke allergenen erin zitten.\n\nGebruik je een basisrecept, zoals een fond, een deeg of een saus, dan tellen de allergenen van dat basisrecept mee. Staat de mosterd in je vinaigrette, dan zie je mosterd ook bij de salade die de vinaigrette gebruikt.'
      ],
      [
        'De 14 allergenen, en wat gasten nog meer vragen',
        'Savour werkt met de 14 allergenen uit de Europese regels: gluten, schaaldieren, eieren, vis, pinda’s, soja, melk, noten, selderij, mosterd, sesamzaad, sulfiet, lupine en weekdieren. Daarnaast kun je extra kenmerken bijhouden waar gasten om vragen, bijvoorbeeld lactose, varkensvlees, alcohol, uiachtigen, knoflook, paddenstoelen of FODMAP. Je kiest zelf of je alleen de 14 wettelijke allergenen wilt of ook die extra kenmerken.\n\nLactose staat bewust los van melk: lactosevrije room bevat nog steeds melkeiwit.'
      ],
      [
        'Niet honderden namen met de hand koppelen',
        'Een receptenboek met honderden recepten heeft al snel duizend verschillende ingrediëntnamen. Die wil niemand een voor een koppelen. Met Alles automatisch koppelen regelt Savour ze in één keer:',
        [
          'een basisrecept met dezelfde naam ("groente fond" wordt je recept Groentefond);',
          'een product dat je al hebt, ook met een andere schrijfwijze of in het meervoud;',
          'het hoofdproduct: "boerenkool zonder stronk" is Boerenkool, "kabeljauwfilet zonder vel" is Kabeljauw;',
          'een nieuw product uit de ingrediëntenlijst van Savour, met de allergenen als voorstel;',
          'blijft er twijfel, zoals bij "sap" of "coulis", dan laat Savour de naam staan. Welk sap? Dat weet alleen jij.'
        ]
      ],
      [
        'Je ziet altijd eerst wat Savour gaat doen',
        'Voordat er iets verandert, zie je de hele lijst: welke naam bij welk product komt en welke allergenen dat product krijgt. Wat je uitvinkt, laat Savour staan. Daarna kun je elk product nog aanpassen. Savour wijzigt nooit stilletjes iets in je recepten: de receptregels zelf blijven precies zoals je ze schreef.\n\nWie niet bij nul wil beginnen, neemt de startlijst over: ruim 200 producten die in professionele recepten het vaakst voorkomen. Bij fond, gelatine en chocolade stelt Savour eerst een vraag, want daar hangt het af van wat jouw keuken gebruikt.'
      ],
      [
        'De ingrediëntenlijst die Savour leest',
        'De voorstellen komen uit één lijst met ruim 3.500 ingrediënten. Die is samengesteld uit vier bronnen: de ingrediëntenlijst van Open Food Facts, de lijsten met groenten, kruiden, paddenstoelen, sauzen en kazen op Wikipedia, de Nederlandse productnamen uit NEVO (het voedingsstoffenbestand van het RIVM) en Savours eigen woordenlijst met keukentermen zoals spitskool, sukade en couverture. NEVO zelf bevat geen allergenen; die zijn een aanvulling van Savour.\n\nDe hele lijst staat openbaar, met de allergenen die Savour voorstelt: [bekijk de ingrediëntenlijst van Savour](/ingredientenlijst-allergenen). Zo kun je zelf nagaan waar een voorstel vandaan komt. Zie je een fout, laat het ons weten.'
      ],
      [
        'Waarom Savour nooit zegt dat iets allergeenvrij is',
        'Een allergeen te veel is vervelend, een allergeen te weinig is gevaarlijk. Daarom is Savour streng. Zolang een recept regels heeft zonder gecontroleerd product, staat erbij: "Nog niet compleet", met het aantal ingrediënten dat nog open staat. Pas als alle regels gecontroleerd zijn en er geen van de 14 allergenen in zit, staat er dat het recept geen van de 14 allergenen bevat. Bij de extra kenmerken meldt Savour alleen wat erin zit, nooit dat het er niet in zit.\n\nEen voorstel is ook maar een voorstel. Het etiket van je leverancier gaat altijd voor: een ander merk bouillon kan net iets anders bevatten.'
      ],
      [
        'In het keukenteam en op papier',
        'Een keukenteam heeft één eigen productlijst voor het hele team. De eigenaar en de sous-chefs beheren die lijst; een kok ziet de allergenen bij elk recept en kan per regel zien waar ze vandaan komen. Print je een recept, dan staan de allergenen op de print, en als het recept nog niet volledig gecontroleerd is, staat dat er ook op.'
      ],
      [
        'Wanneer komt het?',
        'De allergenenfunctie draait nu in onze testversie, met echte receptenboeken uit de keuken. We zetten hem live zodra de koppelingen goed genoeg zijn voor de drukte van een service. Allergenen bijhouden wordt onderdeel van Savour Pro, net als in een keukenteam van een eigenaar met Pro.'
      ]
    ],
    outro:
      'Deze uitleg beschrijft de functie zoals die nu in de testversie werkt. Wat er bij de lancering nog verandert, passen we hier aan.'
  },
  en: {
    slug: 'en/blog/allergens-in-savour',
    title: 'Allergens in Savour: how the new feature will work',
    desc: 'Allergens per recipe, including through base recipes: how Savour links ingredients to products, where the suggestions come from and why Savour never says a recipe is free of allergens.',
    h1: 'Allergens in Savour: how the new feature will work',
    lead: 'A guest asks at the table whether there are nuts in the sauce. With the new allergen feature, the answer is in the recipe, even when the nuts are in a base recipe. This is how it works, and how it deliberately does not.',
    sections: [
      [
        'From ingredient to product',
        'It starts with a list of products: ingredients as your kitchen buys them, such as butter, flour or soy sauce. Each product has its allergens. Savour links recipe lines to a product by name: in "250 g cold butter, diced" Savour recognises the product Butter. That way Savour adds up the allergens of each recipe.\n\nIf you use a base recipe, such as a stock, a dough or a sauce, the allergens of that base recipe count too. If the mustard is in your vinaigrette, you also see mustard on the salad that uses it.'
      ],
      [
        'The 14 allergens, and what guests ask about',
        'Savour works with the 14 allergens from the European rules: gluten, crustaceans, eggs, fish, peanuts, soy, milk, nuts, celery, mustard, sesame, sulphites, lupin and molluscs. You can also track extra characteristics guests ask about, for example lactose, pork, alcohol, the onion family, garlic, mushrooms or FODMAP. You choose whether you want only the 14 legal allergens or the extras too.\n\nLactose is deliberately separate from milk: lactose-free cream still contains milk protein.'
      ],
      [
        'No linking hundreds of names by hand',
        'A recipe book with hundreds of recipes quickly has a thousand different ingredient names. Nobody wants to link them one by one. With Link everything automatically, Savour handles them in one go:',
        [
          'a base recipe with the same name ("veg stock" becomes your recipe Vegetable stock);',
          'a product you already have, also with a different spelling or in the plural;',
          'the main product: "kale without stalk" is Kale, "skinless cod fillet" is Cod;',
          'a new product from Savour’s ingredient list, with the allergens as a suggestion;',
          'if there is doubt, as with "juice" or "coulis", Savour leaves the name as it is. Which juice? Only you know.'
        ]
      ],
      [
        'You always see first what Savour will do',
        'Before anything changes, you see the whole list: which name goes to which product and which allergens that product gets. Anything you untick, Savour leaves alone. Afterwards you can still adjust every product. Savour never quietly changes your recipes: the recipe lines themselves stay exactly as you wrote them.\n\nIf you do not want to start from zero, take over the starter list: over 200 products that appear most often in professional recipes. For stock, gelatine and chocolate Savour asks a question first, because it depends on what your kitchen uses.'
      ],
      [
        'The ingredient list Savour reads',
        'The suggestions come from one list of over 3,500 ingredients, built from four sources: the ingredient list of Open Food Facts, the Dutch Wikipedia lists of vegetables, herbs, mushrooms, sauces and cheeses, the Dutch product names from NEVO (the Dutch food composition database of RIVM) and Savour’s own list of kitchen terms. NEVO itself contains no allergens; those are added by Savour. The names are in Dutch, with English names where the source has them.\n\nThe whole list is public, with the allergens Savour suggests: [see Savour’s ingredient list](/en/ingredient-list-allergens). That way you can check where a suggestion comes from. Spot a mistake? Let us know.'
      ],
      [
        'Why Savour never says something is allergen-free',
        'One allergen too many is annoying; one too few is dangerous. That is why Savour is strict. As long as a recipe has lines without a checked product, it says "Not complete yet", with the number of ingredients still open. Only when every line is checked and none of the 14 allergens is in it does Savour say the recipe contains none of the 14 allergens. For the extra characteristics Savour only reports what is in it, never what is not.\n\nA suggestion is only a suggestion. Your supplier’s label always comes first: another brand of stock can contain something slightly different.'
      ],
      [
        'In the kitchen team and on paper',
        'A kitchen team has one product list for the whole team. The owner and the sous-chefs manage that list; a cook sees the allergens on every recipe and can see per line where they come from. When you print a recipe, the allergens are on the print, and if the recipe is not fully checked yet, that is on it too.'
      ],
      [
        'When is it coming?',
        'The allergen feature now runs in our test version, with real recipe books from the kitchen. We will put it live once the linking is good enough for the rush of a service. Tracking allergens will be part of Savour Pro, as well as in a kitchen team whose owner has Pro.'
      ]
    ],
    outro:
      'This explains the feature as it works in the test version today. If anything changes at launch, we will update it here.'
  }
};

// Vertalingen van de blog, op de Engelse slug (zoals de andere blogs in tools/site-pages-*.mjs).
export const ALLERGEN_POST_DE = {
  'en/blog/allergens-in-savour': {
    slug: 'de/blog/allergene-in-savour',
    title: 'Allergene in Savour: so wird die neue Funktion arbeiten',
    desc: 'Allergene pro Rezept, auch über Grundrezepte: wie Savour Zutaten mit Produkten verknüpft, woher die Vorschläge kommen und warum Savour nie sagt, dass ein Rezept allergenfrei ist.',
    h1: 'Allergene in Savour: so wird die neue Funktion arbeiten',
    lead: 'Ein Gast fragt am Tisch, ob Nüsse in der Sauce sind. Mit der neuen Allergenfunktion steht die Antwort im Rezept, auch wenn die Nüsse in einem Grundrezept stecken. So funktioniert es, und so bewusst nicht.',
    sections: [
      [
        'Von der Zutat zum Produkt',
        'Die Grundlage ist eine Liste mit Produkten: Zutaten, wie deine Küche sie einkauft, etwa Butter, Mehl oder Sojasauce. Jedes Produkt hat seine Allergene. Rezeptzeilen verknüpft Savour über den Namen mit einem Produkt. So zählt Savour pro Rezept zusammen, welche Allergene darin stecken.\n\nVerwendest du ein Grundrezept, etwa einen Fond, einen Teig oder eine Sauce, zählen dessen Allergene mit. Steckt Senf in deiner Vinaigrette, siehst du Senf auch beim Salat, der sie verwendet.'
      ],
      [
        'Die 14 Allergene, und was Gäste sonst noch fragen',
        'Savour arbeitet mit den 14 Allergenen aus den europäischen Regeln: Gluten, Krebstiere, Eier, Fisch, Erdnüsse, Soja, Milch, Schalenfrüchte, Sellerie, Senf, Sesam, Sulfite, Lupinen und Weichtiere. Dazu kannst du zusätzliche Merkmale führen, nach denen Gäste fragen, zum Beispiel Laktose, Schweinefleisch, Alkohol, Zwiebelgewächse, Knoblauch, Pilze oder FODMAP. Du entscheidest, ob du nur die 14 gesetzlichen Allergene willst oder auch die zusätzlichen Merkmale.\n\nLaktose steht bewusst getrennt von Milch: laktosefreie Sahne enthält immer noch Milcheiweiß.'
      ],
      [
        'Nicht Hunderte Namen von Hand verknüpfen',
        'Ein Rezeptbuch mit Hunderten Rezepten hat schnell tausend verschiedene Zutatennamen. Mit „Alles automatisch verknüpfen“ erledigt Savour sie in einem Schritt:',
        [
          'ein Grundrezept mit demselben Namen;',
          'ein Produkt, das du schon hast, auch in anderer Schreibweise oder im Plural;',
          'das Hauptprodukt: „Grünkohl ohne Strunk“ ist Grünkohl, „Kabeljaufilet ohne Haut“ ist Kabeljau;',
          'ein neues Produkt aus der Zutatenliste von Savour, mit den Allergenen als Vorschlag;',
          'bei Zweifel, etwa bei „Saft“ oder „Coulis“, lässt Savour den Namen stehen. Welcher Saft? Das weißt nur du.'
        ]
      ],
      [
        'Du siehst immer zuerst, was Savour tun wird',
        'Bevor sich etwas ändert, siehst du die ganze Liste: welcher Name zu welchem Produkt kommt und welche Allergene das Produkt bekommt. Was du abwählst, lässt Savour stehen. Danach kannst du jedes Produkt noch anpassen. Savour ändert nie still etwas an deinen Rezepten: die Rezeptzeilen bleiben genau so, wie du sie geschrieben hast.\n\nWer nicht bei null anfangen will, übernimmt die Startliste: gut 200 Produkte, die in professionellen Rezepten am häufigsten vorkommen. Bei Fond, Gelatine und Schokolade stellt Savour zuerst eine Frage, denn das hängt von deiner Küche ab.'
      ],
      [
        'Die Zutatenliste, die Savour liest',
        'Die Vorschläge kommen aus einer Liste mit gut 3.500 Zutaten aus vier Quellen: der Zutatenliste von Open Food Facts, den Listen mit Gemüse, Kräutern, Pilzen, Saucen und Käse in der niederländischen Wikipedia, den niederländischen Produktnamen aus NEVO (der Nährwertdatenbank des RIVM) und Savours eigener Liste mit Küchenbegriffen. NEVO selbst enthält keine Allergene; die ergänzt Savour. Die Namen sind niederländisch, mit englischen Namen, wo die Quelle sie hat.\n\nDie ganze Liste ist öffentlich, mit den Allergenen, die Savour vorschlägt: [Zutatenliste von Savour ansehen](/de/zutatenliste-allergene). So kannst du selbst prüfen, woher ein Vorschlag kommt.'
      ],
      [
        'Warum Savour nie sagt, dass etwas allergenfrei ist',
        'Ein Allergen zu viel ist lästig, eins zu wenig ist gefährlich. Deshalb ist Savour streng. Solange ein Rezept Zeilen ohne geprüftes Produkt hat, steht dort „Noch nicht vollständig“, mit der Zahl der offenen Zutaten. Erst wenn alle Zeilen geprüft sind und keins der 14 Allergene darin ist, sagt Savour, dass das Rezept keins der 14 Allergene enthält. Bei den zusätzlichen Merkmalen meldet Savour nur, was drin ist, nie, was nicht drin ist.\n\nEin Vorschlag bleibt ein Vorschlag. Das Etikett deines Lieferanten geht immer vor.'
      ],
      [
        'Im Küchenteam und auf Papier',
        'Ein Küchenteam hat eine eigene Produktliste für das ganze Team. Der Eigentümer und die Sous-Chefs verwalten sie; ein Koch sieht die Allergene bei jedem Rezept und pro Zeile, woher sie kommen. Druckst du ein Rezept, stehen die Allergene auf dem Ausdruck, und ist das Rezept noch nicht vollständig geprüft, steht das auch darauf.'
      ],
      [
        'Wann kommt es?',
        'Die Allergenfunktion läuft jetzt in unserer Testversion, mit echten Rezeptbüchern aus der Küche. Wir stellen sie live, sobald die Verknüpfungen gut genug für den Stress eines Service sind. Allergene werden Teil von Savour Pro, ebenso in einem Küchenteam, dessen Eigentümer Pro hat.'
      ]
    ],
    outro:
      'Dieser Text beschreibt die Funktion, wie sie heute in der Testversion arbeitet. Ändert sich zum Start etwas, passen wir ihn hier an.'
  }
};

export const ALLERGEN_POST_ES = {
  'en/blog/allergens-in-savour': {
    slug: 'es/blog/alergenos-en-savour',
    title: 'Alérgenos en Savour: así funcionará la nueva función',
    desc: 'Alérgenos por receta, también a través de recetas base: cómo Savour enlaza ingredientes con productos, de dónde vienen las sugerencias y por qué Savour nunca dice que una receta está libre de alérgenos.',
    h1: 'Alérgenos en Savour: así funcionará la nueva función',
    lead: 'Un cliente pregunta en la mesa si la salsa lleva frutos secos. Con la nueva función de alérgenos, la respuesta está en la receta, aunque los frutos secos estén en una receta base. Así funciona, y así no funciona a propósito.',
    sections: [
      [
        'Del ingrediente al producto',
        'La base es una lista de productos: los ingredientes tal como los compra tu cocina, como mantequilla, harina o salsa de soja. Cada producto tiene sus alérgenos. Savour enlaza cada línea de la receta con un producto por su nombre. Así suma los alérgenos de cada receta.\n\nSi usas una receta base, como un fondo, una masa o una salsa, sus alérgenos también cuentan. Si la mostaza está en tu vinagreta, también ves mostaza en la ensalada que la usa.'
      ],
      [
        'Los 14 alérgenos, y lo que además preguntan los clientes',
        'Savour trabaja con los 14 alérgenos de las normas europeas: gluten, crustáceos, huevos, pescado, cacahuetes, soja, leche, frutos de cáscara, apio, mostaza, sésamo, sulfitos, altramuces y moluscos. Además puedes seguir características extra por las que preguntan los clientes, como lactosa, cerdo, alcohol, la familia de la cebolla, ajo, setas o FODMAP. Tú eliges si quieres solo los 14 alérgenos legales o también los extras.\n\nLa lactosa va aparte de la leche a propósito: la nata sin lactosa sigue teniendo proteína de leche.'
      ],
      [
        'Sin enlazar cientos de nombres a mano',
        'Un recetario con cientos de recetas tiene enseguida mil nombres de ingredientes distintos. Con «Enlazar todo automáticamente», Savour los resuelve de una vez:',
        [
          'una receta base con el mismo nombre;',
          'un producto que ya tienes, también con otra grafía o en plural;',
          'el producto principal: «col rizada sin tallo» es col rizada, «filete de bacalao sin piel» es bacalao;',
          'un producto nuevo de la lista de ingredientes de Savour, con los alérgenos como sugerencia;',
          'si hay dudas, como con «zumo» o «coulis», Savour deja el nombre como está. ¿Qué zumo? Solo tú lo sabes.'
        ]
      ],
      [
        'Siempre ves primero lo que va a hacer Savour',
        'Antes de que cambie nada, ves la lista entera: qué nombre va a qué producto y qué alérgenos recibe ese producto. Lo que desmarcas, Savour lo deja. Después puedes ajustar cada producto. Savour nunca cambia tus recetas en silencio: las líneas de la receta quedan exactamente como las escribiste.\n\nSi no quieres empezar de cero, usa la lista inicial: más de 200 productos que aparecen con más frecuencia en recetas profesionales. Con el fondo, la gelatina y el chocolate Savour pregunta primero, porque depende de lo que usa tu cocina.'
      ],
      [
        'La lista de ingredientes que lee Savour',
        'Las sugerencias salen de una lista de más de 3.500 ingredientes, de cuatro fuentes: la lista de ingredientes de Open Food Facts, las listas de verduras, hierbas, setas, salsas y quesos de la Wikipedia neerlandesa, los nombres de productos neerlandeses de NEVO (la base de datos de composición de alimentos del RIVM) y la lista propia de Savour con términos de cocina. NEVO no contiene alérgenos; esos los añade Savour. Los nombres están en neerlandés, con nombres en inglés cuando la fuente los tiene.\n\nLa lista completa es pública, con los alérgenos que sugiere Savour: [ver la lista de ingredientes de Savour](/es/lista-ingredientes-alergenos). Así puedes comprobar de dónde viene una sugerencia.'
      ],
      [
        'Por qué Savour nunca dice que algo no tiene alérgenos',
        'Un alérgeno de más es molesto; uno de menos es peligroso. Por eso Savour es estricto. Mientras una receta tenga líneas sin un producto comprobado, pone «Aún no completo», con el número de ingredientes pendientes. Solo cuando todas las líneas están comprobadas y no hay ninguno de los 14 alérgenos, Savour dice que la receta no contiene ninguno de los 14 alérgenos. Con las características extra, Savour solo indica lo que lleva, nunca lo que no lleva.\n\nUna sugerencia es solo una sugerencia. La etiqueta de tu proveedor siempre manda.'
      ],
      [
        'En el equipo de cocina y en papel',
        'Un equipo de cocina tiene una lista de productos para todo el equipo. El propietario y los sous-chefs la gestionan; un cocinero ve los alérgenos en cada receta y, por línea, de dónde vienen. Si imprimes una receta, los alérgenos salen en la impresión, y si la receta aún no está comprobada del todo, también lo pone.'
      ],
      [
        '¿Cuándo llega?',
        'La función de alérgenos funciona ahora en nuestra versión de prueba, con recetarios reales de cocina. La pondremos en marcha cuando los enlaces sean lo bastante buenos para el ritmo de un servicio. Los alérgenos formarán parte de Savour Pro, y también de un equipo de cocina cuyo propietario tenga Pro.'
      ]
    ],
    outro:
      'Este texto describe la función tal como funciona hoy en la versión de prueba. Si algo cambia en el lanzamiento, lo actualizaremos aquí.'
  }
};

export const ALLERGEN_POST_FR = {
  'en/blog/allergens-in-savour': {
    slug: 'fr/blog/allergenes-dans-savour',
    title: 'Les allergènes dans Savour : comment fonctionnera la nouvelle fonction',
    desc: 'Les allergènes par recette, y compris via les recettes de base : comment Savour relie les ingrédients aux produits, d’où viennent les suggestions et pourquoi Savour ne dit jamais qu’une recette est sans allergènes.',
    h1: 'Les allergènes dans Savour : comment fonctionnera la nouvelle fonction',
    lead: 'Un client demande à table s’il y a des fruits à coque dans la sauce. Avec la nouvelle fonction allergènes, la réponse est dans la recette, même quand les fruits à coque sont dans une recette de base. Voici comment ça marche, et ce que ça ne fait volontairement pas.',
    sections: [
      [
        'De l’ingrédient au produit',
        'La base est une liste de produits : les ingrédients tels que ta cuisine les achète, comme le beurre, la farine ou la sauce soja. Chaque produit a ses allergènes. Savour relie chaque ligne de recette à un produit par son nom. Ainsi, Savour additionne les allergènes de chaque recette.\n\nSi tu utilises une recette de base, comme un fond, une pâte ou une sauce, ses allergènes comptent aussi. Si la moutarde est dans ta vinaigrette, tu vois aussi la moutarde sur la salade qui l’utilise.'
      ],
      [
        'Les 14 allergènes, et ce que demandent aussi les clients',
        'Savour travaille avec les 14 allergènes des règles européennes : gluten, crustacés, œufs, poisson, arachides, soja, lait, fruits à coque, céleri, moutarde, sésame, sulfites, lupin et mollusques. Tu peux aussi suivre des caractéristiques en plus que demandent les clients, par exemple le lactose, le porc, l’alcool, la famille de l’oignon, l’ail, les champignons ou les FODMAP. Tu choisis si tu veux seulement les 14 allergènes légaux ou aussi ces extras.\n\nLe lactose est volontairement séparé du lait : une crème sans lactose contient toujours des protéines de lait.'
      ],
      [
        'Ne pas relier des centaines de noms à la main',
        'Un livre de recettes de plusieurs centaines de recettes compte vite mille noms d’ingrédients différents. Avec « Tout relier automatiquement », Savour les règle en une fois :',
        [
          'une recette de base du même nom ;',
          'un produit que tu as déjà, même avec une autre orthographe ou au pluriel ;',
          'le produit principal : « chou kale sans trognon » est du chou kale, « filet de cabillaud sans peau » est du cabillaud ;',
          'un nouveau produit de la liste d’ingrédients de Savour, avec les allergènes en suggestion ;',
          's’il y a un doute, comme pour « jus » ou « coulis », Savour laisse le nom tel quel. Quel jus ? Toi seul le sais.'
        ]
      ],
      [
        'Tu vois toujours d’abord ce que Savour va faire',
        'Avant tout changement, tu vois la liste complète : quel nom va vers quel produit et quels allergènes ce produit reçoit. Ce que tu décoches, Savour le laisse. Ensuite, tu peux encore modifier chaque produit. Savour ne modifie jamais tes recettes en silence : les lignes de recette restent exactement comme tu les as écrites.\n\nSi tu ne veux pas partir de zéro, reprends la liste de départ : plus de 200 produits parmi les plus fréquents dans les recettes professionnelles. Pour le fond, la gélatine et le chocolat, Savour pose d’abord une question, car cela dépend de ce qu’utilise ta cuisine.'
      ],
      [
        'La liste d’ingrédients que lit Savour',
        'Les suggestions viennent d’une liste de plus de 3 500 ingrédients, issue de quatre sources : la liste d’ingrédients d’Open Food Facts, les listes de légumes, herbes, champignons, sauces et fromages de la Wikipédia néerlandaise, les noms de produits néerlandais de NEVO (la base de composition des aliments du RIVM) et la liste propre de Savour avec des termes de cuisine. NEVO ne contient pas d’allergènes ; c’est Savour qui les ajoute. Les noms sont en néerlandais, avec les noms anglais quand la source les donne.\n\nLa liste complète est publique, avec les allergènes que propose Savour : [voir la liste d’ingrédients de Savour](/fr/liste-ingredients-allergenes). Tu peux ainsi vérifier d’où vient une suggestion.'
      ],
      [
        'Pourquoi Savour ne dit jamais qu’un plat est sans allergènes',
        'Un allergène de trop est gênant ; un de moins est dangereux. C’est pourquoi Savour est strict. Tant qu’une recette a des lignes sans produit vérifié, elle indique « Pas encore complet », avec le nombre d’ingrédients restants. Ce n’est que lorsque toutes les lignes sont vérifiées et qu’aucun des 14 allergènes n’y figure que Savour dit que la recette ne contient aucun des 14 allergènes. Pour les caractéristiques en plus, Savour indique seulement ce qu’il y a, jamais ce qu’il n’y a pas.\n\nUne suggestion reste une suggestion. L’étiquette de ton fournisseur passe toujours en premier.'
      ],
      [
        'Dans l’équipe de cuisine et sur papier',
        'Une équipe de cuisine a sa propre liste de produits pour toute l’équipe. Le propriétaire et les sous-chefs la gèrent ; un cuisinier voit les allergènes sur chaque recette et, ligne par ligne, d’où ils viennent. Quand tu imprimes une recette, les allergènes figurent sur l’impression, et si la recette n’est pas encore entièrement vérifiée, c’est indiqué aussi.'
      ],
      [
        'Quand est-ce que ça arrive ?',
        'La fonction allergènes tourne maintenant dans notre version de test, avec de vrais livres de recettes de cuisine. Nous la mettrons en ligne quand les liaisons seront assez bonnes pour le rythme d’un service. Le suivi des allergènes fera partie de Savour Pro, ainsi que d’une équipe de cuisine dont le propriétaire a Pro.'
      ]
    ],
    outro:
      'Ce texte décrit la fonction telle qu’elle marche aujourd’hui dans la version de test. Si quelque chose change au lancement, nous le mettrons à jour ici.'
  }
};

// De openbare lijstpagina, per taal.
export const LIST_PAGE = {
  nl: {
    title: 'Ingrediëntenlijst met allergenen | Savour',
    desc: 'De ingrediëntenlijst die Savour leest om allergenen voor te stellen: ruim 3.500 ingrediënten uit Open Food Facts, NEVO, Wikipedia en Savours eigen woordenlijst, met de 14 allergenen en extra kenmerken.',
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
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia' },
    sections: [
      [
        'Een voorstel, geen etiket',
        'De allergenen in deze lijst zijn een voorstel van Savour, op basis van de bronnen en de naam. Een merk kan iets anders bevatten dan je verwacht: het etiket van je leverancier gaat altijd voor. "Geen allergeen bekend" betekent niet dat een ingrediënt allergeenvrij is. In de app bevestig je zelf elk product, en zegt Savour nooit dat een recept vrij is van allergenen zolang er ingrediënten zonder gecontroleerd product zijn. Hoe dat werkt, lees je in [Allergenen in Savour](/blog/allergenen-in-savour).'
      ],
      [
        'Waar de lijst vandaan komt',
        'Drie bronnen samen: de ingrediëntentaxonomie van [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), de Nederlandse productnamen uit NEVO online versie 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), de lijsten van [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) met groenten, keukenkruiden, paddenstoelen, sauzen, dranken en kazen (namen onder CC BY-SA 4.0), en Savours eigen woordenlijst met keukentermen. NEVO bevat geen allergenen: die zijn een aanvulling van Savour, geen gegevens van het RIVM. Zie je een fout? [Laat het ons weten](/contact).'
      ]
    ]
  },
  en: {
    title: 'Ingredient list with allergens | Savour',
    desc: 'The ingredient list Savour reads to suggest allergens: over 3,500 ingredients from Open Food Facts, NEVO, Wikipedia and Savour’s own list, with the 14 allergens and extra characteristics.',
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
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia' },
    sections: [
      [
        'A suggestion, not a label',
        'The allergens in this list are suggested by Savour, based on the sources and the name. A brand can contain something you do not expect: your supplier’s label always comes first. "No allergen known" does not mean an ingredient is allergen-free. In the app you confirm every product yourself, and Savour never says a recipe is free of allergens while there are ingredients without a checked product. Read how it works in [Allergens in Savour](/en/blog/allergens-in-savour).'
      ],
      [
        'Where the list comes from',
        'Three sources together: the ingredient taxonomy of [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), the Dutch product names from NEVO online version 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), the [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) lists of vegetables, herbs, mushrooms, sauces, drinks and cheeses (names under CC BY-SA 4.0), and Savour’s own list of kitchen terms. NEVO contains no allergens: those are added by Savour, not data from RIVM. Spot a mistake? [Let us know](/en/contact).'
      ]
    ]
  },
  de: {
    title: 'Zutatenliste mit Allergenen | Savour',
    desc: 'Die Zutatenliste, die Savour liest, um Allergene vorzuschlagen: gut 3.500 Zutaten aus Open Food Facts, NEVO, Wikipedia und Savours eigener Liste, mit den 14 Allergenen und zusätzlichen Merkmalen.',
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
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia' },
    sections: [
      [
        'Ein Vorschlag, kein Etikett',
        'Die Allergene in dieser Liste sind ein Vorschlag von Savour, auf Basis der Quellen und des Namens. Eine Marke kann etwas anderes enthalten, als du erwartest: das Etikett deines Lieferanten geht immer vor. „Kein Allergen bekannt“ heißt nicht, dass eine Zutat allergenfrei ist. Wie es in der App funktioniert, liest du in [Allergene in Savour](/de/blog/allergene-in-savour).'
      ],
      [
        'Woher die Liste kommt',
        'Vier Quellen zusammen: die Zutatentaxonomie von [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), die niederländischen Produktnamen aus NEVO online Version 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), die Listen der [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) mit Gemüse, Kräutern, Pilzen, Saucen, Getränken und Käse (Namen unter CC BY-SA 4.0) und Savours eigene Liste mit Küchenbegriffen. NEVO enthält keine Allergene: die ergänzt Savour, es sind keine Daten des RIVM.'
      ]
    ]
  },
  es: {
    title: 'Lista de ingredientes con alérgenos | Savour',
    desc: 'La lista de ingredientes que lee Savour para sugerir alérgenos: más de 3.500 ingredientes de Open Food Facts, NEVO, Wikipedia y la lista propia de Savour, con los 14 alérgenos y características extra.',
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
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia' },
    sections: [
      [
        'Una sugerencia, no una etiqueta',
        'Los alérgenos de esta lista son una sugerencia de Savour, según las fuentes y el nombre. Una marca puede contener algo que no esperas: la etiqueta de tu proveedor siempre manda. «Ningún alérgeno conocido» no significa que un ingrediente no tenga alérgenos. Cómo funciona en la app lo explicamos en [Alérgenos en Savour](/es/blog/alergenos-en-savour).'
      ],
      [
        'De dónde viene la lista',
        'Cuatro fuentes juntas: la taxonomía de ingredientes de [Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), los nombres de productos neerlandeses de NEVO online versión 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), las listas de [Wikipedia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) de verduras, hierbas, setas, salsas, bebidas y quesos (nombres bajo CC BY-SA 4.0) y la lista propia de Savour con términos de cocina. NEVO no contiene alérgenos: los añade Savour, no son datos del RIVM.'
      ]
    ]
  },
  fr: {
    title: 'Liste d’ingrédients avec allergènes | Savour',
    desc: 'La liste d’ingrédients que lit Savour pour proposer des allergènes : plus de 3 500 ingrédients d’Open Food Facts, de NEVO, de Wikipédia et de la liste propre de Savour, avec les 14 allergènes et des caractéristiques en plus.',
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
    sourceNames: { o: 'Open Food Facts', s: 'Savour', n: 'NEVO', w: 'Wikipedia' },
    sections: [
      [
        'Une suggestion, pas une étiquette',
        'Les allergènes de cette liste sont proposés par Savour, d’après les sources et le nom. Une marque peut contenir autre chose que prévu : l’étiquette de ton fournisseur passe toujours en premier. « Aucun allergène connu » ne veut pas dire qu’un ingrédient est sans allergènes. Comment ça marche dans l’app : [Les allergènes dans Savour](/fr/blog/allergenes-dans-savour).'
      ],
      [
        'D’où vient la liste',
        'Quatre sources réunies : la taxonomie des ingrédients d’[Open Food Facts](https://world.openfoodfacts.org) (© Open Food Facts contributors, Open Database License 1.0), les noms de produits néerlandais de NEVO online version 2025/9.0, RIVM, Bilthoven ([nevo-online.rivm.nl](https://nevo-online.rivm.nl)), les listes de [Wikipédia](https://nl.wikipedia.org/wiki/Categorie:Lijsten_van_voedsel) de légumes, herbes, champignons, sauces, boissons et fromages (noms sous CC BY-SA 4.0), et la liste propre de Savour avec des termes de cuisine. NEVO ne contient pas d’allergènes : ils sont ajoutés par Savour, ce ne sont pas des données du RIVM.'
      ]
    ]
  }
};
