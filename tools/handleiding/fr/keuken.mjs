// Manuel (Frans), section « En cuisine ».

export const groups = {
  keuken: {
    name: 'En cuisine',
    intro: 'Convertir vers n’importe quel rendement, le mode cuisine en gros caractères et tes recettes sans internet.'
  }
};

export const pages = {
  omrekenen: {
    slug: 'fr/manuel-convertir',
    menu: 'Convertir avec les boutons rapides',
    h1: 'Convertir',
    title: 'Convertir et adapter des recettes dans Savour | Manuel',
    desc: 'Comment convertir une recette dans Savour : boutons rapides de ¼× à 10×, retour à l’original, imprimer converti et pourquoi la recette enregistrée ne change jamais.',
    lead: 'De 8 couverts à 120 d’un seul geste, sans erreur de calcul.',
    sections: [
      ['Boutons rapides', 'Sous chaque recette avec ingrédients se trouve « Convertir » avec les boutons ¼×, ½×, 1½×, 2×, 3×, 4×, 5× et 10×. Un geste et toutes les quantités sont converties, dans toutes les [parties](#recept-delen) de la recette.'],
      ['Retour à l’original', '« Original » affiche à nouveau les quantités de départ.'],
      ['Un autre facteur ou rendement', 'Il te faut 2,5× ou exactement 3,5 litres ? Ou il te reste 3 kg d’un ingrédient ? Choisis ⋯ « Plus d’options de conversion ». Voir [Plus d’options de conversion](#omrekenen-meer).'],
      ['L’original ne change jamais', 'La conversion ne change que ce que tu vois à l’écran. La recette enregistrée reste exactement la même, pour ton équipe aussi.'],
      ['Imprimer converti', 'Si tu imprimes une recette convertie, tu imprimes les quantités converties. Voir [Imprimer une recette](#printen).'],
      ['Même sans compte', 'Qui ouvre une [recette partagée](#delen-link) peut aussi la convertir sans compte.'],
      ['Goûter reste nécessaire', 'Tout ne se convertit pas de façon linéaire. Ce à quoi faire attention se trouve dans [Adapter sans erreur](#tips-opschalen).']
    ]
  },
  'omrekenen-meer': {
    slug: 'fr/manuel-plus-d-options-de-conversion',
    menu: 'Plus de conversion : facteur, rendement, j’ai',
    title: 'Convertir avec un facteur libre, un rendement ou « J’ai » | Manuel Savour',
    desc: 'Comment convertir dans Savour avec un facteur libre comme 2,5, vers un rendement voulu comme 3,5 litres, ou à partir de ce qu’il te reste d’un ingrédient.',
    lead: 'Trois façons de tomber pile sur ce dont tu as besoin.',
    sections: [
      ['Où', 'Ouvre la recette, choisis ⋯ puis « Plus d’options de conversion ». Tu choisis une des trois façons. Remplir un champ vide les autres.'],
      ['Facteur', 'Saisis un nombre libre, comme 2,5 ou 0,75. Chaque ingrédient est multiplié par ce nombre.'],
      ['Rendement', 'Saisis la quantité dont tu as besoin. Cela marche si la recette a un [rendement](#recept-opbrengst). Si la recette est prévue pour 1 litre et qu’il t’en faut 3,5, saisis 3,5.'],
      ['J’ai', 'Il te reste 3,2 kg d’un ingrédient, comme une pièce de viande achetée ou un reste de fond ? Choisis l’ingrédient et saisis ce que tu as. Savour calcule le reste de la recette autour.'],
      ['Exemple', 'Une recette pour 8 couverts doit servir 120 couverts : le facteur est 120 divisé par 8, soit 15. Avec un rendement de « 8 couverts », tu saisis simplement 120.']
    ]
  },
  eenheden: {
    slug: 'fr/manuel-unites-et-arrondis',
    menu: 'Unités et arrondis',
    title: 'Unités et arrondis à la conversion : grammes, litres, cuillères | Manuel',
    desc: 'Comment Savour choisit les unités et arrondit à la conversion : des kilos aux grammes, des cuillères à café aux cuillères à soupe, fractions nettes pour cuillères et tasses, et ce qui reste tel quel.',
    lead: 'Des quantités converties que tu peux vraiment peser en cuisine.',
    sections: [
      ['Une mesure pratique', 'Savour convertit dans le même type d’unité vers une mesure pratique : 0,25 kg devient 250 g et 24 tbsp deviennent 1 ½ cup.'],
      ['Arrondis', 'Cuillères et tasses reçoivent des fractions nettes, comme ½, ⅓ et ¾. Grammes et millilitres deviennent des nombres entiers.'],
      ['Quelles unités', 'Poids : mg, g, kg, oz et lb. Volume : ml, cl, dl, l, tsp, tbsp et cup, ainsi que les abréviations néerlandaises tl et el. Savour ne convertit pas du poids au volume, car cela dépend du produit.'],
      ['Ce qui reste tel quel', 'Pièces, brins et gousses sont calculés mais pas convertis. « Selon le goût », « pincée » et « trait » restent tels quels.'],
      ['Comment l’écrire', 'Comment écrire les quantités pour que Savour les reconnaisse est expliqué dans [Ingrédients et quantités](#recept-ingredienten).']
    ]
  },
  kookmodus: {
    slug: 'fr/manuel-mode-cuisine',
    menu: 'Mode cuisine',
    title: 'Mode cuisine : gros caractères, écran allumé et cocher | Manuel Savour',
    desc: 'Comment fonctionne le mode cuisine de Savour : seulement la recette en gros caractères, l’écran reste allumé et tu coches ingrédients et étapes. Idéal sur téléphone et tablette.',
    lead: 'Seulement la recette, grande et lisible, même les mains mouillées.',
    sections: [
      ['Lancer le mode cuisine', 'Choisis « Mode cuisine » en haut d’une recette. Tu ne vois que la recette, en gros caractères, sans menu.'],
      ['Écran allumé', 'En mode cuisine, Savour essaie de garder ton écran allumé pour que tu n’aies pas à le toucher sans cesse. Cela dépend du téléphone et du navigateur.'],
      ['Cocher', 'Coche les ingrédients pesés et les étapes terminées. Après une interruption, tu vois exactement où tu en étais. Hors du mode cuisine aussi, tu peux cocher les ingrédients.'],
      ['Cuisiner converti', 'Convertis d’abord la recette avec les [boutons rapides](#omrekenen) puis lance le mode cuisine : tu cuisines avec les quantités converties.'],
      ['Sur la tablette du passe', 'Installe Savour [comme application](#app-installeren) sur une tablette et utilise le mode cuisine pendant la mise en place. Les recettes ouvertes fonctionnent aussi [sans internet](#offline).']
    ]
  },
  offline: {
    slug: 'fr/manuel-sans-internet',
    menu: 'Travailler sans internet',
    title: 'Des recettes sans internet : travailler hors ligne en cuisine | Manuel Savour',
    desc: 'Comment utiliser Savour sans wifi : les recettes ouvertes restent disponibles dans une cuisine en sous-sol ou une chambre froide. Ce qui marche ou non sans connexion.',
    lead: 'Pas de wifi dans la cuisine en sous-sol ? Tes recettes s’ouvrent quand même.',
    sections: [
      ['Comment ça marche', 'Savour garde sur ton appareil les recettes que tu as ouvertes. Si la connexion tombe, Savour ouvre ta bibliothèque depuis cet appareil.'],
      ['Pour que ça marche', 'Connecte-toi une fois avec « [Rester connecté](#inloggen) » et ouvre les recettes dont tu as besoin en cuisine. Idéalement, installe Savour [comme application](#app-installeren) sur ton écran d’accueil.'],
      ['Ce qui marche sans internet', 'Lire, chercher dans ta bibliothèque, [convertir](#omrekenen) et le [mode cuisine](#kookmodus) fonctionnent normalement.'],
      ['Ce qui demande internet', 'Enregistrer, modifier, importer et partager refonctionnent dès que tu as une connexion.'],
      ['En savoir plus', 'Pourquoi c’est si important en cuisine : [Des recettes sans wifi](/blog/recepten-zonder-wifi).']
    ]
  }
};
