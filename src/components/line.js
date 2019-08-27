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
      orientation: '',
      size: unit('--nu-line-size'),
      color: '--nu-line-color',
    };
  }

  static get nuAttrs() {
    return {
      place: 'stretch',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-line-size: var(--nu-theme-border-width);

        position: relative;
        line-height: 0;
        background-color: var(--nu-line-color) !important;
      }

      ${nuTag}:not([color]):not([special]) {
        --nu-line-color: var(--nu-theme-border-color);
      }

      ${nuTag}:not([orientation="vertical"]) {
        min-height: var(--nu-line-size);
        max-height: var(--nu-line-size);
        min-width: 100%;
        max-width: 100%;
        grid-column: 1 / -1;
      }

      ${nuTag}[orientation="vertical"] {
        min-width: var(--nu-line-size);
        max-width: var(--nu-line-size);
        min-height: 100%;
        max-height: 100%;
        grid-row: 1 / -1;
      }

      ${nuTag}[special]:not([color]) {
        --nu-line-color: var(--nu-theme-special-color);
      }
    `;
  }

  constructor() {
    super();
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'orientation') {
      this.nuSetMod('vertical', value === 'vertical');
      this.nuSetAria('orientation', value === 'vertical' ? 'vertical' : null);
    }
  }
}
