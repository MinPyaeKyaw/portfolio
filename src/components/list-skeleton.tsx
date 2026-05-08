import { cn } from "@/lib/utils";

type ListCardSkeletonProps = {
  className?: string;
  /** Number of skeleton lines inside the card. */
  lines?: number;
};

/** Card shaped like the rounded-2xl bordered list items used across features. */
export function ListCardSkeleton({
  className,
  lines = 2,
}: ListCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-4 dark:bg-card",
        className,
      )}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="skeleton-accent h-4 w-12 rounded-md" />
        <div className="skeleton h-4 w-3/4 rounded-md" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 rounded-md",
              i % 2 === 0 ? "skeleton" : "skeleton-accent",
            )}
            style={{ width: `${60 + ((i * 13) % 30)}%` }}
          />
        ))}
      </div>
      <div className="skeleton mt-1 size-5 shrink-0 rounded-full" />
    </div>
  );
}

type ListSkeletonProps = {
  count?: number;
  lines?: number;
  className?: string;
};

export function ListSkeleton({
  count = 6,
  lines = 2,
  className,
}: ListSkeletonProps) {
  return (
    <ul
      className={cn("space-y-2 pb-1", className)}
      role="list"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <ListCardSkeleton lines={lines} />
        </li>
      ))}
    </ul>
  );
}

/** 2-column grid skeleton for the kanji learning list. */
export function GridSkeleton({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <ul
      className={cn("grid grid-cols-2 gap-3", className)}
      role="list"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-white p-4 dark:bg-card">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="skeleton-accent h-8 w-10 rounded-md" />
              <div className="skeleton size-4 rounded-full" />
            </div>
            <div className="skeleton mb-1 h-3 w-10 rounded-md" />
            <div className="skeleton-accent mt-1 h-3 w-3/4 rounded-md" />
            <div className="skeleton mt-2 h-3 w-2/3 rounded-md" />
          </div>
        </li>
      ))}
    </ul>
  );
}
