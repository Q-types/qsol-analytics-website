// POST /api/unlock - Capture lead and unlock full roadmap
import type { APIRoute } from 'astro';
import { UnlockRequestSchema } from '../../lib/validation';
import { getServiceClient } from '../../lib/supabase';
import { sendRoadmapEmail } from '../../lib/email';
import { sendLeadNotification } from '../../lib/telegram';
import type { UnlockResponse, Diagnosis } from '../../lib/types';
import { checkUnlockIpRateLimit, checkEmailRateLimit, getEmailHash } from '../../lib/ratelimit';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // IP-based rate limiting: 10 unlock requests per hour
  const ip = clientAddress || 'unknown';
  const ipRateLimit = checkUnlockIpRateLimit(ip);

  if (!ipRateLimit.allowed) {
    const resetInMinutes = Math.ceil((ipRateLimit.resetAt - Date.now()) / 60000);
    return new Response(
      JSON.stringify({
        status: 'error',
        error: `You've requested several project maps recently. Please try again in ${resetInMinutes} minutes, or reach out to David directly.`
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

    // Generate email hash for privacy-preserving rate limiting
    const emailHash = await getEmailHash(email);

    // Check if already unlocked with this email (check both email and hash for backwards compat)
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('diagnosis_id', diagnosis_id)
      .or(`email.eq.${email.toLowerCase()},email_hash.eq.${emailHash}`)
      .single();

    if (existingLead) {
      // Already unlocked - just return the roadmap with methodology
      const response: UnlockResponse = {
        status: 'success',
        full_roadmap: typedDiagnosis.full_roadmap,
        methodology: typedDiagnosis.methodology,
        instant_result: typedDiagnosis.instant_result,
        business_impact: typedDiagnosis.business_impact
      };
      return new Response(
        JSON.stringify(response),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email-based rate limiting: 5 per day, 15 per month (generous to start)
    const emailRateLimit = await checkEmailRateLimit(email);
    if (!emailRateLimit.allowed) {
      return new Response(
        JSON.stringify({
          status: 'error',
          error: emailRateLimit.reason,
          dailyRemaining: emailRateLimit.dailyRemaining,
          monthlyRemaining: emailRateLimit.monthlyRemaining
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
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
    // Store email_hash for rate limiting, keep email for contact purposes
    const { error: insertError } = await supabase
      .from('leads')
      .insert({
        diagnosis_id,
        name,
        email: email.toLowerCase(),
        email_hash: emailHash,
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

    // Send email and telegram in parallel, but AWAIT them
    // (Vercel kills serverless functions after response, so fire-and-forget doesn't work)
    const [emailResult, telegramResult] = await Promise.all([
      sendRoadmapEmail({
        to: email,
        name,
        classification: typedDiagnosis.classification,
        scores: typedDiagnosis.scores,
        roadmap: typedDiagnosis.full_roadmap,
        methodology: typedDiagnosis.methodology,
        instantResult: typedDiagnosis.instant_result,
        businessImpact: typedDiagnosis.business_impact,
        problemSummary: typedDiagnosis.problem_description.substring(0, 200)
      }).catch((err) => {
        console.error('Email send exception:', err);
        return { success: false, error: String(err) };
      }),
      sendLeadNotification({
        name,
        email,
        company: company || null,
        classification: typedDiagnosis.classification,
        scores: typedDiagnosis.scores,
        confidence: typedDiagnosis.confidence,
        problemDescription: typedDiagnosis.problem_description,
        likelyFirstProject: typedDiagnosis.instant_result.likely_first_project
      }).catch((err) => {
        console.error('Telegram send exception:', err);
        return { success: false };
      })
    ]);

    // Update lead record with send statuses
    console.log('Email send result:', emailResult);
    console.log('Telegram send result:', telegramResult);

    if (emailResult.success || telegramResult.success) {
      await supabase
        .from('leads')
        .update({
          email_sent: emailResult.success,
          telegram_notified: telegramResult.success
        })
        .eq('diagnosis_id', diagnosis_id)
        .eq('email', email.toLowerCase());
    }

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
    }

    // Return success with full roadmap and methodology
    const response: UnlockResponse = {
      status: 'success',
      full_roadmap: typedDiagnosis.full_roadmap,
      methodology: typedDiagnosis.methodology,
      instant_result: typedDiagnosis.instant_result,
      business_impact: typedDiagnosis.business_impact
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
