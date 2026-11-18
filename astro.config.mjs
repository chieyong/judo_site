// @ts-check
import { defineConfig } from 'astro/config';

// Netlify zet URL tijdens de build; lokaal valt het terug op localhost.
const site = process.env.URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  i18n: {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
    routing: {
      // Nederlands op /, Engels op /en/
      prefixDefaultLocale: false,
    },
  },
});
