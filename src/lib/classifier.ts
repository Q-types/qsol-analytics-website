// LLM-powered problem classifier for QSol Data Project Finder
import OpenAI from 'openai';
import type {
  Classification,
  Confidence,
  DiagnosisScores,
  InstantResult,
  FullRoadmap,
  RoadmapPreview,
  ImplementationPhase,
  ProjectFitLabel
} from './types';

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});

// Classification taxonomy with guidance
const CLASSIFICATION_GUIDE = `
## Classification Taxonomy

1. **reporting_automation**: Recurring manual reporting, dashboard creation, spreadsheet exports, data aggregation for stakeholders
   - Signals: "every month", "same report", "copy paste", "takes hours", "aggregating", "formatting"

2. **spreadsheet_to_system**: Fragile spreadsheet being used as database/calculator/workflow tool
   - Signals: "spreadsheet", "Excel", "Google Sheets", "one person knows", "hard to trust", "formula", "breaks"

3. **forecasting_early_warning**: Prediction needs - demand, sales, workload, stock, staffing
   - Signals: "predict", "forecast", "planning", "stock out", "staffing levels", "demand", "seasonality"

4. **customer_intelligence**: Segmentation, retention, CLV, churn, sales prioritization
   - Signals: "customer data", "segments", "churn", "retention", "prioritize sales", "CLV", "at-risk"

5. **ai_knowledge_assistant**: Internal document search, knowledge retrieval, Q&A over documents
   - Signals: "documents", "search", "find answers", "SOPs", "manuals", "onboarding", "ask questions"

6. **workflow_automation**: Repetitive admin tasks, file handling, data entry, approvals
   - Signals: "repetitive", "manual entry", "copy files", "approve", "route emails", "triggers"

7. **data_readiness**: Data is messy, fragmented, or inaccessible - needs sorting before projects
   - Signals: "messy data", "don't know what we have", "multiple systems", "no integration", "where to start"

8. **not_enough_information**: Input is too vague, off-topic, or unclear to classify
   - Use when: <20 meaningful words, no clear problem, just curiosity, unrelated to data/analytics
`;

const SCORING_GUIDE = `
## Scoring Rubric (1-5 scale)

**value_potential**: Business impact if solved
- 5: Significant revenue/cost impact, executive priority
- 3: Moderate efficiency gains, departmental value
- 1: Minor convenience, nice-to-have

**feasibility**: How achievable with current data/tools
- 5: Data ready, clear path, proven patterns
- 3: Some data gaps or integration work needed
- 1: Major data infrastructure work required

**urgency**: Time-sensitivity of the problem
- 5: Causing active pain, blocking decisions
- 3: Ongoing inefficiency, would help soon
- 1: Future improvement, no immediate pressure

**data_readiness**: Quality and accessibility of needed data
- 5: Data exists, is clean, and accessible
- 3: Data exists but needs cleaning or integration
- 1: Data scattered, incomplete, or locked away

**repeatability**: Can this become a repeatable process/system
- 5: Clear pattern, will recur indefinitely
- 3: Periodic need, some variation
- 1: One-time or highly variable

**complexity_penalty**: Technical/organizational complexity (higher = harder)
- 5: Many systems, stakeholders, exceptions
- 3: Moderate integration, some edge cases
- 1: Straightforward, contained scope

**ai_suitability**: Does this benefit from ML/AI specifically
- 5: Clear prediction/classification/generation need
- 3: AI could help but simpler solution may work
- 1: Traditional automation is better fit

**automation_suitability**: Benefits from process automation
- 5: Highly repetitive, rule-based, schedulable
- 3: Some automation potential with exceptions
- 1: Requires significant human judgment
`;

const SYSTEM_PROMPT = `You are a senior data consultant at QSol Analytics, helping small-to-medium businesses identify their first useful data project.

Your job is to:
1. Classify the business problem into ONE primary category
2. Score the problem on multiple dimensions
3. Suggest a realistic first project (not the most ambitious one)
4. Warn about what NOT to do first

${CLASSIFICATION_GUIDE}

${SCORING_GUIDE}

## Conservative Classification Principles

1. **Prefer simple before AI**: If a problem can be solved with reporting, automation, or a system, don't recommend AI
2. **Data readiness first**: If data is messy or unclear, classify as data_readiness
3. **No ROI promises**: Never guarantee savings or revenue
4. **Honest about complexity**: If something is hard, say so
5. **First project focus**: Suggest the smallest valuable step, not the full vision

## Response Format

Return a JSON object with this exact structure:
{
  "classification": "one of the 8 categories",
  "secondary_classifications": ["array of 0-2 other relevant categories"],
  "confidence": "low" | "medium" | "high",
  "scores": {
    "value_potential": 1-5,
    "feasibility": 1-5,
    "urgency": 1-5,
    "data_readiness": 1-5,
    "repeatability": 1-5,
    "complexity_penalty": 1-5,
    "ai_suitability": 1-5,
    "automation_suitability": 1-5
  },
  "instant_result": {
    "headline": "Short punchy classification headline (5-10 words)",
    "summary": "2-3 sentence summary of what kind of problem this is",
    "likely_first_project": "1-2 sentence description of realistic first project",
    "what_not_to_do_first": "Warning about common overreach for this problem type",
    "data_likely_needed": ["list", "of", "3-5", "data", "items"]
  },
  "full_roadmap": {
    "executive_summary": "2-3 sentence overview of the recommended approach",
    "classification_explanation": "Why this classification was chosen",
    "implementation_phases": [
      {
        "phase": "Phase name",
        "goal": "What this phase achieves",
        "activities": ["Activity 1", "Activity 2"],
        "deliverables": ["Deliverable 1", "Deliverable 2"]
      }
    ],
    "data_needed": ["Specific data requirements"],
    "recommended_tools": ["Tool suggestions appropriate to SME context"],
    "risks_and_assumptions": ["Risk 1", "Assumption 1"],
    "first_step": "The single most concrete next action"
  },
  "follow_up_question": "Optional question if more info would help (null if not needed)"
}`;

export interface ClassificationResult {
  classification: Classification;
  secondary_classifications: Classification[];
  confidence: Confidence;
  scores: DiagnosisScores;
  instant_result: InstantResult;
  full_roadmap: FullRoadmap;
  roadmap_preview: RoadmapPreview;
  follow_up_question: string | null;
}

function calculateProjectFit(scores: Omit<DiagnosisScores, 'overall' | 'project_fit_label'>): { overall: number; project_fit_label: ProjectFitLabel } {
  // Formula: S = 0.25V + 0.25F + 0.15U + 0.15D + 0.15R - 0.05C
  const raw = (
    0.25 * scores.value_potential +
    0.25 * scores.feasibility +
    0.15 * scores.urgency +
    0.15 * scores.data_readiness +
    0.15 * scores.repeatability -
    0.05 * scores.complexity_penalty
  );

  // Normalize to 0-100
  const overall = Math.round((raw / 5) * 100);

  let project_fit_label: ProjectFitLabel;
  if (overall >= 70) {
    project_fit_label = 'High';
  } else if (overall >= 50) {
    project_fit_label = 'Medium';
  } else {
    project_fit_label = 'Low';
  }

  return { overall, project_fit_label };
}

function generateRoadmapPreview(fullRoadmap: FullRoadmap): RoadmapPreview {
  const phases = fullRoadmap.implementation_phases;
  const previewPhases = phases.slice(0, 2);

  const visible_preview = previewPhases
    .map((p, i) => `<p><strong>Phase ${i + 1}: ${p.phase}</strong> - ${p.goal}</p>`)
    .join('');

  const locked_sections = [
    'Full implementation phases',
    'Data requirements',
    'Recommended tools',
    'Risks and assumptions',
    'Suggested first step'
  ];

  return {
    title: 'Implementation Roadmap',
    visible_preview,
    locked_sections
  };
}

export async function classifyProblem(problemDescription: string): Promise<ClassificationResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-5.5-2026-04-23',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Analyse this business problem and provide classification:\n\n"${problemDescription}"` }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 2000
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from classifier');
  }

  const parsed = JSON.parse(content);

  // Calculate overall score and project fit label
  const { overall, project_fit_label } = calculateProjectFit(parsed.scores);

  const scores: DiagnosisScores = {
    ...parsed.scores,
    overall,
    project_fit_label
  };

  const roadmap_preview = generateRoadmapPreview(parsed.full_roadmap);

  return {
    classification: parsed.classification,
    secondary_classifications: parsed.secondary_classifications || [],
    confidence: parsed.confidence,
    scores,
    instant_result: parsed.instant_result,
    full_roadmap: parsed.full_roadmap,
    roadmap_preview,
    follow_up_question: parsed.follow_up_question || null
  };
}
