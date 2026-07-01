# Migration Manifest: Astro (Custom SSR) -> Next.js App Router

## Purpose

This document is the primary migration contract for an autonomous coding agent migrating the Chada application from a custom Astro + React architecture to Next.js using the App Router.

It is optimized for low-context execution and sequential handoff. The agent should read this file first, then follow the staged playbook in the companion documents.

---

## 1. Architectural Mapping Matrix

### 1.1 High-Level Platform Translation

| Astro Concept | Current Chada Pattern | Next.js App Router Equivalent | Rendering Model | Notes |
| --- | --- | --- | --- | --- |
| `src/pages/*.astro` | Route pages such as index, showcase, admin | `src/app/*/page.tsx` | Server by default | Use route folders and `page.tsx` |
| `src/layouts/Layout.astro` | Shared shell layout | `src/app/layout.tsx` | Server | Wrap all pages with a global layout |
| `src/components/*.astro` | Reusable UI sections | `src/components/*.tsx` or `src/app/components/*.tsx` | Server unless interactive | Add `'use client'` only where needed |
| Islands / client hydration (`client:load`, `client:visible`) | React islands embedded in Astro | Client Components | Client | Mark components with `'use client'` |
| SSR page data / frontmatter | `Astro.props`, server-side rendering | Server Components + `async function` | Server | Prefer server data fetching over client fetching |
| API endpoints | `src/pages/api/...` | `src/app/api/.../route.ts` | Server | Replace with route handlers |
| Static generation | Astro static output | `generateStaticParams()` + `export const dynamic = 'force-static'` | Build-time | Use when routes are known and stable |
| Middleware / redirects | Astro redirects or custom server logic | `middleware.ts`, redirects config, route handlers | Server | Preserve redirects and auth behavior |

### 1.2 Current Repository Mapping

| Existing File / Folder | Target Location | Migration Strategy |
| --- | --- | --- |
| `src/pages/index.astro` | `src/app/page.tsx` | Convert page markup and page-level data to a server component |
| `src/pages/showcase.astro` | `src/app/showcase/page.tsx` | Move to route segment folder |
| `src/pages/404.astro` | `src/app/not-found.tsx` | Replace with App Router not-found handling |
| `src/pages/admin/index.astro` | `src/app/admin/page.tsx` | Preserve admin route structure |
| `src/pages/admin/login.astro` | `src/app/admin/login/page.tsx` | Keep route nesting |
| `src/pages/admin/settings.astro` | `src/app/admin/settings/page.tsx` | Preserve route nesting |
| `src/pages/api/contact.ts` | `src/app/api/contact/route.ts` | Convert to route handler |
| `src/pages/api/admin/*.ts` | `src/app/api/admin/*/route.ts` | Convert to route handlers |
| `src/layouts/Layout.astro` | `src/app/layout.tsx` | Move global chrome, SEO, and providers here |
| `src/components/*.astro` | `src/components/*.tsx` | Convert to React components; preserve props and logic |
| `src/components/ProjectsModal.tsx` | `src/components/ProjectsModal.tsx` | Retain component but adapt to MUI and Next.js conventions |
| `src/lib/auth.ts` | `src/lib/auth.ts` | Keep business logic intact; only adjust imports |
| `src/data/*.json` | `src/data/*.json` | Keep static data files as-is and import them from server components |

### 1.3 Rendering Boundary Rules

Use these rules to prevent accidental client/server mismatch:

- Server Components are the default in App Router.
- Use `'use client'` only for components that need browser APIs, event handlers, hooks, or client-side state.
- Keep data fetching in Server Components wherever possible.
- Pass only serializable props from server to client components.
- Avoid importing client-only packages into server components.

### 1.4 Astro-Specific Syntax Replacement Guide

| Astro Syntax | Next.js App Router Equivalent |
| --- | --- |
| `--- frontmatter ---` | Server component top-level logic, `async function`, `await` |
| `Astro.props` | Function props in TSX |
| `<Component client:load />` | `'use client'` component rendered normally |
| `<Component client:visible />` | `'use client'` component with lazy mounting or intersection observer |
| `<Component client:only="react" />` | `'use client'` component with explicit client-only rendering |
| `Astro.glob()` | Static import or a data loader module |
| `getStaticPaths()` | `generateStaticParams()` |
| `Astro.redirect()` | `redirect()` from `next/navigation` |
| `Astro.url` | `new URL(request.url)` or `headers()` / `next-url` helpers |
| `Astro.request` | `request` object in route handlers or server components |

### 1.5 File-by-File Replacement Strategy

1. Create the Next.js app shell first.
2. Move shared layout and provider logic into `src/app/layout.tsx`.
3. Convert route pages into `page.tsx` files under `src/app`.
4. Convert API endpoints into route handlers under `src/app/api`.
5. Convert presentational Astro components into TSX components in `src/components`.
6. Only after rendering is stable, migrate styling to MUI + Tailwind.
7. Remove all Bootstrap / React-Bootstrap references during the style migration pass.

---

## 2. Environment & Dependency Realignment

### 2.1 Dependency Removal Plan

Run these commands in order to remove Astro and Bootstrap artifacts:

```bash
npm uninstall astro @astrojs/react @astrojs/sitemap @astrojs/vercel bootstrap react-bootstrap
npm uninstall @types/react @types/react-dom
```

If the project still uses old Astro-specific build scripts, remove or replace them:

```bash
npm pkg delete scripts.dev scripts.start scripts.build scripts.preview scripts.astro
```

### 2.2 Next.js + MUI + Tailwind Installation

Use the following dependency set for the migration:

```bash
npm install next@14.2.15 react@18.3.1 react-dom@18.3.1
npm install @mui/material@5.16.2 @mui/icons-material@5.16.2 @emotion/react@11.11.10 @emotion/styled@11.11.10
npm install -D tailwindcss@3.4.13 postcss@8.4.49 autoprefixer@10.4.20
npx tailwindcss init -p
```

### 2.3 Recommended Package.json Shape

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.15",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@mui/material": "5.16.2",
    "@mui/icons-material": "5.16.2",
    "@emotion/react": "11.11.10",
    "@emotion/styled": "11.11.10"
  },
  "devDependencies": {
    "tailwindcss": "3.4.13",
    "postcss": "8.4.49",
    "autoprefixer": "10.4.20",
    "typescript": "5.9.3"
  }
}
```

### 2.4 Peer Dependency Compatibility Notes

- Use React 18.x with Next 14.x for the most stable migration path.
- Keep MUI v5 for compatibility with the existing component patterns and simpler migration.
- Avoid mixing older Bootstrap-era wrappers or old CSS import patterns with MUI.
- If the agent introduces a new package, verify the peer dependency tree before committing changes.

---

## 3. MUI + Tailwind Hybrid Theme Engine Configuration

### 3.1 Tailwind Configuration

Create `tailwind.config.js` with the following content:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: '#__next',
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8ecff',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 35px rgba(15, 23, 42, 0.08)'
      },
      spacing: {
        18: '4.5rem'
      }
    }
  },
  plugins: []
};
```

### 3.2 Global CSS

Create `src/app/globals.css` with the following content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light;
    --mui-font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  }

  html,
  body {
    min-height: 100%;
  }

  body {
    @apply bg-slate-50 text-slate-900 antialiased;
    font-family: var(--mui-font-family);
  }

  * {
    @apply box-border;
  }

  #__next {
    isolation: isolate;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 3.3 MUI Theme Definition

Create `src/theme/theme.ts` with the following content:

```ts
'use client';

import { createTheme } from '@mui/material/styles';

export const tailwindPalette = {
  brand: {
    50: '#f5f7ff',
    100: '#e8ecff',
    500: '#4f46e5',
    600: '#4338ca',
    700: '#3730a3'
  },
  slate: {
    50: '#f8fafc',
    900: '#0f172a'
  }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: tailwindPalette.brand[500],
      dark: tailwindPalette.brand[700],
      light: tailwindPalette.brand[100]
    },
    secondary: {
      main: '#0f172a'
    },
    background: {
      default: tailwindPalette.slate[50],
      paper: '#ffffff'
    },
    text: {
      primary: tailwindPalette.slate[900]
    }
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.6 }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 35px rgba(15, 23, 42, 0.08)'
        }
      }
    }
  }
});
```

### 3.4 Theme Provider Wrapper

Create `src/components/ThemeProvider.tsx`:

```tsx
'use client';

import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { theme } from '@/theme/theme';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
```

### 3.5 App Layout Integration

Wire the provider into `src/app/layout.tsx`:

```tsx
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Chada Digital',
  description: 'Digital solutions that scale businesses.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 3.6 Collaboration Rule

- Use Tailwind for layout utilities and spacing overrides.
- Use MUI `sx` props for component-level styling that depends on theme values.
- Avoid using both Tailwind and raw CSS files for the same UI concern unless the separation is intentional.

---

## 4. Migration Safety Checklist

- Remove all Bootstrap and React-Bootstrap imports from the codebase.
- Replace grid layouts with Tailwind Flex/Grid or MUI Grid2.
- Replace custom modal logic with MUI Dialog or Modal where appropriate.
- Keep existing business logic intact and only rewire rendering boundaries.
- Validate all routes, metadata, and API handlers after each pass.
