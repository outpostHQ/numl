import NuBlock from './block';
import OrientMixin from '../mixins/orient';
import combinedAttr from '../attributes/combined';

export default class NuLine extends NuBlock {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuMixins() {
    return {
      orient: OrientMixin({ aria: true }),
    };
  }

  static get nuAttrs() {
    return {
      orient(val) {
        const vertical = val === 'v';

        val = vertical ? 'v' : 'h';

        return combinedAttr({
          width: vertical ? 'minmax(1fs, 1fs)' : 'min(1em)',
          height: vertical ? 'min(1em)' : 'minmax(1fs, 1fs)',
        }, NuLine);
      },
    };
  }

  static get nuDefaults() {
    return {
      place: 'stretch',
      orient: 'h',
      size: '1b',
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
