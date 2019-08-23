import NuAbstractBtn from './abstract-btn';
import focusable from '../mixins/focusable';

export default class NuMenuitem extends NuAbstractBtn {
  static get nuTag() {
    return 'nu-menuitem';
  }

  static get nuRole() {
    return 'menuitem';
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-border-radius: 0;
        --nu-border-color: transparent;

        --nu-toggle-shadow: 0 calc(-1 * var(--nu-theme-border-width)) 0 0 var(--nu-toggle-color) inset;
        --nu-border-inset: inset 0 0;
        --nu-border-width: 0;
        --nu-border-shadow: var(--nu-border-inset) 0 var(--nu-border-width) var(--nu-border-color);
        --nu-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);

        padding: .5rem;
        background-color: transparent;
        width: 100%;
      }

      ${nuTag}:not([disabled])[tabindex]:hover::after {
        background-color: rgba(128, 128, 128, .07);
      }

      ${nuTag}[nu-active][tabindex]:not([disabled]):not([nu-toggled]),
      ${nuTag}[nu-toggled]:not([disabled]):not([tabindex]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-intensity));
      }

      ${nuTag}[special] {
        background-color: var(--nu-theme-special-color);
        color: var(--nu-theme-special-background-color);
      }
    `;
  }
}
