import { ArrowLeft, ChevronRight, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/search-bar";
import { cn } from "@/lib/utils";
import type { GrammarItem } from "@/types/grammar";
import { grammer } from "@/utils/grammer";

const items = grammer as GrammarItem[];

const LEVELS = ["all", "n5", "n4", "n3", "n2", "n1"] as const;
type LevelFilter = (typeof LEVELS)[number];

export default function GrammarListPage() {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byLevel =
      level === "all"
        ? items
        : items.filter((p) => p.level.toLowerCase() === level);

    const q = query.trim().toLowerCase();
    if (!q) return byLevel;

    return byLevel.filter((g) =>
      [g.jpTitle, g.mmTitle, g.structure, g.mmExplanation]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [level, query]);

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
            <FileText className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              Grammar
            </h1>
            <p className="text-muted-foreground text-xs">
              သဒ္ဒါ — အဆင့်အလိုက် ရွေးပြီး လေ့လာပါ
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
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "border-transparent bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(233,46,105,0.35)]"
                      : "border-border/70 bg-white text-muted-foreground hover:border-primary/35 hover:shadow-md dark:bg-card",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-2 mt-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search grammar…"
            aria-label="Grammar search"
          />
        </div>

        <p className="mt-3 text-muted-foreground text-xs">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="h-full min-h-0 overflow-y-auto overscroll-contain pb-6 [-webkit-overflow-scrolling:touch]">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 px-4 py-12 text-center">
              <p className="text-muted-foreground text-sm">
                No grammar items for this level yet.
              </p>
            </div>
          ) : (
            <ul className="space-y-2 pb-1" role="list">
              {filtered.map((g: GrammarItem) => (
                <li key={g.id}>
                  <Link
                    to={`/grammar/${g.id}`}
                    className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:border-primary/35 hover:shadow-md dark:bg-card"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-muted-foreground text-[10px] uppercase tracking-wide">
                          {g.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-heading text-foreground text-base font-medium leading-snug tracking-tight">
                        {g.jpTitle}
                      </p>
                      <p className="myanmar-text mt-1 text-muted-foreground text-sm leading-relaxed">
                        {g.mmTitle}
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
    </div>
  );
}
