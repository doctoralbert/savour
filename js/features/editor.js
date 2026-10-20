// Recept aanmaken en bewerken.

function restoreEditorView() {
  const ed = document.querySelector('#inlineEditorHost .editor');
  if (ed) {
    $('editor').appendChild(ed);
    ed.classList.remove('inline-editor');
  }
  if ($('inlineEditorHost')) {
    $('inlineEditorHost').querySelector('.editor-switchbar')?.remove();
    $('inlineEditorHost').style.display = 'none';
  }
  const choices = document.querySelector('#import .add-choice-grid');
  if (choices) choices.style.display = 'grid';
}

function mountEditorInline() {
  const ed = document.querySelector('#editor .editor');
  if (!ed) return;
  const host = $('inlineEditorHost');
  if (ed.parentElement !== host) host.appendChild(ed);
  ed.classList.add('inline-editor');
  host.querySelector('.editor-switchbar')?.remove();
  host.style.display = 'block';
  const choices = document.querySelector('#import .add-choice-grid');
  if (choices) choices.style.display = 'grid';
  $('importPanel').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderEditorCategories(selected) {
  let vals = [...new Set(['Eigen recepten', ...categories])];
  $('fCategory').innerHTML = vals
    .map(c => `<option value="${escAttr(c)}" ${c === selected ? 'selected' : ''}>${esc(c)}</option>`)
    .join('');
}

function previewPhoto(input) {
  let f = input.files[0];
  if (!f) return;
  let reader = new FileReader();
  reader.onload = e => {
    $('photoPreview').src = e.target.result;
    $('photoPreview').style.display = 'block';
  };
  reader.readAsDataURL(f);
}

function renderEditorRows(ingredients = [], steps = []) {
  const ing = Array.isArray(ingredients) && ingredients.length ? ingredients : [''];
  const st = Array.isArray(steps) && steps.length ? steps : [''];
  $('ingredientEditor').innerHTML = ing
    .map(
      (x, i) =>
        `<div class="structured-row"><input data-ingredient-row="${i}" value="${escAttr(x)}" placeholder="Ingrediënt ${i + 1}" onkeydown="editorRowKey(event,'ingredient',${i})" oninput="syncStructuredEditor()"><button type="button" class="structured-remove" title="Ingrediënt verwijderen" onclick="removeIngredientRow(${i})">×</button></div>`
    )
    .join('');
  $('stepEditor').innerHTML = st
    .map(
      (x, i) =>
        `<div class="structured-row"><textarea data-step-row="${i}" placeholder="Bereidingsstap ${i + 1}" onkeydown="editorRowKey(event,'step',${i})" oninput="syncStructuredEditor()">${esc(x)}</textarea><button type="button" class="structured-remove" title="Bereidingsstap verwijderen" onclick="removeStepRow(${i})">×</button></div>`
    )
    .join('');
  syncStructuredEditor();
}

function syncStructuredEditor() {
  const ins = [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value.trim()).filter(Boolean);
  const sts = [...document.querySelectorAll('[data-step-row]')].map(x => x.value.trim()).filter(Boolean);
  if ($('fIngredients')) $('fIngredients').value = ins.join('\n');
  if ($('fSteps')) $('fSteps').value = sts.join('\n');
}

function editorRowKey(e, type, index) {
  if (e.key !== 'Enter') return;
  if (type === 'ingredient') {
    e.preventDefault();
    addIngredientRow();
    setTimeout(() => document.querySelector('[data-ingredient-row]:last-of-type')?.focus(), 0);
  } else {
    e.preventDefault();
    addStepRow();
    setTimeout(() => document.querySelector('[data-step-row]:last-of-type')?.focus(), 0);
  }
}

function addIngredientRow() {
  const vals = [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value);
  vals.push('');
  renderEditorRows(
    vals,
    [...document.querySelectorAll('[data-step-row]')].map(x => x.value)
  );
  setTimeout(() => {
    const a = document.querySelectorAll('[data-ingredient-row]');
    a[a.length - 1]?.focus();
  }, 0);
}

function removeIngredientRow(i) {
  const vals = [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value);
  if (vals.length <= 1) {
    vals[0] = '';
  } else vals.splice(i, 1);
  renderEditorRows(
    vals,
    [...document.querySelectorAll('[data-step-row]')].map(x => x.value)
  );
}

function addStepRow() {
  const vals = [...document.querySelectorAll('[data-step-row]')].map(x => x.value);
  vals.push('');
  renderEditorRows(
    [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value),
    vals
  );
  setTimeout(() => {
    const a = document.querySelectorAll('[data-step-row]');
    a[a.length - 1]?.focus();
  }, 0);
}

function removeStepRow(i) {
  const vals = [...document.querySelectorAll('[data-step-row]')].map(x => x.value);
  if (vals.length <= 1) {
    vals[0] = '';
  } else vals.splice(i, 1);
  renderEditorRows(
    [...document.querySelectorAll('[data-ingredient-row]')].map(x => x.value),
    vals
  );
}

function fillEditor(r, title = 'Nieuw recept') {
  currentId = r?.id || null;
  $('editorTitle').textContent = title;
  $('fTitle').value = r?.title || '';
  $('fYield').value = r?.yield || '';
  renderEditorCategories(r?.category || 'Eigen recepten');
  $('fPhoto').value = '';
  $('photoPreview').style.display = r?.photo ? 'block' : 'none';
  $('photoPreview').src = r?.photo || '';
  renderEditorRows(r?.ingredients || [], r?.steps || []);
}

function editRecipe(id) {
  window.__aiImportedPhoto = '';
  const r = recipes.find(x => String(x.id) === String(id));
  if (!r) return;
  fillEditor(r, 'Recept bewerken');
  recipeReturnView = 'recipes';
  go('editor');
}

function newRecipe() {
  window.__aiImportedPhoto = '';
  fillEditor(null, 'Nieuw recept');
  if (document.querySelector('#import.view.active')) {
    mountEditorInline();
    return;
  }
  restoreEditorView();
  go('editor');
}

// Controleert het recept in de editor en weigert een exacte kopie van een bestaand recept.
async function saveRecipe() {
  syncStructuredEditor();
  if (!currentUser) {
    toast('Log eerst in om een recept op te slaan');
    return;
  }
  const title = $('fTitle').value.trim();
  if (!title) {
    toast('Vul eerst een receptnaam in');
    $('fTitle').focus();
    return;
  }
  const ingredients = ($('fIngredients').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const steps = ($('fSteps').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const yieldText = $('fYield').value.trim();
  const duplicate = v6FindDuplicate(title, ingredients, steps, yieldText, currentId);
  if (duplicate) {
    toast(`Dit recept bestaat al: “${duplicate.title}”`);
    return;
  }
  return persistRecipe();
}

function persistRecipe() {
  syncStructuredEditor();
  if (!currentUser) {
    toast('Log eerst in om een recept op te slaan');
    return;
  }
  const title = $('fTitle').value.trim();
  if (!title) {
    toast('Vul eerst een receptnaam in');
    $('fTitle').focus();
    return;
  }
  const ingredients = ($('fIngredients').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const steps = ($('fSteps').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const categoryName = $('fCategory').value || 'Eigen recepten';
  const btn = document.querySelector('#editor .actions .btn.gold');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Opslaan…';
  }
  const done = () => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Opslaan';
    }
  };
  if (demoMode) {
    const old = currentId ? recipes.find(x => String(x.id) === String(currentId)) : null;
    const obj = {
      id: old?.id || 'demo-' + Date.now(),
      title,
      description: old?.description || '',
      yield: $('fYield').value.trim(),
      ingredients,
      steps,
      category: categoryName,
      photo: old?.photo || window.__aiImportedPhoto || ''
    };
    if (old) Object.assign(old, obj);
    else recipes.unshift(obj);
    window.__aiImportedPhoto = '';
    done();
    renderRecipes();
    renderHome();
    openRecipe(obj.id);
    toast('Recept opgeslagen');
    return;
  }
  (async () => {
    try {
      const old = currentId ? recipes.find(x => String(x.id) === String(currentId)) : null;
      let categoryId = null;
      if (categoryName && categoryName !== 'Eigen recepten') {
        const { data: cat, error } = await supabaseClient
          .from('categories')
          .select('id')
          .eq('user_id', currentUser.id)
          .eq('name', categoryName)
          .maybeSingle();
        if (error) throw error;
        categoryId = cat?.id || null;
      }
      let photo = old?.photo || window.__aiImportedPhoto || '';
      const file = $('fPhoto').files[0];
      const save = async () => {
        const payload = {
          title,
          description: old?.description || null,
          yield_text: $('fYield').value.trim() || null,
          ingredients,
          steps,
          category_id: categoryId,
          photo_url: photo || null
        };
        const result = currentId
          ? await supabaseClient.from('recipes').update(payload).eq('id', currentId).eq('user_id', currentUser.id)
          : await supabaseClient
              .from('recipes')
              .insert({ ...payload, user_id: currentUser.id })
              .select('id')
              .single();
        if (result.error) throw result.error;
        return currentId || result.data?.id;
      };
      let savedId;
      if (file) {
        photo = await readImageAsDataUrl(file);
        savedId = await save();
      } else savedId = await save();
      window.__aiImportedPhoto = '';
      await loadDatabaseState();
      done();
      toast('Recept opgeslagen');
      if (savedId) openRecipe(savedId);
    } catch (e) {
      console.error('Savour saveRecipe error', e);
      done();
      toast('Recept kon niet worden opgeslagen: ' + (e?.message || 'onbekende fout'));
    }
  })();
}
