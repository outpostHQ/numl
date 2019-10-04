# <img src="https://github.com/tenphi/nude/blob/master/logo.png?raw=true" alt="NUDE Elements" width="416">
**NUDE Elements** is a mix of four concepts: 

* **Language** - Alternative markup language for the modern web that meant to be a partial HTML/CSS replacement to describe complex responsive interfaces and dynamic relations between elements without frustration but with fun and highest compatibility with other modern technologies.
* **Methodology** - Simple and intuitive methodology to ensure your apps look and work great. It eliminates some confusing conceptions as "margins" and brings clarity and order to your markup.
* **Framework** - Powerful next-generation JS-Powered CSS-Framework based on Custom Elements that solves many fundamental problems like element inheritance, efficient runtime CSS-generation, theme color generation, sane id linking and affordable accessibility.
* **Library** - Highly-customizable built-in components to ensure you have everything to start creating handy components and wonderful accessible interfaces with responsiveness.

**UNDER RAPID DEVELOPMENT, API is subject to change**

## Features

* **Simple API** of elements based on well-known web standards.
* **Powerful** layout elements that help you create virtually **any interface** you want.
* **Responsiveness** with effort so little you've never seen before.
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

## Sites that use **NUDE Elements** 

* **[Sellerscale](https://sellerscale.com)**

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

* `dist/numl.js` - IIFE-module with auto initialization. Elements' CSS included. (Exports global `Nude` object)
* `dist/numl.dev.js` - Same as above but with helpful warnings and without minification. (Exports global `Nude` object)
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
<nu-card
  display="flex"
  width="clamp(320px, 100%, initial)"
  responsive="480px"
  labelledby="heading"
  describedby="description price"
  gap="1" flow="row|column" items="start|initial">
  <nu-icon name="package" size="4" place="start"></nu-icon>
  <nu-flow gap=".5" grow="1">
    <nu-heading level="3" id="heading">Product name</nu-heading>
    <nu-line></nu-line>
    <nu-block id="description">Very very long product description</nu-block>
    <nu-flex gap="1" items="center|start" flow="row|column-reverse">
      <nu-btn special>
        <nu-icon name="dollar-sign" inline></nu-icon>
        Order now
      </nu-btn>
      <nu-block mod="w6" color="special" size="lg|md" id="price" padding=".5x 1x">
        Only $99.99
      </nu-block>
    </nu-flex>
  </nu-flow>
</nu-card>
```

Desktop render

<img src="https://github.com/tenphi/nude/blob/master/example-desktop.png?raw=true" alt="NUDE Elements" width="492">

Mobile render

<img src="https://github.com/tenphi/nude/blob/master/example-mobile.png?raw=true" alt="NUDE Elements" width="357">

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