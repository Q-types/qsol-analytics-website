# QSol Data Project Finder - Technical Recommendations

Based on Spawner skills audit (Security, PostgreSQL, Supabase, LLM Architect, API Designer)

---

## Priority 1: Security Hardening

### Rate Limiting Enhancement
**Current:** In-memory Map (resets on cold start)
**Recommendation:** Upgrade to Upstash Redis for persistent rate limiting

```typescript
// Future implementation with Upstash
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
});
```

**When:** After launch if abuse is detected
**Effort:** Low (drop-in replacement)

### Content Security Policy
**Current:** Default Vercel headers
**Recommendation:** Add strict CSP for production

```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

**When:** Before launch
**Effort:** Low

---

## Priority 2: Database Optimization

### Generated Column for JSONB Queries
**Current:** `scores->>'project_fit_label'` requires JSONB extraction
**Recommendation:** Add generated column for faster filtering

```sql
-- Add when query volume justifies it
ALTER TABLE diagnoses
ADD COLUMN project_fit_label TEXT
GENERATED ALWAYS AS (scores->>'project_fit_label') STORED;

CREATE INDEX idx_diagnoses_fit_label ON diagnoses(project_fit_label);
```

**When:** If table exceeds 10,000 rows or query latency increases
**Effort:** Low

### Soft Delete Pattern
**Current:** Hard deletes (CASCADE on leads)
**Recommendation:** Consider soft delete for audit trail

```sql
-- Future migration
ALTER TABLE diagnoses ADD COLUMN deleted_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE leads ADD COLUMN deleted_at TIMESTAMPTZ DEFAULT NULL;

-- Update RLS to exclude deleted
CREATE POLICY "Exclude deleted diagnoses"
  ON diagnoses FOR SELECT
  USING (deleted_at IS NULL);
```

**When:** If data retention requirements emerge
**Effort:** Medium

---

## Priority 3: LLM Resilience

### Retry Logic for OpenAI
**Current:** Single attempt, throws on failure
**Recommendation:** Add exponential backoff retry

```typescript
async function classifyWithRetry(description: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await classifyProblem(description);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }
}
```

**When:** If OpenAI rate limits or transient failures occur
**Effort:** Low

### Fallback Classification
**Current:** Returns error on LLM failure
**Recommendation:** Add rule-based fallback classifier

```typescript
function fallbackClassify(description: string): Classification {
  const keywords = {
    reporting_automation: ['report', 'dashboard', 'metrics', 'KPI'],
    spreadsheet_to_system: ['excel', 'spreadsheet', 'manual', 'copy paste'],
    // ... other categories
  };

  // Simple keyword matching as backup
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(w => description.toLowerCase().includes(w))) {
      return category as Classification;
    }
  }
  return 'not_enough_information';
}
```

**When:** If LLM reliability is critical for user experience
**Effort:** Medium

---

## Priority 4: Notification Reliability

### Webhook Queue for Failed Notifications
**Current:** Fire-and-forget with tracking flags
**Recommendation:** Implement retry queue with Supabase Edge Functions

```sql
-- Notification queue table
CREATE TABLE notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  type TEXT CHECK (type IN ('email', 'telegram')),
  attempts INTEGER DEFAULT 0,
  next_attempt_at TIMESTAMPTZ DEFAULT NOW(),
  last_error TEXT,
  completed_at TIMESTAMPTZ
);

-- Edge function runs on schedule to process queue
```

**When:** If notification delivery rate drops below 95%
**Effort:** High

### Email Delivery Tracking
**Current:** Boolean `email_sent` flag
**Recommendation:** Track delivery status from Resend webhooks

```typescript
// Webhook endpoint for Resend events
export const POST: APIRoute = async ({ request }) => {
  const event = await request.json();

  if (event.type === 'email.delivered') {
    await supabase
      .from('leads')
      .update({ email_delivered_at: new Date() })
      .eq('email', event.data.to);
  }

  if (event.type === 'email.bounced') {
    // Mark for manual follow-up
  }
};
```

**When:** When email deliverability matters for lead quality
**Effort:** Medium

---

## Priority 5: Analytics & Observability

### Structured Logging
**Current:** `console.error` for errors
**Recommendation:** Add structured logging with context

```typescript
import { Logger } from './logger'; // Or use Pino, Winston

const logger = new Logger({ service: 'qsol-finder' });

// In API handlers
logger.info('diagnosis_created', {
  diagnosis_id,
  classification,
  confidence,
  duration_ms: Date.now() - startTime
});

logger.error('openai_failed', {
  error: error.message,
  problem_length: description.length
});
```

**When:** Before scaling or debugging issues
**Effort:** Low

### Conversion Funnel Events
**Current:** SQL queries for funnel analysis
**Recommendation:** Add client-side analytics events

```typescript
// In DataProjectFinder.astro
analytics.track('finder_section_viewed');
analytics.track('finder_input_focused');
analytics.track('finder_submitted', { problem_length });
analytics.track('finder_result_shown', { classification, fit });
analytics.track('finder_email_entered');
analytics.track('finder_unlocked', { classification, fit });
```

**When:** Before launch for baseline metrics
**Effort:** Low (if analytics already set up)

---

## Priority 6: Testing

### Classification Accuracy Testing
**Current:** 25 test cases in JSON file
**Recommendation:** Automate accuracy testing in CI

```typescript
// tests/classifier.test.ts
describe('classifier accuracy', () => {
  const testCases = require('./classification-test-cases.json');

  for (const tc of testCases) {
    it(`classifies "${tc.input.substring(0, 50)}..." as ${tc.expected}`, async () => {
      const result = await classifyProblem(tc.input);
      expect(result.classification).toBe(tc.expected);
    });
  }
});
```

**When:** Before any prompt changes
**Effort:** Medium (requires test infrastructure)

### Load Testing
**Current:** Rate limits defined but not tested
**Recommendation:** Verify rate limiting under load

```bash
# Using k6
k6 run --vus 20 --duration 30s load-test.js

# load-test.js
export default function() {
  http.post('https://qsol-analytics.com/api/diagnose', {
    problem_description: 'Test problem description for load testing...'
  });
}
```

**When:** Before marketing campaigns
**Effort:** Low

---

## Implementation Priority Matrix

| Recommendation | Impact | Effort | Priority |
|----------------|--------|--------|----------|
| Content Security Policy | High | Low | Do Now |
| Structured Logging | Medium | Low | Do Now |
| Conversion Funnel Events | High | Low | Do Now |
| Retry Logic for OpenAI | Medium | Low | Week 1 |
| Rate Limiting (Upstash) | Medium | Low | If needed |
| Generated JSONB Column | Low | Low | If needed |
| Classification Testing | High | Medium | Week 2 |
| Email Delivery Tracking | Medium | Medium | Month 1 |
| Notification Queue | High | High | Month 2 |
| Fallback Classifier | Medium | Medium | If needed |

---

## Quick Wins (Implement This Week)

1. **Add CSP headers** in vercel.json
2. **Enable Vercel Analytics** in dashboard
3. **Test rate limiting** with curl loop
4. **Verify all env vars** are set correctly
5. **Run migration** and test RLS policies

---

*Generated by Spawner Skills Audit - 2026-05-09*
