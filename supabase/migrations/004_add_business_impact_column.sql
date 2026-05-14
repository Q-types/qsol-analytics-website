-- Add business_impact column to diagnoses table
-- This stores the grounded business justification for non-technical decision makers

ALTER TABLE diagnoses
ADD COLUMN IF NOT EXISTS business_impact jsonb DEFAULT '{}'::jsonb;

-- Add comment explaining the column
COMMENT ON COLUMN diagnoses.business_impact IS 'Business impact summary with primary_benefit, supporting_points, realistic_timeframe, and why_now - grounded justification for non-technical stakeholders';

-- Create index for querying by primary benefit (for analytics)
CREATE INDEX IF NOT EXISTS idx_diagnoses_business_impact_benefit
ON diagnoses ((business_impact->>'primary_benefit'));
