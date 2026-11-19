// Voor-wiepagina "Cateraars en eventbedrijven" (2026-11-20), in vijf talen. tools/build-seo.mjs zet hem na
// Keukenbrigades. Alles klopt met de app: omrekenen (js/features/scale.js), MEP-lijsten met couverts per kaart, live
// afvinken, offline en printen op één A4 (js/features/mep.js), allergenen via basisrecepten (js/features/products.js),
// keukenteams, organisatieabonnementen 5/10/25 plekken (prijzen in js/features/pro.js; groter: op aanvraag) en de
// import service (tools/site-service.mjs). Schermen: gazpacho naar 120 personen (catering-batch) en de MEP-schermen.

const shot = (name, alt, title, text) => ({ shot: `/assets/app/${name}-{lang}.jpg`, alt, title, text });

export const CATERING_AUDIENCE = {
  nl: {
    slug: 'voor-cateraars',
    menu: 'Cateraars en events',
    short: 'Opschalen naar honderden gasten, MEP-lijsten per event en allergenen per gerecht.',
    title: 'Receptenapp voor cateraars en eventbedrijven | Savour',
    desc: 'Savour voor cateraars en eventbedrijven: recepten opschalen naar honderden gasten zonder rekenfouten, MEP-lijsten met couverts per kaart, live afvinken met je team, allergenen per gerecht en één receptenboek voor alle koks.',
    h1: 'Voor cateraars en eventbedrijven',
    lead: 'Vandaag 40 couverts à la carte, morgen een bruiloft van 250. Savour rekent je recepten om, zet je mise-en-place op een lijst en laat je hele team uit dezelfde recepten werken.',
    sections: [
      [
        'Opschalen zonder rekenfouten',
        'Vul in voor hoeveel gasten je kookt en Savour rekent elk ingrediënt om: van 6 personen naar 120 of naar 300. Gram wordt kilo zodra dat beter leest, en het originele recept blijft altijd staan. Geen rekenmachine en geen omrekentabel meer in de keuken.'
      ],
      [
        'Een MEP-lijst per event',
        'Zet per event of per post in een MEP-lijst wat er klaar moet staan, met per kaart het aantal couverts: het walking dinner van 250 naast de lunch van 40. Savour rekent per onderdeel uit hoeveel je nodig hebt. Je team vinkt live af, ook als de wifi wegvalt op locatie, en je print de lijst op één A4 voor de pass.'
      ],
      [
        'Allergenen per gerecht',
        'Op een event vraagt altijd iemand naar noten, gluten of lactose. Savour zoekt bij elk ingrediënt de allergenen op en telt ze per gerecht op, ook via je eigen fonds, sauzen en deeg. Merkproducten die per merk verschillen, zie je gemarkeerd. Allergenen horen bij Savour Pro.'
      ],
      [
        'Eén receptenboek voor al je koks',
        'Vaste koks, oproepkrachten en een tweede locatie werken uit dezelfde recepten. Maak een keukenteam per keuken of per event en nodig iedereen uit op het e-mailadres; meekijken, printen en omrekenen kan met een gratis account. Wat jij aanpast, ziet het hele team meteen.'
      ],
      [
        'Iedereen Pro met een organisatieabonnement',
        'Moet iedereen in je keuken recepten kunnen toevoegen en bewerken? Kies een abonnement voor 5, 10 of 25 personen (€8,99, €14,99 of €29,99 per maand). Groter, of meerdere vestigingen? Dan maken we een prijs op maat.'
      ],
      [
        'Geen tijd om alles over te zetten?',
        'Je Word-bestanden en PDF’s leest Savour zelf in. Liever dat het voor je gebeurt? Met de [import service](/recepten-laten-inladen) laden de koks achter Savour je recepten in en zetten ze de omgeving voor je klaar.'
      ]
    ]
  },
  en: {
    slug: 'en/for-caterers',
    menu: 'Caterers and events',
    short: 'Scaling to hundreds of guests, prep lists per event and allergens per dish.',
    title: 'Recipe app for caterers and event companies | Savour',
    desc: 'Savour for caterers and event companies: scale recipes to hundreds of guests without mistakes, prep lists with covers per menu, live tick-off with your team, allergens per dish and one recipe book for every cook.',
    h1: 'For caterers and event companies',
    lead: '40 covers à la carte today, a wedding of 250 tomorrow. Savour scales your recipes, puts your mise en place on a list and has your whole team working from the same recipes.',
    sections: [
      [
        'Scaling without mistakes',
        'Enter how many guests you are cooking for and Savour converts every ingredient: from 6 people to 120 or to 300. Grams become kilos as soon as that reads better, and the original recipe always stays as it is. No more calculator or conversion table in the kitchen.'
      ],
      [
        'A prep list per event',
        'Put what has to be ready in a prep list per event or per section, with the covers per menu: the walking dinner of 250 next to the lunch of 40. Savour works out how much you need of every item. Your team ticks off live, even when the wifi drops out on location, and you print the list on one A4 for the pass.'
      ],
      [
        'Allergens per dish',
        'At an event someone always asks about nuts, gluten or lactose. Savour looks up the allergens of every ingredient and adds them up per dish, also through your own stocks, sauces and doughs. Products that differ by brand are marked. Allergens are part of Savour Pro.'
      ],
      [
        'One recipe book for all your cooks',
        'Regular cooks, freelancers and a second location work from the same recipes. Create a kitchen team per kitchen or per event and invite everyone by email; viewing, printing and scaling work with a free account. What you change, the whole team sees straight away.'
      ],
      [
        'Everyone on Pro with an organisation plan',
        'Should everyone in your kitchen be able to add and edit recipes? Choose a plan for 5, 10 or 25 people (€8.99, €14.99 or €29.99 per month). Bigger, or several locations? Then we make a price to measure.'
      ],
      [
        'No time to bring everything over?',
        'Savour reads your Word files and PDFs itself. Rather have it done for you? With the [import service](/en/recipe-import-service) the cooks behind Savour load your recipes and set everything up for you.'
      ]
    ]
  },
  de: {
    slug: 'de/fuer-caterer',
    menu: 'Caterer und Events',
    short: 'Hochrechnen auf Hunderte Gäste, MEP-Listen pro Event und Allergene pro Gericht.',
    title: 'Rezept-App für Caterer und Eventbetriebe | Savour',
    desc: 'Savour für Caterer und Eventbetriebe: Rezepte ohne Rechenfehler auf Hunderte Gäste hochrechnen, MEP-Listen mit Gedecken pro Karte, live abhaken mit deinem Team, Allergene pro Gericht und ein Rezeptbuch für alle Köche.',
    h1: 'Für Caterer und Eventbetriebe',
    lead: 'Heute 40 Gedecke à la carte, morgen eine Hochzeit mit 250. Savour rechnet deine Rezepte um, setzt deine Mise en place auf eine Liste und lässt dein ganzes Team mit denselben Rezepten arbeiten.',
    sections: [
      [
        'Hochrechnen ohne Rechenfehler',
        'Trag ein, für wie viele Gäste du kochst, und Savour rechnet jede Zutat um: von 6 Personen auf 120 oder auf 300. Gramm wird zu Kilo, sobald das besser lesbar ist, und das Originalrezept bleibt immer, wie es ist. Kein Taschenrechner und keine Umrechnungstabelle mehr in der Küche.'
      ],
      [
        'Eine MEP-Liste pro Event',
        'Setz pro Event oder Posten auf eine MEP-Liste, was bereitstehen muss, mit den Gedecken pro Karte: das Walking Dinner mit 250 neben dem Lunch mit 40. Savour rechnet pro Posten aus, wie viel du brauchst. Dein Team hakt live ab, auch wenn vor Ort das WLAN ausfällt, und du druckst die Liste auf eine A4-Seite für den Pass.'
      ],
      [
        'Allergene pro Gericht',
        'Auf einem Event fragt immer jemand nach Nüssen, Gluten oder Laktose. Savour sucht die Allergene jeder Zutat heraus und zählt sie pro Gericht zusammen, auch über deine eigenen Fonds, Saucen und Teige. Produkte, die je Marke verschieden sind, werden markiert. Allergene gehören zu Savour Pro.'
      ],
      [
        'Ein Rezeptbuch für alle Köche',
        'Feste Köche, Aushilfen und ein zweiter Standort arbeiten mit denselben Rezepten. Leg ein Küchenteam pro Küche oder pro Event an und lade alle per E-Mail ein; ansehen, drucken und umrechnen geht mit einem kostenlosen Konto. Was du änderst, sieht das ganze Team sofort.'
      ],
      [
        'Alle mit Pro dank Organisations-Abo',
        'Sollen alle in deiner Küche Rezepte hinzufügen und bearbeiten können? Wähle ein Abo für 5, 10 oder 25 Personen (8,99 €, 14,99 € oder 29,99 € pro Monat). Größer oder mehrere Standorte? Dann machen wir einen Preis nach Maß.'
      ],
      [
        'Keine Zeit, alles zu übernehmen?',
        'Deine Word-Dateien und PDFs liest Savour selbst ein. Lieber machen lassen? Mit dem [Einpflege-Service](/de/rezepte-einpflegen-lassen) laden die Köche hinter Savour deine Rezepte und richten alles für dich ein.'
      ]
    ]
  },
  es: {
    slug: 'es/para-catering',
    menu: 'Catering y eventos',
    short: 'Escalar a cientos de invitados, listas MEP por evento y alérgenos por plato.',
    title: 'App de recetas para catering y empresas de eventos | Savour',
    desc: 'Savour para catering y empresas de eventos: escala recetas a cientos de invitados sin errores, listas MEP con cubiertos por carta, marcar en directo con tu equipo, alérgenos por plato y un recetario para todos los cocineros.',
    h1: 'Para catering y empresas de eventos',
    lead: 'Hoy 40 cubiertos a la carta, mañana una boda de 250. Savour calcula tus recetas, pone tu mise en place en una lista y hace que todo tu equipo trabaje con las mismas recetas.',
    sections: [
      [
        'Escalar sin errores',
        'Indica para cuántos invitados cocinas y Savour convierte cada ingrediente: de 6 personas a 120 o a 300. Los gramos pasan a kilos en cuanto se lee mejor, y la receta original siempre se queda como está. Se acabaron la calculadora y las tablas de conversión en la cocina.'
      ],
      [
        'Una lista MEP por evento',
        'Pon en una lista MEP por evento o por partida lo que debe estar listo, con los cubiertos por carta: la cena cóctel de 250 junto al almuerzo de 40. Savour calcula cuánto necesitas de cada elemento. Tu equipo marca en directo, aunque se caiga el wifi en el lugar, e imprimes la lista en un A4 para el pase.'
      ],
      [
        'Alérgenos por plato',
        'En un evento siempre alguien pregunta por frutos de cáscara, gluten o lactosa. Savour busca los alérgenos de cada ingrediente y los suma por plato, también a través de tus propios fondos, salsas y masas. Los productos que cambian según la marca aparecen marcados. Los alérgenos forman parte de Savour Pro.'
      ],
      [
        'Un recetario para todos tus cocineros',
        'Cocineros fijos, extras y un segundo local trabajan con las mismas recetas. Crea un equipo de cocina por cocina o por evento e invita a todos por correo; ver, imprimir y convertir funciona con una cuenta gratuita. Lo que cambias, todo el equipo lo ve al instante.'
      ],
      [
        'Todos con Pro gracias a una suscripción de organización',
        '¿Todos en tu cocina deben poder añadir y editar recetas? Elige una suscripción para 5, 10 o 25 personas (8,99 €, 14,99 € o 29,99 € al mes). ¿Más grande o varios locales? Entonces hacemos un precio a medida.'
      ],
      [
        '¿No tienes tiempo de pasarlo todo?',
        'Savour lee tus archivos Word y PDF. ¿Prefieres que lo hagan por ti? Con el [servicio de carga de recetas](/es/servicio-de-carga-de-recetas) los cocineros detrás de Savour cargan tus recetas y lo dejan todo preparado.'
      ]
    ]
  },
  fr: {
    slug: 'fr/pour-traiteurs',
    menu: 'Traiteurs et événements',
    short: 'Convertir pour des centaines d’invités, des listes MEP par événement et les allergènes par plat.',
    title: 'Appli de recettes pour traiteurs et événementiel | Savour',
    desc: 'Savour pour traiteurs et événementiel : convertir les recettes pour des centaines d’invités sans erreur, des listes MEP avec couverts par carte, cocher en direct avec ton équipe, les allergènes par plat et un livre de recettes pour tous les cuisiniers.',
    h1: 'Pour les traiteurs et l’événementiel',
    lead: 'Aujourd’hui 40 couverts à la carte, demain un mariage de 250. Savour convertit tes recettes, met ta mise en place sur une liste et fait travailler toute ton équipe avec les mêmes recettes.',
    sections: [
      [
        'Convertir sans erreur',
        'Indique pour combien d’invités tu cuisines et Savour convertit chaque ingrédient : de 6 personnes à 120 ou à 300. Les grammes deviennent des kilos dès que c’est plus lisible, et la recette d’origine reste toujours telle quelle. Fini la calculatrice et les tableaux de conversion en cuisine.'
      ],
      [
        'Une liste MEP par événement',
        'Mets dans une liste MEP par événement ou par poste ce qui doit être prêt, avec les couverts par carte : le cocktail dînatoire de 250 à côté du déjeuner de 40. Savour calcule combien il te faut de chaque élément. Ton équipe coche en direct, même si le wifi coupe sur place, et tu imprimes la liste sur un A4 pour le passe.'
      ],
      [
        'Les allergènes par plat',
        'Lors d’un événement, quelqu’un demande toujours s’il y a des fruits à coque, du gluten ou du lactose. Savour cherche les allergènes de chaque ingrédient et les additionne par plat, y compris via tes propres fonds, sauces et pâtes. Les produits qui varient selon la marque sont signalés. Les allergènes font partie de Savour Pro.'
      ],
      [
        'Un livre de recettes pour tous tes cuisiniers',
        'Cuisiniers fixes, extras et un deuxième site travaillent avec les mêmes recettes. Crée une équipe de cuisine par cuisine ou par événement et invite tout le monde par e-mail ; consulter, imprimer et convertir fonctionne avec un compte gratuit. Ce que tu modifies, toute l’équipe le voit aussitôt.'
      ],
      [
        'Tout le monde en Pro avec un abonnement organisation',
        'Tout le monde dans ta cuisine doit pouvoir ajouter et modifier des recettes ? Choisis un abonnement pour 5, 10 ou 25 personnes (8,99 €, 14,99 € ou 29,99 € par mois). Plus grand, ou plusieurs sites ? Alors nous faisons un prix sur mesure.'
      ],
      [
        'Pas le temps de tout reprendre ?',
        'Savour lit lui-même tes fichiers Word et PDF. Tu préfères qu’on le fasse pour toi ? Avec le [service d’importation](/fr/service-importation-recettes), les cuisiniers derrière Savour chargent tes recettes et préparent tout pour toi.'
      ]
    ]
  }
};

export const CATERING_RICH = {
  nl: {
    benefits: [
      ['Op elk aantal gasten', 'Van 6 naar 120 of 300, zonder rekenfouten.'],
      ['MEP per event', 'Couverts per kaart, live afvinken, één A4.'],
      ['Eén receptenboek', 'Voor vaste koks, oproepkrachten en locaties.']
    ],
    showcase: [
      shot('catering-batch', 'Gazpacho in Savour op de telefoon, omgerekend naar 120 personen', 'Van 6 naar 120 personen', 'Kies de opbrengst en alles rekent mee: 20 kg trostomaten, 20 komkommers. Het originele recept blijft staan. [Probeer het in de demo](@demo).'),
      shot('mep-bureau', 'Een MEP-lijst in Savour met à la carte en banqueting naast elkaar', 'Elke kaart zijn eigen couverts', 'Het event en de vaste kaart naast elkaar, elk met hun eigen aantal gasten. Afvinken, printen en de kookmodus staan bovenin.')
    ],
    faq: [
      ['Werkt het op locatie zonder internet?', 'Afvinken op een MEP-lijst wel: Savour onthoudt het en stuurt het zodra er weer verbinding is. Recepten die je eerder opende, lees je ook offline.'],
      ['Moeten oproepkrachten betalen?', 'Nee. Meekijken, printen en omrekenen in een keukenteam is gratis. Wie recepten toevoegt of bewerkt, heeft Savour Pro nodig, of je neemt een organisatieabonnement.'],
      ['Kan Savour ook kostprijzen berekenen?', 'Nog niet. Een foodcost calculator staat op [Binnenkort](/binnenkort).']
    ]
  },
  en: {
    benefits: [
      ['Any number of guests', 'From 6 to 120 or 300, without mistakes.'],
      ['Prep per event', 'Covers per menu, live tick-off, one A4.'],
      ['One recipe book', 'For regular cooks, freelancers and locations.']
    ],
    showcase: [
      shot('catering-batch', 'Gazpacho in Savour on a phone, scaled to 120 people', 'From 6 to 120 people', 'Choose the yield and everything follows: 20 kg of tomatoes, 20 cucumbers. The original recipe stays as it is. [Try it in the demo](@demo).'),
      shot('mep-bureau', 'A prep list in Savour with à la carte and banqueting side by side', 'Every menu its own covers', 'The event and the regular menu side by side, each with its own number of guests. Tick-off, printing and cook mode are at the top.')
    ],
    faq: [
      ['Does it work on location without internet?', 'Ticking off on a prep list does: Savour remembers it and sends it as soon as there is a connection again. Recipes you opened before can be read offline too.'],
      ['Do freelancers have to pay?', 'No. Viewing, printing and scaling in a kitchen team is free. Whoever adds or edits recipes needs Savour Pro, or you take an organisation plan.'],
      ['Can Savour calculate costs?', 'Not yet. A food cost calculator is on [Coming soon](/en/roadmap).']
    ]
  },
  de: {
    benefits: [
      ['Für jede Gästezahl', 'Von 6 auf 120 oder 300, ohne Rechenfehler.'],
      ['MEP pro Event', 'Gedecke pro Karte, live abhaken, eine A4-Seite.'],
      ['Ein Rezeptbuch', 'Für feste Köche, Aushilfen und Standorte.']
    ],
    showcase: [
      shot('catering-batch', 'Gazpacho in Savour auf dem Handy, umgerechnet auf 120 Personen', 'Von 6 auf 120 Personen', 'Wähle die Menge und alles rechnet mit, von 1 kg auf 20 kg Tomaten. Das Originalrezept bleibt, wie es ist. [Probier es in der Demo](@demo).'),
      shot('mep-bureau', 'Eine MEP-Liste in Savour mit à la carte und Bankett nebeneinander', 'Jede Karte mit eigenen Gedecken', 'Das Event und die feste Karte nebeneinander, jede mit ihrer eigenen Gästezahl. Abhaken, Drucken und Kochmodus stehen oben.')
    ],
    faq: [
      ['Funktioniert es vor Ort ohne Internet?', 'Abhaken auf einer MEP-Liste schon: Savour merkt es sich und schickt es, sobald wieder eine Verbindung da ist. Rezepte, die du vorher geöffnet hast, liest du auch offline.'],
      ['Müssen Aushilfen bezahlen?', 'Nein. Ansehen, Drucken und Umrechnen in einem Küchenteam ist kostenlos. Wer Rezepte hinzufügt oder bearbeitet, braucht Savour Pro, oder du nimmst ein Organisations-Abo.'],
      ['Kann Savour Kosten berechnen?', 'Noch nicht. Ein Foodcost-Rechner steht unter [Demnächst](/de/demnaechst).']
    ]
  },
  es: {
    benefits: [
      ['Para cualquier número de invitados', 'De 6 a 120 o 300, sin errores.'],
      ['MEP por evento', 'Cubiertos por carta, marcar en directo, un A4.'],
      ['Un recetario', 'Para cocineros fijos, extras y locales.']
    ],
    showcase: [
      shot('catering-batch', 'Gazpacho en Savour en el móvil, escalado a 120 personas', 'De 6 a 120 personas', 'Elige el rendimiento y todo se recalcula: de 1 kg a 20 kg de tomates. La receta original se queda como está. [Pruébalo en la demo](@demo).'),
      shot('mep-bureau', 'Una lista MEP en Savour con à la carte y banquetes uno al lado del otro', 'Cada carta con sus cubiertos', 'El evento y la carta fija uno al lado del otro, cada uno con su número de invitados. Marcar, imprimir y el modo cocina están arriba.')
    ],
    faq: [
      ['¿Funciona en el lugar sin internet?', 'Marcar en una lista MEP sí: Savour lo recuerda y lo envía en cuanto vuelve la conexión. Las recetas que abriste antes también se leen sin conexión.'],
      ['¿Tienen que pagar los extras?', 'No. Ver, imprimir y convertir en un equipo de cocina es gratis. Quien añade o edita recetas necesita Savour Pro, o eliges una suscripción de organización.'],
      ['¿Savour calcula costes?', 'Todavía no. Una calculadora de food cost está en [Próximamente](/es/proximamente).']
    ]
  },
  fr: {
    benefits: [
      ['Pour tout nombre d’invités', 'De 6 à 120 ou 300, sans erreur.'],
      ['MEP par événement', 'Couverts par carte, cocher en direct, un A4.'],
      ['Un livre de recettes', 'Pour cuisiniers fixes, extras et sites.']
    ],
    showcase: [
      shot('catering-batch', 'Un gazpacho dans Savour sur un téléphone, converti pour 120 personnes', 'De 6 à 120 personnes', 'Choisis le rendement et tout suit : de 1 kg à 20 kg de tomates. La recette d’origine reste telle quelle. [Essaie-le dans la démo](@demo).'),
      shot('mep-bureau', 'Une liste MEP dans Savour avec à la carte et banquet côte à côte', 'Chaque carte ses couverts', 'L’événement et la carte habituelle côte à côte, chacun avec son nombre d’invités. Cocher, imprimer et le mode cuisine sont en haut.')
    ],
    faq: [
      ['Ça marche sur place sans internet ?', 'Cocher sur une liste MEP, oui : Savour s’en souvient et l’envoie dès que la connexion revient. Les recettes ouvertes auparavant se lisent aussi hors ligne.'],
      ['Les extras doivent-ils payer ?', 'Non. Consulter, imprimer et convertir dans une équipe de cuisine est gratuit. Qui ajoute ou modifie des recettes a besoin de Savour Pro, ou tu prends un abonnement organisation.'],
      ['Savour calcule-t-il les coûts ?', 'Pas encore. Un calculateur de food cost figure sur la [Bientôt](/fr/bientot).']
    ]
  }
};
