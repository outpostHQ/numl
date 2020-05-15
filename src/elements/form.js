import NuFlow from './flow';

export default class NuForm extends NuFlow {
  static get nuTag() {
    return 'nu-form';
  }

  static get nuRole() {
    return 'role';
  }

  static get nuBehaviors() {
    return {
      form: true,
    };
  }

  static get nuStyles() {
    return {
      gap: '2x',
    };
  }

  static get nuType() {
    return 'object';
  }
}
