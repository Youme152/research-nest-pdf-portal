
export interface ResearchMode {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PDFDocument {
  id: string;
  title: string;
  source: string;
  publishedDate: string;
  abstract: string;
  authors: string[];
  url: string;
  thumbnailUrl?: string;
  pages: number;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}
