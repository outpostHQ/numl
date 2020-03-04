// elements
import NuBase from './base';
import NuElement from './elements/element';
import NuGrid from './elements/grid';
import NuBlock from './elements/block';
import NuHeading from './elements/heading';
import NuIcon from './elements/icon';
import NuLine from './elements/line';
import NuPane from './elements/pane';
import NuCard from './elements/card';
import NuLayout from './elements/flow';
import NuBtn from './elements/btn';
import NuTab from './elements/tab';
import NuSwitch from './elements/switch';
import NuGridTable from './elements/gridtable';
import NuBadge from './elements/badge';
import NuLink from './elements/link';
import NuBlockLink from './elements/blocklink';
import NuInput from './elements/input';
import NuFlex from './elements/flex';
import NuBtnGroup from './elements/btngroup';
import NuMenu from './elements/menu';
import NuMenuItem from './elements/menuitem';
import NuTablist from './elements/tablist';
import NuActiveElement from './elements/activeelement';
import NuTriangle from './elements/triangle';
import NuTooltip from './elements/tooltip';
import NuTable from './elements/table';
import NuRow from './elements/row';
import NuRowGroup from './elements/rowgroup';
import NuCell from './elements/cell';
import NuColumnHeader from './elements/columnheader';
import NuRowHeader from './elements/rowheader';
import NuPopup from './elements/popup';
import NuPopupMenu from './elements/popupmenu';
import NuGroup from './elements/group';
import NuCheckbox from './elements/checkbox';
import NuRadioGroup from './elements/radiogroup';
import NuRadio from './elements/radio';
import NuLabel from './elements/label';
import NuNumInput from './elements/numinput';
import NuMark from './elements/mark';
import NuSpecial from './elements/special';
import NuSvg from './elements/svg';
import NuImg from './elements/img';
import NuCode from './elements/code';
import NuClamp from './elements/clamp';
import NuProgressBar from './elements/progress';
import NuRail from './elements/rail';
import NuSlider from './elements/slider';
import NuMarkdown from './elements/markdown';
import NuMd from './elements/md';
import NuList from './elements/list';
import NuListItem from './elements/listitem';
import NuRoot from './elements/root';
// decorators
import NuDecorator from './decorators/decorator';
import NuTheme from './decorators/theme';
import NuVars from './decorators/vars';
import NuAttrs from './decorators/attrs';
import NuProps from './decorators/props';
// helpers
import {
  injectScript,
  splitStates,
  convertCustomUnit,
  ROOT_CONTEXT,
  CUSTOM_UNITS,
  STATES_MAP,
  parseAllValues,
  setImmediate,
  extractMods,
  fixPosition,
  parseAttr,
  parseAttrStates,
  parseColor,
  setAttrs,
  normalizeAttrStates, isTouch,
} from './helpers';
import { enableFocus, disableFocus } from './focus';
import { applyTheme, BASE_THEME } from './themes';
import themeAttr from './attributes/theme';
import { cleanCSSByPart, generateCSS, injectCSS } from './css';

const IGNORE_KEYS = ['Alt', 'Control', 'Meta', 'Shift'];

window.addEventListener('mousedown', disableFocus);
window.addEventListener('touchstart', disableFocus, { passive: true });
window.addEventListener('keydown', (event) => {
  if (!IGNORE_KEYS.includes(event.key)) {
    enableFocus();
  }
});

setTimeout(() => {
  applyTheme(document.body, BASE_THEME, 'main');
});

const styles = themeAttr('main');

injectCSS('theme:base', 'body', generateCSS('body', [...styles, {
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
  helpers: {
    injectScript,
    splitStates,
    convertCustomUnit,
    parseAllValues,
    setImmediate,
    extractMods,
    fixPosition,
    parseAttr,
    parseAttrStates,
    parseColor,
    setAttrs,
    normalizeAttrStates,
  },
  themes: {
    applyTheme,
  },
  isTouch: isTouch,
  version: process.env.APP_VERSION,
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

  [...document.querySelectorAll('.nu-loading')]
    .forEach(el => el.style.display = 'none !important');

  setTimeout(() => {
    [...document.querySelectorAll('[nu-hidden]')]
      .forEach(el => el.removeAttribute('nu-hidden'));
  });

  cleanCSSByPart('attrs:all');
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

export default Nude;

export {
  STATES_MAP,
  CUSTOM_UNITS,
  ROOT_CONTEXT,
  NuElement,
  NuBase,
  NuGrid,
  NuBlock,
  NuHeading,
  NuBtn,
  NuTab,
  NuCard,
  NuIcon,
  NuLayout,
  NuLine,
  NuPane,
  NuGridTable,
  NuBadge,
  NuInput,
  NuSwitch,
  NuFlex,
  NuBtnGroup,
  NuTablist,
  NuMenu,
  NuMenuItem,
  NuLink,
  NuBlockLink,
  NuActiveElement,
  NuTriangle,
  NuTooltip,
  NuCell,
  NuColumnHeader,
  NuRowHeader,
  NuRow,
  NuRowGroup,
  NuTable,
  NuPopup,
  NuPopupMenu,
  NuGroup,
  NuCheckbox,
  NuRadioGroup,
  NuRadio,
  NuLabel,
  NuNumInput,
  NuMark,
  NuSpecial,
  NuSvg,
  NuImg,
  NuCode,
  NuClamp,
  NuProgressBar,
  NuRail,
  NuSlider,
  NuMarkdown,
  NuMd,
  NuList,
  NuListItem,
  NuRoot,
  NuAttrs,
  NuTheme,
  NuVars,
  NuProps,
  NuDecorator,
};
