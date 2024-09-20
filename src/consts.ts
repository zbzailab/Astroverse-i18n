export type SupportedLocale =
  | "en"
  | "zh";

export interface LanguageConstants {
  BrandName: string;
  SITE_TITLE: string;
  SITE_DESCRIPTION: string;
  TAGS_TITLE: string;
  TAGS_DESCRIPTION: string;
  SEARCH_PAGE_TITLE: string;
  SEARCH_PAGE_DESCRIPTION: string;
  GO_TO_HOMEPAGE: string;
  ERROR_404_SUBMESSAGE: string;
  ERROR_404_MESSAGE: string;
  ERROR_404_DESCRIPTION: string;
  ERROR_404_TITLE: string;
  UPDATED_ON: string;
  PUBLISHED_ON: string;
  TAGS_HEADING: string;
  FOOTER_ABOUT: string;
  FOOTER_BUILD: string;
  FOOTER_INVEST: string;
  FOOTER_LIFE: string;
}

const zhConstants: LanguageConstants = {
  BrandName: "DiMi",
  SITE_TITLE: "DiMi",
  SITE_DESCRIPTION: "在生活的海洋，创业的波涛和投资的迷雾中前行。",
  TAGS_TITLE: "所有标签",
  TAGS_DESCRIPTION: "在生活的海洋，创业的波涛和投资的迷雾中前行。",
  SEARCH_PAGE_TITLE: "站内搜索",
  SEARCH_PAGE_DESCRIPTION: "搜索DiMi全站内容",
  GO_TO_HOMEPAGE: "返回首页",
  ERROR_404_SUBMESSAGE: "您查找的页面不存在或已被移动。",
  ERROR_404_MESSAGE: "页面未找到",
  ERROR_404_DESCRIPTION: "404 - 页面未找到",
  ERROR_404_TITLE: "404 - 页面未找到",
  UPDATED_ON: "更新于",
  PUBLISHED_ON: "发布于",
  TAGS_HEADING: "标签",
  FOOTER_ABOUT: "关于我们",
  FOOTER_BUILD: "创业",
  FOOTER_INVEST: "投资",
  FOOTER_LIFE: "生活",
};

const enConstants: LanguageConstants = {
  BrandName: "DiMi",
  SITE_TITLE: "DiMi",
  SITE_DESCRIPTION:
    "Navigating through the ocean of life, amidst the waves of entrepreneurship and the fog of investment.",
  TAGS_TITLE: "All Tags",
  TAGS_DESCRIPTION:
    "Navigating through the ocean of life, amidst the waves of entrepreneurship and the fog of investment.",
  SEARCH_PAGE_TITLE: "Site Search",
  SEARCH_PAGE_DESCRIPTION: "Search all content on DiMi",
  GO_TO_HOMEPAGE: "Go to Homepage",
  ERROR_404_SUBMESSAGE:
    "The page you're looking for doesn't exist or has been moved.",
  ERROR_404_MESSAGE: "Page not found",
  ERROR_404_DESCRIPTION: "404 - Page not found",
  ERROR_404_TITLE: "404 - Page Not Found",
  UPDATED_ON: "Updated on",
  PUBLISHED_ON: "Published on",
  TAGS_HEADING: "Tags",
  FOOTER_ABOUT: "About Us",
  FOOTER_BUILD: "Build",
  FOOTER_INVEST: "Invest",
  FOOTER_LIFE: "Life",
};



export function getConstants(lang: SupportedLocale): LanguageConstants {
  switch (lang) {
    case "zh":
      return zhConstants;
    default:
      return enConstants;
  }
}

export function getTagMetadata(tag: string, lang: SupportedLocale) {
  const constants = getConstants(lang);
  return {
    title: `${constants.SITE_TITLE} - ${tag}`,
    description: `${constants.TAGS_DESCRIPTION} ${tag}.`,
  };
}

export function getCategoryMetadata(category: string, lang: SupportedLocale) {
  const constants = getConstants(lang);
  return {
    title: `${constants.SITE_TITLE} - ${category}`,
    description: `${constants.SITE_DESCRIPTION} ${category}.`,
  };
}
