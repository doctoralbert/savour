// Manuel (Frans), section « Imprimer et télécharger ».

export const groups = {
  printen: {
    name: 'Imprimer et télécharger',
    intro: 'Une recette seule, un dossier entier pour le passe ou toutes tes recettes, avec le logo de ton restaurant. Et télécharger tes recettes en Word ou en sauvegarde.'
  }
};

export const pages = {
  printen: {
    slug: 'fr/manuel-imprimer',
    menu: 'Imprimer une recette',
    title: 'Imprimer une recette, aussi convertie | Manuel Savour',
    desc: 'Comment imprimer une recette dans Savour : la mise en page avec quantités en gras, imprimer converti et en A4 ou A5. Aussi pour qui ouvre une recette partagée.',
    lead: 'Une recette seule pour le mur ou le classeur du passe.',
    sections: [
      ['Imprimer', 'Ouvre la recette et choisis « Imprimer ». Savour ouvre la mise en page d’impression : nom, rendement, ingrédients avec quantités en gras et préparation par étapes. Choisis ensuite ton imprimante ou enregistre en PDF.'],
      ['Imprimer converti', 'Si tu as [converti](#omrekenen) la recette, tu imprimes les quantités converties. Pratique pour une grosse production ou un événement.'],
      ['Parties de la recette', 'Si la recette comporte des [parties](#recept-delen), chaque partie apparaît avec son nom au-dessus de ses ingrédients et de sa préparation.'],
      ['Plusieurs recettes à la fois', 'Un dossier entier, une équipe de cuisine ou ta propre sélection s’impriment en une fois : voir [Imprimer plusieurs recettes](#printen-map).'],
      ['Avec ton logo', 'Avec Savour Pro, le logo de ton restaurant figure sur tes impressions. Voir [Imprimer avec ton logo](#printen-logo).']
    ]
  },
  'printen-map': {
    slug: 'fr/manuel-imprimer-un-dossier-de-recettes',
    menu: 'Imprimer plusieurs recettes ou un dossier',
    title: 'Imprimer un dossier de recettes entier avec couverture et sommaire | Manuel',
    desc: 'Comment imprimer dans Savour un dossier, une équipe de cuisine ou toutes tes recettes en une fois : choisir les recettes, couverture et sommaire, A5, photos et notes.',
    lead: 'Tout ton classeur de recettes pour le passe, en une fois.',
    sections: [
      ['Ce que tu peux imprimer', 'Imprime un [dossier de recettes](#mappen), une [équipe de cuisine](#keukenteams) ou toutes tes recettes à la fois. Toutes tes recettes s’impriment dans Mon compte → Compte avec « Imprimer toutes les recettes ».'],
      ['Choisir les recettes', 'Dans « Quelles recettes veux-tu imprimer ? », coche les recettes à inclure. « Tous » ou « Aucune » permettent de démarrer vite.'],
      [
        'Options',
        'Choisis l’aspect de l’impression :',
        [
          '« Avec couverture et sommaire » : une couverture, un sommaire et le numéro de chaque recette en bas de page, pour feuilleter vite.',
          '« A5, pour un petit classeur au passe » au lieu de A4.',
          '« Avec photos » : la photo de chaque recette.',
          '« Avec les notes » : tes [notes](#recept-notities) sur chaque recette.'
        ]
      ],
      ['Astuce pour le passe', 'Imprime en A5 pour un petit classeur à anneaux ou des pochettes. Si une recette change, réimprime seulement celle-là.']
    ]
  },
  'printen-logo': {
    slug: 'fr/manuel-imprimer-avec-ton-logo',
    menu: 'Imprimer avec le logo de ton restaurant',
    title: 'Imprimer tes recettes avec le logo de ton restaurant | Manuel Savour',
    desc: 'Comment mettre le logo de ton restaurant sur tes recettes imprimées dans Savour : logo et nom, noir et blanc pour l’imprimante de cuisine et logo par équipe de cuisine.',
    lead: 'Ton propre livre de recettes, avec ton nom et ton logo.',
    sections: [
      ['Le configurer', 'Va dans Mon compte → Logo sur les impressions. Choisis ton logo et saisis le nom qui figure sur l’impression. Cela fonctionne avec [Savour Pro](#gratis-en-pro), aussi pendant la semaine d’essai.'],
      ['Noir et blanc', 'Choisis d’imprimer le logo en noir et blanc pour une imprimante de cuisine ou si ton logo en couleur est trop chargé sur papier.'],
      ['Tes impressions et les équipes', 'Tu choisis si le logo figure sur tes propres impressions. Pour chaque équipe de cuisine, tu l’actives ou le désactives dans le même onglet ou dans les paramètres de l’équipe. Dans une équipe, c’est le logo du propriétaire qui figure sur les impressions, pour que toute l’équipe ait les mêmes.'],
      ['En savoir plus', 'Pourquoi un livre de recettes avec ton logo fonctionne : [Livre de recettes avec ton logo](/blog/receptenboek-met-eigen-logo).']
    ]
  },
  downloaden: {
    slug: 'fr/manuel-telecharger-tes-recettes',
    menu: 'Télécharger les recettes : Word et sauvegarde',
    title: 'Télécharger tes recettes en Word ou en sauvegarde | Manuel Savour',
    desc: 'Comment télécharger toutes tes recettes depuis Savour : chaque recette en fichier Word dans un ZIP, tout dans un fichier Word ou une sauvegarde JSON à réimporter.',
    lead: 'Tes recettes t’appartiennent. Télécharge-les quand tu veux.',
    sections: [
      ['Où', 'Va dans Mon compte → Compte, dans « Imprime ou télécharge toutes tes recettes ». Le téléchargement fonctionne avec [Savour Pro](#gratis-en-pro).'],
      [
        'Trois façons',
        'Choisis ce qu’il te faut :',
        [
          '« Word par recette » : chaque recette dans son fichier Word avec la mise en page d’impression, ensemble dans un .zip.',
          '« Tout dans un seul fichier Word » : mise en page simple avec titre, rendement, ingrédients et préparation.',
          '« Sauvegarde » : recettes et dossiers dans un fichier JSON.'
        ]
      ],
      ['Restaurer une sauvegarde', 'Une sauvegarde se réimporte dans Savour via « Autres fichiers ». Voir [JSON et sauvegardes](#import-json).'],
      ['Sans Pro', 'Sans Pro, tes recettes restent toujours dans Savour, et tu peux les consulter et les [imprimer](#printen-map). Arrêter Pro ne te coûte jamais de recettes : voir [Arrêter Savour Pro](#pro-stoppen).']
    ]
  }
};
