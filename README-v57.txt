SAVOUR v57

Based on v56 stability fix. Homepage content is preserved.

v57 fixes:
- Public homepage content remains unchanged and remains dark; logged-in light mode cannot recolor the public landing page.
- Removed the remaining performance bottleneck in the language engine: v57 translates only the active/new DOM subtree instead of rescanning the complete document after every render/mutation.
- Added a complete language catalog for the landing-page mobile preview, search labels/placeholders and login/sign-up controls so English and Dutch switch cleanly; the same critical strings are covered in DE/IT/ES.
- Shared-map rename and delete actions are now implemented, owner-checked and persisted in Supabase.
- Shared-map folder creation modal/actions are implemented.
- Personal "Nieuwe map" opener is restored.
- Profile photo crop/save functions are restored.
- Shared-map photo save is implemented with a 3 MB client limit.
- Opening an already-loaded shared map no longer reloads the complete database state; this removes a large unnecessary round trip.
- Owner membership repair only runs when the owner membership is actually missing, avoiding unnecessary extra Supabase writes/reads.
- Bug report API now returns the actual Resend error to the UI, supports optional BUG_REPORT_TO / BUG_REPORT_FROM environment variables, sends both HTML and plain text, and handles Vercel 413 payload errors more clearly.

Important:
- The bug-report delivery still depends on the receiving mailbox/DNS being healthy. In the current setup that is contact@savour.page at TransIP. TransIP receiving should be fixed separately before relying on bug-report delivery.
- RESEND_API_KEY remains required in Vercel Production. Vercel environment-variable changes require a redeploy.
