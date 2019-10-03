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
      background: 'text',
      padding: '0 .5em',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-radius: .5rem;
        --nu-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        --nu-stroke-shadow: 0 0 0 0 var(--nu-theme-border-color), inset 0 0 0 0 var(--nu-theme-border-color);

        box-shadow: var(--nu-stroke-shadow), var(--nu-depth-shadow);
        border-radius: var(--nu-border-radius);
        white-space: nowrap;
      }
      ${nuTag}:not([color]) {
        color: var(--nu-theme-background-color) !important;
      }
      ${nuTag}[special]:not([background]) {
        background-color: var(--nu-theme-special-color) !important;
      }
      ${nuTag}[special]:not([color]) {
        color: var(--nu-theme-special-background-color) !important;
      }
    `;
  }
}
