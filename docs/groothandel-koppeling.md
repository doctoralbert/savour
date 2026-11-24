# Aanvraag groothandelskoppeling (Hanos, Sligro, Bidfood)

Opgesteld 24-11-2026. Waarom: de marktleiders (Apicbase, Exact Horeko) krijgen echte inkoopprijzen via een koppeling
met de groothandel, met de prijzen van die klant en met diens toestemming (zie `docs/onderzoek-foodcost.md`,
hoofdstuk 6). Hanos levert dit al aan Apicbase: de klant vraagt het aan bij zijn accountmanager, Hanos zet de
gegevensexport aan ([support.apicbase.com](https://support.apicbase.com/help/information-hanos-x-apicbase-integration)).
Savour vraagt hetzelfde.

Versturen aan: de eigen accountmanager (Hanos), en de afdeling partnerships of IT van Sligro en Bidfood.
De eigenaar verstuurt; Claude stuurt niets.

---

**Onderwerp:** Koppeling assortiment en klantprijzen met Savour (receptensoftware voor koks)

Beste [naam],

Ik ben chef en oprichter van Savour (savour.page), receptensoftware voor professionele keukens. Koks rekenen in Savour
de kostprijs van hun gerechten uit met hun eigen recepten en hun eigen inkoopprijzen. Nu laden zij daarvoor met de
hand een prijslijst in; dat willen we eenvoudiger maken voor uw klanten.

Wij vragen een koppeling zoals u die al heeft met andere keukensoftware (zoals Apicbase en Exact Horeko):

**Wat we graag ontvangen, per klant die daar toestemming voor geeft**
- artikelnummer, omschrijving, merk;
- verpakking en inhoud (bijv. "doos 6 × 1 kg", inhoud in gram, milliliter of stuks);
- de nettoprijs van die klant zonder btw, en of het een prijs per stuk of per kilo is;
- datum vanaf wanneer de prijs geldt;
- bij voorkeur alleen het assortiment dat de klant koopt (bijv. zijn bestellijsten of de laatste 3 maanden).

**Hoe**
- in welk formaat u gewend bent: API, EDI, of een CSV/Excel-bestand dat we dagelijks of wekelijks ophalen;
- alleen voor klanten die het zelf aanvragen; zij kunnen het op elk moment stoppen;
- Savour toont de prijzen alleen aan die klant zelf. We delen ze nooit met anderen en gebruiken ze niet voor
  vergelijkingen tussen groothandels.

**Wat het u oplevert**
Klanten zien in Savour precies wat uw artikelen in hun gerechten kosten. Dat maakt bestellen bij u logischer, en
bestellen vanuit Savour (bestellijsten, MEP) is een mogelijke volgende stap.

Kunnen we hierover kort bellen of afspreken? Ik ben zelf klant [bij Hanos: klantnummer ...] en kan de koppeling met
mijn eigen keuken testen.

Met vriendelijke groet,

[naam]
Savour, savour.page
[telefoon]

---

## Wat Savour bouwt zodra een groothandel ja zegt

- Ontvangen in hetzelfde formaat als "Prijslijst inladen" (artikelnummer, naam, verpakking, prijs), per klant
  gekoppeld aan zijn Savour-account, met het artikelnummer als vaste sleutel (zit er al in).
- Elke nieuwe prijs wordt een nieuwe regel (historie, zit er al in); de kok ziet welke gerechten duurder werden.
- Toestemming per klant, intrekbaar; de koppeling staat in Foodcost → Leveranciers.
