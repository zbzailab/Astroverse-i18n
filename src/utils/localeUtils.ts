import type { SupportedLocale } from "@consts";

export const supportedLanguages = [
  "zh",
  "en",
];

export const languageNames: Record<string, string> = {
  en: "English",
  zh: "中文",
};

export function getCurrentLocale(pathname: string): SupportedLocale {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] as SupportedLocale;
  const supportedLocales: SupportedLocale[] = [
    "en",
    "zh",
  ];
  return supportedLocales.includes(locale) ? locale : "en";
}

export function getBrandName(lang: SupportedLocale): string {
  const brandNames: Record<SupportedLocale, string> = {
    en: "Astroverse",
    zh: "Astroverse",
  };
  return brandNames[lang];
}

export function getSupportedLanguages(): string[] {
  return supportedLanguages;
}

export function getLanguageNames(): Record<string, string> {
  return languageNames;
}