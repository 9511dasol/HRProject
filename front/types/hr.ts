export interface JobPosting {
  id: string;
  title: string;
  department: string;
  level: string;
  keySkills: string[];
}

export interface Candidate {
  id: string;
  name: string;
  appliedJob: string;
  resumeSummary: string;
}

export interface GeneratedQuestion {
  id: number;
  type: string;
  question: string;
  intent: string;
  ragContext: string;
}

export interface CandidateInsight {
  strengths: string[];
  risks: string[];
  scorecard: string[];
}

export interface MainClientWrapperProps {
  jobPostings: JobPosting[];
  candidates: Candidate[];
}

export interface ControlPanelProps {
  selectedJob: string;
  setSelectedJob: (id: string) => void;
  selectedCandidate: string;
  setSelectedCandidate: (id: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onGenerateAI: () => void;
  onAnalyzeInsight: () => void;
  isInsightLoading: boolean;
  jobPostings: JobPosting[];
  candidates: Candidate[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  level: string;
  keySkills: string[];
}

export interface Candidate {
  id: string;
  name: string;
  appliedJob: string;
  resumeSummary: string;
}

export interface GeneratedQuestion {
  id: number;
  type: string;
  question: string;
  intent: string;
  ragContext: string;
}