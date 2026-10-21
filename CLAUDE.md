# Savour — werkafspraken voor Claude

Savour is een receptbeheer-app voor professionele koks (Nederlands). Lees eerst `README.md` voor de structuur.

## Kernwaardes (van de eigenaar, bepalen elke ontwerpkeuze)

1. **Betrouwbaar**: een recept staat er precies zoals de kok het bedoelde. De AI verzint nooit hoeveelheden,
   ingrediënten of stappen; bij twijfel `needs_review`. Geen stille datawijzigingen zonder dat de gebruiker het ziet.
2. **Georganiseerd en overzichtelijk**: rustige, duidelijke schermen; snel het juiste recept vinden.
3. **Op elk apparaat**: laptop/desktop (importeren, beheren, printen) én telefoon/tablet in de keuken zijn even belangrijk.
4. **Snel in de keuken**: weinig klikken, grote leesbare tekst bij het raadplegen.
5. **Samenwerken**: gedeelde mappen met rollen owner (beheert), editor (voegt toe en bewerkt) en viewer (bekijkt).
6. **Premium uitstraling**: standaard donker met goud (#e8ca8d), Playfair Display voor koppen. Een licht thema is optioneel (Instellingen); lichte varianten staan onderaan `css/components.css` onder `body.savour-light`. Controleer nieuwe schermen in beide thema's.

Verdienmodel: gratis basis + Savour Pro (€2,99 p/m of €29 p/j, via Stripe) + teams (5/10/25 plekken,
€8,99/€14,99/€29,99 p/m). Gratis = tot 100 recepten, Savour-lezer, lid van gedeelde mappen. Pro = onbeperkt
recepten, zelf gedeelde mappen maken, AI-import (max. 500 per maand). Nieuwe accounts: 7 dagen Pro gratis, maar ook dan tot 100 recepten
(`supabase/2026-10-23-proef-7-dagen.sql`: savour_paid_pro voor onbeperkt bewaren).
Wie stopt met Pro houdt altijd alles; alleen toevoegen boven de grens kan niet. Regels in de database:
`supabase/2026-10-22-gratis-pro-teams.sql` (savour_is_pro, savour_my_plan). Beheer: /admin (api/admin.js). Importeren gaat altijd eerst via de eigen lezer
(`js/features/recipe-reader.js`, test: `npm run test:lezer`); alleen bij twijfel en met Pro naar de AI.
De server (`api/ai-import.js`) controleert Pro en de limiet. Instellen: `docs/savour-pro-instellen.md`.

## Technische afspraken

- Geen build-stap: gewone `<script>`-bestanden die globale functies delen. De laadvolgorde staat in `index.html`;
  `js/main.js` als laatste. Topniveau-code die iets uitvoert hoort in `main.js`, niet in feature-bestanden.
- **Nooit een bestaande functie overschrijven** met een nieuwe laag (`window.x = function` of `const old = x`).
  Pas de functie aan waar hij staat. Elke functienaam bestaat precies één keer.
- Escaping: `esc()` voor HTML-tekst en attributen, `escJs()` voor tekst in `onclick="fn('...')"`.
- Geen `confirm()`/`prompt()`: gebruik `askConfirm()` en `askText()` uit `js/core/dialog.js` (werken ook in ingebouwde browsers).
- Foto's altijd via `compressPhoto()` voordat ze worden opgeslagen of naar de AI gaan.
- Rechten in de interface (`canEditShared` e.d.) zijn alleen gemak; de echte beveiliging moet in Supabase RLS zitten.
- API-routes in `api/` controleren het Supabase-token via `api/_lib/auth.js` als ze iets kosten of gegevens raken.
- Teksten in de interface en code-commentaar zijn Nederlands. De app is ook in het Engels, Duits en Spaans
  (taalknop bovenin, `js/core/i18n.js`). Nieuwe interfacetekst? Voeg een regel toe in `tools/vertalingen.mjs`
  en draai `node tools/build-i18n.mjs`. Recepten en namen van gebruikers worden nooit vertaald.
- Savour verwijdert nooit zelf gegevens zonder dat de gebruiker daarom vraagt (zie `js/data/duplicates.js`).
- Links uit e-mails (bevestigen, wachtwoord herstellen) worden afgehandeld in `readAuthRedirect`/`handleAuthRedirect` (`js/features/auth.js`).

## Werkwijze bij elke wijziging

1. `npm start` en de regressietest draaien vóór je begint (zie README).
2. Wijziging maken, `npm run format`.
3. Regressietest opnieuw: onverwachte verschillen eerst verklaren. Bedoelde verschillen: `tests/expected.json` bijwerken.
4. Kleine, duidelijke Git-commit met Nederlandse uitleg van het waarom.
