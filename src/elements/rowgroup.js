import NuElement from './el';

export default class NuRowGroup extends NuElement {
  static get nuTag() {
    return 'nu-rowgroup';
  }

  static get nuRole() {
    return 'rowgroup';
  }

  static get nuStyles() {
    return {
      display: 'table-row-group',
    };
  }
}
