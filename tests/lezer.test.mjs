// Test van de eigen receptlezer (js/features/recipe-reader.js), zonder browser.
// Draaien: node tests/lezer.test.mjs
// Elk geval legt precies vast wat er uit een stuk tekst moet komen. Faalt er één, dan toont de test wat
// er wél uitkwam. Nieuw lastig recept tegengekomen? Voeg het hier toe vóór je de lezer aanpast.
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/features/recipe-reader.js', import.meta.url), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(source, ctx);
const { splitRecipeText } = ctx;

// t = titel, y = opbrengst, i = ingrediënten (exact), s = bereiding (exact of aantal), c = zekerheid
const cases = [
  {
    name: 'Kopjes Ingrediënten/Bereiding met opbrengst',
    text: `Beurre blanc
Voor 4 personen
Ingrediënten
2 sjalotten, fijngesnipperd
1 dl droge witte wijn
5 el witte wijnazijn
250 g koude roomboter, in blokjes
zout naar smaak
Bereiding
Breng sjalot, wijn en azijn aan de kook en laat inkoken tot 2 eetlepels.
Klop de boter blokje voor blokje erdoor.
Passeer en breng op smaak.`,
    expect: [
      {
        t: 'Beurre blanc',
        y: 'Voor 4 personen',
        i: [
          '2 sjalotten, fijngesnipperd',
          '1 dl droge witte wijn',
          '5 el witte wijnazijn',
          '250 g koude roomboter, in blokjes',
          'zout naar smaak'
        ],
        s: 3,
        c: 'high'
      }
    ]
  },
  {
    name: 'Kopjes met dubbele punt en hoofdletters',
    text: `CITROENSORBET
Opbrengst: 1 liter
INGREDIËNTEN:
500 ml water
300 g suiker
250 ml citroensap
BEREIDINGSWIJZE:
Kook water en suiker tot siroop.
Voeg citroensap toe en laat afkoelen.
Draai in de ijsmachine.`,
    expect: [
      { t: 'CITROENSORBET', y: '1 liter', i: ['500 ml water', '300 g suiker', '250 ml citroensap'], s: 3, c: 'high' }
    ]
  },
  {
    name: 'Engelse kopjes',
    text: `Hollandaise
Serves 6
Ingredients
3 egg yolks
200 g clarified butter
Method
Whisk the yolks au bain-marie.
Slowly add the butter.`,
    expect: [{ t: 'Hollandaise', y: '6', i: ['3 egg yolks', '200 g clarified butter'], s: 2 }]
  },
  {
    name: 'Opsommingstekens en genummerde stappen',
    text: `Kalfsjus
Ingrediënten
- 2 kg kalfsbotten
• 1 ui
* 2 wortels
- 2 l kalfsfond
Bereiding
1. Rooster de botten goudbruin.
2. Voeg groenten en fond toe en trek 6 uur.
3) Zeef en reduceer tot jus.`,
    expect: [
      {
        t: 'Kalfsjus',
        i: ['2 kg kalfsbotten', '1 ui', '2 wortels', '2 l kalfsfond'],
        s: ['Rooster de botten goudbruin.', 'Voeg groenten en fond toe en trek 6 uur.', 'Zeef en reduceer tot jus.']
      }
    ]
  },
  {
    name: 'Stap-nummering "Stap 1:"',
    text: `Pommes Anna
Ingrediënten
1 kg vastkokende aardappel
150 g geklaarde boter
Bereiding
Stap 1: Schaaf de aardappels dun.
Stap 2: Leg dakpansgewijs in de pan met boter.`,
    expect: [{ t: 'Pommes Anna', s: ['Schaaf de aardappels dun.', 'Leg dakpansgewijs in de pan met boter.'] }]
  },
  {
    name: 'Zonder kopjes: korte regels en zinnen',
    text: `Gepofte sjalotten
8 sjalotten
olijfolie
zout
Pof de sjalotten 40 minuten op 180 graden.`,
    expect: [{ t: 'Gepofte sjalotten', i: ['8 sjalotten', 'olijfolie', 'zout'], s: 1, c: 'high' }]
  },
  {
    name: 'Receptenboek: genummerde namen zonder spatie en zonder witregels',
    text: `2.Aardappel crème
200 gram bintjes
2 deciliter room
1 takje tijm
aardappels koken, room met kruiden trekken, doorwrijven
135.Aardappel mousseline
1000 gram droge aardappelpuree
100 gram melk
488.Algenpoeder crumble.
1 kilo panko
100 gram algenpoeder
Panko frituren in olie.
598.Roseval gepoft
Was de Roseval en dep deze droog.`,
    expect: [
      // Stap zonder punt, herkend aan het keukenwerkwoord ("koken", "trekken").
      {
        t: 'Aardappel crème',
        i: ['200 gram bintjes', '2 deciliter room', '1 takje tijm'],
        s: ['aardappels koken, room met kruiden trekken, doorwrijven'],
        c: 'high'
      },
      { t: 'Aardappel mousseline', i: ['1000 gram droge aardappelpuree', '100 gram melk'], s: 0, c: 'high' },
      { t: 'Algenpoeder crumble', i: ['1 kilo panko', '100 gram algenpoeder'], s: 1, c: 'high' },
      // Alleen bereiding, in duidelijke zinnen: zeker.
      { t: 'Roseval gepoft', i: [], s: 1, c: 'high' }
    ]
  },
  // "#b " = vette regel of Word-kop 2/3 (zie htmlToRecipeText in import.js).
  {
    name: 'Echt bestand: vette onderdeelkopjes binnen Ingrediënten zijn geen nieuwe recepten',
    text: `#b Beurre blanc saus Maurick
Ingrediënten:
#b Deel 1
- 60 l witte wijn
- 10 kg witte uien
#b Deel 2
- 30 L room
#b Deel 3
- 15 kg boter
- Zout naar smaak
Bereidingswijze
Kook deel 1 geheel samen in tot 15 liter over is. Voeg dan deel 2 toe.`,
    expect: [
      {
        t: 'Beurre blanc saus Maurick',
        i: [
          'Deel 1:',
          '60 l witte wijn',
          '10 kg witte uien',
          'Deel 2:',
          '30 L room',
          'Deel 3:',
          '15 kg boter',
          'Zout naar smaak'
        ],
        s: 1,
        c: 'high'
      }
    ]
  },
  {
    name: 'Echt bestand: vette onderdeelkopjes in ingrediënten én bereiding',
    text: `#b Rode curry mouse
Ingrediënten:
#b Boemboe
- 1 st rode peper
- 2 l kokos room
#b Mouse
- 1600 gr curry massa
- 20 bl gelatine
Bereidingswijze
#b Boemboe
Doe alles van de boemboe in de thermo blender.
#b Mouse
Leg de gelatine in koud water.`,
    expect: [
      {
        t: 'Rode curry mouse',
        i: ['Boemboe:', '1 st rode peper', '2 l kokos room', 'Mouse:', '1600 gr curry massa', '20 bl gelatine'],
        s: ['Boemboe:', 'Doe alles van de boemboe in de thermo blender.', 'Mouse:', 'Leg de gelatine in koud water.'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Echt bestand: ingrediënt per ongeluk als Word-kop',
    text: `# Pecan roomijs
1000 gram melk
200 gram suiker
# 380 gram pecannoten
De suiker karamelliseren, de pecannoten er bij afblussen met melk.`,
    expect: [{ t: 'Pecan roomijs', i: ['1000 gram melk', '200 gram suiker', '380 gram pecannoten'], s: 1, c: 'high' }]
  },
  {
    name: 'Echt bestand: korte stappen zonder punt',
    text: `10.Amandel biscuit
1000 gram ei heel
1375 gram amandel poeder
Bakken op 240C
368.Ananas limoen jus
1000 gram ananas coulis
2,5 gram xantana
Alles opkoken en afbinden met xantana`,
    expect: [
      { t: 'Amandel biscuit', i: ['1000 gram ei heel', '1375 gram amandel poeder'], s: ['Bakken op 240C'], c: 'high' },
      { t: 'Ananas limoen jus', i: ['1000 gram ananas coulis', '2,5 gram xantana'], s: 1, c: 'high' }
    ]
  },
  {
    name: 'Echt bestand: bereiding tussen de ingrediënten (zin met punt)',
    text: `20.Banketbakkers room
1000 gram melk
220 gram suiker
Dit opkoken.
160 gram eidooier
25 gram zetmeel
Mengen met de melk en afroeren.`,
    expect: [
      {
        t: 'Banketbakkers room',
        i: ['1000 gram melk', '220 gram suiker', '160 gram eidooier', '25 gram zetmeel'],
        s: ['Dit opkoken.', 'Mengen met de melk en afroeren.'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Bereiding tussen de ingrediënten zonder punt, met keukenwerkwoord',
    text: `50.Wasabi ijs
250 gram yoghurt
60 gram wasabi
Mengen en koud zetten
400 gram room
Bij elkaar en verwarmen`,
    expect: [
      {
        t: 'Wasabi ijs',
        i: ['250 gram yoghurt', '60 gram wasabi', '400 gram room'],
        s: ['Mengen en koud zetten', 'Bij elkaar en verwarmen'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Bereiding tussen de ingrediënten zonder werkwoord blijft twijfel',
    text: `Parfait
5 stuks eieren
350 gram suiker
Room lobbig, rest bij elkaar
500 gram slagroom`,
    expect: [{ t: 'Parfait', c: 'low' }]
  },
  {
    name: 'Echt bestand: recept van alleen zinnen is zeker',
    text: `279.Ananas konfijt
Batonettes snijden van ananas (1x1x8). Vacümeren met klein beetje geklaarde boter.
Een uur op 95C 100% in de oven, dan uit vacuüm en droog deppen.`,
    expect: [{ t: 'Ananas konfijt', i: [], s: 2, c: 'high' }]
  },
  {
    name: 'Echt bestand: werkwoord achteraan en "Recept is voor"',
    text: `228.Frambozensoep
1200 gram rode wijn
150 gram suiker
18 gram gelatine
Recept is voor 27 glazen (50 gram per glas)
267.Dadelcrème
250 gram dadels zonder pit
250 gram abrikozen coulis
Fijn draaien in de cutter en door een zeef`,
    expect: [
      {
        t: 'Frambozensoep',
        y: '27 glazen (50 gram per glas)',
        i: ['1200 gram rode wijn', '150 gram suiker', '18 gram gelatine'],
        s: 0,
        c: 'high'
      },
      {
        t: 'Dadelcrème',
        i: ['250 gram dadels zonder pit', '250 gram abrikozen coulis'],
        s: ['Fijn draaien in de cutter en door een zeef'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Echt bestand: ingrediënten per ongeluk onder Bereidingswijze is twijfel',
    text: `Albufeira saus
Ingrediënten:
- 2 L kip jus
Bereidingswijze
- 2 L JDV
- 2 fl witte port
- 4 kg ui
- 350 gr boter`,
    expect: [{ t: 'Albufeira saus', c: 'medium' }]
  },
  {
    name: 'Echt bestand: stap vóór het kopje Werkwijze is geen ingrediënt',
    text: `347.Doorhaalchocolade
2400 gram witte chocolade
1200 gram cacaoboter
Au bain-marie verwarmen tot max 40c
Werkwijze
Doorhaal chocolade er over gieten.`,
    expect: [
      {
        t: 'Doorhaalchocolade',
        i: ['2400 gram witte chocolade', '1200 gram cacaoboter'],
        s: ['Au bain-marie verwarmen tot max 40c', 'Doorhaal chocolade er over gieten.'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Echt bestand: stap die met een product begint ("Suiker koken tot 121c")',
    text: `218.IJzerkruid siroop
50 gram ijzerkruid
250 gram suiker
IJzer kruid en ijsklontjes in de blender.
Suiker koken tot 121c en draaiend er bij gieten`,
    expect: [
      {
        t: 'IJzerkruid siroop',
        i: ['50 gram ijzerkruid', '250 gram suiker'],
        s: ['IJzer kruid en ijsklontjes in de blender.', 'Suiker koken tot 121c en draaiend er bij gieten'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Echt bestand: lange bereidingszin die met een hoeveelheid begint',
    text: `Gember crumble
1000 gram bloem
600 gram zachte boter
100 verse gember in de blender met de suiker doordraaien. Vervolgens alles tot een crumble mixen met de hand`,
    expect: [
      {
        t: 'Gember crumble',
        i: ['1000 gram bloem', '600 gram zachte boter'],
        s: 1,
        c: 'high'
      }
    ]
  },
  {
    name: 'Rommelige omschrijving zonder hoeveelheden blijft twijfel',
    text: `Saus van oma
boter wijn en sjalot, ongeveer een halve liter, lekker bij vis en zo
alles samen even laten pruttelen tot het goed is`,
    expect: [{ t: 'Saus van oma', c: 'medium' }]
  },
  {
    name: 'Stap die met een tijdwoord begint is geen zeker ingrediënt',
    text: `Rode wijn jus
2000 gram rode wijn
500 gram kalfsfond
Wanneer ingekookt afmaken met
50 gram boter`,
    expect: [{ t: 'Rode wijn jus', c: 'medium' }]
  },
  {
    name: 'Tijd is geen hoeveelheid',
    text: `Gekookt ei
4 eieren
6 minuten koken in water.`,
    expect: [{ t: 'Gekookt ei', i: ['4 eieren'], s: 1, c: 'high' }]
  },
  {
    name: 'Vette receptnaam na een recept van alleen zinnen',
    text: `#b 402.Aardpeer
De aardperen goed wassen. In stukken snijden en garen in de oven op 220c.
#b 550.Aardpeer wedges
Aardpeer wassen en in wedges snijden.`,
    expect: [
      { t: 'Aardpeer', i: [], s: 1 },
      { t: 'Aardpeer wedges', i: [], s: 1 }
    ]
  },
  {
    name: 'Vette receptnamen met kopjes: wél losse recepten',
    text: `#b Beurre blanc
Ingrediënten
200 g boter
Bereiding
Monteren.
#b Hollandaise
Ingrediënten
3 eidooiers
Bereiding
Kloppen.`,
    expect: [
      { t: 'Beurre blanc', i: ['200 g boter'], s: 1, c: 'high' },
      { t: 'Hollandaise', i: ['3 eidooiers'], s: 1, c: 'high' }
    ]
  },
  {
    name: 'Zonder kopjes: "Alles ..." zonder punt is een stap, geen ingrediënt',
    text: `Passievrucht coulis
500 gram passievrucht pulp
100 gram suiker
Alles koud mengen`,
    expect: [
      {
        t: 'Passievrucht coulis',
        i: ['500 gram passievrucht pulp', '100 gram suiker'],
        s: ['Alles koud mengen'],
        c: 'high'
      }
    ]
  },
  {
    name: 'Zonder kopjes: lange zin die met een product begint is geen ingrediënt',
    text: `Gemarineerde olijven
1000 gram olijven
50 gram knoflook
Olie kruiden en pepers in robokook draaien. Alles zonder vocht mengen en 1 nacht marineren`,
    expect: [{ t: 'Gemarineerde olijven', i: ['1000 gram olijven', '50 gram knoflook'], s: 1, c: 'high' }]
  },
  {
    name: 'Zonder kopjes: zin die met een product begint is bereiding',
    text: `Beurre noisette
250 g boter
Boter smelten in een pan.
Laat bruin kleuren tot het nootachtig ruikt.`,
    expect: [
      {
        t: 'Beurre noisette',
        i: ['250 g boter'],
        s: ['Boter smelten in een pan.', 'Laat bruin kleuren tot het nootachtig ruikt.']
      }
    ]
  },
  {
    name: 'Hoeveelheden in allerlei vormen',
    text: `Crème anglaise
Ingrediënten
½ liter melk
1/2 vanillestokje
2-3 eidooiers
1,5 dl room
75g suiker
snufje zout
1 bosje munt
3 st. eieren
Bereiding
Verwarm melk met vanille.`,
    expect: [
      {
        t: 'Crème anglaise',
        i: [
          '½ liter melk',
          '1/2 vanillestokje',
          '2-3 eidooiers',
          '1,5 dl room',
          '75g suiker',
          'snufje zout',
          '1 bosje munt',
          '3 st. eieren'
        ],
        s: 1
      }
    ]
  },
  {
    name: 'Tussenkopjes binnen de ingrediënten (componenten)',
    text: `Gebakken coquilles
Ingrediënten
Voor de saus:
200 ml room
1 sjalot
Voor de garnituur:
1 appel
Bereiding
Maak de saus.
Bak de coquilles.`,
    expect: [
      {
        t: 'Gebakken coquilles',
        i: ['Voor de saus:', '200 ml room', '1 sjalot', 'Voor de garnituur:', '1 appel'],
        s: 2
      }
    ]
  },
  {
    name: 'Inleiding vóór de ingrediënten blijft bewaard (voorop in de bereiding)',
    text: `Bouillabaisse
Een klassieke vissoep uit Marseille, rijk aan saffraan.
Ingrediënten
1 kg vis
1 g saffraan
Bereiding
Trek een fumet van de graten.`,
    expect: [
      {
        t: 'Bouillabaisse',
        i: ['1 kg vis', '1 g saffraan'],
        s: ['Een klassieke vissoep uit Marseille, rijk aan saffraan.', 'Trek een fumet van de graten.']
      }
    ]
  },
  {
    name: 'Bereidingstijd en oven als notitie, niet als ingrediënt',
    text: `Tarte tatin
Ingrediënten
6 appels
150 g suiker
Bereidingstijd: 45 minuten
Bereiding
Karamelliseer de suiker.`,
    expect: [
      {
        t: 'Tarte tatin',
        i: ['6 appels', '150 g suiker'],
        s: ['Bereidingstijd: 45 minuten', 'Karamelliseer de suiker.']
      }
    ]
  },
  {
    name: 'Opbrengst tussen haakjes in de titel',
    text: `Mayonaise (voor 4 personen)
Ingrediënten
1 eidooier
250 ml zonnebloemolie
Bereiding
Klop de olie druppelsgewijs erdoor.`,
    expect: [{ t: 'Mayonaise', y: 'voor 4 personen', i: ['1 eidooier', '250 ml zonnebloemolie'], s: 1 }]
  },
  {
    name: 'Opbrengst in het ingrediëntenkopje',
    text: `Gnocchi
Ingrediënten (10 porties)
1 kg aardappel
300 g bloem
Bereiding
Pureer de aardappels.`,
    expect: [{ t: 'Gnocchi', y: '10 porties', i: ['1 kg aardappel', '300 g bloem'], s: 1 }]
  },
  {
    name: 'Titel met nummer of "Recept:"',
    text: `Recept: Kruidenolie
Ingrediënten
100 g bladpeterselie
200 ml zonnebloemolie`,
    expect: [{ t: 'Kruidenolie', i: ['100 g bladpeterselie', '200 ml zonnebloemolie'], s: [] }]
  },
  {
    name: 'Geen bereiding in de bron: niets verzinnen',
    text: `Kruidenolie
100 g bladpeterselie
200 ml zonnebloemolie`,
    expect: [{ t: 'Kruidenolie', i: ['100 g bladpeterselie', '200 ml zonnebloemolie'], s: [] }]
  },
  {
    name: 'Alleen kopje Bereiding, ingrediënten erboven',
    text: `Pesto
50 g basilicum
30 g pijnboompitten
100 ml olijfolie
Bereiding
Maal alles fijn in de vijzel.`,
    expect: [{ t: 'Pesto', i: ['50 g basilicum', '30 g pijnboompitten', '100 ml olijfolie'], s: 1, c: 'high' }]
  },
  {
    name: 'Alleen kopje Ingrediënten, stappen zonder kopje',
    text: `Panna cotta
Ingrediënten
500 ml room
3 blaadjes gelatine
80 g suiker
Week de gelatine in koud water.
Verwarm de room met suiker en los de gelatine erin op.`,
    expect: [{ t: 'Panna cotta', i: ['500 ml room', '3 blaadjes gelatine', '80 g suiker'], s: 2 }]
  },
  {
    name: 'Tabel uit Word (hoeveelheid, eenheid, product gescheiden door tabs)',
    text: `Gazpacho
Ingrediënten
1\tkg\ttomaten
1\tst\tkomkommer
50\tml\tolijfolie
Bereiding
Pureer alles en zeef.`,
    expect: [{ t: 'Gazpacho', i: ['1 kg tomaten', '1 st komkommer', '50 ml olijfolie'], s: 1 }]
  },
  {
    name: 'Bereiding als één lange alinea blijft één stap',
    text: `Risotto
Ingrediënten
300 g risottorijst
1 l bouillon
Bereiding
Fruit de sjalot, voeg de rijst toe en blus af met wijn, voeg dan scheut voor scheut de bouillon toe tot de rijst beetgaar is en monteer met boter en parmezaan.`,
    expect: [{ t: 'Risotto', i: ['300 g risottorijst', '1 l bouillon'], s: 1 }]
  },
  {
    name: 'Tip aan het eind blijft in de bereiding',
    text: `Sabayon
Ingrediënten
4 eidooiers
100 ml marsala
Bereiding
Klop au bain-marie luchtig.
Tip: serveer direct.`,
    expect: [
      { t: 'Sabayon', i: ['4 eidooiers', '100 ml marsala'], s: ['Klop au bain-marie luchtig.', 'Tip: serveer direct.'] }
    ]
  },
  {
    name: 'Twee recepten met kopjes, zonder witregel ertussen',
    text: `Bloemkoolpuree
Ingrediënten
1 bloemkool
100 ml room
Bereiding
Kook en pureer.
Gepofte sjalotten
Ingrediënten
8 sjalotten
Bereiding
Pof 40 minuten op 180 graden.`,
    expect: [
      { t: 'Bloemkoolpuree', i: ['1 bloemkool', '100 ml room'], s: 1 },
      { t: 'Gepofte sjalotten', i: ['8 sjalotten'], s: 1 }
    ]
  },
  {
    name: 'Drie recepten zonder kopjes, gescheiden door witregels',
    text: `Vinaigrette
3 el olijfolie
1 el azijn
Klop alles samen.

Aioli
2 teentjes knoflook
200 ml olijfolie
Wrijf de knoflook fijn en monteer met olie.

Salsa verde
1 bosje peterselie
2 ansjovisfilets
Hak alles fijn.`,
    expect: [
      { t: 'Vinaigrette', i: ['3 el olijfolie', '1 el azijn'], s: 1 },
      { t: 'Aioli', i: ['2 teentjes knoflook', '200 ml olijfolie'], s: 1 },
      { t: 'Salsa verde', i: ['1 bosje peterselie', '2 ansjovisfilets'], s: 1 }
    ]
  },
  {
    name: 'Word-koppen (# ) als receptgrens',
    text: `# Jus de veau
Ingrediënten
2 kg kalfsbotten
Bereiding
Rooster en trek.
# Fond blanc
Ingrediënten
2 kg kippenkarkassen
Bereiding
Trek 4 uur.`,
    expect: [
      { t: 'Jus de veau', i: ['2 kg kalfsbotten'], s: 1 },
      { t: 'Fond blanc', i: ['2 kg kippenkarkassen'], s: 1 }
    ]
  },
  {
    name: 'Recept zonder bereiding gevolgd door een tweede recept (met kopjes)',
    text: `Kruidenzout
Ingrediënten
100 g zeezout
10 g tijm
Citroenolie
Ingrediënten
200 ml olijfolie
1 citroen
Bereiding
Laat 24 uur trekken.`,
    expect: [
      { t: 'Kruidenzout', i: ['100 g zeezout', '10 g tijm'], s: [] },
      { t: 'Citroenolie', i: ['200 ml olijfolie', '1 citroen'], s: 1 }
    ]
  },
  {
    name: 'Receptnaam met ondertitel: eerste regel blijft de naam',
    text: `Beurre blanc
Klassieke Franse botersaus
Ingrediënten
250 g boter
Bereiding
Monteer de boter.`,
    expect: [{ t: 'Beurre blanc', i: ['250 g boter'], s: ['Klassieke Franse botersaus', 'Monteer de boter.'] }]
  },
  {
    name: 'Lege regels en spaties worden opgeruimd',
    text: `   Crème brûlée


Ingrediënten

500 ml   room

5 eidooiers


Bereiding

Gaar au bain-marie op 100 graden.`,
    expect: [{ t: 'Crème brûlée', i: ['500 ml room', '5 eidooiers'], s: 1 }]
  },
  {
    name: 'Kwalitatieve hoeveelheden letterlijk bewaard',
    text: `Gegrilde asperges
Ingrediënten
1 kg witte asperges
scheutje olijfolie
zout en peper naar smaak
eventueel citroenrasp
Bereiding
Grill de asperges.`,
    expect: [
      {
        t: 'Gegrilde asperges',
        i: ['1 kg witte asperges', 'scheutje olijfolie', 'zout en peper naar smaak', 'eventueel citroenrasp'],
        s: 1
      }
    ]
  },
  {
    name: 'Zonder kopjes met inleidende zin',
    text: `Tomatensalade
Een frisse salade voor de zomer.
4 tomaten
1 rode ui
2 el olijfolie
Snijd alles en meng.`,
    expect: [
      {
        t: 'Tomatensalade',
        i: ['4 tomaten', '1 rode ui', '2 el olijfolie'],
        s: ['Een frisse salade voor de zomer.', 'Snijd alles en meng.']
      }
    ]
  },
  {
    name: 'Stappen met hoeveelheden blijven stappen',
    text: `Brioche
Ingrediënten
500 g bloem
6 eieren
Bereiding
1. Kneed 500 g bloem met de eieren tot een soepel deeg.
2. Werk 250 g boter erdoor.`,
    expect: [
      {
        t: 'Brioche',
        i: ['500 g bloem', '6 eieren'],
        s: ['Kneed 500 g bloem met de eieren tot een soepel deeg.', 'Werk 250 g boter erdoor.']
      }
    ]
  },
  {
    name: 'Leeg of alleen een titel: geen recept',
    text: `Mijn receptenmap`,
    expect: []
  },
  {
    name: 'Zonder ingrediënten: lage zekerheid',
    text: `Bereidingswijze voor de chef
Bereiding
Doe alles volgens het boekje.`,
    expect: [{ t: 'Bereidingswijze voor de chef', i: [], s: 1, c: 'low' }]
  },
  {
    name: 'Opbrengst "4 porties" los',
    text: `Rösti
4 porties
Ingrediënten
600 g aardappel
Bereiding
Rasp en bak goudbruin.`,
    expect: [{ t: 'Rösti', y: '4 porties', i: ['600 g aardappel'], s: 1 }]
  },
  {
    name: 'Ingrediënt met eenheid zonder spatie en met punt-afkorting',
    text: `Dashi
Ingrediënten
1l water
20gr kombu
15 gr. katsuobushi
Bereiding
Trek de kombu op 60 graden.`,
    expect: [{ t: 'Dashi', i: ['1l water', '20gr kombu', '15 gr. katsuobushi'], s: 1 }]
  },
  {
    name: 'Kopje "Wat heb je nodig?" en "Zo maak je het"',
    text: `Pannenkoeken
Wat heb je nodig?
250 g bloem
500 ml melk
Zo maak je het
Klop een glad beslag.`,
    expect: [{ t: 'Pannenkoeken', i: ['250 g bloem', '500 ml melk'], s: 1, c: 'high' }]
  },
  {
    name: 'Hoeveelheid áchter het product (chefnotatie), zonder kopjes',
    text: `Beurre blanc
Sjalot 2 st
Witte wijn 1 dl
Boter 250 gr
Monteer de boter in de reductie.`,
    expect: [{ t: 'Beurre blanc', i: ['Sjalot 2 st', 'Witte wijn 1 dl', 'Boter 250 gr'], s: 1 }]
  },
  {
    name: 'Hoeveelheid na dubbele punt of puntjes',
    text: `Fond brun
Ingrediënten
Kalfsbotten: 3 kg
Ui ........ 2 st
Tomatenpuree - 50 g
Bereiding
Rooster de botten.`,
    expect: [{ t: 'Fond brun', i: ['Kalfsbotten: 3 kg', 'Ui ........ 2 st', 'Tomatenpuree - 50 g'], s: 1 }]
  },
  {
    name: '"Ingrediënten voor 4 personen" als kopje met opbrengst',
    text: `Tiramisu
Ingrediënten voor 4 personen
250 g mascarpone
3 eieren
Bereiding
Klop de dooiers met suiker.`,
    expect: [{ t: 'Tiramisu', y: 'voor 4 personen', i: ['250 g mascarpone', '3 eieren'], s: 1 }]
  },
  {
    name: '"Bereiding:" met tekst op dezelfde regel',
    text: `Vinaigrette
Ingrediënten:
3 el olie
1 el azijn
Bereiding: Klop alles samen met een snuf zout.`,
    expect: [{ t: 'Vinaigrette', i: ['3 el olie', '1 el azijn'], s: ['Klop alles samen met een snuf zout.'] }]
  },
  {
    name: 'INGREDIENTEN zonder trema en "Personen: 4"',
    text: `Soufflé
Personen: 4
INGREDIENTEN
4 eiwitten
50 g suiker
BEREIDING
Klop de eiwitten stijf.`,
    expect: [{ t: 'Soufflé', y: '4', i: ['4 eiwitten', '50 g suiker'], s: 1 }]
  },
  {
    name: 'Steekwoord-stappen zonder punt (onder kopje Bereiding)',
    text: `Beurre blanc
Ingrediënten
2 sjalotten
250 g boter
Bereiding
Sjalot zweten
Blussen met wijn
Inkoken
Boter monteren`,
    expect: [
      {
        t: 'Beurre blanc',
        i: ['2 sjalotten', '250 g boter'],
        s: ['Sjalot zweten', 'Blussen met wijn', 'Inkoken', 'Boter monteren']
      }
    ]
  },
  {
    name: 'Stappen met opsommingstekens',
    text: `Coulis
Ingrediënten
300 g frambozen
50 g suiker
Bereiding
- Kook de frambozen met suiker.
- Pureer en zeef.`,
    expect: [
      { t: 'Coulis', i: ['300 g frambozen', '50 g suiker'], s: ['Kook de frambozen met suiker.', 'Pureer en zeef.'] }
    ]
  },
  {
    name: 'Ingrediënten "2x" en "2 x 100 g"',
    text: `Tournedos
Ingrediënten
2x tournedos van 180 g
2 x 100 g eendenlever
Bereiding
Bak de tournedos rosé.`,
    expect: [{ t: 'Tournedos', i: ['2x tournedos van 180 g', '2 x 100 g eendenlever'], s: 1 }]
  },
  {
    name: 'Twee recepten zonder kopjes, eerste zonder bereiding mag niet samenvloeien met tweede',
    text: `Gremolata
1 citroen, rasp
1 teentje knoflook
1 bosje peterselie
Hak alles fijn.

Ossobuco
4 plakken kalfsschenkel
2 dl witte wijn
Stoof 2 uur zacht.`,
    expect: [
      { t: 'Gremolata', i: ['1 citroen, rasp', '1 teentje knoflook', '1 bosje peterselie'], s: 1 },
      { t: 'Ossobuco', i: ['4 plakken kalfsschenkel', '2 dl witte wijn'], s: 1 }
    ]
  }
];

let failed = 0;
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
for (const c of cases) {
  const got = JSON.parse(JSON.stringify(splitRecipeText(c.text)));
  const problems = [];
  if (got.length !== c.expect.length) problems.push(`aantal recepten ${got.length}, verwacht ${c.expect.length}`);
  c.expect.forEach((e, n) => {
    const r = got[n];
    if (!r) return;
    if (e.t !== undefined && r.title !== e.t) problems.push(`#${n + 1} titel "${r.title}", verwacht "${e.t}"`);
    if (e.y !== undefined && r.yield !== e.y) problems.push(`#${n + 1} opbrengst "${r.yield}", verwacht "${e.y}"`);
    if (e.i !== undefined && !eq(r.ingredients, e.i))
      problems.push(`#${n + 1} ingrediënten ${JSON.stringify(r.ingredients)}`);
    if (typeof e.s === 'number' && r.steps.length !== e.s)
      problems.push(`#${n + 1} ${r.steps.length} stappen, verwacht ${e.s}: ${JSON.stringify(r.steps)}`);
    if (Array.isArray(e.s) && !eq(r.steps, e.s)) problems.push(`#${n + 1} bereiding ${JSON.stringify(r.steps)}`);
    if (e.c !== undefined && r.readerConfidence !== e.c)
      problems.push(`#${n + 1} zekerheid ${r.readerConfidence}, verwacht ${e.c}`);
  });
  if (problems.length) {
    failed++;
    console.log(`✗ ${c.name}\n   ${problems.join('\n   ')}`);
  } else console.log(`✓ ${c.name}`);
}

// ---- Automatische tikfout-correcties (readerAutoFix) ----
// from = tekst zoals in de bron, to = verwacht na correctie, bron = rest van het document (voor regel 3).
const fixCases = [
  { name: 'Letter o in temperatuur', from: 'Bakken op 14oc met de klep open.', to: 'Bakken op 140c met de klep open.' },
  { name: 'Letter o in hoeveelheid', from: '1oo gram suiker', to: '100 gram suiker' },
  { name: 'Vergeten spatie na eenheid', from: '600 gramkippenfond', to: '600 gram kippenfond' },
  { name: 'Kilogram blijft kilogram', from: '2 kilogram aardappel', to: '2 kilogram aardappel' },
  {
    name: 'Eén letter fout, juiste woord komt vaak voor',
    from: 'Gepekeld buikspel zonder zwoerd',
    to: 'Gepekeld buikspek zonder zwoerd',
    bron: 'buikspek buikspek buikspek'
  },
  {
    name: 'Woord dat zelf vaker voorkomt blijft staan',
    from: 'proespuma en rapsodie',
    to: 'proespuma en rapsodie',
    bron: 'proespuma proespuma rapsodie rapsodie'
  },
  { name: 'Kort woord wordt nooit verbeterd', from: 'laten vallen', to: 'laten vallen', bron: 'vullen vullen vullen' },
  { name: 'Gewone getallen blijven staan', from: '2 ons boter, 10 stuks ei', to: '2 ons boter, 10 stuks ei' }
];
fixCases.push(
  {
    name: 'Werkwoord in de bereiding blijft staan',
    step: true,
    from: 'Deeg uitrekken en vocht opvangen',
    to: 'Deeg uitrekken en vocht opvangen',
    bron: 'uitlekken uitlekken uitlekken ophangen ophangen ophangen'
  },
  { name: 'Getal in de bereiding wordt wel verbeterd', step: true, from: 'Bakken op 18oc', to: 'Bakken op 180c' },
  // De woordenlijst komt in import.js alleen uit namen en ingrediënten; hier de bron zoals die daar zou zijn.
  { name: 'Productnaam blijft staan (elastic)', from: '10 gram elastic', to: '10 gram elastic', bron: '' },
  {
    name: 'Accent wordt nooit weggehaald',
    from: '100 gram crème fraîche',
    to: '100 gram crème fraîche',
    bron: 'fraiche fraiche fraiche'
  },
  {
    name: 'Spellingvariant blijft staan',
    from: '5 gram albumine',
    to: '5 gram albumine',
    bron: 'albumina albumina albumina'
  },
  { name: 'Accent toevoegen mag', from: 'Genoise', to: 'Génoise', bron: 'génoise génoise génoise' },
  {
    name: 'Werkwoord in een ingrediëntregel blijft staan',
    from: 'Roodlof plukken',
    to: 'Roodlof plukken',
    bron: 'plakken plakken plakken'
  }
);
const { readerAutoFix, readerVocabulary } = ctx;
for (const c of fixCases) {
  const vocab = readerVocabulary(`${c.bron || ''} ${c.from}`, []);
  const fixed = readerAutoFix(
    { title: 'x', yield: '', ingredients: c.step ? [] : [c.from], steps: c.step ? [c.from] : [] },
    vocab
  );
  const got = c.step ? fixed.steps[0] : fixed.ingredients[0];
  if (got !== c.to) {
    failed++;
    console.log(`✗ ${c.name}\n   kreeg "${got}", verwacht "${c.to}"`);
  } else console.log(`✓ ${c.name}`);
}
// ---- Nummer vóór de receptnaam (stripTitleNumber, ook voor "Receptnamen opschonen") ----
const titleCases = [
  ['10.Asperges koken', 'Asperges koken'],
  ['131. Witlof sous vide', 'Witlof sous vide'],
  ['7) Beurre blanc', 'Beurre blanc'],
  ['12 - Rode wijn jus', 'Rode wijn jus'],
  ['465Gado gado saus', 'Gado gado saus'],
  ['91Spätzle', 'Spätzle'],
  ['7Up granité', '7Up granité'],
  ['12-uurs varkensbuik', '12-uurs varkensbuik'],
  ['3 kruiden olie', '3 kruiden olie'],
  ['1.5 kg brood', '1.5 kg brood'],
  ['Beurre blanc', 'Beurre blanc']
];
for (const [from, to] of titleCases) {
  const got = ctx.stripTitleNumber(from);
  if (got !== to) {
    failed++;
    console.log(`✗ Receptnaam "${from}"\n   kreeg "${got}", verwacht "${to}"`);
  } else console.log(`✓ Receptnaam "${from}"`);
}
const total = cases.length + fixCases.length + titleCases.length;
console.log(`\n${total - failed} van ${total} geslaagd`);
process.exit(failed ? 1 : 0);
