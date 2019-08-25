import NuBlock from './block';

export default class NuCard extends NuBlock {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuDefaults() {
    return {
      padding: 1,
      color: '',
      background: '',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-border-shadow: var(--nu-border-inset, 0 0) 0 var(--nu-theme-border-width) var(--nu-theme-border-color);

        position: relative;
        scrollbar-width: none;
      }
    `;
  }
}
