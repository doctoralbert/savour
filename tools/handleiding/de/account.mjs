// Handbuch (Duits), Abschnitt „Konto und Abo“.

export const groups = {
  account: {
    name: 'Konto und Abo',
    intro: 'Dein Profil, Darstellung und Sprache, was kostenlos geht und was Savour Pro hinzufügt, Organisationen, Kündigen und dein Konto löschen.'
  }
};

export const pages = {
  'gratis-en-pro': {
    slug: 'de/handbuch-konto-und-pro',
    menu: 'Kostenlos und Savour Pro',
    title: 'Kostenlos oder Savour Pro: was drin ist und was es kostet | Handbuch',
    desc: 'Was du in Savour kostenlos kannst und was Savour Pro hinzufügt: unbegrenzt Rezepte, KI für Fotos, Küchenteams, Drucken mit Logo und Download. 2,99 € pro Monat.',
    lead: 'Was kostenlos geht, was Savour Pro hinzufügt und wie die Probewoche funktioniert.',
    sections: [
      ['Kostenlos', 'Ein kostenloses Konto speichert bis zu 100 Rezepte, liest Word, PDF, Text und Exporte anderer Apps mit dem Savour-Leser ein, rechnet um, hat den Kochmodus, druckt und kann Mitglied von Küchenteams sein.'],
      [
        'Savour Pro',
        'Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr und bietet zusätzlich:',
        [
          'Unbegrenzt Rezepte speichern.',
          'KI für [Fotos, Handschrift und Zweifelsfälle](#import-ai), bis 500 Importe pro Monat.',
          'Selbst [Küchenteams erstellen](#keukenteam-maken) und dein Team einladen.',
          '[Drucken mit dem Logo deines Restaurants](#printen-logo).',
          '[Download als Word-Datei oder Backup](#downloaden).',
          'Keine Werbung in der App.'
        ]
      ],
      ['Die Probewoche', 'Neue Konten bekommen 7 Tage Savour Pro kostenlos, ohne Zahlungsdaten. Auch in der Probewoche speicherst du bis zu 100 Rezepte.'],
      ['Bezahlen', 'Du bezahlst mit iDEAL, Kreditkarte, Apple Pay, Google Pay oder PayPal. Es wird keine MwSt. berechnet (niederländische Kleinunternehmerregelung). Kündigen geht jederzeit; Pro bleibt bis zum Ende des bezahlten Zeitraums aktiv.'],
      ['Für eine ganze Küche', 'Soll jeder in deiner Küche Pro haben, wähle eine [Organisation](#organisatie). Alle Preise stehen auf [Savour Pro](/savour-pro).']
    ]
  },
  organisatie: {
    slug: 'de/handbuch-organisations-abo',
    menu: 'Organisationen: Pro für die ganze Küche',
    title: 'Ein Organisations-Abo: Savour Pro für deine ganze Küche | Handbuch',
    desc: 'Savour für eine ganze Küche: Organisationen für 5, 10 oder 25 Personen, alle haben Savour Pro. So lädst du dein Team ein und verwaltest die Plätze.',
    lead: 'Savour Pro für alle in deiner Küche, mit einem Abo.',
    sections: [
      ['Was es ist', 'Mit einer Organisation hat jeder in deinem Team Savour Pro. Es gibt Abos für 5, 10 oder 25 Personen: 8,99 €, 14,99 € oder 29,99 € pro Monat.'],
      ['Einrichten', 'Wähle auf der Seite [Savour Pro](/savour-pro) eine Organisation oder geh zu Mein Konto → Savour Pro. Lade dort dein Team auf die Plätze ein.'],
      ['Organisation oder Küchenteam', 'Bei einer Organisation geht es darum, wer Pro hat. Bei einem [Küchenteam](#keukenteams) geht es darum, welche Rezepte ihr teilt. Für ein Team, das Rezepte teilt, reicht ein Eigentümer mit Pro; mit einer Organisation kann jeder auch selbst Fotos lesen lassen, Küchenteams erstellen und mit Logo drucken.']
    ]
  },
  'abonnement-beheren': {
    slug: 'de/handbuch-abo-verwalten',
    menu: 'Dein Abo verwalten',
    title: 'Dein Savour-Pro-Abo und Rechnungen verwalten | Handbuch',
    desc: 'So verwaltest du dein Abo in Savour: Pro abschließen, zwischen Monat und Jahr wählen, Zahlungsdaten und Rechnungen, und das Logo für deine Ausdrucke.',
    lead: 'Alles zu deinem Abo an einem Ort: Mein Konto → Savour Pro.',
    sections: [
      ['Wo', 'Geh zu Mein Konto → Savour Pro. Dort siehst du, ob du Savour Pro, eine Probewoche oder eine Organisation hast und bis wann.'],
      ['Pro abschließen', 'Wähle Savour Pro pro Monat oder pro Jahr und bezahle mit iDEAL, Kreditkarte, Apple Pay, Google Pay oder PayPal. Pro hast du direkt nach der Zahlung.'],
      ['Ändern und Rechnungen', 'Wähle unter Savour Pro „Abo verwalten“. Dort änderst du deine Zahlungsdaten, siehst deine Rechnungen und kündigst.'],
      ['Logo auf Ausdrucken', 'Das [Logo für deine Ausdrucke](#printen-logo) richtest du im Tab „Logo auf Ausdrucken“ ein.']
    ]
  },
  'pro-stoppen': {
    slug: 'de/handbuch-pro-beenden',
    menu: 'Savour Pro beenden',
    title: 'Savour Pro beenden: deine Rezepte bleiben erhalten | Handbuch',
    desc: 'Was passiert, wenn du Savour Pro beendest: Alle Rezepte bleiben erhalten, nur Hinzufügen über 100 geht nicht, und dein Küchenteam ist gesperrt, bis du wieder Pro hast.',
    lead: 'Du behältst immer alles. Das ändert sich.',
    sections: [
      ['Kündigen', 'Kündige über Mein Konto → Savour Pro. Pro bleibt bis zum Ende des bezahlten Zeitraums aktiv.'],
      ['Deine Rezepte bleiben', 'Beendest du Pro, bleiben alle deine Rezepte erhalten, auch wenn es mehr als 100 sind. Du kannst sie ansehen, umrechnen und drucken. Nur neue Rezepte über 100 hinzufügen geht dann nicht mehr.'],
      ['Dein Küchenteam', 'Ein Küchenteam, dessen Eigentümer du bist, ist gesperrt, solange du kein Pro hast. Alles bleibt gespeichert; mit Pro funktioniert es wieder. Siehe [Verlassen, löschen und Savour Pro](#keukenteam-verlaten).'],
      ['Nach der Probewoche', 'Nach der kostenlosen Probewoche passiert dasselbe: Alles, was du angelegt hast, bleibt erhalten.']
    ]
  },
  'account-profiel': {
    slug: 'de/handbuch-mein-konto',
    menu: 'Mein Konto: Profil und Passwort',
    title: 'Mein Konto: Name, Profilfoto und Passwort | Handbuch Savour',
    desc: 'So verwaltest du dein Konto in Savour: Name und Profilfoto ändern, Passwort ändern, abmelden und die anderen Tabs unter Mein Konto.',
    lead: 'Dein Profil und die Einstellungen deines Kontos an einem Ort.',
    sections: [
      ['Wo', 'Wähle im Menü Einstellungen oder am Handy oben das Symbol für Mein Konto. Mein Konto hat die Tabs Konto, Savour Pro, Logo auf Ausdrucken, Darstellung, Kategorien und Aufräumen.'],
      ['Profil', 'Unter Konto änderst du Name und Profilfoto. Ein Profilfoto schneidest du zu, damit dein Gesicht gut im Bild ist.'],
      ['Passwort', 'Wähle unter Konto ein neues Passwort. Weißt du dein Passwort nicht mehr, nutze „Passwort vergessen?“ beim [Anmelden](#inloggen).'],
      ['Weiter unter Konto', 'Hier [druckst oder lädst du alle Rezepte herunter](#downloaden), [lädst einen Kollegen ein](#collega-uitnodigen), [installierst die App](#app-installeren), meldest dich ab und [löschst dein Konto](#account-verwijderen).'],
      ['Die anderen Tabs', '[Savour Pro](#abonnement-beheren), [Logo auf Ausdrucken](#printen-logo), [Darstellung](#weergave-en-taal), [Kategorien](#categorieen) und [Aufräumen](#opschonen).']
    ]
  },
  'weergave-en-taal': {
    slug: 'de/handbuch-darstellung-und-sprache',
    menu: 'Dunkles oder helles Design und Sprache',
    title: 'Dunkles oder helles Design und die Sprache von Savour | Handbuch',
    desc: 'So wählst du in Savour das dunkle oder helle Design und die Sprache: Niederländisch, Englisch, Deutsch, Spanisch oder Französisch. Deine Rezepte werden nie übersetzt.',
    lead: 'So liest sich Savour in deiner Küche am angenehmsten.',
    sections: [
      ['Dunkel oder hell', 'Savour ist standardmäßig dunkel mit Gold. Wähle unter Mein Konto → Darstellung „Dunkel“ oder „Hell“ oder wechsle mit dem Knopf oben. Deine Wahl wird in deinem Konto gespeichert, also auch auf deinen anderen Geräten.'],
      ['Sprache', 'Mit dem Sprachknopf oben stellst du Savour auf Niederländisch, Englisch, Deutsch, Spanisch oder Französisch. Die Knöpfe und Erklärungen ändern sich mit.'],
      ['Deine Rezepte bleiben, wie sie sind', 'Rezepte und Namen werden nie übersetzt. Ein Rezept auf Niederländisch bleibt Niederländisch, auch wenn du Savour auf Deutsch nutzt.']
    ]
  },
  'account-verwijderen': {
    slug: 'de/handbuch-konto-loeschen',
    menu: 'Dein Konto löschen',
    title: 'Dein Savour-Konto endgültig löschen | Handbuch',
    desc: 'So löschst du dein Savour-Konto: was gelöscht wird, was du vorher herunterladen kannst und warum das nicht rückgängig gemacht werden kann.',
    lead: 'Weg ist weg. Lade vorher herunter, was du behalten willst.',
    sections: [
      ['Vorher herunterladen', 'Willst du deine Rezepte behalten, [lade sie vorher herunter](#downloaden) als Word-Datei oder Backup, oder [drucke sie](#printen-map).'],
      ['Löschen', 'Geh zu Mein Konto → Konto und wähle unten „Konto endgültig löschen“. Savour fragt zuerst, ob du sicher bist.'],
      ['Was gelöscht wird', 'Deine persönlichen Rezepte, Ordner, Favoriten und Profildaten. Das kann nicht rückgängig gemacht werden.'],
      ['Ein Abo', 'Hast du Savour Pro, [kündige es vorher](#pro-stoppen) unter Savour Pro.']
    ]
  },
  'privacy-en-veiligheid': {
    slug: 'de/handbuch-datenschutz-und-deine-rezepte',
    menu: 'Deine Rezepte, Datenschutz und Sicherheit',
    title: 'Deine Rezepte, Datenschutz und Sicherheit in Savour | Handbuch',
    desc: 'Wem deine Rezepte in Savour gehören, wer sie sehen kann, wo sie liegen und wie du sie immer mitnehmen kannst. Mit einem Link zur Datenschutzerklärung.',
    lead: 'Deine Rezepte gehören dir. So geht Savour damit um.',
    sections: [
      ['Deine', 'Deine Rezepte gehören dir. Savour löscht nie etwas, ohne dass du darum bittest, und du kannst sie immer mitnehmen.'],
      ['Wer sie sieht', 'Deine eigenen Rezepte und Ordner siehst nur du. Rezepte, die du in ein [Küchenteam](#keukenteams) legst, sieht dieses Team. Einen [geteilten Link](#delen-link) kann jeder öffnen, der ihn hat, solange er funktioniert.'],
      ['Wo sie liegen', 'Deine Rezepte liegen in der Cloud, damit du auf jedem Gerät an sie kommst. Rezepte, die du geöffnet hast, liegen auch auf deinem Gerät für die [Offline-Nutzung](#offline).'],
      ['Mitnehmen', 'Mit Savour Pro [lädst du alle Rezepte herunter](#downloaden), wann du willst.'],
      ['Mehr', 'Alles darüber, welche Daten Savour speichert und mit wem zusammengearbeitet wird, steht in der [Datenschutzerklärung](/privacy).']
    ]
  }
};
