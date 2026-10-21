// E-mail versturen via Resend (RESEND_API_KEY in Vercel), afzender contact@savour.page.

export async function sendMail({ to, subject, html, text, replyTo = 'contact@savour.page' }) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Savour <contact@savour.page>',
      to: [to],
      reply_to: replyTo,
      subject,
      html,
      text
    })
  });
  if (!response.ok) console.error('Resend', response.status, await response.text().catch(() => ''));
  return response.ok;
}

const esc = v =>
  String(v ?? '').replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

// Bedankmail na een aankoop van Savour Pro (persoonlijk of team).
export function thankYouMail({ name, team, seats }) {
  const hi = name ? `Hoi ${esc(name.split(' ')[0])},` : 'Hoi,';
  const what = team
    ? `Je team heeft nu Savour Pro, met ${seats} plekken. Via Instellingen → Abonnement nodig je je collega's uit op hun e-mailadres; zodra ze inloggen hebben ze Pro.`
    : "Je hebt nu Savour Pro: onbeperkt recepten, je eigen gedeelde mappen voor je team, en AI die je handgeschreven kladjes en foto's omzet in nette recepten.";
  const plans = [
    [
      'Kostprijs per recept',
      'zie per gerecht en per portie wat het kost, en wat er gebeurt als de prijs van een product verandert.'
    ],
    [
      'Allergenen in één oogopslag',
      'per recept en per samengesteld gerecht, zodat je een vraag van een gast meteen kunt beantwoorden.'
    ],
    ['Receptkaarten met je eigen logo', 'netjes geprint voor de keuken, in de stijl van jouw zaak.']
  ];
  const html = `<!doctype html><html lang="nl"><body style="margin:0;background:#f5f4ef;font-family:Helvetica,Arial,sans-serif;color:#151716">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d1314;border-radius:14px;overflow:hidden">
<tr><td style="padding:34px 34px 8px;text-align:center;font-family:Georgia,serif;letter-spacing:.34em;color:#e8ca8d;font-size:20px">SAVOUR</td></tr>
<tr><td style="padding:8px 34px 30px;color:#eee8dc;font-size:15px;line-height:1.65">
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;color:#eee8dc;margin:18px 0 18px">Bedankt voor je aankoop!</h1>
<p style="margin:0 0 14px">${hi}</p>
<p style="margin:0 0 14px">Wat fijn dat je voor Savour Pro kiest. Savour is gemaakt door chefs, voor chefs, en met jouw steun kunnen we het platform elke week beter maken.</p>
<p style="margin:0 0 22px">${what}</p>
<p style="margin:0 0 26px;text-align:center"><a href="https://savour.page" style="display:inline-block;background:#e8ca8d;color:#111;text-decoration:none;padding:13px 24px;border-radius:10px;font-weight:bold">Open Savour</a></p>
<p style="margin:0 0 10px;color:#e8ca8d;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Waar we aan werken</p>
${plans.map(([t, d]) => `<p style="margin:0 0 10px"><strong style="color:#eee8dc">${t}</strong> <span style="color:#b9c0ba">— ${d}</span></p>`).join('')}
<p style="margin:16px 0 0;color:#b9c0ba">Heb je een idee of mis je iets in je keuken? Beantwoord deze mail gerust. We lezen alles en bouwen graag wat chefs echt nodig hebben.</p>
<p style="margin:22px 0 0">Veel kookplezier,<br>Het Savour-team</p>
</td></tr>
<tr><td style="padding:16px 34px 26px;border-top:1px solid #243031;color:#87918b;font-size:12px;line-height:1.6">Je factuur ontvang je apart van Stripe. Opzeggen of je betaalmethode wijzigen doe je via Mijn account → Abonnement beheren. Binnen 14 dagen na je eerste betaling kun je zonder reden afzien van je aankoop.<br>Savour · KvK 89674871 · Nederland · contact@savour.page</td></tr>
</table></td></tr></table></body></html>`;
  const text = `${name ? `Hoi ${name.split(' ')[0]},` : 'Hoi,'}

Bedankt voor je aankoop! Wat fijn dat je voor Savour Pro kiest. Savour is gemaakt door chefs, voor chefs, en met jouw steun kunnen we het platform elke week beter maken.

${what}

Open Savour: https://savour.page

Waar we aan werken:
${plans.map(([t, d]) => `- ${t}: ${d}`).join('\n')}

Heb je een idee of mis je iets in je keuken? Beantwoord deze mail gerust.

Veel kookplezier,
Het Savour-team

Je factuur ontvang je apart van Stripe. Opzeggen doe je via Mijn account → Abonnement beheren. Binnen 14 dagen na je eerste betaling kun je zonder reden afzien van je aankoop.
Savour · KvK 89674871 · Nederland · contact@savour.page`;
  return { subject: 'Bedankt voor je aankoop — welkom bij Savour Pro', html, text };
}
