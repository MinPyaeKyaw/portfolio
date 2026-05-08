import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Direction the element animates in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  /** As-tag for semantic wrappers. */
  as?: "div" | "section" | "article" | "header" | "footer";
  /**
   * When true (default) the reveal fires once and stays visible.
   * When false the reveal re-plays each time the element enters the viewport.
   */
  once?: boolean;
};

const fromClass: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ once });

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible
          ? "translate-x-0 translate-y-0 opacity-100 blur-0"
          : cn("opacity-0 blur-[2px]", fromClass[from]),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
