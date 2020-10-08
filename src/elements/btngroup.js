import NuGroup from './group';

export default class NuBtnGroup extends NuGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuBehaviors() {
    return {
      radiogroup: true,
      control: true,
    };
  }

  static get nuStyles() {
    return {
      gap: '1bw',
      radius: '',
      border: '',
      fill: 'var(--nu-local-border-color, var(--nu-border-color)) :disabled[rgba(var(--nu-local-border-color-rgb, var(--nu-border-color-rgb)), var(--nu-disabled-opacity))]',
      outline: 'focus-inside visible',
    };
  }

  static get nuContext() {
    return {
      'attrs:action': {
        border: '0',
        outline: 'n',
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
