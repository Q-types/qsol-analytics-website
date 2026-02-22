# QSol Analytics — Launch Day Operations Checklist

**Purpose:** Reality checks that content can't guarantee. Do these before/at launch.

---

## The One Thing (If You Do Nothing Else)

1. Run automated site crawl (Screaming Frog free tier, or `npx broken-link-checker`)
2. Submit contact form → confirm it arrives in inbox (not spam) + auto-reply sends

---

## Full Checklist

### 1. Lead Path Test (Do Twice: Mobile + Desktop)

```
☐ Visit site on mobile
☐ Visit site on desktop
☐ Click primary CTA → lands on booking/form page
☐ Submit contact form
☐ Confirm: email arrives in inbox (not spam)
☐ Confirm: auto-reply sends to submitter
☐ Confirm: any CRM/Notion/Zapier triggers fire
☐ Click Calendly link → book test slot
☐ Confirm: Calendly confirmation email arrives
☐ Confirm: calendar invite received
```

If any step fails, conversion rate = 0.

---

### 2. Email Deliverability (SPF/DKIM/DMARC)

Check DNS records for qsol-analytics.co.uk:

```
☐ SPF record exists (TXT record with v=spf1...)
☐ DKIM record exists (depends on email provider)
☐ DMARC record exists (start with p=none if unsure)
```

Test: Send from david@qsol-analytics.co.uk to a Gmail/Outlook account. Check headers for PASS.

Tool: https://mxtoolbox.com/SuperTool.aspx

---

### 3. Not Launching on "noindex"

```
☐ View source on homepage: NO <meta name="robots" content="noindex">
☐ Check robots.txt: Disallow: / is NOT present
☐ Canonical URLs point to https://qsol-analytics.co.uk (not staging)
☐ No staging subdomain in any URLs
```

Common gotcha: Vercel/Netlify preview builds sometimes leak noindex.

---

### 4. Google Search Console (Day 0)

```
☐ Verify domain ownership
☐ Submit sitemap.xml
☐ Request indexing: homepage
☐ Request indexing: /services/
☐ Check Coverage/Pages for exclusions
```

URL: https://search.google.com/search-console

---

### 5. 404 + Redirect Hygiene

```
☐ Run link checker (broken internal links)
☐ Custom 404 page exists and looks professional
☐ If any URLs changed during sprint, redirects are set:
   - Old URL → New URL (301 redirect)
```

Tool: `npx broken-link-checker https://qsol-analytics.co.uk --recursive`

---

### 6. Backups + Versioning

```
☐ Git repo is private (if intended)
☐ Deploy pipeline is reproducible (can redeploy any commit)
☐ Rollback tested: can revert to previous version in <5 minutes
☐ Content files backed up (this repo)
```

---

### 7. Cookie Banner Truth Test

If using analytics that sets cookies (GA4):

```
☐ Consent banner appears before cookies are set
☐ "Decline" actually prevents cookies (test in incognito)
☐ Cookie policy matches reality
```

If using Plausible (no cookies):

```
☐ No consent banner needed
☐ Privacy policy states "no cookies" accurately
```

---

### 8. Response SLA Alignment

Content promises: "within one business day"

```
☐ Inbox notifications enabled on phone
☐ If traveling/unavailable: autoresponder set with adjusted timeline
☐ Calendly availability reflects reality
```

---

## Post-Launch Feedback Control

Weekly tracking (start week 1):

```
N = sessions (from analytics)
c = conversions (form submits + Calendly clicks)
p̂ = c / N (conversion rate)
```

Don't change copy until you have enough N to see signal over noise.
Rule of thumb: ~100 sessions minimum before drawing conclusions.

---

## Launch Day Sequence

```
1. ☐ Final link crawl
2. ☐ Lead path test (mobile + desktop)
3. ☐ Deploy to production
4. ☐ Verify no noindex
5. ☐ Submit sitemap to GSC
6. ☐ Request indexing for key pages
7. ☐ Create/verify Google Business Profile
8. ☐ Post launch announcement (LinkedIn)
9. ☐ Monitor inbox for first enquiry
```

---

**Status:** Content complete. These items require hands-on implementation.
