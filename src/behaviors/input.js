import WidgetBehavior from './widget';
import { h, isEqual } from '../helpers';

export default class InputBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      tag: 'input',
    };
  }

  init() {
    const tag = this.tagName = this.params.tag;
    const { host } = this;

    this.ref = host.querySelector(tag);

    if (!this.ref) {
      const input = h(tag);

      host.appendChild(input);

      this.ref = input;
    }

    this.value = null;
    this.props.disabled = () => {
      return this.transferAttr('disabled', this.ref) != null;
    };
    this.props.placeholder = () => this.transferAttr('placeholder', this.ref, '...');
    this.props.mask = (val) => {
      val = val != null;

      this.setMask(val);

      return val;
    };

    super.init();

    const { ref } = this;

    if (this.value == null) {
      const elementValue = tag === 'textarea' ? ref.textContent : ref.value;

      if (elementValue) {
        this.setValue(elementValue, true);
      }
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

    ref.addEventListener('blur', () => {
      if (host.id) {
        this.emit('nu-blur', host.nuId, { bubbles: true });
      }
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

    this.inputGroup = null;

    this.linkContext('inputgroup', (inputGroup) => {
      this.setEmpty();
    }, 'inputGroup');

    host.addEventListener('keydown', (event) => {
      if (tag === 'input' && event.key === 'Enter') {
        this.doAction('submit');
      }
    });

    // recheck for autocomplete
    setTimeout(() => {
      this.setEmpty();
    }, 500);
  }

  setEmpty() {
    if (!this.ref) return;

    this.setMod('empty', !this.ref.value);

    const inputGroup = this.inputGroup;

    if (inputGroup) {
      inputGroup.setMod('empty', !this.ref.value);
    }
  }

  setValue(value, silent) {
    if (isEqual(this.value, value)) return;

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
