# QSol Analytics Website Specification

## Project Overview

**Business:** QSol Analytics
**Tagline:** "Data, Automation & Forecasting for SMEs"
**Focus:** Practical data science and automation for UK SMEs (10-500 employees)
**Primary Goal:** Lead generation via contact form and discovery call bookings

---

## A. Brand Positioning System

### One-Sentence Positioning

**Three Variants Evaluated:**

| Variant | Positioning Statement | Score | Rationale |
|---------|----------------------|-------|-----------|
| A | "We help UK SMEs turn messy data into clear decisions and manual processes into automated workflows." | 8.5/10 | Clear, outcome-focused, but slightly generic |
| B | "Physics-trained rigour applied to your business data—delivering automation, dashboards, and forecasts that actually work." | 7.5/10 | Unique angle but may alienate non-technical buyers |
| **C (Selected)** | "We help operations-heavy SMEs stop firefighting and start forecasting—with automation, dashboards, and data science that delivers measurable ROI in weeks, not months." | **9.2/10** | Specific pain point (firefighting), clear outcome (forecasting), credibility signal (measurable ROI), urgency (weeks not months) |

**Final Positioning Statement:**
> "We help operations-heavy SMEs stop firefighting and start forecasting—with automation, dashboards, and data science that delivers measurable ROI in weeks, not months."

---

### Three Value Propositions

| # | Value Proposition | Supporting Proof |
|---|-------------------|------------------|
| 1 | **Rapid Time-to-Value** — From discovery call to working prototype in 2-4 weeks. No 6-month consulting projects. | Agile delivery methodology; physics-trained founder with production engineering mindset |
| 2 | **Signal Over Noise** — We cut through complexity to surface the metrics that matter. No dashboard bloat, no vanity KPIs. | Background in theoretical physics (pattern recognition); focus on decision-useful outputs |
| 3 | **Measurable Outcomes** — Every engagement includes success metrics agreed upfront. You see the ROI before the final invoice. | Outcome-based project scoping; benchmark → improve → measure approach |

---

### Differentiation Matrix

| Dimension | Generic IT Consultants | Off-the-shelf SaaS | Large Consultancies | **QSol Analytics** |
|-----------|----------------------|-------------------|--------------------|--------------------|
| **Speed to value** | Weeks-months | Hours-days (but limited) | Months-quarters | **2-4 weeks to prototype** |
| **Customisation** | High (but expensive) | Low (one-size-fits-all) | High (very expensive) | **High (affordable)** |
| **Data science depth** | Basic reporting | Pre-built analytics only | Deep but overly complex | **Right-sized ML/stats** |
| **Ongoing support** | Retainer-heavy | Self-service only | Expensive SLAs | **Flexible: handover or support** |
| **UK SME focus** | Generalist | Generalist | Enterprise focus | **Purpose-built for 10-500 employee UK businesses** |
| **Explainability** | Variable | Black-box | Jargon-heavy reports | **Plain English, explainable models** |
| **Founder access** | Account manager layer | Support tickets | Junior consultants | **Direct founder involvement** |

---

## B. Ideal Customer Profiles (ICPs)

### ICP 1: The Overwhelmed Operations Director

**Profile:**
- **Title:** Operations Director / Head of Operations / COO
- **Company:** 50-200 employees, UK-based
- **Industries:** Logistics, facilities management, manufacturing, field services
- **Revenue:** £5M-£50M

**Pain Points:**
- Drowning in spreadsheets that nobody trusts
- Manual reporting consumes 1-2 days per week
- Can't see problems coming until they become fires
- Previous "digital transformation" projects failed or stalled
- Board wants data-driven decisions but data is a mess

**Buying Triggers:**
- New board/investor pressure for operational visibility
- Recent costly mistake due to missed anomaly
- Key person (the "spreadsheet wizard") leaving
- Growth outpacing manual processes

**Decision Criteria:**
- Speed: needs results this quarter, not next year
- Pragmatism: wants working solutions, not frameworks
- Trust: needs to understand what the system does
- Risk: wants to start small and prove value

**How We Win:**
- Lead with automation (immediate time savings)
- Show dashboard prototype in discovery call
- Offer 2-week paid pilot with clear deliverable
- Speak plainly about what's realistic

---

### ICP 2: The Data-Curious MD/CEO

**Profile:**
- **Title:** Managing Director / CEO / Founder
- **Company:** 20-100 employees, UK-based
- **Industries:** Professional services, ecommerce, education providers, property/lettings
- **Revenue:** £2M-£20M

**Pain Points:**
- Knows competitors are using data better
- Has data in multiple systems that don't talk to each other
- Makes gut decisions because analysis takes too long
- Hired a "data person" who couldn't deliver business impact
- Suspects there's gold in the customer data but can't mine it

**Buying Triggers:**
- Competitor launched personalised offering
- Revenue plateau despite marketing spend
- Customer churn increasing without clear cause
- New system implementation (CRM, ERP) creating opportunity

**Decision Criteria:**
- Business impact: wants revenue/margin outcomes, not technical outputs
- Communication: needs someone who can explain to non-technical board
- Flexibility: wants options, not lock-in
- Personal chemistry: buying the founder as much as the service

**How We Win:**
- Lead with segmentation/personalisation (revenue angle)
- Show concrete examples from similar sectors
- Offer "data audit" as low-commitment entry point
- Emphasise ongoing independence (we build capability, not dependency)

---

### ICP 3: The Finance Director Seeking Control

**Profile:**
- **Title:** Finance Director / CFO / Head of Finance
- **Company:** 30-150 employees, UK-based
- **Industries:** Manufacturing, distribution, retail, multi-site services
- **Revenue:** £5M-£30M

**Pain Points:**
- Cash flow forecasting is educated guesswork
- Month-end reporting takes a week of manual work
- Can't reconcile data across systems (ERP, CRM, spreadsheets)
- VAT/HMRC compliance involves manual data gathering
- Board pack preparation is painful every quarter

**Buying Triggers:**
- Year-end revealed data inconsistencies
- New ERP/accounting system implementation
- Bank/investor requesting better forecasting
- Key finance team member leaving

**Decision Criteria:**
- Accuracy: needs defensible numbers for external stakeholders
- Integration: must work with existing systems
- Compliance: aware of audit/regulatory requirements
- ROI: can quantify cost of current manual processes

**How We Win:**
- Lead with forecasting and automated reporting
- Emphasise data quality and reconciliation
- Show GDPR/security awareness
- Offer time-savings calculation in proposal

---

## C. Site Architecture

### Sitemap

```
qsol-analytics.co.uk/
├── / (Home)
├── /services/ (Services Overview)
│   ├── /services/automation-workflow/ (Automation & Workflow)
│   ├── /services/analytics-dashboards/ (Analytics & Dashboards)
│   ├── /services/customer-segmentation/ (Customer Segmentation)
│   └── /services/forecasting-anomaly-detection/ (Forecasting & Anomaly Detection)
├── /case-studies/ (Case Studies Index)
│   ├── /case-studies/logistics-automation-demo/ (Demo: Logistics Reporting Automation)
│   └── /case-studies/retail-segmentation-demo/ (Demo: Retail Customer Segmentation)
├── /about/ (About)
├── /insights/ (Blog/Insights Index)
│   ├── /insights/automation-small-business-uk/
│   ├── /insights/data-dashboards-smes/
│   ├── /insights/customer-segmentation-examples/
│   ├── /insights/time-series-forecasting-business/
│   └── /insights/anomaly-detection-operations/
├── /faq/ (FAQ)
├── /contact/ (Contact)
├── /privacy/ (Privacy Policy)
└── /cookies/ (Cookie Policy)
```

### Navigation Structure

**Primary Navigation (Desktop):**
```
[Logo: QSol Analytics]  Services ▼  Case Studies  Insights  About  [Contact →]
                          │
                          ├── Automation & Workflow
                          ├── Analytics & Dashboards
                          ├── Customer Segmentation
                          └── Forecasting & Anomaly Detection
```

**Mobile Navigation:**
- Hamburger menu with same structure
- "Contact" remains visible as CTA button

**Footer Navigation:**
```
Services          Resources         Company          Legal
─────────         ─────────         ─────────        ─────────
Automation        Case Studies      About            Privacy Policy
Dashboards        Insights          Contact          Cookie Policy
Segmentation      FAQ
Forecasting
```

### URL Structure (SEO-Optimised)

| Page | URL | Primary Keyword Target |
|------|-----|----------------------|
| Home | / | qsol analytics, data science consultancy uk |
| Services | /services/ | data science services sme |
| Automation | /services/automation-workflow/ | business automation uk |
| Dashboards | /services/analytics-dashboards/ | data dashboards sme |
| Segmentation | /services/customer-segmentation/ | customer segmentation services |
| Forecasting | /services/forecasting-anomaly-detection/ | forecasting consultancy uk |
| Case Studies | /case-studies/ | data science case studies |
| About | /about/ | data science consultant uk |
| Blog | /insights/ | data analytics insights |
| FAQ | /faq/ | data science consulting faq |
| Contact | /contact/ | contact data consultant |

---

## D. Messaging Hierarchy

### Homepage Messaging (3 Variants Evaluated)

**Variant A:**
- Headline: "Data Science for Growing Businesses"
- Subhead: "Automation, analytics, and forecasting for UK SMEs"
- Score: 6.5/10 — Too generic, doesn't differentiate

**Variant B:**
- Headline: "Your Data, Working Harder"
- Subhead: "Custom automation and analytics that deliver ROI in weeks"
- Score: 7.5/10 — Better, but "working harder" is cliché

**Variant C (Selected):**
- Headline: "Stop Firefighting. Start Forecasting."
- Subhead: "Practical data science and automation for UK SMEs—measurable results in weeks, not months."
- Score: **9.0/10** — Sharp contrast, specific outcome, credibility signal, UK-specific

### Final Messaging Hierarchy

**Primary Headline:**
> "Stop Firefighting. Start Forecasting."

**Primary Subhead:**
> "Practical data science and automation for UK SMEs—measurable results in weeks, not months."

**Proof Points (3):**
1. "From discovery call to working prototype in 2-4 weeks"
2. "Physics-trained rigour with plain-English delivery"
3. "Success metrics agreed before we start"

**Primary CTA:**
> "Book a Discovery Call" (calendar link)

**Secondary CTA:**
> "See How It Works" (scrolls to process section)

**Tertiary CTA:**
> "Download: SME Data Automation Checklist" (lead magnet)

---

## E. CTA Strategy

### CTA Hierarchy by Page Type

| Page Type | Primary CTA | Secondary CTA | Form Fields |
|-----------|-------------|---------------|-------------|
| Home | Book a Discovery Call | Download Checklist | - |
| Service Pages | Book a Discovery Call | Contact Us | - |
| Case Studies | Book a Discovery Call | View More Case Studies | - |
| Blog Posts | Download Related Resource | Book a Discovery Call | - |
| About | Book a Discovery Call | View Services | - |
| Contact | Submit Enquiry Form | Book a Discovery Call | Name, Email, Company, Message, How did you hear? |

### CTA Button Copy (Tested Variants)

| Generic | Better | Best (Selected) |
|---------|--------|-----------------|
| Submit | Send Message | Send My Enquiry |
| Learn More | See How It Works | Show Me How It Works |
| Contact Us | Get in Touch | Book a Discovery Call |
| Download | Get the Guide | Get My Free Checklist |

### Lead Magnet Concept

**Title:** "The SME Data Automation Checklist: 10 Manual Processes You Can Automate This Month"

**Contents:**
1. Identifying automation candidates (decision tree)
2. Time savings calculator
3. Quick wins vs. strategic projects matrix
4. Questions to ask vendors
5. Red flags in automation proposals

**Delivery:** PDF download, requires email only (no phone)

**Follow-up:** 3-email nurture sequence over 2 weeks

---

## F. Design System Guidelines

### Typography

**Font Stack:**
- Headings: Inter (600, 700 weights)
- Body: Inter (400, 500 weights)
- Code/Data: JetBrains Mono

**Type Scale:**
```
H1: 48px / 56px line-height (mobile: 36px / 44px)
H2: 36px / 44px (mobile: 28px / 36px)
H3: 24px / 32px (mobile: 20px / 28px)
H4: 20px / 28px (mobile: 18px / 26px)
Body: 16px / 26px
Small: 14px / 22px
```

### Colour Palette

**Primary:**
- Brand Blue: #1E40AF (trust, professionalism)
- Brand Blue Light: #3B82F6 (CTAs, links)

**Secondary:**
- Slate: #334155 (headings)
- Slate Light: #64748B (body text)

**Accents:**
- Success Green: #059669 (positive metrics)
- Alert Amber: #D97706 (warnings, highlights)

**Backgrounds:**
- White: #FFFFFF
- Off-white: #F8FAFC
- Light Blue: #EFF6FF (feature sections)

### Spacing System

```
4px base unit
8px (xs)
16px (sm)
24px (md)
32px (lg)
48px (xl)
64px (2xl)
96px (3xl)
```

### Component Guidelines

**Buttons:**
- Primary: Blue background (#1E40AF), white text, 12px 24px padding, 6px radius
- Secondary: White background, blue border, blue text
- Hover: Darken 10%, subtle shadow

**Cards:**
- White background
- 1px border (#E2E8F0)
- 8px radius
- 24px padding
- Subtle shadow on hover

**Forms:**
- 16px padding inputs
- Clear labels above fields
- Inline validation messages
- Progress indication for multi-step

### Imagery Guidelines

**Photography Style:**
- Authentic UK business settings (no generic stock)
- Real office environments, not sterile studios
- Diverse representation
- Warm, natural lighting

**Icons:**
- Heroicons (outline style)
- Consistent 24px base size
- Match brand blue colour

**Data Visualisations:**
- Clean, minimal chart styles
- Brand colour palette
- Clear labels, no chartjunk
- Accessible colour contrasts

---

## G. Technical Specifications

### Recommended Stack

**Framework:** Astro with static generation
- Why: Excellent performance, MDX support, simple deployment, great SEO
- Alternative: Next.js (if more interactivity needed)

**Styling:** Tailwind CSS
- Why: Rapid development, consistent spacing/colours, small bundle size

**Content:** MDX for blog posts
- Why: Markdown simplicity with component embedding for callouts, CTAs

**Forms:** Formspree or Netlify Forms
- Why: No backend needed, GDPR-compliant options

**Analytics:** Plausible or Fathom (privacy-friendly)
- Why: GDPR-compliant, no cookie banner needed, essential metrics

**Deployment:** Vercel or Netlify
- Why: Automatic deployments, edge performance, free tier sufficient

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | 95+ | Mobile, production |
| Lighthouse SEO | 100 | All pages |
| Lighthouse Accessibility | 95+ | All pages |
| First Contentful Paint | <1.5s | Mobile 4G |
| Largest Contentful Paint | <2.5s | Mobile 4G |
| Cumulative Layout Shift | <0.1 | All pages |

### Repository Structure

```
qsol-analytics/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CTASection.astro
│   │   ├── ServiceCard.astro
│   │   ├── TestimonialCard.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── insights/
│   │   ├── about.astro
│   │   ├── faq.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   └── cookies.astro
│   ├── content/
│   │   ├── insights/
│   │   └── case-studies/
│   └── styles/
│       └── global.css
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

---

## H. Legal & Compliance

### Privacy Policy Requirements

- Data controller: QSol Analytics (sole trader/Ltd details)
- Data collected: Contact form submissions, analytics
- Legal basis: Legitimate interest (enquiries), consent (marketing)
- Data retention: 2 years for enquiries, 26 months analytics
- Rights: Access, rectification, erasure, portability
- Contact: DPO email or privacy@qsol-analytics.co.uk

### Cookie Policy Requirements

- Essential cookies only (if using Plausible/Fathom: no cookies needed)
- If using Google Analytics: cookie consent banner required
- Clear categories: Essential, Analytics, Marketing
- Preference saving mechanism

### GDPR Compliance Checklist

- [ ] Privacy policy page
- [ ] Cookie policy page
- [ ] Contact form consent checkbox for marketing
- [ ] Data processing agreement with form provider
- [ ] Secure HTTPS throughout
- [ ] Email retention policy documented
- [ ] Right to erasure process defined

---

## I. Launch Checklist Preview

### Pre-Launch
- [ ] All pages complete with final copy
- [ ] Contact form tested (submissions received)
- [ ] Responsive design tested (iOS Safari, Android Chrome)
- [ ] Lighthouse scores meet targets
- [ ] Structured data validated (Google Rich Results Test)
- [ ] sitemap.xml generated and submitted
- [ ] robots.txt configured
- [ ] Analytics tracking verified
- [ ] Legal pages complete
- [ ] Favicon and OG images set

### Launch Day
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Redirects from any old URLs
- [ ] Google Search Console property verified
- [ ] Google Business Profile updated with website

### Post-Launch (Week 1)
- [ ] Submit sitemap to Google/Bing
- [ ] Monitor Search Console for errors
- [ ] Test all CTAs and form flows
- [ ] Share on LinkedIn with launch post
- [ ] Begin content publishing schedule

---

*Document Version: 1.0*
*Created: Sprint 1 — Strategy & Information Architecture*
*Next: Sprint 2 — Content & SEO*
