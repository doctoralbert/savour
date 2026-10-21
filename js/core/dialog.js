// Eigen bevestig- en invulvenster in de huisstijl, in plaats van de standaard browservensters
// (confirm/prompt). Die worden in sommige ingebouwde browsers niet getoond en automatisch geweigerd.
//
//   if (!(await askConfirm('Map verwijderen?\n\nDe recepten blijven bewaard.'))) return;
//   const naam = await askText('Nieuwe naam voor deze map', huidigeNaam); // null bij annuleren
//   const cat = await askChoice('In welke categorie?', [{ value: 'Vis', label: 'Vis' }, …]); // null bij annuleren
//
// De eerste alinea van de tekst wordt de titel, de rest de uitleg.

let dialogResolve = null;

function dialogElement() {
  let el = document.getElementById('svDialog');
  if (el) return el;
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog" id="svDialog" role="dialog" aria-modal="true" aria-labelledby="svDialogTitle">
      <form class="sv-dialog-box" novalidate>
        <h2 id="svDialogTitle" class="sv-dialog-title"></h2>
        <p class="sv-dialog-text"></p>
        <input class="sv-dialog-input" type="text" autocomplete="off" aria-labelledby="svDialogTitle">
        <div class="sv-dialog-choices" hidden></div>
        <div class="sv-dialog-actions">
          <button type="button" class="btn" data-cancel>Annuleren</button>
          <button type="submit" class="btn gold" data-ok>OK</button>
        </div>
      </form>
    </div>`
  );
  el = document.getElementById('svDialog');
  el.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const input = el.querySelector('.sv-dialog-input');
    closeDialog(input.hidden ? true : input.value);
  });
  el.querySelector('[data-cancel]').addEventListener('click', () => closeDialog(null));
  // Klik naast het venster of Esc annuleert.
  el.addEventListener('mousedown', e => {
    if (e.target === el) closeDialog(null);
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeDialog(null);
    }
  });
  return el;
}

function closeDialog(value) {
  const el = document.getElementById('svDialog');
  el?.classList.remove('open');
  const resolve = dialogResolve;
  dialogResolve = null;
  if (resolve) resolve(value);
  el?._returnFocus?.focus?.();
}

function openDialog({ message, confirmLabel, danger, withInput, value, choices }) {
  // Een eventueel nog open venster eerst als 'annuleren' afsluiten.
  if (dialogResolve) closeDialog(null);
  const el = dialogElement();
  const [title, ...rest] = String(message || '').split(/\n\s*\n/);
  el.querySelector('.sv-dialog-title').textContent = title.trim();
  const text = el.querySelector('.sv-dialog-text');
  text.textContent = rest.join('\n\n').trim();
  text.hidden = !text.textContent;
  const input = el.querySelector('.sv-dialog-input');
  input.hidden = !withInput;
  input.value = withInput ? String(value ?? '') : '';
  const ok = el.querySelector('[data-ok]');
  ok.textContent = confirmLabel || '';
  ok.hidden = !!choices;
  ok.classList.toggle('gold', !danger);
  ok.classList.toggle('sv-danger', !!danger);
  // Keuzeknoppen: elke knop sluit het venster met zijn eigen waarde.
  const box = el.querySelector('.sv-dialog-choices');
  box.hidden = !choices;
  box.innerHTML = '';
  (choices || []).forEach(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sv-dialog-choice' + (c.primary ? ' is-primary' : '');
    b.textContent = c.label;
    if (c.hint) b.insertAdjacentHTML('beforeend', `<small>${esc(c.hint)}</small>`);
    b.addEventListener('click', () => closeDialog({ choice: c.value }));
    box.appendChild(b);
  });
  el._returnFocus = document.activeElement;
  el.classList.add('open');
  setTimeout(() => {
    if (choices) box.querySelector('.is-primary, button')?.focus();
    else if (withInput) {
      input.focus();
      input.select();
    } else ok.focus();
  }, 0);
  return new Promise(resolve => (dialogResolve = resolve));
}

// Vraagt om bevestiging. Geeft true (bevestigd) of false (geannuleerd).
async function askConfirm(message, { confirmLabel, danger } = {}) {
  const destructive = /verwijder|verlaten|definitief/i.test(message);
  const label = confirmLabel || (/verlaten/i.test(message) ? 'Verlaten' : destructive ? 'Verwijderen' : 'Doorgaan');
  const result = await openDialog({ message, confirmLabel: label, danger: danger ?? destructive });
  return result === true;
}

// Laat de gebruiker kiezen uit een paar opties. choices: [{ value, label, hint?, primary? }].
// Geeft de gekozen value, of null bij annuleren.
async function askChoice(message, choices) {
  const result = await openDialog({ message, choices });
  return result && typeof result === 'object' ? result.choice : null;
}

// Vraagt om een tekst (bijv. een nieuwe naam). Geeft de tekst, of null bij annuleren.
async function askText(message, value = '', { confirmLabel = 'Opslaan' } = {}) {
  const result = await openDialog({ message, confirmLabel, withInput: true, value });
  return typeof result === 'string' ? result : null;
}
