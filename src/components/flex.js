import {
  convertUnit,
} from '../helpers';
import {
  FLEX_ATTRS,
  FLEX_ITEM_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../attrs';
import { hasCSS, injectCSS } from '../css';
import NuElement from './element';

class NuGrid extends NuElement {
  static get nuTag() {
    return 'nu-flex';
  }

  static get nuLayout() {
    return 'flex';
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

  nuChanged(name, oldValue, value) {
    if (name === 'gap' || name === 'flow') {
      const flowAttr = this.getAttribute('flow');
      const gapAttr = this.getAttribute('gap');

      if (flowAttr || gapAttr) {
        const query = this.nuGetQuery({ flow: flowAttr, gap: gapAttr });
        const gap = convertUnit(gapAttr) || '0rem';

        if (!hasCSS(query)) {
          injectCSS(query, query, `${query} > *{--nu-flex-gap:${gap}}`);
        }
      }
    }

    super.nuChanged(name, oldValue, value);
  }
}

export default NuGrid;
