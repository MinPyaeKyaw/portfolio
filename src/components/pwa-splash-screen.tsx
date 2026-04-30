import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.svg";
import { BRAND_NAME } from "@/components/brand-lockup";
import { cn } from "@/lib/utils";

const SESSION_KEY = "myanhon-splash-shown";
const DISPLAY_MS = 2200;
const EXIT_ANIM_MS = 400;

export function PwaSplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) ? "hidden" : "visible";
    } catch {
      return "visible";
    }
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== "visible") return;

    timerRef.current = window.setTimeout(() => {
      setPhase("exiting");
    }, DISPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }

    fadeTimerRef.current = window.setTimeout(() => {
      setPhase("hidden");
    }, EXIT_ANIM_MS);

    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-background px-6",
        phase === "exiting" ? "splash-screen-exit" : "splash-screen-overlay",
      )}
      role="presentation"
      aria-hidden={phase === "exiting"}
    >
      <img
        src={logo}
        alt=""
        width={120}
        height={120}
        className="splash-screen-logo size-[120px] shrink-0 object-contain md:size-32"
        decoding="async"
      />
      <div className="flex max-w-sm flex-col items-center gap-2 text-center">
        <h1
          className={cn(
            "brand-text text-4xl font-semibold text-primary md:text-5xl",
            "splash-screen-title",
          )}
        >
          {BRAND_NAME}
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-sm leading-relaxed md:text-base",
            "splash-screen-slogan",
          )}
        >
          Your Japanese Learning Companion.
        </p>
      </div>
    </div>
  );
}
