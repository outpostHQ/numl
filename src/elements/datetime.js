import NuElement from './element';

export default class NuDateTime extends NuElement {
  static get nuTag() {
    return 'nu-datetime';
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

  static get nuBehaviors() {
    return {
      datetime: true,
    };
  }
}
