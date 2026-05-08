import { ArrowLeft, BookOpen, Check, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReadingDetail } from "@/api/reading/query";
import { ApiErrorState } from "@/components/api-error-state";
import { cn } from "@/lib/utils";

export default function ReadingDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const numericId = Number(idParam);
  const validId = Number.isFinite(numericId) ? numericId : undefined;

  const {
    data: passage,
    isLoading,
    isError,
    refetch,
  } = useReadingDetail(validId);

  // picked answer index per question, keyed by question index
  const [picked, setPicked] = useState<Record<number, number>>({});

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
        <div className="mb-6 h-4 w-24 skeleton rounded-md" />
        <div className="mb-6 flex items-center gap-3">
          <div className="size-10 shrink-0 skeleton rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-2/3 skeleton-accent rounded-md" />
            <div className="h-3 w-1/3 skeleton rounded-md" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
            <div className="space-y-2">
              <div className="h-4 w-full skeleton rounded-md" />
              <div className="h-4 w-11/12 skeleton-accent rounded-md" />
              <div className="h-4 w-3/4 skeleton rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          to="/reading"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Reading list
        </Link>
        <ApiErrorState
          title="Couldn't load this passage"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!passage) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          to="/reading"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Reading list
        </Link>
        <p className="text-muted-foreground text-sm">Passage not found.</p>
      </div>
    );
  }

  const levelLabel = passage.level.toUpperCase();
  const questions = passage.questions ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
      <Link
        to="/reading"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Reading list
      </Link>

      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              {passage.title}
            </h1>
            <p className="myanmar-text text-muted-foreground text-xs">
              ဖတ်ရှုခြင်း လေ့ကျင့်ခန်း
            </p>
          </div>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs">
          {levelLabel}
        </span>
      </div>

      <article className="space-y-4">
        <section className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
          <h2 className="sr-only">Passage</h2>
          <p className="text-foreground text-base leading-[1.75] tracking-wide">
            {passage.paragraph}
          </p>
        </section>

        {questions.length > 0 ? (
          <section className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
            <h2 className="mb-3 font-medium text-foreground text-sm">質問</h2>
            <ol className="space-y-6">
              {questions.map((q, qi) => {
                const answers = q.answers ?? [];
                const selected = picked[qi];
                const showFeedback = selected !== undefined;

                return (
                  <li key={qi} className="space-y-3">
                    <p className="text-foreground text-base leading-relaxed">
                      <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {qi + 1}
                      </span>
                      {q.question}
                    </p>

                    <ul className="space-y-2">
                      {answers.map((opt, ai) => {
                        const isPicked = selected === ai;
                        const isCorrect = opt.isCorrect;
                        const wrongPick = isPicked && !isCorrect;

                        return (
                          <li key={ai}>
                            <button
                              type="button"
                              disabled={showFeedback}
                              onClick={() =>
                                setPicked((prev) => ({ ...prev, [qi]: ai }))
                              }
                              className={cn(
                                "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                                "hover:border-primary/40 hover:bg-muted/40",
                                "disabled:pointer-events-none",
                                !showFeedback &&
                                  "border-border/80 bg-white dark:bg-muted/20",
                                showFeedback &&
                                  isCorrect &&
                                  "border-emerald-500/50 bg-emerald-500/10",
                                showFeedback &&
                                  wrongPick &&
                                  "border-destructive/50 bg-destructive/10",
                                showFeedback &&
                                  !isPicked &&
                                  !isCorrect &&
                                  "border-border/40 opacity-60",
                              )}
                            >
                              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground text-xs">
                                {String.fromCharCode(65 + ai)}
                              </span>
                              <span className="flex-1 leading-relaxed">
                                {opt.answer}
                              </span>
                              {showFeedback && isCorrect ? (
                                <Check
                                  className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                                  aria-hidden
                                />
                              ) : null}
                              {showFeedback && wrongPick ? (
                                <X
                                  className="size-5 shrink-0 text-destructive"
                                  aria-hidden
                                />
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}
      </article>
    </div>
  );
}
