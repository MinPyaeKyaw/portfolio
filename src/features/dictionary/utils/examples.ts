import type { DictionaryWord, WordExample } from "@/types/dictionary-word";

export function getValidExamples(w: DictionaryWord): WordExample[] {
  return (w.examples ?? []).filter(
    (ex) =>
      ex.kanjiSentance.trim().length > 0 ||
      ex.hiraSentance.trim().length > 0 ||
      ex.mmSentance.trim().length > 0,
  );
}
