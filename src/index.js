import {
  asyncDebounce,
  devMode,
  isDefined,
  isTouch,
  warn,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
} from './helpers';

export * from './elements';
export { FLEX_GAP_SUPPORTED } from './attributes/gap';
import sticky from './sticky';

'./sticky';
import * as elements from './elements';
import NuBase from './elements/base';
import NuActiveElement from './elements/activeelement';
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
import { applyTheme, BASE_THEME } from './themes';
import { cleanCSSByPart, generateCSS, injectCSS } from './css';
import { NuElement } from './elements';
import Behavior from './behaviors/behavior';
import WidgetBehavior from './behaviors/widget';

sticky(); // enable sticky detection

const behaviors = {
  define: defineBehavior,
  has: hasBehavior,
  get: getBehavior,
};

// const helpers = import('./helpers');
// const color = import('./color');
// const themes = import('./themes');
// const css = import('./css');
// const variables = import('./variables');

const BODY = document.body;

if (window.Nude) {
  warn('Several instances of NUDE Framework is loaded. Initialization aborted');
}

initFocus();

setTimeout(() => {
  applyTheme(BODY, BASE_THEME, 'main');
});

const themeStyles = themeAttr('main');

injectCSS('theme:base', 'body', generateCSS('body', [...themeStyles, {
  '--nu-diff-color': 'var(--nu-bg-color)',
}]));

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

  cleanCSSByPart('attrs:all');
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
  // helpers,
  // color,
  // themes,
  // css,
  // variables,
};

function define(el) {
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
  const rootEls = document.querySelectorAll('is-root');

  rootEls.forEach(el => {
    el.nuParent = el.parentNode;

    el.parentNode.removeChild(el);
  });

  const styleEl = [...document.querySelectorAll('style')].find(style => {
    if (style.textContent.includes('nu-root')) {
      return true;
    }
  });

  // init all nude elements
  Object.values(elements)
    .forEach(define);

  // show all nu-root elements back
  setTimeout(() => {
    rootEls.forEach(el => {
      el.nuParent && el.nuParent.appendChild(el);
    });

    if (styleEl) {
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

// Get critical css
// Nude.getCriticalCSS = function () {
//   const baseCSS = [...document.querySelectorAll('[data-nu-name]')]
//     .reduce((html, el) => {
//       const name = el.dataset.nuName.replace(/&quot;/g, '"');
//
//       if ((!name.includes('#nu--') && !name.startsWith('theme:') && !name.includes('theme='))
//         || name === 'theme:base' || name === 'theme:main:body') {
//         html += el.outerHTML;
//         html += '\n';
//       }
//
//       return html;
//     }, '');
//
//   const attrsCSS = `<style data-nu-name="attrs:all">${[...document.querySelectorAll('nu-attrs')]
//     .reduce((css, el) => {
//       css += el.nuGetCriticalCSS();
//
//       return css;
//     }, '')}</style>`;
//
//   return `${baseCSS}\n${attrsCSS}`;
// };

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
  NuActiveElement,
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
  // helpers,
  // themes,
  // css,
  // color,
  // variables,
};
