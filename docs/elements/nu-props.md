# `<nu-props/>` element
With **nu-props** use can customize built-in properties and declare your own:

* **[gap]** `--nu-gap` (default: `.5rem`) – Base indent (padding|gap).
* **[border-width]** `--nu-border-width` (default: `1px`) – Base border width.
* **[radius]** `--nu-radius` (default: `.5rem`) – Base border radius.
* **[animation-time]** `--nu-animation-time` (default: `0.08s`) – Base animation time.

Example of declaration:

```html
<nu-props
  gap=".5"
  radius=".5"
  border-width="1px"
  animation-time="0.08s"
  your-custom-property="(100vw - 2rem)"></nu-props>
```

Custom properties will be declared in parent element context.

You can also use state and responsive operators to declare dynamic property:

```html
<nu-props
  radius="1|.5"
  animation-time="0.08s :hover[0.2s]"></nu-props>
```

## Base info
* Parent: [`<nu-decorator/>`](./nu-decorator.md)
* Type: `decorator`


## Own default values
*none*

## Inherited default values
* **`[display]`: `"none"`**


## Own attributes
*none*


## Inherited attributes
* **[`[as]`](../attributes/as.md)** `helper`
* **[`[display]`](../attributes/display.md)** `style`
* **[`[id]`](../attributes/id.md)** `style`
* **[`[prop]`](../attributes/prop.md)** `style`
* **[`[responsive]`](../attributes/responsive.md)** `helper`
* **[`[special]`](../attributes/special.md)** `style`
* **[`[t]`](../attributes/t.md)** `style`
* **[`[theme]`](../attributes/theme.md)** `helper`

## Generated CSS
```css

```
