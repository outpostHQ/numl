import { devMode, error } from './helpers.js';

function extract(module) {
  return module.default || module;
}

const DICT = {};

const MIXINS = {
  focusable: () => extract(import(`./mixins/focusable.js`)),
  menu: () => extract(import(`./mixins/menu.js`)),
  menuitem: () => extract(import(`./mixins/menuitem.js`)),
  active: () => extract(import(`./mixins/active.js`)),
  fixate: () => extract(import(`./mixins/fixate.js`)),
  orient: () => extract(import(`./mixins/orient.js`)),
  popup: () => extract(import('./mixins/popup.js')),
  control: () => extract(import('./mixins/control')),
  radiogroup: () => extract(import('./mixins/radiogroup')),
  button: () => extract(import('./mixins/button')),
};

export function hasMixin(el, name) {
  const mixins = el.constructor.nuAllMixins;

  return mixins && (name in mixins);
}

export function getMixin(name) {
  if (DICT[name]) {
    return DICT[name];
  }

  if (devMode && !MIXINS[name]) {
    error('mixin not found', name);
    return;
  }

  let promise = MIXINS[name]();

  if (promise.then) {
    promise = promise.then(module => module.default || module);
  } else {
    promise = Promise.resolve(promise);
  }

  DICT[name] = promise;

  return promise;
};
