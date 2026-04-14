import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DictionaryWord } from "@/types/dictionary-word";
import { getValidExamples } from "./utils/examples";
import {
  getPrimaryHeadword,
  getReadingLine,
  splitMeanings,
} from "./utils/display-word";
import { inferPartOfSpeech } from "./utils/infer-part-of-speech";

export default function DictionaryWordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lexicon, setLexicon] = useState<DictionaryWord[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("@/utils/words")
      .then((module) => {
        if (!cancelled) {
          setLexicon(module.words as DictionaryWord[]);
        }
      })
      .catch(() => {
        if (!cancelled) setLexicon([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const word = useMemo(() => {
    if (!lexicon) return null;
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return undefined;
    return lexicon.find((item) => item.id === numericId);
  }, [id, lexicon]);

  if (lexicon === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-muted-foreground">
        Loading word details...
      </div>
    );
  }

  if (!word) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-4">
        <Link
          to="/dictionary"
          className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
        >
          <ArrowLeft aria-hidden />
          Back to Dictionary
        </Link>
        <p className="text-muted-foreground text-sm">Word not found.</p>
      </div>
    );
  }

  const primary = getPrimaryHeadword(word);
  const reading = getReadingLine(word);
  const meanings = splitMeanings(word.mm);
  const pos = inferPartOfSpeech(word);
  const examples = getValidExamples(word);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8">
      <Link
        to="/dictionary"
        className={cn(buttonVariants({ variant: "outline" }), "mb-4 w-fit")}
      >
        <ArrowLeft aria-hidden />
        Back to Dictionary
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <header className="border-b border-border/80 px-4 py-4">
          <h1 className="font-heading text-2xl tracking-tight">{primary}</h1>
          {reading && reading !== primary ? (
            <p className="text-muted-foreground text-sm">{reading}</p>
          ) : null}
          <p className="font-mono text-muted-foreground text-sm">{word.romaji}</p>
        </header>

        <ScrollArea className="max-h-[calc(100vh-14rem)]">
          <div className="space-y-6 px-4 py-4">
            <section>
              <h2 className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
                Part of speech
              </h2>
              <p className="text-sm">{pos}</p>
            </section>

            <section>
              <h2 className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
                Myanmar meanings
              </h2>
              <ul className="myanmar-text list-inside list-disc space-y-1.5 text-base leading-relaxed">
                {meanings.map((meaning, index) => (
                  <li key={index}>{meaning}</li>
                ))}
              </ul>
            </section>

            {examples.length > 0 ? (
              <section>
                <h2 className="mb-3 text-muted-foreground text-xs uppercase tracking-wider">
                  Example sentences
                </h2>
                <ul className="space-y-4">
                  {examples.map((example, index) => (
                    <li
                      key={index}
                      className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm"
                    >
                      {example.kanjiSentance.trim() ? (
                        <p className="mb-1 font-medium">{example.kanjiSentance}</p>
                      ) : null}
                      {example.hiraSentance.trim() ? (
                        <p className="mb-1 text-muted-foreground">{example.hiraSentance}</p>
                      ) : null}
                      {example.mmSentance.trim() ? (
                        <p className="myanmar-text text-muted-foreground leading-relaxed">
                          {example.mmSentance}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
