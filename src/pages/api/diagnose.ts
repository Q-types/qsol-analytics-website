// POST /api/diagnose - Classify business problem and generate roadmap
import type { APIRoute } from 'astro';
import { DiagnoseRequestSchema } from '../../lib/validation';
import { classifyProblem } from '../../lib/classifier';
import { getServiceClient } from '../../lib/supabase';
import type { DiagnoseResponse } from '../../lib/types';
import { CLASSIFICATION_LABELS } from '../../lib/types';
import { checkDiagnosisRateLimit } from '../../lib/ratelimit';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // IP-based rate limiting: 10 diagnosis requests per hour
  const ip = clientAddress || 'unknown';
  const rateLimit = checkDiagnosisRateLimit(ip);

  if (!rateLimit.allowed) {
    const resetInMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
    return new Response(
      JSON.stringify({
        error: `You've been exploring lots of ideas! Please try again in ${resetInMinutes} minutes, or reach out to David directly with your question.`,
        retryAfter: resetInMinutes
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(resetInMinutes * 60)
        }
      }
    );
  }

  try {
    // Parse and validate request body
    const body = await request.json();
    const parseResult = DiagnoseRequestSchema.safeParse(body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map(e => e.message).join(', ');
      return new Response(
        JSON.stringify({ error: errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { problem_description, source, utm_source, utm_campaign } = parseResult.data;

    // Classify the problem using LLM
    const classification = await classifyProblem(problem_description);

    // Store in database
    const supabase = getServiceClient();
    const { data: diagnosis, error: dbError } = await supabase
      .from('diagnoses')
      .insert({
        problem_description,
        classification: classification.classification,
        secondary_classifications: classification.secondary_classifications,
        confidence: classification.confidence,
        scores: classification.scores,
        instant_result: classification.instant_result,
        methodology: classification.methodology,
        full_roadmap: classification.full_roadmap,
        source,
        utm_data: utm_source || utm_campaign ? { utm_source, utm_campaign } : null,
        email_unlocked: false
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Unable to save diagnosis. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build response
    const response: DiagnoseResponse = {
      diagnosis_id: diagnosis.id,
      classification: classification.classification,
      classification_label: CLASSIFICATION_LABELS[classification.classification],
      confidence: classification.confidence,
      scores: classification.scores,
      instant_result: classification.instant_result,
      methodology: classification.methodology,
      roadmap_preview: classification.roadmap_preview,
      follow_up_question: classification.follow_up_question
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Diagnose error:', error);

    // Check if it's a JSON parse error
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return actual error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: `Unable to analyse your problem: ${errorMessage}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
