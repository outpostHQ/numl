import NuEl from './el';

export default class NuInline extends NuEl {
  static get nuTag() {
    return 'nu-in';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      display: 'inline',
    };
  }
}
