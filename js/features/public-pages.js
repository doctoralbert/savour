// Publieke pagina's (over, FAQ, voorwaarden, ...), gedeelde receptlinks, uitnodigingen en bugmeldingen.

const siteCopy = {
  nl: {
    aboutTitle: 'Over Savour',
    aboutLead: 'Savour is een professionele omgeving voor het beheren, organiseren en delen van recepten.',
    faqTitle: 'Veelgestelde vragen',
    termsTitle: 'Algemene voorwaarden',
    privacyTitle: 'Privacybeleid',
    termsNote: 'Laatst bijgewerkt: 21 oktober 2026.',
    privacyNote: 'Laatst bijgewerkt: 21 oktober 2026.',
    about: `<h2>Wat is Savour?</h2><p>Savour is ontwikkeld voor professionele keukens en keukenteams. Het doel is eenvoudig: recepten helder opslaan, terugvinden, organiseren en delen zonder onnodige informatie.</p><h2>Waarom Savour bestaat</h2><p>In bijna elke keuken liggen recepten verspreid: in een map op kantoor, op losse kladjes bij de pass, in Word-bestanden van een vorige chef en in berichten op telefoons. Wie een recept zoekt, vindt vaak drie versies met andere hoeveelheden. Savour is gemaakt door chefs die daar zelf dagelijks tegenaan lopen, met één doel: één plek waar elk recept staat zoals het bedoeld is.</p><h2>Recepten beheren</h2><p>Je kunt recepten zelf invoeren of bestaande recepten importeren. Je eigen receptenbibliotheek blijft centraal staan en recepten kunnen worden georganiseerd in persoonlijke mappen en keukenteams.</p><h2>Van kladje naar recept</h2><p>Bestaande recepten hoef je niet over te typen. De Savour-lezer haalt recepten uit Word-, PDF- en tekstbestanden, ook als er honderden in één document staan. Met Savour Pro leest de AI daarnaast foto's van handgeschreven kladjes en gescande pagina's. Savour verzint nooit hoeveelheden of stappen: wat onzeker is, wordt gemarkeerd zodat je het controleert voordat het wordt opgeslagen.</p><h2>Op elk apparaat</h2><p>Op kantoor organiseer je je recepten op de computer, in de keuken gebruik je dezelfde bibliotheek op je telefoon of tablet. Recepten omrekenen naar een andere opbrengst, een kookweergave met grote letters en printen voor de receptkaart zitten er standaard in.</p><h2>Voor professionals</h2><p>Savour is ontworpen vanuit de dagelijkse praktijk van chefs en professionele keukens. De interface legt de nadruk op receptuur, organisatie en samenwerking.</p><h2>Door chefs, voor chefs</h2><p>Savour wordt gemaakt door chefs, voor chefs. We weten uit eigen ervaring waar het in de keuken misgaat: zoekgeraakte recepten, verschillende versies en uren overtypen. Savour is gebouwd omdat we zelf een plek wilden die dat oplost, en die we zelf elke dag gebruiken. Vragen, ideeën of feedback zijn altijd welkom via de contactpagina.</p>`,
    faq: `<h2>Hoe voeg ik een recept toe?</h2><p>Ga naar <strong>Recept toevoegen</strong>. Je kunt een recept zelf invoeren of een bron importeren. Na import controleer je de herkende gegevens voordat je ze opslaat.</p><h2>Waar worden mijn recepten opgeslagen?</h2><p>Je persoonlijke recepten horen bij je eigen account. Een recept dat je uit een map verwijdert, wordt daarmee niet automatisch uit je persoonlijke bibliotheek verwijderd.</p><h2>Kan ik recepten delen?</h2><p>Ja. Met een keukenteam kun je recepten met andere gebruikers delen en, afhankelijk van de ingestelde rechten, samenwerken.</p><h2>Kan ik mijn mappen aanpassen?</h2><p>Ja. Je kunt persoonlijke recepten mappen aanmaken, hernoemen en verwijderen. In <strong>Recepten mappen bijwerken</strong> bepaal je welke mappen in het menu verschijnen en in welke volgorde.</p><h2>Hoe werkt importeren?</h2><p>Je kunt verschillende bronbestanden en tekst gebruiken. Geïmporteerde recepten moeten altijd vóór het opslaan worden gecontroleerd.</p>`,
    terms: `<h2>1. Gebruik van Savour</h2><p>Savour is een dienst voor het beheren, organiseren en delen van recepten. Je gebruikt de dienst op eigen verantwoordelijkheid en bent verantwoordelijk voor de inhoud die je toevoegt.</p><h2>2. Account</h2><p>Voor bepaalde functies is een account nodig. Je bent verantwoordelijk voor het vertrouwelijk houden van je inloggegevens en voor de activiteiten die via je account plaatsvinden.</p><h2>3. Receptinhoud</h2><p>Je behoudt de rechten op de recepten en andere inhoud die je zelf aan Savour toevoegt, voor zover die rechten bij jou liggen. Je geeft Savour alleen de toestemming die nodig is om de dienst te leveren.</p><h2>4. Import en AI</h2><p>Automatische verwerking kan fouten bevatten. Controleer geïmporteerde of automatisch gestructureerde recepten voordat je ze professioneel gebruikt. Savour garandeert niet dat automatisch herkende inhoud volledig of foutloos is.</p><h2>5. Beschikbaarheid</h2><p>Savour kan worden gewijzigd, onderhouden of tijdelijk niet beschikbaar zijn. We streven naar een betrouwbare dienst, maar kunnen geen ononderbroken beschikbaarheid garanderen.</p><h2>6. Beëindiging</h2><p>Je kunt je account beëindigen via de beschikbare accountfunctie. Gegevens die volgens de wet moeten worden bewaard, vallen onder de toepasselijke bewaarplichten.</p><h2>7. Wijzigingen</h2><p>Deze voorwaarden kunnen worden aangepast wanneer Savour of de toepasselijke regelgeving verandert.</p>`,
    guideTitle: 'Gids: werken met recepten',
    guideLead: 'Praktische tips voor recepten die in elke dienst hetzelfde uitpakken.',
    guide: `<h2>Een recept dat iedereen hetzelfde maakt</h2><p>Een goed keukenrecept laat geen ruimte voor interpretatie. Begin met een duidelijke naam en de opbrengst: hoeveel liter, hoeveel stuks of voor hoeveel couverts. Zet daaronder alle ingrediënten in de volgorde waarin je ze gebruikt, met de hoeveelheid in gram of milliliter in plaats van in lepels of kopjes. Schrijf de bereiding in korte stappen, één handeling per stap.</p><p>Noteer altijd de kritische punten: temperaturen, tijden, de gewenste dikte of kleur en waar je op moet letten. "Inkoken tot een derde" of "kerntemperatuur 58 °C" voorkomt meer fouten dan een mooie beschrijving.</p><h2>Opschalen zonder fouten</h2><p>Opschalen doe je met een rekenfactor: de gewenste opbrengst gedeeld door de opbrengst van het basisrecept. Heb je een beurre blanc voor 1 liter en heb je 3,5 liter nodig, dan is de factor 3,5 en vermenigvuldig je elk ingrediënt met 3,5. Reken altijd in gewicht; dan is de uitkomst exact.</p><p>Niet alles schaalt een-op-een mee. Inkooktijden worden langer, omdat een grotere pan relatief minder verdampt. Zout, zuur en specerijen proef je bij grote hoeveelheden opnieuw af. Bij gebak verandert de baktijd als je een andere vorm of een volle oven gebruikt. Geleermiddelen zoals gelatine en agar reken je wel exact mee met de hoeveelheid vocht.</p><h2>Van kladje naar receptkaart</h2><p>Veel recepten beginnen als kladje bij de pass. Maak er zo snel mogelijk een vast recept van, zolang je nog weet wat je bedoelde. Fotografeer een handgeschreven recept bij goed licht, recht van boven en met de hele pagina in beeld. Controleer daarna vooral de getallen: een 3 en een 8 of een 1 en een 7 zijn op een vlekkerig kladje snel verwisseld.</p><h2>Organiseren: categorieën en mappen</h2><p>Gebruik categorieën voor wat een recept is, zoals sauzen, garnituren of patisserie, en mappen voor hoe je werkt, zoals de huidige kaart, een evenement of de koude keuken. Zo staat een recept in één categorie, maar kan het in meerdere mappen terugkomen. Houd namen kort en herkenbaar, zodat iedereen in het team het recept met één zoekwoord terugvindt.</p><h2>Samenwerken met je brigade</h2><p>Een keuken werkt het best met één bron voor elk recept. Deel recepten via een keukenteam in plaats van losse foto's of berichten. Geef de sous-chef rechten om recepten te bewerken en de rest van het team rechten om ze te bekijken. Pas je een recept aan, dan werkt iedereen meteen met de nieuwe versie, en raakt niemand een oude versie kwijt in een appgroep.</p><h2>Allergenen en vaste afspraken</h2><p>Zet bij elk recept onderdelen met allergenen duidelijk in de ingrediëntenlijst, ook als ze uit een ander basisrecept komen. Vermeld bij een samengesteld gerecht welke basisrecepten erin zitten, zodat je bij een vraag van een gast snel kunt nagaan wat er precies in zit.</p>`,
    proTitle: 'Savour Pro',
    proLead: 'Onbeperkt recepten, je eigen team en AI die je kladjes leest.',
    contactTitle: 'Contact',
    contactLead: 'Neem contact op met Savour.',
    contactTitle: 'Contact',
    contactLead: 'Neem contact op met Savour.',
    contactNote: '',
    contact: `<h2>Contact</h2><p>Voor vragen, feedback of zakelijke aanvragen kun je contact opnemen via <a href="mailto:contact@savour.page">contact@savour.page</a>.</p><p>We helpen je graag verder met vragen over Savour, accounts en professioneel receptbeheer.</p>`,
    privacy: `<h2>1. Welke gegevens</h2><p>Voor het gebruik van Savour kunnen onder meer accountgegevens, profielgegevens, recepten, mappen, favorieten en gegevens over gedeelde samenwerking worden verwerkt.</p><h2>2. Waarvoor gegevens worden gebruikt</h2><p>Gegevens worden gebruikt om je account te laten werken, recepten op te slaan en te tonen, functies voor mappen en delen te leveren en de veiligheid en werking van Savour te ondersteunen.</p><h2>3. Recepten en keukenteams</h2><p>Je persoonlijke recepten zijn bedoeld voor jouw account. Wanneer je een recept of map deelt, kunnen andere deelnemers de inhoud zien volgens de rechten en instellingen van die gedeelde functie.</p><h2>4. Automatische verwerking</h2><p>Wanneer je gebruikmaakt van import- of AI-functies, kan de aangeleverde inhoud worden verwerkt om er gestructureerde receptgegevens van te maken. Controleer de resultaten vóór gebruik.</p><h2>5. Bewaren en verwijderen</h2><p>Je kunt je account en beschikbare persoonlijke gegevens verwijderen via de accountfuncties. Bewaartermijnen kunnen afhangen van wettelijke verplichtingen en technische noodzaak.</p><h2>6. Jouw rechten</h2><p>Afhankelijk van de toepasselijke privacywetgeving kun je rechten hebben zoals inzage, correctie, verwijdering, beperking van verwerking en dataportabiliteit.</p><h2>7. Wie is verantwoordelijk</h2><p>Savour is een Nederlandse onderneming en verantwoordelijk voor de verwerking van je gegevens. Vragen over privacy of een verzoek om je gegevens in te zien, te wijzigen of te verwijderen stuur je naar <a href="mailto:contact@savour.page">contact@savour.page</a>. Savour maakt gebruik van de volgende verwerkers: Supabase (database en inloggen), Vercel (hosting van de website), Stripe (betalingen), OpenAI (AI-import, alleen voor Savour Pro), Resend (e-mail) en Google (advertenties). Met deze partijen zijn afspraken gemaakt over de bescherming van je gegevens; sommige verwerken gegevens ook buiten de Europese Unie, op basis van de standaardcontractbepalingen van de Europese Commissie.</p>`
  }
};

const bugFormCopy = {
  nl: {
    bugTitle: 'Bug doorgeven',
    bugLead: 'Zie je iets dat niet werkt zoals het hoort?',
    bugNote: 'Beschrijf het probleem zo duidelijk mogelijk. Je kunt ook een screenshot meesturen.',
    bug: `<h2>Help Savour beter te maken</h2><p>Gebruik dit formulier om een fout, vreemd gedrag of ander technisch probleem door te geven. Je melding wordt doorgestuurd naar <strong>contact@savour.page</strong>.</p><form id="bugReportForm" class="bug-form" onsubmit="submitBugReport(event)"><div class="formgrid"><div class="field"><label>Naam</label><input id="bugName" name="name" autocomplete="name" required></div><div class="field"><label>E-mail</label><input id="bugEmail" name="email" type="email" autocomplete="email" required></div><div class="field full"><label>Onderwerp</label><input id="bugSubject" name="subject" required></div><div class="field full"><label>Wat gaat er mis?</label><textarea id="bugMessage" name="message" required placeholder="Beschrijf wat je deed, wat je verwachtte en wat er gebeurde..."></textarea></div><div class="field full"><label>Screenshot</label><input id="bugScreenshot" name="screenshot" type="file" accept="image/png,image/jpeg,image/webp"><small class="muted">Optioneel · maximaal 3 MB.</small></div></div><div class="actions"><button class="btn gold" type="submit" id="bugSubmit">Bug versturen</button><span id="bugStatus" class="bug-status" aria-live="polite"></span></div></form>`
  }
};

Object.entries(bugFormCopy).forEach(([lang, c]) => Object.assign(siteCopy[lang], c));

// Aanvullende teksten voor de publieke pagina's.
siteCopy.nl.about +=
  '<h2>Een centrale plek voor de keuken</h2><p>Van losse notities en oude documenten tot gecontroleerde recepturen: Savour brengt informatie samen in een overzichtelijke werkomgeving. Je bepaalt zelf hoe je categorieën en mappen indeelt, zodat de structuur aansluit op jouw keuken.</p><h2>Samenwerken met een team</h2><p>Keukenteams maken het mogelijk om recepten gecontroleerd beschikbaar te stellen aan collega’s. Gebruik persoonlijke bibliotheken voor eigen werk en keukenteams voor samenwerking, overdracht en vaste werkafspraken.</p>';
siteCopy.nl.faq +=
  "<h2>Kan ik mijn eigen structuur bepalen?</h2><p>Ja. Categorieën, persoonlijke mappen en keukenteams zijn bedoeld om aan te sluiten op jouw manier van werken. Houd de bibliotheek compact en gebruik de detailpagina voor de volledige receptuur.</p><h2>Wat moet ik controleren bij AI-import?</h2><p>Controleer altijd titel, hoeveelheden, eenheden, opbrengst en bereidingsstappen voordat je een geïmporteerd recept in de professionele praktijk gebruikt.</p><h2>Wat kan ik gratis?</h2><p>Met een gratis account bewaar je tot 100 recepten, importeer je Word, PDF en tekst met de Savour-lezer en ben je lid van de keukenteams van anderen. Nieuwe accounts proberen daarnaast 7 dagen Savour Pro gratis, zonder betaalgegevens; ook dan bewaar je tot 100 recepten.</p><h2>Wat krijg ik met Savour Pro?</h2><p>Onbeperkt recepten, zelf keukenteams maken en je team uitnodigen, en AI-import van foto's, handgeschreven en gescande recepten. Voor een hele keuken is er een brigade-abonnement: hoe groter de brigade, hoe lager de prijs per persoon.</p><h2>Hoe krijgen mijn teamleden Pro?</h2><p>Je voegt ze toe via Mijn brigade in het menu, of op je telefoon via Mijn account → Abonnement. Ze krijgen een uitnodiging per mail en hebben Savour Pro zodra ze inloggen of zich aanmelden met precies dat e-mailadres. Jij telt zelf als eerste plek mee.</p><h2>Wat gebeurt er met mijn recepten als ik stop met Pro?</h2><p>Die blijven allemaal staan, net als je keukenteams. Je kunt alleen geen nieuwe recepten boven de 100 toevoegen en geen nieuwe keukenteams maken.</p>";
siteCopy.nl.terms +=
  '<h2>8. Gratis account en Savour Pro</h2><p>Een gratis account bevat tot 100 recepten. Nieuwe accounts krijgen eenmalig 7 dagen Savour Pro zonder kosten, met ook dan maximaal 100 recepten; daarna gaat het account vanzelf terug naar gratis, zonder dat er iets wordt afgeschreven. Savour Pro is een betaald abonnement per maand of per jaar, voor één persoon of als brigade-abonnement met een vast aantal plekken, dat automatisch wordt verlengd tot je het opzegt. Opzeggen kan op elk moment via Mijn account; je houdt Savour Pro tot het einde van de betaalde periode. Na afloop blijven al je recepten en keukenteams bewaard. Savour Pro bevat maximaal 500 AI-imports per persoon per maand. Betalingen worden verwerkt door Stripe.</p>';
siteCopy.nl.terms +=
  '<h2>9. Over de aanbieder</h2><p>Savour is een Nederlandse onderneming. Je bereikt ons via contact@savour.page. Op deze voorwaarden is Nederlands recht van toepassing.</p>' +
  '<h2>10. Herroepingsrecht (bedenktijd)</h2><p>Sluit je als consument een abonnement op Savour Pro af, dan heb je 14 dagen bedenktijd. Binnen 14 dagen na je eerste betaling kun je zonder opgave van reden afzien van de aankoop. Stuur daarvoor een e-mail naar contact@savour.page met je naam en het e-mailadres van je account, of zeg op via Mijn account en meld erbij dat je gebruikmaakt van je herroepingsrecht.</p><p>Je krijgt het betaalde bedrag dan binnen 14 dagen na je melding volledig terug, via dezelfde betaalmethode waarmee je hebt betaald. Je account en recepten blijven gewoon bestaan; je gaat terug naar een gratis account. Na de bedenktijd kun je je abonnement altijd opzeggen tegen het einde van de lopende periode.</p>';
siteCopy.nl.privacy +=
  '<h2>8. Betalingen en AI</h2><p>Betalingen voor Savour Pro worden verwerkt door Stripe. Savour bewaart geen betaalgegevens zoals kaartnummers, alleen de status van je abonnement. Bij AI-import worden de bronnen die je aanlevert via OpenAI verwerkt om er receptgegevens van te maken.</p>' +
  '<h2>9. Cookies, lokale opslag en advertenties</h2><p>Savour gebruikt functionele opslag in je browser om de dienst te laten werken, bijvoorbeeld om je ingelogd te houden en je taal en weergave (licht of donker) te onthouden. Daarnaast tellen we bezoeken aan de website anoniem, met een willekeurige code in je browser, zodat we zien hoe vaak Savour wordt gebruikt. Daarvoor is geen toestemming nodig.</p><p>Op de openbare pagina\'s van Savour kunnen advertenties van Google AdSense worden getoond. Google en zijn partners gebruiken daarvoor cookies, onder meer om advertenties te tonen op basis van eerdere bezoeken aan deze en andere websites. Bezoekers uit de Europese Economische Ruimte, het Verenigd Koninkrijk en Zwitserland krijgen eerst een melding waarin ze toestemming kunnen geven of weigeren; zonder toestemming worden alleen niet-gepersonaliseerde advertenties getoond. Je kunt je keuze altijd wijzigen via de privacy-instellingen onderaan de pagina of gepersonaliseerde advertenties uitzetten via <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Advertentie-instellingen</a>. Meer over hoe Google gegevens gebruikt lees je op <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>' +
  '<h2>10. Wijzigingen</h2><p>Als Savour verandert, passen we dit privacybeleid aan. De datum bovenaan laat zien wanneer het voor het laatst is bijgewerkt. Bij belangrijke wijzigingen laten we het je weten.</p>';
siteCopy.nl.contact +=
  '<h2>Feedback en samenwerking</h2><p>Feedback over de interface, importkwaliteit, mappenstructuur en samenwerking helpt om Savour verder te ontwikkelen. Vermeld bij een melding bij voorkeur de pagina en de stappen waarmee het probleem ontstaat.</p>' +
  // Contactformulier: gaat via dezelfde route als "Bug doorgeven" (api/bug-report.js, kind: 'contact').
  '<h2>Stuur ons een bericht</h2><form id="contactForm" class="bug-form" onsubmit="submitContactForm(event)"><div class="formgrid"><div class="field"><label>Naam</label><input id="contactName" name="name" autocomplete="name" required></div><div class="field"><label>E-mail</label><input id="contactEmail" name="email" type="email" autocomplete="email" required></div><div class="field full"><label>Onderwerp</label><input id="contactSubject" name="subject" required></div><div class="field full"><label>Bericht</label><textarea id="contactMessage" name="message" required placeholder="Waar kunnen we je mee helpen?"></textarea></div></div><div class="actions"><button class="btn gold" type="submit" id="contactSubmit">Bericht versturen</button><span id="contactStatus" class="bug-status" aria-live="polite"></span></div></form>';
// Bedrijfsgegevens, klein onderaan contact, privacy en voorwaarden.
const COMPANY_LINE = '<p class="company-line">Savour · KvK 89674871 · Nederland · contact@savour.page</p>';
['contact', 'privacy', 'terms'].forEach(page => (siteCopy.nl[page] += COMPANY_LINE));

const PUBLIC_PAGE_LABELS = {
  about: 'Over Savour',
  faq: 'Veelgestelde vragen',
  guide: 'Gids',
  terms: 'Algemene voorwaarden',
  privacy: 'Privacybeleid',
  contact: 'Contact',
  bug: 'Bug doorgeven',
  pro: 'Savour Pro'
};

// Opent een informatiepagina: ingelogd binnen de app, uitgelogd in de publieke omgeving.
function openPublicInfo(id) {
  id = Object.keys(PUBLIC_PAGE_LABELS).includes(id) ? id : 'about';
  window.currentPublicInfo = id;
  const c = typeof siteCopy !== 'undefined' && siteCopy.nl ? siteCopy.nl : {};
  if (currentUser) {
    showApp(id);
    const titleEl = $(id + 'Title'),
      leadEl = $(id + 'Lead'),
      noteEl = $(id + 'Note'),
      bodyEl = $(id + 'Body');
    if (titleEl) titleEl.textContent = c[id + 'Title'] || PUBLIC_PAGE_LABELS[id];
    if (leadEl) leadEl.textContent = c[id + 'Lead'] || '';
    if (noteEl) noteEl.textContent = c[id + 'Note'] || '';
    if (bodyEl) bodyEl.innerHTML = c[id] || '<p>Deze pagina wordt voorbereid.</p>';
    if (id === 'pro') renderProPage(bodyEl);
    // Ingelogd: naam en e-mail alvast invullen in het contactformulier.
    if (id === 'contact' && $('contactName')) {
      $('contactName').value = account.name || '';
      $('contactEmail').value = currentUser.email || '';
    }
    window.scrollTo(0, 0);
    return;
  }
  if (!$('publicInfoShell')) return;
  showPublicShell('publicInfoShell');
  $('publicInfoTitle').textContent = c[id + 'Title'] || PUBLIC_PAGE_LABELS[id];
  $('publicInfoLead').textContent = c[id + 'Lead'] || '';
  $('publicInfoNote').textContent = c[id + 'Note'] || '';
  $('publicInfoBody').innerHTML = c[id] || '<p>Deze pagina wordt voorbereid.</p>';
  if (id === 'pro') renderProPage($('publicInfoBody'));
  window.scrollTo(0, 0);
}

// Linklijst onder de eerste publieke pagina die bij het laden zichtbaar is.
function ensurePublicFooter() {
  const shell = $('publicInfoShell');
  if (!shell) return;
  const body = $('publicInfoBody');
  if (!body || body.querySelector('.savour-public-links')) return;
  const links = [
    ['about', 'Over Savour'],
    ['pro', 'Savour Pro'],
    ['faq', 'Veelgestelde vragen'],
    ['guide', 'Gids'],
    ['contact', 'Contact'],
    ['bug', 'Bug doorgeven'],
    ['terms', 'Algemene voorwaarden'],
    ['privacy', 'Privacybeleid']
  ]
    .map(([id, label]) => `<button type="button" onclick="openPublicInfo('${id}')">${label}</button>`)
    .join('');
  body.insertAdjacentHTML(
    'beforeend',
    `<nav class="savour-public-links" aria-label="Publieke pagina's">${links}</nav>`
  );
}

// Melding op een publiek scherm (niet gevonden, kon niet laden), in de site-opmaak.
function publicNotice(title, text) {
  return `<section class="site-page-head share-notice"><h1>${esc(title)}</h1><p class="site-lead">${esc(text)}</p><div class="site-cta-row"><a class="site-btn solid" href="/">Naar Savour</a></div></section>`;
}

function showPublicShell(id) {
  $('landingView').style.display = 'none';
  $('appShell').style.display = 'none';
  for (const shell of ['publicInfoShell', 'publicRecipeShell', 'publicInviteShell'])
    if ($(shell)) $(shell).style.display = shell === id ? 'flex' : 'none';
  window.scrollTo(0, 0);
}

// Gedeeld recept (/r/<slug>) in de site-stijl, met de hoeveelheden vet en onderaan een uitnodiging om zelf te beginnen.
// De kop voor WhatsApp en andere apps (titel en voorbeeldplaatje) maakt api/recept.js.
async function openPublicRecipeBySlug(slug) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_recipe_by_slug', { _slug: slug });
    if (error) throw error;
    showPublicShell('publicRecipeShell');
    if (!data) {
      $('publicRecipeContent').innerHTML = publicNotice(
        'Dit recept wordt niet meer gedeeld',
        'De maker heeft de link uitgezet, of de tijd waarin de link werkte is voorbij. Vraag de maker om een nieuwe link.'
      );
      return;
    }
    const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];
    const steps = Array.isArray(data.steps) ? data.steps : [];
    document.title = `${data.title || 'Recept'} · Savour`;
    publicRecipe = { ingredients: ingredients.map(String), base: parseYield(data.yield_text) };
    const ingredient = (x, i) => `<li data-ing="${i}">${ingredientHtml(String(x), 1)}</li>`;
    const base = publicRecipe.base;
    // Opbrengst omrekenen (min/plus of zelf typen, alleen bij een opbrengst met een getal) en kookmodus, samen in één
    // rustig blok. Overnemen kan hier niet: dat kan alleen ingelogd, in de app.
    const yieldHtml = base
      ? `<div class="share-yield-tool" role="group" aria-label="Opbrengst omrekenen"><span class="share-yield-label">Opbrengst</span><div class="share-yield-row"><div class="share-stepper"><button type="button" onclick="stepPublicYield(-1)" aria-label="Minder">−</button><input id="pubYieldInput" inputmode="decimal" value="${esc(formatNumber(base.value))}" oninput="setPublicYield(this.value)" aria-label="Nieuwe opbrengst"><button type="button" onclick="stepPublicYield(1)" aria-label="Meer">+</button></div><b class="share-yield-unit" translate="no">${esc(base.unit)}</b></div>${recipeMultipliersHtml('setPublicFactor')}<div class="share-yield-meta"><small id="pubYieldFactor"></small><button type="button" id="pubYieldReset" class="share-yield-reset" onclick="setPublicYield('${escJs(formatNumber(base.value))}', true)" hidden>Origineel</button></div></div>`
      : data.yield_text
        ? `<div class="share-yield-tool"><span class="share-yield-label">Opbrengst</span><b class="share-yield-unit" translate="no">${esc(data.yield_text)}</b>${recipeMultipliersHtml('setPublicFactor')}<div class="share-yield-meta"><small id="pubYieldFactor"></small><button type="button" id="pubYieldReset" class="share-yield-reset" onclick="setPublicFactor(1)" hidden>Origineel</button></div></div>`
        : ingredients.length
          ? `<div class="share-yield-tool"><span class="share-yield-label">Omrekenen</span>${recipeMultipliersHtml('setPublicFactor')}<div class="share-yield-meta"><small id="pubYieldFactor"></small><button type="button" id="pubYieldReset" class="share-yield-reset" onclick="setPublicFactor(1)" hidden>Origineel</button></div></div>`
          : '';
    $('publicRecipeContent').innerHTML =
      `<article class="share-recipe"><header class="share-recipe-head"><span class="share-recipe-tag">Gedeeld recept</span><h1 translate="no">${esc(data.title || 'Recept')}</h1>${
        data.description ? `<p class="site-lead" translate="no">${esc(data.description)}</p>` : ''
      }<div class="share-recipe-bar">${yieldHtml}<button type="button" class="site-btn share-cook-btn" onclick="toggleCookMode()">Kookmodus</button></div></header>${
        data.photo_url ? `<img class="share-recipe-photo" src="${esc(data.photo_url)}" alt="">` : ''
      }<div class="share-recipe-cols"><section><h2>Ingrediënten</h2><ul class="share-recipe-ingredients" id="pubIngredients" translate="no">${ingredients.map(ingredient).join('')}</ul></section>${
        steps.length
          ? `<section><h2>Bereiding</h2><ol class="share-recipe-steps" translate="no">${steps.map(x => `<li>${esc(String(x))}</li>`).join('')}</ol></section>`
          : ''
      }</div><aside class="share-recipe-cta"><div><h2>Ook je eigen recepten zo overzichtelijk?</h2><p>Savour zet je Word-bestanden, PDF's en kladjes om in één receptenboek, op computer en telefoon, voor je hele keuken.</p></div><div class="site-cta-row"><a class="site-btn solid" href="/?auth=signup" data-auth="signup">Gratis beginnen</a><a class="site-btn" href="/">Meer over Savour</a></div></aside></article>`;
  } catch (e) {
    console.error('Publiek recept laden mislukt', e);
    showPublicShell('publicRecipeShell');
    $('publicRecipeContent').innerHTML = publicNotice(
      'Recept niet beschikbaar',
      'De openbare receptpagina kon niet worden geladen.'
    );
  }
}

// Het openbare recept dat nu open is (omrekenen zonder account).
let publicRecipe = null;

function setPublicYield(value, reset) {
  const base = publicRecipe?.base;
  if (!base) return;
  if (reset && $('pubYieldInput')) $('pubYieldInput').value = value;
  const target = parseAmount(String(value).trim());
  if (!Number.isFinite(target) || target <= 0) return;
  applyPublicFactor(target / base.value);
}

// Snelknoppen ½× 2× 3× 4×, ook als het recept geen opbrengst heeft.
function setPublicFactor(factor) {
  const base = publicRecipe?.base;
  if (base && $('pubYieldInput')) return setPublicYield(formatNumber(base.value * factor), true);
  applyPublicFactor(factor);
}

function applyPublicFactor(factor) {
  document
    .querySelectorAll('.share-recipe-bar .rp-multipliers button')
    .forEach(b => b.classList.toggle('is-on', Math.abs(+b.dataset.factor - factor) < 1e-9));
  document.querySelectorAll('#pubIngredients [data-ing]').forEach(li => {
    li.innerHTML = ingredientHtml(publicRecipe.ingredients[Number(li.dataset.ing)], factor);
  });
  if ($('pubYieldFactor')) $('pubYieldFactor').textContent = factor === 1 ? '' : `× ${formatNumber(factor)}`;
  $('pubYieldReset')?.toggleAttribute('hidden', factor === 1);
}

function stepPublicYield(direction) {
  const base = publicRecipe?.base;
  const input = $('pubYieldInput');
  if (!base || !input) return;
  const step = base.value >= 2 ? 1 : 0.5;
  const current = parseAmount(input.value) || base.value;
  input.value = formatNumber(Math.max(step, Math.round((current + direction * step) / step) * step));
  setPublicYield(input.value);
}

// Gedeeld recept openen terwijl je bent ingelogd: in je eigen app, alleen-lezen. Je kunt het bekijken, omrekenen
// en printen; bewerken en verder delen kan alleen de maker.
async function openLinkRecipe(slug) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_recipe_by_slug', { _slug: slug });
    if (error) throw error;
    if (!data) {
      toast('Dit recept wordt niet meer gedeeld');
      return;
    }
    // Je eigen recept: dan gewoon zoals altijd.
    if (recipes.some(r => String(r.id) === String(data.id))) {
      openRecipe(data.id);
      return;
    }
    const recipe = {
      id: data.id,
      title: data.title || 'Recept',
      yield: data.yield_text || '',
      description: data.description || '',
      ingredients: Array.isArray(data.ingredients) ? data.ingredients.map(String) : [],
      steps: Array.isArray(data.steps) ? data.steps.map(String) : [],
      photo: data.photo_url || '',
      category: 'Gedeeld recept',
      shared: true,
      linkSlug: slug,
      allowCopy: (await recipeAllowsCopy(data.id)) === true
    };
    linkRecipes = [recipe, ...linkRecipes.filter(r => String(r.id) !== String(recipe.id))];
    openRecipe(recipe.id, 'link');
  } catch (e) {
    console.error('Gedeeld recept openen mislukt', e);
    toast('Dit gedeelde recept kon niet worden geladen');
  }
}

async function openPublicInvite(key) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_shared_map_invite', { _public_key: key });
    if (error) throw error;
    showPublicShell('publicInviteShell');
    if (!data) {
      $('publicInviteContent').innerHTML = publicNotice(
        'Uitnodiging niet gevonden',
        'Deze gedeelde-mapuitnodiging bestaat niet meer.'
      );
      return;
    }
    const name = esc(data.name || 'Keukenteam');
    $('publicInviteContent').innerHTML =
      `<span class="share-recipe-tag">Keukenteam</span><h1>Uitnodiging voor <span translate="no">${name}</span></h1><p class="site-lead">Je bent uitgenodigd om mee te werken in een gedeelde receptenmap van Savour.</p><p class="share-invite-text">Maak een Savour-account of log in om verder te gaan. Na het inloggen word je lid als viewer: je kunt de recepten bekijken, printen en omrekenen. De eigenaar kan je daarna meer rechten geven.</p><div class="site-cta-row"><a class="site-btn solid" href="/?auth=signup" data-auth="signup">Account aanmaken</a><a class="site-btn" href="/?auth=login" data-auth="login">Inloggen</a></div>`;
  } catch (e) {
    console.error('Uitnodiging laden mislukt', e);
    showPublicShell('publicInviteShell');
    $('publicInviteContent').innerHTML = publicNotice(
      'Uitnodiging niet beschikbaar',
      'De uitnodiging kon niet worden geladen.'
    );
  }
}

async function submitBugReport(event) {
  event.preventDefault();
  const form = event.currentTarget,
    btn = $('bugSubmit'),
    status = $('bugStatus');
  if (!form || !btn) return;
  const file = $('bugScreenshot')?.files?.[0];
  if (file && file.size > 3 * 1024 * 1024) {
    status.textContent = t('Screenshot is too large. Maximum 4 MB.');
    return;
  }
  btn.disabled = true;
  status.textContent = t('Bezig...');
  try {
    let attachment = null;
    if (file) {
      const reader = new FileReader();
      attachment = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
    const payload = {
      name: $('bugName').value.trim(),
      email: $('bugEmail').value.trim(),
      subject: $('bugSubject').value.trim(),
      message: $('bugMessage').value.trim(),
      screenshot: attachment || null,
      screenshotName: file?.name || null,
      page: location.href,
      language: document.documentElement.lang || ''
    };
    const r = await fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(payload)
    });
    const data = await r.json().catch(() => ({}));
    if (r.status === 413) throw new Error(t('De screenshot is te groot. Kies een kleinere afbeelding.'));
    if (!r.ok) {
      console.error('Savour bug-report API error', { status: r.status, data });
      throw new Error(data.error || `${t('De bugmelding kon niet worden verzonden.')} (${r.status})`);
    }
    form.reset();
    status.textContent = t('Bedankt. Je bugmelding is verstuurd.');
  } catch (e) {
    console.error(e);
    status.textContent = e.message || t('Versturen is mislukt.');
  } finally {
    btn.disabled = false;
  }
}

async function submitContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget,
    btn = $('contactSubmit'),
    status = $('contactStatus');
  if (!form || !btn) return;
  btn.disabled = true;
  status.textContent = t('Bezig...');
  try {
    const r = await fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        kind: 'contact',
        name: $('contactName').value.trim(),
        email: $('contactEmail').value.trim(),
        subject: $('contactSubject').value.trim(),
        message: $('contactMessage').value.trim(),
        page: location.href,
        language: document.documentElement.lang || ''
      })
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || t('Het bericht kon niet worden verzonden.'));
    form.reset();
    status.textContent = t('Bedankt. Je bericht is verstuurd; we reageren zo snel mogelijk.');
  } catch (e) {
    console.error(e);
    status.textContent = e.message || t('Versturen is mislukt.');
  } finally {
    btn.disabled = false;
  }
}
