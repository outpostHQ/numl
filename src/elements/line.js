import NuBlock from './block';
import combinedAttr from '../attributes/combined';
import sizeAttr from '../attributes/size';

export default class NuLine extends NuBlock {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuBehaviors() {
    return {
      orient: true,
    };
  }

  static get nuGenerators() {
    return {
      orient(val) {
        const vertical = val === 'v';

        val = vertical ? 'v' : 'h';

        return combinedAttr({
          width: vertical ? '1fs 1fs' : 'min 1em',
          height: vertical ? 'min 1em' : '1fs 1fs',
        }, NuLine);
      },
      size(val) {
        return sizeAttr(val, {}, true);
      },
    };
  }

  static get nuStyles() {
    return {
      place: 'stretch',
      orient: 'h',
      size: '1bw',
      fill: 'var(--nu-local-border-color, var(--nu-border-color)) :special[special]',
      text: 'v-middle',
      box: 'y',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        line-height: 0 !important;
      }`,
    ];
  }
}
