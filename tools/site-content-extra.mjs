// Aanvulling op tools/site-content.mjs: het voor-en-na-blok van de startpagina (vier talen) en de Duitse en
// Spaanse teksten van de startpagina en het menu. Dieper liggende pagina's zijn in het Duits en Spaans (nog) Engels.

export const BEFORE_AFTER = {
  nl: {
    beforeLabel: 'Voor Savour',
    beforeTitle: 'Recepten op tien plekken, en nooit waar je ze zoekt.',
    beforeList: ['Schriften vol vlekken en vervaagd handschrift', 'Word-bestanden van honderden pagina’s', 'Foto’s van recepten in de groepsapp', 'Drie versies van dezelfde saus', 'Vijftig recepten één voor één printen'],
    beforeNote: 'De kennis van je keuken zit in schriften, mappen en hoofden. Wie vertrekt, neemt een deel mee.',
    doc: 'recepten_DEF_v3_FINAL.docx',
    chat: 'Heb je de jus nog? Stuur even een foto',
    print: 'Afdrukken 1 van 50',
    afterLabel: 'Met Savour',
    afterTitle: 'Eén receptenboek. De hele brigade werkt met dezelfde versie.',
    afterList: ['Kladjes en Word in één keer geïmporteerd', 'Zoeken op titel of ingrediënt', 'Gedeelde mappen met rechten', 'Opschalen naar elke opbrengst', 'Een hele map in één keer printen'],
    afterNote: 'Je recepten kloppen, zijn overal te vinden en blijven van jou, ook als mensen vertrekken.',
    search: 'Zoek op titel of ingrediënt',
    rows: [['Beurre blanc', 'Sauzen'], ['Kalfsjus', 'Fonds'], ['Bloemkool crème', 'Garnituren'], ['Frambozen bavarois', 'Patisserie']]
  },
  en: {
    beforeLabel: 'Before Savour',
    beforeTitle: 'Recipes in ten places, and never where you look.',
    beforeList: ['Stained notebooks and faded handwriting', 'Word files hundreds of pages long', 'Photos of recipes in the group chat', 'Three versions of the same sauce', 'Printing fifty recipes one by one'],
    beforeNote: 'Your kitchen’s knowledge lives in notebooks, binders and heads. Whoever leaves takes part of it with them.',
    doc: 'recipes_FINAL_v3_new.docx',
    chat: 'Do you still have the jus? Send me a photo',
    print: 'Printing 1 of 50',
    afterLabel: 'With Savour',
    afterTitle: 'One recipe book. The whole brigade works from the same version.',
    afterList: ['Notes and Word imported in one go', 'Search by title or ingredient', 'Shared folders with rights', 'Scale to any yield', 'Print a whole folder at once'],
    afterNote: 'Your recipes are right, easy to find and stay yours, even when people leave.',
    search: 'Search by title or ingredient',
    rows: [['Beurre blanc', 'Sauces'], ['Veal jus', 'Stocks'], ['Cauliflower cream', 'Garnishes'], ['Raspberry bavarois', 'Pastry']]
  },
  de: {
    beforeLabel: 'Vor Savour',
    beforeTitle: 'Rezepte an zehn Orten, und nie dort, wo du suchst.',
    beforeList: ['Hefte voller Flecken und verblasste Handschrift', 'Word-Dateien mit Hunderten Seiten', 'Fotos von Rezepten im Gruppenchat', 'Drei Versionen derselben Sauce', 'Fünfzig Rezepte einzeln drucken'],
    beforeNote: 'Das Wissen deiner Küche steckt in Heften, Ordnern und Köpfen. Wer geht, nimmt einen Teil davon mit.',
    doc: 'rezepte_FINAL_v3_neu.docx',
    chat: 'Hast du die Jus noch? Schick mal ein Foto',
    print: 'Drucke 1 von 50',
    afterLabel: 'Mit Savour',
    afterTitle: 'Ein Rezeptbuch. Die ganze Brigade arbeitet mit derselben Version.',
    afterList: ['Notizen und Word auf einmal importiert', 'Suche nach Titel oder Zutat', 'Geteilte Ordner mit Rechten', 'Hochrechnen auf jede Ausbeute', 'Einen ganzen Ordner auf einmal drucken'],
    afterNote: 'Deine Rezepte stimmen, sind überall zu finden und bleiben deine, auch wenn Leute gehen.',
    search: 'Suche nach Titel oder Zutat',
    rows: [['Beurre blanc', 'Saucen'], ['Kalbsjus', 'Fonds'], ['Blumenkohlcreme', 'Garnituren'], ['Himbeer-Bavarois', 'Patisserie']]
  },
  es: {
    beforeLabel: 'Antes de Savour',
    beforeTitle: 'Recetas en diez sitios, y nunca donde las buscas.',
    beforeList: ['Cuadernos llenos de manchas y letra borrosa', 'Archivos de Word de cientos de páginas', 'Fotos de recetas en el grupo de chat', 'Tres versiones de la misma salsa', 'Imprimir cincuenta recetas una a una'],
    beforeNote: 'El conocimiento de tu cocina vive en cuadernos, carpetas y cabezas. Quien se va, se lleva una parte.',
    doc: 'recetas_FINAL_v3_nuevo.docx',
    chat: '¿Aún tienes el jugo? Mándame una foto',
    print: 'Imprimiendo 1 de 50',
    afterLabel: 'Con Savour',
    afterTitle: 'Un solo recetario. Toda la brigada trabaja con la misma versión.',
    afterList: ['Notas y Word importados de una vez', 'Busca por título o ingrediente', 'Carpetas compartidas con permisos', 'Escala a cualquier rendimiento', 'Imprime una carpeta entera de una vez'],
    afterNote: 'Tus recetas son correctas, fáciles de encontrar y siguen siendo tuyas, aunque la gente se vaya.',
    search: 'Busca por título o ingrediente',
    rows: [['Beurre blanc', 'Salsas'], ['Jugo de ternera', 'Fondos'], ['Crema de coliflor', 'Guarniciones'], ['Bavarois de frambuesa', 'Pastelería']]
  }
};

export const EXTRA_LANGS = {
  de: {
    ui: {
      home: '/de', features: 'Funktionen', audience: 'Für wen', pricing: 'Preise', about: 'Über uns', blog: 'Blog', login: 'Anmelden', start: 'Kostenlos starten',
      demo: 'Demo ansehen', demoNote: '40 Beispielrezepte, kein Konto nötig', menu: 'Menü', close: 'Schließen',
      featuresIntro: 'Alles, was Savour in der Küche für dich tut, von der ersten Notiz bis zum Ausdruck an der Wand.',
      audienceIntro: 'Gemacht für die Profiküche, vom Küchenchef bis zum Praktikanten.',
      related: 'Siehe auch',
      ctaTitle: 'Deine Rezepte verdienen einen besseren Platz als eine Schublade.',
      ctaText: 'Starte kostenlos mit bis zu 100 Rezepten und teste Savour Pro 7 Tage. Keine Zahlungsdaten nötig.',
      footerTag: 'Die Rezept-App für die Profiküche.',
      footerCols: { features: 'Funktionen', audience: 'Für wen', company: 'Savour', help: 'Hilfe' },
      faq: 'Häufige Fragen', guide: 'Anleitung', contact: 'Kontakt', terms: 'AGB', privacy: 'Datenschutz', bug: 'Problem melden',
      company: 'Savour · KvK 89674871 · Niederlande · contact@savour.page', soon: 'Demnächst',
      madeBy: 'Gemacht von Köchen aus den Niederlanden, für Köche.'
    },
    kladje: {
      note: ['Beurre blanc', '2 Schalotten fein', '1 dl Weißwein', '1 dl Essig', 'auf ¼ reduz.', '250 gr Butter kalt!!', 'montieren, Salz, Zitr.'],
      title: 'Beurre blanc',
      meta: 'Ausbeute 0,5 Liter · Saucen',
      ingredients: ['2 Schalotten, fein geschnitten', '100 ml Weißwein', '100 ml Weißweinessig', '250 g kalte Butter, gewürfelt', 'Salz und Zitronensaft'],
      steps: ['Schalotte, Wein und Essig auf ein Viertel reduzieren.', 'Vom Herd nehmen und mit kalter Butter montieren.', 'Mit Salz und Zitrone abschmecken.'],
      caption: 'Links die Notiz aus der Küche. Rechts dasselbe Rezept in Savour.'
    },
    home: {
      eyebrow: 'Für Köche in der Spitzengastronomie',
      h1: 'Von der Notiz zum Rezept, das stimmt.',
      lead: 'Savour ist die Rezept-App für die Profiküche. Deine Word-Dateien, PDFs und handschriftlichen Notizen werden ein geordnetes Rezeptbuch, für dich und deine Brigade.',
      proof: '1.400 Rezepte in 2 Minuten aus Word importiert. Getestet in unserer eigenen Küche.',
      storyTitle: 'Jedes Rezept beginnt irgendwo auf Papier.',
      story: [
        'Auf der Rückseite eines Bons. In einem Heft, das nach zehn Jahren Service zusammenklebt. Auf einem Foto vom Pass. Diese Notizen sind das Wissen deiner Küche, und sie gehen verloren, verblassen oder sind nur für den lesbar, der sie schrieb.',
        'Savour bewahrt dieses Wissen. Nicht durch Abtippen, sondern indem deine Notizen, Ordner und Dateien in einem Schritt zu Rezepten werden, die stimmen und die deine ganze Brigade lesen kann.'
      ],
      storyLink: 'Unsere Geschichte (Englisch)',
      featuresTitle: 'Was Savour macht',
      audienceTitle: 'Für wen',
      soonTitle: 'Woran wir arbeiten',
      soonLink: 'Was kommt',
      priceTitle: 'Kostenlos starten',
      price: 'Bis zu 100 Rezepte kostenlos, mit dem Savour-Leser für Word, PDF und Text. Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr: unbegrenzt Rezepte, KI für handschriftliche Notizen und Fotos und eigene geteilte Ordner. Teams ab 1,20 € pro Person.',
      priceLink: 'Preise ansehen',
      faqTitle: 'Fragen zu Savour',
      faq: [
        ['Welche App nutze ich, um Rezepte für mein Restaurant zu organisieren?', 'Savour ist für Profiküchen gemacht: Du importierst deine bestehenden Rezepte, ordnest sie in Ordnern und teilst sie mit deinem Team. Du startest kostenlos.'],
        ['Wie digitalisiere ich handgeschriebene Rezepte?', 'Mach ein Foto vom Rezept und lade es in Savour hoch. Die KI macht daraus ein sauberes Rezept mit Zutaten und Zubereitung, das du danach prüfst.'],
        ['Kann ich Rezepte aus Word oder PDF importieren?', 'Ja. Auch eine Datei mit Hunderten Rezepten auf einmal; Savour trennt sie selbst auf.'],
        ['Wie teile ich Rezepte mit meinem Küchenteam?', 'Mit einem geteilten Ordner. Du lädst Kollegen ein und gibst ihnen Rechte zum Ansehen oder Mitarbeiten.'],
        ['Ist Savour auch für Hobbyköche?', 'Das geht, aber Savour ist für die Profiküche gebaut: große Rezeptbücher, Teams und den Service.']
      ]
    },
    items: {
      digitise: ['Rezepte digitalisieren', 'Word, PDF und Fotos handschriftlicher Rezepte auf einmal in Savour.'],
      organise: ['Rezepte organisieren', 'Ordner, Kategorien und Suche nach Zutat. Deine Beurre blanc in drei Sekunden.'],
      share: ['Mit der Brigade teilen', 'Geteilte Ordner mit Rechten: Du verwaltest, dein Sous-Chef bearbeitet, der Rest liest mit.'],
      scale: ['Rezepte hochrechnen', 'Von 8 Gedecken auf 120, ohne Rechenfehler.'],
      print: ['Drucken und Rezeptordner', 'Ein ganzer Ordner auf einmal zum Drucker, sauber für die Küche.'],
      roadmap: ['Demnächst in Savour', 'Kosten pro Rezept, Allergene, Rezeptkarten mit eigenem Logo.'],
      chefs: ['Küchenchefs und Sous-Chefs', 'Für den Koch, der die Rezepturen der Küche verantwortet.'],
      pastry: ['Patissiers', 'Für die Patisserie, wo jedes Gramm zählt.'],
      brigade: ['Die ganze Brigade', 'Für Chefs de Partie, Commis und Praktikanten.']
    },
    soon: [
      ['Kosten pro Rezept', 'Sieh pro Gericht und Portion, was es kostet, und was passiert, wenn sich ein Preis ändert.'],
      ['Allergene auf einen Blick', 'Pro Rezept und pro Gericht, damit du die Frage eines Gastes sofort beantworten kannst.'],
      ['Rezeptkarten mit eigenem Logo', 'Gedruckte Rezepte im Stil deines Restaurants.'],
      ['Eine App für iPhone und Android', 'Savour läuft jetzt im Browser auf jedem Gerät. Eine eigene App ziehen wir in Betracht.']
    ]
  },
  es: {
    ui: {
      home: '/es', features: 'Funciones', audience: 'Para quién', pricing: 'Precios', about: 'Sobre nosotros', blog: 'Blog', login: 'Iniciar sesión', start: 'Empieza gratis',
      demo: 'Ver la demo', demoNote: '40 recetas de ejemplo, sin cuenta', menu: 'Menú', close: 'Cerrar',
      featuresIntro: 'Todo lo que Savour hace por ti en la cocina, desde la primera nota hasta la hoja en la pared.',
      audienceIntro: 'Hecho para la cocina profesional, del jefe de cocina al becario.',
      related: 'Relacionado',
      ctaTitle: 'Tus recetas merecen un sitio mejor que un cajón.',
      ctaText: 'Empieza gratis con hasta 100 recetas y prueba Savour Pro 7 días. Sin datos de pago.',
      footerTag: 'La app de recetas para la cocina profesional.',
      footerCols: { features: 'Funciones', audience: 'Para quién', company: 'Savour', help: 'Ayuda' },
      faq: 'Preguntas frecuentes', guide: 'Guía', contact: 'Contacto', terms: 'Condiciones', privacy: 'Privacidad', bug: 'Informar de un problema',
      company: 'Savour · KvK 89674871 · Países Bajos · contact@savour.page', soon: 'Próximamente',
      madeBy: 'Hecho por chefs de los Países Bajos, para chefs.'
    },
    kladje: {
      note: ['Beurre blanc', '2 chalota fina', '1 dl vino blanco', '1 dl vinagre', 'reducir a ¼', '250 gr mantequilla fría!!', 'montar, sal, lim.'],
      title: 'Beurre blanc',
      meta: 'Rendimiento 0,5 litros · Salsas',
      ingredients: ['2 chalotas, picadas finas', '100 ml de vino blanco', '100 ml de vinagre de vino blanco', '250 g de mantequilla fría, en dados', 'Sal y zumo de limón'],
      steps: ['Reducir la chalota, el vino y el vinagre a una cuarta parte.', 'Fuera del fuego, montar con la mantequilla fría.', 'Sazonar con sal y limón.'],
      caption: 'A la izquierda, la nota de la cocina. A la derecha, la misma receta en Savour.'
    },
    home: {
      eyebrow: 'Para chefs de alta cocina',
      h1: 'De la nota a una receta que funciona.',
      lead: 'Savour es la app de recetas para la cocina profesional. Tus archivos de Word, PDF y notas escritas a mano se convierten en un recetario ordenado, para ti y tu brigada.',
      proof: '1.400 recetas importadas de Word en 2 minutos. Probado en nuestra propia cocina.',
      storyTitle: 'Toda receta empieza en algún papel.',
      story: [
        'En el reverso de un ticket. En un cuaderno que se pega tras diez años de servicio. En una foto que hiciste en el pase. Esas notas son el conocimiento de tu cocina, y se pierden, se borran o solo las entiende quien las escribió.',
        'Savour está hecho para guardar ese conocimiento. No volviendo a escribirlo todo, sino convirtiendo tus notas, carpetas y archivos de una vez en recetas correctas que toda tu brigada puede leer.'
      ],
      storyLink: 'Nuestra historia (en inglés)',
      featuresTitle: 'Qué hace Savour',
      audienceTitle: 'Para quién',
      soonTitle: 'En qué trabajamos',
      soonLink: 'Lo que viene',
      priceTitle: 'Empieza gratis',
      price: 'Hasta 100 recetas gratis, con el lector de Savour para Word, PDF y texto. Savour Pro cuesta 2,99 € al mes o 29 € al año: recetas ilimitadas, IA para notas escritas a mano y fotos, y tus propias carpetas compartidas. Equipos desde 1,20 € por persona.',
      priceLink: 'Ver precios',
      faqTitle: 'Preguntas sobre Savour',
      faq: [
        ['¿Qué app uso para organizar las recetas de mi restaurante?', 'Savour está hecho para cocinas profesionales: importas tus recetas, las ordenas en carpetas y las compartes con tu equipo. Empiezas gratis.'],
        ['¿Cómo digitalizo recetas escritas a mano?', 'Haz una foto de la receta y súbela a Savour. La IA la convierte en una receta limpia con ingredientes y elaboración, que luego revisas.'],
        ['¿Puedo importar recetas de Word o PDF?', 'Sí. Incluso un archivo con cientos de recetas a la vez; Savour las separa solo.'],
        ['¿Cómo comparto recetas con mi equipo de cocina?', 'Con una carpeta compartida. Invitas a tus compañeros y les das permiso para ver o colaborar.'],
        ['¿Savour también es para cocineros caseros?', 'Puede servir, pero Savour está hecho para la cocina profesional: grandes recetarios, equipos y el servicio.']
      ]
    },
    items: {
      digitise: ['Digitalizar recetas', 'Word, PDF y fotos de recetas escritas a mano en Savour de una vez.'],
      organise: ['Organizar recetas', 'Carpetas, categorías y búsqueda por ingrediente. Tu beurre blanc en tres segundos.'],
      share: ['Compartir con tu brigada', 'Carpetas compartidas con permisos: tú gestionas, tu segundo edita, el resto consulta.'],
      scale: ['Escalar recetas', 'De 8 cubiertos a 120, sin errores de cálculo.'],
      print: ['Imprimir y carpetas', 'Una carpeta entera a la impresora de una vez, limpia para la cocina.'],
      roadmap: ['Próximamente en Savour', 'Coste por receta, alérgenos, fichas con tu propio logo.'],
      chefs: ['Jefes de cocina y segundos', 'Para el chef que cuida las recetas de la cocina.'],
      pastry: ['Pasteleros', 'Para la pastelería, donde cada gramo cuenta.'],
      brigade: ['Toda la brigada', 'Para jefes de partida, ayudantes y becarios.']
    },
    soon: [
      ['Coste por receta', 'Mira lo que cuesta cada plato y cada ración, y qué pasa cuando cambia un precio.'],
      ['Alérgenos de un vistazo', 'Por receta y por plato, para responder al momento la pregunta de un cliente.'],
      ['Fichas con tu propio logo', 'Recetas impresas con el estilo de tu restaurante.'],
      ['Una app para iPhone y Android', 'Savour funciona ahora en el navegador de cualquier dispositivo. Estamos valorando una app propia.']
    ]
  }
};
