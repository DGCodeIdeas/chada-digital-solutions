import { createFileRoute } from '@tanstack/react-router';

const BASE_URL = "https://www.chadadigital.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/demos/sterling-vale/", changefreq: "monthly", priority: "0.9" },
          { path: "/demos/sterling-vale/about", changefreq: "monthly", priority: "0.8" },
          { path: "/demos/sterling-vale/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/demos/sterling-vale/projects", changefreq: "monthly", priority: "0.8" },
          { path: "/demos/sterling-vale/services", changefreq: "monthly", priority: "0.8" }
        ];

        const urlLines = entries.flatMap((e) => [
          "  <url>",
          `    <loc>${BASE_URL}${e.path}</loc>`,
          e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
          e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
          e.priority ? `    <priority>${e.priority}</priority>` : null,
          "  </url>"
        ].filter(Boolean));

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urlLines.join("\n") +
          `\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
