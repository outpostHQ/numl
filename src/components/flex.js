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
    return 'flex';
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

      this.nuFlexFlow = flowAttr && flowAttr.startsWith('column') ? 'column' : 'row';

      if (flowAttr || gapAttr) {
        const query = this.nuGetQuery({ flow: flowAttr, gap: gapAttr });
        const gap = convertUnit(gapAttr) || '0rem';

        if (!hasCSS(query)) {
          injectCSS(query, query, `${query} > *{--nu-flex-gap:${gap}}`);
        }
      }
    } else if (name === 'basis') {
      const query = this.nuGetQuery({ basis: value });
      value = convertUnit(convertUnit(value));

      if (value && !hasCSS(query)) {
        injectCSS(query, query, `${query} > *{flex-basis:${value}}`);
      }
    }

    super.nuChanged(name, oldValue, value);
  }
}

export default NuGrid;
