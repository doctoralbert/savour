// Web en español: todas las páginas en savour.page/es/... (construidas por tools/build-seo.mjs).
// El menú y la portada están en tools/site-content-extra.mjs; aquí el contenido de cada página.
// Los artículos del blog se enlazan por su slug en inglés.
export const ES = {
  ui: {
    readArticle: 'Leer el artículo',
    blogLead:
      'Artículos prácticos sobre digitalizar recetas, ordenar carpetas de recetas, tu equipo de cocina y la gestión de recetas en restaurantes.',
    more: 'Leer más',
    logoLine: 'De la nota a una receta que funciona. Hecho por cocineros, para cocineros.',
    soonMail: '¿Quieres aportar ideas? Escríbenos a'
  },
  blogSlug: 'es/blog',
  blogTitle: 'Blog sobre gestión de recetas y cocina — Savour',
  legacy: {
    pro: {
      slug: 'es/precios',
      title: 'Precios — Savour Pro y planes de equipo',
      h1: 'Precios',
      desc: 'Empieza gratis con hasta 100 recetas. Savour Pro desde 2,99 € al mes: recetas ilimitadas, IA para notas a mano y carpetas compartidas. También para equipos.'
    },
    faq: {
      slug: 'es/preguntas-frecuentes',
      title: 'Preguntas frecuentes sobre Savour',
      desc: 'Respuestas sobre Savour: importar recetas de Word, PDF y fotos, gratis y Pro, carpetas compartidas y trabajar en la cocina.'
    },
    guide: {
      slug: 'es/guia',
      title: 'Guía: trabajar con recetas en Savour',
      desc: 'Paso a paso: importa tu recetario, ordénalo en carpetas y categorías, escala recetas, modo cocina, imprime y comparte con tu equipo.'
    },
    contact: {
      slug: 'es/contacto',
      title: 'Contacto — Savour',
      desc: '¿Preguntas sobre Savour, la gestión de recetas de tu restaurante o un plan de equipo? Escríbenos con el formulario o a contact@savour.page.'
    },
    terms: {
      slug: 'es/terminos',
      title: 'Términos y condiciones — Savour',
      desc: 'Los términos y condiciones de Savour: cuenta gratuita, Savour Pro, planes de equipo, cancelación y derecho de desistimiento.'
    },
    privacy: {
      slug: 'es/privacidad',
      title: 'Política de privacidad — Savour',
      desc: 'Cómo trata Savour tus datos y recetas: qué guardamos, para qué, con quién trabajamos y qué derechos tienes.'
    }
  },
  features: {
    digitise: {
      slug: 'es/digitalizar-recetas',
      title: 'Digitalizar recetas: Word, PDF y notas escritas a mano | Savour',
      desc: 'Digitaliza tus recetas sin volver a escribirlas. Importa Word y PDF de una vez y deja que lean tus notas y fotos escritas a mano. Nunca se inventan cantidades.',
      h1: 'Digitaliza tus recetas sin volver a escribirlas',
      lead: 'Tus cuadernos de recetas, archivos de Word y notas con manchas de café se convierten de una vez en un recetario ordenado.',
      sections: [
        ['Word y PDF de una vez', 'Arrastra un archivo de Word o un PDF a Savour, aunque contenga cientos de recetas. El lector de Savour detecta dónde empieza y termina cada receta y coloca el título, los ingredientes y la elaboración en su sitio. Los números delante de los títulos y pequeñas erratas, como 18oc en lugar de 180 °C, se corrigen. Un cocinero importó así 1.400 recetas en unos dos minutos.'],
        ['Recetas escritas a mano y fotos', 'Haz una foto de una nota, de una página de tu cuaderno o un escaneo de una carpeta antigua. La IA lee la letra y la convierte en una receta limpia, aunque la foto esté torcida o el papel manchado. Forma parte de Savour Pro.'],
        [ "Orden en carpetas de recetas grandes y desordenadas", "¿Una carpeta con cientos de recetas de distintos chefs, con números, títulos sueltos y recetas que empiezan a mitad de página? Savour las separa solo, reconoce partes como la masa y el relleno, corrige errores ortográficos habituales y propone una categoría para cada receta. Las recetas en las que el lector tiene dudas las vuelve a leer la IA con Savour Pro. Tú lo revisas todo en un solo resumen antes de guardar." ],
        ['Nada inventado', 'Una receta tiene que ser correcta. Savour nunca inventa cantidades, ingredientes ni pasos. Si el lector tiene dudas, la receta se marca y la revisas tú antes de guardarla.'],
        ["Desde una web u otra app","Pega el enlace de una receta en una web y Savour extrae la receta. ¿Vienes de otra app de recetas, como Paprika, Mealie, Tandoor, Recipe Keeper, Crouton, MasterCook, Copy Me That o Plan to Eat? Haz una exportación allí y pasa el archivo a Savour de una vez."],
        ['Y luego, a seguir', 'Cada receta importada se puede editar, añadirle una foto, ponerla en una carpeta y compartirla con tu brigada.']
      ]
    },
    organise: {
      slug: 'es/organizar-recetas',
      title: 'Organizar recetas: gestión de recetas para restaurantes | Savour',
      desc: 'Gestión de recetas para restaurantes y hostelería: todas tus recetas en un recetario, con tus propias carpetas y categorías, búsqueda por ingrediente y favoritas.',
      h1: 'Organiza tus recetas como trabaja tu cocina',
      lead: 'Un recetario para todo lo que has cocinado, ordenado a tu manera.',
      sections: [
        ['Tu estructura', 'Salsas, fondos, guarniciones, pastelería, el menú degustación de esta temporada. Tú creas las carpetas y categorías. Una receta puede estar en varias carpetas, así tu jugo pertenece a los fondos y al plato de cordero.'],
        ['Busca por lo que recuerdas', '¿Solo recuerdas que llevaba yuzu? Savour busca en títulos, ingredientes y elaboración. O recorre todo tu recetario de la A a la Z.'],
        ['Tranquilo y rápido', 'Sin pantallas recargadas. Una lista de títulos, una estrella para tus favoritas y un toque hasta la receta. Hecho para consultar en pleno servicio.'],
        ['En cualquier dispositivo', 'Organiza e importa en el ordenador y usa el móvil o la tableta en la cocina con letra grande en el modo cocina. Sin instalar nada.']
      ]
    },
    share: {
      slug: 'es/compartir-recetas',
      title: 'Compartir recetas con tu equipo de cocina y tu brigada | Savour',
      desc: 'Comparte recetas con tu carpeta compartida en carpetas compartidas con permisos. Todos trabajan con la misma versión, del segundo de cocina al becario.',
      h1: 'Comparte recetas con tu brigada',
      lead: 'Todos en la cocina trabajan con la misma versión. Se acabaron las fotos de fotos en el grupo de WhatsApp.',
      sections: [
        ['Carpetas compartidas', 'Crea una carpeta para tu cocina, tu partida o el nuevo menú e invita a tu equipo. Lo que cambias lo ven todos al instante.'],
        ['Permisos por persona', 'Tú gestionas la carpeta. Tu segundo o jefe de partida puede añadir y editar recetas. Ayudantes y becarios pueden consultar, pero no cambiar nada.'],
        ['Gente nueva al día más rápido', 'Un cocinero nuevo tiene desde el primer día todas las recetas de la partida en el móvil, en la versión que tú aprobaste.'],
        ['Compartir recetas sueltas', '¿Quieres enviar una receta, por ejemplo a un compañero de otro restaurante? Compártela con un enlace.']
      ]
    },
    scale: {
      slug: 'es/escalar-recetas',
      title: 'Escalar y convertir recetas a cualquier rendimiento | Savour',
      desc: 'Escala recetas hacia arriba o hacia abajo a cualquier rendimiento: de una degustación para 8 a una cena para 120. Savour convierte cada cantidad.',
      h1: 'Escala recetas a cualquier rendimiento',
      lead: 'De una degustación para 8 a una cena para 120, sin calculadora y sin errores.',
      sections: [
        ['Convierte de una vez', 'Introduce el rendimiento que necesitas y Savour convierte cada cantidad. La receta original se queda como está.'],
        ["Entiende las unidades","Savour sabe que 3 cucharaditas son una cucharada y 1000 gramos un kilo. 20 cucharaditas se convierten en 6 ⅔ cucharadas, y las cucharas y tazas quedan como fracciones limpias en lugar de decimales largos. Incluso sin rendimiento, escala con un toque: ½×, 2×, 3× o 4×."],
        ['Contar por piezas', '¿Una receta da 50 brownies y necesitas 1.000 para un evento? Introduce el número de piezas y verás al momento qué tienes que pesar.'],
        ['Listo para la mise en place', 'Imprime la receta convertida al momento o ábrela en el móvil en modo cocina.']
      ]
    },
    print: {
      slug: 'es/imprimir-recetas',
      title: 'Imprimir recetas: recetas sueltas y carpetas de recetas completas | Savour',
      desc: 'Imprime una receta suelta o una carpeta de recetas completa de una vez, con un diseño limpio para la pared, el pase o la carpeta de cocina. Con Savour Pro, con el logo de tu restaurante.',
      h1: 'Imprimir recetas',
      lead: 'Imprime una receta para la pared o una carpeta de recetas completa para el archivador. Rápido, limpio y siempre la versión correcta.',
      sections: [
        ['Imprimir una receta suelta', 'Abre una receta y elige Imprimir. Obtienes una página tranquila con título, rendimiento, ingredientes y elaboración. ¿Has escalado la receta, por ejemplo a 40 cubiertos? Entonces imprimes justo esas cantidades.'],
        ['Imprimir una carpeta de recetas completa', '¿Todas las recetas de helado tienen que ir a la carpeta de pastelería? Abre la carpeta e imprímela de una vez: cada receta en su propia página, en el orden de tu carpeta. Se acabó imprimir cincuenta archivos uno a uno.'],
        ['Diseño tranquilo', 'Grande y claro. Legible a un metro, incluso con una mancha encima.'],
        ['Siempre la última versión', 'Como imprimes desde Savour, en la pared siempre está la versión correcta. Abajo aparece la fecha de impresión, para que veas si una carpeta sigue al día.'],
        ['Con el logo de tu restaurante', 'Con Savour Pro, cada página lleva arriba el logo y el nombre de tu restaurante. En un equipo, el logo vale para todos. Elige A4 para la carpeta o A5 para una carpeta pequeña en el pase.']
      ]
    },
    cloud: {
      "slug": "es/base-de-datos-de-recetas",
      "title": "Base de datos y archivo de recetas en la nube, también sin conexión | Savour",
      "desc": "Savour es tu base de datos y archivo de recetas en la nube: todas tus recetas guardadas de forma segura en línea, en ordenador, tableta y móvil, y disponibles sin internet en la cocina.",
      "h1": "Tu base de datos de recetas, con y sin conexión",
      "lead": "Todas tus recetas en un lugar seguro en la nube. En cualquier dispositivo, aunque se caiga el wifi en la cámara.",
      "sections": [
        [
          "Una base de datos de recetas en la nube",
          "Todas tus recetas están en un solo lugar en la nube, ya no repartidas entre portátiles, móviles y memorias USB. Si se rompe tu móvil o estrenas portátil, inicias sesión y todo vuelve a estar ahí. Lo que cambias en el ordenador lo ves al momento en el móvil."
        ],
        [
          "En cualquier dispositivo",
          "En el ordenador importas y organizas; en la cocina abres la misma receta en el móvil o la tableta. Savour funciona en el navegador y se instala en tu pantalla de inicio sin tienda de apps: en iPhone, Android, tableta y ordenador."
        ],
        [
          "También sin conexión",
          "En la cámara, el sótano o un evento el wifi falla a menudo. Si has abierto Savour una vez con internet, tu biblioteca queda guardada en el dispositivo y abres tus recetas sin conexión. Podrás editar de nuevo en cuanto vuelvas a estar en línea."
        ],
        [
          "Un archivo que permanece",
          "Menús de temporadas pasadas, recetas de un chef anterior, el menú degustación de hace tres años: en Savour no pierdes nada. Ponlos en una carpeta de archivo y seguirán siendo fáciles de buscar. Si algún día dejas Pro, todas tus recetas siguen ahí."
        ],
        [
          "Seguro y tuyo",
          "Tus recetas solo las ves tú y las personas que invitas a una carpeta compartida; se guardan separadas por cuenta. Con Savour Pro descargas tu recetario completo cuando quieras, como archivos de Word o como copia de seguridad."
        ]
      ]
    },
    roadmap: {
      slug: 'es/proximamente',
      short: 'Coste por receta, alérgenos y el historial de cada receta.',
      title: 'Próximamente en Savour: escandallos, alérgenos y más',
      desc: 'En qué trabajamos: coste por receta, alérgenos por plato, el historial de cada receta y una app para iPhone y Android.',
      h1: 'En qué estamos trabajando',
      lead: 'Savour crece con la cocina. Esto está en la hoja de ruta. ¿Echas algo en falta? Cuéntanoslo.',
      sections: [
        ['Coste por receta', 'Mira lo que cuesta cada plato y cada ración, y qué pasa cuando cambia el precio de un producto.'],
        ['Alérgenos de un vistazo', 'Por receta y por plato compuesto, para responder al momento en la mesa la pregunta de un cliente.'],
        ['Historial de cada receta', 'Mira quién cambió qué en una receta compartida y recupera una versión anterior cuando haga falta.'],
        ['Una app para iPhone y Android', 'Savour funciona ahora en el navegador de cualquier dispositivo. Estamos valorando una app propia, y tu opinión cuenta.']
      ]
    }
  },
  audiences: {
    chefs: {
      slug: 'es/para-cocineros',
      title: 'App de recetas para chefs, segundos de cocina y pasteleros | Savour',
      desc: 'Savour está hecho para cocineros de cocina profesional: jefes de cocina, segundos y pasteleros. Todas tus recetas en un sitio, exactamente como las escribiste.',
      h1: 'Para cocineros',
      lead: 'Tanto si diriges la cocina, haces las salsas o trabajas en pastelería: tus recetas tienen que ser correctas y fáciles de encontrar.',
      sections: [
        ['Tus recetas, un solo sitio', 'Menús de temporada, menús degustación, recetas base de hace años. En Savour todo está en un recetario, ordenado como trabajas.'],
        ['Preciso, al gramo', 'En pastelería una receta es una fórmula. Savour guarda tus recetas exactamente como las escribiste y nunca inventa cantidades. Si el lector tiene dudas al importar, lo revisas tú.'],
        ['Escalar por cubiertos y piezas', 'De una degustación para 8 a una cena para 120, o de 50 bombones a 800. Savour lo convierte todo.'],
        ['Tu conocimiento se queda', 'Lo que has construido durante años ya no vive solo en un cuaderno o en tu cabeza. Se queda, aunque cambies de cocina.']
      ]
    },
    brigade: {
      slug: 'es/para-brigadas-de-cocina',
      title: 'Gestión de recetas para brigadas de cocina | Savour',
      desc: 'Savour para brigadas de cocina: jefes de partida, ayudantes y becarios trabajan con las mismas recetas, en su propio móvil. Tú decides quién puede hacer qué.',
      h1: 'Para brigadas de cocina',
      lead: 'Del jefe de partida al becario: todo tu equipo de cocina cocina con la misma receta, en cada restaurante que diriges.',
      sections: [
        ['Una versión para todos', 'Ajusta una salsa para el nuevo menú y todos en la carpeta compartida trabajan al momento con la nueva versión.'],
        ['Permisos por persona', 'Tú gestionas la carpeta. Tu segundo o jefe de partida puede añadir y editar recetas. Ayudantes y becarios pueden consultar, pero no cambiar nada.'],
        ['En su propio móvil', 'Se acabó la carpeta común llena de manchas. Cada miembro de la brigada abre las recetas de su partida en su propio móvil, con letra grande en el modo cocina.'],
        ['Gente nueva al día más rápido', 'Becarios y cocineros nuevos leen cómo se hacen las cosas aquí, en lugar de preguntar durante el servicio. Ser miembro de una carpeta compartida es gratis; con un plan de equipo todos tienen Savour Pro.']
      ]
    }
  },
  story: {
    slug: 'es/sobre-savour',
    title: 'Sobre Savour: creado por un cocinero, no por una empresa de software',
    desc: 'La historia detrás de Savour: quince años de recetas en papeles sueltos, pulsar imprimir cincuenta veces y una app de recetas construida después del servicio.',
    h1: 'La historia detrás de Savour',
    lead: 'Savour lo creó un cocinero, no una empresa de software. Por la frustración de tener recetas en todas partes, menos donde las necesitabas.',
    chapters: [
      ['Quince años de recetas en papeles sueltos', ['El cocinero detrás de Savour lleva quince años en cocinas. Todo ese tiempo las recetas fueron un caos: papeles con manchas de café, fotos en distintos móviles, algunos de los cuales se rompieron antes de guardar las recetas, y documentos de Word repartidos por carpetas y portátiles.', 'Lo más difícil ni siquiera era el desorden, sino que nada estaba en un solo sitio. Justo cuando necesitabas una receta, en plena mise en place o justo antes del servicio, no aparecía por ningún lado.']],
      ['Pulsar imprimir cincuenta veces', ['Como jefe de cocina pasas casi todas las recetas a tus cocineros. Cuando por fin todo estaba en archivos de Word separados, llegó el siguiente problema: sala tenía que imprimirlos uno a uno, porque no había forma de imprimir cincuenta a la vez.', 'En algún lugar entre esas pilas de papel surgió la pregunta con la que empezó Savour: ¿por qué no hay nada para esto que funcione sin más en una cocina de verdad?']],
      ['Construido después del servicio', ['No un desarrollador, sino un cocinero que sabe exactamente dónde duele. Savour se construyó paso a paso, durante meses, los fines de semana y después del servicio.', 'Cada función se probó con nuestras propias recetas, en nuestra propia cocina: importar cientos de recetas de Word a la vez, fotos de notas manchadas que por error estaban del revés y carpetas que todo el equipo puede abrir. Un cocinero importó así 1.400 recetas en unos dos minutos.']],
      ['Por qué Savour cuesta 2,99 €', ['Para los casos difíciles, como la foto de una nota escrita a mano, Savour usa IA. Eso cuesta dinero cada vez, y por eso existe Savour Pro.', 'Pero Savour tenía que seguir siendo asequible para cualquier cocinero, no solo para grandes grupos con grandes presupuestos. 2,99 € al mes es más o menos lo que cuesta esa IA. Lo que Savour puede leer por sí mismo, como Word y PDF, sigue siendo gratis, igual que guardar hasta 100 recetas.']],
      ['Lo que Savour hace hoy', ['Importar todo tu recetario en unos minutos. Ordenar recetas en carpetas, por ejemplo todas tus recetas de helado, e imprimir esa carpeta entera con un solo botón. Compartir recetas y carpetas con compañeros, que pueden añadir recetas ellos mismos.', 'Y escalar: ¿una receta da cincuenta brownies y necesitas mil? Savour hace las cuentas. En el ordenador, la tableta y el móvil de la cocina.']],
      ['Lo que aún queremos construir', ['El coste por receta y los alérgenos de un vistazo encabezan la lista. Si Savour funciona bien en ordenador, tableta y móvil, veremos si merece la pena una app propia para iPhone y Android.', 'Eso no lo decidimos detrás de un escritorio, sino junto con los cocineros que usan Savour. ¿Echas algo en falta en tu cocina? Cuéntanoslo.']]
    ],
    notesCaption: 'Algunas de las notas con las que empezó Savour.',
    appCaption: 'El mismo tipo de receta, ahora en Savour.',
    roadmapLink: 'Mira en qué estamos trabajando',
    valuesTitle: 'Lo que defendemos',
    values: [
      ['Una receta tiene que ser correcta', 'Savour nunca inventa cantidades ni pasos. Ante la duda, lo ves tú y decides tú.'],
      ['Tu conocimiento es tuyo', 'Si algún día dejas Pro, todas tus recetas se quedan.'],
      ['Hecho para la cocina', 'Rápido, tranquilo y legible, incluso con las manos mojadas en pleno servicio.']
    ]
  },
  posts: {
    "en/blog/have-your-recipe-folder-moved-over": {
      "slug": "es/blog/traspasar-tu-recetario",
      "title": "Traspasar tu recetario: por qué las cocinas lo aplazan y cómo sí se consigue",
      "desc": "Por qué las cocinas siempre aplazan su recetario, qué falla cuando se hace a medias y cómo los cocineros detrás de Savour cargan tus recetas y lo preparan todo para tu brigada.",
      "h1": "Traspasar tu recetario: por qué las cocinas lo aplazan y cómo sí se consigue",
      "lead": "Casi todos los chefs quieren sus recetas en digital. Casi nadie tiene tiempo para pasarlas. Por eso los cocineros detrás de Savour lo hacen por ti.",
      "sections": [
        [
          "Por qué se queda pendiente",
          "Pasar un recetario no es trabajo para entre servicios. Cientos de recetas repartidas entre archivos Word, libretas y fotos, y cada receta hay que copiarla, revisarla y darle un sitio. Así que la carpeta espera, hasta que alguien se va o la carpeta desaparece."
        ],
        [
          "Qué falla cuando se hace a medias",
          "Si un becario lo pasa todo a mano, aparecen errores en las cantidades. Un escáner sin revisión convierte sin avisar 1 cucharada en 1 litro. Digitalizar a medias es peor que no hacerlo: nadie se fía de la app y la carpeta de papel vuelve al pase."
        ],
        [
          "Tú eliges la estructura",
          "Eliges un paquete y solicitas el servicio de importación. Tras la aprobación pagas y nos lo envías todo: Word, PDF, fotos de libretas y notas o exportaciones de otra app. Tú nos indicas tu estructura de carpetas, por partida, por tipo o por menú, tal como trabaja tu cocina."
        ],
        [
          "Cada receta revisada",
          "Lo leemos todo con el lector de Savour y comparamos cada receta con el original: cantidades, unidades, rendimiento y elaboración. Donde la fuente deja dudas, miramos con más cuidado. Nunca se inventa nada; lo que no está, no lo rellenamos."
        ],
        [
          "Todo listo para tu brigada",
          "Nos das los correos de tus compañeros. Cada uno recibe una cuenta con Savour Pro, acceso a las recetas y un correo para elegir su contraseña. El primer día toda tu brigada abre el mismo recetario, en el móvil, la tablet del pase y el ordenador de la oficina."
        ],
        [
          "Tus recetas siguen siendo tuyas",
          "Los archivos que envías se guardan en un almacenamiento privado que solo Savour puede ver y se borran en cuanto tu equipo está lista. Después tus recetas solo están en tu equipo."
        ],
        [
          "Cuánto cuesta",
          "Pago único de 85 € hasta 100 recetas, 100 € hasta 500 y 164,99 € hasta 1.000, junto con un plan anual para tu equipo de 5, 10 o 25 personas. Más recetas, a convenir. Las primeras cinco cocinas las cargamos gratis."
        ]
      ],
      "outro": "¿Quieres saber más o solicitarlo? Mira «Servicio de importación» en savour.page."
    },
    "en/blog/recipe-database-in-the-cloud": {
      "slug": "es/blog/base-de-datos-de-recetas-en-la-nube",
      "title": "Una base de datos de recetas para tu cocina: con conexión, sin conexión y en la nube",
      "desc": "Por qué toda cocina profesional necesita una base de datos de recetas, por qué debe estar en la nube, cómo acceder a tus recetas sin conexión y cómo crear un archivo de recetas.",
      "h1": "Una base de datos de recetas para tu cocina: con conexión, sin conexión y en la nube",
      "lead": "La mayoría de las cocinas tienen sus recetas en diez sitios a la vez. Una base de datos de recetas lo reúne todo en un solo lugar que puedes abrir desde cualquier parte.",
      "sections": [
        [
          "El problema: recetas en diez sitios",
          "Archivos de Word en el portátil del chef anterior, fotos en tres móviles, una carpeta manchada en el pase. Cualquiera de esos sitios puede desaparecer: un móvil roto, un compañero que se va, una carpeta que acaba en la zona de fregado."
        ],
        [
          "Qué hace una buena base de datos de recetas",
          "Todas las recetas en un solo lugar, con búsqueda por título, ingrediente y elaboración. Cada receta con la misma estructura: título, rendimiento, ingredientes y pasos. Y con carpetas y categorías, para no tener que recorrer cientos de recetas."
        ],
        [
          "Por qué en la nube",
          "Si tu base de datos está en la nube, es la misma en todas partes: en el ordenador de la oficina, en la tableta del pase y en tu móvil en casa. Un cambio se ve al instante en todas partes, y un móvil nuevo solo significa volver a iniciar sesión."
        ],
        [
          "Y sin conexión en la cocina",
          "Las cocinas son malas para el wifi: acero, cámaras frigoríficas, sótanos. Por eso conviene una app de recetas que también funcione sin conexión. En Savour abres tus recetas en la cámara o en un evento, si has abierto la app una vez con conexión."
        ],
        [
          "Un archivo, no una papelera",
          "No tires los menús antiguos. Un archivo de temporadas pasadas vale oro cuando vuelve un plato o un cliente pregunta por un postre antiguo. Ponlos en una carpeta de archivo: fuera de la vista, pero siempre localizables."
        ]
      ],
      "outro": "Savour es tu base de datos y archivo de recetas en la nube, en ordenador, tableta y móvil, y disponible sin conexión."
    },
    "en/blog/sorting-out-a-messy-recipe-folder": {
      "slug": "es/blog/ordenar-una-carpeta-de-recetas-desordenada",
      "title": "Ordenar una carpeta de recetas desordenada con IA e imprimirla de una vez",
      "desc": "Cómo convertir una carpeta llena de recetas escritas a máquina, escaneadas y a mano en un recetario ordenado: importar, IA para notas, revisar, ordenar en carpetas e imprimir la carpeta completa.",
      "h1": "Ordenar una carpeta de recetas desordenada con IA e imprimirla de una vez",
      "lead": "Años de recetas en una carpeta: a máquina, escaneadas, a mano y llenas de números. Pasarlas a limpio lleva semanas. Con la ayuda adecuada, una tarde.",
      "sections": [
        [
          "Donde suele empezar",
          "Una carpeta con recetas de distintos chefs, con títulos repetidos, encabezados sueltos y una receta que continúa a mitad de página. Ya nadie sabe qué versión es la buena, y buscar lleva más tiempo que cocinar."
        ],
        [
          "Deja que el lector haga el trabajo pesado",
          "Sube el archivo entero a Savour de una vez. El lector de Savour lo separa en recetas sueltas, quita los números delante de los títulos, reconoce partes como la masa y el relleno y corrige errores ortográficos habituales. Lo que no tiene claro, lo marca."
        ],
        [
          "IA para notas y casos dudosos",
          "Las fotos de notas escritas a mano y las recetas en las que el lector tiene dudas las lee la IA (Savour Pro). Importante: una buena IA nunca inventa cantidades. Lo que no se puede leer queda marcado para que lo revises."
        ],
        [
          "Revisar una vez y guardar",
          "Ves todas las recetas en un solo resumen, cada una con una categoría propuesta. Corrige lo que no esté bien y guárdalo todo de una vez."
        ],
        [
          "Ordenar en carpetas",
          "Crea carpetas por partida, menú o temporada. Una receta puede estar en varias carpetas sin duplicarse. Comparte una carpeta con tu brigada y todos trabajan con la misma versión."
        ],
        [
          "Imprimir la carpeta completa de una vez",
          "¿La nueva carpeta tiene que ir al archivador del pase? Imprime la carpeta de recetas completa de una vez, con índice y bien maquetada. Con Savour Pro lleva el logo de tu restaurante en cada página."
        ]
      ],
      "outro": "En Savour importas una carpeta de recetas entera de una vez, lo ordenas todo en carpetas e imprimes una carpeta completa con un clic."
    },
    'en/blog/shared-folders-explained': {
      "slug": "es/blog/carpetas-compartidas-explicadas",
      "title": "Carpetas compartidas en Savour: así funciona tu recetario compartido",
      "desc": "Todo lo que puedes hacer con una carpeta compartida en Savour: roles, añadir recetas y carpetas, gestionar carpetas por partida o menú, invitar a tu equipo, imprimir y copiar recetas.",
      "h1": "Carpetas compartidas: así funciona tu recetario compartido",
      "lead": "Una carpeta compartida es el corazón de Savour: un recetario para toda tu cocina, en el móvil de cada uno, siempre la misma versión. Esto es todo lo que puedes hacer con ella.",
      "sections": [
        [
          "Un recetario para tu equipo",
          "Todos los miembros de una carpeta compartida ven las mismas recetas en su propio móvil, tableta u ordenador. Si el autor cambia una receta, toda el equipo ve enseguida la nueva versión. Sin copias sueltas ni impresiones viejas en la pared."
        ],
        [
          "Roles: propietario, editor y lector",
          "El propietario gestiona la carpeta, los miembros y sus roles. Un editor añade recetas y carpetas, las quita y gestiona las carpetas. Un lector puede ver, imprimir y escalar. Solo el autor de una receta puede editarla, así nadie cambia por error la receta de otro."
        ],
        [
          "Añadir recetas",
          "Elige «Añadir receta» y marca recetas de tu propia biblioteca. La receta sigue siendo tuya: está en la carpeta compartida y en tus propias recetas a la vez."
        ],
        [
          "Carpetas por partida o por menú",
          "Divide la carpeta compartida en carpetas: una por partida (cuarto frío, salsas, pastelería) o una por menú. Con «Gestionar carpetas» cambias el nombre, las ordenas como en tu cocina y archivas las que ya no usas, como el menú de la temporada pasada. Las carpetas archivadas y sus recetas se conservan en «Archivo»."
        ],
        [
          "Invitar a tu equipo",
          "Invita a tus compañeros por WhatsApp, Telegram, correo o el enlace de invitación. Al iniciar sesión se unen como lector; después, como propietario, puedes darles otro rol. Ser miembro de una carpeta compartida es gratis, también sin Savour Pro."
        ],
        [
          "Imprimir para el archivador",
          "Imprime toda la carpeta compartida, una carpeta o tu propia selección de una vez. Obtienes un índice, el número de cada receta al pie de la página para encontrarla rápido y, con Savour Pro, el logo de tu restaurante arriba."
        ],
        [
          "Escalar y modo cocina",
          "Escala cualquier receta al rendimiento que necesitas. El modo cocina muestra solo la receta en letra grande y mantiene la pantalla encendida; marca ingredientes y pasos mientras trabajas."
        ],
        [
          "Copiar una receta",
          "En cada receta de un compañero en la carpeta compartida verás «Añadir a mis recetas». Obtienes tu propia copia para modificarla, mientras el original sigue siendo de su autor."
        ],
        [
          "También sin internet",
          "Las recetas que has abierto siguen disponibles en tu móvil. Incluso en una cocina en un sótano sin wifi puedes leerlas."
        ],
        [
          "Salir o eliminar",
          "Un miembro siempre puede salir de una carpeta compartida. Solo el propietario puede eliminarla; las recetas en sí siguen en la biblioteca de su autor."
        ]
      ],
      "outro": "Una carpeta compartida se crea con Savour Pro; cualquiera puede ser miembro gratis. En cada carpeta compartida encontrarás también esta explicación tras el botón i."
    },
    'en/blog/recipe-management-for-restaurants': {
      slug: 'es/blog/gestion-de-recetas-restaurantes',
      title: 'Gestión de recetas para restaurantes: por dónde empezar',
      desc: 'Gestión de recetas para restaurantes, hoteles y catering: cómo tener las recetas en un sitio, compartirlas con tu equipo de cocina y mantenerlas al día.',
      h1: 'Gestión de recetas para restaurantes: por dónde empezar',
      lead: 'En la mayoría de los restaurantes la gestión de recetas no es un sistema, sino una colección: carpetas, archivos, fotos y lo que el chef recuerda. Funciona, hasta que alguien se va o cambia el menú.',
      sections: [
        ['¿Qué es la gestión de recetas?', 'Gestionar recetas significa que todas las recetas de tu restaurante están en un sitio, con un formato fijo, y que todos en la cocina usan la misma versión. No se trata de software sofisticado, sino de acuerdos: dónde está, quién puede cambiarla y cómo se encuentra.'],
        ['Paso 1: reúne lo que tienes', 'No empieces con un sistema vacío. Reúne tus archivos de Word, PDF y notas e impórtalos de una vez. Una app de recetas que reconoce las recetas sola te ahorra semanas de volver a escribir.'],
        ['Paso 2: elige una estructura', 'Elige una estructura que encaje con tu restaurante: por partida, por menú o las recetas base separadas de los platos. Hazlo sencillo; siempre puedes ampliarlo después. Tienes ejemplos en nuestro artículo sobre cómo ordenar carpetas de recetas.'],
        ['Paso 3: decide quién puede hacer qué', 'Acuerda quién puede cambiar recetas, normalmente el jefe de cocina y el segundo, y deja que el resto del equipo consulte. Así evitas tres versiones de la misma salsa.'],
        ['Paso 4: hazlo fácil en la cocina', 'La gestión de recetas solo funciona si en la cocina es más rápida que la nota de siempre. Las recetas deben abrirse en el móvil con letra grande y una carpeta entera debe imprimirse de una vez.'],
        ['Varios restaurantes o locales', '¿Llevas varios restaurantes o un catering? Crea una carpeta compartida por local, con las mismas recetas base. Un cambio en la base queda bien en todos a la vez.']
      ],
      outro: 'Savour está hecho para gestionar recetas en cocinas profesionales: importar, organizar, compartir con tu equipo e imprimir.'
    },
    'en/blog/shared-recipe-book-kitchen-team': {
      slug: 'es/blog/recetario-compartido-equipo-de-cocina',
      title: 'Lo que un recetario compartido hace por tu equipo de cocina',
      desc: 'Una versión de cada receta, para todos en la cocina. Qué cambia en calma, calidad e incorporación de personal, y cómo montarlo.',
      h1: 'Lo que un recetario compartido hace por tu equipo de cocina',
      lead: 'En muchas cocinas la receta más importante vive en la cabeza de una sola persona. Cuando esa persona se va de vacaciones, se nota en el plato.',
      sections: [
        ['Menos preguntas durante el servicio', 'Cuando todos pueden abrir la receta en su propio móvil, nadie tiene que preguntar en pleno servicio cuánto estragón lleva la bearnesa. El chef tiene las manos y la cabeza libres para el pase.'],
        ['El mismo plato, cada día', 'Tres versiones de la misma salsa aparecen solas: alguien cambia algo y lo apunta en su propia nota. Con una receta compartida, la última versión siempre es la única. Se nota en la regularidad, incluso en la noche más llena.'],
        ['Responsabilidad sin caos', 'No todos necesitan poder cambiarlo todo. Da a tu segundo o jefe de partida permiso para editar recetas y deja que ayudantes y becarios solo consulten. El recetario sigue siendo de la cocina, no del último que lo tocó.'],
        ['Conocimiento que se queda', 'Cuando un cocinero se va, el conocimiento no se va con él. Lo que está en la carpeta compartida es de la cocina. Para un cocinero nuevo es la forma más rápida de aprender cómo se trabaja aquí.'],
        ['Cómo empezar', 'Empieza poco a poco: una carpeta compartida con las recetas base que todos usan a diario, como fondos, salsas y guarniciones de siempre. Invita a tu equipo y acordad quién puede cambiar qué. Después amplía por partida o por menú.']
      ],
      outro: 'En Savour creas carpetas compartidas con los permisos que elijas. Ser miembro de una carpeta compartida es gratis.'
    },
    'en/blog/recipe-folder-examples': {
      slug: 'es/blog/ordenar-carpetas-de-recetas-ejemplos',
      title: 'Ordenar carpetas de recetas: cinco ejemplos de cocinas reales',
      desc: 'Por partida, por menú, base aparte, pastelería o eventos: cinco formas de ordenar tus carpetas de recetas y cuándo funciona cada una.',
      h1: 'Ordenar carpetas de recetas: cinco ejemplos de cocinas reales',
      lead: 'No hay una estructura que sirva para todas las cocinas. Algunas sí han demostrado funcionar en la práctica. Elige la que encaje con cómo trabaja tu cocina.',
      sections: [
        ['1. Por partida', 'Cuarto frío, salsas, entremeses, pastelería. Durante el servicio cada uno abre solo lo que necesita su partida. Funciona bien en cocinas con una brigada y partidas fijas.'],
        ['2. Por menú o temporada', 'Una carpeta para el menú de mediodía, otra para el menú degustación, otra para el menú de otoño. Útil si tu carta cambia a menudo. Pasa los menús antiguos a una carpeta de archivo al acabar la temporada, para que tu recetario actual siga claro.'],
        ['3. Base aparte de los platos', 'Una carpeta con la base que casi no cambia, como fondos, jugos, masas y salsas madre, y carpetas para los platos que se construyen sobre ella. Cambia el jugo de ternera una vez y queda bien en todas partes.'],
        ['4. Pastelería por elaboración', 'Masas, cremas, helados y sorbetes, glaseados, decoración y bombones. En pastelería se busca a menudo por elaboración, no por plato. Una receta puede estar en varias carpetas: tu crema pastelera pertenece a las cremas y al postre del que forma parte.'],
        ['5. Por evento o cliente', 'Para catering y banquetes: una carpeta por evento o cliente habitual, con exactamente las recetas que se hacen ese día. Escálalas al número de invitados e imprime la carpeta entera de una vez para la cocina.'],
        ['Combina carpetas y categorías', 'Usa las categorías para lo que es una receta (salsa, guarnición, postre) y las carpetas para dónde la usas. Así puedes buscar de dos maneras, sin que una receta exista dos veces.']
      ],
      outro: 'En Savour creas tus propias carpetas y categorías, y una receta puede estar en varias carpetas a la vez.'
    },
    'en/blog/sharing-recipes-with-your-team': {
      slug: 'es/blog/compartir-recetas-con-tu-equipo',
      title: 'Compartir recetas con tu equipo, sin fotos de fotos',
      desc: 'Compartir recetas en el grupo de WhatsApp acaba en fotos borrosas y versiones antiguas. Cómo compartir recetas y carpetas con tu equipo, con los permisos adecuados.',
      h1: 'Compartir recetas con tu equipo, sin fotos de fotos',
      lead: 'La foto de una receta, reenviada en el grupo, fotografiada otra vez desde otra pantalla. Te suena. Y nadie sabe qué versión es la buena.',
      sections: [
        ['Comparte una carpeta entera', 'Crea una carpeta compartida, por ejemplo «Salsas» o «Menú de otoño», e invita a tus compañeros. Todos ven las mismas recetas y un cambio aparece al momento para todos.'],
        ['Elige qué puede hacer cada uno', 'Hay tres roles. El propietario gestiona la carpeta. Un editor puede añadir y cambiar recetas. Un lector puede verlo todo, pero no cambiar nada. Tú decides quién toca las recetas.'],
        ['Envía una receta suelta', '¿Quieres compartir una receta, por ejemplo con un compañero de otro restaurante o un proveedor? Compártela con un enlace. Quien la recibe la ve limpia, sin cuenta.'],
        ['Compañeros que construyen contigo', 'Una carpeta compartida no tiene por qué venir solo de ti. Da permiso de edición a tu segundo y deja que el equipo añada recetas. El recetario crece con la cocina.'],
        ['Lo que cuesta', 'Ser miembro de una carpeta compartida es gratis. Crear tú una carpeta compartida forma parte de Savour Pro. Con un plan de equipo todos en tu cocina tienen Pro.']
      ],
      outro: 'Las carpetas compartidas con roles están en Savour en «Carpetas compartidas».'
    },
    'en/blog/roadmap': {
      slug: 'es/blog/hoja-de-ruta',
      title: 'Hoja de ruta: en qué trabajamos en Savour',
      desc: 'Coste por receta, alérgenos, el historial de cada receta y quizá una app para iPhone y Android. Qué está previsto y cómo decidimos qué va primero.',
      h1: 'Hoja de ruta: en qué trabajamos',
      lead: 'Savour lo construye un cocinero para cocineros. Eso también significa que construimos lo que la cocina necesita de verdad, no lo que suena bien en una presentación.',
      sections: [
        ['Coste por receta', 'Mira lo que cuesta un plato y una ración, y qué pasa cuando sube el precio de un producto. Es la función más pedida y está arriba del todo.'],
        ['Alérgenos de un vistazo', 'Por receta y por plato compuesto, para responder en la mesa a la pregunta de un cliente sin ir a la cocina.'],
        ['Historial de cada receta', 'Mira quién cambió qué en una receta compartida y recupera una versión anterior cuando haga falta. Imprimir con tu propio logo ya está listo y forma parte de Savour Pro.'],
        ['Una app para iPhone y Android', 'Savour funciona ahora en el navegador del ordenador, la tableta y el móvil, sin instalar nada. Estamos valorando una app propia. Si merece la pena depende de lo que digan los cocineros.'],
        ['Cómo decidimos', 'Miramos lo que nos cuentan los cocineros y lo que más tiempo ahorra en la cocina. ¿Tienes una idea o echas algo en falta? Escríbenos a contact@savour.page. Lo leemos todo.']
      ],
      outro: 'Esta hoja de ruta es una dirección, no una promesa con fechas. La mantenemos al día aquí.'
    },
    'en/blog/onboarding-new-cooks': {
      slug: 'es/blog/incorporar-cocineros-nuevos',
      title: 'Incorporar a un cocinero nuevo con recetas estándar',
      desc: 'Las primeras semanas de un cocinero nuevo le cuestan tiempo a toda la brigada. Con recetas estándar compartidas, la incorporación es más rápida y tranquila.',
      h1: 'Incorporar a un cocinero nuevo con recetas estándar',
      lead: 'Un cocinero nuevo quiere hacerlo bien, pero todavía no sabe cómo funcionan las cosas aquí. Cada pregunta durante el servicio le quita atención a otro.',
      sections: [
        ['Dale las recetas antes del primer turno', 'Añade al cocinero nuevo como lector a la carpeta compartida de la partida. Puede leer en casa qué se hace y cómo, en la versión que tú aprobaste.'],
        ['Que cocine desde el móvil', 'En el modo cocina la receta aparece en pantalla con letra grande. Marca lo que ya está hecho y desplázate con las manos mojadas. Sin hojas grasientas ilegibles a mitad del servicio.'],
        ['Una forma de trabajar', 'Quien aprende con una receta estándar aprende la forma de trabajar de tu cocina. No la de su restaurante anterior ni la del compañero que casualmente tenía al lado.'],
        ['Pide su opinión', 'La gente nueva ve lo que los de siempre ya no ven: una cantidad que no cuadra, un paso que falta. Deja que lo digan y actualiza la receta para todos.']
      ],
      outro: 'En Savour añades cocineros nuevos a una carpeta compartida con permiso de lectura. Para ellos es gratis.'
    },
    'en/blog/scaling-recipes-without-errors': {
      slug: 'es/blog/escalar-recetas-sin-errores',
      title: 'Escalar recetas sin errores de cálculo',
      desc: 'De 8 a 120 cubiertos o de 50 a 1.000 piezas. Dónde falla el escalado y cómo hacerlo de forma fiable.',
      h1: 'Escalar recetas sin errores de cálculo',
      lead: 'Escalar parece fácil: todo por quince. Hasta que a las cinco de la tarde descubres que la gelatina no se multiplicó.',
      sections: [
        ['Dónde falla', 'Cálculo mental bajo presión, unidades mezcladas (gramos, decilitros, piezas) y el original sobrescrito con la versión escalada. Después nadie sabe cuál era la receta base.'],
        ['Calcula a partir del rendimiento', 'Apunta lo que da cada receta: 0,5 litros, 40 raciones o 50 piezas. Así no calculas «por quince», sino con lo que necesitas.'],
        ['Conserva el original', 'Escala una copia o convierte solo en pantalla. La receta base se queda exactamente como estaba, para la próxima vez.'],
        ['Cuidado con gelificantes y masas', 'Gelatina, agar, gasificantes y sal no siempre escalan uno a uno en la práctica, sobre todo en grandes cantidades. Prueba siempre una tanda grande antes de fiarte de ella.']
      ],
      outro: 'En Savour introduces el rendimiento que necesitas y Savour convierte cada cantidad. La receta original se queda como está.'
    },
    'en/blog/from-word-to-recipe-book': {
      slug: 'es/blog/de-word-a-recetario',
      title: 'De documento de Word a recetario en unos minutos',
      desc: '¿Cientos de recetas en un archivo de Word? Cómo las lee Savour, qué reconoce y corrige el lector y cuándo tienes que revisar.',
      h1: 'De documento de Word a recetario en unos minutos',
      lead: 'Muchos cocineros ya lo tienen: un gran archivo de Word con años de recetas. Volver a escribirlo lleva semanas. No hace falta.',
      sections: [
        ['Arrastra el archivo', 'Elige tu archivo de Word o PDF en Savour. El lector de Savour recorre todo el documento y lo divide él solo en recetas separadas, aunque sean cientos.'],
        ['Lo que reconoce el lector', 'Títulos, también en negrita o numerados, ingredientes con cantidad y unidad y la elaboración en pasos. Los números delante de los títulos y pequeñas erratas, como 18oc en lugar de 180 °C, se corrigen.'],
        ['Cuando el lector tiene dudas', 'No todos los documentos están bien formateados. Si el lector duda con una receta, se marca y la revisas tú antes de guardarla. Con Savour Pro la IA lee esos casos dudosos automáticamente.'],
        ['Qué rápido es', 'Un cocinero importó así 1.400 recetas de Word en unos dos minutos. Después puedes ponerlas en carpetas, completarlas y compartirlas al momento.'],
        ['Gratis o Pro', 'Importas Word, PDF y texto gratis con el lector de Savour, hasta 100 recetas. Con Savour Pro guardas recetas ilimitadas y la IA también lee fotos y notas escritas a mano.']
      ],
      outro: 'Importar está en Savour en «Añadir receta».'
    },
    'en/blog/ai-should-never-invent-recipes': {
      slug: 'es/blog/la-ia-no-debe-inventar-recetas',
      title: 'Por qué la IA nunca debe inventar tus recetas',
      desc: 'La IA puede leer letra a mano y ordenar documentos desordenados. Pero una receta tiene que ser correcta. Por qué Savour se detiene ante la duda en lugar de adivinar.',
      h1: 'Por qué la IA nunca debe inventar tus recetas',
      lead: 'La IA es buena rellenando lo que probablemente pone. En una cocina, «probablemente» no es suficiente.',
      sections: [
        ['El problema de adivinar', 'Si lees la foto borrosa de una nota, podrías suponer que pone 150 gramos de azúcar. Pero si eran 150 gramos de glucosa, tu marshmallow ya no sale bien. Una suposición inteligente parece tan convincente como la respuesta correcta.'],
        ['Lo que Savour hace distinto', 'Savour nunca inventa cantidades, ingredientes ni pasos. Si la elaboración no está en la nota, tampoco está en la receta. La añades tú.'],
        ['Hacer visible la duda', 'Cuando el lector o la IA no está seguro, lo ves. La receta se marca y la revisas antes de guardarla. Mejor una pregunta para ti que un error en el plato.'],
        ['Decide el cocinero', 'La IA es una herramienta para trabajar más rápido, no un sustituto del oficio. La última palabra sobre una receta siempre la tiene el cocinero que la hizo.']
      ],
      outro: 'Es uno de los valores fundamentales de Savour: una receta tiene que ser correcta.'
    },
    'en/blog/digitise-old-recipe-notes': {
      slug: 'es/blog/digitalizar-notas-de-recetas-antiguas',
      title: 'Digitalizar notas de recetas antiguas y salvar tus cuadernos',
      desc: 'Las recetas escritas a mano se borran y se pierden. Cómo convertir paso a paso tus cuadernos y notas antiguas en un recetario digital, sin volver a escribirlo todo.',
      h1: 'Digitalizar notas de recetas antiguas: cómo salvar tus cuadernos',
      lead: 'Casi todos los cocineros los tienen: cuadernos de la escuela, hojas sueltas manchadas, fotos de una pizarra. Así te aseguras de que ese conocimiento no se pierda.',
      sections: [
        ['Empieza por lo que de verdad usas', 'No intentes hacerlo todo en un fin de semana. Empieza por las recetas que necesitas este mes: las salsas base, los fondos, las elaboraciones de tu menú actual. El resto llega cuando lo busques.'],
        ['Haz buenas fotos', 'Fotografía con luz natural, recto desde arriba, una página por foto. Una mancha o una esquina torcida no importa; una sombra sobre el texto, sí. Pon el papel plano sobre una superficie oscura.'],
        ['Que lo lean, no lo vuelvas a escribir', 'Volver a escribir lleva fácilmente diez minutos por receta y añade erratas nuevas. Con una app que lee letra a mano, como Savour, conviertes la foto en una receta con ingredientes y elaboración. Importante: revisa siempre las cantidades. Una buena app no inventa nada y muestra dónde tiene dudas.'],
        ['Da a cada receta la misma forma', 'Título, rendimiento, ingredientes con cantidad y unidad y la elaboración en pasos. Cuando todas las recetas tienen la misma estructura, cualquiera de la brigada puede leerlas sin conocer tu letra.'],
        ['Guarda el original', 'No tires el cuaderno. Si quieres, añade la foto a la receta. El original a veces cuenta más que la receta: una nota al margen, una fecha, un nombre.']
      ],
      outro: 'Savour lee Word, PDF y fotos de recetas escritas a mano y las convierte en un recetario.'
    },
    'en/blog/organising-recipes-in-the-kitchen': {
      slug: 'es/blog/organizar-recetas-alta-cocina',
      title: 'Organizar recetas en una cocina de alta gastronomía',
      desc: '¿Cómo ordenas cientos de recetas para que todos en la brigada las encuentren rápido? Una estructura práctica en carpetas y categorías.',
      h1: 'Organizar recetas en una cocina de alta gastronomía',
      lead: 'Una cocina con carta cambiante tiene enseguida cientos de recetas. Sin una estructura fija nadie encuentra nada, salvo quien lo apuntó.',
      sections: [
        ['La base, aparte de la carta', 'Separa las recetas base (fondos, jugos, masas, salsas madre) de los platos de la carta. La base casi no cambia; la carta, cada temporada. Un plato remite a la base en lugar de repetirla.'],
        ['Ordena por partida', 'Si trabajas por partidas, crea una carpeta por partida: cuarto frío, salsas, pastelería. Durante el servicio cada uno abre solo lo que necesita su partida.'],
        ['Categorías para buscar, carpetas para trabajar', 'Usa las categorías para lo que es una receta (salsa, guarnición, postre) y las carpetas para dónde la usas (menú de mediodía, menú degustación, evento). Una receta puede estar en varias carpetas sin existir dos veces.'],
        ['Un responsable por receta', 'Acuerda quién puede cambiar una receta. Así evitas tres versiones de la misma salsa. En una app con permisos, como Savour, el jefe de cocina gestiona la carpeta y el resto consulta.'],
        ['Ordena después de cada temporada', 'Pasa los menús antiguos a una carpeta de archivo en lugar de borrarlos. Tu recetario actual sigue claro y no pierdes nada.']
      ],
      outro: 'En Savour creas tus propias carpetas y categorías, y compartes carpetas con tu brigada con los permisos que elijas.'
    },
    // ---- Artículos nuevos (en los cuatro idiomas) ----
    'en/blog/standardised-recipes': {
      slug: 'es/blog/fichas-tecnicas-de-cocina',
      title: 'Fichas técnicas de cocina: por qué tu cocina las necesita',
      desc: 'Qué es una ficha técnica de cocina, qué debe incluir y por qué marca la diferencia en regularidad, formación del equipo y escandallo en la cocina profesional.',
      h1: 'Fichas técnicas de cocina: por qué tu cocina las necesita',
      lead: 'Una ficha técnica no es cosa de comedores colectivos. Precisamente en una cocina exigente hace que cada plato sepa como debe, esté quien esté en la partida.',
      sections: [
        ['Qué es una ficha técnica', 'Una ficha técnica es la versión fijada de una receta con la que trabaja todo el mundo. No es una chuleta, sino el acuerdo de la cocina: así lo hacemos aquí.'],
        ['Qué debe incluir', 'Como mínimo un título claro, el rendimiento (por ejemplo 2 litros o 40 raciones), todos los ingredientes con cantidad y unidad y la elaboración en pasos. Conviene añadir puntos críticos como temperaturas y tiempos y una foto del resultado.'],
        ['Regularidad en el plato', 'Si todos trabajan con la misma ficha, la salsa del martes sabe igual que la del sábado. Las desviaciones se notan, porque hay una base fija con la que comparar.'],
        ['Formar más rápido', 'Los cocineros nuevos aprenden la forma de trabajar de tu cocina con las fichas, no a base de preguntas durante el servicio. Eso ahorra tiempo y nervios al resto de la brigada.'],
        ['Escalar y escandallar', 'Con un rendimiento fijo puedes escalar con fiabilidad hacia arriba y hacia abajo. Y cuando las cantidades son correctas, la ficha es también la base del escandallo por ración.'],
        ['Cómo empezar', 'Empieza por las recetas base que se hacen a diario: fondos, salsas, masas. Créalas con un formato fijo, en un sitio que todos puedan abrir, y acordad quién puede cambiarlas.']
      ],
      outro: 'En Savour cada receta tiene la misma forma: título, rendimiento, ingredientes y elaboración. Comparte tus fichas con el equipo en una carpeta compartida.'
    },
    'en/blog/recipe-book-with-your-logo': {
      slug: 'es/blog/recetario-con-tu-logo',
      title: 'Imprime un recetario con el logo de tu restaurante',
      desc: 'Imprime recetas y carpetas enteras con el logo y el nombre de tu restaurante, en A4 o A5, con fecha de impresión. Para la carpeta de la cocina o para formación.',
      h1: 'Un recetario con el logo de tu restaurante',
      lead: 'Aunque tengas todas las recetas en el móvil, en muchas cocinas el papel sigue siendo importante. Entonces, que se vea que es de tu restaurante.',
      sections: [
        ['Tu logo y tu nombre en cada página', 'Con Savour Pro configuras una vez el logo y el nombre de tu restaurante. Después aparecen arriba en cada página impresa: el logo a la izquierda y el nombre en el centro. Para impresoras de cocina puedes imprimir el logo en blanco y negro.'],
        ['Para todo el equipo', 'Con un plan de equipo, el logo del propietario vale para todo el equipo. Así todos imprimen con el mismo estilo, imprima quien imprima. En una carpeta compartida se usa el logo del restaurante que la gestiona.'],
        ['Una carpeta entera como libro', 'Al imprimir una carpeta puedes añadir una portada con el logo, el nombre de la carpeta y un índice. Elige A4 para la carpeta de la cocina o A5 para una carpeta pequeña en el pase.'],
        ['Siempre se ve si está al día', 'Abajo, en cada página, aparece la fecha de impresión. Así todos en la cocina ven si una carpeta es la última versión. Los encabezados y pies del navegador desaparecen para que la página quede limpia.'],
        ['Elige tú qué imprimir', 'En una carpeta compartida eliges antes de imprimir qué recetas quieres, agrupadas por carpeta. Solo lo que hace falta para esa partida o ese evento.']
      ],
      outro: 'Imprimir con tu propio logo forma parte de Savour Pro. Se configura en Ajustes → Suscripción y equipo.'
    },
    'en/blog/recipes-without-wifi': {
      slug: 'es/blog/recetas-sin-wifi',
      title: 'Recetas sin wifi: trabajar sin conexión en la cocina',
      desc: 'En la cámara, en el sótano o en un evento, el wifi suele fallar. Así abres tus recetas igualmente, también sin internet.',
      h1: 'Recetas sin wifi: trabajar sin conexión en la cocina',
      lead: 'Las cocinas son malas para el wifi: acero, cámaras frigoríficas, sótanos. Y justo cuando necesitas una receta, no carga nada.',
      sections: [
        ['Instala Savour como app', 'No necesitas una tienda de apps. Abre savour.page y añádelo a la pantalla de inicio: en iPhone con Compartir → Añadir a pantalla de inicio, en Android con el menú → Instalar app y en el ordenador con el icono de la barra de direcciones.'],
        ['Ábrelo una vez con conexión', 'Inicia sesión una vez con internet, con «Mantener la sesión iniciada» marcado, y abre tus recetas. Savour guarda entonces tu biblioteca en el dispositivo.'],
        ['Sin conexión', 'Si se cae el wifi, abre Savour desde el icono de tu pantalla de inicio. Verás tus últimas recetas guardadas, con un aviso de que estás sin conexión. Consultar y cocinar sigue funcionando.'],
        ['Lo que no funciona sin conexión', 'Cambiar e importar necesitan conexión, para que todo el equipo tenga la misma versión. En cuanto vuelve la conexión, Savour se recarga solo.'],
        ['Ordenadores compartidos en la cocina', 'En un ordenador que usan varias personas, deja «Mantener la sesión iniciada» sin marcar. Así Savour no guarda nada en el dispositivo y la sesión se cierra al cerrar la ventana.']
      ],
      outro: 'Trabajar sin conexión está incluido en todas las cuentas de Savour, gratis y con Pro.'
    },
    'en/blog/choosing-a-recipe-app': {
      slug: 'es/blog/elegir-app-de-recetas-restaurante',
      title: 'Cómo elegir una app de recetas para tu restaurante',
      desc: 'Siete preguntas para hacerle a una app de recetas para tu restaurante: importar, precisión, móvil, equipo, imprimir, sin conexión y qué pasa con tus recetas.',
      h1: 'Cómo elegir una app de recetas para tu restaurante',
      lead: 'Muchas apps de recetas están hechas para cocineros aficionados. En una cocina profesional las exigencias son otras. Estas siete preguntas te ayudan a elegir.',
      sections: [
        ['1. ¿Puedes meter tus recetas actuales?', 'Una app en la que tienes que escribirlo todo de nuevo acaba sin usarse. Comprueba si puedes importar de una vez Word, PDF y fotos de recetas escritas a mano.'],
        ['2. ¿Tu receta se queda exactamente como era?', 'Pregunta qué hace la app cuando tiene dudas. Una buena app no inventa cantidades ni pasos, sino que te muestra qué debes revisar.'],
        ['3. ¿Funciona en el móvil, en la cocina?', 'Letra grande, búsqueda rápida, manejable con las manos mojadas. Pruébala en plena mise en place, no en la oficina.'],
        ['4. ¿Puedes compartir con permisos?', 'El equipo tiene que poder consultar, pero no todos deben poder cambiarlo todo. Busca roles como propietario, editor y lector.'],
        ['5. ¿Puedes imprimir bien?', 'Una carpeta entera de una vez, con un diseño tranquilo y, mejor aún, con el logo de tu restaurante.'],
        ['6. ¿Qué pasa sin internet?', 'Las cámaras y los sótanos rara vez tienen buen wifi. Comprueba si puedes abrir tus recetas sin conexión.'],
        ['7. ¿Qué pasa con tus recetas si te das de baja?', 'Tus recetas son tu conocimiento. Comprueba si te las quedas cuando dejas de pagar. En Savour todo se queda tal cual.']
      ],
      outro: 'Puedes probar Savour gratis con hasta 100 recetas, con 7 días de Savour Pro. Sin datos de pago.'
    }
  }
};
