// Email service using Resend for QSol Data Project Finder
import type { FullRoadmap, Classification, DiagnosisScores } from './types';
import { CLASSIFICATION_LABELS } from './types';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_EMAIL = 'QSol Analytics <noreply@qsol-analytics.com>';

interface SendRoadmapEmailParams {
  to: string;
  name: string;
  classification: Classification;
  scores: DiagnosisScores;
  roadmap: FullRoadmap;
  problemSummary: string;
}

function generateEmailHtml(params: SendRoadmapEmailParams): string {
  const { name, classification, scores, roadmap } = params;
  const classificationLabel = CLASSIFICATION_LABELS[classification];

  const phasesHtml = roadmap.implementation_phases
    .map((phase, i) => `
      <div style="margin-bottom: 20px; padding-left: 16px; border-left: 3px solid #22c55e;">
        <h4 style="color: #ffffff; margin: 0 0 8px 0;">Phase ${i + 1}: ${phase.phase}</h4>
        <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 14px;">${phase.goal}</p>
        <p style="color: #d1d5db; margin: 0; font-size: 14px;"><strong>Activities:</strong> ${phase.activities.join(', ')}</p>
        <p style="color: #d1d5db; margin: 4px 0 0 0; font-size: 14px;"><strong>Deliverables:</strong> ${phase.deliverables.join(', ')}</p>
      </div>
    `)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your QSol Project Map</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #22c55e; margin: 0; font-size: 24px;">QSol Analytics</h1>
      <p style="color: #9ca3af; margin: 8px 0 0 0;">Your Project Map</p>
    </div>

    <!-- Greeting -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <p style="color: #ffffff; margin: 0 0 16px 0;">Hi ${name},</p>
      <p style="color: #d1d5db; margin: 0; line-height: 1.6;">
        Thanks for using the QSol Project Finder. Based on your description, here's your personalised project map.
      </p>
    </div>

    <!-- Classification -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <p style="color: #22c55e; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Classification</p>
          <h2 style="color: #ffffff; margin: 4px 0 0 0; font-size: 20px;">${classificationLabel}</h2>
        </div>
        <div style="text-align: right;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">Project Fit</p>
          <p style="color: #22c55e; margin: 4px 0 0 0; font-size: 24px; font-weight: bold;">${scores.project_fit_label}</p>
        </div>
      </div>
      <p style="color: #9ca3af; margin: 0; font-size: 14px;">Overall Score: ${scores.overall}/100</p>
    </div>

    <!-- Executive Summary -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: #9ca3af; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Executive Summary</h3>
      <p style="color: #d1d5db; margin: 0; line-height: 1.6;">${roadmap.executive_summary}</p>
    </div>

    <!-- Implementation Phases -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: #9ca3af; margin: 0 0 20px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Implementation Phases</h3>
      ${phasesHtml}
    </div>

    <!-- Data Needed -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: #9ca3af; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Data Needed</h3>
      <ul style="color: #d1d5db; margin: 0; padding-left: 20px; line-height: 1.8;">
        ${roadmap.data_needed.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>

    <!-- Recommended Tools -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: #9ca3af; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Recommended Tools</h3>
      <ul style="color: #d1d5db; margin: 0; padding-left: 20px; line-height: 1.8;">
        ${roadmap.recommended_tools.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>

    <!-- Risks -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: #9ca3af; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Risks & Assumptions</h3>
      <ul style="color: #d1d5db; margin: 0; padding-left: 20px; line-height: 1.8;">
        ${roadmap.risks_and_assumptions.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>

    <!-- First Step -->
    <div style="background-color: #14532d; border: 1px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: #22c55e; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Suggested First Step</h3>
      <p style="color: #ffffff; margin: 0; font-weight: 500;">${roadmap.first_step}</p>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 32px;">
      <p style="color: #d1d5db; margin: 0 0 16px 0;">Ready to discuss your project?</p>
      <a href="https://cal.com/q-types/30-minute-discovery-call" style="display: inline-block; background-color: #22c55e; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600;">Book a Discovery Call</a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #334155;">
      <p style="color: #6b7280; margin: 0; font-size: 12px;">
        QSol Analytics | Big-company data tools for small-business teams
      </p>
      <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 12px;">
        <a href="https://qsol-analytics.com" style="color: #22c55e; text-decoration: none;">qsol-analytics.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export async function sendRoadmapEmail(params: SendRoadmapEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: true }; // Don't fail if email not configured
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: params.to,
        subject: `Your QSol Project Map: ${CLASSIFICATION_LABELS[params.classification]}`,
        html: generateEmailHtml(params)
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
