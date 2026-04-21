import { useState } from "react";
import { cn } from "@/lib/utils";
import type { KanaScript } from "@/types/kana";
import { kanaSections } from "@/utils/kana";

interface KanaChartProps {
  script: KanaScript;
}

export function KanaChart({ script }: KanaChartProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {kanaSections.map((section) => (
        <section
          key={section.id}
          className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm dark:bg-card"
        >
          <div className="mb-3">
            <h2 className="font-heading text-foreground text-sm font-semibold">
              {section.title}
            </h2>
            <p className="myanmar-text mt-0.5 text-muted-foreground text-xs">
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {section.rows.flatMap((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const cellKey = `${section.id}-${rowIndex}-${colIndex}`;
                if (!cell) {
                  return (
                    <div
                      key={cellKey}
                      className="aspect-square rounded-xl border border-dashed border-border/40"
                      aria-hidden
                    />
                  );
                }
                const character = cell[script];
                const isSelected = selectedKey === cellKey;
                return (
                  <button
                    key={cellKey}
                    type="button"
                    onClick={() =>
                      setSelectedKey((prev) =>
                        prev === cellKey ? null : cellKey,
                      )
                    }
                    className={cn(
                      "group flex aspect-square flex-col items-center justify-center rounded-xl border bg-muted/20 px-1 transition-all",
                      isSelected
                        ? "border-transparent bg-primary text-primary-foreground shadow-[0_6px_18px_rgba(233,46,105,0.35)]"
                        : "border-border/60 hover:-translate-y-px hover:border-primary/35 hover:shadow-md",
                    )}
                    aria-pressed={isSelected}
                    aria-label={`${character} — ${cell.romaji}`}
                  >
                    <span
                      className={cn(
                        "font-heading text-2xl leading-none md:text-3xl",
                        isSelected ? "" : "text-foreground",
                      )}
                    >
                      {character}
                    </span>
                    <span
                      className={cn(
                        "mt-1 text-[10px] uppercase tracking-wide md:text-xs",
                        isSelected
                          ? "text-primary-foreground/85"
                          : "text-muted-foreground",
                      )}
                    >
                      {cell.romaji}
                    </span>
                  </button>
                );
              }),
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
