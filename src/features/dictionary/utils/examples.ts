import type { DictionaryWord, WordExample } from "@/types/dictionary-word";

export function getValidExamples(w: DictionaryWord): WordExample[] {
  return (w.examples ?? []).filter(
    (ex) =>
      ex.japaneseWithKanji.trim().length > 0 ||
      ex.japaneseWithHiragana.trim().length > 0 ||
      ex.mm.trim().length > 0,
  );
}
