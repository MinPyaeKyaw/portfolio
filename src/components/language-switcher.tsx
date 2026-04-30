import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SUPPORTED_LANGUAGES,
  type AppLanguage,
} from "@/locales/i18n";

const FONT_CLASS: Record<AppLanguage, string> = {
  en: "",
  mm: "myanmar-text",
  ja: "japanese-text",
};

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage as AppLanguage | undefined;

  return (
    <div
      role="radiogroup"
      aria-label={t("settings.language.label")}
      className="flex flex-wrap gap-2"
    >
      {SUPPORTED_LANGUAGES.map((lng) => {
        const active = current === lng;
        return (
          <Button
            key={lng}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            role="radio"
            aria-checked={active}
            onClick={() => {
              if (!active) void i18n.changeLanguage(lng);
            }}
            className={cn(FONT_CLASS[lng])}
          >
            {t(`languages.${lng}`)}
          </Button>
        );
      })}
    </div>
  );
}
