import NuInline from './inline';

export default class NuItalic extends NuInline {
  static get nuTag() {
    return 'nu-i';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      text: 'i',
    };
  }
}
