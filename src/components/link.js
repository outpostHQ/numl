import NuElement from './element';
import NuBtn from './btn';
import { ROOT_CONTEXT, bindActiveEvents } from '../helpers';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuDisplay() {
    return 'inline-block';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuDefaults() {
    return {
      color: 'inherit',
      mod: 'nowrap',
      cursor: 'pointer',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        position: relative;
        transition: box-shadow var(--nu-theme-animation-time) linear;
        text-decoration: underline;
        font-weight: bolder;
        box-shadow: inset 0 -0.1875em transparent;
        outline: none;
      }

      ${nuTag}:hover {
        z-index: 1;
        text-decoration-style: double;
      }

      ${ROOT_CONTEXT}[data-nu-focus-enabled] ${nuTag}:focus,
      ${nuTag}:active {
        z-index: 1;
        box-shadow: inset 0 -0.1875em var(--nu-theme-special-background-color);
      }

      ${nuTag}::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        pointer-events: none;
        transition: opacity var(--nu-theme-animation-time) linear;
        box-shadow: inset 0 -0.1875em var(--nu-theme-special-color);
        opacity: 0;
      }

      ${ROOT_CONTEXT}[data-nu-focus-enabled] ${nuTag}:focus::before,
      ${nuTag}:active::before {
        box-shadow: inset 0 -0.1875em var(--nu-theme-special-color);
        opacity: .5;
      }

      ${nuTag}[special] {
        color: var(--nu-theme-special-color) !important;
      }
    `;
  }

  nuTap() {
    NuBtn.prototype.nuTap.call(this);

    const href = this.getAttribute('href');

    if (!href) return;

    const target = this.getAttribute('target');
    const link = document.createElement('a');

    link.href = href;

    if (target) {
      link.target = target;
    }

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  nuMounted() {
    super.nuMounted();

    this.setAttribute('tabindex', '0');

    bindActiveEvents.call(this);
  }
}
