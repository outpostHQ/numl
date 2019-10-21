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
        multiplier: 'var(--nu-theme-border-width)',
        empty: 'var(--nu-theme-border-radius)',
      }),
      background: null,
    };
  }

  static get nuDefaults() {
    return {
      place: 'stretch',
      orient: 'x',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-line-size: var(--nu-theme-border-width);

        position: relative;
        line-height: 0;
        background-color: currentColor !important;
        color: var(--nu-theme-border-color);
      }

      ${nuTag}[special]:not([color]) {
        color: var(--nu-theme-special-color);
      }
    `;
  }
}
