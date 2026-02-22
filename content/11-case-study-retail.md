# Case Study: Retail Customer Segmentation

**URL:** /case-studies/retail-segmentation-demo/
**Title Tag:** Case Study: Retail Customer Segmentation | QSol Analytics
**Meta Description:** How customer segmentation helped an ecommerce retailer increase repeat purchases by 24%. A representative example of QSol Analytics' segmentation work.

---

## Case Study Banner

**Label:** Demo Project
**Note:** *This case study uses anonymised data and is representative of typical segmentation projects. It demonstrates our methodology and realistic outcomes.*

---

## Hero Section

### H1
Retail Customer Segmentation

### Subtitle
How we helped an ecommerce retailer understand their customer base and increase repeat purchases by targeting the right segments with the right messages.

---

## Overview Box

| Aspect | Details |
|--------|---------|
| **Industry** | Ecommerce retail (homeware) |
| **Company Size** | ~45 employees |
| **Challenge** | Same marketing to all customers; declining repeat purchase rate |
| **Solution** | RFM segmentation + churn risk scoring |
| **Timeline** | 4 weeks from kickoff to implementation |
| **Outcome** | 24% increase in repeat purchases from targeted segments |

---

## The Challenge Section

### H2
The Challenge

This homeware retailer had grown steadily over five years, building a customer database of over 80,000 purchasers.

But growth was slowing, and the marketing director noticed a worrying trend:

**Repeat purchase rate was declining.** Customers who bought once weren't coming back.

The problem: everyone got the same marketing.

- Same emails to the customer who'd spent £2,000 over three years and the one who bought a £15 candle once
- Same discount codes to loyal customers and price-sensitive bargain hunters
- No early warning when a previously active customer went quiet

**What they needed:**
- Understand which customers were most valuable
- Identify who was at risk of churning
- Target different segments with different approaches
- Measure whether segmented marketing actually worked

---

## Our Approach Section

### H2
Our Approach

### Data Assessment (Day 1-3)

We pulled three years of transaction data from their ecommerce platform (Shopify) and linked it with email engagement data (Klaviyo).

**Data we worked with:**
- Order history: date, value, products, discount codes used
- Customer acquisition source
- Email engagement: opens, clicks, unsubscribes
- Website behaviour: browsing sessions, abandoned carts

**Data quality check:** 95% usable. Some duplicate customer records needed deduplication; we flagged and resolved those first.

### Segmentation Analysis (Day 4-12)

**Step 1: RFM Segmentation**
Classic Recency-Frequency-Monetary analysis to categorise customers:

| Segment | Description | % of Customers | % of Revenue |
|---------|-------------|----------------|--------------|
| Champions | Recent, frequent, high-value | 8% | 42% |
| Loyal | Regular buyers, moderate value | 15% | 28% |
| Promising | Recent single purchase, growth potential | 22% | 12% |
| At Risk | Previously active, now quiet | 18% | 11% |
| Lapsed | Haven't purchased in 12+ months | 31% | 5% |
| Others | Various smaller segments | 6% | 2% |

**Key insight:** 8% of customers generated 42% of revenue. But marketing spend wasn't weighted accordingly.

**Step 2: Churn Risk Scoring**
For the "At Risk" and "Loyal" segments, we built a predictive model:
- Which customers are likely to lapse in the next 90 days?
- What signals predict churn? (Answer: declining email engagement + longer gap between purchases)

The model flagged 2,100 customers as high churn risk—many of whom were in the "Loyal" segment and worth saving.

### Strategy Development (Day 13-18)

We worked with their marketing team to design segment-specific approaches:

| Segment | Strategy | Offer | Channel |
|---------|----------|-------|---------|
| Champions | VIP treatment | Early access, exclusive previews | Email + direct mail |
| Loyal | Appreciation + upsell | Loyalty discount, curated recommendations | Email |
| Promising | Nurture to second purchase | Welcome series, product education | Email automation |
| At Risk | Reactivation | Win-back offer, "we miss you" | Email + retargeting |
| Lapsed | Selective reactivation | Deep discount for high-CLV; unsubscribe low-CLV | Email (final attempt) |

### Implementation (Day 19-25)

We delivered:
- Customer list with segment labels, uploaded to Klaviyo
- Churn risk scores, updated weekly via automated pipeline
- Dashboard showing segment sizes, revenue contribution, and migration
- Documentation and training for ongoing use

---

## The Results Section

### H2
The Results

### 90-Day Outcomes

| Metric | Before | After |
|--------|--------|-------|
| Repeat purchase rate | 18% | 22% (+24% relative) |
| Email engagement (Champions) | 45% open rate | 52% open rate |
| Churn (At Risk segment) | 62% lapsed | 48% lapsed |
| Marketing ROI | £3.20 per £1 spent | £4.80 per £1 spent |
| Unsubscribes | 2.1% per campaign | 1.4% per campaign |

### Beyond the Numbers

**For Marketing:**
"We're finally talking to different customers differently. It sounds obvious, but we never had the data to do it properly."

**For Finance:**
Clear visibility into customer lifetime value. Acquisition spend now informed by segment profitability.

**For the Business:**
A framework for ongoing optimisation. Segments evolve over time, and the dashboard shows the trends.

---

## Technical Details Section

### H2
Technical Details

**Analysis Stack:**
- Python (pandas, scikit-learn)
- Shopify API for order data
- Klaviyo API for email data
- Google BigQuery for data warehouse

**Churn Model:**
- Gradient boosting classifier
- Features: recency, frequency, monetary, email engagement, browse behaviour
- Accuracy: 78% (validated on holdout set)
- Refreshed weekly

**Deliverables:**
- Segment labels synced to Klaviyo as customer properties
- Risk scores as custom attributes
- Metabase dashboard for monitoring
- Python codebase for ongoing maintenance

---

## Lessons Learned Section

### H2
Lessons Learned

1. **Start with RFM.** It's simple, interpretable, and almost always reveals something actionable. Fancy models come later.

2. **Segment-specific messaging matters more than perfect segmentation.** Even a rough segmentation, acted upon, beats sophisticated analysis that sits in a report.

3. **Sync segments to marketing tools.** Analysis that lives in a spreadsheet doesn't get used. Segments in Klaviyo get used.

4. **Track segment migration.** The real metric isn't segment sizes—it's whether customers are moving from "At Risk" to "Loyal" or vice versa.

---

## CTA Section

### H2
Want to Understand Your Customers Better?

**Body:**
If you have customer data but aren't using it to its full potential, let's talk. Book a 30-minute discovery call to explore what segmentation could do for your business.

[Book a Discovery Call →]

---

## Related Content

- [Service: Customer Segmentation →] /services/customer-segmentation/
- [Blog: Customer Segmentation Examples →] /insights/customer-segmentation-examples/
- [FAQ →] /faq/

---

## Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Case Study: Retail Customer Segmentation",
  "description": "How customer segmentation helped an ecommerce retailer increase repeat purchases by 24%.",
  "author": {
    "@type": "Organization",
    "name": "QSol Analytics"
  },
  "publisher": {
    "@type": "Organization",
    "name": "QSol Analytics"
  },
  "datePublished": "2024-01-20"
}
```
