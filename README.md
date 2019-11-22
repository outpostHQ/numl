# <img src="https://github.com/tenphi/nude/blob/master/logo.png?raw=true" alt="NUDE Elements" width="416">

**PRE-ALPHA VERSION, UNDER RAPID DEVELOPMENT, API is subject to change**

**NUDE Elements** is: 

* Customizable **Design System** for any project and scale
* Accessible production-ready **Prototyping Solution**
* Handy **UI library** for your favorite framework
* Powerful **CSS/JS-Framework** with CSS generation, inheritance and more
* Markup **Methodology** that is enjoyable to follow
* All-in-one **Language** to describe interfaces that look and work great

And also... it's **just a single js-file** that you can include into your website to start doing magic:

* **No** build step needed (*don't wait! create!*)
* **No** dependencies included
* **No** config needed (*your markup is your config*)
* **No** scripting to activate
* **No** confusing classes to style
* **No** frustration in usage

With **NUDE Elements** you can: 

* Create virtually **any interface** you want
* Make your interface **accessible** without fighting IDs and specifications
* Create your own element or a whole **Design System** with ease
* Add **responsiveness** with effort so little you've never seen before
* **Copy-paste** your markup from project to project, regardless of the framework used
* Add **Dark Theme** to your NUDE-powered site effortlessly
* Be calm for technical debt in markup code
* **Enjoy** while doing what you love

## FAQ

**Q: There are many CSS-Frameworks out there. Why is NUDE different?**

**A:** CSS-Frameworks solve problems related to styling while NUDE tend to solve many others related to interface creation like accessibility, color generation, style/logic sharing and context awareness. It's just more complex and ambitious. 

**Q: Why should I use NUDE instead of popular CSS-framework like Tailwind?**

**A:** Popular CSS-frameworks tend to decide what you need and provide tools that limit the power of CSS. Unlike them, NUDE unleashes the power of CSS by making it dynamic and parameterizable without the need to use a preprocessor.

**Q: Why should I use NUDE instead of writing CSS from the scratch?**

**A:** CSS is complex but the modern web is not possible without it. Instead of replacing CSS, NUDE simplifies every aspect of CSS development by providing handy abstractions for responsiveness, theming, complex selectors, etc. It provides reasonable defaults leaving you with ability to change them if you need it. It greatly reduces amount of work that needed to be done not only for developers but for designers too!

**Q: Why should I use NUDE instead of using CSS-in-JS approach?**

**A:** CSS-in-JS really simplifies some aspects of writing CSS. But it's still CSS. It's like you move your problems from one file to another. NUDE solves many problems by itself, providing you API to solve many others without stuffing your JS files. In fact, it greatly reduces them by providing useful declarations in markup. 

**Q: I am a web designer. How can NUDE help me?**

**A:** Many web designers learn CSS frameworks these days. So it’s a good choice to try. NUDE is much more flexible and easy to learn than other powerful alternatives. For example it do a lot of color magic by generating and adapting them for various purposes. Also it can help you to learn more about modern best practices and accessibility features of the web which we think is very important. 

**Q: How can I use NUDE with older browsers?**

**A:** NUDE substantially depends on Custom Elements and Custom Properties. The CE can be easily polyfilled back to IE11 but CP can’t. While NUDE methodology don’t strictly require CP, they makes NUDE implementation much easier and faster in performance. See details in the related [ISSUE](https://github.com/tenphi/nude/issues/2).

**Q: Is NUDE SEO-friendly?**

**A:** NUDE’s focus is to provide a language for creating accessible and beautiful interfaces. SEO is a completely different task that often contradicts to best practices and accessibility. We believe such task can be achieved separately by using preprocessors and other technics without touching NUDE philosophy.

**Q: Is NUDE production-ready?**

**A:** It's NOT despite the fact it's widely used in production by the Author of NUDE. And he is working hard to make it production-ready for everyone as soon as possible but without community support it will be a long run. So give it a try, leave some feedback, post issues and tell friends to support our project!

## Playground
See [Online playground](http://j.mp/numl-playground). You can edit markup using DevTools and instantly see changes!

[Playground - JSBin version](http://j.mp/numl-codepen) (without theme variants for faster performance). For those who love REPLing around.

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
* [Elements](docs/elements/README.md) - `60% Complete`
* [Attributes](docs/attributes/README.md) - `5% Complete`
* [Markup methodology](docs/markup.md) - `0% Complete`
* [Theme system](docs/themes.md)
* [Responsive system](docs/responsive.md)
* [State system](docs/states.md)
* [Widgets](docs/widgets.md) - `0% Complete`
* [Integration with Frameworks](docs/integration.md)
* [Known issues](docs/issues.md)

## Roadmap

* Improve performance of responsive system.
* Improve widgets' logic.
* New variable system.
* New useful elements.
* Documentation

## Changelog

### v0.8

#### New features

* Full rework of **Theme System**. Full theme calculation from single hue param. WCAG contrast ratio compliance. Much better **Dark scheme** and **High contrast** support. Ability to tweak every theme with modifiers.

#### Breaking changes

* **theme**, **color**, **fill** attributes now works completely different.
* **nu-theme** has new awesome API.
* **nu-triangle**: **[dir]** -> **[set]**.
* **nu-style** renamed to **nu-attrs** for a more accurate understanding.

#### Bug fixes
* Unable to change border width of **nu-switch**.
* Flex doubles gap in Firefox.

### v0.7

#### Breaking changes
* **mod** attribute is replaced with **text** attribute and move all non-text-related modifiers to other attributes. Now it’s not possible to specify text size with **text** attribute. Use **size** attribute instead.
* **hidden** attribute is renamed to **hide**.
* **events** attribute is renamed to **interactive** and change its API.
* **cell** attribute replaced with **fill** value for **place** attribute.
*  **background** attribute is renamed to **fill**.

#### New elements
* New base inline element **nu-el**.
* New **nu-rowheader** element for tables.
* New **nu-checkbox** element.
* New **nu-label** element.
* New **nu-style** element to declare attributes with their values in context to cast them into elements within that context. It’s a handy alternative to CSS classes. You can dynamically change attributes to affect related elements.
* New **nu-popup** and **nu-popupmenu** elements with accessibility features and intuitive mechanics.

#### New attributes & modifiers
* Dynamic **display** attribute. How you can change it depending on responsive points or state.
* Added wrapped **flex** support with two-dimension gap. Just use **flow** attribute with **wrap** modifier. (Polyfill has restrictions)
* New attribute **overflow**.
* New **image** attribute for background image declaration.
* New modifiers for **radius** attribute: **round** and **ellipse**.
* Direction modifiers for **padding** and **space** attributes.
* New **color** attribute modifiers: **fill**, **minor fill**, **special fill**, **swap**, **minor swap**, **special swap**. They currently don’t affect shadow intensity; New color shotcuts presented;
* Added new **:prev** and **:next** shortcuts for accessibility link attributes.

#### Minor and internal changes
* Added context system to access element's context provided by parent elements and register hooks for context change. It’s very important feature that drastically simplifies implementation of widgets and internal systems.
* Full rework of **gap** and **flow** attributes to better support dynamic **display** attribute.
* Attribute **gap** support for all block elements. It add needed margins to all children except the last one.
* Simplified event mechanics for widgets.
* **CSS Mixins** to share styles between attributes and optimize style applying. It's under-the-hood improvement that speeds up elements’ rendering and fixes several bugs. It almost completely fulfills NUDE’s promise to apply styles only when they are needed.
* Static css inheritance reworked. API was simplified.
* Added cleaning system to remove CSS that can’t be used again.
* Add auto id static getter **nuId**. If specified element will automatically receive **id**. So you can link the most of the elements without explicitly defining **id** in some cases.
* Multiple fixes to various element styles.

#### Bug fixes
* Responsive system fix to support attributes that generates nothing for some values.

## Contribution

There is no contribution guideline just yet but we would love to hear any feedback from you. Feel free to leave a note at [tenphi@gmail.com](mailto:tenphi@gmail.com?subject=NUDE%20Feeback).

## License

[MIT](LICENSE)
