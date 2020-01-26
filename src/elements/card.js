import NuBlock from './block';

export default class NuCard extends NuBlock {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuRole() {
    return 'article';
  }

  static get nuId() {
    return 'card';
  }

  static get nuDefaults() {
    return {
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
