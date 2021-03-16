import NuEl from './el';

export default class NuAction extends NuEl {
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
      transition: 'theme, radius, filter',
      outline: 'focus visible',
      mark: 'n :focusable[hover]',
      cursor: 'pointer :disabled[default]',
      selectable: 'y',
      box: 'y',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
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
        -webkit-tap-highlight-color: var(--mark-color);
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
        color: transparent;
        text-decoration: inherit;
        text-indent: -999rem;
        white-space: nowrap;
      }`,

      `${tag} > a:focus {
        outline: none;
      }`,
    ];
  }
}
