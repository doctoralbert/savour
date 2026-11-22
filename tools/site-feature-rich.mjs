// Opmaak van de functie- en voor-wiepagina's (2026-11-06), naar het patroon van een productpagina: onder de kop
// drie voordelen, dan afwisselend tekst en een echt scherm uit de app (showcase), en onderaan vragen (faq).
// Per pagina (id uit tools/site-content.mjs) en per taal. Alleen wat Savour echt doet; geen klanten of quotes.
// Beelden: assets/app/<naam>-{lang}.jpg (demo, zonder de allergenenfunctie) en assets/kladjes.

const shot = (name, alt, title, text) => ({ shot: `/assets/app/${name}-{lang}.jpg`, alt, title, text });

export const FEATURE_RICH = {
  digitise: {
    nl: {
      benefits: [
        ['Hele mappen in één keer', 'Word en PDF met honderden recepten worden losse recepten.'],
        ['Ook handgeschreven', 'Met Savour Pro leest de AI foto’s van kladjes en schriften.'],
        ['Niets verzonnen', 'Twijfel wordt gemarkeerd; jij beslist voordat iets wordt opgeslagen.']
      ],
      showcase: [
        shot(
          'importeren',
          'Recept toevoegen in Savour',
          'Eén knop voor alles',
          'Onder “Recept toevoegen” kies je importeren of zelf invoeren. Importeren werkt met Word, PDF, tekst, een foto of een export uit een andere app, ook met honderden recepten tegelijk.'
        ),
        shot(
          'lijst',
          'Alle recepten in Savour na het importeren',
          'Meteen een receptenboek',
          'Na het opslaan staan je recepten op één plek, met A t/m Z en zoeken. Zet ze daarna in mappen en deel ze met je brigade.'
        )
      ],
      faq: [
        [
          'Welke bestanden kan Savour lezen?',
          'Word, PDF en tekst, een link naar een recept op een website, en exports van andere apps zoals Paprika, Mealie en Recipe Keeper. Met Savour Pro ook foto’s en handgeschreven kladjes.'
        ],
        [
          'Kost importeren iets?',
          'Word, PDF en tekst lees je gratis in met de Savour-lezer, tot 100 recepten. Met Savour Pro bewaar je onbeperkt en leest de AI foto’s en twijfelgevallen, tot 150 per maand.'
        ],
        [
          'Wat gebeurt er als de lezer twijfelt?',
          'Dan zie je dat recept gemarkeerd en kijk je het zelf na voordat het wordt opgeslagen. Savour vult nooit iets in wat er niet staat.'
        ],
      ["En als een recept er al in staat?", "Dan laat Savour bij het importeren zien welke recepten er al staan. Je kiest: overslaan, alleen de gewijzigde opslaan, of toch opslaan. Er verdwijnt nooit iets zonder dat jij het kiest."],
      ["Kan ik bij importeren iets kwijtraken?", "Nee. Elk bestand dat je importeert en elk resultaat van de AI wordt bewaard. Sluit je Savour voordat je hebt opgeslagen, of valt de verbinding weg, dan biedt Savour het de volgende keer opnieuw aan."],
      ["Kan ik ook mijn MEP-lijsten importeren?", "Ja. Met Savour Pro lees je een MEP-lijst in uit Excel, Word, tekst of een foto; je keurt alles goed voordat het wordt opgeslagen. [Over MEP-lijsten](@feature:mep)."],
      ["Leert Savour van wat ik verbeter?", "Alleen als \"Help de Savour-lezer verbeteren\" aan staat (Instellingen). Wat je verbetert, gebruiken we om de lezer beter te maken; we kijken alles na en de lezer verandert nooit vanzelf. Je kunt het altijd uitzetten."]
      ]
    },
    en: {
      benefits: [
        ['Whole folders at once', 'Word and PDF with hundreds of recipes become separate recipes.'],
        ['Handwritten too', 'With Savour Pro the AI reads photos of notes and notebooks.'],
        ['Nothing invented', 'Doubt is marked; you decide before anything is saved.']
      ],
      showcase: [
        shot(
          'importeren',
          'Add recipe in Savour',
          'One button for everything',
          'Under “Add recipe” you choose import or enter it yourself. Import works with Word, PDF, text, a photo or an export from another app, even with hundreds of recipes at once.'
        ),
        shot(
          'lijst',
          'All recipes in Savour after importing',
          'A recipe book straight away',
          'After saving, your recipes are in one place, with A to Z and search. Then put them in folders and share them with your brigade.'
        )
      ],
      faq: [
        [
          'Which files can Savour read?',
          'Word, PDF and text, a link to a recipe on a website, and exports from other apps such as Paprika, Mealie and Recipe Keeper. With Savour Pro also photos and handwritten notes.'
        ],
        [
          'Does importing cost anything?',
          'You read Word, PDF and text for free with the Savour reader, up to 100 recipes. With Savour Pro you keep unlimited recipes and the AI reads photos and doubtful cases, up to 150 a month.'
        ],
        [
          'What happens when the reader is unsure?',
          'Then you see that recipe marked and check it yourself before it is saved. Savour never fills in anything that is not there.'
        ],
      ["What if a recipe is already there?", "Then Savour shows which recipes are already there when you import. You choose: skip, only save the changed ones, or save anyway. Nothing ever disappears unless you choose it."],
      ["Can I lose anything while importing?", "No. Every file you import and every AI result is kept. If you close Savour before saving, or the connection drops, Savour offers it again next time."],
      ["Can I import my prep lists too?", "Yes. With Savour Pro you read in a prep list from Excel, Word, text or a photo; you approve everything before it is saved. [About prep lists](@feature:mep)."],
      ["Does Savour learn from what I correct?", "Only when \"Help improve the Savour reader\" is on (Settings). What you correct helps us make the reader better; we check everything and the reader never changes by itself. You can switch it off at any time."]
      ]
    },
    de: {
      benefits: [
        ['Ganze Ordner in einem Schritt', 'Word und PDF mit Hunderten Rezepten werden einzelne Rezepte.'],
        ['Auch handgeschrieben', 'Mit Savour Pro liest die KI Fotos von Notizen und Heften.'],
        ['Nichts erfunden', 'Zweifel wird markiert; du entscheidest, bevor etwas gespeichert wird.']
      ],
      showcase: [
        shot(
          'importeren',
          'Rezept hinzufügen in Savour',
          'Ein Knopf für alles',
          'Unter „Rezept hinzufügen“ wählst du Importieren oder selbst eingeben. Importieren funktioniert mit Word, PDF, Text, einem Foto oder einem Export aus einer anderen App, auch mit Hunderten Rezepten auf einmal.'
        ),
        shot(
          'lijst',
          'Alle Rezepte in Savour nach dem Import',
          'Sofort ein Rezeptbuch',
          'Nach dem Speichern stehen deine Rezepte an einem Ort, mit A bis Z und Suche. Danach sortierst du sie in Ordner und teilst sie mit deiner Brigade.'
        )
      ],
      faq: [
        [
          'Welche Dateien kann Savour lesen?',
          'Word, PDF und Text, einen Link zu einem Rezept auf einer Website und Exporte anderer Apps wie Paprika, Mealie und Recipe Keeper. Mit Savour Pro auch Fotos und handgeschriebene Notizen.'
        ],
        [
          'Kostet das Importieren etwas?',
          'Word, PDF und Text liest du kostenlos mit dem Savour-Leser ein, bis 100 Rezepte. Mit Savour Pro speicherst du unbegrenzt, und die KI liest Fotos und Zweifelsfälle, bis 150 pro Monat.'
        ],
        [
          'Was passiert, wenn der Leser zweifelt?',
          'Dann siehst du das Rezept markiert und prüfst es selbst, bevor es gespeichert wird. Savour füllt nie etwas aus, was nicht dasteht.'
        ],
      ["Und wenn ein Rezept schon da ist?", "Dann zeigt Savour beim Importieren, welche Rezepte schon da sind. Du wählst: überspringen, nur die geänderten speichern oder trotzdem speichern. Es verschwindet nie etwas, ohne dass du es wählst."],
      ["Kann beim Importieren etwas verloren gehen?", "Nein. Jede Datei, die du importierst, und jedes KI-Ergebnis wird aufbewahrt. Schließt du Savour vor dem Speichern oder bricht die Verbindung ab, bietet Savour es beim nächsten Mal erneut an."],
      ["Kann ich auch meine MEP-Listen importieren?", "Ja. Mit Savour Pro liest du eine MEP-Liste aus Excel, Word, Text oder einem Foto ein; du gibst alles frei, bevor es gespeichert wird. [Zu den MEP-Listen](@feature:mep)."],
      ["Lernt Savour aus dem, was ich verbessere?", "Nur wenn „Hilf, den Savour-Leser zu verbessern“ an ist (Einstellungen). Was du verbesserst, hilft uns, den Leser besser zu machen; wir prüfen alles, und der Leser ändert sich nie von selbst. Du kannst es jederzeit ausschalten."]
      ]
    },
    es: {
      benefits: [
        ['Carpetas enteras de una vez', 'Un Word o PDF con cientos de recetas se convierte en recetas separadas.'],
        ['También a mano', 'Con Savour Pro la IA lee fotos de notas y cuadernos.'],
        ['Nada inventado', 'Las dudas se marcan; tú decides antes de guardar nada.']
      ],
      showcase: [
        shot(
          'importeren',
          'Añadir receta en Savour',
          'Un botón para todo',
          'En «Añadir receta» eliges importar o escribirla tú. Importar funciona con Word, PDF, texto, una foto o una exportación de otra app, también con cientos de recetas a la vez.'
        ),
        shot(
          'lijst',
          'Todas las recetas en Savour tras importar',
          'Un recetario al momento',
          'Al guardar, tus recetas están en un solo sitio, de la A a la Z y con buscador. Después las pones en carpetas y las compartes con tu brigada.'
        )
      ],
      faq: [
        [
          '¿Qué archivos puede leer Savour?',
          'Word, PDF y texto, un enlace a una receta de una web y exportaciones de otras apps como Paprika, Mealie y Recipe Keeper. Con Savour Pro, también fotos y notas a mano.'
        ],
        [
          '¿Cuesta algo importar?',
          'Word, PDF y texto los lees gratis con el lector de Savour, hasta 100 recetas. Con Savour Pro guardas sin límite y la IA lee fotos y casos dudosos, hasta 150 al mes.'
        ],
        [
          '¿Qué pasa si el lector duda?',
          'Verás esa receta marcada y la revisas tú antes de guardarla. Savour nunca rellena lo que no está.'
        ],
      ["¿Y si una receta ya está?", "Entonces Savour te muestra al importar qué recetas ya están. Tú eliges: omitir, guardar solo las modificadas o guardar igualmente. Nunca desaparece nada sin que tú lo elijas."],
      ["¿Puedo perder algo al importar?", "No. Cada archivo que importas y cada resultado de la IA se guarda. Si cierras Savour antes de guardar, o se corta la conexión, Savour te lo vuelve a ofrecer la próxima vez."],
      ["¿Puedo importar también mis listas MEP?", "Sí. Con Savour Pro cargas una lista MEP desde Excel, Word, texto o una foto; tú lo apruebas todo antes de guardarlo. [Sobre las listas MEP](@feature:mep)."],
      ["¿Aprende Savour de lo que corrijo?", "Solo si «Ayuda a mejorar el lector de Savour» está activado (Ajustes). Lo que corriges nos ayuda a mejorar el lector; lo revisamos todo y el lector nunca cambia por sí solo. Puedes desactivarlo cuando quieras."]
      ]
    },
    fr: {
      benefits: [
        [
          'Des classeurs entiers en une fois',
          'Un Word ou un PDF de centaines de recettes devient des recettes séparées.'
        ],
        ['Même manuscrit', 'Avec Savour Pro, l’IA lit les photos de notes et de cahiers.'],
        ['Rien d’inventé', 'Le doute est signalé ; tu décides avant que quoi que ce soit soit enregistré.']
      ],
      showcase: [
        shot(
          'importeren',
          'Ajouter une recette dans Savour',
          'Un bouton pour tout',
          'Dans « Ajouter une recette », tu choisis importer ou saisir toi-même. L’import fonctionne avec Word, PDF, texte, une photo ou un export d’une autre application, même avec des centaines de recettes à la fois.'
        ),
        shot(
          'lijst',
          'Toutes les recettes dans Savour après l’import',
          'Tout de suite un livre de recettes',
          'Une fois enregistrées, tes recettes sont au même endroit, de A à Z et avec la recherche. Range-les ensuite dans des dossiers et partage-les avec ta brigade.'
        )
      ],
      faq: [
        [
          'Quels fichiers Savour peut-il lire ?',
          'Word, PDF et texte, un lien vers une recette sur un site, et les exports d’autres applications comme Paprika, Mealie et Recipe Keeper. Avec Savour Pro, aussi les photos et les notes manuscrites.'
        ],
        [
          'L’import coûte-t-il quelque chose ?',
          'Word, PDF et texte se lisent gratuitement avec le lecteur Savour, jusqu’à 100 recettes. Avec Savour Pro, tu enregistres sans limite et l’IA lit les photos et les cas douteux, jusqu’à 150 par mois.'
        ],
        [
          'Que se passe-t-il si le lecteur doute ?',
          'Tu vois alors cette recette signalée et tu la vérifies toi-même avant l’enregistrement. Savour ne remplit jamais ce qui n’y est pas.'
        ],
      ["Et si une recette existe déjà ?", "Savour te montre alors à l’import quelles recettes existent déjà. Tu choisis : ignorer, enregistrer seulement les modifiées, ou enregistrer quand même. Rien ne disparaît jamais sans ton choix."],
      ["Puis-je perdre quelque chose à l’import ?", "Non. Chaque fichier importé et chaque résultat de l’IA est conservé. Si tu fermes Savour avant d’enregistrer, ou si la connexion coupe, Savour te le propose à nouveau la fois suivante."],
      ["Puis-je aussi importer mes listes MEP ?", "Oui. Avec Savour Pro, tu charges une liste MEP depuis Excel, Word, du texte ou une photo ; tu valides tout avant l’enregistrement. [Les listes MEP](@feature:mep)."],
      ["Savour apprend-il de ce que je corrige ?", "Seulement si « Aide à améliorer le lecteur Savour » est activé (Paramètres). Ce que tu corriges nous aide à améliorer le lecteur ; nous vérifions tout et le lecteur ne change jamais tout seul. Tu peux le désactiver à tout moment."]
      ]
    }
  },

  organise: {
    nl: {
      benefits: [
        ['Jouw indeling', 'Mappen en categorieën zoals jouw keuken werkt.'],
        ['Vinden op wat je weet', 'Zoeken in titels, ingrediënten en bereiding.'],
        ['Rustig in de service', 'Een lijst, een ster voor favorieten en één tik naar het recept.']
      ],
      showcase: [
        shot(
          'mappen',
          'Receptenmappen in Savour',
          'Mappen per partie, menu of seizoen',
          'Maak zelf mappen en geef ze de naam die je keuken gebruikt. Een recept kan in meerdere mappen staan, zonder dat het dubbel bestaat.'
        ),
        shot(
          'lijst',
          'Alle recepten met zoeken en A t/m Z',
          'Alles op één plek',
          'Alle recepten op een rij, met een zoekveld en A t/m Z. Wat je elke week maakt, geef je een ster.'
        )
      ],
      faq: [
        [
          'Kan een recept in meerdere mappen staan?',
          'Ja. Je kalfsjus kan bij de basis en bij het lammenu horen, en is toch maar één recept.'
        ],
        ['Waar zoekt Savour in?', 'In de titel, de ingrediënten en de bereiding. Of je bladert van A tot Z.'],
        [
          'Wat doe ik met oude menu’s?',
          'Zet ze in een archiefmap. Dan zijn ze uit het zicht, maar blijven ze doorzoekbaar.'
        ],
      ["Zie ik ook de allergenen?", "Ja. Met Savour Pro staan de allergenen bij elk recept, ook via basisrecepten. Savour vult ze zelf in; aanpassen mag altijd. [Allergenen per recept](@feature:allergens)."],
      ["Helpt Savour ook bij de mise-en-place?", "Ja. Onder Tools → MEP-lijsten maak je met Savour Pro per post een lijst met kaarten en onderdelen. Iedereen in het keukenteam vinkt live af, ook met een gratis account. [Over MEP-lijsten](@feature:mep)."]
      ]
    },
    en: {
      benefits: [
        ['Your structure', 'Folders and categories the way your kitchen works.'],
        ['Find what you remember', 'Search titles, ingredients and method.'],
        ['Calm during service', 'A list, a star for favourites and one tap to the recipe.']
      ],
      showcase: [
        shot(
          'mappen',
          'Recipe folders in Savour',
          'Folders per section, menu or season',
          'Create folders yourself and give them the names your kitchen uses. A recipe can be in several folders without existing twice.'
        ),
        shot(
          'lijst',
          'All recipes with search and A to Z',
          'Everything in one place',
          'All recipes in a row, with search and A to Z. Star what you make every week.'
        )
      ],
      faq: [
        [
          'Can a recipe be in several folders?',
          'Yes. Your veal jus can belong to the basics and to the lamb menu, and still be one recipe.'
        ],
        ['What does Savour search?', 'The title, the ingredients and the method. Or you browse from A to Z.'],
        ['What do I do with old menus?', 'Put them in an archive folder. They are out of sight, but still searchable.'],
      ["Do I see the allergens too?", "Yes. With Savour Pro the allergens are on every recipe, including through base recipes. Savour fills them in itself; you can always adjust. [Allergens per recipe](@feature:allergens)."],
      ["Does Savour help with mise en place too?", "Yes. Under Tools → Prep lists you create a list per section with cards and items, with Savour Pro. Everyone in the kitchen team ticks off live, also with a free account. [About prep lists](@feature:mep)."]
      ]
    },
    de: {
      benefits: [
        ['Deine Einteilung', 'Ordner und Kategorien, so wie deine Küche arbeitet.'],
        ['Finden, was du weißt', 'Suche in Titeln, Zutaten und Zubereitung.'],
        ['Ruhig im Service', 'Eine Liste, ein Stern für Favoriten und ein Tipp zum Rezept.']
      ],
      showcase: [
        shot(
          'mappen',
          'Rezeptordner in Savour',
          'Ordner pro Posten, Menü oder Saison',
          'Erstelle selbst Ordner und gib ihnen die Namen, die deine Küche benutzt. Ein Rezept kann in mehreren Ordnern stehen, ohne doppelt zu existieren.'
        ),
        shot(
          'lijst',
          'Alle Rezepte mit Suche und A bis Z',
          'Alles an einem Ort',
          'Alle Rezepte in einer Reihe, mit Suchfeld und A bis Z. Was du jede Woche machst, bekommt einen Stern.'
        )
      ],
      faq: [
        [
          'Kann ein Rezept in mehreren Ordnern stehen?',
          'Ja. Dein Kalbsjus kann zu den Grundlagen und zum Lammmenü gehören und ist trotzdem nur ein Rezept.'
        ],
        ['Worin sucht Savour?', 'Im Titel, in den Zutaten und in der Zubereitung. Oder du blätterst von A bis Z.'],
        [
          'Was mache ich mit alten Menüs?',
          'Leg sie in einen Archivordner. Dann sind sie aus dem Blick, bleiben aber durchsuchbar.'
        ],
      ["Sehe ich auch die Allergene?", "Ja. Mit Savour Pro stehen die Allergene bei jedem Rezept, auch über Grundrezepte. Savour füllt sie selbst aus; anpassen kannst du immer. [Allergene pro Rezept](@feature:allergens)."],
      ["Hilft Savour auch bei der Mise en place?", "Ja. Unter Werkzeuge → MEP-Listen legst du mit Savour Pro pro Posten eine Liste mit Karten und Positionen an. Alle im Küchenteam haken live ab, auch mit einem kostenlosen Konto. [Zu den MEP-Listen](@feature:mep)."]
      ]
    },
    es: {
      benefits: [
        ['Tu organización', 'Carpetas y categorías como trabaja tu cocina.'],
        ['Encuentra lo que recuerdas', 'Búsqueda en títulos, ingredientes y elaboración.'],
        ['Tranquilo en el servicio', 'Una lista, una estrella para favoritos y un toque hasta la receta.']
      ],
      showcase: [
        shot(
          'mappen',
          'Carpetas de recetas en Savour',
          'Carpetas por partida, carta o temporada',
          'Crea tú las carpetas y ponles el nombre que usa tu cocina. Una receta puede estar en varias carpetas sin existir dos veces.'
        ),
        shot(
          'lijst',
          'Todas las recetas con buscador y de la A a la Z',
          'Todo en un sitio',
          'Todas las recetas en fila, con buscador y de la A a la Z. Lo que haces cada semana, lo marcas con una estrella.'
        )
      ],
      faq: [
        [
          '¿Una receta puede estar en varias carpetas?',
          'Sí. Tu jugo de ternera puede estar en la base y en el menú de cordero y seguir siendo una sola receta.'
        ],
        ['¿Dónde busca Savour?', 'En el título, los ingredientes y la elaboración. O hojeas de la A a la Z.'],
        [
          '¿Qué hago con las cartas antiguas?',
          'Ponlas en una carpeta de archivo. Quedan fuera de la vista, pero se pueden seguir buscando.'
        ],
      ["¿Veo también los alérgenos?", "Sí. Con Savour Pro los alérgenos aparecen en cada receta, también a través de recetas base. Savour los rellena por sí mismo; siempre puedes ajustarlos. [Alérgenos por receta](@feature:allergens)."],
      ["¿Ayuda Savour también con la mise en place?", "Sí. En Herramientas → Listas MEP creas con Savour Pro una lista por partida con tarjetas y elementos. Todo el equipo de cocina marca en directo, también con una cuenta gratuita. [Sobre las listas MEP](@feature:mep)."]
      ]
    },
    fr: {
      benefits: [
        ['Ton organisation', 'Des dossiers et des catégories comme travaille ta cuisine.'],
        ['Trouver ce dont tu te souviens', 'Recherche dans les titres, les ingrédients et la préparation.'],
        ['Calme pendant le service', 'Une liste, une étoile pour les favoris et un geste vers la recette.']
      ],
      showcase: [
        shot(
          'mappen',
          'Dossiers de recettes dans Savour',
          'Des dossiers par partie, carte ou saison',
          'Crée toi-même des dossiers et donne-leur les noms qu’utilise ta cuisine. Une recette peut être dans plusieurs dossiers sans exister en double.'
        ),
        shot(
          'lijst',
          'Toutes les recettes avec recherche et de A à Z',
          'Tout au même endroit',
          'Toutes les recettes à la suite, avec recherche et de A à Z. Ce que tu fais chaque semaine reçoit une étoile.'
        )
      ],
      faq: [
        [
          'Une recette peut-elle être dans plusieurs dossiers ?',
          'Oui. Ton jus de veau peut appartenir aux bases et au menu d’agneau, et rester une seule recette.'
        ],
        ['Où Savour cherche-t-il ?', 'Dans le titre, les ingrédients et la préparation. Ou tu feuillettes de A à Z.'],
        [
          'Que faire des anciennes cartes ?',
          'Mets-les dans un dossier d’archives. Elles sont hors de vue, mais restent consultables.'
        ],
      ["Est-ce que je vois aussi les allergènes ?", "Oui. Avec Savour Pro, les allergènes figurent sur chaque recette, y compris via les recettes de base. Savour les remplit lui-même ; tu peux toujours ajuster. [Allergènes par recette](@feature:allergens)."],
      ["Savour aide-t-il aussi pour la mise en place ?", "Oui. Dans Outils → Listes MEP, tu crées avec Savour Pro une liste par poste avec cartes et éléments. Toute l’équipe de cuisine coche en direct, même avec un compte gratuit. [Les listes MEP](@feature:mep)."]
      ]
    }
  },

  share: {
    nl: {
      benefits: [
        ['Eén versie', 'Wat jij aanpast, ziet het hele team meteen.'],
        ['Rollen per persoon', 'Eigenaar, sous-chef en kok: jij bepaalt wie wat mag.'],
        ['Gratis voor leden', 'Lid zijn van een keukenteam kost niets.']
      ],
      showcase: [
        shot(
          'brigade',
          'De brigade van een keukenteam in Savour',
          'Je brigade op één scherm',
          'Zie wie er in het team zit en met welke rol. Als eigenaar pas je een rol met één keuze aan, bijvoorbeeld als iemand tijdelijk op een andere partie staat.'
        ),
        shot(
          'recept',
          'Een recept op de telefoon in Savour',
          'Op ieders eigen telefoon',
          'Elk lid opent het recept op de eigen telefoon, in de versie die nu klopt. Eén recept doorsturen kan met een link, ook naar iemand zonder account.'
        )
      ],
      faq: [
        [
          'Moeten alle leden Savour Pro hebben?',
          'Nee. Lid zijn is gratis: je bekijkt, print en rekent om. Een keukenteam maken, en recepten toevoegen of bewerken, gaat met Savour Pro. Met een teamabonnement krijgt iedereen in het team Pro.'
        ],
        [
          'Hoe nodig ik iemand uit?',
          'Via WhatsApp, Telegram, e-mail of de uitnodigingslink. Je kiest bij het uitnodigen of iemand sous-chef of kok wordt.'
        ],
        [
          'Wat gebeurt er als iemand vertrekt?',
          'Je haalt diegene uit het team. De recepten in het keukenteam blijven van de keuken.'
        ],
      ["Kan de brigade samen een MEP-lijst afvinken?", "Ja. De MEP-lijsten staan ook op het keukenteam-scherm. Iedereen vinkt live af, ook met een gratis account, en ziet wie wat heeft afgevinkt. [Over MEP-lijsten](@feature:mep)."],
      ["Werkt het ook zonder wifi?", "Recepten die je eenmaal hebt geopend, lees je ook zonder internet. Wat je offline afvinkt op een MEP-lijst, bewaart Savour en verstuurt het zodra je weer verbinding hebt."]
      ]
    },
    en: {
      benefits: [
        ['One version', 'What you change, the whole team sees at once.'],
        ['Roles per person', 'Owner, sous-chef and cook: you decide who may do what.'],
        ['Free for members', 'Being a member of a kitchen team costs nothing.']
      ],
      showcase: [
        shot(
          'brigade',
          'The brigade of a kitchen team in Savour',
          'Your brigade on one screen',
          'See who is in the team and with which role. As the owner you change a role with one choice, for example when someone is on another section for a while.'
        ),
        shot(
          'recept',
          'A recipe on the phone in Savour',
          'On everyone’s own phone',
          'Every member opens the recipe on their own phone, in the version that is right now. Sending one recipe works with a link, even to someone without an account.'
        )
      ],
      faq: [
        [
          'Do all members need Savour Pro?',
          'No. Being a member is free: you view, print and scale. Creating a kitchen team, and adding or editing recipes, needs Savour Pro. With a team subscription everyone in the team gets Pro.'
        ],
        [
          'How do I invite someone?',
          'Via WhatsApp, Telegram, email or the invitation link. When you invite someone, you choose whether they become a sous-chef or a cook.'
        ],
        [
          'What happens when someone leaves?',
          'You remove them from the team. The recipes in the kitchen team stay with the kitchen.'
        ],
      ["Can the brigade tick off a prep list together?", "Yes. The prep lists are also on the kitchen team screen. Everyone ticks off live, also with a free account, and sees who ticked off what. [About prep lists](@feature:mep)."],
      ["Does it work without wifi?", "Recipes you have opened once can also be read without internet. Whatever you tick off on a prep list while offline, Savour keeps and sends as soon as you are connected again."]
      ]
    },
    de: {
      benefits: [
        ['Eine Version', 'Was du änderst, sieht das ganze Team sofort.'],
        ['Rollen pro Person', 'Eigentümer, Sous-Chef und Koch: Du bestimmst, wer was darf.'],
        ['Kostenlos für Mitglieder', 'Mitglied eines Küchenteams zu sein kostet nichts.']
      ],
      showcase: [
        shot(
          'brigade',
          'Die Brigade eines Küchenteams in Savour',
          'Deine Brigade auf einem Bildschirm',
          'Sieh, wer im Team ist und mit welcher Rolle. Als Eigentümer änderst du eine Rolle mit einer Auswahl, etwa wenn jemand vorübergehend auf einem anderen Posten steht.'
        ),
        shot(
          'recept',
          'Ein Rezept auf dem Handy in Savour',
          'Auf jedem eigenen Handy',
          'Jedes Mitglied öffnet das Rezept auf dem eigenen Handy, in der Version, die jetzt stimmt. Ein einzelnes Rezept schickst du per Link, auch an jemanden ohne Konto.'
        )
      ],
      faq: [
        [
          'Brauchen alle Mitglieder Savour Pro?',
          'Nein. Mitglied sein ist kostenlos: Du siehst an, druckst und rechnest um. Ein Küchenteam erstellen und Rezepte hinzufügen oder bearbeiten geht mit Savour Pro. Mit einem Teamabo bekommt jeder im Team Pro.'
        ],
        [
          'Wie lade ich jemanden ein?',
          'Per WhatsApp, Telegram, E-Mail oder Einladungslink. Beim Einladen wählst du, ob jemand Sous-Chef oder Koch wird.'
        ],
        [
          'Was passiert, wenn jemand geht?',
          'Du nimmst die Person aus dem Team. Die Rezepte im Küchenteam bleiben in der Küche.'
        ],
      ["Kann die Brigade gemeinsam eine MEP-Liste abhaken?", "Ja. Die MEP-Listen stehen auch auf dem Küchenteam-Bildschirm. Alle haken live ab, auch mit einem kostenlosen Konto, und sehen, wer was abgehakt hat. [Zu den MEP-Listen](@feature:mep)."],
      ["Geht das auch ohne WLAN?", "Rezepte, die du einmal geöffnet hast, liest du auch ohne Internet. Was du offline auf einer MEP-Liste abhakst, bewahrt Savour auf und sendet es, sobald du wieder verbunden bist."]
      ]
    },
    es: {
      benefits: [
        ['Una versión', 'Lo que cambias lo ve todo el equipo al momento.'],
        ['Roles por persona', 'Propietario, segundo de cocina y cocinero: tú decides quién puede qué.'],
        ['Gratis para los miembros', 'Ser miembro de un equipo de cocina no cuesta nada.']
      ],
      showcase: [
        shot(
          'brigade',
          'La brigada de un equipo de cocina en Savour',
          'Tu brigada en una pantalla',
          'Ves quién está en el equipo y con qué rol. Como propietario cambias un rol con una sola elección, por ejemplo cuando alguien pasa un tiempo a otra partida.'
        ),
        shot(
          'recept',
          'Una receta en el móvil en Savour',
          'En el móvil de cada uno',
          'Cada miembro abre la receta en su móvil, en la versión que vale ahora. Una sola receta se envía con un enlace, también a alguien sin cuenta.'
        )
      ],
      faq: [
        [
          '¿Todos los miembros necesitan Savour Pro?',
          'No. Ser miembro es gratis: consultas, imprimes y escalas. Crear un equipo, y añadir o editar recetas, requiere Savour Pro. Con una suscripción de equipo, todos los del equipo tienen Pro.'
        ],
        [
          '¿Cómo invito a alguien?',
          'Por WhatsApp, Telegram, correo o el enlace de invitación. Al invitar eliges si será segundo de cocina o cocinero.'
        ],
        ['¿Qué pasa si alguien se va?', 'Lo sacas del equipo. Las recetas del equipo de cocina se quedan en la cocina.'],
      ["¿Puede la brigada marcar junta una lista MEP?", "Sí. Las listas MEP también están en la pantalla del equipo de cocina. Todos marcan en directo, también con una cuenta gratuita, y ven quién marcó qué. [Sobre las listas MEP](@feature:mep)."],
      ["¿Funciona también sin wifi?", "Las recetas que has abierto una vez se leen también sin internet. Lo que marcas sin conexión en una lista MEP, Savour lo guarda y lo envía en cuanto vuelves a tener conexión."]
      ]
    },
    fr: {
      benefits: [
        ['Une seule version', 'Ce que tu modifies, toute l’équipe le voit tout de suite.'],
        ['Des rôles par personne', 'Propriétaire, sous-chef et cuisinier : tu décides qui peut faire quoi.'],
        ['Gratuit pour les membres', 'Être membre d’une équipe de cuisine ne coûte rien.']
      ],
      showcase: [
        shot(
          'brigade',
          'La brigade d’une équipe de cuisine dans Savour',
          'Ta brigade sur un écran',
          'Vois qui est dans l’équipe et avec quel rôle. Comme propriétaire, tu changes un rôle d’un seul choix, par exemple quand quelqu’un passe un temps sur une autre partie.'
        ),
        shot(
          'recept',
          'Une recette sur le téléphone dans Savour',
          'Sur le téléphone de chacun',
          'Chaque membre ouvre la recette sur son téléphone, dans la version qui est juste maintenant. Une seule recette s’envoie avec un lien, même à quelqu’un sans compte.'
        )
      ],
      faq: [
        [
          'Tous les membres ont-ils besoin de Savour Pro ?',
          'Non. Être membre est gratuit : tu consultes, imprimes et convertis. Créer une équipe, et ajouter ou modifier des recettes, demande Savour Pro. Avec un abonnement d’équipe, tout le monde dans l’équipe a Pro.'
        ],
        [
          'Comment inviter quelqu’un ?',
          'Par WhatsApp, Telegram, e-mail ou le lien d’invitation. En invitant, tu choisis s’il devient sous-chef ou cuisinier.'
        ],
        [
          'Que se passe-t-il quand quelqu’un part ?',
          'Tu le retires de l’équipe. Les recettes de l’équipe de cuisine restent à la cuisine.'
        ],
      ["La brigade peut-elle cocher ensemble une liste MEP ?", "Oui. Les listes MEP sont aussi sur l’écran de l’équipe de cuisine. Tout le monde coche en direct, même avec un compte gratuit, et voit qui a coché quoi. [Les listes MEP](@feature:mep)."],
      ["Ça marche aussi sans wifi ?", "Les recettes que tu as ouvertes une fois se lisent aussi sans internet. Ce que tu coches hors ligne sur une liste MEP, Savour le garde et l’envoie dès que tu es de nouveau connecté."]
      ]
    }
  },

  scale: {
    nl: {
      benefits: [
        ['Eén tik', 'Van ¼× tot 10× met één knop.'],
        ['Op wat je hebt', 'Reken om op het ingrediënt dat er ligt.'],
        ['Het origineel blijft', 'Met “Origineel” staat alles weer terug.']
      ],
      showcase: [
        shot(
          'omrekenen',
          'Beurre blanc in Savour, drie keer omgerekend',
          'Omrekenen met één knop',
          'Onder de titel staan knoppen van ¼× tot 10×. Alle hoeveelheden rekenen mee, in nette eenheden: 3 deciliter wijn, 750 gram boter.'
        ),
        shot(
          'meer-omrekenen',
          'Het venster Meer omrekenen in Savour',
          'Meer omrekenen',
          'Vul een factor in, de opbrengst die je nodig hebt, of wat je hebt liggen: “ik heb 3 kilo sjalot”. Het hele recept rekent mee.'
        )
      ],
      faq: [
        [
          'Verandert het originele recept?',
          'Nee. Omrekenen gebeurt op het scherm; met “Origineel” ga je terug naar het basisrecept.'
        ],
        [
          'Kan ik omrekenen op stuks of porties?',
          'Ja. Staat er een opbrengst in het recept, zoals 50 stuks of 4 personen, dan vul je in hoeveel je er nodig hebt.'
        ],
        [
          'Kan ik het omgerekende recept printen?',
          'Ja. Je print precies de hoeveelheden die je op het scherm ziet, of je opent ze in de kookmodus.'
        ],
      ["Klopt het meervoud na omrekenen?", "Ja. \"1 sjalot\" wordt \"2 sjalotten\", ook bij de opbrengst. Het originele recept verandert nooit."],
      ["Werkt omrekenen ook voor cocktails?", "Ja. Savour kent dashes en barspoons, en oz bij een drank blijft oz. Zo batch je een cocktail zonder rekenen. [Savour voor bartenders](/voor-bartenders)."]
      ]
    },
    en: {
      benefits: [
        ['One tap', 'From ¼× to 10× with one button.'],
        ['On what you have', 'Convert on the ingredient that is on the shelf.'],
        ['The original stays', '“Original” puts everything back.']
      ],
      showcase: [
        shot(
          'omrekenen',
          'Beurre blanc in Savour, converted three times',
          'Converting with one button',
          'Under the title there are buttons from ¼× to 10×. All quantities follow, in tidy units: 3 decilitres of wine, 750 grams of butter.'
        ),
        shot(
          'meer-omrekenen',
          'The More converting window in Savour',
          'More converting',
          'Enter a factor, the yield you need, or what you have: “I have 3 kilos of shallots”. The whole recipe follows.'
        )
      ],
      faq: [
        [
          'Does the original recipe change?',
          'No. Converting happens on screen; “Original” takes you back to the base recipe.'
        ],
        [
          'Can I convert by pieces or portions?',
          'Yes. If the recipe has a yield, such as 50 pieces or 4 people, enter how many you need.'
        ],
        [
          'Can I print the converted recipe?',
          'Yes. You print exactly the quantities you see on screen, or open them in cooking mode.'
        ],
      ["Is the plural right after scaling?", "Yes. \"1 shallot\" becomes \"2 shallots\", also in the yield. The original recipe never changes."],
      ["Does scaling work for cocktails too?", "Yes. Savour knows dashes and barspoons, and oz in a drink stays oz. So you batch a cocktail without doing the maths. [Savour for bartenders](/en/for-bartenders)."]
      ]
    },
    de: {
      benefits: [
        ['Ein Tipp', 'Von ¼× bis 10× mit einem Knopf.'],
        ['Auf das, was du hast', 'Rechne auf die Zutat um, die da liegt.'],
        ['Das Original bleibt', 'Mit „Original“ ist alles wieder zurück.']
      ],
      showcase: [
        shot(
          'omrekenen',
          'Beurre blanc in Savour, dreifach umgerechnet',
          'Umrechnen mit einem Knopf',
          'Unter dem Titel stehen Knöpfe von ¼× bis 10×. Alle Mengen rechnen mit, in sauberen Einheiten: 3 Deziliter Wein, 750 Gramm Butter.'
        ),
        shot(
          'meer-omrekenen',
          'Das Fenster Mehr umrechnen in Savour',
          'Mehr umrechnen',
          'Gib einen Faktor ein, die Ausbeute, die du brauchst, oder was du liegen hast: „ich habe 3 Kilo Schalotten“. Das ganze Rezept rechnet mit.'
        )
      ],
      faq: [
        [
          'Ändert sich das Originalrezept?',
          'Nein. Umrechnen passiert auf dem Bildschirm; mit „Original“ kommst du zurück zum Grundrezept.'
        ],
        [
          'Kann ich auf Stück oder Portionen umrechnen?',
          'Ja. Hat das Rezept eine Ausbeute, etwa 50 Stück oder 4 Personen, gibst du ein, wie viele du brauchst.'
        ],
        [
          'Kann ich das umgerechnete Rezept drucken?',
          'Ja. Du druckst genau die Mengen, die du auf dem Bildschirm siehst, oder öffnest sie im Kochmodus.'
        ],
      ["Stimmt die Mehrzahl nach dem Umrechnen?", "Ja. „1 Schalotte“ wird „2 Schalotten“, auch bei der Ausbeute. Das Originalrezept ändert sich nie."],
      ["Funktioniert das Umrechnen auch für Cocktails?", "Ja. Savour kennt Dashes und Barlöffel, und oz bei einem Getränk bleibt oz. So batchst du einen Cocktail ohne Rechnen. [Savour für Bartender](/de/fuer-bartender)."]
      ]
    },
    es: {
      benefits: [
        ['Un toque', 'De ¼× a 10× con un botón.'],
        ['Con lo que tienes', 'Recalcula según el ingrediente que tienes.'],
        ['El original se queda', 'Con «Original» todo vuelve a como estaba.']
      ],
      showcase: [
        shot(
          'omrekenen',
          'Beurre blanc en Savour, recalculado por tres',
          'Recalcular con un botón',
          'Bajo el título hay botones de ¼× a 10×. Todas las cantidades cambian, en unidades claras: 3 decilitros de vino, 750 gramos de mantequilla.'
        ),
        shot(
          'meer-omrekenen',
          'La ventana Recalcular más en Savour',
          'Recalcular más',
          'Introduce un factor, el rendimiento que necesitas o lo que tienes: «tengo 3 kilos de chalota». Toda la receta se recalcula.'
        )
      ],
      faq: [
        ['¿Cambia la receta original?', 'No. Se recalcula en pantalla; con «Original» vuelves a la receta base.'],
        [
          '¿Puedo recalcular por unidades o raciones?',
          'Sí. Si la receta tiene un rendimiento, como 50 unidades o 4 personas, indicas cuántas necesitas.'
        ],
        [
          '¿Puedo imprimir la receta recalculada?',
          'Sí. Imprimes justo las cantidades que ves en pantalla, o las abres en el modo cocina.'
        ],
      ["¿Sale bien el plural al escalar?", "Sí. «1 chalota» pasa a «2 chalotas», también en el rendimiento. La receta original nunca cambia."],
      ["¿Funciona escalar también con cócteles?", "Sí. Savour conoce dashes y cucharas de bar, y las oz de una bebida siguen en oz. Así haces un batch de un cóctel sin cálculos. [Savour para bartenders](/es/para-bartenders)."]
      ]
    },
    fr: {
      benefits: [
        ['Un geste', 'De ¼× à 10× avec un bouton.'],
        ['Selon ce que tu as', 'Convertis selon l’ingrédient disponible.'],
        ['L’original reste', '« Original » remet tout comme avant.']
      ],
      showcase: [
        shot(
          'omrekenen',
          'Beurre blanc dans Savour, converti par trois',
          'Convertir avec un bouton',
          'Sous le titre, des boutons de ¼× à 10×. Toutes les quantités suivent, en unités propres : 3 décilitres de vin, 750 grammes de beurre.'
        ),
        shot(
          'meer-omrekenen',
          'La fenêtre Convertir davantage dans Savour',
          'Convertir davantage',
          'Indique un facteur, le rendement voulu, ou ce que tu as : « j’ai 3 kilos d’échalotes ». Toute la recette suit.'
        )
      ],
      faq: [
        [
          'La recette originale change-t-elle ?',
          'Non. La conversion se fait à l’écran ; « Original » te ramène à la recette de base.'
        ],
        [
          'Puis-je convertir en pièces ou en portions ?',
          'Oui. Si la recette a un rendement, comme 50 pièces ou 4 personnes, tu indiques combien il t’en faut.'
        ],
        [
          'Puis-je imprimer la recette convertie ?',
          'Oui. Tu imprimes exactement les quantités affichées à l’écran, ou tu les ouvres en mode cuisine.'
        ],
      ["Le pluriel est-il juste après conversion ?", "Oui. « 1 échalote » devient « 2 échalotes », aussi pour le rendement. La recette d’origine ne change jamais."],
      ["La conversion marche-t-elle aussi pour les cocktails ?", "Oui. Savour connaît les dashes et les cuillères de bar, et les oz d’une boisson restent en oz. Tu fais un batch de cocktail sans calcul. [Savour pour les bartenders](/fr/pour-bartenders)."]
      ]
    }
  },

  print: {
    nl: {
      benefits: [
        ['Eén recept of een hele map', 'In één keer, in de volgorde van je map.'],
        ['Leesbaar op afstand', 'Rustige opmaak, ook met een vlek erop.'],
        ['Met je eigen logo', 'Met Savour Pro bovenaan elke pagina.']
      ],
      showcase: [
        shot(
          'print',
          'Een geprint recept uit Savour met logo en printdatum',
          'Zo ziet een print eruit',
          'Bovenaan het logo en de naam van je restaurant, daaronder ingrediënten en bereiding naast elkaar. Onderaan de printdatum, zodat je ziet of de klapper nog actueel is.'
        ),
        shot(
          'mappen',
          'Receptenmappen in Savour',
          'Een hele map in één keer',
          'Open een map en print hem in één keer, met een inhoudsopgave en het nummer van elk recept onderaan de pagina.'
        )
      ],
      faq: [
        ['Kan ik kiezen tussen A4 en A5?', 'Ja. A4 voor de klapper in de keuken, A5 voor een kleine map aan de pass.'],
        [
          'Hoe zet ik mijn logo op de print?',
          'Met Savour Pro onder Instellingen → Logo op prints. In een team geldt het logo van de eigenaar voor iedereen.'
        ],
        [
          'Print ik de omgerekende hoeveelheden?',
          'Ja. Heb je een recept omgerekend, dan print je precies die hoeveelheden.'
        ],
      ["Kan ik ook een MEP-lijst printen?", "Ja. Elke MEP-lijst print je op één A4, staand of liggend, om aan de muur van je post te hangen. [Over MEP-lijsten](@feature:mep)."]
      ]
    },
    en: {
      benefits: [
        ['One recipe or a whole folder', 'At once, in the order of your folder.'],
        ['Readable from a distance', 'A calm layout, even with a stain on it.'],
        ['With your own logo', 'With Savour Pro at the top of every page.']
      ],
      showcase: [
        shot(
          'print',
          'A printed recipe from Savour with logo and print date',
          'What a print looks like',
          'At the top your restaurant’s logo and name, below that ingredients and method side by side. At the bottom the print date, so you can see whether the binder is still current.'
        ),
        shot(
          'mappen',
          'Recipe folders in Savour',
          'A whole folder at once',
          'Open a folder and print it in one go, with a table of contents and the number of each recipe at the bottom of the page.'
        )
      ],
      faq: [
        [
          'Can I choose between A4 and A5?',
          'Yes. A4 for the binder in the kitchen, A5 for a small folder at the pass.'
        ],
        [
          'How do I put my logo on the print?',
          'With Savour Pro under Settings → Logo on prints. In a team the owner’s logo applies to everyone.'
        ],
        ['Do I print the converted quantities?', 'Yes. If you converted a recipe, you print exactly those quantities.'],
      ["Can I print a prep list too?", "Yes. Every prep list prints on one A4 page, portrait or landscape, to hang on the wall of your section. [About prep lists](@feature:mep)."]
      ]
    },
    de: {
      benefits: [
        ['Ein Rezept oder ein ganzer Ordner', 'In einem Schritt, in der Reihenfolge deines Ordners.'],
        ['Lesbar aus der Entfernung', 'Ruhige Gestaltung, auch mit einem Fleck darauf.'],
        ['Mit deinem eigenen Logo', 'Mit Savour Pro oben auf jeder Seite.']
      ],
      showcase: [
        shot(
          'print',
          'Ein gedrucktes Rezept aus Savour mit Logo und Druckdatum',
          'So sieht ein Ausdruck aus',
          'Oben Logo und Name deines Restaurants, darunter Zutaten und Zubereitung nebeneinander. Unten das Druckdatum, damit du siehst, ob die Mappe noch aktuell ist.'
        ),
        shot(
          'mappen',
          'Rezeptordner in Savour',
          'Ein ganzer Ordner in einem Schritt',
          'Öffne einen Ordner und drucke ihn in einem Schritt, mit Inhaltsverzeichnis und der Nummer jedes Rezepts unten auf der Seite.'
        )
      ],
      faq: [
        [
          'Kann ich zwischen A4 und A5 wählen?',
          'Ja. A4 für die Mappe in der Küche, A5 für einen kleinen Ordner am Pass.'
        ],
        [
          'Wie kommt mein Logo auf den Ausdruck?',
          'Mit Savour Pro unter Einstellungen → Logo auf Ausdrucken. Im Team gilt das Logo des Eigentümers für alle.'
        ],
        ['Drucke ich die umgerechneten Mengen?', 'Ja. Hast du ein Rezept umgerechnet, druckst du genau diese Mengen.'],
      ["Kann ich auch eine MEP-Liste drucken?", "Ja. Jede MEP-Liste druckst du auf einer A4-Seite, hoch oder quer, für die Wand an deinem Posten. [Zu den MEP-Listen](@feature:mep)."]
      ]
    },
    es: {
      benefits: [
        ['Una receta o una carpeta entera', 'De una vez, en el orden de tu carpeta.'],
        ['Se lee a distancia', 'Una presentación tranquila, aunque tenga una mancha.'],
        ['Con tu propio logotipo', 'Con Savour Pro, arriba en cada página.']
      ],
      showcase: [
        shot(
          'print',
          'Una receta impresa desde Savour con logotipo y fecha',
          'Así queda una impresión',
          'Arriba el logotipo y el nombre de tu restaurante; debajo, ingredientes y elaboración uno al lado del otro. Abajo la fecha de impresión, para ver si el archivador sigue al día.'
        ),
        shot(
          'mappen',
          'Carpetas de recetas en Savour',
          'Una carpeta entera de una vez',
          'Abre una carpeta e imprímela de una vez, con índice y el número de cada receta al pie de la página.'
        )
      ],
      faq: [
        [
          '¿Puedo elegir entre A4 y A5?',
          'Sí. A4 para el archivador de la cocina, A5 para una carpeta pequeña en el pase.'
        ],
        [
          '¿Cómo pongo mi logotipo en la impresión?',
          'Con Savour Pro en Ajustes → Logo en las impresiones. En un equipo vale el logotipo del propietario para todos.'
        ],
        ['¿Imprimo las cantidades recalculadas?', 'Sí. Si has recalculado una receta, imprimes justo esas cantidades.'],
      ["¿Puedo imprimir también una lista MEP?", "Sí. Cada lista MEP se imprime en una sola hoja A4, vertical u horizontal, para colgarla en tu partida. [Sobre las listas MEP](@feature:mep)."]
      ]
    },
    fr: {
      benefits: [
        ['Une recette ou un dossier entier', 'En une fois, dans l’ordre de ton dossier.'],
        ['Lisible de loin', 'Une mise en page sobre, même avec une tache.'],
        ['Avec ton propre logo', 'Avec Savour Pro, en haut de chaque page.']
      ],
      showcase: [
        shot(
          'print',
          'Une recette imprimée depuis Savour avec logo et date',
          'À quoi ressemble une impression',
          'En haut, le logo et le nom de ton restaurant ; en dessous, ingrédients et préparation côte à côte. En bas, la date d’impression, pour voir si le classeur est encore à jour.'
        ),
        shot(
          'mappen',
          'Dossiers de recettes dans Savour',
          'Un dossier entier en une fois',
          'Ouvre un dossier et imprime-le en une fois, avec une table des matières et le numéro de chaque recette en bas de page.'
        )
      ],
      faq: [
        ['Puis-je choisir entre A4 et A5 ?', 'Oui. A4 pour le classeur en cuisine, A5 pour un petit dossier au passe.'],
        [
          'Comment mettre mon logo sur l’impression ?',
          'Avec Savour Pro dans Paramètres → Logo sur les impressions. Dans une équipe, le logo du propriétaire vaut pour tous.'
        ],
        [
          'J’imprime les quantités converties ?',
          'Oui. Si tu as converti une recette, tu imprimes exactement ces quantités.'
        ],
      ["Puis-je aussi imprimer une liste MEP ?", "Oui. Chaque liste MEP s’imprime sur une seule page A4, en portrait ou en paysage, à accrocher au mur de ton poste. [Les listes MEP](@feature:mep)."]
      ]
    }
  },

  cloud: {
    nl: {
      benefits: [
        ['Overal hetzelfde', 'Computer, tablet en telefoon tonen dezelfde recepten.'],
        ['Ook offline', 'In de koelcel en op locatie open je gewoon je recepten.'],
        ['Van jou', 'Alleen jij en wie jij uitnodigt, zien je recepten.']
      ],
      showcase: [
        shot(
          'bibliotheek',
          'De receptenbibliotheek van Savour op een laptop',
          'Op de computer',
          'Importeren en ordenen doe je het liefst op een groot scherm. Wat je hier aanpast, staat meteen op je telefoon.'
        ),
        shot(
          'recept',
          'Een recept in Savour op de telefoon',
          'In de keuken',
          'Op de telefoon open je hetzelfde recept, met grote letters. Eenmaal geopend, blijft het ook zonder verbinding leesbaar.'
        )
      ],
      faq: [
        [
          'Werkt Savour zonder internet?',
          'Ja. Heb je Savour één keer met internet geopend, dan open je je recepten ook zonder verbinding. Aanpassen kan weer zodra je online bent.'
        ],
        [
          'Kan ik al mijn recepten downloaden?',
          'Een back-up van je hele receptenboek download je wanneer je wilt, ook zonder Pro; met Savour Pro ook als Word-bestanden.'
        ],
        [
          'Wat gebeurt er als ik stop met Pro?',
          'Al je recepten blijven staan. Alleen toevoegen boven de 100 recepten kan dan niet meer.'
        ],
      ["Kan ik bij importeren iets kwijtraken?", "Nee. Elk bestand dat je importeert en elk resultaat van de AI wordt bewaard. Sluit je Savour voordat je hebt opgeslagen, of valt de verbinding weg, dan biedt Savour het de volgende keer opnieuw aan."],
      ["En als een recept er al in staat?", "Dan laat Savour bij het importeren zien welke recepten er al staan. Je kiest: overslaan, alleen de gewijzigde opslaan, of toch opslaan. Er verdwijnt nooit iets zonder dat jij het kiest."],
      ["Zie ik ook de allergenen?", "Ja. Met Savour Pro staan de allergenen bij elk recept, ook via basisrecepten. Savour vult ze zelf in; aanpassen mag altijd. [Allergenen per recept](@feature:allergens)."]
      ]
    },
    en: {
      benefits: [
        ['The same everywhere', 'Computer, tablet and phone show the same recipes.'],
        ['Offline too', 'In the walk-in or on location you simply open your recipes.'],
        ['Yours', 'Only you and the people you invite see your recipes.']
      ],
      showcase: [
        shot(
          'bibliotheek',
          'The Savour recipe library on a laptop',
          'On the computer',
          'Importing and organising works best on a big screen. What you change here is on your phone straight away.'
        ),
        shot(
          'recept',
          'A recipe in Savour on the phone',
          'In the kitchen',
          'On the phone you open the same recipe, in large text. Once opened, it stays readable without a connection too.'
        )
      ],
      faq: [
        [
          'Does Savour work without internet?',
          'Yes. Once you have opened Savour with internet, you can open your recipes without a connection too. Editing works again as soon as you are online.'
        ],
        [
          'Can I download all my recipes?',
          'You can download a backup of your whole recipe book whenever you like, even without Pro; with Savour Pro also as Word files.'
        ],
        ['What happens if I stop Pro?', 'All your recipes stay. You just cannot add more than 100 recipes any more.'],
      ["Can I lose anything while importing?", "No. Every file you import and every AI result is kept. If you close Savour before saving, or the connection drops, Savour offers it again next time."],
      ["What if a recipe is already there?", "Then Savour shows which recipes are already there when you import. You choose: skip, only save the changed ones, or save anyway. Nothing ever disappears unless you choose it."],
      ["Do I see the allergens too?", "Yes. With Savour Pro the allergens are on every recipe, including through base recipes. Savour fills them in itself; you can always adjust. [Allergens per recipe](@feature:allergens)."]
      ]
    },
    de: {
      benefits: [
        ['Überall gleich', 'Computer, Tablet und Handy zeigen dieselben Rezepte.'],
        ['Auch offline', 'Im Kühlraum und vor Ort öffnest du einfach deine Rezepte.'],
        ['Deine', 'Nur du und wen du einlädst, sehen deine Rezepte.']
      ],
      showcase: [
        shot(
          'bibliotheek',
          'Die Rezeptbibliothek von Savour auf einem Laptop',
          'Am Computer',
          'Importieren und Ordnen machst du am liebsten auf einem großen Bildschirm. Was du hier änderst, steht sofort auf deinem Handy.'
        ),
        shot(
          'recept',
          'Ein Rezept in Savour auf dem Handy',
          'In der Küche',
          'Auf dem Handy öffnest du dasselbe Rezept, mit großer Schrift. Einmal geöffnet, bleibt es auch ohne Verbindung lesbar.'
        )
      ],
      faq: [
        [
          'Funktioniert Savour ohne Internet?',
          'Ja. Hast du Savour einmal mit Internet geöffnet, öffnest du deine Rezepte auch ohne Verbindung. Bearbeiten geht wieder, sobald du online bist.'
        ],
        [
          'Kann ich alle meine Rezepte herunterladen?',
          'Mit Savour Pro lädst du dein ganzes Rezeptbuch herunter, wann du willst, als Word-Dateien oder als Sicherung.'
        ],
        [
          'Was passiert, wenn ich Pro beende?',
          'Alle deine Rezepte bleiben. Nur mehr als 100 Rezepte hinzufügen geht dann nicht mehr.'
        ],
      ["Kann beim Importieren etwas verloren gehen?", "Nein. Jede Datei, die du importierst, und jedes KI-Ergebnis wird aufbewahrt. Schließt du Savour vor dem Speichern oder bricht die Verbindung ab, bietet Savour es beim nächsten Mal erneut an."],
      ["Und wenn ein Rezept schon da ist?", "Dann zeigt Savour beim Importieren, welche Rezepte schon da sind. Du wählst: überspringen, nur die geänderten speichern oder trotzdem speichern. Es verschwindet nie etwas, ohne dass du es wählst."],
      ["Sehe ich auch die Allergene?", "Ja. Mit Savour Pro stehen die Allergene bei jedem Rezept, auch über Grundrezepte. Savour füllt sie selbst aus; anpassen kannst du immer. [Allergene pro Rezept](@feature:allergens)."]
      ]
    },
    es: {
      benefits: [
        ['Igual en todas partes', 'Ordenador, tableta y móvil muestran las mismas recetas.'],
        ['También sin conexión', 'En la cámara o fuera de casa abres tus recetas sin más.'],
        ['Tuyas', 'Solo tú y quien invites veis tus recetas.']
      ],
      showcase: [
        shot(
          'bibliotheek',
          'La biblioteca de recetas de Savour en un portátil',
          'En el ordenador',
          'Importar y ordenar se hace mejor en una pantalla grande. Lo que cambias aquí está enseguida en tu móvil.'
        ),
        shot(
          'recept',
          'Una receta en Savour en el móvil',
          'En la cocina',
          'En el móvil abres la misma receta, con letra grande. Una vez abierta, se puede leer también sin conexión.'
        )
      ],
      faq: [
        [
          '¿Savour funciona sin internet?',
          'Sí. Si has abierto Savour una vez con internet, abres tus recetas también sin conexión. Editar vuelve a funcionar en cuanto estás en línea.'
        ],
        [
          '¿Puedo descargar todas mis recetas?',
          'Una copia de seguridad de todo tu recetario la descargas cuando quieras, también sin Pro; con Savour Pro también como archivos de Word.'
        ],
        ['¿Qué pasa si dejo Pro?', 'Todas tus recetas se quedan. Solo que ya no puedes añadir más de 100 recetas.'],
      ["¿Puedo perder algo al importar?", "No. Cada archivo que importas y cada resultado de la IA se guarda. Si cierras Savour antes de guardar, o se corta la conexión, Savour te lo vuelve a ofrecer la próxima vez."],
      ["¿Y si una receta ya está?", "Entonces Savour te muestra al importar qué recetas ya están. Tú eliges: omitir, guardar solo las modificadas o guardar igualmente. Nunca desaparece nada sin que tú lo elijas."],
      ["¿Veo también los alérgenos?", "Sí. Con Savour Pro los alérgenos aparecen en cada receta, también a través de recetas base. Savour los rellena por sí mismo; siempre puedes ajustarlos. [Alérgenos por receta](@feature:allergens)."]
      ]
    },
    fr: {
      benefits: [
        ['Partout pareil', 'Ordinateur, tablette et téléphone affichent les mêmes recettes.'],
        ['Hors ligne aussi', 'En chambre froide ou à l’extérieur, tu ouvres simplement tes recettes.'],
        ['À toi', 'Seuls toi et ceux que tu invites voient tes recettes.']
      ],
      showcase: [
        shot(
          'bibliotheek',
          'La bibliothèque de recettes de Savour sur un ordinateur portable',
          'Sur l’ordinateur',
          'Importer et ranger se fait mieux sur un grand écran. Ce que tu modifies ici apparaît aussitôt sur ton téléphone.'
        ),
        shot(
          'recept',
          'Une recette dans Savour sur le téléphone',
          'En cuisine',
          'Sur le téléphone, tu ouvres la même recette, en grands caractères. Une fois ouverte, elle reste lisible même sans connexion.'
        )
      ],
      faq: [
        [
          'Savour fonctionne-t-il sans internet ?',
          'Oui. Une fois Savour ouvert avec internet, tu ouvres tes recettes même sans connexion. La modification revient dès que tu es en ligne.'
        ],
        [
          'Puis-je télécharger toutes mes recettes ?',
          'Tu télécharges une sauvegarde de tout ton livre de recettes quand tu veux, même sans Pro ; avec Savour Pro, aussi en fichiers Word.'
        ],
        [
          'Que se passe-t-il si j’arrête Pro ?',
          'Toutes tes recettes restent. Tu ne peux simplement plus en ajouter au-delà de 100.'
        ],
      ["Puis-je perdre quelque chose à l’import ?", "Non. Chaque fichier importé et chaque résultat de l’IA est conservé. Si tu fermes Savour avant d’enregistrer, ou si la connexion coupe, Savour te le propose à nouveau la fois suivante."],
      ["Et si une recette existe déjà ?", "Savour te montre alors à l’import quelles recettes existent déjà. Tu choisis : ignorer, enregistrer seulement les modifiées, ou enregistrer quand même. Rien ne disparaît jamais sans ton choix."],
      ["Est-ce que je vois aussi les allergènes ?", "Oui. Avec Savour Pro, les allergènes figurent sur chaque recette, y compris via les recettes de base. Savour les remplit lui-même ; tu peux toujours ajuster. [Allergènes par recette](@feature:allergens)."]
      ]
    }
  },

  chefs: {
    nl: {
      benefits: [
        ['Precies tot op de gram', 'Je recept blijft zoals je het schreef.'],
        ['Op couverts en porties', 'Van 8 naar 120, van 2 liter fond naar 20.'],
        ['Je kennis bewaard', 'Ook als je van keuken wisselt.']
      ],
      showcase: [
        shot(
          'kookmodus',
          'De kookmodus van Savour op de telefoon',
          'Koken vanaf de telefoon',
          'In de kookmodus staat alleen het recept op het scherm, in grote letters, en het scherm blijft aan. Wat klaar is, vink je af.'
        ),
        shot(
          'omrekenen',
          'Een recept in Savour drie keer omgerekend',
          'Omrekenen zonder rekenmachine',
          'Kies 3× of vul de opbrengst in die je nodig hebt. Alle hoeveelheden rekenen mee; het originele recept blijft staan.'
        )
      ],
      faq: [
        [
          'Wat kost Savour?',
          'Gratis tot 100 recepten. Savour Pro kost €2,99 per maand of €29 per jaar, voor onbeperkt recepten, keukenteams, AI-import en printen met je logo.'
        ],
        [
          'Is Savour ook voor thuiskoks?',
          'Het kan, maar Savour is gemaakt voor de professionele keuken: grote receptenboeken, teams en de service.'
        ],
        [
          'Blijven mijn recepten als ik stop?',
          'Ja. Je recepten blijven altijd van jou; stop je met Pro, dan blijft alles staan.'
        ],
      ["Helpt Savour ook bij de mise-en-place?", "Ja. Onder Tools → MEP-lijsten maak je met Savour Pro per post een lijst met kaarten en onderdelen. Iedereen in het keukenteam vinkt live af, ook met een gratis account. [Over MEP-lijsten](@feature:mep)."],
      ["Leert Savour van wat ik verbeter?", "Alleen als \"Help de Savour-lezer verbeteren\" aan staat (Instellingen). Wat je verbetert, gebruiken we om de lezer beter te maken; we kijken alles na en de lezer verandert nooit vanzelf. Je kunt het altijd uitzetten."]
      ]
    },
    en: {
      benefits: [
        ['Precise to the gram', 'Your recipe stays as you wrote it.'],
        ['By covers and portions', 'From 8 to 120, from 2 litres of stock to 20.'],
        ['Your knowledge kept', 'Even when you change kitchens.']
      ],
      showcase: [
        shot(
          'kookmodus',
          'Savour’s cooking mode on the phone',
          'Cooking from the phone',
          'In cooking mode only the recipe is on screen, in large text, and the screen stays on. Tick off what is done.'
        ),
        shot(
          'omrekenen',
          'A recipe in Savour converted three times',
          'Converting without a calculator',
          'Pick 3× or enter the yield you need. All quantities follow; the original recipe stays as it was.'
        )
      ],
      faq: [
        [
          'What does Savour cost?',
          'Free up to 100 recipes. Savour Pro costs €2.99 a month or €29 a year, for unlimited recipes, kitchen teams, AI import and printing with your logo.'
        ],
        [
          'Is Savour for home cooks too?',
          'It can be, but Savour is made for the professional kitchen: large recipe books, teams and service.'
        ],
        ['Do my recipes stay if I stop?', 'Yes. Your recipes are always yours; if you stop Pro, everything stays.'],
      ["Does Savour help with mise en place too?", "Yes. Under Tools → Prep lists you create a list per section with cards and items, with Savour Pro. Everyone in the kitchen team ticks off live, also with a free account. [About prep lists](@feature:mep)."],
      ["Does Savour learn from what I correct?", "Only when \"Help improve the Savour reader\" is on (Settings). What you correct helps us make the reader better; we check everything and the reader never changes by itself. You can switch it off at any time."]
      ]
    },
    de: {
      benefits: [
        ['Genau aufs Gramm', 'Dein Rezept bleibt, wie du es geschrieben hast.'],
        ['Auf Gedecke und Portionen', 'Von 8 auf 120, von 2 Liter Fond auf 20.'],
        ['Dein Wissen bewahrt', 'Auch wenn du die Küche wechselst.']
      ],
      showcase: [
        shot(
          'kookmodus',
          'Der Kochmodus von Savour auf dem Handy',
          'Kochen vom Handy',
          'Im Kochmodus steht nur das Rezept auf dem Bildschirm, in großer Schrift, und der Bildschirm bleibt an. Was fertig ist, hakst du ab.'
        ),
        shot(
          'omrekenen',
          'Ein Rezept in Savour dreifach umgerechnet',
          'Umrechnen ohne Taschenrechner',
          'Wähle 3× oder gib die Ausbeute ein, die du brauchst. Alle Mengen rechnen mit; das Originalrezept bleibt stehen.'
        )
      ],
      faq: [
        [
          'Was kostet Savour?',
          'Kostenlos bis 100 Rezepte. Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr, für unbegrenzt Rezepte, Küchenteams, KI-Import und Drucken mit deinem Logo.'
        ],
        [
          'Ist Savour auch für Hobbyköche?',
          'Das geht, aber Savour ist für die Profiküche gebaut: große Rezeptbücher, Teams und den Service.'
        ],
        [
          'Bleiben meine Rezepte, wenn ich aufhöre?',
          'Ja. Deine Rezepte gehören immer dir; beendest du Pro, bleibt alles erhalten.'
        ],
      ["Hilft Savour auch bei der Mise en place?", "Ja. Unter Werkzeuge → MEP-Listen legst du mit Savour Pro pro Posten eine Liste mit Karten und Positionen an. Alle im Küchenteam haken live ab, auch mit einem kostenlosen Konto. [Zu den MEP-Listen](@feature:mep)."],
      ["Lernt Savour aus dem, was ich verbessere?", "Nur wenn „Hilf, den Savour-Leser zu verbessern“ an ist (Einstellungen). Was du verbesserst, hilft uns, den Leser besser zu machen; wir prüfen alles, und der Leser ändert sich nie von selbst. Du kannst es jederzeit ausschalten."]
      ]
    },
    es: {
      benefits: [
        ['Exacto al gramo', 'Tu receta se queda como la escribiste.'],
        ['Por cubiertos y raciones', 'De 8 a 120, de 2 litros de fondo a 20.'],
        ['Tu conocimiento a salvo', 'También si cambias de cocina.']
      ],
      showcase: [
        shot(
          'kookmodus',
          'El modo cocina de Savour en el móvil',
          'Cocinar desde el móvil',
          'En el modo cocina solo está la receta en pantalla, con letra grande, y la pantalla no se apaga. Lo que está hecho, lo marcas.'
        ),
        shot(
          'omrekenen',
          'Una receta en Savour recalculada por tres',
          'Recalcular sin calculadora',
          'Elige 3× o indica el rendimiento que necesitas. Todas las cantidades cambian; la receta original se queda como estaba.'
        )
      ],
      faq: [
        [
          '¿Cuánto cuesta Savour?',
          'Gratis hasta 100 recetas. Savour Pro cuesta 2,99 € al mes o 29 € al año, con recetas ilimitadas, equipos de cocina, importación con IA e impresión con tu logotipo.'
        ],
        [
          '¿Savour también es para cocineros caseros?',
          'Se puede, pero Savour está hecho para la cocina profesional: grandes recetarios, equipos y el servicio.'
        ],
        ['¿Se quedan mis recetas si lo dejo?', 'Sí. Tus recetas siempre son tuyas; si dejas Pro, todo se queda.'],
      ["¿Ayuda Savour también con la mise en place?", "Sí. En Herramientas → Listas MEP creas con Savour Pro una lista por partida con tarjetas y elementos. Todo el equipo de cocina marca en directo, también con una cuenta gratuita. [Sobre las listas MEP](@feature:mep)."],
      ["¿Aprende Savour de lo que corrijo?", "Solo si «Ayuda a mejorar el lector de Savour» está activado (Ajustes). Lo que corriges nos ayuda a mejorar el lector; lo revisamos todo y el lector nunca cambia por sí solo. Puedes desactivarlo cuando quieras."]
      ]
    },
    fr: {
      benefits: [
        ['Précis au gramme', 'Ta recette reste telle que tu l’as écrite.'],
        ['En couverts et en portions', 'De 8 à 120, de 2 litres de fond à 20.'],
        ['Ton savoir conservé', 'Même quand tu changes de cuisine.']
      ],
      showcase: [
        shot(
          'kookmodus',
          'Le mode cuisine de Savour sur le téléphone',
          'Cuisiner depuis le téléphone',
          'En mode cuisine, seule la recette s’affiche, en grands caractères, et l’écran reste allumé. Tu coches ce qui est fait.'
        ),
        shot(
          'omrekenen',
          'Une recette dans Savour convertie par trois',
          'Convertir sans calculette',
          'Choisis 3× ou indique le rendement voulu. Toutes les quantités suivent ; la recette originale reste intacte.'
        )
      ],
      faq: [
        [
          'Combien coûte Savour ?',
          'Gratuit jusqu’à 100 recettes. Savour Pro coûte 2,99 € par mois ou 29 € par an, pour des recettes illimitées, des équipes de cuisine, l’import par IA et l’impression avec ton logo.'
        ],
        [
          'Savour est-il aussi pour les cuisiniers amateurs ?',
          'C’est possible, mais Savour est fait pour la cuisine professionnelle : grands livres de recettes, équipes et service.'
        ],
        [
          'Mes recettes restent-elles si j’arrête ?',
          'Oui. Tes recettes sont toujours à toi ; si tu arrêtes Pro, tout reste.'
        ],
      ["Savour aide-t-il aussi pour la mise en place ?", "Oui. Dans Outils → Listes MEP, tu crées avec Savour Pro une liste par poste avec cartes et éléments. Toute l’équipe de cuisine coche en direct, même avec un compte gratuit. [Les listes MEP](@feature:mep)."],
      ["Savour apprend-il de ce que je corrige ?", "Seulement si « Aide à améliorer le lecteur Savour » est activé (Paramètres). Ce que tu corriges nous aide à améliorer le lecteur ; nous vérifions tout et le lecteur ne change jamais tout seul. Tu peux le désactiver à tout moment."]
      ]
    }
  },

  brigade: {
    nl: {
      benefits: [
        ['Hetzelfde recept voor iedereen', 'Van chef de partie tot stagiair.'],
        ['Rechten die kloppen', 'De chef beheert, de sous-chef bewerkt, de koks lezen.'],
        ['Sneller ingewerkt', 'Nieuwe mensen lezen thuis al hoe het hier gaat.']
      ],
      showcase: [
        shot(
          'brigade',
          'De brigade van een keukenteam in Savour',
          'Iedereen op zijn plek',
          'In het scherm Brigade zie je wie er in het team zit en met welke rol. Vertrekt iemand, dan haal je diegene uit het team; de recepten blijven bij de keuken.'
        ),
        shot(
          'kookmodus',
          'De kookmodus van Savour op de telefoon',
          'Op de eigen telefoon',
          'Elk lid opent de recepten van de partie op de eigen telefoon, in grote letters in de kookmodus. Geen receptenmap met vlekken meer.'
        )
      ],
      faq: [
        [
          'Wat kost een keukenteam?',
          'Lid zijn is gratis. Het team zelf maak je met Savour Pro. Met een teamabonnement voor 5, 10 of 25 mensen (€8,99, €14,99 of €29,99 per maand) krijgt iedereen in het team Pro.'
        ],
        [
          'Heeft iedereen een account nodig?',
          'Ja, een eigen account, en dat is gratis. Wie wordt uitgenodigd, maakt een account of logt in en is daarna lid.'
        ],
        [
          'Kan iemand alleen meelezen?',
          'Ja. Als kok bekijkt, print en rekent iemand om, maar verandert niets aan de recepturen.'
        ],
      ["Kan de brigade samen een MEP-lijst afvinken?", "Ja. De MEP-lijsten staan ook op het keukenteam-scherm. Iedereen vinkt live af, ook met een gratis account, en ziet wie wat heeft afgevinkt. [Over MEP-lijsten](@feature:mep)."],
      ["Werkt het ook zonder wifi?", "Recepten die je eenmaal hebt geopend, lees je ook zonder internet. Wat je offline afvinkt op een MEP-lijst, bewaart Savour en verstuurt het zodra je weer verbinding hebt."]
      ]
    },
    en: {
      benefits: [
        ['The same recipe for everyone', 'From chef de partie to intern.'],
        ['Permissions that make sense', 'The chef manages, the sous-chef edits, the cooks read.'],
        ['Onboarded faster', 'New people read at home how things are done here.']
      ],
      showcase: [
        shot(
          'brigade',
          'The brigade of a kitchen team in Savour',
          'Everyone in their place',
          'The Brigade screen shows who is in the team and with which role. When someone leaves, you remove them from the team; the recipes stay with the kitchen.'
        ),
        shot(
          'kookmodus',
          'Savour’s cooking mode on the phone',
          'On their own phone',
          'Every member opens the section’s recipes on their own phone, in large text in cooking mode. No more stained recipe folder.'
        )
      ],
      faq: [
        [
          'What does a kitchen team cost?',
          'Being a member is free. You create the team itself with Savour Pro. With a team subscription for 5, 10 or 25 people (€8.99, €14.99 or €29.99 a month) everyone in the team gets Pro.'
        ],
        [
          'Does everyone need an account?',
          'Yes, their own account, and it is free. Whoever is invited creates an account or logs in and is then a member.'
        ],
        [
          'Can someone only read along?',
          'Yes. As a cook they view, print and convert, but change nothing in the recipes.'
        ],
      ["Can the brigade tick off a prep list together?", "Yes. The prep lists are also on the kitchen team screen. Everyone ticks off live, also with a free account, and sees who ticked off what. [About prep lists](@feature:mep)."],
      ["Does it work without wifi?", "Recipes you have opened once can also be read without internet. Whatever you tick off on a prep list while offline, Savour keeps and sends as soon as you are connected again."]
      ]
    },
    de: {
      benefits: [
        ['Dasselbe Rezept für alle', 'Vom Chef de Partie bis zum Praktikanten.'],
        ['Rechte, die passen', 'Der Küchenchef verwaltet, der Sous-Chef bearbeitet, die Köche lesen.'],
        ['Schneller eingearbeitet', 'Neue lesen schon zu Hause, wie es hier läuft.']
      ],
      showcase: [
        shot(
          'brigade',
          'Die Brigade eines Küchenteams in Savour',
          'Jeder an seinem Platz',
          'Im Bildschirm Brigade siehst du, wer im Team ist und mit welcher Rolle. Geht jemand, nimmst du ihn aus dem Team; die Rezepte bleiben in der Küche.'
        ),
        shot(
          'kookmodus',
          'Der Kochmodus von Savour auf dem Handy',
          'Auf dem eigenen Handy',
          'Jedes Mitglied öffnet die Rezepte des Postens auf dem eigenen Handy, in großer Schrift im Kochmodus. Kein fleckiger Rezeptordner mehr.'
        )
      ],
      faq: [
        [
          'Was kostet ein Küchenteam?',
          'Mitglied sein ist kostenlos. Das Team selbst erstellst du mit Savour Pro. Mit einem Teamabo für 5, 10 oder 25 Personen (8,99 €, 14,99 € oder 29,99 € pro Monat) bekommt jeder im Team Pro.'
        ],
        [
          'Braucht jeder ein Konto?',
          'Ja, ein eigenes Konto, und das ist kostenlos. Wer eingeladen wird, erstellt ein Konto oder meldet sich an und ist danach Mitglied.'
        ],
        [
          'Kann jemand nur mitlesen?',
          'Ja. Als Koch sieht, druckt und rechnet jemand um, ändert aber nichts an den Rezepturen.'
        ],
      ["Kann die Brigade gemeinsam eine MEP-Liste abhaken?", "Ja. Die MEP-Listen stehen auch auf dem Küchenteam-Bildschirm. Alle haken live ab, auch mit einem kostenlosen Konto, und sehen, wer was abgehakt hat. [Zu den MEP-Listen](@feature:mep)."],
      ["Geht das auch ohne WLAN?", "Rezepte, die du einmal geöffnet hast, liest du auch ohne Internet. Was du offline auf einer MEP-Liste abhakst, bewahrt Savour auf und sendet es, sobald du wieder verbunden bist."]
      ]
    },
    es: {
      benefits: [
        ['La misma receta para todos', 'Del jefe de partida al estudiante en prácticas.'],
        ['Permisos con sentido', 'El chef gestiona, el segundo edita, los cocineros leen.'],
        ['Incorporación más rápida', 'Los nuevos leen en casa cómo se hace aquí.']
      ],
      showcase: [
        shot(
          'brigade',
          'La brigada de un equipo de cocina en Savour',
          'Cada uno en su sitio',
          'En la pantalla Brigada ves quién está en el equipo y con qué rol. Si alguien se va, lo sacas del equipo; las recetas se quedan en la cocina.'
        ),
        shot(
          'kookmodus',
          'El modo cocina de Savour en el móvil',
          'En su propio móvil',
          'Cada miembro abre las recetas de su partida en su móvil, con letra grande en el modo cocina. Se acabó la carpeta de recetas con manchas.'
        )
      ],
      faq: [
        [
          '¿Cuánto cuesta un equipo de cocina?',
          'Ser miembro es gratis. El equipo lo creas con Savour Pro. Con una suscripción de equipo para 5, 10 o 25 personas (8,99 €, 14,99 € o 29,99 € al mes), todos los del equipo tienen Pro.'
        ],
        [
          '¿Todos necesitan una cuenta?',
          'Sí, una cuenta propia, y es gratis. Quien recibe la invitación crea una cuenta o inicia sesión y ya es miembro.'
        ],
        [
          '¿Puede alguien solo consultar?',
          'Sí. Como cocinero consulta, imprime y recalcula, pero no cambia nada de las recetas.'
        ],
      ["¿Puede la brigada marcar junta una lista MEP?", "Sí. Las listas MEP también están en la pantalla del equipo de cocina. Todos marcan en directo, también con una cuenta gratuita, y ven quién marcó qué. [Sobre las listas MEP](@feature:mep)."],
      ["¿Funciona también sin wifi?", "Las recetas que has abierto una vez se leen también sin internet. Lo que marcas sin conexión en una lista MEP, Savour lo guarda y lo envía en cuanto vuelves a tener conexión."]
      ]
    },
    fr: {
      benefits: [
        ['La même recette pour tous', 'Du chef de partie au stagiaire.'],
        ['Des droits qui ont du sens', 'Le chef gère, le sous-chef modifie, les cuisiniers lisent.'],
        ['Intégration plus rapide', 'Les nouveaux lisent chez eux comment on fait ici.']
      ],
      showcase: [
        shot(
          'brigade',
          'La brigade d’une équipe de cuisine dans Savour',
          'Chacun à sa place',
          'L’écran Brigade montre qui est dans l’équipe et avec quel rôle. Quand quelqu’un part, tu le retires de l’équipe ; les recettes restent à la cuisine.'
        ),
        shot(
          'kookmodus',
          'Le mode cuisine de Savour sur le téléphone',
          'Sur son propre téléphone',
          'Chaque membre ouvre les recettes de sa partie sur son téléphone, en grands caractères en mode cuisine. Fini le classeur taché.'
        )
      ],
      faq: [
        [
          'Combien coûte une équipe de cuisine ?',
          'Être membre est gratuit. L’équipe elle-même se crée avec Savour Pro. Avec un abonnement d’équipe pour 5, 10 ou 25 personnes (8,99 €, 14,99 € ou 29,99 € par mois), tout le monde dans l’équipe a Pro.'
        ],
        [
          'Chacun a-t-il besoin d’un compte ?',
          'Oui, son propre compte, et il est gratuit. La personne invitée crée un compte ou se connecte, puis devient membre.'
        ],
        [
          'Quelqu’un peut-il seulement consulter ?',
          'Oui. Comme cuisinier, il consulte, imprime et convertit, mais ne change rien aux recettes.'
        ],
      ["La brigade peut-elle cocher ensemble une liste MEP ?", "Oui. Les listes MEP sont aussi sur l’écran de l’équipe de cuisine. Tout le monde coche en direct, même avec un compte gratuit, et voit qui a coché quoi. [Les listes MEP](@feature:mep)."],
      ["Ça marche aussi sans wifi ?", "Les recettes que tu as ouvertes une fois se lisent aussi sans internet. Ce que tu coches hors ligne sur une liste MEP, Savour le garde et l’envoie dès que tu es de nouveau connecté."]
      ]
    }
  }
};
