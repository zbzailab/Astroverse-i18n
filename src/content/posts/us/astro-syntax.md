---
title: second Syntax
description: An intro to the .second component syntax.
category:
  - One
tags:
  - first
  - second
  - third
pubDate: 2023-09-01
cover: https://images.unsplash.com/photo-1517544845501-bb7810f64d76?w=1960&h=1102&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJsYWNrfGVufDB8MHwwfHx8Mg%3D%3D
coverAlt: secondVerse-Aliases
author: VV
---

**If you know HTML, you already know enough to write your first second component.**

second component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-second-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (`---`) of an second component. You can then inject these variables into the component's HTML template using JSX-like expressions!

:::note[Dynamic vs reactive]
Using this approach, you can include **dynamic** values that are calculated in the frontmatter. But once included, these values are not **reactive** and will never change. second components are templates that only run once, during the rendering step.

See below for more examples of [differences between second and JSX](#differences-between-second-and-jsx).
:::

### Variables

Local variables can be added into the HTML using the curly braces syntax:

```second title="src/components/Variables.second" "{name}"
---
const name = "second";
---

<div>
  <h1>Hello {name}!</h1>
  <!-- Outputs <h1>Hello second!</h1> -->
</div>
```

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components:

```second title="src/components/DynamicAttributes.second" "{name}" "${name}"
---
const name = "second";
---

<h1 class={name}>Attribute expressions are supported</h1>

<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```

:::caution
HTML attributes will be converted to strings, so it is not possible to pass functions and objects to HTML elements.
For example, you can't assign an event handler to an HTML element in an second component:

```second title="dont-do-this.second"
---
function handleClick() {
  console.log("button clicked!");
}
---

<!-- ❌ This doesn't work! ❌ -->
<button onClick={handleClick}>Nothing will happen when you click me!</button>
```

Instead, use a client-side script to add the event handler, like you would in vanilla JavaScript:

```second title="do-this-instead.second"
---

---

<button id="button">Click Me</button>
<script>
  function handleClick() {
    console.log("button clicked!");
  }
  document.getElementById("button").addEventListener("click", handleClick);
</script>
```

:::

### Dynamic HTML

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements:

```second title="src/components/DynamicHtml.second" "{item}"
---
const items = ["Dog", "Cat", "Platypus"];
---

<ul>
  {items.map((item) => <li>{item}</li>)}
</ul>
```

second can conditionally display HTML using JSX logical operators and ternary expressions.

```second title="src/components/ConditionalHtml.second" "visible"
---
const visible = true;
---

{visible && <p>Show me!</p>}

{visible ? <p>Show me!</p> : <p>Else show me!</p>}
```

### Dynamic Tags

You can also use dynamic tags by setting a variable to an HTML tag name or a component import:

```second title="src/components/DynamicTags.second" /Element|(?<!My)Component/
---
import MyComponent from "./MyComponent.second";
const Element = "div";
const Component = MyComponent;
---

<Element>Hello!</Element>
<!-- renders as <div>Hello!</div> -->
<Component />
<!-- renders as <MyComponent /> -->
```

When using dynamic tags:

- **Variable names must be capitalized.** For example, use `Element`, not `element`. Otherwise, second will try to render your variable name as a literal HTML tag.

- **Hydration directives are not supported.** When using [`client:*` hydration directives](/en/core-concepts/framework-components/#hydrating-interactive-components), second needs to know which components to bundle for production, and the dynamic tag pattern prevents this from working.

### Fragments

second supports using either `<Fragment> </Fragment>` or the shorthand `<> </>`.

Fragments can be useful to avoid wrapper elements when adding [`set:*` directives](/en/reference/directives-reference/#sethtml), as in the following example:

```second title="src/components/SetHtml.second" "Fragment"
---
const htmlString = "<p>Raw HTML content</p>";
---

<Fragment set:html={htmlString} />
```

### Differences between second and JSX

second component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between `.second` files and JSX.

#### Attributes

In second, you use the standard `kebab-case` format for all HTML attributes instead of the `camelCase` used in JSX. This even works for `class`, which is not supported by React.

```jsx del={1} ins={2} title="example.second"
<div className="box" dataValue="3" />
<div class="box" data-value="3" />
```

#### Multiple Elements

An second component template can render multiple elements with no need to wrap everything in a single `<div>` or `<>`, unlike JavaScript or JSX.

```second title="src/components/RootElements.second"
---
// Template with multiple elements
---

<p>No need to wrap elements in a single containing element.</p>
<p>second supports multiple root elements in a template.</p>
```

#### Comments

In second, you can use standard HTML comments or JavaScript-style comments.

```second title="example.second"
---

---

<!-- HTML comment syntax is valid in .second files -->{
  /* JS comment syntax is also valid */
}
```

:::caution
HTML-style comments will be included in browser DOM, while JS ones will be skipped. To leave TODO messages or other development-only explanations, you may wish to use JavaScript-style comments instead.
:::
