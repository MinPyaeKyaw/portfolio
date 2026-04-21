export interface WordExample {
  jp: string;
  mm: string;
}

export interface WordForm {
  name: string;
  word: string;
  mm?: string;
}

/** JLPT-style labels from the lexicon dataset */
export type WordLexicalType =
  | "verb-u"
  | "verb-ru"
  | "verb-irregular"
  | "i-adjective"
  | "na-adjective"
  | "noun"
  | "adverb"
  | "particle"
  | "pronoun"
  | "conjunction"
  | "interjection"
  | (string & {});

export interface DictionaryWord {
  id: number;
  hiragana: string;
  kanji: string;
  katakana: string;
  mm: string;
  romaji: string;
  type: WordLexicalType;
  forms?: WordForm[];
  examples?: WordExample[];
}
