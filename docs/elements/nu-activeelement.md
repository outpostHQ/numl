# `<nu-activeelement/>` element

## Base info
* Parent: [`<nu-el/>`](./nu-el.md)
* Type: `element`
* Role: `button`
* Auto ID: `btn`


## Own default values
* **`[color]`: `"inherit"`**
* **`[fill]`: `""`**
* **`[radius]`: `""`**
* **`[text]`: `"nowrap"`**
* **`[transition]`: `"box-shadow, color, background-color"`**

## Inherited default values
* **`[display]`: `"inline-block"`**
* **`[sizing]`: `"border"`**


## Own attributes
* **controls** `aria`
* **disabled** `style`
* **href** `style`
* **pressed** `widget`
* **target** `style`
* **value** `widget`


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
* **[`[radius]`](../attributes/radius.md)** `style`
* **[`[responsive]`](../attributes/responsive.md)** `style`
* **[`[row]`](../attributes/row.md)** `style`
* **[`[rows]`](../attributes/rows.md)** `style`
* **[`[setsize]`](../attributes/setsize.md)** `aria`
* **[`[shadow]`](../attributes/shadow.md)** `style`
* **[`[shrink]`](../attributes/shrink.md)** `style`
* **[`[size]`](../attributes/size.md)** `style`
* **[`[sizing]`](../attributes/sizing.md)** `style`
* **[`[space]`](../attributes/space.md)** `style`
* **[`[text]`](../attributes/text.md)** `style`
* **[`[theme]`](../attributes/theme.md)** `helper`
* **[`[transform]`](../attributes/transform.md)** `style`
* **[`[transition]`](../attributes/transition.md)** `style`
* **[`[valuemax]`](../attributes/valuemax.md)** `aria`
* **[`[valuemin]`](../attributes/valuemin.md)** `aria`
* **[`[valuenow]`](../attributes/valuenow.md)** `aria`
* **[`[width]`](../attributes/width.md)** `style`
* **[`[z]`](../attributes/z.md)** `style`

## Generated CSS
```css
nu-activeelement[hidden] {
  display: none !important;
}
nu-activeelement {
  --nu-toggle-color: transparent;
  --nu-depth-color: transparent;
  --nu-hover-color: transparent;
  --nu-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  --nu-stroke-shadow: 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0);
  --nu-toggle-shadow: 0 0 0 0 rgba(0, 0, 0, 0) inset;
  opacity: 1;
  position: relative;
  z-index: 0;
  /* to make : hover::after z-index work as expected */
  user-select: none;
  box-shadow: var(--nu-stroke-shadow),
    var(--nu-toggle-shadow),
    var(--nu-depth-shadow);
}
nu-activeelement[tabindex]:not([tabindex="-1"]):not([disabled])::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--nu-hover-color);
  transition: background-color var(--nu-theme-animation-time) linear;
}
nu-activeelement[tabindex] {
  cursor: pointer;
}
nu-activeelement[disabled] {
  opacity: .5;
  cursor: default;
}
nu-activeelement:not([disabled])[tabindex]:hover {
  --nu-hover-color: var(--nu-theme-hover-color);
}
nu-activeelement[nu-active] {
  z-index: 3;
}
nu-activeelement[nu-pressed] {
  z-index: 2;
}
nu-activeelement {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
  outline: none;
}
html.nu-focus-enabled nu-activeelement:not([disabled])::before {
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
html.nu-focus-enabled nu-activeelement:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-activeelement:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
```
