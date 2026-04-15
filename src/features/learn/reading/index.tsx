import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ReadingPassage } from "@/types/reading";
import { reading } from "@/utils/reading";

const passages = reading as ReadingPassage[];

const LEVELS = ["all", "n5", "n4", "n3", "n2", "n1"] as const;
type LevelFilter = (typeof LEVELS)[number];

export default function ReadingListPage() {
  const [level, setLevel] = useState<LevelFilter>("all");

  const filtered = useMemo(() => {
    if (level === "all") return passages;
    return passages.filter((p) => p.level.toLowerCase() === level);
  }, [level]);

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4 md:pt-8">
      <div className="shrink-0 bg-background pb-4">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Learn
        </Link>

        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              Reading
            </h1>
            <p className="text-muted-foreground text-xs">
              ဖတ်ရှုခြင်း — အဆင့်အလိုက် ရွေးပြီး ဖတ်ပါ
            </p>
          </div>
        </div>

        <div className="mb-1">
          <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
            Level
          </p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((lv) => {
              const label = lv === "all" ? "All" : lv.toUpperCase();
              const active = level === lv;
              return (
                <button
                  key={lv}
                  type="button"
                  onClick={() => setLevel(lv)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(233,46,105,0.35)]"
                      : "bg-muted/80 text-muted-foreground hover:bg-muted",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-3 text-muted-foreground text-xs">
          {filtered.length} passage{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6 [-webkit-overflow-scrolling:touch]">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 px-4 py-12 text-center">
            <p className="text-muted-foreground text-sm">
              No passages for this level yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-2 pb-1" role="list">
            {filtered.map((p: ReadingPassage) => (
              <li key={p.id}>
                <Link
                  to={`/reading/${p.id}`}
                  className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:border-primary/35 hover:shadow-md dark:bg-card"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-muted-foreground text-[10px] uppercase tracking-wide">
                        {p.level.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-heading text-foreground text-base font-medium leading-snug tracking-tight">
                      {p.title}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
