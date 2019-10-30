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
      color: '',
      fill: '',
      border: '1x',
      radius: '1x',
      flow: 'column',
      transition: 'background, color, box-shadow, transform, border, border-radius',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} { position: relative; }
    `;
  }
}
