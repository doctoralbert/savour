SAVOUR v56

Based on v55.

Changes:
- Full light-mode pass: interactive cards/buttons/fields/menus/footer/partner/detail actions use white backgrounds and black text/icons; Savour logo becomes black in light mode.
- Replaced the landing/sidebar/public header wordmarks with a direct approved logo asset and added a transparent favicon/S emblem.
- Added mobile logo support.
- Added footer "Bug doorgeven" page with name, email, subject, description and screenshot upload.
- Added /api/bug-report.js. It sends reports to contact@savour.page through Resend when RESEND_API_KEY is configured in Vercel; reply-to is set to the reporter.
- Added a dedicated account activation page for Supabase confirmation redirects, personalized with the user's first name.
- Sign-up now requests redirect to https://savour.page/ and stores first_name/last_name metadata.
- Added a branded Supabase confirmation email template in SUPABASE_V56_CONFIRMATION_EMAIL.html.
- Hardened language engine: UI containers are no longer protected wholesale, so buttons and action labels inside recipe/shared/folder views are translated. User-entered recipe/folder/profile content remains protected.
- Added explicit v56 language rerender before translation to avoid stale Spanish/Dutch placeholders and labels.
- Added localized bug-report and activation copy.

Test account requested:
- Username: test
- Password: test
- Suggested Auth email: test@savour.page
- Because Supabase Auth credentials are external to this ZIP and no service-role credential is available to the build process, the package includes setup instructions rather than pretending the external account was created.

Supabase actions before production testing:
- Set Site URL to https://savour.page.
- Add https://savour.page as an allowed redirect URL.
- Configure RESEND_API_KEY in Vercel for bug reports.
- Paste SUPABASE_V56_CONFIRMATION_EMAIL.html into the Supabase confirmation-email template.
