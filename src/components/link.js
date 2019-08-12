import NuElement from './element';
import NuBtn from './btn';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}, [data-nu-root] a {
        position: relative;
        display: inline-block;
        color: inherit;
        white-space: nowrap;
        transition: box-shadow var(--nu-theme-animation-time) linear;
        text-decoration: underline;
        font-weight: bolder;
        cursor: pointer;
        box-shadow: inset 0 -0.1875em transparent;
      }

      ${nuTag}:hover, [data-nu-root] a:hover {
        z-index: 1;
        text-decoration-style: double;
      }

      ${nuTag}:focus, [data-nu-root] a:focus {
        outline: none;
        z-index: 1;
        box-shadow: inset 0 -0.1875em var(--nu-theme-special-background-color);
      }

      ${nuTag}::before, [data-nu-root] a::before {
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

      ${nuTag}:focus::before, [data-nu-root] a:focus::before {
        box-shadow: inset 0 -0.1875em var(--nu-theme-special-color);
        opacity: .5;
      }

      ${nuTag}[special], [data-nu-root] a[data-nu-special] {
        color: var(--nu-theme-special-color);
      }
    `;
  }

  nuTap() {
    NuBtn.prototype.nuTap.call(this);
  }

  nuMounted() {
    super.nuMounted();

    this.setAttribute('tabindex', '0');

    this.addEventListener('click', () => {
      this.nuTap();
    });
  }
}
