// De eerste keer in Savour: welkomstscherm, startlijst en voorbeelden.
// De voorbeelden staan bewust los van recipes, folders en sharedMaps: ze komen nooit in exports, tellingen of de
// database, en zijn alleen-lezen. Ze verdwijnen vanzelf zodra je zelf een map of keukenteam hebt, of met Verbergen.

const EXAMPLE_RECIPES = [
  {
    id: 'voorbeeld-kalfsfond',
    title: 'Kalfsfond',
    yield: '5 liter',
    ingredients: [
      '5 kg kalfsbotten',
      '500 gram ui',
      '300 gram wortel',
      '200 gram bleekselderij',
      '2 el tomatenpuree',
      '8 liter water'
    ],
    steps: [
      'Rooster de botten in de oven goudbruin op 200 °C.',
      'Bak de groenten aan en voeg de tomatenpuree toe.',
      'Zet alles op met koud water en laat 6 uur zachtjes trekken.',
      'Passeer door een fijne zeef en koel snel terug.'
    ],
    notes: 'Nooit laten koken, dan wordt de fond troebel.'
  },
  {
    id: 'voorbeeld-kalfsjus',
    title: 'Kalfsjus',
    yield: '1 liter',
    ingredients: ['5 liter kalfsfond', '200 gram sjalot', '3 dl rode wijn', '2 takjes tijm'],
    steps: [
      'Fruit de sjalot en blus af met de rode wijn.',
      'Laat de wijn inkoken tot een stroop.',
      'Voeg de fond en tijm toe en kook in tot 1 liter.',
      'Passeer en proef af.'
    ]
  },
  {
    id: 'voorbeeld-beurre-blanc',
    title: 'Beurre blanc',
    yield: '0,5 liter',
    ingredients: [
      '2 sjalotten, fijngesneden',
      '1 dl witte wijn',
      '1 dl witte wijnazijn',
      '250 gram koude boter, in blokjes',
      'zout naar smaak'
    ],
    steps: [
      'Kook sjalot, wijn en azijn in tot een kwart.',
      'Haal van het vuur en monteer met de koude boter.',
      'Breng op smaak met zout en passeer.'
    ]
  },
  {
    id: 'voorbeeld-hollandaise',
    title: 'Hollandaise',
    yield: '10 porties',
    ingredients: ['6 eidooiers', '400 gram geklaarde boter', '2 el water', 'citroensap naar smaak', 'zout naar smaak'],
    steps: [
      'Klop dooiers en water au bain-marie tot een luchtige sabayon.',
      'Voeg de warme boter in een dunne straal toe.',
      'Breng op smaak met citroen en zout.'
    ]
  },
  {
    id: 'voorbeeld-citroentaart',
    title: 'Citroentaart',
    yield: '1 taart',
    ingredients: [
      'Bodem:',
      '250 gram bloem',
      '125 gram boter',
      '60 gram poedersuiker',
      '1 ei',
      'Vulling:',
      '5 eieren',
      '200 gram suiker',
      '150 ml citroensap',
      '150 ml room'
    ],
    steps: [
      'Bodem:',
      'Kneed alles tot een deeg en laat 1 uur koelen.',
      'Rol uit, bekleed de vorm en bak blind op 170 °C.',
      'Vulling:',
      'Meng eieren, suiker, citroensap en room.',
      'Vul de bodem en bak 25 minuten op 140 °C.'
    ],
    notes: 'Haal uit de oven als het midden nog net trilt.'
  },
  {
    id: 'voorbeeld-gerecht',
    title: 'Kalfssukade met jus',
    yield: '8 personen',
    ingredients: ['2 kg kalfssukade', '1 liter kalfsjus', '300 gram wortel', '2 takjes tijm'],
    steps: [
      'Bak het vlees rondom bruin.',
      'Stoof 3 uur op 150 °C in de jus met wortel en tijm.',
      'Laat rusten en snijd in plakken.'
    ]
  }
].map(r => ({ description: '', category: 'Voorbeeld', photo: '', shared: true, example: true, ...r }));

const EXAMPLE_TEAM = {
  name: 'Restaurant De Haven',
  members: [
    ['Sanne', 'Eigenaar'],
    ['Tom', 'Sous-chef'],
    ['Lisa', 'Kok'],
    ['Daan', 'Stagiair']
  ],
  folders: [
    ['Sauzen', ['voorbeeld-kalfsjus', 'voorbeeld-beurre-blanc', 'voorbeeld-hollandaise']],
    ['Basis', ['voorbeeld-kalfsfond']],
    ['Patisserie', ['voorbeeld-citroentaart']],
    ['Kaart', ['voorbeeld-gerecht']]
  ]
};

let exampleKind = 'team';

function onboardingKey(name) {
  return `savour_${name}_${currentUser?.id || ''}`;
}

function onboardingFlag(name) {
  try {
    return !!localStorage.getItem(onboardingKey(name));
  } catch {
    return false;
  }
}

function setOnboardingFlag(name) {
  try {
    localStorage.setItem(onboardingKey(name), '1');
  } catch {}
}

function showsExampleFolder() {
  return !!currentUser && !demoMode && !folders.length && !onboardingFlag('examples_hidden');
}

function showsExampleTeam() {
  return !!currentUser && !demoMode && !sharedMaps.length && !onboardingFlag('examples_hidden');
}

function exampleNavButton(kind, name) {
  return `<button class="nav-example" onclick="openExample('${kind}')"><span class="ico">•</span><span translate="no">${esc(name)}</span><small>Voorbeeld</small></button>`;
}

function hideExamples() {
  setOnboardingFlag('examples_hidden');
  refreshSidebar();
  renderFolders();
  go('recipes');
}

function openExample(kind) {
  exampleKind = kind;
  renderExample();
  go('exampleView');
}

function exampleRows(ids) {
  return ids
    .map(id => EXAMPLE_RECIPES.find(r => r.id === id))
    .map(
      (r, i) =>
        `<div class="savour-v13-row" role="button" tabindex="0" onclick="openRecipe('${r.id}','example')" onkeydown="if(event.key==='Enter'){openRecipe('${r.id}','example')}"><span class="savour-v13-number">${String(i + 1).padStart(3, '0')}</span><span class="savour-v13-name" translate="no">${esc(r.title)}</span><span class="savour-v13-arrow">›</span></div>`
    )
    .join('');
}

function renderExample() {
  const host = $('exampleWrap');
  if (!host) return;
  const banner = (text, button) =>
    `<div class="example-banner"><div><b>Dit is een voorbeeld</b><span>${text}</span></div><div class="example-banner-actions">${button}<button type="button" class="btn-quiet" onclick="hideExamples()">Verbergen</button></div></div>`;
  if (exampleKind === 'folder') {
    host.innerHTML =
      banner(
        'Zo ziet een receptenmap eruit. Hij verdwijnt zodra je je eigen map maakt.',
        '<button type="button" class="btn gold" onclick="newFolder()">Maak je eigen map</button>'
      ) +
      `<div class="eyebrow">Receptenmap</div><h1 class="example-title" translate="no">Sauzen</h1><p class="muted">Orden recepten zoals jouw keuken werkt: per partie, menu of seizoen.</p><div class="savour-v13-list">${exampleRows(['voorbeeld-kalfsfond', 'voorbeeld-kalfsjus', 'voorbeeld-beurre-blanc', 'voorbeeld-hollandaise'])}</div>`;
    return;
  }
  const team = EXAMPLE_TEAM;
  host.innerHTML =
    banner(
      'Zo werkt een keukenteam. Het verdwijnt zodra je je eigen team maakt of ergens lid van wordt.',
      '<button type="button" class="btn gold" onclick="newSharedMap()">Maak je eigen keukenteam</button>'
    ) +
    `<div class="eyebrow">Keukenteam</div><h1 class="example-title" translate="no">${esc(team.name)}</h1><p class="muted">Eén receptenboek voor de hele brigade. Iedereen ziet elke wijziging meteen.</p>` +
    `<div class="example-members">${team.members.map(([name, role]) => `<div><i translate="no">${esc(name[0])}</i><b translate="no">${esc(name)}</b><small>${esc(role)}</small></div>`).join('')}</div>` +
    team.folders
      .map(
        ([name, ids]) =>
          `<h2 class="example-folder" translate="no">${esc(name)}</h2><div class="savour-v13-list">${exampleRows(ids)}</div>`
      )
      .join('');
}

// Welkomstscherm: één keer per account op dit apparaat, zolang de bibliotheek nog leeg is.
function showWelcomeFlow() {
  document.getElementById('welcomeFlow')?.remove();
  const first = String(account?.name || '')
    .trim()
    .split(/\s+/)[0];
  const steps = [
    ['1', 'Zet je recepten erin', 'Word, PDF of een foto van een kladje. Ook honderden tegelijk.'],
    ['2', 'Orden ze in mappen', 'Per partie, menu of seizoen, zoals jouw keuken werkt.'],
    ['3', 'Deel met je brigade', 'Iedereen kookt van dezelfde versie, op de eigen telefoon.']
  ];
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="welcome-flow" id="welcomeFlow" role="dialog" aria-modal="true" aria-labelledby="welcomeFlowTitle"><div class="welcome-box"><button type="button" class="welcome-close" onclick="closeWelcomeFlow()" aria-label="Sluiten">×</button><div class="eyebrow">Welkom bij Savour</div><h1 id="welcomeFlowTitle">${first ? `<span>Hoi </span><span translate="no">${esc(first)}</span><span>, je keuken staat klaar.</span>` : 'Je keuken staat klaar.'}</h1><p>In drie stappen heb je al je recepten op één plek.</p><ol class="welcome-steps">${steps.map(([n, title, text]) => `<li><span>${n}</span><div><b>${title}</b><small>${text}</small></div></li>`).join('')}</ol><button type="button" class="btn gold welcome-main" onclick="welcomeChoice('file')">Importeer je eerste recepten</button><div class="welcome-more"><button type="button" onclick="welcomeChoice('example')">Bekijk eerst het voorbeeld</button><button type="button" onclick="welcomeChoice('camera')">Foto van een kladje</button><button type="button" onclick="welcomeChoice('new')">Zelf een recept invoeren</button></div></div></div>`
  );
  document.querySelector('#welcomeFlow .welcome-main')?.focus();
}

function closeWelcomeFlow() {
  document.getElementById('welcomeFlow')?.remove();
}

function welcomeChoice(choice) {
  closeWelcomeFlow();
  if (choice === 'file') {
    go('import');
    showImportPanel();
  } else if (choice === 'camera') {
    go('import');
    openCameraImport();
  } else if (choice === 'new') newRecipe();
  else openExample('team');
}

// Startlijst boven de bibliotheek, tot alles gedaan is of je hem wegklikt.
function renderStartChecklist() {
  document.getElementById('startChecklist')?.remove();
  if (!currentUser || demoMode || onboardingFlag('checklist_hidden')) return;
  const steps = [
    ['Recepten toevoegen', recipes.length > 0, "go('import');showImportPanel()"],
    ['Een receptenmap maken', folders.length > 0, 'newFolder()'],
    ['Je team uitnodigen', sharedMaps.length > 0, 'newSharedMap()']
  ];
  const done = steps.filter(s => s[1]).length;
  if (done === steps.length) return;
  $('recipes')
    ?.querySelector('.section-head')
    ?.insertAdjacentHTML(
      'afterend',
      `<div id="startChecklist" class="start-checklist"><div class="start-checklist-head"><b>Aan de slag</b><span>${done} van ${steps.length} gedaan</span><button type="button" onclick="hideStartChecklist()" aria-label="Verbergen">×</button></div><div class="start-checklist-steps">${steps.map(([label, ok, action]) => `<button type="button" class="${ok ? 'is-done' : ''}" ${ok ? 'disabled' : `onclick="${action}"`}><i>${ok ? '✓' : ''}</i><span>${label}</span></button>`).join('')}</div></div>`
    );
}

function hideStartChecklist() {
  setOnboardingFlag('checklist_hidden');
  renderStartChecklist();
}
