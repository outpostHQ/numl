import { DEFAULT_TIMING } from '../attributes/transition';
import NuElement from './el';
import paddingAttr from '../attributes/padding';

export default class NuInput extends NuElement {
  static get nuTag() {
    return 'nu-input';
  }

  static get nuBehaviors() {
    return {
      input: true,
      focusable: 'manual',
    };
  }

  static get nuGenerators() {
    return {
      padding: (val) => {
        const styles = paddingAttr(val, this.constructor.nuAllStyles);

        styles.$suffix = '>input,>textarea';

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
      fill: 'input :special[special-bg]',
      mark: 'n :disabled[#special-bg.20]',
      color: 'text :special[special-text]',
      border: '1bw',
      outline: 'focus-inside',
      opacity: '1 :disabled[--disabled-opacity]',
      transition: 'theme',
      selectable: 'n',
      box: 'y',
      height: 'auto :empty[min (1fs + 2x)]',
      cursor: 'text',
      width: 'auto',
    };
  }

  static get nuContext() {
    return {
      'attrs:icon': {
        width: '((--nu-gap * 2) + 1em)',
      },
    };
  }

  static nuCSS({ tag, css }) {
    const sel = (mod = '', childMod = '') => {
      return `${tag}${mod} input${childMod}, ${tag}${mod} textarea${childMod}`;
    };

    return [
      ...css,

      `${tag} input::-webkit-inner-spin-button, ${tag} input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }`,

      `${sel()} {
        display: block;
        width: 100%;
        max-width: initial;
        min-width: initial;
        font-family: inherit;
        font-weight: inherit;
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
        user-select: auto;
        text-align: inherit;
        resize: none;
        transition: opacity ${DEFAULT_TIMING} linear;
      }`,

      `${sel('', '::-webkit-search-cancel-button')} {
        display: none;
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

      `${sel('', '[disabled]')} {
        color: inherit;
        background: transparent;
        -webkit-opacity: 1;
      }`,

      `${sel('', '::placeholder')} {
        -webkit-text-fill-color: var(--nu-local-placeholder-color);
        color: var(--nu-local-placeholder-color);
      }`,

      `${sel('[special]', '::placeholder')} {
        --nu-local-placeholder-color: var(--nu-placeholder-color, rgba(var(--nu-special-text-color-rgb), .5));
      }`,

      `${sel(':not([special])', '::placeholder')} {
        --nu-local-placeholder-color: var(--nu-placeholder-color, rgba(var(--nu-text-color-rgb), .5));
      }`,
    ];
  }
}
