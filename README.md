# Chada Digital

Digital Solutions That Scale Businesses — Agency portfolio built with [Astro](https://astro.build).

## Tech Stack

- **Framework:** Astro 4.x (Static)
- **Language:** TypeScript (strict)
- **Styling:** Custom CSS (in `public/assets/css/styles.css`)
- **Icons:** Inline SVG via `Icon.astro` component
- **Interactivity:** Vanilla JS (`public/assets/js/main.js`)
- **Deploy:** Vercel (via Git integration)

## Project Structure

```
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
│   │   ├── site.json           # ALL editable content lives here
│   │   ├── settings.json       # Admin settings (email, validation rules)
│   │   └── submissions.json    # Contact form submissions storage
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML shell
│   ├── lib/
│   │   └── auth.ts             # Authentication utilities
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── 404.astro           # Not found page
│   │   ├── showcase.astro      # Showcase page
│   │   ├── admin/              # Admin dashboard pages
│   │   │   ├── index.astro     # Dashboard (submissions list)
│   │   │   ├── login.astro     # Admin login
│   │   │   └── settings.astro  # Admin settings
│   │   └── api/                # API endpoints
│   │       ├── contact.ts      # Contact form submission
│   │       └── admin/
│   │           ├── check.ts    # Check authentication status
│   │           ├── login.ts    # Admin login
│   │           ├── logout.ts   # Admin logout
│   │           ├── settings.ts # Get/update admin settings
│   │           └── submissions.ts # Get/update submissions
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── env.d.ts                # Astro client types
├── vercel.json                 # Vercel deployment configuration
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## How Content Works

All editable content is in `src/data/site.json`. Change text, links, images, or add new items there — no markup editing required.

### Top-level structure

| Section     | What's inside                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| `settings`  | Site name, URL, logo, OG image, slogan, author, theme color, locale, schema data (address, hours, contact) |
| `nav`       | Navigation links                                                                                           |
| `hero`      | Badge, title, highlight, description, CTAs                                                                 |
| `about`     | Client type cards (Startups, SMEs, etc.)                                                                   |
| `services`  | Service cards with icons, descriptions, links                                                              |
| `portfolio` | Featured projects, button text/id                                                                          |
| `products`  | Product cards with icons, descriptions, links                                                              |
| `contact`   | Info, socials, form fields, submit text                                                                    |
| `footer`    | Tagline, link columns, copyright template                                                                  |
| `modal`     | All 5 projects for the "View All" modal                                                                    |
| `404`       | Error code, title, message, button                                                                         |

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

## Admin Dashboard

The admin dashboard provides a secure interface for managing contact form submissions.

### Features

- **Dashboard** (`/admin`): View and manage contact form submissions
  - Mark submissions as read/unread
  - Delete submissions
  - Search and filter submissions
- **Settings** (`/admin/settings`): Configure admin settings
  - Destination email for notifications
  - Form validation rules
  - Notification preferences

### Authentication

The admin dashboard uses secure session-based authentication with bcrypt password hashing.

1. Set the `ADMIN_PASSWORD_HASH` environment variable in your `.env` file
- **Honeypot spam protection**: Hidden field that bots typically fill
- **Server-side validation**: Using Zod schema validation
- **Email notifications**: Sent via Nodemailer (configure SMTP in `.env`)
- **Data persistence**: Submissions stored in `src/data/submissions.json`

### API Endpoints

| Endpoint                 | Method    | Description                 |
| ------------------------ | --------- | --------------------------- |
| `/api/contact`           | POST      | Submit contact form         |
| `/api/admin/login`       | POST      | Admin login                 |
| `/api/admin/logout`      | POST      | Admin logout                |
| `/api/admin/check`       | GET       | Check authentication status |
| `/api/admin/submissions` | GET, POST | Get/update submissions      |
| `/api/admin/settings`    | GET, POST | Get/update admin settings   |

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

## Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
```

### Required Environment Variables

| Variable              | Description                                       |
| --------------------- | ------------------------------------------------- |
| `ADMIN_EMAIL`         | Email address to receive contact form submissions |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password                     |
| `SESSION_SECRET`      | Secret for signing session cookies                |
| `EMAIL_HOST`          | SMTP server host                                  |
| `EMAIL_PORT`          | SMTP server port                                  |
| `EMAIL_USER`          | SMTP authentication username                      |
| `EMAIL_PASS`          | SMTP authentication password                      |

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

### Step 2: Configure Environment Variables

In your Netlify site settings, go to **Site settings → Build & deploy → Environment → Environment variables** and add:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`

### Step 3: Auto-deploy on push (GitHub Actions)

The repo includes `.github/workflows/deploy.yml` which:

- Builds on every push to `main`/`master`
- Deploys production builds automatically
- Creates preview deploys for Pull Requests

**Required secrets:**

In your GitHub repo, go to **Settings → Secrets and variables → Actions → New repository secret**:

1. `NETLIFY_AUTH_TOKEN` — Get from [Netlify User Settings → Applications](https://app.netlify.com/user/applications/personal)
2. `NETLIFY_SITE_ID` — Get from your Netlify site settings → General → Site details → Site ID

### Step 4: Push to GitHub

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
