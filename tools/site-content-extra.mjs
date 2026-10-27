// Aanvulling op tools/site-content.mjs: de Duitse en Spaanse teksten van de startpagina en het menu.
// Dieper liggende pagina's zijn in het Duits en Spaans (nog) Engels.

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
      company: 'Savour · contact@savour.page', soon: 'Demnächst',
      madeBy: 'Von Köchen für Köche gemacht.'
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
      h1: 'Dein ganzes Rezeptbuch, auf jedem Handy in der Küche.',
      lead: 'Savour ist die Rezept-App für die Profiküche. Deine Word-Dateien, PDFs und handschriftlichen Notizen werden ein geordnetes Rezeptbuch, für dich und deine Brigade. Sicher in der Cloud, auf jedem Gerät und auch offline.',
      proof: '1.400 Rezepte in 2 Minuten aus Word importiert. Getestet in unserer eigenen Küche.',
      story: [
        'Auf der Rückseite eines Bons. In einem Heft, das nach zehn Jahren Service zusammenklebt. Auf einem Foto vom Pass. Diese Notizen sind das Wissen deiner Küche, und sie gehen verloren, verblassen oder sind nur für den lesbar, der sie schrieb.',
        'Savour bewahrt dieses Wissen. Nicht durch Abtippen, sondern indem deine Notizen, Ordner und Dateien in einem Schritt zu Rezepten werden, die stimmen und die deine ganze Brigade lesen kann.'
      ],
      storyLink: 'Unsere Geschichte lesen',
      featuresTitle: 'Was Savour macht',
      audienceTitle: 'Für wen',
      soonTitle: 'Woran wir arbeiten',
      soonLink: 'Was kommt',
      priceTitle: 'Kostenlos starten',
      price: 'Bis zu 100 Rezepte kostenlos, mit dem Savour-Leser für Word, PDF und Text. Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr: unbegrenzt Rezepte, KI für handschriftliche Notizen und Fotos und eigene Küchenteams. Teams ab 1,20 € pro Person.',
      priceLink: 'Preise ansehen',
      faqTitle: 'Fragen zu Savour',
      faq: [
        ['Welche App nutze ich, um Rezepte für mein Restaurant zu organisieren?', 'Savour ist für Profiküchen gemacht: Du importierst deine bestehenden Rezepte, ordnest sie in Ordnern und teilst sie mit deinem Team. Du startest kostenlos.'],
        ['Wie digitalisiere ich handgeschriebene Rezepte?', 'Mach ein Foto vom Rezept und lade es in Savour hoch. Die KI macht daraus ein sauberes Rezept mit Zutaten und Zubereitung, das du danach prüfst.'],
        ['Kann ich Rezepte aus Word oder PDF importieren?', 'Ja. Auch eine Datei mit Hunderten Rezepten auf einmal; Savour trennt sie selbst auf.'],
        ['Wie teile ich Rezepte mit meinem Küchenteam?', 'Mit einem Küchenteam. Du lädst Kollegen ein und gibst ihnen Rechte zum Ansehen oder Mitarbeiten.'],
        ['Eignet sich Savour für die Rezeptverwaltung in der Gastronomie?', 'Ja. Savour ist für Restaurants, Hotels und Catering gebaut: Rezepturen zentral verwalten, mit dem Küchenteam teilen und nach Posten, Menü oder Standort ordnen.'],
        [ "Funktioniert Savour auch offline?", "Ja. Öffne Savour einmal mit Internet und lege es auf deinen Startbildschirm; danach öffnest du deine Rezepte auch ohne Verbindung, zum Beispiel im Kühlhaus. Bearbeiten geht wieder, sobald du online bist." ],
        [ "Wo werden meine Rezepte gespeichert?", "In der Cloud, getrennt pro Konto. Du öffnest sie auf Computer, Tablet und Handy, und nur du und die Personen, die du in ein Küchenteam einlädst, können sie lesen." ],
        [ "Kann ich einen ganzen Rezeptordner auf einmal drucken?", "Ja. Drucke einzelne Rezepte oder einen kompletten Rezeptordner auf einmal, sauber gestaltet für den Küchenordner. Mit Savour Pro steht das Logo deines Restaurants darauf." ],
        ['Ist Savour auch für Hobbyköche?', 'Das geht, aber Savour ist für die Profiküche gebaut: große Rezeptbücher, Teams und den Service.']
      ]
    },
    items: {
      digitise: ['Rezepte digitalisieren', 'Word, PDF und Fotos handschriftlicher Rezepte auf einmal in Savour.'],
      organise: ['Rezepte organisieren', 'Ordner, Kategorien und Suche nach Zutat. Deine Beurre blanc in drei Sekunden.'],
      share: ['Mit dem Team teilen', 'Küchenteams mit Rechten: Du verwaltest, dein Sous-Chef bearbeitet, der Rest liest mit.'],
      scale: ['Rezepte hochrechnen', 'Von 8 Gedecken auf 120, ohne Rechenfehler.'],
      print: ['Rezepte drucken', 'Ein einzelnes Rezept oder ein kompletter Rezeptordner auf einmal, sauber gedruckt für die Küche.'],
      cloud: [
  "Rezeptdatenbank und Archiv",
  "Alle Rezepte sicher in der Cloud, online und offline auf jedem Gerät."
],
      roadmap: ['Demnächst in Savour', 'Kosten pro Rezept, Allergene und der Verlauf jedes Rezepts.'],
      chefs: ['Köche', 'Für Küchenchefs, Sous-Chefs und Patissiers, die ihre Rezepturen bewahren wollen.'],
      brigade: ['Küchenbrigaden', 'Für das ganze Team: Chefs de Partie, Commis und Praktikanten.']
    }
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
      company: 'Savour · contact@savour.page', soon: 'Próximamente',
      madeBy: 'Hecho por chefs, para chefs.'
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
      h1: 'Todo tu recetario, en cada móvil de la cocina.',
      lead: 'Savour es la app de recetas para la cocina profesional. Tus archivos de Word, PDF y notas escritas a mano se convierten en un recetario ordenado, para ti y tu brigada. Segura en la nube, en cualquier dispositivo y también sin conexión.',
      proof: '1.400 recetas importadas de Word en 2 minutos. Probado en nuestra propia cocina.',
      story: [
        'En el reverso de un ticket. En un cuaderno que se pega tras diez años de servicio. En una foto que hiciste en el pase. Esas notas son el conocimiento de tu cocina, y se pierden, se borran o solo las entiende quien las escribió.',
        'Savour está hecho para guardar ese conocimiento. No volviendo a escribirlo todo, sino convirtiendo tus notas, carpetas y archivos de una vez en recetas correctas que toda tu brigada puede leer.'
      ],
      storyLink: 'Lee nuestra historia',
      featuresTitle: 'Qué hace Savour',
      audienceTitle: 'Para quién',
      soonTitle: 'En qué trabajamos',
      soonLink: 'Lo que viene',
      priceTitle: 'Empieza gratis',
      price: 'Hasta 100 recetas gratis, con el lector de Savour para Word, PDF y texto. Savour Pro cuesta 2,99 € al mes o 29 € al año: recetas ilimitadas, IA para notas escritas a mano y fotos, y tus propias equipos de cocina. Equipos desde 1,20 € por persona.',
      priceLink: 'Ver precios',
      faqTitle: 'Preguntas sobre Savour',
      faq: [
        ['¿Qué app uso para organizar las recetas de mi restaurante?', 'Savour está hecho para cocinas profesionales: importas tus recetas, las ordenas en carpetas y las compartes con tu equipo. Empiezas gratis.'],
        ['¿Cómo digitalizo recetas escritas a mano?', 'Haz una foto de la receta y súbela a Savour. La IA la convierte en una receta limpia con ingredientes y elaboración, que luego revisas.'],
        ['¿Puedo importar recetas de Word o PDF?', 'Sí. Incluso un archivo con cientos de recetas a la vez; Savour las separa solo.'],
        ['¿Cómo comparto recetas con mi equipo de cocina?', 'Con un equipo de cocina. Invitas a tus compañeros y les das permiso para ver o colaborar.'],
        ['¿Sirve Savour para la gestión de recetas en hostelería?', 'Sí. Savour está hecho para restaurantes, hoteles y catering: gestionar recetas de forma central, compartirlas con tu equipo de cocina y ordenarlas por partida, menú o local.'],
        [ "¿Savour funciona sin conexión?", "Sí. Abre Savour una vez con internet y añádelo a tu pantalla de inicio; después abres tus recetas sin conexión, por ejemplo en la cámara. Podrás editar de nuevo en cuanto estés en línea." ],
        [ "¿Dónde se guardan mis recetas?", "En la nube, separadas por cuenta. Las abres en ordenador, tableta y móvil, y solo tú y quienes invites a un equipo de cocina pueden leerlas." ],
        [ "¿Puedo imprimir una carpeta de recetas entera de una vez?", "Sí. Imprime recetas sueltas o una carpeta de recetas completa de una vez, bien maquetada para el archivador de la cocina. Con Savour Pro lleva el logo de tu restaurante." ],
        ['¿Savour también es para cocineros caseros?', 'Puede servir, pero Savour está hecho para la cocina profesional: grandes recetarios, equipos y el servicio.']
      ]
    },
    items: {
      digitise: ['Digitalizar recetas', 'Word, PDF y fotos de recetas escritas a mano en Savour de una vez.'],
      organise: ['Organizar recetas', 'Carpetas, categorías y búsqueda por ingrediente. Tu beurre blanc en tres segundos.'],
      share: ['Compartir con tu equipo', 'Equipos de cocina con permisos: tú gestionas, tu segundo edita, el resto consulta.'],
      scale: ['Escalar recetas', 'De 8 cubiertos a 120, sin errores de cálculo.'],
      print: ['Imprimir recetas', 'Una receta suelta o una carpeta de recetas completa de una vez, bien impresa para la cocina.'],
      cloud: [
  "Base de datos y archivo",
  "Todas tus recetas seguras en la nube, con y sin conexión en cualquier dispositivo."
],
      roadmap: ['Próximamente en Savour', 'Coste por receta, alérgenos y el historial de cada receta.'],
      chefs: ['Cocineros', 'Para jefes de cocina, segundos y pasteleros que quieren guardar sus recetas.'],
      brigade: ['Brigadas de cocina', 'Para todo el equipo: jefes de partida, ayudantes y becarios.']
    }
  }
};
