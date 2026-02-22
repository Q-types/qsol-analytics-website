# QSol Analytics — Launch Plan

**Status:** Ready to execute
**Pick up:** Tomorrow

---

## Owner Key

| Owner | Meaning |
|-------|---------|
| **YOU** | Requires your accounts, credentials, or decisions |
| **CLAUDE** | I can do this when we resume |
| **BOTH** | Collaborative task |

---

## Phase 1: Infrastructure (YOU)

These require your accounts and credentials. Do these first.

| # | Task | Owner | Time | Notes |
|---|------|-------|------|-------|
| 1.1 | Domain email setup | **YOU** | 30 min | Configure david@qsol-analytics.co.uk and hello@ alias |
| 1.2 | SPF/DKIM/DMARC records | **YOU** | 15 min | Add DNS records per email provider instructions |
| 1.3 | Calendly/Cal.com account | **YOU** | 20 min | Create "30-min Discovery Call" event, set availability |
| 1.4 | Analytics account | **YOU** | 15 min | Create Plausible or GA4 account |
| 1.5 | Hosting account ready | **YOU** | — | Confirm Vercel/Netlify/other is set up |

**Blocker:** Nothing else can be fully tested until email works.

---

## Phase 2: Site Build (YOU or YOUR DEV)

| # | Task | Owner | Time | Notes |
|---|------|-------|------|-------|
| 2.1 | Convert content to site | **YOU** | 2-4 hrs | Use content/*.md files as source |
| 2.2 | Add meta tags | **YOU** | 30 min | Title, description, OG tags per SEO-PACK.md |
| 2.3 | Add Schema.org markup | **YOU** | 30 min | JSON-LD blocks are in content files |
| 2.4 | Add analytics code | **YOU** | 15 min | Per PRE-LAUNCH-CHECKLIST.md |
| 2.5 | Add conversion tracking | **YOU** | 30 min | Form submit, Calendly click events |
| 2.6 | Contact form setup | **YOU** | 30 min | Connect to email, add auto-reply |
| 2.7 | Embed Calendly widget | **YOU** | 15 min | On contact page and CTAs |
| 2.8 | Create 404 page | **YOU** | 15 min | Friendly, branded |
| 2.9 | Generate sitemap.xml | **YOU** | 10 min | Most frameworks auto-generate |
| 2.10 | Create robots.txt | **YOU** | 5 min | Template in PRE-LAUNCH-CHECKLIST.md |

---

## Phase 3: Pre-Launch Testing (BOTH)

| # | Task | Owner | Time | Notes |
|---|------|-------|------|-------|
| 3.1 | Run broken link checker | **CLAUDE** | 5 min | I can write the command when site is live |
| 3.2 | Verify no noindex tags | **CLAUDE** | 5 min | I can check when you share staging URL |
| 3.3 | Check canonical URLs | **CLAUDE** | 5 min | Verify production domain |
| 3.4 | Lead path test (desktop) | **YOU** | 10 min | Submit form, verify inbox, auto-reply |
| 3.5 | Lead path test (mobile) | **YOU** | 10 min | Same test on phone |
| 3.6 | Calendly booking test | **YOU** | 5 min | Book a test slot, verify confirmation |
| 3.7 | Send test email | **YOU** | 5 min | From david@ to external Gmail, check headers |
| 3.8 | Lighthouse audit | **BOTH** | 15 min | You run, I can review results |
| 3.9 | Cookie behavior check | **YOU** | 5 min | Verify policy matches reality |

---

## Phase 4: Launch Day (YOU)

| # | Task | Owner | Time | Notes |
|---|------|-------|------|-------|
| 4.1 | Deploy to production | **YOU** | 5 min | Final deploy |
| 4.2 | Verify site is live | **YOU** | 2 min | Check production URL |
| 4.3 | Final noindex check | **YOU** | 2 min | View source, confirm no noindex |
| 4.4 | Google Search Console | **YOU** | 15 min | Verify domain, submit sitemap |
| 4.5 | Request indexing | **YOU** | 5 min | Homepage + /services/ |
| 4.6 | Google Business Profile | **YOU** | 20 min | Create/claim, add details |
| 4.7 | LinkedIn announcement | **YOU** | 15 min | Optional but recommended |

---

## Phase 5: Post-Launch Week 1 (BOTH)

| # | Task | Owner | Time | Notes |
|---|------|-------|------|-------|
| 5.1 | Monitor GSC for errors | **YOU** | Daily | Check Coverage/Pages |
| 5.2 | Verify analytics working | **YOU** | Day 1 | Confirm sessions tracking |
| 5.3 | Check conversion events | **YOU** | Day 2-3 | Confirm form/Calendly events fire |
| 5.4 | First enquiry response | **YOU** | Ongoing | Meet the 1-business-day SLA |
| 5.5 | Week 1 metrics review | **BOTH** | Day 7 | N sessions, c conversions, p̂ = c/N |

---

## What I (Claude) Can Do Tomorrow

When we resume, I can:

1. **Review staging URL** — Check for noindex, broken links, canonical issues
2. **Write link checker commands** — For your specific hosting setup
3. **Review Lighthouse results** — Suggest fixes for any issues
4. **Help with any content tweaks** — If you find issues during testing
5. **Create LinkedIn announcement draft** — If you want one
6. **Answer questions** — About any checklist items

---

## What You Need to Do Before We Resume

**Minimum to unblock testing:**
1. Email working (david@qsol-analytics.co.uk)
2. Site deployed to staging URL
3. Contact form connected

**Nice to have:**
- Analytics installed
- Calendly configured

---

## Quick Reference: Key Documents

| Document | Purpose |
|----------|---------|
| `content/*.md` | All page content with meta tags and schema |
| `SEO-PACK.md` | Keywords, internal linking plan |
| `PRE-LAUNCH-CHECKLIST.md` | Technical implementation details |
| `LAUNCH-DAY-OPS.md` | Reality checks and testing steps |
| `CANONICAL-DECISIONS.md` | Brand, pricing, methodology reference |

---

## Timeline Estimate

| Phase | Duration | Dependency |
|-------|----------|------------|
| Phase 1: Infrastructure | 1-2 hours | None |
| Phase 2: Site Build | 3-5 hours | Phase 1 |
| Phase 3: Testing | 1-2 hours | Phase 2 |
| Phase 4: Launch | 1 hour | Phase 3 |
| Phase 5: Week 1 | Ongoing | Phase 4 |

**Realistic launch:** 1-2 days from now if site build is straightforward.

---

## Emergency Contacts (For Your Reference)

| Service | Support URL |
|---------|-------------|
| Domain registrar | [your registrar] |
| Email provider | [your provider] |
| Hosting | [your host] |
| Calendly | help.calendly.com |
| Google Search Console | support.google.com/webmasters |

---

*See you tomorrow. Bring a staging URL and we'll run the pre-launch checks together.*
