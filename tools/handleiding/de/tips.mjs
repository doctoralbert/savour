// Handbuch (Duits), Abschnitte „Tipps für gute Rezepte“ und „Hilfe“.

export const groups = {
  tips: { name: 'Tipps für gute Rezepte', intro: 'Praktische Tipps aus der Küche für Rezepte, die in jedem Service gleich gelingen.' },
  hulp: {
    name: 'Hilfe',
    intro: 'Probleme lösen, ein Problem melden und die Begriffe, die Savour verwendet. Steht deine Frage nicht dabei, schau in die [häufigen Fragen](/veelgestelde-vragen).'
  }
};

export const pages = {
  'tips-recept-schrijven': {
    slug: 'de/handbuch-tipp-rezept-schreiben',
    menu: 'Ein Rezept, das jeder gleich macht',
    title: 'Ein Küchenrezept schreiben, das jeder gleich macht | Handbuch',
    desc: 'Tipps für eine Standardrezeptur: klarer Name und Ausbeute, Zutaten in Gramm in der Reihenfolge der Verwendung, kurze Schritte und die kritischen Punkte.',
    lead: 'Ein gutes Küchenrezept lässt keinen Raum für Interpretation.',
    sections: [
      ['Name und Ausbeute', 'Beginne mit einem klaren Namen und der [Ausbeute](#recept-opbrengst): wie viele Liter, wie viele Stück oder für wie viele Gedecke.'],
      ['Zutaten', 'Schreib alle Zutaten in der Reihenfolge, in der du sie verwendest, mit der Menge in Gramm oder Milliliter statt in Löffeln oder Tassen. Siehe [Zutaten und Mengen](#recept-ingredienten).'],
      ['Zubereitung', 'Schreib die Zubereitung in kurzen Schritten, ein Handgriff pro Schritt. Siehe [Die Zubereitung schreiben](#recept-bereiding).'],
      ['Kritische Punkte', 'Notiere immer die kritischen Punkte: Temperaturen, Zeiten, die gewünschte Dicke oder Farbe und worauf zu achten ist. „Auf ein Drittel reduzieren“ oder „Kerntemperatur 58 °C“ verhindert mehr Fehler als eine schöne Beschreibung.'],
      ['Mehr lesen', 'Warum feste Rezepturen so viel bringen: [Standardrezepturen in der Küche](/blog/standaardrecepturen-in-de-keuken).']
    ]
  },
  'tips-opschalen': {
    slug: 'de/handbuch-tipp-hochrechnen-ohne-fehler',
    menu: 'Hochrechnen ohne Fehler',
    title: 'Rezepte ohne Fehler hochrechnen: Faktor und Abschmecken | Handbuch',
    desc: 'Tipps fürs Hochrechnen in der Küche: mit einem Faktor nach Gewicht rechnen, und was nicht eins zu eins mitwächst, etwa Reduktionszeiten, Salz, Säure, Gewürze und Backzeiten.',
    lead: 'Das Rechnen macht Savour. Abschmecken bleibt dein Handwerk.',
    sections: [
      ['Der Faktor', 'Hochrechnen machst du mit einem Faktor: die gewünschte Ausbeute geteilt durch die Ausbeute des Grundrezepts. Hast du eine Beurre blanc für 1 Liter und brauchst 3,5 Liter, ist der Faktor 3,5. Rechne immer nach Gewicht; dann ist das Ergebnis exakt. In Savour geht das mit [Mehr umrechnen](#omrekenen-meer).'],
      [
        'Was nicht mitwächst',
        'Nicht alles skaliert eins zu eins:',
        [
          'Reduktionszeiten werden länger, weil ein größerer Topf relativ weniger verdampft.',
          'Salz, Säure und Gewürze schmeckst du bei großen Mengen neu ab.',
          'Beim Backen ändert sich die Backzeit mit einer anderen Form oder einem vollen Ofen.',
          'Geliermittel wie Gelatine und Agar rechnest du dagegen exakt mit der Flüssigkeit mit.'
        ]
      ],
      ['Mehr lesen', 'Ausführlicher: [Rezepte ohne Fehler hochrechnen](/blog/recepten-opschalen-zonder-fouten).']
    ]
  },
  'tips-kladjes': {
    slug: 'de/handbuch-tipp-von-der-notiz-zur-rezeptkarte',
    menu: 'Von der Notiz zur Rezeptkarte',
    title: 'Von der Notiz zur Rezeptkarte: handschriftliche Rezepte festhalten | Handbuch',
    desc: 'Tipps, um handschriftliche Notizen schnell festzuhalten: bei gutem Licht fotografieren, gerade von oben, und danach die Zahlen prüfen.',
    lead: 'Mach aus einer Notiz ein festes Rezept, solange du noch weißt, was du meintest.',
    sections: [
      ['Schnell festhalten', 'Viele Rezepte beginnen als Notiz am Pass. Mach so schnell wie möglich ein festes Rezept daraus, solange du noch weißt, was du meintest.'],
      ['Das Foto', 'Fotografiere ein handschriftliches Rezept bei gutem Licht, gerade von oben und mit der ganzen Seite im Bild. In Savour geht das mit [der Kamera](#import-fotos).'],
      ['Prüfen', 'Prüfe danach vor allem die Zahlen: Eine 3 und eine 8 oder eine 1 und eine 7 sind auf einer fleckigen Notiz schnell verwechselt. Das Original bleibt beim Rezept gespeichert.'],
      ['Mehr lesen', '[Alte Rezeptnotizen digitalisieren](/blog/oude-kladjes-digitaliseren).']
    ]
  },
  'tips-ordenen': {
    slug: 'de/handbuch-tipp-kategorien-und-ordner',
    menu: 'Kategorien und Ordner klug nutzen',
    title: 'Kategorien und Ordner klug in deiner Küche nutzen | Handbuch',
    desc: 'Tipps zum Ordnen von Rezepten: Kategorien für das, was ein Rezept ist, Ordner dafür, wie du arbeitest, und kurze, eindeutige Namen, die dein Team mit einem Suchwort findet.',
    lead: 'Was ein Rezept ist und wie du damit arbeitest: zwei verschiedene Dinge.',
    sections: [
      ['Kategorie: was es ist', 'Nutze [Kategorien](#categorieen) für das, was ein Rezept ist, etwa Saucen, Garnituren oder Patisserie. Ein Rezept steht in einer Kategorie.'],
      ['Ordner: wie du arbeitest', 'Nutze [Ordner](#mappen) dafür, wie du arbeitest, etwa die aktuelle Karte, eine Veranstaltung oder die kalte Küche. Ein Rezept kann in mehreren Ordnern vorkommen.'],
      ['Namen', 'Halte Namen kurz und eindeutig, damit jeder im Team das Rezept mit einem Suchwort findet.'],
      ['Mehr lesen', '[Rezeptordner ordnen: Beispiele](/blog/receptenmappen-indelen-voorbeelden) und [Rezepte in der Küche organisieren](/blog/recepten-organiseren-in-de-keuken).']
    ]
  },
  'tips-team': {
    slug: 'de/handbuch-tipp-zusammenarbeiten',
    menu: 'Zusammenarbeiten mit einer Quelle',
    title: 'Mit deinem Team aus einer Rezeptquelle arbeiten | Handbuch',
    desc: 'Tipps fürs Zusammenarbeiten in der Küche: eine Quelle für jedes Rezept, Rechte pro Rolle und nie mehr eine alte Version in einem Gruppenchat.',
    lead: 'Eine Küche funktioniert am besten mit einer Quelle für jedes Rezept.',
    sections: [
      ['Eine Quelle', 'Teile Rezepte über ein [Küchenteam](#keukenteams) statt über lose Fotos oder Nachrichten. Änderst du ein Rezept, arbeiten alle sofort mit der neuen Version, und niemand verliert eine alte Version in einem Gruppenchat.'],
      ['Rechte', 'Gib dem Sous-Chef Rechte, Rezepte zu bearbeiten, und dem Rest des Teams Rechte, sie anzusehen. Siehe [Rollen](#keukenteam-rollen).'],
      ['Ein neuer Koch', 'Mit allen Rezepten auf dem Handy ist ein neuer Koch schneller eingearbeitet. Lies auch [Neue Köche einarbeiten](/blog/nieuwe-kok-inwerken).']
    ]
  },
  'tips-allergenen': {
    slug: 'de/handbuch-tipp-allergene',
    menu: 'Allergene und feste Absprachen',
    title: 'Allergene und feste Absprachen in deinen Rezepten | Handbuch',
    desc: 'Tipps, um Allergene in deinen Rezepten klar zu halten: Allergene in der Zutatenliste, Grundrezepte nennen und schnell prüfen können, was in einem Gericht steckt.',
    lead: 'Bei einer Gästefrage schnell wissen, was genau drin ist.',
    sections: [
      ['In der Zutatenliste', 'Schreib bei jedem Rezept Bestandteile mit Allergenen deutlich in die Zutatenliste, auch wenn sie aus einem anderen Grundrezept kommen.'],
      ['Grundrezepte', 'Nenne bei einem zusammengesetzten Gericht, welche Grundrezepte darin stecken. [Verknüpfe sie](#recept-koppelen), dann siehst du mit einem Tipp, was im Fond oder in der Sauce ist.'],
      ['Notizen', 'Schreib feste Absprachen und Allergeninformationen in eine [Notiz](#recept-notities) zum Rezept, damit sie auch auf dem Ausdruck stehen.']
    ]
  },
  'probleem-inloggen': {
    slug: 'de/handbuch-probleme-beim-anmelden',
    menu: 'Probleme beim Anmelden',
    title: 'Probleme beim Anmelden oder mit der Bestätigungs-E-Mail lösen | Handbuch',
    desc: 'Was tun, wenn das Anmelden bei Savour nicht klappt: E-Mail-Adresse oder Passwort falsch, noch nicht bestätigt, keine E-Mail bekommen oder ein Link aus einer E-Mail, der nicht mehr funktioniert.',
    lead: 'Die häufigsten Meldungen beim Anmelden und was du tun kannst.',
    sections: [
      ['E-Mail-Adresse oder Passwort stimmt nicht', 'Prüfe, ob du die E-Mail-Adresse richtig geschrieben hast. Weißt du dein Passwort nicht mehr, wähle „Passwort vergessen?“. Siehe [Anmelden und Passwort](#inloggen).'],
      ['„Bestätige zuerst deine E-Mail-Adresse“', 'Dein Konto ist noch nicht bestätigt. Klicke auf den Link in der Bestätigungs-E-Mail oder lass Savour eine neue senden. Schau auch im Spam nach.'],
      ['„Dieser Link funktioniert nicht mehr“', 'Ein Link aus einer E-Mail funktioniert einmal und eine Stunde lang. Hast du mehrmals einen neuen angefordert, gilt nur der neueste. Fordere einen neuen Link an und nutze die neueste E-Mail.'],
      ['Keine E-Mail bekommen', 'Schau im Spam- oder Junk-Ordner nach. Bei Firmen-E-Mail kann es etwas dauern. Wurden zu viele E-Mails angefordert, meldet Savour das; versuche es dann später erneut.'],
      ['„Diese E-Mail-Adresse hat bereits ein Konto“', 'Melde dich mit dieser E-Mail-Adresse an oder wähle „Passwort vergessen?“.'],
      ['Immer wieder abgemeldet', 'Hake beim Anmelden „Angemeldet bleiben“ an. Ist es aus, bist du abgemeldet, sobald du das Fenster schließt.']
    ]
  },
  'probleem-melden': {
    slug: 'de/handbuch-problem-melden-und-kontakt',
    menu: 'Problem melden und Kontakt',
    title: 'Ein Problem melden oder Savour kontaktieren | Handbuch',
    desc: 'So meldest du ein Problem in Savour, mit einem Screenshot, oder nimmst über das Kontaktformular oder contact@savour.page Kontakt auf.',
    lead: 'Läuft etwas nicht richtig? Sag Bescheid, dann schauen sich die Köche hinter Savour das an.',
    sections: [
      ['Ein Problem melden', 'Wähle unten auf der Website „Problem melden“. Beschreib, was schiefgeht, und füge wenn möglich einen Screenshot bis 3 MB hinzu. Deine Meldung geht direkt ans Team.'],
      ['Kontakt', 'Für Fragen zu Savour, einem Team-Abo oder dem Import-Service nutzt du das [Kontaktformular](/contact) oder schreibst an contact@savour.page.'],
      ['Was hilft', 'Nenne Gerät und Browser, was du getan hast und was du erwartet hast. Geht es um einen Import, schick die Datei oder einen Teil davon mit.'],
      ['Zuerst selbst nachsehen', 'Viele Antworten stehen unter [Probleme beim Importieren](#import-problemen), [Probleme beim Anmelden](#probleem-inloggen) und in den [häufigen Fragen](/veelgestelde-vragen).']
    ]
  },
  woordenlijst: {
    slug: 'de/handbuch-glossar',
    menu: 'Glossar',
    title: 'Glossar: die Begriffe von Savour erklärt | Handbuch',
    desc: 'Was bedeutet was in Savour: Savour-Leser, Küchenteam, Rezeptordner, Kategorie, Ausbeute, Faktor, Teil, Grundrezept, Notiz, Kochmodus und mehr.',
    lead: 'Die Begriffe, die dir in Savour begegnen, kurz erklärt.',
    sections: [
      [
        'Rezepte',
        'Begriffe rund um ein Rezept:',
        [
          'Ausbeute: was ein Rezept ergibt, etwa 1 Liter oder 40 Stück. Siehe [Ausbeute](#recept-opbrengst).',
          'Teil: eine Komponente eines Rezepts mit eigenen Zutaten und eigener Zubereitung, etwa Teig oder Sauce. Siehe [Ein Rezept in Teilen](#recept-delen).',
          'Grundrezept: ein eigenes Rezept, das du als Zutat nutzt, etwa ein Fond. Siehe [Verknüpfen](#recept-koppelen).',
          'Original-Notiz: ein handschriftliches oder gescanntes Rezept. Siehe [Fotos und Notizen](#import-fotos).',
          'Notiz: eine feste Anmerkung neben einem Rezept. Siehe [Notizen](#recept-notities).'
        ]
      ],
      [
        'Ordnen',
        'Begriffe rund ums Ordnen:',
        [
          'Kategorie: was ein Rezept ist. Siehe [Kategorien](#categorieen).',
          'Stichwort: ein Wort im Rezeptnamen, mit dem Savour eine Kategorie vorschlägt. Siehe [Stichwörter](#categorie-trefwoorden).',
          'Rezeptordner: eine eigene Einteilung, etwa pro Posten. Siehe [Rezeptordner](#mappen).',
          'Favorit: ein Rezept mit einem Stern. Siehe [Favoriten](#favorieten).'
        ]
      ],
      [
        'Importieren und umrechnen',
        'Begriffe rund ums Importieren und Umrechnen:',
        [
          'Savour-Leser: das eigene Programm von Savour, das Rezepte aus Dateien liest. Siehe [Der Savour-Leser und die KI](#import-ai).',
          'Prüfansicht: wo du einen Import vor dem Speichern prüfst. Siehe [Import prüfen](#import-controleren).',
          'Export: eine Datei mit allen Rezepten aus einer anderen App. Siehe [Umstieg auf Savour](#overstappen).',
          'Faktor: die Zahl, mit der du ein Rezept multiplizierst. Siehe [Mehr umrechnen](#omrekenen-meer).',
          'Kochmodus: nur das Rezept, groß und mit Bildschirm an. Siehe [Kochmodus](#kookmodus).'
        ]
      ],
      [
        'Zusammenarbeiten',
        'Begriffe rund ums Zusammenarbeiten:',
        [
          'Küchenteam: ein gemeinsames Rezeptbuch für deine Brigade. Siehe [Küchenteams](#keukenteams).',
          'Eigentümer, Editor und Viewer: die Rollen in einem Küchenteam. Siehe [Rollen](#keukenteam-rollen).',
          'Organisation: ein Abo, mit dem dein ganzes Team Savour Pro hat. Siehe [Organisationen](#organisatie).',
          'Savour Pro: das kostenpflichtige Abo. Siehe [Kostenlos und Savour Pro](#gratis-en-pro).'
        ]
      ]
    ]
  }
};
