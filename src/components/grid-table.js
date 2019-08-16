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
      padding: unit('padding', '>*:not([padding])'),
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        background-color: var(--nu-theme-border-color) !important;
        color: var(--nu-theme-color, #333);
        overflow: auto;
      }
      ${nuTag}:not([gap]) {
        grid-gap: var(--nu-theme-border-width);
      }
      ${nuTag} > *:not([theme]):not([color]) {
        color: var(--nu-theme-color);
      }
      ${nuTag} > *:not([theme]):not([background]) {
        background-color: var(--nu-theme-background-color);
      }
      ${nuTag}:not([padding]) > * {
        padding: .5rem;
      }
      ${nuTag} > * {
        position: relative;
      }
    `;
  }

  nuMounted() {
    super.nuMounted();
  }
}

