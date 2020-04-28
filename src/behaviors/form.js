import WidgetBehavior from './widget';

/**
 * Behavior to handle form logic.
 * Value of the form is actually DATA and can only be set by element property.
 */
export default class FormBehavior extends WidgetBehavior {
  init() {
    this.value = {};

    super.init();

    const { host } = this;

    host.nuSetValue = (val, silent) => this.setValue(val, silent);
    host.nuGetValue = () => this.value;

    this.setValue(host._value || {}, true);

    this.setContext('form', this);
    this.setContext('submit', () => {
      this.emit('input', this.value);
      // this.setFormValue();
    });
  }

  setValue(value, silent) {
    if (typeof value !== 'object') return;

    const serializedValue = JSON.stringify(value);

    if (JSON.stringify(value) === this.serializedValue) return;

    this.serializedValue = serializedValue;
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
}
