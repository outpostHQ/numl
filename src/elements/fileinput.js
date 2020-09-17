import NuElement from './el';
import NuInput from './input';

export default class NuFileInput extends NuElement {
  static get nuTag() {
    return 'nu-fileinput';
  }

  static get nuName() {
    return 'fileinput input';
  }

  static get nuTemplate() {
    return `
      <nu-block place="cover" opacity="0" overflow="n"><input/></nu-block>
      <nu-icon name="upload"></nu-icon>
      <nu-value></nu-value>
    `;
  }

  static get nuBehaviors() {
    return {
      fileinput: true,
      hover: true,
    };
  }

  static get nuStyles() {
    return {
      ...NuInput.nuStyles,
      height: 'min (1lh + 2x + 2bw)',
      cursor: 'pointer',
      content: 'center start',
      gap: '2x',
      items: 'center stretch',
      mark: 'hover',
    };
  }

  static get nuContext() {
    return {
      ...NuInput.nuContext,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }`,

      `${tag} input {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: scale(100, 100);
        cursor: inherit;
      }`,
    ];
  }
}
