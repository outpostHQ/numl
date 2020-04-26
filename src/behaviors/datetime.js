import FormatterBehavior from './formatter.js';
import DateTimeFormatter from '../formatters/datetime';

export default class DateTimeBehavior extends FormatterBehavior {
  static get formatter() {
    return DateTimeFormatter;
  }

  constructor(host, value) {
    super(host, value);

    this.intervalId = null;
  }

  apply() {
    super.apply();

    clearInterval(this.intervalId);

    if (this.value === 'now') {
      this.intervalId = setInterval(() => {
        this.apply();
      }, 1000);
    }
  }
}
