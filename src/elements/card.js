import NuBlock from './block';

export default class NuCard extends NuBlock {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuRole() {
    return 'article';
  }

  static get nuDefaults() {
    return {
      padding: '2x',
      color: '',
      background: '',
      border: '1x',
      radius: '1x',
      gap: '0',
      flow: 'column',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        transition: background var(--nu-theme-animation-time) linear,
          color var(--nu-theme-animation-time) linear,
          box-shadow var(--nu-theme-animation-time) linear,
          transform var(--nu-theme-animation-time) linear,
          border var(--nu-theme-animation-time) linear,
          border-radius var(--nu-theme-animation-time) linear;
        position: relative;
        scrollbar-width: none;
      }
    `;
  }
}
