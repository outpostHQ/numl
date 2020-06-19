import NuInline from './inline';

export default class NuEm extends NuInline {
  static get nuTag() {
    return 'nu-em';
  }

  static get nuStyles() {
    return {
      text: 'i',
    };
  }
}
