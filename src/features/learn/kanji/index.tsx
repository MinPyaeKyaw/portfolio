import { ArrowLeft, ChevronRight, Languages, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ListBottomFade } from "@/components/list-bottom-fade";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { KanjiLearningItem } from "@/types/kanji-learning";
import { kanji } from "@/utils/kanji";

const kanjiItems = kanji as KanjiLearningItem[];
const LEVELS = ["all", "n5", "n4", "n3", "n2", "n1"] as const;
type LevelFilter = (typeof LEVELS)[number];

export default function KanjiLearningPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<LevelFilter>("all");

  const filtered = useMemo(() => {
    const byLevel =
      level === "all"
        ? kanjiItems
        : kanjiItems.filter((item) => item.level.toLowerCase() === level);

    const q = query.trim().toLowerCase();
    if (!q) return byLevel;

    return byLevel.filter((item) =>
      [
        item.kanji,
        item.level,
        item.hiragana,
        item.meaning,
        item.kunYomi,
        item.onYomi,
        ...item.others.map((o) => `${o.kanji} ${o.hiragana} ${o.meaning}`),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [level, query]);

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pt-4 md:pb-12 md:pt-8">
      <div className="shrink-0">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Learn
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Languages className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              Kanji Learning
            </h1>
            <p className="text-muted-foreground text-xs">
              Kanji ကို ဖတ်နည်း၊ အဓိပ္ပါယ်နှင့် ဥပမာစကားလုံးများဖြင့် လေ့လာပါ
            </p>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
            Level
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
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

          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kanji, reading, meaning…"
              className="h-11 rounded-full border-border/80 bg-card pl-10 pr-3 text-base focus-visible:border-primary focus-visible:ring-0 md:h-10 md:text-sm"
              autoComplete="off"
              spellCheck={false}
              aria-label="Kanji search"
            />
          </div>
        </div>

        <p className="mb-3 text-muted-foreground text-xs">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="h-full min-h-0 overflow-y-auto overscroll-contain pb-6 [-webkit-overflow-scrolling:touch]">
          <ul className="grid grid-cols-2 gap-3" role="list">
            {filtered.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/learn/kanji/${item.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-border/70 bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:border-primary/35 hover:shadow-md dark:bg-card"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="font-heading text-3xl leading-none">
                      {item.kanji}
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <span className="mb-1 w-fit rounded-md bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
                    {item.level.toUpperCase()}
                  </span>
                  <p className="text-muted-foreground text-xs">
                    {item.hiragana}
                  </p>
                  <p className="myanmar-text mt-1 line-clamp-2 text-sm leading-relaxed text-foreground">
                    {item.meaning}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ListBottomFade />
      </div>
    </div>
  );
}
