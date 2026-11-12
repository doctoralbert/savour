// Pagina "Alternatief voor Paprika" (2026-11-12), in vijf talen. tools/build-seo.mjs maakt er een losse pagina van,
// met een vergelijkingstabel en vragen (ook als FAQPage voor zoekmachines).
// Feitelijk en controleerbaar: geen "de beste", wel wat Paprika en Savour elk doen. Wat over Paprika staat, komt van
// paprikaapp.com (gecontroleerd op 12 november 2026); alles over Savour klopt met CLAUDE.md en de app.
// Paprika veranderd? Pas dan ook de vergelijking in de blog aan (tools/site-blog.mjs, site-pages-*.mjs, site-blog-rich-2.mjs).

export const PAPRIKA_PAGE = {
  nl: {
    slug: 'alternatief-voor-paprika',
    title: 'Alternatief voor Paprika voor koks: overstappen naar Savour | Savour',
    desc: 'Zoek je een alternatief voor Paprika Recipe Manager in een professionele keuken? Savour heeft keukenteams, omrekenen op couverts en printen met je logo. Je Paprika-recepten neem je in een paar minuten mee, met foto’s.',
    crumb: 'Alternatief voor Paprika',
    h1: 'Het alternatief voor Paprika, voor de professionele keuken',
    lead: 'Paprika is een fijne app voor thuis. Kook je in een restaurant, dan heb je andere dingen nodig. Je recepten neem je in een paar minuten mee.',
    sections: [
      [
        'Paprika verandert',
        'Paprika 4 vervangt Paprika 3. De gratis versie bewaart tot 50 recepten. Synchroniseren tussen apparaten, delen en importeren van foto’s horen bij Premium, en daarvoor betaal je een abonnement. Wie Paprika 3 had, krijgt gratis een Standard-versie met onbeperkt recepten en synchroniseren. Een goed moment om te kijken wat je in je keuken eigenlijk nodig hebt.'
      ],
      [
        'Gemaakt voor de keuken, niet voor thuis',
        'Paprika is sterk in weekmenu’s, boodschappenlijstjes en een voorraadkast voor thuis. Dat heeft Savour niet. Savour is gemaakt voor de chef en de brigade: recepten precies zoals je ze schreef, tot op de gram, omrekenen op couverts en stuks, en grote letters in de kookmodus als je tussen de pannen staat.'
      ],
      [
        'Samen uit dezelfde recepten',
        'In een keukenteam werkt de hele brigade met dezelfde versie, met drie rollen: de eigenaar beheert, sous-chefs voegen toe en passen aan, koks kijken mee zonder per ongeluk iets te wissen. Een keukenteam maak je met Savour Pro; lid zijn is gratis.'
      ],
      [
        'Overstappen in een paar minuten',
        'Exporteer je recepten in Paprika als “Paprika Recipe Format” (.paprikarecipes) en kies dat bestand in Savour bij Recept toevoegen. Naam, ingrediënten, bereiding, opbrengst, notities en de foto gaan mee. Stap voor stap: [overstappen vanuit Paprika](/handleiding-overstappen-naar-savour#import-paprika).\n\nJe andere recepten in Word, PDF of tekst leest Savour gratis in. Foto’s van kladjes lezen gaat met Savour Pro.'
      ],
      [
        'Paprika en Savour op een rij',
        'Wat elke app doet, zonder mooipraterij. Kook je vooral thuis, dan past Paprika misschien beter.',
        {
          head: ['', 'Paprika', 'Savour'],
          rows: [
            ['Gemaakt voor', 'de thuiskok', 'de chef en de brigade'],
            ['Gratis', 'tot 50 recepten', 'tot 100 recepten'],
            ['Betaald', 'Premium, als abonnement', 'Pro: €2,99 per maand of €29 per jaar'],
            ['Samenwerken', 'gezin en kookboeken delen (Premium)', 'keukenteams met drie rollen'],
            ['Weekmenu en boodschappen', 'ja', 'nee'],
            ['Omrekenen', 'porties', 'couverts en stuks'],
            ['Allergenen per recept', 'nee', 'de 14 allergenen (Pro)'],
            ['Werkt op', 'iPhone, iPad, Mac, Android en Windows', 'elke browser, en als app op telefoon en tablet']
          ],
          note: 'Gecontroleerd op 12 november 2026, op paprikaapp.com en in Savour.'
        }
      ],
      [
        'Eerst proberen',
        'Begin gratis, tot 100 recepten. Nieuwe accounts krijgen 7 dagen Savour Pro, zonder betaalgegevens. Je Paprika hoeft niet meteen weg: probeer het eerst met een deel van je recepten. En stop je ooit met Pro, dan hou je altijd alles.'
      ]
    ],
    faq: [
      [
        'Gaan mijn foto’s mee?',
        'Ja. Bij een export uit Paprika (.paprikarecipes) gaat de foto van elk recept mee, net als de notities en de opbrengst.'
      ],
      [
        'Verandert Savour iets aan mijn recepten?',
        'Nee. Savour neemt over wat er staat en verzint nooit hoeveelheden of ingrediënten. Je recepten worden ook nooit vertaald.'
      ],
      [
        'Kan ik met mijn hele keuken overstappen?',
        'Ja. Iedereen neemt zijn eigen recepten mee uit Paprika. Maak daarna een keukenteam, dan werkt de hele brigade uit dezelfde recepten. Een keukenteam maken gaat met Savour Pro; lid zijn is gratis.'
      ],
      [
        'Wat als ik later toch terug wil?',
        'Je recepten blijven van jou. Je kunt ze altijd allemaal printen, en met Pro downloaden als Word-bestand of back-up. Stop je met Pro, dan blijft alles gewoon staan.'
      ]
    ]
  },
  en: {
    slug: 'en/paprika-alternative',
    title: 'Paprika alternative for chefs: moving to Savour | Savour',
    desc: 'Looking for an alternative to Paprika Recipe Manager in a professional kitchen? Savour has kitchen teams, scaling by covers and printing with your logo. Bring your Paprika recipes along in a few minutes, photos included.',
    crumb: 'Paprika alternative',
    h1: 'The Paprika alternative for the professional kitchen',
    lead: 'Paprika is a lovely app for home. If you cook in a restaurant, you need different things. Your recipes come along in a few minutes.',
    sections: [
      [
        'Paprika is changing',
        'Paprika 4 replaces Paprika 3. The free version keeps up to 50 recipes. Syncing between devices, sharing and importing from photos are part of Premium, which is a subscription. If you had Paprika 3, you get a free Standard version with unlimited recipes and syncing. A good moment to look at what your kitchen actually needs.'
      ],
      [
        'Made for the kitchen, not for home',
        'Paprika is strong at weekly meal plans, grocery lists and a pantry at home. Savour does not have those. Savour is made for the chef and the brigade: recipes exactly as you wrote them, to the gram, scaling by covers and pieces, and large text in cook mode when you are at the stove.'
      ],
      [
        'Everyone cooking from the same recipes',
        'In a kitchen team the whole brigade works from the same version, with three roles: the owner manages, sous-chefs add and edit, cooks read along without accidentally deleting anything. You create a kitchen team with Savour Pro; being a member is free.'
      ],
      [
        'Move in a few minutes',
        'In Paprika, export your recipes as “Paprika Recipe Format” (.paprikarecipes) and pick that file in Savour under Add recipe. Name, ingredients, method, yield, notes and the photo come along. Step by step: [moving from Paprika](/en/guide-moving-to-savour#import-paprika).\n\nSavour reads your other recipes in Word, PDF or text for free. Reading photos of handwritten notes comes with Savour Pro.'
      ],
      [
        'Paprika and Savour side by side',
        'What each app does, without the sales talk. If you mostly cook at home, Paprika may suit you better.',
        {
          head: ['', 'Paprika', 'Savour'],
          rows: [
            ['Made for', 'the home cook', 'the chef and the brigade'],
            ['Free', 'up to 50 recipes', 'up to 100 recipes'],
            ['Paid', 'Premium, as a subscription', 'Pro: €2.99 a month or €29 a year'],
            ['Working together', 'family and cookbook sharing (Premium)', 'kitchen teams with three roles'],
            ['Meal plans and groceries', 'yes', 'no'],
            ['Scaling', 'servings', 'covers and pieces'],
            ['Allergens per recipe', 'no', 'the 14 allergens (Pro)'],
            ['Works on', 'iPhone, iPad, Mac, Android and Windows', 'any browser, and as an app on phone and tablet']
          ],
          note: 'Checked on 12 November 2026, on paprikaapp.com and in Savour.'
        }
      ],
      [
        'Try it first',
        'Start for free, up to 100 recipes. New accounts get 7 days of Savour Pro, no card needed. You do not have to drop Paprika straight away: try it with some of your recipes first. And if you ever stop Pro, you always keep everything.'
      ]
    ],
    faq: [
      [
        'Do my photos come along?',
        'Yes. With an export from Paprika (.paprikarecipes) the photo of every recipe comes along, as do the notes and the yield.'
      ],
      [
        'Does Savour change anything in my recipes?',
        'No. Savour takes what is there and never invents quantities or ingredients. Your recipes are never translated either.'
      ],
      [
        'Can my whole kitchen move?',
        'Yes. Everyone brings their own recipes along from Paprika. Then create a kitchen team, and the whole brigade works from the same recipes. Creating a kitchen team comes with Savour Pro; being a member is free.'
      ],
      [
        'What if I want to go back later?',
        'Your recipes stay yours. You can always print all of them, and with Pro download them as Word files or a backup. If you stop Pro, everything simply stays.'
      ]
    ]
  },
  de: {
    slug: 'de/paprika-alternative',
    title: 'Paprika-Alternative für Köche: Umstieg auf Savour | Savour',
    desc: 'Du suchst eine Alternative zu Paprika Recipe Manager für die Profiküche? Savour hat Küchenteams, Umrechnen nach Gedecken und Drucken mit deinem Logo. Deine Paprika-Rezepte nimmst du in ein paar Minuten mit, mit Fotos.',
    crumb: 'Paprika-Alternative',
    h1: 'Die Paprika-Alternative für die Profiküche',
    lead: 'Paprika ist eine schöne App für zu Hause. Kochst du in einem Restaurant, brauchst du anderes. Deine Rezepte nimmst du in ein paar Minuten mit.',
    sections: [
      [
        'Paprika ändert sich',
        'Paprika 4 ersetzt Paprika 3. Die kostenlose Version speichert bis zu 50 Rezepte. Synchronisieren zwischen Geräten, Teilen und Importieren von Fotos gehören zu Premium, und dafür zahlst du ein Abo. Wer Paprika 3 hatte, bekommt kostenlos eine Standard-Version mit unbegrenzt Rezepten und Synchronisieren. Ein guter Moment, um zu schauen, was deine Küche wirklich braucht.'
      ],
      [
        'Für die Küche gemacht, nicht für zu Hause',
        'Paprika ist stark bei Wochenmenüs, Einkaufslisten und einem Vorratsschrank für zu Hause. Das hat Savour nicht. Savour ist für den Küchenchef und die Brigade gemacht: Rezepte genau so, wie du sie geschrieben hast, aufs Gramm, Umrechnen nach Gedecken und Stück, und große Schrift im Kochmodus, wenn du am Herd stehst.'
      ],
      [
        'Alle kochen aus denselben Rezepten',
        'In einem Küchenteam arbeitet die ganze Brigade mit derselben Version, mit drei Rollen: Der Inhaber verwaltet, Sous-Chefs fügen hinzu und bearbeiten, Köche lesen mit, ohne aus Versehen etwas zu löschen. Ein Küchenteam erstellst du mit Savour Pro; Mitglied sein ist kostenlos.'
      ],
      [
        'In ein paar Minuten umsteigen',
        'Exportiere deine Rezepte in Paprika als „Paprika Recipe Format“ (.paprikarecipes) und wähle die Datei in Savour unter Rezept hinzufügen. Name, Zutaten, Zubereitung, Ausbeute, Notizen und das Foto kommen mit. Schritt für Schritt: [Umstieg von Paprika](/de/handbuch-umstieg-auf-savour#import-paprika).\n\nDeine anderen Rezepte in Word, PDF oder Text liest Savour kostenlos ein. Fotos von Notizzetteln lesen geht mit Savour Pro.'
      ],
      [
        'Paprika und Savour im Überblick',
        'Was jede App kann, ohne Schönfärberei. Kochst du vor allem zu Hause, passt Paprika vielleicht besser.',
        {
          head: ['', 'Paprika', 'Savour'],
          rows: [
            ['Gemacht für', 'den Hobbykoch', 'den Küchenchef und die Brigade'],
            ['Kostenlos', 'bis 50 Rezepte', 'bis 100 Rezepte'],
            ['Kostenpflichtig', 'Premium, als Abo', 'Pro: 2,99 € im Monat oder 29 € im Jahr'],
            ['Zusammenarbeiten', 'Familie und Kochbücher teilen (Premium)', 'Küchenteams mit drei Rollen'],
            ['Wochenmenü und Einkauf', 'ja', 'nein'],
            ['Umrechnen', 'Portionen', 'Gedecke und Stück'],
            ['Allergene pro Rezept', 'nein', 'die 14 Allergene (Pro)'],
            ['Läuft auf', 'iPhone, iPad, Mac, Android und Windows', 'jedem Browser, und als App auf Handy und Tablet']
          ],
          note: 'Geprüft am 12. November 2026, auf paprikaapp.com und in Savour.'
        }
      ],
      [
        'Erst ausprobieren',
        'Starte kostenlos, bis 100 Rezepte. Neue Konten bekommen 7 Tage Savour Pro, ohne Zahlungsdaten. Paprika muss nicht sofort weg: Probiere es zuerst mit einem Teil deiner Rezepte. Und beendest du Pro irgendwann, behältst du immer alles.'
      ]
    ],
    faq: [
      [
        'Kommen meine Fotos mit?',
        'Ja. Bei einem Export aus Paprika (.paprikarecipes) kommt das Foto jedes Rezepts mit, ebenso die Notizen und die Ausbeute.'
      ],
      [
        'Ändert Savour etwas an meinen Rezepten?',
        'Nein. Savour übernimmt, was dasteht, und erfindet nie Mengen oder Zutaten. Deine Rezepte werden auch nie übersetzt.'
      ],
      [
        'Kann meine ganze Küche umsteigen?',
        'Ja. Jeder nimmt seine eigenen Rezepte aus Paprika mit. Erstelle danach ein Küchenteam, dann arbeitet die ganze Brigade mit denselben Rezepten. Ein Küchenteam erstellst du mit Savour Pro; Mitglied sein ist kostenlos.'
      ],
      [
        'Und wenn ich später zurück will?',
        'Deine Rezepte bleiben deine. Du kannst sie immer alle drucken, und mit Pro als Word-Datei oder Sicherung herunterladen. Beendest du Pro, bleibt einfach alles erhalten.'
      ]
    ]
  },
  es: {
    slug: 'es/alternativa-a-paprika',
    title: 'Alternativa a Paprika para cocineros: pásate a Savour | Savour',
    desc: '¿Buscas una alternativa a Paprika Recipe Manager para una cocina profesional? Savour tiene equipos de cocina, escalado por cubiertos e impresión con tu logo. Te llevas tus recetas de Paprika en unos minutos, con fotos.',
    crumb: 'Alternativa a Paprika',
    h1: 'La alternativa a Paprika para la cocina profesional',
    lead: 'Paprika es una buena app para casa. Si cocinas en un restaurante, necesitas otras cosas. Tus recetas te las llevas en unos minutos.',
    sections: [
      [
        'Paprika está cambiando',
        'Paprika 4 sustituye a Paprika 3. La versión gratuita guarda hasta 50 recetas. Sincronizar entre dispositivos, compartir e importar desde fotos forman parte de Premium, que es una suscripción. Si tenías Paprika 3, recibes gratis una versión Standard con recetas ilimitadas y sincronización. Buen momento para ver qué necesita de verdad tu cocina.'
      ],
      [
        'Hecha para la cocina, no para casa',
        'Paprika destaca en menús semanales, listas de la compra y una despensa para casa. Savour no tiene eso. Savour está hecha para el chef y la brigada: recetas exactamente como las escribiste, al gramo, escalado por cubiertos y piezas, y letra grande en el modo cocina cuando estás entre fogones.'
      ],
      [
        'Todos cocinan con las mismas recetas',
        'En un equipo de cocina toda la brigada trabaja con la misma versión, con tres roles: el propietario gestiona, los sous-chefs añaden y editan, los cocineros consultan sin borrar nada por error. Creas un equipo de cocina con Savour Pro; ser miembro es gratis.'
      ],
      [
        'Cámbiate en unos minutos',
        'En Paprika, exporta tus recetas como “Paprika Recipe Format” (.paprikarecipes) y elige ese archivo en Savour en Añadir receta. Nombre, ingredientes, elaboración, rendimiento, notas y la foto se vienen contigo. Paso a paso: [cambiar desde Paprika](/es/manual-cambiar-a-savour#import-paprika).\n\nTus otras recetas en Word, PDF o texto, Savour las lee gratis. Leer fotos de notas a mano es con Savour Pro.'
      ],
      [
        'Paprika y Savour, frente a frente',
        'Lo que hace cada app, sin adornos. Si cocinas sobre todo en casa, puede que Paprika te encaje mejor.',
        {
          head: ['', 'Paprika', 'Savour'],
          rows: [
            ['Hecha para', 'el cocinero de casa', 'el chef y la brigada'],
            ['Gratis', 'hasta 50 recetas', 'hasta 100 recetas'],
            ['De pago', 'Premium, como suscripción', 'Pro: 2,99 € al mes o 29 € al año'],
            [
              'Trabajar juntos',
              'compartir con la familia y libros de recetas (Premium)',
              'equipos de cocina con tres roles'
            ],
            ['Menú semanal y compra', 'sí', 'no'],
            ['Escalar', 'raciones', 'cubiertos y piezas'],
            ['Alérgenos por receta', 'no', 'los 14 alérgenos (Pro)'],
            ['Funciona en', 'iPhone, iPad, Mac, Android y Windows', 'cualquier navegador, y como app en móvil y tablet']
          ],
          note: 'Comprobado el 12 de noviembre de 2026, en paprikaapp.com y en Savour.'
        }
      ],
      [
        'Pruébalo primero',
        'Empieza gratis, hasta 100 recetas. Las cuentas nuevas tienen 7 días de Savour Pro, sin datos de pago. No tienes que dejar Paprika enseguida: pruébalo primero con parte de tus recetas. Y si algún día dejas Pro, siempre conservas todo.'
      ]
    ],
    faq: [
      [
        '¿Se vienen mis fotos?',
        'Sí. Con una exportación de Paprika (.paprikarecipes) se viene la foto de cada receta, igual que las notas y el rendimiento.'
      ],
      [
        '¿Savour cambia algo de mis recetas?',
        'No. Savour toma lo que hay y nunca se inventa cantidades ni ingredientes. Tus recetas tampoco se traducen nunca.'
      ],
      [
        '¿Puede cambiarse toda mi cocina?',
        'Sí. Cada uno se lleva sus propias recetas de Paprika. Después creas un equipo de cocina y toda la brigada trabaja con las mismas recetas. Crear un equipo de cocina es con Savour Pro; ser miembro es gratis.'
      ],
      [
        '¿Y si más adelante quiero volver?',
        'Tus recetas siguen siendo tuyas. Siempre puedes imprimirlas todas, y con Pro descargarlas como Word o copia de seguridad. Si dejas Pro, todo sigue ahí.'
      ]
    ]
  },
  fr: {
    slug: 'fr/alternative-a-paprika',
    title: 'Alternative à Paprika pour les cuisiniers : passer à Savour | Savour',
    desc: 'Tu cherches une alternative à Paprika Recipe Manager pour une cuisine professionnelle ? Savour a des équipes de cuisine, la conversion par couverts et l’impression avec ton logo. Tes recettes Paprika suivent en quelques minutes, avec les photos.',
    crumb: 'Alternative à Paprika',
    h1: 'L’alternative à Paprika pour la cuisine professionnelle',
    lead: 'Paprika est une belle app pour la maison. Si tu cuisines dans un restaurant, tu as besoin d’autre chose. Tes recettes suivent en quelques minutes.',
    sections: [
      [
        'Paprika change',
        'Paprika 4 remplace Paprika 3. La version gratuite garde jusqu’à 50 recettes. La synchronisation entre appareils, le partage et l’import depuis des photos font partie de Premium, qui est un abonnement. Si tu avais Paprika 3, tu reçois gratuitement une version Standard avec recettes illimitées et synchronisation. Un bon moment pour voir ce dont ta cuisine a vraiment besoin.'
      ],
      [
        'Faite pour la cuisine, pas pour la maison',
        'Paprika est fort pour les menus de la semaine, les listes de courses et un garde-manger à la maison. Savour n’a pas cela. Savour est fait pour le chef et la brigade : des recettes exactement comme tu les as écrites, au gramme près, la conversion par couverts et par pièces, et de grands caractères en mode cuisine quand tu es aux fourneaux.'
      ],
      [
        'Tout le monde cuisine avec les mêmes recettes',
        'Dans une équipe de cuisine, toute la brigade travaille avec la même version, avec trois rôles : le propriétaire gère, les sous-chefs ajoutent et modifient, les cuisiniers consultent sans rien effacer par erreur. Tu crées une équipe de cuisine avec Savour Pro ; être membre est gratuit.'
      ],
      [
        'Passer à Savour en quelques minutes',
        'Dans Paprika, exporte tes recettes au « Paprika Recipe Format » (.paprikarecipes) et choisis ce fichier dans Savour sous Ajouter une recette. Le nom, les ingrédients, la préparation, le rendement, les notes et la photo suivent. Pas à pas : [passer de Paprika à Savour](/fr/manuel-passer-a-savour#import-paprika).\n\nTes autres recettes en Word, PDF ou texte, Savour les lit gratuitement. La lecture de photos de notes manuscrites se fait avec Savour Pro.'
      ],
      [
        'Paprika et Savour côte à côte',
        'Ce que fait chaque app, sans enjoliver. Si tu cuisines surtout à la maison, Paprika te conviendra peut-être mieux.',
        {
          head: ['', 'Paprika', 'Savour'],
          rows: [
            ['Fait pour', 'le cuisinier amateur', 'le chef et la brigade'],
            ['Gratuit', 'jusqu’à 50 recettes', 'jusqu’à 100 recettes'],
            ['Payant', 'Premium, en abonnement', 'Pro : 2,99 € par mois ou 29 € par an'],
            [
              'Travailler ensemble',
              'partage en famille et de livres de recettes (Premium)',
              'équipes de cuisine avec trois rôles'
            ],
            ['Menus et courses', 'oui', 'non'],
            ['Conversion', 'portions', 'couverts et pièces'],
            ['Allergènes par recette', 'non', 'les 14 allergènes (Pro)'],
            [
              'Fonctionne sur',
              'iPhone, iPad, Mac, Android et Windows',
              'tout navigateur, et en app sur téléphone et tablette'
            ]
          ],
          note: 'Vérifié le 12 novembre 2026, sur paprikaapp.com et dans Savour.'
        }
      ],
      [
        'Essaie d’abord',
        'Commence gratuitement, jusqu’à 100 recettes. Les nouveaux comptes ont 7 jours de Savour Pro, sans données de paiement. Pas besoin de quitter Paprika tout de suite : essaie d’abord avec une partie de tes recettes. Et si un jour tu arrêtes Pro, tu gardes toujours tout.'
      ]
    ],
    faq: [
      [
        'Mes photos suivent-elles ?',
        'Oui. Avec un export de Paprika (.paprikarecipes), la photo de chaque recette suit, tout comme les notes et le rendement.'
      ],
      [
        'Savour modifie-t-il mes recettes ?',
        'Non. Savour reprend ce qui est écrit et n’invente jamais de quantités ni d’ingrédients. Tes recettes ne sont jamais traduites non plus.'
      ],
      [
        'Toute ma cuisine peut-elle passer à Savour ?',
        'Oui. Chacun emporte ses propres recettes de Paprika. Crée ensuite une équipe de cuisine, et toute la brigade travaille avec les mêmes recettes. Créer une équipe de cuisine se fait avec Savour Pro ; être membre est gratuit.'
      ],
      [
        'Et si je veux revenir plus tard ?',
        'Tes recettes restent à toi. Tu peux toujours toutes les imprimer, et avec Pro les télécharger en Word ou en sauvegarde. Si tu arrêtes Pro, tout reste simplement en place.'
      ]
    ]
  }
};
