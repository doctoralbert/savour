# Zoekmachines volgen (Google en Bing)

Savour haalt elke nacht de cijfers van Google Search Console en Bing Webmaster Tools op en bewaart ze
(`api/_lib/zoekmachines.js`, tabellen uit `supabase/2026-11-23-zoekmachines.sql`). Je ziet ze in
**/admin → Zoekmachines**: een grafiek per dag (of per week bij lange periodes), een keuze per land, de belangrijkste
cijfers tegen de periode ervoor, en zoektermen en pagina's. Onder elk dagrapport per mail staat een korte trend.

Bing geeft geen cijfers per land; met een land gekozen toont het scherm alleen Google.

## Eenmalig instellen

### 1. Tabellen aanmaken
Voer `supabase/2026-11-23-zoekmachines.sql` uit in de SQL-editor van Supabase.

### 2. Google Search Console koppelen
Dit gebruikt dezelfde Google-app als AdSense; je hoeft geen sleutel te plakken.

Menunamen in het Engels, zoals Google Cloud ze toont.

1. Ga naar console.cloud.google.com en kies bovenin (naast het Google Cloud-logo) het project van de AdSense-koppeling.
2. Menu ☰ → **APIs & Services → Library**: zoek "Google Search Console API", open hem en klik **Enable**.
3. Menu ☰ → **APIs & Services → OAuth consent screen**. Daar opent **Google Auth Platform**; kies links
   **Data Access** → **Add or remove scopes**. Zoek `webmasters.readonly`
   (`https://www.googleapis.com/auth/webmasters.readonly`, "View Search Console data for your verified sites"),
   vink hem aan → **Update** → onderaan **Save**.
   Zie je hem niet in de lijst? Plak het volledige adres in het vak **Manually add scopes** → **Add to table** → **Update**.
4. Links **Audience**: staat **Publishing status** op **Testing**, klik **Publish app** → **Confirm**
   (anders vervalt de koppeling na 7 dagen). Bij het koppelen zegt Google dan mogelijk "Google hasn't verified this app":
   klik **Advanced** → **Go to … (unsafe)**; dat is je eigen app.
5. Open savour.page/admin → **Zoekmachines** → **Koppel Search Console**, log in met het Google-account dat
   eigenaar is van savour.page in Search Console en klik **Continue** / **Allow**.
6. Savour haalt meteen de hele geschiedenis op die Google bewaart (16 maanden; zoektermen en pagina's 90 dagen).

### 3. Bing Webmaster Tools
1. Ga naar bing.com/webmasters, kies savour.page, klik rechtsboven op het tandwiel **Settings** → **API Access** →
   **API Key** → **Generate API Key** en kopieer de sleutel.
2. Vercel → project savour → **Settings → Environment Variables** → **Add New**: Key `BING_WEBMASTER_KEY`, Value de
   sleutel, Environments **Production** en **Preview** → **Save**. Daarna **Deployments** → bij de bovenste ⋯ →
   **Redeploy** (of wacht op de volgende push).
3. In /admin → Zoekmachines: **Nu ophalen**.

Optioneel: staat de site in Bing onder een ander adres dan `https://savour.page/`, zet dat adres dan in
`BING_SITE_URL`.

## Goed om te weten
- Google loopt twee à drie dagen achter; de laatste dagen worden elke nacht opnieuw opgehaald en aangevuld.
- Bing geeft klikken en vertoningen per dag, en zoektermen en pagina's per week. De positie bij Bing staat erbij
  zoals Bing hem doorgeeft; controleer na de eerste keer of die overeenkomt met wat Bing Webmaster Tools zelf toont.
- Nulmeting om mee te vergelijken: `docs/seo-nulmeting-2026-11-23.md`.
