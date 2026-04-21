import { cn } from "@/lib/utils";

type ListBottomFadeProps = {
  /** `absolute` (default) fades the bottom of a positioned parent; `fixed` anchors to the viewport. */
  position?: "absolute" | "fixed";
  className?: string;
};

export function ListBottomFade({
  position = "absolute",
  className,
}: ListBottomFadeProps = {}) {
  return (
    <div
      className={cn(
        "pointer-events-none right-0 bottom-0 left-0 h-16 bg-linear-to-t from-background via-background/80 to-transparent",
        position === "fixed" ? "fixed" : "absolute",
        className,
      )}
      aria-hidden
    />
  );
}
