# Chada Digital — Site Fixes Handoff (for Cline)

Context: chadadigital.com is built/hosted via Lovable. Found via audit on 2026-06-19. Goal: fix SEO/crawlability issues and dead links before pushing on social + directory listings.

---

## Prompt to paste into Cline

```
I'm the technical lead for chadadigital.com, a small business/digital agency site.
I need you to fix the following issues in the codebase. Work through them one at a time,
show me the diff before committing, and don't change visual design/layout unless a fix
requires it.

1. CANONICAL TAG BUG
   The site currently has <link rel="canonical" href="https://www.chadadigital.com">
   (or equivalent meta/og tags pointing to the Lovable subdomain) instead of self-referencing
   https://www.chadadigital.com/. Find every canonical/og:url/twitter reference across the app
   (likely in index.html, a Helmet/SEO component, or per-route head config) and update them to
   point to www.chadadigital.com. Confirm there's only one canonical tag per page.

2. DEAD FOOTER LINKS
   Footer links for About Us, Services, Our Work, Products, Blog, Careers, Privacy Policy,
   Terms of Service, Contact Us, and FAQ currently point to "#". Find each of these and either:
   (a) link them to a real route/section if one exists, or
   (b) flag to me which ones need actual pages built, so I can prioritize content.
   Do not leave any nav/footer link as a bare "#" — that's a quality signal Google penalizes
   and it breaks user trust.

3. SITEMAP + ROBOTS.TXT
   Check if sitemap.xml and robots.txt exist and are correctly served at the root. If missing,
   generate a sitemap.xml covering all real routes/sections and a robots.txt that allows
   crawling and references the sitemap. 

4. HEADING STRUCTURE / SEMANTIC HTML AUDIT
   Audit the homepage for a single H1 ("Digital Solutions That Scale Businesses." or similar)
   and confirm service/section headers use proper H2/H3 hierarchy, not just styled divs.

5. IMAGE ALT TEXT
   Check that all images (hero devices image, project thumbnails, logo) have descriptive
   alt attributes — several currently look unlabeled or use generic filenames as alt text.

After each fix, give me a short summary of what changed and why, so I can update the rest
of the team.
```

---

## Background / why these matter (for your own reference)

- **Canonical bug**: actively tells Google to index the Lovable subdomain instead of the real
  domain — this is likely suppressing search visibility for chadadigital.com entirely.
- **Dead links**: footer currently links About Us, Services, Our Work, Products, Blog, Careers,
  Privacy Policy, Terms of Service, Contact Us, FAQ all to `#`. Bad for UX, bad for crawlability.
- **No sitemap/Search Console submission confirmed** — worth checking and submitting once fixed.
- **Portfolio credibility**: separate from code — confirm whether Sterling & Vale, Veritas Homes,
  KudaClone, Brix & Stone, Foodie Express are real clients or demo work, and label accordingly.
  Not a Cline task, but flag for content/marketing follow-up.

## Next steps after code fixes (not for Cline)
- Submit sitemap to Google Search Console
- Claim Google Business Profile (Lagos)
- Set up LinkedIn Company Page (highest priority social channel for B2B agency)
- Apply to Clutch, GoodFirms, Sortlist directory listings
