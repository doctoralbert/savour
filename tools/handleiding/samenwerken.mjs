// Handleiding, onderdeel "Delen en keukenteams".

export const group = {
  id: 'samenwerken',
  nl: {
    name: 'Delen en keukenteams',
    intro: 'Eén recept snel doorsturen, of één receptenboek voor je hele brigade met rollen, mappen en uitnodigingen.'
  },
  en: {
    name: 'Sharing and kitchen teams',
    intro: 'Send one recipe quickly, or keep one recipe book for your whole brigade with roles, folders and invitations.'
  }
};

export const pages = [
  {
    id: 'keukenteams',
    related: ['keukenteam-maken', 'keukenteam-rollen', 'delen-link'],
    nl: {
      slug: 'handleiding-delen-en-keukenteams',
      menu: 'Overzicht: delen en keukenteams',
      h1: 'Delen en keukenteams',
      title: 'Recepten delen en keukenteams met rollen | Handleiding Savour',
      desc: 'Zo deel je recepten in Savour: een link via WhatsApp, Telegram, sms of e-mail, en keukenteams met de rollen eigenaar, editor en viewer voor je hele brigade.',
      lead: 'Eén recept snel doorsturen, of één receptenboek voor je hele brigade.',
      sections: [
        [
          'Eén recept delen',
          'Stuur een recept als link, ook naar iemand zonder account, en bepaal hoelang de link werkt. Zie [Een recept delen met een link](#delen-link).'
        ],
        [
          'Een keukenteam',
          'Een keukenteam is het receptenboek van je keuken. Iedereen die lid is, ziet dezelfde recepten op de eigen telefoon, tablet of computer. Past de maker een recept aan, dan ziet iedereen meteen de nieuwe versie.'
        ],
        [
          'Alles over keukenteams',
          'Stap voor stap:',
          [
            '[Een keukenteam maken](#keukenteam-maken)',
            '[Rollen: eigenaar, editor en viewer](#keukenteam-rollen)',
            '[Je team uitnodigen](#keukenteam-uitnodigen)',
            '[Recepten en mappen in het team](#keukenteam-mappen)',
            '[Een recept van een collega overnemen](#recept-overnemen)',
            '[Verlaten, verwijderen en Savour Pro](#keukenteam-verlaten)'
          ]
        ],
        [
          'Wat het kost',
          'Een keukenteam maken kan met [Savour Pro](#gratis-en-pro). Lid zijn van een keukenteam is gratis. Voor een hele keuken met Pro voor iedereen is er een [organisatie-abonnement](#organisatie).'
        ],
        [
          'Meer lezen',
          'Wat een gedeeld receptenboek met je team doet: [Gedeeld receptenboek voor je keukenteam](/blog/gedeeld-receptenboek-keukenteam) en [Keukenteams uitgelegd](/blog/gedeelde-mappen-uitgelegd).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-sharing-and-kitchen-teams',
      menu: 'Overview: sharing and kitchen teams',
      h1: 'Sharing and kitchen teams',
      title: 'Share recipes and kitchen teams with roles | Savour user guide',
      desc: 'How to share recipes in Savour: a link via WhatsApp, Telegram, SMS or email, and kitchen teams with owner, editor and viewer roles for your whole brigade.',
      lead: 'Send one recipe quickly, or keep one recipe book for your whole brigade.',
      sections: [
        [
          'Sharing one recipe',
          'Send a recipe as a link, even to someone without an account, and decide how long the link works. See [Sharing a recipe with a link](#delen-link).'
        ],
        [
          'A kitchen team',
          'A kitchen team is your kitchen’s recipe book. Every member sees the same recipes on their own phone, tablet or computer. When the maker changes a recipe, everyone sees the new version straight away.'
        ],
        [
          'Everything about kitchen teams',
          'Step by step:',
          [
            '[Creating a kitchen team](#keukenteam-maken)',
            '[Roles: owner, editor and viewer](#keukenteam-rollen)',
            '[Inviting your team](#keukenteam-uitnodigen)',
            '[Recipes and folders in the team](#keukenteam-mappen)',
            '[Copying a colleague’s recipe](#recept-overnemen)',
            '[Leaving, deleting and Savour Pro](#keukenteam-verlaten)'
          ]
        ],
        [
          'What it costs',
          'Creating a kitchen team needs [Savour Pro](#gratis-en-pro). Being a member is free. For a whole kitchen with Pro for everyone there is an [organisation plan](#organisatie).'
        ],
        [
          'Read more',
          'What a shared recipe book does for your team: [Shared recipe book for your kitchen team](/en/blog/shared-recipe-book-kitchen-team) and [Kitchen teams explained](/en/blog/shared-folders-explained).'
        ]
      ]
    }
  },
  {
    id: 'delen-link',
    related: ['keukenteams', 'recept-overnemen', 'omrekenen'],
    nl: {
      slug: 'handleiding-recept-delen-met-link',
      menu: 'Een recept delen met een link',
      title: 'Een recept delen via WhatsApp, Telegram, sms of e-mail | Handleiding Savour',
      desc: 'Zo deel je een recept uit Savour met een link: via WhatsApp, Telegram, sms of e-mail, met een tijdslimiet, link uitzetten en ontvangers het recept laten overnemen.',
      lead: 'Een recept naar een collega, een leverancier of een stagiair, ook zonder account.',
      sections: [
        [
          'Delen',
          'Open het recept en kies “Delen”. Stuur het direct via WhatsApp, Telegram, sms of e-mail, of kopieer de link. In WhatsApp verschijnt het recept met een eigen voorbeeldplaatje.'
        ],
        [
          'Wat de ontvanger ziet',
          'Wie de link opent, ziet het recept, ook zonder account. Hij kan het [omrekenen](#omrekenen) en de [kookmodus](#kookmodus) gebruiken, maar niet bewerken.'
        ],
        [
          'Hoelang de link werkt',
          'Bij “Hoelang?” kies je 1 uur, 1 dag, 1 week of onbeperkt. Na die tijd werkt de link niet meer.'
        ],
        [
          'Link uitzetten',
          'Met “Link uitzetten” kan niemand het recept nog openen via die link, ook als de tijd nog niet om is.'
        ],
        [
          'Laten overnemen',
          'Zet je “Ontvangers mogen dit recept overnemen” aan, dan kunnen ontvangers met een account het recept aan hun eigen recepten toevoegen, als eigen kopie. Jouw recept verandert niet.'
        ],
        [
          'Met je hele team',
          'Deel je vaak recepten met dezelfde mensen, gebruik dan een [keukenteam](#keukenteams): dan hoeft niemand nog links te bewaren.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-share-recipe-link',
      menu: 'Sharing a recipe with a link',
      title: 'Share a recipe via WhatsApp, Telegram, SMS or email | Savour user guide',
      desc: 'How to share a recipe from Savour with a link: via WhatsApp, Telegram, SMS or email, with a time limit, turning the link off and letting recipients copy the recipe.',
      lead: 'A recipe for a colleague, a supplier or an intern, even without an account.',
      sections: [
        [
          'Sharing',
          'Open the recipe and choose “Share”. Send it straight via WhatsApp, Telegram, SMS or email, or copy the link. In WhatsApp the recipe shows with its own preview image.'
        ],
        [
          'What the recipient sees',
          'Whoever opens the link sees the recipe, even without an account. They can [scale](#omrekenen) it and use [cook mode](#kookmodus), but not edit it.'
        ],
        [
          'How long the link works',
          'At “For how long?” choose 1 hour, 1 day, 1 week or unlimited. After that the link no longer works.'
        ],
        [
          'Turning the link off',
          'With “Turn link off” nobody can open the recipe through that link any more, even if the time is not up yet.'
        ],
        [
          'Letting them copy it',
          'Switch on “Recipients may copy this recipe” and recipients with an account can add it to their own recipes as their own copy. Your recipe does not change.'
        ],
        [
          'With your whole team',
          'If you often share recipes with the same people, use a [kitchen team](#keukenteams): nobody has to keep links any more.'
        ]
      ]
    }
  },
  {
    id: 'keukenteam-maken',
    related: ['keukenteam-uitnodigen', 'keukenteam-rollen', 'keukenteam-mappen'],
    nl: {
      slug: 'handleiding-keukenteam-maken',
      menu: 'Een keukenteam maken',
      title: 'Een keukenteam maken in Savour | Handleiding',
      desc: 'Zo maak je een keukenteam in Savour: naam en afbeelding, recepten toevoegen, mappen maken en je team uitnodigen. Met Savour Pro, ook in de proefweek.',
      lead: 'In vijf minuten één receptenboek voor je hele keuken.',
      sections: [
        [
          'Maken',
          'Kies in het menu onder Keukenteams “Keukenteam maken” en geef het een naam, bijvoorbeeld de naam van je restaurant of keuken. Dit kan met [Savour Pro](#gratis-en-pro), ook tijdens de gratis proefweek.'
        ],
        [
          'Instellingen',
          'In de instellingen van het team wijzig je onder Algemeen de naam en de afbeelding. Onder Delen vind je de uitnodigingslink, en onder Leden & rechten beheer je wie erin zit.'
        ],
        [
          'Recepten toevoegen',
          'Kies “Recept toevoegen” en vink recepten uit je eigen bibliotheek aan. Het recept blijft van jou: het staat in het team en in je eigen recepten. Zie [Recepten en mappen in het team](#keukenteam-mappen).'
        ],
        [
          'Mensen uitnodigen',
          'Stuur je team een uitnodiging via WhatsApp, Telegram, e-mail of de link. Zie [Je team uitnodigen](#keukenteam-uitnodigen).'
        ],
        [
          'Waar begin je mee',
          'Begin met de basisrecepten die iedereen dagelijks gebruikt, zoals fonds, sauzen en vaste garnituren. Breid daarna uit per partie of per menu.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-create-kitchen-team',
      menu: 'Creating a kitchen team',
      title: 'Create a kitchen team in Savour | User guide',
      desc: 'How to create a kitchen team in Savour: name and image, adding recipes, making folders and inviting your team. With Savour Pro, including the trial week.',
      lead: 'One recipe book for your whole kitchen in five minutes.',
      sections: [
        [
          'Creating it',
          'In the menu under Kitchen teams choose “Create kitchen team” and give it a name, for example your restaurant or kitchen. This needs [Savour Pro](#gratis-en-pro), including the free trial week.'
        ],
        [
          'Settings',
          'In the team settings you change the name and image under General. Under Share you find the invitation link, and under Members & permissions you manage who is in it.'
        ],
        [
          'Adding recipes',
          'Choose “Add recipe” and tick recipes from your own library. The recipe stays yours: it is in the team and in your own recipes. See [Recipes and folders in the team](#keukenteam-mappen).'
        ],
        [
          'Inviting people',
          'Send your team an invitation via WhatsApp, Telegram, email or the link. See [Inviting your team](#keukenteam-uitnodigen).'
        ],
        [
          'Where to start',
          'Start with the base recipes everyone uses daily, such as stocks, sauces and standard garnishes. Then expand by section or by menu.'
        ]
      ]
    }
  },
  {
    id: 'keukenteam-rollen',
    related: ['keukenteam-uitnodigen', 'keukenteams'],
    nl: {
      slug: 'handleiding-rollen-in-keukenteam',
      menu: 'Rollen: eigenaar, editor en viewer',
      title: 'Rollen in een keukenteam: eigenaar, editor en viewer | Handleiding Savour',
      desc: 'Wie mag wat in een keukenteam van Savour: de eigenaar beheert, de editor voegt recepten en mappen toe, de viewer bekijkt, print en rekent om.',
      lead: 'Jij beheert, je sous-chef past aan, de rest kijkt mee.',
      sections: [
        [
          'De drie rollen',
          'Elk lid heeft één rol:',
          [
            'Eigenaar: beheert het keukenteam, de leden en hun rol. Alleen de eigenaar haalt mensen uit het team.',
            'Editor: voegt recepten en mappen toe, haalt ze eruit en beheert de mappen.',
            'Viewer: bekijkt, print en rekent om.'
          ]
        ],
        [
          'Een rol wijzigen',
          'Nieuwe leden komen binnen als viewer. De eigenaar past hun rol aan onder Leden & rechten in de instellingen van het team.'
        ],
        [
          'Een recept bewerken',
          'Een recept bewerken kan altijd alleen de maker van dat recept, ook in een team. Zo verandert niemand per ongeluk andermans receptuur. Anderen kunnen een [eigen kopie overnemen](#recept-overnemen).'
        ],
        [
          'Welke rol voor wie',
          'Een veelgebruikte indeling: de chef is eigenaar, sous-chefs en chefs de partie zijn editor, commis en stagiairs zijn viewer.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-kitchen-team-roles',
      menu: 'Roles: owner, editor and viewer',
      title: 'Roles in a kitchen team: owner, editor and viewer | Savour user guide',
      desc: 'Who can do what in a Savour kitchen team: the owner manages, the editor adds recipes and folders, the viewer views, prints and scales.',
      lead: 'You manage, your sous-chef edits, the rest follow along.',
      sections: [
        [
          'The three roles',
          'Each member has one role:',
          [
            'Owner: manages the kitchen team, its members and their roles. Only the owner removes people from the team.',
            'Editor: adds recipes and folders, removes them and manages the folders.',
            'Viewer: views, prints and scales.'
          ]
        ],
        [
          'Changing a role',
          'New members join as viewers. The owner changes their role under Members & permissions in the team settings.'
        ],
        [
          'Editing a recipe',
          'Only the maker of a recipe can edit it, in a team too. That way nobody changes someone else’s recipe by accident. Others can [take their own copy](#recept-overnemen).'
        ],
        [
          'Which role for whom',
          'A common set-up: the head chef is owner, sous-chefs and chefs de partie are editors, commis and interns are viewers.'
        ]
      ]
    }
  },
  {
    id: 'keukenteam-uitnodigen',
    related: ['keukenteam-rollen', 'account-maken', 'collega-uitnodigen'],
    nl: {
      slug: 'handleiding-team-uitnodigen',
      menu: 'Je team uitnodigen',
      title: 'Je keukenteam uitnodigen via WhatsApp, e-mail of link | Handleiding Savour',
      desc: 'Zo nodig je koks uit voor je keukenteam in Savour: via WhatsApp, Telegram, e-mail of de uitnodigingslink. Lid zijn is gratis, ook zonder Savour Pro.',
      lead: 'Je hele brigade erbij, met één bericht in de groepsapp.',
      sections: [
        [
          'Uitnodigen',
          'Open de instellingen van het keukenteam en kies onder Delen “Delen / uitnodigen”. Stuur de uitnodiging via WhatsApp, Telegram of e-mail, of kies “Link kopiëren” en zet de link in je groepsapp.'
        ],
        [
          'Wat de collega doet',
          'Je collega opent de link en logt in, of [maakt een gratis account](#account-maken). Daarna is hij lid van het team als viewer.'
        ],
        [
          'Gratis voor leden',
          'Lid zijn van een keukenteam is gratis, ook zonder Savour Pro. Alleen de eigenaar heeft Pro nodig.'
        ],
        [
          'Rol aanpassen',
          'Geef je sous-chef daarna de rol editor. Zie [Rollen](#keukenteam-rollen).'
        ],
        [
          'Iemand eruit halen',
          'Gaat iemand weg, dan haalt de eigenaar hem uit het team onder Leden & rechten. Zijn eigen recepten houdt hij; de recepten van het team ziet hij niet meer.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-invite-your-team',
      menu: 'Inviting your team',
      title: 'Invite your kitchen team via WhatsApp, email or link | Savour user guide',
      desc: 'How to invite cooks to your Savour kitchen team: via WhatsApp, Telegram, email or the invitation link. Membership is free, even without Savour Pro.',
      lead: 'Your whole brigade on board with one message in the group chat.',
      sections: [
        [
          'Inviting',
          'Open the kitchen team settings and under Share choose “Share / invite”. Send the invitation via WhatsApp, Telegram or email, or choose “Copy link” and post it in your group chat.'
        ],
        [
          'What the colleague does',
          'Your colleague opens the link and logs in, or [creates a free account](#account-maken). They then join the team as a viewer.'
        ],
        [
          'Free for members',
          'Being a member of a kitchen team is free, even without Savour Pro. Only the owner needs Pro.'
        ],
        [
          'Changing the role',
          'Then give your sous-chef the editor role. See [Roles](#keukenteam-rollen).'
        ],
        [
          'Removing someone',
          'When someone leaves, the owner removes them from the team under Members & permissions. They keep their own recipes; they no longer see the team’s recipes.'
        ]
      ]
    }
  },
  {
    id: 'keukenteam-mappen',
    related: ['keukenteam-maken', 'mappen', 'printen-map'],
    nl: {
      slug: 'handleiding-recepten-en-mappen-in-team',
      menu: 'Recepten en mappen in het team',
      title: 'Recepten en mappen in een keukenteam: beheren en archiveren | Handleiding',
      desc: 'Zo orden je een keukenteam in Savour: recepten toevoegen, mappen per partie of menu, mappen beheren, op volgorde zetten en archiveren, en het team printen.',
      lead: 'Het receptenboek van je keuken, ingedeeld zoals je brigade werkt.',
      sections: [
        [
          'Recepten toevoegen',
          'Kies in het keukenteam “Recept toevoegen” en vink recepten uit je eigen bibliotheek aan. Het recept blijft van jou en staat zowel in het team als in je eigen recepten. Pas je het aan, dan ziet het team meteen de nieuwe versie.'
        ],
        [
          'Mappen',
          'Deel het team op in mappen, bijvoorbeeld per partie (garde manger, saucier, patisserie) of per menu. Een eigenaar of editor maakt mappen en zet recepten erin.'
        ],
        [
          'Mappen beheren',
          'Met “Mappen beheren” wijzig je de naam, zet je de mappen in de volgorde van je keuken en archiveer je mappen die je niet meer gebruikt, zoals het menu van vorig seizoen.'
        ],
        [
          'Archief',
          'Gearchiveerde mappen en hun recepten blijven bewaard. Je vindt ze onderaan onder “Archief”.'
        ],
        [
          'Uit het team halen',
          'Open een recept vanuit het team en kies ⋯ “Uit keukenteam halen” of “Uit map halen”. Het recept blijft bij de maker.'
        ],
        [
          'Printen',
          'Print het hele team, één map of een eigen selectie in één keer, met het logo van de eigenaar. Zie [Meerdere recepten printen](#printen-map).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-team-recipes-and-folders',
      menu: 'Recipes and folders in the team',
      title: 'Recipes and folders in a kitchen team: manage and archive | User guide',
      desc: 'How to organise a Savour kitchen team: adding recipes, folders by section or menu, managing folders, putting them in order and archiving, and printing the team.',
      lead: 'Your kitchen’s recipe book, organised the way your brigade works.',
      sections: [
        [
          'Adding recipes',
          'In the kitchen team choose “Add recipe” and tick recipes from your own library. The recipe stays yours and is in both the team and your own recipes. Change it and the team sees the new version straight away.'
        ],
        [
          'Folders',
          'Split the team into folders, for example by section (garde manger, saucier, pastry) or by menu. An owner or editor creates folders and adds recipes to them.'
        ],
        [
          'Managing folders',
          '“Manage folders” lets you rename them, put them in your kitchen’s order and archive folders you no longer use, such as last season’s menu.'
        ],
        [
          'Archive',
          'Archived folders and their recipes are kept. You find them at the bottom under “Archive”.'
        ],
        [
          'Removing from the team',
          'Open a recipe from the team and choose ⋯ “Remove from kitchen team” or “Remove from folder”. The recipe stays with its maker.'
        ],
        [
          'Printing',
          'Print the whole team, one folder or your own selection at once, with the owner’s logo. See [Printing several recipes](#printen-map).'
        ]
      ]
    }
  },
  {
    id: 'recept-overnemen',
    related: ['keukenteams', 'delen-link', 'recept-maken'],
    nl: {
      slug: 'handleiding-recept-overnemen',
      menu: 'Een recept van een collega overnemen',
      title: 'Een recept van een collega overnemen als eigen kopie | Handleiding Savour',
      desc: 'Zo neem je in Savour een recept van een collega over: “Toevoegen aan mijn recepten” geeft je een eigen kopie die je kunt aanpassen. Het origineel blijft van de maker.',
      lead: 'Een eigen versie van het recept van je collega, zonder het origineel te veranderen.',
      sections: [
        [
          'In een keukenteam',
          'Bij elk recept van een collega in het keukenteam zie je “Toevoegen aan mijn recepten”. Je krijgt een eigen kopie in je bibliotheek.'
        ],
        [
          'Via een gedeelde link',
          'Heeft de maker bij het [delen](#delen-link) “Ontvangers mogen dit recept overnemen” aangezet, dan kun je het recept met een account ook vanuit de link toevoegen.'
        ],
        [
          'Je kopie',
          'Je kopie is helemaal van jou: je kunt hem [bewerken](#recept-maken), in je eigen [mappen](#mappen) zetten en omrekenen. Het origineel blijft van de maker en verandert niet mee.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-copy-a-recipe',
      menu: 'Copying a colleague’s recipe',
      title: 'Copy a colleague’s recipe as your own | Savour user guide',
      desc: 'How to copy a colleague’s recipe in Savour: “Add to my recipes” gives you your own copy to change. The original stays with its maker.',
      lead: 'Your own version of a colleague’s recipe, without changing the original.',
      sections: [
        [
          'In a kitchen team',
          'Every recipe from a colleague in the kitchen team shows “Add to my recipes”. You get your own copy in your library.'
        ],
        [
          'Through a shared link',
          'If the maker switched on “Recipients may copy this recipe” when [sharing](#delen-link), you can add the recipe from the link too, with an account.'
        ],
        [
          'Your copy',
          'Your copy is entirely yours: you can [edit](#recept-maken) it, put it in your own [folders](#mappen) and scale it. The original stays with the maker and does not change along.'
        ]
      ]
    }
  },
  {
    id: 'keukenteam-verlaten',
    related: ['keukenteams', 'pro-stoppen'],
    nl: {
      slug: 'handleiding-keukenteam-verlaten-of-verwijderen',
      menu: 'Verlaten, verwijderen en Savour Pro',
      title: 'Een keukenteam verlaten of verwijderen, en Savour Pro | Handleiding',
      desc: 'Wat er gebeurt als je een keukenteam verlaat of verwijdert in Savour, en wat er met het team gebeurt als de eigenaar stopt met Savour Pro.',
      lead: 'Wat er met de recepten gebeurt als iemand weggaat of stopt.',
      sections: [
        [
          'Verlaten',
          'Een lid kan een keukenteam altijd verlaten. Je eigen recepten houd je; de recepten van anderen zie je dan niet meer. Wil je er een bewaren, [neem het dan eerst over](#recept-overnemen).'
        ],
        [
          'Verwijderen',
          'Alleen de eigenaar kan het keukenteam verwijderen, onder Algemeen in de instellingen. De recepten zelf blijven in de bibliotheek van hun maker.'
        ],
        [
          'Als de eigenaar stopt met Pro',
          'Een keukenteam werkt zolang de eigenaar [Savour Pro](#gratis-en-pro) heeft, ook tijdens de proefweek. Stopt dat, dan staat het team op slot, maar blijft alles bewaard tot de eigenaar weer Pro heeft.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-leave-or-delete-kitchen-team',
      menu: 'Leaving, deleting and Savour Pro',
      title: 'Leave or delete a kitchen team, and Savour Pro | User guide',
      desc: 'What happens when you leave or delete a kitchen team in Savour, and what happens to the team when the owner stops Savour Pro.',
      lead: 'What happens to the recipes when someone leaves or stops.',
      sections: [
        [
          'Leaving',
          'A member can always leave a kitchen team. You keep your own recipes; you no longer see other people’s. To keep one, [copy it first](#recept-overnemen).'
        ],
        [
          'Deleting',
          'Only the owner can delete the kitchen team, under General in the settings. The recipes themselves stay in their makers’ libraries.'
        ],
        [
          'When the owner stops Pro',
          'A kitchen team works as long as the owner has [Savour Pro](#gratis-en-pro), including the trial week. If that stops, the team is locked, but everything is kept until the owner has Pro again.'
        ]
      ]
    }
  },
  {
    id: 'collega-uitnodigen',
    related: ['gratis-en-pro', 'keukenteam-uitnodigen'],
    nl: {
      slug: 'handleiding-collega-uitnodigen',
      menu: 'Collega uitnodigen: 14 dagen Pro',
      title: 'Een collega uitnodigen en 14 dagen Savour Pro krijgen | Handleiding',
      desc: 'Zo nodig je een collega uit voor Savour met je persoonlijke link en krijg je 14 dagen Savour Pro cadeau als die een account maakt en inlogt.',
      lead: 'Deel Savour met een collega en krijg er Pro voor terug.',
      sections: [
        [
          'Je persoonlijke link',
          'Kies in het menu onder Tools “Collega uitnodigen”. Kopieer je persoonlijke link of deel hem via WhatsApp of een andere app.'
        ],
        [
          'Wanneer je het cadeau krijgt',
          'Maakt je collega via jouw link een account, bevestigt die het e-mailadres en logt die in, dan krijg jij 14 dagen Savour Pro cadeau. Je collega krijgt zelf de gewone 7 dagen proef.'
        ],
        [
          'Betaal je al voor Pro',
          'Heb je een betaald abonnement, dan krijg je de 14 dagen als tegoed op je volgende factuur. Heb je opgezegd, dan gaan ze in na je betaalde periode.'
        ],
        [
          'Hoe vaak',
          'Het cadeau geldt voor nieuwe accounts, één keer per collega, en tot 12 keer. Bij “Collega uitnodigen” zie je hoeveel collega’s je hebt uitgenodigd.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-invite-a-colleague',
      menu: 'Invite a colleague: 14 days of Pro',
      title: 'Invite a colleague and get 14 days of Savour Pro | User guide',
      desc: 'How to invite a colleague to Savour with your personal link and get 14 days of Savour Pro as a thank-you when they create an account and log in.',
      lead: 'Share Savour with a colleague and get Pro in return.',
      sections: [
        [
          'Your personal link',
          'In the menu under Tools choose “Invite a colleague”. Copy your personal link or share it via WhatsApp or another app.'
        ],
        [
          'When you get the gift',
          'When your colleague creates an account through your link, confirms their email address and logs in, you get 14 days of Savour Pro. Your colleague gets the usual 7-day trial.'
        ],
        [
          'Already paying for Pro',
          'With a paid subscription you get the 14 days as credit on your next invoice. If you have cancelled, they start after your paid period.'
        ],
        [
          'How often',
          'The gift applies to new accounts, once per colleague, up to 12 times. “Invite a colleague” shows how many colleagues you have invited.'
        ]
      ]
    }
  }
];
