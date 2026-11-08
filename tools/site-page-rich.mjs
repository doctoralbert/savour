// Opmaak voor Prijzen, Over ons en Binnenkort (2026-11-06), in dezelfde stijl als de functiepagina's
// (tools/site-feature-rich.mjs), maar elk met een eigen opzet:
//  - pro (Prijzen): zekerheden onder de kop, een strook met prijzen per persoon, wat Pro extra geeft;
//  - about (Over ons): kerncijfers uit het verhaal, van kladje naar recept, vragen;
//  - roadmap (Binnenkort): status per onderdeel, het allergenenscherm dat nu live staat, vragen.
// facts: [[getal, uitleg], ...] voor de donkere strook. Alleen echte cijfers en wat Savour echt doet.

const shot = (name, alt, title, text) => ({ shot: `/assets/app/${name}-{lang}.jpg`, alt, title, text });
const photo = (src, alt, title, text) => ({ shot: src, alt, title, text });

export const PAGE_RICH = {
  pro: {
    nl: {
      benefits: [
        ['Eerst proberen', '7 dagen Savour Pro gratis, zonder betaalgegevens.'],
        ['Opzeggen wanneer je wilt', 'Je houdt Pro tot het einde van de betaalde periode.'],
        ['Je recepten blijven', 'Stop je met Pro, dan blijft alles gewoon staan.']
      ],
      showcase: [
        shot(
          'print',
          'Een geprint recept met het logo van je restaurant',
          'Printen met je eigen logo',
          'Met Pro staat bovenaan elke print het logo en de naam van je restaurant. In een team print iedereen in dezelfde stijl.'
        ),
        shot(
          'brigade',
          'De brigade van een keukenteam in Savour',
          'Je eigen keukenteam',
          'Met Pro maak je zelf keukenteams en nodig je je brigade uit. Lid zijn is gratis; met een teamabonnement krijgt iedereen Pro.'
        )
      ]
    },
    en: {
      benefits: [
        ['Try first', '7 days of Savour Pro free, without payment details.'],
        ['Cancel whenever you like', 'You keep Pro until the end of the paid period.'],
        ['Your recipes stay', 'If you stop Pro, everything simply stays.']
      ],
      showcase: [
        shot(
          'print',
          'A printed recipe with your restaurant’s logo',
          'Printing with your own logo',
          'With Pro your restaurant’s logo and name are at the top of every print. In a team everyone prints in the same style.'
        ),
        shot(
          'brigade',
          'The brigade of a kitchen team in Savour',
          'Your own kitchen team',
          'With Pro you create kitchen teams and invite your brigade. Being a member is free; with a team subscription everyone gets Pro.'
        )
      ]
    },
    de: {
      benefits: [
        ['Erst ausprobieren', '7 Tage Savour Pro kostenlos, ohne Zahlungsdaten.'],
        ['Kündigen, wann du willst', 'Du behältst Pro bis zum Ende des bezahlten Zeitraums.'],
        ['Deine Rezepte bleiben', 'Beendest du Pro, bleibt alles einfach erhalten.']
      ],
      showcase: [
        shot(
          'print',
          'Ein gedrucktes Rezept mit dem Logo deines Restaurants',
          'Drucken mit deinem eigenen Logo',
          'Mit Pro stehen Logo und Name deines Restaurants oben auf jedem Ausdruck. Im Team druckt jeder im selben Stil.'
        ),
        shot(
          'brigade',
          'Die Brigade eines Küchenteams in Savour',
          'Dein eigenes Küchenteam',
          'Mit Pro erstellst du Küchenteams und lädst deine Brigade ein. Mitglied sein ist kostenlos; mit einem Teamabo bekommt jeder Pro.'
        )
      ]
    },
    es: {
      benefits: [
        ['Pruébalo antes', '7 días de Savour Pro gratis, sin datos de pago.'],
        ['Date de baja cuando quieras', 'Mantienes Pro hasta el final del periodo pagado.'],
        ['Tus recetas se quedan', 'Si dejas Pro, todo se queda como estaba.']
      ],
      showcase: [
        shot(
          'print',
          'Una receta impresa con el logotipo de tu restaurante',
          'Imprimir con tu propio logotipo',
          'Con Pro, el logotipo y el nombre de tu restaurante aparecen arriba en cada impresión. En un equipo todos imprimen con el mismo estilo.'
        ),
        shot(
          'brigade',
          'La brigada de un equipo de cocina en Savour',
          'Tu propio equipo de cocina',
          'Con Pro creas equipos de cocina e invitas a tu brigada. Ser miembro es gratis; con una suscripción de equipo todos tienen Pro.'
        )
      ]
    },
    fr: {
      benefits: [
        ['Essayer d’abord', '7 jours de Savour Pro gratuits, sans données de paiement.'],
        ['Résilier quand tu veux', 'Tu gardes Pro jusqu’à la fin de la période payée.'],
        ['Tes recettes restent', 'Si tu arrêtes Pro, tout reste en place.']
      ],
      showcase: [
        shot(
          'print',
          'Une recette imprimée avec le logo de ton restaurant',
          'Imprimer avec ton propre logo',
          'Avec Pro, le logo et le nom de ton restaurant figurent en haut de chaque impression. Dans une équipe, chacun imprime dans le même style.'
        ),
        shot(
          'brigade',
          'La brigade d’une équipe de cuisine dans Savour',
          'Ta propre équipe de cuisine',
          'Avec Pro, tu crées des équipes de cuisine et invites ta brigade. Être membre est gratuit ; avec un abonnement d’équipe, tout le monde a Pro.'
        )
      ]
    }
  },

  about: {
    nl: {
      facts: [
        ['15', 'jaar in de keuken, voordat Savour er was'],
        ['1.400', 'recepten uit Word in ongeveer twee minuten'],
        ['5', 'talen: Nederlands, Engels, Duits, Spaans en Frans']
      ],
      showcase: [
        photo(
          '/assets/kladjes/marshmallow-kladje.jpg',
          'Het handgeschreven kladje van een marshmallow',
          'Waar het begon',
          'Een kladje met vlekken, doorhalingen en hoeveelheden die alleen de schrijver kon lezen. Zo zagen de meeste recepten eruit.'
        ),
        shot(
          'recept',
          'Hetzelfde soort recept in Savour op de telefoon',
          'Waar het nu staat',
          'Hetzelfde soort recept in Savour: leesbaar voor de hele brigade, op elke telefoon, en precies zoals het bedoeld was.'
        )
      ],
      faq: [
        [
          'Wie maakt Savour?',
          'Een chef met vijftien jaar keukenervaring, niet een softwarebedrijf. Elke functie wordt eerst getest in een echte keuken.'
        ],
        [
          'Hoe kan ik meedenken?',
          'Mail naar contact@savour.page. Vertel vooral welk probleem je wilt oplossen; we lezen alles.'
        ],
        [
          'Wat gebeurt er met mijn recepten?',
          'Ze zijn alleen zichtbaar voor jou en wie jij uitnodigt, en ze blijven van jou, ook als je stopt met Pro.'
        ]
      ]
    },
    en: {
      facts: [
        ['15', 'years in the kitchen before Savour existed'],
        ['1,400', 'recipes from Word in about two minutes'],
        ['5', 'languages: Dutch, English, German, Spanish and French']
      ],
      showcase: [
        photo(
          '/assets/kladjes/marshmallow-kladje.jpg',
          'The handwritten note of a marshmallow',
          'Where it started',
          'A note with stains, crossings-out and quantities only the writer could read. That is what most recipes looked like.'
        ),
        shot(
          'recept',
          'The same kind of recipe in Savour on the phone',
          'Where it is now',
          'The same kind of recipe in Savour: readable for the whole brigade, on every phone, and exactly as it was meant.'
        )
      ],
      faq: [
        [
          'Who makes Savour?',
          'A chef with fifteen years of kitchen experience, not a software company. Every feature is tested in a real kitchen first.'
        ],
        [
          'How can I share ideas?',
          'Email contact@savour.page. Tell us above all which problem you want to solve; we read everything.'
        ],
        [
          'What happens to my recipes?',
          'Only you and the people you invite can see them, and they stay yours, even if you stop Pro.'
        ]
      ]
    },
    de: {
      facts: [
        ['15', 'Jahre in der Küche, bevor es Savour gab'],
        ['1.400', 'Rezepte aus Word in etwa zwei Minuten'],
        ['5', 'Sprachen: Niederländisch, Englisch, Deutsch, Spanisch und Französisch']
      ],
      showcase: [
        photo(
          '/assets/kladjes/marshmallow-kladje.jpg',
          'Die handgeschriebene Notiz eines Marshmallows',
          'Wo es anfing',
          'Eine Notiz mit Flecken, Durchgestrichenem und Mengen, die nur der Schreiber lesen konnte. So sahen die meisten Rezepte aus.'
        ),
        shot(
          'recept',
          'Dieselbe Art Rezept in Savour auf dem Handy',
          'Wo es jetzt steht',
          'Dieselbe Art Rezept in Savour: lesbar für die ganze Brigade, auf jedem Handy, und genau so, wie es gemeint war.'
        )
      ],
      faq: [
        [
          'Wer macht Savour?',
          'Ein Koch mit fünfzehn Jahren Küchenerfahrung, kein Softwareunternehmen. Jede Funktion wird zuerst in einer echten Küche getestet.'
        ],
        [
          'Wie kann ich mitdenken?',
          'Schreib an contact@savour.page. Sag uns vor allem, welches Problem du lösen willst; wir lesen alles.'
        ],
        [
          'Was passiert mit meinen Rezepten?',
          'Nur du und wen du einlädst, sehen sie, und sie bleiben deine, auch wenn du Pro beendest.'
        ]
      ]
    },
    es: {
      facts: [
        ['15', 'años en la cocina antes de que existiera Savour'],
        ['1.400', 'recetas de Word en unos dos minutos'],
        ['5', 'idiomas: neerlandés, inglés, alemán, español y francés']
      ],
      showcase: [
        photo(
          '/assets/kladjes/marshmallow-kladje.jpg',
          'La nota manuscrita de un malvavisco',
          'Donde empezó',
          'Una nota con manchas, tachones y cantidades que solo podía leer quien la escribió. Así eran la mayoría de las recetas.'
        ),
        shot(
          'recept',
          'El mismo tipo de receta en Savour en el móvil',
          'Donde está ahora',
          'El mismo tipo de receta en Savour: legible para toda la brigada, en cualquier móvil, y tal como se pensó.'
        )
      ],
      faq: [
        [
          '¿Quién hace Savour?',
          'Un chef con quince años de experiencia en cocina, no una empresa de software. Cada función se prueba primero en una cocina de verdad.'
        ],
        [
          '¿Cómo puedo aportar ideas?',
          'Escribe a contact@savour.page. Cuéntanos sobre todo qué problema quieres resolver; lo leemos todo.'
        ],
        ['¿Qué pasa con mis recetas?', 'Solo las ves tú y quien invites, y siguen siendo tuyas, aunque dejes Pro.']
      ]
    },
    fr: {
      facts: [
        ['15', 'ans en cuisine avant que Savour n’existe'],
        ['1 400', 'recettes depuis Word en environ deux minutes'],
        ['5', 'langues : néerlandais, anglais, allemand, espagnol et français']
      ],
      showcase: [
        photo(
          '/assets/kladjes/marshmallow-kladje.jpg',
          'La note manuscrite d’une guimauve',
          'Là où tout a commencé',
          'Une note avec des taches, des ratures et des quantités que seul l’auteur pouvait lire. Voilà à quoi ressemblaient la plupart des recettes.'
        ),
        shot(
          'recept',
          'Le même genre de recette dans Savour sur le téléphone',
          'Là où elle est maintenant',
          'Le même genre de recette dans Savour : lisible pour toute la brigade, sur chaque téléphone, et exactement comme elle était pensée.'
        )
      ],
      faq: [
        [
          'Qui fait Savour ?',
          'Un chef avec quinze ans d’expérience en cuisine, pas une entreprise de logiciels. Chaque fonction est d’abord testée dans une vraie cuisine.'
        ],
        [
          'Comment proposer une idée ?',
          'Écris à contact@savour.page. Dis-nous surtout quel problème tu veux résoudre ; nous lisons tout.'
        ],
        [
          'Que deviennent mes recettes ?',
          'Seuls toi et ceux que tu invites les voient, et elles restent à toi, même si tu arrêtes Pro.'
        ]
      ]
    }
  },

  roadmap: {
    nl: {
      benefits: [
        ['Nu live', 'Allergenen per recept, ook via basisrecepten.'],
        ['Gepland', 'Kostprijs per recept en de geschiedenis van elk recept.'],
        ['Misschien', 'Een eigen app voor iPhone en Android, als chefs dat willen.']
      ],
      showcase: [
        {
          ...shot(
            'allergenen',
            'Het allergenenblok bij een recept in Savour',
            'Allergenen staan live',
            'Melk uit de roomboter, sulfiet uit de wijn, en een duidelijke melding als nog niet alles gecontroleerd is. [Lees hoe het werkt](@post:en/blog/allergens-in-savour).'
          )
        }
      ],
      faq: [
        [
          'Wanneer komen deze functies?',
          'Er staan bewust geen datums bij. Een functie komt live als hij goed genoeg is voor de drukte van een service.'
        ],
        [
          'Kost het extra?',
          'Allergenen zijn onderdeel van Savour Pro. Over de andere functies beslissen we als ze klaar zijn.'
        ],
        [
          'Kan ik meedenken?',
          'Graag. Mail naar contact@savour.page en vertel welk probleem je in de keuken wilt oplossen.'
        ]
      ]
    },
    en: {
      benefits: [
        ['Live now', 'Allergens per recipe, including through base recipes.'],
        ['Planned', 'Cost per recipe and the history of every recipe.'],
        ['Maybe', 'An app of our own for iPhone and Android, if chefs want it.']
      ],
      showcase: [
        shot(
          'allergenen',
          'The allergen block on a recipe in Savour',
          'Allergens are live',
          'Milk from the butter, sulphites from the wine, and a clear note when not everything is checked yet. [Read how it works](@post:en/blog/allergens-in-savour).'
        )
      ],
      faq: [
        [
          'When are these features coming?',
          'There are deliberately no dates. A feature goes live when it is good enough for the rush of a service.'
        ],
        [
          'Will it cost extra?',
          'Allergens are part of Savour Pro. We decide about the other features when they are ready.'
        ],
        [
          'Can I share ideas?',
          'Please do. Email contact@savour.page and tell us which problem you want to solve in the kitchen.'
        ]
      ]
    },
    de: {
      benefits: [
        ['Jetzt live', 'Allergene pro Rezept, auch über Grundrezepte.'],
        ['Geplant', 'Kosten pro Rezept und die Geschichte jedes Rezepts.'],
        ['Vielleicht', 'Eine eigene App für iPhone und Android, wenn Köche das wollen.']
      ],
      showcase: [
        shot(
          'allergenen',
          'Der Allergenblock bei einem Rezept in Savour',
          'Allergene sind live',
          'Milch aus der Butter, Sulfite aus dem Wein und ein klarer Hinweis, wenn noch nicht alles geprüft ist. [Lies, wie es funktioniert](@post:en/blog/allergens-in-savour).'
        )
      ],
      faq: [
        [
          'Wann kommen diese Funktionen?',
          'Es gibt bewusst keine Termine. Eine Funktion geht live, wenn sie gut genug für den Stress eines Service ist.'
        ],
        [
          'Kostet es extra?',
          'Allergene sind Teil von Savour Pro. Über die anderen Funktionen entscheiden wir, wenn sie fertig sind.'
        ],
        [
          'Kann ich mitdenken?',
          'Gern. Schreib an contact@savour.page und sag uns, welches Problem du in der Küche lösen willst.'
        ]
      ]
    },
    es: {
      benefits: [
        ['Ya disponible', 'Alérgenos por receta, también a través de recetas base.'],
        ['Previsto', 'Coste por receta y el historial de cada receta.'],
        ['Quizá', 'Una app propia para iPhone y Android, si los chefs la quieren.']
      ],
      showcase: [
        shot(
          'allergenen',
          'El bloque de alérgenos en una receta de Savour',
          'Los alérgenos ya están disponibles',
          'Leche de la mantequilla, sulfitos del vino y un aviso claro cuando aún no está todo comprobado. [Lee cómo funciona](@post:en/blog/allergens-in-savour).'
        )
      ],
      faq: [
        [
          '¿Cuándo llegan estas funciones?',
          'No ponemos fechas a propósito. Una función sale cuando está a la altura del ritmo de un servicio.'
        ],
        [
          '¿Costará más?',
          'Los alérgenos forman parte de Savour Pro. Sobre las demás funciones decidimos cuando estén listas.'
        ],
        [
          '¿Puedo aportar ideas?',
          'Claro. Escribe a contact@savour.page y cuéntanos qué problema quieres resolver en la cocina.'
        ]
      ]
    },
    fr: {
      benefits: [
        ['Disponible', 'Les allergènes par recette, y compris via les recettes de base.'],
        ['Prévu', 'Le coût par recette et l’historique de chaque recette.'],
        ['Peut-être', 'Une application à nous pour iPhone et Android, si les chefs le veulent.']
      ],
      showcase: [
        shot(
          'allergenen',
          'Le bloc allergènes d’une recette dans Savour',
          'Les allergènes sont disponibles',
          'Le lait du beurre, les sulfites du vin, et un avertissement clair quand tout n’est pas encore vérifié. [Lis comment ça marche](@post:en/blog/allergens-in-savour).'
        )
      ],
      faq: [
        [
          'Quand ces fonctions arrivent-elles ?',
          'Il n’y a volontairement pas de dates. Une fonction sort quand elle tient le rythme d’un service.'
        ],
        [
          'Est-ce que ça coûtera plus ?',
          'Les allergènes feront partie de Savour Pro. Pour les autres fonctions, nous déciderons quand elles seront prêtes.'
        ],
        [
          'Puis-je proposer des idées ?',
          'Avec plaisir. Écris à contact@savour.page et dis-nous quel problème tu veux résoudre en cuisine.'
        ]
      ]
    }
  }
};
