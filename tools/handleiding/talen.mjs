// Duits, Spaans en Frans: vaste teksten van de handleiding (knoppen, startpagina, sjabloon voor de pagina per
// recepten-app) en de release notes. De pagina's zelf staan in tools/handleiding/{de,es,fr}/*.mjs.
// Knopnamen zijn gelijk aan de vertalingen in de app (js/i18n/*.js).

export const TALEN = {
  de: {
    ui: {
      footer: 'Handbuch',
      releases: 'Versionshinweise',
      chapters: 'Kapitel',
      prev: 'Zurück',
      next: 'Weiter',
      overview: 'Übersicht Handbuch',
      open: 'Weiterlesen',
      inGroup: 'In diesem Abschnitt:',
      allTopics: 'Alle Themen im Handbuch',
      onPage: 'Auf dieser Seite',
      related: 'Siehe auch',
      version: 'Version'
    },
    titleSuffix: 'Handbuch Savour',
    home: {
      slug: 'de/handbuch',
      title: 'Savour-Handbuch: So arbeitest du mit der Rezept-App für Köche',
      desc: 'Das komplette Savour-Handbuch: Rezepte aus Word, PDF und Fotos importieren, bearbeiten, ordnen, umrechnen, Kochmodus, drucken, teilen und Küchenteams.',
      h1: 'Handbuch',
      lead: 'Alles über die Arbeit mit Savour, Schritt für Schritt: vom ersten Import und dem Umstieg aus einer anderen App bis zu einem Küchenteam, das mit denselben Rezepten arbeitet.'
    },
    releasesPage: {
      slug: 'de/versionshinweise',
      title: 'Versionshinweise: Was ist neu in Savour',
      desc: 'Alle Versionen von Savour und was in jeder Version neu oder verbessert ist: Import, Umrechnen, Küchenteams, Drucken, Teilen und mehr.',
      h1: 'Versionshinweise',
      lead: 'Was in jeder Version von Savour neu ist. Die neueste Version steht oben.'
    },
    app: {
      slug: s => `de/handbuch-import-aus-${s}`,
      menu: n => `Umstieg von ${n}`,
      h1: n => `Rezepte aus ${n} importieren`,
      title: n => `Rezepte aus ${n} in Savour importieren | Handbuch`,
      need: 'Was du brauchst',
      needText: (n, files) => `Einen Export aus ${n}: ${files}.`,
      exportHead: n => `Export aus ${n}`,
      importHead: 'Import in Savour',
      importIntro: 'Danach in Savour:',
      carriesHead: 'Was übernommen wird',
      categoryHead: 'Kategorie',
      steps: [
        'Wähle im Menü „Rezept hinzufügen“ und dann „Rezept importieren“.',
        'Wähle „Aus einer anderen Rezept-App“ und die Exportdatei. Eine ZIP-Datei musst du nicht entpacken.',
        'Wähle „Verarbeiten“. Savour liest alle Rezepte aus der Datei.',
        'Prüfe die Rezepte in der [Prüfansicht](#import-controleren) und wähle „Alle Rezepte speichern“.'
      ],
      category:
        'Die Kategorie: Steht ein Stichwort einer deiner [Kategorien](#categorie-trefwoorden) im Rezeptnamen, wählt Savour diese. Sonst übernimmt Savour die Kategorie aus der App, wenn du eine Kategorie mit genau diesem Namen hast, und andernfalls „Eigene Rezepte“. Du änderst sie pro Rezept in der Prüfansicht.'
    }
  },
  es: {
    ui: {
      footer: 'Manual',
      releases: 'Notas de versión',
      chapters: 'Capítulos',
      prev: 'Anterior',
      next: 'Siguiente',
      overview: 'Índice del manual',
      open: 'Leer más',
      inGroup: 'En esta sección:',
      allTopics: 'Todos los temas del manual',
      onPage: 'En esta página',
      related: 'Ver también',
      version: 'Versión'
    },
    titleSuffix: 'Manual de Savour',
    home: {
      slug: 'es/manual',
      title: 'Manual de Savour: cómo trabajar con la app de recetas para cocineros',
      desc: 'El manual completo de Savour: importar recetas de Word, PDF y fotos, editar, organizar, escalar, modo cocina, imprimir, compartir y equipos de cocina.',
      h1: 'Manual',
      lead: 'Todo sobre cómo trabajar con Savour, paso a paso: desde tu primera importación y el cambio desde otra app hasta un equipo de cocina que trabaja con las mismas recetas.'
    },
    releasesPage: {
      slug: 'es/notas-de-version',
      title: 'Notas de versión: novedades de Savour',
      desc: 'Todas las versiones de Savour y lo que es nuevo o ha mejorado en cada una: importación, escalado, equipos de cocina, impresión, compartir y más.',
      h1: 'Notas de versión',
      lead: 'Las novedades de cada versión de Savour. La más reciente está arriba.'
    },
    app: {
      slug: s => `es/manual-importar-desde-${s}`,
      menu: n => `Cambiar desde ${n}`,
      h1: n => `Importar recetas desde ${n}`,
      title: n => `Importar tus recetas de ${n} a Savour | Manual`,
      need: 'Qué necesitas',
      needText: (n, files) => `Una exportación de ${n}: ${files}.`,
      exportHead: n => `Exportar desde ${n}`,
      importHead: 'Importar en Savour',
      importIntro: 'Después, en Savour:',
      carriesHead: 'Qué se traspasa',
      categoryHead: 'Categoría',
      steps: [
        'Elige en el menú «Añadir receta» y después «Importar receta».',
        'Elige «Desde otra app de recetas» y el archivo exportado. No hace falta descomprimir un ZIP.',
        'Elige «Procesar». Savour lee todas las recetas del archivo.',
        'Revisa las recetas en la [pantalla de revisión](#import-controleren) y elige «Guardar todas las recetas».'
      ],
      category:
        'La categoría: si una palabra clave de una de tus [categorías](#categorie-trefwoorden) aparece en el nombre de la receta, Savour elige esa. Si no, usa la categoría de la app si tienes una con exactamente ese nombre, y si no, «Mis recetas». La cambias por receta en la pantalla de revisión.'
    }
  },
  fr: {
    ui: {
      footer: 'Manuel',
      releases: 'Notes de version',
      chapters: 'Chapitres',
      prev: 'Précédent',
      next: 'Suivant',
      overview: 'Sommaire du manuel',
      open: 'Lire la suite',
      inGroup: 'Dans cette section :',
      allTopics: 'Tous les sujets du manuel',
      onPage: 'Sur cette page',
      related: 'Voir aussi',
      version: 'Version'
    },
    titleSuffix: 'Manuel Savour',
    home: {
      slug: 'fr/manuel',
      title: 'Manuel Savour : bien utiliser l’application de recettes pour cuisiniers',
      desc: 'Le manuel complet de Savour : importer des recettes depuis Word, PDF et photos, modifier, organiser, adapter, mode cuisine, imprimer, partager et équipes de cuisine.',
      h1: 'Manuel',
      lead: 'Tout sur Savour, étape par étape : de ta première importation et du passage depuis une autre application jusqu’à une équipe de cuisine qui travaille avec les mêmes recettes.'
    },
    releasesPage: {
      slug: 'fr/notes-de-version',
      title: 'Notes de version : les nouveautés de Savour',
      desc: 'Toutes les versions de Savour et ce qui est nouveau ou amélioré dans chacune : importation, conversion, équipes de cuisine, impression, partage et plus.',
      h1: 'Notes de version',
      lead: 'Les nouveautés de chaque version de Savour. La plus récente est en haut.'
    },
    app: {
      slug: s => `fr/manuel-importer-depuis-${s}`,
      menu: n => `Passer de ${n} à Savour`,
      h1: n => `Importer des recettes depuis ${n}`,
      title: n => `Importer tes recettes ${n} dans Savour | Manuel`,
      need: 'Ce qu’il te faut',
      needText: (n, files) => `Un export de ${n} : ${files}.`,
      exportHead: n => `Exporter depuis ${n}`,
      importHead: 'Importer dans Savour',
      importIntro: 'Ensuite, dans Savour :',
      carriesHead: 'Ce qui est repris',
      categoryHead: 'Catégorie',
      steps: [
        'Choisis dans le menu « Ajouter une recette », puis « Importer une recette ».',
        'Choisis « Depuis une autre application de recettes » et le fichier exporté. Inutile de décompresser un ZIP.',
        'Choisis « Traiter ». Savour lit toutes les recettes du fichier.',
        'Vérifie les recettes dans l’[écran de vérification](#import-controleren) et choisis « Enregistrer toutes les recettes ».'
      ],
      category:
        'La catégorie : si un mot-clé d’une de tes [catégories](#categorie-trefwoorden) figure dans le nom de la recette, Savour choisit celle-ci. Sinon, il reprend la catégorie de l’application si tu as une catégorie portant exactement ce nom, et sinon « Mes recettes ». Tu la modifies par recette dans l’écran de vérification.'
    }
  }
};

// Release notes per versie in het Duits, Spaans en Frans (zelfde volgorde als RELEASES in site-handleiding.mjs).
export const RELEASES_TALEN = {
  '3.8.0': {
    de: [
      'Allergene pro Rezept, auch über Grundrezepte. Savour erkennt die Zutaten selbst anhand der Savour-Liste; du beantwortest nur die Fragen unter Prüfen.',
      'Standardmäßig die 14 Allergene; zusätzliche Merkmale wie Laktose oder Schweinefleisch schaltest du selbst ein.',
      'Eine Allergenkarte pro Rezept, und beim Drucken wählst du, ob die Allergene darauf kommen.',
      'Umrechnen mit ½×, 1×, 2×, 5×, 10× oder einem eigenen Faktor; die Ausbeute rechnet mit.',
      'Jedes Rezept hat eine eigene Adresse und den Rezeptnamen im Browser-Tab.',
      'Standardkategorien in deiner eigenen Sprache, und die Demo komplett auf Englisch, Deutsch, Spanisch und Französisch.'
    ],
    es: [
      'Alérgenos por receta, también a través de recetas base. Savour reconoce los ingredientes con la lista de Savour; tú solo respondes las preguntas en Revisar.',
      'Por defecto los 14 alérgenos; características extra como lactosa o cerdo las activas tú.',
      'Una tabla de alérgenos por receta, y al imprimir eliges si aparecen los alérgenos.',
      'Escalar con ½×, 1×, 2×, 5×, 10× o un factor propio; el rendimiento se ajusta.',
      'Cada receta tiene su propia dirección y su nombre en la pestaña del navegador.',
      'Categorías predeterminadas en tu idioma, y la demo completa en inglés, alemán, español y francés.'
    ],
    fr: [
      'Les allergènes par recette, y compris via les recettes de base. Savour reconnaît les ingrédients grâce à la liste Savour ; tu réponds seulement aux questions sous À vérifier.',
      'Les 14 allergènes par défaut ; les caractéristiques en plus, comme le lactose ou le porc, tu les actives toi-même.',
      'Un tableau des allergènes par recette, et à l’impression tu choisis si les allergènes y figurent.',
      'Convertir avec ½×, 1×, 2×, 5×, 10× ou ton propre facteur ; le rendement suit.',
      'Chaque recette a sa propre adresse et son nom dans l’onglet du navigateur.',
      'Les catégories par défaut dans ta langue, et la démo entièrement en anglais, allemand, espagnol et français.'
    ]
  },
  '3.7.0': {
    de: [
      'Umstieg aus noch mehr Rezept-Apps: Mela, Cookmate, Living Cookbook, Evernote, Google Keep, Flavorish und CookBookManager. Fotos und Zwischenüberschriften werden übernommen.',
      'Eine ZIP-Datei mit Word-, PDF-, Text- oder Markdown-Dateien oder nur mit Fotos wird in einem Schritt gelesen.',
      'Ein ausführliches Handbuch mit einer Seite pro Thema und pro Rezept-App.'
    ],
    es: [
      'Cambia desde aún más apps de recetas: Mela, Cookmate, Living Cookbook, Evernote, Google Keep, Flavorish y CookBookManager. Las fotos y los títulos se conservan.',
      'Un ZIP con archivos de Word, PDF, texto o Markdown, o solo con fotos, se lee de una vez.',
      'Un manual completo con una página por tema y por app de recetas.'
    ],
    fr: [
      'Passe à Savour depuis encore plus d’applications : Mela, Cookmate, Living Cookbook, Evernote, Google Keep, Flavorish et CookBookManager. Les photos et les intertitres sont repris.',
      'Un ZIP contenant des fichiers Word, PDF, texte ou Markdown, ou seulement des photos, est lu en une fois.',
      'Un manuel complet avec une page par sujet et par application de recettes.'
    ]
  },
  '3.6.0': {
    de: [
      'Küchenteams: ein Rezeptbuch für deine Brigade, mit eigener Startseite mit Ordnern und Bibliothek, Druck- und Einstellungsknopf.',
      'Rezepte in Teilen, etwa Teig, Füllung und Sauce, jeweils mit eigenen Zutaten und eigener Zubereitung.',
      'Notizen zu einem Rezept und Verknüpfungen von einer Zutat zu einem Grundrezept.',
      'Mehr Umrechnen: eigener Faktor, gewünschte Ausbeute oder „Ich habe“ in einem Fenster, Schnellknöpfe von ¼× bis 10×.',
      'Einen ganzen Rezeptordner drucken, und Savour Pro für alle in einer Organisation.',
      'Savour auf Französisch: die App und die ganze Website.',
      'Ein Willkommensbildschirm mit Startliste und Beispielrezepten für neue Nutzer.',
      'Der Savour-Leser lernt aus den Notizen von Köchen, und Rezepte werden nie mehr doppelt gespeichert.',
      'Smartphone: Rezept und Küchenteam kompakter.',
      'Werbung in der App für Konten ohne Pro.'
    ],
    es: [
      'Equipos de cocina: un recetario para tu brigada, con su propia página de inicio con carpetas y biblioteca, y botones para imprimir y ajustes.',
      'Recetas por partes, como masa, relleno y salsa, cada una con sus propios ingredientes y preparación.',
      'Notas en una receta y vínculos de un ingrediente a una receta base.',
      'Más opciones de escala: factor propio, rendimiento deseado o «Tengo» en una ventana, con botones rápidos de ¼× a 10×.',
      'Imprimir una carpeta de recetas entera, y Savour Pro para todos en una organización.',
      'Savour en francés: la app y toda la web.',
      'Una pantalla de bienvenida con lista de inicio y recetas de ejemplo para usuarios nuevos.',
      'El lector de Savour aprende de las notas de los cocineros, y las recetas ya no se guardan dos veces.',
      'Móvil: receta y equipo de cocina más compactos.',
      'Anuncios en la app para cuentas sin Pro.'
    ],
    fr: [
      'Équipes de cuisine : un livre de recettes pour ta brigade, avec sa propre page d’accueil avec dossiers et bibliothèque, et des boutons pour imprimer et les paramètres.',
      'Recettes en plusieurs parties, comme pâte, garniture et sauce, chacune avec ses ingrédients et sa préparation.',
      'Notes sur une recette et liens d’un ingrédient vers une recette de base.',
      'Plus de conversion : facteur libre, rendement voulu ou « J’ai » dans une fenêtre, avec des boutons rapides de ¼× à 10×.',
      'Imprimer un dossier de recettes entier, et Savour Pro pour tous dans une organisation.',
      'Savour en français : l’application et tout le site.',
      'Un écran de bienvenue avec une liste de départ et des recettes d’exemple pour les nouveaux utilisateurs.',
      'Le lecteur Savour apprend des notes des cuisiniers, et les recettes ne sont plus jamais enregistrées deux fois.',
      'Téléphone : recette et équipe de cuisine plus compactes.',
      'Publicités dans l’application pour les comptes sans Pro.'
    ]
  },
  '3.5.0': {
    de: [
      'Import-Service: Die Köche hinter Savour übertragen deinen ganzen Rezeptordner für dich, mit Anfrage, Bezahlung und Upload auf der Website.',
      'Abos für Organisationen mit 5, 10 und 25 Personen.',
      'Nur der Eigentümer entfernt Personen aus einem geteilten Ordner.'
    ],
    es: [
      'Servicio de importación: los cocineros detrás de Savour traspasan toda tu carpeta de recetas, con solicitud, pago y entrega en la web.',
      'Suscripciones para organizaciones de 5, 10 y 25 personas.',
      'Solo el propietario quita a personas de una carpeta compartida.'
    ],
    fr: [
      'Service d’importation : les cuisiniers derrière Savour transfèrent tout ton classeur de recettes, avec demande, paiement et envoi sur le site.',
      'Abonnements pour les organisations de 5, 10 et 25 personnes.',
      'Seul le propriétaire retire des personnes d’un dossier partagé.'
    ]
  },
  '3.4.0': {
    de: [
      'Umrechnen mit Einheiten: von Teelöffeln zu Esslöffeln, von Kilo zu Gramm, mit sauberen Brüchen.',
      'Import von einer Webseite und aus anderen Rezept-Apps wie Paprika, Mealie und Tandoor.',
      'Öffentliche Rezeptlinks mit Zeitlimit, und einen Link ausschalten.',
      'Umrechnen und Kochmodus auch für alle, die ein geteiltes Rezept ohne Konto öffnen.',
      'Teilen per SMS und ein Knopf für das helle oder dunkle Design.',
      'Der Savour-Leser liest auch alte .doc-Dateien.',
      'Passwort vergessen und Anmelden mit einer noch nicht bestätigten E-Mail-Adresse funktionieren klarer.'
    ],
    es: [
      'Escalar con unidades: de cucharaditas a cucharadas, de kilos a gramos, con fracciones limpias.',
      'Importar desde una página web y desde otras apps de recetas como Paprika, Mealie y Tandoor.',
      'Enlaces públicos de recetas con límite de tiempo, y desactivar un enlace.',
      'Escalar y modo cocina también para quien abre una receta compartida sin cuenta.',
      'Compartir por SMS y un botón para el tema claro u oscuro.',
      'El lector de Savour también lee archivos .doc antiguos.',
      'Olvidar la contraseña e iniciar sesión con un correo aún sin confirmar funcionan de forma más clara.'
    ],
    fr: [
      'Conversion avec unités : des cuillères à café aux cuillères à soupe, des kilos aux grammes, avec des fractions nettes.',
      'Importation depuis une page web et depuis d’autres applications comme Paprika, Mealie et Tandoor.',
      'Liens publics de recettes avec limite de temps, et désactivation d’un lien.',
      'Conversion et mode cuisine aussi pour ceux qui ouvrent une recette partagée sans compte.',
      'Partage par SMS et un bouton pour le thème clair ou sombre.',
      'Le lecteur Savour lit aussi les anciens fichiers .doc.',
      'Mot de passe oublié et connexion avec une adresse e-mail non confirmée fonctionnent plus clairement.'
    ]
  },
  '3.3.0': {
    de: [
      'Rezept übernehmen: Der Ersteller kann Empfängern erlauben, ein geteiltes Rezept zu ihren eigenen Rezepten hinzuzufügen, auch für eine begrenzte Zeit.',
      'Geteilte Ordner: Ordner verwalten, archivieren und Rezepte von Kollegen übernehmen.',
      'Erklärung für jeden Bildschirm hinter dem i-Knopf.',
      'Download als echte Word-Datei (.docx) mit Savour Pro.',
      'Neues Drucklayout mit fetten Mengen und einem kompakten Inhaltsverzeichnis.',
      'Einen Kollegen einladen und Pro geschenkt bekommen.',
      'Ein geteiltes Rezept hat ein eigenes Vorschaubild in WhatsApp.'
    ],
    es: [
      'Copiar recetas: el autor puede permitir que los destinatarios añadan una receta compartida a sus propias recetas, también por tiempo limitado.',
      'Carpetas compartidas: gestionar y archivar carpetas, y copiar recetas de compañeros.',
      'Una explicación para cada pantalla tras el botón i.',
      'Descarga como archivo de Word real (.docx) con Savour Pro.',
      'Nuevo diseño de impresión con cantidades en negrita y un índice compacto.',
      'Invita a un colega y recibe Pro de regalo.',
      'Una receta compartida tiene su propia imagen de vista previa en WhatsApp.'
    ],
    fr: [
      'Copier une recette : l’auteur peut autoriser les destinataires à ajouter une recette partagée à leurs propres recettes, aussi pour une durée limitée.',
      'Dossiers partagés : gérer et archiver des dossiers, et copier les recettes de collègues.',
      'Une explication pour chaque écran derrière le bouton i.',
      'Téléchargement en vrai fichier Word (.docx) avec Savour Pro.',
      'Nouvelle mise en page d’impression avec quantités en gras et un sommaire compact.',
      'Invite un collègue et reçois Pro en cadeau.',
      'Une recette partagée a sa propre image d’aperçu dans WhatsApp.'
    ]
  },
  '3.2.0': {
    de: [
      'Drucken mit dem Logo deines Restaurants (Savour Pro und Teams).',
      'Selbst wählen, welche Rezepte du druckst.',
      'Zurück aus einem Rezept landest du wieder an derselben Stelle in der Liste.'
    ],
    es: [
      'Imprimir con el logo de tu restaurante (Savour Pro y equipos).',
      'Elegir qué recetas imprimes.',
      'Al volver de una receta regresas al mismo punto de la lista.'
    ],
    fr: [
      'Imprimer avec le logo de ton restaurant (Savour Pro et équipes).',
      'Choisir les recettes à imprimer.',
      'En revenant d’une recette, tu retrouves le même endroit dans la liste.'
    ]
  },
  '3.1.0': {
    de: [
      'Offline arbeiten: Rezepte, die du geöffnet hast, bleiben ohne Internet verfügbar.',
      'Die Original-Notiz bleibt bei einem Rezept gespeichert, das von einem Foto gelesen wurde.',
      'Kamera für Notizen direkt in der App (Savour Pro).',
      'Schnellerer Start.'
    ],
    es: [
      'Trabajar sin conexión: las recetas que has abierto siguen disponibles sin internet.',
      'La nota original se guarda con una receta leída de una foto.',
      'Cámara para notas directamente en la app (Savour Pro).',
      'Arranque más rápido.'
    ],
    fr: [
      'Travailler hors ligne : les recettes que tu as ouvertes restent disponibles sans internet.',
      'La note d’origine est conservée avec une recette lue depuis une photo.',
      'Appareil photo pour les notes directement dans l’application (Savour Pro).',
      'Démarrage plus rapide.'
    ]
  },
  '3.0.0': {
    de: [
      'Savour 3.0: eine neue, überarbeitete Version mit einer neuen Rezeptseite.',
      'Der Savour-Leser neu gebaut und an echten Rezeptdateien getestet; der PDF-Import funktioniert.',
      'Savour Pro: unbegrenzt Rezepte und KI für Fotos und Zweifelsfälle; kostenlos bis 100 Rezepte.',
      'Englisch, Deutsch und Spanisch mit einem Sprachknopf oben.',
      'Kategorien vorschlagen anhand von Stichwörtern im Rezeptnamen, mit einer Standardliste für die Küche.',
      'Doppelte Rezepte in den Einstellungen bereinigen.',
      'Zusammenarbeiten in geteilten Ordnern.'
    ],
    es: [
      'Savour 3.0: una versión nueva y rediseñada con una nueva página de receta.',
      'El lector de Savour reconstruido y probado con archivos de recetas reales; la importación de PDF funciona.',
      'Savour Pro: recetas ilimitadas e IA para fotos y casos dudosos; gratis hasta 100 recetas.',
      'Inglés, alemán y español con un botón de idioma arriba.',
      'Sugerir categorías según palabras clave del nombre de la receta, con una lista estándar para cocina.',
      'Limpiar recetas duplicadas en los ajustes.',
      'Trabajar juntos en carpetas compartidas.'
    ],
    fr: [
      'Savour 3.0 : une nouvelle version repensée avec une nouvelle page de recette.',
      'Le lecteur Savour reconstruit et testé sur de vrais fichiers de recettes ; l’import PDF fonctionne.',
      'Savour Pro : recettes illimitées et IA pour les photos et les cas douteux ; gratuit jusqu’à 100 recettes.',
      'Anglais, allemand et espagnol avec un bouton de langue en haut.',
      'Proposer des catégories selon des mots-clés du nom de la recette, avec une liste par défaut pour la cuisine.',
      'Nettoyer les recettes en double dans les paramètres.',
      'Travailler ensemble dans des dossiers partagés.'
    ]
  }
};
