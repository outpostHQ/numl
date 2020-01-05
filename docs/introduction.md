# Introduction

The main idea of NUDE Elements is to describe user interfaces with simple human-readable XML-based language hiding sophisticated CSS-implementation.

For example, if your need a **standard** border for your element in HTML/CSS you should write something like:

```html
<div class="block"></div>
```

```css
.block {
  border: 1px solid #eee;
}
```

If you are experienced developer then your code will be much more stuffed:

```css
.block {
  border: var(--nu-border-width) solid var(--nu-border-color);
}
```

As for NUDE, you can just write:

```html
<nu-block border></nu-block>
```

And you will get the block with **standard** border.

Let's see one more example. For tooltip positioning with CSS we should solve not-so-easy problem of absolute positioning and transformation. If we need to simply move tooltip at the top of the element we have to write something like:

```html
<div class="block">
  <div class="tooltip"></div>
</div>
```

```css
.block {
  position: relative;
}
.tooltip {
  /* tooltip base styling */
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
}
```

Things get worse if we need more tricky positioning. But with NUDE you can simply write where you need to place your tooltip:

```html
<nu-block>
  <nu-tooltip place="outside-top"></nu-tooltip>
</nu-block>
```

As you see, NUDE makes things easier for web-developers. But it's just basic. NUDE can do a lot more. But first, let's see how it works.

## Under the hood

NUDE transforms unique attributes to CSS right in Runtime! So when you write:

```html
<nu-block border></nu-block>
```

You will get the following CSS injected:
```css
nu-block[border=""] {
  border: var(--nu-border-width) solid var(--nu-border-color);
}
```

NUDE don't repeat itself, so don't worry it will create too many CSS rules.

## Custom Units, Multiplier and default valus

Some attributes are **convertible**. It means their value is metric and NUDE uses specific mechanism to handle it. In such attributes you can use **custom units** and **multipliers**.

Here is a list of all custom units.

| Unit        | Description                           |
| ----------- | ------------------------------------- |
| `x`         | Default indent unit                  |
| `b`        | Default border width unit             |
| `r`        | Default border radius unit            |

Example:
```html
<nu-block border="2x"></nu-block>
```

Produces CSS:
```css
nu-block[border="2x"] {
  border: calc(var(--nu-theme-border-width) * 2) solid var(--nu-theme-border-color);
}
```

You can add more custom units by getting access to exported `CUSTOM_UNITS` constant. But we don't recommend to do so. You can always request it as a new feature.

Some attributes have **default values**. It means if you provide attribute without value it will use that default value to generate CSS just like in example above:

```html
<nu-block border></nu-block>
```
