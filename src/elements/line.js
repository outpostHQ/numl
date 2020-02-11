import NuBlock from './block';
import OrientMixin from '../mixins/orient';

export default class NuLine extends NuBlock {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuId() {
    return 'line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuMixins() {
    return {
      orient: OrientMixin({ aria: true }),
    };
  }

  static get nuDefaults() {
    return {
      place: 'stretch',
      orient: 'h',
      size: '1b',
      width: `min(1em)
        :orient-v[minmax(1fs, 1fs)]`,
      height: `min(1em)
        :orient-h[minmax(1fs, 1fs)]`,
      column: ':orient-h[1 / -1]',
      row: ':orient-v[1 / -1]',
      fill: 'var(--nu-local-border-color, var(--nu-border-color)) :special[special]',
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
