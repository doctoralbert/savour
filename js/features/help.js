// Uitleg per scherm: het i-knopje naast de titel opent een venster met wat je hier allemaal kunt.
// Alleen functionele uitleg; de teksten zijn Nederlands en worden vertaald via tools/vertalingen.mjs.

const HELP_TOPICS = {
  library: {
    eyebrow: 'Alle recepten',
    title: 'Zo werkt je receptenbibliotheek',
    sections: [
      [
        'Je hele receptenboek',
        'Al je eigen recepten op één plek, genummerd en op alfabet. Met de letters A–Z spring je naar een beginletter; met de categorieën bovenaan zie je alleen één soort recept.'
      ],
      [
        'Zoeken',
        'Zoek bovenin op receptnaam, ingrediënt, component of techniek. Je vindt zo ook het recept waar die ene saus in zit.'
      ],
      [
        'Een recept openen',
        'In een recept start je de kookmodus, reken je de opbrengst om, print of deel je het, en bewerk je het. Via ⋯ zet je het in een map of verwijder je het.'
      ],
      [
        'Favorieten',
        'Met het sterretje maak je een recept favoriet. Je favorieten staan apart onder Favorieten in het menu.'
      ],
      [
        'Opruimen',
        'Met “Verwijder recepten” verwijder je meerdere recepten tegelijk. Dubbele recepten en nummers voor receptnamen vind je onder Instellingen → Opschonen.'
      ],
      ['Hoeveel recepten', 'Een gratis account bewaart tot 100 recepten. Met Savour Pro bewaar je onbeperkt recepten.']
    ]
  },
  categories: {
    eyebrow: 'Categorieën',
    title: 'Zo werken categorieën',
    sections: [
      [
        'Waarvoor',
        'Een categorie zegt wat voor recept het is, bijvoorbeeld sauzen, ijs of garnituren. Bovenaan bij Alle recepten filter je er direct op.'
      ],
      [
        'Zelf beheren',
        'Voeg categorieën toe, wijzig de naam of verwijder ze. De lijst is persoonlijk en wordt ook gebruikt bij het invoeren en importeren van recepten.'
      ],
      [
        'Standaardlijst',
        'Met “Standaardlijst” zet je in één keer een lijst neer die past bij de professionele keuken. Je eigen categorieën blijven staan.'
      ],
      [
        'Trefwoorden',
        'Geef per categorie trefwoorden op, bijvoorbeeld sorbet voor IJs. Komt zo’n woord in de receptnaam voor, dan stelt Savour die categorie voor.'
      ],
      [
        'Categorieën voorstellen',
        'Met “Categorieën voorstellen” zoekt Savour voor al je recepten een passende categorie op basis van de trefwoorden. Je bevestigt altijd zelf wat er verandert.'
      ]
    ]
  },
  import: {
    eyebrow: 'Recept toevoegen',
    title: 'Zo voeg je recepten toe',
    sections: [
      [
        'Word, PDF, tekst of andere bestanden',
        'Importeer een heel bestand in één keer, ook met honderden recepten. De Savour-lezer splitst ze zelf op en herkent titel, opbrengst, ingrediënten en bereiding. Met "Alle bestanden door elkaar" kies je alles tegelijk, ook een hele map.'
      ],
      [
        'Webpagina of andere recepten-app',
        'Plak de link van een recept op een website, of zet je recepten over uit een andere app: Paprika, Mealie, Tandoor, Recipe Keeper, Crouton, MasterCook, Copy Me That, Plan to Eat en meer. Maak in die app een export en kies het bestand bij "Uit een andere recepten-app".'
      ],
      [
        "Foto's",
        "Upload foto's van handgeschreven of gescande recepten. De AI leest ze voor je uit (Savour Pro, tot 500 per maand). Het originele kladje blijft bewaard bij het recept."
      ],
      ['Zelf invoeren', 'Typ een recept in de recepteditor: titel, categorie, opbrengst, ingrediënten en stappen.'],
      [
        'Eerst controleren',
        'Je ziet altijd wat er is herkend voordat je opslaat. Savour verzint nooit hoeveelheden, ingrediënten of stappen; twijfelt het, dan zie je dat.'
      ],
      ['Hoeveel recepten', 'Een gratis account bewaart tot 100 recepten. Met Savour Pro bewaar je onbeperkt recepten.']
    ]
  },
  folders: {
    eyebrow: 'Recepten mappen',
    title: 'Zo werken je recepten mappen',
    sections: [
      [
        'Je eigen mappen',
        'Orden je recepten zoals jij werkt: per partie, menu of seizoen. Een recept kan in meerdere mappen staan.'
      ],
      [
        'Recepten in een map',
        'Open een map en kies welke recepten erin horen, of zet een recept vanuit het recept zelf in een map via ⋯.'
      ],
      [
        'Menu en volgorde',
        'Kies welke mappen in het menu verschijnen en sleep ze in de volgorde die voor jou logisch is.'
      ],
      [
        'Printen',
        'Print een hele map in één keer: met voorblad, inhoudsopgave en het nummer van elk recept onderaan de pagina. Met Savour Pro staat het logo van je restaurant erop.'
      ],
      [
        'Samenwerken',
        'Je eigen mappen zie alleen jij. Wil je recepten delen met je keukenteam, gebruik dan een gedeelde map.'
      ]
    ]
  },
  settings: {
    eyebrow: 'Mijn account',
    title: 'Zo werken je instellingen',
    sections: [
      ['Account', 'Pas je naam en profielfoto aan, verander je wachtwoord of log uit.'],
      [
        'Printen en downloaden',
        'Print al je recepten in één keer in de printopmaak van Savour. Met Savour Pro download je ze ook naar Word of als back-up.'
      ],
      [
        'Abonnement en organisatie',
        'Bekijk of beheer je Savour Pro of organisatie-abonnement, nodig je organisatie uit en stel het logo voor je prints in.'
      ],
      ['Weergave', 'Kies het donkere of lichte thema; je keuze wordt bewaard in je account.'],
      ['Categorieën', 'Beheer je eigen categorieën en hun trefwoorden.'],
      [
        'Opschonen',
        'Savour zoekt nummers voor receptnamen en dubbele recepten. Je ziet altijd eerst wat er verandert.'
      ],
      [
        'Collega uitnodigen en app',
        'Nodig een collega uit en krijg 14 dagen Savour Pro cadeau, of zet Savour als app op je beginscherm.'
      ]
    ]
  },
  shared: {
    eyebrow: 'Gedeelde map',
    title: 'Zo werkt een gedeelde map',
    article: {
      nl: '/blog/gedeelde-mappen-uitgelegd',
      en: '/en/blog/shared-folders-explained',
      de: '/de/blog/geteilte-ordner-erklaert',
      es: '/es/blog/carpetas-compartidas-explicadas'
    },
    sections: [
      [
        'Eén receptenboek voor je team',
        'Een gedeelde map is het receptenboek van je keuken. Iedereen die lid is, ziet dezelfde recepten op zijn eigen telefoon, tablet of computer. Past de maker een recept aan, dan ziet iedereen meteen de nieuwe versie.'
      ],
      [
        'Rollen',
        'Eigenaar: beheert de map, de leden en hun rol. Editor: voegt recepten en mappen toe, haalt ze uit de map en beheert de mappen. Viewer: bekijkt, print en rekent om. Een recept bewerken kan altijd alleen de maker van dat recept.'
      ],
      [
        'Recepten toevoegen',
        'Kies “Recept toevoegen” en vink recepten uit je eigen bibliotheek aan. Het recept blijft van jou: het staat in de gedeelde map en in je eigen recepten.'
      ],
      [
        'Mappen (receptenklappers)',
        'Deel de gedeelde map op in mappen, bijvoorbeeld per partie of per menu. Met “Mappen beheren” wijzig je de naam, zet je de mappen in jouw volgorde en archiveer je mappen die je niet meer gebruikt. Recepten in een gearchiveerde map blijven bewaard en staan onderaan onder “Archief”.'
      ],
      [
        'Team uitnodigen',
        'Nodig collega’s uit via WhatsApp, Telegram, e-mail of de uitnodigingslink. Na het inloggen worden ze lid als viewer; de eigenaar kan daarna hun rol aanpassen. Lid zijn van een gedeelde map is gratis.'
      ],
      [
        'Printen',
        'Print de hele gedeelde map, één map of een eigen selectie in één keer: met een inhoudsopgave, het nummer van elk recept onderaan de pagina en, met Savour Pro, het logo van je restaurant.'
      ],
      [
        'Omrekenen en kookmodus',
        'Reken elk recept om naar een andere opbrengst. De kookmodus toont alleen het recept in grote letters en houdt je scherm aan; vink ingrediënten en stappen af terwijl je werkt.'
      ],
      [
        'Recept overnemen',
        'Bij elk recept van een collega in de gedeelde map zie je “Toevoegen aan mijn recepten”. Je krijgt een eigen kopie in je bibliotheek die je zelf kunt aanpassen; het origineel blijft van de maker.'
      ],
      [
        'Zonder internet',
        'Recepten die je hebt geopend, blijven op je apparaat beschikbaar, ook in een keuken zonder wifi.'
      ],
      [
        'Map verlaten of verwijderen',
        'Een lid kan een gedeelde map altijd verlaten. Alleen de eigenaar kan de map verwijderen; de recepten zelf blijven dan in de bibliotheek van hun maker.'
      ]
    ]
  }
};

// Het i-knopje naast een titel.
function helpButton(topic) {
  return `<button type="button" class="help-btn" onclick="openHelp('${topic}')" aria-label="${esc(t('Uitleg'))}" title="${esc(t('Uitleg'))}">i</button>`;
}

function openHelp(topic) {
  const h = HELP_TOPICS[topic];
  if (!h) return;
  let modal = $('helpModal');
  if (!modal) {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div class="modal" id="helpModal" onclick="if(event.target===this)closeHelp()"><div class="modalbox help-box" role="dialog" aria-modal="true"></div></div>'
    );
    modal = $('helpModal');
  }
  const article = h.article ? h.article[currentLanguage] || h.article.nl : '';
  modal.querySelector('.help-box').innerHTML =
    `<button type="button" class="help-close" onclick="closeHelp()" aria-label="${esc(t('Sluiten'))}">${icon('close')}</button><div class="eyebrow">${esc(t(h.eyebrow))}</div><h2>${esc(t(h.title))}</h2><div class="help-sections">${h.sections
      .map(([title, text]) => `<section><h3>${esc(t(title))}</h3><p>${esc(t(text))}</p></section>`)
      .join(
        ''
      )}</div><div class="actions">${article ? `<a class="btn" href="${article}" target="_blank" rel="noopener">${esc(t('Lees het hele artikel'))}</a>` : ''}<button class="btn gold" onclick="closeHelp()">${esc(t('Begrepen'))}</button></div>`;
  modal.classList.add('open');
}

function closeHelp() {
  $('helpModal')?.classList.remove('open');
}
