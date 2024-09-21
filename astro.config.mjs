import { defineConfig } from "astro/config";
import { remarkModifiedTime } from "./src/utils/remark-modified-time.mjs";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import rehypeExternalLinks from "rehype-external-links";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://idimi.com",
  trailingSlash: "always",
  prefetch: true,
  i18n: {
    defaultLocale: "en",
    locales: [
      "zh",
      "en",
    ],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" },
        },
      ],
    ],
  },
  integrations: [
    sitemap({
      entryLimit: 10000,
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          zh: "zh-CN",
          fr: "fr-FR",
          ar: "ar-SA",
          es: "es-ES",
          ru: "ru-RU",
          ja: "ja-JP",
          ko: "ko-KR",
          pt: "pt-PT",
          de: "de-DE",
          id: "id-ID",
          hi: "hi-IN",
        },
      },
    }),
    mdx(),
    pagefind(),
    tailwind(),
    icon({
      include: {
        tabler: ["*"],
        mdi: ["*"],
        "material-symbols": ["*"],
        flagpack: ["*"],
        "flat-color-icons": ["*"],
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
