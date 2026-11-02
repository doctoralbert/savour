// Manual (Spaans), sección «Crear y editar recetas».

export const groups = {
  recepten: {
    name: 'Crear y editar recetas',
    intro: 'Introducir una receta para que escalar, imprimir y compartir funcionen bien: ingredientes, preparación, partes, rendimiento, fotos, notas y recetas base.'
  }
};

export const pages = {
  'recept-maken': {
    slug: 'es/manual-editar-receta',
    menu: 'Crear y editar una receta',
    title: 'Crear y editar una receta en Savour | Manual',
    desc: 'Así creas y editas una receta en Savour: nombre, rendimiento, categoría, foto, ingredientes y preparación, una receta por partes, guardar y quién puede editar.',
    lead: 'Introducir una receta nueva o cambiar una existente, paso a paso.',
    sections: [
      ['Una receta nueva', 'Elige en el menú «Añadir receta» y después «Introducir manualmente». Se abre «Nueva receta» con los campos Nombre, Rendimiento, Categoría, Foto de la receta, Ingredientes y Preparación.'],
      [
        'Los campos',
        'Así los rellenas:',
        [
          'Nombre: corto y reconocible, para que todos encuentren la receta con una palabra.',
          '[Rendimiento](#recept-opbrengst): lo que da la receta, como «1 litro» o «40 unidades».',
          '[Categoría](#categorieen): qué tipo de receta es, como salsas o pastelería.',
          '[Foto](#recept-foto): opcional, una foto del plato.',
          '[Ingredientes](#recept-ingredienten): cada ingrediente en su línea.',
          '[Preparación](#recept-bereiding): pasos cortos, una acción por paso.'
        ]
      ],
      ['Una receta por partes', '¿Tu receta lleva masa, relleno y salsa? Elige «＋ Añadir parte» y da a cada parte sus propios ingredientes y preparación. Ver [Una receta por partes](#recept-delen).'],
      ['Guardar', 'Elige «Guardar». Con «Cancelar» o «← Volver» sales sin guardar. Si ya existe una receta exactamente igual, no se guarda dos veces.'],
      ['Editar una receta', 'Abre la receta y elige «Editar». Ves los mismos campos. Cambia lo que quieras y elige «Guardar». Quien esté en tu [equipo de cocina](#keukenteams) ve la nueva versión al momento.'],
      ['Quién puede editar', 'Solo el autor puede editar una receta. En un equipo de cocina los demás la ven; con «Añadir a mis recetas» se quedan una copia propia que pueden cambiar. Ver [Copiar una receta](#recept-overnemen).'],
      ['Muchas recetas rápido', 'Si ya tienes tus recetas en Word, PDF u otra app, [importar](#importeren) es mucho más rápido que teclearlas.']
    ]
  },
  'recept-ingredienten': {
    slug: 'es/manual-ingredientes-y-cantidades',
    menu: 'Ingredientes y cantidades',
    title: 'Introducir ingredientes y cantidades para que el escalado cuadre | Manual',
    desc: 'Así introduces ingredientes en Savour: cantidad delante, qué números, fracciones y unidades reconoce y escala Savour, y qué no se escala a propósito.',
    lead: 'Cómo escribir los ingredientes para que Savour los reconozca, los ponga en negrita y los escale bien.',
    sections: [
      ['Un ingrediente por línea', 'Pon cada ingrediente en su línea, con la cantidad delante: «250 g mantequilla», «1,5 l nata», «2 cucharadas mostaza». Con «＋ Añadir ingrediente» creas una línea y con la cruz la quitas.'],
      ['Números', 'Savour reconoce 1, 1,5, 1.000, ½, 1½, 1 1/2 y un rango como 2-3. La cantidad aparece en negrita para verla rápido en la cocina.'],
      ['Unidades que se convierten', 'g, kg, mg, ml, cl, dl y l se convierten, igual que tsp, tbsp, cup, oz y lb y las abreviaturas neerlandesas tl y el. Cómo elige Savour una unidad práctica al escalar está en [Unidades y redondeo](#eenheden).'],
      ['Unidades y otras medidas', 'Unidades, ramitas, dientes, hojas, manojos y lonchas se reconocen y se escalan, pero no se pasan a otra unidad.'],
      ['Sin escalar', '«Al gusto», «pizca» y «chorrito» no se escalan a propósito. Con grandes cantidades vuelves a probar.'],
      ['Orden', 'Pon los ingredientes en el orden en que los usas, con pesos en gramos o mililitros en vez de cucharas o tazas. Así todo escala con exactitud. Más: [Una receta que todos hacen igual](#tips-recept-schrijven).'],
      ['Una receta base como ingrediente', '¿Usas una receta propia, como un fondo, como ingrediente? Vincúlalas y abres la receta base con un toque. Ver [Vincular a una receta base](#recept-koppelen).']
    ]
  },
  'recept-bereiding': {
    slug: 'es/manual-escribir-la-preparacion',
    menu: 'Escribir la preparación',
    title: 'Escribir la preparación de una receta por pasos | Manual de Savour',
    desc: 'Así escribes la preparación en Savour: pasos cortos, una acción por paso, con temperaturas, tiempos y puntos críticos. Añadir, quitar y marcar pasos.',
    lead: 'Una preparación que todos en tu cocina hacen igual.',
    sections: [
      ['Añadir pasos', 'Con «＋ Añadir paso» creas un paso nuevo y con la cruz lo quitas. Los pasos se numeran en la receta.'],
      ['Una acción por paso', 'Escribe pasos cortos, una acción por paso. «Picar fina la chalota» y «Sudar en mantequilla sin color» son dos pasos. Así los marcas en el [modo cocina](#kookmodus).'],
      ['Puntos críticos', 'Añade lo importante: temperaturas, tiempos, el grosor o color deseado. «Reducir a un tercio» o «temperatura interna 58 °C» evita más errores que una descripción bonita.'],
      ['Partes con su propia preparación', 'Si tu receta tiene varias partes, cada parte tiene su propia preparación. Ver [Una receta por partes](#recept-delen).'],
      ['Observaciones', 'Lo que no es un paso, como «a partir de 5 kg reposar más», va en una [nota](#recept-notities).']
    ]
  },
  'recept-delen': {
    slug: 'es/manual-receta-por-partes',
    menu: 'Una receta por partes',
    title: 'Una receta por partes: masa, relleno, salsa y guarnición | Manual de Savour',
    desc: 'Así creas en Savour una receta compuesta con partes, como masa, relleno y salsa, cada una con sus ingredientes y preparación. También al importar y escalar.',
    lead: 'Un plato compuesto en una receta, con los ingredientes y la preparación de cada elaboración.',
    sections: [
      ['Cuándo usar partes', 'Para un plato hecho de elaboraciones: una tarta con masa, relleno y glaseado, o un plato con carne, salsa y guarnición. Todo está en una receta y aun así todos saben qué va con cada elaboración.'],
      ['Añadir una parte', 'Elige en la receta «＋ Añadir parte». Ponle un nombre, como «Masa», y rellena sus ingredientes y su preparación. Añade tantas partes como quieras.'],
      ['Al importar', 'Una línea que termina en dos puntos, como «Masa:», se reconoce al importar como título de una parte. También los títulos de [Mela](#import-mela), [Flavorish](#import-flavorish) y [CookBookManager](#import-cookbookmanager) se convierten en partes.'],
      ['Escalar e imprimir', 'Al [escalar](#omrekenen) se incluyen todas las partes. En la [impresión](#printen) cada parte aparece con su nombre encima de sus ingredientes y preparación.'],
      ['O mejor una receta base', '¿Usas una elaboración en muchas recetas, como un fondo o una masa base? Hazla receta propia y [vincúlala](#recept-koppelen). Así la cambias en un solo sitio.']
    ]
  },
  'recept-opbrengst': {
    slug: 'es/manual-rendimiento',
    menu: 'Rendimiento y raciones',
    title: 'El rendimiento de una receta: litros, unidades o cubiertos | Manual de Savour',
    desc: 'Así indicas el rendimiento de una receta en Savour, como 1 litro, 40 unidades u 8 cubiertos, y por qué lo necesitas para escalar a la cantidad que necesitas.',
    lead: 'Con un rendimiento escalas después a justo lo que necesitas.',
    sections: [
      ['Qué escribes', 'En Rendimiento escribe lo que da la receta, con un número: «1 litro», «2,5 kg», «40 unidades» u «8 cubiertos». En la receta aparece arriba, junto al número de ingredientes y pasos.'],
      ['Por qué ayuda', 'Con un rendimiento puedes indicar en [Más opciones de escala](#omrekenen-meer) el rendimiento deseado: si necesitas 3,5 litros de una receta de 1 litro, escribe 3,5 y Savour lo escala todo.'],
      ['Al importar', 'El lector de Savour toma el rendimiento también de un encabezado como «Ingredientes (4 personas)». De otras apps se traen las raciones o «servings».'],
      ['Sin rendimiento', 'Sin rendimiento también puedes escalar con los botones rápidos o un factor propio. Ver [Escalar](#omrekenen).']
    ]
  },
  'recept-foto': {
    slug: 'es/manual-foto-de-la-receta',
    menu: 'Fotos y la nota original',
    title: 'Una foto en la receta y la nota original | Manual de Savour',
    desc: 'Así añades una foto a una receta en Savour, cómo se conserva la nota original de una foto importada y cómo se incluyen las fotos al imprimir.',
    lead: 'Una foto del plato y, en una nota importada, el original al lado.',
    sections: [
      ['Foto del plato', 'Elige una foto en «Foto de la receta — opcional». Savour la reduce para que cargue rápido. Una foto ayuda al equipo a ver cómo debe quedar el plato.'],
      ['La nota original', 'Si la receta se leyó de una [foto o escaneo](#import-fotos), la nota original se conserva. Elige «Ver la nota original» en la receta para compararla, por ejemplo para comprobar un número.'],
      ['Fotos de otras apps', 'Al cambiar desde [Paprika](#import-paprika), [Mela](#import-mela), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook) y [Flavorish](#import-flavorish), la foto de la receta se conserva.'],
      ['Al imprimir', 'Al [imprimir varias recetas](#printen-map), «Con fotos» decide si se incluyen.']
    ]
  },
  'recept-notities': {
    slug: 'es/manual-notas-de-la-receta',
    menu: 'Notas en una receta',
    title: 'Notas en una receta: observaciones fijas y consejos | Manual de Savour',
    desc: 'Así añades una nota a una receta en Savour: una observación fija junto a la receta, cambiarla y elegir si las notas se imprimen.',
    lead: 'Una observación fija junto a la receta, para todo lo que no es ingrediente ni paso.',
    sections: [
      ['Añadir una nota', 'Abre una receta tuya y elige «＋ Nota». Escribe tu observación, como «a partir de 5 kg reposar más» o «proveedor: carnicería López». Con «Cambiar» la editas después.'],
      ['Para qué', 'Usa las notas para lo que no cabe en ingredientes ni preparación: variantes, conservación, la fuente de la receta, alérgenos o un aviso para el equipo.'],
      ['Al imprimir', 'Al [imprimir varias recetas](#printen-map), «Con notas» decide si se incluyen.'],
      ['Notas de otras apps', 'Al [importar desde otra app](#overstappen), las notas van al final de la preparación, tras «Notas:», para que no se pierda nada.']
    ]
  },
  'recept-koppelen': {
    slug: 'es/manual-vincular-receta-base',
    menu: 'Vincular a una receta base',
    title: 'Vincular un ingrediente a una receta base, como un fondo | Manual',
    desc: 'Así vinculas en Savour un ingrediente a una receta base propia, como un fondo en tu jugo: automáticamente por nombre o eligiéndolo tú, y con un toque a la receta base.',
    lead: 'Del jugo al fondo con un toque, y vuelta.',
    sections: [
      ['Automático por nombre', 'Si usas una receta propia como ingrediente y el ingrediente se llama exactamente igual que esa receta, Savour los vincula solo.'],
      ['Vincular tú', 'Si se llama distinto, abre la receta, elige ⋯ y «Vincular a receta». Elige qué ingrediente va con qué receta tuya.'],
      ['En la receta', 'Junto al ingrediente vinculado pone «Receta». Un toque y estás en la receta base, con un botón para volver.'],
      ['Por qué recetas base', 'Un fondo, una masa base o una salsa que usas en muchas recetas se cambia así en un solo sitio. Todos en el [equipo de cocina](#keukenteams) trabajan con la misma versión.']
    ]
  },
  'recept-bekijken': {
    slug: 'es/manual-abrir-y-usar-receta',
    menu: 'Abrir y usar una receta',
    title: 'Abrir una receta: modo cocina, escalar, imprimir, compartir | Manual de Savour',
    desc: 'Todo lo que puedes hacer en una receta de Savour: modo cocina, editar, imprimir, compartir, favorito, escalar, notas y el menú ⋯ con carpetas y vínculos.',
    lead: 'Todo lo que puedes hacer desde una receta, de un vistazo.',
    sections: [
      [
        'Arriba',
        'Arriba de la receta están los botones:',
        [
          '[Modo cocina](#kookmodus): solo la receta, en letra grande.',
          '[Editar](#recept-maken): cambiar la receta (solo el autor).',
          '[Imprimir](#printen): imprimir la receta, también escalada.',
          '[Compartir](#delen-link): enviar un enlace por WhatsApp, Telegram, SMS o correo.',
          '[Favorito](#favorieten): poner una estrella a la receta.'
        ]
      ],
      ['Escalar', 'Bajo el título está «Recalcular» con botones rápidos de ¼× a 10× y «Original» para volver. Ver [Escalar](#omrekenen).'],
      ['El menú ⋯', 'En una receta tuya, tras ⋯ están «Más opciones de escala», «Vincular a receta», «Añadir a carpeta» y «Eliminar de la biblioteca». Si abres la receta desde una carpeta o un equipo, aparece «Quitar de la carpeta» o «Quitar del equipo de cocina».'],
      ['Marcar', 'Toca un ingrediente o un paso para marcarlo. Tras una interrupción ves dónde ibas.'],
      ['Notas y el original', 'Bajo la receta están tus [notas](#recept-notities) y, en una receta de una foto, «Ver la nota original».'],
      ['Volver', 'Con «← Volver» regresas al mismo punto de la lista de donde venías.']
    ]
  },
  'recept-verwijderen': {
    slug: 'es/manual-eliminar-recetas',
    menu: 'Eliminar recetas',
    title: 'Eliminar recetas, una o varias a la vez | Manual de Savour',
    desc: 'Así eliminas recetas en Savour: una receta de tu biblioteca, varias a la vez o solo de una carpeta o un equipo de cocina. Savour nunca borra nada por su cuenta.',
    lead: 'Ordenar sin perder nada por error.',
    sections: [
      ['Una receta', 'Abre la receta, elige ⋯ y «Eliminar de la biblioteca». Savour pregunta antes si estás seguro.'],
      ['Varias a la vez', 'En Todas las recetas elige «Eliminar recetas», marca las recetas y confirma. Útil tras una importación con recetas que no necesitas.'],
      ['Solo de una carpeta', 'Para quitar una receta solo de una carpeta o un equipo, ábrela desde esa carpeta y elige ⋯ «Quitar de la carpeta» o «Quitar del equipo de cocina». La receta sigue en tu biblioteca.'],
      ['Recetas duplicadas', 'Las recetas duplicadas y los números delante de los nombres los limpias con [Limpiar](#opschonen). Siempre ves antes lo que cambia.'],
      ['Savour nunca borra solo', 'Savour nunca elimina recetas sin que lo pidas. Aunque [dejes Savour Pro](#pro-stoppen), todas tus recetas se quedan.']
    ]
  }
};
