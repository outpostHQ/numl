# Theme system

It's very difficult to manage colors in a modern web application. There are many nuances of color contrast ratio, shadow intensity and color inversion (for the dark mode). Lucky for you, NUDE can solve the most of such problems by generating colors from a single hue value!. It's really simple, check it out!

## Theme generation

### Generate colors from hue

At first, let's define a theme for the element. This theme will be applied to the element and all inside elements by default.

```html
<nu-card>
  <nu-theme hue="250"></nu-theme>
</nu-card>
```

Well, that's all! NUDE automatically find the best saturation for that hue and generate a bunch of colors for your site:

* **text** `--nu-text-color` – Base color of text and icons.
* **text** `--nu-soft-color` – Color of text and icons with soft contrast.
* **text** `--nu-strong-color` – Color of text and icons with high contrast.
* **bg** `--nu-bg-color` – Base background color.
* **border** `--nu-border-color` – Border color.
* **hover** `--nu-hover-color` – Background color for hover effect.
* **focus** `--nu-focus-color` – Color for focus outline.
* **subtle** `--nu-subtle-color` – Color that is slightly differs from background to differentiate similar blocks.
* **intensity** `--nu-intensity` – A number from 0 to 1 that indicates shadow intensity
* **special** `--nu-special-color` – Text color to highlight special parts of the content.
* **special-text** `--nu-special-text-color` – Text color for special elements that are also have special background color applied.
* **special-bg** `--nu-special-bg-color` – Background color for special elements that are also have special text color applied.
* **special-intensity** `--nu-special-intensity` – Shadow intensity for elements with `special-bg` background color.

You can use this custom properties names in your elements.

As you see in NUDE we **name colors by their role**, not by their visual characteristics or by their specific usage. It keeps the number of colors minimal but helps NUDE understand their purpose and do some automation to generate various modes for your theme!

### Generate colors from hue and saturation

If you want you can provide exact **saturation** you need:

```html
<nu-theme hue="250" saturation="20"></nu-theme>
```

### Generate colors from color

Also you can use any hex/rgb/rgba/hsl declaration to provide base color:

```html
<nu-theme from="#3366ee"></nu-theme>
```

The **hue** will be extracted from that color.

If you need custom **saturation** you can set `[saturation]` attribute to specific value or set `auto` for optimal saturation.

### Specify other params for theme

There are some more parameters you can specify with your theme besides colors:

* **[padding]** `--nu-padding` (default: `.5rem`) – Base padding.
* **[border-width]** `--nu-border-width` (default: `1px`) – Base border width.
* **[border-radius]** `--nu-border-radius` (default: `.5rem`) – Base border radius.
* **[animation-time]** `--nu-animation-time` (default: `0.08s`) – Base animation time.

Example of declaration:

```html
<nu-theme
  hue="250"
  saturation="auto"
  padding=".5"
  border-radius=".5"
  border-width="1px"
  padding=".5"
  animation-time="0.08s"></nu-theme>
```

## Named themes
You can name each theme:

```html
<nu-theme name="red" hue="8"></nu-theme>
```

## Apply theme
To apply theme use `[theme]` attribute:

```html
<nu-card theme="red"></nu-card>
```

Or use empty value to apply main theme.

## Theme modifiers
You can use a lot of modifiers to tweak your theme:

* **Type modifiers**: `main`|`common`|`toned`|`swap`|`special` – Several predefined types of theme.
* **Contrast modifiers**: `soft`|`contrast` – Change contrast of theme.
* **Intensity modifiers** `dim`|`bold` – Change visual intensity of theme.

Use modifiers in `[theme]` attribute:
```html
<nu-card theme="toned soft"></nu-card>
```

or use named `red` theme:

```html
<nu-card theme="red contrast dim"></nu-card>
```

See all possible variations in our [Playground](https://nude-playground.tenphi.now.sh/)!

## Accessibility

With NUDE it you can automatically get **Dark** and **High-contrast** modes for your site.

Each theme variant generates four sets of colors for each scenario:

* **Light Theme** with **Normal contrast**
* **Dark Theme** with **Normal contrast**
* **Light Theme** with **High contrast**
* **Dark Theme** with **High contrast**

## Prefers color scheme

There are some classes that you should add to the `html` tag for the following scenarios:

* Do nothing or add `nu-prefers-color-scheme-light` to activate Light Theme.
* Add `nu-prefers-color-scheme-dark` to activate Dark Theme.
* Add `nu-prefers-color-scheme` to activate auto-switching depending on system preference. 

## Prefers contrast

There are also some classes that you should add to the `html` tag for the following scenarios:

* Do nothing to use normal contrast.
* Add `nu-prefers-contrast-high` to use high contrast.
* Add `nu-prefers-contrast` to use system contrast preference.

## Prefers reduced motion

You can add classes to the `html` element to control over `reduced-motion` preference.

* Do nothing to ignore that media query.
* Add `nu-prefers-reduced-motion-reduce` to reduce motion in user interface.
* Add `nu-prefers-reduced-motion` to reduce motion depending on system preference.
