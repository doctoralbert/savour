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
    .map(c => `<option value="${esc(c)}" ${c === selected ? 'selected' : ''}>${esc(c)}</option>`)
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
        `<div class="structured-row"><input data-ingredient-row="${i}" value="${esc(x)}" placeholder="Ingrediënt ${i + 1}" onkeydown="editorRowKey(event,'ingredient',${i})" oninput="syncStructuredEditor()"><button type="button" class="structured-remove" tabindex="-1" title="Ingrediënt verwijderen" onclick="removeIngredientRow(${i})">×</button></div>`
    )
    .join('');
  $('stepEditor').innerHTML = st
    .map(
      (x, i) =>
        `<div class="structured-row"><textarea data-step-row="${i}" placeholder="Bereidingsstap ${i + 1}" onkeydown="editorRowKey(event,'step',${i})" oninput="syncStructuredEditor()">${esc(x)}</textarea><button type="button" class="structured-remove" tabindex="-1" title="Bereidingsstap verwijderen" onclick="removeStepRow(${i})">×</button></div>`
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
  // Tab: naar de volgende regel (Shift+Tab: de vorige). Op de laatste regel met tekst komt er een nieuwe bij;
  // op een lege laatste regel gaat Tab gewoon door naar het volgende veld.
  if (e.key === 'Tab') {
    const rows = document.querySelectorAll(type === 'ingredient' ? '[data-ingredient-row]' : '[data-step-row]');
    const to = e.shiftKey ? index - 1 : index + 1;
    if (rows[to]) {
      e.preventDefault();
      rows[to].focus();
    } else if (!e.shiftKey && e.target.value.trim()) {
      e.preventDefault();
      if (type === 'ingredient') addIngredientRow();
      else addStepRow();
    }
    return;
  }
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
  // Trefwoordvoorstel alleen bij een nieuw recept; een bestaand recept houdt zijn categorie.
  $('fCategory').dataset.manual = r?.id ? '1' : '';
  $('fCategory').dataset.base = r?.category || 'Eigen recepten';
  $('fCategoryHint').hidden = true;
  if (!r?.id) suggestEditorCategory();
  $('fPhoto').value = '';
  $('photoPreview').style.display = r?.photo ? 'block' : 'none';
  // Zonder foto geen lege src: die laat de browser de pagina zelf als afbeelding opvragen.
  if (r?.photo) $('photoPreview').src = r.photo;
  else $('photoPreview').removeAttribute('src');
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
  const duplicate = findDuplicateRecipe(title, ingredients, steps, yieldText, currentId);
  if (duplicate) {
    toast(`Dit recept bestaat al: “${duplicate.title}”`);
    return;
  }
  // Gratis account aan de 100 recepten: een nieuw recept kan niet, bewerken wel.
  if (!currentId && !(await checkRecipeRoom(1))) return;
  // Past de naam bij meerdere categorieën, dan kiest de chef zelf.
  if (!(await confirmEditorCategory())) return;
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
    refreshSidebar();
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
      // Een nieuwe foto wordt verkleind voordat hij in de database komt.
      if (file) photo = await compressPhoto(file, 1600);
      const savedId = await save();
      window.__aiImportedPhoto = '';
      await loadDatabaseState();
      done();
      toast('Recept opgeslagen');
      if (savedId) openRecipe(savedId);
    } catch (e) {
      console.error('Savour saveRecipe error', e);
      done();
      // De database houdt de 100 recepten van een gratis account tegen, ook als de app het niet wist.
      if (/savour_recipe_limit/.test(e?.message || '')) return checkRecipeRoom(Infinity);
      toast('Recept kon niet worden opgeslagen: ' + (e?.message || 'onbekende fout'));
    }
  })();
}
