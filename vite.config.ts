// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deployment:
// - Inside Lovable's sandbox, nitro is forced to the Cloudflare preset and
//   `src/server.ts` (Workers `{ fetch }` entry) is used for the published site.
// - Outside Lovable (e.g. Vercel CI), nitro is force-enabled with the Vercel
//   preset, which emits Vercel's Build Output API v3 to `.vercel/output/`.
//   Vercel auto-detects this — no `vercel.json` required. The default
//   TanStack Start Node server entry is used (the Workers entry override is
//   only applied in the Lovable build).
const isLovableBuild = Boolean(process.env.DEV_SERVER__PROJECT_PATH || process.env.LOVABLE_SANDBOX);

export default defineConfig({
  tanstackStart: isLovableBuild
    ? {
        // Redirect TanStack Start's bundled server entry to src/server.ts
        // (our Cloudflare Workers SSR error wrapper).
        server: { entry: "server" },
      }
    : {},
  nitro: isLovableBuild ? undefined : { preset: "vercel" },
});
