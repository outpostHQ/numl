# `<nu-input/>` element

## Base info
* Parent: [`<nu-block`/>](./nu-block.md)
* Type: `element`


## Own default values
* `border`: `"1x"`
* `display`: `"grid"`
* `fill`: `""`
* `flow`: `"column"`
* `padding`: `"1x"`
* `radius`: `""`
* `text`: `"center"`

## Inherited default values
* `sizing`: `"border"`


## Own attributes
* `autofocus`
* `disabled`
* `maxlength`
* `name`
* `padding`
* `value`


## Inherited attributes
* [`activedescendant`](../attributes/activedescendant.md)
* [`area`](../attributes/area.md)
* [`areas`](../attributes/areas.md)
* [`as`](../attributes/as.md)
* [`basis`](../attributes/basis.md)
* [`border`](../attributes/border.md)
* [`color`](../attributes/color.md)
* [`column`](../attributes/column.md)
* [`columns`](../attributes/columns.md)
* [`content`](../attributes/content.md)
* [`controls`](../attributes/controls.md)
* [`cursor`](../attributes/cursor.md)
* [`describedby`](../attributes/describedby.md)
* [`display`](../attributes/display.md)
* [`expanded`](../attributes/expanded.md)
* [`fill`](../attributes/fill.md)
* [`flow`](../attributes/flow.md)
* [`flowto`](../attributes/flowto.md)
* [`gap`](../attributes/gap.md)
* [`grow`](../attributes/grow.md)
* [`haspopup`](../attributes/haspopup.md)
* [`height`](../attributes/height.md)
* [`hide`](../attributes/hide.md)
* [`id`](../attributes/id.md)
* [`image`](../attributes/image.md)
* [`interactive`](../attributes/interactive.md)
* [`items`](../attributes/items.md)
* [`items-basis`](../attributes/items-basis.md)
* [`items-grow`](../attributes/items-grow.md)
* [`items-padding`](../attributes/items-padding.md)
* [`items-radius`](../attributes/items-radius.md)
* [`items-shrink`](../attributes/items-shrink.md)
* [`label`](../attributes/label.md)
* [`labelledby`](../attributes/labelledby.md)
* [`opacity`](../attributes/opacity.md)
* [`order`](../attributes/order.md)
* [`overflow`](../attributes/overflow.md)
* [`owns`](../attributes/owns.md)
* [`place`](../attributes/place.md)
* [`posinset`](../attributes/posinset.md)
* [`radius`](../attributes/radius.md)
* [`responsive`](../attributes/responsive.md)
* [`row`](../attributes/row.md)
* [`rows`](../attributes/rows.md)
* [`setsize`](../attributes/setsize.md)
* [`shadow`](../attributes/shadow.md)
* [`shrink`](../attributes/shrink.md)
* [`size`](../attributes/size.md)
* [`sizing`](../attributes/sizing.md)
* [`space`](../attributes/space.md)
* [`text`](../attributes/text.md)
* [`theme`](../attributes/theme.md)
* [`transform`](../attributes/transform.md)
* [`transition`](../attributes/transition.md)
* [`valuemax`](../attributes/valuemax.md)
* [`valuemin`](../attributes/valuemin.md)
* [`valuenow`](../attributes/valuenow.md)
* [`width`](../attributes/width.md)
* [`z`](../attributes/z.md)

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
