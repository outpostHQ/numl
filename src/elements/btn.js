import NuAbstractBtn from './abstract-btn';

export default class NuBtn extends NuAbstractBtn {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuDefaults() {
    return {
      padding: '1x 2x',
      border: '1x',
      radius: '1x',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
      }

      ${nuTag}:not([disabled])[tabindex]:hover {
        --nu-hover-color: var(--nu-theme-hover-color);
      }

      ${nuTag}[disabled][aria-pressed="true"],
      ${nuTag}[nu-active]:not([disabled]):not([aria-pressed="true"]),
      ${nuTag}[aria-pressed="true"][role="radio"][nu-active]:not([disabled]),
      ${nuTag}[aria-pressed="true"]:not([disabled]):not([nu-active]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-opacity));
      }

      ${nuTag}[special]:not([background]) {
        --nu-theme-shadow-opacity: var(--nu-theme-special-shadow-opacity);
        --nu-theme-hover-color: var(--nu-theme-special-hover-color);
        --nu-theme-heading-color: var(--nu-theme-special-background-color);
        background-color: var(--nu-theme-special-color) !important;
        color: var(--nu-theme-special-background-color) !important;
      }
      
      ${nuTag}[special]:not([background]) > * {
        --nu-theme-border-color: var(--nu-theme-special-background-color);
        --nu-theme-hover-color: --nu-theme-special-hover-color;
      }

      ${nuTag}[cell] {
        align-self: stretch;
        justify-self: stretch;
        width: 100%;
        height: 100%;
      }
      
      ${nuTag}[cell]:not([radius]) {
        --nu-border-radius: 0;
      }
      
      ${nuTag}[cell]:not([border]) {
        border: none;
      }
    `;
  }
}
