import NuInput from './input';

export default class NuOneTimeCode extends NuInput {
  static get nuTag() {
    return 'nu-onetimecode';
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
      autocomplete: 'one-time-code',
    };
  }
}
