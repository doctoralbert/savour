// Deutsche Website: alle Seiten unter savour.page/de/... (gebaut von tools/build-seo.mjs).
// Menü und Startseite stehen in tools/site-content-extra.mjs; hier der Inhalt der einzelnen Seiten.
// Blogartikel sind nach ihrem englischen Slug verknüpft.
export const DE = {
  ui: {
    readArticle: 'Artikel lesen',
    blogLead:
      'Praktische Artikel über das Digitalisieren von Rezepten, das Ordnen von Rezeptordnern, dein Küchenteam und Rezeptverwaltung in der Gastronomie.',
    more: 'Mehr lesen',
    logoLine: 'Von der Notiz zum Rezept, das stimmt. Gemacht von Köchen aus den Niederlanden, für Köche.',
    soonMail: 'Möchtest du mitdenken? Schreib uns an'
  },
  blogSlug: 'de/blog',
  blogTitle: 'Blog über Rezeptverwaltung und Küche — Savour',
  legacy: {
    pro: {
      slug: 'de/preise',
      title: 'Preise — Savour Pro und Team-Abos',
      h1: 'Preise',
      desc: 'Kostenlos starten mit bis zu 100 Rezepten. Savour Pro ab 2,99 € pro Monat: unbegrenzt Rezepte, KI für handschriftliche Notizen und geteilte Ordner. Auch Team-Abos.'
    },
    faq: {
      slug: 'de/faq',
      title: 'Häufige Fragen zu Savour',
      desc: 'Antworten zu Savour: Rezepte aus Word, PDF und Fotos importieren, kostenlos und Pro, geteilte Ordner und Arbeiten in der Küche.'
    },
    guide: {
      slug: 'de/anleitung',
      title: 'Anleitung: mit Rezepten in Savour arbeiten',
      desc: 'Schritt für Schritt: dein Rezeptbuch importieren, in Ordnern und Kategorien ordnen, hochrechnen, Kochmodus, drucken und mit deinem Team teilen.'
    },
    contact: {
      slug: 'de/kontakt',
      title: 'Kontakt — Savour',
      desc: 'Fragen zu Savour, zur Rezeptverwaltung für dein Restaurant oder zu einem Team-Abo? Schreib uns über das Formular oder an contact@savour.page.'
    },
    terms: {
      slug: 'de/agb',
      title: 'Allgemeine Geschäftsbedingungen — Savour',
      desc: 'Die AGB von Savour: kostenloses Konto, Savour Pro, Team-Abos, Kündigung und Widerrufsrecht.'
    },
    privacy: {
      slug: 'de/datenschutz',
      title: 'Datenschutzerklärung — Savour',
      desc: 'Wie Savour mit deinen Daten und Rezepten umgeht: was wir speichern, wofür, mit wem wir arbeiten und welche Rechte du hast.'
    }
  },
  features: {
    digitise: {
      slug: 'de/rezepte-digitalisieren',
      title: 'Rezepte digitalisieren: Word, PDF und Handschrift | Savour',
      desc: 'Digitalisiere deine Rezepte, ohne abzutippen. Word und PDF auf einmal importieren, handschriftliche Notizen und Fotos lesen lassen. Mengen werden nie erfunden.',
      h1: 'Rezepte digitalisieren, ohne abzutippen',
      lead: 'Deine Rezepthefte, Word-Dateien und Notizen mit Kaffeeflecken werden in einem Schritt zu einem geordneten Rezeptbuch.',
      sections: [
        ['Word und PDF auf einmal', 'Zieh eine Word-Datei oder ein PDF in Savour, auch wenn Hunderte Rezepte darin stehen. Der Savour-Leser erkennt, wo jedes Rezept beginnt und endet, und setzt Titel, Zutaten und Zubereitung an die richtige Stelle. Nummern vor Titeln und kleine Tippfehler wie 18oc statt 180 °C werden bereinigt. Ein Koch hat so 1.400 Rezepte in etwa zwei Minuten importiert.'],
        ['Handschriftliche Rezepte und Fotos', 'Mach ein Foto von einer Notiz, einer Seite aus deinem Heft oder einem Scan aus einem alten Ordner. Die KI liest die Handschrift und macht daraus ein sauberes Rezept, auch wenn das Foto schief ist oder das Papier Flecken hat. Das ist Teil von Savour Pro.'],
        ['Nichts wird erfunden', 'Ein Rezept muss stimmen. Savour erfindet nie Mengen, Zutaten oder Schritte. Ist sich der Leser unsicher, wird das Rezept markiert und du prüfst es selbst, bevor es gespeichert wird.'],
        ['Dann einfach weiterarbeiten', 'Jedes importierte Rezept kannst du bearbeiten, mit einem Foto versehen, in einen Ordner legen und mit deiner Brigade teilen.']
      ]
    },
    organise: {
      slug: 'de/rezepte-organisieren',
      title: 'Rezepte organisieren: Rezeptverwaltung für die Gastronomie | Savour',
      desc: 'Rezeptverwaltung für Restaurants und Gastronomie: alle Rezepturen in einem Rezeptbuch, mit eigenen Ordnern und Kategorien, Suche nach Zutat und Favoriten.',
      h1: 'Rezepte so organisieren, wie deine Küche arbeitet',
      lead: 'Ein Rezeptbuch für alles, was du je gekocht hast, geordnet nach deiner Art.',
      sections: [
        ['Deine Struktur', 'Saucen, Fonds, Garnituren, Patisserie, das Degustationsmenü dieser Saison. Du legst die Ordner und Kategorien an. Ein Rezept kann in mehreren Ordnern stehen, deine Jus gehört also sowohl zu den Fonds als auch zum Lammgang.'],
        ['Suchen nach dem, was du noch weißt', 'Du weißt nur noch, dass Yuzu drin war? Savour durchsucht Titel, Zutaten und Zubereitung. Oder blättere von A bis Z durch dein ganzes Buch.'],
        ['Ruhig und schnell', 'Keine überladenen Bildschirme. Eine Liste mit Titeln, ein Stern für deine Favoriten und ein Tippen zum Rezept. Gemacht zum Nachschlagen mitten im Service.'],
        ['Auf jedem Gerät', 'Am Computer ordnen und importieren, in der Küche Handy oder Tablet mit großer Schrift im Kochmodus. Nichts zu installieren.']
      ]
    },
    share: {
      slug: 'de/rezepte-teilen',
      title: 'Rezepte mit Küchenteam und Brigade teilen | Savour',
      desc: 'Teile Rezepte mit deinem Küchenteam in geteilten Ordnern mit Rechten. Alle arbeiten mit derselben Version, vom Sous-Chef bis zum Praktikanten.',
      h1: 'Rezepte mit deiner Brigade teilen',
      lead: 'Alle in der Küche arbeiten mit derselben Version. Keine Fotos von Fotos mehr im Gruppenchat.',
      sections: [
        ['Geteilte Ordner', 'Lege einen Ordner für deine Küche, deinen Posten oder das neue Menü an und lade dein Team ein. Was du änderst, sehen alle sofort.'],
        ['Rechte pro Person', 'Du verwaltest den Ordner. Dein Sous-Chef oder Chef de Partie kann Rezepte hinzufügen und bearbeiten. Commis und Praktikanten können lesen, aber nichts ändern.'],
        ['Neue Leute schneller eingearbeitet', 'Ein neuer Koch hat am ersten Tag alle Rezepte des Postens auf dem Handy, in der Version, die du freigegeben hast.'],
        ['Einzelne Rezepte teilen', 'Willst du ein Rezept verschicken, etwa an einen Kollegen in einem anderen Restaurant? Teile es mit einem Link.']
      ]
    },
    scale: {
      slug: 'de/rezepte-hochrechnen',
      title: 'Rezepte hochrechnen und umrechnen auf jede Menge | Savour',
      desc: 'Rezepte auf jede Menge hoch- oder herunterrechnen: von einer Verkostung für 8 bis zum Dinner für 120. Savour rechnet jede Menge um.',
      h1: 'Rezepte auf jede Menge hochrechnen',
      lead: 'Von einer Verkostung für 8 bis zum Dinner für 120, ohne Taschenrechner und ohne Fehler.',
      sections: [
        ['In einem Schritt umrechnen', 'Gib die Menge ein, die du brauchst, und Savour rechnet jede Zutat um. Das Originalrezept bleibt, wie es ist.'],
        ['Rechnen in Stück', 'Ein Rezept ergibt 50 Brownies und du brauchst 1.000 für eine Veranstaltung? Gib die Stückzahl ein und du siehst sofort, was du abwiegen musst.'],
        ['Bereit für die Mise en place', 'Drucke das umgerechnete Rezept direkt aus oder öffne es auf dem Handy im Kochmodus.']
      ]
    },
    print: {
      slug: 'de/rezepte-drucken',
      title: 'Rezepte drucken: ganze Rezeptordner auf einmal | Savour',
      desc: 'Drucke einzelne Rezepte oder einen ganzen Rezeptordner auf einmal, sauber gestaltet für den Ordner in der Küche. Mit Savour Pro mit deinem Restaurantlogo.',
      h1: 'Rezepte drucken, auch einen ganzen Ordner auf einmal',
      lead: 'Manchmal funktioniert Papier an der Wand einfach am besten. Dann muss es schnell und sauber gehen.',
      sections: [
        ['Ein ganzer Ordner auf einmal', 'Alle Eisrezepte sollen in den Ordner der Patisserie? Drucke den ganzen Ordner auf einmal, statt fünfzig Dateien einzeln.'],
        ['Ruhiges Layout', 'Titel, Ausbeute, Zutaten und Zubereitung, groß und übersichtlich. Lesbar aus einem Meter Entfernung, auch mit einem Fleck darauf.'],
        ['Immer die neueste Version', 'Weil du aus Savour druckst, hängt immer die Version an der Wand, die jetzt stimmt. Unten steht das Druckdatum, damit du siehst, ob ein Ordner noch aktuell ist.'],
        ['Mit dem Logo deines Restaurants', 'Mit Savour Pro stehen Logo und Name deines Restaurants oben auf jeder Seite. Im Team gilt das Logo für alle. Wähle A4 für den Ordner oder A5 für eine kleine Mappe am Pass.']
      ]
    },
    roadmap: {
      slug: 'de/demnaechst',
      short: 'Kosten pro Rezept, Allergene und der Verlauf jedes Rezepts.',
      title: 'Demnächst in Savour: Kalkulation, Allergene und mehr',
      desc: 'Woran wir arbeiten: Kosten pro Rezept, Allergene pro Gericht, der Verlauf jedes Rezepts und eine App für iPhone und Android.',
      h1: 'Woran wir arbeiten',
      lead: 'Savour wächst mit der Küche. Das steht auf der Roadmap. Fehlt dir etwas? Sag es uns.',
      sections: [
        ['Kosten pro Rezept', 'Sieh, was jedes Gericht und jede Portion kostet und was passiert, wenn sich der Preis eines Produkts ändert.'],
        ['Allergene auf einen Blick', 'Pro Rezept und pro zusammengesetztem Gericht, damit du die Frage eines Gastes sofort am Tisch beantworten kannst.'],
        ['Verlauf jedes Rezepts', 'Sieh, wer was in einem geteilten Rezept geändert hat, und stelle bei Bedarf eine frühere Version wieder her.'],
        ['Eine App für iPhone und Android', 'Savour läuft jetzt im Browser auf jedem Gerät. Eine eigene App ziehen wir in Betracht, und deine Meinung zählt.']
      ]
    }
  },
  audiences: {
    chefs: {
      slug: 'de/fuer-koeche',
      title: 'Rezept-App für Köche, Sous-Chefs und Patissiers | Savour',
      desc: 'Savour ist für Köche in der Profiküche gemacht: Küchenchefs, Sous-Chefs und Patissiers. Alle Rezepturen an einem Ort, genau so, wie du sie geschrieben hast.',
      h1: 'Für Köche',
      lead: 'Ob du die Küche leitest, die Saucen machst oder in der Patisserie arbeitest: Deine Rezepte müssen stimmen und schnell zu finden sein.',
      sections: [
        ['Deine Rezepte, ein Ort', 'Saisonmenüs, Degustationsmenüs, Grundrezepte von vor Jahren. In Savour steht alles in einem Rezeptbuch, geordnet so, wie du arbeitest.'],
        ['Genau, aufs Gramm', 'In der Patisserie ist ein Rezept eine Formel. Savour bewahrt deine Rezepte genau so, wie du sie geschrieben hast, und erfindet nie Mengen. Ist der Leser beim Import unsicher, prüfst du es selbst.'],
        ['Hochrechnen nach Gedecken und Stück', 'Von einer Verkostung für 8 bis zum Dinner für 120, oder von 50 Pralinen auf 800. Savour rechnet alles um.'],
        ['Dein Wissen bleibt', 'Was du über Jahre aufgebaut hast, steht nicht mehr nur in einem Heft oder in deinem Kopf. Es bleibt, auch wenn du die Küche wechselst.']
      ]
    },
    brigade: {
      slug: 'de/fuer-kuechenbrigaden',
      title: 'Rezepte mit deiner Küchenbrigade teilen | Savour',
      desc: 'Savour für Küchenbrigaden: Chefs de Partie, Commis und Praktikanten arbeiten mit denselben Rezepten, auf dem eigenen Handy. Du bestimmst, wer was darf.',
      h1: 'Für Küchenbrigaden',
      lead: 'Vom Chef de Partie bis zum Praktikanten: Dein ganzes Küchenteam kocht nach demselben Rezept, in jedem Restaurant, das du führst.',
      sections: [
        ['Eine Version für alle', 'Passe eine Sauce für das neue Menü an, und alle im geteilten Ordner arbeiten sofort mit der neuen Version.'],
        ['Rechte pro Person', 'Du verwaltest den Ordner. Dein Sous-Chef oder Chef de Partie kann Rezepte hinzufügen und bearbeiten. Commis und Praktikanten können lesen, aber nichts ändern.'],
        ['Auf dem eigenen Handy', 'Kein gemeinsamer Ordner voller Flecken mehr. Jedes Mitglied der Brigade öffnet die Rezepte des Postens auf dem eigenen Handy, mit großer Schrift im Kochmodus.'],
        ['Neue Leute schneller eingearbeitet', 'Praktikanten und neue Köche lesen, wie es hier gemacht wird, statt im Service fragen zu müssen. Mitglied eines geteilten Ordners zu sein ist kostenlos; mit einem Team-Abo hat jeder Savour Pro.']
      ]
    }
  },
  story: {
    slug: 'de/ueber-savour',
    title: 'Über Savour: gebaut von einem Koch, nicht von einer Softwarefirma',
    desc: 'Die Geschichte hinter Savour: fünfzehn Jahre Rezepte auf losen Zetteln, fünfzigmal auf Drucken klicken und eine Rezept-App, gebaut nach dem Service.',
    h1: 'Die Geschichte hinter Savour',
    lead: 'Savour wurde von einem Koch gebaut, nicht von einer Softwarefirma. Aus Frust über Rezepte, die überall waren, nur nicht da, wo man sie brauchte.',
    chapters: [
      ['Fünfzehn Jahre Rezepte auf losen Zetteln', ['Der Koch hinter Savour steht seit fünfzehn Jahren in der Küche, die letzten Jahre als Küchenchef. Die ganze Zeit waren die Rezepte ein Durcheinander: Zettel mit Kaffeeflecken, Fotos auf verschiedenen Handys, von denen manche kaputtgingen, bevor die Rezepte gesichert waren, und Word-Dokumente verstreut über Ordner und Laptops.', 'Das Schwierigste war nicht einmal das Durcheinander selbst, sondern dass nichts an einem Ort war. Genau dann, wenn man ein Rezept brauchte, mitten in der Mise en place oder kurz vor dem Service, war es nirgends zu finden.']],
      ['Fünfzigmal auf Drucken klicken', ['Als Küchenchef gibst du fast jedes Rezept an deine Köche weiter. Als endlich alles in einzelnen Word-Dateien stand, kam das nächste Problem: Der Service musste sie einzeln ausdrucken, weil es keine Möglichkeit gab, fünfzig auf einmal zu drucken.', 'Irgendwo zwischen diesen Papierstapeln entstand die Frage, mit der Savour begann: Warum gibt es dafür nichts, das in einer echten Küche einfach funktioniert?']],
      ['Gebaut nach dem Service', ['Kein Entwickler, sondern ein Koch, der genau weiß, wo es wehtut. Savour wurde Schritt für Schritt gebaut, monatelang, an Wochenenden und nach dem Service.', 'Jede Funktion wurde mit unseren eigenen Rezepten in unserer eigenen Küche getestet: Hunderte Word-Rezepte auf einmal importieren, Fotos von fleckigen Notizen, die aus Versehen auf dem Kopf stehen, und Ordner, die das ganze Team öffnen kann. Ein Koch hat so 1.400 Rezepte in etwa zwei Minuten importiert.']],
      ['Warum Savour 2,99 € kostet', ['Für die schwierigen Fälle, etwa ein Foto einer handschriftlichen Notiz, nutzt Savour KI. Das kostet jedes Mal Geld, deshalb gibt es Savour Pro.', 'Aber Savour sollte für jeden Koch bezahlbar bleiben, nicht nur für große Gruppen mit großem Budget. 2,99 € im Monat sind ungefähr das, was diese KI kostet. Was Savour selbst lesen kann, wie Word und PDF, bleibt kostenlos, genau wie das Speichern von bis zu 100 Rezepten.']],
      ['Was Savour heute kann', ['Dein ganzes Rezeptbuch in wenigen Minuten importieren. Rezepte in Ordnern sortieren, zum Beispiel alle Eisrezepte, und diesen ganzen Ordner mit einem Knopfdruck drucken. Rezepte und Ordner mit Kollegen teilen, die selbst Rezepte hinzufügen können.', 'Und hochrechnen: Ein Rezept ergibt fünfzig Brownies und du brauchst tausend? Savour rechnet. Am Computer, auf dem Tablet und auf dem Handy in der Küche.']],
      ['Was wir noch bauen wollen', ['Kosten pro Rezept und Allergene auf einen Blick stehen ganz oben auf der Liste. Wenn Savour auf Computer, Tablet und Handy gut läuft, prüfen wir, ob sich eine eigene App für iPhone und Android lohnt.', 'Das entscheiden wir nicht am Schreibtisch, sondern gemeinsam mit den Köchen, die Savour nutzen. Fehlt dir etwas in deiner Küche? Sag es uns.']]
    ],
    notesCaption: 'Einige der Notizen, mit denen Savour begann.',
    appCaption: 'Dieselbe Art Rezept, jetzt in Savour.',
    roadmapLink: 'Sieh, woran wir arbeiten',
    valuesTitle: 'Wofür wir stehen',
    values: [
      ['Ein Rezept muss stimmen', 'Savour erfindet nie Mengen oder Schritte. Im Zweifel siehst du es und entscheidest du.'],
      ['Dein Wissen gehört dir', 'Wenn du Pro irgendwann beendest, bleiben alle deine Rezepte einfach erhalten.'],
      ['Gemacht für die Küche', 'Schnell, ruhig und lesbar, auch mit nassen Händen mitten im Service.']
    ]
  },
  posts: {
    'en/blog/recipe-management-for-restaurants': {
      slug: 'de/blog/rezeptverwaltung-gastronomie',
      title: 'Rezeptverwaltung in der Gastronomie: wo du anfängst',
      desc: 'Rezeptverwaltung für Restaurants, Hotels und Catering: wie du Rezepturen an einem Ort hältst, mit deinem Küchenteam teilst und aktuell hältst.',
      h1: 'Rezeptverwaltung in der Gastronomie: wo du anfängst',
      lead: 'In den meisten Restaurants ist Rezeptverwaltung kein System, sondern eine Sammlung: Ordner, Dateien, Fotos und das, was der Küchenchef im Kopf hat. Das geht gut, bis jemand geht oder das Menü wechselt.',
      sections: [
        ['Was ist Rezeptverwaltung?', 'Rezeptverwaltung heißt: Jedes Rezept deines Restaurants steht an einem Ort, in einem festen Format, und alle in der Küche nutzen dieselbe Version. Es geht nicht um ausgefallene Software, sondern um Absprachen: wo es steht, wer es ändern darf und wie man es findet.'],
        ['Schritt 1: Sammle, was du hast', 'Fang nicht mit einem leeren System an. Sammle deine Word-Dateien, PDFs und Notizen und importiere sie auf einmal. Eine Rezept-App, die Rezepte selbst erkennt, spart wochenlanges Abtippen.'],
        ['Schritt 2: Wähle eine Struktur', 'Wähle eine Struktur, die zu deinem Restaurant passt: nach Posten, nach Menü oder Grundrezepte getrennt von den Gerichten. Halte es einfach; erweitern kannst du später immer noch. Beispiele findest du in unserem Artikel über das Ordnen von Rezeptordnern.'],
        ['Schritt 3: Lege fest, wer was darf', 'Vereinbare, wer Rezepte ändern darf, meist Küchenchef und Sous-Chef, und lass den Rest des Teams nur lesen. So verhinderst du drei Versionen derselben Sauce.'],
        ['Schritt 4: Mach es in der Küche einfach', 'Rezeptverwaltung funktioniert nur, wenn sie in der Küche schneller ist als der alte Zettel. Rezepte müssen sich auf dem Handy in großer Schrift öffnen lassen, und ein ganzer Ordner muss sich auf einmal drucken lassen.'],
        ['Mehrere Restaurants oder Standorte', 'Führst du mehrere Restaurants oder ein Catering? Lege pro Standort einen geteilten Ordner mit denselben Grundrezepten an. Eine Änderung am Grundrezept stimmt dann überall gleichzeitig.']
      ],
      outro: 'Savour ist für die Rezeptverwaltung in Profiküchen gebaut: importieren, ordnen, mit dem Küchenteam teilen und drucken.'
    },
    'en/blog/shared-recipe-book-kitchen-team': {
      slug: 'de/blog/gemeinsames-rezeptbuch-kuechenteam',
      title: 'Was ein gemeinsames Rezeptbuch für dein Küchenteam bewirkt',
      desc: 'Eine Version jedes Rezepts für alle in der Küche. Was das für Ruhe, Qualität und Einarbeitung bedeutet, und wie du es einrichtest.',
      h1: 'Was ein gemeinsames Rezeptbuch für dein Küchenteam bewirkt',
      lead: 'In vielen Küchen steht das wichtigste Rezept im Kopf einer einzigen Person. Wenn diese Person im Urlaub ist, schmeckst du es auf dem Teller.',
      sections: [
        ['Weniger Fragen im Service', 'Wenn jeder das Rezept auf dem eigenen Handy öffnen kann, muss niemand mitten im Service fragen, wie viel Estragon in die Béarnaise gehört. Der Küchenchef hat Hände und Kopf frei für den Pass.'],
        ['Jeden Tag derselbe Teller', 'Drei Versionen derselben Sauce entstehen von selbst: Jemand ändert etwas und schreibt es auf den eigenen Zettel. Mit einem gemeinsamen Rezept ist die neueste Version immer die einzige Version. Das merkst du an der Gleichmäßigkeit, auch am vollsten Abend.'],
        ['Verantwortung ohne Chaos', 'Nicht jeder muss alles ändern können. Gib deinem Sous-Chef oder Chef de Partie das Recht, Rezepte zu bearbeiten, und lass Commis und Praktikanten nur lesen. Das Rezeptbuch bleibt das der Küche, nicht das von dem, der es zuletzt angefasst hat.'],
        ['Wissen, das bleibt', 'Wenn ein Koch geht, geht das Wissen nicht mit. Was im geteilten Ordner steht, gehört der Küche. Für einen neuen Koch ist es der schnellste Weg zu lernen, wie es hier gemacht wird.'],
        ['So fängst du an', 'Fang klein an: ein geteilter Ordner mit den Grundrezepten, die alle täglich nutzen, wie Fonds, Saucen und Standardgarnituren. Lade dein Team ein und vereinbare, wer was ändern darf. Erweitere dann pro Posten oder pro Menü.']
      ],
      outro: 'In Savour legst du geteilte Ordner mit den Rechten an, die du wählst. Mitglied eines geteilten Ordners zu sein ist kostenlos.'
    },
    'en/blog/recipe-folder-examples': {
      slug: 'de/blog/rezeptordner-ordnen-beispiele',
      title: 'Rezeptordner ordnen: fünf Beispiele aus echten Küchen',
      desc: 'Nach Posten, nach Menü, Grundrezepte getrennt, Patisserie oder Veranstaltungen: fünf Arten, deine Rezeptordner zu ordnen, und wann welche passt.',
      h1: 'Rezeptordner ordnen: fünf Beispiele aus echten Küchen',
      lead: 'Es gibt keine Struktur, die für jede Küche passt. Einige haben sich in der Praxis aber bewährt. Wähle, was zu deinem Küchenalltag passt.',
      sections: [
        ['1. Nach Posten', 'Garde-manger, Saucier, Entremetier, Patisserie. Im Service öffnet jeder nur, was sein Posten braucht. Passt gut in Küchen mit fester Brigade und festen Posten.'],
        ['2. Nach Menü oder Saison', 'Ein Ordner für das Mittagsmenü, einer für das Degustationsmenü, einer für das Herbstmenü. Praktisch, wenn dein Menü oft wechselt. Verschiebe alte Menüs nach der Saison in einen Archivordner, damit dein aktuelles Buch übersichtlich bleibt.'],
        ['3. Grundrezepte getrennt von den Gerichten', 'Ein Ordner mit der Basis, die sich selten ändert, wie Fonds, Jus, Teige und Grundsaucen, und Ordner für die Gerichte, die darauf aufbauen. Änderst du die Kalbsjus einmal, stimmt sie überall.'],
        ['4. Patisserie nach Komponente', 'Teige, Cremes, Eis und Sorbet, Glasuren, Dekoration und Pralinen. In der Patisserie suchst du oft nach Komponente, nicht nach Gericht. Ein Rezept kann in mehreren Ordnern stehen: deine Crème pâtissière gehört zu den Cremes und zum Dessert, in dem sie steckt.'],
        ['5. Nach Veranstaltung oder Kunde', 'Für Catering und Bankett: ein Ordner pro Veranstaltung oder Stammkunde, mit genau den Rezepten, die an dem Tag gemacht werden. Rechne sie auf die Gästezahl hoch und drucke den ganzen Ordner auf einmal für die Küche.'],
        ['Ordner mit Kategorien kombinieren', 'Nutze Kategorien für das, was ein Rezept ist (Sauce, Garnitur, Dessert), und Ordner für den Einsatz. So kannst du immer auf zwei Wegen suchen, ohne dass ein Rezept doppelt existiert.']
      ],
      outro: 'In Savour legst du eigene Ordner und Kategorien an, und ein Rezept kann in mehreren Ordnern zugleich stehen.'
    },
    'en/blog/sharing-recipes-with-your-team': {
      slug: 'de/blog/rezepte-mit-team-teilen',
      title: 'Rezepte mit deinem Team teilen, ohne Fotos von Fotos',
      desc: 'Rezepte im Gruppenchat teilen führt zu unscharfen Fotos und alten Versionen. So teilst du Rezepte und Ordner mit deinem Team, mit den richtigen Rechten.',
      h1: 'Rezepte mit deinem Team teilen, ohne Fotos von Fotos',
      lead: 'Ein Foto eines Rezepts, weitergeleitet im Gruppenchat, noch einmal vom Bildschirm abfotografiert. Kommt dir bekannt vor. Und niemand weiß, welche Version stimmt.',
      sections: [
        ['Einen ganzen Ordner teilen', 'Lege einen geteilten Ordner an, zum Beispiel „Saucier“ oder „Herbstmenü“, und lade deine Kollegen ein. Alle sehen dieselben Rezepte, und eine Änderung ist sofort für alle sichtbar.'],
        ['Bestimme, was jeder darf', 'Es gibt drei Rollen. Der Eigentümer verwaltet den Ordner. Ein Bearbeiter kann Rezepte hinzufügen und ändern. Ein Leser kann alles lesen, aber nichts ändern. Du entscheidest, wer die Rezepte anfasst.'],
        ['Ein einzelnes Rezept schicken', 'Willst du ein Rezept teilen, etwa mit einem Kollegen in einem anderen Restaurant oder einem Lieferanten? Teile es mit einem Link. Der Empfänger sieht das Rezept sauber, ohne Konto.'],
        ['Kollegen, die mitbauen', 'Ein geteilter Ordner muss nicht nur von dir kommen. Gib deinem Sous-Chef Bearbeitungsrechte und lass das Team selbst Rezepte hinzufügen. Das Rezeptbuch wächst mit der Küche.'],
        ['Was es kostet', 'Mitglied eines geteilten Ordners zu sein ist kostenlos. Selbst einen geteilten Ordner anzulegen ist Teil von Savour Pro. Mit einem Team-Abo hat jeder in deiner Küche Pro.']
      ],
      outro: 'Geteilte Ordner mit Rollen findest du in Savour unter „Geteilte Ordner“.'
    },
    'en/blog/roadmap': {
      slug: 'de/blog/roadmap',
      title: 'Roadmap: woran wir bei Savour arbeiten',
      desc: 'Kosten pro Rezept, Allergene, der Verlauf jedes Rezepts und vielleicht eine App für iPhone und Android. Was geplant ist und wie wir entscheiden, was zuerst kommt.',
      h1: 'Roadmap: woran wir arbeiten',
      lead: 'Savour wird von einem Koch für Köche gebaut. Das heißt auch: Wir bauen, was die Küche wirklich braucht, nicht was in einer Präsentation gut klingt.',
      sections: [
        ['Kosten pro Rezept', 'Sieh, was ein Gericht und eine Portion kosten und was passiert, wenn der Preis eines Produkts steigt. Das ist die meistgewünschte Funktion und steht ganz oben.'],
        ['Allergene auf einen Blick', 'Pro Rezept und pro zusammengesetztem Gericht, damit du die Frage eines Gastes am Tisch beantworten kannst, ohne in die Küche zu laufen.'],
        ['Verlauf jedes Rezepts', 'Sieh, wer was in einem geteilten Rezept geändert hat, und stelle bei Bedarf eine frühere Version wieder her. Drucken mit eigenem Logo ist bereits fertig und Teil von Savour Pro.'],
        ['Eine App für iPhone und Android', 'Savour läuft jetzt im Browser auf Computer, Tablet und Handy, ohne Installation. Eine eigene App ziehen wir in Betracht. Ob sich das lohnt, hängt davon ab, was Köche sagen.'],
        ['Wie wir entscheiden', 'Wir schauen, was Köche uns sagen und was in der Küche am meisten Zeit spart. Hast du eine Idee oder fehlt dir etwas? Schreib uns an contact@savour.page. Wir lesen alles.']
      ],
      outro: 'Diese Roadmap ist eine Richtung, kein Versprechen mit Terminen. Wir halten sie hier aktuell.'
    },
    'en/blog/onboarding-new-cooks': {
      slug: 'de/blog/neue-koeche-einarbeiten',
      title: 'Einen neuen Koch mit Standardrezepten einarbeiten',
      desc: 'Die ersten Wochen eines neuen Kochs kosten die ganze Brigade Zeit. Mit festen, geteilten Rezepten geht die Einarbeitung schneller und ruhiger.',
      h1: 'Einen neuen Koch mit Standardrezepten einarbeiten',
      lead: 'Ein neuer Koch will es richtig machen, weiß aber noch nicht, wie es hier läuft. Jede Frage im Service kostet jemand anderen Aufmerksamkeit.',
      sections: [
        ['Gib die Rezepte vor der ersten Schicht', 'Füge einen neuen Koch als Leser zum geteilten Ordner des Postens hinzu. Er kann zu Hause lesen, was gemacht wird und wie, in der Version, die du freigegeben hast.'],
        ['Lass vom Handy kochen', 'Im Kochmodus steht das Rezept in großer Schrift auf dem Bildschirm. Abhaken, was erledigt ist, scrollen mit nassen Händen. Kein fettiger Ausdruck, der mitten im Service unlesbar ist.'],
        ['Eine Arbeitsweise', 'Wer nach einem Standardrezept lernt, lernt die Art deiner Küche. Nicht die seines vorherigen Restaurants oder die des Kollegen, der zufällig daneben stand.'],
        ['Frag nach Rückmeldung', 'Neue sehen, was Stammkräfte nicht mehr sehen: eine Menge, die nicht stimmt, ein Schritt, der fehlt. Lass sie es melden und passe das Rezept für alle an.']
      ],
      outro: 'In Savour fügst du neue Köche mit Leserechten zu einem geteilten Ordner hinzu. Für sie ist das kostenlos.'
    },
    'en/blog/scaling-recipes-without-errors': {
      slug: 'de/blog/rezepte-hochrechnen-ohne-fehler',
      title: 'Rezepte hochrechnen ohne Rechenfehler',
      desc: 'Von 8 auf 120 Gedecke oder von 50 auf 1.000 Stück. Wo das Hochrechnen schiefgeht und wie du es zuverlässig machst.',
      h1: 'Rezepte hochrechnen ohne Rechenfehler',
      lead: 'Hochrechnen sieht einfach aus: alles mal fünfzehn. Bis du um fünf Uhr nachmittags merkst, dass die Gelatine nicht mitgerechnet wurde.',
      sections: [
        ['Wo es schiefgeht', 'Kopfrechnen unter Druck, gemischte Einheiten (Gramm, Deziliter, Stück) und das Original, das mit der hochgerechneten Version überschrieben wird. Danach weiß niemand mehr, was das Grundrezept war.'],
        ['Rechne von der Ausbeute aus', 'Notiere bei jedem Rezept, was es ergibt: 0,5 Liter, 40 Portionen oder 50 Stück. Dann rechnest du nicht „mal fünfzehn“, sondern mit dem, was du brauchst.'],
        ['Behalte das Original', 'Rechne eine Kopie hoch oder nur auf dem Bildschirm. Das Grundrezept bleibt genau so, wie es war, für das nächste Mal.'],
        ['Vorsicht bei Gelen und Teigen', 'Gelatine, Agar, Triebmittel und Salz lassen sich in der Praxis nicht immer eins zu eins hochrechnen, vor allem bei großen Mengen. Probiere und teste eine große Charge immer, bevor du dich darauf verlässt.']
      ],
      outro: 'In Savour gibst du die gewünschte Menge ein und Savour rechnet jede Zutat um. Das Originalrezept bleibt, wie es ist.'
    },
    'en/blog/from-word-to-recipe-book': {
      slug: 'de/blog/von-word-zum-rezeptbuch',
      title: 'Vom Word-Dokument zum Rezeptbuch in wenigen Minuten',
      desc: 'Hunderte Rezepte in einer Word-Datei? Wie Savour sie liest, was der Leser erkennt und bereinigt und wann du prüfen musst.',
      h1: 'Vom Word-Dokument zum Rezeptbuch in wenigen Minuten',
      lead: 'Viele Köche haben sie schon: eine große Word-Datei mit Rezepten aus Jahren. Abtippen dauert Wochen. Das muss nicht sein.',
      sections: [
        ['Datei hineinziehen', 'Wähle deine Word-Datei oder dein PDF in Savour. Der Savour-Leser geht das ganze Dokument durch und teilt es selbst in einzelne Rezepte auf, auch wenn es Hunderte sind.'],
        ['Was der Leser erkennt', 'Titel, auch fett oder nummeriert, Zutaten mit Menge und Einheit und die Zubereitung in Schritten. Nummern vor Titeln und kleine Tippfehler wie 18oc statt 180 °C werden bereinigt.'],
        ['Wenn der Leser unsicher ist', 'Nicht jedes Dokument ist sauber formatiert. Ist der Leser bei einem Rezept unsicher, wird es markiert und du prüfst es selbst, bevor es gespeichert wird. Mit Savour Pro liest die KI diese Zweifelsfälle automatisch.'],
        ['Wie schnell es geht', 'Ein Koch hat so 1.400 Rezepte aus Word in etwa zwei Minuten importiert. Danach kannst du sie sofort in Ordner legen, ergänzen und teilen.'],
        ['Kostenlos oder Pro', 'Word, PDF und Text importierst du kostenlos mit dem Savour-Leser, bis zu 100 Rezepte. Mit Savour Pro speicherst du unbegrenzt Rezepte und die KI liest auch Fotos und handschriftliche Notizen.']
      ],
      outro: 'Das Importieren findest du in Savour unter „Rezept hinzufügen“.'
    },
    'en/blog/ai-should-never-invent-recipes': {
      slug: 'de/blog/ki-darf-rezepte-nicht-erfinden',
      title: 'Warum KI deine Rezepte nie erfinden darf',
      desc: 'KI kann Handschrift lesen und unordentliche Dokumente aufräumen. Aber ein Rezept muss stimmen. Warum Savour im Zweifel anhält, statt zu raten.',
      h1: 'Warum KI deine Rezepte nie erfinden darf',
      lead: 'KI ist gut darin, auszufüllen, was wahrscheinlich dasteht. In der Küche ist „wahrscheinlich“ nicht gut genug.',
      sections: [
        ['Das Problem mit dem Raten', 'Liest du ein unscharfes Foto einer Notiz, könntest du raten, dass dort 150 Gramm Zucker steht. Waren es aber 150 Gramm Glukose, stimmt dein Marshmallow nicht mehr. Eine kluge Vermutung sieht genauso überzeugend aus wie die richtige Antwort.'],
        ['Was Savour anders macht', 'Savour erfindet nie Mengen, Zutaten oder Schritte. Steht die Zubereitung nicht auf der Notiz, steht sie auch nicht im Rezept. Du ergänzt sie selbst.'],
        ['Zweifel sichtbar machen', 'Wenn der Leser oder die KI unsicher ist, siehst du es. Das Rezept wird markiert und du prüfst es, bevor es gespeichert wird. Lieber eine Frage an dich als ein Fehler auf dem Teller.'],
        ['Der Koch entscheidet', 'KI ist ein Werkzeug, um schneller zu arbeiten, kein Ersatz für Handwerk. Das letzte Wort über ein Rezept hat immer der Koch, der es gemacht hat.']
      ],
      outro: 'Das ist einer der Grundwerte von Savour: Ein Rezept muss stimmen.'
    },
    'en/blog/digitise-old-recipe-notes': {
      slug: 'de/blog/alte-rezeptnotizen-digitalisieren',
      title: 'Alte Rezeptnotizen digitalisieren: so rettest du deine Hefte',
      desc: 'Handschriftliche Rezepte verblassen und gehen verloren. So machst du aus alten Heften Schritt für Schritt ein digitales Rezeptbuch, ohne alles abzutippen.',
      h1: 'Alte Rezeptnotizen digitalisieren: so rettest du deine Hefte',
      lead: 'Fast jeder Koch hat sie: Hefte aus der Ausbildung, lose fleckige Blätter, Fotos von einem Whiteboard. So sorgst du dafür, dass dieses Wissen nicht verloren geht.',
      sections: [
        ['Fang mit dem an, was du wirklich nutzt', 'Versuch nicht, alles an einem Wochenende zu schaffen. Fang mit den Rezepten an, die du diesen Monat brauchst: die Grundsaucen, die Fonds, die Teile deines aktuellen Menüs. Der Rest folgt, wenn du danach suchst.'],
        ['Mach gute Fotos', 'Fotografiere bei Tageslicht, gerade von oben, eine Seite pro Foto. Ein Fleck oder eine schiefe Ecke ist kein Problem, ein Schatten über dem Text schon. Leg das Papier flach auf eine dunkle Unterlage.'],
        ['Lesen lassen, nicht abtippen', 'Abtippen dauert schnell zehn Minuten pro Rezept und bringt neue Tippfehler. Mit einer App, die Handschrift liest, wie Savour, machst du aus dem Foto ein Rezept mit Zutaten und Zubereitung. Wichtig: Prüfe immer die Mengen. Eine gute App erfindet nichts und zeigt, wo sie unsicher ist.'],
        ['Gib jedem Rezept dieselbe Form', 'Titel, Ausbeute, Zutaten mit Menge und Einheit und die Zubereitung in Schritten. Wenn alle Rezepte dieselbe Struktur haben, kann jeder in der Brigade sie lesen, ohne deine Handschrift zu kennen.'],
        ['Bewahre das Original', 'Wirf das Heft nicht weg. Füge das Foto gern dem Rezept hinzu. Das Original erzählt manchmal mehr als das Rezept selbst: eine Notiz am Rand, ein Datum, ein Name.']
      ],
      outro: 'Savour liest Word, PDF und Fotos handschriftlicher Rezepte und macht daraus ein Rezeptbuch.'
    },
    'en/blog/organising-recipes-in-the-kitchen': {
      slug: 'de/blog/rezepte-organisieren-spitzengastronomie',
      title: 'Rezepte organisieren in der Spitzengastronomie',
      desc: 'Wie ordnest du Hunderte Rezepte so, dass jeder in der Brigade sie schnell findet? Eine praktische Struktur mit Ordnern und Kategorien.',
      h1: 'Rezepte organisieren in der Spitzengastronomie',
      lead: 'Eine Küche mit wechselndem Menü hat schnell Hunderte Rezepte. Ohne feste Struktur findet niemand etwas, außer dem, der es aufgeschrieben hat.',
      sections: [
        ['Grundrezepte getrennt vom Menü', 'Halte Grundrezepte (Fonds, Jus, Teige, Grundsaucen) getrennt von den Gerichten auf der Karte. Die Basis ändert sich selten, das Menü jede Saison. Ein Gericht verweist auf die Basis, statt sie zu wiederholen.'],
        ['Nach Posten ordnen', 'Wenn du mit Posten arbeitest, lege pro Posten einen Ordner an: Garde-manger, Saucier, Patisserie. Im Service öffnet jeder nur, was sein Posten braucht.'],
        ['Kategorien zum Suchen, Ordner zum Arbeiten', 'Nutze Kategorien für das, was ein Rezept ist (Sauce, Garnitur, Dessert), und Ordner für den Einsatz (Mittagsmenü, Degustationsmenü, Veranstaltung). Ein Rezept kann in mehreren Ordnern stehen, ohne doppelt zu existieren.'],
        ['Ein Verantwortlicher pro Rezept', 'Vereinbare, wer ein Rezept ändern darf. So verhinderst du drei Versionen derselben Sauce. In einer App mit Rechten, wie Savour, verwaltet der Küchenchef den Ordner und der Rest liest mit.'],
        ['Nach jeder Saison aufräumen', 'Verschiebe alte Menüs in einen Archivordner, statt sie zu löschen. Dein aktuelles Buch bleibt übersichtlich und du verlierst nichts.']
      ],
      outro: 'In Savour legst du eigene Ordner und Kategorien an und teilst Ordner mit deiner Brigade, mit den Rechten, die du wählst.'
    },
    // ---- Neue Artikel (in allen vier Sprachen) ----
    'en/blog/standardised-recipes': {
      slug: 'de/blog/standardrezepturen-gastronomie',
      title: 'Standardrezepturen: warum jede Küche sie braucht',
      desc: 'Was eine Standardrezeptur ist, was hineingehört und warum sie für Gleichmäßigkeit, Einarbeitung und Kalkulation in der Profiküche den Unterschied macht.',
      h1: 'Standardrezepturen: warum jede Küche sie braucht',
      lead: 'Eine Standardrezeptur ist nichts für Kantinen. Gerade in einer Küche mit hohem Anspruch sorgt sie dafür, dass jeder Teller schmeckt wie gedacht, egal wer am Posten steht.',
      sections: [
        ['Was eine Standardrezeptur ist', 'Eine Standardrezeptur ist die festgelegte Version eines Rezepts, nach der alle arbeiten. Kein Spickzettel, sondern die Absprache der Küche: so machen wir das hier.'],
        ['Was hineingehört', 'Mindestens ein klarer Titel, die Ausbeute (zum Beispiel 2 Liter oder 40 Portionen), alle Zutaten mit Menge und Einheit und die Zubereitung in Schritten. Gut zu ergänzen: kritische Punkte wie Temperaturen und Garzeiten und ein Foto des fertigen Produkts.'],
        ['Gleichmäßigkeit auf dem Teller', 'Wenn jeder nach derselben Rezeptur arbeitet, schmeckt die Sauce am Dienstag genauso wie am Samstag. Abweichungen fallen auf, weil es eine feste Basis gibt, mit der man vergleichen kann.'],
        ['Schneller einarbeiten', 'Neue Köche lernen die Art deiner Küche aus den Rezepturen, statt aus Fragen im Service. Das spart dem Rest der Brigade Zeit und Nerven.'],
        ['Hochrechnen und kalkulieren', 'Mit einer festen Ausbeute kannst du zuverlässig hoch- und herunterrechnen. Und sobald die Mengen stimmen, ist sie auch die Grundlage für die Kalkulation pro Portion.'],
        ['So fängst du an', 'Fang mit den Grundrezepten an, die täglich gemacht werden: Fonds, Saucen, Teige. Lege sie in einem festen Format an, an einem Ort, den alle öffnen können, und vereinbare, wer sie ändern darf.']
      ],
      outro: 'In Savour hat jedes Rezept dieselbe Form: Titel, Ausbeute, Zutaten und Zubereitung. Teile deine Rezepturen mit der Brigade in einem geteilten Ordner.'
    },
    'en/blog/recipe-book-with-your-logo': {
      slug: 'de/blog/rezeptbuch-mit-eigenem-logo',
      title: 'Ein Rezeptbuch mit dem Logo deines Restaurants drucken',
      desc: 'Rezepte und ganze Ordner drucken mit Logo und Name deines Restaurants, A4 oder A5, mit Druckdatum. Für den Ordner in der Küche oder für die Ausbildung.',
      h1: 'Ein Rezeptbuch mit dem Logo deines Restaurants',
      lead: 'Auch mit allen Rezepten auf dem Handy bleibt Papier in vielen Küchen wichtig. Dann soll es auch nach deinem Restaurant aussehen.',
      sections: [
        ['Dein Logo und Name auf jeder Seite', 'Mit Savour Pro stellst du einmal Logo und Name deines Restaurants ein. Danach stehen sie oben auf jeder gedruckten Seite: das Logo links, der Name in der Mitte. Für Küchendrucker kannst du das Logo in Schwarzweiß drucken lassen.'],
        ['Für das ganze Team', 'Mit einem Team-Abo gilt das Logo des Eigentümers für alle im Team. Jeder druckt also im selben Stil, wer auch immer druckt. Bei einem geteilten Ordner gilt das Logo des Restaurants, das den Ordner verwaltet.'],
        ['Ein ganzer Ordner als Buch', 'Druckst du einen Ordner, kannst du ein Deckblatt mit Logo, Ordnername und Inhaltsverzeichnis hinzufügen. Wähle A4 für den Küchenordner oder A5 für eine kleine Mappe am Pass.'],
        ['Immer erkennbar aktuell', 'Unten auf jeder Seite steht das Druckdatum. So sieht jeder in der Küche, ob eine Mappe noch die neueste Version ist. Kopf- und Fußzeilen des Browsers fallen weg, damit die Seite ruhig bleibt.'],
        ['Selbst wählen, was du druckst', 'In einem geteilten Ordner wählst du vor dem Drucken selbst die Rezepte aus, nach Ordnern gruppiert. Also nur das, was für diesen Posten oder diese Veranstaltung gebraucht wird.']
      ],
      outro: 'Drucken mit eigenem Logo ist Teil von Savour Pro. Einstellen kannst du es unter Einstellungen → Abo und Team.'
    },
    'en/blog/recipes-without-wifi': {
      slug: 'de/blog/rezepte-ohne-wlan',
      title: 'Rezepte ohne WLAN: offline arbeiten in der Küche',
      desc: 'Im Kühlhaus, im Keller oder bei einer Veranstaltung ist das WLAN oft weg. So öffnest du deine Rezepte trotzdem, auch ohne Internet.',
      h1: 'Rezepte ohne WLAN: offline arbeiten in der Küche',
      lead: 'Küchen sind schlecht für WLAN: Stahl, Kühlräume, Keller. Und gerade dann, wenn du ein Rezept brauchst, lädt nichts.',
      sections: [
        ['Savour als App installieren', 'Du brauchst keinen App Store. Öffne savour.page und füge es zum Startbildschirm hinzu: auf dem iPhone über Teilen → Zum Home-Bildschirm, auf Android über das Menü → App installieren, am Computer über das Symbol in der Adressleiste.'],
        ['Einmal online öffnen', 'Melde dich einmal mit Internet an, mit angehaktem „Angemeldet bleiben“, und öffne deine Rezepte. Savour speichert deine Bibliothek dann auf dem Gerät.'],
        ['Ohne Verbindung', 'Fällt das WLAN aus, öffnest du Savour über das Symbol auf deinem Startbildschirm. Du siehst deine zuletzt gespeicherten Rezepte, mit einem Hinweis, dass du offline bist. Nachschlagen und kochen geht einfach weiter.'],
        ['Was offline nicht geht', 'Ändern und Importieren brauchen eine Verbindung, damit alle im Team dieselbe Version behalten. Sobald die Verbindung zurück ist, lädt Savour von selbst neu.'],
        ['Gemeinsame Küchencomputer', 'Auf einem Computer, den mehrere Leute nutzen, lässt du „Angemeldet bleiben“ aus. Dann speichert Savour bewusst nichts auf dem Gerät und du bist abgemeldet, sobald das Fenster geschlossen wird.']
      ],
      outro: 'Offline arbeiten ist in jedem Savour-Konto enthalten, kostenlos und mit Pro.'
    },
    'en/blog/choosing-a-recipe-app': {
      slug: 'de/blog/rezept-app-gastronomie-waehlen',
      title: 'Rezept-App für die Gastronomie wählen: darauf achten',
      desc: 'Sieben Fragen, die du einer Rezept-App für dein Restaurant stellen solltest: Import, Genauigkeit, Handy, Team, Drucken, offline und was mit deinen Rezepten passiert.',
      h1: 'Eine Rezept-App für die Gastronomie wählen',
      lead: 'Viele Rezept-Apps sind für Hobbyköche gemacht. In der Profiküche gelten andere Anforderungen. Diese sieben Fragen helfen dir bei der Wahl.',
      sections: [
        ['1. Bekommst du deine bestehenden Rezepte hinein?', 'Eine App, in der du alles abtippen musst, benutzt am Ende niemand. Prüfe, ob du Word, PDF und Fotos handschriftlicher Rezepte auf einmal importieren kannst.'],
        ['2. Bleibt dein Rezept genau, wie es war?', 'Frag, was die App macht, wenn sie unsicher ist. Eine gute App erfindet keine Mengen oder Schritte, sondern zeigt dir, was du prüfen musst.'],
        ['3. Funktioniert sie auf dem Handy in der Küche?', 'Große Schrift, schnell suchen, mit nassen Händen bedienbar. Probiere es mitten in deiner eigenen Mise en place, nicht am Schreibtisch.'],
        ['4. Kannst du mit Rechten teilen?', 'Das Team muss lesen können, aber nicht jeder muss alles ändern dürfen. Achte auf Rollen wie Eigentümer, Bearbeiter und Leser.'],
        ['5. Kannst du sauber drucken?', 'Ein ganzer Ordner auf einmal, ruhig gestaltet, am liebsten mit dem Logo deines Restaurants.'],
        ['6. Was passiert ohne Internet?', 'Kühlräume und Keller haben selten gutes WLAN. Prüfe, ob du deine Rezepte offline öffnen kannst.'],
        ['7. Was passiert mit deinen Rezepten, wenn du kündigst?', 'Deine Rezepte sind dein Wissen. Lies nach, ob du sie behältst, wenn du aufhörst zu zahlen. Bei Savour bleibt alles einfach stehen.']
      ],
      outro: 'Savour kannst du kostenlos mit bis zu 100 Rezepten testen, mit 7 Tagen Savour Pro. Keine Zahlungsdaten nötig.'
    }
  }
};
