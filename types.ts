
export interface BeautyIndex {
  name: string;
  score: number;
  emoji: string;
}

export interface MindMapNode {
  id: string;
  text: string;
  emoji: string;
}

export interface DetailedAnalysis {
  introduction: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string;
  conclusion: string;
}

export interface AnalysisResult {
  beautyIndexes: BeautyIndex[];
  problems: MindMapNode[];
  solutions: MindMapNode[];
  detailedAnalysis: DetailedAnalysis;
}

export type AppState = 'home' | 'camera' | 'loading' | 'results';
