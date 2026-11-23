// Blog: een receptuurblad / Rezepturblatt als voorbeeld (2026-11-23), in vijf talen. Geschreven voor vooral de Duitse
// markt (zoekterm "Rezepturblatt Vorlage"). Het voorbeeld is een leeg sjabloon: geen verzonnen recept of hoeveelheden;
// daaronder hetzelfde demorecept als print, op de website in kookmodus en op de telefoon
// (assets/blog/receptuurblad-voorbeeld/print-web-mobiel-<taal>.jpg).
// Wat Savour print klopt met /recepten-printen en /handleiding-printen: naam, opbrengst, ingrediënten met vette
// hoeveelheden, bereiding in stappen, delen, omgerekende hoeveelheden, A4 of A5, printdatum, logo (Pro), allergenen
// optioneel, foto's en notities optioneel bij meerdere recepten, Word-bestanden met Pro.

const KEY = 'en/blog/recipe-card-template';

export const RECIPE_SHEET_POST = {
  id: 'rezepturblatt',
  date: '2026-11-23',
  photo: 'blogRezepturblatt',
  rich: true,
  nl: {
    slug: 'blog/receptuurblad-voorbeeld',
    title: 'Receptuurblad: voorbeeld en wat erop moet',
    desc: 'Een goed receptuurblad voor de professionele keuken: welke velden erop horen, een leeg voorbeeld om over te nemen, en hoe je het leesbaar en actueel houdt aan de muur en in de klapper.',
    h1: 'Receptuurblad: een voorbeeld en wat erop moet',
    lead: 'Een receptuurblad is het recept zoals je keuken het elke dag maakt: met vaste hoeveelheden, een vaste opbrengst en de punten waar het mis kan gaan. Dit hoort erop, met een leeg voorbeeld om over te nemen.',
    brief: [
      'Een receptuurblad heeft altijd een naam, een opbrengst, ingrediënten met hoeveelheid en eenheid, en de bereiding in stappen.',
      'Zet er de kritische punten bij (temperatuur, garing) en de allergenen, en een datum, zodat je ziet welke versie aan de muur hangt.',
      'Groot, rustig en in dezelfde vorm voor elk recept: dan leest iedereen het in één oogopslag.'
    ],
    sections: [
      [
        'Wat een receptuurblad is',
        'Een recept vertelt hoe je iets maakt. Een receptuurblad legt vast hoe jouw keuken het maakt: elke keer hetzelfde, door iedereen. Het is de vaste versie waar de hele brigade mee werkt, en de basis voor omrekenen, allergenen en later de kostprijs. Waarom dat zoveel uitmaakt, lees je in [Standaardrecepturen in de keuken](/blog/standaardrecepturen-in-de-keuken).'
      ],
      [
        'Wat erop hoort',
        'Dit zijn de velden van een goed receptuurblad, en waarom ze ertoe doen.',
        {
          head: ['Veld', 'Waarom'],
          rows: [
            ['Naam', 'Eén vaste naam, zodat iedereen hetzelfde recept bedoelt.'],
            ['Opbrengst', 'Bijvoorbeeld 2 liter of 40 porties. Zonder opbrengst kun je niet betrouwbaar omrekenen.'],
            ['Categorie of post', 'Waar het recept hoort: saus, garde-manger, patisserie.'],
            ['Ingrediënten', 'Elk met hoeveelheid en eenheid, in gram of milliliter waar het kan.'],
            ['Bereiding', 'In genummerde stappen, in de volgorde waarin je werkt.'],
            ['Kritische punten', 'Kerntemperatuur, garing, koelen, houdbaarheid.'],
            ['Allergenen', 'Welke van de 14 erin zitten, ook via basisrecepten.'],
            ['Foto', 'Hoe het eruit moet zien als het klaar is.'],
            ['Datum of versie', 'Zodat je ziet of de print aan de muur nog klopt.']
          ]
        }
      ],
      [
        'Een leeg voorbeeld',
        'Neem deze opbouw over in je eigen sjabloon. Houd de volgorde voor elk recept gelijk: dan zoekt niemand.',
        {
          example: [
            'Receptuurblad',
            [
              '**Naam:** …',
              '**Opbrengst:** … porties / … kg / … liter',
              '**Post of categorie:** …',
              '**Ingrediënten:** hoeveelheid · eenheid · ingrediënt',
              '**Bereiding:** 1. … 2. … 3. …',
              '**Kritische punten:** kerntemperatuur …, garing …, koelen …',
              '**Allergenen:** …',
              '**Datum of versie:** …'
            ]
          ]
        },
        { example: ["Ingevuld: Beurre blanc uit de Savour-demo", ["**Naam:** Beurre blanc", "**Opbrengst:** 4 personen", "**Post of categorie:** Sauzen", "**Ingrediënten:** 2 sjalotten, fijngesnipperd · 1 deciliter droge witte wijn · 5 eetlepels witte wijnazijn · 250 gram koude roomboter, in blokjes · zout naar smaak · witte peper naar smaak", "**Bereiding:** 1. Sjalot, wijn en azijn aan de kook brengen en inkoken tot er ongeveer 2 eetlepels vocht over is. 2. Vuur laag, boter blokje voor blokje erdoor kloppen tot de saus gebonden en glanzend is. 3. Niet meer laten koken, passeren en op smaak brengen met zout en peper. 4. Direct serveren of maximaal een uur au bain-marie warm houden.", "**Kritische punten:** kerntemperatuur niet van toepassing · na de boter niet meer laten koken, anders schift de saus · maximaal een uur au bain-marie (in Savour als notitie bij het recept)", "**Allergenen:** melk, sulfiet", "**Datum of versie:** de printdatum onderaan het blad"]] },
        { shot: '/assets/blog/receptuurblad-voorbeeld/print-web-mobiel-nl.jpg', alt: "Hetzelfde recept als print, op de website in kookmodus en op de telefoon", caption: "Eén recept, drie manieren: de print voor de klapper, de website in kookmodus met links de ingrediënten en rechts de bereiding in grote letters, en de telefoon aan de pass. Deel het met een link, ook met een collega zonder account, of in je keukenteam: dan ziet iedereen altijd de laatste versie. Klik om te vergroten.", wide: true, zoom: true }
      ],
      [
        'Hoeveelheden die iedereen hetzelfde leest',
        'Schrijf hoeveelheden in gram en milliliter, niet in "een scheut" of "naar smaak", behalve waar het echt om proeven gaat. Gebruik je een basisrecept zoals een fond of deeg, verwijs er dan naar in plaats van het opnieuw uit te schrijven. Bestaat een recept uit delen, zoals deeg en vulling, zet dan elk deel met zijn eigen ingrediënten en bereiding onder een eigen kopje.',
        { tip: ['Ingrediënten naast de bereiding', 'Zet de ingrediënten links en de bereiding rechts. Dan zie je tijdens het werken in één blik wat je bij welke stap nodig hebt.'] }
      ],
      [
        'Leesbaar in de keuken',
        'Een receptuurblad hangt aan de muur of zit in een klapper aan de pass. Gebruik grote letters en veel witruimte, zodat je het op een meter afstand leest. Print op A4 voor de klapper of op A5 voor een kleine map, en steek het in een hoes tegen vlekken.'
      ],
      [
        'Actueel houden',
        'Het gevaarlijkste receptuurblad is een oud receptuurblad. Zet er een datum of versie op, spreek af wanneer de klappers worden vernieuwd, bijvoorbeeld bij elke kaartwissel, en haal de oude print weg zodra de nieuwe er hangt. Twee versies naast elkaar leiden tot fouten.'
      ],
      [
        'Zo doe je het met Savour',
        'In Savour heeft elk recept dezelfde vorm: naam, opbrengst, ingrediënten en bereiding, en waar nodig delen. Kies Printen en je krijgt een rustig receptuurblad met vette hoeveelheden en de bereiding in stappen. Heb je omgerekend, dan print je precies die hoeveelheden. Je kiest A4 of A5, of de allergenen erop komen, en onderaan staat de printdatum. Met [Savour Pro](/savour-pro) staat het logo van je restaurant bovenaan. Meer op [Recepten printen](/recepten-printen), of [bekijk de demo](/?demo=1).'
      ],
      [
        'Veelgestelde vragen',
        'Kort antwoord op wat koks het vaakst vragen.',
        {
          faq: [
            ['Is een receptuurblad hetzelfde als een technische fiche?', 'Bijna. Een technische fiche heeft vaak ook de kostprijs per portie. Het receptuurblad hierboven is de basis; de kostprijs zet je erbij zodra de hoeveelheden kloppen.'],
            ['Moeten de allergenen op het receptuurblad?', 'Het is verstandig. De allergenen kloppen alleen als het recept klopt, dus horen ze bij het recept. Lees ook [Allergenen in de horeca: de regels](/blog/allergenen-regels-horeca).'],
            ['Hoe vaak moet ik receptuurbladen vernieuwen?', 'Elke keer dat het recept verandert, en spreek een vast moment af om alles na te lopen, bijvoorbeeld bij elke kaartwissel.']
          ]
        }
      ]
    ],
    outro: 'Het voorbeeld is een leeg sjabloon: vul het met je eigen recepten, zoals jouw keuken ze maakt.'
  },
  en: {
    slug: KEY,
    title: 'Recipe card template: what a standard recipe sheet needs',
    desc: 'A good recipe card for the professional kitchen: which fields belong on it, a blank template to copy, and how to keep it readable and up to date on the wall and in the folder.',
    h1: 'Recipe card template: what a standard recipe sheet needs',
    lead: 'A recipe card is the recipe as your kitchen makes it every day: fixed quantities, a fixed yield and the points where it can go wrong. This is what belongs on it, with a blank template to copy.',
    brief: [
      'A recipe card always has a name, a yield, ingredients with quantity and unit, and the method in steps.',
      'Add the critical points (temperature, cooking) and the allergens, and a date, so you can see which version is on the wall.',
      'Large, calm and in the same layout for every recipe: then everyone reads it at a glance.'
    ],
    sections: [
      [
        'What a recipe card is',
        'A recipe tells you how to make something. A recipe card records how your kitchen makes it: the same every time, by everyone. It is the fixed version the whole brigade works from, and the basis for scaling, allergens and later the cost price. Why that matters so much: [Standardised recipes](/en/blog/standardised-recipes).'
      ],
      [
        'What belongs on it',
        'These are the fields of a good recipe card, and why they matter.',
        {
          head: ['Field', 'Why'],
          rows: [
            ['Name', 'One fixed name, so everyone means the same recipe.'],
            ['Yield', 'For example 2 litres or 40 portions. Without a yield you cannot scale reliably.'],
            ['Category or section', 'Where the recipe belongs: sauce, garde manger, pastry.'],
            ['Ingredients', 'Each with quantity and unit, in grams or millilitres where you can.'],
            ['Method', 'In numbered steps, in the order you work.'],
            ['Critical points', 'Core temperature, cooking, chilling, shelf life.'],
            ['Allergens', 'Which of the 14 it contains, including through base recipes.'],
            ['Photo', 'What it should look like when it is done.'],
            ['Date or version', 'So you can see whether the print on the wall is still right.']
          ]
        }
      ],
      [
        'A blank template',
        'Copy this layout into your own template. Keep the order the same for every recipe: then nobody has to search.',
        {
          example: [
            'Recipe card',
            [
              '**Name:** …',
              '**Yield:** … portions / … kg / … litres',
              '**Section or category:** …',
              '**Ingredients:** quantity · unit · ingredient',
              '**Method:** 1. … 2. … 3. …',
              '**Critical points:** core temperature …, cooking …, chilling …',
              '**Allergens:** …',
              '**Date or version:** …'
            ]
          ]
        },
        { example: ["Filled in: Beurre blanc from the Savour demo", ["**Name:** Beurre blanc", "**Yield:** 4 portions", "**Section or category:** Sauces", "**Ingredients:** 2 shallots, finely chopped · 1 decilitre dry white wine · 5 tablespoons white wine vinegar · 250 grams cold butter, diced · salt to taste · white pepper to taste", "**Method:** 1. Bring the shallot, wine and vinegar to the boil and reduce until about 2 tablespoons of liquid remain. 2. Turn the heat down low and whisk in the butter cube by cube until the sauce is bound and glossy. 3. Do not let it boil again; pass through a fine sieve and season with salt and pepper. 4. Serve straight away or keep warm in a bain-marie for up to an hour.", "**Critical points:** core temperature not applicable · do not let it boil once the butter is in, or it will split · up to an hour in a bain-marie (in Savour as a note on the recipe)", "**Allergens:** milk, sulphites", "**Date or version:** the print date at the bottom of the sheet"]] },
        { shot: '/assets/blog/receptuurblad-voorbeeld/print-web-mobiel-en.jpg', alt: "The same recipe as a print, on the website in cook mode and on a phone", caption: "One recipe, three ways: the print for the folder, the website in cook mode with the ingredients on the left and the method on the right in large type, and the phone at the pass. Share it with a link, even with a colleague without an account, or in your kitchen team: then everyone always sees the latest version. Click to enlarge.", wide: true, zoom: true }
      ],
      [
        'Quantities everyone reads the same way',
        'Write quantities in grams and millilitres, not “a splash” or “to taste”, except where it is really about tasting. If you use a base recipe such as a stock or a dough, refer to it instead of writing it out again. If a recipe has parts, such as dough and filling, give each part its own ingredients and method under its own heading.',
        { tip: ['Ingredients next to the method', 'Put the ingredients on the left and the method on the right. Then you see at a glance what you need for each step while you work.'] }
      ],
      [
        'Readable in the kitchen',
        'A recipe card hangs on the wall or sits in a folder at the pass. Use large type and plenty of white space, so you can read it from a metre away. Print on A4 for the folder or A5 for a small binder, and put it in a sleeve against stains.'
      ],
      [
        'Keeping it up to date',
        'The most dangerous recipe card is an old one. Put a date or version on it, agree when the folders are renewed, for example at every menu change, and take the old print down as soon as the new one is up. Two versions side by side lead to mistakes.'
      ],
      [
        'How to do it with Savour',
        'In Savour every recipe has the same layout: name, yield, ingredients and method, and parts where needed. Choose Print and you get a calm recipe card with bold quantities and the method in steps. If you have scaled the recipe, you print exactly those quantities. You choose A4 or A5 and whether the allergens go on it, and the print date is at the bottom. With [Savour Pro](/en/pro) your restaurant’s logo is at the top. More on [Print recipes](/en/print-recipes), or [open the demo](/en?demo=1).'
      ],
      [
        'Frequently asked questions',
        'Short answers to what chefs ask most.',
        {
          faq: [
            ['Is a recipe card the same as a spec sheet?', 'Almost. A spec sheet often also has the cost per portion. The recipe card above is the basis; you add the cost once the quantities are right.'],
            ['Should the allergens be on the recipe card?', 'It is wise. The allergens are only right if the recipe is right, so they belong with the recipe. Read also [Allergen information in restaurants: the rules](/en/blog/allergen-information-rules-restaurants).'],
            ['How often should I renew recipe cards?', 'Every time the recipe changes, and agree a fixed moment to go through everything, for example at every menu change.']
          ]
        }
      ]
    ],
    outro: 'The template is blank on purpose: fill it with your own recipes, the way your kitchen makes them.'
  }
};

export const RECIPE_SHEET_POST_DE = {
  [KEY]: {
    slug: 'de/blog/rezepturblatt-vorlage',
    title: 'Rezepturblatt Vorlage: was auf eine gute Rezeptur gehört',
    desc: 'Ein gutes Rezepturblatt für die Profiküche: welche Angaben auf eine Rezeptur gehören, eine leere Vorlage zum Übernehmen, und wie Rezepturen an der Wand und im Ordner lesbar und aktuell bleiben.',
    h1: 'Rezepturblatt Vorlage: was auf eine gute Rezeptur gehört',
    lead: 'Ein Rezepturblatt ist das Rezept so, wie deine Küche es jeden Tag macht: mit festen Mengen, fester Ausbeute und den Punkten, an denen es schiefgehen kann. Das gehört auf jede Rezeptur, mit einer leeren Vorlage zum Übernehmen.',
    brief: [
      'Ein Rezepturblatt hat immer einen Namen, eine Ausbeute, Zutaten mit Menge und Einheit und die Zubereitung in Schritten.',
      'Ergänze kritische Punkte (Temperatur, Garung), die Allergene und ein Datum, damit du siehst, welche Version an der Wand hängt.',
      'Groß, ruhig und für jede Rezeptur gleich aufgebaut: Dann liest jeder sie auf einen Blick.'
    ],
    sections: [
      [
        'Was ein Rezepturblatt ist',
        'Ein Rezept beschreibt, wie man etwas zubereitet. Eine Rezeptur legt fest, wie deine Küche es macht: jedes Mal gleich, von jedem. Das Rezepturblatt ist die feste Version, nach der die ganze Brigade arbeitet, und die Grundlage für Hochrechnen, Allergene und später die Kalkulation. Warum das so viel ausmacht, liest du in [Standardrezepturen: warum jede Küche sie braucht](/de/blog/standardrezepturen-gastronomie); wie du alle Rezepturen an einem Ort verwaltest, in [Rezepturverwaltung](/de/rezepturverwaltung).'
      ],
      [
        'Was auf eine Rezeptur gehört',
        'Das sind die Angaben eines guten Rezepturblatts, und warum sie wichtig sind.',
        {
          head: ['Angabe', 'Warum'],
          rows: [
            ['Name', 'Ein fester Name, damit alle dieselbe Rezeptur meinen.'],
            ['Ausbeute', 'Zum Beispiel 2 Liter oder 40 Portionen. Ohne Ausbeute kein zuverlässiges Hochrechnen.'],
            ['Kategorie oder Posten', 'Wohin die Rezeptur gehört: Sauce, Garde-Manger, Patisserie.'],
            ['Zutaten', 'Jede mit Menge und Einheit, wo möglich in Gramm oder Milliliter.'],
            ['Zubereitung', 'In nummerierten Schritten, in der Reihenfolge, in der du arbeitest.'],
            ['Kritische Punkte', 'Kerntemperatur, Garung, Abkühlen, Haltbarkeit.'],
            ['Allergene', 'Welche der 14 enthalten sind, auch über Grundrezepte.'],
            ['Foto', 'Wie es fertig aussehen soll.'],
            ['Datum oder Version', 'Damit du siehst, ob der Ausdruck an der Wand noch stimmt.']
          ]
        }
      ],
      [
        'Eine leere Vorlage',
        'Übernimm diesen Aufbau in deine eigene Vorlage. Halte die Reihenfolge bei jeder Rezeptur gleich: Dann muss niemand suchen.',
        {
          example: [
            'Rezepturblatt',
            [
              '**Name:** …',
              '**Ausbeute:** … Portionen / … kg / … Liter',
              '**Posten oder Kategorie:** …',
              '**Zutaten:** Menge · Einheit · Zutat',
              '**Zubereitung:** 1. … 2. … 3. …',
              '**Kritische Punkte:** Kerntemperatur …, Garung …, Abkühlen …',
              '**Allergene:** …',
              '**Datum oder Version:** …'
            ]
          ]
        },
        { example: ["Ausgefüllt: Beurre blanc aus der Savour-Demo", ["**Name:** Beurre blanc", "**Ausbeute:** 4 Personen", "**Posten oder Kategorie:** Saucen", "**Zutaten:** 2 Schalotten, fein gewürfelt · 1 Deziliter trockener Weißwein · 5 Esslöffel Weißweinessig · 250 Gramm kalte Butter, in Würfeln · Salz nach Geschmack · weißer Pfeffer nach Geschmack", "**Zubereitung:** 1. Schalotte, Wein und Essig aufkochen und einkochen, bis etwa 2 Esslöffel Flüssigkeit übrig sind. 2. Hitze reduzieren, die Butter Würfel für Würfel einrühren, bis die Sauce gebunden und glänzend ist. 3. Nicht mehr kochen lassen, passieren und mit Salz und Pfeffer abschmecken. 4. Sofort servieren oder höchstens eine Stunde im Wasserbad warm halten.", "**Kritische Punkte:** Kerntemperatur nicht zutreffend · nach der Butter nicht mehr kochen lassen, sonst trennt sich die Sauce · höchstens eine Stunde im Wasserbad (in Savour als Notiz zur Rezeptur)", "**Allergene:** Milch, Sulfite", "**Datum oder Version:** das Druckdatum unten auf dem Blatt"]] },
        { shot: '/assets/blog/receptuurblad-voorbeeld/print-web-mobiel-de.jpg', alt: "Dieselbe Rezeptur als Ausdruck, auf der Website im Kochmodus und auf dem Handy", caption: "Eine Rezeptur, drei Wege: der Ausdruck für den Ordner, die Website im Kochmodus mit links den Zutaten und rechts der Zubereitung in großer Schrift, und das Handy am Pass. Teile sie per Link, auch mit Kollegen ohne Konto, oder im Küchenteam: Dann sieht jeder immer die neueste Version. Zum Vergrößern klicken.", wide: true, zoom: true }
      ],
      [
        'Mengen, die jeder gleich liest',
        'Schreib Mengen in Gramm und Milliliter, nicht „ein Schuss“ oder „nach Geschmack“, außer wo es wirklich ums Abschmecken geht. Verwendest du ein Grundrezept wie einen Fond oder einen Teig, verweise darauf, statt es neu aufzuschreiben. Besteht eine Rezeptur aus Teilen, etwa Teig und Füllung, bekommt jeder Teil eine eigene Überschrift mit eigenen Zutaten und eigener Zubereitung.',
        { tip: ['Zutaten neben der Zubereitung', 'Setz die Zutaten links und die Zubereitung rechts. Dann siehst du bei der Arbeit auf einen Blick, was du für welchen Schritt brauchst.'] }
      ],
      [
        'Lesbar in der Küche',
        'Ein Rezepturblatt hängt an der Wand oder steckt im Ordner am Pass. Nimm große Schrift und viel Weißraum, damit es auf einen Meter Abstand lesbar ist. Druck auf A4 für den Ordner oder auf A5 für eine kleine Mappe, und steck es gegen Flecken in eine Hülle.'
      ],
      [
        'Aktuell halten',
        'Das gefährlichste Rezepturblatt ist ein altes. Schreib ein Datum oder eine Version darauf, vereinbare, wann die Ordner erneuert werden, zum Beispiel bei jedem Kartenwechsel, und nimm den alten Ausdruck ab, sobald der neue hängt. Zwei Versionen nebeneinander führen zu Fehlern.'
      ],
      [
        'So geht es mit Savour',
        'In Savour hat jede Rezeptur denselben Aufbau: Name, Ausbeute, Zutaten und Zubereitung, und wo nötig Teile. Wähle Drucken und du bekommst ein ruhiges Rezepturblatt mit fetten Mengen und der Zubereitung in Schritten. Hast du hochgerechnet, druckst du genau diese Mengen. Du wählst A4 oder A5 und ob die Allergene daraufkommen, und unten steht das Druckdatum. Mit [Savour Pro](/de/preise) steht das Logo deines Betriebs oben. Mehr unter [Rezepte drucken](/de/rezepte-drucken), oder [sieh dir die Demo an](/de?demo=1).'
      ],
      [
        'Häufige Fragen',
        'Kurze Antworten auf das, was Köche am häufigsten fragen.',
        {
          faq: [
            ['Ist ein Rezepturblatt dasselbe wie eine Kalkulationsrezeptur?', 'Fast. Eine Kalkulationsrezeptur enthält zusätzlich die Kosten pro Portion. Das Rezepturblatt oben ist die Grundlage; die Kosten kommen dazu, sobald die Mengen stimmen.'],
            ['Gehören die Allergene auf das Rezepturblatt?', 'Das ist sinnvoll. Die Allergene stimmen nur, wenn die Rezeptur stimmt, also gehören sie zur Rezeptur. Lies auch [Allergenkennzeichnung in der Gastronomie](/de/blog/allergenkennzeichnung-gastronomie).'],
            ['Wie oft sollte ich Rezepturblätter erneuern?', 'Jedes Mal, wenn sich die Rezeptur ändert, und zu einem festen Zeitpunkt für alle, zum Beispiel bei jedem Kartenwechsel.']
          ]
        }
      ]
    ],
    outro: 'Die Vorlage ist bewusst leer: Füll sie mit deinen eigenen Rezepturen, so wie deine Küche sie macht.'
  }
};

export const RECIPE_SHEET_POST_ES = {
  [KEY]: {
    slug: 'es/blog/plantilla-hoja-de-receta',
    title: 'Plantilla de hoja de receta: qué debe llevar',
    desc: 'Una buena hoja de receta para la cocina profesional: qué campos debe llevar, una plantilla en blanco para copiar y cómo mantenerla legible y al día en la pared y en el archivador.',
    h1: 'Plantilla de hoja de receta: qué debe llevar',
    lead: 'Una hoja de receta es la receta tal como tu cocina la hace cada día: cantidades fijas, un rendimiento fijo y los puntos donde puede salir mal. Esto es lo que debe llevar, con una plantilla en blanco para copiar.',
    brief: [
      'Una hoja de receta lleva siempre un nombre, un rendimiento, ingredientes con cantidad y unidad, y la elaboración en pasos.',
      'Añade los puntos críticos (temperatura, cocción), los alérgenos y una fecha, para saber qué versión está en la pared.',
      'Grande, clara y con el mismo formato para cada receta: así todos la leen de un vistazo.'
    ],
    sections: [
      [
        'Qué es una hoja de receta',
        'Una receta explica cómo se hace algo. Una hoja de receta fija cómo lo hace tu cocina: siempre igual, lo haga quien lo haga. Es la versión fija con la que trabaja toda la brigada, y la base para escalar, para los alérgenos y más adelante para el coste. Por qué importa tanto: [Fichas técnicas de cocina](/es/blog/fichas-tecnicas-de-cocina).'
      ],
      [
        'Qué debe llevar',
        'Estos son los campos de una buena hoja de receta, y por qué importan.',
        {
          head: ['Campo', 'Por qué'],
          rows: [
            ['Nombre', 'Un nombre fijo, para que todos hablen de la misma receta.'],
            ['Rendimiento', 'Por ejemplo 2 litros o 40 raciones. Sin rendimiento no se puede escalar con fiabilidad.'],
            ['Categoría o partida', 'Dónde va la receta: salsas, cuarto frío, pastelería.'],
            ['Ingredientes', 'Cada uno con cantidad y unidad, en gramos o mililitros cuando se pueda.'],
            ['Elaboración', 'En pasos numerados, en el orden en que trabajas.'],
            ['Puntos críticos', 'Temperatura en el centro, cocción, enfriado, vida útil.'],
            ['Alérgenos', 'Cuáles de los 14 lleva, también a través de las elaboraciones base.'],
            ['Foto', 'Cómo debe quedar una vez terminado.'],
            ['Fecha o versión', 'Para saber si la copia de la pared sigue siendo válida.']
          ]
        }
      ],
      [
        'Una plantilla en blanco',
        'Copia esta estructura en tu propia plantilla. Mantén el mismo orden en cada receta: así nadie tiene que buscar.',
        {
          example: [
            'Hoja de receta',
            [
              '**Nombre:** …',
              '**Rendimiento:** … raciones / … kg / … litros',
              '**Partida o categoría:** …',
              '**Ingredientes:** cantidad · unidad · ingrediente',
              '**Elaboración:** 1. … 2. … 3. …',
              '**Puntos críticos:** temperatura en el centro …, cocción …, enfriado …',
              '**Alérgenos:** …',
              '**Fecha o versión:** …'
            ]
          ]
        },
        { example: ["Rellenada: Beurre blanc de la demo de Savour", ["**Nombre:** Beurre blanc", "**Rendimiento:** 4 personas", "**Partida o categoría:** Salsas", "**Ingredientes:** 2 chalotas, picadas finas · 1 decilitro de vino blanco seco · 5 cucharadas de vinagre de vino blanco · 250 gramos de mantequilla fría, en dados · sal al gusto · pimienta blanca al gusto", "**Elaboración:** 1. Lleva a ebullición la chalota, el vino y el vinagre y reduce hasta que queden unas 2 cucharadas de líquido. 2. Baja el fuego y monta la mantequilla dado a dado hasta que la salsa esté ligada y brillante. 3. No dejes que vuelva a hervir; cuela y sazona con sal y pimienta. 4. Sirve enseguida o mantén al baño maría como máximo una hora.", "**Puntos críticos:** temperatura en el centro no aplicable · una vez montada la mantequilla, no dejes que hierva o se cortará · como máximo una hora al baño maría (en Savour como nota de la receta)", "**Alérgenos:** leche, sulfitos", "**Fecha o versión:** la fecha de impresión al pie de la hoja"]] },
        { shot: '/assets/blog/receptuurblad-voorbeeld/print-web-mobiel-es.jpg', alt: "La misma receta impresa, en la web en modo cocina y en el móvil", caption: "Una receta, tres formas: la copia impresa para el archivador, la web en modo cocina con los ingredientes a la izquierda y la elaboración a la derecha en letra grande, y el móvil en el pase. Compártela con un enlace, también con un compañero sin cuenta, o en tu equipo de cocina: así todos ven siempre la última versión. Haz clic para ampliar.", wide: true, zoom: true }
      ],
      [
        'Cantidades que todos leen igual',
        'Escribe las cantidades en gramos y mililitros, no “un chorrito” o “al gusto”, salvo donde de verdad se trata de probar. Si usas una elaboración base como un fondo o una masa, haz referencia a ella en lugar de volver a escribirla. Si la receta tiene partes, como masa y relleno, cada parte lleva su propio título con sus ingredientes y su elaboración.',
        { tip: ['Ingredientes junto a la elaboración', 'Pon los ingredientes a la izquierda y la elaboración a la derecha. Así ves de un vistazo qué necesitas en cada paso mientras trabajas.'] }
      ],
      [
        'Legible en la cocina',
        'Una hoja de receta cuelga en la pared o va en un archivador en el pase. Usa letra grande y mucho espacio en blanco, para leerla a un metro. Imprime en A4 para el archivador o en A5 para una carpeta pequeña, y métela en una funda contra las manchas.'
      ],
      [
        'Mantenerla al día',
        'La hoja de receta más peligrosa es una antigua. Ponle una fecha o versión, acuerda cuándo se renuevan los archivadores, por ejemplo en cada cambio de carta, y retira la copia antigua en cuanto cuelgue la nueva. Dos versiones juntas llevan a errores.'
      ],
      [
        'Cómo hacerlo con Savour',
        'En Savour cada receta tiene el mismo formato: nombre, rendimiento, ingredientes y elaboración, y partes cuando hace falta. Elige Imprimir y obtienes una hoja de receta clara, con las cantidades en negrita y la elaboración en pasos. Si has escalado la receta, imprimes exactamente esas cantidades. Eliges A4 o A5 y si los alérgenos van en la hoja, y abajo aparece la fecha de impresión. Con [Savour Pro](/es/precios) el logo de tu restaurante va arriba. Más en [Imprimir recetas](/es/imprimir-recetas), o [abre la demo](/es?demo=1).'
      ],
      [
        'Preguntas frecuentes',
        'Respuestas cortas a lo que más preguntan los cocineros.',
        {
          faq: [
            ['¿Una hoja de receta es lo mismo que una ficha técnica?', 'Casi. Una ficha técnica suele incluir también el coste por ración. La hoja de receta de arriba es la base; el coste se añade cuando las cantidades son correctas.'],
            ['¿Deben ir los alérgenos en la hoja de receta?', 'Es recomendable. Los alérgenos solo son correctos si la receta lo es, así que van con la receta. Lee también [Alérgenos en restauración: la normativa](/es/blog/alergenos-restauracion-normativa).'],
            ['¿Cada cuánto renuevo las hojas de receta?', 'Cada vez que cambia la receta, y acuerda un momento fijo para revisarlo todo, por ejemplo en cada cambio de carta.']
          ]
        }
      ]
    ],
    outro: 'La plantilla está en blanco a propósito: llénala con tus propias recetas, tal como las hace tu cocina.'
  }
};

export const RECIPE_SHEET_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/modele-fiche-recette',
    title: 'Modèle de fiche recette : ce qu’elle doit contenir',
    desc: 'Une bonne fiche recette pour la cuisine professionnelle : les champs à y mettre, un modèle vierge à reprendre, et comment la garder lisible et à jour au mur et dans le classeur.',
    h1: 'Modèle de fiche recette : ce qu’elle doit contenir',
    lead: 'Une fiche recette, c’est la recette telle que ta cuisine la fait chaque jour : des quantités fixes, un rendement fixe et les points où ça peut déraper. Voici ce qu’elle doit contenir, avec un modèle vierge à reprendre.',
    brief: [
      'Une fiche recette a toujours un nom, un rendement, les ingrédients avec quantité et unité, et la préparation en étapes.',
      'Ajoute les points critiques (température, cuisson), les allergènes et une date, pour savoir quelle version est au mur.',
      'Grande, claire et avec la même mise en page pour chaque recette : tout le monde la lit d’un coup d’œil.'
    ],
    sections: [
      [
        'Ce qu’est une fiche recette',
        'Une recette explique comment faire quelque chose. Une fiche recette fixe comment ta cuisine le fait : à chaque fois pareil, quel que soit le cuisinier. C’est la version de référence de toute la brigade, et la base pour adapter les quantités, pour les allergènes et plus tard pour le coût. Pourquoi c’est si important : [Fiches techniques en cuisine](/fr/blog/fiches-techniques-cuisine).'
      ],
      [
        'Ce qu’elle doit contenir',
        'Voici les champs d’une bonne fiche recette, et pourquoi ils comptent.',
        {
          head: ['Champ', 'Pourquoi'],
          rows: [
            ['Nom', 'Un nom fixe, pour que tout le monde parle de la même recette.'],
            ['Rendement', 'Par exemple 2 litres ou 40 portions. Sans rendement, impossible d’adapter les quantités de façon fiable.'],
            ['Catégorie ou poste', 'Où va la recette : sauces, garde-manger, pâtisserie.'],
            ['Ingrédients', 'Chacun avec quantité et unité, en grammes ou millilitres quand c’est possible.'],
            ['Préparation', 'En étapes numérotées, dans l’ordre où tu travailles.'],
            ['Points critiques', 'Température à cœur, cuisson, refroidissement, conservation.'],
            ['Allergènes', 'Lesquels des 14 elle contient, y compris via les préparations de base.'],
            ['Photo', 'À quoi ça doit ressembler une fois terminé.'],
            ['Date ou version', 'Pour savoir si la fiche au mur est encore la bonne.']
          ]
        }
      ],
      [
        'Un modèle vierge',
        'Reprends cette structure dans ton propre modèle. Garde le même ordre pour chaque recette : personne n’a à chercher.',
        {
          example: [
            'Fiche recette',
            [
              '**Nom :** …',
              '**Rendement :** … portions / … kg / … litres',
              '**Poste ou catégorie :** …',
              '**Ingrédients :** quantité · unité · ingrédient',
              '**Préparation :** 1. … 2. … 3. …',
              '**Points critiques :** température à cœur …, cuisson …, refroidissement …',
              '**Allergènes :** …',
              '**Date ou version :** …'
            ]
          ]
        },
        { example: ["Remplie : beurre blanc de la démo Savour", ["**Nom :** Beurre blanc", "**Rendement :** 4 personnes", "**Poste ou catégorie :** Sauces", "**Ingrédients :** 2 échalotes, finement ciselées · 1 décilitre de vin blanc sec · 5 cuillères à soupe de vinaigre de vin blanc · 250 grammes de beurre froid, en dés · sel à volonté · poivre blanc à volonté", "**Préparation :** 1. Porter à ébullition l’échalote, le vin et le vinaigre et faire réduire jusqu’à environ 2 cuillères à soupe de liquide. 2. Baisser le feu et monter le beurre dé par dé au fouet, jusqu’à ce que la sauce soit liée et brillante. 3. Ne plus faire bouillir ; passer au chinois fin et assaisonner. 4. Servir aussitôt ou garder au bain-marie une heure au maximum.", "**Points critiques :** température à cœur sans objet · une fois le beurre monté, ne plus faire bouillir, sinon la sauce tranche · une heure au maximum au bain-marie (dans Savour en note sur la recette)", "**Allergènes :** lait, sulfites", "**Date ou version :** la date d’impression en bas de la fiche"]] },
        { shot: '/assets/blog/receptuurblad-voorbeeld/print-web-mobiel-fr.jpg', alt: "La même recette imprimée, sur le site en mode cuisine et sur le téléphone", caption: "Une recette, trois façons : la fiche imprimée pour le classeur, le site en mode cuisine avec les ingrédients à gauche et la préparation à droite en grands caractères, et le téléphone au passe. Partage-la par un lien, même avec un collègue sans compte, ou dans ton équipe de cuisine : tout le monde voit toujours la dernière version. Clique pour agrandir.", wide: true, zoom: true }
      ],
      [
        'Des quantités que tout le monde lit pareil',
        'Écris les quantités en grammes et millilitres, pas « un trait » ou « selon le goût », sauf quand il s’agit vraiment de goûter. Si tu utilises une préparation de base comme un fond ou une pâte, renvoie vers elle au lieu de la réécrire. Si la recette a plusieurs parties, comme une pâte et une garniture, chaque partie a son propre titre avec ses ingrédients et sa préparation.',
        { tip: ['Les ingrédients à côté de la préparation', 'Mets les ingrédients à gauche et la préparation à droite. Tu vois d’un coup d’œil ce qu’il te faut à chaque étape pendant que tu travailles.'] }
      ],
      [
        'Lisible en cuisine',
        'Une fiche recette est accrochée au mur ou rangée dans un classeur au passe. Utilise de gros caractères et beaucoup d’espace, pour la lire à un mètre. Imprime en A4 pour le classeur ou en A5 pour un petit carnet, et glisse-la dans une pochette contre les taches.'
      ],
      [
        'La garder à jour',
        'La fiche recette la plus dangereuse est une vieille fiche. Mets-y une date ou une version, décide quand les classeurs sont renouvelés, par exemple à chaque changement de carte, et retire l’ancienne dès que la nouvelle est accrochée. Deux versions côte à côte mènent à des erreurs.'
      ],
      [
        'Avec Savour',
        'Dans Savour, chaque recette a la même mise en page : nom, rendement, ingrédients et préparation, et des parties si besoin. Choisis Imprimer et tu obtiens une fiche recette claire, avec les quantités en gras et la préparation en étapes. Si tu as adapté les quantités, tu imprimes exactement celles-là. Tu choisis A4 ou A5 et si les allergènes y figurent, et la date d’impression est en bas. Avec [Savour Pro](/fr/tarifs), le logo de ton restaurant est en haut. Plus d’infos : [Imprimer des recettes](/fr/imprimer-recettes), ou [ouvre la démo](/fr?demo=1).'
      ],
      [
        'Questions fréquentes',
        'Des réponses courtes à ce que les cuisiniers demandent le plus.',
        {
          faq: [
            ['Une fiche recette, c’est une fiche technique ?', 'Presque. Une fiche technique comprend souvent aussi le coût par portion. La fiche recette ci-dessus en est la base ; le coût s’ajoute quand les quantités sont justes.'],
            ['Les allergènes doivent-ils figurer sur la fiche ?', 'C’est conseillé. Les allergènes ne sont justes que si la recette l’est, ils vont donc avec la recette. Lis aussi [Allergènes au restaurant : les obligations](/fr/blog/allergenes-restaurant-obligations).'],
            ['À quelle fréquence renouveler les fiches ?', 'À chaque changement de recette, et fixe un moment pour tout relire, par exemple à chaque changement de carte.']
          ]
        }
      ]
    ],
    outro: 'Le modèle est vierge exprès : remplis-le avec tes propres recettes, comme ta cuisine les fait.'
  }
};
