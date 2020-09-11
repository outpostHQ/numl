<img src="https://github.com/tenphi/nude/blob/master/images/logo.png?raw=true" alt="NUDE Elements" width="891">

# Numl

An open-source Library of Web Components and a Runtime CSS Framework for rapidly building UI that follows your Design System.

[![NPM Version](https://img.shields.io/npm/v/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![](https://img.shields.io/npm/dt/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![Gitter](https://badges.gitter.im/tenphi/numl.svg)](https://gitter.im/tenphi/numl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Rate on Openbase](https://badges.openbase.io/js/rating/numl.svg)](https://openbase.io/js/numl?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

- Blazing-fast prototyping using only HTML
- Works with popular JS-Frameworks
- Don't require a build step, works with CDNs
- Don't require writing CSS, fully customizable in runtime with HTML or JS
- Style mapping to state or screen width
- Runtime theme generator with Dark Scheme and High Contrast Mode
- Comprehensive Design System with dozens of tokens out-of-the-box
- Compatible with Static Site Generators
- Built with accessibility in mind
- Free and Open source

## Who is Numl for?

- **For beginners** Use a well-thought-out Design System with automatic Dark Scheme and High Contrast Mode for rapid development of adaptive and accessible UIs. Create new components by nesting or/and styling foundation elements. 
- **For enthusiastic** Customize the Numl Design System to the smallest detail in runtime using HTML. Use behaviors and control system to add simple interactions. Add your favorite framework (**Vue.js**, **Angular**, **React**, **Svelte**...) for complex logic.
- **For experts** Use JavaScript API to create elements that follow your Design System on top of the **Numl**. Integrate Design Tokens into elements to have more control. Add your own unique elements, styles, and behaviors.

## Another UI Framework? Why should I care?

- **All-in-one** – Numl is both a markup language for rapidly building responsive interfaces and a set of ready-to-use highly-customizable accessible elements. So you can use a single comprehensive tool to compose and style web applications. It's also possible to create simple interactions without writing JS.
- **Unique** – Numl is based on unique CSS generation technology that allows you to unleash all the power of modern CSS and take all styles under your control.
- **DX Focused** – Numl is focused on providing the best possible Developer Experience. It has lots of built-in helpers and solutions for routine UI development and its atomic approach is convenient for maintaining and refactoring.
- **Universal** – Numl is built on top of Web Components, a modern web API to create reusable UI elements, and it's compatible with most modern JS-frameworks. You can use it as is or create lightweight wrappers for your favorite framework to improve DX, SSR and SEO.

[Learn more at NUML.DESIGN](https://numl.design/)

## Quick Start

Add the following code to your page.

via [Skypack](https://www.skypack.dev/):

```html
<script type="module" src="https://cdn.skypack.dev/numl@1.0.0-beta.1"></script>
```

via [JsDelivr](http://www.jsdelivr.com/):

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/numl@1.0.0-beta.1/dist/index.js"></script>
```

That's it! Now you can use all Numl elements and features!

See the [installation instructions](https://numl.design/guide/getting-started) for more details and other ways to install Numl.

## Examples

* [Flex playground](https://numl.design/storybook/layouts/flex-playground)
* [Grid playground](https://numl.design/storybook/layouts/grid-playground)
* [Markdown converter](https://numl.design/storybook/converters/markdown)
* [Before/After slider](https://numl.design/storybook/complex/before-after-slider)
* [Login form validation](https://numl.design/storybook/complex/login-form)

## Built with Numl

* [Cube.js UIKit](https://github.com/https://github.com/cube-js/cubejs-ui-kit) by **Cube Dev**.
* [Numl Landing Page](https://numl.design) ([Repo Link](https://github.com/tenphi/numl.design)) built with **Parcel**.
* [Numl Storybook](https://numl.design/storybook) ([Repo Link](https://github.com/tenphi/numl-storybook)) built with **Vue.js** and **Webpack**.
* [Sellerscale](https://sellerscale.com) – [Project Screenshot Light](https://github.com/tenphi/nude/blob/master/images/example-app-light.png?raw=true) | [Project Screenshot Dark](https://github.com/tenphi/nude/blob/master/images/example-app-dark.png?raw=true) | [Project Screenshot Light Contrast](https://github.com/tenphi/nude/blob/master/images/example-app-light-contrast.png?raw=true) | [Project Screenshot Dark Contrast](https://github.com/tenphi/nude/blob/master/images/example-app-dark-contrast.png?raw=true)
* [Web Standards Calendar](https://frontend-events-numl.now.sh/) by [@KatrinLuna](https://github.com/katrinLuna) ([Repo Link](https://github.com/katrinLuna/frontend-events-numl)).

## Development status (v1)

Current status of development is [HERE](https://github.com/tenphi/nude/projects/1).

And here is our [Telegram Chat](https://tele.click/numldesign). (Ask your questions here!)
Also we have [Gitter](https://gitter.im/tenphi/numl).

### Browser Support

Numl is tested in the latest two versions of the following browsers:

* Microsoft Edge
* Google Chrome
* Mozilla Firefox
* Apple Safari
* Apple iOS Safari
* Google Android

Critical bug fixes in earlier versions will be addressed based on their severity and impact.

If you need to support IE11 or pre-Chromium Edge, this library isn't for you. Although web components can (to some degree) be polyfilled for legacy browsers, supporting them is outside the scope of this project. If you're using Numl in such a browser, you're gonna have a bad time.

## Development

* `npm start` run Numl Playground.
* `npm run build` build the library to `dist`:
    * `dist/index.js` - ES6 tree-shaking friendly module. (Exports global `Nude` object)
* `npm run dev` build the library, then keep rebuilding it whenever the source files change.
* `npm run test` run tests.

## Local playground

Run `npm start` to view test page with few examples.

## Roadmap v1

* More documentation
* More examples
* More tests
* TRL Support
* Improved Behavior System

See our [Changlelog](https://numl.design/guide/changelog).

## Contribution

**We are looking for contributors!** 

**Numl** is a big and ambitious project with open source that it has a unique approach in UI development. 

Join us, and we'll make the Web better for everyone!

If you want to join us or leave some feedback write to this email: [tenphi@gmail.com](mailto:tenphi@gmail.com?subject=Numl%20Project).

## License

[MIT](LICENSE)
