import NuElement from './element';

export default class NuTriangle extends NuElement {
  static get nuTag() {
    return 'nu-triangle';
  }

  static get nuStyles() {
    return {
      direction: 'up',
      color: 'border',
      overflow: 'no',
      text: 'v-middle',
      height: '0',
      width: '0',
      border: '(1fs / 2) #clear',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}:not([border]):not([border]) {
        border-top: 0;
        border-bottom-color: currentColor;
        border-bottom-width: calc(var(--nu-line-height) / 2);
      }`,

      `${tag}:not([size]):not([size]) {
        font-size: inherit;
        line-height: inherit;
      }`,
    ];
  }
}
