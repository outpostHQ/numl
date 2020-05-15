import NuElement from './element';

export default class NuCard extends NuElement {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuId() {
    return 'card';
  }

  static get nuStyles() {
    return {
      display: 'block',
      padding: '2x',
      fill: 'bg',
      color: 'text',
      border: '1b',
      radius: '1r',
      flow: 'column',
      transition: 'theme, radius',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} { position: relative; }
    `;
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContext('radiogroup', null); // remove radiogroup context
  }
}
