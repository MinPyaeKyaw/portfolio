import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Globe,
  Heart,
  Languages,
  MoreVertical,
  PlusSquare,
  Share,
  Smartphone,
  Sparkles,
  Type,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BannerCarousel,
  type BannerSlide,
} from "./components/banner-carousel";

const slides: BannerSlide[] = [
  {
    id: "hero",
    eyebrow: "Myanhon",
    title: (
      <>
        Learn Japanese, in <span className="text-primary">Myanmar</span>
      </>
    ),
    titleMm: "ဂျပန်ဘာသာစကားကို မြန်မာဘာသာဖြင့် လွယ်လင့်တကူ လေ့လာပါ။",
    description:
      "A free, mobile-first dictionary, kanji recognizer, and grammar trainer — designed for Myanmar speakers learning Japanese.",
    ctaLabel: "Get Started",
    ctaTo: "/sign-up",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,theme(colors.primary/0.18),transparent_60%),linear-gradient(to_bottom,var(--background),var(--background))]",
    decor: "日本語",
  },
  {
    id: "dictionary",
    eyebrow: "Dictionary",
    title: <>Search any word, instantly</>,
    titleMm: "မည်သည့်စကားလုံးကိုမဆို ချက်ချင်းရှာဖွေပါ",
    description:
      "Hiragana, Katakana, Kanji, Romaji, or Myanmar — bilingual meanings with examples and audio.",
    ctaLabel: "Try the Dictionary",
    ctaTo: "/dictionary",
    gradient:
      "bg-[radial-gradient(ellipse_at_left,theme(colors.violet.500/0.18),transparent_55%),linear-gradient(to_bottom_right,var(--background),var(--background))]",
    decor: "辞書",
  },
  {
    id: "kanji",
    eyebrow: "Kanji Recognition",
    title: <>Draw the kanji, on-device AI reads it</>,
    titleMm: "Kanji ရေးဆွဲပြီး AI ကို မှတ်မိစေပါ",
    description:
      "Powered by TensorFlow.js — recognise handwritten kanji directly in your browser, no upload needed.",
    ctaLabel: "Open Kanji Recognizer",
    ctaTo: "/kanji",
    gradient:
      "bg-[radial-gradient(ellipse_at_right,theme(colors.pink.500/0.20),transparent_55%),linear-gradient(to_bottom_left,var(--background),var(--background))]",
    decor: "漢字",
  },
  {
    id: "grammar",
    eyebrow: "Grammar & Reading",
    title: <>Structured lessons, in your language</>,
    titleMm: "သင်ဆုံးမတဲ့ ဘာသာစကားနဲ့ စနစ်တကျ သင်ခန်းစာများ",
    description:
      "Grammar points and bilingual reading passages with vocabulary breakdowns to grow with you.",
    ctaLabel: "Browse Lessons",
    ctaTo: "/grammar",
    gradient:
      "bg-[radial-gradient(ellipse_at_bottom,theme(colors.emerald.500/0.16),transparent_55%),linear-gradient(to_top,var(--background),var(--background))]",
    decor: "文法",
  },
];

const features = [
  {
    title: "Dictionary",
    titleMm: "အဘိဓာန်",
    description:
      "Search any word in Hiragana, Katakana, Kanji, Romaji, or Myanmar — with bilingual meanings.",
    icon: BookOpen,
    to: "/dictionary",
    accent: "from-primary/15 via-transparent to-transparent",
  },
  {
    title: "Kanji Recognition",
    titleMm: "Kanji ရေးဆွဲခြင်း",
    description:
      "Draw a kanji on screen and let on-device AI recognise it. Powered by TensorFlow.js.",
    icon: Languages,
    to: "/kanji",
    accent: "from-pink-500/12 via-transparent to-transparent",
  },
  {
    title: "Grammar Lessons",
    titleMm: "သဒ္ဒါသင်ခန်းစာ",
    description:
      "Structured grammar points explained simply — in both Japanese and Myanmar.",
    icon: FileText,
    to: "/grammar",
    accent: "from-violet-500/10 via-transparent to-transparent",
  },
  {
    title: "Reading Practice",
    titleMm: "ဖတ်ရှုလေ့ကျင့်ခန်း",
    description:
      "Short bilingual reading passages with vocabulary breakdowns.",
    icon: Sparkles,
    to: "/reading",
    accent: "from-emerald-500/10 via-transparent to-transparent",
  },
  {
    title: "Hiragana & Katakana",
    titleMm: "ဟိရဂန နှင့် ကတခန",
    description:
      "Master the foundational kana with interactive charts and pronunciation.",
    icon: Type,
    to: "/learn/hiragana",
    accent: "from-amber-500/10 via-transparent to-transparent",
  },
] as const;

const whyItems = [
  {
    icon: Heart,
    label: "Built for Myanmar learners",
    sub: "Every translation in မြန်မာ — never a foreign-only experience.",
  },
  {
    icon: Wifi,
    label: "Works offline",
    sub: "Install once and keep learning on the bus, on the train, anywhere.",
  },
  {
    icon: Globe,
    label: "Free and open",
    sub: "No paywalls, no ads. New lessons added every week.",
  },
] as const;

const androidSteps = [
  {
    icon: Smartphone,
    title: "Open Myanhon in Chrome",
    body: "Visit the site on your Android device using the Chrome browser.",
  },
  {
    icon: MoreVertical,
    title: "Tap the menu (three dots)",
    body: "It's at the top-right of Chrome. Look for the vertical dots.",
  },
  {
    icon: Download,
    title: "Choose “Install app”",
    body: "Some phones show “Add to Home screen”. Either option works.",
  },
  {
    icon: PlusSquare,
    title: "Confirm and launch",
    body: "Myanhon will appear on your home screen like a native app.",
  },
] as const;

const iosSteps = [
  {
    icon: Smartphone,
    title: "Open Myanhon in Safari",
    body: "On iPhone or iPad, you must use Safari — Chrome on iOS can't install PWAs.",
  },
  {
    icon: Share,
    title: "Tap the Share button",
    body: "The square with an upward arrow, at the bottom of the Safari toolbar.",
  },
  {
    icon: PlusSquare,
    title: "Choose “Add to Home Screen”",
    body: "Scroll the share sheet if you don't see it right away.",
  },
  {
    icon: PlusSquare,
    title: "Tap “Add”",
    body: "Myanhon will appear on your home screen with its own icon.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col gap-16 pb-12 md:gap-24 md:pb-20">
      {/* Hero banner */}
      <Reveal from="none" className="w-full">
        <BannerCarousel slides={slides} />
      </Reveal>

      {/* Features */}
      <Reveal as="section" className="w-full px-4 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need in one app"
            subtitle="From your first hiragana stroke to reading natural Japanese — Myanhon grows with you."
          />
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal
                  key={feature.title}
                  delay={i * 80}
                  from="up"
                  className="h-full"
                >
                  <Link
                    to={feature.to}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-linear-to-br",
                        feature.accent,
                      )}
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <h3 className="font-heading text-lg font-semibold tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="myanmar-text mt-0.5 text-xs text-muted-foreground">
                        {feature.titleMm}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Why */}
      <Reveal as="section" className="w-full px-4 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Why Myanhon"
            title="Made for the way you actually study"
          />
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.label}
                  delay={i * 100}
                  from={i === 0 ? "left" : i === 2 ? "right" : "up"}
                >
                  <div className="h-full rounded-2xl border border-border/70 bg-card p-5">
                    <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <p className="font-medium">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.sub}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Install */}
      <Reveal as="section" className="w-full px-4 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Install as a PWA"
            title="Add Myanhon to your home screen"
            subtitle="Get an app-like experience with offline support — no app store needed."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal delay={0} from="left">
              <InstallGuide
                platform="Android"
                platformLabel="Android · Chrome"
                steps={androidSteps}
              />
            </Reveal>
            <Reveal delay={120} from="right">
              <InstallGuide
                platform="iOS"
                platformLabel="iOS · Safari"
                steps={iosSteps}
              />
            </Reveal>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            On desktop Chrome, look for the install icon in the address bar.
          </p>
        </div>
      </Reveal>

      {/* Final CTA — full-width strip */}
      <Reveal
        as="section"
        from="up"
        className="w-full bg-[radial-gradient(ellipse_at_center,theme(colors.primary/0.18),transparent_65%)] px-4 py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-card p-6 text-center md:p-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Ready to start?
          </h2>
          <p className="myanmar-text mt-2 text-sm text-muted-foreground md:text-base">
            ဂျပန်ဘာသာစကား ခရီးစတင်ဖို့ အချိန်တန်ပြီ။
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/sign-up"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 px-5")}
            >
              Create free account
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "px-5",
              )}
            >
              Browse first
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {eyebrow}
      </span>
      <h2 className="font-heading mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function InstallGuide({
  platform,
  platformLabel,
  steps,
}: {
  platform: "Android" | "iOS";
  platformLabel: string;
  steps: ReadonlyArray<{
    icon: typeof Smartphone;
    title: string;
    body: string;
  }>;
}) {
  return (
    <Card>
      <CardHeader>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {platformLabel}
        </span>
        <CardTitle>Install on {platform}</CardTitle>
        <CardDescription>
          Four quick taps and you're done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-4 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="font-medium">{step.title}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
