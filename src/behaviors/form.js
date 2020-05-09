import WidgetBehavior from './widget';
import { checkErrors } from '../validators';
import { deepQueryAll } from '../helpers';

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
    this.fields = {};

    super.init();

    const { host } = this;

    host.nuSetMod('form', true);

    this.linkValue((val) => this.setValue(val, true));

    if (!this.value) {
      this.value = {};
    }

    this.setContext('form', this);
    this.setContext('submit', () => {
      this.setDirty()
        .then(() => this.validate())
        .then(valid => {
          this.setErrorProps();

          if (valid) {
            this.emit('input', this.value);
          }
        });
    });
  }

  connected() {
    super.connected();

    setTimeout(() => this.validate(true));
  }

  setValue(value, silent) {
    if (typeof value !== 'object') return;

    const serializedValue = JSON.stringify(value);

    if (JSON.stringify(value) === this._serializedValue) return;

    this._serializedValue = serializedValue;
    this.value = value;

    if (!silent) {
      this.validate()
        .then(valid => {
          if (valid) {
            this.emit('input', this.value);
          }
        });
    }
  }

  setFieldValue(name, value) {
    const { fields } = this;

    if (this.value[name] === value) return;

    if (value != null) {
      this.value[name] = value;

      if (fields[name]) {
        // remove warnings if user changes data
        this.resetFieldWarning(name);
      }
    } else {
      delete this.value[name];
    }

    this.validate();
  }

  registerCheck(field, name, options) {
    if (!this.checks[field]) {
      this.checks[field] = {};
    }

    this.checks[field][name] = options;
  }

  registerField(name, el) {
    this.fields[name] = el;
  }

  unregisterCheck(field, name) {
    delete this.checks[field][name];
  }

  unregisterField(name) {
    delete this.fields[name];
  }

  connectForm() {
    super.connectForm();

    const checks = this.checks;

    this.checks = Object.create(this.form.checks);

    Object.keys(checks).forEach(check => {
      this.checks[check] = checks[check];
    });
  }

  /**
   * Check form data correctness.
   * @return {Promise<boolean>}
   */
  validate(silent) {
    return checkErrors(this.value, this.checks)
      .then(errors => {
        if (errors) {
          this.value.$errors = errors;
        } else {
          delete this.value.$errors;
        }

        return !errors;
      });
  }

  setDirty() {
    const forms = deepQueryAll(this.host, '[nu-form]');

    this.dirty = true;

    return Promise.all(forms
      .map(formEl => {
        return formEl.nu('form')
          .then(Form => {
            return Form.setDirty()
              .then(() => Form.validate())
              .then(() => Form.setErrorProps())
          });
      }));
  }

  /**
   * Set custom properties to show active errors
   * @returns
   */
  setErrorProps() {
    const names = Object.keys(this.checks);
    const errors = this.value.$errors || {};
    const fields = this.fields;

    names.forEach(name => {
      const checks = Object.keys(this.checks[name]);

      let invalid = false;

      for (let check of checks) {
        const prop = `--nu-check-${name}-${check}`;

        if (errors && errors[name] && errors[name][check] && !invalid) {
          invalid = true;
          this.host.style.setProperty(prop, 'block');
        } else {
          this.host.style.setProperty(prop, 'none');
        }
      }

      if (fields[name]) {
        fields[name].setValidity(!invalid);
      }
    });
  }

  resetFieldWarning(name) {
    const field = this.fields[name];
    const checks = Object.keys(this.checks[name] || {});

    for (let check of checks) {
      const prop = `--nu-check-${name}-${check}`;

      this.host.style.setProperty(prop, 'none');
    }

    if (field) {
      field.setValidity(true);
    }
  }
}
