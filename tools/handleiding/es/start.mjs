// Manual (Spaans), sección «Primeros pasos». Links: [texto](#id) o [texto](/ruta-nl); la ruta se traduce sola.

export const groups = {
  'aan-de-slag': {
    name: 'Primeros pasos',
    intro: 'Crear una cuenta, iniciar sesión, poner Savour como app en el móvil y orientarte en las pantallas.'
  }
};

export const pages = {
  'aan-de-slag': {
    slug: 'es/manual-primeros-pasos',
    menu: 'Primeros pasos con Savour',
    title: 'Primeros pasos con Savour, la app de recetas para cocineros | Manual',
    desc: 'Empezar con Savour: qué hace la app de recetas para cocinas profesionales, crear una cuenta, importar tus primeras recetas y poner Savour en el móvil.',
    lead: 'Qué es Savour, para quién es y los primeros pasos hacia tu propio recetario digital.',
    sections: [
      ['Qué es Savour', 'Savour es una app de recetas para la cocina profesional. Reúnes todas tus fichas en un solo lugar: de Word, PDF, fotos de notas a mano, webs y otras apps de recetas. Después las ordenas en carpetas y categorías, las escalas a cualquier rendimiento, las imprimes para la carpeta del pase y las compartes con tu brigada en un equipo de cocina.'],
      ['Para quién', 'Para jefes de cocina, segundos, pasteleros, empresas de catering y escuelas de cocina: cualquiera que necesite guardar, compartir y encontrar rápido sus recetas. Los cocineros aficionados también pueden usar Savour, pero la app está hecha para el trabajo en cocina: grandes cantidades, fichas fijas y un equipo que trabaja con la misma versión. Más en [Para cocineros](/voor-koks) y [Para brigadas de cocina](/voor-keukenbrigades).'],
      [
        'Empieza en cuatro pasos',
        'Así tienes tus primeras recetas en Savour en un cuarto de hora:',
        [
          '[Crea una cuenta](#account-maken) o mira primero la [demo](#demo) sin cuenta.',
          '[Importa tus recetas](#importeren): un archivo de Word o PDF con todas tus recetas basta para empezar.',
          '[Revisa lo que se ha leído](#import-controleren) y guarda.',
          '[Pon Savour como app en el móvil](#app-installeren) para tener tus recetas siempre a mano en la cocina.'
        ]
      ],
      ['Gratis o Savour Pro', 'Una cuenta gratuita guarda hasta 100 recetas e importa Word, PDF y texto. Con [Savour Pro](#gratis-en-pro) guardas recetas ilimitadas, la IA lee fotos de notas a mano, creas equipos de cocina e imprimes con el logo de tu restaurante. Las cuentas nuevas reciben 7 días de Pro gratis.'],
      ['En cualquier dispositivo', 'Savour funciona en el navegador en ordenador, tableta y móvil. Importar, ordenar e imprimir es más cómodo en el ordenador; consultar en la cocina, en el móvil o la tableta. Tus recetas están en la nube: en un dispositivo nuevo inicias sesión y todo vuelve a estar.']
    ]
  },
  'account-maken': {
    slug: 'es/manual-crear-cuenta',
    menu: 'Crear una cuenta',
    title: 'Crear una cuenta de Savour y confirmar tu correo | Manual',
    desc: 'Así creas una cuenta gratuita de Savour: nombre, correo y contraseña, el correo de confirmación, la semana de prueba de Savour Pro y qué hacer primero.',
    lead: 'Gratis, sin datos de pago y listo en un minuto.',
    sections: [
      ['Crear la cuenta', 'Elige «Empieza gratis» en [savour.page](/). Escribe tu nombre, apellidos, correo y una contraseña y elige «Crear cuenta». No necesitas datos de pago.'],
      ['Confirmar tu correo', 'Recibes un correo con un enlace para confirmar la cuenta. Haz clic en el enlace y después, en Savour, en «Continuar». ¿No te llega? Mira en spam. Si intentas iniciar sesión sin confirmar, Savour te ofrece enviar un correo de confirmación nuevo. Un enlace de un correo funciona una vez y durante una hora; si pides varios, solo vale el más reciente.'],
      ['Siete días de Savour Pro', 'Cada cuenta nueva recibe 7 días de [Savour Pro](#gratis-en-pro) gratis. Puedes hacer que se lean fotos de notas, [crear un equipo de cocina](#keukenteam-maken) e [imprimir con tu logo](#printen-logo). También en la semana de prueba guardas hasta 100 recetas. Después conservas todo lo que hayas creado.'],
      ['Invitado por un colega', 'Si un colega te ha enviado un enlace, Savour abre directamente «Crear cuenta». Recibes la misma semana de prueba, y tu colega recibe 14 días de Pro de regalo en cuanto confirmes tu correo e inicies sesión. Con una invitación a un equipo de cocina, te unes al equipo al iniciar sesión. Ver [Invitar a un colega](#collega-uitnodigen) e [Invitar a tu equipo](#keukenteam-uitnodigen).'],
      ['El correo ya tiene una cuenta', 'Si Savour dice que el correo ya tiene una cuenta, no se envía un correo de confirmación nuevo. [Inicia sesión](#inloggen) o elige «¿Has olvidado tu contraseña?» si ya no la recuerdas.'],
      ['Después', 'Tras confirmar ves la pantalla de bienvenida con una breve lista de inicio. Empieza [importando](#importeren) o [introduciendo una receta tú mismo](#recept-maken). Un plan para los primeros días está en [Tu primera semana con Savour](#eerste-week).']
    ]
  },
  inloggen: {
    slug: 'es/manual-iniciar-sesion',
    menu: 'Iniciar sesión y contraseña',
    title: 'Iniciar sesión, mantener la sesión y contraseña olvidada | Manual de Savour',
    desc: 'Iniciar sesión en Savour: mantener la sesión iniciada, recordar la contraseña en un ordenador compartido de cocina, contraseña olvidada y elegir una nueva.',
    lead: 'Iniciar sesión en tu propio móvil, en una tableta compartida en el pase o en un ordenador nuevo.',
    sections: [
      ['Iniciar sesión', 'Elige «Iniciar sesión» arriba a la derecha en [savour.page](/) y escribe tu correo y contraseña. Tus recetas, carpetas y equipos de cocina aparecen al momento, en cualquier dispositivo.'],
      ['Mantener la sesión iniciada', 'Con «Mantener la sesión iniciada» sigues dentro aunque cierres el navegador o la app. También lo necesitas para abrir tus recetas [sin internet](#offline). En un ordenador o tableta compartidos, déjalo desmarcado: la sesión se cierra al cerrar la ventana.'],
      ['Recordar contraseña', 'Con «Recordar contraseña», el gestor de contraseñas del navegador puede guardarla. En un dispositivo compartido, desactívalo.'],
      ['Contraseña olvidada', 'Elige «¿Has olvidado tu contraseña?» en la ventana de inicio de sesión. Recibes un correo con un enlace. Haz clic, elige «Continuar» en Savour y pon una contraseña nueva en [Mi cuenta](#account-profiel). El enlace funciona una vez y durante una hora.'],
      ['Cerrar sesión', 'Cierras sesión en Mi cuenta → Cuenta. En tu propio móvil no hace falta; en una tableta compartida sí, o deja desmarcado «Mantener la sesión iniciada».'],
      ['¿No funciona?', 'En [Problemas para iniciar sesión](#probleem-inloggen) están los mensajes más habituales y qué hacer.']
    ]
  },
  demo: {
    slug: 'es/manual-demo',
    menu: 'Ver la demo',
    title: 'La demo de Savour: explora con 40 recetas de ejemplo | Manual',
    desc: 'Prueba Savour sin cuenta: la demo con 40 recetas de ejemplo, carpetas y un equipo de cocina. Cómo funciona y qué puedes y no puedes hacer en ella.',
    lead: 'Explora Savour con recetas de ejemplo, sin cuenta y sin guardar nada.',
    sections: [
      ['Abrir la demo', 'Elige «Ver la demo» en la [página de inicio](/). Ves Savour como lo ve un cocinero con sesión iniciada, con 40 recetas de ejemplo, carpetas por partida y un equipo de cocina.'],
      ['Qué puedes probar', 'Abre recetas, [escálalas](#omrekenen), inicia el [modo cocina](#kookmodus), busca un ingrediente y recorre las carpetas. También puedes probar a importar: ves qué hace el lector de Savour con tu archivo.'],
      ['Qué no hace la demo', 'En la demo no se guarda nada. Arriba pone «Cuenta demo · no se guarda nada». Para guardar tus propias recetas, [crea una cuenta](#account-maken).'],
      ['Salir de la demo', 'Al cerrar sesión en la demo vuelves a la página de inicio. No queda nada de la demo en tu navegador.']
    ]
  },
  'app-installeren': {
    slug: 'es/manual-instalar-app',
    menu: 'Instalar Savour como app',
    title: 'Savour como app en iPhone, Android y ordenador | Manual',
    desc: 'Así pones Savour en la pantalla de inicio: iPhone y iPad con Safari, Android con Chrome y ordenador con Chrome, Edge o Safari. Sin tienda de apps.',
    lead: 'Ponlo una vez en tu pantalla de inicio y Savour se abre como una app normal, también sin internet.',
    sections: [
      ['Sin tienda de apps', 'Savour es una app web: la pones en tu pantalla de inicio desde la web. Después se abre en su propia ventana con su propio icono, y siempre tienes la última versión. Más en la página [App](/app-downloaden).'],
      ['iPhone y iPad', 'Abre savour.page en Safari. Toca Compartir abajo (el cuadrado con la flecha hacia arriba), elige «Añadir a pantalla de inicio» y toca «Añadir».'],
      ['Android', 'Abre savour.page en Chrome. Toca ⋮ arriba a la derecha y elige «Instalar app» o «Añadir a pantalla de inicio». Con la sesión iniciada también puedes usar General → Instalar app en el menú de Savour.'],
      ['Ordenador', 'En Chrome o Edge haz clic en el icono de instalación a la derecha de la barra de direcciones, o elige «Instalar app» en General dentro de Savour. En un Mac con Safari elige Archivo → «Añadir al Dock».'],
      ['También sin internet', 'Inicia sesión una vez con «Mantener la sesión iniciada» y abre tus recetas. Después Savour abre tu biblioteca aunque se caiga el wifi de la cocina. Ver [Trabajar sin internet](#offline).'],
      ['Tableta compartida en el pase', 'Pon Savour en una tableta que use todo el equipo. Si varias personas la usan con su propia cuenta, deja desmarcado «Mantener la sesión iniciada». Si todos trabajan desde el mismo [equipo de cocina](#keukenteams), todos ven las mismas recetas.']
    ]
  },
  menu: {
    slug: 'es/manual-menu-y-pantallas',
    menu: 'El menú y las pantallas',
    title: 'El menú de Savour: recetas, carpetas, equipos, general | Manual',
    desc: 'Orientarte en Savour: el menú con Todas las recetas, Favoritos, Categorías, Añadir receta, carpetas, equipos de cocina y General, y los botones de arriba.',
    lead: 'Qué hay en el menú y dónde encuentras cada cosa, en el ordenador y en el móvil.',
    sections: [
      [
        'Recetas',
        'Arriba del menú están tus propias recetas:',
        [
          '[Todas las recetas](#zoeken): tu biblioteca completa, numerada y en orden alfabético.',
          '[Favoritos](#favorieten): las recetas con estrella.',
          '[Categorías](#categorieen): recetas por tipo, como salsas o pastelería.',
          '[Añadir receta](#importeren): importar o introducir tú mismo.'
        ]
      ],
      ['Carpetas de recetas', 'Debajo están tus propias [carpetas](#mappen), por ejemplo por partida o por menú, con «Añadir carpeta de recetas» para crear una. Tú eliges qué carpetas aparecen en el menú y en qué orden.'],
      ['Equipos de cocina', 'Aquí están los [equipos de cocina](#keukenteams) de los que eres miembro, con «Crear equipo de cocina» para empezar uno (Savour Pro).'],
      ['General', 'Abajo están [Savour Pro](#gratis-en-pro), [Invitar a un colega](#collega-uitnodigen), [Instalar app](#app-installeren) y Ajustes, donde encuentras [tu cuenta](#account-profiel), [Savour Pro](#abonnement-beheren), [Logo en las impresiones](#printen-logo), [Apariencia](#weergave-en-taal), [Categorías](#categorieen) y [Limpiar](#opschonen).'],
      ['Arriba', 'En la barra de arriba buscas en tus recetas, cambias con un botón entre el [tema oscuro y el claro](#weergave-en-taal) y eliges el idioma: neerlandés, inglés, alemán, español o francés.'],
      ['Explicación por pantalla', 'Junto al título de muchas pantallas hay un botón i. Detrás encuentras una breve explicación de lo que puedes hacer en esa pantalla.'],
      ['En el móvil', 'En el móvil hay abajo una barra con Recetas, Carpetas de recetas, Equipos de cocina y Añadir receta. Arriba buscas, abres tus favoritos y vas a Mi cuenta. Las recetas se abren grandes y legibles; con el [modo cocina](#kookmodus) solo ves la receta.']
    ]
  },
  'eerste-week': {
    slug: 'es/manual-primera-semana',
    menu: 'Tu primera semana con Savour',
    title: 'Tu primera semana con Savour: un plan para tu cocina | Manual',
    desc: 'Un plan para la primera semana: importar recetas, limpiar, ordenar en categorías y carpetas, invitar a tu equipo y usar Savour en la cocina.',
    lead: 'Un plan práctico para pasar en una semana de archivos sueltos a un solo recetario.',
    sections: [
      ['Día 1: todo dentro', 'Reúne tus archivos de Word, PDF y exportaciones antiguas e [impórtalos de una vez](#import-hele-map). Si tienes notas a mano, hazles [fotos](#import-fotos) durante la semana de prueba de Savour Pro.'],
      ['Día 2: revisar', 'Repasa las recetas que Savour ha marcado para revisar. Compara las dudosas con el original y mira sobre todo los números. Ver [Revisar una importación](#import-controleren).'],
      ['Día 3: limpiar', 'Quita los números delante de los nombres y las recetas duplicadas con [Limpiar](#opschonen). Después pon la [lista estándar de categorías](#categorieen) y deja que Savour [sugiera categorías](#categorie-trefwoorden).'],
      ['Día 4: ordenar', 'Crea [carpetas](#mappen) según trabaja tu cocina: por partida, por menú o por temporada. Pon una [estrella](#favorieten) a tus recetas más usadas.'],
      ['Día 5: el equipo', '[Crea un equipo de cocina](#keukenteam-maken), añade las recetas base e [invita a tu equipo](#keukenteam-uitnodigen). Dale a tu segundo el rol de editor.'],
      ['Días 6 y 7: en la cocina', 'Pon Savour [como app](#app-installeren) en los móviles y en la tableta del pase, usa el [modo cocina](#kookmodus) durante la mise en place e [imprime](#printen-map) la carpeta del pase.']
    ]
  }
};
