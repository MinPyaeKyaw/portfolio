import { PronounceButton } from "@/components/pronounce-button";
import type { DictionaryWord } from "@/types/dictionary-word";
import { Link } from "react-router-dom";
import {
  getPrimaryHeadword,
  getReadingLine,
  snippetText,
} from "../utils/display-word";

type WordListProps = {
  words: DictionaryWord[];
};

export function WordList({ words }: WordListProps) {
  return (
    <ul className="space-y-2 pb-1" role="list">
      {words.map((w) => {
        const primary = getPrimaryHeadword(w);
        const reading = getReadingLine(w);
        const snippet = snippetText(w.mm, 80);
        return (
          <li key={w.id} className="relative">
            <Link
              to={`/dictionary/${w.id}`}
              className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-4 pr-14 transition-all duration-200 hover:-translate-y-px hover:border-primary/35 hover:shadow-md dark:bg-card"
            >
              <div className="min-w-0 flex-1">
                <p className="font-heading text-foreground text-base font-medium leading-snug tracking-tight">
                  {primary}
                </p>
                {reading ? (
                  <p className="mt-1 text-muted-foreground text-sm">
                    {reading}
                  </p>
                ) : null}
                <p className="myanmar-text mt-1 line-clamp-2 text-muted-foreground text-sm leading-relaxed">
                  {snippet}
                </p>
              </div>
            </Link>
            <PronounceButton
              text={primary}
              id={`list-word-${w.id}`}
              className="absolute top-1/2 right-3 -translate-y-1/2"
              label={`Play pronunciation of ${primary}`}
            />
          </li>
        );
      })}
    </ul>
  );
}
