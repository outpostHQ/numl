import NuBlock from './block';
import NuElement from './element';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuAttrs() {
    return {
      radius: NuBlock.nuAttrs.radius,
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        display: inline-block !important;
        padding: 0 .5em;
        border-radius: var(--border-radius, .5rem);
        color: var(--nu-theme-background-color) !important;
        background-color: var(--nu-theme-color) !important;
      }
    `;
  }
}
