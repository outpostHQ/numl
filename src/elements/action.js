import NuElement from './el';

export default class NuAction extends NuElement {
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
      radius: '0',
      text: 'nowrap',
      transition: 'theme, radius',
      outline: 'focus visible',
      mark: 'n :focusable[hover]',
      opacity: '1 :disabled[--disabled-opacity]',
      cursor: 'pointer :disabled[default]',
      selectable: 'y',
      box: 'y',
    };
  }

  static get nuBehaviors() {
    return {
      control: true,
      action: true,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        touch-action: manipulation;
        -webkit-tap-highlight-color: var(--nu-mark-color);
      }`,

      `${tag}[disabled] {
        pointer-events: none;
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
