type CategoryMap = Record<string, string>;

const zhCategories: CategoryMap = {
  生活: "life",
  投资: "invest",
  创业: "build",
};

const enCategories: CategoryMap = {
  life: "life",
  invest: "invest",
  build: "build",
};


const categoryMappings: Record<string, CategoryMap> = {
  zh: zhCategories,
  en: enCategories,
};

function createReverseMapping(categoryMap: CategoryMap): CategoryMap {
  const reverseMap: CategoryMap = {};
  Object.entries(categoryMap).forEach(([key, value]) => {
    reverseMap[value] = key;
  });
  return reverseMap;
}

const reverseCategoryMappings: Record<string, CategoryMap> = {
  zh: createReverseMapping(zhCategories),
  en: createReverseMapping(enCategories),
};

export function getCategoryByLanguage(
  category: string,
  fromLang: string,
  toLang: string,
): string {
  const fromMapping = categoryMappings[fromLang];
  const toReverseMapping = reverseCategoryMappings[toLang];

  if (!fromMapping || !toReverseMapping) {
    console.warn(`Missing category mapping for: ${fromLang} or ${toLang}`);
    return category;
  }

  const commonCategory = fromMapping[category] || category;
  return toReverseMapping[commonCategory] || commonCategory;
}

export function getEnglishCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, "en");
}

export function getChineseCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, "zh");
}