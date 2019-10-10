import { unit } from '../helpers';
import NuGrid from './grid';

export default class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-grid-table';
  }

  static get nuRole() {
    return 'grid';
  }

  static get nuAttrs() {
    return {
      padding: unit('padding', {
        suffix: '>*:not([padding]):not(nu-line)',
        convert: true,
      }),
    };
  }

  static get nuDefaults() {
    return {
      gap: 'var(--nu-theme-border-width)',
      background: 'var(--nu-theme-border-color)',
      color: 'var(--nu-theme-color)',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        overflow: auto;
      }
      ${nuTag}:not([gap]) {
        grid-gap: var(--nu-theme-border-width);
      }
      ${nuTag} > :not([background]) {
        background-color: var(--nu-theme-background-color);
      }
      ${nuTag}:not([padding]) > *:not([padding]):not(nu-line) {
        padding: .5rem;
      }
      ${nuTag} > * {
        position: relative;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();
  }
}

