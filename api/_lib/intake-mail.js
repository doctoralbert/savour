// Mails van de import service aan de klant en de leden, in de taal van de aanvraag (nl, en, de, es).
// Verstuurd via sendMail (api/_lib/mail.js); opmaak in dezelfde donkere Savour-stijl als de andere mails.
const esc = v =>
  String(v ?? '').replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

const T = {
  nl: {
    hi: n => (n ? `Hoi ${n},` : 'Hoi,'),
    bye: 'Veel kookplezier,<br>Savour',
    received: {
      subject: 'We hebben je aanvraag voor de import service ontvangen',
      body: r => [
        `Bedankt voor je aanvraag om de recepten van ${r} in Savour te laten inladen.`,
        'We bekijken je aanvraag en laten je zo snel mogelijk weten of we aan de slag kunnen. Na goedkeuring krijg je een persoonlijke link om te betalen en je recepten aan te leveren.'
      ]
    },
    approved: {
      subject: 'Je aanvraag is goedgekeurd: rond je bestelling af',
      body: r => [
        `Goed nieuws: we laden de recepten van ${r} graag voor je in.`,
        'Via de knop hieronder kies je de grootte van je team en betaal je. Daarna lever je op dezelfde pagina je recepten aan en geef je de e-mailadressen van je collega’s door.'
      ],
      button: 'Betalen en aanleveren'
    },
    rejected: {
      subject: 'Over je aanvraag voor de import service',
      body: (r, reason) => [
        `Bedankt voor je aanvraag voor ${r}. Helaas kunnen we deze aanvraag nu niet aannemen.`,
        ...(reason ? [reason] : []),
        'Je kunt Savour natuurlijk altijd zelf gebruiken: je recepten importeren gaat ook zonder ons, vanuit Word, PDF of foto’s.'
      ]
    },
    welcome: {
      subject: org => `Je receptenboek van ${org} staat klaar in Savour`,
      body: org => [
        `De recepten van ${org} staan klaar in Savour. Je hebt een account met Savour Pro via je team.`,
        'Kies via de knop hieronder je wachtwoord. Daarna log je in met dit e-mailadres, op je computer en op je telefoon.',
        'De link is 14 dagen geldig.'
      ],
      button: 'Wachtwoord kiezen'
    }
  },
  en: {
    hi: n => (n ? `Hi ${n},` : 'Hi,'),
    bye: 'Happy cooking,<br>Savour',
    received: {
      subject: 'We have received your import service request',
      body: r => [
        `Thank you for your request to have the recipes of ${r} imported into Savour.`,
        'We will review your request and let you know as soon as possible. Once approved, you will receive a personal link to pay and send us your recipes.'
      ]
    },
    approved: {
      subject: 'Your request is approved: complete your order',
      body: r => [
        `Good news: we would love to import the recipes of ${r} for you.`,
        'Use the button below to choose the size of your organisation and pay. Then, on the same page, send us your recipes and the email addresses of your colleagues.'
      ],
      button: 'Pay and send recipes'
    },
    rejected: {
      subject: 'About your import service request',
      body: (r, reason) => [
        `Thank you for your request for ${r}. Unfortunately we cannot take on this request right now.`,
        ...(reason ? [reason] : []),
        'You can of course always use Savour yourself: importing your recipes from Word, PDF or photos works without us too.'
      ]
    },
    welcome: {
      subject: org => `The recipe book of ${org} is ready in Savour`,
      body: org => [
        `The recipes of ${org} are ready in Savour. You have an account with Savour Pro through your organisation.`,
        'Use the button below to choose your password. Then log in with this email address, on your computer and on your phone.',
        'The link is valid for 14 days.'
      ],
      button: 'Choose password'
    }
  },
  de: {
    hi: n => (n ? `Hallo ${n},` : 'Hallo,'),
    bye: 'Viel Freude beim Kochen,<br>Savour',
    received: {
      subject: 'Wir haben deine Anfrage zum Import-Service erhalten',
      body: r => [
        `Danke für deine Anfrage, die Rezepte von ${r} in Savour einpflegen zu lassen.`,
        'Wir prüfen deine Anfrage und melden uns so schnell wie möglich. Nach der Freigabe bekommst du einen persönlichen Link zum Bezahlen und zum Liefern deiner Rezepte.'
      ]
    },
    approved: {
      subject: 'Deine Anfrage ist freigegeben: schließe deine Bestellung ab',
      body: r => [
        `Gute Nachricht: Wir pflegen die Rezepte von ${r} gern für dich ein.`,
        'Über den Button unten wählst du die Größe deiner Organisation und bezahlst. Danach lieferst du auf derselben Seite deine Rezepte und die E-Mail-Adressen deiner Kollegen.'
      ],
      button: 'Bezahlen und liefern'
    },
    rejected: {
      subject: 'Zu deiner Anfrage zum Import-Service',
      body: (r, reason) => [
        `Danke für deine Anfrage für ${r}. Leider können wir diese Anfrage im Moment nicht annehmen.`,
        ...(reason ? [reason] : []),
        'Du kannst Savour natürlich jederzeit selbst nutzen: Rezepte aus Word, PDF oder Fotos importieren geht auch ohne uns.'
      ]
    },
    welcome: {
      subject: org => `Das Rezeptbuch von ${org} steht in Savour bereit`,
      body: org => [
        `Die Rezepte von ${org} stehen in Savour bereit. Du hast ein Konto mit Savour Pro über deine Organisation.`,
        'Wähle über den Button unten dein Passwort. Danach meldest du dich mit dieser E-Mail-Adresse an, am Computer und am Handy.',
        'Der Link ist 14 Tage gültig.'
      ],
      button: 'Passwort wählen'
    }
  },
  es: {
    hi: n => (n ? `Hola ${n}:` : 'Hola:'),
    bye: 'Que disfrutes cocinando,<br>Savour',
    received: {
      subject: 'Hemos recibido tu solicitud del servicio de importación',
      body: r => [
        `Gracias por tu solicitud para cargar las recetas de ${r} en Savour.`,
        'Revisaremos tu solicitud y te diremos algo lo antes posible. Una vez aprobada, recibirás un enlace personal para pagar y enviarnos tus recetas.'
      ]
    },
    approved: {
      subject: 'Tu solicitud está aprobada: completa tu pedido',
      body: r => [
        `Buenas noticias: cargaremos con gusto las recetas de ${r}.`,
        'Con el botón de abajo eliges el tamaño de tu organización y pagas. Después, en la misma página, nos envías tus recetas y los correos de tus compañeros.'
      ],
      button: 'Pagar y enviar recetas'
    },
    rejected: {
      subject: 'Sobre tu solicitud del servicio de importación',
      body: (r, reason) => [
        `Gracias por tu solicitud para ${r}. Lamentablemente ahora no podemos aceptarla.`,
        ...(reason ? [reason] : []),
        'Siempre puedes usar Savour por tu cuenta: importar recetas de Word, PDF o fotos también funciona sin nosotros.'
      ]
    },
    welcome: {
      subject: org => `El recetario de ${org} está listo en Savour`,
      body: org => [
        `Las recetas de ${org} están listas en Savour. Tienes una cuenta con Savour Pro a través de tu organización.`,
        'Elige tu contraseña con el botón de abajo. Después inicias sesión con este correo, en el ordenador y en el móvil.',
        'El enlace es válido durante 14 días.'
      ],
      button: 'Elegir contraseña'
    }
  }
};

function layout(paragraphs, button, link, bye) {
  const html = `<!doctype html><html><body style="margin:0;background:#0a0f10;font-family:Arial,Helvetica,sans-serif;color:#eee8dc">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f10;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#101819;border:1px solid #243031;border-radius:18px">
<tr><td style="padding:30px 34px 8px;font-family:Georgia,serif;letter-spacing:.4em;color:#e8ca8d;font-size:18px">SAVOUR</td></tr>
<tr><td style="padding:10px 34px 28px;font-size:15px;line-height:1.65;color:#d9d3c6">
${paragraphs.map(p => `<p style="margin:0 0 14px">${p}</p>`).join('')}
${button ? `<p style="margin:22px 0 24px;text-align:center"><a href="${esc(link)}" style="display:inline-block;background:#e8ca8d;color:#111;text-decoration:none;padding:13px 24px;border-radius:999px;font-weight:bold">${esc(button)}</a></p><p style="margin:0 0 14px;font-size:12px;color:#87918b;word-break:break-all">${esc(link)}</p>` : ''}
<p style="margin:22px 0 0">${bye}</p></td></tr></table></td></tr></table>
<span style="display:none;font-size:0;line-height:0;max-height:0;overflow:hidden">${Date.now().toString(36)}${Math.random().toString(36).slice(2)}</span></body></html>`;
  return html;
}

// kind: received | approved | rejected | welcome
export function intakeMail(kind, { language = 'nl', name, restaurant, link, reason, organization } = {}) {
  const L = T[language] || T.nl;
  const k = L[kind];
  const first =
    String(name || '')
      .trim()
      .split(/\s+/)[0] || '';
  const r = restaurant || name || 'Savour';
  const org = organization || r;
  const lines =
    kind === 'welcome'
      ? k.body(esc(org))
      : kind === 'rejected'
        ? k.body(esc(r), reason ? esc(reason) : '')
        : k.body(esc(r));
  const paragraphs = [esc(L.hi(first)), ...lines];
  // Gmail vouwt tekst weg die gelijk is aan een eerdere mail in hetzelfde gesprek. Daarom het restaurant in het
  // onderwerp (eigen gesprek per keuken) en onderaan een onzichtbaar uniek stukje (zie layout).
  const base = typeof k.subject === 'function' ? k.subject(org) : k.subject;
  const subject = kind === 'welcome' ? base : `${base} · ${r}`;
  const text = [
    L.hi(first),
    ...lines.map(l =>
      l.replace(/&[a-z#0-9]+;/g, m => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" })[m] || m)
    ),
    ...(link ? [link] : []),
    L.bye.replace('<br>', '\n')
  ].join('\n\n');
  return { subject, html: layout(paragraphs, k.button, link, L.bye), text };
}
