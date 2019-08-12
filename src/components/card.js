import NuBlock from './block';

export default class NuCard extends NuBlock {
  static get nuTag() {
    return 'nu-card';
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-border-shadow: var(--nu-border-inset, 0 0) 0 var(--nu-theme-border-width) var(--nu-theme-border-color);

        display: block;
        position: relative;
        padding: 1rem;
        scrollbar-width: none;
        background-color: var(--nu-theme-background-color);
      }
    `;
  }
}
