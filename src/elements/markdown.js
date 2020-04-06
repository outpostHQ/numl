import NuConverter from './converter';

export default class NuMarkdown extends NuConverter {
  static get nuTag() {
    return 'nu-markdown';
  }

  static get nuDefaults() {
    return {
      display: 'block',
      gap: '1x',
    };
  }

  static get nuConverter() {
    return import('../converters/markdown');
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} > pre, ${tag} > textarea {
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

  nuApply(container, content, converter) {
    container.setAttribute('gap', this.getAttribute('gap') || '2x');

    container.innerHTML = converter(
      prepareContent(content),
      this.nuInline,
    );
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'gap' && this.nuObserve) {
      this.nuObserve();
    }
  }

  nuGetContainer() {
    return document.createElement(this.nuInline ? 'nu-el' : 'nu-flow');
  }
}

function prepareContent(str) {
  const tab = str.match(/^\s*/)[0];

  if (tab) {
    str = str.split('\n').map(str => str.replace(tab, '')).join('\n');
  }

  return str
    .replace(/^\s*\n/g, '')
    .replace(/\n\s*$/g, '');
}
