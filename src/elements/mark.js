import NuEl from './el';

export default class NuMark extends NuEl {
  static get nuTag() {
    return 'nu-mark';
  }

  static get nuRole() {
    return 'mark';
  }

  static get nuStyles() {
    return {
      text: 'nowrap bolder',
      padding: '0 .25em',
      space: '0 .25em',
      radius: '1r',
      color: 'text :special[special-text]',
      fill: 'mark :special[special-bg] :themed[bg] :special:themed[special-bg]',
    };
  }
}
