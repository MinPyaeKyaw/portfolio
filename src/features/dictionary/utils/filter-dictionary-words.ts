import type { DictionaryWord } from "@/types/dictionary-word";
import { normalizeForSearch } from "./normalize-for-search";

export const MAX_DICTIONARY_RESULTS = 500;

function wordMatches(w: DictionaryWord, q: string): boolean {
  const fields: string[] = [
    w.hiragana,
    w.kanji,
    w.katakana,
    w.romaji,
    w.mm,
    ...(w.forms?.map((f) => f.word) ?? []),
  ];
  return fields.some((s) => normalizeForSearch(s).startsWith(q));
}

export function filterDictionaryWords(
  allWords: readonly DictionaryWord[],
  rawQuery: string,
): { items: DictionaryWord[]; truncated: boolean } {
  const q = normalizeForSearch(rawQuery);
  if (!q) {
    return { items: [], truncated: false };
  }

  const items: DictionaryWord[] = [];
  for (const w of allWords) {
    if (wordMatches(w, q)) {
      items.push(w);
      if (items.length >= MAX_DICTIONARY_RESULTS) {
        return { items, truncated: true };
      }
    }
  }
  return { items, truncated: false };
}
