import NuElement from './element';

export default class NuSpecial extends NuElement {
  static get nuTag() {
    return 'nu-special';
  }

  static get nuDefaults() {
    return {
      color: 'special',
      text: 'w5',
    };
  }
}
