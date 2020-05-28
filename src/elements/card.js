import NuSection from './section';

export default class NuCard extends NuSection {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuId() {
    return 'card';
  }

  static get nuStyles() {
    return {
      padding: '2x',
      fill: 'bg :clear[clear]',
      color: 'text',
      border: '1bw :clear[hidden]',
      radius: '1r',
      transition: 'theme, radius',
      shadow: '0 :clear[1.5]',
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
