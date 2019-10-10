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
      mod: 'nowrap',
      cursor: 'pointer',
      radius: '.5x',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        position: relative;
        transition: box-shadow var(--nu-theme-animation-time) linear;
        text-decoration: underline;
        font-weight: bolder;
        outline: none;
      }
      
      ${nuTag}:not([disabled])[nu-active] {
        --nu-hover-color: var(--nu-theme-hover-color);
      }
      
      ${focusable(nuTag)}
    `;
  }
}
