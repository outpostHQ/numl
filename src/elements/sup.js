import NuInline from './inline';

export default class NuSup extends NuInline {
  static get nuTag() {
    return 'nu-sup';
  }

  static get nuStyles() {
    return {
      text: 'sup',
      size: '.75em 1em',
    };
  }
}
