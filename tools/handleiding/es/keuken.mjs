// Manual (Spaans), sección «En la cocina».

export const groups = {
  keuken: {
    name: 'En la cocina',
    intro: 'Escalar a cualquier rendimiento, el modo cocina con letra grande y tus recetas sin internet.'
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
  }
};
