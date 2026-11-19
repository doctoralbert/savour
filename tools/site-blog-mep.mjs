// Blog: MEP-lijsten in Savour (2026-11-19), in vijf talen. Klopt met js/features/mep.js, mep-import.js en
// supabase/2026-11-17-mep-alleen-pro.sql: per post kaarten → kopjes → onderdelen met een hoeveelheid per couvert,
// couverts per kaart per dag, elke dag begint de lijst leeg, afvinken live met naam en tijd (ook offline), kookmodus,
// printen op één A4 staand of liggend zonder datum en couverts, onderdelen koppelen aan een recept, kopie maken,
// archiveren, importeren uit Excel/Word/tekst (foto = AI, Pro). Maken en beheren met Pro, afvinken voor iedereen.
// Beelden: echte schermen uit de demo (assets/app/mep-lijst-, mep-bureau- en mep-a4-<taal>.jpg).

const KEY = 'en/blog/prep-lists-in-savour';
const shots = lang => ({
  phone: `/assets/app/mep-lijst-${lang}.jpg`,
  desk: `/assets/app/mep-bureau-${lang}.jpg`,
  a4: `/assets/app/mep-a4-${lang}.jpg`
});

export const MEP_POST = {
  id: 'mep',
  date: '2026-11-19',
  // Foto bovenaan (PHOTOS in tools/build-seo.mjs).
  photo: 'mepPass',
  rich: true,
  nl: {
    slug: 'blog/mep-lijsten-in-savour',
    title: 'MEP-lijsten in Savour: afvinken, rekenen en printen',
    desc: 'Je MEP-lijst digitaal: per post wat er klaar moet staan, couverts invullen en Savour rekent de hoeveelheden uit, live afvinken met je brigade en printen op één A4. Zo werkt het.',
    h1: 'MEP-lijsten in Savour: zo werkt het',
    lead: 'Elke keuken heeft ze: de lijst aan de muur met alles wat voor de service klaar moet staan. Vaak een Excel-bestand dat iemand elke ochtend uitprint, met pen bijgeschreven couverts. In Savour is die lijst nu digitaal, en hij rekent zelf.',
    brief: [
      'Per post één MEP-lijst: kaarten, gerechten of kopjes, en daaronder de onderdelen met hun hoeveelheid per couvert.',
      'Vul de couverts in en Savour rekent uit hoeveel je nodig hebt: 40 × 60 g gravlax is 2,4 kg.',
      'Je brigade vinkt live af, ook zonder wifi, en je print de hele lijst op één A4.'
    ],
    sections: [
      [
        'Opgebouwd zoals je keuken werkt',
        'Een MEP-lijst hoort bij een post: de garde, de patisserie, de warme kant. Daarin staan je kaarten, bijvoorbeeld à la carte en banqueting. Per kaart zet je kopjes, zoals een gang of een gerecht, en daaronder de onderdelen: wat er klaar moet staan, met de hoeveelheid per couvert. Een onderdeel koppel je eventueel aan een recept uit Savour; dan heb je het recept met één tik open.',
        { shot: shots('nl').desk, alt: 'Een MEP-lijst in Savour met à la carte en banqueting naast elkaar', caption: 'À la carte en banqueting naast elkaar, elk met hun eigen couverts.', wide: true }
      ],
      [
        'Couverts invullen, Savour rekent',
        'Naast de naam van elke kaart vul je het aantal couverts van vandaag in. Savour rekent bij elk onderdeel uit hoeveel je moet maken. Staat er 60 g gravlax per couvert en heb je 40 couverts, dan zie je 2,4 kg. Gram wordt vanzelf kilo en milliliter liter zodra dat beter leest. Komen er vanmiddag nog tien gasten bij? Pas het getal aan en alles rekent mee.',
        { tip: ['Per kaart rekenen', 'Banqueting en à la carte hebben vaak een heel ander aantal gasten. Daarom heeft elke kaart zijn eigen couverts: de diner-partij van 80 zit de kaart van 40 niet in de weg.'] }
      ],
      [
        'Afvinken met je hele brigade',
        'Wat klaar is, vink je af. In een keukenteam zie je binnen een paar seconden wat je collega’s afvinkten, met hun naam en de tijd erbij. Valt de wifi weg in de koelcel, dan onthoudt Savour het en stuurt het mee zodra er weer verbinding is. Met "Alleen wat nog moet" zie je alleen wat nog openstaat. Elke dag begint de lijst weer leeg; tussendoor opnieuw beginnen kan met ⋯ Lijst leegmaken.',
        { shot: shots('nl').phone, alt: 'Een MEP-lijst in Savour op de telefoon met afgevinkte onderdelen', caption: 'Op de telefoon: grote hokjes, de hoeveelheid van vandaag in goud en wie wat afvinkte.' }
      ],
      [
        'Groot in de keuken',
        'In de kookmodus staat alleen de lijst op je scherm, met grote letters, en blijft het scherm aan. Handig op een tablet aan de muur of op je telefoon op de werkbank.'
      ],
      [
        'Printen op één A4',
        'Werk je liever met papier aan de pas? Kies Printen en daarna staand of liggend. Savour zet de hele lijst op één A4, met hokjes om af te vinken, net als je Excel-lijst. Datum en couverts staan er bewust niet op: zo hang je hetzelfde blad elke dag op. Met Savour Pro staat het logo van je restaurant erboven.',
        { shot: shots('nl').a4, alt: 'Een MEP-lijst uit Savour, geprint op één A4', caption: 'Zo komt de lijst uit de printer: één A4, met hokjes en zonder datum.' }
      ],
      [
        'Je eigen lijst overzetten',
        'Je hoeft niets over te typen. Kies Importeren en geef je Excel-bestand, Word-document of tekst. Savour deelt de lijst in kaarten, kopjes en onderdelen. Een foto van je lijst aan de muur leest de AI, met Savour Pro. Daarna kijk je alles na voordat het wordt opgeslagen; wat Savour niet zeker weet, staat geel gemarkeerd.',
        {
          steps: [
            ['Open Tools → MEP-lijsten', 'Of het blok MEP-lijsten op het scherm van je keukenteam.'],
            ['Kies Importeren', 'Excel (.xlsx of .csv), Word, tekst of een foto.'],
            ['Kijk het na', 'Verschuif wat anders moet en controleer de gele regels.'],
            ['Opslaan', 'Je lijst staat klaar, voor jou of voor je hele team.']
          ]
        }
      ],
      [
        'Beheren zonder gedoe',
        'In Bewerken voeg je kaarten, kopjes en onderdelen toe, zet je ze in een andere volgorde en verplaats of kopieer je een kopje naar een andere kaart. Een hele lijst kopieer je voor een nieuwe post, en een oude kaart zet je in het archief zonder dat er iets verloren gaat.'
      ],
      [
        'Wat kost het?',
        'MEP-lijsten maken en beheren hoort bij [Savour Pro](/savour-pro). Afvinken kan iedereen in het keukenteam, ook met een gratis account. Nieuwe accounts krijgen 7 dagen Pro gratis. Eerst kijken? [Open de demo](/?demo=1) en kies Tools → MEP-lijsten, of lees meer op [MEP-lijsten](/mep-lijsten).'
      ]
    ],
    outro: 'Deze uitleg beschrijft de MEP-lijst zoals hij nu live staat. Verandert er iets, dan passen we het hier aan.'
  },
  en: {
    slug: KEY,
    title: 'Prep lists in Savour: tick off, scale and print',
    desc: 'Your prep list made digital: what each section needs ready, enter the covers and Savour works out the quantities, tick off live with your brigade and print on one A4. This is how it works.',
    h1: 'Prep lists in Savour: how it works',
    lead: 'Every kitchen has one: the list on the wall with everything that has to be ready for service. Often an Excel file someone prints every morning, with covers written on in pen. In Savour that list is now digital, and it does the maths.',
    brief: [
      'One prep list per section: menus, dishes or headings, and below them the items with their quantity per cover.',
      'Enter the covers and Savour works out how much you need: 40 × 60 g of gravlax is 2.4 kg.',
      'Your brigade ticks off live, even without wifi, and you print the whole list on one A4.'
    ],
    sections: [
      [
        'Built the way your kitchen works',
        'A prep list belongs to a section: garde manger, pastry, the hot side. It holds your menus, for example à la carte and banqueting. Per menu you add headings, such as a course or a dish, and below them the items: what has to be ready, with the quantity per cover. You can link an item to a recipe in Savour, so the recipe is one tap away.',
        { shot: shots('en').desk, alt: 'A prep list in Savour with à la carte and banqueting side by side', caption: 'À la carte and banqueting side by side, each with its own covers.', wide: true }
      ],
      [
        'Enter the covers, Savour does the maths',
        'Next to the name of each menu you enter today’s covers. Savour works out how much to make of every item. With 60 g of gravlax per cover and 40 covers, you see 2.4 kg. Grams become kilos and millilitres litres as soon as that reads better. Ten more guests this afternoon? Change the number and everything follows.',
        { tip: ['Calculate per menu', 'Banqueting and à la carte often have very different numbers of guests. That is why every menu has its own covers: the dinner party of 80 does not get in the way of the menu for 40.'] }
      ],
      [
        'Tick off with your whole brigade',
        'What is ready, you tick off. In a kitchen team you see within a few seconds what your colleagues ticked off, with their name and the time. If the wifi drops out in the walk-in, Savour remembers and sends it as soon as you are back online. With "Only what’s still to do" you only see what is still open. Every day the list starts empty again; to start over during the day, use ⋯ Clear list.',
        { shot: shots('en').phone, alt: 'A prep list in Savour on a phone with ticked-off items', caption: 'On the phone: large boxes, today’s quantity in gold and who ticked off what.' }
      ],
      [
        'Large in the kitchen',
        'In cook mode only the list is on your screen, in large text, and the screen stays on. Handy on a tablet on the wall or on your phone on the bench.'
      ],
      [
        'Print on one A4',
        'Prefer paper at the pass? Choose Print and then portrait or landscape. Savour puts the whole list on one A4, with boxes to tick, just like your Excel list. The date and covers are deliberately left off, so you can pin up the same sheet every day. With Savour Pro your restaurant’s logo is at the top.',
        { shot: shots('en').a4, alt: 'A prep list from Savour printed on one A4', caption: 'This is how the list comes out of the printer: one A4, with boxes and no date.' }
      ],
      [
        'Bring your own list',
        'There is nothing to retype. Choose Import and give Savour your Excel file, Word document or text. Savour sorts the list into menus, headings and items. A photo of the list on your wall is read by the AI, with Savour Pro. Then you check everything before it is saved; whatever Savour is not sure about is marked in yellow.',
        {
          steps: [
            ['Open Tools → Prep lists', 'Or the Prep lists block on your kitchen team screen.'],
            ['Choose Import', 'Excel (.xlsx or .csv), Word, text or a photo.'],
            ['Check it', 'Move what needs to change and check the yellow lines.'],
            ['Save', 'Your list is ready, for you or for your whole team.']
          ]
        }
      ],
      [
        'Easy to manage',
        'In Edit you add menus, headings and items, change their order and move or copy a heading to another menu. You copy a whole list for a new section, and you archive an old menu without losing anything.'
      ],
      [
        'What does it cost?',
        'Creating and managing prep lists is part of [Savour Pro](/en/pro). Anyone in the kitchen team can tick off, even with a free account. New accounts get 7 days of Pro for free. Want to look first? [Open the demo](/en?demo=1) and choose Tools → Prep lists, or read more on [Prep lists](/en/prep-lists).'
      ]
    ],
    outro: 'This explains the prep list as it is live today. If anything changes, we will update it here.'
  }
};

export const MEP_POST_DE = {
  [KEY]: {
    slug: 'de/blog/mep-listen-in-savour',
    title: 'MEP-Listen in Savour: abhaken, rechnen und drucken',
    desc: 'Deine MEP-Liste digital: was je Posten bereitstehen muss, Gedecke eintragen und Savour rechnet die Mengen aus, live abhaken mit deiner Brigade und auf einer A4-Seite drucken. So funktioniert es.',
    h1: 'MEP-Listen in Savour: so funktioniert es',
    lead: 'Jede Küche hat sie: die Liste an der Wand mit allem, was für den Service bereitstehen muss. Oft eine Excel-Datei, die jemand jeden Morgen ausdruckt, mit Gedecken per Kuli. In Savour ist diese Liste jetzt digital, und sie rechnet selbst.',
    brief: [
      'Pro Posten eine MEP-Liste: Karten, Gerichte oder Überschriften und darunter die Posten mit ihrer Menge pro Gedeck.',
      'Trag die Gedecke ein und Savour rechnet aus, wie viel du brauchst: 40 × 60 g Gravlax sind 2,4 kg.',
      'Deine Brigade hakt live ab, auch ohne WLAN, und du druckst die ganze Liste auf eine A4-Seite.'
    ],
    sections: [
      [
        'Aufgebaut wie deine Küche arbeitet',
        'Eine MEP-Liste gehört zu einem Posten: Garde-Manger, Patisserie, warme Seite. Darin stehen deine Karten, zum Beispiel à la carte und Bankett. Pro Karte legst du Überschriften an, etwa einen Gang oder ein Gericht, und darunter die Posten: was bereitstehen muss, mit der Menge pro Gedeck. Einen Posten kannst du mit einem Rezept in Savour verknüpfen; dann ist das Rezept nur einen Tipp entfernt.',
        { shot: shots('de').desk, alt: 'Eine MEP-Liste in Savour mit à la carte und Bankett nebeneinander', caption: 'À la carte und Bankett nebeneinander, jede Karte mit eigenen Gedecken.', wide: true }
      ],
      [
        'Gedecke eintragen, Savour rechnet',
        'Neben dem Namen jeder Karte trägst du die Gedecke von heute ein. Savour rechnet bei jedem Posten aus, wie viel du machen musst. Bei 60 g Gravlax pro Gedeck und 40 Gedecken siehst du 2,4 kg. Gramm werden zu Kilo und Milliliter zu Liter, sobald das besser lesbar ist. Kommen heute Nachmittag zehn Gäste dazu? Zahl ändern, alles rechnet mit.',
        { tip: ['Pro Karte rechnen', 'Bankett und à la carte haben oft ganz andere Gästezahlen. Deshalb hat jede Karte eigene Gedecke: die Feier mit 80 Personen stört die Karte für 40 nicht.'] }
      ],
      [
        'Abhaken mit der ganzen Brigade',
        'Was fertig ist, hakst du ab. In einem Küchenteam siehst du nach wenigen Sekunden, was deine Kollegen abgehakt haben, mit Name und Uhrzeit. Fällt im Kühlhaus das WLAN aus, merkt sich Savour das und schickt es, sobald du wieder online bist. Mit „Nur was noch zu tun ist“ siehst du nur, was noch offen ist. Jeden Tag beginnt die Liste wieder leer; zwischendurch neu anfangen geht mit ⋯ Liste leeren.',
        { shot: shots('de').phone, alt: 'Eine MEP-Liste in Savour auf dem Handy mit abgehakten Posten', caption: 'Auf dem Handy: große Kästchen, die Menge für heute in Gold und wer was abgehakt hat.' }
      ],
      [
        'Groß in der Küche',
        'Im Kochmodus steht nur die Liste auf dem Bildschirm, in großer Schrift, und der Bildschirm bleibt an. Praktisch auf einem Tablet an der Wand oder auf dem Handy auf der Arbeitsfläche.'
      ],
      [
        'Auf einer A4-Seite drucken',
        'Lieber Papier am Pass? Wähle Drucken und dann hoch oder quer. Savour setzt die ganze Liste auf eine A4-Seite, mit Kästchen zum Abhaken, genau wie deine Excel-Liste. Datum und Gedecke stehen bewusst nicht darauf: so hängst du jeden Tag dasselbe Blatt auf. Mit Savour Pro steht das Logo deines Restaurants oben.',
        { shot: shots('de').a4, alt: 'Eine MEP-Liste aus Savour, gedruckt auf einer A4-Seite', caption: 'So kommt die Liste aus dem Drucker: eine A4-Seite, mit Kästchen und ohne Datum.' }
      ],
      [
        'Deine eigene Liste übernehmen',
        'Du musst nichts abtippen. Wähle Importieren und gib Savour deine Excel-Datei, dein Word-Dokument oder Text. Savour teilt die Liste in Karten, Überschriften und Posten. Ein Foto deiner Liste an der Wand liest die KI, mit Savour Pro. Danach prüfst du alles, bevor es gespeichert wird; was Savour nicht sicher weiß, ist gelb markiert.',
        {
          steps: [
            ['Öffne Werkzeuge → MEP-Listen', 'Oder den Block MEP-Listen auf dem Bildschirm deines Küchenteams.'],
            ['Wähle Importieren', 'Excel (.xlsx oder .csv), Word, Text oder ein Foto.'],
            ['Prüfen', 'Verschieb, was anders sein muss, und prüf die gelben Zeilen.'],
            ['Speichern', 'Deine Liste ist bereit, für dich oder dein ganzes Team.']
          ]
        }
      ],
      [
        'Einfach zu verwalten',
        'In Bearbeiten fügst du Karten, Überschriften und Posten hinzu, änderst die Reihenfolge und verschiebst oder kopierst eine Überschrift auf eine andere Karte. Eine ganze Liste kopierst du für einen neuen Posten, und eine alte Karte kommt ins Archiv, ohne dass etwas verloren geht.'
      ],
      [
        'Was kostet es?',
        'MEP-Listen erstellen und verwalten gehört zu [Savour Pro](/de/preise). Abhaken kann jeder im Küchenteam, auch mit einem kostenlosen Konto. Neue Konten bekommen 7 Tage Pro gratis. Erst schauen? [Öffne die Demo](/de?demo=1) und wähle Werkzeuge → MEP-Listen, oder lies mehr unter [MEP-Listen](/de/mep-listen).'
      ]
    ],
    outro: 'Diese Erklärung beschreibt die MEP-Liste, wie sie jetzt live ist. Ändert sich etwas, passen wir es hier an.'
  }
};

export const MEP_POST_ES = {
  [KEY]: {
    slug: 'es/blog/listas-mep-en-savour',
    title: 'Listas MEP en Savour: marcar, calcular e imprimir',
    desc: 'Tu lista MEP en digital: lo que debe estar listo en cada partida, indica los cubiertos y Savour calcula las cantidades, marca en directo con tu brigada e imprime en un A4. Así funciona.',
    h1: 'Listas MEP en Savour: así funciona',
    lead: 'Toda cocina tiene una: la lista en la pared con todo lo que debe estar listo para el servicio. A menudo un Excel que alguien imprime cada mañana, con los cubiertos apuntados a boli. En Savour esa lista ahora es digital, y calcula sola.',
    brief: [
      'Una lista MEP por partida: cartas, platos o encabezados, y debajo los elementos con su cantidad por cubierto.',
      'Indica los cubiertos y Savour calcula cuánto necesitas: 40 × 60 g de gravlax son 2,4 kg.',
      'Tu brigada marca en directo, también sin wifi, e imprimes toda la lista en un A4.'
    ],
    sections: [
      [
        'Organizada como trabaja tu cocina',
        'Una lista MEP pertenece a una partida: el cuarto frío, la pastelería, la parte caliente. En ella están tus cartas, por ejemplo à la carte y banquetes. Por carta añades encabezados, como un pase o un plato, y debajo los elementos: lo que debe estar listo, con la cantidad por cubierto. Puedes vincular un elemento a una receta de Savour; así la receta está a un toque.',
        { shot: shots('es').desk, alt: 'Una lista MEP en Savour con à la carte y banquetes uno al lado del otro', caption: 'À la carte y banquetes uno al lado del otro, cada uno con sus cubiertos.', wide: true }
      ],
      [
        'Indica los cubiertos, Savour calcula',
        'Junto al nombre de cada carta indicas los cubiertos de hoy. Savour calcula cuánto tienes que preparar de cada elemento. Con 60 g de gravlax por cubierto y 40 cubiertos, ves 2,4 kg. Los gramos pasan a kilos y los mililitros a litros en cuanto se lee mejor. ¿Llegan diez comensales más esta tarde? Cambia el número y todo se recalcula.',
        { tip: ['Calcular por carta', 'Banquetes y à la carte suelen tener un número de comensales muy distinto. Por eso cada carta tiene sus propios cubiertos: la cena de 80 no estorba a la carta de 40.'] }
      ],
      [
        'Marcar con toda la brigada',
        'Lo que está listo, lo marcas. En un equipo de cocina ves en pocos segundos lo que marcaron tus compañeros, con su nombre y la hora. Si se cae el wifi en la cámara, Savour lo recuerda y lo envía en cuanto vuelve la conexión. Con «Solo lo que falta» ves solo lo pendiente. Cada día la lista empieza vacía; para empezar de nuevo a mitad del día, usa ⋯ Vaciar lista.',
        { shot: shots('es').phone, alt: 'Una lista MEP en Savour en el móvil con elementos marcados', caption: 'En el móvil: casillas grandes, la cantidad de hoy en dorado y quién marcó qué.' }
      ],
      [
        'En grande en la cocina',
        'En el modo cocina solo ves la lista, con letra grande, y la pantalla se mantiene encendida. Práctico en una tablet en la pared o en el móvil sobre la mesa de trabajo.'
      ],
      [
        'Imprimir en un A4',
        '¿Prefieres papel en el pase? Elige Imprimir y luego vertical u horizontal. Savour pone toda la lista en un A4, con casillas para marcar, igual que tu lista de Excel. La fecha y los cubiertos no aparecen a propósito: así cuelgas la misma hoja cada día. Con Savour Pro el logo de tu restaurante va arriba.',
        { shot: shots('es').a4, alt: 'Una lista MEP de Savour impresa en un A4', caption: 'Así sale la lista de la impresora: un A4, con casillas y sin fecha.' }
      ],
      [
        'Pasa tu propia lista',
        'No hay que copiar nada a mano. Elige Importar y dale a Savour tu Excel, tu documento Word o un texto. Savour ordena la lista en cartas, encabezados y elementos. Una foto de la lista de la pared la lee la IA, con Savour Pro. Después revisas todo antes de guardar; lo que Savour no tiene claro aparece en amarillo.',
        {
          steps: [
            ['Abre Herramientas → Listas MEP', 'O el bloque Listas MEP en la pantalla de tu equipo de cocina.'],
            ['Elige Importar', 'Excel (.xlsx o .csv), Word, texto o una foto.'],
            ['Revísalo', 'Mueve lo que deba cambiar y revisa las líneas amarillas.'],
            ['Guardar', 'Tu lista está lista, para ti o para todo tu equipo.']
          ]
        }
      ],
      [
        'Fácil de gestionar',
        'En Editar añades cartas, encabezados y elementos, cambias el orden y mueves o copias un encabezado a otra carta. Copias una lista entera para una nueva partida y archivas una carta antigua sin perder nada.'
      ],
      [
        '¿Cuánto cuesta?',
        'Crear y gestionar listas MEP forma parte de [Savour Pro](/es/precios). Marcar lo puede hacer cualquiera del equipo de cocina, también con una cuenta gratuita. Las cuentas nuevas tienen 7 días de Pro gratis. ¿Quieres verlo primero? [Abre la demo](/es?demo=1) y elige Herramientas → Listas MEP, o lee más en [Listas MEP](/es/listas-mep).'
      ]
    ],
    outro: 'Esta explicación describe la lista MEP tal como está ahora. Si cambia algo, lo actualizamos aquí.'
  }
};

export const MEP_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/listes-mep-dans-savour',
    title: 'Listes MEP dans Savour : cocher, calculer, imprimer',
    desc: 'Ta liste MEP en numérique : ce qui doit être prêt à chaque poste, indique les couverts et Savour calcule les quantités, coche en direct avec ta brigade et imprime sur un A4. Voici comment ça marche.',
    h1: 'Les listes MEP dans Savour : comment ça marche',
    lead: 'Chaque cuisine en a une : la liste au mur avec tout ce qui doit être prêt pour le service. Souvent un fichier Excel imprimé chaque matin, avec les couverts notés au stylo. Dans Savour, cette liste est désormais numérique, et elle calcule toute seule.',
    brief: [
      'Une liste MEP par poste : cartes, plats ou intitulés, et en dessous les éléments avec leur quantité par couvert.',
      'Indique les couverts et Savour calcule ce qu’il te faut : 40 × 60 g de gravlax font 2,4 kg.',
      'Ta brigade coche en direct, même sans wifi, et tu imprimes toute la liste sur un A4.'
    ],
    sections: [
      [
        'Construite comme ta cuisine travaille',
        'Une liste MEP appartient à un poste : le garde-manger, la pâtisserie, le chaud. On y trouve tes cartes, par exemple à la carte et banquet. Par carte, tu ajoutes des intitulés, comme un service ou un plat, et en dessous les éléments : ce qui doit être prêt, avec la quantité par couvert. Tu peux relier un élément à une recette de Savour ; la recette est alors à un geste.',
        { shot: shots('fr').desk, alt: 'Une liste MEP dans Savour avec à la carte et banquet côte à côte', caption: 'À la carte et banquet côte à côte, chacun avec ses couverts.', wide: true }
      ],
      [
        'Indique les couverts, Savour calcule',
        'À côté du nom de chaque carte, tu indiques les couverts du jour. Savour calcule combien préparer de chaque élément. Avec 60 g de gravlax par couvert et 40 couverts, tu vois 2,4 kg. Les grammes deviennent des kilos et les millilitres des litres dès que c’est plus lisible. Dix convives de plus cet après-midi ? Change le nombre et tout suit.',
        { tip: ['Calculer par carte', 'Le banquet et la carte ont souvent un nombre de convives très différent. C’est pourquoi chaque carte a ses propres couverts : le dîner de 80 ne gêne pas la carte de 40.'] }
      ],
      [
        'Cocher avec toute la brigade',
        'Ce qui est prêt, tu le coches. Dans une équipe de cuisine, tu vois en quelques secondes ce que tes collègues ont coché, avec leur nom et l’heure. Si le wifi coupe en chambre froide, Savour s’en souvient et l’envoie dès que la connexion revient. Avec « Seulement ce qui reste à faire », tu ne vois que ce qui reste. Chaque jour, la liste repart à zéro ; pour recommencer en cours de journée, utilise ⋯ Vider la liste.',
        { shot: shots('fr').phone, alt: 'Une liste MEP dans Savour sur un téléphone avec des éléments cochés', caption: 'Sur le téléphone : de grandes cases, la quantité du jour en doré et qui a coché quoi.' }
      ],
      [
        'En grand en cuisine',
        'En mode cuisine, seule la liste s’affiche, en grands caractères, et l’écran reste allumé. Pratique sur une tablette au mur ou sur ton téléphone posé sur le plan de travail.'
      ],
      [
        'Imprimer sur un A4',
        'Tu préfères le papier au passe ? Choisis Imprimer, puis portrait ou paysage. Savour met toute la liste sur un A4, avec des cases à cocher, comme ta liste Excel. La date et les couverts n’y figurent pas exprès : tu affiches ainsi la même feuille chaque jour. Avec Savour Pro, le logo de ton restaurant figure en haut.',
        { shot: shots('fr').a4, alt: 'Une liste MEP de Savour imprimée sur un A4', caption: 'Voici la liste à la sortie de l’imprimante : un A4, avec des cases et sans date.' }
      ],
      [
        'Reprendre ta propre liste',
        'Rien à retaper. Choisis Importer et donne à Savour ton fichier Excel, ton document Word ou du texte. Savour range la liste en cartes, intitulés et éléments. Une photo de la liste au mur est lue par l’IA, avec Savour Pro. Ensuite, tu vérifies tout avant l’enregistrement ; ce dont Savour n’est pas sûr est surligné en jaune.',
        {
          steps: [
            ['Ouvre Outils → Listes MEP', 'Ou le bloc Listes MEP sur l’écran de ton équipe de cuisine.'],
            ['Choisis Importer', 'Excel (.xlsx ou .csv), Word, texte ou une photo.'],
            ['Vérifie', 'Déplace ce qui doit changer et contrôle les lignes jaunes.'],
            ['Enregistre', 'Ta liste est prête, pour toi ou pour toute ton équipe.']
          ]
        }
      ],
      [
        'Simple à gérer',
        'Dans Modifier, tu ajoutes des cartes, des intitulés et des éléments, tu changes l’ordre et tu déplaces ou copies un intitulé vers une autre carte. Tu copies une liste entière pour un nouveau poste, et tu archives une ancienne carte sans rien perdre.'
      ],
      [
        'Combien ça coûte ?',
        'Créer et gérer des listes MEP fait partie de [Savour Pro](/fr/tarifs). Tout le monde dans l’équipe de cuisine peut cocher, même avec un compte gratuit. Les nouveaux comptes ont 7 jours de Pro offerts. Tu veux d’abord regarder ? [Ouvre la démo](/fr?demo=1) et choisis Outils → Listes MEP, ou lis la suite sur [Listes MEP](/fr/listes-mep).'
      ]
    ],
    outro: 'Cette explication décrit la liste MEP telle qu’elle est en ligne aujourd’hui. Si quelque chose change, nous la mettrons à jour ici.'
  }
};
