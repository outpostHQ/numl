import NuAbstractBtn from './abstract-btn';

export default class NuBtn extends NuAbstractBtn {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuDefaults() {
    return {
      padding: '.5 1',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-border-color: var(--nu-theme-border-color);

        --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
        --nu-border-inset: inset 0 0;
        --nu-border-width: var(--nu-theme-border-width);
        --nu-border-shadow: var(--nu-border-inset) 0 var(--nu-border-width) var(--nu-border-color);
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
        border-radius: inherit;
      }

      ${nuTag}:not([disabled])[tabindex]:hover::after {
        background-color: rgba(128, 128, 128, .07);
      }

      ${nuTag}[nu-active]:not([disabled]):not([aria-pressed="true"]),
      ${nuTag}[aria-pressed="true"][role="radio"][nu-active]:not([disabled]),
      ${nuTag}[aria-pressed="true"]:not([disabled]):not([nu-active]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-intensity));
      }

      ${nuTag}[special] {
        --nu-theme-shadow-intensity: var(--nu-theme-special-shadow-intensity);
        background-color: var(--nu-theme-special-color) !important;
        color: var(--nu-theme-special-background-color) !important;
      }

      ${nuTag}[cell] {
        --nu-border-radius: 0;
        --nu-border-color: transparent;

        align-self: stretch;
        justify-self: stretch;
        width: 100% !important;
        height: 100% !important;
      }
    `;
  }
}
