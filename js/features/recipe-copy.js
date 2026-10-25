// Recept overnemen: wie een recept openbaar deelt, kan ontvangers toestaan het aan hun eigen receptenbibliotheek
// toe te voegen (tabel recipe_share_settings, supabase/2026-10-25-recept-overnemen.sql). De ontvanger krijgt een
// eigen kopie die hij zelf kan aanpassen; het origineel blijft van de maker.

// Instelling voor overnemen van één recept: { allowed, until } of null als de tabel er nog niet is (SQL niet
// uitgevoerd). allowed is alleen true zolang de gekozen periode loopt; until leeg = onbeperkt.
async function recipeCopySetting(recipeId) {
  try {
    const { data, error } = await supabaseClient
      .from('recipe_share_settings')
      .select('allow_copy, allow_copy_until')
      .eq('recipe_id', recipeId)
      .maybeSingle();
    if (error) return null;
    const until = data?.allow_copy_until ? new Date(data.allow_copy_until) : null;
    return { allowed: !!data?.allow_copy && (!until || until > new Date()), until };
  } catch (_) {
    return null;
  }
}

// Mag dit recept nu worden overgenomen? true/false, of null zonder tabel.
async function recipeAllowsCopy(recipeId) {
  const setting = await recipeCopySetting(recipeId);
  return setting ? setting.allowed : null;
}

// Hoelang ontvangers het recept mogen overnemen (in dagen; 0 = onbeperkt).
const COPY_PERIODS = [
  { days: 1 / 24, label: '1 uur' },
  { days: 1, label: '24 uur' },
  { days: 7, label: '7 dagen' },
  { days: 0, label: 'Onbeperkt' }
];

function copyUntilText(until) {
  if (!until) return t('Overnemen kan onbeperkt, tot je het uitzet.');
  const when = until.toLocaleString(currentLanguage === 'nl' ? 'nl-NL' : currentLanguage, {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${t('Overnemen kan tot')} ${when}.`;
}

// Schakelaar in het deelvenster ("Recept delen") voor je eigen recept, met daaronder de periode.
async function renderShareCopyToggle(recipeId) {
  const box = $('shareCopy');
  if (!box) return;
  box.hidden = true;
  const setting = await recipeCopySetting(recipeId);
  if (!setting) return;
  const rid = escJs(recipeId);
  const current = setting.allowed && setting.until ? (setting.until - Date.now()) / 86400000 : 0;
  // Bij een lopende periode: de kortste keuze die er nog in past; anders onbeperkt.
  const selected =
    setting.allowed && setting.until ? (COPY_PERIODS.find(x => x.days && current <= x.days)?.days ?? 7) : 0;
  box.hidden = false;
  box.innerHTML = `<label class="share-copy-toggle"><input type="checkbox" id="shareCopyInput"${setting.allowed ? ' checked' : ''} onchange="setRecipeAllowsCopy('${rid}')"><span><b>Ontvangers mogen dit recept overnemen</b><small>Wie is ingelogd, kan het dan toevoegen aan de eigen recepten. Jouw recept blijft van jou.</small></span></label><div class="share-copy-time" id="shareCopyTime"${setting.allowed ? '' : ' hidden'}><span>Hoelang?</span><div class="share-copy-periods" role="group" aria-label="Hoelang?">${COPY_PERIODS.map(
    x =>
      `<button type="button" class="${x.days === selected ? 'is-on' : ''}" data-days="${x.days}" onclick="setRecipeAllowsCopy('${rid}', ${x.days})">${x.label}</button>`
  ).join(
    ''
  )}</div><small id="shareCopyUntil">${setting.allowed ? esc(copyUntilText(setting.until)) : ''}</small></div>`;
}

// Aan/uit (de schakelaar) of een andere periode kiezen (days). Zonder days: de gekozen periode houden.
async function setRecipeAllowsCopy(recipeId, days) {
  const on = !!$('shareCopyInput')?.checked;
  if (days === undefined) days = +($('shareCopyTime')?.querySelector('.is-on')?.dataset.days || 0);
  const until = on && days ? new Date(Date.now() + days * 86400000) : null;
  const { error } = await supabaseClient.from('recipe_share_settings').upsert({
    recipe_id: recipeId,
    owner_id: currentUser.id,
    allow_copy: on,
    allow_copy_until: until ? until.toISOString() : null,
    updated_at: new Date().toISOString()
  });
  if (error) {
    console.warn('Overnemen instellen mislukt', error);
    toast('Instelling kon niet worden opgeslagen');
    return renderShareCopyToggle(recipeId);
  }
  const time = $('shareCopyTime');
  if (time) {
    time.hidden = !on;
    time.querySelectorAll('button').forEach(b => b.classList.toggle('is-on', +b.dataset.days === days));
    $('shareCopyUntil').textContent = on ? copyUntilText(until) : '';
  }
  toast(on ? 'Ontvangers kunnen dit recept nu overnemen' : 'Overnemen staat uit');
}

// Recept van een ander in een gedeelde map: staat overnemen aan, dan de knop alsnog naast Printen zetten.
async function addCopyButtonForShared(r) {
  if (!r || isOwnRecipe(r) || r.linkSlug || demoMode) return;
  if ((await recipeAllowsCopy(r.id)) !== true) return;
  r.allowCopy = true;
  if (String(currentId) !== String(r.id) || document.querySelector('[data-copy-recipe]')) return;
  const print = [...document.querySelectorAll('.rp-actions button')].find(b =>
    /printCurrentRecipe/.test(b.getAttribute('onclick') || '')
  );
  print?.insertAdjacentHTML(
    'beforebegin',
    `<button type="button" class="btn" data-copy-recipe onclick="copyLinkRecipe('${escJs(r.id)}')">${icon('plus')}${esc(t('Toevoegen aan mijn recepten'))}</button>`
  );
}

// Kopie maken in de eigen bibliotheek van de ingelogde gebruiker.
async function copyLinkRecipe(id) {
  const r = findRecipe(id);
  if (!r || !r.allowCopy) return;
  if (demoMode || !currentUser) {
    toast('Log in om recepten over te nemen');
    return;
  }
  const key = `savour_copied_${currentUser.id}`;
  let copied = {};
  try {
    copied = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (_) {}
  const earlier = copied[r.id] && recipes.find(x => String(x.id) === String(copied[r.id]));
  if (earlier) {
    const choice = await askChoice(`Je hebt dit recept al overgenomen\n\n“${earlier.title}” staat in je recepten.`, [
      { label: 'Mijn kopie openen', value: 'open', primary: true },
      { label: 'Nog een kopie maken', value: 'again' }
    ]);
    if (choice === 'open') openRecipe(earlier.id);
    if (choice !== 'again') return;
  }
  if (!(await checkRecipeRoom(1))) return;
  const { data, error } = await supabaseClient
    .from('recipes')
    .insert({
      user_id: currentUser.id,
      title: r.title || 'Recept',
      description: r.description || null,
      yield_text: r.yield || null,
      ingredients: r.ingredients || [],
      steps: r.steps || [],
      category_id: null,
      photo_url: r.photo || null
    })
    .select('id')
    .single();
  if (error) {
    console.error('Recept overnemen mislukt', error);
    if (/savour_recipe_limit/.test(error.message || '')) await checkRecipeRoom(Infinity);
    else toast('Het recept kon niet worden toegevoegd');
    return;
  }
  copied[r.id] = data.id;
  try {
    localStorage.setItem(key, JSON.stringify(copied));
  } catch (_) {}
  await loadDatabaseState();
  refreshSidebar();
  renderRecipes();
  toast('Toegevoegd aan je recepten');
  openRecipe(data.id);
}
