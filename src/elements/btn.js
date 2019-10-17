import NuActiveElement from './activeelement';

export default class NuBtn extends NuActiveElement {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      padding: '1x 2x',
      border: '1x',
      radius: '1x',
      flow: 'column',
      gap: '1x',
      content: 'center',
      background: '',
      mod: 'nowrap',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
        
        user-select: none;
      }

      ${nuTag}:not([disabled])[tabindex]:hover {
        --nu-hover-color: var(--nu-theme-hover-color);
      }

      ${nuTag}[disabled][nu-pressed],
      ${nuTag}[nu-active]:not([disabled]):not([nu-pressed]),
      ${nuTag}[nu-pressed]:not([disabled]):not([nu-active]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-opacity));
      }

      ${nuTag}[special] {
        --nu-theme-shadow-opacity: var(--nu-theme-special-shadow-opacity);
        --nu-theme-hover-color: var(--nu-theme-special-hover-color);
        --nu-theme-heading-color: var(--nu-theme-special-contrast-color);
      }
      
      ${nuTag}[special]:not([background]) {
        background-color: var(--nu-theme-special-color) !important;
      }
      
      ${nuTag}[special]:not([color]) {
        color: var(--nu-theme-special-contrast-color) !important;
      }
      
      ${nuTag}[special] > *:not([theme]):not([nu-popup]) {
        --nu-theme-border-color: var(--nu-theme-special-contrast-color);
      }
    `;
  }
}
