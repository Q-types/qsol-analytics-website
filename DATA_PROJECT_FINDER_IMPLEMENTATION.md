# QSol Data Project Finder - Implementation Plan

**Product:** Find Your First Useful Data Project
**Type:** LLM-powered diagnostic & lead-generation tool
**Location:** Homepage section below hero
**Project ID:** b435c4f0-2bd9-4cc3-87a8-e969fdf22684

---

## Executive Summary

An interactive diagnostic tool that converts vague SME business problems into classified data/AI/automation project opportunities. Visitors describe their problem in plain English, receive instant classification and project-fit scoring, then unlock a full implementation roadmap by providing their email.

**Goal:** Increase homepage conversion, capture qualified leads with context, demonstrate QSol diagnostic ability.

---

## Tech Stack

- **Frontend:** Astro + TypeScript + Tailwind CSS
- **Backend:** Astro API routes / Vercel serverless
- **Database:** Supabase (PostgreSQL)
- **LLM:** OpenAI (GPT-4)
- **Email:** Resend
- **Notifications:** Telegram Bot API
- **Hosting:** Vercel

---

## Critical Gotchas

| Severity | Issue | Solution |
|----------|-------|----------|
| **CRITICAL** | Exposing service_role key | Only use anon key on client, service_role on server only |
| High | Missing RLS policies | Always enable RLS and add policies for all tables |
| Medium | Using 'any' type | Define proper types or use 'unknown' with type guards |

---

## Sprint Plan

### Sprint 1: Foundation & Playbook
**Goal:** Set up database schema, create method playbook content, build static diagnostic UI

| Task | Team | Priority |
|------|------|----------|
| Create Supabase database schema | Database | P1 |
| Create method playbook markdown files (7 files) | Documentation | P1 |
| Design DataProjectFinder component UI | Design | P1 |
| Build static DataProjectFinder component | Frontend | P2 |

**Deliverables:**
- `diagnoses` and `leads` tables with RLS
- `/qsol_method_playbook/` with 7 method files
- `DataProjectFinder.astro` component with all UI states

---

### Sprint 2: Core Diagnostic Engine
**Goal:** Build /api/diagnose endpoint with LLM classification, scoring, and roadmap generation

| Task | Team | Priority |
|------|------|----------|
| Build /api/diagnose endpoint | Backend | P1 |
| Create LLM prompt and scoring system | Backend | P1 |
| Connect frontend to /api/diagnose | Frontend | P2 |
| Test classification accuracy (20+ cases) | Testing | P2 |

**Deliverables:**
- Working `/api/diagnose` returning structured classification
- Scoring formula: `S = 0.25V + 0.25F + 0.15U + 0.15D + 0.15R - 0.05C`
- Instant result display with project-fit score

---

### Sprint 3: Lead Capture & Email Gating
**Goal:** Build /api/unlock endpoint, email sending, lead storage, and full roadmap reveal

| Task | Team | Priority |
|------|------|----------|
| Build /api/unlock endpoint | Backend | P1 |
| Implement email sending service | Backend | P1 |
| Build email capture overlay UI | Frontend | P1 |
| Test lead capture flow end-to-end | Testing | P2 |

**Deliverables:**
- Email-gated roadmap unlock flow
- Branded email template with full roadmap
- Lead stored with consent tracking

---

### Sprint 4: Telegram & Deployment
**Goal:** Add Telegram notifications, privacy copy, final testing, and production deployment

| Task | Team | Priority |
|------|------|----------|
| Implement Telegram notification service | Backend | P1 |
| Add privacy and trust copy | Frontend | P1 |
| Security audit and rate limiting | Backend | P1 |
| Final integration testing | Testing | P1 |
| Deploy to production | DevOps | P1 |
| Create launch documentation | Documentation | P2 |

**Deliverables:**
- Telegram notifications to David on new leads
- Rate limiting (10/min diagnose, 5/min unlock)
- Production deployment on Vercel

---

## Database Schema

### Table: diagnoses
```sql
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  problem_description TEXT NOT NULL,
  classification TEXT NOT NULL,
  secondary_classifications JSONB,
  confidence TEXT CHECK (confidence IN ('low', 'medium', 'high')),
  scores JSONB,
  instant_result JSONB,
  full_roadmap JSONB,
  source TEXT DEFAULT 'homepage',
  utm_data JSONB,
  email_unlocked BOOLEAN DEFAULT FALSE
);
```

### Table: leads
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id UUID REFERENCES diagnoses(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  consent_to_contact BOOLEAN DEFAULT FALSE,
  lead_score INTEGER,
  telegram_notified BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE
);
```

---

## Classification Taxonomy

| Code | Label | Description |
|------|-------|-------------|
| `reporting_automation` | Reporting Automation | Repeated manual reporting, dashboards, spreadsheet exports |
| `spreadsheet_to_system` | Spreadsheet-to-System | Fragile spreadsheet acting as database/calculator/workflow |
| `forecasting_early_warning` | Forecasting & Early Warning | Demand, sales, workload, stock, staffing prediction |
| `customer_intelligence` | Customer Intelligence | Segmentation, retention, sales prioritisation, CLV, churn |
| `ai_knowledge_assistant` | AI Knowledge Assistant | Internal document search, knowledge retrieval |
| `workflow_automation` | Workflow Automation | Repetitive admin, file handling, data entry |
| `data_readiness` | Data Readiness First | Data structure/quality/access needs sorting first |
| `not_enough_information` | Needs Clarification | Input too vague for reliable classification |

---

## Scoring Formula

```
Project Fit = Value Potential × Feasibility × Urgency
```

Weighted version:
```
S = 0.25(V) + 0.25(F) + 0.15(U) + 0.15(D) + 0.15(R) - 0.05(C)
```

Where:
- V = Value potential (1-5)
- F = Feasibility (1-5)
- U = Urgency (1-5)
- D = Data readiness (1-5)
- R = Repeatability (1-5)
- C = Complexity penalty (1-5)

---

## API Endpoints

### POST /api/diagnose
**Request:**
```json
{
  "problem_description": "We have a spreadsheet for quotes...",
  "source": "homepage",
  "utm_source": null
}
```

**Response:**
```json
{
  "diagnosis_id": "diag_123",
  "instant_result": {
    "classification": "spreadsheet_to_system",
    "classification_label": "Spreadsheet-to-System",
    "confidence": "high",
    "summary": "Your spreadsheet appears to be...",
    "likely_first_project": "A controlled estimating tool...",
    "what_not_to_do_first": "Do not start with ML...",
    "project_fit_label": "High",
    "scores": {...}
  },
  "roadmap_preview": {
    "title": "Implementation Roadmap",
    "visible_preview": "Phase 1: Map the current workflow...",
    "locked_sections": [...]
  }
}
```

### POST /api/unlock
**Request:**
```json
{
  "diagnosis_id": "diag_123",
  "name": "Sarah",
  "email": "sarah@example.com",
  "company": "Acme Packaging",
  "consent_to_contact": true
}
```

**Response:**
```json
{
  "status": "success",
  "full_roadmap": {
    "executive_summary": "...",
    "implementation_phases": [...],
    "data_needed": [...],
    "recommended_tools": [...],
    "risks": [...],
    "next_step": "..."
  }
}
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Diagnostic section view rate | 60%+ of homepage visitors |
| Text box interaction rate | 10-25% |
| Analysis submission rate | 5-15% |
| Email unlock rate | 20-50% of submissions |
| Qualified lead rate | 10-30% of unlocks |

---

## Method Playbook Files

Create in `/qsol_method_playbook/`:

1. `reporting_automation.md`
2. `spreadsheet_to_system.md`
3. `forecasting_early_warning.md`
4. `customer_intelligence.md`
5. `ai_knowledge_assistant.md`
6. `workflow_automation.md`
7. `data_readiness.md`

Each file includes:
- When to use
- When not to use
- Data needed
- Simple first implementation
- Advanced implementation
- Risks
- QSol examples

---

## Example Chips (UI)

```
"We spend hours making the same report every month"
"Our quotes take too long and depend on one spreadsheet"
"We have customer data but do not know what to do with it"
"We need better demand or workload forecasts"
"Staff keep searching through documents for the same answers"
"We want to use AI but do not know where to start"
"Our spreadsheets are becoming hard to trust"
```

---

## Privacy Copy

**Near input:**
> Do not include passwords, sensitive customer data, or confidential files. A short description is enough.

**Near email capture:**
> We'll use your email to send your project map and follow up about your enquiry. No spam.

---

## Telegram Message Format

```
New QSol Project Finder Lead
Name: Sarah
Company: Acme Packaging
Email: sarah@example.com
Classification: Spreadsheet-to-System
Project Fit: High
Confidence: High
Problem:
"We have a spreadsheet for quotes..."
Likely first project:
Controlled estimating tool with editable price tables.
Suggested follow-up:
Offer a fixed-fee spreadsheet/process audit.
```

---

## Next Steps

1. Start Sprint 1: Foundation & Playbook
2. Set up Supabase project and create tables
3. Create method playbook content from CAM DS notes
4. Build DataProjectFinder component
