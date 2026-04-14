import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { DictionaryWord } from "@/types/dictionary-word";
import {
  getPrimaryHeadword,
  getReadingLine,
  splitMeanings,
} from "../utils/display-word";
import { getValidExamples } from "../utils/examples";
import { inferPartOfSpeech } from "../utils/infer-part-of-speech";

type WordDetailProps = {
  word: DictionaryWord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WordDetail({ word, open, onOpenChange }: WordDetailProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const side = isDesktop ? "right" : "bottom";

  if (!word) {
    return null;
  }

  const primary = getPrimaryHeadword(word);
  const reading = getReadingLine(word);
  const meanings = splitMeanings(word.mm);
  const pos = inferPartOfSpeech(word);
  const examples = getValidExamples(word);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        showCloseButton
        className={sheetClassName(side)}
      >
        <SheetHeader className="border-border/80 border-b px-4 pb-4 text-left">
          <SheetTitle className="font-heading text-xl leading-tight tracking-tight">
            {primary}
          </SheetTitle>
          {reading && reading !== primary ? (
            <p className="text-muted-foreground text-sm">{reading}</p>
          ) : null}
          <SheetDescription className="font-mono text-muted-foreground text-sm tracking-wide">
            {word.romaji}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="max-h-[calc(min(92dvh,860px)-8rem)] md:max-h-[calc(100vh-6rem)]">
          <div className="space-y-6 px-4 py-4">
            <section>
              <h3 className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Part of speech
              </h3>
              <p className="text-foreground text-sm">{pos}</p>
            </section>

            <section>
              <h3 className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Myanmar meanings
              </h3>
              <ul className="myanmar-text list-inside list-disc space-y-1.5 text-base leading-relaxed">
                {meanings.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </section>

            {examples.length > 0 ? (
              <section>
                <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Example sentences
                </h3>
                <ul className="space-y-4">
                  {examples.map((ex, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm"
                    >
                      {ex.kanjiSentance.trim() ? (
                        <p className="mb-1 font-medium">{ex.kanjiSentance}</p>
                      ) : null}
                      {ex.hiraSentance.trim() ? (
                        <p className="mb-1 text-muted-foreground">
                          {ex.hiraSentance}
                        </p>
                      ) : null}
                      {ex.mmSentance.trim() ? (
                        <p className="myanmar-text text-muted-foreground leading-relaxed">
                          {ex.mmSentance}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function sheetClassName(side: "right" | "bottom") {
  return cn(
    "gap-0 p-0 sm:max-w-none",
    side === "right" && "h-full w-full max-w-lg md:max-w-xl",
    side === "bottom" && "h-[min(92dvh,860px)] rounded-t-2xl border-t",
  );
}
