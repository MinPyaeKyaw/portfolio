import { PronounceButton } from "@/components/pronounce-button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="relative">
      <ScrollArea className="h-[calc(100vh-230px)]">
        <ul className="space-y-3 py-1" role="list">
          {words.map((w) => {
            const primary = getPrimaryHeadword(w);
            const reading = getReadingLine(w);
            const snippet = snippetText(w.mm, 80);
            return (
              <li key={w.id} className="relative">
                <Link
                  to={`/dictionary/${w.id}`}
                  className="flex w-full flex-col gap-0.5 rounded-xl bg-white px-4 py-3.5 pr-14 text-left transition-colors hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:bg-muted/30 dark:hover:bg-muted/45"
                >
                  <span className="font-heading text-base font-medium tracking-tight text-foreground">
                    {primary}
                  </span>
                  {reading ? (
                    <span className="text-muted-foreground text-sm">
                      {reading}
                    </span>
                  ) : null}
                  <span className="myanmar-text line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {snippet}
                  </span>
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
      </ScrollArea>
    </div>
  );
}
