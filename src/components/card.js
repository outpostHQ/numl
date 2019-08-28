import NuBlock from './block';

export default class NuCard extends NuBlock {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuDefaults() {
    return {
      padding: '1',
      color: '',
      background: '',
      border: '1x',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-radius: var(--nu-theme-border-radius);

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
