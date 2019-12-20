import NuElement from './element';

export default class NuMark extends NuElement {
  static get nuTag() {
    return 'nu-mark';
  }

  static get nuDefaults() {
    return {
      text: 'w6',
      fill: 'diff',
      padding: '0 .25em',
      space: '0 .25em',
      radius: '1x',
    };
  }
}
