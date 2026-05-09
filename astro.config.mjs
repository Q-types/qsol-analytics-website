import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://qsol-analytics.com',
  output: 'hybrid',
  adapter: vercel({
    runtime: 'nodejs20.x'
  }),
  integrations: [
    mdx(),
    tailwind()
  ]
});
