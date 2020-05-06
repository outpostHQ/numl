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

  static get nuGenerators() {
    return {
      for: '',
      assert: '',
    };
  }

  static get nuStyles() {
    return {
      display: 'none',
      size: 'sm',
      text: 'w6',
    }
  }
}
