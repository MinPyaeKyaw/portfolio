export interface KanjiWordExample {
  kanji: string;
  hiragana: string;
  meaning: string;
}

export interface KanjiLearningItem {
  id: number;
  level: string;
  image: string;
  kanji: string;
  kunYomi: string;
  onYomi: string;
  hiragana: string;
  meaning: string;
  others: KanjiWordExample[];
}
