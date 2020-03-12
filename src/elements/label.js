import NuElement from './element';

export default class NuLabel extends NuElement {
  static get nuTag() {
    return 'nu-label';
  }

  static get nuDefaults() {
    return {
      text: 'w6',
      cursor: 'default',
    };
  }
}
