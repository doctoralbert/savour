// Kerntemperaturen in één oogopslag (2026-11-08): de tabel die bovenaan het artikel over kerntemperaturen staat, in
// vijf talen. tools/build-seo.mjs zet hem als eerste sectie. De waarden komen uit hetzelfde artikel
// (tools/site-blog-temperaturen*.mjs) en dus uit dezelfde bronnen: USDA FSIS (gevogelte, varken, gehakt), de Britse
// Food Standards Agency (kippenlever) en de Hygiënecode; de garingen van rund, vis en schaaldieren zijn richtwaarden
// voor structuur. Pas ze niet aan zonder bron, en verander ze dan ook in het artikel zelf.

const row = (...x) => x;

export const TEMP_QUICK = {
  nl: [
    'Kerntemperaturen in één oogopslag',
    'De belangrijkste kerntemperaturen voor de professionele keuken. Waar een tijd bij staat, moet de kern die tijd op temperatuur blijven. Onder de tabel lees je waarom, met de bronnen.',
    {
      head: ['Product', 'Kerntemperatuur', 'Let op'],
      rows: [
        row('Kipfilet', '63–65 °C', '3 tot 9 minuten op temperatuur houden; bij 74 °C direct veilig (USDA)'),
        row('Kippendij, kippenpoot', '70–80 °C', 'Hoger voor de structuur, niet voor de veiligheid'),
        row('Kippenlever', '70 °C', '2 minuten op temperatuur houden (FSA)'),
        row('Eendenborst', '54–58 °C', 'Rosé; onderbouw tijd en temperatuur in je HACCP-plan'),
        row('Varkenshaas', '60–62 °C', 'Rosé en sappig'),
        row('Varkenskotelet, varkensrug', '63 °C', '3 minuten rust (USDA)'),
        row('Rund saignant (rare)', '50–52 °C', 'Heel stuk vlees'),
        row('Rund rosé (medium-rare)', '54–56 °C', 'Ook voor lam en hert'),
        row('Rund à point (medium)', '58–60 °C', ''),
        row('Rund bien cuit (well done)', '68 °C en hoger', ''),
        row('Gehakt, burger, worst', '71 °C', 'Altijd door en door gaar'),
        row('Zalm, forel', '45–50 °C', 'Mi-cuit; rauw of bijna rauw eerst invriezen'),
        row('Kabeljauw, schelvis, heilbot', '50–54 °C', ''),
        row('Tarbot, tong, zeebaars', '50–55 °C', ''),
        row('Tonijn', '40–45 °C', 'Midden rauw'),
        row('Kreeft', '55–60 °C', ''),
        row('Langoustine', '50–55 °C', ''),
        row('Gamba’s, garnalen', '55–60 °C', ''),
        row('Sint-jakobsschelp (coquille)', '45–50 °C', 'Glazig midden'),
        row('Mosselen, kokkels', 'Tot ze open zijn', 'Gesloten exemplaren weggooien'),
        row('Hygiënecode (verhitten)', '75 °C', 'Werk je lager, leg tijd en temperatuur vast in je HACCP-plan')
      ],
      note: 'Bronnen: USDA FSIS, Food Standards Agency (VK) en de Hygiënecode voor de horeca (KHN). De waarden voor rund, vis en schaaldieren zijn richtwaarden voor de garing. Je eigen HACCP-plan gaat altijd voor.'
    }
  ],
  en: [
    'Core temperatures at a glance',
    'The most important core temperatures for the professional kitchen. Where a time is given, the core has to stay at that temperature for that long. Below the table you can read why, with the sources.',
    {
      head: ['Product', 'Core temperature', 'Note'],
      rows: [
        row('Chicken breast', '63–65 °C / 145–149 °F', 'Hold for 3 to 9 minutes; instantly safe at 74 °C / 165 °F (USDA)'),
        row('Chicken thigh, leg', '70–80 °C / 158–176 °F', 'Higher for texture, not for safety'),
        row('Chicken liver', '70 °C / 158 °F', 'Hold for 2 minutes (FSA)'),
        row('Duck breast', '54–58 °C / 129–136 °F', 'Pink; back up time and temperature in your HACCP plan'),
        row('Pork tenderloin', '60–62 °C / 140–144 °F', 'Pink and juicy'),
        row('Pork chop, pork loin', '63 °C / 145 °F', '3 minutes rest (USDA)'),
        row('Beef rare', '50–52 °C / 122–126 °F', 'Whole cut of meat'),
        row('Beef medium-rare', '54–56 °C / 129–133 °F', 'Also for lamb and venison'),
        row('Beef medium', '58–60 °C / 136–140 °F', ''),
        row('Beef well done', '68 °C / 154 °F and above', ''),
        row('Mince, burger, sausage', '71 °C / 160 °F', 'Always cooked through'),
        row('Salmon, trout', '45–50 °C / 113–122 °F', 'Mi-cuit; freeze first if raw or nearly raw'),
        row('Cod, haddock, halibut', '50–54 °C / 122–129 °F', ''),
        row('Turbot, sole, sea bass', '50–55 °C / 122–131 °F', ''),
        row('Tuna', '40–45 °C / 104–113 °F', 'Raw centre'),
        row('Lobster', '55–60 °C / 131–140 °F', ''),
        row('Langoustine', '50–55 °C / 122–131 °F', ''),
        row('Prawns, shrimp', '55–60 °C / 131–140 °F', ''),
        row('Scallop', '45–50 °C / 113–122 °F', 'Translucent centre'),
        row('Mussels, cockles', 'Until they open', 'Discard any that stay closed'),
        row('Dutch hygiene code (cooking)', '75 °C / 167 °F', 'Working lower? Record time and temperature in your HACCP plan')
      ],
      note: 'Sources: USDA FSIS, Food Standards Agency (UK) and the Dutch hospitality hygiene code (KHN). The values for beef, fish and shellfish are guidelines for doneness. Your own HACCP plan always comes first.'
    }
  ],
  de: [
    'Kerntemperaturen auf einen Blick',
    'Die wichtigsten Kerntemperaturen für die Profiküche. Wo eine Zeit steht, muss der Kern so lange auf Temperatur bleiben. Unter der Tabelle liest du, warum, mit den Quellen.',
    {
      head: ['Produkt', 'Kerntemperatur', 'Hinweis'],
      rows: [
        row('Hähnchenbrust', '63–65 °C', '3 bis 9 Minuten halten; bei 74 °C sofort sicher (USDA)'),
        row('Hähnchenschenkel, Keule', '70–80 °C', 'Höher für die Textur, nicht für die Sicherheit'),
        row('Hühnerleber', '70 °C', '2 Minuten halten (FSA)'),
        row('Entenbrust', '54–58 °C', 'Rosa; Zeit und Temperatur im HACCP-Plan festhalten'),
        row('Schweinefilet', '60–62 °C', 'Rosa und saftig'),
        row('Schweinekotelett, Schweinerücken', '63 °C', '3 Minuten Ruhezeit (USDA)'),
        row('Rind blutig (rare)', '50–52 °C', 'Ganzes Stück Fleisch'),
        row('Rind rosa (medium rare)', '54–56 °C', 'Auch für Lamm und Hirsch'),
        row('Rind medium', '58–60 °C', ''),
        row('Rind durch (well done)', 'ab 68 °C', ''),
        row('Hackfleisch, Burger, Wurst', '71 °C', 'Immer durchgegart'),
        row('Lachs, Forelle', '45–50 °C', 'Mi-cuit; roh oder fast roh vorher einfrieren'),
        row('Kabeljau, Schellfisch, Heilbutt', '50–54 °C', ''),
        row('Steinbutt, Seezunge, Wolfsbarsch', '50–55 °C', ''),
        row('Thunfisch', '40–45 °C', 'Innen roh'),
        row('Hummer', '55–60 °C', ''),
        row('Kaisergranat', '50–55 °C', ''),
        row('Garnelen', '55–60 °C', ''),
        row('Jakobsmuschel', '45–50 °C', 'Glasiger Kern'),
        row('Miesmuscheln, Herzmuscheln', 'Bis sie offen sind', 'Geschlossene wegwerfen'),
        row('Niederländischer Hygienekodex (Erhitzen)', '75 °C', 'Niedriger? Zeit und Temperatur im HACCP-Plan festhalten')
      ],
      note: 'Quellen: USDA FSIS, Food Standards Agency (UK) und der niederländische Hygienekodex für die Gastronomie (KHN). Die Werte für Rind, Fisch und Krustentiere sind Richtwerte für den Garpunkt. Dein eigener HACCP-Plan geht immer vor.'
    }
  ],
  es: [
    'Temperaturas internas de un vistazo',
    'Las temperaturas internas más importantes para la cocina profesional. Donde aparece un tiempo, el centro debe mantenerse a esa temperatura ese tiempo. Debajo de la tabla explicamos por qué, con las fuentes.',
    {
      head: ['Producto', 'Temperatura interna', 'Atención'],
      rows: [
        row('Pechuga de pollo', '63–65 °C', 'Mantener de 3 a 9 minutos; a 74 °C es seguro al instante (USDA)'),
        row('Muslo y contramuslo de pollo', '70–80 °C', 'Más alto por la textura, no por la seguridad'),
        row('Hígado de pollo', '70 °C', 'Mantener 2 minutos (FSA)'),
        row('Magret de pato', '54–58 °C', 'Rosado; justifica tiempo y temperatura en tu plan APPCC'),
        row('Solomillo de cerdo', '60–62 °C', 'Rosado y jugoso'),
        row('Chuleta y lomo de cerdo', '63 °C', '3 minutos de reposo (USDA)'),
        row('Vacuno poco hecho', '50–52 °C', 'Pieza entera'),
        row('Vacuno al punto menos', '54–56 °C', 'También para cordero y ciervo'),
        row('Vacuno al punto', '58–60 °C', ''),
        row('Vacuno muy hecho', '68 °C o más', ''),
        row('Carne picada, hamburguesa, salchicha', '71 °C', 'Siempre bien hecha'),
        row('Salmón, trucha', '45–50 °C', 'Mi-cuit; si va cruda o casi cruda, congelar antes'),
        row('Bacalao, eglefino, fletán', '50–54 °C', ''),
        row('Rodaballo, lenguado, lubina', '50–55 °C', ''),
        row('Atún', '40–45 °C', 'Centro crudo'),
        row('Bogavante', '55–60 °C', ''),
        row('Cigala', '50–55 °C', ''),
        row('Gambas, langostinos', '55–60 °C', ''),
        row('Vieira', '45–50 °C', 'Centro translúcido'),
        row('Mejillones, berberechos', 'Hasta que se abran', 'Desechar los que sigan cerrados'),
        row('Código de higiene neerlandés (cocinar)', '75 °C', '¿Trabajas más bajo? Anota tiempo y temperatura en tu plan APPCC')
      ],
      note: 'Fuentes: USDA FSIS, Food Standards Agency (Reino Unido) y el código de higiene de la hostelería neerlandesa (KHN). Los valores de vacuno, pescado y marisco son orientativos para el punto. Tu propio plan APPCC siempre manda.'
    }
  ],
  fr: [
    'Les températures à cœur en un coup d’œil',
    'Les températures à cœur les plus importantes pour la cuisine professionnelle. Quand une durée est indiquée, le cœur doit rester à cette température pendant ce temps. Sous le tableau, tu lis pourquoi, avec les sources.',
    {
      head: ['Produit', 'Température à cœur', 'Attention'],
      rows: [
        row('Filet de poulet', '63–65 °C', 'Maintenir 3 à 9 minutes ; sûr immédiatement à 74 °C (USDA)'),
        row('Cuisse de poulet', '70–80 °C', 'Plus haut pour la texture, pas pour la sécurité'),
        row('Foie de volaille', '70 °C', 'Maintenir 2 minutes (FSA)'),
        row('Magret de canard', '54–58 °C', 'Rosé ; justifie durée et température dans ton plan HACCP'),
        row('Filet mignon de porc', '60–62 °C', 'Rosé et juteux'),
        row('Côte et carré de porc', '63 °C', '3 minutes de repos (USDA)'),
        row('Bœuf saignant', '50–52 °C', 'Pièce entière'),
        row('Bœuf rosé (à point saignant)', '54–56 °C', 'Aussi pour l’agneau et le cerf'),
        row('Bœuf à point', '58–60 °C', ''),
        row('Bœuf bien cuit', '68 °C et plus', ''),
        row('Viande hachée, burger, saucisse', '71 °C', 'Toujours cuit à cœur'),
        row('Saumon, truite', '45–50 °C', 'Mi-cuit ; cru ou presque cru, congeler d’abord'),
        row('Cabillaud, églefin, flétan', '50–54 °C', ''),
        row('Turbot, sole, bar', '50–55 °C', ''),
        row('Thon', '40–45 °C', 'Cœur cru'),
        row('Homard', '55–60 °C', ''),
        row('Langoustine', '50–55 °C', ''),
        row('Crevettes, gambas', '55–60 °C', ''),
        row('Saint-Jacques', '45–50 °C', 'Cœur nacré'),
        row('Moules, coques', 'Jusqu’à ouverture', 'Jeter celles qui restent fermées'),
        row('Code d’hygiène néerlandais (cuisson)', '75 °C', 'Tu travailles plus bas ? Note durée et température dans ton plan HACCP')
      ],
      note: 'Sources : USDA FSIS, Food Standards Agency (Royaume-Uni) et le code d’hygiène de la restauration néerlandaise (KHN). Les valeurs pour le bœuf, le poisson et les crustacés sont des repères de cuisson. Ton propre plan HACCP prime toujours.'
    }
  ]
};
