import focusable from '../mixins/focusable';
import NuActiveElement from './activeelement';

export default class NuLink extends NuActiveElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuId() {
    return 'link';
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      color: 'special',
      text: 'nowrap u',
      cursor: 'pointer',
      radius: '.5x',
      transition: 'box-shadow',
      fill: null,
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        font-weight: bolder;
        position: relative;
      }
      
      ${tag}:not([disabled])[nu-active] {
        --nu-local-hover-color: var(--nu-hover-color);
      }
      
      ${focusable(tag)}
    `;
  }
}
