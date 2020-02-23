# `<nu-progressbar/>` element

## Base info
* Parent: [`<nu-el/>`](./nu-el.md)
* Type: `element`


## Own default values
* **`[border]`: `""`**
* **`[display]`: `"block"`**
* **`[fill]`: `"bg"`**
* **`[radius]`: `".5r"`**
* **`[transition]`: `"opacity"`**

## Inherited default values
* **`[sizing]`: `"border"`**


## Own attributes
* **max** `style`
* **min** `style`
* **value** `widget`


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
* **[`[contain]`](../attributes/contain.md)** `style`
* **[`[content]`](../attributes/content.md)** `style`
* **[`[controls]`](../attributes/controls.md)** `aria`
* **[`[cursor]`](../attributes/cursor.md)** `style`
* **[`[describedby]`](../attributes/describedby.md)** `aria`
* **[`[direction]`](../attributes/direction.md)** `style`
* **[`[display]`](../attributes/display.md)** `style`
* **[`[drop]`](../attributes/drop.md)** `style`
* **[`[expand]`](../attributes/expand.md)** `style`
* **[`[expanded]`](../attributes/expanded.md)** `aria`
* **[`[fill]`](../attributes/fill.md)** `style`
* **[`[filter]`](../attributes/filter.md)** `style`
* **[`[flow]`](../attributes/flow.md)** `style`
* **[`[flowto]`](../attributes/flowto.md)** `aria`
* **[`[focusable]`](../attributes/focusable.md)** `style`
* **[`[gap]`](../attributes/gap.md)** `style`
* **[`[grow]`](../attributes/grow.md)** `style`
* **[`[haspopup]`](../attributes/haspopup.md)** `aria`
* **[`[height]`](../attributes/height.md)** `style`
* **[`[hide]`](../attributes/hide.md)** `style`
* **[`[hoverable]`](../attributes/hoverable.md)** `style`
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
* **[`[t]`](../attributes/t.md)** `style`
* **[`[text]`](../attributes/text.md)** `style`
* **[`[theme]`](../attributes/theme.md)** `helper`
* **[`[toggle]`](../attributes/toggle.md)** `style`
* **[`[transform]`](../attributes/transform.md)** `style`
* **[`[transition]`](../attributes/transition.md)** `style`
* **[`[valuemax]`](../attributes/valuemax.md)** `aria`
* **[`[valuemin]`](../attributes/valuemin.md)** `aria`
* **[`[valuenow]`](../attributes/valuenow.md)** `aria`
* **[`[width]`](../attributes/width.md)** `style`
* **[`[z]`](../attributes/z.md)** `style`

## Generated CSS
```css
nu-progressbar[hidden] {
  display: none !important;
}
nu-progressbar {
  position: relative;
  min-height: .5em;
  overflow: hidden;
}
nu-progressbar::before {
  content: '';
  position: absolute;
  left: 0;
  width: calc(var(--nu-value) * 100%);
  top: 0;
  bottom: 0;
  background: var(--nu-special-color);
  border-radius: var(--nu-border-width);
}
nu-progressbar::after {
  content: '';
  position: absolute;
  left: 0;
  width: calc(var(--nu-value) * 100%);
  top: 0;
  bottom: 0;
  opacity: .2;
  background-color: transparent;
  border-radius: var(--nu-border-width);
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5)), linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 36%, rgb(0, 0, 255) 38%, rgb(0, 0, 255) 72%, rgb(255, 255, 255) 74%, rgb(255, 255, 255) 100%);
  background-repeat: repeat;
  background-size: 3em;
  animation: nu-progressbar-animation calc(var(--nu-animation-time) * 10 - 0.01s) linear infinite;
}
@keyframes nu-progressbar-animation {
0% {
  background-position: 0 0;
}
100% {
  background-position: 3em 0;
}
}
```
