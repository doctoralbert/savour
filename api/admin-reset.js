export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email } = req.body || {};
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return res.status(400).json({ error: 'Vul je e-mailadres in.' });
  if (normalized !== 'schreurs.jop@gmail.com') return res.status(200).json({ ok: true });

  const supabaseUrl = process.env.SUPABASE_URL || 'https://qmzfqfmpylkgcnxsedse.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!serviceRoleKey || !resendKey) return res.status(500).json({ error: 'De beveiligde reset-mailservice is nog niet geconfigureerd.' });

  const resetPage = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/admin-reset.html`;
  const generate = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
    method: 'POST',
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'recovery', email: normalized, options: { redirect_to: resetPage } })
  });
  const generated = await generate.json().catch(() => ({}));
  if (!generate.ok || !generated.action_link) return res.status(500).json({ error: 'Er kon geen beveiligde herstel-link worden aangemaakt.' });

  const mail = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Savour <contact@savour.page>',
      to: ['contact@savour.page'],
      subject: 'Savour admin wachtwoord herstellen',
      html: `<p>Er is een verzoek gedaan om het Savour adminwachtwoord te herstellen.</p><p><a href="${generated.action_link}">Nieuw wachtwoord instellen</a></p><p>Deze link is persoonlijk en tijdelijk.</p>`
    })
  });
  if (!mail.ok) return res.status(500).json({ error: 'De herstel-link kon niet per e-mail worden verzonden.' });
  return res.status(200).json({ ok: true });
}
