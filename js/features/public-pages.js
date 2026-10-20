// Publieke pagina's (over, FAQ, voorwaarden, ...), gedeelde receptlinks, uitnodigingen en bugmeldingen.

const siteCopy = {
  nl: {
    aboutTitle: 'Over Savour',
    aboutLead: 'Savour is een professionele omgeving voor het beheren, organiseren en delen van recepten.',
    faqTitle: 'Veelgestelde vragen',
    termsTitle: 'Algemene voorwaarden',
    privacyTitle: 'Privacybeleid',
    termsNote:
      'Concepttekst voor de huidige prototypefase. Laat deze voorwaarden juridisch controleren voordat Savour commercieel wordt gelanceerd.',
    privacyNote:
      'Concepttekst voor de huidige prototypefase. Laat dit privacybeleid controleren en aanvullen met de definitieve bedrijfs- en verwerkingsgegevens vóór livegang.',
    about: `<h2>Wat is Savour?</h2><p>Savour is ontwikkeld voor professionele keukens en keukenteams. Het doel is eenvoudig: recepten helder opslaan, terugvinden, organiseren en delen zonder onnodige informatie.</p><h2>Recepten beheren</h2><p>Je kunt recepten zelf invoeren of bestaande recepten importeren. Je eigen receptenbibliotheek blijft centraal staan en recepten kunnen worden georganiseerd in persoonlijke mappen en gedeelde mappen.</p><h2>Voor professionals</h2><p>Savour is ontworpen vanuit de dagelijkse praktijk van chefs en professionele keukens. De interface legt de nadruk op receptuur, organisatie en samenwerking.</p>`,
    faq: `<h2>Hoe voeg ik een recept toe?</h2><p>Ga naar <strong>Recept toevoegen</strong>. Je kunt een recept zelf invoeren of een bron importeren. Na import controleer je de herkende gegevens voordat je ze opslaat.</p><h2>Waar worden mijn recepten opgeslagen?</h2><p>Je persoonlijke recepten horen bij je eigen account. Een recept dat je uit een map verwijdert, wordt daarmee niet automatisch uit je persoonlijke bibliotheek verwijderd.</p><h2>Kan ik recepten delen?</h2><p>Ja. Met een gedeelde map kun je recepten met andere gebruikers delen en, afhankelijk van de ingestelde rechten, samenwerken.</p><h2>Kan ik mijn mappen aanpassen?</h2><p>Ja. Je kunt persoonlijke recepten mappen aanmaken, hernoemen en verwijderen. In <strong>Recepten mappen bijwerken</strong> bepaal je welke mappen in het menu verschijnen en in welke volgorde.</p><h2>Hoe werkt importeren?</h2><p>Je kunt verschillende bronbestanden en tekst gebruiken. Geïmporteerde recepten moeten altijd vóór het opslaan worden gecontroleerd.</p>`,
    terms: `<h2>1. Gebruik van Savour</h2><p>Savour is een dienst voor het beheren, organiseren en delen van recepten. Je gebruikt de dienst op eigen verantwoordelijkheid en bent verantwoordelijk voor de inhoud die je toevoegt.</p><h2>2. Account</h2><p>Voor bepaalde functies is een account nodig. Je bent verantwoordelijk voor het vertrouwelijk houden van je inloggegevens en voor de activiteiten die via je account plaatsvinden.</p><h2>3. Receptinhoud</h2><p>Je behoudt de rechten op de recepten en andere inhoud die je zelf aan Savour toevoegt, voor zover die rechten bij jou liggen. Je geeft Savour alleen de toestemming die nodig is om de dienst te leveren.</p><h2>4. Import en AI</h2><p>Automatische verwerking kan fouten bevatten. Controleer geïmporteerde of automatisch gestructureerde recepten voordat je ze professioneel gebruikt. Savour garandeert niet dat automatisch herkende inhoud volledig of foutloos is.</p><h2>5. Beschikbaarheid</h2><p>Savour kan worden gewijzigd, onderhouden of tijdelijk niet beschikbaar zijn. We streven naar een betrouwbare dienst, maar kunnen geen ononderbroken beschikbaarheid garanderen.</p><h2>6. Beëindiging</h2><p>Je kunt je account beëindigen via de beschikbare accountfunctie. Gegevens die volgens de wet moeten worden bewaard, vallen onder de toepasselijke bewaarplichten.</p><h2>7. Wijzigingen</h2><p>Deze voorwaarden kunnen worden aangepast wanneer Savour of de toepasselijke regelgeving verandert.</p>`,
    contactTitle: 'Contact',
    contactLead: 'Neem contact op met Savour.',
    supportTitle: 'Steun Savour',
    supportLead: 'Help mee om Savour verder te bouwen.',
    support: `<h2>Een platform vanuit de keuken</h2><p>Savour wordt ontwikkeld vanuit de praktijk van professionele keukens. Als je vindt dat dit platform waarde heeft, kun je vrijwillig bijdragen aan de verdere ontwikkeling.</p><div class="v51-support"><div class="v51-support-card"><div class="v51-qr-placeholder">PayPal<br>QR-code<br>wordt toegevoegd</div><div><h3>Steun Savour</h3><p>Een kleine bijdrage helpt bij hosting, AI-verwerking en verdere ontwikkeling van het platform.</p></div></div></div>`,
    contactTitle: 'Contact',
    contactLead: 'Neem contact op met Savour.',
    contactNote: '',
    contact: `<h2>Contact</h2><p>Voor vragen, feedback of zakelijke aanvragen kun je contact opnemen via <a href="mailto:contact@savour.page">contact@savour.page</a>.</p><p>We helpen je graag verder met vragen over Savour, accounts en professioneel receptbeheer.</p>`,
    privacy: `<h2>1. Welke gegevens</h2><p>Voor het gebruik van Savour kunnen onder meer accountgegevens, profielgegevens, recepten, mappen, favorieten en gegevens over gedeelde samenwerking worden verwerkt.</p><h2>2. Waarvoor gegevens worden gebruikt</h2><p>Gegevens worden gebruikt om je account te laten werken, recepten op te slaan en te tonen, functies voor mappen en delen te leveren en de veiligheid en werking van Savour te ondersteunen.</p><h2>3. Recepten en gedeelde mappen</h2><p>Je persoonlijke recepten zijn bedoeld voor jouw account. Wanneer je een recept of map deelt, kunnen andere deelnemers de inhoud zien volgens de rechten en instellingen van die gedeelde functie.</p><h2>4. Automatische verwerking</h2><p>Wanneer je gebruikmaakt van import- of AI-functies, kan de aangeleverde inhoud worden verwerkt om er gestructureerde receptgegevens van te maken. Controleer de resultaten vóór gebruik.</p><h2>5. Bewaren en verwijderen</h2><p>Je kunt je account en beschikbare persoonlijke gegevens verwijderen via de accountfuncties. Bewaartermijnen kunnen afhangen van wettelijke verplichtingen en technische noodzaak.</p><h2>6. Jouw rechten</h2><p>Afhankelijk van de toepasselijke privacywetgeving kun je rechten hebben zoals inzage, correctie, verwijdering, beperking van verwerking en dataportabiliteit.</p><h2>7. Definitieve bedrijfsgegevens</h2><p>Voor de livegang van Savour moeten de verantwoordelijke rechtspersoon, contactgegevens, hosting- en verwerkingspartijen en eventuele internationale gegevensdoorgiften definitief worden ingevuld.</p>`
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
  '<h2>Een centrale plek voor de keuken</h2><p>Van losse notities en oude documenten tot gecontroleerde recepturen: Savour brengt informatie samen in een overzichtelijke werkomgeving. Je bepaalt zelf hoe je categorieën en mappen indeelt, zodat de structuur aansluit op jouw keuken.</p><h2>Samenwerken met een team</h2><p>Gedeelde mappen maken het mogelijk om recepten gecontroleerd beschikbaar te stellen aan collega’s. Gebruik persoonlijke bibliotheken voor eigen werk en gedeelde mappen voor samenwerking, overdracht en vaste werkafspraken.</p>';
siteCopy.nl.faq +=
  '<h2>Kan ik mijn eigen structuur bepalen?</h2><p>Ja. Categorieën, persoonlijke mappen en gedeelde mappen zijn bedoeld om aan te sluiten op jouw manier van werken. Houd de bibliotheek compact en gebruik de detailpagina voor de volledige receptuur.</p><h2>Wat moet ik controleren bij AI-import?</h2><p>Controleer altijd titel, hoeveelheden, eenheden, opbrengst en bereidingsstappen voordat je een geïmporteerd recept in de professionele praktijk gebruikt.</p>';
siteCopy.nl.contact +=
  '<h2>Feedback en samenwerking</h2><p>Feedback over de interface, importkwaliteit, mappenstructuur en samenwerking helpt om Savour verder te ontwikkelen. Vermeld bij een melding bij voorkeur de pagina en de stappen waarmee het probleem ontstaat.</p>';

const PUBLIC_PAGE_LABELS = {
  about: 'Over Savour',
  faq: 'Veelgestelde vragen',
  terms: 'Algemene voorwaarden',
  privacy: 'Privacybeleid',
  contact: 'Contact',
  bug: 'Bug doorgeven',
  support: 'Steun Savour'
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
    window.scrollTo(0, 0);
    return;
  }
  const shell = $('publicInfoShell');
  if (!shell) return;
  $('landingView').style.display = 'none';
  $('appShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  if ($('publicInviteShell')) $('publicInviteShell').style.display = 'none';
  shell.style.display = 'flex';
  $('publicInfoTitle').textContent = c[id + 'Title'] || PUBLIC_PAGE_LABELS[id];
  $('publicInfoLead').textContent = c[id + 'Lead'] || '';
  $('publicInfoNote').textContent = c[id + 'Note'] || '';
  $('publicInfoBody').innerHTML = c[id] || '<p>Deze pagina wordt voorbereid.</p>';
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
    ['faq', 'Veelgestelde vragen'],
    ['contact', 'Contact'],
    ['bug', 'Bug doorgeven'],
    ['terms', 'Algemene voorwaarden'],
    ['privacy', 'Privacybeleid'],
    ['support', 'Steun Savour']
  ]
    .map(([id, label]) => `<button type="button" onclick="openPublicInfo('${id}')">${label}</button>`)
    .join('');
  body.insertAdjacentHTML(
    'beforeend',
    `<nav class="savour-public-links" aria-label="Publieke pagina's">${links}</nav>`
  );
}

async function openPublicRecipeBySlug(slug) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_recipe_by_slug', { _slug: slug });
    if (error) throw error;
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'flex';
    if (!data) {
      $('publicRecipeContent').innerHTML =
        '<div class="empty"><h2>Recept niet gevonden</h2><p>Deze openbare receptlink bestaat niet meer.</p></div>';
      return;
    }
    const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];
    const steps = Array.isArray(data.steps) ? data.steps : [];
    $('publicRecipeContent').innerHTML =
      `<article class="public-recipe-card">${data.photo_url ? `<img class="public-recipe-photo" src="${esc(data.photo_url)}" alt="">` : ''}<div class="public-recipe-main"><div class="eyebrow">Savour · Recept</div><h1>${esc(data.title || 'Recept')}</h1>${data.description ? `<p class="lead">${esc(data.description)}</p>` : ''}${data.yield_text ? `<p class="yield">Opbrengst: ${esc(data.yield_text)}</p>` : ''}<div class="public-recipe-columns"><section><h2>Ingrediënten</h2><ul>${ingredients.map(x => `<li>${esc(String(x))}</li>`).join('')}</ul></section><section><h2>Bereiding</h2><ol>${steps.map(x => `<li>${esc(String(x))}</li>`).join('')}</ol></section></div><div class="public-recipe-site">Gedeeld via <a href="${location.origin}">Savour</a></div></div></article>`;
  } catch (e) {
    console.error('Publiek recept laden mislukt', e);
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'flex';
    $('publicRecipeContent').innerHTML =
      '<div class="empty"><h2>Recept niet beschikbaar</h2><p>De openbare receptpagina kon niet worden geladen.</p></div>';
  }
}

async function openPublicInvite(key) {
  try {
    const { data, error } = await supabaseClient.rpc('get_public_shared_map_invite', { _public_key: key });
    if (error) throw error;
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('publicInviteShell').style.display = 'flex';
    if (!data) {
      $('publicInviteContent').innerHTML =
        '<div class="empty"><h2>Uitnodiging niet gevonden</h2><p>Deze gedeelde-mapuitnodiging bestaat niet meer.</p></div>';
      return;
    }
    $('publicInviteContent').innerHTML =
      `<div class="eyebrow">Savour · Gedeelde map</div><h1>Uitnodiging voor ${esc(data.name || 'Gedeelde map')}</h1><p class="info-lead">Je bent uitgenodigd om mee te werken in een gedeelde receptenmap van Savour.</p><div class="panel" style="margin-top:24px"><h2 style="font-family:'Playfair Display';margin-top:0">${esc(data.name || 'Gedeelde map')}</h2><p class="muted">Maak een Savour-account of log in om verder te gaan. Na het inloggen kan de eigenaar je rechten instellen.</p><div class="actions"><button class="btn gold" onclick="openAuth('signup')">Account aanmaken</button><button class="btn" onclick="openAuth('login')">Inloggen</button></div></div>`;
  } catch (e) {
    console.error('Uitnodiging laden mislukt', e);
    $('landingView').style.display = 'none';
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('publicInviteShell').style.display = 'flex';
    $('publicInviteContent').innerHTML =
      '<div class="empty"><h2>Uitnodiging niet beschikbaar</h2><p>De uitnodiging kon niet worden geladen.</p></div>';
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
