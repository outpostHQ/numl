import './global.css';
import css from './css';
import modifiers from './modifiers';
// elements
import NuBase from './base';
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
import NuMenuItem from './components/menuitem';
import NuTablist from './components/tablist';
import NuAbstractBtn from './components/abstract-btn';
// decorators
import NuDecorator from './decorators/decorator';
import NdTheme from './decorators/theme';
import NdMod from './decorators/mod';
import NdVar from './decorators/var';
// helpers
import {
  injectScript,
  invertColor,
  hueRotate,
  extractColor,
  setAlphaChannel,
  generalizeColor,
  getLuminance,
  splitStates,
  convertCustomUnit,
  excludeMod,
  COLORS,
  ROOT_CONTEXT,
  CUSTOM_UNITS,
  STATES_MAP,
  splitDimensions,
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
    convertCustomUnit,
    splitDimensions,
    excludeMod,
  },
};

Nude.elements = {
  NuBase,
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
  NuMenuItem,
  NuLink,
  NdTheme,
  NdMod,
  NdVar,
  NuAbstractBtn
};

Nude.init = (...elements) => {
  Object.values(elements.length ? elements : Nude.elements).forEach(el => {
    el.nuInit();
  });
};

Nude.getElementById = function(id) {
  return document.querySelector(`[nu-id="${id}"]`);
};

window.Nude = Nude;

export default Nude;

export const HTML_COLORS = COLORS;

export {
  STATES_MAP,
  CUSTOM_UNITS,
  ROOT_CONTEXT,
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
  NuMenuItem,
  NuLink,
  NdTheme,
  NdMod,
  NdVar,
  NuElement,
  NuDecorator,
  NuAbstractBtn
};
