// Telegram notification service for QSol Data Project Finder
import type { Classification, DiagnosisScores } from './types';
import { CLASSIFICATION_LABELS } from './types';

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

interface SendLeadNotificationParams {
  name: string;
  email: string;
  company: string | null;
  classification: Classification;
  scores: DiagnosisScores;
  confidence: string;
  problemDescription: string;
  likelyFirstProject: string;
}

function escapeMarkdown(text: string): string {
  // Escape special characters for Telegram MarkdownV2
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

function getSuggestedFollowUp(classification: Classification, scores: DiagnosisScores): string {
  const fit = scores.project_fit_label;

  if (fit === 'High') {
    switch (classification) {
      case 'reporting_automation':
        return 'Offer a fixed-fee reporting automation assessment';
      case 'spreadsheet_to_system':
        return 'Offer a spreadsheet/process audit and system design';
      case 'forecasting_early_warning':
        return 'Discuss forecasting requirements and data availability';
      case 'customer_intelligence':
        return 'Propose a customer data analysis pilot';
      case 'ai_knowledge_assistant':
        return 'Schedule a document corpus review session';
      case 'workflow_automation':
        return 'Map the workflow and identify automation candidates';
      case 'data_readiness':
        return 'Offer a data readiness audit';
      default:
        return 'Schedule a discovery call to clarify requirements';
    }
  } else if (fit === 'Medium') {
    return 'Schedule a discovery call to explore feasibility';
  } else {
    return 'Send educational content and nurture';
  }
}

export async function sendLeadNotification(params: SendLeadNotificationParams): Promise<{ success: boolean; error?: string }> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured, skipping notification');
    return { success: true }; // Don't fail if not configured
  }

  const suggestedAction = getSuggestedFollowUp(params.classification, params.scores);
  const classificationLabel = CLASSIFICATION_LABELS[params.classification];

  // Build message with emojis for visual scanning
  const message = `
🧭 *New QSol Project Finder Lead*

👤 *Name:* ${escapeMarkdown(params.name)}
🏢 *Company:* ${escapeMarkdown(params.company || 'Not provided')}
📧 *Email:* ${escapeMarkdown(params.email)}

📊 *Classification:* ${escapeMarkdown(classificationLabel)}
📈 *Project Fit:* ${escapeMarkdown(params.scores.project_fit_label)} \\(${params.scores.overall}/100\\)
🎯 *Confidence:* ${escapeMarkdown(params.confidence)}

💬 *Problem:*
"${escapeMarkdown(truncate(params.problemDescription, 300))}"

🚀 *Likely First Project:*
${escapeMarkdown(truncate(params.likelyFirstProject, 200))}

✅ *Suggested Follow\\-up:*
${escapeMarkdown(suggestedAction)}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Telegram API error:', error);
      return { success: false, error: 'Failed to send Telegram notification' };
    }

    return { success: true };
  } catch (error) {
    console.error('Telegram send error:', error);
    return { success: false, error: 'Failed to send Telegram notification' };
  }
}
