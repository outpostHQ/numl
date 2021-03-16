## Numl.Design

A UI Design Language, UI Library of Web Components, and Runtime CSS Framework for rapidly building interfaces that follow your Design System 🌈

<img src="https://github.com/numldesign/numl/blob/master/images/logo.png?raw=true" alt="NUDE Elements" width="891">

[![NPM Version](https://img.shields.io/npm/v/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![](https://img.shields.io/npm/dt/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![Discord](https://img.shields.io/discord/793832892781690891?color=7389D8&label=chat%20on%20Discord&logo=Discord&logoColor=ffffff)](https://discord.gg/sHnHPnAPZj)
[![Rate on Openbase](https://badges.openbase.io/js/rating/numl.svg)](https://openbase.io/js/numl?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

### [STORYBOOK](https://numl.design/storybook) | [HANDBOOK](https://numl.design/handbook) | [REFERENCE](https://numl.design/reference) | [REPL](https://numl.design/repl)

## Intro
* Add a single JS-script to your page, and you are ready to create virtually any interface using only HTML syntax quickly. No bundler, no config, and no frustration.
* Integrate Numl with popular JS-Frameworks. Use it with SSG if you like. 
* Use color generation system and styles-to-state bindings to decrease style declarations up to dozens of times compared to plain CSS.
* Easily create your own Design System and UI Kit based on Numl. [Example](https://cubejs-uikit.vercel.app/)
* Customize your elements at any level: Globally, in context, directly. Use design tokens (Custom Properties) for a more convenient way to customize.
* Remove dozens of UI helper libraries from your project 'cause Numl can do it itself.
* Add your own elements, style attributes, behaviors, design tokens, custom units, and more...
* Use it for free. Contribute if you like it. 

## Who is Numl for?

- **For beginners** Use a well-thought-out Design System with automatic Dark Scheme and High Contrast Mode for rapid development of adaptive and accessible UIs. Create new components by nesting or/and styling foundation elements. 
- **For enthusiastic** Customize the Numl Design System to the smallest detail in runtime using HTML. Use behaviors and control system to add simple interactions. Add your favorite framework (**Vue.js**, **Angular**, **React**, **Svelte**...) for complex logic.
- **For experts** Use JavaScript API to create elements that follow your Design System on top of the **Numl**. Integrate Design Tokens into elements to have more control. Add your own unique elements, styles, behaviors, and tokens.

## Another UI Framework? Why should I care?

- **All-in-one** – Numl is both a markup language for rapidly building responsive interfaces and a set of ready-to-use highly-customizable accessible elements. So you can use a single comprehensive tool to compose and style web applications. It's also possible to create simple interactions without writing JS.
- **Unique** – Numl is based on unique CSS generation technology that allows you to unleash all the power of modern CSS and take all styles under your control.
- **DX Focused** – Numl is focused on providing the best possible Developer Experience. It has lots of built-in helpers and solutions for routine UI development and its atomic approach is convenient for maintaining and refactoring.
- **Universal** – Numl is built on top of Web Components, a modern web API to create reusable UI elements, and it's compatible with most modern JS-frameworks. You can use it as is or create lightweight wrappers for your favorite framework to improve DX, SSR and SEO.

[Learn more at NUML.DESIGN](https://numl.design/)

## Quick Start

Add the following code to your page.

via [JsDelivr](http://www.jsdelivr.com/):

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/numl@1.0.0-beta.23/dist/index.js"></script>
```

via [Skypack](https://www.skypack.dev/):

```html
<script type="module" src="https://cdn.skypack.dev/numl@1.0.0-beta.23"></script>
```

That's it! Now you can use all Numl elements and features!

See the [installation instructions](https://numl.design/handbook/getting-started) for more details and other ways to install Numl.

## Examples

* [Flex playground](https://numl.design/storybook/layouts/flex-playground)
* [Grid playground](https://numl.design/storybook/layouts/grid-playground)
* [Markdown converter](https://numl.design/storybook/converters/markdown)
* [Before/After slider](https://numl.design/storybook/complex/before-after-slider)
* [Login form validation](https://numl.design/storybook/complex/login-form)

## Built with Numl

* [Cube.js UI Kit](https://github.com/cube-js/cubejs-ui-kit) by **Cube Dev**.
* [Numl Website](https://numl.design) ([Repo Link](https://github.com/numldesign/website)) - built with **Nuxt** and **Vue.js**.
* Old Numl Landing Page ([Repo Link](https://github.com/tenphi/numl.design)) built with **Parcel**.
* Old Numl Storybook ([Repo Link](https://github.com/tenphi/numl-storybook)) built with **Vue.js** and **Webpack**.
* [Sellerscale](https://sellerscale.com) – [Project Screenshot Light](https://github.com/tenphi/nude/blob/master/images/example-app-light.png?raw=true) | [Project Screenshot Dark](https://github.com/tenphi/nude/blob/master/images/example-app-dark.png?raw=true) | [Project Screenshot Light Contrast](https://github.com/tenphi/nude/blob/master/images/example-app-light-contrast.png?raw=true) | [Project Screenshot Dark Contrast](https://github.com/tenphi/nude/blob/master/images/example-app-dark-contrast.png?raw=true)
* [Web Standards Calendar](https://frontend-events-numl.now.sh/) by [@KatrinLuna](https://github.com/katrinLuna) ([Repo Link](https://github.com/katrinLuna/frontend-events-numl)).

## Development status (v1)

Current status of development is [HERE](https://github.com/tenphi/nude/projects/1).

And here is our [Discord](https://discord.gg/sHnHPnAPZj). (Ask your questions here!)

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
* Figma UI Kit 🌟 (Coming Soon) [![Figma](https://img.shields.io/badge/follow%20us-on%20Figma-blue)](https://www.figma.com/@numldesign)
* Theme Builder 🌈 (Coming Soon)
* [Numl-React UI Library 🤖](https://github.com/numldesign/numl-react)

See our [Changlelog](https://numl.design/guide/changelog).

## Contribution

**We are looking for contributors!** 

**Numl** is a big and ambitious project with open source that it has a unique approach in UI development. 

Join us, and we'll make the Web better for everyone!

If you want to join us or leave some feedback write to this email: [inbox@numl.design](mailto:inbox@numl.design?subject=Numl%20Project)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://tenphi.me"><img src="https://avatars3.githubusercontent.com/u/327209?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Yamanov</b></sub></a><br /><a href="https://github.com/numldesign/numl/commits?author=tenphi" title="Code">💻</a> <a href="https://github.com/numldesign/numl/issues?q=author%3Atenphi" title="Bug reports">🐛</a> <a href="#business-tenphi" title="Business development">💼</a> <a href="#design-tenphi" title="Design">🎨</a> <a href="https://github.com/numldesign/numl/commits?author=tenphi" title="Documentation">📖</a> <a href="#ideas-tenphi" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/numldesign/numl/commits?author=tenphi" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/shubham-kaushal"><img src="https://avatars3.githubusercontent.com/u/63925481?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shubham Kaushal</b></sub></a><br /><a href="https://github.com/numldesign/numl/issues?q=author%3Ashubham-kaushal" title="Bug reports">🐛</a> <a href="#business-shubham-kaushal" title="Business development">💼</a> <a href="#design-shubham-kaushal" title="Design">🎨</a> <a href="https://github.com/numldesign/numl/commits?author=shubham-kaushal" title="Documentation">📖</a> <a href="#ideas-shubham-kaushal" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/numldesign/numl/commits?author=shubham-kaushal" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/timeshift92"><img src="https://avatars1.githubusercontent.com/u/13614530?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nurbek Akhmedov</b></sub></a><br /><a href="https://github.com/numldesign/numl/commits?author=timeshift92" title="Tests">⚠️</a> <a href="https://github.com/numldesign/numl/issues?q=author%3Atimeshift92" title="Bug reports">🐛</a> <a href="#ideas-timeshift92" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.facebook.com/profile.php?id=100003949341124"><img src="https://avatars2.githubusercontent.com/u/29942902?v=4?s=100" width="100px;" alt=""/><br /><sub><b>katrinLuna</b></sub></a><br /><a href="https://github.com/numldesign/numl/commits?author=katrinLuna" title="Documentation">📖</a> <a href="https://github.com/numldesign/numl/commits?author=katrinLuna" title="Tests">⚠️</a> <a href="https://github.com/numldesign/numl/issues?q=author%3AkatrinLuna" title="Bug reports">🐛</a> <a href="#ideas-katrinLuna" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://resume.dmtry.me/"><img src="https://avatars3.githubusercontent.com/u/572096?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dmitry Patsura</b></sub></a><br /><a href="https://github.com/numldesign/numl/commits?author=ovr" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/andrey-skl"><img src="https://avatars2.githubusercontent.com/u/4318513?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Skladchikov</b></sub></a><br /><a href="https://github.com/numldesign/numl/issues?q=author%3Aandrey-skl" title="Bug reports">🐛</a> <a href="#ideas-andrey-skl" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://dev.to/leonid_cube_dev"><img src="https://avatars0.githubusercontent.com/u/30028681?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Leonid Yakovlev</b></sub></a><br /><a href="#ideas-YakovlevCoded" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/numldesign/numl/commits?author=YakovlevCoded" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](LICENSE)
