# NUDE Elements

Smallest UI Framework based on Custom Elements that lets you create gorgeous web interfaces without writing CSS. Instead of predefined CSS, NUDE can generate CSS you need right in runtime what makes it more customizable than similar Atomic CSS approach. Also, it has a simple newbie-friendly syntax.

**UNDER RAPID DEVELOPMENT, API is subject to change**

* **Tiny** but **Powerful** microframework. No dependencies.
* Very **customizable**. Write your own element, modifier or plugin.
* **Easy to learn**. Based on web standards. Simple API.
* Integrated **ARIA** support. Developed with accessibility requirements in mind.
* **Compatible** with any popular framework: Vue, React, Angular, Svelte, etc...

## Playground

Check out our [Playground](http://bit.ly/nude-elements) with few examples.

## Development

Here is our [Trello Board](https://trello.com/b/zEGV1W3L/nude-framework).

## Getting started

`npm run build` builds the library to `dist`, generating five files:

* `dist/nude.js` - Tree-shaking-friendly bundle. Elements' CSS included.
* `dist/nude.pack.js` - JS-Bundle with all elements.
* `dist/nude.pack.css` - CSS-Bundle with all elements.
* `dist/nude.modifiers.css` - CSS bundle with modifiers only.
* `dist/nude.global.css` - CSS bundle with base global styles.

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.

## Testing

Run `npm run test` to view test page with few examples.

## Documentation

*IN PROGRESS*

## License

[MIT](LICENSE).
