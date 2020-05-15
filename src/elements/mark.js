import NuElement from './element';

export default class NuMark extends NuElement {
  static get nuTag() {
    return 'nu-mark';
  }

  static get nuStyles() {
    return {
      text: 'nowrap bolder',
      padding: '0 .25em',
      space: '0 .25em',
      radius: '1r',
      fill: 'hover :special[special-bg] :themed[bg] :special:themed[special-bg]',
      color: 'text :special[special-text]',
    };
  }
}
