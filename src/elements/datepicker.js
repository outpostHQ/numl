import NuEl from './el';

export default class NuDatePicker extends NuEl {
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
      datepicker: true,
    };
  }
}
