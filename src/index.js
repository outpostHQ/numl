import './global.css';
import css from './css';
import modifiers from './modifiers';
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
import NuGridTable from './elements/grid-table';
import NuBadge from './elements/badge';
import NuLink from './elements/link';
import NuInput from './elements/input';
import NuScroll from './elements/scroll';
import NuFlex from './elements/flex';
import NuBtnGroup from './elements/btn-group';
import NuMenu from './elements/menu';
import NuMenuItem from './elements/menuitem';
import NuTablist from './elements/tablist';
import NuAbstractBtn from './elements/abstract-btn';
import NuTriangle from './elements/triangle';
import NuTooltip from './elements/tooltip';
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
  version: process.env.APP_VERSION,
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

Nude.getElementsById = function(id) {
  return document.querySelectorAll(`[nu-id="${id}"]`);
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
  NuTooltip,
};
