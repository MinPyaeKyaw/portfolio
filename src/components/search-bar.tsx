import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DEFAULT_PLACEHOLDER =
  "Search Hiragana, Katakana, Kanji, Romaji, or မြန်မာ…";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  "aria-label"?: string;
};

export function SearchBar({
  value,
  onChange,
  id,
  placeholder = DEFAULT_PLACEHOLDER,
  "aria-label": ariaLabel = "Search",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-3"
        autoComplete="off"
        spellCheck={false}
        aria-label={ariaLabel}
      />
    </div>
  );
}
