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
      color: 'swap',
      fill: 'text',
      padding: '0 .5em',
      radius: '1x',
      text: 'nowrap',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}[theme]:not([color]) {
        color: var(--nu-theme-background-color) !important;
      }
      ${nuTag}[theme]:not([fill]) {
        background-color: var(--nu-theme-color) !important;
      }
      ${nuTag}[special]:not([fill]) {
        background-color: var(--nu-theme-special-color) !important;
      }
      ${nuTag}[special]:not([color]) {
        color: var(--nu-theme-special-contrast-color) !important;
      }
    `;
  }
}
