type TranslationMap = Record<string, string>;

const enTranslations: TranslationMap = {
  homepage: "Homepage",
  blog: "Blog",
};

const zhTranslations: TranslationMap = {
  homepage: "首页",
  blog: "文章",
};

const translationMappings: Record<string, TranslationMap> = {
  en: enTranslations,
  zh: zhTranslations,
};

export function getTranslationByLanguage(key: string, locale: string): string {
  const translationMap =
    translationMappings[locale] || translationMappings["en"];
  return translationMap[key] || key;
}
