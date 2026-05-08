import { ArrowLeft, Type } from "lucide-react";
import { Link } from "react-router-dom";
import { KanaChart } from "@/components/kana-chart";

export default function KatakanaLearningPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pt-4 md:pt-8">
      <div className="shrink-0 pb-4">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Learn
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Type className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              Katakana
            </h1>
            <p className="myanmar-text text-muted-foreground text-xs">
              ကတခန အက္ခရာများကို တစ်လုံးချင်း နှိပ်၍ လေ့လာပါ
            </p>
          </div>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="h-full min-h-0 overflow-y-auto overscroll-contain pb-6 [-webkit-overflow-scrolling:touch]">
          <KanaChart script="katakana" />
        </div>
      </div>
    </div>
  );
}
