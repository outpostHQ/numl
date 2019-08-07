# NUDE Elements

Smallest UI Framework based on Custom Elements that lets you create gorgeous web interfaces without writing CSS. Instead of predefined CSS, NUDE can generate CSS you need right in runtime what makes it more customizable than similar Atomic CSS approach. Also, it has a simple newbie-friendly syntax.

**UNDER RAPID DEVELOPMENT, API is subject to change**

* **Tiny** but **Powerful** microframework. No dependencies.
* Very **customizable**. Write your own element, modifier or plugin.
* **Easy to learn**. Based on web standards. Simple API.
* Integrated **ARIA** support. Developed with accessibility requirements in mind.
* **Compatible** with any popular framework: Vue, React, Angular, Svelte, etc...

## Development status (v1)

* **Theme System** - ![#100%](https://placehold.it/15/339966/000000?text=+) 100%
* **Modifiers System** - ![#100%](https://placehold.it/15/339966/000000?text=+) 100%
* **Responsive System** - ![#0%](https://placehold.it/15/ff3333/000000?text=+) 0%
* **CSS Generator** - ![#100%](https://placehold.it/15/339966/000000?text=+) 100%
* **Theme System** - ![#100%](https://placehold.it/15/339966/000000?text=+) 100%
* **Layout Elements** - ![#90%](https://placehold.it/15/669966/000000?text=+) 90%
* **Base Elements** - ![#60%](https://placehold.it/15/999933/000000?text=+) 60%
* **Widget Elements** - ![#0%](https://placehold.it/15/bb6633/000000?text=+) 20%

## Playground

Check out our [Playground](http://bit.ly/nude-elements) with few examples.

## Getting started

`npm run build` builds the library to `dist`, generating five files:

* `dist/nude.js` - ES-module. Tree-shaking-friendly bundle. Elements' CSS included.
* `dist/nude.dev.js` - Same as above but without minification and with helpful warnings.
* `dist/nude.pack.js` - Classic JS-Bundle with all elements. (Expose global `Nude` object)
* `dist/nude.pack.css` - Clasic CSS-Bundle with all elements.
* `dist/nude.pack.dev.js` - Same as two above combined but without minification and with helpful warnings. (Expose global `Nude` object)

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.

## Usage
Add `nude.js` to your page and initialize it.

```html
<link rel="stylesheet" href="/path/to/nude.pack.css" />
<script src="/path/to/nude.pack.js">
  Nude.init();
</script>
```

Add `data-nu-root` attribute to the root element. Preferably, to the `body` tag.

```html
<body data-nu-root></body>
```

That's all. Now your application is **NUDE-ready**! Try to write some HTML to build awesome interfaces.

```html
<nu-flex flow="column" gap=".5">
  <nu-block>
    Example text. <nu-link>Example link</nu-link>. <nu-badge>Example badge</nu-badge>.
  </nu-block>
</nu-flex>
```

## In Action

You can see **NUDE** in action on the **[Sellerscale](https://sellerscale.com)** site.

## Development

Here is our [Trello Board](https://trello.com/b/zEGV1W3L/nude-framework).

## Testing

Run `npm run test` to view test page with few examples.

## Documentation

*IN PROGRESS*

## License

[MIT](LICENSE).
