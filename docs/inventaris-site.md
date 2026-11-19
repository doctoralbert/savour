# Inventaris van savour.page (20 november 2026)

Stap 1 van `docs/opdracht-hele-site.md`. Er is nog niets veranderd. Alle 71 publieke pagina's en blogs zijn
nagelopen (Nederlands; de andere vier talen hebben dezelfde opbouw en worden per pagina meegenomen). Foto's laten we
voor later; de kolom "Foto nu" staat er alleen ter informatie.

## 1. Fouten: dit klopt niet meer en moet anders

| # | Waar | Wat er nu staat | Wat klopt |
|---|---|---|---|
| F1 | Allergenen per recept, blog "Allergenen in Savour", Koks, Keukenbrigades, Patissiers, Binnenkort, release notes 3.8.0 (het blokje "Allergenen" onderaan) | "Jij beantwoordt alleen de vragen" / "jij bevestigt alleen wat Savour niet zeker weet" | Sinds 18 november vult Savour de allergenen zelf in; de kok hoeft niets te doen en mag altijd aanpassen. Bij merkproducten staat "kan per merk verschillen". |
| F2 | `llms.txt` (import service) | €100 tot 150 recepten | Volgens `tools/site-service.mjs`: €85 tot 100, €100 tot 500, €164,99 tot 1.000 recepten. |
| F3 | Blog "Roadmap" en Over Savour | "Allergenen staan live; bovenaan staat nu kostprijs per recept" | Sindsdien zijn ook MEP-lijsten, Savour leert, de Community en de nieuwe doelgroepen live. De roadmap-blog loopt achter op de pagina Binnenkort. |
| F4 | Release notes | Laatste versie 3.8.0 (8 november) | Sinds 8 november is veel live gegaan: Community, MEP-lijsten, importeren dat nooit iets kwijtraakt, dubbele recepten met keuze, allergenen die Savour zelf invult, Savour leert, bar en meervoud bij omrekenen, gluten in buitenlandse bloem, voorwaarden bij aanmelden, snellere start. |
| F5 | De nieuwe pagina's en blogs van cateraars | "organisatieabonnement" | In de app en op de rest van de site heet het "teamabonnement". Eén woord kiezen (zie keuze K1). |

## 2. Keuzes voor jou

| # | Vraag | Mijn voorstel |
|---|---|---|
| K1 | Heet het pakket voor een hele keuken "teamabonnement" (zoals in de app) of "organisatieabonnement"? | **Teamabonnement**, want zo heet het in de app en op de Pro-pagina. Ik pas dan de cateringpagina en -blog aan. |
| K2 | Mag "Savour leert" (wat koks verbeteren maakt Savour slimmer, elke avond gecontroleerd) publiek genoemd worden? Nu staat het alleen in de privacyverklaring. | **Ja, kort**: op Digitaliseren, Allergenen, MEP-lijsten en in de FAQ. Altijd met "alleen als je Help de Savour-lezer verbeteren aan hebt" en "niets verandert vanzelf". |
| K3 | Moeten de oudere blogs met een vast onderwerp (kerntemperaturen, sous-vide, horeca in cijfers, kosten en marges, foodcost berekenen) ook uitgebreid worden met Savour-functies? | **Licht**: alleen een korte verwijzing waar het echt past. Die blogs zijn sterk omdat ze over het vak gaan, niet over Savour. |

## 3. Wat er overal ontbreekt (in het kort)

- **MEP-lijsten** worden op bijna geen enkele functiepagina genoemd, behalve Allergenen, Opschalen en Printen.
- **Dubbele recepten met een keuze** en **"Savour leert"**: bijna nergens genoemd.
- **De nieuwe doelgroepen** (patissiers, cateraars, bartenders en barista's): alleen de Koks-pagina linkt naar patisserie; verder linkt geen enkele oudere pagina of blog ernaar.
- **Offline**: op veel pagina's waar het past (Digitaliseren, Delen, Printen) niet genoemd.
- **Het blogoverzicht, de Over-pagina en de FAQ** noemen de nieuwe functies en doelgroepen niet of nauwelijks.
- **De FAQ** mist vragen over MEP-lijsten, allergenen, doelgroepen, dubbele recepten en wat je met een gratis account in een keukenteam kunt.

## 4. Per pagina

"Noemt nog niet" is een automatische controle op onderwerpen (allergenen, MEP, offline, dubbele recepten, Savour
leert). Dat betekent niet dat elk onderwerp op elke pagina moet: het is een hulp om te kiezen wat ergens bij past.
"Linkt al naar" toont welke van de nieuwe pagina's (patisserie, catering, bar, MEP, allergenen) al gelinkt zijn.

### Functie/doelgroep

| Pagina (nl) | Woorden | Foto nu | Noemt nog niet | Linkt al naar |
|---|---|---|---|---|
| aanleveren | 213 | eend-vuur | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| allergenen-per-recept | 607 | ingredienten-keuken | dubbele recepten, Savour leert | mep |
| binnenkort | 645 | bloemen | offline, dubbele recepten, Savour leert | mep, allergenen |
| mep-lijsten | 568 | mep-pass | allergenen, dubbele recepten, Savour leert | – |
| recepten-database | 545 | brigade | allergenen, MEP, dubbele recepten, Savour leert | – |
| recepten-delen | 624 | brigade | MEP, offline, dubbele recepten, Savour leert | allergenen |
| recepten-digitaliseren | 1002 | ingredienten-hout | MEP, offline, dubbele recepten, Savour leert | – |
| recepten-laten-inladen | 914 | eend-vuur | allergenen, offline, dubbele recepten, Savour leert | – |
| recepten-opschalen | 617 | wortels | offline, dubbele recepten, Savour leert | mep, allergenen |
| recepten-organiseren | 688 | ingredienten-keuken | allergenen, MEP, Savour leert | – |
| recepten-printen | 599 | uien | dubbele recepten, Savour leert | mep, allergenen |
| voor-bartenders | 743 | bar-sour | offline, dubbele recepten, Savour leert | mep, allergenen |
| voor-cateraars | 653 | catering-hero | dubbele recepten, Savour leert | mep, allergenen |
| voor-keukenbrigades | 782 | brigade | MEP, offline, dubbele recepten, Savour leert | allergenen |
| voor-koks | 682 | eend-vuur | MEP, dubbele recepten, Savour leert | patisserie, allergenen |
| voor-patissiers-en-banketbakkers | 671 | patisserie-hero | offline, dubbele recepten, Savour leert | mep, allergenen |

### Overig

| Pagina (nl) | Woorden | Foto nu | Noemt nog niet | Linkt al naar |
|---|---|---|---|---|
| alternatief-voor-paprika | 546 | uien | MEP, offline, dubbele recepten, Savour leert | – |
| app-downloaden | 342 | wortels | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog | 394 | ingredienten-hout | offline, dubbele recepten, Savour leert | – |
| contact | 87 | eend-vuur | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| ingredientenlijst-allergenen | 214 | - | MEP, offline, dubbele recepten, Savour leert | – |
| over-savour | 661 | bord-pass | offline, dubbele recepten, Savour leert | – |
| release-notes | 425 | ingredienten-hout | MEP, offline | – |
| savour-pro | 850 | brigade | offline, dubbele recepten, Savour leert | – |
| veelgestelde-vragen | 867 | ingredienten-keuken | allergenen, MEP, dubbele recepten, Savour leert | – |

### Handleiding

| Pagina (nl) | Woorden | Foto nu | Noemt nog niet | Linkt al naar |
|---|---|---|---|---|
| handleiding | 1778 | bloemenveld | Savour leert | – |
| handleiding-aan-de-slag | 1759 | wortels | allergenen, Savour leert | – |
| handleiding-account-en-pro | 1122 | eend-vuur | allergenen, dubbele recepten, Savour leert | – |
| handleiding-delen-en-keukenteams | 1469 | ingredienten-keuken | allergenen, offline, dubbele recepten, Savour leert | – |
| handleiding-importeren | 3525 | uien | allergenen, offline, Savour leert | – |
| handleiding-mep-lijsten | 369 | wortels | allergenen, dubbele recepten, Savour leert | – |
| handleiding-omrekenen | 830 | ingredienten-hout | allergenen, dubbele recepten, Savour leert | – |
| handleiding-ordenen-en-zoeken | 1152 | brigade | allergenen, offline, Savour leert | – |
| handleiding-overstappen-naar-savour | 1979 | ingredienten-keuken | allergenen, offline, Savour leert | – |
| handleiding-printen | 692 | uien | allergenen, offline, dubbele recepten, Savour leert | – |
| handleiding-problemen-met-inloggen | 666 | ingredienten-hout | allergenen, offline, dubbele recepten, Savour leert | – |
| handleiding-recept-bewerken | 1819 | eend-vuur | offline, Savour leert | – |
| handleiding-tip-recept-schrijven | 779 | brigade | offline, dubbele recepten, Savour leert | – |

### Blog

| Pagina (nl) | Woorden | Foto nu | Noemt nog niet | Linkt al naar |
|---|---|---|---|---|
| blog/ai-in-de-horeca | 961 | wortels | MEP, offline, dubbele recepten, Savour leert | allergenen |
| blog/ai-mag-je-recept-niet-verzinnen | 478 | wortels | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/allergenen-in-savour | 1112 | brigade | MEP, offline, dubbele recepten, Savour leert | patisserie, allergenen |
| blog/foodcost-berekenen | 1011 | brigade | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/foodcost-calculator | 817 | uien | MEP, offline, dubbele recepten, Savour leert | allergenen |
| blog/gedeeld-receptenboek-keukenteam | 505 | ingredienten-hout | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/gedeelde-mappen-uitgelegd | 748 | ingredienten-hout | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/horeca-in-cijfers | 1029 | eend-vuur | MEP, offline, dubbele recepten, Savour leert | – |
| blog/kerntemperaturen-vlees-vis-schaaldieren | 1733 | ingredienten-hout | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/kosten-en-marges-restaurant | 1121 | ingredienten-keuken | MEP, offline, dubbele recepten, Savour leert | – |
| blog/mep-lijsten-in-savour | 838 | mep-pass | dubbele recepten, Savour leert | catering, bar, mep |
| blog/nieuwe-kok-inwerken | 546 | eend-vuur | allergenen, MEP, offline, dubbele recepten | – |
| blog/oude-kladjes-digitaliseren | 539 | uien | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/receptbeheer-in-de-horeca | 559 | brigade | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/recepten-app-kiezen-restaurant | 562 | eend-vuur | allergenen, dubbele recepten, Savour leert | – |
| blog/recepten-delen-met-je-team | 524 | uien | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/recepten-opschalen-zonder-fouten | 526 | brigade | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/recepten-organiseren-in-de-keuken | 499 | ingredienten-keuken | MEP, offline, Savour leert | – |
| blog/recepten-zonder-wifi | 549 | ingredienten-keuken | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/receptenboek-met-eigen-logo | 541 | uien | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/receptendatabase-in-de-cloud | 534 | eend-vuur | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/receptenmap-laten-overzetten | 667 | ingredienten-keuken | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/receptenmappen-indelen-voorbeelden | 506 | wortels | allergenen, MEP, offline, Savour leert | – |
| blog/roadmap | 476 | ingredienten-keuken | MEP, dubbele recepten, Savour leert | – |
| blog/rommelige-receptenmap-ordenen | 612 | brigade | allergenen, MEP, offline, Savour leert | – |
| blog/savour-community | 661 | ingredienten-hout | allergenen, MEP, offline, dubbele recepten, Savour leert | – |
| blog/savour-paprika-meez-galley-vergelijken | 1167 | uien | MEP, dubbele recepten, Savour leert | – |
| blog/savour-voor-bartenders | 848 | bar-negroni | offline, dubbele recepten, Savour leert | bar |
| blog/savour-voor-cateraars | 619 | catering-blog | dubbele recepten, Savour leert | catering |
| blog/savour-voor-patissiers-en-banketbakkers | 639 | patisserie-viennoiserie | offline, dubbele recepten, Savour leert | patisserie |
| blog/sous-vide-temperaturen-en-tijden | 1269 | wortels | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/standaardrecepturen-in-de-keuken | 535 | wortels | allergenen, MEP, dubbele recepten, Savour leert | – |
| blog/van-word-naar-receptenboek | 532 | ingredienten-hout | allergenen, MEP, offline, dubbele recepten, Savour leert | – |

## 5. Voorstel voor de volgorde (elk deel los naar savour-3, en daarna jouw akkoord voor live)

1. **Fouten F1 t/m F5** en de release notes (klein, snel live).
2. **Functie- en voor-wiepagina's** (Digitaliseren, Organiseren, Database, Delen, Opschalen, Printen, Allergenen,
   MEP-lijsten, Import service, Binnenkort, Koks, Keukenbrigades), met echte schermen waar ze helpen.
3. **Homepage, Over, Prijzen, FAQ, App, Contact.**
4. **Handleiding** (alle hoofdstukken naast de app leggen).
5. **Blogs** in twee rondes: eerst de blogs over Savour zelf, daarna de vakblogs licht (zie K3).
6. **Vindbaarheid** (`llms.txt`, schema.org, titels en beschrijvingen) en, als de beelden er zijn, de foto's.
