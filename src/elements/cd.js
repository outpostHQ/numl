import NuCode from './code';

export default class NuCd extends NuCode {
  static get nuTag() {
    return 'nu-cd';
  }

  static get nuAttrs() {
    return {
      inline: '',
      fill: 'diff :special[dark]',
    };
  }

  static get nuStyles() {
    return {
      fill: 'hue(0 0 0) :special[hue(0 0 70 special)]',
      padding: '.125em .25em',
    };
  }

  static get nuName() {
    return 'cd -code';
  }

  static nuCSS({ css, tag }) {
    return [
      ...css,

      `${tag}:not([fill]) {
        background-color: var(--nu-subtle-color);
      }`,

      `${tag}:not([padding]) {
        padding: .125rem .25em;
      }`,
    ]
  }
}
