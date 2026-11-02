// Duitse versies van de blogs over kerntemperaturen en sous-vide (zie tools/site-blog-temperaturen.mjs).
import { SRC } from './site-blog-temperaturen.mjs';

export const TEMP_POSTS_DE = {
  'en/blog/core-temperatures-meat-fish-shellfish': {
    slug: 'de/blog/kerntemperaturen-fleisch-fisch-meeresfruechte',
    title: 'Kerntemperaturen: Fleisch, Geflügel, Fisch, Meeresfrüchte',
    desc: 'Kerntemperaturen für die Profiküche: Hähnchen, Schwein, Rind, Lamm, Wild, Fisch, Krusten- und Schalentiere. Warum Hähnchen keine 75 °C braucht, mit Zeit-Temperatur-Tabellen und Quellen.',
    h1: 'Kerntemperaturen für Fleisch, Geflügel, Fisch und Meeresfrüchte',
    lead: 'Hähnchen muss nicht auf 75 °C und Schweinefilet darf rosa sein. Entscheidend sind Temperatur und Zeit. Eine Übersicht für die Profiküche, mit Quellen.',
    sections: [
      [
        'Temperatur und Zeit gehören zusammen',
        'Bakterien sterben nicht bei einer magischen Temperatur. Je wärmer, desto schneller. Salmonellen in Hähnchen sind bei 74 °C Kerntemperatur in Sekunden unschädlich; bei 60 °C dauert es etwa eine halbe Stunde. Genauso sicher, aber bei 60 °C viel saftiger.\n\nDeshalb nennen die Tabellen unten immer zwei Dinge: welche Kerntemperatur und wie lange der Kern sie halten muss. Je dicker das Stück, desto länger dauert es, bis der Kern so weit ist.'
      ],
      [
        'Was der Hygienekodex sagt',
        'Der niederländische Hygienekodex für die Gastronomie geht beim Erhitzen von mindestens 75 °C Kerntemperatur aus, Warmhalten über 60 °C und Abkühlen auf 7 °C oder kälter innerhalb von 5 Stunden. In deinem Land können andere Regeln gelten. Arbeitest du niedriger, etwa bei rosa Ente, Sous-vide-Hähnchen oder glasigem Lachs, halte im HACCP-Plan fest, welche Kombination aus Zeit und Temperatur du verwendest, miss mit einem geeichten Kernthermometer und dokumentiere es.'
      ],
      [
        'Geflügel: Hähnchen, Pute und Perlhuhn',
        'Der US-Lebensmittelsicherheitsdienst (USDA FSIS) hat berechnet, wie lange Hähnchen bei jeder Kerntemperatur bleiben muss, um Salmonellen um das Zehnmillionenfache zu reduzieren. Fettere Stücke wie Keulen mit Haut brauchen etwas länger, Pute ebenfalls.',
        {
          head: ['Kerntemperatur', 'Mageres Hähnchen (2 % Fett)', 'Fetteres Hähnchen (12 % Fett)'],
          rows: [
            ['60,0 °C', '26 Minuten', '35 Minuten'],
            ['62,8 °C', '9 Minuten', '13 Minuten'],
            ['65,6 °C', '3 Minuten', '4 Minuten'],
            ['68,3 °C', '45 Sekunden', '54 Sekunden'],
            ['71,1 °C', '14 Sekunden', '17 Sekunden'],
            ['73,9 °C', 'sofort', 'sofort']
          ],
          note: 'Quelle: USDA FSIS, Zeit-Temperatur-Tabellen für Geflügel (7-log-Reduktion von Salmonellen). Die Zeit zählt ab dem Moment, in dem der Kern die Temperatur erreicht.'
        }
      ],
      [
        'Hähnchen in der Praxis',
        'Eine Hähnchenbrust mit 63 bis 65 °C Kerntemperatur, die ein paar Minuten bei dieser Temperatur ruht, ist sicher und bleibt saftig. In Pfanne oder Ofen ist diese Ruhezeit schwer zu garantieren; dort nimmst du die Brust lieber bei 66 bis 68 °C heraus oder hältst sie abgedeckt warm. Sous-vide hält die Zeit genau ein.\n\nKeulen gart man oft höher, auf 70 bis 80 °C. Nicht wegen der Sicherheit, sondern weil das Bindegewebe dann weich wird.'
      ],
      [
        'Hühnerleber und Innereien',
        'Hühnerleber kann innen Campylobacter enthalten, auch wenn sie außen gut gebraten ist. Nach Ausbrüchen durch rosa Hühnerleberparfait empfiehlt die britische Food Standards Agency 70 °C Kerntemperatur für 2 Minuten. Gleichwertig sind 65 °C für 10 Minuten oder 75 °C für 30 Sekunden.'
      ],
      [
        'Schwein',
        'Schweinefleisch muss nicht mehr grau sein. Die USDA senkte den Wert für ganze Stücke 2011 von 71 °C auf 63 °C mit 3 Minuten Ruhezeit. In der EU werden Schlachtschweine zudem auf Trichinen untersucht. Bei einem ganzen Muskel sitzen Bakterien vor allem außen, und die werden beim Anbraten heiß genug.',
        {
          head: ['Produkt', 'Kern', 'Ergebnis'],
          rows: [
            ['Schweinefilet', '60–62 °C', 'Rosa und saftig'],
            ['Kotelett, Rücken', '62–63 °C', 'Leicht rosa, 3 Minuten ruhen'],
            ['Hackfleisch, Wurst, Burger', '71 °C', 'Durchgegart: Bakterien sind im ganzen Produkt verteilt'],
            ['Schulter, Bauch, Bäckchen (geschmort)', '85–95 °C', 'Zart und zupfbar; die Temperatur ist für die Struktur']
          ]
        }
      ],
      [
        'Rind, Kalb und Lamm',
        'Bei einem ganzen Stück Rind, Kalb oder Lamm ist das Innere praktisch keimfrei. Deshalb darf ein Entrecôte blutig sein. Die Kerntemperatur wählst du nach Geschmack und Struktur. Große Braten 2 bis 5 °C früher herausnehmen: beim Ruhen steigt der Kern weiter.',
        {
          head: ['Garstufe', 'Kern', 'So sieht es aus'],
          rows: [
            ['Blutig (rare)', '50–52 °C', 'Rot und saftig'],
            ['Rosa (medium-rare)', '54–56 °C', 'Rosa, Fett gerade weich'],
            ['Medium', '58–60 °C', 'Hellrosa'],
            ['Durch (well done)', '68 °C und mehr', 'Grau, fest'],
            ['Hackfleisch, Burger', '71 °C', 'Immer durch: Bakterien sind ins Fleisch gemischt']
          ]
        }
      ],
      [
        'Tatar und Carpaccio',
        'Rohes Rindfleisch ist nur sicher, wenn es frisch ist, von einem zuverlässigen Lieferanten kommt, kalt bleibt und erst kurz vor dem Servieren geschnitten oder gehackt wird. Das Risiko ist nie null. Nicht für Schwangere, kleine Kinder, ältere Menschen oder Menschen mit geschwächter Abwehr.'
      ],
      [
        'Wild, Ente und Gans',
        'Hirsch, Reh und Hase behandelst du wie Rind: rosa ist in Ordnung. Wildschwein kann Trichinen enthalten. Serviere es nur rosa, wenn es amtlich auf Trichinen untersucht ist; sonst auf mindestens 71 °C garen.\n\nEnten- und Gänsebrust werden in der Küche rosa serviert, bei 54 bis 58 °C. Wer das sicher belegen will, nutzt die Geflügelzeiten aus der Tabelle oder gart die Brust sous-vide (siehe [Sous-vide: Temperaturen und Zeiten](/de/blog/sous-vide-temperaturen-und-zeiten)). Keulen werden bei 80 °C oder mehr konfiert.'
      ],
      [
        'Fisch',
        'Bei Fisch wählst du die Kerntemperatur vor allem nach der Struktur. Ein paar Grad zu heiß, und Fisch wird trocken.',
        {
          head: ['Fisch', 'Kern', 'Ergebnis'],
          rows: [
            ['Lachs, Forelle', '45–50 °C', 'Mi-cuit: glasig, butterzart'],
            ['Kabeljau, Schellfisch, Heilbutt', '50–54 °C', 'Blättert gerade'],
            ['Steinbutt, Seezunge, Wolfsbarsch', '50–55 °C', 'Fest und saftig'],
            ['Thunfisch', '40–45 °C (Mitte roh)', 'Kurz scharf anbraten'],
            ['Ganz durch (FSIS)', '63 °C', 'Undurchsichtig, zerfällt']
          ]
        }
      ],
      [
        'Parasiten: wann Fisch zuerst eingefroren werden muss',
        'Fisch, der roh oder fast roh gegessen wird, kann den Parasiten Anisakis enthalten: Sushi, Ceviche, Tatar, marinierter oder kaltgeräucherter Fisch und auch Mi-cuit-Lachs bei 45 °C. Nach EU-Verordnung 853/2004 (geändert durch [1276/2011](' + SRC.eu1276 + ')) muss solcher Fisch zuerst eingefroren werden: mindestens 24 Stunden bei −20 °C oder kälter oder 15 Stunden bei −35 °C. Erhitzen auf 60 °C Kerntemperatur für mindestens 1 Minute tötet die Parasiten ebenfalls. Für Zuchtfisch kann eine Ausnahme gelten; frag deinen Lieferanten nach der Erklärung.'
      ],
      [
        'Krusten- und Schalentiere',
        'Krustentiere garst du nach Struktur. Muscheln brauchen mehr Vorsicht.',
        {
          head: ['Produkt', 'Kern', 'Ergebnis'],
          rows: [
            ['Hummer', '55–60 °C', 'Saftig, gerade undurchsichtig'],
            ['Kaisergranat', '50–55 °C', 'Glasig und süß'],
            ['Garnelen', '55–60 °C', 'Undurchsichtig und fest'],
            ['Jakobsmuschel', '45–50 °C', 'Glasige Mitte'],
            ['Miesmuscheln, Herzmuscheln', 'Bis sie offen sind, dann noch kurz weiter', 'Geschlossene wegwerfen']
          ]
        }
      ],
      [
        'Viren in Muscheln',
        'Miesmuscheln, Austern und Herzmuscheln können Noroviren und Hepatitis A enthalten. Diese Viren vertragen mehr Hitze als Bakterien. Der EU-Standard für die industrielle Erhitzung von Muscheln ist 90 °C für 90 Sekunden im Fleisch; die EFSA [hat dazu ein Gutachten veröffentlicht](' + SRC.efsaBivalves + '). Rohe Austern sind nie ganz ohne Risiko. Kaufe sie nur bei zugelassenen Lieferanten und serviere sie nicht an empfindliche Gäste.'
      ],
      [
        'Empfindliche Gäste',
        'Für Schwangere, ältere Menschen, kleine Kinder und Menschen mit geschwächter Abwehr gilt: kein roher oder halbgarer Fisch, keine rohen Krusten- und Schalentiere, kein rosa Geflügel oder rosa Leber und kein rohes Fleisch. Gare Geflügel für sie auf 74 °C Kerntemperatur oder halte dich strikt an die Zeiten der Tabelle.'
      ],
      [
        'Richtig messen',
        'Stich das Thermometer in die dickste Stelle, nicht an einen Knochen. Prüfe es regelmäßig in Eiswasser: Es muss 0 °C anzeigen. Reinige es zwischen roh und gar. Und schreib die Temperaturen auf: So zeigst du, dass du nach deinem HACCP-Plan arbeitest.'
      ],
      [
        'Quellen',
        'Die Werte in diesem Artikel stammen aus:',
        [
          '[USDA FSIS: Safe minimum internal temperature chart](' + SRC.fsisChart + ')',
          '[USDA FSIS: Cooking Guideline mit Zeit-Temperatur-Tabellen für Geflügel](' + SRC.fsisPoultry + ')',
          'Food Standards Agency (UK, 2010): Hühnerleber 70 °C für 2 Minuten',
          '[EU-Verordnung 1276/2011 über Parasiten in Fischereierzeugnissen](' + SRC.eu1276 + ')',
          '[EFSA zur Erhitzung von Muscheln](' + SRC.efsaBivalves + ')',
          '[Niederländischer Hygienekodex für die Gastronomie (KHN)](' + SRC.khn + ')'
        ]
      ]
    ],
    outro: 'In Savour schreibst du die Kerntemperatur zu dem Schritt, zu dem sie gehört, damit deine ganze Brigade sie sieht, auch im Kochmodus. Dieser Artikel ist eine Hilfe; dein eigener HACCP-Plan und die geltenden Vorschriften haben immer Vorrang.'
  },
  'en/blog/sous-vide-temperatures-and-times': {
    slug: 'de/blog/sous-vide-temperaturen-und-zeiten',
    title: 'Sous-vide: Temperaturen und Zeiten pro Produkt',
    desc: 'Sous-vide-Tabelle für die Profiküche: Temperaturen und Zeiten für Rind, Kalb, Lamm, Schwein, Hähnchen, Ente, Fisch, Meeresfrüchte, Eier und Gemüse, mit Sicherheit, Kühlen und Lagern.',
    h1: 'Sous-vide: Temperaturen und Zeiten',
    lead: 'Ein Nachschlagewerk für die Küche: pro Produkt die Badtemperatur, die Zeit und das Ergebnis. Mit den Regeln für sicheres Kühlen und Lagern.',
    sections: [
      [
        'So funktioniert Sous-vide',
        'Beim Sous-vide ist die Temperatur des Wasserbads die Endtemperatur des Produkts. Eine Hähnchenbrust im Bad mit 63 °C wird nie heißer als 63 °C. Die Zeit hat drei Teile: bis der Kern die Temperatur erreicht (das hängt von der Dicke ab), lang genug zum Pasteurisieren und bei zähen Stücken lang genug, damit das Bindegewebe weich wird.'
      ],
      [
        'Sicher arbeiten',
        'Die wichtigsten Regeln:',
        [
          'Nicht länger als 4 Stunden unter 54,5 °C. Darunter können Bakterien wachsen. Mi-cuit-Fisch und blutiges Fleisch also sofort servieren.',
          'Zum Pasteurisieren mindestens die Zeiten der Tabelle unten einhalten, gerechnet ab einem Produkt aus der Kühlung.',
          'Fisch, der unter 60 °C gegart wird, muss vorher gegen Parasiten eingefroren werden (siehe [Kerntemperaturen](/de/blog/kerntemperaturen-fleisch-fisch-meeresfruechte)).',
          'Mit frischen, kalten Produkten und sauberen Beuteln arbeiten und alles im HACCP-Plan festhalten.'
        ]
      ],
      [
        'Pasteurisierzeiten nach Dicke',
        'Wie lange ein Produkt zum Pasteurisieren im Bad bleiben muss, hängt von Dicke und Temperatur ab. Eine Auswahl aus den Tabellen von Douglas Baldwin, ab 5 °C gerechnet:',
        {
          head: ['Produkt und Dicke', '55 °C', '60 °C', '63 °C'],
          rows: [
            ['Rind, Schwein, Lamm · 20 mm', '2½ Std.', '1¼ Std.', '55 Min.'],
            ['Rind, Schwein, Lamm · 50 mm', '4½ Std.', '2½ Std.', '2¼ Std.'],
            ['Hähnchen · 20 mm', '–', '1¼ Std.', '50 Min.'],
            ['Hähnchen · 50 mm', '–', '3¼ Std.', '2½ Std.'],
            ['Magerer Fisch · 20 mm', '3 Std.', '1 Std.', '–'],
            ['Fetter Fisch · 20 mm', '4¾ Std.', '1¼ Std.', '–']
          ],
          note: 'Quelle: Douglas Baldwin, A Practical Guide to Sous Vide Cooking. Seine Hähnchentabelle beginnt bei 57 °C (20 mm: 2¾ Std.), Fisch geht bis 60 °C.'
        }
      ],
      [
        'Rind und Kalb',
        'Zarte Stücke garst du auf den Garpunkt, zähe Stücke lange bei niedrigerer Temperatur, damit sie rosa bleiben.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Filet, Entrecôte, Rib-Eye (3–4 cm)', '55 °C', '1½–3 Std.', 'Rosa; innerhalb von 4 Std. servieren oder Pasteurisierzeit einhalten'],
            ['Dasselbe, medium', '60 °C', '1½–3 Std.', 'Hellrosa'],
            ['Bavette, Flank, Tafelspitz', '55 °C', '6–12 Std.', 'Rosa und zarter'],
            ['Schaufelstück, Schulter', '55 °C', '24–48 Std.', 'Rosa und zart wie ein Steak'],
            ['Brust (rosa)', '57 °C', '36–48 Std.', 'Fest, rosa'],
            ['Brust (gezupft)', '80 °C', '24–36 Std.', 'Zerfällt'],
            ['Kalbsfilet, Kalbsoberschale', '57–58 °C', '2–4 Std.', 'Hellrosa, saftig']
          ]
        }
      ],
      [
        'Lamm',
        'Lamm garst du wie Rind; für die Schulter gilt dasselbe wie für Schweineschulter.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Lammkarree, Lammrücken', '55–57 °C', '1–2 Std.', 'Rosa'],
            ['Lammkeule (rosa)', '57 °C', '8–24 Std.', 'Rosa und zart'],
            ['Lammschulter', '68 °C', '24 Std.', 'Zart, noch schnittfest'],
            ['Lammschulter (gezupft)', '80 °C', '8–12 Std.', 'Zerfällt']
          ]
        }
      ],
      [
        'Schwein',
        'Schweinefleisch darf rosa sein; Schulter und Bauch werden bei höherer Temperatur richtig gut.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Schweinefilet', '60 °C', '1½–3 Std.', 'Rosa und saftig'],
            ['Kotelett', '61 °C', 'Pasteurisierzeit (20 mm: 1 Std.)', 'Leicht rosa'],
            ['Kotelett, lange gegart', '55 °C', '12 Std.', 'Zart, rosa'],
            ['Schweineschulter', '68 °C', '24 Std.', 'Zart, schnittfest'],
            ['Schweineschulter (pulled)', '80 °C', '8–12 Std.', 'Zerfällt'],
            ['Spareribs', '68 °C oder 80 °C', '24 Std. oder 8–12 Std.', 'Von fest bis vom Knochen'],
            ['Bauch', '68–80 °C', '12–24 Std.', 'Danach knusprig braten']
          ]
        }
      ],
      [
        'Geflügel',
        'Geflügel garst du bei einer Temperatur, bei der es auch pasteurisiert wird; die Zeit hängt von der Dicke ab.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Hähnchenbrust', '63,5 °C', '1½–3 Std. (Dicke)', 'Saftig, gerade gar'],
            ['Putenbrust', '63,5 °C', '3–5 Std.', 'Saftig'],
            ['Hähnchenkeule', '65 °C', '1½–3 Std.', 'Zart, noch fest'],
            ['Entenbrust', '57 °C', '3–4 Std.', 'Rosa; pasteurisiert laut Tabelle'],
            ['Enten-, Gänse- oder Putenkeule (Confit)', '80 °C', '8–12 Std.', 'Fällt vom Knochen']
          ]
        }
      ],
      [
        'Fisch und Meeresfrüchte',
        'Fisch ist schnell fertig. Unter 60 °C pasteurisierst du nicht: Verwende eingefrorenen Fisch und serviere sofort.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Lachs, mi-cuit', '42–50 °C', '15–20 Min.', 'Glasig bis butterzart'],
            ['Lachs, gar', '60 °C', 'Pasteurisierzeit (20 mm: 1¼ Std.)', 'Fest, undurchsichtig'],
            ['Kabeljau, Schellfisch, Heilbutt', '55–60 °C', '30–60 Min.', 'Blättert'],
            ['Hummer (Schwanz, ausgelöst)', '55 °C', '20–30 Min.', 'Saftig und süß'],
            ['Garnelen', '55–60 °C', '15–25 Min.', 'Fest'],
            ['Oktopus', '77–82 °C', '4–6 Std.', 'Zart, danach grillen']
          ]
        }
      ],
      [
        'Eier',
        'Eier garst du in der Schale, ohne Beutel.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Pasteurisiertes Ei', '57 °C', 'mindestens 75 Min.', 'Noch roh, aber sicher für Mayonnaise oder Tatar'],
            ['Weiches Ei', '63 °C', '45–60 Min.', 'Flüssiges Eigelb, Eiweiß gerade gestockt'],
            ['„Perfect egg“', '64,5 °C', '45–60 Min.', 'Eigelb wie dicke Sahne']
          ]
        }
      ],
      [
        'Gemüse und Obst',
        'Gemüse braucht viel mehr Wärme als Fleisch: Pektin baut sich erst um 84 °C ab. Gare Gemüse deshalb getrennt. Die Zeiten sind Richtwerte; sie hängen von Dicke und Reife ab.',
        {
          head: ['Produkt', 'Bad', 'Zeit', 'Ergebnis'],
          rows: [
            ['Karotte, Pastinake, Knollensellerie', '85 °C', '45–60 Min.', 'Bissfest, voller Geschmack'],
            ['Rote Bete', '85 °C', '1½–2 Std.', 'Weich'],
            ['Drillinge', '85 °C', '60–90 Min.', 'Cremig'],
            ['Spargel (mittel)', '85 °C', '12–15 Min.', 'Bissfest; dünner: 6–8 Min.'],
            ['Fenchel', '85 °C', '45–60 Min.', 'Weich und süß'],
            ['Birne, Apfel', '80–85 °C', '20–40 Min.', 'Pochiert, behält die Form']
          ]
        }
      ],
      [
        'Kühlen und Lagern',
        'Wenn du vorarbeitest (Cook & Chill), kühle die Beutel direkt nach dem Garen in Eiswasser mit mindestens halb Eis. Ein 25 mm dickes Stück ist in etwa 50 Minuten kalt, ein 50 mm dickes in etwa 2¾ Stunden. Der niederländische Hygienekodex verlangt das Abkühlen auf 7 °C oder kälter innerhalb von 5 Stunden; halte dich an die Regeln in deinem Land. Lagere nur pasteurisierte Produkte vor; halte die Haltbarkeit im HACCP-Plan fest und datiere den Beutel.'
      ],
      [
        'In der Praxis',
        'Tupfe das Produkt nach dem Bad trocken und brate es kurz und heiß für eine Kruste. Kräuter und Butter im Beutel geben viel Geschmack; roher Knoblauch kann bei niedrigen Temperaturen scharf werden, nimm lieber konfierten. Schreib Badtemperatur und Zeit ins Rezept, damit die ganze Brigade es genau gleich macht.'
      ],
      [
        'Quellen',
        'Die Werte in diesem Artikel stammen aus:',
        [
          '[Douglas Baldwin: A Practical Guide to Sous Vide Cooking](' + SRC.baldwin + ')',
          '[USDA FSIS: Zeit-Temperatur-Tabellen für Geflügel](' + SRC.fsisPoultry + ')',
          '[Niederländischer Hygienekodex für die Gastronomie (KHN)](' + SRC.khn + ')',
          'Gemüse: gängige Praxiswerte um 84–85 °C, wo Pektin abgebaut wird'
        ]
      ]
    ],
    outro: 'Schreib Badtemperatur und Zeit zum Schritt in deinem Savour-Rezept; beim Umrechnen bleibt die Zeit gleich, denn sie hängt von der Dicke ab, nicht von der Menge. Dieser Artikel ist eine Hilfe; dein eigener HACCP-Plan hat immer Vorrang.'
  }
};
