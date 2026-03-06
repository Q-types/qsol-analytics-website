# QSol Analytics Website Content Review Report

**Date:** February 2024
**Status:** Ready for revision decisions

---

## Executive Summary

Seven specialist agents reviewed all website content across key dimensions. Overall, the content is **well-written and professional**, with strong messaging consistency and authentic tone. However, several significant gaps were identified that need addressing before launch.

### Overall Scores by Area

| Area | Score | Priority |
|------|-------|----------|
| Messaging Consistency & Tone | 9/10 | Low |
| Interpretability/Explainability | 9/10 | Low |
| Simplicity Philosophy | 9/10 | Low |
| Forecasting Clarity | 8/10 | Medium |
| Timeline/Delivery Descriptions | 7/10 | High |
| Target Audience/ICPs | 7.5/10 | Medium |
| Service Clarity | 7.5/10 | Medium |
| Anomaly Detection Positioning | 6/10 | High |
| AI/ML Positioning | 5/10 | **Critical** |

---

## Critical Issues (Must Fix)

### Issue 1: AI/ML Capability is Almost Invisible

**Problem:** The website undersells AI/ML capabilities. A visitor could read the entire site and think QSol is a general IT consultancy rather than an AI-capable data science firm.

**Evidence:**
- The term "AI" appears **zero times** across all content
- "Machine learning" appears only **4 times** (buried in service pages)
- "Automation" appears **30+ times** - dominating the positioning
- Homepage hero does not mention ML/AI at all

**Impact:** Buyers actively seeking AI/ML services may not find or recognize QSol. Differentiation from generic IT consultants is weakened.

**Recommendations:**
1. Add to Homepage "Why QSol" section:
   > **"AI Where It Helps, Simplicity Where It Doesn't"**
   > We apply machine learning and advanced analytics where they deliver genuine value—not to impress, but to solve problems. When a simpler approach works better, we'll tell you.

2. Add to About page under "Our Approach":
   > **"AI That Serves the Business"**
   > We're fluent in machine learning, statistical modelling, and data engineering—but we never apply these techniques just because we can. Every tool earns its place by delivering measurable results.

3. Add "Predictive Analytics" or "Machine Learning" to Services Overview meta description

---

### Issue 2: Anomaly Detection is Buried and Abstract

**Problem:** Anomaly detection is secondary to forecasting, uses too much jargon, and lacks concrete business scenarios that make SME owners think "I need this."

**Evidence:**
- Combined page: "Forecasting & Anomaly Detection" — forecasting first in URL, H1, and structure
- Homepage card says only "Spot anomalies before they become incidents" — too abstract
- Technical jargon on service page: "statistical process control," "multivariate patterns," "ARIMA"
- No quantified benefits on service page (the blog has 85% early catch rate, 35% complaint reduction — but this doesn't appear on the service page)

**Recommendations:**
1. **Consider splitting into separate service page:** `/services/anomaly-detection/` with its own SEO positioning around monitoring, early warning, problem prevention

2. **Add "recognition moments" to homepage card:**
   > "Last month's stock-out cost you £4,000. The warning signs were in your data—you just couldn't see them."

3. **Move the logistics case study metrics to service page:**
   > "Typical results: 85% of problems caught before customer complaints. 35% reduction in escalations."

4. **Add "What This Looks Like Day-to-Day" section** explaining who gets alerts, when, and what they do

---

### Issue 3: Pricing and Timeline Inconsistencies

**Problem:** Price ranges and timelines conflict across pages, undermining trust.

**Specific Conflicts:**

| Issue | Location 1 | Location 2 |
|-------|-----------|------------|
| Upper price range | Homepage: "£15,000+" | FAQ: "£25,000+" |
| Segmentation pricing | FAQ: "£4,000-8,000" | Service page: "£2,500-18,000" |
| "Weeks not months" claim | Hero messaging | FAQ: "2-3 months" for comprehensive |

**Recommendations:**
1. Align Homepage to "£3,000 to £25,000+" to match FAQ
2. Update FAQ segmentation range to "£2,500-18,000" to cover actual offerings
3. Qualify hero claim: "Most projects deliver in weeks, not months" or add "initial results in weeks"

---

## High Priority Issues

### Issue 4: Process Terminology is Fragmented

**Problem:** Each service page uses different step names for essentially the same process.

| Homepage | Automation | Dashboards | Segmentation | Forecasting |
|----------|------------|------------|--------------|-------------|
| Data Audit | Scope & Quote | Data Assessment | Data Assessment | Data Assessment |
| Prototype | Build | Build & Iterate | Analysis & Modelling | Model Development |
| Deploy & Iterate | Deploy & Document | Deploy & Train | Implementation Support | Integration |

**Impact:** Prospects reading multiple pages won't recognize a unified methodology.

**Recommendation:** Standardize to ONE canonical process:
1. Discovery (30 min)
2. Assessment (1-3 days)
3. Build (2-4 weeks)
4. Refine (1 week)
5. Deploy & Support

---

### Issue 5: Churn Prediction Not Visible Enough

**Problem:** "Churn" never appears on homepage. Prospects searching for churn prediction services may not realize it's offered.

**Evidence:**
- Homepage says "which are at risk" — too subtle
- Service page has full coverage but requires clicking through

**Recommendations:**
1. Add "churn prediction" explicitly to homepage Customer Segmentation card
2. Consider: "Know which customers are worth more, **predict who's about to leave**, and focus resources where they matter."

---

### Issue 6: ICP Employee Ranges Don't Match Target

**Problem:** Target is "10-500 employees" but ICP profiles only cover 20-200 collectively.

| ICP | Profile Range | Gap |
|-----|---------------|-----|
| Operations Director | 50-200 | Missing 10-50, 200-500 |
| MD/CEO | 20-100 | Missing 10-20, 100-500 |
| Finance Director | 30-150 | Missing 10-30, 150-500 |

**Impact:** Content doesn't speak to micro-SMEs (10-20) or larger SMEs (200-500).

**Recommendations:**
1. Adjust ICP ranges to cover full 10-500 spectrum
2. OR narrow stated target to "20-200 employees" to match reality
3. Add acknowledging language: "Whether you're a 15-person agency or a 400-person manufacturer..."

---

## Medium Priority Issues

### Issue 7: MD/CEO ICP Underserved on Homepage

**Problem:** Homepage speaks primarily to Operations Director. MD/CEO pain points (competitor using data better, revenue plateau, customer data gold mine) barely appear.

**Recommendation:** Add to problem section:
> "Your competitors are using data to win customers you should be keeping. You have customer data that could drive revenue—but you can't unlock it."

---

### Issue 8: No Quantified Outcomes on Service Pages

**Problem:** Service pages say "Reduced Stockouts" but don't say "by 15-30%." The blog has these numbers but they're not on buying decision pages.

**Recommendation:** Add 2-3 quantified outcomes to each service page:
- Automation: "Typical clients save 10-15 hours per week"
- Dashboards: "Reports available in seconds instead of hours"
- Segmentation: "15-25% reduction in churn within 90 days"
- Forecasting: "15-30% reduction in stockouts and overstock"

---

### Issue 9: Python/Tech Stack Not Prominent

**Problem:** Python only mentioned on Automation page. No mention of data science ecosystem.

**Recommendation:** Add to About page:
> "We build primarily with Python—the leading language for data science—giving you flexibility, transparency, and no vendor lock-in."

---

### Issue 10: Retained Engagement Model Unclear

**Problem:** "Retained support" mentioned but not detailed. No pricing, no scope explanation.

**Recommendation:** Add to FAQ or Services Overview:
> "Retained support typically ranges from £500-2,000/month depending on scope—covering ad-hoc questions, dashboard updates, and proactive monitoring."

---

## Low Priority Issues

### Issue 11: "Signal Over Noise" Missing from FAQ
Add mention in "How is this different from big firm?" answer.

### Issue 12: Data Requirements Not Specified
Add brief "What data do I need?" section to service pages. Forecasting mentions 2+ years history; other pages don't specify.

### Issue 13: No Technical Buyer ICP
Larger SMEs (100-500) often have IT Managers who evaluate vendors. Consider adding technical evaluator persona.

### Issue 14: Footer Tagline Omits Segmentation
"Data, Automation & Forecasting for SMEs" — doesn't mention the fourth service.

---

## What's Working Well (Keep)

### Strengths to Preserve

1. **Tone & Voice:** Confident, plain English, zero hype — highly consistent across all pages

2. **Interpretability Messaging:** "No black boxes," "plain English explanations" — appears 6+ times consistently

3. **Simplicity Philosophy:** "The best solution is the simplest one that works" — reinforced throughout

4. **Solo Founder Positioning:** "You work directly with the founder" — clear and consistent

5. **Self-Aware Honesty:** "If a spreadsheet fix solves your problem, we'll say so" — differentiating

6. **Physics Background Usage:** Mentioned exactly twice, always tied to practical benefit — well-calibrated

7. **Deliverable Specificity:** Concrete outputs listed (e.g., "Customer list with segment labels + tailored strategy")

8. **Price Transparency:** Actual GBP ranges provided — builds trust

---

## Summary: Priority Action List

### Must Do Before Launch

| # | Action | Location |
|---|--------|----------|
| 1 | Add AI/ML positioning to Homepage "Why QSol" section | Homepage |
| 2 | Add "AI That Serves the Business" to About page | About |
| 3 | Fix price range inconsistency (£15K → £25K) | Homepage FAQ |
| 4 | Add quantified outcomes to anomaly detection service page | Forecasting page |
| 5 | Add "churn prediction" explicitly to homepage | Homepage |
| 6 | Qualify "weeks not months" claim | Homepage hero |

### Should Do Before Launch

| # | Action | Location |
|---|--------|----------|
| 7 | Standardize process terminology across all service pages | All service pages |
| 8 | Add MD/CEO pain points to homepage problem section | Homepage |
| 9 | Add quantified outcomes to all service pages | Service pages |
| 10 | Add Python/tech stack mention to About | About |
| 11 | Detail retained engagement model | FAQ or Services |

### Consider for Post-Launch

| # | Action | Location |
|---|--------|----------|
| 12 | Create separate anomaly detection service page | New page |
| 13 | Adjust ICP employee ranges | Specs |
| 14 | Add data requirements sections | Service pages |
| 15 | Add technical buyer ICP | Specs |

---

## Next Steps

1. **Review this report** and decide which recommendations to accept
2. **Prioritize changes** — Critical and High Priority issues first
3. **I can make the edits** once you confirm which changes to implement

Let me know which issues to address first.
