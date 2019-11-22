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
      fill: 'bg',
      text: 'nowrap',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-local-toggle-color: transparent;
        --nu-local-toggle-shadow: 0 0 .75em 0 var(--nu-local-toggle-color) inset;
      }

      ${tag}:not([disabled])[tabindex]:hover {
        --nu-local-hover-color: var(--nu-hover-color);
      }

      ${tag}[disabled][nu-pressed],
      ${tag}[nu-active]:not([disabled]):not([nu-pressed]),
      ${tag}[nu-active][nu-pressed]:not([disabled]),
      ${tag}[nu-pressed]:not([disabled]):not([nu-active]) {
        --nu-local-toggle-color: rgba(0, 0, 0, var(--nu-intensity));
      }
      
      ${tag}[special]:not([theme]):not([color]) {
        color: var(--nu-special-text-color);
      }
      
      ${tag}[special]:not([theme]):not([fill]) {
        --nu-intensity: var(--nu-special-intensity);
      
        background-color: var(--nu-special-bg-color);
      }
    `;
  }
}
