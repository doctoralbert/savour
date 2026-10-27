import { select, update, hasServiceRole, storageUploadUrl, storageList } from './_lib/supabase-admin.js';
import { sendMail } from './_lib/mail.js';

// Inlaadservice: de aanleverpagina (savour.page/aanleveren?t=...) praat alleen met deze route.
// Geen account nodig; de lange, geheime token in de link is de toegang. De beheerder maakt de link in /admin → Inladen.
// - get:    gegevens van de aanlevering en de al geüploade bestanden
// - upload: eenmalige uploadlink voor één bestand in de privé-bucket 'aanleveringen'
// - submit: mappenstructuur en opmerkingen opslaan; de beheerder krijgt een mail
const BUCKET = 'aanleveringen';
const MAX_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 300;
const ALLOWED =
  /\.(docx?|pdf|jpe?g|png|heic|heif|webp|gif|tiff?|txt|rtf|odt|pages|xlsx?|ods|numbers|csv|json|html?|xml|zip|paprikarecipes|mx2|md)$/i;

const clean = (v, max) =>
  String(v ?? '')
    .trim()
    .slice(0, max);
// Alleen veilige tekens in de opslagnaam; de tijd ervoor voorkomt dat twee bestanden elkaar overschrijven.
const safeName = name =>
  `${Date.now().toString(36)}-${
    clean(name, 140)
      .normalize('NFKD')
      .replace(/[^\w.\- ]+/g, '')
      .replace(/\s+/g, '_') || 'bestand'
  }`;
// Voor de klant: zonder het tijdvoorvoegsel.
const shownName = name => name.replace(/^[a-z0-9]+-/, '').replace(/_/g, ' ');

async function findIntake(token) {
  if (!/^[a-f0-9]{32,64}$/.test(String(token || ''))) return null;
  const rows = await select('recipe_intakes', `token=eq.${token}&select=*`);
  return rows?.[0] || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasServiceRole()) return res.status(503).json({ error: 'Niet beschikbaar.' });
  const { action, token } = req.body || {};
  try {
    const intake = await findIntake(token);
    if (!intake) return res.status(404).json({ error: 'Deze aanleverlink klopt niet.' });
    const open = intake.status !== 'klaar' && !intake.files_deleted_at;

    if (action === 'get') {
      const files = open ? await storageList(BUCKET, `${intake.id}/`) : [];
      return res.status(200).json({
        status: intake.status,
        name: intake.name,
        restaurant: intake.restaurant,
        package: intake.package,
        structure: intake.structure,
        folders: intake.folders,
        match: intake.match,
        notes: intake.notes,
        files: files.map(f => shownName(f.name))
      });
    }
    if (!open) return res.status(409).json({ error: 'Deze aanlevering is afgerond.' });

    if (action === 'upload') {
      const name = clean(req.body.name, 200);
      const size = Number(req.body.size) || 0;
      if (!name || !ALLOWED.test(name))
        return res.status(400).json({ error: 'Dit bestandstype kunnen we niet gebruiken.' });
      if (size > MAX_SIZE) return res.status(400).json({ error: 'Bestand is groter dan 50 MB.' });
      const existing = await storageList(BUCKET, `${intake.id}/`);
      if (existing.length >= MAX_FILES) return res.status(400).json({ error: 'Maximaal aantal bestanden bereikt.' });
      const url = await storageUploadUrl(BUCKET, `${intake.id}/${safeName(name)}`);
      return res.status(200).json({ url });
    }

    if (action === 'submit') {
      const values = {
        structure: clean(req.body.structure, 80),
        folders: clean(req.body.folders, 6000),
        match: clean(req.body.match, 3000),
        notes: clean(req.body.notes, 6000),
        submitted_at: new Date().toISOString(),
        status: intake.status === 'open' ? 'ingediend' : intake.status
      };
      await update('recipe_intakes', `id=eq.${intake.id}`, values);
      const files = await storageList(BUCKET, `${intake.id}/`);
      const who = intake.restaurant || intake.name || intake.email || `aanlevering ${intake.id}`;
      const text = `Nieuwe aanlevering voor de inlaadservice\n\nVoor: ${who}\nPakket: ${intake.package || '-'}\nBestanden: ${files.length}\nIndeling: ${values.structure || '-'}\n\nMappen:\n${values.folders || '-'}\n\nWelk recept in welke map:\n${values.match || '-'}\n\nOpmerkingen:\n${values.notes || '-'}\n\nBekijk en download alles in savour.page/admin → Inladen.`;
      await sendMail({
        to: process.env.BUG_REPORT_TO || 'contact@savour.page',
        subject: `Savour inladen: aanlevering van ${who}`,
        text,
        html: `<pre style="font-family:inherit;white-space:pre-wrap">${text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])}</pre>`,
        replyTo: intake.email || undefined
      }).catch(e => console.warn('Aanlevering: mail niet verstuurd', e.message));
      return res.status(200).json({ ok: true, files: files.length });
    }

    return res.status(400).json({ error: 'Onbekende actie.' });
  } catch (error) {
    console.error('Aanleveren', action, error);
    return res.status(500).json({ error: 'Er ging iets mis. Probeer het opnieuw of mail contact@savour.page.' });
  }
}
