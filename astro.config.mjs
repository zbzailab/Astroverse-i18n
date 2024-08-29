import { defineConfig } from "astro/config";
import { remarkModifiedTime } from "./src/utils/remark-modified-time.mjs";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://verse-i18n.vercel.app/",
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["zh", "en"],
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
  },
  integrations: [
    sitemap(),
    mdx(),
    pagefind(),
    tailwind(),
    icon({
      include: {
        tabler: ["*"],
        flagpack: ["*"],
        "flat-color-icons": ["*"],
      },
    }),
  ],
});
