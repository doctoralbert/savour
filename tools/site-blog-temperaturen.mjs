// Blogartikelen over kerntemperaturen en sous-vide (2026-11-02), in het Nederlands en Engels. Duits, Spaans en
// Frans staan in tools/site-blog-temperaturen-talen.mjs. Waarden komen uit de genoemde bronnen; pas ze niet aan
// zonder bron. Een sectie is [kop, tekst] met eventueel een lijst of tabel ({ head, rows, note }).

export const SRC = {
  fsisChart: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart',
  fsisPoultry: 'https://www.fsis.usda.gov/sites/default/files/media_file/2021-12/Appendix-A.pdf',
  eu1276: 'https://eur-lex.europa.eu/eli/reg/2011/1276/oj',
  efsaBivalves: 'https://www.efsa.europa.eu/en/news/efsa-advises-heat-treatment-bivalve-molluscs',
  baldwin: 'https://douglasbaldwin.com/sous-vide.html',
  khn: 'https://www.khn.nl/onderwerpen/ondernemen-in-de-horeca/hygienecode'
};

export const TEMP_POSTS = [
  {
    id: 'kerntemperaturen',
    date: '2026-11-02',
    nl: {
      slug: 'blog/kerntemperaturen-vlees-vis-schaaldieren',
      title: 'Kerntemperaturen voor vlees, gevogelte, vis en schaaldieren',
      desc: 'Kerntemperaturen voor de professionele keuken: kip, varken, rund, lam, wild, vis en schaal- en schelpdieren. Waarom kip niet naar 75 °C hoeft, met tijd-temperatuurtabellen en bronnen.',
      h1: 'Kerntemperaturen voor vlees, gevogelte, vis en schaaldieren',
      lead: 'Kip hoeft niet naar 75 °C en varkenshaas mag rosé. Wat telt is temperatuur én tijd. Een overzicht voor de professionele keuken, met de bronnen erbij.',
      sections: [
        [
          'Temperatuur en tijd horen bij elkaar',
          'Bacteriën gaan niet dood op één magische temperatuur. Hoe warmer, hoe sneller het gaat. Salmonella in kip is bij een kerntemperatuur van 74 °C binnen enkele seconden onschadelijk; bij 60 °C duurt dat ongeveer een halfuur. Het resultaat is even veilig, maar het vlees is bij 60 °C veel sappiger.\n\nDaarom zeggen de tabellen hieronder steeds twee dingen: welke kerntemperatuur, en hoelang de kern die temperatuur moet houden. Hoe dikker het stuk, hoe langer het duurt voordat de kern zover is.'
        ],
        [
          'Wat de Hygiënecode zegt',
          'De Hygiënecode voor de horeca gaat bij verhitten uit van een kerntemperatuur van ten minste 75 °C. Warm houden doe je boven 60 °C en terugkoelen naar 7 °C of kouder binnen 5 uur. Werk je lager, zoals bij rosé eend, kip uit de sous-vide of een lauwe zalm, leg dan in je HACCP-plan vast welke combinatie van tijd en temperatuur je gebruikt. Meet met een geijkte kernthermometer en registreer het. De code zelf bestel je bij [KHN](' + SRC.khn + ').'
        ],
        [
          'Gevogelte: kip, kalkoen en parelhoen',
          'De Amerikaanse voedselveiligheidsdienst (USDA FSIS) heeft per temperatuur uitgerekend hoelang kip op die kerntemperatuur moet blijven om Salmonella tien miljoen keer te verminderen. Vettere stukken, zoals dij met vel, hebben iets meer tijd nodig. Kalkoen ook.',
          {
            head: ['Kerntemperatuur', 'Magere kip (2% vet)', 'Vettere kip (12% vet)'],
            rows: [
              ['60,0 °C', '26 minuten', '35 minuten'],
              ['62,8 °C', '9 minuten', '13 minuten'],
              ['65,6 °C', '3 minuten', '4 minuten'],
              ['68,3 °C', '45 seconden', '54 seconden'],
              ['71,1 °C', '14 seconden', '17 seconden'],
              ['73,9 °C', 'direct', 'direct']
            ],
            note: 'Bron: USDA FSIS, tijd-temperatuurtabellen voor gevogelte (7-log reductie van Salmonella). De tijd telt vanaf het moment dat de kern de temperatuur heeft bereikt.'
          }
        ],
        [
          'Kip in de praktijk',
          'Een kipfilet die je op 63 tot 65 °C kern brengt en een paar minuten op die temperatuur laat rusten, is veilig en blijft sappig. In de pan of oven is die rusttijd lastig te garanderen; daar haal je de filet er liever bij 66 tot 68 °C uit, of je houdt hem afgedekt warm. Met sous-vide houd je de tijd precies vast.\n\nDijen en poten haal je vaak juist hoger, naar 70 tot 80 °C. Niet voor de veiligheid, maar omdat het bindweefsel dan zacht wordt.'
        ],
        [
          'Kippenlever en orgaanvlees',
          'Kippenlever kan van binnen Campylobacter bevatten, ook als de buitenkant goed gebakken is. Na uitbraken met roze kippenleverparfait adviseert de Britse Food Standards Agency een kerntemperatuur van 70 °C gedurende 2 minuten. Gelijkwaardig zijn 65 °C gedurende 10 minuten of 75 °C gedurende 30 seconden. Een rosé kippenlevertje is dus geen goed idee; een parfait die au bain-marie 65 °C kern haalt en daar 10 minuten blijft, wel.'
        ],
        [
          'Varkensvlees',
          'Varkensvlees hoeft niet meer grijs. De USDA verlaagde de norm voor hele stukken varkensvlees in 2011 van 71 °C naar 63 °C, met 3 minuten rust. In de EU worden slachtvarkens bovendien gecontroleerd op trichine. Bij een heel stuk vlees zitten bacteriën vooral aan de buitenkant, en die wordt bij het aanbraden ruim heet genoeg.',
          {
            head: ['Product', 'Kern', 'Resultaat'],
            rows: [
              ['Varkenshaas', '60–62 °C', 'Rosé en sappig'],
              ['Kotelet, karbonade, varkensrug', '62–63 °C', 'Licht rosé, 3 minuten rust'],
              ['Gehakt, worst, burger', '71 °C', 'Door en door gaar: bacteriën zitten door het hele product'],
              ['Schouder, buik, wang (stoven)', '85–95 °C', 'Zacht en draderig; de temperatuur is hier voor de structuur']
            ]
          }
        ],
        [
          'Rund, kalf en lam',
          'Bij een heel stuk rund, kalf of lam is de binnenkant van nature vrijwel kiemvrij. Daarom mag een entrecote saignant. De kerntemperatuur kies je hier op smaak en structuur. Haal grote stukken 2 tot 5 °C eerder uit de oven: tijdens het rusten loopt de kern nog op.',
          {
            head: ['Garing', 'Kern', 'Zo ziet het eruit'],
            rows: [
              ['Saignant (rare)', '50–52 °C', 'Rood en sappig'],
              ['Rosé (medium-rare)', '54–56 °C', 'Roze, het vet net zacht'],
              ['À point (medium)', '58–60 °C', 'Lichtroze'],
              ['Bien cuit (well done)', '68 °C en hoger', 'Grijs, stevig'],
              ['Gehakt, burger', '71 °C', 'Altijd door: bacteriën zijn door het vlees gemengd']
            ]
          }
        ],
        [
          'Tartaar, carpaccio en steak tartare',
          'Rauw rundvlees is alleen veilig als het vlees vers is, van een betrouwbare leverancier komt, koud blijft en pas vlak voor het serveren wordt gesneden of gehakt. Het risico is nooit nul. Serveer het niet aan zwangeren, jonge kinderen, ouderen of mensen met een verminderde weerstand.'
        ],
        [
          'Wild, eend en gans',
          'Hert, ree en haas behandel je als rund: rosé mag. Wild zwijn kan trichine bevatten. Serveer het alleen rosé als het officieel op trichine is gekeurd; anders gaar je het door tot minstens 71 °C.\n\nEendenborst en ganzenborst worden in de keuken rosé geserveerd, op 54 tot 58 °C. Wie dat veilig wil onderbouwen, gebruikt de tijden voor gevogelte uit de tabel hierboven, of gaart de borst sous-vide (zie [Sous-vide: temperaturen en tijden](/blog/sous-vide-temperaturen-en-tijden)). Poten en bouten confijt je op 80 °C of hoger.'
        ],
        [
          'Vis',
          'Bij vis kies je de kerntemperatuur vooral op structuur. Te heet en vis droogt binnen een paar graden uit.',
          {
            head: ['Vis', 'Kern', 'Resultaat'],
            rows: [
              ['Zalm, forel', '45–50 °C', 'Mi-cuit: glazig, boterzacht'],
              ['Kabeljauw, schelvis, heilbot', '50–54 °C', 'Lost net in lamellen'],
              ['Tarbot, tong, zeebaars', '50–55 °C', 'Stevig en sappig'],
              ['Tonijn', '40–45 °C (midden rauw)', 'Kort dichtschroeien'],
              ['Volledig gaar (FSIS)', '63 °C', 'Ondoorzichtig, valt uit elkaar']
            ]
          }
        ],
        [
          'Parasieten: wanneer vis eerst moet worden ingevroren',
          'Vis die rauw of bijna rauw wordt gegeten, kan de parasiet Anisakis bevatten. Denk aan sushi, ceviche, tartaar, gemarineerde of koudgerookte vis, en ook aan mi-cuit zalm van 45 °C. Volgens EU-verordening 853/2004 (gewijzigd door [1276/2011](' + SRC.eu1276 + ')) moet zulke vis eerst worden ingevroren: minstens 24 uur op −20 °C of kouder, of 15 uur op −35 °C. Verhitten tot een kern van 60 °C gedurende minstens 1 minuut doodt de parasieten ook. Voor kweekvis kan een uitzondering gelden; vraag je leverancier om de verklaring.'
        ],
        [
          'Schaal- en schelpdieren',
          'Schaaldieren gaar je op structuur. Schelpdieren vragen meer voorzichtigheid.',
          {
            head: ['Product', 'Kern', 'Resultaat'],
            rows: [
              ['Kreeft', '55–60 °C', 'Sappig, net ondoorzichtig'],
              ['Langoustine', '50–55 °C', 'Glazig en zoet'],
              ['Gamba’s, garnalen', '55–60 °C', 'Ondoorzichtig en stevig'],
              ['Sint-jakobsschelp', '45–50 °C', 'Glazig midden'],
              ['Mosselen, kokkels', 'Tot ze open zijn, en dan nog even doorkoken', 'Gesloten exemplaren weggooien']
            ]
          }
        ],
        [
          'Virussen in schelpdieren',
          'Mosselen, oesters en kokkels kunnen norovirus en hepatitis A bevatten. Die virussen kunnen meer hitte hebben dan bacteriën. De EU-norm voor de industriële verwerking van schelpdieren is 90 °C gedurende 90 seconden in het vlees; de Europese voedselveiligheidsautoriteit EFSA heeft daar [een advies over gegeven](' + SRC.efsaBivalves + '). Rauwe oesters zijn nooit helemaal zonder risico. Koop ze alleen bij een erkende leverancier en serveer ze niet aan kwetsbare gasten.'
        ],
        [
          'Kwetsbare gasten',
          'Voor zwangeren, ouderen, jonge kinderen en mensen met een verminderde weerstand geldt: geen rauwe of halfgare vis, schaal- en schelpdieren, geen rosé gevogelte of lever, en geen rauw vlees. Gaar gevogelte voor hen tot 74 °C kern, of houd je strikt aan de tijden in de tabel.'
        ],
        [
          'Goed meten',
          'Prik de kernthermometer in het dikste deel, niet tegen een bot. Controleer hem regelmatig in ijswater: dat moet 0 °C aangeven. Maak hem schoon tussen rauw en gaar. En schrijf de temperaturen op: zo kun je laten zien dat je werkt volgens je HACCP-plan.'
        ],
        [
          'Bronnen',
          'De waarden in dit artikel komen uit:',
          [
            '[USDA FSIS: safe minimum internal temperature chart](' + SRC.fsisChart + ')',
            '[USDA FSIS: cooking guideline met tijd-temperatuurtabellen voor gevogelte](' + SRC.fsisPoultry + ')',
            'Food Standards Agency (VK, 2010): advies kippenlever 70 °C gedurende 2 minuten',
            '[EU-verordening 1276/2011 over parasieten in visproducten](' + SRC.eu1276 + ')',
            '[EFSA over de verhitting van schelpdieren](' + SRC.efsaBivalves + ')',
            '[Hygiënecode voor de horeca (KHN)](' + SRC.khn + ')'
          ]
        ]
      ],
      outro: 'In Savour zet je de kerntemperatuur bij de stap waar hij hoort, zodat iedereen in je brigade hem ziet, ook in de kookmodus. Dit artikel is een hulpmiddel; je eigen HACCP-plan en de actuele Hygiënecode gaan altijd voor.'
    },
    en: {
      slug: 'en/blog/core-temperatures-meat-fish-shellfish',
      title: 'Core temperatures for meat, poultry, fish and shellfish',
      desc: 'Core temperatures for professional kitchens: chicken, pork, beef, lamb, game, fish and shellfish. Why chicken doesn’t need 75 °C, with time-temperature tables and sources.',
      h1: 'Core temperatures for meat, poultry, fish and shellfish',
      lead: 'Chicken doesn’t need to reach 75 °C and pork tenderloin can be pink. What counts is temperature and time. An overview for professional kitchens, with sources.',
      sections: [
        [
          'Temperature and time belong together',
          'Bacteria don’t die at one magic temperature. The hotter, the faster. Salmonella in chicken is destroyed within seconds at a core of 74 °C; at 60 °C it takes about half an hour. Just as safe, but much juicier at 60 °C.\n\nThat is why the tables below always say two things: which core temperature, and how long the core has to stay there. The thicker the piece, the longer it takes to get the core there.'
        ],
        [
          'What the hygiene code says',
          'The Dutch hospitality hygiene code (Hygiënecode voor de horeca) starts from a core temperature of at least 75 °C when cooking. Hot holding is above 60 °C and cooling down to 7 °C or colder within 5 hours. Your local rules may differ. If you work lower, such as with pink duck, sous-vide chicken or barely cooked salmon, record in your HACCP plan which time and temperature you use, measure with a calibrated probe and log it.'
        ],
        [
          'Poultry: chicken, turkey and guinea fowl',
          'The US food safety service (USDA FSIS) calculated how long chicken must stay at each core temperature to reduce Salmonella ten million times. Fattier pieces, like thighs with skin, need a little longer. So does turkey.',
          {
            head: ['Core temperature', 'Lean chicken (2% fat)', 'Fattier chicken (12% fat)'],
            rows: [
              ['60.0 °C / 140 °F', '26 minutes', '35 minutes'],
              ['62.8 °C / 145 °F', '9 minutes', '13 minutes'],
              ['65.6 °C / 150 °F', '3 minutes', '4 minutes'],
              ['68.3 °C / 155 °F', '45 seconds', '54 seconds'],
              ['71.1 °C / 160 °F', '14 seconds', '17 seconds'],
              ['73.9 °C / 165 °F', 'instant', 'instant']
            ],
            note: 'Source: USDA FSIS time-temperature tables for poultry (7-log reduction of Salmonella). Time counts from the moment the core reaches the temperature.'
          }
        ],
        [
          'Chicken in practice',
          'A chicken breast brought to a core of 63 to 65 °C and rested a few minutes at that temperature is safe and stays juicy. In a pan or oven that resting time is hard to guarantee; there you take the breast out at 66 to 68 °C, or keep it warm under cover. Sous vide holds the time precisely.\n\nThighs and legs are often taken higher, to 70 to 80 °C. Not for safety, but because the connective tissue softens.'
        ],
        [
          'Chicken livers and offal',
          'Chicken livers can carry Campylobacter inside, even when the outside is well browned. After outbreaks linked to pink chicken liver parfait, the UK Food Standards Agency advises a core temperature of 70 °C for 2 minutes. Equivalent are 65 °C for 10 minutes or 75 °C for 30 seconds. A pink chicken liver is not a good idea; a parfait that reaches 65 °C in a bain-marie and stays there for 10 minutes is.'
        ],
        [
          'Pork',
          'Pork no longer needs to be grey. In 2011 the USDA lowered the standard for whole cuts from 71 °C to 63 °C with a 3-minute rest. In the EU, slaughter pigs are also tested for trichinella. In a whole muscle, bacteria sit mainly on the outside, and searing makes that more than hot enough.',
          {
            head: ['Product', 'Core', 'Result'],
            rows: [
              ['Pork tenderloin', '60–62 °C', 'Pink and juicy'],
              ['Chop, loin', '62–63 °C', 'Slightly pink, 3-minute rest'],
              ['Mince, sausage, burger', '71 °C', 'Cooked through: bacteria are spread through the product'],
              ['Shoulder, belly, cheek (braised)', '85–95 °C', 'Tender and pulled; the temperature is for texture']
            ]
          }
        ],
        [
          'Beef, veal and lamb',
          'In a whole piece of beef, veal or lamb the inside is practically sterile. That is why an entrecôte can be served rare. Choose the core temperature for taste and texture. Take large roasts out 2 to 5 °C early: the core keeps rising while resting.',
          {
            head: ['Doneness', 'Core', 'What it looks like'],
            rows: [
              ['Rare', '50–52 °C', 'Red and juicy'],
              ['Medium-rare', '54–56 °C', 'Pink, fat just softened'],
              ['Medium', '58–60 °C', 'Light pink'],
              ['Well done', '68 °C and up', 'Grey, firm'],
              ['Mince, burger', '71 °C', 'Always through: bacteria are mixed into the meat']
            ]
          }
        ],
        [
          'Tartare and carpaccio',
          'Raw beef is only safe when the meat is fresh, comes from a reliable supplier, stays cold and is cut or chopped just before serving. The risk is never zero. Don’t serve it to pregnant women, young children, older people or anyone with weakened immunity.'
        ],
        [
          'Game, duck and goose',
          'Treat venison and hare like beef: pink is fine. Wild boar can carry trichinella. Only serve it pink if it has been officially tested for trichinella; otherwise cook it to at least 71 °C.\n\nDuck and goose breast are served pink in kitchens, at 54 to 58 °C. To back that up safely, use the poultry times in the table above, or cook the breast sous vide (see [Sous vide: temperatures and times](/en/blog/sous-vide-temperatures-and-times)). Legs are confited at 80 °C or higher.'
        ],
        [
          'Fish',
          'With fish you choose the core temperature mainly for texture. A few degrees too hot and fish dries out.',
          {
            head: ['Fish', 'Core', 'Result'],
            rows: [
              ['Salmon, trout', '45–50 °C', 'Mi-cuit: translucent, buttery'],
              ['Cod, haddock, halibut', '50–54 °C', 'Just flakes'],
              ['Turbot, sole, sea bass', '50–55 °C', 'Firm and juicy'],
              ['Tuna', '40–45 °C (raw centre)', 'Seared briefly'],
              ['Fully cooked (FSIS)', '63 °C', 'Opaque, falls apart']
            ]
          }
        ],
        [
          'Parasites: when fish must be frozen first',
          'Fish eaten raw or almost raw can carry the Anisakis parasite. Think sushi, ceviche, tartare, marinated or cold-smoked fish, and also mi-cuit salmon at 45 °C. Under EU Regulation 853/2004 (amended by [1276/2011](' + SRC.eu1276 + ')) such fish must be frozen first: at least 24 hours at −20 °C or colder, or 15 hours at −35 °C. Heating to a core of 60 °C for at least 1 minute also kills the parasites. Farmed fish can be exempt; ask your supplier for the statement.'
        ],
        [
          'Shellfish',
          'Crustaceans are cooked for texture. Bivalves need more care.',
          {
            head: ['Product', 'Core', 'Result'],
            rows: [
              ['Lobster', '55–60 °C', 'Juicy, just opaque'],
              ['Langoustine', '50–55 °C', 'Translucent and sweet'],
              ['Prawns, shrimp', '55–60 °C', 'Opaque and firm'],
              ['Scallop', '45–50 °C', 'Translucent centre'],
              ['Mussels, cockles', 'Until open, then a little longer', 'Discard any that stay closed']
            ]
          }
        ],
        [
          'Viruses in bivalves',
          'Mussels, oysters and cockles can carry norovirus and hepatitis A. These viruses withstand more heat than bacteria. The EU standard for industrial heat treatment of bivalves is 90 °C for 90 seconds in the flesh; the European Food Safety Authority EFSA [has advised on it](' + SRC.efsaBivalves + '). Raw oysters are never entirely without risk. Buy them only from an approved supplier and don’t serve them to vulnerable guests.'
        ],
        [
          'Vulnerable guests',
          'For pregnant women, older people, young children and anyone with weakened immunity: no raw or barely cooked fish or shellfish, no pink poultry or liver, and no raw meat. Cook poultry for them to a 74 °C core, or follow the times in the table strictly.'
        ],
        [
          'Measuring properly',
          'Insert the probe into the thickest part, not against a bone. Check it regularly in iced water: it should read 0 °C. Clean it between raw and cooked. And write the temperatures down: that shows you work to your HACCP plan.'
        ],
        [
          'Sources',
          'The values in this article come from:',
          [
            '[USDA FSIS: safe minimum internal temperature chart](' + SRC.fsisChart + ')',
            '[USDA FSIS: cooking guideline with time-temperature tables for poultry](' + SRC.fsisPoultry + ')',
            'Food Standards Agency (UK, 2010): chicken liver advice, 70 °C for 2 minutes',
            '[EU Regulation 1276/2011 on parasites in fishery products](' + SRC.eu1276 + ')',
            '[EFSA on heat treatment of bivalve molluscs](' + SRC.efsaBivalves + ')',
            '[Dutch hospitality hygiene code (KHN)](' + SRC.khn + ')'
          ]
        ]
      ],
      outro: 'In Savour you put the core temperature on the step where it belongs, so everyone in your brigade sees it, in cook mode too. This article is a guide; your own HACCP plan and local food safety rules always come first.'
    }
  },
  {
    id: 'sous-vide',
    date: '2026-11-02',
    nl: {
      slug: 'blog/sous-vide-temperaturen-en-tijden',
      title: 'Sous-vide: temperaturen en tijden per product',
      desc: 'Sous-vide-tabel voor de professionele keuken: temperaturen en tijden voor rund, kalf, lam, varken, kip, eend, vis, schaaldieren, eieren en groente, met veiligheid, koelen en bewaren.',
      h1: 'Sous-vide: temperaturen en tijden',
      lead: 'Een naslag voor de keuken: per product de badtemperatuur, de tijd en wat je krijgt. Met de regels voor veilig koelen en bewaren.',
      sections: [
        [
          'Hoe sous-vide werkt',
          'Bij sous-vide is de temperatuur van het waterbad de eindtemperatuur van het product. Een kipfilet in een bad van 63 °C wordt nooit heter dan 63 °C. De tijd bestaat uit drie delen: tot de kern op temperatuur is (dat hangt af van de dikte), lang genoeg om te pasteuriseren, en bij taaie stukken lang genoeg om het bindweefsel zacht te maken.'
        ],
        [
          'Veilig werken',
          'De belangrijkste regels:',
          [
            'Niet langer dan 4 uur onder 54,5 °C. Daaronder kunnen bacteriën groeien. Mi-cuit vis en saignant vlees serveer je dus direct.',
            'Wil je pasteuriseren, houd dan minstens de tijden in de tabel hieronder aan, gerekend vanaf een product uit de koeling.',
            'Vis die je onder 60 °C gaart, moet eerst zijn ingevroren tegen parasieten (zie [Kerntemperaturen](/blog/kerntemperaturen-vlees-vis-schaaldieren)).',
            'Werk met verse, koude producten en schone zakken, en leg alles vast in je HACCP-plan.'
          ]
        ],
        [
          'Pasteurisatietijden naar dikte',
          'Hoelang een product in het bad moet om te pasteuriseren, hangt af van de dikte en de temperatuur. Een selectie uit de tabellen van Douglas Baldwin, gerekend vanaf 5 °C:',
          {
            head: ['Product en dikte', '55 °C', '60 °C', '63 °C'],
            rows: [
              ['Rund, varken, lam · 20 mm', '2½ uur', '1¼ uur', '55 min'],
              ['Rund, varken, lam · 50 mm', '4½ uur', '2½ uur', '2¼ uur'],
              ['Kip · 20 mm', '–', '1¼ uur', '50 min'],
              ['Kip · 50 mm', '–', '3¼ uur', '2½ uur'],
              ['Magere vis · 20 mm', '3 uur', '1 uur', '–'],
              ['Vette vis · 20 mm', '4¾ uur', '1¼ uur', '–']
            ],
            note: 'Bron: Douglas Baldwin, A Practical Guide to Sous Vide Cooking. Kip begint in zijn tabel bij 57 °C (20 mm: 2¾ uur), vis loopt tot 60 °C.'
          }
        ],
        [
          'Rund en kalf',
          'Malse stukken gaar je op garing, taaie stukken lang op een lagere temperatuur zodat ze toch roze blijven.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Ossenhaas, entrecote, rib-eye (3–4 cm)', '55 °C', '1½–3 uur', 'Rosé; binnen 4 uur serveren of de pasteurisatietijd aanhouden'],
              ['Idem, à point', '60 °C', '1½–3 uur', 'Lichtroze'],
              ['Bavette, flank, picanha', '55 °C', '6–12 uur', 'Rosé en malser'],
              ['Sukade, klapstuk, runderschouder', '55 °C', '24–48 uur', 'Rosé en mals als een biefstuk'],
              ['Brisket (rosé)', '57 °C', '36–48 uur', 'Stevig, rosé'],
              ['Brisket (draadjes)', '80 °C', '24–36 uur', 'Valt uit elkaar'],
              ['Kalfshaas, kalfsfricandeau', '57–58 °C', '2–4 uur', 'Lichtroze, sappig']
            ]
          }
        ],
        [
          'Lam',
          'Lam gaar je net als rund; bij de schouder geldt dezelfde aanpak als bij varkensschouder.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Lamsrack, lamsfilet', '55–57 °C', '1–2 uur', 'Rosé'],
              ['Lamsbout (rosé)', '57 °C', '8–24 uur', 'Rosé en mals'],
              ['Lamsschouder', '68 °C', '24 uur', 'Mals, nog in plakken te snijden'],
              ['Lamsschouder (draadjes)', '80 °C', '8–12 uur', 'Valt uit elkaar']
            ]
          }
        ],
        [
          'Varken',
          'Varkensvlees mag rosé; de schouder en buik worden pas echt goed bij een hogere temperatuur.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Varkenshaas', '60 °C', '1½–3 uur', 'Rosé en sappig'],
              ['Kotelet, karbonade', '61 °C', 'Pasteurisatietijd (20 mm: 1 uur)', 'Licht rosé'],
              ['Kotelet, lang gegaard', '55 °C', '12 uur', 'Mals, rosé'],
              ['Varkensschouder', '68 °C', '24 uur', 'Mals, in plakken'],
              ['Varkensschouder (pulled)', '80 °C', '8–12 uur', 'Valt uit elkaar'],
              ['Spareribs', '68 °C of 80 °C', '24 uur of 8–12 uur', 'Van stevig tot van het bot'],
              ['Buik', '68–80 °C', '12–24 uur', 'Daarna knapperig bakken']
            ]
          }
        ],
        [
          'Gevogelte',
          'Gevogelte gaar je op een temperatuur waarbij het ook gepasteuriseerd wordt; de tijd hangt af van de dikte.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Kipfilet', '63,5 °C', '1½–3 uur (dikte)', 'Sappig, net gaar'],
              ['Kalkoenfilet', '63,5 °C', '3–5 uur', 'Sappig'],
              ['Kippendij', '65 °C', '1½–3 uur', 'Mals, nog stevig'],
              ['Eendenborst', '57 °C', '3–4 uur', 'Rosé; gepasteuriseerd volgens de tabel'],
              ['Eendenbout, ganzenbout, kalkoenbout (confit)', '80 °C', '8–12 uur', 'Valt van het bot']
            ]
          }
        ],
        [
          'Vis en schaaldieren',
          'Vis is snel klaar. Onder 60 °C pasteuriseer je niet: gebruik vis die is ingevroren en serveer direct.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Zalm, mi-cuit', '42–50 °C', '15–20 minuten', 'Glazig tot boterzacht'],
              ['Zalm, gaar', '60 °C', 'Pasteurisatietijd (20 mm: 1¼ uur)', 'Stevig, ondoorzichtig'],
              ['Kabeljauw, schelvis, heilbot', '55–60 °C', '30–60 minuten', 'Lost in lamellen'],
              ['Kreeft (staart, gepeld)', '55 °C', '20–30 minuten', 'Sappig en zoet'],
              ['Gamba’s', '55–60 °C', '15–25 minuten', 'Stevig'],
              ['Octopus', '77–82 °C', '4–6 uur', 'Mals, daarna grillen']
            ]
          }
        ],
        [
          'Eieren',
          'Eieren gaar je in de schaal, zonder zak.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Gepasteuriseerd ei', '57 °C', 'minstens 75 minuten', 'Nog rauw, maar veilig voor mayonaise of tartaar'],
              ['Zacht ei', '63 °C', '45–60 minuten', 'Vloeibare dooier, eiwit net gestold'],
              ['“Perfect egg”', '64,5 °C', '45–60 minuten', 'Dooier als dikke room']
            ]
          }
        ],
        [
          'Groente en fruit',
          'Groente heeft veel meer warmte nodig dan vlees: pectine breekt pas af rond 84 °C. Gaar groente daarom apart. De tijden zijn richtwaarden; ze hangen af van de dikte en de rijpheid.',
          {
            head: ['Product', 'Bad', 'Tijd', 'Resultaat'],
            rows: [
              ['Wortel, pastinaak, knolselderij', '85 °C', '45–60 minuten', 'Gaar met beet, vol van smaak'],
              ['Biet', '85 °C', '1½–2 uur', 'Zacht'],
              ['Krieltjes', '85 °C', '60–90 minuten', 'Romig'],
              ['Asperges (middeldik)', '85 °C', '12–15 minuten', 'Beetgaar; dunne: 6–8 minuten'],
              ['Venkel', '85 °C', '45–60 minuten', 'Zacht en zoet'],
              ['Peer, appel', '80–85 °C', '20–40 minuten', 'Gepocheerd, vorm blijft']
            ]
          }
        ],
        [
          'Koelen en bewaren',
          'Ga je vooruit werken (cook-chill), koel de zakken dan direct na het garen in ijswater met minstens de helft ijs. Een plak van 25 mm is in ongeveer 50 minuten koud, een van 50 mm in ongeveer 2¾ uur. De Hygiënecode vraagt terugkoelen naar 7 °C of kouder binnen 5 uur. Alleen gepasteuriseerde producten bewaar je vooruit; leg de bewaartermijn vast in je HACCP-plan en zet de datum op de zak.'
        ],
        [
          'In de praktijk',
          'Dep het product na het bad droog en bak het kort en heet voor een korstje. Kruiden en boter in de zak geven veel smaak; rauwe knoflook kan bij lage temperaturen scherp worden, gebruik liever gekonfijte. Zet de badtemperatuur en de tijd in je recept, zodat iedereen in de brigade het precies zo doet.'
        ],
        [
          'Bronnen',
          'De waarden in dit artikel komen uit:',
          [
            '[Douglas Baldwin: A Practical Guide to Sous Vide Cooking](' + SRC.baldwin + ')',
            '[USDA FSIS: tijd-temperatuurtabellen voor gevogelte](' + SRC.fsisPoultry + ')',
            '[Hygiënecode voor de horeca (KHN)](' + SRC.khn + ')',
            'Groente: gangbare praktijkwaarden rond 84–85 °C, het punt waarop pectine afbreekt'
          ]
        ]
      ],
      outro: 'Zet badtemperatuur en tijd bij de stap in je recept in Savour; met omrekenen blijft de tijd gelijk, want die hangt af van de dikte en niet van de hoeveelheid. Dit artikel is een hulpmiddel; je eigen HACCP-plan gaat altijd voor.'
    },
    en: {
      slug: 'en/blog/sous-vide-temperatures-and-times',
      title: 'Sous vide: temperatures and times per product',
      desc: 'Sous vide chart for professional kitchens: temperatures and times for beef, veal, lamb, pork, chicken, duck, fish, shellfish, eggs and vegetables, with safety, cooling and storage.',
      h1: 'Sous vide: temperatures and times',
      lead: 'A kitchen reference: the bath temperature, the time and the result for each product. With the rules for cooling and storing safely.',
      sections: [
        [
          'How sous vide works',
          'With sous vide, the water bath temperature is the final temperature of the product. A chicken breast in a 63 °C bath never gets hotter than 63 °C. The time has three parts: until the core is up to temperature (which depends on thickness), long enough to pasteurise, and for tough cuts long enough to soften the connective tissue.'
        ],
        [
          'Working safely',
          'The key rules:',
          [
            'No longer than 4 hours below 54.5 °C. Bacteria can grow below that. Serve mi-cuit fish and rare meat straight away.',
            'To pasteurise, keep at least to the times in the table below, starting from a product out of the fridge.',
            'Fish cooked below 60 °C must be frozen first against parasites (see [Core temperatures](/en/blog/core-temperatures-meat-fish-shellfish)).',
            'Work with fresh, cold products and clean bags, and record everything in your HACCP plan.'
          ]
        ],
        [
          'Pasteurisation times by thickness',
          'How long a product needs in the bath to pasteurise depends on thickness and temperature. A selection from Douglas Baldwin’s tables, starting at 5 °C:',
          {
            head: ['Product and thickness', '55 °C', '60 °C', '63 °C'],
            rows: [
              ['Beef, pork, lamb · 20 mm', '2½ hours', '1¼ hours', '55 min'],
              ['Beef, pork, lamb · 50 mm', '4½ hours', '2½ hours', '2¼ hours'],
              ['Chicken · 20 mm', '–', '1¼ hours', '50 min'],
              ['Chicken · 50 mm', '–', '3¼ hours', '2½ hours'],
              ['Lean fish · 20 mm', '3 hours', '1 hour', '–'],
              ['Fatty fish · 20 mm', '4¾ hours', '1¼ hours', '–']
            ],
            note: 'Source: Douglas Baldwin, A Practical Guide to Sous Vide Cooking. His chicken table starts at 57 °C (20 mm: 2¾ hours); fish goes up to 60 °C.'
          }
        ],
        [
          'Beef and veal',
          'Tender cuts are cooked to doneness, tough cuts long at a lower temperature so they stay pink.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Tenderloin, sirloin, rib-eye (3–4 cm)', '55 °C', '1½–3 hours', 'Medium-rare; serve within 4 hours or use the pasteurisation time'],
              ['Same, medium', '60 °C', '1½–3 hours', 'Light pink'],
              ['Bavette, flank, picanha', '55 °C', '6–12 hours', 'Pink and more tender'],
              ['Chuck, top blade, shoulder', '55 °C', '24–48 hours', 'Pink and tender like a steak'],
              ['Brisket (pink)', '57 °C', '36–48 hours', 'Firm, pink'],
              ['Brisket (pulled)', '80 °C', '24–36 hours', 'Falls apart'],
              ['Veal tenderloin, veal topside', '57–58 °C', '2–4 hours', 'Light pink, juicy']
            ]
          }
        ],
        [
          'Lamb',
          'Cook lamb like beef; for the shoulder use the same approach as pork shoulder.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Rack, loin', '55–57 °C', '1–2 hours', 'Pink'],
              ['Leg (pink)', '57 °C', '8–24 hours', 'Pink and tender'],
              ['Shoulder', '68 °C', '24 hours', 'Tender, still sliceable'],
              ['Shoulder (pulled)', '80 °C', '8–12 hours', 'Falls apart']
            ]
          }
        ],
        [
          'Pork',
          'Pork can be pink; shoulder and belly are at their best at a higher temperature.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Tenderloin', '60 °C', '1½–3 hours', 'Pink and juicy'],
              ['Chop', '61 °C', 'Pasteurisation time (20 mm: 1 hour)', 'Slightly pink'],
              ['Chop, slow cooked', '55 °C', '12 hours', 'Tender, pink'],
              ['Shoulder', '68 °C', '24 hours', 'Tender, sliceable'],
              ['Shoulder (pulled)', '80 °C', '8–12 hours', 'Falls apart'],
              ['Spare ribs', '68 °C or 80 °C', '24 hours or 8–12 hours', 'From firm to off the bone'],
              ['Belly', '68–80 °C', '12–24 hours', 'Then crisp in a pan']
            ]
          }
        ],
        [
          'Poultry',
          'Cook poultry at a temperature at which it is also pasteurised; the time depends on thickness.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Chicken breast', '63.5 °C', '1½–3 hours (thickness)', 'Juicy, just cooked'],
              ['Turkey breast', '63.5 °C', '3–5 hours', 'Juicy'],
              ['Chicken thigh', '65 °C', '1½–3 hours', 'Tender, still firm'],
              ['Duck breast', '57 °C', '3–4 hours', 'Pink; pasteurised per the table'],
              ['Duck, goose or turkey leg (confit)', '80 °C', '8–12 hours', 'Falls off the bone']
            ]
          }
        ],
        [
          'Fish and shellfish',
          'Fish is quick. Below 60 °C you don’t pasteurise: use fish that has been frozen and serve straight away.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Salmon, mi-cuit', '42–50 °C', '15–20 minutes', 'Translucent to buttery'],
              ['Salmon, cooked', '60 °C', 'Pasteurisation time (20 mm: 1¼ hours)', 'Firm, opaque'],
              ['Cod, haddock, halibut', '55–60 °C', '30–60 minutes', 'Flakes'],
              ['Lobster (tail, shelled)', '55 °C', '20–30 minutes', 'Juicy and sweet'],
              ['Prawns', '55–60 °C', '15–25 minutes', 'Firm'],
              ['Octopus', '77–82 °C', '4–6 hours', 'Tender, then grill']
            ]
          }
        ],
        [
          'Eggs',
          'Eggs are cooked in the shell, without a bag.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Pasteurised egg', '57 °C', 'at least 75 minutes', 'Still raw, but safe for mayonnaise or tartare'],
              ['Soft egg', '63 °C', '45–60 minutes', 'Runny yolk, white just set'],
              ['“Perfect egg”', '64.5 °C', '45–60 minutes', 'Yolk like thick cream']
            ]
          }
        ],
        [
          'Vegetables and fruit',
          'Vegetables need much more heat than meat: pectin only breaks down around 84 °C. So cook vegetables separately. The times are guidelines; they depend on thickness and ripeness.',
          {
            head: ['Product', 'Bath', 'Time', 'Result'],
            rows: [
              ['Carrot, parsnip, celeriac', '85 °C', '45–60 minutes', 'Tender with bite, full of flavour'],
              ['Beetroot', '85 °C', '1½–2 hours', 'Soft'],
              ['New potatoes', '85 °C', '60–90 minutes', 'Creamy'],
              ['Asparagus (medium)', '85 °C', '12–15 minutes', 'Al dente; thin: 6–8 minutes'],
              ['Fennel', '85 °C', '45–60 minutes', 'Soft and sweet'],
              ['Pear, apple', '80–85 °C', '20–40 minutes', 'Poached, keeps its shape']
            ]
          }
        ],
        [
          'Cooling and storing',
          'When working ahead (cook-chill), chill the bags straight after cooking in iced water that is at least half ice. A 25 mm slab is cold in about 50 minutes, a 50 mm one in about 2¾ hours. The Dutch hygiene code asks for cooling to 7 °C or colder within 5 hours; follow your local rules. Only store pasteurised products ahead; record the shelf life in your HACCP plan and date the bag.'
        ],
        [
          'In practice',
          'Pat the product dry after the bath and sear it briefly and hot for a crust. Herbs and butter in the bag add a lot of flavour; raw garlic can turn harsh at low temperatures, so use confit garlic. Put the bath temperature and time in your recipe so everyone in the brigade does it exactly the same way.'
        ],
        [
          'Sources',
          'The values in this article come from:',
          [
            '[Douglas Baldwin: A Practical Guide to Sous Vide Cooking](' + SRC.baldwin + ')',
            '[USDA FSIS: time-temperature tables for poultry](' + SRC.fsisPoultry + ')',
            '[Dutch hospitality hygiene code (KHN)](' + SRC.khn + ')',
            'Vegetables: common kitchen values around 84–85 °C, where pectin breaks down'
          ]
        ]
      ],
      outro: 'Put the bath temperature and time on the step in your Savour recipe; when scaling, the time stays the same because it depends on thickness, not quantity. This article is a guide; your own HACCP plan always comes first.'
    }
  }
];
