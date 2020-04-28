import NuElement from './element';

export default class NuCheck extends NuElement {
  static get nuTag() {
    return 'nu-check';
  }

  static get nuBehaviors() {
    return {
      validator: true,
    };
  }

  static get nuAttrs() {
    return {
      for: '',
      assert: '',
    };
  }

  static get nuDefaults() {
    return {
      size: 'xs',
      text: 'w6',
    }
  }

  nuConnected() {
    super.nuConnected();

    this.hidden = true;
  }
}
