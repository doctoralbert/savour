// Manual (Spaans), sección «En la cocina».

export const groups = {
  keuken: {
    name: 'En la cocina',
    intro: 'Escalar a cualquier rendimiento, el modo cocina con letra grande, tus recetas sin internet, listas MEP y alérgenos.'
  }
};

export const pages = {
  omrekenen: {
    slug: 'es/manual-escalar',
    menu: 'Escalar con los botones rápidos',
    h1: 'Escalar',
    title: 'Escalar y recalcular recetas en Savour | Manual',
    desc: 'Así escalas una receta en Savour: botones rápidos de ¼× a 10×, volver al original, imprimir escalado y por qué la receta guardada nunca cambia.',
    lead: 'De 8 cubiertos a 120 con un toque, sin errores de cálculo.',
    sections: [
      ['Botones rápidos', 'Bajo cada receta con ingredientes está «Recalcular» con los botones ¼×, ½×, 1½×, 2×, 3×, 4×, 5× y 10×. Un toque y todas las cantidades cambian, en todas las [partes](#recept-delen) de la receta.'],
      ['Volver al original', 'Con «Original» vuelves a ver las cantidades de partida.'],
      ['Otro factor o rendimiento', '¿Necesitas 2,5× o justo 3,5 litros? ¿O te quedan 3 kg de un ingrediente? Elige ⋯ «Más opciones de escala». Ver [Más opciones de escala](#omrekenen-meer).'],
      ['El original nunca cambia', 'Escalar solo cambia lo que ves en pantalla. La receta guardada sigue exactamente igual, también para tu equipo.'],
      ['Imprimir escalado', 'Si imprimes una receta escalada, imprimes las cantidades escaladas. Ver [Imprimir una receta](#printen).'],
      ['También sin cuenta', 'Quien abre una [receta compartida](#delen-link) también puede escalarla sin cuenta.'],
      ['Probar sigue siendo necesario', 'No todo escala uno a uno. En qué fijarte está en [Escalar sin errores](#tips-opschalen).']
    ]
  },
  'omrekenen-meer': {
    slug: 'es/manual-mas-opciones-de-escala',
    menu: 'Más opciones: factor, rendimiento, tengo',
    title: 'Escalar con un factor propio, un rendimiento o «Tengo» | Manual de Savour',
    desc: 'Así escalas en Savour con un factor propio como 2,5, a un rendimiento deseado como 3,5 litros, o desde lo que te queda de un ingrediente.',
    lead: 'Tres formas de llegar justo a lo que necesitas.',
    sections: [
      ['Dónde', 'Abre la receta, elige ⋯ y «Más opciones de escala». Eliges una de tres formas. Lo que escribes en un campo vacía los demás.'],
      ['Factor', 'Escribe un número propio, como 2,5 o 0,75. Cada ingrediente se multiplica por ese número.'],
      ['Rendimiento', 'Escribe la cantidad que necesitas. Funciona si la receta tiene un [rendimiento](#recept-opbrengst). Si la receta es para 1 litro y necesitas 3,5 litros, escribe 3,5.'],
      ['Tengo', '¿Te quedan 3,2 kg de un ingrediente, como una pieza de carne comprada o un resto de fondo? Elige el ingrediente y escribe cuánto tienes. Savour calcula el resto de la receta alrededor.'],
      ['Ejemplo', 'Necesitas una receta de 8 cubiertos para 120: el factor es 120 entre 8, o sea 15. Con un rendimiento de «8 cubiertos» escribes simplemente 120.']
    ]
  },
  eenheden: {
    slug: 'es/manual-unidades-y-redondeo',
    menu: 'Unidades y redondeo',
    title: 'Unidades y redondeo al escalar: gramos, litros, cucharas, tazas | Manual',
    desc: 'Cómo elige Savour unidades y redondea al escalar: de kilos a gramos, de cucharaditas a cucharadas, fracciones limpias para cucharas y tazas, y qué no cambia.',
    lead: 'Cantidades escaladas que de verdad puedes pesar en la cocina.',
    sections: [
      ['Una medida práctica', 'Savour convierte dentro del mismo tipo de unidad a una medida práctica: 0,25 kg pasa a 250 g y 24 tbsp a 1 ½ cup.'],
      ['Redondeo', 'Cucharas y tazas reciben fracciones limpias, como ½, ⅓ y ¾. Gramos y mililitros se quedan en números enteros.'],
      ['Qué unidades', 'Peso: mg, g, kg, oz y lb. Volumen: ml, cl, dl, l, tsp, tbsp y cup, además de las abreviaturas neerlandesas tl y el. Savour no convierte de peso a volumen, porque depende del producto.'],
      ['Qué no cambia', 'Unidades, ramitas y dientes se escalan pero no se convierten. «Al gusto», «pizca» y «chorrito» se quedan como están.'],
      ['Cómo escribirlo', 'Cómo escribir las cantidades para que Savour las reconozca está en [Ingredientes y cantidades](#recept-ingredienten).']
    ]
  },
  kookmodus: {
    slug: 'es/manual-modo-cocina',
    menu: 'Modo cocina',
    title: 'Modo cocina: letra grande, pantalla encendida y marcar | Manual de Savour',
    desc: 'Así funciona el modo cocina en Savour: solo la receta en letra grande, la pantalla sigue encendida y marcas ingredientes y pasos. Ideal en móvil y tableta.',
    lead: 'Solo la receta, grande y legible, también con las manos mojadas.',
    sections: [
      ['Iniciar el modo cocina', 'Elige «Modo cocina» arriba en una receta. Ves solo la receta, en letra grande, sin menú.'],
      ['Pantalla encendida', 'En el modo cocina Savour intenta mantener la pantalla encendida para que no tengas que tocarla todo el rato. Depende del móvil y del navegador.'],
      ['Marcar', 'Marca los ingredientes que has pesado y los pasos terminados. Tras una interrupción ves exactamente dónde ibas. También fuera del modo cocina puedes marcar ingredientes.'],
      ['Cocinar escalado', 'Escala primero la receta con los [botones rápidos](#omrekenen) y después inicia el modo cocina: cocinas con las cantidades escaladas.'],
      ['En la tableta del pase', 'Pon Savour [como app](#app-installeren) en una tableta y usa el modo cocina durante la mise en place. Las recetas que has abierto funcionan también [sin internet](#offline).']
    ]
  },
  offline: {
    slug: 'es/manual-sin-internet',
    menu: 'Trabajar sin internet',
    title: 'Recetas sin internet: trabajar sin conexión en la cocina | Manual de Savour',
    desc: 'Así trabajas con Savour sin wifi: las recetas que has abierto siguen disponibles en una cocina en el sótano o en la cámara. Qué funciona y qué no sin conexión.',
    lead: '¿Sin wifi en la cocina del sótano? Tus recetas se abren igual.',
    sections: [
      ['Cómo funciona', 'Savour guarda en tu dispositivo las recetas que has abierto. Si se cae la conexión, Savour abre tu biblioteca desde ese dispositivo.'],
      ['Para que funcione', 'Inicia sesión una vez con «[Mantener la sesión iniciada](#inloggen)» y abre las recetas que necesitas en la cocina. Mejor aún, pon Savour [como app](#app-installeren) en la pantalla de inicio.'],
      ['Qué funciona sin internet', 'Leer, buscar en tu biblioteca, [escalar](#omrekenen) y el [modo cocina](#kookmodus) funcionan con normalidad.'],
      ['Qué necesita internet', 'Guardar, editar, importar y compartir vuelven a funcionar en cuanto hay conexión.'],
      ['Leer más', 'Por qué esto importa tanto en una cocina: [Recetas sin wifi](/blog/recepten-zonder-wifi).']
    ]
  },
  'mep-lijsten': {
    slug: "es/manual-listas-mep",
    menu: "Listas MEP",
    h1: "Listas MEP",
    title: "Listas MEP: cubiertos, marcar e imprimir | Manual de Savour",
    desc: "Así funciona la lista MEP en Savour: una lista por partida con cartas y platos, cubiertos por día, marcar con tu equipo, modo cocina, importar desde Excel e imprimir en un A4.",
    lead: "Lo que cada partida debe tener listo, marcado cada día, con todo tu equipo.",
    sections: [
      ["Una lista por partida", "Una lista MEP es la lista de tu partida: cartas (a la carta, banquetes), un título por pase o plato y debajo lo que debe estar listo. Se lee de arriba abajo, en el orden del menú."],
      ["Lista y modo cocina", "Lista lo muestra todo con el estilo de Savour, con una casilla en cada elemento. Al marcarla queda listo para hoy, para todo tu equipo. El modo cocina muestra solo la lista, en grande, y mantiene la pantalla encendida."],
      ["Cubiertos y cantidades", "Introduce junto al nombre de cada carta el número de cubiertos; Savour calcula cuánto necesitas de cada elemento (40 cubiertos × 60 g = 2,4 kg). Cada día la lista empieza vacía. Con ⋯ Vaciar lista quitas las marcas también entre medias."],
      ["Juntos en un equipo de cocina", "Todo el equipo ve una lista MEP de un equipo de cocina. Lo que marca un compañero aparece al instante, con nombre y hora. Cualquiera puede marcar, también sin Savour Pro. Sin internet lo que tocas se queda y se envía en cuanto vuelvas a tener conexión."],
      ["Importar", "¿Ya tienes tu lista en Excel, Word o en papel? Elige Importar. Savour la organiza y tú lo revisas todo antes de guardarlo. Una foto la lee la IA, con Savour Pro."],
      ["Imprimir", "Imprime la lista en un A4, vertical u horizontal, con casillas para marcar, igual que tu lista de Excel. La fecha y los cubiertos no aparecen, así puedes usarla cada día. Con Savour Pro lleva el logo de tu restaurante."],
      ["Savour Pro", "Crear y gestionar listas MEP se hace con Savour Pro. Cualquiera del equipo de cocina puede marcar, también con una cuenta gratuita. Si dejas Pro, tus listas se conservan."]
    ]
  },
  allergenen: {
    slug: "es/manual-alergenos",
    menu: "Alérgenos por receta",
    h1: "Alérgenos por receta",
    title: "Alérgenos por receta: así los rellena Savour | Manual de Savour",
    desc: "Así funcionan los alérgenos en Savour: Savour rellena los 14 alérgenos por sí mismo, también vía recetas base, con Revisar, ingredientes propios, la carta e impresión.",
    lead: "Savour rellena los alérgenos por sí mismo. Tú solo completas lo que Savour no conoce y ajustas donde tu marca es distinta.",
    sections: [
      ["Dónde", "Elige en el menú Herramientas → Alérgenos. En cada receta, los alérgenos están debajo de los ingredientes; tócalos para desplegarlos. En el menú Más acciones de la receta está la Carta de alérgenos."],
      ["Savour los rellena", "En cada línea de ingrediente, Savour busca el ingrediente en la lista de Savour, en cinco idiomas y también en forma derivada («ralladura de lima» cuenta como lima). Si usas una receta base, como un fondo o una salsa, sus alérgenos también cuentan. Así que no tienes que introducir nada."],
      ["Lo que Savour no conoce", "Arriba en Herramientas → Alérgenos ves cuántas recetas tienen los alérgenos completos. Si Savour no conoce un ingrediente, la receta lo indica («Savour aún no conoce 2 ingredientes»). En Revisar los recibes uno a uno; los rellenas una vez y Savour los conoce para todas tus recetas."],
      ["Según la marca", "En ingredientes que cambian según la marca, como el caldo o la salsa de soja, Savour cuenta los alérgenos habituales y añade: puede variar según la marca. Si tu marca es distinta, abre el ingrediente en Ingredientes y crea tu propia versión; va antes que la lista de Savour."],
      ["Siempre activos y activar tú mismo", "En la pestaña Alérgenos están los 14 alérgenos que por ley debes poder indicar; siempre están activos. Debajo activas tú lo que los clientes suelen preguntar, como lactosa, cerdo, cebolla y ajo o alcohol."],
      ["Carta de alérgenos e impresión", "La Carta de alérgenos muestra por ingrediente qué alérgenos contiene y, abajo, la receta completa. Un signo de interrogación significa que Savour aún no conoce ese ingrediente. Al imprimir eliges con «Con alérgenos» si aparecen en la impresión."],
      ["Nunca «sin alérgenos»", "Mientras un ingrediente sea desconocido o no esté revisado, Savour nunca dice que una receta está libre de un alérgeno. Ante la duda, revisa siempre la etiqueta de tu marca."],
      ["En un equipo de cocina", "Un equipo de cocina tiene su propia lista de ingredientes. El propietario y quienes pueden editar completan y ajustan; todo el equipo ve los alérgenos en las recetas, mientras el propietario tenga Savour Pro."],
      ["Savour Pro y Savour aprende", "Los alérgenos por receta forman parte de Savour Pro. Si «Ayuda a mejorar el lector de Savour» está activado (Ajustes), revisamos si la lista de Savour puede mejorar cuando eliges otros alérgenos. Nada cambia por sí solo."]
    ]
  }
};
