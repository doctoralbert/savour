Savour v52.2 — admin analytics + password reset

NEW
- Admin dashboard: unique visitors all time, app users, desktop/mobile/native-app usage.
- Visitor growth chart remains 30 days.
- Native app analytics is ready for the future Savour app: set documentElement.dataset.savourApp="true" or window.SAVOUR_NATIVE_APP=true in the native shell before page load, or use a SavourApp/ user agent.
- Admin password reset no longer opens an email client. It creates a Supabase recovery link server-side and sends that link to contact@savour.page.

SECURITY / ENVIRONMENT
Set these Vercel environment variables for the reset email:
- SUPABASE_SERVICE_ROLE_KEY = Supabase service_role key (server-side only; NEVER put it in frontend code)
- RESEND_API_KEY = Resend API key (server-side only)
The frontend contains no admin password.

SUPABASE
Run SUPABASE_V52_2_ADMIN.sql after the previous v52/v52.1 SQL migrations.

NOTE
The native app is not yet present, so native_app counts will remain 0 until the future app reports its visits.
