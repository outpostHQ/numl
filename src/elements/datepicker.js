import NuElement from './element';

export default class NuDatePicker extends NuElement {
  static get nuTag() {
    return 'nu-datepicker';
  }

  static get nuAttrs() {
    return {
      value: '',
      locale: '',
      begin: '',
      end: '',
      mode: '',
    };
  }

  static get nuDefaults() {
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
