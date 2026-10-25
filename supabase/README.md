# Database (Supabase)

Elk bestand hier is een wijziging aan de database. Uitvoeren: Supabase-dashboard → SQL Editor → het hele
bestand plakken → Run. Altijd in deze volgorde (op datum); elk bestand is veilig om nog eens uit te voeren.

| Bestand | Wat het doet |
| --- | --- |
| 2026-10-20-beveiliging.sql | Beveiligingsregels (RLS) voor recepten, mappen en gedeelde mappen |
| 2026-10-20-samenwerken.sql | Rollen in gedeelde mappen: eigenaar, bewerker, lezer |
| 2026-10-21-categorie-trefwoorden.sql | Trefwoorden per categorie (automatisch indelen) |
| 2026-10-21-savour-pro.sql | Abonnementen (Stripe) en de AI-teller per maand |
| 2026-10-21-teamlid-op-email.sql | Iemand aan een gedeelde map toevoegen op e-mailadres |
| 2026-10-22-gratis-pro-teams.sql | Gratis, Pro en teams: wie Pro is, de 100-receptengrens, teamplekken |
| 2026-10-23-bezoekers-platform.sql | Bezoekersgrafiek in /admin: platform per bezoek |
| 2026-10-23-origineel-kladje.sql | Het originele kladje apart bewaren bij een recept |
| 2026-10-23-proef-7-dagen.sql | Proefperiode van 7 dagen, ook dan tot 100 recepten |
| 2026-10-24-logo-op-prints.sql | Logo van je restaurant op prints (Pro en teams) |
| 2026-10-25-foutenlogboek.sql | Foutenlogboek: fouten uit de app, te zien in /admin onder Fouten |

Werkt de app als een bestand nog niet is uitgevoerd? Ja: Savour valt dan terug op het oude gedrag (bijvoorbeeld
printen zonder logo, of het kladje als receptfoto). Pas na het uitvoeren werkt het nieuwe onderdeel.

Nieuw bestand toevoegen: `JJJJ-MM-DD-korte-naam.sql`, bovenaan in gewone taal waarom, en voeg een regel toe in
deze tabel.
