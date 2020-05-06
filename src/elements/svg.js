import NuBlock from './block';

export default class NuSvg extends NuBlock {
  static get nuTag() {
    return 'nu-svg';
  }

  static get nuBehaviors() {
    return {
      svg: true,
    };
  }

  static get nuRole() {
    return 'img';
  }

  static get nuGenerators() {
    return {
      src: '',
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      sizing: 'content',
      width: 'min(1fs)',
      height: 'min(1fs)',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        vertical-align: var(--nu-inline-offset);
      }

      ${tag}[width] svg {
        min-width: 100%;
        max-width: 100%;
        width: auto;
      }

      ${tag}[height] svg {
        min-height: 100%;
        max-height: 100%;
        height: auto;
      }
    `;
  }
}
