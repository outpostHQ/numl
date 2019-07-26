import './components/elements.css';
import Nude from './nude';
import NuResponsive from './components/responsive';
import NuGrid from './components/grid';
import NuBlock from './components/block';
import NuIcon from './components/icon/icon';
import NuSeparator from './components/separator/separator';
import NuPane from './components/pane';
import NuCard from './components/card/card';
import NuLayout from './components/layout';
import NuBtn from './components/btn/btn';
import NuToggle from './components/btn/toggle';
import NuTable from './components/table/table';
import NuCell from './components/table/cell';
import NuGridCell from './components/table/grid-cell';
import NuBadge from './components/badge/badge';
import NuLink from './components/link/link';
import NuInput from './components/form/input';
import NuScroll from './components/scroll/scroll';
import NuFlex from './components/flex';
import NuBtnGroup from './components/btn/btn-group';
import { log } from './helpers';

export default Nude;

Nude.init = () => {
  [
    NuGridCell,
    NuCell,
    NuTable,
    NuPane,
    NuSeparator,
    NuLayout,
    NuIcon,
    NuCard,
    NuBtn,
    NuBlock,
    NuGrid,
    NuResponsive,
    NuBadge,
    NuInput,
    NuScroll,
    NuToggle,
    NuFlex,
    NuBtnGroup,
    NuLink,
  ].forEach(customElement => {
    const tagName = `nu-${customElement.nuTag}`;

    customElements.define(tagName, customElement);

    log('custom element registered', `<${tagName}/>`);
  });
};

export {
  NuResponsive,
  NuGrid,
  NuBlock,
  NuBtn,
  NuCard,
  NuIcon,
  NuLayout,
  NuSeparator,
  NuPane,
  NuTable,
  NuCell,
  NuGridCell,
  NuBadge,
  NuInput,
  NuScroll,
  NuToggle,
  NuFlex,
  NuBtnGroup,
  NuLink,
};
