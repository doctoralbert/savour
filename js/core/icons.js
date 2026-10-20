// Lijniconen in de huisstijl (24×24, lijndikte 1.75). Gebruik: icon('print').
const ICON_PATHS = {
  back: '<path d="M15 18l-6-6 6-6"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14 6l4 4"/>',
  print: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
  share:
    '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6"/>',
  folderPlus:
    '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path d="M12 10v6M9 13h6"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  remove: '<path d="M6 6l12 12M18 6L6 18"/>',
  more: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  cook: '<path d="M6 13h12v6a1 1 0 01-1 1H7a1 1 0 01-1-1v-6z"/><path d="M9 13V9.5A3 3 0 015 6.6 3 3 0 019.6 4a3 3 0 014.8 0A3 3 0 0119 6.6a3 3 0 01-4 2.9V13"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>'
};

// Geeft de SVG van een icoon terug; filled vult de vorm (bijv. een geselecteerde ster).
function icon(name, { filled = false, size = 18 } = {}) {
  const paths = ICON_PATHS[name] || '';
  return `<svg class="sv-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
