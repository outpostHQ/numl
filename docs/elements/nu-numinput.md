# `<nu-numinput/>` element

## Base info
* Parent: [`<nu-input/>`](./nu-input.md)
* Type: `element`


## Own default values
*none*

## Inherited default values
* **`[border]`: `"1b"`**
* **`[display]`: `"grid"`**
* **`[fill]`: `"input"`**
* **`[flow]`: `"column"`**
* **`[padding]`: `"1x"`**
* **`[radius]`: `""`**
* **`[sizing]`: `"border"`**
* **`[text]`: `"center"`**


## Own attributes
* **precision** `style`
* **prefix** `style`
* **suffix** `style`
* **type** `style`


## Inherited attributes
* **[`[activedescendant]`](../attributes/activedescendant.md)** `aria`
* **[`[after]`](../attributes/after.md)** `style`
* **[`[area]`](../attributes/area.md)** `style`
* **[`[areas]`](../attributes/areas.md)** `style`
* **[`[as]`](../attributes/as.md)** `helper`
* `autofocus`
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
* `disabled`
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
* `maxlength`
* **[`[move]`](../attributes/move.md)** `style`
* `name`
* **[`[opacity]`](../attributes/opacity.md)** `style`
* **[`[order]`](../attributes/order.md)** `style`
* **[`[overflow]`](../attributes/overflow.md)** `style`
* **[`[owns]`](../attributes/owns.md)** `aria`
* **[`[padding]`](../attributes/padding.md)** `style`
* **[`[place]`](../attributes/place.md)** `style`
* `placeholder`
* **[`[posinset]`](../attributes/posinset.md)** `aria`
* **[`[prop]`](../attributes/prop.md)** `style`
* **[`[radius]`](../attributes/radius.md)** `style`
* **[`[responsive]`](../attributes/responsive.md)** `helper`
* **[`[rotate]`](../attributes/rotate.md)** `style`
* **[`[row]`](../attributes/row.md)** `style`
* **[`[rows]`](../attributes/rows.md)** `style`
* **[`[scale]`](../attributes/scale.md)** `style`
* **[`[scrollbar]`](../attributes/scrollbar.md)** `style`
* **[`[setsize]`](../attributes/setsize.md)** `aria`
* **[`[shadow]`](../attributes/shadow.md)** `style`
* **[`[show]`](../attributes/show.md)** `style`
* **[`[shrink]`](../attributes/shrink.md)** `style`
* **[`[size]`](../attributes/size.md)** `style`
* **[`[sizing]`](../attributes/sizing.md)** `style`
* **[`[space]`](../attributes/space.md)** `style`
* **[`[special]`](../attributes/special.md)** `style`
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
nu-numinput[hidden] {
  display: none !important;
}
nu-numinput {
  outline: none;
  user-select: none;
  position: relative;
}
nu-numinput input {
  padding: var(--nu-local-padding);
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
nu-numinput input:not(:first-child) {
  padding-left: 0;
}
nu-numinput input:not(:last-child) {
  padding-right: 0;
}
nu-numinput input[disabled] {
  color: rgb(var(--nu-text-color-rgb), .6);
  background: var(--nu-hover-color);
  -webkit-text-fill-color: rgb(var(--nu-text-color-rgb), .6);
  -webkit-opacity: 1;
}
nu-numinput input::placeholder {
  -webkit-text-fill-color: currentColor;
  color: currentColor;
  opacity: .5;
}
nu-numinput nu-icon:not([width]) {
  width: calc(var(--nu-local-padding) * 2 + 1em);
}
nu-numinput {
  --nu-local-focus-color: transparent;
  --nu-local-focus-inset: 0 0;
  --nu-local-focus-shadow: var(--nu-local-focus-inset) 0 calc(var(--nu-border-width) * 3) var(--nu-local-focus-color);
  outline: none;
}
nu-numinput:not([disabled])::before {
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
nu-numinput:not([disabled])[nu-focus] {
  z-index: 10;
}
nu-numinput:not([disabled])[nu-focus] {
  --nu-local-focus-color: var(--nu-focus-color);
}
nu-numinput input {
  text-align: inherit;
}
nu-numinput input::-webkit-inner-spin-button, nu-numinput input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```
