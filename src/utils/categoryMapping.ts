export const categoryMapping: Record<string, string> = {
  天干: "one",
  地支: "two",
  阴阳: "three",
};

export const reverseCategoryMapping: Record<string, string> = Object.keys(
  categoryMapping,
).reduce((acc, key) => ({ ...acc, [categoryMapping[key]]: key }), {});

export function getEnglishCategory(chineseCategory: string): string {
  return categoryMapping[chineseCategory] || chineseCategory;
}

export function getChineseCategory(englishCategory: string): string {
  return reverseCategoryMapping[englishCategory] || englishCategory;
}
