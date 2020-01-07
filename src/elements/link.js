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

      ${tag}[tabindex]:not([tabindex="-1"]):not([disabled])::after {
        top: calc(-.5 * var(--nu-indent));
        right: calc(-.5 * var(--nu-indent));
        bottom: calc(-.5 * var(--nu-indent));
        left: calc(-.5 * var(--nu-indent));
        border-radius: var(--nu-border-radius);
      }

      ${focusable(tag)}
    `;
  }
}
