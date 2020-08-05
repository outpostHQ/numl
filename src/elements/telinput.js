import NuInput from './input';

export default class NuTelInput extends NuInput {
  static get nuTag() {
    return 'nu-telinput';
  }

  static get nuBehaviors() {
    return {
      input: 'type(tel)',
      search: true,
    };
  }
}
