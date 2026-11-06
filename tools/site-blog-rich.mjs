// Uitgebreide opmaak voor alle blogs, samengevoegd uit vier delen (per deel een handvol artikelen).
// tools/build-seo.mjs zet dit om naar In het kort, blokken en extra secties. De allergenenblog heeft zijn eigen
// opmaak in tools/site-blog-allergenen.mjs.
import { RICH_1 } from './site-blog-rich-1.mjs';
import { RICH_2 } from './site-blog-rich-2.mjs';
import { RICH_3 } from './site-blog-rich-3.mjs';
import { RICH_4 } from './site-blog-rich-4.mjs';

export const BLOG_RICH = { ...RICH_1, ...RICH_2, ...RICH_3, ...RICH_4 };
