export type KanaScript = "hiragana" | "katakana";

export interface KanaEntry {
  hiragana: string;
  katakana: string;
  romaji: string;
}

export interface KanaSection {
  id: string;
  title: string;
  subtitle: string;
  rows: Array<Array<KanaEntry | null>>;
}
