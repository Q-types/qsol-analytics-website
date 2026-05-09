-- QSol Data Project Finder Schema Update
-- Migration: 002_add_privacy_acceptance
-- Purpose: Add privacy policy acceptance tracking for UK GDPR / EU GDPR compliance
-- Created: 2026-05-09

-- ============================================
-- Add privacy acceptance columns to leads
-- ============================================

-- Privacy policy acceptance (required field)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE;

-- Timestamp of when privacy policy was accepted (for audit trail)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS privacy_accepted_at TIMESTAMPTZ;

-- ============================================
-- Add index for consent auditing
-- ============================================

-- Index for querying consent records (GDPR subject access requests)
CREATE INDEX IF NOT EXISTS idx_leads_privacy_accepted_at
ON leads(privacy_accepted_at DESC)
WHERE privacy_accepted = TRUE;

-- ============================================
-- Add comment for documentation
-- ============================================

COMMENT ON COLUMN leads.privacy_accepted IS 'GDPR: User accepted privacy policy before submitting lead form';
COMMENT ON COLUMN leads.privacy_accepted_at IS 'GDPR: Timestamp when privacy policy was accepted (audit trail)';

-- ============================================
-- Backfill existing records (if any)
-- Existing leads without privacy_accepted assumed to have consented
-- under the previous consent_to_contact field
-- ============================================

UPDATE leads
SET
  privacy_accepted = TRUE,
  privacy_accepted_at = created_at
WHERE privacy_accepted_at IS NULL;
