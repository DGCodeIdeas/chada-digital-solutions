import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || 'https://www.chadadigital.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  build: {
    format: 'file',
    // Optimize for Vercel's edge network
    assets: 'assets/'
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    // Optimize images for Vercel
    optimizeDeps: {
      include: ['@astrojs/react', '@astrojs/sitemap']
    }
  },
  integrations: [
    react(),
    sitemap()
  ]
});
