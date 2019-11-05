# `<nu-link/>` element

## Base info
* Parent: [`<nu-activeelement`/>](./nu-activeelement.md)
* Type: `element`
* Role: `link`
* Auto ID: `link`


## Own default values
* `color`: `"special"`
* `cursor`: `"pointer"`
* `display`: `"inline-block"`
* `fill`: `null`
* `radius`: `".5x"`
* `text`: `"nowrap u"`
* `transition`: `"box-shadow"`

## Inherited default values
* `sizing`: `"border"`


## Own attributes
*none*


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
* `disabled`
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
* `href`
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
* [`posinset`](../attributes/posinset.md)
* `pressed`
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
* `target`
* [`text`](../attributes/text.md)
* [`theme`](../attributes/theme.md)
* [`transform`](../attributes/transform.md)
* [`transition`](../attributes/transition.md)
* `value`
* [`valuemax`](../attributes/valuemax.md)
* [`valuemin`](../attributes/valuemin.md)
* [`valuenow`](../attributes/valuenow.md)
* [`width`](../attributes/width.md)
* [`z`](../attributes/z.md)

## Generated CSS
```css
nu-link[hidden] {
  display: none !important;
}
nu-link {
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
nu-link[tabindex]:not([tabindex="-1"]):not([disabled])::after {
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
nu-link[tabindex] {
  cursor: pointer;
}
nu-link[disabled] {
  opacity: .5;
  cursor: default;
}
nu-link:not([disabled])[tabindex]:hover {
  --nu-hover-color: var(--nu-theme-hover-color);
}
nu-link[nu-active] {
  z-index: 3;
}
nu-link[nu-pressed] {
  z-index: 2;
}
nu-link {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
  outline: none;
}
html.nu-focus-enabled nu-link:not([disabled])::before {
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
html.nu-focus-enabled nu-link:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-link:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
nu-link {
  font-weight: bolder;
  position: relative;
}
nu-link:not([disabled])[nu-active] {
  --nu-hover-color: var(--nu-theme-hover-color);
}
nu-link {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
  outline: none;
}
html.nu-focus-enabled nu-link:not([disabled])::before {
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
html.nu-focus-enabled nu-link:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-link:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
```
