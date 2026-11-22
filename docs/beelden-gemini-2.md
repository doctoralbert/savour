# Beelden maken met Gemini, ronde 2: een eigen foto voor elke pagina en elke blog

Nu delen bijna alle pagina's en blogs dezelfde zes keukenfoto's (wortels, uien, eend, brigade, hout, ingrediënten).
Met deze ronde krijgt elke pagina en elke blog een eigen beeld. Maak ze in Gemini, sla ze op als `.jpg` met precies de
bestandsnaam hieronder in een map, en geef die map aan Claude (opdracht: `docs/opdracht-hele-site.md`). Claude zet
het keurmerk erop en koppelt ze.

**Volgorde:** begin met **ronde A** (de belangrijkste pagina's), dan **B** (handleiding en overige pagina's), dan
**C** (blogs). Elke ronde kan los live.

## Stijl (zet dit onder élke prompt)

> Photorealistic editorial food and kitchen photograph, ultra-wide 21:9 landscape, 1584×672. Dark, moody, warm
> low-key lighting with soft amber highlights, deep shadows, rich dark wood, dark marble or brushed steel, aged copper
> pans softly out of focus in the background, shallow depth of field with creamy bokeh, one clear subject in sharp
> focus. Place the subject on the right half of the frame and keep calm dark space on the left (a page title goes
> there). Professional high-end restaurant kitchen, calm and premium, not cluttered. No text, no letters, no numbers,
> no labels, no logos, no brand names, no faces (hands and forearms are fine). Any paper, screen or notebook in the
> image shows only blurred, unreadable writing. Natural, real textures; no illustration, no CGI look.

Tip: te druk of te licht? Vraag Gemini: "Make it darker and calmer, more empty dark space on the left, same subject."

---

## Ronde A: functies, doelgroepen en de belangrijkste pagina's (18)

| # | Bestandsnaam | Komt op | Prompt (plus de stijl) |
|---|---|---|---|
| A1 | `page-digitaliseren.jpg` | Recepten digitaliseren | An old, stained handwritten recipe notebook lying open on a dark wooden pass, next to it a closed laptop and a few loose recipe cards with coffee rings; a hand turns a page. |
| A2 | `page-organiseren.jpg` | Recepten organiseren | A neat row of dark leather recipe binders with coloured tab dividers on a steel shelf in a professional kitchen, one binder pulled slightly forward. |
| A3 | `page-database.jpg` | Receptendatabase (cloud, offline) | A tablet standing on a steel shelf inside a walk-in cold room, cool blue light from the cold room mixing with warm kitchen light from the door, the screen softly glowing but unreadable. |
| A4 | `page-delen.jpg` | Delen met je brigade | Three pairs of chef's hands at a pass, each holding a phone or a printed recipe sheet, all showing the same blurred recipe, plates waiting under heat lamps. |
| A5 | `page-opschalen.jpg` | Recepten opschalen | Two large copper and steel stock pots steaming on a range, a big ladle, a digital kitchen scale with a large bowl of diced vegetables beside it. |
| A6 | `page-printen.jpg` | Recepten printen | Printed recipe sheets clipped on a ticket rail above a pass, one sheet with a small blurred restaurant emblem at the top, warm light from below. |
| A7 | `page-allergenen.jpg` | Allergenen per recept | A calm arrangement of the main allergen ingredients in small dark bowls on dark marble: eggs, flour, butter, milk in a small jug, hazelnuts, almonds, sesame, a celery stalk, mustard seeds, a few shrimps. |
| A8 | `page-inladen.jpg` | Recepten laten inladen (service) | A stack of old recipe binders, notebooks and loose papers tied with kitchen string in a wooden crate on a steel counter, ready to be sent away. |
| A9 | `page-koks.jpg` | Voor koks | A chef's hands plating a refined main course with tweezers on a dark plate, a sauce spoon resting beside it, copper pans glowing behind. |
| A10 | `page-brigade.jpg` | Voor keukenbrigades | A busy but orderly kitchen pass seen from the side: several chefs' hands and forearms in dark aprons placing plates, rows of identical dishes. |
| A11 | `page-pro.jpg` | Savour Pro / prijzen | A single perfect dish on a dark plate under a soft spotlight, gold-rimmed details, a polished copper pan and a folded dark linen napkin beside it; premium and quiet. |
| A12 | `page-over.jpg` | Over Savour | A worn chef's notebook full of handwritten recipes, a pencil and a cup of black coffee on a dark wooden pass at the end of service, the kitchen dim behind. |
| A13 | `page-binnenkort.jpg` | Binnenkort / roadmap | A chef's hands sketching a new dish idea in a notebook with blurred drawings, small test portions on spoons beside it, early morning light in an empty kitchen. |
| A14 | `page-foodcost.jpg` | (Binnenkort: foodcost calculator) | Raw ingredients weighed on a scale with a small paper receipt and a pencil, a few coins, on dark wood; calculating cost, nothing readable. |
| A15 | `page-app.jpg` | App downloaden | A phone propped against a jar on a steel kitchen bench, showing a blurred recipe in large text, flour dust and a whisk nearby. |
| A16 | `page-faq.jpg` | Veelgestelde vragen | A chef leaning on the pass with a cup of coffee and a phone after service, only hands and apron visible, calm and quiet kitchen. |
| A17 | `page-contact.jpg` | Contact | A handwritten note and an envelope on a dark wooden table next to a cup of coffee and a small sprig of rosemary, warm side light. |
| A18 | `page-community.jpg` | Community (blog en pagina) | Several chefs' hands around a dark wooden table with coffee cups, notebooks and a tasting spoon, as if discussing; no faces. |

## Ronde B: handleiding en overige pagina's (10)

| # | Bestandsnaam | Komt op | Prompt (plus de stijl) |
|---|---|---|---|
| B1 | `gids-hoofd.jpg` | Handleiding (overzicht) | An open kitchen binder with neat coloured tabs and a pen on dark marble, a phone beside it, calm and organised. |
| B2 | `gids-start.jpg` | Handleiding: aan de slag | A clean, empty stainless steel kitchen bench at the start of the day, one knife, one cutting board and a phone ready. |
| B3 | `gids-importeren.jpg` | Handleiding: importeren | Loose handwritten recipe sheets spread out on a counter being photographed with a phone held above them (only hands). |
| B4 | `gids-bewerken.jpg` | Handleiding: recept bewerken | A chef's hand correcting a printed recipe with a pencil, crossed-out quantity, a tasting spoon beside it. |
| B5 | `gids-ordenen.jpg` | Handleiding: ordenen en zoeken | Spice jars and small labelled-looking containers (labels blank) in a perfectly ordered drawer, top view at an angle. |
| B6 | `gids-omrekenen.jpg` | Handleiding: omrekenen | Measuring jugs, a scale and a stack of identical small bowls on a counter, everything in neat rows. |
| B7 | `gids-printen.jpg` | Handleiding: printen | A small office printer on a shelf at the edge of a kitchen, a freshly printed sheet coming out, warm light. |
| B8 | `gids-delen.jpg` | Handleiding: delen en keukenteams | Two hands passing a phone across a pass, plates in the background. |
| B9 | `gids-account.jpg` | Handleiding: account en Pro, inloggen | A laptop half open on a dark desk in the kitchen office, a key on a ring beside it, warm lamp light. |
| B10 | `page-ingredientenlijst.jpg` | Ingrediëntenlijst met allergenen | Rows of glass jars with dried ingredients (grains, nuts, flours, seeds) on dark wooden shelves, softly lit. |

## Ronde C: een eigen foto voor elke blog (28)

De blogs over bartenders, cateraars, patissiers en MEP-lijsten hebben al een eigen foto.

| # | Bestandsnaam | Blog | Prompt (plus de stijl) |
|---|---|---|---|
| C1 | `blog-ai-horeca.jpg` | AI in de horeca | A phone held above a stained handwritten recipe, soft glow from the screen, kitchen behind. |
| C2 | `blog-ai-niet-verzinnen.jpg` | Waarom AI je recepten nooit mag verzinnen | A handwritten recipe with one quantity circled in pencil, a magnifying glass resting on it. |
| C3 | `blog-allergenen.jpg` | Allergenen in Savour | A plated dessert next to small bowls of nuts, eggs and flour, a chef's finger pointing at the nuts. |
| C4 | `blog-foodcost-berekenen.jpg` | Foodcost berekenen | A chef weighing a portion of fish on a scale, a small notebook and pencil beside it. |
| C5 | `blog-foodcost-calculator.jpg` | Binnenkort: foodcost calculator | Ingredients for one dish laid out in exact portions on a tray, like a costing setup. |
| C6 | `blog-gedeeld-receptenboek.jpg` | Wat een gedeeld receptenboek doet | Several phones on a pass all showing the same blurred recipe, plates waiting. |
| C7 | `blog-keukenteams.jpg` | Keukenteams in Savour | Hooks with aprons and a shelf with binders in a kitchen locker area, warm light. |
| C8 | `blog-horeca-cijfers.jpg` | Horeca in cijfers | An empty restaurant dining room before service, tables set, warm low light, seen from the kitchen door. |
| C9 | `blog-kerntemperaturen.jpg` | Kerntemperaturen | A probe thermometer in a roasted piece of beef on a board, the display blurred. |
| C10 | `blog-kosten-marges.jpg` | Wat kost een restaurant? | A delivery of fresh produce in crates being checked on a steel counter, a pencil and a delivery note (unreadable). |
| C11 | `blog-nieuwe-kok.jpg` | Een nieuwe kok inwerken | An experienced hand guiding a younger hand holding a knife over a cutting board. |
| C12 | `blog-kladjes.jpg` | Oude kladjes digitaliseren | A pile of old, stained recipe notebooks and loose notes tied with string, one open. |
| C13 | `blog-receptbeheer.jpg` | Receptbeheer in de horeca | A wall-mounted shelf with recipe binders above a prep station, mise en place below. |
| C14 | `blog-app-kiezen.jpg` | Een recepten-app kiezen | A phone and a tablet side by side on a dark counter next to a chef's knife roll. |
| C15 | `blog-recepten-delen.jpg` | Recepten delen met je team | A phone being handed over at the pass by one hand to another. |
| C16 | `blog-opschalen.jpg` | Recepten opschalen zonder rekenfouten | A large rondeau with sauce reducing, a big whisk, steam. |
| C17 | `blog-organiseren.jpg` | Recepten organiseren in een fine-dining keuken | Neatly arranged small garnish containers on a station, top view at an angle. |
| C18 | `blog-zonder-wifi.jpg` | Recepten zonder wifi | A phone on a shelf inside a cold room with crates of vegetables, cold blue light. |
| C19 | `blog-eigen-logo.jpg` | Receptenboek met eigen logo | A printed recipe booklet with a blurred emblem on the cover, on dark linen. |
| C20 | `blog-database.jpg` | Een receptendatabase voor je keuken | Rows of identical labelled-looking containers (labels blank) in a walk-in, perfectly ordered. |
| C21 | `blog-laten-overzetten.jpg` | Je receptenmap laten overzetten | A wooden crate of old binders being handed over across a counter (hands only). |
| C22 | `blog-mappen-indelen.jpg` | Receptenmappen indelen: vijf voorbeelden | Five dark binders with differently coloured tabs fanned out on marble. |
| C23 | `blog-roadmap.jpg` | Roadmap | A chalkboard-style planning wall in a kitchen office with blurred notes and pinned papers, unreadable. |
| C24 | `blog-ordenen-met-ai.jpg` | Een rommelige receptenmap ordenen | A messy pile of recipe papers on the left turning into a neat stack on the right, on one counter. |
| C25 | `blog-vergelijken.jpg` | Savour, Paprika, Meez en Galley vergeleken | Three different notebooks and a phone side by side on a pass, as if being compared. |
| C26 | `blog-sous-vide.jpg` | Sous-vide | A sous-vide water bath with a vacuum-sealed piece of fish, steam, steel and copper. |
| C27 | `blog-standaardrecepturen.jpg` | Standaardrecepturen | Identical plates lined up, each dish exactly the same, a chef checking one with a spoon. |
| C28 | `blog-van-word.jpg` | Van Word-document naar receptenboek | A printed document with dense blurred text next to a neat recipe card, a pen between them. |

---

Totaal: 18 (A) + 10 (B) + 28 (C) = 56 beelden. Je hoeft niet alles in één keer te maken: elke ronde los is prima.
