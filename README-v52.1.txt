SAVOUR v52.1

Changes:
- Fixed missing homepage translations for the refreshed public and logged-in homepage copy in EN/DE/IT/ES.
- Admin login no longer contains a hardcoded admin email or password in frontend code.
- Admin authorization is now based only on the saviour_admin_users table.
- Added all-time unique visitors.
- Added a 30-day daily unique visitor growth chart.
- Added total visit events.
- Fixed refresh button with visible loading/disabled state and error handling.
- Added a Google AdSense admin panel showing the publisher ID and API integration status.
- Real AdSense earnings/impressions/clicks require a secure Google OAuth connection through the server; no Google secrets are stored in the browser.

Supabase:
Run SUPABASE_V52_1_ADMIN.sql once after SUPABASE_V52_ADMIN.sql.
The SQL grants admin access to the existing admin account by email in the database, not in the website frontend.

Admin URL:
https://savour.page/admin
