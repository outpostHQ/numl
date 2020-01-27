import NuElement from './element';

export default class NuCell extends NuElement {
  static get nuTag() {
    return 'nu-cell';
  }

  static get nuRole() {
    return 'cell';
  }

  static get nuId() {
    return 'cell';
  }

  static get nuDefaults() {
    return {
      display: '^ block :role-row[table-cell]',
      padding: '--nu-cell-padding',
      text: 'middle',
      fill: '^ bg :role-row[]',
    };
  }

  static nuCSS({ tag, css}) {
    return `
      ${css}
      ${tag} {
        position: relative;
      }
    `;
  }
}
