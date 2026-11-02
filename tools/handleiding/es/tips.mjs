// Manual (Spaans), secciones «Consejos para buenas recetas» y «Ayuda».

export const groups = {
  tips: { name: 'Consejos para buenas recetas', intro: 'Consejos prácticos de cocina para recetas que salen igual en cada servicio.' },
  hulp: {
    name: 'Ayuda',
    intro: 'Resolver problemas, informar de un problema y las palabras que usa Savour. Si tu pregunta no está, mira las [preguntas frecuentes](/veelgestelde-vragen).'
  }
};

export const pages = {
  'tips-recept-schrijven': {
    slug: 'es/manual-consejo-escribir-una-receta',
    menu: 'Una receta que todos hacen igual',
    title: 'Escribir una ficha de cocina que todos hacen igual | Manual',
    desc: 'Consejos para una ficha técnica: nombre y rendimiento claros, ingredientes en gramos en orden de uso, pasos cortos y los puntos críticos.',
    lead: 'Una buena receta de cocina no deja lugar a interpretaciones.',
    sections: [
      ['Nombre y rendimiento', 'Empieza con un nombre claro y el [rendimiento](#recept-opbrengst): cuántos litros, cuántas unidades o para cuántos cubiertos.'],
      ['Ingredientes', 'Pon todos los ingredientes en el orden en que los usas, con la cantidad en gramos o mililitros en vez de cucharas o tazas. Ver [Ingredientes y cantidades](#recept-ingredienten).'],
      ['Preparación', 'Escribe la preparación en pasos cortos, una acción por paso. Ver [Escribir la preparación](#recept-bereiding).'],
      ['Puntos críticos', 'Anota siempre los puntos críticos: temperaturas, tiempos, el grosor o color deseado y en qué fijarse. «Reducir a un tercio» o «temperatura interna 58 °C» evita más errores que una descripción bonita.'],
      ['Leer más', 'Por qué las fichas técnicas compensan tanto: [Fichas técnicas en la cocina](/blog/standaardrecepturen-in-de-keuken).']
    ]
  },
  'tips-opschalen': {
    slug: 'es/manual-consejo-escalar-sin-errores',
    menu: 'Escalar sin errores',
    title: 'Escalar recetas sin errores: factor y probar | Manual',
    desc: 'Consejos para escalar en la cocina: trabajar con un factor en peso, y qué no escala uno a uno, como los tiempos de reducción, la sal, la acidez, las especias y los tiempos de horneado.',
    lead: 'Savour hace las cuentas. Probar sigue siendo tu oficio.',
    sections: [
      ['El factor', 'Escalas con un factor: el rendimiento deseado dividido entre el de la receta base. Si tienes una beurre blanc para 1 litro y necesitas 3,5 litros, el factor es 3,5. Trabaja siempre en peso; así el resultado es exacto. En Savour lo haces con [Más opciones de escala](#omrekenen-meer).'],
      [
        'Lo que no escala',
        'No todo escala uno a uno:',
        [
          'Las reducciones tardan más, porque una olla más grande evapora relativamente menos.',
          'La sal, la acidez y las especias se vuelven a probar en grandes cantidades.',
          'En pastelería el tiempo de horneado cambia con otro molde o un horno lleno.',
          'Los gelificantes como la gelatina y el agar sí escalan exactamente con el líquido.'
        ]
      ],
      ['Leer más', 'Más a fondo: [Escalar recetas sin errores](/blog/recepten-opschalen-zonder-fouten).']
    ]
  },
  'tips-kladjes': {
    slug: 'es/manual-consejo-de-la-nota-a-la-ficha',
    menu: 'De la nota a la ficha',
    title: 'De la nota a la ficha: conservar recetas manuscritas | Manual',
    desc: 'Consejos para guardar rápido las notas a mano: foto con buena luz, recta desde arriba, y después revisar los números.',
    lead: 'Convierte una nota en receta fija mientras aún recuerdas lo que querías decir.',
    sections: [
      ['Guardarla rápido', 'Muchas recetas empiezan como nota en el pase. Conviértela cuanto antes en una receta fija, mientras recuerdas lo que querías decir.'],
      ['La foto', 'Fotografía una receta manuscrita con buena luz, recta desde arriba y con toda la página. En Savour lo haces con [la cámara](#import-fotos).'],
      ['Revisar', 'Después revisa sobre todo los números: un 3 y un 8 o un 1 y un 7 se confunden fácilmente en una nota manchada. El original se conserva con la receta.'],
      ['Leer más', '[Digitalizar notas de recetas antiguas](/blog/oude-kladjes-digitaliseren).']
    ]
  },
  'tips-ordenen': {
    slug: 'es/manual-consejo-categorias-y-carpetas',
    menu: 'Usar bien categorías y carpetas',
    title: 'Usar bien las categorías y las carpetas en tu cocina | Manual',
    desc: 'Consejos para ordenar recetas: categorías para lo que es una receta, carpetas para cómo trabajas, y nombres cortos que tu equipo encuentra con una palabra.',
    lead: 'Lo que es una receta y cómo trabajas con ella: dos cosas distintas.',
    sections: [
      ['Categoría: lo que es', 'Usa las [categorías](#categorieen) para lo que es una receta, como salsas, guarniciones o pastelería. Una receta está en una categoría.'],
      ['Carpeta: cómo trabajas', 'Usa las [carpetas](#mappen) para cómo trabajas, como la carta actual, un evento o la cocina fría. Una receta puede estar en varias carpetas.'],
      ['Nombres', 'Usa nombres cortos y reconocibles para que todos en el equipo encuentren la receta con una palabra.'],
      ['Leer más', '[Ordenar carpetas de recetas: ejemplos](/blog/receptenmappen-indelen-voorbeelden) y [Organizar recetas en la cocina](/blog/recepten-organiseren-in-de-keuken).']
    ]
  },
  'tips-team': {
    slug: 'es/manual-consejo-trabajar-juntos',
    menu: 'Trabajar con una sola fuente',
    title: 'Trabajar con tu equipo desde una sola fuente de recetas | Manual',
    desc: 'Consejos para trabajar juntos en la cocina: una fuente para cada receta, permisos por rol y nunca más una versión antigua en un grupo de chat.',
    lead: 'Una cocina funciona mejor con una sola fuente para cada receta.',
    sections: [
      ['Una fuente', 'Comparte las recetas con un [equipo de cocina](#keukenteams) en vez de fotos o mensajes sueltos. Cuando cambias una receta, todos trabajan al momento con la nueva versión y nadie se queda con una antigua en un grupo.'],
      ['Permisos', 'Da al segundo permiso para editar recetas y al resto del equipo permiso para verlas. Ver [Roles](#keukenteam-rollen).'],
      ['Un cocinero nuevo', 'Con todas las recetas en el móvil, un cocinero nuevo se incorpora antes. Lee también [Incorporar cocineros nuevos](/blog/nieuwe-kok-inwerken).']
    ]
  },
  'tips-allergenen': {
    slug: 'es/manual-consejo-alergenos',
    menu: 'Alérgenos y acuerdos fijos',
    title: 'Alérgenos y acuerdos fijos en tus recetas | Manual',
    desc: 'Consejos para tener claros los alérgenos en tus recetas: alérgenos en la lista de ingredientes, nombrar las recetas base y comprobar rápido qué lleva un plato.',
    lead: 'Saber rápido qué lleva exactamente un plato cuando pregunta un cliente.',
    sections: [
      ['En la lista de ingredientes', 'En cada receta pon claramente en los ingredientes los componentes con alérgenos, también si vienen de otra receta base.'],
      ['Recetas base', 'En un plato compuesto, nombra las recetas base que lleva. [Vincúlalas](#recept-koppelen) y verás con un toque qué lleva el fondo o la salsa.'],
      ['Notas', 'Pon los acuerdos fijos y la información de alérgenos en una [nota](#recept-notities) de la receta, para que también salgan en la impresión.']
    ]
  },
  'probleem-inloggen': {
    slug: 'es/manual-problemas-para-iniciar-sesion',
    menu: 'Problemas para iniciar sesión',
    title: 'Resolver problemas para iniciar sesión o con el correo de confirmación | Manual',
    desc: 'Qué hacer si no puedes iniciar sesión en Savour: correo o contraseña incorrectos, sin confirmar, no recibes el correo o un enlace que ya no funciona.',
    lead: 'Los mensajes más habituales al iniciar sesión y qué hacer.',
    sections: [
      ['Correo o contraseña incorrectos', 'Comprueba que has escrito bien el correo. Si no recuerdas la contraseña, elige «¿Has olvidado tu contraseña?». Ver [Iniciar sesión y contraseña](#inloggen).'],
      ['«Confirma primero tu correo electrónico»', 'Tu cuenta aún no está confirmada. Haz clic en el enlace del correo de confirmación o deja que Savour envíe uno nuevo. Mira también en spam.'],
      ['«Este enlace ya no funciona»', 'Un enlace de un correo funciona una vez y durante una hora. Si pediste varios, solo vale el más reciente. Pide un enlace nuevo y usa el último correo.'],
      ['No recibes el correo', 'Mira en spam o correo no deseado. Con el correo de empresa puede tardar. Si se pidieron demasiados correos, Savour te lo dice; inténtalo más tarde.'],
      ['«Este correo ya tiene una cuenta»', 'Inicia sesión con ese correo o elige «¿Has olvidado tu contraseña?».'],
      ['Se cierra la sesión una y otra vez', 'Marca «Mantener la sesión iniciada» al iniciar sesión. Si está desmarcado, la sesión se cierra al cerrar la ventana.']
    ]
  },
  'probleem-melden': {
    slug: 'es/manual-informar-de-un-problema-y-contacto',
    menu: 'Informar de un problema y contacto',
    title: 'Informar de un problema o contactar con Savour | Manual',
    desc: 'Así informas de un problema en Savour, con una captura, o contactas por el formulario o en contact@savour.page.',
    lead: '¿Algo no va bien? Avísanos y los cocineros detrás de Savour lo miran.',
    sections: [
      ['Informar de un problema', 'Elige «Informar de un problema» al pie de la web. Describe qué falla y añade si puedes una captura de hasta 3 MB. Tu aviso llega directamente al equipo.'],
      ['Contacto', 'Para preguntas sobre Savour, un plan de equipo o el servicio de importación, usa el [formulario de contacto](/contact) o escribe a contact@savour.page.'],
      ['Qué ayuda', 'Indica el dispositivo y el navegador, qué hiciste y qué esperabas. Si es una importación, envía el archivo o una parte.'],
      ['Mira primero', 'Muchas respuestas están en [Problemas al importar](#import-problemen), [Problemas para iniciar sesión](#probleem-inloggen) y las [preguntas frecuentes](/veelgestelde-vragen).']
    ]
  },
  woordenlijst: {
    slug: 'es/manual-glosario',
    menu: 'Glosario',
    title: 'Glosario: los términos de Savour explicados | Manual',
    desc: 'Qué significa cada cosa en Savour: lector de Savour, equipo de cocina, carpeta, categoría, rendimiento, factor, parte, receta base, nota, modo cocina y más.',
    lead: 'Las palabras que encuentras en Savour, explicadas en breve.',
    sections: [
      [
        'Recetas',
        'Términos sobre una receta:',
        [
          'Rendimiento: lo que da una receta, como 1 litro o 40 unidades. Ver [Rendimiento](#recept-opbrengst).',
          'Parte: una elaboración de una receta con sus ingredientes y preparación, como masa o salsa. Ver [Una receta por partes](#recept-delen).',
          'Receta base: una receta propia que usas como ingrediente, como un fondo. Ver [Vincular](#recept-koppelen).',
          'Nota original: una receta manuscrita o escaneada. Ver [Fotos y notas](#import-fotos).',
          'Nota: una observación fija junto a una receta. Ver [Notas](#recept-notities).'
        ]
      ],
      [
        'Ordenar',
        'Términos sobre ordenar:',
        [
          'Categoría: lo que es una receta. Ver [Categorías](#categorieen).',
          'Palabra clave: una palabra del nombre con la que Savour sugiere una categoría. Ver [Palabras clave](#categorie-trefwoorden).',
          'Carpeta de recetas: una organización propia, como por partida. Ver [Carpetas](#mappen).',
          'Favorito: una receta con estrella. Ver [Favoritos](#favorieten).'
        ]
      ],
      [
        'Importar y escalar',
        'Términos sobre importar y escalar:',
        [
          'Lector de Savour: el programa propio de Savour que lee recetas de archivos. Ver [El lector de Savour y la IA](#import-ai).',
          'Pantalla de revisión: donde revisas una importación antes de guardar. Ver [Revisar una importación](#import-controleren).',
          'Exportación: un archivo con todas tus recetas de otra app. Ver [Cambiar a Savour](#overstappen).',
          'Factor: el número por el que multiplicas una receta. Ver [Más opciones de escala](#omrekenen-meer).',
          'Modo cocina: solo la receta, grande y con la pantalla encendida. Ver [Modo cocina](#kookmodus).'
        ]
      ],
      [
        'Trabajar juntos',
        'Términos sobre trabajar juntos:',
        [
          'Equipo de cocina: un recetario compartido para tu brigada. Ver [Equipos de cocina](#keukenteams).',
          'Propietario, editor y lector: los roles en un equipo de cocina. Ver [Roles](#keukenteam-rollen).',
          'Organización: una suscripción con la que todo tu equipo tiene Savour Pro. Ver [Organizaciones](#organisatie).',
          'Savour Pro: la suscripción de pago. Ver [Gratis y Savour Pro](#gratis-en-pro).'
        ]
      ]
    ]
  }
};
