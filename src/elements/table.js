import NuElement from './el';

export default class NuTable extends NuElement {
  static get nuTag() {
    return 'nu-table';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuStyles() {
    return {
      display: 'table',
      gap: '1bw',
      fill: 'border',
    };
  }
}
