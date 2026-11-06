// Uitgebreide opmaak voor de blogs (deel 1): per artikel (Engels adres) en per taal In het kort, blokken bij
// bestaande secties (extra: { sectienummer: [blokken] }) en nieuwe secties (add). Elk artikel heeft eigen blokken,
// zodat niet alles hetzelfde leest. Alleen wat Savour echt doet; geen verzonnen klanten, quotes of cijfers.
// Blokken: zie postBlock in tools/build-seo.mjs. Links als code: @post:, @feature:, @service, @list, @demo.

export const RICH_1 = {
  // ---- Kladjes digitaliseren: echte kladjes, een foto-checklist en een tip over het origineel ----
  'en/blog/digitise-old-recipe-notes': {
    nl: {
      brief: [
        'Begin met de recepten die je deze maand nodig hebt, niet met het hele schrift.',
        'Een goede foto (daglicht, recht van boven, één pagina) scheelt de meeste nakijktijd.',
        'Laat de foto uitlezen in plaats van overtypen, en controleer altijd de hoeveelheden.'
      ],
      extra: {
        1: [
          {
            duo: [
              ['/assets/kladjes/curd.jpg', 'Handgeschreven kladje van een citroencurd'],
              ['/assets/kladjes/huisdressing.jpg', 'Handgeschreven kladje van een huisdressing']
            ],
            caption:
              'Twee echte kladjes uit onze eigen keuken. Vlekken en doorhalingen zijn geen probleem; een schaduw over de tekst wel.'
          },
          {
            check: [
              'Daglicht, geen flits',
              'Recht van boven, de hele pagina in beeld',
              'Eén pagina per foto',
              'Papier plat op een donkere ondergrond',
              'Geen hand of telefoon die een schaduw werpt'
            ],
            title: 'Checklist voor een goede foto'
          }
        ],
        4: [
          {
            tip: [
              'Zet de foto bij het recept',
              'Twijfel je later over een hoeveelheid, dan leg je het recept naast de foto van het origineel. Dat gaat sneller dan het schrift zoeken.'
            ]
          }
        ]
      },
      add: [
        [
          'Wat je in een middag haalt',
          'Fotografeer eerst twintig of dertig recepten die je nu gebruikt, en lees ze in één keer in. Loop daarna alleen de gemarkeerde recepten na. Zo heb je aan het eind van de middag een bruikbaar receptenboek, in plaats van een half overgetypt schrift. Met Savour Pro leest de AI de foto’s; zonder Pro kun je getypte bestanden zoals Word en PDF gratis inlezen.',
          { see: ['Recepten digitaliseren', '@feature:digitise', 'Alles over inlezen: Word, PDF, foto’s en kladjes.'] }
        ]
      ]
    },
    en: {
      brief: [
        'Start with the recipes you need this month, not the whole notebook.',
        'A good photo (daylight, straight from above, one page) saves the most checking time.',
        'Let the photo be read instead of retyping it, and always check the quantities.'
      ],
      extra: {
        1: [
          {
            duo: [
              ['/assets/kladjes/curd.jpg', 'Handwritten note of a lemon curd'],
              ['/assets/kladjes/huisdressing.jpg', 'Handwritten note of a house dressing']
            ],
            caption:
              'Two real notes from our own kitchen. Stains and crossings-out are fine; a shadow over the text is not.'
          },
          {
            check: [
              'Daylight, no flash',
              'Straight from above, the whole page in view',
              'One page per photo',
              'Paper flat on a dark surface',
              'No hand or phone casting a shadow'
            ],
            title: 'Checklist for a good photo'
          }
        ],
        4: [
          {
            tip: [
              'Keep the photo with the recipe',
              'If you doubt a quantity later, put the recipe next to the photo of the original. That is quicker than finding the notebook.'
            ]
          }
        ]
      },
      add: [
        [
          'What you can do in one afternoon',
          'Photograph twenty or thirty recipes you use now and read them in one go. Then only check the recipes that are marked. By the end of the afternoon you have a usable recipe book instead of a half-retyped notebook. With Savour Pro the AI reads the photos; without Pro you can read typed files such as Word and PDF for free.',
          {
            see: ['Digitise recipes', '@feature:digitise', 'Everything about reading in: Word, PDF, photos and notes.']
          }
        ]
      ]
    },
    de: {
      brief: [
        'Fang mit den Rezepten an, die du diesen Monat brauchst, nicht mit dem ganzen Heft.',
        'Ein gutes Foto (Tageslicht, gerade von oben, eine Seite) spart die meiste Prüfzeit.',
        'Lass das Foto auslesen statt abzutippen, und prüfe immer die Mengen.'
      ],
      extra: {
        1: [
          {
            duo: [
              ['/assets/kladjes/curd.jpg', 'Handgeschriebene Notiz eines Zitronencurds'],
              ['/assets/kladjes/huisdressing.jpg', 'Handgeschriebene Notiz eines Hausdressings']
            ],
            caption:
              'Zwei echte Notizen aus unserer eigenen Küche. Flecken und Durchgestrichenes sind kein Problem, ein Schatten über dem Text schon.'
          },
          {
            check: [
              'Tageslicht, kein Blitz',
              'Gerade von oben, die ganze Seite im Bild',
              'Eine Seite pro Foto',
              'Papier flach auf einem dunklen Untergrund',
              'Keine Hand und kein Handy, die einen Schatten werfen'
            ],
            title: 'Checkliste für ein gutes Foto'
          }
        ],
        4: [
          {
            tip: [
              'Leg das Foto zum Rezept',
              'Zweifelst du später an einer Menge, legst du das Rezept neben das Foto des Originals. Das geht schneller, als das Heft zu suchen.'
            ]
          }
        ]
      },
      add: [
        [
          'Was du an einem Nachmittag schaffst',
          'Fotografiere zuerst zwanzig oder dreißig Rezepte, die du jetzt benutzt, und lies sie in einem Schritt ein. Prüfe danach nur die markierten Rezepte. So hast du am Ende des Nachmittags ein brauchbares Rezeptbuch statt eines halb abgetippten Hefts. Mit Savour Pro liest die KI die Fotos; ohne Pro liest du getippte Dateien wie Word und PDF kostenlos ein.',
          { see: ['Rezepte digitalisieren', '@feature:digitise', 'Alles zum Einlesen: Word, PDF, Fotos und Notizen.'] }
        ]
      ]
    },
    es: {
      brief: [
        'Empieza por las recetas que necesitas este mes, no por todo el cuaderno.',
        'Una buena foto (luz de día, desde arriba, una página) ahorra la mayor parte de la revisión.',
        'Deja que se lea la foto en lugar de volver a escribirla, y comprueba siempre las cantidades.'
      ],
      extra: {
        1: [
          {
            duo: [
              ['/assets/kladjes/curd.jpg', 'Nota manuscrita de un curd de limón'],
              ['/assets/kladjes/huisdressing.jpg', 'Nota manuscrita de un aliño de la casa']
            ],
            caption:
              'Dos notas reales de nuestra propia cocina. Las manchas y tachones no son problema; una sombra sobre el texto, sí.'
          },
          {
            check: [
              'Luz de día, sin flash',
              'Desde arriba, con toda la página',
              'Una página por foto',
              'El papel plano sobre un fondo oscuro',
              'Sin manos ni móvil que hagan sombra'
            ],
            title: 'Lista para una buena foto'
          }
        ],
        4: [
          {
            tip: [
              'Guarda la foto con la receta',
              'Si más tarde dudas de una cantidad, pones la receta al lado de la foto del original. Es más rápido que buscar el cuaderno.'
            ]
          }
        ]
      },
      add: [
        [
          'Lo que haces en una tarde',
          'Fotografía primero veinte o treinta recetas que usas ahora y léelas de una vez. Después revisa solo las recetas marcadas. Al final de la tarde tienes un recetario útil en lugar de un cuaderno a medio pasar. Con Savour Pro la IA lee las fotos; sin Pro puedes leer gratis archivos escritos como Word y PDF.',
          { see: ['Digitalizar recetas', '@feature:digitise', 'Todo sobre la lectura: Word, PDF, fotos y notas.'] }
        ]
      ]
    },
    fr: {
      brief: [
        'Commence par les recettes dont tu as besoin ce mois-ci, pas par tout le cahier.',
        'Une bonne photo (lumière du jour, bien d’en haut, une page) fait gagner le plus de temps de vérification.',
        'Fais lire la photo au lieu de tout retaper, et vérifie toujours les quantités.'
      ],
      extra: {
        1: [
          {
            duo: [
              ['/assets/kladjes/curd.jpg', 'Note manuscrite d’un lemon curd'],
              ['/assets/kladjes/huisdressing.jpg', 'Note manuscrite d’une vinaigrette maison']
            ],
            caption:
              'Deux vraies notes de notre propre cuisine. Les taches et ratures ne posent pas de problème ; une ombre sur le texte, si.'
          },
          {
            check: [
              'Lumière du jour, sans flash',
              'Bien d’en haut, toute la page visible',
              'Une page par photo',
              'Papier à plat sur un fond sombre',
              'Pas de main ni de téléphone qui fait de l’ombre'
            ],
            title: 'Liste pour une bonne photo'
          }
        ],
        4: [
          {
            tip: [
              'Garde la photo avec la recette',
              'Si tu doutes plus tard d’une quantité, tu mets la recette à côté de la photo de l’original. C’est plus rapide que de chercher le cahier.'
            ]
          }
        ]
      },
      add: [
        [
          'Ce que tu fais en un après-midi',
          'Photographie d’abord vingt ou trente recettes que tu utilises maintenant et lis-les en une fois. Vérifie ensuite seulement les recettes marquées. À la fin de l’après-midi, tu as un livre de recettes utilisable au lieu d’un cahier à moitié retapé. Avec Savour Pro, l’IA lit les photos ; sans Pro, tu lis gratuitement les fichiers tapés comme Word et PDF.',
          { see: ['Numériser des recettes', '@feature:digitise', 'Tout sur la lecture : Word, PDF, photos et notes.'] }
        ]
      ]
    }
  },

  // ---- AI mag niet verzinnen: het echte marshmallow-kladje, wat er staat tegenover wat er niet staat ----
  'en/blog/ai-should-never-invent-recipes': {
    nl: {
      brief: [
        'Een slimme gok ziet er net zo overtuigend uit als het juiste antwoord.',
        'Savour verzint nooit hoeveelheden, ingrediënten of stappen: wat er niet staat, blijft leeg.',
        'Twijfel wordt gemarkeerd, en de chef beslist.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/kladjes/marshmallow-kladje.jpg',
            alt: 'Handgeschreven kladje van een marshmallow',
            caption:
              'Ons eigen marshmallowkladje. Suiker of glucose, gram of milliliter: precies daar mag niemand raden.',
            wide: true
          }
        ],
        1: [
          {
            compare: [
              [
                'Wat een gok doet',
                [
                  'vult een onleesbaar getal in met wat gebruikelijk is',
                  'maakt een bereiding als die ontbreekt',
                  'ziet er overtuigend uit, ook als het fout is'
                ]
              ],
              [
                'Wat Savour doet',
                [
                  'neemt over wat er staat',
                  'laat leeg wat er niet staat',
                  'markeert wat niet zeker is, zodat jij kijkt'
                ]
              ]
            ]
          }
        ],
        2: [{ quote: 'Liever een vraag aan jou dan een fout op het bord.' }]
      }
    },
    en: {
      brief: [
        'A clever guess looks just as convincing as the right answer.',
        'Savour never invents quantities, ingredients or steps: what is not there stays empty.',
        'Doubt is marked, and the chef decides.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/kladjes/marshmallow-kladje.jpg',
            alt: 'Handwritten note of a marshmallow recipe',
            caption:
              'Our own marshmallow note. Sugar or glucose, grams or millilitres: that is exactly where nobody should guess.',
            wide: true
          }
        ],
        1: [
          {
            compare: [
              [
                'What a guess does',
                [
                  'fills an unreadable number with what is usual',
                  'writes a method when there is none',
                  'looks convincing, even when it is wrong'
                ]
              ],
              [
                'What Savour does',
                [
                  'takes over what is there',
                  'leaves empty what is not there',
                  'marks what is uncertain, so you can check'
                ]
              ]
            ]
          }
        ],
        2: [{ quote: 'Better a question to you than a mistake on the plate.' }]
      }
    },
    de: {
      brief: [
        'Eine kluge Vermutung sieht genauso überzeugend aus wie die richtige Antwort.',
        'Savour erfindet nie Mengen, Zutaten oder Schritte: Was nicht dasteht, bleibt leer.',
        'Zweifel wird markiert, und der Koch entscheidet.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/kladjes/marshmallow-kladje.jpg',
            alt: 'Handgeschriebene Notiz eines Marshmallow-Rezepts',
            caption:
              'Unsere eigene Marshmallow-Notiz. Zucker oder Glukose, Gramm oder Milliliter: genau da darf niemand raten.',
            wide: true
          }
        ],
        1: [
          {
            compare: [
              [
                'Was eine Vermutung tut',
                [
                  'füllt eine unleserliche Zahl mit dem Üblichen',
                  'schreibt eine Zubereitung, wenn keine da ist',
                  'sieht überzeugend aus, auch wenn es falsch ist'
                ]
              ],
              [
                'Was Savour tut',
                [
                  'übernimmt, was dasteht',
                  'lässt leer, was nicht dasteht',
                  'markiert, was unsicher ist, damit du nachsiehst'
                ]
              ]
            ]
          }
        ],
        2: [{ quote: 'Lieber eine Frage an dich als ein Fehler auf dem Teller.' }]
      }
    },
    es: {
      brief: [
        'Una suposición inteligente parece tan convincente como la respuesta correcta.',
        'Savour nunca inventa cantidades, ingredientes ni pasos: lo que no está, se queda vacío.',
        'Las dudas se marcan, y decide el chef.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/kladjes/marshmallow-kladje.jpg',
            alt: 'Nota manuscrita de una receta de malvavisco',
            caption:
              'Nuestra propia nota de malvavisco. Azúcar o glucosa, gramos o mililitros: justo ahí nadie debe adivinar.',
            wide: true
          }
        ],
        1: [
          {
            compare: [
              [
                'Lo que hace una suposición',
                [
                  'rellena un número ilegible con lo habitual',
                  'escribe una elaboración si no la hay',
                  'parece convincente, aunque esté mal'
                ]
              ],
              [
                'Lo que hace Savour',
                ['copia lo que está', 'deja vacío lo que no está', 'marca lo que no es seguro, para que lo revises']
              ]
            ]
          }
        ],
        2: [{ quote: 'Mejor una pregunta para ti que un error en el plato.' }]
      }
    },
    fr: {
      brief: [
        'Une supposition habile paraît aussi convaincante que la bonne réponse.',
        'Savour n’invente jamais de quantités, d’ingrédients ou d’étapes : ce qui n’y est pas reste vide.',
        'Le doute est signalé, et c’est le chef qui décide.'
      ],
      extra: {
        0: [
          {
            shot: '/assets/kladjes/marshmallow-kladje.jpg',
            alt: 'Note manuscrite d’une recette de guimauve',
            caption:
              'Notre propre note de guimauve. Sucre ou glucose, grammes ou millilitres : c’est justement là que personne ne doit deviner.',
            wide: true
          }
        ],
        1: [
          {
            compare: [
              [
                'Ce que fait une supposition',
                [
                  'remplit un chiffre illisible par l’habituel',
                  'écrit une méthode quand il n’y en a pas',
                  'paraît convaincante, même quand elle est fausse'
                ]
              ],
              [
                'Ce que fait Savour',
                [
                  'reprend ce qui est écrit',
                  'laisse vide ce qui ne l’est pas',
                  'signale ce qui est incertain, pour que tu vérifies'
                ]
              ]
            ]
          }
        ],
        2: [{ quote: 'Mieux vaut une question pour toi qu’une erreur dans l’assiette.' }]
      }
    }
  },

  // ---- Van Word naar receptenboek: het getal, de stappen en wat de lezer opruimt ----
  'en/blog/from-word-to-recipe-book': {
    nl: {
      brief: [
        'Kies je Word-bestand of PDF: de Savour-lezer splitst het zelf in losse recepten.',
        'Titels, hoeveelheden en stappen worden herkend; twijfel wordt gemarkeerd.',
        'Gratis tot 100 recepten; met Pro onbeperkt en leest de AI ook foto’s.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Bestand kiezen', 'Onder “Recept toevoegen” kies je het Word-bestand, de PDF of de tekst.'],
              ['De lezer splitst', 'Savour gaat het hele document door en maakt er losse recepten van.'],
              ['Nalopen', 'Je ziet alle recepten in één overzicht; wat gemarkeerd is, kijk je na.'],
              ['Opslaan', 'Alles in één keer opslaan, daarna in mappen zetten en delen.']
            ]
          }
        ],
        1: [
          {
            example: [
              'Wat de lezer opruimt',
              [
                '“12. Kalfsjus” wordt de titel **Kalfsjus**',
                '“oven op 18oc” wordt **180°C**',
                'een recept dat halverwege de pagina doorloopt, blijft één recept'
              ]
            ]
          }
        ],
        3: [{ fact: ['1.400', 'recepten uit Word, ingelezen in ongeveer twee minuten.'] }]
      }
    },
    en: {
      brief: [
        'Choose your Word file or PDF: the Savour reader splits it into separate recipes itself.',
        'Titles, quantities and steps are recognised; doubt is marked.',
        'Free up to 100 recipes; with Pro unlimited, and the AI also reads photos.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Choose a file', 'Under “Add recipe” you choose the Word file, PDF or text.'],
              ['The reader splits', 'Savour goes through the whole document and turns it into separate recipes.'],
              ['Check', 'You see all recipes in one overview; you check what is marked.'],
              ['Save', 'Save everything at once, then put it in folders and share.']
            ]
          }
        ],
        1: [
          {
            example: [
              'What the reader tidies up',
              [
                '“12. Veal jus” becomes the title **Veal jus**',
                '“oven at 18oc” becomes **180°C**',
                'a recipe that runs on halfway down the page stays one recipe'
              ]
            ]
          }
        ],
        3: [{ fact: ['1,400', 'recipes from Word, read in in about two minutes.'] }]
      }
    },
    de: {
      brief: [
        'Wähle deine Word-Datei oder PDF: Der Savour-Leser teilt sie selbst in einzelne Rezepte.',
        'Titel, Mengen und Schritte werden erkannt; Zweifel wird markiert.',
        'Kostenlos bis 100 Rezepte; mit Pro unbegrenzt, und die KI liest auch Fotos.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Datei wählen', 'Unter „Rezept hinzufügen“ wählst du die Word-Datei, die PDF oder den Text.'],
              ['Der Leser teilt', 'Savour geht das ganze Dokument durch und macht einzelne Rezepte daraus.'],
              ['Prüfen', 'Du siehst alle Rezepte in einer Übersicht; was markiert ist, prüfst du.'],
              ['Speichern', 'Alles in einem Schritt speichern, danach in Ordner einsortieren und teilen.']
            ]
          }
        ],
        1: [
          {
            example: [
              'Was der Leser aufräumt',
              [
                '„12. Kalbsjus“ wird zum Titel **Kalbsjus**',
                '„Ofen auf 18oc“ wird **180°C**',
                'ein Rezept, das mitten auf der Seite weiterläuft, bleibt ein Rezept'
              ]
            ]
          }
        ],
        3: [{ fact: ['1.400', 'Rezepte aus Word, eingelesen in etwa zwei Minuten.'] }]
      }
    },
    es: {
      brief: [
        'Elige tu archivo de Word o PDF: el lector de Savour lo divide solo en recetas separadas.',
        'Reconoce títulos, cantidades y pasos; las dudas se marcan.',
        'Gratis hasta 100 recetas; con Pro, sin límite, y la IA también lee fotos.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Elegir el archivo', 'En «Añadir receta» eliges el archivo de Word, el PDF o el texto.'],
              ['El lector divide', 'Savour recorre todo el documento y lo convierte en recetas separadas.'],
              ['Revisar', 'Ves todas las recetas en un resumen; revisas lo que está marcado.'],
              ['Guardar', 'Lo guardas todo de una vez y después lo pones en carpetas y lo compartes.']
            ]
          }
        ],
        1: [
          {
            example: [
              'Lo que ordena el lector',
              [
                '«12. Jugo de ternera» pasa a ser el título **Jugo de ternera**',
                '«horno a 18oc» pasa a ser **180°C**',
                'una receta que sigue a mitad de página sigue siendo una receta'
              ]
            ]
          }
        ],
        3: [{ fact: ['1.400', 'recetas de Word, leídas en unos dos minutos.'] }]
      }
    },
    fr: {
      brief: [
        'Choisis ton fichier Word ou PDF : le lecteur Savour le découpe lui-même en recettes séparées.',
        'Titres, quantités et étapes sont reconnus ; le doute est signalé.',
        'Gratuit jusqu’à 100 recettes ; avec Pro, illimité, et l’IA lit aussi les photos.'
      ],
      extra: {
        0: [
          {
            steps: [
              ['Choisir le fichier', 'Dans « Ajouter une recette », tu choisis le fichier Word, le PDF ou le texte.'],
              ['Le lecteur découpe', 'Savour parcourt tout le document et en fait des recettes séparées.'],
              ['Vérifier', 'Tu vois toutes les recettes dans une vue d’ensemble ; tu vérifies ce qui est signalé.'],
              ['Enregistrer', 'Tout enregistrer en une fois, puis ranger dans des dossiers et partager.']
            ]
          }
        ],
        1: [
          {
            example: [
              'Ce que le lecteur range',
              [
                '« 12. Jus de veau » devient le titre **Jus de veau**',
                '« four à 18oc » devient **180°C**',
                'une recette qui continue au milieu de la page reste une seule recette'
              ]
            ]
          }
        ],
        3: [{ fact: ['1 400', 'recettes depuis Word, lues en environ deux minutes.'] }]
      }
    }
  },

  // ---- Opschalen zonder fouten: scherm van omrekenen, een rekenvoorbeeld en wat niet één op één meeschaalt ----
  'en/blog/scaling-recipes-without-errors': {
    nl: {
      brief: [
        'Reken met de opbrengst (liter, porties, stuks), niet met “keer vijftien” uit je hoofd.',
        'Laat het basisrecept staan; reken op het scherm om of schaal een kopie.',
        'Gelatine, agar, rijsmiddel en zout: altijd eerst een proefbatch.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/omrekenen-{lang}.jpg',
            alt: 'Beurre blanc in Savour, drie keer omgerekend',
            caption:
              'Beurre blanc in de demo, op 3×: van 250 gram naar 750 gram roomboter. Met “Origineel” staat alles weer terug.'
          }
        ],
        3: [
          {
            warn: [
              'Niet blind meeschalen',
              'Wat de structuur bepaalt, zoals gelatine, agar, rijsmiddel en zout, schaal je bij grote hoeveelheden niet zomaar één op één. Proef en test.'
            ]
          }
        ]
      },
      add: [
        [
          'Omrekenen in Savour',
          'Onder de titel van elk recept staan knoppen van ¼× tot 10×. Kies er één en alle hoeveelheden rekenen mee; het recept zelf verandert niet. Met “Origineel” ga je terug naar het basisrecept. Reken je om voor een evenement, print dan de omgerekende versie, zodat de keuken precies weet wat er die dag gemaakt wordt.',
          {
            example: [
              'Rekenvoorbeeld',
              [
                'saus voor **12 porties**, nodig: **90 porties**',
                'factor: 90 ÷ 12 = **7,5**',
                '250 gram boter × 7,5 = **1875 gram**'
              ]
            ]
          }
        ]
      ]
    },
    en: {
      brief: [
        'Calculate with the yield (litres, portions, pieces), not with “times fifteen” in your head.',
        'Leave the base recipe alone; convert on screen or scale a copy.',
        'Gelatine, agar, raising agents and salt: always make a test batch first.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/omrekenen-{lang}.jpg',
            alt: 'Beurre blanc in Savour, converted three times',
            caption:
              'Beurre blanc in the demo at 3×: from 250 grams to 750 grams of butter. “Original” puts everything back.'
          }
        ],
        3: [
          {
            warn: [
              'Do not scale blindly',
              'What sets the structure, such as gelatine, agar, raising agents and salt, does not simply scale one to one in large batches. Taste and test.'
            ]
          }
        ]
      },
      add: [
        [
          'Converting in Savour',
          'Under the title of every recipe there are buttons from ¼× to 10×. Pick one and all quantities follow; the recipe itself does not change. “Original” takes you back to the base recipe. Converting for an event? Print the converted version, so the kitchen knows exactly what is made that day.',
          {
            example: [
              'Worked example',
              [
                'sauce for **12 portions**, needed: **90 portions**',
                'factor: 90 ÷ 12 = **7.5**',
                '250 grams of butter × 7.5 = **1,875 grams**'
              ]
            ]
          }
        ]
      ]
    },
    de: {
      brief: [
        'Rechne mit der Ausbeute (Liter, Portionen, Stück), nicht mit „mal fünfzehn“ im Kopf.',
        'Lass das Grundrezept stehen; rechne auf dem Bildschirm um oder skaliere eine Kopie.',
        'Gelatine, Agar, Triebmittel und Salz: immer zuerst eine Probecharge.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/omrekenen-{lang}.jpg',
            alt: 'Beurre blanc in Savour, dreifach umgerechnet',
            caption:
              'Beurre blanc in der Demo auf 3×: von 250 Gramm auf 750 Gramm Butter. Mit „Original“ ist alles wieder zurück.'
          }
        ],
        3: [
          {
            warn: [
              'Nicht blind hochrechnen',
              'Was die Struktur bestimmt, wie Gelatine, Agar, Triebmittel und Salz, rechnest du bei großen Mengen nicht einfach eins zu eins hoch. Probieren und testen.'
            ]
          }
        ]
      },
      add: [
        [
          'Umrechnen in Savour',
          'Unter dem Titel jedes Rezepts stehen Knöpfe von ¼× bis 10×. Wähle einen, und alle Mengen rechnen mit; das Rezept selbst ändert sich nicht. Mit „Original“ kommst du zurück zum Grundrezept. Rechnest du für eine Veranstaltung um, drucke die umgerechnete Version, damit die Küche genau weiß, was an dem Tag gemacht wird.',
          {
            example: [
              'Rechenbeispiel',
              [
                'Sauce für **12 Portionen**, gebraucht: **90 Portionen**',
                'Faktor: 90 ÷ 12 = **7,5**',
                '250 Gramm Butter × 7,5 = **1875 Gramm**'
              ]
            ]
          }
        ]
      ]
    },
    es: {
      brief: [
        'Calcula con el rendimiento (litros, raciones, unidades), no con «por quince» de cabeza.',
        'Deja la receta base como está; recalcula en pantalla o escala una copia.',
        'Gelatina, agar, gasificante y sal: siempre primero una prueba.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/omrekenen-{lang}.jpg',
            alt: 'Beurre blanc en Savour, recalculado por tres',
            caption:
              'Beurre blanc en la demo a 3×: de 250 gramos a 750 gramos de mantequilla. Con «Original» todo vuelve a como estaba.'
          }
        ],
        3: [
          {
            warn: [
              'No escales a ciegas',
              'Lo que da la estructura, como gelatina, agar, gasificante y sal, no se escala sin más uno a uno en grandes cantidades. Prueba y testea.'
            ]
          }
        ]
      },
      add: [
        [
          'Recalcular en Savour',
          'Bajo el título de cada receta hay botones de ¼× a 10×. Elige uno y todas las cantidades cambian; la receta en sí no cambia. Con «Original» vuelves a la receta base. Si recalculas para un evento, imprime la versión recalculada, para que la cocina sepa exactamente qué se hace ese día.',
          {
            example: [
              'Ejemplo de cálculo',
              [
                'salsa para **12 raciones**, necesitas: **90 raciones**',
                'factor: 90 ÷ 12 = **7,5**',
                '250 gramos de mantequilla × 7,5 = **1875 gramos**'
              ]
            ]
          }
        ]
      ]
    },
    fr: {
      brief: [
        'Calcule avec le rendement (litres, portions, pièces), pas avec « fois quinze » de tête.',
        'Laisse la recette de base telle quelle ; convertis à l’écran ou adapte une copie.',
        'Gélatine, agar, levure et sel : toujours d’abord un essai.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/omrekenen-{lang}.jpg',
            alt: 'Beurre blanc dans Savour, converti par trois',
            caption:
              'Beurre blanc dans la démo à 3× : de 250 grammes à 750 grammes de beurre. « Original » remet tout comme avant.'
          }
        ],
        3: [
          {
            warn: [
              'Ne pas adapter à l’aveugle',
              'Ce qui donne la structure, comme la gélatine, l’agar, la levure et le sel, ne se multiplie pas simplement un pour un en grande quantité. Goûte et teste.'
            ]
          }
        ]
      },
      add: [
        [
          'Convertir dans Savour',
          'Sous le titre de chaque recette, il y a des boutons de ¼× à 10×. Choisis-en un et toutes les quantités suivent ; la recette elle-même ne change pas. « Original » te ramène à la recette de base. Tu convertis pour un événement ? Imprime la version convertie, pour que la cuisine sache exactement ce qui est fait ce jour-là.',
          {
            example: [
              'Exemple de calcul',
              [
                'sauce pour **12 portions**, besoin : **90 portions**',
                'facteur : 90 ÷ 12 = **7,5**',
                '250 grammes de beurre × 7,5 = **1875 grammes**'
              ]
            ]
          }
        ]
      ]
    }
  },

  // ---- Nieuwe kok inwerken: kookmodus, wat er vóór dag één klaarstaat, en een kernzin over proeven ----
  'en/blog/onboarding-new-cooks': {
    nl: {
      brief: [
        'Voeg een nieuwe kok toe aan het keukenteam als kok: lezen kan dan al thuis, gratis.',
        'In de kookmodus staat het recept groot op het scherm en vink je af wat klaar is.',
        'Een recept leert wat je doet; proeven leer je naast de sous-chef.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/kookmodus-{lang}.jpg',
            alt: 'Kookmodus in Savour met grote letters en afgevinkte ingrediënten',
            caption:
              'De kookmodus: alleen het recept, grote letters, en het scherm blijft aan. Wat klaar is, vink je af.'
          }
        ],
        2: [
          {
            check: [
              'Uitnodiging voor het keukenteam van zijn of haar partie',
              'De recepten van de eerste week in één map',
              'Afspraak wie vragen beantwoordt, en wanneer: buiten de service',
              'Uitleg van de kookmodus en het omrekenen'
            ],
            title: 'Klaar vóór de eerste dienst'
          }
        ]
      },
      add: [
        [
          'Leg vast wat je proeft',
          'De gewenste dikte van een saus, de kleur van een karamel, hoe een deeg moet aanvoelen: dat staat zelden in een recept. Zet het in de notitie bij het recept. Dan leest de volgende nieuwe kok het al vóór de eerste keer proeven.',
          { quote: 'Een recept vertelt wat je doet, niet hoe het moet smaken.' }
        ]
      ]
    },
    en: {
      brief: [
        'Add a new cook to the kitchen team as a cook: they can read at home already, for free.',
        'In cooking mode the recipe is large on the screen and you tick off what is done.',
        'A recipe teaches what to do; tasting you learn next to the sous-chef.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/kookmodus-{lang}.jpg',
            alt: 'Cooking mode in Savour with large text and ticked ingredients',
            caption: 'Cooking mode: just the recipe, large text, and the screen stays on. Tick off what is done.'
          }
        ],
        2: [
          {
            check: [
              'An invitation to the kitchen team of their section',
              'The recipes of the first week in one folder',
              'An agreement on who answers questions, and when: outside service',
              'A short explanation of cooking mode and converting'
            ],
            title: 'Ready before the first shift'
          }
        ]
      },
      add: [
        [
          'Write down what you taste',
          'How thick a sauce should be, the colour of a caramel, how a dough should feel: that is rarely in a recipe. Put it in the note with the recipe. Then the next new cook reads it before tasting for the first time.',
          { quote: 'A recipe tells you what to do, not how it should taste.' }
        ]
      ]
    },
    de: {
      brief: [
        'Füge einen neuen Koch als Koch zum Küchenteam hinzu: Lesen kann er dann schon zu Hause, kostenlos.',
        'Im Kochmodus steht das Rezept groß auf dem Bildschirm, und du hakst ab, was fertig ist.',
        'Ein Rezept lehrt, was man tut; Abschmecken lernt man neben dem Sous-Chef.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/kookmodus-{lang}.jpg',
            alt: 'Kochmodus in Savour mit großer Schrift und abgehakten Zutaten',
            caption:
              'Der Kochmodus: nur das Rezept, große Schrift, und der Bildschirm bleibt an. Was fertig ist, hakst du ab.'
          }
        ],
        2: [
          {
            check: [
              'Einladung ins Küchenteam seines Postens',
              'Die Rezepte der ersten Woche in einem Ordner',
              'Absprache, wer Fragen beantwortet, und wann: außerhalb des Service',
              'Kurze Erklärung von Kochmodus und Umrechnen'
            ],
            title: 'Bereit vor dem ersten Dienst'
          }
        ]
      },
      add: [
        [
          'Halte fest, was du abschmeckst',
          'Wie dick eine Sauce sein soll, die Farbe eines Karamells, wie sich ein Teig anfühlen muss: Das steht selten in einem Rezept. Schreib es in die Notiz zum Rezept. Dann liest der nächste neue Koch es schon vor dem ersten Probieren.',
          { quote: 'Ein Rezept sagt, was du tust, nicht wie es schmecken soll.' }
        ]
      ]
    },
    es: {
      brief: [
        'Añade a un cocinero nuevo al equipo de cocina como cocinero: así ya puede leer en casa, gratis.',
        'En el modo cocina la receta se ve grande en la pantalla y marcas lo que está hecho.',
        'Una receta enseña qué hacer; a probar se aprende al lado del segundo de cocina.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/kookmodus-{lang}.jpg',
            alt: 'Modo cocina en Savour con letra grande e ingredientes marcados',
            caption:
              'El modo cocina: solo la receta, letra grande y la pantalla siempre encendida. Lo que está hecho, lo marcas.'
          }
        ],
        2: [
          {
            check: [
              'Una invitación al equipo de cocina de su partida',
              'Las recetas de la primera semana en una carpeta',
              'Quién responde las preguntas, y cuándo: fuera del servicio',
              'Una explicación breve del modo cocina y de recalcular'
            ],
            title: 'Listo antes del primer turno'
          }
        ]
      },
      add: [
        [
          'Apunta lo que pruebas',
          'Lo espesa que debe quedar una salsa, el color de un caramelo, cómo debe sentirse una masa: eso casi nunca está en una receta. Ponlo en la nota de la receta. Así el próximo cocinero nuevo lo lee antes de probar por primera vez.',
          { quote: 'Una receta dice lo que haces, no cómo debe saber.' }
        ]
      ]
    },
    fr: {
      brief: [
        'Ajoute un nouveau cuisinier à l’équipe de cuisine comme cuisinier : il peut déjà lire chez lui, gratuitement.',
        'En mode cuisine, la recette s’affiche en grand et tu coches ce qui est fait.',
        'Une recette apprend quoi faire ; goûter s’apprend à côté du sous-chef.'
      ],
      extra: {
        1: [
          {
            shot: '/assets/app/kookmodus-{lang}.jpg',
            alt: 'Mode cuisine de Savour avec de grands caractères et des ingrédients cochés',
            caption:
              'Le mode cuisine : seulement la recette, en grands caractères, et l’écran reste allumé. Tu coches ce qui est fait.'
          }
        ],
        2: [
          {
            check: [
              'Une invitation à l’équipe de cuisine de sa partie',
              'Les recettes de la première semaine dans un dossier',
              'Qui répond aux questions, et quand : en dehors du service',
              'Une courte explication du mode cuisine et de la conversion'
            ],
            title: 'Prêt avant le premier service'
          }
        ]
      },
      add: [
        [
          'Note ce que tu goûtes',
          'L’épaisseur voulue d’une sauce, la couleur d’un caramel, la sensation d’une pâte : c’est rarement dans une recette. Mets-le dans la note de la recette. Le prochain nouveau cuisinier le lira avant même de goûter pour la première fois.',
          { quote: 'Une recette dit ce que tu fais, pas le goût que ça doit avoir.' }
        ]
      ]
    }
  },

  // ---- Delen met je team: appgroep tegenover keukenteam, en één recept delen in stappen ----
  'en/blog/sharing-recipes-with-your-team': {
    nl: {
      brief: [
        'Een keukenteam is één map voor iedereen: een aanpassing staat meteen bij het hele team.',
        'Drie rollen: eigenaar, sous-chef en kok. Jij bepaalt wie aan de recepturen komt.',
        'Eén recept doorsturen kan met een link, ook naar iemand zonder account.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Recepten in de appgroep',
                [
                  'foto’s verdwijnen tussen het rooster',
                  'niemand weet welke versie klopt',
                  'nieuwe collega’s zien niets van vroeger'
                ]
              ],
              [
                'Recepten in een keukenteam',
                ['één versie, voor iedereen', 'zoeken op titel en ingrediënt', 'nieuwe collega’s zien meteen alles']
              ]
            ]
          }
        ],
        2: [
          {
            steps: [
              ['Open het recept', 'Het recept dat je wilt delen, in je eigen bibliotheek of in een keukenteam.'],
              ['Kies Delen', 'Stuur de link via WhatsApp, Telegram of e-mail, of kopieer hem.'],
              [
                'De ontvanger opent',
                'Het recept staat netjes op een eigen pagina, zonder dat de ontvanger een account nodig heeft.'
              ]
            ]
          }
        ]
      }
    },
    en: {
      brief: [
        'A kitchen team is one folder for everyone: a change shows up for the whole team at once.',
        'Three roles: owner, sous-chef and cook. You decide who can touch the recipes.',
        'Sending one recipe works with a link, even to someone without an account.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Recipes in the group chat',
                [
                  'photos disappear between the rota',
                  'nobody knows which version is right',
                  'new colleagues see nothing from before'
                ]
              ],
              [
                'Recipes in a kitchen team',
                ['one version, for everyone', 'search by title and ingredient', 'new colleagues see everything at once']
              ]
            ]
          }
        ],
        2: [
          {
            steps: [
              ['Open the recipe', 'The recipe you want to share, in your own library or in a kitchen team.'],
              ['Choose Share', 'Send the link via WhatsApp, Telegram or email, or copy it.'],
              [
                'The recipient opens it',
                'The recipe is shown neatly on its own page, without the recipient needing an account.'
              ]
            ]
          }
        ]
      }
    },
    de: {
      brief: [
        'Ein Küchenteam ist ein Ordner für alle: Eine Änderung steht sofort beim ganzen Team.',
        'Drei Rollen: Eigentümer, Sous-Chef und Koch. Du bestimmst, wer an die Rezepturen darf.',
        'Ein einzelnes Rezept schickst du per Link, auch an jemanden ohne Konto.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Rezepte in der Chatgruppe',
                [
                  'Fotos verschwinden zwischen dem Dienstplan',
                  'niemand weiß, welche Version stimmt',
                  'neue Kollegen sehen nichts von früher'
                ]
              ],
              [
                'Rezepte in einem Küchenteam',
                ['eine Version, für alle', 'Suche nach Titel und Zutat', 'neue Kollegen sehen sofort alles']
              ]
            ]
          }
        ],
        2: [
          {
            steps: [
              [
                'Rezept öffnen',
                'Das Rezept, das du teilen willst, in deiner eigenen Bibliothek oder in einem Küchenteam.'
              ],
              ['Teilen wählen', 'Schick den Link per WhatsApp, Telegram oder E-Mail, oder kopiere ihn.'],
              [
                'Der Empfänger öffnet',
                'Das Rezept steht ordentlich auf einer eigenen Seite, ohne dass der Empfänger ein Konto braucht.'
              ]
            ]
          }
        ]
      }
    },
    es: {
      brief: [
        'Un equipo de cocina es una carpeta para todos: un cambio aparece enseguida para todo el equipo.',
        'Tres roles: propietario, segundo de cocina y cocinero. Tú decides quién toca las recetas.',
        'Una sola receta se envía con un enlace, también a alguien sin cuenta.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Recetas en el grupo de chat',
                [
                  'las fotos se pierden entre los horarios',
                  'nadie sabe qué versión es la buena',
                  'los compañeros nuevos no ven nada de antes'
                ]
              ],
              [
                'Recetas en un equipo de cocina',
                [
                  'una versión, para todos',
                  'búsqueda por título e ingrediente',
                  'los compañeros nuevos lo ven todo enseguida'
                ]
              ]
            ]
          }
        ],
        2: [
          {
            steps: [
              ['Abre la receta', 'La receta que quieres compartir, en tu biblioteca o en un equipo de cocina.'],
              ['Elige Compartir', 'Envía el enlace por WhatsApp, Telegram o correo, o cópialo.'],
              [
                'El destinatario la abre',
                'La receta aparece bien presentada en su propia página, sin que necesite una cuenta.'
              ]
            ]
          }
        ]
      }
    },
    fr: {
      brief: [
        'Une équipe de cuisine, c’est un dossier pour tous : une modification apparaît tout de suite chez toute l’équipe.',
        'Trois rôles : propriétaire, sous-chef et cuisinier. Tu décides qui touche aux recettes.',
        'Une seule recette s’envoie avec un lien, même à quelqu’un sans compte.'
      ],
      extra: {
        0: [
          {
            compare: [
              [
                'Les recettes dans le groupe de discussion',
                [
                  'les photos se perdent entre les plannings',
                  'personne ne sait quelle version est la bonne',
                  'les nouveaux ne voient rien de ce qui précède'
                ]
              ],
              [
                'Les recettes dans une équipe de cuisine',
                [
                  'une version, pour tous',
                  'recherche par titre et ingrédient',
                  'les nouveaux voient tout tout de suite'
                ]
              ]
            ]
          }
        ],
        2: [
          {
            steps: [
              ['Ouvre la recette', 'La recette à partager, dans ta bibliothèque ou dans une équipe de cuisine.'],
              ['Choisis Partager', 'Envoie le lien par WhatsApp, Telegram ou e-mail, ou copie-le.'],
              [
                'Le destinataire l’ouvre',
                'La recette s’affiche proprement sur sa propre page, sans qu’il ait besoin d’un compte.'
              ]
            ]
          }
        ]
      }
    }
  }
};
