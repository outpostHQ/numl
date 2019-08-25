import NuFlex from './flex';

export default class NuFlow extends NuFlex {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuDefaults() {
    return {
      flow: 'column',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}{
        align-content: stretch;
        justify-content: flex-start;
        align-items: stretch;
      }
    `;
  }
}
