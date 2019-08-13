import NuBlock from './block';
import NuCard from './card';
import focusable from '../mixins/focusable';

class NuBtn extends NuBlock {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuRole() {
    return 'button';
  }

  static get nuAttrs() {
    return {
      disabled: '',
      pressed: '',
      href: '',
      target: '',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-border-color: var(--nu-theme-border-color);

        --nu-toggle-shadow: 0 0 1em 0 var(--nu-toggle-color) inset;
        --nu-border-inset: inset 0 0;
        --nu-border-shadow: var(--nu-border-inset) 0 var(--nu-theme-border-width) var(--nu-border-color);
        --nu-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);

        position: relative;
        display: inline-grid;
        border-radius: var(--nu-border-radius, .5rem);
        align-content: stretch;
        justify-content: stretch;
        align-items: center;
        justify-items: center;
        grid-auto-flow: column;
        grid-gap: .5rem;
        padding: .5rem 1rem;
        color: var(--nu-theme-color);
        background-color: var(--nu-theme-background-color);
        cursor: pointer;
        box-shadow: var(--nu-border-shadow),
          var(--nu-toggle-shadow),
          var(--nu-focus-background-shadow),
          var(--nu-depth-shadow);
        transition: box-shadow var(--nu-theme-animation-time) linear;
        user-select: none;
        vertical-align: middle;
        opacity: 1;
        z-index: 0; /* to make :hover::after z-index work as expected */
        box-sizing: border-box;
        white-space: nowrap;
      }

      ${nuTag}:not([disabled])::after {
        content: "";
        position: absolute;
        display: block;
        pointer-events: none;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        transition: background-color var(--nu-theme-animation-time) linear;
        background-color: rgba(128, 128, 128, 0);
        border-radius: inherit;
      }

      ${nuTag}:not([disabled]):hover::after {
        background-color: rgba(128, 128, 128, .07);
      }

      ${nuTag}[disabled] {
        opacity: .5;
        cursor: default;
      }

      ${nuTag}[nu-active] {
        text-decoration: none;
        z-index: 2;
      }

      ${nuTag}[nu-toggled] {
        z-index: 1;
      }

      ${nuTag}[nu-active]:not([disabled]):not([nu-toggled]),
      ${nuTag}[nu-toggled]:not([disabled]):not([nu-active]) {
        --nu-toggle-color: rgba(0, 0, 0, var(--nu-theme-depth-opacity));
      }

      ${nuTag}[special] {
        --nu-border-color: transparent;
        background-color: var(--nu-theme-special-color);
        color: var(--nu-theme-special-background-color);
      }

      ${nuTag}[cell] {
        --nu-border-color: transparent;
        border-radius: 0;
        align-self: stretch;
        justify-self: stretch;
        width: 100%;
        height: 100%;
      }

      ${focusable(nuTag)}
    `;
  }

  nuMounted() {
    super.nuMounted();

    if (!this.hasAttribute('role')) {
      if (!this.constructor.nuAttrs.includes('href')
        || !this.hasAttribute('href')) {
        this.setAttribute('role', 'button');
      } else {
        this.setAttribute('role', 'link');
      }
    }

    if (!this.hasAttribute('pressed')) {
      this.nuSetAria('pressed', false);
    }

    this.nuSetFocusable(!this.hasAttribute('disabled'));

    this.addEventListener('click', (evt) => {
      if (evt.nuHandled) return;

      evt.nuHandled = true;

      if (!this.hasAttribute('disabled')) {
        this.nuTap();
      }
    });

    this.addEventListener('keydown', evt => {
      if (this.hasAttribute('disabled') || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === 'Enter') {
        this.nuTap();
      } else if (evt.key === ' ') {
        evt.preventDefault();
        this.nuSetMod('active', true);
      }
    });

    this.addEventListener('keyup', evt => {
      if (this.hasAttribute('disabled') || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === ' ') {
        evt.preventDefault();
        this.nuSetMod('active', false);
        this.nuTap();
      }
    });

    this.addEventListener('blur', evt => this.nuSetMod('active', false));

    this.addEventListener('mousedown', () => {
      this.nuSetMod('active', true);
    });

    ['mouseleave', 'mouseup'].forEach(eventName => {
      this.addEventListener(eventName, () => {
        this.nuSetMod('active', false);
      });
    });
  }

  nuTap() {
    const href = this.getAttribute('href');

    this.nuEmit('tap');

    if (href) {
      this.nuEmit('route', href);
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'disabled':
        this.nuSetMod('disabled', value != null);
        this.nuSetFocusable(value == null);
        break;
      case 'pressed':
        this.nuSetMod('toggled', value != null);
        this.nuSetAria('pressed', value != null);
    }
  }

  nuUpdateTheme(theme) {
    NuCard.prototype.nuUpdateTheme.call(this, theme);
  }
}

export default NuBtn;
