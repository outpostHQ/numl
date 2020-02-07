import NuBlock from './block';

export default class NuListItem extends NuBlock {
  static get nuTag() {
    return 'nu-listitem';
  }

  static get nuRole() {
    return 'listitem';
  }

  static get nuId() {
    return 'listitem';
  }

  static get nuDefaults() {
    return {
      padding: '1.5em left',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
      }

      ${tag}::before {
        content: "";
        display: block;
        position: absolute;
        left: calc(var(--nu-line-height, .5em) / 2);
        top: calc(var(--nu-line-height, .5em) / 2);
        transform: translate(-.25em, -.25em);
        border-radius: 9999rem;
        background-color: var(--nu-local-text-color, var(--nu-text-color));
        width: .5em;
        height: .5em;
      }
    `;
  }
}
