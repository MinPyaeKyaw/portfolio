import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  steps: { key: string; label: string }[];
  current: number;
};

export function SetupStepper({ steps, current }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center" role="list" aria-label="Setup progress">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <Fragment key={step.key}>
              <div
                role="listitem"
                aria-current={active ? "step" : undefined}
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-xs font-medium ring-1 transition-colors duration-200",
                  done && "bg-primary text-primary-foreground ring-primary",
                  active &&
                    "bg-primary/15 text-primary ring-primary/40 shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_12%,transparent)]",
                  !done &&
                    !active &&
                    "bg-muted text-muted-foreground ring-foreground/10",
                )}
              >
                {done ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              {i < steps.length - 1 ? (
                <div
                  className="mx-1.5 h-0.5 flex-1 overflow-hidden rounded-full bg-foreground/10"
                  aria-hidden
                >
                  <div
                    className={cn(
                      "h-full rounded-full bg-primary transition-[width] duration-300 ease-out",
                      done ? "w-full" : "w-0",
                    )}
                  />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step {current + 1} of {steps.length}
        </span>
        <span className="font-medium text-foreground">
          {steps[current]?.label}
        </span>
      </div>
    </div>
  );
}
