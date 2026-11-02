// Handbuch (Duits), Abschnitt „Rezepte erstellen und bearbeiten“.

export const groups = {
  recepten: {
    name: 'Rezepte erstellen und bearbeiten',
    intro: 'Ein Rezept so eingeben, dass Umrechnen, Drucken und Teilen gut funktionieren: Zutaten, Zubereitung, Teile, Ausbeute, Fotos, Notizen und Grundrezepte.'
  }
};

export const pages = {
  'recept-maken': {
    slug: 'de/handbuch-rezept-bearbeiten',
    menu: 'Ein Rezept erstellen und bearbeiten',
    title: 'Ein Rezept in Savour erstellen und bearbeiten | Handbuch',
    desc: 'So erstellst und bearbeitest du ein Rezept in Savour: Name, Ausbeute, Kategorie, Foto, Zutaten und Zubereitung, ein Rezept in Teilen, Speichern und wer bearbeiten darf.',
    lead: 'Ein neues Rezept eingeben oder ein bestehendes ändern, Schritt für Schritt.',
    sections: [
      ['Ein neues Rezept', 'Wähle im Menü „Rezept hinzufügen“ und dann „Selbst eingeben“. Der Bildschirm „Neues Rezept“ öffnet sich mit den Feldern Name, Ergibt, Kategorie, Rezeptfoto, Zutaten und Zubereitung.'],
      [
        'Die Felder',
        'So füllst du sie aus:',
        [
          'Name: kurz und eindeutig, damit alle das Rezept mit einem Suchwort finden.',
          '[Ausbeute](#recept-opbrengst): was das Rezept ergibt, etwa „1 Liter“ oder „40 Stück“.',
          '[Kategorie](#categorieen): was für ein Rezept es ist, etwa Saucen oder Patisserie.',
          '[Foto](#recept-foto): optional, ein Foto des Gerichts.',
          '[Zutaten](#recept-ingredienten): jede Zutat in einer eigenen Zeile.',
          '[Zubereitung](#recept-bereiding): kurze Schritte, ein Handgriff pro Schritt.'
        ]
      ],
      ['Ein Rezept in Teilen', 'Besteht dein Rezept aus Teig, Füllung und Sauce? Wähle „＋ Teil hinzufügen“ und gib jedem Teil eigene Zutaten und eine eigene Zubereitung. Siehe [Ein Rezept in Teilen](#recept-delen).'],
      ['Speichern', 'Wähle „Speichern“. Mit „Abbrechen“ oder „← Zurück“ gehst du zurück, ohne zu speichern. Gibt es schon ein genau gleiches Rezept, wird es nicht doppelt gespeichert.'],
      ['Ein Rezept bearbeiten', 'Öffne das Rezept und wähle „Bearbeiten“. Du siehst dieselben Felder. Ändere, was du willst, und wähle „Speichern“. Wer in deinem [Küchenteam](#keukenteams) ist, sieht die neue Version sofort.'],
      ['Wer bearbeiten darf', 'Ein Rezept kann nur sein Ersteller bearbeiten. In einem Küchenteam sehen andere das Rezept; mit „Zu meinen Rezepten hinzufügen“ übernehmen sie eine eigene Kopie, die sie selbst ändern können. Siehe [Ein Rezept übernehmen](#recept-overnemen).'],
      ['Schnell viele Rezepte', 'Hast du deine Rezepte schon in Word, PDF oder einer anderen App, ist [Importieren](#importeren) viel schneller als Abtippen.']
    ]
  },
  'recept-ingredienten': {
    slug: 'de/handbuch-zutaten-und-mengen',
    menu: 'Zutaten und Mengen',
    title: 'Zutaten und Mengen so eingeben, dass das Umrechnen stimmt | Handbuch',
    desc: 'So gibst du Zutaten in Savour ein: Menge vorne, welche Zahlen, Brüche und Einheiten Savour erkennt und umrechnet, und was bewusst nicht umgerechnet wird.',
    lead: 'Wie du Zutaten schreibst, damit Savour sie erkennt, fett darstellt und richtig umrechnet.',
    sections: [
      ['Eine Zutat pro Zeile', 'Schreib jede Zutat in eine eigene Zeile, mit der Menge vorne: „250 g Butter“, „1,5 l Sahne“, „2 EL Senf“. Mit „＋ Zutat hinzufügen“ legst du eine neue Zeile an, mit dem Kreuz entfernst du eine.'],
      ['Zahlen', 'Savour erkennt 1, 1,5, 1.000, ½, 1½, 1 1/2 und einen Bereich wie 2-3. Die Menge steht im Rezept fett, damit du sie in der Küche schnell siehst.'],
      ['Einheiten, die umgerechnet werden', 'g, kg, mg, ml, cl, dl, l, TL und EL (niederländisch tl und el) werden umgerechnet, ebenso tsp, tbsp, cup, oz und lb. Wie Savour beim Umrechnen eine praktische Einheit wählt, steht unter [Einheiten und Runden](#eenheden).'],
      ['Stück und andere Einheiten', 'Stück, Zweige, Zehen, Blätter, Bund und Scheiben werden erkannt und mitgerechnet, aber nicht in eine andere Einheit umgewandelt.'],
      ['Nicht umrechnen', '„Nach Geschmack“, „Prise“, „Messerspitze“ und „Schuss“ werden bewusst nicht umgerechnet. Bei großen Mengen schmeckst du sie neu ab.'],
      ['Reihenfolge', 'Schreib die Zutaten in der Reihenfolge, in der du sie verwendest, und Gewichte in Gramm oder Milliliter statt in Löffeln oder Tassen. Dann rechnet alles exakt um. Mehr: [Ein Rezept, das jeder gleich macht](#tips-recept-schrijven).'],
      ['Ein Grundrezept als Zutat', 'Nutzt du ein eigenes Rezept, etwa einen Fond, als Zutat? Verknüpfe sie, dann öffnest du das Grundrezept mit einem Tipp. Siehe [Mit einem Grundrezept verknüpfen](#recept-koppelen).']
    ]
  },
  'recept-bereiding': {
    slug: 'de/handbuch-zubereitung-schreiben',
    menu: 'Die Zubereitung schreiben',
    title: 'Die Zubereitung eines Rezepts in Schritten schreiben | Handbuch Savour',
    desc: 'So schreibst du die Zubereitung in Savour: kurze Schritte, ein Handgriff pro Schritt, mit Temperaturen, Zeiten und kritischen Punkten. Schritte hinzufügen, entfernen und abhaken.',
    lead: 'Eine Zubereitung, die jeder in deiner Küche gleich ausführt.',
    sections: [
      ['Schritte hinzufügen', 'Mit „＋ Schritt hinzufügen“ legst du einen neuen Schritt an, mit dem Kreuz entfernst du einen. Die Schritte werden im Rezept nummeriert.'],
      ['Ein Handgriff pro Schritt', 'Schreib kurze Schritte, einen Handgriff pro Schritt. „Schalotte fein schneiden“ und „In Butter ohne Farbe anschwitzen“ sind zwei Schritte. So kannst du sie im [Kochmodus](#kookmodus) abhaken.'],
      ['Kritische Punkte', 'Schreib dazu, worauf es ankommt: Temperaturen, Zeiten, die gewünschte Dicke oder Farbe. „Auf ein Drittel reduzieren“ oder „Kerntemperatur 58 °C“ verhindert mehr Fehler als eine schöne Beschreibung.'],
      ['Teile mit eigener Zubereitung', 'Hat dein Rezept mehrere Teile, hat jeder Teil eine eigene Zubereitung. Siehe [Ein Rezept in Teilen](#recept-delen).'],
      ['Anmerkungen', 'Was kein Schritt ist, etwa „ab 5 kg länger ruhen lassen“, schreibst du in eine [Notiz](#recept-notities).']
    ]
  },
  'recept-delen': {
    slug: 'de/handbuch-rezept-in-teilen',
    menu: 'Ein Rezept in Teilen',
    title: 'Ein Rezept in Teilen: Teig, Füllung, Sauce und Garnitur | Handbuch Savour',
    desc: 'So erstellst du in Savour ein zusammengesetztes Rezept mit Teilen wie Teig, Füllung und Sauce, jeweils mit eigenen Zutaten und eigener Zubereitung. Auch beim Import und Umrechnen.',
    lead: 'Ein zusammengesetztes Gericht in einem Rezept, mit den eigenen Zutaten und der Zubereitung jeder Komponente.',
    sections: [
      ['Wann du Teile nutzt', 'Für ein Gericht aus Komponenten: eine Tarte mit Teig, Füllung und Glasur, oder ein Teller mit Fleisch, Sauce und Garnitur. Alles steht in einem Rezept, und trotzdem weiß jeder, was zu welcher Komponente gehört.'],
      ['Einen Teil hinzufügen', 'Wähle im Rezept „＋ Teil hinzufügen“. Gib dem Teil einen Namen wie „Teig“ und fülle die eigenen Zutaten und die Zubereitung aus. Füge so viele Teile hinzu, wie du willst.'],
      ['Beim Import', 'Eine Zeile, die mit einem Doppelpunkt endet, etwa „Teig:“, wird beim Import als Überschrift eines Teils erkannt. Auch Zwischenüberschriften aus [Mela](#import-mela), [Flavorish](#import-flavorish) und [CookBookManager](#import-cookbookmanager) werden Teile.'],
      ['Umrechnen und Drucken', 'Beim [Umrechnen](#omrekenen) werden alle Teile mitgerechnet. Auf dem [Ausdruck](#printen) steht jeder Teil mit seinem Namen über seinen Zutaten und seiner Zubereitung.'],
      ['Oder lieber ein Grundrezept', 'Nutzt du eine Komponente in vielen Rezepten, etwa einen Fond oder einen Grundteig? Mach daraus ein eigenes Rezept und [verknüpfe es](#recept-koppelen). Dann änderst du es an einer Stelle.']
    ]
  },
  'recept-opbrengst': {
    slug: 'de/handbuch-ausbeute',
    menu: 'Ausbeute und Portionen',
    title: 'Die Ausbeute eines Rezepts: Liter, Stück oder Gedecke | Handbuch Savour',
    desc: 'So gibst du die Ausbeute eines Rezepts in Savour ein, etwa 1 Liter, 40 Stück oder 8 Gedecke, und warum du sie zum Umrechnen auf die benötigte Menge brauchst.',
    lead: 'Mit einer Ausbeute rechnest du später genau auf das um, was du brauchst.',
    sections: [
      ['Was du einträgst', 'Trag bei Ergibt ein, was das Rezept ergibt, mit einer Zahl: „1 Liter“, „2,5 kg“, „40 Stück“ oder „8 Gedecke“. Im Rezept steht es oben, neben der Anzahl Zutaten und Schritte.'],
      ['Warum es hilft', 'Mit einer Ausbeute kannst du bei [Mehr umrechnen](#omrekenen-meer) die gewünschte Ausbeute eintragen: Brauchst du 3,5 Liter von einem Rezept für 1 Liter, trag 3,5 ein, und Savour rechnet alles um.'],
      ['Beim Import', 'Der Savour-Leser holt die Ausbeute auch aus einer Überschrift wie „Zutaten (4 Personen)“. Aus anderen Apps werden Portionen oder „servings“ übernommen.'],
      ['Ohne Ausbeute', 'Auch ohne Ausbeute kannst du mit den Schnellknöpfen oder einem eigenen Faktor umrechnen. Siehe [Umrechnen](#omrekenen).']
    ]
  },
  'recept-foto': {
    slug: 'de/handbuch-foto-zum-rezept',
    menu: 'Fotos und die Original-Notiz',
    title: 'Ein Foto zum Rezept und die Original-Notiz | Handbuch Savour',
    desc: 'So fügst du einem Rezept in Savour ein Foto hinzu, wie die Original-Notiz eines importierten Fotos gespeichert bleibt und wie Fotos beim Drucken mitkommen.',
    lead: 'Ein Foto des Gerichts, und bei einer importierten Notiz das Original daneben.',
    sections: [
      ['Foto des Gerichts', 'Wähle im Rezept bei „Rezeptfoto — optional“ ein Foto. Savour verkleinert es automatisch, damit es schnell lädt. Ein Foto hilft dem Team zu sehen, wie der Teller aussehen soll.'],
      ['Die Original-Notiz', 'Wurde das Rezept von einem [Foto oder Scan](#import-fotos) gelesen, bleibt die Original-Notiz gespeichert. Wähle im Rezept „Original-Notiz ansehen“, um sie danebenzulegen, etwa um eine Zahl zu prüfen.'],
      ['Fotos aus anderen Apps', 'Beim Umstieg aus [Paprika](#import-paprika), [Mela](#import-mela), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook) und [Flavorish](#import-flavorish) kommt das Rezeptfoto mit.'],
      ['Beim Drucken', 'Beim [Drucken mehrerer Rezepte](#printen-map) wählst du mit „Mit Fotos“, ob Fotos mitkommen.']
    ]
  },
  'recept-notities': {
    slug: 'de/handbuch-notizen-zum-rezept',
    menu: 'Notizen zu einem Rezept',
    title: 'Notizen zu einem Rezept: feste Anmerkungen und Tipps | Handbuch Savour',
    desc: 'So fügst du in Savour einem Rezept eine Notiz hinzu: eine feste Anmerkung neben dem Rezept, ändern und wählen, ob Notizen beim Drucken mitkommen.',
    lead: 'Eine feste Anmerkung neben dem Rezept, für alles, was keine Zutat und kein Schritt ist.',
    sections: [
      ['Eine Notiz hinzufügen', 'Öffne ein eigenes Rezept und wähle „＋ Notiz“. Schreib deine Anmerkung, etwa „ab 5 kg länger ruhen lassen“ oder „Lieferant: Metzgerei Weber“. Mit „Ändern“ passt du sie später an.'],
      ['Wofür', 'Nutze Notizen für alles, was nicht in die Zutaten oder die Zubereitung gehört: Varianten, Haltbarkeit, die Quelle des Rezepts, Allergene oder eine Anmerkung fürs Team.'],
      ['Beim Drucken', 'Beim [Drucken mehrerer Rezepte](#printen-map) wählst du mit „Mit Notizen“, ob Notizen mitkommen.'],
      ['Notizen aus anderen Apps', 'Beim [Import aus einer anderen App](#overstappen) kommen Notizen ans Ende der Zubereitung, nach „Notizen:“, damit nichts verloren geht.']
    ]
  },
  'recept-koppelen': {
    slug: 'de/handbuch-mit-grundrezept-verknuepfen',
    menu: 'Mit einem Grundrezept verknüpfen',
    title: 'Eine Zutat mit einem Grundrezept wie einem Fond verknüpfen | Handbuch',
    desc: 'So verknüpfst du in Savour eine Zutat mit einem eigenen Grundrezept, etwa einem Fond in deiner Jus: automatisch über den Namen oder selbst gewählt, und mit einem Tipp zum Grundrezept.',
    lead: 'Von der Jus zum Fond mit einem Tipp und wieder zurück.',
    sections: [
      ['Automatisch über den Namen', 'Nutzt du ein eigenes Rezept als Zutat und heißt die Zutat genau wie dieses Rezept, verknüpft Savour sie von selbst.'],
      ['Selbst verknüpfen', 'Heißt sie anders, öffne das Rezept, wähle ⋯ und „Mit Rezept verknüpfen“. Wähle, welche Zutat zu welchem eigenen Rezept gehört.'],
      ['Im Rezept', 'Neben der verknüpften Zutat steht „Rezept“. Ein Tipp, und du bist im Grundrezept, mit einem Knopf zurück zum Rezept, von dem du kamst.'],
      ['Warum Grundrezepte', 'Einen Fond, Grundteig oder eine Sauce, die du in vielen Rezepten nutzt, änderst du so an einer Stelle. Alle im [Küchenteam](#keukenteams) arbeiten dann mit derselben Version.']
    ]
  },
  'recept-bekijken': {
    slug: 'de/handbuch-rezept-oeffnen-und-nutzen',
    menu: 'Ein Rezept öffnen und nutzen',
    title: 'Ein Rezept öffnen: Kochmodus, Umrechnen, Drucken, Teilen | Handbuch Savour',
    desc: 'Was du in einem Rezept in Savour alles tun kannst: Kochmodus, Bearbeiten, Drucken, Teilen, Favorit, Umrechnen, Notizen und das Menü ⋯ mit Ordnern und Verknüpfungen.',
    lead: 'Alles, was du aus einem Rezept heraus tun kannst, auf einen Blick.',
    sections: [
      [
        'Oben',
        'Oben im Rezept stehen die Knöpfe:',
        [
          '[Kochmodus](#kookmodus): nur das Rezept, in großer Schrift.',
          '[Bearbeiten](#recept-maken): das Rezept ändern (nur der Ersteller).',
          '[Drucken](#printen): das Rezept drucken, auch umgerechnet.',
          '[Teilen](#delen-link): einen Link per WhatsApp, Telegram, SMS oder E-Mail senden.',
          '[Favorit](#favorieten): dem Rezept einen Stern geben.'
        ]
      ],
      ['Umrechnen', 'Unter dem Titel steht „Umrechnen“ mit Schnellknöpfen von ¼× bis 10× und „Original“, um zurückzugehen. Siehe [Umrechnen](#omrekenen).'],
      ['Das Menü ⋯', 'Bei einem eigenen Rezept findest du hinter ⋯ „Mehr umrechnen“, „Mit Rezept verknüpfen“, „Zu Ordner hinzufügen“ und „Aus Bibliothek löschen“. Öffnest du das Rezept aus einem Ordner oder Küchenteam, steht dort „Aus Ordner entfernen“ bzw. das Entfernen aus dem Küchenteam.'],
      ['Abhaken', 'Tippe auf eine Zutat oder einen Schritt, um sie abzuhaken. So siehst du nach einer Unterbrechung, wo du warst.'],
      ['Notizen und das Original', 'Unter dem Rezept stehen deine [Notizen](#recept-notities) und bei einem Rezept von einem Foto „Original-Notiz ansehen“.'],
      ['Zurück', 'Mit „← Zurück“ kommst du an dieselbe Stelle in der Liste, von der du kamst.']
    ]
  },
  'recept-verwijderen': {
    slug: 'de/handbuch-rezepte-loeschen',
    menu: 'Rezepte löschen',
    title: 'Rezepte löschen, eines oder mehrere auf einmal | Handbuch Savour',
    desc: 'So löschst du Rezepte in Savour: ein Rezept aus deiner Bibliothek, mehrere auf einmal oder nur aus einem Ordner oder Küchenteam. Savour löscht nie selbst etwas.',
    lead: 'Aufräumen, ohne versehentlich etwas zu verlieren.',
    sections: [
      ['Ein Rezept', 'Öffne das Rezept, wähle ⋯ und „Aus Bibliothek löschen“. Savour fragt zuerst, ob du sicher bist.'],
      ['Mehrere auf einmal', 'Wähle bei Alle Rezepte „Rezepte löschen“, hake die Rezepte an und bestätige. Praktisch nach einem Import mit Rezepten, die du nicht brauchst.'],
      ['Nur aus einem Ordner', 'Willst du ein Rezept nur aus einem Ordner oder Küchenteam nehmen, öffne es aus diesem Ordner und wähle ⋯ „Aus Ordner entfernen“. Das Rezept bleibt in deiner Bibliothek.'],
      ['Doppelte Rezepte', 'Doppelte Rezepte und Nummern vor Rezeptnamen räumst du mit [Aufräumen](#opschonen) auf. Du siehst immer zuerst, was sich ändert.'],
      ['Savour löscht nie selbst', 'Savour löscht nie Rezepte, ohne dass du darum bittest. Auch wenn du [Savour Pro beendest](#pro-stoppen), bleiben alle deine Rezepte erhalten.']
    ]
  }
};
