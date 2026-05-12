-- Add methodology column to diagnoses table
-- This stores the Cambridge DS Course methodology-grounded recommendations

ALTER TABLE diagnoses
ADD COLUMN IF NOT EXISTS methodology jsonb DEFAULT '{}'::jsonb;

-- Add comment explaining the column
COMMENT ON COLUMN diagnoses.methodology IS 'Methodology recommendations grounded in Cambridge DS Course including techniques, algorithms, sharp edges, and data requirements';

-- Create index for querying by recommended approach
CREATE INDEX IF NOT EXISTS idx_diagnoses_methodology_approach
ON diagnoses ((methodology->>'recommended_approach'));
