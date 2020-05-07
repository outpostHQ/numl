import NuElement from './element';

export default class NuDatePicker extends NuElement {
  static get nuTag() {
    return 'nu-datepicker';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      gap: '',
    }
  }

  static get nuBehaviors() {
    return {
      component: 'datepicker',
    };
  }
}
