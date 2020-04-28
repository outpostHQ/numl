import WidgetBehavior from './widget';

export default class ValidatorBehavior extends WidgetBehavior {
  init() {
    this.props.for = (val) => {
      this.fieldId = val;
    };
    this.props.assert = (assert) => {
      if (assert) {
        const tmp = assert.split(':');
        this.assert = tmp[0];
        this.value = tmp[1];
      } else {
        this.assert = null;
      }
    };

    super.init();
  }

  get field() {
    return this.host.getAttribute('for').trim();
  }

  connected() {
    this.bindContext('form', (form) => {
      if (this.currentForm && form !== this.currentForm) {
        this.disconnectForm(this.currentForm, !!form);
      }

      this.currentForm = form;

      if (!form) return;

      this.connectForm();
    });
  }

  changed(name, value) {
    super.changed(name, value);

    if (this.form) {
      this.connectForm();
    }
  }

  connectForm() {
    const { fieldId, assert, form, value } = this;

    if (!fieldId || !assert || !form) return;

    this.form.registerCheck(fieldId, assert, value);
  }

  disconnectForm(form = this.currentForm, dontDelete) {
    const { fieldId, assert } = this;

    if (!fieldId || !assert) return;

    form.unregisterCheck(fieldId, assert);

    if (!dontDelete) {
      delete this.form;
    }
  }
}
