// Account en instellingen: profiel, profielfoto, wachtwoord, thema en account verwijderen.

// Het gekozen thema ('dark' of 'light'); standaard donker.
function currentTheme() {
  return localStorage.getItem('savour_theme') === 'light' ? 'light' : 'dark';
}

// Past het thema toe. Het lichte thema geldt alleen binnen de app (ingelogd); publieke pagina's blijven donker.
function applyTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.savourTheme = value;
  document.body.classList.toggle('savour-light', !!currentUser && value === 'light');
  localStorage.setItem('savour_theme', value);
}

// Keuze uit Instellingen: direct toepassen en in het profiel bewaren (niet in de demo).
async function setTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  applyTheme(value);
  if (currentUser && !demoMode) {
    const { error } = await supabaseClient.from('profiles').update({ theme: value }).eq('id', currentUser.id);
    if (error) {
      console.error('Thema opslaan mislukt:', error);
      toast(t('Weergave kon niet worden bewaard'));
    }
  }
}

async function saveAccount() {
  if (!currentUser) return;
  const name = $('accountName').value.trim() || 'Chef-kok';
  const role = $('accountRole').value.trim() || 'Chef-kok';
  const email = $('accountEmail').value.trim();
  if (!email) {
    toast(t('Vul een geldig e-mailadres in'));
    return;
  }
  if (email !== currentUser.email) {
    const { data: authData, error: ae } = await supabaseClient.auth.updateUser({ email });
    if (ae) {
      console.error(ae);
      toast(ae.message || t('E-mailadres kon niet worden gewijzigd'));
      return;
    }
    const activeAuthEmail = authData?.user?.email || currentUser.email;
    if (activeAuthEmail !== email) {
      toast(t('Controleer je nieuwe e-mailadres om de wijziging te bevestigen'));
      return;
    }
    currentUser = authData.user;
  }
  const theme = localStorage.getItem('savour_theme') || 'dark';
  const { error } = await supabaseClient
    .from('profiles')
    .update({ name, function_title: role, email: currentUser.email, theme })
    .eq('id', currentUser.id);
  if (error) {
    console.error(error);
    toast(t('Account kon niet worden opgeslagen'));
    return;
  }
  account = { ...account, name, role, email: currentUser.email };
  updateProfileHeader();
  renderSettings();
  toast(t('Account opgeslagen'));
}

async function changePassword() {
  if (!currentUser) return;
  const value = $('accountPassword').value.trim();
  if (!value) {
    toast(t('Vul eerst een nieuw wachtwoord in'));
    return;
  }
  if (value.length < 6) {
    toast(t('Een wachtwoord moet minimaal 6 tekens bevatten'));
    return;
  }
  const { error } = await supabaseClient.auth.updateUser({ password: value });
  if (error) {
    console.error(error);
    toast(error.message || t('Wachtwoord kon niet worden gewijzigd'));
    return;
  }
  $('accountPassword').value = '';
  toast(t('Wachtwoord gewijzigd'));
}

function updateProfileHeader() {
  let a = document.querySelector('.profile .avatar');
  a.innerHTML = account.photo
    ? `<img src="${esc(account.photo)}" alt="Profielfoto">`
    : (account.name || 'M').charAt(0).toUpperCase();
  document.querySelector('.profile b').textContent = account.name || 'Mijn account';
  document.querySelector('.profile small').textContent = account.role || 'Mijn account';
}

function startProfilePhoto(input) {
  let f = input.files[0];
  if (!f) return;
  let reader = new FileReader();
  reader.onload = e => openCrop(e.target.result, 'profile');
  reader.readAsDataURL(f);
}

function openCrop(src, target = 'profile') {
  cropTarget = target;
  cropImageSrc = src;
  cropZoom = 1;
  cropX = 0;
  cropY = 0;
  const img = $('cropImage');
  if (!img) return;
  img.src = src;
  img.onload = () => {
    positionCropImage();
  };
  $('cropZoom').value = '1';
  $('cropModal').classList.add('open');
  positionCropImage();
}

function positionCropImage() {
  const img = $('cropImage'),
    stage = $('cropStage');
  if (!img || !stage) return;
  const sw = stage.clientWidth || 360,
    sh = stage.clientHeight || 360,
    iw = img.naturalWidth || sw,
    ih = img.naturalHeight || sh;
  const scale = Math.max(sw / iw, sh / ih) * cropZoom;
  img.style.width = `${iw * scale}px`;
  img.style.height = `${ih * scale}px`;
  img.style.left = `${(sw - iw * scale) / 2 + cropX}px`;
  img.style.top = `${(sh - ih * scale) / 2 + cropY}px`;
}

function closeCrop() {
  cropTarget = null;
  cropImageSrc = '';
  $('cropModal')?.classList.remove('open');
}

// Zoomen en verslepen in het uitsnijvenster voor foto's.
function setupCropControls() {
  $('cropZoom')?.addEventListener('input', e => {
    cropZoom = Number(e.target.value) || 1;
    positionCropImage();
  });
  $('cropStage')?.addEventListener('pointerdown', e => {
    const stage = $('cropStage');
    if (!stage || !cropImageSrc) return;
    dragging = true;
    cropStartX = e.clientX;
    cropStartY = e.clientY;
    cropBaseX = cropX;
    cropBaseY = cropY;
    stage.setPointerCapture?.(e.pointerId);
    $('cropImage')?.classList.add('dragging');
  });
  $('cropStage')?.addEventListener('pointermove', e => {
    if (!dragging) return;
    cropX = cropBaseX + (e.clientX - cropStartX);
    cropY = cropBaseY + (e.clientY - cropStartY);
    positionCropImage();
  });
  $('cropStage')?.addEventListener('pointerup', () => {
    dragging = false;
    $('cropImage')?.classList.remove('dragging');
  });
  $('cropStage')?.addEventListener('pointercancel', () => {
    dragging = false;
    $('cropImage')?.classList.remove('dragging');
  });
}

async function saveCrop() {
  if (!cropTarget || !cropImageSrc) return;
  const img = $('cropImage'),
    stage = $('cropStage');
  if (!img || !stage) return;
  const canvas = document.createElement('canvas');
  const size = 320;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const sw = stage.clientWidth,
    sh = stage.clientHeight,
    iw = img.naturalWidth,
    ih = img.naturalHeight,
    scale = Math.max(sw / iw, sh / ih) * cropZoom;
  const left = (sw - iw * scale) / 2 + cropX,
    top = (sh - ih * scale) / 2 + cropY;
  const sx = Math.max(0, -left) / scale,
    sy = Math.max(0, -top) / scale,
    sSize = Math.min(iw - sx, ih - sy, sw / scale, sh / scale);
  ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, size, size);
  const data = canvas.toDataURL('image/jpeg', 0.88);
  if (cropTarget === 'profile' && currentUser) {
    const { error } = await supabaseClient.from('profiles').update({ avatar_url: data }).eq('id', currentUser.id);
    if (error) {
      console.error(error);
      toast(error.message || t('Profielfoto kon niet worden opgeslagen'));
      return;
    }
    account.photo = data;
    updateProfileHeader();
    renderSettings();
    toast(t('Profielfoto opgeslagen'));
  }
  closeCrop();
}

function renderSettings() {
  if (!currentUser) return;
  document.querySelectorAll('input[name="savourTheme"]').forEach(x => (x.checked = x.value === currentTheme()));
  $('accountName').value = account.name || '';
  $('accountRole').value = account.role || '';
  $('accountEmail').value = account.email || '';
  $('accountPassword').value = account.password || '';
  $('accountAvatar').innerHTML = account.photo
    ? `<img src="${esc(account.photo)}" alt="Profielfoto">`
    : (account.name || 'M').charAt(0).toUpperCase();
  $('settingsCategories').innerHTML = categories
    .map(
      c =>
        `<div class="member"><div><b>${esc(c)}</b><small class="muted">Eigen categorie</small></div><div style="display:flex;gap:7px;justify-content:flex-end"><button class="btn small" onclick="renameCategory('${escJs(c)}')">Naam wijzigen</button><button class="btn small" onclick="removeCategory('${escJs(c)}')">Verwijderen</button></div></div>`
    )
    .join('');
}

// Extend folder modal save for shared maps without changing the regular folder flow.
async function deleteAccount() {
  if (!currentUser) return;
  const ok = await askConfirm(
    'Weet je zeker dat je je account definitief wilt verwijderen?\n\nJe persoonlijke recepten, mappen, favorieten en profielgegevens worden verwijderd. Deze actie kan niet ongedaan worden gemaakt.'
  );
  if (!ok) return;
  try {
    const { error } = await supabaseClient.rpc('delete_my_account');
    if (error) throw error;
    await supabaseClient.auth.signOut();
    currentUser = null;
    recipes = [];
    folders = [];
    favorites = [];
    sharedMaps = [];
    sharedRecipes = [];
    account = { name: '', role: 'Chef-kok', email: '', password: '', photo: '' };
    showLanding();
    toast('Account verwijderd');
  } catch (e) {
    console.error(e);
    toast(e.message || 'Account kon niet worden verwijderd');
  }
}
