// Blog: Savour voor patissiers en banketbakkers (2026-11-20), in vijf talen. Klopt met js/features/scale.js
// (opbrengst, factor, "Meer omrekenen" met "Ik heb"), js/features/products.js (basisrecepten, allergenen, "kan per merk
// verschillen" bij chocolade), js/features/print.js (map printen, logo met Pro) en js/features/mep.js. Geen
// bakkerspercentages en geen kostprijs. Schermen: financiers uit de demo. Foto's: assets/keuken/patisserie-*.jpg.

const KEY = 'en/blog/savour-for-pastry-chefs-and-bakers';
const shots = lang => ({ batch: `/assets/app/patisserie-batch-${lang}.jpg`, recipe: `/assets/app/patisserie-recept-${lang}.jpg` });
const scale = { shot: '/assets/keuken/patisserie-weegschaal.jpg', wide: true };

export const PATISSERIE_POST = {
  id: 'patisserie',
  date: '2026-11-20',
  rich: true,
  photo: 'patisserieViennoiserie',
  nl: {
    slug: 'blog/savour-voor-patissiers-en-banketbakkers',
    title: 'Savour voor patissiers en banketbakkers',
    desc: 'Recepten tot op de gram, omrekenen op stuks of op wat je nog hebt, basisrecepten met hun allergenen en printen voor de bakkerij. Zo gebruik je Savour in de patisserie.',
    h1: 'Savour voor patissiers en banketbakkers',
    lead: 'In de keuken mag een saus een beetje anders, in de patisserie niet. Een recept is daar een formule, en die moet elke keer kloppen. Zo helpt Savour daarbij, van het oude schrift tot de serie van vandaag.',
    brief: [
      'Je recepten staan tot op de gram zoals je ze schreef; Savour verzint nooit iets.',
      'Omrekenen op stuks, op opbrengst of op wat je nog hebt liggen, zonder rekenmachine.',
      'Basisrecepten als crème pâtissière tellen mee in de allergenen van elk gebak.'
    ],
    sections: [
      [
        'Eerst je schriften overzetten',
        'De meeste patissiers hebben hun recepten in een schrift, een map met losse vellen of een Word-bestand. Savour leest Word, PDF en tekst gratis in, ook met honderden recepten in één bestand. Foto’s van handgeschreven recepten leest de AI, met Savour Pro. Twijfelt Savour ergens, dan zie je dat voordat er iets wordt opgeslagen.',
        {
          steps: [
            ['Kies Recept toevoegen → Importeren', 'Word, PDF, tekst of een foto van je schrift.'],
            ['Kijk het na', 'Elk recept staat los, met ingrediënten en bereiding; twijfel staat geel.'],
            ['Opslaan en indelen', 'Bijvoorbeeld een map per soort: deeg, crèmes, ijs, glaçages, viennoiserie.']
          ]
        }
      ],
      [
        'Omrekenen op stuks',
        'Een recept voor 24 financiers, en morgen heb je er 480 nodig voor een event? Vul de opbrengst in en Savour rekent alles om: 3 kg roomboter, 3,6 kg eiwit. Gram wordt kilo zodra het meer dan 10 kilo is, en het originele recept blijft altijd staan.',
        { ...scale, alt: 'Bloem op de weegschaal tussen suiker, boter en eidooiers', caption: 'Wegen blijft jouw werk; het rekenen doet Savour.' },
        { shot: shots('nl').batch, alt: 'Financiers in Savour op de telefoon, omgerekend naar 480 stuks', caption: 'Van 24 naar 480 financiers: alles rekent mee.' }
      ],
      [
        'Of op wat je nog hebt',
        'Ligt er nog 3 kg chocolade en wil je die opmaken? Kies ⋯ Meer omrekenen, vul bij "Ik heb" 3 kg chocolade in, en Savour rekent het hele recept terug op die hoeveelheid. Ook een eigen factor kan, zoals 2,5×.',
        { tip: ['Onderdelen houden het leesbaar', 'Zet kopjes als "Voor het deeg:" en "Voor de vulling:" tussen je ingrediënten. Savour houdt ze apart, ook als je omrekent of print.'] }
      ],
      [
        'Allergenen, ook via je basisrecepten',
        'Een crème pâtissière, een zanddeeg of een glaçage gebruik je in tien gebakjes. Koppel ze als basisrecept, dan tellen hun allergenen mee in elk gebak dat ermee gemaakt wordt. Savour zoekt bij elk ingrediënt de allergenen op: bloem is gluten, eiwit ei, boter melk, amandelmeel noten.',
        { shot: shots('nl').recipe, alt: 'Financiers in Savour met de allergenen gluten, ei, melk en noten', caption: 'Gluten, ei, melk en noten: Savour vindt ze zelf.' },
        { warn: ['Chocolade verschilt per merk', 'Bij chocolade, couverture en vergelijkbare producten staat "kan per merk verschillen". Savour zegt nooit dat iets allergeenvrij is zolang niet alles is nagekeken; het etiket van je leverancier gaat voor.'] }
      ],
      [
        'Printen voor de bakkerij',
        'Print een los recept of een hele map in één keer, omgerekend als je wilt, met of zonder allergenen. Met Savour Pro staat het logo van je zaak erop. En wat er vandaag klaar moet staan, zet je in een [MEP-lijst](/blog/mep-lijsten-in-savour) die je team afvinkt.'
      ],
      [
        'Wat Savour (nog) niet doet',
        'Rekenen met bakkerspercentages kan Savour niet, en een kostprijs per gebak ook nog niet; die staat op [Binnenkort](/binnenkort). Je rekent om op opbrengst, op stuks, met een factor of op een ingrediënt dat je hebt.'
      ],
      [
        'Wat kost het?',
        'Gratis tot 100 recepten. [Savour Pro](/savour-pro) kost €2,99 per maand of €29 per jaar, met onbeperkt recepten, allergenen, AI voor foto’s en printen met je logo. Nieuwe accounts krijgen 7 dagen Pro gratis. Meer op [Voor patissiers en banketbakkers](/voor-patissiers-en-banketbakkers).'
      ]
    ],
    outro: 'Deze uitleg beschrijft Savour zoals het nu live staat. Mis je iets in de patisserie? Vertel het in de Community.'
  },
  en: {
    slug: KEY,
    title: 'Savour for pastry chefs and bakers',
    desc: 'Recipes to the gram, scaling by pieces or by what you have left, base recipes with their allergens and printing for the bakery. How to use Savour in pastry.',
    h1: 'Savour for pastry chefs and bakers',
    lead: 'In the kitchen a sauce may turn out a little different; in pastry it may not. There a recipe is a formula, and it has to be right every time. This is how Savour helps, from the old notebook to today’s batch.',
    brief: [
      'Your recipes stay to the gram exactly as you wrote them; Savour never invents anything.',
      'Scale by pieces, by yield or by what you have left, without a calculator.',
      'Base recipes such as crème pâtissière count in the allergens of every pastry.'
    ],
    sections: [
      [
        'First bring your notebooks over',
        'Most pastry chefs keep their recipes in a notebook, a binder of loose sheets or a Word file. Savour reads Word, PDF and text for free, even with hundreds of recipes in one file. Photos of handwritten recipes are read by the AI, with Savour Pro. If Savour is unsure about something, you see it before anything is saved.',
        {
          steps: [
            ['Choose Add recipe → Import', 'Word, PDF, text or a photo of your notebook.'],
            ['Check it', 'Every recipe stands on its own, with ingredients and method; doubts are yellow.'],
            ['Save and sort', 'For example a folder per kind: doughs, creams, ice cream, glazes, viennoiserie.']
          ]
        }
      ],
      [
        'Scaling by pieces',
        'A recipe for 24 financiers, and tomorrow you need 480 for an event? Enter the yield and Savour converts everything: 3 kg of butter, 3.6 kg of egg white. Grams become kilos once it is more than 10 kilos, and the original recipe always stays as it is.',
        { ...scale, alt: 'Flour on the scale between sugar, butter and egg yolks', caption: 'Weighing stays your job; Savour does the maths.' },
        { shot: shots('en').batch, alt: 'Financiers in Savour on a phone, scaled to 480 pieces', caption: 'From 24 to 480 financiers: everything follows.' }
      ],
      [
        'Or by what you have',
        'Still 3 kg of chocolate on the shelf that you want to use up? Choose ⋯ More scaling options, enter 3 kg of chocolate under "I have", and Savour scales the whole recipe to that amount. A factor of your own works too, such as 2.5×.',
        { tip: ['Parts keep it readable', 'Put headings like "For the dough:" and "For the filling:" between your ingredients. Savour keeps them apart, also when you scale or print.'] }
      ],
      [
        'Allergens, also through your base recipes',
        'A crème pâtissière, a sweet pastry or a glaze ends up in ten different pastries. Link them as base recipes and their allergens count in every pastry made with them. Savour looks up the allergens of every ingredient: flour is gluten, egg white is egg, butter is milk, almond flour is nuts.',
        { shot: shots('en').recipe, alt: 'Financiers in Savour with the allergens gluten, egg, milk and nuts', caption: 'Gluten, egg, milk and nuts: Savour finds them itself.' },
        { warn: ['Chocolate differs by brand', 'Chocolate, couverture and similar products are marked "may differ by brand". Savour never says something is allergen-free while not everything is checked; your supplier’s label comes first.'] }
      ],
      [
        'Printing for the bakery',
        'Print a single recipe or a whole folder at once, scaled if you like, with or without allergens. With Savour Pro your business logo is on it. And what has to be ready today goes into a [prep list](/en/blog/prep-lists-in-savour) your team ticks off.'
      ],
      [
        'What Savour does not do (yet)',
        'Savour cannot work with baker’s percentages, and it cannot calculate a cost per pastry yet; that is on [Coming soon](/en/roadmap). You scale by yield, by pieces, by a factor or by an ingredient you have.'
      ],
      [
        'What does it cost?',
        'Free up to 100 recipes. [Savour Pro](/en/pro) costs €2.99 per month or €29 per year, with unlimited recipes, allergens, AI for photos and printing with your logo. New accounts get 7 days of Pro for free. More on [For pastry chefs and bakers](/en/for-pastry-chefs-and-bakers).'
      ]
    ],
    outro: 'This explains Savour as it is live today. Missing something in pastry? Tell us in the Community.'
  }
};

export const PATISSERIE_POST_DE = {
  [KEY]: {
    slug: 'de/blog/savour-fuer-patissiers-und-konditoren',
    title: 'Savour für Patissiers und Konditoren',
    desc: 'Rezepte aufs Gramm, Umrechnen nach Stück oder nach dem, was noch da ist, Grundrezepte mit ihren Allergenen und Drucken für die Backstube. So nutzt du Savour in der Patisserie.',
    h1: 'Savour für Patissiers und Konditoren',
    lead: 'In der Küche darf eine Sauce mal etwas anders werden, in der Patisserie nicht. Dort ist ein Rezept eine Formel, und die muss jedes Mal stimmen. So hilft Savour dabei, vom alten Heft bis zur Menge von heute.',
    brief: [
      'Deine Rezepte stehen aufs Gramm so, wie du sie geschrieben hast; Savour erfindet nie etwas.',
      'Umrechnen nach Stück, nach Menge oder nach dem, was noch da ist, ohne Taschenrechner.',
      'Grundrezepte wie Crème pâtissière zählen bei den Allergenen jedes Gebäcks mit.'
    ],
    sections: [
      [
        'Zuerst die Hefte übernehmen',
        'Die meisten Patissiers haben ihre Rezepte in einem Heft, einem Ordner mit losen Blättern oder einer Word-Datei. Savour liest Word, PDF und Text kostenlos ein, auch mit Hunderten Rezepten in einer Datei. Fotos handschriftlicher Rezepte liest die KI, mit Savour Pro. Ist Savour sich irgendwo unsicher, siehst du das, bevor etwas gespeichert wird.',
        {
          steps: [
            ['Wähle Rezept hinzufügen → Importieren', 'Word, PDF, Text oder ein Foto deines Hefts.'],
            ['Prüfen', 'Jedes Rezept steht für sich, mit Zutaten und Zubereitung; Zweifel sind gelb.'],
            ['Speichern und ordnen', 'Zum Beispiel ein Ordner pro Art: Teige, Cremes, Eis, Glasuren, Viennoiserie.']
          ]
        }
      ],
      [
        'Umrechnen nach Stück',
        'Ein Rezept für 24 Financiers, und morgen brauchst du 480 für ein Event? Trag die Menge ein und Savour rechnet alles um: 3 kg Butter, 3,6 kg Eiweiß. Gramm wird zu Kilo, sobald es mehr als 10 Kilo sind, und das Originalrezept bleibt immer, wie es ist.',
        { ...scale, alt: 'Mehl auf der Waage zwischen Zucker, Butter und Eigelb', caption: 'Wiegen bleibt deine Arbeit; das Rechnen macht Savour.' },
        { shot: shots('de').batch, alt: 'Financiers in Savour auf dem Handy, umgerechnet auf 480 Stück', caption: 'Von 24 auf 480 Financiers: alles rechnet mit.' }
      ],
      [
        'Oder nach dem, was da ist',
        'Liegen noch 3 kg Schokolade da, die weg müssen? Wähle ⋯ Mehr umrechnen, trag bei „Ich habe“ 3 kg Schokolade ein, und Savour rechnet das ganze Rezept auf diese Menge um. Auch ein eigener Faktor geht, etwa 2,5×.',
        { tip: ['Komponenten halten es lesbar', 'Setz Überschriften wie „Für den Teig:“ und „Für die Füllung:“ zwischen deine Zutaten. Savour hält sie getrennt, auch beim Umrechnen und Drucken.'] }
      ],
      [
        'Allergene, auch über Grundrezepte',
        'Eine Crème pâtissière, ein Mürbeteig oder eine Glasur landet in zehn verschiedenen Gebäcken. Verknüpf sie als Grundrezepte, dann zählen ihre Allergene in jedem Gebäck mit, das damit gemacht wird. Savour sucht die Allergene jeder Zutat heraus: Mehl ist Gluten, Eiweiß ist Ei, Butter ist Milch, Mandelmehl sind Nüsse.',
        { shot: shots('de').recipe, alt: 'Financiers in Savour mit den Allergenen Gluten, Ei, Milch und Nüsse', caption: 'Gluten, Ei, Milch und Nüsse: Savour findet sie selbst.' },
        { warn: ['Schokolade ist je Marke verschieden', 'Bei Schokolade, Kuvertüre und ähnlichen Produkten steht „kann je nach Marke abweichen“. Savour sagt nie, dass etwas allergenfrei ist, solange nicht alles geprüft ist; das Etikett deines Lieferanten geht vor.'] }
      ],
      [
        'Drucken für die Backstube',
        'Druck ein einzelnes Rezept oder einen ganzen Ordner auf einmal, auf Wunsch umgerechnet, mit oder ohne Allergene. Mit Savour Pro steht das Logo deines Betriebs darauf. Und was heute bereitstehen muss, kommt auf eine [MEP-Liste](/de/blog/mep-listen-in-savour), die dein Team abhakt.'
      ],
      [
        'Was Savour (noch) nicht kann',
        'Mit Bäckerprozenten rechnen kann Savour nicht, und einen Preis pro Gebäck auch noch nicht; der steht unter [Demnächst](/de/demnaechst). Du rechnest nach Menge, nach Stück, mit einem Faktor oder nach einer Zutat um, die du hast.'
      ],
      [
        'Was kostet es?',
        'Kostenlos bis 100 Rezepte. [Savour Pro](/de/preise) kostet 2,99 € pro Monat oder 29 € pro Jahr, mit unbegrenzt Rezepten, Allergenen, KI für Fotos und Drucken mit deinem Logo. Neue Konten bekommen 7 Tage Pro gratis. Mehr unter [Für Patissiers und Konditoren](/de/fuer-patissiers-und-konditoren).'
      ]
    ],
    outro: 'Diese Erklärung beschreibt Savour, wie es jetzt live ist. Fehlt dir etwas in der Patisserie? Sag es in der Community.'
  }
};

export const PATISSERIE_POST_ES = {
  [KEY]: {
    slug: 'es/blog/savour-para-pasteleros-y-reposteros',
    title: 'Savour para pasteleros y reposteros',
    desc: 'Recetas al gramo, escalar por unidades o por lo que te queda, recetas base con sus alérgenos e impresión para el obrador. Así usas Savour en pastelería.',
    h1: 'Savour para pasteleros y reposteros',
    lead: 'En la cocina una salsa puede salir algo distinta; en pastelería no. Allí una receta es una fórmula, y tiene que salir bien cada vez. Así ayuda Savour, del cuaderno antiguo a la tanda de hoy.',
    brief: [
      'Tus recetas quedan al gramo tal como las escribiste; Savour nunca inventa nada.',
      'Escalar por unidades, por rendimiento o por lo que te queda, sin calculadora.',
      'Las recetas base como la crema pastelera cuentan en los alérgenos de cada pastel.'
    ],
    sections: [
      [
        'Primero pasa tus cuadernos',
        'La mayoría de los pasteleros guarda sus recetas en un cuaderno, una carpeta de hojas sueltas o un Word. Savour lee Word, PDF y texto gratis, también con cientos de recetas en un archivo. Las fotos de recetas a mano las lee la IA, con Savour Pro. Si Savour duda en algo, lo ves antes de guardar.',
        {
          steps: [
            ['Elige Añadir receta → Importar', 'Word, PDF, texto o una foto de tu cuaderno.'],
            ['Revísalo', 'Cada receta va por separado, con ingredientes y elaboración; las dudas en amarillo.'],
            ['Guardar y ordenar', 'Por ejemplo una carpeta por tipo: masas, cremas, helados, glaseados, bollería.']
          ]
        }
      ],
      [
        'Escalar por unidades',
        '¿Una receta para 24 financiers y mañana necesitas 480 para un evento? Indica el rendimiento y Savour lo convierte todo: 3 kg de mantequilla, 3,6 kg de clara. Los gramos pasan a kilos a partir de 10 kilos, y la receta original siempre se queda como está.',
        { ...scale, alt: 'Harina en la báscula entre azúcar, mantequilla y yemas', caption: 'Pesar sigue siendo tu trabajo; Savour hace las cuentas.' },
        { shot: shots('es').batch, alt: 'Financiers en Savour en el móvil, escalados a 480 unidades', caption: 'De 24 a 480 financiers: todo se recalcula.' }
      ],
      [
        'O por lo que tienes',
        '¿Quedan 3 kg de chocolate que quieres aprovechar? Elige ⋯ Más opciones de escala, escribe 3 kg de chocolate en «Tengo» y Savour calcula toda la receta a esa cantidad. También vale un factor propio, como 2,5×.',
        { tip: ['Las elaboraciones lo hacen legible', 'Pon encabezados como «Para la masa:» y «Para el relleno:» entre tus ingredientes. Savour los mantiene separados, también al escalar o imprimir.'] }
      ],
      [
        'Alérgenos, también a través de tus recetas base',
        'Una crema pastelera, una masa sablée o un glaseado acaban en diez pasteles distintos. Vincúlalos como recetas base y sus alérgenos cuentan en cada pastel que los lleva. Savour busca los alérgenos de cada ingrediente: la harina es gluten, la clara huevo, la mantequilla leche, la harina de almendra frutos de cáscara.',
        { shot: shots('es').recipe, alt: 'Financiers en Savour con los alérgenos gluten, huevo, leche y frutos de cáscara', caption: 'Gluten, huevo, leche y frutos de cáscara: Savour los encuentra solo.' },
        { warn: ['El chocolate cambia según la marca', 'Con el chocolate, la cobertura y productos similares aparece «puede variar según la marca». Savour nunca dice que algo no tiene alérgenos mientras no esté todo revisado; la etiqueta de tu proveedor manda.'] }
      ],
      [
        'Imprimir para el obrador',
        'Imprime una receta o una carpeta entera de una vez, escalada si quieres, con o sin alérgenos. Con Savour Pro lleva el logo de tu negocio. Y lo que debe estar listo hoy va a una [lista MEP](/es/blog/listas-mep-en-savour) que tu equipo marca.'
      ],
      [
        'Lo que Savour (aún) no hace',
        'Savour no trabaja con porcentajes de panadero, ni calcula todavía un coste por pastel; eso está en [Próximamente](/es/proximamente). Escalas por rendimiento, por unidades, con un factor o según un ingrediente que tienes.'
      ],
      [
        '¿Cuánto cuesta?',
        'Gratis hasta 100 recetas. [Savour Pro](/es/precios) cuesta 2,99 € al mes o 29 € al año, con recetas ilimitadas, alérgenos, IA para fotos e impresión con tu logo. Las cuentas nuevas tienen 7 días de Pro gratis. Más en [Para pasteleros y reposteros](/es/para-pasteleros-y-reposteros).'
      ]
    ],
    outro: 'Esta explicación describe Savour tal como está ahora. ¿Te falta algo en pastelería? Cuéntalo en la Comunidad.'
  }
};

export const PATISSERIE_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/savour-pour-patissiers-et-boulangers',
    title: 'Savour pour pâtissiers et boulangers',
    desc: 'Des recettes au gramme près, la conversion à la pièce ou selon ce qui reste, les recettes de base avec leurs allergènes et l’impression pour le fournil. Comment utiliser Savour en pâtisserie.',
    h1: 'Savour pour pâtissiers et boulangers',
    lead: 'En cuisine, une sauce peut varier un peu ; en pâtisserie, non. Là, une recette est une formule, et elle doit être juste à chaque fois. Voici comment Savour aide, du vieux cahier à la fournée du jour.',
    brief: [
      'Tes recettes restent au gramme près comme tu les as écrites ; Savour n’invente jamais rien.',
      'Convertir à la pièce, selon le rendement ou selon ce qui reste, sans calculatrice.',
      'Les recettes de base comme la crème pâtissière comptent dans les allergènes de chaque gâteau.'
    ],
    sections: [
      [
        'D’abord reprendre tes cahiers',
        'La plupart des pâtissiers gardent leurs recettes dans un cahier, un classeur de feuilles volantes ou un fichier Word. Savour lit Word, PDF et texte gratuitement, même avec des centaines de recettes dans un fichier. Les photos de recettes manuscrites sont lues par l’IA, avec Savour Pro. Si Savour a un doute, tu le vois avant tout enregistrement.',
        {
          steps: [
            ['Choisis Ajouter une recette → Importer', 'Word, PDF, texte ou une photo de ton cahier.'],
            ['Vérifie', 'Chaque recette est à part, avec ingrédients et préparation ; les doutes sont en jaune.'],
            ['Enregistre et range', 'Par exemple un dossier par type : pâtes, crèmes, glaces, glaçages, viennoiserie.']
          ]
        }
      ],
      [
        'Convertir à la pièce',
        'Une recette pour 24 financiers, et demain il t’en faut 480 pour un événement ? Indique le rendement et Savour convertit tout : 3 kg de beurre, 3,6 kg de blanc d’œuf. Les grammes deviennent des kilos au-delà de 10 kilos, et la recette d’origine reste toujours telle quelle.',
        { ...scale, alt: 'De la farine sur la balance entre sucre, beurre et jaunes d’œuf', caption: 'Peser reste ton travail ; Savour fait les calculs.' },
        { shot: shots('fr').batch, alt: 'Des financiers dans Savour sur un téléphone, convertis à 480 pièces', caption: 'De 24 à 480 financiers : tout suit.' }
      ],
      [
        'Ou selon ce que tu as',
        'Il reste 3 kg de chocolat à utiliser ? Choisis ⋯ Plus d’options de conversion, indique 3 kg de chocolat à « J’ai », et Savour recalcule toute la recette sur cette quantité. Un facteur à toi marche aussi, comme 2,5×.',
        { tip: ['Les préparations gardent la lisibilité', 'Mets des intitulés comme « Pour la pâte : » et « Pour la garniture : » entre tes ingrédients. Savour les garde séparés, aussi quand tu convertis ou imprimes.'] }
      ],
      [
        'Les allergènes, aussi via tes recettes de base',
        'Une crème pâtissière, une pâte sucrée ou un glaçage se retrouvent dans dix gâteaux différents. Relie-les comme recettes de base, et leurs allergènes comptent dans chaque pâtisserie qui les utilise. Savour cherche les allergènes de chaque ingrédient : la farine, c’est le gluten ; le blanc, l’œuf ; le beurre, le lait ; la poudre d’amande, les fruits à coque.',
        { shot: shots('fr').recipe, alt: 'Des financiers dans Savour avec les allergènes gluten, œuf, lait et fruits à coque', caption: 'Gluten, œuf, lait et fruits à coque : Savour les trouve tout seul.' },
        { warn: ['Le chocolat varie selon la marque', 'Pour le chocolat, la couverture et les produits similaires, Savour indique « peut varier selon la marque ». Savour ne dit jamais que quelque chose est sans allergènes tant que tout n’est pas vérifié ; l’étiquette de ton fournisseur passe en premier.'] }
      ],
      [
        'Imprimer pour le fournil',
        'Imprime une recette ou tout un dossier en une fois, converti si tu veux, avec ou sans allergènes. Avec Savour Pro, le logo de ta maison y figure. Et ce qui doit être prêt aujourd’hui va dans une [liste MEP](/fr/blog/listes-mep-dans-savour) que ton équipe coche.'
      ],
      [
        'Ce que Savour ne fait pas (encore)',
        'Savour ne travaille pas en pourcentages du boulanger, et ne calcule pas encore de coût par pâtisserie ; c’est sur [Bientôt](/fr/bientot). Tu convertis selon le rendement, à la pièce, avec un facteur ou selon un ingrédient que tu as.'
      ],
      [
        'Combien ça coûte ?',
        'Gratuit jusqu’à 100 recettes. [Savour Pro](/fr/tarifs) coûte 2,99 € par mois ou 29 € par an, avec recettes illimitées, allergènes, IA pour les photos et impression avec ton logo. Les nouveaux comptes ont 7 jours de Pro offerts. Plus sur [Pour les pâtissiers et boulangers](/fr/pour-patissiers-et-boulangers).'
      ]
    ],
    outro: 'Cette explication décrit Savour tel qu’il est en ligne aujourd’hui. Il te manque quelque chose en pâtisserie ? Dis-le dans la Communauté.'
  }
};
