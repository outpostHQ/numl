import { unit } from '../helpers';
import NuBlock from './block';

export default class NuLine extends NuBlock {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuAttrs() {
    return {
      orient(val) {
        if (val === 'y') {
          return {
            'min-width': 'var(--nu-line-size)',
            'max-width': 'var(--nu-line-size)',
            'min-height': '1em',
            'grid-row': '1 / -1',
          };
        } else {
          return {
            'min-height': 'var(--nu-line-size)',
            'max-height': 'var(--nu-line-size)',
            'grid-column': '1 / -1',
          };
        }
      },
      size: unit('--nu-line-size', {
        convert: true,
        multiplier: 'var(--nu-border-width)',
        empty: 'var(--nu-border-radius)',
      }),
      fill: null,
    };
  }

  static get nuDefaults() {
    return {
      place: 'stretch',
      orient: 'x',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-line-size: var(--nu-border-width);

        position: relative;
        line-height: 0;
        background-color: currentColor !important;
        color: var(--nu-border-color);
      }

      ${tag}[special]:not([color]) {
        color: var(--nu-special-text-color);
      }
    `;
  }
}
