import NuElement from './element';
import focusable from '../mixins/focusable';
import { generateId, bindActiveEvents, setImmediate, colorUnit } from '../helpers';

const backgroundUnit = colorUnit('background-color', 'background');

export default class NuActiveElement extends NuElement {
  static get nuTag() {
    return 'nu-activeelement'; // abstract tag
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
      controls: '',
      value: '',
    };
  }

  static nuNavigate(href, openNewTab) {
    const link = document.createElement('a');

    link.href = href;

    if (openNewTab) {
      link.target = '_blank';
    }

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  static get nuDefaults() {
    return {
      color: 'inherit',
      background: '',
      radius: '',
      mod: 'nowrap',
      transition: 'box-shadow, color, background-color',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-toggle-color: transparent;
        --nu-depth-color: transparent;
        --nu-hover-color: transparent;
        --nu-depth-shadow: 0 0 0 rgba(0, 0, 0, 0);

        position: relative;
        opacity: 1;
        z-index: 0; /* to make :hover::after z-index work as expected */
        user-select: none;
      }
      
      ${nuTag}::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: inherit;
        background-color: var(--nu-hover-color);
      } 

      ${nuTag}[tabindex] {
        cursor: pointer;
      }

      ${nuTag}[disabled] {
        opacity: .5;
        cursor: default;
      }
      
      ${nuTag}:not([disabled])[tabindex]:hover {
        --nu-hover-color: var(--nu-theme-hover-color);
      }

      ${nuTag}[nu-active] {
        z-index: 2;
      }

      ${nuTag}[nu-pressed] {
        z-index: 1;
      }

      ${focusable(nuTag)}
    `;
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetFocusable(!this.hasAttribute('disabled'));

    bindActiveEvents.call(this);

    setTimeout(() => {
      const innerPopup = this.querySelector('[nu-popup]');

      if (innerPopup) {
        this.nuSetAria('haspopup', true);
        this.nuSetAria('expanded', this.nuPressed || false);
      }

      if (!this.parentNode) return;

      if (this.getAttribute('role') === 'button') {
        if (this.hasAttribute('to')) {
          this.setAttribute('role', 'link');
        } else {
          switch (this.parentNode.nuRole) {
            case 'radiogroup':
              this.setAttribute('role', 'radio');
              break;
            case 'menu':
              this.setAttribute('role', 'menuitem');
              break;
            case 'tablist':
              this.setAttribute('role', 'tab');
              break;
            default:
              return;
          }
        }
      }

      if (this.nuIsToggle()) {
        this.nuSetPressed(this.nuPressed);
      }

      this.nuControl();
    }, 0);
  }

  nuTap() {
    if (this.hasAttribute('disabled')
      || this.getAttribute('tabindex') === '-1') return;

    if (this.hasAttribute('scrollto')) {
      this.nuScrollTo(this.getAttribute('scrollto'));
    }

    if (this.hasAttribute('to')) {
      const href = this.getAttribute('to');

      this.constructor.nuNavigate(href.replace(/^!/, ''), href.startsWith('!'));
    }

    this.nuEmit('tap');

    this.nuToggle();
    this.nuControl();

    if (this.hasAttribute('prevent')) return;

    const popup = this.nuQueryParent('[nu-popup]');

    if (popup) {
      popup.parentNode.nuSetPressed(false);
      popup.parentNode.focus();
    }
  }

  nuControl() {
    if (!this.hasAttribute('controls')) return;

    const role = this.getAttribute('role');

    setTimeout(() => {
      (this.getAttribute('aria-controls') || '').split(' ')
        .forEach(id => {
          const el = document.getElementById(id);

          if (!el) return;

          el.hidden = this.nuPressed !== true;

          if (role === 'tab' && !el.hasAttribute('aria-labelledby')) {
            el.setAttribute('aria-labelledby', this.nuId);
          }
        });
    }, 0);
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

        this.nuSetPressed(value);

        break;
      case 'value':
        this.nuSetValue(value);

        break;
      case 'controls':
        if (this.hasAttribute('value')) break;

        this.nuSetValue(value);

        break;
    }
  }

  nuToggle() {
    if (!this.nuIsToggle()) return;

    this.nuSetPressed(!this.nuPressed);
  }

  nuSetPressed(pressed) {
    if (pressed === this.nuPressed) return;

    if (!this.nuIsToggle()) return;

    this.nuPressed = pressed;

    if (this.nuIsRadio()) {
      this.setAttribute('tabindex', pressed ? '-1' : '0');
    }

    this.nuSetAria(this.hasAttribute('aria-expanded') ? 'expanded' : 'pressed', pressed);
    this.nuSetMod('pressed', pressed);
    this.nuEmit('pressed', pressed);
    this.nuControl();

    const innerPopup = this.querySelector('[nu-popup]');

    if (innerPopup) {
      innerPopup[this.nuPressed ? 'nuOpen' : 'nuClose']();
    }
  }

  nuSetValue(value) {
    if (value === this.nuValue) return;

    this.nuValue = value;

    setTimeout(() => {
      this.nuEmit('value', value);
      this.nuControl();
    }, 0);
  }

  nuIsToggle() {
    return this.hasAttribute('aria-pressed')
      || this.hasAttribute('aria-expanded')
      || ['checkbox', 'radio', 'tab'].includes(this.getAttribute('role'));
  }

  nuIsRadio() {
    return ['radio', 'tab'].includes(this.getAttribute('role'));
  }
}
