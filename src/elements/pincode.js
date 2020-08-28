import NuInput from './input';

export default class NuPinCode extends NuInput {
  static get nuTag() {
    return 'nu-pincode';
  }

  static get nuBehaviors() {
    return {
      input: 'type(tel)',
    };
  }

  static get nuAttrs() {
    return {
      maxlength: '4',
      placeholder: '••••',
      autocomplete: 'off',
    };
  }
}
