# Case Study: Distribution Demand Forecasting

**URL:** /case-studies/distribution-forecasting-demo/
**Title Tag:** Case Study: Distribution Demand Forecasting | QSol Analytics
**Meta Description:** How demand forecasting reduced stockouts by 34% and overstock by 22% for a distribution company. A representative example of QSol Analytics' forecasting work.

---

## Case Study Banner

**Label:** Demo Project
**Note:** *This case study uses anonymised data and is representative of typical forecasting projects. It demonstrates our methodology and realistic outcomes.*

---

## Hero Section

### H1
Distribution Demand Forecasting

### Subtitle
How we helped a distribution company anticipate demand instead of reacting to it—reducing stockouts and overstock while improving customer service.

---

## Overview Box

| Aspect | Details |
|--------|---------|
| **Industry** | Wholesale distribution (building materials) |
| **Company Size** | ~65 employees |
| **Challenge** | Frequent stockouts on fast movers; excess stock on slow movers |
| **Solution** | Demand forecasting system with automated reorder recommendations |
| **Timeline** | 6 weeks from kickoff to production |
| **Outcome** | 34% reduction in stockouts; 22% reduction in overstock value |

---

## The Challenge Section

### H2
The Challenge

This building materials distributor carried 4,000+ SKUs across three warehouses. Inventory management was a constant headache.

**The pattern was frustratingly familiar:**

- **Fast-moving items** ran out unexpectedly—losing sales and frustrating customers
- **Slow-moving items** accumulated—tying up cash and warehouse space
- **Seasonal patterns** were recognised too late—summer products ordered in summer, not spring
- **Reorder decisions** were made by gut feel, modified by whoever shouted loudest

**The consequences were measurable:**

- 18% of customer orders included at least one backordered item
- £280,000 of "dead stock" hadn't moved in 12+ months
- Three full-time staff spent significant time on manual inventory reviews
- Emergency orders to suppliers cost 15-20% premium over planned orders

**The Managing Director's frustration:**
"We know demand patterns exist—building materials are seasonal. But we're always reacting instead of preparing. There has to be a better way."

---

## Our Approach Section

### H2
Our Approach

### Data Assessment (Day 1-5)

We extracted three years of transaction data from their ERP and analysed it:

**What we found:**
- Clear seasonal patterns for 40% of SKUs (predictable)
- Trend patterns for 25% of SKUs (growing or declining)
- Irregular patterns for 35% of SKUs (harder to forecast, but smaller volumes)

**Data quality issues:**
- Product code changes over time (we built a mapping table)
- Missing data during a system migration (we accounted for the gap)
- Promotional spikes not flagged (we identified and adjusted)

**Key insight:** The most valuable 800 SKUs (20% of range) drove 78% of revenue. These were our priority for accurate forecasting.

### Forecasting Model Development (Day 6-20)

We built a forecasting system using proven methods matched to the data:

**For seasonal products:**
Time-tested statistical methods that automatically detect and project seasonal patterns—the same approaches used successfully in demand planning for decades.

**For trending products:**
Methods that identify whether demand is growing, stable, or declining, and project accordingly.

**For irregular products:**
Simpler approaches based on recent averages, with wider safety margins to account for unpredictability.

*What this means:* We use the right tool for each situation. Sophisticated methods where they help; simple methods where they're sufficient. No unnecessary complexity.

**Validation approach:**
We tested our forecasts against the most recent 6 months of actual sales (held back from training). This proved the system worked before deployment.

| SKU Category | Forecast Accuracy (MAPE) | Industry Benchmark |
|--------------|--------------------------|-------------------|
| High-volume seasonal | 12% error | 15-20% typical |
| High-volume trending | 15% error | 18-22% typical |
| Medium-volume | 22% error | 25-30% typical |

### Reorder Recommendation System (Day 21-32)

Forecasts alone don't change behaviour. We built a system that translated predictions into actions:

**Weekly output:**
- Recommended reorder quantities per SKU
- Suggested reorder dates based on lead times
- Risk flags for potential stockouts in next 4 weeks
- Overstock alerts for slow-moving items

**Safety stock calculation:**
Rather than arbitrary buffers, we calculated safety stock based on:
- Forecast uncertainty (wider for less predictable items)
- Lead time variability
- Service level targets (set by the client per product category)

### Implementation (Day 33-42)

**Deliverables:**
- Automated forecasting pipeline (runs weekly)
- Dashboard showing forecasts, recommendations, and accuracy tracking
- Integration with their ERP for one-click reorder creation
- Documentation and training for the purchasing team

**Transition approach:**
First month: recommendations reviewed manually before action
Second month: semi-automated (approve recommendations in batch)
Third month: automated for routine items, manual review for exceptions

---

## The Results Section

### H2
The Results

### 90-Day Outcomes

| Metric | Before | After |
|--------|--------|-------|
| Orders with backorders | 18% | 11% (-34% relative) |
| Dead stock value | £280,000 | £218,000 (-22%) |
| Emergency orders | 8-12 per month | 2-4 per month |
| Time on inventory review | 15+ hours/week | 4 hours/week |
| Forecast accuracy (top 800 SKUs) | N/A | 85% within 20% of actual |

### Cash Flow Impact

**Working capital freed:**
- £62,000 reduction in excess inventory
- Improved stock turn from 4.2x to 5.1x annually

**Cost savings:**
- Reduced emergency order premiums: ~£18,000/year
- Staff time redirected: equivalent to 0.5 FTE

### Beyond the Numbers

**For the Purchasing Manager:**
"I spend my time on exceptions and supplier relationships now, not on routine reorder calculations. The recommendations are better than my gut feel was."

**For Warehouse Operations:**
"We're not scrambling to find space for unexpected deliveries, and we're not apologising for stockouts. It's just calmer."

**For the Managing Director:**
"We're finally using our data instead of just collecting it. The ROI was clear within three months."

---

## Technical Details Section

### H2
Technical Details

**Analysis Stack:**
- Python (pandas, statsmodels, scikit-learn)
- PostgreSQL for data warehouse
- ERP integration via API (Sage 200)
- Metabase for dashboards

**Forecasting Methods:**
- Seasonal patterns: proven statistical decomposition methods
- Trending products: adaptive smoothing techniques
- New products: category-based initial estimates
- All methods: automatic selection based on data characteristics

**System Architecture:**
- Weekly batch forecasting (Saturday night)
- Daily stockout risk calculation
- Real-time dashboard updates
- Email alerts for urgent reorder recommendations

**Maintenance:**
Fully documented. Client can adjust parameters, add new products, modify service level targets. Quarterly model review recommended.

---

## Lessons Learned Section

### H2
Lessons Learned

1. **Start with the high-value items.** Perfect forecasting for slow movers doesn't move the needle. We focused effort where it mattered—the 20% of SKUs driving 78% of revenue.

2. **Match methods to patterns.** Not everything needs advanced techniques. Some products need sophisticated seasonal methods; others work fine with simple averages. Know the difference.

3. **Forecasts need to become actions.** A forecast in a spreadsheet doesn't reduce stockouts. Integration with purchasing workflows made the difference.

4. **Accuracy tracking builds trust.** Publishing forecast accuracy transparently helped the team trust (and appropriately question) the recommendations.

5. **Safety stock is not one-size-fits-all.** Calculating buffers based on actual variability and service targets was more effective than arbitrary percentages.

---

## CTA Section

### H2
Ready to Anticipate Demand Instead of Reacting?

**Body:**
If your business is caught between stockouts and overstock, demand forecasting can help. Book a 30-minute discovery call to discuss your inventory challenges and whether forecasting is the right solution.

[Book a Discovery Call →]

---

## Related Content

- [Service: Forecasting & Anomaly Detection →] /services/forecasting-anomaly-detection/
- [Blog: Time Series Forecasting for Business →] /insights/time-series-forecasting-business/
- [Case Study: Retail Segmentation →] /case-studies/retail-segmentation-demo/
- [FAQ: Forecasting Questions →] /faq/#forecasting

---

## Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Case Study: Distribution Demand Forecasting",
  "description": "How demand forecasting reduced stockouts by 34% and overstock by 22% for a distribution company.",
  "author": {
    "@type": "Organization",
    "name": "QSol Analytics"
  },
  "publisher": {
    "@type": "Organization",
    "name": "QSol Analytics"
  },
  "datePublished": "2024-02-10"
}
```
