# <img src="https://github.com/tenphi/nude/blob/master/logo.png?raw=true" alt="NUDE Elements" width="416">
**NUDE Elements** is the *Bootstrap of the Future*. It’s JS-powered CSS Framework, that reinvents the way we create modern web apps. With NUDE Elements you can build gorgeous dynamic accessible web interfaces writing only HTML. It’s ridiculously simple to connect your favorite framework in case you need more.

**UNDER RAPID DEVELOPMENT, API is subject to change**

* **Simple API** of elements based on well-known web standards.
* **Powerful** layout elements that help you create virtually **any interface** you want.
* **Responsiveness** with effort so little you never seen before.
* **Future proof** thanks to implementation based on **Custom Elements**.
* **Transferable** markup to be easily copy-pasted to your new project.
* **Compatible** with any popular framework: Vue, React, Angular, Svelte, etc...
* **Compact** size with no dependencies.
* **Dark Mode** effortlessly. Darker colors will be generated automatically based on themes you use in you app.
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

Here is our [Trello Board](https://trello.com/b/zEGV1W3L/nude-framework).

### Browser Support

Based on [caniuse.com](caniuse.com). Real-world support table will be presented after production-release.

* Microsoft Edge 15-18 (with [@webcomponents/custom-elements polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements), 5kb)
* Microsoft Edge 76+
* Google Chrome 57+
* Mozilla Firefox 52+
* Apple Safari 10.1+
* Apple iOS Safari 10.3+
* Google Android 67+

## Getting started

`npm run build` builds the library to `dist`, generating four files:

* `dist/numl.js` - Classic JS-Bundle with all elements. Elements' CSS included. (Exposes global `Nude` object)
* `dist/numl.dev.js` - Same as above but with helpful warnings and without minification. (Exposes global `Nude` object)
* `dist/numl.module.js` - ES-module. Tree-shaking-friendly bundle. Elements' CSS included.
* `dist/numl.module.dev.js` - Same as above but with helpful warnings and without minification.

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.

## Usage
Add `numl.js` to your page and initialize it.

```html
<script src="https://cdn.jsdelivr.net/npm/numl/dist/numl.js"></script>
```

And that's all! Now your application is **NUDE-ready**!

Try to write some HTML to build awesome interfaces.

```html
<nu-card responsive="420px" width="clamp(320px, 100%, initial)">
  <nu-flex gap="1" items="start" flow="row|column">
    <nu-icon name="package" size="4"></nu-icon>
    <nu-flow gap=".5" grow="1">
      <nu-heading level="3">Product name</nu-heading>
      <nu-block>Very very long product description</nu-block>
      <nu-flex gap="1" items="center|start" flow="row|column-reverse">
        <nu-btn special>
          <nu-icon name="dollar-sign" inline></nu-icon>
          Order now
        </nu-btn>
        <nu-badge mod="lg|md">Only $99.99</nu-badge>
      </nu-flex>
    </nu-flow>
  </nu-flex>
</nu-card>
```

Nude Elements are also available via npm.
```bash
$ npm install numl --save
```

Import the module to your application:
```javascript
import 'numl';
```

## Local playground

Run `npm run play` to view test page with few examples.

## Documentation

*IN PROGRESS*

## License

[MIT](LICENSE)