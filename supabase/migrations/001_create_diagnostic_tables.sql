-- QSol Data Project Finder Schema
-- Migration: 001_create_diagnostic_tables
-- Created: 2026-05-09

-- ============================================
-- Table: diagnoses
-- Stores problem classifications and roadmaps
-- ============================================
CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User input
  problem_description TEXT NOT NULL,

  -- Classification
  classification TEXT NOT NULL CHECK (classification IN (
    'reporting_automation',
    'spreadsheet_to_system',
    'forecasting_early_warning',
    'customer_intelligence',
    'ai_knowledge_assistant',
    'workflow_automation',
    'data_readiness',
    'not_enough_information'
  )),
  secondary_classifications JSONB DEFAULT '[]'::jsonb,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),

  -- Scoring (JSONB for flexibility)
  scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Example: {
  --   "value_potential": 4,
  --   "feasibility": 3,
  --   "urgency": 4,
  --   "data_readiness": 3,
  --   "repeatability": 5,
  --   "complexity_penalty": 2,
  --   "overall": 78
  -- }

  -- Generated content
  instant_result JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Example: {
  --   "headline": "Spreadsheet-to-System",
  --   "summary": "Your spreadsheet is acting as...",
  --   "likely_first_project": "A controlled estimating tool...",
  --   "what_not_to_do_first": "Don't start with ML..."
  -- }

  full_roadmap JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Example: {
  --   "executive_summary": "...",
  --   "implementation_phases": [...],
  --   "data_needed": [...],
  --   "recommended_tools": [...],
  --   "risks": [...],
  --   "next_step": "..."
  -- }

  -- Tracking
  source TEXT NOT NULL DEFAULT 'homepage',
  utm_data JSONB DEFAULT NULL,
  email_unlocked BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable RLS immediately (critical security)
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (public diagnostic tool)
CREATE POLICY "Anyone can create diagnosis"
  ON diagnoses FOR INSERT
  WITH CHECK (true);

-- Policy: Allow reading own diagnosis by ID (for unlocking)
-- Note: We use a simple select policy since diagnoses are looked up by ID
CREATE POLICY "Anyone can read diagnosis by ID"
  ON diagnoses FOR SELECT
  USING (true);

-- Policy: Allow updating email_unlocked flag
CREATE POLICY "Anyone can unlock diagnosis"
  ON diagnoses FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_diagnoses_created_at ON diagnoses(created_at DESC);
CREATE INDEX idx_diagnoses_classification ON diagnoses(classification);
CREATE INDEX idx_diagnoses_email_unlocked ON diagnoses(email_unlocked);


-- ============================================
-- Table: leads
-- Stores captured lead information
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id UUID NOT NULL REFERENCES diagnoses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,

  -- Consent and tracking
  consent_to_contact BOOLEAN NOT NULL DEFAULT FALSE,
  lead_score INTEGER DEFAULT NULL,

  -- Notification status
  telegram_notified BOOLEAN NOT NULL DEFAULT FALSE,
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,

  -- Prevent duplicate leads for same diagnosis
  CONSTRAINT unique_diagnosis_email UNIQUE (diagnosis_id, email)
);

-- Enable RLS immediately
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (public lead capture)
CREATE POLICY "Anyone can create lead"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Policy: No public read (leads are private)
-- Only service role can read leads for admin/notification purposes

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_diagnosis_id ON leads(diagnosis_id);
CREATE INDEX idx_leads_telegram_notified ON leads(telegram_notified) WHERE NOT telegram_notified;
CREATE INDEX idx_leads_email_sent ON leads(email_sent) WHERE NOT email_sent;


-- ============================================
-- Function: Get diagnosis with lead status
-- Used by frontend to check if already unlocked
-- ============================================
CREATE OR REPLACE FUNCTION get_diagnosis_status(p_diagnosis_id UUID)
RETURNS TABLE (
  id UUID,
  classification TEXT,
  confidence TEXT,
  project_fit_label TEXT,
  email_unlocked BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY INVOKER  -- Respects RLS
STABLE
AS $$
  SELECT
    d.id,
    d.classification,
    d.confidence,
    d.scores->>'project_fit_label' as project_fit_label,
    d.email_unlocked,
    d.created_at
  FROM diagnoses d
  WHERE d.id = p_diagnosis_id;
$$;


-- ============================================
-- Comments for documentation
-- ============================================
COMMENT ON TABLE diagnoses IS 'Stores problem classifications and generated roadmaps for the Data Project Finder tool';
COMMENT ON TABLE leads IS 'Stores captured lead information from email-gated roadmap unlocks';
COMMENT ON COLUMN diagnoses.scores IS 'JSONB containing scoring metrics: value_potential, feasibility, urgency, data_readiness, repeatability, complexity_penalty, overall';
COMMENT ON COLUMN diagnoses.instant_result IS 'JSONB containing the free instant classification result shown to users';
COMMENT ON COLUMN diagnoses.full_roadmap IS 'JSONB containing the email-gated full implementation roadmap';
COMMENT ON COLUMN leads.consent_to_contact IS 'GDPR consent for follow-up contact about the project';
