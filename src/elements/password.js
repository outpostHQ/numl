import NuInput from './input';

export default class NuPassword extends NuInput {
  static get nuTag() {
    return 'nu-password';
  }

  static get nuBehaviors() {
    return {
      input: 'type(password)',
      password: true,
    };
  }
}
