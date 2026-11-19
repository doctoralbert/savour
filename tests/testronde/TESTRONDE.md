# Vaste testronde van Savour

Een vaste ronde om Savour na grotere wijzigingen te testen zoals een nieuwe kok het gebruikt, steeds met dezelfde
bestanden en dezelfde verwachte uitkomst. Eerste ronde: 17 november 2026 (rapport en plan in fase 1 t/m 4).
Tweede ronde: na de MEP-lijsten (18 november 2026), met de MEP-bestanden 9 en 10 erbij.

## Testbestanden (zelf verzonnen, nooit recepten of lijsten van gebruikers)

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
| `9-mep-garde.xlsx`                          | MEP-lijst uit Excel           | zie hieronder                                                                                  |
| `10-mep-patisserie.txt`                     | MEP-lijst plakken             | zie hieronder                                                                                  |

Een link naar een openbare receptenwebsite hoort er ook bij (bijv. een pannenkoekenrecept): één recept, kop "Recept controleren".

**`9-mep-garde.xlsx`** (Tools → MEP-lijsten → Importeren), in het controlescherm:

- naam "MEP Garde"; 2 kaarten: "À la carte" (door Savour toegevoegd, met uitleg) en "banqueting"
- kopjes: "Voor 1 · Bietentartaar", "Voor 2 · Makreel", "Hoofd", "Voor · Zalm", "Hoofd · Kip" (5 kopjes, 16 onderdelen)
- "biet tartaar" 60 g met opmerking "met sjalot en kappertjes" (uit de kolom ernaast); "rogge krokant" 2 st
- geel om na te kijken (3): "radijs 3" (getal zonder eenheid), "aubergine" 80 g (ongeveer), "Brood uit vriezer"
  (kopje of onderdeel?), en geen andere
- "kippendij" 1 stuk, "pommes fondant" 2 st, "Lamsrug" 120 g

**`10-mep-patisserie.txt`** (plakken): naam "MEP Patisserie"; kaarten "À la carte" en "Banqueting"; kopjes
"Dessert 1 · Appel", "Friandises", "Dessert"; 7 onderdelen; "calvados saus" met opmerking "warm houden"; "macaron" 2 st.

Opnieuw maken: `py -3 tests/testronde/maak-testrecepten.py` (Pillow nodig) en `py -3 tests/testronde/maak-mep-test.py`.

## Opdracht voor Claude

Kopieer dit naar Claude om de ronde te laten doen:

> Doe de vaste testronde van Savour volgens tests/testronde/TESTRONDE.md. Test savour.page (of savour-3 als ik dat zeg)
> als iemand die Savour voor het eerst ziet: een chef die nog nooit van Savour heeft gehoord, met alleen de website en
> wat de app zelf uitlegt. Lees geen code om te snappen hoe iets werkt; probeer het, en noteer waar je twijfelt.
> Werk analytisch: bij elke stap wat je verwachtte, wat je zag, en of dat klopt. Neem geen enkel scherm voor waar aan.
>
> Werkwijze: open eerst savour.page/?intern (testaccounts tellen dan niet mee). Gebruik de twee testaccounts die ik je
> geef; het wachtwoord vul ik zelf in, jij typt nooit een wachtwoord. Verander tijdens het testen geen code en niets
> aan echte accounts. AI-import hooguit 3 keer (kost geld). Werk snel: bundel stappen, en kijk met tekst en maten
> (read_page, get_page_text, afmetingen) waar een schermafbeelding niets toevoegt.
>
> Loop alles af, in deze volgorde:
>
> 1. Eerste indruk: homepage (5 talen), prijzen en Pro-pagina tot vlak vóór betalen, demo (ook /demo), FAQ,
>    handleiding, blog, contact. Snap je binnen een minuut wat Savour is en voor wie? Klopt elke belofte met wat de app doet?
> 2. Account: nieuw account aanmaken tot aan de bevestigingsmail (niet afmaken als het niet hoeft), inloggen,
>    uitloggen, wachtwoord vergeten, eerste keer na inloggen, proefweek en wat er bij Pro staat.
> 3. Recepten: alle testbestanden 1 t/m 8 importeren en per bestand vergelijken met de verwachte uitkomst hierboven;
>    recept bekijken, bewerken, omrekenen, kookmodus, printen (PDF), delen met een link, favorieten, mappen, categorieën,
>    zoeken, allergenen en de hele Savour-lijst, opschonen.
> 4. Keukenteam: maken met account 1, account 2 uitnodigen als sous-chef, wat ziet en mag dat lid (met en zonder Pro);
>    recepten toevoegen, mappen, printen, team verlaten, wat er gebeurt als het team op slot gaat.
> 5. MEP-lijsten (nieuw, extra grondig): Tools → MEP-lijsten. Lege staat; een lijst maken (eigen en voor het team);
>    bewerken (kaarten, kopjes, onderdelen, portie, opmerking, recept koppelen, volgorde, verplaatsen en kopiëren naar
>    een andere kaart, archiveren, verwijderen); importeren met 9-mep-garde.xlsx en 10-mep-patisserie.txt en vergelijken
>    met de verwachte uitkomst hierboven; de Lijst: couverts per kaart en de uitgerekende hoeveelheden narekenen,
>    afvinken, "Alleen wat nog moet", ⋯ Lijst leegmaken, kookmodus; printen staand en liggend (als PDF, één A4, geen
>    datum of couverts, logo als dat er is); het blok MEP-lijsten op het keukenteam-scherm; live meekijken: account 1
>    en 2 tegelijk open op dezelfde teamlijst, vink af bij de één en kijk of de ander het binnen enkele seconden ziet,
>    met naam en tijd; zonder internet afvinken en daarna weer verbinden; wat een lid zonder Pro mag (afvinken en
>    printen wel, maken en bewerken niet); de demo-lijsten; hulp (i-knop) en de handleidingpagina.
> 6. Overal: telefoon (375), tablet (768) en computer (1280 en 1440); donker en licht thema; steekproeven in EN, DE, ES
>    en FR (staat er nergens Nederlands of een half vertaalde zin?); toetsenbord en schermlezer-labels waar het telt;
>    console-fouten; laadtijd; lege staten en foutmeldingen (geen internet, verkeerd bestand, te groot bestand).
> 7. Content op alle publieke pagina's: lees en beoordeel elke pagina die een bezoeker kan vinden (homepage, Savour
>    Pro en prijzen, FAQ, over Savour, handleiding met alle hoofdstukken, blog met alle artikelen, vergelijkingen zoals
>    "Alternatief voor Paprika", contact, voorwaarden en privacy), in het Nederlands en steekproefsgewijs in EN, DE, ES
>    en FR. Per pagina: klopt elke bewering met wat de app echt doet (prijzen, grenzen, Pro, AI-import, keukenteams,
>    MEP-lijsten)? Is het duidelijk, kort en in de taal van een chef? Spelling en grammatica, dubbele of tegenstrijdige
>    informatie, verouderde teksten, dode links, ontbrekende of foute vertalingen, titels en beschrijvingen voor
>    zoekmachines, afbeeldingen en alt-teksten. Geen verzonnen cijfers of beloftes.
> 8. Beheer: /admin met mijn account kan ik zelf openen; kijk alleen of de nieuwe dingen kloppen als ik dat vraag.
>
> Lever daarna:
>
> - **Review van het geheel**, elk met een score tot 100 punten en een korte onderbouwing (sterk / zwak / wat het
>   hoger maakt): **concept** (is het idee helder, past het bij chefs en keukenteams, onderscheidend t.o.v. alternatieven,
>   klopt het verdienmodel), **vormgeving** (huisstijl, rust, leesbaarheid, consistentie, licht en donker, telefoon
>   tot groot scherm), **functionaliteit** (werkt alles, betrouwbaar, snel in de keuken, samenwerken) en **content**
>   (publieke pagina's, teksten in de app, vertalingen). Daarnaast een totaalscore tot 100.
> - Per onderdeel (stap 1 t/m 7) een cijfer (1-10) voor gemak, layout, design en functie, met één zin waarom.
> - Een tabel met alle problemen (ernst: blokkerend/hoog/middel/laag, waar, wat je deed, wat je verwachtte, wat je
>   zag, voorstel), en een aparte tabel voor content (pagina, taal, wat er staat, wat er beter kan).
> - Wat goed werkt, en wat een nieuwe chef zou missen of niet zou snappen.
> - Een plan in fases: eerst wat kapot of onbetrouwbaar is, dan wat verwarrend is, dan content, dan verfraaiing.
>   Wacht met bouwen tot ik "start met fase 1" zeg.

## Testaccounts

Twee testaccounts (eigenaar en teamlid); de gegevens staan niet in de repository. Testaccounts zijn geen echte
klanten: ze tellen niet mee in de bezoekerscijfers (open eerst savour.page/?intern).
