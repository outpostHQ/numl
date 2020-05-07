import NuInput from './input';
import NuNum from './num';
import { DEFAULT_TIMING } from '../attributes/transition';

export default class NuNumInput extends NuInput {
  static get nuTag() {
    return 'nu-numinput';
  }

  static get nuBehaviors() {
    return {
      input: null,
      numinput: true,
    };
  }

  static get nuStyles() {
    return {
      text: 'center',
    };
  }

  static nuCSS({ tag, css, shadow }) {
    return `
      ${css}
      ${tag} input::-webkit-inner-spin-button, ${tag} input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      ${tag} input {
        transition: opacity ${DEFAULT_TIMING} linear;
      }

      ${tag}:not(:focus-within) input {
        opacity: 0;
      }

      ${tag}:focus-within input {
        opacity: 1;
      }

      ${!shadow ? `${tag}::after {
        content: var(--nu-value);
        display: grid;
        place-content: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: inherit;
        transition: opacity ${DEFAULT_TIMING} linear;
        pointer-events: none;
      }

      ${tag}:not(:focus-within)::after {
        opacity: 1;
      }

      ${tag}:focus-within::after {
        opacity: 0;
      }` : ''}
    `;
  }
}
