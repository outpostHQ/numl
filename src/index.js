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
import NuInput from './elements/input';
import NuScroll from './elements/scroll';
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
import NuLabel from './elements/label';
import NuNumber from './elements/number';
// decorators
import NuDecorator from './decorators/decorator';
import NuTheme from './decorators/theme';
import NuVar from './decorators/var';
import NuAttrs from './decorators/attrs';
// helpers
import {
  injectScript,
  splitStates,
  convertCustomUnit,
  excludeMod,
  ROOT_CONTEXT,
  CUSTOM_UNITS,
  STATES_MAP,
  splitDimensions,
  parseAllValues,
  setImmediate,
  extractMods,
} from './helpers';
import { enableFocus, disableFocus } from './focus';
import { applyTheme, BASE_THEME } from './themes';
import themeAttr from './attributes/theme';
import { generateCSS, injectCSS } from './css';

window.addEventListener('mousedown', disableFocus);
window.addEventListener('keydown', enableFocus);

applyTheme(document.body, BASE_THEME, 'main');

const styles = themeAttr('main');

injectCSS('theme:base', 'body', generateCSS('body', styles));

const Nude = {
  tags: {},
  helpers: {
    injectScript,
    splitStates,
    convertCustomUnit,
    splitDimensions,
    excludeMod,
    parseAllValues,
    setImmediate,
    extractMods,
  },
  version: process.env.APP_VERSION,
};

Nude.init = (...elements) => {
  elements.forEach(el => {
    el.nuInit();
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
  NuLabel,
  NuNumber,
  NuAttrs,
  NuTheme,
  NuVar,
  NuDecorator,
};
