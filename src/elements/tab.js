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
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-stroke-color: transparent;
        --nu-hover-color: transparent !important;

        --nu-toggle-shadow: 0 calc(-1 * var(--nu-theme-border-width)) 0 0 var(--nu-toggle-color) inset;
        --nu-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }

      ${tag}[nu-active][tabindex]:not([disabled]):not([nu-toggled]),
      ${tag}[nu-toggled]:not([disabled]):not([tabindex]) {
        --nu-toggle-shadow: 0 calc(1em / 16 * -3) 0 0 var(--nu-toggle-color) inset;
        --nu-toggle-color: var(--nu-theme-special-color);
      }

      ${tag}[special] {
        color: var(--nu-theme-special-color) !important;
      }

      ${tag}:not([disabled])[tabindex]:hover {
        --nu-toggle-color: var(--nu-theme-special-color);
      }

      ${tag}[nu-active][tabindex]:not([disabled]):not([aria-pressed="true"]),
      ${tag}[aria-pressed="true"]:not([disabled]):not([nu-active]) {
        --nu-toggle-shadow: 0 calc(1em / 16 * -3) 0 0 var(--nu-toggle-color) inset;
        --nu-toggle-color: var(--nu-theme-special-color);
      }
    `;
  }
}
