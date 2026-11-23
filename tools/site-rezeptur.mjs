// Duitse pagina "Rezepturverwaltung" (2026-11-23), alleen in het Duits: /de/rezepturverwaltung.
// Waarom: in Search Console zoeken Duitse vakmensen op "Rezepturverwaltung Software" (Rezeptur = vast recept met
// exacte hoeveelheden, het woord van Großküche, bakkerij en productie), terwijl de site vooral "Rezeptverwaltung"
// gebruikte. Op verzoek van de eigenaar staan beide woorden erin. Alles klopt met CLAUDE.md en de app; geen cijfers
// die we niet kunnen onderbouwen. Gebouwd door tools/build-seo.mjs (zelfde opbouw als de Paprika-pagina).

export const REZEPTUR_PAGE = {
  de: {
    slug: 'de/rezepturverwaltung',
    title: 'Rezepturverwaltung Software für Großküche | Savour',
    desc: 'Rezepturen und Rezepte digital verwalten: aus Word, PDF und Excel importieren, hochrechnen, 14 Allergene pro Rezeptur und im Küchenteam teilen.',
    crumb: 'Rezepturverwaltung',
    h1: 'Rezeptur­verwaltung: jede Rezeptur genau so, wie sie gemeint ist',
    lead: 'Alle Rezepturen und Rezepte deiner Küche an einem Ort, auf Computer, Tablet und Handy. Für Großküche, Bäckerei, Konditorei, Catering und Restaurant.',
    sections: [
      [
        'Was Rezeptur­verwaltung ist',
        'Eine Rezeptur ist ein festes Rezept mit genauen Mengen: so, wie es in deiner Küche jedes Mal gleich gemacht wird. Rezepturverwaltung heißt, dass diese Rezepturen nicht mehr verstreut in Ordnern, Excel-Listen und Notizbüchern stehen, sondern an einem Ort, aktuell und für das ganze Team auffindbar.\n\nSavour ist eine Rezeptverwaltung und Rezepturverwaltung in einem: für das einzelne Rezept, das du schnell nachschlägst, und für die Standardrezeptur, die jeder in der Brigade gleich umsetzen muss.'
      ],
      [
        'Rezepturen übernehmen, ohne abzutippen',
        'Zieh Word-Dateien, PDFs, Excel-Listen oder Text in Savour, auch wenn Hunderte Rezepturen darin stehen. Der Savour-Leser trennt die Rezepte, setzt Titel, Zutaten und Zubereitung an die richtige Stelle und das kostenlos. Handschriftliche Notizen und Fotos liest mit Savour Pro die KI.\n\nSavour erfindet nie Mengen, Zutaten oder Schritte. Ist sich der Leser bei einer Rezeptur unsicher, markiert er sie und du prüfst sie selbst, bevor sie gespeichert wird. Mehr dazu: [Rezepte digitalisieren](/de/rezepte-digitalisieren).'
      ],
      [
        'Rezepturen hochrechnen',
        'Jede Rezeptur rechnest du auf die Menge um, die du brauchst: auf Portionen, Stück oder mit einem eigenen Faktor, für das Mittagsgeschäft oder eine große Veranstaltung. Die Rezeptur selbst bleibt dabei unverändert. Mehr dazu: [Rezepte hochrechnen](/de/rezepte-hochrechnen).'
      ],
      [
        'Allergene pro Rezeptur',
        'Mit Savour Pro siehst du bei jeder Rezeptur die 14 Allergene, die du kennzeichnen musst, abgeleitet aus den Zutaten. Du prüfst und ergänzt sie selbst; Savour ändert nichts ohne dich. Mehr dazu: [Allergene pro Rezept](/de/allergene-pro-rezept) und die öffentliche [Zutatenliste](/de/zutatenliste-allergene).'
      ],
      [
        'Standardrezepturen für das ganze Team',
        'In einem Küchenteam arbeitet die ganze Brigade mit denselben Rezepturen, mit drei Rollen: der Inhaber verwaltet, Sous-Chefs fügen Rezepte hinzu und passen Rezepturen an, Köche schauen mit, ohne versehentlich etwas zu löschen. Ein Küchenteam erstellen und Rezepturen bearbeiten geht mit Savour Pro; mitlesen ist kostenlos. Mit den [MEP-Listen](/de/mep-listen) planst du pro Posten, was vorbereitet werden muss.'
      ],
      [
        'Das Rezepturblatt drucken',
        'Drucke eine Rezeptur sauber auf A4 für die Küchenwand oder den Ordner am Posten, mit Savour Pro auch mit dem Logo deines Betriebs. Mehr dazu: [Rezepte drucken](/de/rezepte-drucken).'
      ],
      [
        'In der Küche, auch offline',
        'Am Computer importierst und ordnest du deine Rezepturen, in der Küche öffnest du dasselbe Rezept auf Handy oder Tablet, mit großer Schrift im Kochmodus. Hast du Savour einmal mit Internet geöffnet, findest du deine Rezepte auch ohne WLAN, etwa im Kühlhaus oder auf einer Veranstaltung.'
      ],
      [
        'Was es kostet',
        'Kostenlos bis 100 Rezepte. Savour Pro kostet 2,99 € im Monat oder 29 € im Jahr: unbegrenzt Rezepte und Rezepturen, die KI für Notizen und Fotos, Küchenteams und Drucken mit Logo. Neue Konten bekommen 7 Tage Pro gratis, ohne Zahlungsdaten. Beendest du Pro, bleiben alle deine Rezepte erhalten. Alle Preise: [Preise](/de/preise).'
      ]
    ],
    showcase: [
      {
        title: 'Rezepturen importieren',
        text: 'Word, PDF, Excel oder Text: Savour trennt die Rezepturen und du prüfst alles in einer Übersicht, bevor es gespeichert wird.',
        shot: '/assets/app/importeren-de.jpg',
        alt: 'Rezepturen in Savour importieren und prüfen'
      },
      {
        title: 'Rezeptur hochrechnen',
        text: 'Auf Portionen, Stück oder mit einem eigenen Faktor, ohne die Rezeptur selbst zu verändern.',
        shot: '/assets/app/omrekenen-de.jpg',
        alt: 'Eine Rezeptur in Savour hochrechnen'
      },
      {
        title: 'Allergene auf einen Blick',
        text: 'Die 14 Allergene bei jeder Rezeptur, abgeleitet aus den Zutaten (Savour Pro).',
        shot: '/assets/app/allergenen-de.jpg',
        alt: 'Allergene einer Rezeptur in Savour'
      }
    ],
    faq: [
      [
        'Was ist der Unterschied zwischen Rezept und Rezeptur?',
        'Ein Rezept beschreibt, wie man etwas zubereitet. Eine Rezeptur ist ein festes Rezept mit genauen Mengen, das in einem Betrieb jedes Mal gleich umgesetzt wird. In Savour verwaltest du beides auf dieselbe Weise.'
      ],
      [
        'Kann ich meine Rezepturen aus Excel übernehmen?',
        'Ja. Excel- und CSV-Dateien, Word, PDF und Text liest der Savour-Leser kostenlos. Fotos von handschriftlichen Notizen liest die KI mit Savour Pro.'
      ],
      [
        'Verändert Savour meine Rezepturen?',
        'Nein. Savour übernimmt, was dasteht, und erfindet nie Mengen oder Zutaten. Ist sich der Leser unsicher, prüfst du die Rezeptur selbst. Deine Rezepte werden auch nie übersetzt.'
      ],
      [
        'Ist Savour für eine Großküche oder Bäckerei geeignet?',
        'Savour ist für Profiküchen gemacht: Restaurants, Großküchen, Catering, Konditoreien und Bäckereien. Du rechnest Rezepturen auf große Mengen hoch und teilst sie im Küchenteam für 5, 10 oder 25 Personen.'
      ]
    ]
  }
};
