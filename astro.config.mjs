import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.chadadigital.com',
  output: 'static',
  build: {
    format: 'file'
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
  integrations: [sitemap()]
});
