// Manuel (Frans), section « Partager et équipes de cuisine ».

export const groups = {
  samenwerken: {
    name: 'Partager et équipes de cuisine',
    intro: 'Envoyer vite une recette, ou un livre de recettes pour toute ta brigade avec rôles, dossiers et invitations.'
  }
};

export const pages = {
  keukenteams: {
    slug: 'fr/manuel-partager-et-equipes-de-cuisine',
    menu: 'Vue d’ensemble : partager et équipes de cuisine',
    h1: 'Partager et équipes de cuisine',
    title: 'Partager des recettes et équipes de cuisine avec rôles | Manuel Savour',
    desc: 'Comment partager des recettes dans Savour : un lien par WhatsApp, Telegram, SMS ou e-mail, et des équipes de cuisine avec les rôles propriétaire, éditeur et lecteur pour toute ta brigade.',
    lead: 'Envoyer vite une recette, ou un livre de recettes pour toute ta brigade.',
    sections: [
      ['Partager une recette', 'Envoie une recette sous forme de lien, même à quelqu’un sans compte, et décide combien de temps le lien fonctionne. Voir [Partager une recette avec un lien](#delen-link).'],
      ['Une équipe de cuisine', 'Une équipe de cuisine est le livre de recettes de ta cuisine. Chaque membre voit les mêmes recettes sur son téléphone, sa tablette ou son ordinateur. Quand l’auteur modifie une recette, tout le monde voit aussitôt la nouvelle version.'],
      [
        'Tout sur les équipes de cuisine',
        'Étape par étape :',
        [
          '[Créer une équipe de cuisine](#keukenteam-maken)',
          '[Rôles : propriétaire, éditeur et lecteur](#keukenteam-rollen)',
          '[Inviter ton équipe](#keukenteam-uitnodigen)',
          '[Recettes et dossiers dans l’équipe](#keukenteam-mappen)',
          '[Copier la recette d’un collègue](#recept-overnemen)',
          '[Quitter, supprimer et Savour Pro](#keukenteam-verlaten)'
        ]
      ],
      ['Ce que ça coûte', 'Créer une équipe de cuisine nécessite [Savour Pro](#gratis-en-pro). Être membre est gratuit. Pour toute une cuisine avec Pro pour tous, il existe un [abonnement organisation](#organisatie).'],
      ['En savoir plus', 'Ce qu’un livre de recettes partagé apporte à ton équipe : [Livre de recettes partagé pour ton équipe](/blog/gedeeld-receptenboek-keukenteam) et [Les équipes de cuisine expliquées](/blog/gedeelde-mappen-uitgelegd).']
    ]
  },
  'delen-link': {
    slug: 'fr/manuel-partager-une-recette-avec-un-lien',
    menu: 'Partager une recette avec un lien',
    title: 'Partager une recette par WhatsApp, Telegram, SMS ou e-mail | Manuel Savour',
    desc: 'Comment partager une recette Savour avec un lien : par WhatsApp, Telegram, SMS ou e-mail, avec limite de temps, désactivation du lien et possibilité de copie pour les destinataires.',
    lead: 'Une recette pour un collègue, un fournisseur ou un stagiaire, même sans compte.',
    sections: [
      ['Partager', 'Ouvre la recette et choisis « Partager ». Envoie-la directement par WhatsApp, Telegram, SMS ou e-mail, ou copie le lien. Dans WhatsApp, la recette s’affiche avec sa propre image d’aperçu.'],
      ['Ce que voit le destinataire', 'Qui ouvre le lien voit la recette, même sans compte. Il peut la [convertir](#omrekenen) et utiliser le [mode cuisine](#kookmodus), mais pas la modifier.'],
      ['Combien de temps le lien fonctionne', 'Dans « Pour combien de temps ? », choisis 1 heure, 1 jour, 1 semaine ou illimité. Ensuite, le lien ne fonctionne plus.'],
      ['Désactiver le lien', 'Avec « Désactiver le lien », plus personne ne peut ouvrir la recette via ce lien, même si le délai n’est pas écoulé.'],
      ['Permettre la copie', 'Si tu actives « Les destinataires peuvent copier cette recette », les destinataires avec un compte peuvent l’ajouter à leurs recettes comme copie personnelle. Ta recette ne change pas.'],
      ['Avec toute ton équipe', 'Si tu partages souvent des recettes avec les mêmes personnes, utilise une [équipe de cuisine](#keukenteams) : plus besoin de garder des liens.']
    ]
  },
  'keukenteam-maken': {
    slug: 'fr/manuel-creer-une-equipe-de-cuisine',
    menu: 'Créer une équipe de cuisine',
    title: 'Créer une équipe de cuisine dans Savour | Manuel',
    desc: 'Comment créer une équipe de cuisine dans Savour : nom et image, ajouter des recettes, créer des dossiers et inviter ton équipe. Avec Savour Pro, aussi pendant l’essai.',
    lead: 'En cinq minutes, un livre de recettes pour toute ta cuisine.',
    sections: [
      ['La créer', 'Dans le menu, sous Équipes de cuisine, choisis « Créer une équipe de cuisine » et donne-lui un nom, comme celui de ton restaurant ou de ta cuisine. Cela fonctionne avec [Savour Pro](#gratis-en-pro), aussi pendant la semaine d’essai gratuite.'],
      ['Paramètres', 'Dans les paramètres de l’équipe, tu modifies sous Général le nom et l’image. Sous Partager se trouve le lien d’invitation, et sous « Membres et droits » tu gères qui en fait partie.'],
      ['Ajouter des recettes', 'Choisis « Ajouter une recette » et coche des recettes de ta bibliothèque. La recette reste à toi : elle est dans l’équipe et dans tes recettes. Voir [Recettes et dossiers dans l’équipe](#keukenteam-mappen).'],
      ['Inviter des personnes', 'Envoie à ton équipe une invitation par WhatsApp, Telegram, e-mail ou lien. Voir [Inviter ton équipe](#keukenteam-uitnodigen).'],
      ['Par quoi commencer', 'Commence par les recettes de base que tout le monde utilise chaque jour, comme fonds, sauces et garnitures fixes. Élargis ensuite par partie ou par menu.']
    ]
  },
  'keukenteam-rollen': {
    slug: 'fr/manuel-roles-dans-l-equipe',
    menu: 'Rôles : propriétaire, éditeur et lecteur',
    title: 'Rôles dans une équipe de cuisine : propriétaire, éditeur et lecteur | Manuel',
    desc: 'Qui peut faire quoi dans une équipe de cuisine Savour : le propriétaire gère, l’éditeur ajoute recettes et dossiers, le lecteur consulte, imprime et convertit.',
    lead: 'Tu gères, ton second modifie, le reste consulte.',
    sections: [
      [
        'Les trois rôles',
        'Chaque membre a un rôle :',
        [
          'Propriétaire : gère l’équipe, ses membres et leurs rôles. Seul le propriétaire retire des personnes de l’équipe.',
          'Éditeur : ajoute des recettes et des dossiers, les retire et gère les dossiers.',
          'Lecteur : consulte, imprime et convertit.'
        ]
      ],
      ['Changer un rôle', 'Les nouveaux membres arrivent comme lecteurs. Le propriétaire change leur rôle dans « Membres et droits », dans les paramètres de l’équipe.'],
      ['Modifier une recette', 'Seul l’auteur peut modifier une recette, aussi dans une équipe. Ainsi personne ne modifie par erreur la fiche d’un autre. Les autres peuvent [en copier une version](#recept-overnemen).'],
      ['Quel rôle pour qui', 'Une répartition courante : le chef est propriétaire, seconds et chefs de partie sont éditeurs, commis et stagiaires sont lecteurs.']
    ]
  },
  'keukenteam-uitnodigen': {
    slug: 'fr/manuel-inviter-ton-equipe',
    menu: 'Inviter ton équipe',
    title: 'Inviter ton équipe de cuisine par WhatsApp, e-mail ou lien | Manuel Savour',
    desc: 'Comment inviter des cuisiniers dans ton équipe Savour : par WhatsApp, Telegram, e-mail ou lien d’invitation. Être membre est gratuit, même sans Savour Pro.',
    lead: 'Toute ta brigade à bord avec un seul message dans le groupe.',
    sections: [
      ['Inviter', 'Ouvre les paramètres de l’équipe et choisis sous Partager « Partager / inviter ». Envoie l’invitation par WhatsApp, Telegram ou e-mail, ou choisis « Copier le lien » et poste-le dans votre groupe.'],
      ['Ce que fait le collègue', 'Ton collègue ouvre le lien et se connecte, ou [crée un compte gratuit](#account-maken). Il devient alors membre de l’équipe comme lecteur.'],
      ['Gratuit pour les membres', 'Être membre d’une équipe de cuisine est gratuit, même sans Savour Pro. Seul le propriétaire a besoin de Pro.'],
      ['Adapter le rôle', 'Donne ensuite à ton second le rôle d’éditeur. Voir [Rôles](#keukenteam-rollen).'],
      ['Retirer quelqu’un', 'Quand quelqu’un part, le propriétaire le retire de l’équipe dans « Membres et droits ». Il garde ses propres recettes ; celles de l’équipe, il ne les voit plus.']
    ]
  },
  'keukenteam-mappen': {
    slug: 'fr/manuel-recettes-et-dossiers-de-l-equipe',
    menu: 'Recettes et dossiers dans l’équipe',
    title: 'Recettes et dossiers dans une équipe de cuisine : gérer et archiver | Manuel',
    desc: 'Comment organiser une équipe de cuisine dans Savour : ajouter des recettes, dossiers par partie ou par menu, gérer, ordonner et archiver les dossiers, et imprimer l’équipe.',
    lead: 'Le livre de recettes de ta cuisine, organisé comme travaille ta brigade.',
    sections: [
      ['Ajouter des recettes', 'Dans l’équipe, choisis « Ajouter une recette » et coche des recettes de ta bibliothèque. La recette reste à toi et figure à la fois dans l’équipe et dans tes recettes. Si tu la modifies, l’équipe voit aussitôt la nouvelle version.'],
      ['Dossiers', 'Divise l’équipe en dossiers, par partie (garde-manger, saucier, pâtisserie) ou par menu. Un propriétaire ou un éditeur crée les dossiers et y met des recettes.'],
      ['Gérer les dossiers', '« Gérer les dossiers » permet de renommer, d’ordonner les dossiers comme ta cuisine et d’archiver ceux que tu n’utilises plus, comme la carte de la saison passée.'],
      ['Archives', 'Les dossiers archivés et leurs recettes sont conservés. Tu les trouves en bas, dans « Archives ».'],
      ['Retirer de l’équipe', 'Ouvre une recette depuis l’équipe et choisis ⋯ « Retirer de l’équipe de cuisine » ou « Retirer du dossier ». La recette reste à son auteur.'],
      ['Imprimer', 'Imprime toute l’équipe, un dossier ou ta sélection en une fois, avec le logo du propriétaire. Voir [Imprimer plusieurs recettes](#printen-map).']
    ]
  },
  'recept-overnemen': {
    slug: 'fr/manuel-copier-une-recette',
    menu: 'Copier la recette d’un collègue',
    title: 'Copier la recette d’un collègue à ton nom | Manuel Savour',
    desc: 'Comment copier dans Savour la recette d’un collègue : « Ajouter à mes recettes » te donne une copie modifiable. L’original reste à son auteur.',
    lead: 'Ta propre version de la recette d’un collègue, sans toucher à l’original.',
    sections: [
      ['Dans une équipe de cuisine', 'Pour chaque recette d’un collègue dans l’équipe, tu vois « Ajouter à mes recettes ». Tu obtiens ta propre copie dans ta bibliothèque.'],
      ['Via un lien partagé', 'Si l’auteur a activé « Les destinataires peuvent copier cette recette » au moment du [partage](#delen-link), tu peux l’ajouter depuis le lien avec ton compte.'],
      ['Ta copie', 'Ta copie est entièrement à toi : tu peux la [modifier](#recept-maken), la ranger dans tes [dossiers](#mappen) et la convertir. L’original reste à l’auteur et ne change pas.']
    ]
  },
  'keukenteam-verlaten': {
    slug: 'fr/manuel-quitter-ou-supprimer-une-equipe',
    menu: 'Quitter, supprimer et Savour Pro',
    title: 'Quitter ou supprimer une équipe de cuisine, et Savour Pro | Manuel',
    desc: 'Ce qui se passe quand tu quittes ou supprimes une équipe de cuisine Savour, et ce qu’il advient de l’équipe si le propriétaire arrête Savour Pro.',
    lead: 'Ce que deviennent les recettes quand quelqu’un part ou arrête.',
    sections: [
      ['Quitter', 'Un membre peut toujours quitter une équipe. Tu gardes tes propres recettes ; celles des autres, tu ne les vois plus. Pour en garder une, [copie-la avant](#recept-overnemen).'],
      ['Supprimer', 'Seul le propriétaire peut supprimer l’équipe, sous Général dans les paramètres. Les recettes restent dans la bibliothèque de leur auteur.'],
      ['Si le propriétaire arrête Pro', 'Une équipe fonctionne tant que le propriétaire a [Savour Pro](#gratis-en-pro), y compris pendant l’essai. Si cela s’arrête, l’équipe est verrouillée, mais tout est conservé jusqu’à ce que le propriétaire reprenne Pro.']
    ]
  },
  'collega-uitnodigen': {
    slug: 'fr/manuel-inviter-un-collegue',
    menu: 'Inviter un collègue : 14 jours de Pro',
    title: 'Inviter un collègue et recevoir 14 jours de Savour Pro | Manuel',
    desc: 'Comment inviter un collègue sur Savour avec ton lien personnel et recevoir 14 jours de Savour Pro en cadeau quand il crée un compte et se connecte.',
    lead: 'Partage Savour avec un collègue et reçois Pro en retour.',
    sections: [
      ['Ton lien personnel', 'Dans le menu, sous Général, choisis « Inviter un collègue ». Copie ton lien personnel ou partage-le par WhatsApp ou une autre application.'],
      ['Quand tu reçois le cadeau', 'Quand ton collègue crée un compte avec ton lien, confirme son adresse e-mail et se connecte, tu reçois 14 jours de Savour Pro. Ton collègue reçoit l’essai normal de 7 jours.'],
      ['Si tu paies déjà Pro', 'Avec un abonnement payant, tu reçois les 14 jours en crédit sur ta prochaine facture. Si tu as résilié, ils commencent après ta période payée.'],
      ['Combien de fois', 'Le cadeau vaut pour les nouveaux comptes, une fois par collègue, jusqu’à 12 fois. Dans « Inviter un collègue », tu vois combien de collègues tu as invités.']
    ]
  }
};
