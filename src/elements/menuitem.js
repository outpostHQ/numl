import NuBtn from './btn';

export default class NuMenuitem extends NuBtn {
  static get nuTag() {
    return 'nu-menuitem';
  }

  static get nuRole() {
    return 'menuitem';
  }

  static get nuDefaults() {
    return {
      padding: '1x',
      background: 'transparent',
      width: '100%',
      flow: 'column',
      gap: '1x',
      content: 'center start',
      radius: 0,
      border: 0,
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-focus-inset: inset 0 0;
      }
    `;
  }
}
