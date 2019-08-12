import { unit } from '../helpers';
import NuGrid from './grid';

class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-grid-table';
  }

  static get nuRole() {
    return 'grid';
  }

  static get nuAttrs() {
    return {
      padding: unit('padding', '>*'),
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        display: grid;
        grid-gap: var(--nu-theme-border-width);
        background-color: var(--nu-theme-border-color) !important;
        color: var(--nu-theme-color, #333);
        overflow: auto;
        max-width: 100%;
      }

      ${nuTag} > *:not([theme]):not([color]) {
        color: var(--nu-theme-color);
      }

      ${nuTag} > *:not([theme]):not([background]) {
        background-color: var(--nu-theme-background-color);
      }
    `;
  }

  nuMounted() {
    super.nuMounted();
  }
}

export default NuGridTable;
