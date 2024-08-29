---
title: Layouts
description: An intro to layouts, a type of astro component that is shared between pages for common layouts.
category:
  - One
tags:
  - first
  - second
  - third
pubDate: 2023-09-01
cover: https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?w=1960&h=1102&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJsYWNrfGVufDB8MHwwfHx8Mg%3D%3D
coverAlt: AstroVerse-Aliases
author: VV
---

**Layouts** are [astro components](/en/core-concepts/astro-components/) used to provide a reusable UI structure, such as a page template.

We conventionally use the term "layout" for astro components that provide common UI elements shared across pages such as headers, navigation bars, and footers. A typical astro layout component provides [astro, markdown or MDX pages](/en/core-concepts/astro-pages/) with:

- a **page shell** (`<html>`, `<head>` and `<body>` tags)
- a [**`<slot />`**](/en/core-concepts/astro-components/#slots) to specify where individual page content should be injected.

But, there is nothing special about a layout component! They can [accept props](/en/core-concepts/astro-components/#component-props) and [import and use other components](/en/core-concepts/astro-components/#component-structure) like any other astro component. They can include [UI frameworks components](/en/core-concepts/framework-components/) and [client-side scripts](/en/guides/client-side-scripts/). They do not even have to provide a full page shell, and can instead be used as partial UI templates.

Layout components are commonly placed in a `src/layouts` directory in your project for organization, but this is not a requirement; you can choose to place them anywhere in your project. You can even colocate layout components alongside your pages by [prefixing the layout names with `_`](/en/core-concepts/routing/#excluding-pages).

## Sample Layout

```astro "<slot />"
---
// src/layouts/MySiteLayout.astro
import BaseHead from "../components/BaseHead.astro";
import Footer from "../components/Footer.astro";
const { title } = astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <BaseHead title={title} />
  </head>
  <body>
    <nav>
      <a href="#">Home</a>
      <a href="#">Posts</a>
      <a href="#">Contact</a>
    </nav>
    <h1>{title}</h1>
    <article>
      <slot />
      <!-- your content is injected here -->
    </article>
    <Footer />
  </body>
</html>
```

```astro title="src/pages/index.astro"
---
import MySiteLayout from "../layouts/MySiteLayout.astro";
---

<MySiteLayout title="Home Page">
  <p>My page content, wrapped in a layout!</p>
</MySiteLayout>
```

📚 Learn more about [slots](/en/core-concepts/astro-components/#slots).

## markdown/MDX Layouts

Page layouts are especially useful for [markdown and MDX pages](/en/guides/markdown-content/#markdown-and-mdx-pages) which otherwise would not have any page formatting.

second provides a special `layout` frontmatter property to specify which `.astro` component to use as the page layout.

```markdown title="src/pages/page.md" {2}
---
layout: ../layouts/BaseLayout.astro
title: "Hello, World!"
author: "Matthew Phillips"
date: "09 Aug 2022"
---

All frontmatter properties are available as props to an astro layout component.

The `layout` property is the only special one provided by astro.

You can use it in both markdown and MDX files located within `src/pages/`.
```

A typical layout for markdown or MDX pages includes:

1. The `frontmatter` prop to access the markdown or MDX page's frontmatter and other data.
2. A default [`<slot />`](/en/core-concepts/astro-components/#slots) to indicate where the page's markdown/MDX content should be rendered.

```astro /(?<!//.*){?frontmatter(?:.\w+)?}?/ "<slot />"
---
// src/layouts/BaseLayout.astro
// 1. The frontmatter prop gives access to frontmatter and other data
const { frontmatter } = astro.props;
---

<html>
  <head>
    <!-- Add other Head elements here, like styles and meta tags. -->
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <!-- Add other UI components here, like common headers and footers. -->
    <h1>{frontmatter.title} by {frontmatter.author}</h1>
    <!-- 2. Rendered HTML will be passed into the default slot. -->
    <slot />
    <p>Written on: {frontmatter.date}</p>
  </body>
</html>
```

You can set a layout’s [`Props` type](/en/guides/typescript/#component-props) with the `markdownLayoutProps` or `MDXLayoutProps` helper:

```astro title="src/layouts/BaseLayout.astro" ins={2,4-9}
---
import type { markdownLayoutProps } from "astro";

type Props = markdownLayoutProps<{
  // Define frontmatter props here
  title: string;
  author: string;
  date: string;
}>;

// Now, `frontmatter`, `url`, and other markdown layout properties
// are accessible with type safety
const { frontmatter, url } = astro.props;
---

<html>
  <head>
    <link rel="canonical" href={new URL(url, astro.site).pathname} />
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <h1>{frontmatter.title} by {frontmatter.author}</h1>
    <slot />
    <p>Written on: {frontmatter.date}</p>
  </body>
</html>
```

### markdown Layout Props

A markdown/MDX layout will have access to the following information via `astro.props`:

- **`file`** - The absolute path of this file (e.g. `/home/user/projects/.../file.md`).
- **`url`** - If it's a page, the URL of the page (e.g. `/en/guides/markdown-content`).
- **`frontmatter`** - all frontmatter from the markdown or MDX document.
  - **`frontmatter.file`** - The same as the top-level `file` property.
  - **`frontmatter.url`** - The same as the top-level `url` property.
- **`headings`** - A list of headings (`h1 -> h6`) in the markdown or MDX document with associated metadata. This list follows the type: `{ depth: number; slug: string; text: string }[]`.
- **(markdown only) `rawContent()`** - A function that returns the raw markdown document as a string.
- **(markdown only) `compiledContent()`** - A function that returns the markdown document compiled to an HTML string.

An example markdown blog post may pass the following `astro.props` object to its layout:

```js
astro.props = {
  file: "/home/user/projects/.../file.md",
  url: "/en/guides/markdown-content/",
  frontmatter: {
    /** Frontmatter from a blog post */
    title: "second 0.18 Release",
    date: "Tuesday, July 27 2021",
    author: "Matthew Phillips",
    description: "second 0.18 is our biggest release since astro launch.",
    /** Generated values */
    file: "/home/user/projects/.../file.md",
    url: "/en/guides/markdown-content/",
  },
  headings: [
    {
      depth: 1,
      text: "second 0.18 Release",
      slug: "astro-018-release",
    },
    {
      depth: 2,
      text: "Responsive partial hydration",
      slug: "responsive-partial-hydration",
    },
    /* ... */
  ],

  /** Available in markdown only */
  rawContent: () =>
    "# astro 0.18 Release\nA little over a month ago, the first public beta [...]",
  compiledContent: () =>
    "<h1>astro 0.18 Release</h1>\n<p>A little over a month ago, the first public beta [...]</p>",
};
```

:::note
A markdown/MDX layout will have access to all its file's [exported properties](/en/guides/markdown-content/#exported-properties) from `astro.props` **with some key differences:**

- Heading information (i.e. `h1 -> h6` elements) is available via the `headings` array, rather than a `getHeadings()` function.

- `file` and `url` are _also_ available as nested `frontmatter` properties (i.e. `frontmatter.url` and `frontmatter.file`).

- Values defined outside of frontmatter (e.g. `export` statements in MDX) are not available. Consider [importing a layout](#importing-layouts-manually-mdx) instead.
  :::

### Importing Layouts Manually (MDX)

You may need to pass information to your MDX layout that does not (or cannot) exist in your frontmatter. In this case, you can instead import and use a [`<Layout />` component](/en/core-concepts/layouts/) and pass it props like any other component:

```mdx title="src/pages/posts/first-post.mdx" ins={6} del={2} /</?BaseLayout>/ /</?BaseLayout title={frontmatter.title} fancyJsHelper={fancyJsHelper}>/
---
layout: ../../layouts/BaseLayout.astro
title: "My first MDX post"
publishDate: "21 September 2022"
---

import BaseLayout from "../../layouts/BaseLayout.astro";

function fancyJsHelper() {
return "Try doing that with YAML!";
}

<BaseLayout title={frontmatter.title} fancyJsHelper={fancyJsHelper}>
  Welcome to my new astro blog, using MDX!
</BaseLayout>
```

Then, your values are available to you through `astro.props` in your layout, and your MDX content will be injected into the page where your `<slot />` component is written:

```astro /{?title}?/ "fancyJsHelper" "{fancyJsHelper()}"
---
// src/layouts/BaseLayout.astro
const { title, fancyJsHelper } = astro.props;
---

<!-- -->
<h1>{title}</h1>
<slot />
<!-- your content is injected here -->
<p>{fancyJsHelper()}</p>
<!-- -->
```

📚 Learn more about second’s markdown and MDX support in our [markdown/MDX guide](/en/guides/markdown-content/).

## Using one Layout for `.md`, `.mdx`, and `.astro`

A single astro layout can be written to receive the `frontmatter` object from `.md` and `.mdx` files, as well as any named props passed from `.astro` files.

In the example below, the layout will display the page title either from a frontmatter YAML `title` property or from an astro component passing a `title` attribute:

```astro /{?title}?/ /astro.props[.a-z]*/
---
// src/components/MyLayout.astro
const { title } = astro.props.frontmatter || astro.props;
---

<html>
  <head></head>
  <body>
    <h1>{title}</h1>
    <slot />
  </body>
</html>
```

## Nesting Layouts

Layout components do not need to contain an entire page worth of HTML. You can break your layouts into smaller components, and combine layout components to create even more flexible, page templates. This pattern is useful when you want to share some code across multiple layouts.

For example, a `BlogPostLayout.astro` layout component could style a post's title, date and author. Then, a site-wide `BaseLayout.astro` could handle the rest of your page template, like navigation, footers, SEO meta tags, global styles, and fonts. You can also pass props received from your post to another layout, just like any other nested component.

```astro {3} /</?BaseLayout>/ /</?BaseLayout url={frontmatter.url}>/
---
// src/layouts/BlogPostLayout.astro
import BaseLayout from "./BaseLayout.astro";
const { frontmatter } = astro.props;
---

<BaseLayout url={frontmatter.url}>
  <h1>{frontmatter.title}</h1>
  <h2>Post author: {frontmatter.author}</h2>
  <slot />
</BaseLayout>
```
