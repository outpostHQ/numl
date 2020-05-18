import WidgetBehavior from './widget';
import { checkErrors } from '../validators';
import { deepQueryAll } from '../helpers';

/**
 * Behavior to handle form logic.
 * Value of the form is actually DATA and can only be set by element property.
 */
export default class FormBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      primary: true,
      provideValue: false,
      contextValue: false,
    };
  }

  init() {
    this.value = {};
    this.validators = {};
    this.checks = {};
    this.fields = {};

    super.init();

    const { host } = this;

    host.nuSetMod('form', true);

    if (!this.value) {
      this.value = {};
    }

    this.setContext('form', this);
    this.context.value = null;

    this.on('nu-blur', (event) => {
      const field = event.detail;
      if (this.fields[field]) {
        this.verifyData(field);
      }
    });

    this.provideAction('submit', () => {
      this.verifyData()
        .then(valid => {
          if (valid) {
            this.emit('input', this.value);
            this.control();
          }
        });
    });
  }

  verifyData(field) {
    return (!field ? this.setDirty() : Promise.resolve())
      .then(() => this.validate())
      .then(valid => {
        this.setErrorProps(field);

        return valid;
      });
  }

  connected() {
    super.connected();

    setTimeout(() => this.validate(true));
  }

  setValue(value, silent) {
    if (typeof value !== 'object') return;

    const serializedValue = JSON.stringify(value);

    if (JSON.stringify(value) === this._serializedValue || !value) return;

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

    this.control();
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

  registerCheck(field, element, name, value) {
    if (!this.validators[field]) {
      this.validators[field] = {};
    }

    if (!this.checks[field]) {
      this.checks[field] = {};
    }

    this.validators[field][name] = value;
    this.checks[field][name] = element;
  }

  registerField(name, el) {
    this.fields[name] = el;
  }

  unregisterCheck(field, name) {
    delete this.validators[field][name];
    delete this.checks[field][name];
  }

  unregisterField(name) {
    delete this.fields[name];
  }

  connectForm() {
    super.connectForm();

    const validators = this.validators;

    this.validators = Object.create(this.form.validators);

    Object.keys(validators).forEach(validator => {
      this.validators[validator] = validators[validator];
    });
  }

  /**
   * Check form data correctness.
   * @return {Promise<boolean>}
   */
  validate(silent) {
    return checkErrors(this.value, this.validators)
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
    const forms = deepQueryAll(this.host, '[is-form]');

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
  setErrorProps(field) {
    const names = Object.keys(this.validators);
    const errors = this.value.$errors || {};
    const fields = this.fields;
    const checks = this.checks;

    names.forEach(name => {
      if (field && field !== name) return;

      const validators = Object.keys(this.validators[name]);
      const fieldChecks = checks[name];

      let invalid = false;

      for (let validator of validators) {
        if (errors && errors[name] && errors[name][validator] && !invalid) {
          invalid = true;
          fieldChecks[validator].setValidity(false);
          // this.host.style.setProperty(prop, 'block');
        } else {
          fieldChecks[validator].setValidity(true);
          // this.host.style.setProperty(prop, 'none');
        }
      }

      if (fields[name]) {
        fields[name].setValidity(!invalid);
      }
    });
  }

  resetFieldWarning(name) {
    const field = this.fields[name];
    const validators = Object.keys(this.validators[name] || {});

    for (let check of validators) {
      const prop = `--nu-check-${name}-${check}`;

      this.host.style.setProperty(prop, 'none');
    }

    if (field) {
      field.setValidity(true);
    }
  }
}
