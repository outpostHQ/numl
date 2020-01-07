import NuActiveElement from './activeelement';

const CIRCLE_ATTRS = {

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
      border: '1b',
      radius: 'round',
      content: 'stretch',
      items: 'center',
      padding: '0',
      sizing: 'content',
      cursor: 'default',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-border-color: var(--nu-text-color);
        --nu-local-toggle-color: transparent;
        --nu-local-toggle-shadow: 0 0 .75em 0 var(--nu-local-toggle-color) inset;
        --nu-local-pressed-shadow: 0 0 0 2px var(--nu-bg-color) inset;

        position: relative;
        background-color: var(--nu-bg-color);
        box-shadow: var(--nu-local-pressed-shadow),
          var(--nu-local-stroke-shadow),
          var(--nu-local-toggle-shadow),
          var(--nu-local-depth-shadow);
      }

      ${tag}[disabled] {
        opacity: .5;
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
        border-radius: 9999rem;
      }

      ${tag}[nu-pressed]:not([disabled]) {
        --nu-border-color: var(--nu-text-color);
        background-color: var(--nu-special-bg-color);
      }
      ${tag}[nu-pressed][disabled] {
        --nu-border-color: rgba(0, 0, 0, 0);
        background-color: rgba(var(--nu-text-color-rgb), .5);
      }
      ${tag}:not([nu-pressed])[disabled] {
        --nu-border-color: rgba(var(--nu-text-color-rgb), .5);
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
  }
}
