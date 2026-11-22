// Functiepagina "MEP-lijsten" (live sinds 2026-11-17), in vijf talen. tools/build-seo.mjs zet hem tussen de functies,
// na "Allergenen per recept". Alles wat hier staat, klopt met js/features/mep.js, mep-import.js en
// supabase/2026-11-17-mep-alleen-pro.sql: maken en beheren met Pro, afvinken voor iedereen in het keukenteam.
// MEP_FEATURE[lang]: de pagina; MEP_FEATURE_RICH[lang]: voordelen, schermen uit de app en vragen.
// Beelden: assets/app/[licht/]mep-lijst-<taal>.jpg (telefoon) en mep-bureau-<taal>.jpg (laptop), uit de demo.

const shot = (name, alt, title, text) => ({ shot: `/assets/app/${name}-{lang}.jpg`, alt, title, text });

export const MEP_FEATURE = {
  nl: {
    slug: 'mep-lijsten',
    menu: 'MEP-lijsten',
    short: 'Per post wat er klaar moet staan, afvinken met je brigade en uitrekenen op couverts.',
    title: 'MEP-lijst digitaal: mise-en-place per post, met couverts | Savour',
    desc: 'Maak je MEP-lijst in Savour: per post de kaarten, gerechten en onderdelen. Vul de couverts in en Savour rekent de hoeveelheden uit. Je brigade vinkt live af, ook offline. Print op één A4.',
    h1: 'MEP-lijsten voor je brigade',
    lead: 'Wat moet er vandaag klaarstaan op de garde, de patisserie of de warme kant? Eén lijst per post, die iedereen afvinkt en die zelf de hoeveelheden uitrekent.',
    sections: [
      [
        'Opgebouwd zoals je keuken werkt',
        'Een MEP-lijst hoort bij een post. Daarin zet je de kaarten (bijvoorbeeld à la carte en banqueting), per kaart de gerechten of kopjes, en daaronder de onderdelen met hun hoeveelheid per couvert. Je kunt onderdelen koppelen aan een recept uit Savour, zodat je met één tik het recept open hebt.'
      ],
      [
        'Couverts invullen, Savour rekent',
        'Vul per kaart het aantal couverts in. Savour rekent bij elk onderdeel uit hoeveel je nodig hebt: 40 couverts gravlax van 60 gram is 2,4 kilo. Gram wordt kilo en milliliter wordt liter zodra dat leesbaarder is.'
      ],
      [
        'Samen afvinken, live',
        'In een keukenteam vinkt iedereen af wat klaarstaat. Je collega’s zien het binnen een paar seconden op hun eigen telefoon, met wie het afvinkte en hoe laat. Valt de wifi weg in de koelcel, dan onthoudt Savour het en stuurt het zodra je weer verbinding hebt. Na de service maak je de lijst met één keuze weer leeg.'
      ],
      [
        'Groot en rustig in de keuken',
        'In de kookmodus staat de lijst met grote letters op je scherm en blijft het scherm aan. Met "Alleen wat nog moet" zie je alleen wat nog niet is afgevinkt.'
      ],
      [
        'Je eigen lijst overzetten',
        'Staat je MEP-lijst al in Excel of Word, of hangt hij op papier aan de muur? Savour leest hem in en deelt hem in: kaarten, kopjes en onderdelen. Een foto leest de AI, met Savour Pro. Je kijkt alles na voordat er iets wordt opgeslagen, en twijfel staat geel gemarkeerd.'
      ],
      [
        'Printen op één A4',
        'Liever op papier aan de pas? Savour print de hele lijst op één A4, staand of liggend, met hokjes om af te vinken.'
      ]
    ]
  },
  en: {
    slug: 'en/prep-lists',
    menu: 'Prep lists',
    short: 'What has to be ready per section, ticked off with your brigade and calculated from covers.',
    title: 'Digital prep list (mise en place) per section, with covers | Savour',
    desc: 'Make your prep list in Savour: per section the menus, dishes and items. Enter the covers and Savour works out the quantities. Your brigade ticks off live, offline too. Print on one A4.',
    h1: 'Prep lists for your brigade',
    lead: 'What has to be ready today on garde manger, pastry or the hot side? One list per section, ticked off by everyone, that works out the quantities itself.',
    sections: [
      [
        'Built the way your kitchen works',
        'A prep list belongs to a section. In it you put the menus (for example à la carte and banqueting), per menu the dishes or headings, and below them the items with their quantity per cover. You can link items to a recipe in Savour, so the recipe is one tap away.'
      ],
      [
        'Enter the covers, Savour does the maths',
        'Enter the number of covers per menu. Savour works out how much you need of every item: 40 covers of 60 grams of gravlax is 2.4 kilos. Grams become kilos and millilitres become litres as soon as that reads better.'
      ],
      [
        'Tick off together, live',
        'In a kitchen team everyone ticks off what is ready. Your colleagues see it within a few seconds on their own phone, with who ticked it and when. If the wifi drops out in the walk-in, Savour remembers and sends it as soon as you are back online. After service you clear the list with one choice.'
      ],
      [
        'Large and calm in the kitchen',
        'In cook mode the list is on your screen in large text and the screen stays on. With "Only what’s still to do" you only see what has not been ticked off yet.'
      ],
      [
        'Bring your own list',
        'Is your prep list already in Excel or Word, or pinned to the wall on paper? Savour reads it and sorts it into menus, headings and items. A photo is read by the AI, with Savour Pro. You check everything before anything is saved, and doubts are marked in yellow.'
      ],
      [
        'Print on one A4',
        'Prefer paper at the pass? Savour prints the whole list on one A4, portrait or landscape, with boxes to tick.'
      ]
    ]
  },
  de: {
    slug: 'de/mep-listen',
    menu: 'MEP-Listen',
    short: 'Was je Posten bereitstehen muss, gemeinsam abhaken und aus den Gedecken berechnen.',
    title: 'Digitale MEP-Liste (Mise en place) pro Posten, mit Gedecken | Savour',
    desc: 'Erstelle deine MEP-Liste in Savour: pro Posten die Karten, Gerichte und Posten. Trag die Gedecke ein und Savour rechnet die Mengen aus. Deine Brigade hakt live ab, auch offline. Druck auf einer A4-Seite.',
    h1: 'MEP-Listen für deine Brigade',
    lead: 'Was muss heute am Garde-Manger, in der Patisserie oder auf der warmen Seite bereitstehen? Eine Liste pro Posten, die alle abhaken und die die Mengen selbst ausrechnet.',
    sections: [
      [
        'Aufgebaut wie deine Küche arbeitet',
        'Eine MEP-Liste gehört zu einem Posten. Darin legst du die Karten an (zum Beispiel à la carte und Bankett), pro Karte die Gerichte oder Überschriften und darunter die Posten mit ihrer Menge pro Gedeck. Posten kannst du mit einem Rezept in Savour verknüpfen, dann ist das Rezept nur einen Tipp entfernt.'
      ],
      [
        'Gedecke eintragen, Savour rechnet',
        'Trag pro Karte die Zahl der Gedecke ein. Savour rechnet bei jedem Posten aus, wie viel du brauchst: 40 Gedecke Gravlax zu 60 Gramm sind 2,4 Kilo. Gramm werden zu Kilo und Milliliter zu Liter, sobald das besser lesbar ist.'
      ],
      [
        'Gemeinsam abhaken, live',
        'In einem Küchenteam hakt jeder ab, was bereitsteht. Deine Kollegen sehen es nach wenigen Sekunden auf dem eigenen Handy, mit Name und Uhrzeit. Fällt im Kühlhaus das WLAN aus, merkt sich Savour das und schickt es, sobald du wieder online bist. Nach dem Service leerst du die Liste mit einer Auswahl.'
      ],
      [
        'Groß und ruhig in der Küche',
        'Im Kochmodus steht die Liste in großer Schrift auf dem Bildschirm, und der Bildschirm bleibt an. Mit „Nur was noch zu tun ist“ siehst du nur, was noch nicht abgehakt ist.'
      ],
      [
        'Deine eigene Liste übernehmen',
        'Steht deine MEP-Liste schon in Excel oder Word, oder hängt sie auf Papier an der Wand? Savour liest sie ein und teilt sie in Karten, Überschriften und Posten. Ein Foto liest die KI, mit Savour Pro. Du prüfst alles, bevor etwas gespeichert wird, und Zweifel sind gelb markiert.'
      ],
      [
        'Auf einer A4-Seite drucken',
        'Lieber auf Papier am Pass? Savour druckt die ganze Liste auf eine A4-Seite, hoch oder quer, mit Kästchen zum Abhaken.'
      ]
    ]
  },
  es: {
    slug: 'es/listas-mep',
    menu: 'Listas MEP',
    short: 'Lo que debe estar listo en cada partida, marcado con tu brigada y calculado según cubiertos.',
    title: 'Lista MEP digital (mise en place) por partida, con cubiertos | Savour',
    desc: 'Crea tu lista MEP en Savour: por partida las cartas, platos y elementos. Indica los cubiertos y Savour calcula las cantidades. Tu brigada marca en directo, también sin conexión. Imprime en un A4.',
    h1: 'Listas MEP para tu brigada',
    lead: '¿Qué tiene que estar listo hoy en el cuarto frío, la pastelería o la parte caliente? Una lista por partida, que todos marcan y que calcula las cantidades sola.',
    sections: [
      [
        'Organizada como trabaja tu cocina',
        'Una lista MEP pertenece a una partida. En ella pones las cartas (por ejemplo à la carte y banquetes), por carta los platos o encabezados, y debajo los elementos con su cantidad por cubierto. Puedes vincular elementos a una receta de Savour, así la receta está a un toque.'
      ],
      [
        'Indica los cubiertos, Savour calcula',
        'Indica el número de cubiertos por carta. Savour calcula cuánto necesitas de cada elemento: 40 cubiertos de gravlax de 60 gramos son 2,4 kilos. Los gramos pasan a kilos y los mililitros a litros en cuanto se lee mejor.'
      ],
      [
        'Marcar juntos, en directo',
        'En un equipo de cocina todos marcan lo que ya está listo. Tus compañeros lo ven en pocos segundos en su propio móvil, con quién lo marcó y a qué hora. Si se cae el wifi en la cámara, Savour lo recuerda y lo envía en cuanto vuelves a tener conexión. Después del servicio vacías la lista con una sola opción.'
      ],
      [
        'Grande y tranquila en la cocina',
        'En el modo cocina la lista aparece con letra grande y la pantalla se mantiene encendida. Con «Solo lo que falta» ves solo lo que aún no está marcado.'
      ],
      [
        'Trae tu propia lista',
        '¿Tu lista MEP ya está en Excel o Word, o colgada en papel en la pared? Savour la lee y la ordena en cartas, encabezados y elementos. Una foto la lee la IA, con Savour Pro. Revisas todo antes de guardar nada, y las dudas aparecen en amarillo.'
      ],
      [
        'Imprimir en un A4',
        '¿Prefieres papel en el pase? Savour imprime toda la lista en un A4, vertical u horizontal, con casillas para marcar.'
      ]
    ]
  },
  fr: {
    slug: 'fr/listes-mep',
    menu: 'Listes MEP',
    short: 'Ce qui doit être prêt à chaque poste, coché avec ta brigade et calculé selon les couverts.',
    title: 'Liste MEP numérique (mise en place) par poste, avec couverts | Savour',
    desc: 'Crée ta liste MEP dans Savour : par poste les cartes, plats et éléments. Indique les couverts et Savour calcule les quantités. Ta brigade coche en direct, même hors ligne. Impression sur un A4.',
    h1: 'Listes MEP pour ta brigade',
    lead: 'Que faut-il préparer aujourd’hui au garde-manger, à la pâtisserie ou au chaud ? Une liste par poste, que tout le monde coche et qui calcule elle-même les quantités.',
    sections: [
      [
        'Construite comme ta cuisine travaille',
        'Une liste MEP appartient à un poste. Tu y mets les cartes (par exemple à la carte et banquet), par carte les plats ou intitulés, et en dessous les éléments avec leur quantité par couvert. Tu peux relier un élément à une recette de Savour : la recette est alors à un geste.'
      ],
      [
        'Indique les couverts, Savour calcule',
        'Indique le nombre de couverts par carte. Savour calcule combien il te faut de chaque élément : 40 couverts de gravlax à 60 grammes font 2,4 kilos. Les grammes deviennent des kilos et les millilitres des litres dès que c’est plus lisible.'
      ],
      [
        'Cocher ensemble, en direct',
        'Dans une équipe de cuisine, chacun coche ce qui est prêt. Tes collègues le voient en quelques secondes sur leur téléphone, avec qui l’a coché et à quelle heure. Si le wifi coupe en chambre froide, Savour s’en souvient et l’envoie dès que tu es reconnecté. Après le service, tu vides la liste en un choix.'
      ],
      [
        'Grande et calme en cuisine',
        'En mode cuisine, la liste s’affiche en grands caractères et l’écran reste allumé. Avec « Seulement ce qui reste à faire », tu ne vois que ce qui n’est pas encore coché.'
      ],
      [
        'Reprendre ta propre liste',
        'Ta liste MEP est déjà dans Excel ou Word, ou affichée sur papier au mur ? Savour la lit et la range en cartes, intitulés et éléments. Une photo est lue par l’IA, avec Savour Pro. Tu vérifies tout avant que rien ne soit enregistré, et les doutes sont surlignés en jaune.'
      ],
      [
        'Imprimer sur un A4',
        'Tu préfères le papier au passe ? Savour imprime toute la liste sur un A4, en portrait ou en paysage, avec des cases à cocher.'
      ]
    ]
  }
};

export const MEP_FEATURE_RICH = {
  nl: {
    benefits: [
      ['Per post', 'Kaarten, gerechten en onderdelen, zoals op je eigen lijst.'],
      ['Rekent zelf', 'Vul de couverts in; Savour rekent de hoeveelheden uit.'],
      ['Live afvinken', 'Je brigade ziet binnen seconden wat klaarstaat, ook na offline.']
    ],
    showcase: [
      shot(
        'mep-lijst',
        'Een MEP-lijst in Savour op de telefoon, met couverts en afgevinkte onderdelen',
        'Op de telefoon in de keuken',
        'Grote hokjes, de hoeveelheid voor vandaag in goud en wie wat afvinkte. [Probeer het in de demo](@demo).'
      ),
      shot(
        'mep-bureau',
        'Een MEP-lijst in Savour op de laptop, met à la carte en banqueting naast elkaar',
        'Alle kaarten naast elkaar',
        'À la carte en banqueting naast elkaar, elk met zijn eigen couverts. Bewerken, printen en de kookmodus staan bovenin.'
      )
    ],
    faq: [
      [
        'Kost het extra?',
        'MEP-lijsten maken en beheren hoort bij Savour Pro. Afvinken in een keukenteam kan iedereen, ook met een gratis account. Nieuwe accounts krijgen 7 dagen Pro gratis.'
      ],
      [
        'Kan ik mijn Excel-lijst gebruiken?',
        'Ja. Savour leest Excel (.xlsx en .csv), Word en tekst, en met Pro ook een foto. Je kijkt alles na voordat het wordt opgeslagen.'
      ],
      [
        'Werkt het zonder internet?',
        'Afvinken wel: Savour onthoudt het en stuurt het zodra je weer verbinding hebt. Je collega’s zien het dan meteen.'
      ],
      ["Wordt de MEP-lezer beter?", "Ja, als \"Help de Savour-lezer verbeteren\" aan staat (Instellingen): wat je in het controlescherm verbetert, helpt ons de MEP-lezer beter te maken. We kijken alles na; de lezer verandert nooit vanzelf."]
    ]
  },
  en: {
    benefits: [
      ['Per section', 'Menus, dishes and items, just like your own list.'],
      ['Does the maths', 'Enter the covers; Savour works out the quantities.'],
      ['Tick off live', 'Your brigade sees what is ready within seconds, even after offline.']
    ],
    showcase: [
      shot(
        'mep-lijst',
        'A prep list in Savour on a phone, with covers and ticked-off items',
        'On the phone in the kitchen',
        'Large boxes, today’s quantity in gold and who ticked off what. [Try it in the demo](@demo).'
      ),
      shot(
        'mep-bureau',
        'A prep list in Savour on a laptop, with à la carte and banqueting side by side',
        'Every menu side by side',
        'À la carte and banqueting side by side, each with its own covers. Edit, print and cook mode are at the top.'
      )
    ],
    faq: [
      [
        'Does it cost extra?',
        'Creating and managing prep lists is part of Savour Pro. Anyone in a kitchen team can tick off, even with a free account. New accounts get 7 days of Pro for free.'
      ],
      [
        'Can I use my Excel list?',
        'Yes. Savour reads Excel (.xlsx and .csv), Word and text, and with Pro a photo too. You check everything before it is saved.'
      ],
      [
        'Does it work without internet?',
        'Ticking off does: Savour remembers it and sends it as soon as you are back online. Your colleagues then see it straight away.'
      ],
      ["Does the prep list reader get better?", "Yes, when \"Help improve the Savour reader\" is on (Settings): what you correct in the review screen helps us improve the prep list reader. We check everything; the reader never changes by itself."]
    ]
  },
  de: {
    benefits: [
      ['Pro Posten', 'Karten, Gerichte und Posten, wie auf deiner eigenen Liste.'],
      ['Rechnet selbst', 'Trag die Gedecke ein; Savour rechnet die Mengen aus.'],
      ['Live abhaken', 'Deine Brigade sieht in Sekunden, was bereitsteht, auch nach offline.']
    ],
    showcase: [
      shot(
        'mep-lijst',
        'Eine MEP-Liste in Savour auf dem Handy, mit Gedecken und abgehakten Posten',
        'Auf dem Handy in der Küche',
        'Große Kästchen, die Menge für heute in Gold und wer was abgehakt hat. [Probier es in der Demo](@demo).'
      ),
      shot(
        'mep-bureau',
        'Eine MEP-Liste in Savour auf dem Laptop, mit à la carte und Bankett nebeneinander',
        'Alle Karten nebeneinander',
        'À la carte und Bankett nebeneinander, jede mit eigenen Gedecken. Bearbeiten, Drucken und Kochmodus stehen oben.'
      )
    ],
    faq: [
      [
        'Kostet es extra?',
        'MEP-Listen erstellen und verwalten gehört zu Savour Pro. Abhaken kann jeder im Küchenteam, auch mit einem kostenlosen Konto. Neue Konten bekommen 7 Tage Pro gratis.'
      ],
      [
        'Kann ich meine Excel-Liste verwenden?',
        'Ja. Savour liest Excel (.xlsx und .csv), Word und Text, mit Pro auch ein Foto. Du prüfst alles, bevor es gespeichert wird.'
      ],
      [
        'Funktioniert es ohne Internet?',
        'Abhaken schon: Savour merkt es sich und schickt es, sobald du wieder online bist. Deine Kollegen sehen es dann sofort.'
      ],
      ["Wird der MEP-Leser besser?", "Ja, wenn „Hilf, den Savour-Leser zu verbessern“ an ist (Einstellungen): Was du im Prüfbildschirm verbesserst, hilft uns, den MEP-Leser besser zu machen. Wir prüfen alles; der Leser ändert sich nie von selbst."]
    ]
  },
  es: {
    benefits: [
      ['Por partida', 'Cartas, platos y elementos, como en tu propia lista.'],
      ['Calcula sola', 'Indica los cubiertos; Savour calcula las cantidades.'],
      ['Marcar en directo', 'Tu brigada ve en segundos lo que está listo, también tras estar sin conexión.']
    ],
    showcase: [
      shot(
        'mep-lijst',
        'Una lista MEP en Savour en el móvil, con cubiertos y elementos marcados',
        'En el móvil en la cocina',
        'Casillas grandes, la cantidad de hoy en dorado y quién marcó qué. [Pruébalo en la demo](@demo).'
      ),
      shot(
        'mep-bureau',
        'Una lista MEP en Savour en el portátil, con à la carte y banquetes uno al lado del otro',
        'Todas las cartas a la vista',
        'À la carte y banquetes uno al lado del otro, cada uno con sus cubiertos. Editar, imprimir y el modo cocina están arriba.'
      )
    ],
    faq: [
      [
        '¿Cuesta extra?',
        'Crear y gestionar listas MEP forma parte de Savour Pro. Marcar lo puede hacer cualquiera del equipo de cocina, también con una cuenta gratuita. Las cuentas nuevas tienen 7 días de Pro gratis.'
      ],
      [
        '¿Puedo usar mi lista de Excel?',
        'Sí. Savour lee Excel (.xlsx y .csv), Word y texto, y con Pro también una foto. Revisas todo antes de guardarlo.'
      ],
      [
        '¿Funciona sin internet?',
        'Marcar sí: Savour lo recuerda y lo envía en cuanto vuelves a tener conexión. Tus compañeros lo ven enseguida.'
      ],
      ["¿Mejora el lector de listas MEP?", "Sí, si «Ayuda a mejorar el lector de Savour» está activado (Ajustes): lo que corriges en la pantalla de revisión nos ayuda a mejorar el lector MEP. Lo revisamos todo; el lector nunca cambia por sí solo."]
    ]
  },
  fr: {
    benefits: [
      ['Par poste', 'Cartes, plats et éléments, comme sur ta propre liste.'],
      ['Calcule seule', 'Indique les couverts ; Savour calcule les quantités.'],
      ['Cocher en direct', 'Ta brigade voit en quelques secondes ce qui est prêt, même après une coupure.']
    ],
    showcase: [
      shot(
        'mep-lijst',
        'Une liste MEP dans Savour sur un téléphone, avec couverts et éléments cochés',
        'Sur le téléphone en cuisine',
        'De grandes cases, la quantité du jour en doré et qui a coché quoi. [Essaie-le dans la démo](@demo).'
      ),
      shot(
        'mep-bureau',
        'Une liste MEP dans Savour sur un ordinateur, avec à la carte et banquet côte à côte',
        'Toutes les cartes côte à côte',
        'À la carte et banquet côte à côte, chacune avec ses couverts. Modifier, imprimer et le mode cuisine sont en haut.'
      )
    ],
    faq: [
      [
        'Est-ce payant en plus ?',
        'Créer et gérer des listes MEP fait partie de Savour Pro. Tout le monde dans l’équipe de cuisine peut cocher, même avec un compte gratuit. Les nouveaux comptes ont 7 jours de Pro offerts.'
      ],
      [
        'Puis-je utiliser ma liste Excel ?',
        'Oui. Savour lit Excel (.xlsx et .csv), Word et le texte, et avec Pro aussi une photo. Tu vérifies tout avant l’enregistrement.'
      ],
      [
        'Ça marche sans internet ?',
        'Cocher, oui : Savour s’en souvient et l’envoie dès que tu es reconnecté. Tes collègues le voient aussitôt.'
      ],
      ["Le lecteur de listes MEP s’améliore-t-il ?", "Oui, si « Aide à améliorer le lecteur Savour » est activé (Paramètres) : ce que tu corriges dans l’écran de vérification nous aide à améliorer le lecteur MEP. Nous vérifions tout ; le lecteur ne change jamais tout seul."]
    ]
  }
};
