# `<nu-input/>` element

## Base info
* Parent: [`<nu-block/>`](./nu-block.md)
* Type: `element`


## Own default values
* **`[border]`: `"1x"`**
* **`[display]`: `"grid"`**
* **`[fill]`: `""`**
* **`[flow]`: `"column"`**
* **`[padding]`: `"1x"`**
* **`[radius]`: `""`**
* **`[text]`: `"center"`**

## Inherited default values
* **`[sizing]`: `"border"`**


## Own attributes
* **autofocus** `style`
* **disabled** `style`
* **maxlength** `style`
* **name** `helper`
* **padding** `style`
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
nu-input[hidden] {
  display: none !important;
}
nu-input {
  outline: none;
  user-select: none;
  position: relative;
}
nu-input input {
  padding: var(--nu-padding);
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  -webkit-appearance: none;
  background: transparent;
  color: inherit;
  border: none;
  outline: none;
  border-radius: inherit;
  box-sizing: border-box;
}
nu-input input:not(:first-child) {
  padding-left: 0;
}
nu-input input:not(:last-child) {
  padding-right: 0;
}
nu-input input[disabled] {
  color: var(--nu-theme-minor-color);
  background: var(--nu-theme-minor-background-color);
  -webkit-text-fill-color: var(--nu-theme-minor-color);
  -webkit-opacity: 1;
}
nu-input input::placeholder {
  -webkit-text-fill-color: currentColor;
  color: currentColor;
  opacity: .5;
}
nu-input nu-icon:not([width]) {
  width: calc(var(--nu-padding) * 2 + 1em);
}
nu-input {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
  outline: none;
}
nu-input:not([disabled])::before {
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
nu-input:not([disabled])[nu-focus] {
  z-index: 10;
}
nu-input:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
```
