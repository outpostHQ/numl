import {
  unit,
} from '../helpers';
import NuGrid from './grid';
import focusable from '../mixins/focusable';

export default class NuInput extends NuGrid {
  static get nuTag() {
    return 'nu-input';
  }

  static get nuAttrs() {
    return {
      autofocus: '',
      disabled: '',
      value: '',
      maxlength: '',
      name: '',
      padding: unit('--nu-padding'),
    };
  }

  static get nuDefaultFlow() {
    return 'column';
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-color: var(--nu-theme-border-color);
        --nu-depth-color: transparent;
        --nu-border-radius: var(--border-radius, .5rem);
        --nu-padding: .5rem;

        --nu-border-shadow: 0 0 0 var(--nu-theme-border-width) var(--nu-border-color) inset;
        --nu-depth-shadow: 0 0 0 var(--nu-theme-border-width) var(--nu-depth-color);

        position: relative;
        border-radius: var(--nu-border-radius);
        align-self: stretch;
        justify-self: stretch;
        align-items: stretch;
        justify-items: stretch;
        grid-auto-flow: column;
        background-color: var(--nu-theme-background-color);
        box-shadow: var(--nu-focus-background-shadow);
        transition: box-shadow var(--nu-theme-animation-time) linear;
        outline: none;
        text-align: center;
      }

      ${nuTag}::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        border-radius: var(--nu-border-radius);
        transition: box-shadow var(--nu-theme-animation-time) linear;
        box-shadow:
          var(--nu-depth-shadow),
          var(--nu-border-shadow);
      }

      ${nuTag} input {
        padding: var(--nu-padding);
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        -webkit-appearance: none;
        background: transparent;
        color: inherit;
        border: none;
        outline: none;
        border-radius: inherit;
      }

      ${nuTag} input[disabled] {
        color: var(--minor-color);
        background: var(--minor-background-color);
        -webkit-text-fill-color: var(--minor-color);
        -webkit-opacity: 1;
      }

      ${nuTag} input::placeholder {
        -webkit-text-fill-color: currentColor;
        color: currentColor;
        opacity: .5;
      }

      ${nuTag}[cell] {
        --nu-border-color: transparent;
        --nu-border-radius: 0rem !important;
        align-self: stretch;
        justify-self: stretch;
        width: 100%;
        height: 100%;
      }

      ${focusable(nuTag, true)}
    `;
  }

  nuCSSRef() {
    this.nuRef = this.querySelector('input');
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'disabled':
        this.nuCSSRef();

        if (this.nuRef) {
          this.nuRef.disabled = value != null;
          this.nuSetFocusable(value != null);
        }

        break;
    }
  }

  nuMounted() {
    super.nuMounted();

    setTimeout(() => {
      this.nuChanged('disabled', '', this.getAttribute('disabled'));

      if (this.nuRef && !this.nuRef.hasAttribute('placeholder')) {
        this.nuRef.setAttribute('placeholder', '...');
      }
    });
  }

  nuUpdateTheme(theme) {
    super.nuUpdateTheme(theme);
  }
}
