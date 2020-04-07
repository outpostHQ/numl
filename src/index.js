export * from './elements';
import * as ELEMENTS from './elements';
import NuBase from './elements/base';
import NuActiveElement from './elements/activeelement';
// helpers
import * as helpers from './helpers';
import * as color from './color';
import { enableFocus, disableFocus } from './focus';
import * as themes from './themes';
import themeAttr from './attributes/theme';
import * as css from './css';

const IGNORE_KEYS = ['Alt', 'Control', 'Meta', 'Shift'];

const win = window;

win.addEventListener('mousedown', disableFocus);
win.addEventListener('touchstart', disableFocus, { passive: true });
win.addEventListener('keydown', (event) => {
  if (!IGNORE_KEYS.includes(event.key)) {
    enableFocus();
  }
});

setTimeout(() => {
  themes.applyTheme(document.body, themes.BASE_THEME, 'main');
});

const styles = themeAttr('main');

css.injectCSS('theme:base', 'body', css.generateCSS('body', [...styles, {
  '--nu-diff-color': 'var(--nu-bg-color)',
}]));

const REDUCED_MOTION_CLASS = 'nu-reduce-motion-force';
const ROOT = document.querySelector('html');

if (!ROOT.classList.contains(REDUCED_MOTION_CLASS)) {
  ROOT.classList.add(REDUCED_MOTION_CLASS);

  setTimeout(() => {
    setTimeout(() => {
      ROOT.classList.remove(REDUCED_MOTION_CLASS);
    }, 2000); // wait for 2s before re-enable animations
  }, 0); // wait for current flow complete
}

const Nude = {
  tags: {},
  helpers,
  color,
  themes,
  css,
  isTouch: helpers.isTouch,
  version: process.env.APP_VERSION,
};

Nude.init = (...elements) => {
  const els = [...document.querySelectorAll('[nu]')];

  elements.forEach(el => {
    el.nuInit();
  });

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

  [...document.querySelectorAll('.nu-loading')]
    .forEach(el => el.style.display = 'none !important');

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

Nude.init(...Object.values(ELEMENTS));

win.Nude = Nude;

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
};
