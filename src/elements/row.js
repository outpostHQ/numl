import NuElement from './el';

export default class NuRow extends NuElement {
  static get nuTag() {
    return 'nu-row';
  }

  static get nuRole() {
    return 'row';
  }

  static get nuStyles() {
    return {
      display: 'table-row',
      fill: 'bg',
    };
  }
}
