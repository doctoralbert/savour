// Blog: aankondiging van de foodcost calculator (2026-11-08), in vijf talen. De functie is nog niet live: schrijf
// "komt eraan" en beloof geen datum of koppelingen met bepaalde leveranciers. Het rekenvoorbeeld is een voorbeeld,
// geen statistiek; het sectorcijfer (31,1% inkoop bij restaurants, CBS 2024) komt uit tools/site-blog-kosten.mjs.
// Menu engineering: de menu-engineeringmatrix van Kasavana en Smith (1982), populariteit tegen brutowinst per gerecht.

export const FOODCOST_POST = {
  id: 'foodcost',
  date: '2026-11-08',
  rich: true,
  nl: {
    slug: 'blog/foodcost-calculator',
    title: 'Binnenkort in Savour: de foodcost calculator',
    desc: 'Savour krijgt een foodcost calculator: reken de kostprijs van een gerecht of je hele menu uit vanuit je eigen recepten, met de prijzen van je leverancier en je eigen korting. Daarna volgt menu engineering, gekoppeld aan allergenen.',
    h1: 'Binnenkort in Savour: de foodcost calculator',
    lead: 'Wat kost dit bord eigenlijk? De meeste chefs weten het ongeveer. Met de foodcost calculator weet je het precies, per gerecht en voor je hele menu, en blijft het kloppen als de prijzen veranderen.',
    brief: [
      'Een rekenblad dat de foodcost van een gerecht of menu uitrekent vanuit de recepten die al in Savour staan.',
      'Heb je een prijslijst van je leverancier, dan laad je die in, met de korting die jij hebt afgesproken. Zo reken je altijd met je eigen, actuele prijzen.',
      'Daarna volgt menu engineering: welke gerechten verkopen goed én verdienen goed, met de allergenen er meteen bij.'
    ],
    sections: [
      [
        'Wat is foodcost?',
        'Foodcost is het deel van de verkoopprijs dat opgaat aan ingrediënten. Je rekent het zo uit: de kosten van de ingrediënten gedeeld door de verkoopprijs zonder btw, keer 100.\n\nEen voorbeeld: kosten de ingrediënten van een gerecht € 6,00 en verkoop je het voor € 24,00 zonder btw, dan is de foodcost 25%. Ter vergelijking: bij Nederlandse restaurants ging in 2024 gemiddeld 31,1% van de opbrengsten naar inkoop (CBS). Meer cijfers lees je in [Wat kost een restaurant?](/blog/kosten-en-marges-restaurant).',
        { example: ['Rekenvoorbeeld', ['Ingrediënten per portie: € 6,00', 'Verkoopprijs zonder btw: € 24,00', 'Foodcost: 6,00 ÷ 24,00 × 100 = 25%']] }
      ],
      [
        'Vanuit je eigen recepten',
        'In een los rekenblad moet je alles twee keer bijhouden: het recept in de keuken en de hoeveelheden in de spreadsheet. Pas je het recept aan, dan klopt het blad niet meer. In Savour staan de hoeveelheden al in je recepten. De calculator rekent daarmee, ook door basisrecepten heen: de fond, het deeg en de saus tellen mee in de prijs van het gerecht waarin ze zitten.\n\nWerk je met een opbrengst, zoals 10 porties of 2 liter, dan rekent Savour terug naar de prijs per portie.'
      ],
      [
        'Jouw prijzen, met jouw korting',
        'Iedere keuken koopt anders in. Daarom reken je met je eigen prijzen. Je vult ze zelf in, of je laadt de prijslijst van je leverancier in als je die hebt. Heb je met je leverancier een korting afgesproken, dan zet je die erbij. Zo reken je met wat jij echt betaalt, niet met de prijs in de folder.\n\nVerandert de prijslijst, dan laad je de nieuwe in en rekent Savour al je gerechten opnieuw uit. Je ziet meteen welk gerecht door een duurdere inkoop onder je doel zakt.',
        {
          check: [
            'Foodcost per gerecht en per portie, ook door basisrecepten heen.',
            'Foodcost van een heel menu.',
            'Eigen prijzen invullen of de prijslijst van je leverancier inladen.',
            'Je persoonlijke korting bij je leverancier verwerken.',
            'Een doelpercentage per gerecht, met een melding als je eroverheen gaat.'
          ],
          title: 'Wat de calculator gaat doen'
        }
      ],
      [
        'Daarna: menu engineering',
        'Een lage foodcost alleen zegt niet alles. Een gerecht met 22% foodcost dat bijna niemand bestelt, levert minder op dan een gerecht met 32% dat elke avond de deur uit gaat. Menu engineering zet beide naast elkaar: hoe vaak verkoop je een gerecht, en wat verdien je er per bord aan.\n\nDe bekende indeling komt van Kasavana en Smith (1982) en verdeelt je kaart in vier groepen:',
        [
          '**Stars**: verkopen goed en verdienen goed. Houden zoals ze zijn.',
          '**Plowhorses**: verkopen goed, maar verdienen weinig. Kijk naar de portie of de prijs.',
          '**Puzzles**: verdienen goed, maar verkopen weinig. Een betere plek op de kaart of een andere beschrijving.',
          '**Dogs**: verkopen weinig en verdienen weinig. Kandidaat om te vervangen.'
        ]
      ],
      [
        'Alles aan elkaar gekoppeld',
        'Omdat alles in Savour uit dezelfde recepten komt, hangt het aan elkaar. Pas je een recept aan, dan veranderen de kostprijs, de menu-analyse en de [allergenen](/allergenen-per-recept) tegelijk. Wissel je de mayonaise van de huisdressing voor een andere, dan zie je meteen wat dat kost en of er een allergeen bijkomt of afgaat.'
      ],
      [
        'Wanneer?',
        'We bouwen eerst de foodcost calculator, daarna menu engineering. Er staat bewust geen datum bij: een functie gaat live als hij goed genoeg is voor de drukte van een service. Wil je meedenken of meetesten? Mail naar contact@savour.page. Wat er nog meer op de planning staat, lees je op [Binnenkort in Savour](/binnenkort).'
      ]
    ],
    outro: 'Dit artikel beschrijft een functie die we nu bouwen. Verandert er iets, dan passen we het hier aan.'
  },
  en: {
    slug: 'en/blog/food-cost-calculator',
    title: 'Coming soon to Savour: the food cost calculator',
    desc: 'Savour is getting a food cost calculator: work out the cost of a dish or your whole menu from your own recipes, with your supplier’s prices and your own discount. Menu engineering follows, linked to allergens.',
    h1: 'Coming soon to Savour: the food cost calculator',
    lead: 'What does this plate actually cost? Most chefs know roughly. With the food cost calculator you know exactly, per dish and for your whole menu, and it stays right when prices change.',
    brief: [
      'A sheet that works out the food cost of a dish or menu from the recipes already in Savour.',
      'Have a price list from your supplier? Load it in, with the discount you agreed. That way you always calculate with your own, current prices.',
      'Menu engineering follows: which dishes sell well and earn well, with the allergens right alongside.'
    ],
    sections: [
      [
        'What is food cost?',
        'Food cost is the part of the selling price spent on ingredients. You calculate it like this: the cost of the ingredients divided by the selling price excluding VAT, times 100.\n\nAn example: if the ingredients of a dish cost € 6.00 and you sell it for € 24.00 excluding VAT, the food cost is 25%. For comparison: in 2024 Dutch restaurants spent an average of 31.1% of their revenue on food and drink purchases (CBS). More figures in [What does a restaurant cost?](/en/blog/restaurant-costs-and-margins).',
        { example: ['Worked example', ['Ingredients per portion: € 6.00', 'Selling price excluding VAT: € 24.00', 'Food cost: 6.00 ÷ 24.00 × 100 = 25%']] }
      ],
      [
        'From your own recipes',
        'In a separate spreadsheet you keep everything twice: the recipe in the kitchen and the quantities in the sheet. Change the recipe and the sheet is wrong. In Savour the quantities are already in your recipes. The calculator uses them, including base recipes: the stock, the dough and the sauce count towards the price of the dish they are in.\n\nIf you work with a yield, such as 10 portions or 2 litres, Savour calculates back to the price per portion.'
      ],
      [
        'Your prices, with your discount',
        'Every kitchen buys differently. So you calculate with your own prices. Enter them yourself, or load your supplier’s price list if you have one. Agreed a discount with your supplier? Add it. That way you calculate with what you really pay, not the list price.\n\nWhen the price list changes, load the new one and Savour recalculates all your dishes. You immediately see which dish drops below your target because of more expensive purchases.',
        {
          check: [
            'Food cost per dish and per portion, including base recipes.',
            'Food cost of a whole menu.',
            'Enter your own prices or load your supplier’s price list.',
            'Apply your personal supplier discount.',
            'A target percentage per dish, with a warning when you go over it.'
          ],
          title: 'What the calculator will do'
        }
      ],
      [
        'Next: menu engineering',
        'A low food cost alone does not tell the whole story. A dish with 22% food cost that hardly anyone orders earns less than a dish with 32% that goes out every night. Menu engineering puts both side by side: how often you sell a dish, and what you earn per plate.\n\nThe well-known model comes from Kasavana and Smith (1982) and splits your menu into four groups:',
        [
          '**Stars**: sell well and earn well. Keep them as they are.',
          '**Plowhorses**: sell well but earn little. Look at the portion or the price.',
          '**Puzzles**: earn well but sell little. A better place on the menu or a different description.',
          '**Dogs**: sell little and earn little. Candidates for replacement.'
        ]
      ],
      [
        'Everything linked together',
        'Because everything in Savour comes from the same recipes, it all hangs together. Change a recipe and the cost price, the menu analysis and the [allergens](/en/allergens-per-recipe) change at the same time. Swap the mayonnaise in the house dressing for another one and you immediately see what it costs and whether an allergen is added or removed.'
      ],
      [
        'When?',
        'We are building the food cost calculator first, then menu engineering. There is deliberately no date: a feature goes live when it is good enough for the rush of a service. Want to share ideas or help test? Email contact@savour.page. What else is planned is on [Coming soon](/en/roadmap).'
      ]
    ],
    outro: 'This article describes a feature we are building now. If anything changes, we will update it here.'
  }
};

const KEY = 'en/blog/food-cost-calculator';

export const FOODCOST_POST_DE = {
  [KEY]: {
    slug: 'de/blog/wareneinsatz-rechner',
    title: 'Demnächst in Savour: der Wareneinsatz-Rechner',
    desc: 'Savour bekommt einen Wareneinsatz-Rechner: Berechne die Kosten eines Gerichts oder deiner ganzen Karte aus deinen eigenen Rezepten, mit den Preisen deines Lieferanten und deinem eigenen Rabatt. Danach folgt Menu Engineering, verknüpft mit den Allergenen.',
    h1: 'Demnächst in Savour: der Wareneinsatz-Rechner',
    lead: 'Was kostet dieser Teller eigentlich? Die meisten Köche wissen es ungefähr. Mit dem Wareneinsatz-Rechner weißt du es genau, pro Gericht und für die ganze Karte, und es stimmt auch noch, wenn sich die Preise ändern.',
    brief: [
      'Ein Rechenblatt, das den Wareneinsatz eines Gerichts oder Menüs aus den Rezepten berechnet, die schon in Savour stehen.',
      'Hast du eine Preisliste deines Lieferanten, lädst du sie hoch, mit dem Rabatt, den du ausgehandelt hast. So rechnest du immer mit deinen eigenen, aktuellen Preisen.',
      'Danach folgt Menu Engineering: Welche Gerichte verkaufen sich gut und bringen gut Geld, mit den Allergenen direkt dabei.'
    ],
    sections: [
      [
        'Was ist Wareneinsatz?',
        'Der Wareneinsatz (Food Cost) ist der Teil des Verkaufspreises, der für Zutaten draufgeht. So rechnest du: Kosten der Zutaten geteilt durch den Verkaufspreis ohne Mehrwertsteuer, mal 100.\n\nEin Beispiel: Kosten die Zutaten eines Gerichts 6,00 € und verkaufst du es für 24,00 € ohne Mehrwertsteuer, liegt der Wareneinsatz bei 25 %. Zum Vergleich: Niederländische Restaurants gaben 2024 im Schnitt 31,1 % ihrer Erlöse für Wareneinsatz aus (CBS). Mehr Zahlen in [Was kostet ein Restaurant?](/de/blog/kosten-und-margen-restaurant).',
        { example: ['Rechenbeispiel', ['Zutaten pro Portion: 6,00 €', 'Verkaufspreis ohne Mehrwertsteuer: 24,00 €', 'Wareneinsatz: 6,00 ÷ 24,00 × 100 = 25 %']] }
      ],
      [
        'Aus deinen eigenen Rezepten',
        'In einer separaten Tabelle führst du alles doppelt: das Rezept in der Küche und die Mengen in der Tabelle. Änderst du das Rezept, stimmt die Tabelle nicht mehr. In Savour stehen die Mengen schon in deinen Rezepten. Der Rechner nutzt sie, auch über Grundrezepte: Fond, Teig und Sauce zählen beim Preis des Gerichts mit, in dem sie stecken.\n\nArbeitest du mit einer Ausbeute, etwa 10 Portionen oder 2 Liter, rechnet Savour auf den Preis pro Portion zurück.'
      ],
      [
        'Deine Preise, mit deinem Rabatt',
        'Jede Küche kauft anders ein. Deshalb rechnest du mit deinen eigenen Preisen. Du trägst sie selbst ein oder lädst die Preisliste deines Lieferanten hoch, wenn du eine hast. Hast du mit deinem Lieferanten einen Rabatt vereinbart, trägst du ihn dazu ein. So rechnest du mit dem, was du wirklich bezahlst, nicht mit dem Listenpreis.\n\nÄndert sich die Preisliste, lädst du die neue hoch und Savour rechnet alle Gerichte neu. Du siehst sofort, welches Gericht durch teureren Einkauf unter dein Ziel rutscht.',
        {
          check: [
            'Wareneinsatz pro Gericht und pro Portion, auch über Grundrezepte.',
            'Wareneinsatz einer ganzen Karte.',
            'Eigene Preise eintragen oder die Preisliste des Lieferanten hochladen.',
            'Deinen persönlichen Lieferantenrabatt einrechnen.',
            'Ein Zielprozentsatz pro Gericht, mit Hinweis, wenn du darüber liegst.'
          ],
          title: 'Was der Rechner können wird'
        }
      ],
      [
        'Danach: Menu Engineering',
        'Ein niedriger Wareneinsatz allein sagt nicht alles. Ein Gericht mit 22 % Wareneinsatz, das kaum jemand bestellt, bringt weniger als eines mit 32 %, das jeden Abend rausgeht. Menu Engineering stellt beides nebeneinander: wie oft du ein Gericht verkaufst und was du pro Teller daran verdienst.\n\nDas bekannte Modell stammt von Kasavana und Smith (1982) und teilt deine Karte in vier Gruppen:',
        [
          '**Stars**: verkaufen sich gut und verdienen gut. So lassen.',
          '**Plowhorses**: verkaufen sich gut, verdienen aber wenig. Portion oder Preis prüfen.',
          '**Puzzles**: verdienen gut, verkaufen sich aber wenig. Besserer Platz auf der Karte oder andere Beschreibung.',
          '**Dogs**: verkaufen sich wenig und verdienen wenig. Kandidaten zum Ersetzen.'
        ]
      ],
      [
        'Alles miteinander verknüpft',
        'Weil in Savour alles aus denselben Rezepten kommt, hängt alles zusammen. Änderst du ein Rezept, ändern sich Kosten, Menüanalyse und [Allergene](/de/allergene-pro-rezept) gleichzeitig. Tauschst du die Mayonnaise im Hausdressing gegen eine andere, siehst du sofort, was das kostet und ob ein Allergen dazukommt oder wegfällt.'
      ],
      [
        'Wann?',
        'Wir bauen zuerst den Wareneinsatz-Rechner, danach Menu Engineering. Es gibt bewusst keinen Termin: Eine Funktion geht live, wenn sie gut genug für den Stress eines Service ist. Willst du mitdenken oder mittesten? Schreib an contact@savour.page. Was sonst noch geplant ist, steht unter [Demnächst in Savour](/de/demnaechst).'
      ]
    ],
    outro: 'Dieser Artikel beschreibt eine Funktion, die wir gerade bauen. Ändert sich etwas, passen wir ihn hier an.'
  }
};

export const FOODCOST_POST_ES = {
  [KEY]: {
    slug: 'es/blog/calculadora-food-cost',
    title: 'Próximamente en Savour: la calculadora de food cost',
    desc: 'Savour tendrá una calculadora de food cost: calcula el coste de un plato o de toda tu carta a partir de tus propias recetas, con los precios de tu proveedor y tu propio descuento. Después llegará la ingeniería de menú, enlazada con los alérgenos.',
    h1: 'Próximamente en Savour: la calculadora de food cost',
    lead: '¿Cuánto cuesta en realidad este plato? La mayoría de los chefs lo sabe más o menos. Con la calculadora de food cost lo sabrás exactamente, por plato y para toda la carta, y seguirá cuadrando cuando cambien los precios.',
    brief: [
      'Una hoja que calcula el food cost de un plato o un menú a partir de las recetas que ya tienes en Savour.',
      '¿Tienes la lista de precios de tu proveedor? La cargas, con el descuento que hayas pactado. Así calculas siempre con tus propios precios actuales.',
      'Después llegará la ingeniería de menú: qué platos se venden bien y dejan buen margen, con los alérgenos al lado.'
    ],
    sections: [
      [
        '¿Qué es el food cost?',
        'El food cost es la parte del precio de venta que se va en ingredientes. Se calcula así: el coste de los ingredientes dividido por el precio de venta sin IVA, por 100.\n\nUn ejemplo: si los ingredientes de un plato cuestan 6,00 € y lo vendes a 24,00 € sin IVA, el food cost es del 25 %. Como comparación: en 2024 los restaurantes neerlandeses dedicaron de media el 31,1 % de sus ingresos a materia prima (CBS). Más cifras en [¿Cuánto cuesta un restaurante?](/es/blog/costes-y-margenes-restaurante).',
        { example: ['Ejemplo de cálculo', ['Ingredientes por ración: 6,00 €', 'Precio de venta sin IVA: 24,00 €', 'Food cost: 6,00 ÷ 24,00 × 100 = 25 %']] }
      ],
      [
        'A partir de tus propias recetas',
        'En una hoja de cálculo aparte lo llevas todo dos veces: la receta en la cocina y las cantidades en la hoja. Cambias la receta y la hoja deja de cuadrar. En Savour las cantidades ya están en tus recetas. La calculadora las usa, también a través de las recetas base: el fondo, la masa y la salsa cuentan en el precio del plato que las lleva.\n\nSi trabajas con un rendimiento, como 10 raciones o 2 litros, Savour calcula el precio por ración.'
      ],
      [
        'Tus precios, con tu descuento',
        'Cada cocina compra a su manera. Por eso calculas con tus propios precios. Los introduces tú, o cargas la lista de precios de tu proveedor si la tienes. ¿Has pactado un descuento con tu proveedor? Lo añades. Así calculas con lo que pagas de verdad, no con el precio de catálogo.\n\nCuando cambia la lista de precios, cargas la nueva y Savour recalcula todos tus platos. Ves enseguida qué plato baja de tu objetivo por una compra más cara.',
        {
          check: [
            'Food cost por plato y por ración, también a través de recetas base.',
            'Food cost de una carta entera.',
            'Introducir tus propios precios o cargar la lista de precios del proveedor.',
            'Aplicar tu descuento personal con el proveedor.',
            'Un porcentaje objetivo por plato, con un aviso cuando lo superas.'
          ],
          title: 'Lo que hará la calculadora'
        }
      ],
      [
        'Después: ingeniería de menú',
        'Un food cost bajo no lo dice todo. Un plato con un 22 % de food cost que casi nadie pide deja menos que uno con un 32 % que sale todas las noches. La ingeniería de menú pone ambas cosas lado a lado: cuántas veces vendes un plato y cuánto ganas por plato.\n\nEl modelo conocido es de Kasavana y Smith (1982) y divide tu carta en cuatro grupos:',
        [
          '**Stars**: se venden bien y dejan buen margen. Mantenerlos.',
          '**Plowhorses**: se venden bien, pero dejan poco. Revisa la ración o el precio.',
          '**Puzzles**: dejan buen margen, pero se venden poco. Mejor sitio en la carta u otra descripción.',
          '**Dogs**: se venden poco y dejan poco. Candidatos a sustituir.'
        ]
      ],
      [
        'Todo enlazado',
        'Como todo en Savour sale de las mismas recetas, todo encaja. Cambias una receta y cambian a la vez el coste, el análisis del menú y los [alérgenos](/es/alergenos-por-receta). Cambias la mayonesa del aliño de la casa por otra y ves al instante lo que cuesta y si entra o sale un alérgeno.'
      ],
      [
        '¿Cuándo?',
        'Primero construimos la calculadora de food cost, después la ingeniería de menú. No ponemos fecha a propósito: una función sale cuando está a la altura del ritmo de un servicio. ¿Quieres aportar ideas o probarla? Escribe a contact@savour.page. Lo demás que está previsto está en [Próximamente en Savour](/es/proximamente).'
      ]
    ],
    outro: 'Este artículo describe una función que estamos construyendo. Si algo cambia, lo actualizaremos aquí.'
  }
};

export const FOODCOST_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/calculateur-food-cost',
    title: 'Bientôt dans Savour : le calculateur de food cost',
    desc: 'Savour aura un calculateur de food cost : calcule le coût d’un plat ou de toute ta carte à partir de tes propres recettes, avec les prix de ton fournisseur et ta propre remise. Ensuite viendra le menu engineering, relié aux allergènes.',
    h1: 'Bientôt dans Savour : le calculateur de food cost',
    lead: 'Combien coûte vraiment cette assiette ? La plupart des chefs le savent à peu près. Avec le calculateur de food cost, tu le sais exactement, par plat et pour toute ta carte, et ça reste juste quand les prix changent.',
    brief: [
      'Une feuille de calcul qui calcule le food cost d’un plat ou d’un menu à partir des recettes déjà dans Savour.',
      'Tu as une liste de prix de ton fournisseur ? Tu la charges, avec la remise que tu as négociée. Tu calcules ainsi toujours avec tes propres prix à jour.',
      'Ensuite viendra le menu engineering : quels plats se vendent bien et rapportent bien, avec les allergènes juste à côté.'
    ],
    sections: [
      [
        'Qu’est-ce que le food cost ?',
        'Le food cost est la part du prix de vente qui part dans les ingrédients. On le calcule ainsi : le coût des ingrédients divisé par le prix de vente hors TVA, fois 100.\n\nUn exemple : si les ingrédients d’un plat coûtent 6,00 € et que tu le vends 24,00 € hors TVA, le food cost est de 25 %. Pour comparer : en 2024, les restaurants néerlandais ont consacré en moyenne 31,1 % de leurs recettes aux matières premières (CBS). Plus de chiffres dans [Combien coûte un restaurant ?](/fr/blog/couts-et-marges-restaurant).',
        { example: ['Exemple de calcul', ['Ingrédients par portion : 6,00 €', 'Prix de vente hors TVA : 24,00 €', 'Food cost : 6,00 ÷ 24,00 × 100 = 25 %']] }
      ],
      [
        'À partir de tes propres recettes',
        'Dans un tableur à part, tu tiens tout en double : la recette en cuisine et les quantités dans la feuille. Tu modifies la recette et la feuille n’est plus juste. Dans Savour, les quantités sont déjà dans tes recettes. Le calculateur les utilise, y compris via les recettes de base : le fond, la pâte et la sauce comptent dans le prix du plat qui les contient.\n\nSi tu travailles avec un rendement, comme 10 portions ou 2 litres, Savour calcule le prix par portion.'
      ],
      [
        'Tes prix, avec ta remise',
        'Chaque cuisine achète différemment. Tu calcules donc avec tes propres prix. Tu les saisis toi-même, ou tu charges la liste de prix de ton fournisseur si tu l’as. Tu as négocié une remise avec ton fournisseur ? Tu l’ajoutes. Tu calcules ainsi avec ce que tu paies vraiment, pas avec le prix catalogue.\n\nQuand la liste de prix change, tu charges la nouvelle et Savour recalcule tous tes plats. Tu vois tout de suite quel plat passe sous ton objectif à cause d’achats plus chers.',
        {
          check: [
            'Food cost par plat et par portion, y compris via les recettes de base.',
            'Food cost d’une carte entière.',
            'Saisir tes propres prix ou charger la liste de prix du fournisseur.',
            'Appliquer ta remise personnelle chez le fournisseur.',
            'Un pourcentage cible par plat, avec un avertissement quand tu le dépasses.'
          ],
          title: 'Ce que fera le calculateur'
        }
      ],
      [
        'Ensuite : le menu engineering',
        'Un food cost bas ne dit pas tout. Un plat à 22 % de food cost que presque personne ne commande rapporte moins qu’un plat à 32 % qui part tous les soirs. Le menu engineering met les deux côte à côte : combien de fois tu vends un plat, et combien tu gagnes par assiette.\n\nLe modèle connu vient de Kasavana et Smith (1982) et répartit ta carte en quatre groupes :',
        [
          '**Stars** : se vendent bien et rapportent bien. À garder tels quels.',
          '**Plowhorses** : se vendent bien mais rapportent peu. Revois la portion ou le prix.',
          '**Puzzles** : rapportent bien mais se vendent peu. Une meilleure place sur la carte ou une autre description.',
          '**Dogs** : se vendent peu et rapportent peu. Candidats au remplacement.'
        ]
      ],
      [
        'Tout est relié',
        'Comme tout dans Savour vient des mêmes recettes, tout est lié. Tu modifies une recette et le coût, l’analyse du menu et les [allergènes](/fr/allergenes-par-recette) changent en même temps. Tu remplaces la mayonnaise de la vinaigrette maison par une autre et tu vois aussitôt ce que ça coûte et si un allergène apparaît ou disparaît.'
      ],
      [
        'Quand ?',
        'Nous construisons d’abord le calculateur de food cost, puis le menu engineering. Il n’y a volontairement pas de date : une fonction sort quand elle est à la hauteur du rythme d’un service. Envie de donner ton avis ou de tester ? Écris à contact@savour.page. Le reste de ce qui est prévu se trouve sur [Bientôt dans Savour](/fr/bientot).'
      ]
    ],
    outro: 'Cet article décrit une fonction que nous construisons en ce moment. Si quelque chose change, nous le mettrons à jour ici.'
  }
};
