// Manuel (Frans), section « Premiers pas ». Liens : [texte](#id) ou [texte](/chemin-nl) ; le chemin se traduit seul.

export const groups = {
  'aan-de-slag': {
    name: 'Premiers pas',
    intro: 'Créer un compte, se connecter, installer Savour comme application sur ton téléphone et t’y retrouver dans les écrans.'
  }
};

export const pages = {
  'aan-de-slag': {
    slug: 'fr/manuel-premiers-pas',
    menu: 'Premiers pas avec Savour',
    title: 'Premiers pas avec Savour, l’application de recettes pour cuisiniers | Manuel',
    desc: 'Commencer avec Savour : ce que fait l’application de recettes pour la cuisine professionnelle, créer un compte, importer tes premières recettes et installer Savour sur ton téléphone.',
    lead: 'Ce qu’est Savour, à qui il s’adresse et les premières étapes vers ton propre livre de recettes numérique.',
    sections: [
      ['Qu’est-ce que Savour', 'Savour est une application de recettes pour la cuisine professionnelle. Tu rassembles toutes tes fiches au même endroit : depuis Word, PDF, des photos de notes manuscrites, des sites web et d’autres applications de recettes. Ensuite tu les classes en dossiers et catégories, tu les adaptes à n’importe quel rendement, tu les imprimes pour le classeur du passe et tu les partages avec ta brigade dans une équipe de cuisine.'],
      ['Pour qui', 'Pour les chefs, seconds, pâtissiers, traiteurs et écoles de cuisine : tous ceux qui doivent conserver, partager et retrouver vite leurs recettes. Les cuisiniers amateurs peuvent aussi utiliser Savour, mais l’application est faite pour le travail en cuisine : grandes quantités, fiches fixes et une équipe qui travaille avec la même version. Plus d’infos sur [Pour les cuisiniers](/voor-koks) et [Pour les brigades](/voor-keukenbrigades).'],
      [
        'Démarrer en quatre étapes',
        'Voici comment avoir tes premières recettes dans Savour en un quart d’heure :',
        [
          '[Crée un compte](#account-maken) ou découvre d’abord la [démo](#demo) sans compte.',
          '[Importe tes recettes](#importeren) : un fichier Word ou PDF avec toutes tes recettes suffit pour commencer.',
          '[Vérifie ce qui a été lu](#import-controleren) et enregistre.',
          '[Installe Savour comme application sur ton téléphone](#app-installeren) pour avoir tes recettes toujours sous la main en cuisine.'
        ]
      ],
      ['Gratuit ou Savour Pro', 'Un compte gratuit conserve jusqu’à 100 recettes et importe Word, PDF et texte. Avec [Savour Pro](#gratis-en-pro), tu conserves des recettes en illimité, l’IA lit les photos de notes manuscrites, tu crées des équipes de cuisine et tu imprimes avec le logo de ton restaurant. Les nouveaux comptes reçoivent 7 jours de Pro gratuits.'],
      ['Sur tous les appareils', 'Savour fonctionne dans le navigateur sur ordinateur, tablette et téléphone. Importer, classer et imprimer se fait le mieux sur ordinateur ; consulter en cuisine, sur téléphone ou tablette. Tes recettes sont dans le cloud : sur un nouvel appareil, tu te connectes et tout est là.']
    ]
  },
  'account-maken': {
    slug: 'fr/manuel-creer-un-compte',
    menu: 'Créer un compte',
    title: 'Créer un compte Savour et confirmer ton adresse e-mail | Manuel',
    desc: 'Comment créer un compte Savour gratuit : nom, adresse e-mail et mot de passe, l’e-mail de confirmation, la semaine d’essai de Savour Pro et quoi faire en premier.',
    lead: 'Gratuit, sans données de paiement et prêt en une minute.',
    sections: [
      ['Créer le compte', 'Choisis « Commencer gratuitement » sur [savour.page](/). Saisis ton prénom, ton nom, ton adresse e-mail et un mot de passe, puis choisis « Créer un compte ». Aucune donnée de paiement n’est nécessaire.'],
      ['Confirmer ton adresse e-mail', 'Tu reçois un e-mail avec un lien de confirmation. Clique sur le lien puis, dans Savour, sur « Continuer ». Pas d’e-mail ? Regarde dans tes spams. Si tu essaies de te connecter sans avoir confirmé, Savour propose d’envoyer un nouvel e-mail. Un lien reçu par e-mail fonctionne une fois et pendant une heure ; si tu en demandes plusieurs, seul le plus récent est valable.'],
      ['Sept jours de Savour Pro', 'Chaque nouveau compte reçoit 7 jours de [Savour Pro](#gratis-en-pro) gratuits. Tu peux faire lire des photos de notes, [créer une équipe de cuisine](#keukenteam-maken) et [imprimer avec ton logo](#printen-logo). Pendant l’essai aussi, tu conserves jusqu’à 100 recettes. Ensuite, tu gardes tout ce que tu as créé.'],
      ['Invité par un collègue', 'Si un collègue t’a envoyé un lien, Savour ouvre directement « Créer un compte ». Tu reçois la même semaine d’essai, et ton collègue reçoit 14 jours de Pro en cadeau dès que tu as confirmé ton adresse et que tu t’es connecté. Avec une invitation à une équipe de cuisine, tu en deviens membre après connexion. Voir [Inviter un collègue](#collega-uitnodigen) et [Inviter ton équipe](#keukenteam-uitnodigen).'],
      ['L’adresse a déjà un compte', 'Si Savour indique que l’adresse e-mail a déjà un compte, aucun nouvel e-mail de confirmation n’est envoyé. [Connecte-toi](#inloggen) ou choisis « Mot de passe oublié ? » si tu ne le connais plus.'],
      ['Ensuite', 'Après la confirmation, tu vois l’écran de bienvenue avec une courte liste de départ. Commence par [importer](#importeren) ou par [saisir une recette toi-même](#recept-maken). Un plan pour les premiers jours se trouve dans [Ta première semaine avec Savour](#eerste-week).']
    ]
  },
  inloggen: {
    slug: 'fr/manuel-connexion-et-mot-de-passe',
    menu: 'Connexion et mot de passe',
    title: 'Se connecter, rester connecté et mot de passe oublié | Manuel Savour',
    desc: 'Se connecter à Savour : rester connecté, mémoriser le mot de passe sur un ordinateur de cuisine partagé, mot de passe oublié et en choisir un nouveau.',
    lead: 'Se connecter sur ton téléphone, sur une tablette partagée au passe ou sur un nouvel ordinateur.',
    sections: [
      ['Se connecter', 'Choisis « Se connecter » en haut à droite de [savour.page](/) et saisis ton adresse e-mail et ton mot de passe. Tes recettes, dossiers et équipes de cuisine sont là tout de suite, sur chaque appareil.'],
      ['Rester connecté', 'Avec « Rester connecté », tu restes connecté même en fermant le navigateur ou l’application. C’est aussi nécessaire pour ouvrir tes recettes [sans internet](#offline). Sur un ordinateur ou une tablette partagés, laisse-le décoché : tu es déconnecté dès que la fenêtre se ferme.'],
      ['Mémoriser le mot de passe', 'Avec « Mémoriser le mot de passe », le gestionnaire de mots de passe du navigateur peut l’enregistrer. Sur un appareil partagé, désactive-le.'],
      ['Mot de passe oublié', 'Choisis « Mot de passe oublié ? » dans la fenêtre de connexion. Tu reçois un e-mail avec un lien. Clique dessus, choisis « Continuer » dans Savour et définis un nouveau mot de passe dans [Mon compte](#account-profiel). Le lien fonctionne une fois et pendant une heure.'],
      ['Se déconnecter', 'Tu te déconnectes dans Mon compte → Compte. Sur ton propre téléphone, inutile ; sur une tablette partagée, oui, ou laisse « Rester connecté » décoché.'],
      ['Ça ne marche pas ?', 'Dans [Problèmes de connexion](#probleem-inloggen), tu trouves les messages les plus fréquents et quoi faire.']
    ]
  },
  demo: {
    slug: 'fr/manuel-demo',
    menu: 'Découvrir la démo',
    title: 'La démo de Savour : explorer avec 40 recettes d’exemple | Manuel',
    desc: 'Essaie Savour sans compte : la démo avec 40 recettes d’exemple, des dossiers et une équipe de cuisine. Comment elle fonctionne et ce qu’elle permet ou non.',
    lead: 'Explorer Savour avec des recettes d’exemple, sans compte et sans rien enregistrer.',
    sections: [
      ['Ouvrir la démo', 'Choisis « Voir la démo » sur la [page d’accueil](/). Tu vois Savour comme un cuisinier connecté, avec 40 recettes d’exemple, des dossiers par partie et une équipe de cuisine.'],
      ['Ce que tu peux essayer', 'Ouvre des recettes, [adapte-les](#omrekenen), lance le [mode cuisine](#kookmodus), cherche un ingrédient et parcours les dossiers. Tu peux aussi essayer l’importation : tu vois ce que le lecteur Savour fait de ton fichier.'],
      ['Ce que la démo ne fait pas', 'Rien n’est enregistré dans la démo. En haut, il est écrit « Compte démo · rien n’est enregistré ». Pour garder tes propres recettes, [crée un compte](#account-maken).'],
      ['Quitter la démo', 'En te déconnectant de la démo, tu reviens à la page d’accueil. Rien de la démo ne reste dans ton navigateur.']
    ]
  },
  'app-installeren': {
    slug: 'fr/manuel-installer-l-application',
    menu: 'Installer Savour comme application',
    title: 'Savour comme application sur iPhone, Android et ordinateur | Manuel',
    desc: 'Comment ajouter Savour à ton écran d’accueil : iPhone et iPad avec Safari, Android avec Chrome, ordinateur avec Chrome, Edge ou Safari. Sans magasin d’applications.',
    lead: 'Ajoute-le une fois à ton écran d’accueil et Savour s’ouvre comme une application normale, même sans internet.',
    sections: [
      ['Sans magasin d’applications', 'Savour est une application web : tu l’ajoutes à ton écran d’accueil depuis le site. Elle s’ouvre ensuite dans sa propre fenêtre avec sa propre icône, et tu as toujours la dernière version. Plus d’infos sur la page [Application](/app-downloaden).'],
      ['iPhone et iPad', 'Ouvre savour.page dans Safari. Touche Partager en bas (le carré avec la flèche vers le haut), choisis « Sur l’écran d’accueil » puis touche « Ajouter ».'],
      ['Android', 'Ouvre savour.page dans Chrome. Touche ⋮ en haut à droite et choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ». Une fois connecté, c’est aussi possible via Général → Installer l’application dans le menu de Savour.'],
      ['Ordinateur', 'Dans Chrome ou Edge, clique sur l’icône d’installation à droite de la barre d’adresse, ou choisis « Installer l’application » sous Général dans Savour. Sur un Mac avec Safari, choisis Fichier → « Ajouter au Dock ».'],
      ['Même sans internet', 'Connecte-toi une fois avec « Rester connecté » et ouvre tes recettes. Ensuite, Savour ouvre ta bibliothèque même si le wifi de la cuisine tombe. Voir [Travailler sans internet](#offline).'],
      ['Tablette partagée au passe', 'Installe Savour sur une tablette utilisée par toute l’équipe. Si plusieurs personnes l’utilisent avec leur propre compte, laisse « Rester connecté » décoché. Si tout le monde travaille dans la même [équipe de cuisine](#keukenteams), tout le monde voit les mêmes recettes.']
    ]
  },
  menu: {
    slug: 'fr/manuel-menu-et-ecrans',
    menu: 'Le menu et les écrans',
    title: 'Le menu de Savour : recettes, dossiers, équipes, général | Manuel',
    desc: 'S’y retrouver dans Savour : le menu avec Toutes les recettes, Favoris, Catégories, Ajouter une recette, dossiers, équipes de cuisine et Général, et les boutons en haut.',
    lead: 'Ce qu’il y a dans le menu et où trouver quoi, sur ordinateur et sur téléphone.',
    sections: [
      [
        'Recettes',
        'En haut du menu se trouvent tes propres recettes :',
        [
          '[Toutes les recettes](#zoeken) : toute ta bibliothèque, numérotée et par ordre alphabétique.',
          '[Favoris](#favorieten) : les recettes avec une étoile.',
          '[Catégories](#categorieen) : les recettes par type, comme sauces ou pâtisserie.',
          '[Ajouter une recette](#importeren) : importer ou saisir toi-même.'
        ]
      ],
      ['Dossiers de recettes', 'En dessous se trouvent tes propres [dossiers](#mappen), par exemple par partie ou par menu, avec « Ajouter un dossier de recettes » pour en créer un. Tu choisis quels dossiers apparaissent dans le menu et dans quel ordre.'],
      ['Équipes de cuisine', 'Ici se trouvent les [équipes de cuisine](#keukenteams) dont tu es membre, avec « Créer une équipe de cuisine » pour en lancer une (Savour Pro).'],
      ['Général', 'En bas se trouvent [Savour Pro](#gratis-en-pro), [Inviter un collègue](#collega-uitnodigen), [Installer l’application](#app-installeren) et Paramètres, où tu trouves [ton compte](#account-profiel), [Savour Pro](#abonnement-beheren), [Logo sur les impressions](#printen-logo), [Apparence](#weergave-en-taal), [Catégories](#categorieen) et [Nettoyer](#opschonen).'],
      ['En haut', 'Dans la barre du haut, tu cherches dans tes recettes, tu passes d’un bouton entre le [thème sombre et le thème clair](#weergave-en-taal) et tu choisis la langue : néerlandais, anglais, allemand, espagnol ou français.'],
      ['Explication par écran', 'À côté du titre de nombreux écrans se trouve un bouton i. Derrière, une courte explication de ce que tu peux faire sur cet écran.'],
      ['Sur ton téléphone', 'Sur téléphone, une barre en bas contient Recettes, Dossiers de recettes, Équipes de cuisine et Ajouter une recette. En haut, tu cherches, tu ouvres tes favoris et tu vas dans Mon compte. Les recettes s’ouvrent en grand et lisibles ; en [mode cuisine](#kookmodus), tu ne vois que la recette.']
    ]
  },
  'eerste-week': {
    slug: 'fr/manuel-premiere-semaine',
    menu: 'Ta première semaine avec Savour',
    title: 'Ta première semaine avec Savour : un plan pour ta cuisine | Manuel',
    desc: 'Un plan pour la première semaine : importer les recettes, nettoyer, classer en catégories et dossiers, inviter ton équipe et utiliser Savour en cuisine.',
    lead: 'Un plan pratique pour passer en une semaine de fichiers épars à un seul livre de recettes.',
    sections: [
      ['Jour 1 : tout importer', 'Rassemble tes fichiers Word, tes PDF et tes anciens exports et [importe-les en une fois](#import-hele-map). Si tu as des notes manuscrites, prends-les en [photo](#import-fotos) pendant la semaine d’essai de Savour Pro.'],
      ['Jour 2 : vérifier', 'Passe en revue les recettes que Savour a marquées à vérifier. Compare les cas douteux avec l’original et vérifie surtout les chiffres. Voir [Vérifier une importation](#import-controleren).'],
      ['Jour 3 : nettoyer', 'Retire les numéros devant les noms et les recettes en double avec [Nettoyer](#opschonen). Ajoute ensuite la [liste de catégories par défaut](#categorieen) et laisse Savour [proposer des catégories](#categorie-trefwoorden).'],
      ['Jour 4 : classer', 'Crée des [dossiers](#mappen) selon le fonctionnement de ta cuisine : par partie, par menu ou par saison. Mets une [étoile](#favorieten) à tes recettes les plus utilisées.'],
      ['Jour 5 : l’équipe', '[Crée une équipe de cuisine](#keukenteam-maken), ajoute les recettes de base et [invite ton équipe](#keukenteam-uitnodigen). Donne à ton second le rôle d’éditeur.'],
      ['Jours 6 et 7 : en cuisine', 'Installe Savour [comme application](#app-installeren) sur les téléphones et sur la tablette du passe, utilise le [mode cuisine](#kookmodus) pendant la mise en place et [imprime](#printen-map) le classeur du passe.']
    ]
  }
};
