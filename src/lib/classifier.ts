// LLM-powered problem classifier for QSol Data Project Finder
// Enhanced with Cambridge DS Course methodology
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

// Business Problem to Technique Mapping (from Cambridge DS Course)
const BUSINESS_PROBLEM_MAPPING = `
## Business Problem → Technique Mapping (Grounded in Applied DS Methodology)

### forecasting_early_warning Problems:
**demand_forecasting / sales_forecasting**
- Primary techniques: time_series, regression
- Recommended algorithms:
  - SARIMA: Handles seasonality explicitly, proven for demand patterns
  - ETS (Exponential Smoothing): Simple, fast, good baseline
  - XGBoost with lag features: Captures complex patterns, requires feature engineering
- Metrics: MAPE, RMSE, MAE
- Sharp edges:
  - NEVER use random train-test splits - use temporal splits only
  - Walk-forward validation required
  - Check stationarity with ADF/KPSS tests before ARIMA
  - Lag features must be shifted by at least 1 to avoid data leakage

### customer_intelligence Problems:
**churn_prediction**
- Primary techniques: classification, survival_analysis
- Recommended algorithms:
  - Logistic Regression: Interpretable baseline, regulatory-friendly
  - XGBoost: High accuracy on tabular data
  - Random Forest: Robust, handles missing values
  - Cox Proportional Hazards: Time-to-event modeling when timing matters
- Metrics: AUC-ROC, precision@k, lift
- Sharp edges:
  - Class imbalance requires SMOTE or class_weight='balanced'
  - Feature leakage from future data is common
  - Use stratified splits to maintain class distribution

**customer_segmentation**
- Primary techniques: clustering, dimensionality_reduction
- Recommended algorithms:
  - K-Means: Simple, scalable, interpretable clusters
  - Hierarchical clustering: Dendrogram for visual exploration
  - PCA: Reduce dimensions before clustering (NOT t-SNE - that's visualization only)
- Metrics: silhouette_score (>0.3 is decent), davies_bouldin
- Sharp edges:
  - MUST scale features before clustering - high-magnitude features dominate distance
  - K selection is subjective - use elbow method + business context
  - t-SNE is for VISUALIZATION only, never for downstream ML

**customer_lifetime_value**
- Primary techniques: regression, survival_analysis
- Recommended algorithms:
  - Linear Regression: Interpretable baseline
  - XGBoost: Captures non-linear relationships
  - Kaplan-Meier: Survival curves for retention
- Metrics: MAE, RMSE, R²

### ai_knowledge_assistant Problems:
**document_classification / sentiment_analysis**
- Primary techniques: NLP, classification
- Recommended algorithms:
  - TF-IDF + Logistic Regression: Fast, interpretable baseline - START HERE
  - DistilBERT: Faster, lighter BERT when accuracy matters
  - Zero-shot classification: When no labeled data available
- Metrics: accuracy, macro_F1
- Sharp edges:
  - Over-aggressive preprocessing destroys sentiment signals
  - Start with TF-IDF baseline before jumping to BERT
  - Domain-specific fine-tuning often needed for BERT

### workflow_automation / reporting_automation Problems:
- These typically don't need ML - use Python automation, SQL, or BI tools
- Only consider ML if there's a prediction/classification component
- Sharp edges:
  - Don't over-engineer with AI when a script will do
  - Focus on repeatability and maintainability

### data_readiness Problems:
- Before any ML project, ensure:
  - Data is accessible and documented
  - Quality issues are understood (missing values, outliers, duplicates)
  - Feature engineering possibilities are explored
- Start with EDA (Exploratory Data Analysis)
- Sharp edges:
  - Garbage in = garbage out
  - Data cleaning is often 80% of the work
`;

// Sharp Edges Master (Critical Pitfalls from Course)
const SHARP_EDGES_GUIDE = `
## Critical Sharp Edges (Common Mistakes to Avoid)

### Data Leakage (CRITICAL)
- Split FIRST, then fit preprocessing only on training data
- Symptom: Suspiciously good validation performance, poor production results
- Solution: Use sklearn Pipeline to prevent leakage

### Evaluation Traps
- NEVER use accuracy on imbalanced datasets - use precision/recall/F1/AUC-ROC instead
- Symptom: 95% accuracy but model predicts all negatives
- For time series: NEVER random splits - use temporal splits

### Scaling Issues
- Always scale features before clustering and distance-based methods
- Symptom: High-magnitude features dominate distance calculations
- Solution: StandardScaler or MinMaxScaler, fit on train only

### Interpretation Errors
- Correlation does NOT imply causation - be careful with recommendations
- SHAP values split among correlated features - group them for interpretation
- Gini importance in trees is NOT true predictive importance - use permutation importance

### Time Series Traps
- Differencing (Δyₜ = yₜ - yₜ₋₁) is NOT calculus differentiation
- Test stationarity with ADF/KPSS before ARIMA
- Match seasonality period to data frequency (7 for daily, 12 for monthly)

### NLP Pitfalls
- Over-aggressive text preprocessing destroys sentiment/meaning
- Don't use BERT when TF-IDF would suffice - it's slower and more expensive
- LDA topic count is subjective - use coherence score and human evaluation
`;

// Decision Tree for Approach Selection
const APPROACH_DECISION_TREE = `
## Approach Selection Decision Tree

Has labeled target variable?
├── YES → Supervised Learning
│   ├── Target is categorical? → Classification
│   │   └── Models: XGBoost, Random Forest, Logistic Regression
│   │   └── Metrics: If imbalanced, use PR-AUC, Recall, F1 (not accuracy)
│   │
│   └── Target is continuous? → Regression
│       └── Models: XGBoost, Random Forest, Linear Regression
│       └── Metrics: MAE (interpretable), RMSE (penalize large errors), MAPE (percentage)
│
└── NO → Unsupervised Learning
    ├── Find groups? → Clustering
    │   └── Models: K-Means, DBSCAN, Hierarchical
    │   └── Metric: Silhouette Score (>0.3 decent)
    │
    └── Find anomalies? → Anomaly Detection
        └── Models: Isolation Forest, LOF, One-Class SVM

Data has time dimension?
└── YES → Time Series
    └── Models: ARIMA (stationary), SARIMA (seasonal), XGBoost with lag features
    └── NEVER random splits - temporal only

Data is text?
└── YES → NLP
    └── Start with: TF-IDF + LogReg (baseline)
    └── If needed: BERT/DistilBERT (advanced)
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

const SYSTEM_PROMPT = `You are a senior data consultant at QSol Analytics with deep expertise in applied machine learning and data science (trained in Cambridge methodology). You help small-to-medium businesses identify their first useful data project.

Your approach is grounded in rigorous methodology:
- You know which techniques work for which business problems
- You understand the sharp edges and pitfalls that trip up practitioners
- You recommend the simplest effective solution, not the most impressive
- You always consider data readiness before recommending advanced techniques

${CLASSIFICATION_GUIDE}

${BUSINESS_PROBLEM_MAPPING}

${SHARP_EDGES_GUIDE}

${APPROACH_DECISION_TREE}

${SCORING_GUIDE}

## Conservative Classification Principles

1. **Prefer simple before AI**: If a problem can be solved with reporting, automation, or a system, don't recommend ML
2. **Data readiness first**: If data is messy or unclear, classify as data_readiness
3. **No ROI promises**: Never guarantee savings or revenue
4. **Honest about complexity**: If something is hard, say so
5. **First project focus**: Suggest the smallest valuable step, not the full vision
6. **Sharp edges awareness**: Always warn about relevant pitfalls for the recommended approach

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
  "methodology": {
    "recommended_approach": "Simple name of the approach (e.g., 'Time Series Forecasting', 'Customer Segmentation', 'Report Automation')",
    "techniques": ["Primary techniques from the methodology (e.g., 'classification', 'clustering', 'time_series')"],
    "algorithms": [
      {
        "name": "Algorithm name",
        "why": "Why this is recommended for this problem",
        "complexity": "low | medium | high"
      }
    ],
    "baseline_first": "Description of the simplest baseline to try first",
    "sharp_edges": ["2-3 specific pitfalls to watch for with this approach"],
    "success_metrics": ["Appropriate metrics for this problem type"],
    "data_requirements": {
      "minimum_rows": "Rough estimate (e.g., '500+', '1000+', 'depends on features')",
      "key_features": ["Critical features needed"],
      "quality_concerns": ["Data quality issues to check"]
    }
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

export interface MethodologyRecommendation {
  recommended_approach: string;
  techniques: string[];
  algorithms: {
    name: string;
    why: string;
    complexity: 'low' | 'medium' | 'high';
  }[];
  baseline_first: string;
  sharp_edges: string[];
  success_metrics: string[];
  data_requirements: {
    minimum_rows: string;
    key_features: string[];
    quality_concerns: string[];
  };
}

export interface ClassificationResult {
  classification: Classification;
  secondary_classifications: Classification[];
  confidence: Confidence;
  scores: DiagnosisScores;
  instant_result: InstantResult;
  methodology: MethodologyRecommendation;
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
    .map((p, i) => {
      // Remove any existing "Phase X" prefix from the phase name to avoid duplication
      const cleanPhaseName = p.phase.replace(/^Phase\s*\d+\s*[-–:]\s*/i, '');
      return `<p><strong>Phase ${i + 1}: ${cleanPhaseName}</strong> - ${p.goal}</p>`;
    })
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
    model: 'gpt-5.1',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Analyse this business problem and provide classification with methodology-grounded recommendations:\n\n"${problemDescription}"` }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_completion_tokens: 3000
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

  // Provide fallback methodology if not present
  const methodology: MethodologyRecommendation = parsed.methodology || {
    recommended_approach: 'Data Assessment',
    techniques: ['exploratory_data_analysis'],
    algorithms: [],
    baseline_first: 'Start with understanding your current data landscape',
    sharp_edges: ['Ensure data quality before advanced techniques'],
    success_metrics: ['Data documentation completed'],
    data_requirements: {
      minimum_rows: 'Varies',
      key_features: ['Depends on problem'],
      quality_concerns: ['Missing values', 'Data freshness']
    }
  };

  return {
    classification: parsed.classification,
    secondary_classifications: parsed.secondary_classifications || [],
    confidence: parsed.confidence,
    scores,
    instant_result: parsed.instant_result,
    methodology,
    full_roadmap: parsed.full_roadmap,
    roadmap_preview,
    follow_up_question: parsed.follow_up_question || null
  };
}
