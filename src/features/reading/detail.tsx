import { ArrowLeft, BookOpen, Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ReadingPassage } from "@/types/reading";
import { reading } from "@/utils/reading";

const passages = reading as ReadingPassage[];

function passageById(id: number): ReadingPassage | undefined {
  return passages.find((p) => p.id === id);
}

export default function ReadingDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const numericId = Number(idParam);
  const passage = useMemo(() => {
    if (!Number.isFinite(numericId)) return undefined;
    return passageById(numericId);
  }, [numericId]);

  const [picked, setPicked] = useState<number | null>(null);

  if (!passage) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
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

  return (
    <div className="mx-auto max-w-2xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
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
            <p className="text-muted-foreground text-xs">
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

        <section className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
          <h2 className="mb-3 font-medium text-foreground text-sm">質問</h2>
          <p className="text-foreground text-base leading-relaxed">
            {passage.question}
          </p>

          <ul className="mt-5 space-y-2">
            {passage.answers.map((opt, i) => {
              const isPicked = picked === i;
              const showFeedback = picked !== null;
              const isCorrect = opt.isCorrect;
              const wrongPick = isPicked && !isCorrect;

              return (
                <li key={i}>
                  <button
                    type="button"
                    disabled={picked !== null}
                    onClick={() => setPicked(i)}
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
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.answer}</span>
                    {showFeedback && isCorrect ? (
                      <Check
                        className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-hidden
                      />
                    ) : null}
                    {showFeedback && wrongPick && isPicked ? (
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
        </section>
      </article>
    </div>
  );
}
