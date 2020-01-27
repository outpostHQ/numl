import NuActiveElement from './activeelement';
import { setAttrs } from '../helpers';

const CIRCLE_ATTRS = {
  radius: 'round',
  fill: '^ bg :pressed[special-bg] :disabled:pressed[text 50%]',
  width: '1em',
  height: '1em',
  transition: 'fill',
};

export default class NuRadio extends NuActiveElement {
  static get nuTag() {
    return 'nu-radio';
  }

  static get nuRole() {
    return 'radio';
  }

  static get nuId() {
    return 'radio';
  }

  static get nuAttrs() {
    return {
      fill: null,
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      width: '1em',
      height: '1em',
      border: '1b color(text) :disabled[1b color(text 50%)]',
      radius: 'round',
      content: 'stretch',
      items: 'center',
      padding: '1em / 8',
      sizing: 'content',
      cursor: 'default',
      text: 'v-middle',
      hoverable: 'n :focusable[.5em]',
      toggle: '0 :active[.5em] :pressed[.5em]',
      fill: 'bg',
      expand: '.5em',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
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

    if (this.querySelector('nu-el')) return;

    const circle = document.createElement('nu-el');

    setAttrs(circle, CIRCLE_ATTRS);

    this.appendChild(circle);
  }
}
