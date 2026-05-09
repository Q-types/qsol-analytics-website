# QSol Data Project Finder - Launch Documentation

## Overview

The Data Project Finder is an LLM-powered diagnostic tool that classifies business problems and generates implementation roadmaps. It captures qualified leads through email-gated content.

---

## Environment Variables

Configure these in Vercel dashboard or `.env` file:

```bash
# Required - Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Required - OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Optional - Email (Resend)
RESEND_API_KEY=re_your-resend-key

# Optional - Notifications (Telegram)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

---

## Supabase Setup

### 1. Create Tables

Run both migrations in order:

```bash
# Migration 1: Core tables
psql -f supabase/migrations/001_create_diagnostic_tables.sql

# Migration 2: Privacy acceptance columns (GDPR compliance)
psql -f supabase/migrations/002_add_privacy_acceptance.sql
```

Or in Supabase SQL Editor, run each migration file in sequence.

### 2. Verify RLS

Ensure Row Level Security is enabled:
- `diagnoses` table: insert allowed, select/update restricted
- `leads` table: insert allowed, select/update restricted

---

## Telegram Bot Setup

### 1. Create Bot

1. Message @BotFather on Telegram
2. Send `/newbot` and follow prompts
3. Copy the bot token

### 2. Get Chat ID

1. Add the bot to a group or start a DM
2. Send a message to the bot
3. Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Find `chat.id` in the response

### 3. Test

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<CHAT_ID>", "text": "Test message"}'
```

---

## Resend Email Setup

1. Create account at resend.com
2. Add and verify your domain
3. Create API key
4. Update `FROM_EMAIL` in `src/lib/email.ts` with your verified domain

---

## Viewing Leads

### Supabase Dashboard

1. Go to your Supabase project
2. Navigate to Table Editor
3. Select `leads` table

### Query Examples

```sql
-- Recent leads
SELECT l.*, d.classification, d.scores
FROM leads l
JOIN diagnoses d ON l.diagnosis_id = d.id
ORDER BY l.created_at DESC
LIMIT 20;

-- High-fit leads
SELECT l.*, d.classification, d.scores->>'project_fit_label' as fit
FROM leads l
JOIN diagnoses d ON l.diagnosis_id = d.id
WHERE d.scores->>'project_fit_label' = 'High'
ORDER BY l.created_at DESC;

-- Leads by classification
SELECT d.classification, COUNT(*) as count
FROM leads l
JOIN diagnoses d ON l.diagnosis_id = d.id
GROUP BY d.classification
ORDER BY count DESC;
```

---

## Updating Content

### LLM Prompt

Edit `src/lib/classifier.ts`:
- `CLASSIFICATION_GUIDE` - Category definitions and signals
- `SCORING_GUIDE` - Scoring rubric (1-5 scale)
- `SYSTEM_PROMPT` - Main classification prompt

### Method Playbooks

Edit files in `qsol_method_playbook/`:
- `reporting_automation.md`
- `spreadsheet_to_system.md`
- `forecasting_early_warning.md`
- `customer_intelligence.md`
- `ai_knowledge_assistant.md`
- `workflow_automation.md`
- `data_readiness.md`

### Email Template

Edit `src/lib/email.ts`:
- `generateEmailHtml()` - HTML email template
- `FROM_EMAIL` - Sender address

### Telegram Message

Edit `src/lib/telegram.ts`:
- `sendLeadNotification()` - Message format
- `getSuggestedFollowUp()` - Follow-up suggestions by classification

---

## Troubleshooting

### Diagnosis Not Working

1. Check OpenAI API key is valid
2. Check Supabase connection
3. Check browser console for errors
4. Check Vercel function logs

### Email Not Sending

1. Verify Resend API key
2. Check domain is verified in Resend
3. Check `FROM_EMAIL` matches verified domain
4. Check Vercel function logs

### Telegram Not Notifying

1. Verify bot token is correct
2. Verify chat ID is correct
3. Test with curl command above
4. Check Vercel function logs

### Rate Limiting Issues

Current limits:
- `/api/diagnose`: 10 requests/min per IP
- `/api/unlock`: 5 requests/min per IP

Adjust in respective API files if needed.

---

## Success Metrics

Track these in your analytics:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Section view rate | 60%+ | Scroll depth tracking |
| Text box interaction | 10-25% | Focus event tracking |
| Analysis submission | 5-15% | `/api/diagnose` calls |
| Email unlock rate | 20-50% | `/api/unlock` calls |
| Qualified lead rate | 10-30% | High/Medium fit leads |

### SQL for Conversion Funnel

```sql
-- Daily funnel
SELECT
  DATE(created_at) as date,
  COUNT(*) as diagnoses,
  SUM(CASE WHEN email_unlocked THEN 1 ELSE 0 END) as unlocked,
  ROUND(100.0 * SUM(CASE WHEN email_unlocked THEN 1 ELSE 0 END) / COUNT(*), 1) as unlock_rate
FROM diagnoses
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## Security Checklist

- [x] Service role key only used server-side
- [x] Anon key used for client (if any client calls needed)
- [x] RLS enabled on all tables
- [x] Input validation with Zod
- [x] Rate limiting on all endpoints
- [x] No secrets in client bundle
- [x] HTTPS enforced (Vercel default)
- [x] Content Security Policy headers configured
- [x] Strict Transport Security enabled
- [x] X-Frame-Options DENY

---

## GDPR / Privacy Compliance

### Privacy Policy
Located at `/privacy/` - covers:
- UK GDPR (Data Protection Act 2018)
- EU GDPR
- Automated decision-making disclosure (LLM classification)
- International data transfer safeguards
- Third-party service disclosures

### Consent Tracking
The unlock form requires:
1. **Privacy Policy acceptance** - Checkbox with link to `/privacy/`
2. **Contact consent** - Explicit consent for follow-up contact

Both are stored in the `leads` table:
- `privacy_accepted` - Boolean flag
- `privacy_accepted_at` - Timestamp for audit trail
- `consent_to_contact` - Boolean flag

### Data Subject Rights
To handle Subject Access Requests (SARs):

```sql
-- Find all data for a specific email
SELECT
  l.id as lead_id,
  l.name,
  l.email,
  l.company,
  l.created_at as lead_created,
  l.privacy_accepted,
  l.privacy_accepted_at,
  l.consent_to_contact,
  d.problem_description,
  d.classification,
  d.scores,
  d.instant_result,
  d.full_roadmap,
  d.created_at as diagnosis_created
FROM leads l
JOIN diagnoses d ON l.diagnosis_id = d.id
WHERE l.email = 'user@example.com';
```

### Data Deletion (Right to Erasure)
```sql
-- Delete lead and associated diagnosis
DELETE FROM leads WHERE email = 'user@example.com';
-- Note: diagnoses are CASCADE deleted if no other leads reference them
```

---

## Deployment

### Vercel

1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Manual

```bash
npm run build
# Upload .vercel/output to Vercel
```

### Rollback

In Vercel dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

---

## Contact

For issues with this implementation, contact QSol Analytics.
