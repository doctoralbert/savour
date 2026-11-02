// Handbuch (Duits), Abschnitt „Erste Schritte“. Links: [Text](#seiten-id) of [Text](/nl-pad); het pad wordt vanzelf Duits.

export const groups = {
  'aan-de-slag': {
    name: 'Erste Schritte',
    intro: 'Ein Konto erstellen, anmelden, Savour als App aufs Handy holen und sich in den Bildschirmen zurechtfinden.'
  }
};

export const pages = {
  'aan-de-slag': {
    slug: 'de/handbuch-erste-schritte',
    menu: 'Erste Schritte mit Savour',
    title: 'Erste Schritte mit Savour, der Rezept-App für Köche | Handbuch',
    desc: 'Mit Savour starten: was die Rezept-App für Profiküchen kann, ein Konto erstellen, die ersten Rezepte importieren und Savour aufs Handy holen.',
    lead: 'Was Savour ist, für wen es gedacht ist, und die ersten Schritte zu deinem eigenen digitalen Rezeptbuch.',
    sections: [
      [
        'Was ist Savour',
        'Savour ist eine Rezept-App für die Profiküche. Du sammelst alle Rezepturen an einem Ort: aus Word, PDF, Fotos handschriftlicher Notizen, Webseiten und anderen Rezept-Apps. Danach ordnest du sie in Ordnern und Kategorien, rechnest sie auf jede Ausbeute um, druckst sie für den Ordner am Pass und teilst sie in einem Küchenteam mit deiner Brigade.'
      ],
      [
        'Für wen',
        'Für Küchenchefs, Sous-Chefs, Patissiers, Caterer und Kochschulen: alle, die Rezepturen aufbewahren, teilen und schnell wiederfinden müssen. Auch Hobbyköche können Savour nutzen, aber die App ist für die Arbeit in der Küche gemacht: große Mengen, feste Rezepturen und ein Team, das mit derselben Version arbeitet. Mehr dazu unter [Für Köche](/voor-koks) und [Für Küchenbrigaden](/voor-keukenbrigades).'
      ],
      [
        'In vier Schritten starten',
        'So hast du in einer Viertelstunde deine ersten Rezepte in Savour:',
        [
          '[Erstelle ein Konto](#account-maken) oder sieh dich zuerst ohne Konto in der [Demo](#demo) um.',
          '[Importiere deine Rezepte](#importeren): Eine Word-Datei oder PDF mit allen Rezepten reicht für den Anfang.',
          '[Prüfe, was gelesen wurde](#import-controleren), und speichere.',
          '[Hol dir Savour als App aufs Handy](#app-installeren), damit deine Rezepte in der Küche immer griffbereit sind.'
        ]
      ],
      [
        'Kostenlos oder Savour Pro',
        'Ein kostenloses Konto speichert bis zu 100 Rezepte und liest Word, PDF und Text ein. Mit [Savour Pro](#gratis-en-pro) speicherst du unbegrenzt Rezepte, liest die KI Fotos handschriftlicher Notizen, erstellst Küchenteams und druckst mit dem Logo deines Restaurants. Neue Konten bekommen 7 Tage Pro kostenlos.'
      ],
      [
        'Auf jedem Gerät',
        'Savour läuft im Browser auf Computer, Tablet und Handy. Importieren, Ordnen und Drucken geht am besten am Computer, Nachschlagen in der Küche am Handy oder Tablet. Deine Rezepte liegen in der Cloud: Auf einem neuen Gerät meldest du dich an und alles ist wieder da.'
      ]
    ]
  },
  'account-maken': {
    slug: 'de/handbuch-konto-erstellen',
    menu: 'Ein Konto erstellen',
    title: 'Ein Savour-Konto erstellen und die E-Mail-Adresse bestätigen | Handbuch',
    desc: 'So erstellst du ein kostenloses Savour-Konto: Name, E-Mail-Adresse und Passwort, die Bestätigungs-E-Mail, die Probewoche mit Savour Pro und was du danach zuerst tust.',
    lead: 'Kostenlos, ohne Zahlungsdaten und in einer Minute erledigt.',
    sections: [
      [
        'Konto erstellen',
        'Wähle auf [savour.page](/) „Kostenlos starten“. Gib Vorname, Nachname, E-Mail-Adresse und ein Passwort ein und wähle „Konto erstellen“. Zahlungsdaten brauchst du nicht.'
      ],
      [
        'E-Mail-Adresse bestätigen',
        'Du bekommst eine E-Mail mit einem Link zur Bestätigung. Klicke auf den Link und dann in Savour auf „Weiter“. Keine E-Mail bekommen? Schau im Spam nach. Versuchst du dich ohne Bestätigung anzumelden, bietet Savour an, eine neue Bestätigungs-E-Mail zu senden. Ein Link aus einer E-Mail funktioniert einmal und eine Stunde lang; forderst du mehrere an, gilt nur der neueste.'
      ],
      [
        'Sieben Tage Savour Pro',
        'Jedes neue Konto bekommt 7 Tage [Savour Pro](#gratis-en-pro) kostenlos. Du kannst Fotos von Notizen lesen lassen, [ein Küchenteam erstellen](#keukenteam-maken) und [mit deinem Logo drucken](#printen-logo). Auch in der Probewoche speicherst du bis zu 100 Rezepte. Danach behältst du alles, was du angelegt hast.'
      ],
      [
        'Von einem Kollegen eingeladen',
        'Hast du einen Link von einem Kollegen bekommen, öffnet Savour direkt „Konto erstellen“. Du bekommst dieselbe Probewoche, und dein Kollege erhält 14 Tage Pro geschenkt, sobald du deine E-Mail-Adresse bestätigt und dich angemeldet hast. Bei einer Einladung in ein Küchenteam wirst du nach dem Anmelden Mitglied. Siehe [Kollegen einladen](#collega-uitnodigen) und [Dein Team einladen](#keukenteam-uitnodigen).'
      ],
      [
        'E-Mail-Adresse hat bereits ein Konto',
        'Meldet Savour, dass die E-Mail-Adresse schon ein Konto hat, wird keine neue Bestätigungs-E-Mail gesendet. [Melde dich dann an](#inloggen) oder wähle „Passwort vergessen?“, wenn du das Passwort nicht mehr weißt.'
      ],
      [
        'Danach',
        'Nach der Bestätigung siehst du den Willkommensbildschirm mit einer kurzen Startliste. Beginne mit dem [Import](#importeren) oder [gib ein Rezept selbst ein](#recept-maken). Einen Plan für die ersten Tage findest du unter [Deine erste Woche mit Savour](#eerste-week).'
      ]
    ]
  },
  inloggen: {
    slug: 'de/handbuch-anmelden-und-passwort',
    menu: 'Anmelden und Passwort',
    title: 'Anmelden, angemeldet bleiben und Passwort vergessen | Handbuch Savour',
    desc: 'Bei Savour anmelden: angemeldet bleiben, Passwort merken auf einem geteilten Küchencomputer, Passwort vergessen und ein neues Passwort wählen.',
    lead: 'Anmelden auf dem eigenen Handy, auf einem geteilten Tablet am Pass oder auf einem neuen Computer.',
    sections: [
      [
        'Anmelden',
        'Wähle oben rechts auf [savour.page](/) „Anmelden“ und gib E-Mail-Adresse und Passwort ein. Deine Rezepte, Ordner und Küchenteams sind sofort da, auf jedem Gerät, auf dem du dich anmeldest.'
      ],
      [
        'Angemeldet bleiben',
        'Mit „Angemeldet bleiben“ bleibst du angemeldet, auch wenn du Browser oder App schließt. Das brauchst du auch, um deine Rezepte [ohne Internet](#offline) zu öffnen. Auf einem geteilten Küchencomputer oder Tablet lässt du es aus: Dann bist du abgemeldet, sobald das Fenster zugeht.'
      ],
      [
        'Passwort merken',
        'Mit „Passwort merken“ darf der Passwortmanager deines Browsers dein Passwort speichern. Auf einem geteilten Gerät schaltest du das aus.'
      ],
      [
        'Passwort vergessen',
        'Wähle im Anmeldefenster „Passwort vergessen?“. Du bekommst eine E-Mail mit einem Link. Klicke darauf, wähle in Savour „Weiter“ und lege unter [Mein Konto](#account-profiel) ein neues Passwort fest. Der Link funktioniert einmal und eine Stunde lang.'
      ],
      [
        'Abmelden',
        'Abmelden geht unter Mein Konto → Konto. Auf dem eigenen Handy ist das nicht nötig, auf einem geteilten Tablet schon, oder du lässt „Angemeldet bleiben“ aus.'
      ],
      [
        'Klappt es nicht?',
        'Unter [Probleme beim Anmelden](#probleem-inloggen) stehen die häufigsten Meldungen und was du tun kannst.'
      ]
    ]
  },
  demo: {
    slug: 'de/handbuch-demo',
    menu: 'Die Demo ansehen',
    title: 'Die Savour-Demo: mit 40 Beispielrezepten umsehen | Handbuch',
    desc: 'Savour ohne Konto ausprobieren: die Demo mit 40 Beispielrezepten, Ordnern und einem Küchenteam. So funktioniert die Demo und was sie kann und nicht kann.',
    lead: 'Savour mit Beispielrezepten ausprobieren, ohne Konto und ohne etwas zu speichern.',
    sections: [
      [
        'Die Demo öffnen',
        'Wähle auf der [Startseite](/) „Demo ansehen“. Du siehst Savour so, wie ein angemeldeter Koch es sieht, mit 40 Beispielrezepten, Ordnern pro Posten und einem Küchenteam.'
      ],
      [
        'Was du ausprobieren kannst',
        'Öffne Rezepte, [rechne sie um](#omrekenen), starte den [Kochmodus](#kookmodus), suche nach einer Zutat und blättere durch die Ordner. Auch den Import kannst du ausprobieren: Du siehst, was der Savour-Leser aus deiner Datei macht.'
      ],
      [
        'Was die Demo nicht tut',
        'In der Demo wird nichts gespeichert. Oben steht „Demokonto · nichts wird gespeichert“. Willst du deine eigenen Rezepte behalten, [erstelle ein Konto](#account-maken).'
      ],
      [
        'Die Demo verlassen',
        'Wenn du dich aus der Demo abmeldest, kommst du zurück zur Startseite. Von der Demo bleibt nichts in deinem Browser.'
      ]
    ]
  },
  'app-installeren': {
    slug: 'de/handbuch-app-installieren',
    menu: 'Savour als App installieren',
    title: 'Savour als App auf iPhone, Android und Computer | Handbuch',
    desc: 'So legst du Savour als App auf den Startbildschirm: iPhone und iPad über Safari, Android über Chrome, Computer über Chrome, Edge oder Safari. Ohne App Store.',
    lead: 'Einmal auf den Startbildschirm legen, und Savour öffnet sich wie eine normale App, auch ohne Internet.',
    sections: [
      [
        'Ohne App Store',
        'Savour ist eine Web-App: Du legst sie von der Website auf deinen Startbildschirm. Danach öffnet sie sich in einem eigenen Fenster mit eigenem Symbol, und du hast immer automatisch die neueste Version. Mehr auf der Seite [App](/app-downloaden).'
      ],
      ['iPhone und iPad', 'Öffne savour.page in Safari. Tippe unten auf Teilen (das Quadrat mit dem Pfeil nach oben), wähle „Zum Home-Bildschirm“ und tippe auf „Hinzufügen“.'],
      [
        'Android',
        'Öffne savour.page in Chrome. Tippe oben rechts auf ⋮ und wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“. Wenn du angemeldet bist, geht es auch über Allgemein → App installieren im Menü von Savour.'
      ],
      [
        'Computer',
        'In Chrome oder Edge klickst du rechts in der Adressleiste auf das Installationssymbol, oder du wählst in Savour unter Allgemein „App installieren“. Auf einem Mac mit Safari wählst du Ablage → „Zum Dock hinzufügen“.'
      ],
      [
        'Auch ohne Internet',
        'Melde dich einmal mit „Angemeldet bleiben“ an und öffne deine Rezepte. Danach öffnet Savour deine Bibliothek auch, wenn das WLAN in der Küche ausfällt. Siehe [Ohne Internet arbeiten](#offline).'
      ],
      [
        'Geteiltes Tablet am Pass',
        'Leg Savour auf ein Tablet, das das ganze Team nutzt. Nutzen es mehrere Personen mit eigenem Konto, lass „Angemeldet bleiben“ aus. Arbeiten alle aus demselben [Küchenteam](#keukenteams), sehen alle dieselben Rezepte.'
      ]
    ]
  },
  menu: {
    slug: 'de/handbuch-menue-und-bildschirme',
    menu: 'Das Menü und die Bildschirme',
    title: 'Das Savour-Menü: Rezepte, Ordner, Küchenteams, Allgemein | Handbuch',
    desc: 'Zurechtfinden in Savour: das Menü mit Alle Rezepte, Favoriten, Kategorien, Rezept hinzufügen, Rezeptordnern, Küchenteams und Allgemein, und die Knöpfe oben.',
    lead: 'Was im Menü steht und wo du was findest, am Computer und am Handy.',
    sections: [
      [
        'Rezepte',
        'Oben im Menü stehen deine eigenen Rezepte:',
        [
          '[Alle Rezepte](#zoeken): deine ganze Bibliothek, nummeriert und alphabetisch.',
          '[Favoriten](#favorieten): die Rezepte mit einem Stern.',
          '[Kategorien](#categorieen): Rezepte nach Art, etwa Saucen oder Patisserie.',
          '[Rezept hinzufügen](#importeren): importieren oder selbst eingeben.'
        ]
      ],
      [
        'Rezeptordner',
        'Darunter stehen deine eigenen [Ordner](#mappen), etwa pro Posten oder pro Menü, mit „Rezeptordner hinzufügen“, um einen anzulegen. Du wählst selbst, welche Ordner im Menü stehen und in welcher Reihenfolge.'
      ],
      ['Küchenteams', 'Hier stehen die [Küchenteams](#keukenteams), in denen du Mitglied bist, mit „Küchenteam erstellen“, um selbst eins zu starten (Savour Pro).'],
      [
        'Allgemein',
        'Unten stehen [Savour Pro](#gratis-en-pro), [Kollegen einladen](#collega-uitnodigen), [App installieren](#app-installeren) und Einstellungen, wo du [dein Konto](#account-profiel), [Savour Pro](#abonnement-beheren), [Logo auf Ausdrucken](#printen-logo), [Darstellung](#weergave-en-taal), [Kategorien](#categorieen) und [Aufräumen](#opschonen) findest.'
      ],
      ['Oben', 'In der Leiste oben suchst du in deinen Rezepten, wechselst mit einem Knopf zwischen [dunklem und hellem Design](#weergave-en-taal) und wählst die Sprache: Niederländisch, Englisch, Deutsch, Spanisch oder Französisch.'],
      ['Erklärung pro Bildschirm', 'Neben dem Titel vieler Bildschirme steht ein i-Knopf. Dahinter findest du eine kurze Erklärung, was du auf diesem Bildschirm tun kannst.'],
      [
        'Am Handy',
        'Am Handy steht unten eine Leiste mit Rezepte, Rezeptordner, Küchenteams und Rezept hinzufügen. Oben suchst du, öffnest deine Favoriten und gehst zu Mein Konto. Rezepte öffnen sich groß und gut lesbar; im [Kochmodus](#kookmodus) siehst du nur das Rezept.'
      ]
    ]
  },
  'eerste-week': {
    slug: 'de/handbuch-erste-woche',
    menu: 'Deine erste Woche mit Savour',
    title: 'Deine erste Woche mit Savour: ein Plan für deine Küche | Handbuch',
    desc: 'Ein Plan für die erste Woche: Rezepte importieren, aufräumen, in Kategorien und Ordnern ordnen, dein Team einladen und Savour in der Küche nutzen.',
    lead: 'Ein praktischer Plan, um in einer Woche von losen Dateien zu einem Rezeptbuch zu kommen.',
    sections: [
      ['Tag 1: alles hinein', 'Sammle deine Word-Dateien, PDFs und alten Exporte und [importiere sie in einem Schritt](#import-hele-map). Hast du handschriftliche Notizen, mach in der Probewoche mit Savour Pro [Fotos](#import-fotos) davon.'],
      ['Tag 2: prüfen', 'Geh die Rezepte durch, die Savour zum Prüfen markiert hat. Leg Zweifelsfälle neben das Original und prüfe vor allem die Zahlen. Siehe [Import prüfen](#import-controleren).'],
      ['Tag 3: aufräumen', 'Entferne Nummern vor Rezeptnamen und doppelte Rezepte mit [Aufräumen](#opschonen). Leg danach die [Standardliste der Kategorien](#categorieen) an und lass Savour [Kategorien vorschlagen](#categorie-trefwoorden).'],
      ['Tag 4: ordnen', 'Lege [Ordner](#mappen) an, wie deine Küche arbeitet: pro Posten, pro Menü oder pro Saison. Gib deinen meistgenutzten Rezepten einen [Stern](#favorieten).'],
      ['Tag 5: das Team dazu', '[Erstelle ein Küchenteam](#keukenteam-maken), füge die Grundrezepte hinzu und [lade dein Team ein](#keukenteam-uitnodigen). Gib deinem Sous-Chef die Rolle Editor.'],
      ['Tag 6 und 7: in der Küche', 'Hol Savour [als App](#app-installeren) auf die Handys und das Tablet am Pass, nutze den [Kochmodus](#kookmodus) bei der Mise en place und [drucke](#printen-map) den Ordner für den Pass.']
    ]
  }
};
