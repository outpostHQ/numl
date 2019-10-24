import { unit } from '../helpers';
import NuGrid from './grid';

export default class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-gridtable';
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
      overflow: 'auto',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} > :not([background]) {
        background-color: var(--nu-theme-background-color);
      }
      ${nuTag}:not([padding]) > *:not([padding]):not(nu-line) {
        padding: .5rem;
      }
      ${nuTag} > *:not([place]) {
        position: relative;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();
  }
}

