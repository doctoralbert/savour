// Uitgebreide opmaak voor de blogs (deel 3). Zie tools/site-blog-rich-1.mjs voor de opbouw.

export const RICH_3 = {
  // ---- Receptenboek met eigen logo: instellen in stappen, A4 tegenover A5, wat er op een pagina staat ----
  'en/blog/recipe-book-with-your-logo': {
    nl: {
      brief: [
        'Met Savour Pro staan het logo en de naam van je restaurant bovenaan elke geprinte pagina.',
        'In een team print iedereen in dezelfde stijl, met het logo van de eigenaar.',
        'Een hele map wordt een boek: voorblad, inhoudsopgave en de printdatum onderaan.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Instellingen openen', 'Ga naar Instellingen → Logo op prints.'],
              ['Logo en naam', 'Kies het logo en vul de naam van je restaurant in.'],
              ['Zwart-wit?', 'Print je op een keukenprinter, laat het logo dan in zwart-wit printen.'],
              ['Printen', 'Vanaf nu staat je logo op elk recept en elke map die je print.']
            ]
          }
        ],
        2: [
          {
            compare: [
              ['A4', ['de klapper in de keuken', 'veel recepten per map', 'goed leesbaar op afstand']],
              ['A5', ['een kleine map aan de pass', 'handig op een smalle werkplek', 'past in een schortzak of la']]
            ]
          }
        ]
      },
      add: [
        [
          'Wat er op een geprinte pagina staat',
          'Bovenaan het logo links en de naam van je restaurant in het midden. Daaronder het recept zelf, rustig opgemaakt. Onderaan de printdatum en, in een map, het nummer van het recept, zodat je snel bladert. De kop- en voettekst van de browser vallen weg.',
          { see: ['Recepten printen', '@feature:print', 'Eén recept, een map of een eigen selectie in één keer.'] }
        ]
      ]
    },
    en: {
      brief: [
        'With Savour Pro your restaurant’s logo and name are at the top of every printed page.',
        'In a team everyone prints in the same style, with the owner’s logo.',
        'A whole folder becomes a book: cover page, table of contents and the print date at the bottom.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Open settings', 'Go to Settings → Logo on prints.'],
              ['Logo and name', 'Choose the logo and fill in your restaurant’s name.'],
              ['Black and white?', 'Printing on a kitchen printer? Let the logo print in black and white.'],
              ['Print', 'From now on your logo is on every recipe and folder you print.']
            ]
          }
        ],
        2: [
          {
            compare: [
              ['A4', ['the binder in the kitchen', 'many recipes per folder', 'easy to read from a distance']],
              ['A5', ['a small folder at the pass', 'handy on a narrow station', 'fits in an apron pocket or drawer']]
            ]
          }
        ]
      },
      add: [
        [
          'What is on a printed page',
          'At the top the logo on the left and your restaurant’s name in the middle. Below that the recipe itself, calmly laid out. At the bottom the print date and, in a folder, the recipe number, so you can leaf through quickly. The browser’s header and footer are left out.',
          { see: ['Print recipes', '@feature:print', 'One recipe, a folder or your own selection at once.'] }
        ]
      ]
    },
    de: {
      brief: [
        'Mit Savour Pro stehen Logo und Name deines Restaurants oben auf jeder gedruckten Seite.',
        'Im Team druckt jeder im selben Stil, mit dem Logo des Eigentümers.',
        'Ein ganzer Ordner wird zum Buch: Deckblatt, Inhaltsverzeichnis und das Druckdatum unten.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Einstellungen öffnen', 'Geh zu Einstellungen → Logo auf Ausdrucken.'],
              ['Logo und Name', 'Wähle das Logo und trag den Namen deines Restaurants ein.'],
              ['Schwarz-weiß?', 'Druckst du auf einem Küchendrucker, lass das Logo schwarz-weiß drucken.'],
              ['Drucken', 'Ab jetzt steht dein Logo auf jedem Rezept und jedem Ordner, den du druckst.']
            ]
          }
        ],
        2: [
          {
            compare: [
              ['A4', ['die Mappe in der Küche', 'viele Rezepte pro Ordner', 'gut lesbar aus der Entfernung']],
              [
                'A5',
                [
                  'ein kleiner Ordner am Pass',
                  'praktisch an einem schmalen Posten',
                  'passt in eine Schürzentasche oder Schublade'
                ]
              ]
            ]
          }
        ]
      },
      add: [
        [
          'Was auf einer gedruckten Seite steht',
          'Oben links das Logo und in der Mitte der Name deines Restaurants. Darunter das Rezept selbst, ruhig gestaltet. Unten das Druckdatum und im Ordner die Nummer des Rezepts, damit du schnell blätterst. Kopf- und Fußzeile des Browsers fallen weg.',
          {
            see: [
              'Rezepte drucken',
              '@feature:print',
              'Ein Rezept, ein Ordner oder eine eigene Auswahl in einem Schritt.'
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'Con Savour Pro, el logotipo y el nombre de tu restaurante aparecen arriba en cada página impresa.',
        'En un equipo todos imprimen con el mismo estilo, con el logotipo del propietario.',
        'Una carpeta entera se convierte en un libro: portada, índice y la fecha de impresión abajo.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Abrir ajustes', 'Ve a Ajustes → Logo en las impresiones.'],
              ['Logotipo y nombre', 'Elige el logotipo y escribe el nombre de tu restaurante.'],
              [
                '¿Blanco y negro?',
                'Si imprimes en una impresora de cocina, deja que el logotipo salga en blanco y negro.'
              ],
              ['Imprimir', 'Desde ahora tu logotipo sale en cada receta y carpeta que imprimas.']
            ]
          }
        ],
        2: [
          {
            compare: [
              ['A4', ['el archivador de la cocina', 'muchas recetas por carpeta', 'se lee bien a distancia']],
              [
                'A5',
                [
                  'una carpeta pequeña en el pase',
                  'práctica en una partida estrecha',
                  'cabe en un bolsillo del delantal o un cajón'
                ]
              ]
            ]
          }
        ]
      },
      add: [
        [
          'Lo que aparece en una página impresa',
          'Arriba, el logotipo a la izquierda y el nombre de tu restaurante en el centro. Debajo, la receta, con una presentación tranquila. Abajo, la fecha de impresión y, en una carpeta, el número de la receta, para hojear rápido. El encabezado y el pie del navegador desaparecen.',
          { see: ['Imprimir recetas', '@feature:print', 'Una receta, una carpeta o tu propia selección de una vez.'] }
        ]
      ]
    },
    fr: {
      brief: [
        'Avec Savour Pro, le logo et le nom de ton restaurant figurent en haut de chaque page imprimée.',
        'Dans une équipe, chacun imprime dans le même style, avec le logo du propriétaire.',
        'Un dossier entier devient un livre : page de garde, table des matières et date d’impression en bas.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Ouvrir les paramètres', 'Va dans Paramètres → Logo sur les impressions.'],
              ['Logo et nom', 'Choisis le logo et indique le nom de ton restaurant.'],
              [
                'Noir et blanc ?',
                'Si tu imprimes sur une imprimante de cuisine, fais imprimer le logo en noir et blanc.'
              ],
              ['Imprimer', 'Désormais, ton logo figure sur chaque recette et chaque dossier imprimé.']
            ]
          }
        ],
        2: [
          {
            compare: [
              ['A4', ['le classeur en cuisine', 'beaucoup de recettes par dossier', 'lisible de loin']],
              [
                'A5',
                [
                  'un petit dossier au passe',
                  'pratique sur un poste étroit',
                  'tient dans une poche de tablier ou un tiroir'
                ]
              ]
            ]
          }
        ]
      },
      add: [
        [
          'Ce qui figure sur une page imprimée',
          'En haut, le logo à gauche et le nom de ton restaurant au milieu. En dessous, la recette elle-même, mise en page sobrement. En bas, la date d’impression et, dans un dossier, le numéro de la recette, pour feuilleter vite. L’en-tête et le pied de page du navigateur disparaissent.',
          {
            see: [
              'Imprimer des recettes',
              '@feature:print',
              'Une recette, un dossier ou ta propre sélection en une fois.'
            ]
          }
        ]
      ]
    }
  },

  // ---- Recepten zonder wifi: het recept op de telefoon, een checklist vóór de koelcel en vragen ----
  'en/blog/recipes-without-wifi': {
    nl: {
      brief: [
        'Zet Savour op je beginscherm; een app store heb je niet nodig.',
        'Open je recepten één keer met internet, dan werken ze ook in de koelcel en de kelder.',
        'Aanpassen en importeren wachten tot de verbinding terug is, zodat het team één versie houdt.'
      ],
      extra: {
        2: [
          {
            shot: '/assets/app/recept-{lang}.jpg',
            alt: 'Een recept in Savour op de telefoon',
            caption: 'Een recept op de telefoon. Wat je eerder hebt geopend, blijft zo leesbaar, ook zonder verbinding.'
          }
        ],
        3: [
          {
            check: [
              'Savour staat op het beginscherm',
              'Ingelogd met “Ingelogd blijven” aangevinkt',
              'De recepten van vandaag één keer geopend met internet',
              'Getest in vliegtuigmodus'
            ],
            title: 'Vóór je de koelcel of de kelder in gaat'
          }
        ]
      },
      add: [
        [
          'Veelgestelde vragen',
          'Wat chefs het vaakst vragen over offline werken.',
          {
            faq: [
              ['Kost offline werken extra?', 'Nee. Het zit in elk Savour-account, gratis en met Pro.'],
              [
                'Moet ik een app downloaden?',
                'Nee. Savour draait in de browser; je zet het met een paar tikken op je beginscherm.'
              ],
              [
                'Zie ik offline de wijzigingen van mijn collega’s?',
                'Je ziet de laatst bewaarde versie. Zodra de verbinding terug is, laadt Savour vanzelf opnieuw.'
              ]
            ]
          }
        ]
      ]
    },
    en: {
      brief: [
        'Put Savour on your home screen; you do not need an app store.',
        'Open your recipes once with internet, and they also work in the walk-in and the cellar.',
        'Editing and importing wait until the connection is back, so the team keeps one version.'
      ],
      extra: {
        2: [
          {
            shot: '/assets/app/recept-{lang}.jpg',
            alt: 'A recipe in Savour on the phone',
            caption:
              'A recipe on the phone. What you opened before stays readable like this, even without a connection.'
          }
        ],
        3: [
          {
            check: [
              'Savour is on the home screen',
              'Signed in with “Stay signed in” ticked',
              'Today’s recipes opened once with internet',
              'Tested in flight mode'
            ],
            title: 'Before you go into the walk-in or the cellar'
          }
        ]
      },
      add: [
        [
          'Frequently asked questions',
          'What chefs ask most about working offline.',
          {
            faq: [
              ['Does working offline cost extra?', 'No. It is in every Savour account, free and with Pro.'],
              [
                'Do I need to download an app?',
                'No. Savour runs in the browser; you put it on your home screen in a few taps.'
              ],
              [
                'Do I see my colleagues’ changes offline?',
                'You see the last saved version. As soon as the connection is back, Savour reloads by itself.'
              ]
            ]
          }
        ]
      ]
    },
    de: {
      brief: [
        'Leg Savour auf deinen Startbildschirm; einen App Store brauchst du nicht.',
        'Öffne deine Rezepte einmal mit Internet, dann funktionieren sie auch im Kühlraum und im Keller.',
        'Bearbeiten und Importieren warten, bis die Verbindung zurück ist, damit das Team eine Version behält.'
      ],
      extra: {
        2: [
          {
            shot: '/assets/app/recept-{lang}.jpg',
            alt: 'Ein Rezept in Savour auf dem Handy',
            caption: 'Ein Rezept auf dem Handy. Was du vorher geöffnet hast, bleibt so lesbar, auch ohne Verbindung.'
          }
        ],
        3: [
          {
            check: [
              'Savour liegt auf dem Startbildschirm',
              'Angemeldet mit „Angemeldet bleiben“',
              'Die Rezepte von heute einmal mit Internet geöffnet',
              'Im Flugmodus getestet'
            ],
            title: 'Bevor du in den Kühlraum oder Keller gehst'
          }
        ]
      },
      add: [
        [
          'Häufige Fragen',
          'Was Köche am häufigsten zum Offline-Arbeiten fragen.',
          {
            faq: [
              ['Kostet Offline-Arbeiten extra?', 'Nein. Es steckt in jedem Savour-Konto, kostenlos und mit Pro.'],
              [
                'Muss ich eine App herunterladen?',
                'Nein. Savour läuft im Browser; du legst es mit ein paar Tipps auf deinen Startbildschirm.'
              ],
              [
                'Sehe ich offline die Änderungen meiner Kollegen?',
                'Du siehst die zuletzt gespeicherte Version. Sobald die Verbindung zurück ist, lädt Savour von selbst neu.'
              ]
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'Pon Savour en tu pantalla de inicio; no necesitas una tienda de apps.',
        'Abre tus recetas una vez con internet y funcionarán también en la cámara y en el sótano.',
        'Editar e importar esperan a que vuelva la conexión, para que el equipo mantenga una sola versión.'
      ],
      extra: {
        2: [
          {
            shot: '/assets/app/recept-{lang}.jpg',
            alt: 'Una receta en Savour en el móvil',
            caption: 'Una receta en el móvil. Lo que abriste antes sigue legible así, también sin conexión.'
          }
        ],
        3: [
          {
            check: [
              'Savour está en la pantalla de inicio',
              'Sesión iniciada con «Mantener la sesión iniciada»',
              'Las recetas de hoy abiertas una vez con internet',
              'Probado en modo avión'
            ],
            title: 'Antes de entrar en la cámara o el sótano'
          }
        ]
      },
      add: [
        [
          'Preguntas frecuentes',
          'Lo que más preguntan los chefs sobre trabajar sin conexión.',
          {
            faq: [
              ['¿Trabajar sin conexión cuesta más?', 'No. Está en todas las cuentas de Savour, gratis y con Pro.'],
              [
                '¿Tengo que descargar una app?',
                'No. Savour funciona en el navegador; lo pones en tu pantalla de inicio con unos toques.'
              ],
              [
                '¿Veo sin conexión los cambios de mis compañeros?',
                'Ves la última versión guardada. En cuanto vuelve la conexión, Savour se recarga solo.'
              ]
            ]
          }
        ]
      ]
    },
    fr: {
      brief: [
        'Mets Savour sur ton écran d’accueil ; pas besoin de store.',
        'Ouvre tes recettes une fois avec internet, et elles fonctionnent aussi en chambre froide et en cave.',
        'Modifier et importer attendent le retour de la connexion, pour que l’équipe garde une seule version.'
      ],
      extra: {
        2: [
          {
            shot: '/assets/app/recept-{lang}.jpg',
            alt: 'Une recette dans Savour sur le téléphone',
            caption: 'Une recette sur le téléphone. Ce que tu as ouvert avant reste lisible ainsi, même sans connexion.'
          }
        ],
        3: [
          {
            check: [
              'Savour est sur l’écran d’accueil',
              'Connecté avec « Rester connecté » coché',
              'Les recettes du jour ouvertes une fois avec internet',
              'Testé en mode avion'
            ],
            title: 'Avant d’entrer en chambre froide ou en cave'
          }
        ]
      },
      add: [
        [
          'Questions fréquentes',
          'Ce que les chefs demandent le plus sur le travail hors ligne.',
          {
            faq: [
              [
                'Travailler hors ligne coûte-t-il plus cher ?',
                'Non. C’est inclus dans chaque compte Savour, gratuit comme Pro.'
              ],
              [
                'Dois-je télécharger une application ?',
                'Non. Savour tourne dans le navigateur ; tu le mets sur ton écran d’accueil en quelques gestes.'
              ],
              [
                'Vois-je hors ligne les modifications de mes collègues ?',
                'Tu vois la dernière version enregistrée. Dès que la connexion revient, Savour se recharge tout seul.'
              ]
            ]
          }
        ]
      ]
    }
  },

  // ---- Een recepten-app kiezen: de zeven vragen als checklist en een test van een kwartier ----
  'en/blog/choosing-a-recipe-app': {
    nl: {
      brief: [
        'Kijk eerst of je bestaande recepten er in één keer in gaan, zonder dat de app iets verzint.',
        'Test op je telefoon midden in je mise-en-place, niet achter een bureau.',
        'Vraag wat er met je recepten gebeurt als je opzegt.'
      ],
      extra: {
        0: [
          {
            check: [
              'Word, PDF en foto’s in één keer importeren',
              'Twijfel zichtbaar, niets verzonnen',
              'Grote letters en snel zoeken op de telefoon',
              'Delen met rollen',
              'Een hele map netjes printen',
              'Werkt zonder internet',
              'Je recepten blijven als je stopt'
            ],
            title: 'De zeven vragen op een rij'
          }
        ]
      },
      add: [
        [
          'Zo test je Savour in een kwartier',
          'Je hoeft niets te installeren en geen betaalgegevens in te vullen.',
          {
            steps: [
              ['Demo openen', 'Bekijk de [demo](@demo) met 20 echte recepten, zonder account.'],
              ['Account maken', 'Gratis tot 100 recepten, met 7 dagen Savour Pro.'],
              ['Je rommeligste bestand', 'Importeer het en kijk wat de lezer ervan maakt.'],
              ['Een collega laten zoeken', 'Deel een recept en laat iemand anders het terugvinden.']
            ]
          }
        ]
      ]
    },
    en: {
      brief: [
        'First check whether your existing recipes go in at once, without the app inventing anything.',
        'Test on your phone in the middle of your mise en place, not behind a desk.',
        'Ask what happens to your recipes when you cancel.'
      ],
      extra: {
        0: [
          {
            check: [
              'Import Word, PDF and photos in one go',
              'Doubt visible, nothing invented',
              'Large text and quick search on the phone',
              'Sharing with roles',
              'Print a whole folder neatly',
              'Works without internet',
              'Your recipes stay when you stop'
            ],
            title: 'The seven questions at a glance'
          }
        ]
      },
      add: [
        [
          'How to test Savour in fifteen minutes',
          'You do not need to install anything or enter payment details.',
          {
            steps: [
              ['Open the demo', 'Look at the [demo](@demo) with 20 real recipes, without an account.'],
              ['Create an account', 'Free up to 100 recipes, with 7 days of Savour Pro.'],
              ['Your messiest file', 'Import it and see what the reader makes of it.'],
              ['Let a colleague search', 'Share a recipe and let someone else find it.']
            ]
          }
        ]
      ]
    },
    de: {
      brief: [
        'Prüf zuerst, ob deine bestehenden Rezepte in einem Schritt hineingehen, ohne dass die App etwas erfindet.',
        'Teste auf dem Handy mitten in deiner Mise en Place, nicht am Schreibtisch.',
        'Frag, was mit deinen Rezepten passiert, wenn du kündigst.'
      ],
      extra: {
        0: [
          {
            check: [
              'Word, PDF und Fotos in einem Schritt importieren',
              'Zweifel sichtbar, nichts erfunden',
              'Große Schrift und schnelle Suche auf dem Handy',
              'Teilen mit Rollen',
              'Einen ganzen Ordner ordentlich drucken',
              'Funktioniert ohne Internet',
              'Deine Rezepte bleiben, wenn du aufhörst'
            ],
            title: 'Die sieben Fragen auf einen Blick'
          }
        ]
      },
      add: [
        [
          'So testest du Savour in einer Viertelstunde',
          'Du musst nichts installieren und keine Zahlungsdaten eingeben.',
          {
            steps: [
              ['Demo öffnen', 'Sieh dir die [Demo](@demo) mit 20 echten Rezepten an, ohne Konto.'],
              ['Konto erstellen', 'Kostenlos bis 100 Rezepte, mit 7 Tagen Savour Pro.'],
              ['Deine unordentlichste Datei', 'Importiere sie und sieh, was der Leser daraus macht.'],
              ['Einen Kollegen suchen lassen', 'Teile ein Rezept und lass jemand anderen es wiederfinden.']
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'Comprueba primero si tus recetas actuales entran de una vez, sin que la app invente nada.',
        'Prueba en el móvil en plena mise en place, no detrás de un escritorio.',
        'Pregunta qué pasa con tus recetas si te das de baja.'
      ],
      extra: {
        0: [
          {
            check: [
              'Importar Word, PDF y fotos de una vez',
              'Dudas visibles, nada inventado',
              'Letra grande y búsqueda rápida en el móvil',
              'Compartir con roles',
              'Imprimir una carpeta entera bien presentada',
              'Funciona sin internet',
              'Tus recetas se quedan si lo dejas'
            ],
            title: 'Las siete preguntas de un vistazo'
          }
        ]
      },
      add: [
        [
          'Así pruebas Savour en un cuarto de hora',
          'No tienes que instalar nada ni dar datos de pago.',
          {
            steps: [
              ['Abrir la demo', 'Mira la [demo](@demo) con 20 recetas reales, sin cuenta.'],
              ['Crear una cuenta', 'Gratis hasta 100 recetas, con 7 días de Savour Pro.'],
              ['Tu archivo más desordenado', 'Impórtalo y mira qué hace el lector con él.'],
              ['Que busque un compañero', 'Comparte una receta y deja que otra persona la encuentre.']
            ]
          }
        ]
      ]
    },
    fr: {
      brief: [
        'Vérifie d’abord si tes recettes existantes entrent en une fois, sans que l’application n’invente rien.',
        'Teste sur ton téléphone en pleine mise en place, pas derrière un bureau.',
        'Demande ce que deviennent tes recettes si tu résilies.'
      ],
      extra: {
        0: [
          {
            check: [
              'Importer Word, PDF et photos en une fois',
              'Doute visible, rien d’inventé',
              'Grands caractères et recherche rapide sur le téléphone',
              'Partage avec des rôles',
              'Imprimer proprement un dossier entier',
              'Fonctionne sans internet',
              'Tes recettes restent si tu arrêtes'
            ],
            title: 'Les sept questions en un coup d’œil'
          }
        ]
      },
      add: [
        [
          'Tester Savour en un quart d’heure',
          'Rien à installer, aucune donnée de paiement.',
          {
            steps: [
              ['Ouvrir la démo', 'Regarde la [démo](@demo) avec 20 vraies recettes, sans compte.'],
              ['Créer un compte', 'Gratuit jusqu’à 100 recettes, avec 7 jours de Savour Pro.'],
              ['Ton fichier le plus désordonné', 'Importe-le et regarde ce qu’en fait le lecteur.'],
              ['Faire chercher un collègue', 'Partage une recette et laisse quelqu’un d’autre la retrouver.']
            ]
          }
        ]
      ]
    }
  },

  // ---- Receptbeheer in de horeca: de bibliotheek op de laptop, zonder of met een systeem ----
  'en/blog/recipe-management-for-restaurants': {
    nl: {
      brief: [
        'Receptbeheer is vooral afspraken: waar staat het, wie past het aan, hoe vind je het terug.',
        'Begin met wat je al hebt, kies een simpele indeling en bepaal wie wat mag.',
        'Het werkt alleen als het in de keuken sneller is dan het oude briefje.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Zonder systeem',
                ['recepten op tien plekken', 'drie versies van dezelfde saus', 'kennis vertrekt met de kok']
              ],
              [
                'Met receptbeheer',
                ['één plek, één vorm', 'één versie die iedereen gebruikt', 'kennis blijft van de keuken']
              ]
            ]
          }
        ],
        1: [
          {
            shot: '/assets/app/bibliotheek-{lang}.jpg',
            alt: 'De receptenbibliotheek van Savour op een laptop',
            caption: 'De bibliotheek op de computer: hier importeer en orden je, in de keuken lees je op de telefoon.',
            wide: true
          }
        ]
      },
      add: [
        [
          'Wie doet wat',
          'Een systeem houdt zich niet vanzelf bij. Spreek drie dingen af: de chef bepaalt de indeling en wie mag aanpassen; de sous-chef houdt de recepturen bij als het menu wisselt; de rest van de brigade leest en meldt wat niet klopt. Zo blijft het receptenboek actueel zonder dat het één persoon tijd kost.',
          {
            tip: [
              'Een vast moment',
              'Plan bij elke kaartwissel een half uur om de mappen na te lopen. Wat niet meer op de kaart staat, gaat naar het archief.'
            ]
          }
        ]
      ]
    },
    en: {
      brief: [
        'Recipe management is mostly agreements: where it is, who changes it, how you find it again.',
        'Start with what you have, choose a simple structure and decide who may do what.',
        'It only works if it is faster in the kitchen than the old scrap of paper.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Without a system',
                ['recipes in ten places', 'three versions of the same sauce', 'knowledge leaves with the cook']
              ],
              [
                'With recipe management',
                ['one place, one format', 'one version everyone uses', 'knowledge stays with the kitchen']
              ]
            ]
          }
        ],
        1: [
          {
            shot: '/assets/app/bibliotheek-{lang}.jpg',
            alt: 'The Savour recipe library on a laptop',
            caption:
              'The library on the computer: this is where you import and organise; in the kitchen you read on the phone.',
            wide: true
          }
        ]
      },
      add: [
        [
          'Who does what',
          'A system does not keep itself up to date. Agree on three things: the chef decides the structure and who may edit; the sous-chef keeps the recipes up to date when the menu changes; the rest of the brigade reads and reports what is wrong. That keeps the recipe book current without costing one person all the time.',
          {
            tip: [
              'A fixed moment',
              'Plan half an hour at every menu change to go through the folders. Whatever is no longer on the menu goes to the archive.'
            ]
          }
        ]
      ]
    },
    de: {
      brief: [
        'Rezepturverwaltung sind vor allem Absprachen: wo es steht, wer es ändert, wie man es wiederfindet.',
        'Fang mit dem an, was du hast, wähle eine einfache Einteilung und leg fest, wer was darf.',
        'Es funktioniert nur, wenn es in der Küche schneller geht als der alte Zettel.'
      ],
      extra: {
        0: [
          {
            compare: [
              ['Ohne System', ['Rezepte an zehn Orten', 'drei Versionen derselben Sauce', 'Wissen geht mit dem Koch']],
              [
                'Mit Rezepturverwaltung',
                ['ein Ort, eine Form', 'eine Version, die alle nutzen', 'Wissen bleibt in der Küche']
              ]
            ]
          }
        ],
        1: [
          {
            shot: '/assets/app/bibliotheek-{lang}.jpg',
            alt: 'Die Rezeptbibliothek von Savour auf einem Laptop',
            caption:
              'Die Bibliothek am Computer: Hier importierst und ordnest du, in der Küche liest du auf dem Handy.',
            wide: true
          }
        ]
      },
      add: [
        [
          'Wer was macht',
          'Ein System hält sich nicht von selbst aktuell. Sprecht drei Dinge ab: Der Küchenchef bestimmt die Einteilung und wer ändern darf; der Sous-Chef hält die Rezepturen aktuell, wenn das Menü wechselt; der Rest der Brigade liest und meldet, was nicht stimmt. So bleibt das Rezeptbuch aktuell, ohne dass es einer Person alle Zeit kostet.',
          {
            tip: [
              'Ein fester Zeitpunkt',
              'Plane bei jedem Kartenwechsel eine halbe Stunde, um die Ordner durchzugehen. Was nicht mehr auf der Karte steht, kommt ins Archiv.'
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'La gestión de recetas son sobre todo acuerdos: dónde está, quién la cambia y cómo se encuentra.',
        'Empieza con lo que tienes, elige una organización sencilla y decide quién puede hacer qué.',
        'Solo funciona si en la cocina es más rápido que el papelito de siempre.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Sin sistema',
                ['recetas en diez sitios', 'tres versiones de la misma salsa', 'el conocimiento se va con el cocinero']
              ],
              [
                'Con gestión de recetas',
                ['un sitio, un formato', 'una versión que usan todos', 'el conocimiento se queda en la cocina']
              ]
            ]
          }
        ],
        1: [
          {
            shot: '/assets/app/bibliotheek-{lang}.jpg',
            alt: 'La biblioteca de recetas de Savour en un portátil',
            caption: 'La biblioteca en el ordenador: aquí importas y ordenas; en la cocina lees en el móvil.',
            wide: true
          }
        ]
      },
      add: [
        [
          'Quién hace qué',
          'Un sistema no se actualiza solo. Acordad tres cosas: el chef decide la organización y quién puede editar; el segundo de cocina mantiene las recetas al día cuando cambia la carta; el resto de la brigada lee y avisa de lo que no cuadra. Así el recetario sigue al día sin que le cueste todo el tiempo a una sola persona.',
          {
            tip: [
              'Un momento fijo',
              'Reserva media hora en cada cambio de carta para repasar las carpetas. Lo que ya no está en la carta va al archivo.'
            ]
          }
        ]
      ]
    },
    fr: {
      brief: [
        'La gestion des recettes, ce sont surtout des accords : où c’est, qui modifie, comment on le retrouve.',
        'Commence par ce que tu as, choisis une organisation simple et décide qui peut faire quoi.',
        'Ça ne marche que si c’est plus rapide en cuisine que le vieux bout de papier.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Sans système',
                ['des recettes à dix endroits', 'trois versions de la même sauce', 'le savoir part avec le cuisinier']
              ],
              [
                'Avec une gestion des recettes',
                ['un endroit, un format', 'une version que tout le monde utilise', 'le savoir reste à la cuisine']
              ]
            ]
          }
        ],
        1: [
          {
            shot: '/assets/app/bibliotheek-{lang}.jpg',
            alt: 'La bibliothèque de recettes de Savour sur un ordinateur portable',
            caption:
              'La bibliothèque sur l’ordinateur : c’est là que tu importes et ranges ; en cuisine, tu lis sur le téléphone.',
            wide: true
          }
        ]
      },
      add: [
        [
          'Qui fait quoi',
          'Un système ne se met pas à jour tout seul. Mettez-vous d’accord sur trois choses : le chef décide de l’organisation et de qui peut modifier ; le sous-chef tient les recettes à jour quand la carte change ; le reste de la brigade lit et signale ce qui ne va pas. Le livre de recettes reste ainsi à jour sans prendre tout le temps d’une seule personne.',
          {
            tip: [
              'Un moment fixe',
              'Prévois une demi-heure à chaque changement de carte pour passer les dossiers en revue. Ce qui n’est plus à la carte va aux archives.'
            ]
          }
        ]
      ]
    }
  },

  // ---- Gedeeld receptenboek: een kernzin, en de notitie als vaste plek voor wijzigingen ----
  'en/blog/shared-recipe-book-kitchen-team': {
    nl: {
      brief: [
        'Als iedereen het recept op de eigen telefoon heeft, hoeft niemand tijdens de service te vragen.',
        'Met één gedeeld recept is de laatste versie altijd de enige versie.',
        'Wat in het keukenteam staat, blijft van de keuken, ook als een kok vertrekt.'
      ],
      extra: {
        1: [{ quote: 'De laatste versie is altijd de enige versie.' }],
        3: [
          {
            fact: ['0', 'recepten die meegaan als een kok vertrekt. Wat in het keukenteam staat, blijft van de keuken.']
          }
        ]
      },
      add: [
        [
          'Laat zien wat er veranderd is',
          'Pas je een saus aan voor het nieuwe menu, zet dan in de notitie bij het recept wat er anders is en waarom. Zo begrijpt de brigade de wijziging, in plaats van alleen een ander getal te zien. En wie twijfelt, leest het na in plaats van het in de service te vragen.',
          {
            see: [
              'Keukenteams uitgelegd',
              '@post:en/blog/shared-folders-explained',
              'Rollen, mappen, printen en alles wat je met een keukenteam kunt.'
            ]
          }
        ]
      ]
    },
    en: {
      brief: [
        'When everyone has the recipe on their own phone, nobody needs to ask during service.',
        'With one shared recipe, the latest version is always the only version.',
        'What is in the kitchen team stays with the kitchen, even when a cook leaves.'
      ],
      extra: {
        1: [{ quote: 'The latest version is always the only version.' }],
        3: [
          { fact: ['0', 'recipes leave with a cook who moves on. What is in the kitchen team stays with the kitchen.'] }
        ]
      },
      add: [
        [
          'Show what has changed',
          'When you change a sauce for the new menu, write in the note with the recipe what is different and why. Then the brigade understands the change, instead of just seeing a different number. And whoever is unsure reads it, instead of asking during service.',
          {
            see: [
              'Kitchen teams explained',
              '@post:en/blog/shared-folders-explained',
              'Roles, folders, printing and everything a kitchen team can do.'
            ]
          }
        ]
      ]
    },
    de: {
      brief: [
        'Wenn jeder das Rezept auf dem eigenen Handy hat, muss niemand im Service fragen.',
        'Mit einem geteilten Rezept ist die neueste Version immer die einzige Version.',
        'Was im Küchenteam steht, bleibt in der Küche, auch wenn ein Koch geht.'
      ],
      extra: {
        1: [{ quote: 'Die neueste Version ist immer die einzige Version.' }],
        3: [{ fact: ['0', 'Rezepte gehen mit, wenn ein Koch geht. Was im Küchenteam steht, bleibt in der Küche.'] }]
      },
      add: [
        [
          'Zeig, was sich geändert hat',
          'Änderst du eine Sauce für das neue Menü, schreib in die Notiz zum Rezept, was anders ist und warum. So versteht die Brigade die Änderung, statt nur eine andere Zahl zu sehen. Und wer unsicher ist, liest es nach, statt im Service zu fragen.',
          {
            see: [
              'Küchenteams erklärt',
              '@post:en/blog/shared-folders-explained',
              'Rollen, Ordner, Drucken und alles, was ein Küchenteam kann.'
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'Cuando todos tienen la receta en su móvil, nadie tiene que preguntar durante el servicio.',
        'Con una receta compartida, la última versión es siempre la única versión.',
        'Lo que está en el equipo de cocina se queda en la cocina, aunque un cocinero se vaya.'
      ],
      extra: {
        1: [{ quote: 'La última versión es siempre la única versión.' }],
        3: [
          {
            fact: [
              '0',
              'recetas se van con un cocinero que se marcha. Lo que está en el equipo de cocina se queda en la cocina.'
            ]
          }
        ]
      },
      add: [
        [
          'Enseña qué ha cambiado',
          'Si cambias una salsa para la nueva carta, escribe en la nota de la receta qué es distinto y por qué. Así la brigada entiende el cambio, en lugar de ver solo otro número. Y quien tenga dudas lo lee, en lugar de preguntarlo en pleno servicio.',
          {
            see: [
              'Los equipos de cocina, explicados',
              '@post:en/blog/shared-folders-explained',
              'Roles, carpetas, impresión y todo lo que puede hacer un equipo de cocina.'
            ]
          }
        ]
      ]
    },
    fr: {
      brief: [
        'Quand chacun a la recette sur son téléphone, personne n’a besoin de demander pendant le service.',
        'Avec une recette partagée, la dernière version est toujours la seule version.',
        'Ce qui est dans l’équipe de cuisine reste à la cuisine, même quand un cuisinier part.'
      ],
      extra: {
        1: [{ quote: 'La dernière version est toujours la seule version.' }],
        3: [
          {
            fact: [
              '0',
              'recette ne part avec un cuisinier qui s’en va. Ce qui est dans l’équipe de cuisine reste à la cuisine.'
            ]
          }
        ]
      },
      add: [
        [
          'Montre ce qui a changé',
          'Quand tu modifies une sauce pour la nouvelle carte, écris dans la note de la recette ce qui est différent et pourquoi. La brigade comprend ainsi le changement, au lieu de voir seulement un autre chiffre. Et celui qui doute le lit, au lieu de demander pendant le service.',
          {
            see: [
              'Les équipes de cuisine expliquées',
              '@post:en/blog/shared-folders-explained',
              'Rôles, dossiers, impression et tout ce que permet une équipe de cuisine.'
            ]
          }
        ]
      ]
    }
  }
};
