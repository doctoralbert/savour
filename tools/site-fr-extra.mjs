// Site en français : menu, page d'accueil, service d'importation, page d'envoi, page application et la vraie note.
// Mêmes blocs que pour l'allemand et l'espagnol dans les autres fichiers tools/site-*.mjs.
export const EXTRA_FR = {
  ui: {
    home: '/fr',
    features: 'Fonctions',
    audience: 'Pour qui',
    pricing: 'Tarifs',
    about: 'À propos',
    blog: 'Blog',
    login: 'Se connecter',
    start: 'Essai gratuit',
    demo: 'Voir la démo',
    demoNote: "40 recettes d'exemple, sans compte",
    menu: 'Menu',
    close: 'Fermer',
    featuresIntro: 'Tout ce que Savour fait pour toi en cuisine, de la première note griffonnée à la feuille au mur.',
    audienceIntro: 'Fait pour la cuisine professionnelle, du chef au stagiaire.',
    related: 'À lire aussi',
    ctaTitle: "Tes recettes méritent mieux qu'un tiroir.",
    ctaText:
      "Commence gratuitement avec jusqu'à 100 recettes et essaie Savour Pro pendant 7 jours. Sans données de paiement.",
    footerTag: "L'application de recettes pour la cuisine professionnelle.",
    footerCols: { features: 'Fonctions', audience: 'Pour qui', company: 'Savour', help: 'Aide' },
    faq: 'Questions fréquentes',
    guide: 'Guide',
    contact: 'Contact',
    terms: 'Conditions',
    privacy: 'Confidentialité',
    bug: 'Signaler un problème',
    company: 'Savour · contact@savour.page',
    soon: 'Bientôt',
    madeBy: 'Fait par des chefs, pour des chefs.'
  },
  kladje: {
    note: [
      'Beurre blanc',
      '2 échal. fines',
      '1 dl vin blanc',
      '1 dl vinaigre',
      'réduire à ¼',
      '250 gr beurre froid!!',
      'monter, sel, cit.'
    ],
    title: 'Beurre blanc',
    meta: 'Rendement 0,5 litre · Sauces',
    ingredients: [
      '2 échalotes, finement ciselées',
      '100 ml de vin blanc',
      '100 ml de vinaigre de vin blanc',
      '250 g de beurre froid, en dés',
      'Sel et jus de citron'
    ],
    steps: [
      "Réduire l'échalote, le vin et le vinaigre au quart.",
      'Hors du feu, monter avec le beurre froid.',
      'Assaisonner de sel et de citron.'
    ],
    caption: 'À gauche, la note de la cuisine. À droite, la même recette dans Savour.'
  },
  home: {
    h1: 'Tout ton livre de recettes, sur chaque téléphone de la cuisine.',
    lead: "Savour est l'application de recettes pour la cuisine professionnelle. Tes fichiers Word, PDF et notes manuscrites deviennent un livre de recettes bien rangé, pour toi et ta brigade. En sécurité dans le cloud, sur tous les appareils et aussi hors ligne.",
    proof: '1 400 recettes importées depuis Word en 2 minutes. Testé dans notre propre cuisine.',
    story: [
      "Au dos d'un ticket. Dans un cahier qui colle après dix ans de service. Sur une photo prise au passe. Ces notes sont le savoir de ta cuisine, et elles se perdent, s'effacent ou ne sont comprises que par celui qui les a écrites.",
      "Savour est fait pour conserver ce savoir. Non pas en retapant tout, mais en transformant d'un coup tes notes, classeurs et fichiers en recettes justes, lisibles par toute ta brigade."
    ],
    storyLink: 'Lis notre histoire',
    featuresTitle: 'Ce que fait Savour',
    audienceTitle: 'Pour qui',
    soonTitle: 'Ce sur quoi nous travaillons',
    soonLink: 'Ce qui arrive',
    priceTitle: 'Commence gratuitement',
    price:
      "Jusqu'à 100 recettes gratuites, avec le lecteur Savour pour Word, PDF et texte. Savour Pro coûte 2,99 € par mois ou 29 € par an : recettes illimitées, IA pour les notes manuscrites et les photos, et tes propres équipes de cuisine. Équipes dès 1,20 € par personne.",
    priceLink: 'Voir les tarifs',
    faqTitle: 'Questions sur Savour',
    faq: [
      [
        'Quelle application utiliser pour organiser les recettes de mon restaurant ?',
        'Savour est fait pour les cuisines professionnelles : tu importes tes recettes, tu les classes en dossiers et tu les partages avec ton équipe. Tu commences gratuitement.'
      ],
      [
        'Comment numériser des recettes manuscrites ?',
        "Prends la recette en photo et envoie-la dans Savour. L'IA en fait une recette propre avec ingrédients et préparation, que tu vérifies ensuite."
      ],
      [
        'Puis-je importer des recettes depuis Word ou PDF ?',
        'Oui. Même un fichier de centaines de recettes à la fois ; Savour les sépare lui-même.'
      ],
      [
        'Comment partager des recettes avec mon équipe de cuisine ?',
        'Avec une équipe de cuisine. Tu invites tes collègues et tu leur donnes le droit de consulter ou de collaborer.'
      ],
      [
        'Savour convient-il à la gestion des recettes en restauration ?',
        'Oui. Savour est fait pour les restaurants, hôtels et traiteurs : gérer les recettes de façon centralisée, les partager avec ton équipe de cuisine et les classer par partie, menu ou site.'
      ],
      [
        'Savour fonctionne-t-il hors ligne ?',
        "Oui. Ouvre Savour une fois avec internet et ajoute-le à ton écran d'accueil ; tu ouvres ensuite tes recettes sans connexion, par exemple en chambre froide. Tu pourras de nouveau modifier dès que tu seras en ligne."
      ],
      [
        'Où sont conservées mes recettes ?',
        'Dans le cloud, séparées par compte. Tu les ouvres sur ordinateur, tablette et téléphone, et seuls toi et les personnes invitées dans une équipe de cuisine peuvent les lire.'
      ],
      [
        'Puis-je imprimer tout un dossier de recettes en une fois ?',
        'Oui. Imprime une recette ou tout un dossier en une fois, bien mis en page pour le classeur de la cuisine. Avec Savour Pro, le logo de ton restaurant y figure.'
      ],
      [
        'Savour est-il aussi fait pour les cuisiniers amateurs ?',
        "C'est possible, mais Savour est conçu pour la cuisine professionnelle : grands livres de recettes, équipes et service."
      ]
    ]
  },
  items: {
    digitise: ['Numériser ses recettes', 'Word, PDF et photos de recettes manuscrites dans Savour en une fois.'],
    organise: [
      'Organiser ses recettes',
      'Dossiers, catégories et recherche par ingrédient. Ton beurre blanc en trois secondes.'
    ],
    share: [
      'Partager avec ton équipe',
      'Équipes de cuisine avec droits : tu gères, ton sous-chef modifie, les autres consultent.'
    ],
    scale: ['Adapter ses recettes', 'De 8 couverts à 120, sans erreur de calcul.'],
    print: ['Imprimer ses recettes', 'Une recette ou tout un dossier en une fois, bien imprimé pour la cuisine.'],
    cloud: [
      'Base de données et archives',
      'Toutes tes recettes en sécurité dans le cloud, en ligne et hors ligne sur tous les appareils.'
    ],
    roadmap: ['Bientôt dans Savour', 'Coût par recette, allergènes et historique de chaque recette.'],
    chefs: ['Cuisiniers', 'Pour les chefs, sous-chefs et pâtissiers qui veulent préserver leurs recettes.'],
    brigade: ['Brigades de cuisine', "Pour toute l'équipe : chefs de partie, commis et stagiaires."]
  }
};

export const APP_PAGE_FR = {
  slug: 'fr/application',
  menu: "Télécharger l'application",
  title: 'Savour comme application sur ton téléphone et ton ordinateur | Savour',
  desc: "Installe Savour comme application sur iPhone, Android ou ordinateur, sans boutique d'applications. Tes recettes s'ouvrent même sans internet. Bientôt aussi sur l'App Store et Google Play.",
  h1: 'Savour comme application',
  lead: "Tu installes Savour directement depuis le site. Un geste, et Savour est sur ton écran d'accueil comme une application, même sans internet.",
  open: 'Ouvrir Savour',
  sections: [
    [
      "Sans boutique d'applications",
      "Savour est une application web : rien à télécharger depuis une boutique. Tu ajoutes Savour à ton écran d'accueil et il s'ouvre ensuite comme n'importe quelle application, dans sa propre fenêtre et avec sa propre icône."
    ],
    [
      'iPhone et iPad',
      "Ouvre savour.page dans Safari. Touche Partager en bas (le carré avec la flèche vers le haut), choisis « Sur l'écran d'accueil » et touche « Ajouter »."
    ],
    [
      'Android',
      "Ouvre savour.page dans Chrome. Touche ⋮ en haut à droite et choisis « Installer l'application » ou « Ajouter à l'écran d'accueil ». Si tu es connecté, tu peux aussi utiliser Général → Installer l'application."
    ],
    [
      'Ordinateur',
      "Dans Chrome ou Edge, clique sur l'icône d'installation à droite de la barre d'adresse, ou choisis « Installer l'application » sous Général dans Savour. Sur Mac avec Safari, choisis Fichier → « Ajouter au Dock »."
    ],
    [
      'Aussi sans internet',
      'Connecte-toi une fois avec « Rester connecté » coché et ouvre tes recettes. Savour ouvre ensuite ta bibliothèque même si le wifi de la cuisine lâche. Tu pourras de nouveau modifier dès que la connexion revient.'
    ],
    [
      "Bientôt sur l'App Store et Google Play",
      "Nous travaillons pour proposer Savour aussi sur l'App Store et Google Play. Ton compte et tes recettes restent les mêmes : ce que tu enregistres maintenant dans Savour sera aussi dans l'application de la boutique."
    ]
  ]
};

export const DELIVER_FR = {
  slug: 'fr/envoyer-recettes',
  title: 'Envoyer tes recettes — Savour',
  h1: 'Envoie-nous tes recettes',
  lead: 'Envoie ici tes recettes et indique-nous comment tu veux les organiser. Nous faisons le reste.',
  hello: 'Envoi pour',
  package: 'Formule',
  structureTitle: '1. Comment veux-tu organiser tes recettes ?',
  structureHint: 'Choisis une structure. Tu peux modifier toi-même les dossiers ci-dessous : un dossier par ligne.',
  foldersLabel: 'Dossiers (un par ligne)',
  matchLabel: 'Comment savoir quelle recette va dans quel dossier ?',
  matchPlaceholder: 'Par exemple : chaque fichier Word est une partie, ou le dossier figure en haut de la recette…',
  filesTitle: '2. Envoie tes recettes',
  filesHint:
    "Word, PDF, photos de cahiers et de notes, Excel, fichiers zip ou exports d'autres applications. Jusqu'à 50 Mo par fichier.",
  drop: 'Fais glisser des fichiers ici ou clique pour choisir',
  uploading: 'Envoi en cours…',
  uploaded: 'Envoyé',
  failed: "Échec de l'envoi",
  tooBig: 'Trop volumineux (50 Mo max.)',
  notesTitle: '3. Autre chose à savoir ?',
  notesPlaceholder:
    "Par exemple : des recettes dont tu n'as pas besoin, les abréviations que vous utilisez ou une date souhaitée…",
  submit: 'Envoyer',
  busy: 'Envoi en cours…',
  needFiles: "Envoie d'abord au moins un fichier.",
  thanks:
    'Merci ! Nous avons tout reçu et nous nous y mettons. Nous te prévenons dès que tes recettes sont prêtes. Tu as oublié quelque chose ? Tu peux encore ajouter des fichiers avec ce lien.',
  invalid: "Ce lien n'est pas (ou plus) valide. Écris-nous à contact@savour.page.",
  closed: 'Cet envoi est terminé. Tu veux envoyer autre chose ? Écris-nous à contact@savour.page.',
  privacy: 'Tes fichiers ne sont visibles que par Savour et sont supprimés dès que tes recettes sont chargées.'
};

export const DELIVER_FLOW_FR = {
  resubmit: "Modifier l'envoi",
  payTitle: 'Finalise ta commande',
  payIntro:
    'Ta demande est approuvée. Choisis la taille de ton équipe et paie. Tu nous envoies ensuite tes recettes sur cette page.',
  seatsLabel: 'Taille de ton équipe',
  seats: n => `Équipe ${n}`,
  seatsNote: n => `${n} personnes avec Savour Pro, toi compris`,
  perYear: 'par an',
  service: "Service d'importation",
  once: 'paiement unique',
  free: 'gratuit',
  payButton: 'Payer en toute sécurité',
  payNote:
    "Tu paies via Stripe par iDEAL ou carte. Tu reçois la facture par e-mail. L'abonnement d'équipe est résiliable chaque année.",
  paying: 'Ouverture de la page de paiement…',
  processing: 'Merci ! Nous traitons ton paiement. Cela prend en général quelques secondes…',
  reviewing: 'Nous examinons ta demande. Tu recevras un e-mail dès que tu pourras continuer.',
  rejected: 'Cette demande a malheureusement été refusée. Des questions ? Écris-nous à contact@savour.page.',
  importing: 'Nous chargeons tes recettes. Tu recevras un e-mail dès que ton équipe sera prête.',
  membersTitle: '4. Qui travaille dans ton équipe ?',
  membersHint: n =>
    `Tu as ${n} places : toi et ${n - 1} collègues. Saisis leurs e-mails. Ils recevront un compte avec Savour Pro et un e-mail pour choisir leur mot de passe dès que ton équipe sera prête.`,
  addMember: '＋ Ajouter un collègue',
  memberEmail: 'nom@restaurant.fr',
  roleView: 'Peut consulter',
  roleEdit: 'Peut modifier',
  remove: 'Retirer',
  tooMany: n => `Ton équipe a de la place pour ${n} collègues.`,
  wiped: 'Tes fichiers et données sont supprimés dès que ton équipe est prête.'
};

export const SERVICE_FR = {
  feature: {
    slug: 'fr/service-importation-recettes',
    menu: "Service d'importation",
    short: 'Nous transférons tout ton livre de recettes pour toi, vérifié recette par recette.',
    title: "Service d'importation de recettes : nous numérisons ton livre | Savour",
    desc: 'Pas le temps de transférer tes recettes ? Les cuisiniers de Savour chargent personnellement tout ton livre : classé en dossiers, chaque recette vérifiée, prêt pour ta brigade. Dès 85 €.',
    h1: 'Nous chargeons tout ton livre de recettes pour toi',
    lead: 'Pas le temps de transférer des centaines de recettes ? Les cuisiniers de Savour chargent personnellement toutes les recettes que tu envoies et préparent tout pour que ta brigade démarre aussitôt.',
    sections: [
      [
        'Pourquoi nous le faisons',
        "Le plus grand obstacle pour une cuisine n'est pas l'application, mais le transfert. Trois cents recettes en Word, un classeur taché, les cahiers de l'ancien chef : personne n'a le temps pour cela en plus du service. Alors nous le faisons."
      ],
      [
        "Par des cuisiniers, pas par un centre d'appels",
        "Tes recettes sont chargées par des personnes qui ont travaillé en cuisine. Des personnes qui savent ce qu'est un fond, que 1 cuillère n'est pas 1 litre et que tu veux retrouver ta mise en place par partie. Chaque recette est comparée à l'original et vérifiée."
      ],
      [
        'Tes recettes restent à toi',
        "Les recettes sont le capital de ta cuisine. Nous les utilisons uniquement pour les charger pour toi, nous ne les partageons avec personne et nous supprimons tes fichiers d'origine dès que tout est prêt."
      ]
    ]
  },
  kicker: "Service d'importation",
  bandTitle: 'Pas le temps de tout transférer ? Nous le faisons pour toi.',
  bandText:
    'Les cuisiniers de Savour chargent personnellement toutes tes recettes et préparent tout pour que ta brigade démarre aussitôt. Classé comme vous travaillez, chaque recette vérifiée.',
  bandButton: 'Faire charger mes recettes',
  free: n => `Lancement : nous chargeons gratuitement les ${n} premières cuisines`,
  freeNote: "Tu paies seulement ton abonnement d'équipe. En échange, nous te demandons un avis sincère.",
  includedTitle: 'Ce qui est inclus',
  included: [
    "Toutes tes recettes chargées : Word, PDF, photos de cahiers et de notes, et exports d'autres applications",
    'Une structure de dossiers comme vous travaillez : par partie, menu, saison ou site',
    "Chaque recette vérifiée par rapport à l'original : quantités, unités, rendement et préparation",
    "Des comptes pour toute ton équipe, avec Savour Pro et l'accès aux recettes",
    'Chacun reçoit un e-mail pour choisir son mot de passe dès que tout est prêt',
    'Confidentiel : tes fichiers et données sont supprimés dès que ton équipe est prête'
  ],
  stepsTitle: 'Comment ça marche',
  steps: [
    ['Fais ta demande', "Choisis une formule et remplis la demande. Nous l'examinons et t'écrivons dès que possible."],
    [
      'Paie',
      "Après validation, tu reçois un lien personnel. Choisis la taille de ton équipe et paie l'abonnement et la formule en une fois."
    ],
    [
      'Envoie tes recettes',
      'Envoie tes recettes, indique ta structure de dossiers et saisis les e-mails de tes collègues.'
    ],
    ['Nous les chargeons', 'Nous mettons tout dans les bons dossiers et nous vérifions chaque recette.'],
    [
      'Ton équipe est prête',
      'Chacun reçoit un e-mail pour choisir son mot de passe et peut commencer à cuisiner. Tes données envoyées sont supprimées.'
    ]
  ],
  structureTitle: 'Tu décides de la structure',
  structureText:
    'En envoyant tes recettes, tu nous indiques ta structure de dossiers. Par partie, par type ou par menu ? Nous mettons chaque recette dans le bon dossier.',
  structures: [
    ['Par partie', ['Garde-manger', 'Pâtisserie', 'Rôtisseur', 'Entremetier', 'Saucier']],
    ['Par type', ['Amuse-bouches', 'Mousses', 'Gels', 'Sauces', 'Glaces', 'Croustillants']],
    ['Par menu', ['Menu restaurant novembre', 'Menu banquets novembre', 'Menu de Noël 2026']],
    ['À ta façon', ['Exactement comme tu veux']]
  ],
  choose: 'Choisir cette formule',
  close: 'Fermer',
  payNote:
    "Nous examinons ta demande et t'écrivons dès que possible. Après validation, tu reçois un lien personnel pour payer et envoyer tes recettes.",
  priceTitle: 'Tarif',
  priceIntro:
    "Paiement unique, avec un abonnement annuel Équipe 5 (89 €), 10 (149 €) ou 25 (299 €) au choix. Tu ne paies qu'après validation.",
  tier: n => `Jusqu'à ${n} recettes`,
  tierMore: 'Plus de 1 000 recettes',
  custom: 'Sur devis',
  example:
    'Exemple : 250 recettes dans une équipe de cuisine pour 5 cuisiniers = 100 € en une fois + Équipe 5 à 89 € par an.',
  form: {
    title: 'Demander le chargement',
    subject: "Demande de service d'importation",
    restaurant: 'Restaurant ou entreprise',
    package: 'Formule',
    packageMore: 'Plus de 1 000 recettes (sur devis)',
    team: "Quel abonnement d'équipe ?",
    teamOptions: ['Équipe 5', 'Équipe 10', 'Équipe 25', 'Je ne sais pas encore'],
    message: 'Remarques',
    placeholder: 'Par exemple : le format de tes recettes ou pour quand tu le souhaites…',
    send: 'Envoyer la demande'
  },
  proTitle: 'Tu préfères que nous chargions tes recettes ?',
  proText:
    "Avec le service d'importation, les cuisiniers de Savour transfèrent personnellement tout ton livre et préparent tout pour ton équipe. Dès 85 € en une fois, avec un abonnement d'équipe au choix.",
  requestOk:
    "Merci ! Ta demande a été envoyée. Tu recevras une confirmation par e-mail et nous t'écrirons dès que possible.",
  faqs: [
    [
      'Pouvez-vous charger mes recettes pour moi ?',
      "Oui. Avec le service d'importation, les cuisiniers de Savour transfèrent personnellement tout ton livre : chargé, classé dans tes dossiers et chaque recette vérifiée. Dès 85 € en une fois, avec un abonnement annuel Équipe 5, 10 ou 25. Nous chargeons gratuitement les 5 premières cuisines."
    ],
    [
      "Comment fonctionne le service d'importation ?",
      "Tu fais ta demande sur le site. Après validation, tu reçois un lien personnel : tu paies l'abonnement d'équipe et la formule, puis tu nous envoies tes recettes, ta structure de dossiers et les e-mails de tes collègues. Nous chargeons et vérifions tout. Dès que ton équipe est prête, chacun reçoit un e-mail pour choisir son mot de passe."
    ],
    [
      "Que deviennent les fichiers que j'envoie ?",
      'Ils sont conservés dans un stockage privé visible uniquement par Savour et supprimés avec tes autres données dès que ton équipe est prête. Ensuite, tes recettes ne sont plus que dans ton équipe sur Savour.'
    ],
    [
      'Mes collègues doivent-ils créer un compte ?',
      "Non. Avec le service d'importation, nous créons les comptes pour les e-mails que tu nous donnes. Chacun reçoit Savour Pro via ton équipe et un e-mail pour choisir son mot de passe."
    ]
  ]
};

export const KLADJE_FR = {
  title: 'Guimauve',
  meta: 'Pâtisserie',
  ingredientsTitle: 'Ingrédients',
  stepsTitle: 'Préparation',
  ingredients: [
    "300 g de blancs d'œufs",
    '150 g de sucre',
    '25 g de glucose',
    '200 g de jus de fruit de la passion',
    '48 g de gélatine'
  ],
  steps: [
    ['Hydrater la gélatine.', "Fais tremper les feuilles de gélatine dans beaucoup d'eau froide."],
    [
      'Cuire le sirop.',
      "Mets le sucre, le sirop de glucose et l'eau dans une casserole. Porte à ébullition et cuis jusqu'à environ 121 °C."
    ],
    [
      'Monter les blancs.',
      "Commence à monter les blancs dès que le sirop est presque à température. Monte jusqu'à obtenir une mousse légère, encore assez souple pour absorber le sirop chaud."
    ],
    [
      'Ajouter le sirop.',
      'Verse le sirop chaud en filet fin sur les blancs tout en battant. Verse-le le long de la paroi du bol et non directement sur les fouets, pour éviter les projections et les cristaux de sucre.'
    ],
    [
      'Dissoudre la gélatine.',
      "Fais fondre délicatement la gélatine essorée dans le coulis de passion. Ajoute-le à la masse de guimauve chaude, batteur en marche. Continue de battre jusqu'à ce que la masse soit légère et commence à refroidir, mais reste assez fluide pour être travaillée."
    ]
  ],
  stepsNote: "La préparation ne figurait pas sur la note. Le chef l'a ajoutée : Savour n'invente rien.",
  before: 'Note',
  after: 'Dans Savour',
  heading: 'De la note griffonnée à la recette qui fonctionne.',
  caption: 'Une vraie note de notre cuisine, et la même recette dans Savour.',
  alt: 'Recette de guimauve écrite à la main sur du papier ligné, avec des taches'
};
