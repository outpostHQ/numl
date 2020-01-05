# `<nu-switch/>` element

## Base info
* Parent: [`<nu-activeelement/>`](./nu-activeelement.md)
* Type: `element`
* Role: `switch`
* Auto ID: `btn`


## Own default values
* **`[border]`: `"1b"`**
* **`[display]`: `"inline-block"`**
* **`[radius]`: `"round"`**
* **`[sizing]`: `"content"`**

## Inherited default values
* **`[text]`: `"nowrap"`**
* **`[transition]`: `"box-shadow, color, background-color, border, border-radius"`**


## Own attributes
* **checked** `widget`
* **disabled** `style`


## Inherited attributes
* **[`[activedescendant]`](../attributes/activedescendant.md)** `aria`
* **[`[after]`](../attributes/after.md)** `style`
* **[`[area]`](../attributes/area.md)** `style`
* **[`[areas]`](../attributes/areas.md)** `style`
* **[`[as]`](../attributes/as.md)** `helper`
* **[`[basis]`](../attributes/basis.md)** `style`
* **[`[before]`](../attributes/before.md)** `style`
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
* **[`[filter]`](../attributes/filter.md)** `style`
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
* **[`[level]`](../attributes/level.md)** `aria`
* **[`[move]`](../attributes/move.md)** `style`
* **[`[opacity]`](../attributes/opacity.md)** `style`
* **[`[order]`](../attributes/order.md)** `style`
* **[`[overflow]`](../attributes/overflow.md)** `style`
* **[`[owns]`](../attributes/owns.md)** `aria`
* **[`[padding]`](../attributes/padding.md)** `style`
* **[`[place]`](../attributes/place.md)** `style`
* **[`[posinset]`](../attributes/posinset.md)** `aria`
* `pressed`
* **[`[prop]`](../attributes/prop.md)** `style`
* **[`[radius]`](../attributes/radius.md)** `style`
* **[`[responsive]`](../attributes/responsive.md)** `helper`
* **[`[rotate]`](../attributes/rotate.md)** `style`
* **[`[row]`](../attributes/row.md)** `style`
* **[`[rows]`](../attributes/rows.md)** `style`
* **[`[scale]`](../attributes/scale.md)** `style`
* **[`[scrollbar]`](../attributes/scrollbar.md)** `style`
* `selected`
* **[`[setsize]`](../attributes/setsize.md)** `aria`
* **[`[shadow]`](../attributes/shadow.md)** `style`
* **[`[shrink]`](../attributes/shrink.md)** `style`
* **[`[size]`](../attributes/size.md)** `style`
* **[`[sizing]`](../attributes/sizing.md)** `style`
* **[`[space]`](../attributes/space.md)** `style`
* **[`[special]`](../attributes/special.md)** `style`
* `target`
* **[`[text]`](../attributes/text.md)** `style`
* **[`[theme]`](../attributes/theme.md)** `helper`
* `to`
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
  --nu-local-depth-color: transparent;
  --nu-local-border-radius: calc(var(--nu-size) / 2);
  --nu-local-color: rgba(0, 0, 0, 0);
  --nu-local-depth-shadow: 0 .25rem 1.5rem var(--nu-local-depth-color);
  --nu-local-bg-color: var(--nu-bg-color);
  --nu-local-active-shadow: 0 0 calc(var(--nu-size) / 2) 0 var(--nu-local-color) inset;
  --nu-size: 2em;
  --nu-circle-padding: calc(var(--nu-indent) / 2);
  --nu-circle-size: calc(var(--nu-size) - var(--nu-circle-padding) * 2);
  --nu-circle-offset: 0;
  --nu-circle-opacity: 1;
  --nu-circle-border-radius: calc(var(--nu-circle-size) / 2);
  position: relative;
  width: calc(var(--nu-size) * 2 - var(--nu-indent));
  max-height: var(--nu-size);
  background-color: var(--nu-local-bg-color) !important;
  cursor: pointer;
  box-shadow: var(--nu-local-depth-shadow),
    var(--nu-local-active-shadow),
    var(--nu-local-stroke-shadow);
  transition: box-shadow var(--nu-animation-time) linear,
    filter var(--nu-animation-time) linear;
  user-select: none;
  vertical-align: middle;
  padding: var(--nu-circle-padding);
}
nu-switch:not([disabled]) {
  --nu-circle-bg-color: var(--nu-special-bg-color);
}
nu-switch[disabled] {
  --border-color: rgba(var(--nu-text-color-rgb), .66);
  --nu-circle-bg-color: rgba(var(--nu-text-color-rgb), .66);
}
nu-switch::after {
  content: "";
  display: block;
  width: var(--nu-circle-size);
  height: var(--nu-circle-size);
  pointer-events: none;
  transform: translate(var(--nu-circle-offset), 0);
  transition: transform var(--nu-animation-time) linear,
    opacity var(--nu-animation-time) linear,
    background-color var(--nu-animation-time) linear;
  background-color: var(--nu-circle-bg-color);
  border-radius: var(--nu-circle-border-radius);
  opacity: var(--nu-circle-opacity);
}
nu-switch[disabled] {
  opacity: .5;
  cursor: default;
}
nu-switch[nu-pressed] {
  --nu-circle-offset: calc(var(--nu-size) * 2 - var(--nu-circle-size) - var(--nu-indent));
  --nu-circle-opacity: 1;
  --nu-circle-bg-color: var(--nu-special-text-color);
}
nu-switch[nu-pressed]:not([disabled]) {
  --nu-local-bg-color: var(--nu-special-bg-color);
}
nu-switch[nu-pressed][disabled] {
  --nu-local-bg-color: rgba(var(--nu-text-color-rgb), .5);
}
nu-switch[nu-active]:not([disabled]):not([nu-pressed]) {
  --nu-local-color: rgba(0, 0, 0, var(--nu-intensity));
}
nu-switch[nu-active][nu-pressed]:not([disabled]) {
  --nu-local-color: rgba(0, 0, 0, var(--nu-special-intensity));
}
nu-switch {
  --nu-local-focus-color: transparent;
  --nu-local-focus-inset: 0 0;
  --nu-local-focus-shadow: var(--nu-local-focus-inset) 0 calc(var(--nu-border-width) * 3) var(--nu-local-focus-color);
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
  border-radius: var(--nu-local-border-radius, var(--nu-border-radius));
  box-shadow: var(--nu-local-focus-shadow);
  transition: box-shadow var(--nu-animation-time) linear;
}
html.nu-focus-enabled nu-switch:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-switch:not([disabled])[nu-focus] {
  --nu-local-focus-color: var(--nu-focus-color);
}
```
