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
        --nu-border-inset: inset 0 0;
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-border-shadow: var(--nu-border-inset) 0 var(--nu-theme-border-width) var(--nu-theme-border-color);

        transition: background var(--nu-theme-animation-time) linear,
          color var(--nu-theme-animation-time) linear,
          box-shadow var(--nu-theme-animation-time) linear,
          transform var(--nu-theme-animation-time) linear;
        position: relative;
        scrollbar-width: none;
      }
    `;
  }
}
