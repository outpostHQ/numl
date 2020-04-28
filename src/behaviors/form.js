import WidgetBehavior from './widget';

/**
 * Behavior to handle form logic.
 * Value of the form is actually DATA and can only be set by element property.
 */
export default class FormBehavior extends WidgetBehavior {
  static get formField() {
    return true;
  }

  init() {
    this.value = {};
    this.checks = {};

    super.init();

    const { host } = this;

    host.nuSetValue = (val, silent) => this.setValue(val, silent);
    host.nuGetValue = () => this.value;

    this.setValue(host._value || {}, true);

    this.setContext('form', this);
    this.setContext('submit', () => {
      this.emit('input', this.value);
    });
  }

  setValue(value, silent) {
    if (typeof value !== 'object') return;

    const serializedValue = JSON.stringify(value);

    if (JSON.stringify(value) === this._serializedValue) return;

    this._serializedValue = serializedValue;
    this.value = value;

    if (!silent) {
      this.emit('input', this.value);
    }
  }

  setFieldValue(name, value) {
    if (this.value[name] === value) return;

    if (value != null) {
      this.value[name] = value;
    } else {
      delete this.value[name];
    }
  }

  registerCheck(field, name, options) {
    if (!this.checks[field]) {
      this.checks[field] = {};

      this.checks[field][name] = options;
    }
  }

  unregisterCheck(field, name) {
    delete this.checks[field][name];
  }
}
