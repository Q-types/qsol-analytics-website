# QSol Analytics — Pre-Launch Checklist

**Date:** February 2024
**Status:** Ready to execute

This checklist covers all technical, operational, and compliance requirements for launch.

---

## 1. Placeholder/Ambiguity Final Sweep

### Status: COMPLETE

| Check | Result |
|-------|--------|
| `[brackets]` placeholders | ✅ Fixed (privacy policy, cookie policy, contact page) |
| `TODO/TBD/TBC` | ✅ None found |
| Percentage claims without "typical" | ✅ Fixed (homepage 85% claim removed) |
| Founder name present | ✅ "David J. McCann" throughout |
| Demo content labelled | ✅ All case studies have "Demo Project" banner |
| Illustrative results labelled | ✅ All have "typical" or "illustrative" qualifier |

---

## 2. Process Proof Trust Anchors

### Added (without testimonials needed):

| Trust Element | Location | Status |
|---------------|----------|--------|
| Data handling promise | FAQ Security section | ✅ Added |
| Version-controlled deliverables | FAQ "What do we receive" question | ✅ Added |
| Handover pack details | FAQ new question | ✅ Added |
| Assessment option (risk reversal) | FAQ new question | ✅ Added |
| Audit support details | FAQ existing | ✅ Already present |
| NDA availability | FAQ Security section | ✅ Mentioned |

### Procurement-friendly statements now present:

1. **Data handling:** Least-privilege access, encrypted storage, deletion policy, no offshore teams
2. **Deliverables:** Version-controlled code, documented assumptions, full handover pack
3. **Risk reversal:** £500-1,500 Assessment with explicit outputs; fee applies to project if you proceed

---

## 3. Analytics & Conversion Tracking

### Minimum Viable Setup

**Recommended tool:** Plausible Analytics (privacy-friendly, no cookies, GDPR-compliant)
- Already referenced in privacy policy

**Alternative:** Google Analytics 4 (requires cookie consent banner)

### Events to Track

| Event | Trigger | Priority |
|-------|---------|----------|
| `contact_form_submit` | Form submission on /contact/ | Critical |
| `calendly_click` | Click on "Book a Discovery Call" CTA | Critical |
| `email_click` | Click on hello@qsol-analytics.co.uk | High |
| `phone_click` | Click on phone number (if displayed) | Medium |
| `cta_click` | Any primary CTA button | Medium |

### Implementation (Plausible)

```html
<!-- In <head> -->
<script defer data-domain="qsol-analytics.co.uk" src="https://plausible.io/js/script.js"></script>

<!-- Track form submit -->
<form onsubmit="plausible('contact_form_submit')">

<!-- Track CTA clicks -->
<a href="https://calendly.com/..." onclick="plausible('calendly_click')">Book a Discovery Call</a>
```

### Implementation (GA4)

```html
<!-- In <head> after cookie consent -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>

<!-- Track events -->
gtag('event', 'contact_form_submit', { 'event_category': 'conversion' });
gtag('event', 'calendly_click', { 'event_category': 'conversion' });
```

### Weekly Dashboard View

Track weekly:
- Total sessions
- Source/medium breakdown
- Conversion events (form submits + Calendly clicks)
- Conversion rate = (conversions / sessions) × 100

**Target baseline:** Establish first month, then track trends.

---

## 4. Technical SEO Checklist

### robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://qsol-analytics.co.uk/sitemap.xml
```

**Check:** Ensure staging domain is NOT in robots.txt

### sitemap.xml

Must include all pages:
- /
- /services/
- /services/automation-workflow/
- /services/analytics-dashboards/
- /services/customer-segmentation/
- /services/forecasting-anomaly-detection/
- /about/
- /faq/
- /contact/
- /case-studies/logistics-automation-demo/
- /case-studies/retail-segmentation-demo/
- /case-studies/manufacturing-dashboard-demo/
- /case-studies/distribution-forecasting-demo/
- /insights/automation-small-business-uk/
- /insights/data-dashboards-smes/
- /insights/customer-segmentation-examples/
- /insights/time-series-forecasting-business/
- /insights/anomaly-detection-operations/
- /privacy/
- /cookies/

### Canonical URLs

Every page must have:
```html
<link rel="canonical" href="https://qsol-analytics.co.uk/[page-path]/" />
```

**Critical:** No staging domain, no trailing slash inconsistencies, no www/non-www mix.

### Open Graph / Twitter Cards

Every page needs:
```html
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Meta Description]" />
<meta property="og:image" content="https://qsol-analytics.co.uk/images/og-image.png" />
<meta property="og:url" content="https://qsol-analytics.co.uk/[path]/" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Page Title]" />
<meta name="twitter:description" content="[Meta Description]" />
<meta name="twitter:image" content="https://qsol-analytics.co.uk/images/og-image.png" />
```

### Schema.org Validation

| Page Type | Schema | Validator |
|-----------|--------|-----------|
| Homepage | Organization | schema.org/Organization |
| Services | Service | schema.org/Service |
| FAQ | FAQPage | schema.org/FAQPage |
| Blog/Case Studies | Article | schema.org/Article |

**Test:** https://validator.schema.org/

### Page Title Verification

| Page | Title | Length Check |
|------|-------|--------------|
| Home | Data Science & Automation for UK SMEs \| QSol Analytics | 57 chars ✅ |
| About | About QSol Analytics \| Data Science Consultant UK | 51 chars ✅ |
| FAQ | FAQ \| Data Science Consulting Questions \| QSol Analytics | 58 chars ✅ |

All titles should be < 60 characters to avoid truncation.

### Duplicate Content Check

Ensure no near-duplicate pages exist. Each service page should be distinct.

---

## 5. Performance & Accessibility

### Lighthouse Targets

Run on: Home, Services Overview, Forecasting, About, Contact

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | > 70 | Image optimization, lazy loading |
| Accessibility | > 90 | Headings, labels, contrast |
| Best Practices | > 90 | HTTPS, no console errors |
| SEO | > 90 | Meta tags, crawlability |

### Accessibility Checklist

| Check | Requirement |
|-------|-------------|
| Heading order | H1 → H2 → H3 (no skips) ✅ All pages follow |
| Link text | Descriptive, not "click here" ✅ |
| Form labels | All inputs have `<label>` |
| Color contrast | 4.5:1 minimum for text |
| Alt text | All images have meaningful alt |
| Skip link | "Skip to main content" link |
| Focus states | Visible focus indicators |

### Image Optimization

- Use WebP format where supported
- Lazy load below-fold images
- Specify width/height to prevent layout shift
- Compress images (< 200KB per image)

---

## 6. Contact & Friction Reduction

### Email Setup

| Requirement | Status |
|-------------|--------|
| Domain email working | ☐ Configure david@qsol-analytics.co.uk |
| hello@ alias configured | ☐ Points to primary inbox |
| SPF/DKIM/DMARC records | ☐ Set up for deliverability |
| Test email send/receive | ☐ Confirm from external account |

### Contact Form

| Requirement | Status |
|-------------|--------|
| Form submits to correct inbox | ☐ Test thoroughly |
| Auto-reply confirmation | ☐ Set up (see copy below) |
| Spam protection | ☐ Honeypot or reCAPTCHA |
| Form validation works | ☐ Required fields enforced |
| Success message displays | ☐ After submission |

**Auto-reply copy:**

```
Subject: Thanks for your message — QSol Analytics

Hi [Name],

Thanks for getting in touch. I've received your message and will reply within one business day.

If your enquiry is urgent, you can also book a call directly: [Calendly link]

Speak soon,
David

--
David J. McCann
QSol Analytics
hello@qsol-analytics.co.uk
```

### Booking System

| Requirement | Status |
|-------------|--------|
| Calendly/Cal.com account created | ☐ |
| 30-minute "Discovery Call" event | ☐ |
| Availability configured | ☐ |
| Confirmation email customized | ☐ |
| Reminder emails enabled | ☐ |
| Video link (Zoom/Google Meet) | ☐ |

### Friction Reducers

- [ ] Add "Prefer email?" text near contact form
- [ ] Show response time expectation ("within 1 business day")
- [ ] No CAPTCHA if possible (use honeypot instead)

---

## 7. Legal & Compliance

### Privacy Policy

| Check | Status |
|-------|--------|
| Last updated date | ✅ February 2024 |
| Data controller identified | ✅ David J. McCann |
| Contact email present | ✅ hello@qsol-analytics.co.uk |
| ICO complaint info | ✅ Present |
| Cookie reference accurate | ☐ Match actual behavior |

### Cookie Policy

| Check | Status |
|-------|--------|
| Last updated date | ✅ February 2024 |
| Cookie list matches reality | ☐ Verify after implementation |
| Plausible = no cookies statement | ✅ If using Plausible |
| GA4 = requires consent | ☐ If using GA4 |

### Cookie Banner (if needed)

If using GA4 or any cookie-setting service:

```
We use cookies to understand how you use our site.
[Accept] [Decline] [Learn more]
```

Requirements:
- Must work before cookies are set
- "Decline" must actually prevent cookies
- Link to cookie policy

### Third-Party Processors

If asked in procurement, common categories:
- **Hosting:** Vercel/Netlify/similar
- **Analytics:** Plausible or Google Analytics
- **Email:** Gmail/Microsoft 365/similar
- **Scheduling:** Calendly/Cal.com
- **Forms:** Hosting provider or dedicated service

Don't list every vendor name unless required—list categories.

---

## 8. Risk-Reduction Offer

### Assessment Option (now in FAQ)

**Positioning:** Low-risk entry point for Finance Directors

| Element | Detail |
|---------|--------|
| Price | £500-1,500 |
| Duration | 1-3 days |
| Deliverable | Written assessment with opportunities, ROI estimates, recommendations |
| Risk reversal | Fee applies to project if you proceed |

**Where it appears:**
- FAQ Pricing section ✅
- Optionally: Services Overview page
- Optionally: Contact page as alternative to full project

---

## 9. Launch Ops — Google Discoverability

### Google Search Console

| Task | Status |
|------|--------|
| Verify domain ownership | ☐ |
| Submit sitemap | ☐ |
| Request indexing for homepage | ☐ |
| Monitor for crawl errors | ☐ |

### Google Business Profile

| Field | Value |
|-------|-------|
| Business name | QSol Analytics |
| Category | Data Analytics Consultant |
| Service area | United Kingdom |
| Website | https://qsol-analytics.co.uk |
| Email | hello@qsol-analytics.co.uk |
| Description | Practical data science for UK SMEs. Automation, dashboards, segmentation, and forecasting. |
| Hours | By appointment |

**Note:** Even for service-area businesses, a GBP helps with local SEO signals.

### NAP Consistency

Ensure Name, Address, Phone/email are consistent across:
- Website footer
- Contact page
- Google Business Profile
- LinkedIn company page

---

## Execution Order

### Before Launch (Critical Path)

1. ☐ Configure domain email (david@, hello@)
2. ☐ Set up contact form with auto-reply
3. ☐ Configure Calendly/Cal.com booking
4. ☐ Install analytics (Plausible or GA4)
5. ☐ Set up conversion events
6. ☐ Verify robots.txt allows indexing
7. ☐ Generate and upload sitemap.xml
8. ☐ Add canonical URLs to all pages
9. ☐ Add Open Graph tags
10. ☐ Run Lighthouse on key pages
11. ☐ Verify cookie policy matches reality
12. ☐ Test contact form end-to-end

### On Launch Day

1. ☐ Verify site is live on production domain
2. ☐ Submit sitemap to Google Search Console
3. ☐ Request indexing for key pages
4. ☐ Create/claim Google Business Profile
5. ☐ Post launch announcement on LinkedIn

### First Week Post-Launch

1. ☐ Monitor Search Console for crawl errors
2. ☐ Check analytics are tracking correctly
3. ☐ Verify conversion events firing
4. ☐ Test contact form from external email
5. ☐ Book test call through Calendly
6. ☐ Fix any Lighthouse issues identified

---

## Quick Reference Card

| System | Login URL | Notes |
|--------|-----------|-------|
| Domain registrar | [your registrar] | DNS, email records |
| Hosting | [your host] | Deploy, SSL |
| Email | [your provider] | david@, hello@ |
| Analytics | analytics.google.com or plausible.io | Traffic, conversions |
| Search Console | search.google.com/search-console | SEO monitoring |
| Calendly | calendly.com | Booking system |
| Google Business | business.google.com | Local SEO |

---

*This checklist should be executed in order. Mark items complete as you go.*
