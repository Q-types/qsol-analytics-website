import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://qsol-analytics.com',
  adapter: vercel(),
  integrations: [
    mdx(),
    tailwind()
  ]
});
