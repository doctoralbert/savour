// Manuel (Frans), sections « Astuces pour de bonnes recettes » et « Aide ».

export const groups = {
  tips: { name: 'Astuces pour de bonnes recettes', intro: 'Des astuces pratiques de cuisine pour des recettes qui réussissent pareil à chaque service.' },
  hulp: {
    name: 'Aide',
    intro: 'Résoudre un problème, signaler un problème et les termes qu’utilise Savour. Ta question n’y est pas ? Regarde les [questions fréquentes](/veelgestelde-vragen).'
  }
};

export const pages = {
  'tips-recept-schrijven': {
    slug: 'fr/manuel-astuce-ecrire-une-recette',
    menu: 'Une recette que tout le monde fait pareil',
    title: 'Écrire une recette de cuisine que tout le monde fait pareil | Manuel',
    desc: 'Astuces pour une fiche technique : nom et rendement clairs, ingrédients en grammes dans l’ordre d’utilisation, étapes courtes et points critiques.',
    lead: 'Une bonne recette de cuisine ne laisse pas de place à l’interprétation.',
    sections: [
      ['Nom et rendement', 'Commence par un nom clair et le [rendement](#recept-opbrengst) : combien de litres, de pièces ou pour combien de couverts.'],
      ['Ingrédients', 'Écris tous les ingrédients dans l’ordre où tu les utilises, avec la quantité en grammes ou en millilitres plutôt qu’en cuillères ou en tasses. Voir [Ingrédients et quantités](#recept-ingredienten).'],
      ['Préparation', 'Écris la préparation en étapes courtes, un geste par étape. Voir [Écrire la préparation](#recept-bereiding).'],
      ['Points critiques', 'Note toujours les points critiques : températures, temps, épaisseur ou couleur voulue et ce à quoi faire attention. « Réduire d’un tiers » ou « température à cœur 58 °C » évite plus d’erreurs qu’une belle description.'],
      ['En savoir plus', 'Pourquoi des fiches fixes apportent autant : [Fiches techniques en cuisine](/blog/standaardrecepturen-in-de-keuken).']
    ]
  },
  'tips-opschalen': {
    slug: 'fr/manuel-astuce-adapter-sans-erreur',
    menu: 'Adapter sans erreur',
    title: 'Adapter des recettes sans erreur : facteur et assaisonnement | Manuel',
    desc: 'Astuces pour adapter les quantités en cuisine : calculer avec un facteur au poids, et ce qui ne suit pas proportionnellement, comme les temps de réduction, le sel, l’acidité, les épices et les cuissons.',
    lead: 'Savour fait le calcul. Goûter reste ton métier.',
    sections: [
      ['Le facteur', 'Tu adaptes avec un facteur : le rendement voulu divisé par le rendement de la recette de base. Pour un beurre blanc prévu pour 1 litre dont il te faut 3,5 litres, le facteur est 3,5. Calcule toujours au poids ; le résultat est alors exact. Dans Savour, utilise [Plus d’options de conversion](#omrekenen-meer).'],
      [
        'Ce qui ne suit pas',
        'Tout ne se multiplie pas de façon proportionnelle :',
        [
          'Les temps de réduction s’allongent, car une plus grande casserole évapore proportionnellement moins.',
          'Sel, acidité et épices se rectifient à nouveau sur de grandes quantités.',
          'En pâtisserie, le temps de cuisson change avec un autre moule ou un four plein.',
          'Les gélifiants comme la gélatine et l’agar se calculent en revanche exactement avec le liquide.'
        ]
      ],
      ['En savoir plus', 'Plus en détail : [Adapter des recettes sans erreur](/blog/recepten-opschalen-zonder-fouten).']
    ]
  },
  'tips-kladjes': {
    slug: 'fr/manuel-astuce-du-brouillon-a-la-fiche',
    menu: 'Du brouillon à la fiche recette',
    title: 'Du brouillon à la fiche : enregistrer des recettes manuscrites | Manuel',
    desc: 'Astuces pour enregistrer vite des notes manuscrites : photographier avec une bonne lumière, bien droit d’en haut, puis vérifier les chiffres.',
    lead: 'Transforme un brouillon en recette fixe tant que tu sais encore ce que tu voulais dire.',
    sections: [
      ['Enregistrer vite', 'Beaucoup de recettes commencent par une note au passe. Transforme-la au plus vite en recette fixe, tant que tu sais encore ce que tu voulais dire.'],
      ['La photo', 'Photographie une recette manuscrite avec une bonne lumière, bien droit d’en haut et avec toute la page dans le cadre. Dans Savour, utilise [l’appareil photo](#import-fotos).'],
      ['Vérifier', 'Vérifie ensuite surtout les chiffres : un 3 et un 8, ou un 1 et un 7, se confondent vite sur une note tachée. L’original reste enregistré avec la recette.'],
      ['En savoir plus', '[Numériser ses vieux brouillons de recettes](/blog/oude-kladjes-digitaliseren).']
    ]
  },
  'tips-ordenen': {
    slug: 'fr/manuel-astuce-categories-et-dossiers',
    menu: 'Bien utiliser catégories et dossiers',
    title: 'Bien utiliser catégories et dossiers dans ta cuisine | Manuel',
    desc: 'Astuces pour classer des recettes : les catégories pour ce qu’est une recette, les dossiers pour ta façon de travailler, et des noms courts et clairs que ton équipe trouve d’un mot.',
    lead: 'Ce qu’est une recette et comment tu travailles avec : deux choses différentes.',
    sections: [
      ['Catégorie : ce que c’est', 'Utilise les [catégories](#categorieen) pour ce qu’est une recette, comme sauces, garnitures ou pâtisserie. Une recette est dans une catégorie.'],
      ['Dossier : comment tu travailles', 'Utilise les [dossiers](#mappen) pour ta façon de travailler, comme la carte actuelle, un événement ou le garde-manger. Une recette peut être dans plusieurs dossiers.'],
      ['Noms', 'Garde des noms courts et clairs, pour que chacun dans l’équipe trouve la recette d’un seul mot.'],
      ['En savoir plus', '[Classer ses dossiers de recettes : exemples](/blog/receptenmappen-indelen-voorbeelden) et [Organiser les recettes en cuisine](/blog/recepten-organiseren-in-de-keuken).']
    ]
  },
  'tips-team': {
    slug: 'fr/manuel-astuce-travailler-ensemble',
    menu: 'Travailler ensemble avec une seule source',
    title: 'Travailler avec ton équipe à partir d’une seule source de recettes | Manuel',
    desc: 'Astuces pour travailler ensemble en cuisine : une seule source pour chaque recette, des droits par rôle et plus jamais une vieille version dans un groupe de discussion.',
    lead: 'Une cuisine fonctionne mieux avec une seule source pour chaque recette.',
    sections: [
      ['Une seule source', 'Partage les recettes via une [équipe de cuisine](#keukenteams) plutôt que par photos ou messages épars. Quand tu modifies une recette, tout le monde travaille aussitôt avec la nouvelle version, et personne ne se perd dans une vieille version d’un groupe.'],
      ['Droits', 'Donne au second le droit de modifier les recettes et au reste de l’équipe le droit de les consulter. Voir [Rôles](#keukenteam-rollen).'],
      ['Un nouveau cuisinier', 'Avec toutes les recettes sur son téléphone, un nouveau cuisinier est formé plus vite. Lis aussi [Intégrer un nouveau cuisinier](/blog/nieuwe-kok-inwerken).']
    ]
  },
  'tips-allergenen': {
    slug: 'fr/manuel-astuce-allergenes',
    menu: 'Allergènes et règles fixes',
    title: 'Allergènes et règles fixes dans tes recettes | Manuel',
    desc: 'Astuces pour garder les allergènes clairs dans tes recettes : allergènes dans la liste d’ingrédients, nommer les recettes de base et vérifier vite ce que contient un plat.',
    lead: 'Savoir vite ce que contient exactement un plat quand un client demande.',
    sections: [
      ['Dans la liste d’ingrédients', 'Pour chaque recette, écris clairement dans la liste d’ingrédients les éléments contenant des allergènes, même s’ils viennent d’une autre recette de base.'],
      ['Recettes de base', 'Pour un plat composé, indique quelles recettes de base il contient. [Relie-les](#recept-koppelen) : tu vois d’un geste ce que contient le fond ou la sauce.'],
      ['Notes', 'Écris les règles fixes et les informations sur les allergènes dans une [note](#recept-notities) de la recette, pour qu’elles figurent aussi sur l’impression.']
    ]
  },
  'probleem-inloggen': {
    slug: 'fr/manuel-problemes-de-connexion',
    menu: 'Problèmes de connexion',
    title: 'Résoudre les problèmes de connexion ou d’e-mail de confirmation | Manuel',
    desc: 'Que faire si la connexion à Savour ne marche pas : adresse e-mail ou mot de passe incorrect, compte non confirmé, aucun e-mail reçu ou lien d’un e-mail qui ne fonctionne plus.',
    lead: 'Les messages les plus fréquents à la connexion et ce que tu peux faire.',
    sections: [
      ['Adresse e-mail ou mot de passe incorrect', 'Vérifie que tu as bien écrit l’adresse e-mail. Si tu as oublié ton mot de passe, choisis « Mot de passe oublié ? ». Voir [Connexion et mot de passe](#inloggen).'],
      ['« Confirme d’abord ton adresse e-mail »', 'Ton compte n’est pas encore confirmé. Clique sur le lien de l’e-mail de confirmation ou demande à Savour d’en envoyer un nouveau. Regarde aussi dans les spams.'],
      ['« Ce lien ne fonctionne plus »', 'Un lien d’e-mail fonctionne une fois et pendant une heure. Si tu en as demandé plusieurs, seul le plus récent est valable. Demande un nouveau lien et utilise le dernier e-mail.'],
      ['Aucun e-mail reçu', 'Regarde dans le dossier spam ou courrier indésirable. Avec une adresse professionnelle, cela peut prendre un peu de temps. Si trop d’e-mails ont été demandés, Savour te le signale ; réessaie alors plus tard.'],
      ['« Cette adresse e-mail a déjà un compte »', 'Connecte-toi avec cette adresse e-mail ou choisis « Mot de passe oublié ? ».'],
      ['Toujours déconnecté', 'Coche « Rester connecté » à la connexion. Sinon, tu es déconnecté dès que tu fermes la fenêtre.']
    ]
  },
  'probleem-melden': {
    slug: 'fr/manuel-signaler-un-probleme-et-contact',
    menu: 'Signaler un problème et contact',
    title: 'Signaler un problème ou contacter Savour | Manuel',
    desc: 'Comment signaler un problème dans Savour, avec une capture d’écran, ou prendre contact via le formulaire de contact ou contact@savour.page.',
    lead: 'Quelque chose ne marche pas ? Dis-le, et les cuisiniers derrière Savour regardent.',
    sections: [
      ['Signaler un problème', 'Choisis « Signaler un problème » en bas du site. Décris ce qui ne va pas et ajoute si possible une capture d’écran jusqu’à 3 Mo. Ton signalement va directement à l’équipe.'],
      ['Contact', 'Pour des questions sur Savour, un abonnement d’équipe ou le service d’importation, utilise le [formulaire de contact](/contact) ou écris à contact@savour.page.'],
      ['Ce qui aide', 'Indique ton appareil et ton navigateur, ce que tu as fait et ce que tu attendais. S’il s’agit d’une importation, joins le fichier ou une partie.'],
      ['Regarder d’abord', 'Beaucoup de réponses se trouvent dans [Problèmes d’importation](#import-problemen), [Problèmes de connexion](#probleem-inloggen) et les [questions fréquentes](/veelgestelde-vragen).']
    ]
  },
  woordenlijst: {
    slug: 'fr/manuel-glossaire',
    menu: 'Glossaire',
    title: 'Glossaire : les termes de Savour expliqués | Manuel',
    desc: 'Ce que signifie chaque terme dans Savour : lecteur Savour, équipe de cuisine, dossier de recettes, catégorie, rendement, facteur, partie, recette de base, note, mode cuisine et plus.',
    lead: 'Les termes que tu rencontres dans Savour, expliqués en bref.',
    sections: [
      [
        'Recettes',
        'Termes autour d’une recette :',
        [
          'Rendement : ce que donne une recette, comme 1 litre ou 40 pièces. Voir [Rendement](#recept-opbrengst).',
          'Partie : un élément d’une recette avec ses propres ingrédients et sa préparation, comme une pâte ou une sauce. Voir [Une recette en parties](#recept-delen).',
          'Recette de base : une recette à part que tu utilises comme ingrédient, comme un fond. Voir [Relier](#recept-koppelen).',
          'Brouillon original : une recette manuscrite ou scannée. Voir [Photos et brouillons](#import-fotos).',
          'Note : une remarque fixe à côté d’une recette. Voir [Notes](#recept-notities).'
        ]
      ],
      [
        'Classer',
        'Termes autour du classement :',
        [
          'Catégorie : ce qu’est une recette. Voir [Catégories](#categorieen).',
          'Mot-clé : un mot du nom de recette avec lequel Savour propose une catégorie. Voir [Mots-clés](#categorie-trefwoorden).',
          'Dossier de recettes : ton propre classement, par exemple par partie. Voir [Dossiers de recettes](#mappen).',
          'Favori : une recette avec une étoile. Voir [Favoris](#favorieten).'
        ]
      ],
      [
        'Importer et convertir',
        'Termes autour de l’importation et de la conversion :',
        [
          'Lecteur Savour : le programme propre à Savour qui lit les recettes dans les fichiers. Voir [Le lecteur Savour et l’IA](#import-ai).',
          'Écran de vérification : où tu vérifies une importation avant d’enregistrer. Voir [Vérifier une importation](#import-controleren).',
          'Export : un fichier avec toutes les recettes d’une autre application. Voir [Passer à Savour](#overstappen).',
          'Facteur : le nombre par lequel tu multiplies une recette. Voir [Plus d’options de conversion](#omrekenen-meer).',
          'Mode cuisine : seulement la recette, en grand et écran allumé. Voir [Mode cuisine](#kookmodus).'
        ]
      ],
      [
        'Travailler ensemble',
        'Termes autour du travail en équipe :',
        [
          'Équipe de cuisine : un livre de recettes commun pour ta brigade. Voir [Équipes de cuisine](#keukenteams).',
          'Propriétaire, éditeur et lecteur : les rôles d’une équipe de cuisine. Voir [Rôles](#keukenteam-rollen).',
          'Organisation : un abonnement avec lequel toute ton équipe a Savour Pro. Voir [Organisations](#organisatie).',
          'Savour Pro : l’abonnement payant. Voir [Gratuit et Savour Pro](#gratis-en-pro).'
        ]
      ]
    ]
  }
};
