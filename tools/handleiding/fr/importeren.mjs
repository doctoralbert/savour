// Manuel (Frans), section « Importer des recettes », avec une page par application de recettes (apps).

export const groups = {
  importeren: {
    name: 'Importer des recettes',
    intro: 'Faire entrer tes recettes dans Savour : depuis Word, PDF, des photos, du texte, des sites web, des applications de notes et plus de quinze autres applications de recettes.'
  }
};

export const pages = {
  importeren: {
    slug: 'fr/manuel-importer',
    menu: 'Vue d’ensemble : importer des recettes',
    h1: 'Importer des recettes',
    title: 'Importer des recettes depuis Word, PDF, photos et autres applications | Manuel',
    desc: 'Toutes les façons de mettre tes recettes dans Savour : Word, PDF, photos de notes, texte, un site web, applications de notes, CSV et exports de Paprika, Mela, Mealie et d’autres.',
    lead: 'Tout ton classeur de recettes dans Savour en une fois, quelle que soit la source. Ici, tu vois comment ça marche pour chaque source.',
    sections: [
      ['Par où commencer', 'Choisis dans le menu « Ajouter une recette », puis « Importer une recette ». Tu vois les sources possibles. Chaque source ouvre un sélecteur qui n’affiche que les fichiers adaptés. Tu peux aussi faire glisser des fichiers sur l’écran.'],
      [
        'Fichiers et documents',
        'Le lecteur Savour lit ces sources gratuitement et sans IA :',
        [
          '[Word](#import-word) : .doc et .docx, même avec des centaines de recettes dans un document.',
          '[PDF](#import-pdf) : PDF numériques. Un PDF scanné est lu par l’IA (Savour Pro).',
          '[Saisir ou coller du texte](#import-tekst) : depuis un e-mail, WhatsApp ou une note.',
          '[Autres fichiers texte](#import-tekstbestanden) : .txt, .md, .rtf, .odt, .html et Pages.',
          '[Tableurs et CSV](#import-csv) : Excel ou Google Sheets, enregistré en .csv.',
          '[JSON et schema.org](#import-json) : recettes structurées et fichiers Savour.',
          '[Un dossier entier ou un ZIP](#import-hele-map) : tout mélangé, en une fois.'
        ]
      ],
      ['Photos et sites web', 'Les photos de recettes manuscrites ou scannées et l’appareil photo sont lus par l’IA de Savour Pro : voir [Photos et notes](#import-fotos). Une recette d’un site web se récupère avec son lien : voir [Recette d’un site web](#import-website).'],
      ['Passer depuis une autre application', 'Savour lit les exports de [Paprika](#import-paprika), [Mela](#import-mela), [Mealie](#import-mealie), [Tandoor](#import-tandoor), [Recipe Keeper](#import-recipe-keeper), [Copy Me That](#import-copy-me-that), [Crouton](#import-crouton), [MasterCook](#import-mastercook), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook), [Evernote](#import-evernote), [Google Keep](#import-google-keep), [Flavorish](#import-flavorish), [CookBookManager](#import-cookbookmanager) et [Plan to Eat](#import-plan-to-eat). Pour les notes d’Apple Notes, OneNote, Notion et d’autres : voir [Applications de notes](#import-notitie-apps). La vue d’ensemble se trouve dans [Passer à Savour](#overstappen).'],
      ['Toujours vérifier d’abord', 'Rien n’est enregistré avant que tu l’aies vu. Dans l’[écran de vérification](#import-controleren), tu vois pour chaque recette ce qui a été lu et où Savour a des doutes. Savour n’invente jamais de quantités, d’ingrédients ni d’étapes.'],
      ['Gratuit et Savour Pro', 'Avec un compte gratuit, tu importes Word, PDF, texte et exports d’autres applications jusqu’à 100 recettes. S’il te reste moins de place que tu n’importes, Savour enregistre les premières qui tiennent et les autres restent dans l’écran de vérification. Avec [Savour Pro](#gratis-en-pro), tu conserves en illimité et l’IA lit photos, PDF scannés et recettes douteuses, jusqu’à 500 importations par mois. Voir [Le lecteur Savour et l’IA](#import-ai).'],
      ['Pas le temps de le faire toi-même', 'Avec le [service d’importation](#import-service), les cuisiniers derrière Savour transfèrent tout ton classeur de recettes.']
    ]
  },
  'import-controleren': {
    slug: 'fr/manuel-verifier-une-importation',
    menu: 'Vérifier et enregistrer une importation',
    title: 'Vérifier les recettes importées avant de les enregistrer | Manuel Savour',
    desc: 'L’écran de vérification de Savour : titre, ingrédients, préparation, rendement et catégorie par recette, avertissements en cas de doute, doublons et tout enregistrer en une fois.',
    lead: 'Avant tout enregistrement, tu vois exactement ce que Savour a lu.',
    sections: [
      ['L’écran de vérification', 'Après le traitement s’ouvre « Importer plusieurs recettes ». En haut, tu vois combien de recettes ont été trouvées et dans combien de fichiers, et si tout a été lu clairement. En dessous, chaque recette est une carte avec les champs Titre, Ingrédients, Préparation, Rendement et Catégorie. Tu modifies tout directement dans la carte.'],
      [
        'Avertissements en cas de doute',
        'Savour montre où il n’est pas sûr :',
        [
          'Corrigé automatiquement : de petites fautes de frappe corrigées par le lecteur, pour que tu les vérifies.',
          'Pas bien lisible : un passage à comparer avec l’original. Il est surligné en jaune.',
          '« Peut-être incomplet » : il semble manquer quelque chose. Les recettes incomplètes dans la source sont ignorées ; avec « Importer quand même », tu les ajoutes, marquées à vérifier plus tard.'
        ]
      ],
      ['Retirer une recette ou tourner une photo', 'Si une carte n’a rien à faire là, comme un sommaire ou une note qui n’est pas une recette, retire-la avec la croix. Pour une recette issue d’une photo, « Pivoter la photo » la tourne d’un quart de tour.'],
      ['Enregistrer', 'Choisis « Enregistrer toutes les recettes ». Si une recette existe déjà exactement ainsi dans ta bibliothèque ou figure deux fois dans l’importation, Savour ne l’enregistre qu’une fois et indique combien de doublons ont été ignorés. « Retour à l’importation » revient sans enregistrer.'],
      ['Avec un compte gratuit', 'S’il te reste de la place pour moins de recettes que tu n’en importes, Savour demande s’il enregistre celles qui tiennent. Les autres restent dans l’écran de vérification ; avec [Savour Pro](#gratis-en-pro), tu conserves en illimité.'],
      ['Ensuite', 'Les numéros devant les noms issus d’un ancien livre de recettes (« 12. Jus de veau ») se retirent en une fois avec [Nettoyer](#opschonen). Ensuite, [classe tes recettes](#ordenen) en catégories et dossiers.'],
      ['Points d’attention', 'Vérifie surtout les chiffres, les unités et le rendement. Un 3 et un 8 ou un 1 et un 7 se confondent vite sur une note tachée. Pour une recette issue d’une photo, ouvre plus tard l’original avec « Voir la note d’origine ».']
    ]
  },
  'import-word': {
    slug: 'fr/manuel-importer-depuis-word',
    menu: 'Fichiers Word (.doc, .docx)',
    h1: 'Importer des recettes depuis Word',
    title: 'Importer des recettes depuis Word (.doc et .docx) | Manuel Savour',
    desc: 'Comment faire passer tes recettes de Word à Savour : un document avec des centaines de recettes est découpé automatiquement en titre, rendement, ingrédients et préparation.',
    lead: 'Un document Word avec tout ton livre de recettes ou cent fichiers séparés : Savour les découpe lui-même.',
    sections: [
      ['Comment importer', 'Choisis « Ajouter une recette » → « Importer une recette » → fichier Word. Choisis un ou plusieurs fichiers .doc ou .docx, puis « Traiter ». Ensuite, [vérifie les recettes](#import-controleren).'],
      ['Ce que reconnaît le lecteur Savour', 'Le lecteur Savour découpe lui-même un document en recettes séparées, même s’il en contient des centaines. Pour chaque recette, il reconnaît le titre, le rendement, les ingrédients et la préparation. C’est gratuit et sans IA.'],
      ['Comment Savour repère une nouvelle recette', 'Une nouvelle recette commence à un titre Word (Titre 1), à une ligne en gras qui ressemble à un nom de recette, ou à un nom suivi d’un nouvel intertitre « Ingrédients ». Les intertitres comme « Ingrédients » et « Préparation » aident le plus le lecteur. Une ligne qui se termine par deux-points, comme « Pâte : », devient une [partie de la recette](#recept-delen).'],
      ['Anciens fichiers .doc', 'Les anciens fichiers .doc de Word 97–2003 sont aussi lus. Si un fichier ne passe pas, enregistre-le en .docx dans Word et réessaie.'],
      ['Tableaux', 'Si tes ingrédients sont dans un tableau, chaque ligne devient une ligne avec les cellules à la suite. Pour les tableaux, vérifie l’ordre quantité et produit.'],
      ['Conseils pour le meilleur résultat', 'Donne à chaque recette un titre clair en intertitre, mets chaque ingrédient sur sa ligne avec la quantité devant et « Préparation » au-dessus des étapes. Plus de conseils : [Une recette que tout le monde fait pareil](#tips-recept-schrijven).'],
      ['Pages et Google Docs', 'Savour ne lit pas les fichiers Pages : exporte-les dans Pages en Word (.docx) ou PDF. Dans Google Docs, choisis Fichier → Télécharger → Microsoft Word (.docx).']
    ]
  },
  'import-pdf': {
    slug: 'fr/manuel-importer-depuis-pdf',
    menu: 'Fichiers PDF',
    h1: 'Importer des recettes depuis un PDF',
    title: 'Importer des recettes depuis un PDF, même scanné | Manuel Savour',
    desc: 'Comment importer des recettes depuis un PDF dans Savour : le lecteur Savour lit gratuitement les PDF numériques, l’IA de Savour Pro lit les PDF scannés.',
    lead: 'Un livre de recettes numérique, un export d’un autre logiciel ou le scan d’une note.',
    sections: [
      ['Comment importer', 'Choisis « Ajouter une recette » → « Importer une recette » → fichier PDF, choisis un ou plusieurs PDF, puis « Traiter ». Ensuite, [vérifie les recettes](#import-controleren).'],
      ['PDF numérique', 'Un PDF créé depuis Word, un autre logiciel ou un site web contient du texte. Le lecteur Savour le lit gratuitement, comme un [fichier Word](#import-word) : il le découpe en recettes et reconnaît titre, rendement, ingrédients et préparation. Un grand espace blanc sur une page compte comme séparation.'],
      ['PDF scanné', 'Un scan est une photo dans un PDF, sans texte. Il est lu par l’IA de [Savour Pro](#gratis-en-pro), comme [une photo](#import-fotos). Sans Pro, Savour indique que le fichier ne contient pas de texte lisible.'],
      ['Deux colonnes et mise en page', 'Dans un PDF à deux colonnes ou avec beaucoup de mise en page, l’ordre des lignes peut changer. Vérifie ces recettes avec plus de soin. Si tu as encore le fichier Word d’origine, importe plutôt celui-ci.']
    ]
  },
  'import-fotos': {
    slug: 'fr/manuel-importer-photos-et-notes',
    menu: 'Photos, notes et appareil photo',
    h1: 'Importer des photos et des notes manuscrites',
    title: 'Lire des recettes manuscrites et des notes depuis une photo | Manuel Savour',
    desc: 'Comment faire entrer des recettes manuscrites, des notes et des pages de livres dans Savour : envoie des photos ou utilise l’appareil photo, l’IA les lit et la note d’origine est conservée.',
    lead: 'La note du passe, le cahier de l’école ou une page de livre : une photo et c’est dedans.',
    sections: [
      ['Envoyer des photos', 'Choisis « Ajouter une recette » → « Importer une recette » → « Photos » et choisis une ou plusieurs photos (.jpg, .png ou .webp). Chaque photo est lue comme une recette. Cela fonctionne avec [Savour Pro](#gratis-en-pro), jusqu’à 500 importations par mois.'],
      ['Utiliser l’appareil photo', 'Choisis « Prendre une photo avec l’appareil ». Sur téléphone, l’appareil photo s’ouvre ; sur ordinateur, la webcam. Pose la note à plat, sous une bonne lumière, et photographie bien droit d’en haut avec toute la page visible.'],
      ['Ce que fait l’IA', 'Savour redresse d’abord la photo puis lit une copie plus contrastée. L’IA lit ce qui est écrit et n’invente rien : ce qui n’est pas sur la note n’est pas dans la recette. Si l’IA doute, tu le vois dans l’[écran de vérification](#import-controleren).'],
      ['L’original est conservé', 'Pour une recette lue depuis une photo, la note est conservée. Ouvre la recette et choisis « Voir la note d’origine » pour la comparer.'],
      ['Plusieurs photos dans un ZIP', 'Si toutes tes photos sont dans un ZIP, choisis-le dans « Depuis une autre application de recettes » ou « Tous les fichiers mélangés ». S’il ne contient que des photos, Savour lit chaque photo comme une recette. Voir [Un dossier entier ou un ZIP](#import-hele-map).'],
      ['Conseils pour une bonne photo', 'Une recette par photo, pas d’ombre du téléphone, pas de flash sur du papier brillant. Ensuite, vérifie surtout les chiffres. Plus de conseils : [De la note à la fiche](#tips-kladjes).'],
      ['Photos d’iPhone (HEIC)', 'Savour lit .jpg, .png et .webp. Si ton iPhone enregistre les photos en HEIC, choisis « Le plus compatible » dans Réglages → Appareil photo → Formats, ou utilise l’appareil photo de Savour.']
    ]
  },
  'import-tekst': {
    slug: 'fr/manuel-coller-du-texte',
    menu: 'Saisir ou coller du texte',
    h1: 'Importer des recettes depuis du texte',
    title: 'Coller une recette depuis un e-mail, WhatsApp ou une note | Manuel Savour',
    desc: 'Comment coller des recettes dans Savour : du texte d’un e-mail, de WhatsApp, d’un site ou d’une application de notes, même plusieurs recettes à la fois. Le lecteur Savour les découpe.',
    lead: 'Une recette envoyée par un collègue ou toute une liste de tes notes : coller et c’est fait.',
    sections: [
      ['Comment ça marche', 'Choisis « Ajouter une recette » → « Importer une recette » → « Saisir du texte ». Tape ou colle le texte dans le champ et choisis « Traiter ». Tu peux coller plusieurs recettes à la fois.'],
      ['Ce que Savour reconnaît', 'Le lecteur Savour découpe le texte en recettes et reconnaît titre, rendement, ingrédients et préparation, comme pour un [fichier Word](#import-word). Si tu colles depuis Word ou un e-mail, Savour retient les lignes en gras : ce sont souvent un nom de recette ou une partie comme « Pâte ».'],
      ['Bien coller', 'Mets le titre en haut, puis les ingrédients sur des lignes séparées avec la quantité devant, puis la préparation. Une ligne vide entre deux recettes aide le lecteur.'],
      ['Plutôt remplir toi-même', 'Pour remplir une recette champ par champ, utilise [Saisir manuellement](#recept-maken).']
    ]
  },
  'import-tekstbestanden': {
    slug: 'fr/manuel-importer-fichiers-texte',
    menu: 'Texte, Markdown, RTF, ODT et HTML',
    h1: 'Importer des fichiers texte',
    title: 'Importer des recettes depuis .txt, .md, .rtf, .odt et .html | Manuel Savour',
    desc: 'Comment importer des recettes depuis des fichiers texte dans Savour : texte brut, Markdown, RTF, OpenOffice et LibreOffice (.odt), pages web (.html) et Pages.',
    lead: 'Des fichiers du Bloc-notes, de TextEdit, LibreOffice, Obsidian ou une page web enregistrée.',
    sections: [
      ['Comment importer', 'Choisis « Ajouter une recette » → « Importer une recette » → « Autres fichiers » et choisis tes fichiers. Choisis « Traiter » et [vérifie les recettes](#import-controleren).'],
      [
        'Quels fichiers',
        'Le lecteur Savour lit gratuitement ces fichiers :',
        [
          '.txt : texte brut du Bloc-notes, de TextEdit ou d’une application de notes.',
          '.md : Markdown d’Obsidian, Notion, Bear, Joplin et d’autres. Un titre avec # devient un nom de recette.',
          '.rtf : texte enrichi de WordPad ou TextEdit.',
          '.odt : OpenOffice et LibreOffice Writer.',
          '.html : une page web enregistrée. Si la recette y est structurée (schema.org), Savour la reprend ; sinon le lecteur lit le texte.'
        ]
      ],
      ['Pages', 'Savour ne lit pas les fichiers Pages. Dans Pages, choisis Fichier → Exporter vers → Word ou PDF, et importe ce fichier.'],
      ['Beaucoup de fichiers à la fois', 'Avec des centaines de notes séparées, utilise [Choisir un dossier entier](#import-hele-map) ou mets-les dans un ZIP.']
    ]
  },
  'import-hele-map': {
    slug: 'fr/manuel-importer-dossier-ou-zip',
    menu: 'Un dossier entier ou un ZIP',
    h1: 'Importer un dossier entier ou un ZIP',
    title: 'Importer en une fois un dossier ou un ZIP de recettes | Manuel Savour',
    desc: 'Comment importer tous tes fichiers de recettes à la fois dans Savour : un dossier entier avec Word, PDF, photos et texte mélangés, ou un ZIP avec des documents ou des photos.',
    lead: 'Tout ton classeur de recettes de l’ordinateur dans Savour en une fois, même si tout est mélangé.',
    sections: [
      ['Tous les fichiers mélangés', 'Choisis « Ajouter une recette » → « Importer une recette » → « Tous les fichiers mélangés ». Tu choisis alors Word, PDF, photos, fichiers texte et exports d’autres applications en une fois.'],
      ['Choisir un dossier entier', 'Choisis « Choisir un dossier entier » et désigne un dossier. Savour prend tous les fichiers qu’il sait lire, y compris dans les sous-dossiers. Les fichiers illisibles sont ignorés.'],
      [
        'Un fichier ZIP',
        'Inutile de décompresser un ZIP. Savour examine chaque fichier qu’il contient :',
        [
          'Word, PDF, Markdown, RTF et ODT sont lus comme si tu les avais choisis séparément.',
          'Les exports d’autres applications dans le ZIP sont reconnus, même un ZIP dans un ZIP.',
          'S’il ne contient que des photos, chaque photo est lue comme une recette (Savour Pro).',
          'S’il contient des recettes et des photos, les photos sont celles de ces recettes.'
        ]
      ],
      ['Progression', 'Avec beaucoup de fichiers, tu vois la progression fichier par fichier. Si un fichier pose problème, Savour indique lequel et pourquoi, puis continue avec le reste.'],
      ['Ensuite', 'Toutes les recettes arrivent ensemble dans un [écran de vérification](#import-controleren). Chaque recette indique de quel fichier elle vient.']
    ]
  },
  'import-website': {
    slug: 'fr/manuel-importer-une-recette-d-un-site',
    menu: 'Recette d’un site web',
    h1: 'Importer une recette d’un site web',
    title: 'Importer une recette d’un site web avec son lien | Manuel Savour',
    desc: 'Comment récupérer une recette d’un site web dans Savour : colle le lien et Savour lit la recette dans la page. Fonctionne avec la plupart des sites de recettes.',
    lead: 'Colle le lien d’une page de recette et Savour en extrait la recette, sans publicité ni histoire.',
    sections: [
      ['Comment ça marche', 'Choisis « Ajouter une recette » → « Importer une recette » → « Page web (lien) ». Colle le lien de la page et choisis « Traiter ». Tu dois être connecté.'],
      ['Ce que Savour lit', 'La plupart des sites publient leurs recettes dans un format structuré (schema.org) dans la page. Savour le lit directement : titre, ingrédients, préparation et rendement. Si la recette n’est pas dans ce format, le lecteur Savour lit le texte de la page et, avec Pro, l’IA si nécessaire.'],
      ['Aucune recette trouvée', 'Si Savour ne trouve pas de recette sur la page, il le dit et n’invente rien. Copie alors le texte et utilise [Saisir du texte](#import-tekst).'],
      ['Pages derrière une connexion', 'Savour ne peut pas ouvrir les pages qui demandent une connexion ou un paiement. Copie le texte ou enregistre la page en .html et importe-la dans [Autres fichiers](#import-tekstbestanden).'],
      ['Citer la source', 'Si tu utilises la recette de quelqu’un d’autre, indique la source dans une [note](#recept-notities) de la recette.']
    ]
  },
  'import-csv': {
    slug: 'fr/manuel-importer-csv-et-excel',
    menu: 'Excel, Google Sheets et CSV',
    h1: 'Importer des recettes depuis Excel et CSV',
    title: 'Importer des recettes depuis Excel, Google Sheets ou CSV | Manuel Savour',
    desc: 'Comment importer une liste de recettes d’Excel ou Google Sheets dans Savour : enregistre-la en CSV avec des colonnes titre, ingrédients et préparation, une recette par ligne.',
    lead: 'Tu tiens tes recettes dans un tableur ? Avec les bons noms de colonnes, elles sont dans Savour en une fois.',
    sections: [
      ['Une recette par ligne', 'Savour lit un fichier CSV avec les en-têtes de colonnes sur la première ligne et une recette par ligne. Le séparateur peut être une virgule ou un point-virgule.'],
      [
        'Noms de colonnes',
        'Savour reconnaît ces colonnes, avec ou sans majuscules :',
        [
          'Titre : title, name, naam, titel ou recipe (obligatoire).',
          'Ingrédients : ingredients, ingredient ou ingrediënten.',
          'Préparation : directions, instructions, method, bereiding, steps ou preparation.',
          'Rendement : servings, yield, opbrengst, porties ou serves.',
          'Notes : notes ou notities.'
        ]
      ],
      ['Plusieurs lignes dans une cellule', 'Dans la cellule des ingrédients, mets chaque ingrédient sur sa ligne (Alt+Entrée dans Excel, Option+Entrée sur Mac). Pareil pour les étapes de la préparation.'],
      ['Enregistrer en CSV', 'Dans Excel, choisis Fichier → Enregistrer sous → CSV UTF-8. Dans Google Sheets, choisis Fichier → Télécharger → Valeurs séparées par des virgules (.csv).'],
      ['Importer', 'Choisis « Ajouter une recette » → « Importer une recette » → « Autres fichiers » ou « Depuis une autre application de recettes », choisis le .csv puis « Traiter ». Si Savour ne reconnaît pas les colonnes, le lecteur lit le fichier comme du texte.']
    ]
  },
  'import-json': {
    slug: 'fr/manuel-importer-json-et-schema-org',
    menu: 'JSON, schema.org et sauvegardes',
    h1: 'JSON, schema.org et fichiers Savour',
    title: 'Importer des recettes depuis JSON, JSON-LD et une sauvegarde Savour | Manuel',
    desc: 'Comment importer des recettes structurées dans Savour : JSON et JSON-LD avec schema.org Recipe, HTML avec schema.org, un fichier d’importation Savour et ta propre sauvegarde.',
    lead: 'Des recettes déjà bien rangées dans des champs : d’un autre logiciel, d’un site web ou de ta propre sauvegarde.',
    sections: [
      ['schema.org Recipe', 'De nombreux logiciels et sites enregistrent les recettes au format structuré de schema.org (Recipe), en JSON-LD ou dans le HTML. Savour en lit le nom, les ingrédients, la préparation (aussi en étapes et sections), le rendement, la catégorie et les notes.'],
      ['Fichiers JSON', 'Choisis un .json dans « Autres fichiers » ou « Depuis une autre application de recettes ». Savour cherche lui-même les recettes dans le fichier, y compris dans une liste ou dans un export de Mealie ou Tandoor. Un JSON quelconque sans recettes reconnaissables ne peut pas être lu.'],
      ['Restaurer ta sauvegarde Savour', 'Une [sauvegarde téléchargée depuis Savour](#downloaden) (.json) peut être réimportée dans « Autres fichiers ». Les recettes arrivent dans l’[écran de vérification](#import-controleren) ; celles déjà présentes exactement à l’identique ne sont pas enregistrées deux fois.'],
      ['Fichier d’importation Savour', 'Avec le [service d’importation](#import-service), tu reçois parfois un fichier d’importation Savour (.json) avec des recettes déjà lues et vérifiées. Tu le choisis aussi dans « Autres fichiers » ; rien n’est enregistré tant que tu ne cliques pas sur Enregistrer.']
    ]
  },
  'import-notitie-apps': {
    slug: 'fr/manuel-importer-depuis-applications-de-notes',
    menu: 'Applications de notes : Notes, OneNote, Notion',
    h1: 'Importer des recettes depuis des applications de notes',
    title: 'Importer des recettes depuis Apple Notes, OneNote, Notion et Obsidian | Manuel',
    desc: 'Comment faire passer des recettes d’applications de notes dans Savour : Apple Notes, Google Docs, OneNote, Notion, Obsidian, Bear, Joplin et Simplenote, via Word, PDF, Markdown ou texte.',
    lead: 'Tes recettes sont éparpillées dans les notes de ton téléphone ? Voici comment les mettre dans Savour.',
    sections: [
      ['Le chemin court', 'Pour une ou quelques recettes : ouvre la note, copie le texte et colle-le dans [Saisir du texte](#import-tekst). Tu peux coller plusieurs recettes à la fois.'],
      ['Apple Notes', 'Sur Mac, choisis une note puis Fichier → Exporter au format PDF, et importe ce [PDF](#import-pdf). Sur iPhone, copie le texte et colle-le dans Saisir du texte.'],
      ['Google Docs', 'Choisis Fichier → Télécharger → Microsoft Word (.docx) et importe le [fichier Word](#import-word). Un seul document avec toutes tes recettes convient.'],
      ['Microsoft OneNote', 'Exporte une page ou une section en Word ou PDF (Fichier → Exporter) et importe ce fichier. Tu peux aussi copier-coller une page isolée.'],
      ['Notion', 'Sur la page de tes recettes, choisis ⋯ → Exporter → Markdown et CSV. Tu reçois un ZIP de fichiers .md ; choisis-le dans « Tous les fichiers mélangés ». Voir [Un dossier entier ou un ZIP](#import-hele-map).'],
      ['Obsidian, Bear, Joplin et Simplenote', 'Ces applications enregistrent les notes en Markdown ou en texte, ou savent les exporter ainsi. Choisis le dossier de fichiers .md ou .txt avec « Choisir un dossier entier », ou mets-les dans un ZIP. Chaque fichier devient une recette, le titre # servant de nom.'],
      ['Evernote et Google Keep', 'Savour a une importation dédiée pour ces deux-là : voir [Evernote](#import-evernote) et [Google Keep](#import-google-keep).']
    ]
  },
  'import-ai': {
    slug: 'fr/manuel-lecteur-savour-et-ia',
    menu: 'Le lecteur Savour et l’IA',
    title: 'Le lecteur Savour et l’IA : quand l’IA lit tes recettes | Manuel',
    desc: 'Comment Savour lit les recettes : toujours d’abord le lecteur Savour, gratuit et sans IA. L’IA de Savour Pro lit les photos, les scans et les recettes douteuses, jusqu’à 500 par mois.',
    lead: 'Ce que fait le lecteur Savour, quand l’IA intervient et pourquoi rien n’est jamais inventé.',
    sections: [
      ['Le lecteur Savour passe toujours en premier', 'Word, PDF, texte et exports d’autres applications sont lus par le lecteur Savour : un programme maison qui découpe les recettes et reconnaît titre, rendement, ingrédients et préparation. C’est gratuit et rien ne part vers une IA.'],
      ['Quand l’IA aide', 'Avec [Savour Pro](#gratis-en-pro), l’IA intervient pour :', ['Les photos de recettes manuscrites ou scannées, et l’appareil photo.', 'Les PDF scannés sans texte.', 'Les recettes sur lesquelles le lecteur Savour a des doutes : elles sont relues.']],
      ['Sans Pro', 'Sur un compte gratuit, tu vois combien de recettes ont été lues avec des doutes. Elles sont marquées pour que tu les vérifies dans l’[écran de vérification](#import-controleren). Rien n’est perdu.'],
      ['La limite', 'Savour Pro lit jusqu’à 500 importations par mois avec l’IA. Une fois la limite atteinte, le lecteur Savour prend le relais, avec les recettes marquées à vérifier.'],
      ['Jamais inventé', 'L’IA ne peut lire que ce qui est écrit. Si la préparation n’est pas sur la note, elle n’est pas non plus dans la recette. Pourquoi c’est si important : [Pourquoi l’IA ne doit jamais inventer ta recette](/blog/ai-mag-je-recept-niet-verzinnen).']
    ]
  },
  overstappen: {
    slug: 'fr/manuel-passer-a-savour',
    menu: 'Passer à Savour',
    title: 'Passer à Savour depuis une autre application de recettes | Manuel',
    desc: 'Toutes les applications de recettes depuis lesquelles tu passes à Savour : Paprika, Mela, Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton, MasterCook, Cookmate, Living Cookbook et d’autres.',
    lead: 'Quelle que soit ton application : fais un export, choisis le fichier et tes recettes sont dans Savour.',
    sections: [
      ['Comment ça marche', 'Presque toutes les applications de recettes savent faire un export : un fichier avec toutes tes recettes. Tu choisis ce fichier dans Savour, dans « Depuis une autre application de recettes ». Savour reconnaît tout seul de quelle application il vient.'],
      [
        'Applications avec importation dédiée',
        'Pour chaque application, tu trouves comment faire l’export :',
        [
          '[Paprika](#import-paprika) : .paprikarecipes et .paprikarecipe',
          '[Mela](#import-mela) : .melarecipes et .melarecipe',
          '[Mealie](#import-mealie) : .zip avec JSON',
          '[Tandoor](#import-tandoor) : .json ou .zip',
          '[Recipe Keeper](#import-recipe-keeper) : .zip',
          '[Copy Me That](#import-copy-me-that) : .zip avec HTML',
          '[Crouton](#import-crouton) : .zip avec .crumb',
          '[MasterCook](#import-mastercook) : .mx2 et .mxp',
          '[Cookmate](#import-cookmate) : .mcb',
          '[Living Cookbook](#import-living-cookbook) : .fdx et .fdxz',
          '[Evernote](#import-evernote) : .enex',
          '[Google Keep](#import-google-keep) : .zip de Google Takeout',
          '[Flavorish](#import-flavorish) : .zip',
          '[CookBookManager](#import-cookbookmanager) : .zip avec .yml',
          '[Plan to Eat](#import-plan-to-eat) : .csv',
          '[Pepperplate](#import-pepperplate) : sans fichier d’export'
        ]
      ],
      ['Ton application n’est pas listée ?', 'Vérifie si elle peut exporter en CSV, HTML, JSON (schema.org), Word, PDF ou texte ; Savour les lit presque toujours. Voir [Excel et CSV](#import-csv), [JSON et schema.org](#import-json) et [Fichiers texte](#import-tekstbestanden). Si ça ne marche pas, [contacte-nous](/contact) avec un exemple de ton export.'],
      ['Résilier ton ancienne application', 'Garde ton ancienne application encore un moment à côté de Savour, le temps de tout vérifier. Conserve le fichier d’export comme sauvegarde.'],
      ['Comparer', 'Tu hésites encore ? [Savour, Paprika, Meez et Galley comparés](/blog/savour-paprika-meez-galley-vergelijken) présente les différences et le public de chaque application.']
    ]
  },
  'import-pepperplate': {
    slug: 'fr/manuel-importer-depuis-pepperplate',
    menu: 'Passer de Pepperplate à Savour',
    h1: 'Transférer des recettes depuis Pepperplate',
    title: 'Transférer tes recettes de Pepperplate vers Savour | Manuel',
    desc: 'Comment transférer tes recettes de Pepperplate vers Savour : Pepperplate n’a pas de fichier d’export exploitable, mais avec le lien ou par copier-coller, ça marche.',
    lead: 'Pepperplate n’a pas d’export lisible par Savour. Voici comment récupérer tes recettes quand même.',
    sections: [
      ['Pourquoi pas d’importation dédiée', 'Pepperplate ne crée pas de fichier d’export avec des recettes structurées. D’autres applications récupèrent les recettes en se connectant avec ton mot de passe Pepperplate. Savour ne le fait volontairement pas : Savour ne demande jamais ton mot de passe d’un autre service.'],
      ['Recettes de sites web', 'Si une recette venait d’un site web, réimporte-la avec le lien : voir [Recette d’un site web](#import-website).'],
      ['Tes propres recettes', 'Ouvre la recette dans Pepperplate, copie le texte et colle-le dans [Saisir du texte](#import-tekst). Tu peux en coller plusieurs à la suite ; laisse une ligne vide entre elles.'],
      ['Beaucoup de recettes', 'Si tu as des centaines de recettes et pas le temps de les copier, le [service d’importation](#import-service) les transfère pour toi.']
    ]
  },
  'import-service': {
    slug: 'fr/manuel-service-d-importation',
    menu: 'Le service d’importation',
    title: 'Le service d’importation : fais transférer ton classeur de recettes | Manuel',
    desc: 'Pas le temps d’importer ? Avec le service d’importation de Savour, des cuisiniers transfèrent tout ton classeur, dans la structure que tu choisis, recette par recette vérifiée.',
    lead: 'Pas le temps de le faire toi-même ? Les cuisiniers derrière Savour transfèrent ton classeur de recettes.',
    sections: [
      ['Ce que c’est', 'Avec le service d’importation, tu fournis tes recettes telles quelles : Word, PDF, photos, notes ou un export d’une autre application. Les cuisiniers derrière Savour les transfèrent dans la structure que tu choisis et comparent chaque recette à l’original.'],
      ['Le demander', 'Sur la page [Service d’importation](/recepten-laten-inladen), tu fais ta demande et tu vois le prix. Ensuite, tu envoies tes fichiers via le site.'],
      ['Ce que tu reçois', 'Tes recettes sont dans ton propre compte Savour, ou tu reçois un fichier d’importation Savour à [importer](#import-json) toi-même. Tu les vérifies dans l’[écran de vérification](#import-controleren) avant l’enregistrement.'],
      ['En savoir plus', 'Comment ça se passe en pratique : [Faire transférer son classeur de recettes](/blog/receptenmap-laten-overzetten).']
    ]
  },
  'import-problemen': {
    slug: 'fr/manuel-problemes-a-l-importation',
    menu: 'Problèmes à l’importation',
    title: 'Résoudre les problèmes à l’importation de recettes | Manuel Savour',
    desc: 'Que faire si l’importation ne fonctionne pas : aucune recette trouvée, un fichier illisible, des recettes collées, des photos sans Pro et plus encore.',
    lead: 'Les messages les plus fréquents à l’importation et quoi faire.',
    sections: [
      ['Aucune recette trouvée dans l’export', 'Savour ne reconnaît pas les recettes du fichier. Vérifie que tu as choisi le bon export (voir la page de ton application dans [Passer à Savour](#overstappen)). Un ZIP ou un JSON quelconque sans recettes reconnaissables ne peut pas être lu.'],
      ['Le fichier ne contient pas de texte lisible', 'C’est probablement un PDF scanné. Il est lu par l’IA avec [Savour Pro](#gratis-en-pro). Voir [Fichiers PDF](#import-pdf).'],
      ['Lire des photos seulement avec Savour Pro', 'Les photos, l’appareil photo et les scans sont lus par l’IA. Essaie les 7 jours de Pro gratuits ou saisis la recette avec [Saisir manuellement](#recept-maken).'],
      ['Deux recettes collées', 'Le lecteur n’a pas vu de nouveau nom de recette. Corrige-le dans l’écran de vérification, ou mets dans le document le titre de chaque recette en intertitre ou en gras, puis réimporte.'],
      ['Des ingrédients dans la préparation', 'Ajoute dans ton document un intertitre « Ingrédients » et un « Préparation ». Savour marque ces recettes comme douteuses ; avec Pro, l’IA les relit.'],
      ['Un .doc ou un Pages ne passe pas', 'Enregistre un ancien .doc en .docx dans Word. Un fichier Pages s’exporte dans Pages en Word ou PDF.'],
      ['Des numéros devant les noms', 'Retire-les en une fois après l’enregistrement avec [Nettoyer](#opschonen).'],
      ['Recettes en double', 'Savour n’enregistre qu’une fois les recettes strictement identiques. Les quasi-doublons se trouvent avec [Nettoyer](#opschonen).'],
      ['Toujours pas bon', 'Choisis « Signaler un problème » en bas du site et joins le fichier ou une capture. Voir [Signaler un problème et contact](#probleem-melden).']
    ]
  }
};

export const apps = {
  'import-paprika': {
    files: 'un fichier .paprikarecipes (toutes les recettes) ou .paprikarecipe (une recette)',
    desc: 'Comment passer tes recettes de Paprika Recipe Manager à Savour : exporte en .paprikarecipes et importe le fichier, avec photos, notes et rendement.',
    lead: 'De Paprika à Savour en quelques minutes, photos comprises.',
    export: 'Dans Paprika, sélectionne les recettes à emporter (ou toutes) et choisis Exporter. Comme format, choisis « Paprika Recipe Format ». Sur ordinateur, Exporter se trouve dans le menu Fichier ; sur téléphone ou tablette, dans le menu de partage. L’emplacement exact varie selon la version.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation, le rendement (servings), les notes (à la fin de la préparation) et la photo de la recette.',
    extra: [['Aussi en HTML', 'Si tu as exporté de Paprika en HTML, tu peux aussi choisir ces fichiers ou le ZIP ; Savour lit les recettes dans le HTML.']]
  },
  'import-mela': {
    files: 'une archive .melarecipes (plusieurs recettes) ou un fichier .melarecipe (une recette)',
    desc: 'Comment passer tes recettes de Mela à Savour : exporte en .melarecipes et importe l’archive, avec photo, intertitres, notes et rendement.',
    lead: 'Tes recettes Mela avec photos et intertitres dans Savour.',
    export: 'Sur Mac, fais un clic droit sur « Toutes » dans le menu de gauche de Mela et choisis d’exporter toutes les recettes. Choisis où enregistrer l’archive .melarecipes. Une sélection plus petite s’exporte de la même façon depuis une autre catégorie, comme Favoris. Une seule recette se partage en .melarecipe.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation, le rendement, les notes et la première photo. Les intertitres dans les ingrédients ou la préparation (« # Sauce ») deviennent des [parties de la recette](#recept-delen), comme « Sauce : ».'
  },
  'import-mealie': {
    files: 'un export de tes recettes en JSON, seul ou dans un .zip',
    desc: 'Comment passer tes recettes de Mealie à Savour : exporte tes recettes en JSON ou ZIP et importe le fichier. Les ingrédients avec quantité et unité sont repris.',
    lead: 'De ton propre serveur Mealie à Savour.',
    export: 'Exporte tes recettes de Mealie en JSON. Selon la version, tu trouves cela dans l’export des recettes ou dans la gestion des données. Tu obtiens un fichier .json ou un .zip de fichiers JSON.',
    carries: 'Savour reprend : le nom, les ingrédients (même quand quantité, unité, produit et note sont séparés), la préparation, le rendement et les notes.'
  },
  'import-tandoor': {
    files: 'un export en .json ou un .zip de fichiers JSON',
    desc: 'Comment passer tes recettes de Tandoor Recipes à Savour : exporte tes recettes en JSON et importe le fichier.',
    lead: 'De Tandoor Recipes à Savour.',
    export: 'Ouvre les paramètres de Tandoor et choisis Exporter. Choisis un type d’export avec les recettes en JSON au format schema.org, choisis « Toutes les recettes » ou une sélection et télécharge le fichier quand il est prêt.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation (y compris en étapes), le rendement et les notes. Les photos ne font pas partie de cet export.'
  },
  'import-recipe-keeper': {
    files: 'le fichier .zip créé par Recipe Keeper à l’export',
    desc: 'Comment passer tes recettes de Recipe Keeper à Savour : exporte tes recettes en ZIP et importe-le en une fois.',
    lead: 'De Recipe Keeper à Savour, avec toutes tes recettes dans un ZIP.',
    export: 'Dans les paramètres de Recipe Keeper, choisis d’exporter tes recettes. Tu obtiens un fichier .zip. Ne le décompresse pas.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation, le rendement, la catégorie et les notes, tels qu’ils figurent dans l’export.'
  },
  'import-copy-me-that': {
    files: 'un export .zip avec l’option HTML',
    desc: 'Comment passer tes recettes de Copy Me That à Savour : exporte en HTML, tu obtiens un ZIP, et importe-le dans Savour.',
    lead: 'De Copy Me That à Savour.',
    export: 'Dans Copy Me That, choisis dans ton compte d’exporter tes recettes avec l’option « HTML ». Tu obtiens un fichier .zip.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation, le rendement et les notes. Si une recette n’est pas structurée dans le HTML, le lecteur Savour lit le texte.'
  },
  'import-crouton': {
    files: 'un .zip de fichiers .crumb ou un seul fichier .crumb',
    desc: 'Comment passer tes recettes de Crouton à Savour : exporte tes recettes en ZIP de fichiers .crumb et importe-le.',
    lead: 'De Crouton sur iPhone, iPad ou Mac à Savour.',
    export: 'Ouvre Crouton sur iOS ou macOS et va dans les réglages. Choisis l’export de tes recettes (le nom exact varie selon la version). Tu obtiens un .zip avec un fichier .crumb par recette.',
    carries: 'Savour reprend : le nom, les ingrédients avec quantité et unité, la préparation, le rendement et les notes.'
  },
  'import-mastercook': {
    files: 'un fichier .mx2 (MasterCook XML) ou .mxp',
    desc: 'Comment passer tes recettes de MasterCook à Savour : exporte en .mx2 ou .mxp et importe le fichier.',
    lead: 'De MasterCook à Savour, y compris les anciens livres de recettes.',
    export: 'Ouvre le livre de recettes dans MasterCook et choisis Fichier → Exporter. Comme format, choisis MasterCook (.mx2) ou l’ancien export texte (.mxp).',
    carries: 'Savour reprend : le nom, les ingrédients avec quantité et unité, la préparation, les portions et les notes. Un .mxp est lu comme du texte par le lecteur Savour ; vérifie ces recettes un peu plus attentivement.'
  },
  'import-cookmate': {
    files: 'un fichier .mcb, l’export de Cookmate (anciennement My Cookbook)',
    desc: 'Comment passer tes recettes de Cookmate (My Cookbook) à Savour : exporte en .mcb et importe le fichier, avec les photos.',
    lead: 'De Cookmate à Savour, avec les photos de tes recettes.',
    export: 'Dans Cookmate, choisis l’export ou la sauvegarde de tes recettes. Enregistre le fichier .mcb sur ton téléphone ou ton ordinateur ; Savour le lit sans le décompresser.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation, le rendement, les commentaires (à la fin de la préparation) et la photo si elle est dans l’export.'
  },
  'import-living-cookbook': {
    files: 'un fichier .fdx ou .fdxz',
    desc: 'Comment passer tes recettes de Living Cookbook à Savour : exporte ton livre en FDX ou FDXZ et importe le fichier, avec photos et astuces.',
    lead: 'De Living Cookbook à Savour.',
    export: 'Dans Living Cookbook, exporte ton livre ou tes recettes au format FDX ou FDXZ (FDXZ est une version compressée avec photos). Savour ne peut pas lire un fichier .lcb (la base de données du livre elle-même).',
    carries: 'Savour reprend : le nom, les ingrédients avec quantité et unité, les étapes, les portions, les commentaires, les astuces et la photo.'
  },
  'import-evernote': {
    files: 'un fichier .enex avec tes notes de recettes',
    desc: 'Comment passer tes recettes d’Evernote à Savour : exporte tes notes de recettes en .enex et Savour lit chaque note comme une recette.',
    lead: 'Les recettes gardées des années dans Evernote, dans Savour en une fois.',
    export: 'Dans Evernote, sélectionne les notes de tes recettes (ou un carnet entier) et choisis Fichier → Exporter des notes. Choisis le format .enex et enregistre le fichier.',
    carries: 'Chaque note devient une recette, avec le titre de la note comme nom. Le texte est lu par le lecteur Savour : ingrédients, préparation et rendement. Les notes sans ingrédients ni préparation (une liste, par exemple) sont marquées à vérifier, pour les retirer facilement dans l’écran de vérification. Les étiquettes et pièces jointes ne sont pas reprises.'
  },
  'import-google-keep': {
    files: 'un .zip de Google Takeout avec tes notes Keep',
    desc: 'Comment passer tes recettes de Google Keep à Savour : télécharge tes notes en ZIP avec Google Takeout et importe-le. Chaque note devient une recette.',
    lead: 'Tes notes de recettes de Google Keep dans Savour.',
    export: 'Va sur Google Takeout (takeout.google.com), sélectionne uniquement « Keep » et crée l’export. Télécharge le .zip quand Google t’indique qu’il est prêt.',
    carries: 'Chaque note devient une recette, avec le titre de la note comme nom ; la date au-dessus disparaît. Les listes à cocher deviennent une ligne par élément. Les notes sans préparation (une liste de courses, par exemple) sont marquées à vérifier, pour les retirer dans l’écran de vérification.'
  },
  'import-flavorish': {
    files: 'le fichier .zip créé par Flavorish à l’export',
    desc: 'Comment passer tes recettes de Flavorish à Savour : exporte tes recettes en ZIP et importe-le, avec photos et intertitres.',
    lead: 'De Flavorish à Savour, avec tes photos.',
    export: 'Ouvre l’onglet Account dans Flavorish. Dans « Import & Export », choisis d’exporter tes recettes. Tu obtiens un .zip avec tes recettes et tes photos.',
    carries: 'Savour reprend : le nom, les ingrédients et la préparation dans le bon ordre, les intertitres comme [parties de la recette](#recept-delen), les portions, les notes et la photo.'
  },
  'import-cookbookmanager': {
    files: 'l’export YAML de CookBookManager.com : un .zip avec un fichier .yml par recette',
    desc: 'Comment passer tes recettes de CookBookManager.com à Savour : choisis l’export YAML, tu obtiens un ZIP, et importe-le dans Savour.',
    lead: 'De CookBookManager.com à Savour.',
    export: 'Sur CookBookManager.com, choisis l’export de tes recettes au format YAML. Enregistre le .zip.',
    carries: 'Savour reprend : le nom, les ingrédients, la préparation, les portions, les notes (avec un lien vidéo s’il y en a un) et la première étiquette comme catégorie. Une ligne d’ingrédient qui se termine par deux-points devient une [partie de la recette](#recept-delen).'
  },
  'import-plan-to-eat': {
    files: 'un export .csv de tes recettes',
    desc: 'Comment passer tes recettes de Plan to Eat à Savour : exporte tes recettes en CSV et importe le fichier.',
    lead: 'De Plan to Eat à Savour.',
    export: 'Dans les paramètres de Plan to Eat, choisis d’exporter tes recettes en CSV et télécharge le fichier.',
    carries: 'Savour lit les colonnes titre, ingrédients, préparation, portions et notes. Comment Savour reconnaît les colonnes est expliqué dans [Excel et CSV](#import-csv).'
  }
};
