# Theme system

It's very difficult to manage colors in a modern web application. There are many nuances of color contrast ratio, shadow intensity and color inversion (for the dark mode). Lucky for you, NUDE can solve the most of such problems by generating colors from your theme definition. It's really simple, check it out!

At first, let's define default theme for the element.

```html
<nu-card>
  <nu-theme
    color="#333"
    background="#fff"
    border-color="rgba(210, 221, 236, 1)"
    special-color="rgba(24, 133, 217, 1)"></nu-theme>
</nu-card>
```

These four colors are base colors for theme. They are required to generate a full-featured color theme with all needed shades for your application.

You can use any color declaration that browser supports and even Custom Properties (but after theme generation is complete you won't be able to manipulate colors by changing Custom Properties). Usage of HTML color names (like `yellow`, `green` and etc) requires additional file named `numl.colors.js` to be included in your app before NUDE. You can even add your own predefined colors if you need.

Such declaration will define a set of custom properties that will contain corresponding colors and params:

Full list of generated custom properties for `default` theme:

* **[color]** `--nu-theme-color` (default: `#333`) – Base color of theme. It's primary used for **text** coloring.
* **[background-color]** `--nu-theme-backgroundcolor` (default: `#fff`) – Base **background** color.
* **[border-color]** `--nu-theme-border-color` (default: `rgba(210, 221, 236, 1)`) – Base **border** color.
* **[special-color]** `--nu-theme-special-color` (default: `rgba(24, 133, 217, 1)`) – A **special** color, also known as **active** or **primary** color. It's used for highlighting active elements that need user attention or for decoration purposes.
* **[shadow-color]** `--nu-theme-hover-color` – Shadow color to color element shadows. Alpha channel can be used to define `shadow-intensity` attribute.
* **[minor-color]** `--nu-theme-minor-color` – Minor text color. It's used for minor text labels, some headers and non-active elements. If not provided then generated from `color` and `background-color`.
* **[minor-background-color]** `--nu-theme-minor-color` – Minor background color that identifies non-active zones and highlights headers blocks if needed. If not provided then generated from `background-color` and `color`.
* **[hover-color]** `--nu-theme-hover-color` – Hover color to identify hover state of active elements. If not specified then generated from `special-color`.
* **[focus-color]** `--nu-theme-hover-color` – Focus color to identify focus state of active elements. If not specified then generated from `background-color` and `special-color`.
* **[special-background-color]** `--nu-theme-hover-color` – Contrast color for `special-color`. It's used in elements that are marked as `special`. If not specified then generated from `color`, `background-color` and `special-color`.
* **[special-hover-color]** `--nu-theme-hover-color` – Hover color for `special` elements. If not specified then generated from `special-background-color`.
* **[special-minor-color]** `--nu-theme-hover-color` – Minor color for `special` elements. If not specified then generated from `special-background-color` and `special-color`.
* **[subtle-color]** `--nu-theme-hover-color` – Subtle color to separate identical elements by providing background for one of them. If not specified then generated from `background-color` and `special-color`.
* **[heading-color]** `--nu-theme-heading-color` – Header color to compensate their font weight over base text. If not specified then generated from `color` and `background-color`.

There are some more parameters you can specify with your theme besides colors:

* **[padding]** `--nu-theme-padding` (default: `.5rem`) – Base padding.
* **[border-width]** `--nu-theme-padding` (default: `1px`) – Base border width.
* **[border-radius]** `--nu-theme-border-radius` (default: `.5rem`) – Base border radius.
* **[animation-time]** `--nu-theme-animation-time` (default: `0.08s`) – Base animation time.
* **[shadow-intensity]** `--nu-theme-shadow-intensity` (default: `.5rem`) – Base shadow intensity. It can be specified by providing alpha channel to the `shadow-color` parameter.

As you see in NUDE we **name colors by their role**, not by their visual characteristics or by their specific usage. It keeps the number of colors minimal but helps NUDE understand their purpose and do some automation to generate not provided color and even DARK THEME!

## Prefers color scheme

With NUDE it can be fully automatic to generate Dark Theme for your site.

There are some requirements to make it work:

**First step**: you need to specify default theme for your top-level NUDE Element. Even empty theme will be enough.

```html
<nu-block>
  <nu-theme></nu-theme>
</nu-block>
```

It will generate all needed custom properties to make Dark Theme work.

**Second step**: There are some classes that you should add to the `html` tag for the following cases:

* Do nothing or add `nu-prefers-color-scheme-light` to activate Light Theme.
* Add `nu-prefers-color-scheme-dark` to activate Dark Theme.
* Add `nu-prefers-color-scheme` to activate auto-switching depending on system preference. 

## Prefers reduced motion

You can add classes to the `html` element to control over `reduced-motion` preference.

* Do nothing to ignore that media query.
* Add `nu-prefers-reduced-motion-reduce` to reduce motion in user interface.
* Add `nu-prefers-reduced-motion` to reduce motion depending on system preference.

## Prefers contrast

NUDE currently supports this feature via CSS filter. It's not perfect and have some issues with fixed positioning but you can use if you really want.

You can add class `nu-prefers-contrast-high` to the `html` element to increase contrast of your site. But currently there is no way to inherit system preference.

NUDE will support generated contrast theme later.
