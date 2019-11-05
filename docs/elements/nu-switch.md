# `<nu-switch/>` element

## Base info
* Parent: [`<nu-activeelement`/>](./nu-activeelement.md)
* Type: `element`
* Role: `switch`
* Auto ID: `btn`


## Own default values
* `display`: `"inline-block"`

## Inherited default values
* `color`: `"inherit"`
* `fill`: `""`
* `radius`: `""`
* `sizing`: `"border"`
* `text`: `"nowrap"`
* `transition`: `"box-shadow, color, background-color"`


## Own attributes
* `checked`
* `disabled`
* `radius`


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
nu-switch[hidden] {
  display: none !important;
}
nu-switch {
  --nu-depth-color: transparent;
  --nu-border-radius: calc(var(--nu-size) / 2);
  --nu-switch-color: rgba(0, 0, 0, 0);
  --nu-border-shadow: inset 0 0 0 var(--nu-theme-border-width) var(--nu-theme-border-color);
  --nu-depth-shadow: 0 .25rem 1.5rem var(--nu-depth-color);
  --nu-switch-background-color: var(--nu-theme-background-color);
  --nu-switch-shadow: 0 0 1rem 0 var(--nu-switch-color) inset;
  --nu-size: 2em;
  --nu-circle-padding: calc(var(--nu-theme-border-width) * 4);
  --nu-circle-size: calc(var(--nu-size) - var(--nu-circle-padding) * 2);
  --nu-circle-offset: var(--nu-circle-padding);
  --nu-circle-opacity: 1;
  --nu-circle-border-radius: calc(var(--nu-circle-size) / 2);
  --nu-circle-background-color: var(--nu-theme-special-color);
  position: relative;
  width: calc(var(--nu-size) * 2);
  height: var(--nu-size);
  border-radius: var(--nu-border-radius);
  background-color: var(--nu-switch-background-color) !important;
  cursor: pointer;
  box-shadow: var(--nu-depth-shadow),
    var(--nu-switch-shadow),
    var(--nu-border-shadow);
  transition: box-shadow var(--nu-theme-animation-time) linear,
    filter var(--nu-theme-animation-time) linear;
  user-select: none;
  vertical-align: middle;
}
nu-switch::after {
  content: "";
  position: absolute;
  display: block;
  width: var(--nu-circle-size);
  height: var(--nu-circle-size);
  pointer-events: none;
  left: 0;
  top: var(--nu-circle-padding);
  transform: translate(var(--nu-circle-offset), 0);
  transition: transform var(--nu-theme-animation-time) linear,
    opacity var(--nu-theme-animation-time) linear,
    background-color var(--nu-theme-animation-time) linear;
  background-color: var(--nu-circle-background-color);
  border-radius: var(--nu-circle-border-radius);
  /*box-shadow: var(--nu-border-shadow);
    */
  opacity: var(--nu-circle-opacity);
}
nu-switch[disabled] {
  opacity: .5;
  cursor: default;
}
nu-switch[nu-pressed] {
  --nu-switch-background-color: var(--nu-theme-special-color);
  --nu-circle-offset: calc(var(--nu-size) * 2 - var(--nu-circle-padding) - var(--nu-circle-size));
  --nu-circle-opacity: 1;
  --nu-circle-background-color: var(--nu-theme-background-color);
}
nu-switch[nu-active]:not([disabled]):not([nu-pressed]) {
  --nu-switch-color: rgba(0, 0, 0, var(--nu-theme-shadow-opacity));
}
nu-switch[nu-active][nu-pressed]:not([disabled]) {
  --nu-switch-color: rgba(0, 0, 0, var(--nu-theme-special-shadow-opacity));
}
nu-switch {
  --nu-focus-color: transparent;
  --nu-focus-inset: 0 0;
  --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
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
  border-radius: var(--nu-border-radius);
  box-shadow: var(--nu-focus-shadow);
  transition: box-shadow var(--nu-theme-animation-time) linear;
}
html.nu-focus-enabled nu-switch:not([disabled])[nu-focus] {
  z-index: 10;
}
html.nu-focus-enabled nu-switch:not([disabled])[nu-focus] {
  --nu-focus-color: var(--nu-theme-focus-color);
}
```
