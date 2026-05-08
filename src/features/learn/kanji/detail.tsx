import { ArrowLeft, Languages } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useKanjiDetail } from "@/api/kanji/query";
import { ApiErrorState } from "@/components/api-error-state";

export default function KanjiLearningDetailPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const validId = Number.isFinite(numericId) ? numericId : undefined;

  const { data: item, isLoading, isError, refetch } = useKanjiDetail(validId);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
        <div className="mb-4 h-4 w-24 skeleton rounded-md" />
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-1 size-10 shrink-0 skeleton rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="h-12 w-24 skeleton-accent rounded-md" />
            <div className="h-3 w-32 skeleton rounded-md" />
            <div className="h-4 w-40 skeleton-accent rounded-md" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm dark:bg-card"
            >
              <div className="mb-3 h-3 w-24 skeleton rounded-md" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="h-12 skeleton rounded-xl" />
                <div className="h-12 skeleton-accent rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          to="/learn/kanji"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Kanji list
        </Link>
        <ApiErrorState
          title="Couldn't load this kanji"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          to="/learn/kanji"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Kanji list
        </Link>
        <p className="text-muted-foreground text-sm">Kanji not found.</p>
      </div>
    );
  }

  const exampleWords = item.exampleWords ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
      <Link
        to="/learn/kanji"
        className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Kanji list
      </Link>

      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Languages className="size-5" aria-hidden />
        </div>
        <div>
          <h1 className="font-heading text-5xl leading-none md:text-6xl">{item.kanji}</h1>
          <p className="mt-2 text-muted-foreground text-sm">{item.hiragana}</p>
          <p className="myanmar-text mt-1 text-base text-foreground">{item.mm}</p>
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm dark:bg-card">
          <h2 className="mb-2 font-medium text-foreground text-sm">Readings</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/35 p-3">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Kun-yomi</p>
              <p className="text-sm">{item.kunYomi || "—"}</p>
            </div>
            <div className="rounded-xl bg-muted/35 p-3">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">On-yomi</p>
              <p className="text-sm">{item.onYomi || "—"}</p>
            </div>
          </div>
        </section>

        {exampleWords.length > 0 ? (
          <section className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm dark:bg-card">
            <h2 className="mb-3 font-medium text-foreground text-sm">Example words</h2>
            <ul className="space-y-2">
              {exampleWords.map((entry, index) => (
                <li
                  key={`${entry.kanji}-${index}`}
                  className="rounded-xl border border-border/70 bg-muted/20 p-3"
                >
                  <p className="font-heading text-lg leading-none">{entry.kanji}</p>
                  <p className="mt-1 text-muted-foreground text-xs">{entry.hiragana}</p>
                  <p className="myanmar-text mt-1 text-sm leading-relaxed">{entry.meaning}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
