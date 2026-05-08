import { useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUGGESTED_INTERESTS } from "../utils/constants";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
};

export function InterestsPicker({ value, onChange, disabled }: Props) {
  const [draft, setDraft] = useState("");

  function toggle(interest: string) {
    if (value.includes(interest)) {
      onChange(value.filter((i) => i !== interest));
    } else {
      onChange([...value, interest]);
    }
  }

  function addCustom() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (value.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, trimmed]);
    setDraft("");
  }

  function onDraftKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  }

  const allOptions = Array.from(new Set([...SUGGESTED_INTERESTS, ...value]));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {allOptions.map((interest) => {
          const active = value.includes(interest);
          return (
            <Button
              key={interest}
              type="button"
              variant={active ? "default" : "outline"}
              size="sm"
              disabled={disabled}
              onClick={() => toggle(interest)}
              aria-pressed={active}
            >
              {interest}
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onDraftKeyDown}
          placeholder="Add another interest"
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={disabled || draft.trim().length === 0}
          onClick={addCustom}
        >
          <Plus aria-hidden />
          Add
        </Button>
      </div>
    </div>
  );
}
