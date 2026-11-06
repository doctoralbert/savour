// Franse versies van de blogs over kerntemperaturen en sous-vide (zie tools/site-blog-temperaturen.mjs).
import { SRC } from './site-blog-temperaturen.mjs';

export const TEMP_POSTS_FR = {
  'en/blog/core-temperatures-meat-fish-shellfish': {
    slug: 'fr/blog/temperatures-a-coeur-viande-poisson-fruits-de-mer',
    title: 'Températures à cœur pour viande, poisson et fruits de mer',
    desc: 'Températures à cœur pour la cuisine professionnelle : poulet, porc, bœuf, agneau, gibier, poisson, crustacés et coquillages. Pourquoi le poulet n’a pas besoin de 75 °C, avec tableaux temps-température et sources.',
    h1: 'Températures à cœur pour viande, volaille, poisson et fruits de mer',
    lead: 'Le poulet n’a pas besoin d’atteindre 75 °C et le filet mignon de porc peut rester rosé. Ce qui compte, c’est la température et le temps. Un aperçu pour la cuisine professionnelle, avec les sources.',
    sections: [
      [
        'Température et temps vont ensemble',
        'Les bactéries ne meurent pas à une température magique. Plus c’est chaud, plus c’est rapide. Les salmonelles du poulet sont détruites en quelques secondes à 74 °C à cœur ; à 60 °C il faut environ une demi-heure. Tout aussi sûr, mais bien plus juteux à 60 °C.\n\nC’est pourquoi les tableaux ci-dessous indiquent toujours deux choses : quelle température à cœur, et combien de temps le cœur doit la garder. Plus la pièce est épaisse, plus le cœur met de temps à y arriver.'
      ],
      [
        'Ce que dit le code d’hygiène',
        'Le code d’hygiène néerlandais pour la restauration part d’une température à cœur d’au moins 75 °C à la cuisson, d’un maintien au chaud au-dessus de 60 °C et d’un refroidissement à 7 °C ou moins en 5 heures. Dans ton pays, d’autres règles peuvent s’appliquer. Si tu travailles plus bas, comme pour un canard rosé, un poulet sous vide ou un saumon à peine cuit, note dans ton plan HACCP la combinaison temps-température utilisée, mesure avec une sonde étalonnée et enregistre-le.'
      ],
      [
        'Volaille : poulet, dinde et pintade',
        'Le service de sécurité alimentaire américain (USDA FSIS) a calculé combien de temps le poulet doit rester à chaque température à cœur pour réduire les salmonelles de dix millions de fois. Les morceaux plus gras, comme la cuisse avec la peau, demandent un peu plus. La dinde aussi.',
        {
          head: ['Température à cœur', 'Poulet maigre (2 % de gras)', 'Poulet plus gras (12 % de gras)'],
          rows: [
            ['60,0 °C', '26 minutes', '35 minutes'],
            ['62,8 °C', '9 minutes', '13 minutes'],
            ['65,6 °C', '3 minutes', '4 minutes'],
            ['68,3 °C', '45 secondes', '54 secondes'],
            ['71,1 °C', '14 secondes', '17 secondes'],
            ['73,9 °C', 'immédiat', 'immédiat']
          ],
          note: 'Source : USDA FSIS, tableaux temps-température pour la volaille (réduction de 7 log des salmonelles). Le temps compte dès que le cœur atteint la température.'
        }
      ],
      [
        'Le poulet en pratique',
        'Un suprême porté à 63–65 °C à cœur et laissé reposer quelques minutes à cette température est sûr et reste juteux. À la poêle ou au four, ce repos est difficile à garantir ; sors-le plutôt à 66–68 °C ou garde-le au chaud, couvert. Le sous vide tient le temps avec précision.\n\nLes cuisses montent souvent plus haut, à 70–80 °C. Pas pour la sécurité, mais parce que le tissu conjonctif devient fondant.'
      ],
      [
        'Foies de volaille et abats',
        'Les foies de volaille peuvent contenir Campylobacter à l’intérieur, même bien saisis à l’extérieur. Après des intoxications liées à des parfaits de foie rosés, la Food Standards Agency britannique recommande 70 °C à cœur pendant 2 minutes. Sont équivalents 65 °C pendant 10 minutes ou 75 °C pendant 30 secondes.'
      ],
      [
        'Porc',
        'Le porc n’a plus besoin d’être gris. En 2011, l’USDA a abaissé la norme pour les pièces entières de 71 °C à 63 °C avec 3 minutes de repos. Dans l’UE, les porcs sont en outre contrôlés pour la trichine. Dans un muscle entier, les bactéries sont surtout en surface, et le marquage les chauffe largement.',
        {
          head: ['Produit', 'Cœur', 'Résultat'],
          rows: [
            ['Filet mignon de porc', '60–62 °C', 'Rosé et juteux'],
            ['Côte, carré', '62–63 °C', 'Légèrement rosé, 3 minutes de repos'],
            ['Haché, saucisse, burger', '71 °C', 'Cuit à cœur : les bactéries sont réparties dans tout le produit'],
            ['Épaule, poitrine, joue (braisées)', '85–95 °C', 'Fondant et effiloché ; la température est pour la texture']
          ]
        }
      ],
      [
        'Bœuf, veau et agneau',
        'Dans une pièce entière de bœuf, de veau ou d’agneau, l’intérieur est pratiquement stérile. C’est pourquoi une entrecôte peut être saignante. Choisis la température à cœur selon le goût et la texture. Sors les gros rôtis 2 à 5 °C plus tôt : le cœur continue de monter pendant le repos.',
        {
          head: ['Cuisson', 'Cœur', 'Aspect'],
          rows: [
            ['Saignant', '50–52 °C', 'Rouge et juteux'],
            ['Rosé', '54–56 °C', 'Rose, gras juste fondu'],
            ['À point', '58–60 °C', 'Rose clair'],
            ['Bien cuit', '68 °C et plus', 'Gris, ferme'],
            ['Haché, burger', '71 °C', 'Toujours cuit à cœur : les bactéries sont mélangées à la viande']
          ]
        }
      ],
      [
        'Tartare et carpaccio',
        'La viande crue n’est sûre que si elle est fraîche, vient d’un fournisseur fiable, reste froide et est taillée ou hachée juste avant le service. Le risque n’est jamais nul. Ne la sers pas aux femmes enceintes, aux jeunes enfants, aux personnes âgées ou immunodéprimées.'
      ],
      [
        'Gibier, canard et oie',
        'Le cerf, le chevreuil et le lièvre se traitent comme le bœuf : rosé, c’est bien. Le sanglier peut contenir la trichine. Ne le sers rosé que s’il a été officiellement contrôlé ; sinon, cuis-le à au moins 71 °C.\n\nLes magrets de canard et d’oie se servent rosés, à 54–58 °C. Pour le faire de manière démontrablement sûre, utilise les temps de la volaille du tableau ou cuis le magret sous vide (voir [Sous vide : températures et temps](/fr/blog/sous-vide-temperatures-et-temps)). Les cuisses se confisent à 80 °C ou plus.'
      ],
      [
        'Poisson',
        'Pour le poisson, la température à cœur se choisit surtout selon la texture. Quelques degrés de trop et il se dessèche.',
        {
          head: ['Poisson', 'Cœur', 'Résultat'],
          rows: [
            ['Saumon, truite', '45–50 °C', 'Mi-cuit : nacré, fondant'],
            ['Cabillaud, églefin, flétan', '50–54 °C', 'Se détache juste en feuillets'],
            ['Turbot, sole, bar', '50–55 °C', 'Ferme et juteux'],
            ['Thon', '40–45 °C (centre cru)', 'Snacké brièvement'],
            ['Bien cuit (FSIS)', '63 °C', 'Opaque, se défait']
          ]
        }
      ],
      [
        'Parasites : quand le poisson doit d’abord être congelé',
        'Le poisson consommé cru ou presque cru peut contenir l’anisakis : sushi, ceviche, tartare, poisson mariné ou fumé à froid, et aussi le saumon mi-cuit à 45 °C. Selon le règlement (CE) 853/2004 (modifié par le [1276/2011](' + SRC.eu1276 + ')), ce poisson doit d’abord être congelé : au moins 24 heures à −20 °C ou moins, ou 15 heures à −35 °C. Chauffer à 60 °C à cœur pendant au moins 1 minute tue aussi les parasites. Le poisson d’élevage peut être exempté ; demande l’attestation à ton fournisseur.'
      ],
      [
        'Crustacés et coquillages',
        'Les crustacés se cuisent selon la texture. Les coquillages demandent plus de prudence.',
        {
          head: ['Produit', 'Cœur', 'Résultat'],
          rows: [
            ['Homard', '55–60 °C', 'Juteux, juste opaque'],
            ['Langoustine', '50–55 °C', 'Nacrée et sucrée'],
            ['Crevettes', '55–60 °C', 'Opaques et fermes'],
            ['Saint-Jacques', '45–50 °C', 'Cœur nacré'],
            ['Moules, coques', 'Jusqu’à ouverture, puis encore un peu', 'Jeter celles qui restent fermées']
          ]
        }
      ],
      [
        'Virus dans les coquillages',
        'Moules, huîtres et coques peuvent contenir des norovirus et l’hépatite A. Ces virus résistent mieux à la chaleur que les bactéries. La norme européenne pour le traitement thermique industriel des coquillages est de 90 °C pendant 90 secondes dans la chair ; l’EFSA [a rendu un avis à ce sujet](' + SRC.efsaBivalves + '). Les huîtres crues ne sont jamais sans risque. Achète-les uniquement auprès de fournisseurs agréés et ne les sers pas aux clients vulnérables.'
      ],
      [
        'Clients vulnérables',
        'Pour les femmes enceintes, les personnes âgées, les jeunes enfants et les personnes immunodéprimées : pas de poisson, crustacés ou coquillages crus ou peu cuits, pas de volaille ni de foie rosés, pas de viande crue. Cuis la volaille à 74 °C à cœur ou respecte strictement les temps du tableau.'
      ],
      [
        'Bien mesurer',
        'Pique la sonde dans la partie la plus épaisse, pas contre un os. Vérifie-la régulièrement dans de l’eau glacée : elle doit indiquer 0 °C. Nettoie-la entre cru et cuit. Et note les températures : c’est ainsi que tu montres que tu travailles selon ton plan HACCP.'
      ],
      [
        'Sources',
        'Les valeurs de cet article proviennent de :',
        [
          '[USDA FSIS : safe minimum internal temperature chart](' + SRC.fsisChart + ')',
          '[USDA FSIS : guide de cuisson avec tableaux temps-température pour la volaille](' + SRC.fsisPoultry + ')',
          'Food Standards Agency (Royaume-Uni, 2010) : foies de volaille à 70 °C pendant 2 minutes',
          '[Règlement (UE) 1276/2011 sur les parasites dans les produits de la pêche](' + SRC.eu1276 + ')',
          '[EFSA sur le traitement thermique des mollusques bivalves](' + SRC.efsaBivalves + ')',
          '[Code d’hygiène néerlandais pour la restauration (KHN)](' + SRC.khn + ')'
        ]
      ]
    ],
    outro: 'Dans Savour, tu notes la température à cœur à l’étape où elle s’applique, pour que toute ta brigade la voie, aussi en mode cuisine. Cet article est une aide ; ton propre plan HACCP et la réglementation en vigueur priment toujours.'
  },
  'en/blog/sous-vide-temperatures-and-times': {
    slug: 'fr/blog/sous-vide-temperatures-et-temps',
    title: 'Sous vide : températures et temps par produit',
    desc: 'Tableau de cuisson sous vide pour la cuisine professionnelle : températures et temps pour bœuf, veau, agneau, porc, poulet, canard, poisson, fruits de mer, œufs et légumes, avec sécurité, refroidissement et conservation.',
    h1: 'Sous vide : températures et temps',
    lead: 'Une référence pour la cuisine : pour chaque produit, la température du bain, le temps et le résultat. Avec les règles pour refroidir et conserver en toute sécurité.',
    sections: [
      [
        'Comment fonctionne le sous vide',
        'En sous vide, la température du bain est la température finale du produit. Un suprême de volaille dans un bain à 63 °C ne dépasse jamais 63 °C. Le temps a trois parties : jusqu’à ce que le cœur atteigne la température (selon l’épaisseur), assez longtemps pour pasteuriser et, pour les morceaux durs, assez longtemps pour attendrir le tissu conjonctif.'
      ],
      [
        'Travailler en sécurité',
        'Les règles principales :',
        [
          'Pas plus de 4 heures en dessous de 54,5 °C. En dessous, les bactéries peuvent se développer. Sers tout de suite le poisson mi-cuit et la viande saignante.',
          'Pour pasteuriser, respecte au moins les temps du tableau ci-dessous, à partir d’un produit sortant du froid.',
          'Le poisson cuit en dessous de 60 °C doit d’abord être congelé contre les parasites (voir [Températures à cœur](/fr/blog/temperatures-a-coeur-viande-poisson-fruits-de-mer)).',
          'Travaille avec des produits frais et froids et des sacs propres, et consigne tout dans ton plan HACCP.'
        ]
      ],
      [
        'Temps de pasteurisation selon l’épaisseur',
        'Le temps nécessaire au bain pour pasteuriser dépend de l’épaisseur et de la température. Une sélection des tableaux de Douglas Baldwin, à partir de 5 °C :',
        {
          head: ['Produit et épaisseur', '55 °C', '60 °C', '63 °C'],
          rows: [
            ['Bœuf, porc, agneau · 20 mm', '2 h 30', '1 h 15', '55 min'],
            ['Bœuf, porc, agneau · 50 mm', '4 h 30', '2 h 30', '2 h 15'],
            ['Poulet · 20 mm', '–', '1 h 15', '50 min'],
            ['Poulet · 50 mm', '–', '3 h 15', '2 h 30'],
            ['Poisson maigre · 20 mm', '3 h', '1 h', '–'],
            ['Poisson gras · 20 mm', '4 h 45', '1 h 15', '–']
          ],
          note: 'Source : Douglas Baldwin, A Practical Guide to Sous Vide Cooking. Son tableau poulet commence à 57 °C (20 mm : 2 h 45) ; le poisson va jusqu’à 60 °C.'
        }
      ],
      [
        'Bœuf et veau',
        'Les morceaux tendres se cuisent à la cuisson voulue, les morceaux durs longtemps à plus basse température pour qu’ils restent rosés.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Filet, entrecôte, faux-filet (3–4 cm)', '55 °C', '1 h 30–3 h', 'Rosé ; servir dans les 4 h ou appliquer le temps de pasteurisation'],
            ['Idem, à point', '60 °C', '1 h 30–3 h', 'Rose clair'],
            ['Bavette, hampe, aiguillette', '55 °C', '6–12 h', 'Rosé et plus tendre'],
            ['Paleron, macreuse, épaule', '55 °C', '24–48 h', 'Rosé et tendre comme un steak'],
            ['Poitrine (rosée)', '57 °C', '36–48 h', 'Ferme, rosée'],
            ['Poitrine (effilochée)', '80 °C', '24–36 h', 'Se défait'],
            ['Filet de veau, noix de veau', '57–58 °C', '2–4 h', 'Rose clair, juteux']
          ]
        }
      ],
      [
        'Agneau',
        'L’agneau se cuit comme le bœuf ; pour l’épaule, même approche que l’épaule de porc.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Carré, filet', '55–57 °C', '1–2 h', 'Rosé'],
            ['Gigot (rosé)', '57 °C', '8–24 h', 'Rosé et tendre'],
            ['Épaule', '68 °C', '24 h', 'Tendre, encore tranchable'],
            ['Épaule (effilochée)', '80 °C', '8–12 h', 'Se défait']
          ]
        }
      ],
      [
        'Porc',
        'Le porc peut rester rosé ; l’épaule et la poitrine sont meilleures à plus haute température.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Filet mignon', '60 °C', '1 h 30–3 h', 'Rosé et juteux'],
            ['Côte', '61 °C', 'Temps de pasteurisation (20 mm : 1 h)', 'Légèrement rosée'],
            ['Côte, cuisson longue', '55 °C', '12 h', 'Tendre, rosée'],
            ['Épaule', '68 °C', '24 h', 'Tendre, tranchable'],
            ['Épaule (effilochée)', '80 °C', '8–12 h', 'Se défait'],
            ['Travers', '68 °C ou 80 °C', '24 h ou 8–12 h', 'De ferme à détaché de l’os'],
            ['Poitrine', '68–80 °C', '12–24 h', 'Puis croustiller à la poêle']
          ]
        }
      ],
      [
        'Volaille',
        'La volaille se cuit à une température à laquelle elle est aussi pasteurisée ; le temps dépend de l’épaisseur.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Suprême de poulet', '63,5 °C', '1 h 30–3 h (épaisseur)', 'Juteux, juste cuit'],
            ['Filet de dinde', '63,5 °C', '3–5 h', 'Juteux'],
            ['Haut de cuisse de poulet', '65 °C', '1 h 30–3 h', 'Tendre, encore ferme'],
            ['Magret de canard', '57 °C', '3–4 h', 'Rosé ; pasteurisé selon le tableau'],
            ['Cuisse de canard, d’oie ou de dinde (confit)', '80 °C', '8–12 h', 'Se détache de l’os']
          ]
        }
      ],
      [
        'Poisson et fruits de mer',
        'Le poisson cuit vite. En dessous de 60 °C, on ne pasteurise pas : utilise un poisson qui a été congelé et sers tout de suite.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Saumon, mi-cuit', '42–50 °C', '15–20 min', 'De nacré à fondant'],
            ['Saumon, cuit', '60 °C', 'Temps de pasteurisation (20 mm : 1 h 15)', 'Ferme, opaque'],
            ['Cabillaud, églefin, flétan', '55–60 °C', '30–60 min', 'Se détache en feuillets'],
            ['Homard (queue, décortiquée)', '55 °C', '20–30 min', 'Juteux et sucré'],
            ['Crevettes', '55–60 °C', '15–25 min', 'Fermes'],
            ['Poulpe', '77–82 °C', '4–6 h', 'Tendre, puis griller']
          ]
        }
      ],
      [
        'Œufs',
        'Les œufs se cuisent dans leur coquille, sans sac.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Œuf pasteurisé', '57 °C', 'au moins 75 min', 'Encore cru, mais sûr pour mayonnaise ou tartare'],
            ['Œuf mollet', '63 °C', '45–60 min', 'Jaune coulant, blanc juste pris'],
            ['« Œuf parfait »', '64,5 °C', '45–60 min', 'Jaune comme une crème épaisse']
          ]
        }
      ],
      [
        'Légumes et fruits',
        'Les légumes demandent bien plus de chaleur que la viande : la pectine ne se décompose que vers 84 °C. Cuis-les donc à part. Les temps sont indicatifs ; ils dépendent de l’épaisseur et de la maturité.',
        {
          head: ['Produit', 'Bain', 'Temps', 'Résultat'],
          rows: [
            ['Carotte, panais, céleri-rave', '85 °C', '45–60 min', 'Tendre avec du croquant, plein de goût'],
            ['Betterave', '85 °C', '1 h 30–2 h', 'Fondante'],
            ['Pommes de terre grenaille', '85 °C', '60–90 min', 'Crémeuses'],
            ['Asperges (moyennes)', '85 °C', '12–15 min', 'Al dente ; fines : 6–8 min'],
            ['Fenouil', '85 °C', '45–60 min', 'Fondant et doux'],
            ['Poire, pomme', '80–85 °C', '20–40 min', 'Pochée, garde sa forme']
          ]
        }
      ],
      [
        'Refroidir et conserver',
        'Si tu travailles à l’avance (cuisson-refroidissement), refroidis les sacs juste après la cuisson dans de l’eau glacée composée d’au moins moitié de glace. Une pièce de 25 mm est froide en environ 50 minutes, une de 50 mm en environ 2 h 45. Le code d’hygiène néerlandais demande de refroidir à 7 °C ou moins en 5 heures ; respecte les règles de ton pays. Ne conserve à l’avance que des produits pasteurisés ; fixe la durée de conservation dans ton plan HACCP et date le sac.'
      ],
      [
        'En pratique',
        'Sèche le produit à la sortie du bain et saisis-le brièvement et fort pour une croûte. Herbes et beurre dans le sac donnent beaucoup de goût ; l’ail cru peut devenir âcre à basse température, préfère l’ail confit. Note la température du bain et le temps dans la recette pour que toute la brigade fasse exactement pareil.'
      ],
      [
        'Sources',
        'Les valeurs de cet article proviennent de :',
        [
          '[Douglas Baldwin : A Practical Guide to Sous Vide Cooking](' + SRC.baldwin + ')',
          '[USDA FSIS : tableaux temps-température pour la volaille](' + SRC.fsisPoultry + ')',
          '[Code d’hygiène néerlandais pour la restauration (KHN)](' + SRC.khn + ')',
          'Légumes : valeurs courantes en cuisine autour de 84–85 °C, où la pectine se décompose'
        ]
      ]
    ],
    outro: 'Note la température du bain et le temps à l’étape de ta recette dans Savour ; quand tu recalcules, le temps ne change pas, car il dépend de l’épaisseur et non de la quantité. Cet article est une aide ; ton propre plan HACCP prime toujours.'
  }
};
