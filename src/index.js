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
import NuTriangle from './components/triangle';
// decorators
import NuDecorator from './decorators/decorator';
import NuTheme from './decorators/theme';
import NuMod from './decorators/mod';
import NuVar from './decorators/var';
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
  ROOT_CONTEXT,
  CUSTOM_UNITS,
  STATES_MAP,
  splitDimensions,
  parseAllValues,
  mixColors,
  setImmediate,
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
      root.classList.add('nu-focus-enabled');
    }

    enableTimerId = 0;
  }, 100);
}

function disableFocus() {
  if (disableTimerId) return;

  disableTimerId = setTimeout(() => {
    const root = document.querySelector(ROOT_CONTEXT);

    if (root) {
      root.classList.remove('nu-focus-enabled');
    }

    disableTimerId = 0;
  }, 100);
}

window.addEventListener('mousedown', disableFocus);
window.addEventListener('keydown', enableFocus);

const Nude = {
  tags: {},
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
    parseAllValues,
    mixColors,
    setImmediate,
  },
};

Nude.init = (...elements) => {
  elements.forEach(el => {
    // if tag is already registered then skip
    if (Nude.tags[el.nuTag]) return;

    el.nuInit();

    Nude.tags[el.nuTag] = el;
  });
};

Nude.getElementById = function(id) {
  return document.querySelector(`[nu-id="${id}"]`);
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
  NuScroll,
  NuSwitch,
  NuFlex,
  NuBtnGroup,
  NuTablist,
  NuMenu,
  NuMenuItem,
  NuLink,
  NuTheme,
  NuMod,
  NuVar,
  NuDecorator,
  NuAbstractBtn,
  NuTriangle,
};
