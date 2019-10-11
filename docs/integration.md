# Integration with Frameworks

First of all, install NUDE as npm package:

```bash
$ npm install numl --save
```

Now add it to your javascript entry point:

```javascript
import 'numl';
```

### Icon loader

To use your own icons redefine `nuLoader` static method of `nuIcon`. For example:

```javascript
Nude.elements.NuIcon.nuLoader = 
  name => import(/* webpackChunkName: "icon" */ `@/base/icons/${name}.js`)
    .then(module => module.default);
```

The async function should receive icon **name** (`String`) and return **SVG-code** (`String`) of your icon.

### Setup router

You can interrupt router commands with overwriting `nuNavigate` static method of `NuActiveElement`. For example:

```javascript
import router from '@/router';

const nuNavigate = Nude.elements.NuActiveElement.nuNavigate;

Nude.elements.NuActiveElement.nuNavigate = (url) => {
  // skip outside links and links that open in new tabs
  if (url.startsWith('!') || url.includes('//')) return nuNavigate(url);
  
  router.push(url);
};
```

### Preparations are done!

Continue with instructions for specific framework...

## Javascript Frameworks

### Vue.JS

We should register NUDE elements in config so Vue can ignore them. It's very simple:

```javascript
// Register NUDE elements
Vue.config.ignoredElements = [/^nu-/, /^nd-/];
```

That's all!

#### Known issues

Not found yet.

### Svelte

No additional code is needed. Just have fun!

#### Known issues

* Don't define getters and setters on your own NUDE Elements. It will trigger errors in Svelte because it uses that mechanism to propagate state to the Svelte-components. Relevant only for a attribute/property collision.

### React

Presumably supported.

Not tested yet. Please, provide us feedback if you have such experience!
 
### Angular

Presumably supported.

Not tested yet. Please, provide us feedback if you have such experience!

### Preact

Presumably supported.

Not tested yet. Please, provide us feedback if you have such experience!
