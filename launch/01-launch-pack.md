# QSol Analytics Website Launch Pack

## Pre-Launch Checklist

### Content Verification
- [ ] All page copy proofread and approved
- [ ] All images have alt text
- [ ] Contact information correct
- [ ] All internal links working
- [ ] All external links working and opening in new tabs
- [ ] Legal pages (Privacy, Cookies) complete and accurate
- [ ] Blog posts formatted correctly with meta data
- [ ] Case studies clearly marked as demos

### Technical Verification
- [ ] Responsive design tested on:
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] iPad
  - [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Forms tested:
  - [ ] Contact form submits correctly
  - [ ] Confirmation message displays
  - [ ] Email notification received
- [ ] 404 page working
- [ ] Print stylesheet (if needed)

### SEO Verification
- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions
- [ ] H1 tags present and unique per page
- [ ] Schema.org structured data in place:
  - [ ] Organization (site-wide)
  - [ ] Service (service pages)
  - [ ] Article (blog posts)
  - [ ] FAQPage (FAQ page)
- [ ] Canonical tags set
- [ ] sitemap.xml generated and accessible
- [ ] robots.txt configured correctly
- [ ] OG images set for social sharing

### Performance Verification
- [ ] Lighthouse Performance score: 95+
- [ ] Lighthouse SEO score: 100
- [ ] Lighthouse Accessibility score: 95+
- [ ] Images optimized (WebP where supported)
- [ ] Fonts preloaded
- [ ] No render-blocking resources

### Analytics & Tracking
- [ ] Plausible (or chosen analytics) installed
- [ ] Tracking verified with real page views
- [ ] Custom events configured:
  - [ ] Form submissions
  - [ ] CTA clicks
  - [ ] Outbound links (calendar booking)
- [ ] Goals/conversions set up

### Security
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] No exposed API keys or secrets
- [ ] Form spam protection (Formspree includes this)

---

## Launch Day Procedure

### Pre-Launch (Day Before)
1. Final content review
2. Backup any existing site (if applicable)
3. Prepare social media announcements
4. Notify key stakeholders of launch time

### Launch Morning

**Step 1: DNS Configuration (if not done)**
- Point domain to Vercel
- Wait for propagation (usually 5-30 minutes)
- Verify site loads at final domain

**Step 2: SSL Verification**
- Confirm HTTPS working
- Test redirect from HTTP to HTTPS

**Step 3: Final Testing**
- Load homepage on final domain
- Test contact form (submit test message)
- Click through all main navigation paths
- Check on mobile device

**Step 4: Search Engine Submission**
- Google Search Console: submit sitemap
- Bing Webmaster Tools: submit sitemap
- Request indexing for homepage

**Step 5: Tracking Verification**
- Check analytics showing live data
- Verify form submission tracked

### Post-Launch (Same Day)

**Step 6: Announcements**
- LinkedIn post
- Email to close network
- Update any existing profiles with new URL

**Step 7: Monitoring**
- Watch analytics for any issues
- Check form submissions arriving
- Monitor for 404 errors (Search Console)

---

## Analytics Setup (Plausible)

### Why Plausible?
- Privacy-friendly (no cookies = no banner needed)
- GDPR compliant by design
- Simple, essential metrics only
- Affordable ($9/month for most sites)

### Setup Steps

1. **Sign up** at plausible.io
2. **Add site:** qsol-analytics.co.uk
3. **Install script:**
```html
<script defer data-domain="qsol-analytics.co.uk" src="https://plausible.io/js/script.js"></script>
```
4. **Verify tracking:** Visit site, check Plausible dashboard

### Custom Events to Track

**Form Submissions:**
```html
<form ... onsubmit="plausible('Contact Form Submit')">
```

**CTA Clicks:**
```html
<a href="/contact/" onclick="plausible('CTA Click', {props: {location: 'homepage-hero'}})">
  Book a Discovery Call
</a>
```

**External Links (Calendly):**
```html
<a href="https://calendly.com/qsol" onclick="plausible('Outbound Link', {props: {url: 'calendly'}})" target="_blank">
  Book a Discovery Call
</a>
```

### Key Metrics to Monitor

| Metric | Why It Matters |
|--------|----------------|
| Unique visitors | Overall traffic |
| Top pages | What content resonates |
| Top sources | Where traffic comes from |
| Entry pages | Where people land |
| Bounce rate | Engagement quality |
| Form submissions | Primary conversion |
| CTA clicks | Engagement funnel |

---

## Google Search Console Setup

### Verification
1. Go to search.google.com/search-console
2. Add property: qsol-analytics.co.uk
3. Verify via DNS TXT record or HTML file

### Initial Configuration
1. Submit sitemap: /sitemap.xml
2. Check for indexing issues
3. Review mobile usability report

### Ongoing Monitoring
- Check weekly for first month
- Monitor: Coverage, Performance, Mobile Usability
- Address any errors immediately

---

## Google Business Profile (Optional)

If you have a physical location or serve a specific area:

### Setup
1. Go to business.google.com
2. Create business profile
3. Verify (postcard, phone, or email)

### Optimization
- Category: "Business Consultant" or "Data Analytics Service"
- Description: Use positioning statement
- Photos: Professional headshot, office (if applicable)
- Service area: United Kingdom
- Website: qsol-analytics.co.uk
- Posts: Monthly updates

---

## Post-Launch Maintenance

### Weekly (First Month)
- Check Google Search Console for errors
- Review analytics: traffic, top pages, conversions
- Test contact form works

### Monthly (Ongoing)
- Publish 1-2 blog posts
- Review and update content if needed
- Check for broken links
- Review form submission quality
- Monitor page speed (any degradation?)

### Quarterly
- Content audit: update old posts
- SEO review: keyword rankings, new opportunities
- Technical audit: dependencies, security patches
- Analytics review: trends, conversion rates

---

## Emergency Procedures

### Site Down
1. Check Vercel status: vercel.com/status
2. Check DNS: is domain pointing correctly?
3. Check deployment: any failed builds?
4. Contact Vercel support if needed

### Form Not Working
1. Check Formspree dashboard
2. Test with different email
3. Check for JavaScript errors
4. Review spam filters

### Analytics Not Tracking
1. Verify script is present in page source
2. Check for adblockers
3. Test in incognito mode
4. Review Plausible dashboard

---

## Content Publishing Workflow

### Adding a Blog Post

1. Create new file: `src/content/insights/my-new-post.mdx`

2. Add frontmatter:
```yaml
---
title: "My New Article Title"
description: "Meta description for SEO"
publishDate: 2024-02-15
author: "QSol Analytics"
tags: ["automation", "sme"]
---
```

3. Write content in MDX

4. Test locally: `npm run dev`

5. Commit and push:
```bash
git add .
git commit -m "Add blog post: My New Article Title"
git push
```

6. Vercel auto-deploys (watch for success)

7. Verify live on site

8. Submit URL to Google Search Console for indexing

---

## Key Contacts & Accounts

| Service | Account Email | Purpose |
|---------|--------------|---------|
| Vercel | [your-email] | Hosting |
| Formspree | [your-email] | Form handling |
| Plausible | [your-email] | Analytics |
| Namecheap/Cloudflare | [your-email] | Domain |
| Google Search Console | [your-email] | SEO |
| Google Workspace | admin@qsol-analytics.co.uk | Email |

---

## Success Metrics (First 90 Days)

### Traffic Targets
- Month 1: 200+ unique visitors
- Month 2: 400+ unique visitors
- Month 3: 600+ unique visitors

### Conversion Targets
- Contact form submissions: 3-5/month
- Discovery call bookings: 2-3/month

### SEO Targets
- All pages indexed
- Top 50 rankings for primary keywords
- 10+ pages receiving organic traffic

### Quality Indicators
- Bounce rate: <60%
- Avg session duration: >1 minute
- Pages per session: >1.5

---

## Launch Announcement Templates

### LinkedIn Post
```
Excited to launch the new QSol Analytics website.

We help UK SMEs turn data into decisions and manual processes into automated workflows.

If your team is drowning in spreadsheets, spending hours on reports, or making decisions on gut feel when data should help — we should talk.

Services:
→ Automation & workflow
→ Analytics & dashboards
→ Customer segmentation
→ Forecasting & anomaly detection

Check it out: qsol-analytics.co.uk

#DataScience #Automation #SME #UK
```

### Email to Network
```
Subject: New venture: QSol Analytics

Hi [Name],

I wanted to let you know I've launched QSol Analytics — a data science consultancy helping UK SMEs with automation, dashboards, and forecasting.

If you know any business owners struggling with:
- Manual reporting that eats up hours every week
- Data in spreadsheets that nobody trusts
- Decisions made on gut feel when data should help

I'd appreciate an introduction.

Website: qsol-analytics.co.uk

Thanks,
[Your name]
```

---

*Document Version: 1.0*
*Created: Sprint 3 — Build & Launch*
