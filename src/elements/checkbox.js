import NuActiveElement from './activeelement';
import { enableFocus } from '../focus';

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
      border: '1x',
      radius: '.5x',
      content: 'stretch',
      items: 'center',
      padding: '0',
      sizing: 'content',
      fill: '',
      cursor: 'default',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-border-color: var(--nu-focus-color);
        --nu-local-toggle-color: transparent;
        --nu-local-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
      }

      ${tag}:not([disabled])[tabindex]:hover {
        --nu-local-hover-color: var(--nu-hover-color);
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
            enableFocus();
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
