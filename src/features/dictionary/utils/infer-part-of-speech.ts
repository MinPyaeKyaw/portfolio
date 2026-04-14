import type { DictionaryWord } from "@/types/dictionary-word";

/**
 * Heuristic part-of-speech label (dataset has no explicit POS field).
 */
export function inferPartOfSpeech(w: DictionaryWord): string {
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
