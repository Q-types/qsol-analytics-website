# QSol Data Project Finder - SPARK Mission Prompts

Use these prompts with `spark-mission run "..."` to execute each sprint with optimal skill loading.

---

## Sprint 1: Foundation & Playbook

### Mission Prompt

```
spark-mission run "
PROJECT: QSol Data Project Finder - Sprint 1: Foundation & Playbook
GOAL: Set up database schema, create method playbook content, build static diagnostic UI

LOAD SKILLS:
- Supabase Backend (RLS policies, client setup, secure data access)
- PostgreSQL Wizard (schema design, indexing, JSONB columns)
- Database Architect (normalization, FK relationships, migrations)
- Tailwind CSS UI (consistent spacing, responsive, dark mode)
- Frontend Engineering (component architecture, state management)
- UI Design (visual interface, design system, accessibility)
- UX Design (user flows, usability, information architecture)
- Documentation Engineer (API docs, README, technical writing)
- TypeScript Strict Mode (proper types, no any abuse, type guards)
- Security Hardening (RLS verification, input sanitization)

TASKS:
1. Create Supabase schema with diagnoses and leads tables
   - Enable RLS on all tables
   - Add proper indexes on email, created_at
   - Use JSONB for scores, instant_result, full_roadmap

2. Create 7 method playbook markdown files in /qsol_method_playbook:
   - reporting_automation.md
   - spreadsheet_to_system.md
   - forecasting_early_warning.md
   - customer_intelligence.md
   - ai_knowledge_assistant.md
   - workflow_automation.md
   - data_readiness.md
   Each with: when to use, when not to use, data needed, implementation guidance, risks

3. Build DataProjectFinder.astro component:
   - Large text area with placeholder
   - 7 clickable example chips that auto-fill input
   - Loading spinner state
   - Mock result display
   - Faded roadmap preview with gradient
   - Email capture overlay form
   - All 9 UI states (empty, chip clicked, loading, result, preview, email, revealed, error, low-confidence)

CONSTRAINTS:
- Never expose service_role key to client
- Use anon key only on frontend
- Validate all inputs server-side
- Follow QSol brand: dark theme, green accents, calm professional tone
"
```

---

## Sprint 2: Core Diagnostic Engine

### Mission Prompt

```
spark-mission run "
PROJECT: QSol Data Project Finder - Sprint 2: Core Diagnostic Engine
GOAL: Build /api/diagnose endpoint with LLM classification, scoring, and roadmap generation

LOAD SKILLS:
- LLM Architect (structured output, prompting, RAG integration)
- Prompt Engineer (system prompts, few-shot, chain-of-thought)
- RAG Engineer (retrieval, semantic search, context injection)
- Backend Engineering (API architecture, error handling, performance)
- API Designer (REST patterns, validation, rate limiting, response envelopes)
- TypeScript Strict Mode (Zod schemas, type inference, generics)
- Test Architect (unit tests, integration tests, test fixtures)
- Testing Automation (Jest/Vitest, coverage, CI integration)
- Security Hardening (input validation, injection prevention)
- Supabase Backend (database operations, RLS compliance)

TASKS:
1. Create LLM prompt with classification taxonomy:
   - 8 categories: reporting_automation, spreadsheet_to_system, forecasting_early_warning, customer_intelligence, ai_knowledge_assistant, workflow_automation, data_readiness, not_enough_information
   - Scoring rubric: value_potential, feasibility, urgency, data_readiness, repeatability, complexity_penalty
   - Formula: S = 0.25V + 0.25F + 0.15U + 0.15D + 0.15R - 0.05C
   - Conservative classification principles: prefer simple before AI, no ROI promises

2. Build POST /api/diagnose endpoint:
   - Validate input (20-3000 chars)
   - Call OpenAI with structured output schema
   - Retrieve relevant playbook by classification
   - Generate instant_result and full_roadmap
   - Store in Supabase diagnoses table
   - Return diagnosis_id, instant_result, roadmap_preview

3. Connect frontend to API:
   - Wire DataProjectFinder to POST /api/diagnose
   - Handle loading, success, error states
   - Display classification, confidence, project fit score
   - Render roadmap preview with fade effect

4. Create test suite with 20+ example problems:
   - Cover all 8 classification types
   - Test edge cases: vague inputs, mixed problems
   - Verify scoring reasonableness
   - Target >80% classification accuracy

CONSTRAINTS:
- LLM must classify conservatively
- Prefer automation/reporting before recommending AI
- Include 'what not to do first' in every response
- Handle low-confidence with follow-up question
- No guaranteed ROI claims in output
"
```

---

## Sprint 3: Lead Capture & Email Gating

### Mission Prompt

```
spark-mission run "
PROJECT: QSol Data Project Finder - Sprint 3: Lead Capture & Email Gating
GOAL: Build /api/unlock endpoint, email sending, lead storage, and full roadmap reveal

LOAD SKILLS:
- Backend Engineering (API patterns, error handling, async operations)
- API Designer (endpoint design, validation, response format)
- Auth Specialist (secure form handling, consent capture)
- Security Hardening (email validation, CSRF protection, rate limiting)
- TypeScript Strict Mode (Zod validation, type safety)
- Supabase Backend (lead storage, FK relationships, RLS)
- Frontend Engineering (form state, validation, animations)
- Tailwind CSS UI (overlay design, transitions, responsive)
- Copywriting (email template, CTA copy, trust language)
- Test Architect (end-to-end testing, flow verification)

TASKS:
1. Build POST /api/unlock endpoint:
   - Accept: diagnosis_id, name, email, company, consent_to_contact
   - Validate email format with Zod
   - Store lead in leads table with FK to diagnosis
   - Mark diagnosis.email_unlocked = true
   - Return full_roadmap from stored diagnosis
   - Handle duplicate email submissions gracefully

2. Implement email sending service (Resend):
   - Create branded HTML email template
   - Include: executive summary, classification, score table, phases, data needed, tools, risks, next step
   - QSol branding: dark theme, professional tone
   - Update email_sent flag on success
   - Handle email failures gracefully

3. Build email capture overlay UI:
   - Card positioned over faded roadmap
   - Heading: 'Unlock your full project map'
   - Fields: name (required), email (required), company (optional)
   - Consent checkbox: 'I agree to be contacted about my project map'
   - CTA: 'Unlock My Project Map'
   - Smooth reveal animation on success
   - Form validation with inline errors

4. End-to-end testing:
   - Full flow: submit problem → result → email → unlock → receive email
   - Verify data stored correctly
   - No PII leaks
   - Consent properly recorded
   - No duplicate leads

CONSTRAINTS:
- Consent checkbox must be checked before submit
- Email must be valid format
- No spam language in email template
- Graceful error handling for email failures
- Rate limit unlock endpoint (5/min per IP)
"
```

---

## Sprint 4: Telegram & Deployment

### Mission Prompt

```
spark-mission run "
PROJECT: QSol Data Project Finder - Sprint 4: Telegram & Deployment
GOAL: Add Telegram notifications, privacy copy, final testing, production deployment

LOAD SKILLS:
- Backend Engineering (Telegram Bot API, webhook handling)
- API Designer (notification service, error handling)
- Security Hardening (rate limiting, OWASP compliance, secrets management)
- Security (vulnerability audit, key protection, RLS verification)
- DevOps Engineering (environment variables, monitoring, rollback)
- Vercel Deployment (production config, edge functions, env vars)
- CI/CD Pipeline (automated testing, deployment gates)
- QA Engineering (load testing, mobile testing, regression)
- Testing Automation (Playwright E2E, concurrent user testing)
- Documentation Engineer (launch docs, troubleshooting guide)
- Copywriting (privacy copy, trust language, GDPR compliance)
- Code Reviewer (final audit, security review, best practices)

TASKS:
1. Implement Telegram notification service:
   - Configure bot token securely (env var)
   - On /api/unlock success, send message to David
   - Message format:
     🧭 New QSol Project Finder Lead
     Name: {name}
     Company: {company}
     Email: {email}
     Classification: {classification}
     Project Fit: {project_fit}
     Confidence: {confidence}
     Problem: {truncated_problem}
     Likely first project: {likely_first_project}
     Suggested follow-up: {action}
   - Update telegram_notified flag
   - Handle send failures without blocking unlock

2. Add privacy and trust copy:
   - Near input: 'Do not include passwords, sensitive customer data, or confidential files. A short description is enough.'
   - Near email: 'We'll use your email to send your project map and follow up about your enquiry. No spam.'
   - GDPR-appropriate consent language

3. Security audit and rate limiting:
   - Rate limit /api/diagnose: 10/min per IP
   - Rate limit /api/unlock: 5/min per IP
   - Verify no service_role key in client bundle
   - Verify RLS policies active
   - Sanitize all user input
   - Add CSRF protection

4. Final integration testing:
   - Full E2E: homepage → diagnostic → classification → email → unlock → email received → Telegram received
   - Mobile responsive testing
   - Load test: 50 concurrent users
   - Error console clean
   - All notifications sent correctly

5. Deploy to production:
   - Configure Vercel environment variables:
     - OPENAI_API_KEY
     - SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
     - TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
     - RESEND_API_KEY
   - Verify DNS and SSL
   - Set up error monitoring (Sentry or similar)
   - Create rollback plan
   - Document deployment process

6. Create launch documentation:
   - How to view leads in Supabase dashboard
   - Telegram notification troubleshooting
   - How to update playbook content
   - How to adjust LLM prompt
   - Success metrics to track
   - Common issues and fixes

CONSTRAINTS:
- Never commit secrets to git
- Use environment variables for all keys
- Test rollback before launch
- Monitor error rates post-launch
- Rate limiting must not block legitimate users
"
```

---

## Quick Reference: Essential Skills by Category

### Database & Backend
| Skill | Use For |
|-------|---------|
| Supabase Backend | RLS, client setup, storage, realtime |
| PostgreSQL Wizard | Schema, indexes, JSONB, optimization |
| Database Architect | Normalization, migrations, modeling |
| Backend Engineering | API architecture, performance |
| API Designer | REST patterns, validation, rate limiting |

### LLM & AI
| Skill | Use For |
|-------|---------|
| LLM Architect | Structured output, RAG, prompting |
| Prompt Engineer | System prompts, few-shot, evaluation |
| RAG Engineer | Retrieval, embeddings, context |

### Frontend & UI
| Skill | Use For |
|-------|---------|
| Frontend Engineering | Components, state, architecture |
| Tailwind CSS UI | Styling, responsive, dark mode |
| UI Design | Visual interface, accessibility |
| UX Design | User flows, information architecture |

### Security & Quality
| Skill | Use For |
|-------|---------|
| Security Hardening | OWASP, injection, encryption |
| Security | Auth, vulnerabilities, audit |
| TypeScript Strict Mode | Types, validation, Zod |
| Test Architect | Testing strategy, coverage |
| Code Reviewer | Quality, patterns, best practices |

### DevOps & Deployment
| Skill | Use For |
|-------|---------|
| DevOps Engineering | Infrastructure, monitoring |
| Vercel Deployment | Production, edge, env vars |
| CI/CD Pipeline | Automation, deployment gates |

### Documentation
| Skill | Use For |
|-------|---------|
| Documentation Engineer | API docs, README |
| Copywriting | UI copy, emails, CTAs |

---

## Skill Loading Commands

Load essentials pack first:
```bash
spawner_skills action="pack" pack="essentials"
```

Load specific skills for a sprint:
```bash
# Sprint 1
spawner_skills action="get" name="supabase-backend"
spawner_skills action="get" name="postgres-wizard"
spawner_skills action="get" name="tailwind-ui"

# Sprint 2
spawner_skills action="get" name="llm-architect"
spawner_skills action="get" name="prompt-engineer"
spawner_skills action="get" name="api-designer"

# Sprint 3
spawner_skills action="get" name="auth-specialist"
spawner_skills action="get" name="security-hardening"

# Sprint 4
spawner_skills action="get" name="devops"
spawner_skills action="get" name="vercel-deployment"
```

---

## Critical Gotchas for All Sprints

| Priority | Issue | Solution |
|----------|-------|----------|
| **CRITICAL** | Exposing service_role key | Only use anon key on client, service_role on server only |
| **HIGH** | Missing RLS policies | Enable RLS and add policies for ALL tables |
| **HIGH** | No rate limiting | Add rate limits to all public endpoints |
| **MEDIUM** | Using 'any' type | Use proper types or 'unknown' with type guards |
| **MEDIUM** | No input validation | Validate with Zod at API boundaries |
| **MEDIUM** | Secrets in code | Use environment variables |
