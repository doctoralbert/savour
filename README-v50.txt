Savour v50 — refinement build

Basis: v49 / v50.

Included in this build:
- Mobile top icons refined: equal sizing/alignment; CSS-drawn search and power icons.
- Recipe detail actions are compact text buttons on mobile instead of icon-only circles.
- Shared-map/folder actions are compact text buttons on mobile instead of icon-only controls.
- Recipe-add/manual editor is mobile-width safe; labels are no longer forced to uppercase.
- Footer includes Contact page.
- Contact page uses the intended address contact@savour.page. The mailbox itself must still be created with the email/domain provider; Savour cannot provision an external mailbox.
- Public recipe sharing route: /r/<slug> with Vercel rewrite to index.html.
- Sharing creates a public recipe link through Supabase RPC and then WhatsApp/Telegram/e-mail share the public URL.
- SUPABASE_V50_PUBLIC_SHARING.sql must be run once in Supabase SQL Editor.
- Real AI photo import remains server-side through /api/ai-import and OPENAI_API_KEY in Vercel Environment Variables.
- No OpenAI key is included in the frontend or ZIP.
