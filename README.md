# <img src="https://github.com/tenphi/nude/blob/master/logo.png?raw=true" alt="NUDE Elements" width="416">
NUDE Elements is the *Bootstrap* of the Future. It’s JS-powered CSS Framework, that meant to be deeply customizable staying easy to use. With NUDE elements you can create gorgeous dynamic accessible web interfaces writing only HTML. It’s ridiculously simple to connect your favorite framework in case you need more.

**UNDER RAPID DEVELOPMENT, API is subject to change**

* **Simple API** of elements based on well-known web standards.
* **Powerful** layout elements that help you create virtually **any interface** you want.
* **Responsiveness** with effort so little you never seen before.
* **Transferable** markup to be easily copy-pasted to your new project.
* **Compatible** with any popular framework: Vue, React, Angular, Svelte, etc...
* **Compact** size with no dependencies.
* **CSS Generation** under the hood to create only CSS your application needs.
* **No Build Step** needed. Edit attributes and move elements in runtime and see how they change instantly.
* **No-JS** support with pregenerated CSS.
* **Support** for all modern browsers. (small polyfill needed)
* **ARIA** support.
* **Framework** to create your own elements, modifiers and plugins.

## In Action

You can see **NUDE** in action on the **[Sellerscale](https://sellerscale.com)** site.

## Development status (v1)

Current status of development is [HERE](https://github.com/tenphi/nude/projects/1).

### Browser Support

Based on [caniuse.com](caniuse.com). Real-world support table will be presented after production-release.

* Microsoft Edge 15-18 (with Custom Elements polyfill, 5kb)
* Microsoft Edge 76+
* Google Chrome 57+
* Mozilla Firefox 52+
* Apple Safari 10.1+
* Apple iOS Safari 10.3+
* Google Android 67+

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

Nude Elements are also available via npm.
```bash
$ npm install nude-elements
```

Import the module to your application:
```javascript
import Nude from 'nude-elements';

Nude.init();
```

## Development

Here is our [Trello Board](https://trello.com/b/zEGV1W3L/nude-framework).

## Local playground

Run `npm run play` to view test page with few examples.

## Documentation

*IN PROGRESS*

## License

[MIT](LICENSE).
