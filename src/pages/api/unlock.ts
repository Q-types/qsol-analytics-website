// POST /api/unlock - Capture lead and unlock full roadmap
import type { APIRoute } from 'astro';
import { UnlockRequestSchema } from '../../lib/validation';
import { getServiceClient } from '../../lib/supabase';
import { sendRoadmapEmail } from '../../lib/email';
import { sendLeadNotification } from '../../lib/telegram';
import type { UnlockResponse, Diagnosis } from '../../lib/types';

export const prerender = false;

// Rate limiting for unlock endpoint (stricter than diagnose)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limiting
  const ip = clientAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ status: 'error', error: 'Too many requests. Please wait a moment and try again.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse and validate request body
    const body = await request.json();
    const parseResult = UnlockRequestSchema.safeParse(body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map(e => e.message).join(', ');
      return new Response(
        JSON.stringify({ status: 'error', error: errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { diagnosis_id, name, email, company, privacy_accepted, consent_to_contact } = parseResult.data;

    const supabase = getServiceClient();

    // Fetch the diagnosis
    const { data: diagnosis, error: fetchError } = await supabase
      .from('diagnoses')
      .select('*')
      .eq('id', diagnosis_id)
      .single();

    if (fetchError || !diagnosis) {
      return new Response(
        JSON.stringify({ status: 'error', error: 'Diagnosis not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const typedDiagnosis = diagnosis as Diagnosis;

    // Check if already unlocked with this email
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('diagnosis_id', diagnosis_id)
      .eq('email', email.toLowerCase())
      .single();

    if (existingLead) {
      // Already unlocked - just return the roadmap
      const response: UnlockResponse = {
        status: 'success',
        full_roadmap: typedDiagnosis.full_roadmap
      };
      return new Response(
        JSON.stringify(response),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calculate lead score based on diagnosis scores
    const leadScore = Math.round(
      (typedDiagnosis.scores.value_potential * 20) +
      (typedDiagnosis.scores.feasibility * 15) +
      (typedDiagnosis.scores.urgency * 15) +
      (company ? 10 : 0) // Bonus for providing company
    );

    // Insert lead with privacy acceptance timestamp (GDPR compliance)
    const { error: insertError } = await supabase
      .from('leads')
      .insert({
        diagnosis_id,
        name,
        email: email.toLowerCase(),
        company: company || null,
        privacy_accepted,
        privacy_accepted_at: new Date().toISOString(),
        consent_to_contact,
        lead_score: leadScore,
        telegram_notified: false,
        email_sent: false
      });

    if (insertError) {
      console.error('Lead insert error:', insertError);
      return new Response(
        JSON.stringify({ status: 'error', error: 'Unable to save your details. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mark diagnosis as unlocked
    await supabase
      .from('diagnoses')
      .update({ email_unlocked: true })
      .eq('id', diagnosis_id);

    // Send email (non-blocking - don't fail if email fails)
    sendRoadmapEmail({
      to: email,
      name,
      classification: typedDiagnosis.classification,
      scores: typedDiagnosis.scores,
      roadmap: typedDiagnosis.full_roadmap,
      problemSummary: typedDiagnosis.problem_description.substring(0, 200)
    }).then(async (result) => {
      if (result.success) {
        await supabase
          .from('leads')
          .update({ email_sent: true })
          .eq('diagnosis_id', diagnosis_id)
          .eq('email', email.toLowerCase());
      }
    }).catch(console.error);

    // Send Telegram notification (non-blocking)
    sendLeadNotification({
      name,
      email,
      company: company || null,
      classification: typedDiagnosis.classification,
      scores: typedDiagnosis.scores,
      confidence: typedDiagnosis.confidence,
      problemDescription: typedDiagnosis.problem_description,
      likelyFirstProject: typedDiagnosis.instant_result.likely_first_project
    }).then(async (result) => {
      if (result.success) {
        await supabase
          .from('leads')
          .update({ telegram_notified: true })
          .eq('diagnosis_id', diagnosis_id)
          .eq('email', email.toLowerCase());
      }
    }).catch(console.error);

    // Return success with full roadmap
    const response: UnlockResponse = {
      status: 'success',
      full_roadmap: typedDiagnosis.full_roadmap
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unlock error:', error);

    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ status: 'error', error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ status: 'error', error: 'Unable to unlock your roadmap. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
