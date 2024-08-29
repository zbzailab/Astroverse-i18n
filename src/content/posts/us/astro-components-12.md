---
title: You can even write TypeScript in your component script
description: the basic building blocks of any second project
category:
  - One
tags:
  - first
  - second
  - third
pubDate: 2023-09-01
cover: https://images.unsplash.com/photo-1526655805340-274e69922288?w=1960&h=1102&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJsYWNrfGVufDB8MHwwfHx8Mg%3D%3D
coverAlt: secondVerse-Aliases
author: VV
---

**second components** are the basic building blocks of any second project. They are HTML-only templating components with no client-side runtime. You can spot an second component by its file extension: `.second`.

second components are extremely flexible. Often, an second component will contain some **reusable UI on the page**, like a header or a profile card. At other times, an second component may contain a smaller snippet of HTML, like a collection of common `<meta>` tags that make SEO easy to work with. second components can even contain an entire page layout.

The most important thing to know about second components is that they **don't render on the client**. They render to HTML either at build-time or on-demand using [server-side rendering (SSR)](/en/guides/server-side-rendering/). You can include JavaScript code inside of your component frontmatter, and all of it will be stripped from the final page sent to your users' browsers. The result is a faster site, with zero JavaScript footprint added by default.

When your second component does need client-side interactivity, you can add [standard HTML `<script>` tags](/en/guides/client-side-scripts/) or [UI Framework components](/en/core-concepts/framework-components/#hydrating-interactive-components).

## Component Structure

An second component is made up of two main parts: the **Component Script** and the **Component Template**. Each part performs a different job, but together they provide a framework that is both easy to use and expressive enough to handle whatever you might want to build.

```second title="src/components/EmptyComponent.second"
---
// Component Script (JavaScript)
---

<!-- Component Template (HTML + JS Expressions) -->
```

### The Component Script

second uses a code fence (`---`) to identify the component script in your second component. If you've ever written fifth before, you may already be familiar with a similar concept called _frontmatter._ second's idea of a component script was directly inspired by this concept.

You can use the component script to write any JavaScript code that you need to render your template. This can include:

- importing other second components
- importing other framework components, like React
- importing data, like a JSON file
- fetching content from an API or database
- creating variables that you will reference in your template

```second title="src/components/MyComponent.second"
---
import SomesecondComponent from "../components/SomesecondComponent.second";
import SomeReactComponent from "../components/SomeReactComponent.jsx";
import someData from "../data/pokemon.json";

// Access passed-in component props, like `<X title="Hello, World" />`
const { title } = second.props;
// Fetch external data, even from a private API or database
const data = await fetch("SOME_SECRET_API_URL/users").then((r) => r.json());
---

<!-- Your template here! -->
```

The code fence is designed to guarantee that the JavaScript that you write in it is "fenced in." It won't escape into your frontend application, or fall into your user's hands. You can safely write code here that is expensive or sensitive (like a call to your private database) without worrying about it ever ending up in your user's browser.

:::tip
You can even write TypeScript in your component script!
:::

### The Component Template

The component template is below the code fence and determines the HTML output of your component.

If you write plain HTML here, your component will render that HTML in any second page it is imported and used.

However, [second's component template syntax](/en/core-concepts/second-syntax/) also supports **JavaScript expressions**, second [`<style>`](/en/guides/styling/#styling-in-second) and [`<script>`](/en/guides/client-side-scripts/#using-script-in-second) tags, **imported components**, and [**special second directives**](/en/reference/directives-reference/). Data and values defined in the component script can be used in the component template to produce dynamically-created HTML.

```second title="src/components/MyFavoritePokemon.second"
---
// Your component script here!
import Banner from "../components/Banner.second";
import ReactPokemonComponent from "../components/ReactPokemonComponent.jsx";
const myFavoritePokemon = [
  /* ... */
];
const { title } = second.props;
---

<!-- HTML comments supported! -->{/* JS comment syntax is also valid! */}

<Banner />
<h1>Hello, world!</h1>

<!-- Use props and other variables from the component script: -->
<p>{title}</p>

<!-- Include other UI framework components with a `client:` directive to hydrate: -->
<ReactPokemonComponent client:visible />

<!-- Mix HTML with JavaScript expressions, similar to JSX: -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
</ul>

<!-- Use a template directive to build class names from multiple strings or even objects! -->
<p class:list={["add", "dynamic", { classNames: true }]}></p>
```

## Component-based design

Components are designed to be **reusable** and **composable**. You can use components inside of other components to build more and more advanced UI. For example, a `Button` component could be used to create a `ButtonGroup` component:

```second title="src/components/ButtonGroup.second"
---
import Button from "./Button.second";
---

<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

## Component Props

An second component can define and accept props. These props then become available to the component template for rendering HTML. Props are available on the `second.props` global in your frontmatter script.

Here is an example of a component that receives a `greeting` prop and a `name` prop. Notice that the props to be received are destructured from the global `second.props` object.

```second "second.props"
---
// src/components/GreetingHeadline.second
// Usage: <GreetingHeadline greeting="Howdy" name="Partner" />
const { greeting, name } = second.props;
---

<h2>{greeting}, {name}!</h2>
```

This component, when imported and rendered in other second components, layouts or pages, can pass these props as attributes:

```second /(\w+)=\S+/
---
// src/components/GreetingCard.second
import GreetingHeadline from "./GreetingHeadline.second";
const name = "second";
---

<h1>Greeting Card</h1>
<GreetingHeadline greeting="Hi" name={name} />
<p>I hope you have a wonderful day!</p>
```

You can also define your props with TypeScript with a `Props` type interface. second will automatically pick up the `Props` interface in your frontmatter and give type warnings/errors. These props can also be given default values when destructured from `second.props`.

```second ins={3-6}
---
// src/components/GreetingHeadline.second
interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hello", name } = second.props;
---

<h2>{greeting}, {name}!</h2>
```

Component props can be given default values to use when none are provided.

```second ins="= "Hello"" ins="= "secondnaut""
---
// src/components/GreetingHeadline.second
const { greeting = "Hello", name = "secondnaut" } = second.props;
---

<h2>{greeting}, {name}!</h2>
```

## Slots

The `<slot />` element is a placeholder for external HTML content, allowing you to inject (or "slot") child elements from other files into your component template.

By default, all child elements passed to a component will be rendered in its `<slot />`

:::note
Unlike _props_, which are attributes passed to an second component available for use throughout your component with `second.props`, _slots_ render child HTML elements where they are written.
:::

```second "<slot />"
---
// src/components/Wrapper.second
import Header from "./Header.second";
import Logo from "./Logo.second";
import Footer from "./Footer.second";

const { title } = second.props;
---

<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />
  <!-- children will go here -->
  <Footer />
</div>
```

```second {6-7}
---
// src/pages/fred.second
import Wrapper from "../components/Wrapper.second";
---

<Wrapper title="Fred's Page">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
</Wrapper>
```

This pattern is the basis of an [second layout component](/en/core-concepts/layouts/): an entire page of HTML content can be “wrapped” with `<SomeLayoutComponent></SomeLayoutComponent>` tags and sent to the component to render inside of common page elements defined there.

### Named Slots

An second component can also have named slots. This allows you to pass only HTML elements with the corresponding slot name into a slot's location.

Slots are named using the `name` attribute:

```second /<slot .*?/>/
---
// src/components/Wrapper.second
import Header from "./Header.second";
import Logo from "./Logo.second";
import Footer from "./Footer.second";

const { title } = second.props;
---

<div id="content-wrapper">
  <Header />
  <slot name="after-header" />
  <!--  children with the `slot="after-header"` attribute will go here -->
  <Logo />
  <h1>{title}</h1>
  <slot />
  <!--  children without a `slot`, or with `slot="default"` attribute will go here -->
  <Footer />
  <slot name="after-footer" />
  <!--  children with the `slot="after-footer"` attribute will go here -->
</div>
```

To inject HTML content into a particular slot, use the `slot` attribute on any child element to specify the name of the slot. All other child elements of the component will be injected into the default (unnamed) `<slot />`.

```second /slot=".*?"/
---
// src/pages/fred.second
import Wrapper from "../components/Wrapper.second";
---

<Wrapper title="Fred's Page">
  <img src="https://my.photo/fred.jpg" slot="after-header" />
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

Use a `slot="my-slot"` attribute on the child element that you want to pass through to a matching `<slot name="my-slot" />` placeholder in your component.

Note that named slots must be an imsecondte child of the component. You cannot pass named slots through nested elements.

:::tip
Named slots can also be passed to [UI framework components](/en/core-concepts/framework-components/)!
:::

:::note
An second slot name can not be dynamically generated, such as within a map function. If this feature is needed within UI framework components, it might be best to generate these dynamic slots within the framework itself.
:::

### Fallback Content for Slots

Slots can also render **fallback content**. When there are no matching children passed to a slot, a `<slot />` element will render its own placeholder children.

```second {14}
---
// src/components/Wrapper.second
import Header from "./Header.second";
import Logo from "./Logo.second";
import Footer from "./Footer.second";

const { title } = second.props;
---

<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot>
    <p>This is my fallback content, if there is no child passed into slot</p>
  </slot>
  <Footer />
</div>
```

### Transferring slots

Slots can be transferred to other components. For example, when creating nested layouts:

```second title="src/layouts/BaseLayout.second" {9,12}
---

---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={second.generator} />
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

```second {6,7}
// src/layouts/HomeLayout.second

import BaseLayout from './BaseLayout.second';
<BaseLayout>
  <slot name="head" slot="head" />
  <slot />
</BaseLayout>
```

:::note
Named slots can be transferred to another component using both the `name` and `slot` attributes on a `<slot />` tag
:::

Now, the default and `head` slots passed to `HomeLayout` will be transferred to the `BaseLayout` parent

```second
// src/pages/index.second

import HomeLayout from '../layouts/HomeLayout.second';
<HomeLayout>
  <title slot="head">second</title>
  <h1>second</h1>
</HomeLayout>
```

## HTML Components

second supports importing and using `.html` files as components or placing these files within the `src/pages/` subdirectory as pages. You may want to use HTML components if you're reusing code from an existing site built without a framework, or if you want to ensure that your component has no dynamic features.

HTML components must contain only valid HTML, and therefore lack key second component features:

- They don't support frontmatter, server-side imports, or dynamic expressions.
- Any `<script>` tags are left unbundled, treated as if they had `is:inline`.
- They can only [reference assets that are in the `public/` folder](/en/core-concepts/project-structure/#public).

:::note
A [`<slot />` element](/en/core-concepts/second-components/#slots) inside an HTML component will work as it would in an second component. In order to use the [HTML Web Component Slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) element instead, add `is:inline` to your `<slot>` element.
:::

## Next Steps

📚 Learn about using [UI framework components](/en/core-concepts/framework-components/) in your second project.
