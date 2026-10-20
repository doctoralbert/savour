/* Savour 3.0 v15 final consistency layer */
(function () {
  const $id = id => document.getElementById(id);
  document.documentElement.lang = 'nl';

  // Make the compact category controls match the existing Savour buttons.
  const style = document.createElement('style');
  style.id = 'savour-v15-consistency-style';
  style.textContent = `
    #recipes .content,#recipes #recipeGrid,#recipes .recipe-library-shell,#recipes .savour-v14-list,#recipes .savour-v13-list{width:100%!important;max-width:none!important;min-width:0!important}
    #recipes #recipeGrid{display:block!important}
    #recipes .savour-v14-row,#recipes .savour-v14-bulk-row{width:100%!important;max-width:none!important;min-height:34px!important;padding:0 10px!important}
    #recipes .savour-v14-row .v14-name,#recipes .savour-v14-bulk-row .v14-name{font-family:Inter,Arial,sans-serif!important;font-size:13px!important;font-weight:500!important;letter-spacing:-.01em}
    #recipes .savour-v14-row:hover{padding-left:14px!important}
    #recipes #categoryBar{gap:6px!important}
    #recipes #categoryBar .btn{font-size:11px!important;padding:7px 12px!important;border-radius:6px!important;line-height:1.1!important}
    #recipes .savour-v13-alphabet{display:flex;flex-wrap:wrap;gap:3px!important;align-items:center}
    #recipes .savour-v13-alphabet button{min-width:24px!important;height:24px!important;padding:0 5px!important;font-size:10px!important;border-radius:4px!important}
    #recipes .recipe-library-tools{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:8px 0 10px}
    #recipes .recipe-library-tools .btn{flex:0 0 auto}
    .savour-v15-public-nav{display:flex;flex-wrap:wrap;gap:14px;padding:14px 0 18px;border-bottom:1px solid #273334;margin-bottom:24px}
    .savour-v15-public-nav button{background:none;border:0;color:#c9c6ba;padding:0;font-size:12px;cursor:pointer}
    .savour-v15-public-nav button:hover{color:var(--gold)}
    @media(max-width:700px){#recipes .savour-v14-row .v14-name,#recipes .savour-v14-bulk-row .v14-name{font-size:12px!important}#recipes .savour-v14-row{grid-template-columns:30px minmax(0,1fr) 18px!important}}
  `;
  document.head.appendChild(style);

  // Expand the public copy while keeping one shared source for the Dutch public pages.
  try {
    if (typeof siteCopy !== 'undefined') {
      siteCopy.nl.about +=
        '<h2>Een centrale plek voor de keuken</h2><p>Van losse notities en oude documenten tot gecontroleerde recepturen: Savour brengt informatie samen in een overzichtelijke werkomgeving. Je bepaalt zelf hoe je categorieën en mappen indeelt, zodat de structuur aansluit op jouw keuken.</p><h2>Samenwerken met een team</h2><p>Gedeelde mappen maken het mogelijk om recepten gecontroleerd beschikbaar te stellen aan collega’s. Gebruik persoonlijke bibliotheken voor eigen werk en gedeelde mappen voor samenwerking, overdracht en vaste werkafspraken.</p>';
      siteCopy.nl.faq +=
        '<h2>Kan ik mijn eigen structuur bepalen?</h2><p>Ja. Categorieën, persoonlijke mappen en gedeelde mappen zijn bedoeld om aan te sluiten op jouw manier van werken. Houd de bibliotheek compact en gebruik de detailpagina voor de volledige receptuur.</p><h2>Wat moet ik controleren bij AI-import?</h2><p>Controleer altijd titel, hoeveelheden, eenheden, opbrengst en bereidingsstappen voordat je een geïmporteerd recept in de professionele praktijk gebruikt.</p>';
      siteCopy.nl.contact +=
        '<h2>Feedback en samenwerking</h2><p>Feedback over de interface, importkwaliteit, mappenstructuur en samenwerking helpt om Savour verder te ontwikkelen. Vermeld bij een melding bij voorkeur de pagina en de stappen waarmee het probleem ontstaat.</p>';
    }
  } catch (e) {
    console.warn('Savour v15 public copy expansion skipped', e);
  }

  // Public pages: always offer direct navigation to every public page.
  const publicItems = [
    ['about', 'Over Savour'],
    ['faq', 'Veelgestelde vragen'],
    ['contact', 'Contact'],
    ['terms', 'Algemene voorwaarden'],
    ['privacy', 'Privacybeleid']
  ];
  function ensurePublicNav() {
    const shell = $id('publicInfoShell');
    if (!shell) return;
    let nav = shell.querySelector('.savour-v15-public-nav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'savour-v15-public-nav';
      shell.prepend(nav);
    }
    nav.innerHTML = publicItems
      .map(([id, nl]) => `<button type="button" onclick="openPublicInfo('${id}')">${nl}</button>`)
      .join('');
  }

  // Ensure the public navigation is present after first paint and route changes.
  document.addEventListener('DOMContentLoaded', ensurePublicNav, { once: true });
  setTimeout(ensurePublicNav, 250);
})();
