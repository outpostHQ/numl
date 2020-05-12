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

  static get nuStyles() {
    return {
      opacity: ':invalid[1] 0',
      size: 'sm',
      text: 'w6',
      height: ':invalid[max(1lh)] max(1px)',
      transition: 'opacity, height',
    }
  }
}
