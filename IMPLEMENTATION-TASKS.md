# QSol Website Restructure — Implementation Tasks

**Source:** qsol_website_service_pdr_prd.md
**Objective:** Increase clarity of deliverable while preserving 4-category nav structure
**Principle:** conversion likelihood ∝ problem recognition × credibility × clarity of deliverable

---

## Phase 1: Information Architecture

### Task 1.1: Services Page Two-Layer Structure
**Status:** Pending
**Files:** `src/pages/services/index.astro`

- [ ] Keep 4 service family cards as Layer 1
- [ ] Add Layer 2: Concrete offer cards under each family
- [ ] Mapping:
  - Operational Data Systems → 3 offers
  - Predictive Analytics & Forecasting → 2 offers
  - Machine Learning Solutions → 1 offer
  - AI & Intelligent Automation → 2 offers

### Task 1.2: Homepage "What We Do" Enhancement
**Status:** Pending
**Files:** `src/pages/index.astro`

- [ ] Keep existing 4 category cards
- [ ] Add second row: "Practical services we deliver" with 8 offer labels
- [ ] Labels: Reporting & Workflow Automation, Forecasting Systems, Customer Segmentation, Anomaly Detection, Text & Document Processing, Internal AI Knowledge Assistants, Internal Decision Tools & Estimators, Data & AI Readiness Audits

### Task 1.3: Internal Linking Structure
**Status:** Pending

- [ ] Link each offer to relevant case studies
- [ ] Cross-link related offers (e.g., automation ↔ anomaly detection alerts)
- [ ] Make Diagnostic/Audit visible as entry-point offer

---

## Phase 2: Service Page Rewrites

### Task 2.1: Operational Data Systems Page
**Status:** Pending
**Files:** `src/pages/services/automation-workflow.astro` (or restructure)

Add 3 offer blocks:
1. **Reporting & Workflow Automation**
   - Lead pain: reports take hours, manual copy-paste errors
   - Deliverables: automated pipeline, validation rules, dashboard feed
   - Timeline: 2-4 weeks
   - CTA: "Book a call to identify reporting work that should already be automated"

2. **Decision-Support Tools & Internal Apps**
   - Lead pain: important calcs in fragile spreadsheets, decisions depend on one person
   - Deliverables: estimator tool, quote builder, scenario calculator
   - Timeline: 3-8 weeks
   - CTA: "Book a call to discuss the spreadsheet that should become a real tool"
   - Link: Estimating/MIS case study

3. **Data & AI Readiness Audits**
   - Lead pain: don't know where to start, AI discussions vague
   - Deliverables: audit report, prioritised opportunities, roadmap
   - Timeline: 1-5 days
   - CTA: "Book a call for a grounded view of what your data can support"
   - Position as: safest first engagement for uncertain buyers

### Task 2.2: Predictive Analytics & Forecasting Page
**Status:** Pending
**Files:** `src/pages/services/forecasting-anomaly-detection.astro`

Split into 2 distinct offer blocks:

1. **Forecasting Services**
   - Lead pain: planning based on instinct, seasonal effects poorly understood
   - Deliverables: baseline forecast model, dashboard with uncertainty bands
   - Timeline: 3-6 weeks
   - CTA: "Book a call to explore where better forecasting could reduce waste"

2. **Anomaly Detection & Monitoring**
   - Lead pain: problems noticed after they've caused cost, manual review doesn't scale
   - Deliverables: monitoring rules, alert logic, review dashboard
   - Timeline: 3-6 weeks
   - CTA: "Book a call to explore where earlier warning would protect margin"

### Task 2.3: Machine Learning Solutions Page
**Status:** Pending
**Files:** `src/pages/services/customer-segmentation.astro`

Reframe to lead with commercial insight:

1. **Customer Segmentation & Commercial Insight**
   - Lead pain: marketing treats customers same way, sales don't know who to prioritise
   - Deliverables: segment definitions, customer scoring, actionable account lists
   - Timeline: 4-8 weeks
   - CTA: "Book a call to see what your customer data is hiding"
   - Link: Customer clustering case study
   - Keep recommendation/classification as supporting capabilities, not lead

### Task 2.4: AI & Intelligent Automation Page
**Status:** Pending
**Files:** `src/pages/services/analytics-dashboards.astro` (needs rename/restructure)

Split into 2 distinct offer blocks:

1. **Lightweight NLP Solutions**
   - Lead pain: useful info trapped in emails/feedback/documents, manual categorisation slow
   - Deliverables: text processing workflow, classification scheme, search interface
   - Timeline: 2-6 weeks
   - CTA: "Book a call to discuss whether your text-heavy workflow can be simplified"
   - Avoid: "advanced NLP", "cutting-edge language AI"

2. **Internal AI Assistants (Grounded on Company Documents)**
   - Lead pain: info exists but hard to retrieve, knowledge trapped with few staff
   - Deliverables: document Q&A assistant, retrieval interface with citations
   - Timeline: 3-6 weeks
   - CTA: "Book a call to explore whether your document library could become a usable assistant"
   - Key words: grounded, cited, narrow, reviewable
   - Link: Estimator and lesson-planner case studies

---

## Phase 3: Copy & Messaging

### Task 3.1: Apply Copy Pattern to All Offers
**Status:** Pending

Each offer block must include:
1. What it is (1-2 sentences)
2. Who it is for
3. Problems it solves (bullet list)
4. What is delivered (bullet list)
5. Why it creates value
6. Typical examples
7. What is needed from client
8. Typical timeline
9. CTA

### Task 3.2: Tone Audit
**Status:** Pending

- [ ] Replace abstract capability-led wording with problem-led wording
- [ ] Remove any inflated AI phrasing
- [ ] Ensure calm, concrete, commercially literate tone
- [ ] Add simple-language summary blocks

---

## Phase 4: Case Study Linking

### Task 4.1: Map Case Studies to Offers
**Status:** Pending

| Offer | Case Study |
|-------|------------|
| Reporting & Workflow Automation | Acoustic consultancy automation |
| Decision-Support Tools | Estimating/MIS system |
| Forecasting Services | (operational planning if exists) |
| Customer Segmentation | Customer clustering |
| Internal AI Assistants | Lesson planner |

### Task 4.2: Add "Relevant Services" Tags to Case Studies
**Status:** Pending
**Files:** `src/pages/case-studies/*.astro`

---

## Phase 5: Conversion Optimization

### Task 5.1: CTA Variants by Context
**Status:** Pending

- Homepage: "Book a Discovery Call"
- Services pages: Context-specific CTAs from PRD
- Case studies: "Discuss a similar project"
- Audit offer: Position as lower-friction first engagement

### Task 5.2: Data Audit as Entry Point
**Status:** Pending

- [ ] Make audit visible across site as safest first step
- [ ] Connect to existing "Diagnostic" nav item
- [ ] Position as primary low-friction productised service

---

## Phase 6: SEO Considerations

### Task 6.1: Preserve Broad Category SEO
**Status:** Pending

- [ ] Keep category pages for search intent capture
- [ ] Add specific subheadings targeting long-tail intent

### Task 6.2: Future Landing Pages (Optional)
**Status:** Backlog

Candidates for dedicated pages:
- reporting automation consultant UK
- forecasting consultant for SMEs UK
- customer segmentation consultant UK
- internal AI assistant for company documents UK
- estimator tool development for SMEs UK

---

## Implementation Order

1. **Services index page** — Add two-layer structure
2. **Individual service pages** — Add offer blocks with full copy pattern
3. **Homepage** — Add practical services row
4. **Case studies** — Add service tags and links
5. **Cross-linking** — Connect related offers
6. **CTA optimization** — Contextual CTAs throughout

---

## Quality Checklist

Before marking complete:
- [ ] Every offer has: pain points, deliverables, timeline, CTA
- [ ] No abstract capability-led language remains
- [ ] Case studies linked to relevant offers
- [ ] Audit/Diagnostic visible as entry point
- [ ] 4-category nav preserved
- [ ] 8 offers visible as concrete pathways
- [ ] Tone is calm, concrete, SME-appropriate
