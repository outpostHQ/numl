import NuActiveElement from './activeelement';

export default class NuLink extends NuActiveElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      color: 'special',
      text: 'nowrap u',
      cursor: 'pointer',
      radius: '.5r',
      transition: 'shadow, fill, color',
      focusable: 'y',
      hoverable: 'y',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        user-select: text;
        font-weight: bolder;
        position: relative;
      }
    `;
  }
}
