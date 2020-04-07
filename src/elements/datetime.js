import NuFormatter from './formatter';

export default class NuDateTime extends NuFormatter {
  static get nuTag() {
    return 'nu-datetime';
  }

  static get nuFormatter() {
    return import('../formatters/datetime');
  }

  static get nuAttrs() {
    return {
      value: '',
      locale: '',
      date: '',
      time: '',
      weekday: '',
      era: '',
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '',
      second: '',
      zone: '',
      timezone: '',
      dayperiod: '',
      calendar: '',
      system: '',
      hourcycle: '',
      fallback: '',
      format: '',
    };
  }


  nuApply() {
    super.nuApply();

    clearInterval(this.nuIntervalId);

    const value = this.getAttribute('value');

    if (value === 'now') {
      this.nuIntervalId = setInterval(() => {
        this.nuApply();
      }, 1000);
    }
  }
}
