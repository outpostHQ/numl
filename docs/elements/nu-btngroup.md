# `<nu-btngroup/>` element

## Base info
* Parent: [`<nu-radiogroup`/>](./nu-radiogroup.md)
* Type: `element`
* Role: `radiogroup`
* Auto ID: `btngroup`


## Own default values
* `gap`: `"calc(var(--nu-theme-border-width) * -1)"`
* `radius`: `"1x"`

## Inherited default values
* `display`: `"flex"`
* `flow`: `"row"`
* `sizing`: `"border"`


## Own attributes
* `border`
* `flow`
* `padding`
* `value`


## Inherited attributes
* [`activedescendant`](../attributes/activedescendant.md)
* [`area`](../attributes/area.md)
* [`areas`](../attributes/areas.md)
* [`as`](../attributes/as.md)
* [`basis`](../attributes/basis.md)
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
nu-btngroup[hidden] {
  display: none !important;
}
nu-btngroup {
  --nu-item-border-radius: var(--nu-border-radius);
  border-radius: calc(var(--nu-border-radius, 0) + 1px) !important;
}
nu-btngroup:not([gap]) > :not(:last-child):not(:first-child) {
  --nu-border-radius: 0 !important;
}
nu-btngroup:not([gap]) > :last-child:first-child {
  --nu-border-radius: inherit !important;
}
nu-btngroup > *:not([grow]) {
  flex-grow: 1;
}
```
