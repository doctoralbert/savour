// Manuel (Frans), section « Créer et modifier des recettes ».

export const groups = {
  recepten: {
    name: 'Créer et modifier des recettes',
    intro: 'Saisir une recette pour que conversion, impression et partage fonctionnent bien : ingrédients, préparation, parties, rendement, photos, notes et recettes de base.'
  }
};

export const pages = {
  'recept-maken': {
    slug: 'fr/manuel-modifier-une-recette',
    menu: 'Créer et modifier une recette',
    title: 'Créer et modifier une recette dans Savour | Manuel',
    desc: 'Comment créer et modifier une recette dans Savour : nom, rendement, catégorie, photo, ingrédients et préparation, une recette en plusieurs parties, enregistrer et qui peut modifier.',
    lead: 'Saisir une nouvelle recette ou modifier une recette existante, étape par étape.',
    sections: [
      ['Une nouvelle recette', 'Choisis dans le menu « Ajouter une recette », puis « Saisir manuellement ». L’écran « Nouvelle recette » s’ouvre avec les champs Nom, Rendement, Catégorie, Photo de la recette, Ingrédients et Préparation.'],
      [
        'Les champs',
        'Voici comment les remplir :',
        [
          'Nom : court et reconnaissable, pour que tout le monde trouve la recette avec un seul mot.',
          '[Rendement](#recept-opbrengst) : ce que donne la recette, comme « 1 litre » ou « 40 pièces ».',
          '[Catégorie](#categorieen) : le type de recette, comme sauces ou pâtisserie.',
          '[Photo](#recept-foto) : facultative, une photo du plat.',
          '[Ingrédients](#recept-ingredienten) : chaque ingrédient sur sa ligne.',
          '[Préparation](#recept-bereiding) : des étapes courtes, un geste par étape.'
        ]
      ],
      ['Une recette en plusieurs parties', 'Ta recette comprend pâte, garniture et sauce ? Choisis « ＋ Ajouter une partie » et donne à chaque partie ses ingrédients et sa préparation. Voir [Une recette en plusieurs parties](#recept-delen).'],
      ['Enregistrer', 'Choisis « Enregistrer ». Avec « Annuler » ou « ← Retour », tu reviens sans enregistrer. Si une recette strictement identique existe déjà, elle n’est pas enregistrée deux fois.'],
      ['Modifier une recette', 'Ouvre la recette et choisis « Modifier ». Tu retrouves les mêmes champs. Change ce que tu veux et choisis « Enregistrer ». Les membres de ton [équipe de cuisine](#keukenteams) voient aussitôt la nouvelle version.'],
      ['Qui peut modifier', 'Seul l’auteur d’une recette peut la modifier. Dans une équipe de cuisine, les autres la voient ; avec « Ajouter à mes recettes », ils prennent une copie qu’ils peuvent modifier. Voir [Copier une recette](#recept-overnemen).'],
      ['Beaucoup de recettes, vite', 'Si tes recettes sont déjà dans Word, PDF ou une autre application, [importer](#importeren) est bien plus rapide que tout retaper.']
    ]
  },
  'recept-ingredienten': {
    slug: 'fr/manuel-ingredients-et-quantites',
    menu: 'Ingrédients et quantités',
    title: 'Saisir ingrédients et quantités pour une conversion juste | Manuel',
    desc: 'Comment saisir les ingrédients dans Savour : quantité devant, quels nombres, fractions et unités Savour reconnaît et convertit, et ce qui n’est volontairement pas converti.',
    lead: 'Comment écrire les ingrédients pour que Savour les reconnaisse, les mette en gras et les convertisse correctement.',
    sections: [
      ['Un ingrédient par ligne', 'Mets chaque ingrédient sur sa ligne, avec la quantité devant : « 250 g beurre », « 1,5 l crème », « 2 c. à soupe moutarde ». « ＋ Ajouter un ingrédient » crée une ligne et la croix en supprime une.'],
      ['Nombres', 'Savour reconnaît 1, 1,5, 1.000, ½, 1½, 1 1/2 et une fourchette comme 2-3. La quantité apparaît en gras dans la recette pour la voir vite en cuisine.'],
      ['Unités converties', 'g, kg, mg, ml, cl, dl et l sont convertis, ainsi que tsp, tbsp, cup, oz et lb et les abréviations néerlandaises tl et el. Comment Savour choisit une unité pratique est expliqué dans [Unités et arrondis](#eenheden).'],
      ['Pièces et autres unités', 'Pièces, brins, gousses, feuilles, bottes et tranches sont reconnus et calculés, mais pas convertis en une autre unité.'],
      ['Pas de conversion', '« Selon le goût », « pincée » et « trait » ne sont volontairement pas convertis. Pour de grandes quantités, goûte à nouveau.'],
      ['Ordre', 'Liste les ingrédients dans leur ordre d’utilisation, avec les poids en grammes ou millilitres plutôt qu’en cuillères ou tasses. Ainsi tout se convertit exactement. Plus : [Une recette que tout le monde fait pareil](#tips-recept-schrijven).'],
      ['Une recette de base comme ingrédient', 'Tu utilises une de tes recettes, comme un fond, comme ingrédient ? Relie-les et tu ouvres la recette de base d’un seul geste. Voir [Lier à une recette de base](#recept-koppelen).']
    ]
  },
  'recept-bereiding': {
    slug: 'fr/manuel-ecrire-la-preparation',
    menu: 'Écrire la préparation',
    title: 'Écrire la préparation d’une recette par étapes | Manuel Savour',
    desc: 'Comment écrire la préparation dans Savour : des étapes courtes, un geste par étape, avec températures, temps et points critiques. Ajouter, retirer et cocher des étapes.',
    lead: 'Une préparation que chacun dans ta cuisine réalise de la même façon.',
    sections: [
      ['Ajouter des étapes', '« ＋ Ajouter une étape » crée une nouvelle étape ; la croix en supprime une. Les étapes sont numérotées dans la recette.'],
      ['Un geste par étape', 'Écris des étapes courtes, un geste par étape. « Ciseler l’échalote » et « Suer au beurre sans coloration » sont deux étapes. Ainsi tu les coches en [mode cuisine](#kookmodus).'],
      ['Points critiques', 'Ajoute l’essentiel : températures, temps, l’épaisseur ou la couleur voulue. « Réduire des deux tiers » ou « température à cœur 58 °C » évite plus d’erreurs qu’une belle description.'],
      ['Parties avec leur propre préparation', 'Si ta recette comporte plusieurs parties, chaque partie a sa propre préparation. Voir [Une recette en plusieurs parties](#recept-delen).'],
      ['Remarques', 'Ce qui n’est pas une étape, comme « au-delà de 5 kg, laisser reposer plus longtemps », va dans une [note](#recept-notities).']
    ]
  },
  'recept-delen': {
    slug: 'fr/manuel-recette-en-plusieurs-parties',
    menu: 'Une recette en plusieurs parties',
    title: 'Une recette en plusieurs parties : pâte, garniture, sauce et garniture | Manuel',
    desc: 'Comment créer dans Savour une recette composée de parties, comme pâte, garniture et sauce, chacune avec ses ingrédients et sa préparation. Aussi à l’import et à la conversion.',
    lead: 'Un plat composé dans une seule recette, avec les ingrédients et la préparation de chaque élément.',
    sections: [
      ['Quand utiliser des parties', 'Pour un plat fait de plusieurs éléments : une tarte avec pâte, garniture et glaçage, ou une assiette avec viande, sauce et garniture. Tout est dans une recette, et chacun sait ce qui va avec quel élément.'],
      ['Ajouter une partie', 'Choisis dans la recette « ＋ Ajouter une partie ». Donne-lui un nom, comme « Pâte », et remplis ses ingrédients et sa préparation. Ajoute autant de parties que tu veux.'],
      ['À l’importation', 'Une ligne qui se termine par deux-points, comme « Pâte : », est reconnue à l’importation comme le titre d’une partie. Les intertitres de [Mela](#import-mela), [Flavorish](#import-flavorish) et [CookBookManager](#import-cookbookmanager) deviennent aussi des parties.'],
      ['Convertir et imprimer', 'À la [conversion](#omrekenen), toutes les parties sont prises en compte. À l’[impression](#printen), chaque partie apparaît avec son nom au-dessus de ses ingrédients et de sa préparation.'],
      ['Ou plutôt une recette de base', 'Tu utilises un élément dans beaucoup de recettes, comme un fond ou une pâte de base ? Fais-en une recette à part et [relie-la](#recept-koppelen). Tu la modifies alors à un seul endroit.']
    ]
  },
  'recept-opbrengst': {
    slug: 'fr/manuel-rendement',
    menu: 'Rendement et portions',
    title: 'Le rendement d’une recette : litres, pièces ou couverts | Manuel Savour',
    desc: 'Comment indiquer le rendement d’une recette dans Savour, comme 1 litre, 40 pièces ou 8 couverts, et pourquoi il sert à convertir vers la quantité nécessaire.',
    lead: 'Avec un rendement, tu convertis ensuite exactement vers ce dont tu as besoin.',
    sections: [
      ['Ce que tu indiques', 'Dans Rendement, indique ce que donne la recette, avec un nombre : « 1 litre », « 2,5 kg », « 40 pièces » ou « 8 couverts ». Il apparaît en haut de la recette, à côté du nombre d’ingrédients et d’étapes.'],
      ['Pourquoi c’est utile', 'Avec un rendement, tu peux saisir le rendement voulu dans [Plus d’options de conversion](#omrekenen-meer) : s’il te faut 3,5 litres d’une recette prévue pour 1 litre, saisis 3,5 et Savour convertit tout.'],
      ['À l’importation', 'Le lecteur Savour reprend aussi le rendement d’un intertitre comme « Ingrédients (4 personnes) ». Depuis d’autres applications, les portions ou « servings » sont reprises.'],
      ['Sans rendement', 'Sans rendement, tu peux convertir avec les boutons rapides ou un facteur libre. Voir [Convertir](#omrekenen).']
    ]
  },
  'recept-foto': {
    slug: 'fr/manuel-photo-de-la-recette',
    menu: 'Photos et note d’origine',
    title: 'Une photo sur la recette et la note d’origine | Manuel Savour',
    desc: 'Comment ajouter une photo à une recette dans Savour, comment la note d’origine d’une photo importée est conservée et comment les photos s’impriment.',
    lead: 'Une photo du plat et, pour une note importée, l’original à côté.',
    sections: [
      ['Photo du plat', 'Choisis une photo dans « Photo de la recette — facultatif ». Savour la réduit automatiquement pour qu’elle se charge vite. Une photo aide l’équipe à voir à quoi doit ressembler l’assiette.'],
      ['La note d’origine', 'Si la recette a été lue depuis une [photo ou un scan](#import-fotos), la note d’origine est conservée. Choisis « Voir la note d’origine » dans la recette pour la comparer, par exemple pour vérifier un chiffre.'],
      ['Photos d’autres applications', 'En passant depuis [Paprika](#import-paprika), [Mela](#import-mela), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook) et [Flavorish](#import-flavorish), la photo de la recette est reprise.'],
      ['À l’impression', 'En [imprimant plusieurs recettes](#printen-map), « Avec photos » décide si les photos sont incluses.']
    ]
  },
  'recept-notities': {
    slug: 'fr/manuel-notes-sur-une-recette',
    menu: 'Notes sur une recette',
    title: 'Notes sur une recette : remarques permanentes et astuces | Manuel Savour',
    desc: 'Comment ajouter une note à une recette dans Savour : une remarque permanente à côté de la recette, la modifier et choisir si les notes s’impriment.',
    lead: 'Une remarque permanente à côté de la recette, pour tout ce qui n’est ni ingrédient ni étape.',
    sections: [
      ['Ajouter une note', 'Ouvre une de tes recettes et choisis « ＋ Note ». Écris ta remarque, comme « au-delà de 5 kg, laisser reposer plus longtemps » ou « fournisseur : boucherie Martin ». « Modifier » permet de la changer ensuite.'],
      ['À quoi ça sert', 'Utilise les notes pour ce qui n’a pas sa place dans les ingrédients ou la préparation : variantes, conservation, source de la recette, allergènes ou une remarque pour l’équipe.'],
      ['À l’impression', 'En [imprimant plusieurs recettes](#printen-map), « Avec les notes » décide si les notes sont incluses.'],
      ['Notes d’autres applications', 'À l’[importation depuis une autre application](#overstappen), les notes sont placées à la fin de la préparation, après « Notes : », pour que rien ne se perde.']
    ]
  },
  'recept-koppelen': {
    slug: 'fr/manuel-lier-a-une-recette-de-base',
    menu: 'Lier à une recette de base',
    title: 'Lier un ingrédient à une recette de base, comme un fond | Manuel',
    desc: 'Comment lier dans Savour un ingrédient à une de tes recettes de base, comme un fond dans ton jus : automatiquement par le nom ou au choix, et d’un geste vers la recette de base.',
    lead: 'Du jus au fond d’un seul geste, et retour.',
    sections: [
      ['Automatiquement par le nom', 'Si tu utilises une de tes recettes comme ingrédient et que l’ingrédient porte exactement le même nom, Savour les relie tout seul.'],
      ['Relier toi-même', 'Si le nom diffère, ouvre la recette, choisis ⋯ puis « Lier à une recette ». Choisis quel ingrédient correspond à quelle recette.'],
      ['Dans la recette', 'À côté de l’ingrédient relié apparaît « Recette ». Un geste et tu es dans la recette de base, avec un bouton pour revenir.'],
      ['Pourquoi des recettes de base', 'Un fond, une pâte de base ou une sauce utilisés dans beaucoup de recettes se modifient ainsi à un seul endroit. Toute l’[équipe de cuisine](#keukenteams) travaille alors avec la même version.']
    ]
  },
  'recept-bekijken': {
    slug: 'fr/manuel-ouvrir-et-utiliser-une-recette',
    menu: 'Ouvrir et utiliser une recette',
    title: 'Ouvrir une recette : mode cuisine, conversion, impression, partage | Manuel',
    desc: 'Tout ce que tu peux faire dans une recette Savour : mode cuisine, modifier, imprimer, partager, favori, convertir, notes et le menu ⋯ avec dossiers et liens.',
    lead: 'Tout ce que tu peux faire depuis une recette, d’un coup d’œil.',
    sections: [
      [
        'En haut',
        'En haut de la recette se trouvent les boutons :',
        [
          '[Mode cuisine](#kookmodus) : seulement la recette, en gros caractères.',
          '[Modifier](#recept-maken) : changer la recette (seulement l’auteur).',
          '[Imprimer](#printen) : imprimer la recette, aussi convertie.',
          '[Partager](#delen-link) : envoyer un lien par WhatsApp, Telegram, SMS ou e-mail.',
          '[Favori](#favorieten) : mettre une étoile à la recette.'
        ]
      ],
      ['Convertir', 'Sous le titre se trouve « Convertir » avec des boutons rapides de ¼× à 10×, et « Original » pour revenir. Voir [Convertir](#omrekenen).'],
      ['Le menu ⋯', 'Pour une de tes recettes, ⋯ contient « Plus d’options de conversion », « Lier à une recette », « Ajouter à un dossier » et « Supprimer de la bibliothèque ». Si tu ouvres la recette depuis un dossier ou une équipe, tu vois « Retirer du dossier » ou « Retirer de l’équipe de cuisine ».'],
      ['Cocher', 'Touche un ingrédient ou une étape pour le cocher. Après une interruption, tu vois où tu en étais.'],
      ['Notes et original', 'Sous la recette se trouvent tes [notes](#recept-notities) et, pour une recette issue d’une photo, « Voir la note d’origine ».'],
      ['Retour', '« ← Retour » te ramène au même endroit de la liste.']
    ]
  },
  'recept-verwijderen': {
    slug: 'fr/manuel-supprimer-des-recettes',
    menu: 'Supprimer des recettes',
    title: 'Supprimer des recettes, une ou plusieurs à la fois | Manuel Savour',
    desc: 'Comment supprimer des recettes dans Savour : une recette de ta bibliothèque, plusieurs à la fois ou seulement d’un dossier ou d’une équipe. Savour ne supprime jamais rien de lui-même.',
    lead: 'Faire le ménage sans rien perdre par erreur.',
    sections: [
      ['Une recette', 'Ouvre la recette, choisis ⋯ puis « Supprimer de la bibliothèque ». Savour demande d’abord confirmation.'],
      ['Plusieurs à la fois', 'Dans Toutes les recettes, choisis « Supprimer les recettes », coche les recettes et confirme. Pratique après une importation avec des recettes inutiles.'],
      ['Seulement d’un dossier', 'Pour retirer une recette seulement d’un dossier ou d’une équipe, ouvre-la depuis ce dossier et choisis ⋯ « Retirer du dossier » ou « Retirer de l’équipe de cuisine ». La recette reste dans ta bibliothèque.'],
      ['Recettes en double', 'Les doublons et les numéros devant les noms se nettoient avec [Nettoyer](#opschonen). Tu vois toujours d’abord ce qui change.'],
      ['Savour ne supprime jamais seul', 'Savour ne supprime jamais de recettes sans que tu le demandes. Même si tu [arrêtes Savour Pro](#pro-stoppen), toutes tes recettes restent.']
    ]
  }
};
