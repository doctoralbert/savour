# Vaste testronde van Savour

Een vaste ronde om Savour na grotere wijzigingen te testen zoals een nieuwe kok het gebruikt, steeds met dezelfde
bestanden en dezelfde verwachte uitkomst. Eerste ronde: 17 november 2026 (rapport en plan in fase 1 t/m 4).

## Testbestanden (zelf verzonnen, nooit recepten van gebruikers)

| Bestand                                     | Soort                         | Verwacht resultaat                                                                             |
| ------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `1-kladje-handgeschreven.jpg`               | foto, handschrift (AI)        | Pommes Duchesse, 4 ingrediënten, 5 stappen, niets verzonnen                                    |
| `2-gedrukt-recept.jpg`                      | foto, gedrukt (AI)            | Gepocheerde peer in rode wijn, 7 ingrediënten, 5 stappen                                       |
| `3a-twee-fotos-deel1.jpg` + `3b-…deel2.jpg` | recept over twee foto's (AI)  | één recept Kalfsjus, 9 ingrediënten, 5 stappen                                                 |
| `4-recept.pdf`                              | PDF met tekst                 | Crème brûlée met tonkabonen, opbrengst "Voor 8 personen", 6 ingrediënten, 5 stappen            |
| `5-recepten.docx`                           | Word met Kop 1/Kop 2          | twee recepten: Sauce hollandaise en Vinaigrette, met hun eigen naam                            |
| `6-platte-tekst.txt`                        | tekst plakken                 | Risotto met paddenstoelen, 4 personen, 7 ingrediënten, 5 stappen, categorie zonder extra vraag |
| `7-chatgpt-markdown.txt`                    | ChatGPT-opmaak                | 8 losse ingrediënten zonder komma's (ook "zout" en "nootmuskaat" los)                          |
| `8-allergeenletters.txt`                    | Oostenrijks, allergeenletters | opbrengst "4 Portionen", letters weg met melding "Letters laten staan"                         |

Een link naar een openbare receptenwebsite hoort er ook bij (bijv. een pannenkoekenrecept): één recept, kop "Recept controleren".

Opnieuw maken: `py -3 tests/testronde/maak-testrecepten.py` (Pillow nodig).

## Opdracht voor Claude

Kopieer dit naar Claude om de ronde te laten doen:

> Doe de vaste testronde van Savour volgens tests/testronde/TESTRONDE.md: test savour.page (of savour-3 als ik dat zeg) als
> een nieuwe gebruiker, met de testaccounts die ik je geef (het wachtwoord vul ik zelf in). Open eerst savour.page/?intern.
> Loop af: homepage, prijzen en demo; account en eerste keer; alle testbestanden importeren en vergelijken met de
> verwachte uitkomst hierboven; recept bekijken, omrekenen, kookmodus; allergenen en de hele Savour-lijst; keukenteam
> maken, de tweede testaccount uitnodigen als sous-chef en kijken wat dat lid ziet; Pro-pagina tot vlak vóór betalen;
> telefoon (375), tablet (768) en computer (1280/1440), donker en licht thema, en steekproeven in EN, DE, ES en FR.
> Verander tijdens het testen geen code. Geef daarna per onderdeel cijfers (gemak, layout, design, functie), een
> tabel met problemen (ernst, waar, wat, voorstel), wat goed werkt, en een plan in fases. AI-import hooguit 3 keer.

## Testaccounts

Twee testaccounts (eigenaar en teamlid); de gegevens staan niet in de repository. Testaccounts zijn geen echte
klanten: ze tellen niet mee in de bezoekerscijfers (open eerst savour.page/?intern).
