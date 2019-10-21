import NuElement from './element';

export default class NuFlow extends NuElement {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuDefaults() {
    return {
      flow: 'column',
      gap: 0,
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
