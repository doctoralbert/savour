// Site en français : toutes les pages sur savour.page/fr/... (construites par tools/build-seo.mjs).
// Le menu et la page d'accueil sont dans tools/site-content-extra.mjs ; ici, le contenu de chaque page.
// Les articles du blog sont reliés par leur slug anglais.
export const FR = {
  ui: {
    readArticle: "Lire l'article",
    blogLead:
      'Des articles pratiques sur la numérisation des recettes, le classement des dossiers de recettes, ton équipe de cuisine et la gestion des recettes en restaurant.',
    more: 'En savoir plus',
    logoLine: 'De la note griffonnée à la recette qui fonctionne. Fait par des cuisiniers, pour des cuisiniers.',
    soonMail: 'Tu veux partager tes idées ? Écris-nous à'
  },
  blogSlug: 'fr/blog',
  blogTitle: 'Blog sur la gestion des recettes et la cuisine — Savour',
  legacy: {
    pro: {
      slug: 'fr/tarifs',
      title: 'Tarifs — Savour Pro et abonnements équipe',
      h1: 'Tarifs',
      desc: "Commence gratuitement avec jusqu'à 100 recettes. Savour Pro dès 2,99 € par mois : recettes illimitées, IA pour les notes manuscrites et équipes de cuisine."
    },
    faq: {
      slug: 'fr/questions-frequentes',
      title: 'Questions fréquentes sur Savour',
      desc: 'Les réponses sur Savour : importer des recettes depuis Word, PDF et photos, gratuit et Pro, équipes de cuisine et travail en cuisine.'
    },
    guide: {
      slug: 'fr/guide',
      title: 'Guide : travailler avec tes recettes dans Savour',
      desc: "Pas à pas : importe ton livre de recettes, classe-le en dossiers et catégories, adapte les quantités, mode cuisine, impression et partage avec ton équipe."
    },
    contact: {
      slug: 'fr/contact',
      title: 'Contact — Savour',
      desc: "Des questions sur Savour, la gestion des recettes de ton restaurant ou un abonnement d'équipe ? Écris-nous via le formulaire ou à contact@savour.page."
    },
    terms: {
      slug: 'fr/conditions',
      title: 'Conditions générales — Savour',
      desc: "Les conditions générales de Savour : compte gratuit, Savour Pro, abonnements d'équipe, résiliation et droit de rétractation."
    },
    privacy: {
      slug: 'fr/confidentialite',
      title: 'Politique de confidentialité — Savour',
      desc: 'Comment Savour traite tes données et tes recettes : ce que nous conservons, pourquoi, avec qui nous travaillons et quels sont tes droits.'
    }
  },
  features: {
    digitise: {
      slug: 'fr/numeriser-recettes',
      title: 'Numériser ses recettes : Word, PDF et notes manuscrites | Savour',
      desc: "Numérise tes recettes sans les retaper. Importe Word et PDF en une fois et fais lire tes notes et photos manuscrites. Aucune quantité n'est jamais inventée.",
      h1: 'Numérise tes recettes sans les retaper',
      lead: 'Tes cahiers de recettes, fichiers Word et notes tachées de café deviennent en une fois un livre de recettes bien rangé.',
      sections: [
        ['Word et PDF en une fois', "Fais glisser un fichier Word ou un PDF dans Savour, même s'il contient des centaines de recettes. Le lecteur Savour repère où chaque recette commence et se termine, et met le titre, les ingrédients et la préparation à leur place. Les numéros devant les titres et les petites coquilles, comme 18oc au lieu de 180 °C, sont corrigés. Un cuisinier a ainsi importé 1 400 recettes en deux minutes environ."],
        ['Recettes manuscrites et photos', "Prends en photo une note, une page de ton cahier ou un scan d'un vieux classeur. L'IA lit l'écriture et en fait une recette propre, même si la photo est de travers ou le papier taché. Cela fait partie de Savour Pro."],
        ['De l\'ordre dans les grands classeurs en désordre', "Un classeur de centaines de recettes de différents chefs, avec des numéros, des titres isolés et des recettes qui commencent en milieu de page ? Savour les sépare lui-même, reconnaît des parties comme la pâte et la garniture, corrige les fautes courantes et propose une catégorie pour chaque recette. Les recettes dont le lecteur n'est pas sûr sont relues par l'IA avec Savour Pro. Tu vérifies tout dans un seul aperçu avant d'enregistrer."],
        ['Rien d\'inventé', "Une recette doit être juste. Savour n'invente jamais de quantités, d'ingrédients ni d'étapes. Si le lecteur a un doute, la recette est signalée et tu la vérifies avant de l'enregistrer."],
        ['Depuis un site ou une autre application', "Colle le lien d'une recette sur un site et Savour en extrait la recette. Tu viens d'une autre application de recettes, comme Paprika, Mealie, Tandoor, Recipe Keeper, Crouton, MasterCook, Copy Me That ou Plan to Eat ? Fais un export et transfère le fichier dans Savour en une fois."],
        ['Et ensuite, on continue', 'Chaque recette importée peut être modifiée, recevoir une photo, aller dans un dossier et être partagée avec ta brigade.']
      ]
    },
    organise: {
      slug: 'fr/organiser-recettes',
      title: 'Organiser ses recettes : gestion des recettes pour restaurants | Savour',
      desc: 'Gestion des recettes pour les restaurants et la restauration : toutes tes recettes dans un seul livre, avec tes dossiers et catégories, recherche par ingrédient et favoris.',
      h1: 'Organise tes recettes comme ta cuisine travaille',
      lead: "Un seul livre pour tout ce que tu as cuisiné, rangé à ta façon.",
      sections: [
        ['Ta structure', "Sauces, fonds, garnitures, pâtisserie, le menu dégustation de la saison. C'est toi qui crées les dossiers et les catégories. Une recette peut figurer dans plusieurs dossiers : ton jus appartient ainsi aux fonds et au plat d'agneau."],
        ['Cherche ce dont tu te souviens', "Tu te rappelles seulement qu'il y avait du yuzu ? Savour cherche dans les titres, les ingrédients et la préparation. Ou parcours tout ton livre de A à Z."],
        ['Calme et rapide', "Pas d'écrans surchargés. Une liste de titres, une étoile pour tes favoris et un geste pour ouvrir la recette. Conçu pour être consulté en plein service."],
        ['Sur tous les appareils', "Organise et importe sur l'ordinateur, et utilise ton téléphone ou ta tablette en cuisine, en grands caractères en mode cuisine. Rien à installer."]
      ]
    },
    share: {
      slug: 'fr/partager-recettes',
      title: 'Partager ses recettes avec son équipe de cuisine et sa brigade | Savour',
      desc: "Partage tes recettes dans des équipes de cuisine avec des droits. Tout le monde travaille sur la même version, du sous-chef au stagiaire.",
      h1: 'Partage tes recettes avec ta brigade',
      lead: 'Toute la cuisine travaille sur la même version. Fini les photos de photos dans le groupe WhatsApp.',
      sections: [
        ['Équipes de cuisine', 'Crée un espace pour ta cuisine, ta partie ou la nouvelle carte et invite ton équipe. Ce que tu changes, tout le monde le voit aussitôt.'],
        ['Des droits par personne', "Tu gères l'espace. Ton sous-chef ou chef de partie peut ajouter et modifier des recettes. Les commis et stagiaires peuvent consulter, mais rien changer."],
        ['Les nouveaux à niveau plus vite', 'Un nouveau cuisinier a dès le premier jour toutes les recettes de sa partie sur son téléphone, dans la version que tu as validée.'],
        ['Partager une seule recette', "Tu veux envoyer une recette, par exemple à un collègue d'un autre restaurant ? Partage-la avec un lien."]
      ]
    },
    scale: {
      slug: 'fr/adapter-recettes',
      title: 'Adapter et convertir ses recettes à tout rendement | Savour',
      desc: "Augmente ou réduis tes recettes à n'importe quel rendement : d'une dégustation pour 8 à un dîner pour 120. Savour convertit chaque quantité.",
      h1: 'Adapte tes recettes à tout rendement',
      lead: "D'une dégustation pour 8 à un dîner pour 120, sans calculatrice et sans erreur.",
      sections: [
        ['Convertis en une fois', "Saisis le rendement dont tu as besoin et Savour convertit chaque quantité. La recette d'origine ne bouge pas."],
        ['Il comprend les unités', "Savour sait que 3 cuillères à café font une cuillère à soupe et 1000 grammes un kilo. Les cuillères et les tasses restent en fractions nettes plutôt qu'en longues décimales. Même sans rendement, tu adaptes d'un geste : de ¼× à 10×, ou avec ton propre facteur. Et avec « J'ai », toute la recette suit ce que tu as d'un seul ingrédient."],
        ['Compter en pièces', 'Une recette donne 50 brownies et il t\'en faut 1 000 pour un événement ? Saisis le nombre de pièces et tu vois aussitôt ce que tu dois peser.'],
        ['Prêt pour la mise en place', 'Imprime aussitôt la recette convertie ou ouvre-la sur ton téléphone en mode cuisine.']
      ]
    },
    print: {
      slug: 'fr/imprimer-recettes',
      title: 'Imprimer ses recettes : une recette ou un dossier complet | Savour',
      desc: 'Imprime une recette ou un dossier complet en une fois, avec une mise en page nette pour le mur, le passe ou le classeur. Avec Savour Pro, au logo de ton restaurant.',
      h1: 'Imprimer ses recettes',
      lead: 'Imprime une recette pour le mur ou tout un dossier pour le classeur. Rapide, net et toujours la bonne version.',
      sections: [
        ['Imprimer une recette', "Ouvre une recette et choisis Imprimer. Tu obtiens une page claire avec le titre, le rendement, les ingrédients et la préparation. Tu as adapté la recette, par exemple à 40 couverts ? Tu imprimes alors exactement ces quantités."],
        ['Imprimer tout un dossier', "Toutes les recettes de glaces doivent aller dans le classeur de pâtisserie ? Ouvre le dossier et imprime-le en une fois : chaque recette sur sa page, dans l'ordre de ton dossier. Fini d'imprimer cinquante fichiers un par un."],
        ['Une mise en page calme', 'Grand et clair. Lisible à un mètre, même avec une tache dessus.'],
        ['Toujours la dernière version', "Comme tu imprimes depuis Savour, c'est toujours la bonne version qui est au mur. La date d'impression figure en bas, pour voir si un classeur est encore à jour."],
        ['Au logo de ton restaurant', "Avec Savour Pro, chaque page porte en haut le logo et le nom de ton restaurant. Dans une équipe, le logo vaut pour tout le monde. Choisis A4 pour le classeur ou A5 pour un petit classeur au passe."]
      ]
    },
    cloud: {
      slug: 'fr/base-de-donnees-recettes',
      title: 'Base de données et archives de recettes dans le cloud, aussi hors ligne | Savour',
      desc: "Savour est ta base de données et tes archives de recettes dans le cloud : tout est conservé en sécurité, sur ordinateur, tablette et téléphone, et disponible sans internet en cuisine.",
      h1: 'Ta base de données de recettes, en ligne et hors ligne',
      lead: "Toutes tes recettes en sécurité dans le cloud. Sur tous les appareils, même quand le wifi lâche dans la chambre froide.",
      sections: [
        ['Une base de données de recettes dans le cloud', "Toutes tes recettes sont au même endroit dans le cloud, et non plus éparpillées entre ordinateurs, téléphones et clés USB. Ton téléphone casse ou tu changes d'ordinateur ? Tu te connectes et tout est là. Ce que tu changes sur l'ordinateur, tu le vois aussitôt sur ton téléphone."],
        ['Sur tous les appareils', "Sur l'ordinateur, tu importes et tu organises ; en cuisine, tu ouvres la même recette sur ton téléphone ou ta tablette. Savour fonctionne dans le navigateur et s'installe sur ton écran d'accueil sans boutique d'applications : sur iPhone, Android, tablette et ordinateur."],
        ['Aussi hors ligne', "Dans la chambre froide, à la cave ou sur un événement, le wifi lâche souvent. Si tu as ouvert Savour une fois avec internet, ta bibliothèque reste sur l'appareil et tu ouvres tes recettes hors ligne. Tu pourras de nouveau modifier dès que tu seras en ligne."],
        ['Des archives qui restent', "Menus des saisons passées, recettes d'un ancien chef, le menu dégustation d'il y a trois ans : dans Savour, tu ne perds rien. Range-les dans un dossier d'archives et ils restent faciles à retrouver. Si tu arrêtes Pro un jour, toutes tes recettes restent."],
        ['Sécurisé et à toi', "Seuls toi et les personnes que tu invites dans une équipe de cuisine voient tes recettes ; elles sont séparées par compte. Avec Savour Pro, tu télécharges tout ton livre quand tu veux, en fichiers Word ou en sauvegarde."]
      ]
    },
    roadmap: {
      slug: 'fr/bientot',
      short: "Coût par recette, allergènes et historique de chaque recette.",
      title: 'Bientôt dans Savour : coût des recettes, allergènes et plus',
      desc: "Ce sur quoi nous travaillons : le coût par recette, les allergènes par plat, l'historique de chaque recette et une application pour iPhone et Android.",
      h1: 'Ce sur quoi nous travaillons',
      lead: "Savour grandit avec la cuisine. Voici ce qui est prévu. Il te manque quelque chose ? Dis-le-nous.",
      sections: [
        ['Coût par recette', "Vois ce que coûte chaque plat et chaque portion, et ce qui se passe quand le prix d'un produit change."],
        ['Les allergènes en un coup d\'œil', "Par recette et par plat composé, pour répondre aussitôt à la question d'un client en salle."],
        ['Historique de chaque recette', 'Vois qui a changé quoi dans une recette partagée et reviens à une version antérieure si besoin.'],
        ['Une application pour iPhone et Android', "Savour fonctionne déjà dans le navigateur de tous les appareils. Nous étudions une application propre, et ton avis compte."]
      ]
    }
  },
  audiences: {
    chefs: {
      slug: 'fr/pour-cuisiniers',
      title: 'Application de recettes pour chefs, sous-chefs et pâtissiers | Savour',
      desc: 'Savour est fait pour les cuisiniers professionnels : chefs de cuisine, sous-chefs et pâtissiers. Toutes tes recettes au même endroit, exactement comme tu les as écrites.',
      h1: 'Pour les cuisiniers',
      lead: "Que tu diriges la cuisine, que tu fasses les sauces ou que tu sois en pâtisserie : tes recettes doivent être justes et faciles à retrouver.",
      sections: [
        ['Tes recettes, un seul endroit', "Menus de saison, menus dégustation, recettes de base d'il y a des années. Dans Savour, tout est dans un seul livre, rangé comme tu travailles."],
        ['Précis, au gramme près', "En pâtisserie, une recette est une formule. Savour conserve tes recettes exactement comme tu les as écrites et n'invente jamais de quantités. Si le lecteur a un doute à l'importation, tu vérifies toi-même."],
        ['Adapter aux couverts et aux pièces', "D'une dégustation pour 8 à un dîner pour 120, ou de 50 bonbons à 800. Savour convertit tout."],
        ['Ton savoir reste', "Ce que tu as construit pendant des années ne vit plus seulement dans un cahier ou dans ta tête. Il reste, même si tu changes de cuisine."]
      ]
    },
    brigade: {
      slug: 'fr/pour-brigades',
      title: 'Gestion des recettes pour les brigades de cuisine | Savour',
      desc: "Savour pour les brigades : chefs de partie, commis et stagiaires travaillent avec les mêmes recettes, sur leur propre téléphone. Tu décides qui peut faire quoi.",
      h1: 'Pour les brigades de cuisine',
      lead: "Du chef de partie au stagiaire : toute ton équipe cuisine avec la même recette, dans chaque établissement que tu diriges.",
      sections: [
        ['Une version pour tous', "Ajuste une sauce pour la nouvelle carte et toute l'équipe travaille aussitôt avec la nouvelle version."],
        ['Des droits par personne', "Tu gères l'espace. Ton sous-chef ou chef de partie peut ajouter et modifier des recettes. Les commis et stagiaires peuvent consulter, mais rien changer."],
        ['Sur leur propre téléphone', "Fini le classeur commun couvert de taches. Chaque membre de la brigade ouvre les recettes de sa partie sur son téléphone, en grands caractères en mode cuisine."],
        ['Les nouveaux à niveau plus vite', "Stagiaires et nouveaux cuisiniers lisent comment on fait ici, au lieu de poser des questions pendant le service. Être membre d'une équipe de cuisine est gratuit ; avec un abonnement d'équipe, tout le monde a Savour Pro."]
      ]
    }
  },
  story: {
    slug: 'fr/a-propos',
    title: "À propos de Savour : créé par un cuisinier, pas par un éditeur de logiciels",
    desc: "L'histoire de Savour : quinze ans de recettes sur des bouts de papier, cinquante clics sur imprimer et une application de recettes construite après le service.",
    h1: "L'histoire de Savour",
    lead: "Savour a été créé par un cuisinier, pas par un éditeur de logiciels. Par frustration d'avoir des recettes partout, sauf là où il en avait besoin.",
    chapters: [
      ['Quinze ans de recettes sur des bouts de papier', ["Le cuisinier derrière Savour travaille en cuisine depuis quinze ans. Pendant tout ce temps, les recettes ont été un chaos : papiers tachés de café, photos sur différents téléphones, dont certains ont cassé avant que les recettes soient sauvegardées, et documents Word éparpillés entre dossiers et ordinateurs.", "Le plus difficile n'était même pas le désordre, mais que rien ne soit au même endroit. Juste au moment où il fallait une recette, en pleine mise en place ou juste avant le service, elle restait introuvable."]],
      ['Cliquer cinquante fois sur imprimer', ["Comme chef, tu transmets presque toutes les recettes à tes cuisiniers. Quand tout s'est enfin retrouvé dans des fichiers Word séparés, le problème suivant est arrivé : la salle devait les imprimer un par un, car impossible d'en imprimer cinquante à la fois.", "Quelque part entre ces piles de papier est née la question à l'origine de Savour : pourquoi n'existe-t-il rien pour cela qui fonctionne simplement dans une vraie cuisine ?"]],
      ['Construit après le service', ["Pas un développeur, mais un cuisinier qui sait exactement où ça coince. Savour a été construit pas à pas, pendant des mois, le week-end et après le service.", "Chaque fonction a été testée avec nos propres recettes, dans notre propre cuisine : importer des centaines de recettes Word d'un coup, des photos de notes tachées prises à l'envers par erreur et des dossiers que toute l'équipe peut ouvrir. Un cuisinier a ainsi importé 1 400 recettes en deux minutes environ."]],
      ['Pourquoi Savour coûte 2,99 €', ["Pour les cas difficiles, comme la photo d'une note manuscrite, Savour utilise l'IA. Cela coûte de l'argent à chaque fois, d'où Savour Pro.", "Mais Savour devait rester abordable pour chaque cuisinier, pas seulement pour les grands groupes aux gros budgets. 2,99 € par mois, c'est à peu près ce que coûte cette IA. Ce que Savour peut lire lui-même, comme Word et PDF, reste gratuit, tout comme la conservation de 100 recettes."]],
      ["Ce que Savour fait aujourd'hui", ["Importer tout ton livre de recettes en quelques minutes. Classer les recettes en dossiers, par exemple toutes tes recettes de glaces, et imprimer tout le dossier d'un seul bouton. Partager recettes et dossiers avec des collègues, qui peuvent eux-mêmes ajouter des recettes.", "Et adapter : une recette donne cinquante brownies et il t'en faut mille ? Savour fait le calcul. Sur l'ordinateur, la tablette et le téléphone en cuisine."]],
      ['Ce que nous voulons encore construire', ["Le coût par recette et les allergènes en un coup d'œil sont en tête de liste. Si Savour fonctionne bien sur ordinateur, tablette et téléphone, nous verrons si une application propre pour iPhone et Android en vaut la peine.", "Cela ne se décide pas derrière un bureau, mais avec les cuisiniers qui utilisent Savour. Il manque quelque chose dans ta cuisine ? Dis-le-nous."]]
    ],
    notesCaption: 'Quelques-unes des notes par lesquelles Savour a commencé.',
    appCaption: 'Le même type de recette, désormais dans Savour.',
    roadmapLink: 'Vois ce sur quoi nous travaillons',
    valuesTitle: 'Ce que nous défendons',
    values: [
      ['Une recette doit être juste', "Savour n'invente jamais de quantités ni d'étapes. En cas de doute, tu le vois et tu décides."],
      ['Ton savoir est à toi', 'Si tu arrêtes Pro un jour, toutes tes recettes restent.'],
      ['Fait pour la cuisine', 'Rapide, calme et lisible, même les mains mouillées en plein service.']
    ]
  },
  posts: {
    "en/blog/savour-vs-paprika-meez-galley": {
      "slug": "fr/blog/savour-paprika-meez-galley-comparatif",
      "title": "Savour, Paprika, Meez et Galley comparés : quelle application de recettes pour ta cuisine ?",
      "desc": "Paprika, Meez, Galley et Savour côte à côte : pour qui chaque application est faite, ce qu’elle fait, ce qu’elle coûte et laquelle convient à un cuisinier amateur, un groupe de restaurants, une cuisine collective ou une brigade.",
      "h1": "Savour, Paprika, Meez et Galley comparés : quelle application de recettes pour ta cuisine ?",
      "lead": "Quatre applications qui « gèrent des recettes », mais pour des cuisines très différentes. La vraie question n’est pas laquelle en fait le plus, mais pour qui elle a été faite.",
      "sections": [
        [
          "Quatre applications, quatre publics",
          "Paprika est faite pour le cuisinier amateur. Meez pour les groupes de restaurants à plusieurs établissements. Galley pour les cuisines collectives, la restauration sous contrat et les chaînes qui produisent en volume. Savour pour le chef et la brigade d’une cuisine professionnelle. Sur le papier, elles se recoupent, mais chacune résout un autre problème. Choisir une application pensée pour une autre cuisine, c’est payer des fonctions qu’on n’utilise jamais, ou manquer justement ce dont on a besoin chaque jour."
        ],
        [
          "Paprika : pour le cuisinier amateur",
          "Paprika est une application de recettes pour la maison. Tu enregistres des recettes de sites web avec le navigateur intégré, tu planifies des menus de la semaine, tu fais des listes de courses triées par rayon, tu suis ton garde-manger et tu adaptes les portions, y compris entre système métrique et mesures américaines. Il existe des versions pour iPhone et iPad, Android, Mac et Windows, chacune achetée séparément et une seule fois, sans abonnement. Les recettes se synchronisent entre tes propres appareils. Le partage se fait recette par recette, par exemple par e-mail ou lien ; il n’y a pas d’équipes de cuisine avec des rôles."
        ],
        [
          "Meez : pour les groupes de restaurants",
          "Meez se présente comme un outil de gestion des recettes et de calcul des coûts pour les groupes de restaurants, visant des groupes et des marques de 5 à plus de 100 établissements : chefs exécutifs, direction culinaire, finance et formation. Au-delà des recettes, de l’adaptation des quantités et de la formation avec photos et vidéos, tout tourne autour de l’argent : coût par recette qui suit les prix d’achat, les neuf allergènes majeurs (la liste américaine), gestion des stocks, lecture des factures et intégrations avec des systèmes comme Restaurant365. Meez fonctionne dans le navigateur, en anglais et avec des prix en dollars."
        ],
        [
          "Galley : pour la restauration collective et le volume",
          "Galley se décrit comme une plateforme de « Culinary Resource Planning » pour la restauration sur site (restaurants d’entreprise, campus, santé et restauration sous contrat) et les groupes de restaurants à nombreux établissements. Les recettes y sont le début d’une chaîne : coûts en temps réel, planification des menus, planification de la production selon le nombre de couverts, valeurs nutritionnelles et allergènes, factures, stocks et achats, avec des connexions aux grossistes. Galley vend via un échange avec un conseiller et une démo, avec une mise en place par sa propre équipe."
        ],
        [
          "Savour : pour le chef et la brigade",
          "Savour est fait par des cuisiniers pour la cuisine professionnelle elle-même : le chef, le second et la brigade qui travaillent chaque jour avec les mêmes recettes. L’objectif : numériser ton classeur de recettes vite et sans erreur, bien l’organiser et l’avoir sur chaque téléphone en cuisine. Savour fonctionne dans le navigateur sur ordinateur, tablette et téléphone, s’ouvre aussi sans internet et existe en français, anglais, néerlandais, allemand et espagnol."
        ],
        [
          "Comparaison : faire entrer tes recettes",
          "Paprika est conçue pour enregistrer des recettes de sites web. Meez a un import par IA et un service de chargement ; Galley s’occupe du transfert lors de la mise en place. Savour lit gratuitement Word, PDF et texte avec son propre lecteur Savour, même des dossiers entiers d’un coup (une cuisine a transféré 1 400 recettes depuis Word en environ 2 minutes). Avec Savour Pro, l’IA lit aussi les photos de notes manuscrites. La règle d’or : Savour n’invente jamais de quantités, d’ingrédients ni d’étapes ; en cas de doute, tu le vois et tu décides."
        ],
        [
          "Comparaison : coûts, allergènes et stocks",
          "C’est là que Meez et Galley sont les plus forts : des coûts qui suivent tes factures, les allergènes, les valeurs nutritionnelles, les stocks et les achats. Paprika ne le fait pas, à part un garde-manger pour la maison. Savour ne le fait pas encore non plus. Le coût par recette et les allergènes en un coup d’œil sont en tête de notre liste. Si ta cuisine tourne surtout autour des marges sur des dizaines d’établissements, Meez ou Galley est aujourd’hui le meilleur choix."
        ],
        [
          "Comparaison : travailler avec ton équipe",
          "Paprika est faite pour une personne ou un foyer. Meez et Galley sont pensées pour les organisations, avec des droits par établissement, rôle ou concept. Savour se situe entre les deux : des équipes de cuisine avec trois rôles, propriétaire (gère), éditeur (ajoute et modifie) et lecteur (consulte seulement). Ton nouveau commis peut donc tout consulter, sans pouvoir modifier par erreur ta hollandaise. Tu changes une sauce pour la nouvelle carte, et tout le monde le voit aussitôt sur son téléphone."
        ],
        [
          "Comparaison : ce que ça coûte",
          "Paprika : achat unique par plateforme, sans abonnement. Meez : pas de version gratuite, mais 14 jours d’essai ; Starter à partir de 19 $ par mois (paiement annuel), Pro à partir de 89 $ et Premium à partir de 179 $ par mois, Enterprise sur mesure. Galley : une licence d’entreprise plus un tarif mensuel fixe par établissement et une mise en place unique, sur devis. Savour : gratuit jusqu’à 100 recettes, Savour Pro 2,99 € par mois ou 29 € par an, équipes de cuisine de 5, 10 ou 25 personnes pour 8,99 €, 14,99 € ou 29,99 € par mois. Les nouveaux comptes ont 7 jours de Pro gratuits, sans données de paiement. Si tu arrêtes Pro, toutes tes recettes restent."
        ],
        [
          "Laquelle te convient ?",
          "Tu cuisines à la maison et tu veux des menus et des listes de courses : Paprika. Tu diriges un groupe de restaurants à plusieurs établissements et tout tourne autour du coût et de la marge : Meez. Tu cuisines en volume pour des entreprises, des écoles ou des hôpitaux, avec planification de la production et achats : Galley. Tu travailles dans une cuisine professionnelle et tu veux surtout que toute ta brigade travaille avec les mêmes recettes justes, sans gros projet ni abonnement élevé : essaie Savour."
        ]
      ],
      "outro": "Les fonctions et les prix de Paprika, Meez et Galley proviennent de leurs propres sites et ont été vérifiés le 2 novembre 2026. Ils peuvent changer ; consulte leurs sites pour les informations à jour."
    },
    'en/blog/have-your-recipe-folder-moved-over': {
      slug: 'fr/blog/transferer-son-classeur-de-recettes',
      title: 'Transférer son classeur de recettes : pourquoi les cuisines repoussent et comment y arriver',
      desc: "Pourquoi les cuisines repoussent toujours leur classeur de recettes, ce qui rate quand c'est fait à moitié et comment les cuisiniers de Savour chargent tes recettes pour ta brigade.",
      h1: 'Transférer son classeur de recettes : pourquoi les cuisines repoussent et comment y arriver',
      lead: "Presque tous les chefs veulent leurs recettes en numérique. Presque aucun n'a le temps de les transférer. C'est pourquoi les cuisiniers de Savour le font pour toi.",
      sections: [
        ['Pourquoi ça reste en attente', "Transférer un classeur n'est pas un travail à faire entre deux services. Des centaines de recettes réparties entre fichiers Word, cahiers et photos, et chacune doit être copiée, vérifiée et rangée. Alors le classeur attend, jusqu'à ce que quelqu'un parte ou qu'il disparaisse."],
        ["Ce qui rate quand c'est fait à moitié", "Si un stagiaire recopie tout à la main, des erreurs de quantités apparaissent. Un scanner sans vérification transforme sans prévenir 1 cuillère en 1 litre. Numériser à moitié est pire que ne rien faire : plus personne ne fait confiance à l'application et le classeur papier revient au passe."],
        ['Tu choisis la structure', "Tu choisis une formule et tu demandes le service d'importation. Après validation, tu paies et tu nous envoies tout : Word, PDF, photos de cahiers et de notes ou exports d'une autre application. Tu nous indiques ta structure de dossiers, par partie, par type ou par menu, comme ta cuisine travaille."],
        ['Chaque recette vérifiée', "Nous lisons tout avec le lecteur Savour et comparons chaque recette à l'original : quantités, unités, rendement et préparation. Là où la source laisse un doute, nous regardons de plus près. Rien n'est inventé ; ce qui n'y est pas, nous ne le complétons pas."],
        ['Tout prêt pour ta brigade', "Tu nous donnes les e-mails de tes collègues. Chacun reçoit un compte avec Savour Pro, l'accès aux recettes et un e-mail pour choisir son mot de passe. Dès le premier jour, toute ta brigade ouvre le même livre, sur téléphone, sur la tablette au passe et sur l'ordinateur du bureau."],
        ['Tes recettes restent à toi', "Les fichiers que tu envoies sont conservés dans un stockage privé visible uniquement par Savour et supprimés dès que ton équipe est prête. Ensuite, tes recettes ne sont plus que dans ton équipe."],
        ['Combien ça coûte', "Une fois 85 € jusqu'à 100 recettes, 100 € jusqu'à 500 et 164,99 € jusqu'à 1 000, avec un abonnement annuel pour ton équipe de 5, 10 ou 25 personnes. Au-delà, sur devis. Nous chargeons gratuitement les cinq premières cuisines."]
      ],
      outro: "Envie d'en savoir plus ou de faire une demande ? Regarde « Service d'importation » sur savour.page."
    },
    'en/blog/recipe-database-in-the-cloud': {
      slug: 'fr/blog/base-de-donnees-recettes-cloud',
      title: 'Une base de données de recettes pour ta cuisine : en ligne, hors ligne et dans le cloud',
      desc: "Pourquoi chaque cuisine professionnelle a besoin d'une base de données de recettes, pourquoi dans le cloud, comment accéder à tes recettes hors ligne et comment créer des archives.",
      h1: 'Une base de données de recettes pour ta cuisine : en ligne, hors ligne et dans le cloud',
      lead: "La plupart des cuisines ont leurs recettes à dix endroits à la fois. Une base de données réunit tout au même endroit, accessible de partout.",
      sections: [
        ['Le problème : des recettes à dix endroits', "Des fichiers Word sur l'ordinateur de l'ancien chef, des photos sur trois téléphones, un classeur taché au passe. Chacun de ces endroits peut disparaître : un téléphone cassé, un collègue qui part, un classeur qui finit à la plonge."],
        ['Ce que fait une bonne base de données de recettes', "Toutes les recettes au même endroit, avec une recherche par titre, ingrédient et préparation. Chaque recette avec la même structure : titre, rendement, ingrédients et étapes. Et des dossiers et catégories, pour ne pas parcourir des centaines de recettes."],
        ['Pourquoi dans le cloud', "Dans le cloud, ta base est la même partout : sur l'ordinateur du bureau, sur la tablette au passe et sur ton téléphone à la maison. Un changement se voit aussitôt partout, et un nouveau téléphone signifie simplement te reconnecter."],
        ['Et hors ligne en cuisine', "Les cuisines sont mauvaises pour le wifi : inox, chambres froides, sous-sols. D'où l'intérêt d'une application qui fonctionne aussi hors ligne. Dans Savour, tu ouvres tes recettes en chambre froide ou sur un événement, si tu as ouvert l'application une fois avec une connexion."],
        ['Des archives, pas une poubelle', "Ne jette pas les anciens menus. Des archives des saisons passées valent de l'or quand un plat revient ou qu'un client demande un ancien dessert. Range-les dans un dossier d'archives : hors de vue, mais toujours retrouvables."]
      ],
      outro: 'Savour est ta base de données et tes archives de recettes dans le cloud, sur ordinateur, tablette et téléphone, et disponible hors ligne.'
    },
    'en/blog/sorting-out-a-messy-recipe-folder': {
      slug: 'fr/blog/ranger-classeur-recettes-desordonne',
      title: "Ranger un classeur de recettes en désordre avec l'IA et l'imprimer en une fois",
      desc: "Comment transformer un classeur de recettes dactylographiées, scannées et manuscrites en un livre bien rangé : importer, IA pour les notes, vérifier, classer et imprimer tout le dossier.",
      h1: "Ranger un classeur de recettes en désordre avec l'IA et l'imprimer en une fois",
      lead: "Des années de recettes dans un classeur : dactylographiées, scannées, manuscrites et pleines de numéros. Tout remettre au propre prend des semaines. Avec la bonne aide, un après-midi.",
      sections: [
        ['Le point de départ habituel', "Un classeur avec des recettes de différents chefs, des titres répétés, des en-têtes isolés et une recette qui continue en milieu de page. Plus personne ne sait quelle version est la bonne, et chercher prend plus de temps que cuisiner."],
        ['Laisse le lecteur faire le gros du travail', "Envoie tout le fichier dans Savour d'un coup. Le lecteur Savour le sépare en recettes, retire les numéros devant les titres, reconnaît des parties comme la pâte et la garniture et corrige les fautes courantes. Ce qui n'est pas clair, il le signale."],
        ['IA pour les notes et les cas douteux', "Les photos de notes manuscrites et les recettes dont le lecteur n'est pas sûr sont lues par l'IA (Savour Pro). Important : une bonne IA n'invente jamais de quantités. Ce qui est illisible reste signalé pour que tu le vérifies."],
        ['Vérifier une fois et enregistrer', "Tu vois toutes les recettes dans un seul aperçu, chacune avec une catégorie proposée. Corrige ce qui ne va pas et enregistre tout d'un coup."],
        ['Classer en dossiers', "Crée des dossiers par partie, menu ou saison. Une recette peut figurer dans plusieurs dossiers sans être dupliquée. Partage un dossier avec ta brigade et tout le monde travaille sur la même version."],
        ['Imprimer tout le dossier en une fois', "Le nouveau dossier doit aller dans le classeur du passe ? Imprime-le entièrement en une fois, avec sommaire et bien mis en page. Avec Savour Pro, le logo de ton restaurant figure sur chaque page."]
      ],
      outro: "Dans Savour, tu importes tout un classeur de recettes d'un coup, tu ranges tout en dossiers et tu imprimes un dossier complet en un clic."
    },
    'en/blog/shared-folders-explained': {
      slug: 'fr/blog/equipes-de-cuisine-expliquees',
      title: 'Les équipes de cuisine dans Savour : comment fonctionne ton livre de recettes partagé',
      desc: "Tout ce que tu peux faire avec une équipe de cuisine dans Savour : rôles, ajout de recettes et de dossiers, dossiers par partie ou menu, invitations, impression et copie de recettes.",
      h1: 'Équipes de cuisine : comment fonctionne ton livre de recettes partagé',
      lead: "Une équipe de cuisine, c'est le cœur de Savour : un seul livre pour toute ta cuisine, sur le téléphone de chacun, toujours la même version. Voici tout ce que tu peux en faire.",
      sections: [
        ['Un seul livre pour ton équipe', "Tous les membres d'une équipe de cuisine voient les mêmes recettes sur leur téléphone, tablette ou ordinateur. Si l'auteur change une recette, tout le monde voit aussitôt la nouvelle version. Plus de copies volantes ni de vieilles impressions au mur."],
        ['Rôles : propriétaire, éditeur et lecteur', "Le propriétaire gère l'espace, les membres et leurs rôles. Un éditeur ajoute et retire des recettes et des dossiers, et gère les dossiers. Un lecteur peut consulter, imprimer et adapter. Seul l'auteur d'une recette peut la modifier, pour que personne ne change par erreur celle d'un autre."],
        ['Ajouter des recettes', "Choisis « Ajouter une recette » et coche des recettes de ta bibliothèque. La recette reste la tienne : elle figure à la fois dans l'équipe de cuisine et dans tes recettes."],
        ['Dossiers par partie ou par menu', "Divise l'équipe de cuisine en dossiers : un par partie (garde-manger, sauces, pâtisserie) ou un par menu. « Gérer les dossiers » permet de les renommer, de les ordonner comme dans ta cuisine et d'archiver ceux que tu n'utilises plus, comme le menu de la saison passée. Les dossiers archivés et leurs recettes restent conservés sous « Archives »."],
        ['Inviter ton équipe', "Invite tes collègues par WhatsApp, Telegram, e-mail ou lien d'invitation. À la connexion, ils arrivent comme lecteurs ; comme propriétaire, tu peux ensuite leur donner un autre rôle. Être membre d'une équipe de cuisine est gratuit, même sans Savour Pro."],
        ['Imprimer pour le classeur', "Imprime toute l'équipe de cuisine, un dossier ou ta propre sélection en une fois. Tu obtiens un sommaire, le numéro de chaque recette en bas de page pour la retrouver vite et, avec Savour Pro, le logo de ton restaurant en haut."],
        ['Adapter et mode cuisine', "Adapte chaque recette au rendement voulu. Le mode cuisine affiche uniquement la recette en grands caractères et garde l'écran allumé ; coche les ingrédients et les étapes au fur et à mesure."],
        ['Copier une recette', "Sur chaque recette d'un collègue dans l'équipe de cuisine, tu vois « Ajouter à mes recettes ». Tu obtiens ta propre copie à modifier, l'original restant à son auteur."],
        ['Aussi sans internet', "Les recettes que tu as ouvertes restent disponibles sur ton téléphone. Même dans une cuisine en sous-sol sans wifi, tu peux les lire."],
        ['Quitter ou supprimer', "Un membre peut toujours quitter une équipe de cuisine. Seul le propriétaire peut la supprimer ; les recettes restent dans la bibliothèque de leur auteur."]
      ],
      outro: "Une équipe de cuisine se crée avec Savour Pro ; tout le monde peut en être membre gratuitement. Dans chaque équipe de cuisine, tu retrouves aussi cette explication derrière le bouton i."
    },
    'en/blog/recipe-management-for-restaurants': {
      slug: 'fr/blog/gestion-recettes-restaurants',
      title: 'Gestion des recettes pour restaurants : par où commencer',
      desc: "La gestion des recettes pour restaurants, hôtels et traiteurs : comment réunir les recettes, les partager avec ton équipe de cuisine et les garder à jour.",
      h1: 'Gestion des recettes pour restaurants : par où commencer',
      lead: "Dans la plupart des restaurants, la gestion des recettes n'est pas un système mais une collection : classeurs, fichiers, photos et ce dont le chef se souvient. Ça marche, jusqu'au départ de quelqu'un ou au changement de carte.",
      sections: [
        ["Qu'est-ce que la gestion des recettes ?", "Gérer ses recettes, c'est avoir toutes les recettes du restaurant au même endroit, dans un format fixe, et que toute la cuisine utilise la même version. Il ne s'agit pas de logiciel sophistiqué, mais de règles : où c'est, qui peut changer et comment on trouve."],
        ['Étape 1 : réunis ce que tu as', "Ne commence pas avec un système vide. Réunis tes fichiers Word, PDF et notes et importe-les en une fois. Une application qui reconnaît elle-même les recettes t'évite des semaines de ressaisie."],
        ['Étape 2 : choisis une structure', "Choisis une structure adaptée à ton restaurant : par partie, par menu, ou les recettes de base séparées des plats. Reste simple ; tu pourras toujours développer. Notre article sur le classement des dossiers donne des exemples."],
        ['Étape 3 : décide qui peut faire quoi', "Convenez de qui peut changer les recettes, en général le chef et le sous-chef, et laisse le reste de l'équipe consulter. Tu évites ainsi trois versions de la même sauce."],
        ['Étape 4 : rends cela facile en cuisine', "La gestion des recettes ne fonctionne que si elle est plus rapide en cuisine que la bonne vieille note. Les recettes doivent s'ouvrir sur le téléphone en grands caractères et un dossier entier doit s'imprimer en une fois."],
        ['Plusieurs restaurants ou sites', "Tu gères plusieurs restaurants ou un traiteur ? Crée une équipe de cuisine par site, avec les mêmes recettes de base. Un changement dans la base est juste partout à la fois."]
      ],
      outro: 'Savour est fait pour gérer les recettes des cuisines professionnelles : importer, organiser, partager avec ton équipe et imprimer.'
    },
    'en/blog/shared-recipe-book-kitchen-team': {
      slug: 'fr/blog/livre-recettes-partage-equipe',
      title: 'Ce qu\'un livre de recettes partagé apporte à ton équipe de cuisine',
      desc: "Une version de chaque recette, pour toute la cuisine. Ce que cela change pour le calme, la qualité et l'intégration, et comment le mettre en place.",
      h1: 'Ce qu\'un livre de recettes partagé apporte à ton équipe de cuisine',
      lead: "Dans beaucoup de cuisines, la recette la plus importante vit dans la tête d'une seule personne. Quand elle part en vacances, ça se voit dans l'assiette.",
      sections: [
        ['Moins de questions pendant le service', "Quand chacun peut ouvrir la recette sur son téléphone, personne n'a à demander en plein service combien d'estragon va dans la béarnaise. Le chef garde les mains et la tête libres pour le passe."],
        ['Le même plat, chaque jour', "Trois versions de la même sauce naissent toutes seules : quelqu'un change un détail et le note sur son papier. Avec une recette partagée, la dernière version est toujours la seule. Cela se voit dans la régularité, même le soir le plus chargé."],
        ['De la responsabilité sans chaos', "Tout le monde n'a pas besoin de tout pouvoir changer. Donne à ton sous-chef ou chef de partie le droit de modifier et laisse les commis et stagiaires consulter. Le livre reste celui de la cuisine, pas du dernier qui y a touché."],
        ['Un savoir qui reste', "Quand un cuisinier part, le savoir ne part pas avec lui. Ce qui est dans l'équipe de cuisine appartient à la cuisine. Pour un nouveau, c'est le moyen le plus rapide d'apprendre comment on travaille ici."],
        ['Comment commencer', "Commence petit : une équipe de cuisine avec les recettes de base utilisées chaque jour, comme les fonds, les sauces et les garnitures fixes. Invite ton équipe et convenez de qui peut changer quoi. Élargis ensuite par partie ou par menu."]
      ],
      outro: "Dans Savour, tu crées des équipes de cuisine avec les droits de ton choix. Être membre d'une équipe de cuisine est gratuit."
    },
    'en/blog/recipe-folder-examples': {
      slug: 'fr/blog/classer-dossiers-recettes-exemples',
      title: 'Classer ses dossiers de recettes : cinq exemples de vraies cuisines',
      desc: 'Par partie, par menu, base à part, pâtisserie ou événements : cinq façons de classer tes dossiers de recettes et quand chacune fonctionne.',
      h1: 'Classer ses dossiers de recettes : cinq exemples de vraies cuisines',
      lead: "Aucune structure ne convient à toutes les cuisines. Certaines ont toutefois fait leurs preuves. Choisis celle qui correspond à ta façon de travailler.",
      sections: [
        ['1. Par partie', "Garde-manger, sauces, entremets, pâtisserie. Pendant le service, chacun n'ouvre que ce dont sa partie a besoin. Fonctionne bien dans les cuisines avec une brigade et des parties fixes."],
        ['2. Par menu ou saison', "Un dossier pour le menu du midi, un pour le menu dégustation, un pour le menu d'automne. Pratique si ta carte change souvent. Passe les anciens menus dans un dossier d'archives en fin de saison pour garder ton livre actuel clair."],
        ['3. La base séparée des plats', "Un dossier pour la base qui change peu, comme les fonds, jus, pâtes et sauces mères, et des dossiers pour les plats qui s'appuient dessus. Change le jus de veau une fois et il est juste partout."],
        ['4. La pâtisserie par préparation', "Pâtes, crèmes, glaces et sorbets, glaçages, décors et bonbons. En pâtisserie, on cherche souvent par préparation plutôt que par plat. Une recette peut être dans plusieurs dossiers : ta crème pâtissière appartient aux crèmes et au dessert dont elle fait partie."],
        ['5. Par événement ou client', "Pour le traiteur et les banquets : un dossier par événement ou client fidèle, avec exactement les recettes du jour. Adapte-les au nombre d'invités et imprime tout le dossier pour la cuisine."],
        ['Combine dossiers et catégories', "Utilise les catégories pour ce qu'est une recette (sauce, garniture, dessert) et les dossiers pour l'endroit où tu l'utilises. Tu peux ainsi chercher de deux façons, sans qu'une recette existe en double."]
      ],
      outro: 'Dans Savour, tu crées tes propres dossiers et catégories, et une recette peut figurer dans plusieurs dossiers à la fois.'
    },
    'en/blog/sharing-recipes-with-your-team': {
      slug: 'fr/blog/partager-recettes-avec-equipe',
      title: 'Partager ses recettes avec son équipe, sans photos de photos',
      desc: 'Partager des recettes dans le groupe WhatsApp finit en photos floues et vieilles versions. Comment partager recettes et dossiers avec ton équipe, avec les bons droits.',
      h1: 'Partager ses recettes avec son équipe, sans photos de photos',
      lead: "La photo d'une recette, transférée dans le groupe, reprise en photo depuis un autre écran. Tu connais. Et personne ne sait quelle version est la bonne.",
      sections: [
        ['Partage tout un dossier', "Crée une équipe de cuisine, par exemple « Sauces » ou « Menu d'automne », et invite tes collègues. Tout le monde voit les mêmes recettes et un changement apparaît aussitôt pour tous."],
        ['Choisis ce que chacun peut faire', "Il y a trois rôles. Le propriétaire gère l'espace. Un éditeur peut ajouter et changer des recettes. Un lecteur peut tout voir mais rien changer. Tu décides qui touche aux recettes."],
        ['Envoie une seule recette', "Tu veux partager une recette, par exemple avec un collègue d'un autre restaurant ou un fournisseur ? Partage-la avec un lien. Le destinataire la voit proprement, sans compte."],
        ['Des collègues qui construisent avec toi', "Une équipe de cuisine ne doit pas venir que de toi. Donne le droit de modifier à ton sous-chef et laisse l'équipe ajouter des recettes. Le livre grandit avec la cuisine."],
        ['Ce que ça coûte', "Être membre d'une équipe de cuisine est gratuit. Créer ta propre équipe de cuisine fait partie de Savour Pro. Avec un abonnement d'équipe, toute ta cuisine a Pro."]
      ],
      outro: 'Les équipes de cuisine avec rôles se trouvent dans Savour sous « Équipes de cuisine ».'
    },
    'en/blog/roadmap': {
      slug: 'fr/blog/feuille-de-route',
      title: 'Feuille de route : ce sur quoi nous travaillons chez Savour',
      desc: "Coût par recette, allergènes, historique de chaque recette et peut-être une application pour iPhone et Android. Ce qui est prévu et comment nous décidons des priorités.",
      h1: 'Feuille de route : ce sur quoi nous travaillons',
      lead: "Savour est construit par un cuisinier pour des cuisiniers. Cela veut dire aussi que nous construisons ce dont la cuisine a vraiment besoin, pas ce qui sonne bien dans une présentation.",
      sections: [
        ['Coût par recette', "Vois ce que coûtent un plat et une portion, et ce qui se passe quand le prix d'un produit monte. C'est la fonction la plus demandée, tout en haut de la liste."],
        ['Les allergènes en un coup d\'œil', "Par recette et par plat composé, pour répondre à un client en salle sans aller en cuisine."],
        ['Historique de chaque recette', "Vois qui a changé quoi dans une recette partagée et reviens à une version antérieure si besoin. L'impression avec ton logo est déjà prête et fait partie de Savour Pro."],
        ['Une application pour iPhone et Android', "Savour fonctionne déjà dans le navigateur de l'ordinateur, de la tablette et du téléphone, sans rien installer. Nous étudions une application propre. Cela dépendra de ce que disent les cuisiniers."],
        ['Comment nous décidons', "Nous regardons ce que nous disent les cuisiniers et ce qui fait gagner le plus de temps en cuisine. Une idée ou un manque ? Écris-nous à contact@savour.page. Nous lisons tout."]
      ],
      outro: 'Cette feuille de route est une direction, pas une promesse datée. Nous la tenons à jour ici.'
    },
    'en/blog/onboarding-new-cooks': {
      slug: 'fr/blog/integrer-nouveaux-cuisiniers',
      title: 'Intégrer un nouveau cuisinier avec des recettes standard',
      desc: "Les premières semaines d'un nouveau cuisinier coûtent du temps à toute la brigade. Avec des recettes standard partagées, l'intégration est plus rapide et plus calme.",
      h1: 'Intégrer un nouveau cuisinier avec des recettes standard',
      lead: "Un nouveau cuisinier veut bien faire, mais ne sait pas encore comment ça marche ici. Chaque question pendant le service détourne l'attention d'un autre.",
      sections: [
        ['Donne-lui les recettes avant le premier service', "Ajoute le nouveau comme lecteur à l'équipe de cuisine de sa partie. Il peut lire chez lui ce qui se fait et comment, dans la version que tu as validée."],
        ['Fais-le cuisiner depuis son téléphone', "En mode cuisine, la recette s'affiche en grands caractères. Il coche ce qui est fait et fait défiler les mains mouillées. Plus de feuilles grasses illisibles en plein service."],
        ['Une seule façon de travailler', "Celui qui apprend avec une recette standard apprend la façon de travailler de ta cuisine. Pas celle de son ancien restaurant, ni celle du collègue qui se trouvait à côté."],
        ['Demande son avis', "Les nouveaux voient ce que les anciens ne voient plus : une quantité qui ne colle pas, une étape manquante. Laisse-les le dire et mets la recette à jour pour tout le monde."]
      ],
      outro: 'Dans Savour, tu ajoutes les nouveaux cuisiniers à une équipe de cuisine avec droit de lecture. Pour eux, c\'est gratuit.'
    },
    'en/blog/scaling-recipes-without-errors': {
      slug: 'fr/blog/adapter-recettes-sans-erreur',
      title: 'Adapter ses recettes sans erreur de calcul',
      desc: "De 8 à 120 couverts ou de 50 à 1 000 pièces. Où l'adaptation des quantités dérape et comment la faire de façon fiable.",
      h1: 'Adapter ses recettes sans erreur de calcul',
      lead: "Adapter paraît simple : tout fois quinze. Jusqu'à ce que tu découvres à cinq heures que la gélatine n'a pas été multipliée.",
      sections: [
        ['Où ça dérape', "Le calcul mental sous pression, les unités mélangées (grammes, décilitres, pièces) et l'original écrasé par la version adaptée. Ensuite, plus personne ne sait quelle était la recette de base."],
        ['Calcule à partir du rendement', "Note ce que donne chaque recette : 0,5 litre, 40 portions ou 50 pièces. Tu ne calcules plus « fois quinze », mais à partir de ce dont tu as besoin."],
        ["Garde l'original", "Adapte une copie ou convertis seulement à l'écran. La recette de base reste exactement comme elle était, pour la prochaine fois."],
        ['Attention aux gélifiants et aux pâtes', "Gélatine, agar, levures et sel ne suivent pas toujours un pour un en pratique, surtout en grandes quantités. Teste toujours une grande série avant de t'y fier."]
      ],
      outro: "Dans Savour, tu saisis le rendement voulu et Savour convertit chaque quantité. La recette d'origine ne bouge pas."
    },
    'en/blog/from-word-to-recipe-book': {
      slug: 'fr/blog/de-word-au-livre-de-recettes',
      title: 'Du document Word au livre de recettes en quelques minutes',
      desc: "Des centaines de recettes dans un fichier Word ? Comment Savour les lit, ce que le lecteur reconnaît et corrige, et quand tu dois vérifier.",
      h1: 'Du document Word au livre de recettes en quelques minutes',
      lead: "Beaucoup de cuisiniers l'ont déjà : un gros fichier Word avec des années de recettes. Tout retaper prend des semaines. Ce n'est pas nécessaire.",
      sections: [
        ['Fais glisser le fichier', "Choisis ton fichier Word ou PDF dans Savour. Le lecteur Savour parcourt tout le document et le divise lui-même en recettes distinctes, même s'il y en a des centaines."],
        ['Ce que le lecteur reconnaît', "Les titres, aussi en gras ou numérotés, les ingrédients avec quantité et unité et la préparation en étapes. Les numéros devant les titres et les petites coquilles, comme 18oc au lieu de 180 °C, sont corrigés."],
        ['Quand le lecteur a un doute', "Tous les documents ne sont pas bien mis en forme. Si le lecteur doute d'une recette, elle est signalée et tu la vérifies avant de l'enregistrer. Avec Savour Pro, l'IA lit automatiquement ces cas douteux."],
        ["C'est rapide à ce point", "Un cuisinier a ainsi importé 1 400 recettes Word en deux minutes environ. Tu peux ensuite aussitôt les classer, les compléter et les partager."],
        ['Gratuit ou Pro', "Tu importes gratuitement Word, PDF et texte avec le lecteur Savour, jusqu'à 100 recettes. Avec Savour Pro, le nombre de recettes est illimité et l'IA lit aussi les photos et les notes manuscrites."]
      ],
      outro: "L'importation se trouve dans Savour sous « Ajouter une recette »."
    },
    'en/blog/ai-should-never-invent-recipes': {
      slug: 'fr/blog/ia-ne-doit-pas-inventer-recettes',
      title: "Pourquoi l'IA ne doit jamais inventer tes recettes",
      desc: "L'IA peut lire l'écriture manuscrite et ranger des documents en désordre. Mais une recette doit être juste. Pourquoi Savour s'arrête en cas de doute au lieu de deviner.",
      h1: "Pourquoi l'IA ne doit jamais inventer tes recettes",
      lead: "L'IA sait très bien compléter ce qui est probablement écrit. En cuisine, « probablement » ne suffit pas.",
      sections: [
        ['Le problème de deviner', "En lisant la photo floue d'une note, on pourrait supposer qu'il est écrit 150 grammes de sucre. Mais si c'était 150 grammes de glucose, ta guimauve ne fonctionne plus. Une supposition intelligente paraît aussi convaincante que la bonne réponse."],
        ['Ce que Savour fait autrement', "Savour n'invente jamais de quantités, d'ingrédients ni d'étapes. Si la préparation n'est pas sur la note, elle n'est pas non plus dans la recette. C'est toi qui l'ajoutes."],
        ['Rendre le doute visible', "Quand le lecteur ou l'IA n'est pas sûr, tu le vois. La recette est signalée et tu la vérifies avant de l'enregistrer. Mieux vaut une question pour toi qu'une erreur dans l'assiette."],
        ['Le cuisinier décide', "L'IA est un outil pour aller plus vite, pas un substitut au métier. Le dernier mot sur une recette revient toujours au cuisinier qui l'a faite."]
      ],
      outro: "C'est l'une des valeurs fondamentales de Savour : une recette doit être juste."
    },
    'en/blog/digitise-old-recipe-notes': {
      slug: 'fr/blog/numeriser-anciennes-notes-recettes',
      title: 'Numériser ses anciennes notes de recettes et sauver ses cahiers',
      desc: "Les recettes manuscrites s'effacent et se perdent. Comment transformer pas à pas tes cahiers et vieilles notes en livre de recettes numérique, sans tout retaper.",
      h1: 'Numériser ses anciennes notes de recettes : comment sauver ses cahiers',
      lead: "Presque tous les cuisiniers en ont : cahiers d'école, feuilles tachées, photos d'un tableau. Voici comment éviter que ce savoir se perde.",
      sections: [
        ['Commence par ce que tu utilises vraiment', "N'essaie pas de tout faire en un week-end. Commence par les recettes nécessaires ce mois-ci : sauces de base, fonds, préparations de ta carte actuelle. Le reste viendra quand tu le chercheras."],
        ['Fais de bonnes photos', "Photographie à la lumière du jour, bien droit par-dessus, une page par photo. Une tache ou un coin de travers ne gêne pas ; une ombre sur le texte, si. Pose le papier à plat sur un fond sombre."],
        ['Fais lire au lieu de retaper', "Retaper prend facilement dix minutes par recette et ajoute de nouvelles coquilles. Avec une application qui lit l'écriture, comme Savour, tu transformes la photo en recette avec ingrédients et préparation. Important : vérifie toujours les quantités. Une bonne application n'invente rien et montre où elle doute."],
        ['Donne à chaque recette la même forme', "Titre, rendement, ingrédients avec quantité et unité et préparation en étapes. Quand toutes les recettes ont la même structure, toute la brigade peut les lire sans connaître ton écriture."],
        ["Garde l'original", "Ne jette pas le cahier. Si tu veux, ajoute la photo à la recette. L'original en dit parfois plus que la recette : une note en marge, une date, un nom."]
      ],
      outro: 'Savour lit Word, PDF et les photos de recettes manuscrites et en fait un livre de recettes.'
    },
    'en/blog/organising-recipes-in-the-kitchen': {
      slug: 'fr/blog/organiser-recettes-gastronomie',
      title: 'Organiser ses recettes dans une cuisine gastronomique',
      desc: 'Comment ranger des centaines de recettes pour que toute la brigade les trouve vite ? Une structure pratique en dossiers et catégories.',
      h1: 'Organiser ses recettes dans une cuisine gastronomique',
      lead: "Une cuisine à la carte changeante a vite des centaines de recettes. Sans structure fixe, personne ne trouve rien, sauf celui qui l'a noté.",
      sections: [
        ['La base, à part de la carte', "Sépare les recettes de base (fonds, jus, pâtes, sauces mères) des plats de la carte. La base change peu ; la carte, à chaque saison. Un plat renvoie à la base au lieu de la répéter."],
        ['Classe par partie', "Si tu travailles par parties, crée un dossier par partie : garde-manger, sauces, pâtisserie. Pendant le service, chacun n'ouvre que ce dont sa partie a besoin."],
        ['Des catégories pour chercher, des dossiers pour travailler', "Utilise les catégories pour ce qu'est une recette (sauce, garniture, dessert) et les dossiers pour l'endroit où tu l'utilises (menu du midi, menu dégustation, événement). Une recette peut être dans plusieurs dossiers sans exister en double."],
        ['Un responsable par recette', "Convenez de qui peut changer une recette. Tu évites ainsi trois versions de la même sauce. Dans une application avec des droits, comme Savour, le chef gère l'espace et les autres consultent."],
        ['Fais le tri après chaque saison', "Passe les anciens menus dans un dossier d'archives au lieu de les supprimer. Ton livre actuel reste clair et tu ne perds rien."]
      ],
      outro: 'Dans Savour, tu crées tes propres dossiers et catégories, et tu partages des dossiers avec ta brigade avec les droits de ton choix.'
    },
    'en/blog/standardised-recipes': {
      slug: 'fr/blog/fiches-techniques-cuisine',
      title: 'Fiches techniques : pourquoi ta cuisine en a besoin',
      desc: "Ce qu'est une fiche technique, ce qu'elle doit contenir et pourquoi elle fait la différence pour la régularité, la formation et le coût en cuisine professionnelle.",
      h1: 'Fiches techniques : pourquoi ta cuisine en a besoin',
      lead: "Une fiche technique n'est pas réservée à la restauration collective. C'est justement dans une cuisine exigeante qu'elle fait que chaque plat a le bon goût, quel que soit celui qui est à la partie.",
      sections: [
        ["Qu'est-ce qu'une fiche technique", "Une fiche technique est la version arrêtée d'une recette avec laquelle tout le monde travaille. Ce n'est pas un pense-bête, mais l'accord de la cuisine : voilà comment on fait ici."],
        ['Ce qu\'elle doit contenir', "Au minimum un titre clair, le rendement (par exemple 2 litres ou 40 portions), tous les ingrédients avec quantité et unité et la préparation en étapes. Il est utile d'ajouter les points critiques comme les températures et les temps, et une photo du résultat."],
        ["De la régularité dans l'assiette", "Si tout le monde travaille avec la même fiche, la sauce du mardi a le même goût que celle du samedi. Les écarts se remarquent, car il y a une base fixe de comparaison."],
        ['Former plus vite', "Les nouveaux cuisiniers apprennent la façon de travailler de ta cuisine avec les fiches, pas à coups de questions pendant le service. Cela fait gagner du temps et des nerfs au reste de la brigade."],
        ['Adapter et calculer le coût', "Avec un rendement fixe, tu adaptes les quantités de façon fiable. Et quand les quantités sont justes, la fiche sert aussi de base au coût par portion."],
        ['Comment commencer', "Commence par les recettes de base faites chaque jour : fonds, sauces, pâtes. Crée-les dans un format fixe, à un endroit accessible à tous, et convenez de qui peut les changer."]
      ],
      outro: "Dans Savour, chaque recette a la même forme : titre, rendement, ingrédients et préparation. Partage tes fiches avec l'équipe dans une équipe de cuisine."
    },
    'en/blog/recipe-book-with-your-logo': {
      slug: 'fr/blog/livre-recettes-avec-logo',
      title: 'Imprime un livre de recettes au logo de ton restaurant',
      desc: "Imprime recettes et dossiers entiers avec le logo et le nom de ton restaurant, en A4 ou A5, avec la date d'impression. Pour le classeur de la cuisine ou la formation.",
      h1: 'Un livre de recettes au logo de ton restaurant',
      lead: "Même avec toutes les recettes sur le téléphone, le papier reste important dans beaucoup de cuisines. Autant qu'on voie qu'il vient de ton restaurant.",
      sections: [
        ['Ton logo et ton nom sur chaque page', "Avec Savour Pro, tu définis une fois le logo et le nom de ton restaurant. Ils figurent ensuite en haut de chaque page imprimée : le logo à gauche, le nom au centre. Pour les imprimantes de cuisine, tu peux imprimer le logo en noir et blanc."],
        ['Pour toute l\'équipe', "Avec un abonnement d'équipe, le logo du propriétaire vaut pour toute l'équipe. Tout le monde imprime ainsi dans le même style. Dans une équipe de cuisine, c'est le logo du restaurant qui la gère."],
        ['Tout un dossier comme un livre', "En imprimant un dossier, tu peux ajouter une couverture avec le logo, le nom du dossier et un sommaire. Choisis A4 pour le classeur de la cuisine ou A5 pour un petit classeur au passe."],
        ['On voit toujours si c\'est à jour', "En bas de chaque page figure la date d'impression. Toute la cuisine voit ainsi si un classeur est la dernière version. Les en-têtes et pieds de page du navigateur disparaissent pour une page nette."],
        ['Choisis ce que tu imprimes', "Dans une équipe de cuisine, tu choisis avant d'imprimer les recettes voulues, groupées par dossier. Seulement ce qu'il faut pour cette partie ou cet événement."]
      ],
      outro: "Imprimer avec ton logo fait partie de Savour Pro. Cela se règle dans Paramètres → Logo sur les impressions."
    },
    'en/blog/recipes-without-wifi': {
      slug: 'fr/blog/recettes-sans-wifi',
      title: 'Des recettes sans wifi : travailler hors ligne en cuisine',
      desc: "En chambre froide, à la cave ou sur un événement, le wifi lâche souvent. Voici comment ouvrir quand même tes recettes, même sans internet.",
      h1: 'Des recettes sans wifi : travailler hors ligne en cuisine',
      lead: "Les cuisines sont mauvaises pour le wifi : inox, chambres froides, sous-sols. Et c'est juste quand il te faut une recette que rien ne charge.",
      sections: [
        ['Installe Savour comme application', "Pas besoin de boutique d'applications. Ouvre savour.page et ajoute-le à ton écran d'accueil : sur iPhone avec Partager → Sur l'écran d'accueil, sur Android avec le menu → Installer l'application et sur ordinateur avec l'icône de la barre d'adresse."],
        ['Ouvre-le une fois avec une connexion', "Connecte-toi une fois avec internet, « Rester connecté » coché, et ouvre tes recettes. Savour conserve alors ta bibliothèque sur l'appareil."],
        ['Hors ligne', "Si le wifi lâche, ouvre Savour depuis l'icône de ton écran d'accueil. Tu vois tes dernières recettes enregistrées, avec un message indiquant que tu es hors ligne. Consulter et cuisiner continue de fonctionner."],
        ['Ce qui ne marche pas hors ligne', "Modifier et importer nécessitent une connexion, pour que toute l'équipe ait la même version. Dès que la connexion revient, Savour se recharge tout seul."],
        ['Ordinateurs partagés en cuisine', "Sur un ordinateur utilisé par plusieurs personnes, laisse « Rester connecté » décoché. Savour ne garde alors rien sur l'appareil et la session se ferme avec la fenêtre."]
      ],
      outro: 'Le travail hors ligne est inclus dans tous les comptes Savour, gratuits et Pro.'
    },
    'en/blog/choosing-a-recipe-app': {
      slug: 'fr/blog/choisir-application-recettes-restaurant',
      title: 'Comment choisir une application de recettes pour ton restaurant',
      desc: "Sept questions à poser à une application de recettes pour ton restaurant : importation, précision, téléphone, équipe, impression, hors ligne et ce que deviennent tes recettes.",
      h1: 'Comment choisir une application de recettes pour ton restaurant',
      lead: "Beaucoup d'applications de recettes sont faites pour les amateurs. En cuisine professionnelle, les exigences sont autres. Ces sept questions t'aident à choisir.",
      sections: [
        ['1. Peux-tu y mettre tes recettes actuelles ?', "Une application où il faut tout retaper finit inutilisée. Vérifie si tu peux importer en une fois Word, PDF et photos de recettes manuscrites."],
        ['2. Ta recette reste-t-elle exactement comme elle était ?', "Demande ce que fait l'application quand elle a un doute. Une bonne application n'invente ni quantités ni étapes, mais te montre ce que tu dois vérifier."],
        ['3. Fonctionne-t-elle sur le téléphone, en cuisine ?', "Grands caractères, recherche rapide, utilisable les mains mouillées. Teste-la en pleine mise en place, pas au bureau."],
        ['4. Peux-tu partager avec des droits ?', "L'équipe doit pouvoir consulter, mais tout le monde ne doit pas pouvoir tout changer. Cherche des rôles comme propriétaire, éditeur et lecteur."],
        ['5. Peux-tu bien imprimer ?', "Un dossier entier en une fois, avec une mise en page calme et, mieux encore, au logo de ton restaurant."],
        ['6. Que se passe-t-il sans internet ?', "Les chambres froides et les sous-sols ont rarement un bon wifi. Vérifie si tu peux ouvrir tes recettes hors ligne."],
        ['7. Que deviennent tes recettes si tu arrêtes ?', "Tes recettes sont ton savoir. Vérifie si tu les gardes quand tu arrêtes de payer. Dans Savour, tout reste tel quel."]
      ],
      outro: "Tu peux essayer Savour gratuitement jusqu'à 100 recettes, avec 7 jours de Savour Pro. Sans données de paiement."
    }
  }
};
