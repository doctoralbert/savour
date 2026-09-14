Savour v56 — stability correction

This build keeps the approved v55 homepage content intact.

Corrections:
- Removed the accidental JavaScript text that was sitting after </html> and therefore rendering below the footer.
- Moved v56SetSiteLanguage() and submitBugReport() back inside the final script block.
- Public/non-logged-in pages, including the homepage, always remain in the dark Savour identity; Light/Dark is only applied to the logged-in app.
- Removed the CSS content:url() override from the main logo so the HTML image src is authoritative.
- Added a conservative logo fallback if the primary logo asset cannot be loaded.
- Kept the existing landing story/platform sections unchanged.

No recipe data, Supabase configuration, API endpoints, or product functionality were intentionally changed.
