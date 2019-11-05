# `nu-btn` element

## Base info
* Inherits from: [`nu-activeelement`](./nu-activeelement.md)
* Type: `element`
* Role: `button`
* Auto ID: `btn`


## Own default values
* `border`: `1x`
* `content`: `center`
* `display`: `inline-grid`
* `fill`: ``
* `flow`: `column`
* `gap`: `1x`
* `padding`: `1x 2x`
* `radius`: `1x`
* `text`: `nowrap`

## Inherited default values
* `color`: `inherit`
* `sizing`: `border`
* `transition`: `box-shadow, color, background-color`


## Own attributes
*none*


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
* [`place-content`](../attributes/place-content.md)
* [`place-items`](../attributes/place-items.md)
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
* [`template-areas`](../attributes/template-areas.md)
* [`template-columns`](../attributes/template-columns.md)
* [`template-rows`](../attributes/template-rows.md)
* [`text`](../attributes/text.md)
* [`theme`](../attributes/theme.md)
* [`transform`](../attributes/transform.md)
* [`transition`](../attributes/transition.md)
* `value`
* [`valuemax`](../attributes/valuemax.md)
* [`valuemin`](../attributes/valuemin.md)
* [`valuenow`](../attributes/valuenow.md)
* [`var`](../attributes/var.md)
* [`width`](../attributes/width.md)
* [`z`](../attributes/z.md)

## Generated CSS
```css
nu-btn[hidden] {
  display: none !important;
}
nu-btn {
  --nu-toggle-color: transparent;
  --nu-depth-color: transparent;
  --nu-hover-color: transparent;
  --nu-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  --nu-stroke-shadow: 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0);
  --nu-toggle-shadow: 0 0 0 0 rgba(0, 0, 0, 0) inset;
  opacity: 1;
  position: relative;
  z-index: 0;
    /* to make :hover::after z-index work as expected */
  user-select: none;
  box-shadow: var(--nu-stroke-shadow),
    var(--nu-toggle-shadow),
    var(--nu-depth-shadow);
}
nu-btn[tabindex]:not([tabindex="-1"]):not([disabled])::after {
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
nu-btn[tabindex] {
  cursor: pointer;
}
nu-btn[disabled] {
  opacity: .5;
  cursor: default;
}
nu-btn:not([disabled])[tabindex]:hover {
  --nu-hover-color: var(--nu-theme-hover-color);
}
nu-btn[nu-active] {
  z-index: 3;
}
nu-btn[nu-pressed] {
  z-index: 2;
}
nu-btn {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
  outline: none;
}
html.nu-focus-enabled nu-btn:not([disabled])::before {
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
html.nu-focus-enabled nu-btn:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-btn:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
nu-btn {
  --nu-toggle-color: transparent;
  --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
}
nu-btn:not([disabled])[tabindex]:hover {
  --nu-hover-color: var(--nu-theme-hover-color);
}
    nu-btn[disabled][nu-pressed],
    nu-btn[nu-active]:not([disabled]):not([nu-pressed]),
    nu-btn[nu-active][nu-pressed]:not([disabled]),
nu-btn[nu-pressed]:not([disabled]):not([nu-active]) {
  --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-opacity));
}
nu-btn[special] {
  --nu-theme-shadow-opacity: var(--nu-theme-special-shadow-opacity);
  --nu-theme-hover-color: var(--nu-theme-special-hover-color);
  --nu-theme-heading-color: var(--nu-theme-special-contrast-color);
}
nu-btn[special]:not([fill]) {
  background-color: var(--nu-theme-special-color) !important;
}
nu-btn[special]:not([color]) {
  color: var(--nu-theme-special-contrast-color) !important;
}
nu-btn[special] > *:not([theme]):not([nu-popup]) {
  --nu-theme-border-color: var(--nu-theme-special-contrast-color);
}
```
