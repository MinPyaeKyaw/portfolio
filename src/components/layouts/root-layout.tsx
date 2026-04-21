import { useCallback, useRef } from "react";
import { BookOpen, GraduationCap, Layers, LogIn, LogOut } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BrandLinkToHome } from "@/components/brand-lockup";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/features/auth/use-auth";
import { cn } from "@/lib/utils";

/** Mobile pill: label/icon follow the sliding indicator index. */
const mobileTabClass = (tabIndex: number, activeTabIndex: number) =>
  cn(
    "group relative z-10 flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-2 py-1.5 text-[10px] font-medium transition-all duration-200",
    activeTabIndex === tabIndex
      ? "text-white"
      : "text-muted-foreground hover:text-foreground active:scale-[0.98]",
  );

/** Desktop: plain links; active state follows the same route index as the mobile pill. */
const desktopNavLinkClass = (tabIndex: number, activeTabIndex: number) =>
  cn(
    "relative z-10 flex-1 whitespace-nowrap px-3 py-2 text-center text-sm font-medium transition-colors duration-200",
    activeTabIndex >= 0 && activeTabIndex === tabIndex
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  );

/** Same slide motion as the mobile tab indicator. */
const tabIndicatorSlideClass = "transition-transform duration-300 ease-out";

const tabIndicatorGlowClass =
  "shadow-[0_6px_16px_rgba(233,46,105,0.35)]";

export default function RootLayout() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeTabIndex = pathname.startsWith("/dictionary")
    ? 1
    : pathname.startsWith("/kanji")
      ? 2
      : 0;

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-password";

  /** On auth routes, desktop tabs show no active segment (Learn/Dictionary/Kanji still visible). */
  const desktopTabIndex = isAuthRoute ? -1 : activeTabIndex;

  /** Routes where `main` is overflow-hidden so inner content scrolls (e.g. list + fade, sign-up). */
  const isScrollableListRoute =
    pathname === "/reading" ||
    pathname === "/grammar" ||
    pathname === "/learn/kanji" ||
    pathname === "/learn/hiragana" ||
    pathname === "/learn/katakana" ||
    pathname === "/sign-up";

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
    <div className="flex h-svh max-h-svh min-h-0 flex-col overflow-hidden bg-background">
      <header className="sticky top-0 z-40 flex h-[3.75rem] flex-nowrap items-center justify-between gap-3 border-border border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <BrandLinkToHome />
        <div className="flex items-center gap-1 md:gap-2">
          <nav className="relative hidden md:block" aria-label="Main">
            <div className="relative flex min-w-[220px]">
              {!isAuthRoute ? (
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-0 left-0 h-0.5 w-1/3 rounded-full bg-primary",
                    tabIndicatorSlideClass,
                  )}
                  style={{ transform: `translateX(${activeTabIndex * 100}%)` }}
                  aria-hidden
                />
              ) : null}
              <NavLink
                to="/"
                end
                className={() => desktopNavLinkClass(0, desktopTabIndex)}
              >
                Learn
              </NavLink>
              <NavLink
                to="/dictionary"
                className={() => desktopNavLinkClass(1, desktopTabIndex)}
              >
                Dictionary
              </NavLink>
              <NavLink
                to="/kanji"
                className={() => desktopNavLinkClass(2, desktopTabIndex)}
              >
                Kanji
              </NavLink>
            </div>
          </nav>
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-foreground md:hidden"
                onClick={logout}
                aria-label="Log out"
              >
                <LogOut className="size-[1.125rem]" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="hidden shrink-0 gap-1.5 transition-colors hover:border-primary/40 hover:bg-muted/80 md:inline-flex"
                onClick={logout}
              >
                <LogOut className="size-4" aria-hidden />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "shrink-0 text-foreground md:hidden",
                )}
                aria-label="Sign in"
              >
                <LogIn className="size-[1.125rem]" aria-hidden />
              </Link>
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "hidden shrink-0 gap-1.5 transition-colors hover:border-primary/40 hover:bg-muted/80 md:inline-flex",
                )}
              >
                <LogIn className="size-4" aria-hidden />
                Login
              </Link>
            </>
          )}
        </div>
      </header>

      <main
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          isScrollableListRoute ? "overflow-hidden" : "overflow-y-auto",
          isAuthRoute
            ? "pb-[env(safe-area-inset-bottom,0px)] md:pb-0"
            : "pb-[calc(3.9rem+env(safe-area-inset-bottom,0px))] md:pb-0",
        )}
      >
        <Outlet />
      </main>

      {!isAuthRoute ? (
      <nav className="fixed inset-x-0 bottom-3 z-50 px-3 pb-[env(safe-area-inset-bottom,0px)] md:hidden">
        <div className="relative mx-auto flex max-w-lg items-center rounded-full border border-border/80 bg-background/85 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div
            className={cn(
              "absolute top-1 bottom-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-primary",
              tabIndicatorSlideClass,
              tabIndicatorGlowClass,
            )}
            style={{ transform: `translateX(${activeTabIndex * 100}%)` }}
            aria-hidden
          />
          <NavLink
            to="/"
            end
            className={() => mobileTabClass(0, activeTabIndex)}
            onClick={playTabClickSound}
          >
            <span className="flex flex-col items-center gap-0.5">
              <GraduationCap
                className={cn(
                  "size-[18px] shrink-0 transition-transform duration-200",
                  activeTabIndex === 0
                    ? "stroke-[2.5] scale-105"
                    : "group-active:scale-95",
                )}
                aria-hidden
              />
              <span>Learn</span>
            </span>
          </NavLink>
          <NavLink
            to="/dictionary"
            className={() => mobileTabClass(1, activeTabIndex)}
            onClick={playTabClickSound}
          >
            <span className="flex flex-col items-center gap-0.5">
              <BookOpen
                className={cn(
                  "size-[18px] shrink-0 transition-transform duration-200",
                  activeTabIndex === 1
                    ? "stroke-[2.5] scale-105"
                    : "group-active:scale-95",
                )}
                aria-hidden
              />
              <span>Dictionary</span>
            </span>
          </NavLink>
          <NavLink
            to="/kanji"
            className={() => mobileTabClass(2, activeTabIndex)}
            onClick={playTabClickSound}
          >
            <span className="flex flex-col items-center gap-0.5">
              <Layers
                className={cn(
                  "size-[18px] shrink-0 transition-transform duration-200",
                  activeTabIndex === 2
                    ? "stroke-[2.5] scale-105"
                    : "group-active:scale-95",
                )}
                aria-hidden
              />
              <span>Kanji</span>
            </span>
          </NavLink>
        </div>
      </nav>
      ) : null}
    </div>
  );
}
