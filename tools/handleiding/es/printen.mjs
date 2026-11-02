// Manual (Spaans), sección «Imprimir y descargar».

export const groups = {
  printen: {
    name: 'Imprimir y descargar',
    intro: 'Una receta suelta, una carpeta entera para el pase o todas tus recetas, con el logo de tu restaurante. Y descargar tus recetas en Word o como copia de seguridad.'
  }
};

export const pages = {
  printen: {
    slug: 'es/manual-imprimir',
    menu: 'Imprimir una receta',
    title: 'Imprimir una receta, también escalada | Manual de Savour',
    desc: 'Así imprimes una receta en Savour: el diseño de impresión con cantidades en negrita, imprimir escalado y en A4 o A5. También para quien abre una receta compartida.',
    lead: 'Una receta suelta para la pared o la carpeta del pase.',
    sections: [
      ['Imprimir', 'Abre la receta y elige «Imprimir». Savour abre el diseño de impresión: nombre, rendimiento, ingredientes con cantidades en negrita y la preparación por pasos. Después elige la impresora o guárdala como PDF.'],
      ['Imprimir escalado', 'Si has [escalado](#omrekenen) la receta, imprimes las cantidades escaladas. Útil para una gran producción o un evento.'],
      ['Partes de la receta', 'Si la receta tiene [partes](#recept-delen), cada parte aparece con su nombre encima de sus ingredientes y su preparación.'],
      ['Más recetas a la vez', 'Una carpeta entera, un equipo de cocina o una selección propia los imprimes de una vez: ver [Imprimir varias recetas](#printen-map).'],
      ['Con tu logo', 'Con Savour Pro el logo de tu restaurante sale en tus impresiones. Ver [Imprimir con tu logo](#printen-logo).']
    ]
  },
  'printen-map': {
    slug: 'es/manual-imprimir-carpeta-de-recetas',
    menu: 'Imprimir varias recetas o una carpeta',
    title: 'Imprimir una carpeta de recetas entera con portada e índice | Manual de Savour',
    desc: 'Así imprimes en Savour una carpeta, un equipo de cocina o todas tus recetas de una vez: elegir recetas, portada e índice, A5, fotos y notas.',
    lead: 'Toda tu carpeta de recetas para el archivador del pase, de una vez.',
    sections: [
      ['Qué puedes imprimir', 'Imprime una [carpeta de recetas](#mappen), un [equipo de cocina](#keukenteams) o todas tus recetas a la vez. Todas tus recetas las imprimes en Mi cuenta → Cuenta con «Imprimir todas las recetas».'],
      ['Elegir recetas', 'En «¿Qué recetas quieres imprimir?» marcas las que van. Con «Todas» o «Nada» empiezas rápido.'],
      [
        'Opciones',
        'Elige cómo queda la impresión:',
        [
          '«Con portada e índice»: una portada, un índice y el número de cada receta al pie de página, para pasar páginas rápido.',
          '«A5, para una carpeta pequeña en el pase» en vez de A4.',
          '«Con fotos»: la foto de cada receta.',
          '«Con notas»: tus [notas](#recept-notities) en cada receta.'
        ]
      ],
      ['Consejo para el pase', 'Imprime en A5 para una carpeta de anillas pequeña o fundas. Si cambia una receta, vuelve a imprimir solo esa.']
    ]
  },
  'printen-logo': {
    slug: 'es/manual-imprimir-con-logo',
    menu: 'Imprimir con el logo de tu restaurante',
    title: 'Imprimir recetas con el logo de tu restaurante | Manual de Savour',
    desc: 'Así pones el logo de tu restaurante en tus recetas impresas en Savour: configurar logo y nombre, blanco y negro para la impresora de cocina y logo por equipo de cocina.',
    lead: 'Tu propio recetario, con tu propio nombre y logo.',
    sections: [
      ['Configurarlo', 'Ve a Mi cuenta → Logo en las impresiones. Elige tu logo y escribe el nombre que sale en la impresión. Funciona con [Savour Pro](#gratis-en-pro), también en la semana de prueba.'],
      ['Blanco y negro', 'Elige imprimir el logo en blanco y negro para una impresora de cocina o si tu logo en color queda recargado en papel.'],
      ['Tus impresiones y los equipos', 'Tú eliges si el logo sale en tus propias impresiones. Por equipo de cocina lo activas o desactivas en la misma pestaña o en los ajustes del equipo. En un equipo sale el logo del propietario, para que todo el equipo tenga las mismas impresiones.'],
      ['Leer más', 'Por qué funciona un recetario propio con logo: [Recetario con tu logo](/blog/receptenboek-met-eigen-logo).']
    ]
  },
  downloaden: {
    slug: 'es/manual-descargar-recetas',
    menu: 'Descargar recetas: Word y copia',
    title: 'Descargar tus recetas en Word o como copia de seguridad | Manual de Savour',
    desc: 'Así descargas todas tus recetas de Savour: cada receta en su archivo de Word dentro de un ZIP, todo en un archivo de Word o una copia en JSON que puedes volver a importar.',
    lead: 'Tus recetas son tuyas. Descárgalas cuando quieras.',
    sections: [
      ['Dónde', 'Ve a Mi cuenta → Cuenta, en «Imprimir o descargar todas tus recetas». Descargar funciona con [Savour Pro](#gratis-en-pro).'],
      [
        'Tres formas',
        'Elige lo que necesitas:',
        [
          '«Word por receta»: cada receta en su propio archivo de Word con el diseño de impresión, juntos en un .zip.',
          '«Todo en un archivo de Word»: diseño sencillo con título, rendimiento, ingredientes y preparación.',
          '«Copia de seguridad»: recetas y carpetas en un archivo JSON.'
        ]
      ],
      ['Restaurar una copia', 'Una copia se puede volver a importar en Savour en «Otros archivos». Ver [JSON y copias de seguridad](#import-json).'],
      ['Sin Pro', 'Sin Pro tus recetas siguen siempre en Savour, y puedes verlas e [imprimirlas](#printen-map). Dejar Pro nunca te cuesta recetas: ver [Dejar Savour Pro](#pro-stoppen).']
    ]
  }
};
