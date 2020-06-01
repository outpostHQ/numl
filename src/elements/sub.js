import NuInline from './inline';

export default class NuSub extends NuInline {
  static get nuTag() {
    return 'nu-sub';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      text: 'sub bold',
      size: '.75em 1em',
    };
  }
}
