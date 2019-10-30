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

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag}[theme]:not([color]) {
        color: var(--nu-theme-background-color) !important;
      }
      ${tag}[theme]:not([fill]) {
        background-color: var(--nu-theme-color) !important;
      }
      ${tag}[special]:not([fill]) {
        background-color: var(--nu-theme-special-color) !important;
      }
      ${tag}[special]:not([color]) {
        color: var(--nu-theme-special-contrast-color) !important;
      }
    `;
  }
}
