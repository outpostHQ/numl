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
    return `
      ${css}
      ${tag} pre, ${tag} textarea {
        display: none;
      }
      ${tag} [nu-id="bold"]:not([text]) {
        font-weight: bold;
      }
      ${tag} [nu-id="italic"]:not([text]) {
        font-style: italic;
      }
      ${tag} nu-heading:not([padding]) {
        padding-top: .5em;
      }
    `;
  }

  static get nuBehaviors() {
    return {
      markdown: true,
    };
  }
}
