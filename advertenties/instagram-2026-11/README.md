# Instagram-advertenties Savour (november 2026)

Twee concepten, elk in twee formaten:

| Bestand | Formaat | Waar |
|---|---|---|
| `savour-a-feed.png` / `savour-b-feed.png` | 1080 × 1350 (4:5) | Instagram-feed |
| `savour-a-story.png` / `savour-b-story.png` | 1080 × 1920 (9:16) | Stories en Reels |

In de story-versies blijven de bovenste ~230 px en de onderste ~330 px leeg: daar legt Instagram de naam en de knop overheen.

## Concept A: van kladje naar recept

- **Primaire tekst:**
  Nog steeds recepten op kladjes, in Word en in losse PDF's? Savour leest ze in en maakt er één receptenboek van, op elke telefoon in de keuken. Omrekenen naar elk aantal porties, allergenen per recept, delen met je brigade. Gratis tot 100 recepten.
- **Kop:** Van kladje naar recept
- **Beschrijving:** Receptenbeheer voor professionele koks
- **Knop:** Registreren (of: Meer informatie)
- **Link:** `https://savour.page/?bron=ig-advertentie-a`

## Concept B: gratis foodcost calculator

- **Primaire tekst:**
  Weet je wat je bord écht kost? Vul je ingrediënten in, met inkoopprijs en opbrengst, en zie meteen je kostprijs per portie, de adviesprijs bij je doel-foodcost en je marge per bord. Gratis, zonder account.
- **Kop:** Gratis foodcost calculator
- **Beschrijving:** Kostprijs per portie in 1 minuut
- **Knop:** Meer informatie
- **Link:** `https://savour.page/blog/gratis-foodcost-calculator?bron=ig-advertentie-b`

## Meten

De `?bron=`-tags komen in /admin onder "Eigen links (?bron=)" en bij Bezoekers. Vergelijk na 5 à 7 dagen:
klikken (Meta), bezoeken per bron (/admin) en nieuwe accounts in die periode.

## Opnieuw maken

`bron/advertentie.html?v=a-feed` (of `a-story`, `b-feed`, `b-story`) openen in headless Chrome, direct als bestand:

```
chrome --headless=new --hide-scrollbars --allow-file-access-from-files --window-size=1080,1350 --virtual-time-budget=8000 --screenshot=savour-a-feed.png "file:///…/bron/advertentie.html?v=a-feed"
```

Story: `--window-size=1080,1920`. Niet via de lokale server: die geeft voor deze map de startpagina (map staat in `.vercelignore`).

## Profielfoto

`../instagram-profielfoto.png` (1080 × 1080): het app-icoon, de S met de gouden streep op zwart (uit `tools/icon.html`).
Instagram snijdt hem rond bij; het teken valt er ruim binnen.

## Gewone posts (`post-1.png` t/m `post-4.png`, 1080 × 1350)

Gemaakt met `bron/posts.html?p=1` t/m `4`, op dezelfde manier als de advertenties. Plaats ze in deze volgorde, één per paar dagen;
post 1 eerst, zodat je profiel meteen uitlegt wat Savour is. Link in bio: `https://savour.page/?bron=ig-bio`.

**Post 1 – Kennismaking**
Je recepten op kladjes, in Word, in PDF's en in je hoofd? Savour zet ze op één plek. Gemaakt voor professionele koks: kladjes inlezen, omrekenen naar elk aantal personen, allergenen per recept, MEP-lijsten en je hele brigade erbij. Gratis tot 100 recepten, link in bio.
#chef #kok #keuken #recepten #horeca #patisserie #mep #savour

**Post 2 – Omrekenen**
Vanavond 16 couverts in plaats van 8? Eén tik op 2× en elke hoeveelheid rekent mee. Ook ½×, 5×, 10× of je eigen aantal. Terug naar het origineel kan altijd. Link in bio.
#chef #kok #keuken #recepten #horeca #omrekenen

**Post 3 – MEP-lijsten**
De MEP-lijst die met je meedenkt. Vul de couverts in en Savour rekent per onderdeel uit hoeveel je nodig hebt. Wie iets afvinkt, ziet de hele brigade meteen, ook op een andere telefoon. Printen op één A4 kan ook. Link in bio.
#mep #miseenplace #chef #brigade #keuken #horeca

**Post 4 – Allergenen**
Welk ingrediënt bevat welk allergeen? Savour zet de 14 allergenen per recept in één overzicht, per ingrediënt. Handig voor de bediening en klaar om te printen. Link in bio.
#allergenen #chef #keuken #horeca #voedselveiligheid

## English posts (`en/post-1.png` t/m `en/post-4.png`)

Gemaakt met `bron/posts.html?p=1&lang=en` (schermen uit de Engelse demo). Link in bio: `https://savour.page/en?bron=ig-bio`.

**Post 1 – Introduction**
Your recipes on scraps of paper, in Word, in PDFs and in your head? Savour puts them in one place.

Built for professional chefs:
— import your notes and files
— scale to any number of covers
— allergens per recipe
— prep lists for the whole brigade
— work together in your kitchen team

Free up to 100 recipes. Link in bio.
#chef #chefslife #professionalchef #kitchen #recipes #hospitality #pastrychef #savour

**Post 2 – Scaling**
16 covers tonight instead of 8? One tap on 2× and every quantity scales along.

Also ½×, 5×, 10× or your own number. You can always go back to the original, your recipe stays exactly as it was.

Try it free, link in bio.
#chef #chefslife #kitchen #recipes #hospitality #savour

**Post 3 – Prep lists**
The prep list that thinks along.

Enter the covers and Savour works out how much you need of each item. Tick something off and the whole brigade sees it instantly, on any phone. Print it on a single A4 too.

Link in bio.
#prep #miseenplace #chef #chefslife #brigade #kitchen #savour

**Post 4 – Allergens**
Which ingredient contains which allergen?

Savour shows the 14 allergens per recipe in one overview, per ingredient. Handy for front of house, and ready to print.

Link in bio.
#allergens #chef #chefslife #kitchen #foodsafety #hospitality #savour

## English ads (`en/savour-{a,b}-{feed,story}.png`)

Gemaakt met `bron/advertentie.html?v=a-feed&lang=en` enz. In de Engelse feedversie van B valt het lijstje weg (kop is twee regels).

**Concept A – From scribbled notes to recipes**
- Primary text: Still keeping recipes on scraps of paper, in Word files and loose PDFs? Savour reads them in and turns them into one recipe book, on every phone in the kitchen. Scale to any number of covers, allergens per recipe, share with your brigade. Free up to 100 recipes.
- Headline: From notes to recipes
- Description: Recipe management for professional chefs
- Button: Sign up (or: Learn more)
- Link: `https://savour.page/en?bron=ig-ad-a`

**Concept B – Free food cost calculator**
- Primary text: Do you know what your plate really costs? Enter your ingredients with purchase price and yield, and instantly see your cost per portion, the suggested price at your target food cost and your margin per plate. Free, no account needed.
- Headline: Free food cost calculator
- Description: Cost per portion in a minute
- Button: Learn more
- Link: `https://savour.page/en/blog/free-food-cost-calculator?bron=ig-ad-b`
