import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stagger = (step: number) => ({
  animationDelay: `${step * 80}ms`,
});

export function HeroCard() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex w-full min-h-[calc(100svh-3.75rem)] flex-col justify-center overflow-hidden py-12 md:py-16"
    >
      {/* Oversized typographic watermark — very faint, no motion. */}
      <span
        aria-hidden
        className="japanese-text pointer-events-none absolute -right-8 top-1/2 -z-10 -translate-y-1/2 select-none text-[22vw] font-semibold leading-none text-foreground/[0.035] md:-right-12 md:text-[14vw]"
      >
        日本語
      </span>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:px-8">
        {/* Copy column */}
        <div className="flex flex-col items-start text-left">
          <h1
            id="hero-heading"
            className="myanmar-text hero-rise mt-6 text-4xl font-semibold leading-[1.8] tracking-tight md:text-4xl lg:text-6xl"
            style={stagger(1)}
          >
            <span className="text-primary">Myanhon</span> နဲ့ဂျပန်စာ <br />
            လေ့လာကြမယ်
          </h1>

          <p
            className="myanmar-text hero-rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={stagger(2)}
          >
            မြန်မာကျောင်းသားများအတွက် သီးသန့်ဖန်တီးထားသော ဂျပန်စာ App
          </p>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-3"
            style={stagger(3)}
          >
            <Link
              to="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "myanmar-text group/cta relative gap-3 overflow-hidden pr-2 pl-5 transition-[gap,transform,filter] duration-200 [a]:hover:bg-primary hover:brightness-110 motion-reduce:transition-none",
              )}
            >
              <span className="relative z-10">စတင်လေ့လာရန်</span>
              <span
                aria-hidden
                className="relative z-10 inline-flex size-6 items-center justify-center rounded-full bg-primary-foreground/15 transition-all duration-300 group-hover/cta:bg-primary-foreground/25 motion-reduce:transition-none"
              >
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </Link>
            <Link
              to="/dictionary"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "myanmar-text px-4",
              )}
            >
              အဘိဓာန်ကို ကြည့်ရှုရန်
            </Link>
          </div>

          <ul
            className="myanmar-text hero-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
            style={stagger(3)}
          >
            <li className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              အဘိဓာန်
            </li>
            <li
              className="hidden h-3 w-px bg-border sm:inline-block"
              aria-hidden
            />
            <li className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              ခန်းဂျိရှာဖွေခြင်း
            </li>
            <li
              className="hidden h-3 w-px bg-border sm:inline-block"
              aria-hidden
            />
            <li className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              N5 to N1 သင်ခန်းစာများ
            </li>
          </ul>
        </div>

        {/* Supporting visual — typographic, no card chrome */}
        <div className="hero-rise relative hidden md:block" style={stagger(4)}>
          <HeroVisual />
        </div>
      </div>

      {/* Mobile visual */}
      <div
        className="hero-rise mx-auto mt-12 w-full max-w-6xl px-4 md:hidden"
        style={stagger(4)}
      >
        <HeroVisualCompact />
      </div>
    </section>
  );
}

const glyphs = [
  { char: "あ", label: "ဟိရဂန", scale: "text-[7rem]", kanji: false },
  { char: "ア", label: "ကတခန", scale: "text-[7rem]", kanji: false },
  { char: "漢", label: "ခန်းဂျိ", scale: "text-[8rem]", kanji: true },
] as const;

function HeroVisual() {
  return (
    <div className="relative ml-auto flex max-w-sm flex-col gap-2" aria-hidden>
      {glyphs.map((g, i) => (
        <div
          key={g.char}
          className={cn(
            "hero-glyph-float group/glyph relative flex items-baseline justify-between gap-6 border-b border-border/60 pb-2",
            i === 1 ? "pl-10" : "",
            i === 2 ? "pl-4" : "",
          )}
          style={{ animationDelay: `${-i * 2}s` }}
        >
          <span
            className={cn(
              "font-semibold leading-none text-foreground",
              g.scale,
              g.kanji ? "kanji-display-text text-primary" : "japanese-text",
            )}
          >
            {g.char}
          </span>
          <span className="myanmar-text text-[10px] tracking-[0.05em] text-muted-foreground">
            {g.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroVisualCompact() {
  return (
    <div
      className="flex items-end justify-between gap-3 border-y border-border/60 py-6"
      aria-hidden
    >
      {glyphs.map((g, i) => (
        <div
          key={g.char}
          className="hero-glyph-float flex flex-col items-center gap-2"
          style={{ animationDelay: `${-i * 2}s` }}
        >
          <span
            className={cn(
              "text-5xl font-semibold leading-none",
              g.kanji
                ? "kanji-display-text text-primary"
                : "japanese-text text-foreground",
            )}
          >
            {g.char}
          </span>
          <span className="myanmar-text text-[10px] tracking-[0.05em] text-muted-foreground">
            {g.label}
          </span>
        </div>
      ))}
    </div>
  );
}
