// Handbuch (Duits), Abschnitt „Ordnen und finden“.

export const groups = {
  ordenen: {
    name: 'Ordnen und finden',
    intro: 'Deine Rezepte zwischen Hunderten anderen wiederfinden: Suche, Kategorien mit Stichwörtern, Ordner, Favoriten und Aufräumen.'
  }
};

export const pages = {
  ordenen: {
    slug: 'de/handbuch-ordnen-und-suchen',
    menu: 'Übersicht: ordnen und suchen',
    h1: 'Ordnen und suchen',
    title: 'Rezepte ordnen und suchen: Ordner, Kategorien, Favoriten | Handbuch Savour',
    desc: 'So ordnest du deine Rezepte in Savour: eine Rezeptbibliothek von A bis Z, Suche nach Zutat und Technik, Kategorien mit Stichwörtern, Ordner, Favoriten und Aufräumen.',
    lead: 'Deine Beurre blanc in drei Sekunden finden, auch zwischen Hunderten Rezepten.',
    sections: [
      ['Alle Rezepte', 'Unter „Alle Rezepte“ stehen alle deine eigenen Rezepte, nummeriert und alphabetisch. Mit den Buchstaben A–Z springst du zu einem Anfangsbuchstaben, mit den Kategorien oben siehst du nur eine Art Rezept.'],
      [
        'Vier Arten zu ordnen',
        'Savour hat vier Arten, die du nebeneinander nutzt:',
        [
          '[Suche](#zoeken): nach Name, Zutat, Komponente oder Technik.',
          '[Kategorien](#categorieen): was ein Rezept ist, etwa Saucen oder Patisserie. Jedes Rezept hat eine.',
          '[Ordner](#mappen): wie du arbeitest, etwa pro Posten, Menü oder Saison. Ein Rezept kann in mehreren Ordnern stehen.',
          '[Favoriten](#favorieten): die Rezepte, die du am häufigsten nutzt.'
        ]
      ],
      ['Aufräumen', 'Nach einem großen Import entfernst du mit [Aufräumen](#opschonen) Nummern vor Rezeptnamen und doppelte Rezepte.'],
      ['Mit deinem Team', 'Deine eigenen Ordner siehst nur du. Willst du Rezepte mit deiner Brigade teilen, nutze ein [Küchenteam](#keukenteams) mit eigenen Ordnern.'],
      ['Beispiele', 'Ideen für eine Einteilung findest du in [Rezeptordner ordnen: Beispiele](/blog/receptenmappen-indelen-voorbeelden) und im Tipp [Kategorien und Ordner](#tips-ordenen).']
    ]
  },
  zoeken: {
    slug: 'de/handbuch-rezepte-suchen',
    menu: 'Suche und Alle Rezepte',
    title: 'Rezepte nach Name, Zutat oder Technik suchen | Handbuch Savour',
    desc: 'So suchst du in Savour: nach Rezeptname, Zutat, Komponente oder Technik, mit den Buchstaben A–Z und Filtern nach Kategorie. Auch am Handy.',
    lead: 'Finde das Rezept, oder das Rezept, in dem diese eine Sauce steckt.',
    sections: [
      ['Suchen', 'Tippe in die Suchleiste oben einen Rezeptnamen, eine Zutat, eine Komponente oder eine Technik. Du siehst sofort die passenden Rezepte. So findest du auch alle Rezepte, in denen du Beurre noisette verwendest.'],
      ['Am Handy', 'Am Handy tippst du oben auf die Lupe, um zu suchen.'],
      ['Alle Rezepte', 'Unter „Alle Rezepte“ stehen deine Rezepte nummeriert und alphabetisch. Mit den Buchstaben A–Z springst du zu einem Anfangsbuchstaben.'],
      ['Nach Kategorie filtern', 'Oben bei Alle Rezepte stehen deine [Kategorien](#categorieen). Tippe eine an, und du siehst nur diese Art Rezepte.'],
      ['Zurück an deine Stelle', 'Öffnest du ein Rezept und gehst zurück, landest du wieder an derselben Stelle in der Liste.'],
      ['Rezepte in einem Küchenteam', 'In einem [Küchenteam](#keukenteams) hat das Team eine eigene Bibliothek mit den Rezepten des Teams, und du suchst in diesen Rezepten.']
    ]
  },
  categorieen: {
    slug: 'de/handbuch-kategorien',
    menu: 'Kategorien',
    title: 'Kategorien für deine Rezepte: Saucen, Garnituren, Patisserie | Handbuch',
    desc: 'So arbeitest du mit Kategorien in Savour: was eine Kategorie ist, Kategorien hinzufügen, umbenennen und löschen, und die Standardliste für die Profiküche.',
    lead: 'Eine Kategorie sagt, was ein Rezept ist: eine Sauce, eine Garnitur, ein Dessert.',
    sections: [
      ['Was eine Kategorie ist', 'Jedes Rezept hat eine Kategorie, etwa Saucen, Eis oder Garnituren. Oben bei Alle Rezepte filterst du direkt danach, und im Menü steht „Kategorien“ mit allen Rezepten nach Art.'],
      ['Selbst verwalten', 'Geh zu Mein Konto → Kategorien oder wähle Kategorien im Menü. Mit „＋ Kategorie hinzufügen“ legst du eine neue an; du kannst eine Kategorie umbenennen oder löschen. Die Liste ist persönlich und wird auch beim Eingeben und Importieren von Rezepten genutzt.'],
      ['Standardliste', 'Mit „Standardliste“ legst du in einem Schritt eine Liste an, die zur Profiküche passt. Deine eigenen Kategorien bleiben stehen.'],
      ['Automatisch vorschlagen', 'Mit Stichwörtern schlägt Savour selbst eine Kategorie anhand des Rezeptnamens vor, etwa Sorbet → Eis. Siehe [Stichwörter und Kategorien vorschlagen](#categorie-trefwoorden).'],
      ['Kategorie oder Ordner', 'Nutze Kategorien für das, was ein Rezept ist, und [Ordner](#mappen) dafür, wie du arbeitest. Mehr in [Kategorien und Ordner](#tips-ordenen).']
    ]
  },
  'categorie-trefwoorden': {
    slug: 'de/handbuch-stichwoerter-und-kategorien-vorschlagen',
    menu: 'Stichwörter und Kategorien vorschlagen',
    title: 'Stichwörter: Savour schlägt die Kategorie deiner Rezepte vor | Handbuch',
    desc: 'So nutzt du Stichwörter in Savour: pro Kategorie Wörter angeben, etwa Sorbet für Eis, und in einem Schritt eine Kategorie für alle Rezepte vorschlagen lassen.',
    lead: 'Lass Savour sortieren, und bestätige selbst, was sich ändert.',
    sections: [
      ['Stichwörter angeben', 'Geh zu Kategorien und wähle bei einer Kategorie „Stichwörter“. Gib Wörter an, die im Rezeptnamen vorkommen, etwa Sorbet, Granité und Parfait für Eis.'],
      ['Bei neuen Rezepten', 'Steht so ein Wort im Namen eines neuen oder importierten Rezepts, wählt Savour diese Kategorie. Passt der Name zu mehreren Kategorien, fragt Savour, welche du meinst. Bei Gleichstand gewinnt das längste, genaueste Wort, etwa „Ochsenfilet“ vor „Filet“.'],
      ['Kategorien vorschlagen', 'Mit „Kategorien vorschlagen“ sucht Savour für alle deine Rezepte in einem Schritt eine passende Kategorie anhand der Stichwörter. Du siehst zuerst, was sich ändert, und bestätigst es selbst.'],
      ['Tipp', 'Beginne mit der [Standardliste](#categorieen), ergänze die Stichwörter mit den Wörtern, die deine Küche nutzt, und lass danach vorschlagen. Rezepte, die nirgends passen, behalten ihre Kategorie.']
    ]
  },
  mappen: {
    slug: 'de/handbuch-rezeptordner',
    menu: 'Rezeptordner',
    title: 'Rezeptordner: nach Posten, Menü oder Saison ordnen | Handbuch Savour',
    desc: 'So arbeitest du mit Rezeptordnern in Savour: Ordner anlegen, Rezepte hinzufügen, ein Rezept in mehreren Ordnern, Ordner im Menü und in Reihenfolge, und einen Ordner drucken.',
    lead: 'Ordne deine Rezepte so, wie deine Küche arbeitet: pro Posten, pro Menü oder pro Saison.',
    sections: [
      ['Einen Ordner anlegen', 'Wähle im Menü unter Rezeptordner „Rezeptordner hinzufügen“ und gib dem Ordner einen Namen, etwa „Garde manger“, „Mittagskarte“ oder „Weihnachten“.'],
      ['Rezepte in einem Ordner', 'Öffne einen Ordner und wähle, welche Rezepte hineingehören. Oder lege ein Rezept aus dem Rezept selbst in einen Ordner: wähle ⋯ und „Zu Ordner hinzufügen“. Ein Rezept kann in mehreren Ordnern stehen.'],
      ['Aus einem Ordner nehmen', 'Öffne das Rezept aus dem Ordner und wähle ⋯ „Aus Ordner entfernen“. Das Rezept bleibt in deiner Bibliothek.'],
      ['Menü und Reihenfolge', 'Wähle, welche Ordner im Menü erscheinen, und zieh sie in die Reihenfolge, die für dich passt.'],
      ['Einen Ordner drucken', 'Drucke einen ganzen Ordner in einem Schritt, mit Deckblatt, Inhaltsverzeichnis und der Nummer jedes Rezepts unten auf der Seite. Siehe [Mehrere Rezepte drucken](#printen-map).'],
      ['Nur für dich', 'Deine eigenen Ordner siehst nur du. Ordner, die du mit deinem Team teilst, legst du in einem [Küchenteam](#keukenteam-mappen) an.']
    ]
  },
  favorieten: {
    slug: 'de/handbuch-favoriten',
    menu: 'Favoriten',
    title: 'Lieblingsrezepte mit einem Stern | Handbuch Savour',
    desc: 'So nutzt du Favoriten in Savour: einem Rezept einen Stern geben und deine Favoriten schnell im Menü oder oben am Handy öffnen.',
    lead: 'Die Rezepte, die du in jedem Service brauchst, immer einen Tipp entfernt.',
    sections: [
      ['Einen Favoriten anlegen', 'Öffne ein Rezept und wähle „Favorit“ oder tippe auf den Stern. Ein weiteres Tippen nimmt den Stern wieder weg.'],
      ['Deine Favoriten öffnen', 'Deine Favoriten stehen unter Favoriten im Menü. Am Handy öffnest du sie mit dem Stern oben.'],
      ['Favorit oder Ordner', 'Favoriten sind praktisch für die Rezepte, die du gerade viel nutzt. Für eine feste Einteilung, etwa pro Posten, nutzt du [Ordner](#mappen).']
    ]
  },
  opschonen: {
    slug: 'de/handbuch-aufraeumen',
    menu: 'Aufräumen: Nummern und doppelte Rezepte',
    title: 'Aufräumen: Nummern vor Rezeptnamen und doppelte Rezepte | Handbuch Savour',
    desc: 'So räumst du deine Rezeptbibliothek in Savour auf: Nummern vor Rezeptnamen entfernen und doppelte Rezepte zusammenführen, mit Ordnern, Favoriten und Küchenteams.',
    lead: 'Nach einem großen Import alles ordentlich, ohne etwas zu verlieren.',
    sections: [
      ['Wo', 'Geh zu Mein Konto → Aufräumen. Savour schaut, ob Nummern vor Rezeptnamen stehen, etwa „12. Kalbsjus“, und ob Rezepte doppelt in deiner Bibliothek stehen. Du siehst immer zuerst, was sich ändert.'],
      ['Nummern entfernen', 'Kamen deine Rezepte aus einem nummerierten Rezeptbuch, entfernst du die Nummern in einem Schritt mit „Nummern entfernen“. Savour zeigt zuerst Beispiele.'],
      ['Doppelte Rezepte', 'Savour sucht Kopien, die genau gleich sind: gleicher Name, gleiche Ausbeute, Zutaten und Zubereitung. Von jedem Rezept bleibt eines stehen. Ordner, Favoriten und Küchenteams gehen auf das Rezept über, das bleibt.'],
      ['Fast gleich', 'Rezepte, die sich leicht unterscheiden, etwa durch eine andere Menge, sieht Savour nicht als doppelt. Die vergleichst du selbst und löschst sie mit [Rezepte löschen](#recept-verwijderen).']
    ]
  }
};
