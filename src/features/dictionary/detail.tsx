import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      <div className="mx-auto max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/80 bg-muted/20 py-20"
          role="status"
          aria-live="polite"
        >
          <Loader2
            className="size-8 animate-spin text-muted-foreground"
            aria-hidden
          />
          <p className="text-muted-foreground text-sm">Loading word details…</p>
        </div>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
        <Link
          to="/dictionary"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Dictionary
        </Link>
        <div className="rounded-xl bg-white p-4 text-muted-foreground text-sm dark:bg-muted/25">
          Word not found.
        </div>
      </div>
    );
  }

  const primary = getPrimaryHeadword(word);
  const reading = getReadingLine(word);
  const meanings = splitMeanings(word.mm);
  const pos = inferPartOfSpeech(word);
  const examples = getValidExamples(word);
  const forms = word.forms ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
      <Link
        to="/dictionary"
        className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to Dictionary
      </Link>

      <div className="space-y-3 pb-4">
        <section className="rounded-xl bg-white p-4 dark:bg-muted/30">
          <h1 className="font-heading text-2xl tracking-tight">{primary}</h1>
          {reading && reading !== primary ? (
            <p className="mt-1 text-muted-foreground text-sm">{reading}</p>
          ) : null}
          <p className="mt-1 font-mono text-muted-foreground text-sm">
            {word.romaji}
          </p>
          <p className="mt-3 inline-flex rounded-full bg-background/70 px-3 py-1 text-xs text-muted-foreground dark:bg-background/50">
            {pos}
          </p>
        </section>

        <section className="rounded-xl bg-white p-4 dark:bg-muted/25">
          <h2 className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
            Myanmar meanings
          </h2>
          <ul className="myanmar-text list-inside list-disc space-y-1.5 text-base leading-relaxed">
            {meanings.map((meaning, index) => (
              <li key={index}>{meaning}</li>
            ))}
          </ul>
        </section>

        {forms.length > 0 ? (
          <section className="rounded-xl bg-white p-4 dark:bg-muted/25">
            <h2 className="mb-3 text-muted-foreground text-xs uppercase tracking-wider">
              Forms
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {forms.map((form) => (
                <li
                  key={form.name}
                  className="rounded-lg bg-white/90 px-3 py-2 dark:bg-background/50"
                >
                  <p className="text-muted-foreground text-xs">{form.name}</p>
                  <p className="text-sm">{form.word}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {examples.length > 0 ? (
          <section className="rounded-xl bg-white p-4 dark:bg-muted/25">
            <h2 className="mb-3 text-muted-foreground text-xs uppercase tracking-wider">
              Example sentences
            </h2>
            <ul className="space-y-3">
              {examples.map((example, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-white/90 p-3 text-sm dark:bg-background/50"
                >
                  {example.japaneseWithKanji.trim() ? (
                    <p className="mb-1 font-medium">
                      {example.japaneseWithKanji}
                    </p>
                  ) : null}
                  {example.japaneseWithHiragana.trim() ? (
                    <p className="mb-1 text-muted-foreground">
                      {example.japaneseWithHiragana}
                    </p>
                  ) : null}
                  {example.mm.trim() ? (
                    <p className="myanmar-text text-muted-foreground leading-relaxed">
                      {example.mm}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
