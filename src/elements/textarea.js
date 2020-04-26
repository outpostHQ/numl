import NuInput from './input';

export default class NuTextArea extends NuInput {
  static get nuTag() {
    return 'nu-textarea';
  }

  static get nuBehaviors() {
    return {
      textarea: true,
      input: null,
    };
  }
}
