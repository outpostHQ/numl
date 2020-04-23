import NuBlock from './block';

export default class NuLabel extends NuBlock {
  static get nuTag() {
    return 'nu-label';
  }

  static get nuDefaults() {
    return {
      text: 'w6',
      cursor: 'default',
    };
  }

  static get nuBehaviors() {
    return {
      label: true,
    };
  }
}
