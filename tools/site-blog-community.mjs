// Blog: de Savour Community (2026-11-10), in vijf talen. Klopt met js/features/community.js en
// supabase/2026-11-10-community-forum.sql: elk ingelogd account (ook gratis) kan threads plaatsen en reageren, bij een
// bericht staat de naam uit het profiel en nooit het e-mailadres, berichten van het team krijgen "Team Savour", de
// beheerder kan verbergen, vastzetten en sluiten, hooguit 10 berichten per uur, een verwijderd account blijft staan
// als "Verwijderd account". Geen cijfers en geen datums beloven: we zeggen alleen dat ideeën meewegen.

export const COMMUNITY_POST = {
  id: 'community',
  date: '2026-11-10',
  rich: true,
  nl: {
    slug: 'blog/savour-community',
    title: 'De Savour Community: praat mee en bepaal mee waar Savour naartoe gaat',
    desc: 'In de Savour Community stel je vragen, deel je tips met andere koks en vertel je wat je mist in Savour. Zo werkt het, en zo bepaal je mee wat we als volgende bouwen.',
    h1: 'De Savour Community: bouw mee aan Savour',
    lead: 'Savour is gemaakt door koks, voor koks. Wat er als volgende gebouwd wordt, willen we bepalen met de mensen die er elke dag in de keuken mee werken. Daarom is er nu de Savour Community: een plek in de app waar je vragen stelt, tips deelt en vertelt wat je mist.',
    brief: [
      'De Community staat in de app onder Mijn Savour. Iedereen met een account doet mee, ook met een gratis account.',
      'Je plaatst een thread of reageert op die van een ander. Andere leden zien je naam, nooit je e-mailadres.',
      'Wat je vertelt over wat je mist, weegt mee in wat we als volgende bouwen.'
    ],
    sections: [
      [
        'Waarom een community',
        'Een receptenapp voor de keuken bedenk je niet achter een bureau. De beste ideeën komen van koks die midden in de service iets zoeken en merken dat het sneller kan. Tot nu toe kwamen die ideeën via losse berichten. In de Community staan ze bij elkaar, zodat iedereen ze ziet en erop kan reageren. Herken je het idee van een ander, zeg het dan: hoe vaker iets terugkomt, hoe duidelijker het is wat keukens nodig hebben.'
      ],
      [
        'Wat je er kunt doen',
        'De Community is een forum in Savour zelf. Je hoeft nergens anders een account voor te maken.',
        [
          '**Vragen stellen**: hoe deel je de patisserie in, hoe zet je een recept over uit een andere app?',
          '**Tips delen**: hoe jouw keuken mappen, categorieën of keukenteams gebruikt.',
          '**Vertellen wat je mist**: een functie, een knop die te ver weg zit, iets wat te veel klikken kost.',
          '**Meepraten met het team**: berichten van Savour zelf herken je aan het label Team Savour.'
        ]
      ],
      [
        'Zo doe je mee',
        'Meedoen kan op de telefoon, de tablet en de computer.',
        {
          steps: [
            [
              'Log in',
              'Heb je nog geen account? [Maak er gratis een aan](/?auth=signup). Met een gratis account doe je volledig mee.'
            ],
            ['Open de Community', 'Kies in het menu Mijn Savour en dan Community.'],
            ['Plaats een thread', 'Klik op Nieuwe thread, geef je bericht een titel en schrijf wat je kwijt wilt.'],
            ['Reageer op anderen', 'Open een thread en schrijf je reactie eronder. Schrijven in je eigen taal mag.']
          ]
        }
      ],
      [
        'Jij bepaalt mee waar Savour naartoe gaat',
        'We willen dat Savour een platform blijft dat met zijn gebruikers meegroeit. Wat je in de Community vertelt, lezen we allemaal, en het weegt mee in wat we als volgende bouwen. Beloven dat elk idee er komt, doen we niet: soms past iets niet bij wat Savour wil zijn, zoals een app die een recept nooit zelf verzint. Maar je hoort het van ons, in de thread zelf. Wat er nu op de planning staat, lees je op [Binnenkort in Savour](/binnenkort).'
      ],
      [
        'De afspraken',
        'Een community werkt alleen als iedereen zich er thuis voelt. Daarom een paar duidelijke afspraken, die ook in Savour zelf zijn vastgelegd.',
        {
          check: [
            'Andere leden zien de naam uit je profiel, nooit je e-mailadres.',
            'Houd het vriendelijk en zonder reclame. Berichten die daar niet aan voldoen, kan de beheerder verbergen.',
            'Je kunt je eigen berichten altijd verwijderen.',
            'Per account kun je hooguit 10 berichten per uur plaatsen. Dat houdt spam buiten de deur.',
            'Verwijder je je account, dan blijven je berichten staan als "Verwijderd account", zonder je naam, zodat gesprekken van anderen heel blijven. Wil je ze helemaal weg, verwijder ze dan eerst zelf.'
          ],
          title: 'Zo is het geregeld'
        }
      ]
    ],
    outro: 'Tot in de Community. We horen graag wat jouw keuken nodig heeft.'
  },
  en: {
    slug: 'en/blog/savour-community',
    title: 'The Savour Community: join the conversation and help decide where Savour goes',
    desc: 'In the Savour Community you ask questions, share tips with other chefs and tell us what you miss in Savour. Here is how it works, and how you help decide what we build next.',
    h1: 'The Savour Community: help build Savour',
    lead: 'Savour is made by chefs, for chefs. We want to decide what gets built next together with the people who use it in the kitchen every day. That is why there is now the Savour Community: a place in the app to ask questions, share tips and tell us what you miss.',
    brief: [
      'The Community is in the app under My Savour. Everyone with an account can join, including free accounts.',
      'You post a thread or reply to someone else’s. Other members see your name, never your email address.',
      'What you tell us you miss helps decide what we build next.'
    ],
    sections: [
      [
        'Why a community',
        'You do not design a recipe app for the kitchen from behind a desk. The best ideas come from chefs who look something up in the middle of service and notice it could be quicker. Until now those ideas came in as separate messages. In the Community they are all in one place, so everyone can see them and reply. If you recognise someone else’s idea, say so: the more often something comes up, the clearer it is what kitchens need.'
      ],
      [
        'What you can do there',
        'The Community is a forum inside Savour itself. You do not need an account anywhere else.',
        [
          '**Ask questions**: how do you organise pastry, how do you move a recipe over from another app?',
          '**Share tips**: how your kitchen uses folders, categories or kitchen teams.',
          '**Tell us what you miss**: a feature, a button that is too far away, something that takes too many clicks.',
          '**Talk with the team**: messages from Savour itself carry the label Team Savour.'
        ]
      ],
      [
        'How to join',
        'You can take part on your phone, tablet and computer.',
        {
          steps: [
            [
              'Log in',
              'No account yet? [Create one for free](/?auth=signup). With a free account you can take part fully.'
            ],
            ['Open the Community', 'In the menu, choose My Savour and then Community.'],
            ['Post a thread', 'Click New thread, give your message a title and write what is on your mind.'],
            ['Reply to others', 'Open a thread and write your reply below it. Writing in your own language is fine.']
          ]
        }
      ],
      [
        'You help decide where Savour goes',
        'We want Savour to stay a platform that grows with its users. We read everything you share in the Community, and it helps decide what we build next. We do not promise that every idea will happen: sometimes something does not fit what Savour wants to be, like an app that never invents a recipe itself. But you will hear from us, in the thread itself. What is planned right now is on [Coming soon](/en/roadmap).'
      ],
      [
        'The ground rules',
        'A community only works if everyone feels at home. So here are a few clear rules, which are also built into Savour itself.',
        {
          check: [
            'Other members see the name from your profile, never your email address.',
            'Keep it friendly and free of advertising. Messages that are not may be hidden by the administrator.',
            'You can always delete your own messages.',
            'Each account can post at most 10 messages per hour. That keeps spam out.',
            'If you delete your account, your messages remain as "Deleted account", without your name, so other people’s conversations stay intact. If you want them gone completely, delete them yourself first.'
          ],
          title: 'How it is set up'
        }
      ]
    ],
    outro: 'See you in the Community. We would love to hear what your kitchen needs.'
  }
};

const KEY = 'en/blog/savour-community';

export const COMMUNITY_POST_DE = {
  [KEY]: {
    slug: 'de/blog/savour-community',
    title: 'Die Savour Community: rede mit und bestimme mit, wohin Savour geht',
    desc: 'In der Savour Community stellst du Fragen, teilst Tipps mit anderen Köchen und sagst, was dir in Savour fehlt. So funktioniert es, und so bestimmst du mit, was wir als Nächstes bauen.',
    h1: 'Die Savour Community: bau mit an Savour',
    lead: 'Savour ist von Köchen für Köche gemacht. Was als Nächstes gebaut wird, wollen wir mit den Menschen entscheiden, die jeden Tag in der Küche damit arbeiten. Deshalb gibt es jetzt die Savour Community: einen Ort in der App, an dem du Fragen stellst, Tipps teilst und sagst, was dir fehlt.',
    brief: [
      'Die Community findest du in der App unter Mein Savour. Jeder mit einem Konto macht mit, auch mit einem kostenlosen Konto.',
      'Du startest ein Thema oder antwortest auf das eines anderen. Andere Mitglieder sehen deinen Namen, nie deine E-Mail-Adresse.',
      'Was dir fehlt, fließt in das ein, was wir als Nächstes bauen.'
    ],
    sections: [
      [
        'Warum eine Community',
        'Eine Rezept-App für die Küche denkt man sich nicht am Schreibtisch aus. Die besten Ideen kommen von Köchen, die mitten im Service etwas suchen und merken, dass es schneller gehen könnte. Bisher kamen diese Ideen als einzelne Nachrichten. In der Community stehen sie zusammen, damit alle sie sehen und darauf antworten können. Erkennst du die Idee eines anderen wieder, sag es: Je öfter etwas auftaucht, desto klarer ist, was Küchen brauchen.'
      ],
      [
        'Was du dort machen kannst',
        'Die Community ist ein Forum in Savour selbst. Du brauchst nirgendwo sonst ein Konto.',
        [
          '**Fragen stellen**: Wie teilst du die Patisserie ein, wie holst du ein Rezept aus einer anderen App?',
          '**Tipps teilen**: wie deine Küche Ordner, Kategorien oder Küchenteams nutzt.',
          '**Sagen, was dir fehlt**: eine Funktion, ein Knopf, der zu weit weg ist, etwas, das zu viele Klicks braucht.',
          '**Mit dem Team reden**: Beiträge von Savour selbst erkennst du am Label Team Savour.'
        ]
      ],
      [
        'So machst du mit',
        'Mitmachen geht auf dem Smartphone, dem Tablet und dem Computer.',
        {
          steps: [
            [
              'Melde dich an',
              'Noch kein Konto? [Erstelle kostenlos eins](/?auth=signup). Mit einem kostenlosen Konto machst du voll mit.'
            ],
            ['Öffne die Community', 'Wähle im Menü Mein Savour und dann Community.'],
            [
              'Starte ein Thema',
              'Klicke auf Neues Thema, gib deiner Nachricht einen Titel und schreib, was du loswerden willst.'
            ],
            [
              'Antworte anderen',
              'Öffne ein Thema und schreib deine Antwort darunter. Du darfst in deiner eigenen Sprache schreiben.'
            ]
          ]
        }
      ],
      [
        'Du bestimmst mit, wohin Savour geht',
        'Wir wollen, dass Savour eine Plattform bleibt, die mit ihren Nutzern wächst. Alles, was du in der Community erzählst, lesen wir, und es fließt in das ein, was wir als Nächstes bauen. Versprechen, dass jede Idee kommt, können wir nicht: Manchmal passt etwas nicht zu dem, was Savour sein will, etwa eine App, die ein Rezept nie selbst erfindet. Aber du hörst von uns, im Thema selbst. Was gerade geplant ist, liest du unter [Demnächst in Savour](/de/demnaechst).'
      ],
      [
        'Die Regeln',
        'Eine Community funktioniert nur, wenn sich alle wohlfühlen. Deshalb ein paar klare Regeln, die auch in Savour selbst festgelegt sind.',
        {
          check: [
            'Andere Mitglieder sehen den Namen aus deinem Profil, nie deine E-Mail-Adresse.',
            'Bleib freundlich und ohne Werbung. Beiträge, die das nicht sind, kann der Administrator ausblenden.',
            'Deine eigenen Beiträge kannst du jederzeit löschen.',
            'Pro Konto kannst du höchstens 10 Beiträge pro Stunde veröffentlichen. So bleibt Spam draußen.',
            'Löschst du dein Konto, bleiben deine Beiträge als „Gelöschtes Konto“ ohne deinen Namen stehen, damit Gespräche anderer erhalten bleiben. Willst du sie ganz entfernen, lösche sie vorher selbst.'
          ],
          title: 'So ist es geregelt'
        }
      ]
    ],
    outro: 'Bis bald in der Community. Wir freuen uns zu hören, was deine Küche braucht.'
  }
};

export const COMMUNITY_POST_ES = {
  [KEY]: {
    slug: 'es/blog/comunidad-savour',
    title: 'La comunidad de Savour: participa y decide hacia dónde va Savour',
    desc: 'En la comunidad de Savour haces preguntas, compartes consejos con otros cocineros y nos cuentas qué echas de menos en Savour. Así funciona, y así decides con nosotros qué construimos después.',
    h1: 'La comunidad de Savour: construye Savour con nosotros',
    lead: 'Savour está hecho por cocineros, para cocineros. Queremos decidir qué se construye después junto con las personas que lo usan cada día en la cocina. Por eso existe ahora la comunidad de Savour: un lugar en la app para hacer preguntas, compartir consejos y contarnos qué echas de menos.',
    brief: [
      'La comunidad está en la app, en Mi Savour. Participa cualquiera con cuenta, también con una cuenta gratuita.',
      'Publicas un tema o respondes al de otra persona. Los demás miembros ven tu nombre, nunca tu correo electrónico.',
      'Lo que nos cuentas que echas de menos cuenta para decidir qué construimos después.'
    ],
    sections: [
      [
        'Por qué una comunidad',
        'Una app de recetas para la cocina no se diseña detrás de un escritorio. Las mejores ideas vienen de cocineros que buscan algo en pleno servicio y notan que podría ser más rápido. Hasta ahora esas ideas llegaban en mensajes sueltos. En la comunidad están todas juntas, para que todos las vean y puedan responder. Si reconoces la idea de otra persona, dilo: cuanto más se repite algo, más claro está lo que necesitan las cocinas.'
      ],
      [
        'Qué puedes hacer',
        'La comunidad es un foro dentro de Savour. No necesitas una cuenta en ningún otro sitio.',
        [
          '**Hacer preguntas**: ¿cómo organizas la pastelería, cómo pasas una receta desde otra app?',
          '**Compartir consejos**: cómo usa tu cocina las carpetas, las categorías o los equipos de cocina.',
          '**Contar qué echas de menos**: una función, un botón demasiado lejos, algo que requiere demasiados clics.',
          '**Hablar con el equipo**: los mensajes de Savour llevan la etiqueta Equipo Savour.'
        ]
      ],
      [
        'Cómo participar',
        'Puedes participar desde el teléfono, la tableta y el ordenador.',
        {
          steps: [
            [
              'Inicia sesión',
              '¿Aún no tienes cuenta? [Crea una gratis](/?auth=signup). Con una cuenta gratuita participas por completo.'
            ],
            ['Abre la comunidad', 'En el menú, elige Mi Savour y luego Comunidad.'],
            [
              'Publica un tema',
              'Haz clic en Nuevo tema, ponle un título a tu mensaje y escribe lo que quieras contar.'
            ],
            ['Responde a otros', 'Abre un tema y escribe tu respuesta debajo. Puedes escribir en tu propio idioma.']
          ]
        }
      ],
      [
        'Tú decides hacia dónde va Savour',
        'Queremos que Savour siga siendo una plataforma que crece con sus usuarios. Leemos todo lo que compartes en la comunidad, y cuenta para decidir qué construimos después. No prometemos que cada idea se haga realidad: a veces algo no encaja con lo que Savour quiere ser, como una app que nunca se inventa una receta. Pero tendrás respuesta nuestra, en el propio tema. Lo que está previsto ahora lo encuentras en [Próximamente en Savour](/es/proximamente).'
      ],
      [
        'Las normas',
        'Una comunidad solo funciona si todos se sienten a gusto. Por eso hay unas normas claras, que también están integradas en Savour.',
        {
          check: [
            'Los demás miembros ven el nombre de tu perfil, nunca tu correo electrónico.',
            'Sé amable y sin publicidad. El administrador puede ocultar los mensajes que no lo sean.',
            'Siempre puedes eliminar tus propios mensajes.',
            'Cada cuenta puede publicar como máximo 10 mensajes por hora. Así se mantiene fuera el spam.',
            'Si eliminas tu cuenta, tus mensajes se quedan como «Cuenta eliminada», sin tu nombre, para que las conversaciones de otros sigan completas. Si quieres que desaparezcan del todo, elimínalos tú antes.'
          ],
          title: 'Cómo está organizado'
        }
      ]
    ],
    outro: 'Nos vemos en la comunidad. Nos encantará saber qué necesita tu cocina.'
  }
};

export const COMMUNITY_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/communaute-savour',
    title: 'La communauté Savour : participe et décide où va Savour',
    desc: 'Dans la communauté Savour, tu poses des questions, partages des astuces avec d’autres chefs et nous dis ce qui te manque dans Savour. Voici comment ça marche, et comment tu décides avec nous de ce que nous construisons ensuite.',
    h1: 'La communauté Savour : construis Savour avec nous',
    lead: 'Savour est fait par des chefs, pour des chefs. Nous voulons décider de ce que nous construisons ensuite avec les personnes qui l’utilisent chaque jour en cuisine. C’est pourquoi il y a maintenant la communauté Savour : un endroit dans l’app pour poser des questions, partager des astuces et nous dire ce qui te manque.',
    brief: [
      'La communauté se trouve dans l’app sous Mon Savour. Tout le monde avec un compte peut participer, même avec un compte gratuit.',
      'Tu publies un sujet ou réponds à celui de quelqu’un d’autre. Les autres membres voient ton nom, jamais ton adresse e-mail.',
      'Ce qui te manque compte dans ce que nous construisons ensuite.'
    ],
    sections: [
      [
        'Pourquoi une communauté',
        'On ne conçoit pas une app de recettes pour la cuisine derrière un bureau. Les meilleures idées viennent de chefs qui cherchent quelque chose en plein service et remarquent que ça pourrait aller plus vite. Jusqu’ici, ces idées arrivaient par messages isolés. Dans la communauté, elles sont réunies, pour que tout le monde les voie et puisse répondre. Si tu reconnais l’idée de quelqu’un, dis-le : plus une chose revient, plus il est clair de quoi les cuisines ont besoin.'
      ],
      [
        'Ce que tu peux y faire',
        'La communauté est un forum dans Savour même. Pas besoin de compte ailleurs.',
        [
          '**Poser des questions** : comment organiser la pâtisserie, comment reprendre une recette d’une autre app ?',
          '**Partager des astuces** : comment ta cuisine utilise les dossiers, les catégories ou les équipes de cuisine.',
          '**Dire ce qui te manque** : une fonction, un bouton trop loin, quelque chose qui demande trop de clics.',
          '**Échanger avec l’équipe** : les messages de Savour portent l’étiquette Équipe Savour.'
        ]
      ],
      [
        'Comment participer',
        'Tu peux participer sur téléphone, tablette et ordinateur.',
        {
          steps: [
            [
              'Connecte-toi',
              'Pas encore de compte ? [Crées-en un gratuitement](/?auth=signup). Avec un compte gratuit, tu participes pleinement.'
            ],
            ['Ouvre la communauté', 'Dans le menu, choisis Mon Savour puis Communauté.'],
            ['Publie un sujet', 'Clique sur Nouveau sujet, donne un titre à ton message et écris ce que tu veux dire.'],
            [
              'Réponds aux autres',
              'Ouvre un sujet et écris ta réponse en dessous. Tu peux écrire dans ta propre langue.'
            ]
          ]
        }
      ],
      [
        'Tu décides avec nous où va Savour',
        'Nous voulons que Savour reste une plateforme qui grandit avec ses utilisateurs. Nous lisons tout ce que tu partages dans la communauté, et cela compte dans ce que nous construisons ensuite. Nous ne promettons pas que chaque idée verra le jour : parfois, quelque chose ne correspond pas à ce que Savour veut être, comme une app qui n’invente jamais une recette elle-même. Mais tu auras notre réponse, dans le sujet lui-même. Ce qui est prévu en ce moment se trouve sur [Bientôt dans Savour](/fr/bientot).'
      ],
      [
        'Les règles',
        'Une communauté ne fonctionne que si tout le monde s’y sent bien. Voici donc quelques règles claires, qui sont aussi intégrées dans Savour.',
        {
          check: [
            'Les autres membres voient le nom de ton profil, jamais ton adresse e-mail.',
            'Reste aimable et sans publicité. L’administrateur peut masquer les messages qui ne le sont pas.',
            'Tu peux toujours supprimer tes propres messages.',
            'Chaque compte peut publier au maximum 10 messages par heure. Cela tient le spam à l’écart.',
            'Si tu supprimes ton compte, tes messages restent sous « Compte supprimé », sans ton nom, pour que les conversations des autres restent entières. Si tu veux qu’ils disparaissent complètement, supprime-les toi-même avant.'
          ],
          title: 'Comment c’est organisé'
        }
      ]
    ],
    outro: 'À bientôt dans la communauté. Nous serons ravis de savoir ce dont ta cuisine a besoin.'
  }
};
