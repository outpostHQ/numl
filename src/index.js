import {
  devMode,
  isDefined,
  isTouch,
  warn,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  resetScroll,
  isEqual, error,
} from './helpers';

import { define, assign as baseAssign } from './api';

export { FLEX_GAP_SUPPORTED } from './attributes/gap';
import initSticky from './sticky';
import initLinks from './links';

import * as elements from './elements';
import NuBase from './elements/base';
import styles from './attributes/base';
import NuAction from './elements/action';
// export * from './behaviors/widget';
// export * from './helpers';
// import * as color from './color';
// import * as themes from './themes';
// import * as css from './css';
// import * as variables from './variables';
import behaviors from './behaviors';
import units from './units';
import svg from './svg';
import icons from './icons';
import routing from './routing';
import themeAttr from './attributes/theme';
import { initFocus } from './focus';
import props from './props';
import generators from './generators';
import { scheme, contrast, reduceMotion, preventInit, behaviorOption } from './settings';
import CONTEXT from './context';
import { applyTheme, BASE_THEME, hue } from './themes';
import { removeRulesByPart, generateCSS, insertRuleSet } from './css';

initSticky(); // enable sticky detection
initLinks(); // enable link current state detection

function assign(element, options, replace) {
  return baseAssign(element, options, elements, replace);
}

const helpers = {
  resetScroll,
};

const BODY = document.body;

if (window.Nude) {
  throw error('Several instances of NUDE Framework is loaded. Initialization aborted');
}

initFocus();

setTimeout(() => {
  applyTheme(BODY, BASE_THEME, 'main');
});

const themeStyles = themeAttr('main');

insertRuleSet('theme:base', generateCSS('body', [...themeStyles, {
  '--nu-diff-color': 'var(--nu-bg-color)',
}], false, true));

const Nude = {
  tags: {},
  isTouch,
  version: process.env.APP_VERSION,
  scheme,
  contrast,
  reduceMotion,
  behaviors,
  props,
  generators,
  CONTEXT,
  routing,
  icons,
  svg,
  elements,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  helpers,
  styles,
  isEqual,
  define,
  assign,
  units,
  hue,
  // color,
  // themes,
  // css,
  // variables,
};

function defineElement(el) {
  const tag = el.nuTag;

  if (isDefined(tag)) {
    if (devMode) {
      warn('already defined: ', JSON.stringify(tag));
    }

    return;
  }

  // For hidden elements generate styles immediately
  if (el.nuAllStyles.display === 'none') {
    el.nuInit();
  }

  customElements.define(tag, el);
}

Nude.init = () => {
  const rootEls = document.querySelectorAll('nu-root');

  rootEls.forEach(el => {
    el.nuParent = el.parentNode;

    el.parentNode.removeChild(el);

    el.style.visibility = 'hidden';
  });

  // init all nude elements
  Object.values(elements)
    .forEach(defineElement);

  // show all nu-root elements back
  rootEls.forEach(el => {
    el.nuParent && el.nuParent.appendChild(el);
  });

  // setTimeout is used to give some time for themes to initialize.
  setTimeout(() => {
    rootEls.forEach(el => {
      el.style.visibility = '';
    });

    requestAnimationFrame(() => {
      window.dispatchEvent(numlReadyEvent);
    });
  }, 50);
};

Nude.getElementById = function (id) {
  return document.querySelector(`[nu-id="${id}"]`);
};

Nude.getElementsById = function (id) {
  return document.querySelectorAll(`[nu-id="${id}"]`);
};

window.Nude = Nude;

const nudeReadyEvent = new CustomEvent('nudeReady', { cancelable: true });
const numlReadyEvent = new CustomEvent('numlReady');

if (behaviorOption !== 'auto') {
  Object.keys(elements)
    .forEach(name => {
      const Element = elements[name];

      assign(Element.nuTag, {
        behaviors: {},
      }, true);
    });

  if (behaviorOption === 'no') {
    behaviors.clearAll();
  }
}

if (window.dispatchEvent(nudeReadyEvent) && !preventInit) {
  Nude.init();
}

export default Nude;

export {
  STATES_MAP,
  CUSTOM_UNITS,
  ROOT_CONTEXT,
} from './helpers';

export {
  Nude,
  NuBase,
  NuAction,
  elements,
  scheme,
  contrast,
  reduceMotion,
  CONTEXT,
  behaviors,
  routing,
  icons,
  svg,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  helpers,
  isEqual,
  styles,
  define,
  assign,
  units,
  hue,
  // themes,
  // css,
  // color,
  // variables,
};
