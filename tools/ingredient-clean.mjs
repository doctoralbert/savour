// Opschonen van de ingrediëntenlijsten (2026-11-06): alleen wat een kok inkoopt en in een recept schrijft.
// Gebruikt door tools/build-ingredient-base.mjs (Open Food Facts) en tools/build-ingredient-nevo.mjs (NEVO).
//
// Open Food Facts komt van etiketten: daar staan ook aroma's, E-nummers, gemodificeerd zetmeel en wei-eiwit in.
// NEVO is een voedingsstoffenbestand voor consumenten: cornflakes, candybars, frisdrank, vla en kant-en-klare
// salades. Die horen niet in de ingrediëntenlijst van een keuken. Wat hier wegvalt, kent Savour nog steeds via de
// trefwoorden (products.js); het wordt alleen geen voorstel voor een nieuw product meer.

// Merknamen en productnamen uit de supermarkt.
const BRANDS =
  /kellogg|olvarit|brinta|\bliga\b|isostar|\bhero\b|knoppers|pim's|\blu\b|nesquik|ovomaltine|marmite|jozo|nezo|losalt|becel|blue band|activia|yakult|actimel|fristi|vifit|optimel|campina|\barla\b|danoontje|cornetto|festini|roosvicee|karvan|appelsientje|tomatientje|zontomaat|capri-sun|dubbelfrisss|taksi|rivella|golden power|bullit|freeway|aa-drink|extran|coolbest|wasa|vitalu|cracottes|tarvo|alpro|quorn|valess|tartex|completa|halvamel|\bsmac\b|rinse|m&m|smarties|\bmars\b|milky way|bounty|snickers|twix|kitkat|\blion\b|maltesers|after eight|penotti|fruittella|chocotoff|tic-tac|bessola|chocoprince|lay's|albert heijn|\bschar\b|boursin|7-up|cola|icetea|crystal clear|tintelfruit|special k|rice krispies|frosties|coco pops|all-bran|smacks|honey (pops|loops)|cornflakes|breaker|zin\b|mon chou|scholiertje|sultana|b'tween|kinder|bueno|dreumes|baby|peuter|groeidrink|halviture|halvajam|stophoest|hoestbonbon|keelpastille|schoolkrijtjes|schuddebuikjes|hagelmix|duopasta|finesse|pro-activ|yofresh|halvanaise|joppie|mammoet/;

// Woorden die een kant-en-klaar product, een dieetvariant of een NEVO-omschrijving aanduiden.
const PRODUCT_WORDS =
  /e\.d\.|(^|\s)ed($|\s)|\blight\b|verrijkt|natriumarm|suikervrij|minder suiker|kant-en-klaar|huishoudelijk|\bhuish\b|op basis|pakje|\bmix\b|\blunch\b|\bborrel\b|\bsport|energy|energie(drank|reep)|drinkontbijt|ontbijtproduct|ontbijtgranen|vleeswaar|vleeswaren|incl |excl |omhuld|\bgevuld\b|ongevuld|gepaneerd|krokant|plantaardige? alternatief|alternatief|-product|product\b|candybar|oplos|instant|spuitbus|\bsnack|snoep|zuurtje|kauwg|drop\b|hagelslag|muisjes|toetje|\bvla\b|vlaflip|pudding|\bpap\b|rijstepap|gruwel|yoghurtdrank|drinkyoghurt|limonade|frisdrank|ranja|siroop verdund|reep\b|smeerworst|spread|sandwich|salade|maaltijd|gerecht|surinaams gerecht|tafelsaus|partysaus|slasaus|fritessaus|cocktailsaus|vegetarisch|veganistisch|imitatie|moedermelk|borstvoeding|dessertsaus/;

// Etiket- en fabriekstermen uit Open Food Facts.
const LABEL_WORDS =
  /(^|[^a-z])e ?\d{3}|gemodific|gehydrolys|gehydrolis|gehydrogen|gehard|gefractioneer|gereconstitu|gedemineral|gerehydrateer|getextuur|geïnactiveer|machinaal|aroma|aromatiser|emulga|stabilis|verdik|conserveer|antioxid|kleurstof|zuurteregel|zuurtegraad|mineral|vitamine|vezel|eiwit|proteïne|isolaat|caseï|permeaat|filtraat|weiproduct|^wei|weipoeder|zoete wei|concentraat|geconcentreerde? (wei|mango|sap|vrucht|appel|druiven|citroen|sinaasappel|perzik)|biologisch|scharrel|halal|soort|bereiding|preparaat|smaak$|^olie van|van biologische|lactose en|en melk|^vet$|dierlijk vet|bakvet|palmpit|palm (olie|pit)|plantaardig vet|gezoet|nitrietpekel|kaliumzout|^plantconcentraat|extract/;

// Uitzonderingen op de regels hierboven: dit gebruikt een kok wel.
const KEEP =
  /^(ei-?eiwit|eiwit|eiwitten|kippeneiwit|eiwitpoeder|albumine)$|vanille-?extract|amandelextract|moutextract|gekookte ham|kookroom|kokosmelk|klappermelk|kokosdrink|sojadrink|haverdrink|amandeldrink|rijstdrink|sojayoghurt|tofu|tahoe|tempeh|seitan|santen|falafel|maltbier|gember op siroop|stemgember|meringue|schuimpje|banketbakkersroom|gele room|bavarois|lange vingers|speculaas|amaretti|kletskop|^soes$|taartbodem|pasteibakje|pasteitje|bladerdeeg|brooddeeg|pizzabodem|croutons|paneermeel|tapenade|pesto|aioli|tzatziki|guacamole|hummus|hoemoes|tahin|sesampasta|notenpasta|pindakaas|mayonaise|ketjap|sojasaus|sambal|chilisaus|ketchup|mosterd|barbecuesaus|oestersaus|hoisin|teriyaki|mangochutney|piccalill|jus$|jus de veau|marsepein|spijs|praline|nougat|noga|ahornsiroop|maple syrup|stroop|honing|chocolade|couverture|cacao/;

// Gerechten, halffabricaten en omschrijvingen in plaats van één ingrediënt ("oliën en vetten", "verse groenten",
// "acaciahoning uit Frankrijk"). "X en Y" is een combinatie; "half om half" en "zout en peper" komen zo niet in de lijst.
const DISHES =
  /mix|vruchten(yoghurt|kwark)|kroket|frites|friet|patat|gehaktbal|roerbak|vulling|geweekt|irish coffee|luncheon|smeer|\bpate\b|paté|glutenvrij|lactosevrij|\sen\s|\bom\b|\suit\s(?!blik)|^(verse|grote|kleine|middelgrote|natuurlijke?)\s|bijproduct|smaakstof|prebiotic|proteine|extrakt|ashwa|^sulfiet$|^weekdieren$|^schaaldieren$|tafelzuur|tuttifrutti|knakworst|grillworst|^(room|vanille)ijs|meergranen|\bturks\b|surinaams|hollandse|brussels|^glas\b|broodje|zoutje|pakket|cordon bleu|blinde vink|cocktailworst|muesli|gesuikerde|suikerpinda|gevulde|halvarine|heks'?n?kaas|knabbel|borrelnoten|surrogaat|bloempap|gortepap|ambachtelijk|anders$|soepballetje|soeppoeder|smaakversterker|stracciatella|stroopkoek|stroopwafel|rondjes|breezer|milner|rambol|huttenkase|\bca\b|rungergehakt|soesje|slagroomsoes|bananensoes|hutspot|bamigroente|dextrin|monohydraat|sac+hari|oligosa|enzym|^\S+ase$|creatine|cafeïne|carote|glucuron|glycerol|isomalt|integument|korst|koolzuur|kookwater|^(dier|been|borst|lijn|linde|kippen|granen|groente|deeg|kalf|lam|kruiden)$|cépage|cinsault|grenache|malvasia|categorie|geïmporteerd|^extra|inactief|coating|garnituur|glacering|ferment|bifidus|cultuur|edelgist|lithotham|oleoresin|coffea|kinine|\bgmo|niet-eu|\beu\b|\buht\b|gepasteuriseerd|stremsel|darm\b|resten|grasgevoerd|ethyl|biologisch|gedextrin|geëxtrud|gedeactiv|kwaliteit|^(hele )?(verse )?eieren$|mechanisch|vervanger|natrium|nescaf|nacho|neapolitan|petit beurre|^plant|afval|pluimvee|polydextrose|\bof\b|stearine|plantaardige vetten|middel$|toegevoegd|trehalose|familie|uitgeput|bindweefsel|verguld|verhitte?\b|thermisch|uitloop|vetarme?|^(rook|sal|vel|taart|saus|puree|pastas|vruchtvlees)$|cultur|keurmerk|gemaakt van|basis$|\bhoh\b|\brul\b|paturain|gebak|stijl$|riemvis|zakpijp|voorgebakken|voorgefrituurd|voorgekookt|raapzaadlecithine|^(?!(water|mineraalwater|bronwater|kokos(noot)?water|rozenwater|oranjebloesemwater)$).*water$/;

const MAX_WORDS = 4;

// true als de naam in een keukenlijst hoort. group: de NEVO-groep, als die er is.
export function kitchenIngredient(name, group = '') {
  const n = String(name || '')
    .toLowerCase()
    .trim();
  if (!n || /^[-/(]/.test(n) || /[<>%/]|\d/.test(n)) return false;
  if (n.split(/\s+/).length > MAX_WORDS) return false;
  if (BRANDS.test(n) || PRODUCT_WORDS.test(n) || DISHES.test(n)) return false;
  if (KEEP.test(n)) return true;
  if (LABEL_WORDS.test(n)) return false;
  return groupAllows(n, group);
}

// NEVO-groepen: sommige horen helemaal niet in een keuken, andere alleen voor een deel.
const DROP_GROUPS = new Set([
  'Samengestelde gerechten',
  'Hartige snacks en zoutjes',
  'Soepen',
  'Hartig broodbeleg',
  'Flesvoeding en preparaten'
]);
const PARTLY = {
  Vleeswaren:
    /^(ham|rauwe ham|beenham|achterham|schouderham|ontbijtspek|katenspek|spek|bacon|chorizo|salami|worst salami|worst chorizo|rookvlees|runderrookvlees|paardenrookvlees|pekelvlees|bloedworst|metworst|cervelaatworst|leverworst|cornedbeef|ossenworst|pastirma|sucuk|worst droge sucuk|casselerrib|zure zult|hoofdkaas)$/,
  'Niet-alcoholische dranken':
    /sap$|^koffie$|^thee$|^tonic$|^ginger ale$|mineraalwater|^water$|bronwater|spa rood|^kefir$/,
  'Gebak en koek':
    /^(biscuit|lange vingers|speculaas|kokosmakronen|amaretti|kletskop|soes|taartbodem|meringue|baklava)$/,
  Brood:
    /^(beschuit|stokbrood( wit| bruin)?|ciabatta|pita|pitabroodje|croissants?|brioche|croutons|roggebrood|volkorenbrood|witbrood|bruinbrood|zuurdesembrood|desembrood|focaccia|turks brood|pide|matzes|knackebrod|naan|roti|tortilla|wrap|maisbrood|krentenbrood|suikerbrood|melkbrood|pistolet|ontbijtkoek|peperkoek|kerststol|stol)$/,
  'Vleesvervangers en zuivelvervangers':
    /tofu|tahoe|tempeh|seitan|sojadrink|haverdrink|amandeldrink|rijstdrink|kokosdrink|kokosmelk|klappermelk|kokoscreme|klappercreme|santen|falafel|sojaroom|haverroom/,
  'Suiker, snoep, zoet beleg en zoete sauzen':
    /suiker|stroop|siroop|honing|chocolade|cacao|marsepein|jam|confituur|gelei|karamel|dextrose|glucose|fructose|meringue|schuim|noga|nougat|helva|lokum|turks fruit|marshmallow|gember/,
  'Melk en melkproducten':
    /melk|room|yoghurt|kwark|karnemelk|kefir|creme fraiche|crème fraîche|slagroom|zure room|melkpoeder|koffiemelk|banketbakkersroom|gele room|bavarois|roomijs|vanilleijs|^ijs$/
};
function groupAllows(n, group) {
  if (DROP_GROUPS.has(group)) return false;
  const re = PARTLY[group];
  return re ? re.test(n) : true;
}

// Bereidingen vóór de naam ("gekookte tagliatelle", "gesmolten emmental"): weg als het ingrediënt zelf er al is.
export const PREP_PREFIX = /^(gekookte?|gesmolten|voorgekookte?|gemalen voorgekookte|gebakken|gegrilde?)\s+/;
