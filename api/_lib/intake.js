// Inlaadservice: pakketten, slugs en gedeelde hulpjes voor api/aanleveren.js, api/admin.js en de webhook.
// Prijzen gelijk houden met tools/site-service.mjs (de website).
export const INTAKE_BUCKET = 'aanleveringen';
export const PACKAGES = {
  p100: { cents: 8500, recipes: 100 },
  p500: { cents: 10000, recipes: 500 },
  p1000: { cents: 16499, recipes: 1000 },
  meer: { cents: null, recipes: null }
};
// Zoveel keukens krijgen het inladen gratis (introductie); gelijk houden met FREE_KITCHENS in tools/site-service.mjs.
export const FREE_INTRO = 5;
// Organisatie-abonnement per jaar; bedragen alleen om te tonen. Stripe-prijzen (geen geheim): staat er in Vercel
// een STRIPE_PRICE_TEAMx_YEAR, dan geldt die; anders deze vaste prijzen uit het Stripe-dashboard.
export const SEAT_YEAR_EUR = { 5: 89, 10: 149, 25: 299 };
export const SEAT_YEAR_PRICE = {
  5: 'price_1UVD9QFnfKM1E6tPuJsZhw1q',
  10: 'price_1UVDCEFnfKM1E6tPh8FS3ybb',
  25: 'price_1UVDCfFnfKM1E6tPv71CuIqo'
};
export const DELIVER_SLUG = {
  nl: 'aanleveren',
  en: 'en/send-recipes',
  de: 'de/rezepte-liefern',
  es: 'es/enviar-recetas'
};
export const deliverLink = (origin, row) => `${origin}/${DELIVER_SLUG[row.language] || DELIVER_SLUG.nl}?t=${row.token}`;
export const packageLabel = (key, lang = 'nl') => {
  const p = PACKAGES[key];
  if (!p) return '';
  const words =
    {
      nl: ['Tot', 'recepten', 'Meer dan 1000 recepten'],
      en: ['Up to', 'recipes', 'More than 1,000 recipes'],
      de: ['Bis', 'Rezepte', 'Mehr als 1.000 Rezepte'],
      es: ['Hasta', 'recetas', 'Más de 1.000 recetas']
    }[lang] || [];
  return p.recipes ? `${words[0]} ${p.recipes} ${words[1]}` : words[2];
};
export const cleanText = (v, max) =>
  String(v ?? '')
    .trim()
    .slice(0, max);
export const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''));
