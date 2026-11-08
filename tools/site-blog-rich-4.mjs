// Uitgebreide opmaak voor de blogs (deel 4). Zie tools/site-blog-rich-1.mjs voor de opbouw.

export const RICH_4 = {
  // ---- Receptenmappen indelen: het scherm met mappen en de vijf indelingen in één tabel ----
  'en/blog/recipe-folder-examples': {
    nl: {
      brief: [
        'Er is geen indeling voor elke keuken, wel vijf die zich bewezen hebben.',
        'Per partie, per menu, basis apart, patisserie per onderdeel, of per evenement.',
        'Een recept kan in meerdere mappen staan zonder dat het dubbel bestaat.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/app/mappen-{lang}.jpg',
            alt: 'Receptenmappen in Savour op de telefoon',
            caption: 'Receptenmappen in de demo. Een map maak je met “Nieuwe map”; de naam kies je zelf.'
          }
        ],
        5: [
          {
            head: ['Indeling', 'Past bij', 'Voorbeelden'],
            rows: [
              ['Per partie', 'een vaste brigade met vaste posten', 'Garde manger, Saucier, Patisserie'],
              ['Per menu of seizoen', 'een kaart die vaak wisselt', 'Lunch, Proeverij, Najaar'],
              ['Basis apart', 'elke keuken', 'Fonds en jus, Deeg, Moedersauzen'],
              ['Patisserie per onderdeel', 'zoeken op onderdeel', 'Crèmes, IJs en sorbet, Glazuren'],
              ['Per evenement of klant', 'catering en banqueting', 'Bruiloft juni, Vaste klant X']
            ]
          },
          {
            tip: [
              'Begin met twee mappen',
              'Begin met een map voor de basis en een voor het huidige menu. Breid pas uit als je merkt dat je zoekt.'
            ]
          }
        ]
      }
    },
    en: {
      brief: [
        'There is no structure for every kitchen, but there are five that have proven themselves.',
        'Per section, per menu, basics apart, pastry per component, or per event.',
        'A recipe can be in several folders without existing twice.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/app/mappen-{lang}.jpg',
            alt: 'Recipe folders in Savour on the phone',
            caption: 'Recipe folders in the demo. You create one with “New folder” and choose the name yourself.'
          }
        ],
        5: [
          {
            head: ['Structure', 'Fits', 'Examples'],
            rows: [
              ['Per section', 'a fixed brigade with fixed stations', 'Garde manger, Saucier, Pastry'],
              ['Per menu or season', 'a menu that changes often', 'Lunch, Tasting menu, Autumn'],
              ['Basics apart', 'every kitchen', 'Stocks and jus, Doughs, Mother sauces'],
              ['Pastry per component', 'searching by component', 'Creams, Ice cream and sorbet, Glazes'],
              ['Per event or client', 'catering and banqueting', 'Wedding June, Regular client X']
            ]
          },
          {
            tip: [
              'Start with two folders',
              'Start with one folder for the basics and one for the current menu. Only expand when you notice yourself searching.'
            ]
          }
        ]
      }
    },
    de: {
      brief: [
        'Es gibt keine Einteilung für jede Küche, aber fünf, die sich bewährt haben.',
        'Pro Posten, pro Menü, Grundlagen getrennt, Patisserie nach Bestandteil oder pro Veranstaltung.',
        'Ein Rezept kann in mehreren Ordnern stehen, ohne doppelt zu existieren.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/app/mappen-{lang}.jpg',
            alt: 'Rezeptordner in Savour auf dem Handy',
            caption:
              'Rezeptordner in der Demo. Einen Ordner erstellst du mit „Neuer Ordner“; den Namen wählst du selbst.'
          }
        ],
        5: [
          {
            head: ['Einteilung', 'Passt zu', 'Beispiele'],
            rows: [
              ['Pro Posten', 'einer festen Brigade mit festen Posten', 'Garde-Manger, Saucier, Patisserie'],
              ['Pro Menü oder Saison', 'einer Karte, die oft wechselt', 'Mittag, Degustation, Herbst'],
              ['Grundlagen getrennt', 'jeder Küche', 'Fonds und Jus, Teige, Grundsaucen'],
              ['Patisserie nach Bestandteil', 'der Suche nach Bestandteil', 'Cremes, Eis und Sorbet, Glasuren'],
              ['Pro Veranstaltung oder Kunde', 'Catering und Bankett', 'Hochzeit Juni, Stammkunde X']
            ]
          },
          {
            tip: [
              'Fang mit zwei Ordnern an',
              'Fang mit einem Ordner für die Grundlagen und einem für das aktuelle Menü an. Erweitere erst, wenn du merkst, dass du suchst.'
            ]
          }
        ]
      }
    },
    es: {
      brief: [
        'No hay una organización para todas las cocinas, pero sí cinco que han demostrado funcionar.',
        'Por partida, por carta, la base aparte, pastelería por elemento o por evento.',
        'Una receta puede estar en varias carpetas sin existir dos veces.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/app/mappen-{lang}.jpg',
            alt: 'Carpetas de recetas en Savour en el móvil',
            caption: 'Carpetas de recetas en la demo. Creas una con «Nueva carpeta» y eliges tú el nombre.'
          }
        ],
        5: [
          {
            head: ['Organización', 'Para', 'Ejemplos'],
            rows: [
              ['Por partida', 'una brigada fija con partidas fijas', 'Cuarto frío, Salsas, Pastelería'],
              ['Por carta o temporada', 'una carta que cambia a menudo', 'Almuerzo, Degustación, Otoño'],
              ['La base aparte', 'cualquier cocina', 'Fondos y jugos, Masas, Salsas madre'],
              ['Pastelería por elemento', 'buscar por elemento', 'Cremas, Helados y sorbetes, Glaseados'],
              ['Por evento o cliente', 'catering y banquetes', 'Boda junio, Cliente fijo X']
            ]
          },
          {
            tip: [
              'Empieza con dos carpetas',
              'Empieza con una carpeta para la base y otra para la carta actual. Amplía solo cuando notes que buscas.'
            ]
          }
        ]
      }
    },
    fr: {
      brief: [
        'Il n’y a pas d’organisation pour toutes les cuisines, mais cinq ont fait leurs preuves.',
        'Par partie, par carte, les bases à part, la pâtisserie par élément ou par événement.',
        'Une recette peut être dans plusieurs dossiers sans exister en double.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/app/mappen-{lang}.jpg',
            alt: 'Dossiers de recettes dans Savour sur le téléphone',
            caption:
              'Des dossiers de recettes dans la démo. Tu en crées un avec « Nouveau dossier » et tu choisis le nom.'
          }
        ],
        5: [
          {
            head: ['Organisation', 'Pour', 'Exemples'],
            rows: [
              ['Par partie', 'une brigade fixe avec des postes fixes', 'Garde-manger, Saucier, Pâtisserie'],
              ['Par carte ou saison', 'une carte qui change souvent', 'Déjeuner, Dégustation, Automne'],
              ['Les bases à part', 'toutes les cuisines', 'Fonds et jus, Pâtes, Sauces mères'],
              ['Pâtisserie par élément', 'chercher par élément', 'Crèmes, Glaces et sorbets, Glaçages'],
              ['Par événement ou client', 'traiteur et banquets', 'Mariage juin, Client régulier X']
            ]
          },
          {
            tip: [
              'Commence avec deux dossiers',
              'Commence par un dossier pour les bases et un pour la carte actuelle. N’élargis que quand tu te surprends à chercher.'
            ]
          }
        ]
      }
    }
  },

  // ---- Roadmap: wat er al is gebouwd als checklist, en waar je meer leest ----
  'en/blog/roadmap': {
    nl: {
      brief: [
        'Update november 2026: allergenen per recept staan live. Bovenaan de lijst staat nu kostprijs per recept.',
        'Daarna de geschiedenis van elk recept, en misschien een eigen app.',
        'We bouwen wat in de keuken tijd scheelt. Mail je idee naar contact@savour.page.'
      ],
      extra: {
        1: [
          {
            see: [
              'Allergenen: zo gaat het werken',
              '@post:en/blog/allergens-in-savour',
              'De uitleg van de allergenenfunctie, die nu live staat.'
            ]
          }
        ],
        4: [
          {
            check: [
              'Recepten importeren uit Word, PDF, tekst en foto’s',
              'Keukenteams met drie rollen',
              'Omrekenen en de kookmodus',
              'Printen, met je eigen logo (Pro)',
              'Offline je recepten openen',
              'Notities en koppelingen naar basisrecepten',
              'De import service: wij laden je map in'
            ],
            title: 'Wat er al is'
          }
        ]
      }
    },
    en: {
      brief: [
        'Update November 2026: allergens per recipe are live. Cost per recipe is now at the top of the list.',
        'After that the history of every recipe, and perhaps an app of our own.',
        'We build what saves time in the kitchen. Email your idea to contact@savour.page.'
      ],
      extra: {
        1: [
          {
            see: [
              'Allergens: how it will work',
              '@post:en/blog/allergens-in-savour',
              'How the allergen feature works, now live in Savour.'
            ]
          }
        ],
        4: [
          {
            check: [
              'Importing recipes from Word, PDF, text and photos',
              'Kitchen teams with three roles',
              'Converting and cooking mode',
              'Printing, with your own logo (Pro)',
              'Opening your recipes offline',
              'Notes and links to base recipes',
              'The import service: we load your folder in'
            ],
            title: 'What is already there'
          }
        ]
      }
    },
    de: {
      brief: [
        'Update November 2026: Allergene pro Rezept sind live. Ganz oben steht jetzt Kosten pro Rezept.',
        'Danach die Geschichte jedes Rezepts und vielleicht eine eigene App.',
        'Wir bauen, was in der Küche Zeit spart. Schick deine Idee an contact@savour.page.'
      ],
      extra: {
        1: [
          {
            see: [
              'Allergene: so wird es funktionieren',
              '@post:en/blog/allergens-in-savour',
              'Die Erklärung der Allergenfunktion, die jetzt live ist.'
            ]
          }
        ],
        4: [
          {
            check: [
              'Rezepte aus Word, PDF, Text und Fotos importieren',
              'Küchenteams mit drei Rollen',
              'Umrechnen und Kochmodus',
              'Drucken, mit deinem eigenen Logo (Pro)',
              'Rezepte offline öffnen',
              'Notizen und Verknüpfungen zu Grundrezepten',
              'Der Import-Service: Wir pflegen deinen Ordner ein'
            ],
            title: 'Was es schon gibt'
          }
        ]
      }
    },
    es: {
      brief: [
        'Actualización de noviembre de 2026: los alérgenos por receta ya están disponibles. Lo primero de la lista es ahora el coste por receta.',
        'Después, el historial de cada receta y quizá una app propia.',
        'Construimos lo que ahorra tiempo en la cocina. Envía tu idea a contact@savour.page.'
      ],
      extra: {
        1: [
          {
            see: [
              'Alérgenos: así funcionará',
              '@post:en/blog/allergens-in-savour',
              'La explicación de la función de alérgenos, ya disponible en Savour.'
            ]
          }
        ],
        4: [
          {
            check: [
              'Importar recetas de Word, PDF, texto y fotos',
              'Equipos de cocina con tres roles',
              'Recalcular y el modo cocina',
              'Imprimir, con tu propio logotipo (Pro)',
              'Abrir tus recetas sin conexión',
              'Notas y enlaces a recetas base',
              'El servicio de carga: cargamos tu carpeta'
            ],
            title: 'Lo que ya existe'
          }
        ]
      }
    },
    fr: {
      brief: [
        'Mise à jour de novembre 2026 : les allergènes par recette sont disponibles. En haut de la liste, il y a maintenant le coût par recette.',
        'Ensuite l’historique de chaque recette, et peut-être une application à nous.',
        'Nous construisons ce qui fait gagner du temps en cuisine. Envoie ton idée à contact@savour.page.'
      ],
      extra: {
        1: [
          {
            see: [
              'Les allergènes : comment ça va marcher',
              '@post:en/blog/allergens-in-savour',
              'L’explication de la fonction allergènes, désormais disponible dans Savour.'
            ]
          }
        ],
        4: [
          {
            check: [
              'Importer des recettes depuis Word, PDF, texte et photos',
              'Des équipes de cuisine avec trois rôles',
              'La conversion et le mode cuisine',
              'L’impression, avec ton propre logo (Pro)',
              'Ouvrir tes recettes hors ligne',
              'Des notes et des liens vers les recettes de base',
              'Le service d’importation : nous chargeons ton classeur'
            ],
            title: 'Ce qui existe déjà'
          }
        ]
      }
    }
  },

  // ---- Recepten organiseren: categorie tegenover map, en een naamvoorbeeld ----
  'en/blog/organising-recipes-in-the-kitchen': {
    nl: {
      brief: [
        'Houd de basis apart van het menu; de basis verandert zelden, het menu elk seizoen.',
        'Categorieën zeggen wat een recept is, mappen waar je het gebruikt.',
        'Eén eigenaar per receptuur, en na elk seizoen opruimen naar het archief.'
      ],
      extra: {
        2: [
          {
            compare: [
              ['Categorie: wat het is', ['saus', 'garnituur', 'dessert']],
              ['Map: waar je het gebruikt', ['lunchkaart', 'proeverij', 'evenement']]
            ]
          }
        ]
      },
      add: [
        [
          'Een naam die iedereen vindt',
          'Een goede titel is de snelste zoekfunctie. Gebruik de naam die de keuken echt zegt, en zet het hoofdproduct erin.',
          {
            example: [
              'Zo wordt een titel vindbaar',
              [
                '“Jus 3” wordt **Kalfsjus basis**',
                '“Saus nieuw (def)” wordt **Beurre blanc**',
                '“Dessert okt” wordt **Tarte tatin**'
              ]
            ]
          }
        ]
      ]
    },
    en: {
      brief: [
        'Keep the basics apart from the menu; the basics rarely change, the menu every season.',
        'Categories say what a recipe is, folders where you use it.',
        'One owner per recipe, and after every season tidy up into the archive.'
      ],
      extra: {
        2: [
          {
            compare: [
              ['Category: what it is', ['sauce', 'garnish', 'dessert']],
              ['Folder: where you use it', ['lunch menu', 'tasting menu', 'event']]
            ]
          }
        ]
      },
      add: [
        [
          'A name everyone can find',
          'A good title is the fastest search there is. Use the name the kitchen actually says, and put the main product in it.',
          {
            example: [
              'How a title becomes findable',
              [
                '“Jus 3” becomes **Veal jus base**',
                '“Sauce new (final)” becomes **Beurre blanc**',
                '“Dessert Oct” becomes **Tarte tatin**'
              ]
            ]
          }
        ]
      ]
    },
    de: {
      brief: [
        'Halte die Grundlagen getrennt vom Menü; die Grundlagen ändern sich selten, das Menü jede Saison.',
        'Kategorien sagen, was ein Rezept ist, Ordner, wo du es verwendest.',
        'Ein Verantwortlicher pro Rezeptur, und nach jeder Saison ins Archiv aufräumen.'
      ],
      extra: {
        2: [
          {
            compare: [
              ['Kategorie: was es ist', ['Sauce', 'Garnitur', 'Dessert']],
              ['Ordner: wo du es verwendest', ['Mittagskarte', 'Degustation', 'Veranstaltung']]
            ]
          }
        ]
      },
      add: [
        [
          'Ein Name, den jeder findet',
          'Ein guter Titel ist die schnellste Suche. Nimm den Namen, den die Küche wirklich sagt, und setz das Hauptprodukt hinein.',
          {
            example: [
              'So wird ein Titel auffindbar',
              [
                '„Jus 3“ wird **Kalbsjus Basis**',
                '„Sauce neu (final)“ wird **Beurre blanc**',
                '„Dessert Okt“ wird **Tarte Tatin**'
              ]
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'Separa la base de la carta; la base cambia poco, la carta cada temporada.',
        'Las categorías dicen qué es una receta; las carpetas, dónde la usas.',
        'Un responsable por receta, y después de cada temporada, al archivo.'
      ],
      extra: {
        2: [
          {
            compare: [
              ['Categoría: qué es', ['salsa', 'guarnición', 'postre']],
              ['Carpeta: dónde la usas', ['carta del almuerzo', 'menú degustación', 'evento']]
            ]
          }
        ]
      },
      add: [
        [
          'Un nombre que todos encuentren',
          'Un buen título es la búsqueda más rápida. Usa el nombre que dice de verdad la cocina y pon en él el producto principal.',
          {
            example: [
              'Así se encuentra un título',
              [
                '«Jugo 3» pasa a ser **Jugo de ternera base**',
                '«Salsa nueva (def)» pasa a ser **Beurre blanc**',
                '«Postre oct» pasa a ser **Tarta tatin**'
              ]
            ]
          }
        ]
      ]
    },
    fr: {
      brief: [
        'Sépare les bases de la carte ; les bases changent peu, la carte à chaque saison.',
        'Les catégories disent ce qu’est une recette, les dossiers où tu l’utilises.',
        'Un responsable par recette, et après chaque saison, rangement aux archives.'
      ],
      extra: {
        2: [
          {
            compare: [
              ['Catégorie : ce que c’est', ['sauce', 'garniture', 'dessert']],
              ['Dossier : où tu l’utilises', ['carte du midi', 'menu dégustation', 'événement']]
            ]
          }
        ]
      },
      add: [
        [
          'Un nom que tout le monde trouve',
          'Un bon titre est la recherche la plus rapide. Utilise le nom que la cuisine dit vraiment, et mets-y le produit principal.',
          {
            example: [
              'Comment un titre devient trouvable',
              [
                '« Jus 3 » devient **Jus de veau base**',
                '« Sauce nouvelle (déf) » devient **Beurre blanc**',
                '« Dessert oct » devient **Tarte tatin**'
              ]
            ]
          }
        ]
      ]
    }
  },

  // ---- Kerntemperaturen: de kern in één zin, een tip voor in het recept en een verwijzing naar sous-vide ----
  'en/blog/core-temperatures-meat-fish-shellfish': {
    nl: {
      brief: [
        'Kip hoeft niet naar 75 °C en varkenshaas mag rosé: wat telt is temperatuur én tijd.',
        'Per product staan hieronder de waarden voor de professionele keuken, met de bronnen erbij.',
        'Meet in het dikste deel, en controleer je kernthermometer regelmatig in ijswater.'
      ],
      extra: {
        0: [{ quote: 'Wat telt is temperatuur én tijd.' }],
        14: [
          {
            tip: [
              'Zet de kerntemperatuur in het recept',
              'Schrijf de kerntemperatuur en de rusttijd in de notitie bij het recept. Dan staat hij op de telefoon en op de print, en hoeft niemand het op te zoeken.'
            ]
          },
          {
            see: [
              'Sous-vide: temperaturen en tijden',
              '@post:en/blog/sous-vide-temperatures-and-times',
              'Badtemperatuur en tijd per product, met koelen en bewaren.'
            ]
          }
        ]
      }
    },
    en: {
      brief: [
        'Chicken does not need 75 °C and pork tenderloin may be pink: what counts is temperature and time.',
        'Below are the values per product for the professional kitchen, with the sources.',
        'Measure in the thickest part, and check your probe regularly in ice water.'
      ],
      extra: {
        0: [{ quote: 'What counts is temperature and time.' }],
        14: [
          {
            tip: [
              'Put the core temperature in the recipe',
              'Write the core temperature and resting time in the note with the recipe. Then it is on the phone and on the print, and nobody has to look it up.'
            ]
          },
          {
            see: [
              'Sous vide: temperatures and times',
              '@post:en/blog/sous-vide-temperatures-and-times',
              'Bath temperature and time per product, with chilling and storage.'
            ]
          }
        ]
      }
    },
    de: {
      brief: [
        'Hähnchen muss nicht auf 75 °C und Schweinefilet darf rosa sein: Entscheidend sind Temperatur und Zeit.',
        'Unten stehen die Werte pro Produkt für die Profiküche, mit den Quellen.',
        'Miss an der dicksten Stelle und prüf dein Kernthermometer regelmäßig in Eiswasser.'
      ],
      extra: {
        0: [{ quote: 'Entscheidend sind Temperatur und Zeit.' }],
        14: [
          {
            tip: [
              'Schreib die Kerntemperatur ins Rezept',
              'Trag Kerntemperatur und Ruhezeit in die Notiz zum Rezept ein. Dann steht sie auf dem Handy und auf dem Ausdruck, und niemand muss sie nachschlagen.'
            ]
          },
          {
            see: [
              'Sous-vide: Temperaturen und Zeiten',
              '@post:en/blog/sous-vide-temperatures-and-times',
              'Badtemperatur und Zeit pro Produkt, mit Kühlen und Lagern.'
            ]
          }
        ]
      }
    },
    es: {
      brief: [
        'El pollo no necesita 75 °C y el solomillo de cerdo puede quedar rosado: lo que cuenta es temperatura y tiempo.',
        'Abajo tienes los valores por producto para la cocina profesional, con las fuentes.',
        'Mide en la parte más gruesa y comprueba tu sonda a menudo en agua con hielo.'
      ],
      extra: {
        0: [{ quote: 'Lo que cuenta es temperatura y tiempo.' }],
        14: [
          {
            tip: [
              'Pon la temperatura en la receta',
              'Escribe la temperatura en el centro y el reposo en la nota de la receta. Así está en el móvil y en la impresión, y nadie tiene que buscarla.'
            ]
          },
          {
            see: [
              'Sous-vide: temperaturas y tiempos',
              '@post:en/blog/sous-vide-temperatures-and-times',
              'Temperatura del baño y tiempo por producto, con enfriado y conservación.'
            ]
          }
        ]
      }
    },
    fr: {
      brief: [
        'Le poulet n’a pas besoin de 75 °C et le filet mignon de porc peut rester rosé : ce qui compte, c’est la température et le temps.',
        'Ci-dessous, les valeurs par produit pour la cuisine professionnelle, avec les sources.',
        'Mesure dans la partie la plus épaisse et vérifie régulièrement ta sonde dans de l’eau glacée.'
      ],
      extra: {
        0: [{ quote: 'Ce qui compte, c’est la température et le temps.' }],
        14: [
          {
            tip: [
              'Mets la température à cœur dans la recette',
              'Écris la température à cœur et le temps de repos dans la note de la recette. Elle figure alors sur le téléphone et sur l’impression, et personne n’a besoin de la chercher.'
            ]
          },
          {
            see: [
              'Sous vide : températures et temps',
              '@post:en/blog/sous-vide-temperatures-and-times',
              'Température du bain et temps par produit, avec refroidissement et conservation.'
            ]
          }
        ]
      }
    }
  },

  // ---- Sous-vide: het principe in één getal, een aandachtspunt en een verwijzing naar kerntemperaturen ----
  'en/blog/sous-vide-temperatures-and-times': {
    nl: {
      brief: [
        'Bij sous-vide is de badtemperatuur de eindtemperatuur van het product.',
        'Hoelang het moet om te pasteuriseren, hangt af van de dikte en de temperatuur.',
        'Groente heeft veel meer warmte nodig dan vlees: gaar het apart.'
      ],
      extra: {
        0: [
          { fact: ['63 °C', 'in het bad is 63 °C in de kipfilet. Heter wordt hij nooit, hoe lang hij er ook in ligt.'] }
        ],
        7: [
          {
            warn: [
              'Vis onder 60 °C',
              'Onder 60 °C pasteuriseer je vis niet. Gebruik vis die is ingevroren, en serveer direct.'
            ]
          }
        ],
        11: [
          {
            tip: [
              'Badtijden in het recept',
              'Zet de badtemperatuur, de tijd en hoe je koelt in de notitie bij het recept. Dan werkt de volgende dienst met dezelfde waarden.'
            ]
          },
          {
            see: [
              'Kerntemperaturen voor vlees, vis en schaaldieren',
              '@post:en/blog/core-temperatures-meat-fish-shellfish',
              'Wat de Hygiënecode zegt en wat er per product kan.'
            ]
          }
        ]
      }
    },
    en: {
      brief: [
        'With sous vide the bath temperature is the final temperature of the product.',
        'How long it takes to pasteurise depends on thickness and temperature.',
        'Vegetables need far more heat than meat: cook them separately.'
      ],
      extra: {
        0: [
          {
            fact: [
              '63 °C',
              'in the bath is 63 °C in the chicken breast. It never gets hotter, however long it stays in.'
            ]
          }
        ],
        7: [
          {
            warn: [
              'Fish below 60 °C',
              'Below 60 °C you do not pasteurise fish. Use fish that has been frozen, and serve straight away.'
            ]
          }
        ],
        11: [
          {
            tip: [
              'Bath times in the recipe',
              'Put the bath temperature, the time and how you chill in the note with the recipe. Then the next shift works with the same values.'
            ]
          },
          {
            see: [
              'Core temperatures for meat, fish and shellfish',
              '@post:en/blog/core-temperatures-meat-fish-shellfish',
              'What the hygiene code says and what is possible per product.'
            ]
          }
        ]
      }
    },
    de: {
      brief: [
        'Bei Sous-vide ist die Badtemperatur die Endtemperatur des Produkts.',
        'Wie lange es zum Pasteurisieren braucht, hängt von Dicke und Temperatur ab.',
        'Gemüse braucht viel mehr Wärme als Fleisch: gare es getrennt.'
      ],
      extra: {
        0: [
          {
            fact: [
              '63 °C',
              'im Bad sind 63 °C in der Hähnchenbrust. Heißer wird sie nie, egal wie lange sie darin liegt.'
            ]
          }
        ],
        7: [
          {
            warn: [
              'Fisch unter 60 °C',
              'Unter 60 °C pasteurisierst du Fisch nicht. Verwende Fisch, der eingefroren war, und serviere sofort.'
            ]
          }
        ],
        11: [
          {
            tip: [
              'Badzeiten ins Rezept',
              'Schreib Badtemperatur, Zeit und wie du kühlst in die Notiz zum Rezept. Dann arbeitet die nächste Schicht mit denselben Werten.'
            ]
          },
          {
            see: [
              'Kerntemperaturen für Fleisch, Fisch und Meeresfrüchte',
              '@post:en/blog/core-temperatures-meat-fish-shellfish',
              'Was die Hygieneregeln sagen und was pro Produkt möglich ist.'
            ]
          }
        ]
      }
    },
    es: {
      brief: [
        'En sous-vide, la temperatura del baño es la temperatura final del producto.',
        'El tiempo para pasteurizar depende del grosor y de la temperatura.',
        'La verdura necesita mucho más calor que la carne: cuécela aparte.'
      ],
      extra: {
        0: [
          {
            fact: [
              '63 °C',
              'en el baño son 63 °C en la pechuga de pollo. Nunca se calienta más, por mucho tiempo que esté dentro.'
            ]
          }
        ],
        7: [
          {
            warn: [
              'Pescado por debajo de 60 °C',
              'Por debajo de 60 °C no pasteurizas el pescado. Usa pescado congelado previamente y sírvelo enseguida.'
            ]
          }
        ],
        11: [
          {
            tip: [
              'Los tiempos del baño en la receta',
              'Pon la temperatura del baño, el tiempo y cómo enfrías en la nota de la receta. Así el siguiente turno trabaja con los mismos valores.'
            ]
          },
          {
            see: [
              'Temperaturas en el centro para carne, pescado y marisco',
              '@post:en/blog/core-temperatures-meat-fish-shellfish',
              'Lo que dicen las normas de higiene y lo que se puede hacer con cada producto.'
            ]
          }
        ]
      }
    },
    fr: {
      brief: [
        'En sous vide, la température du bain est la température finale du produit.',
        'Le temps pour pasteuriser dépend de l’épaisseur et de la température.',
        'Les légumes ont besoin de beaucoup plus de chaleur que la viande : cuis-les à part.'
      ],
      extra: {
        0: [
          {
            fact: [
              '63 °C',
              'dans le bain, c’est 63 °C dans le blanc de poulet. Il ne chauffe jamais plus, quel que soit le temps passé dedans.'
            ]
          }
        ],
        7: [
          {
            warn: [
              'Poisson sous 60 °C',
              'Sous 60 °C, tu ne pasteurises pas le poisson. Utilise du poisson préalablement congelé et sers aussitôt.'
            ]
          }
        ],
        11: [
          {
            tip: [
              'Les temps de bain dans la recette',
              'Note la température du bain, le temps et la manière de refroidir dans la note de la recette. Le service suivant travaille ainsi avec les mêmes valeurs.'
            ]
          },
          {
            see: [
              'Températures à cœur pour viande, poisson et fruits de mer',
              '@post:en/blog/core-temperatures-meat-fish-shellfish',
              'Ce que disent les règles d’hygiène et ce qui est possible par produit.'
            ]
          }
        ]
      }
    }
  }
};
