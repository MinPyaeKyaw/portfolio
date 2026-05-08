import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDictionaryDetail } from "@/api/dictionary/query";
import { ApiErrorState } from "@/components/api-error-state";
import { PronounceButton } from "@/components/pronounce-button";
import { getValidExamples } from "./utils/examples";
import {
  getPrimaryHeadword,
  getReadingLine,
  splitMeanings,
} from "./utils/display-word";
import { inferPartOfSpeech } from "./utils/infer-part-of-speech";

export default function DictionaryWordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const validId = Number.isFinite(numericId) ? numericId : undefined;

  const { data: word, isLoading, isError, refetch } = useDictionaryDetail(validId);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
        <div className="mb-4 h-4 w-32 skeleton rounded-md" />
        <div className="space-y-3 pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-4 dark:bg-muted/25"
            >
              <div className="mb-2 h-4 w-24 skeleton rounded-md" />
              <div className="h-5 w-2/3 skeleton-accent rounded-md" />
              <div className="mt-2 h-3 w-1/2 skeleton rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
        <Link
          to="/dictionary"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Dictionary
        </Link>
        <ApiErrorState
          title="Couldn't load this word"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!word) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
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
    <div className="mx-auto w-full max-w-3xl px-4 pb-0 pt-3 md:pb-10 md:pt-8">
      <Link
        to="/dictionary"
        className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to Dictionary
      </Link>

      <div className="space-y-3 pb-4">
        <section className="rounded-xl bg-white p-4 dark:bg-muted/30">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-heading text-2xl tracking-tight">{primary}</h1>
            <PronounceButton
              text={primary}
              id={`word-${word.id}-primary`}
              size="icon"
              variant="outline"
              label={`Play pronunciation of ${primary}`}
            />
          </div>
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

        {meanings.length > 0 ? (
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
        ) : null}

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
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm">{form.word}</p>
                    <PronounceButton
                      text={form.word}
                      id={`word-${word.id}-form-${form.name}`}
                      size="icon-xs"
                      label={`Play pronunciation of ${form.word}`}
                    />
                  </div>
                  {form.mm?.trim() ? (
                    <p className="myanmar-text mt-1 text-muted-foreground text-xs leading-relaxed">
                      {form.mm}
                    </p>
                  ) : null}
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
                  {example.jp.trim() ? (
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <p className="font-medium">{example.jp}</p>
                      <PronounceButton
                        text={example.jp}
                        id={`word-${word.id}-example-${index}`}
                        size="icon-xs"
                        rate={0.85}
                        label="Play example pronunciation"
                      />
                    </div>
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
