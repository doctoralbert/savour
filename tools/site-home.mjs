// Nieuwe opbouw van de startpagina (2026-11-17, na de test als nieuwe bezoeker): korter, met de prijzen als kaarten,
// het keukenteam in drie regels, een blok "Je recepten blijven van jou" en zes vragen die een kok echt stelt.
// Gebruikt door homeBody in tools/build-seo.mjs. De oude, langere vragen staan op de pagina Veelgestelde vragen.
// Prijzen en regels moeten gelijk blijven aan js/features/pro.js (19% = €29 tegenover 12 × €2,99).

export const HOME_NEXT = {
  nl: {
    lead: 'Savour is de receptenapp voor de professionele keuken. Je Word-bestanden, PDF’s en kladjes worden één geordend receptenboek, voor jou en je hele brigade.',
    kladjeMore: 'Bekijk het hele recept in de demo',
    teamTitle: 'Samen koken met je keukenteam',
    team: [
      ['Jij beheert', 'Maak een keukenteam en nodig je brigade uit op hun e-mailadres.'],
      ['Sous-chefs werken mee', 'Met Savour Pro voegen ze recepten toe en passen ze aan.'],
      ['De rest kijkt gratis mee', 'Bekijken, printen en omrekenen kan met een gratis account, op elke telefoon.']
    ],
    priceTitle: 'Wat het kost',
    plans: [
      {
        name: 'Gratis',
        price: '€0',
        per: '',
        note: 'Altijd gratis',
        points: ['Tot 100 recepten', 'Savour-lezer voor Word, PDF en tekst', 'Meekijken in een keukenteam', 'Back-up van al je recepten']
      },
      {
        name: 'Savour Pro',
        price: '€2,99',
        per: 'per maand',
        note: 'of €29 per jaar: 19% goedkoper',
        featured: true,
        points: ['Onbeperkt recepten', 'AI leest foto’s en kladjes', 'De 14 allergenen per recept', 'Je eigen keukenteams', 'MEP-lijsten per post', 'Printen met je logo']
      },
      {
        name: 'Teamabonnement',
        price: '€8,99',
        per: 'per maand',
        note: 'voor 5 personen; ook 10 of 25',
        points: ['Iedereen in je keuken Pro', 'Vanaf €1,20 per persoon', 'Plekken altijd aan iemand anders te geven']
      }
    ],
    priceFoot: 'Nieuw bij Savour? Je krijgt 7 dagen Savour Pro gratis, zonder betaalgegevens.',
    priceLink: 'Alle prijzen en verschillen',
    trustTitle: 'Je recepten blijven van jou',
    trust: [
      ['Savour verzint niets', 'De lezer en de AI nemen alleen over wat er staat. Twijfelt Savour, dan kijk jij het na.'],
      ['Altijd een back-up', 'Download al je recepten en mappen wanneer je wilt, ook zonder Pro.'],
      ['Stoppen kost niets', 'Stop je met Pro, dan blijft alles staan. Alleen toevoegen boven de 100 recepten kan dan niet.'],
      ['Ook zonder internet', 'Open Savour één keer online; daarna lees je je recepten ook in de koelcel.']
    ],
    faq: [
      ['Wat kost Savour?', 'Tot 100 recepten is gratis. Savour Pro kost €2,99 per maand of €29 per jaar. Nieuwe accounts krijgen 7 dagen Pro gratis, zonder betaalgegevens.'],
      ['Kan ik mijn recepten uit Word, PDF of van kladjes overzetten?', 'Ja. De Savour-lezer leest Word, PDF en tekst gratis, ook bestanden met honderden recepten. Foto’s en handgeschreven kladjes leest de AI met Savour Pro. Je controleert elk recept voordat het wordt opgeslagen.'],
      ['Moet mijn hele team betalen?', 'Nee. Meekijken, printen en omrekenen in een keukenteam is gratis. Wie recepten toevoegt of aanpast heeft Savour Pro nodig, of je neemt een teamabonnement voor de hele keuken.'],
      ['Zijn mijn recepten van mij?', 'Ja. Je recepten zijn afgeschermd per account en alleen zichtbaar voor jou en wie je uitnodigt. Een back-up download je wanneer je wilt.'],
      ['Wat gebeurt er als ik stop met Pro?', 'Alles blijft staan. Je kunt alleen geen nieuwe recepten toevoegen boven de 100, en een keukenteam van jou staat op slot tot je weer Pro hebt.'],
      ['Werkt Savour op de telefoon in de keuken?', 'Ja, op elke telefoon, tablet en computer, ook offline. In de kookmodus zie je het recept groot en blijft je scherm aan.'],
      ["Werkt Savour ook voor patisserie, catering of de bar?", "Ja. Er zijn eigen pagina’s voor [patissiers en banketbakkers](/voor-patissiers-en-banketbakkers), [cateraars](/voor-cateraars) en [bartenders en barista’s](/voor-bartenders): omrekenen op stuks of gasten, MEP-lijsten per event en allergenen per gebak of drank."]
    ]
  },
  en: {
    lead: 'Savour is the recipe app for professional kitchens. Your Word files, PDFs and handwritten notes become one organised recipe book, for you and your whole brigade.',
    kladjeMore: 'See the whole recipe in the demo',
    teamTitle: 'Cook together with your kitchen team',
    team: [
      ['You manage', 'Create a kitchen team and invite your brigade by email.'],
      ['Sous-chefs help out', 'With Savour Pro they add and edit recipes.'],
      ['Everyone else views for free', 'Viewing, printing and scaling work with a free account, on every phone.']
    ],
    priceTitle: 'What it costs',
    plans: [
      {
        name: 'Free',
        price: '€0',
        per: '',
        note: 'Free forever',
        points: ['Up to 100 recipes', 'Savour reader for Word, PDF and text', 'View recipes in a kitchen team', 'Backup of all your recipes']
      },
      {
        name: 'Savour Pro',
        price: '€2.99',
        per: 'per month',
        note: 'or €29 per year: 19% cheaper',
        featured: true,
        points: ['Unlimited recipes', 'AI reads photos and handwritten notes', 'The 14 allergens per recipe', 'Your own kitchen teams', 'Prep lists per section', 'Print with your logo']
      },
      {
        name: 'Team plan',
        price: '€8.99',
        per: 'per month',
        note: 'for 5 people; also 10 or 25',
        points: ['Pro for everyone in your kitchen', 'From €1.20 per person', 'Give a seat to someone else at any time']
      }
    ],
    priceFoot: 'New to Savour? You get 7 days of Savour Pro free, no payment details needed.',
    priceLink: 'All prices and differences',
    trustTitle: 'Your recipes stay yours',
    trust: [
      ['Savour invents nothing', 'The reader and the AI only take over what is there. When Savour is unsure, you check it.'],
      ['Always a backup', 'Download all your recipes and folders whenever you like, even without Pro.'],
      ['Stopping costs nothing', 'If you stop Pro, everything stays. Only adding beyond 100 recipes is no longer possible.'],
      ['Works without internet', 'Open Savour online once; after that you can read your recipes in the walk-in fridge too.']
    ],
    faq: [
      ['What does Savour cost?', 'Up to 100 recipes is free. Savour Pro costs €2.99 per month or €29 per year. New accounts get 7 days of Pro free, no payment details needed.'],
      ['Can I bring my recipes from Word, PDF or handwritten notes?', 'Yes. The Savour reader reads Word, PDF and text for free, even files with hundreds of recipes. Photos and handwritten notes are read by the AI with Savour Pro. You check every recipe before it is saved.'],
      ['Does my whole team have to pay?', 'No. Viewing, printing and scaling in a kitchen team is free. Whoever adds or edits recipes needs Savour Pro, or you take a team plan for the whole kitchen.'],
      ['Are my recipes mine?', 'Yes. Your recipes are protected per account and only visible to you and the people you invite. You can download a backup whenever you like.'],
      ['What happens if I stop Pro?', 'Everything stays. You just cannot add new recipes beyond 100, and a kitchen team of yours is locked until you have Pro again.'],
      ['Does Savour work on a phone in the kitchen?', 'Yes, on every phone, tablet and computer, offline too. In cooking mode you see the recipe large and your screen stays on.'],
      ["Does Savour work for pastry, catering or the bar?", "Yes. There are pages for [pastry chefs and bakers](/en/for-pastry-chefs-and-bakers), [caterers](/en/for-caterers) and [bartenders and baristas](/en/for-bartenders): scaling by pieces or guests, prep lists per event and allergens per pastry or drink."]
    ]
  },
  de: {
    lead: 'Savour ist die Rezept-App für die Profiküche. Deine Word-Dateien, PDFs und handschriftlichen Notizen werden ein geordnetes Rezeptbuch, für dich und deine ganze Brigade.',
    kladjeMore: 'Das ganze Rezept in der Demo ansehen',
    teamTitle: 'Gemeinsam kochen mit deinem Küchenteam',
    team: [
      ['Du verwaltest', 'Erstelle ein Küchenteam und lade deine Brigade per E-Mail ein.'],
      ['Sous-Chefs arbeiten mit', 'Mit Savour Pro fügen sie Rezepte hinzu und bearbeiten sie.'],
      ['Alle anderen schauen kostenlos zu', 'Ansehen, drucken und umrechnen geht mit einem kostenlosen Konto, auf jedem Handy.']
    ],
    priceTitle: 'Was es kostet',
    plans: [
      {
        name: 'Kostenlos',
        price: '0 €',
        per: '',
        note: 'Für immer kostenlos',
        points: ['Bis zu 100 Rezepte', 'Savour-Leser für Word, PDF und Text', 'Rezepte im Küchenteam ansehen', 'Backup aller Rezepte']
      },
      {
        name: 'Savour Pro',
        price: '2,99 €',
        per: 'pro Monat',
        note: 'oder 29 € pro Jahr: 19 % günstiger',
        featured: true,
        points: ['Unbegrenzt Rezepte', 'KI liest Fotos und Notizen', 'Die 14 Allergene pro Rezept', 'Eigene Küchenteams', 'MEP-Listen pro Posten', 'Drucken mit deinem Logo']
      },
      {
        name: 'Team-Abo',
        price: '8,99 €',
        per: 'pro Monat',
        note: 'für 5 Personen; auch 10 oder 25',
        points: ['Pro für alle in deiner Küche', 'Ab 1,20 € pro Person', 'Plätze jederzeit neu vergeben']
      }
    ],
    priceFoot: 'Neu bei Savour? Du bekommst 7 Tage Savour Pro kostenlos, ohne Zahlungsdaten.',
    priceLink: 'Alle Preise und Unterschiede',
    trustTitle: 'Deine Rezepte bleiben deine',
    trust: [
      ['Savour erfindet nichts', 'Der Leser und die KI übernehmen nur, was dasteht. Ist Savour unsicher, prüfst du es.'],
      ['Immer ein Backup', 'Lade alle Rezepte und Ordner herunter, wann du willst, auch ohne Pro.'],
      ['Aufhören kostet nichts', 'Beendest du Pro, bleibt alles erhalten. Nur über 100 Rezepte hinaus hinzufügen geht dann nicht mehr.'],
      ['Auch ohne Internet', 'Öffne Savour einmal online; danach liest du deine Rezepte auch im Kühlhaus.']
    ],
    faq: [
      ['Was kostet Savour?', 'Bis zu 100 Rezepte sind kostenlos. Savour Pro kostet 2,99 € pro Monat oder 29 € pro Jahr. Neue Konten bekommen 7 Tage Pro kostenlos, ohne Zahlungsdaten.'],
      ['Kann ich meine Rezepte aus Word, PDF oder Notizen übernehmen?', 'Ja. Der Savour-Leser liest Word, PDF und Text kostenlos, auch Dateien mit Hunderten Rezepten. Fotos und handschriftliche Notizen liest die KI mit Savour Pro. Du prüfst jedes Rezept, bevor es gespeichert wird.'],
      ['Muss mein ganzes Team bezahlen?', 'Nein. Ansehen, drucken und umrechnen im Küchenteam ist kostenlos. Wer Rezepte hinzufügt oder bearbeitet, braucht Savour Pro, oder du nimmst ein Team-Abo für die ganze Küche.'],
      ['Gehören meine Rezepte mir?', 'Ja. Deine Rezepte sind pro Konto geschützt und nur für dich und die Personen sichtbar, die du einlädst. Ein Backup lädst du herunter, wann du willst.'],
      ['Was passiert, wenn ich Pro beende?', 'Alles bleibt erhalten. Du kannst nur keine neuen Rezepte über 100 hinzufügen, und dein Küchenteam ist gesperrt, bis du wieder Pro hast.'],
      ['Funktioniert Savour auf dem Handy in der Küche?', 'Ja, auf jedem Handy, Tablet und Computer, auch offline. Im Kochmodus siehst du das Rezept groß und dein Bildschirm bleibt an.'],
      ["Funktioniert Savour auch für Patisserie, Catering oder die Bar?", "Ja. Es gibt eigene Seiten für [Patissiers und Konditoren](/de/fuer-patissiers-und-konditoren), [Caterer](/de/fuer-caterer) und [Bartender und Baristas](/de/fuer-bartender): Umrechnen nach Stück oder Gästen, MEP-Listen pro Event und Allergene pro Gebäck oder Drink."]
    ]
  },
  es: {
    lead: 'Savour es la app de recetas para cocinas profesionales. Tus archivos de Word, PDF y notas a mano se convierten en un recetario ordenado, para ti y toda tu brigada.',
    kladjeMore: 'Ver la receta completa en la demo',
    teamTitle: 'Cocina junto a tu equipo de cocina',
    team: [
      ['Tú gestionas', 'Crea un equipo de cocina e invita a tu brigada por correo.'],
      ['Los sous-chefs colaboran', 'Con Savour Pro añaden y editan recetas.'],
      ['El resto lo ve gratis', 'Ver, imprimir y escalar funciona con una cuenta gratuita, en cualquier móvil.']
    ],
    priceTitle: 'Lo que cuesta',
    plans: [
      {
        name: 'Gratis',
        price: '0 €',
        per: '',
        note: 'Siempre gratis',
        points: ['Hasta 100 recetas', 'Lector de Savour para Word, PDF y texto', 'Ver recetas en un equipo de cocina', 'Copia de seguridad de todas tus recetas']
      },
      {
        name: 'Savour Pro',
        price: '2,99 €',
        per: 'al mes',
        note: 'o 29 € al año: un 19 % más barato',
        featured: true,
        points: ['Recetas ilimitadas', 'La IA lee fotos y notas a mano', 'Los 14 alérgenos por receta', 'Tus propios equipos de cocina', 'Listas MEP por partida', 'Imprimir con tu logo']
      },
      {
        name: 'Plan de equipo',
        price: '8,99 €',
        per: 'al mes',
        note: 'para 5 personas; también 10 o 25',
        points: ['Pro para todos en tu cocina', 'Desde 1,20 € por persona', 'Cede una plaza cuando quieras']
      }
    ],
    priceFoot: '¿Nuevo en Savour? Tienes 7 días de Savour Pro gratis, sin datos de pago.',
    priceLink: 'Todos los precios y diferencias',
    trustTitle: 'Tus recetas siguen siendo tuyas',
    trust: [
      ['Savour no inventa nada', 'El lector y la IA solo copian lo que está escrito. Si Savour duda, lo revisas tú.'],
      ['Siempre una copia de seguridad', 'Descarga todas tus recetas y carpetas cuando quieras, también sin Pro.'],
      ['Dejarlo no cuesta nada', 'Si dejas Pro, todo se queda. Solo no puedes añadir más allá de 100 recetas.'],
      ['También sin internet', 'Abre Savour una vez con conexión; después lees tus recetas también en la cámara.']
    ],
    faq: [
      ['¿Cuánto cuesta Savour?', 'Hasta 100 recetas es gratis. Savour Pro cuesta 2,99 € al mes o 29 € al año. Las cuentas nuevas tienen 7 días de Pro gratis, sin datos de pago.'],
      ['¿Puedo pasar mis recetas desde Word, PDF o notas a mano?', 'Sí. El lector de Savour lee Word, PDF y texto gratis, también archivos con cientos de recetas. Las fotos y notas a mano las lee la IA con Savour Pro. Revisas cada receta antes de guardarla.'],
      ['¿Tiene que pagar todo mi equipo?', 'No. Ver, imprimir y escalar en un equipo de cocina es gratis. Quien añade o edita recetas necesita Savour Pro, o tomas un plan de equipo para toda la cocina.'],
      ['¿Mis recetas son mías?', 'Sí. Tus recetas están protegidas por cuenta y solo las ves tú y quien invites. Descargas una copia de seguridad cuando quieras.'],
      ['¿Qué pasa si dejo Pro?', 'Todo se queda. Solo no puedes añadir recetas nuevas más allá de 100, y tu equipo de cocina queda bloqueado hasta que vuelvas a tener Pro.'],
      ['¿Funciona Savour en el móvil en la cocina?', 'Sí, en cualquier móvil, tablet y ordenador, también sin conexión. En el modo cocina ves la receta en grande y la pantalla no se apaga.'],
      ["¿Sirve Savour para pastelería, catering o la barra?", "Sí. Hay páginas propias para [pasteleros y reposteros](/es/para-pasteleros-y-reposteros), [catering](/es/para-catering) y [bartenders y baristas](/es/para-bartenders): escalar por unidades o invitados, listas MEP por evento y alérgenos por pastel o bebida."]
    ]
  },
  fr: {
    lead: 'Savour est l’application de recettes pour la cuisine professionnelle. Tes fichiers Word, PDF et notes manuscrites deviennent un livre de recettes bien rangé, pour toi et toute ta brigade.',
    kladjeMore: 'Voir la recette complète dans la démo',
    teamTitle: 'Cuisiner ensemble avec ton équipe',
    team: [
      ['Tu gères', 'Crée une équipe de cuisine et invite ta brigade par e-mail.'],
      ['Les sous-chefs participent', 'Avec Savour Pro, ils ajoutent et modifient des recettes.'],
      ['Les autres consultent gratuitement', 'Consulter, imprimer et convertir fonctionne avec un compte gratuit, sur chaque téléphone.']
    ],
    priceTitle: 'Ce que ça coûte',
    plans: [
      {
        name: 'Gratuit',
        price: '0 €',
        per: '',
        note: 'Toujours gratuit',
        points: ['Jusqu’à 100 recettes', 'Lecteur Savour pour Word, PDF et texte', 'Consulter les recettes d’une équipe', 'Sauvegarde de toutes tes recettes']
      },
      {
        name: 'Savour Pro',
        price: '2,99 €',
        per: 'par mois',
        note: 'ou 29 € par an : 19 % moins cher',
        featured: true,
        points: ['Recettes illimitées', 'L’IA lit photos et notes manuscrites', 'Les 14 allergènes par recette', 'Tes propres équipes de cuisine', 'Listes MEP par poste', 'Imprimer avec ton logo']
      },
      {
        name: 'Abonnement équipe',
        price: '8,99 €',
        per: 'par mois',
        note: 'pour 5 personnes ; aussi 10 ou 25',
        points: ['Pro pour toute ta cuisine', 'Dès 1,20 € par personne', 'Une place se donne à quelqu’un d’autre à tout moment']
      }
    ],
    priceFoot: 'Nouveau sur Savour ? Tu as 7 jours de Savour Pro gratuits, sans données de paiement.',
    priceLink: 'Tous les prix et différences',
    trustTitle: 'Tes recettes restent à toi',
    trust: [
      ['Savour n’invente rien', 'Le lecteur et l’IA ne reprennent que ce qui est écrit. Si Savour doute, c’est toi qui vérifies.'],
      ['Toujours une sauvegarde', 'Télécharge toutes tes recettes et dossiers quand tu veux, même sans Pro.'],
      ['Arrêter ne coûte rien', 'Si tu arrêtes Pro, tout reste. Seul l’ajout au-delà de 100 recettes n’est plus possible.'],
      ['Même sans internet', 'Ouvre Savour une fois en ligne ; ensuite tu lis tes recettes même dans la chambre froide.']
    ],
    faq: [
      ['Combien coûte Savour ?', 'Jusqu’à 100 recettes, c’est gratuit. Savour Pro coûte 2,99 € par mois ou 29 € par an. Les nouveaux comptes ont 7 jours de Pro gratuits, sans données de paiement.'],
      ['Puis-je reprendre mes recettes depuis Word, PDF ou des notes ?', 'Oui. Le lecteur Savour lit Word, PDF et texte gratuitement, même des fichiers de centaines de recettes. Les photos et notes manuscrites sont lues par l’IA avec Savour Pro. Tu vérifies chaque recette avant qu’elle soit enregistrée.'],
      ['Toute mon équipe doit-elle payer ?', 'Non. Consulter, imprimer et convertir dans une équipe de cuisine est gratuit. Qui ajoute ou modifie des recettes a besoin de Savour Pro, ou tu prends un abonnement équipe pour toute la cuisine.'],
      ['Mes recettes sont-elles à moi ?', 'Oui. Tes recettes sont protégées par compte et visibles seulement par toi et les personnes que tu invites. Tu télécharges une sauvegarde quand tu veux.'],
      ['Que se passe-t-il si j’arrête Pro ?', 'Tout reste. Tu ne peux simplement plus ajouter de recettes au-delà de 100, et ton équipe de cuisine est verrouillée jusqu’à ce que tu aies de nouveau Pro.'],
      ['Savour fonctionne-t-il sur le téléphone en cuisine ?', 'Oui, sur chaque téléphone, tablette et ordinateur, même hors ligne. En mode cuisine, tu vois la recette en grand et ton écran reste allumé.'],
      ["Savour convient-il à la pâtisserie, au traiteur ou au bar ?", "Oui. Il existe des pages pour les [pâtissiers et boulangers](/fr/pour-patissiers-et-boulangers), les [traiteurs](/fr/pour-traiteurs) et les [bartenders et baristas](/fr/pour-bartenders) : conversion à la pièce ou par invités, listes MEP par événement et allergènes par pâtisserie ou boisson."]
    ]
  }
};
