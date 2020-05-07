import NuElement from './element';

export default class NuActiveElement extends NuElement {
  static get nuTag() {
    return 'nu-abstract-activeelement'; // abstract tag
  }

  static get nuRole() {
    return 'button';
  }

  static get nuStyles() {
    return {
      radius: '',
      text: 'nowrap',
      transition: 'theme, radius',
      focus: 'y',
      hoverable: 'n :focusable[y]',
      opacity: '1 :disabled[.5]',
      cursor: 'pointer :disabled[default]',
    };
  }

  static get nuBehaviors() {
    return {
      control: true,
      button: true,
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        user-select: none;
        touch-action: manipulation;
        -webkit-tap-highlight-color: var(--nu-hover-color);
      }

      ${tag} > a {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        cursor: inherit;
        color: inherit;
        text-decoration: inherit;
      }

      ${tag} > a:focus {
        outline: none;
      }
    `;
  }
}
