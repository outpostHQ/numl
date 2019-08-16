import NuFlow from './flow';

export default class NuMenu extends NuFlow {
  static get nuTag() {
    return 'nu-menu';
  }

  static get nuRole() {
    return 'menu';
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} > nu-btn:not([background]):not([theme]) {
        background: transparent;
      }

      ${nuTag} > nu-btn {
        --nu-border-radius: 0;
        --nu-border-color: transparent;
      }

      ${nuTag} > nu-btn:not([items]):not([place-items]) {
        align-items: stretch;
        justify-items: start;
      }

      ${nuTag} > nu-btn:not([content]):not([place-content]) {
        align-content: stretch;
        justify-content: start;
      }
    `;
  }
}
