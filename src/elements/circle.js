import NuElement from './element';

export default class NuCircle extends NuElement {
  static get nuTag() {
    return 'nu-circle';
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      width: 'minmax(1fs, 1fs)',
      height: 'minmax(1fs, 1fs)',
      radius: 'round',
      border: '',
    };
  }
}
