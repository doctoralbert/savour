// Handleiding, onderdeel "Aan de slag". Links in de tekst: [tekst](#pagina-id) of [tekst](/pad).

export const group = {
  id: 'aan-de-slag',
  nl: {
    name: 'Aan de slag',
    intro: 'Een account maken, inloggen, Savour als app op je telefoon zetten en je weg vinden in de schermen.'
  },
  en: {
    name: 'Getting started',
    intro: 'Create an account, log in, put Savour on your phone as an app and find your way around the screens.'
  }
};

export const pages = [
  {
    id: 'aan-de-slag',
    related: ['account-maken', 'importeren', 'eerste-week'],
    nl: {
      slug: 'handleiding-aan-de-slag',
      menu: 'Aan de slag met Savour',
      title: 'Aan de slag met Savour: de receptenapp voor koks | Handleiding',
      desc: 'Beginnen met Savour: wat de receptenapp voor professionele keukens doet, een account maken, je eerste recepten importeren en Savour op je telefoon zetten.',
      lead: 'Wat Savour is, voor wie het is en de eerste stappen naar je eigen digitale receptenboek.',
      sections: [
        [
          'Wat is Savour',
          'Savour is een receptenapp voor de professionele keuken. Je zet al je recepturen op één plek: uit Word, PDF, foto’s van kladjes, websites en andere recepten-apps. Daarna orden je ze in mappen en categorieën, reken je ze om naar elke opbrengst, print je ze voor de map aan de pass en deel je ze met je brigade in een keukenteam.'
        ],
        [
          'Voor wie',
          'Voor chefs, sous-chefs, patissiers, cateraars en koksopleidingen: iedereen die recepturen moet bewaren, delen en snel terugvinden. Thuiskoks kunnen Savour ook gebruiken, maar de app is gemaakt voor het werk in een keuken: grote hoeveelheden, vaste recepturen en een team dat met dezelfde versie werkt. Meer over de doelgroep lees je bij [Voor koks](/voor-koks) en [Voor keukenbrigades](/voor-keukenbrigades).'
        ],
        [
          'In vier stappen beginnen',
          'Zo heb je binnen een kwartier je eerste recepten in Savour:',
          [
            '[Maak een account](#account-maken), of kijk eerst rond in de [demo](#demo) zonder account.',
            '[Importeer je recepten](#importeren): een Word-bestand of PDF met al je recepten is genoeg om te beginnen.',
            '[Controleer wat er is gelezen](#import-controleren) en sla op.',
            '[Zet Savour als app op je telefoon](#app-installeren), zodat je recepten in de keuken altijd bij de hand zijn.'
          ]
        ],
        [
          'Gratis of Savour Pro',
          'Een gratis account bewaart tot 100 recepten en leest Word, PDF en tekst in. Met [Savour Pro](#gratis-en-pro) bewaar je onbeperkt recepten, leest de AI foto’s van handgeschreven kladjes, maak je keukenteams en print je met het logo van je restaurant. Nieuwe accounts krijgen 7 dagen Pro gratis.'
        ],
        [
          'Op elk apparaat',
          'Savour werkt in de browser op computer, tablet en telefoon. Importeren, ordenen en printen gaat het fijnst op een computer; raadplegen in de keuken op een telefoon of tablet. Je recepten staan in de cloud: op een nieuw apparaat log je in en alles staat er weer.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-getting-started',
      menu: 'Getting started with Savour',
      title: 'Getting started with Savour, the recipe app for chefs | User guide',
      desc: 'Start with Savour: what the recipe app for professional kitchens does, how to create an account, import your first recipes and put Savour on your phone.',
      lead: 'What Savour is, who it is for and the first steps to your own digital recipe book.',
      sections: [
        [
          'What is Savour',
          'Savour is a recipe app for professional kitchens. You bring all your recipes together in one place: from Word, PDF, photos of handwritten notes, websites and other recipe apps. Then you organise them in folders and categories, scale them to any yield, print them for the binder at the pass and share them with your brigade in a kitchen team.'
        ],
        [
          'Who it is for',
          'For head chefs, sous-chefs, pastry chefs, caterers and culinary schools: anyone who needs to keep, share and quickly find recipes. Home cooks can use Savour too, but the app is built for kitchen work: large quantities, standard recipes and a team working from the same version. Read more at [For chefs](/en/for-chefs) and [For kitchen brigades](/en/for-kitchen-brigades).'
        ],
        [
          'Start in four steps',
          'This gets your first recipes into Savour within fifteen minutes:',
          [
            '[Create an account](#account-maken), or look around the [demo](#demo) first without an account.',
            '[Import your recipes](#importeren): one Word file or PDF with all your recipes is enough to start.',
            '[Check what was read](#import-controleren) and save.',
            '[Put Savour on your phone as an app](#app-installeren), so your recipes are always at hand in the kitchen.'
          ]
        ],
        [
          'Free or Savour Pro',
          'A free account keeps up to 100 recipes and imports Word, PDF and text. With [Savour Pro](#gratis-en-pro) you keep unlimited recipes, AI reads photos of handwritten notes, you create kitchen teams and you print with your restaurant’s logo. New accounts get 7 days of Pro for free.'
        ],
        [
          'On every device',
          'Savour runs in the browser on computer, tablet and phone. Importing, organising and printing are easiest on a computer; looking things up in the kitchen on a phone or tablet. Your recipes live in the cloud: on a new device you log in and everything is there.'
        ]
      ]
    }
  },
  {
    id: 'account-maken',
    related: ['inloggen', 'gratis-en-pro', 'eerste-week'],
    nl: {
      slug: 'handleiding-account-maken',
      menu: 'Een account maken',
      title: 'Een Savour-account maken en je e-mailadres bevestigen | Handleiding',
      desc: 'Zo maak je een gratis Savour-account: naam, e-mailadres en wachtwoord, de bevestigingsmail, de proefweek met Savour Pro en wat je daarna als eerste doet.',
      lead: 'Gratis, zonder betaalgegevens, en binnen een minuut klaar.',
      sections: [
        [
          'Account aanmaken',
          'Kies op [savour.page](/) “Gratis beginnen”. Vul je voornaam, achternaam, e-mailadres en een wachtwoord in en kies “Account aanmaken”. Je hoeft geen betaalgegevens in te vullen.'
        ],
        [
          'Je e-mailadres bevestigen',
          'Je krijgt een e-mail met een link om je account te bevestigen. Klik op de link en daarna in Savour op “Doorgaan”. Geen mail gekregen? Kijk in je spam. Probeer je in te loggen zonder te bevestigen, dan biedt Savour aan een nieuwe bevestigingsmail te sturen. Een link uit een e-mail werkt één keer en een uur lang; vraag je er meerdere aan, dan werkt alleen de nieuwste.'
        ],
        [
          'Zeven dagen Savour Pro',
          'Elk nieuw account krijgt 7 dagen [Savour Pro](#gratis-en-pro) gratis. Je kunt dan foto’s van kladjes laten lezen, een [keukenteam maken](#keukenteam-maken) en [printen met je logo](#printen-logo). Ook in de proefweek bewaar je tot 100 recepten. Na de proefweek houd je alles wat je hebt gemaakt.'
        ],
        [
          'Uitgenodigd door een collega',
          'Kreeg je een link van een collega, dan opent Savour meteen “Account aanmaken”. Je krijgt dezelfde proefweek, en je collega krijgt 14 dagen Pro cadeau zodra jij je e-mailadres hebt bevestigd en bent ingelogd. Kreeg je een uitnodiging voor een keukenteam, dan word je na het inloggen lid van dat team. Zie [Collega uitnodigen](#collega-uitnodigen) en [Je team uitnodigen](#keukenteam-uitnodigen).'
        ],
        [
          'E-mailadres heeft al een account',
          'Meldt Savour dat het e-mailadres al een account heeft, dan wordt er geen nieuwe bevestigingsmail gestuurd. [Log dan in](#inloggen), of kies “Wachtwoord vergeten?” als je het wachtwoord niet meer weet.'
        ],
        [
          'Daarna',
          'Na het bevestigen zie je het welkomstscherm met een korte startlijst. Begin met [importeren](#importeren) of met [een recept zelf invoeren](#recept-maken). Een stappenplan voor de eerste dagen staat bij [Je eerste week met Savour](#eerste-week).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-create-account',
      menu: 'Creating an account',
      title: 'Create a Savour account and confirm your email address | User guide',
      desc: 'How to create a free Savour account: name, email address and password, the confirmation email, the Savour Pro trial week and what to do first.',
      lead: 'Free, no payment details, and done within a minute.',
      sections: [
        [
          'Create your account',
          'Choose “Start for free” on [savour.page](/en). Enter your first name, last name, email address and a password and choose “Create account”. No payment details needed.'
        ],
        [
          'Confirm your email address',
          'You receive an email with a link to confirm your account. Click the link and then “Continue” in Savour. No email? Check your spam folder. If you try to log in without confirming, Savour offers to send a new confirmation email. A link from an email works once and for one hour; if you request several, only the newest works.'
        ],
        [
          'Seven days of Savour Pro',
          'Every new account gets 7 days of [Savour Pro](#gratis-en-pro) for free. You can have photos of notes read, [create a kitchen team](#keukenteam-maken) and [print with your logo](#printen-logo). During the trial you keep up to 100 recipes. After the trial week you keep everything you made.'
        ],
        [
          'Invited by a colleague',
          'If a colleague sent you a link, Savour opens “Create account” straight away. You get the same trial week, and your colleague gets 14 days of Pro as a thank-you once you have confirmed your email address and logged in. If you received a kitchen team invitation, you join that team after logging in. See [Inviting a colleague](#collega-uitnodigen) and [Inviting your team](#keukenteam-uitnodigen).'
        ],
        [
          'Email address already has an account',
          'If Savour says the email address already has an account, no new confirmation email is sent. [Log in](#inloggen) instead, or choose “Forgot password?” if you no longer know the password.'
        ],
        [
          'Next',
          'After confirming you see the welcome screen with a short checklist. Start [importing](#importeren) or [enter a recipe yourself](#recept-maken). A plan for the first days is in [Your first week with Savour](#eerste-week).'
        ]
      ]
    }
  },
  {
    id: 'inloggen',
    related: ['account-maken', 'probleem-inloggen', 'account-profiel'],
    nl: {
      slug: 'handleiding-inloggen',
      menu: 'Inloggen en wachtwoord',
      title: 'Inloggen, ingelogd blijven en wachtwoord vergeten | Handleiding Savour',
      desc: 'Inloggen in Savour: ingelogd blijven, wachtwoord onthouden op een gedeelde keukencomputer, wachtwoord vergeten en een nieuw wachtwoord kiezen.',
      lead: 'Inloggen op je eigen telefoon, op een gedeelde tablet bij de pass of op een nieuwe computer.',
      sections: [
        [
          'Inloggen',
          'Kies “Inloggen” rechtsboven op [savour.page](/) en vul je e-mailadres en wachtwoord in. Je recepten, mappen en keukenteams staan meteen klaar, op elk apparaat waarop je inlogt.'
        ],
        [
          'Ingelogd blijven',
          'Met “Ingelogd blijven” aangevinkt blijf je ingelogd, ook als je de browser of app sluit. Dat is ook nodig om je recepten [zonder internet](#offline) te kunnen openen. Op een gedeelde keukencomputer of tablet laat je het uit: dan ben je uitgelogd zodra het venster dichtgaat.'
        ],
        [
          'Wachtwoord onthouden',
          'Met “Wachtwoord onthouden” mag de wachtwoordbeheerder van je browser je wachtwoord bewaren, zodat je het de volgende keer niet hoeft te typen. Op een gedeeld apparaat zet je dit uit.'
        ],
        [
          'Wachtwoord vergeten',
          'Kies in het inlogvenster “Wachtwoord vergeten?”. Je krijgt een e-mail met een link. Klik erop, kies in Savour “Doorgaan” en stel bij [Mijn account](#account-profiel) een nieuw wachtwoord in. De link werkt één keer en een uur lang.'
        ],
        [
          'Uitloggen',
          'Uitloggen doe je onder Mijn account → Account. Op je eigen telefoon is dat niet nodig; op een gedeelde tablet wel, of je laat “Ingelogd blijven” uit.'
        ],
        [
          'Lukt het niet?',
          'Bij [Problemen met inloggen](#probleem-inloggen) staan de meest voorkomende meldingen en wat je eraan doet.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-log-in',
      menu: 'Logging in and passwords',
      title: 'Log in, stay logged in and reset your password | Savour user guide',
      desc: 'Logging in to Savour: staying logged in, remembering your password on a shared kitchen computer, forgotten passwords and choosing a new one.',
      lead: 'Logging in on your own phone, on a shared tablet at the pass or on a new computer.',
      sections: [
        [
          'Logging in',
          'Choose “Log in” at the top right of [savour.page](/en) and enter your email address and password. Your recipes, folders and kitchen teams are ready straight away, on every device you log in on.'
        ],
        [
          'Stay signed in',
          'With “Stay signed in” ticked you stay logged in, even after closing the browser or app. It is also needed to open your recipes [without internet](#offline). On a shared kitchen computer or tablet, leave it off: you are logged out as soon as the window closes.'
        ],
        [
          'Remember password',
          'With “Remember password” your browser’s password manager may keep your password, so you don’t have to type it next time. Switch it off on a shared device.'
        ],
        [
          'Forgot password',
          'Choose “Forgot password?” in the login window. You receive an email with a link. Click it, choose “Continue” in Savour and set a new password under [My account](#account-profiel). The link works once and for one hour.'
        ],
        [
          'Logging out',
          'Log out under My account → Account. On your own phone there is no need; on a shared tablet there is, or leave “Stay signed in” off.'
        ],
        [
          'Not working?',
          '[Problems logging in](#probleem-inloggen) lists the most common messages and what to do about them.'
        ]
      ]
    }
  },
  {
    id: 'demo',
    related: ['aan-de-slag', 'account-maken'],
    nl: {
      slug: 'handleiding-demo',
      menu: 'De demo bekijken',
      title: 'De demo van Savour: rondkijken met 40 proefrecepten | Handleiding',
      desc: 'Probeer Savour zonder account: de demo met 40 proefrecepten, mappen en een keukenteam. Zo werkt de demo en wat je er wel en niet in kunt doen.',
      lead: 'Rondkijken in Savour met proefrecepten, zonder account en zonder iets op te slaan.',
      sections: [
        [
          'De demo openen',
          'Kies op de [startpagina](/) “Bekijk de demo”. Je ziet Savour zoals een ingelogde kok het ziet, met 40 proefrecepten, eigen mappen per partie en een keukenteam.'
        ],
        [
          'Wat je kunt proberen',
          'Open recepten, [reken ze om](#omrekenen), start de [kookmodus](#kookmodus), zoek op een ingrediënt en blader door de mappen. Ook het importeren kun je proberen: je ziet wat de Savour-lezer van je bestand maakt.'
        ],
        [
          'Wat de demo niet doet',
          'In de demo wordt niets opgeslagen. Bovenaan staat “Demo account · niets wordt opgeslagen”. Wil je je eigen recepten bewaren, [maak dan een account](#account-maken).'
        ],
        [
          'De demo verlaten',
          'Uitloggen uit de demo brengt je terug naar de startpagina. Er blijft niets van de demo achter in je browser.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-demo',
      menu: 'Trying the demo',
      title: 'The Savour demo: look around with 40 sample recipes | User guide',
      desc: 'Try Savour without an account: the demo with 40 sample recipes, folders and a kitchen team. How the demo works and what you can and cannot do in it.',
      lead: 'Look around Savour with sample recipes, without an account and without saving anything.',
      sections: [
        [
          'Opening the demo',
          'Choose “View the demo” on the [home page](/en). You see Savour as a logged-in chef sees it, with 40 sample recipes, folders per section and a kitchen team.'
        ],
        [
          'What you can try',
          'Open recipes, [scale them](#omrekenen), start [cook mode](#kookmodus), search for an ingredient and browse the folders. You can try importing too: you see what the Savour reader makes of your file.'
        ],
        [
          'What the demo does not do',
          'Nothing is saved in the demo. The top says “Demo account · nothing is saved”. To keep your own recipes, [create an account](#account-maken).'
        ],
        [
          'Leaving the demo',
          'Logging out of the demo takes you back to the home page. Nothing from the demo stays behind in your browser.'
        ]
      ]
    }
  },
  {
    id: 'app-installeren',
    related: ['offline', 'kookmodus', 'inloggen'],
    nl: {
      slug: 'handleiding-app-installeren',
      menu: 'Savour als app installeren',
      title: 'Savour als app op iPhone, Android en computer zetten | Handleiding',
      desc: 'Zo zet je Savour als app op je beginscherm: iPhone en iPad via Safari, Android via Chrome, en op de computer via Chrome, Edge of Safari. Zonder app store.',
      lead: 'Eén keer op je beginscherm zetten, en Savour opent als een gewone app, ook zonder internet.',
      sections: [
        [
          'Zonder app store',
          'Savour is een web-app: je zet het vanaf de website op je beginscherm. Daarna opent het in een eigen venster met een eigen icoon, en heb je altijd automatisch de nieuwste versie. Meer uitleg staat op [App downloaden](/app-downloaden).'
        ],
        [
          'iPhone en iPad',
          'Open savour.page in Safari. Tik onderaan op Delen (het vierkantje met de pijl omhoog), kies “Zet op beginscherm” en tik op “Voeg toe”.'
        ],
        [
          'Android',
          'Open savour.page in Chrome. Tik rechtsboven op ⋮ en kies “App installeren” of “Toevoegen aan startscherm”. Ben je ingelogd, dan kan het ook via Tools → App installeren in het menu van Savour.'
        ],
        [
          'Computer',
          'In Chrome of Edge klik je rechts in de adresbalk op het installatie-icoon, of je kiest in Savour onder Tools “App installeren”. Op een Mac met Safari kies je Archief → “Voeg toe aan Dock”.'
        ],
        [
          'Ook zonder internet',
          'Log één keer in met “Ingelogd blijven” aangevinkt en open je recepten. Daarna opent Savour je bibliotheek ook als de wifi in de keuken wegvalt. Zie [Zonder internet werken](#offline).'
        ],
        [
          'Gedeelde tablet bij de pass',
          'Zet Savour op een tablet die het hele team gebruikt. Gebruiken meerdere mensen hem met een eigen account, laat “Ingelogd blijven” dan uit. Werkt iedereen uit hetzelfde [keukenteam](#keukenteams), dan ziet iedereen dezelfde recepten.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-install-app',
      menu: 'Installing Savour as an app',
      title: 'Put Savour on your iPhone, Android or computer as an app | User guide',
      desc: 'How to add Savour to your home screen: iPhone and iPad via Safari, Android via Chrome, and on a computer via Chrome, Edge or Safari. No app store needed.',
      lead: 'Add it to your home screen once and Savour opens like a regular app, even without internet.',
      sections: [
        [
          'No app store',
          'Savour is a web app: you add it to your home screen from the website. It then opens in its own window with its own icon, and you always have the latest version automatically. More on the [App](/en/app) page.'
        ],
        [
          'iPhone and iPad',
          'Open savour.page in Safari. Tap Share at the bottom (the square with the arrow pointing up), choose “Add to Home Screen” and tap “Add”.'
        ],
        [
          'Android',
          'Open savour.page in Chrome. Tap ⋮ at the top right and choose “Install app” or “Add to Home screen”. When you are logged in, you can also use Tools → Install app in Savour’s menu.'
        ],
        [
          'Computer',
          'In Chrome or Edge, click the install icon on the right of the address bar, or choose “Install app” under Tools in Savour. On a Mac with Safari, choose File → “Add to Dock”.'
        ],
        [
          'Without internet too',
          'Log in once with “Stay signed in” ticked and open your recipes. After that Savour opens your library even when the kitchen wifi drops. See [Working without internet](#offline).'
        ],
        [
          'A shared tablet at the pass',
          'Put Savour on a tablet the whole team uses. If several people use it with their own account, leave “Stay signed in” off. If everyone works from the same [kitchen team](#keukenteams), everyone sees the same recipes.'
        ]
      ]
    }
  },
  {
    id: 'menu',
    related: ['zoeken', 'mappen', 'account-profiel'],
    nl: {
      slug: 'handleiding-menu-en-schermen',
      menu: 'Het menu en de schermen',
      title: 'Het menu van Savour: recepten, mappen, keukenteams, tools | Handleiding',
      desc: 'Je weg vinden in Savour: het menu met Alle recepten, Favorieten, Categorieën, Recept toevoegen, receptenmappen, keukenteams en tools, en de knoppen bovenin.',
      lead: 'Wat er in het menu staat en waar je wat vindt, op de computer en op je telefoon.',
      sections: [
        [
          'Recepten',
          'Bovenin het menu staan je eigen recepten:',
          [
            '[Alle recepten](#zoeken): je hele bibliotheek, genummerd en op alfabet.',
            '[Favorieten](#favorieten): de recepten met een sterretje.',
            '[Categorieën](#categorieen): recepten per soort, zoals sauzen of patisserie.',
            '[Recept toevoegen](#importeren): importeren of zelf invoeren.'
          ]
        ],
        [
          'Recepten mappen',
          'Daaronder staan je eigen [mappen](#mappen), bijvoorbeeld per partie of per menu, met “Recepten map toevoegen” om er een te maken. Je kiest zelf welke mappen in het menu staan en in welke volgorde.'
        ],
        [
          'Keukenteams',
          'Hier staan de [keukenteams](#keukenteams) waar je lid van bent, met “Keukenteam maken” om er zelf een te beginnen (Savour Pro).'
        ],
        [
          'Tools',
          'Onderaan staan [Savour Pro](#gratis-en-pro), [Collega uitnodigen](#collega-uitnodigen), [App installeren](#app-installeren) en Instellingen, waar je [je account](#account-profiel), [abonnement](#abonnement-beheren), [weergave](#weergave-en-taal), [categorieën](#categorieen) en [opschonen](#opschonen) vindt.'
        ],
        [
          'Bovenin',
          'In de balk bovenin zoek je in je recepten, wissel je met één knop tussen het [donkere en lichte thema](#weergave-en-taal) en kies je de taal: Nederlands, Engels, Duits, Spaans of Frans.'
        ],
        [
          'Uitleg per scherm',
          'Naast de titel van veel schermen staat een i-knopje. Daarachter vind je een korte uitleg van wat je op dat scherm kunt, in de app zelf.'
        ],
        [
          'Op je telefoon',
          'Op een telefoon staat onderin een balk met Recepten, Receptenmappen, Keukenteams en Recept toevoegen. Bovenin zoek je, open je je favorieten en ga je naar Mijn account. Recepten openen groot en leesbaar; met de [kookmodus](#kookmodus) zie je alleen het recept.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-menu-and-screens',
      menu: 'The menu and screens',
      title: 'The Savour menu: recipes, folders, kitchen teams, tools | User guide',
      desc: 'Finding your way in Savour: the menu with All recipes, Favourites, Categories, Add recipe, recipe folders, kitchen teams and tools, and the buttons at the top.',
      lead: 'What is in the menu and where to find what, on a computer and on your phone.',
      sections: [
        [
          'Recipes',
          'The top of the menu holds your own recipes:',
          [
            '[All recipes](#zoeken): your whole library, numbered and in alphabetical order.',
            '[Favourites](#favorieten): recipes with a star.',
            '[Categories](#categorieen): recipes by kind, such as sauces or pastry.',
            '[Add recipe](#importeren): import or enter one yourself.'
          ]
        ],
        [
          'Recipe folders',
          'Below that are your own [folders](#mappen), for example by section or by menu, with “Add recipe folder” to make one. You choose which folders appear in the menu and in what order.'
        ],
        [
          'Kitchen teams',
          'Here are the [kitchen teams](#keukenteams) you belong to, with “Create kitchen team” to start your own (Savour Pro).'
        ],
        [
          'Tools',
          'At the bottom are [Savour Pro](#gratis-en-pro), [Invite a colleague](#collega-uitnodigen), [Install app](#app-installeren) and Settings, where you find [your account](#account-profiel), [subscription](#abonnement-beheren), [appearance](#weergave-en-taal), [categories](#categorieen) and [clean-up](#opschonen).'
        ],
        [
          'At the top',
          'In the bar at the top you search your recipes, switch between the [dark and light theme](#weergave-en-taal) with one button and choose the language: English, Dutch, German, Spanish or French.'
        ],
        [
          'Help on every screen',
          'Many screens have an i button next to the title. It opens a short explanation of what you can do on that screen, inside the app.'
        ],
        [
          'On your phone',
          'On a phone a bar at the bottom holds Recipes, Recipe folders, Kitchen teams and Add recipe. At the top you search, open your favourites and go to My account. Recipes open large and readable; [cook mode](#kookmodus) shows only the recipe.'
        ]
      ]
    }
  },
  {
    id: 'eerste-week',
    related: ['aan-de-slag', 'importeren', 'tips-recept-schrijven'],
    nl: {
      slug: 'handleiding-eerste-week',
      menu: 'Je eerste week met Savour',
      title: 'Je eerste week met Savour: stappenplan voor je keuken | Handleiding',
      desc: 'Een stappenplan voor de eerste week: recepten importeren, opschonen, ordenen in categorieën en mappen, je team uitnodigen en Savour in de keuken gebruiken.',
      lead: 'Een praktisch plan om in een week van losse bestanden naar één receptenboek te gaan.',
      sections: [
        [
          'Dag 1: alles erin',
          'Verzamel je Word-bestanden, PDF’s en oude exports en [importeer ze in één keer](#import-hele-map). Heb je handgeschreven kladjes, maak er dan [foto’s](#import-fotos) van tijdens de proefweek met Savour Pro.'
        ],
        [
          'Dag 2: nakijken',
          'Loop de recepten na die Savour als “nakijken” heeft gemarkeerd. Leg twijfelgevallen naast het origineel en controleer vooral de getallen. Zie [Import controleren](#import-controleren).'
        ],
        [
          'Dag 3: opruimen',
          'Haal nummers voor receptnamen en dubbele recepten weg met [Opschonen](#opschonen). Zet daarna de [standaardlijst met categorieën](#categorieen) neer en laat Savour [categorieën voorstellen](#categorie-trefwoorden).'
        ],
        [
          'Dag 4: ordenen',
          'Maak [mappen](#mappen) zoals jouw keuken werkt: per partie, per menu of per seizoen. Geef je meest gebruikte recepten een [sterretje](#favorieten).'
        ],
        [
          'Dag 5: het team erbij',
          '[Maak een keukenteam](#keukenteam-maken), zet de basisrecepten erin en [nodig je team uit](#keukenteam-uitnodigen). Geef je sous-chef de rol editor.'
        ],
        [
          'Dag 6 en 7: in de keuken',
          'Zet Savour [als app](#app-installeren) op de telefoons en de tablet bij de pass, gebruik de [kookmodus](#kookmodus) tijdens de mise-en-place en [print](#printen-map) de map voor de pass.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-first-week',
      menu: 'Your first week with Savour',
      title: 'Your first week with Savour: a plan for your kitchen | User guide',
      desc: 'A step-by-step plan for the first week: import recipes, clean up, organise into categories and folders, invite your team and use Savour in the kitchen.',
      lead: 'A practical plan to go from loose files to one recipe book in a week.',
      sections: [
        [
          'Day 1: get everything in',
          'Collect your Word files, PDFs and old exports and [import them in one go](#import-hele-map). If you have handwritten notes, take [photos](#import-fotos) of them during the Savour Pro trial week.'
        ],
        [
          'Day 2: review',
          'Go through the recipes Savour marked for review. Compare doubtful ones with the original and check the numbers in particular. See [Reviewing an import](#import-controleren).'
        ],
        [
          'Day 3: tidy up',
          'Remove numbers in front of recipe names and duplicate recipes with [Clean up](#opschonen). Then add the [default category list](#categorieen) and let Savour [suggest categories](#categorie-trefwoorden).'
        ],
        [
          'Day 4: organise',
          'Create [folders](#mappen) the way your kitchen works: by section, by menu or by season. Give your most used recipes a [star](#favorieten).'
        ],
        [
          'Day 5: bring in the team',
          '[Create a kitchen team](#keukenteam-maken), add the base recipes and [invite your team](#keukenteam-uitnodigen). Give your sous-chef the editor role.'
        ],
        [
          'Days 6 and 7: in the kitchen',
          'Put Savour [on the phones as an app](#app-installeren) and on the tablet at the pass, use [cook mode](#kookmodus) during mise en place and [print](#printen-map) the binder for the pass.'
        ]
      ]
    }
  }
];
