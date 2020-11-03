import NuElement from './el';

export default class NuCell extends NuElement {
  static get nuTag() {
    return 'nu-cell';
  }

  static get nuRole() {
    return 'cell';
  }

  static get nuStyles() {
    return {
      display: '^ block :role-row[table-cell]',
      padding: '1x',
      text: 'middle',
      box: 'y',
    };
  }
}
