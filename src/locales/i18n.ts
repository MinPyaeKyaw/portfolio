import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import mm from "./mm.json";
import ja from "./ja.json";

export const SUPPORTED_LANGUAGES = ["en", "mm", "ja"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = "myanhon-language";

/** Map our app codes to the BCP-47 codes we set on <html lang> for screen readers + CSS. */
const HTML_LANG: Record<AppLanguage, string> = {
  en: "en",
  mm: "my",
  ja: "ja",
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      mm: { translation: mm },
      ja: { translation: ja },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: STORAGE_KEY,
      caches: ["localStorage"],
    },
  });

function applyHtmlLang(lng: string) {
  const code = (SUPPORTED_LANGUAGES as readonly string[]).includes(lng)
    ? HTML_LANG[lng as AppLanguage]
    : "en";
  document.documentElement.lang = code;
}

applyHtmlLang(i18n.language);
i18n.on("languageChanged", applyHtmlLang);

export default i18n;
