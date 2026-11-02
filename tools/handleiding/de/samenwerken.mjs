// Handbuch (Duits), Abschnitt „Teilen und Küchenteams“.

export const groups = {
  samenwerken: {
    name: 'Teilen und Küchenteams',
    intro: 'Ein Rezept schnell weiterschicken oder ein Rezeptbuch für deine ganze Brigade mit Rollen, Ordnern und Einladungen.'
  }
};

export const pages = {
  keukenteams: {
    slug: 'de/handbuch-teilen-und-kuechenteams',
    menu: 'Übersicht: teilen und Küchenteams',
    h1: 'Teilen und Küchenteams',
    title: 'Rezepte teilen und Küchenteams mit Rollen | Handbuch Savour',
    desc: 'So teilst du Rezepte in Savour: ein Link per WhatsApp, Telegram, SMS oder E-Mail, und Küchenteams mit den Rollen Eigentümer, Editor und Viewer für deine ganze Brigade.',
    lead: 'Ein Rezept schnell weiterschicken oder ein Rezeptbuch für deine ganze Brigade.',
    sections: [
      ['Ein Rezept teilen', 'Schick ein Rezept als Link, auch an jemanden ohne Konto, und bestimme, wie lange der Link funktioniert. Siehe [Ein Rezept per Link teilen](#delen-link).'],
      ['Ein Küchenteam', 'Ein Küchenteam ist das Rezeptbuch deiner Küche. Alle Mitglieder sehen dieselben Rezepte auf dem eigenen Handy, Tablet oder Computer. Ändert der Ersteller ein Rezept, sehen alle sofort die neue Version.'],
      [
        'Alles über Küchenteams',
        'Schritt für Schritt:',
        [
          '[Ein Küchenteam erstellen](#keukenteam-maken)',
          '[Rollen: Eigentümer, Editor und Viewer](#keukenteam-rollen)',
          '[Dein Team einladen](#keukenteam-uitnodigen)',
          '[Rezepte und Ordner im Team](#keukenteam-mappen)',
          '[Ein Rezept eines Kollegen übernehmen](#recept-overnemen)',
          '[Verlassen, löschen und Savour Pro](#keukenteam-verlaten)'
        ]
      ],
      ['Was es kostet', 'Ein Küchenteam erstellen geht mit [Savour Pro](#gratis-en-pro). Mitglied eines Küchenteams zu sein ist kostenlos. Für eine ganze Küche mit Pro für alle gibt es ein [Organisations-Abo](#organisatie).'],
      ['Mehr lesen', 'Was ein gemeinsames Rezeptbuch mit deinem Team macht: [Gemeinsames Rezeptbuch für dein Küchenteam](/blog/gedeeld-receptenboek-keukenteam) und [Küchenteams erklärt](/blog/gedeelde-mappen-uitgelegd).']
    ]
  },
  'delen-link': {
    slug: 'de/handbuch-rezept-per-link-teilen',
    menu: 'Ein Rezept per Link teilen',
    title: 'Ein Rezept per WhatsApp, Telegram, SMS oder E-Mail teilen | Handbuch Savour',
    desc: 'So teilst du ein Rezept aus Savour per Link: über WhatsApp, Telegram, SMS oder E-Mail, mit Zeitlimit, Link ausschalten und Empfänger das Rezept übernehmen lassen.',
    lead: 'Ein Rezept an einen Kollegen, Lieferanten oder Praktikanten, auch ohne Konto.',
    sections: [
      ['Teilen', 'Öffne das Rezept und wähle „Teilen“. Schick es direkt per WhatsApp, Telegram, SMS oder E-Mail oder kopiere den Link. In WhatsApp erscheint das Rezept mit einem eigenen Vorschaubild.'],
      ['Was der Empfänger sieht', 'Wer den Link öffnet, sieht das Rezept, auch ohne Konto. Er kann es [umrechnen](#omrekenen) und den [Kochmodus](#kookmodus) nutzen, aber nicht bearbeiten.'],
      ['Wie lange der Link funktioniert', 'Bei „Wie lange?“ wählst du 1 Stunde, 1 Tag, 1 Woche oder unbegrenzt. Danach funktioniert der Link nicht mehr.'],
      ['Link ausschalten', 'Mit „Link ausschalten“ kann niemand das Rezept mehr über diesen Link öffnen, auch wenn die Zeit noch nicht um ist.'],
      ['Übernehmen lassen', 'Schaltest du „Empfänger dürfen dieses Rezept übernehmen“ ein, können Empfänger mit Konto das Rezept als eigene Kopie zu ihren Rezepten hinzufügen. Dein Rezept ändert sich nicht.'],
      ['Mit deinem ganzen Team', 'Teilst du oft Rezepte mit denselben Leuten, nutze ein [Küchenteam](#keukenteams): Dann muss niemand mehr Links aufheben.']
    ]
  },
  'keukenteam-maken': {
    slug: 'de/handbuch-kuechenteam-erstellen',
    menu: 'Ein Küchenteam erstellen',
    title: 'Ein Küchenteam in Savour erstellen | Handbuch',
    desc: 'So erstellst du ein Küchenteam in Savour: Name und Bild, Rezepte hinzufügen, Ordner anlegen und dein Team einladen. Mit Savour Pro, auch in der Probewoche.',
    lead: 'In fünf Minuten ein Rezeptbuch für deine ganze Küche.',
    sections: [
      ['Erstellen', 'Wähle im Menü unter Küchenteams „Küchenteam erstellen“ und gib ihm einen Namen, etwa den Namen deines Restaurants oder deiner Küche. Das geht mit [Savour Pro](#gratis-en-pro), auch in der kostenlosen Probewoche.'],
      ['Einstellungen', 'In den Einstellungen des Teams änderst du unter Allgemein Name und Bild. Unter Teilen findest du den Einladungslink, und unter „Mitglieder & Rechte“ verwaltest du, wer dabei ist.'],
      ['Rezepte hinzufügen', 'Wähle „Rezept hinzufügen“ und hake Rezepte aus deiner eigenen Bibliothek an. Das Rezept bleibt deins: Es steht im Team und in deinen eigenen Rezepten. Siehe [Rezepte und Ordner im Team](#keukenteam-mappen).'],
      ['Leute einladen', 'Schick deinem Team eine Einladung per WhatsApp, Telegram, E-Mail oder Link. Siehe [Dein Team einladen](#keukenteam-uitnodigen).'],
      ['Womit du anfängst', 'Beginne mit den Grundrezepten, die alle täglich nutzen, etwa Fonds, Saucen und feste Garnituren. Erweitere danach pro Posten oder pro Menü.']
    ]
  },
  'keukenteam-rollen': {
    slug: 'de/handbuch-rollen-im-kuechenteam',
    menu: 'Rollen: Eigentümer, Editor und Viewer',
    title: 'Rollen in einem Küchenteam: Eigentümer, Editor und Viewer | Handbuch Savour',
    desc: 'Wer was darf in einem Küchenteam von Savour: Der Eigentümer verwaltet, der Editor fügt Rezepte und Ordner hinzu, der Viewer sieht, druckt und rechnet um.',
    lead: 'Du verwaltest, dein Sous-Chef ändert, der Rest schaut mit.',
    sections: [
      [
        'Die drei Rollen',
        'Jedes Mitglied hat eine Rolle:',
        [
          'Eigentümer: verwaltet das Küchenteam, die Mitglieder und ihre Rolle. Nur der Eigentümer entfernt Leute aus dem Team.',
          'Editor: fügt Rezepte und Ordner hinzu, nimmt sie heraus und verwaltet die Ordner.',
          'Viewer: sieht, druckt und rechnet um.'
        ]
      ],
      ['Eine Rolle ändern', 'Neue Mitglieder kommen als Viewer dazu. Der Eigentümer ändert ihre Rolle unter „Mitglieder & Rechte“ in den Einstellungen des Teams.'],
      ['Ein Rezept bearbeiten', 'Ein Rezept bearbeiten kann immer nur sein Ersteller, auch im Team. So ändert niemand versehentlich die Rezeptur eines anderen. Andere können eine [eigene Kopie übernehmen](#recept-overnemen).'],
      ['Welche Rolle für wen', 'Eine häufige Einteilung: Der Küchenchef ist Eigentümer, Sous-Chefs und Chefs de Partie sind Editor, Commis und Praktikanten sind Viewer.']
    ]
  },
  'keukenteam-uitnodigen': {
    slug: 'de/handbuch-team-einladen',
    menu: 'Dein Team einladen',
    title: 'Dein Küchenteam per WhatsApp, E-Mail oder Link einladen | Handbuch Savour',
    desc: 'So lädst du Köche in dein Küchenteam in Savour ein: per WhatsApp, Telegram, E-Mail oder Einladungslink. Mitglied sein ist kostenlos, auch ohne Savour Pro.',
    lead: 'Deine ganze Brigade dabei, mit einer Nachricht in der Gruppe.',
    sections: [
      ['Einladen', 'Öffne die Einstellungen des Küchenteams und wähle unter Teilen „Teilen / einladen“. Schick die Einladung per WhatsApp, Telegram oder E-Mail, oder wähle „Link kopieren“ und stell den Link in eure Gruppe.'],
      ['Was der Kollege tut', 'Dein Kollege öffnet den Link und meldet sich an oder [erstellt ein kostenloses Konto](#account-maken). Danach ist er Mitglied des Teams als Viewer.'],
      ['Kostenlos für Mitglieder', 'Mitglied eines Küchenteams zu sein ist kostenlos, auch ohne Savour Pro. Nur der Eigentümer braucht Pro.'],
      ['Rolle anpassen', 'Gib deinem Sous-Chef danach die Rolle Editor. Siehe [Rollen](#keukenteam-rollen).'],
      ['Jemanden entfernen', 'Geht jemand, entfernt ihn der Eigentümer unter „Mitglieder & Rechte“ aus dem Team. Seine eigenen Rezepte behält er; die Rezepte des Teams sieht er nicht mehr.']
    ]
  },
  'keukenteam-mappen': {
    slug: 'de/handbuch-rezepte-und-ordner-im-team',
    menu: 'Rezepte und Ordner im Team',
    title: 'Rezepte und Ordner in einem Küchenteam verwalten und archivieren | Handbuch',
    desc: 'So ordnest du ein Küchenteam in Savour: Rezepte hinzufügen, Ordner pro Posten oder Menü, Ordner verwalten, sortieren und archivieren, und das Team drucken.',
    lead: 'Das Rezeptbuch deiner Küche, so eingeteilt, wie deine Brigade arbeitet.',
    sections: [
      ['Rezepte hinzufügen', 'Wähle im Küchenteam „Rezept hinzufügen“ und hake Rezepte aus deiner eigenen Bibliothek an. Das Rezept bleibt deins und steht im Team und in deinen eigenen Rezepten. Änderst du es, sieht das Team sofort die neue Version.'],
      ['Ordner', 'Teile das Team in Ordner ein, etwa pro Posten (Garde manger, Saucier, Patisserie) oder pro Menü. Ein Eigentümer oder Editor legt Ordner an und legt Rezepte hinein.'],
      ['Ordner verwalten', 'Mit „Ordner verwalten“ benennst du um, bringst die Ordner in die Reihenfolge deiner Küche und archivierst Ordner, die du nicht mehr nutzt, etwa das Menü der letzten Saison.'],
      ['Archiv', 'Archivierte Ordner und ihre Rezepte bleiben gespeichert. Du findest sie unten unter „Archiv“.'],
      ['Aus dem Team nehmen', 'Öffne ein Rezept aus dem Team und wähle ⋯, um es aus dem Küchenteam oder mit „Aus Ordner entfernen“ aus dem Ordner zu nehmen. Das Rezept bleibt beim Ersteller.'],
      ['Drucken', 'Drucke das ganze Team, einen Ordner oder eine eigene Auswahl in einem Schritt, mit dem Logo des Eigentümers. Siehe [Mehrere Rezepte drucken](#printen-map).']
    ]
  },
  'recept-overnemen': {
    slug: 'de/handbuch-rezept-uebernehmen',
    menu: 'Ein Rezept eines Kollegen übernehmen',
    title: 'Ein Rezept eines Kollegen als eigene Kopie übernehmen | Handbuch Savour',
    desc: 'So übernimmst du in Savour ein Rezept eines Kollegen: „Zu meinen Rezepten hinzufügen“ gibt dir eine eigene Kopie, die du ändern kannst. Das Original bleibt beim Ersteller.',
    lead: 'Eine eigene Version des Rezepts deines Kollegen, ohne das Original zu ändern.',
    sections: [
      ['In einem Küchenteam', 'Bei jedem Rezept eines Kollegen im Küchenteam siehst du „Zu meinen Rezepten hinzufügen“. Du bekommst eine eigene Kopie in deiner Bibliothek.'],
      ['Über einen geteilten Link', 'Hat der Ersteller beim [Teilen](#delen-link) „Empfänger dürfen dieses Rezept übernehmen“ eingeschaltet, kannst du das Rezept mit Konto auch über den Link hinzufügen.'],
      ['Deine Kopie', 'Deine Kopie gehört ganz dir: Du kannst sie [bearbeiten](#recept-maken), in deine eigenen [Ordner](#mappen) legen und umrechnen. Das Original bleibt beim Ersteller und ändert sich nicht mit.']
    ]
  },
  'keukenteam-verlaten': {
    slug: 'de/handbuch-kuechenteam-verlassen-oder-loeschen',
    menu: 'Verlassen, löschen und Savour Pro',
    title: 'Ein Küchenteam verlassen oder löschen, und Savour Pro | Handbuch',
    desc: 'Was passiert, wenn du ein Küchenteam in Savour verlässt oder löschst, und was mit dem Team passiert, wenn der Eigentümer Savour Pro beendet.',
    lead: 'Was mit den Rezepten passiert, wenn jemand geht oder aufhört.',
    sections: [
      ['Verlassen', 'Ein Mitglied kann ein Küchenteam immer verlassen. Deine eigenen Rezepte behältst du; die Rezepte anderer siehst du dann nicht mehr. Willst du eines behalten, [übernimm es vorher](#recept-overnemen).'],
      ['Löschen', 'Nur der Eigentümer kann das Küchenteam löschen, unter Allgemein in den Einstellungen. Die Rezepte selbst bleiben in der Bibliothek ihres Erstellers.'],
      ['Wenn der Eigentümer Pro beendet', 'Ein Küchenteam funktioniert, solange der Eigentümer [Savour Pro](#gratis-en-pro) hat, auch in der Probewoche. Endet das, ist das Team gesperrt, aber alles bleibt gespeichert, bis der Eigentümer wieder Pro hat.']
    ]
  },
  'collega-uitnodigen': {
    slug: 'de/handbuch-kollegen-einladen',
    menu: 'Kollegen einladen: 14 Tage Pro',
    title: 'Einen Kollegen einladen und 14 Tage Savour Pro bekommen | Handbuch',
    desc: 'So lädst du einen Kollegen mit deinem persönlichen Link zu Savour ein und bekommst 14 Tage Savour Pro geschenkt, wenn er ein Konto erstellt und sich anmeldet.',
    lead: 'Teile Savour mit einem Kollegen und bekomm Pro dafür.',
    sections: [
      ['Dein persönlicher Link', 'Wähle im Menü unter Allgemein „Kollegen einladen“. Kopiere deinen persönlichen Link oder teile ihn per WhatsApp oder einer anderen App.'],
      ['Wann du das Geschenk bekommst', 'Erstellt dein Kollege über deinen Link ein Konto, bestätigt die E-Mail-Adresse und meldet sich an, bekommst du 14 Tage Savour Pro geschenkt. Dein Kollege bekommt selbst die normale Probewoche von 7 Tagen.'],
      ['Wenn du schon für Pro zahlst', 'Mit einem bezahlten Abo bekommst du die 14 Tage als Guthaben auf deine nächste Rechnung. Hast du gekündigt, beginnen sie nach deinem bezahlten Zeitraum.'],
      ['Wie oft', 'Das Geschenk gilt für neue Konten, einmal pro Kollege, bis zu 12 Mal. Bei „Kollegen einladen“ siehst du, wie viele Kollegen du eingeladen hast.']
    ]
  }
};
