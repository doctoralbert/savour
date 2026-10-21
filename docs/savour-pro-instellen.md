# Savour Pro instellen

Stap voor stap, in deze volgorde. Plak geheime sleutels alleen in Vercel of Supabase, nooit in een chat
of in de code.

## 1. Supabase: database bijwerken

Supabase-dashboard → **SQL Editor** → plak en **Run**, in deze volgorde (elk bestand mag vaker):

1. `supabase/2026-10-21-categorie-trefwoorden.sql` (trefwoorden per categorie)
2. `supabase/2026-10-21-teamlid-op-email.sql` (teamlid toevoegen via e-mailadres)
3. `supabase/2026-10-21-savour-pro.sql` (abonnementen en AI-teller)

Jezelf Pro geven zonder te betalen (als eigenaar, of om te testen): zie de opdracht bovenin
`2026-10-21-savour-pro.sql`.

## 2. OpenAI: de AI

1. platform.openai.com → **Billing** → zet er tegoed op (bijv. $5).
2. **Billing → Limits** → stel een maandlimiet in (bijv. $10). Dan kan het nooit onverwacht duur worden.
3. **API keys** → **Create new secret key** (naam: "Savour Vercel"). Kopieer hem meteen.

## 3. Stripe: betalen

1. Maak een account op stripe.com en vul je bedrijfsgegevens in (voor iDEAL zijn KvK en bankrekening nodig).
2. Werk eerst in **testmodus** (schakelaar rechtsboven).
3. **Product catalogue → Add product**: "Savour Pro", met twee prijzen:
   - € 2,99 per maand (terugkerend)
   - € 29 per jaar (terugkerend)

   Noteer van elke prijs het **prijs-ID** (begint met `price_`).
4. **Settings → Payment methods**: zet iDEAL, kaarten, Apple Pay, Google Pay en (optioneel) PayPal aan.
   iDEAL werkt bij een abonnement voor de eerste betaling; daarna incasseert Stripe automatisch via SEPA.
5. **Settings → Billing → Customer portal**: zet aan dat klanten kunnen opzeggen, hun betaalmethode
   wijzigen en facturen kunnen zien.
6. **Developers → Webhooks → Add endpoint**:
   - URL: `https://savour.page/api/stripe-webhook`
   - Gebeurtenissen: `checkout.session.completed`, `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`
   - Na opslaan: kopieer het **Signing secret** (begint met `whsec_`).
7. **Developers → API keys**: kopieer de **Secret key** (begint met `sk_test_` in testmodus).

## 4. Vercel: sleutels invullen

Vercel → project **savour** → **Settings → Environment Variables**. Voeg toe (Production én Preview,
zet "Sensitive" aan):

| Naam | Waar vandaan |
|---|---|
| `OPENAI_API_KEY` | OpenAI, stap 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` |
| `STRIPE_SECRET_KEY` | Stripe, stap 3.7 |
| `STRIPE_WEBHOOK_SECRET` | Stripe, stap 3.6 |
| `STRIPE_PRICE_MONTH` | Stripe, prijs-ID van € 2,99 per maand |
| `STRIPE_PRICE_YEAR` | Stripe, prijs-ID van € 29 per jaar |

De `service_role`-sleutel geeft volledige toegang tot je database: alleen in Vercel zetten.

## 5. Testen (in Stripe-testmodus)

1. Zet de nieuwe versie live (eerst de testversie op Vercel).
2. Log in met je testaccount → **Savour Pro** → **Kies maandelijks**.
3. Betaal met testkaart `4242 4242 4242 4242`, een datum in de toekomst en willekeurige CVC.
4. Terug in Savour: na een paar seconden staat bij **Mijn account → Abonnement** "Savour Pro".
5. Importeer een foto van een recept: de AI leest hem, en de teller gaat omhoog.
6. **Abonnement beheren** → opzeggen → je houdt Pro tot het einde van de periode.

Werkt alles? Zet Stripe op **live**, maak dezelfde twee prijzen en de webhook opnieuw aan in live, en
vervang in Vercel de vier Stripe-waarden door de live-waarden.

## Goed om te weten

- **Btw:** Savour valt onder de kleineondernemersregeling (KOR): er wordt geen btw gerekend. Zet Stripe Tax
  dus níet aan, en zet in Stripe bij de factuurinstellingen de tekst "Vrijgesteld van btw op grond van de
  kleineondernemersregeling (KOR)". Kom je boven de omzetgrens van de KOR (€ 20.000 per jaar), of verkoop
  je voor meer dan € 10.000 per jaar aan particulieren in andere EU-landen, overleg dan met je boekhouder.
- **Herroepingsrecht:** consumenten hebben bij online abonnementen in principe 14 dagen bedenktijd.
  Laat de voorwaarden hierop controleren door een jurist.
- **Wat Pro bepaalt:** de server controleert bij elke AI-import of iemand Pro is en onder de 500 zit.
  Iets in de browser aanpassen geeft dus geen gratis AI.
