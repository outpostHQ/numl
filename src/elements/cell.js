import NuElement from './element';

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
      padding: '--nu-gap',
      text: 'middle',
      fill: 'bg',
      box: 'y',
    };
  }
}
