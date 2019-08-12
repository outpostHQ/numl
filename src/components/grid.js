import {
  PLACE_ATTRS,
} from '../attrs';
import { unit } from '../helpers';
import NuElement from './element';

class NuGrid extends NuElement {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuDisplay() {
    return 'grid';
  }

  static get nuDefaultFlow() {
    return 'row';
  }

  static nuCSS({ nuTag }) {
    const defaultFlow = this.nuDefaultFlow;
    const flows = ['row', 'column'];

    return `
      ${nuTag}{display:grid;}
      ${nuTag}[inline]{display:inline-grid;}
      ${flows.map((flow, i) => `
        ${nuTag}${flow === defaultFlow ? ':not([flow])' : `[flow="${flow}"]`}{grid-auto-flow: ${flow};}
      `).join('')}
    `;
  }

  static get nuAttrs() {
    return {
      ...PLACE_ATTRS,
      'template-areas': 'grid-template-areas',
      areas: 'grid-template-areas',
      'auto-flow': 'grid-auto-flow',
      flow: 'grid-auto-flow',
      'template-columns': unit('grid-template-columns'),
      'template-rows': unit('grid-template-rows'),
      cols: unit('grid-template-columns'),
      rows: unit('grid-template-rows'),
      gap: unit('grid-gap'),
    };
  }
}

export default NuGrid;
