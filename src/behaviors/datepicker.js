import ComponentBehavior from './component.js';

export default class DatePickerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      component: 'datepicker',
      provideValue: false,
      props: ['value', 'begin', 'end', 'mode', 'lang', 'host'],
    };
  }
}
