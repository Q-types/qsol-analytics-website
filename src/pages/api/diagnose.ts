// POST /api/diagnose - Classify business problem and generate roadmap
import type { APIRoute } from 'astro';
import { DiagnoseRequestSchema } from '../../lib/validation';
import { classifyProblem } from '../../lib/classifier';
import { getServiceClient } from '../../lib/supabase';
import type { DiagnoseResponse } from '../../lib/types';
import { CLASSIFICATION_LABELS } from '../../lib/types';

export const prerender = false;

// Simple rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
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
      JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
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

    return new Response(
      JSON.stringify({ error: 'Unable to analyse your problem. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
