# Case Study: Manufacturing Operations Dashboard

**URL:** /case-studies/manufacturing-dashboard-demo/
**Title Tag:** Case Study: Manufacturing Operations Dashboard | QSol Analytics
**Meta Description:** How a live operations dashboard replaced weekly spreadsheet reports and reduced production delays by 28%. A representative example of QSol Analytics' dashboard work.

---

## Case Study Banner

**Label:** Demo Project
**Note:** *This case study uses anonymised data and is representative of typical dashboard projects. It demonstrates our methodology and realistic outcomes.*

---

## Hero Section

### H1
Manufacturing Operations Dashboard

### Subtitle
How we replaced fragmented spreadsheet reports with a live operations dashboard that reduced production delays and gave leadership real-time visibility.

---

## Overview Box

| Aspect | Details |
|--------|---------|
| **Industry** | Manufacturing (precision engineering) |
| **Company Size** | ~120 employees |
| **Challenge** | No single view of production; decisions based on stale data |
| **Solution** | Live dashboard connecting ERP, shop floor, and quality systems |
| **Timeline** | 4 weeks from kickoff to production |
| **Outcome** | 28% reduction in production delays; 6 hours/week saved on reporting |

---

## The Challenge Section

### H2
The Challenge

This precision engineering manufacturer had grown from 40 to 120 employees over five years. Their systems hadn't kept pace.

**The visibility problem was acute:**

- **Production data lived in the ERP** but was only updated at end of day
- **Quality data lived in spreadsheets** maintained by the quality manager
- **Shop floor status** was communicated via whiteboards and word of mouth
- **Customer delivery dates** were tracked in a separate system by the sales team

**The result:** Nobody had a single view of operations.

- The Operations Director's weekly review meeting relied on data that was already 2-5 days old
- Production bottlenecks weren't visible until they'd already caused delays
- Quality issues were discovered after batches were complete, not during production
- Customer queries about delivery dates required multiple phone calls to answer

**The real cost:**
- 28% of orders delivered late in the previous quarter
- Operations Director spending Monday mornings in "data archaeology"
- Quality issues caught too late, requiring rework
- Customer frustration and competitive vulnerability

---

## Our Approach Section

### H2
Our Approach

### Discovery (Day 1-3)

We spent half a day on-site observing how information flowed—and didn't flow. We mapped:

- Every system containing relevant data
- Who needed what information, and when
- Current reporting processes (formal and informal)
- The actual questions leadership needed answered daily

**Key finding:** Four systems contained the data needed; none of them talked to each other. But all four had accessible data exports or APIs.

### Design (Day 4-8)

We proposed a dashboard with three views:

**1. Production Overview (Operations Director)**
- Real-time status of all active jobs
- Bottleneck detection: jobs behind schedule highlighted
- Capacity utilisation by work centre
- Upcoming delivery deadlines with completion probability

**2. Quality Monitor (Quality Manager)**
- Inspection pass/fail rates by product line
- Trend analysis for recurring issues
- In-process quality alerts
- First-pass yield metrics

**3. Customer View (Sales Team)**
- Order status lookup
- Expected delivery dates with confidence levels
- Proactive delay alerts for customer communication

**Critical design decision:** We prioritised operational questions over comprehensive data. The dashboard answers 10 specific questions well, rather than displaying everything.

### Build (Day 9-22)

Technical implementation:
- Data extraction scripts for each source system (ERP API, SQL queries, CSV parsing)
- Centralised data store (PostgreSQL on their existing server)
- Refresh schedule: every 30 minutes during production hours
- Dashboard built in Metabase (open-source, self-hosted)
- Email alerts for threshold breaches

We involved the Operations Director in weekly reviews to ensure the dashboard answered real questions.

### Test & Refine (Day 23-28)

Two weeks of parallel running:
- Dashboard visible on a trial basis
- Feedback collected daily
- Three significant refinements based on user input

**Example refinement:** The original "jobs at risk" threshold was too sensitive—too many false alarms. We tuned it based on historical delay patterns.

---

## The Results Section

### H2
The Results

### Quantified Outcomes

| Metric | Before | After |
|--------|--------|-------|
| Late deliveries | 28% of orders | 18% of orders (-36% relative) |
| Time spent on weekly reporting | 8+ hours/week | ~2 hours/week |
| Time to answer customer queries | 15-30 minutes | 2 minutes |
| Quality issues caught in-process | ~20% | ~65% |
| Production meeting duration | 90 minutes | 45 minutes |

### Beyond the Numbers

**For the Operations Director:**
"I start my day knowing what's actually happening, not what happened three days ago. The Monday morning data hunt is gone."

**For the Quality Manager:**
"I see issues as they develop, not after the batch is finished. We catch problems before they multiply."

**For Sales:**
"When customers ask about their order, I can give them a confident answer in two minutes. That's changed the relationship."

**For the Business:**
Late deliveries dropped by over a third in the first quarter. Customer complaints reduced accordingly.

---

## Technical Details Section

### H2
Technical Details

**Stack:**
- PostgreSQL database (on-premise)
- Python for data extraction and transformation
- Metabase for visualisation (self-hosted, open-source)
- Scheduled via cron jobs on Linux server

**Data Sources Connected:**
- ERP system (SAP Business One—API)
- Quality inspection database (Access—ODBC)
- Shop floor logging spreadsheets (Excel on network share)
- Sales order system (SQL Server—direct query)

**Refresh Schedule:**
- Production data: every 30 minutes
- Quality data: every 15 minutes
- Sales data: hourly

**Maintenance:**
Dashboard handed over with documentation. Client can modify views, add metrics, adjust thresholds. Ongoing support available.

---

## Lessons Learned Section

### H2
Lessons Learned

1. **Answer questions, don't display data.** The best dashboards are opinionated. We designed for "What do I need to do today?" not "Show me everything."

2. **Involve users early and often.** Weekly reviews with the Operations Director caught issues before they became ingrained. The dashboard matches how they think.

3. **Thresholds need tuning.** Alert fatigue is real. We adjusted sensitivity based on two weeks of real-world feedback.

4. **Speed matters more than perfection.** 30-minute data freshness was transformative, even though real-time would be "better." Good enough, delivered, beats perfect, delayed.

5. **Open-source works.** Metabase delivered everything needed without licensing costs. The right tool depends on context, not vendor marketing.

---

## CTA Section

### H2
Want Visibility Into Your Operations?

**Body:**
If your team is making decisions on stale data while the real situation hides across multiple systems, let's talk. Book a 30-minute discovery call to discuss what operational visibility could look like for your business.

[Book a Discovery Call →]

---

## Related Content

- [Service: Analytics & Dashboards →] /services/analytics-dashboards/
- [Blog: Data Dashboards for SMEs →] /insights/data-dashboards-smes/
- [Case Study: Logistics Automation →] /case-studies/logistics-automation-demo/
- [FAQ →] /faq/

---

## Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Case Study: Manufacturing Operations Dashboard",
  "description": "How we replaced fragmented spreadsheet reports with a live operations dashboard that reduced production delays by 28%.",
  "author": {
    "@type": "Organization",
    "name": "QSol Analytics"
  },
  "publisher": {
    "@type": "Organization",
    "name": "QSol Analytics"
  },
  "datePublished": "2024-02-01"
}
```
