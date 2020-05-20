import NuElement from './element';

export default class NuInline extends NuElement {
  static get nuTag() {
    return 'nu-inline';
  }

  static get nuStyles() {
    return {
      display: 'inline',
    };
  }
}
