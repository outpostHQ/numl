# `<nu-icon/>` element

## Base info
* Parent: [`<nu-block`/>](./nu-block.md)
* Type: `element`
* Role: `img`


## Own default values
* `display`: `"inline-block"`
* `height`: `"min(1em)"`
* `text`: `"middle"`
* `width`: `"min(1em)"`

## Inherited default values
* `sizing`: `"border"`


## Own attributes
* `name`
* `size`


## Inherited attributes
* [`activedescendant`](../attributes/activedescendant.md)
* [`area`](../attributes/area.md)
* [`areas`](../attributes/areas.md)
* [`as`](../attributes/as.md)
* [`auto-flow`](../attributes/auto-flow.md)
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
* [`padding`](../attributes/padding.md)
* [`place`](../attributes/place.md)
* [`place-content`](../attributes/place-content.md)
* [`place-items`](../attributes/place-items.md)
* [`posinset`](../attributes/posinset.md)
* [`radius`](../attributes/radius.md)
* [`responsive`](../attributes/responsive.md)
* [`row`](../attributes/row.md)
* [`rows`](../attributes/rows.md)
* [`setsize`](../attributes/setsize.md)
* [`shadow`](../attributes/shadow.md)
* [`shrink`](../attributes/shrink.md)
* [`sizing`](../attributes/sizing.md)
* [`space`](../attributes/space.md)
* [`template-areas`](../attributes/template-areas.md)
* [`template-columns`](../attributes/template-columns.md)
* [`template-rows`](../attributes/template-rows.md)
* [`text`](../attributes/text.md)
* [`theme`](../attributes/theme.md)
* [`transform`](../attributes/transform.md)
* [`transition`](../attributes/transition.md)
* [`valuemax`](../attributes/valuemax.md)
* [`valuemin`](../attributes/valuemin.md)
* [`valuenow`](../attributes/valuenow.md)
* [`var`](../attributes/var.md)
* [`width`](../attributes/width.md)
* [`z`](../attributes/z.md)

## Generated CSS
```css
nu-icon[hidden] {
  display: none !important;
}
nu-icon {
  --nu-size: 1em;
  position: relative;
  background-color: transparent !important;
}
nu-icon > svg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--nu-size);
  height: var(--nu-size);
  transform: translate(-50%, -50%);
}
nu-icon > :not(svg) {
  display: none;
}
nu-icon[inline] {
  bottom: 0.0675em;
}
```
