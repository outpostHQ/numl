import NuElement from './element';

export default class NuRowGroup extends NuElement {
  static get nuTag() {
    return 'nu-rowgroup';
  }

  static get nuRole() {
    return 'rowgroup';
  }

  static get nuDefaults() {
    return {
      display: 'table-row-group',
    };
  }
}
