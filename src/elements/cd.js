import NuCode from './code';

export default class NuCd extends NuCode {
  static get nuTag() {
    return 'nu-cd';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      padding: '0 .25em',
      fill: 'diff',
    };
  }

  static get nuName() {
    return 'cd -code';
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        line-height: calc(var(--line-height) - 1px);
      }`,
    ];
  }
}
