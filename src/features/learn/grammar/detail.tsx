import { ArrowLeft, FileText } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import type { GrammarItem } from "@/types/grammar";
import { grammer } from "@/utils/grammer";

const items = grammer as GrammarItem[];

function itemById(id: number): GrammarItem | undefined {
  return items.find((p) => p.id === id);
}

export default function GrammarDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const numericId = Number(idParam);
  const g = useMemo(() => {
    if (!Number.isFinite(numericId)) return undefined;
    return itemById(numericId);
  }, [numericId]);

  if (!g) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          to="/grammar"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Grammar list
        </Link>
        <p className="text-muted-foreground text-sm">Grammar item not found.</p>
      </div>
    );
  }

  const levelLabel = g.level.toUpperCase();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
      <Link
        to="/grammar"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Grammar list
      </Link>

      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              {g.jpTitle}
            </h1>
            <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
              {g.mmTitle}
            </p>
            <p className="mt-2 text-muted-foreground text-xs">သဒ္ဒါ လေ့လာမှု</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs">
          {levelLabel}
        </span>
      </div>

      <article className="space-y-4">
        <section className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
          <h2 className="mb-2 font-medium text-foreground text-sm">Structure</h2>
          <p className="font-mono text-foreground text-sm leading-relaxed">
            {g.structure}
          </p>
        </section>

        <section className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
          <h2 className="mb-2 font-medium text-foreground text-sm">အကျဉ်း</h2>
          <p className="myanmar-text text-foreground text-base leading-relaxed">
            {g.mmExplanation}
          </p>
        </section>

        <section className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm dark:bg-card">
          <h2 className="mb-3 font-medium text-foreground text-sm">ဥပမာများ</h2>
          <ul className="space-y-4">
            {g.examples.map((ex, i) => (
              <li
                key={i}
                className="border-border/60 border-b pb-4 last:border-0 last:pb-0"
              >
                <p className="text-foreground text-base leading-relaxed tracking-wide">
                  {ex.jp}
                </p>
                <p className="myanmar-text mt-2 text-muted-foreground text-sm leading-relaxed">
                  {ex.mm}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
