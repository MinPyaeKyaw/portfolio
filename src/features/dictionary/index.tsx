import { BookOpen, Loader2, Search } from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DictionaryWord } from "@/types/dictionary-word";
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
        <EmptyState
          icon={
            <BookOpen
              className="size-10 stroke-1 text-muted-foreground"
              aria-hidden
            />
          }
          title="Start searching"
          description="Type at least one character to filter the word list in real time."
        />
      ) : showEmpty ? (
        <EmptyState
          icon={
            <Search
              className="size-10 stroke-1 text-muted-foreground"
              aria-hidden
            />
          }
          title="No words found"
          description="Try different spelling, Romaji, or Myanmar keywords."
        />
      ) : (
        <div className="space-y-3">
          {truncated ? (
            <p className="text-muted-foreground text-xs">
              Showing the first {MAX_DICTIONARY_RESULTS} matches. Refine your
              search for more specific results.
            </p>
          ) : null}
          <WordList
            words={filtered}
          />
        </div>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 px-6 py-16 text-center"
      role="status"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted/60">
        {icon}
      </div>
      <h2 className="font-heading text-lg font-medium text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
