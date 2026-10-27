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
    ? `Je organisatie heeft nu Savour Pro, met ${seats} plekken. Jij telt zelf als eerste plek mee.`
    : "Je hebt nu Savour Pro: onbeperkt recepten, je eigen gedeelde mappen voor je team, en AI die je handgeschreven kladjes en foto's omzet in nette recepten.";
  // Teamaankoop: in drie stappen uitleggen hoe collega's Pro krijgen.
  const teamSteps = team
    ? [
        'Open Savour en kies links in het menu <strong>Mijn organisatie</strong> (op je telefoon: Mijn account → Abonnement).',
        `Vul het e-mailadres van een collega in. Je hebt ${seats} plekken, jij telt mee.`,
        'Je collega krijgt een uitnodiging van ons en heeft Savour Pro zodra die inlogt of zich aanmeldt met precies dat e-mailadres. Vertrekt iemand, dan geef je de plek met één klik vrij voor een ander.'
      ]
    : [];
  const teamHtml = team
    ? `<p style="margin:0 0 10px;color:#e8ca8d;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Zo werkt je organisatie</p>${teamSteps
        .map(
          (s, i) =>
            `<p style="margin:0 0 10px"><strong style="color:#e8ca8d">${i + 1}.</strong> <span style="color:#d9d3c6">${s}</span></p>`
        )
        .join(
          ''
        )}<p style="margin:16px 0 26px;text-align:center"><a href="https://savour.page/?team=1" style="display:inline-block;background:#e8ca8d;color:#111;text-decoration:none;padding:13px 24px;border-radius:999px;font-weight:bold">Organisatie instellen</a></p>`
    : '';
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
${team ? teamHtml : `<p style="margin:0 0 26px;text-align:center"><a href="https://savour.page" style="display:inline-block;background:#e8ca8d;color:#111;text-decoration:none;padding:13px 24px;border-radius:999px;font-weight:bold">Open Savour</a></p>`}
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
${team ? `\nZo werkt je organisatie:\n${teamSteps.map((s, i) => `${i + 1}. ${s.replace(/<[^>]+>/g, '')}`).join('\n')}\n\nOrganisatie instellen: https://savour.page/?team=1` : '\nOpen Savour: https://savour.page'}

Waar we aan werken:
${plans.map(([t, d]) => `- ${t}: ${d}`).join('\n')}

Heb je een idee of mis je iets in je keuken? Beantwoord deze mail gerust.

Veel kookplezier,
Het Savour-team

Je factuur ontvang je apart van Stripe. Opzeggen doe je via Mijn account → Abonnement beheren. Binnen 14 dagen na je eerste betaling kun je zonder reden afzien van je aankoop.
Savour · KvK 89674871 · Nederland · contact@savour.page`;
  return { subject: 'Bedankt voor je aankoop — welkom bij Savour Pro', html, text };
}

// Uitnodiging voor een collega die aan een team is toegevoegd. Pro is gekoppeld aan dit e-mailadres.
export function teamInviteMail({ team, inviter, origin = 'https://savour.page' }) {
  const who = inviter ? `${esc(inviter.split(' ')[0])} heeft je` : 'Je bent';
  const whoText = inviter ? `${inviter.split(' ')[0]} heeft je` : 'Je bent';
  const teamName = esc(team || 'je organisatie');
  const btn = (href, label, gold) =>
    `<a href="${href}" style="display:inline-block;margin:4px;${gold ? 'background:#e8ca8d;color:#111' : 'border:1px solid #e8ca8d;color:#e8ca8d'};text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:bold">${label}</a>`;
  const html = `<!doctype html><html lang="nl"><body style="margin:0;background:#f5f4ef;font-family:Helvetica,Arial,sans-serif;color:#151716">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d1314;border-radius:14px;overflow:hidden">
<tr><td style="padding:34px 34px 8px;text-align:center;font-family:Georgia,serif;letter-spacing:.34em;color:#e8ca8d;font-size:20px">SAVOUR</td></tr>
<tr><td style="padding:8px 34px 30px;color:#eee8dc;font-size:15px;line-height:1.65">
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;color:#eee8dc;margin:18px 0 18px">Je hebt Savour Pro via ${teamName}</h1>
<p style="margin:0 0 14px">${who} ${inviter ? 'toegevoegd aan' : 'toegevoegd aan'} <strong>${teamName}</strong> in Savour. Daarmee heb je Savour Pro: onbeperkt recepten, gedeelde mappen met je collega's en AI die handgeschreven kladjes omzet in nette recepten.</p>
<p style="margin:0 0 10px;color:#e8ca8d;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Zo begin je</p>
<p style="margin:0 0 10px"><strong style="color:#e8ca8d">1.</strong> <span style="color:#d9d3c6">Nog geen account? Maak er een aan met <strong>dit e-mailadres</strong>. Heb je al een account met dit adres, log dan gewoon in.</span></p>
<p style="margin:0 0 22px"><strong style="color:#e8ca8d">2.</strong> <span style="color:#d9d3c6">Je hebt direct Pro. Je hoeft niets te betalen; dat regelt je organisatie.</span></p>
<p style="margin:0 0 22px;text-align:center">${btn(`${origin}/?auth=signup`, 'Account aanmaken', true)}${btn(`${origin}/?auth=login`, 'Inloggen', false)}</p>
<p style="margin:0;color:#b9c0ba">Gebruik je liever een ander e-mailadres? Vraag dan aan wie je heeft toegevoegd om dat adres aan de organisatie toe te voegen.</p>
<p style="margin:22px 0 0">Veel kookplezier,<br>Het Savour-team</p>
</td></tr>
<tr><td style="padding:16px 34px 26px;border-top:1px solid #243031;color:#87918b;font-size:12px;line-height:1.6">Savour is de receptenapp voor de professionele keuken. Je ontvangt deze mail omdat iemand je e-mailadres aan een Savour-team heeft toegevoegd.<br>Savour · KvK 89674871 · Nederland · contact@savour.page</td></tr>
</table></td></tr></table></body></html>`;
  const text = `${whoText} toegevoegd aan ${team || 'je organisatie'} in Savour. Daarmee heb je Savour Pro.

Zo begin je:
1. Nog geen account? Maak er een aan met dit e-mailadres: ${origin}/?auth=signup
   Heb je al een account met dit adres? Log dan in: ${origin}/?auth=login
2. Je hebt direct Pro. Je hoeft niets te betalen; dat regelt je organisatie.

Gebruik je liever een ander e-mailadres? Vraag dan aan wie je heeft toegevoegd om dat adres aan de organisatie toe te voegen.

Het Savour-team
Savour · KvK 89674871 · Nederland · contact@savour.page`;
  return { subject: `Je hebt Savour Pro via ${team || 'je organisatie'}`, html, text };
}
