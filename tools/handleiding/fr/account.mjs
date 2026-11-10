// Manuel (Frans), section « Compte et abonnement ».

export const groups = {
  account: {
    name: 'Compte et abonnement',
    intro: 'Ton profil, l’apparence et la langue, ce qui est gratuit et ce qu’ajoute Savour Pro, les organisations, résilier et supprimer ton compte.'
  }
};

export const pages = {
  'gratis-en-pro': {
    slug: 'fr/manuel-compte-et-pro',
    menu: 'Gratuit et Savour Pro',
    title: 'Gratuit ou Savour Pro : ce qui est inclus et le prix | Manuel',
    desc: 'Ce que tu peux faire gratuitement dans Savour et ce qu’ajoute Savour Pro : recettes illimitées, IA pour les photos, équipes de cuisine, impression avec logo et téléchargement. 2,99 € par mois.',
    lead: 'Ce qui est gratuit, ce qu’ajoute Savour Pro et comment fonctionne la semaine d’essai.',
    sections: [
      ['Gratuit', 'Un compte gratuit enregistre jusqu’à 100 recettes, lit Word, PDF, texte et les exports d’autres applications avec le lecteur Savour, convertit, a le mode cuisine, imprime et peut être membre d’équipes de cuisine.'],
      [
        'Savour Pro',
        'Savour Pro coûte 2,99 € par mois ou 29 € par an et ajoute :',
        [
          'Des recettes illimitées.',
          'L’IA pour [les photos, l’écriture manuscrite et les cas douteux](#import-ai), jusqu’à 150 importations par mois.',
          '[Créer toi-même des équipes de cuisine](#keukenteam-maken) et inviter ton équipe.',
          '[Imprimer avec le logo de ton restaurant](#printen-logo).',
          '[Télécharger en Word ou en sauvegarde](#downloaden).',
          'Pas de publicité dans l’application.'
        ]
      ],
      ['La semaine d’essai', 'Les nouveaux comptes reçoivent 7 jours de Savour Pro gratuits, sans données de paiement. Pendant l’essai aussi, tu enregistres jusqu’à 100 recettes.'],
      ['Payer', 'Tu paies par iDEAL, carte bancaire, Apple Pay, Google Pay ou PayPal. Aucune TVA n’est facturée (régime néerlandais des petites entreprises). Tu peux résilier à tout moment ; Pro reste actif jusqu’à la fin de la période payée.'],
      ['Pour toute une cuisine', 'Si tout le monde dans ta cuisine doit avoir Pro, choisis une [organisation](#organisatie). Tous les prix sont sur [Savour Pro](/savour-pro).']
    ]
  },
  organisatie: {
    slug: 'fr/manuel-abonnement-organisation',
    menu: 'Organisations : Pro pour toute la cuisine',
    title: 'Un abonnement organisation : Savour Pro pour toute ta cuisine | Manuel',
    desc: 'Savour pour toute une cuisine : des organisations pour 5, 10 ou 25 personnes, toutes avec Savour Pro. Comment inviter ton équipe et gérer les places.',
    lead: 'Savour Pro pour tout le monde dans ta cuisine, avec un seul abonnement.',
    sections: [
      ['Ce que c’est', 'Avec une organisation, chaque membre de ton équipe a Savour Pro. Il existe des abonnements pour 5, 10 ou 25 personnes : 8,99 €, 14,99 € ou 29,99 € par mois.'],
      ['Mise en place', 'Choisis une organisation sur la page [Savour Pro](/savour-pro) ou va dans Mon compte → Savour Pro. Invite là ton équipe sur les places.'],
      ['Organisation ou équipe de cuisine', 'Une organisation détermine qui a Pro. Une [équipe de cuisine](#keukenteams) détermine quelles recettes vous partagez. Pour une équipe qui partage des recettes, un propriétaire avec Pro suffit ; avec une organisation, chacun peut aussi faire lire des photos, créer des équipes de cuisine et imprimer avec logo.']
    ]
  },
  'abonnement-beheren': {
    slug: 'fr/manuel-gerer-l-abonnement',
    menu: 'Gérer ton abonnement',
    title: 'Gérer ton abonnement Savour Pro et tes factures | Manuel',
    desc: 'Comment gérer ton abonnement dans Savour : souscrire à Pro, choisir mensuel ou annuel, données de paiement et factures, et le logo de tes impressions.',
    lead: 'Tout sur ton abonnement au même endroit : Mon compte → Savour Pro.',
    sections: [
      ['Où', 'Va dans Mon compte → Savour Pro. Tu y vois si tu as Savour Pro, une semaine d’essai ou une organisation, et jusqu’à quand.'],
      ['Souscrire à Pro', 'Choisis Savour Pro au mois ou à l’année et paie par iDEAL, carte bancaire, Apple Pay, Google Pay ou PayPal. Pro est actif dès le paiement.'],
      ['Modifier et factures', 'Sous Savour Pro, choisis « Gérer l’abonnement ». Tu y modifies tes données de paiement, consultes tes factures et résilies.'],
      ['Logo sur les impressions', 'Le [logo de tes impressions](#printen-logo) se configure dans l’onglet « Logo sur les impressions ».']
    ]
  },
  'pro-stoppen': {
    slug: 'fr/manuel-arreter-pro',
    menu: 'Arrêter Savour Pro',
    title: 'Arrêter Savour Pro : tes recettes sont conservées | Manuel',
    desc: 'Ce qui se passe quand tu arrêtes Savour Pro : toutes tes recettes sont conservées, seul l’ajout au-delà de 100 n’est plus possible, et ton équipe de cuisine est verrouillée jusqu’à ce que tu reprennes Pro.',
    lead: 'Tu gardes toujours tout. Voici ce qui change.',
    sections: [
      ['Résilier', 'Résilie via Mon compte → Savour Pro. Pro reste actif jusqu’à la fin de la période payée.'],
      ['Tes recettes restent', 'Si tu arrêtes Pro, toutes tes recettes sont conservées, même s’il y en a plus de 100. Tu peux les consulter, les convertir et les imprimer. Seul l’ajout de nouvelles recettes au-delà de 100 n’est plus possible.'],
      ['Ton équipe de cuisine', 'Une équipe dont tu es propriétaire est verrouillée tant que tu n’as pas Pro. Tout est conservé ; avec Pro, elle refonctionne. Voir [Quitter, supprimer et Savour Pro](#keukenteam-verlaten).'],
      ['Après la semaine d’essai', 'Après la semaine d’essai gratuite, c’est pareil : tout ce que tu as créé est conservé.']
    ]
  },
  'account-profiel': {
    slug: 'fr/manuel-mon-compte',
    menu: 'Mon compte : profil et mot de passe',
    title: 'Mon compte : nom, photo de profil et mot de passe | Manuel Savour',
    desc: 'Comment gérer ton compte dans Savour : modifier ton nom et ta photo de profil, changer ton mot de passe, te déconnecter et les autres onglets de Mon compte.',
    lead: 'Ton profil et les réglages de ton compte au même endroit.',
    sections: [
      ['Où', 'Choisis Paramètres dans le menu, ou sur téléphone l’icône de Mon compte en haut. Mon compte comporte les onglets Compte, Savour Pro, Logo sur les impressions, Apparence, Catégories et Nettoyer.'],
      ['Profil', 'Sous Compte, tu modifies ton nom et ta photo de profil. Recadre la photo pour que ton visage soit bien cadré.'],
      ['Mot de passe', 'Choisis un nouveau mot de passe sous Compte. Si tu l’as oublié, utilise « Mot de passe oublié ? » à la [connexion](#inloggen).'],
      ['Aussi sous Compte', 'Tu peux y [imprimer ou télécharger toutes tes recettes](#downloaden), [inviter un collègue](#collega-uitnodigen), [installer l’application](#app-installeren), te déconnecter et [supprimer ton compte](#account-verwijderen).'],
      ['Les autres onglets', '[Savour Pro](#abonnement-beheren), [Logo sur les impressions](#printen-logo), [Apparence](#weergave-en-taal), [Catégories](#categorieen) et [Nettoyer](#opschonen).']
    ]
  },
  'weergave-en-taal': {
    slug: 'fr/manuel-apparence-et-langue',
    menu: 'Thème sombre ou clair et langue',
    title: 'Thème sombre ou clair et langue de Savour | Manuel',
    desc: 'Comment choisir dans Savour le thème sombre ou clair et la langue : néerlandais, anglais, allemand, espagnol ou français. Tes recettes ne sont jamais traduites.',
    lead: 'Pour que Savour se lise au mieux dans ta cuisine.',
    sections: [
      ['Sombre ou clair', 'Savour est par défaut sombre et or. Choisis « Sombre » ou « Clair » dans Mon compte → Apparence, ou bascule avec le bouton en haut. Ton choix est enregistré dans ton compte, donc aussi sur tes autres appareils.'],
      ['Langue', 'Avec le bouton de langue en haut, tu mets Savour en néerlandais, anglais, allemand, espagnol ou français. Les boutons et explications changent avec.'],
      ['Tes recettes restent telles quelles', 'Les recettes et les noms ne sont jamais traduits. Une recette en néerlandais reste en néerlandais, même si tu utilises Savour en français.']
    ]
  },
  'account-verwijderen': {
    slug: 'fr/manuel-supprimer-ton-compte',
    menu: 'Supprimer ton compte',
    title: 'Supprimer définitivement ton compte Savour | Manuel',
    desc: 'Comment supprimer ton compte Savour : ce qui est supprimé, ce que tu peux télécharger avant et pourquoi c’est irréversible.',
    lead: 'Supprimé, c’est supprimé. Télécharge d’abord ce que tu veux garder.',
    sections: [
      ['Télécharger d’abord', 'Pour garder tes recettes, [télécharge-les avant](#downloaden) en Word ou en sauvegarde, ou [imprime-les](#printen-map).'],
      ['Supprimer', 'Va dans Mon compte → Compte et choisis en bas « Supprimer définitivement le compte ». Savour te demande d’abord si tu es sûr.'],
      ['Ce qui est supprimé', 'Tes recettes personnelles, dossiers, favoris et données de profil. C’est irréversible.'],
      ['Un abonnement', 'Si tu as Savour Pro, [résilie-le d’abord](#pro-stoppen) sous Savour Pro.']
    ]
  },
  'privacy-en-veiligheid': {
    slug: 'fr/manuel-confidentialite-et-tes-recettes',
    menu: 'Tes recettes, confidentialité et sécurité',
    title: 'Tes recettes, confidentialité et sécurité dans Savour | Manuel',
    desc: 'À qui appartiennent tes recettes dans Savour, qui peut les voir, où elles sont stockées et comment tu peux toujours les emporter. Avec un lien vers la politique de confidentialité.',
    lead: 'Tes recettes t’appartiennent. Voici comment Savour les traite.',
    sections: [
      ['À toi', 'Tes recettes t’appartiennent. Savour ne supprime jamais rien sans que tu le demandes, et tu peux toujours les emporter.'],
      ['Qui les voit', 'Toi seul vois tes propres recettes et dossiers. Les recettes que tu mets dans une [équipe de cuisine](#keukenteams) sont visibles par cette équipe. Un [lien partagé](#delen-link) s’ouvre pour quiconque l’a, tant qu’il fonctionne.'],
      ['Où elles sont', 'Tes recettes sont dans le cloud, pour que tu y accèdes sur chaque appareil. Les recettes que tu as ouvertes sont aussi sur ton appareil pour l’[usage hors ligne](#offline).'],
      ['Les emporter', 'Avec Savour Pro, tu [télécharges toutes tes recettes](#downloaden) quand tu veux.'],
      ['En savoir plus', 'Tout sur les données que Savour enregistre et avec qui il travaille se trouve dans la [politique de confidentialité](/privacy).']
    ]
  }
};
