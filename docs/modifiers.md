# Modifiers

**This specification is DEPRECATED and will be replaced in `v0.7`. Documentation will be updated. Migration will be very simple so you can continue to use it for now.**

It's not very handy to use unique attributes to specify static modifiers for the blocks like `font-style: italic;` or `text-decoration: underline`. To solve this problem NUDE uses atomic CSS approach by providing `mod` attribute.

```html
<nu-block mod="u i">Italic underlined text</nu-block>
``` 
 
Here is the full list of modifiers:

| Modifier | Description |
| --- | --- |
| `xss` | `xxs`-sized font |
| `xs`  | `xs`-sized font |
| `sm` | `sm`-sized font |
| `md` | `md`-sized font |
| `lg` | `lg`-sized font |
| `xl` | `xl`-sized font |
| `xxl` | `xxl`-sized font |
| `h1` | Header level 1 font-size |
| `h2` | Header level 2 font-size |
| `h3` | Header level 3 font-size |
| `h4` | Header level 4 font-size |
| `h5` | Header level 5 font-size |
| `h6` | Header level 6 font-size |
| `i` `italic` | Italic font style |
| `u` `underline` | Underline text decoration |
| `s` `strikethrough` | Strikethrough text decoration |
| `w1` `w2` `w3` `w4` `w5` `w6` `w7` | Font weight options |
| `uppercase` | Uppercase text transformation |
| `lowercase` | Lowercase text transformation |
| `baseline` | `baseline` vertical align |
| `sub` | `sub` vertical align |
| `super` | `super` vertical align |
| `text-top` | `text-top` vertical align |
| `text-bottom` | `text-bottom` vertical align |
| `middle` | `middle` vertical align |
| `top` | `top` vertical align |
| `left` | `left` text align |
| `right` | `right` text align |
| `center` | `center` text align |
| `justify` | `justify` text align |
| `monospace` | Use default monospace font |
| `ellipsis` | Force text overflow with ellipsis |
| `wrap` | Enable text wrapping |
| `nowrap` | Disable text wrapping |
| `scroll` | Enable element scroll |
| `no-overflow` | Disable element overflow |
| `round` | Makes element rounded |
| `ellipse` | Makes element ellipse |
| `round` | Makes element rounded |
| `relative` | Force relative position for element |
| `round` | Makes element rounded |
| `swap` | Swap theme foreground and background colors |
