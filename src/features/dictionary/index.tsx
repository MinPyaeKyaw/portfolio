import { Loader2 } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { DictionaryWord } from "@/types/dictionary-word";
import { EmptyState } from "./components/empty-state";
import { SearchBar } from "./components/search-bar";
import { WordList } from "./components/word-list";
import {
  MAX_DICTIONARY_RESULTS,
  filterDictionaryWords,
} from "./utils/filter-dictionary-words";

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [lexicon, setLexicon] = useState<DictionaryWord[] | null>(null);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let cancelled = false;
    import("@/utils/words")
      .then((m) => {
        if (!cancelled) {
          setLexicon(m.words as DictionaryWord[]);
        }
      })
      .catch(() => {
        if (!cancelled) setLexicon([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { items: filtered, truncated } = useMemo(() => {
    if (!lexicon) {
      return { items: [] as DictionaryWord[], truncated: false };
    }
    return filterDictionaryWords(lexicon, deferredQuery);
  }, [lexicon, deferredQuery]);

  const hasQuery = query.trim().length > 0;
  const showHint = !hasQuery;
  const showEmpty = lexicon && hasQuery && filtered.length === 0;
  const isLoading = lexicon === null;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-6 md:pt-8">
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {isLoading ? (
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/80 bg-muted/20 py-20"
          role="status"
          aria-live="polite"
        >
          <Loader2
            className="size-8 animate-spin text-muted-foreground"
            aria-hidden
          />
          <p className="text-muted-foreground text-sm">Loading dictionary…</p>
        </div>
      ) : showHint ? (
        <EmptyState />
      ) : showEmpty ? (
        <EmptyState title="No words found" />
      ) : (
        <div className="space-y-3">
          {truncated ? (
            <p className="text-muted-foreground text-xs">
              Showing the first {MAX_DICTIONARY_RESULTS} matches. Refine your
              search for more specific results.
            </p>
          ) : null}
          <WordList words={filtered} />
        </div>
      )}
    </div>
  );
}
