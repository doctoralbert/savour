// Handbuch (Duits), Abschnitt „In der Küche“.

export const groups = {
  keuken: {
    name: 'In der Küche',
    intro: 'Auf jede Ausbeute umrechnen, der Kochmodus mit großer Schrift, deine Rezepte ohne Internet, MEP-Listen und Allergene.'
  }
};

export const pages = {
  omrekenen: {
    slug: 'de/handbuch-umrechnen',
    menu: 'Umrechnen mit den Schnellknöpfen',
    h1: 'Umrechnen',
    title: 'Rezepte umrechnen und hochrechnen in Savour | Handbuch',
    desc: 'So rechnest du ein Rezept in Savour um: Schnellknöpfe von ¼× bis 10×, zurück zum Original, umgerechnet drucken und warum das gespeicherte Rezept sich nie ändert.',
    lead: 'Von 8 Gedecken auf 120 mit einem Tipp, ohne Rechenfehler.',
    sections: [
      ['Schnellknöpfe', 'Unter jedem Rezept mit Zutaten steht „Umrechnen“ mit den Knöpfen ¼×, ½×, 1½×, 2×, 3×, 4×, 5× und 10×. Ein Tipp, und alle Mengen sind umgerechnet, in allen [Teilen](#recept-delen) des Rezepts.'],
      ['Zurück zum Original', 'Mit „Original“ siehst du wieder die ursprünglichen Mengen.'],
      ['Ein anderer Faktor oder eine Ausbeute', 'Brauchst du 2,5× oder genau 3,5 Liter? Oder hast du noch 3 kg von einer Zutat? Dann wähle ⋯ „Mehr umrechnen“. Siehe [Mehr umrechnen](#omrekenen-meer).'],
      ['Das Original ändert sich nie', 'Umrechnen ändert nur, was du auf dem Bildschirm siehst. Das gespeicherte Rezept bleibt genau so, wie es war, auch für dein Team.'],
      ['Umgerechnet drucken', 'Druckst du ein umgerechnetes Rezept, druckst du die umgerechneten Mengen. Siehe [Ein Rezept drucken](#printen).'],
      ['Auch ohne Konto', 'Wer ein [geteiltes Rezept](#delen-link) öffnet, kann es auch ohne Konto umrechnen.'],
      ['Abschmecken bleibt nötig', 'Nicht alles skaliert eins zu eins. Worauf du achtest, liest du in [Hochrechnen ohne Fehler](#tips-opschalen).']
    ]
  },
  'omrekenen-meer': {
    slug: 'de/handbuch-mehr-umrechnen',
    menu: 'Mehr umrechnen: Faktor, Ausbeute, ich habe',
    title: 'Umrechnen mit eigenem Faktor, Ausbeute oder „Ich habe“ | Handbuch Savour',
    desc: 'So rechnest du in Savour mit eigenem Faktor wie 2,5 um, auf eine gewünschte Ausbeute wie 3,5 Liter oder von dem aus, was du von einer Zutat noch hast.',
    lead: 'Drei Wege, genau auf das zu kommen, was du brauchst.',
    sections: [
      ['Wo', 'Öffne das Rezept, wähle ⋯ und „Mehr umrechnen“. Du wählst einen von drei Wegen. Was du in ein Feld einträgst, leert die anderen.'],
      ['Faktor', 'Trag eine eigene Zahl ein, etwa 2,5 oder 0,75. Jede Zutat wird mit dieser Zahl multipliziert.'],
      ['Ausbeute', 'Trag die Menge ein, die du brauchst. Das geht, wenn das Rezept eine [Ausbeute](#recept-opbrengst) hat. Ist das Rezept für 1 Liter und brauchst du 3,5 Liter, trag 3,5 ein.'],
      ['Ich habe', 'Hast du noch 3,2 kg von einer Zutat, etwa ein eingekauftes Stück Fleisch oder einen Rest Fond? Wähle die Zutat und trag ein, wie viel du hast. Savour rechnet den Rest des Rezepts darum herum.'],
      ['Rechenbeispiel', 'Ein Rezept für 8 Gedecke brauchst du für 120 Gedecke: Der Faktor ist 120 geteilt durch 8, also 15. Mit einer Ausbeute von „8 Gedecke“ trägst du einfach 120 ein.']
    ]
  },
  eenheden: {
    slug: 'de/handbuch-einheiten-und-runden',
    menu: 'Einheiten und Runden',
    title: 'Einheiten und Runden beim Umrechnen: Gramm, Liter, Löffel, Cups | Handbuch',
    desc: 'Wie Savour beim Umrechnen Einheiten wählt und rundet: von Kilo zu Gramm, von Teelöffeln zu Esslöffeln, saubere Brüche für Löffel und Cups, und was stehen bleibt.',
    lead: 'Umgerechnete Mengen, die du in der Küche wirklich abwiegen kannst.',
    sections: [
      ['Ein praktisches Maß', 'Savour rechnet innerhalb derselben Art von Einheit auf ein praktisches Maß um: 0,25 kg wird 250 g und 20 TL werden 6 ⅔ EL.'],
      ['Runden', 'Löffel und Cups bekommen saubere Brüche wie ½, ⅓ und ¾. Gramm und Milliliter werden ganze Zahlen.'],
      ['Welche Einheiten', 'Gewicht: mg, g, kg, oz und lb. Volumen: ml, cl, dl, l, TL, EL, tsp, tbsp und cup. Savour rechnet nicht von Gewicht in Volumen um, denn das hängt vom Produkt ab.'],
      ['Was stehen bleibt', 'Stück, Zweige und Zehen werden mitgerechnet, aber nicht umgewandelt. „Nach Geschmack“, „Prise“, „Messerspitze“ und „Schuss“ bleiben, wie sie sind.'],
      ['So schreibst du es', 'Wie du Mengen schreibst, damit Savour sie erkennt, steht unter [Zutaten und Mengen](#recept-ingredienten).']
    ]
  },
  kookmodus: {
    slug: 'de/handbuch-kochmodus',
    menu: 'Kochmodus',
    title: 'Kochmodus: große Schrift, Bildschirm an und abhaken | Handbuch Savour',
    desc: 'So funktioniert der Kochmodus in Savour: nur das Rezept in großer Schrift, der Bildschirm bleibt an und du hakst Zutaten und Schritte ab. Ideal für Handy und Tablet.',
    lead: 'Nur das Rezept, groß und gut lesbar, auch mit nassen Händen.',
    sections: [
      ['Den Kochmodus starten', 'Wähle oben in einem Rezept „Kochmodus“. Du siehst nur das Rezept, in großer Schrift, ohne Menü.'],
      ['Bildschirm an', 'Im Kochmodus versucht Savour, deinen Bildschirm anzulassen, damit du ihn nicht ständig berühren musst. Ob das klappt, hängt von Handy und Browser ab.'],
      ['Abhaken', 'Hake Zutaten ab, die du abgewogen hast, und Schritte, die fertig sind. Nach einer Unterbrechung siehst du genau, wo du warst. Auch außerhalb des Kochmodus kannst du Zutaten abhaken.'],
      ['Umgerechnet kochen', 'Rechne das Rezept zuerst mit den [Schnellknöpfen](#omrekenen) um und starte dann den Kochmodus: Du kochst mit den umgerechneten Mengen.'],
      ['Auf dem Tablet am Pass', 'Leg Savour [als App](#app-installeren) auf ein Tablet und nutze den Kochmodus bei der Mise en place. Rezepte, die du geöffnet hast, funktionieren auch [ohne Internet](#offline).']
    ]
  },
  offline: {
    slug: 'de/handbuch-ohne-internet',
    menu: 'Ohne Internet arbeiten',
    title: 'Rezepte ohne Internet: offline arbeiten in der Küche | Handbuch Savour',
    desc: 'So arbeitest du mit Savour ohne WLAN: Rezepte, die du geöffnet hast, bleiben in einer Kellerküche oder im Kühlhaus verfügbar. Was ohne Verbindung geht und was nicht.',
    lead: 'Kein WLAN in der Kellerküche? Deine Rezepte öffnen trotzdem.',
    sections: [
      ['So funktioniert es', 'Rezepte, die du geöffnet hast, speichert Savour auf deinem Gerät. Fällt die Verbindung weg, öffnet Savour deine Bibliothek von diesem Gerät.'],
      ['So sorgst du dafür, dass es klappt', 'Melde dich einmal mit „[Angemeldet bleiben](#inloggen)“ an und öffne die Rezepte, die du in der Küche brauchst. Leg Savour am besten [als App](#app-installeren) auf den Startbildschirm.'],
      ['Was ohne Internet geht', 'Lesen, Suchen in deiner Bibliothek, [Umrechnen](#omrekenen) und der [Kochmodus](#kookmodus) funktionieren normal.'],
      ['Was Internet braucht', 'Speichern, Bearbeiten, Importieren und Teilen geht wieder, sobald du Verbindung hast.'],
      ['Mehr lesen', 'Warum das in einer Küche so wichtig ist: [Rezepte ohne WLAN](/blog/recepten-zonder-wifi).']
    ]
  },
  'mep-lijsten': {
    slug: "de/handbuch-mep-listen",
    menu: "MEP-Listen",
    h1: "MEP-Listen",
    title: "MEP-Listen: Gedecke, abhaken und drucken | Handbuch Savour",
    desc: "So funktioniert die MEP-Liste in Savour: pro Posten eine Liste mit Karten und Gerichten, Gedecke pro Tag, abhaken mit deinem Team, Kochmodus, Import aus Excel und Druck auf ein A4-Blatt.",
    lead: "Was pro Posten bereitstehen muss, pro Tag abgehakt, mit deinem ganzen Team.",
    sections: [
      ["Pro Posten eine Liste", "Eine MEP-Liste ist die Liste deines Postens: Karten (à la carte, Bankett), Überschriften pro Gang oder Gericht und darunter, was bereitstehen muss. Du liest sie von oben nach unten, in der Reihenfolge des Menüs."],
      ["Liste und Kochmodus", "Liste zeigt alles im Stil von Savour, mit einem Kästchen bei jedem Posten. Abhaken setzt ihn für heute auf fertig, für dein ganzes Team. Der Kochmodus zeigt nur die Liste, groß, und hält deinen Bildschirm an."],
      ["Gedecke und Mengen", "Trag neben dem Namen jeder Karte die Anzahl Gedecke ein; Savour rechnet pro Posten aus, wie viel du brauchst (40 Gedecke × 60 g = 2,4 kg). Jeden Tag beginnt die Liste leer. Mit ⋯ Liste leeren entfernst du die Häkchen auch zwischendurch."],
      ["Gemeinsam im Küchenteam", "Eine MEP-Liste im Küchenteam sieht das ganze Team. Was ein Kollege abhakt, siehst du sofort, mit Name und Uhrzeit. Abhaken darf jeder, auch ohne Savour Pro. Ohne Internet bleibt, was du antippst, stehen und wird gesendet, sobald du wieder Verbindung hast."],
      ["Importieren", "Hast du deine Liste schon in Excel, Word oder auf Papier? Wähle Importieren. Savour teilt sie auf und du prüfst alles, bevor es gespeichert wird. Ein Foto liest die KI, mit Savour Pro."],
      ["Drucken", "Druck die Liste auf ein A4-Blatt, hoch oder quer, mit Kästchen zum Abhaken, genau wie deine Excel-Liste. Datum und Gedecke stehen nicht darauf, so kannst du sie jeden Tag nutzen. Mit Savour Pro steht das Logo deines Restaurants darauf."],
      ["Savour Pro", "MEP-Listen erstellen und verwalten geht mit Savour Pro. Abhaken kann jeder im Küchenteam, auch mit einem kostenlosen Konto. Hörst du mit Pro auf, bleiben deine Listen erhalten."]
    ]
  },
  allergenen: {
    slug: "de/handbuch-allergene",
    menu: "Allergene pro Rezept",
    h1: "Allergene pro Rezept",
    title: "Allergene pro Rezept: so füllt Savour sie aus | Handbuch Savour",
    desc: "So funktionieren die Allergene in Savour: Savour füllt die 14 Allergene selbst aus, auch über Grundrezepte, mit Prüfen, eigenen Zutaten, Allergenkarte und Druck.",
    lead: "Savour füllt die Allergene selbst aus. Du ergänzt nur, was Savour nicht kennt, und passt an, wo deine Marke anders ist.",
    sections: [
      ["Wo", "Wähle im Menü Werkzeuge → Allergene. Bei jedem Rezept stehen die Allergene unter den Zutaten; tippe darauf, um sie aufzuklappen. Im Menü Weitere Aktionen beim Rezept findest du die Allergenkarte."],
      ["Savour füllt selbst aus", "Savour sucht bei jeder Zutatenzeile die Zutat in der Savour-Liste, in fünf Sprachen und auch in abgeleiteter Form („Limettenabrieb“ zählt als Limette). Nutzt du ein Grundrezept, etwa einen Fond oder eine Sauce, zählen dessen Allergene mit. Du musst also nichts eingeben."],
      ["Was Savour nicht kennt", "Oben unter Werkzeuge → Allergene siehst du, wie viele Rezepte vollständige Allergene haben. Kennt Savour eine Zutat nicht, steht das beim Rezept („Savour kennt 2 Zutaten noch nicht“). Unter Prüfen bekommst du sie nacheinander; du trägst sie einmal ein, dann kennt Savour sie für alle deine Rezepte."],
      ["Je Marke verschieden", "Bei Zutaten, die je Marke verschieden sind, etwa Brühe oder Sojasauce, zählt Savour die üblichen Allergene mit und schreibt dazu: kann je nach Marke abweichen. Ist es bei deiner Marke anders, öffne die Zutat unter Zutaten und leg deine eigene Version an; sie geht der Savour-Liste vor."],
      ["Immer an und selbst einschalten", "Im Tab Allergene stehen die 14 Allergene, die du laut Gesetz nennen können musst; sie sind immer an. Darunter schaltest du selbst ein, wonach Gäste oft fragen, etwa Laktose, Schweinefleisch, Zwiebel und Knoblauch oder Alkohol."],
      ["Allergenkarte und Drucken", "Die Allergenkarte zeigt pro Zutat, welche Allergene darin stecken, und unten das ganze Rezept. Ein Fragezeichen bedeutet, dass Savour diese Zutat noch nicht kennt. Beim Drucken wählst du mit „Mit Allergenen“, ob sie mit auf den Ausdruck kommen."],
      ["Nie „allergenfrei“", "Solange eine Zutat unbekannt oder nicht geprüft ist, sagt Savour nie, dass ein Rezept frei von einem Allergen ist. Prüfe im Zweifel immer das Etikett deiner Marke."],
      ["Im Küchenteam", "Ein Küchenteam hat eine eigene Zutatenliste. Der Eigentümer und alle, die bearbeiten dürfen, ergänzen und passen an; alle im Team sehen die Allergene bei den Rezepten, solange der Eigentümer Savour Pro hat."],
      ["Savour Pro und Savour lernt", "Allergene pro Rezept gehören zu Savour Pro. Ist „Hilf, den Savour-Leser zu verbessern“ an (Einstellungen), prüfen wir, ob die Savour-Liste besser werden kann, wenn du andere Allergene wählst. Nichts ändert sich von selbst."]
    ]
  }
};
