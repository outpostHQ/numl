import {
  asyncDebounce,
  devMode,
  isDefined,
  isTouch,
  warn,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  resetScroll,
  isEqual,
} from './helpers';

import { define } from './define';
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
import { defineBehavior, hasBehavior, getBehavior } from './behaviors';
import svg from './svg';
import icons from './icons';
import routing from './routing';
import themeAttr from './attributes/theme';
import { initFocus } from './focus';
import props from './props';
import generators from './generators';
import { scheme, contrast, reduceMotion, preventInit } from './settings';
import CONTEXT from './context';
import { applyTheme, BASE_THEME, hue } from './themes';
import { removeRulesByPart, generateCSS, insertRuleSet } from './css';
import { NuElement } from './elements';
import Behavior from './behaviors/behavior';
import WidgetBehavior from './behaviors/widget';

initSticky(); // enable sticky detection
initLinks(); // enable link current state detection

const behaviors = {
  define: defineBehavior,
  has: hasBehavior,
  get: getBehavior,
};

const helpers = {
  resetScroll,
};

const BODY = document.body;

if (window.Nude) {
  warn('Several instances of NUDE Framework is loaded. Initialization aborted');
}

initFocus();

setTimeout(() => {
  applyTheme(BODY, BASE_THEME, 'main');
});

const themeStyles = themeAttr('main');

insertRuleSet('theme:base', generateCSS('body', [...themeStyles, {
  '--nu-diff-color': 'var(--nu-bg-color)',
}], false, true));

const verifyDOM = asyncDebounce(() => {
  const els = [...document.querySelectorAll('[nu]')];

  els.forEach(el => {
    el.nuCreateContext();
  });

  els.forEach(el => {
    el.nuContextChanged(name);
    el.nuSetContextAttrs();

    if (el.hasAttribute('theme')) {
      el.nuEnsureThemes();
    }

    if (el.nuApply) {
      el.nuApply();
    }
  });

  [...document.querySelectorAll('[is-root]')]
    .forEach(el => {
      el.nuVerifyChildren(true);
    });

  removeRulesByPart('attrs:all');
});

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
  verifyDOM,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  NuElement,
  Behavior,
  WidgetBehavior,
  helpers,
  styles,
  isEqual,
  define,
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
  });

  const styleEl = [...document.querySelectorAll('style')].find(style => {
    if (style.dataset.numl == null && style.textContent.includes('nu-root')) {
      return true;
    }
  });

  // init all nude elements
  Object.values(elements)
    .forEach(defineElement);

  // show all nu-root elements back
  rootEls.forEach(el => {
    el.nuParent && el.nuParent.appendChild(el);
  });

  setTimeout(() => {
    if (styleEl && styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
  }, 50);
};

Nude.getElementById = function (id) {
  return document.querySelector(`[nu-id="${id}"]`);
};

Nude.getElementsById = function (id) {
  return document.querySelectorAll(`[nu-id="${id}"]`);
};

window.Nude = Nude;

if (!preventInit) {
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
  verifyDOM,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  NuElement,
  Behavior,
  WidgetBehavior,
  helpers,
  isEqual,
  styles,
  define,
  hue,
  // themes,
  // css,
  // color,
  // variables,
};
