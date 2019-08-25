import './global.css';
import css, { injectStyleTag, generateCSS, injectCSS } from './css';
import modifiers from './modifiers';
// elements
import NuElement from './components/element';
import NuGrid from './components/grid';
import NuBlock from './components/block';
import NuHeading from './components/heading';
import NuIcon from './components/icon';
import NuLine from './components/line';
import NuPane from './components/pane';
import NuCard from './components/card';
import NuLayout from './components/flow';
import NuBtn from './components/btn';
import NuTab from './components/tab';
import NuSwitch from './components/switch';
import NuGridTable from './components/grid-table';
import NuBadge from './components/badge';
import NuLink from './components/link';
import NuInput from './components/input';
import NuScroll from './components/scroll';
import NuFlex from './components/flex';
import NuBtnGroup from './components/btn-group';
import NuMenu from './components/menu';
import NuTablist from './components/tablist';
import NuAbstractBtn from './components/abstract-btn';
// decorators
import NuDecorator from './decorators/decorator';
import NdTheme from './decorators/theme';
import NdMod from './decorators/mod';
// helpers
import {
  log,
  injectScript,
  ROOT_CONTEXT,
  invertColor,
  hueRotate,
  extractColor,
  setAlphaChannel,
  generalizeColor,
  getLuminance,
  computeStyles,
  splitStates,
} from './helpers';

let featherPromise;

if (window.feather) {
  featherPromise = Promise.resolve();
}

let enableTimerId, disableTimerId;

function enableFocus() {
  if (enableTimerId) return;

  enableTimerId = setTimeout(() => {
    const root = document.querySelector(ROOT_CONTEXT);

    if (root) {
      root.dataset.nuFocusEnabled = '';
    }

    enableTimerId = 0;
  }, 100);
}

function disableFocus() {
  if (disableTimerId) return;

  disableTimerId = setTimeout(() => {
    const root = document.querySelector(ROOT_CONTEXT);

    if (root) {
      delete root.dataset.nuFocusEnabled;
    }

    disableTimerId = 0;
  }, 100);
}

window.addEventListener('mousedown', disableFocus);
window.addEventListener('keydown', enableFocus);

const Nude = {
  modifiers,
  css,
  iconLoader(name) {
    return (
      featherPromise ||
      injectScript('https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.22.1/feather.js')
    ).then(() => window.feather.icons[name].toSvg());
  },
  helpers: {
    invertColor,
    hueRotate,
    injectScript,
    extractColor,
    setAlphaChannel,
    generalizeColor,
    getLuminance,
    splitStates,
  },
};

Nude.elements = {
  NuGridTable,
  NuPane,
  NuLine,
  NuLayout,
  NuIcon,
  NuCard,
  NuBtn,
  NuTab,
  NuBlock,
  NuHeading,
  NuGrid,
  NuBadge,
  NuInput,
  NuScroll,
  NuSwitch,
  NuFlex,
  NuBtnGroup,
  NuTablist,
  NuMenu,
  NuLink,
  NdTheme,
  NdMod,
  NuAbstractBtn
};

Object.values(Nude.elements).forEach(customElement => {
  customElement.nuInit = function() {
    const tag = this.nuTag;

    if (!this.nuTag) return;

    let el = this,
      css = '';

    do {
      if (!el.nuCSS) break;
      if (el.nuCSS === (el.nuParent && el.nuParent.nuCSS)) continue;

      css = `${el.nuCSS(this)}${css}`;
    } while ((el = el.nuParent));

    const allAttrs = customElement.nuAllAttrs;
    const allDefaults = customElement.nuAllDefaults;

    let defaultsCSS = '';

    Object.keys(allDefaults)
      .forEach(name => {
        const value = allDefaults[name];

        if (value == null) return;

        const styles = computeStyles(name, String(value), allAttrs);

        if (!styles) return;

        const query = name === 'mod' ? tag : `${tag}:not([${name}="${value}"])`;

        defaultsCSS += generateCSS(query, styles);
      });

    injectStyleTag(`${css}${defaultsCSS}`, tag);

    customElements.define(tag, this);

    log('custom element registered', tag);
  };
});

Nude.init = () => {
  Object.values(Nude.elements).forEach(el => el.nuInit());
};

window.Nude = Nude;

export default Nude;

export {
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
  NuScroll,
  NuSwitch,
  NuFlex,
  NuBtnGroup,
  NuTablist,
  NuMenu,
  NuLink,
  NdTheme,
  NdMod,
  NuElement,
  NuDecorator,
  NuAbstractBtn
};
