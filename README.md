**Numl** An open-source Library of Web Components and a Runtime CSS Framework for rapidly building UI that follows your Design System.

- **For beginners** Use a well-thought-out Design System with automatic Dark Scheme and High Contrast Mode for rapid developing adaptive and accessible UIs. Create new components by nesting or/and styling foundation elements. 
- **For enthusiastic** Customize the Numl Design System to the smallest detail in runtime using HTML. Use behaviors and control system to add simple interactions. Add your favorite framework (**Vue.js**, **Angular**, **React**, **Svelte**...) for complex logic.
- **For experts** Use JavaScript API to create elements that follow your Design System on top of the **Numl**. Integrate Design Tokens into elements to have more control. Add your own unique elements, styles, and behaviors.

<img src="https://github.com/tenphi/nude/blob/master/images/logo.png?raw=true" alt="NUDE Elements" width="891">

---
[![NPM Version](https://img.shields.io/npm/v/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![](https://img.shields.io/npm/dt/numl.svg?style=flat)](https://www.npmjs.com/package/numl)
[![Gitter](https://badges.gitter.im/tenphi/numl.svg)](https://gitter.im/tenphi/numl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Rate on Openbase](https://badges.openbase.io/js/rating/numl.svg)](https://openbase.io/js/numl?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

**PRE-RELEASE VERSION, UNDER RAPID DEVELOPMENT**

[Learn more at NUML.DESIGN](https://numl.design/)

## Examples

* [Flex playground](https://numl.design/storybook/layouts/flex-playground)
* [Grid playground](https://numl.design/storybook/layouts/grid-playground)
* [Markdown converter](https://numl.design/storybook/converters/markdown)
* [Before/After slider](https://numl.design/storybook/complex/before-after-slider)
* [Login form validation](https://numl.design/storybook/complex/login-form)

## Getting started

To start prototyping with **Numl** just add a single module to the page:

```html
<script type="module" src="https://cdn.skypack.dev/numl@0.12"></script>
```

That's it! No build step, no explicit function call to apply changes.

If you want to prevent flash of unstyled content then add the following tag to the `head`:

```html
:not(:defined) {
  visibility: hidden;
}
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

Make sure that **Numl** won't be run on the server side.

**Numl** don't support SSR but still compatible with it, just make sure you import it after the app rehydration. You can use dynamic import for this:

```javascript
import('numl');
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

Based on [caniuse.com](caniuse.com). Real-world support table will be presented after **v1 release**.

* ~~Microsoft Edge 16-18~~ (Partial support with [@webcomponents/custom-elements polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements), 5kb)
* Microsoft Edge 76+
* Google Chrome 67+
* Mozilla Firefox 63+
* Apple Safari 10.1+
* Apple iOS Safari 10.3+
* Google Android 67+

> Safari versions below 11 requires additional transpiling to support dynamic import.

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
