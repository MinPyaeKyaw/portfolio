import type { DictionaryWord, WordLexicalType } from "@/types/dictionary-word";

const TYPE_LABELS: Partial<Record<WordLexicalType, string>> = {
  "verb-ru": "Verb · 一段動詞",
  "verb-u": "Verb · 五段動詞",
  "verb-irregular": "Verb · 不規則動詞",
  "i-adjective": "い-adjective · 形容詞",
  "na-adjective": "な-adjective · 形容動詞",
  noun: "Noun · 名詞",
  adverb: "Adverb · 副詞",
  particle: "Particle · 助詞",
  pronoun: "Pronoun · 代名詞",
  conjunction: "Conjunction · 接続詞",
  interjection: "Interjection · 感嘆詞",
};

/**
 * Part-of-speech label from the lexicon `type` field, with heuristics as fallback.
 */
export function inferPartOfSpeech(w: DictionaryWord): string {
  const fromType = TYPE_LABELS[w.type];
  if (fromType) return fromType;

  const h = w.hiragana.replace(/\s+/g, "");
  const k = w.kanji.trim();
  const kt = w.katakana.trim();

  if (/(ます|ません|ました|ましょう)$/.test(h)) {
    return "Verb · 動詞 (~ます)";
  }
  if (/(する|します)$/.test(h) || k.endsWith("する")) {
    return "Verb · する compound";
  }
  if (/(です|だ|である)$/.test(h)) {
    return "Copula · 断定";
  }
  if (k.endsWith("な") && h.endsWith("な") && h.length > 1) {
    return "な-adjective · 形容動詞";
  }
  if (!k.length && kt.length > 0) {
    return "Loanword · 外来語 (カタカナ)";
  }
  if (/^[をがのへとやかもに]$/.test(h)) {
    return "Particle · 助詞";
  }
  if (/(い|しい)$/.test(h) && h.length <= 6 && !h.includes(" ")) {
    return "い-adjective · 形容詞 (possible)";
  }
  return "Noun, phrase, or other · 名詞・語句など";
}
