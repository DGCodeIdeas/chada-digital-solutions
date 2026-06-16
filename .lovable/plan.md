## Chada Digital — Single-Page Landing

The user supplied a specific design direction (soft-dark palette, brand logo, tagline "Digital Solutions That Scale Businesses"), so I'll build directly using the v1 "Digital tech noir" composition retuned to their palette — no further direction selection needed.

### Sections (in order, anchored)

1. **Hero** — Logo + "CHADA DIGITAL" wordmark, tagline "Digital Solutions That Scale Businesses", single CTA "Start a Project" (electric blue), soft blue glow background.
2. **About** — Two-column: image-side visual + Chada ethos copy (Nigerian agency, global standards).
3. **Services** — 3 cards: Web Development, Branding & Design, Automation. Card bg #16223F, electric-blue icons.
4. **Portfolio** — 2 staggered project cards with generated visuals + project name/category.
5. **Why Choose Us** — 3–4 reasons (Hyper-Efficiency, Local Nuance, Technical Rigor, Transparent Process) in left column + soft glow accent right column.
6. **Contact / Lead Form** — Name, Email, Service Interest (select), Message, Submit. Frontend-only (form shows success toast); no backend wiring in this pass.

Sticky top nav with anchor links (Services, Work, Contact) and minimal footer.

### Design tokens (locked from user)

- `--background`: #0D1527
- `--card`: #16223F
- `--primary` (electric blue): #00A3FF
- `--foreground` (soft white): #E2E8F0
- `--muted-foreground` (slate): #94A3B8
- Soft radial blue glows (20% opacity, heavy blur) behind hero and contact sections.
- No pure black/white anywhere.
- Fonts: Outfit (display) + Inter (body), loaded via `<link>` in `__root.tsx`.

### Technical plan

- Replace `src/routes/index.tsx` with the full landing composition (sectioned components inline or split into `src/components/landing/*`).
- Update `src/styles.css` `:root` (and `.dark`) tokens to the new palette; map fonts in `@theme inline`.
- Add font `<link>` tags to `src/routes/__root.tsx` head.
- Register logo as a Lovable Asset (no binary in repo): `lovable-assets create --file /mnt/user-uploads/IMG-20260612-WA0016_1.jpg` → import JSON pointer for the hero logo.
- Generate 2 portfolio thumbnails + 1 hero ambient visual via imagegen (saved to `src/assets/`).
- Contact form: local React state + sonner toast on submit (no DB).
- SEO: per-route `head()` with title "Chada Digital — Digital Solutions That Scale Businesses", matching description, og tags, relative canonical, Organization JSON-LD.

### Out of scope (ask later if needed)

- Backend storage for lead form (would need Lovable Cloud).
- Multi-page routes — single page only.
- Testimonials, pricing, blog.
