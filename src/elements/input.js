import { DEFAULT_TIMING } from '../styles/transition';
import NuEl from './el';
import paddingAttr from '../styles/padding';

export default class NuInput extends NuEl {
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
      color: 'text :special[special-text]',
      border: '1bw',
      outline: 'focus-inside',
      filter: 'n :disabled[saturate(0.33) contrast(0.78) opacity(var(--disabled-opacity))]',
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
        width: '((--gap * 2) + 1em)',
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
        height: initial;
        min-height: initial;
        max-height: initial;
        margin: 0;
        -webkit-appearance: none;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        text-align: inherit;
        word-spacing: calc(1rem / 8);
        background: transparent;
        color: inherit;
        -webkit-text-fill-color: currentColor;
        border: none;
        outline: none;
        border-radius: inherit;
        box-sizing: border-box;
        user-select: auto;
        resize: none;
        transition: opacity ${DEFAULT_TIMING} linear;
      }`,

      `${sel('', '::-webkit-search-cancel-button')} {
        display: none;
      }`,

      `${tag} input:-webkit-autofill, ${tag} input:-webkit-autofill:hover, ${tag} input:-webkit-autofill:focus {
        caret-color: var(--special-color);
        -webkit-text-fill-color: var(--special-color);
        -webkit-box-shadow: 0 0 0px 9999rem var(--input-color) inset;
        box-shadow: 0 0 0px 9999rem var(--input-color) inset;
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
        -webkit-text-fill-color: var(--local-placeholder-color);
        color: var(--local-placeholder-color);
      }`,

      `${sel('[special]:not([disabled])', '::placeholder')} {
        --local-placeholder-color: var(--placeholder-color, rgba(var(--special-text-color-rgb), .5));
      }`,

      `${sel(':not([special]):not([disabled])', '::placeholder')} {
        --local-placeholder-color: var(--placeholder-color, rgba(var(--text-color-rgb), .5));
      }`,

      `${sel('[special][disabled]', '::placeholder')} {
        --local-placeholder-color: var(--placeholder-color, rgba(var(--special-text-color-rgb), .66));
      }`,

      `${sel(':not([special])[disabled]', '::placeholder')} {
        --local-placeholder-color: var(--placeholder-color, rgba(var(--text-color-rgb), .66));
      }`,
    ];
  }
}
