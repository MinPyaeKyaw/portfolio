import { Button } from "@/components/ui/button";
import type { JapaneseLevel } from "@/api/user-info/types";
import { JAPANESE_LEVELS } from "../utils/constants";

type Props = {
  value: JapaneseLevel | undefined;
  onChange: (next: JapaneseLevel) => void;
  disabled?: boolean;
};

export function JapaneseLevelPicker({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {JAPANESE_LEVELS.map((opt) => {
        const active = value === opt.value;
        return (
          <Button
            key={opt.value}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}
