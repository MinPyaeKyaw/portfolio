import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DictionaryWord } from "@/types/dictionary-word";
import {
  getPrimaryHeadword,
  getReadingLine,
  snippetText,
} from "../utils/display-word";

type WordListProps = {
  words: DictionaryWord[];
  onSelect: (word: DictionaryWord) => void;
};

export function WordList({ words, onSelect }: WordListProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-sm">
      <ScrollArea className="h-[min(60vh,520px)] md:h-[min(65vh,560px)]">
        <ul className="divide-y divide-border/80" role="list">
          {words.map((w) => {
            const primary = getPrimaryHeadword(w);
            const reading = getReadingLine(w);
            const snippet = snippetText(w.mm, 80);
            return (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => onSelect(w)}
                  className="flex w-full flex-col gap-0.5 px-4 py-3.5 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
                </button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </Card>
  );
}
