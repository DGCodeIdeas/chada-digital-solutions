## Build a working corporate-site demo and feature it

I'll build a full multi-page **corporate/business** demo for a fictional client — **Sterling & Vale Construction**, a Lagos-based construction firm — hosted inside this project under `/demos/sterling-vale/*`, and add it as a new card in the home page's Featured Projects grid that opens the live demo in a new tab.

### Why a construction firm
Best fit for the corporate template: image-led hero, services grid, project case studies, testimonials, contact — all without needing a backend. Brand will feel distinct from Chada (warm concrete + amber palette, serif display) so it reads as a real client, not a Chada clone.

### Routes to add
```text
src/routes/demos/sterling-vale.tsx              -> /demos/sterling-vale  (layout: header + outlet + footer)
src/routes/demos/sterling-vale.index.tsx        -> /demos/sterling-vale            (Home)
src/routes/demos/sterling-vale.about.tsx        -> /demos/sterling-vale/about      (About)
src/routes/demos/sterling-vale.services.tsx     -> /demos/sterling-vale/services   (Services)
src/routes/demos/sterling-vale.projects.tsx     -> /demos/sterling-vale/projects   (Past Projects)
src/routes/demos/sterling-vale.contact.tsx      -> /demos/sterling-vale/contact    (Contact form — frontend-only, toast on submit)
```

Each route gets its own `head()` with unique title + meta description + og tags. A small "Demo built by Chada Digital" ribbon links back to `/`.

### Sections per page
- **Home** — Hero (tagline "Building Nigeria's Skyline, One Project at a Time" + CTA), services teaser (3 cards), stats strip (250+ projects, 18 yrs, 40 engineers), 2 featured project cards, testimonial, CTA band.
- **About** — Company story, mission/values, leadership cards (3 fictional execs with generated portraits), timeline 2007 → 2026.
- **Services** — 6 services: Commercial Construction, Residential Builds, Civil Engineering, Renovation, Project Management, MEP. Each with icon + description.
- **Projects** — 6 case-study cards (generated images) with name, location, sector, year.
- **Contact** — Form (name, email, phone, project type, message) → `sonner` toast on submit; office address, phone, business hours.

### Design tokens (scoped to the demo)
Add a `.theme-sterling` class on the demo layout root that overrides the existing CSS variables locally — no changes to Chada's global tokens. Palette:
- bg `#F5F1EA` (warm concrete), surface `#FFFFFF`, foreground `#1C1A17`
- primary `#C2410C` (burnt amber), accent `#0F3A2E` (deep forest)
- display font Playfair Display, body Inter (loaded via `<link>` in `__root.tsx` alongside existing fonts)

### Featured Projects integration
In `src/routes/index.tsx`:
- Generate one new project thumbnail `src/assets/project-sterling.jpg` (modern construction site / skyline render).
- Append to `PROJECTS`:
  ```ts
  { image: projectSterling, name: "Sterling & Vale", category: "Construction Firm — Live Demo", href: "/demos/sterling-vale" }
  ```
- Update the `Portfolio` card: when `href` is present, wrap the card in a `<Link to={href} target="_blank">` with a small "Live demo ↗" badge overlay so visitors immediately see this one is clickable. Existing 4 cards keep their current static behavior.
- Grid stays `lg:grid-cols-4`; on `xl` it becomes `xl:grid-cols-5` so the row fits 5 cards on wide screens and wraps cleanly below.

### Images
Generate with `imagegen` (fast tier, .jpg) into `src/assets/sterling/`:
- `hero.jpg` — construction crew on a high-rise rooftop at golden hour
- `about.jpg` — leadership team on a project site
- 3 leadership portraits
- 6 project thumbnails (tower, residential estate, bridge, mall, factory, school)
- plus the `project-sterling.jpg` Featured Projects thumbnail

### Out of scope (ask if needed)
- Backend lead capture for the demo's contact form (would need Lovable Cloud)
- Multilingual content, blog, careers page
- Replacing any of the existing 4 portfolio entries — only appending

### Verification
After build, navigate the preview to `/demos/sterling-vale`, click through all 5 nav links, submit the contact form, and confirm the Featured Projects card on `/` opens the demo in a new tab.
