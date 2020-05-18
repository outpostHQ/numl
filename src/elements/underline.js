import NuInline from './inline';

export default class NuUnderline extends NuInline {
  static get nuTag() {
    return 'nu-u';
  }

  static get nuStyles() {
    return {
      text: 'u',
    };
  }
}
