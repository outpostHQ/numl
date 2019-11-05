# `<nu-switch/>` element

## Base info
* Parent: [`<nu-activeelement/>`](./nu-activeelement.md)
* Type: `element`
* Role: `switch`
* Auto ID: `btn`


## Own default values
* **`[display]="inline-block"`**

## Inherited default values
* **`[color]="inherit"`**
* **`[fill]=""`**
* **`[radius]=""`**
* **`[sizing]="border"`**
* **`[text]="nowrap"`**
* **`[transition]="box-shadow, color, background-color"`**


## Own attributes
* **checked** `widget`
* **disabled** `style`
* **radius** `style`


## Inherited attributes
* **[`[activedescendant]`](../attributes/activedescendant.md)** `aria`
* **[`[area]`](../attributes/area.md)** `style`
* **[`[areas]`](../attributes/areas.md)** `style`
* **[`[as]`](../attributes/as.md)** `helper`
* **[`[basis]`](../attributes/basis.md)** `style`
* **[`[border]`](../attributes/border.md)** `style`
* **[`[color]`](../attributes/color.md)** `style`
* **[`[column]`](../attributes/column.md)** `style`
* **[`[columns]`](../attributes/columns.md)** `style`
* **[`[content]`](../attributes/content.md)** `style`
* **[`[controls]`](../attributes/controls.md)** `aria`
* **[`[cursor]`](../attributes/cursor.md)** `style`
* **[`[describedby]`](../attributes/describedby.md)** `aria`
* **[`[display]`](../attributes/display.md)** `style`
* **[`[expanded]`](../attributes/expanded.md)** `aria`
* **[`[fill]`](../attributes/fill.md)** `style`
* **[`[flow]`](../attributes/flow.md)** `style`
* **[`[flowto]`](../attributes/flowto.md)** `aria`
* **[`[gap]`](../attributes/gap.md)** `style`
* **[`[grow]`](../attributes/grow.md)** `style`
* **[`[haspopup]`](../attributes/haspopup.md)** `aria`
* **[`[height]`](../attributes/height.md)** `style`
* **[`[hide]`](../attributes/hide.md)** `style`
* `href`
* **[`[id]`](../attributes/id.md)** `style`
* **[`[image]`](../attributes/image.md)** `style`
* **[`[interactive]`](../attributes/interactive.md)** `style`
* **[`[items]`](../attributes/items.md)** `style`
* **[`[items-basis]`](../attributes/items-basis.md)** `style`
* **[`[items-grow]`](../attributes/items-grow.md)** `style`
* **[`[items-padding]`](../attributes/items-padding.md)** `style`
* **[`[items-radius]`](../attributes/items-radius.md)** `style`
* **[`[items-shrink]`](../attributes/items-shrink.md)** `style`
* **[`[label]`](../attributes/label.md)** `aria`
* **[`[labelledby]`](../attributes/labelledby.md)** `aria`
* **[`[opacity]`](../attributes/opacity.md)** `style`
* **[`[order]`](../attributes/order.md)** `style`
* **[`[overflow]`](../attributes/overflow.md)** `style`
* **[`[owns]`](../attributes/owns.md)** `aria`
* **[`[padding]`](../attributes/padding.md)** `style`
* **[`[place]`](../attributes/place.md)** `style`
* **[`[posinset]`](../attributes/posinset.md)** `aria`
* `pressed`
* **[`[responsive]`](../attributes/responsive.md)** `style`
* **[`[row]`](../attributes/row.md)** `style`
* **[`[rows]`](../attributes/rows.md)** `style`
* **[`[setsize]`](../attributes/setsize.md)** `aria`
* **[`[shadow]`](../attributes/shadow.md)** `style`
* **[`[shrink]`](../attributes/shrink.md)** `style`
* **[`[size]`](../attributes/size.md)** `style`
* **[`[sizing]`](../attributes/sizing.md)** `style`
* **[`[space]`](../attributes/space.md)** `style`
* `target`
* **[`[text]`](../attributes/text.md)** `style`
* **[`[theme]`](../attributes/theme.md)** `helper`
* **[`[transform]`](../attributes/transform.md)** `style`
* **[`[transition]`](../attributes/transition.md)** `style`
* `value`
* **[`[valuemax]`](../attributes/valuemax.md)** `aria`
* **[`[valuemin]`](../attributes/valuemin.md)** `aria`
* **[`[valuenow]`](../attributes/valuenow.md)** `aria`
* **[`[width]`](../attributes/width.md)** `style`
* **[`[z]`](../attributes/z.md)** `style`

## Generated CSS
```css
nu-switch[hidden] {
  display: none !important;
}
nu-switch {
  --nu-depth-color: transparent;
  --nu-border-radius: calc(var(--nu-size) / 2);
  --nu-switch-color: rgba(0, 0, 0, 0);
  --nu-border-shadow: inset 0 0 0 var(--nu-theme-border-width) var(--nu-theme-border-color);
  --nu-depth-shadow: 0 .25rem 1.5rem var(--nu-depth-color);
  --nu-switch-background-color: var(--nu-theme-background-color);
  --nu-switch-shadow: 0 0 1rem 0 var(--nu-switch-color) inset;
  --nu-size: 2em;
  --nu-circle-padding: calc(var(--nu-theme-border-width) * 4);
  --nu-circle-size: calc(var(--nu-size) - var(--nu-circle-padding) * 2);
  --nu-circle-offset: var(--nu-circle-padding);
  --nu-circle-opacity: 1;
  --nu-circle-border-radius: calc(var(--nu-circle-size) / 2);
  --nu-circle-background-color: var(--nu-theme-special-color);
  position: relative;
  width: calc(var(--nu-size) * 2);
  height: var(--nu-size);
  border-radius: var(--nu-border-radius);
  background-color: var(--nu-switch-background-color) !important;
  cursor: pointer;
  box-shadow: var(--nu-depth-shadow),
    var(--nu-switch-shadow),
    var(--nu-border-shadow);
  transition: box-shadow var(--nu-theme-animation-time) linear,
    filter var(--nu-theme-animation-time) linear;
  user-select: none;
  vertical-align: middle;
}
nu-switch::after {
  content: "";
  position: absolute;
  display: block;
  width: var(--nu-circle-size);
  height: var(--nu-circle-size);
  pointer-events: none;
  left: 0;
  top: var(--nu-circle-padding);
  transform: translate(var(--nu-circle-offset), 0);
  transition: transform var(--nu-theme-animation-time) linear,
    opacity var(--nu-theme-animation-time) linear,
    background-color var(--nu-theme-animation-time) linear;
  background-color: var(--nu-circle-background-color);
  border-radius: var(--nu-circle-border-radius);
  /*box-shadow: var(--nu-border-shadow);
    */
  opacity: var(--nu-circle-opacity);
}
nu-switch[disabled] {
  opacity: .5;
  cursor: default;
}
nu-switch[nu-pressed] {
  --nu-switch-background-color: var(--nu-theme-special-color);
  --nu-circle-offset: calc(var(--nu-size) * 2 - var(--nu-circle-padding) - var(--nu-circle-size));
  --nu-circle-opacity: 1;
  --nu-circle-background-color: var(--nu-theme-background-color);
}
nu-switch[nu-active]:not([disabled]):not([nu-pressed]) {
  --nu-switch-color: rgba(0, 0, 0, var(--nu-theme-shadow-opacity));
}
nu-switch[nu-active][nu-pressed]:not([disabled]) {
  --nu-switch-color: rgba(0, 0, 0, var(--nu-theme-special-shadow-opacity));
}
nu-switch {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
  outline: none;
}
html.nu-focus-enabled nu-switch:not([disabled])::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  border-radius: var(--nu-border-radius);
  box-shadow: var(--nu-focus-shadow);
  transition: box-shadow var(--nu-theme-animation-time) linear;
}
html.nu-focus-enabled nu-switch:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-switch:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
```
