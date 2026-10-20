// Herkennen van exact dubbele recepten (zelfde titel, opbrengst, ingrediënten en stappen).
// Savour verwijdert nooit zelf recepten: een dubbel wordt alleen tegengehouden bij opslaan en importeren,
// met een melding aan de gebruiker.

function normalizeForCompare(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function recipeFingerprint(r) {
  return [
    normalizeForCompare(r.title),
    normalizeForCompare(r.yield),
    ...(Array.isArray(r.ingredients) ? r.ingredients : []).map(normalizeForCompare),
    '§',
    ...(Array.isArray(r.steps) ? r.steps : []).map(normalizeForCompare)
  ].join('|');
}

function findDuplicateRecipe(title, ingredients, steps, yieldText, excludeId = null) {
  const fp = recipeFingerprint({ title, ingredients, steps, yield: yieldText });
  return recipes.find(r => String(r.id) !== String(excludeId ?? '') && recipeFingerprint(r) === fp) || null;
}
