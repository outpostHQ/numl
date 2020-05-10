import ComponentBehavior from './component.js';

export default class DatePickerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'datepicker',
      provider: false,
    };
  }
}
