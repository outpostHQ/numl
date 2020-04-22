import NuFlex from './flex';

export default class NuRadioGroup extends NuFlex {
  static get nuTag() {
    return 'nu-radiogroup';
  }

  static get nuRole() {
    return 'radiogroup';
  }

  static get nuAttrs() {
    return {
      value: '',
    };
  }

  static get nuBehaviors() {
    return {
      radiogroup: true,
      control: true,
    };
  }
}
