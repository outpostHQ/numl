import NuInline from './inline';

export default class NuBold extends NuInline {
  static get nuTag() {
    return 'nu-b';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      text: 'bolder',
    };
  }
}
