// QSol Data Project Finder Types
// Generated from database schema

export type Classification =
  | 'reporting_automation'
  | 'spreadsheet_to_system'
  | 'forecasting_early_warning'
  | 'customer_intelligence'
  | 'ai_knowledge_assistant'
  | 'workflow_automation'
  | 'data_readiness'
  | 'not_enough_information';

export type Confidence = 'low' | 'medium' | 'high';

export type ProjectFitLabel = 'Low' | 'Medium' | 'High';

// Classification labels for display
export const CLASSIFICATION_LABELS: Record<Classification, string> = {
  reporting_automation: 'Reporting Automation',
  spreadsheet_to_system: 'Spreadsheet-to-System',
  forecasting_early_warning: 'Forecasting & Early Warning',
  customer_intelligence: 'Customer Intelligence',
  ai_knowledge_assistant: 'AI Knowledge Assistant',
  workflow_automation: 'Workflow Automation',
  data_readiness: 'Data Readiness First',
  not_enough_information: 'Needs Clarification',
};

// Scoring interface
export interface DiagnosisScores {
  value_potential: number; // 1-5
  feasibility: number; // 1-5
  urgency: number; // 1-5
  data_readiness: number; // 1-5
  repeatability: number; // 1-5
  complexity_penalty: number; // 1-5
  ai_suitability: number; // 1-5
  automation_suitability: number; // 1-5
  overall: number; // 0-100
  project_fit_label: ProjectFitLabel;
}

// Instant result shown without email
export interface InstantResult {
  headline: string;
  summary: string;
  likely_first_project: string;
  what_not_to_do_first: string;
  data_likely_needed: string[];
}

// Implementation phase for roadmap
export interface ImplementationPhase {
  phase: string;
  goal: string;
  activities: string[];
  deliverables: string[];
}

// Full roadmap (email-gated)
export interface FullRoadmap {
  executive_summary: string;
  classification_explanation: string;
  implementation_phases: ImplementationPhase[];
  data_needed: string[];
  recommended_tools: string[];
  risks_and_assumptions: string[];
  first_step: string;
}

// Roadmap preview (visible before unlock)
export interface RoadmapPreview {
  title: string;
  visible_preview: string;
  locked_sections: string[];
}

// Database row types
export interface Diagnosis {
  id: string;
  created_at: string;
  problem_description: string;
  classification: Classification;
  secondary_classifications: Classification[];
  confidence: Confidence;
  scores: DiagnosisScores;
  instant_result: InstantResult;
  full_roadmap: FullRoadmap;
  source: string;
  utm_data: Record<string, string> | null;
  email_unlocked: boolean;
}

export interface Lead {
  id: string;
  diagnosis_id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  privacy_accepted: boolean;
  privacy_accepted_at: string;
  consent_to_contact: boolean;
  lead_score: number | null;
  telegram_notified: boolean;
  email_sent: boolean;
}

// API Request/Response types
export interface DiagnoseRequest {
  problem_description: string;
  source?: string;
  utm_source?: string | null;
  utm_campaign?: string | null;
}

export interface DiagnoseResponse {
  diagnosis_id: string;
  instant_result: InstantResult;
  roadmap_preview: RoadmapPreview;
  classification: Classification;
  classification_label: string;
  confidence: Confidence;
  scores: DiagnosisScores;
  follow_up_question?: string | null;
}

export interface UnlockRequest {
  diagnosis_id: string;
  name: string;
  email: string;
  company?: string;
  privacy_accepted: boolean;
  consent_to_contact: boolean;
}

export interface UnlockResponse {
  status: 'success' | 'error';
  full_roadmap?: FullRoadmap;
  error?: string;
}

// Example chips for the UI
export const EXAMPLE_CHIPS = [
  'We spend hours making the same report every month',
  'Our quotes take too long and depend on one spreadsheet',
  'We have customer data but do not know what to do with it',
  'We need better demand or workload forecasts',
  'Staff keep searching through documents for the same answers',
  'We want to use AI but do not know where to start',
  'Our spreadsheets are becoming hard to trust',
] as const;

// Validation constants
export const PROBLEM_MIN_LENGTH = 20;
export const PROBLEM_MAX_LENGTH = 3000;
