import { Languages, Palette, Settings as SettingsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/hooks/use-theme";

export default function SettingsView() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const themeMode =
    theme === "dark"
      ? t("settings.appearance.darkMode")
      : t("settings.appearance.lightMode");

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4 pb-24">
      <h1 className="mb-5 flex items-center gap-2 font-heading text-xl font-medium leading-snug tracking-tight md:text-2xl">
        <SettingsIcon className="size-5 text-primary" aria-hidden />
        {t("settings.title")}
      </h1>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-4 text-primary" aria-hidden />
              {t("settings.appearance.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {t("settings.appearance.themeLabel")}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {t("settings.appearance.themeHint", { mode: themeMode })}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="size-4 text-primary" aria-hidden />
              {t("settings.language.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">
                {t("settings.language.label")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("settings.language.hint")}
              </p>
            </div>
            <LanguageSwitcher />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
