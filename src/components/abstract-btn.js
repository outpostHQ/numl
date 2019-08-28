import NuBlock from './block';
import focusable from '../mixins/focusable';
import { generateId, bindActiveEvents } from '../helpers';

export default class NuAbstractBtn extends NuBlock {
  static get nuTag() {
    return 'nu-abstract-btn';
  }

  static get nuRole() {
    return 'button';
  }

  static get nuDisplay() {
    return 'inline-block';
  }

  static get nuAttrs() {
    return {
      disabled: '',
      pressed: '',
      href: '',
      target: '',
      controls: '',
      value: '',
    };
  }

  static get nuDefaults() {
    return {
      padding: '.5',
      color: 'inherit',
      background: '',
      radius: '',
      mod: 'center nowrap',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-toggle-shadow: 0 0 .75em 0 var(--nu-toggle-color) inset;
        --nu-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);

        position: relative;
        text-align: center;
        box-shadow: var(--nu-outline-shadow),
          var(--nu-toggle-shadow),
          var(--nu-depth-shadow);
        transition: box-shadow var(--nu-theme-animation-time) linear;
        user-select: none;
        vertical-align: middle;
        opacity: 1;
        z-index: 0; /* to make :hover::after z-index work as expected */
        box-sizing: border-box;
      }

      ${nuTag}[tabindex] {
        cursor: pointer;
      }

      ${nuTag}[disabled] {
        opacity: .5;
        cursor: default;
      }

      ${nuTag}[nu-active] {
        text-decoration: none;
        z-index: 2;
      }

      ${nuTag}[aria-pressed="true"] {
        z-index: 1;
      }

      ${focusable(nuTag)}
    `;
  }

  nuMounted() {
    super.nuMounted();

    if (!this.hasAttribute('pressed')) {
      this.nuSetValue(false);
    }

    this.nuSetFocusable(!this.hasAttribute('disabled'));

    bindActiveEvents.call(this);

    setTimeout(() => {
      if (!this.parentNode) return;

      switch (this.parentNode.tagName) {
        case 'NU-BTN-GROUP':
          if (this.parentNode.value) {
            this.setAttribute('role', 'radio');
          }
          break;
        case 'NU-MENU':
          this.setAttribute('role', 'menuitem');
          break;
        case 'NU-TABLIST':
          this.setAttribute('role', 'tab');
          break;
      }
    }, 0);
  }

  nuTap() {
    const href = this.getAttribute('href');

    this.nuEmit('tap');

    const parent = this.parentNode;
    const value = this.getAttribute('value') || this.getAttribute('controls');

    if (value && parent.nuSetValue) {
      parent.nuSetValue(value);
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
        value = value != null;

        if (value && parent.nuSetValue) {
          parent.nuSetValue(value);
        } else {
          this.nuSetValue(value);
        }

        break;
    }
  }

  nuSetValue(value) {
    this.nuSetAria('pressed', value);

    setTimeout(() => {
      if (this.nuRole !== 'tab') return;

      if (value !== this.pressed) return;

      const controlsName = this.getAttribute('controls');

      if (!controlsName) return;

      const link = this.nuInvertQuery(`[name="${controlsName}"]`);

      if (link && link.nuSetMod) {
        const linkId = generateId(link);
        const tabId = generateId(this);

        this.nuSetAria('controls', linkId);
        link.nuSetAria('labelledby', tabId);
        link.nuSetMod('hidden', !value);

        if (!link.nuRole) {
          link.nuRole = 'tabpanel';
        }
      }
    }, 0);
  }

  get pressed() {
    return this.getAttribute('aria-pressed') === 'true';
  }

  get value() {
    return this.getAttribute('value') || this.getAttribute('controls');
  }
}
