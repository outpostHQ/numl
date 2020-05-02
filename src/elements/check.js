import NuBlock from './block';

export default class NuCheck extends NuBlock {
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
      display: 'none',
      size: 'sm',
      text: 'w6',
    }
  }
}
