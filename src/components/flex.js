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

const ITEMS_ATTRS = ['items-basis', 'items-grow', 'items-shrink'];

class NuGrid extends NuElement {
  static get nuTag() {
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
    } else if (ITEMS_ATTRS.includes(name)) {
      const query = this.nuGetQuery({ [name]: value });

      if (value === 'basis') {
        value = convertUnit(convertUnit(value));
      }

      if (value && !hasCSS(query)) {
        const styleName = `flex-${name.split('-')[1]}`;

        injectCSS(query, query, `${query} > *{${styleName}:${value}}`);
      }
    }

    super.nuChanged(name, oldValue, value);
  }
}

export default NuGrid;
