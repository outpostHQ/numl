import NuCode from './code';

export default class NuCd extends NuCode {
  static get nuTag() {
    return 'nu-cd';
  }

  static get nuAttrs() {
    return {
      inline: '',
      fill: 'main-subtle',
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
