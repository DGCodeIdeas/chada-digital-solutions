# Chada Digital

Digital Solutions That Scale Businesses — Agency portfolio built with [Astro](https://astro.build).

## Tech Stack

- **Framework:** Astro 4.x (Static)
- **Language:** TypeScript (strict)
- **Styling:** Custom CSS (in `public/assets/css/styles.css`)
- **Icons:** Inline SVG via `Icon.astro` component
- **Interactivity:** Vanilla JS (`public/assets/js/main.js`)
- **Deploy:** Netlify (via GitHub Actions CI/CD)

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions → Netlify
├── public/                     # Static assets (copied to dist as-is)
│   ├── assets/
│   │   ├── css/styles.css      # Global styles
│   │   ├── js/main.js          # Vanilla JS interactivity
│   │   └── images/             # Project images
│   ├── demos/                  # Static demo sub-sites
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/             # Reusable Astro components
│   │   ├── SEO.astro           # Meta tags, Open Graph, JSON-LD
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── Portfolio.astro
│   │   ├── Products.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── ProjectsModal.astro
│   │   └── Icon.astro          # SVG icon component
│   ├── data/
│   │   └── site.json           # ALL editable content lives here
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML shell
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   └── 404.astro           # Not found page
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── env.d.ts                # Astro client types
├── astro.config.mjs
├── netlify.toml
├── package.json
├── tsconfig.json
└── README.md
```

## How Content Works

All editable content is in `src/data/site.json`. Change text, links, images, or add new items there — no markup editing required.

### Top-level structure

| Section | What's inside |
|---------|--------------|
| `settings` | Site name, URL, logo, OG image, slogan, author, theme color, locale, schema data (address, hours, contact) |
| `nav` | Navigation links |
| `hero` | Badge, title, highlight, description, CTAs |
| `about` | Client type cards (Startups, SMEs, etc.) |
| `services` | Service cards with icons, descriptions, links |
| `portfolio` | Featured projects, button text/id |
| `products` | Product cards with icons, descriptions, links |
| `contact` | Info, socials, form fields, submit text |
| `footer` | Tagline, link columns, copyright template |
| `modal` | All 5 projects for the "View All" modal |
| `404` | Error code, title, message, button |

### Example: Change the hero

```json
{
  "hero": {
    "title": "Digital Solutions That",
    "titleHighlight": "Scale Businesses",
    "description": "We engineer high-performance websites..."
  }
}
```

### Example: Add a new project

```json
{
  "modal": {
    "projects": [
      ...existing projects,
      { "href": "/demos/new", "alt": "New", "image": "/assets/images/project-new.jpg", "title": "New Project", "description": "Description" }
    ]
  }
}
```

## Path Aliases

Use `@/` for imports:

```astro
---
import Layout from '@/layouts/Layout.astro';
import siteData from '@/data/site.json';
---
```

## Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4323)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Netlify via GitHub

### Step 1: Create a Netlify site

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **Add new site → Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Choose your repo
5. Build settings are already in `netlify.toml` — no manual config needed:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**

### Step 2: Auto-deploy on push (GitHub Actions)

The repo includes `.github/workflows/deploy.yml` which:
- Builds on every push to `main`/`master`
- Deploys production builds automatically
- Creates preview deploys for Pull Requests

**Required secrets:**

In your GitHub repo, go to **Settings → Secrets and variables → Actions → New repository secret**:

1. `NETLIFY_AUTH_TOKEN` — Get from [Netlify User Settings → Applications](https://app.netlify.com/user/applications/personal)
2. `NETLIFY_SITE_ID` — Get from your Netlify site settings → General → Site details → Site ID

### Step 3: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Netlify will auto-deploy on every push. Pull Requests get preview URLs via GitHub Actions.

### Alternative: Netlify Git integration (no Actions)

If you prefer Netlify's native Git integration instead of GitHub Actions:
1. In Netlify site settings → Build & deploy → Continuous deployment
2. Select your GitHub repo
3. Netlify builds and deploys automatically on every push

(You can then delete `.github/workflows/deploy.yml` if you don't want Actions.)

## Adding Dynamic Demos Later

When you need React interactivity on a specific page, add a React island:

```astro
---
import Dashboard from '@/components/Dashboard';
---

<Dashboard client:load />
```

Install React first:
```bash
npm install @astrojs/react react react-dom
```

The rest of the site stays static and zero-JS.
