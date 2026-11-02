// Handbuch (Duits), Abschnitt „Drucken und Herunterladen“.

export const groups = {
  printen: {
    name: 'Drucken und Herunterladen',
    intro: 'Ein einzelnes Rezept, ein ganzer Rezeptordner für den Pass oder alle Rezepte, mit dem Logo deines Restaurants. Und deine Rezepte als Word oder Backup herunterladen.'
  }
};

export const pages = {
  printen: {
    slug: 'de/handbuch-drucken',
    menu: 'Ein Rezept drucken',
    title: 'Ein Rezept drucken, auch umgerechnet | Handbuch Savour',
    desc: 'So druckst du ein Rezept in Savour: das Drucklayout mit fetten Mengen, umgerechnet drucken und auf A4 oder A5. Auch für alle, die ein geteiltes Rezept öffnen.',
    lead: 'Ein einzelnes Rezept für die Wand oder den Ordner am Pass.',
    sections: [
      ['Drucken', 'Öffne das Rezept und wähle „Drucken“. Savour öffnet das Drucklayout: Name, Ausbeute, Zutaten mit fetten Mengen und die Zubereitung in Schritten. Wähle danach deinen Drucker oder speichere es als PDF.'],
      ['Umgerechnet drucken', 'Hast du das Rezept [umgerechnet](#omrekenen), druckst du die umgerechneten Mengen. Praktisch für eine große Produktion oder eine Veranstaltung.'],
      ['Teile im Rezept', 'Besteht das Rezept aus [Teilen](#recept-delen), steht jeder Teil mit seinem Namen über seinen Zutaten und seiner Zubereitung.'],
      ['Mehr Rezepte auf einmal', 'Einen ganzen Ordner, ein Küchenteam oder eine eigene Auswahl druckst du in einem Schritt: siehe [Mehrere Rezepte drucken](#printen-map).'],
      ['Mit deinem Logo', 'Mit Savour Pro steht das Logo deines Restaurants auf deinen Ausdrucken. Siehe [Mit deinem Logo drucken](#printen-logo).']
    ]
  },
  'printen-map': {
    slug: 'de/handbuch-rezeptordner-drucken',
    menu: 'Mehrere Rezepte oder einen Ordner drucken',
    title: 'Einen ganzen Rezeptordner mit Deckblatt und Inhalt drucken | Handbuch Savour',
    desc: 'So druckst du in Savour einen Rezeptordner, ein Küchenteam oder alle Rezepte in einem Schritt: Rezepte wählen, Deckblatt und Inhaltsverzeichnis, A5, Fotos und Notizen.',
    lead: 'Dein kompletter Rezeptordner für die Mappe am Pass, in einem Schritt.',
    sections: [
      ['Was du drucken kannst', 'Drucke einen [Rezeptordner](#mappen), ein [Küchenteam](#keukenteams) oder alle Rezepte auf einmal. Alle Rezepte druckst du unter Mein Konto → Konto mit „Alle Rezepte drucken“.'],
      ['Rezepte wählen', 'Bei „Welche Rezepte möchtest du drucken?“ hakst du an, welche Rezepte mitkommen. Mit „Alle“ oder „Keine“ beginnst du schnell.'],
      [
        'Optionen',
        'Wähle, wie der Ausdruck aussieht:',
        [
          '„Mit Deckblatt und Inhalt“: ein Deckblatt, ein Inhaltsverzeichnis und die Nummer jedes Rezepts unten auf der Seite, damit du schnell blätterst.',
          '„A5, für eine kleine Mappe am Pass“ statt A4.',
          '„Mit Fotos“: das Foto jedes Rezepts.',
          '„Mit Notizen“: deine [Notizen](#recept-notities) zu jedem Rezept.'
        ]
      ],
      ['Tipp für den Pass', 'Drucke auf A5 für eine kleine Ringmappe oder Klarsichthüllen. Wurde ein Rezept geändert, drucke nur dieses Rezept neu.']
    ]
  },
  'printen-logo': {
    slug: 'de/handbuch-mit-logo-drucken',
    menu: 'Mit dem Logo deines Restaurants drucken',
    title: 'Rezepte mit dem Logo deines Restaurants drucken | Handbuch Savour',
    desc: 'So bringst du das Logo deines Restaurants auf deine gedruckten Rezepte in Savour: Logo und Name einrichten, Schwarz-Weiß für den Küchendrucker und Logo pro Küchenteam ein oder aus.',
    lead: 'Dein eigenes Rezeptbuch, mit deinem eigenen Namen und Logo.',
    sections: [
      ['Einrichten', 'Geh zu Mein Konto → Logo auf Ausdrucken. Wähle dein Logo und trag den Namen ein, der auf den Ausdruck kommt. Das geht mit [Savour Pro](#gratis-en-pro), auch in der Probewoche.'],
      ['Schwarz-Weiß', 'Wähle „Logo in Schwarz-Weiß drucken“ für einen Küchendrucker oder wenn dein farbiges Logo auf Papier zu unruhig ist.'],
      ['Eigene Ausdrucke und Küchenteams', 'Du wählst selbst, ob das Logo auf deinen eigenen Ausdrucken steht. Pro Küchenteam schaltest du es auf demselben Tab oder in den Einstellungen des Küchenteams ein oder aus. In einem Küchenteam steht das Logo des Eigentümers auf den Ausdrucken, damit das ganze Team dieselben Ausdrucke hat.'],
      ['Mehr lesen', 'Warum ein eigenes Rezeptbuch mit Logo wirkt: [Rezeptbuch mit eigenem Logo](/blog/receptenboek-met-eigen-logo).']
    ]
  },
  downloaden: {
    slug: 'de/handbuch-rezepte-herunterladen',
    menu: 'Rezepte herunterladen: Word und Backup',
    title: 'Deine Rezepte als Word-Datei oder Backup herunterladen | Handbuch Savour',
    desc: 'So lädst du alle Rezepte aus Savour herunter: jedes Rezept als Word-Datei in einer ZIP, alles in einer Word-Datei oder ein Backup als JSON, das du wieder importieren kannst.',
    lead: 'Deine Rezepte gehören dir. Lade sie herunter, wann du willst.',
    sections: [
      ['Wo', 'Geh zu Mein Konto → Konto, bei „Alle Rezepte drucken oder herunterladen“. Herunterladen geht mit [Savour Pro](#gratis-en-pro).'],
      [
        'Drei Wege',
        'Wähle, was du brauchst:',
        [
          '„Word pro Rezept“: jedes Rezept als eigene Word-Datei im Drucklayout, zusammen in einer .zip.',
          '„Alles in einer Word-Datei“: einfaches Layout mit Titel, Ausbeute, Zutaten und Zubereitung.',
          '„Backup“: Rezepte und Ordner als JSON-Datei.'
        ]
      ],
      ['Ein Backup zurückspielen', 'Ein Backup kannst du bei „Andere Dateien“ wieder in Savour importieren. Siehe [JSON und Backups](#import-json).'],
      ['Ohne Pro', 'Auch ohne Pro bleiben deine Rezepte immer in Savour, und du kannst sie ansehen und [drucken](#printen-map). Pro zu beenden kostet dich nie Rezepte: siehe [Savour Pro beenden](#pro-stoppen).']
    ]
  }
};
