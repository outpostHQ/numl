import {
  convertUnit,
} from '../helpers';
import {
  FLEX_ATTRS,
  FLEX_ITEM_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../attrs';
import { hasCSS, injectCSS, inject } from '../css';
import NuElement from './element';

class NuFlex extends NuElement {
  static get nuTag() {
    return 'nu-flex';
  }

  static get nuLayout() {
    return 'flex';
  }

  static get nuDefaultFlow() {
    return 'row';
  }

  static get nuDefaultAttrs() {
    return {
      flow: 'row',
    };
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...FLEX_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      ...BLOCK_ATTRS,
    });
  }

  static nuInit() {
    super.nuInit();

    const tag = this.nuTag;
    const defaultFlow = this.nuDefaultFlow;
    const flows = ['row', 'column', 'row-reverse', 'column-reverse'];
    const directions = ['right', 'bottom', 'left', 'top'];

    inject(`
      ${tag}{display:flex;}
      ${tag}[inline]{display:inline-flex;}
      ${tag}:not([flow]){flex-flow: ${defaultFlow} nowrap;}
      ${tag}>*{flex-grow:1;}
    `);
  }

  nuGenerate(name, value) {
    let styles = super.nuGenerate(name, value) || [];

    return styles;
  }
}

export default NuFlex;
