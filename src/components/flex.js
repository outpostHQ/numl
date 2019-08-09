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
      ${flows.map((flow, i) => `
        ${flow === defaultFlow ? `${tag}:not([flow]){flex-flow: ${flow} nowrap;}` : ''}
        ${tag}[flow="${flow}"]{flex-flow: ${flow} nowrap;}
        ${tag}[flow="${flow}"] > *:not(:last-child){margin-${directions[i]}: var(--nu-flex-gap);}
      `).join('')}
    `, tag);
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

export default NuFlex;
