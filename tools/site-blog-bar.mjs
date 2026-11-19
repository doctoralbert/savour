// Blog: Savour voor bartenders (2026-11-19), in vijf talen. Klopt met js/features/scale.js (dashes, barspoons, oz bij
// een drank blijft oz, "top up" wordt niet omgerekend, enkelvoud/meervoud ook bij de opbrengst), de lezer-test met een
// cocktailkaart (tests/lezer.test.mjs), cocktails onder Dranken (js/data/default-categories.js) en de barproducten in
// de Savour-lijst (supabase/2026-11-19-ingredienten-bar.sql). Schermen: een Whiskey Sour die alleen voor de foto aan de
// demo is toegevoegd (assets/app/bar-batch- en bar-recept-<taal>.jpg).

const KEY = 'en/blog/savour-for-bartenders';
const shots = lang => ({ batch: `/assets/app/bar-batch-${lang}.jpg`, recipe: `/assets/app/bar-recept-${lang}.jpg` });

export const BAR_POST = {
  id: 'bar',
  date: '2026-11-19',
  rich: true,
  nl: {
    slug: 'blog/savour-voor-bartenders',
    title: 'Savour voor bartenders: specs, batches en allergenen',
    desc: 'Cocktailspecs, siropen en cordials op één plek, batchen in cl, oz en dashes zonder rekenfouten, allergenen per drank en je hele barteam met dezelfde specs. Zo gebruik je Savour aan de bar.',
    h1: 'Savour voor bartenders: zo werkt het aan de bar',
    lead: 'Savour is gemaakt in de keuken, maar een spec is ook een recept. Wat een kok nodig heeft, heeft een bartender ook: dat het klopt, dat het team hetzelfde doet en dat je snel kunt omrekenen. Daarom werkt Savour nu ook goed aan de bar.',
    brief: [
      'Al je specs, siropen en cordials in één receptenboek, met mappen voor de vaste kaart en het seizoen.',
      'Batchen in cl, ml, oz, dashes en barspoons: van één glas naar 40, zonder rekenmachine.',
      'Allergenen per drank (eiwit, room, orgeat, vermout) en één versie van elke spec voor het hele team.'
    ],
    sections: [
      [
        'Eén plek voor je specs',
        'Bij veel bars staan de specs verspreid: in een schrift achter de bar, in een Word-bestand van de vorige bar manager en in de hoofden van de vaste bartenders. In Savour staan ze bij elkaar. Maak mappen zoals jouw bar werkt: de vaste kaart, de seizoenskaart, siropen en cordials, en tests die nog niet op de kaart staan. Bekende cocktails, zoals een Negroni, Mojito of Whiskey Sour, komen in een nieuw account vanzelf onder Dranken.'
      ],
      [
        'Je specs overzetten',
        'Je hoeft niets over te typen. De Savour-lezer leest een cocktailkaart uit Word, PDF of tekst, ook met cl, oz, dashes en barspoons, en splitst meerdere cocktails in één bestand vanzelf op. Een foto van je specboek leest de AI, met Savour Pro. Savour verzint nooit een hoeveelheid: wat het niet zeker weet, zie je voordat er iets wordt opgeslagen.',
        {
          steps: [
            ['Kies Recept toevoegen → Importeren', 'Word, PDF, tekst of een foto van je specboek.'],
            ['Kijk het na', 'Elke cocktail staat los, met ingrediënten en bereiding.'],
            ['Opslaan', 'Zet ze daarna in je mappen of in het team van je bar.']
          ]
        }
      ],
      [
        'Batchen zonder rekenfouten',
        'Voor een event of een drukke avond zet je cocktails vooraf klaar. Kies 10× of vul zelf in hoeveel glazen je nodig hebt, en Savour rekent alles om. 2 dashes Angostura worden 20 dashes, 1 barspoon wordt 8 barspoons en "1 glas" wordt "10 glazen". Ounces bij een drank blijven ounces: 16 oz gin wordt geen pond. Wat je per glas schenkt, zoals "top up met soda", blijft staan zoals het staat. Het originele recept verandert nooit.',
        { shot: shots('nl').batch, alt: 'Een Whiskey Sour in Savour op de telefoon, tien keer omgerekend', caption: 'Tien keer een Whiskey Sour: 50 cl bourbon, 10 eiwitten en 20 dashes Angostura.' }
      ],
      [
        'Allergenen per drank',
        'Een gast vraagt of er ei in de sour zit. In Savour staat het bij de drank: Savour zoekt bij elk ingrediënt de allergenen op en telt ze op, ook als ze uit je eigen siroop of cordial komen. Eiwit is ei, room en Baileys zijn melk, orgeat, falernum en Frangelico zijn noten, en vermout, sherry en prosecco bevatten sulfiet. Wil je alcohol ook als allergeen tonen, dan zet je dat zelf aan.',
        { shot: shots('nl').recipe, alt: 'Een Whiskey Sour in Savour met het allergeen ei', caption: 'Het eiwit in de sour is meteen herkend: ei.' },
        { warn: ['Controleer het etiket', 'Likeuren en bitters verschillen per merk. Savour zegt nooit dat een drank allergeenvrij is zolang niet alles is nagekeken; het etiket van je leverancier gaat altijd voor.'] }
      ],
      [
        'Eén versie voor het hele team',
        'Maak een team voor je bar (in Savour heet dat een keukenteam) en nodig je collega’s uit op hun e-mailadres. Iedereen werkt met dezelfde specs; past de bar manager een spec aan, dan ziet het hele team de nieuwe versie meteen. Meekijken en omrekenen kan met een gratis account, ook op de telefoon achter de bar.'
      ],
      [
        'Mise-en-place voor de bar',
        'Citrus persen, siropen maken, garnituren snijden: zet het in een MEP-lijst en vink af wat klaarstaat, samen met je team. Lees hoe dat werkt in [MEP-lijsten in Savour](/blog/mep-lijsten-in-savour).'
      ],
      [
        'Wat kost het?',
        'Gratis tot 100 recepten, met de Savour-lezer. [Savour Pro](/savour-pro) kost €2,99 per maand of €29 per jaar: onbeperkt recepten, teams, AI voor foto’s en allergenen. Nieuwe accounts krijgen 7 dagen Pro gratis. Meer over Savour aan de bar lees je op [Voor bartenders](/voor-bartenders).'
      ]
    ],
    outro: 'Deze uitleg beschrijft Savour zoals het nu live staat. Mis je iets aan de bar? Vertel het in de Community; we lezen alles.'
  },
  en: {
    slug: KEY,
    title: 'Savour for bartenders: specs, batches and allergens',
    desc: 'Cocktail specs, syrups and cordials in one place, batching in cl, oz and dashes without mistakes, allergens per drink and your whole bar team on the same specs. How to use Savour behind the bar.',
    h1: 'Savour for bartenders: how it works behind the bar',
    lead: 'Savour was made in the kitchen, but a spec is a recipe too. What a cook needs, a bartender needs as well: that it is right, that the team does the same and that you can scale quickly. That is why Savour now works well behind the bar too.',
    brief: [
      'All your specs, syrups and cordials in one recipe book, with folders for the house menu and the season.',
      'Batching in cl, ml, oz, dashes and barspoons: from one glass to 40, without a calculator.',
      'Allergens per drink (egg white, cream, orgeat, vermouth) and one version of every spec for the whole team.'
    ],
    sections: [
      [
        'One place for your specs',
        'In many bars the specs are scattered: in a notebook behind the bar, in a Word file from the previous bar manager and in the heads of the regular bartenders. In Savour they are together. Create folders the way your bar works: the house menu, the seasonal menu, syrups and cordials, and tests that are not on the menu yet. Well-known cocktails such as a Negroni, Mojito or Whiskey Sour land under Drinks by themselves in a new account.'
      ],
      [
        'Bring your specs over',
        'There is nothing to retype. The Savour reader reads a cocktail menu from Word, PDF or text, with cl, oz, dashes and barspoons, and splits several cocktails in one file by itself. A photo of your spec book is read by the AI, with Savour Pro. Savour never invents a quantity: whatever it is unsure about, you see before anything is saved.',
        {
          steps: [
            ['Choose Add recipe → Import', 'Word, PDF, text or a photo of your spec book.'],
            ['Check it', 'Every cocktail stands on its own, with ingredients and method.'],
            ['Save', 'Then put them in your folders or in your bar’s team.']
          ]
        }
      ],
      [
        'Batching without mistakes',
        'For an event or a busy night you batch cocktails in advance. Choose 10× or enter how many glasses you need, and Savour converts everything. 2 dashes of Angostura become 20 dashes, 1 barspoon becomes 8 barspoons and "1 glass" becomes "10 glasses". Ounces in a drink stay ounces: 16 oz of gin does not turn into a pound. What you pour per glass, such as "top up with soda", stays as it is. The original recipe never changes.',
        { shot: shots('en').batch, alt: 'A Whiskey Sour in Savour on a phone, scaled ten times', caption: 'Ten Whiskey Sours: 20 oz bourbon, 10 egg whites and 20 dashes of Angostura.' }
      ],
      [
        'Allergens per drink',
        'A guest asks whether there is egg in the sour. In Savour it is on the drink: Savour looks up the allergens of every ingredient and adds them up, even when they come from your own syrup or cordial. Egg white is egg, cream and Baileys are milk, orgeat, falernum and Frangelico are nuts, and vermouth, sherry and prosecco contain sulphites. Want to show alcohol as an allergen too? You switch that on yourself.',
        { shot: shots('en').recipe, alt: 'A Whiskey Sour in Savour with the allergen egg', caption: 'The egg white in the sour is recognised straight away: egg.' },
        { warn: ['Check the label', 'Liqueurs and bitters differ by brand. Savour never says a drink is allergen-free while not everything is checked; your supplier’s label always comes first.'] }
      ],
      [
        'One version for the whole team',
        'Create a team for your bar (in Savour it is called a kitchen team) and invite your colleagues by email. Everyone works from the same specs; when the bar manager changes a spec, the whole team sees the new version straight away. Viewing and scaling work with a free account, on the phone behind the bar too.'
      ],
      [
        'Mise en place for the bar',
        'Squeezing citrus, making syrups, cutting garnishes: put it in a prep list and tick off what is ready, together with your team. Read how it works in [Prep lists in Savour](/en/blog/prep-lists-in-savour).'
      ],
      [
        'What does it cost?',
        'Free up to 100 recipes, with the Savour reader. [Savour Pro](/en/pro) costs €2.99 per month or €29 per year: unlimited recipes, teams, AI for photos and allergens. New accounts get 7 days of Pro for free. Read more about Savour behind the bar on [For bartenders](/en/for-bartenders).'
      ]
    ],
    outro: 'This explains Savour as it is live today. Missing something behind the bar? Tell us in the Community; we read everything.'
  }
};

export const BAR_POST_DE = {
  [KEY]: {
    slug: 'de/blog/savour-fuer-bartender',
    title: 'Savour für Bartender: Specs, Batches und Allergene',
    desc: 'Cocktail-Specs, Sirupe und Cordials an einem Ort, Batches in cl, oz und Dashes ohne Rechenfehler, Allergene pro Drink und dein ganzes Barteam mit denselben Specs. So nutzt du Savour hinter der Bar.',
    h1: 'Savour für Bartender: so funktioniert es hinter der Bar',
    lead: 'Savour ist in der Küche entstanden, aber eine Spec ist auch ein Rezept. Was ein Koch braucht, braucht ein Bartender auch: dass es stimmt, dass das Team dasselbe macht und dass man schnell umrechnen kann. Deshalb funktioniert Savour jetzt auch hinter der Bar gut.',
    brief: [
      'Alle Specs, Sirupe und Cordials in einem Rezeptbuch, mit Ordnern für die feste Karte und die Saison.',
      'Batches in cl, ml, oz, Dashes und Barspoons: von einem Glas auf 40, ohne Taschenrechner.',
      'Allergene pro Drink (Eiweiß, Sahne, Orgeat, Wermut) und eine Version jeder Spec für das ganze Team.'
    ],
    sections: [
      [
        'Ein Ort für deine Specs',
        'In vielen Bars sind die Specs verstreut: in einem Heft hinter der Bar, in einer Word-Datei des vorigen Barmanagers und in den Köpfen der festen Bartender. In Savour stehen sie zusammen. Leg Ordner an, wie deine Bar arbeitet: feste Karte, Saisonkarte, Sirupe und Cordials und Tests, die noch nicht auf der Karte stehen. Bekannte Cocktails wie Negroni, Mojito oder Whiskey Sour landen in einem neuen Konto von selbst unter Getränke.'
      ],
      [
        'Deine Specs übernehmen',
        'Du musst nichts abtippen. Der Savour-Leser liest eine Cocktailkarte aus Word, PDF oder Text, mit cl, oz, Dashes und Barspoons, und teilt mehrere Cocktails in einer Datei selbst auf. Ein Foto deines Spec-Buchs liest die KI, mit Savour Pro. Savour erfindet nie eine Menge: was es nicht sicher weiß, siehst du, bevor etwas gespeichert wird.',
        {
          steps: [
            ['Wähle Rezept hinzufügen → Importieren', 'Word, PDF, Text oder ein Foto deines Spec-Buchs.'],
            ['Prüfen', 'Jeder Cocktail steht für sich, mit Zutaten und Zubereitung.'],
            ['Speichern', 'Danach in deine Ordner oder ins Team deiner Bar.']
          ]
        }
      ],
      [
        'Batchen ohne Rechenfehler',
        'Für ein Event oder einen vollen Abend bereitest du Cocktails vor. Wähle 10× oder gib ein, wie viele Gläser du brauchst, und Savour rechnet alles um. 2 Dashes Angostura werden 20 Dashes und 1 Barspoon wird 8 Barspoons. Unzen bei einem Drink bleiben Unzen: 16 oz Gin werden kein Pfund. Was du pro Glas aufgießt, etwa „Top up mit Soda“, bleibt, wie es ist. Das Originalrezept ändert sich nie.',
        { shot: shots('de').batch, alt: 'Ein Whiskey Sour in Savour auf dem Handy, zehnfach umgerechnet', caption: 'Zehnmal Whiskey Sour: 50 cl Bourbon, 10 Eiweiß und 20 Dashes Angostura.' }
      ],
      [
        'Allergene pro Drink',
        'Ein Gast fragt, ob Ei im Sour ist. In Savour steht es beim Drink: Savour sucht die Allergene jeder Zutat heraus und zählt sie zusammen, auch wenn sie aus deinem eigenen Sirup oder Cordial kommen. Eiweiß ist Ei, Sahne und Baileys sind Milch, Orgeat, Falernum und Frangelico sind Nüsse, und Wermut, Sherry und Prosecco enthalten Sulfite. Willst du Alkohol auch als Allergen zeigen, schaltest du das selbst ein.',
        { shot: shots('de').recipe, alt: 'Ein Whiskey Sour in Savour mit dem Allergen Ei', caption: 'Das Eiweiß im Sour wird sofort erkannt: Ei.' },
        { warn: ['Prüf das Etikett', 'Liköre und Bitters sind je Marke verschieden. Savour sagt nie, dass ein Drink allergenfrei ist, solange nicht alles geprüft ist; das Etikett deines Lieferanten geht immer vor.'] }
      ],
      [
        'Eine Version für das ganze Team',
        'Leg ein Team für deine Bar an (in Savour heißt das Küchenteam) und lade deine Kollegen per E-Mail ein. Alle arbeiten mit denselben Specs; ändert der Barmanager eine Spec, sieht das ganze Team sofort die neue Version. Ansehen und Umrechnen geht mit einem kostenlosen Konto, auch auf dem Handy hinter der Bar.'
      ],
      [
        'Mise en place für die Bar',
        'Zitrus pressen, Sirupe kochen, Garnituren schneiden: setz es auf eine MEP-Liste und hake ab, was bereitsteht, zusammen mit deinem Team. Wie das geht, liest du in [MEP-Listen in Savour](/de/blog/mep-listen-in-savour).'
      ],
      [
        'Was kostet es?',
        'Kostenlos bis 100 Rezepte, mit dem Savour-Leser. [Savour Pro](/de/preise) kostet 2,99 € pro Monat oder 29 € pro Jahr: unbegrenzt Rezepte, Teams, KI für Fotos und Allergene. Neue Konten bekommen 7 Tage Pro gratis. Mehr über Savour hinter der Bar unter [Für Bartender](/de/fuer-bartender).'
      ]
    ],
    outro: 'Diese Erklärung beschreibt Savour, wie es jetzt live ist. Fehlt dir etwas hinter der Bar? Sag es in der Community; wir lesen alles.'
  }
};

export const BAR_POST_ES = {
  [KEY]: {
    slug: 'es/blog/savour-para-bartenders',
    title: 'Savour para bartenders: specs, batches y alérgenos',
    desc: 'Specs de cócteles, siropes y cordiales en un solo lugar, batches en cl, oz y dashes sin errores, alérgenos por bebida y todo tu equipo de barra con las mismas specs. Así usas Savour detrás de la barra.',
    h1: 'Savour para bartenders: así funciona en la barra',
    lead: 'Savour nació en la cocina, pero una spec también es una receta. Lo que necesita un cocinero, lo necesita también un bartender: que sea exacto, que el equipo haga lo mismo y poder calcular rápido. Por eso Savour ahora funciona bien también en la barra.',
    brief: [
      'Todas tus specs, siropes y cordiales en un recetario, con carpetas para la carta fija y la temporada.',
      'Batches en cl, ml, oz, dashes y barspoons: de una copa a 40, sin calculadora.',
      'Alérgenos por bebida (clara, nata, orgeat, vermut) y una sola versión de cada spec para todo el equipo.'
    ],
    sections: [
      [
        'Un solo lugar para tus specs',
        'En muchas barras las specs están dispersas: en un cuaderno detrás de la barra, en un Word del anterior bar manager y en la cabeza de los bartenders fijos. En Savour están juntas. Crea carpetas como trabaja tu barra: la carta fija, la de temporada, siropes y cordiales, y pruebas que aún no están en la carta. Cócteles conocidos como el Negroni, el Mojito o el Whiskey Sour van solos a Bebidas en una cuenta nueva.'
      ],
      [
        'Pasa tus specs',
        'No hay que copiar nada a mano. El lector de Savour lee una carta de cócteles de Word, PDF o texto, con cl, oz, dashes y barspoons, y separa solo varios cócteles en un archivo. Una foto de tu libro de specs la lee la IA, con Savour Pro. Savour nunca inventa una cantidad: lo que no tiene claro, lo ves antes de guardar.',
        {
          steps: [
            ['Elige Añadir receta → Importar', 'Word, PDF, texto o una foto de tu libro de specs.'],
            ['Revísalo', 'Cada cóctel va por separado, con ingredientes y elaboración.'],
            ['Guardar', 'Luego ponlos en tus carpetas o en el equipo de tu barra.']
          ]
        }
      ],
      [
        'Batch sin errores',
        'Para un evento o una noche fuerte preparas cócteles de antemano. Elige 10× o indica cuántos vasos necesitas, y Savour lo convierte todo. 2 dashes de Angostura pasan a 20 dashes, 1 barspoon pasa a 8 barspoons y «1 vaso» pasa a «10 vasos». Las onzas en una bebida siguen siendo onzas: 16 oz de ginebra no se convierten en una libra. Lo que sirves por copa, como «top up con soda», se queda como está. La receta original nunca cambia.',
        { shot: shots('es').batch, alt: 'Un Whiskey Sour en Savour en el móvil, multiplicado por diez', caption: 'Diez Whiskey Sour: 50 cl de bourbon, 10 claras y 20 dashes de Angostura.' }
      ],
      [
        'Alérgenos por bebida',
        'Un cliente pregunta si el sour lleva huevo. En Savour está en la bebida: Savour busca los alérgenos de cada ingrediente y los suma, también si vienen de tu propio sirope o cordial. La clara es huevo, la nata y el Baileys son leche, el orgeat, el falernum y el Frangelico son frutos de cáscara, y el vermut, el jerez y el prosecco contienen sulfitos. ¿Quieres mostrar también el alcohol como alérgeno? Lo activas tú.',
        { shot: shots('es').recipe, alt: 'Un Whiskey Sour en Savour con el alérgeno huevo', caption: 'La clara del sour se reconoce al instante: huevo.' },
        { warn: ['Revisa la etiqueta', 'Los licores y los bitters cambian según la marca. Savour nunca dice que una bebida no tiene alérgenos mientras no esté todo revisado; la etiqueta de tu proveedor siempre manda.'] }
      ],
      [
        'Una versión para todo el equipo',
        'Crea un equipo para tu barra (en Savour se llama equipo de cocina) e invita a tus compañeros por correo. Todos trabajan con las mismas specs; si el bar manager cambia una spec, todo el equipo ve la nueva versión al instante. Ver y convertir funciona con una cuenta gratuita, también en el móvil detrás de la barra.'
      ],
      [
        'Mise en place para la barra',
        'Exprimir cítricos, hacer siropes, cortar garnituras: ponlo en una lista MEP y marca lo que está listo, junto con tu equipo. Lee cómo funciona en [Listas MEP en Savour](/es/blog/listas-mep-en-savour).'
      ],
      [
        '¿Cuánto cuesta?',
        'Gratis hasta 100 recetas, con el lector de Savour. [Savour Pro](/es/precios) cuesta 2,99 € al mes o 29 € al año: recetas ilimitadas, equipos, IA para fotos y alérgenos. Las cuentas nuevas tienen 7 días de Pro gratis. Lee más sobre Savour en la barra en [Para bartenders](/es/para-bartenders).'
      ]
    ],
    outro: 'Esta explicación describe Savour tal como está ahora. ¿Te falta algo en la barra? Cuéntalo en la Comunidad; lo leemos todo.'
  }
};

export const BAR_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/savour-pour-bartenders',
    title: 'Savour pour bartenders : specs, batches et allergènes',
    desc: 'Specs de cocktails, sirops et cordials au même endroit, des batches en cl, oz et dashes sans erreur, les allergènes par boisson et toute ton équipe de bar avec les mêmes specs. Comment utiliser Savour derrière le bar.',
    h1: 'Savour pour bartenders : comment ça marche au bar',
    lead: 'Savour est né en cuisine, mais une spec est aussi une recette. Ce dont un cuisinier a besoin, un bartender en a besoin aussi : que ce soit juste, que l’équipe fasse pareil et pouvoir convertir vite. C’est pourquoi Savour fonctionne désormais bien derrière le bar aussi.',
    brief: [
      'Toutes tes specs, sirops et cordials dans un livre de recettes, avec des dossiers pour la carte et la saison.',
      'Des batches en cl, ml, oz, dashes et barspoons : d’un verre à 40, sans calculatrice.',
      'Les allergènes par boisson (blanc d’œuf, crème, orgeat, vermouth) et une seule version de chaque spec pour toute l’équipe.'
    ],
    sections: [
      [
        'Un seul endroit pour tes specs',
        'Dans beaucoup de bars, les specs sont éparpillées : dans un carnet derrière le bar, dans un Word de l’ancien bar manager et dans la tête des bartenders habituels. Dans Savour, elles sont réunies. Crée des dossiers comme ton bar travaille : la carte, la carte de saison, sirops et cordials, et les essais pas encore à la carte. Les cocktails connus comme le Negroni, le Mojito ou le Whiskey Sour se rangent seuls sous Boissons dans un nouveau compte.'
      ],
      [
        'Reprendre tes specs',
        'Rien à retaper. Le lecteur Savour lit une carte de cocktails depuis Word, PDF ou du texte, avec cl, oz, dashes et barspoons, et sépare tout seul plusieurs cocktails d’un même fichier. Une photo de ton carnet de specs est lue par l’IA, avec Savour Pro. Savour n’invente jamais une quantité : ce dont il n’est pas sûr, tu le vois avant tout enregistrement.',
        {
          steps: [
            ['Choisis Ajouter une recette → Importer', 'Word, PDF, texte ou une photo de ton carnet de specs.'],
            ['Vérifie', 'Chaque cocktail est à part, avec ingrédients et préparation.'],
            ['Enregistre', 'Range-les ensuite dans tes dossiers ou dans l’équipe de ton bar.']
          ]
        }
      ],
      [
        'Batcher sans erreur',
        'Pour un événement ou une grosse soirée, tu prépares les cocktails à l’avance. Choisis 10× ou indique combien de verres il te faut, et Savour convertit tout. 2 dashes d’Angostura deviennent 20 dashes, 1 barspoon devient 8 barspoons et « 1 verre » devient « 10 verres ». Les onces dans une boisson restent des onces : 16 oz de gin ne deviennent pas une livre. Ce que tu verses au verre, comme « top up au soda », reste tel quel. La recette d’origine ne change jamais.',
        { shot: shots('fr').batch, alt: 'Un Whiskey Sour dans Savour sur un téléphone, multiplié par dix', caption: 'Dix Whiskey Sour : 50 cl de bourbon, 10 blancs d’œuf et 20 dashes d’Angostura.' }
      ],
      [
        'Allergènes par boisson',
        'Un client demande s’il y a de l’œuf dans le sour. Dans Savour, c’est indiqué sur la boisson : Savour cherche les allergènes de chaque ingrédient et les additionne, même s’ils viennent de ton propre sirop ou cordial. Le blanc d’œuf, c’est l’œuf ; la crème et le Baileys, c’est le lait ; l’orgeat, le falernum et le Frangelico, ce sont les fruits à coque ; le vermouth, le xérès et le prosecco contiennent des sulfites. Tu veux aussi afficher l’alcool comme allergène ? Tu l’actives toi-même.',
        { shot: shots('fr').recipe, alt: 'Un Whiskey Sour dans Savour avec l’allergène œuf', caption: 'Le blanc d’œuf du sour est reconnu aussitôt : œuf.' },
        { warn: ['Vérifie l’étiquette', 'Les liqueurs et les bitters varient selon la marque. Savour ne dit jamais qu’une boisson est sans allergènes tant que tout n’est pas vérifié ; l’étiquette de ton fournisseur passe toujours en premier.'] }
      ],
      [
        'Une version pour toute l’équipe',
        'Crée une équipe pour ton bar (dans Savour, cela s’appelle une équipe de cuisine) et invite tes collègues par e-mail. Tout le monde travaille avec les mêmes specs ; quand le bar manager modifie une spec, toute l’équipe voit aussitôt la nouvelle version. Consulter et convertir fonctionne avec un compte gratuit, aussi sur le téléphone derrière le bar.'
      ],
      [
        'Mise en place pour le bar',
        'Presser les agrumes, faire les sirops, couper les garnitures : mets-le dans une liste MEP et coche ce qui est prêt, avec ton équipe. Lis comment ça marche dans [Les listes MEP dans Savour](/fr/blog/listes-mep-dans-savour).'
      ],
      [
        'Combien ça coûte ?',
        'Gratuit jusqu’à 100 recettes, avec le lecteur Savour. [Savour Pro](/fr/tarifs) coûte 2,99 € par mois ou 29 € par an : recettes illimitées, équipes, IA pour les photos et allergènes. Les nouveaux comptes ont 7 jours de Pro offerts. Plus sur Savour au bar dans [Pour les bartenders](/fr/pour-bartenders).'
      ]
    ],
    outro: 'Cette explication décrit Savour tel qu’il est en ligne aujourd’hui. Il te manque quelque chose au bar ? Dis-le dans la Communauté ; nous lisons tout.'
  }
};
