import NuBlock from './block';

export default class NuIcon extends NuBlock {
  static get nuTag() {
    return 'nu-icon';
  }

  static get nuBehaviors() {
    return {
      icon: true,
    };
  }

  static get nuRole() {
    return 'img';
  }

  static get nuGenerators() {
    return {
      name(val) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            opacity: `1 !important`,
          } : null;
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      width: 'min(1fs)',
      height: 'min(1fs)',
      sizing: 'content',
      transition: 'transform',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        vertical-align: var(--nu-inline-offset);
      }

      ${tag} svg {
        position: absolute;
        left: 50%;
        top: 50%;
        width: var(--nu-font-size);
        height: var(--nu-font-size);
        transform: translate(-50%, -50%);
        transition: opacity calc(var(--nu-transition-enabler) * var(--nu-transition-time)) linear;
      }
    `;
  }
}
