// Stuurt een uitnodigingsmail naar een collega die net aan een team is toegevoegd.
// Alleen de eigenaar van een team kan dit, en alleen voor een e-mailadres dat al in het team staat
// (toevoegen gaat via savour_team_add_member in de database; deze route stuurt alleen de mail).
import { getUserFromRequest } from './_lib/auth.js';
import { select, hasServiceRole } from './_lib/supabase-admin.js';
import { sendMail, teamInviteMail } from './_lib/mail.js';
import { siteOrigin } from './_lib/origin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasServiceRole()) return res.status(503).json({ error: 'Mail is nog niet ingesteld.', code: 'not_configured' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log opnieuw in.' });
  const email = String(req.body?.email || '')
    .trim()
    .toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Ongeldig e-mailadres.' });
  try {
    const [org] = await select(
      'organizations',
      `owner_id=eq.${encodeURIComponent(user.id)}&select=id,name,seats,status`
    );
    if (!org || org.status === 'inactive') return res.status(403).json({ error: 'Je hebt geen actief team.' });
    const [member] = await select(
      'organization_members',
      `organization_id=eq.${encodeURIComponent(org.id)}&email=eq.${encodeURIComponent(email)}&select=email,added_at`
    );
    if (!member) return res.status(404).json({ error: 'Dit e-mailadres staat niet in je team.' });
    const [profile] = await select('profiles', `id=eq.${encodeURIComponent(user.id)}&select=name`).catch(() => []);
    const sent = await sendMail({
      to: email,
      replyTo: user.email || undefined,
      ...teamInviteMail({
        team: org.name,
        inviter: profile?.name || '',
        origin: siteOrigin(req)
      })
    });
    return res.status(200).json({ sent });
  } catch (error) {
    console.error('Team-uitnodiging', error);
    return res.status(500).json({ error: 'Uitnodiging kon niet worden verstuurd.' });
  }
}
