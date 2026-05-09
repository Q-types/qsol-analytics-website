# QSol Data Project Finder - Production TODO

## Pre-Deployment Checklist

### Environment Setup
- [ ] Add `SUPABASE_URL` to Vercel environment variables
- [ ] Add `SUPABASE_ANON_KEY` to Vercel environment variables
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables
- [ ] Add `OPENAI_API_KEY` to Vercel environment variables
- [ ] Add `RESEND_API_KEY` to Vercel environment variables (optional)
- [ ] Add `TELEGRAM_BOT_TOKEN` to Vercel environment variables (optional)
- [ ] Add `TELEGRAM_CHAT_ID` to Vercel environment variables (optional)

### Supabase Setup
- [ ] Run migration: `supabase/migrations/001_create_diagnostic_tables.sql`
- [ ] Run migration: `supabase/migrations/002_add_privacy_acceptance.sql`
- [ ] Verify RLS is enabled on `diagnoses` table
- [ ] Verify RLS is enabled on `leads` table
- [ ] Test insert policy works for anonymous users
- [ ] Verify service role can read leads table

### Email Setup (Resend)
- [ ] Create Resend account at resend.com
- [ ] Add domain to Resend
- [ ] Verify domain DNS records
- [ ] Create API key
- [ ] Update `FROM_EMAIL` in `src/lib/email.ts` if using different domain

### Telegram Setup
- [ ] Message @BotFather on Telegram
- [ ] Create new bot with `/newbot`
- [ ] Copy bot token
- [ ] Add bot to notification group/channel
- [ ] Send test message to bot
- [ ] Get chat ID from `https://api.telegram.org/bot<TOKEN>/getUpdates`
- [ ] Test notification with curl:
  ```bash
  curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
    -H "Content-Type: application/json" \
    -d '{"chat_id": "<CHAT_ID>", "text": "Test notification"}'
  ```

### Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Verify build succeeds
- [ ] Deploy to production
- [ ] Test `/api/diagnose` endpoint
- [ ] Test `/api/unlock` endpoint
- [ ] Verify email delivery (if configured)
- [ ] Verify Telegram notification (if configured)

---

## Post-Launch Monitoring

### Week 1
- [ ] Check Vercel function logs for errors
- [ ] Review rate limiting effectiveness
- [ ] Monitor OpenAI API usage/costs
- [ ] Check email delivery rates in Resend dashboard
- [ ] Review first leads in Supabase

### Ongoing
- [ ] Weekly: Review conversion funnel SQL queries
- [ ] Weekly: Check for high-fit leads requiring follow-up
- [ ] Monthly: Review classification accuracy
- [ ] Monthly: Analyze lead quality by source

---

## SQL Queries for Monitoring

### Daily Funnel (run in Supabase SQL editor)
```sql
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

### High-Fit Leads
```sql
SELECT l.*, d.classification, d.scores->>'project_fit_label' as fit
FROM leads l
JOIN diagnoses d ON l.diagnosis_id = d.id
WHERE d.scores->>'project_fit_label' = 'High'
ORDER BY l.created_at DESC;
```

### Classification Distribution
```sql
SELECT d.classification, COUNT(*) as count
FROM leads l
JOIN diagnoses d ON l.diagnosis_id = d.id
GROUP BY d.classification
ORDER BY count DESC;
```

### Failed Notifications
```sql
-- Leads without Telegram notification
SELECT * FROM leads WHERE NOT telegram_notified ORDER BY created_at DESC;

-- Leads without email sent
SELECT * FROM leads WHERE NOT email_sent ORDER BY created_at DESC;
```

---

## Future Enhancements

### Phase 2 (After Launch)
- [ ] Add admin dashboard for lead management
- [ ] Implement webhook retry queue for failed notifications
- [ ] Add A/B testing for classification prompts
- [ ] Create Zapier/webhook integration for CRM

### Phase 3 (Scale)
- [ ] Move rate limiting to Upstash Redis
- [ ] Add generated column for frequent JSONB queries
- [ ] Implement lead scoring model refinement
- [ ] Add multi-language support

---

## Emergency Contacts

### Rollback Procedure
1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Service Status Pages
- Vercel: https://www.vercel-status.com/
- Supabase: https://status.supabase.com/
- OpenAI: https://status.openai.com/
- Resend: https://resend-status.com/

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Section view rate | 60%+ | Scroll depth tracking |
| Text box interaction | 10-25% | Focus event analytics |
| Analysis submission | 5-15% | `/api/diagnose` calls |
| Email unlock rate | 20-50% | `/api/unlock` calls |
| Qualified lead rate | 10-30% | High/Medium fit leads |

---

*Last updated: 2026-05-09*
