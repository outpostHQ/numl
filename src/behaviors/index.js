import { devMode, error } from '../helpers.js';

function extract(promise) {
  return promise.then(module => module.default || module);
}

const DICT = {};

export const BEHAVIORS = {
  focusable: () => extract(import(`./focusable.js`)),
  menu: () => extract(import(`./menu.js`)),
  menuitem: () => extract(import(`./menuitem.js`)),
  active: () => extract(import(`./active.js`)),
  fixate: () => extract(import(`./fixate.js`)),
  orient: () => extract(import(`./orient.js`)),
  popup: () => extract(import('./popup.js')),
  control: () => extract(import('./control.js')),
  radiogroup: () => extract(import('./radiogroup.js')),
  button: () => extract(import('./button.js')),
  label: () => extract(import('./label.js')),
  code: () => extract(import('./code.js')),
  markdown: () => extract(import('./markdown.js')),
  datetime: () => extract(import('./datetime.js')),
  number: () => extract(import('./number.js')),
  component: () => extract(import('./component.js')),
  slider: () => extract(import('./slider.js')),
  input: () => extract(import('./input.js')),
  numinput: () => extract(import('./numinput.js')),
  textarea: () => extract(import('./textarea.js')),
  icon: () => extract(import('./icon.js')),
  svg: () => extract(import('./svg.js')),
  image: () => extract(import('./image.js')),
  debug: () => extract(import('./debug.js')),
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
