import { useState } from "react";
import { useDictionaryList } from "@/api/dictionary/query";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { EmptyState } from "./components/empty-state";
import { SearchBar } from "@/components/search-bar";
import { ListSkeleton } from "@/components/list-skeleton";
import { ApiErrorState } from "@/components/api-error-state";
import { WordList } from "./components/word-list";
import { MAX_DICTIONARY_RESULTS } from "./utils/filter-dictionary-words";

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  const trimmed = debouncedQuery.trim();
  const hasQuery = trimmed.length > 0;

  const { data, isLoading, isError, refetch } = useDictionaryList({
    page: 0,
    size: MAX_DICTIONARY_RESULTS,
    keyword: trimmed || undefined,
  });

  // Only treat the API as "the source" when the user has actually typed.
  const items = hasQuery ? (data?.data ?? []) : [];
  const showHint = !hasQuery;
  const showEmpty = hasQuery && !isLoading && !isError && items.length === 0;
  const isFetching = hasQuery && isLoading;

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pt-4 md:pt-8">
      <div className="shrink-0 pb-4">
        <div className="mb-2">
          <SearchBar
            value={query}
            onChange={setQuery}
            aria-label="Dictionary search"
          />
        </div>
        {hasQuery && !isLoading && !isError && items.length > 0 ? (
          <p className="mt-3 text-muted-foreground text-xs">
            Showing the first {MAX_DICTIONARY_RESULTS} matches. Refine your
            search for more specific results.
          </p>
        ) : null}
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="h-full min-h-0 overflow-y-auto overscroll-contain pb-6 [-webkit-overflow-scrolling:touch]">
          {showHint ? (
            <EmptyState />
          ) : isFetching ? (
            <ListSkeleton count={6} lines={2} />
          ) : isError ? (
            <ApiErrorState
              title="Couldn't load dictionary"
              onRetry={() => refetch()}
            />
          ) : showEmpty ? (
            <EmptyState title="No words found" />
          ) : (
            <WordList words={items} />
          )}
        </div>
      </div>
    </div>
  );
}
