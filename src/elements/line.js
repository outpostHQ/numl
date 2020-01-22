import NuBlock from './block';
import OrientMixin from '../mixins/orient';

export default class NuLine extends NuBlock {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuMixins() {
    return [OrientMixin({ aria: true })];
  }

  static get nuDefaults() {
    return {
      place: 'stretch',
      orient: 'x',
      size: '1b',
      width: `min(1em)
        :orient-y[minmax(1fs, 1fs)]`,
      height: `min(1em)
        :orient-x[minmax(1fs, 1fs)]`,
      column: ':orient-x[1 / -1]',
      row: ':orient-y[1 / -1]',
      fill: 'border :special[special]',
      text: 'v-middle',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        line-height: 0 !important;
      }
    `;
  }
}
