import { useCallback, useRef } from "react";
import { BookOpen, Home, Layers } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BrandLinkToHome } from "@/components/brand-lockup";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-muted text-foreground"
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  );

const mobileTabClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "group relative z-10 flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-xl px-2 py-1 text-[10px] font-medium transition-all duration-200",
    isActive ? "text-white" : "text-muted-foreground active:scale-[0.98]",
  );

export default function RootLayout() {
  const { pathname } = useLocation();
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeTabIndex = pathname.startsWith("/dictionary")
    ? 1
    : pathname.startsWith("/kanji")
      ? 2
      : 0;

  const playTabClickSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(720, now);
      oscillator.frequency.exponentialRampToValueAtTime(560, now + 0.035);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.018, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.045);
    } catch {
      // Best-effort sound effect: ignore audio failures silently.
    }
  }, []);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-[3.75rem] flex-nowrap items-center justify-between gap-3 border-border border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <BrandLinkToHome />
        <div className="flex items-center gap-1 md:gap-2">
          <nav className="hidden flex-wrap gap-1 md:flex" aria-label="Main">
            <NavLink to="/dictionary" className={navClass}>
              Dictionary
            </NavLink>
            <NavLink to="/kanji" className={navClass}>
              Kanji
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main
        className={cn(
          "flex-1",
          "pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0",
        )}
      >
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-3 z-50 px-3 pb-[env(safe-area-inset-bottom,0px)] md:hidden">
        <div className="relative mx-auto flex max-w-lg items-center rounded-2xl border border-border/80 bg-background/85 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div
            className="absolute top-1 bottom-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-xl bg-primary shadow-[0_6px_16px_rgba(233,46,105,0.35)] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${activeTabIndex * 100}%)` }}
            aria-hidden
          />
          <NavLink to="/" end className={mobileTabClass} onClick={playTabClickSound}>
            {({ isActive }) => (
              <span className="flex flex-col items-center gap-0.5">
                <Home
                  className={cn(
                    "size-[18px] shrink-0 transition-transform duration-200",
                    isActive
                      ? "stroke-[2.5] scale-105"
                      : "group-active:scale-95",
                  )}
                  aria-hidden
                />
                <span>Home</span>
              </span>
            )}
          </NavLink>
          <NavLink
            to="/dictionary"
            className={mobileTabClass}
            onClick={playTabClickSound}
          >
            {({ isActive }) => (
              <span className="flex flex-col items-center gap-0.5">
                <BookOpen
                  className={cn(
                    "size-[18px] shrink-0 transition-transform duration-200",
                    isActive
                      ? "stroke-[2.5] scale-105"
                      : "group-active:scale-95",
                  )}
                  aria-hidden
                />
                <span>Dictionary</span>
              </span>
            )}
          </NavLink>
          <NavLink
            to="/kanji"
            className={mobileTabClass}
            onClick={playTabClickSound}
          >
            {({ isActive }) => (
              <span className="flex flex-col items-center gap-0.5">
                <Layers
                  className={cn(
                    "size-[18px] shrink-0 transition-transform duration-200",
                    isActive
                      ? "stroke-[2.5] scale-105"
                      : "group-active:scale-95",
                  )}
                  aria-hidden
                />
                <span>Kanji</span>
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
