import FormatDateTime from '../formatters/datetime';
import WidgetBehavior from './widget';

export default class ValueBehavior extends WidgetBehavior {
  static get params() {
    return {
      provider: false,
      injector: false,
    };
  }

  init() {
    super.init();

    this.linkContext('typedValue', (value) => {
      if (value === undefined) return;

      this.setValue(value);
    }, 'parentValue');

    if (!this.value) {
      this.setValue(null);
    }
  }

  setValue(value) {
    if (this.value === value) return;

    this.value = value;

    if (value instanceof Date) {
      value = `<nu-datetime value="${String(value)}" date></nu-datetime>`;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      value = `
        <nu-flex gap>
          <nu-datetime value="${String(value[0])}" date></nu-datetime>
          <nu-el>–</nu-el>
          <nu-datetime value="${String(value[1])}" date></nu-datetime>
        </nu-flex>
      `;
    } else if (typeof value === 'boolean') {
      value = value ? '<nu-icon name="check"></nu-icon>' : '<nu-icon name="minus"></nu-icon>';
    }

    this.host.innerHTML = value == null ? '...' : value;
  }
}
