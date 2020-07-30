import { DEFAULT_TIMING } from '../attributes/transition';
import NuElement from './element';
import { requireChild } from '../dom-helpers';
import combinedAttr from '../attributes/combined';
import paddingAttr from '../attributes/padding';

export default class NuInput extends NuElement {
  static get nuTag() {
    return 'nu-input';
  }

  static get nuBehaviors() {
    return {
      input: true,
    };
  }

  static get nuGenerators() {
    return {
      padding: (val) => {
        const styles = paddingAttr(val, this.constructor.nuAllStyles);

        styles.$suffix = '>input';

        return styles;
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'grid',
      flow: 'column',
      radius: '',
      padding: '1x',
      fill: 'input :disabled[special-bg 20%]',
      border: '1bw',
      outline: 'focus-inside intrusive',
      opacity: '1 :disabled[.5]',
      transition: 'theme',
      selectable: 'n',
      box: 'y',
      cursor: 'text',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} input::-webkit-inner-spin-button, ${tag} input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }`,

      `${tag} input, ${tag} textarea {
        width: initial;
        max-width: initial;
        min-width: initial;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        -webkit-appearance: none;
        background: transparent;
        border: none;
        outline: none;
        border-radius: inherit;
        box-sizing: border-box;
        color: inherit;
        -webkit-text-fill-color: currentColor;
        word-spacing: calc(1rem / 8);
        height: initial;
        min-height: initial;
        max-height: initial;
        user-select: all;
        text-align: inherit;
        resize: none;
        transition: opacity ${DEFAULT_TIMING} linear;
      }`,

      `${tag} input:-webkit-autofill, ${tag} input:-webkit-autofill:hover, ${tag} input:-webkit-autofill:focus {
        caret-color: var(--nu-special-color);
        -webkit-text-fill-color: var(--nu-special-color);
        -webkit-box-shadow: 0 0 0px 9999rem var(--nu-input-color) inset;
        box-shadow: 0 0 0px 9999rem var(--nu-input-color) inset;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }`,

      `${tag} input[disabled] {
        color: inherit;
        background: transparent;
        -webkit-opacity: 1;
      }`,

      `${tag} input::placeholder {
        -webkit-text-fill-color: currentColor;
      }`,

      `${tag}:not([disabled])[special] input::placeholder {
        color: var(--nu-placeholder-color, rgb(var(--nu-special-invert-color-rgb), .4));
      }`,

      `${tag}:not([disabled]):not([special]) input::placeholder {
        color: var(--nu-placeholder-color, rgb(var(--nu-text-color-rgb), .4));
      }`,

      `${tag}[disabled][special] input::placeholder {
        color: var(--nu-placeholder-color, rgb(var(--nu-special-invert-color-rgb), .6));
      }`,

      `${tag}[disabled]:not([special]) input::placeholder {
        color: var(--nu-placeholder-color, rgb(var(--nu-text-color-rgb), .6));
      }`,

      `${tag} nu-icon:not([width]) {
        width: calc(var(--nu-local-padding) * 2 + 1em);
      }`,
    ];
  }

  nuConnected() {
    super.nuConnected();
  }
}
