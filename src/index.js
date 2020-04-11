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

const ROOT = document.querySelector(':root');

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

const DATASET = ROOT.dataset;
const SCHEME_OPTIONS = ['auto', 'light', 'dark'];
const CONTRAST_OPTIONS = ['auto', 'low', 'high'];

Nude.scheme = (val) => {
  const currentScheme = DATASET.nuScheme || 'auto';

  if (!SCHEME_OPTIONS.includes(currentScheme)) {
    currentScheme = 'auto';
  }

  if (val == null) {
    return currentScheme;
  }

  if (SCHEME_OPTIONS.includes(val)) {
    DATASET.nuScheme = val;
  }
};

Nude.contrast = (val) => {
  const currentContrast = DATASET.nuContrast || 'auto';

  if (!CONTRAST_OPTIONS.includes(currentContrast)) {
    currentContrast = 'auto';
  }

  if (val == null) {
    return currentContrast;
  }

  if (CONTRAST_OPTIONS.includes(val)) {
    DATASET.nuContrast = val;
  }
};

Nude.reduceMotion = (bool) => {
  if (bool) {
    DATASET.nuReduceMotion = '';
  } else {
    delete DATASET.nuReduceMotion;
  }
}

Nude.elements = ELEMENTS;

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
