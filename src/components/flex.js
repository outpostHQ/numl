import {
  FLEX_ATTRS,
  FLEX_ITEM_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  convertUnit,
} from '../helpers';
import Nude, { splitDimensions } from '../nude';
import { hasCSS, injectCSS, attrsQuery, stylesString } from '../css';
import NuComponent from './component';

const attrs = NuComponent.nuAttrs;

Object.assign(attrs, {
  ...FLEX_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...FLEX_ITEM_ATTRS,
  ...BLOCK_ATTRS,
});

class NuGrid extends NuComponent {
  static get nuTag() {
    return 'flex';
  }

  static get nuAttrs() {
    return attrs;
  }

  nuChanged(name, oldValue, value) {
    if (name === 'gap' || name === 'flow') {
      const flowAttr = this.getAttribute('flow');
      const gapAttr = this.getAttribute('gap');

      this.nuFlexFlow = flowAttr && flowAttr.startsWith('column') ? 'column' : 'row';

      if (flowAttr || gapAttr) {
        const query = this.nuGetQuery({ flow: flowAttr, gap: gapAttr});
        const gap = convertUnit(gapAttr) || '0rem';

        if (!hasCSS(query)) {
          injectCSS(query, query, `${query} > *{--nu-flex-gap:${gap}}`);
        }
      }
    } else if (name === 'basis') {
      const query = this.nuGetQuery({ basis: value });
      value = convertUnit(value);

      if (value && !hasCSS(query)) {
          injectCSS(query, query, `${query} > *{flex-basis:${value}}`);
        }
    }

    super.nuChanged(name, oldValue, value);
  }
}

export default NuGrid;
