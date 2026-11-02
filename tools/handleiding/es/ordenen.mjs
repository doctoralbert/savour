// Manual (Spaans), sección «Ordenar y encontrar».

export const groups = {
  ordenen: {
    name: 'Ordenar y encontrar',
    intro: 'Encontrar tus recetas entre cientos: búsqueda, categorías con palabras clave, carpetas, favoritos y limpieza.'
  }
};

export const pages = {
  ordenen: {
    slug: 'es/manual-ordenar-y-buscar',
    menu: 'Resumen: ordenar y buscar',
    h1: 'Ordenar y buscar',
    title: 'Ordenar y buscar recetas: carpetas, categorías, favoritos | Manual de Savour',
    desc: 'Así ordenas tus recetas en Savour: una biblioteca de la A a la Z, búsqueda por ingrediente y técnica, categorías con palabras clave, carpetas, favoritos y limpieza.',
    lead: 'Encuentra tu beurre blanc en tres segundos, también entre cientos de recetas.',
    sections: [
      ['Todas las recetas', 'En «Todas las recetas» están todas tus recetas, numeradas y en orden alfabético. Con las letras A–Z saltas a una inicial y con las categorías de arriba ves un solo tipo de receta.'],
      [
        'Cuatro formas de ordenar',
        'Savour tiene cuatro, que usas a la vez:',
        [
          '[Búsqueda](#zoeken): por nombre, ingrediente, elaboración o técnica.',
          '[Categorías](#categorieen): qué es una receta, como salsas o pastelería. Cada receta tiene una.',
          '[Carpetas](#mappen): cómo trabajas, por partida, menú o temporada. Una receta puede estar en varias carpetas.',
          '[Favoritos](#favorieten): las recetas que más usas.'
        ]
      ],
      ['Limpiar', 'Tras una gran importación, [Limpiar](#opschonen) quita los números delante de los nombres y las recetas duplicadas.'],
      ['Con tu equipo', 'Tus carpetas solo las ves tú. Para compartir recetas con tu brigada, usa un [equipo de cocina](#keukenteams) con sus propias carpetas.'],
      ['Ejemplos', 'Ideas para organizarte en [Ordenar carpetas de recetas: ejemplos](/blog/receptenmappen-indelen-voorbeelden) y en el consejo [Categorías y carpetas](#tips-ordenen).']
    ]
  },
  zoeken: {
    slug: 'es/manual-buscar-recetas',
    menu: 'Búsqueda y Todas las recetas',
    title: 'Buscar recetas por nombre, ingrediente o técnica | Manual de Savour',
    desc: 'Así buscas en Savour: por nombre de receta, ingrediente, elaboración o técnica, con las letras A–Z y filtrando por categoría. También en el móvil.',
    lead: 'Encuentra la receta, o la receta que lleva esa salsa.',
    sections: [
      ['Buscar', 'Escribe en la barra de búsqueda de arriba un nombre de receta, un ingrediente, una elaboración o una técnica. Ves al momento las recetas que encajan. Así encuentras también todas las recetas con beurre noisette.'],
      ['En el móvil', 'En el móvil toca la lupa de arriba para buscar.'],
      ['Todas las recetas', 'En «Todas las recetas» están tus recetas numeradas y por orden alfabético. Con las letras A–Z saltas a una inicial.'],
      ['Filtrar por categoría', 'Arriba en Todas las recetas están tus [categorías](#categorieen). Toca una y ves solo ese tipo de recetas.'],
      ['Volver a tu sitio', 'Si abres una receta y vuelves, regresas al mismo punto de la lista.'],
      ['Recetas de un equipo de cocina', 'En un [equipo de cocina](#keukenteams) el equipo tiene su propia biblioteca con sus recetas, y buscas en ellas.']
    ]
  },
  categorieen: {
    slug: 'es/manual-categorias',
    menu: 'Categorías',
    title: 'Categorías para tus recetas: salsas, guarniciones, pastelería | Manual',
    desc: 'Así trabajas con categorías en Savour: qué es una categoría, añadir, renombrar y eliminar categorías, y la lista estándar para la cocina profesional.',
    lead: 'Una categoría dice qué es una receta: una salsa, una guarnición, un postre.',
    sections: [
      ['Qué es una categoría', 'Cada receta tiene una categoría, como salsas, helados o guarniciones. Arriba en Todas las recetas filtras por ella, y en el menú está «Categorías» con todas tus recetas por tipo.'],
      ['Gestionarlas', 'Ve a Mi cuenta → Categorías o elige Categorías en el menú. Con «＋ Añadir categoría» creas una nueva; puedes renombrar o eliminar una categoría. La lista es personal y se usa también al introducir e importar recetas.'],
      ['Lista estándar', 'Con «Lista estándar» pones de una vez una lista pensada para la cocina profesional. Tus propias categorías se mantienen.'],
      ['Sugerencia automática', 'Con palabras clave Savour sugiere una categoría según el nombre de la receta, como sorbete → Helados. Ver [Palabras clave y sugerir categorías](#categorie-trefwoorden).'],
      ['Categoría o carpeta', 'Usa categorías para lo que es una receta y [carpetas](#mappen) para cómo trabajas. Más en [Categorías y carpetas](#tips-ordenen).']
    ]
  },
  'categorie-trefwoorden': {
    slug: 'es/manual-palabras-clave-y-sugerir-categorias',
    menu: 'Palabras clave y sugerir categorías',
    title: 'Palabras clave: Savour sugiere la categoría de tus recetas | Manual',
    desc: 'Así usas palabras clave en Savour: indica palabras por categoría, como sorbete para Helados, y deja que sugiera una categoría para todas tus recetas a la vez.',
    lead: 'Deja que Savour ordene, y confirma tú lo que cambia.',
    sections: [
      ['Indicar palabras clave', 'Ve a Categorías y elige «Palabras clave» en una categoría. Indica palabras que aparecen en los nombres, como sorbete, granizado y parfait para Helados.'],
      ['En recetas nuevas', 'Si una de esas palabras está en el nombre de una receta nueva o importada, Savour elige esa categoría. Si el nombre encaja en varias, Savour pregunta cuál quieres. En caso de empate gana la palabra más larga y concreta, como «solomillo de buey» frente a «solomillo».'],
      ['Sugerir categorías', 'Con «Sugerir categorías» Savour busca de una vez una categoría adecuada para todas tus recetas según las palabras clave. Ves primero lo que cambia y lo confirmas tú.'],
      ['Consejo', 'Empieza con la [lista estándar](#categorieen), completa las palabras clave con las de tu cocina y luego deja que sugiera. Las recetas que no encajan en ninguna mantienen su categoría.']
    ]
  },
  mappen: {
    slug: 'es/manual-carpetas-de-recetas',
    menu: 'Carpetas de recetas',
    title: 'Carpetas de recetas: ordena por partida, menú o temporada | Manual de Savour',
    desc: 'Así trabajas con carpetas en Savour: crear carpetas, añadir recetas, una receta en varias carpetas, carpetas en el menú y en orden, e imprimir una carpeta.',
    lead: 'Ordena tus recetas como trabaja tu cocina: por partida, por menú o por temporada.',
    sections: [
      ['Crear una carpeta', 'En el menú, en Carpetas de recetas, elige «Añadir carpeta de recetas» y ponle un nombre, como «Garde manger», «Menú de mediodía» o «Navidad».'],
      ['Recetas en una carpeta', 'Abre una carpeta y elige qué recetas van dentro. O mete una receta desde la propia receta: elige ⋯ y «Añadir a carpeta». Una receta puede estar en varias carpetas.'],
      ['Quitar de una carpeta', 'Abre la receta desde la carpeta y elige ⋯ «Quitar de la carpeta». La receta sigue en tu biblioteca.'],
      ['Menú y orden', 'Elige qué carpetas aparecen en el menú y arrástralas al orden que te sea lógico.'],
      ['Imprimir una carpeta', 'Imprime una carpeta entera de una vez, con portada, índice y el número de cada receta al pie de página. Ver [Imprimir varias recetas](#printen-map).'],
      ['Solo para ti', 'Tus carpetas solo las ves tú. Las carpetas que compartes con tu equipo se crean en un [equipo de cocina](#keukenteam-mappen).']
    ]
  },
  favorieten: {
    slug: 'es/manual-favoritos',
    menu: 'Favoritos',
    title: 'Recetas favoritas con una estrella | Manual de Savour',
    desc: 'Así usas los favoritos en Savour: poner una estrella a una receta y abrir tus favoritos rápido desde el menú o arriba en el móvil.',
    lead: 'Las recetas que necesitas en cada servicio, siempre a un toque.',
    sections: [
      ['Marcar un favorito', 'Abre una receta y elige «Favorito» o toca la estrella. Otro toque quita la estrella.'],
      ['Abrir tus favoritos', 'Tus favoritos están en Favoritos en el menú. En el móvil los abres con la estrella de arriba.'],
      ['Favorito o carpeta', 'Los favoritos van bien para las recetas que usas mucho ahora. Para una organización fija, como por partida, usa [carpetas](#mappen).']
    ]
  },
  opschonen: {
    slug: 'es/manual-limpiar',
    menu: 'Limpiar: números y duplicados',
    title: 'Limpiar: números en los nombres y recetas duplicadas | Manual de Savour',
    desc: 'Así ordenas tu biblioteca en Savour: quitar números delante de los nombres y unir recetas duplicadas, conservando carpetas, favoritos y equipos de cocina.',
    lead: 'Todo en orden tras una gran importación, sin perder nada.',
    sections: [
      ['Dónde', 'Ve a Mi cuenta → Limpiar. Savour mira si hay números delante de los nombres, como «12. Jugo de ternera», y si hay recetas repetidas en tu biblioteca. Siempre ves antes lo que cambia.'],
      ['Quitar números', 'Si tus recetas venían de un recetario numerado, quitas los números de una vez con «Quitar números». Savour enseña antes ejemplos.'],
      ['Recetas duplicadas', 'Savour busca copias exactamente iguales: mismo nombre, rendimiento, ingredientes y preparación. De cada receta queda una. Carpetas, favoritos y equipos de cocina pasan a la receta que queda.'],
      ['Casi iguales', 'Las recetas que se diferencian un poco, como en una cantidad, Savour no las ve como duplicadas. Compáralas tú y elimínalas con [Eliminar recetas](#recept-verwijderen).']
    ]
  }
};
