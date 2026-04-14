import type { DictionaryWord } from "@/types/dictionary-word";

export function getPrimaryHeadword(w: DictionaryWord): string {
  const kanji = w.kanji.trim();
  const kata = w.katakana.trim();
  const hira = w.hiragana.trim();
  return kanji || kata || hira || w.romaji;
}

/** Reading line: hiragana when kanji/katakana present; otherwise romaji hint. */
export function getReadingLine(w: DictionaryWord): string {
  const kanji = w.kanji.trim();
  const kata = w.katakana.trim();
  const hira = w.hiragana.trim();
  if (kanji || kata) {
    return hira;
  }
  return w.romaji;
}

export function snippetText(text: string, max = 72): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

export function splitMeanings(mm: string): string[] {
  return mm
    .split(/[、，,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
