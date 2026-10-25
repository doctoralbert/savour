// Al je recepten downloaden (Savour Pro): als Word-document om te lezen of te printen, of als back-up
// (JSON) met recepten en mappen. Alleen je eigen bibliotheek; recepten van collega's in gedeelde mappen niet.

function exportFileName(ext) {
  const day = new Date().toISOString().slice(0, 10);
  return `savour-recepten-${day}.${ext}`;
}

function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Mappen waar een recept in staat (namen), voor de back-up.
function recipeFolderNames(id) {
  return folders.filter(f => !f.system && (f.recipeIds || []).includes(id)).map(f => f.name);
}

async function exportRecipes(kind) {
  if (!isPro() && !demoMode) {
    if (
      await askConfirm(
        `Recepten downloaden is onderdeel van Savour Pro\n\nJe recepten blijven altijd in Savour staan, ook zonder Pro: je kunt ze bekijken en printen. Met Savour Pro download je ze ook in één keer.`,
        { confirmLabel: 'Bekijk Savour Pro' }
      )
    )
      openPublicInfo('pro');
    return;
  }
  const list = [...recipes].sort((a, b) => String(a.title).localeCompare(String(b.title), 'nl'));
  if (!list.length) {
    toast('Je hebt nog geen recepten om te downloaden');
    return;
  }
  if (kind === 'json') {
    const data = {
      app: 'Savour',
      version: 1,
      exported_at: new Date().toISOString(),
      recipes: list.map(r => ({
        title: r.title,
        category: r.category || '',
        yield: r.yield || '',
        description: r.description || '',
        ingredients: r.ingredients || [],
        steps: r.steps || [],
        folders: recipeFolderNames(r.id)
      })),
      folders: folders
        .filter(f => !f.system)
        .map(f => ({ name: f.name, recipes: (f.recipeIds || []).map(id => findRecipe(id)?.title).filter(Boolean) }))
    };
    downloadFile(exportFileName('json'), JSON.stringify(data, null, 2), 'application/json');
  } else {
    // Word opent dit HTML-bestand als document (.doc); elk recept op een nieuwe pagina.
    const block = r =>
      `<h1>${esc(r.title)}</h1>${r.category || r.yield ? `<p class="meta">${esc([r.category, r.yield && `Opbrengst: ${r.yield}`].filter(Boolean).join(' · '))}</p>` : ''}${
        r.description ? `<p>${esc(r.description)}</p>` : ''
      }<h2>Ingrediënten</h2>${(r.ingredients || []).length ? `<ul>${r.ingredients.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p>—</p>'}${
        (r.steps || []).length ? `<h2>Bereiding</h2><ol>${r.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''
      }`;
    const doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>Savour recepten</title><style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt}h1{font-family:Georgia,serif;font-size:20pt;font-weight:normal;margin:0 0 4pt}h2{font-family:Georgia,serif;font-size:13pt;font-weight:normal;margin:14pt 0 4pt}.meta{color:#666}.cover h1{font-size:28pt}</style></head><body><div class="cover"><h1>Mijn recepten</h1><p class="meta">${list.length} recepten · gedownload uit Savour op ${esc(new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }))}</p></div>${list
      .map(r => `<br clear="all" style="page-break-before:always">${block(r)}`)
      .join('')}</body></html>`;
    downloadFile(exportFileName('doc'), '﻿' + doc, 'application/msword');
  }
  toast(`${list.length} recepten gedownload`);
}
