// Handleiding, onderdeel "Account en abonnement".

export const group = {
  id: 'account',
  nl: {
    name: 'Account en abonnement',
    intro: 'Je profiel, weergave en taal, wat gratis kan en wat Savour Pro toevoegt, organisaties, opzeggen en je account verwijderen.'
  },
  en: {
    name: 'Account and subscription',
    intro: 'Your profile, appearance and language, what is free and what Savour Pro adds, organisations, cancelling and deleting your account.'
  }
};

export const pages = [
  {
    id: 'gratis-en-pro',
    related: ['abonnement-beheren', 'organisatie', 'pro-stoppen'],
    nl: {
      slug: 'handleiding-account-en-pro',
      menu: 'Gratis en Savour Pro',
      title: 'Gratis of Savour Pro: wat zit erin en wat kost het | Handleiding',
      desc: 'Wat je gratis kunt in Savour en wat Savour Pro toevoegt: onbeperkt recepten, AI voor foto’s, keukenteams, printen met logo en downloaden. €2,99 per maand.',
      lead: 'Wat gratis kan, wat Savour Pro toevoegt en hoe de proefweek werkt.',
      sections: [
        [
          'Gratis',
          'Een gratis account bewaart tot 100 recepten, leest Word, PDF, tekst en exports uit andere apps in met de Savour-lezer, rekent om, heeft de kookmodus, print en kan lid zijn van keukenteams.'
        ],
        [
          'Savour Pro',
          'Savour Pro kost €2,99 per maand of €29 per jaar en voegt toe:',
          [
            'Onbeperkt recepten bewaren.',
            'AI voor [foto’s, handschrift en twijfelgevallen](#import-ai), tot 500 imports per maand.',
            'Zelf [keukenteams maken](#keukenteam-maken) en je team uitnodigen.',
            '[Printen met het logo van je restaurant](#printen-logo).',
            '[Downloaden als Word-bestand of back-up](#downloaden).',
            'Geen advertenties in de app.'
          ]
        ],
        [
          'De proefweek',
          'Nieuwe accounts krijgen 7 dagen Savour Pro gratis, zonder betaalgegevens. Ook in de proefweek bewaar je tot 100 recepten.'
        ],
        [
          'Betalen',
          'Je betaalt met iDEAL, creditcard, Apple Pay, Google Pay of PayPal. Er wordt geen btw gerekend (kleineondernemersregeling). Opzeggen kan altijd; je houdt Pro tot het einde van de betaalde periode.'
        ],
        [
          'Voor een hele keuken',
          'Moet iedereen in je keuken Pro hebben, kies dan een [organisatie](#organisatie). Alle prijzen staan op [Savour Pro](/savour-pro).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-account-and-pro',
      menu: 'Free and Savour Pro',
      title: 'Free or Savour Pro: what’s included and what it costs | User guide',
      desc: 'What you can do for free in Savour and what Savour Pro adds: unlimited recipes, AI for photos, kitchen teams, printing with your logo and downloads. €2.99 a month.',
      lead: 'What is free, what Savour Pro adds and how the trial week works.',
      sections: [
        [
          'Free',
          'A free account keeps up to 100 recipes, imports Word, PDF, text and exports from other apps with the Savour reader, scales, has cook mode, prints and can be a member of kitchen teams.'
        ],
        [
          'Savour Pro',
          'Savour Pro costs €2.99 a month or €29 a year and adds:',
          [
            'Unlimited recipes.',
            'AI for [photos, handwriting and doubtful recipes](#import-ai), up to 500 imports a month.',
            '[Creating kitchen teams](#keukenteam-maken) and inviting your team.',
            '[Printing with your restaurant’s logo](#printen-logo).',
            '[Downloading as a Word file or backup](#downloaden).',
            'No ads in the app.'
          ]
        ],
        [
          'The trial week',
          'New accounts get 7 days of Savour Pro for free, no payment details needed. During the trial you keep up to 100 recipes.'
        ],
        [
          'Paying',
          'Pay with iDEAL, credit card, Apple Pay, Google Pay or PayPal. No VAT is charged (Dutch small business scheme). Cancel any time; you keep Pro until the end of the paid period.'
        ],
        [
          'For a whole kitchen',
          'If everyone in your kitchen needs Pro, choose an [organisation](#organisatie). All prices are on [Savour Pro](/en/pro).'
        ]
      ]
    }
  },
  {
    id: 'organisatie',
    related: ['gratis-en-pro', 'keukenteams', 'abonnement-beheren'],
    nl: {
      slug: 'handleiding-organisatie-abonnement',
      menu: 'Organisaties: Pro voor je hele keuken',
      title: 'Een organisatie-abonnement: Savour Pro voor je hele keuken | Handleiding',
      desc: 'Savour voor een hele keuken: organisaties voor 5, 10 of 25 mensen, iedereen heeft Savour Pro. Zo nodig je je team uit en beheer je de plekken.',
      lead: 'Savour Pro voor iedereen in je keuken, met één abonnement.',
      sections: [
        [
          'Wat het is',
          'Met een organisatie heeft iedereen in je team Savour Pro. Er zijn abonnementen voor 5, 10 of 25 mensen: €8,99, €14,99 of €29,99 per maand.'
        ],
        [
          'Instellen',
          'Kies op de pagina [Savour Pro](/savour-pro) een organisatie, of ga naar Mijn account → Savour Pro. Nodig daar je team uit voor de plekken.'
        ],
        [
          'Organisatie of keukenteam',
          'Een organisatie gaat over wie Pro heeft. Een [keukenteam](#keukenteams) gaat over welke recepten je deelt. Voor een team dat recepten deelt is één eigenaar met Pro genoeg; met een organisatie kan iedereen ook zelf foto’s laten lezen, keukenteams maken en printen met logo.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-organisation-plan',
      menu: 'Organisations: Pro for your whole kitchen',
      title: 'An organisation plan: Savour Pro for your whole kitchen | User guide',
      desc: 'Savour for a whole kitchen: organisations for 5, 10 or 25 people, everyone has Savour Pro. How to invite your team and manage the seats.',
      lead: 'Savour Pro for everyone in your kitchen, with one subscription.',
      sections: [
        [
          'What it is',
          'With an organisation everyone in your team has Savour Pro. There are plans for 5, 10 or 25 people: €8.99, €14.99 or €29.99 a month.'
        ],
        [
          'Setting it up',
          'Choose an organisation on the [Savour Pro](/en/pro) page, or go to My account → Savour Pro. Invite your team to the seats there.'
        ],
        [
          'Organisation or kitchen team',
          'An organisation is about who has Pro. A [kitchen team](#keukenteams) is about which recipes you share. For a team that shares recipes, one owner with Pro is enough; with an organisation everyone can also have photos read, create kitchen teams and print with a logo.'
        ]
      ]
    }
  },
  {
    id: 'abonnement-beheren',
    related: ['gratis-en-pro', 'pro-stoppen', 'printen-logo'],
    nl: {
      slug: 'handleiding-abonnement-beheren',
      menu: 'Je abonnement beheren',
      title: 'Je Savour Pro-abonnement beheren en facturen | Handleiding',
      desc: 'Zo beheer je je abonnement in Savour: Pro afsluiten, wisselen tussen maand en jaar, betaalgegevens en facturen, en het logo voor je prints instellen.',
      lead: 'Alles over je abonnement op één plek: Mijn account → Savour Pro.',
      sections: [
        [
          'Waar',
          'Ga naar Mijn account → Savour Pro. Daar zie je of je Savour Pro, een proefweek of een organisatie hebt, en tot wanneer.'
        ],
        [
          'Pro afsluiten',
          'Kies Savour Pro per maand of per jaar en betaal met iDEAL, creditcard, Apple Pay, Google Pay of PayPal. Je hebt Pro direct na het betalen.'
        ],
        [
          'Wijzigen en facturen',
          'Kies onder Savour Pro “Abonnement beheren”. Daar wijzig je je betaalgegevens, bekijk je je facturen en zeg je op.'
        ],
        [
          'Logo op prints',
          'Het [logo voor je prints](#printen-logo) stel je in onder het tabblad Logo op prints.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-manage-subscription',
      menu: 'Managing your subscription',
      title: 'Manage your Savour Pro subscription and invoices | User guide',
      desc: 'How to manage your subscription in Savour: getting Pro, monthly or yearly, payment details and invoices, and setting up the logo for your prints.',
      lead: 'Everything about your subscription in one place: My account → Savour Pro.',
      sections: [
        [
          'Where',
          'Go to My account → Savour Pro. It shows whether you have Savour Pro, a trial week or an organisation, and until when.'
        ],
        [
          'Getting Pro',
          'Choose Savour Pro monthly or yearly and pay with iDEAL, credit card, Apple Pay, Google Pay or PayPal. You have Pro right after paying.'
        ],
        [
          'Changes and invoices',
          'Choose “Manage subscription” under Savour Pro. There you change your payment details, view your invoices and cancel.'
        ],
        [
          'Logo on prints',
          'You set up the [logo for your prints](#printen-logo) in the Logo on prints tab.'
        ]
      ]
    }
  },
  {
    id: 'pro-stoppen',
    related: ['abonnement-beheren', 'keukenteam-verlaten', 'downloaden'],
    nl: {
      slug: 'handleiding-stoppen-met-pro',
      menu: 'Stoppen met Savour Pro',
      title: 'Stoppen met Savour Pro: je recepten blijven staan | Handleiding',
      desc: 'Wat er gebeurt als je stopt met Savour Pro: al je recepten blijven staan, alleen toevoegen boven de 100 kan niet, en je keukenteam staat op slot tot je weer Pro hebt.',
      lead: 'Je houdt altijd alles. Dit is wat er verandert.',
      sections: [
        [
          'Opzeggen',
          'Zeg op via Mijn account → Savour Pro. Je houdt Pro tot het einde van de betaalde periode.'
        ],
        [
          'Je recepten blijven',
          'Stop je met Pro, dan blijven al je recepten staan, ook als het er meer dan 100 zijn. Je kunt ze bekijken, omrekenen en printen. Alleen nieuwe recepten toevoegen boven de 100 kan dan niet meer.'
        ],
        [
          'Je keukenteam',
          'Een keukenteam waarvan jij eigenaar bent, staat op slot zolang je geen Pro hebt. Alles blijft bewaard; met Pro werkt het weer. Zie [Verlaten, verwijderen en Savour Pro](#keukenteam-verlaten).'
        ],
        [
          'Na de proefweek',
          'Na de gratis proefweek gebeurt hetzelfde: alles wat je hebt gemaakt, blijft staan.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-stopping-pro',
      menu: 'Stopping Savour Pro',
      title: 'Stopping Savour Pro: your recipes stay | User guide',
      desc: 'What happens when you stop Savour Pro: all your recipes stay, only adding beyond 100 is not possible, and your kitchen team is locked until you have Pro again.',
      lead: 'You always keep everything. This is what changes.',
      sections: [
        [
          'Cancelling',
          'Cancel via My account → Savour Pro. You keep Pro until the end of the paid period.'
        ],
        [
          'Your recipes stay',
          'If you stop Pro, all your recipes stay, even if you have more than 100. You can view, scale and print them. Only adding new recipes beyond 100 is no longer possible.'
        ],
        [
          'Your kitchen team',
          'A kitchen team you own is locked while you have no Pro. Everything is kept; with Pro it works again. See [Leaving, deleting and Savour Pro](#keukenteam-verlaten).'
        ],
        [
          'After the trial week',
          'The same happens after the free trial week: everything you made stays.'
        ]
      ]
    }
  },
  {
    id: 'account-profiel',
    related: ['inloggen', 'weergave-en-taal', 'account-verwijderen'],
    nl: {
      slug: 'handleiding-mijn-account',
      menu: 'Mijn account: profiel en wachtwoord',
      title: 'Mijn account: naam, profielfoto en wachtwoord | Handleiding Savour',
      desc: 'Zo beheer je je account in Savour: naam en profielfoto aanpassen, je wachtwoord veranderen, uitloggen en de andere tabbladen onder Mijn account.',
      lead: 'Je profiel en de instellingen van je account op één plek.',
      sections: [
        [
          'Waar',
          'Kies in het menu Instellingen, of op je telefoon het icoontje van Mijn account bovenin. Mijn account heeft de tabbladen Account, Savour Pro, Logo op prints, Weergave, Categorieën en Opschonen.'
        ],
        [
          'Profiel',
          'Onder Account pas je je naam en profielfoto aan. Een profielfoto snij je bij zodat je gezicht goed in beeld staat.'
        ],
        [
          'Wachtwoord',
          'Kies een nieuw wachtwoord onder Account. Weet je je wachtwoord niet meer, gebruik dan “Wachtwoord vergeten?” bij [inloggen](#inloggen).'
        ],
        [
          'Verder onder Account',
          'Hier [print of download je al je recepten](#downloaden), [nodig je een collega uit](#collega-uitnodigen), [installeer je de app](#app-installeren), log je uit en [verwijder je je account](#account-verwijderen).'
        ],
        [
          'De andere tabbladen',
          '[Savour Pro](#abonnement-beheren), [Logo op prints](#printen-logo), [Weergave](#weergave-en-taal), [Categorieën](#categorieen) en [Opschonen](#opschonen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-my-account',
      menu: 'My account: profile and password',
      title: 'My account: name, profile photo and password | Savour user guide',
      desc: 'How to manage your Savour account: change your name and profile photo, change your password, log out and the other tabs under My account.',
      lead: 'Your profile and account settings in one place.',
      sections: [
        [
          'Where',
          'Choose Settings in the menu, or on your phone the My account icon at the top. My account has the tabs Account, Savour Pro, Logo on prints, Appearance, Categories and Clean up.'
        ],
        [
          'Profile',
          'Under Account you change your name and profile photo. You crop a profile photo so your face is nicely in view.'
        ],
        [
          'Password',
          'Choose a new password under Account. If you no longer know your password, use “Forgot password?” when [logging in](#inloggen).'
        ],
        [
          'More under Account',
          'Here you [print or download all your recipes](#downloaden), [invite a colleague](#collega-uitnodigen), [install the app](#app-installeren), log out and [delete your account](#account-verwijderen).'
        ],
        [
          'The other tabs',
          '[Savour Pro](#abonnement-beheren), [Logo on prints](#printen-logo), [Appearance](#weergave-en-taal), [Categories](#categorieen) and [Clean up](#opschonen).'
        ]
      ]
    }
  },
  {
    id: 'weergave-en-taal',
    related: ['account-profiel', 'menu'],
    nl: {
      slug: 'handleiding-weergave-en-taal',
      menu: 'Donker of licht thema en taal',
      title: 'Donker of licht thema en de taal van Savour | Handleiding',
      desc: 'Zo kies je in Savour het donkere of lichte thema en de taal: Nederlands, Engels, Duits, Spaans of Frans. Je recepten worden nooit vertaald.',
      lead: 'Zo leest Savour het prettigst in jouw keuken.',
      sections: [
        [
          'Donker of licht',
          'Savour is standaard donker met goud. Kies onder Mijn account → Weergave “Donker” of “Licht”, of wissel met de knop bovenin. Je keuze wordt in je account bewaard, dus ook op je andere apparaten.'
        ],
        [
          'Taal',
          'Met de taalknop bovenin zet je Savour in het Nederlands, Engels, Duits, Spaans of Frans. De knoppen en uitleg veranderen mee.'
        ],
        [
          'Je recepten blijven zoals ze zijn',
          'Recepten en namen worden nooit vertaald. Een recept in het Nederlands blijft Nederlands, ook als je Savour in het Engels gebruikt.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-appearance-and-language',
      menu: 'Dark or light theme and language',
      title: 'Dark or light theme and Savour’s language | User guide',
      desc: 'How to choose the dark or light theme and the language in Savour: English, Dutch, German, Spanish or French. Your recipes are never translated.',
      lead: 'Make Savour read best in your kitchen.',
      sections: [
        [
          'Dark or light',
          'Savour is dark with gold by default. Choose “Dark” or “Light” under My account → Appearance, or switch with the button at the top. Your choice is saved in your account, so on your other devices too.'
        ],
        [
          'Language',
          'The language button at the top switches Savour to English, Dutch, German, Spanish or French. The buttons and explanations change along.'
        ],
        [
          'Your recipes stay as they are',
          'Recipes and names are never translated. A recipe in Dutch stays Dutch, even when you use Savour in English.'
        ]
      ]
    }
  },
  {
    id: 'account-verwijderen',
    related: ['downloaden', 'pro-stoppen', 'privacy-en-veiligheid'],
    nl: {
      slug: 'handleiding-account-verwijderen',
      menu: 'Je account verwijderen',
      title: 'Je Savour-account definitief verwijderen | Handleiding',
      desc: 'Zo verwijder je je Savour-account: wat er wordt verwijderd, wat je eerst kunt downloaden en waarom dit niet ongedaan kan worden gemaakt.',
      lead: 'Weg is weg. Download eerst wat je wilt bewaren.',
      sections: [
        [
          'Eerst downloaden',
          'Wil je je recepten bewaren, [download ze dan eerst](#downloaden) als Word-bestand of back-up, of [print ze](#printen-map).'
        ],
        [
          'Verwijderen',
          'Ga naar Mijn account → Account en kies onderaan “Account definitief verwijderen”. Savour vraagt eerst of je het zeker weet.'
        ],
        [
          'Wat er wordt verwijderd',
          'Je persoonlijke recepten, mappen, favorieten en profielgegevens. Dit kan niet ongedaan worden gemaakt.'
        ],
        [
          'Een abonnement',
          'Heb je Savour Pro, [zeg dat dan eerst op](#pro-stoppen) onder Savour Pro.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-delete-account',
      menu: 'Deleting your account',
      title: 'Delete your Savour account permanently | User guide',
      desc: 'How to delete your Savour account: what is deleted, what you can download first and why it cannot be undone.',
      lead: 'Gone is gone. Download what you want to keep first.',
      sections: [
        [
          'Download first',
          'To keep your recipes, [download them first](#downloaden) as a Word file or backup, or [print them](#printen-map).'
        ],
        [
          'Deleting',
          'Go to My account → Account and choose “Delete account permanently” at the bottom. Savour asks you to confirm first.'
        ],
        [
          'What is deleted',
          'Your personal recipes, folders, favourites and profile details. This cannot be undone.'
        ],
        [
          'A subscription',
          'If you have Savour Pro, [cancel it first](#pro-stoppen) under Savour Pro.'
        ]
      ]
    }
  },
  {
    id: 'privacy-en-veiligheid',
    related: ['account-verwijderen', 'downloaden'],
    nl: {
      slug: 'handleiding-privacy-en-je-recepten',
      menu: 'Je recepten, privacy en veiligheid',
      title: 'Je recepten, privacy en veiligheid in Savour | Handleiding',
      desc: 'Van wie zijn je recepten in Savour, wie kan ze zien, waar ze staan en hoe je ze altijd kunt meenemen. Met een link naar het privacybeleid.',
      lead: 'Je recepten zijn van jou. Zo gaat Savour ermee om.',
      sections: [
        [
          'Van jou',
          'Je recepten zijn van jou. Savour verwijdert nooit zelf iets zonder dat je erom vraagt, en je kunt ze altijd meenemen.'
        ],
        [
          'Wie ze ziet',
          'Je eigen recepten en mappen zie alleen jij. Recepten die je in een [keukenteam](#keukenteams) zet, ziet dat team. Een [gedeelde link](#delen-link) kan iedereen openen die hem heeft, zolang hij werkt.'
        ],
        [
          'Waar ze staan',
          'Je recepten staan in de cloud, zodat je op elk apparaat bij ze kunt. Recepten die je hebt geopend, staan ook op je apparaat voor [offline gebruik](#offline).'
        ],
        [
          'Meenemen',
          'Met Savour Pro [download je al je recepten](#downloaden) wanneer je wilt.'
        ],
        [
          'Meer',
          'Alles over welke gegevens Savour bewaart en met wie wordt samengewerkt, staat in het [privacybeleid](/privacy).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-privacy-and-your-recipes',
      menu: 'Your recipes, privacy and security',
      title: 'Your recipes, privacy and security in Savour | User guide',
      desc: 'Who owns your recipes in Savour, who can see them, where they are stored and how you can always take them with you. With a link to the privacy policy.',
      lead: 'Your recipes are yours. This is how Savour treats them.',
      sections: [
        [
          'Yours',
          'Your recipes are yours. Savour never deletes anything without you asking, and you can always take them with you.'
        ],
        [
          'Who sees them',
          'Only you see your own recipes and folders. Recipes you put in a [kitchen team](#keukenteams) are seen by that team. Anyone with a [shared link](#delen-link) can open it while it works.'
        ],
        [
          'Where they are',
          'Your recipes are stored in the cloud so you can reach them on any device. Recipes you have opened are also on your device for [offline use](#offline).'
        ],
        [
          'Taking them with you',
          'With Savour Pro you [download all your recipes](#downloaden) whenever you like.'
        ],
        [
          'More',
          'Everything about which data Savour keeps and who it works with is in the [privacy policy](/en/privacy).'
        ]
      ]
    }
  }
];
