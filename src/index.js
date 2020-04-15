export * from './elements';
import * as ELEMENTS from './elements';
import NuBase from './elements/base';
import NuActiveElement from './elements/activeelement';
// helpers
import * as helpers from './helpers';
import * as color from './color';
import { initFocus } from './focus';
import * as themes from './themes';
import themeAttr from './attributes/theme';
import * as css from './css';
import { scheme, contrast, reduceMotion } from './settings';
import CONTEXT from './context';

if (window.Nude) {
  warn('Several instances of NUDE Framework is loaded. Initialization aborted');
}

initFocus();

setTimeout(() => {
  themes.applyTheme(document.body, themes.BASE_THEME, 'main');
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
};

Nude.init = (...elements) => {
  elements.forEach(el => {
    el.nuInit();
  });

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

  setTimeout(() => {
    [...document.querySelectorAll('[nu-hidden]')]
      .forEach(el => el.removeAttribute('nu-hidden'));
  });

  css.cleanCSSByPart('attrs:all');
};

Nude.getElementById = function (id) {
  return document.querySelector(`[nu-id="${id}"]`);
};

Nude.getElementsById = function (id) {
  return document.querySelectorAll(`[nu-id="${id}"]`);
};

Nude.getCriticalCSS = function () {
  const baseCSS = [...document.querySelectorAll('[data-nu-name]')]
    .reduce((html, el) => {
      const name = el.dataset.nuName.replace(/&quot;/g, '"');

      if ((!name.includes('#nu--') && !name.startsWith('theme:') && !name.includes('theme='))
        || name === 'theme:base' || name === 'theme:main:body') {
        html += el.outerHTML;
        html += '\n';
      }

      return html;
    }, '');

  const attrsCSS = `<style data-nu-name="attrs:all">${[...document.querySelectorAll('nu-attrs')]
    .reduce((css, el) => {
      css += el.nuGetCriticalCSS();

      return css;
    }, '')}</style>`;

  return `${baseCSS}\n${attrsCSS}`;
};

Nude.elements = ELEMENTS;

Nude.init(...Object.values(ELEMENTS));

window.Nude = Nude;

export default Nude;

const {
  STATES_MAP,
  CUSTOM_UNITS,
  ROOT_CONTEXT,
} = helpers;

export {
  STATES_MAP,
  CUSTOM_UNITS,
  ROOT_CONTEXT,
  NuBase,
  NuActiveElement,
  ELEMENTS,
  scheme,
  contrast,
  reduceMotion,
};
