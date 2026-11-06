// Spaanse versies van de blogs over kerntemperaturen en sous-vide (zie tools/site-blog-temperaturen.mjs).
import { SRC } from './site-blog-temperaturen.mjs';

export const TEMP_POSTS_ES = {
  'en/blog/core-temperatures-meat-fish-shellfish': {
    slug: 'es/blog/temperaturas-internas-carne-pescado-marisco',
    title: 'Temperaturas internas de carne, aves, pescado y marisco',
    desc: 'Temperaturas internas para la cocina profesional: pollo, cerdo, ternera, cordero, caza, pescado y marisco. Por qué el pollo no necesita 75 °C, con tablas de tiempo y temperatura y fuentes.',
    h1: 'Temperaturas internas de carne, aves, pescado y marisco',
    lead: 'El pollo no tiene que llegar a 75 °C y el solomillo de cerdo puede quedar rosado. Lo que cuenta es la temperatura y el tiempo. Un resumen para la cocina profesional, con las fuentes.',
    sections: [
      [
        'Temperatura y tiempo van juntos',
        'Las bacterias no mueren a una temperatura mágica. Cuanto más calor, más rápido. La salmonela del pollo se elimina en segundos a 74 °C en el centro; a 60 °C tarda una media hora. Igual de seguro, pero mucho más jugoso a 60 °C.\n\nPor eso las tablas de abajo dicen siempre dos cosas: qué temperatura interna y cuánto tiempo debe mantenerla el centro. Cuanto más grueso el trozo, más tarda el centro en llegar.'
      ],
      [
        'Qué dice el código de higiene',
        'El código de higiene neerlandés para hostelería parte de una temperatura interna de al menos 75 °C al cocinar, mantener en caliente por encima de 60 °C y enfriar a 7 °C o menos en 5 horas. En tu país pueden regir otras normas. Si trabajas más bajo, como con pato rosado, pollo a baja temperatura o salmón apenas hecho, deja constancia en tu plan APPCC de la combinación de tiempo y temperatura, mide con una sonda calibrada y regístralo.'
      ],
      [
        'Aves: pollo, pavo y pintada',
        'El servicio de seguridad alimentaria de EE. UU. (USDA FSIS) calculó cuánto tiempo debe permanecer el pollo a cada temperatura interna para reducir la salmonela diez millones de veces. Las piezas más grasas, como el muslo con piel, necesitan algo más. El pavo también.',
        {
          head: ['Temperatura interna', 'Pollo magro (2 % grasa)', 'Pollo más graso (12 % grasa)'],
          rows: [
            ['60,0 °C', '26 minutos', '35 minutos'],
            ['62,8 °C', '9 minutos', '13 minutos'],
            ['65,6 °C', '3 minutos', '4 minutos'],
            ['68,3 °C', '45 segundos', '54 segundos'],
            ['71,1 °C', '14 segundos', '17 segundos'],
            ['73,9 °C', 'al instante', 'al instante']
          ],
          note: 'Fuente: USDA FSIS, tablas de tiempo y temperatura para aves (reducción de 7 log de salmonela). El tiempo cuenta desde que el centro alcanza la temperatura.'
        }
      ],
      [
        'El pollo en la práctica',
        'Una pechuga llevada a 63–65 °C en el centro y que reposa unos minutos a esa temperatura es segura y sigue jugosa. En sartén u horno es difícil garantizar ese reposo; ahí la sacas a 66–68 °C o la mantienes tapada y caliente. Al vacío controlas el tiempo con precisión.\n\nMuslos y contramuslos se llevan a menudo más alto, a 70–80 °C. No por seguridad, sino porque el tejido conectivo se ablanda.'
      ],
      [
        'Higadillos de pollo y casquería',
        'Los higadillos de pollo pueden llevar Campylobacter por dentro, aunque estén bien dorados por fuera. Tras brotes por parfait de hígado rosado, la Food Standards Agency británica recomienda 70 °C en el centro durante 2 minutos. Equivalen 65 °C durante 10 minutos o 75 °C durante 30 segundos.'
      ],
      [
        'Cerdo',
        'El cerdo ya no tiene que quedar gris. En 2011 el USDA bajó la norma para piezas enteras de 71 °C a 63 °C con 3 minutos de reposo. En la UE, además, los cerdos se controlan por triquina. En un músculo entero las bacterias están sobre todo por fuera, y al marcarlo se calientan de sobra.',
        {
          head: ['Producto', 'Centro', 'Resultado'],
          rows: [
            ['Solomillo de cerdo', '60–62 °C', 'Rosado y jugoso'],
            ['Chuleta, lomo', '62–63 °C', 'Ligeramente rosado, 3 minutos de reposo'],
            ['Picada, salchicha, hamburguesa', '71 °C', 'Bien hecho: las bacterias están repartidas por todo el producto'],
            ['Paleta, panceta, carrillera (guisado)', '85–95 °C', 'Tierno y deshilachado; la temperatura es por la textura']
          ]
        }
      ],
      [
        'Vacuno, ternera y cordero',
        'En una pieza entera de vacuno, ternera o cordero el interior es prácticamente estéril. Por eso un entrecot puede ir poco hecho. Elige la temperatura interna por sabor y textura. Saca los asados grandes 2–5 °C antes: el centro sigue subiendo al reposar.',
        {
          head: ['Punto', 'Centro', 'Aspecto'],
          rows: [
            ['Poco hecho', '50–52 °C', 'Rojo y jugoso'],
            ['Al punto menos', '54–56 °C', 'Rosado, grasa apenas fundida'],
            ['Al punto', '58–60 °C', 'Rosa claro'],
            ['Muy hecho', '68 °C o más', 'Gris, firme'],
            ['Picada, hamburguesa', '71 °C', 'Siempre bien hecho: las bacterias se mezclan con la carne']
          ]
        }
      ],
      [
        'Tartar y carpaccio',
        'La carne cruda solo es segura si es fresca, viene de un proveedor fiable, se mantiene fría y se corta o pica justo antes de servir. El riesgo nunca es cero. No la sirvas a embarazadas, niños pequeños, personas mayores o con defensas bajas.'
      ],
      [
        'Caza, pato y oca',
        'Ciervo, corzo y liebre se tratan como el vacuno: rosado está bien. El jabalí puede llevar triquina. Sírvelo rosado solo si ha pasado el control oficial de triquina; si no, cocínalo al menos a 71 °C.\n\nEl magret de pato y la pechuga de oca se sirven rosados, a 54–58 °C. Para hacerlo con seguridad demostrable, usa los tiempos de aves de la tabla o cocina la pechuga al vacío (ver [Sous vide: temperaturas y tiempos](/es/blog/sous-vide-temperaturas-y-tiempos)). Los muslos se confitan a 80 °C o más.'
      ],
      [
        'Pescado',
        'En el pescado eliges la temperatura interna sobre todo por la textura. Unos grados de más y se seca.',
        {
          head: ['Pescado', 'Centro', 'Resultado'],
          rows: [
            ['Salmón, trucha', '45–50 °C', 'Mi-cuit: translúcido, mantecoso'],
            ['Bacalao, eglefino, fletán', '50–54 °C', 'Se separa en láminas'],
            ['Rodaballo, lenguado, lubina', '50–55 °C', 'Firme y jugoso'],
            ['Atún', '40–45 °C (centro crudo)', 'Marcado brevemente'],
            ['Totalmente hecho (FSIS)', '63 °C', 'Opaco, se deshace']
          ]
        }
      ],
      [
        'Parásitos: cuándo hay que congelar el pescado',
        'El pescado que se come crudo o casi crudo puede llevar anisakis: sushi, ceviche, tartar, pescado marinado o ahumado en frío, y también el salmón mi-cuit a 45 °C. Según el Reglamento (CE) 853/2004 (modificado por el [1276/2011](' + SRC.eu1276 + ')), ese pescado debe congelarse antes: al menos 24 horas a −20 °C o menos, o 15 horas a −35 °C. Calentarlo a 60 °C en el centro durante al menos 1 minuto también elimina los parásitos. El pescado de acuicultura puede estar exento; pide la declaración a tu proveedor.'
      ],
      [
        'Marisco',
        'Los crustáceos se cocinan por textura. Los bivalvos requieren más cuidado.',
        {
          head: ['Producto', 'Centro', 'Resultado'],
          rows: [
            ['Bogavante', '55–60 °C', 'Jugoso, apenas opaco'],
            ['Cigala', '50–55 °C', 'Translúcida y dulce'],
            ['Gambas, langostinos', '55–60 °C', 'Opacos y firmes'],
            ['Vieira', '45–50 °C', 'Centro translúcido'],
            ['Mejillones, berberechos', 'Hasta que se abran, y un poco más', 'Desecha los que sigan cerrados']
          ]
        }
      ],
      [
        'Virus en los bivalvos',
        'Mejillones, ostras y berberechos pueden llevar norovirus y hepatitis A. Estos virus aguantan más calor que las bacterias. La norma de la UE para el tratamiento térmico industrial de bivalvos es 90 °C durante 90 segundos en la carne; la EFSA [ha emitido un dictamen](' + SRC.efsaBivalves + '). Las ostras crudas nunca están libres de riesgo. Cómpralas solo a proveedores autorizados y no las sirvas a clientes vulnerables.'
      ],
      [
        'Clientes vulnerables',
        'Para embarazadas, personas mayores, niños pequeños y personas con defensas bajas: nada de pescado o marisco crudo o poco hecho, ni aves o hígado rosados, ni carne cruda. Cocina las aves a 74 °C en el centro o sigue estrictamente los tiempos de la tabla.'
      ],
      [
        'Medir bien',
        'Introduce la sonda en la parte más gruesa, sin tocar el hueso. Compruébala a menudo en agua con hielo: debe marcar 0 °C. Límpiala entre crudo y cocinado. Y anota las temperaturas: así demuestras que trabajas según tu plan APPCC.'
      ],
      [
        'Fuentes',
        'Los valores de este artículo proceden de:',
        [
          '[USDA FSIS: safe minimum internal temperature chart](' + SRC.fsisChart + ')',
          '[USDA FSIS: guía de cocción con tablas de tiempo y temperatura para aves](' + SRC.fsisPoultry + ')',
          'Food Standards Agency (Reino Unido, 2010): higadillos de pollo a 70 °C durante 2 minutos',
          '[Reglamento (UE) 1276/2011 sobre parásitos en productos de la pesca](' + SRC.eu1276 + ')',
          '[EFSA sobre el tratamiento térmico de moluscos bivalvos](' + SRC.efsaBivalves + ')',
          '[Código de higiene neerlandés para hostelería (KHN)](' + SRC.khn + ')'
        ]
      ]
    ],
    outro: 'En Savour pones la temperatura interna en el paso donde corresponde, para que toda tu brigada la vea, también en el modo cocina. Este artículo es una ayuda; tu propio plan APPCC y la normativa vigente siempre tienen prioridad.'
  },
  'en/blog/sous-vide-temperatures-and-times': {
    slug: 'es/blog/sous-vide-temperaturas-y-tiempos',
    title: 'Sous vide: temperaturas y tiempos por producto',
    desc: 'Tabla de cocina al vacío para la cocina profesional: temperaturas y tiempos para vacuno, ternera, cordero, cerdo, pollo, pato, pescado, marisco, huevos y verduras, con seguridad, enfriado y conservación.',
    h1: 'Sous vide: temperaturas y tiempos',
    lead: 'Una referencia para la cocina: por producto, la temperatura del baño, el tiempo y el resultado. Con las reglas para enfriar y conservar con seguridad.',
    sections: [
      [
        'Cómo funciona el sous vide',
        'En el sous vide la temperatura del baño es la temperatura final del producto. Una pechuga en un baño a 63 °C nunca supera los 63 °C. El tiempo tiene tres partes: hasta que el centro llega a la temperatura (depende del grosor), lo suficiente para pasteurizar y, en cortes duros, lo suficiente para ablandar el tejido conectivo.'
      ],
      [
        'Trabajar con seguridad',
        'Las reglas principales:',
        [
          'No más de 4 horas por debajo de 54,5 °C. Por debajo pueden crecer bacterias. Sirve al momento el pescado mi-cuit y la carne poco hecha.',
          'Para pasteurizar, respeta al menos los tiempos de la tabla de abajo, contando desde un producto recién sacado de la cámara.',
          'El pescado cocinado por debajo de 60 °C debe congelarse antes contra los parásitos (ver [Temperaturas internas](/es/blog/temperaturas-internas-carne-pescado-marisco)).',
          'Trabaja con productos frescos y fríos y bolsas limpias, y regístralo todo en tu plan APPCC.'
        ]
      ],
      [
        'Tiempos de pasteurización por grosor',
        'El tiempo que necesita un producto en el baño para pasteurizarse depende del grosor y la temperatura. Una selección de las tablas de Douglas Baldwin, partiendo de 5 °C:',
        {
          head: ['Producto y grosor', '55 °C', '60 °C', '63 °C'],
          rows: [
            ['Vacuno, cerdo, cordero · 20 mm', '2½ h', '1¼ h', '55 min'],
            ['Vacuno, cerdo, cordero · 50 mm', '4½ h', '2½ h', '2¼ h'],
            ['Pollo · 20 mm', '–', '1¼ h', '50 min'],
            ['Pollo · 50 mm', '–', '3¼ h', '2½ h'],
            ['Pescado magro · 20 mm', '3 h', '1 h', '–'],
            ['Pescado graso · 20 mm', '4¾ h', '1¼ h', '–']
          ],
          note: 'Fuente: Douglas Baldwin, A Practical Guide to Sous Vide Cooking. Su tabla de pollo empieza en 57 °C (20 mm: 2¾ h); la de pescado llega a 60 °C.'
        }
      ],
      [
        'Vacuno y ternera',
        'Los cortes tiernos se cocinan al punto; los duros, mucho tiempo a menor temperatura para que sigan rosados.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Solomillo, entrecot, lomo alto (3–4 cm)', '55 °C', '1½–3 h', 'Al punto menos; servir en 4 h o aplicar el tiempo de pasteurización'],
            ['Igual, al punto', '60 °C', '1½–3 h', 'Rosa claro'],
            ['Vacío, falda, picaña', '55 °C', '6–12 h', 'Rosado y más tierno'],
            ['Aguja, espaldilla', '55 °C', '24–48 h', 'Rosado y tierno como un filete'],
            ['Pecho (rosado)', '57 °C', '36–48 h', 'Firme, rosado'],
            ['Pecho (deshilachado)', '80 °C', '24–36 h', 'Se deshace'],
            ['Solomillo de ternera, tapa', '57–58 °C', '2–4 h', 'Rosa claro, jugoso']
          ]
        }
      ],
      [
        'Cordero',
        'El cordero se cocina como el vacuno; para la paletilla, igual que la paleta de cerdo.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Costillar, lomo', '55–57 °C', '1–2 h', 'Rosado'],
            ['Pierna (rosada)', '57 °C', '8–24 h', 'Rosada y tierna'],
            ['Paletilla', '68 °C', '24 h', 'Tierna, aún se puede cortar'],
            ['Paletilla (deshilachada)', '80 °C', '8–12 h', 'Se deshace']
          ]
        }
      ],
      [
        'Cerdo',
        'El cerdo puede quedar rosado; la paleta y la panceta están mejor a mayor temperatura.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Solomillo', '60 °C', '1½–3 h', 'Rosado y jugoso'],
            ['Chuleta', '61 °C', 'Tiempo de pasteurización (20 mm: 1 h)', 'Ligeramente rosada'],
            ['Chuleta, cocción larga', '55 °C', '12 h', 'Tierna, rosada'],
            ['Paleta', '68 °C', '24 h', 'Tierna, se puede cortar'],
            ['Paleta (pulled)', '80 °C', '8–12 h', 'Se deshace'],
            ['Costillas', '68 °C u 80 °C', '24 h u 8–12 h', 'De firmes a que se separan del hueso'],
            ['Panceta', '68–80 °C', '12–24 h', 'Después, dorar hasta que cruja']
          ]
        }
      ],
      [
        'Aves',
        'Las aves se cocinan a una temperatura a la que también se pasteurizan; el tiempo depende del grosor.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Pechuga de pollo', '63,5 °C', '1½–3 h (grosor)', 'Jugosa, justo hecha'],
            ['Pechuga de pavo', '63,5 °C', '3–5 h', 'Jugosa'],
            ['Contramuslo de pollo', '65 °C', '1½–3 h', 'Tierno, aún firme'],
            ['Magret de pato', '57 °C', '3–4 h', 'Rosado; pasteurizado según la tabla'],
            ['Muslo de pato, oca o pavo (confit)', '80 °C', '8–12 h', 'Se separa del hueso']
          ]
        }
      ],
      [
        'Pescado y marisco',
        'El pescado se hace rápido. Por debajo de 60 °C no pasteurizas: usa pescado que se haya congelado y sírvelo al momento.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Salmón, mi-cuit', '42–50 °C', '15–20 min', 'De translúcido a mantecoso'],
            ['Salmón, hecho', '60 °C', 'Tiempo de pasteurización (20 mm: 1¼ h)', 'Firme, opaco'],
            ['Bacalao, eglefino, fletán', '55–60 °C', '30–60 min', 'Se separa en láminas'],
            ['Bogavante (cola, pelada)', '55 °C', '20–30 min', 'Jugoso y dulce'],
            ['Gambas', '55–60 °C', '15–25 min', 'Firmes'],
            ['Pulpo', '77–82 °C', '4–6 h', 'Tierno, después a la brasa']
          ]
        }
      ],
      [
        'Huevos',
        'Los huevos se cocinan con cáscara, sin bolsa.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Huevo pasteurizado', '57 °C', 'al menos 75 min', 'Aún crudo, pero seguro para mayonesa o tartar'],
            ['Huevo blando', '63 °C', '45–60 min', 'Yema líquida, clara apenas cuajada'],
            ['«Huevo perfecto»', '64,5 °C', '45–60 min', 'Yema como nata espesa']
          ]
        }
      ],
      [
        'Verduras y fruta',
        'Las verduras necesitan mucho más calor que la carne: la pectina solo se descompone hacia los 84 °C. Cocínalas por separado. Los tiempos son orientativos; dependen del grosor y la madurez.',
        {
          head: ['Producto', 'Baño', 'Tiempo', 'Resultado'],
          rows: [
            ['Zanahoria, chirivía, apionabo', '85 °C', '45–60 min', 'Tierna con punto, llena de sabor'],
            ['Remolacha', '85 °C', '1½–2 h', 'Blanda'],
            ['Patatas pequeñas', '85 °C', '60–90 min', 'Cremosas'],
            ['Espárragos (medianos)', '85 °C', '12–15 min', 'Al dente; finos: 6–8 min'],
            ['Hinojo', '85 °C', '45–60 min', 'Blando y dulce'],
            ['Pera, manzana', '80–85 °C', '20–40 min', 'Escalfada, mantiene la forma']
          ]
        }
      ],
      [
        'Enfriar y conservar',
        'Si trabajas con antelación (cook-chill), enfría las bolsas justo después de cocinar en agua con al menos la mitad de hielo. Una pieza de 25 mm se enfría en unos 50 minutos, una de 50 mm en unas 2¾ horas. El código de higiene neerlandés exige enfriar a 7 °C o menos en 5 horas; sigue las normas de tu país. Conserva con antelación solo productos pasteurizados; fija la vida útil en tu plan APPCC y pon fecha a la bolsa.'
      ],
      [
        'En la práctica',
        'Seca el producto al sacarlo del baño y márcalo breve y fuerte para que haga costra. Hierbas y mantequilla en la bolsa dan mucho sabor; el ajo crudo puede volverse áspero a baja temperatura, mejor ajo confitado. Pon la temperatura del baño y el tiempo en la receta para que toda la brigada lo haga igual.'
      ],
      [
        'Fuentes',
        'Los valores de este artículo proceden de:',
        [
          '[Douglas Baldwin: A Practical Guide to Sous Vide Cooking](' + SRC.baldwin + ')',
          '[USDA FSIS: tablas de tiempo y temperatura para aves](' + SRC.fsisPoultry + ')',
          '[Código de higiene neerlandés para hostelería (KHN)](' + SRC.khn + ')',
          'Verduras: valores habituales en cocina en torno a 84–85 °C, donde se descompone la pectina'
        ]
      ]
    ],
    outro: 'Pon la temperatura del baño y el tiempo en el paso de tu receta en Savour; al escalar, el tiempo no cambia, porque depende del grosor y no de la cantidad. Este artículo es una ayuda; tu propio plan APPCC siempre tiene prioridad.'
  }
};
