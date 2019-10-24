import NuBlock from './block';
import NuElement from './element';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuAttrs() {
    return {
      border: NuBlock.nuAttrs.border,
      radius: NuBlock.nuAttrs.radius,
      shadow: NuBlock.nuAttrs.shadow,
    };
  }

  static get nuDefaults() {
    return {
      color: 'background',
      background: 'text',
      padding: '0 .5em',
      radius: '1x',
      text: 'nowrap',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}[special]:not([background]) {
        background-color: var(--nu-theme-special-color) !important;
      }
      ${nuTag}[special]:not([color]) {
        color: var(--nu-theme-special-contrast-color) !important;
      }
    `;
  }
}
