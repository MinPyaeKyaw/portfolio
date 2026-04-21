import { useCallback, useState } from "react";

type SpeakOptions = {
  id?: string;
  lang?: string;
  rate?: number;
  pitch?: number;
};

const isSpeechSynthesisSupported =
  typeof window !== "undefined" && "speechSynthesis" in window;

export function useSpeech() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const supported = isSpeechSynthesisSupported;

  const speak = useCallback((text: string, options?: SpeakOptions) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(trimmed);
    utterance.lang = options?.lang ?? "ja-JP";
    utterance.rate = options?.rate ?? 0.9;
    utterance.pitch = options?.pitch ?? 1;

    const id = options?.id ?? trimmed;
    // onstart is unreliable across browsers, so set immediately.
    setSpeakingId(id);
    utterance.onend = () =>
      setSpeakingId((current) => (current === id ? null : current));
    utterance.onerror = () =>
      setSpeakingId((current) => (current === id ? null : current));

    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, []);

  return { speak, cancel, speakingId, supported };
}
