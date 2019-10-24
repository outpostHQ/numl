import focusable from '../mixins/focusable';
import NuActiveElement from './activeelement';

export default class NuLink extends NuActiveElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      color: 'special',
      text: 'nowrap u',
      cursor: 'pointer',
      radius: '.5x',
      background: 'transparent',
      transition: 'box-shadow',
      place: 'relative',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        font-weight: bolder;
      }
      
      ${nuTag}:not([disabled])[nu-active] {
        --nu-hover-color: var(--nu-theme-hover-color);
      }
      
      ${focusable(nuTag)}
    `;
  }
}
