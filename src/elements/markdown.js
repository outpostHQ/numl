import NuElement from './element';

export default class NuMarkdown extends NuElement {
  static get nuTag() {
    return 'nu-markdown';
  }

  static get nuStyles() {
    return {
      display: 'block',
      gap: '1x',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} pre, ${tag} textarea {
        display: none;
      }`,
    ];
  }

  static get nuBehaviors() {
    return {
      markdown: true,
    };
  }
}
