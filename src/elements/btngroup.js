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
      transition: 'filter, opacity',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
    };
  }

  static get nuContext() {
    return {
      'attrs:action': {
        border: '0',
        outline: '^btngroup focus visible :radiogroup[n]',
        padding: '1x 1.5x',
        filter: 'n',
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
