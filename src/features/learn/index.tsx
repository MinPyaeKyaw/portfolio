import {
  BookOpen,
  FileText,
  Headphones,
  Languages,
  Sparkles,
  Type,
} from "lucide-react";
import { Link } from "react-router-dom";

const learnCards = [
  {
    title: "Grammar",
    description: "ဝါကျဖွဲ့စည်းပုံနှင့် အရေးကြီးသော သဒ္ဒါအချက်များကို လေ့လာပါ။",
    icon: FileText,
    to: "/grammar",
    accent: "from-pink-500/10 via-transparent to-transparent",
  },
  {
    title: "Reading",
    description:
      "စကားလုံး၊ အကြောင်းအရာနှင့် အဓိပ္ပါယ်ကို တွဲဖက်ပြီး ဖတ်ရှုလေ့ကျင့်ပါ။",
    icon: BookOpen,
    to: "/reading",
    accent: "from-violet-500/10 via-transparent to-transparent",
  },
  {
    title: "Kanji",
    description:
      "Kanji ကို ရေးဆွဲပြီး မှတ်သားခွဲခြားလေ့ကျင့်ခြင်းဖြင့် သင်ယူပါ။",
    icon: Languages,
    to: "/learn/kanji",
    accent: "from-primary/15 via-transparent to-transparent",
  },
  {
    title: "Listening",
    description:
      "အသုံးဝင်သော တိုတိုသော အသံလေ့ကျင့်ခန်းများဖြင့် နားထောင်မှုကို တိုးတက်စေပါ။",
    icon: Headphones,
    to: "/dictionary",
    accent: "from-sky-500/10 via-transparent to-transparent",
  },
  {
    title: "Hiragana",
    description:
      "ဟိရဂန အက္ခရာ ၄၆ လုံးကို ဇယားဖြင့် တစ်လုံးချင်း လေ့လာပါ။",
    icon: Sparkles,
    to: "/learn/hiragana",
    accent: "from-emerald-500/10 via-transparent to-transparent",
  },
  {
    title: "Katakana",
    description:
      "ကတခန အက္ခရာများကို ဇယားဖြင့် ကြည့်ရှု၍ မှတ်သားပါ။",
    icon: Type,
    to: "/learn/katakana",
    accent: "from-amber-500/10 via-transparent to-transparent",
  },
] as const;

export default function LearnPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4">
      <div className="relative min-h-0 flex-1">
        <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-4 pb-6 md:pt-8 [-webkit-overflow-scrolling:touch]">
          <div className="grid grid-cols-2 gap-3">
            {learnCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.to}
                  className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${card.accent}`}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h2 className="font-heading text-lg font-semibold tracking-tight">
                      {card.title}
                    </h2>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
