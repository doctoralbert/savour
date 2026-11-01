# Database (Supabase)

Elk bestand hier is een wijziging aan de database. Uitvoeren: Supabase-dashboard → SQL Editor → het hele
bestand plakken → Run. Altijd in deze volgorde (op datum); elk bestand is veilig om nog eens uit te voeren.

| Bestand | Wat het doet |
| --- | --- |
| 2026-10-20-beveiliging.sql | Beveiligingsregels (RLS) voor recepten, mappen en keukenteams |
| 2026-10-20-samenwerken.sql | Rollen in keukenteams: eigenaar, bewerker, lezer |
| 2026-10-21-categorie-trefwoorden.sql | Trefwoorden per categorie (automatisch indelen) |
| 2026-10-21-savour-pro.sql | Abonnementen (Stripe) en de AI-teller per maand |
| 2026-10-21-teamlid-op-email.sql | Iemand aan een keukenteam toevoegen op e-mailadres |
| 2026-10-22-gratis-pro-teams.sql | Gratis, Pro en teams: wie Pro is, de 100-receptengrens, teamplekken |
| 2026-10-23-bezoekers-platform.sql | Bezoekersgrafiek in /admin: platform per bezoek |
| 2026-10-23-origineel-kladje.sql | Het originele kladje apart bewaren bij een recept |
| 2026-10-23-proef-7-dagen.sql | Proefperiode van 7 dagen, ook dan tot 100 recepten |
| 2026-10-24-logo-op-prints.sql | Logo van je restaurant op prints (Pro en teams) |
| 2026-10-25-foutenlogboek.sql | Foutenlogboek: fouten uit de app, te zien in /admin onder Fouten |
| 2026-10-25-berichten.sql | Berichten via het contactformulier, te zien in /admin |
| 2026-10-25-mappen-beheren.sql | Mappen in een keukenteam ordenen en archiveren |
| 2026-10-25-recept-overnemen.sql | Een recept uit een keukenteam overnemen |
| 2026-10-25-recepten-verwijderen.sql | Meerdere eigen recepten in één keer verwijderen |
| 2026-10-26-openbare-links.sql | Openbare receptlinks met een tijdslimiet |
| 2026-10-26-overnemen-afschermen.sql | Overnemen van recepten per keukenteam afschermen |
| 2026-10-27-aanleveringen.sql | Recepten laten inladen: aanvragen en bestanden |
| 2026-10-27-land.sql | Land bij bezoekers |
| 2026-10-27-uitnodigen-alleen-eigenaar.sql | Alleen de eigenaar nodigt mensen uit |
| 2026-10-28-gestopt-is-gestopt.sql | Een gestopt abonnement geeft geen Pro meer |
| 2026-10-28-keukenteams.sql | Recepten horen bij het keukenteam |
| 2026-10-29-net-bijgewerkt.sql | "Net bijgewerkt" op de startpagina van een keukenteam |
| 2026-11-01-admin-settings.sql | Instellingen die alleen de server kan lezen (AdSense, financiën) |
| 2026-11-01-inlogtellingen.sql | Hoe vaak elk account is ingelogd, in /admin |
| 2026-11-01-notities-koppelingen.sql | Notities en koppelingen tussen recepten |
| 2026-11-01-opschonen.sql | Interne functies niet meer van buitenaf aan te roepen; werking blijft gelijk |

Werkt de app als een bestand nog niet is uitgevoerd? Ja: Savour valt dan terug op het oude gedrag (bijvoorbeeld
printen zonder logo, of het kladje als receptfoto). Pas na het uitvoeren werkt het nieuwe onderdeel.

Nieuw bestand toevoegen: `JJJJ-MM-DD-korte-naam.sql`, bovenaan in gewone taal waarom, en voeg een regel toe in
deze tabel.
