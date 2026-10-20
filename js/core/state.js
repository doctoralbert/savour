// Gedeelde toestand van de app: ingelogde gebruiker, geladen bibliotheek en wat er nu open staat.

let currentUser = null;

let sessionStartPromise = null;

let authMode = 'login';

// De receptenbibliotheek van de ingelogde gebruiker (gevuld door loadDatabaseState).
let recipes = [];

let folders = [];

let favorites = [];

let sharedMaps = [];

let activeCat = '';

let categories = ['Sauzen & componenten', 'Groenten & garnituren', 'Vis & zeevruchten', 'Vlees', 'Patisserie'];

let account = { name: 'Chef-kok', role: 'Chef-kok', email: '', password: '', photo: '' };

let cropTarget = null,
  cropImageSrc = '',
  cropZoom = 1,
  cropX = 0,
  cropY = 0,
  cropStartX = 0,
  cropStartY = 0,
  cropBaseX = 0,
  cropBaseY = 0,
  dragging = false;

let currentId = null;

let currentFolder = null;

let currentShared = null;

let recipeReturnView = 'recipes';

let recipeReturnShared = null;

let recipeReturnFolder = null;

let folderTargetRecipe = null;

let activeFolderCategory = '';

let importSource = '';

let importFileData = null;

let batchDrafts = [];

let activeShareUrl = '';

let activeShareTitle = '';

let activeInviteTitle = '';

// Recepten die in het verwijdervenster zijn aangevinkt.
let bulkSelectedIds = new Set();

// Gekozen beginletter per lijst (bibliotheek en favorieten); '' betekent alles.
window.savourAlphabet = { library: '', favorite: '' };
// Gekozen beginletter binnen een persoonlijke map, gedeelde map en map binnen een gedeelde map.
window.folderAlphabet = '';
window.sharedAlphabet = '';
window.sharedFolderAlphabet = '';
// Laatst aangeklikte rij in het verwijdervenster, voor selecteren met Shift.
window.bulkLastIndex = null;
