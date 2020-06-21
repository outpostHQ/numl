import NuElement from './element';

export default class NuActiveElement extends NuElement {
  static get nuTag() {
    return 'nu-action'; // abstract tag
  }

  static get nuRole() {
    return 'button';
  }

  static get nuName() {
    return 'action';
  }

  static get nuStyles() {
    return {
      radius: '',
      text: 'nowrap',
      transition: 'theme, radius',
      outline: 'focus',
      mark: 'n :focusable[hover]',
      opacity: '1 :disabled[.5]',
      cursor: 'pointer :disabled[default]',
      selectable: 'y',
      box: 'y',
    };
  }

  static get nuBehaviors() {
    return {
      control: true,
      button: true,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        touch-action: manipulation;
        -webkit-tap-highlight-color: var(--nu-mark-color);
      }`,

      `${tag} > a {
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
      }`,

      `${tag} > a:focus {
        outline: none;
      }`,
    ];
  }
}
