# QSol Analytics Website Build Pack

## Recommended Stack

### Framework Decision: Astro

**Selected:** Astro 4.x with static generation

**Rationale:**
| Factor | Astro | Next.js | Decision |
|--------|-------|---------|----------|
| Performance | Excellent (zero JS by default) | Good | Astro |
| SEO | Excellent (static HTML) | Excellent | Tie |
| MDX support | Native | Native | Tie |
| Learning curve | Simple | Moderate | Astro |
| Maintenance burden | Low | Moderate | Astro |
| Solo founder friendliness | High | Moderate | Astro |
| Build complexity | Simple | More complex | Astro |

For a content-focused marketing site with a blog, Astro's simplicity and performance make it the better choice. Next.js would be overkill.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 4.x | Static site generation |
| Styling | Tailwind CSS 3.x | Utility-first CSS |
| Content | MDX | Blog posts with components |
| Forms | Formspree | Contact form handling |
| Analytics | Plausible | Privacy-friendly analytics |
| Deployment | Vercel | Edge hosting, automatic deploys |
| Domain | Namecheap/Cloudflare | DNS management |
| Email | Google Workspace / Zoho | Business email |

---

## Repository Structure

```
qsol-analytics/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   ├── MobileMenu.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── ServiceCard.astro
│   │   ├── ProcessStep.astro
│   │   ├── CTASection.astro
│   │   ├── ContactForm.astro
│   │   ├── FAQItem.astro
│   │   ├── BlogCard.astro
│   │   ├── TableOfContents.astro
│   │   └── SEO.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, head, scripts
│   │   ├── PageLayout.astro      # Standard page with header/footer
│   │   ├── ServiceLayout.astro   # Service page template
│   │   └── BlogLayout.astro      # Blog post template
│   │
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── services/
│   │   │   ├── index.astro       # Services overview
│   │   │   ├── automation-workflow.astro
│   │   │   ├── analytics-dashboards.astro
│   │   │   ├── customer-segmentation.astro
│   │   │   └── forecasting-anomaly-detection.astro
│   │   ├── case-studies/
│   │   │   ├── index.astro
│   │   │   ├── logistics-automation-demo.astro
│   │   │   └── retail-segmentation-demo.astro
│   │   ├── insights/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...slug].astro   # Dynamic blog posts
│   │   ├── about.astro
│   │   ├── faq.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── cookies.astro
│   │   ├── sitemap.xml.ts        # Generated sitemap
│   │   └── robots.txt.ts         # Generated robots.txt
│   │
│   ├── content/
│   │   ├── config.ts             # Content collection config
│   │   └── insights/             # MDX blog posts
│   │       ├── automation-small-business-uk.mdx
│   │       ├── data-dashboards-smes.mdx
│   │       ├── customer-segmentation-examples.mdx
│   │       ├── time-series-forecasting-business.mdx
│   │       └── anomaly-detection-operations.mdx
│   │
│   ├── styles/
│   │   └── global.css            # Tailwind imports + custom styles
│   │
│   └── lib/
│       ├── utils.ts              # Utility functions
│       └── schema.ts             # Structured data helpers
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── og-image.jpg          # Default OG image
│   │   └── ...
│   ├── fonts/                    # Self-hosted fonts if needed
│   └── favicon.ico
│
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Package.json

```json
{
  "name": "qsol-analytics-website",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint src/",
    "format": "prettier --write ."
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/mdx": "^2.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://qsol-analytics.co.uk',
  integrations: [
    mdx(),
    sitemap(),
    tailwind()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
```

---

## Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E40AF',
          'blue-light': '#3B82F6',
          'blue-pale': '#EFF6FF',
        },
        slate: {
          DEFAULT: '#334155',
          light: '#64748B',
        },
        success: '#059669',
        warning: '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.DEFAULT'),
            a: {
              color: theme('colors.brand.blue'),
              '&:hover': {
                color: theme('colors.brand.blue-light'),
              },
            },
            h1: { color: theme('colors.slate.DEFAULT') },
            h2: { color: theme('colors.slate.DEFAULT') },
            h3: { color: theme('colors.slate.DEFAULT') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## Key Components

### SEO Component

```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage = '/images/og-image.jpg',
  noindex = false
} = Astro.props;

const siteTitle = 'QSol Analytics';
const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />

{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={new URL(ogImage, Astro.site).href} />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(ogImage, Astro.site).href} />
```

### Base Layout

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';
import SEO from '../components/SEO.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const { title, description, canonical, ogImage } = Astro.props;
---

<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />

  <SEO
    title={title}
    description={description}
    canonical={canonical}
    ogImage={ogImage}
  />

  <!-- Plausible Analytics -->
  <script defer data-domain="qsol-analytics.co.uk" src="https://plausible.io/js/script.js"></script>

  <!-- Preload fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body class="antialiased text-slate bg-white">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

---

## Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const insightsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('QSol Analytics'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  insights: insightsCollection,
};
```

---

## Form Handling (Formspree)

```astro
---
// src/components/ContactForm.astro
---

<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
  class="space-y-6"
>
  <div>
    <label for="name" class="block text-sm font-medium text-slate">Your name *</label>
    <input
      type="text"
      name="name"
      id="name"
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium text-slate">Email address *</label>
    <input
      type="email"
      name="email"
      id="email"
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
    />
  </div>

  <div>
    <label for="company" class="block text-sm font-medium text-slate">Company name</label>
    <input
      type="text"
      name="company"
      id="company"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
    />
  </div>

  <div>
    <label for="message" class="block text-sm font-medium text-slate">Your message *</label>
    <textarea
      name="message"
      id="message"
      rows="4"
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
    ></textarea>
  </div>

  <div>
    <label for="source" class="block text-sm font-medium text-slate">How did you find us?</label>
    <select
      name="source"
      id="source"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
    >
      <option value="">Please select</option>
      <option value="google">Google search</option>
      <option value="linkedin">LinkedIn</option>
      <option value="referral">Referral</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="flex items-start">
    <input
      type="checkbox"
      name="newsletter"
      id="newsletter"
      class="mt-1 h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
    />
    <label for="newsletter" class="ml-2 text-sm text-slate-light">
      I'd like occasional updates about data science for SMEs
    </label>
  </div>

  <button
    type="submit"
    class="w-full bg-brand-blue text-white py-3 px-6 rounded-md font-medium hover:bg-brand-blue-light transition-colors"
  >
    Send My Enquiry
  </button>

  <p class="text-xs text-slate-light">
    Your information is handled per our <a href="/privacy/" class="underline">Privacy Policy</a>.
  </p>
</form>
```

---

## Structured Data Helpers

```typescript
// src/lib/schema.ts
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QSol Analytics",
    "url": "https://qsol-analytics.co.uk",
    "logo": "https://qsol-analytics.co.uk/images/logo.png",
    "description": "Practical data science and automation consultancy for UK SMEs",
    "areaServed": { "@type": "Country", "name": "United Kingdom" },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@qsol-analytics.co.uk",
      "contactType": "sales"
    }
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "provider": { "@type": "Organization", "name": "QSol Analytics" },
    "description": description,
    "areaServed": { "@type": "Country", "name": "United Kingdom" }
  };
}

export function articleSchema(title: string, description: string, date: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": date,
    "author": { "@type": "Organization", "name": "QSol Analytics" },
    "publisher": { "@type": "Organization", "name": "QSol Analytics" }
  };
}
```

---

## Development Commands

```bash
# Initial setup
npm create astro@latest qsol-analytics -- --template minimal
cd qsol-analytics
npm install @astrojs/mdx @astrojs/sitemap @astrojs/tailwind tailwindcss @tailwindcss/typography

# Development
npm run dev           # Start dev server at localhost:4321
npm run build         # Build for production
npm run preview       # Preview production build

# Deployment
vercel                # Deploy to Vercel (first time: links project)
vercel --prod         # Deploy to production
```

---

## Deployment Configuration

### Vercel Project Settings

```json
// vercel.json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## Domain & DNS Setup

### Domain Registration
- Register: qsol-analytics.co.uk
- Provider recommendation: Namecheap or Cloudflare Registrar

### DNS Configuration (Vercel)
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### SSL
- Automatic via Vercel (Let's Encrypt)
- Force HTTPS redirect enabled

---

## Email Setup

### Google Workspace (Recommended)
1. Sign up at workspace.google.com
2. Verify domain ownership
3. Add MX records:
```
Priority  Host  Value
1         @     ASPMX.L.GOOGLE.COM
5         @     ALT1.ASPMX.L.GOOGLE.COM
5         @     ALT2.ASPMX.L.GOOGLE.COM
10        @     ALT3.ASPMX.L.GOOGLE.COM
10        @     ALT4.ASPMX.L.GOOGLE.COM
```
4. Create: hello@qsol-analytics.co.uk

### Alternative: Zoho Mail (Free tier available)
Similar process, different MX records.

---

## Pre-Launch Technical Checklist

- [ ] Repository created and code pushed
- [ ] Vercel project connected
- [ ] Domain purchased and DNS configured
- [ ] SSL certificate active (automatic)
- [ ] All pages rendering correctly
- [ ] Mobile responsive testing passed
- [ ] Forms submitting correctly (test submission)
- [ ] Analytics script installed and tracking
- [ ] sitemap.xml generating correctly
- [ ] robots.txt configured
- [ ] Favicon and OG images set
- [ ] 404 page created
- [ ] Page speed tested (Lighthouse)
- [ ] Accessibility tested (axe DevTools)

---

*Document Version: 1.0*
*Created: Sprint 3 — Build & Launch*
