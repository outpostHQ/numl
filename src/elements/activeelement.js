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
      checked: '',
      selected: '',
      href: '',
      target: '',
      controls: '',
      value: '',
      to: '',
    };
  }

  static nuNavigate(href, openNewTab) {
    return true;
  }

  static get nuDefaults() {
    return {
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

      ${tag} > a:focus {
        outline: none;
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

    const radioGroup = this.nuContext.radiogroup;

    if (radioGroup) {
      this.setAttribute('role', radioGroup.itemRole);

      if (this.nuPressed) {
        radioGroup.context.nuSetValue(this.nuValue);
      } else if (radioGroup.value === this.nuValue) {
        this.setAttribute('pressed', '');
      } else {
        this.removeAttribute('pressed');
      }

      this.nuSetContextHook('radiogroup', () => {
        const radioGroup = this.nuContext.radiogroup;

        if (radioGroup.value === this.nuValue) {
          this.setAttribute('pressed', '');
        } else {
          this.removeAttribute('pressed');
        }
      });
    }

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
        }
      }

      if (this.nuIsToggle()) {
        this.nuSetPressed(this.hasAttribute('pressed'));
      }

      this.nuControl();
      this.nuCreateLink();
    }, 0);

    this.addEventListener('tap', (event) => {
      if (!event.nuRole && this.hasAttribute('role')) {
        event.nuRole = this.getAttribute('role');
      }
    });
  }

  nuCreateLink() {
    if (!this.hasAttribute('to')) {
      if (this.nuLink) {
        this.removeChild(this.nuLink);
      }

      return;
    }

    if (this.nuLink) return;

    const link = document.createElement('a');

    link.href = this.nuHref;
    link.target = this.nuNewTab ? '_blank' : '_self';
    link.setAttribute('tabindex', '-1');

    this.nuLink = link;

    this.appendChild(this.nuLink);

    this.nuLink.addEventListener('click', (evt) => {
      if (evt.button === 0) {
        this.nuTap(evt);
      }
    });
  }

  nuTap(evt) {
    if (this.hasAttribute('to') && evt.target !== this.nuLink) {
      this.nuLink.click();

      return;
    }

    if (this.hasAttribute('disabled')
      || this.getAttribute('tabindex') === '-1') return;

    if (this.hasAttribute('scrollto')) {
      this.nuScrollTo(this.getAttribute('scrollto'));
    }

    if (this.hasAttribute('to')) {
      const to = this.nuGetAttr('to', true);
      const href = to.replace(/^!/, '');
      const openNewTab = to.startsWith('!') || evt.metaKey || evt.shiftKey;

      const useLink = this.constructor.nuNavigate(href, openNewTab);

      if (!useLink) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    }

    this.nuEmit('tap', this.nuValue);

    this.nuToggle();
    this.nuControl();

    if (this.getAttribute('action') === 'submit') {
      this.nuEmit('submit', this.nuValue);
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
            el.setAttribute('aria-labelledby', this.nuUniqId);
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
      case 'selected':
      case 'checked':
        if (value != null) {
          this.setAttribute('pressed', '');
        } else {
          this.removeAttribute('pressed');
        }

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
      case 'to':
        value = this.nuGetAttr('to', true);

        if (value && value.length) {
          this.nuNewTab = value.startsWith('!');
          this.nuHref = value.replace(/^!/, '');
        } else {
          this.nuNewTab = false;
          this.nuHref = '';
        }

        if (this.nuIsConnected) {
          this.nuCreateLink();
        }

        if (this.nuLink) {
          this.nuLink.href = this.nuHref;
          this.nuLink.target = this.nuNewTab ? '_blank' : '_self';
        }
    }
  }

  nuToggle() {
    if (!this.nuIsToggle()) return;

    if (this.nuPressed && !this.nuIsUnpressable()) {
      return;
    }

    this.nuSetPressed(!this.nuPressed);
  }

  nuSetPressed(pressed, force) {
    if (pressed === this.nuPressed && !(pressed == null && this.nuPressed == null)) return;

    if (!this.nuIsToggle()) return;

    pressed = pressed || false;

    const isChanged = !!['pressed', 'checked', 'selected']
      .find(attr => this.hasAttribute(attr)) !== pressed;

    this.nuPressed = pressed;

    if (this.nuIsRadio()) {
      this.setAttribute('tabindex', pressed ? '-1' : '0');
    }

    if (this.hasAttribute('aria-expanded')) {
      this.nuSetAria('expanded', pressed);
    } else if (this.nuIsCheckbox()) {
      this.nuSetAria('checked', pressed);
    } else if (this.nuIsSelectable()) {
      this.nuSetAria('selected', pressed);
    } else {
      this.nuSetAria('pressed', pressed);
    }

    this.nuSetMod('pressed', pressed);

    if ((isChanged || this.nuIsCheckbox()) && !force) {
      this.nuEmit('pressed', pressed);
      this.nuEmit('input', (pressed && this.nuValue) || pressed, { bubbles: false });
    }

    this.nuControl();

    if (pressed) {
      const radioGroup = this.nuContext.radiogroup;

      if (radioGroup) {
        radioGroup.context.nuSetValue(this.nuValue);
      }
    }

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
      || this.hasAttribute('aria-selected')
      || ['checkbox', 'radio', 'tab', 'switch'].includes(this.getAttribute('role'));
  }

  nuIsUnpressable() {
    return !['radio', 'tab'].includes(this.getAttribute('role'));
  }

  nuIsRadio() {
    return ['radio'].includes(this.getAttribute('role'));
  }

  nuIsSelectable() {
    return ['tab'].includes(this.getAttribute('role'));
  }

  nuIsCheckbox() {
    return ['radio', 'checkbox', 'switch'].includes(this.getAttribute('role'));
  }
}
