import NuInput from './input';

export default class NuEmailInput extends NuInput {
  static get nuTag() {
    return 'nu-emailinput';
  }

  static get nuBehaviors() {
    return {
      input: 'type(email)',
      search: true,
    };
  }
}
