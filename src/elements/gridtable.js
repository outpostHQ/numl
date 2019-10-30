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
      gap: '1bw',
      fill: 'border',
      color: '',
      overflow: 'auto',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} > :not([fill]) {
        background-color: var(--nu-theme-background-color);
      }
      ${tag}:not([padding]) > *:not([padding]):not(nu-line) {
        padding: .5rem;
      }
      ${tag} > *:not([place]) {
        position: relative;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();
  }
}

