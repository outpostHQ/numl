import NuGroup from './group';

export default class NuBtnGroup extends NuGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuStyles() {
    return {
      gap: '1bw',
      radius: '',
      border: '',
      fill: 'var(--local-border-color, var(--border-color)) :disabled[rgba(var(--local-border-color-rgb, var(--border-color-rgb)), var(--disabled-opacity))]',
      outline: 'n :radiogroup[focus-inside visible]',
    };
  }

  static get nuContext() {
    return {
      'attrs:action': {
        border: '0',
        outline: '^btngroup focus visible :radiogroup[n]',
        padding: '1x',
      },
    };
  }

  static nuCSS({ css, tag }) {
    return [
      `${tag} > *:not([grow]) {
        flex-grow:1;
      }`,
    ];
  }
}
