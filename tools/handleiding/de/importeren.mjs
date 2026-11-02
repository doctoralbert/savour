// Handbuch (Duits), Abschnitt „Rezepte importieren“, mit einer Seite pro Rezept-App (apps).

export const groups = {
  importeren: {
    name: 'Rezepte importieren',
    intro: 'Deine Rezepte in Savour holen: aus Word, PDF, Fotos, Text, Webseiten, Notiz-Apps und mehr als fünfzehn anderen Rezept-Apps.'
  }
};

export const pages = {
  importeren: {
    slug: 'de/handbuch-importieren',
    menu: 'Übersicht: Rezepte importieren',
    h1: 'Rezepte importieren',
    title: 'Rezepte importieren aus Word, PDF, Fotos und anderen Apps | Handbuch Savour',
    desc: 'Alle Wege, Rezepte in Savour zu bekommen: Word, PDF, Fotos von Notizen, Text, eine Webseite, Notiz-Apps, CSV und Exporte aus Paprika, Mela, Mealie und mehr.',
    lead: 'Dein ganzer Rezeptordner in einem Schritt in Savour, egal aus welcher Quelle. Hier steht pro Quelle, wie es geht.',
    sections: [
      ['Wo du anfängst', 'Wähle im Menü „Rezept hinzufügen“ und dann „Rezept importieren“. Du siehst die Quellen, aus denen du importieren kannst. Jede Quelle öffnet eine Dateiauswahl, die nur passende Dateien zeigt. Du kannst Dateien auch auf den Bildschirm ziehen.'],
      [
        'Dateien und Dokumente',
        'Diese Quellen liest der Savour-Leser, kostenlos und ohne KI:',
        [
          '[Word](#import-word): .doc und .docx, auch mit Hunderten Rezepten in einem Dokument.',
          '[PDF](#import-pdf): digitale PDFs. Eine gescannte PDF liest die KI (Savour Pro).',
          '[Text tippen oder einfügen](#import-tekst): aus einer E-Mail, WhatsApp oder einer Notiz.',
          '[Andere Textdateien](#import-tekstbestanden): .txt, .md, .rtf, .odt, .html und Pages.',
          '[Tabellen und CSV](#import-csv): Excel oder Google Sheets, als .csv gespeichert.',
          '[JSON und schema.org](#import-json): Rezepte in fester Form und Savour-Dateien.',
          '[Ein ganzer Ordner oder eine ZIP](#import-hele-map): alles gemischt in einem Schritt.'
        ]
      ],
      ['Fotos und Webseiten', 'Fotos handschriftlicher oder gescannter Rezepte und die Kamera liest die KI von Savour Pro: siehe [Fotos und Notizen](#import-fotos). Ein Rezept von einer Webseite holst du mit dem Link: siehe [Rezept von einer Webseite](#import-website).'],
      [
        'Umstieg aus einer anderen App',
        'Savour liest Exporte aus [Paprika](#import-paprika), [Mela](#import-mela), [Mealie](#import-mealie), [Tandoor](#import-tandoor), [Recipe Keeper](#import-recipe-keeper), [Copy Me That](#import-copy-me-that), [Crouton](#import-crouton), [MasterCook](#import-mastercook), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook), [Evernote](#import-evernote), [Google Keep](#import-google-keep), [Flavorish](#import-flavorish), [CookBookManager](#import-cookbookmanager) und [Plan to Eat](#import-plan-to-eat). Notizen aus Apple Notizen, OneNote, Notion und anderen Apps: siehe [Notiz-Apps](#import-notitie-apps). Die Übersicht steht unter [Umstieg auf Savour](#overstappen).'
      ],
      ['Immer zuerst prüfen', 'Es wird nichts gespeichert, bevor du es gesehen hast. In der [Prüfansicht](#import-controleren) siehst du pro Rezept, was gelesen wurde und wo Savour unsicher ist. Savour erfindet nie Mengen, Zutaten oder Schritte.'],
      [
        'Kostenlos und Savour Pro',
        'Mit einem kostenlosen Konto liest du Word, PDF, Text und Exporte anderer Apps ein, bis du 100 Rezepte hast. Ist weniger Platz frei, als du importierst, speichert Savour die ersten Rezepte, die passen, und die anderen bleiben in der Prüfansicht. Mit [Savour Pro](#gratis-en-pro) speicherst du unbegrenzt und die KI liest Fotos, gescannte PDFs und Rezepte, bei denen der Leser zweifelt, bis 500 Importe pro Monat. Siehe [Der Savour-Leser und die KI](#import-ai).'
      ],
      ['Keine Zeit, es selbst zu tun', 'Mit dem [Import-Service](#import-service) übertragen die Köche hinter Savour deinen ganzen Rezeptordner für dich.']
    ]
  },
  'import-controleren': {
    slug: 'de/handbuch-import-pruefen',
    menu: 'Import prüfen und speichern',
    title: 'Importierte Rezepte prüfen, bevor du sie speicherst | Handbuch Savour',
    desc: 'Die Prüfansicht von Savour: Titel, Zutaten, Zubereitung, Ausbeute und Kategorie pro Rezept prüfen, Hinweise bei Zweifeln, doppelte Rezepte und alles auf einmal speichern.',
    lead: 'Bevor etwas gespeichert wird, siehst du genau, was Savour gelesen hat.',
    sections: [
      ['Die Prüfansicht', 'Nach dem Verarbeiten öffnet sich „Mehrere Rezepte importieren“. Oben siehst du, wie viele Rezepte aus wie vielen Dateien gefunden wurden und ob alles klar gelesen wurde. Darunter steht jedes Rezept als Karte mit den Feldern Titel, Zutaten, Zubereitung, Ergibt und Kategorie. Du änderst alles direkt in der Karte.'],
      [
        'Hinweise bei Zweifeln',
        'Savour zeigt, wo es unsicher ist:',
        [
          'Automatisch verbessert: kleine Tippfehler, die der Leser selbst korrigiert hat, damit du sie nachsehen kannst.',
          'Nicht gut lesbar: eine Stelle, die du besser mit dem Original vergleichst. Sie ist gelb markiert.',
          '„Möglicherweise unvollständig“: Es scheint etwas zu fehlen. Rezepte, die in der Quelle unvollständig sind, werden übersprungen; mit „Trotzdem importieren“ nimmst du sie doch auf, markiert zum späteren Prüfen.'
        ]
      ],
      ['Ein Rezept entfernen oder ein Foto drehen', 'Gehört eine Karte nicht dazu, etwa ein Inhaltsverzeichnis oder eine Notiz, die kein Rezept ist, entfernst du sie mit dem Kreuz. Bei einem Rezept von einem Foto drehst du das Foto mit „Foto drehen“ um eine Vierteldrehung.'],
      ['Speichern', 'Wähle „Alle Rezepte speichern“. Steht ein Rezept schon genau so in deiner Bibliothek oder zweimal im Import, speichert Savour es nur einmal und meldet, wie viele doppelte Rezepte übersprungen wurden. Mit „Zurück zum Import“ gehst du zurück, ohne zu speichern.'],
      ['Bei einem kostenlosen Konto', 'Hast du Platz für weniger Rezepte, als du importierst, fragt Savour, ob es die speichern soll, die noch passen. Die anderen bleiben in der Prüfansicht; mit [Savour Pro](#gratis-en-pro) speicherst du unbegrenzt.'],
      ['Was du danach tust', 'Nummern vor Rezeptnamen aus einem alten Rezeptbuch („12. Kalbsjus“) entfernst du in einem Schritt mit [Aufräumen](#opschonen). Danach [ordnest du die Rezepte](#ordenen) in Kategorien und Ordnern.'],
      ['Worauf du achtest', 'Prüfe vor allem die Zahlen, die Einheiten und die Ausbeute. Eine 3 und eine 8 oder eine 1 und eine 7 sind auf einer fleckigen Notiz schnell verwechselt. Bei einem Rezept von einem Foto öffnest du später das Original mit „Original-Notiz ansehen“.']
    ]
  },
  'import-word': {
    slug: 'de/handbuch-import-aus-word',
    menu: 'Word-Dateien (.doc, .docx)',
    h1: 'Rezepte aus Word importieren',
    title: 'Rezepte aus Word importieren (.doc und .docx) | Handbuch Savour',
    desc: 'So holst du Rezepte aus Word in Savour: Ein Dokument mit Hunderten Rezepten wird automatisch in Titel, Ausbeute, Zutaten und Zubereitung aufgeteilt.',
    lead: 'Ein Word-Dokument mit deinem ganzen Rezeptbuch oder hundert einzelne Dateien: Savour teilt sie selbst auf.',
    sections: [
      ['So importierst du', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → Word-Datei. Wähle eine oder mehrere .doc- oder .docx-Dateien und dann „Verarbeiten“. Danach [prüfst du die Rezepte](#import-controleren).'],
      ['Was der Savour-Leser erkennt', 'Der Savour-Leser teilt ein Dokument selbst in einzelne Rezepte auf, auch bei Hunderten Rezepten. Pro Rezept erkennt er Titel, Ausbeute, Zutaten und Zubereitung. Das ist kostenlos und ohne KI.'],
      ['Wie Savour ein neues Rezept erkennt', 'Ein neues Rezept beginnt bei einer Überschrift in Word (Überschrift 1), bei einer fetten Zeile, die wie ein Rezeptname aussieht, oder bei einem Rezeptnamen, auf den eine neue Überschrift „Zutaten“ folgt. Überschriften wie „Zutaten“ und „Zubereitung“ helfen dem Leser am meisten. Eine Zeile, die mit einem Doppelpunkt endet, etwa „Teig:“, wird ein [Teil des Rezepts](#recept-delen).'],
      ['Alte .doc-Dateien', 'Auch alte .doc-Dateien aus Word 97–2003 werden gelesen. Klappt das bei einer Datei nicht, speichere sie in Word als .docx und versuche es erneut.'],
      ['Tabellen', 'Stehen deine Zutaten in einer Tabelle, wird jede Zeile eine Zeile mit den Zellen hintereinander. Prüfe bei Tabellen die Reihenfolge von Menge und Produkt.'],
      ['Tipps für das beste Ergebnis', 'Gib jedem Rezept einen klaren Titel als Überschrift, schreib Zutaten in einzelne Zeilen mit der Menge vorne und „Zubereitung“ über die Schritte. Mehr Tipps: [Ein Rezept, das jeder gleich macht](#tips-recept-schrijven).'],
      ['Pages und Google Docs', 'Eine Pages-Datei kann Savour nicht lesen: Exportiere sie in Pages als Word (.docx) oder PDF. In Google Docs wählst du Datei → Herunterladen → Microsoft Word (.docx).']
    ]
  },
  'import-pdf': {
    slug: 'de/handbuch-import-aus-pdf',
    menu: 'PDF-Dateien',
    h1: 'Rezepte aus PDF importieren',
    title: 'Rezepte aus einer PDF importieren, auch gescannt | Handbuch Savour',
    desc: 'So importierst du Rezepte aus PDF in Savour: Digitale PDFs liest der Savour-Leser kostenlos, gescannte PDFs liest die KI mit Savour Pro.',
    lead: 'Ein digitales Rezeptbuch, ein Export aus einem anderen Programm oder ein Scan einer Notiz.',
    sections: [
      ['So importierst du', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → PDF-Datei, wähle eine oder mehrere PDFs und dann „Verarbeiten“. Danach [prüfst du die Rezepte](#import-controleren).'],
      ['Digitale PDF', 'Eine PDF aus Word, einem anderen Programm oder einer Webseite enthält Text. Den liest der Savour-Leser kostenlos, genauso wie eine [Word-Datei](#import-word): Er teilt sie in Rezepte auf und erkennt Titel, Ausbeute, Zutaten und Zubereitung. Ein großer Leerraum auf einer Seite gilt als Trennung.'],
      ['Gescannte PDF', 'Ein Scan ist ein Foto in einer PDF, ohne Text. Den liest die KI von [Savour Pro](#gratis-en-pro), genau wie [ein Foto](#import-fotos). Ohne Pro meldet Savour, dass die Datei keinen lesbaren Text enthält.'],
      ['Zwei Spalten und Layout', 'In einer PDF mit zwei Spalten oder viel Layout kann die Reihenfolge der Zeilen anders ausfallen. Prüfe solche Rezepte besonders gut. Hast du die Word-Datei noch, importiere lieber diese.']
    ]
  },
  'import-fotos': {
    slug: 'de/handbuch-fotos-und-notizen-importieren',
    menu: 'Fotos, Notizen und die Kamera',
    h1: 'Fotos und Notizen importieren',
    title: 'Handschriftliche Rezepte und Notizen von einem Foto lesen | Handbuch Savour',
    desc: 'So kommen handschriftliche Rezepte, Notizen und Kochbuchseiten in Savour: Fotos hochladen oder die Kamera nutzen, die KI liest sie und die Original-Notiz bleibt gespeichert.',
    lead: 'Die Notiz am Pass, das Heft aus der Ausbildung oder eine Seite aus einem Kochbuch: ein Foto, und es ist drin.',
    sections: [
      ['Fotos hochladen', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → „Fotos“ und wähle ein oder mehrere Fotos (.jpg, .png oder .webp). Jedes Foto wird als Rezept gelesen. Das funktioniert mit [Savour Pro](#gratis-en-pro), bis 500 Importe pro Monat.'],
      ['Die Kamera nutzen', 'Wähle „Foto mit der Kamera aufnehmen“. Am Handy öffnet sich die Kamera, am Computer die Webcam. Leg die Notiz flach hin, bei gutem Licht, und fotografiere gerade von oben mit der ganzen Seite im Bild.'],
      ['Was die KI tut', 'Savour richtet das Foto zuerst gerade aus und liest dann eine Kopie mit mehr Kontrast. Die KI liest, was dasteht, und erfindet nichts: Was nicht auf der Notiz steht, steht auch nicht im Rezept. Zweifelt die KI, siehst du das in der [Prüfansicht](#import-controleren).'],
      ['Das Original bleibt gespeichert', 'Bei einem Rezept, das von einem Foto gelesen wurde, bleibt die Notiz gespeichert. Öffne das Rezept und wähle „Original-Notiz ansehen“, um sie danebenzulegen.'],
      ['Mehrere Fotos in einer ZIP', 'Hast du alle Fotos in einer ZIP-Datei, wähle sie bei „Aus einer anderen Rezept-App“ oder „Alle Dateien gemischt“. Enthält sie nur Fotos, liest Savour jedes Foto als Rezept. Siehe [Ein ganzer Ordner oder eine ZIP](#import-hele-map).'],
      ['Tipps für ein gutes Foto', 'Ein Rezept pro Foto, kein Schatten vom Handy, kein Blitz auf glänzendem Papier. Prüfe danach vor allem die Zahlen. Mehr Tipps: [Von der Notiz zur Rezeptkarte](#tips-kladjes).'],
      ['iPhone-Fotos (HEIC)', 'Savour liest .jpg, .png und .webp. Speichert dein iPhone Fotos als HEIC, wähle in den iPhone-Einstellungen unter Kamera → Formate „Maximale Kompatibilität“, oder nutze die Kamera in Savour.']
    ]
  },
  'import-tekst': {
    slug: 'de/handbuch-text-einfuegen',
    menu: 'Text tippen oder einfügen',
    h1: 'Rezepte aus Text importieren',
    title: 'Ein Rezept aus E-Mail, WhatsApp oder Notiz einfügen | Handbuch Savour',
    desc: 'So fügst du Rezepte in Savour ein: Text aus einer E-Mail, WhatsApp, einer Webseite oder einer Notiz-App, auch mehrere Rezepte auf einmal. Der Savour-Leser teilt sie auf.',
    lead: 'Ein Rezept, das ein Kollege geschickt hat, oder eine ganze Liste aus deinen Notizen: einfügen und fertig.',
    sections: [
      ['So geht es', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → „Text eingeben“. Tippe oder füge den Text in das Feld ein und wähle „Verarbeiten“. Du kannst mehrere Rezepte auf einmal einfügen.'],
      ['Was Savour erkennt', 'Der Savour-Leser teilt den Text in Rezepte auf und erkennt Titel, Ausbeute, Zutaten und Zubereitung, genau wie bei einer [Word-Datei](#import-word). Fügst du aus Word oder einer E-Mail ein, merkt sich Savour fette Zeilen: Die sind oft ein Rezeptname oder ein Teil wie „Teig“.'],
      ['So fügst du es sauber ein', 'Setz den Titel nach oben, dann die Zutaten in einzelne Zeilen mit der Menge vorne, dann die Zubereitung. Eine Leerzeile zwischen zwei Rezepten hilft dem Leser.'],
      ['Lieber selbst ausfüllen', 'Willst du ein Rezept Feld für Feld ausfüllen, nutze [Selbst eingeben](#recept-maken).']
    ]
  },
  'import-tekstbestanden': {
    slug: 'de/handbuch-textdateien-importieren',
    menu: 'Text, Markdown, RTF, ODT und HTML',
    h1: 'Textdateien importieren',
    title: 'Rezepte aus .txt, .md, .rtf, .odt und .html importieren | Handbuch Savour',
    desc: 'So importierst du Rezepte aus Textdateien in Savour: reiner Text, Markdown, RTF, OpenOffice und LibreOffice (.odt), Webseiten (.html) und Pages.',
    lead: 'Dateien aus dem Editor, TextEdit, LibreOffice, Obsidian oder eine gespeicherte Webseite.',
    sections: [
      ['So importierst du', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → „Andere Dateien“ und wähle deine Dateien. Wähle „Verarbeiten“ und [prüfe die Rezepte](#import-controleren).'],
      [
        'Welche Dateien',
        'Der Savour-Leser liest diese Dateien kostenlos:',
        [
          '.txt: reiner Text aus dem Editor, TextEdit oder einer Notiz-App.',
          '.md: Markdown aus Obsidian, Notion, Bear, Joplin und anderen Apps. Eine Überschrift mit # wird ein Rezeptname.',
          '.rtf: Rich Text aus WordPad oder TextEdit.',
          '.odt: OpenOffice und LibreOffice Writer.',
          '.html: eine gespeicherte Webseite. Steht das Rezept in fester Form (schema.org) darin, übernimmt Savour das; sonst liest der Leser den Text.'
        ]
      ],
      ['Pages', 'Eine Pages-Datei kann Savour nicht lesen. Wähle in Pages Ablage → Exportieren → Word oder PDF und importiere diese Datei.'],
      ['Viele Dateien auf einmal', 'Bei Hunderten einzelnen Notizen wähle [Ganzen Ordner wählen](#import-hele-map) oder pack sie in eine ZIP.']
    ]
  },
  'import-hele-map': {
    slug: 'de/handbuch-ganzen-ordner-oder-zip-importieren',
    menu: 'Ein ganzer Ordner oder eine ZIP',
    h1: 'Einen ganzen Ordner oder eine ZIP importieren',
    title: 'Einen ganzen Ordner oder eine ZIP mit Rezepten importieren | Handbuch Savour',
    desc: 'So importierst du alle Rezeptdateien auf einmal in Savour: einen ganzen Ordner mit Word, PDF, Fotos und Text gemischt, oder eine ZIP mit Dokumenten oder Fotos.',
    lead: 'Dein ganzer Rezeptordner vom Computer in einem Schritt in Savour, auch wenn alles durcheinander liegt.',
    sections: [
      ['Alle Dateien gemischt', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → „Alle Dateien gemischt“. Dann wählst du Word, PDF, Fotos, Textdateien und Exporte anderer Apps in einem Schritt.'],
      ['Ganzen Ordner wählen', 'Wähle „Ganzen Ordner wählen“ und zeig auf einen Ordner. Savour nimmt alle Dateien mit, die es lesen kann, auch aus Unterordnern. Dateien, die es nicht lesen kann, überspringt es.'],
      [
        'Eine ZIP-Datei',
        'Eine ZIP musst du nicht entpacken. Savour schaut sich jede Datei darin an:',
        [
          'Word, PDF, Markdown, RTF und ODT werden gelesen, als hättest du sie einzeln gewählt.',
          'Exporte anderer Rezept-Apps in der ZIP werden erkannt, auch eine ZIP in einer ZIP.',
          'Enthält sie nur Fotos, wird jedes Foto als Rezept gelesen (Savour Pro).',
          'Enthält sie Rezepte und Fotos, gehören die Fotos zu diesen Rezepten.'
        ]
      ],
      ['Fortschritt', 'Bei vielen Dateien siehst du den Fortschritt pro Datei. Geht bei einer Datei etwas schief, meldet Savour welche und warum, und macht mit dem Rest weiter.'],
      ['Danach', 'Alle Rezepte landen zusammen in einer [Prüfansicht](#import-controleren). Bei jedem Rezept steht, aus welcher Datei es kommt.']
    ]
  },
  'import-website': {
    slug: 'de/handbuch-rezept-von-webseite-importieren',
    menu: 'Rezept von einer Webseite',
    h1: 'Ein Rezept von einer Webseite importieren',
    title: 'Ein Rezept von einer Webseite mit dem Link importieren | Handbuch Savour',
    desc: 'So holst du ein Rezept von einer Webseite in Savour: Link einfügen, Savour liest das Rezept aus der Seite. Funktioniert mit den meisten Rezeptseiten.',
    lead: 'Füge den Link einer Rezeptseite ein, und Savour holt das Rezept heraus, ohne Werbung und Geschichten.',
    sections: [
      ['So geht es', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → „Webseite (Link)“. Füge den Link der Rezeptseite ein und wähle „Verarbeiten“. Du musst angemeldet sein.'],
      ['Was Savour liest', 'Die meisten Rezeptseiten veröffentlichen ihre Rezepte in einem festen Format (schema.org) in der Seite. Das liest Savour direkt: Titel, Zutaten, Zubereitung und Ausbeute. Steht das Rezept nicht in diesem Format, liest der Savour-Leser den Text der Seite und mit Pro bei Bedarf die KI.'],
      ['Kein Rezept gefunden', 'Findet Savour auf der Seite kein Rezept, meldet es das und erfindet nichts. Kopiere dann den Rezepttext und nutze [Text eingeben](#import-tekst).'],
      ['Seiten hinter einem Login', 'Seiten, für die du dich anmelden oder bezahlen musst, kann Savour nicht öffnen. Kopiere dann den Text oder speichere die Seite als .html und importiere sie bei [Andere Dateien](#import-tekstbestanden).'],
      ['Quelle angeben', 'Nutzt du ein Rezept von jemand anderem, schreib die Quelle in eine [Notiz](#recept-notities) beim Rezept.']
    ]
  },
  'import-csv': {
    slug: 'de/handbuch-csv-und-excel-importieren',
    menu: 'Excel, Google Sheets und CSV',
    h1: 'Rezepte aus Excel und CSV importieren',
    title: 'Rezepte aus Excel, Google Sheets oder CSV importieren | Handbuch Savour',
    desc: 'So importierst du eine Rezeptliste aus Excel oder Google Sheets in Savour: als CSV speichern mit Spalten für Titel, Zutaten und Zubereitung, ein Rezept pro Zeile.',
    lead: 'Führst du deine Rezepte in einer Tabelle? Mit den richtigen Spaltennamen sind sie in einem Schritt in Savour.',
    sections: [
      ['Ein Rezept pro Zeile', 'Savour liest eine CSV-Datei mit Spaltenüberschriften in der ersten Zeile und einem Rezept pro Zeile. Das Trennzeichen darf ein Komma oder ein Semikolon sein.'],
      [
        'Spaltennamen',
        'Savour erkennt diese Spalten, mit oder ohne Großbuchstaben:',
        [
          'Titel: title, name, naam, titel oder recipe (Pflicht).',
          'Zutaten: ingredients, ingredient oder ingrediënten.',
          'Zubereitung: directions, instructions, method, bereiding, steps oder preparation.',
          'Ausbeute: servings, yield, opbrengst, porties oder serves.',
          'Notizen: notes oder notities.'
        ]
      ],
      ['Mehrere Zeilen in einer Zelle', 'Schreib in der Zutatenzelle jede Zutat in eine eigene Zeile (in Excel mit Alt+Enter, auf dem Mac mit Option+Enter). Dasselbe gilt für die Schritte der Zubereitung.'],
      ['Als CSV speichern', 'In Excel wählst du Datei → Speichern unter → CSV UTF-8. In Google Sheets wählst du Datei → Herunterladen → Kommagetrennte Werte (.csv).'],
      ['Importieren', 'Wähle „Rezept hinzufügen“ → „Rezept importieren“ → „Andere Dateien“ oder „Aus einer anderen Rezept-App“, wähle die .csv-Datei und dann „Verarbeiten“. Erkennt Savour die Spalten nicht, liest der Savour-Leser die Datei als Text.']
    ]
  },
  'import-json': {
    slug: 'de/handbuch-json-und-schema-org-importieren',
    menu: 'JSON, schema.org und Backups',
    h1: 'JSON, schema.org und Savour-Dateien',
    title: 'Rezepte aus JSON, JSON-LD und einem Savour-Backup importieren | Handbuch',
    desc: 'So importierst du Rezepte in fester Form in Savour: JSON und JSON-LD mit schema.org Recipe, HTML mit schema.org, eine Savour-Importdatei und dein eigenes Savour-Backup.',
    lead: 'Rezepte, die schon ordentlich in Feldern stehen: aus einem anderen Programm, einer Webseite oder deinem eigenen Backup.',
    sections: [
      ['schema.org Recipe', 'Viele Programme und Webseiten speichern Rezepte in der festen Form von schema.org (Recipe), als JSON-LD oder in HTML. Savour liest daraus Name, Zutaten, Zubereitung (auch in Schritten und Abschnitten), Ausbeute, Kategorie und Notizen.'],
      ['JSON-Dateien', 'Wähle eine .json-Datei bei „Andere Dateien“ oder „Aus einer anderen Rezept-App“. Savour sucht die Rezepte selbst in der Datei, auch in einer Liste oder in einem Export aus Mealie oder Tandoor. Eine beliebige JSON-Datei ohne Rezepte in erkennbarer Form kann Savour nicht lesen.'],
      ['Dein Savour-Backup zurückspielen', 'Ein [Backup, das du aus Savour herunterlädst](#downloaden) (.json), kannst du bei „Andere Dateien“ wieder importieren. Die Rezepte kommen in die [Prüfansicht](#import-controleren); Rezepte, die schon genau so in deiner Bibliothek stehen, werden nicht doppelt gespeichert.'],
      ['Savour-Importdatei', 'Beim [Import-Service](#import-service) bekommst du manchmal eine Savour-Importdatei (.json) mit Rezepten, die schon gelesen und geprüft sind. Auch die wählst du bei „Andere Dateien“; gespeichert wird erst, wenn du auf Speichern klickst.']
    ]
  },
  'import-notitie-apps': {
    slug: 'de/handbuch-import-aus-notiz-apps',
    menu: 'Notiz-Apps: Notizen, OneNote, Notion',
    h1: 'Rezepte aus Notiz-Apps importieren',
    title: 'Rezepte aus Apple Notizen, OneNote, Notion und Obsidian importieren | Handbuch',
    desc: 'So holst du Rezepte aus Notiz-Apps in Savour: Apple Notizen, Google Docs, OneNote, Notion, Obsidian, Bear, Joplin und Simplenote, über Word, PDF, Markdown oder Text.',
    lead: 'Stehen deine Rezepte verstreut in Notizen auf dem Handy? So kommen sie in Savour.',
    sections: [
      ['Der schnelle Weg', 'Für ein oder ein paar Rezepte: Notiz öffnen, Text kopieren und bei [Text eingeben](#import-tekst) einfügen. Du kannst mehrere Rezepte auf einmal einfügen.'],
      ['Apple Notizen', 'Auf dem Mac wählst du eine Notiz und dann Ablage → Als PDF exportieren und importierst diese [PDF](#import-pdf). Auf dem iPhone kopierst du den Text und fügst ihn bei Text eingeben ein.'],
      ['Google Docs', 'Wähle Datei → Herunterladen → Microsoft Word (.docx) und importiere die [Word-Datei](#import-word). Ein Dokument mit allen Rezepten ist in Ordnung.'],
      ['Microsoft OneNote', 'Exportiere eine Seite oder einen Abschnitt als Word oder PDF (Datei → Exportieren) und importiere diese Datei. Eine einzelne Seite kannst du auch kopieren und einfügen.'],
      ['Notion', 'Wähle bei der Seite mit deinen Rezepten ⋯ → Exportieren → Markdown & CSV. Du bekommst eine ZIP mit .md-Dateien; wähle sie bei „Alle Dateien gemischt“. Siehe [Ein ganzer Ordner oder eine ZIP](#import-hele-map).'],
      ['Obsidian, Bear, Joplin und Simplenote', 'Diese Apps speichern Notizen als Markdown oder Text oder können sie so exportieren. Wähle den Ordner mit .md- oder .txt-Dateien mit „Ganzen Ordner wählen“ oder pack sie in eine ZIP. Jede Datei ist dann ein Rezept, mit der #-Überschrift als Rezeptname.'],
      ['Evernote und Google Keep', 'Dafür hat Savour einen eigenen Import: siehe [Evernote](#import-evernote) und [Google Keep](#import-google-keep).']
    ]
  },
  'import-ai': {
    slug: 'de/handbuch-savour-leser-und-ki',
    menu: 'Der Savour-Leser und die KI',
    title: 'Der Savour-Leser und KI: wann die KI deine Rezepte liest | Handbuch',
    desc: 'Wie Savour Rezepte liest: immer zuerst der Savour-Leser, kostenlos und ohne KI. Die KI von Savour Pro liest Fotos, Scans und Zweifelsfälle, bis 500 pro Monat.',
    lead: 'Was der Savour-Leser tut, wann die KI dazukommt und warum nie etwas erfunden wird.',
    sections: [
      ['Der Savour-Leser geht immer zuerst', 'Word, PDF, Text und Exporte anderer Apps liest der Savour-Leser: ein eigenes Programm, das Rezepte aufteilt und Titel, Ausbeute, Zutaten und Zubereitung erkennt. Das ist kostenlos, und nichts geht an eine KI.'],
      [
        'Wann die KI hilft',
        'Mit [Savour Pro](#gratis-en-pro) kommt die KI dazu für:',
        ['Fotos handschriftlicher oder gescannter Rezepte und die Kamera.', 'Gescannte PDFs ohne Text.', 'Rezepte, bei denen der Savour-Leser zweifelt: Die werden erneut gelesen.']
      ],
      ['Ohne Pro', 'Bei einem kostenlosen Konto siehst du, wie viele Rezepte mit Zweifeln gelesen wurden. Sie sind markiert, damit du sie selbst in der [Prüfansicht](#import-controleren) nachsehen kannst. Es geht nichts verloren.'],
      ['Das Limit', 'Savour Pro liest bis 500 Importe pro Monat mit KI. Ist das Limit erreicht, übernimmt der Savour-Leser, markiert zum Prüfen.'],
      ['Nie erfunden', 'Die KI darf nur lesen, was dasteht. Steht die Zubereitung nicht auf der Notiz, steht sie auch nicht im Rezept. Warum das so wichtig ist, liest du in [Warum KI dein Rezept nie erfinden darf](/blog/ai-mag-je-recept-niet-verzinnen).']
    ]
  },
  overstappen: {
    slug: 'de/handbuch-umstieg-auf-savour',
    menu: 'Umstieg auf Savour',
    title: 'Umstieg auf Savour aus einer anderen Rezept-App | Handbuch',
    desc: 'Alle Rezept-Apps, aus denen du auf Savour umsteigst: Paprika, Mela, Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton, MasterCook, Cookmate, Living Cookbook und mehr.',
    lead: 'Aus welcher App du auch kommst: Export erstellen, Datei wählen, und deine Rezepte sind in Savour.',
    sections: [
      ['So funktioniert der Umstieg', 'Fast jede Rezept-App kann einen Export erstellen: eine Datei mit allen Rezepten. Diese Datei wählst du in Savour bei „Aus einer anderen Rezept-App“. Savour erkennt selbst, aus welcher App sie kommt.'],
      [
        'Apps mit eigenem Import',
        'Pro App steht beschrieben, wie du den Export erstellst:',
        [
          '[Paprika](#import-paprika): .paprikarecipes und .paprikarecipe',
          '[Mela](#import-mela): .melarecipes und .melarecipe',
          '[Mealie](#import-mealie): .zip mit JSON',
          '[Tandoor](#import-tandoor): .json oder .zip',
          '[Recipe Keeper](#import-recipe-keeper): .zip',
          '[Copy Me That](#import-copy-me-that): .zip mit HTML',
          '[Crouton](#import-crouton): .zip mit .crumb',
          '[MasterCook](#import-mastercook): .mx2 und .mxp',
          '[Cookmate](#import-cookmate): .mcb',
          '[Living Cookbook](#import-living-cookbook): .fdx und .fdxz',
          '[Evernote](#import-evernote): .enex',
          '[Google Keep](#import-google-keep): .zip aus Google Takeout',
          '[Flavorish](#import-flavorish): .zip',
          '[CookBookManager](#import-cookbookmanager): .zip mit .yml',
          '[Plan to Eat](#import-plan-to-eat): .csv',
          '[Pepperplate](#import-pepperplate): ohne Exportdatei'
        ]
      ],
      ['Deine App ist nicht dabei?', 'Schau, ob deine App als CSV, HTML, JSON (schema.org), Word, PDF oder Text exportieren kann; das liest Savour fast immer. Siehe [Excel und CSV](#import-csv), [JSON und schema.org](#import-json) und [Textdateien](#import-tekstbestanden). Klappt es nicht, [nimm Kontakt auf](/contact) und schick ein Beispiel deines Exports mit.'],
      ['Deine alte App kündigen', 'Behalte deine alte App noch eine Weile neben Savour, bis du alles geprüft hast. Bewahre die Exportdatei als Backup auf.'],
      ['Vergleichen', 'Noch unsicher? In [Savour, Paprika, Meez und Galley im Vergleich](/blog/savour-paprika-meez-galley-vergelijken) stehen die Unterschiede und die Zielgruppe jeder App.']
    ]
  },
  'import-pepperplate': {
    slug: 'de/handbuch-import-aus-pepperplate',
    menu: 'Umstieg von Pepperplate',
    h1: 'Rezepte aus Pepperplate übertragen',
    title: 'Rezepte aus Pepperplate zu Savour übertragen | Handbuch',
    desc: 'So überträgst du Rezepte aus Pepperplate zu Savour: Pepperplate hat keine brauchbare Exportdatei, aber mit dem Link oder durch Kopieren klappt es.',
    lead: 'Pepperplate hat keinen Export, den Savour lesen kann. So bekommst du deine Rezepte trotzdem herüber.',
    sections: [
      ['Warum kein eigener Import', 'Pepperplate erstellt keine Exportdatei mit Rezepten in fester Form. Andere Apps holen Rezepte, indem sie sich mit deinem Pepperplate-Passwort anmelden. Savour tut das bewusst nicht: Savour fragt nie nach deinem Passwort für einen anderen Dienst.'],
      ['Rezepte von Webseiten', 'Stammte ein Rezept ursprünglich von einer Webseite, importiere es mit dem Link neu: siehe [Rezept von einer Webseite](#import-website).'],
      ['Eigene Rezepte', 'Öffne das Rezept in Pepperplate, kopiere den Text und füge ihn bei [Text eingeben](#import-tekst) ein. Du kannst mehrere Rezepte hintereinander einfügen; lass eine Leerzeile dazwischen.'],
      ['Viele Rezepte', 'Hast du Hunderte Rezepte und keine Zeit zum Kopieren, überträgt der [Import-Service](#import-service) sie für dich.']
    ]
  },
  'import-service': {
    slug: 'de/handbuch-import-service',
    menu: 'Der Import-Service',
    title: 'Der Import-Service: deinen Rezeptordner übertragen lassen | Handbuch Savour',
    desc: 'Keine Zeit, selbst zu importieren? Beim Import-Service von Savour übertragen Köche deinen ganzen Rezeptordner, in der Struktur, die du wählst, Rezept für Rezept geprüft.',
    lead: 'Keine Zeit, es selbst zu tun? Dann übertragen die Köche hinter Savour deinen Rezeptordner für dich.',
    sections: [
      ['Was es ist', 'Beim Import-Service lieferst du deine Rezepte so, wie sie sind: Word, PDF, Fotos, Notizen oder ein Export aus einer anderen App. Die Köche hinter Savour übertragen sie in der Struktur, die du wählst, und legen jedes Rezept neben das Original.'],
      ['Anfragen', 'Auf der Seite [Import-Service](/recepten-laten-inladen) fragst du an und siehst, was es kostet. Danach lädst du deine Dateien über die Website hoch.'],
      ['Was du zurückbekommst', 'Deine Rezepte stehen in deinem eigenen Savour-Konto, oder du bekommst eine Savour-Importdatei, die du selbst [importierst](#import-json). Du prüfst sie in der [Prüfansicht](#import-controleren), bevor sie gespeichert werden.'],
      ['Mehr lesen', 'Wie es in der Praxis läuft: [Den Rezeptordner übertragen lassen](/blog/receptenmap-laten-overzetten).']
    ]
  },
  'import-problemen': {
    slug: 'de/handbuch-probleme-beim-importieren',
    menu: 'Probleme beim Importieren',
    title: 'Probleme beim Importieren von Rezepten lösen | Handbuch Savour',
    desc: 'Was tun, wenn der Import nicht klappt: keine Rezepte gefunden, eine Datei, die nicht gelesen wird, Rezepte, die zusammenkleben, Fotos ohne Pro und mehr.',
    lead: 'Die häufigsten Meldungen beim Importieren und was du tun kannst.',
    sections: [
      ['Keine Rezepte im Export gefunden', 'Savour erkennt die Rezepte in der Datei nicht. Prüfe, ob du den richtigen Export gewählt hast (siehe die Seite deiner App unter [Umstieg auf Savour](#overstappen)). Eine beliebige ZIP oder JSON ohne Rezepte in erkennbarer Form kann Savour nicht lesen.'],
      ['Datei enthält keinen lesbaren Text', 'Wahrscheinlich ist es eine gescannte PDF. Die liest die KI mit [Savour Pro](#gratis-en-pro). Siehe [PDF-Dateien](#import-pdf).'],
      ['Fotos lesen geht nur mit Savour Pro', 'Fotos, die Kamera und Scans werden von der KI gelesen. Probiere die 7 Tage Pro kostenlos, oder tippe das Rezept mit [Selbst eingeben](#recept-maken) ab.'],
      ['Zwei Rezepte kleben zusammen', 'Der Leser hat keinen neuen Rezeptnamen gesehen. Korrigiere es in der Prüfansicht, oder setze im Dokument den Titel jedes Rezepts als Überschrift oder fett und importiere erneut.'],
      ['Zutaten stehen bei der Zubereitung', 'Setz in deinem Dokument eine Überschrift „Zutaten“ und „Zubereitung“. Savour markiert solche Rezepte als Zweifelsfall; mit Pro liest die KI sie erneut.'],
      ['Eine .doc- oder Pages-Datei klappt nicht', 'Speichere eine alte .doc-Datei in Word als .docx. Eine Pages-Datei exportierst du in Pages als Word oder PDF.'],
      ['Nummern vor den Rezeptnamen', 'Entferne sie nach dem Speichern in einem Schritt mit [Aufräumen](#opschonen).'],
      ['Rezepte sind doppelt', 'Genau gleiche Rezepte speichert Savour nur einmal. Fast gleiche findest du mit [Aufräumen](#opschonen).'],
      ['Immer noch nicht richtig', 'Wähle unten auf der Website „Problem melden“ und schick die Datei oder einen Screenshot mit. Siehe [Problem melden und Kontakt](#probleem-melden).']
    ]
  }
};

// Seite pro Rezept-App (Sjabloon: tools/handleiding/talen.mjs → app).
export const apps = {
  'import-paprika': {
    files: 'eine .paprikarecipes-Datei (alle Rezepte) oder eine .paprikarecipe-Datei (ein Rezept)',
    desc: 'So holst du deine Rezepte aus Paprika Recipe Manager in Savour: als .paprikarecipes exportieren und die Datei importieren, mit Fotos, Notizen und Ausbeute.',
    lead: 'Von Paprika zu Savour in ein paar Minuten, mit deinen Fotos.',
    export: 'Wähle in Paprika die Rezepte, die du mitnehmen willst (oder alle), und wähle Exportieren. Als Format wählst du „Paprika Recipe Format“. Am Computer findest du Exportieren im Menü Datei, am Handy oder Tablet im Teilen-Menü. Die genaue Stelle unterscheidet sich je nach Version.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung, Ausbeute (servings), Notizen (am Ende der Zubereitung) und das Rezeptfoto.',
    extra: [['Auch als HTML', 'Hast du aus Paprika als HTML exportiert, kannst du diese Dateien oder die ZIP auch wählen; Savour liest die Rezepte aus dem HTML.']]
  },
  'import-mela': {
    files: 'ein .melarecipes-Archiv (mehrere Rezepte) oder eine .melarecipe-Datei (ein Rezept)',
    desc: 'So holst du deine Rezepte aus Mela in Savour: als .melarecipes exportieren und das Archiv importieren, mit Foto, Zwischenüberschriften, Notizen und Ausbeute.',
    lead: 'Deine Mela-Rezepte mit Fotos und Zwischenüberschriften in Savour.',
    export: 'Auf dem Mac klickst du in Mela mit der rechten Maustaste auf „Alle“ im Menü links und wählst den Export aller Rezepte. Wähle, wo das .melarecipes-Archiv gespeichert wird. Eine kleinere Auswahl exportierst du genauso aus einer anderen Kategorie, etwa Favoriten. Ein einzelnes Rezept teilst du als .melarecipe.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung, Ausbeute, Notizen und das erste Foto. Zwischenüberschriften in Zutaten oder Zubereitung („# Sauce“) werden [Teile des Rezepts](#recept-delen), etwa „Sauce:“.'
  },
  'import-mealie': {
    files: 'einen Export deiner Rezepte als JSON, einzeln oder in einer .zip',
    desc: 'So holst du deine Rezepte aus Mealie in Savour: als JSON oder ZIP exportieren und die Datei importieren. Zutaten mit Menge und Einheit werden übernommen.',
    lead: 'Von deinem eigenen Mealie-Server zu Savour.',
    export: 'Exportiere deine Rezepte in Mealie als JSON. Je nach Version findest du das beim Export von Rezepten oder bei der Datenverwaltung. Du bekommst eine .json-Datei oder eine .zip mit JSON-Dateien.',
    carries: 'Savour übernimmt: Name, Zutaten (auch wenn Menge, Einheit, Produkt und Notiz getrennt stehen), Zubereitung, Ausbeute und Notizen.'
  },
  'import-tandoor': {
    files: 'einen Export als .json oder eine .zip mit JSON-Dateien',
    desc: 'So holst du deine Rezepte aus Tandoor Recipes in Savour: als JSON exportieren und die Datei importieren.',
    lead: 'Von Tandoor Recipes zu Savour.',
    export: 'Öffne in Tandoor die Einstellungen und wähle Exportieren. Wähle einen Exporttyp mit Rezepten als JSON in schema.org-Form, wähle „Alle Rezepte“ oder eine Auswahl und lade die Datei herunter, wenn sie fertig ist.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung (auch in Schritten), Ausbeute und Notizen. Fotos sind in so einem Export nicht enthalten.'
  },
  'import-recipe-keeper': {
    files: 'die .zip-Datei, die Recipe Keeper beim Export erstellt',
    desc: 'So holst du deine Rezepte aus Recipe Keeper in Savour: als ZIP exportieren und in einem Schritt importieren.',
    lead: 'Von Recipe Keeper zu Savour, mit allen Rezepten in einer ZIP.',
    export: 'Wähle in Recipe Keeper in den Einstellungen den Export deiner Rezepte. Du bekommst eine .zip-Datei. Entpacke sie nicht.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung, Ausbeute, Kategorie und Notizen, so wie sie im Export stehen.'
  },
  'import-copy-me-that': {
    files: 'einen .zip-Export mit der Option HTML',
    desc: 'So holst du deine Rezepte aus Copy Me That in Savour: als HTML exportieren, du bekommst eine ZIP, und die in Savour importieren.',
    lead: 'Von Copy Me That zu Savour.',
    export: 'Wähle in Copy Me That bei deinem Konto den Export deiner Rezepte und die Option „HTML“. Du bekommst eine .zip-Datei.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung, Ausbeute und Notizen. Steht ein Rezept nicht in fester Form im HTML, liest der Savour-Leser den Text.'
  },
  'import-crouton': {
    files: 'eine .zip mit .crumb-Dateien oder eine einzelne .crumb-Datei',
    desc: 'So holst du deine Rezepte aus Crouton in Savour: als ZIP mit .crumb-Dateien exportieren und importieren.',
    lead: 'Von Crouton auf iPhone, iPad oder Mac zu Savour.',
    export: 'Öffne Crouton auf iOS oder macOS und geh in die Einstellungen. Wähle den Export deiner Rezepte (der genaue Name unterscheidet sich je nach Version). Du bekommst eine .zip mit einer .crumb-Datei pro Rezept.',
    carries: 'Savour übernimmt: Name, Zutaten mit Menge und Einheit, Zubereitung, Ausbeute und Notizen.'
  },
  'import-mastercook': {
    files: 'eine .mx2-Datei (MasterCook XML) oder eine .mxp-Datei',
    desc: 'So holst du deine Rezepte aus MasterCook in Savour: als .mx2 oder .mxp exportieren und die Datei importieren.',
    lead: 'Von MasterCook zu Savour, auch mit alten Kochbüchern.',
    export: 'Öffne in MasterCook das Kochbuch und wähle Datei → Exportieren. Als Format wählst du MasterCook (.mx2) oder den älteren Textexport (.mxp).',
    carries: 'Savour übernimmt: Name, Zutaten mit Menge und Einheit, Zubereitung, Portionen und Notizen. Eine .mxp-Datei liest der Savour-Leser als Text; prüfe diese Rezepte etwas genauer.'
  },
  'import-cookmate': {
    files: 'eine .mcb-Datei, der Export von Cookmate (früher My Cookbook)',
    desc: 'So holst du deine Rezepte aus Cookmate (My Cookbook) in Savour: als .mcb exportieren und die Datei importieren, mit Fotos.',
    lead: 'Von Cookmate zu Savour, mit den Fotos deiner Rezepte.',
    export: 'Wähle in Cookmate den Export oder das Backup deiner Rezepte. Speichere die .mcb-Datei auf Handy oder Computer; Savour liest sie, ohne dass du sie entpackst.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung, Ausbeute, Anmerkungen (am Ende der Zubereitung) und das Foto, wenn es im Export ist.'
  },
  'import-living-cookbook': {
    files: 'eine .fdx- oder .fdxz-Datei',
    desc: 'So holst du deine Rezepte aus Living Cookbook in Savour: das Kochbuch als FDX oder FDXZ exportieren und die Datei importieren, mit Fotos und Tipps.',
    lead: 'Von Living Cookbook zu Savour.',
    export: 'Exportiere in Living Cookbook dein Kochbuch oder deine Rezepte im Format FDX oder FDXZ (FDXZ ist eine komprimierte Version mit Fotos). Eine .lcb-Datei (die Kochbuch-Datenbank selbst) kann Savour nicht lesen.',
    carries: 'Savour übernimmt: Name, Zutaten mit Menge und Einheit, Zubereitungsschritte, Portionen, Anmerkungen, Tipps und das Foto.'
  },
  'import-evernote': {
    files: 'eine .enex-Datei mit deinen Rezeptnotizen',
    desc: 'So holst du Rezepte aus Evernote in Savour: Rezeptnotizen als .enex exportieren, Savour liest jede Notiz als Rezept.',
    lead: 'Rezepte, die du jahrelang in Evernote gesammelt hast, in einem Schritt in Savour.',
    export: 'Wähle in Evernote die Notizen mit deinen Rezepten (oder ein ganzes Notizbuch) und dann Datei → Notizen exportieren. Wähle das Format .enex und speichere die Datei.',
    carries: 'Jede Notiz wird ein Rezept, mit dem Titel der Notiz als Rezeptname. Den Text liest der Savour-Leser: Zutaten, Zubereitung und Ausbeute. Notizen ohne Zutaten oder Zubereitung (etwa eine Liste) werden zum Prüfen markiert, damit du sie in der Prüfansicht leicht entfernst. Schlagwörter und Anhänge werden nicht übernommen.'
  },
  'import-google-keep': {
    files: 'eine .zip aus Google Takeout mit deinen Keep-Notizen',
    desc: 'So holst du Rezepte aus Google Keep in Savour: Notizen mit Google Takeout als ZIP herunterladen und importieren. Jede Notiz wird ein Rezept.',
    lead: 'Deine Rezeptnotizen aus Google Keep in Savour.',
    export: 'Geh zu Google Takeout (takeout.google.com), wähle nur „Keep“ und erstelle den Export. Lade die .zip herunter, wenn Google meldet, dass sie fertig ist.',
    carries: 'Jede Notiz wird ein Rezept, mit dem Titel der Notiz als Rezeptname; das Datum darüber fällt weg. Checklisten werden eine Zeile pro Punkt. Notizen ohne Zubereitung (etwa eine Einkaufsliste) werden zum Prüfen markiert, damit du sie in der Prüfansicht entfernst.'
  },
  'import-flavorish': {
    files: 'die .zip-Datei, die Flavorish beim Export erstellt',
    desc: 'So holst du deine Rezepte aus Flavorish in Savour: als ZIP exportieren und importieren, mit Fotos und Zwischenüberschriften.',
    lead: 'Von Flavorish zu Savour, mit deinen Fotos.',
    export: 'Öffne in Flavorish den Tab Account. Wähle unter „Import & Export“ den Export deiner Rezepte. Du bekommst eine .zip mit Rezepten und Fotos.',
    carries: 'Savour übernimmt: Name, Zutaten und Zubereitung in der richtigen Reihenfolge, Zwischenüberschriften als [Teile des Rezepts](#recept-delen), Portionen, Notizen und das Foto.'
  },
  'import-cookbookmanager': {
    files: 'den YAML-Export von CookBookManager.com: eine .zip mit einer .yml-Datei pro Rezept',
    desc: 'So holst du deine Rezepte aus CookBookManager.com in Savour: YAML-Export wählen, du bekommst eine ZIP, und die in Savour importieren.',
    lead: 'Von CookBookManager.com zu Savour.',
    export: 'Wähle auf CookBookManager.com den Export deiner Rezepte und das Format YAML. Speichere die .zip.',
    carries: 'Savour übernimmt: Name, Zutaten, Zubereitung, Portionen, Notizen (mit einem Videolink, falls vorhanden) und das erste Schlagwort als Kategorie. Eine Zutatenzeile, die mit einem Doppelpunkt endet, wird ein [Teil des Rezepts](#recept-delen).'
  },
  'import-plan-to-eat': {
    files: 'einen .csv-Export deiner Rezepte',
    desc: 'So holst du deine Rezepte aus Plan to Eat in Savour: als CSV exportieren und die Datei importieren.',
    lead: 'Von Plan to Eat zu Savour.',
    export: 'Wähle in Plan to Eat in deinen Einstellungen den Export deiner Rezepte als CSV und lade die Datei herunter.',
    carries: 'Savour liest die Spalten für Titel, Zutaten, Zubereitung, Portionen und Notizen. Wie Savour Spalten erkennt, steht unter [Excel und CSV](#import-csv).'
  }
};
