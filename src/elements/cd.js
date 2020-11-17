import NuCode from './code';

export default class NuCd extends NuCode {
  static get nuTag() {
    return 'nu-cd';
  }

  static get nuAttrs() {
    return {
      fill: 'diff :special[dark]',
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      fill: 'hue(0 0 0) :special[hue(0 0 70 special)]',
    };
  }

  static get nuName() {
    return 'cd -code';
  }

  static nuCSS({ css, tag }) {
    return [
      ...css,

      `${tag}:not([fill]) {
        background-color: var(--subtle-color);
      }`,

      `${tag}:not([padding]) {
        padding: .125rem .25em;
      }`,
    ]
  }
}
