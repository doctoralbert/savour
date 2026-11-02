// Manual (Spaans): alle onderdelen samen. Zie tools/site-handleiding.mjs.
import * as start from './start.mjs';
import * as importeren from './importeren.mjs';
import * as recepten from './recepten.mjs';
import * as ordenen from './ordenen.mjs';
import * as keuken from './keuken.mjs';
import * as printen from './printen.mjs';
import * as samenwerken from './samenwerken.mjs';
import * as account from './account.mjs';
import * as tips from './tips.mjs';

const MODS = [start, importeren, recepten, ordenen, keuken, printen, samenwerken, account, tips];

export const OVERLAY = {
  groups: Object.assign({}, ...MODS.map(m => m.groups)),
  pages: Object.assign({}, ...MODS.map(m => m.pages)),
  apps: importeren.apps
};
