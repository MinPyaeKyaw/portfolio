export interface WordExample {
  japaneseWithKanji: string;
  japaneseWithHiragana: string;
  mm: string;
}

export interface WordForm {
  name: string;
  word: string;
}

export interface DictionaryWord {
  id: number;
  hiragana: string;
  kanji: string;
  katakana: string;
  mm: string;
  romaji: string;
  forms?: WordForm[];
  examples?: WordExample[];
}
