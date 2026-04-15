import { ArrowLeft, Languages } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import type { KanjiLearningItem } from "@/types/kanji-learning";
import { kanji } from "@/utils/kanji";

const kanjiItems = kanji as KanjiLearningItem[];

function getKanjiById(id: number): KanjiLearningItem | undefined {
  return kanjiItems.find((item) => item.id === id);
}

export default function KanjiLearningDetailPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const item = useMemo(() => {
    if (!Number.isFinite(numericId)) return undefined;
    return getKanjiById(numericId);
  }, [numericId]);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
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

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
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
          <p className="myanmar-text mt-1 text-base text-foreground">{item.meaning}</p>
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm dark:bg-card">
          <h2 className="mb-2 font-medium text-foreground text-sm">Readings</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/35 p-3">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Kun-yomi</p>
              <p className="text-sm">{item.kunYomi}</p>
            </div>
            <div className="rounded-xl bg-muted/35 p-3">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">On-yomi</p>
              <p className="text-sm">{item.onYomi}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm dark:bg-card">
          <h2 className="mb-3 font-medium text-foreground text-sm">Example words</h2>
          <ul className="space-y-2">
            {item.others.map((entry, index) => (
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
      </div>
    </div>
  );
}
