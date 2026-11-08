// Echte recepten voor de demo (2026-11-08), in vijf talen: klassieke basisbereidingen, sauzen, garde, patisserie,
// vis en vlees met gangbare hoeveelheden. js/features/demo.js zet ze in de demo in de taal van de bezoeker.
// cat: plek in DEMO_TEXT[taal].categories (0 basis, 1 sauzen, 2 garde, 3 patisserie, 4 vis, 5 vlees).
// folder: receptenmap in de demo. Recepten van "Chef Anna" (DEMO_SHARED_RECIPES) staan in het keukenteam.

const DEMO_RECIPES = [
  {
    key: 'kalfsfond',
    cat: 0,
    folder: 'demo-rot',
    nl: {
      title: 'Kalfsfond',
      yield: '3 liter',
      ingredients: [
        '3 kg kalfsbotten',
        '2 uien',
        '2 wortels',
        '1 stengel bleekselderij',
        '2 eetlepels tomatenpuree',
        '5 liter koud water',
        '1 bouquet garni'
      ],
      steps: [
        'Rooster de botten in de oven op 220 °C goudbruin, ongeveer 45 minuten.',
        'Rooster de groenten en de tomatenpuree de laatste 15 minuten mee.',
        'Zet alles op met koud water, breng tegen de kook en trek 6 tot 8 uur zachtjes. Schuim regelmatig af.',
        'Passeer door een fijne zeef en laat snel afkoelen.'
      ]
    },
    en: {
      title: 'Veal stock',
      yield: '3 litres',
      ingredients: [
        '3 kg veal bones',
        '2 onions',
        '2 carrots',
        '1 celery stick',
        '2 tablespoons tomato paste',
        '5 litres cold water',
        '1 bouquet garni'
      ],
      steps: [
        'Roast the bones at 220 °C until golden brown, about 45 minutes.',
        'Add the vegetables and tomato paste for the last 15 minutes.',
        'Cover with cold water, bring just to the boil and simmer gently for 6 to 8 hours. Skim regularly.',
        'Pass through a fine sieve and cool quickly.'
      ]
    },
    de: {
      title: 'Kalbsfond',
      yield: '3 Liter',
      ingredients: [
        '3 kg Kalbsknochen',
        '2 Zwiebeln',
        '2 Karotten',
        '1 Stange Staudensellerie',
        '2 Esslöffel Tomatenmark',
        '5 Liter kaltes Wasser',
        '1 Bouquet garni'
      ],
      steps: [
        'Die Knochen im Ofen bei 220 °C goldbraun rösten, etwa 45 Minuten.',
        'Gemüse und Tomatenmark die letzten 15 Minuten mitrösten.',
        'Mit kaltem Wasser aufsetzen, kurz vor dem Kochen 6 bis 8 Stunden leise ziehen lassen. Regelmäßig abschäumen.',
        'Durch ein feines Sieb passieren und schnell abkühlen.'
      ]
    },
    es: {
      title: 'Fondo de ternera',
      yield: '3 litros',
      ingredients: [
        '3 kg de huesos de ternera',
        '2 cebollas',
        '2 zanahorias',
        '1 rama de apio',
        '2 cucharadas de concentrado de tomate',
        '5 litros de agua fría',
        '1 bouquet garni'
      ],
      steps: [
        'Tuesta los huesos en el horno a 220 °C hasta que estén dorados, unos 45 minutos.',
        'Añade las verduras y el concentrado de tomate los últimos 15 minutos.',
        'Cubre con agua fría, lleva casi a ebullición y cuece a fuego suave de 6 a 8 horas. Desespuma a menudo.',
        'Cuela por un colador fino y enfría rápido.'
      ]
    },
    fr: {
      title: 'Fond de veau',
      yield: '3 litres',
      ingredients: [
        '3 kg d’os de veau',
        '2 oignons',
        '2 carottes',
        '1 branche de céleri',
        '2 cuillères à soupe de concentré de tomate',
        '5 litres d’eau froide',
        '1 bouquet garni'
      ],
      steps: [
        'Rôtis les os au four à 220 °C jusqu’à ce qu’ils soient bien dorés, environ 45 minutes.',
        'Ajoute les légumes et le concentré de tomate les 15 dernières minutes.',
        'Mouille à l’eau froide, porte juste à frémissement et laisse cuire doucement 6 à 8 heures. Écume régulièrement.',
        'Passe au chinois fin et refroidis rapidement.'
      ]
    }
  },
  {
    key: 'groentebouillon',
    cat: 0,
    folder: 'demo-ent',
    nl: {
      title: 'Groentebouillon',
      yield: '2 liter',
      ingredients: [
        '2 uien',
        '2 wortels',
        '1 prei',
        '2 stengels bleekselderij',
        '1 venkelknol',
        '3 liter water',
        '5 peperkorrels',
        '1 laurierblad'
      ],
      steps: [
        'Snijd de groenten grof en zet ze op met koud water en de kruiden.',
        'Breng aan de kook en laat 45 minuten zachtjes trekken.',
        'Passeer en breng op smaak.'
      ]
    },
    en: {
      title: 'Vegetable stock',
      yield: '2 litres',
      ingredients: [
        '2 onions',
        '2 carrots',
        '1 leek',
        '2 celery sticks',
        '1 fennel bulb',
        '3 litres water',
        '5 peppercorns',
        '1 bay leaf'
      ],
      steps: [
        'Roughly chop the vegetables and cover with cold water and the aromatics.',
        'Bring to the boil and simmer gently for 45 minutes.',
        'Strain and season.'
      ]
    },
    de: {
      title: 'Gemüsebrühe',
      yield: '2 Liter',
      ingredients: [
        '2 Zwiebeln',
        '2 Karotten',
        '1 Lauch',
        '2 Stangen Staudensellerie',
        '1 Fenchelknolle',
        '3 Liter Wasser',
        '5 Pfefferkörner',
        '1 Lorbeerblatt'
      ],
      steps: [
        'Das Gemüse grob schneiden und mit kaltem Wasser und den Gewürzen aufsetzen.',
        'Aufkochen und 45 Minuten leise ziehen lassen.',
        'Passieren und abschmecken.'
      ]
    },
    es: {
      title: 'Caldo de verduras',
      yield: '2 litros',
      ingredients: [
        '2 cebollas',
        '2 zanahorias',
        '1 puerro',
        '2 ramas de apio',
        '1 bulbo de hinojo',
        '3 litros de agua',
        '5 granos de pimienta',
        '1 hoja de laurel'
      ],
      steps: [
        'Corta las verduras en trozos grandes y cúbrelas con agua fría y las especias.',
        'Lleva a ebullición y cuece a fuego suave 45 minutos.',
        'Cuela y rectifica de sal.'
      ]
    },
    fr: {
      title: 'Bouillon de légumes',
      yield: '2 litres',
      ingredients: [
        '2 oignons',
        '2 carottes',
        '1 poireau',
        '2 branches de céleri',
        '1 bulbe de fenouil',
        '3 litres d’eau',
        '5 grains de poivre',
        '1 feuille de laurier'
      ],
      steps: [
        'Taille grossièrement les légumes et mouille à l’eau froide avec les aromates.',
        'Porte à ébullition et laisse frémir 45 minutes.',
        'Passe et assaisonne.'
      ]
    }
  },
  {
    key: 'kruidenolie',
    cat: 0,
    folder: 'demo-garde',
    nl: {
      title: 'Kruidenolie',
      yield: '250 ml',
      ingredients: ['100 g bladpeterselie', '50 g basilicum', '300 ml zonnebloemolie', 'snuf zout'],
      steps: [
        'Blancheer de kruiden 10 seconden en spoel ze in ijswater. Dep goed droog.',
        'Draai de kruiden met de olie 5 minuten fijn in een blender, tot de olie warm is (70 °C).',
        'Laat uitlekken door een koffiefilter en bewaar koel.'
      ]
    },
    en: {
      title: 'Herb oil',
      yield: '250 ml',
      ingredients: ['100 g flat-leaf parsley', '50 g basil', '300 ml sunflower oil', 'pinch of salt'],
      steps: [
        'Blanch the herbs for 10 seconds and refresh in iced water. Pat dry.',
        'Blend the herbs with the oil for 5 minutes, until the oil is warm (70 °C).',
        'Strain through a coffee filter and keep chilled.'
      ]
    },
    de: {
      title: 'Kräuteröl',
      yield: '250 ml',
      ingredients: ['100 g glatte Petersilie', '50 g Basilikum', '300 ml Sonnenblumenöl', 'Prise Salz'],
      steps: [
        'Die Kräuter 10 Sekunden blanchieren und in Eiswasser abschrecken. Gut trocken tupfen.',
        'Mit dem Öl 5 Minuten im Mixer fein mixen, bis das Öl warm ist (70 °C).',
        'Durch einen Kaffeefilter abtropfen lassen und kühl lagern.'
      ]
    },
    es: {
      title: 'Aceite de hierbas',
      yield: '250 ml',
      ingredients: ['100 g de perejil liso', '50 g de albahaca', '300 ml de aceite de girasol', 'pizca de sal'],
      steps: [
        'Blanquea las hierbas 10 segundos y enfríalas en agua con hielo. Sécalas bien.',
        'Tritura las hierbas con el aceite 5 minutos, hasta que el aceite esté caliente (70 °C).',
        'Filtra por un filtro de café y guarda en frío.'
      ]
    },
    fr: {
      title: 'Huile d’herbes',
      yield: '250 ml',
      ingredients: ['100 g de persil plat', '50 g de basilic', '300 ml d’huile de tournesol', 'pincée de sel'],
      steps: [
        'Blanchis les herbes 10 secondes et rafraîchis-les dans de l’eau glacée. Sèche-les bien.',
        'Mixe les herbes avec l’huile 5 minutes, jusqu’à ce que l’huile soit chaude (70 °C).',
        'Filtre dans un filtre à café et garde au frais.'
      ]
    }
  },
  {
    key: 'citroengel',
    cat: 0,
    folder: 'demo-pat',
    nl: {
      title: 'Citroengel',
      yield: '300 g',
      ingredients: ['200 ml citroensap', '100 ml water', '80 g suiker', '3 g agar-agar'],
      steps: [
        'Breng sap, water, suiker en agar-agar al roerend aan de kook en laat 1 minuut koken.',
        'Giet in een bak en laat opstijven in de koeling.',
        'Draai de vaste massa glad in een blender en spuit in een knijpfles.'
      ]
    },
    en: {
      title: 'Lemon gel',
      yield: '300 g',
      ingredients: ['200 ml lemon juice', '100 ml water', '80 g sugar', '3 g agar agar'],
      steps: [
        'Bring the juice, water, sugar and agar to the boil while stirring and boil for 1 minute.',
        'Pour into a tray and leave to set in the fridge.',
        'Blend the set mixture until smooth and fill a squeeze bottle.'
      ]
    },
    de: {
      title: 'Zitronengel',
      yield: '300 g',
      ingredients: ['200 ml Zitronensaft', '100 ml Wasser', '80 g Zucker', '3 g Agar-Agar'],
      steps: [
        'Saft, Wasser, Zucker und Agar-Agar unter Rühren aufkochen und 1 Minute kochen lassen.',
        'In eine Form gießen und im Kühlschrank fest werden lassen.',
        'Die feste Masse im Mixer glatt mixen und in eine Quetschflasche füllen.'
      ]
    },
    es: {
      title: 'Gel de limón',
      yield: '300 g',
      ingredients: ['200 ml de zumo de limón', '100 ml de agua', '80 g de azúcar', '3 g de agar-agar'],
      steps: [
        'Lleva a ebullición el zumo, el agua, el azúcar y el agar removiendo, y cuece 1 minuto.',
        'Vierte en una bandeja y deja cuajar en la nevera.',
        'Tritura hasta que quede liso y pon en un biberón.'
      ]
    },
    fr: {
      title: 'Gel de citron',
      yield: '300 g',
      ingredients: ['200 ml de jus de citron', '100 ml d’eau', '80 g de sucre', '3 g d’agar-agar'],
      steps: [
        'Porte à ébullition le jus, l’eau, le sucre et l’agar en remuant, et laisse bouillir 1 minute.',
        'Verse dans un bac et laisse prendre au réfrigérateur.',
        'Mixe la masse prise jusqu’à ce qu’elle soit lisse et mets-la en pipette.'
      ]
    }
  },
  {
    key: 'beurre',
    cat: 1,
    folder: 'demo-rot',
    nl: {
      title: 'Beurre blanc',
      yield: '4 personen',
      ingredients: [
        '2 sjalotten, fijngesnipperd',
        '1 deciliter droge witte wijn',
        '5 eetlepels witte wijnazijn',
        '250 gram koude roomboter, in blokjes',
        'zout naar smaak',
        'witte peper naar smaak'
      ],
      steps: [
        'Breng sjalot, wijn en azijn aan de kook en laat inkoken tot er ongeveer 2 eetlepels vocht over is.',
        'Zet het vuur laag en klop de boter blokje voor blokje erdoor, tot de saus gebonden en glanzend is.',
        'Laat de saus niet meer koken. Passeer door een fijne zeef en breng op smaak met zout en peper.',
        'Direct serveren of maximaal een uur au bain-marie warm houden.'
      ]
    },
    en: {
      title: 'Beurre blanc',
      yield: '4 portions',
      ingredients: [
        '2 shallots, finely chopped',
        '1 decilitre dry white wine',
        '5 tablespoons white wine vinegar',
        '250 grams cold butter, diced',
        'salt to taste',
        'white pepper to taste'
      ],
      steps: [
        'Bring the shallot, wine and vinegar to the boil and reduce until about 2 tablespoons of liquid remain.',
        'Turn the heat down low and whisk in the butter cube by cube until the sauce is bound and glossy.',
        'Do not let the sauce boil again. Pass through a fine sieve and season with salt and pepper.',
        'Serve straight away or keep warm in a bain-marie for up to an hour.'
      ]
    },
    de: {
      title: 'Beurre blanc',
      yield: '4 Personen',
      ingredients: [
        '2 Schalotten, fein gewürfelt',
        '1 Deziliter trockener Weißwein',
        '5 Esslöffel Weißweinessig',
        '250 Gramm kalte Butter, in Würfeln',
        'Salz nach Geschmack',
        'weißer Pfeffer nach Geschmack'
      ],
      steps: [
        'Schalotte, Wein und Essig aufkochen und einkochen, bis etwa 2 Esslöffel Flüssigkeit übrig sind.',
        'Die Hitze reduzieren und die Butter Würfel für Würfel einrühren, bis die Sauce gebunden und glänzend ist.',
        'Die Sauce nicht mehr kochen lassen. Durch ein feines Sieb passieren und mit Salz und Pfeffer abschmecken.',
        'Sofort servieren oder höchstens eine Stunde im Wasserbad warm halten.'
      ]
    },
    es: {
      title: 'Beurre blanc',
      yield: '4 personas',
      ingredients: [
        '2 chalotas, picadas finas',
        '1 decilitro de vino blanco seco',
        '5 cucharadas de vinagre de vino blanco',
        '250 gramos de mantequilla fría, en dados',
        'sal al gusto',
        'pimienta blanca al gusto'
      ],
      steps: [
        'Lleva a ebullición la chalota, el vino y el vinagre y reduce hasta que queden unas 2 cucharadas de líquido.',
        'Baja el fuego y monta la mantequilla dado a dado, hasta que la salsa esté ligada y brillante.',
        'No dejes que la salsa vuelva a hervir. Cuela por un colador fino y sazona con sal y pimienta.',
        'Sirve enseguida o mantén al baño maría como máximo una hora.'
      ]
    },
    fr: {
      title: 'Beurre blanc',
      yield: '4 personnes',
      ingredients: [
        '2 échalotes, finement ciselées',
        '1 décilitre de vin blanc sec',
        '5 cuillères à soupe de vinaigre de vin blanc',
        '250 grammes de beurre froid, en dés',
        'sel à volonté',
        'poivre blanc à volonté'
      ],
      steps: [
        'Porte à ébullition l’échalote, le vin et le vinaigre et fais réduire jusqu’à environ 2 cuillères à soupe de liquide.',
        'Baisse le feu et monte le beurre dé par dé au fouet, jusqu’à ce que la sauce soit liée et brillante.',
        'Ne fais plus bouillir la sauce. Passe au chinois fin et assaisonne de sel et de poivre.',
        'Sers aussitôt ou garde au bain-marie une heure au maximum.'
      ]
    }
  },
  {
    key: 'hollandaise',
    cat: 1,
    folder: 'demo-rot',
    nl: {
      title: 'Hollandaise',
      yield: '4 personen',
      ingredients: [
        '3 eidooiers',
        '2 eetlepels water',
        '200 g geklaarde boter, lauwwarm',
        '1 eetlepel citroensap',
        'zout',
        'snuf cayennepeper'
      ],
      steps: [
        'Klop de dooiers met het water au bain-marie luchtig tot een sabayon (ongeveer 65 °C).',
        'Haal van het vuur en klop de boter er in een dunne straal door.',
        'Breng op smaak met citroensap, zout en cayennepeper. Warm houden, niet boven 65 °C.'
      ]
    },
    en: {
      title: 'Hollandaise',
      yield: '4 portions',
      ingredients: [
        '3 egg yolks',
        '2 tablespoons water',
        '200 g clarified butter, lukewarm',
        '1 tablespoon lemon juice',
        'salt',
        'pinch of cayenne pepper'
      ],
      steps: [
        'Whisk the yolks and water over a bain-marie to a light sabayon (about 65 °C).',
        'Take off the heat and whisk in the butter in a thin stream.',
        'Season with lemon juice, salt and cayenne. Keep warm, not above 65 °C.'
      ]
    },
    de: {
      title: 'Sauce hollandaise',
      yield: '4 Personen',
      ingredients: [
        '3 Eigelb',
        '2 Esslöffel Wasser',
        '200 g geklärte Butter, lauwarm',
        '1 Esslöffel Zitronensaft',
        'Salz',
        'Prise Cayennepfeffer'
      ],
      steps: [
        'Eigelb und Wasser über dem Wasserbad zu einer lockeren Sabayon aufschlagen (etwa 65 °C).',
        'Vom Herd nehmen und die Butter in einem dünnen Strahl einrühren.',
        'Mit Zitronensaft, Salz und Cayennepfeffer abschmecken. Warm halten, nicht über 65 °C.'
      ]
    },
    es: {
      title: 'Salsa holandesa',
      yield: '4 personas',
      ingredients: [
        '3 yemas de huevo',
        '2 cucharadas de agua',
        '200 g de mantequilla clarificada, tibia',
        '1 cucharada de zumo de limón',
        'sal',
        'pizca de cayena'
      ],
      steps: [
        'Bate las yemas con el agua al baño maría hasta obtener un sabayón ligero (unos 65 °C).',
        'Retira del fuego e incorpora la mantequilla en un hilo fino.',
        'Sazona con limón, sal y cayena. Mantén caliente, sin pasar de 65 °C.'
      ]
    },
    fr: {
      title: 'Sauce hollandaise',
      yield: '4 personnes',
      ingredients: [
        '3 jaunes d’œuf',
        '2 cuillères à soupe d’eau',
        '200 g de beurre clarifié, tiède',
        '1 cuillère à soupe de jus de citron',
        'sel',
        'pincée de piment de Cayenne'
      ],
      steps: [
        'Fouette les jaunes et l’eau au bain-marie en sabayon léger (environ 65 °C).',
        'Hors du feu, incorpore le beurre en filet en fouettant.',
        'Assaisonne de citron, de sel et de Cayenne. Garde au chaud, sans dépasser 65 °C.'
      ]
    }
  },
  {
    key: 'noisette',
    cat: 1,
    folder: 'demo-ent',
    nl: {
      title: 'Beurre noisette',
      yield: '200 g',
      ingredients: ['250 g roomboter'],
      steps: [
        'Smelt de boter in een steelpan op middelhoog vuur.',
        'Laat doorkoken tot het schuim zakt en de vaste delen hazelnootbruin zijn en nootachtig ruiken.',
        'Giet direct in een koude kom om het garen te stoppen.'
      ]
    },
    en: {
      title: 'Brown butter',
      yield: '200 g',
      ingredients: ['250 g butter'],
      steps: [
        'Melt the butter in a saucepan over medium heat.',
        'Keep cooking until the foam settles and the solids are hazelnut brown and smell nutty.',
        'Pour straight into a cold bowl to stop the cooking.'
      ]
    },
    de: {
      title: 'Nussbutter',
      yield: '200 g',
      ingredients: ['250 g Butter'],
      steps: [
        'Die Butter in einem Topf bei mittlerer Hitze schmelzen.',
        'Weiterkochen, bis der Schaum zusammenfällt und die festen Teile haselnussbraun sind und nussig riechen.',
        'Sofort in eine kalte Schüssel gießen, damit sie nicht weitergart.'
      ]
    },
    es: {
      title: 'Mantequilla avellana',
      yield: '200 g',
      ingredients: ['250 g de mantequilla'],
      steps: [
        'Derrite la mantequilla en un cazo a fuego medio.',
        'Sigue cociendo hasta que baje la espuma y los sólidos estén color avellana y huelan a fruto seco.',
        'Vierte enseguida en un bol frío para cortar la cocción.'
      ]
    },
    fr: {
      title: 'Beurre noisette',
      yield: '200 g',
      ingredients: ['250 g de beurre'],
      steps: [
        'Fais fondre le beurre dans une casserole à feu moyen.',
        'Laisse cuire jusqu’à ce que la mousse retombe et que les dépôts soient couleur noisette et sentent la noisette.',
        'Verse aussitôt dans un bol froid pour arrêter la cuisson.'
      ]
    }
  },
  {
    key: 'dashi',
    cat: 1,
    folder: 'demo-garde',
    nl: {
      title: 'Dashi vinaigrette',
      yield: '300 ml',
      ingredients: [
        '150 ml dashi',
        '50 ml rijstazijn',
        '30 ml sojasaus',
        '1 eetlepel mirin',
        '80 ml druivenpitolie',
        '1 theelepel geraspte gember'
      ],
      steps: [
        'Meng dashi, azijn, sojasaus, mirin en gember.',
        'Klop de olie er in een dunne straal door.',
        'Proef en breng op smaak. Koel bewaren, binnen 3 dagen gebruiken.'
      ]
    },
    en: {
      title: 'Dashi vinaigrette',
      yield: '300 ml',
      ingredients: [
        '150 ml dashi',
        '50 ml rice vinegar',
        '30 ml soy sauce',
        '1 tablespoon mirin',
        '80 ml grapeseed oil',
        '1 teaspoon grated ginger'
      ],
      steps: [
        'Mix the dashi, vinegar, soy sauce, mirin and ginger.',
        'Whisk in the oil in a thin stream.',
        'Taste and adjust. Keep chilled and use within 3 days.'
      ]
    },
    de: {
      title: 'Dashi-Vinaigrette',
      yield: '300 ml',
      ingredients: [
        '150 ml Dashi',
        '50 ml Reisessig',
        '30 ml Sojasauce',
        '1 Esslöffel Mirin',
        '80 ml Traubenkernöl',
        '1 Teelöffel geriebener Ingwer'
      ],
      steps: [
        'Dashi, Essig, Sojasauce, Mirin und Ingwer mischen.',
        'Das Öl in einem dünnen Strahl einrühren.',
        'Abschmecken. Kühl lagern und innerhalb von 3 Tagen verbrauchen.'
      ]
    },
    es: {
      title: 'Vinagreta de dashi',
      yield: '300 ml',
      ingredients: [
        '150 ml de dashi',
        '50 ml de vinagre de arroz',
        '30 ml de salsa de soja',
        '1 cucharada de mirin',
        '80 ml de aceite de pepita de uva',
        '1 cucharadita de jengibre rallado'
      ],
      steps: [
        'Mezcla el dashi, el vinagre, la soja, el mirin y el jengibre.',
        'Incorpora el aceite en un hilo fino batiendo.',
        'Prueba y rectifica. Guarda en frío y usa en 3 días.'
      ]
    },
    fr: {
      title: 'Vinaigrette au dashi',
      yield: '300 ml',
      ingredients: [
        '150 ml de dashi',
        '50 ml de vinaigre de riz',
        '30 ml de sauce soja',
        '1 cuillère à soupe de mirin',
        '80 ml d’huile de pépins de raisin',
        '1 cuillère à café de gingembre râpé'
      ],
      steps: [
        'Mélange le dashi, le vinaigre, la sauce soja, le mirin et le gingembre.',
        'Incorpore l’huile en filet en fouettant.',
        'Goûte et rectifie. Garde au frais et utilise sous 3 jours.'
      ]
    }
  },
  {
    key: 'mayonaise',
    cat: 1,
    folder: 'demo-garde',
    nl: {
      title: 'Mayonaise',
      yield: '400 ml',
      ingredients: [
        '2 eidooiers',
        '1 eetlepel dijonmosterd',
        '1 eetlepel witte wijnazijn',
        '350 ml zonnebloemolie',
        'zout',
        'witte peper'
      ],
      steps: [
        'Klop dooiers, mosterd en azijn los, alle ingrediënten op kamertemperatuur.',
        'Klop de olie er eerst druppel voor druppel en daarna in een dunne straal door.',
        'Breng op smaak met zout en peper.'
      ]
    },
    en: {
      title: 'Mayonnaise',
      yield: '400 ml',
      ingredients: [
        '2 egg yolks',
        '1 tablespoon Dijon mustard',
        '1 tablespoon white wine vinegar',
        '350 ml sunflower oil',
        'salt',
        'white pepper'
      ],
      steps: [
        'Whisk the yolks, mustard and vinegar, all ingredients at room temperature.',
        'Whisk in the oil drop by drop at first, then in a thin stream.',
        'Season with salt and pepper.'
      ]
    },
    de: {
      title: 'Mayonnaise',
      yield: '400 ml',
      ingredients: [
        '2 Eigelb',
        '1 Esslöffel Dijon-Senf',
        '1 Esslöffel Weißweinessig',
        '350 ml Sonnenblumenöl',
        'Salz',
        'weißer Pfeffer'
      ],
      steps: [
        'Eigelb, Senf und Essig verrühren, alle Zutaten zimmerwarm.',
        'Das Öl erst tropfenweise, dann in einem dünnen Strahl einrühren.',
        'Mit Salz und Pfeffer abschmecken.'
      ]
    },
    es: {
      title: 'Mayonesa',
      yield: '400 ml',
      ingredients: [
        '2 yemas de huevo',
        '1 cucharada de mostaza de Dijon',
        '1 cucharada de vinagre de vino blanco',
        '350 ml de aceite de girasol',
        'sal',
        'pimienta blanca'
      ],
      steps: [
        'Bate las yemas, la mostaza y el vinagre, todo a temperatura ambiente.',
        'Incorpora el aceite primero gota a gota y luego en un hilo fino.',
        'Sazona con sal y pimienta.'
      ]
    },
    fr: {
      title: 'Mayonnaise',
      yield: '400 ml',
      ingredients: [
        '2 jaunes d’œuf',
        '1 cuillère à soupe de moutarde de Dijon',
        '1 cuillère à soupe de vinaigre de vin blanc',
        '350 ml d’huile de tournesol',
        'sel',
        'poivre blanc'
      ],
      steps: [
        'Fouette les jaunes, la moutarde et le vinaigre, tout à température ambiante.',
        'Monte avec l’huile, d’abord goutte à goutte, puis en filet.',
        'Assaisonne de sel et de poivre.'
      ]
    }
  },
  {
    key: 'bloemkool',
    cat: 2,
    folder: 'demo-ent',
    nl: {
      title: 'Bloemkoolcrème',
      yield: '6 personen',
      ingredients: [
        '1 bloemkool (ongeveer 800 g)',
        '250 ml volle melk',
        '100 ml slagroom',
        '40 g roomboter',
        'zout',
        'nootmuskaat'
      ],
      steps: [
        'Snijd de bloemkool in kleine roosjes en gaar ze zacht in melk en room, ongeveer 15 minuten.',
        'Giet af en bewaar het kookvocht. Draai de bloemkool met de boter glad, voeg zo nodig kookvocht toe.',
        'Passeer door een fijne zeef en breng op smaak met zout en nootmuskaat.'
      ]
    },
    en: {
      title: 'Cauliflower purée',
      yield: '6 portions',
      ingredients: [
        '1 cauliflower (about 800 g)',
        '250 ml whole milk',
        '100 ml double cream',
        '40 g butter',
        'salt',
        'nutmeg'
      ],
      steps: [
        'Cut the cauliflower into small florets and simmer in the milk and cream until soft, about 15 minutes.',
        'Drain, keeping the liquid. Blend the cauliflower with the butter until smooth, adding liquid as needed.',
        'Pass through a fine sieve and season with salt and nutmeg.'
      ]
    },
    de: {
      title: 'Blumenkohlcreme',
      yield: '6 Personen',
      ingredients: [
        '1 Blumenkohl (etwa 800 g)',
        '250 ml Vollmilch',
        '100 ml Sahne',
        '40 g Butter',
        'Salz',
        'Muskatnuss'
      ],
      steps: [
        'Den Blumenkohl in kleine Röschen teilen und in Milch und Sahne weich garen, etwa 15 Minuten.',
        'Abgießen, die Flüssigkeit auffangen. Den Blumenkohl mit der Butter glatt mixen, bei Bedarf Flüssigkeit zugeben.',
        'Durch ein feines Sieb streichen und mit Salz und Muskat abschmecken.'
      ]
    },
    es: {
      title: 'Crema de coliflor',
      yield: '6 personas',
      ingredients: [
        '1 coliflor (unos 800 g)',
        '250 ml de leche entera',
        '100 ml de nata',
        '40 g de mantequilla',
        'sal',
        'nuez moscada'
      ],
      steps: [
        'Corta la coliflor en ramilletes pequeños y cuécelos en la leche y la nata hasta que estén tiernos, unos 15 minutos.',
        'Escurre y guarda el líquido. Tritura la coliflor con la mantequilla hasta que quede lisa, añadiendo líquido si hace falta.',
        'Pasa por un colador fino y sazona con sal y nuez moscada.'
      ]
    },
    fr: {
      title: 'Crème de chou-fleur',
      yield: '6 personnes',
      ingredients: [
        '1 chou-fleur (environ 800 g)',
        '250 ml de lait entier',
        '100 ml de crème liquide',
        '40 g de beurre',
        'sel',
        'noix de muscade'
      ],
      steps: [
        'Détaille le chou-fleur en petites fleurettes et cuis-les doucement dans le lait et la crème, environ 15 minutes.',
        'Égoutte en gardant le liquide. Mixe le chou-fleur avec le beurre jusqu’à ce qu’il soit lisse, en ajoutant du liquide si besoin.',
        'Passe au tamis fin et assaisonne de sel et de muscade.'
      ]
    }
  },
  {
    key: 'rodeui',
    cat: 2,
    folder: 'demo-garde',
    nl: {
      title: 'Gepekelde rode ui',
      yield: '1 pot (500 ml)',
      ingredients: [
        '3 rode uien',
        '150 ml witte wijnazijn',
        '150 ml water',
        '50 g suiker',
        '1 theelepel zout',
        '1 laurierblad'
      ],
      steps: [
        'Snijd de uien in dunne ringen en doe ze in een schone pot.',
        'Breng azijn, water, suiker, zout en laurier aan de kook.',
        'Giet heet over de uien, laat afkoelen en zet minstens 2 uur koel.'
      ]
    },
    en: {
      title: 'Pickled red onion',
      yield: '1 jar (500 ml)',
      ingredients: [
        '3 red onions',
        '150 ml white wine vinegar',
        '150 ml water',
        '50 g sugar',
        '1 teaspoon salt',
        '1 bay leaf'
      ],
      steps: [
        'Slice the onions into thin rings and put them in a clean jar.',
        'Bring the vinegar, water, sugar, salt and bay leaf to the boil.',
        'Pour over the onions while hot, leave to cool and chill for at least 2 hours.'
      ]
    },
    de: {
      title: 'Eingelegte rote Zwiebeln',
      yield: '1 Glas (500 ml)',
      ingredients: [
        '3 rote Zwiebeln',
        '150 ml Weißweinessig',
        '150 ml Wasser',
        '50 g Zucker',
        '1 Teelöffel Salz',
        '1 Lorbeerblatt'
      ],
      steps: [
        'Die Zwiebeln in dünne Ringe schneiden und in ein sauberes Glas geben.',
        'Essig, Wasser, Zucker, Salz und Lorbeer aufkochen.',
        'Heiß über die Zwiebeln gießen, abkühlen lassen und mindestens 2 Stunden kühlen.'
      ]
    },
    es: {
      title: 'Cebolla roja encurtida',
      yield: '1 tarro (500 ml)',
      ingredients: [
        '3 cebollas rojas',
        '150 ml de vinagre de vino blanco',
        '150 ml de agua',
        '50 g de azúcar',
        '1 cucharadita de sal',
        '1 hoja de laurel'
      ],
      steps: [
        'Corta las cebollas en aros finos y ponlas en un tarro limpio.',
        'Lleva a ebullición el vinagre, el agua, el azúcar, la sal y el laurel.',
        'Vierte caliente sobre la cebolla, deja enfriar y refrigera al menos 2 horas.'
      ]
    },
    fr: {
      title: 'Oignons rouges au vinaigre',
      yield: '1 bocal (500 ml)',
      ingredients: [
        '3 oignons rouges',
        '150 ml de vinaigre de vin blanc',
        '150 ml d’eau',
        '50 g de sucre',
        '1 cuillère à café de sel',
        '1 feuille de laurier'
      ],
      steps: [
        'Émince les oignons en fines rondelles et mets-les dans un bocal propre.',
        'Porte à ébullition le vinaigre, l’eau, le sucre, le sel et le laurier.',
        'Verse bouillant sur les oignons, laisse refroidir et réserve au frais au moins 2 heures.'
      ]
    }
  },
  {
    key: 'gazpacho',
    cat: 2,
    folder: 'demo-garde',
    nl: {
      title: 'Gazpacho',
      yield: '6 personen',
      ingredients: [
        '1 kg rijpe trostomaten',
        '1 komkommer',
        '1 rode paprika',
        '1 teen knoflook',
        '50 g oud wit brood',
        '50 ml sherryazijn',
        '100 ml olijfolie',
        'zout'
      ],
      steps: [
        'Snijd de groenten grof en meng met knoflook, brood, azijn en zout. Laat 1 uur marineren.',
        'Draai alles glad in een blender en klop de olijfolie erdoor.',
        'Passeer, breng op smaak en zet minstens 2 uur koud.'
      ]
    },
    en: {
      title: 'Gazpacho',
      yield: '6 portions',
      ingredients: [
        '1 kg ripe vine tomatoes',
        '1 cucumber',
        '1 red pepper',
        '1 clove garlic',
        '50 g stale white bread',
        '50 ml sherry vinegar',
        '100 ml olive oil',
        'salt'
      ],
      steps: [
        'Roughly chop the vegetables and mix with the garlic, bread, vinegar and salt. Leave to marinate for 1 hour.',
        'Blend until smooth and blend in the olive oil.',
        'Strain, season and chill for at least 2 hours.'
      ]
    },
    de: {
      title: 'Gazpacho',
      yield: '6 Personen',
      ingredients: [
        '1 kg reife Strauchtomaten',
        '1 Gurke',
        '1 rote Paprika',
        '1 Knoblauchzehe',
        '50 g altbackenes Weißbrot',
        '50 ml Sherryessig',
        '100 ml Olivenöl',
        'Salz'
      ],
      steps: [
        'Das Gemüse grob schneiden und mit Knoblauch, Brot, Essig und Salz mischen. 1 Stunde marinieren.',
        'Alles im Mixer glatt mixen und das Olivenöl einmixen.',
        'Passieren, abschmecken und mindestens 2 Stunden kühlen.'
      ]
    },
    es: {
      title: 'Gazpacho',
      yield: '6 personas',
      ingredients: [
        '1 kg de tomates maduros',
        '1 pepino',
        '1 pimiento rojo',
        '1 diente de ajo',
        '50 g de pan blanco del día anterior',
        '50 ml de vinagre de jerez',
        '100 ml de aceite de oliva',
        'sal'
      ],
      steps: [
        'Trocea las verduras y mézclalas con el ajo, el pan, el vinagre y la sal. Deja macerar 1 hora.',
        'Tritura hasta que quede fino y emulsiona con el aceite de oliva.',
        'Cuela, rectifica y enfría al menos 2 horas.'
      ]
    },
    fr: {
      title: 'Gaspacho',
      yield: '6 personnes',
      ingredients: [
        '1 kg de tomates grappe bien mûres',
        '1 concombre',
        '1 poivron rouge',
        '1 gousse d’ail',
        '50 g de pain blanc rassis',
        '50 ml de vinaigre de xérès',
        '100 ml d’huile d’olive',
        'sel'
      ],
      steps: [
        'Coupe grossièrement les légumes et mélange-les avec l’ail, le pain, le vinaigre et le sel. Laisse mariner 1 heure.',
        'Mixe finement et émulsionne avec l’huile d’olive.',
        'Passe, rectifie l’assaisonnement et réserve au frais au moins 2 heures.'
      ]
    }
  },
  {
    key: 'anglaise',
    cat: 3,
    folder: 'demo-pat',
    nl: {
      title: 'Crème anglaise',
      yield: '1 liter',
      ingredients: [
        '500 ml volle melk',
        '500 ml slagroom',
        '1 vanillestokje',
        '200 g eidooiers (ongeveer 10)',
        '150 g suiker'
      ],
      steps: [
        'Breng melk, room en het opengesneden vanillestokje aan de kook. Laat 10 minuten trekken.',
        'Klop dooiers en suiker los, giet de warme melk erbij en zet terug op laag vuur.',
        'Roer tot 82 °C, tot de crème de lepel bedekt. Passeer direct en koel snel terug.'
      ]
    },
    en: {
      title: 'Crème anglaise',
      yield: '1 litre',
      ingredients: [
        '500 ml whole milk',
        '500 ml double cream',
        '1 vanilla pod',
        '200 g egg yolks (about 10)',
        '150 g sugar'
      ],
      steps: [
        'Bring the milk, cream and split vanilla pod to the boil. Leave to infuse for 10 minutes.',
        'Whisk the yolks and sugar, pour on the warm milk and return to a low heat.',
        'Stir to 82 °C, until it coats the spoon. Strain at once and cool quickly.'
      ]
    },
    de: {
      title: 'Vanillesauce (Crème anglaise)',
      yield: '1 Liter',
      ingredients: ['500 ml Vollmilch', '500 ml Sahne', '1 Vanilleschote', '200 g Eigelb (etwa 10)', '150 g Zucker'],
      steps: [
        'Milch, Sahne und die aufgeschnittene Vanilleschote aufkochen. 10 Minuten ziehen lassen.',
        'Eigelb und Zucker verrühren, die warme Milch zugießen und zurück auf kleine Hitze stellen.',
        'Bis 82 °C rühren, bis die Creme den Löffel überzieht. Sofort passieren und schnell abkühlen.'
      ]
    },
    es: {
      title: 'Crema inglesa',
      yield: '1 litro',
      ingredients: [
        '500 ml de leche entera',
        '500 ml de nata',
        '1 vaina de vainilla',
        '200 g de yemas de huevo (unas 10)',
        '150 g de azúcar'
      ],
      steps: [
        'Lleva a ebullición la leche, la nata y la vainilla abierta. Deja infusionar 10 minutos.',
        'Bate las yemas con el azúcar, vierte la leche caliente y vuelve a fuego bajo.',
        'Remueve hasta 82 °C, hasta que napa la cuchara. Cuela enseguida y enfría rápido.'
      ]
    },
    fr: {
      title: 'Crème anglaise',
      yield: '1 litre',
      ingredients: [
        '500 ml de lait entier',
        '500 ml de crème liquide',
        '1 gousse de vanille',
        '200 g de jaunes d’œuf (environ 10)',
        '150 g de sucre'
      ],
      steps: [
        'Porte à ébullition le lait, la crème et la gousse fendue. Laisse infuser 10 minutes.',
        'Blanchis les jaunes avec le sucre, verse le lait chaud et remets sur feu doux.',
        'Cuis à la nappe, jusqu’à 82 °C. Passe aussitôt et refroidis rapidement.'
      ]
    }
  },
  {
    key: 'karnemelkijs',
    cat: 3,
    folder: 'demo-pat',
    nl: {
      title: 'Karnemelkijs',
      yield: '1,2 liter',
      ingredients: ['500 ml karnemelk', '250 ml slagroom', '150 g suiker', '50 g glucosestroop', '1 citroen, rasp'],
      steps: [
        'Verwarm room, suiker en glucose tot alles is opgelost en laat afkoelen.',
        'Meng met de karnemelk en de citroenrasp en laat een nacht rijpen in de koeling.',
        'Draai in de ijsmachine en bewaar op −18 °C.'
      ]
    },
    en: {
      title: 'Buttermilk ice cream',
      yield: '1.2 litres',
      ingredients: ['500 ml buttermilk', '250 ml double cream', '150 g sugar', '50 g glucose syrup', '1 lemon, zest'],
      steps: [
        'Warm the cream, sugar and glucose until dissolved and leave to cool.',
        'Mix with the buttermilk and lemon zest and leave to mature overnight in the fridge.',
        'Churn in the ice cream machine and store at −18 °C.'
      ]
    },
    de: {
      title: 'Buttermilcheis',
      yield: '1,2 Liter',
      ingredients: ['500 ml Buttermilch', '250 ml Sahne', '150 g Zucker', '50 g Glukosesirup', '1 Zitrone, Abrieb'],
      steps: [
        'Sahne, Zucker und Glukose erwärmen, bis alles gelöst ist, und abkühlen lassen.',
        'Mit Buttermilch und Zitronenabrieb mischen und über Nacht im Kühlschrank reifen lassen.',
        'In der Eismaschine gefrieren und bei −18 °C lagern.'
      ]
    },
    es: {
      title: 'Helado de suero de mantequilla',
      yield: '1,2 litros',
      ingredients: [
        '500 ml de suero de mantequilla',
        '250 ml de nata',
        '150 g de azúcar',
        '50 g de glucosa',
        '1 limón, ralladura'
      ],
      steps: [
        'Calienta la nata, el azúcar y la glucosa hasta que se disuelvan y deja enfriar.',
        'Mezcla con el suero y la ralladura y deja madurar una noche en la nevera.',
        'Turbina en la heladora y guarda a −18 °C.'
      ]
    },
    fr: {
      title: 'Glace au lait ribot',
      yield: '1,2 litre',
      ingredients: [
        '500 ml de lait ribot',
        '250 ml de crème liquide',
        '150 g de sucre',
        '50 g de glucose',
        '1 citron, zeste'
      ],
      steps: [
        'Chauffe la crème, le sucre et le glucose jusqu’à dissolution et laisse refroidir.',
        'Mélange avec le lait ribot et le zeste et laisse maturer une nuit au réfrigérateur.',
        'Turbine et conserve à −18 °C.'
      ]
    }
  },
  {
    key: 'mousse',
    cat: 3,
    folder: 'demo-pat',
    nl: {
      title: 'Chocolademousse',
      yield: '8 personen',
      ingredients: [
        '200 g pure chocolade (70%)',
        '50 g roomboter',
        '4 eieren, gesplitst',
        '40 g suiker',
        '200 ml slagroom'
      ],
      steps: [
        'Smelt chocolade en boter au bain-marie en roer de dooiers erdoor.',
        'Klop de eiwitten met de suiker tot zachte pieken en de room tot yoghurtdikte.',
        'Spatel eerst de room en daarna het eiwit door de chocolade. Minstens 4 uur opstijven in de koeling.'
      ]
    },
    en: {
      title: 'Chocolate mousse',
      yield: '8 portions',
      ingredients: [
        '200 g dark chocolate (70%)',
        '50 g butter',
        '4 eggs, separated',
        '40 g sugar',
        '200 ml double cream'
      ],
      steps: [
        'Melt the chocolate and butter over a bain-marie and stir in the yolks.',
        'Whisk the whites with the sugar to soft peaks and the cream to yoghurt thickness.',
        'Fold in the cream first, then the whites. Leave to set in the fridge for at least 4 hours.'
      ]
    },
    de: {
      title: 'Mousse au Chocolat',
      yield: '8 Personen',
      ingredients: [
        '200 g Zartbitterschokolade (70 %)',
        '50 g Butter',
        '4 Eier, getrennt',
        '40 g Zucker',
        '200 ml Sahne'
      ],
      steps: [
        'Schokolade und Butter über dem Wasserbad schmelzen und das Eigelb einrühren.',
        'Eiweiß mit Zucker zu weichen Spitzen schlagen, die Sahne halbsteif.',
        'Erst die Sahne, dann das Eiweiß unterheben. Mindestens 4 Stunden im Kühlschrank fest werden lassen.'
      ]
    },
    es: {
      title: 'Mousse de chocolate',
      yield: '8 personas',
      ingredients: [
        '200 g de chocolate negro (70 %)',
        '50 g de mantequilla',
        '4 huevos, separadas claras y yemas',
        '40 g de azúcar',
        '200 ml de nata'
      ],
      steps: [
        'Funde el chocolate y la mantequilla al baño maría e incorpora las yemas.',
        'Monta las claras con el azúcar a punto suave y la nata a punto de yogur.',
        'Incorpora primero la nata y luego las claras con movimientos envolventes. Deja cuajar al menos 4 horas en la nevera.'
      ]
    },
    fr: {
      title: 'Mousse au chocolat',
      yield: '8 personnes',
      ingredients: [
        '200 g de chocolat noir (70 %)',
        '50 g de beurre',
        '4 œufs, blancs et jaunes séparés',
        '40 g de sucre',
        '200 ml de crème liquide'
      ],
      steps: [
        'Fais fondre le chocolat et le beurre au bain-marie et incorpore les jaunes.',
        'Monte les blancs avec le sucre en pics souples et la crème en chantilly légère.',
        'Incorpore d’abord la crème, puis les blancs. Laisse prendre au moins 4 heures au réfrigérateur.'
      ]
    }
  },
  {
    key: 'financiers',
    cat: 3,
    folder: 'demo-pat',
    nl: {
      title: 'Financiers',
      yield: '24 stuks',
      ingredients: ['150 g roomboter', '180 g eiwit', '200 g poedersuiker', '80 g amandelmeel', '70 g bloem'],
      steps: [
        'Maak een beurre noisette van de boter en laat lauw worden.',
        'Meng poedersuiker, amandelmeel en bloem, roer het eiwit erdoor en daarna de boter.',
        'Laat minstens 1 uur rusten. Spuit in ingevette vormpjes en bak 10 tot 12 minuten op 190 °C.'
      ]
    },
    en: {
      title: 'Financiers',
      yield: '24 pieces',
      ingredients: ['150 g butter', '180 g egg whites', '200 g icing sugar', '80 g ground almonds', '70 g plain flour'],
      steps: [
        'Brown the butter and leave to cool until lukewarm.',
        'Mix the icing sugar, ground almonds and flour, stir in the whites and then the butter.',
        'Rest for at least 1 hour. Pipe into greased moulds and bake for 10 to 12 minutes at 190 °C.'
      ]
    },
    de: {
      title: 'Financiers',
      yield: '24 Stück',
      ingredients: ['150 g Butter', '180 g Eiweiß', '200 g Puderzucker', '80 g gemahlene Mandeln', '70 g Mehl'],
      steps: [
        'Die Butter zu Nussbutter bräunen und lauwarm abkühlen lassen.',
        'Puderzucker, Mandeln und Mehl mischen, das Eiweiß und danach die Butter einrühren.',
        'Mindestens 1 Stunde ruhen lassen. In gefettete Förmchen spritzen und 10 bis 12 Minuten bei 190 °C backen.'
      ]
    },
    es: {
      title: 'Financiers',
      yield: '24 unidades',
      ingredients: [
        '150 g de mantequilla',
        '180 g de claras de huevo',
        '200 g de azúcar glas',
        '80 g de almendra molida',
        '70 g de harina'
      ],
      steps: [
        'Haz una mantequilla avellana y deja que se temple.',
        'Mezcla el azúcar glas, la almendra y la harina, añade las claras y después la mantequilla.',
        'Deja reposar al menos 1 hora. Escudilla en moldes engrasados y hornea de 10 a 12 minutos a 190 °C.'
      ]
    },
    fr: {
      title: 'Financiers',
      yield: '24 pièces',
      ingredients: [
        '150 g de beurre',
        '180 g de blancs d’œuf',
        '200 g de sucre glace',
        '80 g de poudre d’amande',
        '70 g de farine'
      ],
      steps: [
        'Fais un beurre noisette et laisse-le tiédir.',
        'Mélange le sucre glace, la poudre d’amande et la farine, ajoute les blancs puis le beurre.',
        'Laisse reposer au moins 1 heure. Poche dans des moules beurrés et cuis 10 à 12 minutes à 190 °C.'
      ]
    }
  },
  {
    key: 'brioche',
    cat: 3,
    folder: 'demo-pat',
    nl: {
      title: 'Brioche',
      yield: '2 broden',
      ingredients: ['500 g bloem', '60 g suiker', '10 g zout', '15 g verse gist', '6 eieren', '300 g roomboter, zacht'],
      steps: [
        'Kneed bloem, suiker, zout, gist en eieren 10 minuten tot een elastisch deeg.',
        'Kneed de boter er in stukjes door tot het deeg loslaat van de kom. Laat een nacht rijzen in de koeling.',
        'Vorm de broden, laat 2 uur rijzen, bestrijk met ei en bak 30 minuten op 170 °C.'
      ]
    },
    en: {
      title: 'Brioche',
      yield: '2 loaves',
      ingredients: [
        '500 g strong flour',
        '60 g sugar',
        '10 g salt',
        '15 g fresh yeast',
        '6 eggs',
        '300 g butter, softened'
      ],
      steps: [
        'Knead the flour, sugar, salt, yeast and eggs for 10 minutes to an elastic dough.',
        'Knead in the butter piece by piece until the dough comes away from the bowl. Prove overnight in the fridge.',
        'Shape the loaves, prove for 2 hours, brush with egg and bake for 30 minutes at 170 °C.'
      ]
    },
    de: {
      title: 'Brioche',
      yield: '2 Laibe',
      ingredients: ['500 g Mehl', '60 g Zucker', '10 g Salz', '15 g frische Hefe', '6 Eier', '300 g weiche Butter'],
      steps: [
        'Mehl, Zucker, Salz, Hefe und Eier 10 Minuten zu einem elastischen Teig kneten.',
        'Die Butter stückweise einkneten, bis sich der Teig von der Schüssel löst. Über Nacht im Kühlschrank gehen lassen.',
        'Formen, 2 Stunden gehen lassen, mit Ei bestreichen und 30 Minuten bei 170 °C backen.'
      ]
    },
    es: {
      title: 'Brioche',
      yield: '2 panes',
      ingredients: [
        '500 g de harina de fuerza',
        '60 g de azúcar',
        '10 g de sal',
        '15 g de levadura fresca',
        '6 huevos',
        '300 g de mantequilla pomada'
      ],
      steps: [
        'Amasa la harina, el azúcar, la sal, la levadura y los huevos 10 minutos hasta obtener una masa elástica.',
        'Incorpora la mantequilla poco a poco hasta que la masa se despegue del bol. Deja fermentar una noche en la nevera.',
        'Forma los panes, deja fermentar 2 horas, pinta con huevo y hornea 30 minutos a 170 °C.'
      ]
    },
    fr: {
      title: 'Brioche',
      yield: '2 pains',
      ingredients: [
        '500 g de farine',
        '60 g de sucre',
        '10 g de sel',
        '15 g de levure fraîche',
        '6 œufs',
        '300 g de beurre pommade'
      ],
      steps: [
        'Pétris la farine, le sucre, le sel, la levure et les œufs 10 minutes jusqu’à obtenir une pâte élastique.',
        'Incorpore le beurre par morceaux jusqu’à ce que la pâte se décolle de la cuve. Laisse pousser une nuit au réfrigérateur.',
        'Façonne, laisse pousser 2 heures, dore à l’œuf et cuis 30 minutes à 170 °C.'
      ]
    }
  },
  {
    key: 'bisque',
    cat: 4,
    folder: 'demo-rot',
    nl: {
      title: 'Garnalenbisque',
      yield: '1,5 liter',
      ingredients: [
        '1 kg garnalenkoppen en -schalen',
        '2 eetlepels olijfolie',
        '1 ui',
        '1 wortel',
        '2 eetlepels tomatenpuree',
        '50 ml cognac',
        '1,5 liter visfond',
        '200 ml slagroom'
      ],
      steps: [
        'Rooster de koppen en schalen in olie tot ze kleuren. Voeg ui, wortel en tomatenpuree toe en fruit mee.',
        'Blus af met cognac, voeg de fond toe en laat 40 minuten trekken.',
        'Draai kort fijn, passeer door een fijne zeef, voeg de room toe en breng op smaak.'
      ]
    },
    en: {
      title: 'Prawn bisque',
      yield: '1.5 litres',
      ingredients: [
        '1 kg prawn heads and shells',
        '2 tablespoons olive oil',
        '1 onion',
        '1 carrot',
        '2 tablespoons tomato paste',
        '50 ml cognac',
        '1.5 litres fish stock',
        '200 ml double cream'
      ],
      steps: [
        'Roast the heads and shells in the oil until coloured. Add the onion, carrot and tomato paste and sweat.',
        'Deglaze with cognac, add the stock and simmer for 40 minutes.',
        'Blitz briefly, pass through a fine sieve, add the cream and season.'
      ]
    },
    de: {
      title: 'Garnelenbisque',
      yield: '1,5 Liter',
      ingredients: [
        '1 kg Garnelenköpfe und -schalen',
        '2 Esslöffel Olivenöl',
        '1 Zwiebel',
        '1 Karotte',
        '2 Esslöffel Tomatenmark',
        '50 ml Cognac',
        '1,5 Liter Fischfond',
        '200 ml Sahne'
      ],
      steps: [
        'Köpfe und Schalen in Öl anrösten, bis sie Farbe nehmen. Zwiebel, Karotte und Tomatenmark zugeben und mitschwitzen.',
        'Mit Cognac ablöschen, den Fond zugeben und 40 Minuten ziehen lassen.',
        'Kurz mixen, durch ein feines Sieb passieren, Sahne zugeben und abschmecken.'
      ]
    },
    es: {
      title: 'Bisque de gambas',
      yield: '1,5 litros',
      ingredients: [
        '1 kg de cabezas y cáscaras de gamba',
        '2 cucharadas de aceite de oliva',
        '1 cebolla',
        '1 zanahoria',
        '2 cucharadas de concentrado de tomate',
        '50 ml de coñac',
        '1,5 litros de fumet de pescado',
        '200 ml de nata'
      ],
      steps: [
        'Tuesta las cabezas y cáscaras en el aceite hasta que tomen color. Añade la cebolla, la zanahoria y el tomate y sofríe.',
        'Flambea con coñac, añade el fumet y cuece 40 minutos a fuego suave.',
        'Tritura un momento, cuela por un colador fino, añade la nata y rectifica.'
      ]
    },
    fr: {
      title: 'Bisque de crevettes',
      yield: '1,5 litre',
      ingredients: [
        '1 kg de têtes et carapaces de crevettes',
        '2 cuillères à soupe d’huile d’olive',
        '1 oignon',
        '1 carotte',
        '2 cuillères à soupe de concentré de tomate',
        '50 ml de cognac',
        '1,5 litre de fumet de poisson',
        '200 ml de crème liquide'
      ],
      steps: [
        'Fais revenir les têtes et carapaces dans l’huile jusqu’à coloration. Ajoute l’oignon, la carotte et le concentré et fais suer.',
        'Flambe au cognac, mouille au fumet et laisse cuire 40 minutes.',
        'Mixe brièvement, passe au chinois fin, ajoute la crème et rectifie.'
      ]
    }
  },
  {
    key: 'gravlax',
    cat: 4,
    folder: 'demo-garde',
    nl: {
      title: 'Gravlax van zalm',
      yield: '10 personen',
      ingredients: [
        '1 kg zalmfilet met vel, eerst 24 uur ingevroren op −20 °C',
        '100 g grof zeezout',
        '100 g suiker',
        '1 eetlepel gekneusde peperkorrels',
        '1 bos dille'
      ],
      steps: [
        'Meng zout, suiker en peper. Strooi de helft in een bak, leg de zalm erop met het vel naar beneden.',
        'Bedek met de rest van het mengsel en de gehakte dille. Dek af en laat 48 uur pekelen in de koeling, keer na 24 uur.',
        'Spoel af, dep droog en snijd in dunne plakken.'
      ]
    },
    en: {
      title: 'Salmon gravlax',
      yield: '10 portions',
      ingredients: [
        '1 kg salmon fillet with skin, frozen first for 24 hours at −20 °C',
        '100 g coarse sea salt',
        '100 g sugar',
        '1 tablespoon crushed peppercorns',
        '1 bunch dill'
      ],
      steps: [
        'Mix the salt, sugar and pepper. Scatter half in a tray and lay the salmon on it, skin side down.',
        'Cover with the rest of the mixture and the chopped dill. Cover and cure for 48 hours in the fridge, turning after 24 hours.',
        'Rinse, pat dry and slice thinly.'
      ]
    },
    de: {
      title: 'Graved Lachs',
      yield: '10 Personen',
      ingredients: [
        '1 kg Lachsfilet mit Haut, vorher 24 Stunden bei −20 °C eingefroren',
        '100 g grobes Meersalz',
        '100 g Zucker',
        '1 Esslöffel zerstoßene Pfefferkörner',
        '1 Bund Dill'
      ],
      steps: [
        'Salz, Zucker und Pfeffer mischen. Die Hälfte in eine Form streuen und den Lachs mit der Hautseite nach unten darauflegen.',
        'Mit dem Rest der Mischung und dem gehackten Dill bedecken. Abgedeckt 48 Stunden im Kühlschrank beizen, nach 24 Stunden wenden.',
        'Abspülen, trocken tupfen und in dünne Scheiben schneiden.'
      ]
    },
    es: {
      title: 'Gravlax de salmón',
      yield: '10 personas',
      ingredients: [
        '1 kg de lomo de salmón con piel, congelado antes 24 horas a −20 °C',
        '100 g de sal gruesa',
        '100 g de azúcar',
        '1 cucharada de pimienta en grano machacada',
        '1 manojo de eneldo'
      ],
      steps: [
        'Mezcla la sal, el azúcar y la pimienta. Echa la mitad en una bandeja y coloca el salmón encima, con la piel hacia abajo.',
        'Cubre con el resto de la mezcla y el eneldo picado. Tapa y deja curar 48 horas en la nevera, dándole la vuelta a las 24 horas.',
        'Enjuaga, seca y corta en lonchas finas.'
      ]
    },
    fr: {
      title: 'Gravlax de saumon',
      yield: '10 personnes',
      ingredients: [
        '1 kg de filet de saumon avec la peau, congelé d’abord 24 heures à −20 °C',
        '100 g de gros sel de mer',
        '100 g de sucre',
        '1 cuillère à soupe de poivre concassé',
        '1 botte d’aneth'
      ],
      steps: [
        'Mélange le sel, le sucre et le poivre. Répands-en la moitié dans un bac et pose le saumon dessus, côté peau en dessous.',
        'Recouvre du reste du mélange et de l’aneth haché. Couvre et laisse mariner 48 heures au réfrigérateur, en retournant au bout de 24 heures.',
        'Rince, éponge et taille en fines tranches.'
      ]
    }
  },
  {
    key: 'eendenjus',
    cat: 5,
    folder: 'demo-rot',
    nl: {
      title: 'Eendenjus',
      yield: '500 ml',
      ingredients: [
        '1 kg eendenkarkassen, in stukken',
        '2 sjalotten',
        '1 teen knoflook',
        '100 ml rode port',
        '1 liter kalfsfond',
        '2 takjes tijm',
        '20 g koude roomboter'
      ],
      steps: [
        'Rooster de karkassen in een braadpan donkerbruin. Giet het vet af en fruit sjalot en knoflook mee.',
        'Blus af met port, voeg fond en tijm toe en laat in 1,5 uur inkoken tot 500 ml.',
        'Passeer door een fijne zeef en monteer vlak voor het serveren met de koude boter.'
      ]
    },
    en: {
      title: 'Duck jus',
      yield: '500 ml',
      ingredients: [
        '1 kg duck carcasses, chopped',
        '2 shallots',
        '1 clove garlic',
        '100 ml ruby port',
        '1 litre veal stock',
        '2 sprigs thyme',
        '20 g cold butter'
      ],
      steps: [
        'Roast the carcasses in a heavy pan until dark brown. Pour off the fat and sweat the shallot and garlic.',
        'Deglaze with port, add the stock and thyme and reduce to 500 ml over 1.5 hours.',
        'Pass through a fine sieve and mount with the cold butter just before serving.'
      ]
    },
    de: {
      title: 'Entenjus',
      yield: '500 ml',
      ingredients: [
        '1 kg Entenkarkassen, gehackt',
        '2 Schalotten',
        '1 Knoblauchzehe',
        '100 ml roter Portwein',
        '1 Liter Kalbsfond',
        '2 Zweige Thymian',
        '20 g kalte Butter'
      ],
      steps: [
        'Die Karkassen in einem Bräter dunkelbraun rösten. Das Fett abgießen und Schalotte und Knoblauch anschwitzen.',
        'Mit Portwein ablöschen, Fond und Thymian zugeben und in 1,5 Stunden auf 500 ml einkochen.',
        'Durch ein feines Sieb passieren und kurz vor dem Servieren mit der kalten Butter montieren.'
      ]
    },
    es: {
      title: 'Jugo de pato',
      yield: '500 ml',
      ingredients: [
        '1 kg de carcasas de pato, troceadas',
        '2 chalotas',
        '1 diente de ajo',
        '100 ml de oporto tinto',
        '1 litro de fondo de ternera',
        '2 ramitas de tomillo',
        '20 g de mantequilla fría'
      ],
      steps: [
        'Tuesta las carcasas en una cazuela hasta que estén bien doradas. Retira la grasa y rehoga la chalota y el ajo.',
        'Desglasa con oporto, añade el fondo y el tomillo y reduce a 500 ml en 1,5 horas.',
        'Cuela por un colador fino y monta con la mantequilla fría justo antes de servir.'
      ]
    },
    fr: {
      title: 'Jus de canard',
      yield: '500 ml',
      ingredients: [
        '1 kg de carcasses de canard, concassées',
        '2 échalotes',
        '1 gousse d’ail',
        '100 ml de porto rouge',
        '1 litre de fond de veau',
        '2 branches de thym',
        '20 g de beurre froid'
      ],
      steps: [
        'Rôtis les carcasses en cocotte jusqu’à ce qu’elles soient bien brunes. Dégraisse et fais suer l’échalote et l’ail.',
        'Déglace au porto, mouille au fond, ajoute le thym et réduis à 500 ml en 1 h 30.',
        'Passe au chinois fin et monte au beurre froid juste avant de servir.'
      ]
    }
  }
];

// Recepten van "Chef Anna" in het demo-keukenteam.
const DEMO_SHARED_RECIPES = [
  {
    key: 'brulee',
    nl: {
      title: 'Crème brûlée',
      yield: '8 personen',
      ingredients: ['500 ml slagroom', '1 vanillestokje', '6 eidooiers', '80 g suiker', 'rietsuiker om te branden'],
      steps: [
        'Breng de room met het vanillestokje tegen de kook en laat 15 minuten trekken.',
        'Klop dooiers en suiker los en roer de warme room erdoor. Verdeel over de schaaltjes.',
        'Gaar 40 minuten au bain-marie op 100 °C, laat afkoelen en karamelliseer vlak voor het serveren met rietsuiker.'
      ]
    },
    en: {
      title: 'Crème brûlée',
      yield: '8 portions',
      ingredients: ['500 ml double cream', '1 vanilla pod', '6 egg yolks', '80 g sugar', 'demerara sugar for glazing'],
      steps: [
        'Bring the cream and vanilla just to the boil and leave to infuse for 15 minutes.',
        'Whisk the yolks and sugar and stir in the warm cream. Divide between the ramekins.',
        'Bake for 40 minutes in a bain-marie at 100 °C, cool and caramelise with demerara just before serving.'
      ]
    },
    de: {
      title: 'Crème brûlée',
      yield: '8 Personen',
      ingredients: ['500 ml Sahne', '1 Vanilleschote', '6 Eigelb', '80 g Zucker', 'brauner Zucker zum Karamellisieren'],
      steps: [
        'Sahne mit der Vanilleschote aufkochen und 15 Minuten ziehen lassen.',
        'Eigelb und Zucker verrühren und die warme Sahne einrühren. In die Förmchen verteilen.',
        '40 Minuten im Wasserbad bei 100 °C garen, abkühlen und kurz vor dem Servieren mit braunem Zucker karamellisieren.'
      ]
    },
    es: {
      title: 'Crème brûlée',
      yield: '8 personas',
      ingredients: [
        '500 ml de nata',
        '1 vaina de vainilla',
        '6 yemas de huevo',
        '80 g de azúcar',
        'azúcar moreno para quemar'
      ],
      steps: [
        'Calienta la nata con la vainilla casi hasta hervir y deja infusionar 15 minutos.',
        'Bate las yemas con el azúcar e incorpora la nata caliente. Reparte en los moldes.',
        'Cuece 40 minutos al baño maría a 100 °C, deja enfriar y quema con azúcar moreno justo antes de servir.'
      ]
    },
    fr: {
      title: 'Crème brûlée',
      yield: '8 personnes',
      ingredients: [
        '500 ml de crème liquide',
        '1 gousse de vanille',
        '6 jaunes d’œuf',
        '80 g de sucre',
        'cassonade pour caraméliser'
      ],
      steps: [
        'Porte la crème à frémissement avec la vanille et laisse infuser 15 minutes.',
        'Blanchis les jaunes avec le sucre et verse la crème chaude. Répartis dans les ramequins.',
        'Cuis 40 minutes au bain-marie à 100 °C, laisse refroidir et caramélise à la cassonade juste avant de servir.'
      ]
    }
  },
  {
    key: 'peer',
    nl: {
      title: 'Gepocheerde peer in rode wijn',
      yield: '6 personen',
      ingredients: [
        '6 stoofperen, geschild',
        '750 ml rode wijn',
        '150 g suiker',
        '1 kaneelstokje',
        '2 steranijs',
        '1 sinaasappel, schil'
      ],
      steps: [
        'Breng wijn, suiker en specerijen aan de kook.',
        'Pocheer de peren afgedekt 30 tot 45 minuten zachtjes tot ze gaar zijn.',
        'Laat afkoelen in het vocht en kook een deel van het vocht in tot een stroop.'
      ]
    },
    en: {
      title: 'Pears poached in red wine',
      yield: '6 portions',
      ingredients: [
        '6 cooking pears, peeled',
        '750 ml red wine',
        '150 g sugar',
        '1 cinnamon stick',
        '2 star anise',
        '1 orange, peel'
      ],
      steps: [
        'Bring the wine, sugar and spices to the boil.',
        'Poach the pears, covered, for 30 to 45 minutes until tender.',
        'Leave to cool in the liquid and reduce some of it to a syrup.'
      ]
    },
    de: {
      title: 'Birnen in Rotwein',
      yield: '6 Personen',
      ingredients: [
        '6 Kochbirnen, geschält',
        '750 ml Rotwein',
        '150 g Zucker',
        '1 Zimtstange',
        '2 Sternanis',
        '1 Orange, Schale'
      ],
      steps: [
        'Wein, Zucker und Gewürze aufkochen.',
        'Die Birnen zugedeckt 30 bis 45 Minuten leise pochieren, bis sie weich sind.',
        'Im Sud abkühlen lassen und einen Teil des Suds zu Sirup einkochen.'
      ]
    },
    es: {
      title: 'Peras al vino tinto',
      yield: '6 personas',
      ingredients: [
        '6 peras de cocción, peladas',
        '750 ml de vino tinto',
        '150 g de azúcar',
        '1 rama de canela',
        '2 anises estrellados',
        '1 naranja, piel'
      ],
      steps: [
        'Lleva a ebullición el vino, el azúcar y las especias.',
        'Escalfa las peras tapadas de 30 a 45 minutos a fuego suave hasta que estén tiernas.',
        'Deja enfriar en el líquido y reduce parte de él hasta obtener un almíbar.'
      ]
    },
    fr: {
      title: 'Poires pochées au vin rouge',
      yield: '6 personnes',
      ingredients: [
        '6 poires à cuire, épluchées',
        '750 ml de vin rouge',
        '150 g de sucre',
        '1 bâton de cannelle',
        '2 étoiles de badiane',
        '1 orange, zeste'
      ],
      steps: [
        'Porte à ébullition le vin, le sucre et les épices.',
        'Poche les poires à couvert 30 à 45 minutes à feu doux jusqu’à ce qu’elles soient tendres.',
        'Laisse refroidir dans le sirop et fais réduire une partie du liquide en sirop.'
      ]
    }
  },
  {
    key: 'mosselen',
    nl: {
      title: 'Mosselen in witte wijn',
      yield: '4 personen',
      ingredients: [
        '2 kg mosselen, schoongemaakt',
        '2 sjalotten',
        '1 teen knoflook',
        '200 ml droge witte wijn',
        '30 g roomboter',
        '1 bos bladpeterselie'
      ],
      steps: [
        'Fruit sjalot en knoflook in de boter in een grote pan.',
        'Voeg de wijn en de mosselen toe, deksel erop en kook op hoog vuur 4 tot 5 minuten, tot ze open zijn. Schud tussendoor.',
        'Gooi gesloten mosselen weg en bestrooi met gehakte peterselie.'
      ]
    },
    en: {
      title: 'Mussels in white wine',
      yield: '4 portions',
      ingredients: [
        '2 kg mussels, cleaned',
        '2 shallots',
        '1 clove garlic',
        '200 ml dry white wine',
        '30 g butter',
        '1 bunch flat-leaf parsley'
      ],
      steps: [
        'Sweat the shallot and garlic in the butter in a large pan.',
        'Add the wine and mussels, cover and cook over a high heat for 4 to 5 minutes until open. Shake now and then.',
        'Discard any that stay closed and scatter with chopped parsley.'
      ]
    },
    de: {
      title: 'Miesmuscheln in Weißwein',
      yield: '4 Personen',
      ingredients: [
        '2 kg Miesmuscheln, geputzt',
        '2 Schalotten',
        '1 Knoblauchzehe',
        '200 ml trockener Weißwein',
        '30 g Butter',
        '1 Bund glatte Petersilie'
      ],
      steps: [
        'Schalotte und Knoblauch in der Butter in einem großen Topf anschwitzen.',
        'Wein und Muscheln zugeben, Deckel auflegen und bei starker Hitze 4 bis 5 Minuten garen, bis sie offen sind. Zwischendurch schütteln.',
        'Geschlossene Muscheln wegwerfen und mit gehackter Petersilie bestreuen.'
      ]
    },
    es: {
      title: 'Mejillones al vino blanco',
      yield: '4 personas',
      ingredients: [
        '2 kg de mejillones, limpios',
        '2 chalotas',
        '1 diente de ajo',
        '200 ml de vino blanco seco',
        '30 g de mantequilla',
        '1 manojo de perejil liso'
      ],
      steps: [
        'Rehoga la chalota y el ajo en la mantequilla en una olla grande.',
        'Añade el vino y los mejillones, tapa y cuece a fuego fuerte de 4 a 5 minutos, hasta que se abran. Agita de vez en cuando.',
        'Desecha los que sigan cerrados y espolvorea perejil picado.'
      ]
    },
    fr: {
      title: 'Moules au vin blanc',
      yield: '4 personnes',
      ingredients: [
        '2 kg de moules, nettoyées',
        '2 échalotes',
        '1 gousse d’ail',
        '200 ml de vin blanc sec',
        '30 g de beurre',
        '1 botte de persil plat'
      ],
      steps: [
        'Fais suer l’échalote et l’ail dans le beurre dans une grande cocotte.',
        'Ajoute le vin et les moules, couvre et cuis à feu vif 4 à 5 minutes, jusqu’à ouverture. Secoue de temps en temps.',
        'Jette celles qui restent fermées et parsème de persil haché.'
      ]
    }
  }
];
