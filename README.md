# <img src="https://github.com/tenphi/nude/blob/master/images/logo.png?raw=true" alt="NUDE Elements" width="891">

[![NPM Version](https://img.shields.io/npm/v/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![](https://img.shields.io/npm/dt/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![Gitter](https://badges.gitter.im/tenphi/numl.svg)](https://gitter.im/tenphi/numl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

**Numl** is a markup and style language to create modern **high-quality** web-interfaces with any look using HTML-based syntax. It utilizes the power of Web Components and creates all the CSS needed right in runtime as it requires, which makes it much more flexible than any other styling solution. Built-in elements will allow you to make gorgeous interfaces and accessible components without inventing your own Design System or UI library.

**PRE-BETA VERSION, UNDER RAPID DEVELOPMENT**

**Numl** is:

* Customizable **Design System** for any project and scale
* Accessible production-ready **Prototyping Solution**
* Handy **UI library** for your favorite framework
* Powerful **CSS/JS/HTML-Framework** with CSS generation, inheritance and more
* Markup **Methodology** that is enjoyable to follow
* All-in-one **Language** to describe interfaces that look and work great

And also... it's **just a single js-file** that you can include into your website to start doing magic:

* **No** build step needed (*don't wait! create!*)
* **No** config needed (*your markup is your config*)
* **No** scripting to activate
* **No** confusing classes to style
* **No** frustration in usage

With **Numl** you can:

* Create virtually **any interface** you want
* Make your interface **accessible** without fighting IDs and specifications
* Create your own element or a whole **Design System** with ease
* **Responsive layouts** with effort so little you've never seen before
* **Copy-paste** your markup from project to project, regardless of the framework used
* Add **Dark** and **High-contrast** modes to your site effortlessly
* Be calm for technical debt in markup code
* **Enjoy** while doing what you love

[Learn more](https://numl.design/)

## Examples

* [Flex playground](https://numl.design/storybook/layouts/flex-playground)
* [Grid playground](https://numl.design/storybook/layouts/grid-playground)
* [Markdown converter](https://numl.design/storybook/converters/markdown)
* [Before/After slider](https://numl.design/storybook/complex/before-after-slider)
* [Login form validation](https://numl.design/storybook/complex/login-form)

## Getting started

To start prototyping with **Numl** just add a single module to the page:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/numl@0.11/dist/index.js"></script>
```

That's it! No build step, no explicit function call to apply changes.

If you want to prevent flash of unstyled content then add the following tag to the `head`:

```html
<style>nu-root { opacity: 0; }</style>
```

Make sure you are using `nu-root` tags on the top-level of your app:

```html
<body>
  <nu-root>
    <nu-card>
      My first <nu-mark>Numl</nu-mark> application!
    </nu-card>
  </nu-root>
</body>
```

Now it's time to have fun!... Try to write some HTML and build awesome interfaces.

[Check out the Guide](https://numl.design/guide/basics/base-syntax) (Work in progress)

### NPM installation

Numl is also available via npm.
```bash
$ npm install numl --save
```

Import the module to your application:
```javascript
import 'numl';
```

## Projects that use Numl

* [Numl Landing Page](https://numl.design) ([Repo Link](https://github.com/tenphi/numl.design)) built with Parcel.
* [Numl Storybook](https://numl.design/storybook) ([Repo Link](https://github.com/tenphi/numl-storybook)) built with Vue.js and Webpack.
* [Sellerscale](https://sellerscale.com) – [Project Screenshot Light](https://github.com/tenphi/nude/blob/master/images/example-app-light.png?raw=true) | [Project Screenshot Dark](https://github.com/tenphi/nude/blob/master/images/example-app-dark.png?raw=true) | [Project Screenshot Light Contrast](https://github.com/tenphi/nude/blob/master/images/example-app-light-contrast.png?raw=true) | [Project Screenshot Dark Contrast](https://github.com/tenphi/nude/blob/master/images/example-app-dark-contrast.png?raw=true)
* [Web Standards Calendar](https://frontend-events-numl.now.sh/) by [@KatrinLuna](https://github.com/katrinLuna) ([Repo Link](https://github.com/katrinLuna/frontend-events-numl)).

## Development status (v1)

Current status of development is [HERE](https://github.com/tenphi/nude/projects/1).

And here is our [Telegram Chat](https://tele.click/numldesign). (Ask your questions here!)
Also we have [Gitter](https://gitter.im/tenphi/numl).

### Browser Support

Based on [caniuse.com](caniuse.com). Real-world support table will be presented after production-release.

* Microsoft Edge 16-18 (Partial support with [@webcomponents/custom-elements polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements), 5kb)
* Microsoft Edge 76+
* Google Chrome 67+
* Mozilla Firefox 63+
* Apple Safari 10.1+
* Apple iOS Safari 10.3+
* Google Android 67+

## Build

`npm run build` builds the library to `dist`, generating four files:

* `dist/index.js` - ES6 tree-shaking friendly module. (Exports global `Nude` object)

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.

## Local playground

Run `npm start` to view test page with few examples.

## Roadmap

* Documentation
* More examples
* TRL Support

See our [Changlelog](https://numl.design/guide/changelog).

## Contribution

There is no contribution guideline just yet but we would love to hear any feedback from you. Feel free to leave a note at [tenphi@gmail.com](mailto:tenphi@gmail.com?subject=Numl%20Feeback).

## License

[MIT](LICENSE)
