import {
  unit,
} from '../helpers';
import NuBlock from './block';
import focusable from '../mixins/focusable';

export default class NuInput extends NuBlock {
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
      padding: unit('--nu-local-padding', {
        multiplier: 'var(--nu-padding)',
        empty: 'var(--nu-padding)',
        convert: true,
      }),
    };
  }

  static get nuDefaults() {
    return {
      display: 'grid',
      flow: 'column',
      radius: '',
      padding: '1x',
      text: 'center',
      fill: 'input-bg',
      border: '1x',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        outline: none;
        user-select: none;
        position: relative;
      }

      ${tag} input {
        padding: var(--nu-local-padding);
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
        box-sizing: border-box;
      }

      ${tag} input:not(:first-child) {
        padding-left: 0;
      }

      ${tag} input:not(:last-child) {
        padding-right: 0;
      }

      ${tag} input[disabled] {
        color: rgb(var(--nu-text-color-rgb), .6);
        background: var(--nu-hover-color);
        -webkit-text-fill-color: rgb(var(--nu-text-color-rgb), .6);
        -webkit-opacity: 1;
      }

      ${tag} input::placeholder {
        -webkit-text-fill-color: currentColor;
        color: currentColor;
        opacity: .5;
      }

      ${tag} nu-icon:not([width]) {
        width: calc(var(--nu-local-padding) * 2 + 1em);
      }

      ${focusable(tag, { force: true })}
    `;
  }

  nuGetRef() {
    this.nuRef = this.querySelector('input');

    if (!this.nuRef) {
      const input = document.createElement('input');

      this.appendChild(input);

      this.nuRef = input;

      if (this.hasAttribute('label')) {
        this.nuChanged('label', null, this.getAttribute('label'));
        this.removeAttribute('aria-label');
      }

      if (this.hasAttribute('labelledby')) {
        this.nuChanged('label', null, this.getAttribute('labelledby'));
        this.removeAttribute('aria-labelledby');
      }
    }

    return this.nuRef;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'disabled':
        this.nuGetRef();

        if (this.nuRef) {
          this.nuRef.disabled = value != null;
          this.nuSetFocusable(value != null);
        }

        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    setTimeout(() => {
      this.nuChanged('disabled', '', this.getAttribute('disabled'));

      if (this.nuRef && !this.nuRef.hasAttribute('placeholder')) {
        this.nuRef.setAttribute('placeholder', '...');
      }
    });
  }
}
