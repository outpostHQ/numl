import NuInline from './inline';

export default class NuStrong extends NuInline {
  static get nuTag() {
    return 'nu-strong';
  }

  static get nuRole() {
    return 'strong';
  }

  static get nuStyles() {
    return {
      text: 'bold',
    };
  }
}
