import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type BannerSlide = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  titleMm?: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
  /** Tailwind gradient classes for the slide background. */
  gradient: string;
  /** Decorative kana/kanji rendered behind the content. */
  decor?: string;
};

const AUTOPLAY_MS = 5500;

export function BannerCarousel({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX ?? null;
    touchStartX.current = null;
    if (start == null || end == null) return;
    const dx = end - start;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      className="relative w-full overflow-hidden border-border/60 border-y bg-background"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={i !== index}
            className={cn(
              "relative flex w-full shrink-0 items-center justify-center",
              "min-h-[clamp(360px,60svh,640px)]",
              slide.gradient,
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 -z-0 select-none text-[28vw] font-semibold leading-none text-foreground/[0.045] md:text-[18vw]"
              aria-hidden
            >
              <span className="absolute -top-6 -right-2 md:-top-10 md:right-4">
                {slide.decor}
              </span>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-14 text-center md:py-20">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {slide.eyebrow}
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {slide.title}
              </h2>
              {slide.titleMm ? (
                <p className="myanmar-text mt-3 text-base text-muted-foreground md:text-lg">
                  {slide.titleMm}
                </p>
              ) : null}
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                {slide.description}
              </p>
              <Link
                to={slide.ctaTo}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 gap-2 px-5",
                )}
              >
                {slide.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground backdrop-blur-md transition-colors hover:bg-background md:flex"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground backdrop-blur-md transition-colors hover:bg-background md:flex"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-foreground/25 hover:bg-foreground/40",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
