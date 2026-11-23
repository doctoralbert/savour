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

1. Ga naar console.cloud.google.com, kies het project van de AdSense-koppeling.
2. **API's en services → Bibliotheek**: zoek "Google Search Console API" en klik **Inschakelen**.
3. **OAuth-toestemmingsscherm → Gegevenstoegang (Scopes)**: voeg `.../auth/webmasters.readonly` toe en sla op.
   (Staat de app op "Testen", dan vervalt de koppeling na 7 dagen. Zet hem op "In productie" om dat te voorkomen;
   als enige gebruiker kun je de waarschuwing "Google heeft deze app niet geverifieerd" gewoon doorklikken.)
4. Open savour.page/admin → **Zoekmachines** → **Koppel Search Console**, log in met het Google-account dat
   eigenaar is van savour.page in Search Console en geef toestemming.
5. Savour haalt meteen de hele geschiedenis op die Google bewaart (16 maanden; zoektermen en pagina's 90 dagen).

### 3. Bing Webmaster Tools
1. Ga naar bing.com/webmasters → **Instellingen** (tandwiel) → **API-toegang** → **API-sleutel** → maak een sleutel.
2. Zet die in Vercel → Project savour → Settings → Environment Variables als `BING_WEBMASTER_KEY`
   (Production en Preview), en deploy opnieuw (of wacht op de volgende push).
3. In /admin → Zoekmachines: **Nu ophalen**.

Optioneel: staat de site in Bing onder een ander adres dan `https://savour.page/`, zet dat adres dan in
`BING_SITE_URL`.

## Goed om te weten
- Google loopt twee à drie dagen achter; de laatste dagen worden elke nacht opnieuw opgehaald en aangevuld.
- Bing geeft klikken en vertoningen per dag, en zoektermen en pagina's per week. De positie bij Bing staat erbij
  zoals Bing hem doorgeeft; controleer na de eerste keer of die overeenkomt met wat Bing Webmaster Tools zelf toont.
- Nulmeting om mee te vergelijken: `docs/seo-nulmeting-2026-11-23.md`.
