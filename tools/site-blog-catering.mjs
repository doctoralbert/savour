// Blog: Savour voor cateraars (2026-11-20), in vijf talen. Klopt met js/features/scale.js (omrekenen naar elk aantal
// gasten), js/features/mep.js (MEP-lijst per event met couverts per kaart, live, offline, A4), js/features/products.js
// (allergenen via basisrecepten), keukenteams, teamabonnementen (js/features/pro.js) en de import service.
// Schermen: gazpacho naar 120 personen en het A4-blad van de MEP-lijst. Foto's: assets/keuken/catering-*.jpg.

const KEY = 'en/blog/savour-for-caterers';
const shots = lang => ({ batch: `/assets/app/catering-batch-${lang}.jpg`, a4: `/assets/app/mep-a4-${lang}.jpg` });
const buffet = { shot: '/assets/keuken/catering-buffet.jpg', wide: true };
const pass = { shot: '/assets/keuken/catering-pass.jpg', wide: true };

export const CATERING_POST = {
  id: 'catering',
  date: '2026-11-20',
  rich: true,
  photo: 'cateringBlog',
  nl: {
    slug: 'blog/savour-voor-cateraars',
    title: 'Savour voor cateraars en eventbedrijven',
    desc: 'Recepten opschalen naar honderden gasten, een MEP-lijst per event met couverts per kaart, allergenen per gerecht en één receptenboek voor al je koks. Zo gebruik je Savour in de catering.',
    h1: 'Savour voor cateraars: van 6 personen naar 300',
    lead: 'In de catering kook je zelden twee keer voor hetzelfde aantal gasten. Vandaag een lunch voor 40, zaterdag een bruiloft van 250, met koks die niet altijd dezelfde zijn. Zo houdt Savour het overzicht.',
    brief: [
      'Elk recept reken je om naar het aantal gasten van het event, zonder rekenmachine.',
      'Per event een MEP-lijst met couverts per kaart; je team vinkt live af, ook zonder wifi.',
      'Allergenen per gerecht en één receptenboek voor vaste koks, oproepkrachten en locaties.'
    ],
    sections: [
      [
        'Opschalen naar het event',
        'Vul bij een recept in voor hoeveel gasten je kookt en Savour rekent elk ingrediënt om. Een gazpacho voor 6 wordt er een voor 120: 20 kg trostomaten, 20 komkommers. Gram wordt kilo zodra dat beter leest, en het originele recept blijft altijd staan.',
        { ...buffet, alt: 'Gastronormbakken met groenten, vlees en granen voor een event', caption: 'Honderden porties beginnen bij één recept dat klopt.' },
        { shot: shots('nl').batch, alt: 'Gazpacho in Savour op de telefoon, omgerekend naar 120 personen', caption: 'Van 6 naar 120 personen: alles rekent mee.' }
      ],
      [
        'Een MEP-lijst per event',
        'Maak per event of per post een MEP-lijst met wat er klaar moet staan. Per kaart vul je het aantal couverts in, bijvoorbeeld het walking dinner van 250 naast de lunch van 40, en Savour rekent per onderdeel uit hoeveel je nodig hebt. Je team vinkt live af; valt de wifi weg op locatie, dan onthoudt Savour het en stuurt het zodra er weer verbinding is.',
        { ...pass, alt: 'Een kok vinkt een prep-lijst af bij de borden', caption: 'Wat klaarstaat, vink je af; de rest van het team ziet het meteen.' },
        {
          steps: [
            ['Open Tools → MEP-lijsten', 'Maak een nieuwe lijst of kopieer die van het vorige event.'],
            ['Kaarten en onderdelen', 'Per kaart de kopjes en wat er klaar moet staan, met de hoeveelheid per couvert.'],
            ['Couverts invullen', 'Savour rekent per onderdeel de hoeveelheid voor vandaag uit.'],
            ['Afvinken of printen', 'Live op de telefoon, of op één A4 voor de pass.']
          ]
        }
      ],
      [
        'Op papier mee naar de locatie',
        'Op locatie is een vel papier vaak handiger dan een telefoon. Print de MEP-lijst op één A4, staand of liggend, met hokjes om af te vinken. Datum en couverts staan er niet op, zodat je hetzelfde blad bij elk event kunt gebruiken.',
        { shot: shots('nl').a4, alt: 'Een MEP-lijst uit Savour, geprint op één A4', caption: 'Eén A4, met hokjes, klaar voor de pass.' }
      ],
      [
        'Allergenen per gerecht',
        'Op een event vraagt altijd iemand naar noten, gluten of lactose. Savour zoekt bij elk ingrediënt de allergenen op en telt ze per gerecht op, ook via je eigen fonds, sauzen en deeg. Merkproducten die per merk verschillen, zie je gemarkeerd.',
        { warn: ['Het etiket gaat voor', 'Savour zegt nooit dat een gerecht allergeenvrij is zolang niet alles is nagekeken. Controleer bij twijfel het etiket van je leverancier.'] }
      ],
      [
        'Eén receptenboek voor al je koks',
        'Vaste koks, oproepkrachten en een tweede locatie werken uit dezelfde recepten. Maak een keukenteam per keuken of per event en nodig iedereen uit op het e-mailadres. Meekijken, printen en omrekenen kan met een gratis account; wie recepten toevoegt of bewerkt, heeft Savour Pro nodig. Met een teamabonnement voor 5, 10 of 25 personen (€8,99, €14,99 of €29,99 per maand) heeft je hele keuken Pro.'
      ],
      [
        'Alles overzetten, of laten overzetten',
        'Je Word-bestanden en PDF’s leest Savour zelf in. Liever dat het voor je gebeurt? Met de [import service](/recepten-laten-inladen) laden de koks achter Savour je recepten in. Een kostprijs per gerecht kan Savour nog niet berekenen; die staat op [Binnenkort](/binnenkort). Meer op [Voor cateraars](/voor-cateraars).'
      ]
    ],
    outro: 'Deze uitleg beschrijft Savour zoals het nu live staat. Mis je iets voor je events? Vertel het in de Community.'
  },
  en: {
    slug: KEY,
    title: 'Savour for caterers and event companies',
    desc: 'Scale recipes to hundreds of guests, a prep list per event with covers per menu, allergens per dish and one recipe book for all your cooks. How to use Savour in catering.',
    h1: 'Savour for caterers: from 6 people to 300',
    lead: 'In catering you rarely cook twice for the same number of guests. A lunch for 40 today, a wedding of 250 on Saturday, with cooks who are not always the same. This is how Savour keeps the overview.',
    brief: [
      'You scale every recipe to the number of guests at the event, without a calculator.',
      'A prep list per event with covers per menu; your team ticks off live, even without wifi.',
      'Allergens per dish and one recipe book for regular cooks, freelancers and locations.'
    ],
    sections: [
      [
        'Scaling to the event',
        'Enter on a recipe how many guests you are cooking for and Savour converts every ingredient. A gazpacho for 6 becomes one for 120: 20 kg of tomatoes, 20 cucumbers. Grams become kilos as soon as that reads better, and the original recipe always stays as it is.',
        { ...buffet, alt: 'Gastronorm trays with vegetables, meat and grains for an event', caption: 'Hundreds of portions start with one recipe that is right.' },
        { shot: shots('en').batch, alt: 'Gazpacho in Savour on a phone, scaled to 120 people', caption: 'From 6 to 120 people: everything follows.' }
      ],
      [
        'A prep list per event',
        'Create a prep list per event or per section with what has to be ready. Per menu you enter the covers, for example the walking dinner of 250 next to the lunch of 40, and Savour works out how much you need of every item. Your team ticks off live; if the wifi drops out on location, Savour remembers and sends it as soon as there is a connection again.',
        { ...pass, alt: 'A cook ticks off a prep list next to the plates', caption: 'What is ready, you tick off; the rest of the team sees it straight away.' },
        {
          steps: [
            ['Open Tools → Prep lists', 'Create a new list or copy the one from the last event.'],
            ['Menus and items', 'Per menu the headings and what has to be ready, with the quantity per cover.'],
            ['Enter the covers', 'Savour works out today’s quantity for every item.'],
            ['Tick off or print', 'Live on the phone, or on one A4 for the pass.']
          ]
        }
      ],
      [
        'On paper to the location',
        'On location a sheet of paper is often handier than a phone. Print the prep list on one A4, portrait or landscape, with boxes to tick. The date and covers are left off, so you can use the same sheet at every event.',
        { shot: shots('en').a4, alt: 'A prep list from Savour printed on one A4', caption: 'One A4, with boxes, ready for the pass.' }
      ],
      [
        'Allergens per dish',
        'At an event someone always asks about nuts, gluten or lactose. Savour looks up the allergens of every ingredient and adds them up per dish, also through your own stocks, sauces and doughs. Products that differ by brand are marked.',
        { warn: ['The label comes first', 'Savour never says a dish is allergen-free while not everything is checked. When in doubt, check your supplier’s label.'] }
      ],
      [
        'One recipe book for all your cooks',
        'Regular cooks, freelancers and a second location work from the same recipes. Create a kitchen team per kitchen or per event and invite everyone by email. Viewing, printing and scaling work with a free account; whoever adds or edits recipes needs Savour Pro. With a team plan for 5, 10 or 25 people (€8.99, €14.99 or €29.99 per month) your whole kitchen has Pro.'
      ],
      [
        'Bring everything over, or have it done',
        'Savour reads your Word files and PDFs itself. Rather have it done for you? With the [import service](/en/recipe-import-service) the cooks behind Savour load your recipes. Savour cannot calculate a cost per dish yet; that is on [Coming soon](/en/roadmap). More on [For caterers](/en/for-caterers).'
      ]
    ],
    outro: 'This explains Savour as it is live today. Missing something for your events? Tell us in the Community.'
  }
};

export const CATERING_POST_DE = {
  [KEY]: {
    slug: 'de/blog/savour-fuer-caterer',
    title: 'Savour für Caterer und Eventbetriebe',
    desc: 'Rezepte auf Hunderte Gäste hochrechnen, eine MEP-Liste pro Event mit Gedecken pro Karte, Allergene pro Gericht und ein Rezeptbuch für alle Köche. So nutzt du Savour im Catering.',
    h1: 'Savour für Caterer: von 6 Personen auf 300',
    lead: 'Im Catering kochst du selten zweimal für dieselbe Zahl Gäste. Heute ein Lunch für 40, am Samstag eine Hochzeit mit 250, mit Köchen, die nicht immer dieselben sind. So behält Savour den Überblick.',
    brief: [
      'Jedes Rezept rechnest du auf die Gästezahl des Events um, ohne Taschenrechner.',
      'Pro Event eine MEP-Liste mit Gedecken pro Karte; dein Team hakt live ab, auch ohne WLAN.',
      'Allergene pro Gericht und ein Rezeptbuch für feste Köche, Aushilfen und Standorte.'
    ],
    sections: [
      [
        'Hochrechnen auf das Event',
        'Trag bei einem Rezept ein, für wie viele Gäste du kochst, und Savour rechnet jede Zutat um. Eine Gazpacho für 6 wird eine für 120: 20 kg Tomaten statt 1 kg. Gramm wird zu Kilo, sobald das besser lesbar ist, und das Originalrezept bleibt immer, wie es ist.',
        { ...buffet, alt: 'Gastronormbehälter mit Gemüse, Fleisch und Getreide für ein Event', caption: 'Hunderte Portionen beginnen mit einem Rezept, das stimmt.' },
        { shot: shots('de').batch, alt: 'Gazpacho in Savour auf dem Handy, umgerechnet auf 120 Personen', caption: 'Von 6 auf 120 Personen: alles rechnet mit.' }
      ],
      [
        'Eine MEP-Liste pro Event',
        'Leg pro Event oder Posten eine MEP-Liste an mit dem, was bereitstehen muss. Pro Karte trägst du die Gedecke ein, etwa das Walking Dinner mit 250 neben dem Lunch mit 40, und Savour rechnet pro Posten aus, wie viel du brauchst. Dein Team hakt live ab; fällt vor Ort das WLAN aus, merkt sich Savour das und schickt es, sobald wieder eine Verbindung da ist.',
        { ...pass, alt: 'Ein Koch hakt eine MEP-Liste neben den Tellern ab', caption: 'Was bereitsteht, hakst du ab; das Team sieht es sofort.' },
        {
          steps: [
            ['Öffne Werkzeuge → MEP-Listen', 'Leg eine neue Liste an oder kopiere die vom letzten Event.'],
            ['Karten und Posten', 'Pro Karte die Überschriften und was bereitstehen muss, mit der Menge pro Gedeck.'],
            ['Gedecke eintragen', 'Savour rechnet pro Posten die Menge für heute aus.'],
            ['Abhaken oder drucken', 'Live auf dem Handy oder auf einer A4-Seite für den Pass.']
          ]
        }
      ],
      [
        'Auf Papier mit zum Einsatzort',
        'Vor Ort ist ein Blatt Papier oft praktischer als ein Handy. Druck die MEP-Liste auf eine A4-Seite, hoch oder quer, mit Kästchen zum Abhaken. Datum und Gedecke stehen nicht darauf, so nutzt du dasselbe Blatt bei jedem Event.',
        { shot: shots('de').a4, alt: 'Eine MEP-Liste aus Savour, gedruckt auf einer A4-Seite', caption: 'Eine A4-Seite, mit Kästchen, bereit für den Pass.' }
      ],
      [
        'Allergene pro Gericht',
        'Auf einem Event fragt immer jemand nach Nüssen, Gluten oder Laktose. Savour sucht die Allergene jeder Zutat heraus und zählt sie pro Gericht zusammen, auch über deine eigenen Fonds, Saucen und Teige. Produkte, die je Marke verschieden sind, werden markiert.',
        { warn: ['Das Etikett geht vor', 'Savour sagt nie, dass ein Gericht allergenfrei ist, solange nicht alles geprüft ist. Prüf im Zweifel das Etikett deines Lieferanten.'] }
      ],
      [
        'Ein Rezeptbuch für alle Köche',
        'Feste Köche, Aushilfen und ein zweiter Standort arbeiten mit denselben Rezepten. Leg ein Küchenteam pro Küche oder pro Event an und lade alle per E-Mail ein. Ansehen, Drucken und Umrechnen geht mit einem kostenlosen Konto; wer Rezepte hinzufügt oder bearbeitet, braucht Savour Pro. Mit einem Team-Abo für 5, 10 oder 25 Personen (8,99 €, 14,99 € oder 29,99 € pro Monat) hat deine ganze Küche Pro.'
      ],
      [
        'Alles übernehmen oder übernehmen lassen',
        'Deine Word-Dateien und PDFs liest Savour selbst ein. Lieber machen lassen? Mit dem [Einpflege-Service](/de/rezepte-einpflegen-lassen) laden die Köche hinter Savour deine Rezepte. Einen Preis pro Gericht kann Savour noch nicht berechnen; der steht unter [Demnächst](/de/demnaechst). Mehr unter [Für Caterer](/de/fuer-caterer).'
      ]
    ],
    outro: 'Diese Erklärung beschreibt Savour, wie es jetzt live ist. Fehlt dir etwas für deine Events? Sag es in der Community.'
  }
};

export const CATERING_POST_ES = {
  [KEY]: {
    slug: 'es/blog/savour-para-catering',
    title: 'Savour para catering y empresas de eventos',
    desc: 'Escala recetas a cientos de invitados, una lista MEP por evento con cubiertos por carta, alérgenos por plato y un recetario para todos tus cocineros. Así usas Savour en catering.',
    h1: 'Savour para catering: de 6 personas a 300',
    lead: 'En catering casi nunca cocinas dos veces para el mismo número de invitados. Hoy un almuerzo para 40, el sábado una boda de 250, con cocineros que no siempre son los mismos. Así mantiene Savour el control.',
    brief: [
      'Escalas cada receta al número de invitados del evento, sin calculadora.',
      'Una lista MEP por evento con cubiertos por carta; tu equipo marca en directo, también sin wifi.',
      'Alérgenos por plato y un recetario para cocineros fijos, extras y locales.'
    ],
    sections: [
      [
        'Escalar al evento',
        'Indica en una receta para cuántos invitados cocinas y Savour convierte cada ingrediente. Un gazpacho para 6 pasa a ser para 120: de 1 kg a 20 kg de tomates. Los gramos pasan a kilos en cuanto se lee mejor, y la receta original siempre se queda como está.',
        { ...buffet, alt: 'Bandejas gastronorm con verduras, carne y cereales para un evento', caption: 'Cientos de raciones empiezan con una receta exacta.' },
        { shot: shots('es').batch, alt: 'Gazpacho en Savour en el móvil, escalado a 120 personas', caption: 'De 6 a 120 personas: todo se recalcula.' }
      ],
      [
        'Una lista MEP por evento',
        'Crea una lista MEP por evento o por partida con lo que debe estar listo. Por carta indicas los cubiertos, por ejemplo la cena cóctel de 250 junto al almuerzo de 40, y Savour calcula cuánto necesitas de cada elemento. Tu equipo marca en directo; si se cae el wifi en el lugar, Savour lo recuerda y lo envía en cuanto vuelve la conexión.',
        { ...pass, alt: 'Un cocinero marca una lista MEP junto a los platos', caption: 'Lo que está listo, lo marcas; el resto del equipo lo ve al instante.' },
        {
          steps: [
            ['Abre Herramientas → Listas MEP', 'Crea una lista nueva o copia la del evento anterior.'],
            ['Cartas y elementos', 'Por carta los encabezados y lo que debe estar listo, con la cantidad por cubierto.'],
            ['Indica los cubiertos', 'Savour calcula la cantidad de hoy de cada elemento.'],
            ['Marcar o imprimir', 'En directo en el móvil, o en un A4 para el pase.']
          ]
        }
      ],
      [
        'En papel al lugar del evento',
        'En el lugar, una hoja de papel suele ser más práctica que un móvil. Imprime la lista MEP en un A4, vertical u horizontal, con casillas para marcar. La fecha y los cubiertos no aparecen, así usas la misma hoja en cada evento.',
        { shot: shots('es').a4, alt: 'Una lista MEP de Savour impresa en un A4', caption: 'Un A4, con casillas, listo para el pase.' }
      ],
      [
        'Alérgenos por plato',
        'En un evento siempre alguien pregunta por frutos de cáscara, gluten o lactosa. Savour busca los alérgenos de cada ingrediente y los suma por plato, también a través de tus propios fondos, salsas y masas. Los productos que cambian según la marca aparecen marcados.',
        { warn: ['La etiqueta manda', 'Savour nunca dice que un plato no tiene alérgenos mientras no esté todo revisado. Ante la duda, revisa la etiqueta de tu proveedor.'] }
      ],
      [
        'Un recetario para todos tus cocineros',
        'Cocineros fijos, extras y un segundo local trabajan con las mismas recetas. Crea un equipo de cocina por cocina o por evento e invita a todos por correo. Ver, imprimir y convertir funciona con una cuenta gratuita; quien añade o edita recetas necesita Savour Pro. Con un plan de equipo para 5, 10 o 25 personas (8,99 €, 14,99 € o 29,99 € al mes) toda tu cocina tiene Pro.'
      ],
      [
        'Pasarlo todo, o que lo hagan por ti',
        'Savour lee tus archivos Word y PDF. ¿Prefieres que lo hagan por ti? Con el [servicio de carga de recetas](/es/servicio-de-carga-de-recetas) los cocineros detrás de Savour cargan tus recetas. Savour aún no calcula el coste por plato; eso está en [Próximamente](/es/proximamente). Más en [Para catering](/es/para-catering).'
      ]
    ],
    outro: 'Esta explicación describe Savour tal como está ahora. ¿Te falta algo para tus eventos? Cuéntalo en la Comunidad.'
  }
};

export const CATERING_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/savour-pour-traiteurs',
    title: 'Savour pour traiteurs et événementiel',
    desc: 'Convertir les recettes pour des centaines d’invités, une liste MEP par événement avec couverts par carte, les allergènes par plat et un livre de recettes pour tous tes cuisiniers. Comment utiliser Savour en traiteur.',
    h1: 'Savour pour traiteurs : de 6 personnes à 300',
    lead: 'En traiteur, on cuisine rarement deux fois pour le même nombre d’invités. Aujourd’hui un déjeuner pour 40, samedi un mariage de 250, avec des cuisiniers qui ne sont pas toujours les mêmes. Voici comment Savour garde la vue d’ensemble.',
    brief: [
      'Tu convertis chaque recette pour le nombre d’invités de l’événement, sans calculatrice.',
      'Une liste MEP par événement avec couverts par carte ; ton équipe coche en direct, même sans wifi.',
      'Les allergènes par plat et un livre de recettes pour cuisiniers fixes, extras et sites.'
    ],
    sections: [
      [
        'Convertir pour l’événement',
        'Indique sur une recette pour combien d’invités tu cuisines et Savour convertit chaque ingrédient. Un gazpacho pour 6 devient un gazpacho pour 120 : de 1 kg à 20 kg de tomates. Les grammes deviennent des kilos dès que c’est plus lisible, et la recette d’origine reste toujours telle quelle.',
        { ...buffet, alt: 'Bacs gastronormes avec légumes, viande et céréales pour un événement', caption: 'Des centaines de portions commencent par une recette juste.' },
        { shot: shots('fr').batch, alt: 'Un gazpacho dans Savour sur un téléphone, converti pour 120 personnes', caption: 'De 6 à 120 personnes : tout suit.' }
      ],
      [
        'Une liste MEP par événement',
        'Crée une liste MEP par événement ou par poste avec ce qui doit être prêt. Par carte, tu indiques les couverts, par exemple le cocktail dînatoire de 250 à côté du déjeuner de 40, et Savour calcule combien il te faut de chaque élément. Ton équipe coche en direct ; si le wifi coupe sur place, Savour s’en souvient et l’envoie dès que la connexion revient.',
        { ...pass, alt: 'Un cuisinier coche une liste MEP à côté des assiettes', caption: 'Ce qui est prêt, tu le coches ; le reste de l’équipe le voit aussitôt.' },
        {
          steps: [
            ['Ouvre Outils → Listes MEP', 'Crée une nouvelle liste ou copie celle du dernier événement.'],
            ['Cartes et éléments', 'Par carte, les intitulés et ce qui doit être prêt, avec la quantité par couvert.'],
            ['Indique les couverts', 'Savour calcule la quantité du jour pour chaque élément.'],
            ['Cocher ou imprimer', 'En direct sur le téléphone, ou sur un A4 pour le passe.']
          ]
        }
      ],
      [
        'Sur papier jusqu’au lieu de l’événement',
        'Sur place, une feuille de papier est souvent plus pratique qu’un téléphone. Imprime la liste MEP sur un A4, en portrait ou en paysage, avec des cases à cocher. La date et les couverts n’y figurent pas : tu utilises la même feuille à chaque événement.',
        { shot: shots('fr').a4, alt: 'Une liste MEP de Savour imprimée sur un A4', caption: 'Un A4, avec des cases, prêt pour le passe.' }
      ],
      [
        'Les allergènes par plat',
        'Lors d’un événement, quelqu’un demande toujours s’il y a des fruits à coque, du gluten ou du lactose. Savour cherche les allergènes de chaque ingrédient et les additionne par plat, y compris via tes propres fonds, sauces et pâtes. Les produits qui varient selon la marque sont signalés.',
        { warn: ['L’étiquette passe en premier', 'Savour ne dit jamais qu’un plat est sans allergènes tant que tout n’est pas vérifié. En cas de doute, vérifie l’étiquette de ton fournisseur.'] }
      ],
      [
        'Un livre de recettes pour tous tes cuisiniers',
        'Cuisiniers fixes, extras et un deuxième site travaillent avec les mêmes recettes. Crée une équipe de cuisine par cuisine ou par événement et invite tout le monde par e-mail. Consulter, imprimer et convertir fonctionne avec un compte gratuit ; qui ajoute ou modifie des recettes a besoin de Savour Pro. Avec un abonnement d’équipe pour 5, 10 ou 25 personnes (8,99 €, 14,99 € ou 29,99 € par mois), toute ta cuisine a Pro.'
      ],
      [
        'Tout reprendre, ou le faire faire',
        'Savour lit lui-même tes fichiers Word et PDF. Tu préfères qu’on le fasse pour toi ? Avec le [service d’importation](/fr/service-importation-recettes), les cuisiniers derrière Savour chargent tes recettes. Savour ne calcule pas encore de coût par plat ; c’est sur [Bientôt](/fr/bientot). Plus sur [Pour les traiteurs](/fr/pour-traiteurs).'
      ]
    ],
    outro: 'Cette explication décrit Savour tel qu’il est en ligne aujourd’hui. Il te manque quelque chose pour tes événements ? Dis-le dans la Communauté.'
  }
};
