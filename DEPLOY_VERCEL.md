# Deploying to Vercel

This project is a TanStack Start app. The Vite config auto-switches the Nitro
preset to `vercel` when building outside the Lovable sandbox, so Vercel just
works out of the box — no `vercel.json` required.

## One-time setup

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New… → Project → Import** your repo.
3. Framework Preset: **Other** (Vercel will detect the Build Output API).
4. Build & Output Settings — leave defaults:
   - Install Command: `bun install` (or `npm install`)
   - Build Command: `bun run build` (or `npm run build`)
   - Output Directory: *(leave empty — Nitro writes `.vercel/output/`)*
5. Add any environment variables your app needs (anything you reference via
   `process.env.*` in server functions, and `VITE_*` for the client).
6. Click **Deploy**.

## Notes

- SSR + server functions run as a Vercel Serverless Function automatically.
- Static assets and the prerendered shell are served from Vercel's CDN.
- The custom Workers entry (`src/server.ts`) is only used in the Lovable
  sandbox build; Vercel uses TanStack Start's default Node entry.
- For preview deployments, Vercel builds every push automatically.
