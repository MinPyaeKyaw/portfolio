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
    <ScrollArea className="h-[min(60vh,520px)] md:h-[min(65vh,560px)]">
      <ul className="space-y-3 py-1" role="list">
        {words.map((w) => {
          const primary = getPrimaryHeadword(w);
          const reading = getReadingLine(w);
          const snippet = snippetText(w.mm, 80);
          return (
            <li key={w.id}>
              <Link
                to={`/dictionary/${w.id}`}
                className="flex w-full flex-col gap-0.5 rounded-xl bg-muted/40 px-4 py-3.5 text-left transition-colors hover:bg-muted/65 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}
