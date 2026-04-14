import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import searchingAnimation from "@/assets/lottie/Searching.lottie?url";

type EmptyStateProps = {
  title?: string;
};

export function EmptyState({ title }: EmptyStateProps) {
  return (
    <div className="flex min-h-[56vh] flex-col items-center justify-center rounded-2xl bg-linear-to-b from-muted/40 to-transparent px-6 py-10 text-center">
      <div className="mx-auto mb-2 w-full max-w-[240px] shrink-0" aria-hidden>
        <DotLottieReact src={searchingAnimation} autoplay loop />
      </div>
      {title ? (
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      ) : null}
      <p className="mt-2 mx-auto max-w-sm text-muted-foreground text-sm leading-relaxed">
        Try a word in Hiragana, Katakana, Kanji, Romaji, or Myanmar.
      </p>
    </div>
  );
}
