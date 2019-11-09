import NuActiveElement from './activeelement';
import focusable from '../mixins/focusable';

export default class NuTab extends NuActiveElement {
  static get nuTag() {
    return 'nu-tab';
  }

  static get nuRole() {
    return 'tab';
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      padding: '1x 0',
      fill: 'transparent',
      radius: '0',
      flow: 'column',
      gap: '1x',
      items: 'center',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-local-toggle-color: transparent;
        --nu-local-depth-color: transparent;
        --nu-local-stroke-color: transparent;
        --nu-local-hover-color: transparent !important;

        --nu-local-toggle-shadow: 0 calc(-1 * var(--nu-border-width)) 0 0 var(--nu-local-toggle-color) inset;
        --nu-local-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }

      ${tag}[nu-active][tabindex]:not([disabled]):not([nu-toggled]),
      ${tag}[nu-toggled]:not([disabled]):not([tabindex]) {
        --nu-local-toggle-shadow: 0 calc(1em / 16 * -3) 0 0 var(--nu-local-toggle-color) inset;
        --nu-local-toggle-color: var(--nu-special-color);
      }

      ${tag}[special] {
        color: var(--nu-special-color) !important;
      }

      ${tag}:not([disabled])[tabindex]:hover {
        --nu-local-toggle-color: var(--nu-special-color);
      }

      ${tag}[nu-active][tabindex]:not([disabled]):not([aria-pressed="true"]),
      ${tag}[aria-pressed="true"]:not([disabled]):not([nu-active]) {
        --nu-local-toggle-shadow: 0 calc(1em / 16 * -3) 0 0 var(--nu-local-toggle-color) inset;
        --nu-local-toggle-color: var(--nu-special-color);
      }
    `;
  }
}
