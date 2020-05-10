import ComponentBehavior from './component.js';

export default class DateInputBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'dateinput',
    };
  }
}
