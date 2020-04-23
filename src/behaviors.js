import { devMode, error } from './helpers.js';

function extract(module) {
  return module.default || module;
}

const DICT = {};

export const BEHAVIORS = {
  focusable: () => extract(import(`./behaviors/focusable.js`)),
  menu: () => extract(import(`./behaviors/menu.js`)),
  menuitem: () => extract(import(`./behaviors/menuitem.js`)),
  active: () => extract(import(`./behaviors/active.js`)),
  fixate: () => extract(import(`./behaviors/fixate.js`)),
  orient: () => extract(import(`./behaviors/orient.js`)),
  popup: () => extract(import('./behaviors/popup.js')),
  control: () => extract(import('./behaviors/control.js')),
  radiogroup: () => extract(import('./behaviors/radiogroup.js')),
  button: () => extract(import('./behaviors/button.js')),
  label: () => extract(import('./behaviors/label.js')),
  code: () => extract(import('./behaviors/code.js')),
  markdown: () => extract(import('./behaviors/markdown.js')),
  datetime: () => extract(import('./behaviors/datetime.js')),
  number: () => extract(import('./behaviors/number.js')),
};

export function hasBehavior(el, name) {
  const behaviors = el.constructor.nuAllBehaviors;

  return behaviors && (name in behaviors);
}

export function getBehavior(name) {
  if (DICT[name]) {
    return DICT[name];
  }

  if (devMode && !BEHAVIORS[name]) {
    error('behavior not found', name);
    return;
  }

  let promise = BEHAVIORS[name]();

  if (promise.then) {
    promise = promise.then(module => module.default || module);
  } else {
    promise = Promise.resolve(promise);
  }

  DICT[name] = promise;

  return promise;
}
