import NuActiveElement from './activeelement';
import { setAttrs } from '../helpers';

const ICON_ATTRS = {
  name: 'check',
  opacity: '0 ^:pressed[1]',
  transition: 'opacity',
  color: 'special ^:disabled[text]',
};

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
      fill: 'bg',
      cursor: 'default',
      text: 'v-middle',
      toggle: 'n :active[y] :pressed[y]',
      hoverable: '.5em 1x',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-border-color: var(--nu-text-color);
      }

      ${tag}[disabled] {
        --nu-border-color: rgba(var(--nu-text-color-rgb), .33);
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

    setAttrs(icon, ICON_ATTRS);

    this.appendChild(icon);
  }
}
