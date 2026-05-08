import { Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { BRAND_NAME } from "@/components/brand-lockup";

type FooterLink = { label: string; to: string };
type FooterColumn = { heading: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    heading: "လေ့လာရန်",
    links: [
      { label: "သဒ္ဒါ", to: "/grammar" },
      { label: "ဖတ်ရှု", to: "/reading" },
      { label: "ဟိရဂန", to: "/learn/hiragana" },
      { label: "ကတခန", to: "/learn/katakana" },
      { label: "ခန်းဂျိ", to: "/learn/kanji" },
    ],
  },
  {
    heading: "ကိရိယာများ",
    links: [
      { label: "အဘိဓာန်", to: "/dictionary" },
      { label: "ခန်းဂျိ မှတ်ပုံပြုသူ", to: "/kanji" },
    ],
  },
  {
    heading: "အကောင့်",
    links: [
      { label: "ကြိုဆိုစာမျက်နှာ", to: "/welcome" },
      { label: "အကောင့်ဖွင့်ရန်", to: "/sign-up" },
      { label: "ဝင်ရောက်ရန်", to: "/login" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/70 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link
              to="/welcome"
              className="inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              aria-label={`${BRAND_NAME} ပင်မစာမျက်နှာ`}
            >
              <img
                src={logo}
                alt=""
                width={36}
                height={36}
                className="size-9 object-contain"
                decoding="async"
              />
              <span className="brand-text text-xl font-semibold text-primary">
                {BRAND_NAME}
              </span>
            </Link>
            <p className="myanmar-text max-w-xs text-sm leading-relaxed text-muted-foreground">
              ဂျပန်ဘာသာ လေ့လာနေသူ မြန်မာစကားပြောသူများအတွက် အခမဲ့၊
              မိုဘိုင်းအဦးထား အဖော်။
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="flex flex-col gap-3"
            >
              <h2 className="myanmar-text text-xs font-semibold tracking-wider text-foreground/80">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="myanmar-text rounded text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-border/70 pt-6 md:mt-12 md:flex-row md:items-center md:justify-between">
          <p className="myanmar-text text-xs text-muted-foreground">
            © {year} {BRAND_NAME}. မြန်မာ လေ့လာသူများအတွက် ဖန်တီးထားပါသည်။
          </p>
          <ul className="flex items-center gap-2" aria-label="ဆိုရှယ်">
            <li>
              <a
                href="https://myanhon.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ဝက်ဘ်ဆိုဒ်"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <Globe className="size-4" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@myanhon.app"
                aria-label="အီးမေးလ်"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <Mail className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
