import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
};

export function SearchBar({
  value,
  onChange,
  id = "dictionary-search",
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
        placeholder="Search Hiragana, Katakana, Kanji, Romaji, or မြန်မာ…"
        className="h-11 rounded-xl border-border/80 bg-card pr-3 pl-10 text-base shadow-sm md:h-10 md:text-sm"
        autoComplete="off"
        spellCheck={false}
        aria-label="Dictionary search"
      />
    </div>
  );
}
