// Zod validation schemas for QSol Data Project Finder
import { z } from 'zod';
import { PROBLEM_MIN_LENGTH, PROBLEM_MAX_LENGTH } from './types';

export const DiagnoseRequestSchema = z.object({
  problem_description: z
    .string()
    .min(PROBLEM_MIN_LENGTH, `Problem description must be at least ${PROBLEM_MIN_LENGTH} characters`)
    .max(PROBLEM_MAX_LENGTH, `Problem description must be at most ${PROBLEM_MAX_LENGTH} characters`)
    .transform(s => s.trim()),
  source: z.string().optional().default('homepage'),
  utm_source: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional()
});

export const UnlockRequestSchema = z.object({
  diagnosis_id: z.string().uuid('Invalid diagnosis ID'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(200).optional(),
  privacy_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the Privacy Policy to continue'
  }),
  consent_to_contact: z.boolean().refine(val => val === true, {
    message: 'Consent is required to unlock the roadmap'
  })
});

export type ValidatedDiagnoseRequest = z.infer<typeof DiagnoseRequestSchema>;
export type ValidatedUnlockRequest = z.infer<typeof UnlockRequestSchema>;
