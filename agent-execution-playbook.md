# Agent Execution Playbook: Next.js App Router Migration

## Objective

This document breaks the migration into manageable, low-risk micro-phases so an autonomous coding agent can work incrementally and avoid context-window overload, hallucinated rewrites, and large-batch failures.

---

## 1. Phase-Based Micro-Tasks

### Phase 1 — Project Initialization & Dependency Swapping

Goal: Establish a working Next.js foundation without changing business logic.

Tasks:

1. Create the Next.js project structure under `src/app`.
2. Install the required dependencies listed in the manifest.
3. Remove Astro and Bootstrap-related imports and packages.
4. Create the MUI theme files and Tailwind config.
5. Add the global CSS entrypoint and provider wrapper.

Deliverables:

- `package.json` updated for Next.js dependencies
- `tailwind.config.js` present
- `src/app/layout.tsx` present
- `src/app/globals.css` present
- `src/theme/theme.ts` present
- `src/components/ThemeProvider.tsx` present

### Phase 2 — Core Layout & Global Theme Setup

Goal: Establish the shared shell, providers, and app-wide styling system.

Tasks:

1. Create the root layout and wire in MUI theme provider.
2. Add metadata, `<html>`, `<body>`, and global CSS imports.
3. Port shared headers, footers, and navigation to React components.
4. Replace global Bootstrap CSS usage with Tailwind + MUI styles.
5. Ensure the app compiles and renders the home page.

Deliverables:

- Root layout functioning
- Shared shell rendering without Bootstrap
- Theme applied globally
- Basic pages rendering without console errors

### Phase 3 — Shared and Leaf Component Migration

Goal: Migrate low-risk, reusable components first.

Tasks:

1. Convert presentational components such as Hero, About, Services, Contact, and Footer.
2. Replace Bootstrap classes with MUI/Tailwind equivalents.
3. Move any component-level state into client components only when necessary.
4. Preserve props and APIs wherever possible.
5. Validate each component individually before proceeding.

Deliverables:

- UI components render correctly
- No Bootstrap imports remain in migrated files
- Reusable components are stable and testable

### Phase 4 — Page-by-Page Migration

Goal: Convert each route from Astro pages to Next.js route segments.

Tasks:

1. Create route folders and `page.tsx` files.
2. Transfer page-level markup and page-specific data.
3. Migrate route-level metadata and SEO handling.
4. Preserve static and dynamic routing behavior.
5. Verify navigation and route rendering after each page.

Deliverables:

- Each Astro page has a Next.js equivalent
- Route structure matches the original site map
- Navigation works end-to-end

### Phase 5 — Data Fetching, State Management, and Server Actions

Goal: Reconcile server-side logic and interactive flows.

Tasks:

1. Convert API endpoints to Next.js route handlers.
2. Move business logic into server components or server actions where appropriate.
3. Preserve admin login, settings, and submission flows.
4. Ensure forms work with server actions or client-side handlers.
5. Run build and type validation.

Deliverables:

- API routes functioning
- Admin flows preserved
- Type checking passes
- Production build succeeds

---

## 2. AI Agent Constraints & Safe Mode Execution

### 2.1 Mandatory Sanity Checks After Every Component Migration

After each migrated component or route, the agent must run:

```bash
npm run typecheck
npm run build
```

If a build fails, stop and fix the specific issue before continuing. Do not batch multiple unrelated fixes.

### 2.2 Safe Execution Rules

1. Prefer small edits over wide rewrites.
2. Preserve existing business logic verbatim unless a rendering boundary change requires adjustment.
3. Do not delete files until the new route/component is verified.
4. Keep one migration concern per pass: routing, styling, or data flow.
5. If a component depends on browser-only APIs, isolate it into a `'use client'` boundary.

### 2.3 Astro Syntax Handling

When encountering Astro syntax, refactor it as follows:

| Astro Pattern | Refactor Strategy |
| --- | --- |
| `.astro` component markup | Convert to `.tsx` and preserve structure in JSX |
| `--- frontmatter ---` | Move logic to a server component or helper module |
| `client:load` | Add `'use client'` and render normally |
| `client:visible` | Use a client component with lazy mounting or intersection-based loading |
| `Astro.props` | Convert to TypeScript props interface |
| `Astro.glob()` | Replace with explicit imports or data loader helper |
| `getStaticPaths()` | Implement `generateStaticParams()` |
| `Astro.redirect()` | Use `redirect()` from `next/navigation` |

### 2.4 TypeScript and Build Safety

The agent should enforce the following before moving forward:

- No unresolved imports
- No duplicate route names
- No invalid MUI prop usage
- No missing `key` props in mapped lists
- No server/client boundary violations

---

## 3. Cost and Time Optimization Guardrails

### 3.1 Reuse Existing Business Logic

The migration target is not a rewrite. The agent should:

- Keep domain logic, validation, forms, data access, auth helpers, and content models intact.
- Reuse existing modules when possible.
- Focus edits on routing, rendering boundaries, and visual/layout code.
- Avoid introducing new abstractions unless required for correctness.

### 3.2 Minimal-Change Strategy

Use the smallest possible change set for each migration step:

- Keep components named the same when feasible.
- Keep existing prop contracts where possible.
- Avoid re-architecting unrelated state management.
- Move styling concerns only when required for the migration.

### 3.3 Progress Logging with `migration-progress.json`

Maintain a progress log after each completed file or phase. The agent should update a file named `migration-progress.json` at the root of the project.

Example structure:

```json
{
  "version": 1,
  "lastUpdated": "2026-07-01",
  "phases": {
    "phase1": { "status": "completed", "files": ["src/app/layout.tsx", "src/theme/theme.ts"] },
    "phase2": { "status": "in_progress", "files": ["src/components/Header.tsx"] },
    "phase3": { "status": "pending", "files": [] },
    "phase4": { "status": "pending", "files": [] },
    "phase5": { "status": "pending", "files": [] }
  },
  "completedFiles": [
    "src/app/layout.tsx",
    "src/theme/theme.ts"
  ],
  "pendingFiles": [
    "src/components/Header.tsx",
    "src/components/Footer.tsx"
  ]
}
```

### 3.4 Resume and Continue Safely

When the agent pauses or resumes work:

1. Read `migration-progress.json` first.
2. Continue from the last completed phase.
3. Re-run typecheck and build on the current checkpoint before proceeding.
4. Avoid re-reading the entire repository unless a new failure requires broader context.

---

## 4. Execution Checklist

- [ ] Dependencies swapped to Next.js + MUI + Tailwind
- [ ] Root layout and theme provider created
- [ ] Shared UI components migrated
- [ ] Route pages converted to App Router segments
- [ ] API routes converted to route handlers
- [ ] Bootstrap imports removed
- [ ] Typecheck passes
- [ ] Production build passes
- [ ] `migration-progress.json` updated
