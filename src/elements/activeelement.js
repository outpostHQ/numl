import NuElement from './element';

export default class NuActiveElement extends NuElement {
  static get nuTag() {
    return 'nu-abstract-activeelement'; // abstract tag
  }

  static get nuRole() {
    return 'button';
  }

  static get nuAttrs() {
    return {
      disabled: '',
      pressed: '',
      checked: '',
      selected: '',
      href: '',
      target: '',
      controls: '',
      value: '',
      to: '',
      action: '',
    };
  }

  static get nuDefaults() {
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

  set pressed(bool) {
    if (bool) {
      this.setAttribute('pressed', bool);
    } else {
      this.removeAttribute('pressed');
    }
  }

  get pressed() {
    return this.hasAttribute('pressed');
  }

  set checked(val) {
    this.pressed = val;
  }

  get checked() {
    return this.pressed;
  }

  set selected(val) {
    this.pressed = val;
  }

  get selected() {
    return this.pressed;
  }
}
