import { AlertTriangle, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ApiErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

/**
 * Shared empty/error state for failed API loads.
 * Centered column layout that mirrors EmptyState's visual rhythm so the
 * loading → empty → error states feel like one family.
 */
export function ApiErrorState({
  title = "Something went wrong",
  description = "We couldn't load this just now. Please check your connection and try again.",
  onRetry,
  retryLabel = "Try again",
  className,
}: ApiErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-10 text-center",
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-1 ring-destructive/15"
      >
        <AlertTriangle className="size-6" strokeWidth={2.25} />
      </span>

      <div className="flex max-w-sm flex-col gap-1.5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            buttonVariants({ size: "sm" }),
            "group/cta mt-2 gap-2 overflow-hidden pl-3 pr-1 transition-[transform,filter] duration-200 hover:bg-primary hover:brightness-110 motion-reduce:transition-none",
          )}
        >
          <span className="relative z-10">{retryLabel}</span>
          <span
            aria-hidden
            className="relative z-10 inline-flex size-5 items-center justify-center rounded-full bg-primary-foreground/15 transition-all duration-300 group-hover/cta:bg-primary-foreground/25 motion-reduce:transition-none"
          >
            <RefreshCw
              className="size-3 transition-transform duration-500 group-hover/cta:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </button>
      ) : null}
    </div>
  );
}
