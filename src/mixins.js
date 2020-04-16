import FocusMixin from './mixins/focus.js';
import { devMode, error } from './helpers.js';

function extract(module) {
  return module.default || module;
}

const DICT = {};

const MIXINS = {
  focus: () => FocusMixin,
  active: () => extract(import(`./mixins/active.js`)),
  fixate: () => extract(import(`./mixins/fixate.js`)),
  orient: () => extract(import(`./mixins/orient.js`)),
  popup: () => extract(import('./mixins/popup.js')),
  control: () => extract(import('./mixins/control')),
};

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
