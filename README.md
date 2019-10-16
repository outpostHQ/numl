# <img src="https://github.com/tenphi/nude/blob/master/logo.png?raw=true" alt="NUDE Elements" width="416">
**NUDE Elements** is a mix of four concepts: 

* **Language** - Alternative markup language for the modern web that meant to be a partial HTML/CSS replacement to describe complex responsive interfaces and dynamic relations between elements without frustration but with fun and highest compatibility with other modern technologies.
* **Methodology** - Simple and intuitive methodology to ensure your apps look and work great. It eliminates some confusing conceptions as "margins" and brings clarity and order to your markup.
* **Framework** - Powerful next-generation JS-Powered CSS-Framework based on Custom Elements that solves many fundamental problems like element inheritance, efficient runtime CSS-generation, theme color generation, sane id linking and affordable accessibility.
* **Library** - Highly-customizable built-in components to ensure you have everything to start creating handy components and wonderful accessible interfaces with responsiveness.

**UNDER RAPID DEVELOPMENT, API is subject to change**

## Features

* **Descriptive** markup language that based on well-known web standards.
* **Powerful** layout attributes that help you create virtually **any interface** you want.
* **Responsiveness** with effort so little you've never seen before.
* **Future proof** thanks to implementation based on **Custom Elements**.
* **Transferable** markup that can be easily copy-pasted to your new project.
* **Compatible** with any popular framework: Vue, React, Angular, Svelte, etc...
* **Dark Mode** effortlessly. Darker colors will be generated automatically based on colors you use in you app.
* **CSS Generation** under the hood to create only CSS your application needs.
* **No Build Step** needed. Edit attributes and move elements in runtime and see how they change instantly.
* **No-JS** support with pregenerated CSS.
* **Support** for all modern browsers. (small polyfill needed for Edge)
* **Accessibility** features to simplify ARIA declarations and automate them where it's possible.
* **Framework** to create your own elements, modifiers and plugins.

## FAQ

**Q: Why should I use NUDE instead of popular CSS-framework like Tailwind?**

**A:** Popular CSS-frameworks tend to decide what you need and provide tools that limit the power of CSS. Unlike them, NUDE unleashes the power of CSS by making it dynamic and parametrizable.

**Q: Why should I use NUDE instead of writing CSS from the scratch?**

**A:** CSS is complex but the modern web is not possible without it. Instead of replacing CSS, NUDE simplifies every aspect of CSS development by providing handy abstractions for responsiveness, theming, complex selectors, etc. It provides reasonable defaults leaving you with ability to change them if you need it. It greatly reduces amount of work that needed to be done not only for developers but for designers too!

**Q: I am a web designer. How can NUDE help me?**

**A:** Many web designers learn CSS frameworks these days. So it’s a good choice to try. NUDE is much more flexible and easy to learn than other powerful alternatives. For example it do a lot of color magic by generating and adapting them for various purposes. Also it can help you to learn more about modern best practices and accessibility features of the web which we think is very important. 

**Q: How can I use NUDE with older browsers?**

**A:** NUDE substantially depends on Custom Elements and Custom Properties. The CE can be easily polyfilled back to IE11 but CP can’t. While NUDE methodology don’t strictly require CP, they makes NUDE implementation much easier and faster in performance. See details in the related [ISSUE](https://github.com/tenphi/nude/issues/2).

**Q: Is NUDE SEO-friendly?**

**A:** NUDE’s focus is to provide a language for creating accessible and beautiful interfaces. SEO is a completely different task that often contradicts to best practices and accessibility. We believe such task can be achieved separately by using preprocessors and other technics without touching NUDE philosophy.

**Q: Is NUDE production-ready?**

**A:** It's NOT despite the fact it's widely used in production by the Author of NUDE. And he is working hard to make it production-ready for everyone as soon as possible but without community support it will be a long run. So give it a try, leave some feedback, post issues and tell friends to support our project!

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

[Open in CodePen](https://codepen.io/tenphi/pen/zYOgjrP)

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

## Sites that use **NUDE Elements** 

* **[Sellerscale](https://sellerscale.com)** – [Project Screenshot Light](https://github.com/tenphi/nude/blob/master/example-application.png?raw=true) | [Project Screenshot Dark](https://github.com/tenphi/nude/blob/master/example-application-dark.png?raw=true)

## Development status (v1)

Current status of development is [HERE](https://github.com/tenphi/nude/projects/1).

Here is our [Trello Board](https://trello.com/b/zEGV1W3L/nude-framework).

And here is our [Telegram Chat](https://t.me/nudeml). (Ask your questions here!)

### Browser Support

Based on [caniuse.com](caniuse.com). Real-world support table will be presented after production-release.

* Microsoft Edge 15-18 (with [@webcomponents/custom-elements polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements), 5kb)
* Microsoft Edge 76+
* Google Chrome 57+
* Mozilla Firefox 52+
* Apple Safari 10.1+
* Apple iOS Safari 10.3+
* Google Android 67+

## Build

`npm run build` builds the library to `dist`, generating four files:

* `dist/numl.js` - IIFE-module with auto initialization. Elements' CSS included. (Exports global `Nude` object)
* `dist/numl.dev.js` - Same as above but with helpful warnings and without minification. (Exports global `Nude` object)
* `dist/numl.module.js` - ES-module. Tree-shaking-friendly bundle. Elements' CSS included.
* `dist/numl.module.dev.js` - Same as above but with helpful warnings and without minification.

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.

## Local playground

Run `npm run play` to view test page with few examples.

## Documentation

*IN PROGRESS*

* [Introduction](docs/introduction.md)
* [Modifiers](docs/modifiers.md) – *DEPRECATED* (will be updated in `v0.7`)
* [Attributes](docs/attributes.md) - `5% Complete`
* [Markup methodology](docs/markup.md) - `0% Complete`
* [Theme system](docs/themes.md)
* [Responsive system](docs/responsive.md)
* [State system](docs/states.md)
* [Widgets](docs/widgets.md) - `0% Complete`
* [Integration with Frameworks](docs/integration.md)
* [Known issues](docs/issues.md)

## Contribution

There is no contribution guideline just yet but we would love to hear any feedback from you. Feel free to leave a note at [tenphi@gmail.com](mailto:tenphi@gmail.com?subject=NUDE%20Feeback).

## License

[MIT](LICENSE)