import FormatDateTime from '../formatters/datetime';
import WidgetBehavior from './widget';

export default class ValueBehavior extends WidgetBehavior {
  static get localized() {
    return true;
  }

  init() {
    this.linkContext('value', (val) => {
      this.setValue(val);
    });

    if (!this.value) {
      this.setValue(null);
    }
  }

  setValue(value) {
    this.value = value;

    if (value instanceof Date) {
      value = `<nu-datetime value="${String(value)}" date></nu-datetime>`;
    } else if (typeof value === 'boolean') {
      value = value ? '<nu-icon name="check"></nu-icon>' : '<nu-icon name="minus"></nu-icon>';
    }

    this.host.innerHTML = value == null ? '...' : value;
  }
}
