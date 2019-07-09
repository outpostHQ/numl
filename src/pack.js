import {
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
} from './index';

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
].forEach(customElement => {
  const tagName = `nu-${customElement.nuTag}`;

  customElements.define(tagName, customElement);

  {
    console.log('nude: custom element registered', `<${tagName}/>`);
  }
});
