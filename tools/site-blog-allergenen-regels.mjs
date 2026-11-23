// Blog: de regels voor allergeneninformatie in de horeca (2026-11-23), in vijf talen, elk met de regels van de eigen
// landen: nl = Nederland en België, en = Verenigd Koninkrijk en EU, de = Duitsland, Oostenrijk en Zwitserland,
// es = Spanje, fr = Frankrijk, België en Zwitserland. Geschreven voor vooral de Duitse markt (Search Console).
// Bronnen (gecontroleerd op 23 november 2026): EU 1169/2011; LMIDV § 4 (gesetze-im-internet.de, gelezen);
// WKO Allergeninfos (gelezen: lettercodes A–R, mondeling met geschoold personeel); RD 126/2015 art. 6 (boe.es, gelezen);
// FSA allergen guidance (gov.uk, gelezen); Frankrijk, Nederland, België en Zwitserland via overheids- en
// brancheorganisatiebronnen (NVWA en FAVV weigerden automatisch lezen); Frankrijk: de tekst van décret 2015-447 uit het
// Journal officiel (art. R. 112-11 t/m R. 112-15 in de oorspronkelijke nummering), aangeleverd door de eigenaar. Geen juridisch advies; pas niets
// aan zonder bron. Savour-functies kloppen met de pagina Allergenen per recept (allergenen = Savour Pro).

const KEY = 'en/blog/allergen-information-rules-restaurants';

const EU = 'https://eur-lex.europa.eu/eli/reg/2011/1169/oj';

export const ALLERGEN_RULES_POST = {
  id: 'allergenregels',
  date: '2026-11-23',
  photo: 'pageAllergenen',
  rich: true,
  nl: {
    slug: 'blog/allergenen-regels-horeca',
    title: 'Allergenen in de horeca: de regels in Nederland en België',
    desc: 'Wat de wet vraagt over allergeneninformatie in restaurant, catering en bakkerij: de 14 allergenen, schriftelijk of mondeling, de regels in Nederland en België en hoe je het per recept goed bijhoudt.',
    h1: 'Allergenen in de horeca: wat de regels vragen in Nederland en België',
    lead: 'Elke gast mag weten welke van de 14 allergenen in zijn gerecht zitten, ook als niets verpakt is. Hoe je dat laat weten, mag je deels zelf kiezen. Dit zijn de regels, en zo houd je het per recept bij.',
    brief: [
      'Ook bij onverpakt eten moet je de 14 allergenen kunnen noemen: in restaurant, catering, bakkerij en kantine.',
      'In Nederland en België mag het schriftelijk of mondeling. Mondeling alleen als de informatie ook op papier of digitaal klaarligt.',
      'De informatie klopt alleen als je recepten kloppen, inclusief basisrecepten zoals fond, deeg en saus.'
    ],
    sections: [
      [
        'Wat de Europese regels vragen',
        `Sinds december 2014 geldt in de hele EU dezelfde verordening over voedselinformatie ([Verordening (EU) nr. 1169/2011](${EU})). Daarin staat dat je bij elk levensmiddel moet kunnen zeggen welke van de 14 allergenen erin zitten. Dat geldt niet alleen voor verpakte producten, maar ook voor alles wat je onverpakt verkoopt of serveert: het gerecht in je restaurant, het broodje over de toonbank, de maaltijd in de kantine.\n\nHoe je die informatie geeft, mag elk land zelf regelen. Daarom verschillen de regels in Nederland en België op een paar punten.`
      ],
      [
        'De 14 allergenen',
        'Dit zijn de 14 allergenen uit de Europese regels, met voorbeelden van plekken waar ze in de keuken makkelijk over het hoofd worden gezien.',
        {
          head: ['Allergeen', 'Let op bij'],
          rows: [
            ['Glutenbevattende granen', 'bloem in een roux of jus, paneermeel, sojasaus met tarwe, bier'],
            ['Schaaldieren', 'garnalenfond, bisque, Aziatische pasta’s'],
            ['Eieren', 'mayonaise, deeg, glazuur op brood, sommige pasta'],
            ['Vis', 'ansjovis in een dressing of tapenade, vissaus, worcestersaus'],
            ['Pinda’s', 'satésaus, pindaolie, sommige currypasta’s'],
            ['Soja', 'sojasaus, miso, lecithine in chocolade'],
            ['Melk', 'boter in een saus, room, kaas, wei in brood'],
            ['Noten', 'pesto, praliné, marsepein, notenolie'],
            ['Selderij', 'fond en bouillon, kruidenmixen, soep'],
            ['Mosterd', 'dressing, mayonaise, marinade, kruidenmix'],
            ['Sesamzaad', 'tahin, sesamolie, broodjes, dukkah'],
            ['Sulfiet', 'wijn in een saus, azijn, gedroogd fruit (vanaf 10 mg per kg of liter)'],
            ['Lupine', 'lupinemeel in sommige broden en glutenvrije producten'],
            ['Weekdieren', 'oestersaus, mosselen, inktvis']
          ],
          note: 'Controleer altijd het etiket van je leverancier: hetzelfde product kan per merk verschillen.'
        }
      ],
      [
        'De regels in Nederland',
        'In Nederland staan de regels voor onverpakt eten in de Warenwetregeling allergeneninformatie niet-voorverpakte levensmiddelen. Je mag de informatie schriftelijk of mondeling geven.\n\nSchriftelijk kan op de kaart, op een bord of kaartje bij het product, in een map of digitaal. Kies je voor mondeling, dan moet een duidelijk zichtbare tekst de gast vertellen dat hij het kan vragen, en moet de informatie altijd ook schriftelijk of digitaal beschikbaar zijn, voor je medewerkers en voor de NVWA. Volgens de NVWA gaat het daar vaak mis: wel mondeling, maar niets op papier.'
      ],
      [
        'De regels in België',
        'In België staan de regels in het koninklijk besluit van 17 juli 2014; het FAVV licht ze toe in een omzendbrief. Ook hier mag het schriftelijk of mondeling, voor iedereen die onverpakt eten aan de consument verkoopt: horeca, slagerij, bakkerij en schoolrefter.\n\nKies je voor mondeling, zorg dan dat de informatie ook op papier of digitaal klaarligt en dat de gast ziet dat hij het kan vragen. De precieze voorwaarden staan in de omzendbrief van het FAVV; kijk die na voor jouw zaak.'
      ],
      [
        'Je recepten zijn de basis',
        'Een allergenenlijst is zo goed als het recept waar hij op gebaseerd is. Drie dingen gaan vaak mis:\n\n**Basisrecepten.** De selderij zit niet in het gerecht, maar in de fond die je erin gebruikt. Wie alleen naar het gerecht kijkt, mist hem.\n\n**Vervangingen.** De leverancier levert een ander merk mosterd of bouillon, en daarin zit iets anders. Het recept verandert niet, de allergenen wel.\n\n**Een aangepast recept.** De chef zet er pesto bij, maar de allergenenlijst bij de kassa blijft dezelfde. Werk de lijst bij zodra het recept verandert.',
        { tip: ['Eén plek voor recept en allergenen', 'Houd de allergenen bij het recept zelf bij, niet in een losse Excel-lijst. Dan verandert het één als het andere verandert.'] }
      ],
      [
        'Wat je bij een controle wilt kunnen laten zien',
        'Een controleur wil zien hoe je aan je informatie komt. Zorg dat je per gerecht kunt laten zien welke allergenen erin zitten en waar dat op gebaseerd is: je recepten en de etiketten of specificaties van je leveranciers. En zorg dat elke medewerker weet waar die informatie staat, ook op een drukke avond.'
      ],
      [
        'Zo helpt Savour',
        'In Savour zie je bij elk recept de 14 allergenen, ook via je basisrecepten: zit er selderij in de fond, dan zie je selderij bij het gerecht. Savour vult ze zelf in vanuit de [Savour-lijst](/ingredientenlijst-allergenen) en zegt nooit dat iets allergeenvrij is zolang niet alles is nagekeken. Bij printen kies je of de allergenen op het papier komen, en je keukenteam werkt met dezelfde versie. Allergenen horen bij [Savour Pro](/savour-pro). Lees meer op [Allergenen per recept](/allergenen-per-recept).'
      ],
      [
        'Veelgestelde vragen',
        'Kort antwoord op wat koks het vaakst vragen.',
        {
          faq: [
            ['Moet ik de allergenen op de menukaart zetten?', 'Nee, dat hoeft niet. In Nederland en België mag het ook in een map, op een bord of mondeling. Mondeling alleen als de informatie ook op papier of digitaal klaarligt en de gast ziet dat hij het kan vragen.'],
            ['Geldt dit ook voor catering en een kantine?', 'Ja. Het geldt voor iedereen die onverpakt eten aan de consument geeft, dus ook voor catering, kantines, bakkerijen en slagerijen.'],
            ['Moet ik ook "kan sporen bevatten" vermelden?', 'De 14 allergenen gaan over wat je als ingrediënt gebruikt. Voor sporen door kruisbesmetting gelden aparte afspraken; je toezichthouder (NVWA of FAVV) kan je vertellen wat voor jouw zaak geldt.'],
            ['Is dit juridisch advies?', 'Nee. Dit artikel legt de regels uit zoals de overheid ze beschrijft. Twijfel je over jouw situatie, vraag het dan aan de NVWA, het FAVV of je brancheorganisatie.']
          ]
        }
      ],
      [
        'Bronnen',
        `[Verordening (EU) nr. 1169/2011](${EU}) · [KHN: wat betekent de allergenenwetgeving voor jou](https://khn.nl/kennis/wat-betekent-de-wetgeving-allergenen-voor-je) · [Ondernemersplein: voedselveilig werken](https://ondernemersplein.overheid.nl/wetten-en-regels/voedselveilig-werken/) · [Horeca Vlaanderen: allergenen (FAVV)](https://www.horecavlaanderen.be/stream/allergenen-favv.pdf). Nagekeken op 23 november 2026.`
      ]
    ],
    outro: 'Dit artikel is geen juridisch advies. Regels kunnen veranderen; we houden dit artikel bij.'
  },
  en: {
    slug: KEY,
    title: 'Allergen information in restaurants: the rules in the UK and EU',
    desc: 'What the law asks about allergen information in restaurants, catering and bakeries: the 14 allergens, written or verbal, the UK rules including Natasha’s Law, and how to keep it right per recipe.',
    h1: 'Allergen information in restaurants: what the rules ask in the UK and EU',
    lead: 'Every guest has the right to know which of the 14 allergens are in their dish, even when nothing is packaged. How you tell them is partly up to you. These are the rules, and this is how to keep them right per recipe.',
    brief: [
      'For food that is not prepacked you still have to name the 14 allergens: in restaurants, catering, bakeries and canteens.',
      'In the UK you may give it verbally, with a clearly visible written notice telling guests to ask.',
      'The information is only as good as your recipes, including base recipes such as stocks, doughs and sauces.'
    ],
    sections: [
      [
        'The 14 allergens are the same in the UK and the EU',
        `Both the UK and the EU work with the same 14 allergens. In the EU they come from the food information regulation ([Regulation (EU) No 1169/2011](${EU})), which every member state applies with its own national rules on how the information is given. The UK kept the same list after leaving the EU. The rule applies not only to packaged products but to everything you sell or serve unpackaged: the dish in your restaurant, the sandwich over the counter, the meal in the canteen.`
      ],
      [
        'The 14 allergens',
        'These are the 14 allergens, with examples of where they are easily missed in the kitchen.',
        {
          head: ['Allergen', 'Watch out for'],
          rows: [
            ['Cereals containing gluten', 'flour in a roux or gravy, breadcrumbs, soy sauce with wheat, beer'],
            ['Crustaceans', 'prawn stock, bisque, Asian pastes'],
            ['Eggs', 'mayonnaise, pastry, egg wash on bread, some pasta'],
            ['Fish', 'anchovy in a dressing or tapenade, fish sauce, Worcestershire sauce'],
            ['Peanuts', 'satay sauce, groundnut oil, some curry pastes'],
            ['Soya', 'soy sauce, miso, lecithin in chocolate'],
            ['Milk', 'butter in a sauce, cream, cheese, whey in bread'],
            ['Nuts', 'pesto, praline, marzipan, nut oils'],
            ['Celery', 'stock, spice mixes, soup'],
            ['Mustard', 'dressing, mayonnaise, marinade, spice mixes'],
            ['Sesame', 'tahini, sesame oil, bread rolls, dukkah'],
            ['Sulphites', 'wine in a sauce, vinegar, dried fruit (from 10 mg per kg or litre)'],
            ['Lupin', 'lupin flour in some breads and gluten-free products'],
            ['Molluscs', 'oyster sauce, mussels, squid']
          ],
          note: 'Always check your supplier’s label: the same product can differ by brand.'
        }
      ],
      [
        'The rules in the UK',
        'The Food Standards Agency (FSA) guidance for England, Wales and Northern Ireland says you must supply allergen information for every item that contains any of the 14 allergens, including meals in restaurants and takeaway food.\n\nYou may give it in writing, for example on the menu, a chalkboard or in an information pack. You may also give it verbally, as long as a written notice in a clearly visible place tells customers how to get the information. The FSA adds that written information supported by a conversation works best for guests. At a buffet, the information is needed per dish. For delivery and takeaway ordered at a distance, guests need it before they buy and again when the food arrives.'
      ],
      [
        'Natasha’s Law: food packed on your own premises',
        'Food you pack on the same premises where you sell it, before the customer orders, is called prepacked for direct sale (PPDS): the sandwich you make in the morning and put in the fridge, for example. Since October 2021 this food needs a full label with the name and the full ingredients list, with the 14 allergens emphasised. This is known as Natasha’s Law. Food you pack only after the customer orders falls under the normal rules for non-prepacked food.'
      ],
      [
        'In the EU',
        'In the EU every country decides how the information may be given. Some allow verbal information with a written record and a notice, others ask for written information. Working in an EU country? Check the rules of that country: our [Dutch](/blog/allergenen-regels-horeca), [German](/de/blog/allergenkennzeichnung-gastronomie), [Spanish](/es/blog/alergenos-restauracion-normativa) and [French](/fr/blog/allergenes-restaurant-obligations) articles each explain the local rules.'
      ],
      [
        'Your recipes are the foundation',
        'An allergen list is only as good as the recipe behind it. Three things often go wrong:\n\n**Base recipes.** The celery is not in the dish, but in the stock you use in it. Look only at the dish and you miss it.\n\n**Substitutions.** The supplier delivers a different brand of mustard or stock cube, with something else in it. The recipe stays the same, the allergens do not.\n\n**An updated recipe.** The chef adds pesto, but the allergen list at the till stays the same. Update the list as soon as the recipe changes.',
        { tip: ['One place for recipe and allergens', 'Keep the allergens with the recipe itself, not in a separate spreadsheet. Then one changes when the other does.'] }
      ],
      [
        'What you want to be able to show',
        'An inspector wants to see how you know what you tell your guests. Make sure you can show per dish which allergens it contains and what that is based on: your recipes and your suppliers’ labels or specifications. And make sure every member of staff knows where that information is, even on a busy night.'
      ],
      [
        'How Savour helps',
        'In Savour you see the 14 allergens with every recipe, including through your base recipes: if the stock contains celery, you see celery with the dish. Savour fills them in itself from the [Savour list](/en/ingredient-list-allergens) and never says something is allergen-free until everything has been checked. When printing you choose whether the allergens go on the paper, and your kitchen team works from the same version. Allergens are part of [Savour Pro](/en/pro). Read more on [Allergens per recipe](/en/allergens-per-recipe).'
      ],
      [
        'Frequently asked questions',
        'Short answers to what chefs ask most.',
        {
          faq: [
            ['Do I have to put allergens on the menu?', 'Not in the UK. Verbal information is allowed, as long as a clearly visible written notice tells guests to ask. Many kitchens still put them in writing, because the FSA says that works best.'],
            ['Does this apply to catering and canteens too?', 'Yes. It applies to everyone who supplies food that is not prepacked to consumers, including caterers, canteens and bakeries.'],
            ['What about “may contain”?', 'The 14 allergens are about what you use as an ingredient. Precautionary statements about cross-contact are a separate topic; your local authority can tell you what applies to your business.'],
            ['Is this legal advice?', 'No. This article explains the rules as the authorities describe them. If you are unsure about your situation, ask your local authority or the FSA.']
          ]
        }
      ],
      [
        'Sources',
        `[Regulation (EU) No 1169/2011](${EU}) · [FSA: allergen guidance for food businesses](https://www.gov.uk/government/publications/allergen-guidance-for-food-businesses) · [FSA: introduction to allergen labelling for PPDS food](https://www.gov.uk/government/publications/introduction-to-allergen-labelling-for-ppds-food). Checked on 23 November 2026.`
      ]
    ],
    outro: 'This article is not legal advice. Rules can change; we keep this article up to date.'
  }
};

export const ALLERGEN_RULES_POST_DE = {
  [KEY]: {
    slug: 'de/blog/allergenkennzeichnung-gastronomie',
    title: 'Allergenkennzeichnung in der Gastronomie: DE, AT und CH',
    desc: 'Was die Allergenkennzeichnung in Restaurant, Catering und Bäckerei verlangt: die 14 Allergene, schriftlich oder mündlich, die Regeln in Deutschland, Österreich (Buchstaben A bis R) und der Schweiz, und wie du sie pro Rezeptur dokumentierst.',
    h1: 'Allergenkennzeichnung in der Gastronomie: Pflichten in Deutschland, Österreich und der Schweiz',
    lead: 'Jeder Gast darf wissen, welche der 14 Allergene in seinem Gericht stecken, auch wenn nichts verpackt ist. Wie du das zeigst, darfst du teilweise selbst wählen. Das sind die Regeln, und so dokumentierst du sie pro Rezeptur.',
    brief: [
      'Auch bei loser Ware musst du die 14 Allergene nennen können: in Restaurant, Catering, Bäckerei und Kantine.',
      'In Deutschland, Österreich und der Schweiz geht es schriftlich oder mündlich, mündlich aber nur unter Bedingungen.',
      'Die Angaben stimmen nur, wenn deine Rezepturen stimmen, auch die Grundrezepte wie Fond, Teig und Sauce.'
    ],
    sections: [
      [
        'Was die EU verlangt',
        `Seit Dezember 2014 gilt in der ganzen EU dieselbe Lebensmittelinformationsverordnung (LMIV, [Verordnung (EU) Nr. 1169/2011](${EU})). Danach musst du bei jedem Lebensmittel sagen können, welche der 14 Allergene darin enthalten sind. Das gilt nicht nur für verpackte Ware, sondern auch für alles, was du lose verkaufst oder servierst: das Gericht im Restaurant, das belegte Brötchen an der Theke, das Essen in der Kantine.\n\nWie die Information gegeben wird, regelt jedes Land selbst. Deshalb unterscheiden sich Deutschland, Österreich und die Schweiz in einigen Punkten.`
      ],
      [
        'Die 14 Allergene',
        'Das sind die 14 Allergene, mit Beispielen, wo sie in der Küche leicht übersehen werden. In Österreich werden oft die Buchstaben in der zweiten Spalte verwendet.',
        {
          head: ['Allergen', 'Österreich', 'Achtung bei'],
          rows: [
            ['Glutenhaltiges Getreide', 'A', 'Mehl in Mehlschwitze oder Jus, Paniermehl, Sojasauce mit Weizen, Bier'],
            ['Krebstiere', 'B', 'Garnelenfond, Bisque, asiatische Pasten'],
            ['Eier', 'C', 'Mayonnaise, Teig, Eistreiche auf Gebäck, manche Pasta'],
            ['Fisch', 'D', 'Sardellen in Dressing oder Tapenade, Fischsauce, Worcestershiresauce'],
            ['Erdnüsse', 'E', 'Satésauce, Erdnussöl, manche Currypasten'],
            ['Soja', 'F', 'Sojasauce, Miso, Lecithin in Schokolade'],
            ['Milch', 'G', 'Butter in der Sauce, Sahne, Käse, Molke im Brot'],
            ['Schalenfrüchte', 'H', 'Pesto, Praliné, Marzipan, Nussöle'],
            ['Sellerie', 'L', 'Fond und Brühe, Gewürzmischungen, Suppen'],
            ['Senf', 'M', 'Dressing, Mayonnaise, Marinade, Gewürzmischungen'],
            ['Sesam', 'N', 'Tahin, Sesamöl, Brötchen, Dukkah'],
            ['Sulfite', 'O', 'Wein in der Sauce, Essig, Trockenfrüchte (ab 10 mg pro kg oder Liter)'],
            ['Lupinen', 'P', 'Lupinenmehl in manchen Broten und glutenfreien Produkten'],
            ['Weichtiere', 'R', 'Austernsauce, Muscheln, Tintenfisch']
          ],
          note: 'Prüfe immer das Etikett deines Lieferanten: Dasselbe Produkt kann je nach Marke anders sein.'
        }
      ],
      [
        'Deutschland: § 4 LMIDV',
        'In Deutschland regelt die Lebensmittelinformations-Durchführungsverordnung (LMIDV, § 4) die Allergenkennzeichnung bei loser Ware. Die Information muss vor Kaufabschluss und vor der Übergabe vorliegen. Schriftlich geht das auf einem Schild am Lebensmittel, auf der Speise- oder Getränkekarte, per Aushang im Betrieb oder über andere schriftliche oder elektronische Angebote; im letzten Fall muss ein Hinweis zeigen, wie der Gast an die Information kommt.\n\nMündlich ist erlaubt, wenn alle Bedingungen erfüllt sind: Das Personal gibt die Auskunft auf Nachfrage unverzüglich, es gibt eine schriftliche oder elektronische Dokumentation der verwendeten Zutaten, und diese ist für die Behörde und auf Nachfrage für den Gast leicht zugänglich. Außerdem muss ein Hinweis im Betrieb sagen, dass die Information mündlich gegeben wird und die Dokumentation auf Nachfrage einsehbar ist.',
        { tip: ['Mündlich heißt nicht ohne Papier', 'Auch wer mündlich informiert, braucht eine schriftliche oder elektronische Dokumentation der Zutaten. Genau diese Dokumentation ist deine Rezeptur.'] }
      ],
      [
        'Österreich: Allergeninformationsverordnung',
        'In Österreich gilt die Allergeninformationsverordnung. Laut Wirtschaftskammer (WKO) darfst du schriftlich informieren, zum Beispiel in der Speisekarte, oder mündlich auf Nachfrage. Für die schriftliche Form sind die Buchstabencodes A bis R zulässig, wenn die Legende gleichzeitig sichtbar ist; vorgeschrieben sind die Buchstaben nicht.\n\nFür die mündliche Information braucht es drei Dinge: einen gut sichtbaren schriftlichen Hinweis, dass der Gast beim Personal nachfragen kann, eine oder mehrere geschulte Personen, die Auskunft geben, und während der gesamten Öffnungszeit mindestens eine dieser Personen im Betrieb. Den Schulungsnachweis und die Aufzeichnungen über die Allergene jedes Gerichts musst du dokumentieren.'
      ],
      [
        'Schweiz: Information im Offenverkauf',
        'Die Schweiz ist nicht in der EU, verwendet aber ebenfalls 14 Allergene (Anhang 6 der Verordnung betreffend die Information über Lebensmittel, LIV). Laut Bundesamt für Lebensmittelsicherheit und Veterinärwesen (BLV) müssen Allergene im Offenverkauf grundsätzlich schriftlich angegeben werden. Darauf kannst du verzichten, wenn ein schriftlicher Hinweis sagt, dass die Information mündlich erteilt wird. Dann muss sie dem Personal schriftlich vorliegen oder von einer Fachperson gegeben werden können, und zwar vor dem Kaufentscheid.'
      ],
      [
        'Die Rezeptur ist die Grundlage',
        'Eine Allergenliste ist nur so gut wie die Rezeptur dahinter. Drei Dinge gehen oft schief:\n\n**Grundrezepte.** Der Sellerie steckt nicht im Gericht, sondern im Fond, der darin verwendet wird. Wer nur auf das Gericht schaut, übersieht ihn.\n\n**Austausch beim Lieferanten.** Es kommt eine andere Marke Senf oder Brühe, mit anderen Zutaten. Die Rezeptur bleibt gleich, die Allergene nicht.\n\n**Eine geänderte Rezeptur.** Der Küchenchef ergänzt Pesto, aber die Allergenliste an der Kasse bleibt dieselbe. Aktualisiere die Liste, sobald sich die Rezeptur ändert.',
        { tip: ['Rezeptur und Allergene an einem Ort', 'Führe die Allergene bei der Rezeptur selbst, nicht in einer separaten Excel-Liste. Dann ändert sich das eine, wenn sich das andere ändert.'] }
      ],
      [
        'Was du bei einer Kontrolle zeigen willst',
        'Die Lebensmittelkontrolle will sehen, woher deine Angaben kommen. Sorge dafür, dass du pro Gericht zeigen kannst, welche Allergene enthalten sind und worauf das beruht: deine Rezepturen und die Etiketten oder Spezifikationen deiner Lieferanten. Und sorge dafür, dass jede Person im Service weiß, wo diese Information steht, auch an einem vollen Abend.'
      ],
      [
        'So hilft Savour',
        'In Savour siehst du bei jeder Rezeptur die 14 Allergene, auch über deine Grundrezepte: Steckt Sellerie im Fond, siehst du Sellerie beim Gericht. Savour füllt sie selbst aus der [Savour-Liste](/de/zutatenliste-allergene) aus und sagt nie, dass etwas allergenfrei ist, solange nicht alles geprüft ist. Österreichische Allergenbuchstaben hinter Zutaten („Eier C“, „Butter G“) erkennt Savour beim Import. Beim Drucken wählst du, ob die Allergene auf das Rezepturblatt kommen, und dein Küchenteam arbeitet mit derselben Version. Allergene gehören zu [Savour Pro](/de/preise). Mehr unter [Allergene pro Rezept](/de/allergene-pro-rezept) und [Rezepturverwaltung](/de/rezepturverwaltung).'
      ],
      [
        'Häufige Fragen',
        'Kurze Antworten auf das, was Köche am häufigsten fragen.',
        {
          faq: [
            ['Muss ich die Allergene in die Speisekarte schreiben?', 'Nein. In Deutschland, Österreich und der Schweiz ist auch ein Aushang, eine Mappe oder unter Bedingungen die mündliche Auskunft erlaubt. Für die mündliche Auskunft brauchst du aber immer einen Hinweis und eine schriftliche Grundlage.'],
            ['Gilt das auch für Catering, Kantine und Bäckerei?', 'Ja. Es gilt für alle, die Lebensmittel lose an Verbraucher abgeben, also auch für Catering, Gemeinschaftsverpflegung, Bäckereien und Metzgereien.'],
            ['Muss ich „kann Spuren enthalten“ angeben?', 'Die 14 Allergene betreffen, was du als Zutat verwendest. Spuren durch unbeabsichtigte Vermischung sind ein eigenes Thema; deine Lebensmittelüberwachung sagt dir, was für deinen Betrieb gilt.'],
            ['Ist das eine Rechtsberatung?', 'Nein. Dieser Artikel erklärt die Regeln so, wie Behörden und Kammern sie beschreiben. Bist du unsicher, frag deine Lebensmittelüberwachung, die IHK, die WKO oder das kantonale Labor.']
          ]
        }
      ],
      [
        'Quellen',
        `[Verordnung (EU) Nr. 1169/2011](${EU}) · [§ 4 LMIDV](https://www.gesetze-im-internet.de/lmidv/__4.html) · [WKO: Allergeninformation in der Gastronomie](https://www.wko.at/oe/tourismus-freizeitwirtschaft/gastronomie/allergeninfos-deutsch) · [BLV: Informationen im Offenverkauf](https://www.blv.admin.ch/de/informationen-im-offenverkauf). Geprüft am 23. November 2026.`
      ]
    ],
    outro: 'Dieser Artikel ist keine Rechtsberatung. Regeln können sich ändern; wir halten diesen Artikel aktuell.'
  }
};

export const ALLERGEN_RULES_POST_ES = {
  [KEY]: {
    slug: 'es/blog/alergenos-restauracion-normativa',
    title: 'Alérgenos en restauración: la normativa en España',
    desc: 'Qué exige la ley sobre la información de alérgenos en restaurantes, catering y panaderías: los 14 alérgenos, por escrito u oral, el Real Decreto 126/2015 y cómo llevarlo bien en cada receta.',
    h1: 'Alérgenos en restauración: qué exige la normativa en España',
    lead: 'Cada cliente tiene derecho a saber cuáles de los 14 alérgenos lleva su plato, aunque nada esté envasado. Cómo se lo dices lo decides en parte tú. Estas son las normas, y así lo llevas bien en cada receta.',
    brief: [
      'También con alimentos sin envasar tienes que poder indicar los 14 alérgenos: en restaurante, catering, panadería y comedor.',
      'En España la información puede darse de forma oral, pero solo si también está registrada por escrito o en formato electrónico en el establecimiento.',
      'La información solo es correcta si tus recetas lo son, incluidas las elaboraciones base como fondos, masas y salsas.'
    ],
    sections: [
      [
        'Lo que exige la Unión Europea',
        `Desde diciembre de 2014 rige en toda la UE el mismo reglamento sobre información alimentaria ([Reglamento (UE) n.º 1169/2011](${EU})). Según él, de cada alimento tienes que poder decir cuáles de los 14 alérgenos contiene. No solo de los productos envasados, sino también de todo lo que vendes o sirves sin envasar: el plato de tu restaurante, el bocadillo del mostrador, la comida del comedor.\n\nCómo se da esa información lo decide cada país. En España lo regula el Real Decreto 126/2015.`
      ],
      [
        'Los 14 alérgenos',
        'Estos son los 14 alérgenos, con ejemplos de dónde se pasan por alto fácilmente en la cocina.',
        {
          head: ['Alérgeno', 'Cuidado con'],
          rows: [
            ['Cereales con gluten', 'harina en un roux o una salsa, pan rallado, salsa de soja con trigo, cerveza'],
            ['Crustáceos', 'fondo de gambas, bisque, pastas asiáticas'],
            ['Huevos', 'mayonesa, masas, pintado de panes, algunas pastas'],
            ['Pescado', 'anchoa en un aliño o tapenade, salsa de pescado, salsa Worcestershire'],
            ['Cacahuetes', 'salsa satay, aceite de cacahuete, algunas pastas de curry'],
            ['Soja', 'salsa de soja, miso, lecitina en el chocolate'],
            ['Leche', 'mantequilla en una salsa, nata, queso, suero en el pan'],
            ['Frutos de cáscara', 'pesto, praliné, mazapán, aceites de frutos secos'],
            ['Apio', 'fondos y caldos, mezclas de especias, sopas'],
            ['Mostaza', 'aliños, mayonesa, adobos, mezclas de especias'],
            ['Sésamo', 'tahini, aceite de sésamo, panecillos, dukkah'],
            ['Sulfitos', 'vino en una salsa, vinagre, fruta seca (a partir de 10 mg por kg o litro)'],
            ['Altramuces', 'harina de altramuz en algunos panes y productos sin gluten'],
            ['Moluscos', 'salsa de ostras, mejillones, calamar']
          ],
          note: 'Comprueba siempre la etiqueta de tu proveedor: el mismo producto puede variar según la marca.'
        }
      ],
      [
        'La normativa en España: Real Decreto 126/2015',
        'El Real Decreto 126/2015 obliga a informar de los alérgenos en los alimentos que se presentan sin envasar al consumidor final y a las colectividades. La información puede ir por escrito, en etiquetas junto al alimento o en carteles donde se expone.\n\nTambién puede darse de forma oral, con dos condiciones: el personal del establecimiento puede darla fácilmente y cuando se pide, antes de terminar la compra, y la información está registrada por escrito o en formato electrónico en el establecimiento, accesible para el personal, las autoridades de control y los clientes que la pidan. Además, de forma visible y legible debe indicarse dónde está la información o que el cliente puede preguntar al personal.',
        { tip: ['Oral no significa sin papel', 'Aunque informes de palabra, necesitas un registro escrito o electrónico de los ingredientes. Ese registro es, en la práctica, tu receta.'] }
      ],
      [
        'Tus recetas son la base',
        'Una lista de alérgenos es tan buena como la receta en la que se basa. Tres cosas fallan a menudo:\n\n**Elaboraciones base.** El apio no está en el plato, sino en el fondo que usas en él. Si solo miras el plato, no lo ves.\n\n**Cambios de proveedor.** Llega otra marca de mostaza o de caldo, con otros ingredientes. La receta no cambia, los alérgenos sí.\n\n**Una receta modificada.** El chef añade pesto, pero la lista de alérgenos de la sala sigue igual. Actualiza la lista en cuanto cambia la receta.',
        { tip: ['Receta y alérgenos en un mismo sitio', 'Lleva los alérgenos junto a la receta, no en una hoja de Excel aparte. Así, si cambia una, cambia la otra.'] }
      ],
      [
        'Qué quieres poder enseñar en una inspección',
        'La inspección quiere ver de dónde sale tu información. Asegúrate de poder enseñar en cada plato qué alérgenos lleva y en qué te basas: tus recetas y las etiquetas o fichas de tus proveedores. Y asegúrate de que todo el personal sabe dónde está esa información, también en una noche llena.'
      ],
      [
        'Cómo ayuda Savour',
        'En Savour ves los 14 alérgenos en cada receta, también a través de tus elaboraciones base: si el fondo lleva apio, lo ves en el plato. Savour los rellena solo a partir de la [lista de Savour](/es/lista-ingredientes-alergenos) y nunca dice que algo está libre de alérgenos mientras no esté todo revisado. Al imprimir eliges si los alérgenos van en el papel, y tu equipo de cocina trabaja con la misma versión. Los alérgenos forman parte de [Savour Pro](/es/precios). Más en [Alérgenos por receta](/es/alergenos-por-receta).'
      ],
      [
        'Preguntas frecuentes',
        'Respuestas cortas a lo que más preguntan los cocineros.',
        {
          faq: [
            ['¿Tengo que poner los alérgenos en la carta?', 'No es obligatorio. También puede ir en carteles o de forma oral, siempre que esté registrado por escrito o en formato electrónico y se indique de forma visible cómo obtener la información.'],
            ['¿Vale también para catering y comedores?', 'Sí. El Real Decreto 126/2015 incluye los alimentos sin envasar para el consumidor final y para las colectividades.'],
            ['¿Tengo que indicar “puede contener trazas”?', 'Los 14 alérgenos se refieren a lo que usas como ingrediente. Las trazas por contaminación cruzada son otro tema; la autoridad sanitaria de tu comunidad puede decirte qué se aplica a tu negocio.'],
            ['¿Esto es asesoramiento jurídico?', 'No. Este artículo explica la normativa tal como la publican las autoridades. Si tienes dudas sobre tu caso, consulta a la autoridad sanitaria de tu comunidad autónoma.']
          ]
        }
      ],
      [
        'Fuentes',
        `[Reglamento (UE) n.º 1169/2011](${EU}) · [Real Decreto 126/2015 (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-2015-2293). Revisado el 23 de noviembre de 2026.`
      ]
    ],
    outro: 'Este artículo no es asesoramiento jurídico. Las normas pueden cambiar; mantenemos este artículo al día.'
  }
};

export const ALLERGEN_RULES_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/allergenes-restaurant-obligations',
    title: 'Allergènes au restaurant : obligations en France, Belgique et Suisse',
    desc: 'Ce que la loi demande sur l’information allergènes en restaurant, traiteur et boulangerie : les 14 allergènes, l’obligation écrite en France, les règles en Belgique et en Suisse, et comment les suivre recette par recette.',
    h1: 'Allergènes au restaurant : ce que demandent les règles en France, en Belgique et en Suisse',
    lead: 'Chaque client a le droit de savoir lesquels des 14 allergènes se trouvent dans son plat, même quand rien n’est emballé. La manière de l’indiquer dépend du pays. Voici les règles, et comment les tenir à jour recette par recette.',
    brief: [
      'Même pour les denrées non préemballées, tu dois pouvoir indiquer les 14 allergènes : restaurant, traiteur, boulangerie, cantine.',
      'En France, l’information doit être donnée par écrit ; une réponse orale seule ne suffit pas.',
      'L’information n’est juste que si tes recettes le sont, y compris les préparations de base comme les fonds, les pâtes et les sauces.'
    ],
    sections: [
      [
        'Ce que demande l’Union européenne',
        `Depuis décembre 2014, le même règlement sur l’information des consommateurs s’applique dans toute l’UE (règlement INCO, [règlement (UE) n° 1169/2011](${EU})). Pour chaque denrée, tu dois pouvoir dire lesquels des 14 allergènes elle contient. Pas seulement pour les produits emballés, mais aussi pour tout ce que tu vends ou sers sans emballage : le plat au restaurant, le sandwich au comptoir, le repas à la cantine.\n\nLa manière de donner cette information est fixée par chaque pays. C’est pourquoi la France, la Belgique et la Suisse diffèrent sur quelques points.`
      ],
      [
        'Les 14 allergènes',
        'Voici les 14 allergènes, avec des exemples d’endroits où on les oublie facilement en cuisine.',
        {
          head: ['Allergène', 'Attention à'],
          rows: [
            ['Céréales contenant du gluten', 'farine dans un roux ou un jus, chapelure, sauce soja au blé, bière'],
            ['Crustacés', 'fond de crevettes, bisque, pâtes asiatiques'],
            ['Œufs', 'mayonnaise, pâtes, dorure, certaines pâtes alimentaires'],
            ['Poissons', 'anchois dans une vinaigrette ou une tapenade, sauce poisson, sauce Worcestershire'],
            ['Arachides', 'sauce saté, huile d’arachide, certaines pâtes de curry'],
            ['Soja', 'sauce soja, miso, lécithine dans le chocolat'],
            ['Lait', 'beurre dans une sauce, crème, fromage, lactosérum dans le pain'],
            ['Fruits à coque', 'pesto, praliné, pâte d’amande, huiles de noix'],
            ['Céleri', 'fonds et bouillons, mélanges d’épices, soupes'],
            ['Moutarde', 'vinaigrette, mayonnaise, marinade, mélanges d’épices'],
            ['Graines de sésame', 'tahini, huile de sésame, petits pains, dukkah'],
            ['Sulfites', 'vin dans une sauce, vinaigre, fruits secs (à partir de 10 mg par kg ou litre)'],
            ['Lupin', 'farine de lupin dans certains pains et produits sans gluten'],
            ['Mollusques', 'sauce d’huître, moules, calamar']
          ],
          note: 'Vérifie toujours l’étiquette de ton fournisseur : un même produit peut varier selon la marque.'
        }
      ],
      [
        'En France : une information écrite',
        'En France, le décret n° 2015-447 du 17 avril 2015, en vigueur depuis le 1er juillet 2015, fixe les règles pour les denrées non préemballées. Dans les lieux où l’on sert des repas à consommer sur place, il faut porter à la connaissance du client, sous forme écrite, de façon lisible et visible : soit l’information sur les allergènes elle-même, soit la manière dont elle est tenue à sa disposition. Dans ce second cas, le client doit pouvoir accéder directement et librement à l’information, disponible par écrit. Une réponse orale seule ne suffit donc pas.\n\nConcrètement : les allergènes sur la carte, sur une affiche, ou dans un classeur ou un tableau que le client peut consulter sans demander, avec une mention écrite qui dit où le trouver. Pour la vente au comptoir, l’information figure sur la denrée ou à proximité, sans doute possible sur le produit concerné.\n\nDeux règles particulières : en restauration collective (repas fournis à des convives réguliers, par accord ou contrat), l’information n’est pas requise au moment du repas si un dispositif permet au convive d’indiquer à l’avance les allergènes qu’il refuse ; le fournisseur garde alors ce document trois ans après le dernier repas. Et chaque livraison de denrées à un restaurant doit être accompagnée d’un document indiquant les allergènes, ce qui t’aide à tenir tes recettes justes.',
        { tip: ['Écrit ne veut pas dire sur la carte', 'Tu peux garder une carte épurée et mettre les allergènes dans un classeur ou un tableau consultable, tant que le client sait où le trouver sans avoir à demander.'] }
      ],
      [
        'En Belgique',
        'En Belgique, les règles figurent dans l’arrêté royal du 17 juillet 2014, que l’AFSCA explique dans une circulaire. L’information peut être donnée par écrit ou oralement, par tous ceux qui vendent des denrées non préemballées au consommateur : horeca, boucherie, boulangerie, cantine scolaire.\n\nSi tu choisis l’oral, veille à ce que l’information soit aussi disponible par écrit ou sous forme numérique et que le client voie qu’il peut la demander. Les conditions précises figurent dans la circulaire de l’AFSCA ; vérifie-les pour ton établissement.'
      ],
      [
        'En Suisse',
        'La Suisse n’est pas dans l’UE, mais utilise aussi 14 allergènes (annexe 6 de l’ordonnance concernant l’information sur les denrées alimentaires, OIDAl). Selon l’Office fédéral de la sécurité alimentaire (OSAV), les allergènes doivent en principe être indiqués par écrit dans la vente en vrac. On peut y renoncer si une mention écrite indique que l’information est donnée oralement ; le personnel doit alors l’avoir par écrit ou pouvoir la faire donner par une personne compétente, avant la décision d’achat.'
      ],
      [
        'Tes recettes sont la base',
        'Une liste d’allergènes vaut ce que vaut la recette derrière. Trois choses ratent souvent :\n\n**Les préparations de base.** Le céleri n’est pas dans le plat, mais dans le fond qu’on y utilise. Si tu ne regardes que le plat, tu le rates.\n\n**Les changements de fournisseur.** Une autre marque de moutarde ou de bouillon arrive, avec d’autres ingrédients. La recette ne change pas, les allergènes si.\n\n**Une recette modifiée.** Le chef ajoute du pesto, mais la liste d’allergènes en salle reste la même. Mets la liste à jour dès que la recette change.',
        { tip: ['Recette et allergènes au même endroit', 'Garde les allergènes avec la recette elle-même, pas dans un tableau Excel à part. Ainsi, quand l’une change, l’autre aussi.'] }
      ],
      [
        'Ce que tu veux pouvoir montrer lors d’un contrôle',
        'Le contrôleur veut voir d’où vient ton information. Assure-toi de pouvoir montrer, pour chaque plat, quels allergènes il contient et sur quoi tu te bases : tes recettes et les étiquettes ou fiches de tes fournisseurs. Et que chaque membre de l’équipe sache où se trouve cette information, même un soir de rush.'
      ],
      [
        'Comment Savour aide',
        'Dans Savour, tu vois les 14 allergènes de chaque recette, y compris à travers tes préparations de base : si le fond contient du céleri, tu le vois dans le plat. Savour les remplit lui-même à partir de la [liste Savour](/fr/liste-ingredients-allergenes) et ne dit jamais qu’un plat est sans allergènes tant que tout n’a pas été vérifié. À l’impression, tu choisis si les allergènes figurent sur la feuille, et ton équipe de cuisine travaille avec la même version. Les allergènes font partie de [Savour Pro](/fr/tarifs). En savoir plus : [Allergènes par recette](/fr/allergenes-par-recette).'
      ],
      [
        'Questions fréquentes',
        'Des réponses courtes à ce que les cuisiniers demandent le plus.',
        {
          faq: [
            ['Dois-je mettre les allergènes sur la carte ?', 'En France, l’information doit être écrite, mais pas forcément sur la carte : une affiche, ou une mention écrite qui indique où le client peut consulter librement l’information écrite, convient aussi. En Belgique et en Suisse, l’oral est possible sous conditions.'],
            ['Est-ce aussi valable pour le traiteur et la cantine ?', 'Oui. Les règles visent tous ceux qui fournissent des denrées non préemballées au consommateur, y compris la restauration collective, les traiteurs et les boulangeries.'],
            ['Dois-je indiquer « peut contenir des traces » ?', 'Les 14 allergènes concernent ce que tu utilises comme ingrédient. Les traces par contamination croisée sont un autre sujet ; ton service de contrôle (DDPP, AFSCA ou laboratoire cantonal) peut te dire ce qui s’applique à ton établissement.'],
            ['Est-ce un conseil juridique ?', 'Non. Cet article explique les règles telles que les autorités les décrivent. En cas de doute, renseigne-toi auprès de la DDPP, de l’AFSCA ou de ton laboratoire cantonal.']
          ]
        }
      ],
      [
        'Sources',
        `[Règlement (UE) n° 1169/2011](${EU}) · [Décret n° 2015-447 du 17 avril 2015 (Journal officiel)](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000030503262) · [Préfecture des Hauts-de-Seine : allergènes alimentaires](https://www.hauts-de-seine.gouv.fr/contenu/telechargement/23858/169754/file/Allergènes%20alimentaires%20X.pdf) · [OSAV : informations dans la vente en vrac](https://www.blv.admin.ch/de/informationen-im-offenverkauf). Vérifié le 23 novembre 2026.`
      ]
    ],
    outro: 'Cet article n’est pas un conseil juridique. Les règles peuvent évoluer ; nous tenons cet article à jour.'
  }
};
