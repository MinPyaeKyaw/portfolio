/** Normalize text for case-insensitive, NFKC-safe substring search across scripts. */
export function normalizeForSearch(s: string): string {
  if (!s) return "";
  return s.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}
