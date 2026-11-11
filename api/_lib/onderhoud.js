// Nachtelijk onderhoud (Vercel Cron → /api/admin?taak=onderhoud, zie vercel.json → crons; een eigen functie kan
// niet: het gratis Vercel-plan staat hooguit 12 serverfuncties toe): de database klein en de opslag netjes houden.
// supabase/2026-11-11-opslag-ontlasten.sql legt uit waarom.
// 1. Originele kladjes die nog als tekst in de database staan (recipe_sources.image) verhuizen naar de
//    privé-bucket recipe-sources. Pas als het bestand veilig in de opslag staat, gaat de tekst uit de database.
// 2. Geïmporteerde bestanden ouder dan 60 dagen gaan uit de opslag (de rij in import_uploads blijft).
// 3. Bestanden op de opruimlijst (storage_cleanup_queue: verwijderde recepten, kladjes en accounts) gaan weg.
// Alleen te starten door Vercel Cron of met de geheime sleutel (CRON_SECRET), nooit door gewone bezoekers.
import { hasServiceRole, select, update, remove, storageUpload, storageRemove } from './supabase-admin.js';

const KEEP_UPLOADS_DAYS = 60;
// Ruim binnen de tijdslimiet van 300 seconden blijven; wat niet lukt, gaat de volgende nacht verder.
const TIME_BUDGET_MS = 240000;

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = String(req.headers?.authorization || '');
  const key = String(req.query?.key || '');
  return header === `Bearer ${secret}` || key === secret;
}

// "data:image/jpeg;base64,...." → bytes en soort bestand.
function decodeDataUrl(dataUrl) {
  const m = String(dataUrl || '').match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/s);
  if (!m) return null;
  return { type: m[1], bytes: Buffer.from(m[2], 'base64') };
}

async function moveRecipeSources(deadline) {
  const out = { moved: 0, failed: 0, left: 0 };
  // Wat vannacht niet lukte, niet nog eens proberen (blijft gewoon in de database staan).
  const skip = new Set();
  while (Date.now() < deadline) {
    const notSkipped = skip.size ? `&recipe_id=not.in.(${[...skip].join(',')})` : '';
    const rows = await select(
      'recipe_sources',
      `select=recipe_id,user_id,image&image=not.is.null&image_path=is.null${notSkipped}&order=created_at.asc&limit=5`
    );
    if (!rows?.length) break;
    for (const row of rows) {
      if (Date.now() >= deadline) break;
      const file = decodeDataUrl(row.image);
      if (!file || !file.bytes.length) {
        skip.add(row.recipe_id);
        out.failed++;
        continue;
      }
      const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
      const path = `${row.user_id}/${row.recipe_id}.${ext}`;
      try {
        await storageUpload('recipe-sources', path, file.bytes, file.type, { upsert: true });
        // Alleen als de rij nog precies zo is: anders laten staan en volgende keer opnieuw.
        await update('recipe_sources', `recipe_id=eq.${row.recipe_id}&image_path=is.null`, {
          image_path: path,
          image: null
        });
        out.moved++;
      } catch (error) {
        console.error('Kladje verhuizen mislukt', row.recipe_id, error.message);
        skip.add(row.recipe_id);
        out.failed++;
      }
    }
  }
  const left = await select('recipe_sources', 'select=recipe_id&image=not.is.null&image_path=is.null&limit=1000');
  out.left = left?.length || 0;
  return out;
}

async function expireUploads() {
  const before = new Date(Date.now() - KEEP_UPLOADS_DAYS * 86400000).toISOString();
  const rows = await select(
    'import_uploads',
    `select=id,storage_path&storage_path=not.is.null&created_at=lt.${before}&limit=500`
  );
  if (!rows?.length) return { removed: 0 };
  await storageRemove(
    'import-uploads',
    rows.map(r => r.storage_path)
  );
  for (const r of rows)
    await update('import_uploads', `id=eq.${r.id}`, {
      storage_path: null,
      note: `Origineel na ${KEEP_UPLOADS_DAYS} dagen weggehaald.`,
      updated_at: new Date().toISOString()
    });
  return { removed: rows.length };
}

async function emptyCleanupQueue() {
  const rows = await select('storage_cleanup_queue', 'select=id,bucket,path&order=id.asc&limit=1000');
  if (!rows?.length) return { removed: 0 };
  const byBucket = new Map();
  for (const r of rows) byBucket.set(r.bucket, [...(byBucket.get(r.bucket) || []), r]);
  let removed = 0;
  for (const [bucket, list] of byBucket) {
    try {
      await storageRemove(
        bucket,
        list.map(r => r.path)
      );
      await remove('storage_cleanup_queue', `id=in.(${list.map(r => r.id).join(',')})`);
      removed += list.length;
    } catch (error) {
      console.error('Opruimen mislukt', bucket, error.message);
    }
  }
  return { removed };
}

export async function runMaintenance(req, res) {
  if (!authorized(req)) return res.status(401).json({ error: 'Niet toegestaan.' });
  if (!hasServiceRole()) return res.status(500).json({ error: 'Serversleutel ontbreekt.' });
  const deadline = Date.now() + TIME_BUDGET_MS;
  const result = {};
  for (const [name, job] of [
    ['opruimlijst', () => emptyCleanupQueue()],
    ['importbestanden', () => expireUploads()],
    ['kladjes', () => moveRecipeSources(deadline)]
  ]) {
    try {
      result[name] = await job();
    } catch (error) {
      console.error('Onderhoud', name, error);
      result[name] = { error: error.message };
    }
  }
  console.log('Onderhoud klaar', JSON.stringify(result));
  return res.status(200).json(result);
}
