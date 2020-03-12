import NuBlock from './block';

export default class NuList extends NuBlock {
  static get nuTag() {
    return 'nu-list';
  }

  static get nuRole() {
    return 'list';
  }

  static get nuAttrs() {
    return {
      type(type) {
        return {
          'list-style-type': type || 'disc',
        };
      },
      position(position) {
        return {
          'list-style-position': position || 'inside',
        };
      },
    }
  }

  static get nuDefaults() {
    return {
      flow: 'column',
      gap: '1x',
      position: 'inside',
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag}:not([enumerate]):not([type]) {
        list-style-type: disc;
      }
      ${tag}[enumerate]:not([type]) {
        list-style-type: decimal;
      }
      ${tag} ${tag}:not([padding]) {
        padding-left: calc(var(--nu-gap) * 4);
      }
    `;
  }
}
