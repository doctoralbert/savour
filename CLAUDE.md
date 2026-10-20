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

Verdienmodel: gratis basis + betaald pro (nog niet gebouwd).

## Technische afspraken

- Geen build-stap: gewone `<script>`-bestanden die globale functies delen. De laadvolgorde staat in `index.html`;
  `js/main.js` als laatste. Topniveau-code die iets uitvoert hoort in `main.js`, niet in feature-bestanden.
- **Nooit een bestaande functie overschrijven** met een nieuwe laag (`window.x = function` of `const old = x`).
  Pas de functie aan waar hij staat. Elke functienaam bestaat precies één keer.
- Escaping: `esc()` voor HTML-tekst en attributen, `escJs()` voor tekst in `onclick="fn('...')"`.
- Foto's altijd via `compressPhoto()` voordat ze worden opgeslagen of naar de AI gaan.
- Rechten in de interface (`canEditShared` e.d.) zijn alleen gemak; de echte beveiliging moet in Supabase RLS zitten.
- API-routes in `api/` controleren het Supabase-token via `api/_lib/auth.js` als ze iets kosten of gegevens raken.
- Teksten in de interface en code-commentaar zijn Nederlands.
- Savour verwijdert nooit zelf gegevens zonder dat de gebruiker daarom vraagt (zie `js/data/duplicates.js`).
- Links uit e-mails (bevestigen, wachtwoord herstellen) worden afgehandeld in `readAuthRedirect`/`handleAuthRedirect` (`js/features/auth.js`).

## Werkwijze bij elke wijziging

1. `npm start` en de regressietest draaien vóór je begint (zie README).
2. Wijziging maken, `npm run format`.
3. Regressietest opnieuw: onverwachte verschillen eerst verklaren. Bedoelde verschillen: `tests/expected.json` bijwerken.
4. Kleine, duidelijke Git-commit met Nederlandse uitleg van het waarom.
