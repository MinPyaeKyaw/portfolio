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
import { HeroCard } from "./components/hero-card";
import { SiteFooter } from "./components/site-footer";

const features = [
  {
    title: "အဘိဓာန်",
    description:
      "ဟိရဂန၊ ခတခန၊ ခန်းဂျိ၊ Romaji သို့မဟုတ် မြန်မာဘာသာဖြင့် မည်သည့်စကားလုံးကိုမဆို ရှာဖွေနိုင်ပါသည်။",
    icon: BookOpen,
    to: "/dictionary",
  },
  {
    title: "ခန်းဂျိ ရှာဖွေခြင်း",
    description: "ခန်းဂျိစာလုံးကို ရေးဆွဲပြီး ရှာဖွေနိုင်ပါသည်။",
    icon: Languages,
    to: "/kanji",
  },
  {
    title: "သဒ္ဒါ သင်ခန်းစာများ",
    description:
      "ဂျပန်နှင့် မြန်မာ နှစ်ဘာသာဖြင့် ရှင်းလင်းစွာ ရှင်းပြထားသော စနစ်တကျ သဒ္ဒါအချက်များ။",
    icon: FileText,
    to: "/grammar",
  },
  {
    title: "စာဖတ်လေ့ကျင့်ခြင်း",
    description: "level အဆင့်ဆင့်ခွဲခြားထားသော လေ့ကျင့်စရာ စာပိုဒ်များ။",
    icon: Sparkles,
    to: "/reading",
  },
  {
    title: "နားကြားစွမ်းရည်လေ့ကျင့်ခြင်း",
    description:
      "ဂျပန်စာအသံထွက်များကို နားထောင်းပြီး နားကြားစွမ်းရည်ကို ကျွမ်းကျင်အောင် လေ့လာပါ။",
    icon: Type,
    to: "/listen",
  },
  {
    title: "ဟိရဂန နှင့် ခတခန",
    description:
      "စကားလုံးများကို ဇယားများ၊ အသံထွက်ဖြင့် အခြေခံကို ကျွမ်းကျင်အောင် လေ့လာပါ။",
    icon: Type,
    to: "/learn/hiragana",
  },
] as const;

const whyItems = [
  {
    icon: Heart,
    label: "မြန်မာကျောင်းသား/သူများအတွက်",
    sub: "ဘာသာပြန်တိုင်း မြန်မာဘာသာဖြင့် — နိုင်ငံခြားဘာသာချည်းသက်သက် မဟုတ်ပါ။",
  },
  {
    icon: Wifi,
    label: "အင်တာနက်မရှိလည်း အသုံးပြနိုင်",
    sub: "တစ်ကြိမ် download လုပ်ပြီးလျှင် မည်သည့်အချိန်၊ မည်သည့်နေရာတွင်မဆို လေ့လာနိုင်ပါသည်။",
  },
  {
    icon: Globe,
    label: "အခမဲ့",
    sub: "ဂျပန်စာသင်ခန်းစာများ နဲ့ အဘိဓာန်ကို အခမဲ့အသုံးပြုပါ။",
  },
] as const;

const androidSteps = [
  {
    icon: Smartphone,
    title: "Chrome တွင် Myanhon ကို ဖွင့်ပါ",
    body: "သင့်ဖုန်းတွင် Chrome browser ဖြင့်ဝင်ကြည့်ပါ။",
  },
  {
    icon: MoreVertical,
    title: "Menu (အစက်သုံးစက်) ကို နှိပ်ပါ",
    body: "Chrome ၏ ညာဘက်အပေါ်ထောင့်တွင် ဒေါင်လိုက်အစက်သုံးစက်ကို ရှာပါ။",
  },
  {
    icon: Download,
    title: "“Install app” ကို ရွေးပါ",
    body: "ဖုန်းအချို့တွင် “Add to Home screen” ဟု ပြသနိုင်သည်။",
  },
  {
    icon: PlusSquare,
    title: "အတည်ပြုပြီး စတင်ဖွင့်ပါ",
    body: "Myanhon သည် မူလအက်ပ်တစ်ခုကဲ့သို့ ပင်မစခရင်ပေါ်တွင် ပေါ်လာပါမည်။",
  },
] as const;

const iosSteps = [
  {
    icon: Smartphone,
    title: "Safari တွင် Myanhon ကို ဖွင့်ပါ",
    body: "iPhone သို့မဟုတ် iPad တွင် Safari ကိုသာ သုံးပါ။",
  },
  {
    icon: Share,
    title: "Share ခလုတ်ကို နှိပ်ပါ",
    body: "Safari တူးလ်ဘားအောက်ခြေတွင် မြှားအထက်သို့ပြထားသော စတုရန်းပုံကို ရှာပါ။",
  },
  {
    icon: PlusSquare,
    title: "“Add to Home Screen” ကို ရွေးပါ",
    body: "ချက်ချင်း မမြင်ရပါက Share စာရွက်ကို အပေါ်အောက် ဆွဲကြည့်ပြီး ရွေးပါ။",
  },
  {
    icon: PlusSquare,
    title: "“Add” ကို နှိပ်ပါ",
    body: "home screen ပေါ်တွင် Myanhon ပေါ်လာပါမည်။",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full flex-col gap-16 pb-12 md:gap-24 md:pb-20">
        {/* Hero — full bleed */}
        <HeroCard />

        {/* Features — numbered editorial rows */}
        <Reveal as="section" once={false} className="w-full px-4 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading
              eyebrow="features"
              title="Myanhon မှာလေ့လာနိုင်သောအရာများ"
              subtitle="အခြေခံမှစပြီး N1 အောင်သည်အထိ Myanhon နဲ့အတူတူလေ့လာပါ"
            />
            <ul className="mt-10 divide-y divide-border/70 border-y border-border/70">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Reveal
                    as="article"
                    key={feature.title}
                    delay={i * 60}
                    from="up"
                    once={false}
                  >
                    <Link
                      to={feature.to}
                      className="group flex flex-col gap-4 py-6 transition-colors md:grid md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-7"
                    >
                      <span className="font-heading text-sm font-medium tabular-nums text-muted-foreground md:text-base">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex rounded-xl bg-primary/10 p-2 text-primary transition-transform duration-300 group-hover:scale-105 md:hidden">
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <h3 className="myanmar-text text-lg font-semibold tracking-tight md:text-xl">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="myanmar-text max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                          {feature.description}
                        </p>
                      </div>
                      <div className="hidden items-center gap-3 md:flex">
                        <span className="inline-flex rounded-xl bg-primary/10 p-2.5 text-primary transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <ArrowRight
                          className="size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
                          aria-hidden
                        />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Why */}
        <Reveal as="section" once={false} className="w-full px-4 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading
              eyebrow="ဘာကြောင့် Myanhon"
              title="သင်လေ့လာတဲ့ပုံစံအတွက် အထူးဖန်တီးထား"
            />
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {whyItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    key={item.label}
                    delay={i * 100}
                    from={i === 0 ? "left" : i === 2 ? "right" : "up"}
                    once={false}
                  >
                    <div className="h-full rounded-2xl border border-border/70 bg-card p-5">
                      <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <p className="myanmar-text font-medium">{item.label}</p>
                      <p className="myanmar-text mt-1 text-sm text-muted-foreground">
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
        <Reveal as="section" once={false} className="w-full px-4 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading
              eyebrow="PWA အဖြစ် အသုံးပြုပါ"
              title="Myanhon ကို သင့်ဖုန်းတွင် install ပြုလုပ်ပါ"
              subtitle="အင်တာနက်မရှိလည်း အက်ပ်တစ်ခုကဲ့သို့ အသုံးပြုနိုင်သည်။"
            />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Reveal delay={0} from="left" once={false}>
                <InstallGuide
                  title="Android တွင် ထည့်သွင်းနည်း"
                  platformLabel="Android · Chrome"
                  steps={androidSteps}
                />
              </Reveal>
              <Reveal delay={120} from="right" once={false}>
                <InstallGuide
                  title="iOS တွင် ထည့်သွင်းနည်း"
                  platformLabel="iOS · Safari"
                  steps={iosSteps}
                />
              </Reveal>
            </div>
            <p className="myanmar-text mt-4 text-center text-xs text-muted-foreground">
              ဒက်စ်တော့ Chrome တွင် address bar ထဲက install အိုင်ကွန်ကို ရှာပါ။
            </p>
          </div>
        </Reveal>

        {/* Closing CTA — slim, leads into footer */}
        <Reveal
          as="section"
          from="up"
          once={false}
          className="w-full px-4 md:px-8"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 rounded-3xl border border-border/70 bg-card px-6 py-10 text-center md:flex-row md:justify-between md:gap-8 md:px-10 md:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="myanmar-text text-2xl font-semibold tracking-tight md:text-3xl">
                စတင်ဖို့ အသင့်ဖြစ်ပြီလား?
              </h2>
              <p className="myanmar-text text-sm text-muted-foreground md:text-base">
                ဂျပန်စာခရီးစတင်ဖို့ အချိန်တန်ပြီ...
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "myanmar-text gap-2 px-5",
                )}
              >
                အခမဲ့ account ဖောက်ပါ
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
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
      <span className="myanmar-text rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {eyebrow}
      </span>
      <h2 className="myanmar-text mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="myanmar-text mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function InstallGuide({
  title,
  platformLabel,
  steps,
}: {
  title: string;
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
        <CardTitle className="myanmar-text">{title}</CardTitle>
        <CardDescription className="myanmar-text">
          လေးချက်နှိပ်လိုက်ရုံနှင့် ပြီးပါပြီ။
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
                    <p className="myanmar-text font-medium">{step.title}</p>
                  </div>
                  <p className="myanmar-text mt-0.5 text-sm text-muted-foreground">
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
