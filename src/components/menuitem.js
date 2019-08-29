import NuAbstractBtn from './abstract-btn';

export default class NuMenuitem extends NuAbstractBtn {
  static get nuTag() {
    return 'nu-menuitem';
  }

  static get nuRole() {
    return 'menuitem';
  }

  static get nuDefaults() {
    return {
      background: 'transparent',
      width: '100%',
      content: 'center start',
      radius: 0,
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-focus-inset: inset 0 0;

        --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
        --nu-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }
      
      ${nuTag}:not([disabled])::after {
        content: "";
        position: absolute;
        display: block;
        pointer-events: none;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        transition: background-color var(--nu-theme-animation-time) linear;
        background-color: rgba(128, 128, 128, 0);
      }

      ${nuTag}:not([disabled])[tabindex]:hover::after {
        background-color: rgba(128, 128, 128, calc(var(--nu-theme-shadow-intensity) / 2));
      }

      ${nuTag}[nu-active][tabindex]:not([disabled]):not([nu-toggled]),
      ${nuTag}[nu-toggled]:not([disabled]):not([tabindex]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-intensity));
      }

      ${nuTag}[special] {
        background-color: var(--nu-theme-special-color) !important;
        color: var(--nu-theme-special-background-color) !important;
      }
    `;
  }
}
