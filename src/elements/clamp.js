import NuElement from './element';

export default class NuClamp extends NuElement {
  static get nuTag() {
    return 'nu-clamp';
  }

  static get nuGenerators() {
    return {
      lines(val) {
        return {
          '--nu-local-max-lines': val,
        };
      },
      display: null,
    };
  }

  static get nuStyles() {
    return {
      width: 'max 100%',
      lines: '1',
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag} {
        overflow: hidden;
      }
      ${tag} {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--nu-local-max-lines);
      }
    `;
  }
}
