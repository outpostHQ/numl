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
      fill: '',
      text: 'nowrap',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-toggle-color: transparent;
        --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
      }

      ${tag}:not([disabled])[tabindex]:hover {
        --nu-hover-color: var(--nu-theme-hover-color);
      }

      ${tag}[disabled][nu-pressed],
      ${tag}[nu-active]:not([disabled]):not([nu-pressed]),
      ${tag}[nu-active][nu-pressed]:not([disabled]),
      ${tag}[nu-pressed]:not([disabled]):not([nu-active]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-shadow-opacity));
      }

      ${tag}[special] {
        --nu-theme-shadow-opacity: var(--nu-theme-special-shadow-opacity);
        --nu-theme-hover-color: var(--nu-theme-special-hover-color);
        --nu-theme-heading-color: var(--nu-theme-special-contrast-color);
      }
      
      ${tag}[special]:not([fill]) {
        background-color: var(--nu-theme-special-color) !important;
      }
      
      ${tag}[special]:not([color]) {
        color: var(--nu-theme-special-contrast-color) !important;
      }
      
      ${tag}[special] > *:not([theme]):not([nu-popup]) {
        --nu-theme-border-color: var(--nu-theme-special-contrast-color);
      }
    `;
  }
}
