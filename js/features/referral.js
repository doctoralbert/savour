// Nodig een collega uit: een persoonlijke link (savour.page/?collega=<id>). Maakt een collega daarmee een account
// en bevestigt die het e-mailadres, en logt die in, dan krijgt de uitnodiger 14 dagen Savour Pro cadeau (api/referral.js).
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
  const message = `${t('Ik bewaar mijn recepten in Savour, handig in de keuken. Probeer het via deze link, je krijgt 7 dagen Savour Pro gratis:')} ${link}`;
  const count = Number(currentUser.app_metadata?.referral_rewards) || 0;
  const options = [{ label: 'Link kopiëren', value: 'copy', primary: true }];
  options.push({ label: 'Delen via WhatsApp', value: 'whatsapp' });
  if (navigator.share) options.push({ label: 'Delen via…', hint: 'Mail, berichten of een andere app', value: 'share' });
  const choice = await askChoice(
    `${t('Nodig een collega uit')}\n\n${t('Stuur je persoonlijke link naar een collega. Maakt die een account aan, bevestigt die het e-mailadres en logt die in, dan krijg jij 14 dagen Savour Pro cadeau.')}\n\n${link}${count ? `\n\n${t('Collega’s uitgenodigd:')} ${count}` : ''}`,
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
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message.replace(link, linkWithSource(link, 'whatsapp')))}`,
      '_blank',
      'noopener'
    );
  } else if (choice === 'share') {
    try {
      await navigator.share({ title: 'Savour', text: message.replace(link, linkWithSource(link, 'gedeeld')) });
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
    if (result.status === 'claimed' || result.status === 'already') {
      try {
        localStorage.removeItem(REFERRAL_KEY);
      } catch (_) {}
    }
  } catch (e) {
    console.warn('Collega-uitnodiging niet doorgegeven', e);
  }
}

// Voor wie uitnodigt: is er sinds de vorige keer een collega bijgekomen, dan een bedankje met de 14 dagen Pro.
async function greetReferralRewards() {
  if (demoMode || !currentUser) return;
  const key = `savour_collega_seen_${currentUser.id}`;
  try {
    const { data } = await supabaseClient.auth.getSession();
    const response = await fetch('/api/referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data?.session?.access_token || ''}` },
      body: JSON.stringify({ action: 'stats' })
    });
    if (!response.ok) return;
    const { rewards = 0 } = await response.json();
    const seen = Number(localStorage.getItem(key)) || 0;
    localStorage.setItem(key, String(rewards));
    if (rewards <= seen) return;
    await loadPlanState();
    renderProNav();
    await askConfirm(
      `${t('14 dagen Savour Pro cadeau')}\n\n${t('Een collega heeft via jouw link een account gemaakt. Bedankt! Je krijgt er 14 dagen Savour Pro bij.')}`,
      { confirmLabel: 'Mooi' }
    );
  } catch (e) {
    console.warn('Collega-beloning niet opgehaald', e);
  }
}
