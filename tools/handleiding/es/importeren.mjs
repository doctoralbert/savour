// Manual (Spaans), sección «Importar recetas», con una página por app de recetas (apps).

export const groups = {
  importeren: {
    name: 'Importar recetas',
    intro: 'Llevar tus recetas a Savour: desde Word, PDF, fotos, texto, webs, apps de notas y más de quince apps de recetas.'
  }
};

export const pages = {
  importeren: {
    slug: 'es/manual-importar',
    menu: 'Resumen: importar recetas',
    h1: 'Importar recetas',
    title: 'Importar recetas desde Word, PDF, fotos y otras apps | Manual de Savour',
    desc: 'Todas las formas de llevar recetas a Savour: Word, PDF, fotos de notas, texto, una web, apps de notas, CSV y exportaciones de Paprika, Mela, Mealie y más.',
    lead: 'Toda tu carpeta de recetas en Savour de una vez, venga de donde venga. Aquí ves cómo funciona cada fuente.',
    sections: [
      ['Por dónde empezar', 'Elige en el menú «Añadir receta» y después «Importar receta». Ves las fuentes desde las que puedes importar. Cada fuente abre un selector que solo muestra los archivos adecuados. También puedes arrastrar archivos a la pantalla.'],
      [
        'Archivos y documentos',
        'Estas fuentes las lee el lector de Savour, gratis y sin IA:',
        [
          '[Word](#import-word): .doc y .docx, también con cientos de recetas en un documento.',
          '[PDF](#import-pdf): PDF digitales. Un PDF escaneado lo lee la IA (Savour Pro).',
          '[Escribir o pegar texto](#import-tekst): de un correo, WhatsApp o una nota.',
          '[Otros archivos de texto](#import-tekstbestanden): .txt, .md, .rtf, .odt, .html y Pages.',
          '[Hojas de cálculo y CSV](#import-csv): Excel o Google Sheets, guardado como .csv.',
          '[JSON y schema.org](#import-json): recetas en formato fijo y archivos de Savour.',
          '[Una carpeta entera o un ZIP](#import-hele-map): todo mezclado de una vez.'
        ]
      ],
      ['Fotos y webs', 'Las fotos de recetas manuscritas o escaneadas y la cámara las lee la IA de Savour Pro: ver [Fotos y notas](#import-fotos). Una receta de una web la traes con el enlace: ver [Receta de una web](#import-website).'],
      ['Cambiar desde otra app', 'Savour lee exportaciones de [Paprika](#import-paprika), [Mela](#import-mela), [Mealie](#import-mealie), [Tandoor](#import-tandoor), [Recipe Keeper](#import-recipe-keeper), [Copy Me That](#import-copy-me-that), [Crouton](#import-crouton), [MasterCook](#import-mastercook), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook), [Evernote](#import-evernote), [Google Keep](#import-google-keep), [Flavorish](#import-flavorish), [CookBookManager](#import-cookbookmanager) y [Plan to Eat](#import-plan-to-eat). Notas de Apple Notas, OneNote, Notion y otras apps: ver [Apps de notas](#import-notitie-apps). El resumen está en [Cambiar a Savour](#overstappen).'],
      ['Siempre revisar primero', 'No se guarda nada antes de que lo hayas visto. En la [pantalla de revisión](#import-controleren) ves por receta lo que se ha leído y dónde Savour tiene dudas. Savour nunca inventa cantidades, ingredientes ni pasos.'],
      ['Gratis y Savour Pro', 'Con una cuenta gratuita importas Word, PDF, texto y exportaciones de otras apps hasta tener 100 recetas. Si te queda menos espacio del que importas, Savour guarda las primeras que caben y el resto se queda en la pantalla de revisión. Con [Savour Pro](#gratis-en-pro) guardas recetas ilimitadas y la IA lee fotos, PDF escaneados y recetas dudosas, hasta 150 importaciones al mes. Ver [El lector de Savour y la IA](#import-ai).'],
      ['Sin tiempo para hacerlo tú', 'Con el [servicio de importación](#import-service), los cocineros detrás de Savour traspasan toda tu carpeta de recetas.']
    ]
  },
  'import-controleren': {
    slug: 'es/manual-revisar-importacion',
    menu: 'Revisar y guardar una importación',
    title: 'Revisar las recetas importadas antes de guardarlas | Manual de Savour',
    desc: 'La pantalla de revisión de Savour: título, ingredientes, preparación, rendimiento y categoría por receta, avisos cuando hay dudas, recetas duplicadas y guardar todo de una vez.',
    lead: 'Antes de guardar nada ves exactamente lo que Savour ha leído.',
    sections: [
      ['La pantalla de revisión', 'Al procesar se abre «Importar varias recetas». Arriba ves cuántas recetas se han encontrado y de cuántos archivos, y si todo se ha leído con claridad. Debajo, cada receta es una tarjeta con los campos Título, Ingredientes, Preparación, Rendimiento y Categoría. Lo cambias todo en la tarjeta.'],
      [
        'Avisos cuando hay dudas',
        'Savour muestra dónde no está seguro:',
        [
          'Corregido automáticamente: pequeñas erratas que el lector ha corregido, para que las revises.',
          'No se lee bien: una parte que conviene comparar con el original. Va marcada en amarillo.',
          '«Posiblemente incompleta»: parece faltar algo. Las recetas incompletas en la fuente se omiten; con «Importar de todos modos» las añades, marcadas para revisarlas después.'
        ]
      ],
      ['Quitar una receta o girar una foto', 'Si una tarjeta no corresponde, como un índice o una nota que no es una receta, la quitas con la cruz. En una receta de una foto, «Girar foto» la gira un cuarto de vuelta.'],
      ['Guardar', 'Elige «Guardar todas las recetas». Si una receta ya está exactamente igual en tu biblioteca o aparece dos veces en la importación, Savour la guarda una sola vez y te dice cuántos duplicados ha omitido. Con «Volver a importar» vuelves sin guardar.'],
      ['Con una cuenta gratuita', 'Si te queda espacio para menos recetas de las que importas, Savour pregunta si guarda las que caben. Las demás se quedan en la pantalla de revisión; con [Savour Pro](#gratis-en-pro) guardas recetas ilimitadas.'],
      ['Qué hacer después', 'Los números delante de los nombres de un recetario antiguo («12. Jugo de ternera») los quitas de una vez con [Limpiar](#opschonen). Después [ordenas las recetas](#ordenen) en categorías y carpetas.'],
      ['En qué fijarte', 'Revisa sobre todo los números, las unidades y el rendimiento. Un 3 y un 8 o un 1 y un 7 se confunden fácilmente en una nota manchada. En una receta de una foto, abre después el original con «Ver la nota original».']
    ]
  },
  'import-word': {
    slug: 'es/manual-importar-desde-word',
    menu: 'Archivos de Word (.doc, .docx)',
    h1: 'Importar recetas desde Word',
    title: 'Importar recetas desde Word (.doc y .docx) | Manual de Savour',
    desc: 'Así llevas recetas de Word a Savour: un documento con cientos de recetas se divide solo en título, rendimiento, ingredientes y preparación.',
    lead: 'Un documento de Word con todo tu recetario o cien archivos sueltos: Savour los separa solo.',
    sections: [
      ['Cómo importar', 'Elige «Añadir receta» → «Importar receta» → archivo de Word. Elige uno o varios archivos .doc o .docx y después «Procesar». Luego [revisa las recetas](#import-controleren).'],
      ['Qué reconoce el lector de Savour', 'El lector de Savour divide un documento en recetas sueltas, también con cientos de recetas. En cada una reconoce título, rendimiento, ingredientes y preparación. Es gratis y sin IA.'],
      ['Cómo detecta Savour una receta nueva', 'Una receta nueva empieza en un título de Word (Título 1), en una línea en negrita que parece un nombre de receta o en un nombre seguido de un nuevo encabezado «Ingredientes». Encabezados como «Ingredientes» y «Preparación» ayudan mucho al lector. Una línea que termina en dos puntos, como «Masa:», se convierte en una [parte de la receta](#recept-delen).'],
      ['Archivos .doc antiguos', 'También se leen los .doc antiguos de Word 97–2003. Si uno no funciona, guárdalo en Word como .docx e inténtalo de nuevo.'],
      ['Tablas', 'Si tus ingredientes están en una tabla, cada fila se convierte en una línea con las celdas seguidas. En tablas, revisa el orden de cantidad y producto.'],
      ['Consejos para el mejor resultado', 'Pon a cada receta un título claro como encabezado, cada ingrediente en su línea con la cantidad delante y «Preparación» encima de los pasos. Más consejos: [Una receta que todos hacen igual](#tips-recept-schrijven).'],
      ['Pages y Google Docs', 'Savour no puede leer un archivo de Pages: expórtalo en Pages como Word (.docx) o PDF. En Google Docs elige Archivo → Descargar → Microsoft Word (.docx).']
    ]
  },
  'import-pdf': {
    slug: 'es/manual-importar-desde-pdf',
    menu: 'Archivos PDF',
    h1: 'Importar recetas desde PDF',
    title: 'Importar recetas desde un PDF, también escaneado | Manual de Savour',
    desc: 'Así importas recetas desde PDF a Savour: el lector de Savour lee gratis los PDF digitales y la IA de Savour Pro lee los escaneados.',
    lead: 'Un recetario digital, una exportación de otro programa o el escaneo de una nota.',
    sections: [
      ['Cómo importar', 'Elige «Añadir receta» → «Importar receta» → archivo PDF, elige uno o varios PDF y después «Procesar». Luego [revisa las recetas](#import-controleren).'],
      ['PDF digital', 'Un PDF hecho desde Word, otro programa o una web contiene texto. El lector de Savour lo lee gratis, igual que un [archivo de Word](#import-word): lo divide en recetas y reconoce título, rendimiento, ingredientes y preparación. Un gran espacio en blanco en una página cuenta como separación.'],
      ['PDF escaneado', 'Un escaneo es una foto dentro de un PDF, sin texto. Lo lee la IA de [Savour Pro](#gratis-en-pro), igual que [una foto](#import-fotos). Sin Pro, Savour avisa de que el archivo no contiene texto legible.'],
      ['Dos columnas y maquetación', 'En un PDF a dos columnas o con mucha maquetación, el orden de las líneas puede variar. Revisa esas recetas con más cuidado. Si aún tienes el Word original, importa mejor ese.']
    ]
  },
  'import-fotos': {
    slug: 'es/manual-importar-fotos-y-notas',
    menu: 'Fotos, notas y la cámara',
    h1: 'Importar fotos y notas a mano',
    title: 'Leer recetas manuscritas y notas desde una foto | Manual de Savour',
    desc: 'Así llevas recetas manuscritas, notas y páginas de libros a Savour: sube fotos o usa la cámara, la IA las lee y la nota original se conserva.',
    lead: 'La nota del pase, el cuaderno de la escuela o una página de un libro: una foto y ya está dentro.',
    sections: [
      ['Subir fotos', 'Elige «Añadir receta» → «Importar receta» → «Fotos» y elige una o varias fotos (.jpg, .png o .webp). Cada foto se lee como una receta. Funciona con [Savour Pro](#gratis-en-pro), hasta 150 importaciones al mes.'],
      ['Usar la cámara', 'Elige «Hacer una foto con la cámara». En el móvil se abre la cámara; en el ordenador, la webcam. Pon la nota plana, con buena luz, y haz la foto recta desde arriba con toda la página a la vista.'],
      ['Qué hace la IA', 'Savour endereza primero la foto y lee una copia con más contraste. La IA lee lo que pone y no inventa nada: lo que no está en la nota no está en la receta. Si la IA duda, lo ves en la [pantalla de revisión](#import-controleren).'],
      ['El original se conserva', 'En una receta leída de una foto, la nota se conserva. Abre la receta y elige «Ver la nota original» para compararla.'],
      ['Varias fotos en un ZIP', 'Si tienes todas las fotos en un ZIP, elígelo en «Desde otra app de recetas» o «Todos los archivos mezclados». Si solo contiene fotos, Savour lee cada foto como una receta. Ver [Una carpeta entera o un ZIP](#import-hele-map).'],
      ['Consejos para una buena foto', 'Una receta por foto, sin sombra del móvil, sin flash sobre papel brillante. Después revisa sobre todo los números. Más consejos: [De la nota a la ficha](#tips-kladjes).'],
      ['Fotos de iPhone (HEIC)', 'Savour lee .jpg, .png y .webp. Si tu iPhone guarda las fotos en HEIC, elige «Más compatible» en Ajustes → Cámara → Formatos, o usa la cámara de Savour.']
    ]
  },
  'import-tekst': {
    slug: 'es/manual-pegar-texto',
    menu: 'Escribir o pegar texto',
    h1: 'Importar recetas desde texto',
    title: 'Pegar una receta de un correo, WhatsApp o una nota | Manual de Savour',
    desc: 'Así pegas recetas en Savour: texto de un correo, WhatsApp, una web o una app de notas, también varias recetas a la vez. El lector de Savour las separa.',
    lead: 'Una receta que te ha mandado un colega o toda una lista de tus notas: pegar y listo.',
    sections: [
      ['Cómo funciona', 'Elige «Añadir receta» → «Importar receta» → «Introducir texto». Escribe o pega el texto en el cuadro y elige «Procesar». Puedes pegar varias recetas a la vez.'],
      ['Qué reconoce Savour', 'El lector de Savour divide el texto en recetas y reconoce título, rendimiento, ingredientes y preparación, igual que en un [archivo de Word](#import-word). Si pegas desde Word o un correo, Savour recuerda las líneas en negrita: suelen ser un nombre de receta o una parte como «Masa».'],
      ['Pegarlo bien', 'Pon el título arriba, luego los ingredientes en líneas sueltas con la cantidad delante, y después la preparación. Una línea en blanco entre recetas ayuda al lector.'],
      ['Prefieres rellenarlo tú', 'Para rellenar una receta campo por campo, usa [Introducir manualmente](#recept-maken).']
    ]
  },
  'import-tekstbestanden': {
    slug: 'es/manual-importar-archivos-de-texto',
    menu: 'Texto, Markdown, RTF, ODT y HTML',
    h1: 'Importar archivos de texto',
    title: 'Importar recetas desde .txt, .md, .rtf, .odt y .html | Manual de Savour',
    desc: 'Así importas recetas desde archivos de texto a Savour: texto plano, Markdown, RTF, OpenOffice y LibreOffice (.odt), páginas web (.html) y Pages.',
    lead: 'Archivos del Bloc de notas, TextEdit, LibreOffice, Obsidian o una página web guardada.',
    sections: [
      ['Cómo importar', 'Elige «Añadir receta» → «Importar receta» → «Otros archivos» y elige tus archivos. Elige «Procesar» y [revisa las recetas](#import-controleren).'],
      [
        'Qué archivos',
        'El lector de Savour lee gratis estos archivos:',
        [
          '.txt: texto plano del Bloc de notas, TextEdit o una app de notas.',
          '.md: Markdown de Obsidian, Notion, Bear, Joplin y otras apps. Un título con # se convierte en nombre de receta.',
          '.rtf: texto enriquecido de WordPad o TextEdit.',
          '.odt: OpenOffice y LibreOffice Writer.',
          '.html: una página web guardada. Si la receta está en formato fijo (schema.org), Savour la toma tal cual; si no, el lector lee el texto.'
        ]
      ],
      ['Pages', 'Savour no puede leer un archivo de Pages. En Pages elige Archivo → Exportar a → Word o PDF, e importa ese archivo.'],
      ['Muchos archivos a la vez', 'Con cientos de notas sueltas, usa [Elegir una carpeta entera](#import-hele-map) o mételas en un ZIP.']
    ]
  },
  'import-hele-map': {
    slug: 'es/manual-importar-carpeta-o-zip',
    menu: 'Una carpeta entera o un ZIP',
    h1: 'Importar una carpeta entera o un ZIP',
    title: 'Importar de una vez una carpeta o un ZIP con recetas | Manual de Savour',
    desc: 'Así importas todos tus archivos de recetas a la vez en Savour: una carpeta con Word, PDF, fotos y texto mezclados, o un ZIP con documentos o fotos.',
    lead: 'Toda tu carpeta de recetas del ordenador en Savour de una vez, aunque esté todo mezclado.',
    sections: [
      ['Todos los archivos mezclados', 'Elige «Añadir receta» → «Importar receta» → «Todos los archivos mezclados». Así eliges Word, PDF, fotos, archivos de texto y exportaciones de otras apps de una vez.'],
      ['Elegir una carpeta entera', 'Elige «Elegir una carpeta entera» y señala una carpeta. Savour toma todos los archivos que puede leer, también los de subcarpetas. Los que no puede leer los omite.'],
      [
        'Un archivo ZIP',
        'No hace falta descomprimir un ZIP. Savour mira cada archivo de dentro:',
        [
          'Word, PDF, Markdown, RTF y ODT se leen como si los hubieras elegido sueltos.',
          'Las exportaciones de otras apps del ZIP se reconocen, también un ZIP dentro de otro.',
          'Si solo contiene fotos, cada foto se lee como una receta (Savour Pro).',
          'Si contiene recetas y fotos, las fotos son las de esas recetas.'
        ]
      ],
      ['Progreso', 'Con muchos archivos ves el progreso por archivo. Si algo falla en uno, Savour te dice cuál y por qué, y sigue con el resto.'],
      ['Después', 'Todas las recetas llegan juntas a una [pantalla de revisión](#import-controleren). En cada receta pone de qué archivo viene.']
    ]
  },
  'import-website': {
    slug: 'es/manual-importar-receta-de-una-web',
    menu: 'Receta de una web',
    h1: 'Importar una receta de una web',
    title: 'Importar una receta de una web con el enlace | Manual de Savour',
    desc: 'Así llevas una receta de una web a Savour: pega el enlace y Savour lee la receta de la página. Funciona con la mayoría de webs de recetas.',
    lead: 'Pega el enlace de una página de receta y Savour saca la receta, sin anuncios ni historias.',
    sections: [
      ['Cómo funciona', 'Elige «Añadir receta» → «Importar receta» → «Página web (enlace)». Pega el enlace de la página y elige «Procesar». Tienes que haber iniciado sesión.'],
      ['Qué lee Savour', 'La mayoría de webs de recetas publican sus recetas en un formato fijo (schema.org) dentro de la página. Savour lo lee directamente: título, ingredientes, preparación y rendimiento. Si la receta no está en ese formato, el lector de Savour lee el texto de la página y, con Pro, la IA si hace falta.'],
      ['No se encuentra receta', 'Si Savour no encuentra una receta en la página, te lo dice y no inventa nada. En ese caso copia el texto y usa [Introducir texto](#import-tekst).'],
      ['Páginas con inicio de sesión', 'Savour no puede abrir páginas que exigen iniciar sesión o pagar. Copia el texto o guarda la página como .html e impórtala en [Otros archivos](#import-tekstbestanden).'],
      ['Citar la fuente', 'Si usas una receta de otra persona, pon la fuente en una [nota](#recept-notities) de la receta.']
    ]
  },
  'import-csv': {
    slug: 'es/manual-importar-csv-y-excel',
    menu: 'Excel, Google Sheets y CSV',
    h1: 'Importar recetas desde Excel y CSV',
    title: 'Importar recetas desde Excel, Google Sheets o CSV | Manual de Savour',
    desc: 'Así importas una lista de recetas de Excel o Google Sheets a Savour: guárdala como CSV con columnas de título, ingredientes y preparación, una receta por fila.',
    lead: '¿Llevas tus recetas en una hoja de cálculo? Con los nombres de columna correctos están en Savour de una vez.',
    sections: [
      ['Una receta por fila', 'Savour lee un CSV con encabezados en la primera fila y una receta por fila. El separador puede ser una coma o un punto y coma.'],
      [
        'Nombres de columna',
        'Savour reconoce estas columnas, con o sin mayúsculas:',
        [
          'Título: title, name, naam, titel o recipe (obligatoria).',
          'Ingredientes: ingredients, ingredient o ingrediënten.',
          'Preparación: directions, instructions, method, bereiding, steps o preparation.',
          'Rendimiento: servings, yield, opbrengst, porties o serves.',
          'Notas: notes o notities.'
        ]
      ],
      ['Varias líneas en una celda', 'En la celda de ingredientes pon cada ingrediente en su línea (en Excel con Alt+Intro, en Mac con Opción+Intro). Lo mismo para los pasos de la preparación.'],
      ['Guardar como CSV', 'En Excel elige Archivo → Guardar como → CSV UTF-8. En Google Sheets elige Archivo → Descargar → Valores separados por comas (.csv).'],
      ['Importar', 'Elige «Añadir receta» → «Importar receta» → «Otros archivos» o «Desde otra app de recetas», elige el .csv y después «Procesar». Si Savour no reconoce las columnas, el lector lee el archivo como texto.']
    ]
  },
  'import-json': {
    slug: 'es/manual-importar-json-y-schema-org',
    menu: 'JSON, schema.org y copias de seguridad',
    h1: 'JSON, schema.org y archivos de Savour',
    title: 'Importar recetas desde JSON, JSON-LD y una copia de Savour | Manual',
    desc: 'Así importas recetas en formato fijo a Savour: JSON y JSON-LD con schema.org Recipe, HTML con schema.org, un archivo de importación de Savour y tu propia copia de seguridad.',
    lead: 'Recetas que ya están ordenadas en campos: de otro programa, de una web o de tu propia copia de seguridad.',
    sections: [
      ['schema.org Recipe', 'Muchos programas y webs guardan recetas en el formato fijo de schema.org (Recipe), como JSON-LD o en HTML. Savour lee el nombre, los ingredientes, la preparación (también por pasos y secciones), el rendimiento, la categoría y las notas.'],
      ['Archivos JSON', 'Elige un .json en «Otros archivos» o «Desde otra app de recetas». Savour busca las recetas en el archivo, también en una lista o en una exportación de Mealie o Tandoor. Un JSON cualquiera sin recetas en forma reconocible no se puede leer.'],
      ['Restaurar tu copia de Savour', 'Una [copia de seguridad que descargas de Savour](#downloaden) (.json) se puede volver a importar en «Otros archivos». Las recetas van a la [pantalla de revisión](#import-controleren); las que ya están exactamente igual en tu biblioteca no se guardan dos veces.'],
      ['Archivo de importación de Savour', 'Con el [servicio de importación](#import-service) a veces recibes un archivo de importación de Savour (.json) con recetas ya leídas y revisadas. También lo eliges en «Otros archivos»; no se guarda nada hasta que pulsas Guardar.']
    ]
  },
  'import-notitie-apps': {
    slug: 'es/manual-importar-desde-apps-de-notas',
    menu: 'Apps de notas: Notas, OneNote, Notion',
    h1: 'Importar recetas desde apps de notas',
    title: 'Importar recetas desde Apple Notas, OneNote, Notion y Obsidian | Manual',
    desc: 'Así llevas recetas de apps de notas a Savour: Apple Notas, Google Docs, OneNote, Notion, Obsidian, Bear, Joplin y Simplenote, mediante Word, PDF, Markdown o texto.',
    lead: '¿Tienes las recetas repartidas en notas del móvil? Así llegan a Savour.',
    sections: [
      ['La vía rápida', 'Para una o pocas recetas: abre la nota, copia el texto y pégalo en [Introducir texto](#import-tekst). Puedes pegar varias recetas a la vez.'],
      ['Apple Notas', 'En un Mac elige una nota y Archivo → Exportar como PDF, e importa ese [PDF](#import-pdf). En el iPhone copia el texto y pégalo en Introducir texto.'],
      ['Google Docs', 'Elige Archivo → Descargar → Microsoft Word (.docx) e importa el [archivo de Word](#import-word). Un documento con todas tus recetas está bien.'],
      ['Microsoft OneNote', 'Exporta una página o sección como Word o PDF (Archivo → Exportar) e importa ese archivo. También puedes copiar y pegar una página suelta.'],
      ['Notion', 'En la página con tus recetas elige ⋯ → Exportar → Markdown y CSV. Recibes un ZIP con archivos .md; elígelo en «Todos los archivos mezclados». Ver [Una carpeta entera o un ZIP](#import-hele-map).'],
      ['Obsidian, Bear, Joplin y Simplenote', 'Estas apps guardan las notas como Markdown o texto, o pueden exportarlas así. Elige la carpeta con archivos .md o .txt con «Elegir una carpeta entera», o mételos en un ZIP. Cada archivo es una receta, con el título # como nombre.'],
      ['Evernote y Google Keep', 'Para estas Savour tiene su propia importación: ver [Evernote](#import-evernote) y [Google Keep](#import-google-keep).']
    ]
  },
  'import-ai': {
    slug: 'es/manual-lector-savour-e-ia',
    menu: 'El lector de Savour y la IA',
    title: 'El lector de Savour y la IA: cuándo lee la IA tus recetas | Manual',
    desc: 'Cómo lee Savour las recetas: siempre primero el lector de Savour, gratis y sin IA. La IA de Savour Pro lee fotos, escaneos y recetas dudosas, hasta 150 al mes.',
    lead: 'Qué hace el lector de Savour, cuándo entra la IA y por qué nunca se inventa nada.',
    sections: [
      ['El lector de Savour va siempre primero', 'Word, PDF, texto y exportaciones de otras apps los lee el lector de Savour: un programa propio que separa las recetas y reconoce título, rendimiento, ingredientes y preparación. Es gratis y nada va a una IA.'],
      ['Cuándo ayuda la IA', 'Con [Savour Pro](#gratis-en-pro) la IA entra para:', ['Fotos de recetas manuscritas o escaneadas, y la cámara.', 'PDF escaneados sin texto.', 'Recetas sobre las que el lector de Savour duda: se vuelven a leer.']],
      ['Sin Pro', 'En una cuenta gratuita ves cuántas recetas se han leído con dudas. Van marcadas para que las revises en la [pantalla de revisión](#import-controleren). No se pierde nada.'],
      ['El límite', 'Savour Pro lee hasta 150 importaciones al mes con IA. Al llegar al límite, el lector de Savour toma el relevo, con las recetas marcadas para revisar.'],
      ['Nunca inventado', 'La IA solo puede leer lo que pone. Si la preparación no está en la nota, tampoco estará en la receta. Por qué importa tanto: [Por qué la IA nunca debe inventar tu receta](/blog/ai-mag-je-recept-niet-verzinnen).']
    ]
  },
  overstappen: {
    slug: 'es/manual-cambiar-a-savour',
    menu: 'Cambiar a Savour',
    title: 'Cambiar a Savour desde otra app de recetas | Manual',
    desc: 'Todas las apps de recetas desde las que te pasas a Savour: Paprika, Mela, Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton, MasterCook, Cookmate, Living Cookbook y más.',
    lead: 'Vengas de la app que vengas: haz una exportación, elige el archivo y tus recetas están en Savour.',
    sections: [
      ['Cómo funciona el cambio', 'Casi todas las apps de recetas pueden hacer una exportación: un archivo con todas tus recetas. Ese archivo lo eliges en Savour en «Desde otra app de recetas». Savour reconoce solo de qué app viene.'],
      [
        'Apps con importación propia',
        'Para cada app se explica cómo hacer la exportación:',
        [
          '[Paprika](#import-paprika): .paprikarecipes y .paprikarecipe',
          '[Mela](#import-mela): .melarecipes y .melarecipe',
          '[Mealie](#import-mealie): .zip con JSON',
          '[Tandoor](#import-tandoor): .json o .zip',
          '[Recipe Keeper](#import-recipe-keeper): .zip',
          '[Copy Me That](#import-copy-me-that): .zip con HTML',
          '[Crouton](#import-crouton): .zip con .crumb',
          '[MasterCook](#import-mastercook): .mx2 y .mxp',
          '[Cookmate](#import-cookmate): .mcb',
          '[Living Cookbook](#import-living-cookbook): .fdx y .fdxz',
          '[Evernote](#import-evernote): .enex',
          '[Google Keep](#import-google-keep): .zip de Google Takeout',
          '[Flavorish](#import-flavorish): .zip',
          '[CookBookManager](#import-cookbookmanager): .zip con .yml',
          '[Plan to Eat](#import-plan-to-eat): .csv',
          '[Pepperplate](#import-pepperplate): sin archivo de exportación'
        ]
      ],
      ['¿Tu app no está?', 'Mira si tu app puede exportar a CSV, HTML, JSON (schema.org), Word, PDF o texto; Savour casi siempre los lee. Ver [Excel y CSV](#import-csv), [JSON y schema.org](#import-json) y [Archivos de texto](#import-tekstbestanden). Si no funciona, [ponte en contacto](/contact) y envía un ejemplo de tu exportación.'],
      ['Cancelar tu app anterior', 'Mantén tu app anterior un tiempo junto a Savour hasta haber revisado todo. Guarda el archivo exportado como copia de seguridad.'],
      ['Comparar', '¿Aún dudas? En [Savour, Paprika, Meez y Galley comparados](/blog/savour-paprika-meez-galley-vergelijken) están las diferencias y el público de cada app.']
    ]
  },
  'import-pepperplate': {
    slug: 'es/manual-importar-desde-pepperplate',
    menu: 'Cambiar desde Pepperplate',
    h1: 'Traspasar recetas desde Pepperplate',
    title: 'Traspasar tus recetas de Pepperplate a Savour | Manual',
    desc: 'Así traspasas recetas de Pepperplate a Savour: Pepperplate no tiene un archivo de exportación útil, pero con el enlace o copiando se puede.',
    lead: 'Pepperplate no tiene una exportación que Savour pueda leer. Así traspasas tus recetas de todos modos.',
    sections: [
      ['Por qué no hay importación propia', 'Pepperplate no crea un archivo de exportación con recetas en formato fijo. Otras apps traen las recetas iniciando sesión con tu contraseña de Pepperplate. Savour no lo hace a propósito: Savour nunca pide tu contraseña de otro servicio.'],
      ['Recetas de webs', 'Si una receta venía de una web, impórtala de nuevo con el enlace: ver [Receta de una web](#import-website).'],
      ['Tus propias recetas', 'Abre la receta en Pepperplate, copia el texto y pégalo en [Introducir texto](#import-tekst). Puedes pegar varias seguidas; deja una línea en blanco entre ellas.'],
      ['Muchas recetas', 'Si tienes cientos de recetas y no tienes tiempo para copiarlas, el [servicio de importación](#import-service) las traspasa por ti.']
    ]
  },
  'import-service': {
    slug: 'es/manual-servicio-de-importacion',
    menu: 'El servicio de importación',
    title: 'El servicio de importación: traspasa tu carpeta de recetas | Manual de Savour',
    desc: '¿Sin tiempo para importar? Con el servicio de importación de Savour, unos cocineros traspasan toda tu carpeta de recetas, con la estructura que elijas, receta por receta revisada.',
    lead: '¿Sin tiempo para hacerlo tú? Los cocineros detrás de Savour traspasan tu carpeta de recetas.',
    sections: [
      ['Qué es', 'Con el servicio de importación entregas tus recetas tal como están: Word, PDF, fotos, notas o una exportación de otra app. Los cocineros detrás de Savour las traspasan con la estructura que elijas y comparan cada receta con el original.'],
      ['Solicitarlo', 'En la página [Servicio de importación](/recepten-laten-inladen) lo solicitas y ves el precio. Después subes tus archivos en la web.'],
      ['Qué recibes', 'Tus recetas quedan en tu propia cuenta de Savour, o recibes un archivo de importación de Savour para [importarlo](#import-json) tú. Las revisas en la [pantalla de revisión](#import-controleren) antes de guardarlas.'],
      ['Leer más', 'Cómo funciona en la práctica: [Traspasar tu recetario](/blog/receptenmap-laten-overzetten).']
    ]
  },
  'import-problemen': {
    slug: 'es/manual-problemas-al-importar',
    menu: 'Problemas al importar',
    title: 'Resolver problemas al importar recetas | Manual de Savour',
    desc: 'Qué hacer si la importación no funciona: no se encuentran recetas, un archivo que no se lee, recetas pegadas, fotos sin Pro y más.',
    lead: 'Los mensajes más habituales al importar y qué hacer.',
    sections: [
      ['No se encuentran recetas en la exportación', 'Savour no reconoce las recetas del archivo. Comprueba que has elegido la exportación correcta (ver la página de tu app en [Cambiar a Savour](#overstappen)). Un ZIP o JSON cualquiera sin recetas en forma reconocible no se puede leer.'],
      ['El archivo no contiene texto legible', 'Probablemente es un PDF escaneado. Lo lee la IA con [Savour Pro](#gratis-en-pro). Ver [Archivos PDF](#import-pdf).'],
      ['Leer fotos solo con Savour Pro', 'Las fotos, la cámara y los escaneos los lee la IA. Prueba los 7 días de Pro gratis o escribe la receta con [Introducir manualmente](#recept-maken).'],
      ['Dos recetas pegadas', 'El lector no vio un nombre de receta nuevo. Corrígelo en la pantalla de revisión, o pon en el documento el título de cada receta como encabezado o en negrita e importa de nuevo.'],
      ['Ingredientes en la preparación', 'Pon en tu documento un encabezado «Ingredientes» y otro «Preparación». Savour marca esas recetas como dudosas; con Pro la IA las vuelve a leer.'],
      ['Un .doc o Pages no funciona', 'Guarda un .doc antiguo como .docx en Word. Un archivo de Pages se exporta en Pages como Word o PDF.'],
      ['Números delante de los nombres', 'Quítalos de una vez tras guardar con [Limpiar](#opschonen).'],
      ['Recetas duplicadas', 'Savour guarda solo una vez las recetas exactamente iguales. Las casi iguales las encuentras con [Limpiar](#opschonen).'],
      ['Sigue sin ir bien', 'Elige «Informar de un problema» al pie de la web y adjunta el archivo o una captura. Ver [Informar de un problema y contacto](#probleem-melden).']
    ]
  }
};

export const apps = {
  'import-paprika': {
    files: 'un archivo .paprikarecipes (todas las recetas) o .paprikarecipe (una receta)',
    desc: 'Así pasas tus recetas de Paprika Recipe Manager a Savour: exporta como .paprikarecipes e importa el archivo, con fotos, notas y rendimiento.',
    lead: 'De Paprika a Savour en unos minutos, con tus fotos.',
    export: 'En Paprika selecciona las recetas que quieres llevarte (o todas) y elige Exportar. Como formato elige «Paprika Recipe Format». En el ordenador, Exportar está en el menú Archivo; en móvil o tableta, en el menú de compartir. El lugar exacto varía según la versión.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación, el rendimiento (servings), las notas (al final de la preparación) y la foto de la receta.',
    extra: [['También en HTML', 'Si exportaste de Paprika en HTML, también puedes elegir esos archivos o el ZIP; Savour lee las recetas del HTML.']]
  },
  'import-mela': {
    files: 'un archivo .melarecipes (varias recetas) o .melarecipe (una receta)',
    desc: 'Así pasas tus recetas de Mela a Savour: exporta como .melarecipes e importa el archivo, con foto, títulos, notas y rendimiento.',
    lead: 'Tus recetas de Mela con fotos y títulos en Savour.',
    export: 'En el Mac, haz clic derecho en «Todas» en el menú de la izquierda de Mela y elige exportar todas las recetas. Elige dónde guardar el archivo .melarecipes. Una selección más pequeña la exportas igual desde otra categoría, como Favoritos. Una sola receta la compartes como .melarecipe.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación, el rendimiento, las notas y la primera foto. Los títulos en ingredientes o preparación («# Salsa») se convierten en [partes de la receta](#recept-delen), como «Salsa:».'
  },
  'import-mealie': {
    files: 'una exportación de tus recetas en JSON, suelta o en un .zip',
    desc: 'Así pasas tus recetas de Mealie a Savour: exporta tus recetas en JSON o ZIP e importa el archivo. Los ingredientes con cantidad y unidad se conservan.',
    lead: 'De tu propio servidor Mealie a Savour.',
    export: 'Exporta tus recetas de Mealie en JSON. Según la versión lo encuentras al exportar recetas o en la gestión de datos. Recibes un archivo .json o un .zip con archivos JSON.',
    carries: 'Savour toma: el nombre, los ingredientes (también si cantidad, unidad, producto y nota van por separado), la preparación, el rendimiento y las notas.'
  },
  'import-tandoor': {
    files: 'una exportación en .json o un .zip con archivos JSON',
    desc: 'Así pasas tus recetas de Tandoor Recipes a Savour: exporta tus recetas en JSON e importa el archivo.',
    lead: 'De Tandoor Recipes a Savour.',
    export: 'Abre los ajustes de Tandoor y elige Exportar. Elige un tipo de exportación con recetas en JSON con formato schema.org, elige «Todas las recetas» o una selección y descarga el archivo cuando esté listo.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación (también por pasos), el rendimiento y las notas. Las fotos no van en esa exportación.'
  },
  'import-recipe-keeper': {
    files: 'el archivo .zip que crea Recipe Keeper al exportar',
    desc: 'Así pasas tus recetas de Recipe Keeper a Savour: exporta tus recetas como ZIP e impórtalo de una vez.',
    lead: 'De Recipe Keeper a Savour, con todas tus recetas en un ZIP.',
    export: 'En los ajustes de Recipe Keeper elige exportar tus recetas. Recibes un archivo .zip. No lo descomprimas.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación, el rendimiento, la categoría y las notas, tal como estén en la exportación.'
  },
  'import-copy-me-that': {
    files: 'una exportación .zip con la opción HTML',
    desc: 'Así pasas tus recetas de Copy Me That a Savour: exporta en HTML, recibes un ZIP e impórtalo en Savour.',
    lead: 'De Copy Me That a Savour.',
    export: 'En Copy Me That elige en tu cuenta exportar tus recetas y la opción «HTML». Recibes un archivo .zip.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación, el rendimiento y las notas. Si una receta no está en formato fijo en el HTML, el lector de Savour lee el texto.'
  },
  'import-crouton': {
    files: 'un .zip con archivos .crumb o un solo archivo .crumb',
    desc: 'Así pasas tus recetas de Crouton a Savour: exporta tus recetas como ZIP con archivos .crumb e impórtalo.',
    lead: 'De Crouton en iPhone, iPad o Mac a Savour.',
    export: 'Abre Crouton en iOS o macOS y ve a los ajustes. Elige exportar tus recetas (el nombre exacto varía según la versión). Recibes un .zip con un archivo .crumb por receta.',
    carries: 'Savour toma: el nombre, los ingredientes con cantidad y unidad, la preparación, el rendimiento y las notas.'
  },
  'import-mastercook': {
    files: 'un archivo .mx2 (MasterCook XML) o .mxp',
    desc: 'Así pasas tus recetas de MasterCook a Savour: exporta como .mx2 o .mxp e importa el archivo.',
    lead: 'De MasterCook a Savour, también con recetarios antiguos.',
    export: 'Abre el recetario en MasterCook y elige Archivo → Exportar. Como formato elige MasterCook (.mx2) o la exportación de texto antigua (.mxp).',
    carries: 'Savour toma: el nombre, los ingredientes con cantidad y unidad, la preparación, las raciones y las notas. Un .mxp lo lee el lector de Savour como texto; revisa esas recetas con algo más de cuidado.'
  },
  'import-cookmate': {
    files: 'un archivo .mcb, la exportación de Cookmate (antes My Cookbook)',
    desc: 'Así pasas tus recetas de Cookmate (My Cookbook) a Savour: exporta como .mcb e importa el archivo, con fotos.',
    lead: 'De Cookmate a Savour, con las fotos de tus recetas.',
    export: 'En Cookmate elige exportar o hacer una copia de tus recetas. Guarda el archivo .mcb en el móvil o el ordenador; Savour lo lee sin descomprimirlo.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación, el rendimiento, los comentarios (al final de la preparación) y la foto si va en la exportación.'
  },
  'import-living-cookbook': {
    files: 'un archivo .fdx o .fdxz',
    desc: 'Así pasas tus recetas de Living Cookbook a Savour: exporta tu recetario en FDX o FDXZ e importa el archivo, con fotos y consejos.',
    lead: 'De Living Cookbook a Savour.',
    export: 'En Living Cookbook exporta tu recetario o tus recetas en formato FDX o FDXZ (FDXZ es una versión comprimida con fotos). Savour no puede leer un archivo .lcb (la base de datos del recetario).',
    carries: 'Savour toma: el nombre, los ingredientes con cantidad y unidad, los pasos, las raciones, los comentarios, los consejos y la foto.'
  },
  'import-evernote': {
    files: 'un archivo .enex con tus notas de recetas',
    desc: 'Así pasas recetas de Evernote a Savour: exporta tus notas de recetas como .enex y Savour lee cada nota como una receta.',
    lead: 'Las recetas que guardaste durante años en Evernote, en Savour de una vez.',
    export: 'En Evernote selecciona las notas con tus recetas (o una libreta entera) y elige Archivo → Exportar notas. Elige el formato .enex y guarda el archivo.',
    carries: 'Cada nota se convierte en una receta, con el título de la nota como nombre. El texto lo lee el lector de Savour: ingredientes, preparación y rendimiento. Las notas sin ingredientes ni preparación (una lista, por ejemplo) se marcan para revisar, para quitarlas fácilmente en la pantalla de revisión. Las etiquetas y los adjuntos no se traspasan.'
  },
  'import-google-keep': {
    files: 'un .zip de Google Takeout con tus notas de Keep',
    desc: 'Así pasas recetas de Google Keep a Savour: descarga tus notas como ZIP con Google Takeout e impórtalo. Cada nota se convierte en una receta.',
    lead: 'Tus notas de recetas de Google Keep en Savour.',
    export: 'Ve a Google Takeout (takeout.google.com), elige solo «Keep» y crea la exportación. Descarga el .zip cuando Google avise de que está listo.',
    carries: 'Cada nota se convierte en una receta, con el título de la nota como nombre; la fecha de arriba se omite. Las listas de verificación quedan una línea por elemento. Las notas sin preparación (una lista de la compra, por ejemplo) se marcan para revisar, para quitarlas en la pantalla de revisión.'
  },
  'import-flavorish': {
    files: 'el archivo .zip que crea Flavorish al exportar',
    desc: 'Así pasas tus recetas de Flavorish a Savour: exporta tus recetas como ZIP e impórtalo, con fotos y títulos.',
    lead: 'De Flavorish a Savour, con tus fotos.',
    export: 'Abre la pestaña Account en Flavorish. En «Import & Export» elige exportar tus recetas. Recibes un .zip con tus recetas y fotos.',
    carries: 'Savour toma: el nombre, los ingredientes y la preparación en el orden correcto, los títulos como [partes de la receta](#recept-delen), las raciones, las notas y la foto.'
  },
  'import-cookbookmanager': {
    files: 'la exportación YAML de CookBookManager.com: un .zip con un archivo .yml por receta',
    desc: 'Así pasas tus recetas de CookBookManager.com a Savour: elige la exportación YAML, recibes un ZIP e impórtalo en Savour.',
    lead: 'De CookBookManager.com a Savour.',
    export: 'En CookBookManager.com elige exportar tus recetas y el formato YAML. Guarda el .zip.',
    carries: 'Savour toma: el nombre, los ingredientes, la preparación, las raciones, las notas (con un enlace de vídeo si lo hay) y la primera etiqueta como categoría. Una línea de ingrediente que termina en dos puntos se convierte en una [parte de la receta](#recept-delen).'
  },
  'import-plan-to-eat': {
    files: 'una exportación .csv de tus recetas',
    desc: 'Así pasas tus recetas de Plan to Eat a Savour: exporta tus recetas en CSV e importa el archivo.',
    lead: 'De Plan to Eat a Savour.',
    export: 'En los ajustes de Plan to Eat elige exportar tus recetas en CSV y descarga el archivo.',
    carries: 'Savour lee las columnas de título, ingredientes, preparación, raciones y notas. Cómo reconoce Savour las columnas está en [Excel y CSV](#import-csv).'
  }
};
