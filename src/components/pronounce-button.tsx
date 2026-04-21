import { Loader2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/use-speech";
import { cn } from "@/lib/utils";

type PronounceButtonProps = {
  text: string;
  id?: string;
  lang?: string;
  rate?: number;
  size?: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  variant?: "ghost" | "outline" | "secondary" | "default";
  className?: string;
  label?: string;
};

export function PronounceButton({
  text,
  id,
  lang,
  rate,
  size = "icon-sm",
  variant = "ghost",
  className,
  label = "Play pronunciation",
}: PronounceButtonProps) {
  const { speak, speakingId, supported } = useSpeech();

  if (!supported) return null;

  const playingId = id ?? text;
  const isPlaying = speakingId === playingId;
  const trimmed = text.trim();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        "text-muted-foreground hover:text-foreground",
        isPlaying && "text-primary",
        className,
      )}
      aria-label={label}
      aria-pressed={isPlaying}
      disabled={!trimmed}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        speak(trimmed, { id: playingId, lang, rate });
      }}
    >
      {isPlaying ? (
        <Loader2 className="animate-spin" aria-hidden />
      ) : (
        <Volume2 aria-hidden />
      )}
    </Button>
  );
}
