import { devMode, error } from '../helpers.js';
import GroupBehavior from './group';
import { warn } from '../helpers';
import { extractModule as extract } from '../helpers';

const DICT = {};

const BEHAVIORS = {
  focus: () => extract(import(`./focus.js`)),
  hover: () => extract(import(`./hover.js`)),
  listbox: () => extract(import(`./listbox.js`)),
  option: () => extract(import(`./option.js`)),
  active: () => extract(import(`./active.js`)),
  fixate: () => extract(import(`./fixate.js`)),
  orient: () => extract(import(`./orient.js`)),
  popup: () => extract(import('./popup.js')),
  control: () => extract(import('./control.js')),
  radiogroup: () => extract(import('./radiogroup.js')),
  action: () => extract(import('./action.js')),
  label: () => extract(import('./label.js')),
  code: () => extract(import('./code.js')),
  markdown: () => extract(import('./markdown.js')),
  datetime: () => extract(import('./datetime.js')),
  number: () => extract(import('./number.js')),
  slider: () => extract(import('./slider.js')),
  numinput: () => extract(import('./numinput.js')),
  input: () => extract(import('./input.js')),
  textarea: () => extract(import('./textarea.js')),
  fileinput: () => extract(import('./fileinput.js')),
  icon: () => extract(import('./icon.js')),
  svg: () => extract(import('./svg.js')),
  image: () => extract(import('./image.js')),
  debug: () => extract(import('./debug.js')),
  debugger: () => extract(import('./debugger.js')),
  form: () => extract(import('./form.js')),
  validator: () => extract(import('./validator.js')),
  group: () => Promise.resolve(GroupBehavior),
  tooltip: () => extract(import('./tooltip.js')),
  progressbar: () => extract(import('./progressbar.js')),
  value: () => extract(import('./value.js')),
  datepicker: () => extract(import('./datepicker.js')),
  dateinput: () => extract(import('./dateinput.js')),
  inputgroup: () => extract(import(`./inputgroup.js`)),
  menu: () => extract(import(`./menu.js`)),
  menuitem: () => extract(import(`./menuitem.js`)),
  offset: () => extract(import(`./offset.js`)),
  appear: () => extract(import(`./appear.js`)),
  hotkey: () => extract(import('./hotkey.js')),
  current: () => extract(import('./current.js')),
};

function hasBehavior(name) {
  return name in BEHAVIORS;
}

function getBehavior(name) {
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

function defineBehavior(name, behaviorLoader) {
  if (BEHAVIORS[name]) {
    warn('behavior has already been defined', name);

    return;
  }

  BEHAVIORS[name] = behaviorLoader;
}

function clearAll() {
  Object.keys(BEHAVIORS)
    .forEach(behaviorName => {
      delete BEHAVIORS[behaviorName];
    });
}

export default {
  define: defineBehavior,
  clearAll,
  has: hasBehavior,
  get: getBehavior,
  map: BEHAVIORS,
};
