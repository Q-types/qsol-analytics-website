// Email service using Resend for QSol Data Solution Finder
// Informed by applied data science training and practical SME implementation
import type { FullRoadmap, Classification, DiagnosisScores, MethodologyRecommendation, InstantResult } from './types';
import { CLASSIFICATION_LABELS } from './types';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_EMAIL = 'QSol Analytics <noreply@qsol-analytics.com>';

interface SendRoadmapEmailParams {
  to: string;
  name: string;
  classification: Classification;
  scores: DiagnosisScores;
  roadmap: FullRoadmap;
  methodology: MethodologyRecommendation;
  instantResult: InstantResult;
  problemSummary: string;
}

// Dark theme color system with improved contrast
const COLORS = {
  // Backgrounds - dark theme with card distinction
  pageBg: '#0F172A',      // Slate 900 - darkest
  cardBg: '#1E293B',      // Slate 800 - cards stand out
  subtleBg: '#334155',    // Slate 700 - nested elements

  // Text - high contrast for dark theme
  textPrimary: '#F8FAFC',   // Slate 50 - brightest white
  textBody: '#E2E8F0',      // Slate 200 - body text
  textSecondary: '#CBD5E1', // Slate 300 - secondary
  textMuted: '#94A3B8',     // Slate 400 - muted but readable

  // Brand accent - green
  brandGreen: '#22C55E',    // Green 500

  // Soft green (recommendations) - dark theme version
  softGreenBg: '#14532D',   // Green 900
  softGreenBorder: '#22C55E', // Green 500
  softGreenText: '#86EFAC', // Green 300

  // Amber (warnings) - dark theme version
  amberBg: '#78350F',       // Amber 900
  amberBorder: '#F59E0B',   // Amber 500
  amberText: '#FDE68A',     // Amber 200

  // Traffic light for scores
  scoreHigh: '#22C55E',     // Green 500
  scoreMedium: '#F59E0B',   // Amber 500
  scoreLow: '#EF4444',      // Red 500

  // Borders
  borderLight: '#334155',   // Slate 700
  borderMedium: '#475569',  // Slate 600
};

function getScoreColor(label: string): string {
  if (label === 'High') return COLORS.scoreHigh;
  if (label === 'Medium') return COLORS.scoreMedium;
  return COLORS.scoreLow;
}

// Human-readable technique labels
function formatTechniques(techniques: string[]): string {
  const labelMap: Record<string, string> = {
    'reporting_automation': 'Reporting automation',
    'workflow_automation': 'Workflow automation',
    'data_integration': 'Data integration',
    'classification': 'Classification',
    'regression': 'Regression',
    'clustering': 'Clustering',
    'time_series': 'Time series forecasting',
    'NLP': 'Natural language processing',
    'information_retrieval': 'Information retrieval',
    'survival_analysis': 'Survival analysis',
    'anomaly_detection': 'Anomaly detection',
    'dimensionality_reduction': 'Dimensionality reduction',
    'document_extraction': 'Document extraction',
    'lightweight_classification': 'Lightweight classification',
    'exploratory_data_analysis': 'Exploratory data analysis',
    'process_mapping': 'Process mapping',
    'prioritization_framework': 'Prioritisation framework',
  };

  return techniques
    .map(t => labelMap[t] || t.replace(/_/g, ' '))
    .join(' · ');
}

// Clean phase name - remove duplicate "Phase X" prefix
function cleanPhaseName(phaseName: string): string {
  return phaseName.replace(/^Phase\s*\d+\s*[-–:]\s*/i, '');
}

// Category type helpers for conditional template rendering
function isAutomationProblem(classification: Classification): boolean {
  const automationTypes: Classification[] = [
    'reporting_automation',
    'workflow_automation',
    'spreadsheet_to_system'
  ];
  return automationTypes.includes(classification);
}

function isMLProblem(classification: Classification): boolean {
  const mlTypes: Classification[] = [
    'forecasting_early_warning',
    'customer_intelligence',
    'ai_knowledge_assistant'
  ];
  return mlTypes.includes(classification);
}

function isAssessmentProblem(classification: Classification): boolean {
  return classification === 'data_readiness';
}

function needsClarification(classification: Classification): boolean {
  return classification === 'not_enough_information';
}

// Get appropriate section labels based on classification type
function getMethodologyLabel(classification: Classification): string {
  if (isAutomationProblem(classification)) return 'Automation Approach';
  if (isAssessmentProblem(classification)) return 'Assessment Approach';
  return 'Methodology Recommendations';
}

function getTechnicalApproachLabel(classification: Classification): string {
  if (isAutomationProblem(classification)) return 'Automation tools and patterns';
  if (isAssessmentProblem(classification)) return 'Assessment techniques';
  return 'Recommended technical approach';
}

function getDataSectionLabel(classification: Classification): string {
  if (isAutomationProblem(classification)) return 'Inputs & Sources';
  if (isAssessmentProblem(classification)) return 'Data to Review';
  return 'Data Requirements';
}

function getKeyFeaturesLabel(classification: Classification): string {
  if (isAutomationProblem(classification)) return 'Required inputs';
  if (isAssessmentProblem(classification)) return 'Key areas to assess';
  return 'Key features required';
}

function getPhasesLabel(classification: Classification): string {
  if (isAssessmentProblem(classification)) return 'Assessment Steps';
  return 'Implementation Phases';
}

function generateEmailHtml(params: SendRoadmapEmailParams): string {
  const { name, classification, scores, roadmap, methodology, instantResult } = params;
  const classificationLabel = CLASSIFICATION_LABELS[classification];
  const fitColor = getScoreColor(scores.project_fit_label);

  // Implementation Phases with bullet lists
  const phasesHtml = roadmap.implementation_phases
    .map((phase, i) => {
      const cleanName = cleanPhaseName(phase.phase);
      const activitiesHtml = phase.activities
        .map(a => `<li style="margin-bottom: 4px;">${a}</li>`)
        .join('');
      const deliverablesHtml = phase.deliverables
        .map(d => `<li style="margin-bottom: 4px;">${d}</li>`)
        .join('');

      return `
      <div style="margin-bottom: 24px; padding-left: 16px; border-left: 3px solid ${COLORS.brandGreen};">
        <h4 style="color: ${COLORS.textPrimary}; margin: 0 0 8px 0; font-weight: 600;">Phase ${i + 1}: ${cleanName}</h4>
        <p style="color: ${COLORS.textSecondary}; margin: 0 0 12px 0; font-size: 14px;">${phase.goal}</p>
        <p style="color: ${COLORS.textBody}; margin: 0 0 4px 0; font-size: 13px; font-weight: 600;">Activities:</p>
        <ul style="color: ${COLORS.textBody}; margin: 0 0 12px 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
          ${activitiesHtml}
        </ul>
        <p style="color: ${COLORS.textBody}; margin: 0 0 4px 0; font-size: 13px; font-weight: 600;">Deliverables:</p>
        <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
          ${deliverablesHtml}
        </ul>
      </div>
    `;
    })
    .join('');

  // Technical approach (formerly Algorithms)
  const technicalApproachHtml = methodology.algorithms.length > 0
    ? methodology.algorithms.map(algo => `
        <div style="margin-bottom: 12px; padding: 12px; background-color: ${COLORS.subtleBg}; border: 1px solid ${COLORS.borderMedium}; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: ${COLORS.textPrimary}; font-weight: 600;">${algo.name}</span>
            <span style="color: ${algo.complexity === 'low' ? COLORS.scoreHigh : algo.complexity === 'medium' ? COLORS.scoreMedium : COLORS.scoreLow}; font-size: 12px; font-weight: 500;">${algo.complexity.charAt(0).toUpperCase() + algo.complexity.slice(1)}</span>
          </div>
          <p style="color: ${COLORS.textSecondary}; margin: 8px 0 0 0; font-size: 13px;">${algo.why}</p>
        </div>
      `).join('')
    : `<p style="color: ${COLORS.textSecondary}; font-size: 14px;">No specific algorithms recommended - focus on automation and process improvement.</p>`;

  // Risks and watch-outs
  const risksHtml = methodology.sharp_edges.length > 0
    ? methodology.sharp_edges.map(edge => `<li style="margin-bottom: 8px;">${edge}</li>`).join('')
    : '<li>No specific pitfalls identified for this approach.</li>';

  // Format techniques as human-readable
  const techniquesFormatted = formatTechniques(methodology.techniques);

  // Data size text - different for automation vs ML problems
  const dataSizeText = isAutomationProblem(classification)
    ? 'A few months of representative files is enough. This is an automation problem, not a machine learning problem.'
    : methodology.data_requirements.minimum_rows;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your QSol Diagnostic Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.pageBg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 680px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: ${COLORS.brandGreen}; margin: 0; font-size: 28px;">QSol Analytics</h1>
      <p style="color: ${COLORS.textSecondary}; margin: 8px 0 0 0; font-size: 14px;">Diagnostic Report</p>
      <p style="color: ${COLORS.textMuted}; margin: 4px 0 0 0; font-size: 12px;">Informed by Cambridge data science training and practical SME implementation.</p>
    </div>

    <!-- Greeting -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <p style="color: ${COLORS.textPrimary}; margin: 0 0 16px 0; font-size: 18px;">Hi ${name},</p>
      <p style="color: ${COLORS.textBody}; margin: 0; line-height: 1.6;">
        Thank you for using the QSol Data Solution Finder. This report gives you a practical first read on the likely solution type, recommended approach, data needed, risks to watch, and the most sensible first step.
      </p>
    </div>

    <!-- SECTION 1: EXECUTIVE SUMMARY -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">1. Executive Summary</h3>
      <p style="color: ${COLORS.textBody}; margin: 0 0 16px 0; line-height: 1.7; font-size: 15px;">${roadmap.executive_summary}</p>
      <div style="background-color: ${COLORS.subtleBg}; border-radius: 8px; padding: 16px; border: 1px solid ${COLORS.borderMedium};">
        <p style="color: ${COLORS.textPrimary}; margin: 0; font-weight: 600;">${instantResult.headline}</p>
        <p style="color: ${COLORS.textSecondary}; margin: 8px 0 0 0; font-size: 14px;">${instantResult.summary}</p>
      </div>
    </div>

    <!-- SECTION 2: CLASSIFICATION & FIT SCORE -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">2. Classification & Fit Score</h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.borderLight};">
            <span style="color: ${COLORS.textMuted}; font-size: 13px;">Problem Type</span><br/>
            <span style="color: ${COLORS.textPrimary}; font-size: 18px; font-weight: 600;">${classificationLabel}</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.borderLight}; text-align: right;">
            <span style="color: ${COLORS.textMuted}; font-size: 13px;">Project Fit</span><br/>
            <span style="color: ${fitColor}; font-size: 24px; font-weight: bold;">${scores.project_fit_label}</span>
          </td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 12px 0; font-size: 13px;">Score breakdown (out of 5)</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; color: ${COLORS.textBody};">Value Potential</td>
            <td style="padding: 8px 0; color: ${COLORS.brandGreen}; text-align: right; font-weight: 600;">${scores.value_potential}/5</td>
            <td style="padding: 8px 0; color: ${COLORS.textBody}; padding-left: 24px;">Feasibility</td>
            <td style="padding: 8px 0; color: ${COLORS.brandGreen}; text-align: right; font-weight: 600;">${scores.feasibility}/5</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: ${COLORS.textBody};">Urgency</td>
            <td style="padding: 8px 0; color: ${COLORS.brandGreen}; text-align: right; font-weight: 600;">${scores.urgency}/5</td>
            <td style="padding: 8px 0; color: ${COLORS.textBody}; padding-left: 24px;">Data Readiness</td>
            <td style="padding: 8px 0; color: ${COLORS.brandGreen}; text-align: right; font-weight: 600;">${scores.data_readiness}/5</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: ${COLORS.textBody};">Repeatability</td>
            <td style="padding: 8px 0; color: ${COLORS.brandGreen}; text-align: right; font-weight: 600;">${scores.repeatability}/5</td>
            <td style="padding: 8px 0; color: ${COLORS.textBody}; padding-left: 24px;">Overall Score</td>
            <td style="padding: 8px 0; color: ${COLORS.brandGreen}; text-align: right; font-weight: 600;">${scores.overall}/100</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 20px; padding: 16px; background-color: ${COLORS.subtleBg}; border-radius: 8px; border: 1px solid ${COLORS.borderMedium};">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 8px 0; font-size: 12px; font-weight: 500;">Why this classification</p>
        <p style="color: ${COLORS.textBody}; margin: 0; font-size: 14px; line-height: 1.6;">${roadmap.classification_explanation}</p>
      </div>
    </div>

    <!-- SECTION 3: METHODOLOGY/APPROACH (adaptive based on classification) -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">3. ${getMethodologyLabel(classification)}</h3>

      <div style="margin-bottom: 20px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 8px 0; font-size: 12px; font-weight: 500;">Recommended approach</p>
        <p style="color: ${COLORS.textPrimary}; margin: 0; font-size: 18px; font-weight: 600;">${methodology.recommended_approach}</p>
        <p style="color: ${COLORS.textMuted}; margin: 4px 0 0 0; font-size: 13px;">${techniquesFormatted}</p>
      </div>

      ${methodology.algorithms.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 12px 0; font-size: 12px; font-weight: 500;">${getTechnicalApproachLabel(classification)}</p>
        ${technicalApproachHtml}
      </div>
      ` : ''}

      <div style="margin-bottom: 20px; padding: 16px; background-color: ${COLORS.softGreenBg}; border: 1px solid ${COLORS.softGreenBorder}; border-radius: 8px;">
        <p style="color: ${COLORS.softGreenText}; margin: 0 0 8px 0; font-size: 12px; font-weight: 600;">Recommended starting point</p>
        <p style="color: ${COLORS.textPrimary}; margin: 0; font-size: 14px; line-height: 1.6;">${methodology.baseline_first}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 12px 0; font-size: 12px; font-weight: 500;">Success metrics</p>
        <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
          ${methodology.success_metrics.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </div>

      <div style="padding: 16px; background-color: ${COLORS.amberBg}; border: 1px solid ${COLORS.amberBorder}; border-radius: 8px;">
        <p style="color: ${COLORS.amberText}; margin: 0 0 12px 0; font-size: 12px; font-weight: 600;">Risks and watch-outs</p>
        <ul style="color: ${COLORS.amberText}; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
          ${risksHtml}
        </ul>
      </div>
    </div>

    <!-- SECTION 4: IMPLEMENTATION/ASSESSMENT PHASES (adaptive) -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 20px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">4. ${getPhasesLabel(classification)}</h3>
      ${phasesHtml}
    </div>

    <!-- SECTION 5: DATA REQUIREMENTS (adaptive based on classification) -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">5. ${getDataSectionLabel(classification)}</h3>

      <div style="margin-bottom: 20px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 12px 0; font-size: 12px; font-weight: 500;">${isAutomationProblem(classification) ? 'Data sources and inputs needed' : isAssessmentProblem(classification) ? 'Data to gather and review' : 'Data you will need'}</p>
        <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px;">
          ${roadmap.data_needed.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      ${isMLProblem(classification) ? `
      <div style="margin-top: 16px; padding: 12px; background-color: ${COLORS.subtleBg}; border: 1px solid ${COLORS.borderMedium}; border-radius: 8px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 4px 0; font-size: 12px; font-weight: 500;">Minimum data size</p>
        <p style="color: ${COLORS.textBody}; margin: 0; font-size: 14px;">${dataSizeText}</p>
      </div>
      ` : `
      <div style="margin-top: 16px; padding: 12px; background-color: ${COLORS.subtleBg}; border: 1px solid ${COLORS.borderMedium}; border-radius: 8px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 4px 0; font-size: 12px; font-weight: 500;">${isAssessmentProblem(classification) ? 'Scope of review' : 'Data volume guidance'}</p>
        <p style="color: ${COLORS.textBody}; margin: 0; font-size: 14px;">${dataSizeText}</p>
      </div>
      `}

      <div style="margin-top: 16px;">
        <p style="color: ${COLORS.textMuted}; margin: 0 0 8px 0; font-size: 12px; font-weight: 500;">${getKeyFeaturesLabel(classification)}</p>
        <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          ${methodology.data_requirements.key_features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-top: 16px; padding: 12px; background-color: ${COLORS.amberBg}; border: 1px solid ${COLORS.amberBorder}; border-radius: 8px;">
        <p style="color: ${COLORS.amberText}; margin: 0 0 8px 0; font-size: 12px; font-weight: 500;">${isAssessmentProblem(classification) ? 'Common issues to look for' : 'Quality concerns to check'}</p>
        <ul style="color: ${COLORS.amberText}; margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
          ${methodology.data_requirements.quality_concerns.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- SECTION 6: RECOMMENDED TOOLS -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">6. Recommended Tools</h3>
      <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; line-height: 2; font-size: 14px;">
        ${roadmap.recommended_tools.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>

    <!-- SECTION 7: RISKS & ASSUMPTIONS -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 1px solid ${COLORS.borderLight}; padding-bottom: 12px;">7. Risks & Assumptions</h3>
      <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; line-height: 2; font-size: 14px;">
        ${roadmap.risks_and_assumptions.map(r => `<li>${r}</li>`).join('')}
      </ul>

      <div style="margin-top: 20px; padding: 16px; background-color: ${COLORS.amberBg}; border: 1px solid ${COLORS.amberBorder}; border-radius: 8px;">
        <p style="color: ${COLORS.amberText}; margin: 0 0 8px 0; font-size: 12px; font-weight: 500;">What to avoid at this stage</p>
        <p style="color: ${COLORS.amberText}; margin: 0; font-size: 14px; line-height: 1.6;">${instantResult.what_not_to_do_first}</p>
      </div>
    </div>

    <!-- SECTION 8: FIRST STEP & CALL TO ACTION -->
    <div style="background-color: ${COLORS.softGreenBg}; border: 1px solid ${COLORS.softGreenBorder}; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="color: ${COLORS.softGreenText}; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px;">8. Your First Step</h3>
      <p style="color: ${COLORS.textPrimary}; margin: 0 0 16px 0; font-size: 16px; font-weight: 600; line-height: 1.5;">${roadmap.first_step}</p>
      <p style="color: ${COLORS.textBody}; margin: 0; font-size: 14px; line-height: 1.6;">
        <strong style="color: ${COLORS.softGreenText};">Recommended first build:</strong> ${instantResult.likely_first_project}
      </p>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 24px; padding: 32px; background-color: ${COLORS.cardBg}; border-radius: 12px; border: 1px solid ${COLORS.borderLight};">
      <p style="color: ${COLORS.textPrimary}; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Want to turn this into a working solution?</p>
      <p style="color: ${COLORS.textBody}; margin: 0 0 20px 0; font-size: 14px;">Book a short scoping call to review your situation and decide the most practical first step.</p>
      <a href="https://cal.com/q-types/30-minute-discovery-call" style="display: inline-block; background-color: ${COLORS.brandGreen}; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Book a Scoping Call</a>
      <p style="color: ${COLORS.textMuted}; margin: 16px 0 0 0; font-size: 12px;">No commitment. Just clarity.</p>
    </div>

    <!-- Disclaimer -->
    <div style="margin-bottom: 24px; padding: 16px; background-color: ${COLORS.subtleBg}; border-radius: 8px; border: 1px solid ${COLORS.borderMedium};">
      <p style="color: ${COLORS.textMuted}; margin: 0; font-size: 12px; line-height: 1.6; text-align: center;">
        This report is an initial diagnostic based only on the description provided. Recommendations should be validated against your actual data, systems, constraints, and business rules before implementation.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid ${COLORS.borderLight};">
      <p style="color: ${COLORS.textSecondary}; margin: 0; font-size: 12px;">
        QSol Analytics | Big-company data tools for small-business teams
      </p>
      <p style="color: ${COLORS.textSecondary}; margin: 8px 0 0 0; font-size: 12px;">
        <a href="https://qsol-analytics.com" style="color: ${COLORS.brandGreen}; text-decoration: none;">qsol-analytics.com</a>
      </p>
      <p style="color: ${COLORS.textMuted}; margin: 16px 0 0 0; font-size: 11px;">
        Informed by applied data science training and QSol Analytics' practical SME implementation framework.
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export async function sendRoadmapEmail(params: SendRoadmapEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured - email will not be sent');
    return { success: false, error: 'Email not configured' };
  }

  // Validate required fields
  if (!params.methodology) {
    console.error('Email send error: methodology is undefined');
    return { success: false, error: 'Missing methodology data' };
  }

  if (!params.roadmap) {
    console.error('Email send error: roadmap is undefined');
    return { success: false, error: 'Missing roadmap data' };
  }

  try {
    console.log(`Sending email to ${params.to} for classification: ${params.classification}`);

    const emailHtml = generateEmailHtml(params);

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
        html: emailHtml
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return { success: false, error: `Resend API error: ${response.status}` };
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.id);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
}

// Separate email template for "not_enough_information" classification
// This asks for clarification rather than providing a full roadmap
interface SendClarificationEmailParams {
  to: string;
  name: string;
  problemSummary: string;
  followUpQuestion?: string;
}

function generateClarificationEmailHtml(params: SendClarificationEmailParams): string {
  const { name, problemSummary, followUpQuestion } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QSol - We'd Like to Learn More</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.pageBg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: ${COLORS.brandGreen}; margin: 0; font-size: 28px;">QSol Analytics</h1>
      <p style="color: ${COLORS.textSecondary}; margin: 8px 0 0 0; font-size: 14px;">We'd Like to Learn More</p>
    </div>

    <!-- Greeting -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <p style="color: ${COLORS.textPrimary}; margin: 0 0 16px 0; font-size: 18px;">Hi ${name},</p>
      <p style="color: ${COLORS.textBody}; margin: 0 0 16px 0; line-height: 1.6;">
        Thank you for using the QSol Data Solution Finder. We've received your enquiry but need a bit more information to provide useful guidance.
      </p>
      <p style="color: ${COLORS.textBody}; margin: 0; line-height: 1.6;">
        You described:
      </p>
      <div style="margin-top: 12px; padding: 16px; background-color: ${COLORS.subtleBg}; border-radius: 8px; border-left: 3px solid ${COLORS.brandGreen};">
        <p style="color: ${COLORS.textSecondary}; margin: 0; font-style: italic; font-size: 14px;">"${problemSummary}"</p>
      </div>
    </div>

    <!-- What we need -->
    <div style="background-color: ${COLORS.cardBg}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid ${COLORS.borderLight};">
      <h3 style="color: ${COLORS.brandGreen}; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">What would help us give you better guidance:</h3>

      ${followUpQuestion ? `
      <div style="margin-bottom: 20px; padding: 16px; background-color: ${COLORS.softGreenBg}; border: 1px solid ${COLORS.softGreenBorder}; border-radius: 8px;">
        <p style="color: ${COLORS.softGreenText}; margin: 0; font-size: 14px;">${followUpQuestion}</p>
      </div>
      ` : ''}

      <ul style="color: ${COLORS.textBody}; margin: 0; padding-left: 20px; line-height: 2; font-size: 14px;">
        <li>What specific task or process is causing the most pain?</li>
        <li>How often does this problem occur (daily, weekly, monthly)?</li>
        <li>What data or systems are involved?</li>
        <li>What would "solved" look like for you?</li>
      </ul>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 24px; padding: 32px; background-color: ${COLORS.cardBg}; border-radius: 12px; border: 1px solid ${COLORS.borderLight};">
      <p style="color: ${COLORS.textPrimary}; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Let's talk through it</p>
      <p style="color: ${COLORS.textBody}; margin: 0 0 20px 0; font-size: 14px;">A quick call is often the fastest way to understand your situation and point you in the right direction.</p>
      <a href="https://cal.com/q-types/30-minute-discovery-call" style="display: inline-block; background-color: ${COLORS.brandGreen}; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Book a Quick Call</a>
      <p style="color: ${COLORS.textMuted}; margin: 16px 0 0 0; font-size: 12px;">No commitment. Just clarity.</p>
    </div>

    <!-- Alternative -->
    <div style="background-color: ${COLORS.subtleBg}; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid ${COLORS.borderMedium};">
      <p style="color: ${COLORS.textBody}; margin: 0; font-size: 14px; line-height: 1.6;">
        Alternatively, reply to this email with more details about your situation and we'll get back to you with a more specific assessment.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid ${COLORS.borderLight};">
      <p style="color: ${COLORS.textSecondary}; margin: 0; font-size: 12px;">
        QSol Analytics | Big-company data tools for small-business teams
      </p>
      <p style="color: ${COLORS.textSecondary}; margin: 8px 0 0 0; font-size: 12px;">
        <a href="https://qsol-analytics.com" style="color: ${COLORS.brandGreen}; text-decoration: none;">qsol-analytics.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export async function sendClarificationEmail(params: SendClarificationEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured - email will not be sent');
    return { success: false, error: 'Email not configured' };
  }

  try {
    console.log(`Sending clarification email to ${params.to}`);

    const emailHtml = generateClarificationEmailHtml(params);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: params.to,
        subject: 'QSol Analytics - We\'d Like to Learn More About Your Project',
        html: emailHtml
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return { success: false, error: `Resend API error: ${response.status}` };
    }

    const result = await response.json();
    console.log('Clarification email sent successfully:', result.id);
    return { success: true };
  } catch (error) {
    console.error('Clarification email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
}

// Export helper to check if clarification email should be sent instead
export { needsClarification };
