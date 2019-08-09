import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../attrs';
import NuElement from './element';
import { inject } from '../css';

class NuGrid extends NuElement {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuLayout() {
    return 'grid';
  }

  static get nuDefaultFlow() {
    return 'row';
  }

  static nuInit() {
    super.nuInit();

    const tag = this.nuTag;
    const defaultFlow = this.nuDefaultFlow;
    const flows = ['row', 'column'];

    inject(`
      ${tag}{display:grid;}
      ${tag}[inline]{display:inline-grid;}
      ${flows.map((flow, i) => `
        ${tag}${flow === defaultFlow ? ':not([flow])' : `[flow="${flow}"]`}{grid-auto-flow: ${flow};}
      `).join('')}
    `, tag);
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      ...BLOCK_ATTRS
    });
  }
}

export default NuGrid;
