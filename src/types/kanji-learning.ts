export interface KanjiWordExample {
  kanji: string;
  hiragana: string;
  meaning: string;
}

export interface KanjiLearningItem {
  id: number;
  level: string;
  kanji: string;
  kunYomi: string;
  onYomi: string;
  hiragana: string;
  /** Myanmar gloss for the character */
  mm: string;
  exampleWords: KanjiWordExample[];
}
