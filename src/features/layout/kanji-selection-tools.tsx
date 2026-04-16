import { useEffect, useState } from "react";
import { Copy, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { KanjiLearningItem } from "@/types/kanji-learning";
import { kanji as rawKanji } from "@/utils/kanji";

const kanjiItems = rawKanji as KanjiLearningItem[];

type SelectionState = {
  text: string;
  rect: DOMRect;
};

function getSelectionState(): SelectionState | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const text = selection.toString().trim();
  if (!text) return null;

  // Only react to short pure-kanji selections (avoid huge blocks / sentences).
  if (text.length === 0 || text.length > 3) return null;

  // Basic CJK Unified Ideographs range check.
  if (![...text].every((ch) => /\p{Script=Han}/u.test(ch))) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) return null;

  return { text, rect };
}

function findKanjiDetail(text: string): KanjiLearningItem | undefined {
  // Prefer exact single-character match; if not found, fall back to contains.
  const trimmed = text.trim();
  const exact = kanjiItems.find((item) => item.kanji === trimmed);
  if (exact) return exact;
  return kanjiItems.find((item) => trimmed.includes(item.kanji));
}

export function KanjiSelectionTools() {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [dialogItem, setDialogItem] = useState<KanjiLearningItem | null>(null);

  useEffect(() => {
    const handlePointerUp = () => {
      const state = getSelectionState();
      setSelection(state);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelection(null);
        setDialogItem(null);
        return;
      }
      const state = getSelectionState();
      setSelection(state);
    };

    const clearOnScroll = () => {
      setSelection(null);
    };

    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("scroll", clearOnScroll, true);

    return () => {
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("scroll", clearOnScroll, true);
    };
  }, []);

  const handleCopy = async () => {
    if (!selection) return;
    try {
      await navigator.clipboard.writeText(selection.text);
    } catch {
      // Ignore clipboard failures; tooltip will simply stay open.
    }
    setSelection(null);
  };

  const handleSearch = () => {
    if (!selection) return;
    const item = findKanjiDetail(selection.text);
    if (item) {
      setDialogItem(item);
    }
    setSelection(null);
  };

  if (!selection) {
    return (
      <Dialog open={!!dialogItem} onOpenChange={(open) => !open && setDialogItem(null)}>
        {dialogItem ? (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <span className="font-heading text-3xl">{dialogItem.kanji}</span>
                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {dialogItem.level}
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">{dialogItem.hiragana}</p>
                <p className="myanmar-text mt-1 text-sm text-muted-foreground">
                  {dialogItem.meaning}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Kun-yomi
                  </p>
                  <p className="text-sm">{dialogItem.kunYomi}</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    On-yomi
                  </p>
                  <p className="text-sm">{dialogItem.onYomi}</p>
                </div>
              </div>
              {dialogItem.others?.length ? (
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Example words
                  </p>
                  <ul className="space-y-1.5">
                    {dialogItem.others.slice(0, 4).map((ex) => (
                      <li
                        key={`${dialogItem.id}-${ex.kanji}-${ex.hiragana}`}
                        className="rounded-lg bg-muted/40 px-2.5 py-1.5"
                      >
                        <p className="font-heading text-sm leading-none text-foreground">
                          {ex.kanji}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{ex.hiragana}</p>
                        <p className="myanmar-text mt-0.5 text-[13px] leading-snug text-muted-foreground">
                          {ex.meaning}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    );
  }

  const { rect } = selection;
  const top = rect.top + window.scrollY - 40;
  const left = rect.left + window.scrollX + rect.width / 2;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[48]"
        aria-hidden
        onMouseDown={(e) => {
          // Allow clicks to pass through except on the tooltip itself.
          e.preventDefault();
        }}
      />
      <div
        className="fixed z-[49] -translate-x-1/2 rounded-full border border-border/80 bg-background px-1.5 py-0.5 shadow-md"
        style={{ top: Math.max(top, 8), left: Math.min(Math.max(left, 24), window.innerWidth - 24) }}
      >
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Copy className="size-3.5" aria-hidden />
            <span>Copy</span>
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="size-3.5" aria-hidden />
            <span>Search</span>
          </button>
        </div>
      </div>
      <Dialog open={!!dialogItem} onOpenChange={(open) => !open && setDialogItem(null)}>
        {dialogItem ? (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <span className="font-heading text-3xl">{dialogItem.kanji}</span>
                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {dialogItem.level}
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">{dialogItem.hiragana}</p>
                <p className="myanmar-text mt-1 text-sm text-muted-foreground">
                  {dialogItem.meaning}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Kun-yomi
                  </p>
                  <p className="text-sm">{dialogItem.kunYomi}</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    On-yomi
                  </p>
                  <p className="text-sm">{dialogItem.onYomi}</p>
                </div>
              </div>
              {dialogItem.others?.length ? (
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Example words
                  </p>
                  <ul className="space-y-1.5">
                    {dialogItem.others.slice(0, 4).map((ex) => (
                      <li
                        key={`${dialogItem.id}-${ex.kanji}-${ex.hiragana}`}
                        className="rounded-lg bg-muted/40 px-2.5 py-1.5"
                      >
                        <p className="font-heading text-sm leading-none text-foreground">
                          {ex.kanji}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{ex.hiragana}</p>
                        <p className="myanmar-text mt-0.5 text-[13px] leading-snug text-muted-foreground">
                          {ex.meaning}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}

