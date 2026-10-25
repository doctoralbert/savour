// Nodig een collega uit: een persoonlijke link (savour.page/?collega=<id>). Maakt een collega daarmee een account
// en bevestigt die het e-mailadres, dan krijgen jullie allebei een maand Savour Pro cadeau (api/referral.js).
const REFERRAL_KEY = 'savour_collega';
const REFERRAL_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ?collega=<id> uit de link onthouden tot het account is aangemaakt.
function rememberReferral(id) {
  if (!REFERRAL_ID.test(String(id || ''))) return;
  try {
    localStorage.setItem(REFERRAL_KEY, id);
  } catch (_) {}
}

function invitedBy() {
  try {
    const id = localStorage.getItem(REFERRAL_KEY) || '';
    return REFERRAL_ID.test(id) ? id : '';
  } catch (_) {
    return '';
  }
}

function referralLink() {
  return `https://savour.page/?collega=${currentUser.id}`;
}

async function inviteColleague() {
  if (demoMode || !currentUser) {
    toast(t('Maak een account aan om collega’s uit te nodigen'));
    return;
  }
  const link = referralLink();
  const message = `${t('Ik bewaar mijn recepten in Savour. Maak via deze link een account, dan krijgen we allebei een maand Savour Pro cadeau:')} ${link}`;
  const count = Number(currentUser.app_metadata?.referral_rewards) || 0;
  const options = [{ label: 'Link kopiëren', value: 'copy', primary: true }];
  options.push({ label: 'Delen via WhatsApp', value: 'whatsapp' });
  if (navigator.share) options.push({ label: 'Delen via…', hint: 'Mail, berichten of een andere app', value: 'share' });
  const choice = await askChoice(
    `${t('Nodig een collega uit')}\n\n${t('Stuur je persoonlijke link naar een collega. Maakt die een account aan en bevestigt die het e-mailadres, dan krijgen jullie allebei een maand Savour Pro cadeau.')}\n\n${link}${count ? `\n\n${t('Collega’s uitgenodigd:')} ${count}` : ''}`,
    options
  );
  if (choice === 'copy') {
    try {
      await navigator.clipboard.writeText(message);
      toast(t('Link gekopieerd, plak hem in een bericht aan je collega'));
    } catch (_) {
      await askText(t('Kopieer deze link'), link, { confirmLabel: 'Klaar' });
    }
  } else if (choice === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  } else if (choice === 'share') {
    try {
      await navigator.share({ title: 'Savour', text: message });
    } catch (_) {}
  }
}

// Na het inloggen één keer: is dit account via een collega gemaakt, dan vraagt de server het cadeau aan.
// Tot het e-mailadres bevestigd is gebeurt er niets en probeert de app het bij een volgende keer opnieuw.
async function claimReferral() {
  if (demoMode || !currentUser) return;
  if (!currentUser.user_metadata?.invited_by || currentUser.app_metadata?.referral_claimed) return;
  try {
    const { data } = await supabaseClient.auth.getSession();
    const response = await fetch('/api/referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data?.session?.access_token || ''}` },
      body: JSON.stringify({ action: 'claim' })
    });
    const result = await response.json().catch(() => ({}));
    if (result.status !== 'claimed') return;
    try {
      localStorage.removeItem(REFERRAL_KEY);
    } catch (_) {}
    await loadPlanState();
    renderProNav();
    await askConfirm(
      `${t('Een maand Savour Pro cadeau')}\n\n${t('Je bent uitgenodigd door een collega. Jullie krijgen allebei een maand Savour Pro: onbeperkt recepten, gedeelde mappen maken en AI-import.')}`,
      { confirmLabel: 'Mooi' }
    );
  } catch (e) {
    console.warn('Cadeau van de collega-uitnodiging niet opgehaald', e);
  }
}
