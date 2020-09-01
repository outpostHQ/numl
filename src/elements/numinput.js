import NuInput from './input';
import { DEFAULT_TIMING } from '../styles/transition';

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
    let all = [
      ...css,

      `${tag} > input:not(:focus) {
        opacity: 0;
      }`,

      `${tag} > input:focus {
        opacity: 1;
      }`
    ];

    if (!shadow) {
      all.push(
        `${tag}::after {
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
        }`,

        `${tag}:not(:focus-within)::after {
          opacity: 1;
        }`,

        `${tag}:focus-within::after {
          opacity: 0;
        }`,
      );
    }

    return all;
  }
}
