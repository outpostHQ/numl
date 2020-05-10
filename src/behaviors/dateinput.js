import ComponentBehavior from './component.js';

export default class DateInputBehaviour extends ComponentBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      component: 'dateinput',
    };
  }
}
