import NuActiveElement from './activeelement';

export default class NuLink extends NuActiveElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      color: 'special',
      text: 'nowrap u bolder',
      cursor: 'pointer',
      radius: '.5r',
      transition: 'shadow, fill, color',
      mark: '.25em hover',
      selectable: 'y',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
      }
    `;
  }
}
