import NuElement from './element';

export default class NuStrong extends NuElement {
  static get nuTag() {
    return 'nu-strong';
  }

  static get nuDefaults() {
    return {
      text: 'w6',
    };
  }
}
