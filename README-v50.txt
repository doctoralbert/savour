SAVOUR v50

Basis: v49.

v50 changes:
- Mobile navigation now includes Recept toevoegen.
- Mobile popup/modal layers are above the bottom navigation and have compact sizing so action buttons remain visible.
- Shared-map chooser is more compact and stays fully above the mobile bottom navigation.
- Recept delen now supports WhatsApp, Telegram, e-mail and link kopiëren.
- Share links use the current live Savour domain so the same share flow can later be reused by the native app/deep-link layer.
- Added real AI photo import for handwritten/photographed recipes through /api/ai-import.
- AI import is server-side: OPENAI_API_KEY must be configured in Vercel Environment Variables. Never put the key in frontend code.
- AI photo import returns structured recipe data for review/editing before saving.
- AI-imported source photo is retained on the recipe when the user saves it.
- No existing auth, RLS, translation, folder, shared-map ownership or other v49 behavior was intentionally changed.

DEPLOYMENT NOTE FOR AI
1. Deploy this v50 through the existing GitHub -> Vercel project.
2. In Vercel Project Settings -> Environment Variables add:
   OPENAI_API_KEY = your OpenAI API key
3. Redeploy.
4. Test Recept toevoegen -> Recept importeren -> Foto uit je fotoalbum with a clear handwritten recipe.

The API key is only read by the Vercel serverless function. Do not paste it into the site source or send it in chat.
