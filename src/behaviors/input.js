import WidgetBehavior from './widget';
import { h } from '../helpers';

export default class InputBehavior extends WidgetBehavior {
  static get localized() {
    return true;
  }

  static get formField() {
    return true;
  }

  static get tag() {
    return 'input';
  }

  init() {
    this.setMod('input', true);
    this.tagName = this.constructor.tag;
    this.value = null;
    this.props.disabled = () => {
      return this.transferAttr('disabled', this.ref) != null;
    };
    this.props.placeholder = () => this.transferAttr('placeholder', this.ref, '...');
    this.props.value = (val) => this.setValue(val, true);
    this.props.mask = (val) => {
      val = val != null;

      this.setMask(val);

      return val;
    };

    super.init();

    const { host } = this;

    this.linkValue((val) => this.setValue(val, true));

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
    }

    this.setFormValue();

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
      this.emit('input', this.value);
    }

    this.setInputValue(value);
    this.setFormValue();
  }

  setInputValue(value) {
    const { ref } = this;
    const tag = this.tagName;

    if (!ref) return;

    if (tag === 'textarea') {
      if (ref.textContent !== value) {
        ref.textContent = value;
      }
    } else if (ref.value !== value) {
      ref.value = value;
    }
  }

  setMask(mask) {
    if (this.ref) {
      if (mask) {
        this.ref.type = 'password';
      } else {
        this.ref.type = 'text';
      }
    } else {
      setTimeout(() => this.setMask(mask));
    }
  }
}
