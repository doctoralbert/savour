SAVOUR v51

Basis: v50 + contact-fix verwerkt.

Belangrijkste wijzigingen:
- Homepage aangescherpt voor professionele chefs en keukenteams.
- Premium visuele hero-card toegevoegd zonder stock/AI-foodfoto.
- Contactpagina nu ook als echte ingelogde view.
- Contact werkt vanuit publieke en ingelogde footer.
- Uitgebreidere publieke info-structuur voorbereid.
- Steun Savour toegevoegd aan alle hoofdfooters; PayPal QR placeholder klaar tot een echte PayPal-link/QR beschikbaar is.
- Recept delen via WhatsApp, Telegram, e-mail en link.
- Gedeelde-map uitnodigingen via WhatsApp, Telegram, e-mail en link.
- /join/<public_key> publieke uitnodigingspagina toegevoegd.
- SUPABASE_V51_SETUP.sql bevat RPC voor publieke gedeelde-mapuitnodigingen.
- Foto-import gebruikt de server-side OpenAI Responses API en GPT-5.6 Luna voor echte beeldanalyse en receptstructurering.
- AI-prompt aangescherpt voor professionele receptuur: hoeveelheden, eenheden, opbrengst, kwalitatieve hoeveelheden, volgorde en [onleesbaar] bij onzekerheid.
- AI-resultaat blijft controleerbaar in de Savour-editor voordat het wordt opgeslagen.
- Zelf invoeren mobiel netter en passend gemaakt; veldlabels niet meer geforceerd in hoofdletters.
- Popups compact gehouden en boven de mobiele navigatie geplaatst.

Supabase:
1. Zorg dat SUPABASE_V50_PUBLIC_SHARING.sql al is uitgevoerd voor openbare receptlinks.
2. Voer daarna SUPABASE_V51_SETUP.sql uit voor de publieke gedeelde-mapuitnodigingspagina.

AI:
- Zet OPENAI_API_KEY als server-side Environment Variable in Vercel.
- Deel deze sleutel nooit in de frontend of met derden.
- Foto's worden naar /api/ai-import gestuurd; de sleutel blijft op Vercel.

PayPal:
- De Steun Savour-pagina bevat bewust nog geen verzonnen QR-code. Voeg later de echte PayPal-link/QR toe zodra het PayPal-account is gekozen.

Domain update: v51 is prepared for the new primary domain https://savour.page/ and uses contact@savour.page for the Contact page.
