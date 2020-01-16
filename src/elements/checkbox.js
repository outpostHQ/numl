import NuActiveElement from './activeelement';

export default class NuCheckbox extends NuActiveElement {
  static get nuTag() {
    return 'nu-checkbox';
  }

  static get nuRole() {
    return 'checkbox';
  }

  static get nuId() {
    return 'checkbox';
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      width: '1em',
      height: '1em',
      border: '1b',
      radius: '.5x',
      content: 'stretch',
      items: 'center',
      padding: '0',
      sizing: 'content',
      fill: '',
      cursor: 'default',
      text: 'v-middle',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-border-color: var(--nu-text-color);
        --nu-local-toggle-color: transparent;
        --nu-local-toggle-shadow: 0 0 .75em 0 var(--nu-local-toggle-color) inset;
      }

      ${tag}[disabled] {
        --nu-border-color: rgba(var(--nu-text-color-rgb), .33);
      }

      ${tag}[nu-active]:not([disabled]):not([nu-pressed]),
      ${tag}[nu-active][nu-pressed]:not([disabled]) {
        --nu-local-toggle-color: rgba(0, 0, 0, var(--nu-intensity));
      }

      ${tag}[tabindex]:not([tabindex="-1"]):not([disabled])::after {
        top: calc(-1 * var(--nu-indent));
        right: calc(-1 * var(--nu-indent));
        bottom: calc(-1 * var(--nu-indent));
        left: calc(-1 * var(--nu-indent));
        border-radius: var(--nu-border-radius);
      }
    `;
  }

  nuConnected() {
    super.nuConnected();

    const labelledBy = this.getAttribute('labelledby');

    if (labelledBy) {
      setTimeout(() => {
        const el = this.nuInvertQueryById(labelledBy);

        if (el) {
          const cb = () => {
            this.nuTap();
            this.focus();
          };

          el.addEventListener('click', cb);

          this.nuSetDisconnectedHook(() => {
            el.removeEventListener('click', cb);
          });
        }
      }, 0);
    }

    if (this.querySelector('nu-icon')) return;

    const icon = document.createElement('nu-icon');

    icon.setAttribute('name', 'check');
    icon.setAttribute('opacity', '0 ^:pressed[1]');
    icon.setAttribute('transition', 'opacity');

    this.appendChild(icon);
  }
}
