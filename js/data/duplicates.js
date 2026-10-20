// Herkennen van exact dubbele recepten (zelfde titel, opbrengst, ingrediÃ«nten en stappen).

// ================= SAVOUR 3.0 v6 =================
// 1) Exact duplicate protection + cleanup
function v6Norm(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function v6Fingerprint(r) {
  return [
    v6Norm(r.title),
    v6Norm(r.yield),
    ...(Array.isArray(r.ingredients) ? r.ingredients : []).map(v6Norm),
    '§',
    ...(Array.isArray(r.steps) ? r.steps : []).map(v6Norm)
  ].join('|');
}

function v6FindDuplicate(title, ingredients, steps, yieldText, excludeId = null) {
  const fp = v6Fingerprint({ title, ingredients, steps, yield: yieldText });
  return recipes.find(r => String(r.id) !== String(excludeId ?? '') && v6Fingerprint(r) === fp) || null;
}

async function v6CleanupExactDuplicates() {
  if (!currentUser || demoMode || !Array.isArray(recipes) || recipes.length < 2) return false;
  const seen = new Map(),
    duplicates = [];
  for (const r of recipes) {
    const fp = v6Fingerprint(r);
    if (!fp) continue;
    if (seen.has(fp)) duplicates.push({ dup: r, keep: seen.get(fp) });
    else seen.set(fp, r);
  }
  if (!duplicates.length) return false;
  const ids = duplicates.map(x => x.dup.id);
  // Move relationship references to the retained recipe before deleting duplicates.
  for (const { dup, keep } of duplicates) {
    try {
      const tables = [
        ['folder_recipes', 'folder_id'],
        ['favorites', 'user_id'],
        ['shared_map_recipes', 'shared_map_id'],
        ['shared_folder_recipes', 'shared_folder_id']
      ];
      // Favorites has no recipe-only unique key that needs moving; delete duplicate favorite rows.
      const { data: folderLinks } = await supabaseClient
        .from('folder_recipes')
        .select('folder_id')
        .eq('recipe_id', dup.id);
      if (folderLinks?.length) {
        for (const x of folderLinks) {
          await supabaseClient
            .from('folder_recipes')
            .upsert({ folder_id: x.folder_id, recipe_id: keep.id }, { onConflict: 'folder_id,recipe_id' });
        }
        await supabaseClient.from('folder_recipes').delete().eq('recipe_id', dup.id);
      }
      await supabaseClient.from('favorites').delete().eq('recipe_id', dup.id).eq('user_id', currentUser.id);
      // Shared links are moved where possible, then duplicate links removed if a unique conflict exists.
      const { data: smLinks } = await supabaseClient
        .from('shared_map_recipes')
        .select('shared_map_id')
        .eq('recipe_id', dup.id);
      if (smLinks?.length) {
        for (const x of smLinks) {
          await supabaseClient
            .from('shared_map_recipes')
            .upsert({ shared_map_id: x.shared_map_id, recipe_id: keep.id }, { onConflict: 'shared_map_id,recipe_id' });
        }
        await supabaseClient.from('shared_map_recipes').delete().eq('recipe_id', dup.id);
      }
      const { data: sfLinks } = await supabaseClient
        .from('shared_folder_recipes')
        .select('shared_folder_id')
        .eq('recipe_id', dup.id);
      if (sfLinks?.length) {
        for (const x of sfLinks) {
          await supabaseClient
            .from('shared_folder_recipes')
            .upsert(
              { shared_folder_id: x.shared_folder_id, recipe_id: keep.id },
              { onConflict: 'shared_folder_id,recipe_id' }
            );
        }
        await supabaseClient.from('shared_folder_recipes').delete().eq('recipe_id', dup.id);
      }
      const { error } = await supabaseClient.from('recipes').delete().eq('id', dup.id).eq('user_id', currentUser.id);
      if (error) console.warn('Savour v6 duplicate cleanup skipped', dup.title, error);
    } catch (e) {
      console.warn('Savour v6 duplicate cleanup error', e);
    }
  }
  return true;
}
