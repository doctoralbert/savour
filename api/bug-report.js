export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { name, email, subject, message, screenshot, screenshotName, page, language } = req.body || {};
    const clean = v => String(v ?? '').trim();
    const n = clean(name), e = clean(email), s = clean(subject), m = clean(message);
    if (!n || !e || !s || !m) return res.status(400).json({ error: 'Vul alle verplichte velden in.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return res.status(400).json({ error: 'Vul een geldig e-mailadres in.' });
    if (s.length > 180 || m.length > 12000 || n.length > 120 || e.length > 240) {
      return res.status(400).json({ error: 'De ingevoerde tekst is te lang.' });
    }
    if (screenshot && String(screenshot).length > 4_200_000) {
      return res.status(400).json({ error: 'De screenshot is te groot. Maximum 3 MB.' });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return res.status(500).json({ error: 'De bugmailservice is nog niet geconfigureerd.' });
    }

    const attachments = [];
    if (screenshot) {
      const match = String(screenshot).match(/^data:(image\/(?:png|jpeg|webp));base64,(.+)$/);
      if (!match) return res.status(400).json({ error: 'Ongeldig screenshotbestand.' });
      attachments.push({ filename: clean(screenshotName) || 'screenshot.png', content: match[2] });
    }

    const to = process.env.BUG_REPORT_TO || 'contact@savour.page';
    const from = process.env.BUG_REPORT_FROM || 'Savour <contact@savour.page>';
    const safeLanguage = clean(language) || 'nl';
    const safePage = clean(page) || 'onbekend';
    const html = `<h2>Savour bugmelding</h2><p><strong>Naam:</strong> ${esc(n)}</p><p><strong>E-mail:</strong> ${esc(e)}</p><p><strong>Onderwerp:</strong> ${esc(s)}</p><p><strong>Taal:</strong> ${esc(safeLanguage)}</p><p><strong>Pagina:</strong> ${esc(safePage)}</p><hr><p>${esc(m).replace(/\n/g, '<br>')}</p>`;
    const text = `Savour bugmelding\n\nNaam: ${n}\nE-mail: ${e}\nOnderwerp: ${s}\nTaal: ${safeLanguage}\nPagina: ${safePage}\n\n${m}`;

    const mail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: e,
        subject: `Savour bug: ${s}`,
        html,
        text,
        attachments
      })
    });

    const result = await mail.json().catch(() => ({}));
    if (!mail.ok) {
      console.error('Resend bug-report error:', { status: mail.status, result });
      return res.status(502).json({
        error: result.message || result.error || 'Resend kon de bugmelding niet accepteren.',
        provider_status: mail.status
      });
    }

    return res.status(200).json({ ok: true, id: result.id || null });
  } catch (err) {
    console.error('Bug report function error:', err);
    return res.status(500).json({ error: 'De bugmelding kon niet worden verwerkt.' });
  }
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[c]));
}
