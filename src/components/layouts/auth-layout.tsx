import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Tall forms: fill height, scroll inner content, fade at bottom (sign-up). */
  scrollable?: boolean;
};

const cardShellClass = cn(
  "flex w-full max-w-md flex-col gap-6",
  "bg-transparent py-2",
  "md:gap-4 md:rounded-xl md:border md:border-border/80 md:bg-card md:py-4 md:text-sm md:text-card-foreground md:ring-1 md:ring-border/60",
);

function AuthHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="space-y-1 px-0 md:px-4">
      <h1 className="font-heading text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
        {title}
      </h1>
      {description ? (
        <p className="text-pretty text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function AuthLayout({
  title,
  description,
  children,
  className,
  scrollable,
}: AuthLayoutProps) {
  if (scrollable) {
    return (
      <div className={cn("flex min-h-0 w-full flex-1 flex-col", className)}>
        <div className="relative min-h-0 flex-1">
          <div className="h-full min-h-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            <div className="flex min-h-full flex-col justify-center px-4 py-8 pb-10 md:py-14">
              <div className="mx-auto w-full max-w-md">
                <div className={cardShellClass}>
                  <AuthHeader title={title} description={description} />
                  <div className="space-y-4 px-0 md:px-4">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 md:py-14",
        className,
      )}
    >
      <div className={cardShellClass}>
        <AuthHeader title={title} description={description} />
        <div className="space-y-4 px-0 md:px-4">{children}</div>
      </div>
    </div>
  );
}
