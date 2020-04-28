export * from './elements';
export { FLEX_GAP_SUPPORTED } from './attributes/gap';
import * as ELEMENTS from './elements';
import NuBase from './elements/base';
import NuActiveElement from './elements/activeelement';
// helpers
import * as helpers from './helpers';
import * as color from './color';
import * as themes from './themes';
import * as css from './css';
import icons from './icons';
import routing from './routing';
import svg from './svg';
import * as variables from './variables';
import themeAttr from './attributes/theme';
import { initFocus } from './focus';
import { scheme, contrast, reduceMotion } from './settings';
import CONTEXT from './context';

const BODY = document.body;

if (window.Nude) {
  helpers.warn('Several instances of NUDE Framework is loaded. Initialization aborted');
}

initFocus();

setTimeout(() => {
  themes.applyTheme(BODY, themes.BASE_THEME, 'main');
});

const styles = themeAttr('main');

css.injectCSS('theme:base', 'body', css.generateCSS('body', [...styles, {
  '--nu-diff-color': 'var(--nu-bg-color)',
}]));

const Nude = {
  tags: {},
  helpers,
  color,
  themes,
  css,
  isTouch: helpers.isTouch,
  version: process.env.APP_VERSION,
  scheme,
  contrast,
  reduceMotion,
  CONTEXT,
  routing,
  icons,
  svg,
  variables,
};

const verifyDOM = helpers.asyncDebounce(() => {
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

  [...document.querySelectorAll('[nu-root]')]
    .forEach(el => {
      el.nuVerifyChildren(true);
    });

  css.cleanCSSByPart('attrs:all');
});

Nude.init = (...elements) => {
  elements.forEach(el => {
    el.nuInit();
  });

  verifyDOM();
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

Nude.elements = ELEMENTS;

window.Nude = Nude;

const rootEls = document.querySelectorAll('nu-root');

rootEls.forEach(el => {
  el.nuParent = el.parentNode;

  el.parentNode.removeChild(el);
});

const styleEl = [...document.querySelectorAll('style')].find(style => {
  if (style.textContent.includes('nu-root')) {
    return true;
  }
});

Nude.init(...Object.values(ELEMENTS));

rootEls.forEach(el => {
  el.nuParent && el.nuParent.appendChild(el);
});

if (styleEl) {
  styleEl.parentNode.removeChild(styleEl);
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
  ELEMENTS as elements,
  scheme,
  contrast,
  reduceMotion,
  helpers,
  themes,
  css,
  color,
  routing,
  icons,
  svg,
  variables,
};
