import LocalizedWidgetBehavior from './localized-widget';
import { h } from '../helpers';

export default class InputBehavior extends LocalizedWidgetBehavior {
  static get tag() {
    return 'input';
  }

  init() {
    this.props.disabled = () => {
      return this.transferAttr('disabled', this.ref) != null;
    };
    this.props.placeholder = () => this.transferAttr('placeholder', this.ref, '...');
    this.props.value = (val) => this.setValue(val, true);

    super.init();

    const { host } = this;

    const tag = this.constructor.tag;

    this.ref = host.querySelector(tag);

    if (!this.ref) {
      const input = h(tag);

      host.appendChild(input);

      this.ref = input;
    }

    const { ref } = this;

    if (this.value == null) {
      this.setValue(tag === 'textarea' ? ref.textContent : ref.value, true);
    } else {
      this.setInputValue(this.value);
    }

    this.transferAttr('placeholder', this.ref, '...');

    ref.addEventListener('input', (event) => {
      event.stopPropagation();

      this.setValue(ref.value);
    });

    ref.addEventListener('change', (event) => {
      event.stopPropagation();

      this.emit('change', this.value);
    });

    host.nuRef = ref;

    if (host.hasAttribute('label')) {
      host.nuChanged('label', null);
      host.removeAttribute('aria-label');
    }

    if (host.hasAttribute('labelledby')) {
      host.nuChanged('label', null);
      host.removeAttribute('aria-labelledby');
    }
  }

  setEmpty() {
    if (!this.ref) return;

    this.host.nuSetMod('empty', !this.ref.value);
  }

  setValue(value, silent) {
    if (this.value === value) return;

    this.value = value;

    this.setEmpty();

    if (!silent) {
      this.setInputValue(value);
      this.emit('input', this.value);
    }
  }

  setInputValue(value) {
    const { ref } = this;
    const tag = this.constructor.tag;

    if (!ref) return;

    if (tag === 'textarea') {
      if (ref.textContent !== value) {
        ref.textContent = value;
      }
    } else if (ref.value !== value) {
      ref.value = value;
    }
  }
}
