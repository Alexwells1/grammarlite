export type Suggestion = {
  label: string; // corrected sentence
  explanation?: string; // what was wrong
  reason?: string; // why it's correct
  onClick?: () => void;
};

export type GrammarSuggestion = {
  text: string; // corrected sentence (basic mode)
  explanation?: string; // what was wrong (basic mode)
  reason?: string; // why it's correct (basic mode)
  suggestions?: Suggestion[]; // deep mode
};
