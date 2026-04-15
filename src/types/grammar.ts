export interface GrammarExample {
  jp: string;
  mm: string;
}

export interface GrammarItem {
  id: number;
  level: string;
  jpTitle: string;
  mmTitle: string;
  structure: string;
  mmExplanation: string;
  examples: GrammarExample[];
}
