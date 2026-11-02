// Manuel (Frans), section « Classer et retrouver ».

export const groups = {
  ordenen: {
    name: 'Classer et retrouver',
    intro: 'Retrouver tes recettes parmi des centaines : recherche, catégories avec mots-clés, dossiers, favoris et nettoyage.'
  }
};

export const pages = {
  ordenen: {
    slug: 'fr/manuel-classer-et-chercher',
    menu: 'Vue d’ensemble : classer et chercher',
    h1: 'Classer et chercher',
    title: 'Classer et chercher des recettes : dossiers, catégories, favoris | Manuel',
    desc: 'Comment classer tes recettes dans Savour : une bibliothèque de A à Z, recherche par ingrédient et technique, catégories avec mots-clés, dossiers, favoris et nettoyage.',
    lead: 'Retrouver ton beurre blanc en trois secondes, même parmi des centaines de recettes.',
    sections: [
      ['Toutes les recettes', 'Dans « Toutes les recettes » se trouvent toutes tes recettes, numérotées et par ordre alphabétique. Les lettres A–Z te mènent à une initiale et les catégories en haut affichent un seul type de recette.'],
      [
        'Quatre façons de classer',
        'Savour en propose quatre, utilisées ensemble :',
        [
          '[Recherche](#zoeken) : par nom, ingrédient, élément ou technique.',
          '[Catégories](#categorieen) : ce qu’est une recette, comme sauces ou pâtisserie. Chaque recette en a une.',
          '[Dossiers](#mappen) : ta façon de travailler, par partie, menu ou saison. Une recette peut être dans plusieurs dossiers.',
          '[Favoris](#favorieten) : les recettes que tu utilises le plus.'
        ]
      ],
      ['Nettoyer', 'Après une grosse importation, [Nettoyer](#opschonen) retire les numéros devant les noms et les recettes en double.'],
      ['Avec ton équipe', 'Toi seul vois tes propres dossiers. Pour partager des recettes avec ta brigade, utilise une [équipe de cuisine](#keukenteams) avec ses propres dossiers.'],
      ['Exemples', 'Des idées d’organisation dans [Classer ses dossiers de recettes : exemples](/blog/receptenmappen-indelen-voorbeelden) et dans l’astuce [Catégories et dossiers](#tips-ordenen).']
    ]
  },
  zoeken: {
    slug: 'fr/manuel-chercher-des-recettes',
    menu: 'Recherche et Toutes les recettes',
    title: 'Chercher des recettes par nom, ingrédient ou technique | Manuel Savour',
    desc: 'Comment chercher dans Savour : par nom de recette, ingrédient, élément ou technique, avec les lettres A–Z et un filtre par catégorie. Aussi sur téléphone.',
    lead: 'Trouve la recette, ou la recette qui utilise cette fameuse sauce.',
    sections: [
      ['Chercher', 'Tape dans la barre de recherche en haut un nom de recette, un ingrédient, un élément ou une technique. Les recettes correspondantes s’affichent aussitôt. Tu trouves ainsi toutes les recettes avec un beurre noisette.'],
      ['Sur téléphone', 'Sur téléphone, touche la loupe en haut pour chercher.'],
      ['Toutes les recettes', 'Dans « Toutes les recettes », tes recettes sont numérotées et par ordre alphabétique. Les lettres A–Z te mènent à une initiale.'],
      ['Filtrer par catégorie', 'En haut de Toutes les recettes se trouvent tes [catégories](#categorieen). Touche-en une pour ne voir que ce type de recettes.'],
      ['Retrouver ta place', 'Si tu ouvres une recette puis reviens, tu retrouves le même endroit de la liste.'],
      ['Recettes d’une équipe de cuisine', 'Dans une [équipe de cuisine](#keukenteams), l’équipe a sa propre bibliothèque avec ses recettes, et tu cherches dans celles-ci.']
    ]
  },
  categorieen: {
    slug: 'fr/manuel-categories',
    menu: 'Catégories',
    title: 'Les catégories de tes recettes : sauces, garnitures, pâtisserie | Manuel',
    desc: 'Comment utiliser les catégories dans Savour : ce qu’est une catégorie, ajouter, renommer et supprimer des catégories, et la liste par défaut pour la cuisine professionnelle.',
    lead: 'Une catégorie dit ce qu’est une recette : une sauce, une garniture, un dessert.',
    sections: [
      ['Ce qu’est une catégorie', 'Chaque recette a une catégorie, comme sauces, glaces ou garnitures. En haut de Toutes les recettes, tu filtres directement dessus, et le menu contient « Catégories » avec toutes tes recettes par type.'],
      ['Les gérer', 'Va dans Mon compte → Catégories ou choisis Catégories dans le menu. « ＋ Ajouter une catégorie » en crée une nouvelle ; tu peux renommer ou supprimer une catégorie. La liste est personnelle et sert aussi à la saisie et à l’importation.'],
      ['Liste par défaut', '« Liste par défaut » ajoute d’un coup une liste adaptée à la cuisine professionnelle. Tes propres catégories restent.'],
      ['Proposition automatique', 'Avec des mots-clés, Savour propose lui-même une catégorie d’après le nom de la recette, par exemple sorbet → Glaces. Voir [Mots-clés et propositions de catégories](#categorie-trefwoorden).'],
      ['Catégorie ou dossier', 'Utilise les catégories pour ce qu’est une recette et les [dossiers](#mappen) pour ta façon de travailler. Plus d’infos dans [Catégories et dossiers](#tips-ordenen).']
    ]
  },
  'categorie-trefwoorden': {
    slug: 'fr/manuel-mots-cles-et-propositions-de-categories',
    menu: 'Mots-clés et propositions de catégories',
    title: 'Mots-clés : Savour propose la catégorie de tes recettes | Manuel',
    desc: 'Comment utiliser les mots-clés dans Savour : indiquer des mots par catégorie, comme sorbet pour Glaces, et faire proposer une catégorie pour toutes tes recettes en une fois.',
    lead: 'Laisse Savour trier, et confirme toi-même ce qui change.',
    sections: [
      ['Indiquer des mots-clés', 'Va dans Catégories et choisis « Mots-clés » pour une catégorie. Indique des mots présents dans les noms de recettes, comme sorbet, granité et parfait pour Glaces.'],
      ['Pour les nouvelles recettes', 'Si un de ces mots figure dans le nom d’une recette nouvelle ou importée, Savour choisit cette catégorie. Si le nom correspond à plusieurs catégories, Savour te demande laquelle. En cas d’égalité, le mot le plus long et le plus précis l’emporte, comme « filet de bœuf » sur « filet ».'],
      ['Proposer des catégories', '« Proposer des catégories » cherche en une fois une catégorie adaptée pour toutes tes recettes d’après les mots-clés. Tu vois d’abord ce qui change et tu confirmes toi-même.'],
      ['Astuce', 'Commence par la [liste par défaut](#categorieen), complète les mots-clés avec les termes de ta cuisine, puis lance les propositions. Les recettes qui ne correspondent à rien gardent leur catégorie.']
    ]
  },
  mappen: {
    slug: 'fr/manuel-dossiers-de-recettes',
    menu: 'Dossiers de recettes',
    title: 'Dossiers de recettes : classer par partie, menu ou saison | Manuel Savour',
    desc: 'Comment utiliser les dossiers dans Savour : créer des dossiers, ajouter des recettes, une recette dans plusieurs dossiers, dossiers dans le menu et dans l’ordre, et imprimer un dossier.',
    lead: 'Classe tes recettes comme travaille ta cuisine : par partie, par menu ou par saison.',
    sections: [
      ['Créer un dossier', 'Dans le menu, sous Dossiers de recettes, choisis « Ajouter un dossier de recettes » et donne-lui un nom, comme « Garde-manger », « Carte du midi » ou « Noël ».'],
      ['Des recettes dans un dossier', 'Ouvre un dossier et choisis les recettes qui y vont. Ou ajoute une recette depuis la recette elle-même : choisis ⋯ puis « Ajouter à un dossier ». Une recette peut être dans plusieurs dossiers.'],
      ['Retirer d’un dossier', 'Ouvre la recette depuis le dossier et choisis ⋯ « Retirer du dossier ». La recette reste dans ta bibliothèque.'],
      ['Menu et ordre', 'Choisis les dossiers qui apparaissent dans le menu et fais-les glisser dans l’ordre qui te convient.'],
      ['Imprimer un dossier', 'Imprime un dossier entier en une fois, avec couverture, sommaire et le numéro de chaque recette en bas de page. Voir [Imprimer plusieurs recettes](#printen-map).'],
      ['Seulement pour toi', 'Toi seul vois tes propres dossiers. Les dossiers partagés avec ton équipe se créent dans une [équipe de cuisine](#keukenteam-mappen).']
    ]
  },
  favorieten: {
    slug: 'fr/manuel-favoris',
    menu: 'Favoris',
    title: 'Recettes favorites avec une étoile | Manuel Savour',
    desc: 'Comment utiliser les favoris dans Savour : mettre une étoile à une recette et ouvrir vite tes favoris depuis le menu ou en haut sur téléphone.',
    lead: 'Les recettes dont tu as besoin à chaque service, toujours à un geste.',
    sections: [
      ['Ajouter un favori', 'Ouvre une recette et choisis « Favori » ou touche l’étoile. Un nouveau geste retire l’étoile.'],
      ['Ouvrir tes favoris', 'Tes favoris sont dans Favoris dans le menu. Sur téléphone, tu les ouvres avec l’étoile en haut.'],
      ['Favori ou dossier', 'Les favoris sont pratiques pour les recettes que tu utilises beaucoup en ce moment. Pour un classement fixe, comme par partie, utilise les [dossiers](#mappen).']
    ]
  },
  opschonen: {
    slug: 'fr/manuel-nettoyer',
    menu: 'Nettoyer : numéros et doublons',
    title: 'Nettoyer : numéros devant les noms et recettes en double | Manuel Savour',
    desc: 'Comment mettre de l’ordre dans ta bibliothèque Savour : retirer les numéros devant les noms et fusionner les doublons, en gardant dossiers, favoris et équipes.',
    lead: 'Tout bien rangé après une grosse importation, sans rien perdre.',
    sections: [
      ['Où', 'Va dans Mon compte → Nettoyer. Savour cherche les numéros devant les noms, comme « 12. Jus de veau », et les recettes en double dans ta bibliothèque. Tu vois toujours d’abord ce qui change.'],
      ['Retirer les numéros', 'Si tes recettes viennent d’un livre numéroté, retire les numéros en une fois avec « Retirer les numéros ». Savour montre d’abord des exemples.'],
      ['Recettes en double', 'Savour cherche les copies strictement identiques : même nom, rendement, ingrédients et préparation. Une seule de chaque est gardée. Dossiers, favoris et équipes passent sur la recette conservée.'],
      ['Presque pareilles', 'Les recettes qui diffèrent légèrement, par une quantité par exemple, ne sont pas considérées comme des doublons. Compare-les toi-même et supprime-les avec [Supprimer des recettes](#recept-verwijderen).']
    ]
  }
};
