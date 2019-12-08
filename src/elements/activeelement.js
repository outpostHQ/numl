import NuElement from './element';
import focusable from '../mixins/focusable';
import { bindActiveEvents, colorUnit } from '../helpers';
import transformMixin from '../mixins/transform';
import backgroundMixin from '../mixins/background';

export default class NuActiveElement extends NuElement {
  static get nuTag() {
    return 'nu-activeelement'; // abstract tag
  }

  static get nuRole() {
    return 'button';
  }

  static get nuId() {
    return 'btn';
  }

  static get nuAttrs() {
    return {
      disabled: '',
      pressed: '',
      href: '',
      target: '',
      controls: '',
      value: '',
      to: '',
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
      fill: 'bg',
      radius: '',
      text: 'nowrap',
      transition: 'box-shadow, color, background-color, border, border-radius',
    };
  }

  static get nuMixins() {
    return {
      transform: transformMixin,
      background: backgroundMixin,
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-local-toggle-color: transparent;
        --nu-local-depth-color: transparent;
        --nu-local-hover-color: transparent;
        --nu-local-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        --nu-local-stroke-shadow: 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0);
        --nu-local-toggle-shadow: 0 0 0 0 rgba(0, 0, 0, 0) inset;

        opacity: 1;
        position: relative;
        z-index: 0; /* to make :hover::after z-index work as expected */
        user-select: none;

        box-shadow: var(--nu-local-stroke-shadow),
          var(--nu-local-toggle-shadow),
          var(--nu-local-depth-shadow);
      }

      ${tag}[tabindex]:not([tabindex="-1"]):not([disabled])::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        border-radius: inherit;
        background-color: var(--nu-local-hover-color);
        transition: background-color var(--nu-animation-time) linear;
      }

      ${tag}[tabindex] {
        cursor: pointer;
      }

      ${tag}[disabled] {
        opacity: .5;
        cursor: default;
      }

      ${tag}:not([disabled])[tabindex]:hover {
        --nu-local-hover-color: var(--nu-hover-color);
      }

      ${tag}[nu-active] {
        z-index: 3;
      }

      ${tag}[nu-pressed] {
        z-index: 2;
      }

      ${tag} > a {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      ${focusable(tag)}
    `;
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetFocusable(!this.hasAttribute('disabled'));

    bindActiveEvents.call(this);

    this.addEventListener('keydown', (event) => {
      if (this.getAttribute('aria-expanded') && event.key === 'Escape') {
        this.nuSetPressed(false);
      }
    });

    setTimeout(() => {
      const innerPopup = this.querySelector('[nu-popup]');

      if (innerPopup) {
        this.nuSetAria('haspopup', true);
        this.nuSetAria('expanded', this.nuPressed || false);
        this.setAttribute('role', 'button');
        this.setAttribute('type', 'dropdown');

        return;
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

    this.nuCreateLink();
  }

  nuCreateLink() {
    if (this.nuLink) return;

    const link = document.createElement('a');

    link.href = this.nuHref;
    link.target = this.nuNewTab ? '_blank' : '_self';

    this.nuLink = link;

    this.addEventListener('mouseenter', () => {
      if (this.nuHref) {
        this.appendChild(this.nuLink);
      }
    });

    this.addEventListener('mouseleave', () => {
      if (this.nuLink.parentNode) {
        this.removeChild(this.nuLink);
      }
    });

    this.nuLink.addEventListener('click', (evt) => {
      if (evt.button) {
        evt.preventDefault();
      }
    });
  }

  nuTap(evt) {
    if (this.hasAttribute('disabled')
      || this.getAttribute('tabindex') === '-1') return;

    if (this.hasAttribute('scrollto')) {
      this.nuScrollTo(this.getAttribute('scrollto'));
    }

    if (this.hasAttribute('to')) {
      const href = this.getAttribute('to');
      const openNewTab = href.startsWith('!') || evt.metaKey || evt.shiftKey;

      this.constructor.nuNavigate(href.replace(/^!/, ''), openNewTab);
    }

    this.nuEmit('tap', this.nuValue, { bubbles: false });

    this.nuToggle();
    this.nuControl();

    if (this.getAttribute('type') === 'submit') {
      this.nuEmit('submit', this.nuValue);
    }
  }

  nuPreparePayload(payload) {
    const type = this.getAttribute('type');

    switch (type) {
      case 'number':
        return Number(payload);
      case 'bool':
        return Boolean(payload);
      case 'date':
        return new Date(payload);
      default:
        return payload;
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
      case 'checked':
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
      case 'to':
        if (value && value.length) {
          this.nuNewTab = value.startsWith('!');
          this.nuHref = value.replace(/^!/, '');
        } else {
          this.nuNewTab = false;
          this.nuHref = '';
        }

        if (this.nuLink) {
          this.nuLink.href = this.nuHref;
          this.nuLink.target = this.nuNewTab ? '_blank' : '_self';
        }
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

    if (this.hasAttribute('aria-expanded')) {
      this.nuSetAria('expanded', pressed);
    } else if (this.nuIsCheckbox()) {
      this.nuSetAria('checked', pressed);
    } else {
      this.nuSetAria('pressed', pressed);
    }

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
      || this.hasAttribute('aria-checked')
      || ['checkbox', 'radio', 'tab', 'switch'].includes(this.getAttribute('role'));
  }

  nuIsRadio() {
    return ['radio', 'tab'].includes(this.getAttribute('role'));
  }

  nuIsCheckbox() {
    return ['radio', 'checkbox', 'switch'].includes(this.getAttribute('role'));
  }
}
