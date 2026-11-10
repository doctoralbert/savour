// Blog: AI in de horeca (2026-11-09), in vijf talen. Hoe een keuken AI stap voor stap invoert, wat AI wel en niet
// moet doen, hoe Savour AI nu inzet (klopt met js/features/recipe-reader.js en api/ai-import.js: eerst de eigen
// lezer, AI alleen bij twijfel en met Pro, max. 150 per maand, nooit iets verzinnen) en waar we naartoe willen.
// Geen sectorcijfers: die hebben we niet met een bron. Feiten met bron: de Europese AI-verordening (EU 2024/1689,
// in werking sinds 1 augustus 2024) en de allergeneninformatie (EU 1169/2011). Het voorbeeld met verpakkingen en
// prijzen is een rekenvoorbeeld, geen statistiek. Toekomstige functies: geen datum beloven.

export const AI_POST = {
  id: 'ai-horeca',
  date: '2026-11-09',
  rich: true,
  nl: {
    slug: 'blog/ai-in-de-horeca',
    title: 'AI in de horeca: zo zet je het slim in, en zo doet Savour het',
    desc: 'Wat kan AI in de horeca, waar begin je en wat moet je zelf blijven doen? Een praktische aanpak voor keukens, met hoe Savour AI inzet voor recepten, allergenen en straks je inkoopprijzen.',
    h1: 'AI in de horeca: zo zet je het slim in',
    lead: 'AI is geen robot die je keuken overneemt. Het is een hulp die het saaie werk sneller doet: overtypen, uitzoeken, rekenen. De chef blijft beslissen. Zo voer je het in, en zo doet Savour het.',
    brief: [
      'Begin met één klus die je nu met de hand overtypt of uitzoekt, zoals recepten digitaliseren.',
      'Laat AI voorstellen doen en laat een mens nakijken. Vooral bij hoeveelheden en allergenen.',
      'Savour leest je recepten eerst zelf en roept alleen bij twijfel de AI erbij. Wat niet zeker is, legt Savour aan jou voor.'
    ],
    sections: [
      [
        'Wat AI in de keuken al kan',
        'Het meeste werk in een keuken is vakwerk dat geen computer overneemt. Maar om dat vakwerk heen zit veel papierwerk. Daar is AI goed in: tekst lezen en ordenen, ook als die rommelig is.',
        [
          '**Recepten digitaliseren**: een handgeschreven kladje, een foto of een Word-bestand omzetten naar een net recept.',
          '**Facturen en prijslijsten lezen**: de prijs per product uit een pakbon of factuur halen.',
          '**Vertalen**: een kaart of uitleg voor gasten in een andere taal, die je daarna zelf nakijkt.',
          '**Plannen**: op basis van je eigen verkoop van vorige weken inschatten hoeveel je nodig hebt.'
        ]
      ],
      [
        'Wat AI niet moet doen',
        'AI is goed in een tekst die klinkt alsof hij klopt. Dat is precies het gevaar. Een AI die bij een onleesbaar kladje "250 gram" gokt, levert een recept op dat er netjes uitziet maar niet klopt. En voor allergenen ben je als ondernemer zelf verantwoordelijk: de informatie die je aan gasten geeft, moet juist zijn (Europese verordening 1169/2011).',
        {
          compare: [
            ['Laat AI dit doen', ['Overtypen en ordenen', 'Voorstellen doen', 'Uitzoeken wat al bekend is', 'Rekenen met jouw cijfers']],
            ['Dit blijft bij de chef', ['Hoeveelheden die niet leesbaar zijn', 'Twijfel over allergenen', 'Wat er op de kaart komt', 'Wat er naar de gast gaat']]
          ]
        }
      ],
      [
        'Zo voer je AI in, stap voor stap',
        'Je hoeft niet alles tegelijk te doen. Kies één klus, kijk wat het oplevert, en ga dan verder.',
        {
          steps: [
            ['Kies één vervelende klus', 'Iets wat je nu met de hand doet en wat steeds terugkomt, zoals recepten overtypen of prijzen bijhouden.'],
            ['Zorg dat je gegevens op één plek staan', 'AI werkt het best met gegevens die al netjes zijn. Recepten in één systeem zijn de basis voor kostprijs, allergenen en planning.'],
            ['Laat altijd iemand nakijken', 'Zie AI als een commis die snel is maar nog niet alles weet: hij doet het voorwerk, de chef keurt.'],
            ['Let op privacy', 'Zet geen gegevens van gasten of personeel in een gratis chatprogramma. Kies software die zegt wat er met je gegevens gebeurt.'],
            ['Kijk wat het je oplevert', 'Hou zelf bij hoeveel tijd je bespaart. Levert het niets op, stop er dan mee.']
          ]
        }
      ],
      [
        'De regels',
        'Sinds 1 augustus 2024 geldt in de Europese Unie de AI-verordening (EU 2024/1689). Voor de meeste toepassingen in een keuken, zoals recepten lezen of prijzen ordenen, gaat het vooral om duidelijkheid: weet wanneer je met AI werkt en zorg dat er een mens meekijkt waar het ertoe doet.'
      ],
      [
        'Hoe Savour AI inzet',
        'Savour is gebouwd met één regel: een recept staat er precies zoals de kok het bedoelde. Daarom gebruikt Savour AI als laatste stap, niet als eerste.',
        {
          check: [
            'Importeren gaat eerst via de **Savour-lezer**: die leest Word, PDF en tekst zelf, zonder AI.',
            'Alleen als de lezer twijfelt, zoals bij een handgeschreven kladje of een foto, helpt de AI. Dat zit in Savour Pro, tot 150 keer per maand.',
            'De AI mag nooit een hoeveelheid, ingrediënt of stap verzinnen. Wat niet zeker is, krijg je te zien om na te kijken.',
            'De [allergenen](/allergenen-per-recept) herkent Savour uit de Savour-lijst met bekende ingrediënten. Twijfelt Savour, dan vraagt het jou.'
          ],
          title: 'Wat Savour nu al doet'
        }
      ],
      [
        'Waar we naartoe gaan: inkoop met verpakkingen en prijzen',
        'De volgende stap is de [foodcost calculator](/blog/foodcost-calculator). Daarvoor moet Savour weten wat je echt betaalt. En dat hangt af van hoe je inkoopt: per doos, per krat of per stuk. Eén ingrediënt kan dus meerdere verpakkingen hebben, elk met een eigen prijs. Savour rekent dat terug naar de prijs per stuk, gram of liter, zodat je recept met de juiste prijs rekent.',
        {
          head: ['Avocado (voorbeeld)', 'Inhoud', 'Prijs', 'Per stuk'],
          rows: [
            ['Doos', '24 stuks', '€ 28,80', '€ 1,20'],
            ['Krat', '6 stuks', '€ 7,80', '€ 1,30'],
            ['Los', '1 stuk', '€ 1,45', '€ 1,45']
          ]
        }
      ],
      [
        'En daar helpt AI weer',
        'Een prijslijst of factuur overtypen is precies het soort werk waar AI goed in is. Het plan: je laadt de prijslijst van je leverancier in of maakt een foto van een factuur, Savour leest de producten, verpakkingen en prijzen, en jij bevestigt welke bij welk ingrediënt hoort. Verandert een prijs, dan zie je meteen welk gerecht duurder wordt. Ook hier geldt: Savour stelt voor, jij beslist.\n\nDit bouwen we nu, zonder datum. Wat er nog meer op de planning staat, lees je op [Binnenkort in Savour](/binnenkort).',
        { see: ['Waarom AI je recept niet mag verzinnen', '/blog/ai-mag-je-recept-niet-verzinnen', 'Hoe de Savour-lezer en de AI samenwerken, en waarom twijfel zichtbaar blijft.'] }
      ]
    ],
    outro: 'De inkoopfuncties in dit artikel zijn plannen. Verandert er iets, dan passen we het hier aan.'
  },
  en: {
    slug: 'en/blog/ai-in-hospitality',
    title: 'AI in hospitality: how to use it well, and how Savour does it',
    desc: 'What can AI do in hospitality, where do you start and what should you keep doing yourself? A practical approach for kitchens, with how Savour uses AI for recipes, allergens and soon your purchase prices.',
    h1: 'AI in hospitality: how to use it well',
    lead: 'AI is not a robot that takes over your kitchen. It is a helper that does the dull work faster: retyping, sorting, calculating. The chef still decides. Here is how to bring it in, and how Savour does it.',
    brief: [
      'Start with one job you now retype or sort out by hand, such as digitising recipes.',
      'Let AI make suggestions and let a person check them, especially quantities and allergens.',
      'Savour reads your recipes itself first and only calls in AI when in doubt. Whatever is not certain, Savour asks you.'
    ],
    sections: [
      [
        'What AI can already do in the kitchen',
        'Most kitchen work is craft that no computer takes over. But around that craft there is a lot of paperwork. That is where AI is good: reading and organising text, even when it is messy.',
        [
          '**Digitising recipes**: turning a handwritten note, a photo or a Word file into a clean recipe.',
          '**Reading invoices and price lists**: pulling the price per product from a delivery note or invoice.',
          '**Translating**: a menu or explanation for guests in another language, which you then check yourself.',
          '**Planning**: estimating what you need based on your own sales of previous weeks.'
        ]
      ],
      [
        'What AI should not do',
        'AI is good at text that sounds right. That is exactly the danger. An AI that guesses "250 grams" on an unreadable note gives you a recipe that looks neat but is wrong. And as a business you are responsible for allergens yourself: the information you give guests must be correct (EU Regulation 1169/2011).',
        {
          compare: [
            ['Let AI do this', ['Retyping and organising', 'Making suggestions', 'Looking up what is already known', 'Calculating with your figures']],
            ['This stays with the chef', ['Quantities that cannot be read', 'Doubt about allergens', 'What goes on the menu', 'What goes to the guest']]
          ]
        }
      ],
      [
        'How to bring in AI, step by step',
        'You do not have to do everything at once. Pick one job, see what it brings, then move on.',
        {
          steps: [
            ['Pick one annoying job', 'Something you do by hand that keeps coming back, such as retyping recipes or keeping prices up to date.'],
            ['Keep your data in one place', 'AI works best with data that is already tidy. Recipes in one system are the basis for cost price, allergens and planning.'],
            ['Always have someone check', 'Think of AI as a commis who is fast but does not know everything yet: it does the prep, the chef approves.'],
            ['Mind privacy', 'Do not put guest or staff data into a free chat program. Choose software that says what happens to your data.'],
            ['See what it brings you', 'Keep track of how much time you save. If it brings nothing, stop.']
          ]
        }
      ],
      [
        'The rules',
        'Since 1 August 2024 the AI Act (EU 2024/1689) applies in the European Union. For most kitchen uses, such as reading recipes or sorting prices, it is mainly about transparency: know when you are working with AI and make sure a person checks where it matters.'
      ],
      [
        'How Savour uses AI',
        'Savour is built on one rule: a recipe is exactly as the cook meant it. That is why Savour uses AI as the last step, not the first.',
        {
          check: [
            'Importing goes through the **Savour reader** first: it reads Word, PDF and text itself, without AI.',
            'Only when the reader is in doubt, such as with a handwritten note or a photo, does AI help. That is part of Savour Pro, up to 150 times a month.',
            'The AI may never invent a quantity, ingredient or step. Whatever is not certain is shown to you to check.',
            'Savour recognises the [allergens](/en/allergens-per-recipe) from the Savour list of known ingredients. When in doubt, it asks you.'
          ],
          title: 'What Savour already does'
        }
      ],
      [
        'Where we are heading: purchasing with packages and prices',
        'The next step is the [food cost calculator](/en/blog/food-cost-calculator). For that, Savour needs to know what you really pay. And that depends on how you buy: per box, per crate or per piece. So one ingredient can have several packages, each with its own price. Savour works that back to the price per piece, gram or litre, so your recipe calculates with the right price.',
        {
          head: ['Avocado (example)', 'Contents', 'Price', 'Per piece'],
          rows: [
            ['Box', '24 pieces', '€ 28.80', '€ 1.20'],
            ['Crate', '6 pieces', '€ 7.80', '€ 1.30'],
            ['Single', '1 piece', '€ 1.45', '€ 1.45']
          ]
        }
      ],
      [
        'And that is where AI helps again',
        'Retyping a price list or invoice is exactly the kind of work AI is good at. The plan: you load your supplier’s price list or take a photo of an invoice, Savour reads the products, packages and prices, and you confirm which belongs to which ingredient. When a price changes, you immediately see which dish becomes more expensive. Here too: Savour suggests, you decide.\n\nWe are building this now, without a date. What else is planned is on [Coming soon](/en/roadmap).',
        { see: ['Why AI should never invent your recipe', '/en/blog/ai-should-never-invent-recipes', 'How the Savour reader and the AI work together, and why doubt stays visible.'] }
      ]
    ],
    outro: 'The purchasing features in this article are plans. If anything changes, we will update it here.'
  }
};

const KEY = 'en/blog/ai-in-hospitality';

export const AI_POST_DE = {
  [KEY]: {
    slug: 'de/blog/ki-in-der-gastronomie',
    title: 'KI in der Gastronomie: so setzt du sie klug ein, und so macht es Savour',
    desc: 'Was kann KI in der Gastronomie, wo fängst du an und was solltest du selbst machen? Ein praktischer Weg für Küchen, mit dem, wie Savour KI für Rezepte, Allergene und bald deine Einkaufspreise nutzt.',
    h1: 'KI in der Gastronomie: so setzt du sie klug ein',
    lead: 'KI ist kein Roboter, der deine Küche übernimmt. Sie ist eine Hilfe, die die lästige Arbeit schneller erledigt: abtippen, sortieren, rechnen. Entscheiden tut der Küchenchef. So führst du sie ein, und so macht es Savour.',
    brief: [
      'Fang mit einer Aufgabe an, die du jetzt von Hand abtippst oder heraussuchst, zum Beispiel Rezepte digitalisieren.',
      'Lass die KI Vorschläge machen und einen Menschen prüfen, vor allem bei Mengen und Allergenen.',
      'Savour liest deine Rezepte zuerst selbst und holt nur bei Zweifel die KI dazu. Was nicht sicher ist, legt Savour dir vor.'
    ],
    sections: [
      [
        'Was KI in der Küche schon kann',
        'Die meiste Arbeit in einer Küche ist Handwerk, das kein Computer übernimmt. Aber um dieses Handwerk herum gibt es viel Papierkram. Darin ist KI gut: Text lesen und ordnen, auch wenn er unordentlich ist.',
        [
          '**Rezepte digitalisieren**: einen handschriftlichen Zettel, ein Foto oder eine Word-Datei in ein sauberes Rezept verwandeln.',
          '**Rechnungen und Preislisten lesen**: den Preis pro Produkt aus einem Lieferschein oder einer Rechnung holen.',
          '**Übersetzen**: eine Karte oder Erklärung für Gäste in einer anderen Sprache, die du danach selbst prüfst.',
          '**Planen**: anhand deiner eigenen Verkäufe der letzten Wochen schätzen, wie viel du brauchst.'
        ]
      ],
      [
        'Was KI nicht tun sollte',
        'KI ist gut in Text, der klingt, als ob er stimmt. Genau das ist die Gefahr. Eine KI, die bei einem unleserlichen Zettel „250 Gramm“ rät, liefert ein Rezept, das ordentlich aussieht, aber falsch ist. Und für Allergene bist du als Betrieb selbst verantwortlich: Die Informationen für Gäste müssen stimmen (EU-Verordnung 1169/2011).',
        {
          compare: [
            ['Das darf die KI machen', ['Abtippen und ordnen', 'Vorschläge machen', 'Heraussuchen, was schon bekannt ist', 'Mit deinen Zahlen rechnen']],
            ['Das bleibt beim Küchenchef', ['Mengen, die nicht lesbar sind', 'Zweifel bei Allergenen', 'Was auf die Karte kommt', 'Was an den Gast geht']]
          ]
        }
      ],
      [
        'So führst du KI ein, Schritt für Schritt',
        'Du musst nicht alles auf einmal machen. Wähle eine Aufgabe, schau, was sie bringt, und mach dann weiter.',
        {
          steps: [
            ['Wähle eine lästige Aufgabe', 'Etwas, das du von Hand machst und das immer wiederkommt, zum Beispiel Rezepte abtippen oder Preise pflegen.'],
            ['Halte deine Daten an einem Ort', 'KI arbeitet am besten mit Daten, die schon ordentlich sind. Rezepte in einem System sind die Grundlage für Wareneinsatz, Allergene und Planung.'],
            ['Lass immer jemanden prüfen', 'Sieh die KI als Commis, der schnell ist, aber noch nicht alles weiß: Er macht die Vorarbeit, der Küchenchef gibt frei.'],
            ['Achte auf Datenschutz', 'Gib keine Daten von Gästen oder Personal in ein kostenloses Chatprogramm. Wähle Software, die sagt, was mit deinen Daten passiert.'],
            ['Schau, was es dir bringt', 'Halte fest, wie viel Zeit du sparst. Bringt es nichts, hör auf.']
          ]
        }
      ],
      [
        'Die Regeln',
        'Seit dem 1. August 2024 gilt in der Europäischen Union die KI-Verordnung (EU 2024/1689). Für die meisten Anwendungen in einer Küche, etwa Rezepte lesen oder Preise ordnen, geht es vor allem um Klarheit: Wisse, wann du mit KI arbeitest, und sorge dafür, dass ein Mensch dort prüft, wo es darauf ankommt.'
      ],
      [
        'Wie Savour KI einsetzt',
        'Savour ist nach einer Regel gebaut: Ein Rezept steht genau so da, wie der Koch es gemeint hat. Deshalb nutzt Savour KI als letzten Schritt, nicht als ersten.',
        {
          check: [
            'Der Import läuft zuerst über den **Savour-Leser**: Er liest Word, PDF und Text selbst, ohne KI.',
            'Nur wenn der Leser zweifelt, etwa bei einem handschriftlichen Zettel oder einem Foto, hilft die KI. Das gehört zu Savour Pro, bis zu 150 Mal im Monat.',
            'Die KI darf nie eine Menge, Zutat oder einen Schritt erfinden. Was nicht sicher ist, bekommst du zum Prüfen angezeigt.',
            'Die [Allergene](/de/allergene-pro-rezept) erkennt Savour anhand der Savour-Liste bekannter Zutaten. Bei Zweifel fragt Savour dich.'
          ],
          title: 'Was Savour schon macht'
        }
      ],
      [
        'Wohin wir wollen: Einkauf mit Verpackungen und Preisen',
        'Der nächste Schritt ist der [Wareneinsatz-Rechner](/de/blog/wareneinsatz-rechner). Dafür muss Savour wissen, was du wirklich bezahlst. Und das hängt davon ab, wie du einkaufst: pro Karton, pro Kiste oder pro Stück. Eine Zutat kann also mehrere Verpackungen haben, jede mit eigenem Preis. Savour rechnet das auf den Preis pro Stück, Gramm oder Liter um, damit dein Rezept mit dem richtigen Preis rechnet.',
        {
          head: ['Avocado (Beispiel)', 'Inhalt', 'Preis', 'Pro Stück'],
          rows: [
            ['Karton', '24 Stück', '28,80 €', '1,20 €'],
            ['Kiste', '6 Stück', '7,80 €', '1,30 €'],
            ['Einzeln', '1 Stück', '1,45 €', '1,45 €']
          ]
        }
      ],
      [
        'Und da hilft wieder die KI',
        'Eine Preisliste oder Rechnung abtippen ist genau die Arbeit, in der KI gut ist. Der Plan: Du lädst die Preisliste deines Lieferanten hoch oder fotografierst eine Rechnung, Savour liest Produkte, Verpackungen und Preise, und du bestätigst, was zu welcher Zutat gehört. Ändert sich ein Preis, siehst du sofort, welches Gericht teurer wird. Auch hier gilt: Savour schlägt vor, du entscheidest.\n\nDas bauen wir jetzt, ohne Datum. Was sonst noch geplant ist, liest du unter [Demnächst in Savour](/de/demnaechst).',
        { see: ['Warum KI dein Rezept nicht erfinden darf', '/de/blog/ki-darf-rezepte-nicht-erfinden', 'Wie der Savour-Leser und die KI zusammenarbeiten und warum Zweifel sichtbar bleibt.'] }
      ]
    ],
    outro: 'Die Einkaufsfunktionen in diesem Artikel sind Pläne. Ändert sich etwas, passen wir es hier an.'
  }
};

export const AI_POST_ES = {
  [KEY]: {
    slug: 'es/blog/ia-en-hosteleria',
    title: 'IA en hostelería: cómo usarla bien, y cómo lo hace Savour',
    desc: '¿Qué puede hacer la IA en hostelería, por dónde empiezas y qué debes seguir haciendo tú? Un enfoque práctico para cocinas, con cómo Savour usa la IA para recetas, alérgenos y pronto tus precios de compra.',
    h1: 'IA en hostelería: cómo usarla bien',
    lead: 'La IA no es un robot que se queda con tu cocina. Es una ayuda que hace más rápido el trabajo pesado: pasar a limpio, ordenar, calcular. El chef sigue decidiendo. Así la introduces, y así lo hace Savour.',
    brief: [
      'Empieza con una tarea que ahora haces a mano, como digitalizar recetas.',
      'Deja que la IA proponga y que una persona revise, sobre todo cantidades y alérgenos.',
      'Savour lee tus recetas primero por sí mismo y solo recurre a la IA cuando hay dudas. Lo que no es seguro, te lo pregunta.'
    ],
    sections: [
      [
        'Lo que la IA ya puede hacer en la cocina',
        'La mayor parte del trabajo en una cocina es oficio que ningún ordenador sustituye. Pero alrededor de ese oficio hay mucho papeleo. Ahí la IA es buena: leer y ordenar texto, aunque esté desordenado.',
        [
          '**Digitalizar recetas**: convertir una nota a mano, una foto o un archivo de Word en una receta limpia.',
          '**Leer facturas y listas de precios**: sacar el precio por producto de un albarán o una factura.',
          '**Traducir**: una carta o explicación para clientes en otro idioma, que luego revisas tú.',
          '**Planificar**: estimar lo que necesitas a partir de tus propias ventas de las semanas anteriores.'
        ]
      ],
      [
        'Lo que la IA no debe hacer',
        'La IA es buena escribiendo texto que suena correcto. Ese es justo el peligro. Una IA que adivina «250 gramos» en una nota ilegible te da una receta que parece limpia pero está mal. Y de los alérgenos eres responsable tú como negocio: la información que das a los clientes debe ser correcta (Reglamento UE 1169/2011).',
        {
          compare: [
            ['Que lo haga la IA', ['Pasar a limpio y ordenar', 'Hacer propuestas', 'Buscar lo que ya se sabe', 'Calcular con tus cifras']],
            ['Esto sigue siendo del chef', ['Cantidades que no se pueden leer', 'Dudas sobre alérgenos', 'Lo que entra en la carta', 'Lo que llega al cliente']]
          ]
        }
      ],
      [
        'Cómo introducir la IA, paso a paso',
        'No tienes que hacerlo todo a la vez. Elige una tarea, mira lo que aporta y después sigue.',
        {
          steps: [
            ['Elige una tarea pesada', 'Algo que haces a mano y que se repite, como pasar recetas a limpio o mantener los precios al día.'],
            ['Ten tus datos en un solo sitio', 'La IA funciona mejor con datos que ya están ordenados. Las recetas en un solo sistema son la base para el coste, los alérgenos y la planificación.'],
            ['Que siempre revise alguien', 'Piensa en la IA como un commis rápido que aún no lo sabe todo: hace la preparación y el chef aprueba.'],
            ['Cuida la privacidad', 'No pongas datos de clientes ni de personal en un chat gratuito. Elige software que diga qué pasa con tus datos.'],
            ['Mira lo que te aporta', 'Apunta cuánto tiempo ahorras. Si no aporta nada, déjalo.']
          ]
        }
      ],
      [
        'Las normas',
        'Desde el 1 de agosto de 2024 se aplica en la Unión Europea el Reglamento de IA (UE 2024/1689). Para la mayoría de usos en una cocina, como leer recetas u ordenar precios, se trata sobre todo de claridad: saber cuándo trabajas con IA y asegurarte de que una persona revisa donde importa.'
      ],
      [
        'Cómo usa Savour la IA',
        'Savour se basa en una regla: una receta queda exactamente como la quiso el cocinero. Por eso Savour usa la IA como último paso, no como el primero.',
        {
          check: [
            'La importación pasa primero por el **lector de Savour**: lee Word, PDF y texto por sí mismo, sin IA.',
            'Solo cuando el lector duda, como con una nota a mano o una foto, ayuda la IA. Forma parte de Savour Pro, hasta 150 veces al mes.',
            'La IA nunca puede inventar una cantidad, un ingrediente o un paso. Lo que no es seguro se te muestra para revisarlo.',
            'Savour reconoce los [alérgenos](/es/alergenos-por-receta) con la lista de Savour de ingredientes conocidos. Si duda, te pregunta.'
          ],
          title: 'Lo que Savour ya hace'
        }
      ],
      [
        'Hacia dónde vamos: compras con formatos y precios',
        'El siguiente paso es la [calculadora de food cost](/es/blog/calculadora-food-cost). Para eso Savour necesita saber lo que pagas de verdad. Y eso depende de cómo compras: por caja, por cajón o por unidad. Un ingrediente puede tener varios formatos, cada uno con su precio. Savour lo convierte en precio por unidad, gramo o litro, para que tu receta calcule con el precio correcto.',
        {
          head: ['Aguacate (ejemplo)', 'Contenido', 'Precio', 'Por unidad'],
          rows: [
            ['Caja', '24 unidades', '28,80 €', '1,20 €'],
            ['Cajón', '6 unidades', '7,80 €', '1,30 €'],
            ['Suelto', '1 unidad', '1,45 €', '1,45 €']
          ]
        }
      ],
      [
        'Y ahí vuelve a ayudar la IA',
        'Pasar a limpio una lista de precios o una factura es justo el tipo de trabajo en el que la IA es buena. El plan: cargas la lista de precios de tu proveedor o haces una foto de una factura, Savour lee los productos, formatos y precios, y tú confirmas cuál corresponde a cada ingrediente. Si cambia un precio, ves enseguida qué plato sale más caro. También aquí: Savour propone, tú decides.\n\nLo estamos construyendo ahora, sin fecha. Lo que hay previsto está en [Próximamente en Savour](/es/proximamente).',
        { see: ['Por qué la IA no debe inventar tu receta', '/es/blog/la-ia-no-debe-inventar-recetas', 'Cómo trabajan juntos el lector de Savour y la IA, y por qué las dudas siguen visibles.'] }
      ]
    ],
    outro: 'Las funciones de compras de este artículo son planes. Si algo cambia, lo actualizaremos aquí.'
  }
};

export const AI_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/ia-en-restauration',
    title: 'L’IA en restauration : bien l’utiliser, et comment Savour le fait',
    desc: 'Que peut faire l’IA en restauration, par où commencer et que dois-tu continuer à faire toi-même ? Une approche pratique pour les cuisines, avec la façon dont Savour utilise l’IA pour les recettes, les allergènes et bientôt tes prix d’achat.',
    h1: 'L’IA en restauration : bien l’utiliser',
    lead: 'L’IA n’est pas un robot qui prend ta cuisine. C’est une aide qui fait plus vite le travail ennuyeux : recopier, trier, calculer. Le chef décide toujours. Voici comment l’introduire, et comment Savour le fait.',
    brief: [
      'Commence par une tâche que tu fais aujourd’hui à la main, comme numériser tes recettes.',
      'Laisse l’IA proposer et une personne vérifier, surtout les quantités et les allergènes.',
      'Savour lit d’abord tes recettes lui-même et ne fait appel à l’IA qu’en cas de doute. Ce qui n’est pas sûr, il te le demande.'
    ],
    sections: [
      [
        'Ce que l’IA sait déjà faire en cuisine',
        'L’essentiel du travail en cuisine est un métier qu’aucun ordinateur ne remplace. Mais autour de ce métier, il y a beaucoup de paperasse. C’est là que l’IA est bonne : lire et ranger du texte, même désordonné.',
        [
          '**Numériser des recettes** : transformer une note manuscrite, une photo ou un fichier Word en une recette propre.',
          '**Lire factures et tarifs** : extraire le prix par produit d’un bon de livraison ou d’une facture.',
          '**Traduire** : une carte ou une explication pour les clients dans une autre langue, que tu vérifies ensuite.',
          '**Planifier** : estimer ce dont tu as besoin à partir de tes propres ventes des semaines précédentes.'
        ]
      ],
      [
        'Ce que l’IA ne doit pas faire',
        'L’IA est douée pour écrire un texte qui sonne juste. C’est justement le danger. Une IA qui devine « 250 grammes » sur une note illisible te donne une recette propre mais fausse. Et pour les allergènes, c’est toi, en tant qu’établissement, qui es responsable : l’information donnée aux clients doit être exacte (règlement UE 1169/2011).',
        {
          compare: [
            ['Laisse l’IA faire ceci', ['Recopier et ranger', 'Faire des propositions', 'Chercher ce qui est déjà connu', 'Calculer avec tes chiffres']],
            ['Ceci reste au chef', ['Les quantités illisibles', 'Un doute sur les allergènes', 'Ce qui va à la carte', 'Ce qui va au client']]
          ]
        }
      ],
      [
        'Introduire l’IA, étape par étape',
        'Pas besoin de tout faire d’un coup. Choisis une tâche, regarde ce qu’elle apporte, puis continue.',
        {
          steps: [
            ['Choisis une tâche pénible', 'Quelque chose que tu fais à la main et qui revient sans cesse, comme recopier des recettes ou tenir les prix à jour.'],
            ['Garde tes données au même endroit', 'L’IA marche mieux avec des données déjà propres. Des recettes dans un seul système sont la base du coût, des allergènes et de la planification.'],
            ['Fais toujours vérifier', 'Vois l’IA comme un commis rapide qui ne sait pas encore tout : il fait la mise en place, le chef valide.'],
            ['Fais attention à la vie privée', 'Ne mets pas de données de clients ou de personnel dans un chat gratuit. Choisis un logiciel qui dit ce qu’il fait de tes données.'],
            ['Regarde ce que ça t’apporte', 'Note le temps gagné. Si ça n’apporte rien, arrête.']
          ]
        }
      ],
      [
        'Les règles',
        'Depuis le 1er août 2024, le règlement sur l’IA (UE 2024/1689) s’applique dans l’Union européenne. Pour la plupart des usages en cuisine, comme lire des recettes ou ranger des prix, il s’agit surtout de transparence : savoir quand tu travailles avec l’IA et faire vérifier par une personne là où ça compte.'
      ],
      [
        'Comment Savour utilise l’IA',
        'Savour repose sur une règle : une recette est exactement comme le cuisinier l’a voulue. C’est pourquoi Savour utilise l’IA en dernière étape, pas en première.',
        {
          check: [
            'L’import passe d’abord par le **lecteur Savour** : il lit Word, PDF et texte lui-même, sans IA.',
            'L’IA n’aide que lorsque le lecteur hésite, par exemple pour une note manuscrite ou une photo. C’est inclus dans Savour Pro, jusqu’à 150 fois par mois.',
            'L’IA ne peut jamais inventer une quantité, un ingrédient ou une étape. Ce qui n’est pas sûr t’est montré pour vérification.',
            'Savour reconnaît les [allergènes](/fr/allergenes-par-recette) grâce à la liste Savour d’ingrédients connus. En cas de doute, il te demande.'
          ],
          title: 'Ce que Savour fait déjà'
        }
      ],
      [
        'Où nous allons : les achats avec conditionnements et prix',
        'L’étape suivante est le [calculateur de food cost](/fr/blog/calculateur-food-cost). Pour cela, Savour doit savoir ce que tu paies vraiment. Et cela dépend de ta façon d’acheter : au carton, à la caisse ou à la pièce. Un ingrédient peut donc avoir plusieurs conditionnements, chacun avec son prix. Savour ramène tout au prix par pièce, gramme ou litre, pour que ta recette calcule avec le bon prix.',
        {
          head: ['Avocat (exemple)', 'Contenu', 'Prix', 'Par pièce'],
          rows: [
            ['Carton', '24 pièces', '28,80 €', '1,20 €'],
            ['Caisse', '6 pièces', '7,80 €', '1,30 €'],
            ['À la pièce', '1 pièce', '1,45 €', '1,45 €']
          ]
        }
      ],
      [
        'Et là, l’IA aide à nouveau',
        'Recopier un tarif ou une facture, c’est exactement le travail où l’IA est bonne. Le plan : tu charges le tarif de ton fournisseur ou tu photographies une facture, Savour lit les produits, conditionnements et prix, et tu confirmes lequel va avec quel ingrédient. Si un prix change, tu vois tout de suite quel plat coûte plus cher. Ici aussi : Savour propose, tu décides.\n\nNous le construisons maintenant, sans date. Ce qui est prévu se trouve sur [Bientôt dans Savour](/fr/bientot).',
        { see: ['Pourquoi l’IA ne doit pas inventer ta recette', '/fr/blog/ia-ne-doit-pas-inventer-recettes', 'Comment le lecteur Savour et l’IA travaillent ensemble, et pourquoi le doute reste visible.'] }
      ]
    ],
    outro: 'Les fonctions d’achat de cet article sont des projets. Si quelque chose change, nous le mettrons à jour ici.'
  }
};
