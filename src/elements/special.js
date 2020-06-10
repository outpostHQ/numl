import NuInline from './inline';

export default class NuSpecial extends NuInline {
  static get nuTag() {
    return 'nu-special';
  }

  static get nuStyles() {
    return {
      color: 'special',
      text: 'w5',
    };
  }
}
